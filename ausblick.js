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
    root.innerHTML='<div class="ol"><div id="ol-main" class="full" style="display:contents"></div>'+
      '<section class="card full"><h2>Radar und Wolken</h2><div class="rmode" role="group" aria-label="Kartenansicht"><button type="button" data-m="radar" class="on">Regenradar</button><button type="button" data-m="sat">Wolken (Satellit)</button><button type="button" data-m="prog">Prognose</button><select id="rsat" hidden aria-label="Satellitenbild wählen"></select></div><div class="rdays" id="rkind" hidden style="margin:0 0 10px"><button type="button" data-pk="rain">Regen</button><button type="button" data-pk="cloud">Wolken</button></div><div id="ol-radar" aria-label="Wetterkarte"></div><div class="rctl" id="rctl" hidden><button id="rplay" type="button" aria-label="Animation starten oder anhalten">⏸</button><input id="rslide" type="range" min="0" max="0" value="0" aria-label="Zeitpunkt wählen"><span id="rtime" class="tn"></span></div><div class="rdays" id="rdays" hidden><button type="button" data-dj="0">Heute</button><button type="button" data-dj="1">Morgen</button><button type="button" data-dj="2">Übermorgen</button></div><div class="rleg" id="rleg" hidden></div><div class="olnote" id="rinfo">Niederschlagsradar des Deutschen Wetterdienstes, letzte Stunde · Karte: OpenStreetMap</div></section>'+
      '<div id="ol-long" style="display:contents"></div><div id="ol-sun" style="display:contents"></div></div>';
    initRadar();
  }
  $("ol-main").innerHTML=(fcHtml?fcHtml.replace("%CHIP%",chip):"");
  $("ol-sun").innerHTML=sunHtml;
  renderLong();
}
/* ---------- Regenradar und Wolken (DWD-WMS auf Leaflet, animiert) ---------- */
(function(){ ["preconnect","dns-prefetch"].forEach(function(r){ var l=document.createElement("link"); l.rel=r; l.href="https://maps.dwd.de"; if(r==="preconnect") l.crossOrigin=""; document.head.appendChild(l); }); })();
var WMS_URL="https://maps.dwd.de/geoserver/dwd/wms";
var CAPS_RADAR="https://maps.dwd.de/geoserver/dwd/Niederschlagsradar/wms?service=WMS&version=1.3.0&request=GetCapabilities";
var CAPS_ALL=WMS_URL+"?service=WMS&version=1.3.0&request=GetCapabilities";
var rMode="radar", rLayerName="dwd:Niederschlagsradar", rOpacity=0.75, satPick=null;
var rKeys=[], rGen=0, rProgTxt="", rLoadedAll=false, rMeta=[], rNowIdx=0, rFcName=null, rFcTry=0, progAt=0, radarMap=null, rLayers=[], rTimes=[], rIdx=0, rTimer=null, rPlaying=false, rStatic=null, rReq=0;
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

