/* Vorhersage, DWD-Warnungen, Sonne/Mond und Regenradar für Wincheringen-Mont. Wird von index.html und instrumente.html eingebunden. */
(function(){
"use strict";
var CSS="#warn,#outlook{--a-card:var(--surface,var(--panel,#fff));--a-card2:var(--surface2,var(--panel2,#eee));--a-ink:var(--ink,#111);--a-ink2:var(--ink2,var(--mute,#666));--a-mute:var(--mute,#777);--a-line:var(--line,rgba(128,128,128,.25));--a-rain:var(--c-rain,#7fb2ff);--a-sun:var(--c-sun,#e8c34a);--a-wind:var(--c-wind,#7fb2e8);--a-track:var(--track,rgba(128,128,128,.3));--a-warn:var(--warn,#d6a100);--a-serious:var(--serious,#e8883a);--a-crit:var(--crit,#e5655f);--a-ext:var(--ext,#a794d6);--a-disp:var(--disp,var(--font,system-ui,sans-serif));--a-body:var(--body,var(--font,system-ui,sans-serif))}\n#warn,#outlook{font-family:var(--a-body);color:var(--a-ink)}\n.ol .card{background:var(--a-card);border:1px solid var(--a-line);border-radius:16px;padding:16px 18px;min-width:0}\n.ol #ol-radar{height:340px;border-radius:12px;overflow:hidden;border:1px solid var(--a-line);background:var(--a-card2)}\n.ol .leaflet-container{font-family:var(--a-body)}\n/* Vorhersage, Warnungen, Sonne und Mond */\n#warn{margin-top:12px;display:grid;gap:10px}\n.wcard{background:var(--a-card);border:1px solid var(--a-line);border-left:6px solid var(--a-warn);border-radius:14px;padding:12px 14px}\n.wcard.s-moderate{border-left-color:var(--a-serious)}\n.wcard.s-severe{border-left-color:var(--a-crit)}\n.wcard.s-extreme{border-left-color:var(--a-ext)}\n.wcard b{display:block;font-size:15px}\n.wcard .when{font-size:13px;color:var(--a-ink2);margin-top:2px}\n.wcard details{margin-top:6px;font-size:14px;color:var(--a-ink2)}\n.wcard summary{cursor:pointer;font-weight:600;color:var(--a-wind)}\n.wcard p{margin:6px 0 0;line-height:1.45}\n.ol{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}\n.ol .full{grid-column:1/-1}\n@media (max-width:640px){.ol{grid-template-columns:1fr}}\n.ol h2{margin:0 0 10px;font-family:var(--a-disp);font-size:16px}\n.ol .chipok{display:inline-block;margin-left:8px;font:600 12px var(--a-body);padding:2px 9px;border-radius:999px;background:var(--a-card2);color:var(--a-ink2);vertical-align:middle}\n.hours{display:flex;gap:2px;overflow-x:auto;padding-bottom:8px;margin:0 -4px;-webkit-overflow-scrolling:touch}\n.hr{flex:0 0 54px;text-align:center;padding:6px 2px;border-radius:12px}\n.hr.now{background:var(--a-card2)}\n.hr .t{font-size:12px;color:var(--a-mute);font-weight:600}\n.hr .i{font-size:24px;line-height:1.3}\n.hr .d{font-family:var(--a-disp);font-weight:700;font-size:16px}\n.hr .p{font-size:11px;font-weight:700;color:var(--a-rain);min-height:14px}\n.days{display:grid;gap:2px;margin-top:6px}\n.day{display:grid;grid-template-columns:62px 30px 1fr;align-items:center;gap:8px;padding:7px 4px;border-top:1px solid var(--a-line)}\n.day:first-child{border-top:none}\n.day .n{font-weight:700;font-size:15px}\n.day .i{font-size:24px;text-align:center}\n.day .m{min-width:0}\n.day .x{font-size:12px;color:var(--a-ink2);display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap}\n.day .x .r{color:var(--a-rain);font-weight:700}\n.rng{display:grid;grid-template-columns:34px 1fr 34px;align-items:center;gap:8px;margin-top:3px;font-family:var(--a-disp);font-weight:700;font-size:14px}\n.rng span:first-child{text-align:right;color:var(--a-mute)}\n.rng .tr{position:relative;height:7px;border-radius:999px;background:var(--a-track)}\n.rng .bar{position:absolute;top:0;bottom:0;border-radius:999px;background:linear-gradient(90deg,var(--a-wind),var(--a-sun))}\n.sm{display:grid;grid-template-columns:auto 1fr;gap:4px 16px;align-items:center}\n.sm .big{font-size:44px;line-height:1;grid-row:span 3}\n.sm div{font-size:14px;color:var(--a-ink2)}\n.sm b{color:var(--a-ink);font-family:var(--a-disp)}\n.olnote{font-size:12px;color:var(--a-mute);margin-top:4px}\n";
var st=document.createElement("style");st.textContent=CSS+".rctl{display:flex;align-items:center;gap:10px;margin-top:8px}\n.rctl button{flex:none;width:40px;height:36px;border-radius:10px;border:1px solid var(--a-line);background:var(--a-card2);color:var(--a-ink);font-size:16px;cursor:pointer}\n.rctl input{flex:1;min-width:0}\n.rctl span{flex:none;min-width:84px;text-align:right;font-weight:700;font-size:14px}\n.rmode{display:flex;gap:6px;margin:0 0 10px}\n.rmode button{padding:7px 13px;border-radius:999px;border:1px solid var(--a-line);background:var(--a-card2);color:var(--a-ink);font:600 13px var(--a-body);cursor:pointer}\n.rmode button.on{background:var(--a-wind);border-color:transparent;color:#fff}\n.rmode{flex-wrap:wrap}\n.rmode select{flex:1;min-width:180px;max-width:100%;padding:7px 10px;border-radius:10px;border:1px solid var(--a-line);background:var(--a-card2);color:var(--a-ink);font:600 13px var(--a-body)}";document.head.appendChild(st);
var app=document.getElementById("app");
if(!document.getElementById("warn")){var w=document.createElement("div");w.id="warn";(app&&app.parentNode?app.parentNode.insertBefore(w,app):document.body.appendChild(w));}
if(!document.getElementById("outlook")){var o=document.createElement("div");o.id="outlook";(app&&app.parentNode?app.parentNode.insertBefore(o,app.nextSibling):document.body.appendChild(o));}
var LAT=49.61, LON=6.40, TZ="Europe/Berlin";   // Wincheringen
function $(id){return document.getElementById(id)}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function r(v){return Math.round(v)}
var WMO={0:["☀️","Klar"],1:["🌤️","Überwiegend klar"],2:["⛅","Wechselnd bewölkt"],3:["☁️","Bedeckt"],45:["🌫️","Nebel"],48:["🌫️","Reifnebel"],
 51:["🌦️","Leichter Niesel"],53:["🌦️","Nieselregen"],55:["🌧️","Starker Niesel"],56:["🌧️","Gefrierender Niesel"],57:["🌧️","Gefrierender Niesel"],
 61:["🌦️","Leichter Regen"],63:["🌧️","Regen"],65:["🌧️","Starker Regen"],66:["🌧️","Gefrierender Regen"],67:["🌧️","Gefrierender Regen"],
 71:["🌨️","Leichter Schneefall"],73:["🌨️","Schneefall"],75:["❄️","Starker Schneefall"],77:["🌨️","Schneegriesel"],
 80:["🌦️","Leichte Schauer"],81:["🌧️","Schauer"],82:["🌧️","Starke Schauer"],85:["🌨️","Schneeschauer"],86:["🌨️","Starke Schneeschauer"],
 95:["⛈️","Gewitter"],96:["⛈️","Gewitter mit Hagel"],99:["⛈️","Gewitter mit Hagel"]};
function wmo(c,day){var w=WMO[c]||["❔","–"]; if(day===0&&(c===0||c===1)) return ["🌙",c===0?"Klar":"Überwiegend klar"]; return w}
function nowLocal(){return new Date().toLocaleString("sv-SE",{timeZone:TZ}).replace(" ","T")}  // 2026-10-12T09:08:00
var WD=["So","Mo","Di","Mi","Do","Fr","Sa"];
function hm(iso){return iso.slice(11,16)}

/* ---------- Sonne und Mond ---------- */
function moon(){
  var days=(Date.now()-Date.UTC(2000,0,6,18,14))/86400000, syn=29.530588853;
  var ph=((days/syn)%1+1)%1;
  var icons=["🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘"];
  var idx= ph<0.03||ph>0.97?0: ph<0.22?1: ph<0.28?2: ph<0.47?3: ph<0.53?4: ph<0.72?5: ph<0.78?6:7;
  var names=["Neumond","Zunehmende Sichel","Erstes Viertel","Zunehmender Mond","Vollmond","Abnehmender Mond","Letztes Viertel","Abnehmende Sichel"];
  return {icon:icons[idx], name:names[idx], lit:Math.round((1-Math.cos(2*Math.PI*ph))/2*100)};
}
function sunCard(d){
  var m=moon(), s="";
  if(d&&d.sunrise){
    var secs=+(d.daylight_duration&&d.daylight_duration[0]);
    if(!isFinite(secs)||secs<=0) secs=(new Date(d.sunset[0])-new Date(d.sunrise[0]))/1000;
    var tot=Math.round(secs/60), h=Math.floor(tot/60), mi=tot%60;
    s+='<section class="card"><h2>Sonne</h2><div class="sm"><div class="big">🌅</div>'+
      '<div>Aufgang <b>'+hm(d.sunrise[0])+' Uhr</b></div><div>Untergang <b>'+hm(d.sunset[0])+' Uhr</b></div>'+
      '<div>Tageslänge <b>'+h+' h '+mi+' min</b></div></div></section>';
  }
  s+='<section class="card"><h2>Mond</h2><div class="sm"><div class="big">'+m.icon+'</div><div><b>'+m.name+'</b></div><div>'+m.lit+' % beleuchtet</div></div></section>';
  return s;
}

/* ---------- Vorhersage (Open-Meteo) ---------- */
var fcHtml="", sunHtml=sunCard(null), warnOk=null;
function renderOutlook(){
  var chip= warnOk===true ? '<span class="chipok">Keine DWD-Warnungen</span>' : '';
  var root=$("outlook");
  if(!$("ol-main")){
    root.innerHTML='<div class="ol"><div id="ol-main" class="full" style="display:contents"></div>'+
      '<section class="card full"><h2>Radar und Wolken</h2><div class="rmode" role="group" aria-label="Kartenansicht"><button type="button" data-m="radar" class="on">Regenradar</button><button type="button" data-m="sat">Wolken (Satellit)</button><select id="rsat" hidden aria-label="Satellitenbild wählen"></select></div><div id="ol-radar" aria-label="Wetterkarte"></div><div class="rctl" id="rctl" hidden><button id="rplay" type="button" aria-label="Animation starten oder anhalten">⏸</button><input id="rslide" type="range" min="0" max="0" value="0" aria-label="Zeitpunkt wählen"><span id="rtime" class="tn"></span></div><div class="olnote" id="rinfo">Niederschlagsradar des Deutschen Wetterdienstes, letzte Stunde · Karte: OpenStreetMap</div></section><div id="ol-sun" style="display:contents"></div></div>';
    initRadar();
  }
  $("ol-main").innerHTML=(fcHtml?fcHtml.replace("%CHIP%",chip):"");
  $("ol-sun").innerHTML=sunHtml;
}
/* ---------- Regenradar und Wolken (DWD-WMS auf Leaflet, animiert) ---------- */
var WMS_URL="https://maps.dwd.de/geoserver/dwd/wms";
var CAPS_RADAR="https://maps.dwd.de/geoserver/dwd/Niederschlagsradar/wms?service=WMS&version=1.3.0&request=GetCapabilities";
var CAPS_ALL=WMS_URL+"?service=WMS&version=1.3.0&request=GetCapabilities";
var rMode="radar", rLayerName="dwd:Niederschlagsradar", rOpacity=0.75, satPick=null;
var radarMap=null, rLayers=[], rTimes=[], rIdx=0, rTimer=null, rPlaying=false, rStatic=null, rReq=0;
var REDUCED=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function parseTimes(txt,n){
  var toks=txt.trim().split(/\s*,\s*/), last=toks[toks.length-1], out=[];
  if(last.indexOf("/")>0){
    var p=last.split("/"), end=new Date(p[1]).getTime(), m=/PT(?:(\d+)H)?(?:(\d+)M)?/.exec(p[2]||"PT5M")||[], step=(((+m[1]||0)*60)+(+m[2]||0))*60000||300000;
    for(var i=n-1;i>=0;i--) out.push(new Date(end-i*step));
  } else { toks.slice(-n).forEach(function(t){ out.push(new Date(t)); }); }
  var oldest=Date.now()-24*3600*1000;
  return out.filter(function(d){return !isNaN(d.getTime())&&d.getTime()>=oldest});   // höchstens die letzten 24 Stunden
}
function kid(el,tag){ for(var c=el.firstElementChild;c;c=c.nextElementSibling){ if(c.localName===tag) return c; } return null; }
function timeDim(layer){ for(var c=layer.firstElementChild;c;c=c.nextElementSibling){ if(c.localName==="Dimension"&&(c.getAttribute("name")||"").toLowerCase()==="time") return c; } return null; }
function getXml(u){ return fetch(u).then(function(r){ if(!r.ok) throw new Error(r.status); return r.text(); }).then(function(t){ return new DOMParser().parseFromString(t,"text/xml"); }); }

function fetchRadarTimes(){
  return getXml(CAPS_RADAR).then(function(doc){
    var dims=doc.getElementsByTagName("Dimension");
    for(var i=0;i<dims.length;i++){ if((dims[i].getAttribute("name")||"").toLowerCase()==="time") return parseTimes(dims[i].textContent,12); }
    return [];
  });
}
// Satellitenebenen automatisch im DWD-Angebot suchen (Namen werden nicht fest vorgegeben)
var satList=null, satAt=0;
function satScore(low){ return (/hrv/.test(low)?4:0)+(/1km/.test(low)?3:0)+(/rgb/.test(low)?1:0)+(/natural/.test(low)?1:0)+(/_3h$/.test(low)?0.5:0); }
function listSat(doc){
  var bad=/(cloud_?type|cloud_?mask|ctth?|cma|fire|dust|ash|volcan|snow|sst|sea|legend|mask)/, out=[], all=doc.getElementsByTagName("Layer");
  for(var i=0;i<all.length;i++){
    var nm=kid(all[i],"Name"), dim=timeDim(all[i]); if(!nm||!dim) continue;
    var name=nm.textContent.trim(), low=name.toLowerCase(); if(low.indexOf("satellite")<0||bad.test(low)) continue;
    var tt=kid(all[i],"Title");
    out.push({name:name,title:tt?tt.textContent.trim():name,dim:dim.textContent,score:satScore(low)});
  }
  out.sort(function(a,b){ return b.score-a.score||a.title.localeCompare(b.title); });
  return out;
}
function fillSel(){
  var sel=$("rsat"); if(!sel||!satList) return;
  sel.innerHTML=satList.map(function(x){ return '<option value="'+esc(x.name)+'"'+(satPick&&x.name===satPick.name?' selected':'')+'>'+esc(x.title)+' ('+esc(x.name.replace(/^dwd:Satellite_?/i,""))+')</option>'; }).join("");
  sel.hidden=(rMode!=="sat")||satList.length<2;
}
function layerCapsUrl(name){ return "https://maps.dwd.de/geoserver/dwd/"+name.replace(/^dwd:/,"")+"/wms?service=WMS&version=1.3.0&request=GetCapabilities"; }
// Die große Gesamtliste wird nur selten geladen und einen Tag lang im Browser gemerkt.
function loadSatList(){
  try{
    var c=JSON.parse(localStorage.getItem("sat_list")||"null");
    if(c&&c.list&&c.list.length&&Date.now()-c.at<24*3600*1000) return Promise.resolve(c.list);
  }catch(e){}
  return getXml(CAPS_ALL).then(function(doc){
    var l=listSat(doc); if(!l.length) throw new Error("keine Satellitenebene");
    var now=Date.now(); l.forEach(function(x){ x.at=now; });
    try{ localStorage.setItem("sat_list",JSON.stringify({at:now,list:l.map(function(x){ return {name:x.name,title:x.title,score:x.score}; })})); }catch(e){}
    return l;
  });
}
function satTimesFor(p){
  if(p.dim&&Date.now()-(p.at||0)<4*60*1000) return Promise.resolve(parseTimes(p.dim,12));
  return getXml(layerCapsUrl(p.name)).then(function(doc){
    var dims=doc.getElementsByTagName("Dimension");
    for(var i=0;i<dims.length;i++){ if((dims[i].getAttribute("name")||"").toLowerCase()==="time") return parseTimes(dims[i].textContent,12); }
    throw new Error("keine Zeitangabe");
  }).catch(function(){   // Notlösung: Gesamtliste
    return getXml(CAPS_ALL).then(function(doc){
      var q=listSat(doc).filter(function(x){ return x.name===p.name; })[0]; if(!q) throw new Error("Ebene nicht gefunden");
      return parseTimes(q.dim,12);
    });
  });
}
function fetchSatTimes(){
  return loadSatList().then(function(list){
    satList=list;
    var want=null; try{ want=localStorage.getItem("sat_layer"); }catch(e){}
    var p=list.filter(function(x){ return x.name===want; })[0]||list[0];
    satPick=p; rLayerName=p.name; fillSel();
    return satTimesFor(p);
  });
}
function rShow(i){
  rIdx=i;
  rLayers.forEach(function(l,k){ l.setOpacity(k===i?rOpacity:0); });
  var sl=$("rslide"); if(sl) sl.value=i;
  var tl=$("rtime"); if(tl&&rTimes[i]) tl.textContent=rTimes[i].toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit",timeZone:TZ})+" Uhr";
}
function rStop(){ rPlaying=false; clearTimeout(rTimer); var b=$("rplay"); if(b) b.textContent="▶"; }
function rPlay(){
  rPlaying=true; var b=$("rplay"); if(b) b.textContent="⏸";
  (function step(){
    if(!rPlaying) return;
    var next=(rIdx+1)%rLayers.length;
    rShow(next);
    rTimer=setTimeout(step,next===rLayers.length-1?1800:450);
  })();
}
function wmsOpts(extra){
  var o={layers:rLayerName,format:"image/png",transparent:true,version:"1.3.0",opacity:rOpacity,interpolations:rMode==="sat"?"bilinear":"nearest neighbor",attribution:rMode==="sat"?"Satellit: DWD/EUMETSAT":"Radar: DWD"};
  for(var k in extra) o[k]=extra[k]; return o;
}
function clearLayers(){
  rLayers.forEach(function(l){ radarMap.removeLayer(l); }); rLayers=[];
  if(rStatic){ radarMap.removeLayer(rStatic); rStatic=null; }
}
function buildFrames(times){
  var was=rPlaying; rStop(); clearLayers();
  if(times.length<2){   // keine Zeitreihe verfügbar: aktuelles Bild
    rStatic=L.tileLayer.wms(WMS_URL,wmsOpts({})).addTo(radarMap);
    $("rctl").hidden=true; return;
  }
  rTimes=times;
  times.forEach(function(d){ rLayers.push(L.tileLayer.wms(WMS_URL,wmsOpts({time:d.toISOString(),opacity:0})).addTo(radarMap)); });
  $("rslide").max=times.length-1; $("rctl").hidden=false;
  rShow(times.length-1);
  if(was||(!REDUCED&&!radarMap._userStopped)) rPlay();
}
function info(){
  var e=$("rinfo"); if(!e) return;
  e.textContent= rMode==="sat"
    ? "Satellitenbild"+(satPick?" ("+satPick.title+")":"")+" des Deutschen Wetterdienstes, aktualisiert sich alle paar Minuten · Karte: OpenStreetMap"
    : "Niederschlagsradar des Deutschen Wetterdienstes, letzte Stunde, aktualisiert sich alle 5 Minuten · Karte: OpenStreetMap";
}
function refreshRadar(){
  var my=++rReq, sat=rMode==="sat";
  (sat?fetchSatTimes():fetchRadarTimes()).then(function(t){ if(my===rReq){ buildFrames(t); info(); } })
  .catch(function(){
    if(my!==rReq) return;
    if(sat){ clearLayers(); rStop(); $("rctl").hidden=true; var e=$("rinfo"); if(e) e.textContent="Das Satellitenbild ist gerade nicht verfügbar. Bitte später erneut versuchen oder auf „Regenradar“ wechseln."; }
    else if(!rLayers.length&&!rStatic) buildFrames([]);
  });
}
function setMode(m){
  if(m===rMode) return;
  rMode=m; rStop(); clearLayers(); $("rctl").hidden=true;
  rLayerName= m==="sat" ? (satPick?satPick.name:"") : "dwd:Niederschlagsradar";
  rOpacity= m==="sat" ? 0.9 : 0.75;
  var bs=document.querySelectorAll(".rmode button"); for(var i=0;i<bs.length;i++) bs[i].className= bs[i].getAttribute("data-m")===m?"on":"";
  var e=$("rinfo"); if(e) e.textContent="Lädt …";
  var sel=$("rsat"); if(sel) sel.hidden=true;
  radarMap._userStopped=false;
  refreshRadar();
}
function initRadar(){
  function go(){
    if(!window.L||!$("ol-radar")) return;
    radarMap=L.map("ol-radar",{scrollWheelZoom:false,zoomControl:true}).setView([LAT,LON],8);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:12,attribution:"© OpenStreetMap"}).addTo(radarMap);
    L.circleMarker([LAT,LON],{radius:6,color:"#fff",weight:2,fillColor:"#d03b3b",fillOpacity:1}).addTo(radarMap).bindTooltip("Wincheringen-Mont");
    $("rplay").addEventListener("click",function(){ if(rPlaying){ radarMap._userStopped=true; rStop(); } else { radarMap._userStopped=false; rPlay(); } });
    $("rslide").addEventListener("input",function(){ radarMap._userStopped=true; rStop(); rShow(+this.value); });
    var bs=document.querySelectorAll(".rmode button"); for(var i=0;i<bs.length;i++) bs[i].addEventListener("click",function(){ setMode(this.getAttribute("data-m")); });
    $("rsat").addEventListener("change",function(){ try{ localStorage.setItem("sat_layer",this.value); }catch(e){} radarMap._userStopped=false; refreshRadar(); });
    refreshRadar();
    setInterval(function(){ if(!document.hidden) refreshRadar(); },5*60*1000);
  }
  if(window.L){ go(); return; }
  var l=document.createElement("link");l.rel="stylesheet";l.href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";document.head.appendChild(l);
  var sc=document.createElement("script");sc.src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";sc.onload=go;
  sc.onerror=function(){ var e=$("ol-radar"); if(e) e.innerHTML='<div class="olnote" style="padding:16px">Die Karte konnte nicht geladen werden.</div>'; };
  document.head.appendChild(sc);
}
/* ---------- Vorhersage im Stil einer Wetter-App (Open-Meteo) ---------- */
var FCCSS=`
#outlook{--tl:38%}
@media (prefers-color-scheme:dark){#outlook{--tl:66%}}
.fc .ptabs{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin:4px 0 0}
.fc .ptab{font:inherit;color:var(--a-ink);background:transparent;border:0;border-radius:14px;padding:8px 2px 8px;display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;min-width:0}
.fc .ptab.on{background:var(--a-card2)}
.fc .ptab:focus-visible,.fc .dtab:focus-visible,.fc summary:focus-visible{outline:3px solid var(--a-sun);outline-offset:2px}
.fc .pn{font-size:13px;font-weight:600;color:var(--a-ink2)}
.fc .ptab.on .pn{color:var(--a-ink)}
.fc .pt{font-family:var(--a-disp);font-weight:800;font-size:clamp(26px,7.5vw,36px);line-height:1.05}
.fc .pi{font-size:32px;line-height:1.2}
.fc .pw{height:18px;color:var(--a-ink2);display:flex;align-items:center}
.fc .pp{display:inline-flex;align-items:center;gap:3px;font-size:13px;font-weight:700;color:var(--a-rain)}
.fc .pp svg{width:13px;height:13px}
.fc .dh{display:flex;align-items:center;gap:10px;margin:16px 0 12px;font-family:var(--a-disp);font-size:15px;font-weight:700;color:var(--a-wind)}
.fc .dh::after{content:"";flex:1;height:2px;background:var(--a-sun);opacity:.85;border-radius:2px}
.fc .dg{display:grid;grid-template-columns:1fr 1fr;gap:14px 12px}
.fc .it{display:flex;align-items:center;gap:10px;min-width:0;font-size:14px;line-height:1.25;color:var(--a-ink)}
.fc .it>div{min-width:0}
.fc .it small{display:block;color:var(--a-ink2);font-size:13px;margin-top:1px}
.fc .cr{flex:none;width:34px;height:34px;border-radius:50%;border:1.5px solid var(--a-wind);color:var(--a-wind);display:flex;align-items:center;justify-content:center}
.fc .dtabs{display:flex;overflow-x:auto;margin:20px -4px 0;border-top:2px solid var(--a-wind);scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch}
.fc .dtab{flex:0 0 clamp(82px,23%,130px);scroll-snap-align:start;font:inherit;color:var(--a-ink);background:transparent;border:0;padding:0;cursor:pointer;display:flex;flex-direction:column;text-align:center}
.fc .dth{padding:6px 2px;font-size:13px;font-weight:600;line-height:1.25;color:var(--a-ink2)}
.fc .dth b{display:block;font-size:14px;color:var(--a-ink)}
.fc .dtab.on .dth{background:var(--a-wind);color:rgba(255,255,255,.88)}
.fc .dtab.on .dth b{color:#fff}
.fc .dbd{flex:1;padding:8px 2px 10px;display:flex;flex-direction:column;align-items:center;gap:4px}
.fc .dtab.on .dbd{background:var(--a-card2)}
.fc .hi{font-family:var(--a-disp);font-weight:800;font-size:28px;line-height:1}
.fc .lo{font-family:var(--a-disp);font-weight:700;font-size:21px;line-height:1.1}
.fc .di{font-size:34px;line-height:1.2}
.fc .dw{height:18px;color:var(--a-ink2);display:flex;align-items:center}
.fc .dm{display:inline-flex;align-items:center;gap:4px;font-size:13px;font-weight:600;color:var(--a-ink2);min-height:18px}
.fc .dm svg{width:14px;height:14px}
.fc .dm.rn{color:var(--a-rain);font-weight:700}
.fc .ddet{padding-top:2px}
@media (max-width:420px){.fc .cr{width:30px;height:30px}.fc .cr svg{width:19px;height:19px}.fc .it{gap:8px;font-size:13.5px}.fc .dg{gap:12px 8px}}
.fc .dtx{margin:16px 0 0;font-size:15px;line-height:1.5;color:var(--a-ink)}
.fc details.hourly{margin-top:16px;border-top:1px solid var(--a-line);padding-top:10px}
.fc details.hourly summary{cursor:pointer;font-weight:600;font-size:13px;color:var(--a-ink2)}
.fc details.hourly .hours{margin-top:8px}
`;
var st2=document.createElement("style");st2.textContent=FCCSS;document.head.appendChild(st2);

