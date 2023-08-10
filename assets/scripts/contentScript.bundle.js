(()=>{"use strict";var e={571:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var i=Object.getOwnPropertyDescriptor(t,o);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,i)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return i(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.highterCursor=t.hights=t.hight=void 0;const c=r(o(854));t.hight=c;const l=r(o(268));t.hights=l;const a={toogle:o(525).toggleHighterCursor};t.highterCursor=a},341:function(e,t,o){var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(i,r){function c(e){try{a(n.next(e))}catch(e){r(e)}}function l(e){try{a(n.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(c,l)}a((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=i(o(747)),c=o(941);t.default=function(e,t=window.getSelection()){return n(this,void 0,void 0,(function*(){const o=null==t?void 0:t.toString();if(!o)return;let n=null==t?void 0:t.getRangeAt(0).commonAncestorContainer;for(;n&&!("innerHTML"in n)&&n.parentNode;)n=n.parentNode;const i=yield(0,c.store)(t,n,location.hostname+location.pathname,location.href,e.color,e.textColor),l={anchorNode:t.anchorNode,anchorOffset:t.anchorOffset,focusNode:t.focusNode,focusOffset:t.focusOffset};(0,r.default)(o,n,l,e.color,e.textColor,i)}))}},744:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=o(551),i=o(652);function r(e,t,o,n){const{anchor:c,focus:l,anchorOffset:a,focusOffset:u,color:s,textColor:d,hightIndex:h,selectionString:f}=t,g=f.length;return e.contents().each(((e,v)=>{if(n>=g)return;if(v.nodeType!==Node.TEXT_NODE){const e=$(v);return void(e.is(":visible")&&"hidden"!==getComputedStyle(v).visibility&&([o,n]=r(e,t,o,n)))}let m=0;if(!o){if(!c.is(v)&&!l.is(v))return;o=1,m=Math.min(...c.is(v)?[a]:[],...c.is(v)?[u]:[])}const{nodeValue:_,parentElement:p}=v;if(_&&m>(null==_?void 0:_.length))throw new Error(`No match found for highlight string '${f}'`);const y=v.splitText(m);let w=m;for(;_&&w<(null==_?void 0:_.length);w++){for(;n<g&&f[n].match(/\s/u);)n++;if(n>=g)break;const e=_[w];if(e===f[n])n++;else if(!e.match(/\s/u))throw new Error(`No match found for highlight string '${f}'`)}if(null==p?void 0:p.classList.contains(i.HIGHTED_CLASS))return;const C=w-m,H=y.splitText(C),O=y.nodeValue;if(null==O?void 0:O.match(/^\s*$/u))return void(null==p||p.normalize());const b=document.createElement("span");b.classList.add("inherit"===s?i.DELETED_CLASS:i.HIGHTED_CLASS),b.style.backgroundColor=s,b.style.color=d,b.dataset.hightId=String(h),b.textContent=y.nodeValue,y.remove(),null==p||p.insertBefore(b,H)})),[o,n]}t.default=function(e,t,o,c,l,a){console.log("✨✨ hight:",(new Date).toISOString(),"✨✨");const u={color:c||"yellow",textColor:l||"inherit",hightIndex:a,selectionString:e,anchor:$(o.anchorNode),anchorOffset:o.anchorOffset,focus:$(o.focusNode),focusOffset:o.focusOffset};try{!function(e,t){r(e,t,0,0)}($(t),u)}catch(e){return!1}return(null==o?void 0:o.removeAllRanges)&&o.removeAllRanges(),$(t).parent().find(`.${i.HIGHTED_CLASS}`).each(((e,t)=>{(0,n.initializeHightEventListener)(t)})),!0}},747:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(o(744));t.default=function(e,t,o,n,r,c,l){return("1.0"===l||void 0===l)&&(0,i.default)(e,t,o,n,r,c)}},854:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.hight=t.updateColor=t.show=t.removeLost=t.remove=t.create=void 0;const i=n(o(341));t.create=i.default;const r=n(o(160));t.remove=r.default;const c=n(o(956));t.removeLost=c.default;const l=n(o(58));t.show=l.default;const a=n(o(629));t.updateColor=a.default;const u=n(o(747));t.hight=u.default},160:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=o(551),i=o(941),r=o(652);t.default=function(e){const t=$(`.${r.HIGHTED_CLASS}[data-hight-id='${e}']`);console.log("delete hights:",t),$(".hight-hovered").removeClass("hight-hovered"),t.css("backgroundColor","inherit"),t.css("color","inherit"),t.removeClass(r.HIGHTED_CLASS).addClass(r.DELETED_CLASS),(0,i.update)(e,window.location.hostname+window.location.pathname,window.location.pathname,"inherit","inherit"),t.each(((e,t)=>{(0,n.removeHightEventListeners)(t)}))}},956:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=o(274),i=o(941);t.default=function(e){(0,n.removeLostHight)(e),(0,i.removeHight)(e,window.location.hostname+window.location.pathname,window.location.pathname)}},58:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){const t=document.querySelector(`[data-hight-id="${e}"]`);t&&t.scrollIntoView(!0)}},629:function(e,t,o){var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(i,r){function c(e){try{a(n.next(e))}catch(e){r(e)}}function l(e){try{a(n.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(c,l)}a((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const i=o(941),r=o(652);t.default=function(e,t){return n(this,void 0,void 0,(function*(){t=null!=t?t:yield function(e){const t=document.querySelector(`.${r.HIGHTED_CLASS}[data-hight-id='${e}']`).style.backgroundColor;return new Promise((e=>{chrome.runtime.sendMessage({action:"get-color-options"},(({response:o})=>{const n=o.findIndex((e=>e.color===t)),i=o[(n+1)%o.length];e(i)}))}))}(e);const o=$(`.${r.HIGHTED_CLASS}[data-hight-id='${e}']`);o.css("backgroundColor",t.color),o.css("colors",t.textColor||"inherit"),(0,i.update)(e,window.location.hostname+window.location.pathname,window.location.pathname,t.color,t.textColor)}))}},274:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.removeLostHight=t.getLostHights=t.addHightError=void 0;const n=o(941),i=new Map;function r(e){(0,n.load)(e.hightVal,e.hightIndex,!0)?i.delete(e.hightIndex):Date.now()-e.errorTime<1e3&&(e.timeout=setTimeout(r,500,e))}t.addHightError=function(e,t){const o={hightVal:e,hightIndex:t,errorTime:Date.now()};o.timeout=setTimeout(r,500,o),i.set(t,o)},t.getLostHights=function(){return i},t.removeLostHight=function(e){const t=i.get(e);t&&"timeout"in t&&(clearTimeout(t.timeout),i.delete(e))}},525:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.toggleHighterCursor=t.initializeHighterCursor=void 0;let o=!1;function n(){if(!o)return;const e=window.getSelection();(null==e?void 0:e.toString())&&chrome.runtime.sendMessage({action:"hight"})}t.initializeHighterCursor=function(){document.addEventListener("mouseup",n)},t.toggleHighterCursor=function(){o=!o,o?(document.body.style.cursor=`url(${chrome.runtime.getURL("/assets/images/highlighter_cursor.png")}), auto`,n()):document.body.style.cursor="default"}},551:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.removeHightEventListeners=t.onHightMouseEnterOrClick=t.initializeHightEventListener=t.initializeHoverTools=void 0;const n=o(652),i=o(854);let r,c,l,a,u=null,s=null,d=null;function h(e,t){var o,n;const i=e.getBoundingClientRect(),r=i.top-45;if(null===(o=y())||void 0===o||o.css({top:r}),void 0!==t){let e=null;e=i.width<108?i.left+i.width/2-54:t-i.left<54?i.left:i.right-t<54?i.right-108:t-54,null===(n=y())||void 0===n||n.css({left:e})}y().show()}function f(){const e=l.getAttribute(n.CUSTOM_HIGHT_DATA_ID),t=document.querySelectorAll(`.${n.HIGHTED_CLASS}[${n.CUSTOM_HIGHT_DATA_ID}='${e}']`),o=Array.from(t).map((e=>{var t;return null===(t=e.textContent)||void 0===t?void 0:t.replace(/\s+/gmu," ")})).join("");window.navigator.clipboard.writeText(o),chrome.runtime.sendMessage({action:"track-event",trackCategory:"hight-action",trackAction:"copy"})}function g(){var e;const t=Number(l.getAttribute(n.CUSTOM_HIGHT_DATA_ID));(0,i.remove)(t),null===(e=y())||void 0===e||e.hide(),c=null,chrome.runtime.sendMessage({action:"track-event",trackCategory:"hight-action",trackAction:"delete"})}function v(){const e=l.getAttribute(n.CUSTOM_HIGHT_DATA_ID);null!==e&&((0,i.updateColor)(Number(e)),chrome.runtime.sendMessage({action:"track-event",trackCategory:"hight-action",trackAction:"change-color"}))}function m(){null!==c&&(clearTimeout(c),c=null)}function _(){}function p(){var e;$(".hight-hovered").removeClass("hight-hovered"),null===(e=y())||void 0===e||e.hide(),c=null,a=!1}function y(){return r.closest("document").length||r.appendTo("body"),r}function w(e){const t=e.target,o=t.getAttribute("data-hight-id");a&&"click"!==e.type||(a="click"===e.type,null!==c&&(clearTimeout(c),c=null,l&&o===(null==l?void 0:l.getAttribute("data-hight-id")))||(l=t,h(t,e.clientX),$(".hight-hovered").removeClass("hight-hovered"),$(`.${n.HIGHTED_CLASS}[data-hight-id='${o}']`).addClass("hight-hoverd")))}function C(){a||(c=setTimeout(p,170))}t.initializeHoverTools=function(){$.get(chrome.runtime.getURL("src/hights/hover/index.html"),(e=>{r=$(e),r.hide(),r[0].addEventListener("mouseenter",m),r[0].addEventListener("mouseleave",_),u=r.find(".hight-copy-button")[0],d=r.find(".hight-delete-button")[0],s=r.find(".hight-colorChange-button")[0],u.addEventListener("click",f),d.addEventListener("click",g),s.addEventListener("click",v),window.addEventListener("click",(e=>{var t;const o=e.target;(null===(t=null==o?void 0:o.classList)||void 0===t?void 0:t.contains(n.HIGHTED_CLASS))||(null==o?void 0:o.classList.contains("hight-colorChanger-button"))||p()})),window.addEventListener("scroll",(()=>{a&&h(l)}))}))},t.initializeHightEventListener=function(e){e.addEventListener("mouseenter",w),e.addEventListener("click",w),e.addEventListener("mouseleave",C)},t.removeHightEventListeners=function(e){e.removeEventListener("mouseenter",w),e.removeEventListener("click",w),e.removeEventListener("mouseleave",C)},t.onHightMouseEnterOrClick=w},338:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var i=Object.getOwnPropertyDescriptor(t,o);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,i)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return i(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});const c=r(o(571)),l=o(268),a=o(551),u=o(525);(0,a.initializeHoverTools)(),(0,u.initializeHighterCursor)(),window.highterAPI=c,(0,l.loadAll)()},881:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=o(941);t.default=function(){(0,n.clearPage)(window.location.hostname+window.location.pathname,window.location.pathname),window.location.reload()}},857:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=o(652);t.default=function(){const e=document.getElementsByClassName(n.HIGHTED_CLASS);return e?Array.from(e).map((e=>{var t;return[e.getAttribute("data-hight-id"),null===(t=e.textContent)||void 0===t?void 0:t.replace(/\s+/gmu," ").trim()]})).reduce(((e,[t,o])=>(e.has(t)?e.set(t,`${e.get(t)} ${o}`):e.set(t,o),e)),new Map):null}},670:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=o(274);t.default=n.getLostHights},268:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.loadAll=t.deleteAll=t.getAllLost=t.getAllFound=void 0;const i=n(o(881));t.deleteAll=i.default;const r=n(o(857));t.getAllFound=r.default;const c=n(o(670));t.getAllLost=c.default;const l=n(o(622));t.loadAll=l.default},622:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=o(941);t.default=function(){function e(){(0,n.loadAll)(window.location.hostname+window.location.pathname,window.location.pathname)}"loading"===document.readyState?(document.removeEventListener("DOMContentLoaded",e),document.addEventListener("DOMContentLoaded",e)):e()}},941:function(e,t,o){var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(i,r){function c(e){try{a(n.next(e))}catch(e){r(e)}}function l(e){try{a(n.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(c,l)}a((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.update=t.loadAll=t.load=t.removeHight=t.clearPage=t.store=void 0;const i=o(274),r=o(854),c=chrome.runtime.getManifest().version;let l=0;function a(e){const t=/>textNode:nth-of-type\(([0-9]+)\)$/iu,o=t.exec(e);if(o){const n=parseInt(o[1],10),i=u(e=e.replace(t,""));return i?i.childNodes[n]:null}return u(e)}function u(e){try{return document.querySelector(e)}catch(t){let o=document;for(const t of e.split(">")){if(!o)return null;const e=/^(.*):nth-of-type\(([0-9]+)\)$/iu.exec(t),[,n,i]=null!=e?e:[void 0,t,1];o=Array.from(o.childNodes).filter((e=>"localName"in e&&e.localName===n))[Number(i)-1]}return o}}function s(e,t,o){const n={anchorNode:a(e.anchorNode),anchorOffset:e.anchorOffset,focusNode:a(e.focusNode),focusOffset:e.focusOffset},{color:c,string:l,textColor:u,version:s}=e,d=a(e.container);if(!n.anchorNode||!n.focusNode||!d)return o||(0,i.addHightError)(e,t),!1;const h=(0,r.hight)(l,d,n,c,u,t,s);return o||h||(0,i.addHightError)(e,t),h}function d(e){if("id"in e&&e.id)return`#${t=e.id,t.replace(/(:)/gu,"\\$1")}`;var t;if("localName"in e&&"html"===e.localName)return"html";const o=e.parentNode,n=d(o);if("localName"in e){const t=Array.from(o.childNodes).filter((t=>"localName"in t&&t.localName===e.localName)).indexOf(e)+1;return`${n}>${e.localName}:nth-of-type(${t})`}return`${n}>textNode:nth-of-type(${Array.prototype.indexOf.call(o.childNodes,e)})`}t.store=function(e,t,o,i,r,a){return n(this,void 0,void 0,(function*(){const{yu_hight:n}=yield chrome.storage.local.get({yu_hight:{}});n[o]||(n[o]=[]);const u=n[o].push({version:c||"1.0",string:e.toString(),container:d(t),anchorNode:d(e.anchorNode),anchorOffset:e.anchorOffset,focusNode:d(e.focusNode),focusOffset:e.focusOffset,color:r,textColor:a,href:i,uuid:crypto.randomUUID(),createdAt:Date.now()});return chrome.storage.local.set({yu_hight:n}),u-1+l}))},t.update=function(e,t,o,i,r){return n(this,void 0,void 0,(function*(){const{yu_hight:n}=yield chrome.storage.local.get({yu_hight:{}});let c=t,a=e-l;e<l&&(c=o,a=e);const u=n[c];if(u){const e=u[a];e&&(e.color=i,e.textColor=r,e.updatedAt=Date.now(),chrome.storage.local.set({yu_hight:n}))}}))},t.loadAll=function(e,t){return n(this,void 0,void 0,(function*(){const o=yield chrome.storage.local.get({yu_hight:{}});let n=[];if(t&&(n=n.concat(o.yu_hight[t]||[])),l=n.length,n=n.concat(o.yu_hight[e]||[]),n)for(let e=0;e<n.length;e++)s(n[e],e)}))},t.load=s,t.removeHight=function(e,t,o){return n(this,void 0,void 0,(function*(){const{yu_hight:n}=yield chrome.storage.local.get({yu_hight:{}});e<l?n[o].splice(e,1):n[t].splice(e-l,1),chrome.storage.local.set({yu_hight:n})}))},t.clearPage=function(e,t){return n(this,void 0,void 0,(function*(){const{yu_hight:o}=yield chrome.storage.local.get({yu_hight:{}});delete o[e],t&&delete o[t],chrome.storage.local.set({yu_hight:o})}))}},652:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CUSTOM_HIGHT_DATA_ID=t.DELETED_CLASS=t.HIGHTED_CLASS=void 0,t.HIGHTED_CLASS="hight-highted",t.DELETED_CLASS="hight-deleted",t.CUSTOM_HIGHT_DATA_ID="data-hight-id"}},t={};!function o(n){var i=t[n];if(void 0!==i)return i.exports;var r=t[n]={exports:{}};return e[n].call(r.exports,r,r.exports,o),r.exports}(338)})();