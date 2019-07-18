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
            t((t.s = 155))
        );
    })([
        function(e, n, t) {
            e.exports = t(148);
        },
        function(e, n, t) {
            e.exports = t(130);
        },
        function(e, n, t) {
            e.exports = t(100);
        },
        function(e, n, t) {
            e.exports = t(140);
        },
        function(e, n, t) {
            e.exports = t(133);
        },
        function(e, n, t) {
            'use strict';
            var i = t(9),
                o = t(108).f,
                a = t(109),
                r = t(16),
                s = t(39),
                l = t(11),
                c = t(15),
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
                    E = _ ? r : r[x] || (r[x] = {}),
                    P = E.prototype;
                for (m in n)
                    (t = !a(_ ? m : x + (w ? '.' : '#') + m, e.forced) && b && c(b, m)),
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
                                (c(r, (d = x + 'Prototype')) || l(r, d, {}),
                                (r[d][m] = f),
                                e.real && P && !P[m] && l(P, m, f)));
            };
        },
        function(e, n, t) {
            var i = t(9),
                o = t(32),
                a = t(47),
                r = t(113),
                s = i.Symbol,
                l = o('wks');
            e.exports = function(e) {
                return l[e] || (l[e] = (r && s[e]) || (r ? s : a)('Symbol.' + e));
            };
        },
        function(e, n, t) {
            e.exports = t(135);
        },
        function(e, n, t) {
            e.exports = t(142);
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
            var i = t(12),
                o = t(24),
                a = t(25);
            e.exports = i
                ? function(e, n, t) {
                      return o.f(e, n, a(1, t));
                  }
                : function(e, n, t) {
                      return (e[n] = t), e;
                  };
        },
        function(e, n, t) {
            var i = t(13);
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
        function(e, n) {
            e.exports = function(e) {
                if (null == e) throw TypeError("Can't call method on " + e);
                return e;
            };
        },
        function(e, n, t) {
            e.exports = t(146);
        },
        function(e, n, t) {
            e.exports = t(151);
        },
        function(e, n, t) {
            var i = t(14);
            e.exports = function(e) {
                if (!i(e)) throw TypeError(String(e) + ' is not an object');
                return e;
            };
        },
        function(e, n, t) {
            var i = t(31),
                o = Math.min;
            e.exports = function(e) {
                return e > 0 ? o(i(e), 9007199254740991) : 0;
            };
        },
        function(e, n, t) {
            e.exports = t(52);
        },
        function(e, n, t) {
            e.exports = t(153);
        },
        function(e, n, t) {
            var i = t(12),
                o = t(45),
                a = t(20),
                r = t(33),
                s = Object.defineProperty;
            n.f = i
                ? s
                : function(e, n, t) {
                      if ((a(e), (n = r(n, !0)), a(t), o))
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
                o = t(17);
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
            var i = t(17);
            e.exports = function(e) {
                return Object(i(e));
            };
        },
        function(e, n) {
            e.exports = {};
        },
        function(e, n) {
            e.exports =
                '* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nhtml {\n    color: #2d2d2d;\n    font-family: PayPal-Sans, Helvetica, Arial, sans-serif;\n    font-size: 14px;\n    font-weight: 400;\n    overflow: hidden;\n}\n\nimg {\n    display: block;\n    width: 100%;\n    height: auto;\n}\n\n.message__logo--svg {\n    position: relative;\n}\n\n.message__logo img {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n}\n\n/* IE will not properly scale a SVG element, but will scale a canvas element */\n.message__logo canvas {\n    display: block;\n    width: 100%;\n    visibility: hidden;\n}\n';
        },
        function(e, n) {
            var t = Math.ceil,
                i = Math.floor;
            e.exports = function(e) {
                return isNaN((e = +e)) ? 0 : (e > 0 ? i : t)(e);
            };
        },
        function(e, n, t) {
            var i = t(9),
                o = t(106),
                a = t(34),
                r = i['__core-js_shared__'] || o('__core-js_shared__', {});
            (e.exports = function(e, n) {
                return r[e] || (r[e] = void 0 !== n ? n : {});
            })('versions', []).push({
                version: '3.1.3',
                mode: a ? 'pure' : 'global',
                copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
            });
        },
        function(e, n, t) {
            var i = t(14);
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
                o = t(47),
                a = i('keys');
            e.exports = function(e) {
                return a[e] || (a[e] = o(e));
            };
        },
        function(e, n) {
            e.exports = {};
        },
        function(e, n, t) {
            'use strict';
            var i = {}.propertyIsEnumerable,
                o = Object.getOwnPropertyDescriptor,
                a = o && !i.call({ 1: 2 }, 1);
            n.f = a
                ? function(e) {
                      var n = o(this, e);
                      return !!n && n.enumerable;
                  }
                : i;
        },
        function(e, n, t) {
            var i = t(13),
                o = t(27),
                a = ''.split;
            e.exports = i(function() {
                return !Object('z').propertyIsEnumerable(0);
            })
                ? function(e) {
                      return 'String' == o(e) ? a.call(e, '') : Object(e);
                  }
                : Object;
        },
        function(e, n, t) {
            var i = t(110);
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
            var i = t(116),
                o = t(51);
            e.exports =
                Object.keys ||
                function(e) {
                    return i(e, o);
                };
        },
        function(e, n, t) {
            var i = t(132);
            e.exports = function(e) {
                if (i(e)) throw TypeError("The method doesn't accept regular expressions");
                return e;
            };
        },
        function(e, n, t) {
            var i = t(6)('match');
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
            var i = t(12),
                o = t(13),
                a = t(46);
            e.exports =
                !i &&
                !o(function() {
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
            var i = t(9),
                o = t(14),
                a = i.document,
                r = o(a) && o(a.createElement);
            e.exports = function(e) {
                return r ? a.createElement(e) : {};
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
                a,
                r = t(49),
                s = t(11),
                l = t(15),
                c = t(6),
                u = t(34),
                d = c('iterator'),
                m = !1;
            [].keys && ('next' in (a = [].keys()) ? (o = r(r(a))) !== Object.prototype && (i = o) : (m = !0)),
                null == i && (i = {}),
                u ||
                    l(i, d) ||
                    s(i, d, function() {
                        return this;
                    }),
                (e.exports = { IteratorPrototype: i, BUGGY_SAFARI_ITERATORS: m });
        },
        function(e, n, t) {
            var i = t(15),
                o = t(28),
                a = t(35),
                r = t(112),
                s = a('IE_PROTO'),
                l = Object.prototype;
            e.exports = r
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
                o = t(21),
                a = t(117),
                r = function(e) {
                    return function(n, t, r) {
                        var s,
                            l = i(n),
                            c = o(l.length),
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
            var i = t(16),
                o = t(9),
                a = function(e) {
                    return 'function' == typeof e ? e : void 0;
                };
            e.exports = function(e, n) {
                return arguments.length < 2 ? a(i[e]) || a(o[e]) : (i[e] && i[e][n]) || (o[e] && o[e][n]);
            };
        },
        function(e, n, t) {
            var i = t(24).f,
                o = t(11),
                a = t(15),
                r = t(119),
                s = t(6)('toStringTag'),
                l = r !== {}.toString;
            e.exports = function(e, n, t, c) {
                if (e) {
                    var u = t ? e : e.prototype;
                    a(u, s) || i(u, s, { configurable: !0, value: n }), c && l && o(u, 'toString', r);
                }
            };
        },
        function(e, n, t) {
            var i = t(27),
                o = t(6)('toStringTag'),
                a =
                    'Arguments' ==
                    i(
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
                      })((n = Object(e)), o))
                    ? t
                    : a
                    ? i(n)
                    : 'Object' == (r = i(n)) && 'function' == typeof n.callee
                    ? 'Arguments'
                    : r;
            };
        },
        function(e, n, t) {
            var i = t(12),
                o = t(40),
                a = t(26),
                r = t(37).f,
                s = function(e) {
                    return function(n) {
                        for (var t, s = a(n), l = o(s), c = l.length, u = 0, d = []; c > u; )
                            (t = l[u++]), (i && !r.call(s, t)) || d.push(e ? [t, s[t]] : s[t]);
                        return d;
                    };
                };
            e.exports = { entries: s(!0), values: s(!1) };
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
            t(101), t(123);
            var i = t(16);
            e.exports = i.Array.from;
        },
        function(e, n, t) {
            'use strict';
            var i = t(102).charAt,
                o = t(103),
                a = t(107),
                r = o.set,
                s = o.getterFor('String Iterator');
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
                        o = n.index;
                    return o >= t.length
                        ? { value: void 0, done: !0 }
                        : ((e = i(t, o)), (n.index += e.length), { value: e, done: !1 });
                }
            );
        },
        function(e, n, t) {
            var i = t(31),
                o = t(17),
                a = function(e) {
                    return function(n, t) {
                        var a,
                            r,
                            s = String(o(n)),
                            l = i(t),
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
            var i,
                o,
                a,
                r = t(104),
                s = t(9),
                l = t(14),
                c = t(11),
                u = t(15),
                d = t(35),
                m = t(36);
            if (r) {
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
                    (a = function(e) {
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
                    (a = function(e) {
                        return u(e, y);
                    });
            }
            e.exports = {
                set: i,
                get: o,
                has: a,
                enforce: function(e) {
                    return a(e) ? o(e) : i(e, {});
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
            var i = t(9),
                o = t(105),
                a = i.WeakMap;
            e.exports = 'function' == typeof a && /native code/.test(o.call(a));
        },
        function(e, n, t) {
            var i = t(32);
            e.exports = i('native-function-to-string', Function.toString);
        },
        function(e, n, t) {
            var i = t(9),
                o = t(11);
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
                o = t(111),
                a = t(49),
                r = t(120),
                s = t(53),
                l = t(11),
                c = t(122),
                u = t(6),
                d = t(34),
                m = t(29),
                f = t(48),
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
                    P = n + ' Iterator',
                    T = !1,
                    A = e.prototype,
                    R = A[h] || A['@@iterator'] || (f && A[f]),
                    L = (!g && R) || E(f),
                    z = ('Array' == n && A.entries) || R;
                if (
                    (z &&
                        ((w = a(z.call(new e()))),
                        p !== Object.prototype &&
                            w.next &&
                            (d || a(w) === p || (r ? r(w, p) : 'function' != typeof w[h] && l(w, h, y)),
                            s(w, P, !0, !0),
                            d && (m[P] = y))),
                    'values' == f &&
                        R &&
                        'values' !== R.name &&
                        ((T = !0),
                        (L = function() {
                            return R.call(this);
                        })),
                    (d && !_) || A[h] === L || l(A, h, L),
                    (m[n] = L),
                    f)
                )
                    if (((v = { values: E('values'), keys: x ? L : E('keys'), entries: E('entries') }), _))
                        for (b in v) (!g && !T && b in A) || c(A, b, v[b]);
                    else i({ target: n, proto: !0, forced: g || T }, v);
                return v;
            };
        },
        function(e, n, t) {
            var i = t(12),
                o = t(37),
                a = t(25),
                r = t(26),
                s = t(33),
                l = t(15),
                c = t(45),
                u = Object.getOwnPropertyDescriptor;
            n.f = i
                ? u
                : function(e, n) {
                      if (((e = r(e)), (n = s(n, !0)), c))
                          try {
                              return u(e, n);
                          } catch (e) {}
                      if (l(e, n)) return a(!o.f.call(e, n), e[n]);
                  };
        },
        function(e, n, t) {
            var i = t(13),
                o = /#|\.prototype\./,
                a = function(e, n) {
                    var t = s[r(e)];
                    return t == c || (t != l && ('function' == typeof n ? i(n) : !!n));
                },
                r = (a.normalize = function(e) {
                    return String(e)
                        .replace(o, '.')
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
            var i = t(48).IteratorPrototype,
                o = t(114),
                a = t(25),
                r = t(53),
                s = t(29),
                l = function() {
                    return this;
                };
            e.exports = function(e, n, t) {
                var c = n + ' Iterator';
                return (e.prototype = o(i, { next: a(1, t) })), r(e, c, !1, !0), (s[c] = l), e;
            };
        },
        function(e, n, t) {
            var i = t(13);
            e.exports = !i(function() {
                function e() {}
                return (e.prototype.constructor = null), Object.getPrototypeOf(new e()) !== e.prototype;
            });
        },
        function(e, n, t) {
            var i = t(13);
            e.exports =
                !!Object.getOwnPropertySymbols &&
                !i(function() {
                    return !String(Symbol());
                });
        },
        function(e, n, t) {
            var i = t(20),
                o = t(115),
                a = t(51),
                r = t(36),
                s = t(118),
                l = t(46),
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
                            ? ((u.prototype = i(e)), (t = new u()), (u.prototype = null), (t[c] = e))
                            : (t = d()),
                        void 0 === n ? t : o(t, n)
                    );
                }),
                (r[c] = !0);
        },
        function(e, n, t) {
            var i = t(12),
                o = t(24),
                a = t(20),
                r = t(40);
            e.exports = i
                ? Object.defineProperties
                : function(e, n) {
                      a(e);
                      for (var t, i = r(n), s = i.length, l = 0; s > l; ) o.f(e, (t = i[l++]), n[t]);
                      return e;
                  };
        },
        function(e, n, t) {
            var i = t(15),
                o = t(26),
                a = t(50).indexOf,
                r = t(36);
            e.exports = function(e, n) {
                var t,
                    s = o(e),
                    l = 0,
                    c = [];
                for (t in s) !i(r, t) && i(s, t) && c.push(t);
                for (; n.length > l; ) i(s, (t = n[l++])) && (~a(c, t) || c.push(t));
                return c;
            };
        },
        function(e, n, t) {
            var i = t(31),
                o = Math.max,
                a = Math.min;
            e.exports = function(e, n) {
                var t = i(e);
                return t < 0 ? o(t + n, 0) : a(t, n);
            };
        },
        function(e, n, t) {
            var i = t(52);
            e.exports = i('document', 'documentElement');
        },
        function(e, n, t) {
            'use strict';
            var i = t(54),
                o = {};
            (o[t(6)('toStringTag')] = 'z'),
                (e.exports =
                    '[object z]' !== String(o)
                        ? function() {
                              return '[object ' + i(this) + ']';
                          }
                        : o.toString);
        },
        function(e, n, t) {
            var i = t(20),
                o = t(121);
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
                              return i(t), o(a), n ? e.call(t, a) : (t.__proto__ = a), t;
                          };
                      })()
                    : void 0);
        },
        function(e, n, t) {
            var i = t(14);
            e.exports = function(e) {
                if (!i(e) && null !== e) throw TypeError("Can't set " + String(e) + ' as a prototype');
                return e;
            };
        },
        function(e, n, t) {
            var i = t(11);
            e.exports = function(e, n, t, o) {
                o && o.enumerable ? (e[n] = t) : i(e, n, t);
            };
        },
        function(e, n, t) {
            var i = t(5),
                o = t(124);
            i(
                {
                    target: 'Array',
                    stat: !0,
                    forced: !t(129)(function(e) {
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
                a = t(125),
                r = t(126),
                s = t(21),
                l = t(127),
                c = t(128);
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
                if ((h && (g = i(g, p > 2 ? arguments[2] : void 0, 2)), null == x || (f == Array && r(x))))
                    for (t = new f((n = s(m.length))); n > y; y++) l(t, y, h ? g(m[y], y) : m[y]);
                else
                    for (d = x.call(m), t = new f(); !(u = d.next()).done; y++)
                        l(t, y, h ? a(d, g, [u.value, y], !0) : u.value);
                return (t.length = y), t;
            };
        },
        function(e, n, t) {
            var i = t(20);
            e.exports = function(e, n, t, o) {
                try {
                    return o ? n(i(t)[0], t[1]) : n(t);
                } catch (n) {
                    var a = e.return;
                    throw (void 0 !== a && i(a.call(e)), n);
                }
            };
        },
        function(e, n, t) {
            var i = t(6),
                o = t(29),
                a = i('iterator'),
                r = Array.prototype;
            e.exports = function(e) {
                return void 0 !== e && (o.Array === e || r[a] === e);
            };
        },
        function(e, n, t) {
            'use strict';
            var i = t(33),
                o = t(24),
                a = t(25);
            e.exports = function(e, n, t) {
                var r = i(n);
                r in e ? o.f(e, r, a(0, t)) : (e[r] = t);
            };
        },
        function(e, n, t) {
            var i = t(54),
                o = t(29),
                a = t(6)('iterator');
            e.exports = function(e) {
                if (null != e) return e[a] || e['@@iterator'] || o[i(e)];
            };
        },
        function(e, n, t) {
            var i = t(6)('iterator'),
                o = !1;
            try {
                var a = 0,
                    r = {
                        next: function() {
                            return { done: !!a++ };
                        },
                        return: function() {
                            o = !0;
                        }
                    };
                (r[i] = function() {
                    return this;
                }),
                    Array.from(r, function() {
                        throw 2;
                    });
            } catch (e) {}
            e.exports = function(e, n) {
                if (!n && !o) return !1;
                var t = !1;
                try {
                    var a = {};
                    (a[i] = function() {
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
            t(131);
            var i = t(22);
            e.exports = i('String', 'startsWith');
        },
        function(e, n, t) {
            'use strict';
            var i = t(5),
                o = t(21),
                a = t(41),
                r = t(17),
                s = t(42),
                l = ''.startsWith,
                c = Math.min;
            i(
                { target: 'String', proto: !0, forced: !s('startsWith') },
                {
                    startsWith: function(e) {
                        var n = String(r(this));
                        a(e);
                        var t = o(c(arguments.length > 1 ? arguments[1] : void 0, n.length)),
                            i = String(e);
                        return l ? l.call(n, i, t) : n.slice(t, t + i.length) === i;
                    }
                }
            );
        },
        function(e, n, t) {
            var i = t(14),
                o = t(27),
                a = t(6)('match');
            e.exports = function(e) {
                var n;
                return i(e) && (void 0 !== (n = e[a]) ? !!n : 'RegExp' == o(e));
            };
        },
        function(e, n, t) {
            t(134);
            var i = t(16);
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
            t(136);
            var i = t(22);
            e.exports = i('Array', 'find');
        },
        function(e, n, t) {
            'use strict';
            var i = t(5),
                o = t(137).find,
                a = t(56),
                r = !0;
            'find' in [] &&
                Array(1).find(function() {
                    r = !1;
                }),
                i(
                    { target: 'Array', proto: !0, forced: r },
                    {
                        find: function(e) {
                            return o(this, e, arguments.length > 1 ? arguments[1] : void 0);
                        }
                    }
                ),
                a('find');
        },
        function(e, n, t) {
            var i = t(39),
                o = t(38),
                a = t(28),
                r = t(21),
                s = t(138),
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
                                _ = a(f),
                                w = o(_),
                                v = i(p, g, 3),
                                b = r(w.length),
                                E = 0,
                                P = h || s,
                                T = n ? P(f, b) : t ? P(f, 0) : void 0;
                            b > E;
                            E++
                        )
                            if ((m || E in w) && ((x = v((y = w[E]), E, _)), e))
                                if (n) T[E] = x;
                                else if (x)
                                    switch (e) {
                                        case 3:
                                            return !0;
                                        case 5:
                                            return y;
                                        case 6:
                                            return E;
                                        case 2:
                                            l.call(T, y);
                                    }
                                else if (u) return !1;
                        return d ? -1 : c || u ? u : T;
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
            var i = t(14),
                o = t(139),
                a = t(6)('species');
            e.exports = function(e, n) {
                var t;
                return (
                    o(e) &&
                        ('function' != typeof (t = e.constructor) || (t !== Array && !o(t.prototype))
                            ? i(t) && null === (t = t[a]) && (t = void 0)
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
            t(141);
            var i = t(22);
            e.exports = i('Array', 'includes');
        },
        function(e, n, t) {
            'use strict';
            var i = t(5),
                o = t(50).includes,
                a = t(56);
            i(
                { target: 'Array', proto: !0 },
                {
                    includes: function(e) {
                        return o(this, e, arguments.length > 1 ? arguments[1] : void 0);
                    }
                }
            ),
                a('includes');
        },
        function(e, n, t) {
            t(143);
            var i = t(16);
            e.exports = i.Object.assign;
        },
        function(e, n, t) {
            var i = t(5),
                o = t(144);
            i({ target: 'Object', stat: !0, forced: Object.assign !== o }, { assign: o });
        },
        function(e, n, t) {
            'use strict';
            var i = t(12),
                o = t(13),
                a = t(40),
                r = t(145),
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
                        7 != u({}, e)[t] || 'abcdefghijklmnopqrst' != a(u({}, n)).join('')
                    );
                })
                    ? function(e, n) {
                          for (var t = l(e), o = arguments.length, u = 1, d = r.f, m = s.f; o > u; )
                              for (
                                  var f, p = c(arguments[u++]), g = d ? a(p).concat(d(p)) : a(p), h = g.length, y = 0;
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
            t(147);
            var i = t(16);
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
                                    var i = void 0,
                                        o = void 0,
                                        a = !1,
                                        r = !1,
                                        s = !1;
                                    c();
                                    try {
                                        n(
                                            function(e) {
                                                s ? t.resolve(e) : ((a = !0), (i = e));
                                            },
                                            function(e) {
                                                s ? t.reject(e) : ((r = !0), (o = e));
                                            }
                                        );
                                    } catch (e) {
                                        return u(), void this.reject(e);
                                    }
                                    u(), (s = !0), a ? this.resolve(i) : r && this.reject(o);
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
                                        o = this.rejected,
                                        a = this.handlers;
                                    if (!this.dispatching && (t || o)) {
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
                                            a.push(e),
                                            {
                                                cancel: function() {
                                                    a.splice(a.indexOf(e), 1);
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
            t(150);
            var i = t(22);
            e.exports = i('String', 'endsWith');
        },
        function(e, n, t) {
            'use strict';
            var i = t(5),
                o = t(21),
                a = t(41),
                r = t(17),
                s = t(42),
                l = ''.endsWith,
                c = Math.min;
            i(
                { target: 'String', proto: !0, forced: !s('endsWith') },
                {
                    endsWith: function(e) {
                        var n = String(r(this));
                        a(e);
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
            t(152);
            var i = t(22);
            e.exports = i('String', 'includes');
        },
        function(e, n, t) {
            'use strict';
            var i = t(5),
                o = t(41),
                a = t(17);
            i(
                { target: 'String', proto: !0, forced: !t(42)('includes') },
                {
                    includes: function(e) {
                        return !!~String(a(this)).indexOf(o(e), arguments.length > 1 ? arguments[1] : void 0);
                    }
                }
            );
        },
        function(e, n, t) {
            t(154);
            var i = t(16);
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
                    return I;
                });
            var a = t(2),
                r = t.n(a),
                s = t(1),
                l = t.n(s),
                c = t(4),
                u = t.n(c),
                d = t(7),
                m = t.n(d),
                f = t(3),
                p = t.n(f);
            function g(e, n) {
                if (null == e) return {};
                var t,
                    i,
                    o = {},
                    a = Object.keys(e);
                for (i = 0; i < a.length; i++) n.indexOf((t = a[i])) >= 0 || (o[t] = e[t]);
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
            function P(e, n) {
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
            function T(e) {
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
                z = Date.now() % 1e9,
                I = (function() {
                    function e() {
                        if (
                            ((this.name = void 0),
                            (this.weakmap = void 0),
                            (this.keys = void 0),
                            (this.values = void 0),
                            (z += 1),
                            (this.name = '__weakmap_' + ((1e9 * Math.random()) >>> 0) + '__' + z),
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
                                if (T(i) && P(i)) {
                                    if (e)
                                        try {
                                            e.delete(i);
                                        } catch (e) {}
                                    n.splice(t, 1), this.values.splice(t, 1), (t -= 1);
                                }
                            }
                        }),
                        (n.isSafeToReadWrite = function(e) {
                            return !T(e);
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
                            var a = this.keys,
                                r = this.values,
                                s = A(a, e);
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
            var S = t(8),
                O = t.n(S);
            function C(e) {
                var n = new Map();
                return function() {
                    for (var t = arguments.length, i = new Array(t), o = 0; o < t; o++) i[o] = arguments[o];
                    var a = JSON.stringify(i);
                    return n.has(a) || n.set(a, e.apply(void 0, i)), n.get(a);
                };
            }
            function N(e, n) {
                var t = new Map();
                return function(i, o) {
                    void 0 === o && (o = !1);
                    var a = JSON.stringify(
                        n.map(function(e) {
                            return i[e];
                        })
                    );
                    return (t.has(a) && !o) || t.set(a, e(i)), t.get(a);
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
                        for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++) o[a] = arguments[a];
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
            function j(e) {
                void 0 === e && (e = {});
                var n = o({}, e);
                return [n, M(O.a, n)];
            }
            function H(e) {
                return u()(e).reduce(function(e, n) {
                    var t,
                        i,
                        a,
                        r = n[0],
                        s = n[1];
                    return Array.isArray(s)
                        ? o({}, e, (((i = {})[r] = [].concat(s)), i))
                        : o({}, e, 'object' == typeof s ? (((a = {})[r] = H(s)), a) : (((t = {})[r] = s), t));
                }, {});
            }
            function B(e, n) {
                return (function e(n, t) {
                    return u()(t).reduce(function(t, i) {
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
                            : o({}, t, (((s = {})[c] = H(u)), s));
                    }, n);
                })(H(e), n);
            }
            function Y(e, n) {
                return n.split('.').reduce(function(e, n) {
                    return 'object' == typeof e || 'function' == typeof e ? e[n] : void 0;
                }, e);
            }
            function D(e, n, t) {
                var i;
                void 0 === t && (t = '-');
                var o,
                    a = e.indexOf(t);
                if (-1 === a) return ((o = {})[e] = n), o;
                var r = e.slice(0, a),
                    s = e.slice(a + 1);
                return ((i = {})[r] = D(s, n)), i;
            }
            function U(e) {
                return 'object' == typeof HTMLElement
                    ? e instanceof HTMLElement
                    : e && 'object' == typeof e && null !== e && 1 === e.nodeType && 'string' == typeof e.nodeName;
            }
            function G(e) {
                var n = r()(e.attributes)
                    .filter(function(e) {
                        var n = e.nodeName;
                        return l()(n, 'data-pp-');
                    })
                    .reduce(function(e, n) {
                        var t = n.nodeValue;
                        return t ? B(e, D(n.nodeName.replace('data-pp-', ''), t)) : e;
                    }, {});
                if (
                    !e.firstElementChild ||
                    'SCRIPT' !== e.firstElementChild.tagName ||
                    'text/template' !== e.firstElementChild.getAttribute('type')
                )
                    return n;
                var t = e.firstElementChild.textContent.trim();
                return e.removeChild(e.firstElementChild), B(n, { style: { markup: t } });
            }
            var F = j(window.__paypal_messages_state__ || { nextId: 0, config: {} }),
                V = F[0],
                Z = F[1];
            Object.defineProperty(window, '__paypal_messages_state__', {
                value: V,
                enumerable: !1,
                configurable: !0,
                writable: !1
            });
            var K = t(18),
                J = t.n(K),
                q = t(0),
                Q = k(function(e, n, t) {
                    var i = e.uuid,
                        a = e.urls;
                    void 0 === t && (t = !1);
                    var r = new window.Image();
                    if ('object' == typeof n) {
                        var s = o({}, n, { uuid: t ? i + '::banner.hidden:true' : i }),
                            l = u()(s).reduce(function(e, n) {
                                return e + '&' + n[0] + '=' + n[1];
                            }, '');
                        r.src = (a[n.et] || a.DEFAULT) + '&bdata=' + encodeURIComponent(l.slice(1));
                    } else 'string' == typeof n && (r.src = a[n] || a.DEFAULT);
                }, 2),
                X = {
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
                ee = [],
                ne = [];
            function te(e) {
                var n = J()(X);
                return e.reduce(function(e, t) {
                    if (p()(n, t.event)) {
                        e[t.event] = e[t.event] || [];
                        var i = o({}, t);
                        delete i.event, e[t.event].push(i);
                    }
                    return e;
                }, {});
            }
            var ie = 0,
                oe = {
                    flush: function(e) {
                        return (
                            void 0 === e && (e = !1),
                            ie >= 3
                                ? q.ZalgoPromise.resolve()
                                : (e
                                      ? q.ZalgoPromise.resolve()
                                      : q.ZalgoPromise.all(ne).then(function() {
                                            ne.length = 0;
                                        })
                                  ).then(function() {
                                      if (0 !== ee.length) {
                                          ee.push({ event: X.FLUSH, flushType: e ? 'immediate' : 'normal' }),
                                              3 === (ie += 1) && ee.push({ event: X.FLUSH_CAP, cap: 3 });
                                          var n = { version: '1.0.0', events: te(ee) };
                                          ee.length = 0;
                                          var t = new XMLHttpRequest();
                                          t.open('POST', 'https://www.paypal.com/ppcredit/messagingLogger', !0),
                                              t.setRequestHeader('Content-Type', 'application/json;charset=UTF-8'),
                                              t.send(JSON.stringify({ data: n }));
                                      }
                                  })
                        );
                    },
                    info: function(e, n) {
                        void 0 === n && (n = {}), ee.push(o({ event: e }, n));
                    },
                    error: function(e) {
                        oe.info(X.ERROR, e), oe.flush(!0);
                    },
                    waitFor: function(e) {
                        ne.push(e);
                    },
                    track: Q,
                    warn: function() {
                        for (var e, n = arguments.length, t = new Array(n), i = 0; i < n; i++) t[i] = arguments[i];
                        (e = console).warn.apply(e, ['[PayPal Messages]'].concat(t));
                    }
                },
                ae = !1;
            setInterval(function() {
                ae ||
                    ((ae = !0),
                    oe.flush().then(function() {
                        ae = !1;
                    }));
            }, 3e3);
            var re = C(function(e) {
                var n,
                    t = e.markup;
                return q.ZalgoPromise.resolve(
                    l()(t, 'https://www.paypalobjects.com')
                        ? ((n = t),
                          new q.ZalgoPromise(function(e) {
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
            var se = { US: 'en_US', GB: 'en_GB', FR: 'fr_FR', DE: 'de_DE' };
            function le(e) {
                var n = e.match(/^<!--([\s\S]+?)-->/);
                if (n)
                    try {
                        return JSON.parse(n[1]);
                    } catch (e) {
                        throw new Error($.INVALID_CUSTOM_BANNER_JSON);
                    }
                return {};
            }
            var ce = N(
                    function(e) {
                        var n = e.account,
                            t = e.amount,
                            i = e.countryCode;
                        return new q.ZalgoPromise(function(o) {
                            var a = 'c' + Math.floor(Math.random() * Math.pow(10, 19)),
                                r = {
                                    dimensions: 'x200x51',
                                    currency_value: t,
                                    format: 'HTML',
                                    presentation_types: 'HTML',
                                    ch: 'UPSTREAM',
                                    call: '__PP.' + a
                                };
                            i && se[i] && ((r.country_code = i), (r.locale = se[i]));
                            var s = u()(r)
                                    .filter(function(e) {
                                        return e[1];
                                    })
                                    .reduce(
                                        function(e, n) {
                                            return e + '&' + n[0] + '=' + n[1];
                                        },
                                        l()(n, 'client-id') ? 'client_id=' + n.slice(10) : 'pub_id=' + n
                                    ),
                                c = document.createElement('script');
                            (c.async = !0),
                                (c.src = 'https://www.paypal.com/imadserver/upstream?' + s),
                                oe.info(X.MESSAGE_FETCH_INITIATED, { account: n, amount: t }),
                                document.head.appendChild(c),
                                (window.__PP[a] = function(i) {
                                    oe.info(X.MESSAGE_FETCH_RECEIVED, { account: n, amount: t }),
                                        document.head.removeChild(c),
                                        delete window.__PP[a];
                                    try {
                                        o({ markup: JSON.parse(i.replace(/<\/?div>/g, '')), options: e });
                                    } catch (n) {
                                        o({ markup: i, options: e });
                                    }
                                });
                        });
                    },
                    ['account', 'amount', 'countryCode']
                ),
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
                                    var i = ue[e].get(n);
                                    ue[e].set(n, function(e) {
                                        i(e), t(e);
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
            var ye = t(57),
                xe = t.n(ye),
                _e = t(19),
                we = t.n(_e),
                ve = t(58),
                be = t.n(ve),
                Ee = t(59),
                Pe = t.n(Ee),
                Te = t(30),
                Ae = t.n(Te),
                Re = t(10),
                Le = t.n(Re),
                ze = t(60),
                Ie = t.n(ze),
                Se = t(61),
                Oe = t.n(Se),
                Ce = t(43),
                Ne = t.n(Ce),
                Me = t(62),
                ke = t.n(Me),
                We = t(63),
                je = t.n(We),
                He = t(64),
                Be = t.n(He),
                Ye = t(65),
                De = t.n(Ye),
                Ue = t(66),
                Ge = t.n(Ue),
                Fe = t(67),
                Ve = t.n(Fe),
                Ze = [
                    ['default', [Le.a, Ae.a, Ie.a].join('\n')],
                    ['logo.type:primary', De.a],
                    ['logo.type:alternative', Oe.a],
                    ['logo.type:inline', Ne.a],
                    ['logo.type:none', [Ne.a, ke.a].join('\n')],
                    ['logo.position:right', je.a],
                    ['logo.position:top', Be.a],
                    ['logo.type:alternative && logo.position:top', Ge.a],
                    ['text.color:white', Ve.a]
                ],
                Ke = t(68),
                Je = t.n(Ke),
                qe = t(69),
                Qe = t.n(qe),
                Xe = t(70),
                $e = t.n(Xe),
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
                xn = t.n(yn),
                _n = [
                    ['default', [Le.a, Ae.a, Je.a].join('\n')],
                    ['ratio:1x1', Qe.a],
                    ['ratio:1x4', $e.a],
                    ['ratio:8x1', [nn.a, on.a].join('\n')],
                    ['ratio:20x1', [nn.a, rn.a].join('\n')],
                    ['color:blue', ln.a],
                    ['color:gray', un.a],
                    ['color:black', pn.a],
                    ['color:white', hn.a],
                    ['color:white-no-border', xn.a],
                    ['color:blue && ratio:1x4', mn.a]
                ],
                wn = t(79),
                vn = t.n(wn),
                bn = t(80),
                En = t.n(bn),
                Pn = t(81),
                Tn = t.n(Pn),
                An = t(82),
                Rn = t.n(An),
                Ln = t(83),
                zn = t.n(Ln),
                In = t(84),
                Sn = t.n(In),
                On = t(85),
                Cn = t.n(On),
                Nn = t(86),
                Mn = t.n(Nn),
                kn = t(87),
                Wn = t.n(kn),
                jn = t(88),
                Hn = t.n(jn),
                Bn = t(89),
                Yn = t.n(Bn),
                Dn = t(90),
                Un = t.n(Dn),
                Gn = t(91),
                Fn = t.n(Gn),
                Vn = t(92),
                Zn = t.n(Vn),
                Kn = t(93),
                Jn = t.n(Kn),
                qn = t(94),
                Qn = t.n(qn),
                Xn = t(95),
                $n = t.n(Xn),
                et = t(96),
                nt = t.n(et),
                tt = t(97),
                it = t.n(tt),
                ot = t(98),
                at = {
                    x168x374: { styles: Sn.a, vertical: !0 },
                    x765x60: { styles: Wn.a },
                    x1000x50: { styles: Hn.a, termsIcon: !0 },
                    x234x100: { styles: Cn.a, reverseLogo: !0 },
                    x310x100: { styles: Mn.a, reverseLogo: !0 },
                    x1000x36: { styles: Yn.a, termsIcon: !0 },
                    x120x90: { styles: Fn.a, termsIcon: !0 },
                    x234x60: { styles: Zn.a, reverseLogo: !0, termsIcon: !0 },
                    x250x250: { styles: Jn.a, reverseLogo: !0, vertical: !0, termsIcon: !0 },
                    x300x50: { styles: Qn.a, reverseLogo: !0 },
                    x340x60: { styles: Un.a, reverseLogo: !0 },
                    x468x60: { styles: $n.a, reverseLogo: !0, termsIcon: !0 },
                    x728x90: { styles: nt.a, reverseLogo: !0 },
                    x540x200: { styles: it.a, reverseLogo: !0, termsIcon: !0 },
                    x170x100: { styles: t.n(ot).a, termsIcon: !0 }
                },
                rt = Object.keys(at).map(function(e) {
                    var n = at[e],
                        t = e.slice(1),
                        i = t.split('x'),
                        o = i[1],
                        a =
                            '\n        .message {\n            width: ' +
                            i[0] +
                            'px;\n            min-height: ' +
                            o +
                            'px;\n        }\n\n        .message__container {\n            min-height: ' +
                            o +
                            'px;\n        }\n    ';
                    return (
                        n.vertical && (a = '' + a + Tn.a),
                        n.reverseLogo && (a = '' + a + En.a),
                        n.vertical && n.reverseLogo && (a = '' + a + Rn.a),
                        n.termsIcon && (a = '' + a + zn.a),
                        ['size:' + t, a]
                    );
                }),
                st = Object.keys(at).map(function(e) {
                    return ['size:' + e.slice(1), at[e].styles];
                }),
                lt = [['default', [Le.a, vn.a].join('\n')]].concat(rt, st),
                ct = t(99),
                ut = {
                    'layout:text': Ze,
                    'layout:flex': _n,
                    'layout:legacy': lt,
                    'layout:custom': [['default', [Le.a, t.n(ct).a].join('\n')]]
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
                xt = {
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
                _t = {
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
                wt = {
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
                var t = m()(e, function(e) {
                    var t = e[1];
                    return p()(t, n);
                });
                if (t) return t[0];
                if (we()(n, '.')) {
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
            var Et = document.createElement('div');
            Et.innerHTML = be.a;
            var Pt = document.createElement('div');
            Pt.innerHTML = Pe.a;
            var Tt = k(function(e, n, t) {
                    return n.getElementsByClassName(e + '__' + t)[0];
                }),
                At = k(function(e, n) {
                    var t = document.createElement('style');
                    (t.textContent = n), e.insertBefore(t, e.firstChild);
                }),
                Rt = k(function(e, n) {
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
                Lt = k(function(e, n) {
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
                zt = k(function(e, n, t, i) {
                    if ((void 0 === t && (t = 'PayPal Credit'), 'string' == typeof n)) {
                        var o = new Image();
                        (o.alt = t),
                            (o.className = 'message__logo'),
                            (o.src = n),
                            i && (o.srcset = i),
                            e.appendChild(o);
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
                                for (var n = e.innerText, t = []; we()(n, i[0]); ) t.push(i[0]), i.shift();
                                if (0 === t.length || (1 === t.length && xe()(n, t[0]))) return e.classList.add('br');
                                var o = document.createElement('span');
                                (o.innerText = n), (o.className = 'br');
                                var a = t.reduce(
                                    function(e, n) {
                                        var t = (function(e, n) {
                                            var t = e.innerText,
                                                i = t.indexOf(n) + n.length,
                                                o = e.cloneNode();
                                            if (((o.innerText = t.slice(0, i).trim()), t.length !== i)) {
                                                var a = e.cloneNode();
                                                return (a.innerText = t.slice(i).trim()), [o, a];
                                            }
                                            return [o];
                                        })(e[e.length - 1], n);
                                        return [].concat(e.slice(0, -1), t);
                                    },
                                    [o]
                                );
                                return (
                                    (e.innerHTML = ''),
                                    a.forEach(function(n) {
                                        e.appendChild(n), e.appendChild(document.createTextNode(' '));
                                    })
                                );
                            });
                        })(0, i),
                    It(i)
                );
            }
            var Ot = k(function(e, n, t) {
                    return (
                        !1 !== t &&
                        ('string' != typeof t && 'object' != typeof t
                            ? null
                            : It(
                                  (i = 'string' == typeof t ? [{ tag: t }] : Array.isArray(t) ? t : [t]).map(function(
                                      t
                                  ) {
                                      var o,
                                          a = document.createElement('span');
                                      if ((i.length > 1 && a.setAttribute('class', 'multi'), 'string' == typeof t))
                                          (o = St(bt(e[n], t))), a.classList.add('tag--' + t.split('.', 1)[0]);
                                      else {
                                          var r = t.tag,
                                              s = g(t, ['tag']);
                                          (o = St(bt(e[n], r), s)), a.classList.add('tag--' + r.split('.', 1)[0]);
                                      }
                                      return (
                                          o.forEach(function(e) {
                                              return a.appendChild(e);
                                          }),
                                          a
                                      );
                                  })
                              ))
                    );
                    var i;
                }),
                Ct = k(function(e, n, t) {
                    return t.reduce(
                        function(t, i) {
                            var o = i[0],
                                a = i[1],
                                r = o.split(' && ');
                            return 'default' === o ||
                                r.every(function(n) {
                                    return p()(e, n);
                                })
                                ? n === Array
                                    ? [].concat(t, [a])
                                    : B(t, a)
                                : t;
                        },
                        n === Array ? [] : {}
                    );
                }),
                Nt = {
                    getTemplateNode: C(function(e, n) {
                        var t = Y(e, 'style.layout');
                        if ('custom' === t)
                            return (function(e) {
                                var t = n.data,
                                    i = n.meta,
                                    o = n.template,
                                    a = document.createElement('div'),
                                    s = i.offerType;
                                if ('' === o) return a;
                                try {
                                    var l = o.replace(/{{\s*?([^\s]+?)\s*?}}/g, function(e, n) {
                                        var i = n.split('.'),
                                            o = i[0],
                                            a = i.slice(1).join('.');
                                        if ('logo' === o) {
                                            var r = document.createElement('div');
                                            return zt(r, Y(dt, a.toUpperCase()), 'PayPal Credit logo'), r.innerHTML;
                                        }
                                        return St(bt(t[o], a)).reduce(function(e, n) {
                                            return '' + e + (n.outerHTML || ' ');
                                        }, '');
                                    });
                                    (a.innerHTML = l),
                                        m()(r()(a.children), function(e) {
                                            return 'STYLE' !== e.tagName;
                                        }).classList.add('offer--' + s.replace(/:/g, '-').toLowerCase());
                                } catch (e) {
                                    oe.warn(e);
                                }
                                return a;
                            })();
                        var i = Y(e, 'style._flattened'),
                            o = Y(n, 'meta.offerType'),
                            a = Y(n, 'data');
                        if ('legacy' === t) {
                            var s = Y(e, 'style.typeNI'),
                                l = Y(e, 'style.typeEZP'),
                                c = 'NI' === o.split(':')[0] ? s : l;
                            if ('image' === c)
                                return (function(e, t) {
                                    var i = n.meta,
                                        o = Pt.cloneNode(!0),
                                        a = Tt('pp-legacy', o),
                                        r = ['link', 'pixel'].map(a),
                                        s = r[0],
                                        l = r[1],
                                        c = Y(e, 'size'),
                                        u = Y(e, 'color'),
                                        d = Y(e, 'border');
                                    s.setAttribute('href', i.clickUrl), l.setAttribute('href', i.impressionUrl);
                                    var m = 'https://www.paypalobjects.com/upstream/assets/messaging/legacy',
                                        f = 'none' === u ? '' : '-' + u + (!0 === d ? '' : '-no-border'),
                                        p = ('none' === u ? 'v1' : 'v2') + '/' + c.replace(/x/, '-') + f,
                                        g = [1, 1.5, 2].map(function(e) {
                                            return m + '/' + p + '@' + e + 'x.png ' + e + 'x';
                                        });
                                    return zt(s, m + '/' + p + '@1x.png', 'PayPal Credit Message', g.join(', ')), o;
                                })(e.style);
                            if (!c) throw new Error($.INVALID_LEGACY_BANNER);
                        }
                        var u = Ct(i),
                            d = u(
                                Object,
                                (function(e, n) {
                                    switch (o) {
                                        case 'EZP:ANY:EQZ':
                                            return ht[n];
                                        case 'EZP:ANY:GTZ':
                                            return yt[n];
                                        case 'PALA:MULTI:EQZ':
                                            return xt[n];
                                        case 'PALA:MULTI:GTZ':
                                            return _t[n];
                                        case 'PALA:SINGLE:EQZ':
                                            return wt[n];
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
                            f = u(Array, ut['layout:' + t]),
                            p = Ot(a),
                            g = Et.cloneNode(!0),
                            h = Tt('message', g),
                            y = ['logo-container', 'headline', 'sub-headline', 'disclaimer'].map(h),
                            x = y[0],
                            _ = y[1],
                            w = y[2],
                            v = y[3];
                        if (
                            (Rt(_, p('headline', d.headline)),
                            Rt(w, p('subHeadline', d.subHeadline)),
                            Lt(v, p('disclaimer', d.disclaimer)),
                            zt(x, d.logo, 'PayPal Credit logo'),
                            'inline' === Y(e, 'style.logo.type') && _.appendChild(x),
                            'none' === Y(e, 'style.logo.type'))
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
                        var P = function(n) {
                            return 'legacy' === t ? n.replace(/\.message/g, '[data-pp-id="' + e.id + '"] .message') : n;
                        };
                        return d.styles && At(g, P(d.styles.join(''))), At(g, P(f.join('\n'))), g;
                    })
                };
            function Mt(e, n, t) {
                if ('string' == typeof n) return (e.innerHTML = n), {};
                var i = n.meta,
                    o = Nt.getTemplateNode(t, n);
                return (
                    r()(o.children).forEach(function(n) {
                        return e.appendChild(n.cloneNode(!0));
                    }),
                    { meta: i }
                );
            }
            var kt = k(function(e, n) {
                var t = n.markup,
                    i = n.options;
                return new q.ZalgoPromise(function(n) {
                    'IFRAME' === e.tagName
                        ? 'string' == typeof t
                            ? (function(e, n) {
                                  return new q.ZalgoPromise(function(t) {
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
                                  return new q.ZalgoPromise(function(i) {
                                      var o = e.contentWindow,
                                          a = n.meta,
                                          s = Nt.getTemplateNode(t, n),
                                          l = o.document.importNode(s, !0),
                                          c = r()(l.getElementsByTagName('img')).map(function(e) {
                                              return new q.ZalgoPromise(function(n) {
                                                  return e.addEventListener('load', n);
                                              });
                                          });
                                      for (
                                          r()(l.getElementsByTagName('style')).forEach(function(e) {
                                              var n = o.document.createElement('style');
                                              (n.textContent = e.textContent),
                                                  e.parentNode.insertBefore(n, e),
                                                  e.parentNode.removeChild(e);
                                          });
                                          o.document.body.firstChild;

                                      )
                                          o.document.body.removeChild(o.document.body.firstChild);
                                      r()(l.children).forEach(function(e) {
                                          return o.document.body.appendChild(e);
                                      }),
                                          q.ZalgoPromise.all(c).then(function() {
                                              i(a);
                                          });
                                  });
                              })(e, t, i).then(function(e) {
                                  return n({ meta: e, options: i });
                              })
                        : n({ meta: Mt(e, t, i), options: i });
                });
            });
            function Wt(e) {
                var n = e.getBoundingClientRect(),
                    t = (n.top + n.bottom) / 2,
                    i = (n.left + n.right) / 2;
                return !(t > window.innerHeight || t < 0 || i > window.innerWidth || i < 0);
            }
            var jt = k(function(e, n) {
                    var t = n.options.amount,
                        i = n.events,
                        o = n.track,
                        a = e.getBoundingClientRect(),
                        r = {
                            et: 'CLIENT_IMPRESSION',
                            event_type: 'stats',
                            pos_x: Math.round(a.left),
                            pos_y: Math.round(a.top),
                            browser_width: window.innerWidth,
                            browser_height: window.innerHeight,
                            visible: Wt(e),
                            amount: t
                        };
                    r.visible ||
                        i.on('scroll', function() {
                            Wt(e) &&
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
                            return new q.ZalgoPromise(function(t) {
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
                                o(r, e.hasAttribute('data-pp-message-hidden')),
                                o('MORS_IMPRESSION');
                        }),
                        i.on('click', function() {
                            o({ et: 'CLICK', event_type: 'click', link: 'Banner Wrapper' }), o('MORS_CLICK');
                        }),
                        i.on('hover', function() {
                            o({ et: 'CLIENT_IMPRESSION', event_type: 'hover' }), i.clear('hover');
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
            function Yt(e) {
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
            var Dt = k(function(e, n) {
                    var t = n.wrapper,
                        i = n.options;
                    if ('IFRAME' === e.tagName) {
                        var o = Y(i, 'style.layout'),
                            a = Y(i, 'style.ratio');
                        if (('flex' !== o && 'custom' !== o) || !a) {
                            e.setAttribute('style', 'width: ' + ('custom' !== o ? 0 : '`100%') + '; border: none;'),
                                e.setAttribute('height', 0),
                                t.removeAttribute('class');
                            var s = (function(e) {
                                    var n = document.createElement('div');
                                    n.setAttribute('style', 'width: 100%; overflow: hidden');
                                    var t = document.createElement('div');
                                    t.setAttribute('style', 'width: 10000px'),
                                        n.appendChild(t),
                                        e.parentNode.appendChild(n);
                                    var i = n.offsetWidth;
                                    return e.parentNode.removeChild(n), i;
                                })(t),
                                l =
                                    'custom' !== o && null !== e.offsetParent
                                        ? (function(e) {
                                              var n = e.contentDocument.querySelector('.message__content'),
                                                  t = window.getComputedStyle(n),
                                                  i = r()(n.children),
                                                  o = [
                                                      'margin-left',
                                                      'border-left-width',
                                                      'padding-left',
                                                      'width',
                                                      'padding-right',
                                                      'border-right-width',
                                                      'margin-right'
                                                  ];
                                              return we()(t.getPropertyValue('display'), 'flex')
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
                                c = function() {
                                    e.setAttribute('style', 'width: 100%; border: none; min-width: ' + l + 'px;'),
                                        requestAnimationFrame(function() {
                                            return requestAnimationFrame(function() {
                                                e.setAttribute(
                                                    'height',
                                                    e.contentWindow.document.documentElement.scrollHeight
                                                );
                                            });
                                        });
                                };
                            if (s < l && 'custom' !== o) {
                                if ('top' !== Y(i, 'style.logo.position') || 'primary' !== Y(i, 'style.logo.type'))
                                    throw (oe.warn(
                                        'Message Overflow. PayPal Credit Message of layout type ' +
                                            Y(i, 'style.layout') +
                                            ' requires a width of at least ' +
                                            l +
                                            'px. Current container is ' +
                                            s +
                                            'px. Attempting fallback message.'
                                    ),
                                    t.parentNode.setAttribute('data-pp-style-layout', 'text'),
                                    t.parentNode.setAttribute('data-pp-style-logo-type', 'primary'),
                                    t.parentNode.setAttribute('data-pp-style-logo-position', 'top'),
                                    window.paypal.Messages().render(t.parentNode),
                                    new Error($.OVERFLOW));
                                oe.error({ message: $.HIDDEN }),
                                    oe.warn(
                                        'Message hidden. PayPal Credit Message fallback requires minimum width of ' +
                                            l +
                                            'px. Current container is ' +
                                            s +
                                            'px. Message hidden.'
                                    ),
                                    e.setAttribute('data-pp-message-hidden', 'true');
                            } else c(), he(e).on('resize', c);
                        } else
                            !(function(e, n, t) {
                                var i = [];
                                'flex' === t
                                    ? (i = Ht[n])
                                    : Array.isArray(n)
                                    ? (i = n.map(Yt))
                                    : 'string' == typeof n && (i = [Yt(n)]);
                                var o = 'pp-flex--' + i.slice(-1)[0].ratio,
                                    a = i.reduce(function(e, n) {
                                        var t = n.breakpoint,
                                            i = n.ratio,
                                            a = n.width;
                                        return '' === e
                                            ? '\n                .' +
                                                  o +
                                                  ' {\n                    display: block;\n                    width: 100%;\n                    ' +
                                                  (Array.isArray(a)
                                                      ? '\n                                min-width: ' +
                                                        Bt(a[0]) +
                                                        ';\n                                max-width: ' +
                                                        Bt(a[1]) +
                                                        ';'
                                                      : '') +
                                                  '\n                    box-sizing: border-box;\n                    position: relative;\n                }\n        \n                .' +
                                                  o +
                                                  '::before {\n                    padding-top: ' +
                                                  Bt(i) +
                                                  ";\n                    content: '';\n                    display: block;\n                }\n        \n                ." +
                                                  o +
                                                  ' iframe {\n                    position: absolute;\n                    top: 0;\n                    left: 0;\n                    width: 100%;\n                    height: 100%;\n                }\n            '
                                            : t
                                            ? '\n            ' +
                                              e +
                                              '\n            @media (min-width: ' +
                                              Bt(t) +
                                              ') {\n                ' +
                                              (Array.isArray(a)
                                                  ? '\n                            .' +
                                                    o +
                                                    ' {\n                                min-width: ' +
                                                    Bt(a[0]) +
                                                    ';\n                                max-width: ' +
                                                    Bt(a[1]) +
                                                    ';\n                            }'
                                                  : '') +
                                              '\n                .' +
                                              o +
                                              '::before {\n                    padding-top: ' +
                                              Bt(i) +
                                              ';\n                }\n            }\n        '
                                            : e;
                                    }, ''),
                                    r = document.createElement('style');
                                (r.textContent = a), e.setAttribute('class', o), e.appendChild(r);
                            })(t, a, o),
                                e.setAttribute('style', 'width: 100%; border: none;'),
                                e.removeAttribute('height');
                    }
                }),
                Ut = k(function(e, n) {
                    if ('IFRAME' === e.tagName) {
                        var t = JSON.stringify({ 'pp-modal-event': { type: n } });
                        e.contentWindow.postMessage(t, window.top.location.origin);
                    }
                });
            function Gt(e) {
                var n = document.createElement(e);
                'iframe' === e &&
                    (n.setAttribute('title', 'PayPal Credit Promotion Message'),
                    n.setAttribute('style', 'width: 0; border: none;'),
                    n.setAttribute('src', 'about:blank'),
                    n.setAttribute('height', 0));
                var t = u()({ insertMarkup: kt, setSize: Dt, runStats: jt, postMessage: Ut, events: he }).reduce(
                    function(e, t) {
                        var i;
                        return o({}, e, (((i = {})[t[0]] = (0, t[1])(n)), i));
                    },
                    {}
                );
                return (
                    (t.clearEvents = function() {
                        return (function(e) {
                            J()(ue).forEach(function(n) {
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
            var Ft,
                Vt = t(23),
                Zt = t.n(Vt),
                Kt = { ANY: 'ANY', STRING: 'STRING', BOOLEAN: 'BOOLEAN', FUNCTION: 'FUNCTION' },
                Jt =
                    (((Ft = {})[Kt.STRING] = 'string'),
                    (Ft[Kt.BOOLEAN] = 'boolean'),
                    (Ft[Kt.FUNCTION] = 'function'),
                    Ft),
                qt = { onRender: [Kt.FUNCTION], sign: [Kt.STRING] },
                Qt = {
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
                Xt = function(e, n, t) {
                    return oe.warn(
                        'Invalid option value (' +
                            e +
                            '). Expected type "' +
                            n +
                            '" but instead received "' +
                            typeof t +
                            '".'
                    );
                };
            function $t(e, n, t) {
                return (
                    void 0 === t && (t = 'style.'),
                    u()(e).reduce(function(i, a) {
                        var r,
                            s,
                            l = a[0],
                            c = a[1];
                        return Array.isArray(c)
                            ? o(
                                  {},
                                  i,
                                  (((s = {})[l] = (function(e, n, t) {
                                      var i = e[0],
                                          o = e[1],
                                          a = void 0 === o ? [] : o;
                                      if (void 0 === n) return a[0];
                                      if (
                                          (function(e, n) {
                                              return Jt[i] === Kt.BOOLEAN
                                                  ? 'boolean' == typeof n
                                                  : i === Kt.FUNCTION
                                                  ? 'function' == typeof n
                                                  : i !== Kt.STRING || 'string' == typeof n;
                                          })(0, n)
                                      ) {
                                          if (i === Kt.STRING && a.length > 0) {
                                              var r = m()(a, function(e) {
                                                  return e.split('|').some(function(e) {
                                                      return e === n;
                                                  });
                                              });
                                              if (void 0 !== r) return r.split('|')[0];
                                              oe.warn(
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
                                      return Xt(t, Jt[i], n), a[0];
                                  })(c, n[l], '' + t + l)),
                                  s)
                              )
                            : o({}, i, (((r = {})[l] = $t(e[l], n[l] || {}, '' + t + l + '.')), r));
                    }, {})
                );
            }
            function ei(e) {
                return o({ layout: e.layout }, $t(Qt[e.layout], e));
            }
            var ni = N(
                    function(e) {
                        var n = e.offerType;
                        return new q.ZalgoPromise(function(e, t) {
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
                ti = N(
                    function(e) {
                        return new q.ZalgoPromise(function(n) {
                            var t,
                                i,
                                o,
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
                                    ((i = (t = e).account),
                                    (o = t.amount),
                                    (a = ['json=true', l()(i, 'client-id') ? 'cid=' + i.slice(10) : 'mid=' + i]).push(
                                        'country=US'
                                    ),
                                    a.push('currency=USD'),
                                    o && a.push('amount=' + o),
                                    'https://www.paypal.com/ppcredit/finance/terms?' + a.join('&')),
                                    !0
                                ),
                                r.send();
                        });
                    },
                    ['account', 'amount']
                ),
                ii = function(e, n) {
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
                oi = function(e) {
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
                    a = e.contentDocument.getElementById('close-btn'),
                    r = e.contentDocument.getElementById('header'),
                    s = e.contentDocument.getElementsByClassName('accordion'),
                    l = e.contentDocument.getElementById('modal-container'),
                    c = e.contentDocument.getElementsByClassName('modal__header-container')[0];
                return o(
                    {
                        window: e.contentWindow,
                        contentWrapper: t,
                        overlay: i,
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
            var ri = N(
                    function(e) {
                        var n = window.top.document.createElement('div'),
                            t = Gt('iframe'),
                            i = t[0],
                            a = t[1].insertMarkup,
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
                            f = j({ status: 'CLOSED' }),
                            p = f[0],
                            g = f[1];
                        function h() {
                            return l()(e.offerType, 'NI') ? 'NI' : 'EZP';
                        }
                        var y = function(e, n) {
                            return d({
                                et: 'modal-open' === e ? 'CLIENT_IMPRESSION' : 'CLICK',
                                link: n,
                                modal: h(),
                                event_type: e
                            });
                        };
                        function x() {
                            r()(p.elements.accordions).forEach(function(e) {
                                e.classList.remove('show'),
                                    e
                                        .getElementsByClassName('accordion-content')[0]
                                        .style.setProperty('max-height', null);
                            });
                        }
                        function _(e) {
                            var n = {
                                    'NI Tab': [p.elements.niTab, p.elements.niContent],
                                    'EZP Tab': [p.elements.ezpTab, p.elements.ezpContent]
                                },
                                t = n[e][0];
                            J()(n).forEach(function(e) {
                                var n = e[0],
                                    i = e[1];
                                n.classList.toggle('selected', n === t), i.classList.toggle('show', n === t);
                            }),
                                y('modal-tab', e),
                                x();
                        }
                        function w() {
                            return p.error ? P(!0) : p.modalProm;
                        }
                        function v(e) {
                            return new q.ZalgoPromise(function(t, o) {
                                'OPEN' === p.status || 'OPENING' === p.status
                                    ? (g({ status: 'CLOSING' }),
                                      p.elements.modalContainer.classList.remove('show'),
                                      setTimeout(function() {
                                          (n.style.display = 'none'),
                                              i.blur(),
                                              g({ status: 'CLOSED' }),
                                              u(),
                                              'EZP' === h() &&
                                                  setTimeout(function() {
                                                      _('EZP Tab');
                                                  }, 350),
                                              t();
                                      }, e || 0))
                                    : o();
                            });
                        }
                        function b(e) {
                            v(350), y('modal-close', e);
                        }
                        function E(n) {
                            var t = +n;
                            return (
                                Zt()(t) || (p.elements.amountInput.value = t.toFixed(2)),
                                p.elements.loader.style.setProperty('opacity', 1),
                                p.elements.financeTermsTable.style.setProperty('opacity', 0.4),
                                ti(o({}, e, { amount: n })).then(function(e) {
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
                                                                return ii(e, n);
                                                            })
                                                            .join('')
                                                      : '') +
                                                  '\n            </tbody>\n        </table>\n        ' +
                                                  (e.options && 0 !== e.options.length && 'N/A' !== e.options
                                                      ? ''
                                                      : oi(e)) +
                                                  '\n        <p id="terms-note">The monthly payment shown is an estimated amount and may not include taxes and shipping</p>\n    ';
                                        })(e));
                                })
                            );
                        }
                        function P(n) {
                            return (
                                void 0 === n && (n = !1),
                                ni(e, n)
                                    .then(a)
                                    .then(function() {
                                        g({ elements: ai(i, h()) }),
                                            (function() {
                                                p.elements.closeButton.addEventListener('click', function() {
                                                    b('Close Button');
                                                }),
                                                    p.elements.overlay.addEventListener('click', function(e) {
                                                        var n = e.target;
                                                        (n !== p.elements.contentWrapper &&
                                                            n !== p.elements.headerContainer) ||
                                                            b('Modal Overlay');
                                                    });
                                                var e = function() {
                                                    p.elements.contentWrapper.scrollTop > 0
                                                        ? p.elements.header.classList.add('show')
                                                        : p.elements.header.classList.remove('show');
                                                };
                                                if (
                                                    (p.elements.contentWrapper.addEventListener('scroll', e),
                                                    p.elements.contentWrapper.addEventListener('touchmove', e),
                                                    r()(p.elements.accordions).forEach(function(e) {
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
                                                            b('Escape Key');
                                                    }),
                                                    'EZP' === h())
                                                ) {
                                                    p.elements.niTab.addEventListener('click', function() {
                                                        return _('NI Tab');
                                                    }),
                                                        p.elements.ezpTab.addEventListener('click', function() {
                                                            return _('EZP Tab');
                                                        });
                                                    var n = function() {
                                                        E(p.elements.amountInput.value);
                                                    };
                                                    p.elements.amountInput.addEventListener('keydown', function(e) {
                                                        var t = e.key,
                                                            i = e.target;
                                                        if (t.length > 1 || e.metaKey || e.ctrlKey)
                                                            'Enter' === t && n();
                                                        else {
                                                            var o = i.value,
                                                                a = i.selectionStart,
                                                                r = o ? '' + o.slice(0, a) + t + o.slice(a) : t;
                                                            (function(e) {
                                                                if (Zt()(Number(e))) return !1;
                                                                var n = e.split('.'),
                                                                    t = n[0],
                                                                    i = n[1];
                                                                return (
                                                                    (void 0 === t ? '' : t).length <= 5 &&
                                                                    (void 0 === i ? '' : i).length <= 2
                                                                );
                                                            })(r) && ((i.value = r), i.setSelectionRange(a + 1, a + 1)),
                                                                e.preventDefault();
                                                        }
                                                    }),
                                                        p.elements.calculateButton.addEventListener('click', n);
                                                }
                                            })();
                                    })
                                    .catch(function(e) {
                                        oe.error({ message: $.MODAL_LOAD_FAILURE, err: e }), g({ error: !0 });
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
                            'EZP' === h() &&
                                w().then(function() {
                                    return E(e.amount);
                                }),
                            {
                                open: function(e) {
                                    e.preventDefault(),
                                        ('CLOSED' !== p.status && 'CLOSING' !== p.status) ||
                                            (g({ status: 'OPENING' }),
                                            w().then(function() {
                                                if (p.error)
                                                    return g({ status: 'CLOSED' }), void window.open(m, '_blank');
                                                (n.style.display = 'block'),
                                                    requestAnimationFrame(function() {
                                                        return requestAnimationFrame(function() {
                                                            x(),
                                                                i.contentWindow.focus(),
                                                                g({ status: 'OPEN' }),
                                                                c(),
                                                                p.elements.modalContainer.classList.add('show'),
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
                si = {
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
                            var r = ri(o({}, n, {}, t, { track: a }));
                            i.on('click', r.open);
                        }
                    }
                },
                li = new Map();
            function ci(e) {
                var n = (e.meta && e.meta.offerType) + '::' + e.options.style._flattened.sort().join('::'),
                    t = e.meta,
                    i = oe.track({
                        uuid: n,
                        urls: { DEFAULT: t.clickUrl, MORS_IMPRESSION: t.impressionUrl + '&idx=' + e.options.id }
                    });
                return O()(e, { track: i });
            }
            var ui = function(e) {
                    var n = e.options,
                        t = n.onRender;
                    oe.info(X.MESSAGE_RENDERED, { id: n.id }), t && t();
                },
                di = {
                    init: function(e, n) {
                        if (li.has(e)) li.get(e).update(n);
                        else {
                            var t = (function(e, n) {
                                oe.info(X.MESSAGE_CREATE_INITIATED, { id: e.id, options: e });
                                var t = j(e),
                                    i = t[0],
                                    a = t[1],
                                    r = i._legacy,
                                    s = Gt(r ? 'div' : 'iframe'),
                                    c = s[0],
                                    d = s[1],
                                    m = d.insertMarkup,
                                    f = d.setSize,
                                    h = d.events,
                                    y = d.runStats,
                                    x = d.clearEvents,
                                    _ = r ? c : document.createElement('span');
                                function w(e) {
                                    var n = (function(n) {
                                            var t = e.id,
                                                i = e.account,
                                                o = e.amount,
                                                a = e.countryCode,
                                                r = e.style,
                                                s = e._legacy,
                                                c = g(e, [
                                                    'id',
                                                    'account',
                                                    'amount',
                                                    'countryCode',
                                                    'style',
                                                    '_legacy'
                                                ]),
                                                u = { _legacy: s, id: t };
                                            if (
                                                ('string' != typeof i
                                                    ? Xt('account', 'string', i)
                                                    : 13 === i.length || 10 === i.length || l()(i, 'client-id:')
                                                    ? (u.account = i)
                                                    : oe.warn(
                                                          'Invalid option value (account). Ensure the correct Merchant Account ID has been entered.'
                                                      ),
                                                void 0 !== o)
                                            ) {
                                                var d = Number(o);
                                                Zt()(d)
                                                    ? oe.warn(
                                                          'Invalid option value (amount). Ensure value is a number.'
                                                      )
                                                    : d < 0
                                                    ? oe.warn(
                                                          'Invalid option value (amount). Ensure value is a positive number.'
                                                      )
                                                    : (u.amount = d);
                                            }
                                            return (
                                                void 0 !== a &&
                                                    ('string' != typeof a
                                                        ? oe.warn(
                                                              'Invalid option value (countryCode). Ensure value is a string.'
                                                          )
                                                        : 2 !== a.length
                                                        ? oe.warn(
                                                              'Invalid option value (countryCode). Country code should be 2 characters.'
                                                          )
                                                        : (u.countryCode = a)),
                                                'object' == typeof r && 'string' == typeof r.layout && Qt[r.layout]
                                                    ? (u.style = ei(r))
                                                    : ('object' == typeof r
                                                          ? oe.warn(
                                                                'Invalid option value (style.layout). Expected one of ["' +
                                                                    Object.keys(Qt).join('", "') +
                                                                    '"] but received "' +
                                                                    r.layout +
                                                                    '".'
                                                            )
                                                          : void 0 !== r && Xt('style', 'object', r),
                                                      (u.style = ei({ layout: 'text' }))),
                                                O()(u, $t(qt, c, '')),
                                                u
                                            );
                                        })(),
                                        t = (function(e) {
                                            return ('custom' !== Y(e, 'style.layout')
                                                ? ce(e)
                                                : q.ZalgoPromise.all([ce(e), re(e.style)]).then(function(n) {
                                                      var t = n[0],
                                                          i = n[1];
                                                      return 'object' == typeof t.markup
                                                          ? ('' === i && oe.error({ message: $.INVALID_STYLE_OPTIONS }),
                                                            (t.markup.template = i),
                                                            { markup: t.markup, options: B(e, le(i)) })
                                                          : { markup: t.markup, options: e };
                                                  })
                                            ).then(
                                                W(function(e) {
                                                    e.options.style._flattened = (function e(n, t, i) {
                                                        return (
                                                            void 0 === t && (t = ''),
                                                            void 0 === i && (i = ':'),
                                                            u()(n).reduce(function(n, o) {
                                                                var a = o[0],
                                                                    r = o[1];
                                                                switch (typeof r) {
                                                                    case 'object':
                                                                        return [].concat(n, e(r, '' + t + a + '.'));
                                                                    case 'string':
                                                                    default:
                                                                        return [].concat(n, ['' + t + a + i + r]);
                                                                }
                                                            }, [])
                                                        );
                                                    })(e.options.style);
                                                })
                                            );
                                        })(n)
                                            .then(m)
                                            .then(
                                                (function() {
                                                    for (var e = arguments.length, n = new Array(e), t = 0; t < e; t++)
                                                        n[t] = arguments[t];
                                                    return function(e) {
                                                        return n.reduce(function(e, n) {
                                                            return n(e);
                                                        }, e);
                                                    };
                                                })(M(O.a, { wrapper: _, events: h }), ci, W(si.init), W(f), W(y), ui)
                                            )
                                            .catch(function(e) {
                                                return oe.error({ error: '' + e });
                                            });
                                    oe.waitFor(t), a(n);
                                }
                                return (
                                    _ !== c && _.appendChild(c),
                                    n.appendChild(_),
                                    w(i),
                                    {
                                        wrapper: _,
                                        container: c,
                                        update: function(e) {
                                            var n = B(i, e),
                                                t = (function e(n, t) {
                                                    return u()(t).reduce(function(t, i) {
                                                        var a,
                                                            r,
                                                            s = i[0],
                                                            l = i[1];
                                                        if (!n[s]) return o({}, t, (((a = {})[s] = l), a));
                                                        if ('object' != typeof l || null === l)
                                                            return l !== n[s] ? o({}, t, (((r = {})[s] = l), r)) : t;
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
                                                })(i, n);
                                            Object.keys(t).length > 0 &&
                                                (x(),
                                                oe.info(X.MESSAGE_UPDATE_INITIATED, { id: n.id, options: e }),
                                                w(n));
                                        }
                                    }
                                );
                            })(n, e);
                            li.set(e, t), oe.info(X.IFRAME_CREATED, { id: n.id });
                        }
                        return li.get(e).update;
                    }
                };
            function mi(e, n) {
                var t, i;
                if ((void 0 === n && (n = '[data-pp-message]'), 'string' == typeof n))
                    (t = r()(document.querySelectorAll(n))), (i = n);
                else if (U(n)) (t = [n]), (i = 'HTMLElement');
                else {
                    if (!Array.isArray(n) || !n.every(U)) return oe.warn('Invalid selector', n);
                    (t = [].concat(n)), (i = 'Array<HTMLElement>');
                }
                (t = t.filter(function(n) {
                    return n.ownerDocument.body.contains(n)
                        ? !e._auto || !n.hasAttribute('data-pp-id')
                        : (oe.warn('Skipping container. Must be in the document:', n), !1);
                })),
                    oe.info(X.STARTING_MESSAGE_RENDER, { url: window.location.href, selector: i });
                var a = t.map(function(n) {
                    var t = B(e, G(n));
                    return (
                        n.hasAttribute('data-pp-id') ||
                            (n.setAttribute('data-pp-id', V.nextId), Z({ nextId: (V.nextId += 1) })),
                        (t.id = n.getAttribute('data-pp-id')),
                        new MutationObserver(function(e) {
                            var t = e.reduce(function(e, n) {
                                return l()(n.attributeName, 'data-pp-')
                                    ? o({}, e, {}, D(n.attributeName.slice(8), n.target.getAttribute(n.attributeName)))
                                    : e;
                            }, {});
                            di.init(n, t);
                        }).observe(n, { attributes: !0 }),
                        [di.init(n, t), n, t]
                    );
                });
                return function(e) {
                    return a.forEach(function(n) {
                        var t = n[0],
                            i = n[1],
                            o = B(n[2], B(e, G(i)));
                        (o.id = i.getAttribute('data-pp-id')), t(o);
                    });
                };
            }
            var fi = function(e) {
                return {
                    render: function(n) {
                        return mi(o({}, V.config, {}, e), n);
                    }
                };
            };
            O()(fi, {
                render: function(e, n) {
                    return void 0 === e && (e = {}), mi(o({}, V.config, {}, e), n);
                },
                setGlobalConfig: function(e) {
                    return void 0 === e && (e = {}), Z({ config: o({}, V.config, {}, e) });
                }
            });
            var pi = fi,
                gi = { BLU: 'blue', BLK: 'black', GRY: 'gray', WHT: 'white' },
                hi = { x180x150: '1x1', x160x600: '1x4', x728x90: '8x1', x1169x50: '20x1' },
                yi = {
                    x1169x50: ['BLKWHTYCSS', 'BLUWHTYCSS', 'WHTBLUNCSS', 'WHTBLUYCSS'],
                    x160x600: ['BLKWHTYCSS', 'BLUWHTYCSS', 'WHTBLUNCSS', 'WHTBLUYCSS'],
                    x180x150: ['BLKWHTYCSS', 'BLUWHTYCSS', 'WHTBLUNCSS', 'WHTBLUYCSS'],
                    x728x90: ['BLKWHTYCSS', 'BLUWHTYCSS', 'WHTBLUNCSS', 'WHTBLUYCSS']
                },
                xi = {
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
                _i = {
                    x160x600: ['BLKWHTYMED', 'BLUWHTYMED', 'WHTBLUNMED', 'WHTBLUYMED'],
                    x180x150: ['BLKWHTYSML', 'BLUWHTYSML', 'WHTBLUNSML', 'WHTBLUYSML'],
                    x300x250: ['BLKWHTYMED', 'BLUWHTYMED', 'WHTBLUNSML', 'WHTBLUYMED'],
                    x728x90: ['BLKWHTYLRG', 'BLUWHTYLRG', 'WHTBLUNLRG', 'WHTBLUYLRG'],
                    x1169x50: ['BLKWHTYLRG', 'BLUWHTYLRG', 'WHTBLUNLRG', 'WHTBLUYLRG']
                },
                wi = [
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
                vi = ['x168x374', 'x340x60', 'x765x60', 'x1000x50', 'x234x100', 'x1000x36', 'x310x100'],
                bi = [
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
                Ei = [
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
                Pi = {
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
            var Ti = 'c' + (new Date().getTime() + Math.floor(65536 * Math.random())),
                Ai = [650, 600],
                Ri = 0;
            function Li(e, n) {
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
            var zi = {
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
                        if (window.addEventListener) e.addEventListener(n, Li(e, t), !!i);
                        else if (window.attachEvent) e.attachEvent('on' + n, Li(e, t));
                        else {
                            var a = e['on' + n];
                            e['on' + n] = a
                                ? function() {
                                      Li(e, t).call(o), a.call(o);
                                  }
                                : t;
                        }
                    }
                },
                Ii = (function() {
                    function e(e) {
                        var n = zi.createElement('script');
                        (n.async = 'true'), (n.src = e), (this.el = n), this.attach();
                    }
                    var n = e.prototype;
                    return (
                        (n.attach = function() {
                            var e = zi.getElementsByTagName('script')[0];
                            e.parentNode.insertBefore(this.el, e), (this.attach = function() {});
                        }),
                        (n.destroy = function() {
                            this.el.parentNode.removeChild(this.el), delete this.el;
                        }),
                        e
                    );
                })(),
                Si = (function() {
                    function e(e) {
                        this.el = e;
                    }
                    var n = e.prototype;
                    return (
                        (n.getKVs = function() {
                            var e = this.el.attributes;
                            return r()(e).reduce(function(e, n) {
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
                            zi.registerEvent(this.ad.container, 'click', function() {
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
                Oi = (function() {
                    function e(e) {
                        (this.idx = Ri += 1),
                            (this.namespace = Ti + this.idx),
                            (this.kvs = e),
                            (this.variant = e && e.partner_version ? 'PARTNER' : 'MERCHANT'),
                            this.initContainer(),
                            this.initCallback(),
                            this.initQueryString();
                    }
                    var n = e.prototype;
                    return (
                        (n.initContainer = function() {
                            (this.container = zi.createElement('span')), (this.container.style.display = 'none');
                        }),
                        (n.injectScripts = function(e) {
                            var n = this,
                                t = document.createElement('div');
                            t.innerHTML = e;
                            var i = t.getElementsByTagName('script');
                            return (
                                r()(i).forEach(function(e) {
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
                                var t = zi.createElement('iframe');
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
                                    Ai[0] +
                                    ',height=' +
                                    Ai[1] +
                                    ',scrollbars=yes,resizable=no,location=no,toolbar=no,menubar=no,dependent=no,dialog=yes,minimizable=no';
                            'img' !== n.nodeName.toLowerCase() ||
                                (t && 'true' !== t) ||
                                (zi.popup(n.parentNode.href, this.namespace, i), e.preventDefault());
                        }),
                        (n.request = function() {
                            this.script = new Ii('https://www.paypal.com/imadserver/upstream' + this.queryString);
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
                                country_code: 'US'
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
                Ci = {
                    pubid: 'pub_id',
                    payerid: 'payer_id',
                    placementtype: 'dimensions',
                    cartamt: 'currency_value',
                    style: 'style',
                    boost: 'boost',
                    popup: 'popup'
                };
            r()(document.getElementsByTagName('script')).some(function(e) {
                var n;
                (n = e),
                    r()(n.attributes).forEach(function(e) {
                        if (e.name.search(/^data_pp[_-]/) >= 0) {
                            var t = e.name.replace(/^(data)_([a-z])/, '$1-$2');
                            n.setAttribute(t, e.value), n.removeAttribute(e.name);
                        }
                        var i = e.name.match(/^data-pp-([a-z]+)/);
                        i && Ci[i[1]] && (n.setAttribute('data-pp_' + Ci[i[1]], e.value), n.removeAttribute(e.name));
                    });
                var t = e.getAttribute('data-pp_pub_id'),
                    i = e.getAttribute('data-pp_payer_id'),
                    o = e.getAttribute('data-pp_dimensions');
                if ((i || t) && o) {
                    var a = new Si(e);
                    if (
                        !(function(e) {
                            var n = e.getKVs(),
                                t = n.payer_id || n.pub_id,
                                i = (function(e, n) {
                                    if (n)
                                        return _i[e] && p()(_i[e], n)
                                            ? ['image', '', e, n]
                                            : yi[e] && p()(yi[e], n)
                                            ? ['flex', 'flex', e, n]
                                            : [];
                                    if (xi[e]) return ['image', ''].concat(xi[e]);
                                    var t = p()(wi, e),
                                        i = p()(vi, e),
                                        o = p()(bi, e) ? 'html' : '';
                                    return t ? ['image', o, e, 'none'] : i ? ['html', o, e, 'none'] : [];
                                })(n.dimensions, n.style),
                                o = i[0],
                                a = i[1],
                                r = i[2],
                                s = i[3];
                            if (r) {
                                var l = m()(Ei, function(e) {
                                    return p()(e, t);
                                });
                                if (l) {
                                    var c = l[0];
                                    if (p()(Pi[c], r)) return !1;
                                }
                                var u = (function(e, n, t, i) {
                                        var o = t.slice(1),
                                            a = 'none',
                                            r = !1;
                                        return (
                                            10 === i.length && ((a = gi[i.slice(0, 3)]), (r = 'Y' === i.slice(6, 7))),
                                            'flex' === e && 'flex' === n
                                                ? {
                                                      layout: 'flex',
                                                      color: 'white' !== a || r ? a : 'white-no-border',
                                                      ratio: hi[t]
                                                  }
                                                : {
                                                      layout: 'legacy',
                                                      typeNI: e,
                                                      typeEZP: n,
                                                      size: o,
                                                      color: a,
                                                      border: r
                                                  }
                                        );
                                    })(o, a, r, s),
                                    d = document.createElement('span');
                                return (
                                    e.el.parentNode.insertBefore(d, e.el),
                                    setTimeout(function() {
                                        pi({
                                            _legacy: 'flex' !== o && 'flex' !== a,
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
                        })(a)
                    ) {
                        var s = new Oi(a.getKVs());
                        a.injectAd(s), a.registerListeners(), a.ad.request(), a.destroyDom();
                    }
                    return !0;
                }
                return !1;
            });
        }
    ]).Messages
);
//# sourceMappingURL=merchant@1.0.0.js.map
