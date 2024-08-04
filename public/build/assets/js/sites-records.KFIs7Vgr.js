import{r as o,W as L,j as e,Y as k}from"../app-CnymaPo4.js";import{A as C}from"./authenticated-layout.D3IfGiPn.js";import{P as x}from"./primary-button.DpcP-eUY.js";import{M as I}from"./modal.DW2KxMit.js";import{I as h}from"./input-label.Ca7_9zaU.js";import{T as p}from"./text-input.BpMMnSsW.js";import{I as u}from"./input-error.CL5nUIvf.js";import{S as A}from"./secondary-button.Czq63Vhy.js";import{d as j}from"./date-format.CYrrPLC6.js";import"./application-logo.C1zzbIHm.js";import"./transition.BTQSO2hk.js";const U=({auth:g,sites:c})=>{console.log("[sites]",c);const r=o.useRef(null),[d,N]=o.useState(null),{data:a,setData:i,post:f,put:y,processing:n,reset:l,errors:m}=L({name:"",path:""}),w=s=>{if(s.preventDefault(),d){y(route("sites.update",d),{preserveScroll:!0,onSuccess:()=>t(),onError:()=>r.current?.focus(),onFinish:()=>l()});return}f(route("sites.store"),{preserveScroll:!0,onSuccess:()=>t(),onError:()=>r.current?.focus(),onFinish:()=>l()})},[v,b]=o.useState(!1),t=()=>{b(s=>!s),l()},S=s=>{N(s.id),a.name=s.name,a.path=s.path,t()};return e.jsxs(C,{user:g.user,header:e.jsxs("div",{className:"flex justify-between",children:[e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Sites"}),e.jsx(x,{className:"ms-4",onClick:t,disabled:n,children:"Add Site"})]}),children:[e.jsx(k,{title:"Sites"}),e.jsx("div",{className:"py-6",children:e.jsx("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8",children:e.jsx("div",{className:"bg-white overflow-hidden shadow-sm sm:rounded-lg",children:e.jsx("div",{className:"relative overflow-x-auto shadow-md sm:rounded-lg",children:e.jsxs("table",{className:"w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400",children:[e.jsx("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Name"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Path"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:e.jsxs("div",{className:"flex items-center",children:["Created At",e.jsx("svg",{className:"w-3 h-3 ms-1.5","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"})})]})}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:e.jsxs("div",{className:"flex items-center",children:["Updated At",e.jsx("svg",{className:"w-3 h-3 ms-1.5","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"})})]})}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:e.jsx("span",{className:"sr-only",children:"Actions"})})]})}),e.jsx("tbody",{children:c.map(s=>e.jsxs("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700",children:[e.jsx("th",{scope:"row",className:"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white",children:s.name}),e.jsx("td",{className:"px-6 py-4",children:s.path}),e.jsx("td",{className:"px-6 py-4",children:j(s.created_at).format("LLL")}),e.jsx("td",{className:"px-6 py-4",children:j(s.updated_at).format("LLL")}),e.jsx("td",{className:"px-6 py-4 text-right",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("button",{type:"button",onClick:S.bind(null,s),className:"btn btn-outline-success",children:"Edit"}),e.jsx("a",{href:route("sites.show",s.id),target:"_blank",className:"btn btn-outline-success",children:"Login"})]})})]},s.id))})]})})})})}),e.jsx(I,{show:v,onClose:t,children:e.jsxs("form",{onSubmit:w,className:"p-6",children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Add Site"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"Add a new site record to your account. This will allow you to manage DNS records for the site. DNS records are used to map domain names to IP addresses."}),e.jsxs("div",{className:"mt-6",children:[e.jsx(h,{htmlFor:"site-name",value:"Site Name"}),e.jsx(p,{id:"site-name",type:"text",name:"site-name",ref:r,value:a.name,onChange:s=>i("name",s.target.value),className:"mt-1 block w-full",isFocused:!0,placeholder:"Site Name"}),e.jsx(u,{message:m.name,className:"mt-2"})]}),e.jsxs("div",{className:"mt-6",children:[e.jsx(h,{htmlFor:"site-path",value:"Site URL"}),e.jsx(p,{id:"site-path",type:"text",name:"site-path",value:a.path,onChange:s=>i("path",s.target.value),className:"mt-1 block w-full",isFocused:!0,placeholder:"Site Name"}),e.jsx(u,{message:m.path,className:"mt-2"})]}),e.jsxs("div",{className:"mt-6 flex justify-end",children:[e.jsx(A,{onClick:t,children:"Cancel"}),e.jsx(x,{className:"ms-3",disabled:n,children:"Save Site"})]})]})})]})};export{U as default};
