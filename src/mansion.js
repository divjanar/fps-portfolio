import * as THREE from "three";
import {R,DOORS,C} from "./portfolioData";
import {buildHall} from "./rooms/Hall";
import {buildChess} from "./rooms/Chess";
import {buildGarage} from "./rooms/Garage";
import {buildListening} from "./rooms/Listening";
import {buildAtelier} from "./rooms/Atelier";
import {buildDining} from "./rooms/Dining";
import {buildStudy} from "./rooms/Study";
import { createSpotifyWall } from "./SpotifyWall";

const $=s=>document.querySelector(s),T=THREE;
const esc=s=>{const d=document.createElement("div");d.textContent=s;return d.innerHTML};
/* ===== CONTENT: edit freely. [Placeholder] marks text to replace. ===== */
/* ===== END CONTENT ===== */

const ok=u=>/^(https?:|mailto:)/i.test(u);
let panelOpen=false,state="intro",lastFocus=null;
function openItem(id) {
  const c = C[id];
  if (!c) return;

  const o = c[3] || {};

  panelOpen = true;
  lastFocus = document.activeElement;

  $("#pg").textContent = R[c[0]].n + " · " + R[c[0]].s;
  $("#pt").textContent = id === "music" ? "Now playing" : c[1];

  if (id === "music") {
    $("#pb").innerHTML = `
      <p>Listen to my playlist while exploring the mansion.</p>

      <iframe
        title="My Spotify playlist"
        src="https://open.spotify.com/embed/playlist/1p96Ilaggxn6JlGkLEbw4y?theme=0"
        width="100%"
        height="352"
        style="border:0; border-radius:12px; margin-top:16px;"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowfullscreen
      ></iframe>

      <div class="lk">
        <a
          href="https://open.spotify.com/playlist/1p96Ilaggxn6JlGkLEbw4y"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Spotify
        </a>
      </div>
    `;
  } else {
    $("#pb").innerHTML =
      c[2]
        .split("\n\n")
        .map((p) => "<p>" + esc(p) + "</p>")
        .join("") +
      '<div class="img">Image / demo placeholder</div>' +
      (o.r
        ? '<p class="dl"><b>My role</b><br>' + esc(o.r) + "</p>"
        : "") +
      (o.k
        ? '<p class="dl"><b>Technology</b><br>' + esc(o.k) + "</p>"
        : "") +
      (o.l
        ? '<div class="lk">' +
          o.l
            .filter((link) => ok(link[1]))
            .map(
              (link) =>
                '<a href="' +
                esc(link[1]) +
                '" target="_blank" rel="noopener noreferrer">' +
                esc(link[0]) +
                "</a>"
            )
            .join("") +
          "</div>"
        : "");
  }

  $("#pn").hidden = false;
  $("#pr").hidden = true;
  $("#px").focus();
  $("#pn").scrollTop = 0;
}
function closeItem(){$("#pn").hidden=true;panelOpen=false;lastFocus&&lastFocus.focus&&lastFocus.focus()}
/* ===== 3D ===== */
export function initMansion(){
$("#px").onclick=closeItem;$("#pn").addEventListener("mousedown",e=>{if(e.target.id==="pn")closeItem()});
$("#bl").innerHTML=Object.keys(R).map(k=>"<section><h2>"+R[k].n+' <small style="font:14px Jost;color:var(--mut)">'+R[k].s+"</small></h2><ul>"+Object.keys(C).filter(i=>C[i][0]===k).map(i=>'<li><button data-i="'+i+'">'+esc(C[i][1])+"</button></li>").join("")+"</ul></section>").join("");
$("#nav").innerHTML=Object.keys(R).map(k=>'<button data-go="'+k+'">'+R[k].n+"</button>").join("")+'<button data-a="map">Map (M)</button><button data-a="browse">Browse list</button>';
document.addEventListener("click",e=>{const d=e.target.dataset;if(d.i)openItem(d.i);if(d.go)go(d.go);
 if(d.a==="map")$("#mp").hidden=!$("#mp").hidden;if(d.a==="browse"){$("#br").hidden=false}
 if(d.a==="walk"){$("#br").hidden=true;if(state==="intro")start()}});
$("#bw").onclick=()=>{$("#br").hidden=false};
addEventListener("keydown",e=>{if(e.key==="Escape"){if(panelOpen)closeItem();else $("#br").hidden=true}});


let renderer=null;try{renderer=new T.WebGLRenderer({canvas:$("#c"),antialias:true})}catch(e){}
if(!renderer){$("#en").hidden=true;$("#br").hidden=false}
else{
const sc=new T.Scene();sc.background=new T.Color(0x07050a);sc.fog=new T.FogExp2(0x07050a,.035);
const cam=new T.PerspectiveCamera(70,1,.1,80);cam.rotation.order="YXZ";
const spotifyWall = createSpotifyWall(cam);
renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));
const rs=()=>{renderer.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()};addEventListener("resize",rs);rs();
const mat=(c,r=.7,m=0,o)=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:r,metalness:m},o));
const bx=(w,h,d,m,x,y,z,p=sc)=>{const b=new T.Mesh(new T.BoxGeometry(w,h,d),m);b.position.set(x,y,z);p.add(b);return b};
const cy=(r0,r1,h,m,x,y,z,p,s=24)=>{const b=new T.Mesh(new T.CylinderGeometry(r0,r1,h,s),m);b.position.set(x,y,z);p.add(b);return b};
const sp=(r,m,x,y,z,p)=>{const b=new T.Mesh(new T.SphereGeometry(r,16,12),m);b.position.set(x,y,z);p.add(b);return b};
const tex=(w,h,fn)=>{const c=document.createElement("canvas");c.width=w;c.height=h;fn(c.getContext("2d"),w,h);const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.anisotropy=4;return t};
const veins=(g,w,h,n,col)=>{g.strokeStyle=col;for(let i=0;i<n;i++){g.beginPath();let x=Math.random()*w,y=0;g.moveTo(x,y);for(let k=0;k<8;k++){x+=(Math.random()-.5)*50;y+=h/8;g.lineTo(x,y)}g.lineWidth=Math.random()*1.4+.3;g.stroke()}};
const FL={
marble: [
  tex(512, 512, (g, w, h) => {
    g.fillStyle = "#302d2b";
    g.fillRect(0, 0, w, h);

    for (let i = 0; i < 8000; i++) {
      const v = 35 + Math.random() * 45;
      g.fillStyle = `rgba(${v},${v - 2},${v - 5},.07)`;
      g.fillRect(Math.random() * w, Math.random() * h, 3, 3);
    }

    veins(g, w, h, 9, "rgba(197,187,169,.14)");
    g.strokeStyle = "rgba(10,9,8,.5)";
    g.lineWidth = 3;
    g.strokeRect(2, 2, w - 4, h - 4);
  }),
  3.5
],
chess:[tex(128,128,(g,w,h)=>{g.fillStyle="#eadfc6";g.fillRect(0,0,w,h);g.fillStyle="#2b4566";g.fillRect(64,0,64,64);g.fillRect(0,64,64,64);veins(g,w,h,5,"rgba(201,164,92,.5)")}),2],
wood:[tex(256,256,(g,w,h)=>{for(let i=0;i<4;i++){g.fillStyle="hsl(24,"+(38+Math.random()*10)+"%,"+(17+Math.random()*7)+"%)";g.fillRect(i*64,0,64,h);g.fillStyle="rgba(0,0,0,.5)";g.fillRect(i*64,0,2,h)}}),4],
conc:[tex(128,128,(g,w,h)=>{g.fillStyle="#2a2a2f";g.fillRect(0,0,w,h);for(let i=0;i<500;i++){g.fillStyle="rgba(255,255,255,"+Math.random()*.05+")";g.fillRect(Math.random()*w,Math.random()*h,2,2)}}),4]};
const wrap=(g,t,x,y,mw,lh)=>{const ws=t.split(" "),ls=[];let l="";ws.forEach(w=>{if(g.measureText(l+w).width>mw&&l){ls.push(l);l=w+" "}else l+=w+" "});ls.push(l);ls.forEach((s,i)=>g.fillText(s.trim(),x,y+(i-(ls.length-1)/2)*lh))};
const lab=(t,bg,w=256,h=320)=>tex(w,h,(g)=>{g.fillStyle=bg;g.fillRect(0,0,w,h);g.strokeStyle="#c9a45c";g.lineWidth=6;g.strokeRect(12,12,w-24,h-24);g.fillStyle="#efe4cc";g.font="600 36px Georgia,serif";g.textAlign="center";g.textBaseline="middle";wrap(g,t,w/2,h/2,w-64,42)});
const gold=mat(0xb8934a,.35,.85),hits=[],OB=[],fl=[];
const reg=(id,o)=>{o.traverse(m=>{if(m.isMesh){m.userData.id=id;hits.push(m)}})};
const frame=(id,x,y,z,ry,t,bg,w=1.3,h=1.7)=>{const g=new T.Group();bx(w+.16,h+.16,.08,gold,0,0,0,g);const p=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:lab(t,bg,256,Math.round(256*h/w)),color:0xdddddd}));p.position.z=.05;g.add(p);g.position.set(x,y,z);g.rotation.y=ry;sc.add(g);reg(id,g)};
/* rooms */
const H=4.6;
for(const k in R){const r=R[k];r.cx=(r.x0+r.x1)/2;r.cz=(r.z0+r.z1)/2;const w=r.x1-r.x0,d=r.z1-r.z0,f=FL[r.fl],t=f[0].clone();t.needsUpdate=true;t.repeat.set(w/f[1],d/f[1]);
 const fm=new T.Mesh(new T.PlaneGeometry(w,d),mat(0xffffff,r.fl==="marble"?.3:.6,0,{map:t}));fm.rotation.x=-Math.PI/2;fm.position.set(r.cx,0,r.cz);sc.add(fm);
 const cm=new T.Mesh(new T.PlaneGeometry(w,d),mat(0x120c09,.9));cm.rotation.x=Math.PI/2;cm.position.set(r.cx,H,r.cz);sc.add(cm);
 const wm = mat(r.wc, k === "hall" ? .92 : .85);
 [["x",r.x0,1],["x",r.x1,-1],["z",r.z0,1],["z",r.z1,-1]].forEach(([ax,v,s])=>{
  const a=ax==="x"?r.z0:r.x0,b=ax==="x"?r.z1:r.x1,g=DOORS.find(o=>(o[0]===k||o[1]===k)&&o[2]===ax&&o[3]===v);
  const seg=(p,q,y0,y1)=>{if(q-p<.01)return;const L=q-p,hh=y1-y0,c=(p+q)/2,yy=(y0+y1)/2;ax==="x"?bx(.3,hh,L,wm,v+s*.15,yy,c):bx(L,hh,.3,wm,c,yy,v+s*.15)};
  if(g){const c=g[4];seg(a,c-1.3,0,H);seg(c+1.3,b,0,H);seg(c-1.3,c+1.3,3.3,H)}else seg(a,b,0,H);
  if(ax==="x")bx(.06,.14,b-a,gold,v+s*.32,1.1,(a+b)/2);else bx(b-a,.14,.06,gold,(a+b)/2,1.1,v+s*.32)});
 if (k !== "hall") {
  const L = new T.PointLight(r.lc, 1.25, 28, 2);
  L.position.set(r.cx, 3.7, r.cz);
  sc.add(L);

  sp(
    .18,
    mat(0xffe2a8, .3, 0, {
      emissive: 0xffc070,
      emissiveIntensity: 1.4
    }),
    r.cx, 4.1, r.cz, sc
  );
}
 sp(.18,mat(0xffe2a8,.3,0,{emissive:0xffc070,emissiveIntensity:1.4}),r.cx,4.1,r.cz,sc)}
