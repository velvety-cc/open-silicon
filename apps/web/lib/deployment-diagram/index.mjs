import * as THREE from 'three';
import {createDeploymentLayers,layerKeys,layerNames} from './scene-models.mjs';
import {layoutFor} from './layer-layout.mjs';
import {motion,createSpring,stepSpring,modelPresentation,blendedLayout} from './layer-motion.mjs';
import {batchLines} from './batch-lines.mjs';

// The caller owns this instance through its AbortSignal, including route changes.
export async function mountDeploymentDiagram(root, signal) {
if(signal.aborted)return;
const stage=root.querySelector('.diagram-stage');
const viewport=stage.querySelector('.scene-viewport');
const canvas=stage.querySelector('canvas');
const controls=[...stage.querySelectorAll('.layer-control')];
const status=root.querySelector('[role=status]');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const fine=matchMedia('(hover: hover) and (pointer: fine)');
const scene=new THREE.Scene();
const camera=new THREE.OrthographicCamera(-4,4,5,-5,.1,100);
const layers=createDeploymentLayers();
const heights=layers.map(layer=>layer.userData.contentHeight);
const springs=layers.map(()=>createSpring());
const lineBatches=layers.flatMap(layer=>[batchLines(layer.userData.flat),batchLines(layer.userData.content)]);
stage.dataset.lineBatches=JSON.stringify({before:lineBatches.reduce((sum,batch)=>sum+batch.before,0),after:lineBatches.reduce((sum,batch)=>sum+batch.after,0)});
layers.forEach(layer=>scene.add(layer));
layers.forEach(layer=>{
  const floor=new THREE.Plane(new THREE.Vector3(0,1,0),0);
  const ceiling=new THREE.Plane(new THREE.Vector3(0,-1,0),1000);
  layer.userData.surfaceClips=[floor,ceiling];
  // Fixed clipping configuration: no alpha/shader variant swaps while moving.
  const materials=new Map();
  layer.userData.content.traverse(object=>{
    if(!object.material)return;
    const source=object.material;
    if(!materials.has(source)) {
      const material=source.clone();
      if(source.color)material.color=source.color;
      material.clippingPlanes=[floor,ceiling];
      materials.set(source,material);
    }
    object.material=materials.get(source);
  });
});
const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});
renderer.setClearColor(0xffffff,0);
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.localClippingEnabled=true;
const raycaster=new THREE.Raycaster();
const pointer=new THREE.Vector2();
let selected=null,preview=null,keyboard=null,view='stack',active=null,frame=0,animation=null;
let inView=true,width=1,height=1;
let hoverExitTimer;
let lastMotionTime=performance.now();
let initialized=false,disposed=false,resizeObserver,intersectionObserver,pixelRatioQuery;
const ownedGeometries=new Set(),ownedMaterials=new Set(),ownedTextures=new Set();
scene.traverse(object=>{
  if(object.geometry)ownedGeometries.add(object.geometry);
  for(const material of Object.values(object.userData.materials||{}))ownedMaterials.add(material);
  const materials=object.material?(Array.isArray(object.material)?object.material:[object.material]):[];
  for(const material of materials){
    ownedMaterials.add(material);
    for(const value of Object.values(material))if(value?.isTexture)ownedTextures.add(value);
  }
});
function dispose() {
  if(disposed)return;
  disposed=true;clearTimeout(hoverExitTimer);
  if(frame)cancelAnimationFrame(frame);
  resizeObserver?.disconnect();intersectionObserver?.disconnect();
  ownedGeometries.forEach(geometry=>geometry.dispose());
  ownedMaterials.forEach(material=>material.dispose());
  ownedTextures.forEach(texture=>texture.dispose());
  renderer.dispose();
}
signal.addEventListener('abort',()=>{if(initialized)dispose();},{once:true});
const listen=(target,event,callback)=>target.addEventListener(event,callback,{signal});
try {

function applyReveal(layer,value,index) {
  const content=layer.userData.content;
  const presentation=modelPresentation(value,heights[index]);
  layer.userData.expansion=value;
  layer.userData.reveal=presentation.reveal;
  content.visible=presentation.visible;
  content.scale.setScalar(1);
  content.position.y=presentation.offsetY;
  // The card is a real mask: intact solids emerge through it, rather than
  // stretching vertically or appearing as an already-complete transparent model.
  layer.userData.surfaceClips[0].constant=-(layer.position.y+.06);
  layer.userData.surfaceClips[1].constant=view==='single'||index===0?1000:layers[index-1].position.y-.025;
  const flat=layer.userData.flat;
  flat.visible=presentation.flatOpacity>.00001;
  flat.userData.materials.forEach(material=>material.opacity=presentation.flatOpacity);
}

function applyPose(pose) {
  layers.forEach((layer,index)=>{
    layer.visible=pose[index].visible;
    layer.position.y=pose[index].y;
    layer.position.z=pose[index].z;
  });
  layers.forEach((layer,index)=>applyReveal(layer,pose[index].reveal,index));
  scene.updateMatrixWorld(true);
}

const palettes=root.dataset.diagramTheme==='neutral'?{
  normal:{body:'#ffffff',inset:'#f0f0f0',sensor:'#c9c9c9',outline:'#787878',detail:'#a0a0a0',hull:'#787878',logo:'#787878'},
  active:{body:'#fafafa',inset:'#e9e9e9',sensor:'#b7b7b7',outline:'#404040',detail:'#7c7c7c',hull:'#404040',logo:'#404040'},
  quiet:{body:'#ffffff',inset:'#f6f6f6',sensor:'#dedede',outline:'#aaaaaa',detail:'#c0c0c0',hull:'#aaaaaa',logo:'#aaaaaa'},
}:{
  normal:{body:'#ffffff',inset:'#f1f2f5',sensor:'#d1d4dc',outline:'#969ba8',detail:'#bec1cb',hull:'#969ba8',logo:'#969ba8'},
  active:{body:'#f9f7ff',inset:'#eae4ff',sensor:'#c5b6f6',outline:'#6552e5',detail:'#aa99e7',hull:'#6552e5',logo:'#6552e5'},
  quiet:{body:'#ffffff',inset:'#f7f7f9',sensor:'#e5e6eb',outline:'#c7cad2',detail:'#dddfe5',hull:'#c7cad2',logo:'#c7cad2'},
};
const paletteColors=Object.fromEntries(Object.entries(palettes).map(([state,colors])=>[state,Object.fromEntries(Object.entries(colors).map(([name,value])=>[name,new THREE.Color(value)]))]));

function applySpringPose() {
  const weights=springs.map(spring=>Math.max(0,Math.min(1,spring.value)));
  const total=Math.min(1,weights.reduce((sum,value)=>sum+value,0));
  applyPose(view==='single'?layoutFor(layerKeys.indexOf(active),heights,true):blendedLayout(weights,heights));
  layers.forEach((layer,index)=>{
    for(const [name,material] of Object.entries(layer.userData.materials)) {
      const normal=paletteColors.normal[name],quiet=paletteColors.quiet[name],highlight=paletteColors.active[name];
      const own=weights[index],other=Math.max(0,total-own),rest=1-total;
      material.color.setRGB(normal.r*rest+quiet.r*other+highlight.r*own,normal.g*rest+quiet.g*other+highlight.g*own,normal.b*rest+quiet.b*other+highlight.b*own);
    }
  });
}

function layoutLabels() {
  controls.forEach((button,index)=>{
    // Fixed controls remain easy to acquire as the cards move apart.
    const pos=view==='single' ? (index+.65)/4.3*100 : 30+index*13;
    button.style.setProperty('--position',pos+'%');
  });
}

function draw() {
  scene.updateMatrixWorld(true);
  renderer.render(scene,camera);
  canvas.dataset.frames=String(Number(canvas.dataset.frames||0)+1);
  stage.dataset.drawCalls=String(renderer.info.render.calls);
  stage.dataset.cardState=JSON.stringify(layers.map(layer=>({key:layer.name,y:Number(layer.position.y.toFixed(3)),z:Number(layer.position.z.toFixed(3)),expansion:Number(layer.userData.expansion.toFixed(4)),reveal:Number(layer.userData.reveal.toFixed(4)),modelY:Number(layer.userData.content.position.y.toFixed(4)),flat:layer.userData.flat.visible,visible:layer.visible})));
}

function visiblePoints() {
  const points=[];
  scene.updateMatrixWorld(true);
  scene.traverseVisible(object=>{
    if(!object.isMesh||object.material.transparent)return;
    object.geometry.computeBoundingBox();
    const b=object.geometry.boundingBox;
    for(const x of [b.min.x,b.max.x])for(const y of [b.min.y,b.max.y])for(const z of [b.min.z,b.max.z])points.push(new THREE.Vector3(x,y,z).applyMatrix4(object.matrixWorld));
  });
  return points;
}

function fit() {
  const points=[];
  if(view==='stack') {
    // Fit one stationary camera to every complete state. Hover never zooms.
    const snapshot=layers.map(layer=>({y:layer.position.y,z:layer.position.z,reveal:layer.userData.expansion,visible:layer.visible}));
    for(let index=-1;index<4;index++){applyPose(layoutFor(index,heights));points.push(...visiblePoints());}
    applyPose(snapshot);
  } else points.push(...visiblePoints());
  const center=new THREE.Box3().setFromPoints(points).getCenter(new THREE.Vector3());
  const direction=new THREE.Vector3(9,8.0,12).normalize();
  camera.position.copy(center).addScaledVector(direction,22);
  camera.lookAt(center);camera.updateMatrixWorld(true);
  const cameraBox=new THREE.Box3().setFromPoints(points.map(point=>point.clone().applyMatrix4(camera.matrixWorldInverse)));
  const offset=cameraBox.getCenter(new THREE.Vector3());
  const right=new THREE.Vector3(1,0,0).applyQuaternion(camera.quaternion);
  const up=new THREE.Vector3(0,1,0).applyQuaternion(camera.quaternion);
  const shift=right.multiplyScalar(offset.x).add(up.multiplyScalar(offset.y));
  camera.position.add(shift);center.add(shift);camera.lookAt(center);
  const size=cameraBox.getSize(new THREE.Vector3());
  const aspect=width/height;
  const pad=view==='stack'?.45:.60;
  const h=Math.max(size.y+pad,(size.x+.55)/aspect);
  camera.left=-h*aspect/2;camera.right=h*aspect/2;camera.top=h/2;camera.bottom=-h/2;
  camera.updateProjectionMatrix();camera.updateMatrixWorld(true);
}

function resize() {
  const rect=viewport.getBoundingClientRect();
  width=Math.max(1,rect.width);height=Math.max(1,rect.height);
  // Device density can change after mounting (zoom, display changes, or preview resizing).
  // Keep the drawing buffer in sync instead of stretching an old 1x frame on a 2x screen.
  const pixelRatio=Math.min(window.devicePixelRatio||1,2);
  if(renderer.getPixelRatio()!==pixelRatio)renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width,height,false);
  stage.dataset.pixelRatio=String(pixelRatio);
  layoutLabels();
  scene.updateMatrixWorld(true);fit();draw();
}

