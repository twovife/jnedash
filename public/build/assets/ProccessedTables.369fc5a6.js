import{P as F,I as O}from"./Paginate.a33c002d.js";import{P as g}from"./PrimaryButton.846d19f3.js";import{T as H}from"./TextInput.744ae61f.js";import{d as n}from"./dayjs.min.397db728.js";import{r,j as a,a as e}from"./app.8c596be0.js";import{b as L}from"./index.esm.3192bc5a.js";import{a as B,b as f}from"./index.esm.b249411a.js";import{N as G}from"./react-number-format.es.1299ed2e.js";import E from"./Detail.fb459dad.js";import K from"./ApproveModal.c3b9453d.js";import q from"./RejectedModal.06e9d0a5.js";import"./transition.c3d00c61.js";import"./iconBase.a6c65c8a.js";/* empty css              */import"./Modal.adbede95.js";import"./InputError.efaf66f5.js";import"./InputLabel.8ac2ae1f.js";import"./Toast.b86af5d7.js";import"./index.esm.a7d7b4b0.js";function pe({datas:c,onFilterChange:w,filterValue:y}){const{total:N,from:k,to:v,next_page_url:M,prev_page_url:S}=c,[d,p]=r.exports.useState(0),[C,i]=r.exports.useState(),[D,h]=r.exports.useState(!1),[I,m]=r.exports.useState(!1),[_,x]=r.exports.useState(!1),[T,u]=r.exports.useState({id:"",show:!1}),j=(t,s)=>{p(s),m(!0)},A=(t,s)=>{p(s),x(!0)},b=()=>{m(!1),x(!1)},o=t=>{i(t.target.getAttribute("data-url")),h(!0)},Y=t=>{i(""),h(!1)},P=t=>{u({id:t,show:!0})},R=()=>{u({id:"",show:!1})};return a("div",{className:"shadow-md sm:rounded-lg",children:[a("div",{className:"pb-4 bg-white dark:bg-gray-900 p-3",children:[e("label",{htmlFor:"table-search",className:"sr-only",children:"Search"}),a("div",{className:"relative mt-1",children:[e("div",{className:"flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none",children:e(L,{})}),e(H,{onChange:w,type:"text",id:"table-search",value:y,className:"block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"Search for data"})]})]}),e("div",{className:"overflow-x-auto ",children:a("table",{className:"w-full text-sm text-left text-slate-500 dark:text-slate-400",children:[e("thead",{className:"text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-400",children:a("tr",{className:"text-center",children:[e("th",{scope:"col",className:"py-3 px-6 whitespace-nowrap",children:"NOMOR TICKETING"}),e("th",{scope:"col",className:"py-3 px-6 whitespace-nowrap",children:"TANGGAL CLAIM"}),e("th",{scope:"col",className:"py-3 px-6 whitespace-nowrap",children:"Tanggal Proses"}),e("th",{scope:"col",className:"py-3 px-6 whitespace-nowrap",children:"PIC Proses"}),e("th",{scope:"col",className:"py-3 px-6 whitespace-nowrap",children:"NOMOR RESI"}),e("th",{scope:"col",className:"py-3 px-6 whitespace-nowrap",children:"Origin"}),e("th",{scope:"col",className:"py-3 px-6 whitespace-nowrap",children:"Destination"}),e("th",{scope:"col",className:"py-3 px-6 whitespace-nowrap",children:"SLA"}),e("th",{scope:"col",className:"py-3 px-6 whitespace-nowrap",children:"Claim Propose"}),e("th",{scope:"col",className:"whitespace-nowrap text-center py-3 px-6",children:"Lampiran"}),e("th",{scope:"col",className:"whitespace-nowrap text-center py-3 px-6",children:"Document"}),e("th",{scope:"col",className:"py-3 px-6",children:"Action"})]})}),c.data?e("tbody",{children:c.data.map((t,s)=>a("tr",{children:[e("td",{className:"py-3 px-6 text-center",children:e("button",{className:"text-brand-500 hover:text-brand-700 focus:text-brand-700",onClick:()=>P(t.id),children:t.ticket_id})}),e("td",{className:"py-3 px-6 whitespace-nowrap text-center",children:n(t.created_at).format("DD-MM-YYYY")}),e("td",{className:"py-3 px-6 whitespace-nowrap text-center",children:n(t.processed_at).format("DD-MM-YYYY")}),e("td",{className:"py-3 px-6 text-center",children:t.processedby.username}),e("td",{className:"py-3 px-6",children:t.cnote.connote}),e("td",{className:"py-3 px-6",children:t.cnote.shipper.origin}),e("td",{className:"py-3 px-6",children:t.cnote.receiver.destination}),e("td",{className:"whitespace-nowrap py-3 px-6",children:n(t.sla).format("DD-MM-YYYY")}),e("td",{className:"py-3 px-6 text-right",children:e(G,{value:t.claim_propose,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),e("td",{className:"py-3 px-6",children:a("div",{className:"flex items-center justify-center gap-2",children:[e("button",{"data-url":t.complainant_idcard,onClick:o,className:"px-2 py-1.5 bg-brand-500 rounded-lg text-white hover:bg-brand-600 focus:bg-brand-700 focus:ring-2 focus:ring-brand-600 text-xs",children:"KTP"}),e("button",{"data-url":t.complainant_bank,onClick:o,className:"px-2 py-1.5 bg-brand-500 rounded-lg text-white hover:bg-brand-600 focus:bg-brand-700 focus:ring-2 focus:ring-brand-600 text-xs",children:"Rekening"}),e("button",{"data-url":t.complainant_nota,onClick:o,className:"px-2 py-1.5 bg-brand-500 rounded-lg text-white hover:bg-brand-600 focus:bg-brand-700 focus:ring-2 focus:ring-brand-600 text-xs",children:"Nota"}),e("button",{"data-url":t.transfer_nota,onClick:o,className:"px-2 py-1.5 bg-brand-500 rounded-lg text-white hover:bg-brand-600 focus:bg-brand-700 focus:ring-2 focus:ring-brand-600 text-xs",children:"Transfer"})]})}),e("td",{className:"py-3 px-6",children:e("div",{className:"flex justify-center",children:e("a",{className:"p-2 border-gray-500 border rounded-lg hover:bg-gray-500 hover:text-white shadow focus:ring focus:ring-gray-400 focus:bg-gray-600 focus:text-white",target:"_blank",href:route("eclaim.exportpdf",t.ticket_id),children:e(B,{})})})}),a("td",{className:"py-3 px-6 flex gap-1 justify-center",children:[e(g,{theme:"success",type:"button",onClick:l=>j(l,t.id),children:e(f,{})}),e(g,{theme:"danger",type:"button",onClick:l=>A(l,t.id),children:e(f,{})})]})]},s))}):e("tbody",{children:e("tr",{children:e("td",{className:"py-3 px-6 text-center",colSpan:7,children:"Data Tidak Ditemukan"})})})]})}),e(F,{dataFrom:k,dataTo:v,dataTotal:N,linkPrev:S,linkNext:M}),e(K,{closeModal:b,showApprove:I,id:d}),e(q,{closeModal:b,showReject:_,id:d}),e(O,{imgs:C,show:D,onClosed:Y}),e(E,{modalShow:T,closedModal:R})]})}export{pe as default};
