import{W as c,j as e,Y as p,a as f}from"../app-DXOkmNno.js";import{G as x}from"./guest-layout.Bw-5TTaY.js";import{I as t}from"./input-error.CYnWSv-i.js";import{I as m}from"./input-label.CaOe4Y60.js";import{P as w}from"./primary-button.VAPBrPiY.js";import{T as i}from"./text-input.KJ_JSe2M.js";import"./application-logo.BapySa2y.js";function y(){const{data:a,setData:r,post:n,processing:l,errors:o,reset:d}=c({name:"",email:"",password:"",password_confirmation:""}),u=s=>{s.preventDefault(),n(route("register"),{onFinish:()=>d("password","password_confirmation")})};return e.jsxs(x,{children:[e.jsx(p,{title:"Register"}),e.jsxs("form",{onSubmit:u,children:[e.jsxs("div",{children:[e.jsx(m,{htmlFor:"name",value:"Name"}),e.jsx(i,{id:"name",name:"name",value:a.name,className:"mt-1 block w-full",autoComplete:"name",isFocused:!0,onChange:s=>r("name",s.target.value),required:!0}),e.jsx(t,{message:o.name,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(m,{htmlFor:"email",value:"Email"}),e.jsx(i,{id:"email",type:"email",name:"email",value:a.email,className:"mt-1 block w-full",autoComplete:"username",onChange:s=>r("email",s.target.value),required:!0}),e.jsx(t,{message:o.email,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(m,{htmlFor:"password",value:"Password"}),e.jsx(i,{id:"password",type:"password",name:"password",value:a.password,className:"mt-1 block w-full",autoComplete:"new-password",onChange:s=>r("password",s.target.value),required:!0}),e.jsx(t,{message:o.password,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(m,{htmlFor:"password_confirmation",value:"Confirm Password"}),e.jsx(i,{id:"password_confirmation",type:"password",name:"password_confirmation",value:a.password_confirmation,className:"mt-1 block w-full",autoComplete:"new-password",onChange:s=>r("password_confirmation",s.target.value),required:!0}),e.jsx(t,{message:o.password_confirmation,className:"mt-2"})]}),e.jsxs("div",{className:"flex items-center justify-end mt-4",children:[e.jsx(f,{href:route("login"),className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Already registered?"}),e.jsx(w,{className:"ms-4",disabled:l,children:"Register"})]})]})]})}export{y as default};
