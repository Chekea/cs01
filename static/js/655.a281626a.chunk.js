"use strict";(self.webpackChunkmy_react_appo=self.webpackChunkmy_react_appo||[]).push([[655],{3655:(o,t,e)=>{e.r(t),e.d(t,{default:()=>v});var n=e(9950),s=e(5003),r=e(4857),l=e(6589),a=e(2578),i=e(6639),c=e(2241),d=e(1975),u=e(8429),h=e(2845),p=e(4414);const x=(0,n.memo)(s.A);const v=function(){const[o,t]=(0,n.useState)(null),[e,s]=(0,n.useState)(!0),v=(0,r.A)(),f=((0,u.Zp)(),(0,l.A)(v.breakpoints.down("sm"))),[g,m]=(0,n.useState)([]),C=(0,a.C3)(c.A);return(0,n.useEffect)((()=>(((o,t)=>{const e=(0,a.KR)(C,"GE/Compras/Exterior");let n;0!==g.length?(console.log("volvio 0"),n=(0,a.P)(e,(0,a.kT)("Codigo"),(0,a.FD)(o),(0,a.$1)(6))):(console.log("volvio 1"),n=(0,a.P)(e,(0,a.$1)(16))),(0,a.Jt)(n).then((o=>{const t=[];o.forEach((o=>{const e=o.val();console.log(e.Codigo),e&&!(0,d.D0)(e.Codigo,g)&&t.unshift(e)})),0!==g.length?(console.log("mantenimiento"),m((o=>[...o,...t]))):m(t),s(!1),0===t.length&&(console.log("no existe"),s(!1))})).catch((o=>{console.error("Error fetching data:",o),s(!1)}))})(),()=>{})),[]),(0,p.jsxs)("div",{style:{marginTop:f?65:10,scrollBehavior:"smooth"},children:[(0,p.jsx)(h.A,{texto:"Exterior"}),e?(0,p.jsx)("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},children:(0,p.jsx)(i.A,{})}):(0,p.jsx)(x,{dats:g,venta:!1,valor:"Exterior"})]})}},5003:(o,t,e)=>{e.d(t,{A:()=>d});var n=e(7775),s=e(6589),r=e(6491),l=e(2053),a=e(9950),i=e(8429),c=(e(1975),e(4414));const d=function(o){let{dats:t,valor:e}=o;const d=(0,i.Zp)(),u=(0,n.A)(),h=(0,s.A)(u.breakpoints.down("sm")),[p,x]=(0,a.useState)(t);return null===t||void 0===t?void 0:t.map((o=>(0,c.jsxs)(r.A,{onClick:()=>{return t=o.Codigo,n=o.Contexto,void d("/".concat(e,"/Detalles/").concat(t,"/").concat(n));var t,n},sx:{display:"flex",justifyContent:"space-between",cursor:"pointer","&:hover":{backgroundColor:h?"none":"#f0f0f0"},padding:"8px",borderRadius:"4px",width:"80vw",flexGrow:1,flexShrink:1,overflowX:"hidden",maxWidth:h?"100%":"90vw"},children:[(0,c.jsx)(l.A,{children:o.CompraId}),"Exterior"===o.Contexto&&(0,c.jsx)(l.A,{color:"Retirado"!==o.Estado?"red":null,children:o.Estado})]},o.Codigo)))}},1975:(o,t,e)=>{e.d(t,{D0:()=>s,o6:()=>n});e(563),e(6011),e(9950),e(2578),e(2241);const n=o=>{const t=o.match(/\d{5}$/);return t?t[0]:null};let s=(o,t)=>t.some((t=>t.Codigo===o))}}]);