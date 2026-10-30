export const MODEL_VERSION = '1.0.0';
export const SOURCE_DATE = '2026-10-21';
export const SOURCE_URL = 'https://docs.google.com/spreadsheets/d/1__hJwK9PNFUJeaChBNe74FsU4FfWfZpjoPO7JNBUiCg/edit';
// key, label, unit, illustrative default, group, optional source-cell mapping.
const definitions = [
 ['gpuModel','GPU model','text','GB300','Equipment','BOM List!A4'],
 ['quantity','Billed GPU count','GPUs',2880,'Equipment','B5'],
 ['gpusPerRack','GPUs per rack','GPUs/rack',72,'Equipment','B25 = B5/72'],
 ['gpusPerNode','GPUs per node','GPUs/node',null,'Equipment'],
 ['spareRacks','Spare racks in BOM','racks',2,'Equipment','BOM List!C5'],
 ['equipmentCost','Equipment valuation / budget','USD',280000000,'Equipment','B26 = B2 × B25'],
 ['valuationDate','Equipment valuation date','date','2026-10-21','Equipment'],
 ['networkingExtra','Incremental networking (scope reconciled)','USD',0,'Equipment'],
 ['installation','Incremental installation','USD',0,'Equipment'],
 ['otherCapex','Other capital costs','USD',0,'Equipment'],
 ['scopeEvidence','CDU/PDU/fitout inclusion evidence','text',null,'Equipment'],
 ['siteNrc','Site NRC','USD',26000000/3,'Site','B11 = 26000000/3'],
 ['siteRate','Bundled DC charge','USD/kW/month',270,'Site','B9'],
 ['rackKw','IT load per rack','kW/rack',150,'Site','B10'],
 ['reserveKw','Additional contracted power','kW',500,'Site','B13'],
 ['powerBundled','Power included in DC charge','boolean',true,'Site'],
 ['powerPrice','Additional unbundled energy rate','USD/kWh',null,'Site'],
 ['pue','Cooling / PUE','x',null,'Site'],
 ['minimumSite','Monthly site minimum','USD/month',0,'Site'],
 ['networkMonthly','Incremental network cost','USD/month',0,'Site'],
 ['maintenance','Maintenance','USD/month',0,'Site'],
 ['insurance','Insurance premium','USD/month',0,'Site'],
 ['taxMonthly','Cash taxes','USD/month',0,'Site'],
 ['otherOpex','Other operating costs','USD/month',0,'Site'],
 ['reserveMonthly','Required reserve contribution','USD/month',0,'Site'],
 ['siteStart','Site billing begins','date','2026-12-02','Timing'],
 ['price','Buyer compute price','USD/GPU-hour',5.8,'Buyer','B3'],
 ['capacity','Contracted capacity','fraction',1,'Buyer'],
 ['utilization','Utilization','fraction',1,'Buyer','B29 assumes 100%'],
 ['availability','Availability','fraction',1,'Buyer','B29 assumes 100%'],
 ['rampDays','Utilization ramp','days',0,'Buyer'],
 ['takeOrPay','Minimum billable capacity','fraction',0,'Buyer'],
 ['credits','Service credits','fraction',0,'Buyer'],
 ['termination','Buyer termination evidence','text',null,'Buyer'],
 ['contractMonths','Customer contract duration','months',36,'Buyer','B19 × 12 (unverified linkage)'],
 ['prepayFraction','Customer prepayment fraction','fraction',0.3,'Buyer','B16'],
 ['prepayDate','Prepayment receipt','date','2026-11-02','Timing'],
 ['prepayRefund','Refund claim on remaining prepayment','fraction',0,'Buyer'],
 ['billingLag','Invoice issuance after period end','days',0,'Buyer'],
 ['collectionLag','Collection after invoice','days',30,'Buyer'],
 ['collectionRate','Buyer cash collectibility','fraction',1,'Buyer'],
 ['firstWire','First investor wire','date','2026-11-02','Timing'],
 ['draw2Date','Second staged wire','date','2026-12-02','Timing'],
 ['draw2Fraction','Second draw share of commitment','fraction',0,'Financing'],
 ['delivery','Equipment delivery','date','2026-12-02','Timing'],
 ['installationDate','Installation complete','date','2026-12-16','Timing'],
 ['commission','Commissioning','date','2027-01-02','Timing'],
 ['acceptance','Customer acceptance','date','2027-01-02','Timing'],
 ['billingStart','Revenue service begins','date','2027-01-02','Timing'],
 ['accrualStart','Interest accrual begins','date','2026-11-02','Timing'],
 ['cashInterestStart','First cash-interest date','date','2026-12-02','Timing'],
 ['principalStart','First principal due','date','2026-12-02','Timing'],
 ['ltv','Advance / equipment valuation','fraction',0.6,'Financing','B21; denominator B26'],
 ['equity','Sponsor committed equity','USD',120666666.66666667,'Financing'],
 ['equityDate','Equity contribution date','date','2026-11-02','Timing'],
 ['coupon','Nominal annual financing coupon','fraction',0.12,'Financing','B20'],
 ['dayCount','Interest day count','enum','ACT/365','Financing'],
 ['targetYield','Effective annual yield hurdle','fraction',0.12,'Financing'],
 ['oid','OID withheld from wires','fraction',0,'Financing'],
 ['fee','Upfront borrower-paid fee','fraction',0,'Financing'],
 ['tenor','Tenor from first wire','months',36,'Financing','B19 × 12'],
 ['amortMonths','Principal amortization length','months',36,'Financing'],
 ['frequency','Debt payment interval','months',1,'Financing'],
 ['repayment','Scheduled repayment method','enum','equal-principal','Financing'],
 ['balloon','Contractual balloon share','fraction',0,'Financing'],
 ['pikMonths','PIK from accrual start','months',0,'Financing'],
 ['sweep','Excess borrower cash sweep','fraction',0,'Financing'],
 ['allocation','Cash principal allocation','enum','original-first','Financing'],
 ['accelerateBuyer','Buyer nonpayment accelerates loan','boolean',false,'Default'],
 ['cancelDraws','Cancel undrawn commitment on borrower/site default','boolean',true,'Default'],
 ['cureDays','Cure period','days',30,'Default'],
 ['enforceDays','Enforcement after cure','days',30,'Default'],
 ['recoveryLag','Sale / support collection delay','days',90,'Recovery'],
 ['saleDays','Remarketing and sale duration','days',30,'Recovery'],
 ['annualDecay','Economic annual value decay','fraction',0.35,'Recovery'],
 ['residualFloor','Economic residual floor','fraction',0.1,'Recovery'],
 ['condition','Asset condition factor','fraction',1,'Recovery'],
 ['haircut','Forced-sale haircut','fraction',0.25,'Recovery'],
 ['saleCost','Disposal cost','fraction',0.05,'Recovery'],
 ['quoteIsNet','Resale quote already net of sale costs/haircut','boolean',false,'Recovery'],
 ['resaleQuote','Optional fixed resale quote','USD',null,'Recovery'],
 ['supplierRefund','Undelivered supplier refund collectibility','fraction',0,'Recovery'],
 ['accountingLife','Accounting useful life','months',60,'Recovery'],
 ['seniorClaim','Other senior claims (paid once)','USD',0,'Recovery'],
 ['legalCost','Legal cost','USD',250000,'Recovery'],
 ['enforcementCost','Enforcement cost','USD',250000,'Recovery'],
 ['siteArrears','Prior site arrears','USD',0,'Recovery'],
 ['storageCost','Storage','USD',100000,'Recovery'],
 ['preservationCost','Preservation','USD',200000,'Recovery'],
 ['deinstallCost','Deinstallation','USD',500000,'Recovery'],
 ['transportCost','Transport','USD',750000,'Recovery'],
 ['remarketCost','Remarketing','USD',100000,'Recovery'],
 ['reinstallCost','Replacement installation','USD',750000,'Recovery'],
 ['newSiteNrc','New site charges','USD',500000,'Recovery'],
 ['newSiteRate','Replacement site rate','USD/kW/month',270,'Recovery'],
 ['workoutCommitment','Committed lender workout funding','USD',0,'Recovery'],
 ['replacementPrice','Replacement buyer price multiplier','fraction',0.75,'Recovery'],
 ['replacementUtil','Replacement utilization','fraction',0.8,'Recovery'],
 ['replacementCollect','Replacement collectibility','fraction',0.9,'Recovery'],
 ['replacementLag','Replacement collection delay','days',60,'Recovery'],
 ['replacementMonths','Replacement contract duration','months',24,'Recovery'],
 ['restructureMonths','Restructuring extension','months',12,'Recovery'],
 ['restructureCoupon','Restructured nominal coupon','fraction',0.08,'Recovery'],
 ['forgiveInterest','Interest forgiveness in restructure','fraction',0,'Recovery'],
 ['holdDays','Hold strategy operating period before sale','days',365,'Recovery'],
 ['restructureDays','Restructure negotiation downtime','days',30,'Recovery'],
 ['releaseDays','Re-lease downtime','days',120,'Recovery'],
 ['relocateDays','Relocation downtime','days',180,'Recovery'],
 ['priority','Lender priority evidence','text',null,'Legal'],
 ['lien','Equipment lien evidence','boolean',null,'Legal'],
 ['accountControl','Account control evidence','boolean',null,'Legal'],
 ['siteAccess','Site access evidence','boolean',null,'Legal'],
 ['stepIn','Step-in evidence','boolean',null,'Legal'],
 ['removal','Removal rights evidence','boolean',null,'Legal'],
 ['transfer','Contract / asset transfer evidence','boolean',null,'Legal'],
 ['restructureConsent','Restructuring consent evidence','boolean',null,'Legal'],
 ['replacementBuyer','Replacement buyer evidence','boolean',null,'Legal'],
 ['newSite','Replacement site evidence','boolean',null,'Legal'],
 ['supportDeposit','Initial cash deposit','USD',0,'Support'],
 ['depositSource','Deposit funding source','text','Sponsor outside project','Support'],
 ['depositBeneficiary','Deposit beneficiary','text','lender','Support'],
 ['depositAvailable','Deposit legally available','boolean',null,'Support'],
 ['depositTrigger','Deposit trigger','text','Borrower/site default or selected acceleration','Support'],
 ['depositCovered','Deposit covered obligation','text','original principal','Support'],
 ['depositCollect','Deposit collectibility','fraction',1,'Support'],
 ['depositExpiry','Deposit expiry','date','2032-01-01','Support'],
 ['depositReleaseDate','Deposit released for operations','date',null,'Support'],
 ['depositRelease','Deposit consumed in operations','USD',0,'Support'],
 ['guarantee','Guarantee cap','USD',null,'Support'],
 ['guaranteeSource','Guarantor / evidence','text',null,'Support'],
 ['guaranteeBeneficiary','Guarantee beneficiary','text','lender','Support'],
 ['guaranteeTrigger','Guarantee trigger','text','Unpaid original principal after collateral','Support'],
 ['guaranteeCovered','Guarantee covered obligation','text','original principal','Support'],
 ['guaranteeAvailable','Guarantee collectible / enforceable','boolean',null,'Support'],
 ['guaranteeCollect','Guarantee collectibility','fraction',null,'Support'],
 ['guaranteeExpiry','Guarantee expiry','date',null,'Support'],
 ['insuranceRecovery','Insurance recovery limit','USD',null,'Support'],
 ['insuranceSource','Insurer / policy evidence','text',null,'Support'],
 ['insuranceBeneficiary','Insurance beneficiary','text','lender','Support'],
 ['insuranceTrigger','Insurance trigger','text','Selected covered default event','Support'],
 ['insuranceCovered','Insurance covered obligation','text','original principal','Support'],
 ['insuranceAvailable','Insurance trigger / availability evidenced','boolean',null,'Support'],
 ['insuranceCollect','Insurance recovery collectibility','fraction',null,'Support'],
 ['insuranceExpiry','Insurance recovery expiry','date',null,'Support'],
 ['horizonMonths','Reporting horizon from first wire','months',72,'Analysis'],
 ['minRecovery','Required original principal recovery','fraction',1,'Analysis'],
 ['minDscr','Minimum recurring DSCR constraint','x',1.2,'Analysis'],
 ['maxGap','Maximum unfunded cash gap constraint','USD',0,'Analysis'],
];
export const DICTIONARY = Object.freeze(Object.fromEntries(definitions.map(([key,label,unit,value,group,cell])=>[key,{key,label,unit,currency:unit.startsWith('USD')?'USD':null,default:value,group,cell:cell??null}])));
export function stableStringify(v){
 if(Array.isArray(v))return '['+v.map(stableStringify).join(',')+']';
 if(v&&typeof v==='object')return '{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+stableStringify(v[k])).join(',')+'}';
 return JSON.stringify(v);
}
export function hash(v){
 const s=stableStringify(v);let h=0xcbf29ce484222325n;
 for(const b of new TextEncoder().encode(s)){h^=BigInt(b);h=BigInt.asUintN(64,h*0x100000001b3n);}
 return 'fnv1a64:'+h.toString(16).padStart(16,'0');
}
export function freeze(v){if(v&&typeof v==='object'&&!Object.isFrozen(v)){Object.freeze(v);Object.values(v).forEach(freeze);}return v;}
export function createDeal(configuration='standard'){
 const assumptions={};
 for(const d of Object.values(DICTIONARY)){
  let value=d.default;
  if(configuration==='throttled')value=({equipmentCost:240000000,price:4.9,rackKw:120,reserveKw:0,equity:104666666.66666667})[d.key]??value;
  assumptions[d.key]={value,unit:d.unit,currency:d.currency,source:value===null?'Missing evidence':d.cell?`${configuration==='throttled'?'GB300_Financing_Model-throttled':'GB300_Financing_Model'}!${d.cell}`:'Illustrative underwriting choice; requires deal evidence',sourceDate:value===null?null:d.cell?SOURCE_DATE:'2026-10-30',status:value===null?'missing':d.cell?'estimated':'illustrative'};
  if(d.cell?.startsWith('BOM List'))assumptions[d.key].source=d.cell;
 }
 return freeze({id:`gb300-${configuration}`,name:`GB300 ${configuration}`,inputVersion:1,modelVersion:MODEL_VERSION,configuration,assumptions,overrides:{}});
}
export function overrideDeal(base,changes,name=base.name){
 const assumptions=structuredClone(base.assumptions);
 for(const[k,v]of Object.entries(changes)){
  if(!DICTIONARY[k])throw new Error(`Unknown input ${k}`);
  assumptions[k]=typeof v==='object'&&v!==null&&'value'in v?{...assumptions[k],...v}:{...assumptions[k],value:v,status:v===null?'missing':'illustrative',source:'User scenario override',sourceDate:new Date().toISOString().slice(0,10)};
 }
 return freeze({...base,name,inputVersion:base.inputVersion+1,parentHash:hash(base),assumptions,overrides:{...base.overrides,...changes}});
}
export const values=deal=>Object.fromEntries(Object.entries(deal.assumptions).map(([k,a])=>[k,a.value]));
export const TEMPLATES=freeze({standard:createDeal(),throttled:createDeal('throttled')});
export const SCENARIO_PRESETS=freeze({base:{},downside:{price:4.64,utilization:0.8,annualDecay:0.45,haircut:0.35,collectionLag:60},severe:{price:3.48,utilization:0.55,annualDecay:0.6,haircut:0.5,collectionLag:90}});
