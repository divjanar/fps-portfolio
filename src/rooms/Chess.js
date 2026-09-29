export function buildChess(ctx) {
  const {T,sc,bx,cy,sp,mat,gold,OB,fl,reg,frame,FL,hits,lab,tex} = ctx;

const fl2=[];const cx=-14,cz=0;
cy(.3,.5,.9,mat(0x14171c,.4,.5),cx,.45,cz,sc);OB.push([cx,cz,1.9]);
const bt=FL.chess[0].clone();bt.needsUpdate=true;bt.repeat.set(2,2);bx(3.6,.1,3.6,mat(0xffffff,.4,0,{map:bt}),cx,.92,cz);
const pc=(id,dx,dz,h,gd,kind)=>{const g=new T.Group(),m=mat(gd?0xc9a45c:0x14171c,.3,gd?.8:.3);cy(.2,.24,.1,m,0,.05,0,g);cy(.09,.17,h,m,0,.1+h/2,0,g);
 if(kind==="rook")cy(.2,.2,.2,m,0,.2+h,0,g);else if(kind==="king"){sp(.13,m,0,.2+h,0,g);bx(.05,.28,.05,m,0,.5+h,0,g);bx(.18,.05,.05,m,0,.5+h,0,g)}else if(kind==="knight"){const n=bx(.16,.3,.34,m,0,.25+h,.05,g);n.rotation.x=-.5}else sp(kind==="pawn"?.1:.14,m,0,.2+h,0,g);
 g.position.set(cx+dx,1,cz+dz);g.userData.by=1;sc.add(g);fl.push(g);reg(id,g)};
pc("king",-.6,-.6,.6,1,"king");pc("queen",.6,-.5,.55,0,"queen");pc("knight",-.7,.6,.4,0,"knight");pc("bishop",.7,.5,.5,1,"bishop");pc("rook",0,0,.35,1,"rook");pc("pawn",.1,1.2,.25,0,"pawn");


}
