import{K as d,r as l,j as a,a as s,n as c}from"./app.c561b7a7.js";import{G as u}from"./GuestLayout.9942411d.js";import{I as f}from"./InputError.90f68184.js";import{I as w}from"./InputLabel.9ae37665.js";import{P as h}from"./PrimaryButton.107bc81b.js";import{T as g}from"./TextInput.d39cb14c.js";import"./ApplicationLogo.3b0867c9.js";import"./iconBase.29444b14.js";function T(){const{data:e,setData:t,post:o,processing:m,errors:n,reset:i}=d({password:""});l.exports.useEffect(()=>()=>{i("password")},[]);const p=r=>{t(r.target.name,r.target.value)};return a(u,{children:[s(c,{title:"Confirm Password"}),s("div",{className:"mb-4 text-sm text-gray-600",children:"This is a secure area of the application. Please confirm your password before continuing."}),a("form",{onSubmit:r=>{r.preventDefault(),o(route("password.confirm"))},children:[a("div",{className:"mt-4",children:[s(w,{forInput:"password",value:"Password"}),s(g,{id:"password",type:"password",name:"password",value:e.password,className:"mt-1 block w-full",isFocused:!0,handleChange:p}),s(f,{message:n.password,className:"mt-2"})]}),s("div",{className:"flex items-center justify-end mt-4",children:s(h,{className:"ml-4",processing:m,children:"Confirm"})})]})]})}export{T as default};