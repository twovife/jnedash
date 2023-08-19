import{a as l,r as O,K as ve,j as w,F as ae}from"./app.b9f1e905.js";import be from"./Layout.54427f59.js";import{I as _e}from"./InputArea.0a10f2e2.js";import{I}from"./InputLabel.2aa8bf6e.js";import{T as G}from"./TextInput.5ae182e8.js";import{S as ie}from"./SelectList.908578dd.js";import xe from"./SearchResi.4ba14e22.js";import{P as Se}from"./PrimaryButton.5ea39586.js";import{I as N}from"./InputError.fa811d7d.js";import{J as ce}from"./transition.f1611b7b.js";import"./Toast.44efcbf7.js";import"./index.esm.2a42969b.js";import"./iconBase.abfcc6c6.js";import"./index.esm.0eabf67f.js";var m={exports:{}},we="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",Re=we,Oe=Re;function de(){}function ue(){}ue.resetWarningCache=de;var Ne=function(){function e(r,t,i,h,_,f){if(f!==Oe){var d=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw d.name="Invariant Violation",d}}e.isRequired=e;function n(){return e}var o={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:n,element:e,elementType:e,instanceOf:n,node:e,objectOf:n,oneOf:n,oneOfType:n,shape:n,exact:n,checkPropTypes:ue,resetWarningCache:de};return o.PropTypes=o,o};m.exports=Ne();var Le=["sitekey","onChange","theme","type","tabindex","onExpired","onErrored","size","stoken","grecaptcha","badge","hl","isolated"];function Pe(e,n){if(e==null)return{};var o={},r=Object.keys(e),t,i;for(i=0;i<r.length;i++)t=r[i],!(n.indexOf(t)>=0)&&(o[t]=e[t]);return o}function E(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function Te(e,n){e.prototype=Object.create(n.prototype),e.prototype.constructor=e,V(e,n)}function V(e,n){return V=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,t){return r.__proto__=t,r},V(e,n)}var $=function(e){Te(n,e);function n(){var r;return r=e.call(this)||this,r.handleExpired=r.handleExpired.bind(E(r)),r.handleErrored=r.handleErrored.bind(E(r)),r.handleChange=r.handleChange.bind(E(r)),r.handleRecaptchaRef=r.handleRecaptchaRef.bind(E(r)),r}var o=n.prototype;return o.getCaptchaFunction=function(t){return this.props.grecaptcha?this.props.grecaptcha.enterprise?this.props.grecaptcha.enterprise[t]:this.props.grecaptcha[t]:null},o.getValue=function(){var t=this.getCaptchaFunction("getResponse");return t&&this._widgetId!==void 0?t(this._widgetId):null},o.getWidgetId=function(){return this.props.grecaptcha&&this._widgetId!==void 0?this._widgetId:null},o.execute=function(){var t=this.getCaptchaFunction("execute");if(t&&this._widgetId!==void 0)return t(this._widgetId);this._executeRequested=!0},o.executeAsync=function(){var t=this;return new Promise(function(i,h){t.executionResolve=i,t.executionReject=h,t.execute()})},o.reset=function(){var t=this.getCaptchaFunction("reset");t&&this._widgetId!==void 0&&t(this._widgetId)},o.forceReset=function(){var t=this.getCaptchaFunction("reset");t&&t()},o.handleExpired=function(){this.props.onExpired?this.props.onExpired():this.handleChange(null)},o.handleErrored=function(){this.props.onErrored&&this.props.onErrored(),this.executionReject&&(this.executionReject(),delete this.executionResolve,delete this.executionReject)},o.handleChange=function(t){this.props.onChange&&this.props.onChange(t),this.executionResolve&&(this.executionResolve(t),delete this.executionReject,delete this.executionResolve)},o.explicitRender=function(){var t=this.getCaptchaFunction("render");if(t&&this._widgetId===void 0){var i=document.createElement("div");this._widgetId=t(i,{sitekey:this.props.sitekey,callback:this.handleChange,theme:this.props.theme,type:this.props.type,tabindex:this.props.tabindex,"expired-callback":this.handleExpired,"error-callback":this.handleErrored,size:this.props.size,stoken:this.props.stoken,hl:this.props.hl,badge:this.props.badge,isolated:this.props.isolated}),this.captcha.appendChild(i)}this._executeRequested&&this.props.grecaptcha&&this._widgetId!==void 0&&(this._executeRequested=!1,this.execute())},o.componentDidMount=function(){this.explicitRender()},o.componentDidUpdate=function(){this.explicitRender()},o.handleRecaptchaRef=function(t){this.captcha=t},o.render=function(){var t=this.props;t.sitekey,t.onChange,t.theme,t.type,t.tabindex,t.onExpired,t.onErrored,t.size,t.stoken,t.grecaptcha,t.badge,t.hl,t.isolated;var i=Pe(t,Le);return l("div",{...i,ref:this.handleRecaptchaRef})},n}(O.exports.Component);$.displayName="ReCAPTCHA";$.propTypes={sitekey:m.exports.string.isRequired,onChange:m.exports.func,grecaptcha:m.exports.object,theme:m.exports.oneOf(["dark","light"]),type:m.exports.oneOf(["image","audio"]),tabindex:m.exports.number,onExpired:m.exports.func,onErrored:m.exports.func,size:m.exports.oneOf(["compact","normal","invisible"]),stoken:m.exports.string,hl:m.exports.string,badge:m.exports.oneOf(["bottomright","bottomleft","inline"]),isolated:m.exports.bool};$.defaultProps={onChange:function(){},theme:"light",type:"image",tabindex:0,size:"normal",badge:"bottomright"};var fe={exports:{}},s={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var u=typeof Symbol=="function"&&Symbol.for,Y=u?Symbol.for("react.element"):60103,Q=u?Symbol.for("react.portal"):60106,j=u?Symbol.for("react.fragment"):60107,A=u?Symbol.for("react.strict_mode"):60108,F=u?Symbol.for("react.profiler"):60114,k=u?Symbol.for("react.provider"):60109,D=u?Symbol.for("react.context"):60110,X=u?Symbol.for("react.async_mode"):60111,U=u?Symbol.for("react.concurrent_mode"):60111,M=u?Symbol.for("react.forward_ref"):60112,W=u?Symbol.for("react.suspense"):60113,Ce=u?Symbol.for("react.suspense_list"):60120,q=u?Symbol.for("react.memo"):60115,z=u?Symbol.for("react.lazy"):60116,Ie=u?Symbol.for("react.block"):60121,Ee=u?Symbol.for("react.fundamental"):60117,$e=u?Symbol.for("react.responder"):60118,je=u?Symbol.for("react.scope"):60119;function g(e){if(typeof e=="object"&&e!==null){var n=e.$$typeof;switch(n){case Y:switch(e=e.type,e){case X:case U:case j:case F:case A:case W:return e;default:switch(e=e&&e.$$typeof,e){case D:case M:case z:case q:case k:return e;default:return n}}case Q:return n}}}function he(e){return g(e)===U}s.AsyncMode=X;s.ConcurrentMode=U;s.ContextConsumer=D;s.ContextProvider=k;s.Element=Y;s.ForwardRef=M;s.Fragment=j;s.Lazy=z;s.Memo=q;s.Portal=Q;s.Profiler=F;s.StrictMode=A;s.Suspense=W;s.isAsyncMode=function(e){return he(e)||g(e)===X};s.isConcurrentMode=he;s.isContextConsumer=function(e){return g(e)===D};s.isContextProvider=function(e){return g(e)===k};s.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===Y};s.isForwardRef=function(e){return g(e)===M};s.isFragment=function(e){return g(e)===j};s.isLazy=function(e){return g(e)===z};s.isMemo=function(e){return g(e)===q};s.isPortal=function(e){return g(e)===Q};s.isProfiler=function(e){return g(e)===F};s.isStrictMode=function(e){return g(e)===A};s.isSuspense=function(e){return g(e)===W};s.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===j||e===U||e===F||e===A||e===W||e===Ce||typeof e=="object"&&e!==null&&(e.$$typeof===z||e.$$typeof===q||e.$$typeof===k||e.$$typeof===D||e.$$typeof===M||e.$$typeof===Ee||e.$$typeof===$e||e.$$typeof===je||e.$$typeof===Ie)};s.typeOf=g;(function(e){e.exports=s})(fe);var Z=fe.exports,Ae={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},Fe={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},ke={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},me={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},ee={};ee[Z.ForwardRef]=ke;ee[Z.Memo]=me;function se(e){return Z.isMemo(e)?me:ee[e.$$typeof]||Ae}var De=Object.defineProperty,Ue=Object.getOwnPropertyNames,le=Object.getOwnPropertySymbols,Me=Object.getOwnPropertyDescriptor,We=Object.getPrototypeOf,pe=Object.prototype;function ye(e,n,o){if(typeof n!="string"){if(pe){var r=We(n);r&&r!==pe&&ye(e,r,o)}var t=Ue(n);le&&(t=t.concat(le(n)));for(var i=se(e),h=se(n),_=0;_<t.length;++_){var f=t[_];if(!Fe[f]&&!(o&&o[f])&&!(h&&h[f])&&!(i&&i[f])){var d=Me(n,f);try{De(e,f,d)}catch{}}}}return e}var qe=ye;function K(){return K=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var o=arguments[n];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},K.apply(this,arguments)}function ze(e,n){if(e==null)return{};var o={},r=Object.keys(e),t,i;for(i=0;i<r.length;i++)t=r[i],!(n.indexOf(t)>=0)&&(o[t]=e[t]);return o}function He(e,n){e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.__proto__=n}var S={},Ge=0;function Ve(e,n){return n=n||{},function(r){var t=r.displayName||r.name||"Component",i=function(_){He(f,_);function f(x,p){var a;return a=_.call(this,x,p)||this,a.state={},a.__scriptURL="",a}var d=f.prototype;return d.asyncScriptLoaderGetScriptLoaderID=function(){return this.__scriptLoaderID||(this.__scriptLoaderID="async-script-loader-"+Ge++),this.__scriptLoaderID},d.setupScriptURL=function(){return this.__scriptURL=typeof e=="function"?e():e,this.__scriptURL},d.asyncScriptLoaderHandleLoad=function(p){var a=this;this.setState(p,function(){return a.props.asyncScriptOnLoad&&a.props.asyncScriptOnLoad(a.state)})},d.asyncScriptLoaderTriggerOnScriptLoaded=function(){var p=S[this.__scriptURL];if(!p||!p.loaded)throw new Error("Script is not loaded.");for(var a in p.observers)p.observers[a](p);delete window[n.callbackName]},d.componentDidMount=function(){var p=this,a=this.setupScriptURL(),y=this.asyncScriptLoaderGetScriptLoaderID(),v=n,T=v.globalName,L=v.callbackName,C=v.scriptId;if(T&&typeof window[T]<"u"&&(S[a]={loaded:!0,observers:{}}),S[a]){var c=S[a];if(c&&(c.loaded||c.errored)){this.asyncScriptLoaderHandleLoad(c);return}c.observers[y]=function(b){return p.asyncScriptLoaderHandleLoad(b)};return}var te={};te[y]=function(b){return p.asyncScriptLoaderHandleLoad(b)},S[a]={loaded:!1,observers:te};var R=document.createElement("script");R.src=a,R.async=!0;for(var re in n.attributes)R.setAttribute(re,n.attributes[re]);C&&(R.id=C);var ne=function(P){if(S[a]){var ge=S[a],H=ge.observers;for(var oe in H)P(H[oe])&&delete H[oe]}};L&&typeof window<"u"&&(window[L]=function(){return p.asyncScriptLoaderTriggerOnScriptLoaded()}),R.onload=function(){var b=S[a];b&&(b.loaded=!0,ne(function(P){return L?!1:(P(b),!0)}))},R.onerror=function(){var b=S[a];b&&(b.errored=!0,ne(function(P){return P(b),!0}))},document.body.appendChild(R)},d.componentWillUnmount=function(){var p=this.__scriptURL;if(n.removeOnUnmount===!0)for(var a=document.getElementsByTagName("script"),y=0;y<a.length;y+=1)a[y].src.indexOf(p)>-1&&a[y].parentNode&&a[y].parentNode.removeChild(a[y]);var v=S[p];v&&(delete v.observers[this.asyncScriptLoaderGetScriptLoaderID()],n.removeOnUnmount===!0&&delete S[p])},d.render=function(){var p=n.globalName,a=this.props;a.asyncScriptOnLoad;var y=a.forwardedRef,v=ze(a,["asyncScriptOnLoad","forwardedRef"]);return p&&typeof window<"u"&&(v[p]=typeof window[p]<"u"?window[p]:void 0),v.ref=y,O.exports.createElement(r,v)},f}(O.exports.Component),h=O.exports.forwardRef(function(_,f){return O.exports.createElement(i,K({},_,{forwardedRef:f}))});return h.displayName="AsyncScriptLoader("+t+")",h.propTypes={asyncScriptOnLoad:m.exports.func},qe(h,r)}}var B="onloadcallback",Ke="grecaptcha";function J(){return typeof window<"u"&&window.recaptchaOptions||{}}function Be(){var e=J(),n=e.useRecaptchaNet?"recaptcha.net":"www.google.com";return e.enterprise?"https://"+n+"/recaptcha/enterprise.js?onload="+B+"&render=explicit":"https://"+n+"/recaptcha/api.js?onload="+B+"&render=explicit"}const Je=Ve(Be,{callbackName:B,globalName:Ke,attributes:J().nonce?{nonce:J().nonce}:{}})($),pt=e=>{const[n,o]=O.exports.useState(),[r,t]=O.exports.useState(!1),{data:i,setData:h,post:_,processing:f,errors:d}=ve({caller_category:"",caller_sub_category:"",caller_contact_name:"",caller_contact_person:"",case_reason:""}),x=e.complain_callers.map(c=>({id:c.id,value:c.id,display:c.caller})),p=e.sales_offices.map(c=>({id:c.nomor_debitur,value:c.nomor_debitur,display:`${c.area==1?"Kediri":c.area==2?"TLG":"TRG"} - ${c.nama_agen}`})),a=c=>{h(c.target.name,c.target.value)},y=c=>{c.target.value==4?h({...i,caller_category:c.target.value,caller_sub_category:"internal jne"}):h({...i,caller_category:c.target.value}),o(c.target.value)},v=c=>{c?h("resi",c):h("resi",null)},T=()=>{if(n==4)return w(ae,{children:[l("div",{children:"\xA0"}),l(G,{readOnly:!0,className:"w-full block read-only:border-0 read-only:focus:border-0 read-only:focus:ring-0 read-only:border-b-2 read-only:shadow-none read-only:rounded-none read-only:focus:border-b-2 read-only:focus:shadow-none read-only:focus:rounded-none",value:"Internal Jne"}),l(N,{message:d.caller_sub_category,className:"mt-2"}),";"]});if(n==5)return w(ae,{children:[l(I,{value:"Pilih Sending Office",className:"mb-1"}),l(ie,{onChange:a,name:"caller_sub_category",value:i.caller_sub_category,nullvalue:"true",required:!0,className:"block w-full",options:p}),l(N,{message:d.caller_sub_category,className:"mt-2"}),";"]})};function L(c){t(!0)}const C=c=>{c.preventDefault(),_(route("cs.internalStore"),{onError:()=>t(!1)})};return w(be,{header:"Internal Page",children:[l("div",{className:"bg-indigo-500 w-full",children:w("div",{className:"mx-auto max-w-5xl p-6",children:[l("div",{className:"mb-4 text-4xl text-center text-white font-bold",children:"Halo, ada yang bisa kami bantu ?"}),l(_e,{required:!0,name:"case_reason",onChange:a,placeholder:"input keluhan anda disini"}),l(N,{message:d.case_reason,className:"mt-2"})]})}),w("div",{className:"max-w-5xl mx-auto p-6",children:[w("div",{className:"flex gap-3 mb-3",children:[w("div",{className:"mb-1 flex-1",children:[l(I,{value:"Caller",className:"mb-1"}),l(ie,{required:!0,className:"block w-full",onChange:y,nullvalue:"true",name:"caller_category",options:x,value:i.caller_category}),l(N,{message:d.caller_category,className:"mt-2"})]}),l("div",{className:"mb-1",children:T()}),w("div",{className:"mb-1 flex-1",children:[l(I,{value:"Nama / Divisi",className:"mb-1"}),l(G,{required:!0,className:"block w-full",onChange:a,nullvalue:"true",name:"caller_contact_name",value:i.caller_contact_name}),l(N,{message:d.caller_contact_name,className:"mt-2"})]}),w("div",{className:"mb-1 flex-1",children:[l(I,{value:"Nomor Pelapor",className:"mb-1"}),l(G,{required:!0,className:"block w-full",onChange:a,nullvalue:"true",name:"caller_contact_person",value:i.caller_contact_person}),l(N,{message:d.caller_contact_person,className:"mt-2"})]})]}),l(xe,{resi:v}),w("form",{onSubmit:C,className:"w-full flex mt-3 justify-end items-center",children:[l(ce,{show:!r,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",className:"relative",children:l(Je,{sitekey:e.reCapta,onChange:L})}),l(ce,{show:r,enter:"delay-300 ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",className:"relative",children:l(Se,{disabled:f,type:"submit",className:"ml-auto",title:"Submit"})})]})]})]})};export{pt as default};