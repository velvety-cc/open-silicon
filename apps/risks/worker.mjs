import {runScenario,compareWorkouts,compareScenarios,sensitivityGrid,solveThreshold,solveStructures} from './model/engine.mjs';
import {hash,values} from './model/inputs.mjs';
self.onmessage=({data:{id,kind,deal,settings,options}})=>{
 try{
  let result;
  if(kind==='run'){
   const selected=runScenario(deal,settings);
   result={selected,workouts:settings.defaultDate?compareWorkouts(deal,settings).map(r=>({summary:r.summary,eligibility:r.eligibility,settings:r.settings,warnings:r.warnings,valid:r.valid,errors:r.errors})):[],scenarios:compareScenarios(deal,settings).map(({name,result:r})=>({name,summary:r.summary,monthly:r.monthly,warnings:r.warnings,valid:r.valid})),hash:hash(deal)};
  }else if(kind==='grid')result=sensitivityGrid(deal,settings,options);
  else if(kind==='solve')result=solveThreshold(deal,settings,options);
  else if(kind==='structures')result=solveStructures(deal,settings,options);
  self.postMessage({id,kind,result});
 }catch(error){self.postMessage({id,kind,error:error.message});}
};