DOORS.forEach(o=>{const ax=o[2],v=o[3],c=o[4];[-1.3,1.3].forEach(j=>ax==="x"?bx(.2,3.3,.2,gold,v,1.65,c+j):bx(.2,3.3,.2,gold,c+j,1.65,v));ax==="x"?bx(.2,.2,2.8,gold,v,3.3,c):bx(2.8,.2,.2,gold,c,3.3,v)});
/* outside */
const gr=new T.Mesh(new T.PlaneGeometry(200,200),mat(0x0b110e,1));gr.rotation.x=-Math.PI/2;gr.position.y=-.01;sc.add(gr);
const path=new T.Mesh(new T.PlaneGeometry(5,14),mat(0x2a2624,.9));path.rotation.x=-Math.PI/2;path.position.set(0,0,13);sc.add(path);
[-2.6,2.6].forEach(x=>{sp(.16,mat(0xffe2a8,.3,0,{emissive:0xffb060,emissiveIntensity:1.6}),x,2.4,6.5,sc);const l=new T.PointLight(0xffb060,1.2,12,2);l.position.set(x,2.4,7);sc.add(l)});
sc.add(new T.AmbientLight(0x2a2030,.6));const mn=new T.DirectionalLight(0x5a6aa0,.4);mn.position.set(-10,20,20);sc.add(mn);
/* hall */
buildHall({T,sc,bx,cy,sp,mat,gold,OB,fl,reg,frame,FL,hits,lab,tex});
/* chess room */
buildChess({T,sc,bx,cy,sp,mat,gold,OB,fl,reg,frame,FL,hits,lab,tex});
/* garage */
buildGarage({T,sc,bx,cy,sp,mat,gold,OB,fl,reg,frame,FL,hits,lab,tex});
/* listening room */
const listeningResult = buildListening({T,sc,bx,cy,sp,mat,gold,OB,fl,reg,frame,FL,hits,lab,tex});
/* atelier */
buildAtelier({T,sc,bx,cy,sp,mat,gold,OB,fl,reg,frame,FL,hits,lab,tex});
/* dining */
buildDining({T,sc,bx,cy,sp,mat,gold,OB,fl,reg,frame,FL,hits,lab,tex});
/* study */
buildStudy({T,sc,bx,cy,sp,mat,gold,OB,fl,reg,frame,FL,hits,lab,tex});
/* interaction + movement */
const ray=new T.Raycaster();ray.far=3.6;let cur=null,yaw=0,pitch=0,px=0,pz=16,fc=0,tf=false;const keys={};
addEventListener("keydown",e=>{keys[e.code]=1;if(e.code==="KeyE"&&cur&&state==="play"&&!panelOpen)openItem(cur);if(e.code==="KeyM")$("#mp").hidden=!$("#mp").hidden;if(e.code.startsWith("Arrow")&&state==="play")e.preventDefault()});
addEventListener("keyup",e=>keys[e.code]=0);
let drag=null;const cv=$("#c");
cv.addEventListener("pointerdown",e=>{if(state!=="play"||panelOpen)return;drag={x:e.clientX,y:e.clientY,d:0};cv.setPointerCapture(e.pointerId)});
cv.addEventListener("pointermove",e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;drag.d+=Math.abs(dx)+Math.abs(dy);yaw-=dx*.0045;pitch=Math.max(-1.2,Math.min(1.2,pitch-dy*.0045));drag.x=e.clientX;drag.y=e.clientY});
cv.addEventListener("pointerup",()=>{if(drag&&drag.d<6&&cur)openItem(cur);drag=null});
$("#pr").onclick=()=>cur&&openItem(cur);
const fw=$("#fw");fw.onpointerdown=()=>tf=true;fw.onpointerup=fw.onpointerleave=()=>tf=false;
if("ontouchstart" in window){fw.hidden=false;$("#bw").className="btn"}
const canGo=(x,z)=>{for(const o of OB)if(Math.hypot(x-o[0],z-o[1])<o[2]+.35)return false;
 for(const k in R){const r=R[k];if(x>r.x0+.45&&x<r.x1-.45&&z>r.z0+.45&&z<r.z1-.45)return true}
 if(Math.abs(x)<2.6&&z>5.4&&z<17)return true;
 return DOORS.some(o=>o[2]==="x"?Math.abs(x-o[3])<1&&Math.abs(z-o[4])<.9:Math.abs(z-o[3])<1&&Math.abs(x-o[4])<.9)};
