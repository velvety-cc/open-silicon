import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import {SVGLoader} from 'three/examples/jsm/loaders/SVGLoader.js';
import {nvidiaSvg} from './brand-mark.mjs';
import {createFlatIllustration} from './flat-illustrations.mjs';

export const layerKeys=['customer','gpu','site','capital'];
export const layerNames={customer:'Customer',gpu:'GPU',site:'Operator and Site',capital:'Capital'};


export function createDeploymentLayers(options={}) {
const geometries = new Map();
const edges = new Map();
const UP = new THREE.Vector3(0, 1, 0);

function geometry(key, create) {
  if (!geometries.has(key)) {
    const g = create();
    // A restrained, fixed light direction keeps the illustration close to a
    // white technical drawing while still giving every solid a visible side.
    const normals = g.getAttribute('normal');
    const colors = [];
    for (let i = 0; i < normals.count; i++) {
      const light = Math.max(0, normals.getY(i)) * .055 + Math.max(0, normals.getZ(i)) * .014;
      const value = .91 + light;
      colors.push(value, value, Math.min(1, value + .008));
    }
    g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometries.set(key, g);
  }
  return geometries.get(key);
}

function palette() {
  return {
    body: new THREE.MeshBasicMaterial({color:'#ffffff', vertexColors:true, polygonOffset:true, polygonOffsetFactor:1, polygonOffsetUnits:1}),
    inset: new THREE.MeshBasicMaterial({color:'#f1f2f5', vertexColors:true, polygonOffset:true, polygonOffsetFactor:1, polygonOffsetUnits:1}),
    sensor: new THREE.MeshBasicMaterial({color:'#d1d4dc', vertexColors:true}),
    outline: new THREE.LineBasicMaterial({color:'#969ba8'}),
    detail: new THREE.LineBasicMaterial({color:'#bec1cb'}),
    hull: new THREE.MeshBasicMaterial({color:'#969ba8', side:THREE.BackSide}),
    logo: new THREE.MeshBasicMaterial({color:'#969ba8',depthWrite:false}),
  };
}

function solid(parent, g, p, position=[0,0,0], material='body', outline=true) {
  const group = new THREE.Group();
  group.position.fromArray(position);
  const mesh = new THREE.Mesh(g, p[material]);
  mesh.userData.pickable = true;
  group.add(mesh);
  if (outline) {
    if (!edges.has(g.uuid)) edges.set(g.uuid, new THREE.EdgesGeometry(g, 25));
    group.add(new THREE.LineSegments(edges.get(g.uuid), p.outline));
  }
  parent.add(group);
  return group;
}

function box(parent, p, size, position, material='body') {
  return solid(parent, geometry('box:'+size.join(','),()=>new THREE.BoxGeometry(...size)), p, position, material);
}

function rounded(parent,p,size,position,radius=.035,material='body') {
  const g=geometry('rounded:'+size.join(',')+':'+radius,()=>new RoundedBoxGeometry(...size,3,radius));
  const object=solid(parent,g,p,position,material,false);
  const hull=new THREE.Mesh(g,p.hull);
  hull.scale.set(1.018,1.018,1.025);
  object.add(hull);
  return object;
}

function cylinder(parent, p, radius, height, position, material='body', segments=24) {
  const g = geometry(`cylinder:${radius},${height},${segments}`,()=>new THREE.CylinderGeometry(radius,radius,height,segments));
  const object = solid(parent,g,p,position,material);
  // Silhouettes close the curved sides, while EdgesGeometry draws the two rims.
  const hull = new THREE.Mesh(g,p.hull);
  hull.scale.set(1.024,1.006,1.024);
  object.add(hull);
  return object;
}

function line(parent,p,points,detail=true,closed=false) {
  const g = new THREE.BufferGeometry().setFromPoints(points.map(point=>new THREE.Vector3(...point)));
  const item = closed ? new THREE.LineLoop(g,detail?p.detail:p.outline) : new THREE.Line(g,detail?p.detail:p.outline);
  parent.add(item);
  return item;
}

function loop(parent,p,center,rx,rz,detail=true) {
  const points = Array.from({length:48},(_,i)=>{
    const a=i/48*Math.PI*2;
    return [center[0]+Math.cos(a)*rx,center[1],center[2]+Math.sin(a)*rz];
  });
  return line(parent,p,points,detail,true);
}

function beam(parent,p,a,b,width,depth=width) {
  const from=new THREE.Vector3(...a),to=new THREE.Vector3(...b);
  const item=box(parent,p,[width,from.distanceTo(to),depth],from.clone().add(to).multiplyScalar(.5).toArray());
  item.quaternion.setFromUnitVectors(UP,to.sub(from).normalize());
  return item;
}

function roundRectangle(w,d,r) {
  const s=new THREE.Shape(),x=-w/2,z=-d/2;
  s.moveTo(x+r,z);s.lineTo(x+w-r,z);s.quadraticCurveTo(x+w,z,x+w,z+r);
  s.lineTo(x+w,z+d-r);s.quadraticCurveTo(x+w,z+d,x+w-r,z+d);
  s.lineTo(x+r,z+d);s.quadraticCurveTo(x,z+d,x,z+d-r);
  s.lineTo(x,z+r);s.quadraticCurveTo(x,z,x+r,z);
  return s;
}

function plate(parent,p) {
  const shape=roundRectangle(4,2.25,.14);
  const g=geometry('plate',()=>{
    const result=new THREE.ExtrudeGeometry(shape,{depth:.055,bevelEnabled:false,curveSegments:8});
    result.rotateX(-Math.PI/2);
    return result;
  });
  solid(parent,g,p,[0,0,0],'body',false);
  for(const y of [0,.056]) {
    const points=shape.getPoints(72).map(v=>[v.x,y,-v.y]);
    line(parent,p,points,false,true);
  }
  const inset=roundRectangle(3.82,2.07,.1);
  line(parent,p,inset.getPoints(72).map(v=>[v.x,.058,-v.y]),true,true);
}

let shadowTexture;
function contact(parent, x,z,sx,sz,opacity=.075) {
  if(!shadowTexture) {
    const canvas=document.createElement('canvas');canvas.width=canvas.height=64;
    const ctx=canvas.getContext('2d');
    const gradient=ctx.createRadialGradient(32,32,0,32,32,32);
    gradient.addColorStop(0,'rgba(45,42,65,.7)');gradient.addColorStop(.5,'rgba(45,42,65,.25)');gradient.addColorStop(1,'rgba(45,42,65,0)');
    ctx.fillStyle=gradient;ctx.fillRect(0,0,64,64);
    shadowTexture=new THREE.CanvasTexture(canvas);
  }
  const material=new THREE.MeshBasicMaterial({map:shadowTexture,transparent:true,opacity,depthWrite:false});
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(sx,sz),material);
  mesh.rotation.x=-Math.PI/2;mesh.position.set(x,.064,z);
  parent.add(mesh);
}

