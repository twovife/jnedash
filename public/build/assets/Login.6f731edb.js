import{K as f,r as g,j as a,a as e,n as h}from"./app.47aadbf4.js";import{C as b}from"./Checkbox.5549aa74.js";import{G as x}from"./GuestLayout.24623fa9.js";import{I as n}from"./InputError.66be2a14.js";import{I as l}from"./InputLabel.8583ccba.js";import{P as w}from"./PrimaryButton.61229e28.js";import{T as i}from"./TextInput.977b4eed.js";import"./ApplicationLogo.54897318.js";import"./iconBase.b44fa65b.js";function G({status:m,canResetPassword:N}){const{data:r,setData:c,post:u,processing:d,errors:o,reset:p}=f({username:"",password:"",remember:""});g.exports.useEffect(()=>()=>{p("password")},[]);const t=s=>{c(s.target.name,s.target.type==="checkbox"?s.target.checked:s.target.value)};return a(x,{children:[e(h,{title:"Log in"}),m&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:m}),a("form",{onSubmit:s=>{s.preventDefault(),u(route("login"))},children:[a("div",{children:[e(l,{forInput:"username",value:"username"}),e(i,{id:"username",type:"text",name:"username",value:r.username,className:"mt-1 block w-full",autoComplete:"username",isFocused:!0,onChange:t}),e(n,{message:o.username,className:"mt-2"})]}),a("div",{className:"mt-4",children:[e(l,{forInput:"password",value:"Password"}),e(i,{id:"password",type:"password",name:"password",value:r.password,className:"mt-1 block w-full",autoComplete:"current-password",onChange:t}),e(n,{message:o.password,className:"mt-2"})]}),e("div",{className:"block mt-4",children:a("label",{className:"flex items-center",children:[e(b,{name:"remember",value:r.remember,onChange:t}),e("span",{className:"ml-2 text-sm text-gray-600",children:"Remember me"})]})}),e("div",{className:"flex items-center justify-end mt-4",children:e(w,{type:"submit",className:"ml-4",processing:d,children:"Log in"})})]})]})}export{G as default};