const roomAt=(x,z)=>{for(const k in R){const r=R[k];if(x>=r.x0&&x<r.x1&&z>=r.z0&&z<r.z1)return k}return null};
let rm=null;
window.go=k=>{const r=R[k];$("#fd").style.opacity=1;setTimeout(()=>{px=r.cx;pz=r.z1-1.8;yaw=0;pitch=0;$("#fd").style.opacity=0},350)};
window.start=()=>{$("#in").style.opacity=0;setTimeout(()=>$("#in").hidden=true,1200);state="walk";t0=performance.now()};
$("#en").onclick=start;let t0=0;
const mp=$("#mp"),mg=mp.getContext("2d");
function drawMap(){mg.clearRect(0,0,130,156);const s=3,ox=63,oz=104;for(const k in R){const r=R[k];mg.fillStyle="#"+r.wc.toString(16).padStart(6,"0");mg.globalAlpha=.9;mg.fillRect(ox+r.x0*s*.95/1+0,oz+r.z0*s,(r.x1-r.x0)*s*.95,(r.z1-r.z0)*s);mg.globalAlpha=1;mg.strokeStyle="#c9a45c";mg.strokeRect(ox+r.x0*s*.95,oz+r.z0*s,(r.x1-r.x0)*s*.95,(r.z1-r.z0)*s)}
 const x=ox+px*s*.95,z=oz+pz*s;mg.fillStyle="#fff";mg.beginPath();mg.arc(x,z,3,0,7);mg.fill();mg.strokeStyle="#fff";mg.beginPath();mg.moveTo(x,z);mg.lineTo(x-Math.sin(yaw)*9,z-Math.cos(yaw)*9);mg.stroke()}
