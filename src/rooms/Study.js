export function buildStudy(ctx) {
  const {T,sc,bx,cy,sp,mat,gold,OB,fl,reg,frame,FL,hits,lab,tex} = ctx;

bx(3,.1,1.4,mat(0x2a1208,.4),0,.95,-29);bx(.15,.9,1.2,mat(0x2a1208),-1.3,.45,-29);bx(.15,.9,1.2,mat(0x2a1208),1.3,.45,-29);OB.push([0,-29,1.7]);
[[-.9,0x5a0f1e,"exp1"],[-.4,0x1e2a44,"exp2"]].forEach(([x,c,id])=>{const b=bx(.5,.14,.7,mat(c,.6),x,1.07,-29);bx(.52,.02,.08,gold,x,1.07,-28.8);reg(id,b)});
const ltr=bx(.6,.02,.42,mat(0xefe4cc,.8),.7,1.01,-28.9);sp(.06,mat(0xa8202e,.4),.7,1.03,-28.9,sc);reg("contact",ltr);
frame("resume",0,2.2,-33.62,0,"Resume","#2a1a12",1.6,2);
for(let s=-1;s<=1;s+=2)for(let i=0;i<40;i++)bx(.3,.8+Math.random()*.6,.6,mat(new T.Color().setHSL(.02+Math.random()*.08,.5,.12+Math.random()*.1),.7),s*6.3,.5+Math.random()*.05+(i%4)*1.1,-33+Math.floor(i/4)*1.4-((i%4)*0)+0*i).position.y=.5+(i%4)*1.1;



}
