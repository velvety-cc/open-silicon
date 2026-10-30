import * as THREE from 'three';

// These illustrations have rigid geometry. Preserve every endpoint, material
// and local transform while submitting their lines in one call per material.
export function batchLines(root) {
  root.updateWorldMatrix(true,true);
  const inverse=root.matrixWorld.clone().invert(),batches=new Map(),originals=[];
  const from=new THREE.Vector3(),to=new THREE.Vector3();
  let segments=0;
  root.traverse(object=>{
    if(!object.isLine)return;
    const material=object.material,geometry=object.geometry,positions=geometry.attributes.position;
    if(!positions||Array.isArray(material))return;
    if(!batches.has(material))batches.set(material,[]);
    const points=batches.get(material),matrix=new THREE.Matrix4().multiplyMatrices(inverse,object.matrixWorld);
    const index=geometry.index,available=index?index.count:positions.count;
    const start=geometry.drawRange.start,end=Math.min(available,start+geometry.drawRange.count);
    const append=(a,b)=>{
      from.fromBufferAttribute(positions,index?index.getX(a):a).applyMatrix4(matrix);
      to.fromBufferAttribute(positions,index?index.getX(b):b).applyMatrix4(matrix);
      points.push(from.x,from.y,from.z,to.x,to.y,to.z);segments++;
    };
    if(object.isLineSegments){for(let i=start;i+1<end;i+=2)append(i,i+1);}
    else {
      for(let i=start;i+1<end;i++)append(i,i+1);
      if(object.isLineLoop&&end-start>1)append(end-1,start);
    }
    originals.push(object);
  });
  const removed=new Set();
  originals.forEach(object=>{object.removeFromParent();removed.add(object.geometry);});
  removed.forEach(geometry=>geometry.dispose());
  for(const [material,points] of batches) {
    const geometry=new THREE.BufferGeometry();
    geometry.setAttribute('position',new THREE.Float32BufferAttribute(points,3));
    root.add(new THREE.LineSegments(geometry,material));
  }
  return {before:originals.length,after:batches.size,segments};
}