function watchPixelRatio() {
  pixelRatioQuery?.removeEventListener('change',onPixelRatioChange);
  pixelRatioQuery=matchMedia(`(resolution: ${window.devicePixelRatio||1}dppx)`);
  pixelRatioQuery.addEventListener('change',onPixelRatioChange,{signal});
}

function onPixelRatioChange() {watchPixelRatio();resize();}

function finishAnimation() {
  if(!animation)return;
  springs.forEach(spring=>{spring.value=spring.target;spring.velocity=0;});
  applySpringPose();
  animation=null;stage.dataset.renderState='idle';stage.dataset.motionPhase='idle';
}

function advanceAnimation(now) {
  if(!animation)return;
  const elapsed=Math.max(0,(now-lastMotionTime)/1000);
  lastMotionTime=now;
  const moving=springs.map(spring=>stepSpring(spring,elapsed)).some(Boolean);
  applySpringPose();
  if(!moving)finishAnimation();
}

function tick(now) {
  frame=0;
  if(!animation||!inView)return;
  advanceAnimation(now);
  draw();
  if(animation)frame=requestAnimationFrame(tick);
}

function render(source='pointer',announce=false) {
  const next=keyboard??preview??selected;
  if(announce)status.textContent=next?`${layerNames[next]} ${view==='single'?'shown':'expanded'}`:'Cards stacked';
  stage.dataset.input=source;
  if(next===active&&stage.dataset.ready==='true'&&source!=='keyboard')return;
  const now=performance.now();
  advanceAnimation(now);
  active=next;
  if(active)stage.dataset.active=active;else delete stage.dataset.active;
  controls.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.layer===active)));
  const index=layerKeys.indexOf(active);
  stage.dataset.presentation=view==='single'?'single':index<0?'collapsed':'expanded';
  springs.forEach((spring,i)=>{spring.target=i===index?1:0;});
  lastMotionTime=now;animation=true;
  stage.dataset.motionTiming=JSON.stringify(motion);
  stage.dataset.motionPhase=index<0?'submerging':'surface-reveal';
  if(view==='single') {
    if(frame)cancelAnimationFrame(frame);frame=0;
    finishAnimation();resize();
  } else if(source==='keyboard'||reduced.matches||!inView) {
    if(frame)cancelAnimationFrame(frame);frame=0;
    finishAnimation();draw();
  } else {
    stage.dataset.renderState='animating';
    if(!frame)frame=requestAnimationFrame(tick);
  }
}