function humanoid(parent,p) {
  const robot=new THREE.Group();robot.position.set(-.73,.07,-.12);robot.rotation.y=-.10;parent.add(robot);
  // Feet, articulated legs and pelvis.
  for(const side of [-1,1]) {
    const x=side*.15;
    box(robot,p,[.17,.075,.30],[x,.04,.06]);
    beam(robot,p,[x,.10,0],[x,.39,-.015],.095,.10);
    const knee=cylinder(robot,p,.066,.125,[x,.39,-.015]);knee.rotation.z=Math.PI/2;
    beam(robot,p,[x,.44,-.015],[side*.13,.68,0],.115,.13);
  }
  rounded(robot,p,[.37,.14,.24],[0,.70,0],.025);
  box(robot,p,[.19,.065,.18],[0,.80,0],'inset');
  rounded(robot,p,[.46,.37,.28],[0,1.015,0],.048);
  // The front panel and shoulder joints establish a humanoid machine silhouette.
  rounded(robot,p,[.30,.22,.018],[0,1.025,.148],.008,'inset');
  line(robot,p,[[-.11,1.065,.158],[.11,1.065,.158]],true);
  line(robot,p,[[-.11,1.01,.158],[.02,1.01,.158]],true);
  for(const side of [-1,1]) {
    const shoulder=cylinder(robot,p,.083,.12,[side*.29,1.10,0]);shoulder.rotation.z=Math.PI/2;
    beam(robot,p,[side*.31,1.06,0],[side*.40,.83,.04],.095,.105);
    const elbow=cylinder(robot,p,.062,.10,[side*.40,.81,.04]);elbow.rotation.z=Math.PI/2;
    beam(robot,p,[side*.40,.77,.04],[side*.37,.56,.11],.085,.10);
    box(robot,p,[.10,.12,.09],[side*.37,.50,.11]);
    line(robot,p,[[side*.37,.51,.158],[side*.37,.46,.158]],true);
  }
  cylinder(robot,p,.075,.075,[0,1.24,0],'inset');
  rounded(robot,p,[.29,.30,.25],[0,1.41,0],.08);
  rounded(robot,p,[.23,.08,.014],[0,1.425,.126],.006,'sensor');
  line(robot,p,[[-.075,1.425,.145],[-.035,1.425,.145]],false);
  line(robot,p,[[.035,1.425,.145],[.075,1.425,.145]],false);
  contact(parent,-.73,-.04,.85,.6,.12);
}