var R_PAST_MIN=90, R_FUT_MIN=150;
var FC_LAYERS=["dwd:Radar_rv_product_1x1km_ger","dwd:Radar_wn-product_1x1km_ger"];
// Alle Zeitpunkte einer WMS-Zeitangabe (Liste oder Start/Ende/Schritt) innerhalb eines Zeitfensters
function parseWindow(txt,fromMs,toMs){
  var out={}, toks=txt.trim().split(/\s*,\s*/);
  toks.forEach(function(tk){
    if(tk.indexOf("/")>0){
      var p=tk.split("/"), a=new Date(p[0]).getTime(), b=new Date(p[1]).getTime();
      var m=/PT(?:(\d+)H)?(?:(\d+)M)?/.exec(p[2]||"PT5M")||[], step=(((+m[1]||0)*60)+(+m[2]||0))*60000||300000;
      if(isNaN(a)||isNaN(b)) return;
      var t=a; if(fromMs>a) t=a+Math.ceil((fromMs-a)/step)*step;
      for(var n=0;t<=b&&t<=toMs&&n<600;t+=step,n++) out[t]=1;
    } else { var d=new Date(tk).getTime(); if(!isNaN(d)&&d>=fromMs&&d<=toMs) out[d]=1; }
  });
  return Object.keys(out).map(Number).sort(function(x,y){return x-y}).map(function(t){return new Date(t)});
}
function layerTimeDim(name){
  return getXml(layerCapsUrl(name)).then(function(doc){
    var dims=doc.getElementsByTagName("Dimension");
    for(var i=0;i<dims.length;i++){ if((dims[i].getAttribute("name")||"").toLowerCase()==="time") return dims[i].textContent; }
    return null;
  });
}
// Radarvorhersage-Ebene des DWD suchen (mehrere mögliche Namen; Ergebnis wird gemerkt)
function findFc(){
  if(rFcName) return Promise.resolve(rFcName);
  if(rFcName===false&&Date.now()-rFcTry<30*60000) return Promise.resolve(null);
  var cached=null; try{ cached=localStorage.getItem("rfc_layer"); }catch(e){}
  var cand=cached?[cached].concat(FC_LAYERS.filter(function(x){return x!==cached})):FC_LAYERS.slice(), i=0;
  function next(){
    if(i>=cand.length){ rFcName=false; rFcTry=Date.now(); return Promise.resolve(null); }
    var nm=cand[i++], now=Date.now();
    return layerTimeDim(nm).then(function(dim){
      if(dim&&parseWindow(dim,now+10*60000,now+R_FUT_MIN*60000).length){ rFcName=nm; try{ localStorage.setItem("rfc_layer",nm); }catch(e){} return nm; }
      return next();
    }).catch(next);
  }
  return next();
}
function fetchRadarFrames(){
  var now=Date.now(), from=now-R_PAST_MIN*60000-120000;
  return Promise.all([
    layerTimeDim("dwd:Niederschlagsradar").catch(function(){ return null; }),
    findFc().then(function(nm){ return nm?layerTimeDim(nm).then(function(d){ return {name:nm,dim:d}; }).catch(function(){ return null; }):null; }).catch(function(){ return null; })
  ]).then(function(res){
    var obsT=res[0]?parseWindow(res[0],from,now+120000):[];
    var fc=res[1], fcT=(fc&&fc.dim)?parseWindow(fc.dim,from,now+R_FUT_MIN*60000):[];
    var latestObs=obsT.length?obsT[obsT.length-1].getTime():now-10*60000, frames=[];
    if(fc&&fcT.length&&fcT[0].getTime()<=now-60*60000){      // Vorhersage-Ebene enthält auch die Vergangenheit
      fcT.forEach(function(d){ frames.push({t:d,layer:fc.name,fc:d.getTime()>latestObs+120000}); });
    } else {
      obsT.forEach(function(d){ frames.push({t:d,layer:"dwd:Niederschlagsradar",fc:false}); });
      if(fc) fcT.forEach(function(d){ if(d.getTime()>latestObs+120000) frames.push({t:d,layer:fc.name,fc:true}); });
    }
    return frames;
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
// Bekannte Ebenennamen zuerst einzeln prüfen (kleine Anfrage) - die riesige Gesamtliste des DWD wird nur im Notfall
// und danach höchstens einmal pro Woche im Hintergrund geladen.
var SAT_CANDS=["dwd:Satellite_meteosat_1km_euat_rgb_day_hrv_and_ir108_3h"];
function probeSat(){
  return Promise.all(SAT_CANDS.map(function(nm){
    return layerTimeDim(nm).then(function(dim){
      return dim?{name:nm,title:nm.replace(/^dwd:Satellite_?/i,"").replace(/_/g," "),score:9,dim:dim,at:Date.now()}:null;
    }).catch(function(){ return null; });
  })).then(function(a){ return a.filter(Boolean); });
}
function saveSat(list,partial){
  var now=Date.now();
  try{ localStorage.setItem("sat_list",JSON.stringify({at:now,partial:!!partial,list:list.map(function(x){ return {name:x.name,title:x.title,score:x.score}; })})); }catch(e){}
}
function fullSatList(){
  return getXml(CAPS_ALL).then(function(doc){
    var l=listSat(doc); if(!l.length) throw new Error("keine Satellitenebene");
    var now=Date.now(); l.forEach(function(x){ x.at=now; });
    saveSat(l,false); return l;
  });
}
function loadSatList(){
  try{
    var c=JSON.parse(localStorage.getItem("sat_list")||"null");
    if(c&&c.list&&c.list.length&&Date.now()-c.at<30*24*3600*1000) return Promise.resolve(c.list);
  }catch(e){}
  return probeSat().then(function(list){
    if(list.length){ saveSat(list,true); return list; }
    return fullSatList();
  });
}
var satEnriched=false;
function enrichSat(){   // im Hintergrund: weitere Satellitenebenen für die Auswahlliste suchen (höchstens einmal pro Woche)
  if(satEnriched) return; satEnriched=true;
  var c=null, at=0; try{ c=JSON.parse(localStorage.getItem("sat_list")||"null"); at=+localStorage.getItem("sat_enrich_at")||0; }catch(e){}
  if(!c||!c.partial||Date.now()-at<7*24*3600*1000) return;
  try{ localStorage.setItem("sat_enrich_at",String(Date.now())); }catch(e){}
  fullSatList().then(function(l){ satList=l; fillSel(); }).catch(function(){});
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
  if(rMode!=="prog"&&radarMap&&!rLayers[i]&&rTimes[i]) makeLayer(i,false);
  rLayers.forEach(function(l,k){ if(l) l.setOpacity(k===i?rOpacity:0); });
  var sl=$("rslide"); if(sl) sl.value=i;
  var tl=$("rtime"); if(tl&&rTimes[i]){ tl.textContent=rLabel(i); tl.className="tn"+(rMeta[i]&&rMeta[i].fc?" fc":""); }
  if(rMode==="prog") markDay(i);
}
function rLabel(i){
  var d=rTimes[i]; if(!d) return "";
  if(rMode==="prog") return d.toLocaleString("de-DE",{weekday:"short",day:"2-digit",month:"2-digit",hour:"2-digit",timeZone:TZ}).replace(",","");
  var hm=d.toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit",timeZone:TZ})+" Uhr";
  if(rMode==="sat"||!rMeta.length) return hm;
  var dm=Math.round((d.getTime()-Date.now())/300000)*5, m=rMeta[i];
  var rel=i===rNowIdx?"aktuell":(m&&m.fc?"in "+Math.max(5,dm)+" Min · Vorhersage":"vor "+Math.max(5,-dm)+" Min");
  return hm+"\n"+rel;
}
function rStop(){ rPlaying=false; clearTimeout(rTimer); var b=$("rplay"); if(b) b.textContent="▶"; }
function rPlay(){
  rPlaying=true; var b=$("rplay"); if(b) b.textContent="⏸";
  (function step(){
    if(!rPlaying) return;
    var next=(rIdx+1)%rLayers.length;
    rShow(next);
    rTimer=setTimeout(step,next===rLayers.length-1?1800:(rMeta.length&&next===rNowIdx?1300:(rMode==="prog"?380:450)));
  })();
}
function wmsOpts(extra){
  var o={layers:rLayerName,format:"image/png",transparent:true,version:"1.3.0",opacity:rOpacity,tileSize:512,keepBuffer:1,updateWhenIdle:true,updateWhenZooming:false,interpolations:rMode==="sat"?"bilinear":"nearest neighbor",attribution:rMode==="sat"?"Satellit: DWD/EUMETSAT":"Radar: DWD"};
  for(var k in extra) o[k]=extra[k]; return o;
}
function clearLayers(){
  rGen++; rProgTxt=""; rLayers.forEach(function(l){ if(l) radarMap.removeLayer(l); }); rLayers=[]; rKeys=[];
  if(rStatic){ radarMap.removeLayer(rStatic); rStatic=null; }
}
function makeLayer(i,visible){
  if(rLayers[i]) return rLayers[i];
  var ex={time:rTimes[i].toISOString(),opacity:visible?rOpacity:0};
  if(rMeta[i]&&rMeta[i].layer) ex.layers=rMeta[i].layer;
  rLayers[i]=L.tileLayer.wms(WMS_URL,wmsOpts(ex)).addTo(radarMap);
  return rLayers[i];
}
function allLoaded(gen){
  if(gen!==rGen) return;
  rLoadedAll=true; rProgTxt=""; info();
  if((!REDUCED&&radarMap&&!radarMap._userStopped&&!rPlaying)||rWasPlaying) rPlay();
  rWasPlaying=false;
  if(rMode==="sat") setTimeout(enrichSat,1500);
}
var rWasPlaying=false;
// Bilder nacheinander (höchstens 2 gleichzeitig) laden, die dem aktuellen Bild nächsten zuerst
function loadRest(order,gen){
  var pos=0, active=0, loaded=0, total=order.length;
  if(!total){ allLoaded(gen); return; }
  function fin(){
    if(gen!==rGen) return;
    loaded++; rProgTxt=" · lädt weitere Bilder "+loaded+"/"+total+" …"; info();
    if(loaded>=total) allLoaded(gen); else pump();
  }
  function startOne(i){
    var l=makeLayer(i,false), done=false;
    active++;
    var f=function(){ if(done) return; done=true; active--; fin(); };
    l.once("load",f); setTimeout(f,9000);
  }
  function pump(){
    while(active<2&&pos<order.length&&gen===rGen) startOne(order[pos++]);
  }
  pump();
}
function buildFrames(times,meta){
  rWasPlaying=rPlaying; rStop(); rMeta=meta||[];
  var oldL={}; rLayers.forEach(function(l,i){ if(l&&rKeys[i]) oldL[rKeys[i]]=l; });
  if(rStatic){ radarMap.removeLayer(rStatic); rStatic=null; }
  if(times.length<2){   // keine Zeitreihe verfügbar: aktuelles Bild
    Object.keys(oldL).forEach(function(k){ radarMap.removeLayer(oldL[k]); }); rLayers=[]; rKeys=[]; rGen++;
    rStatic=L.tileLayer.wms(WMS_URL,wmsOpts({})).addTo(radarMap);
    $("rctl").hidden=true; return;
  }
  rTimes=times; var gen=++rGen; rLoadedAll=false;
  rKeys=times.map(function(d,i){ return ((rMeta[i]&&rMeta[i].layer)||rLayerName)+"|"+d.getTime(); });
  rLayers=new Array(times.length);
  rKeys.forEach(function(k,i){ if(oldL[k]){ rLayers[i]=oldL[k]; delete oldL[k]; } });   // schon geladene Bilder behalten
  Object.keys(oldL).forEach(function(k){ radarMap.removeLayer(oldL[k]); });
  $("rslide").max=times.length-1; $("rctl").hidden=false;
  rNowIdx=times.length-1; if(rMeta.length){ for(var q=rMeta.length-1;q>=0;q--){ if(!rMeta[q].fc){ rNowIdx=q; break; } } }
  makeLayer(rNowIdx,true); rShow(rNowIdx);          // zuerst nur das aktuelle Bild
  var order=[]; for(var z=0;z<times.length;z++){ if(z!==rNowIdx&&!rLayers[z]) order.push(z); }
  order.sort(function(a,b){ return Math.abs(a-rNowIdx)-Math.abs(b-rNowIdx); });
  var cur=rLayers[rNowIdx];
  var go=function(){ loadRest(order,gen); };
  var first=false, start=function(){ if(first) return; first=true; go(); };
  cur.once("load",start); setTimeout(start,6000);
}
function radarFcText(){
  var last=-1; rMeta.forEach(function(m,i){ if(m.fc) last=i; });
  if(last<0) return "";
  var min=Math.round((rTimes[last].getTime()-Date.now())/60000/30)*30;
  return " und Radarvorhersage für die nächsten "+String(min/60).replace(".",",")+" Stunden";
}
function info(){
  var e=$("rinfo"); if(!e) return;
  var t= rMode==="sat"
    ? "Satellitenbild"+(satPick?" ("+satPick.title+")":"")+" des Deutschen Wetterdienstes, aktualisiert sich alle paar Minuten · Karte: OpenStreetMap"
    : rMode==="prog"
    ? (progKind==="cloud"
        ? "Modellprognose für die Bewölkung (Open-Meteo, Raster ca. 10 km, stündlich). Zeigt große Wolkenfelder, kein Satellitenbild · Karte: OpenStreetMap"
        : "Modellprognose für den Niederschlag (Open-Meteo, Raster ca. 10 km, Stundenwerte in L/qm je Stunde). Zeigt Regengebiete grob, keine einzelnen Schauer · Karte: OpenStreetMap")
    : "Niederschlagsradar des Deutschen Wetterdienstes: letzte 1,5 Stunden"+radarFcText()+", aktualisiert sich alle 5 Minuten · Karte: OpenStreetMap";
  e.textContent=t+(rMode==="prog"?"":rProgTxt);
}
function refreshRadar(){
  if(rMode==="prog"){
    if(rLayers.length&&Date.now()-progAt<3*3600*1000) return;   // Prognose wird nur selten neu gebaut
    var pm=++rReq;
    loadProg().then(function(P){ if(pm===rReq){ buildProg(P); info(); } }).catch(function(){
      if(pm!==rReq) return;
      clearLayers(); rStop(); $("rctl").hidden=true; $("rdays").hidden=true; $("rleg").hidden=true; $("rkind").hidden=true;
      var e=$("rinfo"); if(e) e.textContent="Die Modellprognose ist gerade nicht verfügbar. Bitte später erneut versuchen oder auf „Regenradar“ wechseln.";
    });
    return;
  }
  var my=++rReq, sat=rMode==="sat";
  (sat?fetchSatTimes():fetchRadarFrames().then(function(fr){ return {times:fr.map(function(f){return f.t}),meta:fr}; })).then(function(t){ if(my===rReq){ if(sat) buildFrames(t); else buildFrames(t.times,t.meta); info(); } })
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
  rOpacity= m==="sat" ? 0.9 : (m==="prog" ? 0.85 : 0.75);
  rMeta=[]; $("rdays").hidden=(m!=="prog"); $("rleg").hidden=(m!=="prog"); $("rkind").hidden=(m!=="prog");
  var bs=document.querySelectorAll(".rmode button"); for(var i=0;i<bs.length;i++) bs[i].className= bs[i].getAttribute("data-m")===m?"on":"";
  var e=$("rinfo"); if(e) e.textContent="Lädt …";
  var sel=$("rsat"); if(sel) sel.hidden=true;
  radarMap._userStopped=(m==="prog");
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
.fc .gs{font-weight:500;font-size:11.5px;color:var(--a-mute)}
.gs.hot,.fc .gs.hot{color:var(--crit,#c23a3a);font-weight:700}
.fc .pp{display:inline-flex;align-items:center;gap:3px;font-size:13px;font-weight:700;color:var(--a-rain)}
.fc .pp svg{width:13px;height:13px}
.fc .dtabs{margin-top:14px}
.fc .ptabs{margin-top:14px}
.fc .stt{font-size:13.5px;font-weight:700;color:var(--a-ink2);margin:14px 0 2px}
.fc .lgd .tl{margin-top:6px}
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
    rh:mean(col("relative_humidity_2m")), dew:mean(col("dew_point_2m")), pres:mean(col("pressure_msl")), cc:mean(col("cloud_cover")),
    th:ix.some(function(i){ return h.weather_code[i]>=95&&(h.precipitation[i]||0)>=0.1; }),
    sn:ix.some(function(i){ return !!SNOWC[h.weather_code[i]]&&(h.precipitation[i]||0)>=0.1; }),
    fg:ix.length>0&&ix.filter(function(i){ return h.weather_code[i]===45||h.weather_code[i]===48; }).length>=Math.ceil(ix.length/2)
  };
}
/* ---------- Wettersymbole als SVG: Regenmenge = Anzahl der Tropfen im Symbol (0 bis 7) ---------- */
var WXDEFS='<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>'+
  '<linearGradient id="wxc1" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="30"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#b4c2d6"/></linearGradient>'+
  '<linearGradient id="wxc2" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="30"><stop offset="0" stop-color="#e4e9f0"/><stop offset="1" stop-color="#9aa9bd"/></linearGradient>'+
  '<linearGradient id="wxc3" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="30"><stop offset="0" stop-color="#b8c3d2"/><stop offset="1" stop-color="#6c7b90"/></linearGradient>'+
  '<linearGradient id="wxs" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe680"/><stop offset="1" stop-color="#f6a21d"/></linearGradient>'+
  '<linearGradient id="wxd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#86ccff"/><stop offset="1" stop-color="#2a78d6"/></linearGradient>'+
  '<linearGradient id="wxb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe86e"/><stop offset="1" stop-color="#ffab00"/></linearGradient>'+
  '<linearGradient id="wxm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe58a"/><stop offset="1" stop-color="#e9a516"/></linearGradient>'+
  '</defs></svg>';
function cloudSvg(x,y,s,grad){
  var f='url(#'+grad+')';
  return '<g transform="translate('+x+' '+y+') scale('+s+')"><circle cx="11" cy="19" r="9" fill="'+f+'"/><circle cx="23" cy="12" r="12" fill="'+f+'"/><circle cx="34" cy="19.5" r="9" fill="'+f+'"/><rect x="2" y="19" width="40" height="10" rx="5" fill="'+f+'"/></g>';
}
function sunSvg(cx,cy,r){
  var rays='';
  for(var i=0;i<8;i++){
    var a=i*Math.PI/4, r1=r+3.2, r2=r+7;
    rays+='<line x1="'+(cx+Math.cos(a)*r1).toFixed(1)+'" y1="'+(cy+Math.sin(a)*r1).toFixed(1)+'" x2="'+(cx+Math.cos(a)*r2).toFixed(1)+'" y2="'+(cy+Math.sin(a)*r2).toFixed(1)+'"/>';
  }
  return '<g stroke="#f7b52c" stroke-width="2.6" stroke-linecap="round">'+rays+'</g><circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="url(#wxs)"/>';
}
function moonSvg(cx,cy,r){
  var ax=(cx+r*0.28).toFixed(1), y1=(cy-r*0.96).toFixed(1), y2=(cy+r*0.96).toFixed(1), r2=(r*0.82).toFixed(1);
  return '<path d="M'+ax+' '+y1+'A'+r+' '+r+' 0 1 0 '+ax+' '+y2+'A'+r2+' '+r2+' 0 0 1 '+ax+' '+y1+'Z" fill="url(#wxm)"/>';
}
var WX_DROP="M5 0C7.4 3.6 10 6.6 10 9.4A5 5 0 0 1 0 9.4C0 6.6 2.6 3.6 5 0Z";
// Anordnung der Tropfen (Mitte x, Oberkante y, Breite, Höhe) je Anzahl
var WX_LAYOUT={
  1:[[32,41,12,17]],
  2:[[23,42,11,16],[41,42,11,16]],
  3:[[16,42,10,15],[32,42,10,15],[48,42,10,15]],
  4:[[13,42,9,14],[26,42,9,14],[38,42,9,14],[51,42,9,14]],
  5:[[14,40,9,11.5],[30,40,9,11.5],[46,40,9,11.5],[22,52,9,11.5],[38,52,9,11.5]],
  6:[[14,40,9,11.5],[30,40,9,11.5],[46,40,9,11.5],[22,52,9,11.5],[38,52,9,11.5],[54,52,9,11.5]],
  7:[[10,40,8.4,11],[24,40,8.4,11],[38,40,8.4,11],[52,40,8.4,11],[17,52,8.4,11],[31,52,8.4,11],[45,52,8.4,11]]
};
function dropsSvg(n,snow){
  var L=WX_LAYOUT[Math.max(1,Math.min(7,n))], o='';
  L.forEach(function(d){
    if(snow){
      var r=Math.min(d[2],d[3])*0.55, cx=d[0], cy=d[1]+d[3]/2;
      o+='<g stroke="#6fa9e6" stroke-width="1.7" stroke-linecap="round">';
      for(var k=0;k<3;k++){ var a=k*Math.PI/3; o+='<line x1="'+(cx-Math.cos(a)*r).toFixed(1)+'" y1="'+(cy-Math.sin(a)*r).toFixed(1)+'" x2="'+(cx+Math.cos(a)*r).toFixed(1)+'" y2="'+(cy+Math.sin(a)*r).toFixed(1)+'"/>'; }
      o+='</g>';
    } else {
      o+='<path transform="translate('+(d[0]-d[2]/2)+' '+d[1]+') scale('+(d[2]/10).toFixed(3)+' '+(d[3]/14).toFixed(3)+')" d="'+WX_DROP+'" fill="url(#wxd)"/>';
    }
  });
  return o;
}
var WX_TH={1:[[50,43,8,11]],2:[[13,43,8,11],[51,43,8,11]],3:[[13,43,8,11],[51,43,8,11],[51,54,8,10]],4:[[13,43,8,11],[13,54,8,10],[51,43,8,11],[51,54,8,10]]};
function thDropsSvg(n){
  var o='';
  (WX_TH[Math.max(1,Math.min(4,n))]).forEach(function(d){ o+='<path transform="translate('+(d[0]-d[2]/2)+' '+d[1]+') scale('+(d[2]/10).toFixed(3)+' '+(d[3]/14).toFixed(3)+')" d="'+WX_DROP+'" fill="url(#wxd)"/>'; });
  return o;
}
function boltSvg(){ return '<path d="M35 36 24 53h7l-4 11 14-19h-8z" fill="url(#wxb)" stroke="#e59a00" stroke-width="0.8" stroke-linejoin="round"/>'; }
// sp: {sky:"clear|mclear|part|mcloud|cloud|moon|mooncloud|fog", n:Tropfenzahl, snow, th, sun}
function wxSvg(sp){
  var g='', n=sp.n||0;
  if(n>0||sp.th){
    var grad=sp.th?'wxc3':(n>=5?'wxc3':(n>=3?'wxc2':'wxc1'));
    if(sp.sun) g+=sunSvg(20,17,9);
    g+=cloudSvg(sp.sun?12:7,sp.sun?10:5,sp.sun?1.0:1.15,grad);
    if(sp.th){ if(n>0) g+=thDropsSvg(n); g+=boltSvg(); }
    else if(n>0) g+=dropsSvg(n,sp.snow);
  } else if(sp.sky==="fog"){
    g+=cloudSvg(9,8,1.05,'wxc1')+'<g stroke="#a9b6c6" stroke-width="3.2" stroke-linecap="round"><line x1="12" y1="46" x2="52" y2="46"/><line x1="18" y1="53" x2="58" y2="53"/><line x1="10" y1="60" x2="42" y2="60"/></g>';
  } else switch(sp.sky){
    case "clear":    g=sunSvg(32,32,14); break;
    case "mclear":   g=sunSvg(26,26,12)+cloudSvg(26,31,0.72,'wxc1'); break;
    case "part":     g=sunSvg(22,22,10)+cloudSvg(14,24,1.0,'wxc1'); break;
    case "mcloud":   g=sunSvg(19,19,8)+cloudSvg(7,19,1.15,'wxc1'); break;
    case "moon":     g=moonSvg(32,32,17); break;
    case "mooncloud":g=moonSvg(24,24,12)+cloudSvg(14,26,1.0,'wxc1'); break;
    default:         g=cloudSvg(17,11,0.95,'wxc2')+cloudSvg(6,22,1.15,'wxc1');   // bedeckt
  }
  return '<svg class="wxi" focusable="false" viewBox="0 0 64 64" width="1em" height="1em" aria-hidden="true">'+g+'</svg>';
}

document.body.insertAdjacentHTML("afterbegin",WXDEFS);
// Wettersymbol aus Menge, Bewölkung und Wetterart (nicht nur aus dem Wettercode, der schon bei Spuren von Regen "Regen" meldet)
// Tropfenzahl 1 (ganz wenig) bis 7 (Starkregen); Schwellen in L/qm je Zeitraum
var DROP_T={hour:[0.1,0.3,0.7,1.5,3,6,10],period:[0.2,0.5,1.5,3,6,12,20],day:[0.3,1,3,6,12,20,35]};
function dropScale(mm,scope){ var T=DROP_T[scope]||DROP_T.day, n=0; for(var i=0;i<7;i++){ if((mm||0)>=T[i]) n=i+1; } return n; }
function wxIcon(o){
  var T=o.scope==="hour"?{rel:0.1,lo:0.5,hi:2.5}:o.scope==="period"?{rel:0.2,lo:1,hi:5}:{rel:0.3,lo:1,hi:8};
  var mm=o.mm||0, cc=(o.cc==null?50:o.cc), day=!!o.day, n=dropScale(mm,o.scope||"day");
  if(mm>=T.rel){
    n=Math.max(1,n);
    if(o.th) return [wxSvg({n:n,th:true}),"Gewitter","storm"];
    if(o.sn) return [wxSvg({n:n,snow:true}),mm<T.lo?"leichter Schneefall":"Schneefall","snow"];
    var sun=day&&cc<70&&n<=3;
    if(mm<T.lo) return [wxSvg({n:n,sun:sun}),"leichter Regen","rain"];
    if(mm<T.hi) return [wxSvg({n:n}),"Regen","rain"];
    return [wxSvg({n:n}),"kräftiger Regen","rain"];
  }
  if(o.fg) return [wxSvg({sky:"fog"}),"Nebel","fog"];
  var sky=day?(cc<15?"clear":cc<40?"mclear":cc<65?"part":cc<88?"mcloud":"cloud"):(cc<30?"moon":cc<65?"mooncloud":"cloud");
  return [wxSvg({sky:sky}),skyWord(cc,day),cc<40?"clear":"cloud"];
}
function periodWx(a){ return wxIcon({scope:"period",mm:a.mm,cc:a.cc,day:a.day,th:a.th,sn:a.sn,fg:a.fg}); }
function dayWx(k){
  var d=FC.d, A=agg(idxFor(d.time[k],0,24)), D=dayAgg(k);
  return wxIcon({scope:"day",mm:d.precipitation_sum[k],cc:D.cc,day:1,th:A.th,sn:A.sn,fg:A.fg});
}
function gustHtml(g,ws){ return (g!=null&&g>=1)?'<span class="gs'+(g>=60?' hot':'')+'">('+r(g)+')</span>':''; }
function dayWord(att){var d0=FC.now.slice(0,10);return att===d0?"heute":att===addDay(d0,1)?"morgen":DAYN[new Date(att+"T12:00:00").getDay()]}
function nightTag(date){return "zum "+DAYN[new Date(date+"T12:00:00").getDay()]}
var TABS=[[1,0],[2,0],[3,0],[0,1]];   // [Index in PARTS, Tagesversatz]: Vormittag, Nachmittag, Abend, Nacht (zum Folgetag)
function periods(k){
  var date=FC.d.time[k], out=[];
  TABS.forEach(function(e){
    var dd=addDay(date,e[1]), ix=idxFor(dd,PARTS[e[0]].a,PARTS[e[0]].b);
    if(!ix.length) return;
    var a=agg(ix); a.name=PARTS[e[0]].n; a.tag=e[0]===0?nightTag(dd):""; out.push(a);
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
  var lab=dayWx(k)[1];
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
  var lab=periodWx(a)[1];
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

var M24OPEN=false, selInit=false;
function pad2(n){return (n<10?"0":"")+n}
function stripStartFor(k,p){ var date=FC.d.time[k]; return p===3?{date:addDay(date,1),hr:0}:{date:date,hr:[6,12,18][p]}; }
// Stundenwerte ab Beginn des gewählten Tagesabschnitts (bereits vergangene Stunden aus den Messwerten der Station)
function fcSlots(k,p){
  var st=stripStartFor(k,p), h=FC.h, i1=h.time.indexOf(st.date+"T"+pad2(st.hr)+":00");
  if(i1<0) return [];
  var nowH=Math.floor(Date.now()/3600000)*3600, ah={}, out=[];
  if(ARC) ARC.hours.forEach(function(r){ ah[r.t]=r; });
  for(var i=i1;i<Math.min(i1+AHEAD,h.time.length);i++){
    var s=i-FC.i0, o={s:s,date:h.time[i].slice(0,10),hr:+h.time[i].slice(11,13),t:null,mm:null,ws:null,dir:null,pop:null,code:null,gust:null,cc:null,day:h.is_day[i]};
    if(s>=0){ o.t=h.temperature_2m[i]; o.mm=h.precipitation[i]; o.ws=h.wind_speed_10m[i]; o.dir=h.wind_direction_10m[i]; o.gust=h.wind_gusts_10m[i]; o.cc=h.cloud_cover[i]; o.pop=h.precipitation_probability[i]; o.code=h.weather_code[i]; }
    else{ var rw=ah[nowH+s*3600]; if(rw){ o.t=rw.temp; o.mm=rw.mm; o.ws=rw.wind; o.dir=rw.dir; o.gust=rw.gust; } }
    out.push(o);
  }
  return out;
}
function dayrowHtml(slots){
  var today=berlin(Math.floor(Date.now()/3600000)*3600).date, starts=[], html='<div class="dayrow">';
  slots.forEach(function(o,i){ if(i===0||o.hr===0) starts.push(i); });
  starts.forEach(function(st,k){
    var len=(k+1<starts.length?starts[k+1]:slots.length)-st;
    html+='<div class="dseg" style="width:'+(len*COL)+'px">'+(len>=3?'<span>'+esc(dayWordFor(slots[st].date,today))+'</span>':'')+'</div>';
  });
  return html+'</div>';
}
function m24Html(){
  if(!ARC||!ARC.hours.length) return '';
  var past=buildSlots().slots.filter(function(o){return o.s<0});
  if(!past.length) return '';
  return '<details class="lgd m24"'+(M24OPEN?' open':'')+'><summary>Messwerte der letzten 24 Stunden</summary>'+
    '<div class="tl"><div class="in" style="width:'+(past.length*COL)+'px">'+dayrowHtml(past)+stripHtml(past)+'</div></div></details>';
}
function fcRender(){
  if(!FC) return;
  var h=FC.h, d=FC.d;
  if(selD>=d.time.length) selD=0;
  var P=periods(selD);
  if(selP>=P.length) selP=Math.max(0,P.length-1);
  var drop='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC.drop+'</svg>';

  var ptabs=P.map(function(a,i){
    var w=periodWx(a);
    return '<button type="button" role="tab" class="ptab'+(i===selP?' on':'')+'" data-p="'+i+'" aria-selected="'+(i===selP)+'" title="'+esc(w[1])+'">'+
      '<span class="pn">'+a.name+'</span><span class="pt tn" style="color:'+tcol(a.t)+'">'+r(a.t)+'°</span><span class="pi">'+w[0]+'</span>'+
      '<span class="pw">'+(a.ws>=1?windRose(a.dir,18,a.ws)+'<b>'+r(a.ws)+'</b>'+gustHtml(a.gust):'')+'</span><span class="pp">'+drop+r(a.pop)+' %</span><span class="pq">'+(a.mm>=0.1?fmtL(a.mm):'0')+' L/qm</span></button>';
  }).join("");

  var dtabs=d.time.map(function(t,k){
    var dt=new Date(t+"T12:00:00"), w=dayWx(k), hi=d.temperature_2m_max[k], lo=d.temperature_2m_min[k];
    var nm=k===0?"heute":k===1?"morgen":DAYN[dt.getDay()];
    var date=t.slice(8,10)+"."+t.slice(5,7)+".", da=dayAgg(k);
    var ss=d.sunshine_duration?Math.round(d.sunshine_duration[k]/3600):null;
    var pr=d.precipitation_probability_max[k];
    return '<button type="button" role="tab" class="dtab'+(k===selD?' on':'')+'" data-d="'+k+'" aria-selected="'+(k===selD)+'" title="'+esc(w[1])+'">'+
      '<span class="dth"><b>'+nm+'</b>'+date+'</span><span class="dbd">'+
      '<span class="hi tn" style="color:'+tcol(hi)+'">'+r(hi)+'°</span><span class="lo tn" style="color:'+tcol(lo)+'">'+r(lo)+'°</span>'+
      '<span class="di">'+w[0]+'</span><span class="dw">'+windRose(da.dir,18,da.ws)+'<b>'+r(da.ws)+'</b>'+gustHtml(d.wind_gusts_10m_max[k])+'</span>'+
      '<span class="dm">'+(ss!=null?svg("sun",14)+ss+' h':'')+'</span><span class="dm rn">'+drop+r(pr)+' %</span><span class="dm rn">'+(d.precipitation_sum[k]>=0.1?fmtL(d.precipitation_sum[k]):'0')+' L/qm</span></span></button>';
  }).join("");

  // Stundenleiste ab Beginn des gewählten Abschnitts
  var slots=fcSlots(selD,selP), key=selD+"|"+selP, stHtml='';
  if(slots.length){
    var st=stripStartFor(selD,selP), today=berlin(Math.floor(Date.now()/3600000)*3600).date;
    stHtml='<div class="stt">Stündlich ab '+esc(dayWordFor(st.date,today))+', '+pad2(st.hr)+' Uhr</div>'+
      '<div class="tl" data-key="'+key+'"><div class="in" style="width:'+(slots.length*COL)+'px">'+dayrowHtml(slots)+stripHtml(slots)+'</div></div>'+
      '<details class="lgd"'+(LGOPEN?' open':'')+'><summary>Legende</summary>'+
      '<div class="olnote lg">Regenmenge je Stunde: <b class="m1">gemessen</b> · <b class="m2">vorhergesagt</b> (L/qm). Windpfeil: zeigt, wohin der Wind weht; Farbe von schwarz (schwach) bis rot (stark). Zahl = mittlerer Wind in km/h, in Klammern die Böen in km/h. Im Wettersymbol zeigt die Zahl der Tropfen die Regenmenge: 1 Tropfen = ganz wenig, 7 Tropfen = Starkregen. Bereits vergangene Stunden zeigen die Messwerte der Station.</div></details>';
  }

  fcHtml='<section class="card full fc tp"><h2>Vorhersage%CHIP%</h2>'+
    '<div class="ddet">'+dayDetail(selD)+'</div>'+
    '<div class="dtabs" role="tablist" aria-label="Tage">'+dtabs+'</div>'+
    '<div class="ptabs" role="tablist" aria-label="Tagesabschnitte" style="--np:'+Math.max(P.length,1)+'">'+ptabs+'</div>'+
    stHtml+
    (P.length?periodDetail(P[selP]):'')+
    m24Html()+
    '<div class="olnote">Modellvorhersage für Wincheringen · Open-Meteo · Warnungen: DWD über Brightsky. Wind in km/h: mittlere Geschwindigkeit, in Klammern die Böen.</div></section>';

  var sc=document.querySelector("#outlook .dtabs"), left=sc?sc.scrollLeft:0;
  var tl0=document.querySelector("#outlook .fc > .tl"), keyOld=tl0?tl0.getAttribute("data-key"):null, leftOld=tl0?tl0.scrollLeft:0;
  renderOutlook();
  sc=document.querySelector("#outlook .dtabs"); if(sc) sc.scrollLeft=left;
  var tl1=document.querySelector("#outlook .fc > .tl"); if(tl1) tl1.scrollLeft=(keyOld===key)?leftOld:0;
  var m=document.querySelector("#outlook .m24 .tl"); if(m&&M24OPEN) m.scrollLeft=m.scrollWidth;
}

$("outlook").addEventListener("toggle",function(e){
  var el=e.target; if(!el.classList||!el.classList.contains("lgd")) return;
  if(el.classList.contains("m24")){ M24OPEN=el.open; if(el.open){ var sc=el.querySelector(".tl"); if(sc) sc.scrollLeft=sc.scrollWidth; } }
  else LGOPEN=el.open;
},true);
function buildForecast(j){
  var h=j.hourly, d=j.daily, now=nowLocal().slice(0,13)+":00";
  var i0=0; while(i0<h.time.length&&h.time[i0]<now) i0++;
  if(i0>=h.time.length) i0=h.time.length-1;
  FC={h:h,d:d,now:now,i0:i0};
  if(!selInit){ var H0=+now.slice(11,13); selP=H0>=18?2:(H0>=12?1:0); selInit=true; }   // Start: aktueller Tagesabschnitt
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
  if(b.hasAttribute("data-p")) selP=+b.getAttribute("data-p"); else { selD=+b.getAttribute("data-d"); }
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
.tp .ht{font-family:var(--a-disp);font-weight:700;font-size:15px}
.tp .hp{font-size:11px;font-weight:700;color:var(--a-ink2);min-height:14px;white-space:nowrap}
.dps{display:inline-flex;align-items:flex-end;gap:1px;min-height:12px;color:inherit}
.dps svg{display:block}
.fc .dm .dps svg{width:9px;height:13px}
.dps .dp{fill:currentColor;opacity:.18}
.dps .dp.on{opacity:1}
.fc .pd{display:flex;justify-content:center;min-height:13px;color:var(--a-rain)}
.wxi{display:inline-block;vertical-align:middle;overflow:visible;filter:drop-shadow(0 1px 1.2px rgba(20,40,70,.35))}
.fc .di,.fc .pi{font-size:46px;line-height:1.1;display:flex;justify-content:center}
.tp .hc .hi{font-size:34px;line-height:1.1;min-height:36px}
.wk .cw .e{font-size:68px}
.tp .hm{font-size:11px;font-weight:700;min-height:26px;white-space:nowrap;display:flex;flex-direction:column;align-items:center;line-height:1.1}
.tp .hm .u{font-size:9px;font-weight:600;opacity:.9}
.tp .m1{color:var(--a-rain)}
.tp .m2{color:var(--a-ext)}
.tp .hw .gs{font-style:normal;font-weight:500;color:var(--a-mute)}
.tp .hw .gs.hot{color:var(--crit,#c23a3a);font-weight:700}
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
      if(rw){ o.t=rw.temp; o.mm=rw.mm; o.ws=rw.wind; o.dir=rw.dir; o.gust=rw.gust; }
    }
    slots.push(o);
  }
  return {slots:slots,lo:lo,today:berlin(nowH).date};
}

function heroHtml(){
  var h=FC.h, d=FC.d, i0=FC.i0, L=ARC&&ARC.latest, st=!!(L&&L.temp!=null);
  var t=st?L.temp:h.temperature_2m[i0], c0=h.weather_code[i0];
  var mm0=(st&&L.rainrate!=null)?(L.rainrate>0.05?Math.max(L.rainrate,0.1):0):h.precipitation[i0];   // Messung der Station vor Modell
  var w0=wxIcon({scope:"hour",mm:mm0,cc:h.cloud_cover[i0],day:h.is_day[i0],th:c0>=95,sn:!!SNOWC[c0],fg:c0===45||c0===48});
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
  return '<section class="card full wk"><div class="hz sk-'+w0[2]+'">'+
    '<div class="hd"><b>Wincheringen-Mont</b><span class="st'+(old?' old':'')+'">'+esc(stamp)+'</span></div>'+
    '<div class="bg2"><div class="tmp tn" style="color:'+tcol(t)+'">'+num1(t)+'<small>°C</small></div>'+
    '<div class="cw"><div class="e">'+w0[0]+'</div><div class="n">'+esc(w0[1])+'</div></div></div>'+
    '<div class="chips">'+chips+'</div></div>'+
    '</section>';
}

function stripHtml(slots){
  return '<div class="strip">'+slots.map(function(o){
    var past=o.s<0, w=past?((o.mm!=null&&o.mm>=0.1)?wxIcon({scope:"hour",mm:o.mm,cc:90,day:0}):null):wxIcon({scope:"hour",mm:o.mm,cc:o.cc,day:o.day,th:o.code>=95,sn:!!SNOWC[o.code],fg:o.code===45||o.code===48});
    var mm=(o.mm!=null&&o.mm>=0.05)?'<span>'+fmtL(o.mm)+'</span><span class="u">L/qm</span>':'';
    var wind=o.ws!=null?'<div class="hw">'+(o.dir!=null?windRose(o.dir,20,o.ws):'')+'<span>'+r(o.ws)+(o.gust!=null?' <i class="gs'+(o.gust>=60?' hot':'')+'">('+r(o.gust)+')</i>':'')+'</span></div>':'<div class="hw"></div>';
    return '<div class="hc'+(past?' past':'')+(o.s===0?' now':'')+'"><div class="hh">'+(o.s===0?'Jetzt':o.hr+' Uhr')+'</div>'+
      '<div class="hi"'+(w?' title="'+esc(w[1])+'"':'')+'>'+(w?w[0]:'')+'</div>'+
      '<div class="ht tn"'+(o.t!=null?' style="color:'+tcol(o.t)+'"':'')+'>'+(o.t!=null?r(o.t)+'°':'–')+'</div>'+
      '<div class="hp">'+(past?'':(o.pop>=10?o.pop+' %':''))+'</div>'+
      '<div class="hm '+(past?'m1':'m2')+'">'+mm+'</div>'+wind+'</div>';
  }).join("")+'</div>';
}

function renderTop(){
  var root=$("hourly"); if(!root||!FC) return;
  root.innerHTML='<div class="ol">'+heroHtml()+'</div>';
}
function fromSeries(rows){
  var by={}, hours=[];
  rows.forEach(function(x){var k=Math.floor(x.t/3600)*3600;(by[k]=by[k]||[]).push(x)});
  Object.keys(by).sort().forEach(function(k){var g=by[k];hours.push({t:+k,temp:mn(col(g,"temp")),wind:mn(col(g,"wind")),gust:mx(col(g,"gust")),dir:null,mm:mn(col(g,"rainrate"))})});
  var l=rows.length?rows[rows.length-1]:null;
  return {hours:hours,latest:l?{ts:l.t,temp:l.temp,hum:l.hum,press:l.press,wind:l.wind,gust:l.gust,dir:null,rain:null}:null};
}
function loadArchive(){
  function done(){lastArc=Date.now();renderTop();fcRender()}
  function ok(x){if(!x.ok)throw new Error(x.status);return x.json()}
  fetch(ARCH+"/api/hourly?hours=24").then(ok).then(function(j){
    if(!j||!j.rows) throw new Error("kein hourly");
    ARC={hours:j.rows,latest:j.latest||null}; done();
  }).catch(function(){
    fetch(ARCH+"/api/series?range=24h").then(ok).then(function(j){ARC=fromSeries((j&&j.rows)||[]);done()})
     .catch(function(){ if(ARC===null){ARC={hours:[],latest:null};renderTop();fcRender();} });
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


/* ---------- Modellprognose für den Niederschlag auf der Karte (Open-Meteo-Raster, stündlich, 3 Tage) ---------- */
var PGCSS=`
.rdays{display:flex;gap:6px;margin-top:8px;flex-wrap:wrap}
.rdays button{padding:6px 12px;border-radius:999px;border:1px solid var(--a-line);background:var(--a-card2);color:var(--a-ink);font:600 13px var(--a-body);cursor:pointer}
.rdays button.on{background:var(--a-wind);border-color:transparent;color:#fff}
.rleg{margin-top:8px}
.rdays[hidden],.rleg[hidden]{display:none}
.rleg .bar9{display:flex;height:12px;border-radius:6px;overflow:hidden;border:1px solid var(--a-line)}
.rleg .bar9 i{flex:1}
.rleg .lab9{display:flex;justify-content:space-between;font-size:11.5px;color:var(--a-ink2);margin-top:3px}
#rtime{white-space:pre-line;min-width:112px!important;text-align:right;font-size:12.5px;line-height:1.25}
#rtime.fc{color:var(--a-ext);font-weight:700}
`;
var st5=document.createElement("style");st5.textContent=PGCSS;document.head.appendChild(st5);

var PG={n:15,dLat:0.64,dLon:0.96};
var PSTOPS=[[0.05,[180,220,255,0]],[0.1,[180,220,255,120]],[0.5,[100,176,255,170]],[1,[45,125,217,190]],[2,[31,182,106,200]],[4,[242,211,56,210]],[8,[240,138,36,220]],[15,[216,51,43,230]]];
function mmColor(v){
  if(v<PSTOPS[0][0]) return [0,0,0,0];
  var L=PSTOPS[PSTOPS.length-1];
  if(v>=L[0]) return L[1];
  for(var i=1;i<PSTOPS.length;i++){
    if(v<=PSTOPS[i][0]){
      var a=PSTOPS[i-1],b=PSTOPS[i],k=(v-a[0])/(b[0]-a[0]);
      return [0,1,2,3].map(function(j){return Math.round(a[1][j]+(b[1][j]-a[1][j])*k)});
    }
  }
  return [0,0,0,0];
}
var CSTOPS=[[10,[205,212,222,0]],[35,[196,205,217,90]],[65,[150,162,178,150]],[100,[86,98,118,210]]];
function cloudColor(v){
  if(v<=CSTOPS[0][0]) return [0,0,0,0];
  var L=CSTOPS[CSTOPS.length-1]; if(v>=L[0]) return L[1];
  for(var i=1;i<CSTOPS.length;i++){
    if(v<=CSTOPS[i][0]){
      var a=CSTOPS[i-1],b=CSTOPS[i],k=(v-a[0])/(b[0]-a[0]);
      return [0,1,2,3].map(function(j){return Math.round(a[1][j]+(b[1][j]-a[1][j])*k)});
    }
  }
  return [0,0,0,0];
}
var progKind="rain", progData=null;
try{ if(localStorage.getItem("prog_kind")==="cloud") progKind="cloud"; }catch(e){}
function loadProg(){
  try{
    var c=JSON.parse(localStorage.getItem("prog_grid_v2")||"null");
    if(c&&c.d&&c.lat===LAT&&c.lon===LON&&c.n===PG.n&&Date.now()-c.at<2.5*3600*1000){ progAt=c.at; return Promise.resolve(c.d); }
  }catch(e){}
  var lats=[],lons=[];
  for(var r=0;r<PG.n;r++) for(var c2=0;c2<PG.n;c2++){
    lats.push((LAT-PG.dLat+2*PG.dLat*r/(PG.n-1)).toFixed(3));
    lons.push((LON-PG.dLon+2*PG.dLon*c2/(PG.n-1)).toFixed(3));
  }
  var u="https://api.open-meteo.com/v1/forecast?latitude="+lats.join(",")+"&longitude="+lons.join(",")+
    "&hourly=precipitation,cloud_cover&timezone="+encodeURIComponent(TZ)+"&forecast_days=3";
  return fetch(u).then(function(x){ if(!x.ok) throw new Error(x.status); return x.json(); }).then(function(j){
    if(!Array.isArray(j)) j=[j];
    if(j.length!==PG.n*PG.n) throw new Error("unvollständig");
    var d={times:j[0].hourly.time,grid:j.map(function(o){ return o.hourly.precipitation.map(function(v){ return v==null?0:Math.round(v*10)/10; }); }),cloud:j.map(function(o){ return (o.hourly.cloud_cover||[]).map(function(v){ return v==null?0:Math.round(v); }); })};
    progAt=Date.now();
    try{ localStorage.setItem("prog_grid_v2",JSON.stringify({at:progAt,lat:LAT,lon:LON,n:PG.n,d:d})); }catch(e){}
    return d;
  });
}
function berlinEpoch(str){   // "2026-10-19T14:00" (Berliner Ortszeit) -> Unix-Sekunden
  var y=+str.slice(0,4), mo=+str.slice(5,7), d=+str.slice(8,10), h=+str.slice(11,13), base=Date.UTC(y,mo-1,d,h)/1000;
  var ep=base-7200, b=berlin(ep); if(b.date===str.slice(0,10)&&b.hr===h) return ep;
  return base-3600;
}
function progImage(vals,colorFn){
  var n=PG.n, W=96, H=96, cv=document.createElement("canvas"); cv.width=W; cv.height=H;
  var ctx=cv.getContext("2d"), im=ctx.createImageData(W,H);
  for(var y=0;y<H;y++){
    var gy=(1-y/(H-1))*(n-1), r0=Math.min(n-2,Math.floor(gy)), fy=gy-r0;
    for(var x=0;x<W;x++){
      var gx=x/(W-1)*(n-1), c0=Math.min(n-2,Math.floor(gx)), fx=gx-c0;
      var a=vals[r0*n+c0], b=vals[r0*n+c0+1], c=vals[(r0+1)*n+c0], d=vals[(r0+1)*n+c0+1];
      var v=(a*(1-fx)+b*fx)*(1-fy)+(c*(1-fx)+d*fx)*fy, col=colorFn(v), o=(y*W+x)*4;
      im.data[o]=col[0]; im.data[o+1]=col[1]; im.data[o+2]=col[2]; im.data[o+3]=col[3];
    }
  }
  ctx.putImageData(im,0,0);
  return cv.toDataURL("image/png");
}
function progLegend(){
  var lg=$("rleg"); lg.hidden=false;
  if(progKind==="cloud"){
    lg.innerHTML='<div class="bar9">'+[20,35,50,65,80,90,100].map(function(v){ var c=cloudColor(v); return '<i style="background:rgba('+c[0]+','+c[1]+','+c[2]+','+Math.max(c[3]/255,0.25)+')"></i>'; }).join("")+'</div>'+
      '<div class="lab9"><span>klar</span><span>heiter</span><span>wolkig</span><span>bedeckt (100 % Wolken)</span></div>';
  } else {
    lg.innerHTML='<div class="bar9">'+[0.1,0.5,1,2,4,8,15].map(function(v){ var c=mmColor(v); return '<i style="background:rgba('+c[0]+','+c[1]+','+c[2]+','+Math.max(c[3]/255,0.45)+')"></i>'; }).join("")+'</div>'+
      '<div class="lab9"><span>0,1</span><span>0,5</span><span>1</span><span>2</span><span>4</span><span>8</span><span>15 L/qm je Stunde</span></div>';
  }
  var bs=document.querySelectorAll("#rkind button");
  for(var k=0;k<bs.length;k++) bs[k].className=(bs[k].getAttribute("data-pk")===progKind)?"on":"";
}
function buildProg(P,keepIdx){
  progData=P;
  rStop(); clearLayers(); rMeta=[]; rTimes=[];
  var nowH=Math.floor(Date.now()/3600000)*3600, bounds=[[LAT-PG.dLat,LON-PG.dLon],[LAT+PG.dLat,LON+PG.dLon]];
  var src=(progKind==="cloud"&&P.cloud&&P.cloud.length)?P.cloud:P.grid, fn=(src===P.cloud)?cloudColor:mmColor;
  P.times.forEach(function(ts,h){
    var ep=berlinEpoch(ts); if(ep<nowH) return;
    var vals=src.map(function(g){ return g[h]||0; });
    var ov=L.imageOverlay(progImage(vals,fn),bounds,{opacity:0,interactive:false,attribution:"Prognose: Open-Meteo"}).addTo(radarMap);
    rLayers.push(ov); rTimes.push(new Date(ep*1000));
  });
  if(rLayers.length<2){ throw new Error("zu wenige Stunden"); }
  $("rslide").max=rLayers.length-1; $("rctl").hidden=false; $("rdays").hidden=false; $("rkind").hidden=false;
  progLegend();
  rShow(keepIdx!=null?Math.min(keepIdx,rLayers.length-1):progIndexFor(1));
}
function setProgKind(k){
  if(k===progKind) return;
  progKind=k; try{ localStorage.setItem("prog_kind",k); }catch(e){}
  if(rMode!=="prog"||!progData) return;
  var idx=rIdx; buildProg(progData,idx); info();
}
function progIndexFor(dj){   // Position des Tages dj (0 heute, 1 morgen, 2 übermorgen) um 6 Uhr
  if(dj===0) return 0;
  var today=berlin(Math.floor(Date.now()/1000)).date, want=addDay(today,dj);
  for(var i=0;i<rTimes.length;i++){ var b=berlin(Math.floor(rTimes[i].getTime()/1000)); if(b.date===want&&b.hr===6) return i; }
  return Math.min(rTimes.length-1,Math.max(0,dj*24-(new Date().getHours())));
}
function markDay(i){
  if(!rTimes[i]) return;
  var today=berlin(Math.floor(Date.now()/1000)).date, d=berlin(Math.floor(rTimes[i].getTime()/1000)).date;
  var dj=Math.round((Date.parse(d+"T12:00:00Z")-Date.parse(today+"T12:00:00Z"))/864e5);
  var bs=document.querySelectorAll("#rdays button");
  for(var k=0;k<bs.length;k++) bs[k].className=(+bs[k].getAttribute("data-dj")===dj)?"on":"";
}
$("outlook").addEventListener("click",function(e){
  var pk=e.target.closest?e.target.closest("[data-pk]"):null;
  if(pk){ setProgKind(pk.getAttribute("data-pk")); return; }
  var b=e.target.closest?e.target.closest("[data-dj]"):null; if(!b||rMode!=="prog"||!rLayers.length) return;
  rStop(); if(radarMap) radarMap._userStopped=true;
  rShow(progIndexFor(+b.getAttribute("data-dj")));
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
document.addEventListener("visibilitychange",function(){ if(!document.hidden){ loadWarn(); if(Date.now()-lastFc>10*60*1000) loadForecast(); if(Date.now()-lastArc>10*60*1000) loadArchive(); } });
})();
