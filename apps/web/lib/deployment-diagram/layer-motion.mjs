import {layoutFor} from './layer-layout.mjs';

// A critically damped spring: Emil's mass/stiffness vocabulary, with damping
// derived as 2 * sqrt(mass * stiffness). No bounce and no velocity reset.
export const motion={mass:1,stiffness:100,damping:20,hoverExit:100};
const omega=Math.sqrt(motion.stiffness/motion.mass);
const clamp=value=>Math.max(0,Math.min(1,value));
const smooth=(value,from,to)=>{const t=clamp((value-from)/(to-from));return t*t*(3-2*t);};

export function createSpring(value=0) {return {value,velocity:0,target:value};}

// Exact solution rather than frame-dependent Euler integration. Changing the
// target alone preserves both position and velocity, including on reversal.
export function stepSpring(spring,seconds) {
  if(seconds<=0)return spring.value!==spring.target||spring.velocity!==0;
  const offset=spring.value-spring.target;
  const carry=spring.velocity+omega*offset;
  const decay=Math.exp(-omega*seconds);
  spring.value=spring.target+(offset+carry*seconds)*decay;
  spring.velocity=(spring.velocity-omega*carry*seconds)*decay;
  if(Math.abs(spring.value-spring.target)<.00025&&Math.abs(spring.velocity)<.0025) {
    spring.value=spring.target;spring.velocity=0;return false;
  }
  return true;
}

// One expansion value drives each card and its intact model. A small initial
// movement opens the card before its objects rise through the card surface.
export function modelPresentation(expansion,height) {
  const reveal=smooth(expansion,.08,1);
  return {reveal,offsetY:reveal===1?0:-height*(1-reveal),flatOpacity:1-smooth(expansion,.08,.35),visible:reveal>.00001};
}

export function blendedLayout(weights,heights) {
  const rest=layoutFor(-1,heights);
  const open=heights.map((_,index)=>layoutFor(index,heights));
  return rest.map((pose,index)=>({
    ...pose,
    y:pose.y+weights.reduce((sum,weight,layer)=>sum+(open[layer][index].y-pose.y)*clamp(weight),0),
    reveal:clamp(weights[index]),
  }));
}
