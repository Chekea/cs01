"use strict";(self.webpackChunkmy_react_appo=self.webpackChunkmy_react_appo||[]).push([[655],{3655:(o,e,t)=>{t.r(e),t.d(e,{default:()=>u});var n=t(9950),r=t(5003),s=t(4857),l=t(6589),a=t(2578),i=t(6639),d=t(294),c=t(1975),x=t(8429),p=t(2845),h=t(4414);const g=(0,n.memo)(r.A);const u=function(){const[o,e]=(0,n.useState)(null),[t,r]=(0,n.useState)(!0),u=(0,s.A)(),v=((0,x.Zp)(),(0,l.A)(u.breakpoints.down("sm"))),[f,m]=(0,n.useState)([]),A=(0,a.C3)(d.A);return(0,n.useEffect)((()=>(((o,e)=>{const t=(0,a.KR)(A,"GE/Compras/Exterior");let n;0!==f.length?(console.log("volvio 0"),n=(0,a.P)(t,(0,a.kT)("Codigo"),(0,a.FD)(o),(0,a.$1)(6))):(console.log("volvio 1"),n=(0,a.P)(t,(0,a.$1)(16))),(0,a.Jt)(n).then((o=>{const e=[];o.forEach((o=>{const t=o.val();console.log(t.Codigo),t&&!(0,c.D0)(t.Codigo,f)&&e.unshift(t)})),0!==f.length?(console.log("mantenimiento"),m((o=>[...o,...e]))):m(e),r(!1),0===e.length&&(console.log("no existe"),r(!1))})).catch((o=>{console.error("Error fetching data:",o),r(!1)}))})(),()=>{})),[]),(0,h.jsxs)("div",{style:{marginTop:v?65:10,scrollBehavior:"smooth"},children:[(0,h.jsx)(p.A,{texto:"Exterior"}),t?(0,h.jsx)("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},children:(0,h.jsx)(i.A,{})}):(0,h.jsx)(g,{dats:f,venta:!1,valor:"Exterior"})]})}},2845:(o,e,t)=>{t.d(e,{A:()=>x});var n=t(9950),r=t(8429),s=t(4857),l=t(6589),a=t(5333),i=t(3189),d=t(4414);const c=o=>{let{texto:e}=o;const t=(0,s.A)(),n=(0,l.A)(t.breakpoints.down("sm")),c=(0,r.Zp)();return(0,d.jsx)(d.Fragment,{children:n&&(0,d.jsxs)("div",{style:{position:"fixed",top:0,left:0,width:"100%",height:60,padding:t.spacing(1),backgroundColor:t.palette.background.paper,boxShadow:t.shadows[2],display:"flex",alignItems:"center",zIndex:1e3,boxSizing:"border-box"},children:[(0,d.jsx)(a.A,{onClick:()=>c(-1),"aria-label":"back",children:(0,d.jsx)(i.A,{})}),(0,d.jsx)("h2",{style:{marginLeft:t.spacing(2)},children:e})]})})},x=n.memo(c)},5003:(o,e,t)=>{t.d(e,{A:()=>c});var n=t(4436),r=t(6589),s=t(6491),l=t(2053),a=t(9950),i=t(8429),d=(t(1975),t(4414));const c=function(o){let{dats:e,valor:t}=o;const c=(0,i.Zp)(),x=(0,n.A)(),p=(0,r.A)(x.breakpoints.down("sm")),[h,g]=(0,a.useState)(e);return console.log(e),null===e||void 0===e?void 0:e.map((o=>(0,d.jsxs)(s.A,{onClick:()=>{return e=o.Codigo,o.Contexto,void c("/".concat(t,"/Detalles/").concat(e));var e},sx:{display:"flex",justifyContent:"space-between",cursor:"pointer","&:hover":{backgroundColor:p?"none":"#f0f0f0"},padding:"8px",borderRadius:"4px",width:"80vw",flexGrow:1,flexShrink:1,overflowX:"hidden",maxWidth:p?"100%":"90vw"},children:[(0,d.jsx)(l.A,{children:o.CompraId}),"Exterior"===o.Contexto&&(0,d.jsx)(l.A,{color:"Retirado"!==o.Estado?"red":null,children:o.Estado})]},o.Codigo)))}},3189:(o,e,t)=>{var n=t(4994);e.A=void 0;var r=n(t(9526)),s=t(4414);e.A=(0,r.default)((0,s.jsx)("path",{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"}),"ArrowBack")}}]);