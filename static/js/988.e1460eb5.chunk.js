"use strict";(self.webpackChunkmy_react_appo=self.webpackChunkmy_react_appo||[]).push([[988],{4988:(e,t,o)=>{o.r(t),o.d(t,{default:()=>v});var a=o(9950),r=o(5003),n=o(5277),l=o(2578),i=o(6639),s=o(2241),c=o(1975),d=o(4857),u=o(6589),h=o(2053),p=o(2845),m=o(4414);const g=(0,a.memo)(r.A);const v=function(e){let{email:t}=e;const[o,r]=(0,a.useState)("Comprado"),[v,x]=(0,a.useState)(!0),[f,C]=(0,a.useState)(!0),[k,b]=(0,a.useState)([]),A=(0,a.useRef)(null),j=(0,d.A)(),E=(0,u.A)(j.breakpoints.down("sm")),w=(0,l.C3)(s.A),y=(0,a.useCallback)((e=>{b([]),x(!0),o!==e&&(r(e),R("",e))}),[o]),R=(e,o)=>{const a=(0,l.KR)(w,"GE/Compras/Nacional");let r;r=0!==k.length?"nawetin@gmail.com"===t?(0,l.P)(a,(0,l.kT)("Estado"),(0,l.iz)("Enviado")):(0,l.P)(a,(0,l.kT)("Codigo"),(0,l.FD)(e),(0,l.$1)(6)):(0,l.P)(a,(0,l.$1)(16)),(0,l.Jt)(r).then((e=>{const t=[];e.forEach((e=>{const a=e.val();a&&!(0,c.D0)(a.Codigo,k)&&a.Estado===o&&t.unshift(a)})),0!==k.length?b((e=>[...e,...t])):b(t),x(!1),0===t.length&&C(!1)})).catch((e=>{console.error("Error fetching data:",e),x(!1)}))},S=(0,a.useCallback)((()=>{let e=k.slice(-1)[0];A.current.scrollTop+A.current.clientHeight>=A.current.scrollHeight&&R(e.Codigo,o)}),[k.length]);return(0,a.useEffect)((()=>(A.current.addEventListener("scroll",S),()=>{A.current&&A.current.removeEventListener("scroll",S)})),[S]),(0,a.useEffect)((()=>(R("",o),()=>{})),[]),(0,m.jsxs)("div",{style:{padding:8,overflowY:"auto",height:"95vh",marginTop:E?65:5,scrollBehavior:"smooth",paddingTop:"10px"},ref:A,children:[(0,m.jsx)(p.A,{texto:"Nacional"}),"nawetin@gmail.com"!==t&&(0,m.jsxs)("div",{children:[(0,m.jsx)(n.A,{label:"Comprado",style:{marginRight:"8px"},clickable:!0,onClick:()=>y("Comprado"),color:"Comprado"===o?"primary":"default"}),(0,m.jsx)(n.A,{label:"Enviado",clickable:!0,style:{marginRight:"8px"},onClick:()=>y("Enviado"),color:"Enviado"===o?"primary":"default"}),(0,m.jsx)(n.A,{label:"Retirado",clickable:!0,style:{marginRight:"8px"},onClick:()=>y("Retirado"),color:"Retirado"===o?"primary":"default"})]}),(0,m.jsx)("div",{children:v?(0,m.jsx)("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},children:(0,m.jsx)(i.A,{})}):k.length>0?(0,m.jsx)(g,{dats:k,venta:!1,valor:"Nacional"}):(0,m.jsx)(h.A,{variant:"subtitle1",gutterBottom:!0,children:"SIN DATOS"})})]})}},5003:(e,t,o)=>{o.d(t,{A:()=>d});var a=o(7775),r=o(6589),n=o(6491),l=o(2053),i=o(9950),s=o(8429),c=(o(1975),o(4414));const d=function(e){let{dats:t,valor:o}=e;const d=(0,s.Zp)(),u=(0,a.A)(),h=(0,r.A)(u.breakpoints.down("sm")),[p,m]=(0,i.useState)(t);return null===t||void 0===t?void 0:t.map((e=>(0,c.jsxs)(n.A,{onClick:()=>{return t=e.Codigo,a=e.Contexto,void d("/".concat(o,"/Detalles/").concat(t,"/").concat(a));var t,a},sx:{display:"flex",justifyContent:"space-between",cursor:"pointer","&:hover":{backgroundColor:"#f0f0f0"},padding:"8px",borderRadius:"4px",width:"80vw",flexGrow:1,flexShrink:1,overflowX:"hidden",maxWidth:h?"100%":"90vw"},children:[(0,c.jsx)(l.A,{children:e.CompraId}),"Exterior"===e.Contexto&&(0,c.jsx)(l.A,{children:e.Estado})]},e.Codigo)))}},1975:(e,t,o)=>{o.d(t,{D0:()=>r,o6:()=>a});o(563),o(6011),o(9950),o(2578),o(2241);const a=e=>{const t=e.match(/\d{5}$/);return t?t[0]:null};let r=(e,t)=>t.some((t=>t.Codigo===e))}}]);