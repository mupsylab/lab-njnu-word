import{o as h,c as _,u as y,R as v,a as g,b as E,d as P,e as L}from"./vendor-B1vzLMcu.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const R={__name:"App",setup(l){return(o,s)=>(h(),_(y(v)))}},w="modulepreload",O=function(l,o){return new URL(l,o).href},p={},d=function(o,s,i){let e=Promise.resolve();if(s&&s.length>0){const t=document.getElementsByTagName("link");e=Promise.all(s.map(r=>{if(r=O(r,i),r in p)return;p[r]=!0;const c=r.endsWith(".css"),m=c?'[rel="stylesheet"]':"";if(!!i)for(let a=t.length-1;a>=0;a--){const u=t[a];if(u.href===r&&(!c||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${m}`))return;const n=document.createElement("link");if(n.rel=c?"stylesheet":w,c||(n.as="script",n.crossOrigin=""),n.href=r,document.head.appendChild(n),c)return new Promise((a,u)=>{n.addEventListener("load",a),n.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${r}`)))})}))}return e.then(()=>o()).catch(t=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=t,window.dispatchEvent(r),!r.defaultPrevented)throw t})},b=g({history:E("./"),routes:[{path:"/",name:"home",component:()=>d(()=>import("./index-Doa7OP9d.js"),__vite__mapDeps([0,1,2,3]),import.meta.url)},{path:"/exper/:day",name:"jspsych",component:()=>d(()=>import("./default-DFs4_yNv.js"),__vite__mapDeps([4,1,2,5]),import.meta.url)}]}),A=P(),f=L(R);f.use(A);f.use(b);f.mount("#app");export{d as _};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./index-Doa7OP9d.js","./vendor-B1vzLMcu.js","./_plugin-vue_export-helper-DlAUqK2U.js","./index-eRo1efuD.css","./default-DFs4_yNv.js","./default-BQZ_Ru2R.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
