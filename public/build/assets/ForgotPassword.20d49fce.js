import{G as d}from"./GuestLayout.2b3a8aee.js";import{I as u}from"./InputError.0b9ea282.js";import{P as c}from"./PrimaryButton.9a7fd745.js";import{T as p}from"./TextInput.369ca82d.js";import{u as w,j as t,a as e,H as f}from"./app.ef92ad8e.js";import"./ApplicationLogo.4f55f2f8.js";import"./iconBase.41df802e.js";function P({status:s}){const{data:o,setData:r,post:m,processing:l,errors:i}=w({email:""}),n=a=>{r(a.target.name,a.target.value)};return t(d,{children:[e(f,{title:"Forgot Password"}),e("div",{className:"mb-4 text-sm text-gray-600",children:"Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one."}),s&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:s}),t("form",{onSubmit:a=>{a.preventDefault(),m(route("password.email"))},children:[e(p,{id:"password",type:"email",name:"email",value:o.email,className:"mt-1 block w-full",isFocused:!0,handleChange:n}),e(u,{message:i.email,className:"mt-2"}),e("div",{className:"flex items-center justify-end mt-4",children:e(c,{className:"ml-4",processing:l,children:"Email Password Reset Link"})})]})]})}export{P as default};