export const DAY=86400000;
export const time=s=>Date.parse(s+'T00:00:00Z');
export const date=t=>new Date(t).toISOString().slice(0,10);
export const addDays=(s,n)=>date(time(s)+n*DAY);
export function addMonths(s,n){const d=new Date(time(s)),day=d.getUTCDate();d.setUTCDate(1);d.setUTCMonth(d.getUTCMonth()+n);const end=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,0)).getUTCDate();d.setUTCDate(Math.min(day,end));return date(+d);}
export const days=(a,b)=>(time(b)-time(a))/DAY;
export const monthDays=s=>new Date(Date.UTC(+s.slice(0,4),+s.slice(5,7),0)).getUTCDate();
export const sum=(a,k)=>a.reduce((s,x)=>s+(k?x[k]??0:x),0);
export const near=(a,b)=>Math.abs(a-b)<Math.max(.02,Math.abs(a)*1e-10);
export function allocatePrincipal(amount,balance,mode='original-first'){
 const b={...balance},paid={original:0,pik:0,workout:0};let left=Math.max(0,amount);
 const total=b.original+b.pik;
 if(mode==='pro-rata'&&total>0){const cash=Math.min(left,total);paid.original=cash*b.original/total;paid.pik=cash*b.pik/total;b.original-=paid.original;b.pik-=paid.pik;left-=cash;}
 for(const key of mode==='pro-rata'?['workout']:['original','pik','workout']){const p=Math.min(left,Math.max(0,b[key]));b[key]-=p;paid[key]+=p;left-=p;}
 return {balance:b,paid,surplus:left};
}
export function recoveryWaterfall({proceeds,costs=0,senior=0,balance,interest=0,fees=0,allocation='original-first'}){
 let pool=Math.max(0,proceeds),costPaid=Math.min(pool,costs);pool-=costPaid;
 const seniorPaid=Math.min(pool,senior);pool-=seniorPaid;
 const a=allocatePrincipal(pool,balance,allocation);pool=a.surplus;
 const interestPaid=Math.min(pool,interest);pool-=interestPaid;const feesPaid=Math.min(pool,fees);pool-=feesPaid;
 return {...a,interestPaid,feesPaid,surplus:pool,costPaid,seniorPaid,costUnfunded:costs-costPaid,seniorUnpaid:senior-seniorPaid};
}
export function creditInvoice(invoice,prepayment){const credit=Math.min(invoice,prepayment);return {credit,remainingPrepayment:prepayment-credit,cashDue:invoice-credit};}
export function xnpv(rate,flows,basis=365){if(rate<=-1)return NaN;if(!flows.length)return 0;const origin=flows[0].date;return sum(flows.map(f=>f.amount/Math.pow(1+rate,days(origin,f.date)/basis)));}
export function xirr(flows,basis=365){
 const grouped=new Map();for(const f of flows)grouped.set(f.date,(grouped.get(f.date)||0)+f.amount);
 const a=[...grouped].sort(([a],[b])=>a.localeCompare(b)).map(([date,amount])=>({date,amount})).filter(f=>Math.abs(f.amount)>1e-8);
 if(!a.some(f=>f.amount>0)||!a.some(f=>f.amount<0))return {value:null,roots:[],warning:'No feasible IRR: both positive and negative dated cash flows required.'};
 const roots=[];let prev=-.999999,fp=xnpv(prev,a,basis);
 // Scan in log(1+r), including negative rates; do not silently choose one of multiple roots.
 for(let i=1;i<=800;i++){
  const r=Math.exp(Math.log(.000001)+(Math.log(10001)-Math.log(.000001))*i/800)-1,f=xnpv(r,a,basis);
  if(Number.isFinite(f)&&Number.isFinite(fp)&&f*fp<0){let lo=prev,hi=r,flo=fp;for(let j=0;j<85;j++){const m=(lo+hi)/2,fm=xnpv(m,a,basis);if(fm*flo>0){lo=m;flo=fm;}else hi=m;}const root=(lo+hi)/2;if(!roots.some(x=>Math.abs(x-root)<1e-7))roots.push(root);}
  prev=r;fp=f;
 }
 let signs=0;for(let i=1;i<a.length;i++)if(Math.sign(a[i].amount)!==Math.sign(a[i-1].amount))signs++;
 const warning=roots.length===0?'No feasible IRR root within [-99.9999%, 1,000,000%].':roots.length>1?'Multiple IRR roots; no unique lender IRR.':signs>1?'Non-conventional cash flows: one detected root; additional/tangent roots cannot be ruled out.':null;
 return {value:roots.length===1&&signs===1?roots[0]:null,roots,warning};
}
