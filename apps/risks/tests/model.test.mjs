import test from 'node:test';
import assert from 'node:assert/strict';
import {TEMPLATES,values,overrideDeal,hash,DICTIONARY} from '../model/inputs.mjs';
import {allocatePrincipal,recoveryWaterfall,creditInvoice,xirr,addMonths} from '../model/finance.mjs';
import {runScenario,validateInputs,compareWorkouts,sensitivityGrid,solveThreshold,economicValue} from '../model/engine.mjs';
import {exportReviewPackage} from '../model/export.mjs';
const approx=(a,b,t=1e-6)=>assert.ok(Math.abs(a-b)<t,`${a} ≠ ${b}`);
function small(changes={}){
 return overrideDeal(TEMPLATES.standard,{equipmentCost:100,siteNrc:0,networkingExtra:0,installation:0,otherCapex:0,quantity:1,gpusPerRack:1,siteRate:0,rackKw:0,reserveKw:0,ltv:1,equity:100,price:0,prepayFraction:0,coupon:0,tenor:12,amortMonths:12,frequency:3,firstWire:'2025-01-01',draw2Date:'2025-02-01',equityDate:'2025-01-01',delivery:'2025-01-01',installationDate:'2025-01-01',commission:'2025-01-01',acceptance:'2025-01-01',billingStart:'2025-01-01',siteStart:'2025-01-01',prepayDate:'2025-01-01',accrualStart:'2025-01-01',cashInterestStart:'2025-04-01',principalStart:'2025-04-01',horizonMonths:24,legalCost:0,enforcementCost:0,storageCost:0,preservationCost:0,deinstallCost:0,remarketCost:0,transportCost:0,reinstallCost:0,newSiteNrc:0,...changes});
}
function reconcile(r){assert.equal(r.valid,true);for(const[k,v]of Object.entries(r.summary.reconciliation))approx(v,0,1e-4);for(const row of r.ledger)assert.ok(row.borrowerCash>=-1e-7);}
test('zero coupon: 100 advanced, four cash receipts of 25, zero balance and IRR',()=>{
 const r=runScenario(small());reconcile(r);assert.deepEqual(r.cashFlows.filter(f=>f.kind.includes('principal')).map(f=>f.amount),[25,25,25,25]);approx(r.summary.originalRecovered,100);approx(r.summary.originalOutstanding,0);approx(r.summary.irr,0);assert.deepEqual(r.summary.milestones[100],{date:'2026-01-01',month:'2026-01'});
});
test('scheduled payments alone do not reduce principal without cash',()=>{
 const r=runScenario(small({equity:0}));reconcile(r);assert.ok(r.ledger.some(r=>r.scheduledPrincipal>0));approx(r.summary.originalRecovered,0);approx(r.summary.originalOutstanding,100);assert.ok(r.summary.maxCashGap>=100);
});
test('PIK pro-rata allocation: 100 original + 10 PIK, cash 55 repays 50 original and 5 PIK',()=>{
 const r=allocatePrincipal(55,{original:100,pik:10,workout:0},'pro-rata');approx(r.paid.original,50);approx(r.paid.pik,5);approx(r.balance.original+r.balance.pik,55);
});
test('liquidation fixture: prior 20 + net 50 = recovery 70, original loss 30',()=>{
 const r=recoveryWaterfall({proceeds:70,costs:5,senior:15,balance:{original:80,pik:0,workout:0}});approx(r.paid.original,50);approx(100-(20+r.paid.original),30);
});
test('prepayment credits are not another cash receipt',()=>{const r=creditInvoice(30,10);approx(r.cashDue,20);approx(10+r.cashDue,30);approx(r.remainingPrepayment,0);});
test('workout funding is distinct: original loss 10, net lender cash loss 20',()=>{
 const r=allocatePrincipal(90,{original:100,pik:0,workout:10});approx(r.balance.original,10);approx(r.balance.workout,10);approx(-(-100-10+90),20);
});
test('dated annual IRR depends on receipt date, ACT/365',()=>{
 approx(xirr([{date:'2025-01-01',amount:-100},{date:'2026-01-01',amount:110}]).value,.1);
 approx(xirr([{date:'2025-01-01',amount:-100},{date:'2027-01-01',amount:110}]).value,Math.sqrt(1.1)-1);
});
test('no IRR root and multiple IRR roots warn explicitly',()=>{
 assert.equal(xirr([{date:'2025-01-01',amount:-100}]).value,null);
 const r=xirr([{date:'2025-01-01',amount:-100},{date:'2026-01-01',amount:230},{date:'2027-01-01',amount:-132}]);assert.equal(r.value,null);assert.equal(r.roots.length,2);assert.match(r.warning,/Multiple/);
});
test('standard and throttled source assumptions remain distinct and immutable',()=>{
 assert.equal(values(TEMPLATES.standard).equipmentCost,280e6);assert.equal(values(TEMPLATES.throttled).equipmentCost,240e6);const h=hash(TEMPLATES.standard);overrideDeal(TEMPLATES.standard,{price:0});assert.equal(hash(TEMPLATES.standard),h);assert.throws(()=>{TEMPLATES.standard.assumptions.price.value=7;});
});
test('all material fields have provenance; null is missing, numeric zero is valid',()=>{
 for(const a of Object.values(TEMPLATES.standard.assumptions))for(const k of ['value','unit','currency','source','sourceDate','status'])assert.ok(k in a);
 const missing=overrideDeal(small(),{coupon:null});assert.equal(validateInputs(missing).valid,false);assert.equal(validateInputs(small({coupon:0})).valid,true);
});
test('zero revenue, zero resale, predeployment default, partial draws and unpaid costs reconcile',()=>{
 const d=small({equity:0,draw2Fraction:.5,delivery:'2025-03-01',installationDate:'2025-03-01',commission:'2025-03-01',acceptance:'2025-03-01',billingStart:'2025-03-01',resaleQuote:0});const r=runScenario(d,{defaultDate:'2025-01-15',strategy:'liquidate'});reconcile(r);approx(r.summary.originalAdvanced,50);approx(r.summary.originalRecovered,0);assert.ok(r.summary.atDefault.fundedNotOperating>0);
});
test('sold asset produces no later revenue; recovery cannot exceed principal claim',()=>{
 const r=runScenario(small({price:1,equity:0}),{defaultDate:'2025-02-01',strategy:'liquidate'});reconcile(r);assert.ok(r.ledger.filter(row=>row.date>=r.summary.saleDate).every(row=>row.revenue===0&&row.assetState==='sold'));assert.ok(r.summary.originalRecovered<=100+1e-7);
});
test('unavailable guarantees are excluded and deposit consumed in operations is not terminal collateral',()=>{
 const r=runScenario(small({equity:0,resaleQuote:0,supportDeposit:10,depositReleaseDate:'2025-01-02',depositRelease:10,depositAvailable:true,guarantee:100,guaranteeAvailable:false,guaranteeCollect:1,guaranteeExpiry:'2030-01-01'}),{defaultDate:'2025-02-01',strategy:'liquidate'});reconcile(r);approx(r.summary.depositRemaining,0);approx(r.summary.recoveryBuckets.deposit,0);approx(r.summary.recoveryBuckets.guarantee,0);
});
test('collateral then guarantee pays only residual original claim, support used once',()=>{
 const r=runScenario(small({equity:0,resaleQuote:50,quoteIsNet:true,guarantee:100,guaranteeAvailable:true,guaranteeCollect:1,guaranteeExpiry:'2030-01-01'}),{defaultDate:'2025-02-01',strategy:'liquidate'});reconcile(r);approx(r.summary.originalRecovered,100);approx(r.summary.recoveryBuckets.guarantee,50);approx(r.summary.guaranteeRemaining,50);
});
test('net quote has no repeated haircut or sale costs; age does not reset at relocation',()=>{
 const p=values(small({resaleQuote:70,quoteIsNet:true,haircut:.9,saleCost:.9}));approx(economicValue(p,'2026-01-01','2025-01-01').net,70);const a=economicValue({...p,resaleQuote:null},'2027-01-01','2025-01-01');assert.ok(a.ageYears>=2);
});
test('buyer nonpayment does not accelerate the loan without a selected trigger',()=>{
 const r=runScenario(small({price:1}),{defaultDate:'2025-02-01',defaultType:'buyer',strategy:'liquidate'});reconcile(r);assert.equal(r.summary.saleDate,null);assert.equal(r.eligibility.status,'not triggered');
});
test('unknown legal rights are conditional; failed site excludes hold/restructure/re-lease',()=>{
 const r=compareWorkouts(small(),{defaultDate:'2025-02-01',defaultType:'site'});for(const x of r)reconcile(x);assert.equal(r[0].eligibility.status,'unavailable');assert.equal(r.at(-1).eligibility.status,'conditional');
});
test('PIK capitalization, OID, fees and lender-paid costs roll forward',()=>{
 const r=runScenario(small({equity:0,coupon:.12,pikMonths:6,oid:.02,fee:.01,workoutCommitment:10,legalCost:10,resaleQuote:90,quoteIsNet:true}),{defaultDate:'2025-03-01',strategy:'liquidate'});reconcile(r);assert.ok(r.summary.workoutAdvanced>0);approx(r.summary.originalAdvanced,98);assert.ok(r.summary.totalDebtClaim>0);
});
test('negative margins, maturity balloon and incomplete horizon stay visible',()=>{
 const r=runScenario(small({equity:0,siteRate:100,rackKw:1,repayment:'bullet',balloon:1,horizonMonths:12,recoveryLag:1000}),{defaultDate:'2025-11-01',strategy:'liquidate'});reconcile(r);assert.ok(r.summary.maxCashGap>0);assert.equal(r.summary.recoveryPercent,0);assert.ok(r.warnings.some(w=>w.includes('beyond horizon')));
 const b=runScenario(small({equity:0,repayment:'bullet',balloon:1}));assert.ok(b.monthly.some(m=>m.balloonDue===100));assert.equal(b.summary.balloonCoverage,0);
});
test('wire-to-commission delays affect revenue, interest and asset age',()=>{
 const base=small({price:.001,coupon:.1,equity:0});const a=runScenario(base),b=runScenario(overrideDeal(base,{delivery:'2025-04-01',installationDate:'2025-04-01',commission:'2025-04-01',acceptance:'2025-04-01',billingStart:'2025-04-01'}));reconcile(a);reconcile(b);assert.notEqual(a.summary.originalRecovered,b.summary.originalRecovered);assert.ok(b.summary.interestAccrued>a.summary.interestAccrued);
});
test('sensitivity calls the same engine; bounded solver reports infeasibility',()=>{
 const d=small({equity:0}),s={defaultDate:'2025-02-01',strategy:'liquidate'},g=sensitivityGrid(d,s,{xKey:'haircut',xValues:[0,.5],yKey:'residualFloor',yValues:[0,.2]});const direct=runScenario(overrideDeal(d,{haircut:.5,residualFloor:.2}),s);approx(g.cells[1][1].value,direct.summary.recoveryPercent);
 const r=solveThreshold(d,s,{key:'ltv',lower:.5,upper:1,steps:3});assert.equal(r.candidate,null);assert.match(r.status,/infeasible/);
});
test('minimum gross resale search reports a conditional sampled candidate and binding recovery constraint',()=>{
 const r=solveThreshold(small({equity:0}),{defaultDate:'2025-02-01',strategy:'liquidate'},{key:'resaleQuote',lower:0,upper:200,steps:20,direction:'min',constraints:['principal']});assert.equal(r.candidate.value,150);assert.ok(r.bindingConstraints.includes('principal'));assert.equal(r.legalStatus,'conditional');assert.equal(r.gridResolution,10);
});
test('saved/exported scenario reproduces the same dated results and hash',()=>{
 const d=small({price:.01}),s={defaultDate:'2025-03-17',strategy:'liquidate'},a=runScenario(d,s),pkg=JSON.parse(JSON.stringify(exportReviewPackage(d,a))),b=runScenario(pkg.deal,pkg.result.settings);assert.equal(a.metadata.inputHash,b.metadata.inputHash);assert.deepEqual(a.ledger,b.ledger);assert.deepEqual(a.summary,b.summary);
});
