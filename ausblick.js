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
    var secs=d.daylight_duration, h=Math.floor(secs/3600), mi=Math.round((secs%3600)/60);
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
  return out.filter(function(d){return !isNaN(d.getTime())});
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
function useSat(){
  var want=null; try{ want=localStorage.getItem("sat_layer"); }catch(e){}
  var p=satList.filter(function(x){ return x.name===want; })[0]||satList[0];
  satPick=p; rLayerName=p.name; fillSel();
  return parseTimes(p.dim,12);
}
function fetchSatTimes(){
  if(satList&&Date.now()-satAt<10*60*1000) return Promise.resolve(useSat());
  return getXml(CAPS_ALL).then(function(doc){
    satList=listSat(doc); if(!satList.length) throw new Error("keine Satellitenebene");
    satAt=Date.now(); return useSat();
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
function buildForecast(j){
  var h=j.hourly, d=j.daily, now=nowLocal().slice(0,13)+":00";
  var i0=0; while(i0<h.time.length && h.time[i0]<now) i0++;
  var hours="";
  for(var i=i0;i<Math.min(i0+24,h.time.length);i++){
    var w=wmo(h.weather_code[i],h.is_day[i]), p=h.precipitation_probability[i];
    hours+='<div class="hr'+(i===i0?' now':'')+'" title="'+esc(w[1])+'"><div class="t">'+(i===i0?'Jetzt':h.time[i].slice(11,13)+' Uhr')+'</div><div class="i">'+w[0]+
      '</div><div class="d tn">'+r(h.temperature_2m[i])+'°</div><div class="p">'+(p>=10?p+' %':'')+'</div></div>';
  }
  var gmin=Math.min.apply(null,d.temperature_2m_min), gmax=Math.max.apply(null,d.temperature_2m_max), span=Math.max(1,gmax-gmin);
  var days="";
  for(var k=0;k<d.time.length;k++){
    var dt=new Date(d.time[k]+"T12:00:00"), nm=k===0?"Heute":k===1?"Morgen":WD[dt.getDay()]+" "+dt.getDate()+".";
    var w2=wmo(d.weather_code[k],1), lo=d.temperature_2m_min[k], hi=d.temperature_2m_max[k];
    var left=(lo-gmin)/span*100, wid=Math.max(4,(hi-lo)/span*100);
    var pr=d.precipitation_probability_max[k], sum=d.precipitation_sum[k];
    days+='<div class="day"><div class="n">'+nm+'</div><div class="i">'+w2[0]+'</div><div class="m"><div class="x"><span>'+esc(w2[1])+'</span><span>'+
      (pr>=10||sum>=0.1?'<span class="r">'+pr+' %'+(sum>=0.1?' · '+String(Math.round(sum*10)/10).replace(".",",")+' mm':'')+'</span> · ':'')+'Böen '+r(d.wind_gusts_10m_max[k])+' km/h</span></div>'+
      '<div class="rng tn"><span>'+r(lo)+'°</span><div class="tr"><div class="bar" style="left:'+left+'%;width:'+wid+'%"></div></div><span>'+r(hi)+'°</span></div></div></div>';
  }
  fcHtml='<section class="card full"><h2>Vorhersage%CHIP%</h2><div class="hours">'+hours+'</div><div class="days">'+days+'</div>'+
    '<div class="olnote">Modellvorhersage für Wincheringen · Open-Meteo · Warnungen: DWD über Brightsky</div></section>';
  sunHtml=sunCard(d);
  renderOutlook();
}
function loadForecast(){
  var u="https://api.open-meteo.com/v1/forecast?latitude="+LAT+"&longitude="+LON+
   "&hourly=temperature_2m,precipitation_probability,weather_code,is_day"+
   "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_gusts_10m_max,sunrise,sunset,daylight_duration"+
   "&timezone="+encodeURIComponent(TZ)+"&forecast_days=7&wind_speed_unit=kmh";
  fetch(u).then(function(x){if(!x.ok)throw new Error(x.status);return x.json()}).then(buildForecast)
   .catch(function(e){ if(!fcHtml){ fcHtml='<section class="card full"><h2>Vorhersage</h2><div class="olnote">Die Vorhersage ist gerade nicht verfügbar ('+esc(e&&e.message?e.message:e)+'). Neuer Versuch in wenigen Minuten.</div></section>'; renderOutlook(); } setTimeout(loadForecast,5*60*1000); });
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
document.addEventListener("visibilitychange",function(){ if(!document.hidden){ loadWarn(); } });
})();
