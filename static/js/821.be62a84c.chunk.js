"use strict";(self.webpackChunkmy_react_appo=self.webpackChunkmy_react_appo||[]).push([[821],{8821:(e,t,a)=>{a.r(t),a.d(t,{default:()=>j});var s=a(9950),i=a(4857),r=a(6589),n=a(9808),o=a(6491),l=a(5277),c=a(6630),d=a(226),u=a(2053),h=a(2578),g=a(2241),x=a(7938),m=a(2845),p=a(4414);const j=()=>{const[e,t]=(0,s.useState)(""),[a,j]=(0,s.useState)([]),[f,S]=(0,s.useState)([]),[y,E]=(0,s.useState)(["Nacional","Exterior"]),[v,b]=(0,s.useState)(null),C=(0,h.C3)(g.A),A=(0,i.A)(),k=(0,r.A)(A.breakpoints.down("sm"));(0,s.useEffect)((()=>{const e=sessionStorage.getItem("buscar"),a=sessionStorage.getItem("selectedChip1"),s=sessionStorage.getItem("carddata"),i=sessionStorage.getItem("results");e&&t(e),a&&b(a),s&&S(JSON.parse(s)),i&&j(JSON.parse(i))}),[]),(0,s.useEffect)((()=>{sessionStorage.setItem("buscar",e)}),[e]),(0,s.useEffect)((()=>{sessionStorage.setItem("selectedChip1",v)}),[v]),(0,s.useEffect)((()=>{sessionStorage.setItem("carddata",JSON.stringify(f))}),[f]),(0,s.useEffect)((()=>{sessionStorage.setItem("results",JSON.stringify(a))}),[a]);const I=e=>"string"!==typeof e||0===e.length?e:e.charAt(0).toUpperCase()+e.slice(1),R=(e,t)=>{const a=(0,h.P)((0,h.KR)(C,"GE/".concat(v,"/Prod/")),(0,h.kT)("Titulo"),(0,h.EO)(e),(0,h.FD)(t));(0,h.Jt)(a).then((e=>{if(e.exists()){const t=[];e.forEach((e=>{t.push(e.val())})),S((e=>[...e,...t])),j((e=>[...e,...t]))}else console.log("No data available")})).catch((e=>{console.error("Error fetching data:",e)}))};return(0,p.jsxs)(n.A,{style:{marginTop:k?65:10},children:[(0,p.jsx)(m.A,{texto:"Buscar"}),(0,p.jsxs)(o.A,{children:[y.map(((e,t)=>(0,p.jsx)(l.A,{label:e,style:{margin:3},onClick:()=>{return t=e,S([]),void(t!==v&&b(t));var t},color:v===e?"primary":"default"},t))),(0,p.jsx)(c.A,{label:"Nombre del Producto",variant:"outlined",fullWidth:!0,value:e,onChange:e=>t(e.target.value),margin:"normal"}),(0,p.jsx)(d.A,{variant:"contained",color:"primary",onClick:async()=>{S([]),v&&""!==e?R(I(e),"".concat(I(e),"\uf8ff")):alert("Seleccion lugar de busqueda")},sx:{marginBottom:2},children:"Buscar"}),f.length>0&&(0,p.jsx)(u.A,{variant:"h5",component:"h2",gutterBottom:!0,children:"Resultados"}),(0,p.jsx)(x.A,{data:f,enviado:()=>console.log("Eiby"),isBuscar:!0})]})]})}},7938:(e,t,a)=>{a.d(t,{A:()=>d});var s=a(899),i=a(6491),r=a(226),n=a(3464),o=a(9950),l=a(8429),c=a(4414);const d=function(e){let{data:t,enviado:a,isBuscar:d}=e;const[u,h]=(0,o.useState)(!1),[g,x]=(0,o.useState)(null),m=(0,l.Zp)(),p=e=>{x(e),h(!0)};return(0,c.jsxs)(c.Fragment,{children:[t.map(((e,t)=>(0,c.jsx)(s.Ay,{container:!0,justifyContent:"center",children:(0,c.jsx)(s.Ay,{item:!0,xs:12,sm:10,children:"Exterior"===e.contexto?(0,c.jsxs)(i.A,{display:"flex",alignItems:"center",p:1,borderRadius:8,boxShadow:3,width:"100%",children:[(0,c.jsx)("img",{src:e.Imagen,alt:"Sample",style:{borderRadius:"30%",width:"100%",maxWidth:"80px",marginRight:"16px"},onClick:()=>p(e.Imagen)}),(0,c.jsxs)("div",{children:[(0,c.jsx)("h3",{children:e.Titulo}),(0,c.jsx)("p",{children:e.Detalles})]})]}):(0,c.jsx)("div",{style:{marginTop:15},children:(0,c.jsxs)(i.A,{display:"flex",alignItems:"center",p:1,borderRadius:8,onClick:()=>(e=>{if(d){let t="Guinea Ecuatorial"!==e.Pais?"Exterior":"Nacional";m("/Buscar/Editar/".concat(e.Codigo,"/").concat(t))}})(e),boxShadow:3,width:"100%",children:[(0,c.jsx)("img",{src:e.Imagen,alt:"Sample",style:{borderRadius:"30%",width:"100%",maxWidth:"80px",marginRight:"16px"},onClick:()=>p(e.Imagen)}),(0,c.jsxs)("div",{children:[(0,c.jsx)("h3",{children:e.Titulo}),d?(0,c.jsx)("p",{children:"Cantidad:".concat(e.Cantidad,"     Stock:").concat(e.Stock,"\n")}):(0,c.jsx)("p",{children:e.Detalles})]}),d?null:"Retirado"!==e.Estado&&(0,c.jsx)("div",{style:{paddingLeft:"10px"},children:(0,c.jsx)(r.A,{onClick:()=>(e=>{"Enviado"===e.Estado?a(e,"Retirado"):a(e,"Enviado")})(e),variant:"contained",color:"primary",style:{borderRadius:"20px",marginRight:"14px"},children:"Comprado"===e.Estado?"Enviado":"Enviado"===e.Estado?"Retirado":null})})]})})})},t))),(0,c.jsx)(n.A,{open:u,onClose:()=>{h(!1),x(null)},maxWidth:"lg",children:(0,c.jsx)("div",{style:{backgroundColor:"rgba(0, 0, 0, 0.8)"},children:(0,c.jsx)("img",{src:g,alt:"Enlarged Sample",style:{width:"100%"}})})})]})}}}]);