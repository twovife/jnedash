import{u as p,r as f,j as a,a as e,H as g,L as w}from"./app.8c596be0.js";import{G as v}from"./GuestLayout.46f9bca2.js";import{I as o}from"./InputError.efaf66f5.js";import{I as n}from"./InputLabel.8ac2ae1f.js";import{P as h}from"./PrimaryButton.846d19f3.js";import{T as i}from"./TextInput.744ae61f.js";import{S as N}from"./SelectList.e482b12a.js";import"./ApplicationLogo.7e74f6f8.js";import"./iconBase.a6c65c8a.js";function L(){const{data:s,setData:l,post:u,processing:d,errors:r,reset:c}=p({name:"",username:"",zone:"",email:"",password:"",password_confirmation:""});f.exports.useEffect(()=>()=>{c("password","password_confirmation")},[]);const t=m=>{l(m.target.name,m.target.type==="checkbox"?m.target.checked:m.target.value)};return a(v,{children:[e(g,{title:"Register"}),a("form",{onSubmit:m=>{m.preventDefault(),u(route("register"))},children:[a("div",{children:[e(n,{forInput:"name",value:"Name"}),e(i,{id:"name",name:"name",value:s.name,className:"mt-1 block w-full",autoComplete:"name",isFocused:!0,onChange:t,required:!0}),e(o,{message:r.name,className:"mt-2"})]}),a("div",{className:"mt-4",children:[e(n,{forInput:"username",value:"Username"}),e(i,{id:"username",name:"username",value:s.username,className:"mt-1 block w-full",autoComplete:"username",onChange:t,required:!0}),e(o,{message:r.username,className:"mt-2"})]}),a("div",{className:"mt-4",children:[e(n,{forInput:"zone",value:"zone"}),e(N,{id:"zone",name:"zone",value:s.zone,className:"mt-1 block w-full",onChange:t,options:[{id:4,value:"",display:"Select One"},{id:1,value:1,display:"Kediri"},{id:2,value:2,display:"Tulungagung"},{id:3,value:3,display:"Trenggalek"}],required:!0}),e(o,{message:r.zone,className:"mt-2"})]}),a("div",{className:"mt-4",children:[e(n,{forInput:"email",value:"Email"}),e(i,{id:"email",type:"email",name:"email",value:s.email,className:"mt-1 block w-full",autoComplete:"email",onChange:t,required:!0}),e(o,{message:r.email,className:"mt-2"})]}),a("div",{className:"mt-4",children:[e(n,{forInput:"password",value:"Password"}),e(i,{id:"password",type:"password",name:"password",value:s.password,className:"mt-1 block w-full",autoComplete:"new-password",onChange:t,required:!0}),e(o,{message:r.password,className:"mt-2"})]}),a("div",{className:"mt-4",children:[e(n,{forInput:"password_confirmation",value:"Confirm Password"}),e(i,{id:"password_confirmation",type:"password",name:"password_confirmation",value:s.password_confirmation,className:"mt-1 block w-full",onChange:t,required:!0}),e(o,{message:r.password_confirmation,className:"mt-2"})]}),a("div",{className:"flex items-center justify-end mt-4",children:[e(w,{href:route("login"),className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Already registered?"}),e(h,{className:"ml-4",type:"submit",processing:d,children:"Register"})]})]})]})}export{L as default};
