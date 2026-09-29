export function buildDining(ctx) {
  const {T,sc,bx,cy,sp,mat,gold,OB,fl,reg,frame,FL,hits,lab,tex} = ctx;

bx(7,.12,1.6,mat(0x2a1208,.4),14,.95,-13);[11.3,16.7].forEach(x=>[-.6,.6].forEach(z=>bx(.15,.9,.15,mat(0x2a1208),x,.45,-13+z)));[11,14,17].forEach(x=>OB.push([x,-13,1.1]));
const cake=new T.Group();cy(.35,.3,.08,mat(0xd8c8a8,.4),0,0,0,cake);cy(.3,.3,.25,mat(0xf1dfc0,.6),0,.17,0,cake);sp(.08,mat(0xa8202e,.5),0,.34,0,cake);cake.position.set(14,1.05,-13);sc.add(cake);reg("food",cake);
[12.4,15.6].forEach(x=>cy(.05,.05,.3,mat(0xefe4cc),x,1.16,-13,sc));
frame("hobbies",14,2.2,-19.62,0,"Hobbies","#5b2f18",1.6,1.2);
const bear=new T.Group(),bm=mat(0x8a5a36,.95);sp(.3,bm,0,.3,0,bear);sp(.22,bm,0,.75,0,bear);[-.16,.16].forEach(x=>sp(.08,bm,x,.95,0,bear));sp(.09,mat(0xc8a078,.9),0,.72,.19,bear);bear.position.set(11.4,1.01,-13.3);sc.add(bear);reg("bear",bear);


}
