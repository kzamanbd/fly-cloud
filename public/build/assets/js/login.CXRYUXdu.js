import{j as e,W as p,Y as f,a as g}from"../app-CnymaPo4.js";import{G as h}from"./guest-layout.CIgO6qke.js";import{I as i}from"./input-error.CL5nUIvf.js";import{I as n}from"./input-label.Ca7_9zaU.js";import{P as j}from"./primary-button.DpcP-eUY.js";import{T as l}from"./text-input.BpMMnSsW.js";import"./application-logo.C1zzbIHm.js";function b({className:r="",...a}){return e.jsx("input",{...a,type:"checkbox",className:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 "+r})}function I({status:r,canResetPassword:a}){const{data:t,setData:o,post:d,processing:c,errors:m,reset:u}=p({email:"test@example.com",password:"password",remember:!1}),x=s=>{s.preventDefault(),d(route("login"),{onFinish:()=>u("password")})};return e.jsxs(h,{children:[e.jsx(f,{title:"Log in"}),r&&e.jsx("div",{className:"mb-4 font-medium text-sm text-green-600",children:r}),e.jsxs("form",{onSubmit:x,children:[e.jsxs("div",{children:[e.jsx(n,{htmlFor:"email",value:"Email"}),e.jsx(l,{id:"email",type:"email",name:"email",value:t.email,className:"mt-1 block w-full",autoComplete:"username",isFocused:!0,onChange:s=>o("email",s.target.value)}),e.jsx(i,{message:m.email,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(n,{htmlFor:"password",value:"Password"}),e.jsx(l,{id:"password",type:"password",name:"password",value:t.password,className:"mt-1 block w-full",autoComplete:"current-password",onChange:s=>o("password",s.target.value)}),e.jsx(i,{message:m.password,className:"mt-2"})]}),e.jsx("div",{className:"block mt-4",children:e.jsxs("label",{className:"flex items-center",children:[e.jsx(b,{name:"remember",checked:t.remember,onChange:s=>o("remember",s.target.checked)}),e.jsx("span",{className:"ms-2 text-sm text-gray-600",children:"Remember me"})]})}),e.jsxs("div",{className:"flex items-center justify-end mt-4",children:[a&&e.jsx(g,{href:route("password.request"),className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Forgot your password?"}),e.jsx(j,{className:"ms-4",disabled:c,children:"Log in"})]})]})]})}export{I as default};
