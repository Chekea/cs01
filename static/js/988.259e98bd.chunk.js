"use strict";(self.webpackChunkmy_react_appo=self.webpackChunkmy_react_appo||[]).push([[988],{4988:(e,o,t)=>{t.r(o),t.d(o,{default:()=>v});var l=t(9950),a=t(5003),n=t(5277),r=t(2578),i=t(6639),s=t(2241),c=t(1975),d=t(4857),u=t(6589),h=t(2053),p=t(2845),m=t(4414);const g=(0,l.memo)(a.A);const v=function(e){let{email:o}=e;const[t,a]=(0,l.useState)((()=>localStorage.getItem("selectedChip")||("nawetin@gmail.com"===o?"Enviado":"Comprado"))),[v,x]=(0,l.useState)(!0),[f,C]=(0,l.useState)(!0),[k,b]=(0,l.useState)([]),A=(0,l.useRef)(null),E=(0,d.A)(),j=(0,u.A)(E.breakpoints.down("sm")),w=(0,r.C3)(s.A),y=(0,l.useCallback)((e=>{b([]),x(!0),localStorage.setItem("selectedChip",e),t!==e&&(a(e),R("",e))}),[t]),R=(e,t)=>{const l=(0,r.KR)(w,"GE/Compras/Nacional");let a;0!==k.length?a=(0,r.P)(l,(0,r.kT)("Codigo"),(0,r.FD)(e),(0,r.$1)(6)):"nawetin@gmail.com"===o?(a=(0,r.P)(l,(0,r.kT)("Estado"),(0,r.iz)("Enviado")),console.log(a,"manito")):(console.log(a,"a"),a=(0,r.P)(l,(0,r.$1)(16))),(0,r.Jt)(a).then((e=>{const o=[];e.forEach((e=>{const l=e.val();l&&!(0,c.D0)(l.Codigo,k)&&l.Estado===t&&(console.log(l),o.unshift(l))})),0!==k.length?b((e=>[...e,...o])):b(o),x(!1),0===o.length&&C(!1)})).catch((e=>{console.error("Error fetching data:",e),x(!1)}))},S=(0,l.useCallback)((()=>{let e=k.slice(-1)[0];A.current.scrollTop+A.current.clientHeight>=A.current.scrollHeight&&R(e.Codigo,t)}),[k.length]);return(0,l.useEffect)((()=>(A.current.addEventListener("scroll",S),()=>{A.current&&A.current.removeEventListener("scroll",S)})),[S]),(0,l.useEffect)((()=>(R("",t),()=>{})),[]),(0,m.jsxs)("div",{style:{padding:8,overflowY:"auto",height:"95vh",marginTop:j?65:5,scrollBehavior:"smooth",paddingTop:"10px"},ref:A,children:[(0,m.jsx)(p.A,{texto:"Nacional"}),"nawetin@gmail.com"!==o&&(0,m.jsxs)("div",{children:[(0,m.jsx)(n.A,{label:"Comprado",style:{marginRight:"8px"},clickable:!0,onClick:()=>y("Comprado"),color:"Comprado"===t?"primary":"default"}),(0,m.jsx)(n.A,{label:"Enviado",clickable:!0,style:{marginRight:"8px"},onClick:()=>y("Enviado"),color:"Enviado"===t?"primary":"default"}),(0,m.jsx)(n.A,{label:"Retirado",clickable:!0,style:{marginRight:"8px"},onClick:()=>y("Retirado"),color:"Retirado"===t?"primary":"default"})]}),(0,m.jsx)("div",{children:v?(0,m.jsx)("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},children:(0,m.jsx)(i.A,{})}):k.length>0?(0,m.jsx)(g,{dats:k,venta:!1,valor:"Nacional"}):(0,m.jsx)(h.A,{variant:"subtitle1",gutterBottom:!0,children:"SIN DATOS"})})]})}},5003:(e,o,t)=>{t.d(o,{A:()=>d});var l=t(7775),a=t(6589),n=t(6491),r=t(2053),i=t(9950),s=t(8429),c=(t(1975),t(4414));const d=function(e){let{dats:o,valor:t}=e;const d=(0,s.Zp)(),u=(0,l.A)(),h=(0,a.A)(u.breakpoints.down("sm")),[p,m]=(0,i.useState)(o);return null===o||void 0===o?void 0:o.map((e=>(0,c.jsxs)(n.A,{onClick:()=>{return o=e.Codigo,l=e.Contexto,void d("/".concat(t,"/Detalles/").concat(o,"/").concat(l));var o,l},sx:{display:"flex",justifyContent:"space-between",cursor:"pointer","&:hover":{backgroundColor:h?"none":"#f0f0f0"},padding:"8px",borderRadius:"4px",width:"80vw",flexGrow:1,flexShrink:1,overflowX:"hidden",maxWidth:h?"100%":"90vw"},children:[(0,c.jsx)(r.A,{children:e.CompraId}),"Exterior"===e.Contexto&&(0,c.jsx)(r.A,{color:"Retirado"!==e.Estado?"red":null,children:e.Estado})]},e.Codigo)))}},1975:(e,o,t)=>{t.d(o,{D0:()=>a,o6:()=>l});t(563),t(6011),t(9950),t(2578),t(2241);const l=e=>{const o=e.match(/\d{5}$/);return o?o[0]:null};let a=(e,o)=>o.some((o=>o.Codigo===e))}}]);