function quadruped(parent,p) {
  const dog=new THREE.Group();dog.position.set(.72,.07,.24);dog.rotation.y=-.12;parent.add(dog);
  rounded(dog,p,[.79,.235,.31],[0,.57,0],.045);
  box(dog,p,[.53,.025,.28],[-.02,.701,0],'inset');
  line(dog,p,[[-.21,.718,-.085],[.19,.718,-.085]],true);
  line(dog,p,[[-.21,.718,.035],[.19,.718,.035]],true);
  for(const x of [-.27,.27]) for(const z of [-.18,.18]) {
    const joint=cylinder(dog,p,.067,.085,[x,.55,z]);joint.rotation.x=Math.PI/2;
    const kneeX=x+(x>0?.11:-.11);
    beam(dog,p,[x,.50,z],[kneeX,.285,z],.068,.07);
    const knee=cylinder(dog,p,.048,.08,[kneeX,.275,z]);knee.rotation.x=Math.PI/2;
    beam(dog,p,[kneeX,.24,z],[x+.035,.075,z],.052,.06);
    box(dog,p,[.15,.05,.105],[x+.055,.043,z]);
  }
  beam(dog,p,[.34,.59,0],[.48,.72,0],.13,.13);
  rounded(dog,p,[.22,.175,.25],[.51,.75,0],.035);
  box(dog,p,[.012,.095,.185],[.627,.76,0],'sensor');
  for(const z of [-.052,.052]) {
    const eye=cylinder(dog,p,.019,.008,[.637,.765,z],'inset',16);eye.rotation.z=Math.PI/2;
  }
  beam(dog,p,[-.37,.59,0],[-.53,.70,0],.035,.035);
  contact(parent,.72,.24,1.38,.78,.12);
}

function customer(parent,p) {humanoid(parent,p);quadruped(parent,p);}

let nvidiaShapes;
function makerMark(parent,p,width,position,horizontal=false) {
  nvidiaShapes??=new SVGLoader().parse(nvidiaSvg).paths.flatMap(path=>path.toShapes()).map(shape=>new THREE.ShapeGeometry(shape));
  const mark=new THREE.Group(),scale=width/108.472,height=width*20/108.472;
  const drawing=new THREE.Group();drawing.scale.set(scale,-scale,scale);
  drawing.position.set(-width/2,height/2,0);
  nvidiaShapes.forEach(shape=>drawing.add(new THREE.Mesh(shape,p.logo)));
  mark.add(drawing);mark.position.fromArray(position);
  if(horizontal)mark.rotation.x=-Math.PI/2;
  parent.add(mark);
}

function gpu(parent,p,options) {
  // Based on our compute-rack.webp: tall cabinet, recessed rails, alternating
  // vented server modules, a solid side panel, a door handle and leveling feet.
  for(const x of [-.86,0,.86]) {
    const rack=new THREE.Group();rack.position.set(x,.07,.05);parent.add(rack);
    for(const dx of [-.235,.235])for(const z of [-.28,.28]) cylinder(rack,p,.035,.05,[dx,.03,z],'inset',16);
    box(rack,p,[.60,1.46,.73],[0,.80,0]);
    box(rack,p,[.50,1.29,.016],[0,.79,.373],'inset');
    for(const dx of [-.267,.267])box(rack,p,[.034,1.39,.025],[dx,.80,.39]);
    // Rack units alternate front grilles and vertical drive bays.
    for(let row=0;row<6;row++) {
      const y=.245+row*.187;
      box(rack,p,[.435,.147,.020],[0,y,.394]);
      if(row%2===0) {
        for(const dy of [-.043,0,.043])line(rack,p,[[-.182,y+dy,.409],[.182,y+dy,.409]],true);
      } else {
        for(const dx of [-.16,-.08,0,.08,.16]) {
          line(rack,p,[[dx-.023,y-.052,.409],[dx-.023,y+.052,.409],[dx+.023,y+.052,.409],[dx+.023,y-.052,.409]],true,true);
        }
      }
    }
    // The side-panel seams and handle remain readable at the stack's scale.
    line(rack,p,[[.302,.25,-.27],[.302,.25,.26],[.302,1.35,.26],[.302,1.35,-.27]],true,true);
    box(rack,p,[.016,.14,.025],[.304,.83,.22],'inset');
    box(rack,p,[.025,.18,.025],[-.246,.71,.414],'inset');
    contact(parent,x,.05,.86,1.0,.14);
  }
  // Keep the single maker's mark on the tray; cabinet fronts remain unbranded.
  if(options.loadTextures!==false) {
    makerMark(parent,p,1.0,[0,.068,.88],true);
  }
}

