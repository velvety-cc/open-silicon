import {DICTIONARY,MODEL_VERSION,values,hash,overrideDeal,SCENARIO_PRESETS} from './inputs.mjs';
import {DAY,time,date,addDays,addMonths,days,monthDays,sum,near,allocatePrincipal,recoveryWaterfall,creditInvoice,xirr,xnpv} from './finance.mjs';
export const STRATEGIES={
 hold:{label:'Hold & operate → sell',rights:['lien','accountControl','siteAccess','stepIn'],costs:['legalCost','enforcementCost','preservationCost','siteArrears']},
 restructure:{label:'Restructure → sell',rights:['lien','accountControl','siteAccess','restructureConsent'],costs:['legalCost','enforcementCost','preservationCost','siteArrears']},
 release:{label:'Re-lease → sell',rights:['lien','accountControl','siteAccess','stepIn','transfer','replacementBuyer'],costs:['legalCost','enforcementCost','preservationCost','remarketCost','siteArrears']},
 relocate:{label:'Relocate → operate → sell',rights:['lien','accountControl','siteAccess','removal','transfer','replacementBuyer','newSite'],costs:['legalCost','enforcementCost','storageCost','preservationCost','deinstallCost','transportCost','remarketCost','reinstallCost','newSiteNrc','siteArrears']},
 liquidate:{label:'Liquidate',rights:['lien','siteAccess','removal','transfer'],costs:['legalCost','enforcementCost','storageCost','preservationCost','deinstallCost','remarketCost','siteArrears']}
};
const required=['quantity','gpusPerRack','equipmentCost','siteNrc','siteRate','rackKw','reserveKw','price','capacity','utilization','availability','firstWire','delivery','installationDate','commission','acceptance','billingStart','accrualStart','cashInterestStart','principalStart','equity','equityDate','coupon','tenor','frequency','amortMonths','annualDecay','residualFloor','haircut','saleCost','condition','horizonMonths'];
const dateKeys=Object.keys(DICTIONARY).filter(k=>DICTIONARY[k].unit==='date');
export function validateInputs(deal){
 const errors=[],warnings=[],p=values(deal);
 for(const key of required)if(p[key]===null||p[key]===undefined)errors.push(`Missing required input: ${key}`);
 for(const[k,d]of Object.entries(DICTIONARY)){
  const a=deal.assumptions[k];if(!a){errors.push(`Missing dictionary entry: ${k}`);continue;}
  if(!['contracted','observed','estimated','illustrative','missing'].includes(a.status))errors.push(`Invalid source status: ${k}`);
  if(a.value===null){if(!['resaleQuote','depositReleaseDate'].includes(k))warnings.push(`Missing: ${d.label}`);if(d.default!==null&&!['text','date'].includes(d.unit)&&!errors.includes(`Missing required input: ${k}`))errors.push(`Missing required calculation input: ${k}`);continue;}
  if(d.unit==='boolean'&&typeof a.value!=='boolean')errors.push(`Boolean or null required: ${k}`);
  if(['text','enum','date','boolean'].includes(d.unit))continue;
  if(typeof a.value!=='number'||!Number.isFinite(a.value)||a.value<0)errors.push(`Invalid nonnegative numeric input: ${k}`);
  if(d.unit==='fraction'&&a.value>1)errors.push(`Fraction outside [0,1]: ${k}`);
  if(['months','days','GPUs','GPUs/rack','racks'].includes(d.unit)&&!Number.isInteger(a.value))errors.push(`Whole ${d.unit} required: ${k}`);
 }
 for(const k of dateKeys)if(p[k]!==null&&(!/^\d{4}-\d{2}-\d{2}$/.test(p[k])||!Number.isFinite(time(p[k]))||date(time(p[k]))!==p[k]))errors.push(`Invalid exact date: ${k}`);
 for(const a of ['tenor','frequency','amortMonths','horizonMonths','gpusPerRack','accountingLife'])if(!(p[a]>0))errors.push(`${a} must be positive`);
 for(const [k,needed]of [['draw2Date',p.draw2Fraction>0],['prepayDate',p.prepayFraction>0],['equityDate',p.equity>0],['siteStart',p.siteRate>0||p.siteNrc>0]])if(needed&&p[k]===null)errors.push(`Missing required event date: ${k}`);
 if(p.horizonMonths>240)errors.push('Horizon exceeds supported 240 months');
 if(p.delivery>p.installationDate||p.installationDate>p.commission||p.commission>p.acceptance||p.acceptance>p.billingStart)errors.push('Require delivery ≤ installation ≤ commissioning ≤ acceptance ≤ billing start');
 if(p.firstWire>p.draw2Date&&p.draw2Fraction>0)errors.push('Second draw precedes first wire');
 if(!['ACT/365','ACT/360'].includes(p.dayCount))errors.push('Supported interest day counts: ACT/365, ACT/360');
 if(!['equal-principal','annuity','bullet'].includes(p.repayment))errors.push('Unknown repayment method');
 if(!['original-first','pro-rata'].includes(p.allocation))errors.push('Unknown principal allocation');
 if(!p.powerBundled&&(p.powerPrice===null||p.pue===null))errors.push('Unbundled power requires energy price and PUE');
 if(p.principalStart>addMonths(p.firstWire,p.tenor))warnings.push('Principal repayment begins after maturity; all remaining principal is a balloon.');
 if(p.accrualStart>p.firstWire)warnings.push('Interest starts after first wire: the pre-accrual funding period earns no contractual interest.');
 if(p.draw2Fraction>0&&p.draw2Date>addMonths(p.firstWire,p.tenor))errors.push('Draw is after maturity');
 if(p.scopeEvidence===null)warnings.push('CDU/PDU/fitout and bundled site scope unverified. Known-cost results only; cost exclusions are illustrative, not evidence of zero costs.');
 if(p.powerBundled)warnings.push('Bundled DC rate used once. Incremental energy/PUE charges excluded until scope is evidenced.');
 return {valid:!errors.length,errors,warnings};
}
export function strategyEligibility(p,strategy,type='borrower',deal=null){
 const spec=STRATEGIES[strategy];if(!spec)return {status:'unavailable',reasons:['Unknown strategy']};
 const reasons=[];let unavailable=false;
 for(const key of spec.rights){if(p[key]!==true){reasons.push(`${DICTIONARY[key].label}: ${p[key]===false?'unavailable':'missing evidence'}`);if(p[key]===false)unavailable=true;}}
 if(deal)for(const key of [...spec.rights,'priority'])if(p[key]!==null&&p[key]!==false){const a=deal.assumptions[key];if(!['observed','contracted'].includes(a.status)||!a.sourceDate||!a.source||/^(User scenario override|Illustrative|Missing evidence)/.test(a.source))reasons.push(`${DICTIONARY[key].label}: declaration needs a dated evidence source and review`);}
 if(p.priority===null)reasons.push('Claim priority / lien scope not evidenced');
 if(type==='site'&&strategy!=='liquidate'&&strategy!=='relocate'){unavailable=true;reasons.push('Failed site cannot support this operating strategy');}
 return {status:unavailable?'unavailable':reasons.length?'conditional':'eligible',reasons};
}
export function economicValue(p,on,firstWire,fundedFraction=1){
 const age=Math.max(0,days(firstWire,on)/365),raw=p.equipmentCost*fundedFraction*Math.max(p.residualFloor,Math.pow(1-p.annualDecay,age))*p.condition;
 const gross=p.resaleQuote===null?raw:p.resaleQuote*fundedFraction;
 return {ageYears:age,gross,net:p.quoteIsNet&&p.resaleQuote!==null?gross:gross*(1-p.haircut)*(1-p.saleCost),book:p.equipmentCost*fundedFraction*Math.max(0,1-age*12/p.accountingLife)};
}
function scheduleDates(start,end,frequency){const out=[];for(let i=0;i<250;i++){const s=addMonths(start,i*frequency);if(s>end)break;out.push(s);}return new Set(out);}
export function runScenario(deal,settings={}){
 const validation=validateInputs(deal),p=values(deal);
 const metadata={modelVersion:MODEL_VERSION,inputVersion:deal.inputVersion,inputHash:hash(deal),settingsHash:hash(settings),calculatedAt:new Date().toISOString(),yearBasis:365,interestDayCount:p.dayCount,feeTreatment:'Original principal = net cash wires. Withheld OID is a separate fee claim; upfront fees are received only from borrower cash. Lender workout costs are negative cash flows. No fund fees/carry.'};
 if(!validation.valid)return {valid:false,metadata,errors:validation.errors,warnings:validation.warnings,settings,ledger:[],monthly:[],summary:null};
 const defaultDate=settings.defaultDate||null,type=settings.defaultType||'borrower',strategy=settings.strategy||'liquidate';
 if(!STRATEGIES[strategy]||!['buyer','borrower','site'].includes(type))return {valid:false,metadata,errors:['Invalid workout strategy or default type'],warnings:[],settings,ledger:[],monthly:[],summary:null};
 if(defaultDate&&(!Number.isFinite(time(defaultDate))||defaultDate<p.firstWire||defaultDate>addMonths(p.firstWire,p.horizonMonths)))return {valid:false,metadata,errors:['Default date outside wire-to-horizon range'],warnings:[],settings,ledger:[],monthly:[],summary:null};
 const effective=!!defaultDate&&(type!=='buyer'||p.accelerateBuyer),eligibility=effective?strategyEligibility(p,strategy,type,deal):{status:'not triggered',reasons:type==='buyer'?['Buyer nonpayment does not accelerate this loan']:[]};
 const warnings=[...validation.warnings],commitment=p.equipmentCost*p.ltv,capex=p.equipmentCost+p.networkingExtra+p.installation+p.otherCapex;
 let maturity=addMonths(p.firstWire,p.tenor);const originalMaturity=maturity;
 const enforcement=effective?addDays(defaultDate,p.cureDays+p.enforceDays):null;
 let resume=null,saleDate=null,receiptDate=null,workoutCost=0,workoutUnpaid=0,workoutPaid=0,workoutGap=0;
 if(effective){
  const spec=STRATEGIES[strategy];workoutCost=sum(spec.costs.map(k=>p[k]));
  if(strategy==='liquidate')saleDate=addDays(enforcement,p.saleDays);
  if(strategy==='hold'){resume=enforcement;saleDate=addDays(enforcement,p.holdDays+p.saleDays);}
  if(strategy==='restructure'){resume=addDays(enforcement,p.restructureDays);maturity=addMonths(originalMaturity,p.restructureMonths);saleDate=addDays(maturity,p.saleDays);}
  if(strategy==='release'){resume=addDays(enforcement,p.releaseDays);saleDate=addDays(addMonths(resume,p.replacementMonths),p.saleDays);}
  if(strategy==='relocate'){resume=addDays(enforcement,p.relocateDays);saleDate=addDays(addMonths(resume,p.replacementMonths),p.saleDays);}
  receiptDate=addDays(saleDate,p.recoveryLag);
  if(eligibility.status==='unavailable'){resume=null;saleDate=null;receiptDate=null;workoutCost=0;}
 }
 const horizon=addMonths(p.firstWire,p.horizonMonths),interestDates=scheduleDates(p.cashInterestStart,maturity,p.frequency),principalDates=scheduleDates(p.principalStart,maturity,p.frequency);
 const amortN=Math.max(1,Math.ceil(p.amortMonths/p.frequency));
 const scheduledBase=commitment*(1-p.oid)*(1-p.balloon),scheduledPrincipal=scheduledBase/amortN;
 const periodic=p.coupon*p.frequency/12,annuity=periodic===0?scheduledBase/amortN:scheduledBase*periodic/(1-Math.pow(1+periodic,-amortN));
 let b={original:0,pik:0,workout:0},interest=0,interestArrears=0,oidClaim=0,feeClaim=0,pikPending=0,pikCapitalized=0,interestAccrued=0,interestPaidTotal=0,interestForgiven=0,feePaidTotal=0;
 let cash=0,reserve=0,reserveDue=0,opexPayable=0,unbilled=0,unbilledOld=0,unbilledNew=0,receivable=0,prepayment=0,prepayReceived=0,prepayCredited=0,prepayRefunded=0;
 let deposit=p.supportDeposit,guarantee=p.guarantee,insurance=p.insuranceRecovery;
 let advanced=0,originalRecovered=0,pikRecovered=0,workoutAdvanced=0,workoutRecovered=0,fundedFace=0,capitalPaid=0,equipmentDue=0,equipmentPaid=0,capitalPayable=0,scheduledArrears=0,cumulativeGap=0;
 let invoices=[],collections=[],poolSources=[],costsSettled=false,recoveryDone=false,remainingSeniorClaims=0,refundClaim=0,saleValue=null,paidPeriods=0,firstGap=null;
 const ledger=[],cashFlows=[],recoveryBuckets={operations:0,borrowerCash:0,collateral:0,deposit:0,guarantee:0,insurance:0,reserve:0};
 const milestones={50:null,75:null,90:null,100:null},start=p.firstWire;
 const prepayTotal=p.quantity*p.price*24*365*(p.contractMonths/12)*p.prepayFraction*p.capacity;
 const operatingEnd=addMonths(p.billingStart,p.contractMonths);
 const earlierDates=[p.equityDate,p.prepayFraction>0?p.prepayDate:start,p.siteStart].filter(Boolean);
 const simStart=[start,...earlierDates].sort()[0];
 if(simStart<start)warnings.push('Project cash activity precedes the first lender wire. Lender XIRR still starts with lender cash flows.');
 function lenderFlow(on,amount,kind){if(Math.abs(amount)>1e-8)cashFlows.push({date:on,amount,kind});}
 for(let t=time(simStart);t<=time(horizon);t+=DAY){
  const on=date(t),opening={...b},openCash=cash,openInterest=interest+pikPending,openOpex=opexPayable,openCapex=capitalPayable;
  const r={date:on,month:on.slice(0,7),events:[],assetState:'undelivered',draw:0,equity:0,prepayReceipt:0,depositReleased:0,capex:0,capexPaid:0,revenue:0,invoiced:0,prepayCredit:0,collections:0,opex:0,opexPaid:0,reserveContribution:0,interestAccrued:0,pikAdded:0,interestPaid:0,interestForgiven:0,feesPaid:0,scheduledPrincipal:0,scheduledInterest:0,balloonDue:0,principalPaid:0,originalPaid:0,pikPaid:0,workoutPaid:0,workoutAdvance:0,recoveryReceipt:0,recoveryDistributed:0,recoverySenior:0,recoveryCostPaid:0,borrowerRecoveryTransfer:0,borrowerWorkoutCost:0,cfads:0,cashGap:0,lenderNet:0,projectNet:0,dscr:null,balloonCoverage:null};
  r.opexSettledFromRecovery=0;r.capexSettledFromRecovery=0;r.prepayRefundPaid=0;
  const after=effective&&on>=defaultDate,buyerDead=defaultDate&&type==='buyer'&&on>=defaultDate;
  const canDraw=!(after&&p.cancelDraws);
  const tranche=(on===p.firstWire?1-p.draw2Fraction:0)+(on===p.draw2Date?p.draw2Fraction:0);
  if(tranche&&canDraw){const face=commitment*tranche,wire=face*(1-p.oid);fundedFace+=face;b.original+=wire;advanced+=wire;cash+=wire;r.draw=wire;oidClaim+=face-wire;lenderFlow(on,-wire,'original wire');r.events.push('original wire');}
  if(on===p.equityDate){cash+=p.equity;r.equity=p.equity;r.events.push('sponsor equity');}
  if(on===p.prepayDate&&!(after||buyerDead)){cash+=prepayTotal;prepayment+=prepayTotal;prepayReceived+=prepayTotal;r.prepayReceipt=prepayTotal;r.events.push('customer prepayment');}
  if(on===p.depositReleaseDate){const used=Math.min(deposit,p.depositRelease);deposit-=used;cash+=used;r.depositReleased=used;r.events.push('deposit consumed in operations');}
  // Supplier obligations follow the expressly scheduled tranche purchases; no undrawn cash plug.
  if(tranche&&!(after&&p.cancelDraws)){const due=capex*tranche;capitalPayable+=due;equipmentDue+=due;r.capex+=due;r.events.push('supplier equipment due');}
  if(on===p.siteStart&&!(after&&strategy==='liquidate')){capitalPayable+=p.siteNrc;r.capex+=p.siteNrc;r.events.push('site NRC due');}
  if(capitalPayable>0){const paid=Math.min(cash,capitalPayable);cash-=paid;capitalPayable-=paid;capitalPaid+=paid;equipmentPaid+=Math.min(paid,Math.max(0,equipmentDue-equipmentPaid));r.capexPaid=paid;}
  if(on===p.firstWire&&p.fee>0)feeClaim+=commitment*p.fee;
  if(after&&on===defaultDate){r.events.push(`${type} default`);refundClaim=prepayment*p.prepayRefund;}
  if(on===enforcement){
   r.events.push('enforcement / workout costs due');
   const fromBorrower=Math.min(cash,workoutCost);cash-=fromBorrower;r.borrowerWorkoutCost=fromBorrower;
   const fromLender=Math.min(Math.max(0,workoutCost-fromBorrower),p.workoutCommitment);b.workout+=fromLender;workoutAdvanced+=fromLender;r.workoutAdvance=fromLender;lenderFlow(on,-fromLender,'workout cost funded');
   workoutPaid=fromBorrower+fromLender;workoutUnpaid=workoutCost-workoutPaid;workoutGap=strategy==='liquidate'?0:workoutUnpaid;r.events.push(workoutGap>.01?'unfunded restart costs: operations remain stopped':'workout funding processed');
   if(strategy==='restructure'){const forgiven=interest*p.forgiveInterest;interest-=forgiven;interestForgiven+=forgiven;r.interestForgiven=forgiven;scheduledArrears=0;}
  }
  const physicallyReady=on>=p.acceptance;
  const sold=saleDate&&on>=saleDate;
  let operating=physicallyReady&&on>=p.billingStart&&on<operatingEnd;
  let replacement=false;
  if(after){
   if(strategy==='liquidate'||!resume||on<resume||workoutGap>.01||eligibility.status==='unavailable')operating=false;
   else if(strategy==='release'||strategy==='relocate'){operating=physicallyReady&&on>=resume&&on<addMonths(resume,p.replacementMonths);replacement=true;}
   if(type==='site'&&strategy!=='relocate')operating=false;
  }
  if(sold)operating=false;
  const procuredFraction=capex>0?Math.min(1,equipmentPaid/capex):1;
  r.commissionedGpus=physicallyReady&&!sold?p.quantity*procuredFraction:0;
  for(const[k,label]of [['delivery','equipment delivered'],['installationDate','installation complete'],['commission','commissioned'],['acceptance','customer acceptance'],['billingStart','service billing begins']])if(on===p[k]&&!sold)r.events.push(label);
  r.assetState=sold?'sold':on<p.delivery?'undelivered':on<p.installationDate?'delivered':on<p.commission?'installing':on<p.acceptance?'commissioning':operating?(replacement?'replacement operating':'operating'):after?(strategy==='relocate'&&on<resume?'relocating':'preserved'):'idle';
  if(on===saleDate){
   const portion=procuredFraction;
   saleValue=on<p.delivery?{gross:0,net:capex*portion*p.supplierRefund,ageYears:Math.max(0,days(start,on)/365)}:economicValue(p,on,start,portion);
   r.events.push(on<p.delivery?'supplier refund claim; no hardware proceeds':'asset sold; future service revenue stops');
  }
  // Accrual is earned during the prior calendar month; invoices and collections are separate dated events.
  if(on.slice(8)==='01'&&unbilled>0){for(const [amount,replacement]of [[unbilledOld,false],[unbilledNew,true]])if(amount>0)invoices.push({date:addDays(on,p.billingLag),amount,replacement});unbilled=0;unbilledOld=0;unbilledNew=0;}
  for(const inv of invoices.filter(x=>x.date===on)){
   const c=creditInvoice(inv.amount,inv.replacement?0:prepayment);if(!inv.replacement){prepayment=c.remainingPrepayment;prepayCredited+=c.credit;}
   r.invoiced+=inv.amount;r.prepayCredit+=c.credit;receivable+=c.cashDue;
   collections.push({date:addDays(on,inv.replacement?p.replacementLag:p.collectionLag),amount:c.cashDue,replacement:inv.replacement});r.events.push('invoice issued');
  }
  for(const c of collections.filter(x=>x.date===on)){
   const rate=c.replacement?p.replacementCollect:p.collectionRate;
   const received=buyerDead&&!c.replacement?0:c.amount*rate;
   cash+=received;r.collections+=received;receivable-=received;r.events.push('buyer cash collection');
  }
  if(operating){const ramp=p.rampDays===0?1:Math.min(1,Math.max(0,days(p.billingStart,on)+1)/p.rampDays);const util=replacement?p.replacementUtil:p.utilization*ramp;const billable=Math.max(p.takeOrPay,util*p.availability);r.revenue=r.commissionedGpus*p.capacity*24*p.price*(replacement?p.replacementPrice:1)*billable*(1-p.credits);unbilled+=r.revenue;if(replacement)unbilledNew+=r.revenue;else unbilledOld+=r.revenue;}
  if(on>=p.siteStart&&!sold){
   const kw=p.quantity/p.gpusPerRack*p.rackKw+p.reserveKw,rate=replacement&&strategy==='relocate'?p.newSiteRate:p.siteRate;
   const dc=Math.max(p.minimumSite,kw*rate)/monthDays(on),energy=!p.powerBundled&&operating?kw*24*p.pue*p.powerPrice:0;
   r.opex=dc+energy+(p.networkMonthly+p.maintenance+p.insurance+p.taxMonthly+p.otherOpex)/monthDays(on);opexPayable+=r.opex;reserveDue+=p.reserveMonthly/monthDays(on);
  }
  const opPaid=Math.min(cash,opexPayable);cash-=opPaid;opexPayable-=opPaid;r.opexPaid=opPaid;
  const resPaid=Math.min(cash,reserveDue);cash-=resPaid;reserveDue-=resPaid;reserve+=resPaid;r.reserveContribution=resPaid;
  r.cfads=r.collections-r.opexPaid-r.reserveContribution; // Explicitly excludes prepay, financing, equity and sale.
  function apply(amount,bucket,source='cash'){
   const a=allocatePrincipal(amount,b,p.allocation);b=a.balance;r.originalPaid+=a.paid.original;r.pikPaid+=a.paid.pik;r.workoutPaid+=a.paid.workout;originalRecovered+=a.paid.original;pikRecovered+=a.paid.pik;workoutRecovered+=a.paid.workout;recoveryBuckets[bucket]+=a.paid.original;
   const paid=sum(Object.values(a.paid));r.principalPaid+=paid;lenderFlow(on,paid,source+' principal');return paid;
  }
  const scheduledAllowed=!after||strategy==='restructure'&&on>=resume&&workoutGap<.01;
  const interestDue=interestDates.has(on)||on===maturity;
  const principalDue=principalDates.has(on)||on===maturity;
  if(interestDue&&pikPending>0){b.pik+=pikPending;pikCapitalized+=pikPending;r.pikAdded=pikPending;pikPending=0;}
  if(scheduledAllowed&&(interestDue||principalDue)){
   r.scheduledInterest=interestDue?Math.max(0,interest-interestArrears):0;
   if(interestDue)interestArrears=interest;
   let recurring=0;
   if(principalDue&&on!==maturity&&p.repayment!=='bullet'&&paidPeriods<amortN){recurring=p.repayment==='annuity'?Math.max(0,annuity-r.scheduledInterest):scheduledPrincipal;paidPeriods++;}
   if(after&&strategy==='restructure'&&principalDue&&on!==maturity){const left=Math.max(1,Math.ceil(days(on,maturity)/30.4375/p.frequency));recurring=(b.original+b.pik)/left;}
   r.scheduledPrincipal=Math.min(b.original+b.pik,recurring);
   if(on===maturity){r.balloonDue=b.original+b.pik+b.workout;scheduledArrears=r.balloonDue;}
   scheduledArrears+=r.scheduledPrincipal;
   if(interestDue){const paid=Math.min(cash,interest);cash-=paid;interest-=paid;interestArrears=Math.max(0,interestArrears-paid);r.interestPaid+=paid;interestPaidTotal+=paid;lenderFlow(on,paid,'cash interest');}
   const principalCash=Math.min(cash,on===maturity?b.original+b.pik+b.workout:scheduledArrears);
   const actual=apply(principalCash,'operations');cash-=actual;scheduledArrears=Math.max(0,scheduledArrears-actual);
   if(on===maturity){const fees=Math.min(cash,oidClaim+feeClaim);cash-=fees;const oidPaid=Math.min(fees,oidClaim);oidClaim-=oidPaid;feeClaim-=fees-oidPaid;r.feesPaid+=fees;feePaidTotal+=fees;lenderFlow(on,fees,'OID / fees');}
   if(r.balloonDue>0)r.balloonCoverage=Math.max(0,r.cfads)/Math.max(.0001,r.balloonDue+r.scheduledInterest);
   else if(r.scheduledPrincipal+r.scheduledInterest>0)r.dscr=r.cfads/(r.scheduledPrincipal+r.scheduledInterest);
  }
  // Upfront fees, arrears catch-up and sweeps only use cash actually held by borrower.
  if(feeClaim>0&&on<maturity){const paid=Math.min(cash,feeClaim);cash-=paid;feeClaim-=paid;r.feesPaid+=paid;feePaidTotal+=paid;lenderFlow(on,paid,'upfront fee');}
  if(scheduledAllowed&&cash>0&&interestArrears>0&&r.collections>0){const paid=Math.min(cash,interestArrears);cash-=paid;interest-=paid;interestArrears-=paid;r.interestPaid+=paid;interestPaidTotal+=paid;lenderFlow(on,paid,'interest arrears');}
  if(scheduledAllowed&&cash>0&&scheduledArrears>0&&r.collections>0){const paid=apply(Math.min(cash,scheduledArrears),'operations');cash-=paid;scheduledArrears-=paid;}
  if(scheduledAllowed&&p.sweep>0&&cash>0&&r.collections>0){const paid=apply(cash*p.sweep,'operations');cash-=paid;}
  if(on===receiptDate&&!recoveryDone){
   r.events.push('dated recovery waterfall');recoveryDone=true;
   const cashPool=cash,reservePool=reserve;cash=0;reserve=0;r.borrowerRecoveryTransfer=cashPool;
   const sources=[{kind:'borrowerCash',amount:cashPool},{kind:'reserve',amount:reservePool},{kind:'collateral',amount:saleValue?.net??0}];
   refundClaim=prepayment*p.prepayRefund;
   let senior=p.seniorClaim+opexPayable+capitalPayable+refundClaim,remainingCost=workoutUnpaid;
   for(const source of sources){
    const out=recoveryWaterfall({proceeds:source.amount,costs:remainingCost,senior,balance:b,interest,fees:oidClaim+feeClaim,allocation:p.allocation});remainingCost-=out.costPaid;senior-=out.seniorPaid;
    r.recoveryCostPaid+=out.costPaid;workoutPaid+=out.costPaid;r.recoverySenior+=out.seniorPaid;
    const principal=apply(sum(Object.values(out.paid)),source.kind,source.kind); // identical allocation to waterfall
    interest-=out.interestPaid;interestPaidTotal+=out.interestPaid;r.interestPaid+=out.interestPaid;lenderFlow(on,out.interestPaid,'recovery interest');
    const oidPaid=Math.min(oidClaim,out.feesPaid);oidClaim-=oidPaid;feeClaim-=out.feesPaid-oidPaid;r.feesPaid+=out.feesPaid;feePaidTotal+=out.feesPaid;lenderFlow(on,out.feesPaid,'recovery fees');
    r.recoveryReceipt+=source.amount;r.recoveryDistributed+=principal+out.interestPaid+out.feesPaid;
    poolSources.push({date:on,...source,costPaid:out.costPaid,seniorPaid:out.seniorPaid,originalPaid:out.paid.original,pikPaid:out.paid.pik,workoutPaid:out.paid.workout,interestPaid:out.interestPaid,feesPaid:out.feesPaid,surplusToBorrower:out.surplus});
    cash+=out.surplus;
   }
   // Supports cover only original cash principal, after collateral. No guarantee can pay an already satisfied claim.
   for(const s of [
    {kind:'deposit',amount:deposit,available:p.depositAvailable,beneficiary:p.depositBeneficiary,covered:p.depositCovered,collect:p.depositCollect,expiry:p.depositExpiry},
    {kind:'guarantee',amount:guarantee,available:p.guaranteeAvailable,beneficiary:p.guaranteeBeneficiary,covered:p.guaranteeCovered,collect:p.guaranteeCollect,expiry:p.guaranteeExpiry},
    {kind:'insurance',amount:insurance,available:p.insuranceAvailable,beneficiary:p.insuranceBeneficiary,covered:p.insuranceCovered,collect:p.insuranceCollect,expiry:p.insuranceExpiry}]){
    const available=s.available===true&&s.beneficiary==='lender'&&s.covered==='original principal'&&s.collect!==null&&s.expiry!==null&&s.expiry>=on;
    const amount=available?Math.min(b.original,(s.amount??0)*s.collect):0;
    if(amount>0){b.original-=amount;originalRecovered+=amount;r.originalPaid+=amount;r.principalPaid+=amount;r.recoveryReceipt+=amount;r.recoveryDistributed+=amount;recoveryBuckets[s.kind]+=amount;lenderFlow(on,amount,s.kind+' original principal');poolSources.push({date:on,kind:s.kind,amount,originalPaid:amount,costPaid:0,seniorPaid:0,surplusToBorrower:0});if(s.kind==='deposit')deposit-=amount;else if(s.kind==='guarantee')guarantee-=amount;else insurance-=amount;}
    if((s.amount??0)>0&&!available)warnings.push(`${s.kind} excluded: missing/expired availability, beneficiary, collectibility or covered obligation evidence.`);
   }
   let paidSenior=r.recoverySenior;
   paidSenior-=Math.min(paidSenior,p.seniorClaim);
   const paidOpex=Math.min(paidSenior,opexPayable);opexPayable-=paidOpex;paidSenior-=paidOpex;r.opexSettledFromRecovery=paidOpex;
   const paidCapex=Math.min(paidSenior,capitalPayable);capitalPayable-=paidCapex;paidSenior-=paidCapex;r.capexSettledFromRecovery=paidCapex;
   const paidRefund=Math.min(paidSenior,refundClaim);refundClaim-=paidRefund;prepayment-=paidRefund;prepayRefunded+=paidRefund;r.prepayRefundPaid=paidRefund;
   workoutUnpaid=remainingCost;remainingSeniorClaims=senior;costsSettled=true;
  }
  // Daily interest integrates [date, date+1), only on funded balances, never on undrawn commitments.
  if(on>=p.accrualStart&&on<horizon){const coupon=after&&strategy==='restructure'&&on>=resume?p.restructureCoupon:p.coupon;const accrual=(b.original+b.pik+b.workout+oidClaim)*coupon/(p.dayCount==='ACT/360'?360:365);interestAccrued+=accrual;r.interestAccrued=accrual;if(on<addMonths(p.accrualStart,p.pikMonths))pikPending+=accrual;else interest+=accrual;}
  r.originalAdvanced=advanced;r.originalRecovered=originalRecovered;r.originalOutstanding=b.original;r.pikOutstanding=b.pik;r.workoutOutstanding=b.workout;r.workoutAdvanced=workoutAdvanced;r.accruedInterest=interest;r.pikPending=pikPending;r.feeClaim=oidClaim+feeClaim;r.totalDebtClaim=b.original+b.pik+b.workout+interest+pikPending+oidClaim+feeClaim;
  r.borrowerCash=cash;r.reserveBalance=reserve;r.depositBalance=deposit;r.guaranteeBalance=guarantee;r.insuranceBalance=insurance;r.receivable=receivable;r.unbilled=unbilled;r.prepaymentBalance=prepayment;r.opexPayable=opexPayable;r.capexPayable=capitalPayable;r.scheduledArrears=scheduledArrears;
  const liquidity=capitalPayable+opexPayable+reserveDue+(on>=maturity?b.original+b.pik+b.workout:scheduledArrears)+interestArrears+Math.max(workoutGap,costsSettled?workoutUnpaid:0);
  r.cashGap=Math.max(0,liquidity-cash);cumulativeGap=Math.max(cumulativeGap,r.cashGap);if(r.cashGap>.02&&!firstGap)firstGap=on;
  const fundedPct=procuredFraction,cv=on<p.delivery?{gross:0,net:capex*fundedPct*p.supplierRefund,book:0}:economicValue(p,on,start,fundedPct);
  r.grossCollateral=sold?0:cv.gross;r.netCollateral=sold?0:cv.net;r.accountingBook=sold?0:cv.book;
  r.lenderNet=-r.draw-r.workoutAdvance+r.principalPaid+r.interestPaid+r.feesPaid;
  r.projectNet=r.draw+r.equity+r.prepayReceipt+r.depositReleased+r.collections-r.capexPaid-r.opexPaid-r.reserveContribution-r.principalPaid-r.interestPaid-r.feesPaid-r.borrowerWorkoutCost;
  // Recovery allocations from external collateral are not borrower operating transfers.
  if(on===receiptDate)r.projectNet+=r.recoveryDistributed-r.borrowerRecoveryTransfer+cash;
  r.debtReconciliation=(opening.original+opening.pik+opening.workout+r.draw+r.workoutAdvance+r.pikAdded-r.principalPaid)-(b.original+b.pik+b.workout);
  r.interestReconciliation=openInterest+r.interestAccrued-r.interestPaid-r.interestForgiven-r.pikAdded-(interest+pikPending);
  r.opexReconciliation=openOpex+r.opex-r.opexPaid-r.opexSettledFromRecovery-opexPayable;
  r.capexReconciliation=openCapex+r.capex-r.capexPaid-r.capexSettledFromRecovery-capitalPayable;
  r.cashReconciliation=openCash+r.projectNet-cash;
  for(const pct of [50,75,90,100])if(advanced>0&&!milestones[pct]&&originalRecovered/Math.max(commitment*(1-p.oid),advanced)>=pct/100-1e-9)milestones[pct]={date:on,month:r.month};
  if(r.events.length||Object.values(r).some(x=>typeof x==='number'&&x!==0))ledger.push(r);
 }
 const monthly=aggregateMonthly(ledger),recurring=monthly.filter(r=>r.scheduledPrincipal+r.scheduledInterest>0&&r.balloonDue===0),balloons=monthly.filter(r=>r.balloonDue>0);
 // Milestones use total actually advanced over the entire run, including later staged draws.
 for(const pct of [50,75,90,100]){const row=ledger.find(r=>advanced>0&&r.originalRecovered>=advanced*pct/100-1e-6);milestones[pct]=row?{date:row.date,month:row.month}:null;}
 const irr=xirr(cashFlows),npv=xnpv(p.targetYield,cashFlows),last=ledger.at(-1),debtError=Math.max(...ledger.map(r=>Math.abs(r.debtReconciliation))),cashError=Math.max(...ledger.map(r=>Math.abs(r.cashReconciliation))),interestError=Math.max(...ledger.map(r=>Math.abs(r.interestReconciliation)));
 const poolError=sum(poolSources.map(s=>s.amount-(s.costPaid??0)-(s.seniorPaid??0)-(s.originalPaid??0)-(s.pikPaid??0)-(s.workoutPaid??0)-(s.interestPaid??0)-(s.feesPaid??0)-(s.surplusToBorrower??0)));
 if(irr.warning)warnings.push(irr.warning);
 if(effective&&eligibility.status!=='eligible')warnings.push(`${eligibility.status} workout: ${eligibility.reasons.join('; ')}`);
 if(workoutGap>.02)warnings.push('Workout restart is unfunded. Operations stay stopped; additional funding is required.');
 if(costsSettled&&workoutUnpaid>.02)warnings.push('Recovery pool did not fund all unique costs. Remaining recovery costs require additional cash.');
 if(receiptDate&&receiptDate>horizon)warnings.push('Recovery receipt is beyond horizon. Outstanding original principal is unrecovered by horizon, not a proven permanent loss.');
 if(b.original>.02)warnings.push('Outstanding original principal at horizon. No recovery value is imputed to lender cash flows.');
 if(debtError>.02||cashError>.02||interestError>.02||Math.abs(poolError)>.02)warnings.push('Reconciliation failure: inspect exported ledger.');
 const snapshot=defaultDate?ledger.filter(r=>r.date<defaultDate).at(-1):last;
 const summary={commitment,originalAdvanced:advanced,originalRecovered,originalOutstanding:b.original,recoveryPercent:advanced>0?originalRecovered/advanced:null,workoutAdvanced,workoutRecovered,workoutLoss:workoutAdvanced-workoutRecovered,interestAccrued,interestPaid:interestPaidTotal,interestUnpaid:interest,interestForgiven,pikCapitalized,pikRecovered,pikOutstanding:b.pik,feePaid:feePaidTotal,totalDebtClaim:last.totalDebtClaim,principalShortfall:advanced-originalRecovered,shortfallLabel:receiptDate&&receiptDate<=horizon&&b.original<.02?'Recovered by horizon':'Unrecovered by horizon',netCashLoss:-sum(cashFlows,'amount'),npv,discountedEconomicLoss:-npv,irr:irr.value,irrRoots:irr.roots,minDscr:recurring.length?Math.min(...recurring.map(r=>r.dscr)):null,balloonCoverage:balloons.length?Math.min(...balloons.map(r=>r.balloonCoverage)):null,maxCashGap:cumulativeGap,firstGap,additionalWorkoutCash:workoutGap,workoutCost,workoutPaid,saleDate,recoveryReceiptDate:receiptDate,defaultDate,enforcementDate:enforcement,resumeDate:resume,maturity,originalMaturity,horizon,milestones,recoveryBuckets,atDefault:{advanced:snapshot?.originalAdvanced??0,recovered:snapshot?.originalRecovered??0,exposure:snapshot?.originalOutstanding??0,claim:snapshot?.totalDebtClaim??0,fundedNotOperating:snapshot&&!snapshot.assetState.includes('operating')?(snapshot.originalOutstanding):0},prepayReceived,prepayCredited,prepayRemaining:prepayment,closingReceivable:receivable,closingUnbilled:unbilled,closingBorrowerCash:cash,closingReserve:reserve,depositRemaining:deposit,guaranteeRemaining:guarantee,insuranceRemaining:insurance,eligibility,reconciliation:{debtError,cashError,interestError,poolError,originalError:advanced-originalRecovered-b.original,workoutError:workoutAdvanced-workoutRecovered-b.workout,pikError:pikCapitalized-pikRecovered-b.pik,prepayError:prepayReceived-prepayCredited-prepayment},constraints:{principal:advanced>0&&originalRecovered/advanced>=p.minRecovery-1e-9,liquidity:cumulativeGap<=p.maxGap+.02,dscr:recurring.length>0&&Math.min(...recurring.map(r=>r.dscr))>=p.minDscr,return:irr.value!==null&&irr.value>=p.targetYield}};
 Object.assign(summary,{prepayRefunded,remainingRecoveryCosts:workoutUnpaid,remainingSeniorClaims,additionalWorkoutCash:Math.max(workoutGap,costsSettled?workoutUnpaid:0)});
 summary.reconciliation.prepayError=prepayReceived-prepayCredited-prepayRefunded-prepayment;
 summary.reconciliation.opexError=Math.max(...ledger.map(r=>Math.abs(r.opexReconciliation)));
 summary.reconciliation.capexError=Math.max(...ledger.map(r=>Math.abs(r.capexReconciliation)));
 return {valid:true,metadata,dealName:deal.name,settings:{defaultDate,defaultType:type,strategy},eligibility,summary,ledger,monthly,cashFlows,poolSources,warnings:[...new Set(warnings)],errors:[]};
}
const flowKeys=['draw','equity','prepayReceipt','depositReleased','capex','capexPaid','revenue','invoiced','prepayCredit','prepayRefundPaid','collections','opex','opexPaid','reserveContribution','interestAccrued','pikAdded','interestPaid','interestForgiven','feesPaid','scheduledPrincipal','scheduledInterest','balloonDue','principalPaid','originalPaid','pikPaid','workoutPaid','workoutAdvance','recoveryReceipt','recoveryDistributed','recoverySenior','recoveryCostPaid','borrowerRecoveryTransfer','borrowerWorkoutCost','opexSettledFromRecovery','capexSettledFromRecovery','cfads','lenderNet','projectNet'];
export function aggregateMonthly(ledger){
 const groups=new Map();for(const r of ledger){if(!groups.has(r.month))groups.set(r.month,[]);groups.get(r.month).push(r);}
 return [...groups].map(([month,rows])=>{const out={...rows.at(-1),month,events:rows.flatMap(r=>r.events)};for(const k of flowKeys)out[k]=sum(rows,k);out.cashGap=Math.max(...rows.map(r=>r.cashGap));out.dscr=out.scheduledPrincipal+out.scheduledInterest>0&&out.balloonDue===0?out.cfads/(out.scheduledPrincipal+out.scheduledInterest):null;out.balloonCoverage=out.balloonDue>0?Math.max(0,out.cfads)/(out.balloonDue+out.scheduledInterest):null;return out;});
}
export function compareWorkouts(deal,settings){return Object.keys(STRATEGIES).map(strategy=>runScenario(deal,{...settings,strategy}));}
export function compareScenarios(deal,settings={}){return Object.entries(SCENARIO_PRESETS).map(([name,overrides])=>({name,result:runScenario(overrideDeal(deal,overrides,name),settings)}));}
export function sensitivityGrid(deal,settings,{xKey,xValues,yKey,yValues,metric='recoveryPercent'}){
 const cells=yValues.map(y=>xValues.map(x=>{const changes={},s={...settings};for(const[k,v]of [[xKey,x],[yKey,y]]){if(k==='defaultMonth')s.defaultDate=addMonths(values(deal).firstWire,v);else changes[k]=v;}const r=runScenario(overrideDeal(deal,changes),s);return {x,y,value:r.valid?r.summary[metric]:null,conditional:r.eligibility?.status!=='eligible'&&!!s.defaultDate,errors:r.errors};}));
 return {xKey,xValues,yKey,yValues,metric,cells,inputHash:hash(deal),settings};
}
export function solveThreshold(deal,settings,{key,lower,upper,steps=30,direction='max',constraints=['principal','liquidity','dscr','return']}){
 if(!(key in DICTIONARY)||!Number.isFinite(lower)||!Number.isFinite(upper)||upper<lower||!Number.isInteger(steps)||steps<1||steps>100||constraints.some(c=>!['principal','liquidity','dscr','return'].includes(c)))throw new Error('Invalid bounded search: check input key, bounds, integer intervals (1–100) and constraints.');
 const evaluations=[];for(let i=0;i<=steps;i++){const v=lower+(upper-lower)*i/steps,r=runScenario(overrideDeal(deal,{[key]:v}),settings);evaluations.push({value:v,feasible:r.valid&&r.eligibility.status!=='unavailable'&&r.summary.additionalWorkoutCash<.02&&constraints.every(c=>r.summary.constraints[c]),constraints:r.summary?.constraints??{},metrics:r.valid?{recovery:r.summary.recoveryPercent,dscr:r.summary.minDscr,gap:r.summary.maxCashGap,irr:r.summary.irr}:null});}
 const candidates=evaluations.filter(r=>r.feasible).sort((a,b)=>direction==='max'?b.value-a.value:a.value-b.value),candidate=candidates[0]??null;
 return {key,lower,upper,steps,gridResolution:(upper-lower)/steps,direction,constraints,candidate,evaluations,bindingConstraints:candidate?constraints.filter(c=>{const i=evaluations.indexOf(candidate),adj=evaluations[i+(direction==='max'?1:-1)];return adj&&!adj.constraints[c];}):constraints,fixedInputHash:hash(deal),settings,status:candidate?'candidate on bounded grid; not a financing offer':'infeasible within search bounds',legalStatus:settings.defaultDate?strategyEligibility(values(deal),settings.strategy||'liquidate',settings.defaultType,deal).status:'not triggered'};
}
export function solveStructures(deal,settings,{tenors=[24,36,48],balloons=[0,.25,.5],constraints=['principal','liquidity','dscr','return']}={}){
 return tenors.flatMap(tenor=>balloons.flatMap(balloon=>['equal-principal','annuity','bullet'].map(repayment=>{const r=runScenario(overrideDeal(deal,{tenor,amortMonths:tenor,balloon,repayment}),settings);return {tenor,balloon,repayment,feasible:r.valid&&r.eligibility.status!=='unavailable'&&r.summary.additionalWorkoutCash<.02&&constraints.every(c=>r.summary.constraints[c]),summary:r.summary,errors:r.errors};})));
}
