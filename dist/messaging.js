(window.paypal = window.paypal || {}),
    (window.paypal.Messages = (function(e) {
        var n = {};
        function t(o) {
            if (n[o]) return n[o].exports;
            var a = (n[o] = { i: o, l: !1, exports: {} });
            return e[o].call(a.exports, a, a.exports, t), (a.l = !0), a.exports;
        }
        return (
            (t.m = e),
            (t.c = n),
            (t.d = function(e, n, o) {
                t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: o });
            }),
            (t.r = function(e) {
                'undefined' != typeof Symbol &&
                    Symbol.toStringTag &&
                    Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
                    Object.defineProperty(e, '__esModule', { value: !0 });
            }),
            (t.t = function(e, n) {
                if ((1 & n && (e = t(e)), 8 & n)) return e;
                if (4 & n && 'object' == typeof e && e && e.__esModule) return e;
                var o = Object.create(null);
                if (
                    (t.r(o),
                    Object.defineProperty(o, 'default', { enumerable: !0, value: e }),
                    2 & n && 'string' != typeof e)
                )
                    for (var a in e)
                        t.d(
                            o,
                            a,
                            function(n) {
                                return e[n];
                            }.bind(null, a)
                        );
                return o;
            }),
            (t.n = function(e) {
                var n =
                    e && e.__esModule
                        ? function() {
                              return e.default;
                          }
                        : function() {
                              return e;
                          };
                return t.d(n, 'a', n), n;
            }),
            (t.o = function(e, n) {
                return {}.hasOwnProperty.call(e, n);
            }),
            (t.p = ''),
            t((t.s = 161))
        );
    })([
        function(e, n, t) {
            e.exports = t(135);
        },
        function(e, n, t) {
            e.exports = t(110);
        },
        ,
        function(e, n, t) {
            e.exports = t(140);
        },
        function(e, n, t) {
            'use strict';
            var o = t(8),
                a = t(103).f,
                i = t(104),
                r = t(16),
                s = t(35),
                l = t(17),
                c = t(15),
                d = function(e) {
                    var n = function(n, t, o) {
                        if (this instanceof e) {
                            switch (arguments.length) {
                                case 0:
                                    return new e();
                                case 1:
                                    return new e(n);
                                case 2:
                                    return new e(n, t);
                            }
                            return new e(n, t, o);
                        }
                        return e.apply(this, arguments);
                    };
                    return (n.prototype = e.prototype), n;
                };
            e.exports = function(e, n) {
                var t,
                    m,
                    u,
                    p,
                    g,
                    f,
                    h,
                    y,
                    _ = e.target,
                    w = e.global,
                    x = e.stat,
                    v = e.proto,
                    b = w ? o : x ? o[_] : (o[_] || {}).prototype,
                    R = w ? r : r[_] || (r[_] = {}),
                    A = R.prototype;
                for (u in n)
                    (t = !i(w ? u : _ + (x ? '.' : '#') + u, e.forced) && b && c(b, u)),
                        (g = R[u]),
                        t && (f = e.noTargetGet ? (y = a(b, u)) && y.value : b[u]),
                        (p = t && f ? f : n[u]),
                        (t && typeof g == typeof p) ||
                            ((h =
                                e.bind && t
                                    ? s(p, o)
                                    : e.wrap && t
                                    ? d(p)
                                    : v && 'function' == typeof p
                                    ? s(Function.call, p)
                                    : p),
                            (e.sham || (p && p.sham) || (g && g.sham)) && l(h, 'sham', !0),
                            (R[u] = h),
                            v &&
                                (c(r, (m = _ + 'Prototype')) || l(r, m, {}),
                                (r[m][u] = p),
                                e.real && A && !A[u] && l(A, u, p)));
            };
        },
        function(e, n, t) {
            var o = t(8),
                a = t(38),
                i = t(50),
                r = t(120),
                s = o.Symbol,
                l = a('wks');
            e.exports = function(e) {
                return l[e] || (l[e] = (r && s[e]) || (r ? s : i)('Symbol.' + e));
            };
        },
        function(e, n, t) {
            e.exports = t(148);
        },
        function(e, n, t) {
            e.exports = t(101);
        },
        function(e, n) {
            var t = 'object',
                o = function(e) {
                    return e && e.Math == Math && e;
                };
            e.exports =
                o(typeof globalThis == t && globalThis) ||
                o(typeof window == t && window) ||
                o(typeof self == t && self) ||
                o(typeof window == t && window) ||
                Function('return this')();
        },
        function(e, n) {
            e.exports = function(e) {
                if (null == e) throw TypeError("Can't call method on " + e);
                return e;
            };
        },
        function(e, n) {
            e.exports =
                "@font-face {\n    font-family: PayPal-Sans;\n    font-style: normal;\n    font-weight: 300;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Light.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Light.woff2') format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Light.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Light.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n\n@font-face {\n    font-family: PayPal-Sans;\n    font-style: normal;\n    font-weight: 400;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Regular.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Regular.woff2')\n            format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Regular.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Regular.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n\n@font-face {\n    font-family: PayPal-Sans;\n    font-style: normal;\n    font-weight: 500;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Medium.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Medium.woff2')\n            format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Medium.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Medium.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n\n@font-face {\n    font-family: PayPal-Sans;\n    font-style: normal;\n    font-weight: 700;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Bold.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Bold.woff2') format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Bold.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Bold.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n\n@font-face {\n    font-family: PayPal-Sans-Big;\n    font-style: normal;\n    font-weight: 200;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Thin.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Thin.woff2') format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Thin.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Thin.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n\n@font-face {\n    font-family: PayPal-Sans-Big;\n    font-style: normal;\n    font-weight: 300;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Light.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Light.woff2') format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Light.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Light.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n\n@font-face {\n    font-family: PayPal-Sans-Big;\n    font-style: normal;\n    font-weight: 400;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Regular.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Regular.woff2') format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Regular.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Regular.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n\n@font-face {\n    font-family: PayPal-Sans-Big;\n    font-style: normal;\n    font-weight: 500;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Medium.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Medium.woff2') format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Medium.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Medium.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n\n@font-face {\n    font-family: PayPal-Sans-Big;\n    font-style: normal;\n    font-weight: 700;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Bold.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Bold.woff2') format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Bold.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Bold.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n";
        },
        function(e, n, t) {
            e.exports = t(138);
        },
        function(e, n, t) {
            var o = t(13);
            e.exports = !o(function() {
                return (
                    7 !=
                    Object.defineProperty({}, 'a', {
                        get: function() {
                            return 7;
                        }
                    }).a
                );
            });
        },
        function(e, n) {
            e.exports = function(e) {
                try {
                    return !!e();
                } catch (e) {
                    return !0;
                }
            };
        },
        function(e, n) {
            e.exports = function(e) {
                return 'object' == typeof e ? null !== e : 'function' == typeof e;
            };
        },
        function(e, n) {
            var t = {}.hasOwnProperty;
            e.exports = function(e, n) {
                return t.call(e, n);
            };
        },
        function(e, n) {
            e.exports = {};
        },
        function(e, n, t) {
            var o = t(12),
                a = t(26),
                i = t(23);
            e.exports = o
                ? function(e, n, t) {
                      return a.f(e, n, i(1, t));
                  }
                : function(e, n, t) {
                      return (e[n] = t), e;
                  };
        },
        function(e, n, t) {
            var o = t(27),
                a = Math.min;
            e.exports = function(e) {
                return e > 0 ? a(o(e), 9007199254740991) : 0;
            };
        },
        function(e, n, t) {
            e.exports = t(41);
        },
        function(e, n, t) {
            var o = t(14);
            e.exports = function(e) {
                if (!o(e)) throw TypeError(String(e) + ' is not an object');
                return e;
            };
        },
        function(e, n, t) {
            e.exports = t(155);
        },
        function(e, n, t) {
            e.exports = t(159);
        },
        function(e, n) {
            e.exports = function(e, n) {
                return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: n };
            };
        },
        function(e, n, t) {
            var o = t(33),
                a = t(9);
            e.exports = function(e) {
                return o(a(e));
            };
        },
        function(e, n) {
            var t = {}.toString;
            e.exports = function(e) {
                return t.call(e).slice(8, -1);
            };
        },
        function(e, n, t) {
            var o = t(12),
                a = t(46),
                i = t(20),
                r = t(34),
                s = Object.defineProperty;
            n.f = o
                ? s
                : function(e, n, t) {
                      if ((i(e), (n = r(n, !0)), i(t), a))
                          try {
                              return s(e, n, t);
                          } catch (e) {}
                      if ('get' in t || 'set' in t) throw TypeError('Accessors not supported');
                      return 'value' in t && (e[n] = t.value), e;
                  };
        },
        function(e, n) {
            var t = Math.ceil,
                o = Math.floor;
            e.exports = function(e) {
                return isNaN((e = +e)) ? 0 : (e > 0 ? o : t)(e);
            };
        },
        function(e, n, t) {
            var o = t(9);
            e.exports = function(e) {
                return Object(o(e));
            };
        },
        function(e, n) {
            e.exports = {};
        },
        function(e, n) {
            e.exports =
                '* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nhtml {\n    color: #2d2d2d;\n    font-family: PayPal-Sans, Helvetica, Arial, sans-serif;\n    font-size: 14px;\n    font-weight: 400;\n    overflow: hidden;\n}\n\nimg {\n    display: block;\n    width: 100%;\n    height: auto;\n}\n\n.message__logo--svg {\n    position: relative;\n}\n\n.message__logo img {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n}\n\n/* IE will not properly scale a SVG element, but will scale a canvas element */\n.message__logo canvas {\n    display: block;\n    width: 100%;\n    visibility: hidden;\n}\n';
        },
        function(e, n, t) {
            e.exports = t(157);
        },
        function(e, n, t) {
            'use strict';
            var o = {}.propertyIsEnumerable,
                a = Object.getOwnPropertyDescriptor,
                i = a && !o.call({ 1: 2 }, 1);
            n.f = i
                ? function(e) {
                      var n = a(this, e);
                      return !!n && n.enumerable;
                  }
                : o;
        },
        function(e, n, t) {
            var o = t(13),
                a = t(25),
                i = ''.split;
            e.exports = o(function() {
                return !Object('z').propertyIsEnumerable(0);
            })
                ? function(e) {
                      return 'String' == a(e) ? i.call(e, '') : Object(e);
                  }
                : Object;
        },
        function(e, n, t) {
            var o = t(14);
            e.exports = function(e, n) {
                if (!o(e)) return e;
                var t, a;
                if (n && 'function' == typeof (t = e.toString) && !o((a = t.call(e)))) return a;
                if ('function' == typeof (t = e.valueOf) && !o((a = t.call(e)))) return a;
                if (!n && 'function' == typeof (t = e.toString) && !o((a = t.call(e)))) return a;
                throw TypeError("Can't convert object to primitive value");
            };
        },
        function(e, n, t) {
            var o = t(105);
            e.exports = function(e, n, t) {
                if ((o(e), void 0 === n)) return e;
                switch (t) {
                    case 0:
                        return function() {
                            return e.call(n);
                        };
                    case 1:
                        return function(t) {
                            return e.call(n, t);
                        };
                    case 2:
                        return function(t, o) {
                            return e.call(n, t, o);
                        };
                    case 3:
                        return function(t, o, a) {
                            return e.call(n, t, o, a);
                        };
                }
                return function() {
                    return e.apply(n, arguments);
                };
            };
        },
        function(e, n, t) {
            var o = t(107),
                a = t(49);
            e.exports =
                Object.keys ||
                function(e) {
                    return o(e, a);
                };
        },
        function(e, n) {
            e.exports = {};
        },
        function(e, n, t) {
            var o = t(8),
                a = t(116),
                i = t(39),
                r = o['__core-js_shared__'] || a('__core-js_shared__', {});
            (e.exports = function(e, n) {
                return r[e] || (r[e] = void 0 !== n ? n : {});
            })('versions', []).push({
                version: '3.2.1',
                mode: i ? 'pure' : 'global',
                copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
            });
        },
        function(e, n) {
            e.exports = !0;
        },
        function(e, n, t) {
            var o = t(38),
                a = t(50),
                i = o('keys');
            e.exports = function(e) {
                return i[e] || (i[e] = a(e));
            };
        },
        function(e, n, t) {
            var o = t(16),
                a = t(8),
                i = function(e) {
                    return 'function' == typeof e ? e : void 0;
                };
            e.exports = function(e, n) {
                return arguments.length < 2 ? i(o[e]) || i(a[e]) : (o[e] && o[e][n]) || (a[e] && a[e][n]);
            };
        },
        function(e, n, t) {
            var o = t(137);
            e.exports = function(e) {
                if (o(e)) throw TypeError("The method doesn't accept regular expressions");
                return e;
            };
        },
        function(e, n, t) {
            var o = t(5)('match');
            e.exports = function(e) {
                var n = /./;
                try {
                    '/./'[e](n);
                } catch (t) {
                    try {
                        return (n[o] = !1), '/./'[e](n);
                    } catch (e) {}
                }
                return !1;
            };
        },
        function(e, n) {
            e.exports =
                ".message__content {\n    display: inline-block;\n}\n\n.message__messaging {\n    margin: 0;\n}\n\n.message__logo-container {\n    display: inline;\n    white-space: nowrap;\n    margin: 0;\n}\n.message__logo-container::before {\n    content: 'with ';\n}\n\n.message__logo {\n    display: inline-block;\n    width: 7rem;\n    vertical-align: middle;\n}\n\n.message__headline .em {\n    display: inline-block;\n    white-space: nowrap;\n}\n\n.message__headline > span:nth-last-child(2)::after {\n    content: ' ';\n}\n";
        },
        function(e, n) {
            e.exports =
                '/* Not a valid style option ratio, but used as the mobile base for 8x1 and 20x1 */\n\n.message__content {\n    display: flex;\n    padding-right: 1rem;\n}\n\n.message__logo-container {\n    flex: 0 0 33%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.message__logo {\n    width: 60%;\n}\n\n.message__messaging {\n    flex: 1 1 100%;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: flex-start;\n}\n\n.message__messaging > * {\n    width: 100%;\n}\n\n.message__headline {\n    font-size: 5vw;\n    line-height: 1;\n    margin-bottom: 0.2em;\n}\n\n.message__headline span.multi:nth-of-type(2) {\n    display: none;\n}\n\n.message__disclaimer {\n    font-size: 10px;\n    line-height: 1.1;\n}\n\n@media (max-aspect-ratio: 61/10) and (min-width: 400px) {\n    .message__headline {\n        font-size: 1.5rem;\n        margin-bottom: 0.5rem;\n    }\n\n    .message__disclaimer {\n        font-size: 0.75rem;\n        line-height: 1;\n        padding-right: 8%;\n    }\n}\n\n@media (max-aspect-ratio: 61/10) and (min-width: 520px) {\n    .message__logo-container {\n        flex: 0 0 25%;\n    }\n\n    .message__headline {\n        margin: 0 0 2% 0;\n        font-size: 3.7vw;\n        padding-right: 2%;\n        line-height: 1.1;\n    }\n\n    .message__headline span.multi:nth-of-type(2) {\n        display: inline;\n    }\n\n    .message__headline span.multi:nth-of-type(1) {\n        display: none;\n    }\n\n    .message__disclaimer {\n        font-size: 0.9rem;\n    }\n}\n\n@media (max-aspect-ratio: 61/10) and (min-width: 640px) {\n    .message__headline {\n        font-size: 1.7rem;\n    }\n}\n';
        },
        function(e, n, t) {
            var o = t(12),
                a = t(13),
                i = t(47);
            e.exports =
                !o &&
                !a(function() {
                    return (
                        7 !=
                        Object.defineProperty(i('div'), 'a', {
                            get: function() {
                                return 7;
                            }
                        }).a
                    );
                });
        },
        function(e, n, t) {
            var o = t(8),
                a = t(14),
                i = o.document,
                r = a(i) && a(i.createElement);
            e.exports = function(e) {
                return r ? i.createElement(e) : {};
            };
        },
        function(e, n, t) {
            var o = t(24),
                a = t(18),
                i = t(108),
                r = function(e) {
                    return function(n, t, r) {
                        var s,
                            l = o(n),
                            c = a(l.length),
                            d = i(r, c);
                        if (e && t != t) {
                            for (; c > d; ) if ((s = l[d++]) != s) return !0;
                        } else for (; c > d; d++) if ((e || d in l) && l[d] === t) return e || d || 0;
                        return !e && -1;
                    };
                };
            e.exports = { includes: r(!0), indexOf: r(!1) };
        },
        function(e, n) {
            e.exports = [
                'constructor',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'toLocaleString',
                'toString',
                'valueOf'
            ];
        },
        function(e, n) {
            var t = 0,
                o = Math.random();
            e.exports = function(e) {
                return 'Symbol(' + String(void 0 === e ? '' : e) + ')_' + (++t + o).toString(36);
            };
        },
        function(e, n, t) {
            'use strict';
            var o,
                a,
                i,
                r = t(52),
                s = t(17),
                l = t(15),
                c = t(5),
                d = t(39),
                m = c('iterator'),
                u = !1;
            [].keys && ('next' in (i = [].keys()) ? (a = r(r(i))) !== Object.prototype && (o = a) : (u = !0)),
                null == o && (o = {}),
                d ||
                    l(o, m) ||
                    s(o, m, function() {
                        return this;
                    }),
                (e.exports = { IteratorPrototype: o, BUGGY_SAFARI_ITERATORS: u });
        },
        function(e, n, t) {
            var o = t(15),
                a = t(28),
                i = t(40),
                r = t(119),
                s = i('IE_PROTO'),
                l = Object.prototype;
            e.exports = r
                ? Object.getPrototypeOf
                : function(e) {
                      return (
                          (e = a(e)),
                          o(e, s)
                              ? e[s]
                              : 'function' == typeof e.constructor && e instanceof e.constructor
                              ? e.constructor.prototype
                              : e instanceof Object
                              ? l
                              : null
                      );
                  };
        },
        function(e, n, t) {
            var o = t(26).f,
                a = t(17),
                i = t(15),
                r = t(124),
                s = t(5)('toStringTag'),
                l = r !== {}.toString;
            e.exports = function(e, n, t, c) {
                if (e) {
                    var d = t ? e : e.prototype;
                    i(d, s) || o(d, s, { configurable: !0, value: n }), c && l && a(d, 'toString', r);
                }
            };
        },
        function(e, n, t) {
            var o = t(25),
                a = t(5)('toStringTag'),
                i =
                    'Arguments' ==
                    o(
                        (function() {
                            return arguments;
                        })()
                    );
            e.exports = function(e) {
                var n, t, r;
                return void 0 === e
                    ? 'Undefined'
                    : null === e
                    ? 'Null'
                    : 'string' ==
                      typeof (t = (function(e, n) {
                          try {
                              return e[n];
                          } catch (e) {}
                      })((n = Object(e)), a))
                    ? t
                    : i
                    ? o(n)
                    : 'Object' == (r = o(n)) && 'function' == typeof n.callee
                    ? 'Arguments'
                    : r;
            };
        },
        function(e, n) {
            e.exports = function() {};
        },
        function(e, n, t) {
            var o = t(12),
                a = t(36),
                i = t(24),
                r = t(32).f,
                s = function(e) {
                    return function(n) {
                        for (var t, s = i(n), l = a(s), c = l.length, d = 0, m = []; c > d; )
                            (t = l[d++]), (o && !r.call(s, t)) || m.push(e ? [t, s[t]] : s[t]);
                        return m;
                    };
                };
            e.exports = { entries: s(!0), values: s(!1) };
        },
        function(e, n, t) {
            e.exports = t(142);
        },
        function(e, n, t) {
            e.exports = t(153);
        },
        function(e, n) {
            e.exports =
                '<div class="message" data-pp-message>\n    <div class="message__container">\n        \x3c!-- foreground layer --\x3e\n        <div class="message__foreground"></div>\n\n        \x3c!-- content layer --\x3e\n        <div class="message__content">\n            \x3c!-- PP Credit Logo --\x3e\n            <div class="message__logo-container"></div>\n            \x3c!-- Promotional Messaging --\x3e\n            <div class="message__messaging">\n                <div class="message__promo-container">\n                    <h5 class="message__headline"></h5>\n                    <h6 class="message__sub-headline"></h6>\n                </div>\n                <p class="message__disclaimer"></p>\n            </div>\n        </div>\n\n        \x3c!-- background layer --\x3e\n        <div class="message__background"></div>\n    </div>\n</div>\n';
        },
        function(e, n) {
            e.exports =
                '\x3c!-- Click tracking URL --\x3e\n<a class="pp-legacy__link" target="_blank" data-pp-message></a>\n\x3c!-- Impression tracking URL --\x3e\n<img class="pp-legacy__pixel" style="display:none!important" />\n';
        },
        function(e, n) {
            e.exports =
                '.message {\n    display: block;\n    width: 100%;\n    color: #2c2e2f;\n    cursor: pointer;\n}\n\n.message__container {\n    min-width: 100%;\n}\n\n.message__content {\n    display: inline-flex;\n    align-items: center;\n    min-width: 100%;\n}\n\n.message__logo-container {\n    flex: 0 0 auto;\n    width: 70px;\n    margin-right: 0.8rem;\n}\n\n.message__messaging {\n    line-height: 1.3;\n    white-space: normal;\n    margin-right: 0.8rem;\n}\n\n.message__messaging span.br {\n    white-space: nowrap;\n}\n\n.message__promo-container {\n    display: inline;\n}\n\n.message__headline {\n    display: inline;\n    font-weight: 400;\n    font-size: 12px;\n}\n\n.message__sub-headline {\n    display: none;\n}\n\n.message__disclaimer {\n    display: inline;\n    white-space: nowrap;\n    font-size: 12px;\n    font-weight: 400;\n    line-height: 16px;\n}\n\n.message__disclaimer > span {\n    color: #0076ff;\n    text-decoration: underline;\n}\n\n/* For non-US NI disclaimer */\n.message__disclaimer > span.multi:first-of-type {\n    color: #2c2e2f;\n    text-decoration: none;\n}\n';
        },
        function(e, n) {
            e.exports = '.message__messaging {\n    max-width: 375px;\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message__messaging {\n    white-space: nowrap;\n    flex: 0 0 auto;\n}\n\n.message__logo-container {\n    width: 120px;\n}\n\n.message__headline span:only-child {\n    white-space: nowrap;\n}\n';
        },
        function(e, n) {
            e.exports = '.message__headline > span:last-of-type {\n    display: inline-block;\n}\n';
        },
        function(e, n) {
            e.exports = '.message__logo-container {\n    order: 2;\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message__content {\n    display: inline-block;\n    /* IE does not like flex-direction: column;\n    flex-direction: column;\n    align-items: flex-start; */\n}\n\n.message__logo-container {\n    max-width: 120px;\n    margin: 0 0 0.2rem 0;\n}\n';
        },
        function(e, n) {
            e.exports = '.message__messaging {\n    white-space: normal;\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message {\n    color: white;\n}\n\n.message__headline {\n    color: white;\n}\n\n.message__disclaimer span {\n    color: white;\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message {\n    cursor: pointer;\n}\n\n.message .br {\n    display: inline-block;\n}\n\n.message .em {\n    font-family: PayPal-Sans-Big, PayPal-Sans;\n    font-weight: 400;\n}\n\n.message__container,\n.message__foreground,\n.message__content,\n.message__background {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n}\n\n.message__headline,\n.message__sub-headline,\n.message__disclaimer {\n    font-family: PayPal-Sans;\n    font-weight: 300;\n}\n\n.message__headline {\n    font-family: PayPal-Sans-Big, PayPal-Sans;\n    font-weight: 400;\n}\n.message__headline .weak {\n    font-family: PayPal-Sans;\n    font-weight: 300;\n}\n\n.message__disclaimer > span:not(.multi),\n.message__disclaimer > span.multi:last-of-type {\n    font-weight: 300;\n    text-decoration: underline;\n    white-space: nowrap;\n}\n\n.message__background {\n    z-index: -1;\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message__content {\n    padding: 7%;\n}\n\n.message__logo-container {\n    width: 50%;\n    margin-bottom: 7%;\n}\n\n.message__headline {\n    font-size: 11vw;\n    line-height: 1.1em;\n    font-size: 12vw;\n}\n\n.message__headline span.multi:nth-of-type(2) {\n    display: none;\n}\n\n.message__disclaimer {\n    position: absolute;\n    width: 80%;\n    bottom: 7%;\n    font-size: 10px;\n}\n\n@media (min-width: 150px) {\n    .message__headline {\n        font-size: 9vw;\n        line-height: 1.2em;\n    }\n\n    .message__headline span.multi:nth-of-type(2) {\n        display: inline;\n    }\n\n    .message__headline span.multi:nth-of-type(1) {\n        display: none;\n    }\n}\n\n@media (min-width: 220px) {\n    .message__content {\n        padding: 10%;\n    }\n\n    .message__logo-container {\n        width: 40%;\n        margin-bottom: 10%;\n    }\n\n    .message__headline {\n        font-size: 8vw;\n    }\n\n    .message__disclaimer {\n        font-size: 4.5vw;\n        bottom: 10%;\n    }\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message__content {\n    padding: 8%;\n}\n\n.message__logo-container {\n    width: 70%;\n    margin-bottom: 12%;\n}\n\n.message__headline {\n    font-size: 1.1rem;\n    line-height: 1.3em;\n    margin-bottom: 24%;\n}\n\n.message__sub-headline {\n    font-size: 1.1rem;\n    line-height: 1.3em;\n    margin-bottom: 40%;\n    margin-bottom: 24%;\n}\n\n.message__disclaimer {\n    position: absolute;\n    bottom: 4%;\n    font-size: 0.75rem;\n}\n\n.message__disclaimer span.multi:nth-of-type(1) {\n    display: none;\n}\n\n@media (max-aspect-ratio: 11/40) {\n    .message__logo-container {\n        margin: 15% 0 30%;\n    }\n\n    .message__disclaimer {\n        position: static;\n    }\n\n    .message__disclaimer span.multi:nth-of-type(1) {\n        display: inline;\n    }\n\n    .message__disclaimer span.multi:nth-of-type(1).tag--xlarge {\n        margin-bottom: 40%;\n        display: block;\n    }\n\n    .message__disclaimer span.multi:nth-of-type(2) {\n        display: block;\n    }\n}\n';
        },
        function(e, n) {
            e.exports =
                '@media (min-aspect-ratio: 80/11) {\n    .message__headline span.multi:nth-of-type(2),\n    .message__headline span.multi:nth-of-type(1) {\n        display: none;\n    }\n\n    .message__disclaimer {\n        font-size: 0.625rem;\n    }\n\n    .message__logo-container {\n        flex: 0 0 22%;\n    }\n}\n\n@media (min-aspect-ratio: 80/11) and (min-width: 240px) {\n    .message__messaging {\n        line-height: 0.9;\n    }\n\n    .message__headline {\n        font-size: 4vw;\n        line-height: 1.1;\n    }\n\n    .message__headline span.multi:nth-of-type(1) {\n        display: inline;\n    }\n\n    .message__disclaimer {\n        padding-right: 10%;\n    }\n}\n\n@media (min-aspect-ratio: 80/11) and (min-width: 280px) {\n    .message__disclaimer {\n        padding-right: 2%;\n    }\n}\n\n@media (min-aspect-ratio: 80/11) and (min-width: 360px) {\n    .message__messaging {\n        line-height: 1;\n    }\n\n    .message__disclaimer {\n        font-size: 0.75rem;\n    }\n}\n\n/*IE specific*/\n@media (min-aspect-ratio: 80/11) and (-ms-high-contrast: none) and (min-width: 360px) {\n    .message__disclaimer {\n        line-height: 1;\n    }\n}\n\n@media (min-aspect-ratio: 80/11) and (min-width: 500px) {\n    .message__headline {\n        font-size: 3vw;\n        padding-right: 12%;\n        margin: 0 0 1% 0;\n    }\n\n    .message__headline span.multi:nth-of-type(2) {\n        display: inline;\n    }\n\n    .message__headline span.multi:nth-of-type(1) {\n        display: none;\n    }\n\n    .message__disclaimer {\n        font-size: 0.75rem;\n    }\n}\n\n@media (min-aspect-ratio: 80/11) and (min-width: 600px) {\n    .message__disclaimer {\n        font-size: 0.9rem;\n    }\n}\n\n/*IE specific*/\n@media (min-aspect-ratio: 80/11) and (-ms-high-contrast: none) and (min-width: 500px) {\n    .message__disclaimer {\n        font-size: 2vw;\n        line-height: 1.6em;\n    }\n}\n';
        },
        function(e, n) {
            e.exports =
                '@media (min-aspect-ratio: 200/11) {\n    .message__logo-container {\n        flex: 1 0 25%;\n    }\n\n    .message__logo {\n        width: 40%;\n    }\n\n    .message__messaging {\n        flex: 1 1 85%;\n        flex-direction: row;\n        justify-content: center;\n        align-items: center;\n    }\n\n    .message__headline {\n        flex: 1 1 60%;\n        font-size: 0.9rem;\n        line-height: 1;\n        margin: 0;\n    }\n\n    .message__disclaimer {\n        flex: 0 0 auto;\n        width: auto;\n        max-width: 12rem;\n        padding: 0;\n        font-size: 1.9vw;\n        line-height: 1.1;\n    }\n}\n\n@media (min-aspect-ratio: 200/11) and (min-width: 400px) {\n    .message__headline {\n        font-size: 1rem;\n    }\n}\n\n@media (min-aspect-ratio: 200/11) and (min-width: 500px) {\n    .message__disclaimer {\n        font-size: 0.625rem;\n    }\n}\n\n@media (min-aspect-ratio: 200/11) and (min-width: 600px) {\n    .message__logo-container {\n        flex: 1 0 10%;\n    }\n\n    .message__logo {\n        width: 60%;\n    }\n\n    .message__headline {\n        font-size: 1.8vw;\n    }\n\n    .message__headline span.multi:nth-of-type(2) {\n        display: inline;\n    }\n\n    .message__headline span.multi:nth-of-type(1) {\n        display: none;\n    }\n\n    .message__disclaimer {\n        padding-right: 1rem;\n        font-size: 0.75rem;\n        line-height: 1.2;\n    }\n}\n\n@media (min-aspect-ratio: 200/11) and (min-width: 1000px) {\n    .message__disclaimer {\n        font-size: 0.9rem;\n        max-width: 14rem;\n    }\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message__content {\n    color: white;\n}\n\n.message__background {\n    background: linear-gradient(-55deg, #009cde -20%, #003087 80%);\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message__content {\n    color: #0070ba;\n}\n\n.message__background {\n    background: #eaeced;\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message__content {\n    color: white;\n}\n\n.message__background {\n    background: #2c2e2f;\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message__content {\n    color: #009cde;\n    border: 1px solid #009cde;\n}\n\n.message__background {\n    background: #ffffff;\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message__content {\n    color: #009cde;\n}\n\n.message__background {\n    background: #ffffff;\n}\n';
        },
        function(e, n) {
            e.exports = '.message__background {\n    background: linear-gradient(-10deg, #009cde, #003087 90%);\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message {\n    max-width: 100%;\n    min-width: 120px;\n}\n\n.message__logo-container {\n    height: 108px;\n}\n\n.message__messaging {\n    padding: 0 8% 5%;\n}\n\n.message__headline {\n    font-size: 16px;\n    margin-bottom: 30px;\n    line-height: 1.1em;\n}\n.message__headline .em {\n    margin-right: 0;\n    display: block;\n}\n\n.message__sub-headline {\n    font-size: 15px;\n    margin-bottom: 40px;\n    color: #009cde;\n}\n\n.message__disclaimer .em {\n    color: #666666;\n    display: block;\n}\n\n@media (max-width: 160px) {\n    .message__headline {\n        margin-bottom: 16px;\n    }\n\n    .message__sub-headline {\n        margin-bottom: 16px;\n    }\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message {\n    max-width: 100%;\n}\n\n.message__messaging {\n    padding: 0.5% 1% 0;\n}\n\n.message__logo {\n    max-width: unset;\n    max-height: 125%;\n}\n\n.message__logo-container {\n    width: 28%;\n    padding-right: 5%;\n}\n\n.message__messaging {\n    width: 70%;\n}\n\n.message__headline {\n    font-size: 15px;\n    margin-bottom: 6px;\n}\n\n.message__sub-headline {\n    font-size: 13px;\n    color: #009cde;\n    margin-bottom: 5px;\n}\n\n.message__disclaimer {\n    font-size: 10px;\n    margin-bottom: 3px;\n}\n\n.message__disclaimer .em {\n    color: #666666;\n}\n\n@media (max-width: 290px) {\n    .message__headline {\n        font-size: 13px;\n    }\n\n    .message__sub-headline {\n        font-size: 11px;\n    }\n\n    .message__disclaimer {\n        font-size: 9px;\n    }\n}\n\n@media (max-width: 200px) {\n    .message__logo {\n        max-width: 65%;\n    }\n\n    .message__logo-container {\n        position: relative;\n        width: 100%;\n        height: auto;\n        float: none;\n        padding-top: 5px;\n    }\n\n    .message__messaging {\n        width: 100%;\n        float: none;\n        padding: 2% 5% 5%;\n    }\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message {\n    min-width: 160px;\n    max-width: 100%;\n}\n\n.message__logo {\n    max-width: 60%;\n}\n\n.message__logo-container {\n    width: 23%;\n}\n\n.message__messaging {\n    width: 77%;\n    padding: 6px 1% 0;\n    margin-bottom: 3px;\n}\n\n.message__promo-container {\n    display: inline;\n}\n\n.message__headline {\n    display: block;\n    margin-bottom: 6px;\n}\n\n.message__sub-headline {\n    display: inline;\n    color: #009cde;\n}\n\n.message__disclaimer {\n    display: inline;\n}\n\n.message__disclaimer em {\n    display: inline-block;\n}\n\n@media (max-width: 570px) {\n    .message__logo {\n        max-width: 70%;\n    }\n\n    .message__headline {\n        font-size: 13px;\n        margin-bottom: 3px;\n    }\n\n    .message__sub-headline {\n        font-size: 12px;\n    }\n\n    .message__disclaimer {\n        font-size: 9px;\n    }\n\n    .message__disclaimer em::after {\n        height: 8px;\n    }\n}\n\n@media (max-width: 440px) {\n    .message__logo {\n        max-width: 75%;\n    }\n\n    .message__headline {\n        font-size: 11px;\n        margin-bottom: 2px;\n    }\n\n    .message__sub-headline {\n        font-size: 10px;\n    }\n}\n\n@media (max-width: 340px) {\n    .message__messaging {\n        padding-top: 2px;\n    }\n}\n\n@media (max-width: 250px) {\n    .message__logo {\n        max-width: 50%;\n    }\n\n    .message__logo-container {\n        float: none;\n        position: relative;\n        height: auto;\n        width: 100%;\n    }\n\n    .message__messaging {\n        float: none;\n        width: 100%;\n        padding: 5% 5% 3%;\n        margin-bottom: 6px;\n    }\n\n    .message__headline {\n        font-size: 12px;\n        margin-bottom: 6px;\n    }\n\n    .message__sub-headline {\n        font-size: 11px;\n    }\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message {\n    max-width: 100%;\n    min-width: 180px;\n}\n\n.message__logo-container {\n    width: 28%;\n}\n\n.message__messaging {\n    width: 70%;\n    line-height: 0;\n    padding: 0.5% 1.5% 0 1.5%;\n}\n\n.message__promo-container {\n    margin: 2px 0;\n}\n\n.message__headline {\n    display: inline;\n    font-size: 12.5px;\n    line-height: 13px;\n}\n\n.message__headline .em {\n    margin-right: 0;\n}\n\n.message__headline .weak {\n    font-weight: bold;\n}\n\n.message__sub-headline {\n    display: inline;\n    font-size: 12px;\n    color: #009cde;\n    line-height: 13px;\n}\n\n.message__disclaimer {\n    margin-bottom: 2px;\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message {\n    min-width: 200px;\n    max-width: 100%;\n}\n\n.message__logo-container {\n    width: 23%;\n}\n\n.message__messaging {\n    width: 74%;\n    padding: 2% 2% 0 1%;\n}\n\n.message__headline {\n    margin-bottom: 3px;\n}\n\n.message__headline .weak {\n    font-weight: bold;\n}\n\n.message__sub-headline {\n    margin-bottom: 2px;\n    color: #009cde;\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message {\n    min-width: 160px;\n    min-height: 36px;\n    max-width: 100%;\n}\n\n.message__container {\n    min-height: 36px;\n}\n\n.message__logo {\n    max-width: 80px;\n    max-height: unset;\n}\n\n.message__logo-container {\n    width: 20%;\n}\n\n.message__messaging {\n    width: 77%;\n    padding: 5px 2.5% 2px 0.5%;\n    line-height: 0;\n}\n\n.message__messaging > * {\n    line-height: 1em;\n}\n\n.message__promo-container {\n    display: inline;\n}\n\n.message__headline {\n    display: inline;\n}\n\n.message__sub-headline {\n    display: inline;\n    color: #767676;\n}\n\n.message__disclaimer {\n    display: inline;\n}\n\n@media (max-width: 800px) {\n    .message__messaging {\n        padding-top: 2px;\n    }\n\n    .message__disclaimer {\n        display: inline-block;\n    }\n}\n\n@media (max-width: 570px) {\n    .message__headline {\n        font-size: 13px;\n    }\n\n    .message__sub-headline {\n        font-size: 12px;\n    }\n\n    .message__disclaimer .em::after {\n        height: 8px;\n    }\n\n    .message__disclaimer {\n        font-size: 9px;\n    }\n}\n\n@media (max-width: 440px) {\n    .message__logo {\n        max-width: 90%;\n    }\n}\n\n@media (max-width: 250px) {\n    .message__logo {\n        max-width: 50%;\n    }\n\n    .message__logo-container {\n        float: none;\n        position: relative;\n        height: auto;\n        width: 100%;\n        padding: 5px 0;\n    }\n\n    .message__messaging {\n        float: none;\n        width: 100%;\n        padding: 3% 5%;\n        margin-bottom: 6px;\n    }\n\n    .message__headline {\n        display: block;\n        font-size: 12px;\n        margin-bottom: 6px;\n    }\n\n    .message__sub-headline {\n        display: block;\n        font-size: 11px;\n        margin-bottom: 6px;\n    }\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message {\n    min-width: 118px;\n}\n\n.message__messaging {\n    padding: 5px 3px 0 3px;\n}\n\n.message__headline {\n    font-size: 10px;\n    margin-bottom: 4px;\n}\n\n.message__sub-headline {\n    font-size: 9px;\n}\n\n.message__disclaimer {\n    font-size: 8px;\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message__logo-container {\n    width: 35%;\n}\n\n.message__messaging {\n    width: 65%;\n    padding: 2px 5px;\n    line-height: 0;\n}\n\n.message__promo-container {\n    display: inline;\n    line-height: 0;\n}\n\n.message__headline {\n    font-size: 12px;\n    margin-bottom: 4px;\n    display: block;\n}\n\n.message__sub-headline {\n    font-size: 8px;\n    display: inline;\n}\n\n.message__disclaimer {\n    font-size: 7px;\n    display: inline;\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message__logo {\n    max-width: 40%;\n}\n\n.message__logo-container {\n    height: 85px;\n}\n\n.message__logo-container::before {\n    height: 130%;\n    transform: skewY(5deg);\n}\n\n.message__messaging {\n    margin-top: 20px;\n    padding: 0 20px;\n}\n\n.message__headline {\n    font-size: 24px;\n    margin-bottom: 5px;\n}\n\n.message__sub-headline {\n    font-size: 11px;\n    line-height: 15px;\n}\n\n.message__disclaimer {\n    font-size: 8px;\n}\n\n.message__disclaimer .em {\n    display: inline;\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message__logo-container {\n    width: 23%;\n}\n\n.message__messaging {\n    width: 75%;\n    padding: 1px 0;\n    line-height: 0;\n}\n\n.message__promo-container {\n    display: inline;\n    line-height: 0;\n}\n\n.message__headline {\n    font-size: 10px;\n}\n\n.message__sub-headline {\n    display: inline;\n    color: #009cde;\n    font-size: 10px;\n}\n\n.message__disclaimer {\n    display: inline;\n    font-size: 9px;\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message__messaging {\n    padding: 0.5% 1% 0%;\n    width: 76%;\n}\n\n.message__logo-container {\n    width: 23%;\n}\n\n.message__headline {\n    font-size: 12px;\n    margin-bottom: 5px;\n}\n\n.message__sub-headline {\n    font-size: 11px;\n    color: #009cde;\n    margin-bottom: 4px;\n}\n\n.message__disclaimer {\n    font-size: 9px;\n    margin-bottom: 2px;\n}\n\n@media (max-width: 290px) {\n    .message__messaging {\n        margin-left: 3%;\n        width: 74%;\n    }\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message__logo-container {\n    width: 23%;\n}\n\n.message__messaging {\n    width: 75%;\n    padding: 4px 0;\n}\n\n.message__headline {\n    font-size: 16px;\n    margin-bottom: 2px;\n}\n\n.message__sub-headline {\n    font-size: 10px;\n}\n\n.message__disclaimer {\n    font-size: 8px;\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message__logo {\n    max-width: 60%;\n}\n\n.message__logo-container {\n    width: 30%;\n    padding-right: 25px;\n}\n\n.message__messaging {\n    width: 68%;\n    padding: 6px 0;\n}\n\n.message__headline {\n    font-size: 28px;\n    margin-bottom: 8px;\n}\n\n.message__sub-headline {\n    font-size: 12px;\n    margin-bottom: 8px;\n}\n\n.message__disclaimer {\n    font-size: 9px;\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message__logo-container {\n    width: 175px;\n}\n\n.message__messaging {\n    width: 335px;\n    padding: 30px 30px 20px 0;\n}\n\n.message__headline {\n    font-size: 26px;\n    line-height: 1.3em;\n    padding-bottom: 10px;\n}\n\n.message__sub-headline {\n    font-size: 13px;\n    line-height: 20px;\n    padding-bottom: 10px;\n}\n\n.message__disclaimer {\n    font-size: 9px;\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message__messaging {\n    padding: 3px;\n}\n\n.message__headline {\n    font-size: 13px;\n    margin-bottom: 2px;\n}\n\n.message__sub-headline {\n    font-size: 9px;\n    line-height: 13px;\n    margin-bottom: 3px;\n}\n\n.message__disclaimer {\n    font-size: 8px;\n    line-height: 10px;\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message__messaging {\n    float: none;\n}\n\n.message__logo {\n    max-width: 90%;\n}\n\n.message__logo-container {\n    width: 100%;\n    float: none;\n    position: relative;\n}\n\n.message__disclaimer .em {\n    display: block;\n    margin-left: 0;\n}\n';
        },
        function(e, n) {
            e.exports =
                ".message__logo-container {\n    padding: 0 2% 0 0;\n}\n\n.message__logo-container::before,\n.message__logo-container::after {\n    content: '';\n    position: absolute;\n    top: 0;\n    background-color: #003087;\n    transform: skewX(-9deg);\n}\n\n.message__logo-container::before {\n    height: 101%;\n    width: 105%;\n    left: -15%;\n}\n\n.message__logo-container::after {\n    height: 70%;\n    width: 160%;\n    left: -70%;\n}\n";
        },
        function(e, n) {
            e.exports =
                '.message__logo-container::before {\n    height: 120%;\n    width: 100%;\n    transform: skewY(9deg);\n    top: 0;\n    left: 0;\n    top: -30%;\n}\n';
        },
        function(e, n) {
            e.exports =
                ".message__disclaimer .em::after {\n    content: '';\n    background: transparent url(https://www.paypalobjects.com/webstatic/en_US/easypmnts/linker.jpg) no-repeat center top;\n    background-size: contain;\n    width: 15px;\n    height: 11px;\n    display: inline-block;\n    position: relative;\n    margin-bottom: -2px;\n}\n";
        },
        function(e, n) {
            e.exports =
                ".message {\n    overflow: hidden;\n    min-width: 150px;\n}\n\n.message * {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\n.message__logo--svg {\n    position: relative;\n}\n\n.message__logo--svg img {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n}\n\n.message__logo--svg canvas {\n    display: block;\n    width: 100%;\n    visibility: hidden;\n}\n\n.message img {\n    display: block;\n    width: 100%;\n    height: 100%;\n}\n\n.message__container {\n    border: 1px solid #003087;\n    position: relative;\n}\n\n.message__content {\n    width: auto;\n    font-family: 'HelveticaNeueW02-65Medi', 'Helvetica Neue-Thin', Helvetica, Arial, 'Lucida Grande', sans-serif;\n    overflow: hidden;\n}\n\n.message__messaging {\n    padding: 0;\n    float: right;\n    text-align: left;\n}\n\n.message__logo {\n    z-index: 1;\n    height: auto;\n    width: 80%;\n}\n\n.message__logo-container {\n    position: absolute;\n    float: left;\n    padding: 10px 5px;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n.message__logo-container img {\n    z-index: 1;\n}\n\n.message__headline {\n    color: #003087;\n    font-weight: bold;\n    font-size: 14px;\n    line-height: 1em;\n}\n\n.message__headline .weak {\n    font-weight: normal;\n}\n\n.message__sub-headline {\n    color: #767676;\n    font-weight: 400;\n    font-size: 13px;\n    line-height: 1em;\n}\n\n.message__disclaimer {\n    color: #767676;\n    font-size: 11px;\n    line-height: 1em;\n}\n\n.message__disclaimer .em {\n    color: #003087;\n    text-decoration: underline;\n    display: inline-block;\n    font-style: normal;\n}\n";
        },
        function(e, n) {
            e.exports =
                '* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\n.message__logo--svg {\n    position: relative;\n}\n\n.message__logo--svg img {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n}\n.message__logo--svg canvas {\n    display: block;\n    width: 100%;\n    visibility: hidden;\n}\n';
        },
        function(e, n, t) {
            t(102);
            var o = t(16);
            e.exports = o.Object.assign;
        },
        function(e, n, t) {
            var o = t(4),
                a = t(106);
            o({ target: 'Object', stat: !0, forced: Object.assign !== a }, { assign: a });
        },
        function(e, n, t) {
            var o = t(12),
                a = t(32),
                i = t(23),
                r = t(24),
                s = t(34),
                l = t(15),
                c = t(46),
                d = Object.getOwnPropertyDescriptor;
            n.f = o
                ? d
                : function(e, n) {
                      if (((e = r(e)), (n = s(n, !0)), c))
                          try {
                              return d(e, n);
                          } catch (e) {}
                      if (l(e, n)) return i(!a.f.call(e, n), e[n]);
                  };
        },
        function(e, n, t) {
            var o = t(13),
                a = /#|\.prototype\./,
                i = function(e, n) {
                    var t = s[r(e)];
                    return t == c || (t != l && ('function' == typeof n ? o(n) : !!n));
                },
                r = (i.normalize = function(e) {
                    return String(e)
                        .replace(a, '.')
                        .toLowerCase();
                }),
                s = (i.data = {}),
                l = (i.NATIVE = 'N'),
                c = (i.POLYFILL = 'P');
            e.exports = i;
        },
        function(e, n) {
            e.exports = function(e) {
                if ('function' != typeof e) throw TypeError(String(e) + ' is not a function');
                return e;
            };
        },
        function(e, n, t) {
            'use strict';
            var o = t(12),
                a = t(13),
                i = t(36),
                r = t(109),
                s = t(32),
                l = t(28),
                c = t(33),
                d = Object.assign;
            e.exports =
                !d ||
                a(function() {
                    var e = {},
                        n = {},
                        t = Symbol();
                    return (
                        (e[t] = 7),
                        'abcdefghijklmnopqrst'.split('').forEach(function(e) {
                            n[e] = e;
                        }),
                        7 != d({}, e)[t] || 'abcdefghijklmnopqrst' != i(d({}, n)).join('')
                    );
                })
                    ? function(e, n) {
                          for (var t = l(e), a = arguments.length, d = 1, m = r.f, u = s.f; a > d; )
                              for (
                                  var p, g = c(arguments[d++]), f = m ? i(g).concat(m(g)) : i(g), h = f.length, y = 0;
                                  h > y;

                              )
                                  (p = f[y++]), (o && !u.call(g, p)) || (t[p] = g[p]);
                          return t;
                      }
                    : d;
        },
        function(e, n, t) {
            var o = t(15),
                a = t(24),
                i = t(48).indexOf,
                r = t(37);
            e.exports = function(e, n) {
                var t,
                    s = a(e),
                    l = 0,
                    c = [];
                for (t in s) !o(r, t) && o(s, t) && c.push(t);
                for (; n.length > l; ) o(s, (t = n[l++])) && (~i(c, t) || c.push(t));
                return c;
            };
        },
        function(e, n, t) {
            var o = t(27),
                a = Math.max,
                i = Math.min;
            e.exports = function(e, n) {
                var t = o(e);
                return t < 0 ? a(t + n, 0) : i(t, n);
            };
        },
        function(e, n) {
            n.f = Object.getOwnPropertySymbols;
        },
        function(e, n, t) {
            t(111), t(128);
            var o = t(16);
            e.exports = o.Array.from;
        },
        function(e, n, t) {
            'use strict';
            var o = t(112).charAt,
                a = t(113),
                i = t(117),
                r = a.set,
                s = a.getterFor('String Iterator');
            i(
                String,
                'String',
                function(e) {
                    r(this, { type: 'String Iterator', string: String(e), index: 0 });
                },
                function() {
                    var e,
                        n = s(this),
                        t = n.string,
                        a = n.index;
                    return a >= t.length
                        ? { value: void 0, done: !0 }
                        : ((e = o(t, a)), (n.index += e.length), { value: e, done: !1 });
                }
            );
        },
        function(e, n, t) {
            var o = t(27),
                a = t(9),
                i = function(e) {
                    return function(n, t) {
                        var i,
                            r,
                            s = String(a(n)),
                            l = o(t),
                            c = s.length;
                        return l < 0 || l >= c
                            ? e
                                ? ''
                                : void 0
                            : (i = s.charCodeAt(l)) < 55296 ||
                              i > 56319 ||
                              l + 1 === c ||
                              (r = s.charCodeAt(l + 1)) < 56320 ||
                              r > 57343
                            ? e
                                ? s.charAt(l)
                                : i
                            : e
                            ? s.slice(l, l + 2)
                            : r - 56320 + ((i - 55296) << 10) + 65536;
                    };
                };
            e.exports = { codeAt: i(!1), charAt: i(!0) };
        },
        function(e, n, t) {
            var o,
                a,
                i,
                r = t(114),
                s = t(8),
                l = t(14),
                c = t(17),
                d = t(15),
                m = t(40),
                u = t(37);
            if (r) {
                var p = new (0, s.WeakMap)(),
                    g = p.get,
                    f = p.has,
                    h = p.set;
                (o = function(e, n) {
                    return h.call(p, e, n), n;
                }),
                    (a = function(e) {
                        return g.call(p, e) || {};
                    }),
                    (i = function(e) {
                        return f.call(p, e);
                    });
            } else {
                var y = m('state');
                (u[y] = !0),
                    (o = function(e, n) {
                        return c(e, y, n), n;
                    }),
                    (a = function(e) {
                        return d(e, y) ? e[y] : {};
                    }),
                    (i = function(e) {
                        return d(e, y);
                    });
            }
            e.exports = {
                set: o,
                get: a,
                has: i,
                enforce: function(e) {
                    return i(e) ? a(e) : o(e, {});
                },
                getterFor: function(e) {
                    return function(n) {
                        var t;
                        if (!l(n) || (t = a(n)).type !== e)
                            throw TypeError('Incompatible receiver, ' + e + ' required');
                        return t;
                    };
                }
            };
        },
        function(e, n, t) {
            var o = t(8),
                a = t(115),
                i = o.WeakMap;
            e.exports = 'function' == typeof i && /native code/.test(a.call(i));
        },
        function(e, n, t) {
            var o = t(38);
            e.exports = o('native-function-to-string', Function.toString);
        },
        function(e, n, t) {
            var o = t(8),
                a = t(17);
            e.exports = function(e, n) {
                try {
                    a(o, e, n);
                } catch (t) {
                    o[e] = n;
                }
                return n;
            };
        },
        function(e, n, t) {
            'use strict';
            var o = t(4),
                a = t(118),
                i = t(52),
                r = t(125),
                s = t(53),
                l = t(17),
                c = t(127),
                d = t(5),
                m = t(39),
                u = t(29),
                p = t(51),
                g = p.IteratorPrototype,
                f = p.BUGGY_SAFARI_ITERATORS,
                h = d('iterator'),
                y = function() {
                    return this;
                };
            e.exports = function(e, n, t, d, p, _, w) {
                a(t, n, d);
                var x,
                    v,
                    b,
                    R = function(e) {
                        if (e === p && I) return I;
                        if (!f && e in P) return P[e];
                        switch (e) {
                            case 'keys':
                            case 'values':
                            case 'entries':
                                return function() {
                                    return new t(this, e);
                                };
                        }
                        return function() {
                            return new t(this);
                        };
                    },
                    A = n + ' Iterator',
                    E = !1,
                    P = e.prototype,
                    O = P[h] || P['@@iterator'] || (p && P[p]),
                    I = (!f && O) || R(p),
                    T = ('Array' == n && P.entries) || O;
                if (
                    (T &&
                        ((x = i(T.call(new e()))),
                        g !== Object.prototype &&
                            x.next &&
                            (m || i(x) === g || (r ? r(x, g) : 'function' != typeof x[h] && l(x, h, y)),
                            s(x, A, !0, !0),
                            m && (u[A] = y))),
                    'values' == p &&
                        O &&
                        'values' !== O.name &&
                        ((E = !0),
                        (I = function() {
                            return O.call(this);
                        })),
                    (m && !w) || P[h] === I || l(P, h, I),
                    (u[n] = I),
                    p)
                )
                    if (((v = { values: R('values'), keys: _ ? I : R('keys'), entries: R('entries') }), w))
                        for (b in v) (!f && !E && b in P) || c(P, b, v[b]);
                    else o({ target: n, proto: !0, forced: f || E }, v);
                return v;
            };
        },
        function(e, n, t) {
            'use strict';
            var o = t(51).IteratorPrototype,
                a = t(121),
                i = t(23),
                r = t(53),
                s = t(29),
                l = function() {
                    return this;
                };
            e.exports = function(e, n, t) {
                var c = n + ' Iterator';
                return (e.prototype = a(o, { next: i(1, t) })), r(e, c, !1, !0), (s[c] = l), e;
            };
        },
        function(e, n, t) {
            var o = t(13);
            e.exports = !o(function() {
                function e() {}
                return (e.prototype.constructor = null), Object.getPrototypeOf(new e()) !== e.prototype;
            });
        },
        function(e, n, t) {
            var o = t(13);
            e.exports =
                !!Object.getOwnPropertySymbols &&
                !o(function() {
                    return !String(Symbol());
                });
        },
        function(e, n, t) {
            var o = t(20),
                a = t(122),
                i = t(49),
                r = t(37),
                s = t(123),
                l = t(47),
                c = t(40)('IE_PROTO'),
                d = function() {},
                m = function() {
                    var e,
                        n = l('iframe'),
                        t = i.length;
                    for (
                        n.style.display = 'none',
                            s.appendChild(n),
                            n.src = String('javascript:'),
                            (e = n.contentWindow.document).open(),
                            e.write('<script>document.F=Object</script>'),
                            e.close(),
                            m = e.F;
                        t--;

                    )
                        delete m.prototype[i[t]];
                    return m();
                };
            (e.exports =
                Object.create ||
                function(e, n) {
                    var t;
                    return (
                        null !== e
                            ? ((d.prototype = o(e)), (t = new d()), (d.prototype = null), (t[c] = e))
                            : (t = m()),
                        void 0 === n ? t : a(t, n)
                    );
                }),
                (r[c] = !0);
        },
        function(e, n, t) {
            var o = t(12),
                a = t(26),
                i = t(20),
                r = t(36);
            e.exports = o
                ? Object.defineProperties
                : function(e, n) {
                      i(e);
                      for (var t, o = r(n), s = o.length, l = 0; s > l; ) a.f(e, (t = o[l++]), n[t]);
                      return e;
                  };
        },
        function(e, n, t) {
            var o = t(41);
            e.exports = o('document', 'documentElement');
        },
        function(e, n, t) {
            'use strict';
            var o = t(54),
                a = {};
            (a[t(5)('toStringTag')] = 'z'),
                (e.exports =
                    '[object z]' !== String(a)
                        ? function() {
                              return '[object ' + o(this) + ']';
                          }
                        : a.toString);
        },
        function(e, n, t) {
            var o = t(20),
                a = t(126);
            e.exports =
                Object.setPrototypeOf ||
                ('__proto__' in {}
                    ? (function() {
                          var e,
                              n = !1,
                              t = {};
                          try {
                              (e = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set).call(t, []),
                                  (n = t instanceof Array);
                          } catch (e) {}
                          return function(t, i) {
                              return o(t), a(i), n ? e.call(t, i) : (t.__proto__ = i), t;
                          };
                      })()
                    : void 0);
        },
        function(e, n, t) {
            var o = t(14);
            e.exports = function(e) {
                if (!o(e) && null !== e) throw TypeError("Can't set " + String(e) + ' as a prototype');
                return e;
            };
        },
        function(e, n, t) {
            var o = t(17);
            e.exports = function(e, n, t, a) {
                a && a.enumerable ? (e[n] = t) : o(e, n, t);
            };
        },
        function(e, n, t) {
            var o = t(4),
                a = t(129);
            o(
                {
                    target: 'Array',
                    stat: !0,
                    forced: !t(134)(function(e) {
                        Array.from(e);
                    })
                },
                { from: a }
            );
        },
        function(e, n, t) {
            'use strict';
            var o = t(35),
                a = t(28),
                i = t(130),
                r = t(131),
                s = t(18),
                l = t(132),
                c = t(133);
            e.exports = function(e) {
                var n,
                    t,
                    d,
                    m,
                    u = a(e),
                    p = 'function' == typeof this ? this : Array,
                    g = arguments.length,
                    f = g > 1 ? arguments[1] : void 0,
                    h = void 0 !== f,
                    y = 0,
                    _ = c(u);
                if ((h && (f = o(f, g > 2 ? arguments[2] : void 0, 2)), null == _ || (p == Array && r(_))))
                    for (t = new p((n = s(u.length))); n > y; y++) l(t, y, h ? f(u[y], y) : u[y]);
                else
                    for (m = _.call(u), t = new p(); !(d = m.next()).done; y++)
                        l(t, y, h ? i(m, f, [d.value, y], !0) : d.value);
                return (t.length = y), t;
            };
        },
        function(e, n, t) {
            var o = t(20);
            e.exports = function(e, n, t, a) {
                try {
                    return a ? n(o(t)[0], t[1]) : n(t);
                } catch (n) {
                    var i = e.return;
                    throw (void 0 !== i && o(i.call(e)), n);
                }
            };
        },
        function(e, n, t) {
            var o = t(5),
                a = t(29),
                i = o('iterator'),
                r = Array.prototype;
            e.exports = function(e) {
                return void 0 !== e && (a.Array === e || r[i] === e);
            };
        },
        function(e, n, t) {
            'use strict';
            var o = t(34),
                a = t(26),
                i = t(23);
            e.exports = function(e, n, t) {
                var r = o(n);
                r in e ? a.f(e, r, i(0, t)) : (e[r] = t);
            };
        },
        function(e, n, t) {
            var o = t(54),
                a = t(29),
                i = t(5)('iterator');
            e.exports = function(e) {
                if (null != e) return e[i] || e['@@iterator'] || a[o(e)];
            };
        },
        function(e, n, t) {
            var o = t(5)('iterator'),
                a = !1;
            try {
                var i = 0,
                    r = {
                        next: function() {
                            return { done: !!i++ };
                        },
                        return: function() {
                            a = !0;
                        }
                    };
                (r[o] = function() {
                    return this;
                }),
                    Array.from(r, function() {
                        throw 2;
                    });
            } catch (e) {}
            e.exports = function(e, n) {
                if (!n && !a) return !1;
                var t = !1;
                try {
                    var i = {};
                    (i[o] = function() {
                        return {
                            next: function() {
                                return { done: (t = !0) };
                            }
                        };
                    }),
                        e(i);
                } catch (e) {}
                return t;
            };
        },
        function(e, n, t) {
            t(136);
            var o = t(19);
            e.exports = o('String', 'startsWith');
        },
        function(e, n, t) {
            'use strict';
            var o = t(4),
                a = t(18),
                i = t(42),
                r = t(9),
                s = t(43),
                l = ''.startsWith,
                c = Math.min;
            o(
                { target: 'String', proto: !0, forced: !s('startsWith') },
                {
                    startsWith: function(e) {
                        var n = String(r(this));
                        i(e);
                        var t = a(c(arguments.length > 1 ? arguments[1] : void 0, n.length)),
                            o = String(e);
                        return l ? l.call(n, o, t) : n.slice(t, t + o.length) === o;
                    }
                }
            );
        },
        function(e, n, t) {
            var o = t(14),
                a = t(25),
                i = t(5)('match');
            e.exports = function(e) {
                var n;
                return o(e) && (void 0 !== (n = e[i]) ? !!n : 'RegExp' == a(e));
            };
        },
        function(e, n, t) {
            t(139);
            var o = t(19);
            e.exports = o('Array', 'includes');
        },
        function(e, n, t) {
            'use strict';
            var o = t(4),
                a = t(48).includes,
                i = t(55);
            o(
                { target: 'Array', proto: !0 },
                {
                    includes: function(e) {
                        return a(this, e, arguments.length > 1 ? arguments[1] : void 0);
                    }
                }
            ),
                i('includes');
        },
        function(e, n, t) {
            t(141);
            var o = t(16);
            e.exports = o.Object.entries;
        },
        function(e, n, t) {
            var o = t(4),
                a = t(56).entries;
            o(
                { target: 'Object', stat: !0 },
                {
                    entries: function(e) {
                        return a(e);
                    }
                }
            );
        },
        function(e, n, t) {
            t(143);
            var o = t(19);
            e.exports = o('String', 'padStart');
        },
        function(e, n, t) {
            'use strict';
            var o = t(4),
                a = t(144).start;
            o(
                { target: 'String', proto: !0, forced: t(146) },
                {
                    padStart: function(e) {
                        return a(this, e, arguments.length > 1 ? arguments[1] : void 0);
                    }
                }
            );
        },
        function(e, n, t) {
            var o = t(18),
                a = t(145),
                i = t(9),
                r = Math.ceil,
                s = function(e) {
                    return function(n, t, s) {
                        var l,
                            c,
                            d = String(i(n)),
                            m = d.length,
                            u = void 0 === s ? ' ' : String(s),
                            p = o(t);
                        return p <= m || '' == u
                            ? d
                            : ((c = a.call(u, r((l = p - m) / u.length))).length > l && (c = c.slice(0, l)),
                              e ? d + c : c + d);
                    };
                };
            e.exports = { start: s(!1), end: s(!0) };
        },
        function(e, n, t) {
            'use strict';
            var o = t(27),
                a = t(9);
            e.exports =
                ''.repeat ||
                function(e) {
                    var n = String(a(this)),
                        t = '',
                        i = o(e);
                    if (i < 0 || i == 1 / 0) throw RangeError('Wrong number of repetitions');
                    for (; i > 0; (i >>>= 1) && (n += n)) 1 & i && (t += n);
                    return t;
                };
        },
        function(e, n, t) {
            var o = t(147);
            e.exports = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(o);
        },
        function(e, n, t) {
            var o = t(41);
            e.exports = o('navigator', 'userAgent') || '';
        },
        function(e, n, t) {
            t(149);
            var o = t(19);
            e.exports = o('Array', 'find');
        },
        function(e, n, t) {
            'use strict';
            var o = t(4),
                a = t(150).find,
                i = t(55),
                r = !0;
            'find' in [] &&
                Array(1).find(function() {
                    r = !1;
                }),
                o(
                    { target: 'Array', proto: !0, forced: r },
                    {
                        find: function(e) {
                            return a(this, e, arguments.length > 1 ? arguments[1] : void 0);
                        }
                    }
                ),
                i('find');
        },
        function(e, n, t) {
            var o = t(35),
                a = t(33),
                i = t(28),
                r = t(18),
                s = t(151),
                l = [].push,
                c = function(e) {
                    var n = 1 == e,
                        t = 2 == e,
                        c = 3 == e,
                        d = 4 == e,
                        m = 6 == e,
                        u = 5 == e || m;
                    return function(p, g, f, h) {
                        for (
                            var y,
                                _,
                                w = i(p),
                                x = a(w),
                                v = o(g, f, 3),
                                b = r(x.length),
                                R = 0,
                                A = h || s,
                                E = n ? A(p, b) : t ? A(p, 0) : void 0;
                            b > R;
                            R++
                        )
                            if ((u || R in x) && ((_ = v((y = x[R]), R, w)), e))
                                if (n) E[R] = _;
                                else if (_)
                                    switch (e) {
                                        case 3:
                                            return !0;
                                        case 5:
                                            return y;
                                        case 6:
                                            return R;
                                        case 2:
                                            l.call(E, y);
                                    }
                                else if (d) return !1;
                        return m ? -1 : c || d ? d : E;
                    };
                };
            e.exports = {
                forEach: c(0),
                map: c(1),
                filter: c(2),
                some: c(3),
                every: c(4),
                find: c(5),
                findIndex: c(6)
            };
        },
        function(e, n, t) {
            var o = t(14),
                a = t(152),
                i = t(5)('species');
            e.exports = function(e, n) {
                var t;
                return (
                    a(e) &&
                        ('function' != typeof (t = e.constructor) || (t !== Array && !a(t.prototype))
                            ? o(t) && null === (t = t[i]) && (t = void 0)
                            : (t = void 0)),
                    new (void 0 === t ? Array : t)(0 === n ? 0 : n)
                );
            };
        },
        function(e, n, t) {
            var o = t(25);
            e.exports =
                Array.isArray ||
                function(e) {
                    return 'Array' == o(e);
                };
        },
        function(e, n, t) {
            t(154);
            var o = t(19);
            e.exports = o('String', 'endsWith');
        },
        function(e, n, t) {
            'use strict';
            var o = t(4),
                a = t(18),
                i = t(42),
                r = t(9),
                s = t(43),
                l = ''.endsWith,
                c = Math.min;
            o(
                { target: 'String', proto: !0, forced: !s('endsWith') },
                {
                    endsWith: function(e) {
                        var n = String(r(this));
                        i(e);
                        var t = arguments.length > 1 ? arguments[1] : void 0,
                            o = a(n.length),
                            s = void 0 === t ? o : c(a(t), o),
                            d = String(e);
                        return l ? l.call(n, d, s) : n.slice(s - d.length, s) === d;
                    }
                }
            );
        },
        function(e, n, t) {
            t(156);
            var o = t(19);
            e.exports = o('String', 'includes');
        },
        function(e, n, t) {
            'use strict';
            var o = t(4),
                a = t(42),
                i = t(9);
            o(
                { target: 'String', proto: !0, forced: !t(43)('includes') },
                {
                    includes: function(e) {
                        return !!~String(i(this)).indexOf(a(e), arguments.length > 1 ? arguments[1] : void 0);
                    }
                }
            );
        },
        function(e, n, t) {
            t(158);
            var o = t(16);
            e.exports = o.Object.values;
        },
        function(e, n, t) {
            var o = t(4),
                a = t(56).values;
            o(
                { target: 'Object', stat: !0 },
                {
                    values: function(e) {
                        return a(e);
                    }
                }
            );
        },
        function(e, n, t) {
            t(160);
            var o = t(16);
            e.exports = o.Number.isNaN;
        },
        function(e, n, t) {
            t(4)(
                { target: 'Number', stat: !0 },
                {
                    isNaN: function(e) {
                        return e != e;
                    }
                }
            );
        },
        function(e, n, t) {
            'use strict';
            function o() {
                return (o =
                    Object.assign ||
                    function(e) {
                        for (var n = 1; n < arguments.length; n++) {
                            var t = arguments[n];
                            for (var o in t) ({}.hasOwnProperty.call(t, o) && (e[o] = t[o]));
                        }
                        return e;
                    }).apply(this, arguments);
            }
            function a(e, n) {
                if (null == e) return {};
                var t,
                    o,
                    a = {},
                    i = Object.keys(e);
                for (o = 0; o < i.length; o++) n.indexOf((t = i[o])) >= 0 || (a[t] = e[t]);
                return a;
            }
            function i(e) {
                try {
                    if (!e) return !1;
                    if ('undefined' != typeof Promise && e instanceof Promise) return !0;
                    if ('undefined' != typeof window && window.Window && e instanceof window.Window) return !1;
                    if ('undefined' != typeof window && window.constructor && e instanceof window.constructor)
                        return !1;
                    var n = {}.toString;
                    if (n) {
                        var t = n.call(e);
                        if ('[object Window]' === t || '[object global]' === t || '[object DOMWindow]' === t) return !1;
                    }
                    if ('function' == typeof e.then) return !0;
                } catch (e) {
                    return !1;
                }
                return !1;
            }
            t.r(n);
            var r,
                s = [],
                l = [],
                c = 0;
            function d() {
                if (!c && r) {
                    var e = r;
                    (r = null), e.resolve();
                }
            }
            function m() {
                c += 1;
            }
            function u() {
                (c -= 1), d();
            }
            var p = (function() {
                function e(e) {
                    var n = this;
                    if (
                        ((this.resolved = void 0),
                        (this.rejected = void 0),
                        (this.errorHandled = void 0),
                        (this.value = void 0),
                        (this.error = void 0),
                        (this.handlers = void 0),
                        (this.dispatching = void 0),
                        (this.stack = void 0),
                        (this.resolved = !1),
                        (this.rejected = !1),
                        (this.errorHandled = !1),
                        (this.handlers = []),
                        e)
                    ) {
                        var t,
                            o,
                            a = !1,
                            i = !1,
                            r = !1;
                        m();
                        try {
                            e(
                                function(e) {
                                    r ? n.resolve(e) : ((a = !0), (t = e));
                                },
                                function(e) {
                                    r ? n.reject(e) : ((i = !0), (o = e));
                                }
                            );
                        } catch (e) {
                            return u(), void this.reject(e);
                        }
                        u(), (r = !0), a ? this.resolve(t) : i && this.reject(o);
                    }
                }
                var n = e.prototype;
                return (
                    (n.resolve = function(e) {
                        if (this.resolved || this.rejected) return this;
                        if (i(e)) throw new Error('Can not resolve promise with another promise');
                        return (this.resolved = !0), (this.value = e), this.dispatch(), this;
                    }),
                    (n.reject = function(e) {
                        var n = this;
                        if (this.resolved || this.rejected) return this;
                        if (i(e)) throw new Error('Can not reject promise with another promise');
                        if (!e) {
                            var t = e && 'function' == typeof e.toString ? e.toString() : {}.toString.call(e);
                            e = new Error('Expected reject to be called with Error, got ' + t);
                        }
                        return (
                            (this.rejected = !0),
                            (this.error = e),
                            this.errorHandled ||
                                setTimeout(function() {
                                    n.errorHandled ||
                                        (function(e, n) {
                                            if (-1 === s.indexOf(e)) {
                                                s.push(e),
                                                    setTimeout(function() {
                                                        throw e;
                                                    }, 1);
                                                for (var t = 0; t < l.length; t++) l[t](e, n);
                                            }
                                        })(e, n);
                                }, 1),
                            this.dispatch(),
                            this
                        );
                    }),
                    (n.asyncReject = function(e) {
                        return (this.errorHandled = !0), this.reject(e), this;
                    }),
                    (n.dispatch = function() {
                        var n = this,
                            t = this.resolved,
                            o = this.rejected,
                            a = this.handlers;
                        if (!this.dispatching && (t || o)) {
                            (this.dispatching = !0), m();
                            for (
                                var r = function(r) {
                                        var s = a[r],
                                            l = s.onSuccess,
                                            c = s.onError,
                                            d = s.promise,
                                            m = void 0;
                                        if (t)
                                            try {
                                                m = l ? l(n.value) : n.value;
                                            } catch (e) {
                                                return d.reject(e), 'continue';
                                            }
                                        else if (o) {
                                            if (!c) return d.reject(n.error), 'continue';
                                            try {
                                                m = c(n.error);
                                            } catch (e) {
                                                return d.reject(e), 'continue';
                                            }
                                        }
                                        m instanceof e && (m.resolved || m.rejected)
                                            ? (m.resolved ? d.resolve(m.value) : d.reject(m.error),
                                              (m.errorHandled = !0))
                                            : i(m)
                                            ? m instanceof e && (m.resolved || m.rejected)
                                                ? m.resolved
                                                    ? d.resolve(m.value)
                                                    : d.reject(m.error)
                                                : m.then(
                                                      function(e) {
                                                          d.resolve(e);
                                                      },
                                                      function(e) {
                                                          d.reject(e);
                                                      }
                                                  )
                                            : d.resolve(m);
                                    },
                                    s = 0;
                                s < a.length;
                                s++
                            )
                                r(s);
                            (a.length = 0), (this.dispatching = !1), u();
                        }
                    }),
                    (n.then = function(n, t) {
                        if (n && 'function' != typeof n && !n.call)
                            throw new Error('Promise.then expected a function for success handler');
                        if (t && 'function' != typeof t && !t.call)
                            throw new Error('Promise.then expected a function for error handler');
                        var o = new e();
                        return (
                            this.handlers.push({ promise: o, onSuccess: n, onError: t }),
                            (this.errorHandled = !0),
                            this.dispatch(),
                            o
                        );
                    }),
                    (n.catch = function(e) {
                        return this.then(void 0, e);
                    }),
                    (n.finally = function(n) {
                        if (n && 'function' != typeof n && !n.call)
                            throw new Error('Promise.finally expected a function');
                        return this.then(
                            function(t) {
                                return e.try(n).then(function() {
                                    return t;
                                });
                            },
                            function(t) {
                                return e.try(n).then(function() {
                                    throw t;
                                });
                            }
                        );
                    }),
                    (n.timeout = function(e, n) {
                        var t = this;
                        if (this.resolved || this.rejected) return this;
                        var o = setTimeout(function() {
                            t.resolved || t.rejected || t.reject(n || new Error('Promise timed out after ' + e + 'ms'));
                        }, e);
                        return this.then(function(e) {
                            return clearTimeout(o), e;
                        });
                    }),
                    (n.toPromise = function() {
                        if ('undefined' == typeof Promise) throw new TypeError('Could not find Promise');
                        return Promise.resolve(this);
                    }),
                    (e.resolve = function(n) {
                        return n instanceof e
                            ? n
                            : i(n)
                            ? new e(function(e, t) {
                                  return n.then(e, t);
                              })
                            : new e().resolve(n);
                    }),
                    (e.reject = function(n) {
                        return new e().reject(n);
                    }),
                    (e.asyncReject = function(n) {
                        return new e().asyncReject(n);
                    }),
                    (e.all = function(n) {
                        var t = new e(),
                            o = n.length,
                            a = [];
                        if (!o) return t.resolve(a), t;
                        for (
                            var r = function(r) {
                                    var s = n[r];
                                    if (s instanceof e) {
                                        if (s.resolved) return (a[r] = s.value), (o -= 1), 'continue';
                                    } else if (!i(s)) return (a[r] = s), (o -= 1), 'continue';
                                    e.resolve(s).then(
                                        function(e) {
                                            (a[r] = e), 0 == (o -= 1) && t.resolve(a);
                                        },
                                        function(e) {
                                            t.reject(e);
                                        }
                                    );
                                },
                                s = 0;
                            s < n.length;
                            s++
                        )
                            r(s);
                        return 0 === o && t.resolve(a), t;
                    }),
                    (e.hash = function(n) {
                        var t = {};
                        return e
                            .all(
                                Object.keys(n).map(function(o) {
                                    return e.resolve(n[o]).then(function(e) {
                                        t[o] = e;
                                    });
                                })
                            )
                            .then(function() {
                                return t;
                            });
                    }),
                    (e.map = function(n, t) {
                        return e.all(n.map(t));
                    }),
                    (e.onPossiblyUnhandledException = function(e) {
                        return (function(e) {
                            return (
                                l.push(e),
                                {
                                    cancel: function() {
                                        l.splice(l.indexOf(e), 1);
                                    }
                                }
                            );
                        })(e);
                    }),
                    (e.try = function(n, t, o) {
                        if (n && 'function' != typeof n && !n.call) throw new Error('Promise.try expected a function');
                        var a;
                        m();
                        try {
                            a = n.apply(t, o || []);
                        } catch (n) {
                            return u(), e.reject(n);
                        }
                        return u(), e.resolve(a);
                    }),
                    (e.delay = function(n) {
                        return new e(function(e) {
                            setTimeout(e, n);
                        });
                    }),
                    (e.isPromise = function(n) {
                        return !!(n && n instanceof e) || i(n);
                    }),
                    (e.flush = function() {
                        return (n = r = r || new e()), d(), n;
                        var n;
                    }),
                    e
                );
            })();
            Object.create(Error.prototype);
            var g = t(7),
                f = t.n(g);
            function h(e) {
                var n = new Map();
                return function() {
                    for (var t = arguments.length, o = new Array(t), a = 0; a < t; a++) o[a] = arguments[a];
                    var i = JSON.stringify(o);
                    return n.has(i) || n.set(i, e.apply(void 0, o)), n.get(i);
                };
            }
            function y(e, n) {
                var t = new Map();
                return function(o, a) {
                    void 0 === a && (a = !1);
                    var i = JSON.stringify(
                        n.map(function(e) {
                            return o[e];
                        })
                    );
                    return (t.has(i) && !a) || t.set(i, e(o)), t.get(i);
                };
            }
            function _(e) {
                for (var n = arguments.length, t = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)
                    t[o - 1] = arguments[o];
                return function() {
                    for (var n = arguments.length, o = new Array(n), a = 0; a < n; a++) o[a] = arguments[a];
                    return e.apply(void 0, t.concat(o));
                };
            }
            function w(e, n) {
                return (
                    void 0 === n && (n = e.length),
                    function t() {
                        for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++) a[i] = arguments[i];
                        return a.length < n
                            ? function() {
                                  for (var e = arguments.length, n = new Array(e), o = 0; o < e; o++)
                                      n[o] = arguments[o];
                                  return t.apply(void 0, a.concat(n));
                              }
                            : e.apply(void 0, a);
                    }
                );
            }
            function x(e) {
                return function(n) {
                    var t = e(n);
                    return 'object' == typeof t && t.then
                        ? t.then(function() {
                              return n;
                          })
                        : n;
                };
            }
            function v() {
                for (var e = arguments.length, n = new Array(e), t = 0; t < e; t++) n[t] = arguments[t];
                return function(e) {
                    return n.reduce(function(e, n) {
                        return n(e);
                    }, e);
                };
            }
            function b(e) {
                void 0 === e && (e = {});
                var n = o({}, e);
                return [n, _(f.a, n)];
            }
            var R = b(window.__paypal_messages_state__ || { nextId: 1, config: {} }),
                A = R[0],
                E = R[1];
            Object.defineProperty(window, '__paypal_messages_state__', {
                value: A,
                enumerable: !1,
                configurable: !0,
                writable: !1
            });
            var P = t(1),
                O = t.n(P),
                I = t(0),
                T = t.n(I),
                L = t(57),
                S = t.n(L),
                N = t(6),
                C = t.n(N),
                M = t(11),
                z = t.n(M),
                j = t(3),
                k = t.n(j);
            function W(e) {
                return k()(e).reduce(function(e, n) {
                    var t,
                        a,
                        i,
                        r = n[0],
                        s = n[1];
                    return Array.isArray(s)
                        ? o({}, e, (((a = {})[r] = [].concat(s)), a))
                        : o({}, e, 'object' == typeof s ? (((i = {})[r] = W(s)), i) : (((t = {})[r] = s), t));
                }, {});
            }
            function H(e, n) {
                return (function e(n, t) {
                    return k()(t).reduce(function(t, a) {
                        var i,
                            r,
                            s,
                            l,
                            c = a[0],
                            d = a[1];
                        return Array.isArray(d)
                            ? o({}, t, (((r = {})[c] = [].concat(d)), r))
                            : 'object' != typeof d ||
                              null === d ||
                              (n[c] && 'object' == typeof n[c] && !Array.isArray(n[c]))
                            ? o(
                                  {},
                                  t,
                                  'object' == typeof d && null !== d
                                      ? (((l = {})[c] = e(n[c], d)), l)
                                      : (((i = {})[c] = d), i)
                              )
                            : o({}, t, (((s = {})[c] = W(d)), s));
                    }, n);
                })(W(e), n);
            }
            function Y(e, n) {
                return n.split('.').reduce(function(e, n) {
                    return 'object' == typeof e || 'function' == typeof e ? e[n] : void 0;
                }, e);
            }
            function B(e, n, t) {
                var o;
                void 0 === t && (t = '-');
                var a,
                    i = e.indexOf(t);
                if (-1 === i) return ((a = {})[e] = n), a;
                var r = e.slice(0, i),
                    s = e.slice(i + 1);
                return ((o = {})[r] = B(s, n)), o;
            }
            var D = w(function(e, n, t) {
                    var a = e.uuid,
                        i = e.urls;
                    void 0 === t && (t = !1);
                    var r = new window.Image();
                    if ('object' == typeof n) {
                        var s = o({}, n, { uuid: t ? a + '::banner.hidden:true' : a }),
                            l = k()(s).reduce(function(e, n) {
                                var t = n[1];
                                return void 0 === t ? e : e + '&' + n[0] + '=' + t;
                            }, '');
                        r.src = (i[n.et] || i.DEFAULT) + '&bdata=' + encodeURIComponent(l.slice(1));
                    } else 'string' == typeof n && (r.src = i[n] || i.DEFAULT);
                }, 2),
                G = {
                    START: 'Start',
                    END: 'End',
                    RENDER_START: 'Render_Start',
                    RENDER_END: 'Render_End',
                    CREATE: 'Create',
                    CONTAINER: 'Container',
                    VALIDATE: 'Validate',
                    FETCH_START: 'Fetch_Start',
                    FETCH_END: 'Fetch_End',
                    INSERT: 'Insert',
                    MODAL: 'Modal',
                    SIZE: 'Size',
                    STATS: 'Stats',
                    UPDATE: 'Update',
                    ERROR: 'Error'
                },
                U = {
                    MESSAGE_OVERFLOW: 'MESSAGE_OVERFLOW',
                    MESSAGE_HIDDEN: 'MESSAGE_HIDDEN',
                    MESSAGE_INVALID_LEGACY: 'MESSAGE_INVALID_LEGACY',
                    MESSAGE_INVALID_MARKUP: 'MESSAGE_INVALID_MARKUP',
                    MODAL_FAIL: 'MODAL_FAIL',
                    CUSTOM_TEMPLATE_FAIL: 'CUSTOM_TEMPLATE_FAIL',
                    CUSTOM_JSON_OPTIONS_FAIL: 'CUSTOM_JSON_OPTIONS_FAIL'
                },
                V = {
                    create: function(e) {
                        var n = e.id,
                            t = e.selector,
                            a = e.type,
                            i = b({ count: 1, account: e.account, history: [], logs: [] }),
                            r = i[0],
                            s = i[1],
                            l = {
                                start: function(e) {
                                    Y(e, 'options.account') &&
                                        r.account !== e.options.account &&
                                        s({ account: e.account }),
                                        l.info(G.START, o({ t: new Date().getTime() }, e));
                                },
                                end: function(e) {
                                    l.info(G.END, o({ t: new Date().getTime() }, e)),
                                        (function() {
                                            if (!(r.count > 3)) {
                                                var e,
                                                    i = C()(r.logs, function(e) {
                                                        var n = e.event;
                                                        return 'Create' === n || 'Update' === n;
                                                    }),
                                                    l = {
                                                        version: '1.1.1',
                                                        url: window.location.href,
                                                        selector: t,
                                                        type: a + (i ? '-' + i.event : ''),
                                                        id: n + '-' + S()(r.count, 4, '0'),
                                                        account: r.account,
                                                        history: r.history,
                                                        events:
                                                            ((e = r.logs),
                                                            e.map(function(e) {
                                                                var n = e.event,
                                                                    t = o({}, e);
                                                                return (
                                                                    delete t.event,
                                                                    Object.keys(t).length > 0 ? [n, t] : n
                                                                );
                                                            }))
                                                    };
                                                s({ count: r.count + 1, logs: [] });
                                                var c = new XMLHttpRequest();
                                                (c.onreadystatechange = function() {
                                                    if (4 === c.readyState) {
                                                        var e = (c.getResponseHeader('Paypal-Debug-Id') || '').split(
                                                            ','
                                                        );
                                                        s({ history: [].concat(r.history, [e[0]]).slice(-5) });
                                                    }
                                                }),
                                                    c.open(
                                                        'POST',
                                                        'https://www.paypal.com/ppcredit/messagingLogger',
                                                        !0
                                                    ),
                                                    c.setRequestHeader(
                                                        'Content-Type',
                                                        'application/json;charset=UTF-8'
                                                    );
                                                var d = [].toJSON;
                                                d && delete Array.prototype.toJSON,
                                                    c.send(JSON.stringify({ data: l })),
                                                    d && (Array.prototype.toJSON = d);
                                            }
                                        })();
                                },
                                info: function(e, n) {
                                    void 0 === n && (n = {}), s({ logs: [].concat(r.logs, [o({ event: e }, n)]) });
                                },
                                error: function(e) {
                                    l.info(G.ERROR, e);
                                },
                                track: D,
                                warn: function() {
                                    for (var e, n = arguments.length, t = new Array(n), o = 0; o < n; o++)
                                        t[o] = arguments[o];
                                    (e = console).warn.apply(e, ['[PayPal Messages]'].concat(t));
                                }
                            };
                        return l;
                    },
                    warn: function() {
                        for (var e, n = arguments.length, t = new Array(n), o = 0; o < n; o++) t[o] = arguments[o];
                        (e = console).warn.apply(e, ['[PayPal Messages]'].concat(t));
                    }
                },
                F = h(function(e) {
                    var n,
                        t = e.markup;
                    return p.resolve(
                        T()(t, 'https://www.paypalobjects.com')
                            ? ((n = t),
                              new p(function(e) {
                                  var t = new XMLHttpRequest();
                                  (t.onreadystatechange = function() {
                                      if (4 === t.readyState)
                                          switch (t.status) {
                                              case 200:
                                                  e(t.responseText);
                                                  break;
                                              default:
                                                  e('');
                                          }
                                  }),
                                      t.open('GET', n, !0),
                                      t.send();
                              }))
                            : ''
                    );
                });
            window.__PP = window.__PP || {};
            var Z = { US: 'en_US', GB: 'en_GB', FR: 'fr_FR', DE: 'de_DE' };
            function J(e) {
                try {
                    var n = e.content.json,
                        t = e.tracking_details;
                    return {
                        data: {
                            disclaimer: JSON.parse(n.disclaimer),
                            headline: JSON.parse(n.headline),
                            subHeadline: JSON.parse(n.subHeadline)
                        },
                        meta: {
                            clickUrl: t.click_url,
                            impressionUrl: t.impression_url,
                            offerType: JSON.parse(n.meta).offerType
                        }
                    };
                } catch (e) {
                    throw new Error(U.MESSAGE_INVALID_MARKUP);
                }
            }
            function q(e, n) {
                var t = n.match(/^<!--([\s\S]+?)-->/);
                if (t)
                    try {
                        return JSON.parse(t[1]);
                    } catch (n) {
                        e.error({ name: U.CUSTOM_JSON_OPTIONS_FAIL });
                    }
                return {};
            }
            var K = y(
                function(e) {
                    var n = e.account,
                        t = e.amount,
                        o = e.country;
                    return new p(function(e) {
                        var a = 'c' + Math.floor(Math.random() * Math.pow(10, 19)),
                            i = {
                                dimensions: 'x200x51',
                                currency_value: t,
                                currency_code: 'USD',
                                format: 'HTML',
                                presentation_types: 'HTML',
                                ch: 'UPSTREAM',
                                call: '__PP.' + a
                            };
                        o && Z[o] && ((i.country_code = o), (i.locale = Z[o]));
                        var r = k()(i)
                                .filter(function(e) {
                                    return e[1];
                                })
                                .reduce(
                                    function(e, n) {
                                        return e + '&' + n[0] + '=' + n[1];
                                    },
                                    T()(n, 'client-id') ? 'client_id=' + n.slice(10) : 'pub_id=' + n
                                ),
                            s = document.createElement('script');
                        (s.async = !0),
                            (s.src = 'https://www.paypal.com/imadserver/upstream?' + r),
                            document.head.appendChild(s),
                            (window.__PP[a] = function(n) {
                                if ((document.head.removeChild(s), delete window.__PP[a], 'object' == typeof n))
                                    e({ markup: J(n) });
                                else
                                    try {
                                        e({ markup: JSON.parse(n.replace(/<\/?div>/g, '')) });
                                    } catch (t) {
                                        e({ markup: n });
                                    }
                            });
                    });
                },
                ['account', 'amount', 'country']
            );
            function Q(e) {
                var n = e.options,
                    t = e.logger;
                return (
                    t.info(G.FETCH_START),
                    ('custom' !== Y(n, 'style.layout')
                        ? K(n).then(_(f.a, { options: n }))
                        : p.all([K(n), F(n.style)]).then(function(e) {
                              var o = e[0],
                                  a = e[1];
                              return 'object' == typeof o.markup
                                  ? ('' === a && t.error({ name: U.CUSTOM_TEMPLATE_FAIL }),
                                    (o.markup.template = a),
                                    { markup: o.markup, options: H(n, q(t, a)) })
                                  : { markup: o.markup, options: n };
                          })
                    ).then(
                        x(function(e) {
                            t.info(G.FETCH_END),
                                (e.options.style._flattened = (function e(n, t, o) {
                                    return (
                                        void 0 === t && (t = ''),
                                        void 0 === o && (o = ':'),
                                        k()(n).reduce(function(n, a) {
                                            var i = a[0],
                                                r = a[1];
                                            switch (typeof r) {
                                                case 'object':
                                                    return [].concat(n, e(r, '' + t + i + '.'));
                                                case 'string':
                                                default:
                                                    return [].concat(n, ['' + t + i + o + r]);
                                            }
                                        }, [])
                                    );
                                })(e.options.style));
                        })
                    )
                );
            }
            var $ = t(31),
                X = t.n($),
                ee = { click: new Map(), scroll: new Map(), hover: new Map(), resize: new Map() };
            function ne(e) {
                ee.resize.has(e.target.frameElement) && ee.resize.get(e.target.frameElement)(e);
            }
            function te(e) {
                ee.scroll.forEach(function(n) {
                    return n(e);
                });
            }
            function oe(e) {
                ee.hover.has(e.target) && ee.hover.get(e.target)(e);
            }
            function ae(e) {
                e.target.ownerDocument && ee.click.has(e.target.ownerDocument.defaultView.frameElement)
                    ? ee.click.get(e.target.ownerDocument.defaultView.frameElement)(e)
                    : ee.click.has(e.currentTarget) && e.currentTarget !== e.target && ee.click.get(e.currentTarget)(e);
            }
            function ie(e) {
                return {
                    on: function(n, t) {
                        ('IFRAME' !== e.tagName && 'resize' === n) ||
                            (function(e, n, t) {
                                if (
                                    ((function(e, n) {
                                        'scroll' === e && 0 === ee.scroll.size
                                            ? window.addEventListener('scroll', te)
                                            : 'hover' === e && 0 === ee.hover.size
                                            ? document.addEventListener('mouseover', oe)
                                            : 'resize' !== e || ee[e].has(n)
                                            ? 'click' !== e ||
                                              ee[e].has(n) ||
                                              ('IFRAME' === n.tagName
                                                  ? n.contentWindow.document.body.addEventListener('click', ae)
                                                  : n.addEventListener('click', ae))
                                            : n.contentWindow.addEventListener('resize', ne);
                                    })(e, n),
                                    ee[e].has(n))
                                ) {
                                    var o = ee[e].get(n);
                                    ee[e].set(n, function(e) {
                                        o(e), t(e);
                                    });
                                } else ee[e].set(n, t);
                            })(n, e, t);
                    },
                    clear: function(n) {
                        ee[n].delete(e),
                            'scroll' === n && 0 === ee.scroll.size
                                ? window.removeEventListener('scroll', te)
                                : 'hover' === n && 0 === ee.hover.size
                                ? document.removeEventListener('mouseover', oe)
                                : 'click' === n
                                ? 'IFRAME' === e.tagName
                                    ? e.contentWindow.document.body.removeEventListener('click', ae)
                                    : e.removeEventListener('click', ae)
                                : 'IFRAME' === e.tagName &&
                                  'resize' === n &&
                                  e.contentWindow.removeEventListener('resize', ne);
                    }
                };
            }
            var re = t(58),
                se = t.n(re),
                le = t(21),
                ce = t.n(le),
                de = t(59),
                me = t.n(de),
                ue = t(60),
                pe = t.n(ue),
                ge = t(30),
                fe = t.n(ge),
                he = t(10),
                ye = t.n(he),
                _e = t(61),
                we = t.n(_e),
                xe = t(63),
                ve = t.n(xe),
                be = t(44),
                Re = t.n(be),
                Ae = t(64),
                Ee = t.n(Ae),
                Pe = t(65),
                Oe = t.n(Pe),
                Ie = t(66),
                Te = t.n(Ie),
                Le = t(62),
                Se = t.n(Le),
                Ne = t(67),
                Ce = t.n(Ne),
                Me = t(68),
                ze = t.n(Me),
                je = [
                    ['default', [ye.a, fe.a, we.a].join('\n')],
                    ['logo.type:primary', Se.a],
                    ['logo.type:alternative', ve.a],
                    ['logo.type:inline', Re.a],
                    ['logo.type:none', [Re.a, Ee.a].join('\n')],
                    ['logo.position:right', Oe.a],
                    ['logo.position:top', Te.a],
                    ['logo.type:alternative && logo.position:top', Ce.a],
                    ['text.color:white', ze.a]
                ],
                ke = t(69),
                We = t.n(ke),
                He = t(70),
                Ye = t.n(He),
                Be = t(71),
                De = t.n(Be),
                Ge = t(45),
                Ue = t.n(Ge),
                Ve = t(72),
                Fe = t.n(Ve),
                Ze = t(73),
                Je = t.n(Ze),
                qe = t(74),
                Ke = t.n(qe),
                Qe = t(75),
                $e = t.n(Qe),
                Xe = t(79),
                en = t.n(Xe),
                nn = t(76),
                tn = t.n(nn),
                on = t(77),
                an = t.n(on),
                rn = t(78),
                sn = t.n(rn),
                ln = [
                    ['default', [ye.a, fe.a, We.a].join('\n')],
                    ['ratio:1x1', Ye.a],
                    ['ratio:1x4', De.a],
                    ['ratio:8x1', [Ue.a, Fe.a].join('\n')],
                    ['ratio:20x1', [Ue.a, Je.a].join('\n')],
                    ['color:blue', Ke.a],
                    ['color:gray', $e.a],
                    ['color:black', tn.a],
                    ['color:white', an.a],
                    ['color:white-no-border', sn.a],
                    ['color:blue && ratio:1x4', en.a]
                ],
                cn = t(99),
                dn = t.n(cn),
                mn = t(96),
                un = t.n(mn),
                pn = t(95),
                gn = t.n(pn),
                fn = t(97),
                hn = t.n(fn),
                yn = t(98),
                _n = t.n(yn),
                wn = t(80),
                xn = t.n(wn),
                vn = t(83),
                bn = t.n(vn),
                Rn = t(84),
                An = t.n(Rn),
                En = t(81),
                Pn = t.n(En),
                On = t(82),
                In = t.n(On),
                Tn = t(85),
                Ln = t.n(Tn),
                Sn = t(90),
                Nn = t.n(Sn),
                Cn = t(86),
                Mn = t.n(Cn),
                zn = t(87),
                jn = t.n(zn),
                kn = t(88),
                Wn = t.n(kn),
                Hn = t(89),
                Yn = t.n(Hn),
                Bn = t(91),
                Dn = t.n(Bn),
                Gn = t(92),
                Un = t.n(Gn),
                Vn = t(93),
                Fn = t.n(Vn),
                Zn = t(94),
                Jn = {
                    x168x374: { styles: xn.a, vertical: !0 },
                    x765x60: { styles: Pn.a },
                    x1000x50: { styles: In.a, termsIcon: !0 },
                    x234x100: { styles: bn.a, reverseLogo: !0 },
                    x310x100: { styles: An.a, reverseLogo: !0 },
                    x1000x36: { styles: Ln.a, termsIcon: !0 },
                    x120x90: { styles: Mn.a, termsIcon: !0 },
                    x234x60: { styles: jn.a, reverseLogo: !0, termsIcon: !0 },
                    x250x250: { styles: Wn.a, reverseLogo: !0, vertical: !0, termsIcon: !0 },
                    x300x50: { styles: Yn.a, reverseLogo: !0 },
                    x340x60: { styles: Nn.a, reverseLogo: !0 },
                    x468x60: { styles: Dn.a, reverseLogo: !0, termsIcon: !0 },
                    x728x90: { styles: Un.a, reverseLogo: !0 },
                    x540x200: { styles: Fn.a, reverseLogo: !0, termsIcon: !0 },
                    x170x100: { styles: t.n(Zn).a, termsIcon: !0 }
                },
                qn = Object.keys(Jn).map(function(e) {
                    var n = Jn[e],
                        t = e.slice(1),
                        o = t.split('x'),
                        a = o[1],
                        i =
                            '\n        .message {\n            width: ' +
                            o[0] +
                            'px;\n            min-height: ' +
                            a +
                            'px;\n        }\n\n        .message__container {\n            min-height: ' +
                            a +
                            'px;\n        }\n    ';
                    return (
                        n.vertical && (i = '' + i + gn.a),
                        n.reverseLogo && (i = '' + i + un.a),
                        n.vertical && n.reverseLogo && (i = '' + i + hn.a),
                        n.termsIcon && (i = '' + i + _n.a),
                        ['size:' + t, i]
                    );
                }),
                Kn = Object.keys(Jn).map(function(e) {
                    return ['size:' + e.slice(1), Jn[e].styles];
                }),
                Qn = [['default', [ye.a, dn.a].join('\n')]].concat(qn, Kn),
                $n = t(100),
                Xn = [['default', [ye.a, t.n($n).a].join('\n')]],
                et = { 'layout:text': je, 'layout:flex': ln };
            (Object({
                __VERSION__: '1.1.1',
                __BANNER_URL__: 'https://www.paypal.com/imadserver/upstream',
                __MODAL_URL__: 'https://www.paypalobjects.com/upstream/assets/messaging/modal',
                __LOGGING_URL__: 'https://www.paypal.com/ppcredit/messagingLogger',
                __TERMS_URL__: 'https://www.paypal.com/ppcredit/finance/terms',
                __LEGACY__: !1,
                __DEMO__: !1,
                __SDK__: !1
            }).__LOCALE__ &&
                'US' !==
                    Object({
                        __VERSION__: '1.1.1',
                        __BANNER_URL__: 'https://www.paypal.com/imadserver/upstream',
                        __MODAL_URL__: 'https://www.paypalobjects.com/upstream/assets/messaging/modal',
                        __LOGGING_URL__: 'https://www.paypal.com/ppcredit/messagingLogger',
                        __TERMS_URL__: 'https://www.paypal.com/ppcredit/finance/terms',
                        __LEGACY__: !1,
                        __DEMO__: !1,
                        __SDK__: !1
                    }).__LOCALE__) ||
                ((et['layout:legacy'] = Qn), (et['layout:custom'] = Xn));
            var nt = et,
                tt = {
                    PRIMARY: {
                        COLOR: [
                            'https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/ppc_fc_pri.svg',
                            453,
                            152
                        ],
                        WHITE: [
                            'https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/ppc_wh_pri.svg',
                            453,
                            152
                        ]
                    },
                    ALTERNATIVE: {
                        COLOR: [
                            'https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/ppc_fc_alt.svg',
                            573,
                            80
                        ],
                        WHITE: [
                            'https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/ppc_wh_alt.svg',
                            573,
                            80
                        ]
                    },
                    ALT_NO_PP: {
                        COLOR: [
                            'https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/ppc_fc_alt_noPP.svg',
                            477,
                            64
                        ],
                        WHITE: [
                            'https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/ppc_wh_alt_noPP.svg',
                            477,
                            64
                        ]
                    }
                };
            function ot(e) {
                return (
                    '\n    .message__headline span.multi:nth-child(2) {\n        display: none;\n    }\n\n    @media (min-width: ' +
                    e +
                    'px) {\n        .message__headline span.multi:first-child {\n            display: none;\n            \n        }\n\n        .message__headline span.multi:nth-child(2) {\n            display: inline;\n            \n        }\n    }\n'
                );
            }
            var at = [
                    [
                        'default',
                        {
                            logo: tt.PRIMARY.COLOR,
                            headline: 'medium',
                            subHeadline: 'small',
                            disclaimer: 'legacy-medium'
                        }
                    ],
                    [
                        'size:1000x36',
                        {
                            styles: [
                                '.message__sub-headline { color: #009cde }',
                                '.message__headline { display: block }'
                            ]
                        }
                    ],
                    ['size:234x100', { logo: tt.PRIMARY.WHITE }],
                    ['size:310x100', { logo: tt.PRIMARY.WHITE }],
                    ['size:340x60', { logo: tt.PRIMARY.WHITE, styles: ['.message { max-width: 100% }'] }]
                ],
                it = {
                    'layout:text': [
                        [
                            'default',
                            {
                                styles: [
                                    ot(290),
                                    '.message__messaging { flex: 1 1 auto; }',
                                    '@media (max-width: 289px) { .message__disclaimer { display: block; } }'
                                ],
                                logo: tt.PRIMARY.COLOR,
                                headline: ['xsmall', { tag: 'medium', br: ['months'] }],
                                disclaimer: 'xsmall'
                            }
                        ],
                        ['logo.type:primary', { messageWidth: [130, 320] }],
                        [
                            'logo.type:inline',
                            {
                                messageWidth: [200, 1e3],
                                styles: [ot(280)],
                                logo: tt.ALT_NO_PP.COLOR,
                                headline: [
                                    { tag: 'xsmall', replace: [['time.', 'time']] },
                                    { tag: 'medium', br: ['purchases'] }
                                ]
                            }
                        ],
                        [
                            'logo.type:none',
                            {
                                messageWidth: [180, 1e3],
                                styles: [ot(280)],
                                logo: !1,
                                headline: [
                                    { tag: 'xsmall', replace: [['time.', 'time']], br: ['time'] },
                                    { tag: 'medium', br: ['purchases'] }
                                ]
                            }
                        ],
                        [
                            'logo.type:alternative',
                            {
                                styles: [ot(520)],
                                logo: tt.ALTERNATIVE.COLOR,
                                headline: ['xsmall', { tag: 'medium', br: ['months'] }]
                            }
                        ],
                        ['logo.type:primary && logo.position:top', { styles: [ot(210)] }],
                        ['logo.type:alternative && logo.position:top', { styles: [ot(210)] }],
                        ['text.color:white && logo.type:primary', { logo: tt.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: tt.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: tt.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: tt.PRIMARY.WHITE,
                                headline: ['xsmall', { tag: 'medium', br: ['months'] }],
                                disclaimer: 'xsmall'
                            }
                        ],
                        ['ratio:1x1', { headline: ['xsmall', 'medium'] }],
                        [
                            'ratio:1x4',
                            {
                                headline: { tag: 'medium', br: ['months'] },
                                styles: ['.message__logo-container { margin-bottom: 30%; }'],
                                disclaimer: ['xlarge', 'xsmall']
                            }
                        ],
                        ['color:gray', { logo: tt.PRIMARY.COLOR }],
                        ['color:white', { logo: tt.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: tt.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': at
                },
                rt = {
                    'layout:text': [
                        [
                            'default',
                            {
                                styles: [ot(320)],
                                logo: tt.PRIMARY.COLOR,
                                headline: ['xsmall', { tag: 'medium', br: ['months'], replace: [['99+', '99+.']] }],
                                disclaimer: ['extra', 'xsmall']
                            }
                        ],
                        ['logo.type:primary', { messageWidth: [130, 320] }],
                        [
                            'logo.type:inline',
                            {
                                messageWidth: [240, 1e3],
                                styles: [ot(290)],
                                logo: tt.ALT_NO_PP.COLOR,
                                headline: [
                                    { tag: 'xsmall', replace: [['time.', 'time']], br: ['time'] },
                                    { tag: 'medium', br: ['purchases'] }
                                ]
                            }
                        ],
                        [
                            'logo.type:none',
                            {
                                messageWidth: [220, 1e3],
                                styles: [ot(290)],
                                logo: !1,
                                headline: [
                                    { tag: 'xsmall', replace: [['time.', 'time']], br: ['time'] },
                                    { tag: 'medium', br: ['purchases'] }
                                ]
                            }
                        ],
                        [
                            'logo.type:alternative',
                            {
                                styles: [ot(570)],
                                logo: tt.ALTERNATIVE.COLOR,
                                headline: ['xsmall', { tag: 'medium', br: ['months'], replace: [['99+', '99+.']] }]
                            }
                        ],
                        [
                            'logo.type:alternative && logo.position:top',
                            {
                                styles: [ot(230)],
                                messageWidth: [150, 320],
                                headline: ['xsmall', { tag: 'medium', br: ['months'] }]
                            }
                        ],
                        ['logo.type:primary && logo.position:top', { styles: [ot(235)] }],
                        ['text.color:white && logo.type:primary', { logo: tt.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: tt.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: tt.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: tt.PRIMARY.WHITE,
                                headline: ['xsmall', { tag: 'medium', br: ['months'] }],
                                disclaimer: ['extra.2', 'small']
                            }
                        ],
                        ['ratio:1x1', { headline: ['xsmall', 'medium'] }],
                        [
                            'ratio:1x4',
                            {
                                headline: { tag: 'medium', br: ['months'] },
                                styles: ['.message__logo-container { margin-bottom: 30%; }'],
                                disclaimer: ['xlarge', 'extra.2', 'small']
                            }
                        ],
                        ['color:gray', { logo: tt.PRIMARY.COLOR }],
                        ['color:white', { logo: tt.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: tt.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': at
                },
                st = {
                    'layout:text': [
                        [
                            'default',
                            {
                                styles: [
                                    '.message__headline > span:first-of-type { text-decoration: underline; color: #0076ff; font-weight: 600; }',
                                    '.message__disclaimer > span { color: #2c2e2f; text-decoration: none; }'
                                ],
                                logo: tt.PRIMARY.COLOR,
                                headline: { tag: 'small', br: ['months', 'APR'] },
                                disclaimer: 'xsmall.2'
                            }
                        ],
                        ['logo.type:primary', { messageWidth: 190 }],
                        [
                            'logo.type:inline',
                            { messageWidth: [255, 1e3], logo: tt.ALT_NO_PP.COLOR, headline: { br: ['APR'] } }
                        ],
                        ['logo.type:none', { messageWidth: [240, 1e3], logo: !1, headline: { br: ['APR'] } }],
                        [
                            'logo.type:alternative',
                            { logo: tt.ALTERNATIVE.COLOR, headline: { replace: [['APR', 'APR.']], br: ['APR.'] } }
                        ],
                        [
                            'text.color:white',
                            {
                                styles: [
                                    '.message__headline > span:first-of-type { text-decoration: underline; color: white; font-weight: 600; }',
                                    '.message__disclaimer > span { color: white; text-decoration: none; }'
                                ]
                            }
                        ],
                        ['text.color:white && logo.type:primary', { logo: tt.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: tt.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: tt.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: tt.PRIMARY.WHITE,
                                headline: { tag: 'small', br: ['months', 'APR'] },
                                disclaimer: ['xsmall.2', 'xsmall']
                            }
                        ],
                        ['ratio:1x4', { headline: { br: ['over', 'at', 'APR'] }, subHeadline: 'small' }],
                        [
                            'ratio:20x1',
                            {
                                styles: [
                                    '@media (min-aspect-ratio: 200/11) and (max-width: 475px) { .message__headline { font-size: 0.7rem; } }'
                                ]
                            }
                        ],
                        ['color:gray', { logo: tt.PRIMARY.COLOR }],
                        ['color:white', { logo: tt.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: tt.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': [
                        ['default', { logo: tt.PRIMARY.WHITE, headline: 'legacy-small', disclaimer: 'legacy-large' }],
                        ['size:1000x36', { logo: tt.PRIMARY.COLOR }],
                        [
                            'size:120x90',
                            {
                                logo: !1,
                                styles: [
                                    '.message__disclaimer { line-height: 12px }',
                                    '.message__headline { font-size: 12px }'
                                ]
                            }
                        ],
                        [
                            'size:234x60',
                            {
                                disclaimer: 'legacy-medium',
                                styles: [
                                    '.message__disclaimer { font-size: 9px }',
                                    '.message__messaging { padding-top: 5px }'
                                ]
                            }
                        ],
                        [
                            'size:250x250',
                            {
                                disclaimer: 'legacy-medium',
                                styles: [
                                    '.message__disclaimer { font-size: 10px }',
                                    '.message__headline { margin-bottom: 20px }'
                                ]
                            }
                        ],
                        [
                            'size:300x50',
                            {
                                styles: [
                                    '.message__headline { font-size: 13px }',
                                    '.message__disclaimer { font-size: 11px }'
                                ]
                            }
                        ],
                        [
                            'size:340x60',
                            {
                                disclaimer: 'legacy-medium',
                                styles: [
                                    '.message__headline { font-size: 13px }',
                                    '.message__messaging { padding: 7px 0 }'
                                ]
                            }
                        ],
                        [
                            'size:468x60',
                            {
                                styles: [
                                    '.message__headline { font-size: 14px; margin-bottom: 5px }',
                                    '.message__disclaimer { font-size: 10px }',
                                    '.message__messaging { padding: 14px 0 }'
                                ]
                            }
                        ],
                        [
                            'size:728x90',
                            {
                                styles: [
                                    '.message__headline { font-size: 20px }',
                                    '.message__disclaimer { font-size: 11px }',
                                    '.message__messaging { padding: 23px 0 }'
                                ]
                            }
                        ],
                        [
                            'size:540x200',
                            {
                                subHeadline: 'legacy-medium',
                                disclaimer: 'legacy-medium.2',
                                styles: ['.message__headline { padding-right: 40px; }']
                            }
                        ],
                        [
                            'size:170x100',
                            {
                                logo: !1,
                                styles: [
                                    '.message__disclaimer { font-size: 9px; }',
                                    '.message__headline { font-size: 15px; line-height: 1.2em; }'
                                ]
                            }
                        ]
                    ]
                },
                lt = {
                    'layout:text': [
                        [
                            'default',
                            {
                                styles: [
                                    '.message__headline > span:not(:nth-of-type(2)) { text-decoration: underline; color: #0076ff; font-weight: 600; }',
                                    '.message__disclaimer > span { color: #2c2e2f; text-decoration: none; }'
                                ],
                                logo: tt.PRIMARY.COLOR,
                                headline: { tag: 'xsmall', br: ['months'] },
                                disclaimer: 'xsmall.2'
                            }
                        ],
                        ['logo.type:primary', { messageWidth: 130 }],
                        [
                            'logo.type:inline',
                            { messageWidth: [250, 1e3], logo: tt.ALT_NO_PP.COLOR, headline: { br: ['months'] } }
                        ],
                        ['logo.type:none', { messageWidth: [235, 1e3], logo: !1, headline: { br: ['months'] } }],
                        [
                            'logo.type:alternative',
                            {
                                logo: tt.ALTERNATIVE.COLOR,
                                headline: { replace: [['months', 'months.']], br: ['months.'] }
                            }
                        ],
                        [
                            'text.color:white',
                            {
                                styles: [
                                    '.message__headline > span:first-of-type { text-decoration: underline; color: white; font-weight: 600; }',
                                    '.message__disclaimer > span { color: white; text-decoration: none; }'
                                ]
                            }
                        ],
                        ['text.color:white && logo.type:primary', { logo: tt.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: tt.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: tt.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: tt.PRIMARY.WHITE,
                                headline: { tag: 'xsmall', br: ['months'] },
                                disclaimer: ['xsmall.2', 'xsmall']
                            }
                        ],
                        ['ratio:1x4', { headline: { br: ['over', 'months'] }, subHeadline: 'small' }],
                        ['color:gray', { logo: tt.PRIMARY.COLOR }],
                        ['color:white', { logo: tt.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: tt.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': [
                        ['default', { logo: tt.PRIMARY.WHITE, headline: 'legacy-small', disclaimer: 'legacy-medium' }],
                        ['size:1000x36', { logo: tt.PRIMARY.COLOR }],
                        [
                            'size:120x90',
                            {
                                logo: !1,
                                styles: [
                                    '.message__disclaimer { line-height: 12px }',
                                    '.message__headline { font-size: 12px }'
                                ]
                            }
                        ],
                        [
                            'size:234x60',
                            {
                                disclaimer: 'legacy-medium.2',
                                styles: [
                                    '.message__disclaimer { font-size: 9px }',
                                    '.message__messaging { padding-top: 5px }'
                                ]
                            }
                        ],
                        [
                            'size:250x250',
                            {
                                styles: [
                                    '.message__disclaimer { font-size: 10px }',
                                    '.message__headline { margin-bottom: 20px }'
                                ],
                                disclaimer: 'legacy-medium.2'
                            }
                        ],
                        [
                            'size:300x50',
                            {
                                styles: [
                                    '.message__headline { font-size: 13px }',
                                    '.message__disclaimer { font-size: 11px }'
                                ]
                            }
                        ],
                        [
                            'size:340x60',
                            {
                                styles: [
                                    '.message__headline { font-size: 13px }',
                                    '.message__messaging { padding: 7px 0 }'
                                ],
                                disclaimer: 'legacy-medium.2'
                            }
                        ],
                        [
                            'size:468x60',
                            {
                                styles: [
                                    '.message__headline { font-size: 14px; margin-bottom: 5px }',
                                    '.message__disclaimer { font-size: 10px }',
                                    '.message__messaging { padding: 14px 0 }'
                                ]
                            }
                        ],
                        [
                            'size:728x90',
                            {
                                styles: [
                                    '.message__headline { font-size: 20px }',
                                    '.message__disclaimer { font-size: 11px }',
                                    '.message__messaging { padding: 23px 0 }'
                                ]
                            }
                        ],
                        [
                            'size:540x200',
                            {
                                subHeadline: 'legacy-medium',
                                disclaimer: 'legacy-medium.2',
                                styles: ['.message__headline { padding-right: 40px; }']
                            }
                        ],
                        [
                            'size:170x100',
                            {
                                logo: !1,
                                styles: [
                                    '.message__disclaimer { font-size: 9px; }',
                                    '.message__headline { font-size: 15px; line-height: 1.2em; }'
                                ]
                            }
                        ]
                    ]
                },
                ct = {
                    'layout:text': [
                        [
                            'default',
                            { logo: tt.PRIMARY.COLOR, headline: { tag: 'small', br: ['/mo'] }, disclaimer: 'small' }
                        ],
                        ['logo.type:primary', { messageWidth: [130, 200] }],
                        [
                            'logo.type:inline',
                            {
                                messageWidth: [200, 1e3],
                                logo: tt.ALT_NO_PP.COLOR,
                                headline: { br: ['APR'], replace: [['APR.', 'APR']] }
                            }
                        ],
                        [
                            'logo.type:none',
                            {
                                messageWidth: [200, 1e3],
                                logo: !1,
                                headline: { replace: [['APR.', 'APR']], br: ['APR'] }
                            }
                        ],
                        ['logo.type:alternative', { messageWidth: [140, 430], logo: tt.ALTERNATIVE.COLOR }],
                        ['text.color:white && logo.type:primary', { logo: tt.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: tt.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: tt.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: tt.PRIMARY.WHITE,
                                headline: { tag: 'medium', br: ['low as', 'at'] },
                                disclaimer: 'small'
                            }
                        ],
                        ['ratio:1x4', { subHeadline: 'small' }],
                        ['color:gray', { logo: tt.PRIMARY.COLOR }],
                        ['color:white', { logo: tt.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: tt.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': [
                        [
                            'default',
                            {
                                logo: tt.PRIMARY.WHITE,
                                headline: 'legacy-medium',
                                subHeadline: 'legacy-large',
                                disclaimer: 'legacy-small'
                            }
                        ],
                        ['size:1000x36', { logo: tt.PRIMARY.COLOR, disclaimer: 'legacy-medium' }],
                        ['size:120x90', { logo: !1, headline: 'legacy-small', disclaimer: 'legacy-medium' }],
                        ['size:234x60', { headline: 'legacy-small', disclaimer: 'legacy-medium' }],
                        ['size:300x50', { disclaimer: 'legacy-medium' }],
                        ['size:468x60', { disclaimer: 'legacy-medium' }],
                        ['size:250x250', { headline: 'legacy-large' }],
                        ['size:728x90', { headline: 'legacy-small', disclaimer: 'legacy-medium' }],
                        ['size:540x200', { disclaimer: 'legacy-medium' }],
                        ['size:170x100', { logo: !1, headline: 'legacy-small', disclaimer: 'legacy-medium' }]
                    ]
                },
                dt = {
                    'layout:text': [
                        ['default', { logo: tt.PRIMARY.COLOR, headline: { tag: 'xsmall' }, disclaimer: 'xsmall' }],
                        ['logo.type:primary', { messageWidth: 130 }],
                        [
                            'logo.type:inline',
                            { messageWidth: [195, 1e3], logo: tt.ALT_NO_PP.COLOR, headline: { br: ['/mo'] } }
                        ],
                        ['logo.type:none', { messageWidth: [175, 1e3], logo: !1, headline: { br: ['/mo'] } }],
                        ['logo.type:alternative', { logo: tt.ALTERNATIVE.COLOR }],
                        ['text.color:white && logo.type:primary', { logo: tt.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: tt.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: tt.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            { logo: tt.PRIMARY.WHITE, headline: { tag: 'small', br: ['low as'] }, disclaimer: 'xsmall' }
                        ],
                        ['ratio:1x4', { subHeadline: 'small' }],
                        ['color:gray', { logo: tt.PRIMARY.COLOR }],
                        ['color:white', { logo: tt.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: tt.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': [
                        [
                            'default',
                            {
                                logo: tt.PRIMARY.WHITE,
                                headline: 'legacy-xsmall',
                                subHeadline: 'legacy-large',
                                disclaimer: 'legacy-medium'
                            }
                        ],
                        ['size:1000x36', { logo: tt.PRIMARY.COLOR }],
                        ['size:120x90', { logo: !1 }],
                        ['size:250x250', { disclaimer: 'legacy-medium.2' }],
                        ['size:340x60', { disclaimer: 'legacy-medium.2' }],
                        ['size:540x200', { styles: ['.message__messaging { padding-top: 45px; }'] }],
                        ['size:170x100', { logo: !1, headline: 'legacy-xsmall' }]
                    ]
                },
                mt = {
                    'layout:text': [
                        [
                            'default',
                            { logo: tt.PRIMARY.COLOR, headline: { tag: 'small', br: ['/mo'] }, disclaimer: 'xsmall' }
                        ],
                        ['logo.type:primary', { messageWidth: [190, 240] }],
                        [
                            'logo.type:inline',
                            { messageWidth: [260, 1e3], logo: tt.ALT_NO_PP.COLOR, headline: { br: ['APR'] } }
                        ],
                        ['logo.type:none', { messageWidth: [260, 1e3], logo: !1, headline: { br: ['APR'] } }],
                        ['logo.type:alternative', { logo: tt.ALTERNATIVE.COLOR }],
                        ['text.color:white && logo.type:primary', { logo: tt.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: tt.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: tt.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: tt.PRIMARY.WHITE,
                                headline: { tag: 'small', br: [' of', 'at'] },
                                disclaimer: 'xsmall'
                            }
                        ],
                        ['ratio:1x4', { headline: { br: ['payments', 'mo'] }, subHeadline: 'small' }],
                        [
                            'ratio:20x1',
                            {
                                styles: [
                                    '@media (min-aspect-ratio: 200/11) and (max-width: 475px) { .message__headline { font-size: 0.75rem; } }'
                                ]
                            }
                        ],
                        ['color:gray', { logo: tt.PRIMARY.COLOR }],
                        ['color:white', { logo: tt.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: tt.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': [
                        [
                            'default',
                            {
                                logo: tt.PRIMARY.WHITE,
                                headline: 'legacy-small',
                                subHeadline: 'legacy-xlarge',
                                disclaimer: 'legacy-medium'
                            }
                        ],
                        ['size:1000x36', { logo: tt.PRIMARY.COLOR }],
                        ['size:120x90', { logo: !1, headline: 'legacy-xsmall' }],
                        ['size:234x60', { headline: 'legacy-xsmall', disclaimer: 'legacy-medium.2' }],
                        ['size:250x250', { headline: 'legacy-small.2', disclaimer: 'legacy-medium.2' }],
                        ['size:340x60', { disclaimer: 'legacy-medium.2' }],
                        ['size:728x90', { headline: 'legacy-xsmall' }],
                        ['size:170x100', { logo: !1, headline: 'legacy-xsmall' }]
                    ]
                },
                ut = {
                    'layout:text': [
                        ['default', { logo: tt.PRIMARY.COLOR, headline: { tag: 'small' }, disclaimer: 'xsmall' }],
                        ['logo.type:primary', { messageWidth: [140, 210] }],
                        [
                            'logo.type:inline',
                            { messageWidth: [200, 1e3], logo: tt.ALT_NO_PP.COLOR, headline: { br: ['/mo'] } }
                        ],
                        ['logo.type:none', { messageWidth: [200, 1e3], logo: !1, headline: { br: ['/mo'] } }],
                        ['logo.type:alternative', { logo: tt.ALTERNATIVE.COLOR }],
                        ['text.color:white && logo.type:primary', { logo: tt.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: tt.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: tt.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            { logo: tt.PRIMARY.WHITE, headline: { tag: 'small', br: ['of'] }, disclaimer: 'xsmall' }
                        ],
                        ['ratio:1x4', { headline: { br: ['payments'] }, subHeadline: 'small' }],
                        ['color:gray', { logo: tt.PRIMARY.COLOR }],
                        ['color:white', { logo: tt.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: tt.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': [
                        [
                            'default',
                            {
                                logo: tt.PRIMARY.WHITE,
                                headline: 'legacy-xsmall',
                                subHeadline: 'legacy-large',
                                disclaimer: 'legacy-medium'
                            }
                        ],
                        ['size:1000x36', { logo: tt.PRIMARY.COLOR }],
                        ['size:120x90', { logo: !1 }],
                        ['size:250x250', { disclaimer: 'legacy-medium.2' }],
                        ['size:340x60', { disclaimer: 'legacy-medium.2' }],
                        ['size:540x200', { styles: ['.message__messaging { padding-top: 45px; }'] }],
                        ['size:170x100', { logo: !1, headline: 'legacy-xsmall' }]
                    ]
                };
            function pt(e, n) {
                switch (e) {
                    case 'EZP:ANY:EQZ':
                        return st[n];
                    case 'EZP:ANY:GTZ':
                        return lt[n];
                    case 'PALA:MULTI:EQZ':
                        return ct[n];
                    case 'PALA:MULTI:GTZ':
                        return dt[n];
                    case 'PALA:SINGLE:EQZ':
                        return mt[n];
                    case 'PALA:SINGLE:GTZ':
                        return ut[n];
                    case 'NI:NON-US':
                        return rt[n];
                    case 'NI':
                    default:
                        return it[n];
                }
            }
            var gt = {
                    PRIMARY: {
                        COLOR: [
                            'https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/ppc_fc_pri.svg',
                            453,
                            152
                        ],
                        WHITE: [
                            'https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/ppc_wh_pri.svg',
                            453,
                            152
                        ]
                    },
                    ALTERNATIVE: {
                        COLOR: [
                            'https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/ppc_fc_alt.svg',
                            573,
                            80
                        ],
                        WHITE: [
                            'https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/ppc_wh_alt.svg',
                            573,
                            80
                        ]
                    },
                    ALT_NO_PP: {
                        COLOR: [
                            'https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/ppc_fc_alt_noPP.svg',
                            477,
                            64
                        ],
                        WHITE: [
                            'https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/ppc_wh_alt_noPP.svg',
                            477,
                            64
                        ]
                    }
                },
                ft = {
                    'layout:text': [
                        [
                            'default',
                            {
                                styles: [
                                    '.message__headline > span:first-of-type { text-decoration: underline; color: #0076ff; font-weight: 600; }',
                                    '.message__disclaimer > span { color: #2c2e2f; text-decoration: none; }'
                                ],
                                logo: gt.PRIMARY.COLOR,
                                headline: { tag: 'small', br: ['months', 'APR'] },
                                disclaimer: 'xsmall.2'
                            }
                        ],
                        ['logo.type:primary', { messageWidth: 190 }],
                        [
                            'logo.type:inline',
                            { messageWidth: [255, 1e3], logo: gt.ALT_NO_PP.COLOR, headline: { br: ['APR'] } }
                        ],
                        ['logo.type:none', { messageWidth: [240, 1e3], logo: !1, headline: { br: ['APR'] } }],
                        [
                            'logo.type:alternative',
                            { logo: gt.ALTERNATIVE.COLOR, headline: { replace: [['APR', 'APR.']], br: ['APR.'] } }
                        ],
                        [
                            'text.color:white',
                            {
                                styles: [
                                    '.message__headline > span:first-of-type { text-decoration: underline; color: white; font-weight: 600; }',
                                    '.message__disclaimer > span { color: white; text-decoration: none; }'
                                ]
                            }
                        ],
                        ['text.color:white && logo.type:primary', { logo: gt.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: gt.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: gt.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: gt.PRIMARY.WHITE,
                                headline: { tag: 'small', br: ['months', 'APR'] },
                                disclaimer: ['xsmall.2', 'xsmall']
                            }
                        ],
                        ['ratio:1x4', { headline: { br: ['over', 'at', 'APR'] }, subHeadline: 'small' }],
                        [
                            'ratio:20x1',
                            {
                                styles: [
                                    '@media (min-aspect-ratio: 200/11) and (max-width: 475px) { .message__headline { font-size: 0.7rem; } }'
                                ]
                            }
                        ],
                        ['color:gray', { logo: gt.PRIMARY.COLOR }],
                        ['color:white', { logo: gt.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: gt.PRIMARY.COLOR }]
                    ]
                },
                ht = {
                    'layout:text': [
                        [
                            'default',
                            {
                                styles: [
                                    '.message__headline > span:first-of-type { text-decoration: underline; color: #0076ff; font-weight: 600; }',
                                    '.message__disclaimer > span { color: #2c2e2f; text-decoration: none; }'
                                ],
                                logo: gt.PRIMARY.COLOR,
                                headline: { tag: 'small', br: ['months', 'APR'] },
                                disclaimer: 'xsmall.2'
                            }
                        ],
                        ['logo.type:primary', { messageWidth: 190 }],
                        [
                            'logo.type:inline',
                            { messageWidth: [255, 1e3], logo: gt.ALT_NO_PP.COLOR, headline: { br: ['APR'] } }
                        ],
                        ['logo.type:none', { messageWidth: [240, 1e3], logo: !1, headline: { br: ['APR'] } }],
                        [
                            'logo.type:alternative',
                            { logo: gt.ALTERNATIVE.COLOR, headline: { replace: [['APR', 'APR.']], br: ['APR.'] } }
                        ],
                        [
                            'text.color:white',
                            {
                                styles: [
                                    '.message__headline > span:first-of-type { text-decoration: underline; color: white; font-weight: 600; }',
                                    '.message__disclaimer > span { color: white; text-decoration: none; }'
                                ]
                            }
                        ],
                        ['text.color:white && logo.type:primary', { logo: gt.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: gt.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: gt.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: gt.PRIMARY.WHITE,
                                headline: { tag: 'small', br: ['months', 'APR'] },
                                disclaimer: ['xsmall.2', 'xsmall']
                            }
                        ],
                        ['ratio:1x4', { headline: { br: ['over', 'at', 'APR'] }, subHeadline: 'small' }],
                        [
                            'ratio:20x1',
                            {
                                styles: [
                                    '@media (min-aspect-ratio: 200/11) and (max-width: 475px) { .message__headline { font-size: 0.7rem; } }'
                                ]
                            }
                        ],
                        ['color:gray', { logo: gt.PRIMARY.COLOR }],
                        ['color:white', { logo: gt.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: gt.PRIMARY.COLOR }]
                    ]
                },
                yt = {
                    'layout:text': [
                        [
                            'default',
                            {
                                styles: [
                                    '.message__headline > span:first-of-type { text-decoration: underline; color: #0076ff; font-weight: 600; }',
                                    '.message__disclaimer > span { color: #2c2e2f; text-decoration: none; }'
                                ],
                                logo: gt.PRIMARY.COLOR,
                                headline: { tag: 'small', br: ['months', 'APR'] },
                                disclaimer: 'xsmall.2'
                            }
                        ],
                        ['logo.type:primary', { messageWidth: 190 }],
                        [
                            'logo.type:inline',
                            { messageWidth: [255, 1e3], logo: gt.ALT_NO_PP.COLOR, headline: { br: ['APR'] } }
                        ],
                        ['logo.type:none', { messageWidth: [240, 1e3], logo: !1, headline: { br: ['APR'] } }],
                        [
                            'logo.type:alternative',
                            { logo: gt.ALTERNATIVE.COLOR, headline: { replace: [['APR', 'APR.']], br: ['APR.'] } }
                        ],
                        [
                            'text.color:white',
                            {
                                styles: [
                                    '.message__headline > span:first-of-type { text-decoration: underline; color: white; font-weight: 600; }',
                                    '.message__disclaimer > span { color: white; text-decoration: none; }'
                                ]
                            }
                        ],
                        ['text.color:white && logo.type:primary', { logo: gt.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: gt.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: gt.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: gt.PRIMARY.WHITE,
                                headline: { tag: 'small', br: ['months', 'APR'] },
                                disclaimer: ['xsmall.2', 'xsmall']
                            }
                        ],
                        ['ratio:1x4', { headline: { br: ['over', 'at', 'APR'] }, subHeadline: 'small' }],
                        [
                            'ratio:20x1',
                            {
                                styles: [
                                    '@media (min-aspect-ratio: 200/11) and (max-width: 475px) { .message__headline { font-size: 0.7rem; } }'
                                ]
                            }
                        ],
                        ['color:gray', { logo: gt.PRIMARY.COLOR }],
                        ['color:white', { logo: gt.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: gt.PRIMARY.COLOR }]
                    ]
                },
                _t = {
                    'layout:text': [
                        [
                            'default',
                            {
                                styles: [
                                    '.message__headline > span:first-of-type { text-decoration: underline; color: #0076ff; font-weight: 600; }',
                                    '.message__disclaimer > span { color: #2c2e2f; text-decoration: none; }'
                                ],
                                logo: gt.PRIMARY.COLOR,
                                headline: { tag: 'small', br: ['months', 'APR'] },
                                disclaimer: 'xsmall.2'
                            }
                        ],
                        ['logo.type:primary', { messageWidth: 190 }],
                        [
                            'logo.type:inline',
                            { messageWidth: [255, 1e3], logo: gt.ALT_NO_PP.COLOR, headline: { br: ['APR'] } }
                        ],
                        ['logo.type:none', { messageWidth: [240, 1e3], logo: !1, headline: { br: ['APR'] } }],
                        [
                            'logo.type:alternative',
                            { logo: gt.ALTERNATIVE.COLOR, headline: { replace: [['APR', 'APR.']], br: ['APR.'] } }
                        ],
                        [
                            'text.color:white',
                            {
                                styles: [
                                    '.message__headline > span:first-of-type { text-decoration: underline; color: white; font-weight: 600; }',
                                    '.message__disclaimer > span { color: white; text-decoration: none; }'
                                ]
                            }
                        ],
                        ['text.color:white && logo.type:primary', { logo: gt.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: gt.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: gt.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: gt.PRIMARY.WHITE,
                                headline: { tag: 'small', br: ['months', 'APR'] },
                                disclaimer: ['xsmall.2', 'xsmall']
                            }
                        ],
                        ['ratio:1x4', { headline: { br: ['over', 'at', 'APR'] }, subHeadline: 'small' }],
                        [
                            'ratio:20x1',
                            {
                                styles: [
                                    '@media (min-aspect-ratio: 200/11) and (max-width: 475px) { .message__headline { font-size: 0.7rem; } }'
                                ]
                            }
                        ],
                        ['color:gray', { logo: gt.PRIMARY.COLOR }],
                        ['color:white', { logo: gt.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: gt.PRIMARY.COLOR }]
                    ]
                };
            function wt(e, n) {
                switch (e) {
                    case 'PALAQ:ANY:EQZ':
                        return _t[n];
                    case 'PALANQ:ANY:EQZ':
                        return yt[n];
                    case 'INST:ANY:EQZ':
                        return ft[n];
                    case 'INST:ANY:GTZ':
                    default:
                        return ht[n];
                }
            }
            function xt(e, n) {
                var t = C()(e, function(e) {
                    var t = e[1];
                    return z()(t, n);
                });
                if (t) return t[0];
                if (ce()(n, '.')) {
                    var o = n.split('.', 1)[0];
                    if (
                        (t = C()(e, function(e) {
                            var n = e[1];
                            return z()(n, o);
                        }))
                    )
                        return t[0];
                }
                return C()(e, function(e) {
                    var n = e[1];
                    return z()(n, 'default');
                })[0];
            }
            function vt(e) {
                return 'object' == typeof HTMLElement
                    ? e instanceof HTMLElement
                    : e && 'object' == typeof e && null !== e && 1 === e.nodeType && 'string' == typeof e.nodeName;
            }
            function bt(e) {
                var n = O()(e.attributes)
                    .filter(function(e) {
                        var n = e.nodeName;
                        return T()(n, 'data-pp-');
                    })
                    .reduce(function(e, n) {
                        var t = n.nodeValue;
                        return t ? H(e, B(n.nodeName.replace('data-pp-', ''), t)) : e;
                    }, {});
                if (
                    !e.firstElementChild ||
                    'SCRIPT' !== e.firstElementChild.tagName ||
                    'text/template' !== e.firstElementChild.getAttribute('type')
                )
                    return n;
                var t = e.firstElementChild.textContent.trim();
                return e.removeChild(e.firstElementChild), H(n, { style: { markup: t } });
            }
            var Rt = w(function(e, n, t) {
                    return n.getElementsByClassName(e + '__' + t)[0];
                }),
                At = w(function(e, n) {
                    var t = document.createElement('style');
                    (t.textContent = n), e.insertBefore(t, e.firstChild);
                }),
                Et = w(function(e, n) {
                    if (Array.isArray(n))
                        n.forEach(function(n) {
                            return e.appendChild(n);
                        });
                    else if (n instanceof HTMLElement) e.appendChild(n);
                    else if ('string' == typeof n) {
                        var t = document.createElement('span');
                        (t.innerHTML = n), e.appendChild(t);
                    } else !1 === n && e.parentNode.removeChild(e);
                }),
                Pt = w(function(e, n) {
                    if (Array.isArray(n))
                        []
                            .concat(n)
                            .reverse()
                            .forEach(function(n) {
                                return e.insertBefore(n, e.firstChild);
                            });
                    else if (n instanceof HTMLElement) e.insertBefore(n, e.firstChild);
                    else if ('string' == typeof n) {
                        var t = document.createElement('span');
                        (t.innerHTML = n), e.insertBefore(t, e.firstChild);
                    } else !1 === n && e.parentNode.removeChild(e);
                }),
                Ot = w(function(e, n, t, o) {
                    if ((void 0 === t && (t = 'PayPal Credit'), 'string' == typeof n)) {
                        var a = new Image();
                        (a.alt = t),
                            (a.className = 'message__logo'),
                            (a.src = n),
                            o && (a.srcset = o),
                            e.appendChild(a);
                    } else if (Array.isArray(n)) {
                        var i = n[0],
                            r = n[1],
                            s = n[2],
                            l = new Image();
                        (l.src = i), (l.alt = t);
                        var c = document.createElement('div');
                        c.className = 'message__logo message__logo--svg';
                        var d = document.createElement('canvas');
                        (d.height = s), (d.width = r), c.appendChild(l), c.appendChild(d), e.appendChild(c);
                    } else e.parentNode.removeChild(e);
                }, 2),
                It = { US: ['with', 'PayPal Credit'], DE: ['with', 'PayPal Ratenzahlung'] },
                Tt = document.createElement('iframe');
            Tt.setAttribute('style', 'opacity: 0; width: 0; height: 0; position: absolute; left: -99999px;');
            var Lt = document.createElement('div');
            Lt.innerHTML = me.a;
            var St = document.createElement('div');
            function Nt(e) {
                return e
                    .reduce(function(e, n) {
                        return [].concat(e, [n, document.createTextNode(' ')]);
                    }, [])
                    .slice(0, -1);
            }
            function Ct(e, n) {
                void 0 === n && (n = {});
                var t,
                    o = (Array.isArray(e) ? e : [e]).map(function(e) {
                        var n = document.createElement('span');
                        return (
                            Array.isArray(e) ? ((n.textContent = e[0]), (n.className = e[1])) : (n.textContent = e), n
                        );
                    });
                return (
                    n.replace &&
                        ((t = n.replace),
                        o.forEach(function(e) {
                            var n = t.reduce(function(e, n) {
                                return e.replace(n[0], n[1]);
                            }, e.textContent);
                            e.textContent = n;
                        })),
                    n.br &&
                        (function(e, t) {
                            var o = [].concat(n.br);
                            t.forEach(function(e) {
                                for (var n = e.textContent, t = []; ce()(n, o[0]); ) t.push(o[0]), o.shift();
                                if (0 === t.length || (1 === t.length && se()(n, t[0]))) return e.classList.add('br');
                                var a = document.createElement('span');
                                (a.textContent = n), (a.className = 'br');
                                var i = t.reduce(
                                    function(e, n) {
                                        var t = (function(e, n) {
                                            var t = e.textContent,
                                                o = t.indexOf(n) + n.length,
                                                a = e.cloneNode();
                                            if (((a.textContent = t.slice(0, o).trim()), t.length !== o)) {
                                                var i = e.cloneNode();
                                                return (i.textContent = t.slice(o).trim()), [a, i];
                                            }
                                            return [a];
                                        })(e[e.length - 1], n);
                                        return [].concat(e.slice(0, -1), t);
                                    },
                                    [a]
                                );
                                return (
                                    (e.innerHTML = ''),
                                    i.forEach(function(n) {
                                        e.appendChild(n), e.appendChild(document.createTextNode(' '));
                                    })
                                );
                            });
                        })(0, o),
                    Nt(o)
                );
            }
            St.innerHTML = pe.a;
            var Mt = w(function(e, n, t) {
                    return (
                        !1 !== t &&
                        ('string' != typeof t && 'object' != typeof t
                            ? null
                            : Nt(
                                  (o = 'string' == typeof t ? [{ tag: t }] : Array.isArray(t) ? t : [t]).map(function(
                                      t
                                  ) {
                                      var i,
                                          r = document.createElement('span');
                                      if ((o.length > 1 && r.setAttribute('class', 'multi'), 'string' == typeof t))
                                          (i = Ct(xt(e[n], t))), r.classList.add('tag--' + t.split('.', 1)[0]);
                                      else {
                                          var s = t.tag,
                                              l = a(t, ['tag']);
                                          (i = Ct(xt(e[n], s), l)), r.classList.add('tag--' + s.split('.', 1)[0]);
                                      }
                                      return (
                                          i.forEach(function(e) {
                                              return r.appendChild(e);
                                          }),
                                          r
                                      );
                                  })
                              ))
                    );
                    var o;
                }),
                zt = w(function(e, n, t) {
                    return t.reduce(
                        function(t, o) {
                            var a = o[0],
                                i = o[1],
                                r = a.split(' && ');
                            return 'default' === a ||
                                r.every(function(n) {
                                    return z()(e, n);
                                })
                                ? n === Array
                                    ? [].concat(t, [i])
                                    : H(t, i)
                                : t;
                        },
                        n === Array ? [] : {}
                    );
                }),
                jt = {
                    getTemplateNode: h(function(e, n) {
                        var t = Y(e, 'style.layout');
                        if ('custom' === t)
                            return (function(e) {
                                var t = n.data,
                                    o = n.meta,
                                    a = n.template,
                                    i = document.createElement('div'),
                                    r = o.offerType;
                                if ('' === a) return i;
                                try {
                                    var s = a.replace(/{{\s*?([^\s]+?)\s*?}}/g, function(e, n) {
                                        var o = n.split('.'),
                                            a = o[0],
                                            i = o.slice(1).join('.');
                                        if ('logo' === a) {
                                            var r = document.createElement('div');
                                            return Ot(r, Y(tt, i.toUpperCase()), 'PayPal Credit logo'), r.innerHTML;
                                        }
                                        return Ct(xt(t[a], i)).reduce(function(e, n) {
                                            return '' + e + (n.outerHTML || ' ');
                                        }, '');
                                    });
                                    (i.innerHTML = s),
                                        C()(O()(i.children), function(e) {
                                            return 'STYLE' !== e.tagName;
                                        }).classList.add('offer--' + r.replace(/:/g, '-').toLowerCase());
                                } catch (e) {}
                                return i;
                            })();
                        var o = Y(e, 'style._flattened'),
                            a = Y(n, 'meta.offerType'),
                            i = Y(n, 'data'),
                            r = Y(e, 'country');
                        if ('legacy' === t) {
                            var s = Y(e, 'style.typeNI'),
                                l = Y(e, 'style.typeEZP'),
                                c = 'NI' === a.split(':')[0] ? s : l;
                            if ('image' === c)
                                return (function(e, t) {
                                    var o = n.meta,
                                        a = St.cloneNode(!0),
                                        i = Rt('pp-legacy', a),
                                        r = ['link', 'pixel'].map(i),
                                        s = r[0],
                                        l = r[1],
                                        c = Y(e, 'size'),
                                        d = Y(e, 'color'),
                                        m = Y(e, 'border');
                                    s.setAttribute('href', o.clickUrl), l.setAttribute('href', o.impressionUrl);
                                    var u = 'https://www.paypalobjects.com/upstream/assets/messaging/legacy',
                                        p = 'none' === d ? '' : '-' + d + (!0 === m ? '' : '-no-border'),
                                        g = ('none' === d ? 'v1' : 'v2') + '/' + c.replace(/x/, '-') + p,
                                        f = [1, 1.5, 2].map(function(e) {
                                            return u + '/' + g + '@' + e + 'x.png ' + e + 'x';
                                        });
                                    return Ot(s, u + '/' + g + '@1x.png', 'PayPal Credit Message', f.join(', ')), a;
                                })(e.style);
                            if (!c) throw new Error(U.MESSAGE_INVALID_LEGACY);
                        }
                        var d = zt(o),
                            m = d(
                                Object,
                                (function(e, n, t) {
                                    if (
                                        !Object({
                                            __VERSION__: '1.1.1',
                                            __BANNER_URL__: 'https://www.paypal.com/imadserver/upstream',
                                            __MODAL_URL__:
                                                'https://www.paypalobjects.com/upstream/assets/messaging/modal',
                                            __LOGGING_URL__: 'https://www.paypal.com/ppcredit/messagingLogger',
                                            __TERMS_URL__: 'https://www.paypal.com/ppcredit/finance/terms',
                                            __LEGACY__: !1,
                                            __DEMO__: !1,
                                            __SDK__: !1
                                        }).__LOCALE__
                                    )
                                        switch (e) {
                                            case 'DE':
                                                return wt(n, t);
                                            case 'US':
                                            default:
                                                return pt(n, t);
                                        }
                                    return 'DE' ===
                                        Object({
                                            __VERSION__: '1.1.1',
                                            __BANNER_URL__: 'https://www.paypal.com/imadserver/upstream',
                                            __MODAL_URL__:
                                                'https://www.paypalobjects.com/upstream/assets/messaging/modal',
                                            __LOGGING_URL__: 'https://www.paypal.com/ppcredit/messagingLogger',
                                            __TERMS_URL__: 'https://www.paypal.com/ppcredit/finance/terms',
                                            __LEGACY__: !1,
                                            __DEMO__: !1,
                                            __SDK__: !1
                                        }).__LOCALE__
                                        ? wt(n, t)
                                        : 'US' ===
                                          Object({
                                              __VERSION__: '1.1.1',
                                              __BANNER_URL__: 'https://www.paypal.com/imadserver/upstream',
                                              __MODAL_URL__:
                                                  'https://www.paypalobjects.com/upstream/assets/messaging/modal',
                                              __LOGGING_URL__: 'https://www.paypal.com/ppcredit/messagingLogger',
                                              __TERMS_URL__: 'https://www.paypal.com/ppcredit/finance/terms',
                                              __LEGACY__: !1,
                                              __DEMO__: !1,
                                              __SDK__: !1
                                          }).__LOCALE__
                                        ? pt(n, t)
                                        : null;
                                })(r, a, 'layout:' + t)
                            ),
                            u = d(Array, nt['layout:' + t]),
                            p = Mt(i),
                            g = Lt.cloneNode(!0),
                            f = Rt('message', g),
                            h = ['logo-container', 'headline', 'sub-headline', 'disclaimer'].map(f),
                            y = h[0],
                            _ = h[1],
                            w = h[2],
                            x = h[3];
                        if (
                            (Et(_, p('headline', m.headline)),
                            Et(w, p('subHeadline', m.subHeadline)),
                            Pt(x, p('disclaimer', m.disclaimer)),
                            Ot(y, m.logo, 'PayPal Credit logo'),
                            'inline' === Y(e, 'style.logo.type') && _.appendChild(y),
                            'none' === Y(e, 'style.logo.type'))
                        ) {
                            var v = It[r] || It.default,
                                b = v[0],
                                R = v[1],
                                A = document.createElement('span');
                            A.textContent = b + ' ';
                            var E = document.createElement('strong');
                            (E.textContent = R),
                                A.appendChild(E),
                                _.appendChild(document.createTextNode(' ')),
                                _.appendChild(A);
                        }
                        m.messageWidth &&
                            ('number' == typeof m.messageWidth
                                ? u.push('.message__messaging { width: ' + m.messageWidth + 'px }')
                                : Array.isArray(m.messageWidth) &&
                                  u.push(
                                      '.message__messaging { min-width: ' +
                                          m.messageWidth[0] +
                                          'px; max-width: ' +
                                          m.messageWidth[1] +
                                          'px }'
                                  ));
                        var P = function(n) {
                            return 'legacy' === t ? n.replace(/\.message/g, '[data-pp-id="' + e.id + '"] .message') : n;
                        };
                        return (
                            m.styles && At(g, P(m.styles.join(''))),
                            At(g, P(u.join('\n'))),
                            (g.width = (function(e) {
                                document.body.appendChild(Tt),
                                    Tt.contentWindow.document.body.appendChild(
                                        Tt.contentWindow.document.importNode(e, !0)
                                    ),
                                    O()(Tt.contentWindow.document.getElementsByTagName('style')).forEach(function(e) {
                                        var n = Tt.contentWindow.document.createElement('style');
                                        (n.textContent = e.textContent),
                                            e.parentNode.insertBefore(n, e),
                                            e.parentNode.removeChild(e);
                                    });
                                var n = Tt.contentWindow.document.querySelector('.message__content'),
                                    t = window.getComputedStyle(n),
                                    o = O()(n.children),
                                    a = [
                                        'margin-left',
                                        'border-left-width',
                                        'padding-left',
                                        'width',
                                        'padding-right',
                                        'border-right-width',
                                        'margin-right'
                                    ],
                                    i = ce()(t.getPropertyValue('display'), 'flex')
                                        ? Math.round(
                                              o.reduce(function(e, n) {
                                                  var t = window.getComputedStyle(n);
                                                  return (
                                                      e +
                                                      a.reduce(function(e, n) {
                                                          return e + parseFloat(t.getPropertyValue(n));
                                                      }, 0)
                                                  );
                                              }, 0)
                                          )
                                        : Math.max.apply(
                                              Math,
                                              o.map(function(e) {
                                                  var n = window.getComputedStyle(e);
                                                  return Math.round(
                                                      a.reduce(function(e, t) {
                                                          return e + parseFloat(n.getPropertyValue(t));
                                                      }, 0)
                                                  );
                                              })
                                          );
                                return document.body.removeChild(Tt), i;
                            })(g)),
                            g
                        );
                    })
                },
                kt = w(function(e, n) {
                    var t = n.markup,
                        a = n.options;
                    return new p(function(n) {
                        var i, r, s, l;
                        'string' == typeof t
                            ? (((i = document.createElement('div')).innerHTML = t), (r = {}))
                            : ((i = jt.getTemplateNode(a, t)), (r = o({}, t.meta, { minWidth: i.width }))),
                            'IFRAME' === e.tagName
                                ? ((s = e.contentWindow.document.importNode(i, !0)), (l = e.contentWindow.document))
                                : ((s = i.cloneNode(!0)), (l = document));
                        var c = O()(s.getElementsByTagName('img'))
                            .filter(function(e) {
                                return !e.complete;
                            })
                            .map(function(e) {
                                return new p(function(n) {
                                    return e.addEventListener('load', n);
                                });
                            });
                        O()(s.getElementsByTagName('style')).forEach(function(e) {
                            var n = l.createElement('style');
                            (n.textContent = e.textContent),
                                e.parentNode.insertBefore(n, e),
                                e.parentNode.removeChild(e);
                        }),
                            O()(s.getElementsByTagName('script')).forEach(function(e) {
                                var n = l.createElement('script');
                                (n.text = e.text), e.parentNode.insertBefore(n, e), e.parentNode.removeChild(e);
                            }),
                            p.all(c).then(function() {
                                requestAnimationFrame(function() {
                                    for (var t = 'IFRAME' === e.tagName ? l.body : e; t.firstChild; )
                                        t.removeChild(t.firstChild);
                                    O()(s.children).forEach(function(e) {
                                        return t.appendChild(e);
                                    }),
                                        n({ meta: o({}, r, {}, (l !== document && l.defaultView.meta) || {}) });
                                });
                            });
                    });
                });
            function Wt(e) {
                var n = e.getBoundingClientRect(),
                    t = (n.top + n.bottom) / 2,
                    o = (n.left + n.right) / 2;
                return !(t > window.innerHeight || t < 0 || o > window.innerWidth || o < 0);
            }
            var Ht = w(function(e, n) {
                    var t = n.options.amount,
                        o = n.events,
                        a = n.track,
                        i = e.getBoundingClientRect(),
                        r = {
                            et: 'CLIENT_IMPRESSION',
                            event_type: 'stats',
                            pos_x: Math.round(i.left),
                            pos_y: Math.round(i.top),
                            browser_width: window.innerWidth,
                            browser_height: window.innerHeight,
                            visible: Wt(e),
                            amount: t
                        };
                    r.visible ||
                        o.on('scroll', function() {
                            Wt(e) &&
                                (o.clear('scroll'), a({ et: 'CLIENT_IMPRESSION', event_type: 'scroll', visible: !0 }));
                        }),
                        (function() {
                            var e = window.document.body.appendChild(window.document.createElement('div'));
                            e.setAttribute(
                                'class',
                                'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links'
                            ),
                                e.setAttribute(
                                    'style',
                                    'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;'
                                );
                            var n = void 0 !== window.getComputedStyle ? window.getComputedStyle(e) : void 0;
                            return new p(function(t) {
                                !(function o(a) {
                                    return a <= 0
                                        ? (window.document.body.removeChild(e), t(!1))
                                        : null !== window.document.body.getAttribute('abp') ||
                                          (n &&
                                              ('none' === n.getPropertyValue('display') ||
                                                  'hidden' === n.getPropertyValue('visibility'))) ||
                                          null === e.offsetParent ||
                                          0 === e.offsetHeight ||
                                          0 === e.offsetLeft ||
                                          0 === e.offsetTop ||
                                          0 === e.offsetWidth ||
                                          0 === e.clientHeight ||
                                          0 === e.clientWidth
                                        ? (window.document.body.removeChild(e), t(!0))
                                        : setTimeout(function() {
                                              o(a - 1);
                                          }, 50);
                                })(5);
                            });
                        })().then(function(n) {
                            (r.adblock = n),
                                (r.blocked = (function(e) {
                                    if ('function' == typeof window.getComputedStyle) {
                                        var n = window.getComputedStyle(e);
                                        if (
                                            'none' === n.getPropertyValue('display') ||
                                            'hidden' === n.getPropertyValue('visibility') ||
                                            'auto' !== n.getPropertyValue('clip')
                                        )
                                            return !0;
                                    }
                                    var t = e.getBoundingClientRect();
                                    return (
                                        t.left > window.document.body.scrollWidth ||
                                        t.right < 0 ||
                                        t.top > window.document.body.scrollHeight ||
                                        t.bottom < 0 ||
                                        0 === e.offsetWidth ||
                                        0 === e.offsetHeight
                                    );
                                })(e)),
                                a(r, e.hasAttribute('data-pp-message-hidden')),
                                a('MORS_IMPRESSION');
                        }),
                        o.on('click', function() {
                            a({ et: 'CLICK', event_type: 'click', link: 'Banner Wrapper' }), a('MORS_CLICK');
                        }),
                        o.on('hover', function() {
                            a({ et: 'CLIENT_IMPRESSION', event_type: 'hover' }), o.clear('hover');
                        });
                }),
                Yt = {
                    '1x1': [{ ratio: '1x1', width: [120, 300] }],
                    '1x4': [{ ratio: '1x2', width: [160, 160] }, { ratio: '1x4', breakpoint: 768 }],
                    '8x1': [{ ratio: '6x1', width: [250, 768] }, { ratio: '8x1', breakpoint: 768 }],
                    '20x1': [
                        { ratio: '6x1', width: [250, 768] },
                        { ratio: '20x1', width: [350, 1169], breakpoint: 768 }
                    ]
                };
            function Bt(e) {
                if ('number' == typeof e) return e + 'px';
                if ('string' == typeof e) {
                    var n = e.match(/^(\d+)x(\d+)$/);
                    if (n)
                        return (
                            100 *
                                n.slice(1).reduce(function(e, n) {
                                    return +n / +e;
                                }) +
                            '%'
                        );
                }
                return e;
            }
            function Dt(e) {
                var n = e.split(/(?=[@[])/),
                    t = n[0],
                    o = n.slice(1);
                return t.match(/\d+x\d+/)
                    ? o.reduce(
                          function(e, n) {
                              return (
                                  T()(n, '@')
                                      ? (e.breakpoint = n.slice(1))
                                      : T()(n, '[') && (e.width = n.slice(1, -1).split(',')),
                                  e
                              );
                          },
                          { ratio: t }
                      )
                    : {};
            }
            var Gt = w(function(e, n) {
                var t = n.wrapper,
                    o = n.options,
                    a = n.logger,
                    i = n.meta;
                if ('IFRAME' === e.tagName) {
                    var r,
                        s,
                        l = Y(o, 'style.layout'),
                        c = Y(o, 'style.ratio');
                    if (('flex' !== l && 'custom' !== l) || !c) {
                        var d = i.minWidth || 0;
                        e.setAttribute('style', 'width: 100%; border: none; min-width: ' + d + 'px;'),
                            t.removeAttribute('class');
                        var m = (function(e) {
                                var n = document.createElement('div');
                                n.setAttribute('style', 'width: 100%; overflow: hidden');
                                var t = document.createElement('div');
                                t.setAttribute('style', 'width: 10000px'),
                                    n.appendChild(t),
                                    e.parentNode.appendChild(n);
                                var o = n.offsetWidth;
                                return e.parentNode.removeChild(n), o;
                            })(t),
                            u = function() {
                                e.setAttribute('height', e.contentWindow.document.body.lastChild.offsetHeight);
                            };
                        if (m < d && 'custom' !== l) {
                            if ('top' !== Y(o, 'style.logo.position') || 'primary' !== Y(o, 'style.logo.type'))
                                throw (a.warn(
                                    'Message Overflow. PayPal Credit Message of layout type ' +
                                        Y(o, 'style.layout') +
                                        ' requires a width of at least ' +
                                        d +
                                        'px. Current container is ' +
                                        m +
                                        'px. Attempting fallback message.'
                                ),
                                (r = function() {
                                    t.parentNode.setAttribute('data-pp-style-layout', 'text'),
                                        t.parentNode.setAttribute('data-pp-style-logo-type', 'primary'),
                                        t.parentNode.setAttribute('data-pp-style-logo-position', 'top');
                                }),
                                ((s = new Error(U.MESSAGE_OVERFLOW)).onEnd = r),
                                s);
                            a.error({ name: U.MESSAGE_HIDDEN }),
                                a.warn(
                                    'Message hidden. PayPal Credit Message fallback requires minimum width of ' +
                                        d +
                                        'px. Current container is ' +
                                        m +
                                        'px. Message hidden.'
                                ),
                                e.setAttribute('data-pp-message-hidden', 'true');
                        } else u(), ie(e).on('resize', u);
                    } else
                        !(function(e, n, t) {
                            var o = [];
                            'flex' === t
                                ? (o = Yt[n])
                                : Array.isArray(n)
                                ? (o = n.map(Dt))
                                : 'string' == typeof n && (o = [Dt(n)]);
                            var a = 'pp-flex--' + o.slice(-1)[0].ratio,
                                i = o.reduce(function(e, n) {
                                    var t = n.breakpoint,
                                        o = n.ratio,
                                        i = n.width;
                                    return '' === e
                                        ? '\n                .' +
                                              a +
                                              ' {\n                    display: block;\n                    width: 100%;\n                    ' +
                                              (Array.isArray(i)
                                                  ? '\n                                min-width: ' +
                                                    Bt(i[0]) +
                                                    ';\n                                max-width: ' +
                                                    Bt(i[1]) +
                                                    ';'
                                                  : '') +
                                              '\n                    box-sizing: border-box;\n                    position: relative;\n                }\n        \n                .' +
                                              a +
                                              '::before {\n                    padding-top: ' +
                                              Bt(o) +
                                              ";\n                    content: '';\n                    display: block;\n                }\n        \n                ." +
                                              a +
                                              ' iframe {\n                    position: absolute;\n                    top: 0;\n                    left: 0;\n                    width: 100%;\n                    height: 100%;\n                }\n            '
                                        : t
                                        ? '\n            ' +
                                          e +
                                          '\n            @media (min-width: ' +
                                          Bt(t) +
                                          ') {\n                ' +
                                          (Array.isArray(i)
                                              ? '\n                            .' +
                                                a +
                                                ' {\n                                min-width: ' +
                                                Bt(i[0]) +
                                                ';\n                                max-width: ' +
                                                Bt(i[1]) +
                                                ';\n                            }'
                                              : '') +
                                          '\n                .' +
                                          a +
                                          '::before {\n                    padding-top: ' +
                                          Bt(o) +
                                          ';\n                }\n            }\n        '
                                        : e;
                                }, ''),
                                r = document.createElement('style');
                            (r.textContent = i), e.setAttribute('class', a), e.appendChild(r);
                        })(t, c, l),
                            e.setAttribute('style', 'width: 100%; border: none;'),
                            e.removeAttribute('height');
                }
            });
            function Ut(e) {
                var n = document.createElement(e);
                'iframe' === e &&
                    (n.setAttribute('title', 'PayPal Credit Promotion Message'),
                    n.setAttribute('style', 'width: 100%; border: none;'),
                    n.setAttribute('src', 'about:blank'),
                    n.setAttribute('height', 0));
                var t = k()({ insertMarkup: kt, setSize: Gt, runStats: Ht, events: ie }).reduce(function(e, t) {
                    var a;
                    return o({}, e, (((a = {})[t[0]] = (0, t[1])(n)), a));
                }, {});
                return (
                    (t.clearEvents = function() {
                        return (function(e) {
                            X()(ee).forEach(function(n) {
                                return n.delete(e);
                            }),
                                0 === ee.scroll.size && window.removeEventListener('scroll', te),
                                0 === ee.hover.size && document.removeEventListener('mouseover', oe),
                                'IFRAME' === e.tagName
                                    ? (e.contentWindow.removeEventListener('resize', ne),
                                      e.contentWindow.document.body.removeEventListener('click', ae))
                                    : e.removeEventListener('click', ae);
                        })(n);
                    }),
                    [n, t]
                );
            }
            var Vt = t(22),
                Ft = t.n(Vt),
                Zt = {
                    ANY: 'ANY',
                    STRING: 'STRING',
                    BOOLEAN: 'BOOLEAN',
                    NUMBER: 'NUMBER',
                    FUNCTION: 'FUNCTION',
                    OBJECT: 'OBJECT'
                },
                Jt = { id: [Zt.STRING], _legacy: [Zt.BOOLEAN], onRender: [Zt.FUNCTION] },
                qt = {
                    US: {
                        text: {
                            logo: {
                                type: [Zt.STRING, ['primary', 'alternative', 'inline', 'none']],
                                position: [Zt.STRING, ['left', 'right', 'top']]
                            },
                            text: { color: [Zt.STRING, ['black', 'white']] }
                        },
                        flex: {
                            color: [Zt.STRING, ['blue', 'black', 'white', 'white-no-border', 'gray|grey']],
                            ratio: [Zt.STRING, ['1x1', '1x4', '8x1', '20x1']]
                        },
                        legacy: {
                            typeNI: [Zt.STRING, ['', 'image', 'html']],
                            typeEZP: [Zt.STRING, ['', 'html']],
                            size: [Zt.STRING],
                            color: [Zt.STRING, ['none', 'blue', 'black', 'gray|grey', 'white']],
                            border: [Zt.BOOLEAN, [!0, !1]]
                        },
                        custom: { markup: [Zt.STRING], ratio: [Zt.ANY] }
                    },
                    DE: {
                        text: {
                            logo: { type: [Zt.STRING, ['primary', 'alternative', 'inline', 'none']] },
                            text: { color: [Zt.STRING, ['black', 'white']] }
                        },
                        flex: {
                            color: [Zt.STRING, ['blue', 'black', 'white', 'white-no-border', 'gray|grey']],
                            ratio: [Zt.STRING, ['1x1', '1x4', '8x1', '20x1']]
                        },
                        custom: { markup: [Zt.STRING], ratio: [Zt.ANY] }
                    }
                },
                Kt = function(e, n, t) {
                    return e.warn('Invalid option value (' + n + '). ' + t);
                },
                Qt = function(e, n, t, o) {
                    return Kt(e, n, 'Expected type "' + t.toLowerCase() + '" but instead received "' + typeof o + '".');
                },
                $t = function(e, n, t, o) {
                    return Kt(
                        e,
                        n,
                        'Expected one of ["' + t.join('", "').replace(/\|[\w|]+/g, '') + '"] but received "' + o + '".'
                    );
                };
            function Xt(e, n) {
                switch (e) {
                    case Zt.STRING:
                        return 'string' == typeof n;
                    case Zt.BOOLEAN:
                        return 'boolean' == typeof n;
                    case Zt.NUMBER:
                        return 'number' == typeof n && !Ft()(n);
                    case Zt.FUNCTION:
                        return 'function' == typeof n;
                    case Zt.OBJECT:
                        return 'object' == typeof n && null !== n;
                    case Zt.ANY:
                        return !0;
                    default:
                        return !1;
                }
            }
            function eo(e, n, t, a) {
                return (
                    void 0 === a && (a = 'style.'),
                    k()(n).reduce(function(i, r) {
                        var s,
                            l = r[0],
                            c = r[1];
                        if (Array.isArray(c)) {
                            var d,
                                m = (function(e, n, t, o) {
                                    var a = n[0],
                                        i = n[1],
                                        r = void 0 === i ? [] : i;
                                    if (void 0 === t) return r[0];
                                    if (Xt(a, t)) {
                                        if (a === Zt.STRING && r.length > 0) {
                                            var s = C()(r, function(e) {
                                                return e.split('|').some(function(e) {
                                                    return e === t;
                                                });
                                            });
                                            return void 0 === s
                                                ? ($t(e, o, r, t), r[0].split('|')[0])
                                                : s.split('|')[0];
                                        }
                                        return t;
                                    }
                                    return Qt(e, o, a, t), r[0];
                                })(e, c, t[l], '' + a + l);
                            return void 0 === m ? i : o({}, i, (((d = {})[l] = m), d));
                        }
                        return o({}, i, (((s = {})[l] = eo(e, n[l], t[l] || {}, '' + a + l + '.')), s));
                    }, {})
                );
            }
            function no(e, n, t) {
                return o({ layout: t.layout }, eo(e, n[t.layout], t));
            }
            var to = w(function(e, n) {
                    var t = n.account,
                        o = n.amount,
                        i = n.country,
                        r = n.style,
                        s = a(n, ['account', 'amount', 'country', 'style']),
                        l = eo(e, Jt, s, '');
                    if (
                        (Xt(Zt.STRING, t)
                            ? 13 === t.length || 10 === t.length || T()(t, 'client-id:')
                                ? (l.account = t)
                                : Kt(e, 'account', 'Ensure the correct Merchant Account ID has been entered.')
                            : Qt(e, 'account', Zt.STRING, t),
                        void 0 !== o)
                    ) {
                        var c = Number(o);
                        Xt(Zt.NUMBER, c)
                            ? c < 0
                                ? Kt(e, 'amount', 'Ensure value is a positive number.')
                                : (l.amount = c)
                            : Qt(e, 'amount', Zt.NUMBER, o);
                    }
                    Xt(Zt.STRING, i)
                        ? 2 !== i.length
                            ? Kt(e, 'country', 'Country code should be 2 characters.')
                            : qt[i]
                            ? (l.country = i)
                            : $t(e, 'country', Object.keys(qt), i)
                        : Qt(e, 'country', Zt.STRING, i),
                        l.country || (l.country = 'US');
                    var d = qt[l.country];
                    return (
                        Xt(Zt.OBJECT, r) && Xt(Zt.STRING, r.layout) && d[r.layout]
                            ? (l.style = no(e, d, r))
                            : (Xt(Zt.OBJECT, r)
                                  ? $t(e, 'style.layout', Object.keys(d), r.layout)
                                  : void 0 !== r && Qt(e, 'style', Zt.OBJECT, r),
                              (l.style = no(e, d, { layout: 'text' }))),
                        e.info(G.VALIDATE, { options: W(l) }),
                        l
                    );
                }),
                oo = y(
                    function(e) {
                        var n = e.offerType;
                        return new p(function(e, t) {
                            var o = new XMLHttpRequest();
                            (o.onreadystatechange = function() {
                                if (4 === o.readyState)
                                    switch (o.status) {
                                        case 200:
                                            e({ markup: o.responseText });
                                            break;
                                        default:
                                            t();
                                    }
                            }),
                                o.open(
                                    'GET',
                                    (function(e) {
                                        return (
                                            'https://www.paypalobjects.com/upstream/assets/messaging/modal/' +
                                            (T()(e, 'NI') ? 'ni' : 'ezp') +
                                            '.html'
                                        );
                                    })(n),
                                    !0
                                ),
                                o.send();
                        });
                    },
                    ['offerType']
                ),
                ao = y(
                    function(e) {
                        return new p(function(n) {
                            var t,
                                o,
                                a,
                                i,
                                r = new XMLHttpRequest();
                            (r.onreadystatechange = function() {
                                if (4 === r.readyState)
                                    switch (r.status) {
                                        case 200:
                                            n(JSON.parse(r.responseText));
                                            break;
                                        default:
                                            n({ error: !0 });
                                    }
                            }),
                                r.open(
                                    'GET',
                                    ((o = (t = e).account),
                                    (a = t.amount),
                                    (i = ['json=true', T()(o, 'client-id') ? 'cid=' + o.slice(10) : 'mid=' + o]).push(
                                        'country=US'
                                    ),
                                    i.push('currency=USD'),
                                    a && i.push('amount=' + a),
                                    'https://www.paypal.com/ppcredit/finance/terms?' + i.join('&')),
                                    !0
                                ),
                                r.send();
                        });
                    },
                    ['account', 'amount']
                ),
                io = function(e, n) {
                    return 'INST' === n.type
                        ? '<tr>\n            ' +
                              ('pala' === e.type
                                  ? n.monthly && !n.isNonQualified
                                      ? '<td>$' + n.monthly + '</td>'
                                      : '<td> - </td>'
                                  : '') +
                              '\n            <td>' +
                              n.term +
                              '</td>\n            <td>$' +
                              n.minValue +
                              '</td>\n            <td>' +
                              n.apr +
                              '%</td>\n            ' +
                              ('pala' === e.type
                                  ? n.total && !n.isNonQualified
                                      ? '<td>$' + n.total + '</td>'
                                      : '<td> - </td>'
                                  : '') +
                              '\n        </tr>'
                        : '';
                },
                ro = function(e) {
                    return e.max_amount !== e.default_max_amount
                        ? '<div style="text-align: center; padding-bottom: 15px; display: table; padding-top: 10px; "><span style="display: inline-block; vertical-align: middle; "><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19"><path fill="none" fill-rule="evenodd" stroke="#9DA3A6" stroke-linecap="round" stroke-linejoin="round" d="M9.526 10.474v7.579c4.71-.034 8.527-3.817 8.527-8.527a8.526 8.526 0 1 0-11.834 7.862"></path></svg></span><p style="display: inline; font-size: 13px; color: #2c2e2f; padding-left: 5px; font-family: PayPalSansSmall; font-weight: 400 ">$' +
                              e.max_amount +
                              ' is the maximum amount to be eligible for Easy Payments. Enter an amount of $' +
                              e.max_amount +
                              ' or less.</p></div>'
                        : '<p style="text-align: center">No offers are available for this amount. Please enter a new amount.</p>';
                };
            function so(e, n) {
                var t = e.contentDocument.getElementById('content-wrapper'),
                    a = e.contentDocument.getElementById('modal__overlay'),
                    i = e.contentDocument.getElementById('close-btn'),
                    r = e.contentDocument.getElementById('header'),
                    s = e.contentDocument.getElementsByClassName('accordion'),
                    l = e.contentDocument.getElementById('modal-container'),
                    c = e.contentDocument.getElementsByClassName('modal__header-container')[0],
                    d = e.contentDocument.getElementsByTagName('a');
                return o(
                    {
                        window: e.contentWindow,
                        contentWrapper: t,
                        overlay: a,
                        closeButton: i,
                        header: r,
                        accordions: s,
                        modalContainer: l,
                        headerContainer: c,
                        landerLinks: d
                    },
                    (function(e, n) {
                        return 'EZP' !== n
                            ? {}
                            : {
                                  ezpTab: e.contentDocument.getElementById('ezp-tab'),
                                  niTab: e.contentDocument.getElementById('ni-tab'),
                                  ezpContent: e.contentDocument.getElementById('ezp-content'),
                                  niContent: e.contentDocument.getElementById('ni-content'),
                                  calculateButton: e.contentDocument.getElementById('calculate-ezp'),
                                  amountInput: e.contentDocument.getElementById('number-input'),
                                  loader: e.contentDocument.getElementById('loading-image'),
                                  financeTermsTable: e.contentDocument.getElementById('financing-terms')
                              };
                    })(e, n)
                );
            }
            var lo = y(
                    function(e) {
                        var n = window.top.document.createElement('div');
                        n.setAttribute('data-pp-id', A.nextId);
                        var t = Ut('iframe'),
                            a = t[0],
                            i = t[1].insertMarkup,
                            r = (function() {
                                var e = window.parent.document.head,
                                    n = window.parent.document.body,
                                    t = (function() {
                                        var t = window.parent.document.getElementsByName('viewport')[0];
                                        if (void 0 === t) {
                                            var o = document.createElement('meta');
                                            return (o.name = 'viewport'), (o.content = ''), e.appendChild(o), o;
                                        }
                                        return n.contains(t) && e.appendChild(t), t;
                                    })(),
                                    o = document.createElement('meta');
                                (o.name = 'viewport'),
                                    (o.content =
                                        'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui, shrink-to-fit=no');
                                var a = n.getAttribute('style');
                                return [
                                    function() {
                                        e.contains(t) && (e.removeChild(t), e.appendChild(o)),
                                            (n.style.overflow = 'hidden'),
                                            (n.style.msOverflowStyle = 'scrollbar');
                                    },
                                    function() {
                                        e.contains(o) && (e.removeChild(o), e.appendChild(t)),
                                            a ? n.setAttribute('style', a) : n.removeAttribute('style');
                                    }
                                ];
                            })(),
                            s = r[0],
                            l = r[1],
                            c = e.track,
                            d = e.clickUrl,
                            m = b({ status: 'CLOSED' }),
                            u = m[0],
                            g = m[1],
                            f = V.create({ id: A.nextId, account: e.account, selector: '__internal__', type: 'Modal' });
                        function h() {
                            return T()(e.offerType, 'NI') ? 'NI' : 'EZP';
                        }
                        E({ nextId: (A.nextId += 1) });
                        var y = function(e, n, t) {
                            return c({
                                et: 'modal-open' === e ? 'CLIENT_IMPRESSION' : 'CLICK',
                                link: n,
                                amount: t,
                                modal: h(),
                                event_type: e
                            });
                        };
                        function _() {
                            O()(u.elements.accordions).forEach(function(e) {
                                e.classList.remove('show'),
                                    e
                                        .getElementsByClassName('accordion-content')[0]
                                        .style.setProperty('max-height', null);
                            });
                        }
                        function w(e, n) {
                            var t = {
                                    'NI Tab': [u.elements.niTab, u.elements.niContent],
                                    'EZP Tab': [u.elements.ezpTab, u.elements.ezpContent]
                                },
                                o = t[e][0];
                            X()(t).forEach(function(e) {
                                var n = e[0],
                                    t = e[1];
                                n.classList.toggle('selected', n === o), t.classList.toggle('show', n === o);
                            }),
                                n || y('modal-tab', e),
                                _();
                        }
                        function x() {
                            return u.error ? I(!0) : u.modalProm;
                        }
                        function v(e) {
                            return new p(function(t, o) {
                                'OPEN' === u.status || 'OPENING' === u.status
                                    ? (g({ status: 'CLOSING' }),
                                      u.elements.modalContainer.classList.remove('show'),
                                      setTimeout(function() {
                                          (n.style.display = 'none'),
                                              a.blur(),
                                              g({ status: 'CLOSED' }),
                                              l(),
                                              'EZP' === h() &&
                                                  setTimeout(function() {
                                                      w('EZP Tab', !0);
                                                  }, 350),
                                              t();
                                      }, e || 0))
                                    : o();
                            });
                        }
                        function R(e) {
                            v(350), y('modal-close', e);
                        }
                        function P(n) {
                            var t = +n;
                            return (
                                Ft()(t) || (u.elements.amountInput.value = t.toFixed(2)),
                                u.elements.loader.style.setProperty('opacity', 1),
                                u.elements.financeTermsTable.style.setProperty('opacity', 0.4),
                                ao(o({}, e, { amount: n })).then(function(e) {
                                    u.elements.loader.style.setProperty('opacity', 0),
                                        u.elements.financeTermsTable.style.setProperty('opacity', 1),
                                        (u.elements.financeTermsTable.innerHTML = (function(e) {
                                            return e.error
                                                ? '<h3 id="terms-error"> There was an error retrieving your payment options for this purchase. Please try again later. </h3>'
                                                : +e.amount < e.min_amount && 'pala' === e.type
                                                ? '<div style="text-align: center; padding-bottom: 15px; display: table; padding-top: 10px; "><span style="display: inline-block; vertical-align: middle; "><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19"><path fill="none" fill-rule="evenodd" stroke="#9DA3A6" stroke-linecap="round" stroke-linejoin="round" d="M9.526 10.474v7.579c4.71-.034 8.527-3.817 8.527-8.527a8.526 8.526 0 1 0-11.834 7.862"></path></svg></span><p style="display: inline; font-size: 13px; color: #2c2e2f; padding-left: 5px; font-family: PayPalSansSmall; font-weight: 400 ">$' +
                                                  e.min_amount +
                                                  ' is the minimum amount to be eligible for Easy Payments. Enter an amount of $' +
                                                  e.min_amount +
                                                  ' or more.</p></div>'
                                                : '\n        <table>\n            <thead>\n                <tr>\n                    ' +
                                                  ('pala' === e.type ? '<th>Monthly<br>Payments</th>' : '') +
                                                  '\n                    <th>Payments</th>\n                    <th>Minimum<br>Purchase</th>\n                    <th>APR</th>\n                    ' +
                                                  ('pala' === e.type ? '<th>Total w/<br>Interest</th>' : '') +
                                                  '\n                </tr>\n            </thead>\n            <tbody>\n            ' +
                                                  (e.options && e.options.length > 0 && 'N/A' !== e.options
                                                      ? e.options
                                                            .map(function(n) {
                                                                return io(e, n);
                                                            })
                                                            .join('')
                                                      : '') +
                                                  '\n            </tbody>\n        </table>\n        ' +
                                                  (e.options && 0 !== e.options.length && 'N/A' !== e.options
                                                      ? ''
                                                      : ro(e)) +
                                                  '\n        <p id="terms-note">The monthly payment shown is an estimated amount and may not include taxes and shipping</p>\n    ';
                                        })(e));
                                })
                            );
                        }
                        function I(n) {
                            return (
                                void 0 === n && (n = !1),
                                f.start({
                                    options: {
                                        account: e.account,
                                        offerType: e.offerType,
                                        amount: e.amount,
                                        message_id: e.id
                                    }
                                }),
                                oo(e, n)
                                    .then(i)
                                    .then(function() {
                                        g({ elements: so(a, h()) }),
                                            (function() {
                                                u.elements.closeButton.addEventListener('click', function() {
                                                    R('Close Button');
                                                }),
                                                    u.elements.overlay.addEventListener('click', function(e) {
                                                        var n = e.target;
                                                        (n !== u.elements.contentWrapper &&
                                                            n !== u.elements.headerContainer) ||
                                                            R('Modal Overlay');
                                                    });
                                                var e = function() {
                                                    u.elements.contentWrapper.scrollTop > 0
                                                        ? u.elements.header.classList.add('show')
                                                        : u.elements.header.classList.remove('show');
                                                };
                                                if (
                                                    (u.elements.contentWrapper.addEventListener('scroll', e),
                                                    u.elements.contentWrapper.addEventListener('touchmove', e),
                                                    O()(u.elements.accordions).forEach(function(e) {
                                                        var n = e.getElementsByTagName('h3')[0],
                                                            t = e.getElementsByClassName('accordion-content')[0];
                                                        n.addEventListener('click', function() {
                                                            var o = e.classList.toggle('show');
                                                            t.style.setProperty(
                                                                'max-height',
                                                                o ? t.scrollHeight + 'px' : null
                                                            ),
                                                                o && y('accordion-open', n.innerText);
                                                        });
                                                    }),
                                                    a.contentWindow.addEventListener('keyup', function(e) {
                                                        ('Escape' !== e.key && 'Esc' !== e.key && 27 !== e.charCode) ||
                                                            R('Escape Key');
                                                    }),
                                                    O()(u.elements.landerLinks).forEach(function(e) {
                                                        e.addEventListener('click', function() {
                                                            return y('lander-link');
                                                        });
                                                    }),
                                                    'EZP' === h())
                                                ) {
                                                    u.elements.niTab.addEventListener('click', function() {
                                                        return w('NI Tab');
                                                    }),
                                                        u.elements.ezpTab.addEventListener('click', function() {
                                                            return w('EZP Tab');
                                                        });
                                                    var n = function(e) {
                                                        var n = u.elements.amountInput.value;
                                                        y('calculate', e, n), P(n);
                                                    };
                                                    u.elements.amountInput.addEventListener('keydown', function(e) {
                                                        var t = e.key,
                                                            o = e.target;
                                                        if (t.length > 1 || e.metaKey || e.ctrlKey)
                                                            'Enter' === t && n('Enter Key');
                                                        else {
                                                            var a = o.value,
                                                                i = o.selectionStart,
                                                                r = a ? '' + a.slice(0, i) + t + a.slice(i) : t;
                                                            (function(e) {
                                                                if (Ft()(Number(e))) return !1;
                                                                var n = e.split('.'),
                                                                    t = n[0],
                                                                    o = n[1];
                                                                return (
                                                                    (void 0 === t ? '' : t).length <= 5 &&
                                                                    (void 0 === o ? '' : o).length <= 2
                                                                );
                                                            })(r) && ((o.value = r), o.setSelectionRange(i + 1, i + 1)),
                                                                e.preventDefault();
                                                        }
                                                    }),
                                                        u.elements.calculateButton.addEventListener(
                                                            'click',
                                                            function() {
                                                                return n('Calculate Button');
                                                            }
                                                        );
                                                }
                                            })();
                                    })
                                    .catch(function() {
                                        f.error({ name: U.MODAL_FAIL }), g({ error: !0 });
                                    })
                                    .then(function() {
                                        return f.end();
                                    })
                            );
                        }
                        return (
                            n.setAttribute('role', 'alertdialog'),
                            n.setAttribute('aria-label', 'PayPal Credit Promotion Modal'),
                            n.setAttribute(
                                'style',
                                'display: none; overflow: auto; -webkit-overflow-scrolling: touch; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 2147483647; margin: 0; padding: 0; border: 0;'
                            ),
                            a.setAttribute(
                                'style',
                                'position: absolute; top: 0; left: 0; overflow: hidden; width: 100%; height: 100%; margin: 0; padding: 0; border: 0; display: block;'
                            ),
                            n.appendChild(a),
                            window.top.document.body.appendChild(n),
                            g({ modalProm: I() }),
                            'EZP' === h() &&
                                x().then(function() {
                                    return P(e.amount);
                                }),
                            {
                                open: function(e) {
                                    e.preventDefault(),
                                        ('CLOSED' !== u.status && 'CLOSING' !== u.status) ||
                                            (g({ status: 'OPENING' }),
                                            x().then(function() {
                                                if (u.error)
                                                    return g({ status: 'CLOSED' }), void window.open(d, '_blank');
                                                (n.style.display = 'block'),
                                                    requestAnimationFrame(function() {
                                                        return requestAnimationFrame(function() {
                                                            _(),
                                                                a.contentWindow.focus(),
                                                                g({ status: 'OPEN' }),
                                                                s(),
                                                                u.elements.modalContainer.classList.add('show'),
                                                                y('modal-open');
                                                        });
                                                    });
                                            }));
                                },
                                close: v
                            }
                        );
                    },
                    ['account', 'amount', 'offerType']
                ),
                co = {
                    init: function(e) {
                        var n = e.options,
                            t = e.meta,
                            a = e.events,
                            i = e.track;
                        if (n._legacy && T()(t.offerType, 'NI'))
                            a.on('click', function(e) {
                                var n = e.target;
                                'IMG' === n.tagName && 'A' === n.parentNode.tagName
                                    ? (window.open(
                                          n.parentNode.href,
                                          'PayPal Credit Terms',
                                          'width=650,height=600,scrollbars=yes,resizable=no,location=no,toolbar=no,menubar=no,dependent=no,dialog=yes,minimizable=no'
                                      ),
                                      e.preventDefault())
                                    : window.open(t.clickUrl, '_blank');
                            });
                        else {
                            var r = lo(o({}, n, {}, t, { track: i }));
                            a.on('click', r.open);
                        }
                    }
                },
                mo = new Map(),
                uo = new Map();
            function po(e) {
                var n = (e.meta && e.meta.offerType) + '::' + e.options.style._flattened.sort().join('::'),
                    t = e.meta;
                return {
                    track: e.logger.track({
                        uuid: n,
                        urls: { DEFAULT: t.clickUrl, MORS_IMPRESSION: t.impressionUrl + '&idx=' + e.options.id }
                    })
                };
            }
            var go = w(function(e, n) {
                    var t;
                    return ((t = {})[e] = n), t;
                }),
                fo = w(function(e, n) {
                    return o({}, n, {}, e(n));
                }),
                ho = w(function(e, n) {
                    return e(n).then(function(e) {
                        return o({}, n, {}, e);
                    });
                }),
                yo = function(e) {
                    var n = e.options.onRender;
                    n && n();
                },
                _o = {
                    init: function(e, n, t) {
                        uo.has(e) ||
                            uo.set(e, V.create({ id: t.id, account: t.account, selector: n, type: 'Message' }));
                        var a,
                            i = uo.get(e);
                        return (
                            mo.has(e)
                                ? ((a = mo.get(e)).renderProm = a.renderProm.then(function() {
                                      return i.start({ options: t }), a.update(t);
                                  }))
                                : (i.start({ options: t }),
                                  (a = (function(e, n, t) {
                                      t.info(G.CREATE);
                                      var a = b(e),
                                          i = a[0],
                                          r = a[1],
                                          s = i._legacy,
                                          l = Ut(s ? 'div' : 'iframe'),
                                          c = l[0],
                                          d = l[1],
                                          m = d.insertMarkup,
                                          u = d.setSize,
                                          g = d.events,
                                          h = d.runStats,
                                          y = d.clearEvents,
                                          R = s ? c : document.createElement('span');
                                      R !== c && R.appendChild(c);
                                      var A = w(function(e, n, o) {
                                          return t.info(n), e(o);
                                      });
                                      function E(e) {
                                          return (
                                              t.info(G.RENDER_START),
                                              v(to(t), x(r), go('options'), _(f.a, { logger: t }), ho(Q))(e)
                                                  .then(ho(A(m, G.INSERT)))
                                                  .then(
                                                      v(
                                                          _(f.a, { wrapper: R, events: g }),
                                                          fo(po),
                                                          x(A(co.init, G.MODAL)),
                                                          x(A(u, G.SIZE)),
                                                          x(A(h, G.STATS)),
                                                          A(yo, G.RENDER_END)
                                                      )
                                                  )
                                          );
                                      }
                                      return (
                                          n.appendChild(R),
                                          t.info(G.CONTAINER),
                                          s ||
                                              c.addEventListener('load', function() {
                                                  y(), E(i);
                                              }),
                                          {
                                              renderProm: E(i),
                                              wrapper: R,
                                              container: c,
                                              update: function(e) {
                                                  var n = H(i, e),
                                                      a = (function e(n, t) {
                                                          return k()(t).reduce(function(t, a) {
                                                              var i,
                                                                  r,
                                                                  s = a[0],
                                                                  l = a[1];
                                                              if (!n[s] && n[s] !== l)
                                                                  return o({}, t, (((i = {})[s] = l), i));
                                                              if ('object' != typeof l || null === l)
                                                                  return l !== n[s]
                                                                      ? o({}, t, (((r = {})[s] = l), r))
                                                                      : t;
                                                              if (Array.isArray(l)) {
                                                                  var c;
                                                                  if (Array.isArray(n[s])) {
                                                                      var d,
                                                                          m = l.filter(function(e) {
                                                                              return !z()(n[s], e);
                                                                          });
                                                                      return m.length > 0
                                                                          ? o({}, t, (((d = {})[s] = m), d))
                                                                          : t;
                                                                  }
                                                                  return o({}, t, (((c = {})[s] = l), c));
                                                              }
                                                              var u,
                                                                  p = e(n[s], l);
                                                              return Object.keys(p).length > 0
                                                                  ? o({}, t, (((u = {})[s] = p), u))
                                                                  : t;
                                                          }, {});
                                                      })(i, n),
                                                      r = Object.keys(a).length > 0;
                                                  return (
                                                      t.info(G.UPDATE, { willUpdate: r }), r ? (y(), E(n)) : p.resolve()
                                                  );
                                              }
                                          }
                                      );
                                  })(t, e, i)),
                                  mo.set(e, a)),
                            (a.renderProm = a.renderProm.then(i.end).catch(function(e) {
                                i.error({ name: e.message }), i.end(), 'function' == typeof e.onEnd && e.onEnd();
                            })),
                            a.renderProm
                        );
                    }
                };
            function wo(e, n) {
                var t, a;
                if ((void 0 === n && (n = '[data-pp-message]'), 'string' == typeof n))
                    (t = O()(document.querySelectorAll(n))), (a = n);
                else if (vt(n)) (t = [n]), (a = 'HTMLElement');
                else {
                    if (!Array.isArray(n) || !n.every(vt)) return V.warn('Invalid selector', n);
                    (t = [].concat(n)), (a = 'Array<HTMLElement>');
                }
                return (
                    (t = t.filter(function(n) {
                        return n.ownerDocument.body.contains(n)
                            ? !e._auto || !n.hasAttribute('data-pp-id')
                            : (V.warn('Skipping container. Must be in the document:', n), !1);
                    })),
                    p.all(
                        t.map(function(n) {
                            var t = H(e, bt(n));
                            return (
                                n.hasAttribute('data-pp-id') ||
                                    (n.setAttribute('data-pp-id', A.nextId), E({ nextId: (A.nextId += 1) })),
                                new MutationObserver(function(e) {
                                    var t = e.reduce(function(e, n) {
                                        return T()(n.attributeName, 'data-pp-')
                                            ? o(
                                                  {},
                                                  e,
                                                  {},
                                                  B(n.attributeName.slice(8), n.target.getAttribute(n.attributeName))
                                              )
                                            : e;
                                    }, {});
                                    _o.init(n, a, t);
                                }).observe(n, { attributes: !0 }),
                                (t.id = n.getAttribute('data-pp-id')),
                                _o.init(n, a, t)
                            );
                        })
                    )
                );
            }
            var xo = function(e) {
                return {
                    render: function(n) {
                        return wo(o({}, A.config, {}, e), n);
                    }
                };
            };
            f()(xo, {
                render: function(e, n) {
                    return void 0 === e && (e = {}), wo(o({}, A.config, {}, e), n);
                },
                setGlobalConfig: function(e) {
                    return void 0 === e && (e = {}), E({ config: o({}, A.config, {}, e) });
                }
            });
            var vo,
                bo = xo;
            t.d(n, 'Messages', function() {
                return bo;
            }),
                (vo = document.currentScript || document.querySelector('script[src$="messaging.js"]')) &&
                    bo.setGlobalConfig(o({ country: 'US' }, bt(vo))),
                window.paypal && (window.paypal.Message = bo),
                A.config.account &&
                    ('loading' === document.readyState
                        ? window.addEventListener('DOMContentLoaded', function() {
                              return bo.render({ _auto: !0 });
                          })
                        : bo.render({ _auto: !0 }));
        }
    ]).Messages);
//# sourceMappingURL=messaging.js.map