function clearHoverExit() {clearTimeout(hoverExitTimer);}

function reset(source='keyboard') {
  clearHoverExit();
  selected=preview=keyboard=null;
  // Force the palette to reset even if a previous hover already left the scene.
  active=undefined;
  render(source,true);
}

function pick(event) {
  const rect=canvas.getBoundingClientRect();
  pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);
  raycaster.setFromCamera(pointer,camera);
  const hits=raycaster.intersectObjects(layers.filter(layer=>layer.visible),true).filter(hit=>hit.object.userData.pickable&&!hit.object.material.clippingPlanes?.some(plane=>plane.distanceToPoint(hit.point)<-.00001));
  if(!hits.length)return null;
  let object=hits[0].object;
  while(object&&!object.userData.layerKey)object=object.parent;
  return object?.userData.layerKey||null;
}

// Compile and upload offscreen before pointer handlers become active. The first
// expansion then uses the exact same shaders and geometry as later expansions.
applyPose(layoutFor(-1,heights));
layers.forEach(layer=>{layer.userData.content.visible=true;});
await renderer.compileAsync(scene,camera);
initialized=true;
if(signal.aborted){dispose();return;}
const warmTarget=new THREE.WebGLRenderTarget(1,1),culling=[];
scene.traverse(object=>{if(object.isMesh||object.isLine){culling.push([object,object.frustumCulled]);object.frustumCulled=false;}});
renderer.setRenderTarget(warmTarget);renderer.render(scene,camera);renderer.setRenderTarget(null);
culling.forEach(([object,value])=>{object.frustumCulled=value;});warmTarget.dispose();
applySpringPose();
stage.dataset.shadersWarmed='true';

