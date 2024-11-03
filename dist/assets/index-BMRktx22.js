import{l as A,m as B,n as ne,s as f,o as v,_ as n,p as ie,b as d,q as F,t as _,j as o,v as M,w as I,x as de,y as pe,z as V,u as ue,E as me,F as ge,T as Z,H as he,I as xe,N as fe,G as Q,g as Ce,C as ve,a as ye,A as be}from"./index-DAQkB8Or.js";import{T as De}from"./TotalGrowthBarChart-CzOO81-2.js";import{B as ee}from"./react-toastify.esm-CxVbbRne.js";import{a as ke}from"./axios-DbhgdiIy.js";import{T as Pe,a as je,b as Se,c as te,d as S,e as we,f as Me}from"./TableRow-I-FtpPTN.js";import{B as K}from"./Button-DUe12lg5.js";import{T as O}from"./TextField-DX-GXNEd.js";function Te(e){return A("MuiCircularProgress",e)}B("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const $e=["className","color","disableShrink","size","style","thickness","value","variant"];let z=e=>e,oe,se,ae,re;const w=44,We=ne(oe||(oe=z`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),Ne=ne(se||(se=z`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),Re=e=>{const{classes:t,variant:s,color:r,disableShrink:c}=e,i={root:["root",s,`color${v(r)}`],svg:["svg"],circle:["circle",`circle${v(s)}`,c&&"circleDisableShrink"]};return I(i,Te,t)},Ue=f("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[t.root,t[s.variant],t[`color${v(s.color)}`]]}})(({ownerState:e,theme:t})=>n({display:"inline-block"},e.variant==="determinate"&&{transition:t.transitions.create("transform")},e.color!=="inherit"&&{color:(t.vars||t).palette[e.color].main}),({ownerState:e})=>e.variant==="indeterminate"&&ie(ae||(ae=z`
      animation: ${0} 1.4s linear infinite;
    `),We)),Ae=f("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,t)=>t.svg})({display:"block"}),Be=f("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[t.circle,t[`circle${v(s.variant)}`],s.disableShrink&&t.circleDisableShrink]}})(({ownerState:e,theme:t})=>n({stroke:"currentColor"},e.variant==="determinate"&&{transition:t.transitions.create("stroke-dashoffset")},e.variant==="indeterminate"&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:e})=>e.variant==="indeterminate"&&!e.disableShrink&&ie(re||(re=z`
      animation: ${0} 1.4s ease-in-out infinite;
    `),Ne)),Fe=d.forwardRef(function(t,s){const r=F({props:t,name:"MuiCircularProgress"}),{className:c,color:i="primary",disableShrink:p=!1,size:u=40,style:m,thickness:h=3.6,value:C=0,variant:$="indeterminate"}=r,W=_(r,$e),y=n({},r,{color:i,disableShrink:p,size:u,thickness:h,value:C,variant:$}),g=Re(y),k={},P={},T={};if($==="determinate"){const j=2*Math.PI*((w-h)/2);k.strokeDasharray=j.toFixed(3),T["aria-valuenow"]=Math.round(C),k.strokeDashoffset=`${((100-C)/100*j).toFixed(3)}px`,P.transform="rotate(-90deg)"}return o.jsx(Ue,n({className:M(g.root,c),style:n({width:u,height:u},P,m),ownerState:y,ref:s,role:"progressbar"},T,W,{children:o.jsx(Ae,{className:g.svg,ownerState:y,viewBox:`${w/2} ${w/2} ${w} ${w}`,children:o.jsx(Be,{className:g.circle,style:k,ownerState:y,cx:w,cy:w,r:(w-h)/2,fill:"none",strokeWidth:h})})}))});function _e(e){return A("MuiDialog",e)}const X=B("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]),le=d.createContext({}),Ie=["aria-describedby","aria-labelledby","BackdropComponent","BackdropProps","children","className","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClick","onClose","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps"],Ee=f(de,{name:"MuiDialog",slot:"Backdrop",overrides:(e,t)=>t.backdrop})({zIndex:-1}),Le=e=>{const{classes:t,scroll:s,maxWidth:r,fullWidth:c,fullScreen:i}=e,p={root:["root"],container:["container",`scroll${v(s)}`],paper:["paper",`paperScroll${v(s)}`,`paperWidth${v(String(r))}`,c&&"paperFullWidth",i&&"paperFullScreen"]};return I(p,_e,t)},Ye=f(pe,{name:"MuiDialog",slot:"Root",overridesResolver:(e,t)=>t.root})({"@media print":{position:"absolute !important"}}),ze=f("div",{name:"MuiDialog",slot:"Container",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[t.container,t[`scroll${v(s.scroll)}`]]}})(({ownerState:e})=>n({height:"100%","@media print":{height:"auto"},outline:0},e.scroll==="paper"&&{display:"flex",justifyContent:"center",alignItems:"center"},e.scroll==="body"&&{overflowY:"auto",overflowX:"hidden",textAlign:"center","&::after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}})),qe=f(V,{name:"MuiDialog",slot:"Paper",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[t.paper,t[`scrollPaper${v(s.scroll)}`],t[`paperWidth${v(String(s.maxWidth))}`],s.fullWidth&&t.paperFullWidth,s.fullScreen&&t.paperFullScreen]}})(({theme:e,ownerState:t})=>n({margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},t.scroll==="paper"&&{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},t.scroll==="body"&&{display:"inline-block",verticalAlign:"middle",textAlign:"left"},!t.maxWidth&&{maxWidth:"calc(100% - 64px)"},t.maxWidth==="xs"&&{maxWidth:e.breakpoints.unit==="px"?Math.max(e.breakpoints.values.xs,444):`max(${e.breakpoints.values.xs}${e.breakpoints.unit}, 444px)`,[`&.${X.paperScrollBody}`]:{[e.breakpoints.down(Math.max(e.breakpoints.values.xs,444)+32*2)]:{maxWidth:"calc(100% - 64px)"}}},t.maxWidth&&t.maxWidth!=="xs"&&{maxWidth:`${e.breakpoints.values[t.maxWidth]}${e.breakpoints.unit}`,[`&.${X.paperScrollBody}`]:{[e.breakpoints.down(e.breakpoints.values[t.maxWidth]+32*2)]:{maxWidth:"calc(100% - 64px)"}}},t.fullWidth&&{width:"calc(100% - 64px)"},t.fullScreen&&{margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0,[`&.${X.paperScrollBody}`]:{margin:0,maxWidth:"100%"}})),Ge=d.forwardRef(function(t,s){const r=F({props:t,name:"MuiDialog"}),c=ue(),i={enter:c.transitions.duration.enteringScreen,exit:c.transitions.duration.leavingScreen},{"aria-describedby":p,"aria-labelledby":u,BackdropComponent:m,BackdropProps:h,children:C,className:$,disableEscapeKeyDown:W=!1,fullScreen:y=!1,fullWidth:g=!1,maxWidth:k="sm",onBackdropClick:P,onClick:T,onClose:j,open:Y,PaperComponent:q=V,PaperProps:N={},scroll:E="paper",TransitionComponent:G=ge,transitionDuration:L=i,TransitionProps:H}=r,a=_(r,Ie),l=n({},r,{disableEscapeKeyDown:W,fullScreen:y,fullWidth:g,maxWidth:k,scroll:E}),b=Le(l),x=d.useRef(),D=U=>{x.current=U.target===U.currentTarget},J=U=>{T&&T(U),x.current&&(x.current=null,P&&P(U),j&&j(U,"backdropClick"))},R=me(u),ce=d.useMemo(()=>({titleId:R}),[R]);return o.jsx(Ye,n({className:M(b.root,$),closeAfterTransition:!0,components:{Backdrop:Ee},componentsProps:{backdrop:n({transitionDuration:L,as:m},h)},disableEscapeKeyDown:W,onClose:j,open:Y,ref:s,onClick:J,ownerState:l},a,{children:o.jsx(G,n({appear:!0,in:Y,timeout:L,role:"presentation"},H,{children:o.jsx(ze,{className:M(b.container),onMouseDown:D,ownerState:l,children:o.jsx(qe,n({as:q,elevation:24,role:"dialog","aria-describedby":p,"aria-labelledby":R},N,{className:M(b.paper,N.className),ownerState:l,children:o.jsx(le.Provider,{value:ce,children:C})}))})}))}))});function He(e){return A("MuiDialogActions",e)}B("MuiDialogActions",["root","spacing"]);const Ke=["className","disableSpacing"],Oe=e=>{const{classes:t,disableSpacing:s}=e;return I({root:["root",!s&&"spacing"]},He,t)},Xe=f("div",{name:"MuiDialogActions",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[t.root,!s.disableSpacing&&t.spacing]}})(({ownerState:e})=>n({display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto"},!e.disableSpacing&&{"& > :not(style) ~ :not(style)":{marginLeft:8}})),Ve=d.forwardRef(function(t,s){const r=F({props:t,name:"MuiDialogActions"}),{className:c,disableSpacing:i=!1}=r,p=_(r,Ke),u=n({},r,{disableSpacing:i}),m=Oe(u);return o.jsx(Xe,n({className:M(m.root,c),ownerState:u,ref:s},p))});function Ze(e){return A("MuiDialogContent",e)}B("MuiDialogContent",["root","dividers"]);function Je(e){return A("MuiDialogTitle",e)}const Qe=B("MuiDialogTitle",["root"]),et=["className","dividers"],tt=e=>{const{classes:t,dividers:s}=e;return I({root:["root",s&&"dividers"]},Ze,t)},ot=f("div",{name:"MuiDialogContent",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[t.root,s.dividers&&t.dividers]}})(({theme:e,ownerState:t})=>n({flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"20px 24px"},t.dividers?{padding:"16px 24px",borderTop:`1px solid ${(e.vars||e).palette.divider}`,borderBottom:`1px solid ${(e.vars||e).palette.divider}`}:{[`.${Qe.root} + &`]:{paddingTop:0}})),st=d.forwardRef(function(t,s){const r=F({props:t,name:"MuiDialogContent"}),{className:c,dividers:i=!1}=r,p=_(r,et),u=n({},r,{dividers:i}),m=tt(u);return o.jsx(ot,n({className:M(m.root,c),ownerState:u,ref:s},p))});function at(e){return A("MuiDialogContentText",e)}B("MuiDialogContentText",["root"]);const rt=["children","className"],nt=e=>{const{classes:t}=e,r=I({root:["root"]},at,t);return n({},t,r)},it=f(Z,{shouldForwardProp:e=>he(e)||e==="classes",name:"MuiDialogContentText",slot:"Root",overridesResolver:(e,t)=>t.root})({}),lt=d.forwardRef(function(t,s){const r=F({props:t,name:"MuiDialogContentText"}),{className:c}=r,i=_(r,rt),p=nt(i);return o.jsx(it,n({component:"p",variant:"body1",color:"text.secondary",ref:s,ownerState:i,className:M(p.root,c)},r,{classes:p}))}),ct=["className","id"],dt=e=>{const{classes:t}=e;return I({root:["root"]},Je,t)},pt=f(Z,{name:"MuiDialogTitle",slot:"Root",overridesResolver:(e,t)=>t.root})({padding:"16px 24px",flex:"0 0 auto"}),ut=d.forwardRef(function(t,s){const r=F({props:t,name:"MuiDialogTitle"}),{className:c,id:i}=r,p=_(r,ct),u=r,m=dt(u),{titleId:h=i}=d.useContext(le);return o.jsx(pt,n({component:"h2",className:M(m.root,c),ownerState:u,ref:s,variant:"h6",id:i??h},p))}),yt=()=>{const{instance:e}=xe();if(!e.getActiveAccount())return o.jsx(fe,{to:"/login",replace:!0});const[s,r]=d.useState([]),[c,i]=d.useState([]),[p,u]=d.useState(!0),[m,h]=d.useState(0),[C,$]=d.useState(5),[W,y]=d.useState(!1),[g,k]=d.useState({name:"",familyName:"",email:""}),P=async()=>{try{const a=await fetch("http://127.0.0.1:8000/ai/users");if(a.ok){const l=await a.json();r(l),T(l)}else console.error("Failed to fetch users:",a.status)}catch(a){console.error("Error fetching users:",a)}finally{u(!1)}};d.useEffect(()=>{P()},[]);const T=a=>{const l={};a.forEach(x=>{const D=new Date(x.createdAt);D.toLocaleString("default",{month:"long"});const R=`${D.getFullYear()}-${D.getMonth()+1}`;l[R]=(l[R]||0)+1});const b=Object.entries(l).map(([x,D])=>({monthYear:x,count:D})).sort((x,D)=>new Date(x.monthYear)-new Date(D.monthYear));i(b)};c.map(a=>a.count),c.map(a=>{const[l,b]=a.monthYear.split("-");return new Date(l,b-1).toLocaleString("default",{month:"long",year:"numeric"})});const j=(a,l)=>{h(l)},Y=a=>{$(parseInt(a.target.value,10)),h(0)},q=()=>{y(!0)},N=()=>{y(!1),k({name:"",familyName:"",email:""}),P()},E=a=>{const{name:l,value:b}=a.target;k(x=>({...x,[l]:b}))},[G,L]=d.useState(!1),H=async a=>{a.preventDefault(),L(!0);try{(await ke.post("http://127.0.0.1:8000/ai/invite",{email:g.email,display_name:g.name+" "+g.familyName})).status===200&&ee.error("User invited successfully!"),N()}catch(l){ee.error("An error occurred while inviting the user."),console.error("Error inviting user:",l)}L(!1)};return p?o.jsx(De,{}):o.jsxs(Q,{container:!0,spacing:Ce,children:[o.jsx(Q,{item:!0,xs:12,children:o.jsx(ve,{style:{width:"100%"},children:o.jsxs(ye,{children:[o.jsx(Z,{variant:"h6",gutterBottom:!0,style:{marginTop:"20px"},children:"User List"}),o.jsx(Pe,{component:V,style:{width:"100%"},children:o.jsxs(je,{"aria-label":"user table",children:[o.jsx(Se,{children:o.jsxs(te,{children:[o.jsx(S,{children:"Profile"}),o.jsx(S,{children:"Name"}),o.jsx(S,{children:"Username"}),o.jsx(S,{align:"right",children:o.jsx(K,{variant:"contained",color:"primary",onClick:q,children:"Add User"})})]})}),o.jsx(we,{children:s==null?void 0:s.users.slice(m*C,m*C+C).map(a=>o.jsxs(te,{children:[o.jsx(S,{children:o.jsx(be,{alt:a.displayName,src:a==null?void 0:a.userPrincipalName})}),o.jsx(S,{children:a==null?void 0:a.displayName}),o.jsx(S,{children:a==null?void 0:a.mail}),o.jsx(S,{align:"right"})]},a==null?void 0:a.email))})]})}),o.jsx(Me,{rowsPerPageOptions:[5,10,25],component:"div",count:s.length,rowsPerPage:C,page:m,onPageChange:j,onRowsPerPageChange:Y})]})})}),o.jsxs(Ge,{open:W,onClose:N,children:[o.jsx(ut,{children:"Add New User"}),o.jsxs(st,{children:[o.jsx(lt,{children:"To add a new user, please enter their details below."}),o.jsxs("form",{onSubmit:H,children:[o.jsx(O,{autoFocus:!0,margin:"dense",label:"Name",type:"text",fullWidth:!0,name:"name",value:g.name,onChange:E,required:!0}),o.jsx(O,{margin:"dense",label:"Family Name",type:"text",fullWidth:!0,name:"familyName",value:g.familyName,onChange:E,required:!0}),o.jsx(O,{margin:"dense",label:"Email",type:"email",fullWidth:!0,name:"email",value:g.email,onChange:E,required:!0}),o.jsxs(Ve,{children:[o.jsx(K,{onClick:N,color:"primary",children:"Cancel"}),G==!0?o.jsx(Fe,{}):o.jsx(K,{type:"submit",color:"primary",children:"Add User"})]})]})]})]})]})};export{yt as default};