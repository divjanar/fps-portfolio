import {useEffect} from "react";
import {initMansion} from "./mansion";
import "./App.css";
export default function App(){
 useEffect(()=>{initMansion()},[]);
 return <>

<canvas id="c" aria-hidden="true" /><div id="gr"></div><div id="vg"></div><div id="fd"></div>
<div id="in">
  <h1>Divya Janarthanan</h1><p className="s">Engineer. Builder. Come in, it's late.</p>
  <p className="keys"><span><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> or arrows: walk</span><span>Drag: look around</span><span><kbd>E</kbd> or click: open</span><span><kbd>M</kbd>: map</span></p>
  <div className="row"><button className="btn" id="en">Enter the mansion</button><button className="btn g" id="bw">Browse without walking</button></div>
</div>
<div id="hud" hidden={true}><nav id="nav" aria-label="Rooms"></nav><div id="cx"></div><button id="pr" hidden={true}>Press <kbd>E</kbd> to open <b></b></button><div id="rl"></div><canvas id="mp" width={130} height={156} aria-hidden="true" /><button id="fw" hidden={true} aria-label="Walk forward">▲</button></div>
<div className="ov" id="br" hidden={true}><div style={{maxWidth:900,margin:"0 auto 24px"}}><h1 style={{fontSize:48}}>The Mansion, in plain view</h1><p style={{color:"var(--mut)"}}>Every room and object, without first-person controls.</p><div className="row" style={{justifyContent:"flex-start"}}><button className="btn" data-a="walk">Walk the mansion</button></div></div><div id="bl"></div></div>
<div className="ov" id="pn" hidden={true}><div className="card" role="dialog" aria-modal="true" aria-labelledby="pt"><button className="btn g x" id="px">Close ✕</button><p className="tag" id="pg"></p><h2 id="pt"></h2><div id="pb"></div></div></div>


 </>;
}
