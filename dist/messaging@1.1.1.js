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
            e.exports = t(131);
        },
        function(e, n, t) {
            e.exports = t(101);
        },
        function(e, n, t) {
            e.exports = t(136);
        },
        function(e, n, t) {
            'use strict';
            var o = t(9),
                i = t(109).f,
                a = t(110),
                r = t(17),
                s = t(39),
                l = t(12),
                c = t(16),
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
                    p,
                    g,
                    f,
                    h,
                    y,
                    _ = e.target,
                    x = e.global,
                    w = e.stat,
                    v = e.proto,
                    b = x ? o : w ? o[_] : (o[_] || {}).prototype,
                    E = x ? r : r[_] || (r[_] = {}),
                    P = E.prototype;
                for (m in n)
                    (t = !a(x ? m : _ + (w ? '.' : '#') + m, e.forced) && b && c(b, m)),
                        (g = E[m]),
                        t && (f = e.noTargetGet ? (y = i(b, m)) && y.value : b[m]),
                        (p = t && f ? f : n[m]),
                        (t && typeof g == typeof p) ||
                            ((h =
                                e.bind && t
                                    ? s(p, o)
                                    : e.wrap && t
                                    ? u(p)
                                    : v && 'function' == typeof p
                                    ? s(Function.call, p)
                                    : p),
                            (e.sham || (p && p.sham) || (g && g.sham)) && l(h, 'sham', !0),
                            (E[m] = h),
                            v &&
                                (c(r, (d = _ + 'Prototype')) || l(r, d, {}),
                                (r[d][m] = p),
                                e.real && P && !P[m] && l(P, m, p)));
            };
        },
        function(e, n, t) {
            var o = t(9),
                i = t(32),
                a = t(48),
                r = t(114),
                s = o.Symbol,
                l = i('wks');
            e.exports = function(e) {
                return l[e] || (l[e] = (r && s[e]) || (r ? s : a)('Symbol.' + e));
            };
        },
        function(e, n, t) {
            e.exports = t(149);
        },
        function(e, n, t) {
            e.exports = t(138);
        },
        function(e, n) {
            e.exports = function(e) {
                if (null == e) throw TypeError("Can't call method on " + e);
                return e;
            };
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
            e.exports = t(134);
        },
        function(e, n, t) {
            var o = t(13),
                i = t(24),
                a = t(25);
            e.exports = o
                ? function(e, n, t) {
                      return i.f(e, n, a(1, t));
                  }
                : function(e, n, t) {
                      return (e[n] = t), e;
                  };
        },
        function(e, n, t) {
            var o = t(14);
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
            var o = t(23),
                i = Math.min;
            e.exports = function(e) {
                return e > 0 ? i(o(e), 9007199254740991) : 0;
            };
        },
        function(e, n, t) {
            e.exports = t(41);
        },
        function(e, n, t) {
            var o = t(15);
            e.exports = function(e) {
                if (!o(e)) throw TypeError(String(e) + ' is not an object');
                return e;
            };
        },
        function(e, n, t) {
            e.exports = t(158);
        },
        function(e, n, t) {
            e.exports = t(160);
        },
        function(e, n) {
            var t = Math.ceil,
                o = Math.floor;
            e.exports = function(e) {
                return isNaN((e = +e)) ? 0 : (e > 0 ? o : t)(e);
            };
        },
        function(e, n, t) {
            var o = t(13),
                i = t(46),
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
        function(e, n) {
            e.exports = function(e, n) {
                return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: n };
            };
        },
        function(e, n, t) {
            var o = t(38),
                i = t(8);
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
            var o = t(8);
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
            var o = t(9),
                i = t(107),
                a = t(34),
                r = o['__core-js_shared__'] || i('__core-js_shared__', {});
            (e.exports = function(e, n) {
                return r[e] || (r[e] = void 0 !== n ? n : {});
            })('versions', []).push({
                version: '3.2.1',
                mode: a ? 'pure' : 'global',
                copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
            });
        },
        function(e, n, t) {
            var o = t(15);
            e.exports = function(e, n) {
                if (!o(e)) return e;
                var t, i;
                if (n && 'function' == typeof (t = e.toString) && !o((i = t.call(e)))) return i;
                if ('function' == typeof (t = e.valueOf) && !o((i = t.call(e)))) return i;
                if (!n && 'function' == typeof (t = e.toString) && !o((i = t.call(e)))) return i;
                throw TypeError("Can't convert object to primitive value");
            };
        },
        function(e, n) {
            e.exports = !0;
        },
        function(e, n, t) {
            var o = t(32),
                i = t(48),
                a = o('keys');
            e.exports = function(e) {
                return a[e] || (a[e] = i(e));
            };
        },
        function(e, n) {
            e.exports = {};
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
            var o = t(14),
                i = t(27),
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
            var o = t(111);
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
            var o = t(117),
                i = t(52);
            e.exports =
                Object.keys ||
                function(e) {
                    return o(e, i);
                };
        },
        function(e, n, t) {
            var o = t(17),
                i = t(9),
                a = function(e) {
                    return 'function' == typeof e ? e : void 0;
                };
            e.exports = function(e, n) {
                return arguments.length < 2 ? a(o[e]) || a(i[e]) : (o[e] && o[e][n]) || (i[e] && i[e][n]);
            };
        },
        function(e, n, t) {
            var o = t(133);
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
            var o = t(13),
                i = t(14),
                a = t(47);
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
            var o = t(9),
                i = t(15),
                a = o.document,
                r = i(a) && i(a.createElement);
            e.exports = function(e) {
                return r ? a.createElement(e) : {};
            };
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
                r = t(50),
                s = t(12),
                l = t(16),
                c = t(5),
                u = t(34),
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
            var o = t(16),
                i = t(28),
                a = t(35),
                r = t(113),
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
            var o = t(26),
                i = t(18),
                a = t(118),
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
            var o = t(24).f,
                i = t(12),
                a = t(16),
                r = t(120),
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
            var o = t(27),
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
            var o = t(13),
                i = t(40),
                a = t(26),
                r = t(37).f,
                s = function(e) {
                    return function(n) {
                        for (var t, s = a(n), l = i(s), c = l.length, u = 0, d = []; c > u; )
                            (t = l[u++]), (o && !r.call(s, t)) || d.push(e ? [t, s[t]] : s[t]);
                        return d;
                    };
                };
            e.exports = { entries: s(!0), values: s(!1) };
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
            t(102), t(124);
            var o = t(17);
            e.exports = o.Array.from;
        },
        function(e, n, t) {
            'use strict';
            var o = t(103).charAt,
                i = t(104),
                a = t(108),
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
            var o = t(23),
                i = t(8),
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
                r = t(105),
                s = t(9),
                l = t(15),
                c = t(12),
                u = t(16),
                d = t(35),
                m = t(36);
            if (r) {
                var p = new (0, s.WeakMap)(),
                    g = p.get,
                    f = p.has,
                    h = p.set;
                (o = function(e, n) {
                    return h.call(p, e, n), n;
                }),
                    (i = function(e) {
                        return g.call(p, e) || {};
                    }),
                    (a = function(e) {
                        return f.call(p, e);
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
            var o = t(9),
                i = t(106),
                a = o.WeakMap;
            e.exports = 'function' == typeof a && /native code/.test(i.call(a));
        },
        function(e, n, t) {
            var o = t(32);
            e.exports = o('native-function-to-string', Function.toString);
        },
        function(e, n, t) {
            var o = t(9),
                i = t(12);
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
                i = t(112),
                a = t(50),
                r = t(121),
                s = t(53),
                l = t(12),
                c = t(123),
                u = t(5),
                d = t(34),
                m = t(29),
                p = t(49),
                g = p.IteratorPrototype,
                f = p.BUGGY_SAFARI_ITERATORS,
                h = u('iterator'),
                y = function() {
                    return this;
                };
            e.exports = function(e, n, t, u, p, _, x) {
                i(t, n, u);
                var w,
                    v,
                    b,
                    E = function(e) {
                        if (e === p && T) return T;
                        if (!f && e in R) return R[e];
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
                    O = R[h] || R['@@iterator'] || (p && R[p]),
                    T = (!f && O) || E(p),
                    I = ('Array' == n && R.entries) || O;
                if (
                    (I &&
                        ((w = a(I.call(new e()))),
                        g !== Object.prototype &&
                            w.next &&
                            (d || a(w) === g || (r ? r(w, g) : 'function' != typeof w[h] && l(w, h, y)),
                            s(w, P, !0, !0),
                            d && (m[P] = y))),
                    'values' == p &&
                        O &&
                        'values' !== O.name &&
                        ((A = !0),
                        (T = function() {
                            return O.call(this);
                        })),
                    (d && !x) || R[h] === T || l(R, h, T),
                    (m[n] = T),
                    p)
                )
                    if (((v = { values: E('values'), keys: _ ? T : E('keys'), entries: E('entries') }), x))
                        for (b in v) (!f && !A && b in R) || c(R, b, v[b]);
                    else o({ target: n, proto: !0, forced: f || A }, v);
                return v;
            };
        },
        function(e, n, t) {
            var o = t(13),
                i = t(37),
                a = t(25),
                r = t(26),
                s = t(33),
                l = t(16),
                c = t(46),
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
            var o = t(14),
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
            var o = t(49).IteratorPrototype,
                i = t(115),
                a = t(25),
                r = t(53),
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
            var o = t(14);
            e.exports = !o(function() {
                function e() {}
                return (e.prototype.constructor = null), Object.getPrototypeOf(new e()) !== e.prototype;
            });
        },
        function(e, n, t) {
            var o = t(14);
            e.exports =
                !!Object.getOwnPropertySymbols &&
                !o(function() {
                    return !String(Symbol());
                });
        },
        function(e, n, t) {
            var o = t(20),
                i = t(116),
                a = t(52),
                r = t(36),
                s = t(119),
                l = t(47),
                c = t(35)('IE_PROTO'),
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
            var o = t(13),
                i = t(24),
                a = t(20),
                r = t(40);
            e.exports = o
                ? Object.defineProperties
                : function(e, n) {
                      a(e);
                      for (var t, o = r(n), s = o.length, l = 0; s > l; ) i.f(e, (t = o[l++]), n[t]);
                      return e;
                  };
        },
        function(e, n, t) {
            var o = t(16),
                i = t(26),
                a = t(51).indexOf,
                r = t(36);
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
            var o = t(23),
                i = Math.max,
                a = Math.min;
            e.exports = function(e, n) {
                var t = o(e);
                return t < 0 ? i(t + n, 0) : a(t, n);
            };
        },
        function(e, n, t) {
            var o = t(41);
            e.exports = o('document', 'documentElement');
        },
        function(e, n, t) {
            'use strict';
            var o = t(54),
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
                i = t(122);
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
            var o = t(15);
            e.exports = function(e) {
                if (!o(e) && null !== e) throw TypeError("Can't set " + String(e) + ' as a prototype');
                return e;
            };
        },
        function(e, n, t) {
            var o = t(12);
            e.exports = function(e, n, t, i) {
                i && i.enumerable ? (e[n] = t) : o(e, n, t);
            };
        },
        function(e, n, t) {
            var o = t(4),
                i = t(125);
            o(
                {
                    target: 'Array',
                    stat: !0,
                    forced: !t(130)(function(e) {
                        Array.from(e);
                    })
                },
                { from: i }
            );
        },
        function(e, n, t) {
            'use strict';
            var o = t(39),
                i = t(28),
                a = t(126),
                r = t(127),
                s = t(18),
                l = t(128),
                c = t(129);
            e.exports = function(e) {
                var n,
                    t,
                    u,
                    d,
                    m = i(e),
                    p = 'function' == typeof this ? this : Array,
                    g = arguments.length,
                    f = g > 1 ? arguments[1] : void 0,
                    h = void 0 !== f,
                    y = 0,
                    _ = c(m);
                if ((h && (f = o(f, g > 2 ? arguments[2] : void 0, 2)), null == _ || (p == Array && r(_))))
                    for (t = new p((n = s(m.length))); n > y; y++) l(t, y, h ? f(m[y], y) : m[y]);
                else
                    for (d = _.call(m), t = new p(); !(u = d.next()).done; y++)
                        l(t, y, h ? a(d, f, [u.value, y], !0) : u.value);
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
                i = t(24),
                a = t(25);
            e.exports = function(e, n, t) {
                var r = o(n);
                r in e ? i.f(e, r, a(0, t)) : (e[r] = t);
            };
        },
        function(e, n, t) {
            var o = t(54),
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
            t(132);
            var o = t(19);
            e.exports = o('String', 'startsWith');
        },
        function(e, n, t) {
            'use strict';
            var o = t(4),
                i = t(18),
                a = t(42),
                r = t(8),
                s = t(43),
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
            var o = t(15),
                i = t(27),
                a = t(5)('match');
            e.exports = function(e) {
                var n;
                return o(e) && (void 0 !== (n = e[a]) ? !!n : 'RegExp' == i(e));
            };
        },
        function(e, n, t) {
            t(135);
            var o = t(19);
            e.exports = o('Array', 'includes');
        },
        function(e, n, t) {
            'use strict';
            var o = t(4),
                i = t(51).includes,
                a = t(55);
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
            t(137);
            var o = t(17);
            e.exports = o.Object.entries;
        },
        function(e, n, t) {
            var o = t(4),
                i = t(56).entries;
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
            t(139);
            var o = t(17);
            e.exports = o.Object.assign;
        },
        function(e, n, t) {
            var o = t(4),
                i = t(140);
            o({ target: 'Object', stat: !0, forced: Object.assign !== i }, { assign: i });
        },
        function(e, n, t) {
            'use strict';
            var o = t(13),
                i = t(14),
                a = t(40),
                r = t(141),
                s = t(37),
                l = t(28),
                c = t(38),
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
                                  var p, g = c(arguments[u++]), f = d ? a(g).concat(d(g)) : a(g), h = f.length, y = 0;
                                  h > y;

                              )
                                  (p = f[y++]), (o && !m.call(g, p)) || (t[p] = g[p]);
                          return t;
                      }
                    : u;
        },
        function(e, n) {
            n.f = Object.getOwnPropertySymbols;
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
                a = t(8),
                r = Math.ceil,
                s = function(e) {
                    return function(n, t, s) {
                        var l,
                            c,
                            u = String(a(n)),
                            d = u.length,
                            m = void 0 === s ? ' ' : String(s),
                            p = o(t);
                        return p <= d || '' == m
                            ? u
                            : ((c = i.call(m, r((l = p - d) / m.length))).length > l && (c = c.slice(0, l)),
                              e ? u + c : c + u);
                    };
                };
            e.exports = { start: s(!1), end: s(!0) };
        },
        function(e, n, t) {
            'use strict';
            var o = t(23),
                i = t(8);
            e.exports =
                ''.repeat ||
                function(e) {
                    var n = String(i(this)),
                        t = '',
                        a = o(e);
                    if (a < 0 || a == 1 / 0) throw RangeError('Wrong number of repetitions');
                    for (; a > 0; (a >>>= 1) && (n += n)) 1 & a && (t += n);
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
                a = t(55),
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
            var o = t(39),
                i = t(38),
                a = t(28),
                r = t(18),
                s = t(152),
                l = [].push,
                c = function(e) {
                    var n = 1 == e,
                        t = 2 == e,
                        c = 3 == e,
                        u = 4 == e,
                        d = 6 == e,
                        m = 5 == e || d;
                    return function(p, g, f, h) {
                        for (
                            var y,
                                _,
                                x = a(p),
                                w = i(x),
                                v = o(g, f, 3),
                                b = r(w.length),
                                E = 0,
                                P = h || s,
                                A = n ? P(p, b) : t ? P(p, 0) : void 0;
                            b > E;
                            E++
                        )
                            if ((m || E in w) && ((_ = v((y = w[E]), E, x)), e))
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
            var o = t(15),
                i = t(153),
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
            var o = t(27);
            e.exports =
                Array.isArray ||
                function(e) {
                    return 'Array' == o(e);
                };
        },
        function(e, n, t) {
            t(155);
            var o = t(17);
            e.exports = o.Object.values;
        },
        function(e, n, t) {
            var o = t(4),
                i = t(56).values;
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
                a = t(42),
                r = t(8),
                s = t(43),
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
            t(159);
            var o = t(19);
            e.exports = o('String', 'includes');
        },
        function(e, n, t) {
            'use strict';
            var o = t(4),
                i = t(42),
                a = t(8);
            o(
                { target: 'String', proto: !0, forced: !t(43)('includes') },
                {
                    includes: function(e) {
                        return !!~String(a(this)).indexOf(i(e), arguments.length > 1 ? arguments[1] : void 0);
                    }
                }
            );
        },
        function(e, n, t) {
            t(161);
            var o = t(17);
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
            function i(e, n) {
                if (null == e) return {};
                var t,
                    o,
                    i = {},
                    a = Object.keys(e);
                for (o = 0; o < a.length; o++) n.indexOf((t = a[o])) >= 0 || (i[t] = e[t]);
                return i;
            }
            t.r(n), Object.create(Error.prototype);
            var a = t(2),
                r = t.n(a),
                s = t(1),
                l = t.n(s);
            function c(e) {
                var n = new Map();
                return function() {
                    for (var t = arguments.length, o = new Array(t), i = 0; i < t; i++) o[i] = arguments[i];
                    var a = JSON.stringify(o);
                    return n.has(a) || n.set(a, e.apply(void 0, o)), n.get(a);
                };
            }
            function u(e, n) {
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
            function d(e) {
                for (var n = arguments.length, t = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)
                    t[o - 1] = arguments[o];
                return function() {
                    for (var n = arguments.length, o = new Array(n), i = 0; i < n; i++) o[i] = arguments[i];
                    return e.apply(void 0, t.concat(o));
                };
            }
            function m(e, n) {
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
            function p(e) {
                return function(n) {
                    var t = e(n);
                    return 'object' == typeof t && t.then
                        ? t.then(function() {
                              return n;
                          })
                        : n;
                };
            }
            function g() {
                for (var e = arguments.length, n = new Array(e), t = 0; t < e; t++) n[t] = arguments[t];
                return function(e) {
                    return n.reduce(function(e, n) {
                        return n(e);
                    }, e);
                };
            }
            var f = t(11),
                h = t.n(f),
                y = t(3),
                _ = t.n(y);
            function x(e) {
                return _()(e).reduce(function(e, n) {
                    var t,
                        i,
                        a,
                        r = n[0],
                        s = n[1];
                    return Array.isArray(s)
                        ? o({}, e, (((i = {})[r] = [].concat(s)), i))
                        : o({}, e, 'object' == typeof s ? (((a = {})[r] = x(s)), a) : (((t = {})[r] = s), t));
                }, {});
            }
            function w(e, n) {
                return (function e(n, t) {
                    return _()(t).reduce(function(t, i) {
                        var a,
                            r,
                            s,
                            l,
                            c = i[0],
                            u = i[1];
                        return Array.isArray(u)
                            ? o({}, t, (((r = {})[c] = [].concat(u)), r))
                            : 'object' != typeof u ||
                              null === u ||
                              (n[c] && 'object' == typeof n[c] && !Array.isArray(n[c]))
                            ? o(
                                  {},
                                  t,
                                  'object' == typeof u && null !== u
                                      ? (((l = {})[c] = e(n[c], u)), l)
                                      : (((a = {})[c] = u), a)
                              )
                            : o({}, t, (((s = {})[c] = x(u)), s));
                    }, n);
                })(x(e), n);
            }
            function v(e, n) {
                return n.split('.').reduce(function(e, n) {
                    return 'object' == typeof e || 'function' == typeof e ? e[n] : void 0;
                }, e);
            }
            function b(e, n, t) {
                var o;
                void 0 === t && (t = '-');
                var i,
                    a = e.indexOf(t);
                if (-1 === a) return ((i = {})[e] = n), i;
                var r = e.slice(0, a),
                    s = e.slice(a + 1);
                return ((o = {})[r] = b(s, n)), o;
            }
            function E(e) {
                return 'object' == typeof HTMLElement
                    ? e instanceof HTMLElement
                    : e && 'object' == typeof e && null !== e && 1 === e.nodeType && 'string' == typeof e.nodeName;
            }
            function P(e) {
                var n = r()(e.attributes)
                    .filter(function(e) {
                        var n = e.nodeName;
                        return l()(n, 'data-pp-');
                    })
                    .reduce(function(e, n) {
                        var t = n.nodeValue;
                        return t ? w(e, b(n.nodeName.replace('data-pp-', ''), t)) : e;
                    }, {});
                if (
                    !e.firstElementChild ||
                    'SCRIPT' !== e.firstElementChild.tagName ||
                    'text/template' !== e.firstElementChild.getAttribute('type')
                )
                    return n;
                var t = e.firstElementChild.textContent.trim();
                return e.removeChild(e.firstElementChild), w(n, { style: { markup: t } });
            }
            var A = m(function(e, n, t) {
                    return n.getElementsByClassName(e + '__' + t)[0];
                }),
                R = m(function(e, n) {
                    var t = document.createElement('style');
                    (t.textContent = n), e.insertBefore(t, e.firstChild);
                }),
                O = m(function(e, n) {
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
                T = m(function(e, n) {
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
                I = m(function(e, n, t, o) {
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
                }, 2),
                S = t(7),
                L = t.n(S);
            function C(e) {
                void 0 === e && (e = {});
                var n = o({}, e);
                return [n, d(L.a, n)];
            }
            var N = C(window.__paypal_messages_state__ || { nextId: 1, config: {} }),
                M = N[0],
                z = N[1];
            Object.defineProperty(window, '__paypal_messages_state__', {
                value: M,
                enumerable: !1,
                configurable: !0,
                writable: !1
            });
            var j = t(0),
                k = t(57),
                W = t.n(k),
                H = t(6),
                B = t.n(H),
                Y = m(function(e, n, t) {
                    var i = e.uuid,
                        a = e.urls;
                    void 0 === t && (t = !1);
                    var r = new window.Image();
                    if ('object' == typeof n) {
                        var s = o({}, n, { uuid: t ? i + '::banner.hidden:true' : i }),
                            l = _()(s).reduce(function(e, n) {
                                var t = n[1];
                                return void 0 === t ? e : e + '&' + n[0] + '=' + t;
                            }, '');
                        r.src = (a[n.et] || a.DEFAULT) + '&bdata=' + encodeURIComponent(l.slice(1));
                    } else 'string' == typeof n && (r.src = a[n] || a.DEFAULT);
                }, 2),
                D = {
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
                G = {
                    MESSAGE_OVERFLOW: 'MESSAGE_OVERFLOW',
                    MESSAGE_HIDDEN: 'MESSAGE_HIDDEN',
                    MESSAGE_INVALID_LEGACY: 'MESSAGE_INVALID_LEGACY',
                    MESSAGE_INVALID_MARKUP: 'MESSAGE_INVALID_MARKUP',
                    MODAL_FAIL: 'MODAL_FAIL',
                    CUSTOM_TEMPLATE_FAIL: 'CUSTOM_TEMPLATE_FAIL',
                    CUSTOM_JSON_OPTIONS_FAIL: 'CUSTOM_JSON_OPTIONS_FAIL'
                },
                U = {
                    create: function(e) {
                        var n = e.id,
                            t = e.selector,
                            i = e.type,
                            a = C({ count: 1, account: e.account, history: [], logs: [] }),
                            r = a[0],
                            s = a[1],
                            l = {
                                start: function(e) {
                                    v(e, 'options.account') &&
                                        r.account !== e.options.account &&
                                        s({ account: e.account }),
                                        l.info(D.START, o({ t: new Date().getTime() }, e));
                                },
                                end: function(e) {
                                    l.info(D.END, o({ t: new Date().getTime() }, e)),
                                        (function() {
                                            if (!(r.count > 3)) {
                                                var e,
                                                    a = B()(r.logs, function(e) {
                                                        var n = e.event;
                                                        return 'Create' === n || 'Update' === n;
                                                    }),
                                                    l = {
                                                        version: '1.1.1',
                                                        url: window.location.href,
                                                        selector: t,
                                                        type: i + (a ? '-' + a.event : ''),
                                                        id: n + '-' + W()(r.count, 4, '0'),
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
                                                var u = [].toJSON;
                                                u && delete Array.prototype.toJSON,
                                                    c.send(JSON.stringify({ data: l })),
                                                    u && (Array.prototype.toJSON = u);
                                            }
                                        })();
                                },
                                info: function(e, n) {
                                    void 0 === n && (n = {}), s({ logs: [].concat(r.logs, [o({ event: e }, n)]) });
                                },
                                error: function(e) {
                                    l.info(D.ERROR, e);
                                },
                                track: Y,
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
                F = c(function(e) {
                    var n,
                        t = e.markup;
                    return j.ZalgoPromise.resolve(
                        l()(t, 'https://www.paypalobjects.com')
                            ? ((n = t),
                              new j.ZalgoPromise(function(e) {
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
            var V = { US: 'en_US', GB: 'en_GB', FR: 'fr_FR', DE: 'de_DE' };
            function Z(e) {
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
                    throw new Error(G.MESSAGE_INVALID_MARKUP);
                }
            }
            function J(e, n) {
                var t = n.match(/^<!--([\s\S]+?)-->/);
                if (t)
                    try {
                        return JSON.parse(t[1]);
                    } catch (n) {
                        e.error({ name: G.CUSTOM_JSON_OPTIONS_FAIL });
                    }
                return {};
            }
            var q = u(
                function(e) {
                    var n = e.account,
                        t = e.amount,
                        o = e.countryCode;
                    return new j.ZalgoPromise(function(e) {
                        var i = 'c' + Math.floor(Math.random() * Math.pow(10, 19)),
                            a = {
                                dimensions: 'x200x51',
                                currency_value: t,
                                currency_code: 'USD',
                                format: 'HTML',
                                presentation_types: 'HTML',
                                ch: 'UPSTREAM',
                                call: '__PP.' + i
                            };
                        o && V[o] && ((a.country_code = o), (a.locale = V[o]));
                        var r = _()(a)
                                .filter(function(e) {
                                    return e[1];
                                })
                                .reduce(
                                    function(e, n) {
                                        return e + '&' + n[0] + '=' + n[1];
                                    },
                                    l()(n, 'client-id') ? 'client_id=' + n.slice(10) : 'pub_id=' + n
                                ),
                            s = document.createElement('script');
                        (s.async = !0),
                            (s.src = 'https://www.paypal.com/imadserver/upstream?' + r),
                            document.head.appendChild(s),
                            (window.__PP[i] = function(n) {
                                if ((document.head.removeChild(s), delete window.__PP[i], 'object' == typeof n))
                                    e({ markup: Z(n) });
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
            function K(e) {
                var n = e.options,
                    t = e.logger;
                return (
                    t.info(D.FETCH_START),
                    ('custom' !== v(n, 'style.layout')
                        ? q(n).then(d(L.a, { options: n }))
                        : j.ZalgoPromise.all([q(n), F(n.style)]).then(function(e) {
                              var o = e[0],
                                  i = e[1];
                              return 'object' == typeof o.markup
                                  ? ('' === i && t.error({ name: G.CUSTOM_TEMPLATE_FAIL }),
                                    (o.markup.template = i),
                                    { markup: o.markup, options: w(n, J(t, i)) })
                                  : { markup: o.markup, options: n };
                          })
                    ).then(
                        p(function(e) {
                            t.info(D.FETCH_END),
                                (e.options.style._flattened = (function e(n, t, o) {
                                    return (
                                        void 0 === t && (t = ''),
                                        void 0 === o && (o = ':'),
                                        _()(n).reduce(function(n, i) {
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
                                })(e.options.style));
                        })
                    )
                );
            }
            var $ = t(30),
                Q = t.n($),
                X = { click: new Map(), scroll: new Map(), hover: new Map(), resize: new Map() };
            function ee(e) {
                X.resize.has(e.target.frameElement) && X.resize.get(e.target.frameElement)(e);
            }
            function ne(e) {
                X.scroll.forEach(function(n) {
                    return n(e);
                });
            }
            function te(e) {
                X.hover.has(e.target) && X.hover.get(e.target)(e);
            }
            function oe(e) {
                e.target.ownerDocument && X.click.has(e.target.ownerDocument.defaultView.frameElement)
                    ? X.click.get(e.target.ownerDocument.defaultView.frameElement)(e)
                    : X.click.has(e.currentTarget) && e.currentTarget !== e.target && X.click.get(e.currentTarget)(e);
            }
            function ie(e) {
                return {
                    on: function(n, t) {
                        ('IFRAME' !== e.tagName && 'resize' === n) ||
                            (function(e, n, t) {
                                if (
                                    ((function(e, n) {
                                        'scroll' === e && 0 === X.scroll.size
                                            ? window.addEventListener('scroll', ne)
                                            : 'hover' === e && 0 === X.hover.size
                                            ? document.addEventListener('mouseover', te)
                                            : 'resize' !== e || X[e].has(n)
                                            ? 'click' !== e ||
                                              X[e].has(n) ||
                                              ('IFRAME' === n.tagName
                                                  ? n.contentWindow.document.body.addEventListener('click', oe)
                                                  : n.addEventListener('click', oe))
                                            : n.contentWindow.addEventListener('resize', ee);
                                    })(e, n),
                                    X[e].has(n))
                                ) {
                                    var o = X[e].get(n);
                                    X[e].set(n, function(e) {
                                        o(e), t(e);
                                    });
                                } else X[e].set(n, t);
                            })(n, e, t);
                    },
                    clear: function(n) {
                        X[n].delete(e),
                            'scroll' === n && 0 === X.scroll.size
                                ? window.removeEventListener('scroll', ne)
                                : 'hover' === n && 0 === X.hover.size
                                ? document.removeEventListener('mouseover', te)
                                : 'click' === n
                                ? 'IFRAME' === e.tagName
                                    ? e.contentWindow.document.body.removeEventListener('click', oe)
                                    : e.removeEventListener('click', oe)
                                : 'IFRAME' === e.tagName &&
                                  'resize' === n &&
                                  e.contentWindow.removeEventListener('resize', ee);
                    }
                };
            }
            var ae = t(58),
                re = t.n(ae),
                se = t(21),
                le = t.n(se),
                ce = t(59),
                ue = t.n(ce),
                de = t(60),
                me = t.n(de),
                pe = t(31),
                ge = t.n(pe),
                fe = t(10),
                he = t.n(fe),
                ye = t(61),
                _e = t.n(ye),
                xe = t(62),
                we = t.n(xe),
                ve = t(44),
                be = t.n(ve),
                Ee = t(63),
                Pe = t.n(Ee),
                Ae = t(64),
                Re = t.n(Ae),
                Oe = t(65),
                Te = t.n(Oe),
                Ie = t(66),
                Se = t.n(Ie),
                Le = t(67),
                Ce = t.n(Le),
                Ne = t(68),
                Me = t.n(Ne),
                ze = [
                    ['default', [he.a, ge.a, _e.a].join('\n')],
                    ['logo.type:primary', Se.a],
                    ['logo.type:alternative', we.a],
                    ['logo.type:inline', be.a],
                    ['logo.type:none', [be.a, Pe.a].join('\n')],
                    ['logo.position:right', Re.a],
                    ['logo.position:top', Te.a],
                    ['logo.type:alternative && logo.position:top', Ce.a],
                    ['text.color:white', Me.a]
                ],
                je = t(69),
                ke = t.n(je),
                We = t(70),
                He = t.n(We),
                Be = t(71),
                Ye = t.n(Be),
                De = t(45),
                Ge = t.n(De),
                Ue = t(72),
                Fe = t.n(Ue),
                Ve = t(73),
                Ze = t.n(Ve),
                Je = t(74),
                qe = t.n(Je),
                Ke = t(75),
                $e = t.n(Ke),
                Qe = t(76),
                Xe = t.n(Qe),
                en = t(77),
                nn = t.n(en),
                tn = t(78),
                on = t.n(tn),
                an = t(79),
                rn = t.n(an),
                sn = [
                    ['default', [he.a, ge.a, ke.a].join('\n')],
                    ['ratio:1x1', He.a],
                    ['ratio:1x4', Ye.a],
                    ['ratio:8x1', [Ge.a, Fe.a].join('\n')],
                    ['ratio:20x1', [Ge.a, Ze.a].join('\n')],
                    ['color:blue', qe.a],
                    ['color:gray', $e.a],
                    ['color:black', nn.a],
                    ['color:white', on.a],
                    ['color:white-no-border', rn.a],
                    ['color:blue && ratio:1x4', Xe.a]
                ],
                ln = t(80),
                cn = t.n(ln),
                un = t(81),
                dn = t.n(un),
                mn = t(82),
                pn = t.n(mn),
                gn = t(83),
                fn = t.n(gn),
                hn = t(84),
                yn = t.n(hn),
                _n = t(85),
                xn = t.n(_n),
                wn = t(86),
                vn = t.n(wn),
                bn = t(87),
                En = t.n(bn),
                Pn = t(88),
                An = t.n(Pn),
                Rn = t(89),
                On = t.n(Rn),
                Tn = t(90),
                In = t.n(Tn),
                Sn = t(91),
                Ln = t.n(Sn),
                Cn = t(92),
                Nn = t.n(Cn),
                Mn = t(93),
                zn = t.n(Mn),
                jn = t(94),
                kn = t.n(jn),
                Wn = t(95),
                Hn = t.n(Wn),
                Bn = t(96),
                Yn = t.n(Bn),
                Dn = t(97),
                Gn = t.n(Dn),
                Un = t(98),
                Fn = t.n(Un),
                Vn = t(99),
                Zn = {
                    x168x374: { styles: xn.a, vertical: !0 },
                    x765x60: { styles: An.a },
                    x1000x50: { styles: On.a, termsIcon: !0 },
                    x234x100: { styles: vn.a, reverseLogo: !0 },
                    x310x100: { styles: En.a, reverseLogo: !0 },
                    x1000x36: { styles: In.a, termsIcon: !0 },
                    x120x90: { styles: Nn.a, termsIcon: !0 },
                    x234x60: { styles: zn.a, reverseLogo: !0, termsIcon: !0 },
                    x250x250: { styles: kn.a, reverseLogo: !0, vertical: !0, termsIcon: !0 },
                    x300x50: { styles: Hn.a, reverseLogo: !0 },
                    x340x60: { styles: Ln.a, reverseLogo: !0 },
                    x468x60: { styles: Yn.a, reverseLogo: !0, termsIcon: !0 },
                    x728x90: { styles: Gn.a, reverseLogo: !0 },
                    x540x200: { styles: Fn.a, reverseLogo: !0, termsIcon: !0 },
                    x170x100: { styles: t.n(Vn).a, termsIcon: !0 }
                },
                Jn = Object.keys(Zn).map(function(e) {
                    var n = Zn[e],
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
                        n.vertical && (a = '' + a + pn.a),
                        n.reverseLogo && (a = '' + a + dn.a),
                        n.vertical && n.reverseLogo && (a = '' + a + fn.a),
                        n.termsIcon && (a = '' + a + yn.a),
                        ['size:' + t, a]
                    );
                }),
                qn = Object.keys(Zn).map(function(e) {
                    return ['size:' + e.slice(1), Zn[e].styles];
                }),
                Kn = [['default', [he.a, cn.a].join('\n')]].concat(Jn, qn),
                $n = t(100),
                Qn = {
                    'layout:text': ze,
                    'layout:flex': sn,
                    'layout:legacy': Kn,
                    'layout:custom': [['default', [he.a, t.n($n).a].join('\n')]]
                },
                Xn = {
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
            function et(e) {
                return (
                    '\n    .message__headline span.multi:nth-child(2) {\n        display: none;\n    }\n\n    @media (min-width: ' +
                    e +
                    'px) {\n        .message__headline span.multi:first-child {\n            display: none;\n            \n        }\n\n        .message__headline span.multi:nth-child(2) {\n            display: inline;\n            \n        }\n    }\n'
                );
            }
            var nt = [
                    [
                        'default',
                        {
                            logo: Xn.PRIMARY.COLOR,
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
                    ['size:234x100', { logo: Xn.PRIMARY.WHITE }],
                    ['size:310x100', { logo: Xn.PRIMARY.WHITE }],
                    ['size:340x60', { logo: Xn.PRIMARY.WHITE, styles: ['.message { max-width: 100% }'] }]
                ],
                tt = {
                    'layout:text': [
                        [
                            'default',
                            {
                                styles: [
                                    et(290),
                                    '.message__messaging { flex: 1 1 auto; }',
                                    '@media (max-width: 289px) { .message__disclaimer { display: block; } }'
                                ],
                                logo: Xn.PRIMARY.COLOR,
                                headline: ['xsmall', { tag: 'medium', br: ['months'] }],
                                disclaimer: 'xsmall'
                            }
                        ],
                        ['logo.type:primary', { messageWidth: [130, 320] }],
                        [
                            'logo.type:inline',
                            {
                                messageWidth: [200, 1e3],
                                styles: [et(280)],
                                logo: Xn.ALT_NO_PP.COLOR,
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
                                styles: [et(280)],
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
                                styles: [et(520)],
                                logo: Xn.ALTERNATIVE.COLOR,
                                headline: ['xsmall', { tag: 'medium', br: ['months'] }]
                            }
                        ],
                        ['logo.type:primary && logo.position:top', { styles: [et(210)] }],
                        ['logo.type:alternative && logo.position:top', { styles: [et(210)] }],
                        ['text.color:white && logo.type:primary', { logo: Xn.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: Xn.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: Xn.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: Xn.PRIMARY.WHITE,
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
                        ['color:gray', { logo: Xn.PRIMARY.COLOR }],
                        ['color:white', { logo: Xn.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: Xn.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': nt
                },
                ot = {
                    'layout:text': [
                        [
                            'default',
                            {
                                styles: [et(320)],
                                logo: Xn.PRIMARY.COLOR,
                                headline: ['xsmall', { tag: 'medium', br: ['months'], replace: [['99+', '99+.']] }],
                                disclaimer: ['extra', 'xsmall']
                            }
                        ],
                        ['logo.type:primary', { messageWidth: [130, 320] }],
                        [
                            'logo.type:inline',
                            {
                                messageWidth: [240, 1e3],
                                styles: [et(290)],
                                logo: Xn.ALT_NO_PP.COLOR,
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
                                styles: [et(290)],
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
                                styles: [et(570)],
                                logo: Xn.ALTERNATIVE.COLOR,
                                headline: ['xsmall', { tag: 'medium', br: ['months'], replace: [['99+', '99+.']] }]
                            }
                        ],
                        [
                            'logo.type:alternative && logo.position:top',
                            {
                                styles: [et(230)],
                                messageWidth: [150, 320],
                                headline: ['xsmall', { tag: 'medium', br: ['months'] }]
                            }
                        ],
                        ['logo.type:primary && logo.position:top', { styles: [et(235)] }],
                        ['text.color:white && logo.type:primary', { logo: Xn.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: Xn.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: Xn.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: Xn.PRIMARY.WHITE,
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
                        ['color:gray', { logo: Xn.PRIMARY.COLOR }],
                        ['color:white', { logo: Xn.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: Xn.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': nt
                },
                it = {
                    'layout:text': [
                        [
                            'default',
                            {
                                styles: [
                                    '.message__headline > span:first-of-type { text-decoration: underline; color: #0076ff; font-weight: 600; }',
                                    '.message__disclaimer > span { color: #2c2e2f; text-decoration: none; }'
                                ],
                                logo: Xn.PRIMARY.COLOR,
                                headline: { tag: 'small', br: ['months', 'APR'] },
                                disclaimer: 'xsmall.2'
                            }
                        ],
                        ['logo.type:primary', { messageWidth: 190 }],
                        [
                            'logo.type:inline',
                            { messageWidth: [255, 1e3], logo: Xn.ALT_NO_PP.COLOR, headline: { br: ['APR'] } }
                        ],
                        ['logo.type:none', { messageWidth: [240, 1e3], logo: !1, headline: { br: ['APR'] } }],
                        [
                            'logo.type:alternative',
                            { logo: Xn.ALTERNATIVE.COLOR, headline: { replace: [['APR', 'APR.']], br: ['APR.'] } }
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
                        ['text.color:white && logo.type:primary', { logo: Xn.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: Xn.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: Xn.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: Xn.PRIMARY.WHITE,
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
                        ['color:gray', { logo: Xn.PRIMARY.COLOR }],
                        ['color:white', { logo: Xn.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: Xn.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': [
                        ['default', { logo: Xn.PRIMARY.WHITE, headline: 'legacy-small', disclaimer: 'legacy-large' }],
                        ['size:1000x36', { logo: Xn.PRIMARY.COLOR }],
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
                at = {
                    'layout:text': [
                        [
                            'default',
                            {
                                styles: [
                                    '.message__headline > span:not(:nth-of-type(2)) { text-decoration: underline; color: #0076ff; font-weight: 600; }',
                                    '.message__disclaimer > span { color: #2c2e2f; text-decoration: none; }'
                                ],
                                logo: Xn.PRIMARY.COLOR,
                                headline: { tag: 'xsmall', br: ['months'] },
                                disclaimer: 'xsmall.2'
                            }
                        ],
                        ['logo.type:primary', { messageWidth: 130 }],
                        [
                            'logo.type:inline',
                            { messageWidth: [250, 1e3], logo: Xn.ALT_NO_PP.COLOR, headline: { br: ['months'] } }
                        ],
                        ['logo.type:none', { messageWidth: [235, 1e3], logo: !1, headline: { br: ['months'] } }],
                        [
                            'logo.type:alternative',
                            {
                                logo: Xn.ALTERNATIVE.COLOR,
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
                        ['text.color:white && logo.type:primary', { logo: Xn.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: Xn.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: Xn.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: Xn.PRIMARY.WHITE,
                                headline: { tag: 'xsmall', br: ['months'] },
                                disclaimer: ['xsmall.2', 'xsmall']
                            }
                        ],
                        ['ratio:1x4', { headline: { br: ['over', 'months'] }, subHeadline: 'small' }],
                        ['color:gray', { logo: Xn.PRIMARY.COLOR }],
                        ['color:white', { logo: Xn.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: Xn.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': [
                        ['default', { logo: Xn.PRIMARY.WHITE, headline: 'legacy-small', disclaimer: 'legacy-medium' }],
                        ['size:1000x36', { logo: Xn.PRIMARY.COLOR }],
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
                rt = {
                    'layout:text': [
                        [
                            'default',
                            { logo: Xn.PRIMARY.COLOR, headline: { tag: 'small', br: ['/mo'] }, disclaimer: 'small' }
                        ],
                        ['logo.type:primary', { messageWidth: [130, 200] }],
                        [
                            'logo.type:inline',
                            {
                                messageWidth: [200, 1e3],
                                logo: Xn.ALT_NO_PP.COLOR,
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
                        ['logo.type:alternative', { messageWidth: [140, 430], logo: Xn.ALTERNATIVE.COLOR }],
                        ['text.color:white && logo.type:primary', { logo: Xn.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: Xn.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: Xn.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: Xn.PRIMARY.WHITE,
                                headline: { tag: 'medium', br: ['low as', 'at'] },
                                disclaimer: 'small'
                            }
                        ],
                        ['ratio:1x4', { subHeadline: 'small' }],
                        ['color:gray', { logo: Xn.PRIMARY.COLOR }],
                        ['color:white', { logo: Xn.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: Xn.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': [
                        [
                            'default',
                            {
                                logo: Xn.PRIMARY.WHITE,
                                headline: 'legacy-medium',
                                subHeadline: 'legacy-large',
                                disclaimer: 'legacy-small'
                            }
                        ],
                        ['size:1000x36', { logo: Xn.PRIMARY.COLOR, disclaimer: 'legacy-medium' }],
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
                st = {
                    'layout:text': [
                        ['default', { logo: Xn.PRIMARY.COLOR, headline: { tag: 'xsmall' }, disclaimer: 'xsmall' }],
                        ['logo.type:primary', { messageWidth: 130 }],
                        [
                            'logo.type:inline',
                            { messageWidth: [195, 1e3], logo: Xn.ALT_NO_PP.COLOR, headline: { br: ['/mo'] } }
                        ],
                        ['logo.type:none', { messageWidth: [175, 1e3], logo: !1, headline: { br: ['/mo'] } }],
                        ['logo.type:alternative', { logo: Xn.ALTERNATIVE.COLOR }],
                        ['text.color:white && logo.type:primary', { logo: Xn.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: Xn.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: Xn.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            { logo: Xn.PRIMARY.WHITE, headline: { tag: 'small', br: ['low as'] }, disclaimer: 'xsmall' }
                        ],
                        ['ratio:1x4', { subHeadline: 'small' }],
                        ['color:gray', { logo: Xn.PRIMARY.COLOR }],
                        ['color:white', { logo: Xn.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: Xn.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': [
                        [
                            'default',
                            {
                                logo: Xn.PRIMARY.WHITE,
                                headline: 'legacy-xsmall',
                                subHeadline: 'legacy-large',
                                disclaimer: 'legacy-medium'
                            }
                        ],
                        ['size:1000x36', { logo: Xn.PRIMARY.COLOR }],
                        ['size:120x90', { logo: !1 }],
                        ['size:250x250', { disclaimer: 'legacy-medium.2' }],
                        ['size:340x60', { disclaimer: 'legacy-medium.2' }],
                        ['size:540x200', { styles: ['.message__messaging { padding-top: 45px; }'] }],
                        ['size:170x100', { logo: !1, headline: 'legacy-xsmall' }]
                    ]
                },
                lt = {
                    'layout:text': [
                        [
                            'default',
                            { logo: Xn.PRIMARY.COLOR, headline: { tag: 'small', br: ['/mo'] }, disclaimer: 'xsmall' }
                        ],
                        ['logo.type:primary', { messageWidth: [190, 240] }],
                        [
                            'logo.type:inline',
                            { messageWidth: [260, 1e3], logo: Xn.ALT_NO_PP.COLOR, headline: { br: ['APR'] } }
                        ],
                        ['logo.type:none', { messageWidth: [260, 1e3], logo: !1, headline: { br: ['APR'] } }],
                        ['logo.type:alternative', { logo: Xn.ALTERNATIVE.COLOR }],
                        ['text.color:white && logo.type:primary', { logo: Xn.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: Xn.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: Xn.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: Xn.PRIMARY.WHITE,
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
                        ['color:gray', { logo: Xn.PRIMARY.COLOR }],
                        ['color:white', { logo: Xn.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: Xn.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': [
                        [
                            'default',
                            {
                                logo: Xn.PRIMARY.WHITE,
                                headline: 'legacy-small',
                                subHeadline: 'legacy-xlarge',
                                disclaimer: 'legacy-medium'
                            }
                        ],
                        ['size:1000x36', { logo: Xn.PRIMARY.COLOR }],
                        ['size:120x90', { logo: !1, headline: 'legacy-xsmall' }],
                        ['size:234x60', { headline: 'legacy-xsmall', disclaimer: 'legacy-medium.2' }],
                        ['size:250x250', { headline: 'legacy-small.2', disclaimer: 'legacy-medium.2' }],
                        ['size:340x60', { disclaimer: 'legacy-medium.2' }],
                        ['size:728x90', { headline: 'legacy-xsmall' }],
                        ['size:170x100', { logo: !1, headline: 'legacy-xsmall' }]
                    ]
                },
                ct = {
                    'layout:text': [
                        ['default', { logo: Xn.PRIMARY.COLOR, headline: { tag: 'small' }, disclaimer: 'xsmall' }],
                        ['logo.type:primary', { messageWidth: [140, 210] }],
                        [
                            'logo.type:inline',
                            { messageWidth: [200, 1e3], logo: Xn.ALT_NO_PP.COLOR, headline: { br: ['/mo'] } }
                        ],
                        ['logo.type:none', { messageWidth: [200, 1e3], logo: !1, headline: { br: ['/mo'] } }],
                        ['logo.type:alternative', { logo: Xn.ALTERNATIVE.COLOR }],
                        ['text.color:white && logo.type:primary', { logo: Xn.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: Xn.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: Xn.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            { logo: Xn.PRIMARY.WHITE, headline: { tag: 'small', br: ['of'] }, disclaimer: 'xsmall' }
                        ],
                        ['ratio:1x4', { headline: { br: ['payments'] }, subHeadline: 'small' }],
                        ['color:gray', { logo: Xn.PRIMARY.COLOR }],
                        ['color:white', { logo: Xn.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: Xn.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': [
                        [
                            'default',
                            {
                                logo: Xn.PRIMARY.WHITE,
                                headline: 'legacy-xsmall',
                                subHeadline: 'legacy-large',
                                disclaimer: 'legacy-medium'
                            }
                        ],
                        ['size:1000x36', { logo: Xn.PRIMARY.COLOR }],
                        ['size:120x90', { logo: !1 }],
                        ['size:250x250', { disclaimer: 'legacy-medium.2' }],
                        ['size:340x60', { disclaimer: 'legacy-medium.2' }],
                        ['size:540x200', { styles: ['.message__messaging { padding-top: 45px; }'] }],
                        ['size:170x100', { logo: !1, headline: 'legacy-xsmall' }]
                    ]
                };
            function ut(e, n) {
                var t = B()(e, function(e) {
                    var t = e[1];
                    return h()(t, n);
                });
                if (t) return t[0];
                if (le()(n, '.')) {
                    var o = n.split('.', 1)[0];
                    if (
                        (t = B()(e, function(e) {
                            var n = e[1];
                            return h()(n, o);
                        }))
                    )
                        return t[0];
                }
                return B()(e, function(e) {
                    var n = e[1];
                    return h()(n, 'default');
                })[0];
            }
            var dt = document.createElement('iframe');
            dt.setAttribute('style', 'opacity: 0; width: 0; height: 0; position: absolute; left: -99999px;');
            var mt = document.createElement('div');
            mt.innerHTML = ue.a;
            var pt = document.createElement('div');
            function gt(e) {
                return e
                    .reduce(function(e, n) {
                        return [].concat(e, [n, document.createTextNode(' ')]);
                    }, [])
                    .slice(0, -1);
            }
            function ft(e, n) {
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
                                for (var n = e.textContent, t = []; le()(n, o[0]); ) t.push(o[0]), o.shift();
                                if (0 === t.length || (1 === t.length && re()(n, t[0]))) return e.classList.add('br');
                                var i = document.createElement('span');
                                (i.textContent = n), (i.className = 'br');
                                var a = t.reduce(
                                    function(e, n) {
                                        var t = (function(e, n) {
                                            var t = e.textContent,
                                                o = t.indexOf(n) + n.length,
                                                i = e.cloneNode();
                                            if (((i.textContent = t.slice(0, o).trim()), t.length !== o)) {
                                                var a = e.cloneNode();
                                                return (a.textContent = t.slice(o).trim()), [i, a];
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
                    gt(o)
                );
            }
            pt.innerHTML = me.a;
            var ht = m(function(e, n, t) {
                    return (
                        !1 !== t &&
                        ('string' != typeof t && 'object' != typeof t
                            ? null
                            : gt(
                                  (o = 'string' == typeof t ? [{ tag: t }] : Array.isArray(t) ? t : [t]).map(function(
                                      t
                                  ) {
                                      var a,
                                          r = document.createElement('span');
                                      if ((o.length > 1 && r.setAttribute('class', 'multi'), 'string' == typeof t))
                                          (a = ft(ut(e[n], t))), r.classList.add('tag--' + t.split('.', 1)[0]);
                                      else {
                                          var s = t.tag,
                                              l = i(t, ['tag']);
                                          (a = ft(ut(e[n], s), l)), r.classList.add('tag--' + s.split('.', 1)[0]);
                                      }
                                      return (
                                          a.forEach(function(e) {
                                              return r.appendChild(e);
                                          }),
                                          r
                                      );
                                  })
                              ))
                    );
                    var o;
                }),
                yt = m(function(e, n, t) {
                    return t.reduce(
                        function(t, o) {
                            var i = o[0],
                                a = o[1],
                                r = i.split(' && ');
                            return 'default' === i ||
                                r.every(function(n) {
                                    return h()(e, n);
                                })
                                ? n === Array
                                    ? [].concat(t, [a])
                                    : w(t, a)
                                : t;
                        },
                        n === Array ? [] : {}
                    );
                }),
                _t = {
                    getTemplateNode: c(function(e, n) {
                        var t = v(e, 'style.layout');
                        if ('custom' === t)
                            return (function(e) {
                                var t = n.data,
                                    o = n.meta,
                                    i = n.template,
                                    a = document.createElement('div'),
                                    s = o.offerType;
                                if ('' === i) return a;
                                try {
                                    var l = i.replace(/{{\s*?([^\s]+?)\s*?}}/g, function(e, n) {
                                        var o = n.split('.'),
                                            i = o[0],
                                            a = o.slice(1).join('.');
                                        if ('logo' === i) {
                                            var r = document.createElement('div');
                                            return I(r, v(Xn, a.toUpperCase()), 'PayPal Credit logo'), r.innerHTML;
                                        }
                                        return ft(ut(t[i], a)).reduce(function(e, n) {
                                            return '' + e + (n.outerHTML || ' ');
                                        }, '');
                                    });
                                    (a.innerHTML = l),
                                        B()(r()(a.children), function(e) {
                                            return 'STYLE' !== e.tagName;
                                        }).classList.add('offer--' + s.replace(/:/g, '-').toLowerCase());
                                } catch (e) {}
                                return a;
                            })();
                        var o = v(e, 'style._flattened'),
                            i = v(n, 'meta.offerType'),
                            a = v(n, 'data');
                        if ('legacy' === t) {
                            var s = v(e, 'style.typeNI'),
                                l = v(e, 'style.typeEZP'),
                                c = 'NI' === i.split(':')[0] ? s : l;
                            if ('image' === c)
                                return (function(e, t) {
                                    var o = n.meta,
                                        i = pt.cloneNode(!0),
                                        a = A('pp-legacy', i),
                                        r = ['link', 'pixel'].map(a),
                                        s = r[0],
                                        l = r[1],
                                        c = v(e, 'size'),
                                        u = v(e, 'color'),
                                        d = v(e, 'border');
                                    s.setAttribute('href', o.clickUrl), l.setAttribute('href', o.impressionUrl);
                                    var m = 'https://www.paypalobjects.com/upstream/assets/messaging/legacy',
                                        p = 'none' === u ? '' : '-' + u + (!0 === d ? '' : '-no-border'),
                                        g = ('none' === u ? 'v1' : 'v2') + '/' + c.replace(/x/, '-') + p,
                                        f = [1, 1.5, 2].map(function(e) {
                                            return m + '/' + g + '@' + e + 'x.png ' + e + 'x';
                                        });
                                    return I(s, m + '/' + g + '@1x.png', 'PayPal Credit Message', f.join(', ')), i;
                                })(e.style);
                            if (!c) throw new Error(G.MESSAGE_INVALID_LEGACY);
                        }
                        var u = yt(o),
                            d = u(
                                Object,
                                (function(e, n) {
                                    switch (i) {
                                        case 'EZP:ANY:EQZ':
                                            return it[n];
                                        case 'EZP:ANY:GTZ':
                                            return at[n];
                                        case 'PALA:MULTI:EQZ':
                                            return rt[n];
                                        case 'PALA:MULTI:GTZ':
                                            return st[n];
                                        case 'PALA:SINGLE:EQZ':
                                            return lt[n];
                                        case 'PALA:SINGLE:GTZ':
                                            return ct[n];
                                        case 'NI:NON-US':
                                            return ot[n];
                                        case 'NI':
                                        default:
                                            return tt[n];
                                    }
                                })(0, 'layout:' + t)
                            ),
                            m = u(Array, Qn['layout:' + t]),
                            p = ht(a),
                            g = mt.cloneNode(!0),
                            f = A('message', g),
                            h = ['logo-container', 'headline', 'sub-headline', 'disclaimer'].map(f),
                            y = h[0],
                            _ = h[1],
                            x = h[2],
                            w = h[3];
                        if (
                            (O(_, p('headline', d.headline)),
                            O(x, p('subHeadline', d.subHeadline)),
                            T(w, p('disclaimer', d.disclaimer)),
                            I(y, d.logo, 'PayPal Credit logo'),
                            'inline' === v(e, 'style.logo.type') && _.appendChild(y),
                            'none' === v(e, 'style.logo.type'))
                        ) {
                            var b = document.createElement('span');
                            b.textContent = 'with ';
                            var E = document.createElement('strong');
                            (E.textContent = 'PayPal Credit.'),
                                b.appendChild(E),
                                _.appendChild(document.createTextNode(' ')),
                                _.appendChild(b);
                        }
                        d.messageWidth &&
                            ('number' == typeof d.messageWidth
                                ? m.push('.message__messaging { width: ' + d.messageWidth + 'px }')
                                : Array.isArray(d.messageWidth) &&
                                  m.push(
                                      '.message__messaging { min-width: ' +
                                          d.messageWidth[0] +
                                          'px; max-width: ' +
                                          d.messageWidth[1] +
                                          'px }'
                                  ));
                        var P = function(n) {
                            return 'legacy' === t ? n.replace(/\.message/g, '[data-pp-id="' + e.id + '"] .message') : n;
                        };
                        return (
                            d.styles && R(g, P(d.styles.join(''))),
                            R(g, P(m.join('\n'))),
                            (g.width = (function(e) {
                                document.body.appendChild(dt),
                                    dt.contentWindow.document.body.appendChild(
                                        dt.contentWindow.document.importNode(e, !0)
                                    ),
                                    r()(dt.contentWindow.document.getElementsByTagName('style')).forEach(function(e) {
                                        var n = dt.contentWindow.document.createElement('style');
                                        (n.textContent = e.textContent),
                                            e.parentNode.insertBefore(n, e),
                                            e.parentNode.removeChild(e);
                                    });
                                var n = dt.contentWindow.document.querySelector('.message__content'),
                                    t = window.getComputedStyle(n),
                                    o = r()(n.children),
                                    i = [
                                        'margin-left',
                                        'border-left-width',
                                        'padding-left',
                                        'width',
                                        'padding-right',
                                        'border-right-width',
                                        'margin-right'
                                    ],
                                    a = le()(t.getPropertyValue('display'), 'flex')
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
                                return document.body.removeChild(dt), a;
                            })(g)),
                            g
                        );
                    })
                },
                xt = m(function(e, n) {
                    var t = n.markup,
                        i = n.options;
                    return new j.ZalgoPromise(function(n) {
                        var a, s, l, c;
                        'string' == typeof t
                            ? (((a = document.createElement('div')).innerHTML = t), (s = {}))
                            : ((a = _t.getTemplateNode(i, t)), (s = o({}, t.meta, { minWidth: a.width }))),
                            'IFRAME' === e.tagName
                                ? ((l = e.contentWindow.document.importNode(a, !0)), (c = e.contentWindow.document))
                                : ((l = a.cloneNode(!0)), (c = document));
                        var u = r()(l.getElementsByTagName('img'))
                            .filter(function(e) {
                                return !e.complete;
                            })
                            .map(function(e) {
                                return new j.ZalgoPromise(function(n) {
                                    return e.addEventListener('load', n);
                                });
                            });
                        r()(l.getElementsByTagName('style')).forEach(function(e) {
                            var n = c.createElement('style');
                            (n.textContent = e.textContent),
                                e.parentNode.insertBefore(n, e),
                                e.parentNode.removeChild(e);
                        }),
                            r()(l.getElementsByTagName('script')).forEach(function(e) {
                                var n = c.createElement('script');
                                (n.text = e.text), e.parentNode.insertBefore(n, e), e.parentNode.removeChild(e);
                            }),
                            j.ZalgoPromise.all(u).then(function() {
                                requestAnimationFrame(function() {
                                    for (var t = 'IFRAME' === e.tagName ? c.body : e; t.firstChild; )
                                        t.removeChild(t.firstChild);
                                    r()(l.children).forEach(function(e) {
                                        return t.appendChild(e);
                                    }),
                                        n({ meta: o({}, s, {}, (c !== document && c.defaultView.meta) || {}) });
                                });
                            });
                    });
                });
            function wt(e) {
                var n = e.getBoundingClientRect(),
                    t = (n.top + n.bottom) / 2,
                    o = (n.left + n.right) / 2;
                return !(t > window.innerHeight || t < 0 || o > window.innerWidth || o < 0);
            }
            var vt = m(function(e, n) {
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
                            visible: wt(e),
                            amount: t
                        };
                    r.visible ||
                        o.on('scroll', function() {
                            wt(e) &&
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
                            return new j.ZalgoPromise(function(t) {
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
                bt = {
                    '1x1': [{ ratio: '1x1', width: [120, 300] }],
                    '1x4': [{ ratio: '1x2', width: [160, 160] }, { ratio: '1x4', breakpoint: 768 }],
                    '8x1': [{ ratio: '6x1', width: [250, 768] }, { ratio: '8x1', breakpoint: 768 }],
                    '20x1': [
                        { ratio: '6x1', width: [250, 768] },
                        { ratio: '20x1', width: [350, 1169], breakpoint: 768 }
                    ]
                };
            function Et(e) {
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
            function Pt(e) {
                var n = e.split(/(?=[@[])/),
                    t = n[0],
                    o = n.slice(1);
                return t.match(/\d+x\d+/)
                    ? o.reduce(
                          function(e, n) {
                              return (
                                  l()(n, '@')
                                      ? (e.breakpoint = n.slice(1))
                                      : l()(n, '[') && (e.width = n.slice(1, -1).split(',')),
                                  e
                              );
                          },
                          { ratio: t }
                      )
                    : {};
            }
            var At = m(function(e, n) {
                var t = n.wrapper,
                    o = n.options,
                    i = n.logger,
                    a = n.meta;
                if ('IFRAME' === e.tagName) {
                    var r,
                        s,
                        l = v(o, 'style.layout'),
                        c = v(o, 'style.ratio');
                    if (('flex' !== l && 'custom' !== l) || !c) {
                        var u = a.minWidth || 0;
                        e.setAttribute('style', 'width: 100%; border: none; min-width: ' + u + 'px;'),
                            t.removeAttribute('class');
                        var d = (function(e) {
                                var n = document.createElement('div');
                                n.setAttribute('style', 'width: 100%; overflow: hidden');
                                var t = document.createElement('div');
                                t.setAttribute('style', 'width: 10000px'),
                                    n.appendChild(t),
                                    e.parentNode.appendChild(n);
                                var o = n.offsetWidth;
                                return e.parentNode.removeChild(n), o;
                            })(t),
                            m = function() {
                                e.setAttribute('height', e.contentWindow.document.body.lastChild.offsetHeight);
                            };
                        if (d < u && 'custom' !== l) {
                            if ('top' !== v(o, 'style.logo.position') || 'primary' !== v(o, 'style.logo.type'))
                                throw (i.warn(
                                    'Message Overflow. PayPal Credit Message of layout type ' +
                                        v(o, 'style.layout') +
                                        ' requires a width of at least ' +
                                        u +
                                        'px. Current container is ' +
                                        d +
                                        'px. Attempting fallback message.'
                                ),
                                (r = function() {
                                    t.parentNode.setAttribute('data-pp-style-layout', 'text'),
                                        t.parentNode.setAttribute('data-pp-style-logo-type', 'primary'),
                                        t.parentNode.setAttribute('data-pp-style-logo-position', 'top');
                                }),
                                ((s = new Error(G.MESSAGE_OVERFLOW)).onEnd = r),
                                s);
                            i.error({ name: G.MESSAGE_HIDDEN }),
                                i.warn(
                                    'Message hidden. PayPal Credit Message fallback requires minimum width of ' +
                                        u +
                                        'px. Current container is ' +
                                        d +
                                        'px. Message hidden.'
                                ),
                                e.setAttribute('data-pp-message-hidden', 'true');
                        } else m(), ie(e).on('resize', m);
                    } else
                        !(function(e, n, t) {
                            var o = [];
                            'flex' === t
                                ? (o = bt[n])
                                : Array.isArray(n)
                                ? (o = n.map(Pt))
                                : 'string' == typeof n && (o = [Pt(n)]);
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
                                                    Et(a[0]) +
                                                    ';\n                                max-width: ' +
                                                    Et(a[1]) +
                                                    ';'
                                                  : '') +
                                              '\n                    box-sizing: border-box;\n                    position: relative;\n                }\n        \n                .' +
                                              i +
                                              '::before {\n                    padding-top: ' +
                                              Et(o) +
                                              ";\n                    content: '';\n                    display: block;\n                }\n        \n                ." +
                                              i +
                                              ' iframe {\n                    position: absolute;\n                    top: 0;\n                    left: 0;\n                    width: 100%;\n                    height: 100%;\n                }\n            '
                                        : t
                                        ? '\n            ' +
                                          e +
                                          '\n            @media (min-width: ' +
                                          Et(t) +
                                          ') {\n                ' +
                                          (Array.isArray(a)
                                              ? '\n                            .' +
                                                i +
                                                ' {\n                                min-width: ' +
                                                Et(a[0]) +
                                                ';\n                                max-width: ' +
                                                Et(a[1]) +
                                                ';\n                            }'
                                              : '') +
                                          '\n                .' +
                                          i +
                                          '::before {\n                    padding-top: ' +
                                          Et(o) +
                                          ';\n                }\n            }\n        '
                                        : e;
                                }, ''),
                                r = document.createElement('style');
                            (r.textContent = a), e.setAttribute('class', i), e.appendChild(r);
                        })(t, c, l),
                            e.setAttribute('style', 'width: 100%; border: none;'),
                            e.removeAttribute('height');
                }
            });
            function Rt(e) {
                var n = document.createElement(e);
                'iframe' === e &&
                    (n.setAttribute('title', 'PayPal Credit Promotion Message'),
                    n.setAttribute('style', 'width: 100%; border: none;'),
                    n.setAttribute('src', 'about:blank'),
                    n.setAttribute('height', 0));
                var t = _()({ insertMarkup: xt, setSize: At, runStats: vt, events: ie }).reduce(function(e, t) {
                    var i;
                    return o({}, e, (((i = {})[t[0]] = (0, t[1])(n)), i));
                }, {});
                return (
                    (t.clearEvents = function() {
                        return (function(e) {
                            Q()(X).forEach(function(n) {
                                return n.delete(e);
                            }),
                                0 === X.scroll.size && window.removeEventListener('scroll', ne),
                                0 === X.hover.size && document.removeEventListener('mouseover', te),
                                'IFRAME' === e.tagName
                                    ? (e.contentWindow.removeEventListener('resize', ee),
                                      e.contentWindow.document.body.removeEventListener('click', oe))
                                    : e.removeEventListener('click', oe);
                        })(n);
                    }),
                    [n, t]
                );
            }
            var Ot = t(22),
                Tt = t.n(Ot),
                It = {
                    ANY: 'ANY',
                    STRING: 'STRING',
                    BOOLEAN: 'BOOLEAN',
                    NUMBER: 'NUMBER',
                    FUNCTION: 'FUNCTION',
                    OBJECT: 'OBJECT'
                },
                St = { id: [It.STRING], _legacy: [It.BOOLEAN], onRender: [It.FUNCTION] },
                Lt = {
                    text: {
                        logo: {
                            type: [It.STRING, ['primary', 'alternative', 'inline', 'none']],
                            position: [It.STRING, ['left', 'right', 'top']]
                        },
                        text: { color: [It.STRING, ['black', 'white']] }
                    },
                    flex: {
                        color: [It.STRING, ['blue', 'black', 'white', 'white-no-border', 'gray|grey']],
                        ratio: [It.STRING, ['1x1', '1x4', '8x1', '20x1']]
                    },
                    legacy: {
                        typeNI: [It.STRING, ['', 'image', 'html']],
                        typeEZP: [It.STRING, ['', 'html']],
                        size: [It.STRING],
                        color: [It.STRING, ['none', 'blue', 'black', 'gray|grey', 'white']],
                        border: [It.BOOLEAN, [!0, !1]]
                    },
                    custom: { markup: [It.STRING], ratio: [It.ANY] }
                },
                Ct = function(e, n, t) {
                    return e.warn('Invalid option value (' + n + '). ' + t);
                },
                Nt = function(e, n, t, o) {
                    return Ct(e, n, 'Expected type "' + t.toLowerCase() + '" but instead received "' + typeof o + '".');
                },
                Mt = function(e, n, t, o) {
                    return Ct(
                        e,
                        n,
                        'Expected one of ["' + t.join('", "').replace(/\|[\w|]+/g, '') + '"] but received "' + o + '".'
                    );
                };
            function zt(e, n) {
                switch (e) {
                    case It.STRING:
                        return 'string' == typeof n;
                    case It.BOOLEAN:
                        return 'boolean' == typeof n;
                    case It.NUMBER:
                        return 'number' == typeof n && !Tt()(n);
                    case It.FUNCTION:
                        return 'function' == typeof n;
                    case It.OBJECT:
                        return 'object' == typeof n && null !== n;
                    case It.ANY:
                        return !0;
                    default:
                        return !1;
                }
            }
            function jt(e, n, t, i) {
                return (
                    void 0 === i && (i = 'style.'),
                    _()(n).reduce(function(a, r) {
                        var s,
                            l = r[0],
                            c = r[1];
                        if (Array.isArray(c)) {
                            var u,
                                d = (function(e, n, t, o) {
                                    var i = n[0],
                                        a = n[1],
                                        r = void 0 === a ? [] : a;
                                    if (void 0 === t) return r[0];
                                    if (zt(i, t)) {
                                        if (i === It.STRING && r.length > 0) {
                                            var s = B()(r, function(e) {
                                                return e.split('|').some(function(e) {
                                                    return e === t;
                                                });
                                            });
                                            return void 0 === s
                                                ? (Mt(e, o, r, t), r[0].split('|')[0])
                                                : s.split('|')[0];
                                        }
                                        return t;
                                    }
                                    return Nt(e, o, i, t), r[0];
                                })(e, c, t[l], '' + i + l);
                            return void 0 === d ? a : o({}, a, (((u = {})[l] = d), u));
                        }
                        return o({}, a, (((s = {})[l] = jt(e, n[l], t[l] || {}, '' + i + l + '.')), s));
                    }, {})
                );
            }
            function kt(e, n) {
                return o({ layout: n.layout }, jt(e, Lt[n.layout], n));
            }
            var Wt = m(function(e, n) {
                    var t = n.account,
                        o = n.amount,
                        a = n.countryCode,
                        r = n.style,
                        s = i(n, ['account', 'amount', 'countryCode', 'style']),
                        c = jt(e, St, s, '');
                    if (
                        (zt(It.STRING, t)
                            ? 13 === t.length || 10 === t.length || l()(t, 'client-id:')
                                ? (c.account = t)
                                : Ct(e, 'account', 'Ensure the correct Merchant Account ID has been entered.')
                            : Nt(e, 'account', It.STRING, t),
                        void 0 !== o)
                    ) {
                        var u = Number(o);
                        zt(It.NUMBER, u)
                            ? u < 0
                                ? Ct(e, 'amount', 'Ensure value is a positive number.')
                                : (c.amount = u)
                            : Nt(e, 'amount', It.NUMBER, o);
                    }
                    return (
                        void 0 !== a &&
                            (zt(It.STRING, a)
                                ? 2 !== a.length
                                    ? Ct(e, 'countryCode', 'Country code should be 2 characters.')
                                    : (c.countryCode = a)
                                : Nt(e, 'countryCode', It.STRING, a)),
                        zt(It.OBJECT, r) && zt(It.STRING, r.layout) && Lt[r.layout]
                            ? (c.style = kt(e, r))
                            : (zt(It.OBJECT, r)
                                  ? Mt(e, 'style.layout', Object.keys(Lt), r.layout)
                                  : void 0 !== r && Nt(e, 'style', It.OBJECT, r),
                              (c.style = kt(e, { layout: 'text' }))),
                        e.info(D.VALIDATE, { options: x(c) }),
                        c
                    );
                }),
                Ht = u(
                    function(e) {
                        var n = e.offerType;
                        return new j.ZalgoPromise(function(e, t) {
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
                                            (l()(e, 'NI') ? 'ni' : 'ezp') +
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
                Bt = u(
                    function(e) {
                        return new j.ZalgoPromise(function(n) {
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
                                    (a = ['json=true', l()(o, 'client-id') ? 'cid=' + o.slice(10) : 'mid=' + o]).push(
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
                Yt = function(e, n) {
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
                Dt = function(e) {
                    return e.max_amount !== e.default_max_amount
                        ? '<div style="text-align: center; padding-bottom: 15px; display: table; padding-top: 10px; "><span style="display: inline-block; vertical-align: middle; "><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19"><path fill="none" fill-rule="evenodd" stroke="#9DA3A6" stroke-linecap="round" stroke-linejoin="round" d="M9.526 10.474v7.579c4.71-.034 8.527-3.817 8.527-8.527a8.526 8.526 0 1 0-11.834 7.862"></path></svg></span><p style="display: inline; font-size: 13px; color: #2c2e2f; padding-left: 5px; font-family: PayPalSansSmall; font-weight: 400 ">$' +
                              e.max_amount +
                              ' is the maximum amount to be eligible for Easy Payments. Enter an amount of $' +
                              e.max_amount +
                              ' or less.</p></div>'
                        : '<p style="text-align: center">No offers are available for this amount. Please enter a new amount.</p>';
                };
            function Gt(e, n) {
                var t = e.contentDocument.getElementById('content-wrapper'),
                    i = e.contentDocument.getElementById('modal__overlay'),
                    a = e.contentDocument.getElementById('close-btn'),
                    r = e.contentDocument.getElementById('header'),
                    s = e.contentDocument.getElementsByClassName('accordion'),
                    l = e.contentDocument.getElementById('modal-container'),
                    c = e.contentDocument.getElementsByClassName('modal__header-container')[0],
                    u = e.contentDocument.getElementsByTagName('a');
                return o(
                    {
                        window: e.contentWindow,
                        contentWrapper: t,
                        overlay: i,
                        closeButton: a,
                        header: r,
                        accordions: s,
                        modalContainer: l,
                        headerContainer: c,
                        landerLinks: u
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
            var Ut = u(
                    function(e) {
                        var n = window.top.document.createElement('div');
                        n.setAttribute('data-pp-id', M.nextId);
                        var t = Rt('iframe'),
                            i = t[0],
                            a = t[1].insertMarkup,
                            s = (function() {
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
                                        e.contains(t) && (e.removeChild(t), e.appendChild(o)),
                                            (n.style.overflow = 'hidden'),
                                            (n.style.msOverflowStyle = 'scrollbar');
                                    },
                                    function() {
                                        e.contains(o) && (e.removeChild(o), e.appendChild(t)),
                                            i ? n.setAttribute('style', i) : n.removeAttribute('style');
                                    }
                                ];
                            })(),
                            c = s[0],
                            u = s[1],
                            d = e.track,
                            m = e.clickUrl,
                            p = C({ status: 'CLOSED' }),
                            g = p[0],
                            f = p[1],
                            h = U.create({ id: M.nextId, account: e.account, selector: '__internal__', type: 'Modal' });
                        function y() {
                            return l()(e.offerType, 'NI') ? 'NI' : 'EZP';
                        }
                        z({ nextId: (M.nextId += 1) });
                        var _ = function(e, n, t) {
                            return d({
                                et: 'modal-open' === e ? 'CLIENT_IMPRESSION' : 'CLICK',
                                link: n,
                                amount: t,
                                modal: y(),
                                event_type: e
                            });
                        };
                        function x() {
                            r()(g.elements.accordions).forEach(function(e) {
                                e.classList.remove('show'),
                                    e
                                        .getElementsByClassName('accordion-content')[0]
                                        .style.setProperty('max-height', null);
                            });
                        }
                        function w(e, n) {
                            var t = {
                                    'NI Tab': [g.elements.niTab, g.elements.niContent],
                                    'EZP Tab': [g.elements.ezpTab, g.elements.ezpContent]
                                },
                                o = t[e][0];
                            Q()(t).forEach(function(e) {
                                var n = e[0],
                                    t = e[1];
                                n.classList.toggle('selected', n === o), t.classList.toggle('show', n === o);
                            }),
                                n || _('modal-tab', e),
                                x();
                        }
                        function v() {
                            return g.error ? A(!0) : g.modalProm;
                        }
                        function b(e) {
                            return new j.ZalgoPromise(function(t, o) {
                                'OPEN' === g.status || 'OPENING' === g.status
                                    ? (f({ status: 'CLOSING' }),
                                      g.elements.modalContainer.classList.remove('show'),
                                      setTimeout(function() {
                                          (n.style.display = 'none'),
                                              i.blur(),
                                              f({ status: 'CLOSED' }),
                                              u(),
                                              'EZP' === y() &&
                                                  setTimeout(function() {
                                                      w('EZP Tab', !0);
                                                  }, 350),
                                              t();
                                      }, e || 0))
                                    : o();
                            });
                        }
                        function E(e) {
                            b(350), _('modal-close', e);
                        }
                        function P(n) {
                            var t = +n;
                            return (
                                Tt()(t) || (g.elements.amountInput.value = t.toFixed(2)),
                                g.elements.loader.style.setProperty('opacity', 1),
                                g.elements.financeTermsTable.style.setProperty('opacity', 0.4),
                                Bt(o({}, e, { amount: n })).then(function(e) {
                                    g.elements.loader.style.setProperty('opacity', 0),
                                        g.elements.financeTermsTable.style.setProperty('opacity', 1),
                                        (g.elements.financeTermsTable.innerHTML = (function(e) {
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
                                                                return Yt(e, n);
                                                            })
                                                            .join('')
                                                      : '') +
                                                  '\n            </tbody>\n        </table>\n        ' +
                                                  (e.options && 0 !== e.options.length && 'N/A' !== e.options
                                                      ? ''
                                                      : Dt(e)) +
                                                  '\n        <p id="terms-note">The monthly payment shown is an estimated amount and may not include taxes and shipping</p>\n    ';
                                        })(e));
                                })
                            );
                        }
                        function A(n) {
                            return (
                                void 0 === n && (n = !1),
                                h.start({
                                    options: {
                                        account: e.account,
                                        offerType: e.offerType,
                                        amount: e.amount,
                                        message_id: e.id
                                    }
                                }),
                                Ht(e, n)
                                    .then(a)
                                    .then(function() {
                                        f({ elements: Gt(i, y()) }),
                                            (function() {
                                                g.elements.closeButton.addEventListener('click', function() {
                                                    E('Close Button');
                                                }),
                                                    g.elements.overlay.addEventListener('click', function(e) {
                                                        var n = e.target;
                                                        (n !== g.elements.contentWrapper &&
                                                            n !== g.elements.headerContainer) ||
                                                            E('Modal Overlay');
                                                    });
                                                var e = function() {
                                                    g.elements.contentWrapper.scrollTop > 0
                                                        ? g.elements.header.classList.add('show')
                                                        : g.elements.header.classList.remove('show');
                                                };
                                                if (
                                                    (g.elements.contentWrapper.addEventListener('scroll', e),
                                                    g.elements.contentWrapper.addEventListener('touchmove', e),
                                                    r()(g.elements.accordions).forEach(function(e) {
                                                        var n = e.getElementsByTagName('h3')[0],
                                                            t = e.getElementsByClassName('accordion-content')[0];
                                                        n.addEventListener('click', function() {
                                                            var o = e.classList.toggle('show');
                                                            t.style.setProperty(
                                                                'max-height',
                                                                o ? t.scrollHeight + 'px' : null
                                                            ),
                                                                o && _('accordion-open', n.innerText);
                                                        });
                                                    }),
                                                    i.contentWindow.addEventListener('keyup', function(e) {
                                                        ('Escape' !== e.key && 'Esc' !== e.key && 27 !== e.charCode) ||
                                                            E('Escape Key');
                                                    }),
                                                    r()(g.elements.landerLinks).forEach(function(e) {
                                                        e.addEventListener('click', function() {
                                                            return _('lander-link');
                                                        });
                                                    }),
                                                    'EZP' === y())
                                                ) {
                                                    g.elements.niTab.addEventListener('click', function() {
                                                        return w('NI Tab');
                                                    }),
                                                        g.elements.ezpTab.addEventListener('click', function() {
                                                            return w('EZP Tab');
                                                        });
                                                    var n = function(e) {
                                                        var n = g.elements.amountInput.value;
                                                        _('calculate', e, n), P(n);
                                                    };
                                                    g.elements.amountInput.addEventListener('keydown', function(e) {
                                                        var t = e.key,
                                                            o = e.target;
                                                        if (t.length > 1 || e.metaKey || e.ctrlKey)
                                                            'Enter' === t && n('Enter Key');
                                                        else {
                                                            var i = o.value,
                                                                a = o.selectionStart,
                                                                r = i ? '' + i.slice(0, a) + t + i.slice(a) : t;
                                                            (function(e) {
                                                                if (Tt()(Number(e))) return !1;
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
                                                        g.elements.calculateButton.addEventListener(
                                                            'click',
                                                            function() {
                                                                return n('Calculate Button');
                                                            }
                                                        );
                                                }
                                            })();
                                    })
                                    .catch(function() {
                                        h.error({ name: G.MODAL_FAIL }), f({ error: !0 });
                                    })
                                    .then(function() {
                                        return h.end();
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
                            i.setAttribute(
                                'style',
                                'position: absolute; top: 0; left: 0; overflow: hidden; width: 100%; height: 100%; margin: 0; padding: 0; border: 0; display: block;'
                            ),
                            n.appendChild(i),
                            window.top.document.body.appendChild(n),
                            f({ modalProm: A() }),
                            'EZP' === y() &&
                                v().then(function() {
                                    return P(e.amount);
                                }),
                            {
                                open: function(e) {
                                    e.preventDefault(),
                                        ('CLOSED' !== g.status && 'CLOSING' !== g.status) ||
                                            (f({ status: 'OPENING' }),
                                            v().then(function() {
                                                if (g.error)
                                                    return f({ status: 'CLOSED' }), void window.open(m, '_blank');
                                                (n.style.display = 'block'),
                                                    requestAnimationFrame(function() {
                                                        return requestAnimationFrame(function() {
                                                            x(),
                                                                i.contentWindow.focus(),
                                                                f({ status: 'OPEN' }),
                                                                c(),
                                                                g.elements.modalContainer.classList.add('show'),
                                                                _('modal-open');
                                                        });
                                                    });
                                            }));
                                },
                                close: b
                            }
                        );
                    },
                    ['account', 'amount', 'offerType']
                ),
                Ft = {
                    init: function(e) {
                        var n = e.options,
                            t = e.meta,
                            i = e.events,
                            a = e.track;
                        if (n._legacy && l()(t.offerType, 'NI'))
                            i.on('click', function(e) {
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
                            var r = Ut(o({}, n, {}, t, { track: a }));
                            i.on('click', r.open);
                        }
                    }
                },
                Vt = new Map(),
                Zt = new Map();
            function Jt(e) {
                var n = (e.meta && e.meta.offerType) + '::' + e.options.style._flattened.sort().join('::'),
                    t = e.meta;
                return {
                    track: e.logger.track({
                        uuid: n,
                        urls: { DEFAULT: t.clickUrl, MORS_IMPRESSION: t.impressionUrl + '&idx=' + e.options.id }
                    })
                };
            }
            var qt = m(function(e, n) {
                    var t;
                    return ((t = {})[e] = n), t;
                }),
                Kt = m(function(e, n) {
                    return o({}, n, {}, e(n));
                }),
                $t = m(function(e, n) {
                    return e(n).then(function(e) {
                        return o({}, n, {}, e);
                    });
                }),
                Qt = function(e) {
                    var n = e.options.onRender;
                    n && n();
                },
                Xt = {
                    init: function(e, n, t) {
                        Zt.has(e) ||
                            Zt.set(e, U.create({ id: t.id, account: t.account, selector: n, type: 'Message' }));
                        var i,
                            a = Zt.get(e);
                        return (
                            Vt.has(e)
                                ? ((i = Vt.get(e)).renderProm = i.renderProm.then(function() {
                                      return a.start({ options: t }), i.update(t);
                                  }))
                                : (a.start({ options: t }),
                                  (i = (function(e, n, t) {
                                      t.info(D.CREATE);
                                      var i = C(e),
                                          a = i[0],
                                          r = i[1],
                                          s = a._legacy,
                                          l = Rt(s ? 'div' : 'iframe'),
                                          c = l[0],
                                          u = l[1],
                                          f = u.insertMarkup,
                                          y = u.setSize,
                                          x = u.events,
                                          v = u.runStats,
                                          b = u.clearEvents,
                                          E = s ? c : document.createElement('span');
                                      E !== c && E.appendChild(c);
                                      var P = m(function(e, n, o) {
                                          return t.info(n), e(o);
                                      });
                                      function A(e) {
                                          return (
                                              t.info(D.RENDER_START),
                                              g(Wt(t), p(r), qt('options'), d(L.a, { logger: t }), $t(K))(e)
                                                  .then($t(P(f, D.INSERT)))
                                                  .then(
                                                      g(
                                                          d(L.a, { wrapper: E, events: x }),
                                                          Kt(Jt),
                                                          p(P(Ft.init, D.MODAL)),
                                                          p(P(y, D.SIZE)),
                                                          p(P(v, D.STATS)),
                                                          P(Qt, D.RENDER_END)
                                                      )
                                                  )
                                          );
                                      }
                                      return (
                                          n.appendChild(E),
                                          t.info(D.CONTAINER),
                                          s ||
                                              c.addEventListener('load', function() {
                                                  b(), A(a);
                                              }),
                                          {
                                              renderProm: A(a),
                                              wrapper: E,
                                              container: c,
                                              update: function(e) {
                                                  var n = w(a, e),
                                                      i = (function e(n, t) {
                                                          return _()(t).reduce(function(t, i) {
                                                              var a,
                                                                  r,
                                                                  s = i[0],
                                                                  l = i[1];
                                                              if (!n[s] && n[s] !== l)
                                                                  return o({}, t, (((a = {})[s] = l), a));
                                                              if ('object' != typeof l || null === l)
                                                                  return l !== n[s]
                                                                      ? o({}, t, (((r = {})[s] = l), r))
                                                                      : t;
                                                              if (Array.isArray(l)) {
                                                                  var c;
                                                                  if (Array.isArray(n[s])) {
                                                                      var u,
                                                                          d = l.filter(function(e) {
                                                                              return !h()(n[s], e);
                                                                          });
                                                                      return d.length > 0
                                                                          ? o({}, t, (((u = {})[s] = d), u))
                                                                          : t;
                                                                  }
                                                                  return o({}, t, (((c = {})[s] = l), c));
                                                              }
                                                              var m,
                                                                  p = e(n[s], l);
                                                              return Object.keys(p).length > 0
                                                                  ? o({}, t, (((m = {})[s] = p), m))
                                                                  : t;
                                                          }, {});
                                                      })(a, n),
                                                      r = Object.keys(i).length > 0;
                                                  return (
                                                      t.info(D.UPDATE, { willUpdate: r }),
                                                      r ? (b(), A(n)) : j.ZalgoPromise.resolve()
                                                  );
                                              }
                                          }
                                      );
                                  })(t, e, a)),
                                  Vt.set(e, i)),
                            (i.renderProm = i.renderProm.then(a.end).catch(function(e) {
                                a.error({ name: e.message }), a.end(), 'function' == typeof e.onEnd && e.onEnd();
                            })),
                            i.renderProm
                        );
                    }
                };
            function eo(e, n) {
                var t, i;
                if ((void 0 === n && (n = '[data-pp-message]'), 'string' == typeof n))
                    (t = r()(document.querySelectorAll(n))), (i = n);
                else if (E(n)) (t = [n]), (i = 'HTMLElement');
                else {
                    if (!Array.isArray(n) || !n.every(E)) return U.warn('Invalid selector', n);
                    (t = [].concat(n)), (i = 'Array<HTMLElement>');
                }
                return (
                    (t = t.filter(function(n) {
                        return n.ownerDocument.body.contains(n)
                            ? !e._auto || !n.hasAttribute('data-pp-id')
                            : (U.warn('Skipping container. Must be in the document:', n), !1);
                    })),
                    j.ZalgoPromise.all(
                        t.map(function(n) {
                            var t = w(e, P(n));
                            return (
                                n.hasAttribute('data-pp-id') ||
                                    (n.setAttribute('data-pp-id', M.nextId), z({ nextId: (M.nextId += 1) })),
                                new MutationObserver(function(e) {
                                    var t = e.reduce(function(e, n) {
                                        return l()(n.attributeName, 'data-pp-')
                                            ? o(
                                                  {},
                                                  e,
                                                  {},
                                                  b(n.attributeName.slice(8), n.target.getAttribute(n.attributeName))
                                              )
                                            : e;
                                    }, {});
                                    Xt.init(n, i, t);
                                }).observe(n, { attributes: !0 }),
                                (t.id = n.getAttribute('data-pp-id')),
                                Xt.init(n, i, t)
                            );
                        })
                    )
                );
            }
            var no = function(e) {
                return {
                    render: function(n) {
                        return eo(o({}, M.config, {}, e), n);
                    }
                };
            };
            L()(no, {
                render: function(e, n) {
                    return void 0 === e && (e = {}), eo(o({}, M.config, {}, e), n);
                },
                setGlobalConfig: function(e) {
                    return void 0 === e && (e = {}), z({ config: o({}, M.config, {}, e) });
                }
            });
            var to,
                oo = no;
            t.d(n, 'Messages', function() {
                return oo;
            }),
                (to = document.currentScript || document.querySelector('script[src$="messaging.js"]')) &&
                    oo.setGlobalConfig(P(to)),
                window.paypal && (window.paypal.Message = oo),
                M.config.account &&
                    ('loading' === document.readyState
                        ? window.addEventListener('DOMContentLoaded', function() {
                              return oo.render({ _auto: !0 });
                          })
                        : oo.render({ _auto: !0 }));
        }
    ]).Messages);
//# sourceMappingURL=messaging@1.1.1.js.map
