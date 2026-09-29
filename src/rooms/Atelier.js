export function buildAtelier(ctx) {
  const {T,sc,bx,cy,sp,mat,gold,OB,fl,reg,frame,FL,hits,lab,tex} = ctx;

[[-17,0x7a1f2b],[-14,0xd8c8a8],[-11,0x1e2a44]].forEach(([x,c],i)=>{const g=new T.Group(),m=mat(c,.95);cy(.03,.03,1.8,gold,0,.9,0,g);cy(.28,.22,.7,m,0,1.45,0,g);cy(.6,.28,1,m,0,.6,0,g,32);sp(.11,mat(0xcbb79a,.8),0,1.95,0,g);g.position.set(x,0,-12);sc.add(g);OB.push([x,-12,.7]);reg(["design","uiux","fashion"][i],g)});
frame("",-14,2.3,-19.62,0,"Sketches","#4b3a2f",2.4,1.4);hits.pop();


}
