import{A as g,C as x}from"./AuthenticatedLayout.a232bc3a.js";import{L as F}from"./Loading.a0c31041.js";import{T as C}from"./Toasts.929f49e0.js";import{r as e,j as v,a as t,F as S,H as T,d as j}from"./app.ef92ad8e.js";import w from"./ClosedTables.d587a516.js";import"./ApplicationLogo.4f55f2f8.js";import"./iconBase.41df802e.js";import"./index.esm.00760aa9.js";import"./index.esm.3c143e6d.js";import"./ResponsiveNavLink.35b757d8.js";import"./transition.bee2fc7a.js";import"./Toast.06356e3b.js";/* empty css              */import"./index.esm.a7ef5833.js";import"./Paginate.66f81a3b.js";import"./TextInput.369ca82d.js";import"./dayjs.min.45a64dea.js";import"./react-number-format.es.0878bd4b.js";import"./Detail.99ac86f5.js";import"./Modal.b5d6779e.js";function R({auth:o,errors:a,flash:s,claim:l,filterval:m,...L}){const[n,p]=e.exports.useState(null),[d,c]=e.exports.useState(m||void 0),[h,r]=e.exports.useState(!1);return v(g,{auth:o,errors:a,header:t(S,{children:t("h2",{className:"font-semibold text-xl text-gray-800 dark:text-white leading-tight",children:"E-Claim"})}),children:[t(T,{title:"Claim"}),t(x,{children:t(w,{datas:l,onFilterChange:i=>{c(i.target.value),clearTimeout(n);const u=setTimeout(()=>{j.Inertia.get(route("eclaim.closed"),{search:i.target.value},{preserveState:!0,onStart:f=>{r(!0)},onFinish:f=>{r(!1)}})},500);p(u)},filterValue:d})}),t(F,{show:h}),t(C,{flash:s})]})}export{R as default};
