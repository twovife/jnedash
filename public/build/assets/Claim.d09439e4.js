import{I as c}from"./InputError.170fd300.js";import{L as _}from"./Loading.349b8d14.js";import{r as a,j as o,F as w,a as e,n as N,b as v}from"./app.1c44c716.js";import S from"./Input.af32af46.js";/* empty css              */import"./transition.20cc1751.js";import"./Checkbox.7463000c.js";import"./InputLabel.9f567bbf.js";import"./Modal.0876dcfd.js";import"./PrimaryButton.cbfd0745.js";import"./SelectList.11c54ed7.js";import"./TextInput.c69ececb.js";import"./dayjs.min.aedc46b2.js";import"./Toast.5ffe31a7.js";import"./index.esm.f52b2dc4.js";import"./iconBase.c2c17c45.js";import"./index.esm.932fbb73.js";function q({errors:u,...y}){const[p,g]=a.exports.useState(),[t,r]=a.exports.useState({_status:"",_message:""}),[b,x]=a.exports.useState(),[n,m]=a.exports.useState(!1),[l,i]=a.exports.useState(!1),f=d=>{g(d.target.value),r({_status:"",_message:""})},h=d=>{i(!0),v.get(route("api.eclaim.checkawb"),{params:{nomor_resi:p}}).then(s=>{m(!0),r(200),x(s.data.data),r({_status:s.status,_message:s.statusText}),i(!1)}).catch(s=>{m(!1),console.log(s),r({_status:s.response.status,_message:s.response.data.message}),i(!1)})};return o(w,{children:[e(N,{title:"E Claim JNE Kediri"}),e(_,{show:l}),e("div",{className:"bg-[url('/background.svg')] w-full h-screen bg-cover bg-no-repeat bg-center flex items-center flex-row font-roboto fixed top-0 left-0 z-0"}),e("div",{className:"flex items-center justify-center min-h-screen",children:o("div",{className:"max-w-xl mx-auto w-full p-5 bg-gray-700/5 rounded-lg shadow-xl relative z-10 m-5 mb-10",children:[e("h2",{className:"text-xl font-semibold text-gray-700",children:"INPUT RESI"}),o("div",{children:[o("div",{className:"flex gap-2",children:[e("input",{onChange:f,type:"text",name:"nomor_resi",disabled:n,className:`w-full focus:outline-none focus:ring-0 focus:border-brand-500 ${t._status==""?"border rounded":t._status==200?"border-green-500  disabled:bg-green-100 border border-t-0 border-x-0":"border-secondary-500 border rounded"}`}),e("button",{onClick:h,className:`border px-5 py-2 text-white font-medium tracking-widest bg-brand-500 rounded hover:bg-brand-600 focus:bg-brand-700 ${n&&"hidden"}`,children:"Search"})]}),e(c,{message:u.cnote,className:"mt-2 text-xs"}),t._status==200||t._status==""?null:e(c,{message:t._message,className:"mt-2 text-xs"})]}),n&&e(S,{responses:b,loading:l})]})})]})}export{q as default};