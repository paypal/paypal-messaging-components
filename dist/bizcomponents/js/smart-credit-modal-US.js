/* version: 1.25.0 */
window.crc=function(t){function e(e){for(var o,a,c=e[0],l=e[1],s=e[2],d=0,b=[];d<c.length;d++)({}).hasOwnProperty.call(i,a=c[d])&&i[a]&&b.push(i[a][0]),i[a]=0;for(o in l)({}).hasOwnProperty.call(l,o)&&(t[o]=l[o]);for(p&&p(e);b.length;)b.shift()();return r.push.apply(r,s||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],o=!0,c=1;c<n.length;c++)0!==i[n[c]]&&(o=!1);o&&(r.splice(e--,1),t=a(a.s=n[0]))}return t}var o={},i={7:0},r=[];function a(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=o,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(n,o,function(e){return t[e]}.bind(null,o));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return{}.hasOwnProperty.call(t,e)},a.p="";var c=("undefined"!=typeof self?self:this).webpackJsonpcrc=("undefined"!=typeof self?self:this).webpackJsonpcrc||[],l=c.push.bind(c);c.push=e,c=c.slice();for(var s=0;s<c.length;s++)e(c[s]);var p=l;return r.push([160,0]),n()}({148:function(t,e,n){(e=n(23)(!1)).push([t.i,".content-wrapper{overflow-y:scroll;-webkit-overflow-scrolling:touch;margin:auto;border-radius:10px;height:100%;width:100vw}.content{padding-top:0;position:relative;z-index:50;background:white}.content-background{min-height:100%;position:relative;width:100%;margin:auto;border-radius:10px;max-width:640px}main{margin:0 auto;height:100%;padding-top:1.5rem;box-sizing:border-box;display:flex;flex-direction:column}.modal-container.loading .content-wrapper{overflow:hidden}.modal-container.loading main>*{filter:blur(3px);opacity:0.6}.top-overlay{position:fixed;height:84px;left:0;right:0}@media (min-width: 640px) and (min-height: 540px){.content-background{min-height:auto;margin:auto;width:100%;height:100%;box-shadow:0px 10px 14px 1px rgba(0,0,0,0.6);display:flex;flex-direction:column}.content{flex:1 1 100%}.content-wrapper{display:flex;justify-content:center;align-items:center}.wrapper{opacity:0;transform:translateY(5%);transition:transform 350ms ease, opacity 250ms ease}.show .wrapper{opacity:1;transform:translateY(0%);transition:transform 350ms ease, opacity 250ms ease}}@media all and (-ms-high-contrast: none), (-ms-high-contrast: active){.content-wrapper{justify-content:flex-start}}@media (max-width: 639px), (max-height: 539px){.content-wrapper{margin-top:84px;height:calc(100% - 84px);scrollbar-width:none}.content-wrapper::-webkit-scrollbar{display:none}.content{min-height:calc(100vh - 84px)}.content-background{box-shadow:1px 21px 34px 2px rgba(0,0,0,0.56);background:white}.overlay-side.left,.overlay-side.right{width:calc((100% - 612px) / 2) !important}.overlay-side.bottom{display:none}}.header-wrapper{background:white;pointer-events:none;overflow:hidden;border-top-right-radius:10px;border-top-left-radius:10px;position:fixed;width:100%;max-width:640px;z-index:51;transform:translate3d(0, 0, 0)}.header-container{background-color:#0070ba;position:relative;overflow:hidden}.header-container h1{font-size:1.5rem;font-weight:bold;color:white}.header-container .header{max-width:500px;margin:auto;z-index:999;display:block;height:auto;padding-top:40px}.header-container .logo{display:inline-block}.header-container .logo img{height:45px;margin-right:9px}.header-container .close{top:5px;right:5px;pointer-events:all}.header-container .close svg{height:40px;width:40px}.header-container .close svg path{stroke:white !important}@media (max-width: 639px), (max-height: 539px){.header-container{text-align:center}.header-container h1{margin:0 auto}.header-container .close svg{height:35px;width:35px}}.hero-image{background-color:#0070ba;position:fixed;transform:translate3d(0, 0, 0);width:100%;padding:60px 0;top:12rem;max-width:640px}@media (min-width: 640px) and (min-height: 540px){.hero-image{background-color:transparent;height:12rem;top:0;overflow:hidden;padding:0;z-index:51;pointer-events:none}.hero-image .icon{position:absolute;right:3rem;bottom:-1rem}}.tabs{margin:auto;width:100%;padding:1rem 0.2rem 0.5rem;white-space:nowrap;font-size:0;display:flex;box-sizing:border-box;background:white;justify-content:center;position:absolute;z-index:51}.tabs:after{content:'';position:absolute;top:100%;left:0;width:100%;height:1rem;background:linear-gradient(#fff, rgba(255,255,255,0))}.tab{cursor:pointer;display:block;font-size:16px;font-weight:600;margin-bottom:0;font-family:PayPalSansSmall, Helvetica, Arial, Sans-Serif;width:50%;text-align:center;margin-top:0;white-space:normal;background:transparent;border:none;outline:none;position:relative;transition:color 0.3s;height:2rem;max-width:140px}.tab .title{position:relative;z-index:1}.tab::before{content:'';display:block;position:absolute;left:0;bottom:0;width:100%;height:100%;background:#3e9dea;transform:translateX(100%);transition:transform 0.3s;border-radius:1.7rem}.tab:nth-child(2):before{transform:translateX(-100%)}.tab:hover{color:#0070ba}.tab.selected{color:white}.tab.selected::before{transform:translateX(0)}.tab-transition{position:relative;flex:1 1 auto}.tab-transition-item{position:absolute;top:0;left:0;width:100%;height:0;z-index:1;opacity:0;pointer-events:none;transition:opacity 0.3s;transition-delay:0.3s;overflow:hidden;padding-top:3rem}.tab-transition-item.selected{z-index:2;background:white;opacity:1;pointer-events:all;transition-delay:0s;height:auto;position:relative}.content{position:relative;background:transparent;box-sizing:border-box;padding-top:20rem}.content .corner{position:absolute;top:-2rem;left:0;width:100px;height:2rem;overflow:hidden;background-color:white;z-index:51;top:18rem;max-width:640px}.content .corner:after{content:'';position:absolute;background-color:#0070ba;border-bottom-left-radius:100px 30px;bottom:0;left:0;width:100%;height:100%}.content .content-body{padding:0 1rem 1rem;margin:auto;max-width:500px}.content h2{text-align:left;font-weight:bold;font-size:19px}.content .divider{border:none;border-bottom:1px dashed #aaa}.content p,.content li{color:#687173}.content .call-to-action{display:flex;width:100%;align-items:center;justify-content:space-between;margin-top:3rem}.content .call-to-action svg{margin:0}.content .call-to-action p{margin-top:0;margin-bottom:0.2rem}.content .call-to-action button{margin-left:1rem;flex:0 1 35%}.content .call-to-action .dark-text{color:#2c2e2f}.content .d-inline-block{display:inline-block}.content main{background:white;padding-top:0}.content .apply-now{background:#ffc43a;color:#2c2e2f;border:none}.content .sticky-apply-now{position:fixed;transform:translate3d(0, 0, 0);width:100%;max-width:640px;top:calc(10rem + 84px);z-index:52;text-align:center;padding-top:1rem;background:white;pointer-events:none;opacity:0;transition:all 0.3s}.content .sticky-apply-now:after{content:'';position:absolute;top:100%;left:0;width:100%;height:1rem;background:linear-gradient(#fff, rgba(255,255,255,0))}.content .sticky-apply-now button{margin-bottom:0.5rem;transition:all 0.3s;transform-origin:right center;transform:scaleX(0.5) translateX(25px)}.content .sticky-apply-now div{color:#687173;font-size:13px;transition:all 0.3s;transform:translateX(-25px)}.content .sticky-apply-now hr{max-width:400px}.content .sticky-apply-now.show{opacity:1}.content .sticky-apply-now.show button{transform:scaleX(1) translateX(0);pointer-events:all}.content .sticky-apply-now.show div{transform:translateX(0)}.content .terms li{margin-bottom:0.5rem}.content .tab-switch-button{border:none;outline:none;background:none;text-decoration:none;padding:0;color:#0070ba;font-weight:600;position:relative;margin-bottom:1rem;cursor:pointer}.content .tab-switch-button:after{content:'';position:absolute;left:calc(100% + 0.25rem);border-top:2px solid #0070ba;border-right:2px solid #0070ba;transform:rotate(45deg);width:0.5rem;height:0.5rem;top:0.1rem}@media (min-width: 640px) and (min-height: 540px){.content{padding-top:12rem}.content .corner{top:10rem;position:fixed;transform:translate3d(0, 0, 0);left:auto;width:100%}.content .tabs{position:fixed;transform:translate3d(0, 0, 0);top:12rem;max-width:640px}.content .sticky-apply-now{top:12rem}}@media (max-width: 639px), (max-height: 539px){.content.sticky .corner{width:100%;position:fixed;transform:translate3d(0, 0, 0);top:calc(8rem + 84px);left:auto}.content.sticky .tabs{position:fixed;transform:translate3d(0, 0, 0);top:calc(10rem + 84px);max-width:640px}.content .content-body{max-width:400px}.content .hidden-xs{display:none}}\n",""]),t.exports=e},160:function(t,e,n){"use strict";n.r(e),n.d(e,"setupModal",(function(){return C}));var o=n(0),i=n(10),r=n(86),a=n.n(r),c=n(4),l=n(14),s=n.n(l),p=n(36),d=n(169),b=n(40),u=n(170),h=n(165),g=n(13),m=function(t){var e=t.showApplyNow,n=t.switchTab,i=Object(c.i)(),r=Object(p.b)().onClick,a=Object(c.i)(),l=Object(d.a)("Apply Now"),s=Object(b.b)().products,m=Object(u.a)("NI"),f=m.headline,x=m.subHeadline,w=m.applyNow,y=m.terms,j=m.disclaimer,O=m.copyright;return i.current=e,Object(h.b)((function(t){var e=t.target.scrollTop;if(a.current){var n=a.current,o=n.offsetTop,r=n.clientHeight,c=document.body.getBoundingClientRect();e&&o&&i.current(!(e-o<r+(c.width>639&&c.height>539?-100:60)))}}),[i,a.current]),Object(o.g)("section",{className:"content-body"},Object(o.g)("div",{className:"description"},Object(o.g)("h2",null,s.length>1&&!n?f.multiProduct:f.singleProduct),Object(o.g)("h3",null,x),Object(o.g)("p",{className:"call-to-action"},Object(o.g)("div",null,Object(o.g)("p",null,Object(o.g)("b",null,w.headline)),Object(o.g)("span",null,w.subHeadline)),Object(o.g)(g.a,{onClick:l,className:"apply-now",ref:a},"Apply ",Object(o.g)("span",{className:"hidden-xs"},"Now")))),Object(o.g)("hr",{className:"divider"}),Object(o.g)("div",{className:"terms"},Object(o.g)("h3",null,y.title),Object(o.g)("ul",null,y.items.map((function(t){return Object(o.g)("li",null,t)})))),Object(o.g)("p",null,Object(o.g)("a",{onClick:function(){return r({linkName:"Legal Terms"})},target:"_blank",rel:"noopener noreferrer",href:"https://www.paypal.com/us/webapps/mpp/ppcterms"},"Click here")," ","to view the PayPal Credit Terms and Conditions."),Object(o.g)("p",null,j),Object(o.g)("p",null,O),n?Object(o.g)("button",{type:"button",className:"tab-switch-button",onClick:n},"Or see Pay in 4"):null)},f=n(8),x=function(t){var e=t.switchTab,n=Object(b.b)().products,i=Object(u.a)("GPL"),r=i.headline,a=i.subHeadline,c=i.instructions,l=Object(u.b)("GPL").qualifying;return Object(o.g)("section",{className:"content-body"},Object(o.g)("div",{className:"description"},Object(o.g)("h2",null,n.length>1&&!e?r.multiProduct:r.singleProduct),Object(o.g)("h3",null,"true"===l.toLowerCase()?a.qualified:a.unqualified.replace(/\.00/g,"")),Object(o.g)("div",{className:"call-to-action"},Object(o.g)("div",null,Object(o.g)("p",null,Object(o.g)("span",{className:"d-inline-block"},c.title[0]," ",Object(o.g)("b",{className:"dark-text"},c.title[1]))," ",Object(o.g)("span",{className:"d-inline-block"},c.title[2]," ",Object(o.g)("b",{className:"dark-text"},c.title[3])))),Object(o.g)(f.a,{name:"secure"}))),Object(o.g)("hr",{className:"divider"}),Object(o.g)("div",{className:"terms"},Object(o.g)("h3",null,"About Pay in 4"),Object(o.g)("ul",null,"true"===l.toLowerCase()?Object(o.g)("li",null,c.purchaseAmount.replace(/\.00/g,"")):null,c.items.map((function(t){return Object(o.g)("li",null,t)})))),e?Object(o.g)("button",{type:"button",className:"tab-switch-button",onClick:e},"Or see 6 months special financing"):null)},w=n(50),y=n(51),j=n(168),O=n(64),v=function(t){var e=t.headerRef,n=t.contentWrapper,i=Object(c.i)(),r=Object(b.b)().products,a=Object(p.b)(),l=a.offer,u=a.amount,f=a.onClick,v=Object(y.b)()[0],k=Object(h.b)().scrollTo,N=Object(c.j)(!1),P=N[0],C=N[1],z=Object(c.i)(0),T=Object(d.a)("Apply Now"),S=Object(c.j)(!1),_=S[0],L=S[1],A=Object(O.c)(l),H=s()(r,(function(t){return t.meta.product===A}))||r[0],X=Object(c.j)(H.meta.product),M=X[0],I=X[1];Object(h.b)((function(t){var n=t.target.scrollTop;0!==n&&(n>=e.current.clientHeight+i.current.clientHeight?P||C(!0):P&&C(!1)),z.current=n}),[P]);var G=function(t){k(0),"NI"!==t&&L(!1),I(t),n.current.scrollTo(0,P?e.current.clientHeight+i.current.clientHeight:z.current)},W=function(t){f({linkName:t,src:"link_click"}),G(t)};Object(j.a)((function(){var t=s()(r,(function(t){return t.meta.product===A}))||r[0];I(t.meta.product)}),[A]);var R=function(t){"NI"===M&&t!==_&&L(t)};Object(c.d)((function(){"CLOSED"===v&&(R(!1),C(!1))}),[v]);var q={GPL:{title:"Pay in 4",product:"GPL"},NI:{title:"PayPal Credit",product:"NI"}},B=r.map((function(t){return q[t.meta.product]})).filter((function(t){return void 0===u||0===u||t.product===M})),D=1===B.length&&r.length>1;q.GPL.body=Object(o.g)(x,{switchTab:D?function(){return W("NI")}:null}),q.NI.body=Object(o.g)(m,{showApplyNow:R,switchTab:D?function(){return W("GPL")}:null});var J=B.length>1?Object(o.g)(w.a,{tabs:B,onSelect:function(t){G(B[t].product)}}):Object(o.g)("div",{className:"tab-transition-item selected"},B[0].body),Y=["content",P?"sticky":""];return Object(o.g)("div",{className:Y.join(" ")},Object(o.g)("span",{className:"corner",ref:i}),Object(o.g)("div",{className:"sticky-apply-now "+(_?"show":"")},Object(o.g)(g.a,{onClick:T,className:"apply-now"},"Apply for PayPal Credit"),Object(o.g)("div",null,"Subject to credit approval."),Object(o.g)("hr",{className:"divider"})),Object(o.g)("main",{className:"main"},J))},k=n(11),N=n(12),P=function(){var t=Object(y.b)()[1],e=Object(c.i)(),n=Object(c.i)();return Object(o.g)(N.a,{contentWrapper:n,contentMaxWidth:640},Object(o.g)("div",{className:"top-overlay",onClick:function(){return t("Modal Overlay")}}),Object(o.g)("div",{className:"content-wrapper",ref:n},Object(o.g)("div",{className:"content-background"},Object(o.g)(k.a,{wrapperRef:e},Object(o.g)("h1",null,"Buy now, pay later")),Object(o.g)("div",{className:"hero-image"},Object(o.g)(f.a,{name:"phone-arm"})),Object(o.g)(v,{headerRef:e,contentWrapper:n}))))};function C(t){Object(o.j)(Object(o.g)(i.a,{serverData:t,styles:a.a._getCss()},Object(o.g)(P,{contentMaxWidth:612})),document.body)}},86:function(t,e,n){var o=n(148),i=n(24),r="string"==typeof o?[[t.i,o,""]]:o;(e=t.exports=o.locals||{})._getContent=function(){return r},e._getCss=function(){return""+o},e._insertCss=function(t){return i(r,t)}}});
//# sourceMappingURL=smart-credit-modal-US.js.map