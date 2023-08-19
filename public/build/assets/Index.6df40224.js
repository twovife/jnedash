import{A as P,C as v}from"./AuthenticatedLayout.8461eebf.js";import{u as x,M as F,P as k}from"./useFilteredComplains.4ec30925.js";import{r as i,j as a,F as p,a as e,n as M,f as D}from"./app.474a072e.js";import{c as f}from"./index.esm.9612bab6.js";import j from"./ModalFollow.2ff4fa0f.js";import{L as A}from"./LinkButton.b62f666d.js";import"./index.esm.8cb04479.js";import"./iconBase.da54b105.js";import"./ResponsiveNavLink.84d29d6c.js";import"./transition.c7963e2f.js";import"./Loading.cf8ab170.js";/* empty css              */import"./index.esm.357b877a.js";import"./TextInput.fbecb8e2.js";import"./PrimaryButton.1ef4762c.js";import"./InputLabel.c1d08c97.js";import"./Modal.04c392df.js";import"./SelectList.edf27e8f.js";import"./dayjs.min.b640d4d2.js";const te=({auth:h,...E})=>{const{filters:o,setFilters:r,currentPage:n,setCurrentPage:R,displayData:c,totalPages:b,handlePageChange:g}=x({},20),[y,m]=i.exports.useState({isShow:!1,id:null,data:null}),_=t=>{m({isShow:!0,id:t,data:null})},w=()=>{m({isShow:!1,id:null})};i.exports.useEffect(()=>{const t=JSON.parse(localStorage.getItem("complainfilter"));t&&Object.keys(t).length>0&&r(t)},[]),i.exports.useEffect(()=>{localStorage.setItem("complainfilter",JSON.stringify(o))},[o]);const u=[{title:"Nomor Tiket",column:"no_ticket",sortable:!1},{title:"followup",column:"followup",sortable:!1,filterable:!1},{title:"Cabang",column:"branch",sortable:!1},{title:"Source",column:"source",sortable:!1},{title:"Creator",column:"user_create",sortable:!1},{title:"Create on",column:"created_at",sortable:!1},{title:"Status Caller",column:"caller_category",sortable:!1},{title:" ",column:"caller_sub_category",filterable:!1,sortable:!1},{title:"Caller Name",column:"caller_contact_name",sortable:!1},{title:"Caller Phone",column:"caller_contact_person",sortable:!1},{title:"Nomor Resi",column:"connote",sortable:!1},{title:"Shipment Date",column:"connote_date",sortable:!1},{title:"Shipper Name",column:"shipper_name",sortable:!1},{title:"Shipper Phone",column:"shipper_phone",sortable:!1},{title:"Receiver Name",column:"receiver_name",sortable:!1},{title:"Receiver Addr",column:"receiver_address",sortable:!1},{title:"Receiver Phone",column:"receiver_phone",sortable:!1},{title:"Services",column:"services_code",sortable:!1},{title:"Category",column:"category",sortable:!1},{title:"Case Type",column:"case",sortable:!1},{title:"Sub Case Type",column:"sub_case",sortable:!1},{title:"Case Priority",column:"case_priority",sortable:!1},{title:"Origin",column:"origin",sortable:!1},{title:"Destination",column:"destination",sortable:!1},{title:"Keterangan",column:"note",sortable:!1},{title:"Followup By",column:"followup_by",sortable:!1},{title:"Due Date",column:"due_date",sortable:!1},{title:"Status SLA",column:"sla_status",sortable:!1},{title:"Status",column:"status",sortable:!1}],C=t=>{r({...o,...t})},S=t=>{r(t)},N=()=>c.length===0?e(p,{children:e("tbody",{children:e("tr",{children:e("td",{colSpan:"2",children:"Data Not Found"})})})}):e("tbody",{children:c.map((t,d)=>a("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-xs",children:[e("th",{className:"px-6 py-1",children:a("div",{className:"flex justify-around items-center gap-3",children:[(n-1)*20+d+1,e(D,{href:route("csoffice.complain.edit",t.id),children:e(f,{className:"text-blue-500 hover:cursor-pointer"})})]})}),u.map((l,s)=>l.column=="receiver_address"||l.column=="note"?e("td",{className:"px-6 py-1",children:e("div",{className:"w-64 white whitespace-pre-wrap",children:t[l.column]})},s):l.column=="followup"?e("td",{className:"px-6 py-1",children:e(f,{className:"text-blue-500 hover:cursor-pointer",onClick:()=>_(t.id)})},s):e("td",{className:"px-6 py-1 min-w-[10rem]",children:t[l.column]},s))]},d))});return a(P,{auth:h,header:a(p,{children:[e("h2",{className:"font-semibold text-lg text-gray-800 dark:text-white leading-tight",children:"E-Claim"}),e(M,{title:"Claim"}),e("div",{className:"ml-auto",children:e(A,{as:"a",title:"Create",href:route("csoffice.complain.create")})})]}),children:[e(j,{show:y,onModalClosed:w}),a(v,{children:[e(F,{header:u,datefilter:"created_at",editable:!0,data:N(),filters:o,sendFilter:C,decrementFiter:S}),e(k,{currentPage:n,totalPages:b,onPageChange:g})]})]})};export{te as default};