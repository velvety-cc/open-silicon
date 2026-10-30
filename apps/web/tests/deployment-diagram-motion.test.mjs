import assert from 'node:assert/strict';
import {layoutFor,CARD_GAP} from '../lib/deployment-diagram/layer-layout.mjs';
import {createSpring,stepSpring,modelPresentation,blendedLayout} from '../lib/deployment-diagram/layer-motion.mjs';
const heights=[1.6327,1.6,.812,.324];
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} differs from ${b}`);

// Identical physical response at different display refresh rates.
const response=steps=>{const spring=createSpring();spring.target=1;for(let i=0;i<steps;i++)stepSpring(spring,.32/steps);return spring;};
const sixty=response(20),oneTwenty=response(40);close(sixty.value,oneTwenty.value);close(sixty.velocity,oneTwenty.velocity);

// Retargeting retains momentum and reverses without a position/velocity jump.
const reversing=createSpring();reversing.target=1;stepSpring(reversing,.15);
const before={...reversing};reversing.target=0;stepSpring(reversing,0);
close(reversing.value,before.value);close(reversing.velocity,before.velocity);
stepSpring(reversing,.00001);assert.ok(reversing.value>before.value);assert.ok(Math.abs(reversing.velocity-before.velocity)<.01);
for(let i=0;i<200;i++)stepSpring(reversing,1/120);
assert.equal(reversing.value,0);assert.equal(reversing.velocity,0);

for(let selected=-1;selected<4;selected++) {
 const weights=heights.map((_,i)=>Number(i===selected)),pose=blendedLayout(weights,heights),expected=layoutFor(selected,heights);
 pose.forEach((p,i)=>{close(p.y,expected[i].y);close(p.z,expected[i].z);assert.equal(p.reveal,expected[i].reveal);});
}
for(const height of heights) {
 assert.deepEqual(modelPresentation(0,height),{reveal:0,offsetY:-height,flatOpacity:1,visible:false});
 const expanded=modelPresentation(1,height);assert.equal(expanded.offsetY,0);assert.equal(expanded.flatOpacity,0);assert.equal(expanded.reveal,1);
 let previous=-height;
 for(let i=0;i<=1000;i++){const p=modelPresentation(i/1000,height);assert.ok(p.offsetY>=previous&&p.offsetY<=0);previous=p.offsetY;}
}

// Rapid switches, interrupted exits and immediate re-entry: cards remain ordered,
// no bounce/overshoot, and every visible solid fits into its actual card gap.
const springs=heights.map(()=>createSpring());
const targets=[0,2,1,-1,3,0,3,-1,1,2,0,-1];
for(let frame=0;frame<3600;frame++) {
 if(frame%19===0){const selected=targets[(frame/19)%targets.length|0];springs.forEach((spring,i)=>{spring.target=Number(i===selected);});}
 springs.forEach(spring=>stepSpring(spring,1/120));
 const weights=springs.map(s=>s.value),total=weights.reduce((sum,value)=>sum+value,0);
 assert.ok(total>=-1e-9&&total<=1+1e-9);weights.forEach(w=>assert.ok(w>=-1e-9&&w<=1+1e-9));
 const pose=blendedLayout(weights,heights);
 for(let i=1;i<4;i++) {
  const gap=pose[i-1].y-pose[i].y;assert.ok(gap>=CARD_GAP-1e-9);
  const visibleHeight=heights[i]+modelPresentation(weights[i],heights[i]).offsetY;
  assert.ok(visibleHeight<=gap-.025+1e-9,'solid must fit before ceiling clipping');
 }
}
springs.forEach(s=>{s.target=0;});for(let i=0;i<300;i++)springs.forEach(s=>stepSpring(s,1/120));
springs.forEach(s=>{assert.equal(s.value,0);assert.equal(s.velocity,0);});
console.log('Passed: refresh-rate independence, velocity-continuous reversals, 3,600 rapid-switch frames, solid clearance and exact resting poses.');
