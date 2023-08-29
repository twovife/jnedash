import{A as S,C}from"./AuthenticatedLayout.3a834364.js";import{L as F}from"./LinkButton.834c1d35.js";import{L as N}from"./Loading.8877910b.js";import{r,R as j,a as e,j as x,F as L,n as _,h as B}from"./app.c561b7a7.js";import{a as h}from"./Toast.cc0d5e15.js";import{a as E}from"./index.esm.a02ad3ad.js";import{J as b}from"./transition.a51bc210.js";import{c as P}from"./index.esm.6bad3090.js";import D from"./MonitoringTables.9ce13d4c.js";import"./index.esm.2d3dfd35.js";import"./iconBase.29444b14.js";import"./ResponsiveNavLink.cc168756.js";/* empty css              */import"./index.esm.9d3c3531.js";import"./ImageShow.016fd4c5.js";import"./InputLabel.9ae37665.js";import"./PrimaryButton.107bc81b.js";import"./TextInput.d39cb14c.js";import"./dayjs.min.7ad2b552.js";import"./react-number-format.es.a07cde17.js";function I({flash:n}){const{_error:l,_info:m,_success:c,_warning:i}=n;let[u,a]=r.exports.useState("bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200");const[f,t]=r.exports.useState(!1),[o,s]=r.exports.useState("");r.exports.useEffect(()=>{c?(a("bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"),setTimeout(()=>{t(!0),setTimeout(()=>{t(!1)},3e3)},500),s(c)):l?(a("bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"),setTimeout(()=>{t(!0),setTimeout(()=>{t(!1)},3e3)},500),s(l)):i?(a("bg-red-100 text-yellow-500 dark:bg-yellow-800 dark:text-yellow-200"),setTimeout(()=>{t(!0),setTimeout(()=>{t(!1)},3e3)},500),s(i)):m&&(a("bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200"),setTimeout(()=>{t(!0),setTimeout(()=>{t(!1)},3e3)},500),s(m))},[n]);const p=document.getElementById("toast-root");return j.createPortal(e(b,{show:f,children:e(b.Child,{enterFrom:"opacity-0",enterTo:"opacity-100",enter:"duration-300",leaveFrom:"opacity-100",leaveTo:"opacity-0",leave:"duration-300",children:x(h,{className:"absolute flex justify-center items-center top-10 translate-x-1/2 right-1/2 max-w-xs",children:[e("div",{className:`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${u}`,children:e(E,{className:"h-5 w-5"})}),e("div",{className:"ml-3 text-sm font-normal",children:o!=null?o:"Display message here"}),e(h.Toggle,{className:"flex items-center justify-center"})]})})}),p)}function re({auth:n,errors:l,flash:m,claim:c,filterval:i,filterfrom:u,filterthru:a,...f}){r.exports.useState(null),r.exports.useState(i||void 0),r.exports.useState(u||void 0),r.exports.useState(a||void 0);const[t,o]=r.exports.useState(!1),[s,p]=r.exports.useState({search:i||"",datefrom:u||"",datethru:a||""}),k=d=>{B.get(route("eclaim.monitoring"),s,{preserveState:!0,onStart:g=>{o(!0)},onFinish:g=>{o(!1)}})},y=d=>{window.open(route("eclaim.exportExcell",s),"_blank","noopener,noreferrer")},w=d=>{const g=d.target.name,T=d.target.value;p(v=>({...v,[g]:T}))};return x(S,{auth:n,errors:l,header:x(L,{children:[e("h2",{className:"font-semibold text-xl text-gray-800 dark:text-white leading-tight",children:"E-Claim"}),e("div",{className:"ml-auto flex gap-2",children:e(F,{title:"Create",theme:"base",type:"a",href:route("eclaim.create"),icon:e(P,{})})})]}),children:[e(_,{title:"Claim"}),e(C,{children:e(D,{datas:c,onFilterChange:k,onFilterInputChange:w,onDownloadFile:y,searchParams:s})}),e(N,{show:t}),e(I,{flash:m})]})}export{re as default};