import{r as h,j as e,u as F}from"./index-442b5a61.js";import{L as I}from"./index-13305ef7.js";import{p as C,u as v}from"./useTranslation-700709b5.js";import{u as y,b,x as p,y as _,z as f,A as w,B as S,C as A,E as P,k as D}from"./configureStore-2227f039.js";import{Q as M}from"./react-toastify.esm-e12a846b.js";import{c as E}from"./order.service-9d931e28.js";import{n as Q}from"./not-product-de822ee6.js";import{R,C as k}from"./user.service-911d9fa7.js";import"./index-94e514cc.js";import"./ConfirmDialog-42d31d00.js";import"./index-7b2945eb.js";import"./auth.service-ac0dcb3b.js";import"./index.esm-3ed237e0.js";const T="_container_10h7l_1",B="_checkmark_10h7l_19",O="_pop_10h7l_1",q={container:T,checkmark:B,pop:O},g=h.forwardRef(function({...a},r){return e.jsxs("label",{className:q.container,children:[e.jsx("input",{type:"checkbox",ref:r,...a}),e.jsx("div",{className:q.checkmark})]})}),L="_table_1j4qm_1",z={table:L},G="_tag_s7ggo_37",j={"product-image":"_product-image_s7ggo_1","product-name":"_product-name_s7ggo_19","product-author":"_product-author_s7ggo_28",tag:G,"quantity-field":"_quantity-field_s7ggo_49"},H=({item:s})=>{const a=y(),{selected:r}=b(t=>t.cart),c=t=>{if(!t)return;const n=parseInt(t),l=n<1?1:n>s.book.quantity?s.book.quantity:n;a(p({cartItemId:s.id,quantity:l}))},o=()=>{a(p({cartItemId:s.id,quantity:s.quantity+1}))},d=()=>{s.quantity!==1&&a(p({cartItemId:s.id,quantity:s.quantity-1}))},i=()=>a(_({cartItemId:s.id})),x=t=>{const{checked:n}=t.target;a(n?f([...r,s]):w(s))};return e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(g,{checked:!!r.find(t=>t.id===s.id),onChange:x})}),e.jsx("td",{children:e.jsx("div",{className:j["product-image"],children:e.jsx("img",{src:s.book.image,alt:s.book.name,crossOrigin:"anonymous"})})}),e.jsxs("td",{children:[e.jsx(I,{to:`/product-detail/${s.book.id}`,children:e.jsx("p",{className:j["product-name"],children:s.book.name})}),e.jsx("p",{className:j["product-author"],children:s.book.author.name}),e.jsx("div",{className:j.tag,children:"Book"}),e.jsxs("p",{className:"text-xs mt-1",children:["Quantity : ",s.book.quantity]})]}),e.jsx("td",{className:"text-center",children:e.jsxs("p",{className:"text-sm font-bold text-[#999899]",children:[e.jsx("i",{className:"fa-solid fa-baht-sign mr-1"}),s.book.price]})}),e.jsx("td",{className:"text-center",children:e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx("i",{className:C("fa-solid fa-square-minus text-xl text-gray-400 cursor-pointer",{"pointer-events-none text-gray-200":s.quantity===1}),onClick:d}),e.jsx("input",{type:"number",className:j["quantity-field"],value:s.quantity,onChange:t=>c(t.target.value)}),e.jsx("i",{className:"fa-solid fa-square-plus text-xl text-gray-400 cursor-pointer",onClick:o})]})}),e.jsx("td",{className:"text-right",children:e.jsxs("p",{className:"font-bold text-[#554994]",children:[e.jsx("i",{className:"fa-solid fa-baht-sign mr-1"}),(s.quantity*+s.book.price).toFixed(2)]})}),e.jsx("td",{className:"text-center",children:e.jsx("i",{className:"fa-solid fa-trash text-gray-400 cursor-pointer",onClick:i})})]})},J=h.memo(H),K=({cart:s})=>{const{cartItems:a}=s;return e.jsx("table",{className:z.table,children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{}),e.jsx("td",{}),e.jsx("td",{children:"ชื่อสินค้า"}),e.jsx("td",{className:"text-center",children:"ราคา/หน่วย"}),e.jsx("td",{className:"text-center",children:"จำนวน"}),e.jsx("td",{className:"text-right",children:"ราคารวม"}),e.jsx("td",{})]}),a.length>0&&a.map(r=>e.jsx(J,{item:r},r.id))]})})},U=h.memo(K),V=()=>{const{t:s}=v(),a=F(),r=y(),{cart:c,selected:o}=b(S),d=h.useCallback(()=>o.reduce((l,m)=>l+m.quantity*+m.book.price,0),[o]),i=0,x=o.length<1?Number(0).toFixed(2):(d()+i).toFixed(2),t=async()=>{try{if(o.length<1||!c)return;let l=[],m=0,N=0;for(const u of o)m+=u.quantity,N+=u.quantity*+u.book.price,l.push({quantity:u.quantity,book:{id:u.book.id},cartItemId:u.id});const $={cartId:c.id,totalQty:m,totalPrice:N,items:l,shippingFee:i,orderDate:new Date};await E($),r(A()),a("/user/order"),M.success("Thank you for your purchase.")}catch(l){console.log(l)}},n=()=>{r(P())};return h.useEffect(()=>()=>n(),[]),e.jsxs("div",{className:"rounded-md shadow-md p-4 xl:ml-8",children:[e.jsx("p",{className:"text-base font-medium pb-2 border-b-2",children:s("cart.orderSummary")}),e.jsxs("div",{className:"flex justify-between items-center mt-4",children:[e.jsx("p",{children:s("cart.productPrice")}),e.jsxs("p",{className:"font-bold text-[#554994]",children:[e.jsx("i",{className:"fa-solid fa-baht-sign mr-1"}),d().toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between items-center mt-2",children:[e.jsx("p",{children:s("cart.shippingFee")}),e.jsxs("p",{className:"font-bold text-[#554994]",children:[e.jsx("i",{className:"fa-solid fa-baht-sign mr-1"}),i.toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between items-center mt-6",children:[e.jsx("p",{className:"text-lg font-bold",children:s("cart.total")}),e.jsxs("p",{className:"text-2xl font-bold text-red-600",children:[e.jsx("i",{className:"fa-solid fa-baht-sign mr-1"}),x]})]}),e.jsx("button",{type:"button",className:"w-full h-[40px] text-base font-medium rounded-md bg-[#554994] text-white mt-4",onClick:t,children:s("cart.payment")})]})},W=h.memo(V),X=({cart:s})=>{const a=y(),{selected:r}=b(t=>t.cart),c=(t,n)=>{a(t?f([...r,n]):w(n))},o=(t,n)=>{if(!t)return;const l=parseInt(t),m=l<1?1:l>n.book.quantity?n.book.quantity:l;a(p({cartItemId:n.id,quantity:m}))},d=t=>{a(p({cartItemId:t.id,quantity:t.quantity+1}))},i=t=>{t.quantity!==1&&a(p({cartItemId:t.id,quantity:t.quantity-1}))},x=t=>a(_({cartItemId:t.id}));return e.jsx("div",{className:"flex flex-col gap-4",children:s.cartItems.map(t=>e.jsxs("div",{className:"pb-4 border-b-2 border-gray-300",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx(g,{checked:!!r.find(n=>n.id===t.id),onChange:n=>c(n.target.checked,t)}),e.jsx("img",{className:"max-w-[65px] mx-4",src:t.book.image,alt:t.book.name,crossOrigin:"anonymous"}),e.jsxs("div",{className:"self-start",children:[e.jsx("h4",{className:"text-base font-medium mb-2",children:t.book.name}),e.jsx("p",{className:"flex items-center justify-center rounded-[4px] w-[64px] h-[16px] text-white text-xs bg-[#554994]",children:"Book"})]})]}),e.jsxs("div",{className:"flex items-center justify-between my-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-xs",children:"ราคาต่อหน่วย"}),e.jsxs("h5",{className:"text-base font-bold",children:["฿ ",t.book.price]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("i",{className:C("fa-solid fa-square-minus text-3xl text-gray-400 cursor-pointer",{"pointer-events-none text-gray-200":t.quantity===1}),onClick:()=>i(t)}),e.jsx("input",{type:"number",className:"w-[60px] h-[32px] outline-none border-2 border-gray-200 text-center",value:t.quantity,onChange:n=>{o(n.target.value,t)}}),e.jsx("i",{className:"fa-solid fa-square-plus text-3xl text-gray-400 cursor-pointer",onClick:()=>d(t)})]})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("p",{children:"ราคารวม"}),e.jsxs("h4",{className:"text-[#554994] font-bold",children:["฿ ",(t.quantity*+t.book.price).toFixed(2)]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsx("i",{className:"fa-solid fa-trash text-lg text-gray-400 cursor-pointer",onClick:()=>x(t)})})]},t.id))})},Y=h.memo(X),Z="_container_m2jte_1",ee={container:Z},ue=()=>{const{t:s}=v(),a=y(),r=D("(max-width: 768px)"),{cart:c,selected:o}=b(S),d=i=>{const{checked:x}=i.target;!c||c.cartItems.length<1||a(x?f(c.cartItems):f([]))};return e.jsx("div",{className:ee.container,children:c&&c.cartItems.length>0?e.jsxs(R,{className:"mt-3",children:[e.jsxs(k,{span:24,xl:16,children:[e.jsxs("div",{className:"flex items-center gap-3 rounded-md shadow-md p-4",children:[e.jsx(g,{onChange:d,checked:(c==null?void 0:c.cartItems.length)===o.length&&o.length>0}),e.jsx("p",{className:"text-base",children:`${s("cart.selectAll")} ( ${(c==null?void 0:c.cartItems.length)||0} ${s("cart.piece")} )`})]}),c&&e.jsx("div",{className:"mt-4 py-4 pl-4 shadow-md",children:r?e.jsx(Y,{cart:c}):e.jsx(U,{cart:c})})]}),e.jsx(k,{span:24,xl:8,children:e.jsx(W,{})})]}):e.jsxs("div",{className:"max-w-[800px] flex flex-col items-center justify-center mx-auto p-12",children:[e.jsx("img",{className:"md:min-h-[212px]",src:Q,alt:"not found"}),e.jsx("h3",{className:"text-2xl font-semibold text-center text-[#554994] my-5",children:s("cart.notFoundMessage")}),e.jsx(I,{to:"/products-filter",children:e.jsx("button",{className:"btn-primary mt-3",children:s("cart.shoppingNow")})})]})})};export{ue as default};