let last=0;
function loop(t){requestAnimationFrame(loop);const dt=Math.min(.05,(t-last)/1000||.016);last=t;const s=t/1000;
 if(state==="intro"){px=Math.sin(s*.3)*.6;pz=16;yaw=Math.sin(s*.2)*.05}
 else if(state==="walk"){const u=Math.min(1,(t-t0)/3800),e=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;pz=16-e*12.5;px=0;yaw=0;if(u>=1){state="play";$("#hud").hidden=false;$("#rl").textContent="";$("#mp").hidden=false}}
 else if(state==="play"&&!panelOpen){const k=keys;let f=(k.KeyW||k.ArrowUp?1:0)-(k.KeyS||k.ArrowDown?1:0)+(tf?1:0),sd=(k.KeyD?1:0)-(k.KeyA?1:0);if(k.ArrowLeft)yaw+=dt*1.8;if(k.ArrowRight)yaw-=dt*1.8;
  const v=(k.ShiftLeft?5.5:3.4)*dt,dx=(-Math.sin(yaw)*f+Math.cos(yaw)*sd)*v,dz=(-Math.cos(yaw)*f-Math.sin(yaw)*sd)*v;if(canGo(px+dx,pz))px+=dx;if(canGo(px,pz+dz))pz+=dz;
  const r=roomAt(px,pz);if(r&&r!==rm){rm=r;const l=$("#rl");l.textContent=R[r].n;l.classList.remove("on");void l.offsetWidth;l.classList.add("on")}
  if(++fc%3===0){ray.setFromCamera({x:0,y:0},cam);const h=ray.intersectObjects(hits,false)[0];cur=h?h.object.userData.id:null;const p=$("#pr");p.hidden=!cur;if(cur)p.querySelector("b").textContent=C[cur][1]}}
 if(panelOpen)cur=null;
 cam.position.set(px,1.65+(state==="play"&&(keys.KeyW||keys.ArrowUp)?Math.sin(s*9)*.02:0),pz);cam.rotation.set(pitch,yaw,0);
 fl.forEach((g,i)=>{g.position.y=1+Math.sin(s*.9+i)*.05;g.rotation.y=s*.25+i});listeningResult.rec.rotation.y=s*.6;
 listeningResult.bars.forEach((b,i)=>{const h=.3+Math.abs(Math.sin(s*2.6+i*.7))*1.4;b.scale.y=h;b.position.y=h/2});
 if(fc%6===0&&state==="play")drawMap();
 renderer.render(sc, cam);
 spotifyWall.render();
}

requestAnimationFrame(loop);
}

}