listen(canvas,'pointermove',event=>{
  if(!fine.matches||event.pointerType!=='mouse')return;
  const key=pick(event);
  canvas.style.cursor=key?'pointer':'default';
  if(!key)return; // Keep selection stable while crossing an expanding gap.
  if(animation&&preview&&key!==preview&&hoverOrigin&&Math.hypot(event.clientX-hoverOrigin.x,event.clientY-hoverOrigin.y)<24)return;
  if(key!==preview)hoverOrigin={x:event.clientX,y:event.clientY};
  keyboard=null;preview=key;render();
});
// Keep a hover while travelling between the canvas, gaps, and fixed labels.
// Only leaving the whole illustration schedules a forgiving, short exit.
listen(stage,'pointerenter',clearHoverExit);
listen(stage,'pointermove',clearHoverExit);
listen(stage,'pointerleave',event=>{
  if(event.pointerType!=='mouse'||!fine.matches)return;
  clearHoverExit();
  hoverExitTimer=setTimeout(()=>{preview=null;render();},motion.hoverExit);
});
let down,hoverOrigin;
listen(canvas,'pointerdown',event=>{down={x:event.clientX,y:event.clientY};});
listen(canvas,'click',event=>{
  if(down&&Math.hypot(event.clientX-down.x,event.clientY-down.y)>8)return;
  const key=pick(event);if(!key)return;
  selected=selected===key?null:key;preview=keyboard=null;render('pointer',true);
});

