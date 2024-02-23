import{LegacyText,DOS437En,ISO88591,Win1252EN}from"./module/text.js";(()=>{const n="retrotxt-active",e="retrotxt-font-amiga",s="retrotxt-font-msdos",a="retrotxt-font-windows",r="textAmiga",i="textMSDOS",o="textWin9x",c="textWrap",d="textUnicode",l="retrotxtWrap",m="pre-wrap",u=document.getElementById("retrotxt-canvas");if(null!==u&&0!==u.textContent.trim().length){var t=document.getElementsByTagName("head");if(0!==t.length){const v=u.textContent;var g=u.parentNode;var p=new class{constructor(t=""){this.set=t}css(){var t=document.createElement("link");return t.setAttribute("rel","stylesheet"),t.setAttribute("href","../css/retrotxt.css"),t}links(){var t=document.createElement("p");return t.setAttribute("id","retrotxt-links"),t}amiga(){var t=document.createElement("a");return t.setAttribute("id",r),t.textContent="Amiga",t.addEventListener("click",()=>{this._activeLink(r),this._activeInfo(r),this._amigaToggle()}),t}msdos(){var t=document.createElement("a");return t.setAttribute("id",i),t.textContent="MS-DOS",t.addEventListener("click",()=>{this._activeLink(i),this._activeInfo(i),this._msdosToggle()}),t}win9x(){var t=document.createElement("a");return t.setAttribute("id",o),t.textContent="Windows",t.addEventListener("click",()=>{this._activeLink(o),this._activeInfo(o),this._win9xToggle()}),t}wrap(){const t=document.createElement("a");return t.textContent="Wrapped",t.setAttribute("id",c),t.setAttribute("class",n),t.addEventListener("click",t=>{this._wrapToggle(t.target)}),t.addEventListener("mouseover",()=>{t.classList.contains(n)?u.style.whiteSpace="pre":u.style.whiteSpace=m}),t.addEventListener("mouseleave",()=>{t.classList.contains(n)?u.style.whiteSpace=m:u.style.whiteSpace="pre"}),t}unicode(){var t=document.createElement("a");return t.setAttribute("id",d),t.textContent="Unicode",t.addEventListener("click",()=>{this._activeLink(d),this._activeInfo(d),this._unicodeToggle()}),t}_activeInfo(t=""){for(var e=document.createElement("a"),n=document.getElementById("retrotxt-status");n.firstChild;)n.removeChild(n.firstChild);var s=(()=>{switch(t){case r:return"ISO-8895-1";case i:return"CP-437";case o:return"Windows-1252";case d:return"";default:throw new Error(`Unknown active info ID: "${t}"`)}})();switch(t){case d:return void n.append(" ");case r:e.setAttribute("href","https://github.com/rewtnull/amigafonts/"),e.append("Topaz font by dMG");break;case i:case o:e.setAttribute("href","https://int10h.org/oldschool-pc-fonts/"),e.append("VGA font by VileR");break;default:throw new Error(`Unknown active info ID: "${t}"`)}var a=document.createElement("a");a.setAttribute("href","https://github.com/bengarrett/retrotxtjs"),a.append("RetroTxt"),n.append(s," encoding; ",e,", code: ",a,".")}_activeLink(e=""){document.getElementById("retrotxt-links").childNodes.forEach(t=>{t.id!==c&&t.nodeType===Node.ELEMENT_NODE&&(t.classList.remove(n),t.id===e)&&t.classList.add(n)})}_amigaToggle(){u.classList.remove(s,a),u.classList.add(e);var t=new LegacyText(""+v,{codepage:ISO88591});u.textContent=t.normalize()}_msdosToggle(){u.classList.remove(e,a),u.classList.add(s);var t=new LegacyText(""+v,{codepage:DOS437En,displayControls:!0});u.textContent=t.normalize()}_wrapToggle(t){if((t=void 0===t?document.getElementById(c):t).classList.contains(n))return this._wrapOff(t,!0);this._wrapOn(t,!0)}_wrapOff(t,e){void 0===t&&(t=document.getElementById(c)),u.style.whiteSpace="pre",t.classList.remove(n),e&&localStorage.setItem(l,"false")}_wrapOn(t,e){void 0===t&&(t=document.getElementById(c)),u.style.whiteSpace=m,t.classList.add(n),e&&localStorage.removeItem(l)}_win9xToggle(){u.classList.remove(e,s),u.classList.add(a);var t=new LegacyText(""+v,{codepage:Win1252EN});u.textContent=t.normalize()}_unicodeToggle(){u.classList.remove(s,e,a),u.textContent=v}},t=(t[0].append(p.css()),p.links()),t=(t.append("View text as: ",p.unicode(),p.msdos(),p.amiga(),p.win9x(),p.wrap()),g.insertBefore(t,u),document.createElement("p"));t.setAttribute("id","retrotxt-status"),g.append(t),"false"===localStorage.getItem(l)&&p._wrapOff(void 0,!0),(u.classList.contains("retrotxt-msdos")?p.msdos():u.classList.contains("retrotxt-amiga")?p.amiga():u.classList.contains("retrotxt-windows")?p.win9x():p.unicode()).click()}}})();
/*! retrotxt v2.0.0 (2024-02-23); © Ben Garrett - LGPL-3.0 */
