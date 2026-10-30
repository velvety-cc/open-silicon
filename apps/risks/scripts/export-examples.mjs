import {mkdir,writeFile,readFile} from 'node:fs/promises';
import path from 'node:path';
import {createReleaseDirectory} from './paths.mjs';
import {TEMPLATES,DICTIONARY,overrideDeal,values} from '../model/inputs.mjs';
import {runScenario,compareWorkouts,compareScenarios} from '../model/engine.mjs';
import {exportReviewPackage,assumptionRows,csv,FORMULA_MAPPING} from '../model/export.mjs';
const args=process.argv.slice(2);
if(args.length&&(args.length!==2||args[0]!=='--output'))throw Error('Usage: npm run examples:risks -- --output /new/release');
const root=await createReleaseDirectory('risks-examples',args[1]);
await mkdir(path.join(root,'docs'),{recursive:true});
await mkdir(path.join(root,'examples'),{recursive:true});
for(const [configuration,deal]of Object.entries(TEMPLATES)){
 const settings={defaultDate:'2027-11-02',defaultType:'borrower',strategy:'liquidate'},r=runScenario(deal,settings),pkg=exportReviewPackage(deal,r,{workoutComparisons:compareWorkouts(deal,settings).map(r=>({settings:r.settings,summary:r.summary,eligibility:r.eligibility})),scenarioComparisons:compareScenarios(deal,settings).map(({name,result})=>({name,summary:result.summary}))});
 await writeFile(path.join(root,'examples',`${configuration}-review.json`),JSON.stringify(pkg,null,2)+'\n');
 await writeFile(path.join(root,'examples',`${configuration}-monthly.csv`),csv(r.monthly));
 await writeFile(path.join(root,'examples',`${configuration}-assumptions.csv`),csv(assumptionRows(deal)));
}
const conservative=overrideDeal(TEMPLATES.standard,{prepayFraction:0,utilization:.8,availability:.95,price:4.64,annualDecay:.45,haircut:.35},'GB300 conservative working illustration');
await writeFile(path.join(root,'examples','conservative-inputs.json'),JSON.stringify({modelVersion:'1.0.0',deal:conservative,settings:{defaultDate:'2027-11-02',defaultType:'borrower',strategy:'liquidate'}},null,2)+'\n');
await writeFile(path.join(root,'docs','source-mapping.csv'),csv(FORMULA_MAPPING));
await writeFile(path.join(root,'docs','assumptions-dictionary.csv'),csv(Object.values(DICTIONARY).map(d=>{const a=TEMPLATES.standard.assumptions[d.key];return {...d,...a};})));
console.log(JSON.stringify({output:root,examples:['standard','throttled','conservative']},null,2));
