/* version: 1.25.2 */
window.crc=function(e){function t(t){for(var r,o,c=t[0],l=t[1],s=t[2],m=0,f=[];m<c.length;m++)({}).hasOwnProperty.call(a,o=c[m])&&a[o]&&f.push(a[o][0]),a[o]=0;for(r in l)({}).hasOwnProperty.call(l,r)&&(e[r]=l[r]);for(d&&d(t);f.length;)f.shift()();return i.push.apply(i,s||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,c=1;c<n.length;c++)0!==a[n[c]]&&(r=!1);r&&(i.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},a={4:0},i=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return{}.hasOwnProperty.call(e,t)},o.p="";var c=("undefined"!=typeof self?self:this).webpackJsonpcrc=("undefined"!=typeof self?self:this).webpackJsonpcrc||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var s=0;s<c.length;s++)t(c[s]);var d=l;return i.push([161,0]),n()}({156:function(e,t,n){(t=n(23)(!1)).push([e.i,".content-wrapper{overflow-y:scroll;-webkit-overflow-scrolling:touch;margin:auto;height:100%;width:100vw}.content{padding-top:0;position:relative;z-index:50;background:white;flex:1 1 100%;border-top-left-radius:10px;border-top-right-radius:10px;display:flex;flex-direction:column}.content-background{min-height:100%;position:relative;width:100%;margin:auto;max-width:640px}main{height:100%;box-sizing:border-box;display:flex;flex-direction:column;flex:1 1 100%}.content-column{width:500px;max-width:calc(100% - 72px);margin:auto;box-sizing:border-box}.modal-container.loading .content-wrapper{overflow:hidden}.modal-container.loading .transitional{filter:blur(3px)}.top-overlay{position:fixed;height:84px;left:0;right:0}@media (min-width: 640px) and (min-height: 540px){.content-background{margin:auto;width:100%;box-shadow:0px 10px 14px 1px rgba(0,0,0,0.6);display:flex;flex-direction:column;border-radius:10px;flex:1 1 100%}.content-wrapper{display:flex;justify-content:center}.wrapper{opacity:0;transform:translateY(5%);transition:transform 350ms ease, opacity 250ms ease}.show .wrapper{opacity:1;transform:translateY(0%);transition:transform 350ms ease, opacity 250ms ease}}@media (max-width: 639px), (max-height: 539px){.content-column{max-width:400px;width:auto;padding:0 12px}.content-wrapper{height:calc(100% - 42px);padding-top:42px;scrollbar-width:none}.content-wrapper::-webkit-scrollbar{display:none}.content-background{box-shadow:1px 21px 34px 2px rgba(0,0,0,0.56)}.overlay-side.left,.overlay-side.right{width:calc((100% - 612px) / 2) !important}.overlay-side.bottom{display:none}}@media all and (-ms-high-contrast: none), (-ms-high-contrast: active){.content-wrapper,.content-background,.content,.main{display:block}.content{min-height:100vh}}.header-container{background-color:#003087;position:relative}.header-container h1{font-size:1.5rem;line-height:35px;max-width:320px;color:white;margin:auto}.header-container .header{max-width:500px;margin:auto;z-index:999;display:block;height:auto;padding-top:30px;text-align:center}.header-container .logo{display:inline-block;margin-bottom:1rem}.header-container .logo img{height:30px}.header-container .close{top:5px;right:5px;pointer-events:all}.header-container .close svg{height:40px;width:40px}.header-container .close svg path{stroke:white !important}@media (max-width: 639px), (max-height: 539px){.header-container{text-align:center}.header-container h1{margin:0 auto;font-size:26px;line-height:30px;padding-bottom:20px}}@media (max-width: 350px){.header-container h1{font-size:20px;line-height:22px}}.header-container .close svg{height:35px;width:35px}.header-wrapper{border-top-left-radius:10px;border-top-right-radius:10px;overflow:hidden;flex:0 0 auto}.content{position:relative;background:transparent;box-sizing:border-box;padding-top:0;background:#f7f5f0;padding-bottom:1rem}.content p,.content li,.content .terms h3{color:#687173}.content .d-inline-block{display:inline-block}.content main{color:#687173;padding-top:0}.content .disclosure{border-top:1px dashed #9da3a6;font-size:0.8rem;line-height:1.8;padding:1rem 0 3rem}@media (max-width: 639px), (max-height: 539px){.content .disclosure{margin-top:1rem}}.content .instructions{text-align:center;padding:2rem 1rem;flex:1 1 auto}.content .content-body{flex:1 1 100%;display:flex;flex-direction:column;padding:0 1rem}.content .calculator{margin:0 -1rem}.calculator{text-align:center}.calculator .title{margin-top:0;color:white;font-weight:500}.calculator .input__wrapper{position:relative;display:inline-block;font-size:0.9rem;text-align:left;margin-bottom:0.25rem}.calculator .input__wrapper:after{content:'€';position:absolute;right:0.5rem;bottom:0.25rem;font-size:1.3rem}.calculator .input__wrapper .input__label{position:absolute;left:0.5rem;top:0.25rem}.calculator .input__wrapper .input{background:white;border:1px solid #ccc;border-radius:3px;color:#2c2e2f;font-size:1rem;padding:1.75rem 0.5rem 0.25rem}.calculator .form{margin-top:-1px;background:#003087;padding-bottom:2.25rem;padding-top:0.5rem;transition:padding-top 0.2s ease-out}.calculator .form.no-amount{padding-top:2rem}.calculator__error{color:white;font-size:0.8rem;margin-top:0;transition:margin-top 0.2s ease-out}.calculator__error>div{display:inline-flex;text-align:left;align-items:flex-start;max-width:300px;margin:auto}.calculator__error.hide{margin-top:-20px}.calculator__error.hide>div{height:0;overflow:hidden}.calculator__error svg{margin:0 0.5rem 0 0}.finance-terms{margin-top:-1.5rem;transition:margin-top 0.2s ease-out, max-height 0.15s ease-in;color:#2c2e2f;max-height:1000px}.finance-terms.loading{max-height:400px}.finance-terms.has-error{margin-top:1rem;max-height:0;overflow:hidden}.finance-terms .offer{background:white;border-radius:14px;box-shadow:0px 0px 2px rgba(0,0,0,0.04),0px 1px 12px rgba(0,0,0,0.08);margin-bottom:0.75rem;text-align:left}.finance-terms .offer__periodic{font-family:PayPalSansBig, Helvetica, Arial, Sans-Serif;font-size:1.3rem}.finance-terms .offer__term{color:#003087;font-size:1rem}.finance-terms .offer__header,.finance-terms .offer__field{display:flex;align-items:center}.finance-terms .offer__header .blue,.finance-terms .offer__field .blue{color:#003087}.finance-terms .offer__header>:first-child,.finance-terms .offer__field>:first-child{flex:1 1 auto}.finance-terms .offer__header{font-family:PayPalSansSmall, Helvetica, Arial, Sans-Serif;border:none;cursor:pointer;text-align:left;width:100%;background:none;padding:1rem}.finance-terms .offer__header:active{color:#2c2e2f}.finance-terms .offer__field{font-size:0.8rem}.finance-terms .offer__field:not(:last-child){margin-bottom:1rem}.finance-terms .offer__description{color:#687173;font-size:0.8rem;height:2.8rem}.finance-terms .offer__body{padding:0 1rem;margin-top:0;transition:height 0.2s linear, margin 0.2s linear, padding 0.2s linear;height:0;overflow:hidden}.finance-terms .offer.expanded{cursor:default}.finance-terms .offer.expanded .offer__body{height:130px;padding:0 1rem 1rem}.finance-terms .offer.loading{padding:1rem}.finance-terms__disclaimer{font-size:0.75rem;text-align:left;padding:0 1rem}.finance-terms .small{font-size:0.75em}@keyframes shimmer{0%{background-position:-2000px 0}100%{background-position:0 0}}.finance-terms .loading-bar{position:relative;background:#eee;height:20px;margin:4px 0;animation:shimmer 2s linear infinite;background:linear-gradient(to bottom right, #eff1f3 21%, #e2e2e2 25%, #eff1f3 29%);background-size:3000px 1000px}.finance-terms .loading-bar:after{content:'';display:block;position:absolute;left:60%;top:0;background:white;height:100%;width:15%}.finance-terms .error{margin:auto;text-align:left;display:flex;align-items:flex-start;justify-content:center;margin-bottom:1rem}.finance-terms .error svg{display:inline-block;margin:0 0.5rem}\n",""]),e.exports=t},161:function(e,t,n){"use strict";n.r(t),n.d(t,"setupModal",(function(){return O}));var r=n(0),a=n(10),i=n(94),o=n.n(i),c=n(4),l=n(170),s=n(171),d=n(36),m=function(e){var t=e.offer,n=e.formattedAmount,a=e.index,i=Object(c.j)(null),o=i[0],l=i[1];return Object(c.d)((function(){0===a?requestAnimationFrame((function(){l(!0)})):l(!1)}),[t]),Object(r.g)("div",{className:"offer "+(o?"expanded":"")},Object(r.g)("button",{className:"offer__header",type:"button",onClick:function(){return l(!o)}},Object(r.g)("div",{className:"offer__periodic"},t.periodic," € ",Object(r.g)("span",{className:"small"},"/Monat")),Object(r.g)("div",{className:"offer__term"},t.term," Raten")),Object(r.g)("div",{className:"offer__body"},Object(r.g)("div",{className:"offer__description"},"Eff. Jahreszins ",t.apr,"% p.a., Fester Sollzinssatz ",t.nominalRate,"% p.a."),Object(r.g)("div",{className:"offer__field"},Object(r.g)("div",{className:"blue"},"Transaktionsbetrag E-Geld Service"),Object(r.g)("div",null,n," €")),Object(r.g)("div",{className:"offer__field"},Object(r.g)("div",null,"Zinsbetrag"),Object(r.g)("div",null,t.totalInterest," €")),Object(r.g)("div",{className:"offer__field"},Object(r.g)("div",null,"Gesamtbetrag"),Object(r.g)("div",null,t.total," €"))))},f=function(e){var t=e.isLoading,n=e.terms,a=n.offers,i=n.formattedAmount,o=e.hasError,c=Object(l.a)("GPL").terms.disclaimer;if(t||o)return Object(r.g)("div",{className:"finance-terms transitional loading "+(o?"has-error":"")},[0,1,2,3].map((function(){return Object(r.g)("div",{className:"offer loading"},Object(r.g)("div",{className:"loading-bar"}))})));var s=a.slice().sort((function(e,t){return t.term-e.term}));return Object(r.g)("div",{className:"finance-terms transitional"},Object(r.g)(r.b,null,s.map((function(e,t){return Object(r.g)(m,{offer:e,formattedAmount:i,index:t})})),Object(r.g)("div",{className:"finance-terms__disclaimer"},c)))},p=n(8),u=function(e){return e.replace(/[^\d,]/g,"").replace(/,/,".")},g=function(e){var t,n=u(e),r=null!=(t=n.match(/^(\d+)(?:\.(\d{1,2}))?/))?t:[],a=r[2],i=void 0===a?"":a,o=Number(r[1]).toLocaleString("de-DE",{currency:"EUR",minimumFractionDigits:0,maximumFractionDigits:2});return""===n||"NaN"===o?"":o+(""!==i||","===e[e.length-1]?","+i.slice(0,2):"")},b=function(){var e=Object(s.a)({autoSubmit:!0}),t=e.terms,n=e.value,a=e.isLoading,i=e.submit,o=e.changeInput,m=void 0!==Object(d.b)().amount,b="0,00"!==n&&""!==n,h=!m&&!b,x=Object(c.j)(m?n:""),v=x[0],_=x[1],j=function(e,t){var n,r=e.amount,a=e.minAmount,i=e.maxAmount,o=e.error,c=e.offers,s=Object(l.a)("GPL").calculator,d=s.genericError;return o||!i?d:void 0===r||t?null:+r<a||+r>i?s.amountRange.replace(/,00/g,""):null!=c&&null!=(n=c[0])&&n.qualified?null:d}(t,a),O=Object(l.a)("GPL").calculator,w=O.title,y=O.inputLabel,k=O.amountRange;return Object(c.d)((function(){_(g(n))}),[n]),Object(r.g)("div",{className:"calculator"},Object(r.g)("form",{className:"form "+(h?"no-amount":""),onSubmit:i},h?Object(r.g)("h3",{className:"title"},w):null,Object(r.g)("div",{className:"input__wrapper transitional"},Object(r.g)("div",{className:"input__label"},y),Object(r.g)("input",{className:"input",type:"tel",value:v,onInput:function(e){var t=e.target,n=t.selectionStart,r=t.selectionEnd,a=t.value,i=u(a),c=g(a),l=a.length<10&&Number(i).toFixed(2).length<9?c:v,s=l.length-a.length;_(l),o(e);var d=e.target;requestAnimationFrame((function(){d.setSelectionRange(n+s,r+s)}))},onKeyDown:function(e){1!==e.key.length||/[\d.,]/.test(e.key)||e.preventDefault()}})),Object(r.g)("div",{className:"content-column transitional calculator__error "+(j||h||a?"":"hide")},Object(r.g)("div",null,j?Object(r.g)(p.a,{name:"warning"}):null,Object(r.g)("span",null,null!=j?j:k.replace(/,00/g,""))))),Object(r.g)("div",{className:"content-column"},Object(r.g)(f,{terms:t,isLoading:a,hasError:!m&&!b||!!j})))},h=function(){var e=Object(l.a)("GPL"),t=e.instructions,n=e.disclosure,a=Object(l.b)("GPL").apr;return Object(r.g)("section",{className:"content-body"},Object(r.g)(b,null),Object(r.g)("div",{className:"content-column instructions transitional"},t.map((function(e){return"PayPal"===e?Object(r.g)("b",null,"PayPal "):Object(r.g)("span",null,e," ")}))),Object(r.g)("div",{className:"content-column disclosure transitional"},("0,00"===a?n.zeroAPR:n.nonZeroAPR).replace(/,00/g,"")))},x=n(51),v=n(11),_=n(12),j=function(){var e=Object(c.i)(),t=Object(x.b)()[1],n=Object(l.a)("GPL").headline;return Object(r.g)(_.a,{contentWrapper:e,contentMaxWidth:640},Object(r.g)("div",{className:"top-overlay",onClick:function(){return t("Modal Overlay")}}),Object(r.g)("div",{className:"content-wrapper",ref:e},Object(r.g)("div",{className:"content-background"},Object(r.g)(v.a,{logo:"DE-GPL"},Object(r.g)("h1",null,n)),Object(r.g)("div",{className:"content"},Object(r.g)("main",{className:"main"},Object(r.g)(h,null))))))};function O(e){Object(r.j)(Object(r.g)(a.a,{serverData:e,styles:o.a._getCss()},Object(r.g)(j,{contentMaxWidth:750,contentMaxHeight:537})),document.body)}},94:function(e,t,n){var r=n(156),a=n(24),i="string"==typeof r?[[e.i,r,""]]:r;(t=e.exports=r.locals||{})._getContent=function(){return i},t._getCss=function(){return""+r},t._insertCss=function(e){return a(i,e)}}});
//# sourceMappingURL=smart-credit-modal-DE-GPL.js.map