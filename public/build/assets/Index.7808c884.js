import{A as x,C}from"./AuthenticatedLayout.23c4379f.js";import{r as i,a as e,j as a,F as c,n as N,f as F}from"./app.08f049fb.js";import{u as _,M as q,P}from"./useFilteredComplains.4fff71d1.js";import{c as S}from"./index.esm.e2b292b4.js";import"./index.esm.be83b23b.js";import"./iconBase.d48c4426.js";import"./ResponsiveNavLink.baba1e38.js";import"./transition.7e1c8cc8.js";import"./Loading.299395bc.js";/* empty css              */import"./index.esm.d9c6ea5a.js";import"./TextInput.f0616493.js";import"./PrimaryButton.e36d506e.js";const z=({auth:d,...m})=>{console.log(m);const{filters:r,setFilters:l,currentPage:u,setCurrentPage:j,displayData:s,totalPages:g,handlePageChange:h}=_({},20);i.exports.useEffect(()=>{const t=JSON.parse(localStorage.getItem("reqcomplain"));t&&Object.keys(t).length>0&&l(t)},[]),i.exports.useEffect(()=>{localStorage.setItem("reqcomplain",JSON.stringify(r))},[r]);const o=[{title:"Tanggal Reqeust",column:"created_at",sortable:!1},{title:"Nomor Request",column:"no_request",sortable:!1},{title:"Nomor Resi",column:"awb",sortable:!1},{title:"Callers",column:"caller_category",sortable:!1},{title:"Caller Name",column:"caller_contact_name",sortable:!1},{title:"Caller CP",column:"caller_contact_person",sortable:!1},{title:"Status",column:"request_status",sortable:!1}],p=t=>{l({...r,...t})},f=t=>{l(t)};return e(x,{auth:d,header:a(c,{children:[e("h2",{className:"font-semibold text-lg text-gray-800 dark:text-white leading-tight",children:"Customer Service Requests"}),e(N,{title:"Claim"})]}),children:a(C,{children:[e(q,{header:o,datefilter:"created_at",editable:!0,data:(()=>s.length===0?e(c,{children:e("tbody",{children:e("tr",{children:e("td",{colSpan:"2",children:"Data Not Found"})})})}):e("tbody",{children:s.map((t,n)=>a("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600",children:[e("th",{className:"px-6 py-1",children:a("div",{className:"flex justify-around items-center",children:[n+1,e(F,{href:route("csoffice.complainrequest.generate",t.id),children:e(S,{className:"text-blue-500 hover:cursor-pointer"})})]})}),o.map((b,y)=>e("td",{className:"px-6 py-1",children:t[b.column]},y))]},n))}))(),filters:r,sendFilter:p,decrementFiter:f}),e(P,{currentPage:u,totalPages:g,onPageChange:h})]})})};export{z as default};
