/* version: 1.14.0 */
window.crc=function(e){function t(t){for(var a,i,c=t[0],l=t[1],s=t[2],d=0,h=[];d<c.length;d++)({}).hasOwnProperty.call(n,i=c[d])&&n[i]&&h.push(n[i][0]),n[i]=0;for(a in l)({}).hasOwnProperty.call(l,a)&&(e[a]=l[a]);for(u&&u(t);h.length;)h.shift()();return o.push.apply(o,s||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],a=!0,c=1;c<r.length;c++)0!==n[r[c]]&&(a=!1);a&&(o.splice(t--,1),e=i(i.s=r[0]))}return e}var a={},n={2:0},o=[];function i(t){if(a[t])return a[t].exports;var r=a[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=a,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(r,a,function(t){return e[t]}.bind(null,a));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return{}.hasOwnProperty.call(e,t)},i.p="";var c=("undefined"!=typeof self?self:this).webpackJsonpcrc=("undefined"!=typeof self?self:this).webpackJsonpcrc||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var s=0;s<c.length;s++)t(c[s]);var u=l;return o.push([145,0]),r()}({142:function(e,t,r){(t=r(31)(!1)).push([e.i,".header-container .header{background:#f6f7fb}.header-container .header::after{background:linear-gradient(#f6f7fb, rgba(246,247,251,0));height:20px}.header-container .logo{width:200px;padding:28px 0}.content{padding-top:72px;position:relative;z-index:50;overflow:hidden}.content .calculator-container{margin:auto;max-width:400px;padding-bottom:3rem}.content .disclosure{color:#687173;font-size:0.75rem}.content-body{overflow:hidden}.content-wrapper{position:absolute;top:0;left:0;right:0;bottom:0;overflow-y:scroll}.content-background{width:100%;max-width:612px;margin:auto;background:white;min-height:100%}@media only screen and (max-width: 612px){.calculator-container{padding:0 18px}}.header-wrapper{display:table;position:absolute;top:0;left:0;width:100%;z-index:1000}.header-wrapper::after{content:'';display:table-cell;visibility:hidden;overflow-y:scroll}.header-wrapper .header-container{display:table-cell;width:100%}.header-wrapper .header{background:#f6f7fb;text-align:center;width:100%;max-width:612px;margin:0 auto;position:relative;height:100%}.header-wrapper .logo{box-sizing:border-box;display:block;margin:0 auto;height:72px;transition:all 0.3s}.header-wrapper .close svg{height:48px;width:48px}.header-wrapper .close path{stroke-width:1px;transition:all 0.3s}.header-wrapper .logo-wrapper{transition:all 0.3s;transform:translateX(0) scale(1)}.calculator{text-align:center;max-width:300px;margin:auto}.calculator .title{text-align:center}.calculator .instructions{color:#687173;position:relative;left:50%;transform:translateX(-50%);width:300px}.calculator .instructions::before{content:'';display:block;position:absolute;top:-0.7rem;width:220px;left:50%;transform:translateX(-50%);border-bottom:1px dotted #cbd2d6}.calculator .form{width:150px;margin:auto;padding:0 2rem;font-size:20px;position:relative}.calculator .form:after{content:'€';position:absolute;top:1px;right:1.3rem}.calculator .form.form--loading:after{opacity:0.5}.calculator .input{font-size:20px;text-align:center;width:100%;border:none}.calculator .form.form--loading .input{opacity:0.5}@media only screen and (min-width: 436px){.calculator .title{font-size:1.1875rem}.calculator .form{font-size:1.5rem}.calculator .form:after{top:-1px}.calculator .input{font-size:1.5rem}}.carousel{border-radius:0 0 100% 100%;width:150%;background:#f6f7fb;overflow:auto;margin-left:-25%}.carousel .outer{max-width:400px;margin:auto;overflow:hidden;position:relative;width:66.666666%}.carousel .title{font-size:20px;font-weight:300;margin-top:0;margin-bottom:0;text-align:center}.carousel .inner{white-space:nowrap;transition:transform 0.2s ease-out;font-size:0;transform:translateX(0)}.carousel .item{display:inline-block;width:100%;padding:15px 30px 0;box-sizing:border-box;white-space:normal}.carousel .item img{display:block;height:auto;max-width:100%}.carousel .image{margin:auto}.carousel .text{text-align:center;max-width:250px;font-weight:600;margin-left:auto;margin-right:auto}.carousel .indicators{padding:0;text-align:center;position:relative;z-index:2;margin-top:0}.carousel .indicators li{display:inline-block;margin:0}.carousel .bullet{cursor:pointer;display:block;border:none;background:none;height:30px;width:30px;position:relative;overflow:hidden}.carousel .bullet:after{background-color:#aaaaaa;content:'';width:10px;height:10px;border-radius:50%;position:absolute;top:10px;left:10px}.carousel .bullet.active:after{background-color:#0070ba}.carousel .shadow{position:absolute;height:100%;width:100%;box-shadow:0px -20px 20px 20px #f6f7fb inset;z-index:1}.carousel .arrows{width:100%;position:absolute;z-index:2;top:10px}.carousel .arrow{border-radius:100%;width:3rem;height:3rem;background:none;border:none;position:absolute;cursor:pointer}.carousel .arrow:hover{background:#eee}.carousel .arrow:focus{background:#eee;outline:none;border:1px solid rgba(0,112,186,0.5)}.carousel .arrow:after{content:'';position:absolute;width:30%;height:30%;border-top:2px solid #cbd2d6;border-right:2px solid #cbd2d6;top:37%;left:28%}.carousel .arrow--prev{left:10px;transform:rotate(-135deg)}.carousel .arrow--next{right:10px;transform:rotate(45deg)}.finance-terms{position:relative}.finance-terms .table{width:100%;font-size:0.875rem}.finance-terms .table td{padding:2px 0}.finance-terms .table td:last-child{text-align:right}.finance-terms .divider{opacity:0.3}.finance-terms .header{text-align:center}.finance-terms .error{text-align:center}@media only screen and (min-width: 436px){.finance-terms .table td{padding:5px 0}}\n",""]),e.exports=t},145:function(e,t,r){"use strict";r.r(t),r.d(t,"setupModal",(function(){return j}));var a=r(1),n=r(18),o=r(86),i=r.n(o),c=r(3),l=function(e){var t=e.items,r=Object(c.j)(0),n=r[0],o=r[1],i=Object(c.i)(),l=Object(c.i)();return Object(c.d)((function(){var e,r,a=l.current.firstChild.offsetWidth,c=function(t){e=t.touches[0].clientX,r=-a*n,l.current.style.setProperty("transition-duration","0s")},s=function(o){var i=.6*a;r=o.touches[0].clientX-e,((r=Math.min(i,Math.max(n*-a+r,2*-a-i)))>0||r<2*-a)&&(r+=(r<0?1:-1)*function(e,r){var n=e<0?Math.abs(e):e-(t.length-1)*a,o=1/Math.E;return n/2*Math.log((n/r*(1-o)+o)*Math.E)}(-r,i)),l.current.style.setProperty("transform","translateX("+r+"px)")},u=function(){l.current.style.setProperty("transition-duration","0.3s");var e=r+a*n;if(Math.abs(e)>a/4){if(e<0&&n+1<t.length)return o(n+1);if(e>0&&n-1>=0)return o(n-1)}return l.current.style.setProperty("transform","translateX(-"+100*n+"%)")};return i.current.addEventListener("touchstart",c),i.current.addEventListener("touchmove",s),i.current.addEventListener("touchend",u),function(){i.current.removeEventListener("touchstart",c),i.current.removeEventListener("touchmove",s),i.current.removeEventListener("touchend",u)}}),[n]),Object(a.h)("div",{ref:i,className:"carousel"},Object(a.h)("h1",{className:"title"},"So funktioniert's"),Object(a.h)("div",{className:"outer"},Object(a.h)("div",{className:"arrows"},0!==n&&Object(a.h)("button",{type:"button",className:"arrow arrow--prev","aria-label":"Previous",onClick:function(){return o(n-1)}}),n!==t.length-1&&Object(a.h)("button",{type:"button",className:"arrow arrow--next","aria-label":"Next",onClick:function(){return o(n+1)}})),Object(a.h)("div",{className:"shadow"}),Object(a.h)("div",{ref:l,className:"inner",style:{transform:"translateX(-"+100*n+"%)"}},t.map((function(e){return Object(a.h)("div",{className:"item"},Object(a.h)("div",null,Object(a.h)("img",{className:"image",src:e.imageSrc,alt:e.imageAlt})),Object(a.h)("p",{className:"text"},e.description))}))),Object(a.h)("ol",{className:"indicators"},t.map((function(e,t){return Object(a.h)("li",null,Object(a.h)("button",{type:"button",className:"bullet "+(t===n?"active":""),onClick:function(){return o(t)},"aria-label":n+1}))})))))},s=r(158),u=r(157),d=r(9),h=function(e){var t=e.terms,r=t.error,n=t.amount,o=t.formattedAmount,i=t.maxAmount,c=t.minAmount,l=t.type,s=t.offers,d=Object(u.a)("INST").terms,h=d.genericError,p=d.minError,b=d.maxError,f=d.tableHeader,m=Object(a.h)("h3",{className:"error"},h);if(r||!i)return m;if(+n<c&&"pala"===l)return Object(a.h)("h3",{className:"error"},p.replace(/,00/g,""));if(+n>i&&"pala"===l)return Object(a.h)("h3",{className:"error"},b.replace(/,00/g,""));var g=(s.length?s:[])[0];return g&&g.qualified?Object(a.h)(a.b,null,Object(a.h)("h3",{className:"header"},f),Object(a.h)("hr",{className:"divider"}),Object(a.h)("table",{className:"table"},Object(a.h)("tbody",null,Object(a.h)("tr",null,Object(a.h)("td",null,"E-Geld Transaktionsbetrag"),Object(a.h)("td",null,o,"€")),Object(a.h)("tr",null,Object(a.h)("td",null,"Effektiver Jahreszinssatz"),Object(a.h)("td",null,g.apr,"%")),Object(a.h)("tr",null,Object(a.h)("td",null,"Fester Sollzinssatz"),Object(a.h)("td",null,g.nominalRate,"%")),Object(a.h)("tr",null,Object(a.h)("td",null,"Zinsbetrag"),Object(a.h)("td",null,g.totalInterest,"€")),Object(a.h)("tr",null,Object(a.h)("td",null,Object(a.h)("b",null,"Gesamtbetrag")),Object(a.h)("td",null,Object(a.h)("b",null,g.total,"€")))))):m},p=function(e){var t=e.terms,r=e.isLoading;return Object(a.h)("div",{className:"finance-terms"},Object(a.h)("div",{className:"spinner",style:{opacity:r?"1":"0"}}),Object(a.h)("div",{style:{opacity:r?"0.5":"1"}},("pala"===t.type||t.error)&&Object(a.h)(h,{terms:t})))},b=function(e){var t=e.terms,r=t.error,n=t.formattedMinAmount,o=t.formattedMaxAmount,i=t.offers,c=Object(u.a)("INST"),l=c.disclosure,s=c.disclosureZeroAPR,d=c.disclaimer;if(!r&&n&&o&&i&&i.length>0){var h=0===Number(i[0].apr.replace(/[,.]/g,""))?s:l;return Object(a.h)("p",{className:"disclosure"},h.replace(/,00/g,"")," ",Object(a.h)("a",{target:"_blank",rel:"noopener noreferrer",href:"https://www.paypal.com/de/webapps/mpp/paypal-instalments"},"Mehr erfahren"))}return Object(a.h)("p",{className:"disclosure"},d)},f=function(){var e=Object(s.a)(),t=e.terms,r=e.value,n=e.isLoading,o=e.submit,i=e.changeInput,c=Object(u.a)("INST").calculator,l=c.title,h=c.instructions,f=c.disclosure,m=t.error,g=t.formattedMinAmount,x=t.formattedMaxAmount,O=t.offers;return Object(a.h)(a.b,null,Object(a.h)("div",{className:"calculator"},Object(a.h)("h3",{className:"title"},l),Object(a.h)("form",{className:"form "+(n?"form--loading":""),onSubmit:o},Object(a.h)("input",{className:"input",value:r,onInput:i}),Object(a.h)("p",{className:"instructions"},!m&&g&&x?h.replace(/,00/g,""):null),Object(a.h)(d.a,{size:"md",type:"submit"},"Berechnen"))),Object(a.h)(p,{terms:t,isLoading:n}),!m&&O&&O.length>0&&O[0].qualified&&Object(a.h)("p",{className:"disclosure"},f),Object(a.h)(b,{terms:t}))},m=function(){var e=Object(u.a)("INST").carousel;return Object(a.h)("section",{className:"content-body"},Object(a.h)(l,{items:e}),Object(a.h)("div",{className:"calculator-container"},Object(a.h)(f,{country:"DE"})))},g=r(19),x=r(20),O=function(){var e=Object(c.i)();return Object(a.h)(x.a,{contentWrapper:e,contentMaxWidth:612},Object(a.h)(g.a,{className:""}),Object(a.h)("div",{className:"content-wrapper",ref:e},Object(a.h)("div",{className:"content-background"},Object(a.h)("div",{className:"content"},Object(a.h)("main",{className:"main"},Object(a.h)(m,null))))))};function j(e){Object(a.k)(Object(a.h)(n.a,{serverData:e,styles:i.a._getCss()},Object(a.h)(O,{contentMaxWidth:612})),document.body)}},86:function(e,t,r){var a=r(142),n=r(32),o="string"==typeof a?[[e.i,a,""]]:a;(t=e.exports=a.locals||{})._getContent=function(){return o},t._getCss=function(){return""+a},t._insertCss=function(e){return n(o,e)}}});
//# sourceMappingURL=smart-credit-modal-DE@1.14.0.js.map
