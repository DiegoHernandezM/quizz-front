"use strict";(self.webpackChunkmira=self.webpackChunkmira||[]).push([[178],{21178:function(e,t,r){r.r(t),r.d(t,{default:function(){return K}});var n=r(72791),a=r(50225),i=r(11087),o=r(6907),l=r(59434),s=r(39769),c=r(57621),d=r(39504),u=r(94721),h=r(93517),p=r(35527),x=r(20068),m=r(13400),j=r(36151),g=r(20890),Z=r(50533),b=r(5397),f=r(74223),w=r(80184),v=(0,f.Z)((0,w.jsx)("path",{d:"M19 4h-3.5l-1-1h-5l-1 1H5v2h14zM6 7v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zm8 7v4h-4v-4H8l4-4 4 4h-2z"}),"RestoreFromTrash"),y=r(82460),S=r(24203),C=r(66250),k=r(45682),P=r(43238),T=r(13967),z=r(95193),F=r(5574),M=r(65661),R=r(39157),B=r(51691),D=r(97123);function E(e){let{open:t,close:r,title:n,body:a,agree:i}=e;const o=(0,T.Z)(),l=(0,z.Z)(o.breakpoints.down("md"));return(0,w.jsx)("div",{children:(0,w.jsxs)(F.Z,{fullScreen:l,open:t,onClose:r,"aria-labelledby":"responsive-dialog-title",children:[(0,w.jsx)(M.Z,{id:"responsive-dialog-title",children:n}),(0,w.jsx)(R.Z,{children:(0,w.jsx)(B.Z,{children:a})}),(0,w.jsxs)(D.Z,{children:[(0,w.jsx)(j.Z,{autoFocus:!0,onClick:r,children:"Cancelar"}),(0,w.jsx)(j.Z,{onClick:i,autoFocus:!0,children:"Aceptar"})]})]})})}var N=r(73974),V=r(64554),A=r(68096),$=r(48550),_=r(96739),H=r(8007),L=r(55705);function q(e){let{open:t,close:r,parentCallback:a,subject:i,update:o,updateRegister:l}=e;const s=H.Ry({name:H.Z_("Nombre").required("El nombre es requerido")}),c=(0,L.TA)({initialValues:{name:""},validationSchema:s,onSubmit:(e,t)=>{let{resetForm:r}=t;o?l(e):a(e),r(c.initialValues)}});return(0,n.useEffect)((()=>{c.setFieldValue("name",o?i.name:c.initialValues.name)}),[o,i]),(0,w.jsx)(N.ZP,{anchor:"right",open:t,onClose:r,children:(0,w.jsx)(V.Z,{sx:{width:{xs:"100%",md:"500px",xl:"600px"},padding:"10px"},children:(0,w.jsxs)("form",{noValidate:!0,autoComplete:"off",onSubmit:c.handleSubmit,children:[(0,w.jsxs)(V.Z,{style:{display:"flex",flexDirection:"row",flexWrap:"nowrap",justifyContent:"space-between"},children:[(0,w.jsx)(g.Z,{variant:"h4",style:{marginTop:"10px",marginBottom:"30px"},children:o?"Actualizar":"Nuevo"}),(0,w.jsx)(j.Z,{variant:"contained",color:"primary",type:"submit",style:{borderRadius:30,height:"30px",marginTop:"10px",marginLeft:"10px",marginBottom:"30px"},size:"small",children:o?"Actualizar":"Guardar"}),(0,w.jsx)(m.Z,{"aria-label":"close",onClick:r,sx:{color:e=>e.palette.grey[500]},style:{marginTop:"10px",marginBottom:"30px"},children:(0,w.jsx)(_.Z,{})})]}),(0,w.jsx)(A.Z,{style:{marginTop:"8px",width:"100%"},children:(0,w.jsx)($.Z,{id:"name",name:"name",label:"Nombre",value:c.values.name||"",onChange:c.handleChange,error:c.touched.name&&Boolean(c.errors.name),fullWidth:!0,helperText:c.touched.name&&c.errors.name,size:"small"})})]})})})}const G=(0,a.Z)(c.Z)(k.ZP),O=(0,a.Z)(d.Z)(k.ZP),I=(0,a.Z)(u.Z)(k.ZP),W=(0,a.Z)(h.Z)(k.ZP),U=(0,a.Z)(p.Z)(k.ZP),Y={pinter:{cursor:"pointer",marginLeft:"5px",textAlign:"center"}};function J(){const e=(0,l.I0)(),{allSubjects:t,subject:r}=(0,l.v9)((e=>e.subjects)),[a,i]=(0,n.useState)(""),[o,c]=(0,n.useState)([]),[d,u]=(0,n.useState)(!1),[h,p]=(0,n.useState)(""),[g,Z]=(0,n.useState)(""),[f,k]=(0,n.useState)(!1),[T,z]=(0,n.useState)(0),[F,M]=(0,n.useState)(!1),[R,B]=(0,n.useState)(!1);(0,n.useEffect)((()=>{e((0,s.T0)())}),[]);const D=()=>{u(!0)},N=e=>{i(e);const r=new RegExp(e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"i");const n=t.filter((e=>Object.keys(e).some((t=>r.test(e[t])))));c(n)},V=[{field:"id",headerName:"ID",width:150},{field:"name",headerName:"Materia",width:400,editable:!1},{field:"action",headerName:"Acciones",sortable:!1,disableExport:!0,width:300,renderCell:e=>(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(x.Z,{title:"Eliminar",children:(0,w.jsx)("div",{children:(0,w.jsx)(m.Z,{disabled:null!==e.row.deleted_at,onClick:t=>{console.log("ok"),t.stopPropagation(),k(!1),D(),p("Eliminar Materia"),Z("\xbfDesea eliminar el registro?"),z(e.row.id)},type:"button",color:"danger",style:Y.pinter,sx:{color:y.Z[500]},children:(0,w.jsx)(b.Z,{})},`delete-${e.row.id}`)})},`re-${e.row.id}`),(0,w.jsx)(x.Z,{title:"Recuperar",children:(0,w.jsx)("div",{children:(0,w.jsx)(m.Z,{disabled:null===e.row.deleted_at,color:"primary",onClick:t=>{t.stopPropagation(),D(),k(!0),p("Recuperar Materia"),Z("\xbfDesea recuperar el registro?"),z(e.row.id)},type:"button",style:Y.pinter,children:(0,w.jsx)(v,{})},`restore-${e.row.id}`)})},`res-${e.row.id}`)]})}];return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(G,{mb:6,children:[(0,w.jsx)(O,{pb:1,children:(0,w.jsx)(j.Z,{variant:"contained",sx:{marginBottom:"10px"},onClick:()=>{M(!0),B(!1)},children:"Nueva materia"})}),(0,w.jsx)(U,{children:(0,w.jsx)("div",{style:{height:400,width:"100%"},children:(0,w.jsx)(S._,{components:{Toolbar:P.Z},initialState:{pagination:{paginationModel:{page:0,pageSize:5}}},localeText:C._.components.MuiDataGrid.defaultProps.localeText,pageSizeOptions:[5,10,25],rows:o.length>0?o:t,rowHeight:40,columns:V,onRowDoubleClick:t=>{z(t.row.id),e((0,s.kB)(t.row.id)),B(!0),M(!0)},componentsProps:{hideFooterPagination:!1,toolbar:{export:!1,columns:!0,density:!0,search:!0,value:a,onChange:e=>N(e.target.value),clearSearch:()=>N("")}},pageSize:10})})})]}),(0,w.jsx)(E,{open:d,close:()=>{u(!1)},title:h,body:g,agree:()=>{e(f?function(e){return t=>new Promise((r=>{r(t((0,s.SY)(e)))})).then((()=>{t((0,s.T0)())})).catch((e=>{console.log(e)}))}(T):function(e){return t=>new Promise((r=>{r(t((0,s.oj)(e)))})).then((()=>{t((0,s.T0)())})).catch((e=>{console.log(e)}))}(T)),u(!1)}}),(0,w.jsx)(q,{open:F,close:()=>M(!1),parentCallback:t=>{e(function(e){return t=>new Promise((r=>{r(t((0,s.Ue)(e)))})).then((e=>{t((0,s.T0)()),M(!1),B(!1)})).catch((e=>{console.log(e)}))}(t))},subject:r,update:R,updateRegister:t=>{e(function(e){return t=>new Promise((r=>{r(t((0,s.Vx)(T,e)))})).then((e=>{t((0,s.T0)()),M(!1),B(!1)})).catch((e=>{console.log(e)}))}(t))}})]})}var K=function(){return(0,w.jsxs)(n.Fragment,{children:[(0,w.jsx)(o.ql,{title:"Data Grid"}),(0,w.jsx)(g.Z,{variant:"h3",gutterBottom:!0,display:"inline",children:"Lista de Materias"}),(0,w.jsxs)(W,{"aria-label":"Breadcrumb",mt:2,children:[(0,w.jsx)(Z.Z,{component:i.OL,to:"/",children:"Dashboard"}),(0,w.jsx)(g.Z,{children:"Materias"})]}),(0,w.jsx)(I,{my:6}),(0,w.jsx)(J,{})]})}}}]);
//# sourceMappingURL=178.f1083084.chunk.js.map