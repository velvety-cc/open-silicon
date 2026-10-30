export const CARD_GAP=.28;
export const CARD_Z_STEP=.18;
export const LOWER_CLEARANCE=.32;

// A single open slot, sized to the selected object. All other cards stay in
// compact packets above and below it.
export function layoutFor(activeIndex,heights,single=false) {
  const open=activeIndex>=0;
  const half=open?(heights[activeIndex]+(activeIndex===0?0:.85))/2:0;
  return heights.map((_,index)=>({
    y:single?0:(3-index)*CARD_GAP+(!open?0:index<activeIndex?half+LOWER_CLEARANCE/2:index===activeIndex?-half+LOWER_CLEARANCE/2:-half-LOWER_CLEARANCE/2),
    z:single?0:(index-1.5)*CARD_Z_STEP,
    reveal:single?(index===(open?activeIndex:0)?1:0):(index===activeIndex?1:0),
    visible:!single||index===(open?activeIndex:0),
  }));
}
