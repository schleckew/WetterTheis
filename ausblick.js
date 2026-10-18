/* Vorhersage, DWD-Warnungen, Sonne/Mond und Regenradar für Wincheringen-Mont. Wird von index.html und instrumente.html eingebunden. */
(function(){
"use strict";
var CSS="#warn,#outlook,#hourly{--a-card:var(--surface,var(--panel,#fff));--a-card2:var(--surface2,var(--panel2,#eee));--a-ink:var(--ink,#111);--a-ink2:var(--ink2,var(--mute,#666));--a-mute:var(--mute,#777);--a-line:var(--line,rgba(128,128,128,.25));--a-rain:var(--c-rain,#7fb2ff);--a-sun:var(--c-sun,#e8c34a);--a-wind:var(--c-wind,#7fb2e8);--a-track:var(--track,rgba(128,128,128,.3));--a-warn:var(--warn,#d6a100);--a-serious:var(--serious,#e8883a);--a-crit:var(--crit,#e5655f);--a-ext:var(--ext,#a794d6);--a-disp:var(--disp,var(--font,system-ui,sans-serif));--a-body:var(--body,var(--font,system-ui,sans-serif))}\n#warn,#outlook,#hourly{font-family:var(--a-body);color:var(--a-ink)}\n.ol .card{background:var(--a-card);border:1px solid var(--a-line);border-radius:16px;padding:16px 18px;min-width:0}\n.ol #ol-radar{height:340px;border-radius:12px;overflow:hidden;border:1px solid var(--a-line);background:var(--a-card2)}\n.ol .leaflet-container{font-family:var(--a-body)}\n/* Vorhersage, Warnungen, Sonne und Mond */\n#warn{margin-top:12px;display:grid;gap:10px}\n.wcard{background:var(--a-card);border:1px solid var(--a-line);border-left:6px solid var(--a-warn);border-radius:14px;padding:12px 14px}\n.wcard.s-moderate{border-left-color:var(--a-serious)}\n.wcard.s-severe{border-left-color:var(--a-crit)}\n.wcard.s-extreme{border-left-color:var(--a-ext)}\n.wcard b{display:block;font-size:15px}\n.wcard .when{font-size:13px;color:var(--a-ink2);margin-top:2px}\n.wcard details{margin-top:6px;font-size:14px;color:var(--a-ink2)}\n.wcard summary{cursor:pointer;font-weight:600;color:var(--a-wind)}\n.wcard p{margin:6px 0 0;line-height:1.45}\n.ol{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}\n.ol .full{grid-column:1/-1}\n@media (max-width:640px){.ol{grid-template-columns:1fr}}\n.ol h2{margin:0 0 10px;font-family:var(--a-disp);font-size:16px}\n.ol .chipok{display:inline-block;margin-left:8px;font:600 12px var(--a-body);padding:2px 9px;border-radius:999px;background:var(--a-card2);color:var(--a-ink2);vertical-align:middle}\n.hours{display:flex;gap:2px;overflow-x:auto;padding-bottom:8px;margin:0 -4px;-webkit-overflow-scrolling:touch}\n.hr{flex:0 0 54px;text-align:center;padding:6px 2px;border-radius:12px}\n.hr.now{background:var(--a-card2)}\n.hr .t{font-size:12px;color:var(--a-mute);font-weight:600}\n.hr .i{font-size:24px;line-height:1.3}\n.hr .d{font-family:var(--a-disp);font-weight:700;font-size:16px}\n.hr .p{font-size:11px;font-weight:700;color:var(--a-rain);min-height:14px}\n.days{display:grid;gap:2px;margin-top:6px}\n.day{display:grid;grid-template-columns:62px 30px 1fr;align-items:center;gap:8px;padding:7px 4px;border-top:1px solid var(--a-line)}\n.day:first-child{border-top:none}\n.day .n{font-weight:700;font-size:15px}\n.day .i{font-size:24px;text-align:center}\n.day .m{min-width:0}\n.day .x{font-size:12px;color:var(--a-ink2);display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap}\n.day .x .r{color:var(--a-rain);font-weight:700}\n.rng{display:grid;grid-template-columns:34px 1fr 34px;align-items:center;gap:8px;margin-top:3px;font-family:var(--a-disp);font-weight:700;font-size:14px}\n.rng span:first-child{text-align:right;color:var(--a-mute)}\n.rng .tr{position:relative;height:7px;border-radius:999px;background:var(--a-track)}\n.rng .bar{position:absolute;top:0;bottom:0;border-radius:999px;background:linear-gradient(90deg,var(--a-wind),var(--a-sun))}\n.sm{display:grid;grid-template-columns:auto 1fr;gap:4px 16px;align-items:center}\n.sm .big{font-size:44px;line-height:1;grid-row:span 3}\n.sm div{font-size:14px;color:var(--a-ink2)}\n.sm b{color:var(--a-ink);font-family:var(--a-disp)}\n.olnote{font-size:12px;color:var(--a-mute);margin-top:4px}\n";
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
    s+='<section class="card"><h2>Sonne</h2><div class="sm"><div class="bg2">🌅</div>'+
      '<div>Aufgang <b>'+hm(d.sunrise[0])+' Uhr</b></div><div>Untergang <b>'+hm(d.sunset[0])+' Uhr</b></div>'+
      '<div>Tageslänge <b>'+h+' h '+mi+' min</b></div></div></section>';
  }
  s+='<section class="card"><h2>Mond</h2><div class="sm"><div class="bg2">'+m.icon+'</div><div><b>'+m.name+'</b></div><div>'+m.lit+' % beleuchtet</div></div></section>';
  return s;
}

