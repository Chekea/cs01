"use strict";(self.webpackChunkmy_react_appo=self.webpackChunkmy_react_appo||[]).push([[683],{3683:(e,t,a)=>{a.r(t),a.d(t,{default:()=>B});var s=a(9950),r=a(4857),n=a(6589),o=a(8587),i=a(8168),d=a(2004),l=a(8483),c=a(4061),u=a(3081),p=a(2161),m=a(146),x=a(2860),h=a(4414);const g=["className","component","disableGutters","fixed","maxWidth","classes"],b=(0,x.A)(),f=(0,m.A)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t["maxWidth".concat((0,u.A)(String(a.maxWidth)))],a.fixed&&t.fixed,a.disableGutters&&t.disableGutters]}}),S=e=>(0,p.A)({props:e,name:"MuiContainer",defaultTheme:b});var A=a(1676),v=a(9254),j=a(8283);const y=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{createStyledComponent:t=f,useThemeProps:a=S,componentName:r="MuiContainer"}=e,n=t((e=>{let{theme:t,ownerState:a}=e;return(0,i.A)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!a.disableGutters&&{paddingLeft:t.spacing(2),paddingRight:t.spacing(2),[t.breakpoints.up("sm")]:{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}})}),(e=>{let{theme:t,ownerState:a}=e;return a.fixed&&Object.keys(t.breakpoints.values).reduce(((e,a)=>{const s=a,r=t.breakpoints.values[s];return 0!==r&&(e[t.breakpoints.up(s)]={maxWidth:"".concat(r).concat(t.breakpoints.unit)}),e}),{})}),(e=>{let{theme:t,ownerState:a}=e;return(0,i.A)({},"xs"===a.maxWidth&&{[t.breakpoints.up("xs")]:{maxWidth:Math.max(t.breakpoints.values.xs,444)}},a.maxWidth&&"xs"!==a.maxWidth&&{[t.breakpoints.up(a.maxWidth)]:{maxWidth:"".concat(t.breakpoints.values[a.maxWidth]).concat(t.breakpoints.unit)}})})),p=s.forwardRef((function(e,t){const s=a(e),{className:p,component:m="div",disableGutters:x=!1,fixed:b=!1,maxWidth:f="lg"}=s,S=(0,o.A)(s,g),A=(0,i.A)({},s,{component:m,disableGutters:x,fixed:b,maxWidth:f}),v=((e,t)=>{const{classes:a,fixed:s,disableGutters:r,maxWidth:n}=e,o={root:["root",n&&"maxWidth".concat((0,u.A)(String(n))),s&&"fixed",r&&"disableGutters"]};return(0,c.A)(o,(e=>(0,l.Ay)(t,e)),a)})(A,r);return(0,h.jsx)(n,(0,i.A)({as:m,ownerState:A,className:(0,d.A)(v.root,p),ref:t},S))}));return p}({createStyledComponent:(0,v.Ay)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t["maxWidth".concat((0,A.A)(String(a.maxWidth)))],a.fixed&&t.fixed,a.disableGutters&&t.disableGutters]}}),useThemeProps:e=>(0,j.A)({props:e,name:"MuiContainer"})}),k=y;var C=a(6491),E=a(5277),w=a(20),R=a(226),W=a(2053),I=a(7938),G=a(2845),N=a(1975),T=a(9246);const B=()=>{const[e,t]=(0,s.useState)(""),[a,o]=(0,s.useState)([]),[i,d]=(0,s.useState)([]),[l,c]=(0,s.useState)(["Nacional","Exterior"]),[u,p]=(0,s.useState)(null),m=(0,r.A)(),x=(0,n.A)(m.breakpoints.down("sm"));(0,s.useEffect)((()=>{const e=sessionStorage.getItem("buscar"),a=sessionStorage.getItem("selectedChip1"),s=sessionStorage.getItem("carddata"),r=sessionStorage.getItem("results");e&&t(e),a&&p(a),s&&d(JSON.parse(s)),r&&o(JSON.parse(r))}),[]),(0,s.useEffect)((()=>{sessionStorage.setItem("buscar",e)}),[e]),(0,s.useEffect)((()=>{sessionStorage.setItem("selectedChip1",u)}),[u]),(0,s.useEffect)((()=>{sessionStorage.setItem("carddata",JSON.stringify(i))}),[i]),(0,s.useEffect)((()=>{sessionStorage.setItem("results",JSON.stringify(a))}),[a]);const g=async(t,a)=>{try{const t=await T.A.get("http://localhost:3000/search",{params:{path:"GE/".concat(u,"/Prod/"),childkey:"Titulo",startString:(0,N.Zr)(e),endString:(0,N.Zr)(e)}});console.log("Response status:",t.status),console.log("Response data:",t.data);const a=t.data;d(a),o(a)}catch(s){console.error("Error fetching data:",s),s.response&&(console.error("Error response data:",s.response.data),console.error("Error response status:",s.response.status))}};return(0,h.jsxs)(k,{style:{marginTop:x?65:10},children:[(0,h.jsx)(G.A,{texto:"Buscar"}),(0,h.jsxs)(C.A,{children:[l.map(((e,t)=>(0,h.jsx)(E.A,{label:e,style:{margin:3},onClick:()=>{return t=e,d([]),void(t!==u&&p(t));var t},color:u===e?"primary":"default"},t))),(0,h.jsx)(w.A,{label:"Nombre del Producto",variant:"outlined",fullWidth:!0,value:e,onChange:e=>t(e.target.value),margin:"normal"}),(0,h.jsx)(R.A,{variant:"contained",color:"primary",onClick:async()=>{d([]),u&&""!==e?g((0,N.Zr)(e),"".concat((0,N.Zr)(e),"\uf8ff")):alert("Seleccion lugar de busqueda")},sx:{marginBottom:2},children:"Buscar"}),i.length>0&&(0,h.jsx)(W.A,{variant:"h5",component:"h2",gutterBottom:!0,children:"Resultados"}),(0,h.jsx)(I.A,{data:i,enviado:()=>console.log("Eiby"),isBuscar:!0})]})]})}},2845:(e,t,a)=>{a.d(t,{A:()=>u});var s=a(9950),r=a(8429),n=a(4857),o=a(6589),i=a(5333),d=a(3189),l=a(4414);const c=e=>{let{texto:t}=e;const a=(0,n.A)(),s=(0,o.A)(a.breakpoints.down("sm")),c=(0,r.Zp)();return(0,l.jsx)(l.Fragment,{children:s&&(0,l.jsxs)("div",{style:{position:"fixed",top:0,left:0,width:"100%",height:60,padding:a.spacing(1),backgroundColor:a.palette.background.paper,boxShadow:a.shadows[2],display:"flex",alignItems:"center",zIndex:1e3,boxSizing:"border-box"},children:[(0,l.jsx)(i.A,{onClick:()=>c(-1),"aria-label":"back",children:(0,l.jsx)(d.A,{})}),(0,l.jsx)("h2",{style:{marginLeft:a.spacing(2)},children:t})]})})},u=s.memo(c)},7938:(e,t,a)=>{a.d(t,{A:()=>c});var s=a(899),r=a(6491),n=a(226),o=a(3464),i=a(9950),d=a(8429),l=a(4414);const c=function(e){let{data:t,enviado:a,isBuscar:c}=e;const[u,p]=(0,i.useState)(!1),[m,x]=(0,i.useState)(null),h=(0,d.Zp)(),g=e=>{x(e),p(!0)};return console.log(t),(0,l.jsxs)(l.Fragment,{children:[t.map(((e,t)=>(0,l.jsx)(s.Ay,{container:!0,justifyContent:"center",children:(0,l.jsx)(s.Ay,{item:!0,xs:12,sm:10,children:"Exterior"===e.contexto?(0,l.jsxs)(r.A,{display:"flex",alignItems:"center",p:1,borderRadius:8,boxShadow:3,width:"100%",children:[(0,l.jsx)("img",{src:e.Imagen,alt:"Sample",style:{borderRadius:"30%",width:"100%",maxWidth:"80px",marginRight:"16px"},onClick:()=>g(e.Imagen)}),(0,l.jsxs)("div",{children:[(0,l.jsx)("h3",{children:e.Titulo}),(0,l.jsx)("p",{children:e.Detalles})]})]}):(0,l.jsx)("div",{style:{marginTop:15},children:(0,l.jsxs)(r.A,{display:"flex",alignItems:"center",p:1,borderRadius:8,onClick:()=>(e=>{if(c){let t="Guinea Ecuatorial"!==e.Pais?"Exterior":"Nacional";h("/Buscar/Editar/".concat(e.Codigo,"/").concat(t))}})(e),boxShadow:3,width:"100%",children:[(0,l.jsx)("img",{src:e.Imagen,alt:"Sample",style:{borderRadius:"30%",width:"100%",maxWidth:"80px",marginRight:"16px"},onClick:()=>g(e.Imagen)}),(0,l.jsxs)("div",{children:[(0,l.jsx)("h3",{children:e.Titulo}),c?(0,l.jsx)("p",{children:"Cantidad:".concat(e.Cantidad,"     Stock:").concat(e.Stock,"\n")}):(0,l.jsx)("p",{children:e.Detalles})]}),c?null:"Retirado"!==e.Estado&&(0,l.jsx)("div",{style:{paddingLeft:"10px"},children:(0,l.jsx)(n.A,{onClick:()=>(e=>{"Enviado"===e.Estado?a(e,"Retirado"):a(e,"Enviado")})(e),variant:"contained",color:"primary",style:{borderRadius:"20px",marginRight:"14px"},children:"Comprado"===e.Estado?"Enviado":"Enviado"===e.Estado?"Retirado":null})})]})})})},t))),(0,l.jsx)(o.A,{open:u,onClose:()=>{p(!1),x(null)},maxWidth:"lg",children:(0,l.jsx)("div",{style:{backgroundColor:"rgba(0, 0, 0, 0.8)"},children:(0,l.jsx)("img",{src:m,alt:"Enlarged Sample",style:{width:"100%"}})})})]})}}}]);