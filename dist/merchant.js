!(function(e, n) {
    for (var t in n) e[t] = n[t];
})(
    window,
    (function(e) {
        var n = {};
        function t(i) {
            if (n[i]) return n[i].exports;
            var o = (n[i] = { i: i, l: !1, exports: {} });
            return e[i].call(o.exports, o, o.exports, t), (o.l = !0), o.exports;
        }
        return (
            (t.m = e),
            (t.c = n),
            (t.d = function(e, n, i) {
                t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: i });
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
                var i = Object.create(null);
                if (
                    (t.r(i),
                    Object.defineProperty(i, 'default', { enumerable: !0, value: e }),
                    2 & n && 'string' != typeof e)
                )
                    for (var o in e)
                        t.d(
                            i,
                            o,
                            function(n) {
                                return e[n];
                            }.bind(null, o)
                        );
                return i;
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
            e.exports = t(147);
        },
        function(e, n, t) {
            e.exports = t(131);
        },
        function(e, n, t) {
            e.exports = t(101);
        },
        function(e, n, t) {
            e.exports = t(141);
        },
        function(e, n, t) {
            e.exports = t(134);
        },
        function(e, n, t) {
            'use strict';
            var i = t(10),
                o = t(109).f,
                r = t(110),
                a = t(17),
                s = t(39),
                l = t(12),
                c = t(16),
                u = function(e) {
                    var n = function(n, t, i) {
                        if (this instanceof e) {
                            switch (arguments.length) {
                                case 0:
                                    return new e();
                                case 1:
                                    return new e(n);
                                case 2:
                                    return new e(n, t);
                            }
                            return new e(n, t, i);
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
                    x = e.target,
                    _ = e.global,
                    w = e.stat,
                    v = e.proto,
                    b = _ ? i : w ? i[x] : (i[x] || {}).prototype,
                    E = _ ? a : a[x] || (a[x] = {}),
                    T = E.prototype;
                for (m in n)
                    (t = !r(_ ? m : x + (w ? '.' : '#') + m, e.forced) && b && c(b, m)),
                        (p = E[m]),
                        t && (g = e.noTargetGet ? (y = o(b, m)) && y.value : b[m]),
                        (f = t && g ? g : n[m]),
                        (t && typeof p == typeof f) ||
                            ((h =
                                e.bind && t
                                    ? s(f, i)
                                    : e.wrap && t
                                    ? u(f)
                                    : v && 'function' == typeof f
                                    ? s(Function.call, f)
                                    : f),
                            (e.sham || (f && f.sham) || (p && p.sham)) && l(h, 'sham', !0),
                            (E[m] = h),
                            v &&
                                (c(a, (d = x + 'Prototype')) || l(a, d, {}),
                                (a[d][m] = f),
                                e.real && T && !T[m] && l(T, m, f)));
            };
        },
        function(e, n, t) {
            e.exports = t(136);
        },
        function(e, n, t) {
            var i = t(10),
                o = t(32),
                r = t(48),
                a = t(114),
                s = i.Symbol,
                l = o('wks');
            e.exports = function(e) {
                return l[e] || (l[e] = (a && s[e]) || (a ? s : r)('Symbol.' + e));
            };
        },
        function(e, n, t) {
            e.exports = t(143);
        },
        function(e, n) {
            e.exports = function(e) {
                if (null == e) throw TypeError("Can't call method on " + e);
                return e;
            };
        },
        function(e, n) {
            var t = 'object',
                i = function(e) {
                    return e && e.Math == Math && e;
                };
            e.exports =
                i(typeof globalThis == t && globalThis) ||
                i(typeof window == t && window) ||
                i(typeof self == t && self) ||
                i(typeof window == t && window) ||
                Function('return this')();
        },
        function(e, n) {
            e.exports =
                "@font-face {\n    font-family: PayPal-Sans;\n    font-style: normal;\n    font-weight: 300;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Light.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Light.woff2') format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Light.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Light.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n\n@font-face {\n    font-family: PayPal-Sans;\n    font-style: normal;\n    font-weight: 400;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Regular.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Regular.woff2')\n            format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Regular.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Regular.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n\n@font-face {\n    font-family: PayPal-Sans;\n    font-style: normal;\n    font-weight: 500;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Medium.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Medium.woff2')\n            format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Medium.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Medium.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n\n@font-face {\n    font-family: PayPal-Sans;\n    font-style: normal;\n    font-weight: 700;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Bold.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Bold.woff2') format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Bold.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-small/1-0-0/PayPalSansSmall-Bold.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n\n@font-face {\n    font-family: PayPal-Sans-Big;\n    font-style: normal;\n    font-weight: 200;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Thin.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Thin.woff2') format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Thin.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Thin.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n\n@font-face {\n    font-family: PayPal-Sans-Big;\n    font-style: normal;\n    font-weight: 300;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Light.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Light.woff2') format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Light.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Light.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n\n@font-face {\n    font-family: PayPal-Sans-Big;\n    font-style: normal;\n    font-weight: 400;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Regular.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Regular.woff2') format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Regular.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Regular.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n\n@font-face {\n    font-family: PayPal-Sans-Big;\n    font-style: normal;\n    font-weight: 500;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Medium.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Medium.woff2') format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Medium.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Medium.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n\n@font-face {\n    font-family: PayPal-Sans-Big;\n    font-style: normal;\n    font-weight: 700;\n\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Bold.eot');\n    src: url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Bold.woff2') format('woff2'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Bold.woff') format('woff'),\n        url('https://www.paypalobjects.com/ui-web/paypal-sans-big/1-0-0/PayPalSansBig-Bold.svg#69ac2c9fc1e0803e59e06e93859bed03')\n            format('svg');\n}\n";
        },
        function(e, n, t) {
            var i = t(13),
                o = t(24),
                r = t(25);
            e.exports = i
                ? function(e, n, t) {
                      return o.f(e, n, r(1, t));
                  }
                : function(e, n, t) {
                      return (e[n] = t), e;
                  };
        },
        function(e, n, t) {
            var i = t(14);
            e.exports = !i(function() {
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
            var i = t(23),
                o = Math.min;
            e.exports = function(e) {
                return e > 0 ? o(i(e), 9007199254740991) : 0;
            };
        },
        function(e, n, t) {
            e.exports = t(41);
        },
        function(e, n, t) {
            e.exports = t(158);
        },
        function(e, n, t) {
            var i = t(15);
            e.exports = function(e) {
                if (!i(e)) throw TypeError(String(e) + ' is not an object');
                return e;
            };
        },
        function(e, n, t) {
            e.exports = t(160);
        },
        function(e, n) {
            var t = Math.ceil,
                i = Math.floor;
            e.exports = function(e) {
                return isNaN((e = +e)) ? 0 : (e > 0 ? i : t)(e);
            };
        },
        function(e, n, t) {
            var i = t(13),
                o = t(46),
                r = t(21),
                a = t(33),
                s = Object.defineProperty;
            n.f = i
                ? s
                : function(e, n, t) {
                      if ((r(e), (n = a(n, !0)), r(t), o))
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
            var i = t(38),
                o = t(9);
            e.exports = function(e) {
                return i(o(e));
            };
        },
        function(e, n) {
            var t = {}.toString;
            e.exports = function(e) {
                return t.call(e).slice(8, -1);
            };
        },
        function(e, n, t) {
            var i = t(9);
            e.exports = function(e) {
                return Object(i(e));
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
            var i = t(10),
                o = t(107),
                r = t(34),
                a = i['__core-js_shared__'] || o('__core-js_shared__', {});
            (e.exports = function(e, n) {
                return a[e] || (a[e] = void 0 !== n ? n : {});
            })('versions', []).push({
                version: '3.1.3',
                mode: r ? 'pure' : 'global',
                copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
            });
        },
        function(e, n, t) {
            var i = t(15);
            e.exports = function(e, n) {
                if (!i(e)) return e;
                var t, o;
                if (n && 'function' == typeof (t = e.toString) && !i((o = t.call(e)))) return o;
                if ('function' == typeof (t = e.valueOf) && !i((o = t.call(e)))) return o;
                if (!n && 'function' == typeof (t = e.toString) && !i((o = t.call(e)))) return o;
                throw TypeError("Can't convert object to primitive value");
            };
        },
        function(e, n) {
            e.exports = !0;
        },
        function(e, n, t) {
            var i = t(32),
                o = t(48),
                r = i('keys');
            e.exports = function(e) {
                return r[e] || (r[e] = o(e));
            };
        },
        function(e, n) {
            e.exports = {};
        },
        function(e, n, t) {
            'use strict';
            var i = {}.propertyIsEnumerable,
                o = Object.getOwnPropertyDescriptor,
                r = o && !i.call({ 1: 2 }, 1);
            n.f = r
                ? function(e) {
                      var n = o(this, e);
                      return !!n && n.enumerable;
                  }
                : i;
        },
        function(e, n, t) {
            var i = t(14),
                o = t(27),
                r = ''.split;
            e.exports = i(function() {
                return !Object('z').propertyIsEnumerable(0);
            })
                ? function(e) {
                      return 'String' == o(e) ? r.call(e, '') : Object(e);
                  }
                : Object;
        },
        function(e, n, t) {
            var i = t(111);
            e.exports = function(e, n, t) {
                if ((i(e), void 0 === n)) return e;
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
                        return function(t, i) {
                            return e.call(n, t, i);
                        };
                    case 3:
                        return function(t, i, o) {
                            return e.call(n, t, i, o);
                        };
                }
                return function() {
                    return e.apply(n, arguments);
                };
            };
        },
        function(e, n, t) {
            var i = t(117),
                o = t(52);
            e.exports =
                Object.keys ||
                function(e) {
                    return i(e, o);
                };
        },
        function(e, n, t) {
            var i = t(17),
                o = t(10),
                r = function(e) {
                    return 'function' == typeof e ? e : void 0;
                };
            e.exports = function(e, n) {
                return arguments.length < 2 ? r(i[e]) || r(o[e]) : (i[e] && i[e][n]) || (o[e] && o[e][n]);
            };
        },
        function(e, n, t) {
            var i = t(133);
            e.exports = function(e) {
                if (i(e)) throw TypeError("The method doesn't accept regular expressions");
                return e;
            };
        },
        function(e, n, t) {
            var i = t(7)('match');
            e.exports = function(e) {
                var n = /./;
                try {
                    '/./'[e](n);
                } catch (t) {
                    try {
                        return (n[i] = !1), '/./'[e](n);
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
            var i = t(13),
                o = t(14),
                r = t(47);
            e.exports =
                !i &&
                !o(function() {
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
            var i = t(10),
                o = t(15),
                r = i.document,
                a = o(r) && o(r.createElement);
            e.exports = function(e) {
                return a ? r.createElement(e) : {};
            };
        },
        function(e, n) {
            var t = 0,
                i = Math.random();
            e.exports = function(e) {
                return 'Symbol(' + String(void 0 === e ? '' : e) + ')_' + (++t + i).toString(36);
            };
        },
        function(e, n, t) {
            'use strict';
            var i,
                o,
                r,
                a = t(50),
                s = t(12),
                l = t(16),
                c = t(7),
                u = t(34),
                d = c('iterator'),
                m = !1;
            [].keys && ('next' in (r = [].keys()) ? (o = a(a(r))) !== Object.prototype && (i = o) : (m = !0)),
                null == i && (i = {}),
                u ||
                    l(i, d) ||
                    s(i, d, function() {
                        return this;
                    }),
                (e.exports = { IteratorPrototype: i, BUGGY_SAFARI_ITERATORS: m });
        },
        function(e, n, t) {
            var i = t(16),
                o = t(28),
                r = t(35),
                a = t(113),
                s = r('IE_PROTO'),
                l = Object.prototype;
            e.exports = a
                ? Object.getPrototypeOf
                : function(e) {
                      return (
                          (e = o(e)),
                          i(e, s)
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
            var i = t(26),
                o = t(18),
                r = t(118),
                a = function(e) {
                    return function(n, t, a) {
                        var s,
                            l = i(n),
                            c = o(l.length),
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
            var i = t(24).f,
                o = t(12),
                r = t(16),
                a = t(120),
                s = t(7)('toStringTag'),
                l = a !== {}.toString;
            e.exports = function(e, n, t, c) {
                if (e) {
                    var u = t ? e : e.prototype;
                    r(u, s) || i(u, s, { configurable: !0, value: n }), c && l && o(u, 'toString', a);
                }
            };
        },
        function(e, n, t) {
            var i = t(27),
                o = t(7)('toStringTag'),
                r =
                    'Arguments' ==
                    i(
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
                      })((n = Object(e)), o))
                    ? t
                    : r
                    ? i(n)
                    : 'Object' == (a = i(n)) && 'function' == typeof n.callee
                    ? 'Arguments'
                    : a;
            };
        },
        function(e, n, t) {
            var i = t(13),
                o = t(40),
                r = t(26),
                a = t(37).f,
                s = function(e) {
                    return function(n) {
                        for (var t, s = r(n), l = o(s), c = l.length, u = 0, d = []; c > u; )
                            (t = l[u++]), (i && !a.call(s, t)) || d.push(e ? [t, s[t]] : s[t]);
                        return d;
                    };
                };
            e.exports = { entries: s(!0), values: s(!1) };
        },
        function(e, n) {
            e.exports = function() {};
        },
        function(e, n, t) {
            e.exports = t(148);
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
            var i = t(17);
            e.exports = i.Array.from;
        },
        function(e, n, t) {
            'use strict';
            var i = t(103).charAt,
                o = t(104),
                r = t(108),
                a = o.set,
                s = o.getterFor('String Iterator');
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
                        o = n.index;
                    return o >= t.length
                        ? { value: void 0, done: !0 }
                        : ((e = i(t, o)), (n.index += e.length), { value: e, done: !1 });
                }
            );
        },
        function(e, n, t) {
            var i = t(23),
                o = t(9),
                r = function(e) {
                    return function(n, t) {
                        var r,
                            a,
                            s = String(o(n)),
                            l = i(t),
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
            var i,
                o,
                r,
                a = t(105),
                s = t(10),
                l = t(15),
                c = t(12),
                u = t(16),
                d = t(35),
                m = t(36);
            if (a) {
                var f = new (0, s.WeakMap)(),
                    p = f.get,
                    g = f.has,
                    h = f.set;
                (i = function(e, n) {
                    return h.call(f, e, n), n;
                }),
                    (o = function(e) {
                        return p.call(f, e) || {};
                    }),
                    (r = function(e) {
                        return g.call(f, e);
                    });
            } else {
                var y = d('state');
                (m[y] = !0),
                    (i = function(e, n) {
                        return c(e, y, n), n;
                    }),
                    (o = function(e) {
                        return u(e, y) ? e[y] : {};
                    }),
                    (r = function(e) {
                        return u(e, y);
                    });
            }
            e.exports = {
                set: i,
                get: o,
                has: r,
                enforce: function(e) {
                    return r(e) ? o(e) : i(e, {});
                },
                getterFor: function(e) {
                    return function(n) {
                        var t;
                        if (!l(n) || (t = o(n)).type !== e)
                            throw TypeError('Incompatible receiver, ' + e + ' required');
                        return t;
                    };
                }
            };
        },
        function(e, n, t) {
            var i = t(10),
                o = t(106),
                r = i.WeakMap;
            e.exports = 'function' == typeof r && /native code/.test(o.call(r));
        },
        function(e, n, t) {
            var i = t(32);
            e.exports = i('native-function-to-string', Function.toString);
        },
        function(e, n, t) {
            var i = t(10),
                o = t(12);
            e.exports = function(e, n) {
                try {
                    o(i, e, n);
                } catch (t) {
                    i[e] = n;
                }
                return n;
            };
        },
        function(e, n, t) {
            'use strict';
            var i = t(5),
                o = t(112),
                r = t(50),
                a = t(121),
                s = t(53),
                l = t(12),
                c = t(123),
                u = t(7),
                d = t(34),
                m = t(29),
                f = t(49),
                p = f.IteratorPrototype,
                g = f.BUGGY_SAFARI_ITERATORS,
                h = u('iterator'),
                y = function() {
                    return this;
                };
            e.exports = function(e, n, t, u, f, x, _) {
                o(t, n, u);
                var w,
                    v,
                    b,
                    E = function(e) {
                        if (e === f && L) return L;
                        if (!g && e in A) return A[e];
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
                    T = n + ' Iterator',
                    P = !1,
                    A = e.prototype,
                    R = A[h] || A['@@iterator'] || (f && A[f]),
                    L = (!g && R) || E(f),
                    S = ('Array' == n && A.entries) || R;
                if (
                    (S &&
                        ((w = r(S.call(new e()))),
                        p !== Object.prototype &&
                            w.next &&
                            (d || r(w) === p || (a ? a(w, p) : 'function' != typeof w[h] && l(w, h, y)),
                            s(w, T, !0, !0),
                            d && (m[T] = y))),
                    'values' == f &&
                        R &&
                        'values' !== R.name &&
                        ((P = !0),
                        (L = function() {
                            return R.call(this);
                        })),
                    (d && !_) || A[h] === L || l(A, h, L),
                    (m[n] = L),
                    f)
                )
                    if (((v = { values: E('values'), keys: x ? L : E('keys'), entries: E('entries') }), _))
                        for (b in v) (!g && !P && b in A) || c(A, b, v[b]);
                    else i({ target: n, proto: !0, forced: g || P }, v);
                return v;
            };
        },
        function(e, n, t) {
            var i = t(13),
                o = t(37),
                r = t(25),
                a = t(26),
                s = t(33),
                l = t(16),
                c = t(46),
                u = Object.getOwnPropertyDescriptor;
            n.f = i
                ? u
                : function(e, n) {
                      if (((e = a(e)), (n = s(n, !0)), c))
                          try {
                              return u(e, n);
                          } catch (e) {}
                      if (l(e, n)) return r(!o.f.call(e, n), e[n]);
                  };
        },
        function(e, n, t) {
            var i = t(14),
                o = /#|\.prototype\./,
                r = function(e, n) {
                    var t = s[a(e)];
                    return t == c || (t != l && ('function' == typeof n ? i(n) : !!n));
                },
                a = (r.normalize = function(e) {
                    return String(e)
                        .replace(o, '.')
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
            var i = t(49).IteratorPrototype,
                o = t(115),
                r = t(25),
                a = t(53),
                s = t(29),
                l = function() {
                    return this;
                };
            e.exports = function(e, n, t) {
                var c = n + ' Iterator';
                return (e.prototype = o(i, { next: r(1, t) })), a(e, c, !1, !0), (s[c] = l), e;
            };
        },
        function(e, n, t) {
            var i = t(14);
            e.exports = !i(function() {
                function e() {}
                return (e.prototype.constructor = null), Object.getPrototypeOf(new e()) !== e.prototype;
            });
        },
        function(e, n, t) {
            var i = t(14);
            e.exports =
                !!Object.getOwnPropertySymbols &&
                !i(function() {
                    return !String(Symbol());
                });
        },
        function(e, n, t) {
            var i = t(21),
                o = t(116),
                r = t(52),
                a = t(36),
                s = t(119),
                l = t(47),
                c = t(35)('IE_PROTO'),
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
                            ? ((u.prototype = i(e)), (t = new u()), (u.prototype = null), (t[c] = e))
                            : (t = d()),
                        void 0 === n ? t : o(t, n)
                    );
                }),
                (a[c] = !0);
        },
        function(e, n, t) {
            var i = t(13),
                o = t(24),
                r = t(21),
                a = t(40);
            e.exports = i
                ? Object.defineProperties
                : function(e, n) {
                      r(e);
                      for (var t, i = a(n), s = i.length, l = 0; s > l; ) o.f(e, (t = i[l++]), n[t]);
                      return e;
                  };
        },
        function(e, n, t) {
            var i = t(16),
                o = t(26),
                r = t(51).indexOf,
                a = t(36);
            e.exports = function(e, n) {
                var t,
                    s = o(e),
                    l = 0,
                    c = [];
                for (t in s) !i(a, t) && i(s, t) && c.push(t);
                for (; n.length > l; ) i(s, (t = n[l++])) && (~r(c, t) || c.push(t));
                return c;
            };
        },
        function(e, n, t) {
            var i = t(23),
                o = Math.max,
                r = Math.min;
            e.exports = function(e, n) {
                var t = i(e);
                return t < 0 ? o(t + n, 0) : r(t, n);
            };
        },
        function(e, n, t) {
            var i = t(41);
            e.exports = i('document', 'documentElement');
        },
        function(e, n, t) {
            'use strict';
            var i = t(54),
                o = {};
            (o[t(7)('toStringTag')] = 'z'),
                (e.exports =
                    '[object z]' !== String(o)
                        ? function() {
                              return '[object ' + i(this) + ']';
                          }
                        : o.toString);
        },
        function(e, n, t) {
            var i = t(21),
                o = t(122);
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
                              return i(t), o(r), n ? e.call(t, r) : (t.__proto__ = r), t;
                          };
                      })()
                    : void 0);
        },
        function(e, n, t) {
            var i = t(15);
            e.exports = function(e) {
                if (!i(e) && null !== e) throw TypeError("Can't set " + String(e) + ' as a prototype');
                return e;
            };
        },
        function(e, n, t) {
            var i = t(12);
            e.exports = function(e, n, t, o) {
                o && o.enumerable ? (e[n] = t) : i(e, n, t);
            };
        },
        function(e, n, t) {
            var i = t(5),
                o = t(125);
            i(
                {
                    target: 'Array',
                    stat: !0,
                    forced: !t(130)(function(e) {
                        Array.from(e);
                    })
                },
                { from: o }
            );
        },
        function(e, n, t) {
            'use strict';
            var i = t(39),
                o = t(28),
                r = t(126),
                a = t(127),
                s = t(18),
                l = t(128),
                c = t(129);
            e.exports = function(e) {
                var n,
                    t,
                    u,
                    d,
                    m = o(e),
                    f = 'function' == typeof this ? this : Array,
                    p = arguments.length,
                    g = p > 1 ? arguments[1] : void 0,
                    h = void 0 !== g,
                    y = 0,
                    x = c(m);
                if ((h && (g = i(g, p > 2 ? arguments[2] : void 0, 2)), null == x || (f == Array && a(x))))
                    for (t = new f((n = s(m.length))); n > y; y++) l(t, y, h ? g(m[y], y) : m[y]);
                else
                    for (d = x.call(m), t = new f(); !(u = d.next()).done; y++)
                        l(t, y, h ? r(d, g, [u.value, y], !0) : u.value);
                return (t.length = y), t;
            };
        },
        function(e, n, t) {
            var i = t(21);
            e.exports = function(e, n, t, o) {
                try {
                    return o ? n(i(t)[0], t[1]) : n(t);
                } catch (n) {
                    var r = e.return;
                    throw (void 0 !== r && i(r.call(e)), n);
                }
            };
        },
        function(e, n, t) {
            var i = t(7),
                o = t(29),
                r = i('iterator'),
                a = Array.prototype;
            e.exports = function(e) {
                return void 0 !== e && (o.Array === e || a[r] === e);
            };
        },
        function(e, n, t) {
            'use strict';
            var i = t(33),
                o = t(24),
                r = t(25);
            e.exports = function(e, n, t) {
                var a = i(n);
                a in e ? o.f(e, a, r(0, t)) : (e[a] = t);
            };
        },
        function(e, n, t) {
            var i = t(54),
                o = t(29),
                r = t(7)('iterator');
            e.exports = function(e) {
                if (null != e) return e[r] || e['@@iterator'] || o[i(e)];
            };
        },
        function(e, n, t) {
            var i = t(7)('iterator'),
                o = !1;
            try {
                var r = 0,
                    a = {
                        next: function() {
                            return { done: !!r++ };
                        },
                        return: function() {
                            o = !0;
                        }
                    };
                (a[i] = function() {
                    return this;
                }),
                    Array.from(a, function() {
                        throw 2;
                    });
            } catch (e) {}
            e.exports = function(e, n) {
                if (!n && !o) return !1;
                var t = !1;
                try {
                    var r = {};
                    (r[i] = function() {
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
            t(132);
            var i = t(19);
            e.exports = i('String', 'startsWith');
        },
        function(e, n, t) {
            'use strict';
            var i = t(5),
                o = t(18),
                r = t(42),
                a = t(9),
                s = t(43),
                l = ''.startsWith,
                c = Math.min;
            i(
                { target: 'String', proto: !0, forced: !s('startsWith') },
                {
                    startsWith: function(e) {
                        var n = String(a(this));
                        r(e);
                        var t = o(c(arguments.length > 1 ? arguments[1] : void 0, n.length)),
                            i = String(e);
                        return l ? l.call(n, i, t) : n.slice(t, t + i.length) === i;
                    }
                }
            );
        },
        function(e, n, t) {
            var i = t(15),
                o = t(27),
                r = t(7)('match');
            e.exports = function(e) {
                var n;
                return i(e) && (void 0 !== (n = e[r]) ? !!n : 'RegExp' == o(e));
            };
        },
        function(e, n, t) {
            t(135);
            var i = t(17);
            e.exports = i.Object.entries;
        },
        function(e, n, t) {
            var i = t(5),
                o = t(55).entries;
            i(
                { target: 'Object', stat: !0 },
                {
                    entries: function(e) {
                        return o(e);
                    }
                }
            );
        },
        function(e, n, t) {
            t(137);
            var i = t(19);
            e.exports = i('Array', 'find');
        },
        function(e, n, t) {
            'use strict';
            var i = t(5),
                o = t(138).find,
                r = t(56),
                a = !0;
            'find' in [] &&
                Array(1).find(function() {
                    a = !1;
                }),
                i(
                    { target: 'Array', proto: !0, forced: a },
                    {
                        find: function(e) {
                            return o(this, e, arguments.length > 1 ? arguments[1] : void 0);
                        }
                    }
                ),
                r('find');
        },
        function(e, n, t) {
            var i = t(39),
                o = t(38),
                r = t(28),
                a = t(18),
                s = t(139),
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
                                x,
                                _ = r(f),
                                w = o(_),
                                v = i(p, g, 3),
                                b = a(w.length),
                                E = 0,
                                T = h || s,
                                P = n ? T(f, b) : t ? T(f, 0) : void 0;
                            b > E;
                            E++
                        )
                            if ((m || E in w) && ((x = v((y = w[E]), E, _)), e))
                                if (n) P[E] = x;
                                else if (x)
                                    switch (e) {
                                        case 3:
                                            return !0;
                                        case 5:
                                            return y;
                                        case 6:
                                            return E;
                                        case 2:
                                            l.call(P, y);
                                    }
                                else if (u) return !1;
                        return d ? -1 : c || u ? u : P;
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
            var i = t(15),
                o = t(140),
                r = t(7)('species');
            e.exports = function(e, n) {
                var t;
                return (
                    o(e) &&
                        ('function' != typeof (t = e.constructor) || (t !== Array && !o(t.prototype))
                            ? i(t) && null === (t = t[r]) && (t = void 0)
                            : (t = void 0)),
                    new (void 0 === t ? Array : t)(0 === n ? 0 : n)
                );
            };
        },
        function(e, n, t) {
            var i = t(27);
            e.exports =
                Array.isArray ||
                function(e) {
                    return 'Array' == i(e);
                };
        },
        function(e, n, t) {
            t(142);
            var i = t(19);
            e.exports = i('Array', 'includes');
        },
        function(e, n, t) {
            'use strict';
            var i = t(5),
                o = t(51).includes,
                r = t(56);
            i(
                { target: 'Array', proto: !0 },
                {
                    includes: function(e) {
                        return o(this, e, arguments.length > 1 ? arguments[1] : void 0);
                    }
                }
            ),
                r('includes');
        },
        function(e, n, t) {
            t(144);
            var i = t(17);
            e.exports = i.Object.assign;
        },
        function(e, n, t) {
            var i = t(5),
                o = t(145);
            i({ target: 'Object', stat: !0, forced: Object.assign !== o }, { assign: o });
        },
        function(e, n, t) {
            'use strict';
            var i = t(13),
                o = t(14),
                r = t(40),
                a = t(146),
                s = t(37),
                l = t(28),
                c = t(38),
                u = Object.assign;
            e.exports =
                !u ||
                o(function() {
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
                          for (var t = l(e), o = arguments.length, u = 1, d = a.f, m = s.f; o > u; )
                              for (
                                  var f, p = c(arguments[u++]), g = d ? r(p).concat(d(p)) : r(p), h = g.length, y = 0;
                                  h > y;

                              )
                                  (f = g[y++]), (i && !m.call(p, f)) || (t[f] = p[f]);
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
                    function t(i) {
                        if (n[i]) return n[i].exports;
                        var o = (n[i] = { i: i, l: !1, exports: {} });
                        return e[i].call(o.exports, o, o.exports, t), (o.l = !0), o.exports;
                    }
                    return (
                        (t.m = e),
                        (t.c = n),
                        (t.d = function(e, n, i) {
                            t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: i });
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
                        function i(e) {
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
                        var o = [],
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
                                    var i = void 0,
                                        o = void 0,
                                        r = !1,
                                        a = !1,
                                        s = !1;
                                    c();
                                    try {
                                        n(
                                            function(e) {
                                                s ? t.resolve(e) : ((r = !0), (i = e));
                                            },
                                            function(e) {
                                                s ? t.reject(e) : ((a = !0), (o = e));
                                            }
                                        );
                                    } catch (e) {
                                        return u(), void this.reject(e);
                                    }
                                    u(), (s = !0), r ? this.resolve(i) : a && this.reject(o);
                                }
                            }
                            return (
                                (e.prototype.resolve = function(e) {
                                    if (this.resolved || this.rejected) return this;
                                    if (i(e)) throw new Error('Can not resolve promise with another promise');
                                    return (this.resolved = !0), (this.value = e), this.dispatch(), this;
                                }),
                                (e.prototype.reject = function(e) {
                                    var n = this;
                                    if (this.resolved || this.rejected) return this;
                                    if (i(e)) throw new Error('Can not reject promise with another promise');
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
                                                        if (-1 === o.indexOf(e)) {
                                                            o.push(e),
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
                                        o = this.rejected,
                                        r = this.handlers;
                                    if (!this.dispatching && (t || o)) {
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
                                                    else if (o) {
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
                                                        : i(d)
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
                                    var i = new e();
                                    return (
                                        this.handlers.push({ promise: i, onSuccess: n, onError: t }),
                                        (this.errorHandled = !0),
                                        this.dispatch(),
                                        i
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
                                    var i = setTimeout(function() {
                                        t.resolved ||
                                            t.rejected ||
                                            t.reject(n || new Error('Promise timed out after ' + e + 'ms'));
                                    }, e);
                                    return this.then(function(e) {
                                        return clearTimeout(i), e;
                                    });
                                }),
                                (e.prototype.toPromise = function() {
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
                                        r = [];
                                    if (!o) return t.resolve(r), t;
                                    for (
                                        var a = function(a) {
                                                var s = n[a];
                                                if (s instanceof e) {
                                                    if (s.resolved) return (r[a] = s.value), (o -= 1), 'continue';
                                                } else if (!i(s)) return (r[a] = s), (o -= 1), 'continue';
                                                e.resolve(s).then(
                                                    function(e) {
                                                        (r[a] = e), 0 == (o -= 1) && t.resolve(r);
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
                                    return 0 === o && t.resolve(r), t;
                                }),
                                (e.hash = function(n) {
                                    var t = {};
                                    return e
                                        .all(
                                            Object.keys(n).map(function(i) {
                                                return e.resolve(n[i]).then(function(e) {
                                                    t[i] = e;
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
                                (e.try = function(n, t, i) {
                                    if (n && 'function' != typeof n && !n.call)
                                        throw new Error('Promise.try expected a function');
                                    var o = void 0;
                                    c();
                                    try {
                                        o = n.apply(t, i || []);
                                    } catch (n) {
                                        return u(), e.reject(n);
                                    }
                                    return u(), e.resolve(o);
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
            t(149);
            var i = t(19);
            e.exports = i('String', 'padStart');
        },
        function(e, n, t) {
            'use strict';
            var i = t(5),
                o = t(150).start;
            i(
                { target: 'String', proto: !0, forced: t(152) },
                {
                    padStart: function(e) {
                        return o(this, e, arguments.length > 1 ? arguments[1] : void 0);
                    }
                }
            );
        },
        function(e, n, t) {
            var i = t(18),
                o = t(151),
                r = t(9),
                a = Math.ceil,
                s = function(e) {
                    return function(n, t, s) {
                        var l,
                            c,
                            u = String(r(n)),
                            d = u.length,
                            m = void 0 === s ? ' ' : String(s),
                            f = i(t);
                        return f <= d || '' == m
                            ? u
                            : ((c = o.call(m, a((l = f - d) / m.length))).length > l && (c = c.slice(0, l)),
                              e ? u + c : c + u);
                    };
                };
            e.exports = { start: s(!1), end: s(!0) };
        },
        function(e, n, t) {
            'use strict';
            var i = t(23),
                o = t(9);
            e.exports =
                ''.repeat ||
                function(e) {
                    var n = String(o(this)),
                        t = '',
                        r = i(e);
                    if (r < 0 || r == 1 / 0) throw RangeError('Wrong number of repetitions');
                    for (; r > 0; (r >>>= 1) && (n += n)) 1 & r && (t += n);
                    return t;
                };
        },
        function(e, n, t) {
            var i = t(153);
            e.exports = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(i);
        },
        function(e, n, t) {
            var i = t(41);
            e.exports = i('navigator', 'userAgent') || '';
        },
        function(e, n, t) {
            t(155);
            var i = t(17);
            e.exports = i.Object.values;
        },
        function(e, n, t) {
            var i = t(5),
                o = t(55).values;
            i(
                { target: 'Object', stat: !0 },
                {
                    values: function(e) {
                        return o(e);
                    }
                }
            );
        },
        function(e, n, t) {
            t(157);
            var i = t(19);
            e.exports = i('String', 'endsWith');
        },
        function(e, n, t) {
            'use strict';
            var i = t(5),
                o = t(18),
                r = t(42),
                a = t(9),
                s = t(43),
                l = ''.endsWith,
                c = Math.min;
            i(
                { target: 'String', proto: !0, forced: !s('endsWith') },
                {
                    endsWith: function(e) {
                        var n = String(a(this));
                        r(e);
                        var t = arguments.length > 1 ? arguments[1] : void 0,
                            i = o(n.length),
                            s = void 0 === t ? i : c(o(t), i),
                            u = String(e);
                        return l ? l.call(n, u, s) : n.slice(s - u.length, s) === u;
                    }
                }
            );
        },
        function(e, n, t) {
            t(159);
            var i = t(19);
            e.exports = i('String', 'includes');
        },
        function(e, n, t) {
            'use strict';
            var i = t(5),
                o = t(42),
                r = t(9);
            i(
                { target: 'String', proto: !0, forced: !t(43)('includes') },
                {
                    includes: function(e) {
                        return !!~String(r(this)).indexOf(o(e), arguments.length > 1 ? arguments[1] : void 0);
                    }
                }
            );
        },
        function(e, n, t) {
            t(161);
            var i = t(17);
            e.exports = i.Number.isNaN;
        },
        function(e, n, t) {
            t(5)(
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
            var i = {};
            function o() {
                return (o =
                    Object.assign ||
                    function(e) {
                        for (var n = 1; n < arguments.length; n++) {
                            var t = arguments[n];
                            for (var i in t) ({}.hasOwnProperty.call(t, i) && (e[i] = t[i]));
                        }
                        return e;
                    }).apply(this, arguments);
            }
            t.r(i),
                t.d(i, 'WeakMap', function() {
                    return z;
                });
            var r = t(2),
                a = t.n(r),
                s = t(1),
                l = t.n(s),
                c = t(4),
                u = t.n(c),
                d = t(6),
                m = t.n(d),
                f = t(3),
                p = t.n(f);
            function g(e, n) {
                if (null == e) return {};
                var t,
                    i,
                    o = {},
                    r = Object.keys(e);
                for (i = 0; i < r.length; i++) n.indexOf((t = r[i])) >= 0 || (o[t] = e[t]);
                return o;
            }
            var h = { MOCK: 'mock:', FILE: 'file:', ABOUT: 'about:' },
                y = 'Call was rejected by callee.\r\n';
            function x(e) {
                return void 0 === e && (e = window), e.location.protocol === h.ABOUT;
            }
            function _(e) {
                try {
                    return !0;
                } catch (e) {}
                return !1;
            }
            function w(e) {
                var n = (e = e || window).location;
                if (!n) throw new Error('Can not read window location');
                var t = n.protocol;
                if (!t) throw new Error('Can not read window protocol');
                if (t === h.FILE) return h.FILE + '//';
                if (t === h.ABOUT) {
                    var i = (function(e) {
                        if ((void 0 === e && (e = window), e))
                            try {
                                if (e.parent && e.parent !== e) return e.parent;
                            } catch (e) {}
                    })(e);
                    return i && _() ? w(i) : h.ABOUT + '//';
                }
                var o = n.host;
                if (!o) throw new Error('Can not read window host');
                return t + '//' + o;
            }
            function v(e) {
                var n = w((e = e || window));
                return n && e.mockDomain && 0 === e.mockDomain.indexOf(h.MOCK) ? e.mockDomain : n;
            }
            var b = [],
                E = [];
            function T(e, n) {
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
                    return !e || e.message !== y;
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
                                    if (x(e) && _()) return !0;
                                } catch (e) {}
                                try {
                                    if (w(e) === w(window)) return !0;
                                } catch (e) {}
                                return !1;
                            })(e)
                        )
                            return !1;
                        try {
                            if (e === window) return !0;
                            if (x(e) && _()) return !0;
                            if (v(window) === v(e)) return !0;
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
                })(b, e);
                if (-1 !== t) {
                    var i = E[t];
                    if (
                        i &&
                        (function(e) {
                            if (!e.contentWindow) return !0;
                            if (!e.parentNode) return !0;
                            var n = e.ownerDocument;
                            return !(!n || !n.documentElement || n.documentElement.contains(e));
                        })(i)
                    )
                        return !0;
                }
                return !1;
            }
            function P(e) {
                try {
                    if (e === window) return !0;
                } catch (e) {
                    if (e && e.message === y) return !0;
                }
                try {
                    if ('[object Window]' === {}.toString.call(e)) return !0;
                } catch (e) {
                    if (e && e.message === y) return !0;
                }
                try {
                    if (window.Window && e instanceof window.Window) return !0;
                } catch (e) {
                    if (e && e.message === y) return !0;
                }
                try {
                    if (e && e.self === e) return !0;
                } catch (e) {
                    if (e && e.message === y) return !0;
                }
                try {
                    if (e && e.parent === e) return !0;
                } catch (e) {
                    if (e && e.message === y) return !0;
                }
                try {
                    if (e && e.top === e) return !0;
                } catch (e) {
                    if (e && e.message === y) return !0;
                }
                try {
                    if (e && '__unlikely_value__' === e.__cross_domain_utils_window_check__) return !1;
                } catch (e) {
                    return !0;
                }
                return !1;
            }
            function A(e, n) {
                for (var t = 0; t < e.length; t++)
                    try {
                        if (e[t] === n) return t;
                    } catch (e) {}
                return -1;
            }
            var R,
                L = Object.defineProperty,
                S = Date.now() % 1e9,
                z = (function() {
                    function e() {
                        if (
                            ((this.name = void 0),
                            (this.weakmap = void 0),
                            (this.keys = void 0),
                            (this.values = void 0),
                            (S += 1),
                            (this.name = '__weakmap_' + ((1e9 * Math.random()) >>> 0) + '__' + S),
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
                                var i = n[t];
                                if (P(i) && T(i)) {
                                    if (e)
                                        try {
                                            e.delete(i);
                                        } catch (e) {}
                                    n.splice(t, 1), this.values.splice(t, 1), (t -= 1);
                                }
                            }
                        }),
                        (n.isSafeToReadWrite = function(e) {
                            return !P(e);
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
                                    var i = this.name,
                                        o = e[i];
                                    return void (o && o[0] === e
                                        ? (o[1] = n)
                                        : L(e, i, { value: [e, n], writable: !0 }));
                                } catch (e) {}
                            this._cleanupClosedWindows();
                            var r = this.keys,
                                a = this.values,
                                s = A(r, e);
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
                            var i = A(this.keys, e);
                            if (-1 !== i) return this.values[i];
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
                            var i = this.keys,
                                o = A(i, e);
                            -1 !== o && (i.splice(o, 1), this.values.splice(o, 1));
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
                            return this._cleanupClosedWindows(), -1 !== A(this.keys, e);
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
                (((R = {}).AD = ['en', 'fr', 'es', 'zh']),
                (R.AE = ['en', 'fr', 'es', 'zh', 'ar']),
                (R.AG = ['en', 'fr', 'es', 'zh']),
                (R.AI = ['en', 'fr', 'es', 'zh']),
                (R.AL = ['en']),
                (R.AM = ['en', 'fr', 'es', 'zh']),
                (R.AN = ['en', 'fr', 'es', 'zh']),
                (R.AO = ['en', 'fr', 'es', 'zh']),
                (R.AR = ['es', 'en']),
                (R.AT = ['de', 'en']),
                (R.AU = ['en']),
                (R.AW = ['en', 'fr', 'es', 'zh']),
                (R.AZ = ['en', 'fr', 'es', 'zh']),
                (R.BA = ['en']),
                (R.BB = ['en', 'fr', 'es', 'zh']),
                (R.BE = ['en', 'nl', 'fr']),
                (R.BF = ['fr', 'en', 'es', 'zh']),
                (R.BG = ['en']),
                (R.BH = ['ar', 'en', 'fr', 'es', 'zh']),
                (R.BI = ['fr', 'en', 'es', 'zh']),
                (R.BJ = ['fr', 'en', 'es', 'zh']),
                (R.BM = ['en', 'fr', 'es', 'zh']),
                (R.BN = ['en']),
                (R.BO = ['es', 'en', 'fr', 'zh']),
                (R.BR = ['pt', 'en']),
                (R.BS = ['en', 'fr', 'es', 'zh']),
                (R.BT = ['en']),
                (R.BW = ['en', 'fr', 'es', 'zh']),
                (R.BY = ['en']),
                (R.BZ = ['en', 'es', 'fr', 'zh']),
                (R.CA = ['en', 'fr']),
                (R.CD = ['fr', 'en', 'es', 'zh']),
                (R.CG = ['en', 'fr', 'es', 'zh']),
                (R.CH = ['de', 'fr', 'en']),
                (R.CI = ['fr', 'en']),
                (R.CK = ['en', 'fr', 'es', 'zh']),
                (R.CL = ['es', 'en', 'fr', 'zh']),
                (R.CM = ['fr', 'en']),
                (R.CN = ['zh']),
                (R.CO = ['es', 'en', 'fr', 'zh']),
                (R.CR = ['es', 'en', 'fr', 'zh']),
                (R.CV = ['en', 'fr', 'es', 'zh']),
                (R.CY = ['en']),
                (R.CZ = ['cs', 'en', 'fr', 'es', 'zh']),
                (R.DE = ['de', 'en']),
                (R.DJ = ['fr', 'en', 'es', 'zh']),
                (R.DK = ['da', 'en']),
                (R.DM = ['en', 'fr', 'es', 'zh']),
                (R.DO = ['es', 'en', 'fr', 'zh']),
                (R.DZ = ['ar', 'en', 'fr', 'es', 'zh']),
                (R.EC = ['es', 'en', 'fr', 'zh']),
                (R.EE = ['en', 'ru', 'fr', 'es', 'zh']),
                (R.EG = ['ar', 'en', 'fr', 'es', 'zh']),
                (R.ER = ['en', 'fr', 'es', 'zh']),
                (R.ES = ['es', 'en']),
                (R.ET = ['en', 'fr', 'es', 'zh']),
                (R.FI = ['fi', 'en', 'fr', 'es', 'zh']),
                (R.FJ = ['en', 'fr', 'es', 'zh']),
                (R.FK = ['en', 'fr', 'es', 'zh']),
                (R.FM = ['en']),
                (R.FO = ['da', 'en', 'fr', 'es', 'zh']),
                (R.FR = ['fr', 'en']),
                (R.GA = ['fr', 'en', 'es', 'zh']),
                (R.GB = ['en']),
                (R.GD = ['en', 'fr', 'es', 'zh']),
                (R.GE = ['en', 'fr', 'es', 'zh']),
                (R.GF = ['en', 'fr', 'es', 'zh']),
                (R.GI = ['en', 'fr', 'es', 'zh']),
                (R.GL = ['da', 'en', 'fr', 'es', 'zh']),
                (R.GM = ['en', 'fr', 'es', 'zh']),
                (R.GN = ['fr', 'en', 'es', 'zh']),
                (R.GP = ['en', 'fr', 'es', 'zh']),
                (R.GR = ['el', 'en', 'fr', 'es', 'zh']),
                (R.GT = ['es', 'en', 'fr', 'zh']),
                (R.GW = ['en', 'fr', 'es', 'zh']),
                (R.GY = ['en', 'fr', 'es', 'zh']),
                (R.HK = ['en', 'zh']),
                (R.HN = ['es', 'en', 'fr', 'zh']),
                (R.HR = ['en']),
                (R.HU = ['hu', 'en', 'fr', 'es', 'zh']),
                (R.ID = ['id', 'en']),
                (R.IE = ['en', 'fr', 'es', 'zh']),
                (R.IL = ['he', 'en']),
                (R.IN = ['en']),
                (R.IS = ['en']),
                (R.IT = ['it', 'en']),
                (R.JM = ['en', 'es', 'fr', 'zh']),
                (R.JO = ['ar', 'en', 'fr', 'es', 'zh']),
                (R.JP = ['ja', 'en']),
                (R.KE = ['en', 'fr', 'es', 'zh']),
                (R.KG = ['en', 'fr', 'es', 'zh']),
                (R.KH = ['en']),
                (R.KI = ['en', 'fr', 'es', 'zh']),
                (R.KM = ['fr', 'en', 'es', 'zh']),
                (R.KN = ['en', 'fr', 'es', 'zh']),
                (R.KR = ['ko', 'en']),
                (R.KW = ['ar', 'en', 'fr', 'es', 'zh']),
                (R.KY = ['en', 'fr', 'es', 'zh']),
                (R.KZ = ['en', 'fr', 'es', 'zh']),
                (R.LA = ['en']),
                (R.LC = ['en', 'fr', 'es', 'zh']),
                (R.LI = ['en', 'fr', 'es', 'zh']),
                (R.LK = ['en']),
                (R.LS = ['en', 'fr', 'es', 'zh']),
                (R.LT = ['en', 'ru', 'fr', 'es', 'zh']),
                (R.LU = ['en', 'de', 'fr', 'es', 'zh']),
                (R.LV = ['en', 'ru', 'fr', 'es', 'zh']),
                (R.MA = ['ar', 'en', 'fr', 'es', 'zh']),
                (R.MC = ['fr', 'en']),
                (R.MD = ['en']),
                (R.ME = ['en']),
                (R.MG = ['en', 'fr', 'es', 'zh']),
                (R.MH = ['en', 'fr', 'es', 'zh']),
                (R.MK = ['en']),
                (R.ML = ['fr', 'en', 'es', 'zh']),
                (R.MN = ['en']),
                (R.MQ = ['en', 'fr', 'es', 'zh']),
                (R.MR = ['en', 'fr', 'es', 'zh']),
                (R.MS = ['en', 'fr', 'es', 'zh']),
                (R.MT = ['en']),
                (R.MU = ['en', 'fr', 'es', 'zh']),
                (R.MV = ['en']),
                (R.MW = ['en', 'fr', 'es', 'zh']),
                (R.MX = ['es', 'en']),
                (R.MY = ['en']),
                (R.MZ = ['en', 'fr', 'es', 'zh']),
                (R.NA = ['en', 'fr', 'es', 'zh']),
                (R.NC = ['en', 'fr', 'es', 'zh']),
                (R.NE = ['fr', 'en', 'es', 'zh']),
                (R.NF = ['en', 'fr', 'es', 'zh']),
                (R.NG = ['en']),
                (R.NI = ['es', 'en', 'fr', 'zh']),
                (R.NL = ['nl', 'en']),
                (R.NO = ['no', 'en']),
                (R.NP = ['en']),
                (R.NR = ['en', 'fr', 'es', 'zh']),
                (R.NU = ['en', 'fr', 'es', 'zh']),
                (R.NZ = ['en', 'fr', 'es', 'zh']),
                (R.OM = ['ar', 'en', 'fr', 'es', 'zh']),
                (R.PA = ['es', 'en', 'fr', 'zh']),
                (R.PE = ['es', 'en', 'fr', 'zh']),
                (R.PF = ['en', 'fr', 'es', 'zh']),
                (R.PG = ['en', 'fr', 'es', 'zh']),
                (R.PH = ['en']),
                (R.PL = ['pl', 'en']),
                (R.PM = ['en', 'fr', 'es', 'zh']),
                (R.PN = ['en', 'fr', 'es', 'zh']),
                (R.PT = ['pt', 'en']),
                (R.PW = ['en', 'fr', 'es', 'zh']),
                (R.PY = ['es', 'en']),
                (R.QA = ['en', 'fr', 'es', 'zh', 'ar']),
                (R.RE = ['en', 'fr', 'es', 'zh']),
                (R.RO = ['en', 'fr', 'es', 'zh']),
                (R.RS = ['en', 'fr', 'es', 'zh']),
                (R.RU = ['ru', 'en']),
                (R.RW = ['fr', 'en', 'es', 'zh']),
                (R.SA = ['ar', 'en', 'fr', 'es', 'zh']),
                (R.SB = ['en', 'fr', 'es', 'zh']),
                (R.SC = ['fr', 'en', 'es', 'zh']),
                (R.SE = ['sv', 'en']),
                (R.SG = ['en']),
                (R.SH = ['en', 'fr', 'es', 'zh']),
                (R.SI = ['en', 'fr', 'es', 'zh']),
                (R.SJ = ['en', 'fr', 'es', 'zh']),
                (R.SK = ['sk', 'en', 'fr', 'es', 'zh']),
                (R.SL = ['en', 'fr', 'es', 'zh']),
                (R.SM = ['en', 'fr', 'es', 'zh']),
                (R.SN = ['fr', 'en', 'es', 'zh']),
                (R.SO = ['en', 'fr', 'es', 'zh']),
                (R.SR = ['en', 'fr', 'es', 'zh']),
                (R.ST = ['en', 'fr', 'es', 'zh']),
                (R.SV = ['es', 'en', 'fr', 'zh']),
                (R.SZ = ['en', 'fr', 'es', 'zh']),
                (R.TC = ['en', 'fr', 'es', 'zh']),
                (R.TD = ['fr', 'en', 'es', 'zh']),
                (R.TG = ['fr', 'en', 'es', 'zh']),
                (R.TH = ['th', 'en']),
                (R.TJ = ['en', 'fr', 'es', 'zh']),
                (R.TM = ['en', 'fr', 'es', 'zh']),
                (R.TN = ['ar', 'en', 'fr', 'es', 'zh']),
                (R.TO = ['en']),
                (R.TR = ['tr', 'en']),
                (R.TT = ['en', 'fr', 'es', 'zh']),
                (R.TV = ['en', 'fr', 'es', 'zh']),
                (R.TW = ['zh', 'en']),
                (R.TZ = ['en', 'fr', 'es', 'zh']),
                (R.UA = ['en', 'ru', 'fr', 'es', 'zh']),
                (R.UG = ['en', 'fr', 'es', 'zh']),
                (R.US = ['en', 'fr', 'es', 'zh']),
                (R.UY = ['es', 'en', 'fr', 'zh']),
                (R.VA = ['en', 'fr', 'es', 'zh']),
                (R.VC = ['en', 'fr', 'es', 'zh']),
                (R.VE = ['es', 'en', 'fr', 'zh']),
                (R.VG = ['en', 'fr', 'es', 'zh']),
                (R.VN = ['en']),
                (R.VU = ['en', 'fr', 'es', 'zh']),
                (R.WF = ['en', 'fr', 'es', 'zh']),
                (R.WS = ['en']),
                (R.YE = ['ar', 'en', 'fr', 'es', 'zh']),
                (R.YT = ['en', 'fr', 'es', 'zh']),
                (R.ZA = ['en', 'fr', 'es', 'zh']),
                (R.ZM = ['en', 'fr', 'es', 'zh']),
                (R.ZW = ['en']),
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
            var O = t(8),
                I = t.n(O);
            function C(e) {
                var n = new Map();
                return function() {
                    for (var t = arguments.length, i = new Array(t), o = 0; o < t; o++) i[o] = arguments[o];
                    var r = JSON.stringify(i);
                    return n.has(r) || n.set(r, e.apply(void 0, i)), n.get(r);
                };
            }
            function N(e, n) {
                var t = new Map();
                return function(i, o) {
                    void 0 === o && (o = !1);
                    var r = JSON.stringify(
                        n.map(function(e) {
                            return i[e];
                        })
                    );
                    return (t.has(r) && !o) || t.set(r, e(i)), t.get(r);
                };
            }
            function M(e) {
                for (var n = arguments.length, t = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
                    t[i - 1] = arguments[i];
                return function() {
                    for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
                    return e.apply(void 0, t.concat(i));
                };
            }
            function k(e, n) {
                return (
                    void 0 === n && (n = e.length),
                    function t() {
                        for (var i = arguments.length, o = new Array(i), r = 0; r < i; r++) o[r] = arguments[r];
                        return o.length < n
                            ? function() {
                                  for (var e = arguments.length, n = new Array(e), i = 0; i < e; i++)
                                      n[i] = arguments[i];
                                  return t.apply(void 0, o.concat(n));
                              }
                            : e.apply(void 0, o);
                    }
                );
            }
            function W(e) {
                return function(n) {
                    var t = e(n);
                    return 'object' == typeof t && t.then
                        ? t.then(function() {
                              return n;
                          })
                        : n;
                };
            }
            function j() {
                for (var e = arguments.length, n = new Array(e), t = 0; t < e; t++) n[t] = arguments[t];
                return function(e) {
                    return n.reduce(function(e, n) {
                        return n(e);
                    }, e);
                };
            }
            function H(e) {
                void 0 === e && (e = {});
                var n = o({}, e);
                return [n, M(I.a, n)];
            }
            function B(e) {
                return u()(e).reduce(function(e, n) {
                    var t,
                        i,
                        r,
                        a = n[0],
                        s = n[1];
                    return Array.isArray(s)
                        ? o({}, e, (((i = {})[a] = [].concat(s)), i))
                        : o({}, e, 'object' == typeof s ? (((r = {})[a] = B(s)), r) : (((t = {})[a] = s), t));
                }, {});
            }
            function Y(e, n) {
                return (function e(n, t) {
                    return u()(t).reduce(function(t, i) {
                        var r,
                            a,
                            s,
                            l,
                            c = i[0],
                            u = i[1];
                        return Array.isArray(u)
                            ? o({}, t, (((a = {})[c] = [].concat(u)), a))
                            : 'object' != typeof u ||
                              null === u ||
                              (n[c] && 'object' == typeof n[c] && !Array.isArray(n[c]))
                            ? o(
                                  {},
                                  t,
                                  'object' == typeof u && null !== u
                                      ? (((l = {})[c] = e(n[c], u)), l)
                                      : (((r = {})[c] = u), r)
                              )
                            : o({}, t, (((s = {})[c] = B(u)), s));
                    }, n);
                })(B(e), n);
            }
            function D(e, n) {
                return n.split('.').reduce(function(e, n) {
                    return 'object' == typeof e || 'function' == typeof e ? e[n] : void 0;
                }, e);
            }
            function U(e, n, t) {
                var i;
                void 0 === t && (t = '-');
                var o,
                    r = e.indexOf(t);
                if (-1 === r) return ((o = {})[e] = n), o;
                var a = e.slice(0, r),
                    s = e.slice(r + 1);
                return ((i = {})[a] = U(s, n)), i;
            }
            function G(e) {
                return 'object' == typeof HTMLElement
                    ? e instanceof HTMLElement
                    : e && 'object' == typeof e && null !== e && 1 === e.nodeType && 'string' == typeof e.nodeName;
            }
            var F = H(window.__paypal_messages_state__ || { nextId: 1, config: {} }),
                V = F[0],
                Z = F[1];
            Object.defineProperty(window, '__paypal_messages_state__', {
                value: V,
                enumerable: !1,
                configurable: !0,
                writable: !1
            });
            var K = t(0),
                J = t(57),
                q = t.n(J),
                Q = k(function(e, n, t) {
                    var i = e.uuid,
                        r = e.urls;
                    void 0 === t && (t = !1);
                    var a = new window.Image();
                    if ('object' == typeof n) {
                        var s = o({}, n, { uuid: t ? i + '::banner.hidden:true' : i }),
                            l = u()(s).reduce(function(e, n) {
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
                $ = {
                    MESSAGE_OVERFLOW: 'MESSAGE_OVERFLOW',
                    MESSAGE_HIDDEN: 'MESSAGE_HIDDEN',
                    MESSAGE_INVALID_LEGACY: 'MESSAGE_INVALID_LEGACY',
                    MESSAGE_INVALID_MARKUP: 'MESSAGE_INVALID_MARKUP',
                    MODAL_FAIL: 'MODAL_FAIL',
                    CUSTOM_TEMPLATE_FAIL: 'CUSTOM_TEMPLATE_FAIL',
                    CUSTOM_JSON_OPTIONS_FAIL: 'CUSTOM_JSON_OPTIONS_FAIL'
                },
                ee = {
                    create: function(e) {
                        var n = e.id,
                            t = e.selector,
                            i = e.type,
                            r = H({ count: 1, account: e.account, history: [], logs: [] }),
                            a = r[0],
                            s = r[1],
                            l = {
                                start: function(e) {
                                    D(e, 'options.account') &&
                                        a.account !== e.options.account &&
                                        s({ account: e.account }),
                                        l.info(X.START, o({ t: Date.now() }, e));
                                },
                                end: function(e) {
                                    l.info(X.END, o({ t: Date.now() }, e)),
                                        (function() {
                                            if (!(a.count > 3)) {
                                                var e,
                                                    r = m()(a.logs, function(e) {
                                                        var n = e.event;
                                                        return 'Create' === n || 'Update' === n;
                                                    }),
                                                    l = {
                                                        version: '1.0.3',
                                                        url: window.location.href,
                                                        selector: t,
                                                        type: i + (r ? '-' + r.event : ''),
                                                        id: n + '-' + q()(a.count, 4, '0'),
                                                        account: a.account,
                                                        history: a.history,
                                                        events:
                                                            ((e = a.logs),
                                                            e.map(function(e) {
                                                                var n = e.event,
                                                                    t = o({}, e);
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
                                    void 0 === n && (n = {}), s({ logs: [].concat(a.logs, [o({ event: e }, n)]) });
                                },
                                error: function(e) {
                                    l.info(X.ERROR, e);
                                },
                                track: Q,
                                warn: function() {
                                    for (var e, n = arguments.length, t = new Array(n), i = 0; i < n; i++)
                                        t[i] = arguments[i];
                                    (e = console).warn.apply(e, ['[PayPal Messages]'].concat(t));
                                }
                            };
                        return l;
                    },
                    warn: function() {
                        for (var e, n = arguments.length, t = new Array(n), i = 0; i < n; i++) t[i] = arguments[i];
                        (e = console).warn.apply(e, ['[PayPal Messages]'].concat(t));
                    }
                },
                ne = C(function(e) {
                    var n,
                        t = e.markup;
                    return K.ZalgoPromise.resolve(
                        l()(t, 'https://www.paypalobjects.com')
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
            var te = { US: 'en_US', GB: 'en_GB', FR: 'fr_FR', DE: 'de_DE' };
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
                    throw new Error($.MESSAGE_INVALID_MARKUP);
                }
            }
            function oe(e, n) {
                var t = n.match(/^<!--([\s\S]+?)-->/);
                if (t)
                    try {
                        return JSON.parse(t[1]);
                    } catch (n) {
                        e.error({ name: $.CUSTOM_JSON_OPTIONS_FAIL });
                    }
                return {};
            }
            var re = N(
                function(e) {
                    var n = e.account,
                        t = e.amount,
                        i = e.countryCode;
                    return new K.ZalgoPromise(function(e) {
                        var o = 'c' + Math.floor(Math.random() * Math.pow(10, 19)),
                            r = {
                                dimensions: 'x200x51',
                                currency_value: t,
                                currency_code: 'USD',
                                format: 'HTML',
                                presentation_types: 'HTML',
                                ch: 'UPSTREAM',
                                call: '__PP.' + o
                            };
                        i && te[i] && ((r.country_code = i), (r.locale = te[i]));
                        var a = u()(r)
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
                            (s.src = 'https://www.paypal.com/imadserver/upstream?' + a),
                            document.head.appendChild(s),
                            (window.__PP[o] = function(n) {
                                if ((document.head.removeChild(s), delete window.__PP[o], 'object' == typeof n))
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
            function ae(e) {
                var n = e.options,
                    t = e.logger;
                return (
                    t.info(X.FETCH_START),
                    ('custom' !== D(n, 'style.layout')
                        ? re(n).then(M(I.a, { options: n }))
                        : K.ZalgoPromise.all([re(n), ne(n.style)]).then(function(e) {
                              var i = e[0],
                                  o = e[1];
                              return 'object' == typeof i.markup
                                  ? ('' === o && t.error({ name: $.CUSTOM_TEMPLATE_FAIL }),
                                    (i.markup.template = o),
                                    { markup: i.markup, options: Y(n, oe(t, o)) })
                                  : { markup: i.markup, options: n };
                          })
                    ).then(
                        W(function(e) {
                            t.info(X.FETCH_END),
                                (e.options.style._flattened = (function e(n, t, i) {
                                    return (
                                        void 0 === t && (t = ''),
                                        void 0 === i && (i = ':'),
                                        u()(n).reduce(function(n, o) {
                                            var r = o[0],
                                                a = o[1];
                                            switch (typeof a) {
                                                case 'object':
                                                    return [].concat(n, e(a, '' + t + r + '.'));
                                                case 'string':
                                                default:
                                                    return [].concat(n, ['' + t + r + i + a]);
                                            }
                                        }, [])
                                    );
                                })(e.options.style));
                        })
                    )
                );
            }
            var se = t(30),
                le = t.n(se),
                ce = { click: new Map(), message: new Map(), scroll: new Map(), hover: new Map(), resize: new Map() };
            function ue(e) {
                e.origin === window.top.location.origin &&
                    e.source === (e.source.frameElement && e.source.frameElement.contentWindow) &&
                    ce.message.has(e.source.frameElement) &&
                    ce.message.get(e.source.frameElement)(e);
            }
            function de(e) {
                ce.resize.has(e.target.frameElement) && ce.resize.get(e.target.frameElement)(e);
            }
            function me(e) {
                ce.scroll.forEach(function(n) {
                    return n(e);
                });
            }
            function fe(e) {
                ce.hover.has(e.target) && ce.hover.get(e.target)(e);
            }
            function pe(e) {
                e.target.ownerDocument && ce.click.has(e.target.ownerDocument.defaultView.frameElement)
                    ? ce.click.get(e.target.ownerDocument.defaultView.frameElement)(e)
                    : ce.click.has(e.currentTarget) && ce.click.get(e.currentTarget)(e);
            }
            function ge(e) {
                return {
                    on: function(n, t) {
                        ('IFRAME' === e.tagName || ('resize' !== n && 'message' !== n)) &&
                            (function(e, n, t) {
                                if (
                                    ((function(e, n) {
                                        'scroll' === e && 0 === ce.scroll.size
                                            ? window.addEventListener('scroll', me)
                                            : 'hover' === e && 0 === ce.hover.size
                                            ? document.addEventListener('mouseover', fe)
                                            : 'message' === e && 0 === ce.message.size
                                            ? window.addEventListener('message', ue)
                                            : 'resize' !== e || ce[e].has(n)
                                            ? 'click' !== e ||
                                              ce[e].has(n) ||
                                              ('IFRAME' === n.tagName
                                                  ? n.contentWindow.document.body.addEventListener('click', pe)
                                                  : n.addEventListener('click', pe))
                                            : n.contentWindow.addEventListener('resize', de);
                                    })(e, n),
                                    ce[e].has(n))
                                ) {
                                    var i = ce[e].get(n);
                                    ce[e].set(n, function(e) {
                                        i(e), t(e);
                                    });
                                } else ce[e].set(n, t);
                            })(n, e, t);
                    },
                    clear: function(n) {
                        ce[n].delete(e),
                            'scroll' === n && 0 === ce.scroll.size
                                ? window.removeEventListener('scroll', me)
                                : 'hover' === n && 0 === ce.hover.size
                                ? document.removeEventListener('mouseover', fe)
                                : 'click' === n
                                ? 'IFRAME' === e.tagName
                                    ? e.contentWindow.removeEventListener('click', pe)
                                    : e.removeEventListener('click', pe)
                                : 'IFRAME' === e.tagName &&
                                  ('resize' === n
                                      ? e.contentWindow.removeEventListener('resize', de)
                                      : 'message' === n &&
                                        0 === ce.message.size &&
                                        window.removeEventListener('message', ue));
                    }
                };
            }
            var he = t(58),
                ye = t.n(he),
                xe = t(20),
                _e = t.n(xe),
                we = t(59),
                ve = t.n(we),
                be = t(60),
                Ee = t.n(be),
                Te = t(31),
                Pe = t.n(Te),
                Ae = t(11),
                Re = t.n(Ae),
                Le = t(61),
                Se = t.n(Le),
                ze = t(62),
                Oe = t.n(ze),
                Ie = t(44),
                Ce = t.n(Ie),
                Ne = t(63),
                Me = t.n(Ne),
                ke = t(64),
                We = t.n(ke),
                je = t(65),
                He = t.n(je),
                Be = t(66),
                Ye = t.n(Be),
                De = t(67),
                Ue = t.n(De),
                Ge = t(68),
                Fe = t.n(Ge),
                Ve = [
                    ['default', [Re.a, Pe.a, Se.a].join('\n')],
                    ['logo.type:primary', Ye.a],
                    ['logo.type:alternative', Oe.a],
                    ['logo.type:inline', Ce.a],
                    ['logo.type:none', [Ce.a, Me.a].join('\n')],
                    ['logo.position:right', We.a],
                    ['logo.position:top', He.a],
                    ['logo.type:alternative && logo.position:top', Ue.a],
                    ['text.color:white', Fe.a]
                ],
                Ze = t(69),
                Ke = t.n(Ze),
                Je = t(70),
                qe = t.n(Je),
                Qe = t(71),
                Xe = t.n(Qe),
                $e = t(45),
                en = t.n($e),
                nn = t(72),
                tn = t.n(nn),
                on = t(73),
                rn = t.n(on),
                an = t(74),
                sn = t.n(an),
                ln = t(75),
                cn = t.n(ln),
                un = t(76),
                dn = t.n(un),
                mn = t(77),
                fn = t.n(mn),
                pn = t(78),
                gn = t.n(pn),
                hn = t(79),
                yn = t.n(hn),
                xn = [
                    ['default', [Re.a, Pe.a, Ke.a].join('\n')],
                    ['ratio:1x1', qe.a],
                    ['ratio:1x4', Xe.a],
                    ['ratio:8x1', [en.a, tn.a].join('\n')],
                    ['ratio:20x1', [en.a, rn.a].join('\n')],
                    ['color:blue', sn.a],
                    ['color:gray', cn.a],
                    ['color:black', fn.a],
                    ['color:white', gn.a],
                    ['color:white-no-border', yn.a],
                    ['color:blue && ratio:1x4', dn.a]
                ],
                _n = t(80),
                wn = t.n(_n),
                vn = t(81),
                bn = t.n(vn),
                En = t(82),
                Tn = t.n(En),
                Pn = t(83),
                An = t.n(Pn),
                Rn = t(84),
                Ln = t.n(Rn),
                Sn = t(85),
                zn = t.n(Sn),
                On = t(86),
                In = t.n(On),
                Cn = t(87),
                Nn = t.n(Cn),
                Mn = t(88),
                kn = t.n(Mn),
                Wn = t(89),
                jn = t.n(Wn),
                Hn = t(90),
                Bn = t.n(Hn),
                Yn = t(91),
                Dn = t.n(Yn),
                Un = t(92),
                Gn = t.n(Un),
                Fn = t(93),
                Vn = t.n(Fn),
                Zn = t(94),
                Kn = t.n(Zn),
                Jn = t(95),
                qn = t.n(Jn),
                Qn = t(96),
                Xn = t.n(Qn),
                $n = t(97),
                et = t.n($n),
                nt = t(98),
                tt = t.n(nt),
                it = t(99),
                ot = {
                    x168x374: { styles: zn.a, vertical: !0 },
                    x765x60: { styles: kn.a },
                    x1000x50: { styles: jn.a, termsIcon: !0 },
                    x234x100: { styles: In.a, reverseLogo: !0 },
                    x310x100: { styles: Nn.a, reverseLogo: !0 },
                    x1000x36: { styles: Bn.a, termsIcon: !0 },
                    x120x90: { styles: Gn.a, termsIcon: !0 },
                    x234x60: { styles: Vn.a, reverseLogo: !0, termsIcon: !0 },
                    x250x250: { styles: Kn.a, reverseLogo: !0, vertical: !0, termsIcon: !0 },
                    x300x50: { styles: qn.a, reverseLogo: !0 },
                    x340x60: { styles: Dn.a, reverseLogo: !0 },
                    x468x60: { styles: Xn.a, reverseLogo: !0, termsIcon: !0 },
                    x728x90: { styles: et.a, reverseLogo: !0 },
                    x540x200: { styles: tt.a, reverseLogo: !0, termsIcon: !0 },
                    x170x100: { styles: t.n(it).a, termsIcon: !0 }
                },
                rt = Object.keys(ot).map(function(e) {
                    var n = ot[e],
                        t = e.slice(1),
                        i = t.split('x'),
                        o = i[1],
                        r =
                            '\n        .message {\n            width: ' +
                            i[0] +
                            'px;\n            min-height: ' +
                            o +
                            'px;\n        }\n\n        .message__container {\n            min-height: ' +
                            o +
                            'px;\n        }\n    ';
                    return (
                        n.vertical && (r = '' + r + Tn.a),
                        n.reverseLogo && (r = '' + r + bn.a),
                        n.vertical && n.reverseLogo && (r = '' + r + An.a),
                        n.termsIcon && (r = '' + r + Ln.a),
                        ['size:' + t, r]
                    );
                }),
                at = Object.keys(ot).map(function(e) {
                    return ['size:' + e.slice(1), ot[e].styles];
                }),
                st = [['default', [Re.a, wn.a].join('\n')]].concat(rt, at),
                lt = t(100),
                ct = {
                    'layout:text': Ve,
                    'layout:flex': xn,
                    'layout:legacy': st,
                    'layout:custom': [['default', [Re.a, t.n(lt).a].join('\n')]]
                },
                ut = {
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
            function dt(e) {
                return (
                    '\n    .message__headline span.multi:nth-child(2) {\n        display: none;\n    }\n\n    @media (min-width: ' +
                    e +
                    'px) {\n        .message__headline span.multi:first-child {\n            display: none;\n            \n        }\n\n        .message__headline span.multi:nth-child(2) {\n            display: inline;\n            \n        }\n    }\n'
                );
            }
            var mt = [
                    [
                        'default',
                        {
                            logo: ut.PRIMARY.COLOR,
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
                    ['size:234x100', { logo: ut.PRIMARY.WHITE }],
                    ['size:310x100', { logo: ut.PRIMARY.WHITE }],
                    ['size:340x60', { logo: ut.PRIMARY.WHITE, styles: ['.message { max-width: 100% }'] }]
                ],
                ft = {
                    'layout:text': [
                        [
                            'default',
                            {
                                styles: [
                                    dt(290),
                                    '.message__messaging { flex: 1 1 auto; }',
                                    '@media (max-width: 289px) { .message__disclaimer { display: block; } }'
                                ],
                                logo: ut.PRIMARY.COLOR,
                                headline: ['xsmall', { tag: 'medium', br: ['months'] }],
                                disclaimer: 'xsmall'
                            }
                        ],
                        ['logo.type:primary', { messageWidth: [130, 320] }],
                        [
                            'logo.type:inline',
                            {
                                messageWidth: [200, 1e3],
                                styles: [dt(280)],
                                logo: ut.ALT_NO_PP.COLOR,
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
                                styles: [dt(280)],
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
                                styles: [dt(520)],
                                logo: ut.ALTERNATIVE.COLOR,
                                headline: ['xsmall', { tag: 'medium', br: ['months'] }]
                            }
                        ],
                        ['logo.type:primary && logo.position:top', { styles: [dt(210)] }],
                        ['logo.type:alternative && logo.position:top', { styles: [dt(210)] }],
                        ['text.color:white && logo.type:primary', { logo: ut.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: ut.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: ut.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: ut.PRIMARY.WHITE,
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
                        ['color:gray', { logo: ut.PRIMARY.COLOR }],
                        ['color:white', { logo: ut.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: ut.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': mt
                },
                pt = {
                    'layout:text': [
                        [
                            'default',
                            {
                                styles: [dt(320)],
                                logo: ut.PRIMARY.COLOR,
                                headline: ['xsmall', { tag: 'medium', br: ['months'], replace: [['99+', '99+.']] }],
                                disclaimer: ['extra', 'xsmall']
                            }
                        ],
                        ['logo.type:primary', { messageWidth: [130, 320] }],
                        [
                            'logo.type:inline',
                            {
                                messageWidth: [240, 1e3],
                                styles: [dt(290)],
                                logo: ut.ALT_NO_PP.COLOR,
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
                                styles: [dt(290)],
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
                                styles: [dt(570)],
                                logo: ut.ALTERNATIVE.COLOR,
                                headline: ['xsmall', { tag: 'medium', br: ['months'], replace: [['99+', '99+.']] }]
                            }
                        ],
                        [
                            'logo.type:alternative && logo.position:top',
                            {
                                styles: [dt(230)],
                                messageWidth: [150, 320],
                                headline: ['xsmall', { tag: 'medium', br: ['months'] }]
                            }
                        ],
                        ['logo.type:primary && logo.position:top', { styles: [dt(235)] }],
                        ['text.color:white && logo.type:primary', { logo: ut.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: ut.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: ut.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: ut.PRIMARY.WHITE,
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
                        ['color:gray', { logo: ut.PRIMARY.COLOR }],
                        ['color:white', { logo: ut.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: ut.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': mt
                },
                gt = {
                    'layout:text': [
                        [
                            'default',
                            {
                                styles: [
                                    '.message__headline > span:first-of-type { text-decoration: underline; color: #0076ff; font-weight: 600; }',
                                    '.message__disclaimer > span { color: #2c2e2f; text-decoration: none; }'
                                ],
                                logo: ut.PRIMARY.COLOR,
                                headline: { tag: 'small', br: ['months', 'APR'] },
                                disclaimer: 'xsmall.2'
                            }
                        ],
                        ['logo.type:primary', { messageWidth: 190 }],
                        [
                            'logo.type:inline',
                            { messageWidth: [255, 1e3], logo: ut.ALT_NO_PP.COLOR, headline: { br: ['APR'] } }
                        ],
                        ['logo.type:none', { messageWidth: [240, 1e3], logo: !1, headline: { br: ['APR'] } }],
                        [
                            'logo.type:alternative',
                            { logo: ut.ALTERNATIVE.COLOR, headline: { replace: [['APR', 'APR.']], br: ['APR.'] } }
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
                        ['text.color:white && logo.type:primary', { logo: ut.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: ut.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: ut.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: ut.PRIMARY.WHITE,
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
                        ['color:gray', { logo: ut.PRIMARY.COLOR }],
                        ['color:white', { logo: ut.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: ut.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': [
                        ['default', { logo: ut.PRIMARY.WHITE, headline: 'legacy-small', disclaimer: 'legacy-large' }],
                        ['size:1000x36', { logo: ut.PRIMARY.COLOR }],
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
                ht = {
                    'layout:text': [
                        [
                            'default',
                            {
                                styles: [
                                    '.message__headline > span:not(:nth-of-type(2)) { text-decoration: underline; color: #0076ff; font-weight: 600; }',
                                    '.message__disclaimer > span { color: #2c2e2f; text-decoration: none; }'
                                ],
                                logo: ut.PRIMARY.COLOR,
                                headline: { tag: 'xsmall', br: ['months'] },
                                disclaimer: 'xsmall.2'
                            }
                        ],
                        ['logo.type:primary', { messageWidth: 130 }],
                        [
                            'logo.type:inline',
                            { messageWidth: [250, 1e3], logo: ut.ALT_NO_PP.COLOR, headline: { br: ['months'] } }
                        ],
                        ['logo.type:none', { messageWidth: [235, 1e3], logo: !1, headline: { br: ['months'] } }],
                        [
                            'logo.type:alternative',
                            {
                                logo: ut.ALTERNATIVE.COLOR,
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
                        ['text.color:white && logo.type:primary', { logo: ut.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: ut.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: ut.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: ut.PRIMARY.WHITE,
                                headline: { tag: 'xsmall', br: ['months'] },
                                disclaimer: ['xsmall.2', 'xsmall']
                            }
                        ],
                        ['ratio:1x4', { headline: { br: ['over', 'months'] }, subHeadline: 'small' }],
                        ['color:gray', { logo: ut.PRIMARY.COLOR }],
                        ['color:white', { logo: ut.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: ut.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': [
                        ['default', { logo: ut.PRIMARY.WHITE, headline: 'legacy-small', disclaimer: 'legacy-medium' }],
                        ['size:1000x36', { logo: ut.PRIMARY.COLOR }],
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
                yt = {
                    'layout:text': [
                        [
                            'default',
                            { logo: ut.PRIMARY.COLOR, headline: { tag: 'small', br: ['/mo'] }, disclaimer: 'small' }
                        ],
                        ['logo.type:primary', { messageWidth: [130, 200] }],
                        [
                            'logo.type:inline',
                            {
                                messageWidth: [200, 1e3],
                                logo: ut.ALT_NO_PP.COLOR,
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
                        ['logo.type:alternative', { messageWidth: [140, 430], logo: ut.ALTERNATIVE.COLOR }],
                        ['text.color:white && logo.type:primary', { logo: ut.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: ut.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: ut.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: ut.PRIMARY.WHITE,
                                headline: { tag: 'medium', br: ['low as', 'at'] },
                                disclaimer: 'small'
                            }
                        ],
                        ['ratio:1x4', { subHeadline: 'small' }],
                        ['color:gray', { logo: ut.PRIMARY.COLOR }],
                        ['color:white', { logo: ut.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: ut.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': [
                        [
                            'default',
                            {
                                logo: ut.PRIMARY.WHITE,
                                headline: 'legacy-medium',
                                subHeadline: 'legacy-large',
                                disclaimer: 'legacy-small'
                            }
                        ],
                        ['size:1000x36', { logo: ut.PRIMARY.COLOR, disclaimer: 'legacy-medium' }],
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
                xt = {
                    'layout:text': [
                        ['default', { logo: ut.PRIMARY.COLOR, headline: { tag: 'xsmall' }, disclaimer: 'xsmall' }],
                        ['logo.type:primary', { messageWidth: 130 }],
                        [
                            'logo.type:inline',
                            { messageWidth: [195, 1e3], logo: ut.ALT_NO_PP.COLOR, headline: { br: ['/mo'] } }
                        ],
                        ['logo.type:none', { messageWidth: [175, 1e3], logo: !1, headline: { br: ['/mo'] } }],
                        ['logo.type:alternative', { logo: ut.ALTERNATIVE.COLOR }],
                        ['text.color:white && logo.type:primary', { logo: ut.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: ut.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: ut.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            { logo: ut.PRIMARY.WHITE, headline: { tag: 'small', br: ['low as'] }, disclaimer: 'xsmall' }
                        ],
                        ['ratio:1x4', { subHeadline: 'small' }],
                        ['color:gray', { logo: ut.PRIMARY.COLOR }],
                        ['color:white', { logo: ut.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: ut.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': [
                        [
                            'default',
                            {
                                logo: ut.PRIMARY.WHITE,
                                headline: 'legacy-xsmall',
                                subHeadline: 'legacy-large',
                                disclaimer: 'legacy-medium'
                            }
                        ],
                        ['size:1000x36', { logo: ut.PRIMARY.COLOR }],
                        ['size:120x90', { logo: !1 }],
                        ['size:250x250', { disclaimer: 'legacy-medium.2' }],
                        ['size:340x60', { disclaimer: 'legacy-medium.2' }],
                        ['size:540x200', { styles: ['.message__messaging { padding-top: 45px; }'] }],
                        ['size:170x100', { logo: !1, headline: 'legacy-xsmall' }]
                    ]
                },
                _t = {
                    'layout:text': [
                        [
                            'default',
                            { logo: ut.PRIMARY.COLOR, headline: { tag: 'small', br: ['/mo'] }, disclaimer: 'xsmall' }
                        ],
                        ['logo.type:primary', { messageWidth: [190, 240] }],
                        [
                            'logo.type:inline',
                            { messageWidth: [260, 1e3], logo: ut.ALT_NO_PP.COLOR, headline: { br: ['APR'] } }
                        ],
                        ['logo.type:none', { messageWidth: [260, 1e3], logo: !1, headline: { br: ['APR'] } }],
                        ['logo.type:alternative', { logo: ut.ALTERNATIVE.COLOR }],
                        ['text.color:white && logo.type:primary', { logo: ut.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: ut.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: ut.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            {
                                logo: ut.PRIMARY.WHITE,
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
                        ['color:gray', { logo: ut.PRIMARY.COLOR }],
                        ['color:white', { logo: ut.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: ut.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': [
                        [
                            'default',
                            {
                                logo: ut.PRIMARY.WHITE,
                                headline: 'legacy-small',
                                subHeadline: 'legacy-xlarge',
                                disclaimer: 'legacy-medium'
                            }
                        ],
                        ['size:1000x36', { logo: ut.PRIMARY.COLOR }],
                        ['size:120x90', { logo: !1, headline: 'legacy-xsmall' }],
                        ['size:234x60', { headline: 'legacy-xsmall', disclaimer: 'legacy-medium.2' }],
                        ['size:250x250', { headline: 'legacy-small.2', disclaimer: 'legacy-medium.2' }],
                        ['size:340x60', { disclaimer: 'legacy-medium.2' }],
                        ['size:728x90', { headline: 'legacy-xsmall' }],
                        ['size:170x100', { logo: !1, headline: 'legacy-xsmall' }]
                    ]
                },
                wt = {
                    'layout:text': [
                        ['default', { logo: ut.PRIMARY.COLOR, headline: { tag: 'small' }, disclaimer: 'xsmall' }],
                        ['logo.type:primary', { messageWidth: [140, 210] }],
                        [
                            'logo.type:inline',
                            { messageWidth: [200, 1e3], logo: ut.ALT_NO_PP.COLOR, headline: { br: ['/mo'] } }
                        ],
                        ['logo.type:none', { messageWidth: [200, 1e3], logo: !1, headline: { br: ['/mo'] } }],
                        ['logo.type:alternative', { logo: ut.ALTERNATIVE.COLOR }],
                        ['text.color:white && logo.type:primary', { logo: ut.PRIMARY.WHITE }],
                        ['text.color:white && logo.type:alternative', { logo: ut.ALTERNATIVE.WHITE }],
                        ['text.color:white && logo.type:inline', { logo: ut.ALT_NO_PP.WHITE }]
                    ],
                    'layout:flex': [
                        [
                            'default',
                            { logo: ut.PRIMARY.WHITE, headline: { tag: 'small', br: ['of'] }, disclaimer: 'xsmall' }
                        ],
                        ['ratio:1x4', { headline: { br: ['payments'] }, subHeadline: 'small' }],
                        ['color:gray', { logo: ut.PRIMARY.COLOR }],
                        ['color:white', { logo: ut.PRIMARY.COLOR }],
                        ['color:white-no-border', { logo: ut.PRIMARY.COLOR }]
                    ],
                    'layout:legacy': [
                        [
                            'default',
                            {
                                logo: ut.PRIMARY.WHITE,
                                headline: 'legacy-xsmall',
                                subHeadline: 'legacy-large',
                                disclaimer: 'legacy-medium'
                            }
                        ],
                        ['size:1000x36', { logo: ut.PRIMARY.COLOR }],
                        ['size:120x90', { logo: !1 }],
                        ['size:250x250', { disclaimer: 'legacy-medium.2' }],
                        ['size:340x60', { disclaimer: 'legacy-medium.2' }],
                        ['size:540x200', { styles: ['.message__messaging { padding-top: 45px; }'] }],
                        ['size:170x100', { logo: !1, headline: 'legacy-xsmall' }]
                    ]
                };
            function vt(e, n) {
                var t = m()(e, function(e) {
                    var t = e[1];
                    return p()(t, n);
                });
                if (t) return t[0];
                if (_e()(n, '.')) {
                    var i = n.split('.', 1)[0];
                    if (
                        (t = m()(e, function(e) {
                            var n = e[1];
                            return p()(n, i);
                        }))
                    )
                        return t[0];
                }
                return m()(e, function(e) {
                    var n = e[1];
                    return p()(n, 'default');
                })[0];
            }
            var bt = document.createElement('div');
            bt.innerHTML = ve.a;
            var Et = document.createElement('div');
            Et.innerHTML = Ee.a;
            var Tt = k(function(e, n, t) {
                    return n.getElementsByClassName(e + '__' + t)[0];
                }),
                Pt = k(function(e, n) {
                    var t = document.createElement('style');
                    (t.textContent = n), e.insertBefore(t, e.firstChild);
                }),
                At = k(function(e, n) {
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
                Rt = k(function(e, n) {
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
                Lt = k(function(e, n, t, i) {
                    if ((void 0 === t && (t = 'PayPal Credit'), 'string' == typeof n)) {
                        var o = new Image();
                        (o.alt = t),
                            (o.className = 'message__logo'),
                            (o.src = n),
                            i && (o.srcset = i),
                            e.appendChild(o);
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
            function St(e) {
                return e
                    .reduce(function(e, n) {
                        return [].concat(e, [n, document.createTextNode(' ')]);
                    }, [])
                    .slice(0, -1);
            }
            function zt(e, n) {
                void 0 === n && (n = {});
                var t,
                    i = (Array.isArray(e) ? e : [e]).map(function(e) {
                        var n = document.createElement('span');
                        return Array.isArray(e) ? ((n.innerText = e[0]), (n.className = e[1])) : (n.innerText = e), n;
                    });
                return (
                    n.replace &&
                        ((t = n.replace),
                        i.forEach(function(e) {
                            var n = t.reduce(function(e, n) {
                                return e.replace(n[0], n[1]);
                            }, e.innerText);
                            e.innerText = n;
                        })),
                    n.br &&
                        (function(e, t) {
                            var i = [].concat(n.br);
                            t.forEach(function(e) {
                                for (var n = e.innerText, t = []; _e()(n, i[0]); ) t.push(i[0]), i.shift();
                                if (0 === t.length || (1 === t.length && ye()(n, t[0]))) return e.classList.add('br');
                                var o = document.createElement('span');
                                (o.innerText = n), (o.className = 'br');
                                var r = t.reduce(
                                    function(e, n) {
                                        var t = (function(e, n) {
                                            var t = e.innerText,
                                                i = t.indexOf(n) + n.length,
                                                o = e.cloneNode();
                                            if (((o.innerText = t.slice(0, i).trim()), t.length !== i)) {
                                                var r = e.cloneNode();
                                                return (r.innerText = t.slice(i).trim()), [o, r];
                                            }
                                            return [o];
                                        })(e[e.length - 1], n);
                                        return [].concat(e.slice(0, -1), t);
                                    },
                                    [o]
                                );
                                return (
                                    (e.innerHTML = ''),
                                    r.forEach(function(n) {
                                        e.appendChild(n), e.appendChild(document.createTextNode(' '));
                                    })
                                );
                            });
                        })(0, i),
                    St(i)
                );
            }
            var Ot = k(function(e, n, t) {
                    return (
                        !1 !== t &&
                        ('string' != typeof t && 'object' != typeof t
                            ? null
                            : St(
                                  (i = 'string' == typeof t ? [{ tag: t }] : Array.isArray(t) ? t : [t]).map(function(
                                      t
                                  ) {
                                      var o,
                                          r = document.createElement('span');
                                      if ((i.length > 1 && r.setAttribute('class', 'multi'), 'string' == typeof t))
                                          (o = zt(vt(e[n], t))), r.classList.add('tag--' + t.split('.', 1)[0]);
                                      else {
                                          var a = t.tag,
                                              s = g(t, ['tag']);
                                          (o = zt(vt(e[n], a), s)), r.classList.add('tag--' + a.split('.', 1)[0]);
                                      }
                                      return (
                                          o.forEach(function(e) {
                                              return r.appendChild(e);
                                          }),
                                          r
                                      );
                                  })
                              ))
                    );
                    var i;
                }),
                It = k(function(e, n, t) {
                    return t.reduce(
                        function(t, i) {
                            var o = i[0],
                                r = i[1],
                                a = o.split(' && ');
                            return 'default' === o ||
                                a.every(function(n) {
                                    return p()(e, n);
                                })
                                ? n === Array
                                    ? [].concat(t, [r])
                                    : Y(t, r)
                                : t;
                        },
                        n === Array ? [] : {}
                    );
                }),
                Ct = {
                    getTemplateNode: C(function(e, n) {
                        var t = D(e, 'style.layout');
                        if ('custom' === t)
                            return (function(e) {
                                var t = n.data,
                                    i = n.meta,
                                    o = n.template,
                                    r = document.createElement('div'),
                                    s = i.offerType;
                                if ('' === o) return r;
                                try {
                                    var l = o.replace(/{{\s*?([^\s]+?)\s*?}}/g, function(e, n) {
                                        var i = n.split('.'),
                                            o = i[0],
                                            r = i.slice(1).join('.');
                                        if ('logo' === o) {
                                            var a = document.createElement('div');
                                            return Lt(a, D(ut, r.toUpperCase()), 'PayPal Credit logo'), a.innerHTML;
                                        }
                                        return zt(vt(t[o], r)).reduce(function(e, n) {
                                            return '' + e + (n.outerHTML || ' ');
                                        }, '');
                                    });
                                    (r.innerHTML = l),
                                        m()(a()(r.children), function(e) {
                                            return 'STYLE' !== e.tagName;
                                        }).classList.add('offer--' + s.replace(/:/g, '-').toLowerCase());
                                } catch (e) {}
                                return r;
                            })();
                        var i = D(e, 'style._flattened'),
                            o = D(n, 'meta.offerType'),
                            r = D(n, 'data');
                        if ('legacy' === t) {
                            var s = D(e, 'style.typeNI'),
                                l = D(e, 'style.typeEZP'),
                                c = 'NI' === o.split(':')[0] ? s : l;
                            if ('image' === c)
                                return (function(e, t) {
                                    var i = n.meta,
                                        o = Et.cloneNode(!0),
                                        r = Tt('pp-legacy', o),
                                        a = ['link', 'pixel'].map(r),
                                        s = a[0],
                                        l = a[1],
                                        c = D(e, 'size'),
                                        u = D(e, 'color'),
                                        d = D(e, 'border');
                                    s.setAttribute('href', i.clickUrl), l.setAttribute('href', i.impressionUrl);
                                    var m = 'https://www.paypalobjects.com/upstream/assets/messaging/legacy',
                                        f = 'none' === u ? '' : '-' + u + (!0 === d ? '' : '-no-border'),
                                        p = ('none' === u ? 'v1' : 'v2') + '/' + c.replace(/x/, '-') + f,
                                        g = [1, 1.5, 2].map(function(e) {
                                            return m + '/' + p + '@' + e + 'x.png ' + e + 'x';
                                        });
                                    return Lt(s, m + '/' + p + '@1x.png', 'PayPal Credit Message', g.join(', ')), o;
                                })(e.style);
                            if (!c) throw new Error($.MESSAGE_INVALID_LEGACY);
                        }
                        var u = It(i),
                            d = u(
                                Object,
                                (function(e, n) {
                                    switch (o) {
                                        case 'EZP:ANY:EQZ':
                                            return gt[n];
                                        case 'EZP:ANY:GTZ':
                                            return ht[n];
                                        case 'PALA:MULTI:EQZ':
                                            return yt[n];
                                        case 'PALA:MULTI:GTZ':
                                            return xt[n];
                                        case 'PALA:SINGLE:EQZ':
                                            return _t[n];
                                        case 'PALA:SINGLE:GTZ':
                                            return wt[n];
                                        case 'NI:NON-US':
                                            return pt[n];
                                        case 'NI':
                                        default:
                                            return ft[n];
                                    }
                                })(0, 'layout:' + t)
                            ),
                            f = u(Array, ct['layout:' + t]),
                            p = Ot(r),
                            g = bt.cloneNode(!0),
                            h = Tt('message', g),
                            y = ['logo-container', 'headline', 'sub-headline', 'disclaimer'].map(h),
                            x = y[0],
                            _ = y[1],
                            w = y[2],
                            v = y[3];
                        if (
                            (At(_, p('headline', d.headline)),
                            At(w, p('subHeadline', d.subHeadline)),
                            Rt(v, p('disclaimer', d.disclaimer)),
                            Lt(x, d.logo, 'PayPal Credit logo'),
                            'inline' === D(e, 'style.logo.type') && _.appendChild(x),
                            'none' === D(e, 'style.logo.type'))
                        ) {
                            var b = document.createElement('span');
                            b.innerText = 'with ';
                            var E = document.createElement('strong');
                            (E.innerText = 'PayPal Credit.'),
                                b.appendChild(E),
                                _.appendChild(document.createTextNode(' ')),
                                _.appendChild(b);
                        }
                        d.messageWidth &&
                            ('number' == typeof d.messageWidth
                                ? f.push('.message__messaging { width: ' + d.messageWidth + 'px }')
                                : Array.isArray(d.messageWidth) &&
                                  f.push(
                                      '.message__messaging { min-width: ' +
                                          d.messageWidth[0] +
                                          'px; max-width: ' +
                                          d.messageWidth[1] +
                                          'px }'
                                  ));
                        var T = function(n) {
                            return 'legacy' === t ? n.replace(/\.message/g, '[data-pp-id="' + e.id + '"] .message') : n;
                        };
                        return d.styles && Pt(g, T(d.styles.join(''))), Pt(g, T(f.join('\n'))), g;
                    })
                };
            function Nt(e, n, t) {
                if ('string' == typeof n) return (e.innerHTML = n), {};
                var i = n.meta,
                    o = Ct.getTemplateNode(t, n);
                return (
                    a()(o.children).forEach(function(n) {
                        return e.appendChild(n.cloneNode(!0));
                    }),
                    i
                );
            }
            var Mt = k(function(e, n) {
                var t = n.markup,
                    i = n.options;
                return new K.ZalgoPromise(function(n) {
                    'IFRAME' === e.tagName
                        ? 'string' == typeof t
                            ? (function(e, n) {
                                  return new K.ZalgoPromise(function(t) {
                                      var i = e.contentWindow,
                                          o = '<style>body{margin:0;padding:0;overflow:hidden;}</style>' + n;
                                      (e.srcdoc = o),
                                          (e.src = 'about:blank'),
                                          e.addEventListener('load', function n() {
                                              0 === i.document.body.children.length &&
                                                  (e.removeEventListener('load', n),
                                                  i.document.open('text/html', 'replace'),
                                                  i.document.write(o),
                                                  i.document.close()),
                                                  t(i.meta);
                                          });
                                  });
                              })(e, t).then(function(e) {
                                  return n({ meta: e, options: i });
                              })
                            : (function(e, n, t) {
                                  return new K.ZalgoPromise(function(i) {
                                      var o = e.contentWindow,
                                          r = n.meta,
                                          s = Ct.getTemplateNode(t, n),
                                          l = o.document.importNode(s, !0),
                                          c = a()(l.getElementsByTagName('img')).map(function(e) {
                                              return new K.ZalgoPromise(function(n) {
                                                  return e.addEventListener('load', n);
                                              });
                                          });
                                      for (
                                          a()(l.getElementsByTagName('style')).forEach(function(e) {
                                              var n = o.document.createElement('style');
                                              (n.textContent = e.textContent),
                                                  e.parentNode.insertBefore(n, e),
                                                  e.parentNode.removeChild(e);
                                          });
                                          o.document.body.firstChild;

                                      )
                                          o.document.body.removeChild(o.document.body.firstChild);
                                      a()(l.children).forEach(function(e) {
                                          return o.document.body.appendChild(e);
                                      }),
                                          K.ZalgoPromise.all(c).then(function() {
                                              i(r);
                                          });
                                  });
                              })(e, t, i).then(function(e) {
                                  return n({ meta: e, options: i });
                              })
                        : n({ meta: Nt(e, t, i), options: i });
                });
            });
            function kt(e) {
                var n = e.getBoundingClientRect(),
                    t = (n.top + n.bottom) / 2,
                    i = (n.left + n.right) / 2;
                return !(t > window.innerHeight || t < 0 || i > window.innerWidth || i < 0);
            }
            var Wt = k(function(e, n) {
                    var t = n.options.amount,
                        i = n.events,
                        o = n.track,
                        r = e.getBoundingClientRect(),
                        a = {
                            et: 'CLIENT_IMPRESSION',
                            event_type: 'stats',
                            pos_x: Math.round(r.left),
                            pos_y: Math.round(r.top),
                            browser_width: window.innerWidth,
                            browser_height: window.innerHeight,
                            visible: kt(e),
                            amount: t
                        };
                    a.visible ||
                        i.on('scroll', function() {
                            kt(e) &&
                                (i.clear('scroll'), o({ et: 'CLIENT_IMPRESSION', event_type: 'scroll', visible: !0 }));
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
                                !(function i(o) {
                                    return o <= 0
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
                                              i(o - 1);
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
                                o(a, e.hasAttribute('data-pp-message-hidden')),
                                o('MORS_IMPRESSION');
                        }),
                        i.on('click', function() {
                            o({ et: 'CLICK', event_type: 'click', link: 'Banner Wrapper' }), o('MORS_CLICK');
                        }),
                        i.on('hover', function() {
                            o({ et: 'CLIENT_IMPRESSION', event_type: 'hover' }), i.clear('hover');
                        });
                }),
                jt = {
                    '1x1': [{ ratio: '1x1', width: [120, 300] }],
                    '1x4': [{ ratio: '1x2', width: [160, 160] }, { ratio: '1x4', breakpoint: 768 }],
                    '8x1': [{ ratio: '6x1', width: [250, 768] }, { ratio: '8x1', breakpoint: 768 }],
                    '20x1': [
                        { ratio: '6x1', width: [250, 768] },
                        { ratio: '20x1', width: [350, 1169], breakpoint: 768 }
                    ]
                };
            function Ht(e) {
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
            function Bt(e) {
                var n = e.split(/(?=[@[])/),
                    t = n[0],
                    i = n.slice(1);
                return t.match(/\d+x\d+/)
                    ? i.reduce(
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
            var Yt = k(function(e, n) {
                    var t = n.wrapper,
                        i = n.options,
                        o = n.logger;
                    if ('IFRAME' === e.tagName) {
                        var r,
                            s,
                            l = D(i, 'style.layout'),
                            c = D(i, 'style.ratio');
                        if (('flex' !== l && 'custom' !== l) || !c) {
                            e.setAttribute('style', 'width: ' + ('custom' !== l ? 0 : '`100%') + '; border: none;'),
                                e.setAttribute('height', 0),
                                t.removeAttribute('class');
                            var u = (function(e) {
                                    var n = document.createElement('div');
                                    n.setAttribute('style', 'width: 100%; overflow: hidden');
                                    var t = document.createElement('div');
                                    t.setAttribute('style', 'width: 10000px'),
                                        n.appendChild(t),
                                        e.parentNode.appendChild(n);
                                    var i = n.offsetWidth;
                                    return e.parentNode.removeChild(n), i;
                                })(t),
                                d =
                                    'custom' !== l && null !== e.offsetParent
                                        ? (function(e) {
                                              var n = e.contentDocument.querySelector('.message__content'),
                                                  t = window.getComputedStyle(n),
                                                  i = a()(n.children),
                                                  o = [
                                                      'margin-left',
                                                      'border-left-width',
                                                      'padding-left',
                                                      'width',
                                                      'padding-right',
                                                      'border-right-width',
                                                      'margin-right'
                                                  ];
                                              return _e()(t.getPropertyValue('display'), 'flex')
                                                  ? Math.round(
                                                        i.reduce(function(e, n) {
                                                            var t = window.getComputedStyle(n);
                                                            return (
                                                                e +
                                                                o.reduce(function(e, n) {
                                                                    return e + parseFloat(t.getPropertyValue(n));
                                                                }, 0)
                                                            );
                                                        }, 0)
                                                    )
                                                  : Math.max.apply(
                                                        Math,
                                                        i.map(function(e) {
                                                            var n = window.getComputedStyle(e);
                                                            return Math.round(
                                                                o.reduce(function(e, t) {
                                                                    return e + parseFloat(n.getPropertyValue(t));
                                                                }, 0)
                                                            );
                                                        })
                                                    );
                                          })(e)
                                        : 0,
                                m = function() {
                                    e.setAttribute('style', 'width: 100%; border: none; min-width: ' + d + 'px;'),
                                        requestAnimationFrame(function() {
                                            return requestAnimationFrame(function() {
                                                e.setAttribute(
                                                    'height',
                                                    e.contentWindow.document.documentElement.scrollHeight
                                                );
                                            });
                                        });
                                };
                            if (u < d && 'custom' !== l) {
                                if ('top' !== D(i, 'style.logo.position') || 'primary' !== D(i, 'style.logo.type'))
                                    throw (o.warn(
                                        'Message Overflow. PayPal Credit Message of layout type ' +
                                            D(i, 'style.layout') +
                                            ' requires a width of at least ' +
                                            d +
                                            'px. Current container is ' +
                                            u +
                                            'px. Attempting fallback message.'
                                    ),
                                    (r = function() {
                                        t.parentNode.setAttribute('data-pp-style-layout', 'text'),
                                            t.parentNode.setAttribute('data-pp-style-logo-type', 'primary'),
                                            t.parentNode.setAttribute('data-pp-style-logo-position', 'top');
                                    }),
                                    ((s = new Error($.MESSAGE_OVERFLOW)).onEnd = r),
                                    s);
                                o.error({ name: $.MESSAGE_HIDDEN }),
                                    o.warn(
                                        'Message hidden. PayPal Credit Message fallback requires minimum width of ' +
                                            d +
                                            'px. Current container is ' +
                                            u +
                                            'px. Message hidden.'
                                    ),
                                    e.setAttribute('data-pp-message-hidden', 'true');
                            } else m(), ge(e).on('resize', m);
                        } else
                            !(function(e, n, t) {
                                var i = [];
                                'flex' === t
                                    ? (i = jt[n])
                                    : Array.isArray(n)
                                    ? (i = n.map(Bt))
                                    : 'string' == typeof n && (i = [Bt(n)]);
                                var o = 'pp-flex--' + i.slice(-1)[0].ratio,
                                    r = i.reduce(function(e, n) {
                                        var t = n.breakpoint,
                                            i = n.ratio,
                                            r = n.width;
                                        return '' === e
                                            ? '\n                .' +
                                                  o +
                                                  ' {\n                    display: block;\n                    width: 100%;\n                    ' +
                                                  (Array.isArray(r)
                                                      ? '\n                                min-width: ' +
                                                        Ht(r[0]) +
                                                        ';\n                                max-width: ' +
                                                        Ht(r[1]) +
                                                        ';'
                                                      : '') +
                                                  '\n                    box-sizing: border-box;\n                    position: relative;\n                }\n        \n                .' +
                                                  o +
                                                  '::before {\n                    padding-top: ' +
                                                  Ht(i) +
                                                  ";\n                    content: '';\n                    display: block;\n                }\n        \n                ." +
                                                  o +
                                                  ' iframe {\n                    position: absolute;\n                    top: 0;\n                    left: 0;\n                    width: 100%;\n                    height: 100%;\n                }\n            '
                                            : t
                                            ? '\n            ' +
                                              e +
                                              '\n            @media (min-width: ' +
                                              Ht(t) +
                                              ') {\n                ' +
                                              (Array.isArray(r)
                                                  ? '\n                            .' +
                                                    o +
                                                    ' {\n                                min-width: ' +
                                                    Ht(r[0]) +
                                                    ';\n                                max-width: ' +
                                                    Ht(r[1]) +
                                                    ';\n                            }'
                                                  : '') +
                                              '\n                .' +
                                              o +
                                              '::before {\n                    padding-top: ' +
                                              Ht(i) +
                                              ';\n                }\n            }\n        '
                                            : e;
                                    }, ''),
                                    a = document.createElement('style');
                                (a.textContent = r), e.setAttribute('class', o), e.appendChild(a);
                            })(t, c, l),
                                e.setAttribute('style', 'width: 100%; border: none;'),
                                e.removeAttribute('height');
                    }
                }),
                Dt = k(function(e, n) {
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
                var t = u()({ insertMarkup: Mt, setSize: Yt, runStats: Wt, postMessage: Dt, events: ge }).reduce(
                    function(e, t) {
                        var i;
                        return o({}, e, (((i = {})[t[0]] = (0, t[1])(n)), i));
                    },
                    {}
                );
                return (
                    (t.clearEvents = function() {
                        return (function(e) {
                            le()(ce).forEach(function(n) {
                                return n.delete(e);
                            }),
                                0 === ce.scroll.size && window.removeEventListener('scroll', me),
                                0 === ce.hover.size && document.removeEventListener('mouseover', fe),
                                0 === ce.message.size && window.removeEventListener('message', ue),
                                'IFRAME' === e.tagName
                                    ? (e.contentWindow.removeEventListener('resize', de),
                                      e.contentWindow.removeEventListener('click', pe))
                                    : e.removeEventListener('click', pe);
                        })(n);
                    }),
                    [n, t]
                );
            }
            var Gt = t(22),
                Ft = t.n(Gt),
                Vt = {
                    ANY: 'ANY',
                    STRING: 'STRING',
                    BOOLEAN: 'BOOLEAN',
                    NUMBER: 'NUMBER',
                    FUNCTION: 'FUNCTION',
                    OBJECT: 'OBJECT'
                },
                Zt = { id: [Vt.STRING], _legacy: [Vt.BOOLEAN], onRender: [Vt.FUNCTION] },
                Kt = {
                    text: {
                        logo: {
                            type: [Vt.STRING, ['primary', 'alternative', 'inline', 'none']],
                            position: [Vt.STRING, ['left', 'right', 'top']]
                        },
                        text: { color: [Vt.STRING, ['black', 'white']] }
                    },
                    flex: {
                        color: [Vt.STRING, ['blue', 'black', 'white', 'white-no-border', 'gray|grey']],
                        ratio: [Vt.STRING, ['1x1', '1x4', '8x1', '20x1']]
                    },
                    legacy: {
                        typeNI: [Vt.STRING, ['', 'image', 'html']],
                        typeEZP: [Vt.STRING, ['', 'html']],
                        size: [Vt.STRING],
                        color: [Vt.STRING, ['none', 'blue', 'black', 'gray|grey', 'white']],
                        border: [Vt.BOOLEAN, [!0, !1]]
                    },
                    custom: { markup: [Vt.STRING], ratio: [Vt.ANY] }
                },
                Jt = function(e, n, t) {
                    return e.warn('Invalid option value (' + n + '). ' + t);
                },
                qt = function(e, n, t, i) {
                    return Jt(e, n, 'Expected type "' + t.toLowerCase() + '" but instead received "' + typeof i + '".');
                },
                Qt = function(e, n, t, i) {
                    return Jt(
                        e,
                        n,
                        'Expected one of ["' + t.join('", "').replace(/\|[\w|]+/g, '') + '"] but received "' + i + '".'
                    );
                };
            function Xt(e, n) {
                switch (e) {
                    case Vt.STRING:
                        return 'string' == typeof n;
                    case Vt.BOOLEAN:
                        return 'boolean' == typeof n;
                    case Vt.NUMBER:
                        return 'number' == typeof n && !Ft()(n);
                    case Vt.FUNCTION:
                        return 'function' == typeof n;
                    case Vt.OBJECT:
                        return 'object' == typeof n && null !== n;
                    case Vt.ANY:
                        return !0;
                    default:
                        return !1;
                }
            }
            function $t(e, n, t, i) {
                return (
                    void 0 === i && (i = 'style.'),
                    u()(n).reduce(function(r, a) {
                        var s,
                            l = a[0],
                            c = a[1];
                        if (Array.isArray(c)) {
                            var u,
                                d = (function(e, n, t, i) {
                                    var o = n[0],
                                        r = n[1],
                                        a = void 0 === r ? [] : r;
                                    if (void 0 === t) return a[0];
                                    if (Xt(o, t)) {
                                        if (o === Vt.STRING && a.length > 0) {
                                            var s = m()(a, function(e) {
                                                return e.split('|').some(function(e) {
                                                    return e === t;
                                                });
                                            });
                                            return void 0 === s
                                                ? (Qt(e, i, a, t), a[0].split('|')[0])
                                                : s.split('|')[0];
                                        }
                                        return t;
                                    }
                                    return qt(e, i, o, t), a[0];
                                })(e, c, t[l], '' + i + l);
                            return void 0 === d ? r : o({}, r, (((u = {})[l] = d), u));
                        }
                        return o({}, r, (((s = {})[l] = $t(e, n[l], t[l] || {}, '' + i + l + '.')), s));
                    }, {})
                );
            }
            function ei(e, n) {
                return o({ layout: n.layout }, $t(e, Kt[n.layout], n));
            }
            var ni = k(function(e, n) {
                    var t = n.account,
                        i = n.amount,
                        o = n.countryCode,
                        r = n.style,
                        a = g(n, ['account', 'amount', 'countryCode', 'style']),
                        s = $t(e, Zt, a, '');
                    if (
                        (Xt(Vt.STRING, t)
                            ? 13 === t.length || 10 === t.length || l()(t, 'client-id:')
                                ? (s.account = t)
                                : Jt(e, 'account', 'Ensure the correct Merchant Account ID has been entered.')
                            : qt(e, 'account', Vt.STRING, t),
                        void 0 !== i)
                    ) {
                        var c = Number(i);
                        Xt(Vt.NUMBER, c)
                            ? c < 0
                                ? Jt(e, 'amount', 'Ensure value is a positive number.')
                                : (s.amount = c)
                            : qt(e, 'amount', Vt.NUMBER, i);
                    }
                    return (
                        void 0 !== o &&
                            (Xt(Vt.STRING, o)
                                ? 2 !== o.length
                                    ? Jt(e, 'countryCode', 'Country code should be 2 characters.')
                                    : (s.countryCode = o)
                                : qt(e, 'countryCode', Vt.STRING, o)),
                        Xt(Vt.OBJECT, r) && Xt(Vt.STRING, r.layout) && Kt[r.layout]
                            ? (s.style = ei(e, r))
                            : (Xt(Vt.OBJECT, r)
                                  ? Qt(e, 'style.layout', Object.keys(Kt), r.layout)
                                  : void 0 !== r && qt(e, 'style', Vt.OBJECT, r),
                              (s.style = ei(e, { layout: 'text' }))),
                        e.info(X.VALIDATE, { options: B(s) }),
                        s
                    );
                }),
                ti = N(
                    function(e) {
                        var n = e.offerType;
                        return new K.ZalgoPromise(function(e, t) {
                            var i = new XMLHttpRequest();
                            (i.onreadystatechange = function() {
                                if (4 === i.readyState)
                                    switch (i.status) {
                                        case 200:
                                            e({ markup: i.responseText });
                                            break;
                                        default:
                                            t();
                                    }
                            }),
                                i.open(
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
                                i.send();
                        });
                    },
                    ['offerType']
                ),
                ii = N(
                    function(e) {
                        return new K.ZalgoPromise(function(n) {
                            var t,
                                i,
                                o,
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
                                    ((i = (t = e).account),
                                    (o = t.amount),
                                    (r = ['json=true', l()(i, 'client-id') ? 'cid=' + i.slice(10) : 'mid=' + i]).push(
                                        'country=US'
                                    ),
                                    r.push('currency=USD'),
                                    o && r.push('amount=' + o),
                                    'https://www.paypal.com/ppcredit/finance/terms?' + r.join('&')),
                                    !0
                                ),
                                a.send();
                        });
                    },
                    ['account', 'amount']
                ),
                oi = function(e, n) {
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
                ri = function(e) {
                    return e.max_amount !== e.default_max_amount
                        ? '<div style="text-align: center; padding-bottom: 15px; display: table; padding-top: 10px; "><span style="display: inline-block; vertical-align: middle; "><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19"><path fill="none" fill-rule="evenodd" stroke="#9DA3A6" stroke-linecap="round" stroke-linejoin="round" d="M9.526 10.474v7.579c4.71-.034 8.527-3.817 8.527-8.527a8.526 8.526 0 1 0-11.834 7.862"></path></svg></span><p style="display: inline; font-size: 13px; color: #2c2e2f; padding-left: 5px; font-family: PayPalSansSmall; font-weight: 400 ">$' +
                              e.max_amount +
                              ' is the maximum amount to be eligible for Easy Payments. Enter an amount of $' +
                              e.max_amount +
                              ' or less.</p></div>'
                        : '<p style="text-align: center">No offers are available for this amount. Please enter a new amount.</p>';
                };
            function ai(e, n) {
                var t = e.contentDocument.getElementById('content-wrapper'),
                    i = e.contentDocument.getElementById('modal__overlay'),
                    r = e.contentDocument.getElementById('close-btn'),
                    a = e.contentDocument.getElementById('header'),
                    s = e.contentDocument.getElementsByClassName('accordion'),
                    l = e.contentDocument.getElementById('modal-container'),
                    c = e.contentDocument.getElementsByClassName('modal__header-container')[0];
                return o(
                    {
                        window: e.contentWindow,
                        contentWrapper: t,
                        overlay: i,
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
            var si = N(
                    function(e) {
                        var n = window.top.document.createElement('div');
                        n.setAttribute('data-pp-id', V.nextId);
                        var t = Ut('iframe'),
                            i = t[0],
                            r = t[1].insertMarkup,
                            s = (function() {
                                var e = window.parent.document.head,
                                    n = window.parent.document.body,
                                    t = (function() {
                                        var t = window.parent.document.getElementsByName('viewport')[0];
                                        if (void 0 === t) {
                                            var i = document.createElement('meta');
                                            return (i.name = 'viewport'), (i.content = ''), e.appendChild(i), i;
                                        }
                                        return n.contains(t) && e.appendChild(t), t;
                                    })(),
                                    i = document.createElement('meta');
                                (i.name = 'viewport'),
                                    (i.content =
                                        'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui, shrink-to-fit=no');
                                var o = n.getAttribute('style');
                                return [
                                    function() {
                                        e.removeChild(t),
                                            e.appendChild(i),
                                            (n.style.overflow = 'hidden'),
                                            (n.style.msOverflowStyle = 'scrollbar');
                                    },
                                    function() {
                                        e.removeChild(i),
                                            e.appendChild(t),
                                            o ? n.setAttribute('style', o) : n.removeAttribute('style');
                                    }
                                ];
                            })(),
                            c = s[0],
                            u = s[1],
                            d = e.track,
                            m = e.clickUrl,
                            f = H({ status: 'CLOSED' }),
                            p = f[0],
                            g = f[1],
                            h = ee.create({
                                id: V.nextId,
                                account: e.account,
                                selector: '__internal__',
                                type: 'Modal'
                            });
                        function y() {
                            return l()(e.offerType, 'NI') ? 'NI' : 'EZP';
                        }
                        Z({ nextId: (V.nextId += 1) });
                        var x = function(e, n) {
                            return d({
                                et: 'modal-open' === e ? 'CLIENT_IMPRESSION' : 'CLICK',
                                link: n,
                                modal: y(),
                                event_type: e
                            });
                        };
                        function _() {
                            a()(p.elements.accordions).forEach(function(e) {
                                e.classList.remove('show'),
                                    e
                                        .getElementsByClassName('accordion-content')[0]
                                        .style.setProperty('max-height', null);
                            });
                        }
                        function w(e) {
                            var n = {
                                    'NI Tab': [p.elements.niTab, p.elements.niContent],
                                    'EZP Tab': [p.elements.ezpTab, p.elements.ezpContent]
                                },
                                t = n[e][0];
                            le()(n).forEach(function(e) {
                                var n = e[0],
                                    i = e[1];
                                n.classList.toggle('selected', n === t), i.classList.toggle('show', n === t);
                            }),
                                x('modal-tab', e),
                                _();
                        }
                        function v() {
                            return p.error ? P(!0) : p.modalProm;
                        }
                        function b(e) {
                            return new K.ZalgoPromise(function(t, o) {
                                'OPEN' === p.status || 'OPENING' === p.status
                                    ? (g({ status: 'CLOSING' }),
                                      p.elements.modalContainer.classList.remove('show'),
                                      setTimeout(function() {
                                          (n.style.display = 'none'),
                                              i.blur(),
                                              g({ status: 'CLOSED' }),
                                              u(),
                                              'EZP' === y() &&
                                                  setTimeout(function() {
                                                      w('EZP Tab');
                                                  }, 350),
                                              t();
                                      }, e || 0))
                                    : o();
                            });
                        }
                        function E(e) {
                            b(350), x('modal-close', e);
                        }
                        function T(n) {
                            var t = +n;
                            return (
                                Ft()(t) || (p.elements.amountInput.value = t.toFixed(2)),
                                p.elements.loader.style.setProperty('opacity', 1),
                                p.elements.financeTermsTable.style.setProperty('opacity', 0.4),
                                ii(o({}, e, { amount: n })).then(function(e) {
                                    p.elements.loader.style.setProperty('opacity', 0),
                                        p.elements.financeTermsTable.style.setProperty('opacity', 1),
                                        (p.elements.financeTermsTable.innerHTML = (function(e) {
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
                                                                return oi(e, n);
                                                            })
                                                            .join('')
                                                      : '') +
                                                  '\n            </tbody>\n        </table>\n        ' +
                                                  (e.options && 0 !== e.options.length && 'N/A' !== e.options
                                                      ? ''
                                                      : ri(e)) +
                                                  '\n        <p id="terms-note">The monthly payment shown is an estimated amount and may not include taxes and shipping</p>\n    ';
                                        })(e));
                                })
                            );
                        }
                        function P(n) {
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
                                ti(e, n)
                                    .then(r)
                                    .then(function() {
                                        g({ elements: ai(i, y()) }),
                                            (function() {
                                                p.elements.closeButton.addEventListener('click', function() {
                                                    E('Close Button');
                                                }),
                                                    p.elements.overlay.addEventListener('click', function(e) {
                                                        var n = e.target;
                                                        (n !== p.elements.contentWrapper &&
                                                            n !== p.elements.headerContainer) ||
                                                            E('Modal Overlay');
                                                    });
                                                var e = function() {
                                                    p.elements.contentWrapper.scrollTop > 0
                                                        ? p.elements.header.classList.add('show')
                                                        : p.elements.header.classList.remove('show');
                                                };
                                                if (
                                                    (p.elements.contentWrapper.addEventListener('scroll', e),
                                                    p.elements.contentWrapper.addEventListener('touchmove', e),
                                                    a()(p.elements.accordions).forEach(function(e) {
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
                                                    i.contentWindow.addEventListener('keyup', function(e) {
                                                        ('Escape' !== e.key && 'Esc' !== e.key && 27 !== e.charCode) ||
                                                            E('Escape Key');
                                                    }),
                                                    'EZP' === y())
                                                ) {
                                                    p.elements.niTab.addEventListener('click', function() {
                                                        return w('NI Tab');
                                                    }),
                                                        p.elements.ezpTab.addEventListener('click', function() {
                                                            return w('EZP Tab');
                                                        });
                                                    var n = function() {
                                                        T(p.elements.amountInput.value);
                                                    };
                                                    p.elements.amountInput.addEventListener('keydown', function(e) {
                                                        var t = e.key,
                                                            i = e.target;
                                                        if (t.length > 1 || e.metaKey || e.ctrlKey)
                                                            'Enter' === t && n();
                                                        else {
                                                            var o = i.value,
                                                                r = i.selectionStart,
                                                                a = o ? '' + o.slice(0, r) + t + o.slice(r) : t;
                                                            (function(e) {
                                                                if (Ft()(Number(e))) return !1;
                                                                var n = e.split('.'),
                                                                    t = n[0],
                                                                    i = n[1];
                                                                return (
                                                                    (void 0 === t ? '' : t).length <= 5 &&
                                                                    (void 0 === i ? '' : i).length <= 2
                                                                );
                                                            })(a) && ((i.value = a), i.setSelectionRange(r + 1, r + 1)),
                                                                e.preventDefault();
                                                        }
                                                    }),
                                                        p.elements.calculateButton.addEventListener('click', n);
                                                }
                                            })();
                                    })
                                    .catch(function() {
                                        h.error({ name: $.MODAL_FAIL }), g({ error: !0 });
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
                            g({ modalProm: P() }),
                            'EZP' === y() &&
                                v().then(function() {
                                    return T(e.amount);
                                }),
                            {
                                open: function(e) {
                                    e.preventDefault(),
                                        ('CLOSED' !== p.status && 'CLOSING' !== p.status) ||
                                            (g({ status: 'OPENING' }),
                                            v().then(function() {
                                                if (p.error)
                                                    return g({ status: 'CLOSED' }), void window.open(m, '_blank');
                                                (n.style.display = 'block'),
                                                    requestAnimationFrame(function() {
                                                        return requestAnimationFrame(function() {
                                                            _(),
                                                                i.contentWindow.focus(),
                                                                g({ status: 'OPEN' }),
                                                                c(),
                                                                p.elements.modalContainer.classList.add('show'),
                                                                x('modal-open');
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
                li = {
                    init: function(e) {
                        var n = e.options,
                            t = e.meta,
                            i = e.events,
                            r = e.track;
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
                            var a = si(o({}, n, {}, t, { track: r }));
                            i.on('click', a.open);
                        }
                    }
                },
                ci = new Map(),
                ui = new Map();
            function di(e) {
                var n = (e.meta && e.meta.offerType) + '::' + e.options.style._flattened.sort().join('::'),
                    t = e.meta;
                return {
                    track: e.logger.track({
                        uuid: n,
                        urls: { DEFAULT: t.clickUrl, MORS_IMPRESSION: t.impressionUrl + '&idx=' + e.options.id }
                    })
                };
            }
            var mi = k(function(e, n) {
                    var t;
                    return ((t = {})[e] = n), t;
                }),
                fi = k(function(e, n) {
                    return o({}, n, {}, e(n));
                }),
                pi = k(function(e, n) {
                    return e(n).then(function(e) {
                        return o({}, n, {}, e);
                    });
                }),
                gi = function(e) {
                    var n = e.options.onRender;
                    n && n();
                },
                hi = {
                    init: function(e, n, t) {
                        ui.has(e) ||
                            ui.set(e, ee.create({ id: t.id, account: t.account, selector: n, type: 'Message' }));
                        var i,
                            r = ui.get(e);
                        if ((r.start({ options: t }), ci.has(e))) i = ci.get(e).update(t);
                        else {
                            var a = (function(e, n, t) {
                                t.info(X.CREATE);
                                var i = H(e),
                                    r = i[0],
                                    a = i[1],
                                    s = r._legacy,
                                    l = Ut(s ? 'div' : 'iframe'),
                                    c = l[0],
                                    d = l[1],
                                    m = d.insertMarkup,
                                    f = d.setSize,
                                    g = d.events,
                                    h = d.runStats,
                                    y = d.clearEvents,
                                    x = s ? c : document.createElement('span');
                                x !== c && x.appendChild(c);
                                var _ = k(function(e, n, i) {
                                    return t.info(n), e(i);
                                });
                                function w(e) {
                                    return (
                                        t.info(X.RENDER_START),
                                        j(ni(t), W(a), mi('options'), M(I.a, { logger: t }), pi(ae))(e)
                                            .then(pi(_(m, X.INSERT)))
                                            .then(
                                                j(
                                                    M(I.a, { wrapper: x, events: g }),
                                                    fi(di),
                                                    W(_(li.init, X.MODAL)),
                                                    W(_(f, X.SIZE)),
                                                    W(_(h, X.STATS)),
                                                    _(gi, X.RENDER_END)
                                                )
                                            )
                                    );
                                }
                                return (
                                    n.appendChild(x),
                                    t.info(X.CONTAINER),
                                    {
                                        renderProm: w(r),
                                        wrapper: x,
                                        container: c,
                                        update: function(e) {
                                            var n = Y(r, e),
                                                i = (function e(n, t) {
                                                    return u()(t).reduce(function(t, i) {
                                                        var r,
                                                            a,
                                                            s = i[0],
                                                            l = i[1];
                                                        if (!n[s] && n[s] !== l)
                                                            return o({}, t, (((r = {})[s] = l), r));
                                                        if ('object' != typeof l || null === l)
                                                            return l !== n[s] ? o({}, t, (((a = {})[s] = l), a)) : t;
                                                        if (Array.isArray(l)) {
                                                            var c;
                                                            if (Array.isArray(n[s])) {
                                                                var u,
                                                                    d = l.filter(function(e) {
                                                                        return !p()(n[s], e);
                                                                    });
                                                                return d.length > 0
                                                                    ? o({}, t, (((u = {})[s] = d), u))
                                                                    : t;
                                                            }
                                                            return o({}, t, (((c = {})[s] = l), c));
                                                        }
                                                        var m,
                                                            f = e(n[s], l);
                                                        return Object.keys(f).length > 0
                                                            ? o({}, t, (((m = {})[s] = f), m))
                                                            : t;
                                                    }, {});
                                                })(r, n),
                                                a = Object.keys(i).length > 0;
                                            return (
                                                t.info(X.UPDATE, { willUpdate: a }),
                                                a ? (y(), w(n)) : K.ZalgoPromise.resolve()
                                            );
                                        }
                                    }
                                );
                            })(t, e, r);
                            ci.set(e, a), (i = a.renderProm);
                        }
                        return i.then(r.end).catch(function(e) {
                            r.error({ name: e.message }), r.end(), 'function' == typeof e.onEnd && e.onEnd();
                        });
                    }
                };
            function yi(e, n) {
                var t, i;
                if ((void 0 === n && (n = '[data-pp-message]'), 'string' == typeof n))
                    (t = a()(document.querySelectorAll(n))), (i = n);
                else if (G(n)) (t = [n]), (i = 'HTMLElement');
                else {
                    if (!Array.isArray(n) || !n.every(G)) return ee.warn('Invalid selector', n);
                    (t = [].concat(n)), (i = 'Array<HTMLElement>');
                }
                return (
                    (t = t.filter(function(n) {
                        return n.ownerDocument.body.contains(n)
                            ? !e._auto || !n.hasAttribute('data-pp-id')
                            : (ee.warn('Skipping container. Must be in the document:', n), !1);
                    })),
                    K.ZalgoPromise.all(
                        t.map(function(n) {
                            var t = Y(
                                e,
                                (function(e) {
                                    var n = a()(e.attributes)
                                        .filter(function(e) {
                                            var n = e.nodeName;
                                            return l()(n, 'data-pp-');
                                        })
                                        .reduce(function(e, n) {
                                            var t = n.nodeValue;
                                            return t ? Y(e, U(n.nodeName.replace('data-pp-', ''), t)) : e;
                                        }, {});
                                    if (
                                        !e.firstElementChild ||
                                        'SCRIPT' !== e.firstElementChild.tagName ||
                                        'text/template' !== e.firstElementChild.getAttribute('type')
                                    )
                                        return n;
                                    var t = e.firstElementChild.textContent.trim();
                                    return e.removeChild(e.firstElementChild), Y(n, { style: { markup: t } });
                                })(n)
                            );
                            return (
                                n.hasAttribute('data-pp-id') ||
                                    (n.setAttribute('data-pp-id', V.nextId), Z({ nextId: (V.nextId += 1) })),
                                new MutationObserver(function(e) {
                                    var t = e.reduce(function(e, n) {
                                        return l()(n.attributeName, 'data-pp-')
                                            ? o(
                                                  {},
                                                  e,
                                                  {},
                                                  U(n.attributeName.slice(8), n.target.getAttribute(n.attributeName))
                                              )
                                            : e;
                                    }, {});
                                    hi.init(n, i, t);
                                }).observe(n, { attributes: !0 }),
                                (t.id = n.getAttribute('data-pp-id')),
                                hi.init(n, i, t)
                            );
                        })
                    )
                );
            }
            var xi = function(e) {
                return {
                    render: function(n) {
                        return yi(o({}, V.config, {}, e), n);
                    }
                };
            };
            I()(xi, {
                render: function(e, n) {
                    return void 0 === e && (e = {}), yi(o({}, V.config, {}, e), n);
                },
                setGlobalConfig: function(e) {
                    return void 0 === e && (e = {}), Z({ config: o({}, V.config, {}, e) });
                }
            });
            var _i = xi,
                wi = { BLU: 'blue', BLK: 'black', GRY: 'gray', WHT: 'white' },
                vi = { x180x150: '1x1', x160x600: '1x4', x728x90: '8x1', x1169x50: '20x1' },
                bi = {
                    x1169x50: ['BLKWHTYCSS', 'BLUWHTYCSS', 'WHTBLUNCSS', 'WHTBLUYCSS'],
                    x160x600: ['BLKWHTYCSS', 'BLUWHTYCSS', 'WHTBLUNCSS', 'WHTBLUYCSS'],
                    x180x150: ['BLKWHTYCSS', 'BLUWHTYCSS', 'WHTBLUNCSS', 'WHTBLUYCSS'],
                    x728x90: ['BLKWHTYCSS', 'BLUWHTYCSS', 'WHTBLUNCSS', 'WHTBLUYCSS']
                },
                Ei = {
                    x1169x51: ['x1169x50', 'BLKWHTYLRG'],
                    x1169x52: ['x1169x50', 'BLUWHTYLRG'],
                    x1169x50: ['x1169x50', 'WHTBLUYLRG'],
                    x160x601: ['x160x600', 'BLKWHTYMED'],
                    x161x600: ['x160x600', 'BLUWHTYMED'],
                    x160x602: ['x160x600', 'WHTBLUYMED'],
                    x180x151: ['x180x150', 'BLKWHTYSML'],
                    x180x152: ['x180x150', 'BLUWHTYSML'],
                    x181x150: ['x180x150', 'WHTBLUYSML'],
                    x300x251: ['x300x250', 'BLKWHTYMED'],
                    x300x252: ['x300x250', 'BLUWHTYMED'],
                    x301x250: ['x300x250', 'WHTBLUYMED'],
                    x728x91: ['x728x90', 'BLUWHTYLRG'],
                    x729x90: ['x728x90', 'BLKWHTYLRG'],
                    x730x90: ['x728x90', 'WHTBLUYLRG']
                },
                Ti = {
                    x160x600: ['BLKWHTYMED', 'BLUWHTYMED', 'WHTBLUNMED', 'WHTBLUYMED'],
                    x180x150: ['BLKWHTYSML', 'BLUWHTYSML', 'WHTBLUNSML', 'WHTBLUYSML'],
                    x300x250: ['BLKWHTYMED', 'BLUWHTYMED', 'WHTBLUNSML', 'WHTBLUYMED'],
                    x728x90: ['BLKWHTYLRG', 'BLUWHTYLRG', 'WHTBLUNLRG', 'WHTBLUYLRG'],
                    x1169x50: ['BLKWHTYLRG', 'BLUWHTYLRG', 'WHTBLUNLRG', 'WHTBLUYLRG']
                },
                Pi = [
                    'x90x136',
                    'x190x50',
                    'x228x128',
                    'x240x60',
                    'x999x70',
                    'x250x52',
                    'x260x72',
                    'x274x97',
                    'x280x42',
                    'x289x110',
                    'x300x600',
                    'x184x153',
                    'x768x70',
                    'x336x280',
                    'x790x70',
                    'x338x65',
                    'x375x50',
                    'x467x58',
                    'x650x60',
                    'x678x279',
                    'x180x150',
                    'x190x100',
                    'x191x101',
                    'x234x400',
                    'x234x60',
                    'x236x61',
                    'x250x250',
                    'x280x280',
                    'x300x250',
                    'x300x50',
                    'x468x60',
                    'x540x200',
                    'x728x90',
                    'x800x66',
                    'x120x240',
                    'x120x600',
                    'x120x90',
                    'x150x100',
                    'x151x101',
                    'x160x600',
                    'x170x100'
                ],
                Ai = ['x168x374', 'x340x60', 'x765x60', 'x1000x50', 'x234x100', 'x1000x36', 'x310x100'],
                Ri = [
                    'x1000x36',
                    'x120x90',
                    'x234x60',
                    'x250x250',
                    'x300x50',
                    'x340x60',
                    'x468x60',
                    'x728x90',
                    'x540x200',
                    'x170x100'
                ],
                Li = [
                    ['35NBB9X6Z4UV4', 'ae448a026d'],
                    ['4P9TSD9APDTT6', '9483cfbbc4'],
                    ['A96ZUTUZAMETY', '6fd53e600b'],
                    ['GNPYYLVLCUVFY'],
                    ['HYRTLNXT9H2PG', '027d65f66e'],
                    ['KWRJULYJN7PAQ', 'e8cebeca35'],
                    ['R2AQ6GECMNWVA', '2f242b9904'],
                    ['RCNQL2J33NC54', 'df8729dd2c'],
                    ['TCE2H9EMJKVTL', 'c78836e69a']
                ],
                Si = {
                    '35NBB9X6Z4UV4': ['x728x90'],
                    '4P9TSD9APDTT6': ['x468x60'],
                    A96ZUTUZAMETY: ['x310x100'],
                    GNPYYLVLCUVFY: ['x234x100', 'x310x100'],
                    HYRTLNXT9H2PG: ['x260x72'],
                    KWRJULYJN7PAQ: ['x800x66'],
                    R2AQ6GECMNWVA: ['x468x60'],
                    RCNQL2J33NC54: ['x234x60', 'x800x66'],
                    TCE2H9EMJKVTL: ['x170x100']
                };
            window.__PP = window.__PP || {};
            var zi = 'c' + (new Date().getTime() + Math.floor(65536 * Math.random())),
                Oi = [650, 600],
                Ii = 0;
            function Ci(e, n) {
                return function(t) {
                    return n.call(
                        e,
                        (function(e) {
                            void 0 === e && (e = window.evt);
                            var n = {};
                            return (
                                (n.target = e.target || e.srcElement),
                                3 === n.target.nodeType && (n.target = n.target.parentNode),
                                (n.preventDefault = e.preventDefault
                                    ? function() {
                                          return e.preventDefault();
                                      }
                                    : function() {
                                          e.returnValue = !1;
                                      }),
                                n
                            );
                        })(t)
                    );
                };
            }
            var Ni = {
                    goto: function(e) {
                        window.location = e;
                    },
                    popup: function(e, n, t) {
                        return window.open(e, n, t);
                    },
                    createElement: function(e) {
                        return document.createElement(e);
                    },
                    getElementsByTagName: function(e) {
                        return document.getElementsByTagName(e);
                    },
                    registerEvent: function(e, n, t, i) {
                        var o = this;
                        if (window.addEventListener) e.addEventListener(n, Ci(e, t), !!i);
                        else if (window.attachEvent) e.attachEvent('on' + n, Ci(e, t));
                        else {
                            var r = e['on' + n];
                            e['on' + n] = r
                                ? function() {
                                      Ci(e, t).call(o), r.call(o);
                                  }
                                : t;
                        }
                    }
                },
                Mi = (function() {
                    function e(e) {
                        var n = Ni.createElement('script');
                        (n.async = 'true'), (n.src = e), (this.el = n), this.attach();
                    }
                    var n = e.prototype;
                    return (
                        (n.attach = function() {
                            var e = Ni.getElementsByTagName('script')[0];
                            e.parentNode.insertBefore(this.el, e), (this.attach = function() {});
                        }),
                        (n.destroy = function() {
                            this.el.parentNode.removeChild(this.el), delete this.el;
                        }),
                        e
                    );
                })(),
                ki = (function() {
                    function e(e) {
                        this.el = e;
                    }
                    var n = e.prototype;
                    return (
                        (n.getKVs = function() {
                            var e = this.el.attributes;
                            return a()(e).reduce(function(e, n) {
                                if (l()(n.name, 'data-pp_')) {
                                    var t = n.name.slice(8);
                                    e[t] = ('dimensions' === t ? 'x' : '') + n.value;
                                }
                                return e;
                            }, {});
                        }),
                        (n.injectAd = function(e) {
                            (this.ad = e), this.el.parentNode.insertBefore(e.container, this.el);
                        }),
                        (n.registerListeners = function() {
                            var e = this;
                            Ni.registerEvent(this.ad.container, 'click', function() {
                                var n;
                                (n = e.ad).clickHandler.apply(n, arguments);
                            });
                        }),
                        (n.destroyDom = function() {
                            this.el.parentNode.removeChild(this.el), delete this.el;
                        }),
                        e
                    );
                })(),
                Wi = (function() {
                    function e(e) {
                        (this.idx = Ii += 1),
                            (this.namespace = zi + this.idx),
                            (this.kvs = e),
                            (this.variant = e && e.partner_version ? 'PARTNER' : 'MERCHANT'),
                            this.initContainer(),
                            this.initCallback(),
                            this.initQueryString();
                    }
                    var n = e.prototype;
                    return (
                        (n.initContainer = function() {
                            (this.container = Ni.createElement('span')), (this.container.style.display = 'none');
                        }),
                        (n.injectScripts = function(e) {
                            var n = this,
                                t = document.createElement('div');
                            t.innerHTML = e;
                            var i = t.getElementsByTagName('script');
                            return (
                                a()(i).forEach(function(e) {
                                    var t = document.createElement('script');
                                    (t.text = e.text), n.container.appendChild(t), e.parentNode.removeChild(e);
                                }),
                                t.innerHTML
                            );
                        }),
                        (n.setContent = function(e) {
                            if ('MERCHANT' === this.variant) {
                                var n = this.injectScripts(e);
                                (this.container.innerHTML = n), (this.container.style.display = '');
                            } else {
                                var t = Ni.createElement('iframe');
                                t.setAttribute('width', '100%'),
                                    t.setAttribute('height', '100%'),
                                    (t.style.border = 'none'),
                                    this.container.appendChild(t);
                                var i = t.contentWindow && t.contentWindow.document;
                                i.open(),
                                    i.write(
                                        '<!DOCTYPE html>\r\n<html style="width:100%; height:100%">\r\n\t<head>\r\n\t\t<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\r\n\t\t<style type="text/css">\r\n\t\t\timg { display: block; }\r\n\t\t</style>\r\n\t</head>\r\n\t<body style="margin:0em; padding:0em; width:100%; height:100%">'
                                    ),
                                    i.write(e),
                                    i.write('\r\n\t</body>\r\n</html>'),
                                    i.close(),
                                    (this.container.style.display = 'inline-block'),
                                    this.kvs &&
                                        this.kvs.partner_version &&
                                        +this.kvs.partner_version >= 2 &&
                                        (this.container.style.display = 'inline');
                            }
                        }),
                        (n.callback = function(e) {
                            this.setContent(e),
                                this.script.destroy(),
                                delete window.__PP[this.namespace],
                                delete this.script;
                        }),
                        (n.initCallback = function() {
                            var e = this;
                            (this.callbackName = '__PP.' + this.namespace),
                                (window.__PP[this.namespace] = function() {
                                    e.callback.apply(e, arguments);
                                });
                        }),
                        (n.clickHandler = function(e) {
                            var n = e.target,
                                t = this.kvs.popup,
                                i =
                                    'width=' +
                                    Oi[0] +
                                    ',height=' +
                                    Oi[1] +
                                    ',scrollbars=yes,resizable=no,location=no,toolbar=no,menubar=no,dependent=no,dialog=yes,minimizable=no';
                            'img' !== n.nodeName.toLowerCase() ||
                                (t && 'true' !== t) ||
                                (Ni.popup(n.parentNode.href, this.namespace, i), e.preventDefault());
                        }),
                        (n.request = function() {
                            this.script = new Mi('https://www.paypal.com/imadserver/upstream' + this.queryString);
                        }),
                        (n.initQueryString = function() {
                            var e = {
                                call: this.callbackName,
                                v: 2.4,
                                vtag: 3.1,
                                rand: new Date().getTime(),
                                page: 'DefaultPage',
                                format: 'HTML',
                                presentation_types: 'HTML',
                                locale: 'en_US',
                                country_code: 'US',
                                currency_code: 'USD'
                            };
                            'MERCHANT' === this.variant && ((e.pu_type = 'ANONYMOUS'), (e.ch = 'UPSTREAM'));
                            var n = o({}, e, {}, this.kvs),
                                t = u()(n).reduce(function(e, n) {
                                    return e + '&' + n[0] + '=' + encodeURIComponent(n[1]);
                                }, '');
                            this.queryString = '?' + t.slice(1);
                        }),
                        e
                    );
                })(),
                ji = {
                    pubid: 'pub_id',
                    payerid: 'payer_id',
                    placementtype: 'dimensions',
                    cartamt: 'currency_value',
                    style: 'style',
                    boost: 'boost',
                    popup: 'popup'
                };
            a()(document.getElementsByTagName('script')).some(function(e) {
                var n;
                (n = e),
                    a()(n.attributes).forEach(function(e) {
                        if (e.name.search(/^data_pp[_-]/) >= 0) {
                            var t = e.name.replace(/^(data)_([a-z])/, '$1-$2');
                            n.setAttribute(t, e.value), n.removeAttribute(e.name);
                        }
                        var i = e.name.match(/^data-pp-([a-z]+)/);
                        i && ji[i[1]] && (n.setAttribute('data-pp_' + ji[i[1]], e.value), n.removeAttribute(e.name));
                    });
                var t = e.getAttribute('data-pp_pub_id'),
                    i = e.getAttribute('data-pp_payer_id'),
                    o = e.getAttribute('data-pp_dimensions');
                if ((i || t) && o) {
                    var r = new ki(e);
                    if (
                        !(function(e) {
                            var n = e.getKVs(),
                                t = n.payer_id || n.pub_id,
                                i = (function(e, n) {
                                    if (n)
                                        return Ti[e] && p()(Ti[e], n)
                                            ? ['image', '', e, n]
                                            : bi[e] && p()(bi[e], n)
                                            ? ['flex', 'flex', e, n]
                                            : [];
                                    if (Ei[e]) return ['image', ''].concat(Ei[e]);
                                    var t = p()(Pi, e),
                                        i = p()(Ai, e),
                                        o = p()(Ri, e) ? 'html' : '';
                                    return t ? ['image', o, e, 'none'] : i ? ['html', o, e, 'none'] : [];
                                })(n.dimensions, n.style),
                                o = i[0],
                                r = i[1],
                                a = i[2],
                                s = i[3];
                            if (a) {
                                var l = m()(Li, function(e) {
                                    return p()(e, t);
                                });
                                if (l) {
                                    var c = l[0];
                                    if (p()(Si[c], a)) return !1;
                                }
                                var u = (function(e, n, t, i) {
                                        var o = t.slice(1),
                                            r = 'none',
                                            a = !1;
                                        return (
                                            10 === i.length && ((r = wi[i.slice(0, 3)]), (a = 'Y' === i.slice(6, 7))),
                                            'flex' === e && 'flex' === n
                                                ? {
                                                      layout: 'flex',
                                                      color: 'white' !== r || a ? r : 'white-no-border',
                                                      ratio: vi[t]
                                                  }
                                                : {
                                                      layout: 'legacy',
                                                      typeNI: e,
                                                      typeEZP: n,
                                                      size: o,
                                                      color: r,
                                                      border: a
                                                  }
                                        );
                                    })(o, r, a, s),
                                    d = document.createElement('span');
                                return (
                                    e.el.parentNode.insertBefore(d, e.el),
                                    setTimeout(function() {
                                        _i({
                                            _legacy: 'flex' !== o && 'flex' !== r,
                                            account: t,
                                            amount: n.currency_value,
                                            style: u,
                                            countryCode: 'US'
                                        }).render(d);
                                    }, 0),
                                    e.destroyDom(),
                                    !0
                                );
                            }
                            return !1;
                        })(r)
                    ) {
                        var s = new Wi(r.getKVs());
                        r.injectAd(s), r.registerListeners(), r.ad.request(), r.destroyDom();
                    }
                    return !0;
                }
                return !1;
            });
        }
    ]).Messages
);
//# sourceMappingURL=merchant.js.map