var FC=null, selP=0, selD=0, lastFc=0;
var DAYN=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
var PARTS=[{n:"Nacht",a:0,b:6},{n:"Vormittag",a:6,b:12},{n:"Nachmittag",a:12,b:18},{n:"Abend",a:18,b:24}];
var SNOWC={71:1,73:1,75:1,77:1,85:1,86:1};
var IC={
  gauge:'<path d="M4 17a8 8 0 1 1 16 0"/><path d="M12 17l4-5"/>',
  wind:'<path d="M3 9h11a3 3 0 1 0-3-3"/><path d="M3 15h15a3 3 0 1 1-3 3"/><path d="M3 12h8"/>',
  gust:'<path d="M4 13l4-7 4 9 4-9 4 7"/>',
  drop:'<path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z"/>',
  cloud:'<path d="M7 18a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 9.5a4.2 4.2 0 0 1 0 8.5z"/>',
  hum:'<path d="M5 9c2-2 4 2 7 0s5 2 7 0"/><path d="M5 15c2-2 4 2 7 0s5 2 7 0"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6L7 7M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/>',
  uv:'<circle cx="12" cy="13" r="3.5"/><path d="M12 4v2.5M4.5 13H7M17 13h2.5M6.5 7.5L8 9M17.5 7.5L16 9M8 20h8"/>',
  rise:'<path d="M3 19h18M6 19a6 6 0 0 1 12 0M12 5v6M9 8l3-3 3 3"/>'
};
function svg(n,sz){return '<svg viewBox="0 0 24 24" width="'+sz+'" height="'+sz+'" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC[n]+'</svg>'}
function ico(n){return '<span class="cr">'+svg(n,22)+'</span>'}
function arrow(dir,sz){return '<svg width="'+sz+'" height="'+sz+'" viewBox="0 0 24 24" style="transform:rotate('+Math.round(dir+180)+'deg)" aria-hidden="true"><path d="M12 3l7 17-7-4-7 4z" fill="currentColor"/></svg>'}
function item(icon,main,sub){return '<div class="it">'+icon+'<div>'+main+(sub?'<small>'+sub+'</small>':'')+'</div></div>'}

function sum(a){return a.reduce(function(x,y){return x+(+y||0)},0)}
function vals(a){return a.filter(function(x){return x!=null})}
function mean(a){var v=vals(a);return v.length?sum(v)/v.length:0}
function maxOf(a){var v=vals(a);return v.length?Math.max.apply(null,v):0}
function minOf(a){var v=vals(a);return v.length?Math.min.apply(null,v):0}
function num1(v){return String(Math.round(v*10)/10).replace(".",",")}
function lc(s){return s.charAt(0).toLowerCase()+s.slice(1)}
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
function addDay(d,n){var t=new Date(d+"T12:00:00Z");t.setUTCDate(t.getUTCDate()+n);return t.toISOString().slice(0,10)}
function joinDe(a){return a.length<2?a.join(""):a.slice(0,-1).join(", ")+" und "+a[a.length-1]}

var TP=[[-10,225],[0,200],[8,150],[14,120],[17,85],[20,38],[24,12],[32,0]];
function tcol(t){
  var hu=TP[TP.length-1][1];
  if(t<=TP[0][0]) hu=TP[0][1];
  else if(t<TP[TP.length-1][0]){
    for(var i=1;i<TP.length;i++){ if(t<=TP[i][0]){ var p=TP[i-1],q=TP[i]; hu=p[1]+(q[1]-p[1])*(t-p[0])/(q[0]-p[0]); break; } }
  }
  return "hsl("+Math.round(hu)+" 76% var(--tl))";
}
function compass(d){return ["N","NO","O","SO","S","SW","W","NW"][Math.round((((d%360)+360)%360)/45)%8]}
function windWord(k){return k<13?"schwacher Wind":k<30?"mäßiger Wind":k<50?"frischer Wind":k<75?"starker Wind":k<100?"stürmischer Wind":"Sturm"}
function windTxt(ws,dir){return ws<5?"kaum Wind":windWord(ws)+" aus "+compass(dir)+" ("+r(ws)+" km/h)"}
function dirMean(ds,ws){var x=0,y=0;ds.forEach(function(d,i){var w=(ws[i]||0)+0.1,a=d*Math.PI/180;x+=w*Math.sin(a);y+=w*Math.cos(a)});return (Math.atan2(x,y)*180/Math.PI+360)%360}
function skyWord(cc,day){return cc<15?(day?"sonnig":"klar"):cc<40?"heiter":cc<65?"wechselnd bewölkt":cc<88?"meist bewölkt":"bedeckt"}
function uvWord(u){return u<3?"niedrig":u<6?"mäßig":u<8?"hoch":u<11?"sehr hoch":"extrem"}

function idxFor(date,a,b){
  var h=FC.h,out=[];
  for(var i=0;i<h.time.length;i++){
    if(h.time[i].slice(0,10)!==date) continue;
    var hh=+h.time[i].slice(11,13);
    if(hh>=a&&hh<b) out.push(i);
  }
  return out;
}
function repCode(ix){
  var h=FC.h,best=-1,bp=0;
  ix.forEach(function(i){var p=h.precipitation[i]; if(p>bp){bp=p;best=i}});
  if(best>=0&&bp>=0.2) return h.weather_code[best];
  var cnt={},bc=0,bk=0;
  ix.forEach(function(i){var c=h.weather_code[i];cnt[c]=(cnt[c]||0)+1;if(cnt[c]>bc){bc=cnt[c];bk=c}});
  return +bk;
}
function agg(ix){
  var h=FC.h;
  function col(k){return ix.map(function(i){return h[k][i]})}
  var ws=col("wind_speed_10m");
  return {
    t:mean(col("temperature_2m")), pop:maxOf(col("precipitation_probability")), mm:sum(col("precipitation")),
    code:repCode(ix), day:mean(col("is_day"))>=0.5?1:0,
    ws:mean(ws), dir:dirMean(col("wind_direction_10m"),ws), gust:maxOf(col("wind_gusts_10m")),
    rh:mean(col("relative_humidity_2m")), dew:mean(col("dew_point_2m")), pres:mean(col("pressure_msl")), cc:mean(col("cloud_cover"))
  };
}
function periods(){
  var now=FC.now, d0=now.slice(0,10), H=+now.slice(11,13), p0=0, out=[];
  for(var q=0;q<4;q++){ if(H>=PARTS[q].a&&H<PARTS[q].b) p0=q; }
  for(var j=0;j<4;j++){
    var q2=(p0+j)%4, date=(p0+j)>=4?addDay(d0,1):d0;
    var ix=idxFor(date,PARTS[q2].a,PARTS[q2].b);
    if(j===0) ix=ix.filter(function(i){return i>=FC.i0});
    if(ix.length){ var a=agg(ix); a.name=PARTS[q2].n; out.push(a); }
  }
  return out;
}

function rainInfo(ix){
  var h=FC.h, wet=ix.filter(function(i){return h.precipitation[i]>=0.1});
  return {pop:maxOf(ix.map(function(i){return h.precipitation_probability[i]})), hrs:wet.length, mm:sum(ix.map(function(i){return h.precipitation[i]}))};
}
function rainTxt(ri){
  var p=r(ri.pop)+" %";
  if(ri.mm<0.1) return p+" | trocken";
  return p+" | "+ri.hrs+" h | "+(ri.mm<1?"0–1":num1(ri.mm))+" L/m²";
}
function precipKind(ix){
  var h=FC.h,snow=0,driz=0,rain=0;
  ix.forEach(function(i){ if(h.precipitation[i]<0.1) return; var c=h.weather_code[i]; if(SNOWC[c]) snow++; else if(c>=51&&c<=57) driz++; else rain++; });
  if(snow>0&&snow>=rain&&snow>=driz) return "Schneefall";
  return driz>rain?"Niesel":"Regen";
}
function partList(ix){
  var h=FC.h,seen=[0,0,0,0],names=["nachts","vormittags","nachmittags","abends"],out=[];
  ix.forEach(function(i){ if(h.precipitation[i]>=0.1) seen[Math.floor(+h.time[i].slice(11,13)/6)]=1; });
  [1,2,3,0].forEach(function(q){ if(seen[q]) out.push(names[q]); });
  return out;
}

function daySentence(k,rainIx,a){
  var h=FC.h, d=FC.d, dow=new Date(d.time[k]+"T12:00:00").getDay(), H=+FC.now.slice(11,13), s=[];
  s.push((k===0?"Heute":k===1?"Morgen":"Am "+DAYN[dow])+" ist es "+skyWord(a.cc,a.day||1)+".");
  var wet=rainIx.filter(function(i){return h.precipitation[i]>=0.1});
  if(!wet.length) s.push("Es bleibt trocken.");
  else{
    var mx=maxOf(wet.map(function(i){return h.precipitation[i]})), parts=partList(rainIx);
    var freq=wet.length<=3?"gelegentlich":wet.length<=8?"zeitweise":"häufig";
    var kind=precipKind(rainIx), what=kind==="Schneefall"?"Schneefall":intens(mx)+" "+kind;
    var when=parts.length>=4?"Ganztägig":cap(joinDe(parts));
    s.push(when+(kind==="Schneefall"?" gibt es ":" fällt ")+freq+" "+what+".");
  }
  if(k===0){
    var T0=h.temperature_2m[FC.i0], today=idxFor(d.time[0],0,24).filter(function(i){return i>=FC.i0});
    var top=maxOf(today.map(function(i){return h.temperature_2m[i]}));
    var next=minOf(h.temperature_2m.slice(FC.i0,FC.i0+15));
    if(H<=13&&top>T0+1.5) s.push("Die Temperatur beträgt aktuell "+r(T0)+" Grad und steigt bis zum Nachmittag auf bis zu "+r(top)+" Grad.");
    else if(next<T0-1.5) s.push("Die Temperatur beträgt aktuell "+r(T0)+" Grad und geht "+(H>=15?"in der Nacht ":"")+"auf rund "+r(next)+" Grad zurück.");
    else s.push("Die Temperatur beträgt aktuell "+r(T0)+" Grad.");
  } else {
    s.push("Die Temperaturen liegen zwischen "+r(d.temperature_2m_min[k])+" und "+r(d.temperature_2m_max[k])+" Grad.");
  }
  var g=d.wind_gusts_10m_max[k];
  if(g>=75) s.push("Dazu gibt es Sturmböen bis zu "+r(g)+" km/h.");
  else if(g>=50) s.push("Dazu weht der Wind in starken Böen bis zu "+r(g)+" km/h.");
  return s.join(" ");
}
function intens(mx){return mx<0.5?"leichter":mx<2.5?"mäßiger":"kräftiger"}

function dayDetail(k){
  var d=FC.d, date=d.time[k], i0=FC.i0;
  function keep(ix){return k===0?ix.filter(function(i){return i>=i0}):ix}
  var all=keep(idxFor(date,0,24)); if(!all.length) all=idxFor(date,0,24);
  var dayIx=keep(idxFor(date,6,21)), night=keep(idxFor(date,21,24).concat(idxFor(addDay(date,1),0,6)));
  var a=agg(dayIx.length?dayIx:all);
  var nextNight=idxFor(addDay(date,1),0,6);
  var rainIx=k===0?keep(idxFor(date,0,24)).concat(nextNight):idxFor(date,6,24).concat(nextNight);
  var code=d.weather_code[k], dow=new Date(date+"T12:00:00").getDay();
  var lab=(code>=51&&d.precipitation_probability_max[k]>=40&&d.precipitation_sum[k]>=0.5)?lc(wmo(code,1)[1]):(code===45||code===48)?"neblig":skyWord(a.cc,a.day||1);
  var nm=k===0?"heute":k===1?"morgen":DAYN[dow];
  var uv=d.uv_index_max?d.uv_index_max[k]:null;
  var ss=d.sunshine_duration?Math.round(d.sunshine_duration[k]/3600):null;
  var html='<h3 class="dh">'+nm+' — '+esc(lab)+'</h3><div class="dg">'+
    item(ico("drop"),"tagsüber",esc(rainTxt(rainInfo(dayIx.length?dayIx:all))))+
    item(ico("drop"),"spät abends / nachts",esc(rainTxt(rainInfo(night))))+
    item(ico("rise"),"↑ "+hm(d.sunrise[k])+" ↓ "+hm(d.sunset[k]),ss!=null?"Sonnenschein "+ss+" h":"")+
    item('<span class="cr">'+arrow(a.dir,18)+'</span>',esc(windTxt(a.ws,a.dir)))+
    (uv!=null?item(ico("uv"),"UV-Index",r(uv)+" ("+uvWord(uv)+")"):"")+
    item(ico("gust"),"Böen","bis "+r(d.wind_gusts_10m_max[k])+" km/h")+
    '</div><p class="dtx">'+esc(daySentence(k,rainIx,a))+'</p>';
  return html;
}
function periodDetail(a){
  var w=wmo(a.code,a.day), lab=(a.mm>=0.3&&a.pop>=40)?lc(w[1]):skyWord(a.cc,a.day);
  var wet=a.pop>=10||a.mm>=0.1;
  return '<h3 class="dh">'+a.name+' — '+esc(lab)+'</h3><div class="dg">'+
    item(ico("drop"),"Niederschlag",wet?r(a.pop)+" %"+(a.mm>=0.1?" · "+num1(a.mm)+" mm":""):"trocken")+
    item(ico("cloud"),"Bewölkung",r(a.cc)+" %")+
    item('<span class="cr">'+arrow(a.dir,18)+'</span>',esc(windTxt(a.ws,a.dir)))+
    item(ico("gust"),"Böen","bis "+r(a.gust)+" km/h")+
    item(ico("gauge"),"Luftdruck",r(a.pres)+" hPa")+
    item(ico("hum"),"Luftfeuchte",r(a.rh)+" % · Taupunkt "+r(a.dew)+"°")+
    '</div>';
}

function fcRender(){
  if(!FC) return;
  var h=FC.h, d=FC.d, P=periods();
  if(selP>=P.length) selP=0;
  if(selD>=d.time.length) selD=0;
  var drop='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC.drop+'</svg>';

  var ptabs=P.map(function(a,i){
    var w=wmo(a.code,a.day);
    return '<button type="button" role="tab" class="ptab'+(i===selP?' on':'')+'" data-p="'+i+'" aria-selected="'+(i===selP)+'" title="'+esc(w[1])+'">'+
      '<span class="pn">'+a.name+'</span><span class="pt tn" style="color:'+tcol(a.t)+'">'+r(a.t)+'°</span><span class="pi">'+w[0]+'</span>'+
      '<span class="pw">'+(a.ws>=5?arrow(a.dir,18):'')+'</span><span class="pp">'+drop+r(a.pop)+' %</span></button>';
  }).join("");

  var dtabs=d.time.map(function(t,k){
    var dt=new Date(t+"T12:00:00"), w=wmo(d.weather_code[k],1), hi=d.temperature_2m_max[k], lo=d.temperature_2m_min[k];
    var nm=k===0?"heute":k===1?"morgen":DAYN[dt.getDay()];
    var date=t.slice(8,10)+"."+t.slice(5,7)+".";
    var ss=d.sunshine_duration?Math.round(d.sunshine_duration[k]/3600):null;
    var pr=d.precipitation_probability_max[k];
    return '<button type="button" role="tab" class="dtab'+(k===selD?' on':'')+'" data-d="'+k+'" aria-selected="'+(k===selD)+'" title="'+esc(w[1])+'">'+
      '<span class="dth"><b>'+nm+'</b>'+date+'</span><span class="dbd">'+
      '<span class="hi tn" style="color:'+tcol(hi)+'">'+r(hi)+'°</span><span class="lo tn" style="color:'+tcol(lo)+'">'+r(lo)+'°</span>'+
      '<span class="di">'+w[0]+'</span><span class="dw">'+(d.wind_direction_10m_dominant?arrow(d.wind_direction_10m_dominant[k],18):'')+'</span>'+
      '<span class="dm">'+(ss!=null?svg("sun",14)+ss+' h':'')+'</span><span class="dm rn">'+drop+r(pr)+' %</span></span></button>';
  }).join("");

  var hours="";
  for(var i=FC.i0;i<Math.min(FC.i0+24,h.time.length);i++){
    var w2=wmo(h.weather_code[i],h.is_day[i]), p=h.precipitation_probability[i];
    hours+='<div class="hr'+(i===FC.i0?' now':'')+'" title="'+esc(w2[1])+'"><div class="t">'+(i===FC.i0?'Jetzt':h.time[i].slice(11,13)+' Uhr')+'</div><div class="i">'+w2[0]+
      '</div><div class="d tn">'+r(h.temperature_2m[i])+'°</div><div class="p">'+(p>=10?p+' %':'')+'</div></div>';
  }

  fcHtml='<section class="card full fc"><h2>Vorhersage%CHIP%</h2>'+
    '<div class="ptabs" role="tablist" aria-label="Tagesabschnitte">'+ptabs+'</div>'+
    (P.length?periodDetail(P[selP]):'')+
    '<div class="dtabs" role="tablist" aria-label="Tage">'+dtabs+'</div>'+
    '<div class="ddet">'+dayDetail(selD)+'</div>'+
    '<details class="hourly"><summary>Stündlich, nächste 24 Stunden</summary><div class="hours">'+hours+'</div></details>'+
    '<div class="olnote">Modellvorhersage für Wincheringen · Open-Meteo · Warnungen: DWD über Brightsky</div></section>';

  var sc=document.querySelector("#outlook .dtabs"), left=sc?sc.scrollLeft:0;
  renderOutlook();
  sc=document.querySelector("#outlook .dtabs"); if(sc) sc.scrollLeft=left;
}

function buildForecast(j){
  var h=j.hourly, d=j.daily, now=nowLocal().slice(0,13)+":00";
  var i0=0; while(i0<h.time.length&&h.time[i0]<now) i0++;
  if(i0>=h.time.length) i0=h.time.length-1;
  FC={h:h,d:d,now:now,i0:i0};
  sunHtml=sunCard(d);
  fcRender();
}
function loadForecast(){
  var u="https://api.open-meteo.com/v1/forecast?latitude="+LAT+"&longitude="+LON+
   "&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,precipitation_probability,precipitation,weather_code,pressure_msl,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m,is_day"+
   "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_gusts_10m_max,wind_direction_10m_dominant,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max"+
   "&timezone="+encodeURIComponent(TZ)+"&forecast_days=7&wind_speed_unit=kmh";
  fetch(u).then(function(x){if(!x.ok)throw new Error(x.status);return x.json()}).then(function(j){lastFc=Date.now();buildForecast(j)})
   .catch(function(e){ if(!fcHtml){ fcHtml='<section class="card full"><h2>Vorhersage</h2><div class="olnote">Die Vorhersage ist gerade nicht verfügbar ('+esc(e&&e.message?e.message:e)+'). Neuer Versuch in wenigen Minuten.</div></section>'; renderOutlook(); } setTimeout(loadForecast,5*60*1000); });
}
$("outlook").addEventListener("click",function(e){
  var b=e.target.closest?e.target.closest("[data-p],[data-d]"):null;
  if(!b||!FC) return;
  if(b.hasAttribute("data-p")) selP=+b.getAttribute("data-p"); else selD=+b.getAttribute("data-d");
  fcRender();
});

/* ---------- Warnungen (DWD über Brightsky) ---------- */
var SEV={minor:"Wetterwarnung",moderate:"Markante Wetterwarnung",severe:"Unwetterwarnung",extreme:"Extreme Unwetterwarnung"};
function tfmt(iso){return new Date(iso).toLocaleString("de-DE",{weekday:"short",day:"numeric",month:"numeric",hour:"2-digit",minute:"2-digit",timeZone:TZ})}
function loadWarn(){
  fetch("https://api.brightsky.dev/alerts?lat="+LAT+"&lon="+LON+"&tz="+encodeURIComponent(TZ))
   .then(function(x){if(!x.ok)throw new Error(x.status);return x.json()}).then(function(j){
     var a=(j.alerts||[]).filter(function(x){return !x.expires||new Date(x.expires)>new Date()});
     warnOk=a.length===0;
     $("warn").innerHTML=a.map(function(x){
       var sev=x.severity||"minor", head=x.headline_de||x.event_de||"Wetterwarnung";
       return '<div class="wcard s-'+esc(sev)+'" role="alert"><b>⚠️ '+esc(head)+'</b><div class="when">'+esc(tfmt(x.onset))+' bis '+esc(x.expires?tfmt(x.expires):"auf Weiteres")+' · '+esc(SEV[sev]||"")+'</div>'+
         (x.description_de||x.instruction_de?'<details><summary>Details</summary><p>'+esc(x.description_de||"")+'</p>'+(x.instruction_de?'<p><b style="display:inline">Hinweis:</b> '+esc(x.instruction_de)+'</p>':'')+'</details>':'')+'</div>';
     }).join("");
     renderOutlook();
   }).catch(function(){ warnOk=null; renderOutlook(); });
}

try{ renderOutlook(); loadForecast(); loadWarn(); }
catch(e){ var box=$("outlook"); if(box) box.innerHTML='<div class="olnote" style="padding:12px">Vorhersage-Modul: Fehler beim Start ('+esc(e&&e.message?e.message:e)+')</div>'; }
setInterval(loadForecast,30*60*1000); setInterval(loadWarn,10*60*1000);
document.addEventListener("visibilitychange",function(){ if(!document.hidden){ loadWarn(); if(Date.now()-lastFc>10*60*1000) loadForecast(); } });
})();