function site(parent,p) {
  const hall=box(parent,p,[2.5,.54,1.13],[-.29,.34,-.11]);
  box(parent,p,[2.59,.055,1.22],[-.29,.64,-.11]);
  // Four roof cooling units make the building legible as a compute site.
  for(const x of [-.98,-.34,.30,.91]) {
    box(parent,p,[.43,.10,.52],[x-.08,.72,-.12],'inset');
    cylinder(parent,p,.16,.035,[x-.08,.79,-.12]);
    loop(parent,p,[x-.08,.81,-.12],.115,.115,true);
    line(parent,p,[[x-.08-.10,.812,-.12],[x-.08+.10,.812,-.12]],true);
    line(parent,p,[[x-.08,.812,-.22],[x-.08,.812,-.02]],true);
  }
  for(const x of [-1.23,-.67,-.11,.45]) {
    box(parent,p,[.40,.37,.015],[x,.31,.464],'inset');
    for(const y of [.22,.29,.36]) line(parent,p,[[x-.13,y,.476],[x+.13,y,.476]],true);
  }
  for(const z of [-.40,.12,.64]) {
    box(parent,p,[.30,.57,.36],[1.34,.355,z]);
    box(parent,p,[.20,.30,.01],[1.34,.38,z+.188],'inset');
    line(parent,p,[[1.27,.57,z+.19],[1.41,.57,z+.19]],true);
  }
  contact(parent,-.15,0,3.65,1.85,.10);
  void hall;
}

function capital(parent,p) {
  const bundles=[[-.86,-.23,.10],[0,-.23,.16],[.86,-.23,.23]];
  for(const [x,z,height] of bundles) {
    const bundle=new THREE.Group();bundle.position.set(x,.07,z);bundle.rotation.y=Math.PI/2;parent.add(bundle);
    // Portrait banknotes retain the thinner stack and fine paper edges.
    box(bundle,p,[1.08,height,.50],[0,height/2,0]);
    for(let i=1;i<5;i++) {
      const y=height*i/5;
      line(bundle,p,[[-.54,y,.251],[.54,y,.251],[.541,y,-.25]],true);
    }
    const border=roundRectangle(.96,.40,.025);
    line(bundle,p,border.getPoints(48).map(point=>[point.x,height+.002,-point.y]),true,true);
    loop(bundle,p,[-.31,height+.003,0],.095,.13,true);
    loop(bundle,p,[-.31,height+.003,0],.070,.102,true);
    // The paper band wraps over the top and down both short ends of the bundle.
    box(bundle,p,[.17,.012,.52],[0,height+.007,0],'inset');
    for(const side of [-1,1])box(bundle,p,[.17,height+.012,.009],[0,height/2,side*.255],'inset');
    contact(parent,x,z,.78,1.35,.10);
  }
  for(const [x,z,count] of [[-.24,.60,3],[.25,.61,5]]) {
    for(let i=0;i<count;i++) cylinder(parent,p,.195,.048,[x,.09+i*.052,z]);
    loop(parent,p,[x,.115+(count-1)*.052,z],.147,.147,true);
    contact(parent,x,z,.6,.6,.08);
  }
}


  const builders={customer,gpu,site,capital};
  return layerKeys.map((key,index)=>{
    const group=new THREE.Group();group.name=key;group.userData.layerKey=key;
    group.userData.baseY=[6.8,4.2,2.1,0][index];
    group.position.y=group.userData.baseY;
    const materials=palette();
    group.userData.materials=materials;
    plate(group,materials);
    const flat=createFlatIllustration(key,materials);
    group.add(flat);group.userData.flat=flat;
    const content=new THREE.Group();content.name=key+'-content';
    group.add(content);group.userData.content=content;
    builders[key](content,materials,options);
    group.updateMatrixWorld(true);
    group.userData.contentHeight=new THREE.Box3().setFromObject(content).max.y-group.position.y;
    group.userData.reveal=1;
    return group;
  });
}
