import{r as d,j as p}from"./index-eb84028e.js";import{p as m}from"./useTranslation-ad94cc8a.js";var c={},l={get exports(){return c},set exports(t){c=t}},f={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=d;function v(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var x=typeof Object.is=="function"?Object.is:v,S=r.useState,y=r.useEffect,E=r.useLayoutEffect,h=r.useDebugValue;function _(t,n){var e=n(),s=S({inst:{value:e,getSnapshot:n}}),o=s[0].inst,u=s[1];return E(function(){o.value=e,o.getSnapshot=n,i(o)&&u({inst:o})},[t,e,n]),y(function(){return i(o)&&u({inst:o}),t(function(){i(o)&&u({inst:o})})},[t]),h(e),e}function i(t){var n=t.getSnapshot;t=t.value;try{var e=n();return!x(t,e)}catch{return!0}}function g(t,n){return n()}var w=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?g:_;f.useSyncExternalStore=r.useSyncExternalStore!==void 0?r.useSyncExternalStore:w;(function(t){t.exports=f})(l);const a={"btn-contained":"_btn-contained_a5dvn_1","btn-outlined":"_btn-outlined_a5dvn_2"},b=({variant:t="contained",className:n,children:e,...s})=>p.jsx("button",{className:m(t==="contained"?a["btn-contained"]:a["btn-outlined"],n),...s,children:e}),O=d.memo(b);export{O as B,c as s};
