(window.paypal = window.paypal || {}),
    (window.paypal.Messages = (function(e) {
        var n = {};
        function t(o) {
            if (n[o]) return n[o].exports;
            var i = (n[o] = { i: o, l: !1, exports: {} });
            return e[o].call(i.exports, i, i.exports, t), (i.l = !0), i.exports;
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
                    for (var i in e)
                        t.d(
                            o,
                            i,
                            function(n) {
                                return e[n];
                            }.bind(null, i)
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
            t((t.s = 155))
        );
    })([
        function(e, n, t) {
            e.exports = t(143);
        },
        function(e, n, t) {
            e.exports = t(138);
        },
        function(e, n, t) {
            e.exports = t(111);
        },
        function(e, n, t) {
            e.exports = t(109);
        },
        function(e, n, t) {
            'use strict';
            var o = t(8),
                i = t(102).f,
                a = t(103),
                r = t(15),
                s = t(34),
                l = t(16),
                c = t(14),
                u = function(e) {
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
                    d,
                    m,
                    f,
                    p,
                    g,
                    h,
                    y,
                    _ = e.target,
                    w = e.global,
                    v = e.stat,
                    x = e.proto,
                    b = w ? o : v ? o[_] : (o[_] || {}).prototype,
                    E = w ? r : r[_] || (r[_] = {}),
                    P = E.prototype;
                for (m in n)
                    (t = !a(w ? m : _ + (v ? '.' : '#') + m, e.forced) && b && c(b, m)),
                        (p = E[m]),
                        t && (g = e.noTargetGet ? (y = i(b, m)) && y.value : b[m]),
                        (f = t && g ? g : n[m]),
                        (t && typeof p == typeof f) ||
                            ((h =
                                e.bind && t
                                    ? s(f, o)
                                    : e.wrap && t
                                    ? u(f)
                                    : x && 'function' == typeof f
                                    ? s(Function.call, f)
                                    : f),
                            (e.sham || (f && f.sham) || (p && p.sham)) && l(h, 'sham', !0),
                            (E[m] = h),
                            x &&
                                (c(r, (d = _ + 'Prototype')) || l(r, d, {}),
                                (r[d][m] = f),
                                e.real && P && !P[m] && l(P, m, f)));
            };
        },
        function(e, n, t) {
            var o = t(8),
                i = t(38),
                a = t(50),
                r = t(121),
                s = o.Symbol,
                l = i('wks');
            e.exports = function(e) {
                return l[e] || (l[e] = (r && s[e]) || (r ? s : a)('Symbol.' + e));
            };
        },
        function(e, n, t) {
            e.exports = t(136);
        },
        function(e, n, t) {
            e.exports = t(100);
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
            e.exports =
                "@font-face {\n    font-family: PayPal-Sans;\n    font-style: normal;\n    font-weight: 300;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Light.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Light.woff2') format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Light.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Light.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n\n@font-face {\n    font-family: PayPal-Sans;\n    font-style: normal;\n    font-weight: 400;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Regular.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Regular.woff2')\n            format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Regular.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Regular.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n\n@font-face {\n    font-family: PayPal-Sans;\n    font-style: normal;\n    font-weight: 500;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Medium.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Medium.woff2')\n            format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Medium.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Medium.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n\n@font-face {\n    font-family: PayPal-Sans;\n    font-style: normal;\n    font-weight: 700;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Bold.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Bold.woff2') format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Bold.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Bold.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n\n@font-face {\n    font-family: PayPal-Sans-Big;\n    font-style: normal;\n    font-weight: 200;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Thin.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Thin.woff2') format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Thin.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Thin.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n\n@font-face {\n    font-family: PayPal-Sans-Big;\n    font-style: normal;\n    font-weight: 300;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Light.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Light.woff2') format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Light.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Light.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n\n@font-face {\n    font-family: PayPal-Sans-Big;\n    font-style: normal;\n    font-weight: 400;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Regular.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Regular.woff2') format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Regular.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Regular.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n\n@font-face {\n    font-family: PayPal-Sans-Big;\n    font-style: normal;\n    font-weight: 500;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Medium.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Medium.woff2') format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Medium.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Medium.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n\n@font-face {\n    font-family: PayPal-Sans-Big;\n    font-style: normal;\n    font-weight: 700;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Bold.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Bold.woff2') format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Bold.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Bold.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n";
        },
        function(e, n, t) {
            e.exports = t(144);
        },
        function(e, n, t) {
            var o = t(12);
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
            var o = t(11),
                i = t(27),
                a = t(24);
            e.exports = o
                ? function(e, n, t) {
                      return i.f(e, n, a(1, t));
                  }
                : function(e, n, t) {
                      return (e[n] = t), e;
                  };
        },
        function(e, n) {
            e.exports = function(e) {
                if (null == e) throw TypeError("Can't call method on " + e);
                return e;
            };
        },
        function(e, n, t) {
            e.exports = t(141);
        },
        function(e, n, t) {
            e.exports = t(151);
        },
        function(e, n, t) {
            var o = t(13);
            e.exports = function(e) {
                if (!o(e)) throw TypeError(String(e) + ' is not an object');
                return e;
            };
        },
        function(e, n, t) {
            var o = t(36),
                i = Math.min;
            e.exports = function(e) {
                return e > 0 ? i(o(e), 9007199254740991) : 0;
            };
        },
        function(e, n, t) {
            e.exports = t(53);
        },
        function(e, n, t) {
            e.exports = t(153);
        },
        function(e, n) {
            e.exports = function(e, n) {
                return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: n };
            };
        },
        function(e, n, t) {
            var o = t(32),
                i = t(17);
            e.exports = function(e) {
                return o(i(e));
            };
        },
        function(e, n) {
            var t = {}.toString;
            e.exports = function(e) {
                return t.call(e).slice(8, -1);
            };
        },
        function(e, n, t) {
            var o = t(11),
                i = t(45),
                a = t(20),
                r = t(33),
                s = Object.defineProperty;
            n.f = o
                ? s
                : function(e, n, t) {
                      if ((a(e), (n = r(n, !0)), a(t), i))
                          try {
                              return s(e, n, t);
                          } catch (e) {}
                      if ('get' in t || 'set' in t) throw TypeError('Accessors not supported');
                      return 'value' in t && (e[n] = t.value), e;
                  };
        },
        function(e, n, t) {
            var o = t(17);
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
            'use strict';
            var o = {}.propertyIsEnumerable,
                i = Object.getOwnPropertyDescriptor,
                a = i && !o.call({ 1: 2 }, 1);
            n.f = a
                ? function(e) {
                      var n = i(this, e);
                      return !!n && n.enumerable;
                  }
                : o;
        },
        function(e, n, t) {
            var o = t(12),
                i = t(26),
                a = ''.split;
            e.exports = o(function() {
                return !Object('z').propertyIsEnumerable(0);
            })
                ? function(e) {
                      return 'String' == i(e) ? a.call(e, '') : Object(e);
                  }
                : Object;
        },
        function(e, n, t) {
            var o = t(13);
            e.exports = function(e, n) {
                if (!o(e)) return e;
                var t, i;
                if (n && 'function' == typeof (t = e.toString) && !o((i = t.call(e)))) return i;
                if ('function' == typeof (t = e.valueOf) && !o((i = t.call(e)))) return i;
                if (!n && 'function' == typeof (t = e.toString) && !o((i = t.call(e)))) return i;
                throw TypeError("Can't convert object to primitive value");
            };
        },
        function(e, n, t) {
            var o = t(104);
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
                        return function(t, o, i) {
                            return e.call(n, t, o, i);
                        };
                }
                return function() {
                    return e.apply(n, arguments);
                };
            };
        },
        function(e, n, t) {
            var o = t(106),
                i = t(48);
            e.exports =
                Object.keys ||
                function(e) {
                    return o(e, i);
                };
        },
        function(e, n) {
            var t = Math.ceil,
                o = Math.floor;
            e.exports = function(e) {
                return isNaN((e = +e)) ? 0 : (e > 0 ? o : t)(e);
            };
        },
        function(e, n) {
            e.exports = {};
        },
        function(e, n, t) {
            var o = t(8),
                i = t(117),
                a = t(39),
                r = o['__core-js_shared__'] || i('__core-js_shared__', {});
            (e.exports = function(e, n) {
                return r[e] || (r[e] = void 0 !== n ? n : {});
            })('versions', []).push({
                version: '3.1.3',
                mode: a ? 'pure' : 'global',
                copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
            });
        },
        function(e, n) {
            e.exports = !0;
        },
        function(e, n, t) {
            var o = t(38),
                i = t(50),
                a = o('keys');
            e.exports = function(e) {
                return a[e] || (a[e] = i(e));
            };
        },
        function(e, n, t) {
            var o = t(140);
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
            var o = t(11),
                i = t(12),
                a = t(46);
            e.exports =
                !o &&
                !i(function() {
                    return (
                        7 !=
                        Object.defineProperty(a('div'), 'a', {
                            get: function() {
                                return 7;
                            }
                        }).a
                    );
                });
        },
        function(e, n, t) {
            var o = t(8),
                i = t(13),
                a = o.document,
                r = i(a) && i(a.createElement);
            e.exports = function(e) {
                return r ? a.createElement(e) : {};
            };
        },
        function(e, n, t) {
            var o = t(25),
                i = t(21),
                a = t(107),
                r = function(e) {
                    return function(n, t, r) {
                        var s,
                            l = o(n),
                            c = i(l.length),
                            u = a(r, c);
                        if (e && t != t) {
                            for (; c > u; ) if ((s = l[u++]) != s) return !0;
                        } else for (; c > u; u++) if ((e || u in l) && l[u] === t) return e || u || 0;
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
        function(e, n, t) {
            var o = t(11),
                i = t(35),
                a = t(25),
                r = t(31).f,
                s = function(e) {
                    return function(n) {
                        for (var t, s = a(n), l = i(s), c = l.length, u = 0, d = []; c > u; )
                            (t = l[u++]), (o && !r.call(s, t)) || d.push(e ? [t, s[t]] : s[t]);
                        return d;
                    };
                };
            e.exports = { entries: s(!0), values: s(!1) };
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
                i,
                a,
                r = t(52),
                s = t(16),
                l = t(14),
                c = t(5),
                u = t(39),
                d = c('iterator'),
                m = !1;
            [].keys && ('next' in (a = [].keys()) ? (i = r(r(a))) !== Object.prototype && (o = i) : (m = !0)),
                null == o && (o = {}),
                u ||
                    l(o, d) ||
                    s(o, d, function() {
                        return this;
                    }),
                (e.exports = { IteratorPrototype: o, BUGGY_SAFARI_ITERATORS: m });
        },
        function(e, n, t) {
            var o = t(14),
                i = t(28),
                a = t(40),
                r = t(120),
                s = a('IE_PROTO'),
                l = Object.prototype;
            e.exports = r
                ? Object.getPrototypeOf
                : function(e) {
                      return (
                          (e = i(e)),
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
            var o = t(15),
                i = t(8),
                a = function(e) {
                    return 'function' == typeof e ? e : void 0;
                };
            e.exports = function(e, n) {
                return arguments.length < 2 ? a(o[e]) || a(i[e]) : (o[e] && o[e][n]) || (i[e] && i[e][n]);
            };
        },
        function(e, n, t) {
            var o = t(27).f,
                i = t(16),
                a = t(14),
                r = t(125),
                s = t(5)('toStringTag'),
                l = r !== {}.toString;
            e.exports = function(e, n, t, c) {
                if (e) {
                    var u = t ? e : e.prototype;
                    a(u, s) || o(u, s, { configurable: !0, value: n }), c && l && i(u, 'toString', r);
                }
            };
        },
        function(e, n, t) {
            var o = t(26),
                i = t(5)('toStringTag'),
                a =
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
                      })((n = Object(e)), i))
                    ? t
                    : a
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
            e.exports = t(149);
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
            e.exports = '.message__messaging {\n    max-width: 375px;\n}\n';
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
            e.exports = '.message__background {\n    background: linear-gradient(-10deg, #009cde, #003087 90%);\n}\n';
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
            e.exports =
                ".message {\n    overflow: hidden;\n    min-width: 150px;\n}\n\n.message * {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\n.message__logo--svg {\n    position: relative;\n}\n\n.message__logo--svg img {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n}\n\n.message__logo--svg canvas {\n    display: block;\n    width: 100%;\n    visibility: hidden;\n}\n\n.message img {\n    display: block;\n    width: 100%;\n    height: 100%;\n}\n\n.message__container {\n    border: 1px solid #003087;\n    position: relative;\n}\n\n.message__content {\n    width: auto;\n    font-family: 'HelveticaNeueW02-65Medi', 'Helvetica Neue-Thin', Helvetica, Arial, 'Lucida Grande', sans-serif;\n    overflow: hidden;\n}\n\n.message__messaging {\n    padding: 0;\n    float: right;\n    text-align: left;\n}\n\n.message__logo {\n    z-index: 1;\n    height: auto;\n    width: 80%;\n}\n\n.message__logo-container {\n    position: absolute;\n    float: left;\n    padding: 10px 5px;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n.message__logo-container img {\n    z-index: 1;\n}\n\n.message__headline {\n    color: #003087;\n    font-weight: bold;\n    font-size: 14px;\n    line-height: 1em;\n}\n\n.message__headline .weak {\n    font-weight: normal;\n}\n\n.message__sub-headline {\n    color: #767676;\n    font-weight: 400;\n    font-size: 13px;\n    line-height: 1em;\n}\n\n.message__disclaimer {\n    color: #767676;\n    font-size: 11px;\n    line-height: 1em;\n}\n\n.message__disclaimer .em {\n    color: #003087;\n    text-decoration: underline;\n    display: inline-block;\n    font-style: normal;\n}\n";
        },
        function(e, n) {
            e.exports =
                ".message__logo-container {\n    padding: 0 2% 0 0;\n}\n\n.message__logo-container::before,\n.message__logo-container::after {\n    content: '';\n    position: absolute;\n    top: 0;\n    background-color: #003087;\n    transform: skewX(-9deg);\n}\n\n.message__logo-container::before {\n    height: 101%;\n    width: 105%;\n    left: -15%;\n}\n\n.message__logo-container::after {\n    height: 70%;\n    width: 160%;\n    left: -70%;\n}\n";
        },
        function(e, n) {
            e.exports =
                '.message__messaging {\n    float: none;\n}\n\n.message__logo {\n    max-width: 90%;\n}\n\n.message__logo-container {\n    width: 100%;\n    float: none;\n    position: relative;\n}\n\n.message__disclaimer .em {\n    display: block;\n    margin-left: 0;\n}\n';
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
                '.message {\n    max-width: 100%;\n    min-width: 120px;\n}\n\n.message__logo-container {\n    height: 108px;\n}\n\n.message__messaging {\n    padding: 0 8% 5%;\n}\n\n.message__headline {\n    font-size: 16px;\n    margin-bottom: 30px;\n    line-height: 1.1em;\n}\n.message__headline .em {\n    margin-right: 0;\n    display: block;\n}\n\n.message__sub-headline {\n    font-size: 15px;\n    margin-bottom: 40px;\n    color: #009cde;\n}\n\n.message__disclaimer .em {\n    color: #666666;\n    display: block;\n}\n\n@media (max-width: 160px) {\n    .message__headline {\n        margin-bottom: 16px;\n    }\n\n    .message__sub-headline {\n        margin-bottom: 16px;\n    }\n}\n';
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
                '.message {\n    max-width: 100%;\n}\n\n.message__messaging {\n    padding: 0.5% 1% 0;\n}\n\n.message__logo {\n    max-width: unset;\n    max-height: 125%;\n}\n\n.message__logo-container {\n    width: 28%;\n    padding-right: 5%;\n}\n\n.message__messaging {\n    width: 70%;\n}\n\n.message__headline {\n    font-size: 15px;\n    margin-bottom: 6px;\n}\n\n.message__sub-headline {\n    font-size: 13px;\n    color: #009cde;\n    margin-bottom: 5px;\n}\n\n.message__disclaimer {\n    font-size: 10px;\n    margin-bottom: 3px;\n}\n\n.message__disclaimer .em {\n    color: #666666;\n}\n\n@media (max-width: 290px) {\n    .message__headline {\n        font-size: 13px;\n    }\n\n    .message__sub-headline {\n        font-size: 11px;\n    }\n\n    .message__disclaimer {\n        font-size: 9px;\n    }\n}\n\n@media (max-width: 200px) {\n    .message__logo {\n        max-width: 65%;\n    }\n\n    .message__logo-container {\n        position: relative;\n        width: 100%;\n        height: auto;\n        float: none;\n        padding-top: 5px;\n    }\n\n    .message__messaging {\n        width: 100%;\n        float: none;\n        padding: 2% 5% 5%;\n    }\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message {\n    min-width: 160px;\n    max-width: 100%;\n}\n\n.message__logo {\n    max-width: 60%;\n}\n\n.message__logo-container {\n    width: 23%;\n}\n\n.message__messaging {\n    width: 77%;\n    padding: 6px 1% 0;\n    margin-bottom: 3px;\n}\n\n.message__promo-container {\n    display: inline;\n}\n\n.message__headline {\n    display: block;\n    margin-bottom: 6px;\n}\n\n.message__sub-headline {\n    display: inline;\n    color: #009cde;\n}\n\n.message__disclaimer {\n    display: inline;\n}\n\n.message__disclaimer em {\n    display: inline-block;\n}\n\n@media (max-width: 570px) {\n    .message__logo {\n        max-width: 70%;\n    }\n\n    .message__headline {\n        font-size: 13px;\n        margin-bottom: 3px;\n    }\n\n    .message__sub-headline {\n        font-size: 12px;\n    }\n\n    .message__disclaimer {\n        font-size: 9px;\n    }\n\n    .message__disclaimer em::after {\n        height: 8px;\n    }\n}\n\n@media (max-width: 440px) {\n    .message__logo {\n        max-width: 75%;\n    }\n\n    .message__headline {\n        font-size: 11px;\n        margin-bottom: 2px;\n    }\n\n    .message__sub-headline {\n        font-size: 10px;\n    }\n}\n\n@media (max-width: 340px) {\n    .message__messaging {\n        padding-top: 2px;\n    }\n}\n\n@media (max-width: 250px) {\n    .message__logo {\n        max-width: 50%;\n    }\n\n    .message__logo-container {\n        float: none;\n        position: relative;\n        height: auto;\n        width: 100%;\n    }\n\n    .message__messaging {\n        float: none;\n        width: 100%;\n        padding: 5% 5% 3%;\n        margin-bottom: 6px;\n    }\n\n    .message__headline {\n        font-size: 12px;\n        margin-bottom: 6px;\n    }\n\n    .message__sub-headline {\n        font-size: 11px;\n    }\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message {\n    min-width: 160px;\n    min-height: 36px;\n    max-width: 100%;\n}\n\n.message__container {\n    min-height: 36px;\n}\n\n.message__logo {\n    max-width: 80px;\n    max-height: unset;\n}\n\n.message__logo-container {\n    width: 20%;\n}\n\n.message__messaging {\n    width: 77%;\n    padding: 5px 2.5% 2px 0.5%;\n    line-height: 0;\n}\n\n.message__messaging > * {\n    line-height: 1em;\n}\n\n.message__promo-container {\n    display: inline;\n}\n\n.message__headline {\n    display: inline;\n}\n\n.message__sub-headline {\n    display: inline;\n    color: #767676;\n}\n\n.message__disclaimer {\n    display: inline;\n}\n\n@media (max-width: 800px) {\n    .message__messaging {\n        padding-top: 2px;\n    }\n\n    .message__disclaimer {\n        display: inline-block;\n    }\n}\n\n@media (max-width: 570px) {\n    .message__headline {\n        font-size: 13px;\n    }\n\n    .message__sub-headline {\n        font-size: 12px;\n    }\n\n    .message__disclaimer .em::after {\n        height: 8px;\n    }\n\n    .message__disclaimer {\n        font-size: 9px;\n    }\n}\n\n@media (max-width: 440px) {\n    .message__logo {\n        max-width: 90%;\n    }\n}\n\n@media (max-width: 250px) {\n    .message__logo {\n        max-width: 50%;\n    }\n\n    .message__logo-container {\n        float: none;\n        position: relative;\n        height: auto;\n        width: 100%;\n        padding: 5px 0;\n    }\n\n    .message__messaging {\n        float: none;\n        width: 100%;\n        padding: 3% 5%;\n        margin-bottom: 6px;\n    }\n\n    .message__headline {\n        display: block;\n        font-size: 12px;\n        margin-bottom: 6px;\n    }\n\n    .message__sub-headline {\n        display: block;\n        font-size: 11px;\n        margin-bottom: 6px;\n    }\n}\n';
        },
        function(e, n) {
            e.exports =
                '.message__messaging {\n    padding: 0.5% 1% 0%;\n    width: 76%;\n}\n\n.message__logo-container {\n    width: 23%;\n}\n\n.message__headline {\n    font-size: 12px;\n    margin-bottom: 5px;\n}\n\n.message__sub-headline {\n    font-size: 11px;\n    color: #009cde;\n    margin-bottom: 4px;\n}\n\n.message__disclaimer {\n    font-size: 9px;\n    margin-bottom: 2px;\n}\n\n@media (max-width: 290px) {\n    .message__messaging {\n        margin-left: 3%;\n        width: 74%;\n    }\n}\n';
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
                '* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\n.message__logo--svg {\n    position: relative;\n}\n\n.message__logo--svg img {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n}\n.message__logo--svg canvas {\n    display: block;\n    width: 100%;\n    visibility: hidden;\n}\n';
        },
        function(e, n, t) {
            t(101);
            var o = t(15);
            e.exports = o.Object.assign;
        },
        function(e, n, t) {
            var o = t(4),
                i = t(105);
            o({ target: 'Object', stat: !0, forced: Object.assign !== i }, { assign: i });
        },
        function(e, n, t) {
            var o = t(11),
                i = t(31),
                a = t(24),
                r = t(25),
                s = t(33),
                l = t(14),
                c = t(45),
                u = Object.getOwnPropertyDescriptor;
            n.f = o
                ? u
                : function(e, n) {
                      if (((e = r(e)), (n = s(n, !0)), c))
                          try {
                              return u(e, n);
                          } catch (e) {}
                      if (l(e, n)) return a(!i.f.call(e, n), e[n]);
                  };
        },
        function(e, n, t) {
            var o = t(12),
                i = /#|\.prototype\./,
                a = function(e, n) {
                    var t = s[r(e)];
                    return t == c || (t != l && ('function' == typeof n ? o(n) : !!n));
                },
                r = (a.normalize = function(e) {
                    return String(e)
                        .replace(i, '.')
                        .toLowerCase();
                }),
                s = (a.data = {}),
                l = (a.NATIVE = 'N'),
                c = (a.POLYFILL = 'P');
            e.exports = a;
        },
        function(e, n) {
            e.exports = function(e) {
                if ('function' != typeof e) throw TypeError(String(e) + ' is not a function');
                return e;
            };
        },
        function(e, n, t) {
            'use strict';
            var o = t(11),
                i = t(12),
                a = t(35),
                r = t(108),
                s = t(31),
                l = t(28),
                c = t(32),
                u = Object.assign;
            e.exports =
                !u ||
                i(function() {
                    var e = {},
                        n = {},
                        t = Symbol();
                    return (
                        (e[t] = 7),
                        'abcdefghijklmnopqrst'.split('').forEach(function(e) {
                            n[e] = e;
                        }),
                        7 != u({}, e)[t] || 'abcdefghijklmnopqrst' != a(u({}, n)).join('')
                    );
                })
                    ? function(e, n) {
                          for (var t = l(e), i = arguments.length, u = 1, d = r.f, m = s.f; i > u; )
                              for (
                                  var f, p = c(arguments[u++]), g = d ? a(p).concat(d(p)) : a(p), h = g.length, y = 0;
                                  h > y;

                              )
                                  (f = g[y++]), (o && !m.call(p, f)) || (t[f] = p[f]);
                          return t;
                      }
                    : u;
        },
        function(e, n, t) {
            var o = t(14),
                i = t(25),
                a = t(47).indexOf,
                r = t(37);
            e.exports = function(e, n) {
                var t,
                    s = i(e),
                    l = 0,
                    c = [];
                for (t in s) !o(r, t) && o(s, t) && c.push(t);
                for (; n.length > l; ) o(s, (t = n[l++])) && (~a(c, t) || c.push(t));
                return c;
            };
        },
        function(e, n, t) {
            var o = t(36),
                i = Math.max,
                a = Math.min;
            e.exports = function(e, n) {
                var t = o(e);
                return t < 0 ? i(t + n, 0) : a(t, n);
            };
        },
        function(e, n) {
            n.f = Object.getOwnPropertySymbols;
        },
        function(e, n, t) {
            t(110);
            var o = t(15);
            e.exports = o.Object.entries;
        },
        function(e, n, t) {
            var o = t(4),
                i = t(49).entries;
            o(
                { target: 'Object', stat: !0 },
                {
                    entries: function(e) {
                        return i(e);
                    }
                }
            );
        },
        function(e, n, t) {
            t(112), t(129);
            var o = t(15);
            e.exports = o.Array.from;
        },
        function(e, n, t) {
            'use strict';
            var o = t(113).charAt,
                i = t(114),
                a = t(118),
                r = i.set,
                s = i.getterFor('String Iterator');
            a(
                String,
                'String',
                function(e) {
                    r(this, { type: 'String Iterator', string: String(e), index: 0 });
                },
                function() {
                    var e,
                        n = s(this),
                        t = n.string,
                        i = n.index;
                    return i >= t.length
                        ? { value: void 0, done: !0 }
                        : ((e = o(t, i)), (n.index += e.length), { value: e, done: !1 });
                }
            );
        },
        function(e, n, t) {
            var o = t(36),
                i = t(17),
                a = function(e) {
                    return function(n, t) {
                        var a,
                            r,
                            s = String(i(n)),
                            l = o(t),
                            c = s.length;
                        return l < 0 || l >= c
                            ? e
                                ? ''
                                : void 0
                            : (a = s.charCodeAt(l)) < 55296 ||
                              a > 56319 ||
                              l + 1 === c ||
                              (r = s.charCodeAt(l + 1)) < 56320 ||
                              r > 57343
                            ? e
                                ? s.charAt(l)
                                : a
                            : e
                            ? s.slice(l, l + 2)
                            : r - 56320 + ((a - 55296) << 10) + 65536;
                    };
                };
            e.exports = { codeAt: a(!1), charAt: a(!0) };
        },
        function(e, n, t) {
            var o,
                i,
                a,
                r = t(115),
                s = t(8),
                l = t(13),
                c = t(16),
                u = t(14),
                d = t(40),
                m = t(37);
            if (r) {
                var f = new (0, s.WeakMap)(),
                    p = f.get,
                    g = f.has,
                    h = f.set;
                (o = function(e, n) {
                    return h.call(f, e, n), n;
                }),
                    (i = function(e) {
                        return p.call(f, e) || {};
                    }),
                    (a = function(e) {
                        return g.call(f, e);
                    });
            } else {
                var y = d('state');
                (m[y] = !0),
                    (o = function(e, n) {
                        return c(e, y, n), n;
                    }),
                    (i = function(e) {
                        return u(e, y) ? e[y] : {};
                    }),
                    (a = function(e) {
                        return u(e, y);
                    });
            }
            e.exports = {
                set: o,
                get: i,
                has: a,
                enforce: function(e) {
                    return a(e) ? i(e) : o(e, {});
                },
                getterFor: function(e) {
                    return function(n) {
                        var t;
                        if (!l(n) || (t = i(n)).type !== e)
                            throw TypeError('Incompatible receiver, ' + e + ' required');
                        return t;
                    };
                }
            };
        },
        function(e, n, t) {
            var o = t(8),
                i = t(116),
                a = o.WeakMap;
            e.exports = 'function' == typeof a && /native code/.test(i.call(a));
        },
        function(e, n, t) {
            var o = t(38);
            e.exports = o('native-function-to-string', Function.toString);
        },
        function(e, n, t) {
            var o = t(8),
                i = t(16);
            e.exports = function(e, n) {
                try {
                    i(o, e, n);
                } catch (t) {
                    o[e] = n;
                }
                return n;
            };
        },
        function(e, n, t) {
            'use strict';
            var o = t(4),
                i = t(119),
                a = t(52),
                r = t(126),
                s = t(54),
                l = t(16),
                c = t(128),
                u = t(5),
                d = t(39),
                m = t(29),
                f = t(51),
                p = f.IteratorPrototype,
                g = f.BUGGY_SAFARI_ITERATORS,
                h = u('iterator'),
                y = function() {
                    return this;
                };
            e.exports = function(e, n, t, u, f, _, w) {
                i(t, n, u);
                var v,
                    x,
                    b,
                    E = function(e) {
                        if (e === f && I) return I;
                        if (!g && e in R) return R[e];
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
                    P = n + ' Iterator',
                    A = !1,
                    R = e.prototype,
                    z = R[h] || R['@@iterator'] || (f && R[f]),
                    I = (!g && z) || E(f),
                    T = ('Array' == n && R.entries) || z;
                if (
                    (T &&
                        ((v = a(T.call(new e()))),
                        p !== Object.prototype &&
                            v.next &&
                            (d || a(v) === p || (r ? r(v, p) : 'function' != typeof v[h] && l(v, h, y)),
                            s(v, P, !0, !0),
                            d && (m[P] = y))),
                    'values' == f &&
                        z &&
                        'values' !== z.name &&
                        ((A = !0),
                        (I = function() {
                            return z.call(this);
                        })),
                    (d && !w) || R[h] === I || l(R, h, I),
                    (m[n] = I),
                    f)
                )
                    if (((x = { values: E('values'), keys: _ ? I : E('keys'), entries: E('entries') }), w))
                        for (b in x) (!g && !A && b in R) || c(R, b, x[b]);
                    else o({ target: n, proto: !0, forced: g || A }, x);
                return x;
            };
        },
        function(e, n, t) {
            'use strict';
            var o = t(51).IteratorPrototype,
                i = t(122),
                a = t(24),
                r = t(54),
                s = t(29),
                l = function() {
                    return this;
                };
            e.exports = function(e, n, t) {
                var c = n + ' Iterator';
                return (e.prototype = i(o, { next: a(1, t) })), r(e, c, !1, !0), (s[c] = l), e;
            };
        },
        function(e, n, t) {
            var o = t(12);
            e.exports = !o(function() {
                function e() {}
                return (e.prototype.constructor = null), Object.getPrototypeOf(new e()) !== e.prototype;
            });
        },
        function(e, n, t) {
            var o = t(12);
            e.exports =
                !!Object.getOwnPropertySymbols &&
                !o(function() {
                    return !String(Symbol());
                });
        },
        function(e, n, t) {
            var o = t(20),
                i = t(123),
                a = t(48),
                r = t(37),
                s = t(124),
                l = t(46),
                c = t(40)('IE_PROTO'),
                u = function() {},
                d = function() {
                    var e,
                        n = l('iframe'),
                        t = a.length;
                    for (
                        n.style.display = 'none',
                            s.appendChild(n),
                            n.src = String('javascript:'),
                            (e = n.contentWindow.document).open(),
                            e.write('<script>document.F=Object</script>'),
                            e.close(),
                            d = e.F;
                        t--;

                    )
                        delete d.prototype[a[t]];
                    return d();
                };
            (e.exports =
                Object.create ||
                function(e, n) {
                    var t;
                    return (
                        null !== e
                            ? ((u.prototype = o(e)), (t = new u()), (u.prototype = null), (t[c] = e))
                            : (t = d()),
                        void 0 === n ? t : i(t, n)
                    );
                }),
                (r[c] = !0);
        },
        function(e, n, t) {
            var o = t(11),
                i = t(27),
                a = t(20),
                r = t(35);
            e.exports = o
                ? Object.defineProperties
                : function(e, n) {
                      a(e);
                      for (var t, o = r(n), s = o.length, l = 0; s > l; ) i.f(e, (t = o[l++]), n[t]);
                      return e;
                  };
        },
        function(e, n, t) {
            var o = t(53);
            e.exports = o('document', 'documentElement');
        },
        function(e, n, t) {
            'use strict';
            var o = t(55),
                i = {};
            (i[t(5)('toStringTag')] = 'z'),
                (e.exports =
                    '[object z]' !== String(i)
                        ? function() {
                              return '[object ' + o(this) + ']';
                          }
                        : i.toString);
        },
        function(e, n, t) {
            var o = t(20),
                i = t(127);
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
                          return function(t, a) {
                              return o(t), i(a), n ? e.call(t, a) : (t.__proto__ = a), t;
                          };
                      })()
                    : void 0);
        },
        function(e, n, t) {
            var o = t(13);
            e.exports = function(e) {
                if (!o(e) && null !== e) throw TypeError("Can't set " + String(e) + ' as a prototype');
                return e;
            };
        },
        function(e, n, t) {
            var o = t(16);
            e.exports = function(e, n, t, i) {
                i && i.enumerable ? (e[n] = t) : o(e, n, t);
            };
        },
        function(e, n, t) {
            var o = t(4),
                i = t(130);
            o(
                {
                    target: 'Array',
                    stat: !0,
                    forced: !t(135)(function(e) {
                        Array.from(e);
                    })
                },
                { from: i }
            );
        },
        function(e, n, t) {
            'use strict';
            var o = t(34),
                i = t(28),
                a = t(131),
                r = t(132),
                s = t(21),
                l = t(133),
                c = t(134);
            e.exports = function(e) {
                var n,
                    t,
                    u,
                    d,
                    m = i(e),
                    f = 'function' == typeof this ? this : Array,
                    p = arguments.length,
                    g = p > 1 ? arguments[1] : void 0,
                    h = void 0 !== g,
                    y = 0,
                    _ = c(m);
                if ((h && (g = o(g, p > 2 ? arguments[2] : void 0, 2)), null == _ || (f == Array && r(_))))
                    for (t = new f((n = s(m.length))); n > y; y++) l(t, y, h ? g(m[y], y) : m[y]);
                else
                    for (d = _.call(m), t = new f(); !(u = d.next()).done; y++)
                        l(t, y, h ? a(d, g, [u.value, y], !0) : u.value);
                return (t.length = y), t;
            };
        },
        function(e, n, t) {
            var o = t(20);
            e.exports = function(e, n, t, i) {
                try {
                    return i ? n(o(t)[0], t[1]) : n(t);
                } catch (n) {
                    var a = e.return;
                    throw (void 0 !== a && o(a.call(e)), n);
                }
            };
        },
        function(e, n, t) {
            var o = t(5),
                i = t(29),
                a = o('iterator'),
                r = Array.prototype;
            e.exports = function(e) {
                return void 0 !== e && (i.Array === e || r[a] === e);
            };
        },
        function(e, n, t) {
            'use strict';
            var o = t(33),
                i = t(27),
                a = t(24);
            e.exports = function(e, n, t) {
                var r = o(n);
                r in e ? i.f(e, r, a(0, t)) : (e[r] = t);
            };
        },
        function(e, n, t) {
            var o = t(55),
                i = t(29),
                a = t(5)('iterator');
            e.exports = function(e) {
                if (null != e) return e[a] || e['@@iterator'] || i[o(e)];
            };
        },
        function(e, n, t) {
            var o = t(5)('iterator'),
                i = !1;
            try {
                var a = 0,
                    r = {
                        next: function() {
                            return { done: !!a++ };
                        },
                        return: function() {
                            i = !0;
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
                if (!n && !i) return !1;
                var t = !1;
                try {
                    var a = {};
                    (a[o] = function() {
                        return {
                            next: function() {
                                return { done: (t = !0) };
                            }
                        };
                    }),
                        e(a);
                } catch (e) {}
                return t;
            };
        },
        function(e, n, t) {
            t(137);
            var o = t(22);
            e.exports = o('Array', 'includes');
        },
        function(e, n, t) {
            'use strict';
            var o = t(4),
                i = t(47).includes,
                a = t(56);
            o(
                { target: 'Array', proto: !0 },
                {
                    includes: function(e) {
                        return i(this, e, arguments.length > 1 ? arguments[1] : void 0);
                    }
                }
            ),
                a('includes');
        },
        function(e, n, t) {
            t(139);
            var o = t(22);
            e.exports = o('String', 'startsWith');
        },
        function(e, n, t) {
            'use strict';
            var o = t(4),
                i = t(21),
                a = t(41),
                r = t(17),
                s = t(42),
                l = ''.startsWith,
                c = Math.min;
            o(
                { target: 'String', proto: !0, forced: !s('startsWith') },
                {
                    startsWith: function(e) {
                        var n = String(r(this));
                        a(e);
                        var t = i(c(arguments.length > 1 ? arguments[1] : void 0, n.length)),
                            o = String(e);
                        return l ? l.call(n, o, t) : n.slice(t, t + o.length) === o;
                    }
                }
            );
        },
        function(e, n, t) {
            var o = t(13),
                i = t(26),
                a = t(5)('match');
            e.exports = function(e) {
                var n;
                return o(e) && (void 0 !== (n = e[a]) ? !!n : 'RegExp' == i(e));
            };
        },
        function(e, n, t) {
            t(142);
            var o = t(15);
            e.exports = o.Object.values;
        },
        function(e, n, t) {
            var o = t(4),
                i = t(49).values;
            o(
                { target: 'Object', stat: !0 },
                {
                    values: function(e) {
                        return i(e);
                    }
                }
            );
        },
        function(e, n, t) {
            'undefined' != typeof self && self,
                (e.exports = (function(e) {
                    var n = {};
                    function t(o) {
                        if (n[o]) return n[o].exports;
                        var i = (n[o] = { i: o, l: !1, exports: {} });
                        return e[o].call(i.exports, i, i.exports, t), (i.l = !0), i.exports;
                    }
                    return (
                        (t.m = e),
                        (t.c = n),
                        (t.d = function(e, n, o) {
                            t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: o });
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
                        t((t.s = './src/index.js'))
                    );
                })({
                    './src/index.js': function(e, n, t) {
                        'use strict';
                        function o(e) {
                            try {
                                if (!e) return !1;
                                if ('undefined' != typeof Promise && e instanceof Promise) return !0;
                                if ('undefined' != typeof window && window.Window && e instanceof window.Window)
                                    return !1;
                                if (
                                    'undefined' != typeof window &&
                                    window.constructor &&
                                    e instanceof window.constructor
                                )
                                    return !1;
                                var n = {}.toString;
                                if (n) {
                                    var t = n.call(e);
                                    if (
                                        '[object Window]' === t ||
                                        '[object global]' === t ||
                                        '[object DOMWindow]' === t
                                    )
                                        return !1;
                                }
                                if ('function' == typeof e.then) return !0;
                            } catch (e) {
                                return !1;
                            }
                            return !1;
                        }
                        Object.defineProperty(n, '__esModule', { value: !0 });
                        var i = [],
                            a = [],
                            r = 0,
                            s = void 0;
                        function l() {
                            if (!r && s) {
                                var e = s;
                                (s = null), e.resolve();
                            }
                        }
                        function c() {
                            r += 1;
                        }
                        function u() {
                            (r -= 1), l();
                        }
                        var d = (function() {
                            function e(n) {
                                var t = this;
                                if (
                                    ((function(n, t) {
                                        if (!(n instanceof e)) throw new TypeError('Cannot call a class as a function');
                                    })(this),
                                    (this.resolved = !1),
                                    (this.rejected = !1),
                                    (this.errorHandled = !1),
                                    (this.handlers = []),
                                    n)
                                ) {
                                    var o = void 0,
                                        i = void 0,
                                        a = !1,
                                        r = !1,
                                        s = !1;
                                    c();
                                    try {
                                        n(
                                            function(e) {
                                                s ? t.resolve(e) : ((a = !0), (o = e));
                                            },
                                            function(e) {
                                                s ? t.reject(e) : ((r = !0), (i = e));
                                            }
                                        );
                                    } catch (e) {
                                        return u(), void this.reject(e);
                                    }
                                    u(), (s = !0), a ? this.resolve(o) : r && this.reject(i);
                                }
                            }
                            return (
                                (e.prototype.resolve = function(e) {
                                    if (this.resolved || this.rejected) return this;
                                    if (o(e)) throw new Error('Can not resolve promise with another promise');
                                    return (this.resolved = !0), (this.value = e), this.dispatch(), this;
                                }),
                                (e.prototype.reject = function(e) {
                                    var n = this;
                                    if (this.resolved || this.rejected) return this;
                                    if (o(e)) throw new Error('Can not reject promise with another promise');
                                    if (!e) {
                                        var t =
                                            e && 'function' == typeof e.toString ? e.toString() : {}.toString.call(e);
                                        e = new Error('Expected reject to be called with Error, got ' + t);
                                    }
                                    return (
                                        (this.rejected = !0),
                                        (this.error = e),
                                        this.errorHandled ||
                                            setTimeout(function() {
                                                n.errorHandled ||
                                                    (function(e, n) {
                                                        if (-1 === i.indexOf(e)) {
                                                            i.push(e),
                                                                setTimeout(function() {
                                                                    throw e;
                                                                }, 1);
                                                            for (var t = 0; t < a.length; t++) a[t](e, n);
                                                        }
                                                    })(e, n);
                                            }, 1),
                                        this.dispatch(),
                                        this
                                    );
                                }),
                                (e.prototype.asyncReject = function(e) {
                                    return (this.errorHandled = !0), this.reject(e), this;
                                }),
                                (e.prototype.dispatch = function() {
                                    var n = this,
                                        t = this.resolved,
                                        i = this.rejected,
                                        a = this.handlers;
                                    if (!this.dispatching && (t || i)) {
                                        (this.dispatching = !0), c();
                                        for (
                                            var r = function(r) {
                                                    var s = a[r],
                                                        l = s.onSuccess,
                                                        c = s.onError,
                                                        u = s.promise,
                                                        d = void 0;
                                                    if (t)
                                                        try {
                                                            d = l ? l(n.value) : n.value;
                                                        } catch (e) {
                                                            return u.reject(e), 'continue';
                                                        }
                                                    else if (i) {
                                                        if (!c) return u.reject(n.error), 'continue';
                                                        try {
                                                            d = c(n.error);
                                                        } catch (e) {
                                                            return u.reject(e), 'continue';
                                                        }
                                                    }
                                                    d instanceof e && (d.resolved || d.rejected)
                                                        ? (d.resolved ? u.resolve(d.value) : u.reject(d.error),
                                                          (d.errorHandled = !0))
                                                        : o(d)
                                                        ? d instanceof e && (d.resolved || d.rejected)
                                                            ? d.resolved
                                                                ? u.resolve(d.value)
                                                                : u.reject(d.error)
                                                            : d.then(
                                                                  function(e) {
                                                                      u.resolve(e);
                                                                  },
                                                                  function(e) {
                                                                      u.reject(e);
                                                                  }
                                                              )
                                                        : u.resolve(d);
                                                },
                                                s = 0;
                                            s < a.length;
                                            s++
                                        )
                                            r(s);
                                        (a.length = 0), (this.dispatching = !1), u();
                                    }
                                }),
                                (e.prototype.then = function(n, t) {
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
                                (e.prototype.catch = function(e) {
                                    return this.then(void 0, e);
                                }),
                                (e.prototype.finally = function(n) {
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
                                (e.prototype.timeout = function(e, n) {
                                    var t = this;
                                    if (this.resolved || this.rejected) return this;
                                    var o = setTimeout(function() {
                                        t.resolved ||
                                            t.rejected ||
                                            t.reject(n || new Error('Promise timed out after ' + e + 'ms'));
                                    }, e);
                                    return this.then(function(e) {
                                        return clearTimeout(o), e;
                                    });
                                }),
                                (e.prototype.toPromise = function() {
                                    if ('undefined' == typeof Promise) throw new TypeError('Could not find Promise');
                                    return Promise.resolve(this);
                                }),
                                (e.resolve = function(n) {
                                    return n instanceof e
                                        ? n
                                        : o(n)
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
                                        i = n.length,
                                        a = [];
                                    if (!i) return t.resolve(a), t;
                                    for (
                                        var r = function(r) {
                                                var s = n[r];
                                                if (s instanceof e) {
                                                    if (s.resolved) return (a[r] = s.value), (i -= 1), 'continue';
                                                } else if (!o(s)) return (a[r] = s), (i -= 1), 'continue';
                                                e.resolve(s).then(
                                                    function(e) {
                                                        (a[r] = e), 0 == (i -= 1) && t.resolve(a);
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
                                    return 0 === i && t.resolve(a), t;
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
                                            a.push(e),
                                            {
                                                cancel: function() {
                                                    a.splice(a.indexOf(e), 1);
                                                }
                                            }
                                        );
                                    })(e);
                                }),
                                (e.try = function(n, t, o) {
                                    if (n && 'function' != typeof n && !n.call)
                                        throw new Error('Promise.try expected a function');
                                    var i = void 0;
                                    c();
                                    try {
                                        i = n.apply(t, o || []);
                                    } catch (n) {
                                        return u(), e.reject(n);
                                    }
                                    return u(), e.resolve(i);
                                }),
                                (e.delay = function(n) {
                                    return new e(function(e) {
                                        setTimeout(e, n);
                                    });
                                }),
                                (e.isPromise = function(n) {
                                    return !!(n && n instanceof e) || o(n);
                                }),
                                (e.flush = function() {
                                    return (n = s = s || new e()), l(), n;
                                    var n;
                                }),
                                e
                            );
                        })();
                        t.d(n, 'ZalgoPromise', function() {
                            return d;
                        });
                    }
                }));
        },
        function(e, n, t) {
            t(145);
            var o = t(22);
            e.exports = o('Array', 'find');
        },
        function(e, n, t) {
            'use strict';
            var o = t(4),
                i = t(146).find,
                a = t(56),
                r = !0;
            'find' in [] &&
                Array(1).find(function() {
                    r = !1;
                }),
                o(
                    { target: 'Array', proto: !0, forced: r },
                    {
                        find: function(e) {
                            return i(this, e, arguments.length > 1 ? arguments[1] : void 0);
                        }
                    }
                ),
                a('find');
        },
        function(e, n, t) {
            var o = t(34),
                i = t(32),
                a = t(28),
                r = t(21),
                s = t(147),
                l = [].push,
                c = function(e) {
                    var n = 1 == e,
                        t = 2 == e,
                        c = 3 == e,
                        u = 4 == e,
                        d = 6 == e,
                        m = 5 == e || d;
                    return function(f, p, g, h) {
                        for (
                            var y,
                                _,
                                w = a(f),
                                v = i(w),
                                x = o(p, g, 3),
                                b = r(v.length),
                                E = 0,
                                P = h || s,
                                A = n ? P(f, b) : t ? P(f, 0) : void 0;
                            b > E;
                            E++
                        )
                            if ((m || E in v) && ((_ = x((y = v[E]), E, w)), e))
                                if (n) A[E] = _;
                                else if (_)
                                    switch (e) {
                                        case 3:
                                            return !0;
                                        case 5:
                                            return y;
                                        case 6:
                                            return E;
                                        case 2:
                                            l.call(A, y);
                                    }
                                else if (u) return !1;
                        return d ? -1 : c || u ? u : A;
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
            var o = t(13),
                i = t(148),
                a = t(5)('species');
            e.exports = function(e, n) {
                var t;
                return (
                    i(e) &&
                        ('function' != typeof (t = e.constructor) || (t !== Array && !i(t.prototype))
                            ? o(t) && null === (t = t[a]) && (t = void 0)
                            : (t = void 0)),
                    new (void 0 === t ? Array : t)(0 === n ? 0 : n)
                );
            };
        },
        function(e, n, t) {
            var o = t(26);
            e.exports =
                Array.isArray ||
                function(e) {
                    return 'Array' == o(e);
                };
        },
        function(e, n, t) {
            t(150);
            var o = t(22);
            e.exports = o('String', 'endsWith');
        },
        function(e, n, t) {
            'use strict';
            var o = t(4),
                i = t(21),
                a = t(41),
                r = t(17),
                s = t(42),
                l = ''.endsWith,
                c = Math.min;
            o(
                { target: 'String', proto: !0, forced: !s('endsWith') },
                {
                    endsWith: function(e) {
                        var n = String(r(this));
                        a(e);
                        var t = arguments.length > 1 ? arguments[1] : void 0,
                            o = i(n.length),
                            s = void 0 === t ? o : c(i(t), o),
                            u = String(e);
                        return l ? l.call(n, u, s) : n.slice(s - u.length, s) === u;
                    }
                }
            );
        },
        function(e, n, t) {
            t(152);
            var o = t(22);
            e.exports = o('String', 'includes');
        },
        function(e, n, t) {
            'use strict';
            var o = t(4),
                i = t(41),
                a = t(17);
            o(
                { target: 'String', proto: !0, forced: !t(42)('includes') },
                {
                    includes: function(e) {
                        return !!~String(a(this)).indexOf(i(e), arguments.length > 1 ? arguments[1] : void 0);
                    }
                }
            );
        },
        function(e, n, t) {
            t(154);
            var o = t(15);
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
            t.r(n);
            var o = {};
            function i() {
                return (i =
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
                    i = {},
                    a = Object.keys(e);
                for (o = 0; o < a.length; o++) n.indexOf((t = a[o])) >= 0 || (i[t] = e[t]);
                return i;
            }
            t.r(o),
                t.d(o, 'WeakMap', function() {
                    return v;
                });
            var r = { MOCK: 'mock:', FILE: 'file:', ABOUT: 'about:' },
                s = 'Call was rejected by callee.\r\n';
            function l(e) {
                return void 0 === e && (e = window), e.location.protocol === r.ABOUT;
            }
            function c(e) {
                try {
                    return !0;
                } catch (e) {}
                return !1;
            }
            function u(e) {
                var n = (e = e || window).location;
                if (!n) throw new Error('Can not read window location');
                var t = n.protocol;
                if (!t) throw new Error('Can not read window protocol');
                if (t === r.FILE) return r.FILE + '//';
                if (t === r.ABOUT) {
                    var o = (function(e) {
                        if ((void 0 === e && (e = window), e))
                            try {
                                if (e.parent && e.parent !== e) return e.parent;
                            } catch (e) {}
                    })(e);
                    return o && c() ? u(o) : r.ABOUT + '//';
                }
                var i = n.host;
                if (!i) throw new Error('Can not read window host');
                return t + '//' + i;
            }
            function d(e) {
                var n = u((e = e || window));
                return n && e.mockDomain && 0 === e.mockDomain.indexOf(r.MOCK) ? e.mockDomain : n;
            }
            var m = [],
                f = [];
            function p(e, n) {
                void 0 === n && (n = !0);
                try {
                    if (e === window) return !1;
                } catch (e) {
                    return !0;
                }
                try {
                    if (!e) return !0;
                } catch (e) {
                    return !0;
                }
                try {
                    if (e.closed) return !0;
                } catch (e) {
                    return !e || e.message !== s;
                }
                if (
                    n &&
                    (function(e) {
                        if (
                            !(function(e) {
                                try {
                                    if (e === window) return !0;
                                } catch (e) {}
                                try {
                                    var n = Object.getOwnPropertyDescriptor(e, 'location');
                                    if (n && !1 === n.enumerable) return !1;
                                } catch (e) {}
                                try {
                                    if (l(e) && c()) return !0;
                                } catch (e) {}
                                try {
                                    if (u(e) === u(window)) return !0;
                                } catch (e) {}
                                return !1;
                            })(e)
                        )
                            return !1;
                        try {
                            if (e === window) return !0;
                            if (l(e) && c()) return !0;
                            if (d(window) === d(e)) return !0;
                        } catch (e) {}
                        return !1;
                    })(e)
                )
                    try {
                        if (e.mockclosed) return !0;
                    } catch (e) {}
                try {
                    if (!e.parent || !e.top) return !0;
                } catch (e) {}
                var t = (function(e, n) {
                    for (var t = 0; t < e.length; t++)
                        try {
                            if (e[t] === n) return t;
                        } catch (e) {}
                    return -1;
                })(m, e);
                if (-1 !== t) {
                    var o = f[t];
                    if (
                        o &&
                        (function(e) {
                            if (!e.contentWindow) return !0;
                            if (!e.parentNode) return !0;
                            var n = e.ownerDocument;
                            return !(!n || !n.documentElement || n.documentElement.contains(e));
                        })(o)
                    )
                        return !0;
                }
                return !1;
            }
            function g(e) {
                try {
                    if (e === window) return !0;
                } catch (e) {
                    if (e && e.message === s) return !0;
                }
                try {
                    if ('[object Window]' === {}.toString.call(e)) return !0;
                } catch (e) {
                    if (e && e.message === s) return !0;
                }
                try {
                    if (window.Window && e instanceof window.Window) return !0;
                } catch (e) {
                    if (e && e.message === s) return !0;
                }
                try {
                    if (e && e.self === e) return !0;
                } catch (e) {
                    if (e && e.message === s) return !0;
                }
                try {
                    if (e && e.parent === e) return !0;
                } catch (e) {
                    if (e && e.message === s) return !0;
                }
                try {
                    if (e && e.top === e) return !0;
                } catch (e) {
                    if (e && e.message === s) return !0;
                }
                try {
                    if (e && '__unlikely_value__' === e.__cross_domain_utils_window_check__) return !1;
                } catch (e) {
                    return !0;
                }
                return !1;
            }
            function h(e, n) {
                for (var t = 0; t < e.length; t++)
                    try {
                        if (e[t] === n) return t;
                    } catch (e) {}
                return -1;
            }
            var y,
                _ = Object.defineProperty,
                w = Date.now() % 1e9,
                v = (function() {
                    function e() {
                        if (
                            ((this.name = void 0),
                            (this.weakmap = void 0),
                            (this.keys = void 0),
                            (this.values = void 0),
                            (w += 1),
                            (this.name = '__weakmap_' + ((1e9 * Math.random()) >>> 0) + '__' + w),
                            (function() {
                                if ('undefined' == typeof WeakMap) return !1;
                                if (void 0 === Object.freeze) return !1;
                                try {
                                    var e = new WeakMap(),
                                        n = {};
                                    return Object.freeze(n), e.set(n, '__testvalue__'), '__testvalue__' === e.get(n);
                                } catch (e) {
                                    return !1;
                                }
                            })())
                        )
                            try {
                                this.weakmap = new WeakMap();
                            } catch (e) {}
                        (this.keys = []), (this.values = []);
                    }
                    var n = e.prototype;
                    return (
                        (n._cleanupClosedWindows = function() {
                            for (var e = this.weakmap, n = this.keys, t = 0; t < n.length; t++) {
                                var o = n[t];
                                if (g(o) && p(o)) {
                                    if (e)
                                        try {
                                            e.delete(o);
                                        } catch (e) {}
                                    n.splice(t, 1), this.values.splice(t, 1), (t -= 1);
                                }
                            }
                        }),
                        (n.isSafeToReadWrite = function(e) {
                            return !g(e);
                        }),
                        (n.set = function(e, n) {
                            if (!e) throw new Error('WeakMap expected key');
                            var t = this.weakmap;
                            if (t)
                                try {
                                    t.set(e, n);
                                } catch (e) {
                                    delete this.weakmap;
                                }
                            if (this.isSafeToReadWrite(e))
                                try {
                                    var o = this.name,
                                        i = e[o];
                                    return void (i && i[0] === e
                                        ? (i[1] = n)
                                        : _(e, o, { value: [e, n], writable: !0 }));
                                } catch (e) {}
                            this._cleanupClosedWindows();
                            var a = this.keys,
                                r = this.values,
                                s = h(a, e);
                            -1 === s ? (a.push(e), r.push(n)) : (r[s] = n);
                        }),
                        (n.get = function(e) {
                            if (!e) throw new Error('WeakMap expected key');
                            var n = this.weakmap;
                            if (n)
                                try {
                                    if (n.has(e)) return n.get(e);
                                } catch (e) {
                                    delete this.weakmap;
                                }
                            if (this.isSafeToReadWrite(e))
                                try {
                                    var t = e[this.name];
                                    return t && t[0] === e ? t[1] : void 0;
                                } catch (e) {}
                            this._cleanupClosedWindows();
                            var o = h(this.keys, e);
                            if (-1 !== o) return this.values[o];
                        }),
                        (n.delete = function(e) {
                            if (!e) throw new Error('WeakMap expected key');
                            var n = this.weakmap;
                            if (n)
                                try {
                                    n.delete(e);
                                } catch (e) {
                                    delete this.weakmap;
                                }
                            if (this.isSafeToReadWrite(e))
                                try {
                                    var t = e[this.name];
                                    t && t[0] === e && (t[0] = t[1] = void 0);
                                } catch (e) {}
                            this._cleanupClosedWindows();
                            var o = this.keys,
                                i = h(o, e);
                            -1 !== i && (o.splice(i, 1), this.values.splice(i, 1));
                        }),
                        (n.has = function(e) {
                            if (!e) throw new Error('WeakMap expected key');
                            var n = this.weakmap;
                            if (n)
                                try {
                                    if (n.has(e)) return !0;
                                } catch (e) {
                                    delete this.weakmap;
                                }
                            if (this.isSafeToReadWrite(e))
                                try {
                                    var t = e[this.name];
                                    return !(!t || t[0] !== e);
                                } catch (e) {}
                            return this._cleanupClosedWindows(), -1 !== h(this.keys, e);
                        }),
                        (n.getOrSet = function(e, n) {
                            if (this.has(e)) return this.get(e);
                            var t = n();
                            return this.set(e, t), t;
                        }),
                        e
                    );
                })();
            Object.create(Error.prototype);
            ({}[
                (((y = {}).AD = ['en', 'fr', 'es', 'zh']),
                (y.AE = ['en', 'fr', 'es', 'zh', 'ar']),
                (y.AG = ['en', 'fr', 'es', 'zh']),
                (y.AI = ['en', 'fr', 'es', 'zh']),
                (y.AL = ['en']),
                (y.AM = ['en', 'fr', 'es', 'zh']),
                (y.AN = ['en', 'fr', 'es', 'zh']),
                (y.AO = ['en', 'fr', 'es', 'zh']),
                (y.AR = ['es', 'en']),
                (y.AT = ['de', 'en']),
                (y.AU = ['en']),
                (y.AW = ['en', 'fr', 'es', 'zh']),
                (y.AZ = ['en', 'fr', 'es', 'zh']),
                (y.BA = ['en']),
                (y.BB = ['en', 'fr', 'es', 'zh']),
                (y.BE = ['en', 'nl', 'fr']),
                (y.BF = ['fr', 'en', 'es', 'zh']),
                (y.BG = ['en']),
                (y.BH = ['ar', 'en', 'fr', 'es', 'zh']),
                (y.BI = ['fr', 'en', 'es', 'zh']),
                (y.BJ = ['fr', 'en', 'es', 'zh']),
                (y.BM = ['en', 'fr', 'es', 'zh']),
                (y.BN = ['en']),
                (y.BO = ['es', 'en', 'fr', 'zh']),
                (y.BR = ['pt', 'en']),
                (y.BS = ['en', 'fr', 'es', 'zh']),
                (y.BT = ['en']),
                (y.BW = ['en', 'fr', 'es', 'zh']),
                (y.BY = ['en']),
                (y.BZ = ['en', 'es', 'fr', 'zh']),
                (y.CA = ['en', 'fr']),
                (y.CD = ['fr', 'en', 'es', 'zh']),
                (y.CG = ['en', 'fr', 'es', 'zh']),
                (y.CH = ['de', 'fr', 'en']),
                (y.CI = ['fr', 'en']),
                (y.CK = ['en', 'fr', 'es', 'zh']),
                (y.CL = ['es', 'en', 'fr', 'zh']),
                (y.CM = ['fr', 'en']),
                (y.CN = ['zh']),
                (y.CO = ['es', 'en', 'fr', 'zh']),
                (y.CR = ['es', 'en', 'fr', 'zh']),
                (y.CV = ['en', 'fr', 'es', 'zh']),
                (y.CY = ['en']),
                (y.CZ = ['cs', 'en', 'fr', 'es', 'zh']),
                (y.DE = ['de', 'en']),
                (y.DJ = ['fr', 'en', 'es', 'zh']),
                (y.DK = ['da', 'en']),
                (y.DM = ['en', 'fr', 'es', 'zh']),
                (y.DO = ['es', 'en', 'fr', 'zh']),
                (y.DZ = ['ar', 'en', 'fr', 'es', 'zh']),
                (y.EC = ['es', 'en', 'fr', 'zh']),
                (y.EE = ['en', 'ru', 'fr', 'es', 'zh']),
                (y.EG = ['ar', 'en', 'fr', 'es', 'zh']),
                (y.ER = ['en', 'fr', 'es', 'zh']),
                (y.ES = ['es', 'en']),
                (y.ET = ['en', 'fr', 'es', 'zh']),
                (y.FI = ['fi', 'en', 'fr', 'es', 'zh']),
                (y.FJ = ['en', 'fr', 'es', 'zh']),
                (y.FK = ['en', 'fr', 'es', 'zh']),
                (y.FM = ['en']),
                (y.FO = ['da', 'en', 'fr', 'es', 'zh']),
                (y.FR = ['fr', 'en']),
                (y.GA = ['fr', 'en', 'es', 'zh']),
                (y.GB = ['en']),
                (y.GD = ['en', 'fr', 'es', 'zh']),
                (y.GE = ['en', 'fr', 'es', 'zh']),
                (y.GF = ['en', 'fr', 'es', 'zh']),
                (y.GI = ['en', 'fr', 'es', 'zh']),
                (y.GL = ['da', 'en', 'fr', 'es', 'zh']),
                (y.GM = ['en', 'fr', 'es', 'zh']),
                (y.GN = ['fr', 'en', 'es', 'zh']),
                (y.GP = ['en', 'fr', 'es', 'zh']),
                (y.GR = ['el', 'en', 'fr', 'es', 'zh']),
                (y.GT = ['es', 'en', 'fr', 'zh']),
                (y.GW = ['en', 'fr', 'es', 'zh']),
                (y.GY = ['en', 'fr', 'es', 'zh']),
                (y.HK = ['en', 'zh']),
                (y.HN = ['es', 'en', 'fr', 'zh']),
                (y.HR = ['en']),
                (y.HU = ['hu', 'en', 'fr', 'es', 'zh']),
                (y.ID = ['id', 'en']),
                (y.IE = ['en', 'fr', 'es', 'zh']),
                (y.IL = ['he', 'en']),
                (y.IN = ['en']),
                (y.IS = ['en']),
                (y.IT = ['it', 'en']),
                (y.JM = ['en', 'es', 'fr', 'zh']),
                (y.JO = ['ar', 'en', 'fr', 'es', 'zh']),
                (y.JP = ['ja', 'en']),
                (y.KE = ['en', 'fr', 'es', 'zh']),
                (y.KG = ['en', 'fr', 'es', 'zh']),
                (y.KH = ['en']),
                (y.KI = ['en', 'fr', 'es', 'zh']),
                (y.KM = ['fr', 'en', 'es', 'zh']),
                (y.KN = ['en', 'fr', 'es', 'zh']),
                (y.KR = ['ko', 'en']),
                (y.KW = ['ar', 'en', 'fr', 'es', 'zh']),
                (y.KY = ['en', 'fr', 'es', 'zh']),
                (y.KZ = ['en', 'fr', 'es', 'zh']),
                (y.LA = ['en']),
                (y.LC = ['en', 'fr', 'es', 'zh']),
                (y.LI = ['en', 'fr', 'es', 'zh']),
                (y.LK = ['en']),
                (y.LS = ['en', 'fr', 'es', 'zh']),
                (y.LT = ['en', 'ru', 'fr', 'es', 'zh']),
                (y.LU = ['en', 'de', 'fr', 'es', 'zh']),
                (y.LV = ['en', 'ru', 'fr', 'es', 'zh']),
                (y.MA = ['ar', 'en', 'fr', 'es', 'zh']),
                (y.MC = ['fr', 'en']),
                (y.MD = ['en']),
                (y.ME = ['en']),
                (y.MG = ['en', 'fr', 'es', 'zh']),
                (y.MH = ['en', 'fr', 'es', 'zh']),
                (y.MK = ['en']),
                (y.ML = ['fr', 'en', 'es', 'zh']),
                (y.MN = ['en']),
                (y.MQ = ['en', 'fr', 'es', 'zh']),
                (y.MR = ['en', 'fr', 'es', 'zh']),
                (y.MS = ['en', 'fr', 'es', 'zh']),
                (y.MT = ['en']),
                (y.MU = ['en', 'fr', 'es', 'zh']),
                (y.MV = ['en']),
                (y.MW = ['en', 'fr', 'es', 'zh']),
                (y.MX = ['es', 'en']),
                (y.MY = ['en']),
                (y.MZ = ['en', 'fr', 'es', 'zh']),
                (y.NA = ['en', 'fr', 'es', 'zh']),
                (y.NC = ['en', 'fr', 'es', 'zh']),
                (y.NE = ['fr', 'en', 'es', 'zh']),
                (y.NF = ['en', 'fr', 'es', 'zh']),
                (y.NG = ['en']),
                (y.NI = ['es', 'en', 'fr', 'zh']),
                (y.NL = ['nl', 'en']),
                (y.NO = ['no', 'en']),
                (y.NP = ['en']),
                (y.NR = ['en', 'fr', 'es', 'zh']),
                (y.NU = ['en', 'fr', 'es', 'zh']),
                (y.NZ = ['en', 'fr', 'es', 'zh']),
                (y.OM = ['ar', 'en', 'fr', 'es', 'zh']),
                (y.PA = ['es', 'en', 'fr', 'zh']),
                (y.PE = ['es', 'en', 'fr', 'zh']),
                (y.PF = ['en', 'fr', 'es', 'zh']),
                (y.PG = ['en', 'fr', 'es', 'zh']),
                (y.PH = ['en']),
                (y.PL = ['pl', 'en']),
                (y.PM = ['en', 'fr', 'es', 'zh']),
                (y.PN = ['en', 'fr', 'es', 'zh']),
                (y.PT = ['pt', 'en']),
                (y.PW = ['en', 'fr', 'es', 'zh']),
                (y.PY = ['es', 'en']),
                (y.QA = ['en', 'fr', 'es', 'zh', 'ar']),
                (y.RE = ['en', 'fr', 'es', 'zh']),
                (y.RO = ['en', 'fr', 'es', 'zh']),
                (y.RS = ['en', 'fr', 'es', 'zh']),
                (y.RU = ['ru', 'en']),
                (y.RW = ['fr', 'en', 'es', 'zh']),
                (y.SA = ['ar', 'en', 'fr', 'es', 'zh']),
                (y.SB = ['en', 'fr', 'es', 'zh']),
                (y.SC = ['fr', 'en', 'es', 'zh']),
                (y.SE = ['sv', 'en']),
                (y.SG = ['en']),
                (y.SH = ['en', 'fr', 'es', 'zh']),
                (y.SI = ['en', 'fr', 'es', 'zh']),
                (y.SJ = ['en', 'fr', 'es', 'zh']),
                (y.SK = ['sk', 'en', 'fr', 'es', 'zh']),
                (y.SL = ['en', 'fr', 'es', 'zh']),
                (y.SM = ['en', 'fr', 'es', 'zh']),
                (y.SN = ['fr', 'en', 'es', 'zh']),
                (y.SO = ['en', 'fr', 'es', 'zh']),
                (y.SR = ['en', 'fr', 'es', 'zh']),
                (y.ST = ['en', 'fr', 'es', 'zh']),
                (y.SV = ['es', 'en', 'fr', 'zh']),
                (y.SZ = ['en', 'fr', 'es', 'zh']),
                (y.TC = ['en', 'fr', 'es', 'zh']),
                (y.TD = ['fr', 'en', 'es', 'zh']),
                (y.TG = ['fr', 'en', 'es', 'zh']),
                (y.TH = ['th', 'en']),
                (y.TJ = ['en', 'fr', 'es', 'zh']),
                (y.TM = ['en', 'fr', 'es', 'zh']),
                (y.TN = ['ar', 'en', 'fr', 'es', 'zh']),
                (y.TO = ['en']),
                (y.TR = ['tr', 'en']),
                (y.TT = ['en', 'fr', 'es', 'zh']),
                (y.TV = ['en', 'fr', 'es', 'zh']),
                (y.TW = ['zh', 'en']),
                (y.TZ = ['en', 'fr', 'es', 'zh']),
                (y.UA = ['en', 'ru', 'fr', 'es', 'zh']),
                (y.UG = ['en', 'fr', 'es', 'zh']),
                (y.US = ['en', 'fr', 'es', 'zh']),
                (y.UY = ['es', 'en', 'fr', 'zh']),
                (y.VA = ['en', 'fr', 'es', 'zh']),
                (y.VC = ['en', 'fr', 'es', 'zh']),
                (y.VE = ['es', 'en', 'fr', 'zh']),
                (y.VG = ['en', 'fr', 'es', 'zh']),
                (y.VN = ['en']),
                (y.VU = ['en', 'fr', 'es', 'zh']),
                (y.WF = ['en', 'fr', 'es', 'zh']),
                (y.WS = ['en']),
                (y.YE = ['ar', 'en', 'fr', 'es', 'zh']),
                (y.YT = ['en', 'fr', 'es', 'zh']),
                (y.ZA = ['en', 'fr', 'es', 'zh']),
                (y.ZM = ['en', 'fr', 'es', 'zh']),
                (y.ZW = ['en']),
                {
                    COMPONENTS: 'components',
                    ENV: 'env',
                    DEBUG: 'debug',
                    CACHEBUST: 'cachebust',
                    CLIENT_ID: 'client-id',
                    MERCHANT_ID: 'merchant-id',
                    LOCALE: 'locale',
                    CURRENCY: 'currency',
                    INTENT: 'intent',
                    COMMIT: 'commit',
                    VAULT: 'vault',
                    BUYER_COUNTRY: 'buyer-country',
                    DISABLE_FUNDING: 'disable-funding',
                    DISABLE_CARD: 'disable-card',
                    LOCALE_COUNTRY: 'locale-country',
                    LOCALE_LANG: 'locale-lang',
                    FRAMEWORK: 'framework',
                    INTEGRATION_DATE: 'integration-date',
                    ORDER_CURRENCY: 'order-currency',
                    ORDER_INTENT: 'order-intent',
                    ORDER_COMMIT: 'order-commit',
                    ORDER_VAULT: 'order-vault'
                }).CLIENT_ID
            ] = 'abcxyz123');
            var x = t(7),
                b = t.n(x),
                E = t(3),
                P = t.n(E),
                A = t(2),
                R = t.n(A),
                z = t(6),
                I = t.n(z),
                T = t(1),
                O = t.n(T);
            function S(e) {
                var n = new Map();
                return function() {
                    for (var t = arguments.length, o = new Array(t), i = 0; i < t; i++) o[i] = arguments[i];
                    var a = JSON.stringify(o);
                    return n.has(a) || n.set(a, e.apply(void 0, o)), n.get(a);
                };
            }
            function L(e, n) {
                var t = new Map();
                return function(o, i) {
                    void 0 === i && (i = !1);
                    var a = JSON.stringify(
                        n.map(function(e) {
                            return o[e];
                        })
                    );
                    return (t.has(a) && !i) || t.set(a, e(o)), t.get(a);
                };
            }
            function C(e) {
                for (var n = arguments.length, t = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)
                    t[o - 1] = arguments[o];
                return function() {
                    for (var n = arguments.length, o = new Array(n), i = 0; i < n; i++) o[i] = arguments[i];
                    return e.apply(void 0, t.concat(o));
                };
            }
            function N(e, n) {
                return (
                    void 0 === n && (n = e.length),
                    function t() {
                        for (var o = arguments.length, i = new Array(o), a = 0; a < o; a++) i[a] = arguments[a];
                        return i.length < n
                            ? function() {
                                  for (var e = arguments.length, n = new Array(e), o = 0; o < e; o++)
                                      n[o] = arguments[o];
                                  return t.apply(void 0, i.concat(n));
                              }
                            : e.apply(void 0, i);
                    }
                );
            }
            function M(e) {
                return function(n) {
                    var t = e(n);
                    return 'object' == typeof t && t.then
                        ? t.then(function() {
                              return n;
                          })
                        : n;
                };
            }
            function k(e) {
                void 0 === e && (e = {});
                var n = i({}, e);
                return [n, C(b.a, n)];
            }
            function j(e) {
                return P()(e).reduce(function(e, n) {
                    var t,
                        o,
                        a,
                        r = n[0],
                        s = n[1];
                    return Array.isArray(s)
                        ? i({}, e, (((o = {})[r] = [].concat(s)), o))
                        : i({}, e, 'object' == typeof s ? (((a = {})[r] = j(s)), a) : (((t = {})[r] = s), t));
                }, {});
            }
            function W(e, n) {
                return (function e(n, t) {
                    return P()(t).reduce(function(t, o) {
                        var a,
                            r,
                            s,
                            l,
                            c = o[0],
                            u = o[1];
                        return Array.isArray(u)
                            ? i({}, t, (((r = {})[c] = [].concat(u)), r))
                            : 'object' != typeof u ||
                              null === u ||
                              (n[c] && 'object' == typeof n[c] && !Array.isArray(n[c]))
                            ? i(
                                  {},
                                  t,
                                  'object' == typeof u && null !== u
                                      ? (((l = {})[c] = e(n[c], u)), l)
                                      : (((a = {})[c] = u), a)
                              )
                            : i({}, t, (((s = {})[c] = j(u)), s));
                    }, n);
                })(j(e), n);
            }
            function H(e, n) {
                return n.split('.').reduce(function(e, n) {
                    return 'object' == typeof e || 'function' == typeof e ? e[n] : void 0;
                }, e);
            }
            function B(e, n, t) {
                var o;
                void 0 === t && (t = '-');
                var i,
                    a = e.indexOf(t);
                if (-1 === a) return ((i = {})[e] = n), i;
                var r = e.slice(0, a),
                    s = e.slice(a + 1);
                return ((o = {})[r] = B(s, n)), o;
            }
            function D(e) {
                return 'object' == typeof HTMLElement
                    ? e instanceof HTMLElement
                    : e && 'object' == typeof e && null !== e && 1 === e.nodeType && 'string' == typeof e.nodeName;
            }
            function Y(e) {
                var n = R()(e.attributes)
                    .filter(function(e) {
                        var n = e.nodeName;
                        return O()(n, 'data-pp-');
                    })
                    .reduce(function(e, n) {
                        var t = n.nodeValue;
                        return t ? W(e, B(n.nodeName.replace('data-pp-', ''), t)) : e;
                    }, {});
                if (
                    !e.firstElementChild ||
                    'SCRIPT' !== e.firstElementChild.tagName ||
                    'text/template' !== e.firstElementChild.getAttribute('type')
                )
                    return n;
                var t = e.firstElementChild.textContent.trim();
                return e.removeChild(e.firstElementChild), W(n, { style: { markup: t } });
            }
            var G = k(window.__paypal_messages_state__ || { nextId: 0, config: {} }),
                F = G[0],
                U = G[1];
            Object.defineProperty(window, '__paypal_messages_state__', {
                value: F,
                enumerable: !1,
                configurable: !0,
                writable: !1
            });
            var V = t(18),
                Z = t.n(V),
                K = t(0),
                J = N(function(e, n, t) {
                    var o = e.uuid,
                        a = e.urls;
                    void 0 === t && (t = !1);
                    var r = new window.Image();
                    if ('object' == typeof n) {
                        var s = i({}, n, { uuid: t ? o + '::banner.hidden:true' : o }),
                            l = P()(s).reduce(function(e, n) {
                                return e + '&' + n[0] + '=' + n[1];
                            }, '');
                        r.src = (a[n.et] || a.DEFAULT) + '&bdata=' + encodeURIComponent(l.slice(1));
                    } else 'string' == typeof n && (r.src = a[n] || a.DEFAULT);
                }, 2),
                q = {
                    STARTING_MESSAGE_RENDER: 'Starting_Message_Render',
                    IFRAME_CREATED: 'iFrame_Created',
                    MESSAGE_FETCH_INITIATED: 'Message_Fetch_Initiated',
                    MESSAGE_FETCH_RECEIVED: 'Message_Fetch_Received',
                    MESSAGE_CREATE_INITIATED: 'Message_Create_Initiated',
                    MESSAGE_UPDATE_INITIATED: 'Message_Update_Initiated',
                    MESSAGE_RENDERED: 'Message_Rendered',
                    ERROR: 'ERROR',
                    FLUSH: 'FLUSH',
                    FLUSH_CAP: 'FLUSH_CAP'
                },
                $ = {
                    OVERFLOW: 'Banner Overflow detected.',
                    HIDDEN: 'Overflow fallback failed.  Hiding banner.',
                    INVALID_STYLE_OPTIONS: 'Invalid account, styles, signature combination.',
                    INVALID_LEGACY_BANNER: 'Invalid legacy banner placement/offerType combination',
                    MODAL_LOAD_FAILURE: 'Modal failed to initialize.',
                    INVALID_CUSTOM_BANNER_JSON: 'Invalid JSON in custom banner creative'
                },
                Q = [],
                X = [];
            function ee(e) {
                var n = Z()(q);
                return e.reduce(function(e, t) {
                    if (I()(n, t.event)) {
                        e[t.event] = e[t.event] || [];
                        var o = i({}, t);
                        delete o.event, e[t.event].push(o);
                    }
                    return e;
                }, {});
            }
            var ne = 0,
                te = {
                    flush: function(e) {
                        return (
                            void 0 === e && (e = !1),
                            ne >= 3
                                ? K.ZalgoPromise.resolve()
                                : (e
                                      ? K.ZalgoPromise.resolve()
                                      : K.ZalgoPromise.all(X).then(function() {
                                            X.length = 0;
                                        })
                                  ).then(function() {
                                      if (0 !== Q.length) {
                                          Q.push({ event: q.FLUSH, flushType: e ? 'immediate' : 'normal' }),
                                              3 === (ne += 1) && Q.push({ event: q.FLUSH_CAP, cap: 3 });
                                          var n = { version: '1.0.0', events: ee(Q) };
                                          Q.length = 0;
                                          var t = new XMLHttpRequest();
                                          t.open('POST', 'https://www.paypal.com/ppcredit/messagingLogger', !0),
                                              t.setRequestHeader('Content-Type', 'application/json;charset=UTF-8'),
                                              t.send(JSON.stringify({ data: n }));
                                      }
                                  })
                        );
                    },
                    info: function(e, n) {
                        void 0 === n && (n = {}), Q.push(i({ event: e }, n));
                    },
                    error: function(e) {
                        te.info(q.ERROR, e), te.flush(!0);
                    },
                    waitFor: function(e) {
                        X.push(e);
                    },
                    track: J,
                    warn: function() {
                        for (var e, n = arguments.length, t = new Array(n), o = 0; o < n; o++) t[o] = arguments[o];
                        (e = console).warn.apply(e, ['[PayPal Messages]'].concat(t));
                    }
                },
                oe = !1;
            setInterval(function() {
                oe ||
                    ((oe = !0),
                    te.flush().then(function() {
                        oe = !1;
                    }));
            }, 3e3);
            var ie = S(function(e) {
                var n,
                    t = e.markup;
                return K.ZalgoPromise.resolve(
                    O()(t, 'https://www.paypalobjects.com')
                        ? ((n = t),
                          new K.ZalgoPromise(function(e) {
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
            var ae = { US: 'en_US', GB: 'en_GB', FR: 'fr_FR', DE: 'de_DE' };
            function re(e) {
                var n = e.match(/^<!--([\s\S]+?)-->/);
                if (n)
                    try {
                        return JSON.parse(n[1]);
                    } catch (e) {
                        throw new Error($.INVALID_CUSTOM_BANNER_JSON);
                    }
                return {};
            }
            var se = L(
                    function(e) {
                        var n = e.account,
                            t = e.amount,
                            o = e.countryCode;
                        return new K.ZalgoPromise(function(i) {
                            var a = 'c' + Math.floor(Math.random() * Math.pow(10, 19)),
                                r = {
                                    dimensions: 'x200x51',
                                    currency_value: t,
                                    format: 'HTML',
                                    presentation_types: 'HTML',
                                    ch: 'UPSTREAM',
                                    call: '__PP.' + a
                                };
                            o && ae[o] && ((r.country_code = o), (r.locale = ae[o]));
                            var s = P()(r)
                                    .filter(function(e) {
                                        return e[1];
                                    })
                                    .reduce(
                                        function(e, n) {
                                            return e + '&' + n[0] + '=' + n[1];
                                        },
                                        O()(n, 'client-id') ? 'client_id=' + n.slice(10) : 'pub_id=' + n
                                    ),
                                l = document.createElement('script');
                            (l.async = !0),
                                (l.src = 'https://www.paypal.com/imadserver/upstream?' + s),
                                te.info(q.MESSAGE_FETCH_INITIATED, { account: n, amount: t }),
                                document.head.appendChild(l),
                                (window.__PP[a] = function(o) {
                                    te.info(q.MESSAGE_FETCH_RECEIVED, { account: n, amount: t }),
                                        document.head.removeChild(l),
                                        delete window.__PP[a];
                                    try {
                                        i({ markup: JSON.parse(o.replace(/<\/?div>/g, '')), options: e });
                                    } catch (n) {
                                        i({ markup: o, options: e });
                                    }
                                });
                        });
                    },
                    ['account', 'amount', 'countryCode']
                ),
                le = { click: new Map(), message: new Map(), scroll: new Map(), hover: new Map(), resize: new Map() };
            function ce(e) {
                e.origin === window.top.location.origin &&
                    e.source === (e.source.frameElement && e.source.frameElement.contentWindow) &&
                    le.message.has(e.source.frameElement) &&
                    le.message.get(e.source.frameElement)(e);
            }
            function ue(e) {
                le.resize.has(e.target.frameElement) && le.resize.get(e.target.frameElement)(e);
            }
            function de(e) {
                le.scroll.forEach(function(n) {
                    return n(e);
                });
            }
            function me(e) {
                le.hover.has(e.target) && le.hover.get(e.target)(e);
            }
            function fe(e) {
                e.target.ownerDocument && le.click.has(e.target.ownerDocument.defaultView.frameElement)
                    ? le.click.get(e.target.ownerDocument.defaultView.frameElement)(e)
                    : le.click.has(e.currentTarget) && le.click.get(e.currentTarget)(e);
            }
            function pe(e) {
                return {
                    on: function(n, t) {
                        ('IFRAME' === e.tagName || ('resize' !== n && 'message' !== n)) &&
                            (function(e, n, t) {
                                if (
                                    ((function(e, n) {
                                        'scroll' === e && 0 === le.scroll.size
                                            ? window.addEventListener('scroll', de)
                                            : 'hover' === e && 0 === le.hover.size
                                            ? document.addEventListener('mouseover', me)
                                            : 'message' === e && 0 === le.message.size
                                            ? window.addEventListener('message', ce)
                                            : 'resize' !== e || le[e].has(n)
                                            ? 'click' !== e ||
                                              le[e].has(n) ||
                                              ('IFRAME' === n.tagName
                                                  ? n.contentWindow.document.body.addEventListener('click', fe)
                                                  : n.addEventListener('click', fe))
                                            : n.contentWindow.addEventListener('resize', ue);
                                    })(e, n),
                                    le[e].has(n))
                                ) {
                                    var o = le[e].get(n);
                                    le[e].set(n, function(e) {
                                        o(e), t(e);
                                    });
                                } else le[e].set(n, t);
                            })(n, e, t);
                    },
                    clear: function(n) {
                        le[n].delete(e),
                            'scroll' === n && 0 === le.scroll.size
                                ? window.removeEventListener('scroll', de)
                                : 'hover' === n && 0 === le.hover.size
                                ? document.removeEventListener('mouseover', me)
                                : 'click' === n
                                ? 'IFRAME' === e.tagName
                                    ? e.contentWindow.removeEventListener('click', fe)
                                    : e.removeEventListener('click', fe)
                                : 'IFRAME' === e.tagName &&
                                  ('resize' === n
                                      ? e.contentWindow.removeEventListener('resize', ue)
                                      : 'message' === n &&
                                        0 === le.message.size &&
                                        window.removeEventListener('message', ce));
                    }
                };
            }
            var ge = t(10),
                he = t.n(ge),
                ye = t(57),
                _e = t.n(ye),
                we = t(19),
                ve = t.n(we),
                xe = t(58),
                be = t.n(xe),
                Ee = t(59),
                Pe = t.n(Ee),
                Ae = t(30),
                Re = t.n(Ae),
                ze = t(9),
                Ie = t.n(ze),
                Te = t(60),
                Oe = t.n(Te),
                Se = t(61),
                Le = t.n(Se),
                Ce = t(43),
                Ne = t.n(Ce),
                Me = t(62),
                ke = t.n(Me),
                je = t(63),
                We = t.n(je),
                He = t(64),
                Be = t.n(He),
                De = t(65),
                Ye = t.n(De),
                Ge = t(66),
                Fe = t.n(Ge),
                Ue = t(67),
                Ve = t.n(Ue),
                Ze = [
                    ['default', [Ie.a, Re.a, Oe.a].join('\n')],
                    ['logo.type:primary', Ye.a],
                    ['logo.type:alternative', Le.a],
                    ['logo.type:inline', Ne.a],
                    ['logo.type:none', [Ne.a, ke.a].join('\n')],
                    ['logo.position:right', We.a],
                    ['logo.position:top', Be.a],
                    ['logo.type:alternative && logo.position:top', Fe.a],
                    ['text.color:white', Ve.a]
                ],
                Ke = t(68),
                Je = t.n(Ke),
                qe = t(69),
                $e = t.n(qe),
                Qe = t(70),
                Xe = t.n(Qe),
                en = t(44),
                nn = t.n(en),
                tn = t(71),
                on = t.n(tn),
                an = t(72),
                rn = t.n(an),
                sn = t(73),
                ln = t.n(sn),
                cn = t(74),
                un = t.n(cn),
                dn = t(75),
                mn = t.n(dn),
                fn = t(76),
                pn = t.n(fn),
                gn = t(77),
                hn = t.n(gn),
                yn = t(78),
                _n = t.n(yn),
                wn = [
                    ['default', [Ie.a, Re.a, Je.a].join('\n')],
                    ['ratio:1x1', $e.a],
                    ['ratio:1x4', Xe.a],
                    ['ratio:8x1', [nn.a, on.a].join('\n')],
                    ['ratio:20x1', [nn.a, rn.a].join('\n')],
                    ['color:blue', ln.a],
                    ['color:gray', un.a],
                    ['color:black', pn.a],
                    ['color:white', hn.a],
                    ['color:white-no-border', _n.a],
                    ['color:blue && ratio:1x4', mn.a]
                ],
                vn = t(79),
                xn = t.n(vn),
                bn = t(80),
                En = t.n(bn),
                Pn = t(81),
                An = t.n(Pn),
                Rn = t(82),
                zn = t.n(Rn),
                In = t(83),
                Tn = t.n(In),
                On = t(84),
                Sn = t.n(On),
                Ln = t(85),
                Cn = t.n(Ln),
                Nn = t(86),
                Mn = t.n(Nn),
                kn = t(87),
                jn = t.n(kn),
                Wn = t(88),
                Hn = t.n(Wn),
                Bn = t(89),
                Dn = t.n(Bn),
                Yn = t(90),
                Gn = t.n(Yn),
                Fn = t(91),
                Un = t.n(Fn),
                Vn = t(92),
                Zn = t.n(Vn),
                Kn = t(93),
                Jn = t.n(Kn),
                qn = t(94),
                $n = t.n(qn),
                Qn = t(95),
                Xn = t.n(Qn),
                et = t(96),
                nt = t.n(et),
                tt = t(97),
                ot = t.n(tt),
                it = t(98),
                at = {
                    x168x374: { styles: Sn.a, vertical: !0 },
                    x765x60: { styles: jn.a },
                    x1000x50: { styles: Hn.a, termsIcon: !0 },
                    x234x100: { styles: Cn.a, reverseLogo: !0 },
                    x310x100: { styles: Mn.a, reverseLogo: !0 },
                    x1000x36: { styles: Dn.a, termsIcon: !0 },
                    x120x90: { styles: Un.a, termsIcon: !0 },
                    x234x60: { styles: Zn.a, reverseLogo: !0, termsIcon: !0 },
                    x250x250: { styles: Jn.a, reverseLogo: !0, vertical: !0, termsIcon: !0 },
                    x300x50: { styles: $n.a, reverseLogo: !0 },
                    x340x60: { styles: Gn.a, reverseLogo: !0 },
                    x468x60: { styles: Xn.a, reverseLogo: !0, termsIcon: !0 },
                    x728x90: { styles: nt.a, reverseLogo: !0 },
                    x540x200: { styles: ot.a, reverseLogo: !0, termsIcon: !0 },
                    x170x100: { styles: t.n(it).a, termsIcon: !0 }
                },
                rt = Object.keys(at).map(function(e) {
                    var n = at[e],
                        t = e.slice(1),
                        o = t.split('x'),
                        i = o[1],
                        a =
                            '\n        .message {\n            width: ' +
                            o[0] +
                            'px;\n            min-height: ' +
                            i +
                            'px;\n        }\n\n        .message__container {\n            min-height: ' +
                            i +
                            'px;\n        }\n    ';
                    return (
                        n.vertical && (a = '' + a + An.a),
                        n.reverseLogo && (a = '' + a + En.a),
                        n.vertical && n.reverseLogo && (a = '' + a + zn.a),
                        n.termsIcon && (a = '' + a + Tn.a),
                        ['size:' + t, a]
                    );
                }),
                st = Object.keys(at).map(function(e) {
                    return ['size:' + e.slice(1), at[e].styles];
                }),
                lt = [['default', [Ie.a, xn.a].join('\n')]].concat(rt, st),
                ct = t(99),
                ut = {
                    'layout:text': Ze,
                    'layout:flex': wn,
                    'layout:legacy': lt,
                    'layout:custom': [['default', [Ie.a, t.n(ct).a].join('\n')]]
                },
                dt = {
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
            function mt(e) {
                return (
                    '\n    .message__headline span.multi:nth-child(2) {\n        display: none;\n    }\n\n    @media (min-width: ' +
                    e +
                    'px) {\n        .message__headline span.multi:first-child {\n            display: none;\n            \n        }\n\n        .message__headline span.multi:nth-child(2) {\n            display: inline;\n            \n        }\n    }\n'
                );
            }
            var ft = [
                    [
                        'default',
                        {
                            logo: dt.PRIMARY.COLOR,
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
                    ['size:234x100', { logo: dt.PRIMARY.WHITE }],
                    ['size:310x100', { logo: dt.PRIMARY.WHITE }],
                    ['size:340x60', { logo: dt.PRIMARY.WHITE, styles: ['.message { max-width: 100% }'] }]
                ],
                pt = {
                    'layout:text': [
                        [
                            'default',
                            {
                                styles: [
                                    mt(290),
                                    '.message__messaging { flex: 1 1 auto; }',
                                    '@media (max-width: 289px) { .message__disclaimer { display: block; } }'
                                ],
                                logo: dt.PRIMARY.COLOR,
                                headline: ['xsmall', { tag: 'medium', br: ['months'] }],
                                disclaimer: 'xsmall'
                            }
                        ],
                        ['logo.type:primary', { messageWidth: [130, 320] }],
                        [
                            'logo.type:inline',
                            {
                                messageWidth: [200, 1e3],
                                styles: [mt(280)],
                                logo: dt.ALT_NO_PP.COLOR,
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
                                styles: [mt(280)],
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
                                styles: [mt(520)],
                                logo: dt.ALTERNATIVE.COLOR,
                                headline: ['xsmall', { tag: 'medium', br: ['months'] }]
                            }
                        ],
                        ['logo.type:primary && logo.position:top', { styles: [mt(210)] }],
                        ['logo.type:alternative && logo.position:top', { styles: [mt(210)] }],
                        ['text.color:white && logo.type:primary', { logo: dt.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: dt.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: dt.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: dt.PRIMARY.WHITE,
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
                        ['color:gray', { logo: dt.PRIMARY.COLOR }],
                        ['color:white', { logo: dt.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: dt.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': ft
                },
                gt = {
                    'layout:text': [
                        [
                            'default',
                            {
                                styles: [mt(320)],
                                logo: dt.PRIMARY.COLOR,
                                headline: ['xsmall', { tag: 'medium', br: ['months'], replace: [['99+', '99+.']] }],
                                disclaimer: ['extra', 'xsmall']
                            }
                        ],
                        ['logo.type:primary', { messageWidth: [130, 320] }],
                        [
                            'logo.type:inline',
                            {
                                messageWidth: [240, 1e3],
                                styles: [mt(290)],
                                logo: dt.ALT_NO_PP.COLOR,
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
                                styles: [mt(290)],
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
                                styles: [mt(570)],
                                logo: dt.ALTERNATIVE.COLOR,
                                headline: ['xsmall', { tag: 'medium', br: ['months'], replace: [['99+', '99+.']] }]
                            }
                        ],
                        [
                            'logo.type:alternative && logo.position:top',
                            {
                                styles: [mt(230)],
                                messageWidth: [150, 320],
                                headline: ['xsmall', { tag: 'medium', br: ['months'] }]
                            }
                        ],
                        ['logo.type:primary && logo.position:top', { styles: [mt(235)] }],
                        ['text.color:white && logo.type:primary', { logo: dt.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: dt.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: dt.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: dt.PRIMARY.WHITE,
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
                        ['color:gray', { logo: dt.PRIMARY.COLOR }],
                        ['color:white', { logo: dt.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: dt.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': ft
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
                                logo: dt.PRIMARY.COLOR,
                                headline: { tag: 'small', br: ['months', 'APR'] },
                                disclaimer: 'xsmall.2'
                            }
                        ],
                        ['logo.type:primary', { messageWidth: 190 }],
                        [
                            'logo.type:inline',
                            { messageWidth: [255, 1e3], logo: dt.ALT_NO_PP.COLOR, headline: { br: ['APR'] } }
                        ],
                        ['logo.type:none', { messageWidth: [240, 1e3], logo: !1, headline: { br: ['APR'] } }],
                        [
                            'logo.type:alternative',
                            { logo: dt.ALTERNATIVE.COLOR, headline: { replace: [['APR', 'APR.']], br: ['APR.'] } }
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
                        ['text.color:white && logo.type:primary', { logo: dt.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: dt.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: dt.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: dt.PRIMARY.WHITE,
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
                        ['color:gray', { logo: dt.PRIMARY.COLOR }],
                        ['color:white', { logo: dt.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: dt.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': [
                        ['default', { logo: dt.PRIMARY.WHITE, headline: 'legacy-small', disclaimer: 'legacy-large' }],
                        ['size:1000x36', { logo: dt.PRIMARY.COLOR }],
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
                yt = {
                    'layout:text': [
                        [
                            'default',
                            {
                                styles: [
                                    '.message__headline > span:not(:nth-of-type(2)) { text-decoration: underline; color: #0076ff; font-weight: 600; }',
                                    '.message__disclaimer > span { color: #2c2e2f; text-decoration: none; }'
                                ],
                                logo: dt.PRIMARY.COLOR,
                                headline: { tag: 'xsmall', br: ['months'] },
                                disclaimer: 'xsmall.2'
                            }
                        ],
                        ['logo.type:primary', { messageWidth: 130 }],
                        [
                            'logo.type:inline',
                            { messageWidth: [250, 1e3], logo: dt.ALT_NO_PP.COLOR, headline: { br: ['months'] } }
                        ],
                        ['logo.type:none', { messageWidth: [235, 1e3], logo: !1, headline: { br: ['months'] } }],
                        [
                            'logo.type:alternative',
                            {
                                logo: dt.ALTERNATIVE.COLOR,
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
                        ['text.color:white && logo.type:primary', { logo: dt.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: dt.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: dt.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: dt.PRIMARY.WHITE,
                                headline: { tag: 'xsmall', br: ['months'] },
                                disclaimer: ['xsmall.2', 'xsmall']
                            }
                        ],
                        ['ratio:1x4', { headline: { br: ['over', 'months'] }, subHeadline: 'small' }],
                        ['color:gray', { logo: dt.PRIMARY.COLOR }],
                        ['color:white', { logo: dt.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: dt.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': [
                        ['default', { logo: dt.PRIMARY.WHITE, headline: 'legacy-small', disclaimer: 'legacy-medium' }],
                        ['size:1000x36', { logo: dt.PRIMARY.COLOR }],
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
                _t = {
                    'layout:text': [
                        [
                            'default',
                            { logo: dt.PRIMARY.COLOR, headline: { tag: 'small', br: ['/mo'] }, disclaimer: 'small' }
                        ],
                        ['logo.type:primary', { messageWidth: [130, 200] }],
                        [
                            'logo.type:inline',
                            {
                                messageWidth: [200, 1e3],
                                logo: dt.ALT_NO_PP.COLOR,
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
                        ['logo.type:alternative', { messageWidth: [140, 430], logo: dt.ALTERNATIVE.COLOR }],
                        ['text.color:white && logo.type:primary', { logo: dt.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: dt.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: dt.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: dt.PRIMARY.WHITE,
                                headline: { tag: 'medium', br: ['low as', 'at'] },
                                disclaimer: 'small'
                            }
                        ],
                        ['ratio:1x4', { subHeadline: 'small' }],
                        ['color:gray', { logo: dt.PRIMARY.COLOR }],
                        ['color:white', { logo: dt.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: dt.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': [
                        [
                            'default',
                            {
                                logo: dt.PRIMARY.WHITE,
                                headline: 'legacy-medium',
                                subHeadline: 'legacy-large',
                                disclaimer: 'legacy-small'
                            }
                        ],
                        ['size:1000x36', { logo: dt.PRIMARY.COLOR, disclaimer: 'legacy-medium' }],
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
                wt = {
                    'layout:text': [
                        ['default', { logo: dt.PRIMARY.COLOR, headline: { tag: 'xsmall' }, disclaimer: 'xsmall' }],
                        ['logo.type:primary', { messageWidth: 130 }],
                        [
                            'logo.type:inline',
                            { messageWidth: [195, 1e3], logo: dt.ALT_NO_PP.COLOR, headline: { br: ['/mo'] } }
                        ],
                        ['logo.type:none', { messageWidth: [175, 1e3], logo: !1, headline: { br: ['/mo'] } }],
                        ['logo.type:alternative', { logo: dt.ALTERNATIVE.COLOR }],
                        ['text.color:white && logo.type:primary', { logo: dt.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: dt.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: dt.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            { logo: dt.PRIMARY.WHITE, headline: { tag: 'small', br: ['low as'] }, disclaimer: 'xsmall' }
                        ],
                        ['ratio:1x4', { subHeadline: 'small' }],
                        ['color:gray', { logo: dt.PRIMARY.COLOR }],
                        ['color:white', { logo: dt.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: dt.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': [
                        [
                            'default',
                            {
                                logo: dt.PRIMARY.WHITE,
                                headline: 'legacy-xsmall',
                                subHeadline: 'legacy-large',
                                disclaimer: 'legacy-medium'
                            }
                        ],
                        ['size:1000x36', { logo: dt.PRIMARY.COLOR }],
                        ['size:120x90', { logo: !1 }],
                        ['size:250x250', { disclaimer: 'legacy-medium.2' }],
                        ['size:340x60', { disclaimer: 'legacy-medium.2' }],
                        ['size:540x200', { styles: ['.message__messaging { padding-top: 45px; }'] }],
                        ['size:170x100', { logo: !1, headline: 'legacy-xsmall' }]
                    ]
                },
                vt = {
                    'layout:text': [
                        [
                            'default',
                            { logo: dt.PRIMARY.COLOR, headline: { tag: 'small', br: ['/mo'] }, disclaimer: 'xsmall' }
                        ],
                        ['logo.type:primary', { messageWidth: [190, 240] }],
                        [
                            'logo.type:inline',
                            { messageWidth: [260, 1e3], logo: dt.ALT_NO_PP.COLOR, headline: { br: ['APR'] } }
                        ],
                        ['logo.type:none', { messageWidth: [260, 1e3], logo: !1, headline: { br: ['APR'] } }],
                        ['logo.type:alternative', { logo: dt.ALTERNATIVE.COLOR }],
                        ['text.color:white && logo.type:primary', { logo: dt.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: dt.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: dt.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: dt.PRIMARY.WHITE,
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
                        ['color:gray', { logo: dt.PRIMARY.COLOR }],
                        ['color:white', { logo: dt.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: dt.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': [
                        [
                            'default',
                            {
                                logo: dt.PRIMARY.WHITE,
                                headline: 'legacy-small',
                                subHeadline: 'legacy-xlarge',
                                disclaimer: 'legacy-medium'
                            }
                        ],
                        ['size:1000x36', { logo: dt.PRIMARY.COLOR }],
                        ['size:120x90', { logo: !1, headline: 'legacy-xsmall' }],
                        ['size:234x60', { headline: 'legacy-xsmall', disclaimer: 'legacy-medium.2' }],
                        ['size:250x250', { headline: 'legacy-small.2', disclaimer: 'legacy-medium.2' }],
                        ['size:340x60', { disclaimer: 'legacy-medium.2' }],
                        ['size:728x90', { headline: 'legacy-xsmall' }],
                        ['size:170x100', { logo: !1, headline: 'legacy-xsmall' }]
                    ]
                },
                xt = {
                    'layout:text': [
                        ['default', { logo: dt.PRIMARY.COLOR, headline: { tag: 'small' }, disclaimer: 'xsmall' }],
                        ['logo.type:primary', { messageWidth: [140, 210] }],
                        [
                            'logo.type:inline',
                            { messageWidth: [200, 1e3], logo: dt.ALT_NO_PP.COLOR, headline: { br: ['/mo'] } }
                        ],
                        ['logo.type:none', { messageWidth: [200, 1e3], logo: !1, headline: { br: ['/mo'] } }],
                        ['logo.type:alternative', { logo: dt.ALTERNATIVE.COLOR }],
                        ['text.color:white && logo.type:primary', { logo: dt.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: dt.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: dt.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            { logo: dt.PRIMARY.WHITE, headline: { tag: 'small', br: ['of'] }, disclaimer: 'xsmall' }
                        ],
                        ['ratio:1x4', { headline: { br: ['payments'] }, subHeadline: 'small' }],
                        ['color:gray', { logo: dt.PRIMARY.COLOR }],
                        ['color:white', { logo: dt.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: dt.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': [
                        [
                            'default',
                            {
                                logo: dt.PRIMARY.WHITE,
                                headline: 'legacy-xsmall',
                                subHeadline: 'legacy-large',
                                disclaimer: 'legacy-medium'
                            }
                        ],
                        ['size:1000x36', { logo: dt.PRIMARY.COLOR }],
                        ['size:120x90', { logo: !1 }],
                        ['size:250x250', { disclaimer: 'legacy-medium.2' }],
                        ['size:340x60', { disclaimer: 'legacy-medium.2' }],
                        ['size:540x200', { styles: ['.message__messaging { padding-top: 45px; }'] }],
                        ['size:170x100', { logo: !1, headline: 'legacy-xsmall' }]
                    ]
                };
            function bt(e, n) {
                var t = he()(e, function(e) {
                    var t = e[1];
                    return I()(t, n);
                });
                if (t) return t[0];
                if (ve()(n, '.')) {
                    var o = n.split('.', 1)[0];
                    if (
                        (t = he()(e, function(e) {
                            var n = e[1];
                            return I()(n, o);
                        }))
                    )
                        return t[0];
                }
                return he()(e, function(e) {
                    var n = e[1];
                    return I()(n, 'default');
                })[0];
            }
            var Et = document.createElement('div');
            Et.innerHTML = be.a;
            var Pt = document.createElement('div');
            Pt.innerHTML = Pe.a;
            var At = N(function(e, n, t) {
                    return n.getElementsByClassName(e + '__' + t)[0];
                }),
                Rt = N(function(e, n) {
                    var t = document.createElement('style');
                    (t.textContent = n), e.insertBefore(t, e.firstChild);
                }),
                zt = N(function(e, n) {
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
                It = N(function(e, n) {
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
                Tt = N(function(e, n, t, o) {
                    if ((void 0 === t && (t = 'PayPal Credit'), 'string' == typeof n)) {
                        var i = new Image();
                        (i.alt = t),
                            (i.className = 'message__logo'),
                            (i.src = n),
                            o && (i.srcset = o),
                            e.appendChild(i);
                    } else if (Array.isArray(n)) {
                        var a = n[0],
                            r = n[1],
                            s = n[2],
                            l = new Image();
                        (l.src = a), (l.alt = t);
                        var c = document.createElement('div');
                        c.className = 'message__logo message__logo--svg';
                        var u = document.createElement('canvas');
                        (u.height = s), (u.width = r), c.appendChild(l), c.appendChild(u), e.appendChild(c);
                    } else e.parentNode.removeChild(e);
                }, 2);
            function Ot(e) {
                return e
                    .reduce(function(e, n) {
                        return [].concat(e, [n, document.createTextNode(' ')]);
                    }, [])
                    .slice(0, -1);
            }
            function St(e, n) {
                void 0 === n && (n = {});
                var t,
                    o = (Array.isArray(e) ? e : [e]).map(function(e) {
                        var n = document.createElement('span');
                        return Array.isArray(e) ? ((n.innerText = e[0]), (n.className = e[1])) : (n.innerText = e), n;
                    });
                return (
                    n.replace &&
                        ((t = n.replace),
                        o.forEach(function(e) {
                            var n = t.reduce(function(e, n) {
                                return e.replace(n[0], n[1]);
                            }, e.innerText);
                            e.innerText = n;
                        })),
                    n.br &&
                        (function(e, t) {
                            var o = [].concat(n.br);
                            t.forEach(function(e) {
                                for (var n = e.innerText, t = []; ve()(n, o[0]); ) t.push(o[0]), o.shift();
                                if (0 === t.length || (1 === t.length && _e()(n, t[0]))) return e.classList.add('br');
                                var i = document.createElement('span');
                                (i.innerText = n), (i.className = 'br');
                                var a = t.reduce(
                                    function(e, n) {
                                        var t = (function(e, n) {
                                            var t = e.innerText,
                                                o = t.indexOf(n) + n.length,
                                                i = e.cloneNode();
                                            if (((i.innerText = t.slice(0, o).trim()), t.length !== o)) {
                                                var a = e.cloneNode();
                                                return (a.innerText = t.slice(o).trim()), [i, a];
                                            }
                                            return [i];
                                        })(e[e.length - 1], n);
                                        return [].concat(e.slice(0, -1), t);
                                    },
                                    [i]
                                );
                                return (
                                    (e.innerHTML = ''),
                                    a.forEach(function(n) {
                                        e.appendChild(n), e.appendChild(document.createTextNode(' '));
                                    })
                                );
                            });
                        })(0, o),
                    Ot(o)
                );
            }
            var Lt = N(function(e, n, t) {
                    return (
                        !1 !== t &&
                        ('string' != typeof t && 'object' != typeof t
                            ? null
                            : Ot(
                                  (o = 'string' == typeof t ? [{ tag: t }] : Array.isArray(t) ? t : [t]).map(function(
                                      t
                                  ) {
                                      var i,
                                          r = document.createElement('span');
                                      if ((o.length > 1 && r.setAttribute('class', 'multi'), 'string' == typeof t))
                                          (i = St(bt(e[n], t))), r.classList.add('tag--' + t.split('.', 1)[0]);
                                      else {
                                          var s = t.tag,
                                              l = a(t, ['tag']);
                                          (i = St(bt(e[n], s), l)), r.classList.add('tag--' + s.split('.', 1)[0]);
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
                Ct = N(function(e, n, t) {
                    return t.reduce(
                        function(t, o) {
                            var i = o[0],
                                a = o[1],
                                r = i.split(' && ');
                            return 'default' === i ||
                                r.every(function(n) {
                                    return I()(e, n);
                                })
                                ? n === Array
                                    ? [].concat(t, [a])
                                    : W(t, a)
                                : t;
                        },
                        n === Array ? [] : {}
                    );
                }),
                Nt = {
                    getTemplateNode: S(function(e, n) {
                        var t = H(e, 'style.layout');
                        if ('custom' === t)
                            return (function(e) {
                                var t = n.data,
                                    o = n.meta,
                                    i = n.template,
                                    a = document.createElement('div'),
                                    r = o.offerType;
                                if ('' === i) return a;
                                try {
                                    var s = i.replace(/{{\s*?([^\s]+?)\s*?}}/g, function(e, n) {
                                        var o = n.split('.'),
                                            i = o[0],
                                            a = o.slice(1).join('.');
                                        if ('logo' === i) {
                                            var r = document.createElement('div');
                                            return Tt(r, H(dt, a.toUpperCase()), 'PayPal Credit logo'), r.innerHTML;
                                        }
                                        return St(bt(t[i], a)).reduce(function(e, n) {
                                            return '' + e + (n.outerHTML || ' ');
                                        }, '');
                                    });
                                    (a.innerHTML = s),
                                        he()(R()(a.children), function(e) {
                                            return 'STYLE' !== e.tagName;
                                        }).classList.add('offer--' + r.replace(/:/g, '-').toLowerCase());
                                } catch (e) {
                                    te.warn(e);
                                }
                                return a;
                            })();
                        var o = H(e, 'style._flattened'),
                            i = H(n, 'meta.offerType'),
                            a = H(n, 'data');
                        if ('legacy' === t) {
                            var r = H(e, 'style.typeNI'),
                                s = H(e, 'style.typeEZP'),
                                l = 'NI' === i.split(':')[0] ? r : s;
                            if ('image' === l)
                                return (function(e, t) {
                                    var o = n.meta,
                                        i = Pt.cloneNode(!0),
                                        a = At('pp-legacy', i),
                                        r = ['link', 'pixel'].map(a),
                                        s = r[0],
                                        l = r[1],
                                        c = H(e, 'size'),
                                        u = H(e, 'color'),
                                        d = H(e, 'border');
                                    s.setAttribute('href', o.clickUrl), l.setAttribute('href', o.impressionUrl);
                                    var m = 'https://www.paypalobjects.com/upstream/assets/messaging/legacy',
                                        f = 'none' === u ? '' : '-' + u + (!0 === d ? '' : '-no-border'),
                                        p = ('none' === u ? 'v1' : 'v2') + '/' + c.replace(/x/, '-') + f,
                                        g = [1, 1.5, 2].map(function(e) {
                                            return m + '/' + p + '@' + e + 'x.png ' + e + 'x';
                                        });
                                    return Tt(s, m + '/' + p + '@1x.png', 'PayPal Credit Message', g.join(', ')), i;
                                })(e.style);
                            if (!l) throw new Error($.INVALID_LEGACY_BANNER);
                        }
                        var c = Ct(o),
                            u = c(
                                Object,
                                (function(e, n) {
                                    switch (i) {
                                        case 'EZP:ANY:EQZ':
                                            return ht[n];
                                        case 'EZP:ANY:GTZ':
                                            return yt[n];
                                        case 'PALA:MULTI:EQZ':
                                            return _t[n];
                                        case 'PALA:MULTI:GTZ':
                                            return wt[n];
                                        case 'PALA:SINGLE:EQZ':
                                            return vt[n];
                                        case 'PALA:SINGLE:GTZ':
                                            return xt[n];
                                        case 'NI:NON-US':
                                            return gt[n];
                                        case 'NI':
                                        default:
                                            return pt[n];
                                    }
                                })(0, 'layout:' + t)
                            ),
                            d = c(Array, ut['layout:' + t]),
                            m = Lt(a),
                            f = Et.cloneNode(!0),
                            p = At('message', f),
                            g = ['logo-container', 'headline', 'sub-headline', 'disclaimer'].map(p),
                            h = g[0],
                            y = g[1],
                            _ = g[2],
                            w = g[3];
                        if (
                            (zt(y, m('headline', u.headline)),
                            zt(_, m('subHeadline', u.subHeadline)),
                            It(w, m('disclaimer', u.disclaimer)),
                            Tt(h, u.logo, 'PayPal Credit logo'),
                            'inline' === H(e, 'style.logo.type') && y.appendChild(h),
                            'none' === H(e, 'style.logo.type'))
                        ) {
                            var v = document.createElement('span');
                            v.innerText = 'with ';
                            var x = document.createElement('strong');
                            (x.innerText = 'PayPal Credit.'),
                                v.appendChild(x),
                                y.appendChild(document.createTextNode(' ')),
                                y.appendChild(v);
                        }
                        u.messageWidth &&
                            ('number' == typeof u.messageWidth
                                ? d.push('.message__messaging { width: ' + u.messageWidth + 'px }')
                                : Array.isArray(u.messageWidth) &&
                                  d.push(
                                      '.message__messaging { min-width: ' +
                                          u.messageWidth[0] +
                                          'px; max-width: ' +
                                          u.messageWidth[1] +
                                          'px }'
                                  ));
                        var b = function(n) {
                            return 'legacy' === t ? n.replace(/\.message/g, '[data-pp-id="' + e.id + '"] .message') : n;
                        };
                        return u.styles && Rt(f, b(u.styles.join(''))), Rt(f, b(d.join('\n'))), f;
                    })
                };
            function Mt(e, n, t) {
                if ('string' == typeof n) return (e.innerHTML = n), {};
                var o = n.meta,
                    i = Nt.getTemplateNode(t, n);
                return (
                    R()(i.children).forEach(function(n) {
                        return e.appendChild(n.cloneNode(!0));
                    }),
                    { meta: o }
                );
            }
            var kt = N(function(e, n) {
                var t = n.markup,
                    o = n.options;
                return new K.ZalgoPromise(function(n) {
                    'IFRAME' === e.tagName
                        ? 'string' == typeof t
                            ? (function(e, n) {
                                  return new K.ZalgoPromise(function(t) {
                                      var o = e.contentWindow,
                                          i = '<style>body{margin:0;padding:0;overflow:hidden;}</style>' + n;
                                      (e.srcdoc = i),
                                          (e.src = 'about:blank'),
                                          e.addEventListener('load', function n() {
                                              0 === o.document.body.children.length &&
                                                  (e.removeEventListener('load', n),
                                                  o.document.open('text/html', 'replace'),
                                                  o.document.write(i),
                                                  o.document.close()),
                                                  t(o.meta);
                                          });
                                  });
                              })(e, t).then(function(e) {
                                  return n({ meta: e, options: o });
                              })
                            : (function(e, n, t) {
                                  return new K.ZalgoPromise(function(o) {
                                      var i = e.contentWindow,
                                          a = n.meta,
                                          r = Nt.getTemplateNode(t, n),
                                          s = i.document.importNode(r, !0),
                                          l = R()(s.getElementsByTagName('img')).map(function(e) {
                                              return new K.ZalgoPromise(function(n) {
                                                  return e.addEventListener('load', n);
                                              });
                                          });
                                      for (
                                          R()(s.getElementsByTagName('style')).forEach(function(e) {
                                              var n = i.document.createElement('style');
                                              (n.textContent = e.textContent),
                                                  e.parentNode.insertBefore(n, e),
                                                  e.parentNode.removeChild(e);
                                          });
                                          i.document.body.firstChild;

                                      )
                                          i.document.body.removeChild(i.document.body.firstChild);
                                      R()(s.children).forEach(function(e) {
                                          return i.document.body.appendChild(e);
                                      }),
                                          K.ZalgoPromise.all(l).then(function() {
                                              o(a);
                                          });
                                  });
                              })(e, t, o).then(function(e) {
                                  return n({ meta: e, options: o });
                              })
                        : n({ meta: Mt(e, t, o), options: o });
                });
            });
            function jt(e) {
                var n = e.getBoundingClientRect(),
                    t = (n.top + n.bottom) / 2,
                    o = (n.left + n.right) / 2;
                return !(t > window.innerHeight || t < 0 || o > window.innerWidth || o < 0);
            }
            var Wt = N(function(e, n) {
                    var t = n.options.amount,
                        o = n.events,
                        i = n.track,
                        a = e.getBoundingClientRect(),
                        r = {
                            et: 'CLIENT_IMPRESSION',
                            event_type: 'stats',
                            pos_x: Math.round(a.left),
                            pos_y: Math.round(a.top),
                            browser_width: window.innerWidth,
                            browser_height: window.innerHeight,
                            visible: jt(e),
                            amount: t
                        };
                    r.visible ||
                        o.on('scroll', function() {
                            jt(e) &&
                                (o.clear('scroll'), i({ et: 'CLIENT_IMPRESSION', event_type: 'scroll', visible: !0 }));
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
                            return new K.ZalgoPromise(function(t) {
                                !(function o(i) {
                                    return i <= 0
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
                                              o(i - 1);
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
                                i(r, e.hasAttribute('data-pp-message-hidden')),
                                i('MORS_IMPRESSION');
                        }),
                        o.on('click', function() {
                            i({ et: 'CLICK', event_type: 'click', link: 'Banner Wrapper' }), i('MORS_CLICK');
                        }),
                        o.on('hover', function() {
                            i({ et: 'CLIENT_IMPRESSION', event_type: 'hover' }), o.clear('hover');
                        });
                }),
                Ht = {
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
                                  O()(n, '@')
                                      ? (e.breakpoint = n.slice(1))
                                      : O()(n, '[') && (e.width = n.slice(1, -1).split(',')),
                                  e
                              );
                          },
                          { ratio: t }
                      )
                    : {};
            }
            var Yt = N(function(e, n) {
                    var t = n.wrapper,
                        o = n.options;
                    if ('IFRAME' === e.tagName) {
                        var i = H(o, 'style.layout'),
                            a = H(o, 'style.ratio');
                        if (('flex' !== i && 'custom' !== i) || !a) {
                            e.setAttribute('style', 'width: ' + ('custom' !== i ? 0 : '`100%') + '; border: none;'),
                                e.setAttribute('height', 0),
                                t.removeAttribute('class');
                            var r = (function(e) {
                                    var n = document.createElement('div');
                                    n.setAttribute('style', 'width: 100%; overflow: hidden');
                                    var t = document.createElement('div');
                                    t.setAttribute('style', 'width: 10000px'),
                                        n.appendChild(t),
                                        e.parentNode.appendChild(n);
                                    var o = n.offsetWidth;
                                    return e.parentNode.removeChild(n), o;
                                })(t),
                                s =
                                    'custom' !== i && null !== e.offsetParent
                                        ? (function(e) {
                                              var n = e.contentDocument.querySelector('.message__content'),
                                                  t = window.getComputedStyle(n),
                                                  o = R()(n.children),
                                                  i = [
                                                      'margin-left',
                                                      'border-left-width',
                                                      'padding-left',
                                                      'width',
                                                      'padding-right',
                                                      'border-right-width',
                                                      'margin-right'
                                                  ];
                                              return ve()(t.getPropertyValue('display'), 'flex')
                                                  ? Math.round(
                                                        o.reduce(function(e, n) {
                                                            var t = window.getComputedStyle(n);
                                                            return (
                                                                e +
                                                                i.reduce(function(e, n) {
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
                                                                i.reduce(function(e, t) {
                                                                    return e + parseFloat(n.getPropertyValue(t));
                                                                }, 0)
                                                            );
                                                        })
                                                    );
                                          })(e)
                                        : 0,
                                l = function() {
                                    e.setAttribute('style', 'width: 100%; border: none; min-width: ' + s + 'px;'),
                                        requestAnimationFrame(function() {
                                            return requestAnimationFrame(function() {
                                                e.setAttribute(
                                                    'height',
                                                    e.contentWindow.document.documentElement.scrollHeight
                                                );
                                            });
                                        });
                                };
                            if (r < s && 'custom' !== i) {
                                if ('top' !== H(o, 'style.logo.position') || 'primary' !== H(o, 'style.logo.type'))
                                    throw (te.warn(
                                        'Message Overflow. PayPal Credit Message of layout type ' +
                                            H(o, 'style.layout') +
                                            ' requires a width of at least ' +
                                            s +
                                            'px. Current container is ' +
                                            r +
                                            'px. Attempting fallback message.'
                                    ),
                                    t.parentNode.setAttribute('data-pp-style-layout', 'text'),
                                    t.parentNode.setAttribute('data-pp-style-logo-type', 'primary'),
                                    t.parentNode.setAttribute('data-pp-style-logo-position', 'top'),
                                    window.paypal.Messages().render(t.parentNode),
                                    new Error($.OVERFLOW));
                                te.error({ message: $.HIDDEN }),
                                    te.warn(
                                        'Message hidden. PayPal Credit Message fallback requires minimum width of ' +
                                            s +
                                            'px. Current container is ' +
                                            r +
                                            'px. Message hidden.'
                                    ),
                                    e.setAttribute('data-pp-message-hidden', 'true');
                            } else l(), pe(e).on('resize', l);
                        } else
                            !(function(e, n, t) {
                                var o = [];
                                'flex' === t
                                    ? (o = Ht[n])
                                    : Array.isArray(n)
                                    ? (o = n.map(Dt))
                                    : 'string' == typeof n && (o = [Dt(n)]);
                                var i = 'pp-flex--' + o.slice(-1)[0].ratio,
                                    a = o.reduce(function(e, n) {
                                        var t = n.breakpoint,
                                            o = n.ratio,
                                            a = n.width;
                                        return '' === e
                                            ? '\n                .' +
                                                  i +
                                                  ' {\n                    display: block;\n                    width: 100%;\n                    ' +
                                                  (Array.isArray(a)
                                                      ? '\n                                min-width: ' +
                                                        Bt(a[0]) +
                                                        ';\n                                max-width: ' +
                                                        Bt(a[1]) +
                                                        ';'
                                                      : '') +
                                                  '\n                    box-sizing: border-box;\n                    position: relative;\n                }\n        \n                .' +
                                                  i +
                                                  '::before {\n                    padding-top: ' +
                                                  Bt(o) +
                                                  ";\n                    content: '';\n                    display: block;\n                }\n        \n                ." +
                                                  i +
                                                  ' iframe {\n                    position: absolute;\n                    top: 0;\n                    left: 0;\n                    width: 100%;\n                    height: 100%;\n                }\n            '
                                            : t
                                            ? '\n            ' +
                                              e +
                                              '\n            @media (min-width: ' +
                                              Bt(t) +
                                              ') {\n                ' +
                                              (Array.isArray(a)
                                                  ? '\n                            .' +
                                                    i +
                                                    ' {\n                                min-width: ' +
                                                    Bt(a[0]) +
                                                    ';\n                                max-width: ' +
                                                    Bt(a[1]) +
                                                    ';\n                            }'
                                                  : '') +
                                              '\n                .' +
                                              i +
                                              '::before {\n                    padding-top: ' +
                                              Bt(o) +
                                              ';\n                }\n            }\n        '
                                            : e;
                                    }, ''),
                                    r = document.createElement('style');
                                (r.textContent = a), e.setAttribute('class', i), e.appendChild(r);
                            })(t, a, i),
                                e.setAttribute('style', 'width: 100%; border: none;'),
                                e.removeAttribute('height');
                    }
                }),
                Gt = N(function(e, n) {
                    if ('IFRAME' === e.tagName) {
                        var t = JSON.stringify({ 'pp-modal-event': { type: n } });
                        e.contentWindow.postMessage(t, window.top.location.origin);
                    }
                });
            function Ft(e) {
                var n = document.createElement(e);
                'iframe' === e &&
                    (n.setAttribute('title', 'PayPal Credit Promotion Message'),
                    n.setAttribute('style', 'width: 0; border: none;'),
                    n.setAttribute('src', 'about:blank'),
                    n.setAttribute('height', 0));
                var t = P()({ insertMarkup: kt, setSize: Yt, runStats: Wt, postMessage: Gt, events: pe }).reduce(
                    function(e, t) {
                        var o;
                        return i({}, e, (((o = {})[t[0]] = (0, t[1])(n)), o));
                    },
                    {}
                );
                return (
                    (t.clearEvents = function() {
                        return (function(e) {
                            Z()(le).forEach(function(n) {
                                return n.delete(e);
                            }),
                                0 === le.scroll.size && window.removeEventListener('scroll', de),
                                0 === le.hover.size && document.removeEventListener('mouseover', me),
                                0 === le.message.size && window.removeEventListener('message', ce),
                                'IFRAME' === e.tagName
                                    ? (e.contentWindow.removeEventListener('resize', ue),
                                      e.contentWindow.removeEventListener('click', fe))
                                    : e.removeEventListener('click', fe);
                        })(n);
                    }),
                    [n, t]
                );
            }
            var Ut,
                Vt = t(23),
                Zt = t.n(Vt),
                Kt = { ANY: 'ANY', STRING: 'STRING', BOOLEAN: 'BOOLEAN', FUNCTION: 'FUNCTION' },
                Jt =
                    (((Ut = {})[Kt.STRING] = 'string'),
                    (Ut[Kt.BOOLEAN] = 'boolean'),
                    (Ut[Kt.FUNCTION] = 'function'),
                    Ut),
                qt = { onRender: [Kt.FUNCTION], sign: [Kt.STRING] },
                $t = {
                    text: {
                        logo: {
                            type: [Kt.STRING, ['primary', 'alternative', 'inline', 'none']],
                            position: [Kt.STRING, ['left', 'right', 'top']]
                        },
                        text: { color: [Kt.STRING, ['black', 'white']] }
                    },
                    flex: {
                        color: [Kt.STRING, ['blue', 'black', 'white', 'white-no-border', 'gray|grey']],
                        ratio: [Kt.STRING, ['1x1', '1x4', '8x1', '20x1']]
                    },
                    legacy: {
                        typeNI: [Kt.STRING, ['', 'image', 'html']],
                        typeEZP: [Kt.STRING, ['', 'html']],
                        size: [Kt.STRING],
                        color: [Kt.STRING, ['none', 'blue', 'black', 'gray|grey', 'white']],
                        border: [Kt.BOOLEAN, [!0, !1]]
                    },
                    custom: { markup: [Kt.STRING], ratio: [Kt.ANY] }
                },
                Qt = function(e, n, t) {
                    return te.warn(
                        'Invalid option value (' +
                            e +
                            '). Expected type "' +
                            n +
                            '" but instead received "' +
                            typeof t +
                            '".'
                    );
                };
            function Xt(e, n, t) {
                return (
                    void 0 === t && (t = 'style.'),
                    P()(e).reduce(function(o, a) {
                        var r,
                            s,
                            l = a[0],
                            c = a[1];
                        return Array.isArray(c)
                            ? i(
                                  {},
                                  o,
                                  (((s = {})[l] = (function(e, n, t) {
                                      var o = e[0],
                                          i = e[1],
                                          a = void 0 === i ? [] : i;
                                      if (void 0 === n) return a[0];
                                      if (
                                          (function(e, n) {
                                              return Jt[o] === Kt.BOOLEAN
                                                  ? 'boolean' == typeof n
                                                  : o === Kt.FUNCTION
                                                  ? 'function' == typeof n
                                                  : o !== Kt.STRING || 'string' == typeof n;
                                          })(0, n)
                                      ) {
                                          if (o === Kt.STRING && a.length > 0) {
                                              var r = he()(a, function(e) {
                                                  return e.split('|').some(function(e) {
                                                      return e === n;
                                                  });
                                              });
                                              if (void 0 !== r) return r.split('|')[0];
                                              te.warn(
                                                  'Invalid option value (' +
                                                      t +
                                                      '). Expected one of ["' +
                                                      a.join('", "').replace(/\|[\w|]+/g, '') +
                                                      '"] but received "' +
                                                      n +
                                                      '".'
                                              );
                                          }
                                          return n;
                                      }
                                      return Qt(t, Jt[o], n), a[0];
                                  })(c, n[l], '' + t + l)),
                                  s)
                              )
                            : i({}, o, (((r = {})[l] = Xt(e[l], n[l] || {}, '' + t + l + '.')), r));
                    }, {})
                );
            }
            function eo(e) {
                return i({ layout: e.layout }, Xt($t[e.layout], e));
            }
            var no = L(
                    function(e) {
                        var n = e.offerType;
                        return new K.ZalgoPromise(function(e, t) {
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
                                            (O()(e, 'NI') ? 'ni' : 'ezp') +
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
                to = L(
                    function(e) {
                        return new K.ZalgoPromise(function(n) {
                            var t,
                                o,
                                i,
                                a,
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
                                    (i = t.amount),
                                    (a = ['json=true', O()(o, 'client-id') ? 'cid=' + o.slice(10) : 'mid=' + o]).push(
                                        'country=US'
                                    ),
                                    a.push('currency=USD'),
                                    i && a.push('amount=' + i),
                                    'https://www.paypal.com/ppcredit/finance/terms?' + a.join('&')),
                                    !0
                                ),
                                r.send();
                        });
                    },
                    ['account', 'amount']
                ),
                oo = function(e, n) {
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
                io = function(e) {
                    return e.max_amount !== e.default_max_amount
                        ? '<div style="text-align: center; padding-bottom: 15px; display: table; padding-top: 10px; "><span style="display: inline-block; vertical-align: middle; "><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19"><path fill="none" fill-rule="evenodd" stroke="#9DA3A6" stroke-linecap="round" stroke-linejoin="round" d="M9.526 10.474v7.579c4.71-.034 8.527-3.817 8.527-8.527a8.526 8.526 0 1 0-11.834 7.862"></path></svg></span><p style="display: inline; font-size: 13px; color: #2c2e2f; padding-left: 5px; font-family: PayPalSansSmall; font-weight: 400 ">$' +
                              e.max_amount +
                              ' is the maximum amount to be eligible for Easy Payments. Enter an amount of $' +
                              e.max_amount +
                              ' or less.</p></div>'
                        : '<p style="text-align: center">No offers are available for this amount. Please enter a new amount.</p>';
                };
            function ao(e, n) {
                var t = e.contentDocument.getElementById('content-wrapper'),
                    o = e.contentDocument.getElementById('modal__overlay'),
                    a = e.contentDocument.getElementById('close-btn'),
                    r = e.contentDocument.getElementById('header'),
                    s = e.contentDocument.getElementsByClassName('accordion'),
                    l = e.contentDocument.getElementById('modal-container'),
                    c = e.contentDocument.getElementsByClassName('modal__header-container')[0];
                return i(
                    {
                        window: e.contentWindow,
                        contentWrapper: t,
                        overlay: o,
                        closeButton: a,
                        header: r,
                        accordions: s,
                        modalContainer: l,
                        headerContainer: c
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
            var ro = L(
                    function(e) {
                        var n = window.top.document.createElement('div'),
                            t = Ft('iframe'),
                            o = t[0],
                            a = t[1].insertMarkup,
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
                                var i = n.getAttribute('style');
                                return [
                                    function() {
                                        e.removeChild(t),
                                            e.appendChild(o),
                                            (n.style.overflow = 'hidden'),
                                            (n.style.msOverflowStyle = 'scrollbar');
                                    },
                                    function() {
                                        e.removeChild(o),
                                            e.appendChild(t),
                                            i ? n.setAttribute('style', i) : n.removeAttribute('style');
                                    }
                                ];
                            })(),
                            s = r[0],
                            l = r[1],
                            c = e.track,
                            u = e.clickUrl,
                            d = k({ status: 'CLOSED' }),
                            m = d[0],
                            f = d[1];
                        function p() {
                            return O()(e.offerType, 'NI') ? 'NI' : 'EZP';
                        }
                        var g = function(e, n) {
                            return c({
                                et: 'modal-open' === e ? 'CLIENT_IMPRESSION' : 'CLICK',
                                link: n,
                                modal: p(),
                                event_type: e
                            });
                        };
                        function h() {
                            R()(m.elements.accordions).forEach(function(e) {
                                e.classList.remove('show'),
                                    e
                                        .getElementsByClassName('accordion-content')[0]
                                        .style.setProperty('max-height', null);
                            });
                        }
                        function y(e) {
                            var n = {
                                    'NI Tab': [m.elements.niTab, m.elements.niContent],
                                    'EZP Tab': [m.elements.ezpTab, m.elements.ezpContent]
                                },
                                t = n[e][0];
                            Z()(n).forEach(function(e) {
                                var n = e[0],
                                    o = e[1];
                                n.classList.toggle('selected', n === t), o.classList.toggle('show', n === t);
                            }),
                                g('modal-tab', e),
                                h();
                        }
                        function _() {
                            return m.error ? b(!0) : m.modalProm;
                        }
                        function w(e) {
                            return new K.ZalgoPromise(function(t, i) {
                                'OPEN' === m.status || 'OPENING' === m.status
                                    ? (f({ status: 'CLOSING' }),
                                      m.elements.modalContainer.classList.remove('show'),
                                      setTimeout(function() {
                                          (n.style.display = 'none'),
                                              o.blur(),
                                              f({ status: 'CLOSED' }),
                                              l(),
                                              'EZP' === p() &&
                                                  setTimeout(function() {
                                                      y('EZP Tab');
                                                  }, 350),
                                              t();
                                      }, e || 0))
                                    : i();
                            });
                        }
                        function v(e) {
                            w(350), g('modal-close', e);
                        }
                        function x(n) {
                            var t = +n;
                            return (
                                Zt()(t) || (m.elements.amountInput.value = t.toFixed(2)),
                                m.elements.loader.style.setProperty('opacity', 1),
                                m.elements.financeTermsTable.style.setProperty('opacity', 0.4),
                                to(i({}, e, { amount: n })).then(function(e) {
                                    m.elements.loader.style.setProperty('opacity', 0),
                                        m.elements.financeTermsTable.style.setProperty('opacity', 1),
                                        (m.elements.financeTermsTable.innerHTML = (function(e) {
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
                                                                return oo(e, n);
                                                            })
                                                            .join('')
                                                      : '') +
                                                  '\n            </tbody>\n        </table>\n        ' +
                                                  (e.options && 0 !== e.options.length && 'N/A' !== e.options
                                                      ? ''
                                                      : io(e)) +
                                                  '\n        <p id="terms-note">The monthly payment shown is an estimated amount and may not include taxes and shipping</p>\n    ';
                                        })(e));
                                })
                            );
                        }
                        function b(n) {
                            return (
                                void 0 === n && (n = !1),
                                no(e, n)
                                    .then(a)
                                    .then(function() {
                                        f({ elements: ao(o, p()) }),
                                            (function() {
                                                m.elements.closeButton.addEventListener('click', function() {
                                                    v('Close Button');
                                                }),
                                                    m.elements.overlay.addEventListener('click', function(e) {
                                                        var n = e.target;
                                                        (n !== m.elements.contentWrapper &&
                                                            n !== m.elements.headerContainer) ||
                                                            v('Modal Overlay');
                                                    });
                                                var e = function() {
                                                    m.elements.contentWrapper.scrollTop > 0
                                                        ? m.elements.header.classList.add('show')
                                                        : m.elements.header.classList.remove('show');
                                                };
                                                if (
                                                    (m.elements.contentWrapper.addEventListener('scroll', e),
                                                    m.elements.contentWrapper.addEventListener('touchmove', e),
                                                    R()(m.elements.accordions).forEach(function(e) {
                                                        var n = e.getElementsByTagName('h3')[0],
                                                            t = e.getElementsByClassName('accordion-content')[0];
                                                        n.addEventListener('click', function() {
                                                            var n = e.classList.toggle('show');
                                                            t.style.setProperty(
                                                                'max-height',
                                                                n ? t.scrollHeight + 'px' : null
                                                            );
                                                        });
                                                    }),
                                                    o.contentWindow.addEventListener('keyup', function(e) {
                                                        ('Escape' !== e.key && 'Esc' !== e.key && 27 !== e.charCode) ||
                                                            v('Escape Key');
                                                    }),
                                                    'EZP' === p())
                                                ) {
                                                    m.elements.niTab.addEventListener('click', function() {
                                                        return y('NI Tab');
                                                    }),
                                                        m.elements.ezpTab.addEventListener('click', function() {
                                                            return y('EZP Tab');
                                                        });
                                                    var n = function() {
                                                        x(m.elements.amountInput.value);
                                                    };
                                                    m.elements.amountInput.addEventListener('keydown', function(e) {
                                                        var t = e.key,
                                                            o = e.target;
                                                        if (t.length > 1 || e.metaKey || e.ctrlKey)
                                                            'Enter' === t && n();
                                                        else {
                                                            var i = o.value,
                                                                a = o.selectionStart,
                                                                r = i ? '' + i.slice(0, a) + t + i.slice(a) : t;
                                                            (function(e) {
                                                                if (Zt()(Number(e))) return !1;
                                                                var n = e.split('.'),
                                                                    t = n[0],
                                                                    o = n[1];
                                                                return (
                                                                    (void 0 === t ? '' : t).length <= 5 &&
                                                                    (void 0 === o ? '' : o).length <= 2
                                                                );
                                                            })(r) && ((o.value = r), o.setSelectionRange(a + 1, a + 1)),
                                                                e.preventDefault();
                                                        }
                                                    }),
                                                        m.elements.calculateButton.addEventListener('click', n);
                                                }
                                            })();
                                    })
                                    .catch(function(e) {
                                        te.error({ message: $.MODAL_LOAD_FAILURE, err: e }), f({ error: !0 });
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
                            o.setAttribute(
                                'style',
                                'position: absolute; top: 0; left: 0; overflow: hidden; width: 100%; height: 100%; margin: 0; padding: 0; border: 0; display: block;'
                            ),
                            n.appendChild(o),
                            window.top.document.body.appendChild(n),
                            f({ modalProm: b() }),
                            'EZP' === p() &&
                                _().then(function() {
                                    return x(e.amount);
                                }),
                            {
                                open: function(e) {
                                    e.preventDefault(),
                                        ('CLOSED' !== m.status && 'CLOSING' !== m.status) ||
                                            (f({ status: 'OPENING' }),
                                            _().then(function() {
                                                if (m.error)
                                                    return f({ status: 'CLOSED' }), void window.open(u, '_blank');
                                                (n.style.display = 'block'),
                                                    requestAnimationFrame(function() {
                                                        return requestAnimationFrame(function() {
                                                            h(),
                                                                o.contentWindow.focus(),
                                                                f({ status: 'OPEN' }),
                                                                s(),
                                                                m.elements.modalContainer.classList.add('show'),
                                                                g('modal-open');
                                                        });
                                                    });
                                            }));
                                },
                                close: w
                            }
                        );
                    },
                    ['account', 'amount', 'offerType']
                ),
                so = {
                    init: function(e) {
                        var n = e.options,
                            t = e.meta,
                            o = e.events,
                            a = e.track;
                        if (n._legacy && O()(t.offerType, 'NI'))
                            o.on('click', function(e) {
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
                            var r = ro(i({}, n, {}, t, { track: a }));
                            o.on('click', r.open);
                        }
                    }
                },
                lo = new Map();
            function co(e) {
                var n = (e.meta && e.meta.offerType) + '::' + e.options.style._flattened.sort().join('::'),
                    t = e.meta,
                    o = te.track({
                        uuid: n,
                        urls: { DEFAULT: t.clickUrl, MORS_IMPRESSION: t.impressionUrl + '&idx=' + e.options.id }
                    });
                return b()(e, { track: o });
            }
            var uo = function(e) {
                    var n = e.options,
                        t = n.onRender;
                    te.info(q.MESSAGE_RENDERED, { id: n.id }), t && t();
                },
                mo = {
                    init: function(e, n) {
                        if (lo.has(e)) lo.get(e).update(n);
                        else {
                            var t = (function(e, n) {
                                te.info(q.MESSAGE_CREATE_INITIATED, { id: e.id, options: e });
                                var t = k(e),
                                    o = t[0],
                                    r = t[1],
                                    s = o._legacy,
                                    l = Ft(s ? 'div' : 'iframe'),
                                    c = l[0],
                                    u = l[1],
                                    d = u.insertMarkup,
                                    m = u.setSize,
                                    f = u.events,
                                    p = u.runStats,
                                    g = u.clearEvents,
                                    h = s ? c : document.createElement('span');
                                function y(e) {
                                    var n = (function(n) {
                                            var t = e.id,
                                                o = e.account,
                                                i = e.amount,
                                                r = e.countryCode,
                                                s = e.style,
                                                l = e._legacy,
                                                c = a(e, [
                                                    'id',
                                                    'account',
                                                    'amount',
                                                    'countryCode',
                                                    'style',
                                                    '_legacy'
                                                ]),
                                                u = { _legacy: l, id: t };
                                            if (
                                                ('string' != typeof o
                                                    ? Qt('account', 'string', o)
                                                    : 13 === o.length || 10 === o.length || O()(o, 'client-id:')
                                                    ? (u.account = o)
                                                    : te.warn(
                                                          'Invalid option value (account). Ensure the correct Merchant Account ID has been entered.'
                                                      ),
                                                void 0 !== i)
                                            ) {
                                                var d = Number(i);
                                                Zt()(d)
                                                    ? te.warn(
                                                          'Invalid option value (amount). Ensure value is a number.'
                                                      )
                                                    : d < 0
                                                    ? te.warn(
                                                          'Invalid option value (amount). Ensure value is a positive number.'
                                                      )
                                                    : (u.amount = d);
                                            }
                                            return (
                                                void 0 !== r &&
                                                    ('string' != typeof r
                                                        ? te.warn(
                                                              'Invalid option value (countryCode). Ensure value is a string.'
                                                          )
                                                        : 2 !== r.length
                                                        ? te.warn(
                                                              'Invalid option value (countryCode). Country code should be 2 characters.'
                                                          )
                                                        : (u.countryCode = r)),
                                                'object' == typeof s && 'string' == typeof s.layout && $t[s.layout]
                                                    ? (u.style = eo(s))
                                                    : ('object' == typeof s
                                                          ? te.warn(
                                                                'Invalid option value (style.layout). Expected one of ["' +
                                                                    Object.keys($t).join('", "') +
                                                                    '"] but received "' +
                                                                    s.layout +
                                                                    '".'
                                                            )
                                                          : void 0 !== s && Qt('style', 'object', s),
                                                      (u.style = eo({ layout: 'text' }))),
                                                b()(u, Xt(qt, c, '')),
                                                u
                                            );
                                        })(),
                                        t = (function(e) {
                                            return ('custom' !== H(e, 'style.layout')
                                                ? se(e)
                                                : K.ZalgoPromise.all([se(e), ie(e.style)]).then(function(n) {
                                                      var t = n[0],
                                                          o = n[1];
                                                      return 'object' == typeof t.markup
                                                          ? ('' === o && te.error({ message: $.INVALID_STYLE_OPTIONS }),
                                                            (t.markup.template = o),
                                                            { markup: t.markup, options: W(e, re(o)) })
                                                          : { markup: t.markup, options: e };
                                                  })
                                            ).then(
                                                M(function(e) {
                                                    e.options.style._flattened = (function e(n, t, o) {
                                                        return (
                                                            void 0 === t && (t = ''),
                                                            void 0 === o && (o = ':'),
                                                            P()(n).reduce(function(n, i) {
                                                                var a = i[0],
                                                                    r = i[1];
                                                                switch (typeof r) {
                                                                    case 'object':
                                                                        return [].concat(n, e(r, '' + t + a + '.'));
                                                                    case 'string':
                                                                    default:
                                                                        return [].concat(n, ['' + t + a + o + r]);
                                                                }
                                                            }, [])
                                                        );
                                                    })(e.options.style);
                                                })
                                            );
                                        })(n)
                                            .then(d)
                                            .then(
                                                (function() {
                                                    for (var e = arguments.length, n = new Array(e), t = 0; t < e; t++)
                                                        n[t] = arguments[t];
                                                    return function(e) {
                                                        return n.reduce(function(e, n) {
                                                            return n(e);
                                                        }, e);
                                                    };
                                                })(C(b.a, { wrapper: h, events: f }), co, M(so.init), M(m), M(p), uo)
                                            )
                                            .catch(function(e) {
                                                return te.error({ error: '' + e });
                                            });
                                    te.waitFor(t), r(n);
                                }
                                return (
                                    h !== c && h.appendChild(c),
                                    n.appendChild(h),
                                    y(o),
                                    {
                                        wrapper: h,
                                        container: c,
                                        update: function(e) {
                                            var n = W(o, e),
                                                t = (function e(n, t) {
                                                    return P()(t).reduce(function(t, o) {
                                                        var a,
                                                            r,
                                                            s = o[0],
                                                            l = o[1];
                                                        if (!n[s]) return i({}, t, (((a = {})[s] = l), a));
                                                        if ('object' != typeof l || null === l)
                                                            return l !== n[s] ? i({}, t, (((r = {})[s] = l), r)) : t;
                                                        if (Array.isArray(l)) {
                                                            var c;
                                                            if (Array.isArray(n[s])) {
                                                                var u,
                                                                    d = l.filter(function(e) {
                                                                        return !I()(n[s], e);
                                                                    });
                                                                return d.length > 0
                                                                    ? i({}, t, (((u = {})[s] = d), u))
                                                                    : t;
                                                            }
                                                            return i({}, t, (((c = {})[s] = l), c));
                                                        }
                                                        var m,
                                                            f = e(n[s], l);
                                                        return Object.keys(f).length > 0
                                                            ? i({}, t, (((m = {})[s] = f), m))
                                                            : t;
                                                    }, {});
                                                })(o, n);
                                            Object.keys(t).length > 0 &&
                                                (g(),
                                                te.info(q.MESSAGE_UPDATE_INITIATED, { id: n.id, options: e }),
                                                y(n));
                                        }
                                    }
                                );
                            })(n, e);
                            lo.set(e, t), te.info(q.IFRAME_CREATED, { id: n.id });
                        }
                        return lo.get(e).update;
                    }
                };
            function fo(e, n) {
                var t, o;
                if ((void 0 === n && (n = '[data-pp-message]'), 'string' == typeof n))
                    (t = R()(document.querySelectorAll(n))), (o = n);
                else if (D(n)) (t = [n]), (o = 'HTMLElement');
                else {
                    if (!Array.isArray(n) || !n.every(D)) return te.warn('Invalid selector', n);
                    (t = [].concat(n)), (o = 'Array<HTMLElement>');
                }
                (t = t.filter(function(n) {
                    return n.ownerDocument.body.contains(n)
                        ? !e._auto || !n.hasAttribute('data-pp-id')
                        : (te.warn('Skipping container. Must be in the document:', n), !1);
                })),
                    te.info(q.STARTING_MESSAGE_RENDER, { url: window.location.href, selector: o });
                var a = t.map(function(n) {
                    var t = W(e, Y(n));
                    return (
                        n.hasAttribute('data-pp-id') ||
                            (n.setAttribute('data-pp-id', F.nextId), U({ nextId: (F.nextId += 1) })),
                        (t.id = n.getAttribute('data-pp-id')),
                        new MutationObserver(function(e) {
                            var t = e.reduce(function(e, n) {
                                return O()(n.attributeName, 'data-pp-')
                                    ? i({}, e, {}, B(n.attributeName.slice(8), n.target.getAttribute(n.attributeName)))
                                    : e;
                            }, {});
                            mo.init(n, t);
                        }).observe(n, { attributes: !0 }),
                        [mo.init(n, t), n, t]
                    );
                });
                return function(e) {
                    return a.forEach(function(n) {
                        var t = n[0],
                            o = n[1],
                            i = W(n[2], W(e, Y(o)));
                        (i.id = o.getAttribute('data-pp-id')), t(i);
                    });
                };
            }
            var po = function(e) {
                return {
                    render: function(n) {
                        return fo(i({}, F.config, {}, e), n);
                    }
                };
            };
            b()(po, {
                render: function(e, n) {
                    return void 0 === e && (e = {}), fo(i({}, F.config, {}, e), n);
                },
                setGlobalConfig: function(e) {
                    return void 0 === e && (e = {}), U({ config: i({}, F.config, {}, e) });
                }
            });
            var go,
                ho = po;
            t.d(n, 'Messages', function() {
                return ho;
            }),
                (go = document.currentScript || document.querySelector('script[src$="messaging.js"]')) &&
                    ho.setGlobalConfig(Y(go)),
                (window.paypal.Message = ho),
                F.config.account &&
                    ('loading' === document.readyState
                        ? window.addEventListener('DOMContentLoaded', function() {
                              return ho.render({ _auto: !0 });
                          })
                        : ho.render({ _auto: !0 }));
        }
    ]).Messages);
//# sourceMappingURL=messaging.js.map
