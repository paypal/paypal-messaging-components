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
            t((t.s = 162))
        );
    })([
        function(e, n, t) {
            e.exports = t(142);
        },
        function(e, n, t) {
            e.exports = t(139);
        },
        function(e, n, t) {
            e.exports = t(112);
        },
        function(e, n, t) {
            e.exports = t(110);
        },
        function(e, n, t) {
            'use strict';
            var o = t(8),
                i = t(103).f,
                r = t(104),
                a = t(16),
                s = t(35),
                l = t(17),
                c = t(15),
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
                    x = e.stat,
                    v = e.proto,
                    b = w ? o : x ? o[_] : (o[_] || {}).prototype,
                    E = w ? a : a[_] || (a[_] = {}),
                    P = E.prototype;
                for (m in n)
                    (t = !r(w ? m : _ + (x ? '.' : '#') + m, e.forced) && b && c(b, m)),
                        (p = E[m]),
                        t && (g = e.noTargetGet ? (y = i(b, m)) && y.value : b[m]),
                        (f = t && g ? g : n[m]),
                        (t && typeof p == typeof f) ||
                            ((h =
                                e.bind && t
                                    ? s(f, o)
                                    : e.wrap && t
                                    ? u(f)
                                    : v && 'function' == typeof f
                                    ? s(Function.call, f)
                                    : f),
                            (e.sham || (f && f.sham) || (p && p.sham)) && l(h, 'sham', !0),
                            (E[m] = h),
                            v &&
                                (c(a, (d = _ + 'Prototype')) || l(a, d, {}),
                                (a[d][m] = f),
                                e.real && P && !P[m] && l(P, m, f)));
            };
        },
        function(e, n, t) {
            var o = t(8),
                i = t(38),
                r = t(51),
                a = t(122),
                s = o.Symbol,
                l = i('wks');
            e.exports = function(e) {
                return l[e] || (l[e] = (a && s[e]) || (a ? s : r)('Symbol.' + e));
            };
        },
        function(e, n, t) {
            e.exports = t(149);
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
            e.exports = t(137);
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
                i = t(26),
                r = t(23);
            e.exports = o
                ? function(e, n, t) {
                      return i.f(e, n, r(1, t));
                  }
                : function(e, n, t) {
                      return (e[n] = t), e;
                  };
        },
        function(e, n, t) {
            var o = t(27),
                i = Math.min;
            e.exports = function(e) {
                return e > 0 ? i(o(e), 9007199254740991) : 0;
            };
        },
        function(e, n, t) {
            e.exports = t(41);
        },
        function(e, n, t) {
            e.exports = t(158);
        },
        function(e, n, t) {
            var o = t(14);
            e.exports = function(e) {
                if (!o(e)) throw TypeError(String(e) + ' is not an object');
                return e;
            };
        },
        function(e, n, t) {
            e.exports = t(160);
        },
        function(e, n) {
            e.exports = function(e, n) {
                return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: n };
            };
        },
        function(e, n, t) {
            var o = t(33),
                i = t(9);
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
            var o = t(12),
                i = t(46),
                r = t(21),
                a = t(34),
                s = Object.defineProperty;
            n.f = o
                ? s
                : function(e, n, t) {
                      if ((r(e), (n = a(n, !0)), r(t), i))
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
        function(e, n, t) {
            e.exports = t(154);
        },
        function(e, n) {
            e.exports =
                '* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nhtml {\n    color: #2d2d2d;\n    font-family: PayPal-Sans, Helvetica, Arial, sans-serif;\n    font-size: 14px;\n    font-weight: 400;\n    overflow: hidden;\n}\n\nimg {\n    display: block;\n    width: 100%;\n    height: auto;\n}\n\n.message__logo--svg {\n    position: relative;\n}\n\n.message__logo img {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n}\n\n/* IE will not properly scale a SVG element, but will scale a canvas element */\n.message__logo canvas {\n    display: block;\n    width: 100%;\n    visibility: hidden;\n}\n';
        },
        function(e, n, t) {
            'use strict';
            var o = {}.propertyIsEnumerable,
                i = Object.getOwnPropertyDescriptor,
                r = i && !o.call({ 1: 2 }, 1);
            n.f = r
                ? function(e) {
                      var n = i(this, e);
                      return !!n && n.enumerable;
                  }
                : o;
        },
        function(e, n, t) {
            var o = t(13),
                i = t(25),
                r = ''.split;
            e.exports = o(function() {
                return !Object('z').propertyIsEnumerable(0);
            })
                ? function(e) {
                      return 'String' == i(e) ? r.call(e, '') : Object(e);
                  }
                : Object;
        },
        function(e, n, t) {
            var o = t(14);
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
            var o = t(107),
                i = t(49);
            e.exports =
                Object.keys ||
                function(e) {
                    return o(e, i);
                };
        },
        function(e, n) {
            e.exports = {};
        },
        function(e, n, t) {
            var o = t(8),
                i = t(118),
                r = t(39),
                a = o['__core-js_shared__'] || i('__core-js_shared__', {});
            (e.exports = function(e, n) {
                return a[e] || (a[e] = void 0 !== n ? n : {});
            })('versions', []).push({
                version: '3.1.3',
                mode: r ? 'pure' : 'global',
                copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
            });
        },
        function(e, n) {
            e.exports = !0;
        },
        function(e, n, t) {
            var o = t(38),
                i = t(51),
                r = o('keys');
            e.exports = function(e) {
                return r[e] || (r[e] = i(e));
            };
        },
        function(e, n, t) {
            var o = t(16),
                i = t(8),
                r = function(e) {
                    return 'function' == typeof e ? e : void 0;
                };
            e.exports = function(e, n) {
                return arguments.length < 2 ? r(o[e]) || r(i[e]) : (o[e] && o[e][n]) || (i[e] && i[e][n]);
            };
        },
        function(e, n, t) {
            var o = t(141);
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
                i = t(13),
                r = t(47);
            e.exports =
                !o &&
                !i(function() {
                    return (
                        7 !=
                        Object.defineProperty(r('div'), 'a', {
                            get: function() {
                                return 7;
                            }
                        }).a
                    );
                });
        },
        function(e, n, t) {
            var o = t(8),
                i = t(14),
                r = o.document,
                a = i(r) && i(r.createElement);
            e.exports = function(e) {
                return a ? r.createElement(e) : {};
            };
        },
        function(e, n, t) {
            var o = t(24),
                i = t(18),
                r = t(108),
                a = function(e) {
                    return function(n, t, a) {
                        var s,
                            l = o(n),
                            c = i(l.length),
                            u = r(a, c);
                        if (e && t != t) {
                            for (; c > u; ) if ((s = l[u++]) != s) return !0;
                        } else for (; c > u; u++) if ((e || u in l) && l[u] === t) return e || u || 0;
                        return !e && -1;
                    };
                };
            e.exports = { includes: a(!0), indexOf: a(!1) };
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
            var o = t(12),
                i = t(36),
                r = t(24),
                a = t(32).f,
                s = function(e) {
                    return function(n) {
                        for (var t, s = r(n), l = i(s), c = l.length, u = 0, d = []; c > u; )
                            (t = l[u++]), (o && !a.call(s, t)) || d.push(e ? [t, s[t]] : s[t]);
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
                r,
                a = t(53),
                s = t(17),
                l = t(15),
                c = t(5),
                u = t(39),
                d = c('iterator'),
                m = !1;
            [].keys && ('next' in (r = [].keys()) ? (i = a(a(r))) !== Object.prototype && (o = i) : (m = !0)),
                null == o && (o = {}),
                u ||
                    l(o, d) ||
                    s(o, d, function() {
                        return this;
                    }),
                (e.exports = { IteratorPrototype: o, BUGGY_SAFARI_ITERATORS: m });
        },
        function(e, n, t) {
            var o = t(15),
                i = t(28),
                r = t(40),
                a = t(121),
                s = r('IE_PROTO'),
                l = Object.prototype;
            e.exports = a
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
            var o = t(26).f,
                i = t(17),
                r = t(15),
                a = t(126),
                s = t(5)('toStringTag'),
                l = a !== {}.toString;
            e.exports = function(e, n, t, c) {
                if (e) {
                    var u = t ? e : e.prototype;
                    r(u, s) || o(u, s, { configurable: !0, value: n }), c && l && i(u, 'toString', a);
                }
            };
        },
        function(e, n, t) {
            var o = t(25),
                i = t(5)('toStringTag'),
                r =
                    'Arguments' ==
                    o(
                        (function() {
                            return arguments;
                        })()
                    );
            e.exports = function(e) {
                var n, t, a;
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
                    : r
                    ? o(n)
                    : 'Object' == (a = o(n)) && 'function' == typeof n.callee
                    ? 'Arguments'
                    : a;
            };
        },
        function(e, n) {
            e.exports = function() {};
        },
        function(e, n, t) {
            e.exports = t(143);
        },
        function(e, n, t) {
            e.exports = t(156);
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
            t(102);
            var o = t(16);
            e.exports = o.Object.assign;
        },
        function(e, n, t) {
            var o = t(4),
                i = t(106);
            o({ target: 'Object', stat: !0, forced: Object.assign !== i }, { assign: i });
        },
        function(e, n, t) {
            var o = t(12),
                i = t(32),
                r = t(23),
                a = t(24),
                s = t(34),
                l = t(15),
                c = t(46),
                u = Object.getOwnPropertyDescriptor;
            n.f = o
                ? u
                : function(e, n) {
                      if (((e = a(e)), (n = s(n, !0)), c))
                          try {
                              return u(e, n);
                          } catch (e) {}
                      if (l(e, n)) return r(!i.f.call(e, n), e[n]);
                  };
        },
        function(e, n, t) {
            var o = t(13),
                i = /#|\.prototype\./,
                r = function(e, n) {
                    var t = s[a(e)];
                    return t == c || (t != l && ('function' == typeof n ? o(n) : !!n));
                },
                a = (r.normalize = function(e) {
                    return String(e)
                        .replace(i, '.')
                        .toLowerCase();
                }),
                s = (r.data = {}),
                l = (r.NATIVE = 'N'),
                c = (r.POLYFILL = 'P');
            e.exports = r;
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
                i = t(13),
                r = t(36),
                a = t(109),
                s = t(32),
                l = t(28),
                c = t(33),
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
                        7 != u({}, e)[t] || 'abcdefghijklmnopqrst' != r(u({}, n)).join('')
                    );
                })
                    ? function(e, n) {
                          for (var t = l(e), i = arguments.length, u = 1, d = a.f, m = s.f; i > u; )
                              for (
                                  var f, p = c(arguments[u++]), g = d ? r(p).concat(d(p)) : r(p), h = g.length, y = 0;
                                  h > y;

                              )
                                  (f = g[y++]), (o && !m.call(p, f)) || (t[f] = p[f]);
                          return t;
                      }
                    : u;
        },
        function(e, n, t) {
            var o = t(15),
                i = t(24),
                r = t(48).indexOf,
                a = t(37);
            e.exports = function(e, n) {
                var t,
                    s = i(e),
                    l = 0,
                    c = [];
                for (t in s) !o(a, t) && o(s, t) && c.push(t);
                for (; n.length > l; ) o(s, (t = n[l++])) && (~r(c, t) || c.push(t));
                return c;
            };
        },
        function(e, n, t) {
            var o = t(27),
                i = Math.max,
                r = Math.min;
            e.exports = function(e, n) {
                var t = o(e);
                return t < 0 ? i(t + n, 0) : r(t, n);
            };
        },
        function(e, n) {
            n.f = Object.getOwnPropertySymbols;
        },
        function(e, n, t) {
            t(111);
            var o = t(16);
            e.exports = o.Object.entries;
        },
        function(e, n, t) {
            var o = t(4),
                i = t(50).entries;
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
            t(113), t(130);
            var o = t(16);
            e.exports = o.Array.from;
        },
        function(e, n, t) {
            'use strict';
            var o = t(114).charAt,
                i = t(115),
                r = t(119),
                a = i.set,
                s = i.getterFor('String Iterator');
            r(
                String,
                'String',
                function(e) {
                    a(this, { type: 'String Iterator', string: String(e), index: 0 });
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
            var o = t(27),
                i = t(9),
                r = function(e) {
                    return function(n, t) {
                        var r,
                            a,
                            s = String(i(n)),
                            l = o(t),
                            c = s.length;
                        return l < 0 || l >= c
                            ? e
                                ? ''
                                : void 0
                            : (r = s.charCodeAt(l)) < 55296 ||
                              r > 56319 ||
                              l + 1 === c ||
                              (a = s.charCodeAt(l + 1)) < 56320 ||
                              a > 57343
                            ? e
                                ? s.charAt(l)
                                : r
                            : e
                            ? s.slice(l, l + 2)
                            : a - 56320 + ((r - 55296) << 10) + 65536;
                    };
                };
            e.exports = { codeAt: r(!1), charAt: r(!0) };
        },
        function(e, n, t) {
            var o,
                i,
                r,
                a = t(116),
                s = t(8),
                l = t(14),
                c = t(17),
                u = t(15),
                d = t(40),
                m = t(37);
            if (a) {
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
                    (r = function(e) {
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
                    (r = function(e) {
                        return u(e, y);
                    });
            }
            e.exports = {
                set: o,
                get: i,
                has: r,
                enforce: function(e) {
                    return r(e) ? i(e) : o(e, {});
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
                i = t(117),
                r = o.WeakMap;
            e.exports = 'function' == typeof r && /native code/.test(i.call(r));
        },
        function(e, n, t) {
            var o = t(38);
            e.exports = o('native-function-to-string', Function.toString);
        },
        function(e, n, t) {
            var o = t(8),
                i = t(17);
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
                i = t(120),
                r = t(53),
                a = t(127),
                s = t(54),
                l = t(17),
                c = t(129),
                u = t(5),
                d = t(39),
                m = t(29),
                f = t(52),
                p = f.IteratorPrototype,
                g = f.BUGGY_SAFARI_ITERATORS,
                h = u('iterator'),
                y = function() {
                    return this;
                };
            e.exports = function(e, n, t, u, f, _, w) {
                i(t, n, u);
                var x,
                    v,
                    b,
                    E = function(e) {
                        if (e === f && T) return T;
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
                    T = (!g && z) || E(f),
                    O = ('Array' == n && R.entries) || z;
                if (
                    (O &&
                        ((x = r(O.call(new e()))),
                        p !== Object.prototype &&
                            x.next &&
                            (d || r(x) === p || (a ? a(x, p) : 'function' != typeof x[h] && l(x, h, y)),
                            s(x, P, !0, !0),
                            d && (m[P] = y))),
                    'values' == f &&
                        z &&
                        'values' !== z.name &&
                        ((A = !0),
                        (T = function() {
                            return z.call(this);
                        })),
                    (d && !w) || R[h] === T || l(R, h, T),
                    (m[n] = T),
                    f)
                )
                    if (((v = { values: E('values'), keys: _ ? T : E('keys'), entries: E('entries') }), w))
                        for (b in v) (!g && !A && b in R) || c(R, b, v[b]);
                    else o({ target: n, proto: !0, forced: g || A }, v);
                return v;
            };
        },
        function(e, n, t) {
            'use strict';
            var o = t(52).IteratorPrototype,
                i = t(123),
                r = t(23),
                a = t(54),
                s = t(29),
                l = function() {
                    return this;
                };
            e.exports = function(e, n, t) {
                var c = n + ' Iterator';
                return (e.prototype = i(o, { next: r(1, t) })), a(e, c, !1, !0), (s[c] = l), e;
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
            var o = t(21),
                i = t(124),
                r = t(49),
                a = t(37),
                s = t(125),
                l = t(47),
                c = t(40)('IE_PROTO'),
                u = function() {},
                d = function() {
                    var e,
                        n = l('iframe'),
                        t = r.length;
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
                        delete d.prototype[r[t]];
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
                (a[c] = !0);
        },
        function(e, n, t) {
            var o = t(12),
                i = t(26),
                r = t(21),
                a = t(36);
            e.exports = o
                ? Object.defineProperties
                : function(e, n) {
                      r(e);
                      for (var t, o = a(n), s = o.length, l = 0; s > l; ) i.f(e, (t = o[l++]), n[t]);
                      return e;
                  };
        },
        function(e, n, t) {
            var o = t(41);
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
            var o = t(21),
                i = t(128);
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
                          return function(t, r) {
                              return o(t), i(r), n ? e.call(t, r) : (t.__proto__ = r), t;
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
            e.exports = function(e, n, t, i) {
                i && i.enumerable ? (e[n] = t) : o(e, n, t);
            };
        },
        function(e, n, t) {
            var o = t(4),
                i = t(131);
            o(
                {
                    target: 'Array',
                    stat: !0,
                    forced: !t(136)(function(e) {
                        Array.from(e);
                    })
                },
                { from: i }
            );
        },
        function(e, n, t) {
            'use strict';
            var o = t(35),
                i = t(28),
                r = t(132),
                a = t(133),
                s = t(18),
                l = t(134),
                c = t(135);
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
                if ((h && (g = o(g, p > 2 ? arguments[2] : void 0, 2)), null == _ || (f == Array && a(_))))
                    for (t = new f((n = s(m.length))); n > y; y++) l(t, y, h ? g(m[y], y) : m[y]);
                else
                    for (d = _.call(m), t = new f(); !(u = d.next()).done; y++)
                        l(t, y, h ? r(d, g, [u.value, y], !0) : u.value);
                return (t.length = y), t;
            };
        },
        function(e, n, t) {
            var o = t(21);
            e.exports = function(e, n, t, i) {
                try {
                    return i ? n(o(t)[0], t[1]) : n(t);
                } catch (n) {
                    var r = e.return;
                    throw (void 0 !== r && o(r.call(e)), n);
                }
            };
        },
        function(e, n, t) {
            var o = t(5),
                i = t(29),
                r = o('iterator'),
                a = Array.prototype;
            e.exports = function(e) {
                return void 0 !== e && (i.Array === e || a[r] === e);
            };
        },
        function(e, n, t) {
            'use strict';
            var o = t(34),
                i = t(26),
                r = t(23);
            e.exports = function(e, n, t) {
                var a = o(n);
                a in e ? i.f(e, a, r(0, t)) : (e[a] = t);
            };
        },
        function(e, n, t) {
            var o = t(55),
                i = t(29),
                r = t(5)('iterator');
            e.exports = function(e) {
                if (null != e) return e[r] || e['@@iterator'] || i[o(e)];
            };
        },
        function(e, n, t) {
            var o = t(5)('iterator'),
                i = !1;
            try {
                var r = 0,
                    a = {
                        next: function() {
                            return { done: !!r++ };
                        },
                        return: function() {
                            i = !0;
                        }
                    };
                (a[o] = function() {
                    return this;
                }),
                    Array.from(a, function() {
                        throw 2;
                    });
            } catch (e) {}
            e.exports = function(e, n) {
                if (!n && !i) return !1;
                var t = !1;
                try {
                    var r = {};
                    (r[o] = function() {
                        return {
                            next: function() {
                                return { done: (t = !0) };
                            }
                        };
                    }),
                        e(r);
                } catch (e) {}
                return t;
            };
        },
        function(e, n, t) {
            t(138);
            var o = t(19);
            e.exports = o('Array', 'includes');
        },
        function(e, n, t) {
            'use strict';
            var o = t(4),
                i = t(48).includes,
                r = t(56);
            o(
                { target: 'Array', proto: !0 },
                {
                    includes: function(e) {
                        return i(this, e, arguments.length > 1 ? arguments[1] : void 0);
                    }
                }
            ),
                r('includes');
        },
        function(e, n, t) {
            t(140);
            var o = t(19);
            e.exports = o('String', 'startsWith');
        },
        function(e, n, t) {
            'use strict';
            var o = t(4),
                i = t(18),
                r = t(42),
                a = t(9),
                s = t(43),
                l = ''.startsWith,
                c = Math.min;
            o(
                { target: 'String', proto: !0, forced: !s('startsWith') },
                {
                    startsWith: function(e) {
                        var n = String(a(this));
                        r(e);
                        var t = i(c(arguments.length > 1 ? arguments[1] : void 0, n.length)),
                            o = String(e);
                        return l ? l.call(n, o, t) : n.slice(t, t + o.length) === o;
                    }
                }
            );
        },
        function(e, n, t) {
            var o = t(14),
                i = t(25),
                r = t(5)('match');
            e.exports = function(e) {
                var n;
                return o(e) && (void 0 !== (n = e[r]) ? !!n : 'RegExp' == i(e));
            };
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
                            r = [],
                            a = 0,
                            s = void 0;
                        function l() {
                            if (!a && s) {
                                var e = s;
                                (s = null), e.resolve();
                            }
                        }
                        function c() {
                            a += 1;
                        }
                        function u() {
                            (a -= 1), l();
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
                                        r = !1,
                                        a = !1,
                                        s = !1;
                                    c();
                                    try {
                                        n(
                                            function(e) {
                                                s ? t.resolve(e) : ((r = !0), (o = e));
                                            },
                                            function(e) {
                                                s ? t.reject(e) : ((a = !0), (i = e));
                                            }
                                        );
                                    } catch (e) {
                                        return u(), void this.reject(e);
                                    }
                                    u(), (s = !0), r ? this.resolve(o) : a && this.reject(i);
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
                                                            for (var t = 0; t < r.length; t++) r[t](e, n);
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
                                        r = this.handlers;
                                    if (!this.dispatching && (t || i)) {
                                        (this.dispatching = !0), c();
                                        for (
                                            var a = function(a) {
                                                    var s = r[a],
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
                                            s < r.length;
                                            s++
                                        )
                                            a(s);
                                        (r.length = 0), (this.dispatching = !1), u();
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
                                        r = [];
                                    if (!i) return t.resolve(r), t;
                                    for (
                                        var a = function(a) {
                                                var s = n[a];
                                                if (s instanceof e) {
                                                    if (s.resolved) return (r[a] = s.value), (i -= 1), 'continue';
                                                } else if (!o(s)) return (r[a] = s), (i -= 1), 'continue';
                                                e.resolve(s).then(
                                                    function(e) {
                                                        (r[a] = e), 0 == (i -= 1) && t.resolve(r);
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
                                        a(s);
                                    return 0 === i && t.resolve(r), t;
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
                                            r.push(e),
                                            {
                                                cancel: function() {
                                                    r.splice(r.indexOf(e), 1);
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
            t(144);
            var o = t(19);
            e.exports = o('String', 'padStart');
        },
        function(e, n, t) {
            'use strict';
            var o = t(4),
                i = t(145).start;
            o(
                { target: 'String', proto: !0, forced: t(147) },
                {
                    padStart: function(e) {
                        return i(this, e, arguments.length > 1 ? arguments[1] : void 0);
                    }
                }
            );
        },
        function(e, n, t) {
            var o = t(18),
                i = t(146),
                r = t(9),
                a = Math.ceil,
                s = function(e) {
                    return function(n, t, s) {
                        var l,
                            c,
                            u = String(r(n)),
                            d = u.length,
                            m = void 0 === s ? ' ' : String(s),
                            f = o(t);
                        return f <= d || '' == m
                            ? u
                            : ((c = i.call(m, a((l = f - d) / m.length))).length > l && (c = c.slice(0, l)),
                              e ? u + c : c + u);
                    };
                };
            e.exports = { start: s(!1), end: s(!0) };
        },
        function(e, n, t) {
            'use strict';
            var o = t(27),
                i = t(9);
            e.exports =
                ''.repeat ||
                function(e) {
                    var n = String(i(this)),
                        t = '',
                        r = o(e);
                    if (r < 0 || r == 1 / 0) throw RangeError('Wrong number of repetitions');
                    for (; r > 0; (r >>>= 1) && (n += n)) 1 & r && (t += n);
                    return t;
                };
        },
        function(e, n, t) {
            var o = t(148);
            e.exports = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(o);
        },
        function(e, n, t) {
            var o = t(41);
            e.exports = o('navigator', 'userAgent') || '';
        },
        function(e, n, t) {
            t(150);
            var o = t(19);
            e.exports = o('Array', 'find');
        },
        function(e, n, t) {
            'use strict';
            var o = t(4),
                i = t(151).find,
                r = t(56),
                a = !0;
            'find' in [] &&
                Array(1).find(function() {
                    a = !1;
                }),
                o(
                    { target: 'Array', proto: !0, forced: a },
                    {
                        find: function(e) {
                            return i(this, e, arguments.length > 1 ? arguments[1] : void 0);
                        }
                    }
                ),
                r('find');
        },
        function(e, n, t) {
            var o = t(35),
                i = t(33),
                r = t(28),
                a = t(18),
                s = t(152),
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
                                w = r(f),
                                x = i(w),
                                v = o(p, g, 3),
                                b = a(x.length),
                                E = 0,
                                P = h || s,
                                A = n ? P(f, b) : t ? P(f, 0) : void 0;
                            b > E;
                            E++
                        )
                            if ((m || E in x) && ((_ = v((y = x[E]), E, w)), e))
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
            var o = t(14),
                i = t(153),
                r = t(5)('species');
            e.exports = function(e, n) {
                var t;
                return (
                    i(e) &&
                        ('function' != typeof (t = e.constructor) || (t !== Array && !i(t.prototype))
                            ? o(t) && null === (t = t[r]) && (t = void 0)
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
            t(155);
            var o = t(16);
            e.exports = o.Object.values;
        },
        function(e, n, t) {
            var o = t(4),
                i = t(50).values;
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
            t(157);
            var o = t(19);
            e.exports = o('String', 'endsWith');
        },
        function(e, n, t) {
            'use strict';
            var o = t(4),
                i = t(18),
                r = t(42),
                a = t(9),
                s = t(43),
                l = ''.endsWith,
                c = Math.min;
            o(
                { target: 'String', proto: !0, forced: !s('endsWith') },
                {
                    endsWith: function(e) {
                        var n = String(a(this));
                        r(e);
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
            t(159);
            var o = t(19);
            e.exports = o('String', 'includes');
        },
        function(e, n, t) {
            'use strict';
            var o = t(4),
                i = t(42),
                r = t(9);
            o(
                { target: 'String', proto: !0, forced: !t(43)('includes') },
                {
                    includes: function(e) {
                        return !!~String(r(this)).indexOf(i(e), arguments.length > 1 ? arguments[1] : void 0);
                    }
                }
            );
        },
        function(e, n, t) {
            t(161);
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
            function r(e, n) {
                if (null == e) return {};
                var t,
                    o,
                    i = {},
                    r = Object.keys(e);
                for (o = 0; o < r.length; o++) n.indexOf((t = r[o])) >= 0 || (i[t] = e[t]);
                return i;
            }
            t.r(o),
                t.d(o, 'WeakMap', function() {
                    return x;
                });
            var a = { MOCK: 'mock:', FILE: 'file:', ABOUT: 'about:' },
                s = 'Call was rejected by callee.\r\n';
            function l(e) {
                return void 0 === e && (e = window), e.location.protocol === a.ABOUT;
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
                if (t === a.FILE) return a.FILE + '//';
                if (t === a.ABOUT) {
                    var o = (function(e) {
                        if ((void 0 === e && (e = window), e))
                            try {
                                if (e.parent && e.parent !== e) return e.parent;
                            } catch (e) {}
                    })(e);
                    return o && c() ? u(o) : a.ABOUT + '//';
                }
                var i = n.host;
                if (!i) throw new Error('Can not read window host');
                return t + '//' + i;
            }
            function d(e) {
                var n = u((e = e || window));
                return n && e.mockDomain && 0 === e.mockDomain.indexOf(a.MOCK) ? e.mockDomain : n;
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
                x = (function() {
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
                            var r = this.keys,
                                a = this.values,
                                s = h(r, e);
                            -1 === s ? (r.push(e), a.push(n)) : (a[s] = n);
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
            var v = t(7),
                b = t.n(v),
                E = t(3),
                P = t.n(E),
                A = t(2),
                R = t.n(A),
                z = t(11),
                T = t.n(z),
                O = t(1),
                I = t.n(O);
            function S(e) {
                var n = new Map();
                return function() {
                    for (var t = arguments.length, o = new Array(t), i = 0; i < t; i++) o[i] = arguments[i];
                    var r = JSON.stringify(o);
                    return n.has(r) || n.set(r, e.apply(void 0, o)), n.get(r);
                };
            }
            function L(e, n) {
                var t = new Map();
                return function(o, i) {
                    void 0 === i && (i = !1);
                    var r = JSON.stringify(
                        n.map(function(e) {
                            return o[e];
                        })
                    );
                    return (t.has(r) && !i) || t.set(r, e(o)), t.get(r);
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
                        for (var o = arguments.length, i = new Array(o), r = 0; r < o; r++) i[r] = arguments[r];
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
            function k() {
                for (var e = arguments.length, n = new Array(e), t = 0; t < e; t++) n[t] = arguments[t];
                return function(e) {
                    return n.reduce(function(e, n) {
                        return n(e);
                    }, e);
                };
            }
            function j(e) {
                void 0 === e && (e = {});
                var n = i({}, e);
                return [n, C(b.a, n)];
            }
            function W(e) {
                return P()(e).reduce(function(e, n) {
                    var t,
                        o,
                        r,
                        a = n[0],
                        s = n[1];
                    return Array.isArray(s)
                        ? i({}, e, (((o = {})[a] = [].concat(s)), o))
                        : i({}, e, 'object' == typeof s ? (((r = {})[a] = W(s)), r) : (((t = {})[a] = s), t));
                }, {});
            }
            function H(e, n) {
                return (function e(n, t) {
                    return P()(t).reduce(function(t, o) {
                        var r,
                            a,
                            s,
                            l,
                            c = o[0],
                            u = o[1];
                        return Array.isArray(u)
                            ? i({}, t, (((a = {})[c] = [].concat(u)), a))
                            : 'object' != typeof u ||
                              null === u ||
                              (n[c] && 'object' == typeof n[c] && !Array.isArray(n[c]))
                            ? i(
                                  {},
                                  t,
                                  'object' == typeof u && null !== u
                                      ? (((l = {})[c] = e(n[c], u)), l)
                                      : (((r = {})[c] = u), r)
                              )
                            : i({}, t, (((s = {})[c] = W(u)), s));
                    }, n);
                })(W(e), n);
            }
            function B(e, n) {
                return n.split('.').reduce(function(e, n) {
                    return 'object' == typeof e || 'function' == typeof e ? e[n] : void 0;
                }, e);
            }
            function D(e, n, t) {
                var o;
                void 0 === t && (t = '-');
                var i,
                    r = e.indexOf(t);
                if (-1 === r) return ((i = {})[e] = n), i;
                var a = e.slice(0, r),
                    s = e.slice(r + 1);
                return ((o = {})[a] = D(s, n)), o;
            }
            function Y(e) {
                return 'object' == typeof HTMLElement
                    ? e instanceof HTMLElement
                    : e && 'object' == typeof e && null !== e && 1 === e.nodeType && 'string' == typeof e.nodeName;
            }
            function G(e) {
                var n = R()(e.attributes)
                    .filter(function(e) {
                        var n = e.nodeName;
                        return I()(n, 'data-pp-');
                    })
                    .reduce(function(e, n) {
                        var t = n.nodeValue;
                        return t ? H(e, D(n.nodeName.replace('data-pp-', ''), t)) : e;
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
            var U = j(window.__paypal_messages_state__ || { nextId: 1, config: {} }),
                F = U[0],
                V = U[1];
            Object.defineProperty(window, '__paypal_messages_state__', {
                value: F,
                enumerable: !1,
                configurable: !0,
                writable: !1
            });
            var Z = t(0),
                K = t(57),
                J = t.n(K),
                q = t(6),
                $ = t.n(q),
                Q = N(function(e, n, t) {
                    var o = e.uuid,
                        r = e.urls;
                    void 0 === t && (t = !1);
                    var a = new window.Image();
                    if ('object' == typeof n) {
                        var s = i({}, n, { uuid: t ? o + '::banner.hidden:true' : o }),
                            l = P()(s).reduce(function(e, n) {
                                return e + '&' + n[0] + '=' + n[1];
                            }, '');
                        a.src = (r[n.et] || r.DEFAULT) + '&bdata=' + encodeURIComponent(l.slice(1));
                    } else 'string' == typeof n && (a.src = r[n] || r.DEFAULT);
                }, 2),
                X = {
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
                ee = {
                    MESSAGE_OVERFLOW: 'MESSAGE_OVERFLOW',
                    MESSAGE_HIDDEN: 'MESSAGE_HIDDEN',
                    MESSAGE_INVALID_LEGACY: 'MESSAGE_INVALID_LEGACY',
                    MESSAGE_INVALID_MARKUP: 'MESSAGE_INVALID_MARKUP',
                    MODAL_FAIL: 'MODAL_FAIL',
                    CUSTOM_TEMPLATE_FAIL: 'CUSTOM_TEMPLATE_FAIL',
                    CUSTOM_JSON_OPTIONS_FAIL: 'CUSTOM_JSON_OPTIONS_FAIL'
                },
                ne = {
                    create: function(e) {
                        var n = e.id,
                            t = e.selector,
                            o = e.type,
                            r = j({ count: 1, account: e.account, history: [], logs: [] }),
                            a = r[0],
                            s = r[1],
                            l = {
                                start: function(e) {
                                    B(e, 'options.account') &&
                                        a.account !== e.options.account &&
                                        s({ account: e.account }),
                                        l.info(X.START, i({ t: Date.now() }, e));
                                },
                                end: function(e) {
                                    l.info(X.END, i({ t: Date.now() }, e)),
                                        (function() {
                                            if (!(a.count > 3)) {
                                                var e,
                                                    r = $()(a.logs, function(e) {
                                                        var n = e.event;
                                                        return 'Create' === n || 'Update' === n;
                                                    }),
                                                    l = {
                                                        version: '1.0.3',
                                                        url: window.location.href,
                                                        selector: t,
                                                        type: o + (r ? '-' + r.event : ''),
                                                        id: n + '-' + J()(a.count, 4, '0'),
                                                        account: a.account,
                                                        history: a.history,
                                                        events:
                                                            ((e = a.logs),
                                                            e.map(function(e) {
                                                                var n = e.event,
                                                                    t = i({}, e);
                                                                return (
                                                                    delete t.event,
                                                                    Object.keys(t).length > 0 ? [n, t] : n
                                                                );
                                                            }))
                                                    };
                                                s({ count: a.count + 1, logs: [] });
                                                var c = new XMLHttpRequest();
                                                (c.onreadystatechange = function() {
                                                    4 === c.readyState &&
                                                        s({
                                                            history: []
                                                                .concat(a.history, [
                                                                    c.getResponseHeader('Paypal-Debug-Id')
                                                                ])
                                                                .slice(-5)
                                                        });
                                                }),
                                                    c.open(
                                                        'POST',
                                                        'https://www.paypal.com/ppcredit/messagingLogger',
                                                        !0
                                                    ),
                                                    c.setRequestHeader(
                                                        'Content-Type',
                                                        'application/json;charset=UTF-8'
                                                    ),
                                                    c.send(JSON.stringify({ data: l }));
                                            }
                                        })();
                                },
                                info: function(e, n) {
                                    void 0 === n && (n = {}), s({ logs: [].concat(a.logs, [i({ event: e }, n)]) });
                                },
                                error: function(e) {
                                    l.info(X.ERROR, e);
                                },
                                track: Q,
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
                te = S(function(e) {
                    var n,
                        t = e.markup;
                    return Z.ZalgoPromise.resolve(
                        I()(t, 'https://www.paypalobjects.com')
                            ? ((n = t),
                              new Z.ZalgoPromise(function(e) {
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
            var oe = { US: 'en_US', GB: 'en_GB', FR: 'fr_FR', DE: 'de_DE' };
            function ie(e) {
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
                    throw new Error(ee.MESSAGE_INVALID_MARKUP);
                }
            }
            function re(e, n) {
                var t = n.match(/^<!--([\s\S]+?)-->/);
                if (t)
                    try {
                        return JSON.parse(t[1]);
                    } catch (n) {
                        e.error({ name: ee.CUSTOM_JSON_OPTIONS_FAIL });
                    }
                return {};
            }
            var ae = L(
                function(e) {
                    var n = e.account,
                        t = e.amount,
                        o = e.countryCode;
                    return new Z.ZalgoPromise(function(e) {
                        var i = 'c' + Math.floor(Math.random() * Math.pow(10, 19)),
                            r = {
                                dimensions: 'x200x51',
                                currency_value: t,
                                currency_code: 'USD',
                                format: 'HTML',
                                presentation_types: 'HTML',
                                ch: 'UPSTREAM',
                                call: '__PP.' + i
                            };
                        o && oe[o] && ((r.country_code = o), (r.locale = oe[o]));
                        var a = P()(r)
                                .filter(function(e) {
                                    return e[1];
                                })
                                .reduce(
                                    function(e, n) {
                                        return e + '&' + n[0] + '=' + n[1];
                                    },
                                    I()(n, 'client-id') ? 'client_id=' + n.slice(10) : 'pub_id=' + n
                                ),
                            s = document.createElement('script');
                        (s.async = !0),
                            (s.src = 'https://www.paypal.com/imadserver/upstream?' + a),
                            document.head.appendChild(s),
                            (window.__PP[i] = function(n) {
                                if ((document.head.removeChild(s), delete window.__PP[i], 'object' == typeof n))
                                    e({ markup: ie(n) });
                                else
                                    try {
                                        e({ markup: JSON.parse(n.replace(/<\/?div>/g, '')) });
                                    } catch (t) {
                                        e({ markup: n });
                                    }
                            });
                    });
                },
                ['account', 'amount', 'countryCode']
            );
            function se(e) {
                var n = e.options,
                    t = e.logger;
                return (
                    t.info(X.FETCH_START),
                    ('custom' !== B(n, 'style.layout')
                        ? ae(n).then(C(b.a, { options: n }))
                        : Z.ZalgoPromise.all([ae(n), te(n.style)]).then(function(e) {
                              var o = e[0],
                                  i = e[1];
                              return 'object' == typeof o.markup
                                  ? ('' === i && t.error({ name: ee.CUSTOM_TEMPLATE_FAIL }),
                                    (o.markup.template = i),
                                    { markup: o.markup, options: H(n, re(t, i)) })
                                  : { markup: o.markup, options: n };
                          })
                    ).then(
                        M(function(e) {
                            t.info(X.FETCH_END),
                                (e.options.style._flattened = (function e(n, t, o) {
                                    return (
                                        void 0 === t && (t = ''),
                                        void 0 === o && (o = ':'),
                                        P()(n).reduce(function(n, i) {
                                            var r = i[0],
                                                a = i[1];
                                            switch (typeof a) {
                                                case 'object':
                                                    return [].concat(n, e(a, '' + t + r + '.'));
                                                case 'string':
                                                default:
                                                    return [].concat(n, ['' + t + r + o + a]);
                                            }
                                        }, [])
                                    );
                                })(e.options.style));
                        })
                    )
                );
            }
            var le = t(30),
                ce = t.n(le),
                ue = { click: new Map(), message: new Map(), scroll: new Map(), hover: new Map(), resize: new Map() };
            function de(e) {
                e.origin === window.top.location.origin &&
                    e.source === (e.source.frameElement && e.source.frameElement.contentWindow) &&
                    ue.message.has(e.source.frameElement) &&
                    ue.message.get(e.source.frameElement)(e);
            }
            function me(e) {
                ue.resize.has(e.target.frameElement) && ue.resize.get(e.target.frameElement)(e);
            }
            function fe(e) {
                ue.scroll.forEach(function(n) {
                    return n(e);
                });
            }
            function pe(e) {
                ue.hover.has(e.target) && ue.hover.get(e.target)(e);
            }
            function ge(e) {
                e.target.ownerDocument && ue.click.has(e.target.ownerDocument.defaultView.frameElement)
                    ? ue.click.get(e.target.ownerDocument.defaultView.frameElement)(e)
                    : ue.click.has(e.currentTarget) && ue.click.get(e.currentTarget)(e);
            }
            function he(e) {
                return {
                    on: function(n, t) {
                        ('IFRAME' === e.tagName || ('resize' !== n && 'message' !== n)) &&
                            (function(e, n, t) {
                                if (
                                    ((function(e, n) {
                                        'scroll' === e && 0 === ue.scroll.size
                                            ? window.addEventListener('scroll', fe)
                                            : 'hover' === e && 0 === ue.hover.size
                                            ? document.addEventListener('mouseover', pe)
                                            : 'message' === e && 0 === ue.message.size
                                            ? window.addEventListener('message', de)
                                            : 'resize' !== e || ue[e].has(n)
                                            ? 'click' !== e ||
                                              ue[e].has(n) ||
                                              ('IFRAME' === n.tagName
                                                  ? n.contentWindow.document.body.addEventListener('click', ge)
                                                  : n.addEventListener('click', ge))
                                            : n.contentWindow.addEventListener('resize', me);
                                    })(e, n),
                                    ue[e].has(n))
                                ) {
                                    var o = ue[e].get(n);
                                    ue[e].set(n, function(e) {
                                        o(e), t(e);
                                    });
                                } else ue[e].set(n, t);
                            })(n, e, t);
                    },
                    clear: function(n) {
                        ue[n].delete(e),
                            'scroll' === n && 0 === ue.scroll.size
                                ? window.removeEventListener('scroll', fe)
                                : 'hover' === n && 0 === ue.hover.size
                                ? document.removeEventListener('mouseover', pe)
                                : 'click' === n
                                ? 'IFRAME' === e.tagName
                                    ? e.contentWindow.removeEventListener('click', ge)
                                    : e.removeEventListener('click', ge)
                                : 'IFRAME' === e.tagName &&
                                  ('resize' === n
                                      ? e.contentWindow.removeEventListener('resize', me)
                                      : 'message' === n &&
                                        0 === ue.message.size &&
                                        window.removeEventListener('message', de));
                    }
                };
            }
            var ye = t(58),
                _e = t.n(ye),
                we = t(20),
                xe = t.n(we),
                ve = t(59),
                be = t.n(ve),
                Ee = t(60),
                Pe = t.n(Ee),
                Ae = t(31),
                Re = t.n(Ae),
                ze = t(10),
                Te = t.n(ze),
                Oe = t(61),
                Ie = t.n(Oe),
                Se = t(62),
                Le = t.n(Se),
                Ce = t(44),
                Ne = t.n(Ce),
                Me = t(63),
                ke = t.n(Me),
                je = t(64),
                We = t.n(je),
                He = t(65),
                Be = t.n(He),
                De = t(66),
                Ye = t.n(De),
                Ge = t(67),
                Ue = t.n(Ge),
                Fe = t(68),
                Ve = t.n(Fe),
                Ze = [
                    ['default', [Te.a, Re.a, Ie.a].join('\n')],
                    ['logo.type:primary', Ye.a],
                    ['logo.type:alternative', Le.a],
                    ['logo.type:inline', Ne.a],
                    ['logo.type:none', [Ne.a, ke.a].join('\n')],
                    ['logo.position:right', We.a],
                    ['logo.position:top', Be.a],
                    ['logo.type:alternative && logo.position:top', Ue.a],
                    ['text.color:white', Ve.a]
                ],
                Ke = t(69),
                Je = t.n(Ke),
                qe = t(70),
                $e = t.n(qe),
                Qe = t(71),
                Xe = t.n(Qe),
                en = t(45),
                nn = t.n(en),
                tn = t(72),
                on = t.n(tn),
                rn = t(73),
                an = t.n(rn),
                sn = t(74),
                ln = t.n(sn),
                cn = t(75),
                un = t.n(cn),
                dn = t(76),
                mn = t.n(dn),
                fn = t(77),
                pn = t.n(fn),
                gn = t(78),
                hn = t.n(gn),
                yn = t(79),
                _n = t.n(yn),
                wn = [
                    ['default', [Te.a, Re.a, Je.a].join('\n')],
                    ['ratio:1x1', $e.a],
                    ['ratio:1x4', Xe.a],
                    ['ratio:8x1', [nn.a, on.a].join('\n')],
                    ['ratio:20x1', [nn.a, an.a].join('\n')],
                    ['color:blue', ln.a],
                    ['color:gray', un.a],
                    ['color:black', pn.a],
                    ['color:white', hn.a],
                    ['color:white-no-border', _n.a],
                    ['color:blue && ratio:1x4', mn.a]
                ],
                xn = t(80),
                vn = t.n(xn),
                bn = t(81),
                En = t.n(bn),
                Pn = t(82),
                An = t.n(Pn),
                Rn = t(83),
                zn = t.n(Rn),
                Tn = t(84),
                On = t.n(Tn),
                In = t(85),
                Sn = t.n(In),
                Ln = t(86),
                Cn = t.n(Ln),
                Nn = t(87),
                Mn = t.n(Nn),
                kn = t(88),
                jn = t.n(kn),
                Wn = t(89),
                Hn = t.n(Wn),
                Bn = t(90),
                Dn = t.n(Bn),
                Yn = t(91),
                Gn = t.n(Yn),
                Un = t(92),
                Fn = t.n(Un),
                Vn = t(93),
                Zn = t.n(Vn),
                Kn = t(94),
                Jn = t.n(Kn),
                qn = t(95),
                $n = t.n(qn),
                Qn = t(96),
                Xn = t.n(Qn),
                et = t(97),
                nt = t.n(et),
                tt = t(98),
                ot = t.n(tt),
                it = t(99),
                rt = {
                    x168x374: { styles: Sn.a, vertical: !0 },
                    x765x60: { styles: jn.a },
                    x1000x50: { styles: Hn.a, termsIcon: !0 },
                    x234x100: { styles: Cn.a, reverseLogo: !0 },
                    x310x100: { styles: Mn.a, reverseLogo: !0 },
                    x1000x36: { styles: Dn.a, termsIcon: !0 },
                    x120x90: { styles: Fn.a, termsIcon: !0 },
                    x234x60: { styles: Zn.a, reverseLogo: !0, termsIcon: !0 },
                    x250x250: { styles: Jn.a, reverseLogo: !0, vertical: !0, termsIcon: !0 },
                    x300x50: { styles: $n.a, reverseLogo: !0 },
                    x340x60: { styles: Gn.a, reverseLogo: !0 },
                    x468x60: { styles: Xn.a, reverseLogo: !0, termsIcon: !0 },
                    x728x90: { styles: nt.a, reverseLogo: !0 },
                    x540x200: { styles: ot.a, reverseLogo: !0, termsIcon: !0 },
                    x170x100: { styles: t.n(it).a, termsIcon: !0 }
                },
                at = Object.keys(rt).map(function(e) {
                    var n = rt[e],
                        t = e.slice(1),
                        o = t.split('x'),
                        i = o[1],
                        r =
                            '\n        .message {\n            width: ' +
                            o[0] +
                            'px;\n            min-height: ' +
                            i +
                            'px;\n        }\n\n        .message__container {\n            min-height: ' +
                            i +
                            'px;\n        }\n    ';
                    return (
                        n.vertical && (r = '' + r + An.a),
                        n.reverseLogo && (r = '' + r + En.a),
                        n.vertical && n.reverseLogo && (r = '' + r + zn.a),
                        n.termsIcon && (r = '' + r + On.a),
                        ['size:' + t, r]
                    );
                }),
                st = Object.keys(rt).map(function(e) {
                    return ['size:' + e.slice(1), rt[e].styles];
                }),
                lt = [['default', [Te.a, vn.a].join('\n')]].concat(at, st),
                ct = t(100),
                ut = {
                    'layout:text': Ze,
                    'layout:flex': wn,
                    'layout:legacy': lt,
                    'layout:custom': [['default', [Te.a, t.n(ct).a].join('\n')]]
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
                xt = {
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
                vt = {
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
                var t = $()(e, function(e) {
                    var t = e[1];
                    return T()(t, n);
                });
                if (t) return t[0];
                if (xe()(n, '.')) {
                    var o = n.split('.', 1)[0];
                    if (
                        (t = $()(e, function(e) {
                            var n = e[1];
                            return T()(n, o);
                        }))
                    )
                        return t[0];
                }
                return $()(e, function(e) {
                    var n = e[1];
                    return T()(n, 'default');
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
                Tt = N(function(e, n) {
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
                Ot = N(function(e, n, t, o) {
                    if ((void 0 === t && (t = 'PayPal Credit'), 'string' == typeof n)) {
                        var i = new Image();
                        (i.alt = t),
                            (i.className = 'message__logo'),
                            (i.src = n),
                            o && (i.srcset = o),
                            e.appendChild(i);
                    } else if (Array.isArray(n)) {
                        var r = n[0],
                            a = n[1],
                            s = n[2],
                            l = new Image();
                        (l.src = r), (l.alt = t);
                        var c = document.createElement('div');
                        c.className = 'message__logo message__logo--svg';
                        var u = document.createElement('canvas');
                        (u.height = s), (u.width = a), c.appendChild(l), c.appendChild(u), e.appendChild(c);
                    } else e.parentNode.removeChild(e);
                }, 2);
            function It(e) {
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
                                for (var n = e.innerText, t = []; xe()(n, o[0]); ) t.push(o[0]), o.shift();
                                if (0 === t.length || (1 === t.length && _e()(n, t[0]))) return e.classList.add('br');
                                var i = document.createElement('span');
                                (i.innerText = n), (i.className = 'br');
                                var r = t.reduce(
                                    function(e, n) {
                                        var t = (function(e, n) {
                                            var t = e.innerText,
                                                o = t.indexOf(n) + n.length,
                                                i = e.cloneNode();
                                            if (((i.innerText = t.slice(0, o).trim()), t.length !== o)) {
                                                var r = e.cloneNode();
                                                return (r.innerText = t.slice(o).trim()), [i, r];
                                            }
                                            return [i];
                                        })(e[e.length - 1], n);
                                        return [].concat(e.slice(0, -1), t);
                                    },
                                    [i]
                                );
                                return (
                                    (e.innerHTML = ''),
                                    r.forEach(function(n) {
                                        e.appendChild(n), e.appendChild(document.createTextNode(' '));
                                    })
                                );
                            });
                        })(0, o),
                    It(o)
                );
            }
            var Lt = N(function(e, n, t) {
                    return (
                        !1 !== t &&
                        ('string' != typeof t && 'object' != typeof t
                            ? null
                            : It(
                                  (o = 'string' == typeof t ? [{ tag: t }] : Array.isArray(t) ? t : [t]).map(function(
                                      t
                                  ) {
                                      var i,
                                          a = document.createElement('span');
                                      if ((o.length > 1 && a.setAttribute('class', 'multi'), 'string' == typeof t))
                                          (i = St(bt(e[n], t))), a.classList.add('tag--' + t.split('.', 1)[0]);
                                      else {
                                          var s = t.tag,
                                              l = r(t, ['tag']);
                                          (i = St(bt(e[n], s), l)), a.classList.add('tag--' + s.split('.', 1)[0]);
                                      }
                                      return (
                                          i.forEach(function(e) {
                                              return a.appendChild(e);
                                          }),
                                          a
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
                                r = o[1],
                                a = i.split(' && ');
                            return 'default' === i ||
                                a.every(function(n) {
                                    return T()(e, n);
                                })
                                ? n === Array
                                    ? [].concat(t, [r])
                                    : H(t, r)
                                : t;
                        },
                        n === Array ? [] : {}
                    );
                }),
                Nt = {
                    getTemplateNode: S(function(e, n) {
                        var t = B(e, 'style.layout');
                        if ('custom' === t)
                            return (function(e) {
                                var t = n.data,
                                    o = n.meta,
                                    i = n.template,
                                    r = document.createElement('div'),
                                    a = o.offerType;
                                if ('' === i) return r;
                                try {
                                    var s = i.replace(/{{\s*?([^\s]+?)\s*?}}/g, function(e, n) {
                                        var o = n.split('.'),
                                            i = o[0],
                                            r = o.slice(1).join('.');
                                        if ('logo' === i) {
                                            var a = document.createElement('div');
                                            return Ot(a, B(dt, r.toUpperCase()), 'PayPal Credit logo'), a.innerHTML;
                                        }
                                        return St(bt(t[i], r)).reduce(function(e, n) {
                                            return '' + e + (n.outerHTML || ' ');
                                        }, '');
                                    });
                                    (r.innerHTML = s),
                                        $()(R()(r.children), function(e) {
                                            return 'STYLE' !== e.tagName;
                                        }).classList.add('offer--' + a.replace(/:/g, '-').toLowerCase());
                                } catch (e) {}
                                return r;
                            })();
                        var o = B(e, 'style._flattened'),
                            i = B(n, 'meta.offerType'),
                            r = B(n, 'data');
                        if ('legacy' === t) {
                            var a = B(e, 'style.typeNI'),
                                s = B(e, 'style.typeEZP'),
                                l = 'NI' === i.split(':')[0] ? a : s;
                            if ('image' === l)
                                return (function(e, t) {
                                    var o = n.meta,
                                        i = Pt.cloneNode(!0),
                                        r = At('pp-legacy', i),
                                        a = ['link', 'pixel'].map(r),
                                        s = a[0],
                                        l = a[1],
                                        c = B(e, 'size'),
                                        u = B(e, 'color'),
                                        d = B(e, 'border');
                                    s.setAttribute('href', o.clickUrl), l.setAttribute('href', o.impressionUrl);
                                    var m = 'https://www.paypalobjects.com/upstream/assets/messaging/legacy',
                                        f = 'none' === u ? '' : '-' + u + (!0 === d ? '' : '-no-border'),
                                        p = ('none' === u ? 'v1' : 'v2') + '/' + c.replace(/x/, '-') + f,
                                        g = [1, 1.5, 2].map(function(e) {
                                            return m + '/' + p + '@' + e + 'x.png ' + e + 'x';
                                        });
                                    return Ot(s, m + '/' + p + '@1x.png', 'PayPal Credit Message', g.join(', ')), i;
                                })(e.style);
                            if (!l) throw new Error(ee.MESSAGE_INVALID_LEGACY);
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
                                            return xt[n];
                                        case 'PALA:SINGLE:GTZ':
                                            return vt[n];
                                        case 'NI:NON-US':
                                            return gt[n];
                                        case 'NI':
                                        default:
                                            return pt[n];
                                    }
                                })(0, 'layout:' + t)
                            ),
                            d = c(Array, ut['layout:' + t]),
                            m = Lt(r),
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
                            Tt(w, m('disclaimer', u.disclaimer)),
                            Ot(h, u.logo, 'PayPal Credit logo'),
                            'inline' === B(e, 'style.logo.type') && y.appendChild(h),
                            'none' === B(e, 'style.logo.type'))
                        ) {
                            var x = document.createElement('span');
                            x.innerText = 'with ';
                            var v = document.createElement('strong');
                            (v.innerText = 'PayPal Credit.'),
                                x.appendChild(v),
                                y.appendChild(document.createTextNode(' ')),
                                y.appendChild(x);
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
                    o
                );
            }
            var kt = N(function(e, n) {
                var t = n.markup,
                    o = n.options;
                return new Z.ZalgoPromise(function(n) {
                    'IFRAME' === e.tagName
                        ? 'string' == typeof t
                            ? (function(e, n) {
                                  return new Z.ZalgoPromise(function(t) {
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
                                  return new Z.ZalgoPromise(function(o) {
                                      var i = e.contentWindow,
                                          r = n.meta,
                                          a = Nt.getTemplateNode(t, n),
                                          s = i.document.importNode(a, !0),
                                          l = R()(s.getElementsByTagName('img')).map(function(e) {
                                              return new Z.ZalgoPromise(function(n) {
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
                                          Z.ZalgoPromise.all(l).then(function() {
                                              o(r);
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
                        r = e.getBoundingClientRect(),
                        a = {
                            et: 'CLIENT_IMPRESSION',
                            event_type: 'stats',
                            pos_x: Math.round(r.left),
                            pos_y: Math.round(r.top),
                            browser_width: window.innerWidth,
                            browser_height: window.innerHeight,
                            visible: jt(e),
                            amount: t
                        };
                    a.visible ||
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
                            return new Z.ZalgoPromise(function(t) {
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
                            (a.adblock = n),
                                (a.blocked = (function(e) {
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
                                i(a, e.hasAttribute('data-pp-message-hidden')),
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
                                  I()(n, '@')
                                      ? (e.breakpoint = n.slice(1))
                                      : I()(n, '[') && (e.width = n.slice(1, -1).split(',')),
                                  e
                              );
                          },
                          { ratio: t }
                      )
                    : {};
            }
            var Yt = N(function(e, n) {
                    var t = n.wrapper,
                        o = n.options,
                        i = n.logger;
                    if ('IFRAME' === e.tagName) {
                        var r,
                            a,
                            s = B(o, 'style.layout'),
                            l = B(o, 'style.ratio');
                        if (('flex' !== s && 'custom' !== s) || !l) {
                            e.setAttribute('style', 'width: ' + ('custom' !== s ? 0 : '`100%') + '; border: none;'),
                                e.setAttribute('height', 0),
                                t.removeAttribute('class');
                            var c = (function(e) {
                                    var n = document.createElement('div');
                                    n.setAttribute('style', 'width: 100%; overflow: hidden');
                                    var t = document.createElement('div');
                                    t.setAttribute('style', 'width: 10000px'),
                                        n.appendChild(t),
                                        e.parentNode.appendChild(n);
                                    var o = n.offsetWidth;
                                    return e.parentNode.removeChild(n), o;
                                })(t),
                                u =
                                    'custom' !== s && null !== e.offsetParent
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
                                              return xe()(t.getPropertyValue('display'), 'flex')
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
                                d = function() {
                                    e.setAttribute('style', 'width: 100%; border: none; min-width: ' + u + 'px;'),
                                        requestAnimationFrame(function() {
                                            return requestAnimationFrame(function() {
                                                e.setAttribute(
                                                    'height',
                                                    e.contentWindow.document.documentElement.scrollHeight
                                                );
                                            });
                                        });
                                };
                            if (c < u && 'custom' !== s) {
                                if ('top' !== B(o, 'style.logo.position') || 'primary' !== B(o, 'style.logo.type'))
                                    throw (i.warn(
                                        'Message Overflow. PayPal Credit Message of layout type ' +
                                            B(o, 'style.layout') +
                                            ' requires a width of at least ' +
                                            u +
                                            'px. Current container is ' +
                                            c +
                                            'px. Attempting fallback message.'
                                    ),
                                    (r = function() {
                                        t.parentNode.setAttribute('data-pp-style-layout', 'text'),
                                            t.parentNode.setAttribute('data-pp-style-logo-type', 'primary'),
                                            t.parentNode.setAttribute('data-pp-style-logo-position', 'top');
                                    }),
                                    ((a = new Error(ee.MESSAGE_OVERFLOW)).onEnd = r),
                                    a);
                                i.error({ name: ee.MESSAGE_HIDDEN }),
                                    i.warn(
                                        'Message hidden. PayPal Credit Message fallback requires minimum width of ' +
                                            u +
                                            'px. Current container is ' +
                                            c +
                                            'px. Message hidden.'
                                    ),
                                    e.setAttribute('data-pp-message-hidden', 'true');
                            } else d(), he(e).on('resize', d);
                        } else
                            !(function(e, n, t) {
                                var o = [];
                                'flex' === t
                                    ? (o = Ht[n])
                                    : Array.isArray(n)
                                    ? (o = n.map(Dt))
                                    : 'string' == typeof n && (o = [Dt(n)]);
                                var i = 'pp-flex--' + o.slice(-1)[0].ratio,
                                    r = o.reduce(function(e, n) {
                                        var t = n.breakpoint,
                                            o = n.ratio,
                                            r = n.width;
                                        return '' === e
                                            ? '\n                .' +
                                                  i +
                                                  ' {\n                    display: block;\n                    width: 100%;\n                    ' +
                                                  (Array.isArray(r)
                                                      ? '\n                                min-width: ' +
                                                        Bt(r[0]) +
                                                        ';\n                                max-width: ' +
                                                        Bt(r[1]) +
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
                                              (Array.isArray(r)
                                                  ? '\n                            .' +
                                                    i +
                                                    ' {\n                                min-width: ' +
                                                    Bt(r[0]) +
                                                    ';\n                                max-width: ' +
                                                    Bt(r[1]) +
                                                    ';\n                            }'
                                                  : '') +
                                              '\n                .' +
                                              i +
                                              '::before {\n                    padding-top: ' +
                                              Bt(o) +
                                              ';\n                }\n            }\n        '
                                            : e;
                                    }, ''),
                                    a = document.createElement('style');
                                (a.textContent = r), e.setAttribute('class', i), e.appendChild(a);
                            })(t, l, s),
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
            function Ut(e) {
                var n = document.createElement(e);
                'iframe' === e &&
                    (n.setAttribute('title', 'PayPal Credit Promotion Message'),
                    n.setAttribute('style', 'width: 0; border: none;'),
                    n.setAttribute('src', 'about:blank'),
                    n.setAttribute('height', 0));
                var t = P()({ insertMarkup: kt, setSize: Yt, runStats: Wt, postMessage: Gt, events: he }).reduce(
                    function(e, t) {
                        var o;
                        return i({}, e, (((o = {})[t[0]] = (0, t[1])(n)), o));
                    },
                    {}
                );
                return (
                    (t.clearEvents = function() {
                        return (function(e) {
                            ce()(ue).forEach(function(n) {
                                return n.delete(e);
                            }),
                                0 === ue.scroll.size && window.removeEventListener('scroll', fe),
                                0 === ue.hover.size && document.removeEventListener('mouseover', pe),
                                0 === ue.message.size && window.removeEventListener('message', de),
                                'IFRAME' === e.tagName
                                    ? (e.contentWindow.removeEventListener('resize', me),
                                      e.contentWindow.removeEventListener('click', ge))
                                    : e.removeEventListener('click', ge);
                        })(n);
                    }),
                    [n, t]
                );
            }
            var Ft = t(22),
                Vt = t.n(Ft),
                Zt = {
                    ANY: 'ANY',
                    STRING: 'STRING',
                    BOOLEAN: 'BOOLEAN',
                    NUMBER: 'NUMBER',
                    FUNCTION: 'FUNCTION',
                    OBJECT: 'OBJECT'
                },
                Kt = { id: [Zt.STRING], _legacy: [Zt.BOOLEAN], onRender: [Zt.FUNCTION] },
                Jt = {
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
                qt = function(e, n, t) {
                    return e.warn('Invalid option value (' + n + '). ' + t);
                },
                $t = function(e, n, t, o) {
                    return qt(e, n, 'Expected type "' + t.toLowerCase() + '" but instead received "' + typeof o + '".');
                },
                Qt = function(e, n, t, o) {
                    return qt(
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
                        return 'number' == typeof n && !Vt()(n);
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
            function eo(e, n, t, o) {
                return (
                    void 0 === o && (o = 'style.'),
                    P()(n).reduce(function(r, a) {
                        var s,
                            l = a[0],
                            c = a[1];
                        if (Array.isArray(c)) {
                            var u,
                                d = (function(e, n, t, o) {
                                    var i = n[0],
                                        r = n[1],
                                        a = void 0 === r ? [] : r;
                                    if (void 0 === t) return a[0];
                                    if (Xt(i, t)) {
                                        if (i === Zt.STRING && a.length > 0) {
                                            var s = $()(a, function(e) {
                                                return e.split('|').some(function(e) {
                                                    return e === t;
                                                });
                                            });
                                            return void 0 === s
                                                ? (Qt(e, o, a, t), a[0].split('|')[0])
                                                : s.split('|')[0];
                                        }
                                        return t;
                                    }
                                    return $t(e, o, i, t), a[0];
                                })(e, c, t[l], '' + o + l);
                            return void 0 === d ? r : i({}, r, (((u = {})[l] = d), u));
                        }
                        return i({}, r, (((s = {})[l] = eo(e, n[l], t[l] || {}, '' + o + l + '.')), s));
                    }, {})
                );
            }
            function no(e, n) {
                return i({ layout: n.layout }, eo(e, Jt[n.layout], n));
            }
            var to = N(function(e, n) {
                    var t = n.account,
                        o = n.amount,
                        i = n.countryCode,
                        a = n.style,
                        s = r(n, ['account', 'amount', 'countryCode', 'style']),
                        l = eo(e, Kt, s, '');
                    if (
                        (Xt(Zt.STRING, t)
                            ? 13 === t.length || 10 === t.length || I()(t, 'client-id:')
                                ? (l.account = t)
                                : qt(e, 'account', 'Ensure the correct Merchant Account ID has been entered.')
                            : $t(e, 'account', Zt.STRING, t),
                        void 0 !== o)
                    ) {
                        var c = Number(o);
                        Xt(Zt.NUMBER, c)
                            ? c < 0
                                ? qt(e, 'amount', 'Ensure value is a positive number.')
                                : (l.amount = c)
                            : $t(e, 'amount', Zt.NUMBER, o);
                    }
                    return (
                        void 0 !== i &&
                            (Xt(Zt.STRING, i)
                                ? 2 !== i.length
                                    ? qt(e, 'countryCode', 'Country code should be 2 characters.')
                                    : (l.countryCode = i)
                                : $t(e, 'countryCode', Zt.STRING, i)),
                        Xt(Zt.OBJECT, a) && Xt(Zt.STRING, a.layout) && Jt[a.layout]
                            ? (l.style = no(e, a))
                            : (Xt(Zt.OBJECT, a)
                                  ? Qt(e, 'style.layout', Object.keys(Jt), a.layout)
                                  : void 0 !== a && $t(e, 'style', Zt.OBJECT, a),
                              (l.style = no(e, { layout: 'text' }))),
                        e.info(X.VALIDATE, { options: W(l) }),
                        l
                    );
                }),
                oo = L(
                    function(e) {
                        var n = e.offerType;
                        return new Z.ZalgoPromise(function(e, t) {
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
                                            (I()(e, 'NI') ? 'ni' : 'ezp') +
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
                io = L(
                    function(e) {
                        return new Z.ZalgoPromise(function(n) {
                            var t,
                                o,
                                i,
                                r,
                                a = new XMLHttpRequest();
                            (a.onreadystatechange = function() {
                                if (4 === a.readyState)
                                    switch (a.status) {
                                        case 200:
                                            n(JSON.parse(a.responseText));
                                            break;
                                        default:
                                            n({ error: !0 });
                                    }
                            }),
                                a.open(
                                    'GET',
                                    ((o = (t = e).account),
                                    (i = t.amount),
                                    (r = ['json=true', I()(o, 'client-id') ? 'cid=' + o.slice(10) : 'mid=' + o]).push(
                                        'country=US'
                                    ),
                                    r.push('currency=USD'),
                                    i && r.push('amount=' + i),
                                    'https://www.paypal.com/ppcredit/finance/terms?' + r.join('&')),
                                    !0
                                ),
                                a.send();
                        });
                    },
                    ['account', 'amount']
                ),
                ro = function(e, n) {
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
                ao = function(e) {
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
                    o = e.contentDocument.getElementById('modal__overlay'),
                    r = e.contentDocument.getElementById('close-btn'),
                    a = e.contentDocument.getElementById('header'),
                    s = e.contentDocument.getElementsByClassName('accordion'),
                    l = e.contentDocument.getElementById('modal-container'),
                    c = e.contentDocument.getElementsByClassName('modal__header-container')[0];
                return i(
                    {
                        window: e.contentWindow,
                        contentWrapper: t,
                        overlay: o,
                        closeButton: r,
                        header: a,
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
            var lo = L(
                    function(e) {
                        var n = window.top.document.createElement('div');
                        n.setAttribute('data-pp-id', F.nextId);
                        var t = Ut('iframe'),
                            o = t[0],
                            r = t[1].insertMarkup,
                            a = (function() {
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
                            s = a[0],
                            l = a[1],
                            c = e.track,
                            u = e.clickUrl,
                            d = j({ status: 'CLOSED' }),
                            m = d[0],
                            f = d[1],
                            p = ne.create({
                                id: F.nextId,
                                account: e.account,
                                selector: '__internal__',
                                type: 'Modal'
                            });
                        function g() {
                            return I()(e.offerType, 'NI') ? 'NI' : 'EZP';
                        }
                        V({ nextId: (F.nextId += 1) });
                        var h = function(e, n) {
                            return c({
                                et: 'modal-open' === e ? 'CLIENT_IMPRESSION' : 'CLICK',
                                link: n,
                                modal: g(),
                                event_type: e
                            });
                        };
                        function y() {
                            R()(m.elements.accordions).forEach(function(e) {
                                e.classList.remove('show'),
                                    e
                                        .getElementsByClassName('accordion-content')[0]
                                        .style.setProperty('max-height', null);
                            });
                        }
                        function _(e) {
                            var n = {
                                    'NI Tab': [m.elements.niTab, m.elements.niContent],
                                    'EZP Tab': [m.elements.ezpTab, m.elements.ezpContent]
                                },
                                t = n[e][0];
                            ce()(n).forEach(function(e) {
                                var n = e[0],
                                    o = e[1];
                                n.classList.toggle('selected', n === t), o.classList.toggle('show', n === t);
                            }),
                                h('modal-tab', e),
                                y();
                        }
                        function w() {
                            return m.error ? E(!0) : m.modalProm;
                        }
                        function x(e) {
                            return new Z.ZalgoPromise(function(t, i) {
                                'OPEN' === m.status || 'OPENING' === m.status
                                    ? (f({ status: 'CLOSING' }),
                                      m.elements.modalContainer.classList.remove('show'),
                                      setTimeout(function() {
                                          (n.style.display = 'none'),
                                              o.blur(),
                                              f({ status: 'CLOSED' }),
                                              l(),
                                              'EZP' === g() &&
                                                  setTimeout(function() {
                                                      _('EZP Tab');
                                                  }, 350),
                                              t();
                                      }, e || 0))
                                    : i();
                            });
                        }
                        function v(e) {
                            x(350), h('modal-close', e);
                        }
                        function b(n) {
                            var t = +n;
                            return (
                                Vt()(t) || (m.elements.amountInput.value = t.toFixed(2)),
                                m.elements.loader.style.setProperty('opacity', 1),
                                m.elements.financeTermsTable.style.setProperty('opacity', 0.4),
                                io(i({}, e, { amount: n })).then(function(e) {
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
                                                                return ro(e, n);
                                                            })
                                                            .join('')
                                                      : '') +
                                                  '\n            </tbody>\n        </table>\n        ' +
                                                  (e.options && 0 !== e.options.length && 'N/A' !== e.options
                                                      ? ''
                                                      : ao(e)) +
                                                  '\n        <p id="terms-note">The monthly payment shown is an estimated amount and may not include taxes and shipping</p>\n    ';
                                        })(e));
                                })
                            );
                        }
                        function E(n) {
                            return (
                                void 0 === n && (n = !1),
                                p.start({
                                    options: {
                                        account: e.account,
                                        offerType: e.offerType,
                                        amount: e.amount,
                                        message_id: e.id
                                    }
                                }),
                                oo(e, n)
                                    .then(r)
                                    .then(function() {
                                        f({ elements: so(o, g()) }),
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
                                                    'EZP' === g())
                                                ) {
                                                    m.elements.niTab.addEventListener('click', function() {
                                                        return _('NI Tab');
                                                    }),
                                                        m.elements.ezpTab.addEventListener('click', function() {
                                                            return _('EZP Tab');
                                                        });
                                                    var n = function() {
                                                        b(m.elements.amountInput.value);
                                                    };
                                                    m.elements.amountInput.addEventListener('keydown', function(e) {
                                                        var t = e.key,
                                                            o = e.target;
                                                        if (t.length > 1 || e.metaKey || e.ctrlKey)
                                                            'Enter' === t && n();
                                                        else {
                                                            var i = o.value,
                                                                r = o.selectionStart,
                                                                a = i ? '' + i.slice(0, r) + t + i.slice(r) : t;
                                                            (function(e) {
                                                                if (Vt()(Number(e))) return !1;
                                                                var n = e.split('.'),
                                                                    t = n[0],
                                                                    o = n[1];
                                                                return (
                                                                    (void 0 === t ? '' : t).length <= 5 &&
                                                                    (void 0 === o ? '' : o).length <= 2
                                                                );
                                                            })(a) && ((o.value = a), o.setSelectionRange(r + 1, r + 1)),
                                                                e.preventDefault();
                                                        }
                                                    }),
                                                        m.elements.calculateButton.addEventListener('click', n);
                                                }
                                            })();
                                    })
                                    .catch(function() {
                                        p.error({ name: ee.MODAL_FAIL }), f({ error: !0 });
                                    })
                                    .then(function() {
                                        return p.end();
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
                            f({ modalProm: E() }),
                            'EZP' === g() &&
                                w().then(function() {
                                    return b(e.amount);
                                }),
                            {
                                open: function(e) {
                                    e.preventDefault(),
                                        ('CLOSED' !== m.status && 'CLOSING' !== m.status) ||
                                            (f({ status: 'OPENING' }),
                                            w().then(function() {
                                                if (m.error)
                                                    return f({ status: 'CLOSED' }), void window.open(u, '_blank');
                                                (n.style.display = 'block'),
                                                    requestAnimationFrame(function() {
                                                        return requestAnimationFrame(function() {
                                                            y(),
                                                                o.contentWindow.focus(),
                                                                f({ status: 'OPEN' }),
                                                                s(),
                                                                m.elements.modalContainer.classList.add('show'),
                                                                h('modal-open');
                                                        });
                                                    });
                                            }));
                                },
                                close: x
                            }
                        );
                    },
                    ['account', 'amount', 'offerType']
                ),
                co = {
                    init: function(e) {
                        var n = e.options,
                            t = e.meta,
                            o = e.events,
                            r = e.track;
                        if (n._legacy && I()(t.offerType, 'NI'))
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
                            var a = lo(i({}, n, {}, t, { track: r }));
                            o.on('click', a.open);
                        }
                    }
                },
                uo = new Map(),
                mo = new Map();
            function fo(e) {
                var n = (e.meta && e.meta.offerType) + '::' + e.options.style._flattened.sort().join('::'),
                    t = e.meta;
                return {
                    track: e.logger.track({
                        uuid: n,
                        urls: { DEFAULT: t.clickUrl, MORS_IMPRESSION: t.impressionUrl + '&idx=' + e.options.id }
                    })
                };
            }
            var po = N(function(e, n) {
                    var t;
                    return ((t = {})[e] = n), t;
                }),
                go = N(function(e, n) {
                    return i({}, n, {}, e(n));
                }),
                ho = N(function(e, n) {
                    return e(n).then(function(e) {
                        return i({}, n, {}, e);
                    });
                }),
                yo = function(e) {
                    var n = e.options.onRender;
                    n && n();
                },
                _o = {
                    init: function(e, n, t) {
                        mo.has(e) ||
                            mo.set(e, ne.create({ id: t.id, account: t.account, selector: n, type: 'Message' }));
                        var o,
                            r = mo.get(e);
                        if ((r.start({ options: t }), uo.has(e))) o = uo.get(e).update(t);
                        else {
                            var a = (function(e, n, t) {
                                t.info(X.CREATE);
                                var o = j(e),
                                    r = o[0],
                                    a = o[1],
                                    s = r._legacy,
                                    l = Ut(s ? 'div' : 'iframe'),
                                    c = l[0],
                                    u = l[1],
                                    d = u.insertMarkup,
                                    m = u.setSize,
                                    f = u.events,
                                    p = u.runStats,
                                    g = u.clearEvents,
                                    h = s ? c : document.createElement('span');
                                h !== c && h.appendChild(c);
                                var y = N(function(e, n, o) {
                                    return t.info(n), e(o);
                                });
                                function _(e) {
                                    return (
                                        t.info(X.RENDER_START),
                                        k(to(t), M(a), po('options'), C(b.a, { logger: t }), ho(se))(e)
                                            .then(ho(y(d, X.INSERT)))
                                            .then(
                                                k(
                                                    C(b.a, { wrapper: h, events: f }),
                                                    go(fo),
                                                    M(y(co.init, X.MODAL)),
                                                    M(y(m, X.SIZE)),
                                                    M(y(p, X.STATS)),
                                                    y(yo, X.RENDER_END)
                                                )
                                            )
                                    );
                                }
                                return (
                                    n.appendChild(h),
                                    t.info(X.CONTAINER),
                                    {
                                        renderProm: _(r),
                                        wrapper: h,
                                        container: c,
                                        update: function(e) {
                                            var n = H(r, e),
                                                o = (function e(n, t) {
                                                    return P()(t).reduce(function(t, o) {
                                                        var r,
                                                            a,
                                                            s = o[0],
                                                            l = o[1];
                                                        if (!n[s] && n[s] !== l)
                                                            return i({}, t, (((r = {})[s] = l), r));
                                                        if ('object' != typeof l || null === l)
                                                            return l !== n[s] ? i({}, t, (((a = {})[s] = l), a)) : t;
                                                        if (Array.isArray(l)) {
                                                            var c;
                                                            if (Array.isArray(n[s])) {
                                                                var u,
                                                                    d = l.filter(function(e) {
                                                                        return !T()(n[s], e);
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
                                                })(r, n),
                                                a = Object.keys(o).length > 0;
                                            return (
                                                t.info(X.UPDATE, { willUpdate: a }),
                                                a ? (g(), _(n)) : Z.ZalgoPromise.resolve()
                                            );
                                        }
                                    }
                                );
                            })(t, e, r);
                            uo.set(e, a), (o = a.renderProm);
                        }
                        return o.then(r.end).catch(function(e) {
                            r.error({ name: e.message }), r.end(), 'function' == typeof e.onEnd && e.onEnd();
                        });
                    }
                };
            function wo(e, n) {
                var t, o;
                if ((void 0 === n && (n = '[data-pp-message]'), 'string' == typeof n))
                    (t = R()(document.querySelectorAll(n))), (o = n);
                else if (Y(n)) (t = [n]), (o = 'HTMLElement');
                else {
                    if (!Array.isArray(n) || !n.every(Y)) return ne.warn('Invalid selector', n);
                    (t = [].concat(n)), (o = 'Array<HTMLElement>');
                }
                return (
                    (t = t.filter(function(n) {
                        return n.ownerDocument.body.contains(n)
                            ? !e._auto || !n.hasAttribute('data-pp-id')
                            : (ne.warn('Skipping container. Must be in the document:', n), !1);
                    })),
                    Z.ZalgoPromise.all(
                        t.map(function(n) {
                            var t = H(e, G(n));
                            return (
                                n.hasAttribute('data-pp-id') ||
                                    (n.setAttribute('data-pp-id', F.nextId), V({ nextId: (F.nextId += 1) })),
                                new MutationObserver(function(e) {
                                    var t = e.reduce(function(e, n) {
                                        return I()(n.attributeName, 'data-pp-')
                                            ? i(
                                                  {},
                                                  e,
                                                  {},
                                                  D(n.attributeName.slice(8), n.target.getAttribute(n.attributeName))
                                              )
                                            : e;
                                    }, {});
                                    _o.init(n, o, t);
                                }).observe(n, { attributes: !0 }),
                                (t.id = n.getAttribute('data-pp-id')),
                                _o.init(n, o, t)
                            );
                        })
                    )
                );
            }
            var xo = function(e) {
                return {
                    render: function(n) {
                        return wo(i({}, F.config, {}, e), n);
                    }
                };
            };
            b()(xo, {
                render: function(e, n) {
                    return void 0 === e && (e = {}), wo(i({}, F.config, {}, e), n);
                },
                setGlobalConfig: function(e) {
                    return void 0 === e && (e = {}), V({ config: i({}, F.config, {}, e) });
                }
            });
            var vo,
                bo = xo;
            t.d(n, 'Messages', function() {
                return bo;
            }),
                (vo = document.currentScript || document.querySelector('script[src$="messaging.js"]')) &&
                    bo.setGlobalConfig(G(vo)),
                (window.paypal.Message = bo),
                F.config.account &&
                    ('loading' === document.readyState
                        ? window.addEventListener('DOMContentLoaded', function() {
                              return bo.render({ _auto: !0 });
                          })
                        : bo.render({ _auto: !0 }));
        }
    ]).Messages);
//# sourceMappingURL=messaging.js.map
