import * as THREE from 'three';

// Original, planar technical drawings. Coordinates use the card's long axis
// horizontally and a front elevation vertically; the card supplies perspective.
export function createFlatIllustration(key,palette) {
  const group=new THREE.Group();group.name=key+'-flat';group.position.y=.064;
  const ink=new THREE.LineBasicMaterial({transparent:true,depthWrite:false});
  const fine=new THREE.LineBasicMaterial({transparent:true,depthWrite:false});
  ink.color=palette.outline.color;fine.color=palette.detail.color;
  group.userData.materials=[ink,fine];

  function stroke(points,detail=false,closed=false) {
    const geometry=new THREE.BufferGeometry().setFromPoints(points.map(([x,y])=>new THREE.Vector3(x,0,-y)));
    group.add(closed?new THREE.LineLoop(geometry,detail?fine:ink):new THREE.Line(geometry,detail?fine:ink));
  }
  function rect(x,y,w,h,detail=false,r=.025) {
    const path=new THREE.Path(),l=x-w/2,b=y-h/2;
    path.moveTo(l+r,b);path.lineTo(l+w-r,b);path.quadraticCurveTo(l+w,b,l+w,b+r);
    path.lineTo(l+w,b+h-r);path.quadraticCurveTo(l+w,b+h,l+w-r,b+h);
    path.lineTo(l+r,b+h);path.quadraticCurveTo(l,b+h,l,b+h-r);
    path.lineTo(l,b+r);path.quadraticCurveTo(l,b,l+r,b);
    stroke(path.getPoints(40).map(point=>[point.x,point.y]),detail,true);
  }
  function oval(x,y,rx,ry=rx,detail=false) {
    stroke(Array.from({length:40},(_,i)=>{const a=i/40*Math.PI*2;return[x+Math.cos(a)*rx,y+Math.sin(a)*ry];}),detail,true);
  }

  if(key==='customer') {
    // Humanoid front elevation and quadruped side elevation.
    const x=-.78;
    rect(x,.58,.29,.25);rect(x,.59,.20,.055,true,.012);
    stroke([[x,.45],[x,.38]]);
    rect(x,.15,.47,.42);rect(x,.16,.30,.23,true);
    rect(x,-.18,.34,.14);
    for(const side of [-1,1]) {
      const sx=x+side*.29;
      oval(sx,.30,.052);
      stroke([[sx,.25],[x+side*.39,.02],[x+side*.35,-.27]]);
      oval(x+side*.39,.02,.038);
      rect(x+side*.35,-.34,.085,.12,false,.012);
      stroke([[x+side*.13,-.25],[x+side*.15,-.43],[x+side*.15,-.61]]);
      oval(x+side*.15,-.43,.04);
      rect(x+side*.15,-.66,.18,.10,false,.015);
    }
    rect(.76,.035,.87,.24);rect(.76,.08,.56,.08,true,.015);
    stroke([[1.16,.08],[1.22,.19]]);rect(1.31,.19,.22,.18);
    rect(1.36,.20,.07,.07,true,.012);
    stroke([[.33,.08],[.16,.21]]);
    for(const [hip,knee,foot] of [[.43,.29,.42],[.55,.42,.54],[1.01,1.13,1.06],[1.13,1.24,1.18]]) {
      stroke([[hip,-.085],[knee,-.27],[foot,-.49]]);
      oval(knee,-.27,.029,.029,true);
      rect(foot,-.52,.13,.055,false,.01);
    }
  }

  if(key==='gpu') {
    for(const x of [-.9,0,.9]) {
      rect(x,0,.63,1.40);rect(x,-.015,.51,1.25,true);
      stroke([[x-.26,.47],[x+.26,.47]],true);
      for(let row=0;row<5;row++) {
        const y=.30-row*.205;
        rect(x,y,.43,.145,true,.012);
        for(const dy of [-.032,.025])stroke([[x-.17,y+dy],[x+.17,y+dy]],true);
      }
      stroke([[x+.24,-.12],[x+.24,-.28]],true);
    }
  }

  if(key==='site') {
    rect(-.32,-.04,2.30,.83);rect(-.32,.43,2.44,.16);
    for(const x of [-1.19,-.61,-.03,.55]) {
      rect(x,.61,.38,.29);oval(x,.61,.10,.10,true);
      stroke([[x-.065,.61],[x+.065,.61]],true);
      stroke([[x,.545],[x,.675]],true);
      rect(x,-.11,.39,.44,true);
      for(const dy of [-.11,0,.11])stroke([[x-.13,-.11+dy],[x+.13,-.11+dy]],true);
    }
    for(const x of [1.04,1.32,1.60]) {
      rect(x,-.13,.19,.59);rect(x,-.11,.115,.32,true,.012);
    }
  }

  if(key==='capital') {
    for(const x of [-.85,0,.85]) {
      rect(x+.025,.015,.53,1.10,true);
      rect(x,.06,.53,1.10);rect(x,.06,.44,.99,true);
      rect(x,.06,.55,.135);
      oval(x,-.27,.11,.075,true);
    }
    for(const x of [-.25,.25]) {
      oval(x,-.67,.165,.145);oval(x,-.67,.12,.104,true);
      stroke([[x-.165,-.67],[x-.165,-.74],[x-.13,-.80],[x,-.84],[x+.13,-.80],[x+.165,-.74],[x+.165,-.67]],true);
    }
  }

  // A small matching glyph stays readable on the exposed front corner of a
  // folded card, even where the main drawing sits beneath the card above it.
  const cx=-1.55,cy=-.84;
  if(key==='customer') {
    oval(cx,cy+.065,.036);
    stroke([[cx-.095,cy-.085],[cx-.075,cy-.01],[cx,cy+.014],[cx+.075,cy-.01],[cx+.095,cy-.085]]);
  }
  if(key==='gpu') {
    rect(cx,cy,.12,.12,false,.008);
    for(const d of [-.035,.035]) {
      stroke([[cx-.105,cy+d],[cx-.06,cy+d]]);
      stroke([[cx+.06,cy+d],[cx+.105,cy+d]]);
      stroke([[cx+d,cy-.105],[cx+d,cy-.06]]);
      stroke([[cx+d,cy+.06],[cx+d,cy+.105]]);
    }
  }
  if(key==='site') {
    rect(cx,cy-.015,.225,.14,false,.008);
    for(const dx of [-.065,0,.065])stroke([[cx+dx,cy-.07],[cx+dx,cy+.025]],true);
    for(const dx of [-.06,.06])oval(cx+dx,cy+.075,.028,.02);
  }
  if(key==='capital') {
    rect(cx+.025,cy-.015,.12,.19,true,.008);
    rect(cx,cy,.12,.19,false,.008);
    stroke([[cx-.06,cy-.015],[cx+.06,cy-.015]]);
    stroke([[cx-.06,cy+.015],[cx+.06,cy+.015]]);
  }
  return group;
}
