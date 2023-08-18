import{K as x,_ as w,a as e,j as s}from"./app.47aadbf4.js";import{I as t}from"./InputError.66be2a14.js";import{I as l}from"./InputLabel.8583ccba.js";import{M as C}from"./Modal.66f91f21.js";import{P as I}from"./PrimaryButton.61229e28.js";import{T as o}from"./TextInput.977b4eed.js";import{F as k}from"./Toast.605fff25.js";import{C as F}from"./index.esm.c26de98e.js";import"./transition.8b6baf28.js";import"./index.esm.f713b3d6.js";import"./iconBase.b44fa65b.js";function L({params:i,closeModal:c}){const{show:d,id:p}=i,{data:_,setData:n,post:u,processing:f,errors:r,clearErrors:g,reset:h}=x({claim_approved:"",reason:"",penyelesaian:"",pembebanan:""}),{flash:b}=w().props,m=a=>{n(a.target.name,a.target.type==="checkbox"?a.target.checked:a.target.value)},N=(a,y)=>{n(y,a)},v=a=>{n(a.target.name,a.target.files[0])};return e(C,{show:d,maxWidth:"md",onClose:()=>{c(),g(),h()},children:s("form",{onSubmit:a=>{a.preventDefault(),u(route("csoffice.claim.approved",p))},className:"p-6",children:[e("h2",{className:"text-lg font-medium text-gray-900 dark:text-white text-center",children:"Form Approval Claim"}),b.message&&e("div",{className:"bg-green-300 p-3 mt-4 rounded",children:"data berhasil diubah"}),r.message&&e("div",{className:"bg-rose-300 p-3 mt-4 rounded",children:"Terjadi Kesalahan, teliti atau refresh halaman dahulu"}),s("div",{className:"mt-4 flex flex-col lg:grid-cols-2 justify-center items-center gap-4",children:[s("div",{className:"w-full",children:[e(l,{forInput:"claim_approved",value:"Approved Claim"}),e(F,{name:"claim_approved",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-md shadow-sm mt-1 block w-full",id:"claim_approved",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:N,placeholder:"Inputkan angka tanpa sparator"}),e(t,{message:r.claim_approved,className:"mt-2"})]}),s("div",{className:"w-full",children:[e(l,{forInput:"reason",value:"Reason"}),e(o,{type:"text",name:"reason",onChange:m,className:"block w-full mt-1"}),e(t,{message:r.reason,className:"mt-2"})]}),s("div",{className:"w-full",children:[e(l,{forInput:"penyelesaian",value:"Penyelesaian"}),e(o,{type:"text",name:"penyelesaian",onChange:m,className:"block w-full mt-1"}),e(t,{message:r.penyelesaian,className:"mt-2"})]}),s("div",{className:"w-full",children:[e(l,{forInput:"pembebanan",value:"Pembebanan"}),e(o,{type:"text",name:"pembebanan",onChange:m,className:"block w-full mt-1"}),e(t,{message:r.pembebanan,className:"mt-2"})]}),s("div",{id:"notaselect",className:"w-full",children:[e(l,{htmlFor:"transfer",value:"Upload Nota Pembelian"}),e(k,{className:"mt-1",id:"transfer",name:"transfer",onChange:v}),e(t,{message:r.nota,className:"mt-2"})]})]}),e("div",{className:"mt-6",children:e(I,{type:"submit",theme:"success",processing:f,children:"Submit"})})]})})}export{L as default};
