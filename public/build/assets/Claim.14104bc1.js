import{I as c}from"./InputError.3b4ac078.js";import{L as _}from"./Loading.3d8c5e28.js";import{r as a,j as o,F as w,a as e,H as N,g as v}from"./app.4d2c9d37.js";import S from"./Input.c2536c51.js";/* empty css              */import"./transition.bd16d137.js";import"./Checkbox.62dc2ff2.js";import"./InputLabel.1b52cc6e.js";import"./Modal.efbe072d.js";import"./PrimaryButton.1c6ba562.js";import"./SelectList.887315e7.js";import"./TextInput.cb6b87c9.js";import"./dayjs.min.ffda598a.js";import"./Toast.b018f612.js";import"./iconBase.01b76188.js";import"./index.esm.47d8c910.js";function K({errors:u,...y}){const[p,g]=a.exports.useState(),[t,r]=a.exports.useState({_status:"",_message:""}),[b,x]=a.exports.useState(),[n,m]=a.exports.useState(!1),[d,i]=a.exports.useState(!1),f=l=>{g(l.target.value),r({_status:"",_message:""})},h=l=>{i(!0),v.get(route("api.eclaim.checkawb"),{params:{nomor_resi:p}}).then(s=>{m(!0),r(200),x(s.data.data),r({_status:s.status,_message:s.statusText}),i(!1)}).catch(s=>{m(!1),console.log(s),r({_status:s.response.status,_message:s.response.data.message}),i(!1)})};return o(w,{children:[e(N,{title:"E Claim JNE Kediri"}),e(_,{show:d}),e("div",{className:"bg-[url('/background.svg')] w-full h-screen bg-cover bg-no-repeat bg-center flex items-center flex-row font-roboto fixed top-0 left-0 z-0"}),e("div",{className:"flex items-center justify-center min-h-screen",children:o("div",{className:"max-w-xl mx-auto w-full p-5 bg-gray-700/5 rounded-lg shadow-xl relative z-10 m-5 mb-10",children:[e("h2",{className:"text-xl font-semibold text-gray-700",children:"INPUT RESI"}),o("div",{children:[o("div",{className:"flex gap-2",children:[e("input",{onChange:f,type:"text",name:"nomor_resi",disabled:n,className:`w-full focus:outline-none focus:ring-0 focus:border-brand-500 ${t._status==""?"border rounded":t._status==200?"border-green-500  disabled:bg-green-100 border border-t-0 border-x-0":"border-secondary-500 border rounded"}`}),e("button",{onClick:h,className:`border px-5 py-2 text-white font-medium tracking-widest bg-brand-500 rounded hover:bg-brand-600 focus:bg-brand-700 ${n&&"hidden"}`,children:"Search"})]}),e(c,{message:u.cnote,className:"mt-2 text-xs"}),t._status==200||t._status==""?null:e(c,{message:t._message,className:"mt-2 text-xs"})]}),n&&e(S,{responses:b,loading:d})]})})]})}export{K as default};