controls.forEach((button,index)=>{
  // React to physical movement, not a pointerenter generated by a view resize.
  listen(button,'pointermove',event=>{
    if(!fine.matches||event.pointerType!=='mouse')return;
    keyboard=null;preview=button.dataset.layer;render();
  });
  listen(button,'focus',()=>{
    if(!button.matches(':focus-visible'))return;
    clearHoverExit();
    preview=null;keyboard=button.dataset.layer;render('keyboard',true);
  });
  listen(button,'blur',()=>{
    // A mouse click blurs the previous button too. It must not fast-forward an
    // in-flight pointer animation as though a keyboard shortcut had fired.
    if(keyboard!==button.dataset.layer)return;
    keyboard=null;render('keyboard');
  });
  listen(button,'click',event=>{
    selected=selected===button.dataset.layer?null:button.dataset.layer;
    preview=keyboard=null;render(event.detail===0?'keyboard':'pointer',true);
  });
  listen(button,'keydown',event=>{
    const steps={ArrowDown:1,ArrowRight:1,ArrowUp:-1,ArrowLeft:-1};
    if(event.key in steps||event.key==='Home'||event.key==='End') {
      event.preventDefault();
      const next=event.key==='Home'?0:event.key==='End'?3:(index+steps[event.key]+4)%4;
      controls[next].focus({preventScroll:true});
    }
  });
});

listen(root,'keydown',event=>{if(event.key==='Escape')reset('keyboard');});
listen(canvas,'webglcontextlost',event=>{
  event.preventDefault();
  stage.dataset.engine='fallback';
  controls.forEach(button=>button.disabled=true);
});
listen(canvas,'webglcontextrestored',()=>{stage.dataset.engine='webgl';controls.forEach(button=>button.disabled=false);resize();});
listen(reduced,'change',()=>{active=undefined;render('keyboard');});
listen(document,'visibilitychange',()=>{
  if(document.hidden){if(frame)cancelAnimationFrame(frame);frame=0;finishAnimation();}
  else draw();
});
intersectionObserver=new IntersectionObserver(entries=>{
  inView=entries[0].isIntersecting;
  if(!inView){if(frame)cancelAnimationFrame(frame);frame=0;finishAnimation();}
  else draw();
},{rootMargin:'100px'});
intersectionObserver.observe(viewport);
listen(window,'resize',resize);
watchPixelRatio();
resizeObserver=new ResizeObserver(resize);resizeObserver.observe(viewport);
stage.dataset.engine='webgl';stage.dataset.view='stack';
stage.dataset.models=layers.map(layer=>layer.name).join(',');
stage.dataset.ready='true';stage.dataset.renderState='idle';
controls.forEach(button=>button.disabled=false);
stage.dataset.presentation='collapsed';
let meshCount=0;scene.traverse(object=>{if(object.isMesh)meshCount++;});
stage.dataset.meshes=meshCount;
resize();

} catch(error) {
  initialized=true;dispose();throw error;
}
}