/* ---------- Vorhersage (Open-Meteo) ---------- */
var fcHtml="", sunHtml=sunCard(null), warnOk=null;
function renderOutlook(){
  var chip= warnOk===true ? '<span class="chipok">Keine DWD-Warnungen</span>' : '';
  var root=$("outlook");
  if(!$("ol-main")){
    root.innerHTML='<div class="ol">'+
      '<section class="card full"><h2>Radar und Wolken</h2><div class="rmode" role="group" aria-label="Kartenansicht"><button type="button" data-m="radar" class="on">Regenradar</button><button type="button" data-m="sat">Wolken (Satellit)</button><select id="rsat" hidden aria-label="Satellitenbild wählen"></select></div><div id="ol-radar" aria-label="Wetterkarte"></div><div class="rctl" id="rctl" hidden><button id="rplay" type="button" aria-label="Animation starten oder anhalten">⏸</button><input id="rslide" type="range" min="0" max="0" value="0" aria-label="Zeitpunkt wählen"><span id="rtime" class="tn"></span></div><div class="olnote" id="rinfo">Niederschlagsradar des Deutschen Wetterdienstes, letzte Stunde · Karte: OpenStreetMap</div></section>'+
      '<div id="ol-day" style="display:contents"></div><div id="ol-main" class="full" style="display:contents"></div><div id="ol-long" style="display:contents"></div><div id="ol-sun" style="display:contents"></div></div>';
    initRadar();
  }
  $("ol-main").innerHTML=(fcHtml?fcHtml.replace("%CHIP%",chip):"");
  $("ol-sun").innerHTML=sunHtml;
  renderLong();
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
#outlook,#hourly{--tl:38%}
@media (prefers-color-scheme:dark){#outlook,#hourly{--tl:66%}}
.fc .pgroups{display:grid;grid-template-columns:repeat(var(--np,4),1fr);gap:4px;margin-top:6px}
.fc .pgroups span{text-align:center;font-size:13px;font-weight:700;color:var(--a-wind);padding-bottom:4px;border-bottom:2px solid var(--a-wind)}
.fc .ptabs{display:grid;grid-template-columns:repeat(var(--np,4),1fr);gap:4px;margin:4px 0 0}
.fc .ptab{font:inherit;color:var(--a-ink);background:transparent;border:0;border-radius:14px;padding:8px 2px 8px;display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;min-width:0}
.fc .ptab.on{background:var(--a-card2)}
.fc .ptab:focus-visible,.fc .dtab:focus-visible,.fc summary:focus-visible{outline:3px solid var(--a-sun);outline-offset:2px}
.fc .pn{font-size:13px;font-weight:600;color:var(--a-ink2)}
.fc .ptab.on .pn{color:var(--a-ink)}
.fc .pt{font-family:var(--a-disp);font-weight:800;font-size:clamp(26px,7.5vw,36px);line-height:1.05}
.fc .pi{font-size:32px;line-height:1.2}
.fc .pw,.fc .dw{height:20px;color:var(--a-ink2);display:flex;align-items:center;gap:3px;font-size:12px}
.fc .pw b,.fc .dw b{font-weight:600}
.fc .pp{display:inline-flex;align-items:center;gap:3px;font-size:13px;font-weight:700;color:var(--a-rain)}
.fc .pp svg{width:13px;height:13px}
.fc .pq{font-size:11.5px;font-weight:700;color:var(--a-rain);min-height:15px;white-space:nowrap}
.fc .dh{margin:16px 0 12px;font-family:var(--a-disp);font-size:15px;font-weight:700;color:var(--a-wind)}
.fc .dhb{font:inherit;color:inherit;background:none;border:0;padding:4px 0;margin:0;cursor:pointer;display:flex;align-items:center;gap:10px;width:100%;text-align:left;border-radius:8px}
.fc .dhb:focus-visible{outline:3px solid var(--a-sun);outline-offset:2px}
.fc .dhb .ln{flex:1;height:2px;background:var(--a-sun);opacity:.85;border-radius:2px}
.fc .dhb .chev{flex:none;width:20px;height:20px;transition:transform .2s}
.fc .dhb[aria-expanded="true"] .chev{transform:rotate(180deg)}
.fc .dg[hidden]{display:none}
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
var OPEN={p:true,d:true};
try{var sv=JSON.parse(localStorage.getItem("olOpen")||"null"); if(sv){OPEN.p=sv.p!==false;OPEN.d=sv.d!==false;}}catch(e){}
function head(t,title){
  return '<h3 class="dh"><button type="button" class="dhb" data-t="'+t+'" aria-expanded="'+OPEN[t]+'"><span>'+title+'</span><i class="ln"></i>'+
    '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button></h3>'+
    '<div class="dg"'+(OPEN[t]?'':' hidden')+'>';
}
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
function fmtL(v){return v>=10?String(Math.round(v)):num1(v)}
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
function dayWord(att){var d0=FC.now.slice(0,10);return att===d0?"heute":att===addDay(d0,1)?"morgen":DAYN[new Date(att+"T12:00:00").getDay()]}
function nightTag(date){return "zum "+DAYN[new Date(date+"T12:00:00").getDay()]}
function periods(k){
  var now=FC.now, d0=now.slice(0,10), H=+now.slice(11,13), out=[], list=[];
  if(k===0){
    var p0=0;
    for(var q=0;q<4;q++){ if(H>=PARTS[q].a&&H<PARTS[q].b) p0=q; }
    for(var j=0;j<4;j++) list.push([(p0+j)%4,(p0+j)>=4?addDay(d0,1):d0,j===0]);
  } else {
    var date=FC.d.time[k];
    list=[[1,date,false],[2,date,false],[3,date,false],[0,addDay(date,1),false]];
  }
  list.forEach(function(e){
    var ix=idxFor(e[1],PARTS[e[0]].a,PARTS[e[0]].b);
    if(e[2]) ix=ix.filter(function(i){return i>=FC.i0});
    if(!ix.length) return;
    var a=agg(ix); a.name=PARTS[e[0]].n; a.tag=e[0]===0?nightTag(e[1]):""; a.att=(e[0]===0&&!e[2])?addDay(e[1],-1):e[1]; out.push(a);
  });
  return out;
}

function rainInfo(ix){
  var h=FC.h, wet=ix.filter(function(i){return h.precipitation[i]>=0.1});
  return {pop:maxOf(ix.map(function(i){return h.precipitation_probability[i]})), hrs:wet.length, mm:sum(ix.map(function(i){return h.precipitation[i]}))};
}
function rainTxt(ri){
  var p=r(ri.pop)+" %";
  if(ri.mm<0.1) return p+" | trocken";
  return p+" | "+ri.hrs+" h | "+(ri.mm<1?"0–1":num1(ri.mm))+" L/qm";
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
  var html=head("d",nm+' — '+esc(lab))+
    item(ico("drop"),"tagsüber",esc(rainTxt(rainInfo(dayIx.length?dayIx:all))))+
    item(ico("drop"),"spät abends / nachts",esc(rainTxt(rainInfo(night))))+
    item(ico("rise"),"↑ "+hm(d.sunrise[k])+" ↓ "+hm(d.sunset[k]),ss!=null?"Sonnenschein "+ss+" h":"")+
    item('<span class="cr">'+windRose(a.dir,20,a.ws)+'</span>',esc(windTxt(a.ws,a.dir)))+
    (uv!=null?item(ico("uv"),"UV-Index",r(uv)+" ("+uvWord(uv)+")"):"")+
    item(ico("gust"),"Böen","bis "+r(d.wind_gusts_10m_max[k])+" km/h")+
    '</div><p class="dtx">'+esc(daySentence(k,rainIx,a))+'</p>';
  return html;
}
function periodDetail(a){
  var w=wmo(a.code,a.day), lab=(a.mm>=0.3&&a.pop>=40)?lc(w[1]):skyWord(a.cc,a.day);
  var wet=a.pop>=10||a.mm>=0.1;
  return head("p",a.name+(a.tag?' '+a.tag:'')+' — '+esc(lab))+
    item(ico("drop"),"Niederschlag",wet?r(a.pop)+" %"+(a.mm>=0.1?" · "+fmtL(a.mm)+" L/qm":""):"trocken")+
    item(ico("cloud"),"Bewölkung",r(a.cc)+" %")+
    item('<span class="cr">'+windRose(a.dir,20,a.ws)+'</span>',esc(windTxt(a.ws,a.dir)))+
    item(ico("gust"),"Böen","bis "+r(a.gust)+" km/h")+
    item(ico("gauge"),"Luftdruck",r(a.pres)+" hPa")+
    item(ico("hum"),"Luftfeuchte",r(a.rh)+" % · Taupunkt "+r(a.dew)+"°")+
    '</div>';
}

function fcRender(){
  if(!FC) return;
  var h=FC.h, d=FC.d, P=periods(selD);
  if(selP>=P.length) selP=0;
  if(selD>=d.time.length) selD=0;
  var drop='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC.drop+'</svg>';

  var ptabs=P.map(function(a,i){
    var w=wmo(a.code,a.day);
    return '<button type="button" role="tab" class="ptab'+(i===selP?' on':'')+'" data-p="'+i+'" aria-selected="'+(i===selP)+'" title="'+esc(w[1])+'">'+
      '<span class="pn">'+a.name+'</span><span class="pt tn" style="color:'+tcol(a.t)+'">'+r(a.t)+'°</span><span class="pi">'+w[0]+'</span>'+
      '<span class="pw">'+(a.ws>=1?windRose(a.dir,18,a.ws)+'<b>'+r(a.ws)+'</b>':'')+'</span><span class="pp">'+drop+r(a.pop)+' %</span><span class="pq">'+(a.mm>=0.1?fmtL(a.mm):'0')+' L/qm</span></button>';
  }).join("");

  var dtabs=d.time.map(function(t,k){
    var dt=new Date(t+"T12:00:00"), w=wmo(d.weather_code[k],1), hi=d.temperature_2m_max[k], lo=d.temperature_2m_min[k];
    var nm=k===0?"heute":k===1?"morgen":DAYN[dt.getDay()];
    var date=t.slice(8,10)+"."+t.slice(5,7)+".", da=dayAgg(k);
    var ss=d.sunshine_duration?Math.round(d.sunshine_duration[k]/3600):null;
    var pr=d.precipitation_probability_max[k];
    return '<button type="button" role="tab" class="dtab'+(k===selD?' on':'')+'" data-d="'+k+'" aria-selected="'+(k===selD)+'" title="'+esc(w[1])+'">'+
      '<span class="dth"><b>'+nm+'</b>'+date+'</span><span class="dbd">'+
      '<span class="hi tn" style="color:'+tcol(hi)+'">'+r(hi)+'°</span><span class="lo tn" style="color:'+tcol(lo)+'">'+r(lo)+'°</span>'+
      '<span class="di">'+w[0]+'</span><span class="dw">'+windRose(da.dir,18,da.ws)+'<b>'+r(da.ws)+'</b></span>'+
      '<span class="dm">'+(ss!=null?svg("sun",14)+ss+' h':'')+'</span><span class="dm rn">'+drop+r(pr)+' %</span><span class="dm rn">'+(d.precipitation_sum[k]>=0.1?fmtL(d.precipitation_sum[k]):'0')+' L/qm</span></span></button>';
  }).join("");

  var groups=[];
  P.forEach(function(a){var L=dayWord(a.att); if(groups.length&&groups[groups.length-1].l===L) groups[groups.length-1].n++; else groups.push({l:L,n:1});});
  var pgr='<div class="pgroups" style="--np:'+Math.max(P.length,1)+'">'+groups.map(function(g){return '<span style="grid-column:span '+g.n+'">'+g.l+'</span>'}).join("")+'</div>';

  fcHtml='<section class="card full fc"><h2>Vorhersage%CHIP%</h2>'+pgr+
    '<div class="ptabs" role="tablist" aria-label="Tagesabschnitte" style="--np:'+Math.max(P.length,1)+'">'+ptabs+'</div>'+
    (P.length?periodDetail(P[selP]):'')+
    '<div class="dtabs" role="tablist" aria-label="Tage">'+dtabs+'</div>'+
    '<div class="ddet">'+dayDetail(selD)+'</div>'+
    '<div class="olnote">Modellvorhersage für Wincheringen · Open-Meteo · Warnungen: DWD über Brightsky</div></section>';

  var sc=document.querySelector("#outlook .dtabs"), left=sc?sc.scrollLeft:0;
  renderOutlook();
  sc=document.querySelector("#outlook .dtabs"); if(sc) sc.scrollLeft=left;
  renderDayStrip();
}

function buildForecast(j){
  var h=j.hourly, d=j.daily, now=nowLocal().slice(0,13)+":00";
  var i0=0; while(i0<h.time.length&&h.time[i0]<now) i0++;
  if(i0>=h.time.length) i0=h.time.length-1;
  FC={h:h,d:d,now:now,i0:i0};
  sunHtml=sunCard(d);
  fcRender();
  renderTop();
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
  var tg=e.target.closest?e.target.closest("[data-t]"):null;
  if(tg){
    var t=tg.getAttribute("data-t"), box=tg.parentNode.nextElementSibling;
    OPEN[t]=!OPEN[t]; tg.setAttribute("aria-expanded",OPEN[t]); if(box) box.hidden=!OPEN[t];
    try{localStorage.setItem("olOpen",JSON.stringify(OPEN))}catch(err){}
    return;
  }
  var b=e.target.closest?e.target.closest("[data-p],[data-d]"):null;
  if(!b||!FC) return;
  if(b.hasAttribute("data-p")) selP=+b.getAttribute("data-p"); else { selD=+b.getAttribute("data-d"); selP=0; }
  fcRender();
});

function windCol(v){
  var t=Math.max(0,Math.min(1,((v||0)-10)/30));   // bis 10 km/h schwarz, ab 40 km/h rot, dazwischen Übergang
  return t<=0?"var(--a-ink)":"color-mix(in srgb,#d12b2b "+Math.round(t*100)+"%,var(--a-ink))";
}
function windRose(dir,sz,v){
  if(dir==null||isNaN(dir)) return "";
  return '<svg class="wn" width="'+sz+'" height="'+sz+'" viewBox="0 0 24 24" style="transform:rotate('+Math.round(dir+180)+'deg);color:'+windCol(v)+'" aria-hidden="true"><path d="M12 3l7 17-7-4-7 4z" fill="currentColor"/></svg>';
}
/* ---------- Oben: Wetterkachel (aktuell + 3 Tage) und Stundenleiste (24 h Messwerte + 3 Tage Vorhersage) ---------- */
var ARCH="https://wetter-archiv.eweiter.workers.dev";
var topSlots=null, LGOPEN=false, ARC=null, COL=46, PAST=24, AHEAD=72, topLo=null, lastArc=0;
var TOPCSS=`
.wn{flex:none}
.wn path{stroke:var(--a-card);stroke-width:.8;stroke-linejoin:round}

/* Wetterkachel */
.wk{overflow:hidden;padding:0!important}
.wk .hz{padding:16px 18px 14px}
.wk .hd{display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex-wrap:wrap}
.wk .hd b{font-family:var(--a-disp);font-size:16px}
.wk .st{font-size:12.5px;color:var(--a-ink2)}
.wk .st.old{color:var(--a-warn);font-weight:700}
.wk .bg2{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:4px 0 10px}
.wk .tmp{font-family:var(--a-disp);font-weight:800;font-size:clamp(64px,19vw,88px);line-height:.95;letter-spacing:-.03em}
.wk .tmp small{font-size:.38em;font-weight:700;margin-left:3px;opacity:.75;letter-spacing:0}
.wk .cw{text-align:center}
.wk .cw .e{font-size:60px;line-height:1.05;filter:drop-shadow(0 5px 7px rgba(0,0,0,.2))}
.wk .cw .n{font-size:14px;font-weight:600;color:var(--a-ink)}
.wk .chips{display:flex;flex-wrap:wrap;gap:8px}
.wk .c2{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.55);border-radius:999px;padding:5px 12px 5px 9px;font-size:13.5px;font-weight:600;color:var(--a-ink)}
.wk .c2 svg.ci{width:18px;height:18px;color:var(--a-wind)}
.wk .c2 small{font-weight:500;color:var(--a-ink2)}
.wk .wkh{padding:0 16px 12px;font-size:12px;color:var(--a-mute);text-align:center}
.wk .d3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:12px 12px 14px}
.wk .dt{font:inherit;color:var(--a-ink);border:0;border-radius:16px;padding:10px 4px 12px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px;text-align:center;min-width:0}
.wk .dt:focus-visible,.wk .c2:focus-visible{outline:3px solid var(--a-sun);outline-offset:2px}
.wk .dt .n{font-weight:700;font-size:15px}
.wk .dt .dd{font-size:12px;color:var(--a-ink2)}
.wk .dt .ic{font-size:46px;line-height:1.2;filter:drop-shadow(0 4px 5px rgba(0,0,0,.18))}
.wk .dt .tt{font-family:var(--a-disp);font-weight:800;font-size:24px;line-height:1.05}
.wk .dt .tl2{font-family:var(--a-disp);font-weight:700;font-size:17px;line-height:1.1}
.wk .dt .cx{font-size:12.5px;font-weight:600;line-height:1.2;min-height:2.4em;display:flex;align-items:center}
.wk .dt .mt{white-space:nowrap;font-size:12.5px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:4px;color:var(--a-ink2);min-height:20px}
.wk .dt .mt svg.ci{width:14px;height:14px}
.sk-clear{background:linear-gradient(165deg,#b4dcfb,#eef8ff)}
.sk-cloud{background:linear-gradient(165deg,#c4d4e2,#eef2f6)}
.sk-fog{background:linear-gradient(165deg,#cfd5d9,#eceeef)}
.sk-rain{background:linear-gradient(165deg,#a2b8cc,#dbe4eb)}
.sk-snow{background:linear-gradient(165deg,#d3e0ee,#f4f8fc)}
.sk-storm{background:linear-gradient(165deg,#9d9bb8,#dcdbe8)}
@media (prefers-color-scheme:dark){
  .sk-clear{background:linear-gradient(165deg,#2b5c8e,#1a3351)}
  .sk-cloud{background:linear-gradient(165deg,#3a4a5a,#242f3a)}
  .sk-fog{background:linear-gradient(165deg,#444d52,#2b3236)}
  .sk-rain{background:linear-gradient(165deg,#34475a,#222e3a)}
  .sk-snow{background:linear-gradient(165deg,#4b5d70,#2e3a47)}
  .sk-storm{background:linear-gradient(165deg,#463f66,#2a2640)}
  .wk .c2{background:rgba(0,0,0,.28)}
}

/* Stundenleiste */
.tp .tl{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:0 -6px;padding:0 6px 6px}
.tp .in{position:relative}
.tp .dayrow{display:flex;height:24px}
.tp .dseg{flex:none;height:24px;border-left:2px solid var(--a-wind)}
.tp .dseg span{position:sticky;left:2px;display:inline-block;height:24px;line-height:22px;padding-left:6px;font-size:12.5px;font-weight:700;color:var(--a-wind);white-space:nowrap}
.tp .strip{display:flex}
.tp .hc{flex:0 0 46px;min-width:0;text-align:center;padding:4px 0 4px}
.tp .hc.past{opacity:.82}
.tp .hc.now{background:var(--a-card2);border-radius:12px}
.tp .hh{font-size:11.5px;font-weight:600;color:var(--a-mute);white-space:nowrap}
.tp .hi{font-size:22px;line-height:1.35;min-height:30px}
.tp .ht{font-family:var(--a-disp);font-weight:700;font-size:15px}
.tp .hp{font-size:11px;font-weight:700;color:var(--a-ink2);min-height:14px;white-space:nowrap}
.tp .hm{font-size:10px;font-weight:700;min-height:15px;white-space:nowrap;letter-spacing:-.3px}
.tp .m1{color:var(--a-rain)}
.tp .m2{color:var(--a-ext)}
.tp .hw{display:flex;flex-direction:column;align-items:center;gap:1px;min-height:36px;font-size:11px;font-weight:600;color:var(--a-ink2);margin-top:4px}
.tp .lg b{font-weight:700}
.tp details.lgd{margin-top:6px}
.tp details.lgd summary{cursor:pointer;font-size:13px;font-weight:600;color:var(--a-ink2);padding:4px 0}
.tp details.lgd summary:focus-visible{outline:3px solid var(--a-sun);outline-offset:2px}
`;
var st3=document.createElement("style");st3.textContent=TOPCSS;document.head.appendChild(st3);
if(!$("hourly")){var hc0=document.createElement("div");hc0.id="hourly";var wn0=$("warn");wn0.parentNode.insertBefore(hc0,wn0);}

var BF=new Intl.DateTimeFormat("en-GB",{timeZone:TZ,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",hourCycle:"h23"});
var BT=new Intl.DateTimeFormat("de-DE",{timeZone:TZ,day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"});
function berlin(ep){var o={};BF.formatToParts(new Date(ep*1000)).forEach(function(p){o[p.type]=p.value});return {date:o.year+"-"+o.month+"-"+o.day,hr:+o.hour}}
function mn(a){var v=vals(a);return v.length?sum(v)/v.length:null}
function mx(a){var v=vals(a);return v.length?Math.max.apply(null,v):null}
function col(rows,k){return rows.map(function(x){return x[k]})}
function dayWordFor(date,today){
  var diff=Math.round((Date.parse(date+"T12:00:00Z")-Date.parse(today+"T12:00:00Z"))/864e5);
  var w=diff===-1?"gestern":diff===0?"heute":diff===1?"morgen":DAYN[new Date(date+"T12:00:00Z").getUTCDay()];
  return w+" "+date.slice(8,10)+"."+date.slice(5,7)+".";
}
function skyClass(c){return c<=1?"sk-clear":c<=3?"sk-cloud":(c===45||c===48)?"sk-fog":((c>=51&&c<=67)||(c>=80&&c<=82))?"sk-rain":(c>=71&&c<=77)||c===85||c===86?"sk-snow":c>=95?"sk-storm":"sk-cloud"}
function dayAgg(k){
  var date=FC.d.time[k], ix=idxFor(date,6,21);
  if(k===0){var f=ix.filter(function(i){return i>=FC.i0}); if(f.length) ix=f;}
  if(!ix.length) ix=idxFor(date,0,24);
  return agg(ix);
}

function buildSlots(){
  var h=FC.h, nowH=Math.floor(Date.now()/3600000)*3600, ah={}, minK=null;
  if(ARC) ARC.hours.forEach(function(r){ah[r.t]=r; if(minK===null||r.t<minK) minK=r.t;});
  var lo=minK===null?0:Math.max(-PAST,Math.floor((minK-nowH)/3600)), slots=[];
  for(var s=lo;s<AHEAD;s++){
    var ep=nowH+s*3600, b=berlin(ep);
    var o={s:s,date:b.date,hr:b.hr,t:null,mm:null,ws:null,dir:null,pop:null,code:null,day:b.hr>=7&&b.hr<19?1:0};
    if(s>=0){
      var i=FC.i0+s;
      if(i<h.time.length){ o.t=h.temperature_2m[i]; o.mm=h.precipitation[i]; o.ws=h.wind_speed_10m[i]; o.dir=h.wind_direction_10m[i]; o.pop=h.precipitation_probability[i]; o.code=h.weather_code[i]; o.day=h.is_day[i]; }
    } else {
      var rw=ah[ep];
      if(rw){ o.t=rw.temp; o.mm=rw.mm; o.ws=rw.wind; o.dir=rw.dir; }
    }
    slots.push(o);
  }
  return {slots:slots,lo:lo,today:berlin(nowH).date};
}

function heroHtml(){
  var h=FC.h, d=FC.d, i0=FC.i0, L=ARC&&ARC.latest, st=!!(L&&L.temp!=null);
  var t=st?L.temp:h.temperature_2m[i0], w0=wmo(h.weather_code[i0],h.is_day[i0]);
  var hum=st&&L.hum!=null?L.hum:h.relative_humidity_2m[i0], pr=st&&L.press!=null?L.press:h.pressure_msl[i0];
  var ws=st&&L.wind!=null?L.wind:h.wind_speed_10m[i0], gu=st&&L.gust!=null?L.gust:h.wind_gusts_10m[i0], wd=st&&L.dir!=null?L.dir:h.wind_direction_10m[i0];
  var stamp, old=false;
  if(st&&L.ts){ stamp="Messung "+BT.format(new Date(L.ts*1000)).replace(", "," · ")+" Uhr"; old=(Date.now()/1000-L.ts)>1800; }
  else stamp="Modellwert (Messung nicht verfügbar)";
  var svgI=function(n){return '<svg class="ci" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC[n]+'</svg>'};
  var chips='<span class="c2">'+svgI("hum")+r(hum)+' %<small>Feuchte</small></span>'+
    '<span class="c2">'+svgI("gauge")+r(pr)+' hPa</span>'+
    '<span class="c2">'+windRose(wd,18,ws)+r(ws)+' km/h<small>Böen '+r(gu)+'</small></span>'+
    (st&&L.rain!=null?'<span class="c2">'+svgI("drop")+fmtL(L.rain)+' L/qm<small>heute</small></span>':'');
  var tiles="";
  for(var k=0;k<3&&k<d.time.length;k++){
    var code=d.weather_code[k], w=wmo(code,1), a=dayAgg(k), dt=new Date(d.time[k]+"T12:00:00");
    var nm=k===0?"heute":k===1?"morgen":DAYN[dt.getDay()];
    var ss=d.sunshine_duration?Math.round(d.sunshine_duration[k]/3600):null, pop=d.precipitation_probability_max[k], mm=d.precipitation_sum[k];
    tiles+='<button type="button" class="dt '+skyClass(code)+'" data-hd="'+k+'" aria-label="'+nm+': '+esc(w[1])+', Details anzeigen">'+
      '<span class="n">'+nm+'</span><span class="dd">'+d.time[k].slice(8,10)+'.'+d.time[k].slice(5,7)+'.</span>'+
      '<span class="ic">'+w[0]+'</span>'+
      '<span class="tt tn" style="color:'+tcol(d.temperature_2m_max[k])+'">'+r(d.temperature_2m_max[k])+'°</span>'+
      '<span class="tl2 tn" style="color:'+tcol(d.temperature_2m_min[k])+'">'+r(d.temperature_2m_min[k])+'°</span>'+
      '<span class="cx">'+esc(w[1])+'</span>'+
      (ss!=null?'<span class="mt">'+svgI("sun")+ss+' h</span>':'')+
      '<span class="mt" style="color:var(--a-rain)">'+svgI("drop")+r(pop)+' %</span>'+
      '<span class="mt" style="color:var(--a-rain)">'+(mm>=0.1?fmtL(mm)+' L/qm':'0 L/qm')+'</span>'+
      '<span class="mt">'+windRose(a.dir,18,a.ws)+r(a.ws)+' km/h</span></button>';
  }
  return '<section class="card full wk"><div class="hz '+skyClass(h.weather_code[i0])+'">'+
    '<div class="hd"><b>Wincheringen-Mont</b><span class="st'+(old?' old':'')+'">'+esc(stamp)+'</span></div>'+
    '<div class="bg2"><div class="tmp tn" style="color:'+tcol(t)+'">'+num1(t)+'<small>°C</small></div>'+
    '<div class="cw"><div class="e">'+w0[0]+'</div><div class="n">'+esc(w0[1])+'</div></div></div>'+
    '<div class="chips">'+chips+'</div></div>'+
    '<div class="d3">'+tiles+'</div>'+
    '<div class="wkh">Oberes Drittel einer Kachel: stündlicher Verlauf ab 6 Uhr · Rest der Kachel: Tagesvorhersage</div></section>';
}

function stripHtml(slots){
  return '<div class="strip">'+slots.map(function(o){
    var past=o.s<0, w=past?null:wmo(o.code,o.day);
    var mm=(o.mm!=null&&o.mm>=0.05)?fmtL(o.mm)+' L/qm':'';
    var wind=o.ws!=null?'<div class="hw">'+(o.dir!=null?windRose(o.dir,20,o.ws):'')+'<span>'+r(o.ws)+'</span></div>':'<div class="hw"></div>';
    return '<div class="hc'+(past?' past':'')+(o.s===0?' now':'')+'"><div class="hh">'+(o.s===0?'Jetzt':o.hr+' Uhr')+'</div>'+
      '<div class="hi"'+(w?' title="'+esc(w[1])+'"':'')+'>'+(w?w[0]:'')+'</div>'+
      '<div class="ht tn"'+(o.t!=null?' style="color:'+tcol(o.t)+'"':'')+'>'+(o.t!=null?r(o.t)+'°':'–')+'</div>'+
      '<div class="hp">'+(past?'':(o.pop>=10?o.pop+' %':''))+'</div>'+
      '<div class="hm '+(past?'m1':'m2')+'">'+mm+'</div>'+wind+'</div>';
  }).join("")+'</div>';
}

function renderTop(){
  var root=$("hourly"); if(!root||!FC) return;
  var S=buildSlots(), slots=S.slots, lo=S.lo, W=slots.length*COL;
  topSlots=slots;
  var sc0=document.querySelector("#hourly .tl"), keep=sc0?sc0.scrollLeft:null;

  var dayrow='<div class="dayrow">', starts=[];
  slots.forEach(function(o,i){ if(i===0||o.hr===0) starts.push(i); });
  starts.forEach(function(st,k){
    var len=(k+1<starts.length?starts[k+1]:slots.length)-st;
    dayrow+='<div class="dseg" style="width:'+(len*COL)+'px">'+(len>=3?'<span>'+esc(dayWordFor(slots[st].date,S.today))+'</span>':'')+'</div>';
  });
  dayrow+='</div>';

  var strip=stripHtml(slots);

  var hint=lo<0?'← Messwerte der Station (24 Stunden) · Vorhersage (3 Tage) →':'Vorhersage für 3 Tage →';
  var note=lo<0?'Nach links wischen: Messwerte der Station (bis zu 24 Stunden). Nach rechts: stündliche Vorhersage für 3 Tage.':
    'Nach rechts wischen: stündliche Vorhersage für 3 Tage. Die Messwerte der Station sind gerade nicht verfügbar.';
  root.innerHTML='<div class="ol">'+heroHtml()+
    '<section class="card full tp"><h2>Verlauf und Vorhersage</h2>'+
    '<div class="tl"><div class="in" style="width:'+W+'px">'+dayrow+strip+'</div></div>'+
    '<div class="olnote">'+hint+'</div>'+
    '<details class="lgd"'+(LGOPEN?' open':'')+'><summary>Legende</summary>'+
    '<div class="olnote lg">Regenmenge je Stunde: <b class="m1">gemessen</b> · <b class="m2">vorhergesagt</b>. Windpfeil: zeigt, wohin der Wind weht; Farbe von schwarz (schwach) bis rot (stark); Zahl in km/h.</div>'+
    '<div class="olnote">'+note+'</div></details></section></div>';

  var sc=document.querySelector("#hourly .tl");
  if(sc){
    if(keep===null) sc.scrollLeft=Math.max(0,(-lo-2)*COL);
    else sc.scrollLeft=Math.max(0,keep+(topLo-lo)*COL);
  }
  topLo=lo;
}
$("hourly").addEventListener("toggle",function(e){ if(e.target.classList&&e.target.classList.contains("lgd")) LGOPEN=e.target.open; },true);
function stripTo(k){
  var sc=document.querySelector("#hourly .tl"), tp=document.querySelector("#hourly .tp");
  if(!sc||!topSlots) return;
  var x=0;   // bei k>0: +6 gleicht den Innenabstand der Leiste aus
  if(k===0) x=Math.max(0,(-topLo-2)*COL);   // zurück zur Ausgangsstellung "Jetzt"
  else{
    var date=FC.d.time[k];
    for(var i=0;i<topSlots.length;i++){ if(topSlots[i].date===date&&topSlots[i].hr===6){ x=i*COL+6; break; } }
  }
  sc.scrollTo({left:x,behavior:"smooth"});
  if(tp&&tp.scrollIntoView) tp.scrollIntoView({behavior:"smooth",block:"nearest"});
}
$("hourly").addEventListener("click",function(e){
  var b=e.target.closest?e.target.closest("[data-hd]"):null; if(!b||!FC) return;
  var k=+b.getAttribute("data-hd"), rect=b.getBoundingClientRect();
  // oberes Drittel (nur bei Maus/Touch): Stundenverlauf einstellen; sonst (auch per Tastatur): zur Tagesvorhersage springen
  if(e.detail>0 && (e.clientY-rect.top)<rect.height/3){ stripTo(k); return; }
  selD=k; selP=0; fcRender();
  var f=document.querySelector("#ol-day .tp")||document.querySelector("#outlook .fc"); if(f&&f.scrollIntoView) f.scrollIntoView({behavior:"smooth",block:"start"});
});

function fromSeries(rows){
  var by={}, hours=[];
  rows.forEach(function(x){var k=Math.floor(x.t/3600)*3600;(by[k]=by[k]||[]).push(x)});
  Object.keys(by).sort().forEach(function(k){var g=by[k];hours.push({t:+k,temp:mn(col(g,"temp")),wind:mn(col(g,"wind")),gust:mx(col(g,"gust")),dir:null,mm:mn(col(g,"rainrate"))})});
  var l=rows.length?rows[rows.length-1]:null;
  return {hours:hours,latest:l?{ts:l.t,temp:l.temp,hum:l.hum,press:l.press,wind:l.wind,gust:l.gust,dir:null,rain:null}:null};
}
function loadArchive(){
  function done(){lastArc=Date.now();renderTop()}
  function ok(x){if(!x.ok)throw new Error(x.status);return x.json()}
  fetch(ARCH+"/api/hourly?hours=24").then(ok).then(function(j){
    if(!j||!j.rows) throw new Error("kein hourly");
    ARC={hours:j.rows,latest:j.latest||null}; done();
  }).catch(function(){
    fetch(ARCH+"/api/series?range=24h").then(ok).then(function(j){ARC=fromSeries((j&&j.rows)||[]);done()})
     .catch(function(){ if(ARC===null){ARC={hours:[],latest:null};renderTop();} });
  });
}
loadArchive(); setInterval(loadArchive,10*60*1000);

/* ---------- 14-Tage-Übersicht (Open-Meteo, nur Tageswerte) ---------- */
var LONGCSS=`
.lc .lcw{margin:6px 0 4px}
.lc svg.lg14{display:block;width:100%;height:auto}
.lc .wk14{fill:var(--a-card2)}
.lc .dl{font-size:12.5px;font-weight:500;fill:var(--a-ink2);text-anchor:middle}
.lc .dl.we{font-weight:800;fill:var(--a-ink)}
.lc .dl.td{fill:var(--a-wind);font-weight:800}
.lc .crv{fill:none;stroke:var(--a-mute);stroke-width:1.6;opacity:.45}
.lc .mx{fill:#d33a2c}
.lc .mi{fill:#3b2fe0}
.lc .vm{font-size:13px;text-anchor:middle;font-weight:500}
.lc .dr{fill:#a9cdf2;stroke:#3c6aa8;stroke-width:1}
.lc .llg{display:flex;flex-wrap:wrap;align-items:center;gap:8px 18px;font-size:13px;color:var(--a-ink2);margin-top:8px}
.lc .llg span{display:inline-flex;align-items:center;gap:6px}
.lc .llg i.dt2{width:10px;height:10px;border-radius:50%;display:inline-block}
.lc .llg i.dt2.mi{background:#3b2fe0}
.lc .llg i.dt2.mx{background:#d33a2c}
.lc .llg .gr{display:inline-flex;justify-content:space-between;gap:18px;padding:2px 8px;border-radius:4px;background:linear-gradient(90deg,#f2de3a,var(--a-track));font-size:12px;color:var(--a-ink)}
.lc .llg svg{width:18px;height:18px}
@media (prefers-color-scheme:dark){.lc .mx{fill:#ff7a6b}.lc .mi{fill:#9a92ff}.lc .llg i.dt2.mi{background:#9a92ff}.lc .llg i.dt2.mx{background:#ff7a6b}.lc .dr{fill:#4d78b0;stroke:#a9cdf2}}
`;
var st4=document.createElement("style");st4.textContent=LONGCSS;document.head.appendChild(st4);
var LONG=null, LONGERR=false;
var DOW2=["So","Mo","Di","Mi","Do","Fr","Sa"];
function smoothPath(pts){
  if(pts.length<2) return "";
  var d="M"+pts[0][0].toFixed(1)+" "+pts[0][1].toFixed(1);
  for(var i=0;i<pts.length-1;i++){
    var p0=pts[i-1]||pts[i], p1=pts[i], p2=pts[i+1], p3=pts[i+2]||p2;
    var c1x=p1[0]+(p2[0]-p0[0])/6, c1y=p1[1]+(p2[1]-p0[1])/6, c2x=p2[0]-(p3[0]-p1[0])/6, c2y=p2[1]-(p3[1]-p1[1])/6;
    d+=" C"+c1x.toFixed(1)+" "+c1y.toFixed(1)+" "+c2x.toFixed(1)+" "+c2y.toFixed(1)+" "+p2[0].toFixed(1)+" "+p2[1].toFixed(1);
  }
  return d;
}
function dropPath(cx,cy){return '<path class="dr" transform="translate('+cx.toFixed(1)+' '+cy.toFixed(1)+')" d="M0 -9c3 4 5.5 7 5.5 10a5.5 5.5 0 0 1-11 0c0-3 2.5-6 5.5-10z"/>'}

function renderLong(){
  var box=$("ol-long"); if(!box) return;
  if(!LONG){
    box.innerHTML=LONGERR?'<section class="card full lc"><h2>14-Tage-Wetter</h2><div class="olnote">Die 14-Tage-Übersicht ist gerade nicht verfügbar.</div></section>':'';
    return;
  }
  var d=LONG, n=d.time.length;
  var W=Math.max(300,Math.floor(($("outlook").clientWidth||360)-36)), cw=W/n;
  var topLab=18, c0=56, c1=176, sunY=206, sunH=42, H=sunY+sunH+2;
  var hi=Math.max.apply(null,d.temperature_2m_max), lo=Math.min.apply(null,d.temperature_2m_min), span=(hi-lo)||1;
  function Y(v){return c0+(hi-v)/span*(c1-c0)}
  var today=berlin(Math.floor(Date.now()/1000)).date;
  var svgH='<svg class="lg14" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Temperaturverlauf und Sonne für 14 Tage">';
  var maxP=[], minP=[], bands="", labels="", cells="", dots="", vals="", hits="";
  for(var i=0;i<n;i++){
    var dt=new Date(d.time[i]+"T12:00:00"), dow=dt.getDay(), we=(dow===0||dow===6), cx=(i+0.5)*cw;
    if(we) bands+='<rect class="wk14" x="'+(i*cw).toFixed(1)+'" y="0" width="'+cw.toFixed(1)+'" height="'+(sunY-4)+'"/>';
    labels+='<text class="dl'+(we?' we':'')+(d.time[i]===today?' td':'')+'" x="'+cx.toFixed(1)+'" y="'+topLab+'">'+DOW2[dow]+'</text>';
    var tx=d.temperature_2m_max[i], tn=d.temperature_2m_min[i];
    maxP.push([cx,Y(tx)]); minP.push([cx,Y(tn)]);
    dots+='<circle class="mx" cx="'+cx.toFixed(1)+'" cy="'+Y(tx).toFixed(1)+'" r="4"/><circle class="mi" cx="'+cx.toFixed(1)+'" cy="'+Y(tn).toFixed(1)+'" r="4"/>';
    vals+='<text class="vm mx" x="'+cx.toFixed(1)+'" y="'+(Y(tx)-9).toFixed(1)+'">'+r(tx)+'</text><text class="vm mi" x="'+cx.toFixed(1)+'" y="'+(Y(tn)+19).toFixed(1)+'">'+r(tn)+'</text>';
    var sf=(d.daylight_duration&&d.daylight_duration[i])?Math.max(0,Math.min(1,d.sunshine_duration[i]/d.daylight_duration[i])):0;
    cells+='<rect x="'+(i*cw+1).toFixed(1)+'" y="'+sunY+'" width="'+(cw-2).toFixed(1)+'" height="'+sunH+'" rx="2" style="fill:color-mix(in srgb,#f2de3a '+Math.round(sf*100)+'%,var(--a-track))"/>';
    var pr=d.precipitation_sum[i]||0;
    if(pr>=5){ cells+=dropPath(cx-4.5,sunY+sunH/2+5)+dropPath(cx+4.5,sunY+sunH/2+1); }
    else if(pr>=0.3){ cells+=dropPath(cx,sunY+sunH/2+4); }
    var tip=DAYN[dow]+" "+d.time[i].slice(8,10)+"."+d.time[i].slice(5,7)+".: "+r(tx)+"° / "+r(tn)+"°, Sonne "+num1((d.sunshine_duration[i]||0)/3600)+" h, Niederschlag "+num1(pr)+" L/qm";
    hits+='<rect x="'+(i*cw).toFixed(1)+'" y="0" width="'+cw.toFixed(1)+'" height="'+H+'" fill="transparent"><title>'+esc(tip)+'</title></rect>';
  }
  svgH+=bands+labels+'<path class="crv" d="'+smoothPath(maxP)+'"/><path class="crv" d="'+smoothPath(minP)+'"/>'+dots+vals+cells+hits+'</svg>';
  box.innerHTML='<section class="card full lc"><h2>14-Tage-Wetter</h2><div class="lcw">'+svgH+'</div>'+
    '<div class="llg"><span><i class="dt2 mi"></i>Min (°C)</span><span><i class="dt2 mx"></i>Max (°C)</span>'+
    '<span>'+svg("sun",18)+'<span class="gr"><b style="font-weight:600">viel</b><b style="font-weight:600">wenig</b></span></span>'+
    '<span>'+dropPathLegend()+'Regen</span></div></section>';
}
function dropPathLegend(){return '<svg viewBox="-8 -11 16 22" style="width:12px;height:16px"><path class="dr" d="M0 -9c3 4 5.5 7 5.5 10a5.5 5.5 0 0 1-11 0c0-3 2.5-6 5.5-10z"/></svg>'}
function loadLong(){
  fetch("https://api.open-meteo.com/v1/forecast?latitude="+LAT+"&longitude="+LON+
    "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,sunshine_duration,daylight_duration"+
    "&timezone="+encodeURIComponent(TZ)+"&forecast_days=14")
   .then(function(x){if(!x.ok)throw new Error(x.status);return x.json()})
   .then(function(j){LONG=j.daily;LONGERR=false;renderLong()})
   .catch(function(){ if(!LONG){LONGERR=true;renderLong();} });
}
loadLong(); setInterval(loadLong,30*60*1000);
(function(){var tm=null;window.addEventListener("resize",function(){clearTimeout(tm);tm=setTimeout(renderLong,200)})})();


/* ---------- Stundenvorhersage für den gewählten Tag (zwischen Radar und 7-Tage-Vorhersage) ---------- */
var dsDate=null;
function renderDayStrip(){
  var box=$("ol-day"); if(!box||!FC) return;
  var h=FC.h, d=FC.d, k=selD, date=d.time[k], ix=idxFor(date,0,24);
  if(k===0) ix=ix.filter(function(i){return i>=FC.i0});
  if(!ix.length){ box.innerHTML=""; return; }
  var sc0=document.querySelector("#ol-day .tl"), keep=(sc0&&dsDate===date)?sc0.scrollLeft:null;
  var slots=ix.map(function(i){
    return {s:i-FC.i0,date:date,hr:+h.time[i].slice(11,13),t:h.temperature_2m[i],mm:h.precipitation[i],ws:h.wind_speed_10m[i],dir:h.wind_direction_10m[i],pop:h.precipitation_probability[i],code:h.weather_code[i],day:h.is_day[i]};
  });
  var dow=new Date(date+"T12:00:00").getDay(), nm=k===0?"heute":k===1?"morgen":DAYN[dow];
  var title=nm+" "+date.slice(8,10)+"."+date.slice(5,7)+".";
  box.innerHTML='<section class="card full tp"><h2>Stundenvorhersage · '+esc(title)+'</h2>'+
    '<div class="tl"><div class="in" style="width:'+(slots.length*COL)+'px">'+stripHtml(slots)+'</div></div>'+
    '<div class="olnote">Für den oben gewählten Tag (Tageskachel oder Reiter). Regenmenge in L/qm, Windpfeil wie im Verlauf oben.</div></section>';
  var sc=document.querySelector("#ol-day .tl");
  if(sc){
    if(keep!==null) sc.scrollLeft=keep;
    else{
      var x=0;
      if(k>0){ for(var q=0;q<slots.length;q++){ if(slots[q].hr===6){ x=q*COL+6; break; } } }
      sc.scrollLeft=x;
    }
  }
  dsDate=date;
}

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
document.addEventListener("visibilitychange",function(){ if(!document.hidden){ loadWarn(); if(Date.now()-lastFc>10*60*1000) loadForecast(); if(Date.now()-lastArc>10*60*1000) loadArchive(); } });
})();
