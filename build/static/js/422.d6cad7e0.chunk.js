"use strict";(self.webpackChunkmira=self.webpackChunkmira||[]).push([[422],{71422:function(e,t,i){i.r(t);var a=i(72791),s=i(50225),d=i(11087),n=i(6907),r=i(8144),o=i(793),l=i(65166),c=i(57621),p=i(39504),g=i(89861),m=i(94721),u=i(93517),h=i(20890),b=i(61889),x=i(36151),Z=i(60220),j=i(50533),f=i(45682),v=i(80007),y=i(81258),$=i(50427),W=i(68087),k=i(80184);const I=(0,s.Z)(c.Z)(f.ZP),P=(0,s.Z)(p.Z)`
  &:last-child {
    padding-bottom: ${e=>e.theme.spacing(4)};
  }
`,w=(0,s.Z)(g.Z)`
  display: inline-flex;
`,A=(0,s.Z)(m.Z)(f.ZP),B=(0,s.Z)(u.Z)(f.ZP),C=(0,s.Z)(I)`
  border: 1px solid ${e=>e.theme.palette.grey[300]};
  margin-bottom: ${e=>e.theme.spacing(4)};
  cursor: grab;

  &:hover {
    background: ${e=>e.theme.palette.background.default};
  }
`,R=(0,s.Z)(P)`
  position: relative;

  &:last-child {
    padding-bottom: ${e=>e.theme.spacing(4)};
  }
`,S=s.Z.div`
  margin-top: ${e=>e.theme.spacing(1)};
`,D=(0,s.Z)(r.Z)`
  color: ${e=>e.theme.palette.grey[500]};
  vertical-align: middle;
`,G=s.Z.div`
  background: ${e=>e.color};
  width: 40px;
  height: 6px;
  border-radius: 6px;
  display: inline-block;
  margin-right: ${e=>e.theme.spacing(2)};
`,O=s.Z.div`
  display: flex;
  position: absolute;
  bottom: ${e=>e.theme.spacing(4)};
  right: ${e=>e.theme.spacing(4)};
`,T=s.Z.div`
  color: ${e=>e.theme.palette.grey[500]};
  font-weight: 600;
  margin-right: ${e=>e.theme.spacing(1)};
  line-height: 1.75;
`,E=(0,s.Z)(h.Z)(f.ZP),H=(0,s.Z)(E)`
  font-weight: 600;
  font-size: 15px;
  margin-right: ${e=>e.theme.spacing(10)};
`,L=[{id:l.We.datatype.uuid(),title:"Redesign the homepage",badges:[v.Z[600],y.Z[600]],notifications:2,avatars:[1,2,3,4]},{id:l.We.datatype.uuid(),title:"Upgrade dependencies to latest versions",badges:[v.Z[600]],notifications:1,avatars:[2]},{id:l.We.datatype.uuid(),title:"Google Adwords best practices",badges:[],notifications:0,avatars:[2,3]},{id:l.We.datatype.uuid(),title:"Improve site speed",badges:[v.Z[600]],notifications:3,avatars:[]},{id:l.We.datatype.uuid(),title:"Stripe payment integration",badges:[$.Z[600]],notifications:0,avatars:[]}],q=[{id:l.We.datatype.uuid(),title:"Google Adwords best practices",badges:[],notifications:0,avatars:[2,3]},{id:l.We.datatype.uuid(),title:"Stripe payment integration",badges:[$.Z[600]],notifications:0,avatars:[2]}],z=[{id:l.We.datatype.uuid(),title:"Improve site speed",badges:[v.Z[600]],notifications:3,avatars:[1,2]},{id:l.We.datatype.uuid(),title:"Google Adwords best practices",badges:[],notifications:0,avatars:[2]},{id:l.We.datatype.uuid(),title:"Redesign the homepage",badges:[v.Z[600],y.Z[600]],notifications:2,avatars:[]}],F={[l.We.datatype.uuid()]:{title:"Backlog",description:"Nam pretium turpis et arcu. Duis arcu.",items:L},[l.We.datatype.uuid()]:{title:"In Progress",description:"Curabitur ligula sapien, tincidunt non.",items:q},[l.We.datatype.uuid()]:{title:"Completed",description:"Aenean posuere, tortor sed cursus feugiat.",items:z}},K=e=>{let{column:t,children:i}=e;return(0,k.jsx)(b.ZP,{item:!0,xs:12,lg:4,xl:4,children:(0,k.jsx)(I,{mb:6,children:(0,k.jsxs)(P,{pb:0,children:[(0,k.jsx)(E,{variant:"h6",gutterBottom:!0,children:t.title}),(0,k.jsx)(E,{variant:"body2",mb:4,children:t.description}),i,(0,k.jsxs)(x.Z,{color:"primary",variant:"contained",fullWidth:!0,children:[(0,k.jsx)(W.Z,{}),"Add new task"]})]})})})},N=e=>{let{item:t}=e;return(0,k.jsx)(C,{mb:4,children:(0,k.jsxs)(R,{children:[t.badges&&t.badges.map(((e,t)=>(0,k.jsx)(G,{color:e},t))),(0,k.jsx)(H,{variant:"body1",gutterBottom:!0,children:t.title}),(0,k.jsx)(S,{children:(0,k.jsx)(w,{max:3,children:!!t.avatars&&t.avatars.map(((e,t)=>(0,k.jsx)(Z.Z,{src:`/static/img/avatars/avatar-${e}.jpg`},t)))})}),!!t.notifications&&t.notifications>0&&(0,k.jsxs)(O,{children:[(0,k.jsx)(T,{children:t.notifications}),(0,k.jsx)(D,{})]})]})})};t.default=function(){const[e,t]=(0,a.useState)(F),[i,s]=(0,a.useState)(!1);return(0,a.useEffect)((()=>{s(!0)}),[]),(0,k.jsxs)(a.Fragment,{children:[(0,k.jsx)(n.ql,{title:"Tasks"}),(0,k.jsx)(E,{variant:"h3",gutterBottom:!0,display:"inline",children:"Tasks"}),(0,k.jsxs)(B,{"aria-label":"Breadcrumb",mt:2,children:[(0,k.jsx)(j.Z,{component:d.OL,to:"/",children:"Dashboard"}),(0,k.jsx)(j.Z,{component:d.OL,to:"/",children:"Pages"}),(0,k.jsx)(E,{children:"Tasks"})]}),(0,k.jsx)(A,{my:6}),(0,k.jsx)(b.ZP,{container:!0,spacing:6,children:!!i&&(0,k.jsx)(o.Z5,{onDragEnd:i=>((e,t,i)=>{if(!e.destination)return;const{source:a,destination:s}=e;if(a.droppableId!==s.droppableId){const e=t[a.droppableId],d=t[s.droppableId],n=[...e.items],r=[...d.items],[o]=n.splice(a.index,1);r.splice(s.index,0,o),i({...t,[a.droppableId]:{...e,items:n},[s.droppableId]:{...d,items:r}})}else{const e=t[a.droppableId],d=[...e.items],[n]=d.splice(a.index,1);d.splice(s.index,0,n),i({...t,[a.droppableId]:{...e,items:d}})}})(i,e,t),children:Object.entries(e).map((e=>{let[t,i]=e;return(0,k.jsx)(K,{column:i,children:(0,k.jsx)(o.bK,{droppableId:t,children:e=>(0,k.jsxs)("div",{...e.droppableProps,ref:e.innerRef,style:{minHeight:50},children:[i.items.map(((e,t)=>(0,k.jsx)(o._l,{draggableId:e.id,index:t,children:t=>(0,k.jsx)("div",{ref:t.innerRef,...t.draggableProps,...t.dragHandleProps,children:(0,k.jsx)(N,{item:e})})},e.id))),e.placeholder]})},t)},t)}))})})]})}}}]);
//# sourceMappingURL=422.d6cad7e0.chunk.js.map