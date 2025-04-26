(function () {
    'use strict';
    var k, aa = typeof Object.defineProperties == "function" ? Object.defineProperty : function (a, b, c) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = c.value;
        return a
    };

    function ba(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math) return c
        }
        throw Error("a");
    }
    var ca = ba(this);

    function da(a, b) {
        if (b) a: {
            var c = ca; a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
                var e = a[d];
                if (!(e in c)) break a;
                c = c[e]
            }
            a = a[a.length - 1]; d = c[a]; b = b(d); b != d && b != null && aa(c, a, {
                configurable: !0,
                writable: !0,
                value: b
            })
        }
    }
    var ea;
    if (typeof Object.setPrototypeOf == "function") ea = Object.setPrototypeOf;
    else {
        var fa;
        a: {
            var ha = {
                a: !0
            },
                ia = {};
            try {
                ia.__proto__ = ha;
                fa = ia.a;
                break a
            } catch (a) { }
            fa = !1
        }
        ea = fa ? function (a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b) throw new TypeError("b`" + a);
            return a
        } : null
    }
    var ja = ea;

    function ka(a) {
        function b(d) {
            return a.next(d)
        }

        function c(d) {
            return a.throw(d)
        }
        return new Promise(function (d, e) {
            function f(g) {
                g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e)
            }
            f(a.next())
        })
    }

    function m(a) {
        return ka(a())
    }
    var la = typeof Object.create == "function" ? Object.create : function (a) {
        function b() { }
        b.prototype = a;
        return new b
    };

    function ma(a, b) {
        a.prototype = la(b.prototype);
        a.prototype.constructor = a;
        if (ja) ja(a, b);
        else
            for (var c in b)
                if (c != "prototype")
                    if (Object.defineProperties) {
                        var d = Object.getOwnPropertyDescriptor(b, c);
                        d && Object.defineProperty(a, c, d)
                    } else a[c] = b[c];
        a.ub = b.prototype
    }
    da("Symbol.dispose", function (a) {
        return a ? a : Symbol("Symbol.dispose")
    });

    function na(a, b) {
        a instanceof String && (a += "");
        var c = 0,
            d = !1,
            e = {
                next: function () {
                    if (!d && c < a.length) {
                        var f = c++;
                        return {
                            value: b(f, a[f]),
                            done: !1
                        }
                    }
                    d = !0;
                    return {
                        done: !0,
                        value: void 0
                    }
                }
            };
        e[Symbol.iterator] = function () {
            return e
        };
        return e
    }
    da("Array.prototype.values", function (a) {
        return a ? a : function () {
            return na(this, function (b, c) {
                return c
            })
        }
    });
    da("globalThis", function (a) {
        return a || ca
    });
    da("Promise.prototype.finally", function (a) {
        return a ? a : function (b) {
            return this.then(function (c) {
                return Promise.resolve(b()).then(function () {
                    return c
                })
            }, function (c) {
                return Promise.resolve(b()).then(function () {
                    throw c;
                })
            })
        }
    });
    da("Array.prototype.includes", function (a) {
        return a ? a : function (b, c) {
            var d = this;
            d instanceof String && (d = String(d));
            var e = d.length;
            c = c || 0;
            for (c < 0 && (c = Math.max(c + e, 0)); c < e; c++) {
                var f = d[c];
                if (f === b || Object.is(f, b)) return !0
            }
            return !1
        }
    });
    da("Object.entries", function (a) {
        return a ? a : function (b) {
            var c = [],
                d;
            for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push([d, b[d]]);
            return c
        }
    });
    da("Object.values", function (a) {
        return a ? a : function (b) {
            var c = [],
                d;
            for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push(b[d]);
            return c
        }
    });
    da("String.prototype.matchAll", function (a) {
        return a ? a : function (b) {
            if (b instanceof RegExp && !b.global) throw new TypeError("c");
            var c = new RegExp(b, b instanceof RegExp ? void 0 : "g"),
                d = this,
                e = !1,
                f = {
                    next: function () {
                        if (e) return {
                            value: void 0,
                            done: !0
                        };
                        var g = c.exec(d);
                        if (!g) return e = !0, {
                            value: void 0,
                            done: !0
                        };
                        g[0] === "" && (c.lastIndex += 1);
                        return {
                            value: g,
                            done: !1
                        }
                    }
                };
            f[Symbol.iterator] = function () {
                return f
            };
            return f
        }
    });
    da("AggregateError", function (a) {
        function b(c, d) {
            d = Error(d);
            "stack" in d && (this.stack = d.stack);
            this.errors = c;
            this.message = d.message
        }
        if (a) return a;
        ma(b, Error);
        b.prototype.name = "AggregateError";
        return b
    });
    da("Promise.any", function (a) {
        return a ? a : function (b) {
            b = b instanceof Array ? b : Array.from(b);
            return Promise.all(b.map(function (c) {
                return Promise.resolve(c).then(function (d) {
                    throw d;
                }, function (d) {
                    return d
                })
            })).then(function (c) {
                throw new AggregateError(c, "All promises were rejected");
            }, function (c) {
                return c
            })
        }
    });
    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    var oa = oa || {},
        pa = this || self;

    function qa(a) {
        var b = typeof a;
        b = b != "object" ? b : a ? Array.isArray(a) ? "array" : b : "null";
        return b == "array" || b == "object" && typeof a.length == "number"
    }

    function ra(a) {
        var b = typeof a;
        return b == "object" && a != null || b == "function"
    }

    function sa(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }

    function ta(a, b, c) {
        if (!a) throw Error();
        if (arguments.length > 2) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var e = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e, d);
                return a.apply(b, e)
            }
        }
        return function () {
            return a.apply(b, arguments)
        }
    }

    function ua(a, b, c) {
        ua = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? sa : ta;
        return ua.apply(null, arguments)
    }

    function va(a, b) {
        a = a.split(".");
        var c = pa;
        a[0] in c || typeof c.execScript == "undefined" || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift());) a.length || b === void 0 ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b
    }

    function wa(a, b) {
        function c() { }
        c.prototype = b.prototype;
        a.ub = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.ff = function (d, e, f) {
            for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
            return b.prototype[e].apply(d, g)
        }
    };
    var xa = class {
        constructor() {
            this.state = 0;
            this.H = !1
        }
        update(a) {
            this.state === 0 && (this.j(), this.state = 1);
            this.state !== 1 || this.H || this.g() || this.Va(a);
            (this.H || this.g()) && this.state !== 2 && (this.state = 2)
        }
        g() {
            return !1
        }
        then(a) {
            return new n([this, a instanceof Function ? new q(a) : a])
        }
        j() { }
        Va() { }
    },
        ya = class extends xa {
            constructor(a) {
                super();
                this.u = a
            }
            j() {
                this.action = this.u()
            }
            Va(a) {
                let b;
                (b = this.action) == null || b.update(a)
            }
            g() {
                return this.action !== void 0 && this.action.state === 2
            }
        },
        q = class extends xa {
            constructor(a) {
                super();
                this.i = a
            }
            j() {
                this.i();
                this.H = !0
            }
        },
        r = class extends xa {
            constructor(a) {
                super();
                this.o = a;
                this.i = 0
            }
            Va(a) {
                this.i += a
            }
            g() {
                return this.i >= this.o
            }
        },
        n = class extends xa {
            constructor(a) {
                super();
                this.actions = a;
                this.i = 0
            }
            Va(a) {
                let b;
                (b = this.actions[this.i]) == null || b.update(a);
                let c;
                ((c = this.actions[this.i]) == null ? 0 : c.state === 2) && this.i++
            }
            g() {
                return this.i >= this.actions.length
            }
            then(a) {
                this.actions.push(a instanceof Function ? new q(a) : a);
                return this
            }
        },
        t = class extends xa {
            constructor(a) {
                super();
                this.actions = a
            }
            Va(a) {
                for (const b of this.actions) b.update(a)
            }
            g() {
                return this.actions.every(a =>
                    a.state === 2)
            }
        };
    var za;

    function Aa(a, b, c) {
        return a + c * (b - a)
    };

    function Ba(a, b, c, d) {
        this.x1 = a;
        this.y1 = b;
        this.x2 = c;
        this.y2 = d
    }
    Ba.prototype.equals = function (a) {
        return this.x1 == a.x1 && this.y1 == a.y1 && this.x2 == a.x2 && this.y2 == a.y2 && !0
    };

    function Ca(a, b) {
        if (b == 0) return 0;
        if (b == 1) return 1;
        var c = Aa(0, a.x1, b),
            d = Aa(a.x1, a.x2, b);
        a = Aa(a.x2, 1, b);
        c = Aa(c, d, b);
        d = Aa(d, a, b);
        return Aa(c, d, b)
    }

    function Da(a, b) {
        var c = b;
        if (c <= 0) return 0;
        if (c >= 1) return 1;
        for (var d = 0, e = 1, f = 0, g = 0; g < 8; g++) {
            f = Ca(a, c);
            var h = (Ca(a, c + 1E-6) - f) / 1E-6;
            if (Math.abs(f - b) < 1E-6) return c;
            if (Math.abs(h) < 1E-6) break;
            else f < b ? d = c : e = c, c -= (f - b) / h
        }
        for (g = 0; Math.abs(f - b) > 1E-6 && g < 8; g++) f < b ? (d = c, c = (c + e) / 2) : (e = c, c = (c + d) / 2), f = Ca(a, c);
        return c
    };
    const Ea = (a, b, c, d) => {
        const e = new Ba(a, b, c, d);
        return f => {
            f = Da(e, f);
            if (f == 0) f = 0;
            else if (f == 1) f = 1;
            else {
                var g = Aa(0, e.y1, f),
                    h = Aa(e.y1, e.y2, f),
                    l = Aa(e.y2, 1, f);
                g = Aa(g, h, f);
                h = Aa(h, l, f);
                f = Aa(g, h, f)
            }
            return f
        }
    };
    var Fa = Ea(.25, .1, .25, 1),
        Ga = a => a,
        Ha = Ea(.4, 0, 1, 1),
        Ia = Ea(.7, 0, .84, 0),
        Ja = Ea(0, 0, .6, 1),
        Ka = a => 1 - (1 - a) * (1 - a),
        La = Ea(.175, .885, .32, 1.275),
        Ma = Ea(.25, 1, .5, 1),
        Na = Ea(.16, 1, .3, 1);

    function u(a, b) {
        a.u = b;
        return a
    }
    var Oa = class extends xa {
        constructor(a, b, c) {
            super();
            this.o = a;
            this.from = b;
            this.N = c;
            this.i = 0;
            this.u = Ga
        }
        j() {
            this.o === 0 && this.v(this.from, this.N, this.u(1))
        }
        Va(a) {
            this.i += a;
            this.v(this.from, this.N, this.u(Math.min(1, this.i / this.o)))
        }
        g() {
            return this.i >= this.o
        }
    },
        v = class extends Oa {
            constructor(a, b, c, d) {
                super(a, b, c);
                this.O = d
            }
            v(a, b, c) {
                this.O(Aa(a, b, c))
            }
        };
    var Pa = class {
        g() {
            return !0
        }
    };
    var Qa = class extends Pa {
        contains() {
            return !1
        }
    };
    const Ra = Array.prototype.indexOf ? function (a, b) {
        return Array.prototype.indexOf.call(a, b, void 0)
    } : function (a, b) {
        if (typeof a === "string") return typeof b !== "string" || b.length != 1 ? -1 : a.indexOf(b, 0);
        for (let c = 0; c < a.length; c++)
            if (c in a && a[c] === b) return c;
        return -1
    };

    function Sa(a) {
        const b = Math.random;
        for (let c = a.length - 1; c > 0; c--) {
            const d = Math.floor(b() * (c + 1)),
                e = a[c];
            a[c] = a[d];
            a[d] = e
        }
    };
    /*

     Copyright Google LLC
     SPDX-License-Identifier: Apache-2.0
    */
    let Ta = globalThis.trustedTypes,
        Ua;

    function Va() {
        let a = null;
        if (!Ta) return a;
        try {
            const b = c => c;
            a = Ta.createPolicy("goog#html", {
                createHTML: b,
                createScript: b,
                createScriptURL: b
            })
        } catch (b) { }
        return a
    }

    function Wa() {
        Ua === void 0 && (Ua = Va());
        return Ua
    };
    var Xa = class {
        constructor(a) {
            this.g = a
        }
        toString() {
            return this.g + ""
        }
    };

    function Ya(a) {
        const b = Wa();
        return new Xa(b ? b.createScriptURL(a) : a)
    };
    var Za = class {
        constructor(a) {
            this.g = a
        }
        toString() {
            return this.g
        }
    },
        $a = new Za("about:invalid#zClosurez");
    class ab {
        constructor(a) {
            this.oe = a
        }
    }

    function bb(a) {
        return new ab(b => b.substr(0, a.length + 1).toLowerCase() === a + ":")
    }
    const cb = [bb("data"), bb("http"), bb("https"), bb("mailto"), bb("ftp"), new ab(a => /^[^:]*([/?#]|$)/.test(a))];

    function db(a, b = cb) {
        if (a instanceof Za) return a;
        for (let c = 0; c < b.length; ++c) {
            const d = b[c];
            if (d instanceof ab && d.oe(a)) return new Za(a)
        }
    }
    var eb = /^\s*(?!javascript:)(?:[\w+.-]+:|[^:/?#]*(?:[/?#]|$))/i;

    function fb(a) {
        if (a instanceof Za)
            if (a instanceof Za) a = a.g;
            else throw Error("d");
        else a = eb.test(a) ? a : void 0;
        return a
    };
    var gb = class {
        constructor(a) {
            this.g = a
        }
        toString() {
            return this.g + ""
        }
    };

    function hb(a) {
        const b = Wa();
        return new gb(b ? b.createHTML(a) : a)
    }

    function ib(a) {
        if (a instanceof gb) return a.g;
        throw Error("d");
    };

    function jb(a, b = `unexpected value ${a}!`) {
        throw Error(b);
    };

    function kb(a) {
        var b = window;
        a = fb(a);
        a !== void 0 && b.open(a, void 0, void 0)
    }

    function lb(a = document) {
        let b, c;
        a = (c = (b = "document" in a ? a.document : a).querySelector) == null ? void 0 : c.call(b, "script[nonce]");
        return a == null ? "" : a.nonce || a.getAttribute("nonce") || ""
    };

    function mb(a) {
        var b = nb`//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
        if (b instanceof Xa) b = b.g;
        else throw Error("d");
        a.src = b;
        (b = lb(a.ownerDocument && a.ownerDocument.defaultView || window)) && a.setAttribute("nonce", b)
    };

    function ob(a, b, c) {
        b = String(b);
        let d = c;
        b.toLowerCase() === "inserthtml" && (d = ib(c));
        return a.execCommand(b, !1, d)
    };

    function pb(a, b, c) {
        for (const d in a) b.call(c, a[d], d, a)
    }
    const qb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

    function rb(a, b) {
        let c, d;
        for (let e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) a[c] = d[c];
            for (let f = 0; f < qb.length; f++) c = qb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    };

    function tb(a) {
        if (a.mb && typeof a.mb == "function") return a.mb();
        if (typeof Map !== "undefined" && a instanceof Map || typeof Set !== "undefined" && a instanceof Set) return Array.from(a.values());
        if (typeof a === "string") return a.split("");
        if (qa(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
            return b
        }
        b = [];
        c = 0;
        for (d in a) b[c++] = a[d];
        return b
    }

    function ub(a) {
        if (a.Qb && typeof a.Qb == "function") return a.Qb();
        if (!a.mb || typeof a.mb != "function") {
            if (typeof Map !== "undefined" && a instanceof Map) return Array.from(a.keys());
            if (!(typeof Set !== "undefined" && a instanceof Set)) {
                if (qa(a) || typeof a === "string") {
                    var b = [];
                    a = a.length;
                    for (var c = 0; c < a; c++) b.push(c);
                    return b
                }
                b = [];
                c = 0;
                for (const d in a) b[c++] = d;
                return b
            }
        }
    }

    function vb(a, b, c) {
        if (a.forEach && typeof a.forEach == "function") a.forEach(b, c);
        else if (qa(a) || typeof a === "string") Array.prototype.forEach.call(a, b, c);
        else
            for (var d = ub(a), e = tb(a), f = e.length, g = 0; g < f; g++) b.call(c, e[g], d && d[g], a)
    };
    var wb = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");

    function xb(a, b) {
        if (a) {
            a = a.split("&");
            for (var c = 0; c < a.length; c++) {
                var d = a[c].indexOf("="),
                    e = null;
                if (d >= 0) {
                    var f = a[c].substring(0, d);
                    e = a[c].substring(d + 1)
                } else f = a[c];
                b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "")
            }
        }
    };

    function yb(a) {
        this.j = this.v = this.o = "";
        this.N = null;
        this.H = this.i = "";
        this.u = !1;
        var b;
        a instanceof yb ? (this.u = a.u, zb(this, a.o), this.v = a.v, this.j = a.j, Ab(this, a.N), this.i = a.i, Bb(this, Cb(a.g)), this.H = a.H) : a && (b = String(a).match(wb)) ? (this.u = !1, zb(this, b[1] || "", !0), this.v = Db(b[2] || ""), this.j = Db(b[3] || "", !0), Ab(this, b[4]), this.i = Db(b[5] || "", !0), Bb(this, b[6] || "", !0), this.H = Db(b[7] || "")) : (this.u = !1, this.g = new Eb(null, this.u))
    }
    yb.prototype.toString = function () {
        var a = [],
            b = this.o;
        b && a.push(Fb(b, Gb, !0), ":");
        var c = this.j;
        if (c || b == "file") a.push("//"), (b = this.v) && a.push(Fb(b, Gb, !0), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.N, c != null && a.push(":", String(c));
        if (c = this.i) this.j && c.charAt(0) != "/" && a.push("/"), a.push(Fb(c, c.charAt(0) == "/" ? Hb : Ib, !0));
        (c = this.g.toString()) && a.push("?", c);
        (c = this.H) && a.push("#", Fb(c, Jb));
        return a.join("")
    };
    yb.prototype.resolve = function (a) {
        var b = new yb(this),
            c = !!a.o;
        c ? zb(b, a.o) : c = !!a.v;
        c ? b.v = a.v : c = !!a.j;
        c ? b.j = a.j : c = a.N != null;
        var d = a.i;
        if (c) Ab(b, a.N);
        else if (c = !!a.i) {
            if (d.charAt(0) != "/")
                if (this.j && !this.i) d = "/" + d;
                else {
                    var e = b.i.lastIndexOf("/");
                    e != -1 && (d = b.i.slice(0, e + 1) + d)
                }
            e = d;
            if (e == ".." || e == ".") d = "";
            else if (e.indexOf("./") != -1 || e.indexOf("/.") != -1) {
                d = e.lastIndexOf("/", 0) == 0;
                e = e.split("/");
                for (var f = [], g = 0; g < e.length;) {
                    var h = e[g++];
                    h == "." ? d && g == e.length && f.push("") : h == ".." ? ((f.length > 1 || f.length == 1 &&
                        f[0] != "") && f.pop(), d && g == e.length && f.push("")) : (f.push(h), d = !0)
                }
                d = f.join("/")
            } else d = e
        }
        c ? b.i = d : c = a.g.toString() !== "";
        c ? Bb(b, Cb(a.g)) : c = !!a.H;
        c && (b.H = a.H);
        return b
    };

    function zb(a, b, c) {
        a.o = c ? Db(b, !0) : b;
        a.o && (a.o = a.o.replace(/:$/, ""))
    }

    function Ab(a, b) {
        if (b) {
            b = Number(b);
            if (isNaN(b) || b < 0) throw Error("e`" + b);
            a.N = b
        } else a.N = null
    }

    function Bb(a, b, c) {
        b instanceof Eb ? (a.g = b, Kb(a.g, a.u)) : (c || (b = Fb(b, Lb)), a.g = new Eb(b, a.u))
    }

    function Db(a, b) {
        return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
    }

    function Fb(a, b, c) {
        return typeof a === "string" ? (a = encodeURI(a).replace(b, Mb), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null
    }

    function Mb(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }
    var Gb = /[#\/\?@]/g,
        Ib = /[#\?:]/g,
        Hb = /[#\?]/g,
        Lb = /[#\?@]/g,
        Jb = /#/g;

    function Eb(a, b) {
        this.i = this.g = null;
        this.j = a || null;
        this.o = !!b
    }

    function Nb(a) {
        a.g || (a.g = new Map, a.i = 0, a.j && xb(a.j, function (b, c) {
            a.add(decodeURIComponent(b.replace(/\+/g, " ")), c)
        }))
    }
    k = Eb.prototype;
    k.add = function (a, b) {
        Nb(this);
        this.j = null;
        a = Ob(this, a);
        var c = this.g.get(a);
        c || this.g.set(a, c = []);
        c.push(b);
        this.i += 1;
        return this
    };
    k.remove = function (a) {
        Nb(this);
        a = Ob(this, a);
        return this.g.has(a) ? (this.j = null, this.i -= this.g.get(a).length, this.g.delete(a)) : !1
    };
    k.clear = function () {
        this.g = this.j = null;
        this.i = 0
    };
    k.Za = function () {
        Nb(this);
        return this.i == 0
    };

    function Pb(a, b) {
        Nb(a);
        b = Ob(a, b);
        return a.g.has(b)
    }
    k.forEach = function (a, b) {
        Nb(this);
        this.g.forEach(function (c, d) {
            c.forEach(function (e) {
                a.call(b, e, d, this)
            }, this)
        }, this)
    };
    k.Qb = function () {
        Nb(this);
        const a = Array.from(this.g.values()),
            b = Array.from(this.g.keys()),
            c = [];
        for (let d = 0; d < b.length; d++) {
            const e = a[d];
            for (let f = 0; f < e.length; f++) c.push(b[d])
        }
        return c
    };
    k.mb = function (a) {
        Nb(this);
        let b = [];
        if (typeof a === "string") Pb(this, a) && (b = b.concat(this.g.get(Ob(this, a))));
        else {
            a = Array.from(this.g.values());
            for (let c = 0; c < a.length; c++) b = b.concat(a[c])
        }
        return b
    };
    k.set = function (a, b) {
        Nb(this);
        this.j = null;
        a = Ob(this, a);
        Pb(this, a) && (this.i -= this.g.get(a).length);
        this.g.set(a, [b]);
        this.i += 1;
        return this
    };
    k.get = function (a, b) {
        if (!a) return b;
        a = this.mb(a);
        return a.length > 0 ? String(a[0]) : b
    };
    k.toString = function () {
        if (this.j) return this.j;
        if (!this.g) return "";
        const a = [],
            b = Array.from(this.g.keys());
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            const f = encodeURIComponent(String(d)),
                g = this.mb(d);
            for (d = 0; d < g.length; d++) {
                var e = f;
                g[d] !== "" && (e += "=" + encodeURIComponent(String(g[d])));
                a.push(e)
            }
        }
        return this.j = a.join("&")
    };

    function Cb(a) {
        var b = new Eb;
        b.j = a.j;
        a.g && (b.g = new Map(a.g), b.i = a.i);
        return b
    }

    function Ob(a, b) {
        b = String(b);
        a.o && (b = b.toLowerCase());
        return b
    }

    function Kb(a, b) {
        b && !a.o && (Nb(a), a.j = null, a.g.forEach(function (c, d) {
            var e = d.toLowerCase();
            if (d != e && (this.remove(d), this.remove(e), c.length > 0)) {
                this.j = null;
                d = this.g;
                var f = d.set;
                e = Ob(this, e);
                var g = c.length;
                if (g > 0) {
                    const h = Array(g);
                    for (let l = 0; l < g; l++) h[l] = c[l];
                    g = h
                } else g = [];
                f.call(d, e, g);
                this.i += c.length
            }
        }, a));
        a.o = b
    }
    k.extend = function (a) {
        for (var b = 0; b < arguments.length; b++) vb(arguments[b], function (c, d) {
            this.add(d, c)
        }, this)
    };

    function Qb(a) {
        const b = new XMLHttpRequest;
        b.open("GET", a);
        return new Promise((c, d) => {
            b.send();
            b.onreadystatechange = () => {
                if (b.readyState == 4)
                    if (b.status == 200 && b.responseText) a: {
                        var e = b.responseText; e.startsWith(")]}'\n") && (e = e.substring(5));
                        let f = {};
                        try {
                            f = JSON.parse(e)
                        } catch (g) {
                            d(e);
                            break a
                        }
                        f.hasOwnProperty("ddllog") && (f = f.ddllog); f.hasOwnProperty("__err__") ? d(f.__err__) : c(f)
                    }
                    else d(b)
            }
        })
    }

    function Rb(a, b, c = () => { }, d = !1) {
        d = d ? "//www.google.com" : "";
        d = new yb("ddllog".startsWith("/") ? `${d}${"ddllog"}` : `${d}/async/${"ddllog"}`);
        Bb(d, b);
        d = d.toString();
        a.g++;
        c(a.g);
        return Qb(d).catch(e => a.g < 1 ? a.i(2E3 * Math.pow(2, a.g - 1)).then(() => Rb(a, b, c)) : Promise.reject(e)).finally(() => a.g = 0)
    }
    class Sb {
        constructor(a) {
            this.g = 0;
            this.i = a
        }
    };
    class Tb extends Sb {
        constructor() {
            super(a => new Promise(b => setTimeout(b, a)))
        }
    };

    function Ub(a) {
        if (!a.o) {
            a.o = !0;
            for (const b of a.u) b()
        }
    }
    class Vb {
        constructor(a) {
            this.j = a;
            this.o = !1;
            this.u = []
        }
        i() { }
        H() {
            this.o = !1;
            this.u = []
        }
    };

    function Wb() {
        this.o = this.o;
        this.H = this.H
    }
    Wb.prototype.o = !1;
    Wb.prototype.dispose = function () {
        this.o || (this.o = !0, this.hb())
    };
    Wb.prototype[Symbol.dispose] = function () {
        this.dispose()
    };
    Wb.prototype.hb = function () {
        if (this.H)
            for (; this.H.length;) this.H.shift()()
    };

    function Xb(a, b) {
        this.type = a;
        this.currentTarget = this.target = b;
        this.defaultPrevented = !1
    }
    Xb.prototype.preventDefault = function () {
        this.defaultPrevented = !0
    };
    var Yb = function () {
        if (!pa.addEventListener || !Object.defineProperty) return !1;
        var a = !1,
            b = Object.defineProperty({}, "passive", {
                get: function () {
                    a = !0
                }
            });
        try {
            const c = () => { };
            pa.addEventListener("test", c, b);
            pa.removeEventListener("test", c, b)
        } catch (c) { }
        return a
    }();
    var Zb, $b;
    a: {
        for (var ac = ["CLOSURE_FLAGS"], bc = pa, cc = 0; cc < ac.length; cc++)
            if (bc = bc[ac[cc]], bc == null) {
                $b = null;
                break a
            }
        $b = bc
    }
    var dc = $b && $b[610401301];
    Zb = dc != null ? dc : !1;
    var ec;
    const fc = pa.navigator;
    ec = fc ? fc.userAgentData || null : null;

    function gc(a) {
        return Zb ? ec ? ec.brands.some(({
            brand: b
        }) => b && b.indexOf(a) != -1) : !1 : !1
    }

    function hc(a) {
        var b;
        a: {
            if (b = pa.navigator)
                if (b = b.userAgent) break a; b = ""
        }
        return b.indexOf(a) != -1
    };

    function ic() {
        return Zb ? !!ec && ec.brands.length > 0 : !1
    }

    function jc() {
        return ic() ? gc("Chromium") : (hc("Chrome") || hc("CriOS")) && !(ic() ? 0 : hc("Edge")) || hc("Silk")
    };
    var kc = ic() ? !1 : hc("Trident") || hc("MSIE");

    function lc(a, b) {
        Xb.call(this, a ? a.type : "");
        this.relatedTarget = this.currentTarget = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.key = "";
        this.keyCode = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.state = null;
        this.pointerId = 0;
        this.pointerType = "";
        this.rb = null;
        if (a) {
            var c = this.type = a.type,
                d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
            this.target = a.target || a.srcElement;
            this.currentTarget = b;
            b = a.relatedTarget;
            b || (c == "mouseover" ?
                b = a.fromElement : c == "mouseout" && (b = a.toElement));
            this.relatedTarget = b;
            d ? (this.clientX = d.clientX !== void 0 ? d.clientX : d.pageX, this.clientY = d.clientY !== void 0 ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.clientX = a.clientX !== void 0 ? a.clientX : a.pageX, this.clientY = a.clientY !== void 0 ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
            this.button = a.button;
            this.keyCode = a.keyCode || 0;
            this.key = a.key || "";
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey =
                a.shiftKey;
            this.metaKey = a.metaKey;
            this.pointerId = a.pointerId || 0;
            this.pointerType = a.pointerType;
            this.state = a.state;
            this.rb = a;
            a.defaultPrevented && lc.ub.preventDefault.call(this)
        }
    }
    wa(lc, Xb);
    lc.prototype.preventDefault = function () {
        lc.ub.preventDefault.call(this);
        var a = this.rb;
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    };
    var mc = "closure_listenable_" + (Math.random() * 1E6 | 0);

    function nc(a) {
        return !(!a || !a[mc])
    };
    var oc = 0;

    function pc(a, b, c, d, e) {
        this.listener = a;
        this.proxy = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.Jb = e;
        this.key = ++oc;
        this.Bb = this.Gb = !1
    }

    function qc(a) {
        a.Bb = !0;
        a.listener = null;
        a.proxy = null;
        a.src = null;
        a.Jb = null
    };

    function rc(a) {
        this.src = a;
        this.g = {};
        this.i = 0
    }
    rc.prototype.add = function (a, b, c, d, e) {
        var f = a.toString();
        a = this.g[f];
        a || (a = this.g[f] = [], this.i++);
        var g = sc(a, b, d, e);
        g > -1 ? (b = a[g], c || (b.Gb = !1)) : (b = new pc(b, this.src, f, !!d, e), b.Gb = c, a.push(b));
        return b
    };
    rc.prototype.remove = function (a, b, c, d) {
        a = a.toString();
        if (!(a in this.g)) return !1;
        var e = this.g[a];
        b = sc(e, b, c, d);
        return b > -1 ? (qc(e[b]), Array.prototype.splice.call(e, b, 1), e.length == 0 && (delete this.g[a], this.i--), !0) : !1
    };

    function tc(a, b) {
        var c = b.type;
        if (!(c in a.g)) return !1;
        var d = a.g[c];
        const e = Ra(d, b);
        let f;
        (f = e >= 0) && Array.prototype.splice.call(d, e, 1);
        f && (qc(b), a.g[c].length == 0 && (delete a.g[c], a.i--));
        return f
    }

    function uc(a) {
        var b = 0,
            c;
        for (c in a.g) {
            for (var d = a.g[c], e = 0; e < d.length; e++) ++b, qc(d[e]);
            delete a.g[c];
            a.i--
        }
    }

    function sc(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.Bb && f.listener == b && f.capture == !!c && f.Jb == d) return e
        }
        return -1
    };
    var vc = "closure_lm_" + (Math.random() * 1E6 | 0),
        wc = {},
        xc = 0;

    function yc(a, b, c, d, e) {
        if (d && d.once) return zc(a, b, c, d, e);
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++) yc(a, b[f], c, d, e);
            return null
        }
        c = Ac(c);
        return nc(a) ? Bc(a, b, c, ra(d) ? !!d.capture : !!d, e) : Cc(a, b, c, !1, d, e)
    }

    function Cc(a, b, c, d, e, f) {
        if (!b) throw Error("g");
        var g = ra(e) ? !!e.capture : !!e,
            h = Dc(a);
        h || (a[vc] = h = new rc(a));
        c = h.add(b, c, d, g, f);
        if (c.proxy) return c;
        d = Ec();
        c.proxy = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener) Yb || (e = g), e === void 0 && (e = !1), a.addEventListener(b.toString(), d, e);
        else if (a.attachEvent) a.attachEvent(Fc(b.toString()), d);
        else if (a.addListener && a.removeListener) a.addListener(d);
        else throw Error("h");
        xc++;
        return c
    }

    function Ec() {
        function a(c) {
            return b.call(a.src, a.listener, c)
        }
        const b = Gc;
        return a
    }

    function zc(a, b, c, d, e) {
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++) zc(a, b[f], c, d, e);
            return null
        }
        c = Ac(c);
        return nc(a) ? a.Sa.add(String(b), c, !0, ra(d) ? !!d.capture : !!d, e) : Cc(a, b, c, !0, d, e)
    }

    function Hc(a, b, c, d, e) {
        if (Array.isArray(b))
            for (var f = 0; f < b.length; f++) Hc(a, b[f], c, d, e);
        else (d = ra(d) ? !!d.capture : !!d, c = Ac(c), nc(a)) ? a.Sa.remove(String(b), c, d, e) : a && (a = Dc(a)) && (b = a.g[b.toString()], a = -1, b && (a = sc(b, c, d, e)), (c = a > -1 ? b[a] : null) && Ic(c))
    }

    function Ic(a) {
        if (typeof a === "number" || !a || a.Bb) return !1;
        var b = a.src;
        if (nc(b)) return tc(b.Sa, a);
        var c = a.type,
            d = a.proxy;
        b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(Fc(c), d) : b.addListener && b.removeListener && b.removeListener(d);
        xc--;
        (c = Dc(b)) ? (tc(c, a), c.i == 0 && (c.src = null, b[vc] = null)) : qc(a);
        return !0
    }

    function Fc(a) {
        return a in wc ? wc[a] : wc[a] = "on" + a
    }

    function Gc(a, b) {
        if (a.Bb) a = !0;
        else {
            b = new lc(b, this);
            var c = a.listener,
                d = a.Jb || a.src;
            a.Gb && Ic(a);
            a = c.call(d, b)
        }
        return a
    }

    function Dc(a) {
        a = a[vc];
        return a instanceof rc ? a : null
    }
    var Jc = "__closure_events_fn_" + (Math.random() * 1E9 >>> 0);

    function Ac(a) {
        if (typeof a === "function") return a;
        a[Jc] || (a[Jc] = function (b) {
            return a.handleEvent(b)
        });
        return a[Jc]
    };

    function Kc() {
        Wb.call(this);
        this.Sa = new rc(this);
        this.Ab = this;
        this.ta = null
    }
    wa(Kc, Wb);
    Kc.prototype[mc] = !0;
    Kc.prototype.addEventListener = function (a, b, c, d) {
        yc(this, a, b, c, d)
    };
    Kc.prototype.removeEventListener = function (a, b, c, d) {
        Hc(this, a, b, c, d)
    };
    Kc.prototype.dispatchEvent = function (a) {
        var b, c = this.ta;
        if (c)
            for (b = []; c; c = c.ta) b.push(c);
        c = this.Ab;
        var d = a.type || a;
        if (typeof a === "string") a = new Xb(a, c);
        else if (a instanceof Xb) a.target = a.target || c;
        else {
            var e = a;
            a = new Xb(d, c);
            rb(a, e)
        }
        e = !0;
        if (b)
            for (var f = b.length - 1; f >= 0; f--) {
                var g = a.currentTarget = b[f];
                e = Lc(g, d, !0, a) && e
            }
        g = a.currentTarget = c;
        e = Lc(g, d, !0, a) && e;
        e = Lc(g, d, !1, a) && e;
        if (b)
            for (f = 0; f < b.length; f++) g = a.currentTarget = b[f], e = Lc(g, d, !1, a) && e;
        return e
    };
    Kc.prototype.hb = function () {
        Kc.ub.hb.call(this);
        this.Sa && uc(this.Sa);
        this.ta = null
    };

    function Bc(a, b, c, d, e) {
        return a.Sa.add(String(b), c, !1, d, e)
    }

    function Lc(a, b, c, d) {
        b = a.Sa.g[String(b)];
        if (!b) return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var g = b[f];
            if (g && !g.Bb && g.capture == c) {
                var h = g.listener,
                    l = g.Jb || g.src;
                g.Gb && tc(a.Sa, g);
                e = h.call(l, d) !== !1 && e
            }
        }
        return e && !d.defaultPrevented
    };

    function Mc() { }
    Mc.prototype.g = null;
    Mc.prototype.getOptions = function () {
        var a;
        (a = this.g) || (a = this.g = {});
        return a
    };
    var Nc;

    function Oc() { }
    wa(Oc, Mc);
    Nc = new Oc;

    function Pc(a) {
        Kc.call(this);
        this.headers = new Map;
        this.Ta = a || null;
        this.i = !1;
        this.v = this.g = null;
        this.ka = "";
        this.j = this.O = this.u = this.N = !1;
        this.Ca = null;
        this.Da = "";
        this.Oa = !1
    }
    wa(Pc, Kc);
    var Qc = /^https?$/i,
        Rc = ["POST", "PUT"];

    function Sc(a, b) {
        if (a.g) throw Error("i`" + a.ka + "`" + b);
        a.ka = b;
        a.N = !1;
        a.i = !0;
        a.g = new XMLHttpRequest;
        a.v = a.Ta ? a.Ta.getOptions() : Nc.getOptions();
        a.g.onreadystatechange = ua(a.Jc, a);
        try {
            a.O = !0, a.g.open("GET", String(b), !0), a.O = !1
        } catch (e) {
            Tc(a);
            return
        }
        b = new Map(a.headers);
        const c = Array.from(b.keys()).find(e => "content-type" == e.toLowerCase()),
            d = pa.FormData && !1;
        !(Ra(Rc, "GET") >= 0) || c || d || b.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        for (const [e, f] of b) a.g.setRequestHeader(e, f);
        a.Da &&
            (a.g.responseType = a.Da);
        "withCredentials" in a.g && a.g.withCredentials !== a.Oa && (a.g.withCredentials = a.Oa);
        try {
            Uc(a), a.u = !0, a.g.send(""), a.u = !1
        } catch (e) {
            Tc(a)
        }
    }

    function Tc(a) {
        a.i = !1;
        a.g && (a.j = !0, a.g.abort(), a.j = !1);
        Vc(a);
        Wc(a)
    }

    function Vc(a) {
        a.N || (a.N = !0, a.dispatchEvent("complete"), a.dispatchEvent("error"))
    }
    k = Pc.prototype;
    k.abort = function () {
        this.g && this.i && (this.i = !1, this.j = !0, this.g.abort(), this.j = !1, this.dispatchEvent("complete"), this.dispatchEvent("abort"), Wc(this))
    };
    k.hb = function () {
        this.g && (this.i && (this.i = !1, this.j = !0, this.g.abort(), this.j = !1), Wc(this, !0));
        Pc.ub.hb.call(this)
    };
    k.Jc = function () {
        this.o || (this.O || this.u || this.j ? Xc(this) : this.Fe())
    };
    k.Fe = function () {
        Xc(this)
    };

    function Xc(a) {
        if (a.i && typeof oa != "undefined" && (!a.v[1] || (a.g ? a.g.readyState : 0) != 4 || Yc(a) != 2))
            if (a.u && (a.g ? a.g.readyState : 0) == 4) setTimeout(a.Jc.bind(a), 0);
            else if (a.dispatchEvent("readystatechange"), (a.g ? a.g.readyState : 0) == 4) {
                a.i = !1;
                try {
                    const f = Yc(a);
                    a: switch (f) {
                        case 200:
                        case 201:
                        case 202:
                        case 204:
                        case 206:
                        case 304:
                        case 1223:
                            var b = !0;
                            break a;
                        default:
                            b = !1
                    }
                    var c;
                    if (!(c = b)) {
                        var d;
                        if (d = f === 0) {
                            var e = String(a.ka).match(wb)[1] || null;
                            !e && pa.self && pa.self.location && (e = pa.self.location.protocol.slice(0, -1));
                            d = !Qc.test(e ? e.toLowerCase() : "")
                        }
                        c = d
                    }
                    c ? (a.dispatchEvent("complete"), a.dispatchEvent("success")) : Vc(a)
                } finally {
                    Wc(a)
                }
            }
    }

    function Wc(a, b) {
        if (a.g) {
            Uc(a);
            const c = a.g,
                d = a.v[0] ? () => { } : null;
            a.g = null;
            a.v = null;
            b || a.dispatchEvent("ready");
            try {
                c.onreadystatechange = d
            } catch (e) { }
        }
    }

    function Uc(a) {
        a.Ca && (clearTimeout(a.Ca), a.Ca = null)
    }
    k.isActive = function () {
        return !!this.g
    };

    function Yc(a) {
        try {
            return (a.g ? a.g.readyState : 0) > 2 ? a.g.status : -1
        } catch (b) {
            return -1
        }
    };

    function Zc(a) {
        if (a.g && a.g.state == "running" && !a.H) {
            a.H = !0;
            for (let b = 0; b < a.O.length; b++) a.O[b]()
        }
    }

    function $c(a) {
        a.g && (a.i == null ? ad(a) : a.i.playbackState === void 0 ? ad(a) : a.i.playbackState !== a.i.PLAYING_STATE && a.i.playbackState !== a.i.FINISHED_STATE && ad(a))
    }

    function bd(a) {
        var b = cd;
        if (dd && !b.g) {
            b.g = new (window.AudioContext || window.webkitAudioContext);
            b.j = b.g.createGain();
            b.j.connect(b.g.destination);
            for (let c in b.u) b.u[c].g = b.g;
            for (let c in b.o) ed(b.o[c], b.g, b.j);
            b.g.onstatechange = () => {
                Zc(b)
            };
            Zc(b);
            $c(b);
            zc(a, "click pointerup mousedown mouseup touchstart touchend".split(" "), () => {
                b.g && (b.g.resume(), $c(b))
            }, !0)
        }
    }

    function fd(a, b) {
        a.O.push(b);
        a.H && b()
    }

    function ad(a) {
        if (a.g) {
            a.i = a.g.createBufferSource();
            var b = a.g.createBuffer(1, 1, 22050);
            a.i.buffer = b;
            a.i.connect(a.g.destination);
            a.i.start(0);
            for (const c of a.ka) c()
        }
    }

    function gd() {
        var a = cd;
        let b = Promise.resolve();
        a.v && a.g && (b = a.g.resume());
        a.v = !1;
        return b
    }
    class hd {
        constructor() {
            var a = w;
            this.u = id;
            this.o = a;
            this.g = null;
            this.ka = [];
            this.j = null;
            this.H = this.v = this.N = !1;
            this.O = [];
            this.i = null
        }
        destroy() {
            this.g && (this.g.close(), this.g = null)
        }
        reset() {
            for (let a in this.u) this.u[a].u = [];
            for (let a in this.o) jd(this.o[a])
        }
        isMuted() {
            return this.N && !!this.j && this.j.gain.value == 0
        }
    }
    var dd = !(!window.AudioContext && !window.webkitAudioContext) && !!window.GainNode;

    function ed(a, b, c) {
        a.g = b;
        a.H = c
    }

    function jd(a, b) {
        kd(a);
        if (b !== void 0 && a.g) {
            if (a.j[b]) {
                try {
                    a.j[b].node.stop(0)
                } catch (d) { }
                var c = (a.g.currentTime * 1E3 - a.j[b].Kc) % a.u;
                delete a.j[b];
                return [c]
            }
            return []
        }
        b = [];
        for (c in a.j) b = b.concat(jd(a, c));
        return b
    }

    function kd(a) {
        if (a.g)
            for (const d in a.j) {
                var b = a,
                    c = a.j[d];
                !c.Ce && b.g !== null && b.g.currentTime * 1E3 > c.Kc + b.u && delete a.j[d]
            }
    }

    function ld(a) {
        !a.i && a.g && a.g.createGain && (a.i = a.g.createGain())
    }

    function md(a, b) {
        if (!b) {
            ld(a);
            if (!a.i) return;
            b = a.i
        }
        a = [b].concat(a.O, a.H);
        for (b = 0; b < a.length - 1; b++) a[b].connect(a[b + 1])
    }

    function nd(a) {
        ld(a);
        a.i && a.g && a.i.gain.setValueAtTime(.01, a.g.currentTime)
    }

    function od(a, b, c) {
        ld(a);
        a.i && a.g && (a.i.gain.setValueAtTime(a.i.gain.value, a.g.currentTime), a.i.gain.exponentialRampToValueAtTime(b, a.g.currentTime + c))
    }
    var y = class {
        constructor(a, b) {
            this.ka = id.Xb;
            this.v = a;
            this.u = b;
            this.j = {};
            this.o = this.H = this.g = this.i = null;
            this.O = [];
            this.N = 0
        }
        play(a = 0, b = !1, c = 0, d, e = 0, f) {
            if (!this.g || !this.H) return -1;
            kd(this);
            f = f === void 0 ? this.g.currentTime + a / 1E3 : f;
            d || (d = this.g.createBufferSource(), d.playbackRate.setValueAtTime(1, this.g.currentTime));
            ld(this);
            this.o && d.connect(this.o);
            this.i ? (this.o ? this.o.connect(this.i) : d.connect(this.i), md(this)) : this.o ? md(this, this.o) : md(this, d);
            this.o = null;
            d.loop = b;
            try {
                d.buffer = this.ka.N
            } catch (h) {
                return -1
            }
            a =
                this.v / 1E3;
            const g = this.u / 1E3 / d.playbackRate.value;
            b ? (d.loopStart = a + (e ? e / 1E3 : c / 1E3), d.loopEnd = a + g, d.start(f, a + c / 1E3)) : d.start(f, a + c / 1E3, g);
            e = this.N++;
            this.j[e] = {
                node: d,
                Kc: f * 1E3 - c,
                Ce: b
            };
            return e
        }
        setPlaybackRate(a, b) {
            kd(this);
            if (b !== void 0) {
                if (this.j[b]) try {
                    this.j[b].node.playbackRate.value = a
                } catch (c) { }
            } else
                for (let c in this.j) this.setPlaybackRate(a, c)
        }
    };
    const pd = document.createElement("audio");
    var qd = typeof pd.canPlayType === "function" && pd.canPlayType("audio/ogg") != "" ? ".ogg" : ".mp3",
        rd = class extends Vb {
            constructor() {
                super("/audio" + qd);
                this.g = this.N = null;
                this.v = 0
            }
            i() {
                const a = new Promise(c => {
                    this.o ? c() : this.u.push(c)
                });
                if (this.v != 0) return Promise.resolve();
                if (!this.g) return Promise.reject(Error("k"));
                const b = new XMLHttpRequest;
                b.open("GET", this.j, !0);
                b.responseType = "arraybuffer";
                b.onload = () => {
                    const c = d => {
                        d && (this.N = d, this.v = 3, Ub(this))
                    };
                    this.g && this.g.decodeAudioData(b.response,
                        c);
                    this.v = 2
                };
                b.send();
                this.v = 1;
                return a
            }
        };

    function sd(a, ...b) {
        for (const [c, d] of b) {
            b = c;
            const e = d,
                f = a.style;
            f && b in f && f.setProperty(b, String(e))
        }
    };
    var wd = a => m(function* () {
        const b = typeof a === "string" ? a : a.value;
        var c;
        if (!(c = yield td(b)))
            if (ob) {
                typeof a === "string" ? (ud || (ud = document.createElement("input"), ud.readOnly = !0, sd(ud, ["position", "absolute"], ["opacity", 0], ["left", 0], ["top", 0], ["pointerEvents", "none"]), document.body.appendChild(ud)), ud.value = a, c = ud) : c = a;
                c !== document.activeElement && c.focus();
                const e = c.contentEditable,
                    f = c.readOnly;
                c.contentEditable = "true";
                c.readOnly = !1;
                const g = document.createRange();
                g.selectNodeContents(c);
                const h = window.getSelection();
                h.removeAllRanges();
                h.addRange(g);
                try {
                    c.select(), c.setSelectionRange(0, c.value.length)
                } catch (l) { }
                c.contentEditable = e;
                c.readOnly = f;
                try {
                    var d = ob(document, "copy")
                } catch (l) {
                    d = !1
                }
                window.getSelection().removeAllRanges();
                c.blur();
                ud && (ud.remove(), ud = null);
                c = d
            } else c = !1;
        return c || (yield vd()) && (yield td(b)) ? Promise.resolve() : Promise.reject()
    });
    const td = a => m(function* () {
        return navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(a).then(() => !0, () => !1) : !1
    }),
        xd = a => m(function* () {
            switch (a.state) {
                case "granted":
                    return !0;
                case "denied":
                    return !1
            }
            return new Promise(b => {
                a.onchange = () => b(xd(a))
            })
        }),
        vd = () => m(function* () {
            return navigator.permissions && navigator.permissions.query ? xd(yield navigator.permissions.query({
                name: "clipboard-write"
            })) : !1
        });
    let ud = null;

    function yd(a, b) {
        a.wa.style.display = b ? "block" : "none"
    }
    var Ad = class {
        constructor(a, b) {
            this.wa = zd();
            this.wa.style.top = "10px";
            this.wa.style.right = "10px";
            this.wa.style.width = "52px";
            this.wa.style.height = "52px";
            this.wa.style.cursor = "pointer";
            this.wa.style.position = "absolute";
            this.wa.style.pointerEvents = "all";
            this.wa.style.background = "transparent";
            this.wa.style.display = "none";
            this.wa.setAttribute("role", "button");
            this.wa.setAttribute("aria-label", "Close");
            this.wa.tabIndex = 0;
            yc(this.wa, "click", b);
            yc(this.wa, "keydown", c => {
                c.keyCode !== 32 && c.keyCode !== 13 || b()
            });
            a.appendChild(this.wa)
        }
    };
    const zd = () => {
        var a = 52 * (window.devicePixelRatio || 1);
        const b = document.createElement("canvas");
        b.width = a;
        b.height = a;
        const c = b.getContext("2d");
        c.fillStyle = "rgba(0,0,0,.3)";
        c.arc(a / 2, a / 2, a / 2, 0, 2 * Math.PI);
        c.fill();
        c.strokeStyle = "#fff";
        c.lineWidth = a / 52 * 3.5;
        const d = a / 52 * 2;
        c.beginPath();
        c.moveTo(a / 4 + d, a / 4 + d);
        c.lineTo(3 * a / 4 - d, 3 * a / 4 - d);
        c.stroke();
        c.beginPath();
        c.moveTo(3 * a / 4 - d, a / 4 + d);
        c.lineTo(a / 4 + d, 3 * a / 4 - d);
        c.stroke();
        return b
    };
    var Dd = a => {
        return;
    };
    let Bd = [],
        Cd = 0;

    function Ed() {
        const a = document.getElementById("hplogo"),
            b = document.getElementById("ddlDomRoot"),
            c = document.getElementById("ctaRoot"),
            d = document.getElementById("ddlContentRoot");
        if (a === null || b === null || c === null || d === null) throw Error("l");
        return {
            scale: 1,
            orientation: "landscape-primary",
            isFullscreen: !1,
            Lb: !1,
            width: 960,
            height: 540,
            oa: a,
            W: b,
            Ia: c,
            Ha: d
        }
    };
    class Fd {
        constructor() {
            this.g = navigator.userAgent;
            this.url = new yb(location.href)
        }
    }
    var z = new Fd;

    function Gd() {
        var a;
        if (a = navigator.platform === "MacIntel") a = navigator.maxTouchPoints > 1;
        return a
    }

    function Hd() {
        return z.g.includes("iPad") || z.g.includes("iPhone") || z.g.includes("iPod") || Gd()
    }

    function Id() {
        return z.g.toLowerCase().includes("gsa") || z.g.includes("GoogleApp")
    }

    function Jd() {
        return Id() && Hd()
    }

    function Kd() {
        return Hd() || z.g.includes("Android") || z.g.includes("Mobile") || z.g.includes("Silk") || z.g.includes("UCBrowser") || z.g.includes("UCWEB")
    }

    function Ld() {
        return document.documentElement.id === "sdoodles"
    }

    function Md() {
        return false;
    }

    function Nd() {
        return !!document.getElementById("fkbx") || Od()
    }

    function Od() {
        const a = z.url.g.get("ntp");
        return a === "1" || a === "2"
    }

    function Pd() {
        return z.url.g.get("fpdoodle") === "1" && !!document.getElementById("fpdoodle")
    }

    function Qd() {
        return !!document.querySelector("body#iframedoodle")
    }

    function Rd() {
        return Gd() && !(Ld() && !Kd()) && !Nd() && !Pd() && !Md()
    };
    let Sd;

    function Td() {
        Sd || (Sd = new Ud);
        return Sd.g
    }
    var Ud = class {
        constructor() {
            var a = new URLSearchParams(location.search),
                b, c;
            const d = (c = (b = a.get("hl")) == null ? void 0 : b.toLowerCase()) != null ? c : "en";
            var e, f;
            b = (f = (e = a.get("gl")) == null ? void 0 : e.toLowerCase()) != null ? f : "us";
            a: {
                switch (a.get("cta")) {
                    case "a":
                        e = 2;
                        break a;
                    case "s":
                        e = 1;
                        break a;
                    case "n":
                        e = 3;
                        break a
                }
                e = void 0
            }
            f = a.get("se") === "1";
            var g;
            c = (g = a.get("ved")) != null ? g : void 0;
            let h;
            g = (h = a.get("sved")) != null ? h : void 0;
            let l;
            a = (l = a.get("ei")) != null ? l : void 0;
            this.g = {
                hl: d,
                gl: b,
                kf: f,
                Fc: e,
                mf: c,
                lf: g,
                hf: a
            }
        }
    };

    function Vd() {
        const a = Td().Fc;
        return a ? a === 2 : !Nd()
    }
    var Wd = () => {
        if (Qd()) throw Error("d");
        return Pd() || Md() || Kd() && !Gd()
    };

    function Xd() {
        const a = Td().Fc;
        if (a !== void 0) switch (a) {
            case 2:
            case 1:
                return !1;
            case 3:
                return !0;
            default:
                jb(a, void 0)
        }
        return Pd() && !Nd() && !(Hd() && !Jd())
    }

    function Yd() {
        return false;
    }

    function Zd(a) {
        a.g ? a.g = !1 : (a.u.requestAnimationFrame(() => {
            Zd(a)
        }), a.loop(Date.now()))
    }
    var $d = class {
        constructor(a) {
            var b = window;
            this.H = a;
            this.u = b;
            this.o = 0;
            this.j = this.started = this.g = this.i = !1
        }
        start() {
            this.o = Date.now();
            const a = !this.g && !this.i;
            this.g = !1;
            this.started = this.i = !0;
            this.j = !1;
            a && Zd(this)
        }
        pause() {
            this.i && (this.j = !0, this.i = !1, this.g = !0)
        }
        resume() {
            this.j && this.start()
        }
        loop(a) {
            var b = a - this.o;
            b < 0 || (b = Math.min(b, 50), this.o = a, this.H(b))
        }
    };

    function ae(a) {
        pa.setTimeout(() => {
            throw a;
        }, 0)
    };

    function be(a) {
        return m(function* () {
            return new Promise(b => {
                setTimeout(() => {
                    b(void 0)
                }, a)
            })
        })
    };

    function ce(a) {
        Xd() ? setTimeout(() => {
            de(a)
        }, 300) : (ee(a), Rd() && z.g.includes("Safari") ? a.j = yc(a.Ia, "click", () => {
            de(a)
        }, !0) : a.j = zc(a.Ia, "click", () => {
            de(a)
        }, !0))
    }

    function de(a) {
        return m(function* () {
            a.N && (yield fe(a));
            return a.v()
        })
    }

    function ee(a) {
        Vd() && (a.H.start(), a.i && a.o && a.i.classList.add(a.o))
    }

    function fe(a) {
        return m(function* () {
            if (a.u) return a.u;
            a.Ia.classList.remove(a.g.zc);
            a.u = be(500);
            yield a.u;
            a.i && a.i.remove();
            a.Ia.remove()
        })
    }
    var ge = class {
        constructor(a, b, c, d, e, f = !0) {
            this.i = b;
            this.o = c;
            this.O = d;
            this.v = e;
            this.N = f;
            this.ab = 1;
            this.u = null;
            this.g = {
                Zb: "hplogocta",
                zc: "showCta",
                oc: "ctaHideDuringLightbox"
            };
            this.Ia = a.Ia;
            this.Ia.classList.add(this.g.Zb);
            Xd() || this.Ia.classList.add(this.g.zc);
            b && (this.Ia.appendChild(b), b.tabIndex = -1, b.ariaHidden = "true");
            this.H = new $d(g => {
                this.O(g)
            });
            ce(this)
        }
    };
    var he = RegExp("[A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0900-\u1fff\u200e\u2c00-\ud801\ud804-\ud839\ud83c-\udbff\uf900-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]"),
        ie = RegExp("^[^A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0900-\u1fff\u200e\u2c00-\ud801\ud804-\ud839\ud83c-\udbff\uf900-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]*[\u0591-\u06ef\u06fa-\u08ff\u200f\ud802-\ud803\ud83a-\ud83b\ufb1d-\ufdff\ufe70-\ufefc]"),
        je = /^http:\/\/.*/,
        ke = /\s+/,
        le = /[\d\u06f0-\u06f9]/;

    function me(a) {
        return a instanceof gb ? a : hb(String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;"))
    };

    function nb(a, ...b) {
        if (b.length === 0) return Ya(a[0]);
        let c = a[0];
        for (let d = 0; d < b.length; d++) c += encodeURIComponent(b[d]) + a[d + 1];
        return Ya(c)
    };
    var ne = ["Moz", "ms", "O", "webkit"],
        oe = (a, b, c) => {
            if (a) {
                for (const d of ne) a.style[d + b] = c;
                a.style[b.charAt(0).toLowerCase() + b.substr(1)] = c
            }
        },
        pe = ["", "moz", "ms", "o", "webkit"],
        qe = (a, b) => {
            if (!a) return null;
            for (const d of pe) {
                var c = b;
                d.length > 0 && (c = b.charAt(0).toUpperCase() + b.substr(1));
                c = d + c;
                if (typeof a[c] != "undefined") return c
            }
            return null
        },
        re = () => window.google && window.google.doodle !== void 0 ? window.google.doodle : null,
        se = (a, b) => {
            const c = re();
            return c && c[a] != void 0 ? c[a] : b
        },
        te = a => {
            re() || (window.google.doodle = {});
            window.google.doodle.pvc = a
        };

    function ue(a) {
        return a.indexOf("//") == 0 ? "https:" + a : a
    }

    function ve(a) {
        return ue(se("shortlink", null) || "//www.google.com/?doodle=" + a)
    }
    var we = () => {
        const a = se("doodle_args", {}).is_dogfood;
        return a != null ? a : !1
    },
        xe = se("hl", "en"),
        ye = se("gl", ""),
        ze = RegExp("^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)", "i").test(xe);
    let Ae = null,
        Be = null,
        Ce = null;
    var De = () => {
        Ce || (window.google && window.google.kEI && window.google.kEI.length ? Ce = window.google.kEI : Qd() && Pb(z.url.g, "ei") && (Ce = z.url.g.get("ei")));
        return Ce
    },
        Ee = () => {
            if (!Ae) {
                const a = document.getElementById("hplogoved");
                a ? Ae = a.getAttribute("data-ved") : Qd() && Pb(z.url.g, "ved") && (Ae = z.url.g.get("ved"))
            }
            return Ae
        },
        Fe = a => `${"/"}${"/".endsWith("/") ? "" : "/"}${a}`;
    const Ge = Hd() && z.g.includes("OS 12_");

    function He(a, b, c) {
        a.style.position = "absolute";
        a.style.top = "0";
        a.style.left = "0";
        a.style.width = "100%";
        a.style.height = "100%";
        a.style.direction = "ltr";
        a.dataset.width = b.toString();
        a.dataset.height = c.toString()
    }

    function Ie(a, b = !1) {
        const c = a.g.parentElement ? a.g.parentElement.offsetWidth : a.oa.offsetWidth,
            d = a.g.parentElement ? a.g.parentElement.offsetHeight : a.oa.offsetHeight;
        a.j && (window.scrollX === 0 && window.scrollY === 0 || window.scrollTo(0, 0));
        if (c !== a.u || d !== a.o || a.i.isFullscreen !== a.H || b) {
            b = Number(a.g.dataset.width);
            var e = Number(a.g.dataset.height);
            if (Qd()) throw Error("d");
            var f = Wd() && Kd() && (Kd() && !Gd() || Ld() && !Kd() || Nd() || Pd() || Md()) && !Jd() && !Gd() && a.i.orientation === "landscape-primary" ? b < e !== c < d : !1;
            var g = (a.i.Lb =
                f) ? Math.min(c / e, d / b) : Math.min(c / b, d / e),
                h = g * b,
                l = g * e;
            a.i.scale = g;
            g = `scale(${g}, ${g})`;
            var p = (h - b) / 2;
            var x = (l - e) / 2;
            var Q = f ? Math.abs(c - l) / 2 : Math.abs(c - h) / 2,
                sb = f ? Math.abs(d - h) / 2 : Math.abs(d - l) / 2;
            f ? (f = (h - l) / 2, h = p - f + Q, x = x + f + sb, g += "rotate(90deg)") : (h = Q + p, x += sb);
            oe(a.g, "TransformOrigin", "center center");
            oe(a.g, "Transform", g);
            sd(a.g, ["position", "absolute"], ["width", `${b}px`], ["height", `${e}px`], ["left", `${h}px`], ["top", `${x}px`]);
            Ge && a.j && (b = document.documentElement, e = b.getBoundingClientRect(), e.width === c &&
                e.height === d || sd(b, ["width", `${c}px`], ["height", `${d}px`]));
            a.j && !z.g.includes("CriOS") && c > 0 && document.body.clientWidth !== c && (document.body.clientWidth < document.body.scrollWidth && (document.body.style.width = `${Math.min(document.body.scrollWidth, c)}px`), document.body.clientWidth > c && (document.body.style.width = `${c}px`));
            a.j && sd(a.oa, ["height", "100%"], ["width", "100%"]);
            a.u = c;
            a.o = d;
            a.H = a.i.isFullscreen
        }
    }
    var Je = class {
        constructor(a) {
            this.i = a;
            this.o = this.u = 0;
            this.H = !1;
            this.oa = a.oa;
            this.g = document.querySelector("#uidsdoodle") ? a.oa : a.W;
            He(this.g, a.width, a.height);
            this.j = Wd();
            window.addEventListener("resize", () => {
                Ie(this)
            })
        }
        setSize(a, b) {
            this.g.dataset.width = a.toString();
            this.g.dataset.height = b.toString()
        }
    };
    var A = class { };

    function Ke(a, b) {
        const c = b.constructor;
        a.i.set(c, b);
        a.g && a.g && a.g.i.add(c, a);
        return b
    }
    var B = class {
        constructor(...a) {
            this.i = new Map;
            for (const b of a) Ke(this, b)
        }
        get(a) {
            const b = this.i.get(a);
            if (b) return b;
            throw Error("n`" + a);
        }
    };
    const Le = new Set;
    var Ne = class {
        constructor() {
            this.g = new Map
        }
        find(a) {
            return Me(a.map(b => this.g.get(b) || Le))
        }
        clear() {
            this.g.clear()
        }
        add(a, b) {
            let c = this.g.get(a);
            c || (c = new Set, this.g.set(a, c));
            c.add(b)
        }
        remove(a, b) {
            let c;
            (c = this.g.get(a)) == null || c.delete(b)
        }
    };

    function Me(a) {
        if (a.length === 0) return [];
        if (a.length === 1) return Array.from(a[0]);
        const b = [];
        for (const c of a[0]) {
            let d = !0;
            for (let e = 1; e < a.length; e++) a[e].has(c) || (d = !1);
            d && b.push(c)
        }
        return b
    };
    var Oe = class extends A {
        constructor(a) {
            super();
            this.g = a
        }
    },
        Pe = class extends A {
            constructor(a = []) {
                super();
                this.children = a
            }
        };

    function Qe(a) {
        return (a = a.i.get(Pe)) ? a.children : []
    };

    function C(a, b) {
        b.g = a;
        var c = a.i;
        for (const d of b.i.keys()) c.add(d, b);
        for (const d of Qe(b)) C(a, d)
    }

    function Re(a, b) {
        b.g = void 0;
        var c = a.i;
        for (const d of b.i.keys()) c.remove(d, b);
        for (const d of Qe(b)) Re(a, d)
    }
    var Se = class {
        constructor() {
            this.g = [];
            this.i = new Ne
        }
        find(...a) {
            return this.i.find(a)
        }
        update(a) {
            for (const b of this.g) b.update(a)
        }
    };
    var Te = class {
        constructor(a) {
            this.g = a
        }
    };

    function Ue(a, b) {
        if (a.length !== 1) throw a = `Expected 1 but found ${a.length}.`, b = b ? `${b} (${a})` : a, Error(b);
        return a[0]
    };
    var Ve = class extends A {
        constructor(a = [], b = !1) {
            super();
            this.actions = a;
            this.Ne = b
        }
    };

    function We(a, ...b) {
        let c = a.i.get(Ve);
        c || (c = Ke(a, new Ve));
        c.actions.push(...b)
    };
    var Xe = class extends Te {
        update(a) {
            for (const b of this.g.find(Ve)) {
                const {
                    actions: c,
                    Ne: d
                } = b.get(Ve);
                for (let e = c.length - 1; e >= 0; e--) c[e].update(a), c[e].state === 2 && c.splice(e, 1);
                c.length === 0 && d && Re(this.g, b)
            }
        }
    };
    var Ye = class extends Oa {
        constructor(a, b, c, d) {
            super(a, b, c);
            this.O = d
        }
        v(a, b, c) {
            this.O.set(Aa(a.x, b.x, c), Aa(a.y, b.y, c))
        }
    };

    function Ze(a) {
        let b;
        (b = a.g) == null || Re(b, a);
        for (const c of Qe(a)) Ze(c)
    };

    function $e(a, b) {
        a.x = b.x;
        a.y = b.y
    }

    function af(a, b) {
        a.x *= b;
        a.y *= b;
        return a
    }

    function bf(a) {
        const b = a.length();
        if (b === 0) throw Error("o");
        a.x /= b;
        a.y /= b;
        a.x = a.x;
        a.y = a.y;
        return a
    }
    var D = class {
        constructor(a = 0, b = 0) {
            this.x = a;
            this.y = b
        }
        set(a, b) {
            this.x = a;
            this.y = b;
            return this
        }
        add(a) {
            this.x += a.x;
            this.y += a.y;
            return this
        }
        sub(a) {
            this.x -= a.x;
            this.y -= a.y;
            return this
        }
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        }
        transform(a) {
            const b = a.b * this.x + a.d * this.y + a.f;
            this.x = a.a * this.x + a.c * this.y + a.e;
            this.y = b;
            return this
        }
        V() {
            return new D(this.x, this.y)
        }
    },
        cf = class {
            constructor() {
                this.a = 1;
                this.c = this.b = 0;
                this.d = 1;
                this.f = this.e = 0
            }
            identity() {
                this.a = 1;
                this.c = this.b = 0;
                this.d = 1;
                this.f = this.e = 0;
                return this
            }
            set(a,
                b, c, d, e, f) {
                this.a = a;
                this.b = b;
                this.c = c;
                this.d = d;
                this.e = e;
                this.f = f;
                return this
            }
            V() {
                return (new cf).set(this.a, this.b, this.c, this.d, this.e, this.f)
            }
        };

    function df(a, b = new cf) {
        const c = a.scale,
            d = a.position,
            e = Math.sin(a.rotation);
        a = Math.cos(a.rotation);
        return b.set(c.x * a, c.x * e, -c.y * e, c.y * a, d.x, d.y)
    }
    var E = class extends A {
        constructor(a = new D, b = 0, c = new D(1, 1)) {
            super();
            this.position = a;
            this.rotation = b;
            this.scale = c
        }
    };

    function ef(a, b = new cf) {
        var c = a;
        for (df(a.get(E), b); ;) {
            c = c.i.get(Oe);
            if (!c) break;
            c = c.g;
            var d = c.i.get(E);
            if (!d) break;
            a = b;
            d = df(d, ff);
            const e = d.b * a.a + d.d * a.b,
                f = d.a * a.c + d.c * a.d,
                g = d.b * a.c + d.d * a.d,
                h = d.a * a.e + d.c * a.f + d.e,
                l = d.b * a.e + d.d * a.f + d.f;
            a.a = d.a * a.a + d.c * a.b;
            a.b = e;
            a.c = f;
            a.d = g;
            a.e = h;
            a.f = l
        }
        return b
    }
    const ff = new cf;
    var gf = class extends A { },
        F = class extends A {
            constructor(a, b = 0, c = 0, d = new D(0, 0), e) {
                super();
                this.kb = a;
                this.Rb = b;
                this.g = c;
                this.offset = d;
                this.alpha = 1;
                this.i = e !== void 0 ? e : hf++
            }
        },
        hf = 0;

    function jf(a, b) {
        return new kf(a.g[lf(b)].g, new D(b[1], b[2]), new D(b[3], b[4]))
    }
    var kf = class {
        constructor(a, b, c) {
            this.j = a;
            this.i = b;
            this.g = c
        }
    };

    function mf(a, b, c = !0, d = 12) {
        a = new nf(of(a, b), c);
        a.framesPerSecond = d;
        return a
    }

    function pf() {
        var a = qf(),
            b = rf;
        const c = mf(a, b, !0, 18);
        a = new F(jf(a, b[0]));
        return {
            animation: c,
            Yd: a
        }
    }
    var nf = class extends A {
        constructor(a, b = !0) {
            super();
            this.i = a;
            this.index = this.g = 0;
            this.loop = !0;
            this.j = !1;
            this.offset = new D(0, 0);
            this.framesPerSecond = 12;
            this.o = null;
            this.loop = b
        }
        reset() {
            this.g = this.index = 0
        }
    },
        sf = class {
            constructor(a) {
                this.kb = a
            }
        };

    function of(a, b) {
        const c = [];
        for (const d of b) c.push(new sf(jf(a, d)));
        return c
    };
    let tf;

    function uf(a) {
        if (tf === void 0) throw Error();
        return jf(tf, a)
    };

    function vf(a) {
        a.sort((b, c) => {
            b = b.get(F);
            c = c.get(F);
            return b.Rb - c.Rb || b.g - c.g || b.i - c.i
        })
    }

    function wf(a, b = new cf) {
        a = Ue(a.g.find(gf), "Can't find camera");
        const c = a.get(E);
        c.position.x = -c.position.x;
        c.position.y = -c.position.y;
        c.rotation = -c.rotation;
        ef(a, b);
        c.position.x = -c.position.x;
        c.position.y = -c.position.y;
        c.rotation = -c.rotation
    }
    var xf = class extends Te {
        constructor(a, b) {
            super(a);
            this.i = b;
            this.j = new cf;
            this.o = new cf
        }
        update() {
            const a = this.i;
            a.save();
            a.clearRect(0, 0, a.canvas.width, a.canvas.height);
            wf(this, this.j);
            var b = this.g.find(F);
            vf(b);
            for (const d of b)
                if (b = d.get(F), b.alpha !== 0) {
                    this.i.globalAlpha = b.alpha;
                    var c = this.j;
                    this.i.setTransform(c.a, c.b, c.c, c.d, c.e, c.f);
                    c = ef(d, this.o);
                    this.i.transform(c.a, c.b, c.c, c.d, c.e, c.f);
                    this.i.translate(b.offset.x, b.offset.y);
                    b.kb instanceof kf && (b = b.kb, this.i.drawImage(b.j, b.i.x, b.i.y, b.g.x,
                        b.g.y, 0, 0, b.g.x, b.g.y))
                }
            a.restore()
        }
    },
        yf = class extends Te {
            update(a) {
                for (const b of this.g.find(nf)) {
                    const c = b.get(nf),
                        d = c.framesPerSecond === 0 ? Infinity : 1E3 / c.framesPerSecond;
                    let e = c.i[c.index];
                    if (!c.j)
                        for (c.g += a; c.g >= d;) c.index++, c.index >= c.i.length && (c.index = c.loop ? 0 : c.i.length - 1, c.o && c.o()), c.g -= d, e = c.i[c.index];
                    b.get(F).kb = e.kb;
                    b.get(F).offset = c.offset
                }
            }
        };

    function zf(a) {
        var b = a.Ha.getBoundingClientRect();
        const c = a.j.Lb ? b.height : b.width;
        b = a.j.Lb ? b.width : b.height;
        const [d, e] = a.getSize();
        a.ta = d / c;
        a.v = e / b
    }
    var Af = class {
        constructor(a) {
            this.j = a;
            this.o = [];
            this.g = this.i = null;
            this.O = this.N = 0;
            this.ka = this.u = !1;
            this.H = [];
            this.v = this.ta = 1;
            this.Ha = this.j.Ha;
            this.Da = [this.Ha];
            yc(window, "resize", () => {
                zf(this)
            });
            a = () => {
                zc(window, "resize", () => {
                    zf(this)
                })
            };
            window.hasOwnProperty("screen") && window.screen.hasOwnProperty("orientation") && !Hd() ? yc(screen.orientation, "change", a) : yc(window, "orientationchange", a);
            zf(this)
        }
        handleEvent(a) {
            zf(this);
            var b = a.rb;
            var c = void 0;
            b = (b = b || window.event) ? (c = c || b.targetTouches && b.targetTouches[0] ||
                b.changedTouches && b.changedTouches[0]) && c.pageX !== void 0 ? [c.pageX, c.pageY] : b.clientX !== void 0 ? [b.clientX + (document.dir == "rtl" ? -1 : 1) * (document.body.scrollLeft || document.documentElement.scrollLeft || 0), b.clientY + (document.body.scrollTop || document.documentElement.scrollTop || 0)] : b.pageX !== void 0 ? [b.pageX, b.pageY] : [0, 0] : [0, 0];
            c = this.Ha.getBoundingClientRect();
            if (this.j.Lb) {
                var d = c.right - b[0];
                b[0] = b[1] - c.top;
                b[1] = d
            } else b[0] -= c.left, b[1] -= c.top;
            b[0] *= this.ta;
            b[1] *= this.v;
            c = b[1];
            this.N = b[0];
            this.O = c;
            a = a.type;
            if (!this.ka || a.indexOf("mouse") !== 0) {
                b = {
                    touchstart: "mousedown",
                    touchend: "mouseup",
                    touchmove: "mousemove"
                };
                a in b && (this.ka = !0, a = b[a]);
                c = a;
                a = this.N;
                b = this.O;
                if (!this.u && c === "mousedown")
                    for (this.u = !0, d = 0; d < this.H.length; d++) this.H[d]();
                if (c === "mousedown") {
                    if (!this.i)
                        for (c = 0; c < this.o.length; c++)
                            if (d = this.o[c], d.i.contains(a, b)) {
                                this.g = this.i = d;
                                d.g("mousedown", a, b);
                                break
                            }
                } else if (c === "mouseup") this.i ? (this.i.g("mouseup", a, b), this.i = null) : this.g && this.g.g("mouseup", a, b);
                else if (c === "mousemove" || c === "areamove") {
                    d =
                        null;
                    for (let e = 0; e < this.o.length; e++) {
                        const f = this.o[e];
                        if (f.i.contains(a, b)) {
                            d = f;
                            break
                        }
                    }
                    this.g !== d && (this.g && this.g.g("mouseout", a, b), d && d.g("mouseover", a, b), this.g = d);
                    if (c === "mousemove")
                        for (this.i && this.i.g("mousemove", a, b), c = 0; c < this.o.length; c++) d = this.o[c], d !== this.i && d.i.contains(a, b) && d.g("mousemove", a, b)
                } else c === "mouseout" ? (this.g && this.g.g("mouseout", a, b), this.g = this.i = null) : c === "contextmenu" && this.g && this.g.g("contextmenu", a, b);
                a = this.g && this.g.i.g() ? "pointer" : "default";
                for (const e of this.Da) e.style.cursor =
                    a
            }
        }
        getSize() {
            return [this.j.width, this.j.height]
        }
    };
    (() => {
        const a = new Qa;
        a.contains = () => !0;
        a.g = () => !1;
        return a
    })();
    const Bf = document[qe(document, "exitFullscreen")],
        Cf = qe(document, "fullscreenElement"),
        Df = qe(document, "fullscreenEnabled");

    function Ef(a) {
        a.i && window.screen.orientation && window.screen.orientation.lock && window.screen.orientation.lock(a.i).catch(() => { })
    }

    function Ff(a, b) {
        a.i = b;
        a.g.orientation = b;
        document[Cf] && Ef(a)
    }
    var Hf = class {
        constructor(a) {
            this.g = a;
            this.i = null;
            this.oa = a.oa;
            a = qe(this.oa, "requestFullscreen");
            this.o = this.oa[a];
            a = !(!document[Df] || !Bf);
            if (Qd()) throw Error("d");
            if (this.j = (Hd() ? !1 : Pd() && !(Jd() || Id() && !Hd()) || Md() && Kd()) && a) document.body.style.margin = "0", sd(this.oa, ["overflow", "visible"], ["width", "100%"], ["height", "100%"]), document.body.scrollLeft = 0, yc(window, "scroll", Gf, !0)
        }
    };
    const Gf = a => {
        a.preventDefault();
        a.stopPropagation();
        return !1
    };

    function If() {
        let a, b;
        const c = new Promise((d, e) => {
            a = d;
            b = e
        });
        return new Jf(c, a, b)
    }

    function Kf(a) {
        a.g = !0;
        a.i && (clearTimeout(a.i), a.i = void 0)
    }
    var Jf = class {
        constructor(a, b, c) {
            this.promise = a;
            this.o = b;
            this.j = c;
            this.g = !1
        }
        resolve(a) {
            this.g || (Kf(this), this.o(a))
        }
        reject(a) {
            this.g || (Kf(this), this.j(a))
        }
    };
    let Lf;
    const Mf = {
        df: "resizeComplete",
        Ze: "hibernate",
        ef: "wake"
    };

    function Nf() {
        Lf || (Lf = new Of);
        return Lf
    }

    function Pf(a) {
        var b = Nf();
        yc(b.g, "hibernate", a)
    }

    function Qf(a) {
        var b = Nf();
        yc(b.g, "wake", a)
    }
    var Of = class {
        constructor() {
            Td();
            this.i = a => {
                Object.values(Mf).includes(a.data.cmd) && this.g.dispatchEvent(new CustomEvent(a.data.cmd, a.data))
            };
            this.g = document.createElement("div");
            window.addEventListener("message", this.i)
        }
        destroy() {
            window.removeEventListener("message", this.i);
            var a = this.g;
            if (a)
                if (nc(a)) a.Sa && uc(a.Sa);
                else if (a = Dc(a)) {
                    var b = 0,
                        c;
                    for (c in a.g)
                        for (var d = a.g[c].concat(), e = 0; e < d.length; ++e) Ic(d[e]) && ++b
                }
        }
    };

    function Rf(a) {
        Wb.call(this);
        this.i = a;
        this.g = {}
    }
    wa(Rf, Wb);
    var Sf = [];

    function Tf(a, b, c, d, e) {
        Array.isArray(c) || (c && (Sf[0] = c.toString()), c = Sf);
        for (var f = 0; f < c.length; f++) {
            var g = yc(b, c[f], d || a.handleEvent, e || !1, a.i || a);
            if (!g) break;
            a.g[g.key] = g
        }
    }

    function Uf(a) {
        pb(a.g, function (b, c) {
            this.g.hasOwnProperty(c) && Ic(b)
        }, a);
        a.g = {}
    }
    Rf.prototype.hb = function () {
        Rf.ub.hb.call(this);
        Uf(this)
    };
    Rf.prototype.handleEvent = function () {
        throw Error("p");
    };

    function Vf(a, b, c) {
        new Wf(a, b, c)
    }

    function Xf(a) {
        var b = window.agsa_ext;
        if (!a.ta && !a.o && b && b.getPageVisibility) return b.getPageVisibility() === "hidden";
        b = document[a.o];
        return document[a.ta] || b === "hidden"
    }

    function Yf(a) {
        a.N ? Zf(a) : Id() && !Hd() && $f(a, () => {
            Zf(a)
        })
    }

    function ag(a) {
        Tf(a.O, document, "mousedown mouseout touchstart mouseup mousemove touchend touchmove contextmenu keypress keydown keyup".split(" "), () => void bg(a), !0);
        Tf(a.O, window, ["orientationchange", "resize"], () => void bg(a), !0)
    }

    function cg(a) {
        const b = a.g || a.i || a.v;
        a.j && !b ? (a.j = !1, a.Ca(), dg(a)) : !a.j && b && (a.j = !0, a.Da())
    }

    function dg(a) {
        a.timeout && clearTimeout(a.timeout);
        a.timeout = setTimeout(() => {
            a.timeout = void 0;
            a.i = Date.now() - a.H >= a.ka;
            a.i || dg(a);
            cg(a)
        }, Math.max(100, a.ka - (Date.now() - a.H)))
    }

    function bg(a) {
        a.H = Date.now();
        a.i = !1;
        cg(a)
    }

    function Zf(a) {
        a.u = () => {
            a.g = Xf(a);
            a.g ? cg(a) : bg(a)
        };
        const b = window.agsa_ext;
        a.N ? document.addEventListener(a.N, a.u, !1) : b && b.registerPageVisibilityListener && (te(() => {
            a.u && a.u()
        }), b.registerPageVisibilityListener("google.doodle.pvc();"))
    }

    function $f(a, b) {
        window.agsa_ext ? b() : setTimeout(() => {
            Yf(a)
        }, 100)
    }
    var Wf = class {
        constructor(a, b, c) {
            this.ka = a;
            this.Da = b;
            this.Ca = c;
            this.i = !1;
            this.u = () => { };
            this.v = !1;
            this.H = Date.now();
            this.ta = qe(document, "hidden");
            this.N = (this.o = qe(document, "visibilityState")) ? this.o.replace(/state$/i, "change").toLowerCase() : null;
            this.j = this.g = Xf(this);
            this.O = new Rf;
            Yf(this);
            ag(this);
            Pf(() => {
                this.v = !0;
                cg(this)
            });
            Qf(() => {
                this.v = !1;
                cg(this)
            });
            dg(this)
        }
    };

    function eg(a, b) {
        const c = document.createElement("div");
        c.classList.add("lightboxContainer");
        c.classList.add("lightboxBackground");
        a.oa.appendChild(c);
        const d = document.createElement("div");
        d.classList.add("lightboxContentContainer");
        c.appendChild(d);
        b.classList.add("lightboxContent");
        sd(b, ["position", "relative"], ["left", "50%"], ["top", "50%"]);
        d.appendChild(b);
        b = new Ad(b, () => {
            fg(a)
        });
        c.appendChild(b.wa);
        window.addEventListener("resize", () => {
            a.i()
        });
        return {
            wa: b,
            ob: c,
            Pb: d
        }
    }

    function fg(a) {
        m(function* () {
            a.g && (document.body.classList.remove("ddlLightboxNoScroll"), Ic(a.j), a.oa.classList.remove("lightboxMode"), a.ob.classList.remove("lightboxBackground"), a.ob.classList.remove("lightboxEnabled"), a.g = !1, a.u(), yd(a.wa, !1), Kd() || !z.g.includes("Safari") || z.g.includes("Chrome") || (a.oa.style.display = "none", a.oa.offsetWidth, a.oa.style.display = "block"), yield be(0))
        })
    }

    function gg(a) {
        return m(function* () {
            a.g || (yield be(0), document.body.classList.add("ddlLightboxNoScroll"), a.oa.classList.add("lightboxMode"), a.ob.classList.add("lightboxBackground"), a.ob.getBoundingClientRect(), a.ob.classList.add("lightboxEnabled"), a.g = !0, a.i(), a.j = yc(document, "keydown", b => {
                b.keyCode === 27 && fg(a)
            }), yd(a.wa, !0), yield be(500))
        })
    }
    var hg = class {
        constructor(a, b, c, d, e = () => { }, f = () => { }) {
            this.oa = a;
            this.o = b;
            this.i = e;
            this.j = null;
            this.g = !1;
            this.i = e;
            this.u = f;
            const {
                wa: g,
                ob: h,
                Pb: l
            } = eg(this, b);
            this.wa = g;
            this.ob = h;
            this.Pb = l;
            this.setSize(c, d)
        }
        setSize(a, b) {
            sd(this.Pb, ["maxWidth", `${a}px`], ["maxHeight", `${b}px`]);
            sd(this.o, ["width", `${a}px`], ["height", `${b}px`])
        }
    };
    const ig = [5, 6, 7, 8, 9, 11, 12, 16, 18];
    let jg = 0,
        kg = 0,
        lg = !1,
        G = {},
        mg = [];
    var H = (a, b, c = !1) => {
        G[a] = b;
        c && !mg.includes(a) && mg.push(a)
    },
        I = a => {
            var b = Date.now();
            G.dt = b - kg;
            kg = b;
            a == 0 && (jg = b);
            G.e = a;
            G.t = jg == 0 ? -1 : Math.floor(b - jg);
            G.l = Ld() ? 0 : 1;
            b = [];
            for (var c in G) G.hasOwnProperty(c) && b.push(c + ":" + G[c]);
            c = b.join(",");
            b = a == 10;
            var d = ig.indexOf(a) >= 0;
            Nd() && (c += "&ntp=1");
            b ? (b = Ee()) && (c += `&ved=${b}`) : d && (Be || ((b = document.getElementById("hplogoshareved")) ? Be = b.getAttribute("data-ved") : Qd() && Pb(z.url.g, "sved") && (Be = z.url.g.get("sved"))), (b = Be) && (c += `&ved=${b}`));
            c.search("&ei=") == -1 && (c +=
                "&ei=", (b = De()) && (c += b));
            for (window.google && window.google.log ? window.google.log("doodle", c) : Dd(c); mg.length > 0;) delete G[mg.pop()];
            lg || a != 0 || Xd() || (lg = !0, I(10))
        };
    var og = ng;

    function ng(a, b = !1) {
        (b = (b = b && !Jd()) || Od()) ? kb(a) : (b = window.top.location, a = db(a, cb) || $a, a = fb(a), a !== void 0 && b.assign(a))
    };
    var pg = a => {
        if (Hd() && (Pd() || Md()))
            for (const b of a) yc(b, "touchmove", c => {
                c.scale !== 1 && c.preventDefault()
            }, {
                passive: !1
            })
    },
        qg = a => {
            for (const b of a) yc(b, "contextmenu", c => {
                c.preventDefault()
            }, {
                passive: !1
            })
        };
    let rg = null;

    function sg(a) {
        m(function* () {
            if (a.doodle && z.url.g.get("ddllb") === "1") {
                var b = a.j;
                b.j !== void 0 && b.j !== null && Ic(b.j);
                yield de(b)
            }
        })
    }

    function tg(a) {
        return m(function* () {
            if (Rd()) {
                var b = a.g.Bc,
                    c = new yb("/");
                c.g.set("fpdoodle", "1");
                c.g.set("doodle", String(b));
                xe && c.g.set("hl", xe);
                ye && c.g.set("gl", ye);
                og(c.toString(), !1)
            } else if (!Nd() || Xd()) a.setSize(a.g.width, a.g.height), a.O.start(), a.Ca = !0, a.ta = !0, a.oa.removeAttribute("title"), b = a.doodle, b.Ha.appendChild(b.i), J(b.i.querySelector(".ddl-frame-month"), 30, 120, 30), yield ug(a), I(0), Ie(a.o, !0), b = a.doodle, (c = b.o) != null && (c.isVisible = !1, c.i.pause()), Yd() || (b.o = void 0, qf().g[lf(1)].H()), vg(b)
        })
    }

    function wg(a, b) {
        const c = b ? 0 : -1,
            d = b ? "false" : "true";
        for (const e of a.W.children) e instanceof HTMLElement && (e.tabIndex = c, e.ariaHidden = d);
        a = a.j;
        b = !b;
        a.Ia.tabIndex = b ? 0 : -1;
        a.Ia.ariaHidden = b ? "false" : "true"
    }

    function xg(a) {
        pg([document, a.oa, a.W, a.Ha]);
        qg([a.oa, a.W, a.Ha]);
        Tf(a.N, a.oa, "touchend", () => {
            var b = a.fullscreen;
            b.j && !document[Cf] && (b.o.call(b.oa), Ef(b), b.g.isFullscreen = !!document[Cf])
        })
    }

    function yg(a) {
        Tf(a.N, a.W, ["mousedown", "mouseout", "touchstart"], b => {
            a.u.handleEvent(b)
        });
        Tf(a.N, document, ["mouseup", "mousemove", "touchend", "touchmove", "contextmenu"], b => {
            a.u.handleEvent(b)
        })
    }

    function zg(a) {
        for (const b of a.Ta) {
            let c, d;
            (d = (c = b).g) == null || d.call(c, a.i)
        }
    }

    function ug(a) {
        return m(function* () {
            if (a.v) return Ag(a);
            wg(a, !0);
            zf(a.u)
        })
    }

    function Ag(a) {
        return m(function* () {
            a.H = new hg(a.oa, a.W, a.g.width, a.g.height, () => {
                Ie(a.o, !0);
                zf(a.u)
            }, () => {
                a.Sb()
            });
            yield Bg(a);
            a.W.addEventListener("click", () => Cg(a))
        })
    }

    function Dg(a, b) {
        a.ka = b
    }

    function Bg(a) {
        return m(function* () {
            var b = a.j;
            b.ab !== 0 && b.Ia.classList.add(b.g.oc);
            b = a.Da;
            if (b.ab !== 0)
                for (const e of b.W.children) e.classList.contains(b.g) || e.classList.remove("contentHide");
            a.setSize(a.g.width, a.g.height);
            let c, d;
            (c = a.ka) == null || (d = c.jf) == null || d.call(c);
            wg(a, !0);
            a.oa.removeAttribute("title");
            yield gg(a.H)
        })
    }

    function Cg(a) {
        return m(function* () {
            let b;
            (b = a.H) != null && b.g || (yield Bg(a), a.resume())
        })
    }
    var Fg = class {
        constructor(a, b, c) {
            this.g = a;
            this.ta = this.Ca = !1;
            this.ka = null;
            this.Ta = [];
            Nd() && !Xd() && (a.Wa.Se = !1);
            this.i = Ed();
            this.oa = this.i.oa;
            this.Oa = this.oa.title;
            this.Ha = this.i.Ha;
            this.W = this.i.W;
            this.i.width = this.g.width;
            this.i.height = this.g.height;
            (this.v = Yd()) && this.W.classList.add("domRootLightboxed");
            let d;
            Vf((d = a.le) != null ? d : 6E4, () => {
                this.pause()
            }, () => {
                this.Tb()
            });
            this.N = new Rf(this);
            this.u = new Af(this.i);
            this.fullscreen = new Hf(this.i);
            Ff(this.fullscreen, this.g.orientation);
            this.o = new Je(this.i);
            this.wa = new Ad(this.W, () => {
                var e = this.fullscreen;
                Bf.call(document);
                e.g.isFullscreen = !!document[Cf]
            });
            this.wa.wa.classList.add("closeFullscreenBtn");
            this.j = new ge(this.i, this.g.Wa.Je, this.g.Wa.Vd, () => { }, () => tg(this), this.g.Wa.Se !== !1 && !this.v && !Rd());
            this.Da = new Eg(this.i.W, this.j.g.Zb, this.g.Wa.ab);
            this.O = new $d(e => {
                this.update(e)
            });
            wg(this, Xd());
            xg(this);
            Ie(this.o);
            a = this.i.Ha;
            if (!this.i.oa || !a) throw console.error("Unable to render the Doodle. This is expected during unit tests but may be a cause for concern elsewhere."),
                Error();
            yg(this);
            zg(this);
            this.doodle = new b(this, ...c);
            this.setSize(this.g.Wa.width, this.g.Wa.height);
            Nd() && !Xd() && this.oa.addEventListener("click", () => {
                const e = new URL("https://www.google.com/webhp"),
                    f = e.searchParams;
                f.set("ddllb", "1");
                f.set("doodle", this.g.Bc);
                xe && f.set("hl", xe);
                ye && f.set("gl", ye);
                ng(e.toString(), !0)
            })
        }
        setSize(a, b) {
            this.i.width = a;
            this.i.height = b;
            this.o.setSize(a, b);
            let c;
            (c = this.H) == null || c.setSize(a, b);
            Ie(this.o, !0)
        }
        Tb() {
            let a;
            !this.v || ((a = this.H) == null ? 0 : a.g) ? this.resume() : ee(this.j)
        }
        resume() {
            zf(this.u);
            this.Ca && this.ta ? (Nd() && rg && (Ic(rg), rg = null), this.O.start()) : ee(this.j);
            this.doodle.Tb()
        }
        pause() {
            this.O.pause();
            var a = this.j;
            a.i && a.o && a.i.classList.remove(a.o);
            a.H.pause();
            a = this.doodle;
            a.g && a.g.pause && a.g.pause();
            var b = cd;
            !b.v && b.g && b.g.suspend();
            b.v = !0;
            let c;
            (c = a.o) == null || c.pause()
        }
        update(a) {
            yd(this.wa, !!document[Cf]);
            this.doodle.Va(a)
        }
        Sb() {
            this.pause();
            wg(this, !1);
            this.oa.setAttribute("title", this.Oa);
            var a = this.j;
            a.ab !== 0 && (a.Ia.classList.remove(a.g.oc), ee(a));
            a = this.Da;
            if (a.ab !== 0)
                for (const d of a.W.children) d.classList.contains(a.g) ||
                    d.classList.add("contentHide");
            Ie(this.o, !0);
            this.setSize(this.g.Wa.width, this.g.Wa.height);
            let b, c;
            (b = this.ka) == null || (c = b.Sb) == null || c.call(b)
        }
    };
    class Eg {
        constructor(a, b, c) {
            this.W = a;
            this.g = b;
            this.ab = c
        }
    };

    function Gg(a, b) {
        b = String(b);
        a.contentType === "application/xhtml+xml" && (b = b.toLowerCase());
        return a.createElement(b)
    }

    function Hg() {
        this.g = pa.document || document
    }
    Hg.prototype.appendChild = function (a, b) {
        a.appendChild(b)
    };
    Hg.prototype.contains = function (a, b) {
        if (!a || !b) return !1;
        if (a.contains && b.nodeType == 1) return a == b || a.contains(b);
        if (typeof a.compareDocumentPosition != "undefined") return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b;) b = b.parentNode;
        return b == a
    };
    var Jg = a => {
        return new Promise(resolve => {
            if (document.fonts && document.fonts.load) {
                Promise.all([
                    document.fonts.load('normal normal 1em Nebulove')
                ])
                    .then(() => {
                        resolve();
                    })
                    .catch(err => {
                        console.warn('字体加载失败，使用后备字体:', err);
                        resolve();
                    });
                setTimeout(() => {
                    resolve();
                }, 5000);
            } else {
                setTimeout(resolve, 700);
            }
        });
    };
    var Ig = a => {
        a = a.toLowerCase().replace(/ /g, "");
        const b = document.documentElement.classList;
        for (const c of b.values())
            if (c.search(`wf-${a}-w+-active`)) break
    };
    class Kg extends Vb {
        constructor(a) {
            super(a);
            this.g = new Image
        }
        i() {
            if (this.g.src) return Promise.resolve(this.g);
            let a;
            const b = new Promise(d => a = d),
                c = () => {
                    Ub(this);
                    a(this.g)
                };
            this.g.crossOrigin = "Anonymous";
            this.g.decode ? (this.g.src = this.j, this.g.decode().then(c, () => {
                this.g.removeAttribute("crossOrigin");
                this.g.src = this.j;
                this.g.decode().then(c, () => {
                    c()
                })
            })) : (this.g.onload = c, this.g.onerror = () => {
                this.g.removeAttribute("crossOrigin");
                this.g.removeAttribute("onerror");
                this.g.src = this.g.src
            }, this.g.src = this.j);
            (this.g.complete || this.g.readyState == "complete") && c();
            return b
        }
        H() {
            super.H();
            this.g = new Image
        }
    };
    !hc("Android") || jc();
    jc();
    hc("Safari") && (jc() || (ic() ? 0 : hc("Coast")) || (ic() ? 0 : hc("Opera")) || (ic() ? 0 : hc("Edge")) || (ic() ? gc("Microsoft Edge") : hc("Edg/")) || ic() && gc("Opera"));
    var Lg = {},
        Mg = null;
    var Ng = typeof Uint8Array !== "undefined",
        Og = !kc && typeof btoa === "function";
    var Pg = typeof pa.BigInt === "function" && typeof pa.BigInt(0) === "bigint";
    const Qg = Number.MIN_SAFE_INTEGER.toString(),
        Rg = Pg ? BigInt(Number.MIN_SAFE_INTEGER) : void 0,
        Sg = Number.MAX_SAFE_INTEGER.toString(),
        Tg = Pg ? BigInt(Number.MAX_SAFE_INTEGER) : void 0;

    function Ug(a, b) {
        if (a.length > b.length) return !1;
        if (a.length < b.length || a === b) return !0;
        for (let c = 0; c < a.length; c++) {
            const d = a[c],
                e = b[c];
            if (d > e) return !1;
            if (d < e) return !0
        }
    };
    var Vg = typeof Symbol === "function" && typeof Symbol() === "symbol";

    function Wg(a) {
        return typeof Symbol === "function" && typeof Symbol() === "symbol" ? Symbol() : a
    }
    var Xg = Wg(),
        Yg = Wg("2ex");
    var Zg = Vg ? a => a[Xg] | 0 : a => a.Kb | 0,
        $g = Vg ? a => a[Xg] : a => a.Kb,
        ah = Vg ? (a, b) => {
            a[Xg] = b
        } : (a, b) => {
            a.Kb !== void 0 ? a.Kb = b : Object.defineProperties(a, {
                Kb: {
                    value: b,
                    configurable: !0,
                    writable: !0,
                    enumerable: !1
                }
            })
        };
    var bh = {},
        ch = {};

    function dh(a) {
        return !(!a || typeof a !== "object" || a.g !== ch)
    }

    function eh(a) {
        return a !== null && typeof a === "object" && !Array.isArray(a) && a.constructor === Object
    }

    function fh(a) {
        return !Array.isArray(a) || a.length ? !1 : Zg(a) & 1 ? !0 : !1
    };
    let gh;

    function hh() {
        const a = Error();
        a.__closure__error__context__984382 || (a.__closure__error__context__984382 = {});
        a.__closure__error__context__984382.severity = "incident";
        return a
    };

    function ih(a, b) {
        var c, d, e;
        if (d = c = (d = jh) == null ? void 0 : (e = d.get(b)) == null ? void 0 : e.get(a)) {
            a: if (a.length !== c.length) c = !1;
            else {
                for (const f in c) {
                    e = Number(f);
                    if (d = Number.isInteger(e)) d = a[e], e = c[e], d = !(Number.isNaN(d) ? Number.isNaN(e) : d === e);
                    if (d) {
                        c = !1;
                        break a
                    }
                }
                c = !0
            } d = !c
        }
        if (d) {
            kh();
            let f, g;
            (f = jh) == null || (g = f.get(b)) == null || g.delete(a)
        }
    }

    function kh() {
        const a = hh();
        ae(a)
    }
    let jh = void 0;

    function lh(a) {
        switch (typeof a) {
            case "number":
                return isFinite(a) ? a : String(a);
            case "bigint":
                return (Pg ? a >= Rg && a <= Tg : a[0] === "-" ? Ug(a, Qg) : Ug(a, Sg)) ? Number(a) : String(a);
            case "boolean":
                return a ? 1 : 0;
            case "object":
                if (a)
                    if (Array.isArray(a)) {
                        if (fh(a)) return
                    } else if (Ng && a != null && a instanceof Uint8Array) {
                        if (Og) {
                            for (var b = "", c = 0, d = a.length - 10240; c < d;) b += String.fromCharCode.apply(null, a.subarray(c, c += 10240));
                            b += String.fromCharCode.apply(null, c ? a.subarray(c) : a);
                            a = btoa(b)
                        } else {
                            b === void 0 && (b = 0);
                            if (!Mg) {
                                Mg = {};
                                c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
                                d = ["+/=", "+/", "-_=", "-_.", "-_"];
                                for (var e = 0; e < 5; e++) {
                                    var f = c.concat(d[e].split(""));
                                    Lg[e] = f;
                                    for (var g = 0; g < f.length; g++) {
                                        var h = f[g];
                                        Mg[h] === void 0 && (Mg[h] = g)
                                    }
                                }
                            }
                            b = Lg[b];
                            c = Array(Math.floor(a.length / 3));
                            d = b[64] || "";
                            for (e = f = 0; f < a.length - 2; f += 3) {
                                var l = a[f],
                                    p = a[f + 1];
                                h = a[f + 2];
                                g = b[l >> 2];
                                l = b[(l & 3) << 4 | p >> 4];
                                p = b[(p & 15) << 2 | h >> 6];
                                h = b[h & 63];
                                c[e++] = g + l + p + h
                            }
                            g = 0;
                            h = d;
                            switch (a.length - f) {
                                case 2:
                                    g = a[f + 1], h = b[(g & 15) << 2] || d;
                                case 1:
                                    a = a[f], c[e] = b[a >> 2] + b[(a & 3) << 4 | g >> 4] + h + d
                            }
                            a = c.join("")
                        }
                        return a
                    }
        }
        return a
    };
    let mh;

    function nh(a, b, c, d, e) {
        if (a != null) {
            if (Array.isArray(a)) a = fh(a) ? void 0 : e && Zg(a) & 2 ? a : oh(a, b, c, d !== void 0, e);
            else if (eh(a)) {
                const f = {};
                for (let g in a) f[g] = nh(a[g], b, c, d, e);
                a = f
            } else a = b(a, d);
            return a
        }
    }

    function oh(a, b, c, d, e) {
        const f = d || c ? Zg(a) : 0;
        d = d ? !!(f & 32) : void 0;
        a = Array.prototype.slice.call(a);
        for (let g = 0; g < a.length; g++) a[g] = nh(a[g], b, c, d, e);
        c && c(f, a);
        return a
    }

    function ph(a) {
        return a.Ic === bh ? a.toJSON() : lh(a)
    };

    function qh(a, b, c, d) {
        b = d + (+!!(b & 512) - 1);
        if (!(b < 0 || b >= a.length || b >= c)) return a[b]
    }

    function rh(a, b, c, d) {
        if (c === -1) return null;
        const e = b >> 15 & 1023 || 536870912;
        if (c >= e) {
            if (b & 256) return a[a.length - 1][c]
        } else {
            var f = a.length;
            if (d && b & 256 && (d = a[f - 1][c], d != null)) {
                if (qh(a, b, e, c) && Yg != null) {
                    var g;
                    a = (g = gh) != null ? g : gh = {};
                    g = a[Yg] || 0;
                    g >= 4 || (a[Yg] = g + 1, g = hh(), ae(g))
                }
                return d
            }
            return qh(a, b, e, c)
        }
    }

    function sh(a, b) {
        a = a.g;
        b = rh(a, $g(a), b);
        b = b == null || typeof b === "string" ? b : void 0;
        return b != null ? b : ""
    };
    let th;
    var vh = class {
        constructor(a) {
            a: {
                a == null && (a = mh); mh = void 0;
                if (a == null) {
                    var b = 96;
                    a = []
                } else {
                    if (!Array.isArray(a)) throw Error("q");
                    b = Zg(a);
                    if (b & 2048) throw Error("t");
                    if (b & 64) break a;
                    var c = a;
                    b |= 64;
                    var d = c.length;
                    if (d && (--d, eh(c[d]))) {
                        b |= 256;
                        c = d - (+!!(b & 512) - 1);
                        if (c >= 1024) throw Error("v");
                        b = b & -33521665 | (c & 1023) << 15
                    }
                }
                ah(a, b)
            }
            this.g = a
        }
        toJSON() {
            return uh(this)
        }
        hasExtension(a) {
            if (a.g) {
                var b = a.g;
                a = a.i;
                var c = this.g,
                    d = $g(c),
                    e = rh(c, d, a, !0);
                var f = d;
                if (e != null && typeof e === "object" && e.Ic === bh) b = e;
                else if (Array.isArray(e)) {
                    var g = Zg(e);
                    let h = g;
                    h === 0 && (h |= f & 32);
                    h |= f & 2;
                    h !== g && ah(e, h);
                    b = new b(e)
                } else b = void 0;
                if (b !== e && b != null) a: if (e = d >> 15 & 1023 || 536870912, a >= e) {
                    g = d;
                    if (d & 256) f = c[c.length - 1];
                    else {
                        if (b == null) break a;
                        f = c[e + (+!!(d & 512) - 1)] = {};
                        g |= 256
                    }
                    f[a] = b;
                    a < e && (c[a + (+!!(d & 512) - 1)] = void 0);
                    g !== d && ah(c, g)
                } else c[a + (+!!(d & 512) - 1)] = b, d & 256 && (c = c[c.length - 1], a in c && delete c[a]);
                a = b !== void 0
            } else a = a.g ? a.j(this, a.g, a.i, !0) : a.j(this, a.i, null, !0), a = (a === null ? void 0 : a) !== void 0;
            return a
        }
    };
    vh.prototype.Ic = bh;
    vh.prototype.toString = function () {
        try {
            return th = !0, uh(this).toString()
        } finally {
            th = !1
        }
    };

    function uh(a) {
        var b;
        if (a && (b = jh) != null && b.has(a) && (b = a.g))
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                if (c === b.length - 1 && eh(d))
                    for (var e in d) {
                        var f = d[e];
                        Array.isArray(f) && ih(f, a)
                    } else Array.isArray(d) && ih(d, a)
            }
        a = th ? a.g : oh(a.g, ph, void 0, void 0, !1);
        e = !th;
        if (c = a.length) {
            d = a[c - 1];
            (f = eh(d)) ? c-- : d = void 0;
            b = a;
            if (f) {
                b: {
                    var g = d;
                    var h;
                    var l = !1;
                    if (g)
                        for (let x in g)
                            if (isNaN(+x)) {
                                let Q;
                                ((Q = h) != null ? Q : h = {})[x] = g[x]
                            } else if (f = g[x], Array.isArray(f) && (fh(f) || dh(f) && f.size === 0) && (f = null), f == null && (l = !0), f != null) {
                                let Q;
                                ((Q = h) != null ? Q : h = {})[x] = f
                            }
                    l || (h = g);
                    if (h)
                        for (let x in h) {
                            l = h;
                            break b
                        }
                    l = null
                }
                g = l == null ? d != null : l !== d
            }
            for (; c > 0; c--) {
                h = b[c - 1];
                if (!(h == null || fh(h) || dh(h) && h.size === 0)) break;
                var p = !0
            }
            if (b !== a || g || p) {
                if (!e) b = Array.prototype.slice.call(b, 0, c);
                else if (p || g || l) b.length = c;
                l && b.push(l)
            }
            p = b
        } else p = a;
        return p
    };
    var wh = class extends vh { };
    var yh = () => {
        return Promise.resolve();
    };

    function zh(a, b) {
        b = b.getBoundingClientRect();
        const c = b.width > b.height;
        if (b.width === b.height) throw Error("x");
        return c === !1 ? new D((a.pageX - b.x) / (b.width / 540), (a.pageY - b.y) / (b.height / 960)) : c ? new D((b.height - a.pageY + b.y) / (b.height / 540), (a.pageX - b.x) / (b.width / 960)) : new D((a.pageY - b.y) / (b.height / 540), (b.width - a.pageX + b.x) / (b.width / 960))
    };
    var Bh = (a, b, c) => {
        if (!Ah) return b;
        let d;
        try {
            d = window.localStorage.getItem(a)
        } catch (e) {
            return b
        }
        if (d == null) return b;
        a = JSON.parse(d);
        return c && !c(a) ? b : a
    },
        Ch = (a, b) => {
            if (Ah) try {
                window.localStorage.setItem(a, JSON.stringify(b))
            } catch (c) { }
        },
        Ah = !!self.localStorage;
    var Dh = {
        ad: ["ca"],
        ae: ["ar", "en", "fa", "hi", "ur"],
        af: ["ps", "fa"],
        ag: ["en"],
        al: ["sq", "en"],
        am: ["hy", "ru"],
        ao: ["pt-PT"],
        ar: ["es-419", "es"],
        as: ["en"],
        at: ["de"],
        au: ["en"],
        az: ["az", "ru"],
        ba: ["bs", "hr", "sr"],
        bd: ["bn", "en"],
        be: ["nl", "de", "en", "fr"],
        bf: ["fr"],
        bg: ["bg"],
        bh: ["ar", "en"],
        bi: ["fr"],
        bj: ["fr"],
        bn: ["ms", "en", "zh-CN"],
        bo: ["es-419", "es"],
        br: ["pt-BR", "en"],
        bs: ["en"],
        bt: ["en"],
        bw: ["tn", "en"],
        by: ["be", "ru"],
        bz: ["en", "es", "es-419"],
        ca: ["en", "fr", "fr-CA"],
        cd: ["fr", "sw"],
        cf: ["fr"],
        cg: ["fr"],
        ch: ["de", "en",
            "fr", "it"
        ],
        ci: ["fr"],
        ck: ["en"],
        cl: ["es-419", "es"],
        cm: ["fr", "en"],
        cn: ["zh-CN"],
        co: ["es-419", "es"],
        cr: ["es-419", "en", "es"],
        cu: ["es-419", "es"],
        cv: ["pt-PT"],
        cy: ["en", "el", "tr"],
        cz: ["cs"],
        de: ["de", "en", "fr"],
        dj: ["fr", "ar", "so"],
        dk: ["da"],
        dm: ["en"],
        "do": ["es-419", "es"],
        dz: ["fr", "ar"],
        ec: ["es-419", "es"],
        ee: ["et", "ru"],
        eg: ["ar", "en"],
        es: ["es", "ca", "en", "eu", "gl"],
        et: ["am", "en", "so"],
        fi: ["fi", "sv"],
        fj: ["en"],
        fr: ["fr"],
        ga: ["fr"],
        ge: ["ka", "en"],
        gg: ["en", "fr"],
        gh: ["en"],
        gi: ["en", "es", "it", "pt-PT"],
        gl: ["da", "en"],
        gm: ["en", "wo"],
        gr: ["el"],
        gt: ["es-419", "es"],
        gy: ["en"],
        hk: ["zh-TW", "en", "zh-CN", "zh-HK"],
        hn: ["es-419", "es"],
        hr: ["hr"],
        ht: ["fr", "en", "ht"],
        hu: ["hu"],
        id: ["id", "en", "nl"],
        ie: ["en-GB", "ga"],
        il: ["iw", "ar", "en"],
        im: ["en"],
        "in": "en bn gu hi kn ml mr ne or pa ta te".split(" "),
        iq: ["ar", "en"],
        is: ["is", "en"],
        it: ["it", "en"],
        je: ["en", "fr"],
        jm: ["en"],
        jo: ["ar", "en"],
        jp: ["ja"],
        ke: ["sw", "en"],
        kg: ["ky", "ru"],
        kh: ["km", "en"],
        ki: ["en"],
        kr: ["ko"],
        kw: ["ar", "en"],
        kz: ["kk", "ru"],
        la: ["lo", "en"],
        lb: ["ar", "en", "fr", "hy"],
        lk: ["en",
            "si", "ta"
        ],
        ls: ["st", "en", "zu"],
        lt: ["lt"],
        lu: ["de", "fr"],
        lv: ["lv", "lt", "ru"],
        ly: ["ar", "en", "it"],
        ma: ["fr", "ar"],
        md: ["ro", "ro-MD", "ru"],
        me: ["sr-ME", "bs", "sr"],
        mg: ["mg", "fr"],
        mk: ["mk"],
        ml: ["fr"],
        mm: ["my", "en"],
        mn: ["mn"],
        mt: ["mt", "en"],
        mu: ["en", "fr"],
        mv: ["en"],
        mw: ["ny", "en"],
        mx: ["es-419", "es"],
        my: ["en", "ms"],
        mz: ["pt-PT", "ny", "sn", "sw"],
        na: ["en", "af", "de"],
        ne: ["fr"],
        ng: ["en"],
        ni: ["es-419", "en", "es"],
        nl: ["nl", "en"],
        no: ["no", "nn"],
        np: ["ne", "en"],
        nr: ["en"],
        nu: ["en"],
        nz: ["en-GB"],
        om: ["ar", "en"],
        pa: ["es-419",
            "en", "es"
        ],
        pe: ["es-419", "es"],
        pg: ["en"],
        ph: ["en"],
        pk: ["en", "pa", "ur"],
        pl: ["pl"],
        pn: ["en"],
        pr: ["es-419", "en", "es"],
        ps: ["ar", "en"],
        pt: ["pt-PT"],
        py: ["es-419", "es"],
        qa: ["ar", "en"],
        ro: ["ro", "de", "hu"],
        rs: ["sr", "sr-Latn"],
        ru: ["ru"],
        rw: ["en", "fr", "sw"],
        sa: ["ar", "en"],
        sb: ["en"],
        sc: ["crs", "en", "fr"],
        se: ["sv"],
        sg: ["en", "ms", "ta", "zh-CN"],
        si: ["sl"],
        sk: ["sk", "hu"],
        sl: ["en"],
        sm: ["it"],
        sn: ["fr", "wo"],
        so: ["so", "ar", "en"],
        sr: ["nl", "en"],
        st: ["pt-PT"],
        sv: ["es-419", "es"],
        td: ["fr", "ar"],
        tg: ["fr"],
        th: ["th", "en"],
        tj: ["tg",
            "ru"
        ],
        tl: ["pt-PT", "en", "id"],
        tm: ["tk", "ru", "uz"],
        tn: ["ar", "fr"],
        to: ["en"],
        tr: ["tr"],
        tt: "en es es-419 fr hi zh-TW".split(" "),
        tw: ["zh-TW", "en"],
        tz: ["sw", "en"],
        ua: ["uk", "ru"],
        ug: ["en"],
        uk: ["en-GB"],
        us: ["en", "es", "es-419", "zh-CN"],
        uy: ["es-419", "es"],
        uz: ["uz", "ru"],
        vc: ["en"],
        ve: ["es-419", "es"],
        vi: ["en"],
        vn: ["vi", "en", "fr", "zh-TW"],
        vu: ["en", "fr"],
        ws: ["en"],
        za: ["en", "af", "st", "tn", "zu"],
        zm: ["en", "ny", "sn"],
        zw: ["en", "ny", "sn", "tn", "zu"]
    };
    let Eh = null;

    function Fh() {
        Eh || (Eh = new Gh);
        return Eh
    }

    function Hh(a, b, c, d) {
        const e = `${b}-${c}`;
        if (d.includes(e)) return a.hl = b, e;
        if (b && d.includes(b)) return a.hl = b;
        if (c && Dh[c])
            for (const f of Dh[c])
                if (d.includes(f)) return a.hl = f, a.hl;
        return d.includes("en") ? (a.hl = "en", a.hl) : a.hl = null
    }

    function Ih(a, b) {
        if (!a.g) throw Error("y");
        a = a.g[b] === void 0 ? "" : a.g[b];
        let c = b = 0,
            d = !1;
        const e = a.split(ke);
        for (let f = 0; f < e.length; f++) {
            const g = e[f];
            ie.test(g) ? (b++, c++) : je.test(g) ? d = !0 : he.test(g) ? c++ : le.test(g) && (d = !0)
        }
        b = c == 0 ? d ? 1 : 0 : b / c > .4 ? -1 : 1;
        return b === 1 ? "\u202a" + a + "\u202c" : b === -1 ? "\u202b" + a + "\u202c" : a
    }
    var Gh = class {
        constructor() {
            this.hl = null
        }
        load(a, b, c, d) {
            a = Hh(this, a, b, c);
            if (a == null) return Promise.resolve();
            const e = `${d}messages.${a}.nocache.json`,
                f = new Pc;
            f.Da = "text";
            return new Promise((g, h) => {
                Bc(f, "success", () => {
                    try {
                        var l = f.g ? f.g.responseText : ""
                    } catch (p) {
                        l = ""
                    }
                    this.g = JSON.parse(l.substring(5));
                    g()
                });
                Bc(f, "error", h);
                Sc(f, e)
            })
        }
    };
    var Jh = {},
        Kh = {};

    function Lh() {
        throw Error("z");
    }
    Lh.prototype.Ec = null;
    Lh.prototype.toString = function () {
        return this.Nb
    };
    Lh.prototype.Mc = function () {
        if (this.Hb !== Jh) throw Error("A");
        return hb(this.toString())
    };

    function Mh() {
        Lh.call(this)
    }
    wa(Mh, Lh);
    Mh.prototype.Hb = Jh;

    function Nh(a) {
        if (a != null) switch (a.Ec) {
            case 1:
                return 1;
            case -1:
                return -1;
            case 0:
                return 0
        }
        return null
    }

    function K(a) {
        return a != null && a.Hb === Jh ? a : a instanceof gb ? L(ib(a).toString()) : L(String(String(a)).replace(Oh, Ph), Nh(a))
    }
    var L = function (a) {
        function b(c) {
            this.Nb = c
        }
        b.prototype = a.prototype;
        return function (c, d) {
            c = new b(String(c));
            d !== void 0 && (c.Ec = d);
            return c
        }
    }(Mh);

    function Qh(a) {
        let b = String(a);
        a == null ? (a = "_", b = "null") : a = typeof a === "number" ? "#" : ":";
        return `${b.length}${a}${b}`
    }

    function Rh(a) {
        return Sh(String(a), () => "").replace(Th, "&lt;")
    }
    const Uh = RegExp.prototype.hasOwnProperty("sticky"),
        Vh = new RegExp((Uh ? "" : "^") + "(?:!|/?([a-zA-Z][a-zA-Z0-9:-]*))", Uh ? "gy" : "g");

    function Sh(a, b) {
        const c = [],
            d = a.length;
        let e = 0,
            f = [],
            g, h, l = 0;
        for (; l < d;) {
            switch (e) {
                case 0:
                    var p = a.indexOf("<", l);
                    if (p < 0) {
                        if (c.length === 0) return a;
                        c.push(a.substring(l));
                        l = d
                    } else c.push(a.substring(l, p)), h = p, l = p + 1, Uh ? (Vh.lastIndex = l, p = Vh.exec(a)) : (Vh.lastIndex = 0, p = Vh.exec(a.substring(l))), p ? (f = ["<", p[0]], g = p[1], e = 1, l += p[0].length) : c.push("<");
                    break;
                case 1:
                    p = a.charAt(l++);
                    switch (p) {
                        case "'":
                        case '"':
                            let x = a.indexOf(p, l);
                            x < 0 ? l = d : (f.push(p, a.substring(l, x + 1)), l = x + 1);
                            break;
                        case ">":
                            f.push(p);
                            c.push(b(f.join(""),
                                g));
                            e = 0;
                            f = [];
                            h = g = null;
                            break;
                        default:
                            f.push(p)
                    }
                    break;
                default:
                    throw Error();
            }
            e === 1 && l >= d && (l = h + 1, c.push("<"), e = 0, f = [], h = g = null)
        }
        return c.join("")
    }

    function Wh(a, b) {
        a = a.replace(/<\//g, "<\\/").replace(/\]\]>/g, "]]\\>");
        return b ? a.replace(/{/g, " \\{").replace(/}/g, " \\}").replace(/\/\*/g, "/ *").replace(/\\$/, "\\ ") : a
    }

    function M(a) {
        return a != null && a.Hb === Jh ? String(Rh(a.Nb)).replace(Xh, Ph) : String(a).replace(Oh, Ph)
    }

    function Yh(a) {
        return a != null && a.Hb === Kh ? Wh(a.Nb, !1) : a == null ? "" : Wh(String(a), !0)
    }
    const Zh = {
        "\x00": "&#0;",
        "\t": "&#9;",
        "\n": "&#10;",
        "\v": "&#11;",
        "\f": "&#12;",
        "\r": "&#13;",
        " ": "&#32;",
        '"': "&quot;",
        "&": "&amp;",
        "'": "&#39;",
        "-": "&#45;",
        "/": "&#47;",
        "<": "&lt;",
        "=": "&#61;",
        ">": "&gt;",
        "`": "&#96;",
        "\u0085": "&#133;",
        "\u00a0": "&#160;",
        "\u2028": "&#8232;",
        "\u2029": "&#8233;"
    };

    function Ph(a) {
        return Zh[a]
    }
    const $h = {
        "\x00": "\\0 ",
        "\b": "\\8 ",
        "\t": "\\9 ",
        "\n": "\\a ",
        "\v": "\\b ",
        "\f": "\\c ",
        "\r": "\\d ",
        '"': "\\22 ",
        "&": "\\26 ",
        "'": "\\27 ",
        "(": "\\28 ",
        ")": "\\29 ",
        "*": "\\2a ",
        "/": "\\2f ",
        ":": "\\3a ",
        ";": "\\3b ",
        "<": "\\3c ",
        "=": "\\3d ",
        ">": "\\3e ",
        "@": "\\40 ",
        "\\": "\\5c ",
        "{": "\\7b ",
        "}": "\\7d ",
        "\u0085": "\\85 ",
        "\u00a0": "\\a0 ",
        "\u2028": "\\2028 ",
        "\u2029": "\\2029 "
    };

    function ai(a) {
        return $h[a]
    }
    const Oh = /[\x00\x22\x26\x27\x3c\x3e]/g,
        Xh = /[\x00\x22\x27\x3c\x3e]/g,
        bi = /[\x00\x08-\x0d\x22\x26-\x2a\/\x3a-\x3e@\\\x7b\x7d\x85\xa0\u2028\u2029]/g,
        ci = /^[a-zA-Z0-9+\/_-]+={0,2}$/;

    function di(a) {
        a = String(a);
        return ci.test(a) ? a : "zSoyz"
    }
    const Th = /</g;
    /*
     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    function ei(a, b) {
        var c = za || (za = new Hg);
        if ((a = a(b || fi, void 0)) && a.g) return a.g();
        a = gi(a);
        b = c.g;
        c = Gg(b, "DIV");
        if (c.nodeType === 1 && /^(script|style)$/i.test(c.tagName)) throw Error("d");
        c.innerHTML = ib(a);
        if (c.childNodes.length == 1) c = c.removeChild(c.firstChild);
        else {
            for (a = b.createDocumentFragment(); c.firstChild;) a.appendChild(c.firstChild);
            c = a
        }
        return c
    }

    function N(a, b) {
        b = a(b || fi, void 0);
        a = za || (za = new Hg);
        b && b.g ? a = b.g() : (a = Gg(a.g, "DIV"), b = gi(b), a.innerHTML = ib(b));
        a.childNodes.length == 1 && (b = a.firstChild, b.nodeType == 1 && (a = b));
        return a
    }

    function gi(a) {
        return ra(a) ? a.Mc && (a = a.Mc(), a instanceof gb) ? a : me("zSoyz") : me(String(a))
    }
    const fi = {};

    function hi(a) {
        a = a || {};
        var b = a.Te;
        a = L;
        b = '<button class="' + M("ddl-mute-button") + '"' + (b != null ? " ssk='" + M(Qh("xBJMqe") + b) + "'" : "") + '><div class="' + M("ddl-mute-button-mute-icon") + '">';
        var c = L('<svg height="100%" viewBox="0 96 960 960" width="100%"><path d="M560 925v-68.666q94.667-27.334 154-105Q773.334 673.667 773.334 575t-59-176.667q-59.001-78-154.334-104.667V225q124 28 202 125.5T840 575q0 127-78 224.5T560 925ZM120 696V456h160l200-200v640L280 696H120Zm426.666 45.333v-332Q599 428 629.5 474T660 576q0 55-30.833 100.833-30.834 45.834-82.501 64.5Z"/></svg>');
        b = b + c + '</div><div class="' + M("ddl-mute-button-unmute-icon") + '">';
        c = L('<svg height="100%" viewBox="0 96 960 960" width="100%"><path d="m612.667 734-47.334-47.333 110.667-110-110.667-110 47.334-47.334 110 110.667 110-110.667L880 466.667l-110.667 110 110.667 110L832.667 734l-110-110.667-110 110.667ZM120 696V456h160l200-200v640L280 696H120Z"/></svg>');
        return a(b + c + "</div></button>")
    };
    const ii = Fh();
    var ji = class {
        constructor() {
            this.audio = cd;
            this.g = N(hi);
            this.j = this.g.querySelector(".ddl-mute-button-mute-icon");
            this.o = this.g.querySelector(".ddl-mute-button-unmute-icon");
            this.i = [];
            this.g.addEventListener("click", a => {
                a.stopPropagation();
                if (a = this.isMuted()) {
                    var b = this.audio;
                    b.j && b.g && b.j.gain.setValueAtTime(1, b.g.currentTime);
                    b.N = !1
                } else b = this.audio, b.j && b.g && b.j.gain.setValueAtTime(0, b.g.currentTime), b.N = !0;
                this.update(!a);
                for (const c of this.i) c(!a)
            });
            fd(this.audio, () => {
                this.update(this.isMuted())
            });
            this.update(this.isMuted())
        }
        isMuted() {
            return !this.audio.g ||
                !this.audio.H || this.audio.isMuted()
        }
        update(a) {
            const b = a ? this.o : this.j;
            (a ? this.j : this.o).style.display = "none";
            b.style.display = "";
            this.g.title = Ih(ii, a ? "mute_button_unmute" : "mute_button_mute")
        }
        addListener(a) {
            this.i.push(a)
        }
    };

    function ki(a) {
        return new Promise(b => {
            setTimeout(b, a)
        })
    };

    function li(a) {
        const b = a.ue,
            c = a.qe,
            d = a.re,
            e = a.te,
            f = a.we,
            g = a.xe,
            h = a.Re,
            l = a.he;
        a = a.Ae;
        return L('<div class="' + M("ddl-share-modal") + '"><div class="' + M("ddl-modal-overlay") + '"></div><div class="' + M("ddl-modal-dialog") + '" role="dialog" aria-modal="true" aria-label="' + M(b) + '"><div class="' + M("ddl-modal-header") + '"><div class="' + M("ddl-modal-header-text") + '">' + K(b) + '</div><button class="' + M("ddl-modal-close") + '" title="' + M(c) + '">' + L('<div class="' + M("ddl-modal-close-icon") + '"><svg width="14" height="14" viewBox="0 0 14 14"><path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#444746"/></svg></div>') +
            '</button></div><div class="' + M("ddl-modal-content") + '"><div class="' + M("ddl-modal-buttons") + '"><div class="' + M("ddl-modal-button-container") + '"><button class="' + M("ddl-share-facebook") + '" title="' + M(e) + '">' + L('<div class="' + M("ddl-share-facebook-icon") + '"><svg width="19" height="35" viewBox="0 0 19 35"><path d="M5.81384 35V19.6874H0.25V13.3532H5.81384V8.52552C5.81384 3.03358 9.08538 0 14.0907 0C16.4874 0 18.9959 0.427988 18.9959 0.427988V5.82064H16.2328C13.5108 5.82064 12.6617 7.5099 12.6617 9.24454V13.3532H18.7391L17.7675 19.6874H12.6617V35H5.81384Z" fill="#fff"/></svg></div>') +
            '</button><div class="' + M("ddl-modal-button-label") + '" aria-hidden="true">' + K(d) + '</div></div><div class="' + M("ddl-modal-button-container") + '"><button class="' + M("ddl-share-twitter") + '" title="' + M(g) + '">' + L('<div class="' + M("ddl-share-twitter-icon") + '"><svg width="32" height="32" viewBox="0 0 32 33"><path d="M19.0443 13.731L30.9571 0H28.1341L17.7903 11.9224L9.52875 0H0L12.4931 18.0288L0 32.4278H2.82309L13.7464 19.8373L22.4713 32.4278H32L19.0437 13.731H19.0443ZM15.1777 18.1876L13.9119 16.3924L3.84029 2.10729H8.1764L16.3043 13.6358L17.5701 15.431L28.1355 30.4163H23.7994L15.1777 18.1883V18.1876Z" fill="#fff"/></svg></div>') +
            '</button><div class="' + M("ddl-modal-button-label") + '" aria-hidden="true">' + K(f) + '</div></div></div><div class="' + M("ddl-modal-copy-link-container") + '"><button class="' + M("ddl-modal-copy-link") + '" aria-label="' + M(l) + '">' + L('<div class="' + M("ddl-modal-copy-link-icon") + '" aria-hidden="true"><svg width="48" height="48" viewBox="0 0 48 48"><path d="M23 27H19C17.35 27 16 25.65 16 24C16 22.35 17.35 21 19 21H23V19H19C16.24 19 14 21.24 14 24C14 26.76 16.24 29 19 29H23V27ZM29 19H25V21H29C30.65 21 32 22.35 32 24C32 25.65 30.65 27 29 27H25V29H29C31.76 29 34 26.76 34 24C34 21.24 31.76 19 29 19ZM28 23H20V25H28V23Z"/></svg></div>') +
            '<div class="' + M("ddl-modal-share-link") + '">' + K(h) + '</div></button><div class="' + M("ddl-modal-help-text") + '" aria-hidden="true">' + K(l) + '</div></div></div><div class="' + M("ddl-modal-snack-bar") + '" role="alert">' + K(a) + "</div></div></div>")
    };
    var mi = (a, b) => {
        we() || (I(9), a = a.indexOf("//") == 0 ? "https:" + a : a, window.location = "http://www.google.com/doodles/_SHARE?description=" + encodeURIComponent(b) + "&url=" + encodeURIComponent(a))
    },
        ni = () => window.agsa_ext != null && window.agsa_ext.share != null,
        oi = (a, b) => {
            !we() && ni() && (I(15), window.agsa_ext.share(b + " " + a, null))
        },
        pi = (a, b, c = null) => {
            if (Kd() && navigator.share) try {
                navigator.share({
                    text: b,
                    url: a
                }).then(() => {
                    I(17)
                })
            } catch (d) {
                d instanceof DOMException && d.name === "AbortError" || (Jd() && !Md() ? mi(a, b) : ni() ? oi(a, b) : c())
            } else Jd() &&
                !Md() ? mi(a, b) : ni() ? oi(a, b) : c()
        },
        qi = a => m(function* () {
            if (we()) return Promise.reject();
            I(16);
            return wd(a)
        });
    var ri = ["Google Sans", "Google Sans Text"];
    const si = Fh();

    function ti(a, b, c) {
        let d;
        (d = a.querySelector(`.${b}`)) == null || d.addEventListener("click", c)
    }

    function ui(a, b) {
        m(function* () {
            yield qi(b);
            a.i.focus();
            const c = a.g.querySelector(".ddl-modal-dialog");
            c.classList.add("ddl-with-snack-bar", "ddl-link-copied");
            yield ki(2400);
            c.classList.remove("ddl-link-copied");
            yield ki(400);
            c.classList.remove("ddl-with-snack-bar")
        })
    }
    var vi = class {
        constructor(a, b, c, d, e = () => { }, f = () => { }) {
            this.oa = a;
            this.o = e;
            this.j = f;
            this.g = N(li, {
                ue: Ih(si, "share_modal_share"),
                qe: Ih(si, "share_modal_button_close"),
                re: Ih(si, "share_modal_label_facebook"),
                te: Ih(si, "share_modal_button_facebook"),
                we: Ih(si, "share_modal_label_twitter"),
                xe: Ih(si, "share_modal_button_twitter"),
                Re: c,
                he: Ih(si, "share_modal_click_link"),
                Ae: Ih(si, "share_modal_button_copied")
            });
            this.i = this.g.querySelector(".ddl-modal-copy-link");
            ti(this.g, "ddl-modal-close", () => {
                this.close()
            });
            ti(this.g,
                "ddl-modal-overlay", () => {
                    this.close()
                });
            ti(this.g, "ddl-share-facebook", () => {
                var g = ue(se("facebook_link", null) || ve(d));
                if (!we()) {
                    g = g.indexOf("//") == 0 ? "https:" + g : g;
                    var h = {
                        app_id: "738026486351791",
                        href: g,
                        hashtag: "#GoogleDoodle"
                    };
                    g = new Eb;
                    for (var l in h) g.add(l, h[l]);
                    l = new yb("https://www.facebook.com/dialog/share");
                    Bb(l, g);
                    kb(l.toString());
                    I(5)
                }
            });
            ti(this.g, "ddl-share-twitter", () => {
                var g = ue(se("twitter_link", null) || ve(d));
                we() || (g = g.indexOf("//") == 0 ? "https:" + g : g, g = "text=" + encodeURIComponent(b + "\n" + g),
                    kb("http://twitter.com/intent/tweet?" + g), I(6))
            });
            ti(this.g, "ddl-modal-copy-link-container", () => {
                ui(this, c);
                I(16)
            })
        }
        close() {
            const a = this;
            return m(function* () {
                a.g.classList.add("ddl-closing");
                yield ki(150);
                a.g.remove();
                a.g.classList.remove("ddl-closing");
                a.j()
            })
        }
    };

    function lf(a) {
        return typeof a === "number" ? a : a[0]
    }

    function wi(a, b) {
        const c = a.g[lf(b)];
        return (new Promise(d => {
            c.o ? d() : c.u.push(d);
            c.i()
        })).then(() => { })
    }

    function xi(a) {
        var b = qf();
        return Promise.all(a.map(c => wi(b, c))).then(() => { })
    }

    function yi(a, b, c = 1) {
        const d = b[5] || 1;
        a = a.i[lf(b)];
        return `${c * a[0] / d}px ${c * a[1] / d}px`
    }

    function zi(a, b) {
        const c = b[5] || 1;
        return `url(${a.g[lf(b)].j}) ${`${-(1 * b[1] / c)}px ${-(1 * b[2] / c)}px`}/${yi(a, b, 1)} no-repeat`
    }
    var Bi = class {
        constructor() {
            var a = Ai;
            this.g = [];
            this.i = [];
            for (const c of a) {
                a = new Kg("/" + c.filename);
                var b = c.size;
                this.g.push(a);
                this.i.push(b)
            }
        }
        getSize(a) {
            return {
                width: a[3],
                height: a[4]
            }
        }
    };

    function J(a, b, c, d, e = 10, f = !1) {
        a.style.fontSize = b + "px";
        f && (a.style.lineHeight = a.style.fontSize);
        for (;
            (a.offsetWidth > c || a.offsetHeight > d) && b > e;) b--, a.style.fontSize = b + "px", f && (a.style.lineHeight = a.style.fontSize)
    };
    var Ci = class extends Kc {
        constructor() {
            const a = document.createElement("video");
            a.setAttribute("webkit-playsinline", "");
            a.setAttribute("playsinline", "");
            a.preload = "none";
            a.muted = !0;
            a.controls = !1;
            a.disablePictureInPicture = !0;
            a.style.position = "absolute";
            a.style.left = "0";
            a.style.top = "0";
            a.style.width = "100%";
            a.style.height = "100%";
            super();
            this.g = a;
            this.loaded = this.N = !1;
            this.i = this.j = this.u = this.v = null
        }
        load(a) {
            if (!this.O) {
                let b = () => { };
                this.O = new Promise(f => {
                    b = f
                });
                let c = null;
                const d = () => {
                    c !== null && (clearInterval(c),
                        c = null);
                    this.loaded = !0;
                    b(this)
                };
                c = setInterval(() => {
                    this.g.readyState === this.g.HAVE_ENOUGH_DATA && d()
                }, 32);
                const e = () => {
                    this.g.removeEventListener("error", e);
                    d()
                };
                this.g.addEventListener("canplaythrough", () => {
                    this.g.removeEventListener("error", e);
                    d()
                });
                this.g.addEventListener("error", e);
                this.g.src = a;
                this.g.preload = "auto";
                this.g.load()
            }
            return this.O
        }
        play() {
            this.u = new Promise(d => {
                this.v = () => {
                    d();
                    this.u = this.v = null
                }
            });
            this.i = new Promise(d => {
                this.j = () => {
                    d();
                    this.i = this.j = null
                }
            });
            const a = () => {
                this.g.removeEventListener("timeupdate",
                    a);
                Lc(this, "play", !0, {});
                let d;
                (d = this.v) == null || d.call(this)
            };
            this.g.addEventListener("timeupdate", a);
            const b = () => {
                this.g.removeEventListener("ended", b);
                this.N = !1;
                Lc(this, "ended", !0, {});
                let d;
                (d = this.j) == null || d.call(this)
            };
            this.g.addEventListener("ended", b);
            const c = d => {
                this.g.removeEventListener("error", c);
                this.N = !1;
                console.error("playback failed", this.g.src, d);
                Lc(this, "play", !0, {});
                let e;
                (e = this.v) == null || e.call(this);
                Lc(this, "ended", !0, {});
                let f;
                (f = this.j) == null || f.call(this)
            };
            this.g.addEventListener("error",
                c);
            this.N = !0;
            this.g.play().catch(c);
            return {
                Ke: this.u,
                Lc: this.i
            }
        }
        Ke() {
            return this.u
        }
        Lc() {
            return this.i
        }
        pause() {
            this.g.pause()
        }
        resume() {
            return this.N ? this.g.play() : Promise.resolve()
        }
    };
    var qf = () => {
        var a = Di,
            b = "nb";
        if (a.nb && a.hasOwnProperty(b)) return a.nb;
        b = new a;
        return a.nb = b
    };
    var Di = class extends Bi { },
        Ai = [{
            filename: "main-sprite.png",
            size: [140, 140]
        }, {
            filename: "play-sprite.png",
            size: [1336, 203]
        }, {
            filename: "background-sprite.png",
            size: [1980, 1936]
        }, {
            filename: "moon-sprite-dark-moon-eye-open-in.png",
            size: [1337, 189]
        }, {
            filename: "moon-sprite-dark-moon-eye-open-out.png",
            size: [1337, 381]
        }, {
            filename: "moon-sprite-dark-moon-fade-in.png",
            size: [1605, 189]
        }, {
            filename: "moon-sprite-light-moon-fade-in.png",
            size: [1337, 381]
        }, {
            filename: "moon-sprite-light-moon-fade-out.png",
            size: [1337, 381]
        }, {
            filename: "moon-sprite-light-moon-happy.png",
            size: [801, 381]
        }, {
            filename: "moon-sprite-light-moon-sad.png",
            size: [1069, 381]
        }, {
            filename: "moon-sprite-light-moon-wildcard-gift.png",
            size: [1596, 1525]
        }, {
            filename: "moon-sprite-light-moon-win.png",
            size: [1605, 573]
        }, {
            filename: "moon-sprite-light-moon-win-fade-out.png",
            size: [1337, 381]
        }, {
            filename: "cards-sprite.png",
            size: [1012, 509]
        }, {
            filename: "spinner-sprite.png",
            size: [1986, 456]
        }, {
            filename: "progress-empty-sprite.png",
            size: [2023, 802]
        }, {
            filename: "progress-star1-empty-to-full-sprite.png",
            size: [925, 461]
        }, {
            filename: "progress-star1-full-sprite.png",
            size: [1157, 461]
        }, {
            filename: "progress-star1-full-to-empty-sprite.png",
            size: [809, 809]
        }, {
            filename: "progress-star2-empty-to-full-sprite.png",
            size: [1907, 570]
        }, {
            filename: "progress-star2-full-sprite.png",
            size: [1143, 1334]
        }, {
            filename: "progress-star2-full-to-empty-sprite.png",
            size: [1907, 952]
        }, {
            filename: "progress-star3-empty-to-full-sprite.png",
            size: [952, 1525]
        }, {
            filename: "progress-star3-full-sprite.png",
            size: [1143, 1334]
        }, {
            filename: "rules-sprite.png",
            size: [501, 180]
        }],
        Ei = [13, 0, 203, 100, 100],
        Fi = [13, 0, 0, 200, 200],
        Gi = [13, 927, 203, 50, 50],
        Hi = [2, 0, 1283, 653, 653],
        Ii = [2, 656, 1283, 653, 653],
        Ji = [13, 203, 0, 200, 200],
        Ki = [13, 406, 0, 200, 200],
        Li = [13, 609, 0, 200, 200],
        Mi = [13, 812, 0, 200, 200],
        Ni = [
            [4, 0, 0, 265, 189],
            [4, 268, 0, 265, 189],
            [4, 268, 0, 265, 189],
            [4, 268, 0, 265, 189],
            [4, 536, 0, 265, 189],
            [4, 536, 0, 265, 189],
            [4, 536, 0, 265, 189],
            [4, 804, 0, 265, 189],
            [4, 804, 0, 265, 189],
            [4, 804, 0, 265, 189],
            [4, 1072, 0, 265, 189],
            [4, 1072, 0, 265, 189],
            [4, 1072, 0, 265, 189],
            [4, 0, 192, 265, 189],
            [4, 0, 192, 265, 189],
            [4, 0, 192, 265, 189],
            [4, 268, 192, 265, 189],
            [4, 268, 192, 265, 189],
            [4, 268, 192, 265,
                189
            ],
            [4, 536, 192, 265, 189],
            [4, 536, 192, 265, 189],
            [4, 536, 192, 265, 189],
            [4, 804, 192, 265, 189]
        ],
        Oi = [
            [14, 0, 0, 150, 150],
            [14, 153, 0, 150, 150],
            [14, 306, 0, 150, 150],
            [14, 459, 0, 150, 150],
            [14, 612, 0, 150, 150],
            [14, 765, 0, 150, 150],
            [14, 918, 0, 150, 150],
            [14, 1071, 0, 150, 150],
            [14, 1224, 0, 150, 150],
            [14, 1377, 0, 150, 150],
            [14, 1530, 0, 150, 150],
            [14, 1683, 0, 150, 150],
            [14, 1836, 0, 150, 150],
            [14, 0, 153, 150, 150],
            [14, 153, 153, 150, 150],
            [14, 306, 153, 150, 150],
            [14, 459, 153, 150, 150],
            [14, 612, 153, 150, 150],
            [14, 765, 153, 150, 150],
            [14, 918, 153, 150, 150],
            [14, 1071, 153, 150,
                150
            ],
            [14, 1224, 153, 150, 150],
            [14, 1377, 153, 150, 150],
            [14, 1530, 153, 150, 150],
            [14, 1683, 153, 150, 150],
            [14, 1836, 153, 150, 150],
            [14, 0, 306, 150, 150],
            [14, 153, 306, 150, 150],
            [14, 306, 306, 150, 150],
            [14, 459, 306, 150, 150],
            [14, 1530, 0, 150, 150],
            [14, 612, 306, 150, 150],
            [14, 765, 306, 150, 150],
            [14, 918, 306, 150, 150],
            [14, 1071, 306, 150, 150],
            [14, 1224, 306, 150, 150],
            [14, 1377, 306, 150, 150],
            [14, 1530, 306, 150, 150],
            [14, 1683, 306, 150, 150],
            [14, 1836, 306, 150, 150]
        ],
        Pi = [
            [6, 0, 0, 265, 189],
            [6, 268, 0, 265, 189],
            [6, 268, 0, 265, 189],
            [6, 536, 0, 265, 189],
            [6, 536, 0, 265, 189],
            [6, 804, 0, 265, 189],
            [6, 804, 0, 265, 189],
            [6, 804, 0, 265, 189],
            [6, 1072, 0, 265, 189],
            [6, 1072, 0, 265, 189],
            [6, 1072, 0, 265, 189],
            [6, 0, 192, 265, 189],
            [6, 0, 192, 265, 189],
            [6, 0, 192, 265, 189],
            [6, 268, 192, 265, 189],
            [6, 268, 192, 265, 189],
            [6, 268, 192, 265, 189],
            [6, 536, 192, 265, 189],
            [6, 536, 192, 265, 189],
            [6, 536, 192, 265, 189],
            [6, 804, 192, 265, 189],
            [6, 804, 192, 265, 189],
            [6, 1072, 192, 265, 189]
        ],
        Qi = [
            [8, 0, 0, 265, 189],
            [8, 268, 0, 265, 189],
            [8, 536, 0, 265, 189],
            [8, 536, 0, 265, 189],
            [8, 0, 192, 265, 189],
            [8, 0, 192, 265, 189],
            [8, 268, 192, 265, 189],
            [8, 268, 192, 265, 189],
            [8, 536,
                192, 265, 189
            ],
            [8, 536, 192, 265, 189],
            [8, 536, 192, 265, 189],
            [8, 536, 192, 265, 189],
            [8, 536, 192, 265, 189],
            [8, 536, 192, 265, 189],
            [8, 536, 192, 265, 189],
            [8, 536, 192, 265, 189],
            [8, 536, 192, 265, 189],
            [8, 536, 192, 265, 189],
            [8, 536, 192, 265, 189],
            [8, 536, 192, 265, 189],
            [8, 536, 192, 265, 189],
            [8, 536, 192, 265, 189],
            [8, 536, 192, 265, 189],
            [8, 536, 192, 265, 189],
            [8, 536, 192, 265, 189],
            [8, 536, 192, 265, 189],
            [8, 536, 192, 265, 189],
            [8, 536, 192, 265, 189],
            [8, 536, 192, 265, 189],
            [8, 268, 192, 265, 189],
            [8, 268, 192, 265, 189],
            [8, 0, 192, 265, 189],
            [8, 0, 192, 265, 189],
            [8, 536, 0, 265,
                189
            ],
            [8, 536, 0, 265, 189],
            [8, 0, 0, 265, 189]
        ],
        Ri = [
            [9, 0, 0, 265, 189],
            [9, 268, 0, 265, 189],
            [9, 536, 0, 265, 189],
            [9, 804, 0, 265, 189],
            [9, 804, 0, 265, 189],
            [9, 0, 192, 265, 189],
            [9, 0, 192, 265, 189],
            [9, 268, 192, 265, 189],
            [9, 268, 192, 265, 189],
            [9, 268, 192, 265, 189],
            [9, 268, 192, 265, 189],
            [9, 268, 192, 265, 189],
            [9, 268, 192, 265, 189],
            [9, 268, 192, 265, 189],
            [9, 268, 192, 265, 189],
            [9, 268, 192, 265, 189],
            [9, 268, 192, 265, 189],
            [9, 268, 192, 265, 189],
            [9, 268, 192, 265, 189],
            [9, 268, 192, 265, 189],
            [9, 268, 192, 265, 189],
            [9, 268, 192, 265, 189],
            [9, 268, 192, 265, 189],
            [9, 268, 192, 265,
                189
            ],
            [9, 268, 192, 265, 189],
            [9, 268, 192, 265, 189],
            [9, 268, 192, 265, 189],
            [9, 268, 192, 265, 189],
            [9, 268, 192, 265, 189],
            [9, 0, 192, 265, 189],
            [9, 0, 192, 265, 189],
            [9, 536, 192, 265, 189],
            [9, 536, 192, 265, 189],
            [9, 268, 0, 265, 189],
            [9, 268, 0, 265, 189],
            [9, 0, 0, 265, 189]
        ],
        Si = [
            [10, 0, 0, 530, 379],
            [10, 533, 0, 530, 379],
            [10, 533, 0, 530, 379],
            [10, 1066, 0, 530, 379],
            [10, 1066, 0, 530, 379],
            [10, 0, 382, 530, 379],
            [10, 0, 382, 530, 379],
            [10, 533, 382, 530, 379],
            [10, 533, 382, 530, 379],
            [10, 533, 382, 530, 379],
            [10, 1066, 382, 530, 379],
            [10, 1066, 382, 530, 379],
            [10, 0, 764, 530, 379],
            [10,
                533, 764, 530, 379
            ],
            [10, 533, 764, 530, 379],
            [10, 1066, 764, 530, 379],
            [10, 1066, 764, 530, 379],
            [10, 1066, 764, 530, 379],
            [10, 0, 1146, 530, 379],
            [10, 0, 1146, 530, 379],
            [10, 533, 1146, 530, 379],
            [10, 533, 1146, 530, 379],
            [10, 1066, 1146, 530, 379]
        ],
        Ti = [
            [11, 0, 0, 265, 189],
            [11, 268, 0, 265, 189],
            [11, 268, 0, 265, 189],
            [11, 268, 0, 265, 189],
            [11, 536, 0, 265, 189],
            [11, 536, 0, 265, 189],
            [11, 536, 0, 265, 189],
            [11, 804, 0, 265, 189],
            [11, 804, 0, 265, 189],
            [11, 804, 0, 265, 189],
            [11, 1072, 0, 265, 189],
            [11, 1072, 0, 265, 189],
            [11, 1072, 0, 265, 189],
            [11, 1340, 0, 265, 189]
        ],
        rf = [
            [1, 0, 0, 100, 100],
            [1, 0, 0, 100, 100],
            [1, 0, 0, 100, 100],
            [1, 0, 0, 100, 100],
            [1, 0, 0, 100, 100],
            [1, 0, 0, 100, 100],
            [1, 0, 0, 100, 100],
            [1, 0, 0, 100, 100],
            [1, 0, 0, 100, 100],
            [1, 0, 0, 100, 100],
            [1, 0, 0, 100, 100],
            [1, 0, 0, 100, 100],
            [1, 0, 0, 100, 100],
            [1, 0, 0, 100, 100],
            [1, 0, 0, 100, 100],
            [1, 0, 0, 100, 100],
            [1, 103, 0, 100, 100],
            [1, 206, 0, 100, 100],
            [1, 309, 0, 100, 100],
            [1, 412, 0, 100, 100],
            [1, 515, 0, 100, 100],
            [1, 618, 0, 100, 100],
            [1, 721, 0, 100, 100],
            [1, 824, 0, 100, 100],
            [1, 927, 0, 100, 100],
            [1, 1030, 0, 100, 100],
            [1, 1133, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236,
                0, 100, 100
            ],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 1236, 0, 100, 100],
            [1, 0, 103, 100, 100],
            [1, 103, 103, 100, 100],
            [1, 206, 103, 100, 100],
            [1, 309, 103, 100, 100],
            [1, 412, 103, 100, 100],
            [1, 515, 103, 100, 100],
            [1, 618, 103, 100, 100],
            [1, 721, 103, 100, 100],
            [1, 824, 103, 100, 100],
            [1, 927, 103, 100, 100],
            [1, 1030, 103, 100, 100],
            [1, 1133, 103, 100, 100],
            [1, 1236, 103, 100, 100],
            [1, 0, 0, 100, 100],
            [1, 0, 0, 100, 100],
            [1, 0, 0, 100, 100]
        ],
        Ui = [
            [15, 1910, 116, 113, 113],
            [15, 1910, 232, 113, 113],
            [15, 1910, 348, 113, 113],
            [15, 1910, 464, 113, 113],
            [15, 955, 573, 113, 113],
            [15, 1071, 573, 113, 113],
            [15, 1187, 573, 113, 113],
            [15, 1303, 573, 113, 113],
            [15, 1419, 573, 113, 113],
            [15, 1535, 573, 113, 113],
            [15, 1651,
                573, 113, 113
            ],
            [15, 1767, 573, 113, 113],
            [15, 1883, 580, 113, 113],
            [15, 955, 689, 113, 113],
            [15, 1071, 689, 113, 113],
            [15, 1187, 689, 113, 113],
            [15, 1303, 689, 113, 113],
            [15, 1910, 0, 113, 113]
        ],
        Vi = [
            [15, 191, 0, 188, 188],
            [15, 382, 0, 188, 188],
            [15, 573, 0, 188, 188],
            [15, 764, 0, 188, 188],
            [15, 955, 0, 188, 188],
            [15, 1146, 0, 188, 188],
            [15, 1337, 0, 188, 188],
            [15, 1528, 0, 188, 188],
            [15, 1719, 0, 188, 188],
            [15, 0, 191, 188, 188],
            [15, 191, 191, 188, 188],
            [15, 382, 191, 188, 188],
            [15, 573, 191, 188, 188],
            [15, 764, 191, 188, 188],
            [15, 955, 191, 188, 188],
            [15, 1146, 191, 188, 188],
            [15, 1337, 191,
                188, 188
            ],
            [15, 0, 0, 188, 188]
        ],
        Wi = [
            [15, 191, 0, 188, 188],
            [15, 1719, 191, 188, 188],
            [15, 0, 382, 188, 188],
            [15, 191, 382, 188, 188],
            [15, 382, 382, 188, 188],
            [15, 573, 382, 188, 188],
            [15, 764, 382, 188, 188],
            [15, 955, 382, 188, 188],
            [15, 1146, 382, 188, 188],
            [15, 1337, 382, 188, 188],
            [15, 1528, 382, 188, 188],
            [15, 1719, 382, 188, 188],
            [15, 0, 573, 188, 188],
            [15, 191, 573, 188, 188],
            [15, 382, 573, 188, 188],
            [15, 573, 573, 188, 188],
            [15, 764, 573, 188, 188],
            [15, 1528, 191, 188, 188]
        ];

    function O(a, b) {
        return m(function* () {
            const c = If(),
                d = a.then(() => void c.resolve());
            We(b, d);
            return c.promise
        })
    }

    function P(a, b) {
        return m(function* () {
            return O(new r(a), b)
        })
    };
    const Xi = qf();

    function Yi(a, b = 24, c = !1, d = !1, e = !0) {
        b = mf(Xi, a, c, b);
        b.j = d;
        e && (b.offset.x = -a[0][3] / 2, b.offset.y = -a[0][4] / 2);
        return b
    }

    function Zi(a, b) {
        Ke(a, b);
        Ke(a, new F(b.i[0].kb));
        return b
    }

    function $i(a) {
        return new Promise(b => {
            a.o = b
        })
    }

    function aj(a, b, c = 1E3) {
        a.style.visibility = "visible";
        const d = Number(window.getComputedStyle(a).opacity) || 0;
        return O(new v(c * (1 - d), d, 1, e => {
            a.style.opacity = `${e}`
        }), b)
    }

    function bj(a, b, c = 500) {
        return m(function* () {
            const d = Number(window.getComputedStyle(a).opacity) || 0;
            yield O(new v(c * d, d, 0, e => {
                a.style.opacity = `${e}`
            }), b);
            a.style.visibility = "hidden"
        })
    }

    function cj(a) {
        a.style.visibility = "visible";
        a.style.opacity = "0";
        a.style.transform = "scale(1.05)";
        a.style.filter = "blur(5)px";
        return new t([new v(150, 0, 1, b => {
            a.style.opacity = `${b}`
        }), u(new v(400, 1.05, 1, b => {
            a.style.transform = `scale(${b})`
        }), Ja), u(new v(400, 5, 0, b => {
            a.style.filter = `blur(${b}px)`
        }), Ea(.32, 0, .67, 0))])
    }

    function dj(a) {
        return new n([new t([u(new v(400, 1, 1.05, b => {
            a.style.transform = `scale(${b})`
        }), Ja), u(new v(400, 0, 5, b => {
            a.style.filter = `blur(${b}px)`
        }), Ja), new n([new r(200), new v(200, 1, 0, b => {
            a.style.opacity = `${b}`
        })])]), new q(() => {
            a.style.visibility = "hidden"
        })])
    }

    function ej(a, b, c = Na, d = new D(0, 0)) {
        const e = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        e.setAttribute("cx", `${a.x}`);
        e.setAttribute("cy", `${a.y}`);
        e.setAttribute("r", "0");
        e.classList.add("ddl-progress-star-circle");
        b.appendChild(e);
        return new n([new t([u(new v(3E3, 0, 200, f => {
            e.setAttribute("r", `${f}`)
        }), c), u(new v(3E3, 1, 0, f => {
            e.style.opacity = `${f}`
        }), c), new v(3E3, 4, 48, f => {
            e.setAttribute("stroke-width", `${f}px`)
        }), u(new v(3E3, 0, 5, f => {
            e.style.filter = `blur(${f}px)`
        }), c), u(new v(3E3,
            a.x, a.x + d.x, f => {
                e.setAttribute("cx", `${f}`)
            }), c), u(new v(3E3, a.y, a.y + d.y, f => {
                e.setAttribute("cy", `${f}`)
            }), c)]), new q(() => {
                e.remove()
            })])
    };
    class fj extends hd { }
    var id = {};
    id.Xb = new rd;
    var w = {};
    w.Yb = new y(0, 1E3);
    w.Nc = new y(74346.3984375, 508.2080078125);
    w.wb = new y(2E3, 1342.3330078125);
    w.Oc = new y(19342.33203125, 4E3);
    w.Pc = new y(24342.33203125, 4E3);
    w.Qc = new y(29342.33203125, 4E3);
    w.Rc = new y(34342.33203125, 4E3);
    w.Sc = new y(39342.33203125, 4E3);
    w.Tc = new y(44342.33203125, 4E3);
    w.Uc = new y(4342.3330078125, 2E3);
    w.ac = new y(7342.3330078125, 2E3);
    w.bc = new y(10342.3330078125, 2E3);
    w.hc = new y(13342.3330078125, 2E3);
    w.Vc = new y(16342.3330078125, 2E3);
    w.Wc = new y(49342.33203125, 4E3);
    w.Xc = new y(254534.515625, 4E3);
    w.Yc = new y(54342.33203125, 4E3);
    w.Zc = new y(59342.33203125, 2E3);
    w.jc = new y(62342.33203125, 2E3);
    w.kc = new y(65342.33203125, 2E3);
    w.lc = new y(68342.3359375, 2E3);
    w.hd = new y(71342.3359375, 2004.06201171875);
    w.jd = new y(75854.6015625, 1016.4169921875);
    w.mc = new y(81851.4765625, 12743.375);
    w.kd = new y(95594.8515625, 14E3);
    w.nc = new y(110594.8515625, 5061.97900390625);
    w.ld = new y(206644.5, 3500);
    w.nd = new y(120156.8359375, 28E3);
    w.od = new y(149156.828125, 17614.6875);
    w.qd = new y(167771.515625, 20872.978515625);
    w.qc = new y(189644.5, 16E3);
    w.rd = new y(211144.5, 3500);
    w.ud = new y(215644.5, 3500);
    w.vd = new y(220144.5, 3500);
    w.wd = new y(224644.5, 3500);
    w.xd = new y(229144.5, 3500);
    w.yd = new y(233644.5, 3500);
    w.zd = new y(238144.5, 3500);
    w.Ad = new y(77871.0234375, 682.875);
    w.Bd = new y(242644.5, 1375);
    w.rc = new y(245019.5, 1377.6669921875);
    w.tc = new y(247397.171875, 1387.35400390625);
    w.uc = new y(249784.515625, 1375);
    w.Cd = new y(252159.515625, 1375);
    w.Dd = new y(259534.515625, 2750);
    w.Ed = new y(263284.53125, 1250);
    w.wc = new y(265534.53125, 1250);
    w.xc = new y(267784.53125, 1403.0830078125);
    w.yc = new y(270187.59375, 1250);
    w.Fd = new y(272437.59375, 1250);
    w.Gd = new y(79553.8984375, 1297.5830078125);
    w.Hd = new y(274687.59375, 1250);
    w.Id = new y(276937.59375, 1250);
    w.Jd = new y(279187.59375, 21818.20703125);
    w.Kd = new y(116656.8359375, 2500);
    w.Ld = new y(302005.8125, 6E3);
    w.Md = new y(309005.8125, 6E3);
    w.Ob = new y(316005.8125, 1500);
    w.Ac = new y(318505.8125, 12307.7080078125);
    w.Nd = new y(331813.53125, 6162.6669921875);
    w.Od = new y(338976.1875, 5490.3330078125);
    w.Pd = new y(345466.53125, 4926.60400390625);
    w.Qd = new y(351393.125, 2494.22900390625);
    (function () {
        var a = fj;
        a.nb = void 0;
        a.Hc = function () {
            return a.nb ? a.nb : a.nb = new a
        }
    })();
    const gj = new URLSearchParams(window.location.search);
    var xh = se("id", "350977392"),
        hj = ["ddl-has_seen_tutorial", "ddl-has_seen_wildcard_tutorial", "ddl-has_played_wildcard_tutorial", "ddl-unlocked_wildcards", "ddl-has_seen_intro_video"],
        ij = gj.has("debugGame") && !1,
        jj = gj.get("debugGame"),
        kj = gj.has("resetStorage") && !1,
        lj = gj.has("debugBoard") && !1,
        mj = gj.has("debugMatches") && !1;

    function R() {
        nj === void 0 && (nj = new oj);
        return nj
    }

    function pj(a, b, c, d) {
        nd(b);
        We(a.actions, new n([new r(c), new q(() => {
            od(b, 1, d / 1E3)
        })]))
    }

    function S(a, b, c = 0) {
        m(function* () {
            const d = b.play(c);
            yield P(b.u + c, a.actions);
            jd(b, `${d}`)
        })
    }

    function qj(a, b, c, d = 0) {
        m(function* () {
            if (a.g !== void 0) {
                const e = a.g;
                c !== void 0 && (od(e, .01, c / 1E3), yield P(c, a.actions));
                jd(e)
            }
            c !== void 0 && pj(a, b, d, c);
            b.play(d, !0);
            a.g = b
        })
    }

    function rj(a, b) {
        m(function* () {
            if (a.g !== void 0) {
                var c = a.g;
                a.g = void 0;
                b !== void 0 && (od(c, .01, b / 1E3), yield P(b, a.actions));
                jd(c)
            }
        })
    }
    var oj = class {
        constructor() {
            this.i = new Se;
            this.actions = new B;
            C(this.i, this.actions);
            this.i.g = [new Xe(this.i)]
        }
        update(a) {
            this.i.update(a)
        }
    },
        nj = void 0;
    var sj = "en af sq am ar hy az eu be bn bs bg my ca zh-HK zh-CN zh-TW hr cs da nl en-GB et fa fil fi fr fr-CA gl ka de el gu iw hi hu is id it ja kn kk km ko ky lo lv lt mk ms ml mr mn ne no pl pt-BR pt-PT pa ro ru sr si sk sl es-419 es sw sv ta te th tr uk ur uz vi zu ".split(" ");
    var T = class extends A {
        constructor(a, b) {
            super();
            this.el = a;
            a.style.position = "absolute";
            a.style.left = "0";
            a.style.top = "0";
            this.g = !b || b.pos.x === 0 && b.pos.y === 0 ? "" : `translate(${b.pos.x}${b.Ib}, ${b.pos.y}${b.Ib}) `
        }
    },
        tj = class extends Te {
            update() {
                var a = Ue(this.g.find(gf)),
                    b = new cf,
                    c = a.get(E);
                c.position.x = -c.position.x;
                c.position.y = -c.position.y;
                c.rotation = -c.rotation;
                ef(a, b);
                c.position.x = -c.position.x;
                c.position.y = -c.position.y;
                c.rotation = -c.rotation;
                for (const e of this.g.find(T)) {
                    a = e.get(T);
                    c = a.el;
                    const f =
                        ef(e);
                    var d = b.V();
                    const g = d.b * f.a + d.d * f.b,
                        h = d.a * f.c + d.c * f.d,
                        l = d.b * f.c + d.d * f.d,
                        p = d.a * f.e + d.c * f.f + d.e,
                        x = d.b * f.e + d.d * f.f + d.f;
                    d.a = d.a * f.a + d.c * f.b;
                    d.b = g;
                    d.c = h;
                    d.d = l;
                    d.e = p;
                    d.f = x;
                    c.style.transform = `${a.g}matrix(${d.a},${d.b},${d.c},${d.d},${d.e},${d.f}) translateZ(0)`
                }
            }
        };

    function uj(a, b, c) {
        return m(function* () {
            const d = Zi(a.i, Yi(b)),
                e = a.i.get(E);
            e.rotation = -vj[c];
            $e(e.position, (new D(a.o.width / 2, a.o.height / 2)).add(wj[c]));
            a.i.get(F).Rb = 2;
            yield $i(d)
        })
    }

    function xj(a, b, c) {
        return m(function* () {
            var d = a.H;
            d !== b && (a.H = b, yield a.u, d = yj.get(d).get(b), a.u = uj(a, d, c != null ? c : a.position), yield a.u)
        })
    }

    function zj(a, b, c, d) {
        return m(function* () {
            const e = a.position;
            e !== b && (a.position = b, yield xj(a, 0, e), yield Aj(a, e, b, c), yield xj(a, d, b))
        })
    }

    function Bj(a) {
        return m(function* () {
            yield zj(a, 0, 2500, 1)
        })
    }

    function Cj(a) {
        return m(function* () {
            yield zj(a, 2, 2500, 1)
        })
    }

    function Dj(a) {
        return m(function* () {
            yield zj(a, 1, 1500, 1)
        })
    }

    function Aj(a, b, c, d) {
        return m(function* () {
            if (b !== c) {
                var e = a.background.get(E),
                    f = vj[c],
                    g = e.rotation,
                    h = (f - g) / (f - vj[b]),
                    l = a.v.get(F);
                f = [u(new v(d * h, g, f, p => {
                    e.rotation = p
                }), Fa)];
                c !== 2 && b !== 2 || f.push(new v(d * h, 1 - h, 1, p => {
                    p = c === 2 ? p : 1 - p;
                    l.alpha = p < .3 ? 0 : (p - .3) / .7
                }));
                yield O(new t(f), a.background)
            }
        })
    }
    var Fj = class {
        constructor(a) {
            this.g = new Se;
            this.position = 1;
            this.H = 0;
            this.u = Promise.resolve();
            this.j = a.querySelector(".ddl-background-inner");
            a = a.querySelector(".ddl-background-moon-canvas");
            a.width = Hi[3] / 2;
            a.height = Hi[4] / 2;
            a.style.width = `${a.width}px`;
            a.style.height = `${a.height}px`;
            this.o = a;
            var b = this.g,
                c = new Xe(this.g),
                d = new tj(this.g),
                e = new yf(this.g),
                f = this.g;
            var g = a.getContext("2d");
            b.g = [c, d, e, new xf(f, g)];
            C(this.g, new B(new E, new gf));
            this.background = new B(new E(new D(0, 0), vj[this.position]),
                new T(this.j));
            this.j.style.position = "";
            this.j.style.left = "";
            this.j.style.top = "";
            C(this.g, this.background);
            b = new F(jf(Ej, Hi), 0);
            b.alpha = 0;
            this.v = new B(new E(new D(0, 0), 0, new D(.5, .5)), b);
            C(this.g, this.v);
            C(this.g, new B(new E(new D(0, 0), 0, new D(.5, .5)), new F(jf(Ej, Ii), 1)));
            this.i = new B(new E(new D(a.width / 2, a.height / 2)));
            C(this.g, this.i)
        }
        update(a) {
            this.g.update(a)
        }
    };
    let Gj;
    const Ej = qf(),
        vj = [-Math.PI / 2, 0, Math.PI / 2],
        wj = [new D(-40, 0), new D(0, 40), new D(40, 0)],
        Hj = Qi.slice(0, 29),
        Ij = Qi.slice(29),
        Jj = Ri.slice(0, 29),
        Kj = Ri.slice(29),
        yj = new Map([
            [0, new Map([
                [1, Pi],
                [5, [
                    [5, 0, 0, 265, 189],
                    [5, 268, 0, 265, 189],
                    [5, 268, 0, 265, 189],
                    [5, 268, 0, 265, 189],
                    [5, 536, 0, 265, 189],
                    [5, 536, 0, 265, 189],
                    [5, 536, 0, 265, 189],
                    [5, 804, 0, 265, 189],
                    [5, 804, 0, 265, 189],
                    [5, 804, 0, 265, 189],
                    [5, 1072, 0, 265, 189],
                    [5, 1072, 0, 265, 189],
                    [5, 1072, 0, 265, 189],
                    [5, 1072, 0, 265, 189],
                    [5, 1340, 0, 265, 189]
                ]]
            ])],
            [1, new Map([
                [0, Pi.slice().reverse()],
                [2, Hj],
                [3, Jj],
                [4, Ti]
            ])],
            [2, new Map([
                [1, Ij]
            ])],
            [3, new Map([
                [1, Kj]
            ])],
            [4, new Map([
                [1, Ti.slice().reverse()]
            ])],
            [5, new Map([
                [6, [
                    [3, 0, 0, 265, 189],
                    [3, 268, 0, 265, 189],
                    [3, 268, 0, 265, 189],
                    [3, 268, 0, 265, 189],
                    [3, 536, 0, 265, 189],
                    [3, 536, 0, 265, 189],
                    [3, 536, 0, 265, 189],
                    [3, 804, 0, 265, 189],
                    [3, 804, 0, 265, 189],
                    [3, 804, 0, 265, 189],
                    [3, 1072, 0, 265, 189]
                ]],
                [0, Ni]
            ])],
            [6, new Map([
                [0, Ni]
            ])]
        ]);
    var Lj = {
        new_moon: {
            type: "moon",
            id: "new_moon",
            Ga: [13, 309, 203, 100, 100],
            Ka: Ei,
            Ma: [13, 206, 203, 100, 100],
            La: [13, 103, 203, 100, 100],
            value: 0
        },
        waxing_crescent: {
            type: "moon",
            id: "waxing_crescent",
            Ga: [13, 618, 203, 100, 100],
            Ka: Ei,
            Ma: [13, 515, 203, 100, 100],
            La: [13, 412, 203, 100, 100],
            value: 1
        },
        first_quarter: {
            type: "moon",
            id: "first_quarter",
            Ga: [13, 0, 306, 100, 100],
            Ka: Ei,
            Ma: [13, 824, 203, 100, 100],
            La: [13, 721, 203, 100, 100],
            value: 2
        },
        waxing_gibbous: {
            type: "moon",
            id: "waxing_gibbous",
            Ga: [13, 309, 306, 100, 100],
            Ka: Ei,
            Ma: [13, 206, 306, 100, 100],
            La: [13, 103, 306, 100, 100],
            value: 3
        },
        full_moon: {
            type: "moon",
            id: "full_moon",
            Ga: [13, 618, 306, 100, 100],
            Ka: Ei,
            Ma: [13, 515, 306, 100, 100],
            La: [13, 412, 306, 100, 100],
            value: 4
        },
        waning_gibbous: {
            type: "moon",
            id: "waning_gibbous",
            Ga: [13, 0, 409, 100, 100],
            Ka: Ei,
            Ma: [13, 824, 306, 100, 100],
            La: [13, 721, 306, 100, 100],
            value: 5
        },
        third_quarter: {
            type: "moon",
            id: "third_quarter",
            Ga: [13, 309, 409, 100, 100],
            Ka: Ei,
            Ma: [13, 206, 409, 100, 100],
            La: [13, 103, 409, 100, 100],
            value: 6
        },
        waning_crescent: {
            type: "moon",
            id: "waning_crescent",
            Ga: [13, 618, 409, 100, 100],
            Ka: Ei,
            Ma: [13, 515, 409, 100, 100],
            La: [13, 412, 409, 100, 100],
            value: 7
        },
        wildcard_hunter_moon: {
            type: "legendary_wildcard",
            id: "wildcard_hunter_moon",
            Ga: Ji,
            Ka: Fi,
            Ma: Ji,
            La: Ji,
            value: -1
        },
        wildcard_leonids_meteor: {
            type: "legendary_wildcard",
            id: "wildcard_leonids_meteor",
            Ga: Ki,
            Ka: Fi,
            Ma: Ki,
            La: Ki,
            value: -1
        },
        wildcard_scorpio: {
            type: "legendary_wildcard",
            id: "wildcard_scorpio",
            Ga: Li,
            Ka: Fi,
            Ma: Li,
            La: Li,
            value: -1
        },
        wildcard_super_moon: {
            type: "legendary_wildcard",
            id: "wildcard_super_moon",
            Ga: Mi,
            Ka: Fi,
            Ma: Mi,
            La: Mi,
            value: -1
        }
    },
        Mj = {
            wildcard_hunter_moon: {
                title: "wc_oct_huntermoon_title",
                description: "wc_oct_huntermoon_description",
                Db: "wc_oct_huntermoon_active"
            },
            wildcard_leonids_meteor: {
                title: "wc_oct_leonids_title",
                description: "wc_oct_leonids_description",
                Db: "wc_oct_leonids_active"
            },
            wildcard_scorpio: {
                title: "wc_oct_scorpio_title",
                description: "wc_oct_scorpio_description",
                Db: "wc_oct_scorpio_active"
            },
            wildcard_super_moon: {
                title: "wc_oct_supermoon_title",
                description: "wc_oct_supermoon_description",
                Db: "wc_oct_supermoon_active"
            }
        },
        Nj = Object.values(Lj).filter(a => a.type === "moon");
    Object.values(Lj).filter(a => a.type === "wildcard");
    var Oj = Object.values(Lj).filter(a => a.type === "legendary_wildcard");
    const Pj = Fh();

    function U(a) {
        return Ih(Pj, a)
    }
    var Qj = ["ru"].includes(xe),
        Rj = Qj ? "Inter" : "Josefin Sans",
        Sj = Qj ? 100 : 200;
    var Tj = class extends A {
        constructor(a, b) {
            super();
            this.Va = a;
            this.value = b;
            this.i = !0;
            this.g = !1
        }
        set(a) {
            this.j = this.value;
            this.g = !0;
            this.value = a
        }
        get() {
            return this.value
        }
        update(a) {
            this.g && (this.Va(a, this.value, this.j), this.g = !1, this.j = void 0)
        }
    },
        Uj = class extends Te {
            constructor(a, ...b) {
                super(a);
                this.i = [];
                this.i.push(Tj, ...b)
            }
            update() {
                for (const a of this.i)
                    for (const b of this.g.find(a, T)) {
                        const c = b.get(a);
                        c.i && c.update(b)
                    }
            }
        };

    function Vj(a, b, c) {
        c.scale.set(a.x / b.x, a.y / b.y);
        return new V(a, b)
    }
    var V = class extends A {
        constructor(a, b) {
            super();
            this.Aa = a;
            this.g = b;
            this.Aa.V()
        }
    },
        Wj = class extends Te {
            update() {
                for (const a of this.g.find(V, E)) {
                    const b = a.get(E).scale,
                        c = a.get(V);
                    b.set(c.Aa.x / c.g.x, c.Aa.y / c.g.y)
                }
            }
        };

    function Xj(a) {
        const b = a.width;
        a = a.height;
        return L('<button class="' + M("ddl-card") + '" style="width: ' + M(Yh(b)) + "px; height: " + M(Yh(a)) + 'px;">' + L('<div class="' + M("ddl-card-border") + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 298 294"><circle fill="none" stroke="#fff" stroke-width="1.87px" cx="282" cy="278" r="15"/><circle fill="none" stroke="#fff" stroke-width="1.87px" cx="282" cy="16" r="15"/><circle fill="none" stroke="#fff" stroke-width="1.87px" cx="16" cy="278" r="15"/><circle fill="none" stroke="#fff" stroke-width="1.87px" cx="16" cy="16" r="15"/><path fill="none" stroke="#fff" stroke-width="1.87px" fill-rule="evenodd" d="M36.544,8.544H261.456a26,26,0,0,1,26,26V259.456a26,26,0,0,1-26,26H36.544a26,26,0,0,1-26-26V34.544A26,26,0,0,1,36.544,8.544Z"/></svg></div>') +
            '<div class="' + M("ddl-card-inner") + '"><div class="' + M("ddl-card-front") + '"><div class="' + M("ddl-card-face") + " " + M("ddl-card-default") + '"></div><div class="' + M("ddl-card-face") + " " + M("ddl-card-light") + '"></div><div class="' + M("ddl-card-face") + " " + M("ddl-card-dark") + '"></div></div><div class="' + M("ddl-card-back") + '"></div></div></button>')
    }

    function Yj(a) {
        var b = a.Ue,
            c = a.Fb;
        a = a.buttons;
        b = '<div class="' + M("ddl-card-modal-container") + '"><div class="' + M("ddl-card-modal") + '"><div class="' + M("ddl-card-modal-inner-container") + '"><div class="' + M("ddl-card-modal-card-container") + '"></div><span class="' + M("ddl-card-modal-card-title") + '"></span><span class="' + M("ddl-card-modal-card-subtitle") + '">' + K(b) + '</span><div class="' + M("ddl-card-modal-card-description-container") + '"><span class="' + M("ddl-card-modal-card-description") + '"></span></div>' + (c ?
            '<span class="' + M("ddl-card-modal-buttons-title") + '">' + K(c) + "</span>" : "") + '<div class="' + M("ddl-card-modal-buttons-container") + '">';
        c = [];
        for (const [d, e] of a.entries()) c.push({
            key: d,
            value: e
        });
        a = c.length;
        for (let d = 0; d < a; d++) {
            const e = c[d];
            b += '<button class="' + M("ddl-card-modal-button") + " " + M("ddl-button") + '" data-id="' + M(e.key) + '">' + K(e.value) + "</button>"
        }
        return L(b + "</div></div></div></div>")
    };
    const Zj = qf();

    function ak(a, b) {
        const c = a.get(T).el;
        c.querySelector(".ddl-card-inner").style.transform = `rotateY(${b}deg)`;
        a = a.get(W);
        a.Ya = b;
        let d;
        if (b !== 180) {
            b = a.definition;
            let e;
            (b = b.type === "moon" ? b.id : (e = Mj[b.id]) == null ? void 0 : e.title) && (d = U(b))
        }
        d ? (c.setAttribute("aria-label", d), c.setAttribute("title", d)) : (c.removeAttribute("aria-label"), c.removeAttribute("title"))
    }

    function bk(a, b, c, d, e, f) {
        a.i.get(W);
        $e(a.get(E).position, b);
        ak(a, d);
        $e(a.get(V).Aa, c);
        C(e, a);
        a = a.get(T).el;
        f.appendChild(a)
    }
    var W = class extends A {
        constructor(a, b) {
            super();
            this.id = a;
            this.definition = b;
            this.Ya = 0;
            this.type = b.type;
            this.value = b.value
        }
    },
        ck = class extends A { };

    function dk(a, b) {
        const c = a.definition;
        return ek(c.id, c, a, b)
    }
    var fk = class extends A {
        constructor(a) {
            super();
            this.definition = a;
            this.Mb = !1
        }
    };

    function ek(a, b, c, d) {
        const e = new D(b.Ga[3], b.Ga[4]),
            f = N(Xj, {
                width: e.x,
                height: e.y
            });
        f.querySelector(".ddl-card-default").style.background = zi(Zj, b.Ga);
        f.querySelector(".ddl-card-light").style.background = zi(Zj, b.Ma);
        f.querySelector(".ddl-card-dark").style.background = zi(Zj, b.La);
        f.querySelector(".ddl-card-back").style.background = zi(Zj, b.Ka);
        const g = new E;
        a = new B(new W(a, b), g, Vj(d.V(), e.V(), g), new T(f, {
            pos: new D(-50, -50),
            Ib: "%"
        }), new gk, new hk);
        c && Ke(a, c);
        return a
    }
    var gk = class extends Tj {
        constructor() {
            super((a, b, c) => void ik(a, b, c), !1)
        }
    },
        hk = class extends Tj {
            constructor() {
                super((a, b, c) => void jk(a, b, c), !0)
            }
        };

    function ik(a, b, c) {
        if (a.g && b !== c) {
            c = Ue(a.g.find(Ve));
            var d = a.get(T).el.querySelector(".ddl-card-border");
            a = void 0;
            a = b ? new n([new v(100, 0, 1, e => {
                d.style.opacity = `${e}`
            }), new t([new v(200, 10, 0, e => {
                d.style.filter = `drop-shadow(0 0 10px #fff) blur(${e}px)`
            }), new v(200, 1.45, 1.27, e => {
                d.style.transform = `scale(${e})`
            })])]) : new n([new t([new v(200, 0, 10, e => {
                d.style.filter = `drop-shadow(0 0 10px #fff) blur(${e}px)`
            }), new v(200, 1.27, 1.45, e => {
                d.style.transform = `scale(${e}, ${e})`
            })]), new v(100, 1, 0, e => {
                d.style.opacity =
                    `${e}`
            })]);
            We(c, a)
        }
    }

    function jk(a, b, c) {
        if (a.g && b !== c) {
            c = Ue(a.g.find(Ve));
            var d = a.get(T).el;
            We(c, b ? new n([new v(250, .25, 1, e => {
                d.style.filter = `contrast(${e})`
            })]) : new n([new v(250, 1, .25, e => {
                d.style.filter = `contrast(${e})`
            })]))
        }
    };
    var mk = class extends ya {
        constructor(a, b, c) {
            super(() => this.create());
            this.T = a;
            this.i = b;
            this.o = c
        }
        create() {
            const a = this.T.get(E).position,
                b = this.T.get(V).Aa,
                c = this.T.get(W).Ya,
                d = this.T.get(T).el;
            d.classList.add("ddl-card-selected");
            const e = [],
                f = [];
            kk(a, this.i.pos) || f.push(u(new Ye(this.o * .7, a.V(), this.i.pos, a), Ja));
            kk(b, this.i.size) || f.push(u(new Ye(this.o * .7, b.V(), this.i.size, b), Ja));
            f.length > 0 && e.push(new t(f));
            lk(c, this.i.Ya) || e.push(u(new v(this.o * .3, c, this.i.Ya, g => {
                ak(this.T, g)
            }), Ja));
            e.push(new q(() => {
                d.classList.remove("ddl-card-selected")
            }));
            return new n(e)
        }
    };

    function kk(a, b) {
        return lk(a.x, b.x, .001) && lk(a.y, b.y, .001)
    }

    function lk(a, b, c = .001) {
        return Math.abs(a - b) <= c
    };

    function nk(a, b) {
        b === "moon" ? (b = a.U, a = a.Pa) : (b = a.g, a = a.Pa + a.cardSize.y + 20);
        return {
            U: b,
            Pa: a
        }
    }

    function ok(a, b, c, d) {
        c = pk(b, c);
        const e = [];
        for (let f = 0; f < b.length; f++) {
            const g = b[f],
                h = c[f],
                l = g.get(V).Aa.V();
            e.push(new mk(g, {
                pos: h,
                size: l,
                Ya: a.o ? 0 : 180
            }, 700))
        }
        return O(new t(e), d)
    }

    function qk(a, b, c, d, e = !0, f = !0) {
        return m(function* () {
            bk(b, a.j, b.get(W).type === "moon" ? a.cardSize : new D(65, 65), 180, d, a.i);
            const {
                U: g,
                Pa: h
            } = nk(a, b.get(W).type);
            g.push(b);
            yield aj(b.get(T).el, c, 100);
            f && S(R(), w.jd, 200);
            e && (yield ok(a, g, h, c))
        })
    }

    function rk(a, b) {
        return m(function* () {
            const {
                U: c
            } = nk(a, b.get(W).type), d = c.findIndex(e => e === b);
            d >= 0 && c.splice(d, 1)
        })
    }

    function sk(a, b) {
        return m(function* () {
            yield ok(a, a.U, a.Pa, b);
            yield ok(a, a.g, a.Pa + a.cardSize.y + 20, b)
        })
    }
    var tk = class {
        constructor(a, b, c, d, e) {
            this.Pa = a;
            this.j = b;
            this.cardSize = c;
            this.o = d;
            this.i = e;
            this.U = [];
            this.g = []
        }
        Za() {
            return this.U.length + this.g.length === 0
        }
    };

    function pk(a, b) {
        const c = [];
        var d = (a.length - 1) * 15;
        d = 270 - (a.map(e => e.get(V).Aa.x).reduce((e, f) => e + f, 0) + d) / 2;
        for (const e of a) a = e.get(V).Aa.x, c.push(new D(d + a / 2, b)), d += a + 15;
        return c
    };
    var uk = class extends A { },
        vk = class extends A { };

    function wk(a) {
        return new B(new X("player", 745, new D(640, 745), new D(84, 84), !0, a), new uk)
    }

    function xk(a) {
        return new B(new X("moon", 233, new D(640, 233), new D(55, 55), !1, a), new vk)
    }
    var X = class extends A {
        constructor(a, b, c, d, e, f) {
            super();
            this.id = a;
            this.Eb = !0;
            this.Cc = {
                Ge: 1,
                Gc: 1,
                Oe: 1
            };
            this.Qa = new tk(b, c, d, e, f)
        }
    };

    function yk() {
        var a = L,
            b = '<button class="' + M("ddl-tile") + '">';
        var c = L('<div class="' + M("ddl-tile-border") + "\"><svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' fill='none' stroke='#fff' stroke-width='3' stroke-dasharray='8,4' stroke-dashoffset='0' stroke-linecap='butt'/></svg></div>");
        return a(b + c + "</button>")
    };
    qf();
    const zk = new D(Gi[3], Gi[4]);

    function Ak(a, b, c) {
        b = new E(b.V());
        return new B(new Y(a), b, Vj(c.V(), zk.V(), b), new T(ei(yk), {
            pos: new D(-50, -50),
            Ib: "%"
        }), new Bk)
    }
    var Y = class extends A {
        constructor(a) {
            super();
            this.id = a;
            this.g = !0
        }
    },
        Bk = class extends Tj {
            constructor() {
                super((a, b) => {
                    a = a.get(T).el;
                    b ? a.classList.add("ddl-tile-selectable") : a.classList.remove("ddl-tile-selectable")
                }, !1)
            }
        };

    function Ck(a, b) {
        switch (a) {
            case "pair":
            case "full_moon":
                return Dk(b[0], b[1]);
            case "run":
                return Ek(b);
            default:
                jb(a, `Unknown card set type: ${a}`)
        }
    }

    function Fk(a) {
        switch (a.type) {
            case "pair":
            case "full_moon":
                a.U.sort((d, e) => {
                    d = d.get(W).id;
                    e = e.get(W).id;
                    return d < e ? -1 : d > e ? 1 : 0
                });
                break;
            case "run":
                const b = a.U[0].get(W).value,
                    c = a.U[1].get(W).value;
                (b > c && b !== 7 && c !== 0 || b === 0 && c === 7) && a.U.reverse();
                break;
            default:
                throw Error("B`" + a.type);
        }
    }
    var Gk = class {
        constructor(a, b, c, d) {
            this.type = a;
            this.U = b;
            this.ha = c;
            a === "run" && b.length >= 3 || ["pair", "full_moon"].includes(a);
            Fk(this);
            this.id = Ck(this.type, this.U);
            this.tiles = b.map(e => e.get(W).ya);
            a: {
                switch (a) {
                    case "pair":
                        a = d;
                        break a;
                    case "full_moon":
                        a = 2 * d;
                        break a;
                    case "run":
                        a = b.length * d;
                        break a;
                    default:
                        jb(a, `Unknown card set type: ${a}`)
                }
                a = void 0
            }
            this.Cb = a
        }
    };

    function Hk(a, b) {
        const c = [];
        var d = b.T.get(W);
        if (d.type !== "moon") throw Error("C`" + d.id);
        var e = a.g;
        var f = b.ya.get(Y).id;
        f = e.neighbors.get(f);
        e = b.ha.get(X).Cc;
        for (var g of f) {
            f = g.get(Y).T;
            if (!f) continue;
            const x = f.get(W);
            if (x.type !== "moon") throw Error("D`" + x.id);
            d.value === x.value && c.push(new Gk("pair", [b.T, f], b.ha, e.Ge));
            (d.value + 4) % 8 === x.value && c.push(new Gk("full_moon", [b.T, f], b.ha, e.Gc))
        }
        g = [];
        Ik(a, b.ya, b.T, -1, [], new Set, g);
        d = [];
        Ik(a, b.ya, b.T, 1, [], new Set, d);
        a = [];
        if (g.length === 0) a.push(...d);
        else
            for (var h of g)
                for (var l of d) g = [...h], g.reverse(), g.pop(), a.push([...g, ...l]);
        h = new Map;
        for (p of a) {
            l = new Set;
            for (a = 0; a < p.length; a++) {
                d = p[a];
                if (l.has(d)) {
                    p.splice(a);
                    break
                }
                l.add(d)
            }
            p.length >= 3 && (l = Ck("run", p), h.has(l) || h.set(l, p))
        }
        var p = Array.from(h.values());
        for (const x of p) c.push(new Gk("run", x, b.ha, e.Oe));
        return c
    }

    function Ik(a, b, c, d, e, f, g) {
        e.push(c);
        f.add(b);
        b = b.get(Y);
        c = c.get(W);
        var h = a.g.neighbors.get(b.id);
        b = [];
        for (const l of h) {
            h = l.get(Y).T;
            if (!h) continue;
            const p = h.get(W);
            p.type !== "moon" || f.has(l) || p.value === ((c.value + d) % 8 + 8) % 8 && b.push({
                ya: l,
                T: h
            })
        }
        if (b.length === 0) g.push(e);
        else
            for (const l of b) Ik(a, l.ya, l.T, d, [...e], new Set(f), g)
    }
    var Jk = class {
        constructor(a) {
            this.g = a
        }
    };

    function Dk(a, b) {
        return [a, b].map(c => c.get(W).id).sort((c, d) => c < d ? -1 : c > d ? 1 : 0).reduce((c, d) => `${c},${d}`)
    }

    function Ek(a) {
        return a.map(b => b.get(W).id).reduce((b, c) => `${b},${c}`)
    };

    function Kk(a, b) {
        return [a, b].map(c => c.get(Y).id).sort().join(",")
    }

    function Lk(a, b) {
        const c = a.get(E).position.V(),
            d = b.get(E).position.V(),
            e = af(c.V().add(d), .5);
        c.sub(e);
        d.sub(e);
        const f = document.createElementNS("http://www.w3.org/2000/svg", "g");
        f.appendChild(Mk("ddl-connection-default", c, d, "#58638b", 2));
        return new B(new Nk(f, a, b), new E(e), new T(f))
    }

    function Ok(a, b) {
        var c;
        (c = a.yb) == null || c.remove();
        a.yb = void 0;
        if (b !== void 0) {
            a: {
                c = a.Vb;
                var d = a.Ub.get(E).position.V(),
                    e = c.get(E).position.V();
                switch (b) {
                    case "pair":
                        c = Pk(Qk(d, e, -5), 3);
                        d = Pk(Qk(d, e, 5), 3);
                        c.setAttribute("class", "ddl-connection-highlight");
                        c.setAttribute("stroke", "#fff");
                        c.setAttribute("stroke-width", "1");
                        c.setAttribute("fill", "transparent");
                        d.setAttribute("class", "ddl-connection-highlight");
                        d.setAttribute("stroke", "#fff");
                        d.setAttribute("stroke-width", "1");
                        d.setAttribute("fill", "transparent");
                        e = document.createElementNS("http://www.w3.org/2000/svg", "g");
                        e.appendChild(c);
                        e.appendChild(d);
                        c = e;
                        break a;
                    case "full_moon":
                        c = Pk(new D(0, 0), 5);
                        c.setAttribute("class", "ddl-connection-highlight");
                        c.setAttribute("fill", "#fff");
                        d = document.createElementNS("http://www.w3.org/2000/svg", "g");
                        d.appendChild(c);
                        c = d;
                        break a;
                    case "run":
                        d = e.sub(d);
                        c = d.length() * .5;
                        d = bf(d);
                        c = Mk("ddl-connection-highlight", af(d.V(), -c), af(d.V(), -c), "#fff", 6);
                        break a;
                    default:
                        throw Error("B`" + b);
                }
            }
            c.style.opacity = "0"; a.Dc.appendChild(c);
            a.yb = c
        }
        a.type = b
    }
    var Nk = class extends A {
        constructor(a, b, c) {
            super();
            this.Dc = a;
            this.Ub = b;
            this.Vb = c;
            this.id = Kk(b, c)
        }
    };

    function Mk(a, b, c, d, e = 5) {
        const f = document.createElementNS("http://www.w3.org/2000/svg", "line");
        f.setAttribute("class", a);
        f.setAttribute("x1", `${b.x}`);
        f.setAttribute("y1", `${b.y}`);
        f.setAttribute("x2", `${c.x}`);
        f.setAttribute("y2", `${c.y}`);
        f.setAttribute("stroke", d);
        f.setAttribute("fill", "none");
        f.setAttribute("stroke-width", `${e}`);
        f.setAttribute("stroke-linecap", "round");
        return f
    }

    function Pk(a, b) {
        const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        c.setAttribute("cx", `${a.x}`);
        c.setAttribute("cy", `${a.y}`);
        c.setAttribute("r", `${b}`);
        return c
    }

    function Qk(a, b, c) {
        var d = new D(0, 0);
        a = a.V().sub(b);
        a = new D(-a.y, a.x);
        bf(a);
        af(a, c);
        return d.V().add(a)
    };

    function Rk(a, b, c) {
        C(a.j, b);
        c.appendChild(b.get(T).el)
    }

    function Sk(a) {
        if (lj)
            for (const b of a.tiles.values()) b.get(T).el.addEventListener("mouseover", () => {
                var c = b.get(Y).id;
                console.log(`tile: ${c}`);
                c = a.neighbors.get(c);
                a.o.push(...c);
                for (const d of c.map(e => e.get(T).el)) d.style.filter = "drop-shadow(0 0 10px #f00)"
            }), b.get(T).el.addEventListener("mouseout", () => {
                for (const c of a.o.map(d => d.get(T).el)) c.style.filter = "";
                a.o = []
            })
    }

    function Tk(a, b) {
        return m(function* () {
            for (var c of a.g.tiles) {
                var d = Ak(c.id, new D(c.pos.x, c.pos.y), a.tileSize.V()),
                    e = d.get(Y);
                a.tiles.set(e.id, d);
                Rk(a, d, a.u)
            }
            for (const [l, p] of Object.entries(a.g.neighbors)) {
                c = l;
                d = p.map(x => a.tiles.get(x));
                a.neighbors.set(c, d);
                c = a.tiles.get(c);
                for (var f of d) d = Kk(c, f), lj && c === f && console.error(`Tile loop: ${c.get(Y).id}`), a.i.has(d) || (e = Lk(c, f), a.i.set(d, e), Rk(a, e, a.H))
            }
            const g = a.j.find(Nk).map(l => l.get(Nk).Dc),
                h = a.j.find(Y, T).map(l => l.get(T).el);
            f = [...g, ...h];
            for (const l of f) l.style.opacity =
                "0";
            Sk(a);
            yield O(new n([new n([new v(200, 0, 1, l => {
                for (const p of h) p.style.opacity = `${l}`
            }), new v(200, 0, 1, l => {
                for (const p of g) p.style.opacity = `${l}`
            })])]), b)
        })
    }

    function Uk(a, b) {
        return a.i.get(b)
    }

    function Vk(a) {
        return new D(a.g.cardSize, a.g.cardSize)
    }

    function Wk(a) {
        return new D(a.g.cardExpandedSize, a.g.cardExpandedSize)
    }

    function Xk(a, b, c, d) {
        return m(function* () {
            b.get(Y).T = c;
            c.get(W).ya = b;
            S(R(), w.Gd);
            const e = new mk(c, {
                pos: b.get(E).position,
                size: new D(a.g.cardSize, a.g.cardSize),
                Ya: 0
            }, 700);
            yield O(e, d)
        })
    }

    function Yk(a) {
        a = a.get(Y);
        if (a.T) {
            var b = a.T;
            a.T = void 0;
            b.get(W).ya = void 0;
            return b
        }
    }
    var Zk = class {
        constructor(a, b, c, d) {
            this.g = a;
            this.u = b;
            this.H = c;
            this.j = d;
            this.neighbors = new Map;
            this.tiles = new Map;
            this.i = new Map;
            this.o = [];
            this.tileSize = new D(this.g.tileSize, this.g.tileSize)
        }
    };
    var $k = {
        id: "board3x3",
        tiles: [{
            id: "0",
            pos: {
                x: 174,
                y: 396
            }
        }, {
            id: "1",
            pos: {
                x: 270,
                y: 396
            }
        }, {
            id: "2",
            pos: {
                x: 366,
                y: 396
            }
        }, {
            id: "3",
            pos: {
                x: 174,
                y: 492
            }
        }, {
            id: "4",
            pos: {
                x: 270,
                y: 492
            }
        }, {
            id: "5",
            pos: {
                x: 366,
                y: 492
            }
        }, {
            id: "6",
            pos: {
                x: 174,
                y: 588
            }
        }, {
            id: "7",
            pos: {
                x: 270,
                y: 588
            }
        }, {
            id: "8",
            pos: {
                x: 366,
                y: 588
            }
        }],
        neighbors: {
            0: ["1", "3"],
            1: ["0", "2", "4"],
            2: ["1", "5"],
            3: ["0", "4", "6"],
            4: ["1", "3", "5", "7"],
            5: ["2", "4", "8"],
            6: ["3", "7"],
            7: ["4", "6", "8"],
            8: ["5", "7"]
        },
        cardSize: 74,
        cardExpandedSize: 84,
        tileSize: 50
    },
        al = [$k, {
            id: "rows3x4",
            tiles: [{
                id: "0",
                pos: {
                    x: 122,
                    y: 376
                }
            }, {
                id: "1",
                pos: {
                    x: 221,
                    y: 376
                }
            }, {
                id: "2",
                pos: {
                    x: 320,
                    y: 376
                }
            }, {
                id: "3",
                pos: {
                    x: 418,
                    y: 376
                }
            }, {
                id: "4",
                pos: {
                    x: 122,
                    y: 487
                }
            }, {
                id: "5",
                pos: {
                    x: 221,
                    y: 487
                }
            }, {
                id: "6",
                pos: {
                    x: 320,
                    y: 487
                }
            }, {
                id: "7",
                pos: {
                    x: 418,
                    y: 487
                }
            }, {
                id: "8",
                pos: {
                    x: 122,
                    y: 598
                }
            }, {
                id: "9",
                pos: {
                    x: 221,
                    y: 598
                }
            }, {
                id: "10",
                pos: {
                    x: 320,
                    y: 598
                }
            }, {
                id: "11",
                pos: {
                    x: 418,
                    y: 598
                }
            }],
            neighbors: {
                0: ["1"],
                1: ["0", "2"],
                2: ["1", "3"],
                3: ["2"],
                4: ["5"],
                5: ["4", "6"],
                6: ["5", "7"],
                7: ["6"],
                8: ["9"],
                9: ["8", "10"],
                10: ["9", "11"],
                11: ["10"]
            },
            cardSize: 74,
            cardExpandedSize: 84,
            tileSize: 50
        }, {
                id: "squares",
                tiles: [{
                    id: "0",
                    pos: {
                        x: 136,
                        y: 356
                    }
                }, {
                    id: "1",
                    pos: {
                        x: 222,
                        y: 356
                    }
                }, {
                    id: "2",
                    pos: {
                        x: 328,
                        y: 356
                    }
                }, {
                    id: "3",
                    pos: {
                        x: 414,
                        y: 356
                    }
                }, {
                    id: "4",
                    pos: {
                        x: 136,
                        y: 442
                    }
                }, {
                    id: "5",
                    pos: {
                        x: 222,
                        y: 442
                    }
                }, {
                    id: "6",
                    pos: {
                        x: 328,
                        y: 442
                    }
                }, {
                    id: "7",
                    pos: {
                        x: 414,
                        y: 442
                    }
                }, {
                    id: "8",
                    pos: {
                        x: 136,
                        y: 543
                    }
                }, {
                    id: "9",
                    pos: {
                        x: 222,
                        y: 543
                    }
                }, {
                    id: "10",
                    pos: {
                        x: 328,
                        y: 543
                    }
                }, {
                    id: "11",
                    pos: {
                        x: 414,
                        y: 543
                    }
                }, {
                    id: "12",
                    pos: {
                        x: 136,
                        y: 629
                    }
                }, {
                    id: "13",
                    pos: {
                        x: 222,
                        y: 629
                    }
                }, {
                    id: "14",
                    pos: {
                        x: 328,
                        y: 629
                    }
                }, {
                    id: "15",
                    pos: {
                        x: 414,
                        y: 629
                    }
                }],
                neighbors: {
                    0: ["1", "4"],
                    1: ["0", "5"],
                    2: ["3", "6"],
                    3: ["2", "7"],
                    4: ["0", "5"],
                    5: ["4", "1"],
                    6: ["2", "7"],
                    7: ["3", "6"],
                    8: ["9", "12"],
                    9: ["8", "13"],
                    10: ["11", "14"],
                    11: ["10", "15"],
                    12: ["8", "13"],
                    13: ["9", "12"],
                    14: ["10", "15"],
                    15: ["11", "14"]
                },
                cardSize: 65,
                cardExpandedSize: 75,
                tileSize: 50
            }],
        bl = {
            id: "board3x4",
            tiles: [{
                id: "0",
                pos: {
                    x: 122,
                    y: 376
                }
            }, {
                id: "1",
                pos: {
                    x: 221,
                    y: 376
                }
            }, {
                id: "2",
                pos: {
                    x: 320,
                    y: 376
                }
            }, {
                id: "3",
                pos: {
                    x: 418,
                    y: 376
                }
            }, {
                id: "4",
                pos: {
                    x: 122,
                    y: 487
                }
            }, {
                id: "5",
                pos: {
                    x: 221,
                    y: 487
                }
            }, {
                id: "6",
                pos: {
                    x: 320,
                    y: 487
                }
            }, {
                id: "7",
                pos: {
                    x: 418,
                    y: 487
                }
            }, {
                id: "8",
                pos: {
                    x: 122,
                    y: 598
                }
            }, {
                id: "9",
                pos: {
                    x: 221,
                    y: 598
                }
            },
            {
                id: "10",
                pos: {
                    x: 320,
                    y: 598
                }
            }, {
                id: "11",
                pos: {
                    x: 418,
                    y: 598
                }
            }
            ],
            neighbors: {
                0: ["1", "4"],
                1: ["0", "2", "5"],
                2: ["1", "3", "6"],
                3: ["2", "7"],
                4: ["0", "5", "8"],
                5: ["1", "4", "6", "9"],
                6: ["2", "5", "7", "10"],
                7: ["3", "6", "11"],
                8: ["4", "9"],
                9: ["5", "8", "10"],
                10: ["6", "9", "11"],
                11: ["7", "10"]
            },
            cardSize: 74,
            cardExpandedSize: 84,
            tileSize: 50
        },
        cl = [bl, {
            id: "board4x4",
            tiles: [{
                id: "0",
                pos: {
                    x: 136,
                    y: 356
                }
            }, {
                id: "1",
                pos: {
                    x: 227,
                    y: 356
                }
            }, {
                id: "2",
                pos: {
                    x: 318,
                    y: 356
                }
            }, {
                id: "3",
                pos: {
                    x: 409,
                    y: 356
                }
            }, {
                id: "4",
                pos: {
                    x: 136,
                    y: 447
                }
            }, {
                id: "5",
                pos: {
                    x: 227,
                    y: 447
                }
            }, {
                id: "6",
                pos: {
                    x: 318,
                    y: 447
                }
            }, {
                id: "7",
                pos: {
                    x: 409,
                    y: 447
                }
            }, {
                id: "8",
                pos: {
                    x: 136,
                    y: 538
                }
            }, {
                id: "9",
                pos: {
                    x: 227,
                    y: 538
                }
            }, {
                id: "10",
                pos: {
                    x: 318,
                    y: 538
                }
            }, {
                id: "11",
                pos: {
                    x: 409,
                    y: 538
                }
            }, {
                id: "12",
                pos: {
                    x: 136,
                    y: 629
                }
            }, {
                id: "13",
                pos: {
                    x: 227,
                    y: 629
                }
            }, {
                id: "14",
                pos: {
                    x: 318,
                    y: 629
                }
            }, {
                id: "15",
                pos: {
                    x: 409,
                    y: 629
                }
            }],
            neighbors: {
                0: ["1", "4"],
                1: ["0", "2", "5"],
                2: ["1", "3", "6"],
                3: ["2", "7"],
                4: ["0", "5", "8"],
                5: ["1", "4", "6", "9"],
                6: ["2", "5", "7", "10"],
                7: ["3", "6", "11"],
                8: ["4", "9", "12"],
                9: ["5", "8", "10", "13"],
                10: ["6", "9", "11", "14"],
                11: ["7", "10", "15"],
                12: ["8", "13"],
                13: ["9", "12", "14"],
                14: ["10", "13", "15"],
                15: ["11", "14"]
            },
            cardSize: 65,
            cardExpandedSize: 75,
            tileSize: 50
        }, {
                id: "rings",
                tiles: [{
                    id: "0",
                    pos: {
                        x: 136,
                        y: 356
                    }
                }, {
                    id: "1",
                    pos: {
                        x: 227,
                        y: 356
                    }
                }, {
                    id: "2",
                    pos: {
                        x: 318,
                        y: 356
                    }
                }, {
                    id: "3",
                    pos: {
                        x: 409,
                        y: 356
                    }
                }, {
                    id: "4",
                    pos: {
                        x: 136,
                        y: 447
                    }
                }, {
                    id: "5",
                    pos: {
                        x: 227,
                        y: 447
                    }
                }, {
                    id: "6",
                    pos: {
                        x: 318,
                        y: 447
                    }
                }, {
                    id: "7",
                    pos: {
                        x: 409,
                        y: 447
                    }
                }, {
                    id: "8",
                    pos: {
                        x: 136,
                        y: 538
                    }
                }, {
                    id: "9",
                    pos: {
                        x: 227,
                        y: 538
                    }
                }, {
                    id: "10",
                    pos: {
                        x: 318,
                        y: 538
                    }
                }, {
                    id: "11",
                    pos: {
                        x: 409,
                        y: 538
                    }
                }, {
                    id: "12",
                    pos: {
                        x: 136,
                        y: 629
                    }
                }, {
                    id: "13",
                    pos: {
                        x: 227,
                        y: 629
                    }
                },
                {
                    id: "14",
                    pos: {
                        x: 318,
                        y: 629
                    }
                }, {
                    id: "15",
                    pos: {
                        x: 409,
                        y: 629
                    }
                }
                ],
                neighbors: {
                    0: ["1", "4"],
                    1: ["0", "2"],
                    2: ["1", "3"],
                    3: ["2", "7"],
                    4: ["0", "8"],
                    5: ["6", "9"],
                    6: ["5", "10"],
                    7: ["3", "11"],
                    8: ["4", "12"],
                    9: ["5", "10"],
                    10: ["6", "9"],
                    11: ["7", "15"],
                    12: ["8", "13"],
                    13: ["12", "14"],
                    14: ["13", "15"],
                    15: ["11", "14"]
                },
                cardSize: 65,
                cardExpandedSize: 75,
                tileSize: 50
            }, {
                id: "connected_rings",
                tiles: [{
                    id: "0",
                    pos: {
                        x: 136,
                        y: 356
                    }
                }, {
                    id: "1",
                    pos: {
                        x: 227,
                        y: 356
                    }
                }, {
                    id: "2",
                    pos: {
                        x: 318,
                        y: 356
                    }
                }, {
                    id: "3",
                    pos: {
                        x: 409,
                        y: 356
                    }
                }, {
                    id: "4",
                    pos: {
                        x: 136,
                        y: 447
                    }
                }, {
                    id: "5",
                    pos: {
                        x: 227,
                        y: 447
                    }
                }, {
                    id: "6",
                    pos: {
                        x: 318,
                        y: 447
                    }
                }, {
                    id: "7",
                    pos: {
                        x: 409,
                        y: 447
                    }
                }, {
                    id: "8",
                    pos: {
                        x: 136,
                        y: 538
                    }
                }, {
                    id: "9",
                    pos: {
                        x: 227,
                        y: 538
                    }
                }, {
                    id: "10",
                    pos: {
                        x: 318,
                        y: 538
                    }
                }, {
                    id: "11",
                    pos: {
                        x: 409,
                        y: 538
                    }
                }, {
                    id: "12",
                    pos: {
                        x: 136,
                        y: 629
                    }
                }, {
                    id: "13",
                    pos: {
                        x: 227,
                        y: 629
                    }
                }, {
                    id: "14",
                    pos: {
                        x: 318,
                        y: 629
                    }
                }, {
                    id: "15",
                    pos: {
                        x: 409,
                        y: 629
                    }
                }],
                neighbors: {
                    0: ["1", "4", "5"],
                    1: ["0", "2"],
                    2: ["1", "3"],
                    3: ["2", "6", "7"],
                    4: ["0", "8"],
                    5: ["0", "6", "9"],
                    6: ["3", "5", "10"],
                    7: ["3", "11"],
                    8: ["4", "12"],
                    9: ["5", "10", "12"],
                    10: ["6", "9", "15"],
                    11: ["7", "15"],
                    12: ["8", "9", "13"],
                    13: ["12", "14"],
                    14: ["13", "15"],
                    15: ["10", "11", "14"]
                },
                cardSize: 65,
                cardExpandedSize: 75,
                tileSize: 50
            }, {
                id: "center_ring",
                tiles: [{
                    id: "0",
                    pos: {
                        x: 136,
                        y: 356
                    }
                }, {
                    id: "1",
                    pos: {
                        x: 227,
                        y: 356
                    }
                }, {
                    id: "2",
                    pos: {
                        x: 318,
                        y: 356
                    }
                }, {
                    id: "3",
                    pos: {
                        x: 409,
                        y: 356
                    }
                }, {
                    id: "4",
                    pos: {
                        x: 136,
                        y: 447
                    }
                }, {
                    id: "5",
                    pos: {
                        x: 409,
                        y: 447
                    }
                }, {
                    id: "6",
                    pos: {
                        x: 136,
                        y: 538
                    }
                }, {
                    id: "7",
                    pos: {
                        x: 409,
                        y: 538
                    }
                }, {
                    id: "8",
                    pos: {
                        x: 136,
                        y: 629
                    }
                }, {
                    id: "9",
                    pos: {
                        x: 227,
                        y: 629
                    }
                }, {
                    id: "10",
                    pos: {
                        x: 318,
                        y: 629
                    }
                }, {
                    id: "11",
                    pos: {
                        x: 409,
                        y: 629
                    }
                }, {
                    id: "12",
                    pos: {
                        x: 272,
                        y: 493
                    }
                }],
                neighbors: {
                    0: ["1", "4", "12"],
                    1: ["0", "2"],
                    2: ["1", "3"],
                    3: ["2", "5", "12"],
                    4: ["0", "6"],
                    5: ["3", "7"],
                    6: ["4", "8"],
                    7: ["5", "11"],
                    8: ["6", "9", "12"],
                    9: ["8", "10"],
                    10: ["9", "11"],
                    11: ["7", "10", "12"],
                    12: ["0", "3", "8", "11"]
                },
                cardSize: 65,
                cardExpandedSize: 75,
                tileSize: 50
            }],
        dl = {
            id: "plusSign",
            tiles: [{
                id: "0",
                pos: {
                    x: 227,
                    y: 356
                }
            }, {
                id: "1",
                pos: {
                    x: 318,
                    y: 356
                }
            }, {
                id: "2",
                pos: {
                    x: 136,
                    y: 447
                }
            }, {
                id: "3",
                pos: {
                    x: 227,
                    y: 447
                }
            }, {
                id: "4",
                pos: {
                    x: 318,
                    y: 447
                }
            }, {
                id: "5",
                pos: {
                    x: 409,
                    y: 447
                }
            }, {
                id: "6",
                pos: {
                    x: 136,
                    y: 538
                }
            }, {
                id: "7",
                pos: {
                    x: 227,
                    y: 538
                }
            }, {
                id: "8",
                pos: {
                    x: 318,
                    y: 538
                }
            }, {
                id: "9",
                pos: {
                    x: 409,
                    y: 538
                }
            },
            {
                id: "10",
                pos: {
                    x: 227,
                    y: 629
                }
            }, {
                id: "11",
                pos: {
                    x: 318,
                    y: 629
                }
            }
            ],
            neighbors: {
                0: ["1", "3"],
                1: ["0", "4"],
                2: ["3", "6"],
                3: ["0", "2", "4", "7"],
                4: ["1", "3", "5", "8"],
                5: ["4", "9"],
                6: ["2", "7"],
                7: ["3", "6", "8", "10"],
                8: ["4", "7", "9", "11"],
                9: ["5", "8"],
                10: ["7", "11"],
                11: ["8", "10"]
            },
            cardSize: 65,
            cardExpandedSize: 75,
            tileSize: 50
        },
        el = [{
            id: "board4x5",
            tiles: [{
                id: "0",
                pos: {
                    x: 91,
                    y: 356
                }
            }, {
                id: "1",
                pos: {
                    x: 182,
                    y: 356
                }
            }, {
                id: "2",
                pos: {
                    x: 273,
                    y: 356
                }
            }, {
                id: "3",
                pos: {
                    x: 364,
                    y: 356
                }
            }, {
                id: "4",
                pos: {
                    x: 455,
                    y: 356
                }
            }, {
                id: "5",
                pos: {
                    x: 91,
                    y: 447
                }
            }, {
                id: "6",
                pos: {
                    x: 182,
                    y: 447
                }
            }, {
                id: "7",
                pos: {
                    x: 273,
                    y: 447
                }
            }, {
                id: "8",
                pos: {
                    x: 364,
                    y: 447
                }
            }, {
                id: "9",
                pos: {
                    x: 455,
                    y: 447
                }
            }, {
                id: "10",
                pos: {
                    x: 91,
                    y: 538
                }
            }, {
                id: "11",
                pos: {
                    x: 182,
                    y: 538
                }
            }, {
                id: "12",
                pos: {
                    x: 273,
                    y: 538
                }
            }, {
                id: "13",
                pos: {
                    x: 364,
                    y: 538
                }
            }, {
                id: "14",
                pos: {
                    x: 455,
                    y: 538
                }
            }, {
                id: "15",
                pos: {
                    x: 91,
                    y: 629
                }
            }, {
                id: "16",
                pos: {
                    x: 182,
                    y: 629
                }
            }, {
                id: "17",
                pos: {
                    x: 273,
                    y: 629
                }
            }, {
                id: "18",
                pos: {
                    x: 364,
                    y: 629
                }
            }, {
                id: "19",
                pos: {
                    x: 455,
                    y: 629
                }
            }],
            neighbors: {
                0: ["1", "5"],
                1: ["0", "2", "6"],
                2: ["1", "3", "7"],
                3: ["2", "4", "8"],
                4: ["3", "9"],
                5: ["0", "6", "10"],
                6: ["1", "5", "7", "11"],
                7: ["2", "6", "8",
                    "12"
                ],
                8: ["3", "7", "9", "13"],
                9: ["4", "8", "14"],
                10: ["5", "11", "15"],
                11: ["6", "10", "12", "16"],
                12: ["7", "11", "13", "17"],
                13: ["8", "12", "14", "18"],
                14: ["9", "13", "19"],
                15: ["10", "16"],
                16: ["11", "15", "17"],
                17: ["12", "16", "18"],
                18: ["13", "17", "19"],
                19: ["14", "18"]
            },
            cardSize: 65,
            cardExpandedSize: 75,
            tileSize: 50
        }, {
            id: "outer_ring",
            tiles: [{
                id: "0",
                pos: {
                    x: 182,
                    y: 356
                }
            }, {
                id: "1",
                pos: {
                    x: 273,
                    y: 356
                }
            }, {
                id: "2",
                pos: {
                    x: 364,
                    y: 356
                }
            }, {
                id: "3",
                pos: {
                    x: 182,
                    y: 447
                }
            }, {
                id: "4",
                pos: {
                    x: 364,
                    y: 447
                }
            }, {
                id: "5",
                pos: {
                    x: 182,
                    y: 538
                }
            }, {
                id: "6",
                pos: {
                    x: 364,
                    y: 538
                }
            },
            {
                id: "7",
                pos: {
                    x: 182,
                    y: 629
                }
            }, {
                id: "8",
                pos: {
                    x: 273,
                    y: 629
                }
            }, {
                id: "9",
                pos: {
                    x: 364,
                    y: 629
                }
            }, {
                id: "10",
                pos: {
                    x: 91,
                    y: 403
                }
            }, {
                id: "11",
                pos: {
                    x: 91,
                    y: 494
                }
            }, {
                id: "12",
                pos: {
                    x: 91,
                    y: 585
                }
            }, {
                id: "13",
                pos: {
                    x: 455,
                    y: 403
                }
            }, {
                id: "14",
                pos: {
                    x: 455,
                    y: 494
                }
            }, {
                id: "15",
                pos: {
                    x: 455,
                    y: 585
                }
            }
            ],
            neighbors: {
                0: ["1", "3", "10"],
                1: ["0", "2"],
                2: ["1", "4", "13"],
                3: ["0", "5", "11"],
                4: ["2", "6", "14"],
                5: ["3", "7", "11"],
                6: ["4", "9", "14"],
                7: ["5", "8", "12"],
                8: ["7", "9"],
                9: ["6", "8", "15"],
                10: ["0", "11"],
                11: ["3", "5", "10", "12"],
                12: ["7", "11"],
                13: ["2", "14"],
                14: ["4", "6", "13", "15"],
                15: ["9", "14"]
            },
            cardSize: 65,
            cardExpandedSize: 75,
            tileSize: 50
        }, {
            id: "bow",
            tiles: [{
                id: "0",
                pos: {
                    x: 89,
                    y: 356
                }
            }, {
                id: "1",
                pos: {
                    x: 455,
                    y: 356
                }
            }, {
                id: "2",
                pos: {
                    x: 182,
                    y: 402
                }
            }, {
                id: "3",
                pos: {
                    x: 364,
                    y: 402
                }
            }, {
                id: "4",
                pos: {
                    x: 89,
                    y: 447
                }
            }, {
                id: "5",
                pos: {
                    x: 455,
                    y: 447
                }
            }, {
                id: "6",
                pos: {
                    x: 182,
                    y: 493
                }
            }, {
                id: "7",
                pos: {
                    x: 273,
                    y: 493
                }
            }, {
                id: "8",
                pos: {
                    x: 364,
                    y: 493
                }
            }, {
                id: "9",
                pos: {
                    x: 89,
                    y: 538
                }
            }, {
                id: "10",
                pos: {
                    x: 455,
                    y: 538
                }
            }, {
                id: "11",
                pos: {
                    x: 182,
                    y: 584
                }
            }, {
                id: "12",
                pos: {
                    x: 364,
                    y: 584
                }
            }, {
                id: "13",
                pos: {
                    x: 89,
                    y: 629
                }
            }, {
                id: "14",
                pos: {
                    x: 455,
                    y: 629
                }
            }],
            neighbors: {
                0: ["2",
                    "4"
                ],
                1: ["3", "5"],
                2: ["0", "4", "7"],
                3: ["1", "5", "7"],
                4: ["0", "2", "6", "9"],
                5: ["1", "3", "8", "10"],
                6: ["4", "9", "7"],
                7: "2 3 6 8 11 12".split(" "),
                8: ["5", "7", "10"],
                9: ["4", "6", "11", "13"],
                10: ["5", "8", "12", "14"],
                11: ["7", "9", "13"],
                12: ["7", "10", "14"],
                13: ["9", "11"],
                14: ["10", "12"]
            },
            cardSize: 65,
            cardExpandedSize: 75,
            tileSize: 50
        }];
    const fl = qf(),
        gl = new D(200, 200);

    function hl(a, b, c = 0) {
        a.i = !0;
        a.va.style.marginTop = `${c}px`;
        c = b.Ga;
        var d = document.createElement("div");
        d.style.position = "absolute";
        d.style.userSelect = "none";
        d.style.MozUserSelect = "none";
        d.style.webkitUserSelect = "none";
        d.style.webkitUserSelect = "none";
        d.style.webkitTapHighlightColor = "rgba(0,0,0,0)";
        d.unselectable = "on";
        var e = c[3];
        let f = c[4];
        const g = c[5] || 1;
        g && g !== 1 && fl.i[lf(c)] && (e = Math.floor(e / g), f = Math.floor(f / g));
        d.style.width = `${e}px`;
        d.style.height = `${f}px`;
        d = [d, zi(fl, c), yi(fl, c)];
        c = d[0];
        e = d[2];
        c.style.background =
            d[1];
        e && (c.style.backgroundSize = e);
        for (; a.g.lastChild;) a.g.lastChild.remove();
        a.g.appendChild(c);
        d = fl.getSize(b.Ga);
        d = new D(gl.x / d.width, gl.y / d.height);
        c.style.transform = `scale(${d.x}, ${d.y})`;
        b = Mj[b.id];
        a.o.innerText = U(b.title);
        a.j.innerText = U(b.description);
        J(a.o, 45, 400, 45, 30);
        J(a.H, 35, 400, 35, 25);
        J(a.j.parentElement, 26, 400, 180, 15);
        a.Fb && J(a.Fb, 26, 400, 52, 15);
        for (const h of a.buttons) J(h, 26, 180, 60, 15);
        return a.u ? O(cj(a.va), a.actions) : aj(a.va, a.actions, 500)
    }

    function il(a) {
        return m(function* () {
            yield a.u ? O(dj(a.va), a.actions) : bj(a.va, a.actions, 500);
            for (a.va.style.marginTop = "0px"; a.g.lastChild;) a.g.lastChild.remove();
            a.i = !1
        })
    }

    function jl(a, b) {
        return a.buttons.find(c => c.dataset.id === b)
    }
    var kl = class {
        constructor(a, b, c, d = !0) {
            this.actions = c;
            this.u = d;
            this.i = !1;
            this.va = N(Yj, {
                Ue: U("win_subtitle"),
                Fb: b === 0 ? U("wildcard_warning") : "",
                buttons: b === 0 ? new Map([
                    ["play", U("play")],
                    ["cancel", U("cancel")]
                ]) : new Map([
                    ["continue", U("continue")]
                ])
            });
            this.g = this.va.querySelector(".ddl-card-modal-card-container");
            this.o = this.va.querySelector(".ddl-card-modal-card-title");
            this.H = this.va.querySelector(".ddl-card-modal-card-subtitle");
            this.j = this.va.querySelector(".ddl-card-modal-card-description");
            this.Fb =
                this.va.querySelector(".ddl-card-modal-buttons-title");
            this.buttons = Array.from(this.va.querySelectorAll(".ddl-card-modal-button"));
            a.appendChild(this.va)
        }
    };
    var ml = class {
        constructor(a, b) {
            this.g = a;
            this.i = b
        }
        create() {
            const a = this.i ? void 0 : this.g.ha.get(X).id;
            return this.g.U.map((b, c) => new n([new q(() => {
                if (a) {
                    var d = b.get(W).definition.id;
                    d = ll[d];
                    d = a === "player" ? d.Fa : d.Ea;
                    if (this.g.type === "pair") c === 0 && S(R(), d);
                    else if (this.g.type === "full_moon") {
                        const e = c * 160 * .75;
                        S(R(), d, e)
                    } else S(R(), d)
                }
                b.get(T).el.dataset.owner = a
            }), new r(160)]))
        }
    };
    const ll = {
        new_moon: {
            Fa: w.Bd,
            Ea: w.Uc
        },
        waxing_crescent: {
            Fa: w.rc,
            Ea: w.ac
        },
        first_quarter: {
            Fa: w.tc,
            Ea: w.bc
        },
        waxing_gibbous: {
            Fa: w.uc,
            Ea: w.hc
        },
        full_moon: {
            Fa: w.Cd,
            Ea: w.Vc
        },
        waning_gibbous: {
            Fa: w.uc,
            Ea: w.hc
        },
        third_quarter: {
            Fa: w.tc,
            Ea: w.bc
        },
        waning_crescent: {
            Fa: w.rc,
            Ea: w.ac
        }
    };

    function nl(a, b, c) {
        return (new ol(a, b, c)).create()
    }
    var ol = class {
        constructor(a, b, c) {
            this.g = a;
            this.i = b;
            this.j = c
        }
        create() {
            const a = new Set,
                b = this.g.ya.get(Y).id;
            var c = this.i.neighbors.get(b);
            for (var d of c) c = Kk(this.g.ya, d), c = Uk(this.i, c), c.get(Nk).type !== void 0 && a.add(c);
            d = Hk(this.j, this.g);
            for (const e of d)
                if (e.type === "run") {
                    d = e.tiles.findIndex(f => f.get(Y).id === b);
                    d = [e.tiles.slice(0, d), e.tiles.slice(d + 1, e.tiles.length)];
                    for (const f of d)
                        if (f.length < 3)
                            for (d = 0; d < f.length - 1; d++) c = Kk(f[d], f[d + 1]), c = Uk(this.i, c), c.get(Nk), a.add(c)
                }
            return new t([...Array.from(a.values()).map(e => {
                e.get(Nk);
                return pl(e)
            }), new n([new r(200), pl(this.g.T)])])
        }
    };

    function pl(a) {
        let b, c = new D(1, 1);
        if (a.i.get(W)) b = a.get(T).el, c = a.get(V).Aa;
        else if (a.get(Nk)) c = a.get(E).scale, b = a.get(Nk).yb;
        else throw Error("E");
        a = Number(window.getComputedStyle(b).opacity) || 0;
        b.style.filter = "drop-shadow(0 0 10px #fff) blur(0px)";
        return new t([new v(500, 0, 10, d => {
            b.style.filter = `drop-shadow(0 0 10px #fff) blur(${d}px)`
        }), new Ye(500, c.V(), af(c.V(), 1.05), c), u(new v(500, a, 0, d => {
            b.style.opacity = `${d}`
        }), Ea(.55, 0, 1, .45))])
    };

    function ql(a, b, c = 300) {
        return (new rl(a, b, c)).create()
    }
    var rl = class {
        constructor(a, b, c) {
            this.U = a;
            this.g = b;
            this.duration = c
        }
        create() {
            const a = this.U.map(b => b.get(V).Aa).map(b => new ya(() => new Ye(this.duration, b.V(), this.g, b)));
            return new t(a)
        }
    };

    function sl(a) {
        return L('<div class="' + M("ddl-container") + '">' + K(a) + "</div>")
    };

    function tl(a, b) {
        b = b === void 0 ? 32 : b;
        return L('<svg xmlns="http://www.w3.org/2000/svg" width="' + M(b) + '" height="' + M(b) + '" viewBox="0 0 32 32"><path class="' + M(a) + '" d="M16.844,2.156l3.641,10.308,10.922,0.28-8.672,6.65,3.11,10.481-9-6.2-9,6.2,3.109-10.481-8.672-6.65,10.922-.28Z"/></svg>')
    };

    function ul(a) {
        const b = a.width;
        a = a.height;
        return L(sl(L('<canvas class="' + M("ddl-match-canvas") + '" width="' + M(b) + '" height="' + M(a) + '"></canvas><svg xmlns="http://www.w3.org/2000/svg" class="' + M("ddl-match-svg-container") + '" viewBox="0 0 ' + M(b) + " " + M(a) + '"></svg><div class="' + M("ddl-match-dom-container") + '"><div class="' + M("ddl-match-tiles") + '"></div><div class="' + M("ddl-match-cards") + '"></div><div class="' + M("ddl-match-stars") + '"></div><div class="' + M("ddl-match-wildcards-dialog-container") + '"></div><div class="' +
            M("ddl-match-dialog-container") + '"></div></div>')))
    }

    function vl(a) {
        a = a.Wb;
        return L('<div class="' + M("ddl-player-score") + " " + (a ? M("ddl-score-alternate-font") : "") + '">' + wl(!0) + '<div class="' + M("ddl-score-text") + '">00</div>' + xl(!0) + "</div>")
    }

    function yl(a) {
        a = a.Wb;
        return L('<div class="' + M("ddl-moon-score") + " " + (a ? M("ddl-score-alternate-font") : "") + '">' + xl(!1) + '<div class="' + M("ddl-score-text") + '">00</div>' + wl(!1) + "</div>")
    }

    function zl(a) {
        const b = a.bottom;
        a = a.minHeight;
        return L('<div class="' + M("ddl-match-dialog") + '" style="bottom: ' + M(Yh(b)) + "px; min-height: " + M(Yh(a)) + 'px;"><div class="' + M("ddl-match-dialog-text") + '"></div></div>')
    }

    function Al(a) {
        return wl(a.ze, a.size)
    }

    function wl(a, b) {
        var c = b === void 0 ? 28 : b;
        b = L;
        a ? (a = '<div class="' + M("ddl-score-star") + '"><div class="' + M("ddl-light-star") + '">', c = L(tl("ddl-star-white", c === void 0 ? 32 : c)), c = a + c + "</div></div>") : (a = '<div class="' + M("ddl-score-star") + '"><div class="' + M("ddl-dark-star") + '">', c = L(tl("ddl-star-black", c === void 0 ? 32 : c)), c = a + c + "</div></div>");
        return b("<div>" + c + "</div>")
    }

    function xl(a) {
        return L('<div class="' + M("ddl-score-turn") + '">' + (a ? '<svg height="20" width="18" xmlns="http://www.w3.org/2000/svg"><polygon points="18,0 0,10 18,20" style="fill:#fff;"></polygon></svg>' : '<svg height="20" width="18" xmlns="http://www.w3.org/2000/svg"><polygon points="0,0 18,10 0,20" style="fill:#5e7cd2;"></polygon></svg>') + "</div>")
    }

    function Bl() {
        return L('<div class="ddl-match-debug-buttons"><button class="ddl-match-win-button">WIN</button><button class="ddl-match-lose-button">LOSE</button><button class="ddl-match-tie-button">TIE</button></div>')
    };

    function Cl(a, b) {
        const c = N(vl, {
            Wb: Qj
        });
        Dl(c, new El, "player", a, b)
    }

    function Fl(a, b) {
        const c = N(yl, {
            Wb: Qj
        });
        Dl(c, new Gl, "moon", a, b)
    }
    var Hl = class extends A {
        constructor(a, b, c) {
            super();
            this.Le = a;
            this.va = b;
            this.g = c;
            this.Na = this.Ua = 0
        }
    };

    function Il(a) {
        return Ue(a.find(Hl, El))
    }
    var El = class extends A { };

    function Jl(a) {
        return Ue(a.find(Hl, Gl))
    }
    var Gl = class extends A { };

    function Dl(a, b, c, d, e) {
        d.appendChild(a);
        const f = a.querySelector(".ddl-score-turn");
        var g = a.querySelector(".ddl-score-star").getBoundingClientRect();
        d = d.getBoundingClientRect();
        const h = new D(g.width / 2, g.height / 2);
        g = af(new D(g.x - d.x + h.x, g.y - d.y + h.y), 540 / d.width);
        !Number.isNaN(g.x) && Number.isNaN(g.y);
        a = new B(new Hl(c, a, f), new E(g), b);
        C(e, a)
    };
    const Kl = new D(20, 10),
        Ll = new D(.035, .035),
        Ml = new D(.3, .3);

    function Nl(a) {
        const b = a.U[0].get(V).Aa.x * Ml.x;
        return Ol(a, b).map(c => {
            const d = N(Al, {
                ze: a.ha.get(X).id === "player"
            });
            c = new E(c);
            const e = Vj(new D(b, b), new D(28, 28), c);
            return new B(c, new T(d, {
                pos: new D(-50, -50),
                Ib: "%"
            }), e)
        })
    }

    function Pl(a) {
        a.j.classList.remove("ddl-add-score-light")
    }

    function Ql(a, b) {
        var c = a.U[0].get(E).position;
        const d = c.V();
        c = c.V();
        for (let f = 0; f < a.U.length; f++) {
            var e = a.U[f];
            const g = e.get(E);
            e = af(e.get(V).Aa.V(), .5);
            d.x = Math.min(d.x, g.position.x - e.x);
            d.y = Math.min(d.y, g.position.y - e.y);
            c.x = Math.max(c.x, g.position.x + e.x);
            c.y = Math.max(c.y, g.position.y + e.y)
        }
        return new D((d.x + c.x) * .5, d.y + b)
    }

    function Ol(a, b) {
        if (a.H === 1) return a.U.map(e => {
            const f = e.get(E);
            e = e.get(V).Aa.x;
            e = -e * .5 + e * Ll.x + b * .5;
            return f.position.V().add(new D(e, e))
        });
        const c = Ql(a, -b * .5 - Kl.y);
        a = a.g.Cb;
        let d = c.x - (a * b + (a - 1) * Kl.x) * .5 + b * .5;
        return Array.from({
            length: a
        }).map(() => {
            const e = new D(d, c.y);
            d += b + Kl.x;
            return e
        })
    }
    var Sl = class {
        constructor(a, b, c, d, e, f, g, h, l) {
            this.U = a;
            this.H = b;
            this.g = c;
            this.ha = d;
            this.Ba = e;
            this.o = f;
            this.v = g;
            this.N = h;
            this.u = l;
            this.j = this.Ba.get(Hl).va;
            this.O = this.j.querySelector(".ddl-score-text");
            this.i = this.Ba.get(Hl).Ua
        }
        create() {
            return new ya(() => {
                const a = this.Ba.get(E).position;
                let b = 0;
                const c = Nl(this).map((d, e) => {
                    var f = d.get(E).position;
                    f = new n([new r(this.N + this.u * e), new q(() => {
                        C(this.o, d);
                        d.get(T).el.style.opacity = "0";
                        this.v.appendChild(d.get(T).el)
                    }), new t([new v(250, 0, 1, g => {
                        d.get(T).el.style.opacity =
                            `${g}`
                    }), new Ye(250, f.V().add(new D(0, 20)), f.V(), f)]), new r(350 + (this.U.length - 1 - e) * this.u), new r(b), new t([u(new Ye(500, f.V(), a.V(), f), Ea(.36, 0, .66, -.56)), u(new v(500, 0, 2 * Math.PI * (500 / 350), g => {
                        d.get(E).rotation = g
                    }), Ha), new n([new r(450), new v(50, 1, 0, g => {
                        d.get(T).el.style.opacity = `${g}`
                    })])]), new q(() => void Pl(this)), new q(() => {
                        const g = R(),
                            h = this.ha.get(X).id;
                        var l;
                        this.H === 1 ? l = this.U[e] : this.g && this.g.type === "pair" ? l = this.U[0] : this.g && this.g.type === "full_moon" && (l = this.U[e % 2]);
                        l && (l = l.get(W).definition.id,
                            l = Rl[l], S(g, h === "player" ? l.Fa : l.Ea));
                        this.j.classList.remove("ddl-add-score-light");
                        this.i += 1;
                        this.O.innerText = this.i <= 9 ? `0${this.i}` : `${this.i}`;
                        this.j.classList.add("ddl-add-score-light");
                        Re(this.o, d);
                        d.get(T).el.remove()
                    })]);
                    b += 200;
                    return f
                });
                return new t([...c, new q(() => void Pl(this))])
            })
        }
    };
    const Rl = {
        new_moon: {
            Fa: w.Ed,
            Ea: w.Zc
        },
        waxing_crescent: {
            Fa: w.wc,
            Ea: w.jc
        },
        first_quarter: {
            Fa: w.xc,
            Ea: w.kc
        },
        waxing_gibbous: {
            Fa: w.yc,
            Ea: w.lc
        },
        full_moon: {
            Fa: w.Fd,
            Ea: w.hd
        },
        waning_gibbous: {
            Fa: w.yc,
            Ea: w.lc
        },
        third_quarter: {
            Fa: w.xc,
            Ea: w.kc
        },
        waning_crescent: {
            Fa: w.wc,
            Ea: w.jc
        }
    };
    var Tl = class {
        constructor(a, b, c, d) {
            this.ha = a;
            this.g = b;
            this.i = c;
            this.j = d;
            const e = this.ha.get(X).id;
            this.U = this.g.find(W).filter(f => {
                f = f.get(W);
                return f.ya !== void 0 && f.tb && f.tb.get(X).id === e
            }).sort((f, g) => {
                f = f.get(E).position;
                g = g.get(E).position;
                const h = f.y - g.y;
                return Math.abs(h) >= .001 ? h : f.x - g.x
            })
        }
        create() {
            const a = this.ha.get(X).id === "player";
            var b = a ? Il(this.g) : Jl(this.g);
            if (this.U.length === 0) return new q(() => { });
            b = (new Sl(this.U, 1, void 0, this.ha, b, this.g, this.j, 0, 0)).create();
            return new n([new q(() => {
                S(R(), a ? w.Dd : w.Xc)
            }), ql(this.U, Wk(this.i)), new r(100), b, new r(100), ql(this.U, Vk(this.i))])
        }
    };

    function Ul(a = 750) {
        const b = document.querySelector(".ddl-doodle-fade");
        b.style.visibility = "visible";
        return Vl(b, 0, 1, a)
    }

    function Wl() {
        const a = document.querySelector(".ddl-doodle-fade");
        return Vl(a, 1, 0, 750).then(new q(() => {
            a.style.visibility = "hidden"
        }))
    }

    function Vl(a, b, c, d) {
        return new v(d, b, c, e => {
            a.style.opacity = `${e}`
        })
    };
    let Xl = 0,
        Yl = -1,
        Zl = !1;

    function $l(a, b) {
        b = new fk(b);
        a.i.push(b);
        return b
    }

    function am(a) {
        a = a.i.map(b => b.definition.id);
        Ch("ddl-unlocked_wildcards", a)
    }

    function bm(a) {
        const b = a.o.shift();
        if (b) {
            var c = $l(a, b);
            am(a);
            a = a.i.length;
            H("d7", b.id, !0);
            G.c = 15 + a - 1;
            I(1);
            return c
        }
    }
    var cm = class {
        constructor() {
            this.i = [];
            this.g = -1;
            this.j = this.Ja = this.u = this.Ba = 0;
            var a = Set;
            try {
                var b = Bh("ddl-unlocked_wildcards", [], Array.isArray)
            } catch (d) {
                b = []
            }
            const c = new a(b);
            this.o = Oj.filter(d => !c.has(d.id));
            for (const d of c.values()) (a = Lj[d]) && a.type === "legendary_wildcard" && $l(this, a);
            Sa(this.o)
        }
    };

    function dm(a, b, c) {
        const d = [];
        for (const e of b)
            for (b = 0; b < c; b++) d.push(em(a, e, a.cardSize));
        return d
    }

    function fm(a, b) {
        a.g.push(...dm(a, b, 1));
        Sa(a.g)
    }

    function em(a, b, c) {
        let d = a.i.get(b.id);
        d === void 0 ? d = 0 : d++;
        a.i.set(b.id, d);
        return ek(`${b.id}-${d}`, b, new ck, c)
    }
    var gm = class {
        constructor(a) {
            this.cardSize = a;
            this.i = new Map;
            this.g = []
        }
        j() {
            return this.g.shift()
        }
        Za() {
            return this.g.length === 0
        }
    },
        hm = class extends gm {
            constructor(a) {
                super(new D(a.cardSize, a.cardSize));
                this.g = dm(this, Nj, Math.ceil((a.tiles.length + 1) / 8));
                for (a = 0; a < 3; a++) Sa(this.g)
            }
        },
        im = class extends gm {
            constructor() {
                super(new D(84, 84))
            }
            j() { }
            Za() {
                return !1
            }
        };
    const jm = /\{(.*?)\}/g;

    function km(a, b) {
        {
            const e = [...b.matchAll(jm)];
            if (e.length === 0) var c = b;
            else {
                c = document.createDocumentFragment();
                var d = 0;
                for (const f of e) (d = b.substring(d, f.index)) && c.appendChild(document.createTextNode(d)), d = document.createElement("span"), d.classList.add("ddl-match-dialog-highlight"), d.appendChild(document.createTextNode(f[1])), c.appendChild(d), d = f.index + f[0].length;
                (b = b.substring(d)) && c.appendChild(document.createTextNode(b))
            }
        }
        if (c instanceof Node) {
            for (; a.g.lastChild;) a.g.removeChild(a.g.lastChild);
            a.g.appendChild(c)
        } else a.g.innerText =
            c;
        J(a.g, 28, 432, a.height, 20)
    }

    function lm(a, b, c) {
        return new v(300, b, c, d => {
            a.g.style.opacity = `${d}`
        })
    }

    function mm(a, b) {
        a.g.style.opacity = "0";
        a.i.appendChild(a.va);
        km(a, b);
        return new n([new t([cj(a.va), new n([new r(100), lm(a, 0, 1)])])])
    }

    function nm(a, b) {
        let c = Number.parseFloat(a.g.style.opacity);
        Number.isNaN(c) && (c = 1);
        return new n([lm(a, c, 0), new q(() => {
            km(a, b)
        }), new r(50), lm(a, 0, 1)])
    }

    function om(a) {
        return new n([new t([lm(a, 1, 0), dj(a.va)]), new q(() => {
            a.va.remove();
            km(a, "")
        })])
    }
    var pm = class {
        constructor(a) {
            this.i = a;
            this.bottom = 687;
            this.height = 110;
            this.va = N(zl, {
                bottom: this.bottom,
                minHeight: this.height
            });
            this.g = this.va.querySelector(".ddl-match-dialog-text")
        }
    };

    function qm(a) {
        const b = a.g.find(W).filter(c => c.get(W).ya !== void 0).map(c => c.get(W).tb);
        for (const c of [Il(a.g).get(Hl), Jl(a.g).get(Hl)]) c.Na = b.filter(d => d && d.get(X).id === c.Le).length
    }
    var rm = class {
        constructor(a) {
            this.g = a
        }
        update(a) {
            for (var b of a.U) b.get(W).tb = a.ha;
            qm(this);
            b = a.ha.get(X).id;
            ["player", "moon"].includes(b);
            b === "player" ? Il(this.g).get(Hl).Ua += a.Cb : b === "moon" && (Jl(this.g).get(Hl).Ua += a.Cb)
        }
    };

    function sm(a) {
        return {
            Ua: a.Ua,
            Na: a.Na,
            total: a.Ua + a.Na
        }
    };

    function tm(a) {
        return a[Math.floor(Math.random() * a.length)]
    }

    function um(a, b) {
        var c = 0;
        const d = Array(a.length);
        for (var e = 0; e < a.length; e++) {
            const f = b(a[e], e);
            c += f;
            d[e] = f
        }
        b = Math.random() * c;
        c = 0;
        for (e = 0; e < a.length; e++)
            if (c += d[e], c >= b) return a[e];
        return a[a.length - 1]
    }

    function vm(a, b, c) {
        return um(a, (d, e) => {
            d = c * c;
            return Math.pow(Math.E, Math.pow(e / a.length * 20 - 10 - b, 2) / (-2 * d)) / Math.sqrt(2 * Math.PI * d)
        })
    };
    const wm = [2, 4, 6, 8, 9, 10];

    function xm(a) {
        return m(function* () {
            var b = a.g.get(X).Qa.U,
                c = a.u.find(Y).filter(g => g.get(Y).T === void 0);
            const d = [];
            for (const g of b)
                for (const h of c) {
                    b = {
                        T: g,
                        ya: h,
                        ha: a.g
                    };
                    var e = g.get(W);
                    e.ya = h;
                    var f = Hk(a.o, b);
                    e.ya = void 0;
                    e = 0;
                    for (const l of f)
                        if (e += l.Cb, a.g.get(X).Eb)
                            for (const p of l.U) f = p.get(W).tb, f === void 0 ? e += 1 : f !== a.g && (e += 2);
                    d.push([b, e])
                }
            yield ki(1E3);
            Sa(d);
            c = d.sort((g, h) => g[1] - h[1]).map(g => g[0]);
            return vm(c, a.i, a.j)
        })
    }
    var zm = class {
        constructor(a, b, c, d, e) {
            this.u = a;
            this.g = b;
            this.o = c;
            e && d < 3 ? (this.i = 2, this.j = 1.6) : (this.i = e ? ym(d, -1) : ym(d), this.j = d < 18 + (e ? 3 : 0) ? 1.6 - d % 3 * .3 : 1);
            a = this.j;
            H("d11", this.i);
            H("d12", a);
            I(117)
        }
    };

    function ym(a, b = 0) {
        return wm[Math.min(Math.max(0, Math.floor(a / 3) + b), wm.length - 1)]
    };

    function Am(a, b, c) {
        a.H = b;
        for (const d of c) d.get(gk).set(d === b)
    }

    function Bm(a, b) {
        Uf(a.o);
        var c = Cm(a);
        for (const d of c) c = d.get(T).el, Tf(a.o, c, "click", () => {
            b.resolve({
                ya: d,
                T: a.H,
                ha: a.ha
            });
            d.get(Bk).set(!1)
        }), Tf(a.o, c, "mouseover", () => {
            d.get(Bk).set(!0)
        }), Tf(a.o, c, "mouseout", () => {
            d.get(Bk).set(!1)
        })
    }

    function Dm(a, b, c, d) {
        a.ka = !0;
        const e = c.pointerId,
            f = b.get(E),
            g = b.get(E).position.V(),
            h = g.V().sub(zh(c, a.j));
        b.get(T).el.classList.add("ddl-card-selected");
        let l = !1;
        Tf(a.v, a.j, "pointermove", p => {
            p = p.rb;
            if (e === p.pointerId) {
                p = zh(p, a.j).add(h);
                var x = Em(p, Cm(a));
                x ? (l || S(a.i, w.Nc), l = !0, $e(f.position, x.get(E).position)) : (l = !1, $e(f.position, p))
            }
        });
        Tf(a.v, a.j, ["pointerup", "pointercancel", "lostpointercapture"], p => {
            p = p.rb;
            e === p.pointerId && (a.ka = !1, p = zh(p, a.j).add(h), (p = Em(p, Cm(a))) ? d.resolve({
                ya: p,
                T: a.H,
                ha: a.ha
            }) :
                (Uf(a.v), Bm(a, d), p = new mk(b, {
                    pos: g,
                    size: b.get(V).Aa,
                    Ya: b.get(W).Ya
                }, 350), We(a.actions, p)))
        })
    }

    function Fm(a, b) {
        Uf(a.O);
        Uf(a.u);
        Uf(a.v);
        for (const c of [...b.U, ...b.g]) c.get(T).el.classList.remove("ddl-card-selectable");
        Uf(a.o)
    }

    function Gm(a) {
        return m(function* () {
            const b = If(),
                c = a.ha.get(X).Qa,
                d = [...c.U, ...c.g];
            var e = c.U.length;
            e > 0 && (Am(a, c.U[Math.ceil(e / 2) - 1], d), Bm(a, b));
            for (const g of c.U) e = g.get(T).el, e.classList.add("ddl-card-selectable"), Tf(a.O, e, "pointerdown", h => {
                a.ka || (S(a.i, w.Ad), Uf(a.o), Am(a, g, d), Dm(a, g, h.rb, b))
            });
            if (a.g)
                for (const g of c.g) {
                    if (!g.get(fk).Mb) {
                        var f = g.get(T).el;
                        f.classList.add("ddl-card-selectable");
                        Tf(a.O, f, "click", () => {
                            a.N || (a.H && a.H === g ? Hm(a, g, b) : (S(a.i, w.Kd), Am(a, g, d), Im(a, g, b)))
                        })
                    }
                } else
                for (f of c.g) f.get(hk).set(!1);
            f = yield b.promise;
            Fm(a, c);
            return f
        })
    }

    function Cm(a) {
        return a.ta.find(Y, T).filter(b => {
            b = b.get(Y);
            return b.T === void 0 && b.g
        })
    }

    function Hm(a, b, c) {
        m(function* () {
            S(a.i, w.nc);
            yield Jm(a, b);
            c.resolve({
                ya: new B,
                T: b,
                ha: a.ha
            })
        })
    }

    function Im(a, b, c) {
        m(function* () {
            a.N = !0;
            Km(a, !1);
            Uf(a.u);
            a.g.i && (yield il(a.g));
            var d = jl(a.g, "play");
            Tf(a.u, d, "click", () => {
                Hm(a, b, c)
            });
            d = jl(a.g, "cancel");
            Tf(a.u, d, "click", () => {
                S(a.i, w.Yb);
                Jm(a, b)
            });
            Tf(a.u, a.j, "click", e => {
                e.target === e.currentTarget && (S(a.i, w.Yb), Jm(a, b))
            });
            yield hl(a.g, b.get(W).definition, 30);
            a.N = !1
        })
    }

    function Km(a, b) {
        a = a.ha.get(X).Qa;
        for (const c of a.U) c.get(T).el.disabled = !b
    }

    function Jm(a, b) {
        return m(function* () {
            a.H = void 0;
            b.get(gk).set(!1);
            yield il(a.g);
            Uf(a.u);
            Km(a, !0)
        })
    }
    var Lm = class {
        constructor(a, b, c, d, e) {
            this.ta = a;
            this.ha = b;
            this.j = c;
            this.actions = d;
            this.g = e;
            this.O = new Rf;
            this.v = new Rf;
            this.u = new Rf;
            this.o = new Rf;
            this.i = R();
            this.N = this.ka = !1
        }
    };

    function Em(a, b) {
        for (const d of b) {
            var c = af(d.get(V).Aa.V(), .5);
            const e = d.get(E).position;
            b = e.V().sub(c);
            c = e.V().add(c);
            if (a.x >= b.x && a.x <= c.x && a.y >= b.y && a.y <= c.y) return d
        }
    };

    function Mm(a) {
        var b = [],
            c = a.g.U.map(g => g.get(W).ya);
        for (var d = 1; d < c.length; d++) {
            var e = c[d - 1],
                f = c[d];
            const g = Uk(a.j, Kk(e, f));
            b.push({
                connection: g,
                Ub: e,
                Vb: f
            })
        }
        c = new t(b.map(g => {
            const h = g.connection.get(Nk).yb;
            if (h && (g = Number.parseFloat(h.style.opacity), !Number.isNaN(g))) return new n([new v(100, g, 0, l => {
                h.style.opacity = `${l}`
            })])
        }).filter(g => g !== void 0));
        b = b.map(g => {
            var h = g.connection.get(Nk);
            Ok(h, a.g.type);
            const l = h.yb;
            if (h.type === "run") {
                h = g.Ub.get(E).position.V();
                g = g.Vb.get(E).position.V();
                l.style.opacity =
                    "1";
                h = g.sub(h);
                g = h.length() * .5;
                const p = bf(h);
                h = af(p.V(), -g);
                g = af(p.V(), g);
                l.setAttribute("x1", `${h.x}`);
                l.setAttribute("y1", `${h.y}`);
                l.setAttribute("x2", `${h.x}`);
                l.setAttribute("y2", `${h.y}`);
                return new t([new v(150, h.x, g.x, x => {
                    l.setAttribute("x2", `${x}`)
                }), new v(150, h.y, g.y, x => {
                    l.setAttribute("y2", `${x}`)
                })])
            }
            return new v(150, 0, 1, p => {
                l.style.opacity = `${p}`
            })
        });
        d = (new ml(a.g, !1)).create();
        e = [];
        for (f = 0; f < d.length - 1; f++) e.push(d[f]), e.push(b[f]);
        e.push(d[d.length - 1]);
        return new n([c, a.g.type === "run" ?
            new n(e) : new t(e)
        ])
    }
    var Pm = class {
        constructor(a, b, c, d, e) {
            this.g = a;
            this.j = b;
            this.o = c;
            this.u = d;
            this.i = e
        }
        create() {
            var a = this.g.ha.get(X).id === "player" ? Il(this.o) : Jl(this.o);
            a = (new Sl(this.g.U, this.g.type === "run" ? 1 : 0, this.g, this.g.ha, a, this.o, this.u, 100, this.g.type === "run" ? 310 : 0)).create();
            var b = n,
                c = new q(() => {
                    var h = R();
                    a: {
                        var l = this.g.ha.get(X).id === "player";
                        switch (this.g.type) {
                            case "pair":
                                l = l ? w.zd : w.Yc;
                                break a;
                            case "full_moon":
                                l = l ? w.ld : w.Wc;
                                break a;
                            case "run":
                                l = l ? Nm : Om;
                                l = l[Math.max(0, Math.min(this.g.U.length - 3, l.length -
                                    1))];
                                break a;
                            default:
                                jb(this.g.type, void 0)
                        }
                        l = void 0
                    }
                    S(h, l)
                }),
                d = ql(this.g.U, Wk(this.j), 300),
                e = [...(new ml(this.g, !0)).create()];
            if (this.i) {
                var f = this.i;
                a: switch (this.g.type) {
                    case "pair":
                        var g = U("gameplay_phasepair");
                        break a;
                    case "full_moon":
                        g = U("gameplay_fullmoonpair");
                        break a;
                    case "run":
                        g = U(`gameplay_lunarcycle_${this.g.U.length}`);
                        break a;
                    default:
                        throw Error("B`" + this.g.type);
                }
                f = [mm(f, g)]
            } else f = [];
            return new b([c, new t([d, ...e, ...f]), new r(600), new t([...(this.i ? [om(this.i)] : []), Mm(this), a]), ql(this.g.U,
                Vk(this.j), 200)])
        }
    };
    const Nm = [w.rd, w.ud, w.vd, w.wd, w.xd, w.yd],
        Om = [w.Oc, w.Pc, w.Qc, w.Rc, w.Sc, w.Tc];
    var Qm = class {
        constructor(a, b, c, d, e, f, g, h, l, p) {
            this.N = a;
            this.g = b;
            this.j = c;
            this.u = d;
            this.o = f;
            this.H = g;
            this.actions = h;
            this.v = l;
            this.ha = p;
            this.O = this.N.T.get(W).definition.id
        }
        execute() {
            const a = this;
            return m(function* () {
                const b = U(Mj[a.O].Db);
                yield O(mm(a.H, b), a.actions);
                yield P(2E3, a.actions);
                yield O(om(a.H), a.actions);
                yield a.i()
            })
        }
    };
    const Rm = new Map;

    function Sm(a, b) {
        Rm.has(a);
        Rm.set(a, b)
    }

    function Tm(a, b, c, d, e, f, g, h, l, p) {
        return m(function* () {
            const x = a.T.get(W).definition.id;
            yield (new (Rm.get(x))(a, b, c, d, e, f, g, h, l, p)).execute()
        })
    }
    class Um extends Qm {
        i() {
            const a = this;
            return m(function* () {
                a.v.get(X).Eb = !1
            })
        }
    }
    Sm("wildcard_scorpio", Um);
    class Vm extends Qm {
        i() {
            const a = this;
            return m(function* () {
                a.ha.get(X).Cc.Gc = 2
            })
        }
    }
    Sm("wildcard_super_moon", Vm);
    class Wm extends Qm {
        i() {
            const a = this;
            return m(function* () {
                var b = a.g.find(Y).filter(e => e.get(Y).T !== void 0);
                Sa(b);
                b = [b.pop(), b.pop()].filter(e => !!e);
                if (b.length !== 0) {
                    var c = [];
                    for (var d of b) {
                        const e = nl({
                            ya: d,
                            T: d.get(Y).T,
                            ha: a.ha
                        }, a.j, a.o);
                        c.push(e, new r(150))
                    }
                    yield O(new n(c), a.actions);
                    d = [];
                    for (const e of b) b = Yk(e), Re(a.g, b), b.get(T).el.remove(), d.push(b.get(W).definition);
                    fm(a.u, d)
                }
            })
        }
    }
    Sm("wildcard_leonids_meteor", Wm);
    class Xm extends Qm {
        i() {
            const a = this;
            return m(function* () {
                var b = a.g.find(Y).filter(d => {
                    d = d.get(Y);
                    let e = !1;
                    if (d.T) {
                        const f = d.T.get(W);
                        f.tb && (e = f.tb.get(X).id === "moon")
                    }
                    return d.T !== void 0 && e
                });
                if (b.length !== 0) {
                    var c = [];
                    for (const d of b) {
                        const e = nl({
                            ya: d,
                            T: d.get(Y).T,
                            ha: a.ha
                        }, a.j, a.o);
                        c.push(e, new r(150))
                    }
                    yield O(new t(c), a.actions);
                    c = [];
                    for (const d of b) b = Yk(d), Re(a.g, b), b.get(T).el.remove(), c.push(b.get(W).definition);
                    fm(a.u, c)
                }
            })
        }
    }
    Sm("wildcard_hunter_moon", Xm);

    function Ym(a, b, c = !0) {
        return m(function* () {
            const d = a.N.j(),
                e = b.get(X).Qa;
            d ? yield qk(e, d, a.actions, a.g, !0, c) : yield sk(e, a.actions)
        })
    }

    function Zm(a) {
        return m(function* () {
            const b = [];
            for (var c = 0; c < 2; c++) b.push(Promise.all([Ym(a, a.o, c === 0), Ym(a, a.j, !1)]));
            c = a.o.get(X).Qa;
            const d = new D(65, 65),
                e = a.ta.filter(g => !g.Mb).map(g => dk(g, d)),
                f = pk(e, c.Pa + c.cardSize.y + 20);
            for (let g = 0; g < e.length; g++) {
                const h = e[g];
                bk(h, f[g], d, 0, a.g, a.ka);
                c.g.push(h)
            }
            yield Promise.all([...b, ...e.map(g => aj(g.get(T).el, a.actions, 250))]);
            yield P(500, a.actions)
        })
    }

    function $m(a) {
        return m(function* () {
            Bh("ddl-has_seen_wildcard_tutorial", !1) || a.ta.length !== 1 || (Ch("ddl-has_seen_wildcard_tutorial", !0), yield O(mm(a.i, U("wildcardintro2")), a.actions), yield P(3500, a.actions), yield O(nm(a.i, U("wildcardintro3")), a.actions), yield P(3E3, a.actions), We(a.actions, om(a.i)))
        })
    }

    function an(a) {
        const b = a.g.find(Y).filter(d => d.get(Y).T === void 0).length === 0,
            c = a.j.get(X).Qa.Za() && a.N.Za();
        a = a.o.get(X).Qa.Za() && a.N.Za();
        return b || c && a
    }

    function bn(a, b) {
        return m(function* () {
            const c = b.get(X).id === "player" ? Il(a.g).get(Hl) : Jl(a.g).get(Hl);
            yield Ym(a, b);
            We(a.actions, cj(c.g))
        })
    }

    function cn(a, b) {
        return m(function* () {
            var c = b.get(X);
            if (c.id === "player") c = yield Gm(new Lm(a.g, b, a.H, a.actions, a.Oa));
            else if (c.id === "moon") c = yield xm(a.Ta);
            else throw Error("F");
            return c
        })
    }

    function dn(a, b) {
        return m(function* () {
            var c = Gj,
                d = b.T.get(W);
            if (d.type === "moon") {
                yield Xk(a.u, b.ya, b.T, a.actions);
                yield rk(b.ha.get(X).Qa, b.T);
                b.T.get(gk).set(!1);
                d = Hk(a.O, b);
                d.length > 0 && (b.ha === a.j ? xj(c, 2) : xj(c, 3));
                for (let g = 0; g < d.length; g++) {
                    const h = d[g];
                    var e = b.ha.get(X).id,
                        f = h.type;
                    H("d8", h.tiles.length, !0);
                    e = e === "player";
                    switch (f) {
                        case "pair":
                            I(e ? 111 : 114);
                            break;
                        case "full_moon":
                            I(e ? 112 : 115);
                            break;
                        case "run":
                            I(e ? 113 : 116);
                            break;
                        default:
                            jb(f, void 0)
                    }
                    g > 0 && (yield P(350, a.actions));
                    f = (new Pm(h, a.u,
                        a.g, a.v, a.i)).create();
                    yield O(f, a.actions);
                    a.state.update(h)
                }
                xj(c, 1);
                return !1
            }
            if (d.type === "wildcard" || d.type === "legendary_wildcard") return c = b.T.get(W).definition.id, H("d7", c, !0), I(110), b.T.get(fk).Mb = !0, b.T.get(hk).set(!1), yield Tm(b, a.g, a.u, a.N, a.state, a.O, a.i, a.actions, a.j, a.o), yield en(a), !0;
            throw Error("G`" + d.type);
        })
    }

    function fn(a, b) {
        return m(function* () {
            const c = b.get(X).id === "player" ? Il(a.g).get(Hl) : Jl(a.g).get(Hl);
            We(a.actions, dj(c.g));
            a.Da = (a.Da + 1) % 2;
            a.Ca++;
            H("d9", a.Ca)
        })
    }

    function gn(a) {
        return m(function* () {
            yield Tk(a.u, a.actions);
            yield Zm(a);
            for (yield $m(a); !an(a);) {
                var b = a.Ab[a.Da],
                    c = b.get(X).Qa;
                yield bn(a, b);
                for (var d = !0; d && !c.Za();) d = yield cn(a, b), d = yield dn(a, d);
                yield fn(a, b)
            }
            yield P(500, a.actions);
            yield O(mm(a.i, U("gameplay_bonuspoints")), a.actions);
            yield P(1500, a.actions);
            yield O(om(a.i), a.actions);
            b = a.state;
            b = {
                Ra: sm(Il(b.g).get(Hl)),
                Xa: sm(Jl(b.g).get(Hl))
            };
            a.j.get(X).Eb ? (c = (new Tl(a.j, a.g, a.u, a.v)).create(), yield O(c, a.actions), yield P(1E3, a.actions)) : (b.Xa.total -=
                b.Xa.Na, b.Xa.Na = 0);
            a.o.get(X).Eb ? (c = (new Tl(a.o, a.g, a.u, a.v)).create(), yield O(c, a.actions), yield P(1E3, a.actions)) : (b.Ra.total -= b.Ra.Na, b.Ra.Na = 0);
            c = b.Ra.total;
            d = b.Xa.total;
            return {
                Ba: b,
                result: c > d ? 0 : c < d ? 1 : 2,
                Ja: 0
            }
        })
    }

    function en(a) {
        return m(function* () {
            Bh("ddl-has_played_wildcard_tutorial", !1) || (Ch("ddl-has_played_wildcard_tutorial", !0), yield P(500, a.actions), yield O(mm(a.i, U("wildcard_finish")), a.actions), yield P(3E3, a.actions), We(a.actions, om(a.i)))
        })
    }
    var hn = class {
        constructor(a, b, c, d, e, f, g) {
            this.g = a;
            this.ta = c;
            this.H = d;
            this.actions = f;
            this.i = new pm(this.H.querySelector(".ddl-match-dialog-container"));
            this.Oa = new kl(this.H.querySelector(".ddl-match-wildcards-dialog-container"), 0, this.actions);
            this.state = new rm(this.g);
            this.Ca = this.Da = 0;
            this.ka = this.H.querySelector(".ddl-match-cards");
            this.v = this.H.querySelector(".ddl-match-stars");
            this.N = new hm(b);
            this.o = wk(this.ka);
            this.j = xk(this.ka);
            this.Ab = [this.o, this.j];
            this.u = new Zk(b, this.H.querySelector(".ddl-match-tiles"),
                e, this.g);
            this.O = new Jk(this.u);
            this.Ta = new zm(this.g, this.j, this.O, g, this.ta.length === 0)
        }
    };

    function jn(a, b = 0) {
        a.W.style.opacity = `${b}`;
        a.Da.appendChild(a.W)
    }

    function kn(a, b, c, d, e = 300) {
        return m(function* () {
            yield O(new v(e, c, d, f => {
                a.W.style.opacity = `${f}`
            }), b)
        })
    }

    function Z(a, b) {
        return a.W.querySelector(b)
    }

    function ln(a, b) {
        return typeof b === "string" ? Z(a, b) : b
    }
    var mn = class {
        constructor(a, b) {
            this.Da = a;
            this.W = b
        }
        update() { }
        play() {
            const a = this;
            return m(function* () {
                yield a.o();
                const b = yield a.H();
                yield a.u();
                return b
            })
        }
        u() {
            return Promise.resolve()
        }
    };
    var qn = class extends mn {
        constructor(a, b, c, d, e) {
            const f = N(ul, {
                width: 540,
                height: 960
            });
            super(a, f);
            this.N = b;
            this.ka = c;
            this.j = d;
            this.Oa = e;
            this.g = new Se;
            this.Ca = new B(new E, new gf);
            this.actions = new B(new Ve);
            this.O = !1;
            this.Ja = 0;
            this.v = R();
            this.W.appendChild(this.j.button);
            this.i = new hn(this.g, this.N, this.ka, Z(this, ".ddl-match-dom-container"), Z(this, ".ddl-match-svg-container"), this.actions, e);
            this.ta = nn[e % nn.length]
        }
        o() {
            const a = this;
            return m(function* () {
                var b = a.Oa,
                    c = a.N.id,
                    d = a.ka.length;
                Yl = b;
                H("d2", b);
                H("d3",
                    c);
                H("d9", 0);
                H("d10", d, !0);
                b === 0 && (H("d1", Xl), I(103), Xl === 0 ? (G.c = 13, I(1)) : Xl === 1 && (G.c = 14, I(1)), Xl++);
                b % 3 === 0 && I(104);
                I(105);
                G.c = 19 + 2 * b;
                I(1);
                qj(a.v, a.ta, 500);
                jn(a);
                C(a.g, a.Ca);
                C(a.g, a.actions);
                var e = Z(a, ".ddl-match-canvas").getContext("2d");
                b = new Xe(a.g);
                c = new tj(a.g);
                d = new yf(a.g);
                e = new xf(a.g, e);
                a.g.g = [new Wj(a.g), new Uj(a.g, Bk, gk, hk), b, c, d, e];
                b = a.i;
                C(b.g, b.o);
                C(b.g, b.j);
                Cl(b.v, b.g);
                Fl(b.v, b.g);
                a.O = !0;
                yield kn(a, a.actions, 0, 1)
            })
        }
        H() {
            const a = this;
            return m(function* () {
                if (mj) {
                    var b = Promise,
                        c = b.any,
                        d = gn(a.i),
                        e = a.W;
                    const f = If(),
                        g = N(Bl);
                    on(g, ".ddl-match-win-button", f, 0);
                    on(g, ".ddl-match-lose-button", f, 1);
                    on(g, ".ddl-match-tie-button", f, 2);
                    e.appendChild(g);
                    b = yield c.call(b, [d, f.promise]);
                    b.Ja = a.Ja;
                    return b
                }
                b = yield gn(a.i);
                b.Ja = a.Ja;
                return b
            })
        }
        update(a) {
            this.O && (this.g.update(a), this.Ja += a)
        }
        u() {
            const a = this;
            return m(function* () {
                a.j.j && (yield pn(a.j));
                rj(a.v, 2500);
                yield kn(a, a.actions, 1, 0, 1E3);
                a.W.remove()
            })
        }
    };
    const nn = [w.nd, w.od, w.qd];

    function on(a, b, c, d) {
        const e = () => {
            var f = c.resolve;
            let g = 0,
                h = 0;
            switch (d) {
                case 0:
                    g = 1E3;
                    h = 0;
                    break;
                case 1:
                    g = 0;
                    h = 1E3;
                    break;
                case 2:
                    h = g = 1E3;
                    break;
                default:
                    jb(d, void 0)
            }
            f.call(c, {
                result: d,
                Ba: {
                    Ra: {
                        Ua: g,
                        Na: g,
                        total: g * 2
                    },
                    Xa: {
                        Ua: h,
                        Na: h,
                        total: h * 2
                    }
                },
                Ja: 6E4
            });
            for (const l of a.querySelectorAll("button")) l.removeEventListener("click", e)
        };
        a.querySelector(b).addEventListener("click", e)
    };

    function rn(a) {
        const b = a.width;
        a = a.height;
        return L('<div><div class="' + M("ddl-outro-content") + '"></div><svg xmlns="http://www.w3.org/2000/svg" class="' + M("ddl-outro-svg-container") + '" viewBox="0 0 ' + M(b) + " " + M(a) + '"></svg><div class="' + M("ddl-outro-dialog") + '"></div></div>')
    }

    function sn() {
        return L('<canvas class="' + M("ddl-outro-canvas") + '"></canvas>')
    };
    qf();
    const tn = Ii[3] * .5,
        un = Ii[4] * .5,
        vn = new D(270, 675),
        wn = new D(vn.x, 292),
        xn = new D(20, 20);

    function yn(a) {
        const b = a.i.get(E),
            c = a.i.get(T).el;
        return O(new t([u(new v(6375, a.v.y, -407, d => {
            a.v.y = d;
            zn(a.g.g, a.v, a.N)
        }), Ka), new v(6375, a.N, 1.37, d => {
            a.N = d;
            zn(a.g.g, a.v, a.N)
        }), u(new Ye(6375, b.position.V(), new D(b.position.x, wn.y), b.position), Ka), new v(6375, 0, Math.PI, d => {
            b.rotation = d
        }), new n([new r(6075), new t([u(new v(300, 1, 1.6, d => {
            a.g.g.style.filter = `brightness(${d})`;
            c.style.filter = `brightness(${d})`
        }), Ea(.33, 1, .68, 1))])])]), a.actions)
    }

    function An(a) {
        return m(function* () {
            const b = a.i.get(E),
                c = a.i.get(V).Aa,
                d = a.i.get(T).el;
            yield O(new t([ej(b.position.V(), a.Oa, Ma, new D(0, 354 - wn.y)), new v(1800, 1.6, 1, e => {
                a.g.g.style.filter = `brightness(${e})`;
                d.style.filter = `brightness(${e})`
            }), u(new v(1800, Math.PI, 0, e => {
                b.rotation = e
            }), Ma), u(new v(1800, 180, 0, e => {
                ak(a.i, e)
            }), Ma), u(new Ye(1800, c.V(), new D(200, 200), c), Ma), u(new v(1800, b.position.y, 354, e => {
                b.position.y = e
            }), Ma)]), a.actions)
        })
    }

    function Bn(a) {
        return m(function* () {
            const b = a.i.get(W);
            return hl(a.ta, b.definition, 144)
        })
    }

    function Cn(a) {
        return m(function* () {
            const b = jl(a.ta, "continue");
            return new Promise(c => {
                const d = () => {
                    b.removeEventListener("click", d);
                    S(R(), w.wb);
                    c()
                };
                b.addEventListener("click", d)
            })
        })
    }
    var En = class extends mn {
        constructor(a, b) {
            var c = N(rn, {
                width: 540,
                height: 960
            });
            super(a, c);
            this.Ab = b;
            this.Ca = Z(this, ".ddl-outro-content");
            this.j = new Se;
            this.actions = new B(new Ve);
            this.i = dk(this.Ab, xn);
            this.ka = new B(new E(new D(tn, un), -Math.PI / 2), new F(uf(Ii), 0, 0, new D(-tn, -un)));
            this.O = new B(new E(new D(-80, 0), Math.PI / 2));
            this.v = new D(270 - tn, -320);
            this.N = 1.2;
            this.Oa = Z(this, ".ddl-outro-svg-container");
            a = this.ka;
            b = this.O;
            c = b.i.get(Oe);
            const d = b.g !== a.g;
            d && Ze(b);
            if (c && c.g !== a) {
                var e = b.i.get(Oe);
                e && (e = e.g.get(Pe).children,
                    e.splice(e.indexOf(b), 1))
            }
            c ? c.g = a : Ke(b, new Oe(a));
            (a.i.get(Pe) || Ke(a, new Pe)).children.push(b);
            d && a.g && C(a.g, b);
            this.g = new Dn(this.ka);
            this.Ca.appendChild(this.g.g);
            zn(this.g.g, this.v, this.N);
            this.g.g.style.opacity = "1";
            this.g.g.style.visibility = "visible";
            Zi(this.O, Yi(Si, 24, !1, !0, !0));
            bk(this.i, vn, xn, 180, this.j, this.Ca);
            a = this.i.get(T).el;
            a.style.visibility = "visible";
            a.style.opacity = "1";
            this.i.get(E).rotation = 0;
            this.ta = new kl(Z(this, ".ddl-outro-dialog"), 1, this.actions, !1)
        }
        o() {
            const a = this;
            return m(function* () {
                C(a.j,
                    a.actions);
                C(a.j, new B(new E, new gf));
                C(a.j, a.i);
                a.j.g = [new Wj(a.j), new tj(a.j), new Xe(a.j)];
                yield O(Ul(), a.actions);
                jn(a, 1);
                yield P(750, a.actions);
                a.Ta = yn(a);
                a.g.g.style.filter = "brightness(1.6)";
                const b = R();
                S(b, w.kd);
                qj(b, w.mc, 0, 6375);
                yield O(new t([Wl(), new n([new r(400), new v(500, 1.6, 1, c => {
                    a.g.g.style.filter = `brightness(${c})`
                })])]), a.actions)
            })
        }
        H() {
            const a = this;
            return m(function* () {
                yield a.Ta;
                yield An(a);
                var b = Promise,
                    c = b.all;
                var d = a.O.get(nf);
                d.j = !1;
                d = $i(d);
                yield c.call(b, [d, Bn(a)]);
                yield Cn(a)
            })
        }
        update(a) {
            this.j.update(a);
            this.g.update(a)
        }
        u() {
            const a = this;
            return m(function* () {
                yield O(Ul(), a.actions);
                a.W.remove();
                yield P(750, a.actions);
                yield O(Wl(), a.actions)
            })
        }
    };
    class Dn {
        constructor(a) {
            this.o = a;
            this.i = new Se;
            this.g = N(sn);
            this.actions = new B(new Ve);
            this.j = new B(new E, new gf);
            C(this.i, this.o);
            C(this.i, this.j);
            a = a.get(F).kb;
            this.g.width = a.g.x;
            this.g.height = a.g.y;
            a = this.g.getContext("2d");
            this.u = new xf(this.i, a);
            this.i.g = [new yf(this.i), this.u]
        }
        update(a) {
            this.i.update(a)
        }
    }

    function zn(a, b, c) {
        a.style.transform = `translate(${b.x}px, ${b.y}px) scale(${c})`
    };

    function Fn(a) {
        const b = a.width,
            c = a.height,
            d = a.Me,
            e = a.Ee,
            f = a.ye,
            g = a.Xe,
            h = a.Td,
            l = a.Pe,
            p = a.Qe,
            x = a.vb,
            Q = a.qb,
            sb = a.Ye;
        a = a.Te;
        return L('<div class="' + M("ddl-container") + '"' + (a != null ? " ssk='" + M(Qh("fMIyXb") + a) + "'" : "") + '><svg xmlns="http://www.w3.org/2000/svg" class="' + M("ddl-progress-svg-container") + '" viewBox="0 0 ' + M(b) + " " + M(c) + '"></svg><canvas class="' + M("ddl-progress-canvas") + '" width="' + M(b) + '" height="' + M(c) + '"></canvas><div class="' + M("ddl-progress-top-message") + '">' + K(x) + '</div><div class="' + M("ddl-progress-results") +
            '"><div class="' + M("ddl-progress-results-title") + '">' + K(d) + '</div><table class="' + M("ddl-progress-results-stats") + '" cellspacing="6" cellpadding="0"><tr><th>' + K(f) + '</th><td class="' + M("ddl-progress-results-level-stars") + '"></td></tr><tr><th>' + K(g) + '</th><td class="' + M("ddl-progress-results-total-stars") + '"></td></tr></table></div><div class="' + M("ddl-progress-buttons") +
            '"><button class="' + M("ddl-progress-continue-button") + " " + M("ddl-button") + " " + M("ddl-button-default") + '">' + K(h) + '</button></div><div class="' + M("ddl-progress-bottom-message") + '">' + K(Q) + '</div><div class="' + M("ddl-progress-next-level-title") + '">' + K(e) + "</div></div>")
    }

    function Gn(a) {
        const b = a.y;
        return L('<svg xmlns="http://www.w3.org/2000/svg" x="' + M(a.x - 27) + '" y="' + M(b - 27) + '" width="54" height="54" viewBox="0 0 54 54" class="ddl-progress-wildcard-slot"><path d="M0.337,26.5L26.5,0.337,52.663,26.5,26.5,52.663Zm0,0L26.5,0.337,52.663,26.5,26.5,52.663Z"/><path d="M4.216,26.5L26.5,4.216,48.784,26.5,26.5,48.784Zm0,0L26.5,4.216,48.784,26.5,26.5,48.784Z"/></svg>')
    };

    function Hn(a) {
        const b = Gj;
        switch (a.mode) {
            case 0:
                return Dj(b);
            case 2:
                return Bj(b);
            case 3:
            case 4:
                return Cj(b);
            case 1:
                return Promise.resolve();
            default:
                jb(a.mode, void 0)
        }
    }

    function In(a, b, c) {
        return aj(ln(a, b), a.actions, c)
    }

    function Jn(a) {
        m(function* () {
            yield a.delay(250);
            yield In(a, ".ddl-progress-results-title")
        })
    }

    function Kn(a) {
        return m(function* () {
            const b = a.j.length,
                c = b < a.g.g;
            b === a.g.g && (Ln(a, b), S(R(), w.Ob));
            const d = new B(new E(new D(270, Mn[b])));
            a.j.push(d);
            C(a.i, d);
            a.mode === 0 && (Nn(a, b, !1, 1), S(R(), w.Ob, 230), yield $i(d.get(nf)));
            Nn(a, b, c, 0);
            if (a.mode !== 0) {
                const e = d.get(F);
                e.alpha = 0;
                yield O(new v(1E3, 0, 1, f => {
                    e.alpha = f
                }), d)
            }
        })
    }

    function On(a, b) {
        m(function* () {
            const c = b < a.g.g - 1,
                d = a.mode === 0,
                e = [Pn(a, b, !1, d)];
            c && e.push(Pn(a, b, !0, d));
            yield Promise.all(e)
        })
    }

    function Qn(a) {
        m(function* () {
            yield a.delay(500);
            yield In(a, ".ddl-progress-results-stats");
            const b = ln(a, ".ddl-progress-results-level-stars"),
                c = ln(a, ".ddl-progress-results-total-stars"),
                d = a.g.u,
                e = a.g.Ba,
                f = e - d;
            f > 0 && (c.textContent = `${f}`);
            yield In(a, c);
            d > 0 && S(R(), w.Qd);
            yield Promise.all([Rn(a, b, 0, d), Rn(a, c, f, e)])
        })
    }

    function Sn(a, b) {
        return m(function* () {
            return bj(ln(a, b), a.actions)
        })
    }

    function Tn(a) {
        return m(function* () {
            yield In(a, ".ddl-progress-next-level-title");
            Ln(a, a.mode === 0 ? 0 : a.g.g);
            S(R(), w.Ob)
        })
    }

    function Un(a) {
        return m(function* () {
            const b = a.g.g;
            b < 0 || (b > 0 && (yield Pn(a, b - 1, !0, !0)), xj(Gj, 4), Ln(a, b), S(R(), Vn[b]), yield $i(Nn(a, b, !1, 3)), Nn(a, b, !0, 0))
        })
    }

    function Wn(a) {
        return m(function* () {
            yield Xn(a);
            S(R(), w.wb);
            a.mode !== 2 && a.mode !== 1 || S(R(), w.Md);
            a.mode === 3 ? (Zl || (Zl = !0, G.c = 14, I(1)), I(4)) : a.mode === 4 && I(109)
        })
    }

    function Yn(a) {
        return m(function* () {
            yield Promise.all([Sn(a, a.buttons), Sn(a, ".ddl-progress-results"), Sn(a, a.vb)])
        })
    }

    function Zn() {
        return m(function* () {
            const a = Gj;
            yield xj(a, 1);
            yield Dj(a)
        })
    }

    function $n(a) {
        return m(function* () {
            rj(R(), 1875);
            yield Promise.all([kn(a, a.actions, 1, 0, 750), a.delay(1500)]);
            a.W.remove()
        })
    }

    function ao(a) {
        return m(function* () {
            const b = [];
            for (let c = 0; c < a.g.g; c++) b.push(bo(a, c));
            for (const c of a.O) b.push(Sn(a, c));
            yield Promise.all(b)
        })
    }

    function co(a) {
        return m(function* () {
            const b = [O(new v(1E3, 1, 0, c => {
                a.v.style.opacity = `${c}`
            }), a.actions)];
            for (let c = 0; c < a.j.length; c++) b.push(eo(a, c));
            yield Promise.all(b)
        })
    }

    function fo(a) {
        return m(function* () {
            const b = [];
            for (const c of go) {
                const d = N(Gn, {
                    x: c.x,
                    y: c.y
                });
                a.v.appendChild(d);
                b.push(In(a, d))
            }
            yield Promise.all(b)
        })
    }

    function ho(a) {
        return m(function* () {
            const b = [],
                c = new D(56, 56);
            for (let e = 0; e < a.g.i.length; e++) {
                const f = dk(a.g.i[e], c);
                f.get(E).rotation = e < 2 ? Math.PI / 4 : -Math.PI / 4;
                bk(f, go[e], c, 0, a.i, a.W);
                var d = In(a, f.get(T).el, 300);
                e !== a.g.i.length - 1 ? b.push(d) : (d = f.get(V), d.Aa = new D(0, 0), b.push(O(new n([new r(400), new q(() => {
                    S(R(), w.nc)
                }), new t([u(new Ye(1E3, d.Aa.V(), c, f.get(V).Aa), La)])]), a.actions)))
            }
            yield Promise.all(b)
        })
    }

    function Rn(a, b, c, d) {
        return m(function* () {
            c === 0 && d === 0 ? b.textContent = "0" : yield O(new v(800, c, d, e => {
                e = Math.floor(e);
                b.textContent = `${e > 0 ? e : ""}`
            }), a.actions)
        })
    }

    function Ln(a, b) {
        O(ej(new D(270, Mn[b]), a.v), a.actions)
    }

    function Nn(a, b, c, d) {
        c = io[b][c ? 1 : 0].get(d);
        d = Yi(c, 24, d === 0);
        Zi(a.j[b], d);
        return d
    }

    function eo(a, b) {
        return m(function* () {
            const c = a.j[b],
                d = c.get(F);
            yield O(new v(1E3, 1, 0, e => {
                d.alpha = e
            }), c);
            Re(a.i, c)
        })
    }

    function Pn(a, b, c, d) {
        const e = a.mode === 1,
            f = document.createElementNS("http://www.w3.org/2000/svg", "line");
        f.setAttribute("x1", "270");
        f.setAttribute("y1", `${jo[b][0]}`);
        f.setAttribute("x2", "270");
        f.setAttribute("y2", `${jo[b][d ? 0 : 1]}`);
        f.classList.add(c ? "ddl-progress-line-full" : "ddl-progress-line-empty");
        a.v.appendChild(f);
        c && a.O.push(f);
        if (e) return Promise.resolve();
        if (d) return O(u(new v(c ? 500 : 1E3, jo[b][0], jo[b][1], g => {
            f.setAttribute("y2", `${g}`)
        }), c ? Ia : Ga), a.actions);
        f.style.visibility = "hidden";
        f.style.opacity =
            "0";
        return In(a, f)
    }

    function bo(a, b) {
        return m(function* () {
            yield $i(a.j[b].get(nf));
            yield $i(Nn(a, b, !0, 4))
        })
    }

    function Xn(a) {
        return m(function* () {
            const b = Z(a, ".ddl-progress-continue-button");
            return new Promise(c => {
                const d = () => {
                    b.removeEventListener("click", d);
                    c()
                };
                b.addEventListener("click", d)
            })
        })
    }
    var mo = class extends mn {
        constructor(a, b, c) {
            var d = c === 3 || c === 4 ? b.j + 1 : b.j;
            d = b.g >= 0 ? U("leveltitle").replace("%NUMBER%", `${d}`) : "";
            const e = U("leveltitle").replace("%NUMBER%", `${b.j + 1}`);
            var f = c === 4 ? "try_again" : c === 3 ? "playagain" : "continue",
                g = U("results_matchstars"),
                h = U("results_totalstars");
            f = U(f);
            var l = U("search"),
                p = U("share"),
                x;
            c === 2 ? x = "results_win" : c === 3 ? x = "lose_title" : c === 4 && (x = "tie_subtitle");
            x = x ? U(x) : "";
            var Q;
            c === 0 ? Q = "progress_title" : c === 1 && (Q = b.o.length > 0 ? "win_keeplaying_02" : "win_keeplaying_03");
            Q = Q ? U(Q) : "";
            super(a, N(Fn, {
                width: 540,
                height: 960,
                Me: d,
                Ee: e,
                ye: g,
                Xe: h,
                Td: f,
                Pe: l,
                Qe: p,
                vb: x,
                qb: Q,
                Ye: Hd() || !(!navigator.vendor || navigator.vendor.indexOf("Apple") !== 0)
            }));
            this.g = b;
            this.mode = c;
            this.i = new Se;
            this.Ca = new B(new E, new gf);
            this.actions = new B(new Ve);
            this.j = [];
            this.O = [];
            this.N = !1;
            this.Oa = Z(this, ".ddl-progress-canvas");
            this.v = Z(this, ".ddl-progress-svg-container");
            this.vb = Z(this, ".ddl-progress-top-message");
            this.qb = Z(this, ".ddl-progress-bottom-message");
            this.buttons = Z(this, ".ddl-progress-buttons");
            this.ta = ko[this.mode]
        }
        o() {
            this.mode !== 1 && qj(R(), this.ta, 750);
            jn(this, 1);
            J(this.vb, 28, 470, 80, 24);
            J(this.qb, 28, 470, 80, 24);
            J(ln(this, ".ddl-progress-continue-button"), 30, 205, 60, 20, !0);
            C(this.i, this.Ca);
            C(this.i, this.actions);
            this.i.g = [new Xe(this.i), new yf(this.i), new Wj(this.i), new tj(this.i), new xf(this.i, this.Oa.getContext("2d"))];
            this.N = !0;
            return Promise.resolve()
        }
        H() {
            const a = this;
            return m(function* () {
                a.mode !== 0 && a.mode !== 2 || S(R(), w.Ld);
                var b = [2, 3, 4].includes(a.mode);
                const c = Gj,
                    d = Hn(a);
                a.mode === 2 && (yield In(a, a.vb));
                b && Jn(a);
                a.mode === 0 && In(a, a.qb);
                const e = a.mode === 0;
                yield lo(e, Kn(a));
                On(a, 0);
                b && Qn(a);
                yield lo(e, Kn(a));
                On(a, 1);
                yield lo(e, Kn(a));
                a.mode === 0 && (yield a.delay(500), yield Sn(a, a.qb), yield Tn(a));
                switch (a.mode) {
                    case 0:
                    case 2:
                        yield Promise.all([a.delay(1E3), d]);
                        yield Un(a);
                        a.g.g++;
                        a.mode === 2 && (In(a, a.buttons), yield Wn(a), yield Yn(a));
                        a.g.g < a.j.length ? (b = Zn(), a.mode === 2 && (yield Tn(a)), yield b) : a.g.o.length > 0 || Zn();
                        yield $n(a);
                        break;
                    case 3:
                    case 4:
                        yield d;
                        yield In(a, a.vb);
                        a.mode ===
                            3 && (yield ao(a));
                        b = In(a, a.buttons).then(() => {
                            xj(c, 1)
                        });
                        yield Wn(a);
                        yield Yn(a);
                        yield co(a);
                        yield b;
                        Dj(c);
                        yield $n(a);
                        break;
                    case 1:
                        yield d;
                        yield fo(a);
                        yield ho(a);
                        yield In(a, a.qb);
                        In(a, a.buttons);
                        yield Wn(a);
                        b = Zn();
                        yield $n(a);
                        yield b;
                        break;
                    default:
                        jb(a.mode, void 0)
                }
            })
        }
        update(a) {
            this.N && this.i.update(a)
        }
        delay(a) {
            return P(a, this.actions)
        }
    };

    function lo(a, b) {
        return m(function* () {
            a && (yield b)
        })
    }
    const Mn = [655, 488, 320],
        jo = [
            [630, 506],
            [453, 338]
        ],
        io = [
            [new Map([
                [0, [
                    [15, 1910, 0, 113, 113]
                ]],
                [1, Ui],
                [2, Ui.slice().reverse()],
                [3, [
                    [16, 0, 0, 113, 113],
                    [16, 116, 0, 113, 113],
                    [16, 232, 0, 113, 113],
                    [16, 348, 0, 113, 113],
                    [16, 464, 0, 113, 113],
                    [16, 580, 0, 113, 113],
                    [16, 696, 0, 113, 113],
                    [16, 812, 0, 113, 113],
                    [16, 0, 116, 113, 113],
                    [16, 116, 116, 113, 113],
                    [16, 232, 116, 113, 113],
                    [16, 348, 116, 113, 113],
                    [16, 464, 116, 113, 113],
                    [16, 580, 116, 113, 113],
                    [16, 696, 116, 113, 113],
                    [16, 812, 116, 113, 113],
                    [16, 0, 232, 113, 113],
                    [16, 116, 232, 113, 113],
                    [16, 232, 232, 113, 113],
                    [16, 348, 232, 113, 113],
                    [16, 464, 232, 113, 113],
                    [16, 580, 232, 113, 113],
                    [16, 696, 232, 113, 113],
                    [16, 812, 232, 113, 113],
                    [16, 0, 348, 113, 113],
                    [16, 116, 348, 113, 113],
                    [16, 232, 348, 113, 113],
                    [16, 348, 348, 113, 113],
                    [16, 464, 348, 113, 113],
                    [16, 580, 348, 113, 113]
                ]]
            ]), new Map([
                [0, [
                    [17, 0, 0, 113, 113],
                    [17, 116, 0, 113, 113],
                    [17, 232, 0, 113, 113],
                    [17, 348, 0, 113, 113],
                    [17, 464, 0, 113, 113],
                    [17, 580, 0, 113, 113],
                    [17, 696, 0, 113, 113],
                    [17, 812, 0, 113, 113],
                    [17, 928, 0, 113, 113],
                    [17, 1044, 0, 113, 113],
                    [17, 0, 116, 113, 113],
                    [17, 116, 116, 113, 113],
                    [17, 232, 116, 113, 113],
                    [17, 348,
                        116, 113, 113
                    ],
                    [17, 464, 116, 113, 113],
                    [17, 580, 116, 113, 113],
                    [17, 696, 116, 113, 113],
                    [17, 812, 116, 113, 113],
                    [17, 928, 116, 113, 113],
                    [17, 1044, 116, 113, 113],
                    [17, 0, 232, 113, 113],
                    [17, 116, 232, 113, 113],
                    [17, 232, 232, 113, 113],
                    [17, 348, 232, 113, 113],
                    [17, 464, 232, 113, 113],
                    [17, 580, 232, 113, 113],
                    [17, 696, 232, 113, 113],
                    [17, 812, 232, 113, 113],
                    [17, 928, 232, 113, 113],
                    [17, 1044, 232, 113, 113],
                    [17, 0, 348, 113, 113],
                    [17, 116, 348, 113, 113],
                    [17, 232, 348, 113, 113],
                    [17, 348, 348, 113, 113],
                    [17, 464, 348, 113, 113],
                    [17, 580, 348, 113, 113],
                    [17, 696, 348, 113, 113],
                    [17, 812,
                        348, 113, 113
                    ],
                    [17, 928, 348, 113, 113]
                ]],
                [4, [
                    [18, 0, 0, 113, 113],
                    [18, 116, 0, 113, 113],
                    [18, 232, 0, 113, 113],
                    [18, 348, 0, 113, 113],
                    [18, 464, 0, 113, 113],
                    [18, 580, 0, 113, 113],
                    [18, 696, 0, 113, 113],
                    [18, 0, 116, 113, 113],
                    [18, 116, 116, 113, 113],
                    [18, 232, 116, 113, 113],
                    [18, 348, 116, 113, 113],
                    [18, 464, 116, 113, 113],
                    [18, 580, 116, 113, 113],
                    [18, 696, 116, 113, 113],
                    [18, 0, 232, 113, 113],
                    [18, 116, 232, 113, 113],
                    [18, 232, 232, 113, 113],
                    [18, 348, 232, 113, 113],
                    [18, 464, 232, 113, 113],
                    [18, 580, 232, 113, 113],
                    [18, 696, 232, 113, 113],
                    [18, 0, 348, 113, 113],
                    [18, 116, 348, 113, 113],
                    [18, 232, 348, 113, 113],
                    [18, 348, 348, 113, 113],
                    [18, 464, 348, 113, 113],
                    [18, 580, 348, 113, 113],
                    [18, 696, 348, 113, 113],
                    [18, 0, 464, 113, 113],
                    [18, 116, 464, 113, 113],
                    [18, 232, 464, 113, 113],
                    [18, 348, 464, 113, 113],
                    [18, 464, 464, 113, 113],
                    [18, 580, 464, 113, 113],
                    [18, 696, 464, 113, 113],
                    [18, 0, 580, 113, 113],
                    [18, 116, 580, 113, 113],
                    [18, 232, 580, 113, 113],
                    [18, 348, 580, 113, 113],
                    [18, 464, 580, 113, 113],
                    [18, 580, 580, 113, 113],
                    [18, 696, 580, 113, 113],
                    [18, 0, 696, 113, 113],
                    [18, 116, 696, 113, 113],
                    [18, 232, 696, 113, 113],
                    [18, 348, 696, 113, 113],
                    [18, 464, 696, 113, 113],
                    [18,
                        580, 696, 113, 113
                    ],
                    [18, 696, 696, 113, 113]
                ]]
            ])],
            [new Map([
                [0, [
                    [15, 0, 0, 188, 188]
                ]],
                [1, Vi],
                [2, Vi.slice().reverse()],
                [3, [
                    [19, 0, 0, 188, 188],
                    [19, 191, 0, 188, 188],
                    [19, 382, 0, 188, 188],
                    [19, 573, 0, 188, 188],
                    [19, 764, 0, 188, 188],
                    [19, 955, 0, 188, 188],
                    [19, 1146, 0, 188, 188],
                    [19, 1337, 0, 188, 188],
                    [19, 1528, 0, 188, 188],
                    [19, 1719, 0, 188, 188],
                    [19, 0, 191, 188, 188],
                    [19, 191, 191, 188, 188],
                    [19, 382, 191, 188, 188],
                    [19, 573, 191, 188, 188],
                    [19, 764, 191, 188, 188],
                    [19, 955, 191, 188, 188],
                    [19, 1146, 191, 188, 188],
                    [19, 1337, 191, 188, 188],
                    [19, 1528, 191, 188, 188],
                    [19, 1719,
                        191, 188, 188
                    ],
                    [19, 0, 382, 188, 188],
                    [19, 191, 382, 188, 188],
                    [19, 382, 382, 188, 188],
                    [19, 573, 382, 188, 188],
                    [19, 764, 382, 188, 188],
                    [19, 955, 382, 188, 188],
                    [19, 1146, 382, 188, 188],
                    [19, 1337, 382, 188, 188],
                    [19, 1528, 382, 188, 188],
                    [19, 1719, 382, 188, 188]
                ]]
            ]), new Map([
                [0, [
                    [20, 0, 0, 188, 188],
                    [20, 191, 0, 188, 188],
                    [20, 382, 0, 188, 188],
                    [20, 573, 0, 188, 188],
                    [20, 764, 0, 188, 188],
                    [20, 955, 0, 188, 188],
                    [20, 0, 191, 188, 188],
                    [20, 191, 191, 188, 188],
                    [20, 382, 191, 188, 188],
                    [20, 573, 191, 188, 188],
                    [20, 764, 191, 188, 188],
                    [20, 955, 191, 188, 188],
                    [20, 0, 382, 188, 188],
                    [20,
                        191, 382, 188, 188
                    ],
                    [20, 382, 382, 188, 188],
                    [20, 573, 382, 188, 188],
                    [20, 764, 382, 188, 188],
                    [20, 955, 382, 188, 188],
                    [20, 0, 573, 188, 188],
                    [20, 191, 573, 188, 188],
                    [20, 382, 573, 188, 188],
                    [20, 573, 573, 188, 188],
                    [20, 764, 573, 188, 188],
                    [20, 955, 573, 188, 188],
                    [20, 0, 764, 188, 188],
                    [20, 191, 764, 188, 188],
                    [20, 382, 764, 188, 188],
                    [20, 573, 764, 188, 188],
                    [20, 764, 764, 188, 188],
                    [20, 955, 764, 188, 188],
                    [20, 0, 955, 188, 188],
                    [20, 191, 955, 188, 188],
                    [20, 382, 955, 188, 188],
                    [20, 573, 955, 188, 188],
                    [20, 764, 955, 188, 188],
                    [20, 955, 955, 188, 188],
                    [20, 0, 1146, 188, 188],
                    [20, 191,
                        1146, 188, 188
                    ],
                    [20, 382, 1146, 188, 188],
                    [20, 573, 1146, 188, 188],
                    [20, 764, 1146, 188, 188]
                ]],
                [4, [
                    [21, 0, 0, 188, 188],
                    [21, 191, 0, 188, 188],
                    [21, 382, 0, 188, 188],
                    [21, 573, 0, 188, 188],
                    [21, 764, 0, 188, 188],
                    [21, 955, 0, 188, 188],
                    [21, 1146, 0, 188, 188],
                    [21, 1337, 0, 188, 188],
                    [21, 1528, 0, 188, 188],
                    [21, 1719, 0, 188, 188],
                    [21, 0, 191, 188, 188],
                    [21, 191, 191, 188, 188],
                    [21, 382, 191, 188, 188],
                    [21, 573, 191, 188, 188],
                    [21, 764, 191, 188, 188],
                    [21, 955, 191, 188, 188],
                    [21, 1146, 191, 188, 188],
                    [21, 1337, 191, 188, 188],
                    [21, 1528, 191, 188, 188],
                    [21, 1719, 191, 188, 188],
                    [21, 0, 382, 188,
                        188
                    ],
                    [21, 191, 382, 188, 188],
                    [21, 382, 382, 188, 188],
                    [21, 573, 382, 188, 188],
                    [21, 764, 382, 188, 188],
                    [21, 955, 382, 188, 188],
                    [21, 1146, 382, 188, 188],
                    [21, 1337, 382, 188, 188],
                    [21, 1528, 382, 188, 188],
                    [21, 1719, 382, 188, 188],
                    [21, 0, 573, 188, 188],
                    [21, 191, 573, 188, 188],
                    [21, 382, 573, 188, 188],
                    [21, 573, 573, 188, 188],
                    [21, 764, 573, 188, 188],
                    [21, 955, 573, 188, 188],
                    [21, 1146, 573, 188, 188],
                    [21, 1337, 573, 188, 188],
                    [21, 1528, 573, 188, 188],
                    [21, 1719, 573, 188, 188],
                    [21, 0, 764, 188, 188],
                    [21, 191, 764, 188, 188],
                    [21, 382, 764, 188, 188],
                    [21, 573, 764, 188, 188],
                    [21, 764, 764,
                        188, 188
                    ],
                    [21, 955, 764, 188, 188],
                    [21, 1146, 764, 188, 188],
                    [21, 1337, 764, 188, 188],
                    [21, 1528, 764, 188, 188]
                ]]
            ])],
            [new Map([
                [0, [
                    [15, 1528, 191, 188, 188]
                ]],
                [1, Wi],
                [2, Wi.slice().reverse()],
                [3, [
                    [22, 0, 0, 188, 188],
                    [22, 191, 0, 188, 188],
                    [22, 382, 0, 188, 188],
                    [22, 573, 0, 188, 188],
                    [22, 764, 0, 188, 188],
                    [22, 0, 191, 188, 188],
                    [22, 191, 191, 188, 188],
                    [22, 382, 191, 188, 188],
                    [22, 573, 191, 188, 188],
                    [22, 764, 191, 188, 188],
                    [22, 0, 382, 188, 188],
                    [22, 191, 382, 188, 188],
                    [22, 382, 382, 188, 188],
                    [22, 573, 382, 188, 188],
                    [22, 764, 382, 188, 188],
                    [22, 0, 573, 188, 188],
                    [22, 191,
                        573, 188, 188
                    ],
                    [22, 382, 573, 188, 188],
                    [22, 573, 573, 188, 188],
                    [22, 764, 573, 188, 188],
                    [22, 0, 764, 188, 188],
                    [22, 191, 764, 188, 188],
                    [22, 382, 764, 188, 188],
                    [22, 573, 764, 188, 188],
                    [22, 764, 764, 188, 188],
                    [22, 0, 955, 188, 188],
                    [22, 191, 955, 188, 188],
                    [22, 382, 955, 188, 188],
                    [22, 573, 955, 188, 188],
                    [22, 764, 955, 188, 188],
                    [22, 0, 1146, 188, 188],
                    [22, 191, 1146, 188, 188],
                    [22, 382, 1146, 188, 188],
                    [22, 573, 1146, 188, 188],
                    [22, 764, 1146, 188, 188],
                    [22, 0, 1337, 188, 188],
                    [22, 191, 1337, 188, 188],
                    [22, 382, 1337, 188, 188]
                ]]
            ]), new Map([
                [0, [
                    [23, 0, 0, 188, 188],
                    [23, 191, 0, 188,
                        188
                    ],
                    [23, 382, 0, 188, 188],
                    [23, 573, 0, 188, 188],
                    [23, 764, 0, 188, 188],
                    [23, 955, 0, 188, 188],
                    [23, 0, 191, 188, 188],
                    [23, 191, 191, 188, 188],
                    [23, 382, 191, 188, 188],
                    [23, 573, 191, 188, 188],
                    [23, 764, 191, 188, 188],
                    [23, 955, 191, 188, 188],
                    [23, 0, 382, 188, 188],
                    [23, 191, 382, 188, 188],
                    [23, 382, 382, 188, 188],
                    [23, 573, 382, 188, 188],
                    [23, 764, 382, 188, 188],
                    [23, 955, 382, 188, 188],
                    [23, 0, 573, 188, 188],
                    [23, 191, 573, 188, 188],
                    [23, 382, 573, 188, 188],
                    [23, 573, 573, 188, 188],
                    [23, 764, 573, 188, 188],
                    [23, 955, 573, 188, 188],
                    [23, 0, 764, 188, 188],
                    [23, 191, 764, 188, 188],
                    [23, 382,
                        764, 188, 188
                    ],
                    [23, 573, 764, 188, 188],
                    [23, 764, 764, 188, 188],
                    [23, 955, 764, 188, 188],
                    [23, 0, 955, 188, 188],
                    [23, 191, 955, 188, 188],
                    [23, 382, 955, 188, 188],
                    [23, 573, 955, 188, 188],
                    [23, 764, 955, 188, 188],
                    [23, 955, 955, 188, 188],
                    [23, 0, 1146, 188, 188],
                    [23, 191, 1146, 188, 188],
                    [23, 382, 1146, 188, 188],
                    [23, 573, 1146, 188, 188],
                    [23, 764, 1146, 188, 188]
                ]]
            ])]
        ],
        go = [new D(70, 120), new D(130, 200), new D(470, 120), new D(410, 200)],
        ko = [w.Ac, w.mc, w.Ac, w.qc, w.qc],
        Vn = [w.Nd, w.Od, w.Pd];

    function no() {
        return L('<button class="' + M("ddl-rules-button") + " " + M("ddl-button") + '"><span>?</span></button>')
    }

    function oo(a) {
        var b = a.title;
        const c = a.Ve,
            d = a.We;
        var e = a.De;
        const f = a.Ie,
            g = a.He,
            h = a.fe,
            l = a.Zd,
            p = a.Xd,
            x = a.Wd;
        var Q = a.Sd;
        const sb = a.Rd;
        a = L;
        var Bo = '<div class="' + M("ddl-rules") + '">';
        b = L('<span class="' + M("ddl-rules-title") + '">' + K(b) + '</span><div class="' + M("ddl-rules-subtitle-container") + '"><span class="' + M("ddl-rules-subtitle") + '">' + K(c) + '</span><span class="' + M("ddl-rules-subtitle") + '">' + K(d) + "</span></div>");
        b = Bo + b;
        e = L('<span class="' + M("ddl-matches-title") + '">' + K(e) + '</span><div class="' + M("ddl-rules-matches") +
            '"><div class="' + M("ddl-rules-match-row") + '"><div class="' + M("ddl-rules-match") + " " + M("ddl-rules-match-pair") + '"><div class="' + M("ddl-rules-phase-graphic") + '"></div><span class="' + M("ddl-rules-match-title") + '">' + K(f) + '</span><span class="' + M("ddl-rules-match-points") + '">' + K(g) + '</span></div><div class="' + M("ddl-rules-match") + " " + M("ddl-rules-match-pair") + '"><div class="' + M("ddl-rules-fullmoon-graphic") + '"></div><span class="' + M("ddl-rules-match-title") + '">' + K(h) + '</span><span class="' + M("ddl-rules-match-points") +
            '">' + K(l) + '</span></div></div><div class="' + M("ddl-rules-match") + " " + M("ddl-match-cycle") + '"><div class="' + M("ddl-rules-cycle-graphic") + '"></div><span class="' + M("ddl-rules-match-title") + '">' + K(p) + '</span><span class="' + M("ddl-rules-match-points") + '">' + K(x) + "</span></div></div>");
        e = b + e;
        Q = L('<div class="' + M("ddl-rules-bonus") + '"><span class="' + M("ddl-bonus-title") + '">' + K(Q) + '</span><div class="' + M("ddl-bonus-row") + '"><div class="' + M("ddl-bonus-light") + '"></div><div class="' + M("ddl-bonus-dark") + '"></div></div><span class="' +
            M("ddl-bonus-subtitle") + '">' + K(sb) + "</span></div>");
        return a(e + Q + L('<button class="' + M("ddl-button") + " " + M("ddl-rules-close") + '"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 39 39"><path fill="none" stroke="#fff" stroke-linecap="round" stroke-width="2px" fill-rule="evenodd" d="M38,1L1,38"/><path fill="none" stroke="#fff" stroke-linecap="round" stroke-width="2px" fill-rule="evenodd" d="M1,1L38,38"/></svg></button>') + "</div>")
    };

    function po(a) {
        qo || (qo = new ro(a));
        return qo
    }

    function pn(a) {
        return m(function* () {
            a.j && (a.g.removeEventListener("click", a.H), S(R(), w.Hd), a.button.style.visibility = "visible", yield O(new n([new t([new n([new r(100), new v(200, 1, 0, b => {
                a.i.style.opacity = `${b}`;
                a.g.style.opacity = `${b}`;
                a.button.style.opacity = `${1 - b}`
            })]), u(new v(300, 0, 1060, b => {
                a.i.style.transform = `translateY(${b}px) scale(${a.o})`
            }), Ha)])]), a.actions), a.g.style.visibility = "hidden", a.i.style.visibility = "hidden", a.i.style.transform = "translateY(1060) scale(1)", a.j = !1, a.o = 1)
        })
    }

    function so(a) {
        a.button.addEventListener("click", () => void to(a));
        a.i.querySelector(".ddl-rules-close").addEventListener("click", () => void pn(a))
    }

    function to(a) {
        return m(function* () {
            a.j || (a.j = !0, a.o = 1, a.g.style.visibility = "visible", a.i.style.visibility = "visible", a.g.style.opacity = "0", a.i.style.opacity = "0", a.i.style.transform = `translateY(${1060}) scale(${a.o})`, S(R(), w.Id), yield O(new t([new v(200, 0, 1, b => {
                a.i.style.opacity = `${b}`;
                a.g.style.opacity = `${b}`;
                a.button.style.opacity = `${1 - b}`
            }), u(new v(300, 1060, 0, b => {
                a.i.style.transform = `translateY(${b}px) scale(${a.o})`
            }), Ja)]), a.actions), a.g.addEventListener("click", a.H), a.button.style.visibility =
                "hidden")
        })
    }
    var ro = class {
        constructor(a) {
            this.i = N(oo, {
                title: U("rules_title"),
                Ve: U("rules_instruction1"),
                We: U("rules_instruction2"),
                De: U("rules_match"),
                Ie: U("rules_phasepair_title"),
                He: U("rules_phasepair_points"),
                fe: U("rules_fullmoon_title"),
                Zd: U("rules_fullmoon_points"),
                Xd: U("rules_cycle_title"),
                Wd: U("rules_cycle_points"),
                Sd: U("bonus_title"),
                Rd: U("bonus_instruction")
            });
            this.button = N(no);
            this.u = new Se;
            this.actions = new B(new Ve);
            this.o = 1;
            this.j = !1;
            this.H = b => {
                b.target === b.currentTarget && this.j && (pn(this), this.g.removeEventListener("click",
                    this.H))
            };
            this.g = a.querySelector(".ddl-rules-container")
        }
        update(a) {
            this.u.update(a)
        }
    },
        qo;

    function uo(a, b) {
        const c = a.fontFamily;
        a = a.fontWeight;
        const d = b && b.Ud;
        var e = L;
        b = b && b.Ud;
        b = L("<style" + (b ? ' nonce="' + M(di(b)) + '"' : "") + '>\n.ddl-mute-button{border-radius:0;border:0;padding:0}.ddl-mute-button-mute-icon,.ddl-mute-button-unmute-icon{width:40px;height:40px}.MAIN_SPRITE{background-image:url(/main-sprite.png);background-repeat:no-repeat}.CTAPLAY_size{width:140px;height:140px}.CTAPLAY_offset{background-position:0 0;-webkit-background-size:140px 140px;background-size:140px 140px;width:140px;height:140px}.CTAPLAY{background:url(/main-sprite.png) 0 0/140px 140px no-repeat;width:140px;height:140px}.PLAY_SPRITE{background-image:url(/play-sprite.png);background-repeat:no-repeat}.PLAY00002_size{width:100px;height:100px}.PLAY00002_offset{background-position:0 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00002{background:url(/play-sprite.png) 0 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00003_size{width:100px;height:100px}.PLAY00003_offset{background-position:0 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00003{background:url(/play-sprite.png) 0 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00004_size{width:100px;height:100px}.PLAY00004_offset{background-position:0 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00004{background:url(/play-sprite.png) 0 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00005_size{width:100px;height:100px}.PLAY00005_offset{background-position:0 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00005{background:url(/play-sprite.png) 0 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00006_size{width:100px;height:100px}.PLAY00006_offset{background-position:0 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00006{background:url(/play-sprite.png) 0 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00007_size{width:100px;height:100px}.PLAY00007_offset{background-position:0 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00007{background:url(/play-sprite.png) 0 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00008_size{width:100px;height:100px}.PLAY00008_offset{background-position:0 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00008{background:url(/play-sprite.png) 0 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00009_size{width:100px;height:100px}.PLAY00009_offset{background-position:0 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00009{background:url(/play-sprite.png) 0 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00010_size{width:100px;height:100px}.PLAY00010_offset{background-position:0 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00010{background:url(/play-sprite.png) 0 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00011_size{width:100px;height:100px}.PLAY00011_offset{background-position:0 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00011{background:url(/play-sprite.png) 0 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00012_size{width:100px;height:100px}.PLAY00012_offset{background-position:0 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00012{background:url(/play-sprite.png) 0 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00013_size{width:100px;height:100px}.PLAY00013_offset{background-position:0 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00013{background:url(/play-sprite.png) 0 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00014_size{width:100px;height:100px}.PLAY00014_offset{background-position:0 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00014{background:url(/play-sprite.png) 0 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00015_size{width:100px;height:100px}.PLAY00015_offset{background-position:0 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00015{background:url(/play-sprite.png) 0 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00016_size{width:100px;height:100px}.PLAY00016_offset{background-position:0 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00016{background:url(/play-sprite.png) 0 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00017_size{width:100px;height:100px}.PLAY00017_offset{background-position:0 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00017{background:url(/play-sprite.png) 0 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00018_size{width:100px;height:100px}.PLAY00018_offset{background-position:-103px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00018{background:url(/play-sprite.png) -103px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00019_size{width:100px;height:100px}.PLAY00019_offset{background-position:-206px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00019{background:url(/play-sprite.png) -206px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00020_size{width:100px;height:100px}.PLAY00020_offset{background-position:-309px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00020{background:url(/play-sprite.png) -309px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00021_size{width:100px;height:100px}.PLAY00021_offset{background-position:-412px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00021{background:url(/play-sprite.png) -412px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00022_size{width:100px;height:100px}.PLAY00022_offset{background-position:-515px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00022{background:url(/play-sprite.png) -515px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00023_size{width:100px;height:100px}.PLAY00023_offset{background-position:-618px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00023{background:url(/play-sprite.png) -618px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00024_size{width:100px;height:100px}.PLAY00024_offset{background-position:-721px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00024{background:url(/play-sprite.png) -721px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00025_size{width:100px;height:100px}.PLAY00025_offset{background-position:-824px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00025{background:url(/play-sprite.png) -824px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00026_size{width:100px;height:100px}.PLAY00026_offset{background-position:-927px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00026{background:url(/play-sprite.png) -927px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00027_size{width:100px;height:100px}.PLAY00027_offset{background-position:-1030px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00027{background:url(/play-sprite.png) -1030px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00028_size{width:100px;height:100px}.PLAY00028_offset{background-position:-1133px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00028{background:url(/play-sprite.png) -1133px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00029_size{width:100px;height:100px}.PLAY00029_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00029{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00030_size{width:100px;height:100px}.PLAY00030_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00030{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00031_size{width:100px;height:100px}.PLAY00031_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00031{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00032_size{width:100px;height:100px}.PLAY00032_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00032{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00033_size{width:100px;height:100px}.PLAY00033_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00033{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00034_size{width:100px;height:100px}.PLAY00034_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00034{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00035_size{width:100px;height:100px}.PLAY00035_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00035{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00036_size{width:100px;height:100px}.PLAY00036_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00036{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00037_size{width:100px;height:100px}.PLAY00037_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00037{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00038_size{width:100px;height:100px}.PLAY00038_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00038{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00039_size{width:100px;height:100px}.PLAY00039_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00039{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00040_size{width:100px;height:100px}.PLAY00040_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00040{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00041_size{width:100px;height:100px}.PLAY00041_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00041{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00042_size{width:100px;height:100px}.PLAY00042_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00042{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00043_size{width:100px;height:100px}.PLAY00043_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00043{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00044_size{width:100px;height:100px}.PLAY00044_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00044{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00045_size{width:100px;height:100px}.PLAY00045_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00045{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00046_size{width:100px;height:100px}.PLAY00046_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00046{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00047_size{width:100px;height:100px}.PLAY00047_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00047{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00048_size{width:100px;height:100px}.PLAY00048_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00048{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00049_size{width:100px;height:100px}.PLAY00049_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00049{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00050_size{width:100px;height:100px}.PLAY00050_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00050{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00051_size{width:100px;height:100px}.PLAY00051_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00051{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00052_size{width:100px;height:100px}.PLAY00052_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00052{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00053_size{width:100px;height:100px}.PLAY00053_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00053{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00054_size{width:100px;height:100px}.PLAY00054_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00054{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00055_size{width:100px;height:100px}.PLAY00055_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00055{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00056_size{width:100px;height:100px}.PLAY00056_offset{background-position:-1236px 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00056{background:url(/play-sprite.png) -1236px 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00057_size{width:100px;height:100px}.PLAY00057_offset{background-position:0 -103px;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00057{background:url(/play-sprite.png) 0 -103px/1336px 203px no-repeat;width:100px;height:100px}.PLAY00058_size{width:100px;height:100px}.PLAY00058_offset{background-position:-103px -103px;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00058{background:url(/play-sprite.png) -103px -103px/1336px 203px no-repeat;width:100px;height:100px}.PLAY00059_size{width:100px;height:100px}.PLAY00059_offset{background-position:-206px -103px;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00059{background:url(/play-sprite.png) -206px -103px/1336px 203px no-repeat;width:100px;height:100px}.PLAY00060_size{width:100px;height:100px}.PLAY00060_offset{background-position:-309px -103px;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00060{background:url(/play-sprite.png) -309px -103px/1336px 203px no-repeat;width:100px;height:100px}.PLAY00061_size{width:100px;height:100px}.PLAY00061_offset{background-position:-412px -103px;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00061{background:url(/play-sprite.png) -412px -103px/1336px 203px no-repeat;width:100px;height:100px}.PLAY00062_size{width:100px;height:100px}.PLAY00062_offset{background-position:-515px -103px;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00062{background:url(/play-sprite.png) -515px -103px/1336px 203px no-repeat;width:100px;height:100px}.PLAY00063_size{width:100px;height:100px}.PLAY00063_offset{background-position:-618px -103px;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00063{background:url(/play-sprite.png) -618px -103px/1336px 203px no-repeat;width:100px;height:100px}.PLAY00064_size{width:100px;height:100px}.PLAY00064_offset{background-position:-721px -103px;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00064{background:url(/play-sprite.png) -721px -103px/1336px 203px no-repeat;width:100px;height:100px}.PLAY00065_size{width:100px;height:100px}.PLAY00065_offset{background-position:-824px -103px;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00065{background:url(/play-sprite.png) -824px -103px/1336px 203px no-repeat;width:100px;height:100px}.PLAY00066_size{width:100px;height:100px}.PLAY00066_offset{background-position:-927px -103px;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00066{background:url(/play-sprite.png) -927px -103px/1336px 203px no-repeat;width:100px;height:100px}.PLAY00067_size{width:100px;height:100px}.PLAY00067_offset{background-position:-1030px -103px;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00067{background:url(/play-sprite.png) -1030px -103px/1336px 203px no-repeat;width:100px;height:100px}.PLAY00068_size{width:100px;height:100px}.PLAY00068_offset{background-position:-1133px -103px;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00068{background:url(/play-sprite.png) -1133px -103px/1336px 203px no-repeat;width:100px;height:100px}.PLAY00069_size{width:100px;height:100px}.PLAY00069_offset{background-position:-1236px -103px;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00069{background:url(/play-sprite.png) -1236px -103px/1336px 203px no-repeat;width:100px;height:100px}.PLAY00070_size{width:100px;height:100px}.PLAY00070_offset{background-position:0 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00070{background:url(/play-sprite.png) 0 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00071_size{width:100px;height:100px}.PLAY00071_offset{background-position:0 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00071{background:url(/play-sprite.png) 0 0/1336px 203px no-repeat;width:100px;height:100px}.PLAY00072_size{width:100px;height:100px}.PLAY00072_offset{background-position:0 0;-webkit-background-size:1336px 203px;background-size:1336px 203px;width:100px;height:100px}.PLAY00072{background:url(/play-sprite.png) 0 0/1336px 203px no-repeat;width:100px;height:100px}.BACKGROUND_SPRITE{background-image:url(/background-sprite.png);background-repeat:no-repeat}.MOON_DARK_size{width:653px;height:653px}.MOON_DARK_offset{background-position:0 -1283px;-webkit-background-size:1980px 1936px;background-size:1980px 1936px;width:653px;height:653px}.MOON_DARK{background:url(/background-sprite.png) 0 -1283px/1980px 1936px no-repeat;width:653px;height:653px}.MOON_LIGHT_size{width:653px;height:653px}.MOON_LIGHT_offset{background-position:-656px -1283px;-webkit-background-size:1980px 1936px;background-size:1980px 1936px;width:653px;height:653px}.MOON_LIGHT{background:url(/background-sprite.png) -656px -1283px/1980px 1936px no-repeat;width:653px;height:653px}.STARS_size{width:1980px;height:1280px}.STARS_offset{background-position:0 0;-webkit-background-size:1980px 1936px;background-size:1980px 1936px;width:1980px;height:1280px}.STARS{background:url(/background-sprite.png) 0 0/1980px 1936px no-repeat;width:1980px;height:1280px}.MOON_SPRITE_DARK_MOON_EYE_OPEN_IN{background-image:url(/moon-sprite-dark-moon-eye-open-in.png);background-repeat:no-repeat}.DARKMOON_EYEOPENIN0001_size{width:265px;height:189px}.DARKMOON_EYEOPENIN0001_offset{background-position:0 0;-webkit-background-size:1337px 189px;background-size:1337px 189px;width:265px;height:189px}.DARKMOON_EYEOPENIN0001{background:url(/moon-sprite-dark-moon-eye-open-in.png) 0 0/1337px 189px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENIN0002_size{width:265px;height:189px}.DARKMOON_EYEOPENIN0002_offset{background-position:-268px 0;-webkit-background-size:1337px 189px;background-size:1337px 189px;width:265px;height:189px}.DARKMOON_EYEOPENIN0002{background:url(/moon-sprite-dark-moon-eye-open-in.png) -268px 0/1337px 189px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENIN0003_size{width:265px;height:189px}.DARKMOON_EYEOPENIN0003_offset{background-position:-268px 0;-webkit-background-size:1337px 189px;background-size:1337px 189px;width:265px;height:189px}.DARKMOON_EYEOPENIN0003{background:url(/moon-sprite-dark-moon-eye-open-in.png) -268px 0/1337px 189px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENIN0004_size{width:265px;height:189px}.DARKMOON_EYEOPENIN0004_offset{background-position:-268px 0;-webkit-background-size:1337px 189px;background-size:1337px 189px;width:265px;height:189px}.DARKMOON_EYEOPENIN0004{background:url(/moon-sprite-dark-moon-eye-open-in.png) -268px 0/1337px 189px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENIN0005_size{width:265px;height:189px}.DARKMOON_EYEOPENIN0005_offset{background-position:-536px 0;-webkit-background-size:1337px 189px;background-size:1337px 189px;width:265px;height:189px}.DARKMOON_EYEOPENIN0005{background:url(/moon-sprite-dark-moon-eye-open-in.png) -536px 0/1337px 189px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENIN0006_size{width:265px;height:189px}.DARKMOON_EYEOPENIN0006_offset{background-position:-536px 0;-webkit-background-size:1337px 189px;background-size:1337px 189px;width:265px;height:189px}.DARKMOON_EYEOPENIN0006{background:url(/moon-sprite-dark-moon-eye-open-in.png) -536px 0/1337px 189px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENIN0007_size{width:265px;height:189px}.DARKMOON_EYEOPENIN0007_offset{background-position:-536px 0;-webkit-background-size:1337px 189px;background-size:1337px 189px;width:265px;height:189px}.DARKMOON_EYEOPENIN0007{background:url(/moon-sprite-dark-moon-eye-open-in.png) -536px 0/1337px 189px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENIN0008_size{width:265px;height:189px}.DARKMOON_EYEOPENIN0008_offset{background-position:-804px 0;-webkit-background-size:1337px 189px;background-size:1337px 189px;width:265px;height:189px}.DARKMOON_EYEOPENIN0008{background:url(/moon-sprite-dark-moon-eye-open-in.png) -804px 0/1337px 189px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENIN0009_size{width:265px;height:189px}.DARKMOON_EYEOPENIN0009_offset{background-position:-804px 0;-webkit-background-size:1337px 189px;background-size:1337px 189px;width:265px;height:189px}.DARKMOON_EYEOPENIN0009{background:url(/moon-sprite-dark-moon-eye-open-in.png) -804px 0/1337px 189px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENIN0010_size{width:265px;height:189px}.DARKMOON_EYEOPENIN0010_offset{background-position:-804px 0;-webkit-background-size:1337px 189px;background-size:1337px 189px;width:265px;height:189px}.DARKMOON_EYEOPENIN0010{background:url(/moon-sprite-dark-moon-eye-open-in.png) -804px 0/1337px 189px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENIN0011_size{width:265px;height:189px}.DARKMOON_EYEOPENIN0011_offset{background-position:-1072px 0;-webkit-background-size:1337px 189px;background-size:1337px 189px;width:265px;height:189px}.DARKMOON_EYEOPENIN0011{background:url(/moon-sprite-dark-moon-eye-open-in.png) -1072px 0/1337px 189px no-repeat;width:265px;height:189px}.MOON_SPRITE_DARK_MOON_EYE_OPEN_OUT{background-image:url(/moon-sprite-dark-moon-eye-open-out.png);background-repeat:no-repeat}.DARKMOON_EYEOPENOUT0001_size{width:265px;height:189px}.DARKMOON_EYEOPENOUT0001_offset{background-position:0 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.DARKMOON_EYEOPENOUT0001{background:url(/moon-sprite-dark-moon-eye-open-out.png) 0 0/1337px 381px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENOUT0002_size{width:265px;height:189px}.DARKMOON_EYEOPENOUT0002_offset{background-position:-268px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.DARKMOON_EYEOPENOUT0002{background:url(/moon-sprite-dark-moon-eye-open-out.png) -268px 0/1337px 381px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENOUT0003_size{width:265px;height:189px}.DARKMOON_EYEOPENOUT0003_offset{background-position:-268px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.DARKMOON_EYEOPENOUT0003{background:url(/moon-sprite-dark-moon-eye-open-out.png) -268px 0/1337px 381px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENOUT0004_size{width:265px;height:189px}.DARKMOON_EYEOPENOUT0004_offset{background-position:-268px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.DARKMOON_EYEOPENOUT0004{background:url(/moon-sprite-dark-moon-eye-open-out.png) -268px 0/1337px 381px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENOUT0005_size{width:265px;height:189px}.DARKMOON_EYEOPENOUT0005_offset{background-position:-536px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.DARKMOON_EYEOPENOUT0005{background:url(/moon-sprite-dark-moon-eye-open-out.png) -536px 0/1337px 381px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENOUT0006_size{width:265px;height:189px}.DARKMOON_EYEOPENOUT0006_offset{background-position:-536px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.DARKMOON_EYEOPENOUT0006{background:url(/moon-sprite-dark-moon-eye-open-out.png) -536px 0/1337px 381px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENOUT0007_size{width:265px;height:189px}.DARKMOON_EYEOPENOUT0007_offset{background-position:-536px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.DARKMOON_EYEOPENOUT0007{background:url(/moon-sprite-dark-moon-eye-open-out.png) -536px 0/1337px 381px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENOUT0008_size{width:265px;height:189px}.DARKMOON_EYEOPENOUT0008_offset{background-position:-804px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.DARKMOON_EYEOPENOUT0008{background:url(/moon-sprite-dark-moon-eye-open-out.png) -804px 0/1337px 381px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENOUT0009_size{width:265px;height:189px}.DARKMOON_EYEOPENOUT0009_offset{background-position:-804px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.DARKMOON_EYEOPENOUT0009{background:url(/moon-sprite-dark-moon-eye-open-out.png) -804px 0/1337px 381px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENOUT0010_size{width:265px;height:189px}.DARKMOON_EYEOPENOUT0010_offset{background-position:-804px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.DARKMOON_EYEOPENOUT0010{background:url(/moon-sprite-dark-moon-eye-open-out.png) -804px 0/1337px 381px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENOUT0011_size{width:265px;height:189px}.DARKMOON_EYEOPENOUT0011_offset{background-position:-1072px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.DARKMOON_EYEOPENOUT0011{background:url(/moon-sprite-dark-moon-eye-open-out.png) -1072px 0/1337px 381px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENOUT0012_size{width:265px;height:189px}.DARKMOON_EYEOPENOUT0012_offset{background-position:-1072px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.DARKMOON_EYEOPENOUT0012{background:url(/moon-sprite-dark-moon-eye-open-out.png) -1072px 0/1337px 381px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENOUT0013_size{width:265px;height:189px}.DARKMOON_EYEOPENOUT0013_offset{background-position:-1072px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.DARKMOON_EYEOPENOUT0013{background:url(/moon-sprite-dark-moon-eye-open-out.png) -1072px 0/1337px 381px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENOUT0014_size{width:265px;height:189px}.DARKMOON_EYEOPENOUT0014_offset{background-position:0 -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.DARKMOON_EYEOPENOUT0014{background:url(/moon-sprite-dark-moon-eye-open-out.png) 0 -192px/1337px 381px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENOUT0015_size{width:265px;height:189px}.DARKMOON_EYEOPENOUT0015_offset{background-position:0 -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.DARKMOON_EYEOPENOUT0015{background:url(/moon-sprite-dark-moon-eye-open-out.png) 0 -192px/1337px 381px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENOUT0016_size{width:265px;height:189px}.DARKMOON_EYEOPENOUT0016_offset{background-position:0 -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.DARKMOON_EYEOPENOUT0016{background:url(/moon-sprite-dark-moon-eye-open-out.png) 0 -192px/1337px 381px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENOUT0017_size{width:265px;height:189px}.DARKMOON_EYEOPENOUT0017_offset{background-position:-268px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.DARKMOON_EYEOPENOUT0017{background:url(/moon-sprite-dark-moon-eye-open-out.png) -268px -192px/1337px 381px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENOUT0018_size{width:265px;height:189px}.DARKMOON_EYEOPENOUT0018_offset{background-position:-268px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.DARKMOON_EYEOPENOUT0018{background:url(/moon-sprite-dark-moon-eye-open-out.png) -268px -192px/1337px 381px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENOUT0019_size{width:265px;height:189px}.DARKMOON_EYEOPENOUT0019_offset{background-position:-268px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.DARKMOON_EYEOPENOUT0019{background:url(/moon-sprite-dark-moon-eye-open-out.png) -268px -192px/1337px 381px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENOUT0020_size{width:265px;height:189px}.DARKMOON_EYEOPENOUT0020_offset{background-position:-536px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.DARKMOON_EYEOPENOUT0020{background:url(/moon-sprite-dark-moon-eye-open-out.png) -536px -192px/1337px 381px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENOUT0021_size{width:265px;height:189px}.DARKMOON_EYEOPENOUT0021_offset{background-position:-536px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.DARKMOON_EYEOPENOUT0021{background:url(/moon-sprite-dark-moon-eye-open-out.png) -536px -192px/1337px 381px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENOUT0022_size{width:265px;height:189px}.DARKMOON_EYEOPENOUT0022_offset{background-position:-536px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.DARKMOON_EYEOPENOUT0022{background:url(/moon-sprite-dark-moon-eye-open-out.png) -536px -192px/1337px 381px no-repeat;width:265px;height:189px}.DARKMOON_EYEOPENOUT0023_size{width:265px;height:189px}.DARKMOON_EYEOPENOUT0023_offset{background-position:-804px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.DARKMOON_EYEOPENOUT0023{background:url(/moon-sprite-dark-moon-eye-open-out.png) -804px -192px/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_DARK_MOON_FADE_IN{background-image:url(/moon-sprite-dark-moon-fade-in.png);background-repeat:no-repeat}.DARKMOON_FADEIN0001_size{width:265px;height:189px}.DARKMOON_FADEIN0001_offset{background-position:0 0;-webkit-background-size:1605px 189px;background-size:1605px 189px;width:265px;height:189px}.DARKMOON_FADEIN0001{background:url(/moon-sprite-dark-moon-fade-in.png) 0 0/1605px 189px no-repeat;width:265px;height:189px}.DARKMOON_FADEIN0002_size{width:265px;height:189px}.DARKMOON_FADEIN0002_offset{background-position:-268px 0;-webkit-background-size:1605px 189px;background-size:1605px 189px;width:265px;height:189px}.DARKMOON_FADEIN0002{background:url(/moon-sprite-dark-moon-fade-in.png) -268px 0/1605px 189px no-repeat;width:265px;height:189px}.DARKMOON_FADEIN0003_size{width:265px;height:189px}.DARKMOON_FADEIN0003_offset{background-position:-268px 0;-webkit-background-size:1605px 189px;background-size:1605px 189px;width:265px;height:189px}.DARKMOON_FADEIN0003{background:url(/moon-sprite-dark-moon-fade-in.png) -268px 0/1605px 189px no-repeat;width:265px;height:189px}.DARKMOON_FADEIN0004_size{width:265px;height:189px}.DARKMOON_FADEIN0004_offset{background-position:-268px 0;-webkit-background-size:1605px 189px;background-size:1605px 189px;width:265px;height:189px}.DARKMOON_FADEIN0004{background:url(/moon-sprite-dark-moon-fade-in.png) -268px 0/1605px 189px no-repeat;width:265px;height:189px}.DARKMOON_FADEIN0005_size{width:265px;height:189px}.DARKMOON_FADEIN0005_offset{background-position:-536px 0;-webkit-background-size:1605px 189px;background-size:1605px 189px;width:265px;height:189px}.DARKMOON_FADEIN0005{background:url(/moon-sprite-dark-moon-fade-in.png) -536px 0/1605px 189px no-repeat;width:265px;height:189px}.DARKMOON_FADEIN0006_size{width:265px;height:189px}.DARKMOON_FADEIN0006_offset{background-position:-536px 0;-webkit-background-size:1605px 189px;background-size:1605px 189px;width:265px;height:189px}.DARKMOON_FADEIN0006{background:url(/moon-sprite-dark-moon-fade-in.png) -536px 0/1605px 189px no-repeat;width:265px;height:189px}.DARKMOON_FADEIN0007_size{width:265px;height:189px}.DARKMOON_FADEIN0007_offset{background-position:-536px 0;-webkit-background-size:1605px 189px;background-size:1605px 189px;width:265px;height:189px}.DARKMOON_FADEIN0007{background:url(/moon-sprite-dark-moon-fade-in.png) -536px 0/1605px 189px no-repeat;width:265px;height:189px}.DARKMOON_FADEIN0008_size{width:265px;height:189px}.DARKMOON_FADEIN0008_offset{background-position:-804px 0;-webkit-background-size:1605px 189px;background-size:1605px 189px;width:265px;height:189px}.DARKMOON_FADEIN0008{background:url(/moon-sprite-dark-moon-fade-in.png) -804px 0/1605px 189px no-repeat;width:265px;height:189px}.DARKMOON_FADEIN0009_size{width:265px;height:189px}.DARKMOON_FADEIN0009_offset{background-position:-804px 0;-webkit-background-size:1605px 189px;background-size:1605px 189px;width:265px;height:189px}.DARKMOON_FADEIN0009{background:url(/moon-sprite-dark-moon-fade-in.png) -804px 0/1605px 189px no-repeat;width:265px;height:189px}.DARKMOON_FADEIN0010_size{width:265px;height:189px}.DARKMOON_FADEIN0010_offset{background-position:-804px 0;-webkit-background-size:1605px 189px;background-size:1605px 189px;width:265px;height:189px}.DARKMOON_FADEIN0010{background:url(/moon-sprite-dark-moon-fade-in.png) -804px 0/1605px 189px no-repeat;width:265px;height:189px}.DARKMOON_FADEIN0011_size{width:265px;height:189px}.DARKMOON_FADEIN0011_offset{background-position:-1072px 0;-webkit-background-size:1605px 189px;background-size:1605px 189px;width:265px;height:189px}.DARKMOON_FADEIN0011{background:url(/moon-sprite-dark-moon-fade-in.png) -1072px 0/1605px 189px no-repeat;width:265px;height:189px}.DARKMOON_FADEIN0012_size{width:265px;height:189px}.DARKMOON_FADEIN0012_offset{background-position:-1072px 0;-webkit-background-size:1605px 189px;background-size:1605px 189px;width:265px;height:189px}.DARKMOON_FADEIN0012{background:url(/moon-sprite-dark-moon-fade-in.png) -1072px 0/1605px 189px no-repeat;width:265px;height:189px}.DARKMOON_FADEIN0013_size{width:265px;height:189px}.DARKMOON_FADEIN0013_offset{background-position:-1072px 0;-webkit-background-size:1605px 189px;background-size:1605px 189px;width:265px;height:189px}.DARKMOON_FADEIN0013{background:url(/moon-sprite-dark-moon-fade-in.png) -1072px 0/1605px 189px no-repeat;width:265px;height:189px}.DARKMOON_FADEIN0014_size{width:265px;height:189px}.DARKMOON_FADEIN0014_offset{background-position:-1072px 0;-webkit-background-size:1605px 189px;background-size:1605px 189px;width:265px;height:189px}.DARKMOON_FADEIN0014{background:url(/moon-sprite-dark-moon-fade-in.png) -1072px 0/1605px 189px no-repeat;width:265px;height:189px}.DARKMOON_FADEIN0015_size{width:265px;height:189px}.DARKMOON_FADEIN0015_offset{background-position:-1340px 0;-webkit-background-size:1605px 189px;background-size:1605px 189px;width:265px;height:189px}.DARKMOON_FADEIN0015{background:url(/moon-sprite-dark-moon-fade-in.png) -1340px 0/1605px 189px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_FADE_IN{background-image:url(/moon-sprite-light-moon-fade-in.png);background-repeat:no-repeat}.LIGHTMOON_FADEIN0001_size{width:265px;height:189px}.LIGHTMOON_FADEIN0001_offset{background-position:0 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEIN0001{background:url(/moon-sprite-light-moon-fade-in.png) 0 0/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEIN0002_size{width:265px;height:189px}.LIGHTMOON_FADEIN0002_offset{background-position:-268px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEIN0002{background:url(/moon-sprite-light-moon-fade-in.png) -268px 0/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEIN0003_size{width:265px;height:189px}.LIGHTMOON_FADEIN0003_offset{background-position:-268px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEIN0003{background:url(/moon-sprite-light-moon-fade-in.png) -268px 0/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEIN0004_size{width:265px;height:189px}.LIGHTMOON_FADEIN0004_offset{background-position:-536px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEIN0004{background:url(/moon-sprite-light-moon-fade-in.png) -536px 0/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEIN0005_size{width:265px;height:189px}.LIGHTMOON_FADEIN0005_offset{background-position:-536px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEIN0005{background:url(/moon-sprite-light-moon-fade-in.png) -536px 0/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEIN0006_size{width:265px;height:189px}.LIGHTMOON_FADEIN0006_offset{background-position:-804px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEIN0006{background:url(/moon-sprite-light-moon-fade-in.png) -804px 0/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEIN0007_size{width:265px;height:189px}.LIGHTMOON_FADEIN0007_offset{background-position:-804px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEIN0007{background:url(/moon-sprite-light-moon-fade-in.png) -804px 0/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEIN0008_size{width:265px;height:189px}.LIGHTMOON_FADEIN0008_offset{background-position:-804px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEIN0008{background:url(/moon-sprite-light-moon-fade-in.png) -804px 0/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEIN0009_size{width:265px;height:189px}.LIGHTMOON_FADEIN0009_offset{background-position:-1072px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEIN0009{background:url(/moon-sprite-light-moon-fade-in.png) -1072px 0/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEIN0010_size{width:265px;height:189px}.LIGHTMOON_FADEIN0010_offset{background-position:-1072px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEIN0010{background:url(/moon-sprite-light-moon-fade-in.png) -1072px 0/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEIN0011_size{width:265px;height:189px}.LIGHTMOON_FADEIN0011_offset{background-position:-1072px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEIN0011{background:url(/moon-sprite-light-moon-fade-in.png) -1072px 0/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEIN0012_size{width:265px;height:189px}.LIGHTMOON_FADEIN0012_offset{background-position:0 -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEIN0012{background:url(/moon-sprite-light-moon-fade-in.png) 0 -192px/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEIN0013_size{width:265px;height:189px}.LIGHTMOON_FADEIN0013_offset{background-position:0 -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEIN0013{background:url(/moon-sprite-light-moon-fade-in.png) 0 -192px/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEIN0014_size{width:265px;height:189px}.LIGHTMOON_FADEIN0014_offset{background-position:0 -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEIN0014{background:url(/moon-sprite-light-moon-fade-in.png) 0 -192px/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEIN0015_size{width:265px;height:189px}.LIGHTMOON_FADEIN0015_offset{background-position:-268px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEIN0015{background:url(/moon-sprite-light-moon-fade-in.png) -268px -192px/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEIN0016_size{width:265px;height:189px}.LIGHTMOON_FADEIN0016_offset{background-position:-268px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEIN0016{background:url(/moon-sprite-light-moon-fade-in.png) -268px -192px/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEIN0017_size{width:265px;height:189px}.LIGHTMOON_FADEIN0017_offset{background-position:-268px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEIN0017{background:url(/moon-sprite-light-moon-fade-in.png) -268px -192px/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEIN0018_size{width:265px;height:189px}.LIGHTMOON_FADEIN0018_offset{background-position:-536px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEIN0018{background:url(/moon-sprite-light-moon-fade-in.png) -536px -192px/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEIN0019_size{width:265px;height:189px}.LIGHTMOON_FADEIN0019_offset{background-position:-536px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEIN0019{background:url(/moon-sprite-light-moon-fade-in.png) -536px -192px/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEIN0020_size{width:265px;height:189px}.LIGHTMOON_FADEIN0020_offset{background-position:-536px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEIN0020{background:url(/moon-sprite-light-moon-fade-in.png) -536px -192px/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEIN0021_size{width:265px;height:189px}.LIGHTMOON_FADEIN0021_offset{background-position:-804px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEIN0021{background:url(/moon-sprite-light-moon-fade-in.png) -804px -192px/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEIN0022_size{width:265px;height:189px}.LIGHTMOON_FADEIN0022_offset{background-position:-804px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEIN0022{background:url(/moon-sprite-light-moon-fade-in.png) -804px -192px/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEIN0023_size{width:265px;height:189px}.LIGHTMOON_FADEIN0023_offset{background-position:-1072px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEIN0023{background:url(/moon-sprite-light-moon-fade-in.png) -1072px -192px/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_FADE_OUT{background-image:url(/moon-sprite-light-moon-fade-out.png);background-repeat:no-repeat}.LIGHTMOON_FADEOUT0001_size{width:265px;height:189px}.LIGHTMOON_FADEOUT0001_offset{background-position:0 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEOUT0001{background:url(/moon-sprite-light-moon-fade-out.png) 0 0/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEOUT0002_size{width:265px;height:189px}.LIGHTMOON_FADEOUT0002_offset{background-position:-268px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEOUT0002{background:url(/moon-sprite-light-moon-fade-out.png) -268px 0/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEOUT0003_size{width:265px;height:189px}.LIGHTMOON_FADEOUT0003_offset{background-position:-268px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEOUT0003{background:url(/moon-sprite-light-moon-fade-out.png) -268px 0/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEOUT0004_size{width:265px;height:189px}.LIGHTMOON_FADEOUT0004_offset{background-position:-536px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEOUT0004{background:url(/moon-sprite-light-moon-fade-out.png) -536px 0/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEOUT0005_size{width:265px;height:189px}.LIGHTMOON_FADEOUT0005_offset{background-position:-536px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEOUT0005{background:url(/moon-sprite-light-moon-fade-out.png) -536px 0/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEOUT0006_size{width:265px;height:189px}.LIGHTMOON_FADEOUT0006_offset{background-position:-804px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEOUT0006{background:url(/moon-sprite-light-moon-fade-out.png) -804px 0/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEOUT0007_size{width:265px;height:189px}.LIGHTMOON_FADEOUT0007_offset{background-position:-804px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEOUT0007{background:url(/moon-sprite-light-moon-fade-out.png) -804px 0/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEOUT0008_size{width:265px;height:189px}.LIGHTMOON_FADEOUT0008_offset{background-position:-804px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEOUT0008{background:url(/moon-sprite-light-moon-fade-out.png) -804px 0/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEOUT0009_size{width:265px;height:189px}.LIGHTMOON_FADEOUT0009_offset{background-position:-1072px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEOUT0009{background:url(/moon-sprite-light-moon-fade-out.png) -1072px 0/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEOUT0010_size{width:265px;height:189px}.LIGHTMOON_FADEOUT0010_offset{background-position:-1072px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEOUT0010{background:url(/moon-sprite-light-moon-fade-out.png) -1072px 0/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEOUT0011_size{width:265px;height:189px}.LIGHTMOON_FADEOUT0011_offset{background-position:-1072px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEOUT0011{background:url(/moon-sprite-light-moon-fade-out.png) -1072px 0/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEOUT0012_size{width:265px;height:189px}.LIGHTMOON_FADEOUT0012_offset{background-position:0 -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEOUT0012{background:url(/moon-sprite-light-moon-fade-out.png) 0 -192px/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEOUT0013_size{width:265px;height:189px}.LIGHTMOON_FADEOUT0013_offset{background-position:0 -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEOUT0013{background:url(/moon-sprite-light-moon-fade-out.png) 0 -192px/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEOUT0014_size{width:265px;height:189px}.LIGHTMOON_FADEOUT0014_offset{background-position:0 -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEOUT0014{background:url(/moon-sprite-light-moon-fade-out.png) 0 -192px/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEOUT0015_size{width:265px;height:189px}.LIGHTMOON_FADEOUT0015_offset{background-position:-268px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEOUT0015{background:url(/moon-sprite-light-moon-fade-out.png) -268px -192px/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEOUT0016_size{width:265px;height:189px}.LIGHTMOON_FADEOUT0016_offset{background-position:-268px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEOUT0016{background:url(/moon-sprite-light-moon-fade-out.png) -268px -192px/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEOUT0017_size{width:265px;height:189px}.LIGHTMOON_FADEOUT0017_offset{background-position:-268px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEOUT0017{background:url(/moon-sprite-light-moon-fade-out.png) -268px -192px/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEOUT0018_size{width:265px;height:189px}.LIGHTMOON_FADEOUT0018_offset{background-position:-536px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEOUT0018{background:url(/moon-sprite-light-moon-fade-out.png) -536px -192px/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEOUT0019_size{width:265px;height:189px}.LIGHTMOON_FADEOUT0019_offset{background-position:-536px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEOUT0019{background:url(/moon-sprite-light-moon-fade-out.png) -536px -192px/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEOUT0020_size{width:265px;height:189px}.LIGHTMOON_FADEOUT0020_offset{background-position:-536px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEOUT0020{background:url(/moon-sprite-light-moon-fade-out.png) -536px -192px/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEOUT0021_size{width:265px;height:189px}.LIGHTMOON_FADEOUT0021_offset{background-position:-804px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEOUT0021{background:url(/moon-sprite-light-moon-fade-out.png) -804px -192px/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEOUT0022_size{width:265px;height:189px}.LIGHTMOON_FADEOUT0022_offset{background-position:-804px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEOUT0022{background:url(/moon-sprite-light-moon-fade-out.png) -804px -192px/1337px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_FADEOUT0023_size{width:265px;height:189px}.LIGHTMOON_FADEOUT0023_offset{background-position:-1072px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.LIGHTMOON_FADEOUT0023{background:url(/moon-sprite-light-moon-fade-out.png) -1072px -192px/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_HAPPY{background-image:url(/moon-sprite-light-moon-happy.png);background-repeat:no-repeat}.LIGHTMOON_HAPPY0001_size{width:265px;height:189px}.LIGHTMOON_HAPPY0001_offset{background-position:0 0;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0001{background:url(/moon-sprite-light-moon-happy.png) 0 0/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0002_size{width:265px;height:189px}.LIGHTMOON_HAPPY0002_offset{background-position:-268px 0;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0002{background:url(/moon-sprite-light-moon-happy.png) -268px 0/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0003_size{width:265px;height:189px}.LIGHTMOON_HAPPY0003_offset{background-position:-536px 0;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0003{background:url(/moon-sprite-light-moon-happy.png) -536px 0/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0004_size{width:265px;height:189px}.LIGHTMOON_HAPPY0004_offset{background-position:-536px 0;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0004{background:url(/moon-sprite-light-moon-happy.png) -536px 0/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0005_size{width:265px;height:189px}.LIGHTMOON_HAPPY0005_offset{background-position:0 -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0005{background:url(/moon-sprite-light-moon-happy.png) 0 -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0006_size{width:265px;height:189px}.LIGHTMOON_HAPPY0006_offset{background-position:0 -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0006{background:url(/moon-sprite-light-moon-happy.png) 0 -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0007_size{width:265px;height:189px}.LIGHTMOON_HAPPY0007_offset{background-position:-268px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0007{background:url(/moon-sprite-light-moon-happy.png) -268px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0008_size{width:265px;height:189px}.LIGHTMOON_HAPPY0008_offset{background-position:-268px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0008{background:url(/moon-sprite-light-moon-happy.png) -268px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0009_size{width:265px;height:189px}.LIGHTMOON_HAPPY0009_offset{background-position:-536px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0009{background:url(/moon-sprite-light-moon-happy.png) -536px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0010_size{width:265px;height:189px}.LIGHTMOON_HAPPY0010_offset{background-position:-536px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0010{background:url(/moon-sprite-light-moon-happy.png) -536px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0011_size{width:265px;height:189px}.LIGHTMOON_HAPPY0011_offset{background-position:-536px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0011{background:url(/moon-sprite-light-moon-happy.png) -536px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0012_size{width:265px;height:189px}.LIGHTMOON_HAPPY0012_offset{background-position:-536px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0012{background:url(/moon-sprite-light-moon-happy.png) -536px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0013_size{width:265px;height:189px}.LIGHTMOON_HAPPY0013_offset{background-position:-536px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0013{background:url(/moon-sprite-light-moon-happy.png) -536px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0014_size{width:265px;height:189px}.LIGHTMOON_HAPPY0014_offset{background-position:-536px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0014{background:url(/moon-sprite-light-moon-happy.png) -536px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0015_size{width:265px;height:189px}.LIGHTMOON_HAPPY0015_offset{background-position:-536px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0015{background:url(/moon-sprite-light-moon-happy.png) -536px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0016_size{width:265px;height:189px}.LIGHTMOON_HAPPY0016_offset{background-position:-536px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0016{background:url(/moon-sprite-light-moon-happy.png) -536px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0017_size{width:265px;height:189px}.LIGHTMOON_HAPPY0017_offset{background-position:-536px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0017{background:url(/moon-sprite-light-moon-happy.png) -536px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0018_size{width:265px;height:189px}.LIGHTMOON_HAPPY0018_offset{background-position:-536px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0018{background:url(/moon-sprite-light-moon-happy.png) -536px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0019_size{width:265px;height:189px}.LIGHTMOON_HAPPY0019_offset{background-position:-536px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0019{background:url(/moon-sprite-light-moon-happy.png) -536px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0020_size{width:265px;height:189px}.LIGHTMOON_HAPPY0020_offset{background-position:-536px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0020{background:url(/moon-sprite-light-moon-happy.png) -536px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0021_size{width:265px;height:189px}.LIGHTMOON_HAPPY0021_offset{background-position:-536px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0021{background:url(/moon-sprite-light-moon-happy.png) -536px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0022_size{width:265px;height:189px}.LIGHTMOON_HAPPY0022_offset{background-position:-536px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0022{background:url(/moon-sprite-light-moon-happy.png) -536px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0023_size{width:265px;height:189px}.LIGHTMOON_HAPPY0023_offset{background-position:-536px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0023{background:url(/moon-sprite-light-moon-happy.png) -536px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0024_size{width:265px;height:189px}.LIGHTMOON_HAPPY0024_offset{background-position:-536px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0024{background:url(/moon-sprite-light-moon-happy.png) -536px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0025_size{width:265px;height:189px}.LIGHTMOON_HAPPY0025_offset{background-position:-536px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0025{background:url(/moon-sprite-light-moon-happy.png) -536px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0026_size{width:265px;height:189px}.LIGHTMOON_HAPPY0026_offset{background-position:-536px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0026{background:url(/moon-sprite-light-moon-happy.png) -536px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0027_size{width:265px;height:189px}.LIGHTMOON_HAPPY0027_offset{background-position:-536px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0027{background:url(/moon-sprite-light-moon-happy.png) -536px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0028_size{width:265px;height:189px}.LIGHTMOON_HAPPY0028_offset{background-position:-536px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0028{background:url(/moon-sprite-light-moon-happy.png) -536px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0029_size{width:265px;height:189px}.LIGHTMOON_HAPPY0029_offset{background-position:-536px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0029{background:url(/moon-sprite-light-moon-happy.png) -536px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0030_size{width:265px;height:189px}.LIGHTMOON_HAPPY0030_offset{background-position:-268px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0030{background:url(/moon-sprite-light-moon-happy.png) -268px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0031_size{width:265px;height:189px}.LIGHTMOON_HAPPY0031_offset{background-position:-268px -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0031{background:url(/moon-sprite-light-moon-happy.png) -268px -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0032_size{width:265px;height:189px}.LIGHTMOON_HAPPY0032_offset{background-position:0 -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0032{background:url(/moon-sprite-light-moon-happy.png) 0 -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0033_size{width:265px;height:189px}.LIGHTMOON_HAPPY0033_offset{background-position:0 -192px;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0033{background:url(/moon-sprite-light-moon-happy.png) 0 -192px/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0034_size{width:265px;height:189px}.LIGHTMOON_HAPPY0034_offset{background-position:-536px 0;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0034{background:url(/moon-sprite-light-moon-happy.png) -536px 0/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0035_size{width:265px;height:189px}.LIGHTMOON_HAPPY0035_offset{background-position:-536px 0;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0035{background:url(/moon-sprite-light-moon-happy.png) -536px 0/801px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_HAPPY0036_size{width:265px;height:189px}.LIGHTMOON_HAPPY0036_offset{background-position:0 0;-webkit-background-size:801px 381px;background-size:801px 381px;width:265px;height:189px}.LIGHTMOON_HAPPY0036{background:url(/moon-sprite-light-moon-happy.png) 0 0/801px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_SAD{background-image:url(/moon-sprite-light-moon-sad.png);background-repeat:no-repeat}.LIGHTMOON_SAD0001_size{width:265px;height:189px}.LIGHTMOON_SAD0001_offset{background-position:0 0;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0001{background:url(/moon-sprite-light-moon-sad.png) 0 0/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0002_size{width:265px;height:189px}.LIGHTMOON_SAD0002_offset{background-position:-268px 0;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0002{background:url(/moon-sprite-light-moon-sad.png) -268px 0/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0003_size{width:265px;height:189px}.LIGHTMOON_SAD0003_offset{background-position:-536px 0;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0003{background:url(/moon-sprite-light-moon-sad.png) -536px 0/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0004_size{width:265px;height:189px}.LIGHTMOON_SAD0004_offset{background-position:-804px 0;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0004{background:url(/moon-sprite-light-moon-sad.png) -804px 0/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0005_size{width:265px;height:189px}.LIGHTMOON_SAD0005_offset{background-position:-804px 0;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0005{background:url(/moon-sprite-light-moon-sad.png) -804px 0/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0006_size{width:265px;height:189px}.LIGHTMOON_SAD0006_offset{background-position:0 -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0006{background:url(/moon-sprite-light-moon-sad.png) 0 -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0007_size{width:265px;height:189px}.LIGHTMOON_SAD0007_offset{background-position:0 -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0007{background:url(/moon-sprite-light-moon-sad.png) 0 -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0008_size{width:265px;height:189px}.LIGHTMOON_SAD0008_offset{background-position:-268px -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0008{background:url(/moon-sprite-light-moon-sad.png) -268px -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0009_size{width:265px;height:189px}.LIGHTMOON_SAD0009_offset{background-position:-268px -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0009{background:url(/moon-sprite-light-moon-sad.png) -268px -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0010_size{width:265px;height:189px}.LIGHTMOON_SAD0010_offset{background-position:-268px -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0010{background:url(/moon-sprite-light-moon-sad.png) -268px -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0011_size{width:265px;height:189px}.LIGHTMOON_SAD0011_offset{background-position:-268px -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0011{background:url(/moon-sprite-light-moon-sad.png) -268px -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0012_size{width:265px;height:189px}.LIGHTMOON_SAD0012_offset{background-position:-268px -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0012{background:url(/moon-sprite-light-moon-sad.png) -268px -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0013_size{width:265px;height:189px}.LIGHTMOON_SAD0013_offset{background-position:-268px -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0013{background:url(/moon-sprite-light-moon-sad.png) -268px -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0014_size{width:265px;height:189px}.LIGHTMOON_SAD0014_offset{background-position:-268px -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0014{background:url(/moon-sprite-light-moon-sad.png) -268px -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0015_size{width:265px;height:189px}.LIGHTMOON_SAD0015_offset{background-position:-268px -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0015{background:url(/moon-sprite-light-moon-sad.png) -268px -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0016_size{width:265px;height:189px}.LIGHTMOON_SAD0016_offset{background-position:-268px -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0016{background:url(/moon-sprite-light-moon-sad.png) -268px -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0017_size{width:265px;height:189px}.LIGHTMOON_SAD0017_offset{background-position:-268px -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0017{background:url(/moon-sprite-light-moon-sad.png) -268px -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0018_size{width:265px;height:189px}.LIGHTMOON_SAD0018_offset{background-position:-268px -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0018{background:url(/moon-sprite-light-moon-sad.png) -268px -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0019_size{width:265px;height:189px}.LIGHTMOON_SAD0019_offset{background-position:-268px -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0019{background:url(/moon-sprite-light-moon-sad.png) -268px -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0020_size{width:265px;height:189px}.LIGHTMOON_SAD0020_offset{background-position:-268px -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0020{background:url(/moon-sprite-light-moon-sad.png) -268px -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0021_size{width:265px;height:189px}.LIGHTMOON_SAD0021_offset{background-position:-268px -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0021{background:url(/moon-sprite-light-moon-sad.png) -268px -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0022_size{width:265px;height:189px}.LIGHTMOON_SAD0022_offset{background-position:-268px -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0022{background:url(/moon-sprite-light-moon-sad.png) -268px -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0023_size{width:265px;height:189px}.LIGHTMOON_SAD0023_offset{background-position:-268px -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0023{background:url(/moon-sprite-light-moon-sad.png) -268px -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0024_size{width:265px;height:189px}.LIGHTMOON_SAD0024_offset{background-position:-268px -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0024{background:url(/moon-sprite-light-moon-sad.png) -268px -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0025_size{width:265px;height:189px}.LIGHTMOON_SAD0025_offset{background-position:-268px -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0025{background:url(/moon-sprite-light-moon-sad.png) -268px -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0026_size{width:265px;height:189px}.LIGHTMOON_SAD0026_offset{background-position:-268px -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0026{background:url(/moon-sprite-light-moon-sad.png) -268px -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0027_size{width:265px;height:189px}.LIGHTMOON_SAD0027_offset{background-position:-268px -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0027{background:url(/moon-sprite-light-moon-sad.png) -268px -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0028_size{width:265px;height:189px}.LIGHTMOON_SAD0028_offset{background-position:-268px -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0028{background:url(/moon-sprite-light-moon-sad.png) -268px -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0029_size{width:265px;height:189px}.LIGHTMOON_SAD0029_offset{background-position:-268px -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0029{background:url(/moon-sprite-light-moon-sad.png) -268px -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0030_size{width:265px;height:189px}.LIGHTMOON_SAD0030_offset{background-position:0 -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0030{background:url(/moon-sprite-light-moon-sad.png) 0 -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0031_size{width:265px;height:189px}.LIGHTMOON_SAD0031_offset{background-position:0 -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0031{background:url(/moon-sprite-light-moon-sad.png) 0 -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0032_size{width:265px;height:189px}.LIGHTMOON_SAD0032_offset{background-position:-536px -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0032{background:url(/moon-sprite-light-moon-sad.png) -536px -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0033_size{width:265px;height:189px}.LIGHTMOON_SAD0033_offset{background-position:-536px -192px;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0033{background:url(/moon-sprite-light-moon-sad.png) -536px -192px/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0034_size{width:265px;height:189px}.LIGHTMOON_SAD0034_offset{background-position:-268px 0;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0034{background:url(/moon-sprite-light-moon-sad.png) -268px 0/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0035_size{width:265px;height:189px}.LIGHTMOON_SAD0035_offset{background-position:-268px 0;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0035{background:url(/moon-sprite-light-moon-sad.png) -268px 0/1069px 381px no-repeat;width:265px;height:189px}.LIGHTMOON_SAD0036_size{width:265px;height:189px}.LIGHTMOON_SAD0036_offset{background-position:0 0;-webkit-background-size:1069px 381px;background-size:1069px 381px;width:265px;height:189px}.LIGHTMOON_SAD0036{background:url(/moon-sprite-light-moon-sad.png) 0 0/1069px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WILDCARD_GIFT{background-image:url(/moon-sprite-light-moon-wildcard-gift.png);background-repeat:no-repeat}.LIGHTMOON_WILDCARDGIFT0001_size{width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0001_offset{background-position:0 0;-webkit-background-size:1596px 1525px;background-size:1596px 1525px;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0001{background:url(/moon-sprite-light-moon-wildcard-gift.png) 0 0/1596px 1525px no-repeat;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0002_size{width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0002_offset{background-position:-533px 0;-webkit-background-size:1596px 1525px;background-size:1596px 1525px;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0002{background:url(/moon-sprite-light-moon-wildcard-gift.png) -533px 0/1596px 1525px no-repeat;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0003_size{width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0003_offset{background-position:-533px 0;-webkit-background-size:1596px 1525px;background-size:1596px 1525px;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0003{background:url(/moon-sprite-light-moon-wildcard-gift.png) -533px 0/1596px 1525px no-repeat;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0004_size{width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0004_offset{background-position:-1066px 0;-webkit-background-size:1596px 1525px;background-size:1596px 1525px;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0004{background:url(/moon-sprite-light-moon-wildcard-gift.png) -1066px 0/1596px 1525px no-repeat;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0005_size{width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0005_offset{background-position:-1066px 0;-webkit-background-size:1596px 1525px;background-size:1596px 1525px;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0005{background:url(/moon-sprite-light-moon-wildcard-gift.png) -1066px 0/1596px 1525px no-repeat;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0006_size{width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0006_offset{background-position:0 -382px;-webkit-background-size:1596px 1525px;background-size:1596px 1525px;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0006{background:url(/moon-sprite-light-moon-wildcard-gift.png) 0 -382px/1596px 1525px no-repeat;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0007_size{width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0007_offset{background-position:0 -382px;-webkit-background-size:1596px 1525px;background-size:1596px 1525px;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0007{background:url(/moon-sprite-light-moon-wildcard-gift.png) 0 -382px/1596px 1525px no-repeat;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0008_size{width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0008_offset{background-position:-533px -382px;-webkit-background-size:1596px 1525px;background-size:1596px 1525px;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0008{background:url(/moon-sprite-light-moon-wildcard-gift.png) -533px -382px/1596px 1525px no-repeat;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0009_size{width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0009_offset{background-position:-533px -382px;-webkit-background-size:1596px 1525px;background-size:1596px 1525px;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0009{background:url(/moon-sprite-light-moon-wildcard-gift.png) -533px -382px/1596px 1525px no-repeat;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0010_size{width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0010_offset{background-position:-533px -382px;-webkit-background-size:1596px 1525px;background-size:1596px 1525px;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0010{background:url(/moon-sprite-light-moon-wildcard-gift.png) -533px -382px/1596px 1525px no-repeat;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0011_size{width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0011_offset{background-position:-1066px -382px;-webkit-background-size:1596px 1525px;background-size:1596px 1525px;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0011{background:url(/moon-sprite-light-moon-wildcard-gift.png) -1066px -382px/1596px 1525px no-repeat;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0012_size{width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0012_offset{background-position:-1066px -382px;-webkit-background-size:1596px 1525px;background-size:1596px 1525px;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0012{background:url(/moon-sprite-light-moon-wildcard-gift.png) -1066px -382px/1596px 1525px no-repeat;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0013_size{width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0013_offset{background-position:0 -764px;-webkit-background-size:1596px 1525px;background-size:1596px 1525px;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0013{background:url(/moon-sprite-light-moon-wildcard-gift.png) 0 -764px/1596px 1525px no-repeat;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0014_size{width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0014_offset{background-position:-533px -764px;-webkit-background-size:1596px 1525px;background-size:1596px 1525px;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0014{background:url(/moon-sprite-light-moon-wildcard-gift.png) -533px -764px/1596px 1525px no-repeat;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0015_size{width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0015_offset{background-position:-533px -764px;-webkit-background-size:1596px 1525px;background-size:1596px 1525px;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0015{background:url(/moon-sprite-light-moon-wildcard-gift.png) -533px -764px/1596px 1525px no-repeat;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0016_size{width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0016_offset{background-position:-1066px -764px;-webkit-background-size:1596px 1525px;background-size:1596px 1525px;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0016{background:url(/moon-sprite-light-moon-wildcard-gift.png) -1066px -764px/1596px 1525px no-repeat;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0017_size{width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0017_offset{background-position:-1066px -764px;-webkit-background-size:1596px 1525px;background-size:1596px 1525px;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0017{background:url(/moon-sprite-light-moon-wildcard-gift.png) -1066px -764px/1596px 1525px no-repeat;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0018_size{width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0018_offset{background-position:-1066px -764px;-webkit-background-size:1596px 1525px;background-size:1596px 1525px;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0018{background:url(/moon-sprite-light-moon-wildcard-gift.png) -1066px -764px/1596px 1525px no-repeat;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0019_size{width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0019_offset{background-position:0 -1146px;-webkit-background-size:1596px 1525px;background-size:1596px 1525px;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0019{background:url(/moon-sprite-light-moon-wildcard-gift.png) 0 -1146px/1596px 1525px no-repeat;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0020_size{width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0020_offset{background-position:0 -1146px;-webkit-background-size:1596px 1525px;background-size:1596px 1525px;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0020{background:url(/moon-sprite-light-moon-wildcard-gift.png) 0 -1146px/1596px 1525px no-repeat;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0021_size{width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0021_offset{background-position:-533px -1146px;-webkit-background-size:1596px 1525px;background-size:1596px 1525px;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0021{background:url(/moon-sprite-light-moon-wildcard-gift.png) -533px -1146px/1596px 1525px no-repeat;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0022_size{width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0022_offset{background-position:-533px -1146px;-webkit-background-size:1596px 1525px;background-size:1596px 1525px;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0022{background:url(/moon-sprite-light-moon-wildcard-gift.png) -533px -1146px/1596px 1525px no-repeat;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0023_size{width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0023_offset{background-position:-1066px -1146px;-webkit-background-size:1596px 1525px;background-size:1596px 1525px;width:530px;height:379px}.LIGHTMOON_WILDCARDGIFT0023{background:url(/moon-sprite-light-moon-wildcard-gift.png) -1066px -1146px/1596px 1525px no-repeat;width:530px;height:379px}.MOON_SPRITE_LIGHT_MOON_WIN{background-image:url(/moon-sprite-light-moon-win.png);background-repeat:no-repeat}.LIGHTMOON_WIN0001_size{width:265px;height:189px}.LIGHTMOON_WIN0001_offset{background-position:0 0;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WIN0001{background:url(/moon-sprite-light-moon-win.png) 0 0/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WIN0002_size{width:265px;height:189px}.LIGHTMOON_WIN0002_offset{background-position:-268px 0;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WIN0002{background:url(/moon-sprite-light-moon-win.png) -268px 0/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WIN0003_size{width:265px;height:189px}.LIGHTMOON_WIN0003_offset{background-position:-268px 0;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WIN0003{background:url(/moon-sprite-light-moon-win.png) -268px 0/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WIN0004_size{width:265px;height:189px}.LIGHTMOON_WIN0004_offset{background-position:-268px 0;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WIN0004{background:url(/moon-sprite-light-moon-win.png) -268px 0/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WIN0005_size{width:265px;height:189px}.LIGHTMOON_WIN0005_offset{background-position:-536px 0;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WIN0005{background:url(/moon-sprite-light-moon-win.png) -536px 0/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WIN0006_size{width:265px;height:189px}.LIGHTMOON_WIN0006_offset{background-position:-536px 0;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WIN0006{background:url(/moon-sprite-light-moon-win.png) -536px 0/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WIN0007_size{width:265px;height:189px}.LIGHTMOON_WIN0007_offset{background-position:-536px 0;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WIN0007{background:url(/moon-sprite-light-moon-win.png) -536px 0/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WIN0008_size{width:265px;height:189px}.LIGHTMOON_WIN0008_offset{background-position:-804px 0;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WIN0008{background:url(/moon-sprite-light-moon-win.png) -804px 0/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WIN0009_size{width:265px;height:189px}.LIGHTMOON_WIN0009_offset{background-position:-804px 0;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WIN0009{background:url(/moon-sprite-light-moon-win.png) -804px 0/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WIN0010_size{width:265px;height:189px}.LIGHTMOON_WIN0010_offset{background-position:-804px 0;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WIN0010{background:url(/moon-sprite-light-moon-win.png) -804px 0/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WIN0011_size{width:265px;height:189px}.LIGHTMOON_WIN0011_offset{background-position:-1072px 0;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WIN0011{background:url(/moon-sprite-light-moon-win.png) -1072px 0/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WIN0012_size{width:265px;height:189px}.LIGHTMOON_WIN0012_offset{background-position:-1072px 0;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WIN0012{background:url(/moon-sprite-light-moon-win.png) -1072px 0/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WIN0013_size{width:265px;height:189px}.LIGHTMOON_WIN0013_offset{background-position:-1072px 0;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WIN0013{background:url(/moon-sprite-light-moon-win.png) -1072px 0/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WIN0014_size{width:265px;height:189px}.LIGHTMOON_WIN0014_offset{background-position:-1340px 0;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WIN0014{background:url(/moon-sprite-light-moon-win.png) -1340px 0/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0001_size{width:265px;height:189px}.LIGHTMOON_WINFADEOUT0001_offset{background-position:-1340px 0;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0001{background:url(/moon-sprite-light-moon-win.png) -1340px 0/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0002_size{width:265px;height:189px}.LIGHTMOON_WINFADEOUT0002_offset{background-position:0 -192px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0002{background:url(/moon-sprite-light-moon-win.png) 0 -192px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0003_size{width:265px;height:189px}.LIGHTMOON_WINFADEOUT0003_offset{background-position:0 -192px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0003{background:url(/moon-sprite-light-moon-win.png) 0 -192px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0004_size{width:265px;height:189px}.LIGHTMOON_WINFADEOUT0004_offset{background-position:0 -192px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0004{background:url(/moon-sprite-light-moon-win.png) 0 -192px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0005_size{width:265px;height:189px}.LIGHTMOON_WINFADEOUT0005_offset{background-position:-268px -192px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0005{background:url(/moon-sprite-light-moon-win.png) -268px -192px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0006_size{width:265px;height:189px}.LIGHTMOON_WINFADEOUT0006_offset{background-position:-268px -192px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0006{background:url(/moon-sprite-light-moon-win.png) -268px -192px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0007_size{width:265px;height:189px}.LIGHTMOON_WINFADEOUT0007_offset{background-position:-268px -192px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0007{background:url(/moon-sprite-light-moon-win.png) -268px -192px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0008_size{width:265px;height:189px}.LIGHTMOON_WINFADEOUT0008_offset{background-position:-536px -192px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0008{background:url(/moon-sprite-light-moon-win.png) -536px -192px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0009_size{width:265px;height:189px}.LIGHTMOON_WINFADEOUT0009_offset{background-position:-536px -192px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0009{background:url(/moon-sprite-light-moon-win.png) -536px -192px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0010_size{width:265px;height:189px}.LIGHTMOON_WINFADEOUT0010_offset{background-position:-536px -192px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0010{background:url(/moon-sprite-light-moon-win.png) -536px -192px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0011_size{width:265px;height:189px}.LIGHTMOON_WINFADEOUT0011_offset{background-position:-804px -192px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0011{background:url(/moon-sprite-light-moon-win.png) -804px -192px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0012_size{width:265px;height:189px}.LIGHTMOON_WINFADEOUT0012_offset{background-position:-804px -192px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0012{background:url(/moon-sprite-light-moon-win.png) -804px -192px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0013_size{width:265px;height:189px}.LIGHTMOON_WINFADEOUT0013_offset{background-position:-804px -192px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0013{background:url(/moon-sprite-light-moon-win.png) -804px -192px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0014_size{width:265px;height:189px}.LIGHTMOON_WINFADEOUT0014_offset{background-position:-1072px -192px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0014{background:url(/moon-sprite-light-moon-win.png) -1072px -192px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0015_size{width:265px;height:189px}.LIGHTMOON_WINFADEOUT0015_offset{background-position:-1072px -192px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0015{background:url(/moon-sprite-light-moon-win.png) -1072px -192px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0016_size{width:265px;height:189px}.LIGHTMOON_WINFADEOUT0016_offset{background-position:-1072px -192px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0016{background:url(/moon-sprite-light-moon-win.png) -1072px -192px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0017_size{width:265px;height:189px}.LIGHTMOON_WINFADEOUT0017_offset{background-position:-1340px -192px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0017{background:url(/moon-sprite-light-moon-win.png) -1340px -192px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0018_size{width:265px;height:189px}.LIGHTMOON_WINFADEOUT0018_offset{background-position:-1340px -192px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0018{background:url(/moon-sprite-light-moon-win.png) -1340px -192px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0019_size{width:265px;height:189px}.LIGHTMOON_WINFADEOUT0019_offset{background-position:-1340px -192px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0019{background:url(/moon-sprite-light-moon-win.png) -1340px -192px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0020_size{width:265px;height:189px}.LIGHTMOON_WINFADEOUT0020_offset{background-position:0 -384px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0020{background:url(/moon-sprite-light-moon-win.png) 0 -384px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0021_size{width:265px;height:189px}.LIGHTMOON_WINFADEOUT0021_offset{background-position:0 -384px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0021{background:url(/moon-sprite-light-moon-win.png) 0 -384px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0022_size{width:265px;height:189px}.LIGHTMOON_WINFADEOUT0022_offset{background-position:-268px -384px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0022{background:url(/moon-sprite-light-moon-win.png) -268px -384px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0023_size{width:265px;height:189px}.LIGHTMOON_WINFADEOUT0023_offset{background-position:-268px -384px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0023{background:url(/moon-sprite-light-moon-win.png) -268px -384px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0024_size{width:265px;height:189px}.LIGHTMOON_WINFADEOUT0024_offset{background-position:-536px -384px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINFADEOUT0024{background:url(/moon-sprite-light-moon-win.png) -536px -384px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINIDLE0001_size{width:265px;height:189px}.LIGHTMOON_WINIDLE0001_offset{background-position:-1340px 0;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINIDLE0001{background:url(/moon-sprite-light-moon-win.png) -1340px 0/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINIDLE0002_size{width:265px;height:189px}.LIGHTMOON_WINIDLE0002_offset{background-position:-1340px 0;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINIDLE0002{background:url(/moon-sprite-light-moon-win.png) -1340px 0/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINIDLE0003_size{width:265px;height:189px}.LIGHTMOON_WINIDLE0003_offset{background-position:-1340px 0;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINIDLE0003{background:url(/moon-sprite-light-moon-win.png) -1340px 0/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINIDLE0004_size{width:265px;height:189px}.LIGHTMOON_WINIDLE0004_offset{background-position:-804px -384px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINIDLE0004{background:url(/moon-sprite-light-moon-win.png) -804px -384px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINIDLE0005_size{width:265px;height:189px}.LIGHTMOON_WINIDLE0005_offset{background-position:-804px -384px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINIDLE0005{background:url(/moon-sprite-light-moon-win.png) -804px -384px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINIDLE0006_size{width:265px;height:189px}.LIGHTMOON_WINIDLE0006_offset{background-position:-804px -384px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINIDLE0006{background:url(/moon-sprite-light-moon-win.png) -804px -384px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINIDLE0007_size{width:265px;height:189px}.LIGHTMOON_WINIDLE0007_offset{background-position:-1072px -384px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINIDLE0007{background:url(/moon-sprite-light-moon-win.png) -1072px -384px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINIDLE0008_size{width:265px;height:189px}.LIGHTMOON_WINIDLE0008_offset{background-position:-1072px -384px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINIDLE0008{background:url(/moon-sprite-light-moon-win.png) -1072px -384px/1605px 573px no-repeat;width:265px;height:189px}.LIGHTMOON_WINIDLE0009_size{width:265px;height:189px}.LIGHTMOON_WINIDLE0009_offset{background-position:-1072px -384px;-webkit-background-size:1605px 573px;background-size:1605px 573px;width:265px;height:189px}.LIGHTMOON_WINIDLE0009{background:url(/moon-sprite-light-moon-win.png) -1072px -384px/1605px 573px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT{background-image:url(/moon-sprite-light-moon-win-fade-out.png);background-repeat:no-repeat}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0001_size{width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0001_offset{background-position:0 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0001{background:url(/moon-sprite-light-moon-win-fade-out.png) 0 0/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0002_size{width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0002_offset{background-position:-268px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0002{background:url(/moon-sprite-light-moon-win-fade-out.png) -268px 0/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0003_size{width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0003_offset{background-position:-268px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0003{background:url(/moon-sprite-light-moon-win-fade-out.png) -268px 0/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0004_size{width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0004_offset{background-position:-268px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0004{background:url(/moon-sprite-light-moon-win-fade-out.png) -268px 0/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0005_size{width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0005_offset{background-position:-536px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0005{background:url(/moon-sprite-light-moon-win-fade-out.png) -536px 0/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0006_size{width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0006_offset{background-position:-536px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0006{background:url(/moon-sprite-light-moon-win-fade-out.png) -536px 0/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0007_size{width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0007_offset{background-position:-536px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0007{background:url(/moon-sprite-light-moon-win-fade-out.png) -536px 0/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0008_size{width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0008_offset{background-position:-804px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0008{background:url(/moon-sprite-light-moon-win-fade-out.png) -804px 0/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0009_size{width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0009_offset{background-position:-804px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0009{background:url(/moon-sprite-light-moon-win-fade-out.png) -804px 0/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0010_size{width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0010_offset{background-position:-804px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0010{background:url(/moon-sprite-light-moon-win-fade-out.png) -804px 0/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0011_size{width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0011_offset{background-position:-1072px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0011{background:url(/moon-sprite-light-moon-win-fade-out.png) -1072px 0/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0012_size{width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0012_offset{background-position:-1072px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0012{background:url(/moon-sprite-light-moon-win-fade-out.png) -1072px 0/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0013_size{width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0013_offset{background-position:-1072px 0;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0013{background:url(/moon-sprite-light-moon-win-fade-out.png) -1072px 0/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0014_size{width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0014_offset{background-position:0 -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0014{background:url(/moon-sprite-light-moon-win-fade-out.png) 0 -192px/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0015_size{width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0015_offset{background-position:0 -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0015{background:url(/moon-sprite-light-moon-win-fade-out.png) 0 -192px/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0016_size{width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0016_offset{background-position:0 -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0016{background:url(/moon-sprite-light-moon-win-fade-out.png) 0 -192px/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0017_size{width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0017_offset{background-position:-268px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0017{background:url(/moon-sprite-light-moon-win-fade-out.png) -268px -192px/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0018_size{width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0018_offset{background-position:-268px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0018{background:url(/moon-sprite-light-moon-win-fade-out.png) -268px -192px/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0019_size{width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0019_offset{background-position:-268px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0019{background:url(/moon-sprite-light-moon-win-fade-out.png) -268px -192px/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0020_size{width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0020_offset{background-position:-536px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0020{background:url(/moon-sprite-light-moon-win-fade-out.png) -536px -192px/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0021_size{width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0021_offset{background-position:-536px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0021{background:url(/moon-sprite-light-moon-win-fade-out.png) -536px -192px/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0022_size{width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0022_offset{background-position:-804px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0022{background:url(/moon-sprite-light-moon-win-fade-out.png) -804px -192px/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0023_size{width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0023_offset{background-position:-804px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0023{background:url(/moon-sprite-light-moon-win-fade-out.png) -804px -192px/1337px 381px no-repeat;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0024_size{width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0024_offset{background-position:-1072px -192px;-webkit-background-size:1337px 381px;background-size:1337px 381px;width:265px;height:189px}.MOON_SPRITE_LIGHT_MOON_WIN_FADE_OUT_LIGHTMOON_WINFADEOUT0024{background:url(/moon-sprite-light-moon-win-fade-out.png) -1072px -192px/1337px 381px no-repeat;width:265px;height:189px}.CARDS_SPRITE{background-image:url(/cards-sprite.png);background-repeat:no-repeat}.BOARDSLOT_size{width:50px;height:50px}.BOARDSLOT_offset{background-position:-927px -203px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:50px;height:50px}.BOARDSLOT{background:url(/cards-sprite.png) -927px -203px/1012px 509px no-repeat;width:50px;height:50px}.BACK_size{width:100px;height:100px}.BACK_offset{background-position:0 -203px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.BACK{background:url(/cards-sprite.png) 0 -203px/1012px 509px no-repeat;width:100px;height:100px}.BACK2X_size{width:200px;height:200px}.BACK2X_offset{background-position:0 0;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:200px;height:200px}.BACK2X{background:url(/cards-sprite.png) 0 0/1012px 509px no-repeat;width:200px;height:200px}.PHASE1_DARK_size{width:100px;height:100px}.PHASE1_DARK_offset{background-position:-103px -203px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.PHASE1_DARK{background:url(/cards-sprite.png) -103px -203px/1012px 509px no-repeat;width:100px;height:100px}.PHASE1_LIGHT_size{width:100px;height:100px}.PHASE1_LIGHT_offset{background-position:-206px -203px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.PHASE1_LIGHT{background:url(/cards-sprite.png) -206px -203px/1012px 509px no-repeat;width:100px;height:100px}.PHASE1_NEUTRAL_size{width:100px;height:100px}.PHASE1_NEUTRAL_offset{background-position:-309px -203px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.PHASE1_NEUTRAL{background:url(/cards-sprite.png) -309px -203px/1012px 509px no-repeat;width:100px;height:100px}.PHASE2_DARK_size{width:100px;height:100px}.PHASE2_DARK_offset{background-position:-412px -203px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.PHASE2_DARK{background:url(/cards-sprite.png) -412px -203px/1012px 509px no-repeat;width:100px;height:100px}.PHASE2_LIGHT_size{width:100px;height:100px}.PHASE2_LIGHT_offset{background-position:-515px -203px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.PHASE2_LIGHT{background:url(/cards-sprite.png) -515px -203px/1012px 509px no-repeat;width:100px;height:100px}.PHASE2_NEUTRAL_size{width:100px;height:100px}.PHASE2_NEUTRAL_offset{background-position:-618px -203px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.PHASE2_NEUTRAL{background:url(/cards-sprite.png) -618px -203px/1012px 509px no-repeat;width:100px;height:100px}.PHASE3_DARK_size{width:100px;height:100px}.PHASE3_DARK_offset{background-position:-721px -203px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.PHASE3_DARK{background:url(/cards-sprite.png) -721px -203px/1012px 509px no-repeat;width:100px;height:100px}.PHASE3_LIGHT_size{width:100px;height:100px}.PHASE3_LIGHT_offset{background-position:-824px -203px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.PHASE3_LIGHT{background:url(/cards-sprite.png) -824px -203px/1012px 509px no-repeat;width:100px;height:100px}.PHASE3_NEUTRAL_size{width:100px;height:100px}.PHASE3_NEUTRAL_offset{background-position:0 -306px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.PHASE3_NEUTRAL{background:url(/cards-sprite.png) 0 -306px/1012px 509px no-repeat;width:100px;height:100px}.PHASE4_DARK_size{width:100px;height:100px}.PHASE4_DARK_offset{background-position:-103px -306px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.PHASE4_DARK{background:url(/cards-sprite.png) -103px -306px/1012px 509px no-repeat;width:100px;height:100px}.PHASE4_LIGHT_size{width:100px;height:100px}.PHASE4_LIGHT_offset{background-position:-206px -306px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.PHASE4_LIGHT{background:url(/cards-sprite.png) -206px -306px/1012px 509px no-repeat;width:100px;height:100px}.PHASE4_NEUTRAL_size{width:100px;height:100px}.PHASE4_NEUTRAL_offset{background-position:-309px -306px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.PHASE4_NEUTRAL{background:url(/cards-sprite.png) -309px -306px/1012px 509px no-repeat;width:100px;height:100px}.PHASE5_DARK_size{width:100px;height:100px}.PHASE5_DARK_offset{background-position:-412px -306px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.PHASE5_DARK{background:url(/cards-sprite.png) -412px -306px/1012px 509px no-repeat;width:100px;height:100px}.PHASE5_LIGHT_size{width:100px;height:100px}.PHASE5_LIGHT_offset{background-position:-515px -306px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.PHASE5_LIGHT{background:url(/cards-sprite.png) -515px -306px/1012px 509px no-repeat;width:100px;height:100px}.PHASE5_NEUTRAL_size{width:100px;height:100px}.PHASE5_NEUTRAL_offset{background-position:-618px -306px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.PHASE5_NEUTRAL{background:url(/cards-sprite.png) -618px -306px/1012px 509px no-repeat;width:100px;height:100px}.PHASE6_DARK_size{width:100px;height:100px}.PHASE6_DARK_offset{background-position:-721px -306px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.PHASE6_DARK{background:url(/cards-sprite.png) -721px -306px/1012px 509px no-repeat;width:100px;height:100px}.PHASE6_LIGHT_size{width:100px;height:100px}.PHASE6_LIGHT_offset{background-position:-824px -306px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.PHASE6_LIGHT{background:url(/cards-sprite.png) -824px -306px/1012px 509px no-repeat;width:100px;height:100px}.PHASE6_NEUTRAL_size{width:100px;height:100px}.PHASE6_NEUTRAL_offset{background-position:0 -409px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.PHASE6_NEUTRAL{background:url(/cards-sprite.png) 0 -409px/1012px 509px no-repeat;width:100px;height:100px}.PHASE7_DARK_size{width:100px;height:100px}.PHASE7_DARK_offset{background-position:-103px -409px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.PHASE7_DARK{background:url(/cards-sprite.png) -103px -409px/1012px 509px no-repeat;width:100px;height:100px}.PHASE7_LIGHT_size{width:100px;height:100px}.PHASE7_LIGHT_offset{background-position:-206px -409px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.PHASE7_LIGHT{background:url(/cards-sprite.png) -206px -409px/1012px 509px no-repeat;width:100px;height:100px}.PHASE7_NEUTRAL_size{width:100px;height:100px}.PHASE7_NEUTRAL_offset{background-position:-309px -409px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.PHASE7_NEUTRAL{background:url(/cards-sprite.png) -309px -409px/1012px 509px no-repeat;width:100px;height:100px}.PHASE8_DARK_size{width:100px;height:100px}.PHASE8_DARK_offset{background-position:-412px -409px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.PHASE8_DARK{background:url(/cards-sprite.png) -412px -409px/1012px 509px no-repeat;width:100px;height:100px}.PHASE8_LIGHT_size{width:100px;height:100px}.PHASE8_LIGHT_offset{background-position:-515px -409px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.PHASE8_LIGHT{background:url(/cards-sprite.png) -515px -409px/1012px 509px no-repeat;width:100px;height:100px}.PHASE8_NEUTRAL_size{width:100px;height:100px}.PHASE8_NEUTRAL_offset{background-position:-618px -409px;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:100px;height:100px}.PHASE8_NEUTRAL{background:url(/cards-sprite.png) -618px -409px/1012px 509px no-repeat;width:100px;height:100px}.WILDCARD_OCTOBER_HUNTERMOON_size{width:200px;height:200px}.WILDCARD_OCTOBER_HUNTERMOON_offset{background-position:-203px 0;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:200px;height:200px}.WILDCARD_OCTOBER_HUNTERMOON{background:url(/cards-sprite.png) -203px 0/1012px 509px no-repeat;width:200px;height:200px}.WILDCARD_OCTOBER_METEOR_size{width:200px;height:200px}.WILDCARD_OCTOBER_METEOR_offset{background-position:-406px 0;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:200px;height:200px}.WILDCARD_OCTOBER_METEOR{background:url(/cards-sprite.png) -406px 0/1012px 509px no-repeat;width:200px;height:200px}.WILDCARD_OCTOBER_SCORPIO_size{width:200px;height:200px}.WILDCARD_OCTOBER_SCORPIO_offset{background-position:-609px 0;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:200px;height:200px}.WILDCARD_OCTOBER_SCORPIO{background:url(/cards-sprite.png) -609px 0/1012px 509px no-repeat;width:200px;height:200px}.WILDCARD_OCTOBER_SUPERMOON_size{width:200px;height:200px}.WILDCARD_OCTOBER_SUPERMOON_offset{background-position:-812px 0;-webkit-background-size:1012px 509px;background-size:1012px 509px;width:200px;height:200px}.WILDCARD_OCTOBER_SUPERMOON{background:url(/cards-sprite.png) -812px 0/1012px 509px no-repeat;width:200px;height:200px}.SPINNER_SPRITE{background-image:url(/spinner-sprite.png);background-repeat:no-repeat}.HM_SPINNER_00_size{width:150px;height:150px}.HM_SPINNER_00_offset{background-position:0 0;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_00{background:url(/spinner-sprite.png) 0 0/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_01_size{width:150px;height:150px}.HM_SPINNER_01_offset{background-position:-153px 0;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_01{background:url(/spinner-sprite.png) -153px 0/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_02_size{width:150px;height:150px}.HM_SPINNER_02_offset{background-position:-306px 0;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_02{background:url(/spinner-sprite.png) -306px 0/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_03_size{width:150px;height:150px}.HM_SPINNER_03_offset{background-position:-459px 0;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_03{background:url(/spinner-sprite.png) -459px 0/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_04_size{width:150px;height:150px}.HM_SPINNER_04_offset{background-position:-612px 0;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_04{background:url(/spinner-sprite.png) -612px 0/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_05_size{width:150px;height:150px}.HM_SPINNER_05_offset{background-position:-765px 0;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_05{background:url(/spinner-sprite.png) -765px 0/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_06_size{width:150px;height:150px}.HM_SPINNER_06_offset{background-position:-918px 0;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_06{background:url(/spinner-sprite.png) -918px 0/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_07_size{width:150px;height:150px}.HM_SPINNER_07_offset{background-position:-1071px 0;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_07{background:url(/spinner-sprite.png) -1071px 0/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_08_size{width:150px;height:150px}.HM_SPINNER_08_offset{background-position:-1224px 0;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_08{background:url(/spinner-sprite.png) -1224px 0/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_09_size{width:150px;height:150px}.HM_SPINNER_09_offset{background-position:-1377px 0;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_09{background:url(/spinner-sprite.png) -1377px 0/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_10_size{width:150px;height:150px}.HM_SPINNER_10_offset{background-position:-1530px 0;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_10{background:url(/spinner-sprite.png) -1530px 0/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_11_size{width:150px;height:150px}.HM_SPINNER_11_offset{background-position:-1683px 0;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_11{background:url(/spinner-sprite.png) -1683px 0/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_12_size{width:150px;height:150px}.HM_SPINNER_12_offset{background-position:-1836px 0;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_12{background:url(/spinner-sprite.png) -1836px 0/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_13_size{width:150px;height:150px}.HM_SPINNER_13_offset{background-position:0 -153px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_13{background:url(/spinner-sprite.png) 0 -153px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_14_size{width:150px;height:150px}.HM_SPINNER_14_offset{background-position:-153px -153px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_14{background:url(/spinner-sprite.png) -153px -153px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_15_size{width:150px;height:150px}.HM_SPINNER_15_offset{background-position:-306px -153px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_15{background:url(/spinner-sprite.png) -306px -153px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_16_size{width:150px;height:150px}.HM_SPINNER_16_offset{background-position:-459px -153px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_16{background:url(/spinner-sprite.png) -459px -153px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_17_size{width:150px;height:150px}.HM_SPINNER_17_offset{background-position:-612px -153px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_17{background:url(/spinner-sprite.png) -612px -153px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_18_size{width:150px;height:150px}.HM_SPINNER_18_offset{background-position:-765px -153px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_18{background:url(/spinner-sprite.png) -765px -153px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_19_size{width:150px;height:150px}.HM_SPINNER_19_offset{background-position:-918px -153px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_19{background:url(/spinner-sprite.png) -918px -153px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_20_size{width:150px;height:150px}.HM_SPINNER_20_offset{background-position:-1071px -153px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_20{background:url(/spinner-sprite.png) -1071px -153px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_21_size{width:150px;height:150px}.HM_SPINNER_21_offset{background-position:-1224px -153px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_21{background:url(/spinner-sprite.png) -1224px -153px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_22_size{width:150px;height:150px}.HM_SPINNER_22_offset{background-position:-1377px -153px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_22{background:url(/spinner-sprite.png) -1377px -153px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_23_size{width:150px;height:150px}.HM_SPINNER_23_offset{background-position:-1530px -153px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_23{background:url(/spinner-sprite.png) -1530px -153px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_24_size{width:150px;height:150px}.HM_SPINNER_24_offset{background-position:-1683px -153px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_24{background:url(/spinner-sprite.png) -1683px -153px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_25_size{width:150px;height:150px}.HM_SPINNER_25_offset{background-position:-1836px -153px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_25{background:url(/spinner-sprite.png) -1836px -153px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_26_size{width:150px;height:150px}.HM_SPINNER_26_offset{background-position:0 -306px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_26{background:url(/spinner-sprite.png) 0 -306px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_27_size{width:150px;height:150px}.HM_SPINNER_27_offset{background-position:-153px -306px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_27{background:url(/spinner-sprite.png) -153px -306px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_28_size{width:150px;height:150px}.HM_SPINNER_28_offset{background-position:-306px -306px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_28{background:url(/spinner-sprite.png) -306px -306px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_29_size{width:150px;height:150px}.HM_SPINNER_29_offset{background-position:-459px -306px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_29{background:url(/spinner-sprite.png) -459px -306px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_30_size{width:150px;height:150px}.HM_SPINNER_30_offset{background-position:-1530px 0;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_30{background:url(/spinner-sprite.png) -1530px 0/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_31_size{width:150px;height:150px}.HM_SPINNER_31_offset{background-position:-612px -306px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_31{background:url(/spinner-sprite.png) -612px -306px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_32_size{width:150px;height:150px}.HM_SPINNER_32_offset{background-position:-765px -306px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_32{background:url(/spinner-sprite.png) -765px -306px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_33_size{width:150px;height:150px}.HM_SPINNER_33_offset{background-position:-918px -306px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_33{background:url(/spinner-sprite.png) -918px -306px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_34_size{width:150px;height:150px}.HM_SPINNER_34_offset{background-position:-1071px -306px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_34{background:url(/spinner-sprite.png) -1071px -306px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_35_size{width:150px;height:150px}.HM_SPINNER_35_offset{background-position:-1224px -306px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_35{background:url(/spinner-sprite.png) -1224px -306px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_36_size{width:150px;height:150px}.HM_SPINNER_36_offset{background-position:-1377px -306px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_36{background:url(/spinner-sprite.png) -1377px -306px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_37_size{width:150px;height:150px}.HM_SPINNER_37_offset{background-position:-1530px -306px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_37{background:url(/spinner-sprite.png) -1530px -306px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_38_size{width:150px;height:150px}.HM_SPINNER_38_offset{background-position:-1683px -306px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_38{background:url(/spinner-sprite.png) -1683px -306px/1986px 456px no-repeat;width:150px;height:150px}.HM_SPINNER_39_size{width:150px;height:150px}.HM_SPINNER_39_offset{background-position:-1836px -306px;-webkit-background-size:1986px 456px;background-size:1986px 456px;width:150px;height:150px}.HM_SPINNER_39{background:url(/spinner-sprite.png) -1836px -306px/1986px 456px no-repeat;width:150px;height:150px}.PROGRESS_EMPTY_SPRITE{background-image:url(/progress-empty-sprite.png);background-repeat:no-repeat}.STAR1_EMPTY_IDLE_size{width:113px;height:113px}.STAR1_EMPTY_IDLE_offset{background-position:-1910px 0;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:113px;height:113px}.STAR1_EMPTY_IDLE{background:url(/progress-empty-sprite.png) -1910px 0/2023px 802px no-repeat;width:113px;height:113px}.STAR1_EMPTY_INOUT_1000_size{width:113px;height:113px}.STAR1_EMPTY_INOUT_1000_offset{background-position:-1910px -116px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:113px;height:113px}.STAR1_EMPTY_INOUT_1000{background:url(/progress-empty-sprite.png) -1910px -116px/2023px 802px no-repeat;width:113px;height:113px}.STAR1_EMPTY_INOUT_1001_size{width:113px;height:113px}.STAR1_EMPTY_INOUT_1001_offset{background-position:-1910px -232px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:113px;height:113px}.STAR1_EMPTY_INOUT_1001{background:url(/progress-empty-sprite.png) -1910px -232px/2023px 802px no-repeat;width:113px;height:113px}.STAR1_EMPTY_INOUT_1002_size{width:113px;height:113px}.STAR1_EMPTY_INOUT_1002_offset{background-position:-1910px -348px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:113px;height:113px}.STAR1_EMPTY_INOUT_1002{background:url(/progress-empty-sprite.png) -1910px -348px/2023px 802px no-repeat;width:113px;height:113px}.STAR1_EMPTY_INOUT_1003_size{width:113px;height:113px}.STAR1_EMPTY_INOUT_1003_offset{background-position:-1910px -464px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:113px;height:113px}.STAR1_EMPTY_INOUT_1003{background:url(/progress-empty-sprite.png) -1910px -464px/2023px 802px no-repeat;width:113px;height:113px}.STAR1_EMPTY_INOUT_1004_size{width:113px;height:113px}.STAR1_EMPTY_INOUT_1004_offset{background-position:-955px -573px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:113px;height:113px}.STAR1_EMPTY_INOUT_1004{background:url(/progress-empty-sprite.png) -955px -573px/2023px 802px no-repeat;width:113px;height:113px}.STAR1_EMPTY_INOUT_1005_size{width:113px;height:113px}.STAR1_EMPTY_INOUT_1005_offset{background-position:-1071px -573px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:113px;height:113px}.STAR1_EMPTY_INOUT_1005{background:url(/progress-empty-sprite.png) -1071px -573px/2023px 802px no-repeat;width:113px;height:113px}.STAR1_EMPTY_INOUT_1006_size{width:113px;height:113px}.STAR1_EMPTY_INOUT_1006_offset{background-position:-1187px -573px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:113px;height:113px}.STAR1_EMPTY_INOUT_1006{background:url(/progress-empty-sprite.png) -1187px -573px/2023px 802px no-repeat;width:113px;height:113px}.STAR1_EMPTY_INOUT_1007_size{width:113px;height:113px}.STAR1_EMPTY_INOUT_1007_offset{background-position:-1303px -573px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:113px;height:113px}.STAR1_EMPTY_INOUT_1007{background:url(/progress-empty-sprite.png) -1303px -573px/2023px 802px no-repeat;width:113px;height:113px}.STAR1_EMPTY_INOUT_1008_size{width:113px;height:113px}.STAR1_EMPTY_INOUT_1008_offset{background-position:-1419px -573px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:113px;height:113px}.STAR1_EMPTY_INOUT_1008{background:url(/progress-empty-sprite.png) -1419px -573px/2023px 802px no-repeat;width:113px;height:113px}.STAR1_EMPTY_INOUT_1009_size{width:113px;height:113px}.STAR1_EMPTY_INOUT_1009_offset{background-position:-1535px -573px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:113px;height:113px}.STAR1_EMPTY_INOUT_1009{background:url(/progress-empty-sprite.png) -1535px -573px/2023px 802px no-repeat;width:113px;height:113px}.STAR1_EMPTY_INOUT_1010_size{width:113px;height:113px}.STAR1_EMPTY_INOUT_1010_offset{background-position:-1651px -573px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:113px;height:113px}.STAR1_EMPTY_INOUT_1010{background:url(/progress-empty-sprite.png) -1651px -573px/2023px 802px no-repeat;width:113px;height:113px}.STAR1_EMPTY_INOUT_1011_size{width:113px;height:113px}.STAR1_EMPTY_INOUT_1011_offset{background-position:-1767px -573px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:113px;height:113px}.STAR1_EMPTY_INOUT_1011{background:url(/progress-empty-sprite.png) -1767px -573px/2023px 802px no-repeat;width:113px;height:113px}.STAR1_EMPTY_INOUT_1012_size{width:113px;height:113px}.STAR1_EMPTY_INOUT_1012_offset{background-position:-1883px -580px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:113px;height:113px}.STAR1_EMPTY_INOUT_1012{background:url(/progress-empty-sprite.png) -1883px -580px/2023px 802px no-repeat;width:113px;height:113px}.STAR1_EMPTY_INOUT_1013_size{width:113px;height:113px}.STAR1_EMPTY_INOUT_1013_offset{background-position:-955px -689px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:113px;height:113px}.STAR1_EMPTY_INOUT_1013{background:url(/progress-empty-sprite.png) -955px -689px/2023px 802px no-repeat;width:113px;height:113px}.STAR1_EMPTY_INOUT_1014_size{width:113px;height:113px}.STAR1_EMPTY_INOUT_1014_offset{background-position:-1071px -689px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:113px;height:113px}.STAR1_EMPTY_INOUT_1014{background:url(/progress-empty-sprite.png) -1071px -689px/2023px 802px no-repeat;width:113px;height:113px}.STAR1_EMPTY_INOUT_1015_size{width:113px;height:113px}.STAR1_EMPTY_INOUT_1015_offset{background-position:-1187px -689px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:113px;height:113px}.STAR1_EMPTY_INOUT_1015{background:url(/progress-empty-sprite.png) -1187px -689px/2023px 802px no-repeat;width:113px;height:113px}.STAR1_EMPTY_INOUT_1016_size{width:113px;height:113px}.STAR1_EMPTY_INOUT_1016_offset{background-position:-1303px -689px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:113px;height:113px}.STAR1_EMPTY_INOUT_1016{background:url(/progress-empty-sprite.png) -1303px -689px/2023px 802px no-repeat;width:113px;height:113px}.STAR1_EMPTY_INOUT_1017_size{width:113px;height:113px}.STAR1_EMPTY_INOUT_1017_offset{background-position:-1910px 0;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:113px;height:113px}.STAR1_EMPTY_INOUT_1017{background:url(/progress-empty-sprite.png) -1910px 0/2023px 802px no-repeat;width:113px;height:113px}.STAR2_EMPTY_IDLE_size{width:188px;height:188px}.STAR2_EMPTY_IDLE_offset{background-position:0 0;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR2_EMPTY_IDLE{background:url(/progress-empty-sprite.png) 0 0/2023px 802px no-repeat;width:188px;height:188px}.STAR2_EMPTY_INOUT_2000_size{width:188px;height:188px}.STAR2_EMPTY_INOUT_2000_offset{background-position:-191px 0;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR2_EMPTY_INOUT_2000{background:url(/progress-empty-sprite.png) -191px 0/2023px 802px no-repeat;width:188px;height:188px}.STAR2_EMPTY_INOUT_2001_size{width:188px;height:188px}.STAR2_EMPTY_INOUT_2001_offset{background-position:-382px 0;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR2_EMPTY_INOUT_2001{background:url(/progress-empty-sprite.png) -382px 0/2023px 802px no-repeat;width:188px;height:188px}.STAR2_EMPTY_INOUT_2002_size{width:188px;height:188px}.STAR2_EMPTY_INOUT_2002_offset{background-position:-573px 0;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR2_EMPTY_INOUT_2002{background:url(/progress-empty-sprite.png) -573px 0/2023px 802px no-repeat;width:188px;height:188px}.STAR2_EMPTY_INOUT_2003_size{width:188px;height:188px}.STAR2_EMPTY_INOUT_2003_offset{background-position:-764px 0;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR2_EMPTY_INOUT_2003{background:url(/progress-empty-sprite.png) -764px 0/2023px 802px no-repeat;width:188px;height:188px}.STAR2_EMPTY_INOUT_2004_size{width:188px;height:188px}.STAR2_EMPTY_INOUT_2004_offset{background-position:-955px 0;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR2_EMPTY_INOUT_2004{background:url(/progress-empty-sprite.png) -955px 0/2023px 802px no-repeat;width:188px;height:188px}.STAR2_EMPTY_INOUT_2005_size{width:188px;height:188px}.STAR2_EMPTY_INOUT_2005_offset{background-position:-1146px 0;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR2_EMPTY_INOUT_2005{background:url(/progress-empty-sprite.png) -1146px 0/2023px 802px no-repeat;width:188px;height:188px}.STAR2_EMPTY_INOUT_2006_size{width:188px;height:188px}.STAR2_EMPTY_INOUT_2006_offset{background-position:-1337px 0;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR2_EMPTY_INOUT_2006{background:url(/progress-empty-sprite.png) -1337px 0/2023px 802px no-repeat;width:188px;height:188px}.STAR2_EMPTY_INOUT_2007_size{width:188px;height:188px}.STAR2_EMPTY_INOUT_2007_offset{background-position:-1528px 0;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR2_EMPTY_INOUT_2007{background:url(/progress-empty-sprite.png) -1528px 0/2023px 802px no-repeat;width:188px;height:188px}.STAR2_EMPTY_INOUT_2008_size{width:188px;height:188px}.STAR2_EMPTY_INOUT_2008_offset{background-position:-1719px 0;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR2_EMPTY_INOUT_2008{background:url(/progress-empty-sprite.png) -1719px 0/2023px 802px no-repeat;width:188px;height:188px}.STAR2_EMPTY_INOUT_2009_size{width:188px;height:188px}.STAR2_EMPTY_INOUT_2009_offset{background-position:0 -191px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR2_EMPTY_INOUT_2009{background:url(/progress-empty-sprite.png) 0 -191px/2023px 802px no-repeat;width:188px;height:188px}.STAR2_EMPTY_INOUT_2010_size{width:188px;height:188px}.STAR2_EMPTY_INOUT_2010_offset{background-position:-191px -191px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR2_EMPTY_INOUT_2010{background:url(/progress-empty-sprite.png) -191px -191px/2023px 802px no-repeat;width:188px;height:188px}.STAR2_EMPTY_INOUT_2011_size{width:188px;height:188px}.STAR2_EMPTY_INOUT_2011_offset{background-position:-382px -191px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR2_EMPTY_INOUT_2011{background:url(/progress-empty-sprite.png) -382px -191px/2023px 802px no-repeat;width:188px;height:188px}.STAR2_EMPTY_INOUT_2012_size{width:188px;height:188px}.STAR2_EMPTY_INOUT_2012_offset{background-position:-573px -191px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR2_EMPTY_INOUT_2012{background:url(/progress-empty-sprite.png) -573px -191px/2023px 802px no-repeat;width:188px;height:188px}.STAR2_EMPTY_INOUT_2013_size{width:188px;height:188px}.STAR2_EMPTY_INOUT_2013_offset{background-position:-764px -191px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR2_EMPTY_INOUT_2013{background:url(/progress-empty-sprite.png) -764px -191px/2023px 802px no-repeat;width:188px;height:188px}.STAR2_EMPTY_INOUT_2014_size{width:188px;height:188px}.STAR2_EMPTY_INOUT_2014_offset{background-position:-955px -191px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR2_EMPTY_INOUT_2014{background:url(/progress-empty-sprite.png) -955px -191px/2023px 802px no-repeat;width:188px;height:188px}.STAR2_EMPTY_INOUT_2015_size{width:188px;height:188px}.STAR2_EMPTY_INOUT_2015_offset{background-position:-1146px -191px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR2_EMPTY_INOUT_2015{background:url(/progress-empty-sprite.png) -1146px -191px/2023px 802px no-repeat;width:188px;height:188px}.STAR2_EMPTY_INOUT_2016_size{width:188px;height:188px}.STAR2_EMPTY_INOUT_2016_offset{background-position:-1337px -191px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR2_EMPTY_INOUT_2016{background:url(/progress-empty-sprite.png) -1337px -191px/2023px 802px no-repeat;width:188px;height:188px}.STAR2_EMPTY_INOUT_2017_size{width:188px;height:188px}.STAR2_EMPTY_INOUT_2017_offset{background-position:0 0;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR2_EMPTY_INOUT_2017{background:url(/progress-empty-sprite.png) 0 0/2023px 802px no-repeat;width:188px;height:188px}.STAR3_EMPTY_IDLE_size{width:188px;height:188px}.STAR3_EMPTY_IDLE_offset{background-position:-1528px -191px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR3_EMPTY_IDLE{background:url(/progress-empty-sprite.png) -1528px -191px/2023px 802px no-repeat;width:188px;height:188px}.STAR3_EMPTY_INOUT_3000_size{width:188px;height:188px}.STAR3_EMPTY_INOUT_3000_offset{background-position:-191px 0;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR3_EMPTY_INOUT_3000{background:url(/progress-empty-sprite.png) -191px 0/2023px 802px no-repeat;width:188px;height:188px}.STAR3_EMPTY_INOUT_3001_size{width:188px;height:188px}.STAR3_EMPTY_INOUT_3001_offset{background-position:-1719px -191px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR3_EMPTY_INOUT_3001{background:url(/progress-empty-sprite.png) -1719px -191px/2023px 802px no-repeat;width:188px;height:188px}.STAR3_EMPTY_INOUT_3002_size{width:188px;height:188px}.STAR3_EMPTY_INOUT_3002_offset{background-position:0 -382px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR3_EMPTY_INOUT_3002{background:url(/progress-empty-sprite.png) 0 -382px/2023px 802px no-repeat;width:188px;height:188px}.STAR3_EMPTY_INOUT_3003_size{width:188px;height:188px}.STAR3_EMPTY_INOUT_3003_offset{background-position:-191px -382px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR3_EMPTY_INOUT_3003{background:url(/progress-empty-sprite.png) -191px -382px/2023px 802px no-repeat;width:188px;height:188px}.STAR3_EMPTY_INOUT_3004_size{width:188px;height:188px}.STAR3_EMPTY_INOUT_3004_offset{background-position:-382px -382px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR3_EMPTY_INOUT_3004{background:url(/progress-empty-sprite.png) -382px -382px/2023px 802px no-repeat;width:188px;height:188px}.STAR3_EMPTY_INOUT_3005_size{width:188px;height:188px}.STAR3_EMPTY_INOUT_3005_offset{background-position:-573px -382px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR3_EMPTY_INOUT_3005{background:url(/progress-empty-sprite.png) -573px -382px/2023px 802px no-repeat;width:188px;height:188px}.STAR3_EMPTY_INOUT_3006_size{width:188px;height:188px}.STAR3_EMPTY_INOUT_3006_offset{background-position:-764px -382px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR3_EMPTY_INOUT_3006{background:url(/progress-empty-sprite.png) -764px -382px/2023px 802px no-repeat;width:188px;height:188px}.STAR3_EMPTY_INOUT_3007_size{width:188px;height:188px}.STAR3_EMPTY_INOUT_3007_offset{background-position:-955px -382px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR3_EMPTY_INOUT_3007{background:url(/progress-empty-sprite.png) -955px -382px/2023px 802px no-repeat;width:188px;height:188px}.STAR3_EMPTY_INOUT_3008_size{width:188px;height:188px}.STAR3_EMPTY_INOUT_3008_offset{background-position:-1146px -382px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR3_EMPTY_INOUT_3008{background:url(/progress-empty-sprite.png) -1146px -382px/2023px 802px no-repeat;width:188px;height:188px}.STAR3_EMPTY_INOUT_3009_size{width:188px;height:188px}.STAR3_EMPTY_INOUT_3009_offset{background-position:-1337px -382px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR3_EMPTY_INOUT_3009{background:url(/progress-empty-sprite.png) -1337px -382px/2023px 802px no-repeat;width:188px;height:188px}.STAR3_EMPTY_INOUT_3010_size{width:188px;height:188px}.STAR3_EMPTY_INOUT_3010_offset{background-position:-1528px -382px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR3_EMPTY_INOUT_3010{background:url(/progress-empty-sprite.png) -1528px -382px/2023px 802px no-repeat;width:188px;height:188px}.STAR3_EMPTY_INOUT_3011_size{width:188px;height:188px}.STAR3_EMPTY_INOUT_3011_offset{background-position:-1719px -382px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR3_EMPTY_INOUT_3011{background:url(/progress-empty-sprite.png) -1719px -382px/2023px 802px no-repeat;width:188px;height:188px}.STAR3_EMPTY_INOUT_3012_size{width:188px;height:188px}.STAR3_EMPTY_INOUT_3012_offset{background-position:0 -573px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR3_EMPTY_INOUT_3012{background:url(/progress-empty-sprite.png) 0 -573px/2023px 802px no-repeat;width:188px;height:188px}.STAR3_EMPTY_INOUT_3013_size{width:188px;height:188px}.STAR3_EMPTY_INOUT_3013_offset{background-position:-191px -573px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR3_EMPTY_INOUT_3013{background:url(/progress-empty-sprite.png) -191px -573px/2023px 802px no-repeat;width:188px;height:188px}.STAR3_EMPTY_INOUT_3014_size{width:188px;height:188px}.STAR3_EMPTY_INOUT_3014_offset{background-position:-382px -573px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR3_EMPTY_INOUT_3014{background:url(/progress-empty-sprite.png) -382px -573px/2023px 802px no-repeat;width:188px;height:188px}.STAR3_EMPTY_INOUT_3015_size{width:188px;height:188px}.STAR3_EMPTY_INOUT_3015_offset{background-position:-573px -573px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR3_EMPTY_INOUT_3015{background:url(/progress-empty-sprite.png) -573px -573px/2023px 802px no-repeat;width:188px;height:188px}.STAR3_EMPTY_INOUT_3016_size{width:188px;height:188px}.STAR3_EMPTY_INOUT_3016_offset{background-position:-764px -573px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR3_EMPTY_INOUT_3016{background:url(/progress-empty-sprite.png) -764px -573px/2023px 802px no-repeat;width:188px;height:188px}.STAR3_EMPTY_INOUT_3017_size{width:188px;height:188px}.STAR3_EMPTY_INOUT_3017_offset{background-position:-1528px -191px;-webkit-background-size:2023px 802px;background-size:2023px 802px;width:188px;height:188px}.STAR3_EMPTY_INOUT_3017{background:url(/progress-empty-sprite.png) -1528px -191px/2023px 802px no-repeat;width:188px;height:188px}.PROGRESS_STAR1_EMPTY_TO_FULL_SPRITE{background-image:url(/progress-star1-empty-to-full-sprite.png);background-repeat:no-repeat}.STAR1_EMPTY_TO_FULL_1017_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1017_offset{background-position:0 0;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1017{background:url(/progress-star1-empty-to-full-sprite.png) 0 0/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1018_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1018_offset{background-position:-116px 0;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1018{background:url(/progress-star1-empty-to-full-sprite.png) -116px 0/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1019_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1019_offset{background-position:-232px 0;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1019{background:url(/progress-star1-empty-to-full-sprite.png) -232px 0/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1020_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1020_offset{background-position:-348px 0;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1020{background:url(/progress-star1-empty-to-full-sprite.png) -348px 0/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1021_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1021_offset{background-position:-464px 0;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1021{background:url(/progress-star1-empty-to-full-sprite.png) -464px 0/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1022_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1022_offset{background-position:-580px 0;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1022{background:url(/progress-star1-empty-to-full-sprite.png) -580px 0/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1023_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1023_offset{background-position:-696px 0;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1023{background:url(/progress-star1-empty-to-full-sprite.png) -696px 0/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1024_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1024_offset{background-position:-812px 0;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1024{background:url(/progress-star1-empty-to-full-sprite.png) -812px 0/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1025_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1025_offset{background-position:0 -116px;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1025{background:url(/progress-star1-empty-to-full-sprite.png) 0 -116px/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1026_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1026_offset{background-position:-116px -116px;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1026{background:url(/progress-star1-empty-to-full-sprite.png) -116px -116px/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1027_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1027_offset{background-position:-232px -116px;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1027{background:url(/progress-star1-empty-to-full-sprite.png) -232px -116px/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1028_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1028_offset{background-position:-348px -116px;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1028{background:url(/progress-star1-empty-to-full-sprite.png) -348px -116px/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1029_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1029_offset{background-position:-464px -116px;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1029{background:url(/progress-star1-empty-to-full-sprite.png) -464px -116px/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1030_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1030_offset{background-position:-580px -116px;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1030{background:url(/progress-star1-empty-to-full-sprite.png) -580px -116px/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1031_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1031_offset{background-position:-696px -116px;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1031{background:url(/progress-star1-empty-to-full-sprite.png) -696px -116px/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1032_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1032_offset{background-position:-812px -116px;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1032{background:url(/progress-star1-empty-to-full-sprite.png) -812px -116px/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1033_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1033_offset{background-position:0 -232px;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1033{background:url(/progress-star1-empty-to-full-sprite.png) 0 -232px/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1034_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1034_offset{background-position:-116px -232px;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1034{background:url(/progress-star1-empty-to-full-sprite.png) -116px -232px/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1035_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1035_offset{background-position:-232px -232px;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1035{background:url(/progress-star1-empty-to-full-sprite.png) -232px -232px/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1036_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1036_offset{background-position:-348px -232px;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1036{background:url(/progress-star1-empty-to-full-sprite.png) -348px -232px/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1037_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1037_offset{background-position:-464px -232px;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1037{background:url(/progress-star1-empty-to-full-sprite.png) -464px -232px/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1038_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1038_offset{background-position:-580px -232px;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1038{background:url(/progress-star1-empty-to-full-sprite.png) -580px -232px/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1039_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1039_offset{background-position:-696px -232px;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1039{background:url(/progress-star1-empty-to-full-sprite.png) -696px -232px/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1040_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1040_offset{background-position:-812px -232px;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1040{background:url(/progress-star1-empty-to-full-sprite.png) -812px -232px/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1041_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1041_offset{background-position:0 -348px;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1041{background:url(/progress-star1-empty-to-full-sprite.png) 0 -348px/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1042_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1042_offset{background-position:-116px -348px;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1042{background:url(/progress-star1-empty-to-full-sprite.png) -116px -348px/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1043_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1043_offset{background-position:-232px -348px;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1043{background:url(/progress-star1-empty-to-full-sprite.png) -232px -348px/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1044_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1044_offset{background-position:-348px -348px;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1044{background:url(/progress-star1-empty-to-full-sprite.png) -348px -348px/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1045_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1045_offset{background-position:-464px -348px;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1045{background:url(/progress-star1-empty-to-full-sprite.png) -464px -348px/925px 461px no-repeat;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1046_size{width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1046_offset{background-position:-580px -348px;-webkit-background-size:925px 461px;background-size:925px 461px;width:113px;height:113px}.STAR1_EMPTY_TO_FULL_1046{background:url(/progress-star1-empty-to-full-sprite.png) -580px -348px/925px 461px no-repeat;width:113px;height:113px}.PROGRESS_STAR1_FULL_SPRITE{background-image:url(/progress-star1-full-sprite.png);background-repeat:no-repeat}.STAR1_FULL_IDLE_1056_size{width:113px;height:113px}.STAR1_FULL_IDLE_1056_offset{background-position:0 0;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1056{background:url(/progress-star1-full-sprite.png) 0 0/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1057_size{width:113px;height:113px}.STAR1_FULL_IDLE_1057_offset{background-position:-116px 0;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1057{background:url(/progress-star1-full-sprite.png) -116px 0/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1058_size{width:113px;height:113px}.STAR1_FULL_IDLE_1058_offset{background-position:-232px 0;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1058{background:url(/progress-star1-full-sprite.png) -232px 0/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1059_size{width:113px;height:113px}.STAR1_FULL_IDLE_1059_offset{background-position:-348px 0;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1059{background:url(/progress-star1-full-sprite.png) -348px 0/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1060_size{width:113px;height:113px}.STAR1_FULL_IDLE_1060_offset{background-position:-464px 0;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1060{background:url(/progress-star1-full-sprite.png) -464px 0/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1061_size{width:113px;height:113px}.STAR1_FULL_IDLE_1061_offset{background-position:-580px 0;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1061{background:url(/progress-star1-full-sprite.png) -580px 0/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1062_size{width:113px;height:113px}.STAR1_FULL_IDLE_1062_offset{background-position:-696px 0;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1062{background:url(/progress-star1-full-sprite.png) -696px 0/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1063_size{width:113px;height:113px}.STAR1_FULL_IDLE_1063_offset{background-position:-812px 0;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1063{background:url(/progress-star1-full-sprite.png) -812px 0/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1064_size{width:113px;height:113px}.STAR1_FULL_IDLE_1064_offset{background-position:-928px 0;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1064{background:url(/progress-star1-full-sprite.png) -928px 0/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1065_size{width:113px;height:113px}.STAR1_FULL_IDLE_1065_offset{background-position:-1044px 0;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1065{background:url(/progress-star1-full-sprite.png) -1044px 0/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1066_size{width:113px;height:113px}.STAR1_FULL_IDLE_1066_offset{background-position:0 -116px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1066{background:url(/progress-star1-full-sprite.png) 0 -116px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1067_size{width:113px;height:113px}.STAR1_FULL_IDLE_1067_offset{background-position:-116px -116px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1067{background:url(/progress-star1-full-sprite.png) -116px -116px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1068_size{width:113px;height:113px}.STAR1_FULL_IDLE_1068_offset{background-position:-232px -116px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1068{background:url(/progress-star1-full-sprite.png) -232px -116px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1069_size{width:113px;height:113px}.STAR1_FULL_IDLE_1069_offset{background-position:-348px -116px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1069{background:url(/progress-star1-full-sprite.png) -348px -116px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1070_size{width:113px;height:113px}.STAR1_FULL_IDLE_1070_offset{background-position:-464px -116px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1070{background:url(/progress-star1-full-sprite.png) -464px -116px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1071_size{width:113px;height:113px}.STAR1_FULL_IDLE_1071_offset{background-position:-580px -116px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1071{background:url(/progress-star1-full-sprite.png) -580px -116px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1072_size{width:113px;height:113px}.STAR1_FULL_IDLE_1072_offset{background-position:-696px -116px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1072{background:url(/progress-star1-full-sprite.png) -696px -116px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1073_size{width:113px;height:113px}.STAR1_FULL_IDLE_1073_offset{background-position:-812px -116px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1073{background:url(/progress-star1-full-sprite.png) -812px -116px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1074_size{width:113px;height:113px}.STAR1_FULL_IDLE_1074_offset{background-position:-928px -116px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1074{background:url(/progress-star1-full-sprite.png) -928px -116px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1075_size{width:113px;height:113px}.STAR1_FULL_IDLE_1075_offset{background-position:-1044px -116px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1075{background:url(/progress-star1-full-sprite.png) -1044px -116px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1076_size{width:113px;height:113px}.STAR1_FULL_IDLE_1076_offset{background-position:0 -232px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1076{background:url(/progress-star1-full-sprite.png) 0 -232px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1077_size{width:113px;height:113px}.STAR1_FULL_IDLE_1077_offset{background-position:-116px -232px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1077{background:url(/progress-star1-full-sprite.png) -116px -232px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1078_size{width:113px;height:113px}.STAR1_FULL_IDLE_1078_offset{background-position:-232px -232px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1078{background:url(/progress-star1-full-sprite.png) -232px -232px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1079_size{width:113px;height:113px}.STAR1_FULL_IDLE_1079_offset{background-position:-348px -232px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1079{background:url(/progress-star1-full-sprite.png) -348px -232px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1080_size{width:113px;height:113px}.STAR1_FULL_IDLE_1080_offset{background-position:-464px -232px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1080{background:url(/progress-star1-full-sprite.png) -464px -232px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1081_size{width:113px;height:113px}.STAR1_FULL_IDLE_1081_offset{background-position:-580px -232px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1081{background:url(/progress-star1-full-sprite.png) -580px -232px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1082_size{width:113px;height:113px}.STAR1_FULL_IDLE_1082_offset{background-position:-696px -232px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1082{background:url(/progress-star1-full-sprite.png) -696px -232px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1083_size{width:113px;height:113px}.STAR1_FULL_IDLE_1083_offset{background-position:-812px -232px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1083{background:url(/progress-star1-full-sprite.png) -812px -232px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1084_size{width:113px;height:113px}.STAR1_FULL_IDLE_1084_offset{background-position:-928px -232px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1084{background:url(/progress-star1-full-sprite.png) -928px -232px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1085_size{width:113px;height:113px}.STAR1_FULL_IDLE_1085_offset{background-position:-1044px -232px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1085{background:url(/progress-star1-full-sprite.png) -1044px -232px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1086_size{width:113px;height:113px}.STAR1_FULL_IDLE_1086_offset{background-position:0 -348px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1086{background:url(/progress-star1-full-sprite.png) 0 -348px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1087_size{width:113px;height:113px}.STAR1_FULL_IDLE_1087_offset{background-position:-116px -348px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1087{background:url(/progress-star1-full-sprite.png) -116px -348px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1088_size{width:113px;height:113px}.STAR1_FULL_IDLE_1088_offset{background-position:-232px -348px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1088{background:url(/progress-star1-full-sprite.png) -232px -348px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1089_size{width:113px;height:113px}.STAR1_FULL_IDLE_1089_offset{background-position:-348px -348px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1089{background:url(/progress-star1-full-sprite.png) -348px -348px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1090_size{width:113px;height:113px}.STAR1_FULL_IDLE_1090_offset{background-position:-464px -348px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1090{background:url(/progress-star1-full-sprite.png) -464px -348px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1091_size{width:113px;height:113px}.STAR1_FULL_IDLE_1091_offset{background-position:-580px -348px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1091{background:url(/progress-star1-full-sprite.png) -580px -348px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1092_size{width:113px;height:113px}.STAR1_FULL_IDLE_1092_offset{background-position:-696px -348px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1092{background:url(/progress-star1-full-sprite.png) -696px -348px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1093_size{width:113px;height:113px}.STAR1_FULL_IDLE_1093_offset{background-position:-812px -348px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1093{background:url(/progress-star1-full-sprite.png) -812px -348px/1157px 461px no-repeat;width:113px;height:113px}.STAR1_FULL_IDLE_1094_size{width:113px;height:113px}.STAR1_FULL_IDLE_1094_offset{background-position:-928px -348px;-webkit-background-size:1157px 461px;background-size:1157px 461px;width:113px;height:113px}.STAR1_FULL_IDLE_1094{background:url(/progress-star1-full-sprite.png) -928px -348px/1157px 461px no-repeat;width:113px;height:113px}.PROGRESS_STAR1_FULL_TO_EMPTY_SPRITE{background-image:url(/progress-star1-full-to-empty-sprite.png);background-repeat:no-repeat}.STAR1_FULL_TO_EMPTY_1096_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1096_offset{background-position:0 0;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1096{background:url(/progress-star1-full-to-empty-sprite.png) 0 0/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1097_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1097_offset{background-position:-116px 0;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1097{background:url(/progress-star1-full-to-empty-sprite.png) -116px 0/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1098_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1098_offset{background-position:-232px 0;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1098{background:url(/progress-star1-full-to-empty-sprite.png) -232px 0/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1099_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1099_offset{background-position:-348px 0;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1099{background:url(/progress-star1-full-to-empty-sprite.png) -348px 0/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1100_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1100_offset{background-position:-464px 0;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1100{background:url(/progress-star1-full-to-empty-sprite.png) -464px 0/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1101_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1101_offset{background-position:-580px 0;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1101{background:url(/progress-star1-full-to-empty-sprite.png) -580px 0/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1102_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1102_offset{background-position:-696px 0;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1102{background:url(/progress-star1-full-to-empty-sprite.png) -696px 0/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1103_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1103_offset{background-position:0 -116px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1103{background:url(/progress-star1-full-to-empty-sprite.png) 0 -116px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1104_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1104_offset{background-position:-116px -116px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1104{background:url(/progress-star1-full-to-empty-sprite.png) -116px -116px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1105_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1105_offset{background-position:-232px -116px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1105{background:url(/progress-star1-full-to-empty-sprite.png) -232px -116px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1106_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1106_offset{background-position:-348px -116px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1106{background:url(/progress-star1-full-to-empty-sprite.png) -348px -116px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1107_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1107_offset{background-position:-464px -116px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1107{background:url(/progress-star1-full-to-empty-sprite.png) -464px -116px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1108_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1108_offset{background-position:-580px -116px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1108{background:url(/progress-star1-full-to-empty-sprite.png) -580px -116px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1109_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1109_offset{background-position:-696px -116px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1109{background:url(/progress-star1-full-to-empty-sprite.png) -696px -116px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1110_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1110_offset{background-position:0 -232px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1110{background:url(/progress-star1-full-to-empty-sprite.png) 0 -232px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1111_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1111_offset{background-position:-116px -232px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1111{background:url(/progress-star1-full-to-empty-sprite.png) -116px -232px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1112_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1112_offset{background-position:-232px -232px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1112{background:url(/progress-star1-full-to-empty-sprite.png) -232px -232px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1113_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1113_offset{background-position:-348px -232px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1113{background:url(/progress-star1-full-to-empty-sprite.png) -348px -232px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1114_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1114_offset{background-position:-464px -232px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1114{background:url(/progress-star1-full-to-empty-sprite.png) -464px -232px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1115_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1115_offset{background-position:-580px -232px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1115{background:url(/progress-star1-full-to-empty-sprite.png) -580px -232px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1116_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1116_offset{background-position:-696px -232px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1116{background:url(/progress-star1-full-to-empty-sprite.png) -696px -232px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1117_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1117_offset{background-position:0 -348px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1117{background:url(/progress-star1-full-to-empty-sprite.png) 0 -348px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1118_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1118_offset{background-position:-116px -348px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1118{background:url(/progress-star1-full-to-empty-sprite.png) -116px -348px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1119_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1119_offset{background-position:-232px -348px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1119{background:url(/progress-star1-full-to-empty-sprite.png) -232px -348px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1120_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1120_offset{background-position:-348px -348px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1120{background:url(/progress-star1-full-to-empty-sprite.png) -348px -348px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1121_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1121_offset{background-position:-464px -348px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1121{background:url(/progress-star1-full-to-empty-sprite.png) -464px -348px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1122_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1122_offset{background-position:-580px -348px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1122{background:url(/progress-star1-full-to-empty-sprite.png) -580px -348px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1123_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1123_offset{background-position:-696px -348px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1123{background:url(/progress-star1-full-to-empty-sprite.png) -696px -348px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1124_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1124_offset{background-position:0 -464px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1124{background:url(/progress-star1-full-to-empty-sprite.png) 0 -464px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1125_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1125_offset{background-position:-116px -464px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1125{background:url(/progress-star1-full-to-empty-sprite.png) -116px -464px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1126_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1126_offset{background-position:-232px -464px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1126{background:url(/progress-star1-full-to-empty-sprite.png) -232px -464px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1127_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1127_offset{background-position:-348px -464px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1127{background:url(/progress-star1-full-to-empty-sprite.png) -348px -464px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1128_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1128_offset{background-position:-464px -464px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1128{background:url(/progress-star1-full-to-empty-sprite.png) -464px -464px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1129_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1129_offset{background-position:-580px -464px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1129{background:url(/progress-star1-full-to-empty-sprite.png) -580px -464px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1130_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1130_offset{background-position:-696px -464px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1130{background:url(/progress-star1-full-to-empty-sprite.png) -696px -464px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1131_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1131_offset{background-position:0 -580px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1131{background:url(/progress-star1-full-to-empty-sprite.png) 0 -580px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1132_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1132_offset{background-position:-116px -580px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1132{background:url(/progress-star1-full-to-empty-sprite.png) -116px -580px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1133_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1133_offset{background-position:-232px -580px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1133{background:url(/progress-star1-full-to-empty-sprite.png) -232px -580px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1134_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1134_offset{background-position:-348px -580px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1134{background:url(/progress-star1-full-to-empty-sprite.png) -348px -580px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1135_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1135_offset{background-position:-464px -580px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1135{background:url(/progress-star1-full-to-empty-sprite.png) -464px -580px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1136_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1136_offset{background-position:-580px -580px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1136{background:url(/progress-star1-full-to-empty-sprite.png) -580px -580px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1137_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1137_offset{background-position:-696px -580px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1137{background:url(/progress-star1-full-to-empty-sprite.png) -696px -580px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1138_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1138_offset{background-position:0 -696px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1138{background:url(/progress-star1-full-to-empty-sprite.png) 0 -696px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1139_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1139_offset{background-position:-116px -696px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1139{background:url(/progress-star1-full-to-empty-sprite.png) -116px -696px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1140_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1140_offset{background-position:-232px -696px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1140{background:url(/progress-star1-full-to-empty-sprite.png) -232px -696px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1141_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1141_offset{background-position:-348px -696px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1141{background:url(/progress-star1-full-to-empty-sprite.png) -348px -696px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1142_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1142_offset{background-position:-464px -696px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1142{background:url(/progress-star1-full-to-empty-sprite.png) -464px -696px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1143_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1143_offset{background-position:-580px -696px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1143{background:url(/progress-star1-full-to-empty-sprite.png) -580px -696px/809px 809px no-repeat;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1144_size{width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1144_offset{background-position:-696px -696px;-webkit-background-size:809px 809px;background-size:809px 809px;width:113px;height:113px}.STAR1_FULL_TO_EMPTY_1144{background:url(/progress-star1-full-to-empty-sprite.png) -696px -696px/809px 809px no-repeat;width:113px;height:113px}.PROGRESS_STAR2_EMPTY_TO_FULL_SPRITE{background-image:url(/progress-star2-empty-to-full-sprite.png);background-repeat:no-repeat}.STAR2_EMPTY_TO_FULL_2017_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2017_offset{background-position:0 0;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2017{background:url(/progress-star2-empty-to-full-sprite.png) 0 0/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2018_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2018_offset{background-position:-191px 0;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2018{background:url(/progress-star2-empty-to-full-sprite.png) -191px 0/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2019_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2019_offset{background-position:-382px 0;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2019{background:url(/progress-star2-empty-to-full-sprite.png) -382px 0/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2020_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2020_offset{background-position:-573px 0;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2020{background:url(/progress-star2-empty-to-full-sprite.png) -573px 0/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2021_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2021_offset{background-position:-764px 0;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2021{background:url(/progress-star2-empty-to-full-sprite.png) -764px 0/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2022_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2022_offset{background-position:-955px 0;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2022{background:url(/progress-star2-empty-to-full-sprite.png) -955px 0/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2023_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2023_offset{background-position:-1146px 0;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2023{background:url(/progress-star2-empty-to-full-sprite.png) -1146px 0/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2024_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2024_offset{background-position:-1337px 0;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2024{background:url(/progress-star2-empty-to-full-sprite.png) -1337px 0/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2025_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2025_offset{background-position:-1528px 0;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2025{background:url(/progress-star2-empty-to-full-sprite.png) -1528px 0/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2026_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2026_offset{background-position:-1719px 0;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2026{background:url(/progress-star2-empty-to-full-sprite.png) -1719px 0/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2027_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2027_offset{background-position:0 -191px;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2027{background:url(/progress-star2-empty-to-full-sprite.png) 0 -191px/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2028_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2028_offset{background-position:-191px -191px;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2028{background:url(/progress-star2-empty-to-full-sprite.png) -191px -191px/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2029_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2029_offset{background-position:-382px -191px;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2029{background:url(/progress-star2-empty-to-full-sprite.png) -382px -191px/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2030_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2030_offset{background-position:-573px -191px;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2030{background:url(/progress-star2-empty-to-full-sprite.png) -573px -191px/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2031_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2031_offset{background-position:-764px -191px;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2031{background:url(/progress-star2-empty-to-full-sprite.png) -764px -191px/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2032_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2032_offset{background-position:-955px -191px;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2032{background:url(/progress-star2-empty-to-full-sprite.png) -955px -191px/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2033_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2033_offset{background-position:-1146px -191px;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2033{background:url(/progress-star2-empty-to-full-sprite.png) -1146px -191px/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2034_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2034_offset{background-position:-1337px -191px;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2034{background:url(/progress-star2-empty-to-full-sprite.png) -1337px -191px/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2035_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2035_offset{background-position:-1528px -191px;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2035{background:url(/progress-star2-empty-to-full-sprite.png) -1528px -191px/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2036_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2036_offset{background-position:-1719px -191px;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2036{background:url(/progress-star2-empty-to-full-sprite.png) -1719px -191px/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2037_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2037_offset{background-position:0 -382px;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2037{background:url(/progress-star2-empty-to-full-sprite.png) 0 -382px/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2038_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2038_offset{background-position:-191px -382px;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2038{background:url(/progress-star2-empty-to-full-sprite.png) -191px -382px/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2039_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2039_offset{background-position:-382px -382px;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2039{background:url(/progress-star2-empty-to-full-sprite.png) -382px -382px/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2040_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2040_offset{background-position:-573px -382px;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2040{background:url(/progress-star2-empty-to-full-sprite.png) -573px -382px/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2041_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2041_offset{background-position:-764px -382px;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2041{background:url(/progress-star2-empty-to-full-sprite.png) -764px -382px/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2042_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2042_offset{background-position:-955px -382px;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2042{background:url(/progress-star2-empty-to-full-sprite.png) -955px -382px/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2043_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2043_offset{background-position:-1146px -382px;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2043{background:url(/progress-star2-empty-to-full-sprite.png) -1146px -382px/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2044_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2044_offset{background-position:-1337px -382px;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2044{background:url(/progress-star2-empty-to-full-sprite.png) -1337px -382px/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2045_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2045_offset{background-position:-1528px -382px;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2045{background:url(/progress-star2-empty-to-full-sprite.png) -1528px -382px/1907px 570px no-repeat;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2046_size{width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2046_offset{background-position:-1719px -382px;-webkit-background-size:1907px 570px;background-size:1907px 570px;width:188px;height:188px}.STAR2_EMPTY_TO_FULL_2046{background:url(/progress-star2-empty-to-full-sprite.png) -1719px -382px/1907px 570px no-repeat;width:188px;height:188px}.PROGRESS_STAR2_FULL_SPRITE{background-image:url(/progress-star2-full-sprite.png);background-repeat:no-repeat}.STAR2_FULL_IDLE_2055_size{width:188px;height:188px}.STAR2_FULL_IDLE_2055_offset{background-position:0 0;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2055{background:url(/progress-star2-full-sprite.png) 0 0/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2056_size{width:188px;height:188px}.STAR2_FULL_IDLE_2056_offset{background-position:-191px 0;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2056{background:url(/progress-star2-full-sprite.png) -191px 0/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2057_size{width:188px;height:188px}.STAR2_FULL_IDLE_2057_offset{background-position:-382px 0;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2057{background:url(/progress-star2-full-sprite.png) -382px 0/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2058_size{width:188px;height:188px}.STAR2_FULL_IDLE_2058_offset{background-position:-573px 0;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2058{background:url(/progress-star2-full-sprite.png) -573px 0/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2059_size{width:188px;height:188px}.STAR2_FULL_IDLE_2059_offset{background-position:-764px 0;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2059{background:url(/progress-star2-full-sprite.png) -764px 0/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2060_size{width:188px;height:188px}.STAR2_FULL_IDLE_2060_offset{background-position:-955px 0;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2060{background:url(/progress-star2-full-sprite.png) -955px 0/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2061_size{width:188px;height:188px}.STAR2_FULL_IDLE_2061_offset{background-position:0 -191px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2061{background:url(/progress-star2-full-sprite.png) 0 -191px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2062_size{width:188px;height:188px}.STAR2_FULL_IDLE_2062_offset{background-position:-191px -191px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2062{background:url(/progress-star2-full-sprite.png) -191px -191px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2063_size{width:188px;height:188px}.STAR2_FULL_IDLE_2063_offset{background-position:-382px -191px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2063{background:url(/progress-star2-full-sprite.png) -382px -191px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2064_size{width:188px;height:188px}.STAR2_FULL_IDLE_2064_offset{background-position:-573px -191px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2064{background:url(/progress-star2-full-sprite.png) -573px -191px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2065_size{width:188px;height:188px}.STAR2_FULL_IDLE_2065_offset{background-position:-764px -191px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2065{background:url(/progress-star2-full-sprite.png) -764px -191px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2066_size{width:188px;height:188px}.STAR2_FULL_IDLE_2066_offset{background-position:-955px -191px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2066{background:url(/progress-star2-full-sprite.png) -955px -191px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2067_size{width:188px;height:188px}.STAR2_FULL_IDLE_2067_offset{background-position:0 -382px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2067{background:url(/progress-star2-full-sprite.png) 0 -382px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2068_size{width:188px;height:188px}.STAR2_FULL_IDLE_2068_offset{background-position:-191px -382px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2068{background:url(/progress-star2-full-sprite.png) -191px -382px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2069_size{width:188px;height:188px}.STAR2_FULL_IDLE_2069_offset{background-position:-382px -382px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2069{background:url(/progress-star2-full-sprite.png) -382px -382px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2070_size{width:188px;height:188px}.STAR2_FULL_IDLE_2070_offset{background-position:-573px -382px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2070{background:url(/progress-star2-full-sprite.png) -573px -382px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2071_size{width:188px;height:188px}.STAR2_FULL_IDLE_2071_offset{background-position:-764px -382px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2071{background:url(/progress-star2-full-sprite.png) -764px -382px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2072_size{width:188px;height:188px}.STAR2_FULL_IDLE_2072_offset{background-position:-955px -382px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2072{background:url(/progress-star2-full-sprite.png) -955px -382px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2073_size{width:188px;height:188px}.STAR2_FULL_IDLE_2073_offset{background-position:0 -573px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2073{background:url(/progress-star2-full-sprite.png) 0 -573px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2074_size{width:188px;height:188px}.STAR2_FULL_IDLE_2074_offset{background-position:-191px -573px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2074{background:url(/progress-star2-full-sprite.png) -191px -573px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2075_size{width:188px;height:188px}.STAR2_FULL_IDLE_2075_offset{background-position:-382px -573px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2075{background:url(/progress-star2-full-sprite.png) -382px -573px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2076_size{width:188px;height:188px}.STAR2_FULL_IDLE_2076_offset{background-position:-573px -573px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2076{background:url(/progress-star2-full-sprite.png) -573px -573px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2077_size{width:188px;height:188px}.STAR2_FULL_IDLE_2077_offset{background-position:-764px -573px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2077{background:url(/progress-star2-full-sprite.png) -764px -573px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2078_size{width:188px;height:188px}.STAR2_FULL_IDLE_2078_offset{background-position:-955px -573px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2078{background:url(/progress-star2-full-sprite.png) -955px -573px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2079_size{width:188px;height:188px}.STAR2_FULL_IDLE_2079_offset{background-position:0 -764px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2079{background:url(/progress-star2-full-sprite.png) 0 -764px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2080_size{width:188px;height:188px}.STAR2_FULL_IDLE_2080_offset{background-position:-191px -764px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2080{background:url(/progress-star2-full-sprite.png) -191px -764px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2081_size{width:188px;height:188px}.STAR2_FULL_IDLE_2081_offset{background-position:-382px -764px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2081{background:url(/progress-star2-full-sprite.png) -382px -764px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2082_size{width:188px;height:188px}.STAR2_FULL_IDLE_2082_offset{background-position:-573px -764px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2082{background:url(/progress-star2-full-sprite.png) -573px -764px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2083_size{width:188px;height:188px}.STAR2_FULL_IDLE_2083_offset{background-position:-764px -764px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2083{background:url(/progress-star2-full-sprite.png) -764px -764px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2084_size{width:188px;height:188px}.STAR2_FULL_IDLE_2084_offset{background-position:-955px -764px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2084{background:url(/progress-star2-full-sprite.png) -955px -764px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2085_size{width:188px;height:188px}.STAR2_FULL_IDLE_2085_offset{background-position:0 -955px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2085{background:url(/progress-star2-full-sprite.png) 0 -955px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2086_size{width:188px;height:188px}.STAR2_FULL_IDLE_2086_offset{background-position:-191px -955px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2086{background:url(/progress-star2-full-sprite.png) -191px -955px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2087_size{width:188px;height:188px}.STAR2_FULL_IDLE_2087_offset{background-position:-382px -955px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2087{background:url(/progress-star2-full-sprite.png) -382px -955px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2088_size{width:188px;height:188px}.STAR2_FULL_IDLE_2088_offset{background-position:-573px -955px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2088{background:url(/progress-star2-full-sprite.png) -573px -955px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2089_size{width:188px;height:188px}.STAR2_FULL_IDLE_2089_offset{background-position:-764px -955px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2089{background:url(/progress-star2-full-sprite.png) -764px -955px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2090_size{width:188px;height:188px}.STAR2_FULL_IDLE_2090_offset{background-position:-955px -955px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2090{background:url(/progress-star2-full-sprite.png) -955px -955px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2091_size{width:188px;height:188px}.STAR2_FULL_IDLE_2091_offset{background-position:0 -1146px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2091{background:url(/progress-star2-full-sprite.png) 0 -1146px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2092_size{width:188px;height:188px}.STAR2_FULL_IDLE_2092_offset{background-position:-191px -1146px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2092{background:url(/progress-star2-full-sprite.png) -191px -1146px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2093_size{width:188px;height:188px}.STAR2_FULL_IDLE_2093_offset{background-position:-382px -1146px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2093{background:url(/progress-star2-full-sprite.png) -382px -1146px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2094_size{width:188px;height:188px}.STAR2_FULL_IDLE_2094_offset{background-position:-573px -1146px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2094{background:url(/progress-star2-full-sprite.png) -573px -1146px/1143px 1334px no-repeat;width:188px;height:188px}.STAR2_FULL_IDLE_2095_size{width:188px;height:188px}.STAR2_FULL_IDLE_2095_offset{background-position:-764px -1146px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR2_FULL_IDLE_2095{background:url(/progress-star2-full-sprite.png) -764px -1146px/1143px 1334px no-repeat;width:188px;height:188px}.PROGRESS_STAR2_FULL_TO_EMPTY_SPRITE{background-image:url(/progress-star2-full-to-empty-sprite.png);background-repeat:no-repeat}.STAR2_FULL_TO_EMPTY_2096_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2096_offset{background-position:0 0;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2096{background:url(/progress-star2-full-to-empty-sprite.png) 0 0/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2097_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2097_offset{background-position:-191px 0;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2097{background:url(/progress-star2-full-to-empty-sprite.png) -191px 0/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2098_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2098_offset{background-position:-382px 0;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2098{background:url(/progress-star2-full-to-empty-sprite.png) -382px 0/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2099_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2099_offset{background-position:-573px 0;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2099{background:url(/progress-star2-full-to-empty-sprite.png) -573px 0/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2100_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2100_offset{background-position:-764px 0;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2100{background:url(/progress-star2-full-to-empty-sprite.png) -764px 0/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2101_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2101_offset{background-position:-955px 0;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2101{background:url(/progress-star2-full-to-empty-sprite.png) -955px 0/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2102_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2102_offset{background-position:-1146px 0;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2102{background:url(/progress-star2-full-to-empty-sprite.png) -1146px 0/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2103_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2103_offset{background-position:-1337px 0;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2103{background:url(/progress-star2-full-to-empty-sprite.png) -1337px 0/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2104_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2104_offset{background-position:-1528px 0;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2104{background:url(/progress-star2-full-to-empty-sprite.png) -1528px 0/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2105_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2105_offset{background-position:-1719px 0;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2105{background:url(/progress-star2-full-to-empty-sprite.png) -1719px 0/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2106_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2106_offset{background-position:0 -191px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2106{background:url(/progress-star2-full-to-empty-sprite.png) 0 -191px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2107_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2107_offset{background-position:-191px -191px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2107{background:url(/progress-star2-full-to-empty-sprite.png) -191px -191px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2108_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2108_offset{background-position:-382px -191px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2108{background:url(/progress-star2-full-to-empty-sprite.png) -382px -191px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2109_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2109_offset{background-position:-573px -191px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2109{background:url(/progress-star2-full-to-empty-sprite.png) -573px -191px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2110_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2110_offset{background-position:-764px -191px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2110{background:url(/progress-star2-full-to-empty-sprite.png) -764px -191px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2111_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2111_offset{background-position:-955px -191px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2111{background:url(/progress-star2-full-to-empty-sprite.png) -955px -191px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2112_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2112_offset{background-position:-1146px -191px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2112{background:url(/progress-star2-full-to-empty-sprite.png) -1146px -191px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2113_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2113_offset{background-position:-1337px -191px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2113{background:url(/progress-star2-full-to-empty-sprite.png) -1337px -191px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2114_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2114_offset{background-position:-1528px -191px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2114{background:url(/progress-star2-full-to-empty-sprite.png) -1528px -191px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2115_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2115_offset{background-position:-1719px -191px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2115{background:url(/progress-star2-full-to-empty-sprite.png) -1719px -191px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2116_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2116_offset{background-position:0 -382px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2116{background:url(/progress-star2-full-to-empty-sprite.png) 0 -382px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2117_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2117_offset{background-position:-191px -382px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2117{background:url(/progress-star2-full-to-empty-sprite.png) -191px -382px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2118_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2118_offset{background-position:-382px -382px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2118{background:url(/progress-star2-full-to-empty-sprite.png) -382px -382px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2119_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2119_offset{background-position:-573px -382px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2119{background:url(/progress-star2-full-to-empty-sprite.png) -573px -382px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2120_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2120_offset{background-position:-764px -382px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2120{background:url(/progress-star2-full-to-empty-sprite.png) -764px -382px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2121_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2121_offset{background-position:-955px -382px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2121{background:url(/progress-star2-full-to-empty-sprite.png) -955px -382px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2122_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2122_offset{background-position:-1146px -382px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2122{background:url(/progress-star2-full-to-empty-sprite.png) -1146px -382px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2123_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2123_offset{background-position:-1337px -382px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2123{background:url(/progress-star2-full-to-empty-sprite.png) -1337px -382px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2124_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2124_offset{background-position:-1528px -382px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2124{background:url(/progress-star2-full-to-empty-sprite.png) -1528px -382px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2125_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2125_offset{background-position:-1719px -382px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2125{background:url(/progress-star2-full-to-empty-sprite.png) -1719px -382px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2126_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2126_offset{background-position:0 -573px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2126{background:url(/progress-star2-full-to-empty-sprite.png) 0 -573px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2127_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2127_offset{background-position:-191px -573px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2127{background:url(/progress-star2-full-to-empty-sprite.png) -191px -573px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2128_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2128_offset{background-position:-382px -573px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2128{background:url(/progress-star2-full-to-empty-sprite.png) -382px -573px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2129_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2129_offset{background-position:-573px -573px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2129{background:url(/progress-star2-full-to-empty-sprite.png) -573px -573px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2130_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2130_offset{background-position:-764px -573px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2130{background:url(/progress-star2-full-to-empty-sprite.png) -764px -573px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2131_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2131_offset{background-position:-955px -573px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2131{background:url(/progress-star2-full-to-empty-sprite.png) -955px -573px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2132_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2132_offset{background-position:-1146px -573px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2132{background:url(/progress-star2-full-to-empty-sprite.png) -1146px -573px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2133_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2133_offset{background-position:-1337px -573px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2133{background:url(/progress-star2-full-to-empty-sprite.png) -1337px -573px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2134_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2134_offset{background-position:-1528px -573px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2134{background:url(/progress-star2-full-to-empty-sprite.png) -1528px -573px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2135_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2135_offset{background-position:-1719px -573px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2135{background:url(/progress-star2-full-to-empty-sprite.png) -1719px -573px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2136_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2136_offset{background-position:0 -764px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2136{background:url(/progress-star2-full-to-empty-sprite.png) 0 -764px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2137_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2137_offset{background-position:-191px -764px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2137{background:url(/progress-star2-full-to-empty-sprite.png) -191px -764px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2138_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2138_offset{background-position:-382px -764px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2138{background:url(/progress-star2-full-to-empty-sprite.png) -382px -764px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2139_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2139_offset{background-position:-573px -764px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2139{background:url(/progress-star2-full-to-empty-sprite.png) -573px -764px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2140_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2140_offset{background-position:-764px -764px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2140{background:url(/progress-star2-full-to-empty-sprite.png) -764px -764px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2141_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2141_offset{background-position:-955px -764px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2141{background:url(/progress-star2-full-to-empty-sprite.png) -955px -764px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2142_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2142_offset{background-position:-1146px -764px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2142{background:url(/progress-star2-full-to-empty-sprite.png) -1146px -764px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2143_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2143_offset{background-position:-1337px -764px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2143{background:url(/progress-star2-full-to-empty-sprite.png) -1337px -764px/1907px 952px no-repeat;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2144_size{width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2144_offset{background-position:-1528px -764px;-webkit-background-size:1907px 952px;background-size:1907px 952px;width:188px;height:188px}.STAR2_FULL_TO_EMPTY_2144{background:url(/progress-star2-full-to-empty-sprite.png) -1528px -764px/1907px 952px no-repeat;width:188px;height:188px}.PROGRESS_STAR3_EMPTY_TO_FULL_SPRITE{background-image:url(/progress-star3-empty-to-full-sprite.png);background-repeat:no-repeat}.STAR3_EMPTY_TO_FULL_3017_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3017_offset{background-position:0 0;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3017{background:url(/progress-star3-empty-to-full-sprite.png) 0 0/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3018_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3018_offset{background-position:-191px 0;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3018{background:url(/progress-star3-empty-to-full-sprite.png) -191px 0/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3019_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3019_offset{background-position:-382px 0;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3019{background:url(/progress-star3-empty-to-full-sprite.png) -382px 0/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3020_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3020_offset{background-position:-573px 0;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3020{background:url(/progress-star3-empty-to-full-sprite.png) -573px 0/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3021_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3021_offset{background-position:-764px 0;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3021{background:url(/progress-star3-empty-to-full-sprite.png) -764px 0/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3022_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3022_offset{background-position:0 -191px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3022{background:url(/progress-star3-empty-to-full-sprite.png) 0 -191px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3023_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3023_offset{background-position:-191px -191px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3023{background:url(/progress-star3-empty-to-full-sprite.png) -191px -191px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3024_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3024_offset{background-position:-382px -191px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3024{background:url(/progress-star3-empty-to-full-sprite.png) -382px -191px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3025_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3025_offset{background-position:-573px -191px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3025{background:url(/progress-star3-empty-to-full-sprite.png) -573px -191px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3026_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3026_offset{background-position:-764px -191px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3026{background:url(/progress-star3-empty-to-full-sprite.png) -764px -191px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3027_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3027_offset{background-position:0 -382px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3027{background:url(/progress-star3-empty-to-full-sprite.png) 0 -382px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3028_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3028_offset{background-position:-191px -382px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3028{background:url(/progress-star3-empty-to-full-sprite.png) -191px -382px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3029_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3029_offset{background-position:-382px -382px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3029{background:url(/progress-star3-empty-to-full-sprite.png) -382px -382px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3030_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3030_offset{background-position:-573px -382px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3030{background:url(/progress-star3-empty-to-full-sprite.png) -573px -382px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3031_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3031_offset{background-position:-764px -382px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3031{background:url(/progress-star3-empty-to-full-sprite.png) -764px -382px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3032_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3032_offset{background-position:0 -573px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3032{background:url(/progress-star3-empty-to-full-sprite.png) 0 -573px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3033_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3033_offset{background-position:-191px -573px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3033{background:url(/progress-star3-empty-to-full-sprite.png) -191px -573px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3034_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3034_offset{background-position:-382px -573px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3034{background:url(/progress-star3-empty-to-full-sprite.png) -382px -573px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3035_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3035_offset{background-position:-573px -573px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3035{background:url(/progress-star3-empty-to-full-sprite.png) -573px -573px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3036_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3036_offset{background-position:-764px -573px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3036{background:url(/progress-star3-empty-to-full-sprite.png) -764px -573px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3037_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3037_offset{background-position:0 -764px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3037{background:url(/progress-star3-empty-to-full-sprite.png) 0 -764px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3038_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3038_offset{background-position:-191px -764px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3038{background:url(/progress-star3-empty-to-full-sprite.png) -191px -764px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3039_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3039_offset{background-position:-382px -764px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3039{background:url(/progress-star3-empty-to-full-sprite.png) -382px -764px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3040_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3040_offset{background-position:-573px -764px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3040{background:url(/progress-star3-empty-to-full-sprite.png) -573px -764px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3041_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3041_offset{background-position:-764px -764px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3041{background:url(/progress-star3-empty-to-full-sprite.png) -764px -764px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3042_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3042_offset{background-position:0 -955px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3042{background:url(/progress-star3-empty-to-full-sprite.png) 0 -955px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3043_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3043_offset{background-position:-191px -955px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3043{background:url(/progress-star3-empty-to-full-sprite.png) -191px -955px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3044_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3044_offset{background-position:-382px -955px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3044{background:url(/progress-star3-empty-to-full-sprite.png) -382px -955px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3045_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3045_offset{background-position:-573px -955px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3045{background:url(/progress-star3-empty-to-full-sprite.png) -573px -955px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3046_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3046_offset{background-position:-764px -955px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3046{background:url(/progress-star3-empty-to-full-sprite.png) -764px -955px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3047_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3047_offset{background-position:0 -1146px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3047{background:url(/progress-star3-empty-to-full-sprite.png) 0 -1146px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3048_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3048_offset{background-position:-191px -1146px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3048{background:url(/progress-star3-empty-to-full-sprite.png) -191px -1146px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3049_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3049_offset{background-position:-382px -1146px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3049{background:url(/progress-star3-empty-to-full-sprite.png) -382px -1146px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3050_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3050_offset{background-position:-573px -1146px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3050{background:url(/progress-star3-empty-to-full-sprite.png) -573px -1146px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3051_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3051_offset{background-position:-764px -1146px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3051{background:url(/progress-star3-empty-to-full-sprite.png) -764px -1146px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3052_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3052_offset{background-position:0 -1337px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3052{background:url(/progress-star3-empty-to-full-sprite.png) 0 -1337px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3053_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3053_offset{background-position:-191px -1337px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3053{background:url(/progress-star3-empty-to-full-sprite.png) -191px -1337px/952px 1525px no-repeat;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3054_size{width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3054_offset{background-position:-382px -1337px;-webkit-background-size:952px 1525px;background-size:952px 1525px;width:188px;height:188px}.STAR3_EMPTY_TO_FULL_3054{background:url(/progress-star3-empty-to-full-sprite.png) -382px -1337px/952px 1525px no-repeat;width:188px;height:188px}.PROGRESS_STAR3_FULL_SPRITE{background-image:url(/progress-star3-full-sprite.png);background-repeat:no-repeat}.STAR3_FULL_IDLE_3055_size{width:188px;height:188px}.STAR3_FULL_IDLE_3055_offset{background-position:0 0;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3055{background:url(/progress-star3-full-sprite.png) 0 0/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3056_size{width:188px;height:188px}.STAR3_FULL_IDLE_3056_offset{background-position:-191px 0;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3056{background:url(/progress-star3-full-sprite.png) -191px 0/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3057_size{width:188px;height:188px}.STAR3_FULL_IDLE_3057_offset{background-position:-382px 0;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3057{background:url(/progress-star3-full-sprite.png) -382px 0/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3058_size{width:188px;height:188px}.STAR3_FULL_IDLE_3058_offset{background-position:-573px 0;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3058{background:url(/progress-star3-full-sprite.png) -573px 0/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3059_size{width:188px;height:188px}.STAR3_FULL_IDLE_3059_offset{background-position:-764px 0;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3059{background:url(/progress-star3-full-sprite.png) -764px 0/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3060_size{width:188px;height:188px}.STAR3_FULL_IDLE_3060_offset{background-position:-955px 0;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3060{background:url(/progress-star3-full-sprite.png) -955px 0/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3061_size{width:188px;height:188px}.STAR3_FULL_IDLE_3061_offset{background-position:0 -191px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3061{background:url(/progress-star3-full-sprite.png) 0 -191px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3062_size{width:188px;height:188px}.STAR3_FULL_IDLE_3062_offset{background-position:-191px -191px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3062{background:url(/progress-star3-full-sprite.png) -191px -191px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3063_size{width:188px;height:188px}.STAR3_FULL_IDLE_3063_offset{background-position:-382px -191px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3063{background:url(/progress-star3-full-sprite.png) -382px -191px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3064_size{width:188px;height:188px}.STAR3_FULL_IDLE_3064_offset{background-position:-573px -191px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3064{background:url(/progress-star3-full-sprite.png) -573px -191px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3065_size{width:188px;height:188px}.STAR3_FULL_IDLE_3065_offset{background-position:-764px -191px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3065{background:url(/progress-star3-full-sprite.png) -764px -191px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3066_size{width:188px;height:188px}.STAR3_FULL_IDLE_3066_offset{background-position:-955px -191px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3066{background:url(/progress-star3-full-sprite.png) -955px -191px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3067_size{width:188px;height:188px}.STAR3_FULL_IDLE_3067_offset{background-position:0 -382px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3067{background:url(/progress-star3-full-sprite.png) 0 -382px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3068_size{width:188px;height:188px}.STAR3_FULL_IDLE_3068_offset{background-position:-191px -382px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3068{background:url(/progress-star3-full-sprite.png) -191px -382px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3069_size{width:188px;height:188px}.STAR3_FULL_IDLE_3069_offset{background-position:-382px -382px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3069{background:url(/progress-star3-full-sprite.png) -382px -382px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3070_size{width:188px;height:188px}.STAR3_FULL_IDLE_3070_offset{background-position:-573px -382px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3070{background:url(/progress-star3-full-sprite.png) -573px -382px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3071_size{width:188px;height:188px}.STAR3_FULL_IDLE_3071_offset{background-position:-764px -382px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3071{background:url(/progress-star3-full-sprite.png) -764px -382px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3072_size{width:188px;height:188px}.STAR3_FULL_IDLE_3072_offset{background-position:-955px -382px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3072{background:url(/progress-star3-full-sprite.png) -955px -382px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3073_size{width:188px;height:188px}.STAR3_FULL_IDLE_3073_offset{background-position:0 -573px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3073{background:url(/progress-star3-full-sprite.png) 0 -573px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3074_size{width:188px;height:188px}.STAR3_FULL_IDLE_3074_offset{background-position:-191px -573px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3074{background:url(/progress-star3-full-sprite.png) -191px -573px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3075_size{width:188px;height:188px}.STAR3_FULL_IDLE_3075_offset{background-position:-382px -573px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3075{background:url(/progress-star3-full-sprite.png) -382px -573px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3076_size{width:188px;height:188px}.STAR3_FULL_IDLE_3076_offset{background-position:-573px -573px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3076{background:url(/progress-star3-full-sprite.png) -573px -573px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3077_size{width:188px;height:188px}.STAR3_FULL_IDLE_3077_offset{background-position:-764px -573px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3077{background:url(/progress-star3-full-sprite.png) -764px -573px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3078_size{width:188px;height:188px}.STAR3_FULL_IDLE_3078_offset{background-position:-955px -573px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3078{background:url(/progress-star3-full-sprite.png) -955px -573px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3079_size{width:188px;height:188px}.STAR3_FULL_IDLE_3079_offset{background-position:0 -764px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3079{background:url(/progress-star3-full-sprite.png) 0 -764px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3080_size{width:188px;height:188px}.STAR3_FULL_IDLE_3080_offset{background-position:-191px -764px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3080{background:url(/progress-star3-full-sprite.png) -191px -764px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3081_size{width:188px;height:188px}.STAR3_FULL_IDLE_3081_offset{background-position:-382px -764px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3081{background:url(/progress-star3-full-sprite.png) -382px -764px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3082_size{width:188px;height:188px}.STAR3_FULL_IDLE_3082_offset{background-position:-573px -764px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3082{background:url(/progress-star3-full-sprite.png) -573px -764px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3083_size{width:188px;height:188px}.STAR3_FULL_IDLE_3083_offset{background-position:-764px -764px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3083{background:url(/progress-star3-full-sprite.png) -764px -764px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3084_size{width:188px;height:188px}.STAR3_FULL_IDLE_3084_offset{background-position:-955px -764px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3084{background:url(/progress-star3-full-sprite.png) -955px -764px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3085_size{width:188px;height:188px}.STAR3_FULL_IDLE_3085_offset{background-position:0 -955px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3085{background:url(/progress-star3-full-sprite.png) 0 -955px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3086_size{width:188px;height:188px}.STAR3_FULL_IDLE_3086_offset{background-position:-191px -955px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3086{background:url(/progress-star3-full-sprite.png) -191px -955px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3087_size{width:188px;height:188px}.STAR3_FULL_IDLE_3087_offset{background-position:-382px -955px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3087{background:url(/progress-star3-full-sprite.png) -382px -955px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3088_size{width:188px;height:188px}.STAR3_FULL_IDLE_3088_offset{background-position:-573px -955px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3088{background:url(/progress-star3-full-sprite.png) -573px -955px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3089_size{width:188px;height:188px}.STAR3_FULL_IDLE_3089_offset{background-position:-764px -955px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3089{background:url(/progress-star3-full-sprite.png) -764px -955px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3090_size{width:188px;height:188px}.STAR3_FULL_IDLE_3090_offset{background-position:-955px -955px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3090{background:url(/progress-star3-full-sprite.png) -955px -955px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3091_size{width:188px;height:188px}.STAR3_FULL_IDLE_3091_offset{background-position:0 -1146px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3091{background:url(/progress-star3-full-sprite.png) 0 -1146px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3092_size{width:188px;height:188px}.STAR3_FULL_IDLE_3092_offset{background-position:-191px -1146px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3092{background:url(/progress-star3-full-sprite.png) -191px -1146px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3093_size{width:188px;height:188px}.STAR3_FULL_IDLE_3093_offset{background-position:-382px -1146px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3093{background:url(/progress-star3-full-sprite.png) -382px -1146px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3094_size{width:188px;height:188px}.STAR3_FULL_IDLE_3094_offset{background-position:-573px -1146px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3094{background:url(/progress-star3-full-sprite.png) -573px -1146px/1143px 1334px no-repeat;width:188px;height:188px}.STAR3_FULL_IDLE_3095_size{width:188px;height:188px}.STAR3_FULL_IDLE_3095_offset{background-position:-764px -1146px;-webkit-background-size:1143px 1334px;background-size:1143px 1334px;width:188px;height:188px}.STAR3_FULL_IDLE_3095{background:url(/progress-star3-full-sprite.png) -764px -1146px/1143px 1334px no-repeat;width:188px;height:188px}.RULES_SPRITE{background-image:url(/rules-sprite.png);background-repeat:no-repeat}.RULES_DARKBONUS_size{width:111px;height:58px}.RULES_DARKBONUS_offset{background-position:-390px -122px;-webkit-background-size:501px 180px;background-size:501px 180px;width:111px;height:58px}.RULES_DARKBONUS{background:url(/rules-sprite.png) -390px -122px/501px 180px no-repeat;width:111px;height:58px}.RULES_FULLMOONGRAPHIC_size{width:131px;height:58px}.RULES_FULLMOONGRAPHIC_offset{background-position:-273px -61px;-webkit-background-size:501px 180px;background-size:501px 180px;width:131px;height:58px}.RULES_FULLMOONGRAPHIC{background:url(/rules-sprite.png) -273px -61px/501px 180px no-repeat;width:131px;height:58px}.RULES_LIGHTBONUS_size{width:114px;height:58px}.RULES_LIGHTBONUS_offset{background-position:-273px -122px;-webkit-background-size:501px 180px;background-size:501px 180px;width:114px;height:58px}.RULES_LIGHTBONUS{background:url(/rules-sprite.png) -273px -122px/501px 180px no-repeat;width:114px;height:58px}.RULES_LUNARCYCLEGRAPHIC_size{width:270px;height:131px}.RULES_LUNARCYCLEGRAPHIC_offset{background-position:0 0;-webkit-background-size:501px 180px;background-size:501px 180px;width:270px;height:131px}.RULES_LUNARCYCLEGRAPHIC{background:url(/rules-sprite.png) 0 0/501px 180px no-repeat;width:270px;height:131px}.RULES_PHASEPAIRGRAPHIC_size{width:133px;height:58px}.RULES_PHASEPAIRGRAPHIC_offset{background-position:-273px 0;-webkit-background-size:501px 180px;background-size:501px 180px;width:133px;height:58px}.RULES_PHASEPAIRGRAPHIC{background:url(/rules-sprite.png) -273px 0/501px 180px no-repeat;width:133px;height:58px}.ddl-background{width:100%;height:100%}.ddl-background-moon-canvas{opacity:0;visibility:hidden;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%);position:absolute;left:990px;top:280px}.ddl-background-inner{position:absolute;left:-720px;top:-265px;-webkit-transform-origin:990px 280px;-ms-transform-origin:990px 280px;transform-origin:990px 280px;width:1980px;height:1280px;background:-webkit-gradient(linear,right top,left top,from(rgb(0,0,0)),color-stop(34%,rgb(24,31,57)),color-stop(50%,rgb(31,45,98)),color-stop(80%,rgb(65,83,144)),to(rgb(96,121,205)));background:-webkit-linear-gradient(right,rgb(0,0,0) 0,rgb(24,31,57) 34%,rgb(31,45,98) 50%,rgb(65,83,144) 80%,rgb(96,121,205) 100%);background:linear-gradient(-90deg,rgb(0,0,0) 0,rgb(24,31,57) 34%,rgb(31,45,98) 50%,rgb(65,83,144) 80%,rgb(96,121,205) 100%)}.ddl-background-stars{background:url(/background-sprite.png) 0 0/1980px 1936px no-repeat;width:1980px;height:1280px}.ddl-card{padding:0;border:none;opacity:0;visibility:hidden;background:transparent}.ddl-card-inner{position:absolute;left:0;top:0;width:100%;height:100%;-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.ddl-card-front,.ddl-card-face{position:absolute;left:0;top:0;width:100%;height:100%;-webkit-backface-visibility:hidden;backface-visibility:hidden}.ddl-card-default{z-index:0;opacity:1}.ddl-card-dark,.ddl-card-light{z-index:0;opacity:0}.ddl-card[data-owner=player] .ddl-card-default,.ddl-card[data-owner=moon] .ddl-card-default{z-index:0;opacity:0;-webkit-transition:opacity .25s step-end;transition:opacity .25s step-end}.ddl-card[data-owner=player] .ddl-card-light,.ddl-card[data-owner=moon] .ddl-card-dark{z-index:1;opacity:1}.ddl-card[data-owner=player] .ddl-card-dark,.ddl-card[data-owner=moon] .ddl-card-light{z-index:0;opacity:0;-webkit-transition:opacity .25s step-end;transition:opacity .25s step-end}.ddl-card-dark,.ddl-card-light{-webkit-transition:opacity .25s;transition:opacity .25s}.ddl-card-default{-webkit-transition:opacity .25s step-start;transition:opacity .25s step-start}.ddl-card-back{position:absolute;left:0;top:0;width:100%;height:100%;-webkit-transform:rotateY(180deg);transform:rotateY(180deg);-webkit-backface-visibility:hidden;backface-visibility:hidden}.ddl-card-selected{z-index:1}.ddl-card-selectable{cursor:pointer}.ddl-card-disabled{-webkit-filter:contrast(.5);filter:contrast(.5)}.ddl-card-border{width:100%;height:100%;position:absolute;left:0;top:0;z-index:2;-webkit-transform:scale(1.45);-ms-transform:scale(1.45);transform:scale(1.45);-webkit-filter:drop-shadow(0 0 10px #fff) blur(10px);filter:drop-shadow(0 0 10px #fff) blur(10px);opacity:0;pointer-events:none}.ddl-card-modal-container{position:absolute;left:0;top:0;width:100%;height:100%;opacity:0;visibility:hidden;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;pointer-events:none}.ddl-card-modal{width:450px;min-height:540px;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;background:#331b3a;-webkit-border-image:url(/border-card.png);-o-border-image:url(/border-card.png);border-image:url(/border-card.png);border-image-width:35px;border-image-outset:27px;border-image-slice:80;pointer-events:auto}.ddl-card-modal-hidden{-webkit-transform:translateY(1000px) scale(1);-ms-transform:translateY(1000px) scale(1);transform:translateY(1000px) scale(1)}.ddl-card-modal-inner-container{width:400px;height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.ddl-card-modal-card-container{width:200px;height:200px;margin-top:-100px}.ddl-card-modal-card-title{font-family:var(--ddl-font-family),sans-serif;font-weight:var(--ddl-font-weight);font-size:45px;color:#fffaed;text-align:center;margin-top:15px;min-height:45px}.ddl-card-modal-card-subtitle{font-family:var(--ddl-font-family),sans-serif;font-weight:var(--ddl-font-weight);font-size:35px;color:#ec79a9;text-align:center;margin-top:15px;min-height:35px}.ddl-card-modal-card-description-container{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;min-height:180px;margin-top:15px;font-family:var(--ddl-font-family),sans-serif;font-weight:var(--ddl-font-weight);font-size:26px;color:#f8c7e8;text-align:center;margin-top:0}.ddl-card-modal-buttons-title{font-family:var(--ddl-font-family),sans-serif;font-weight:var(--ddl-font-weight);font-size:26px;color:#fffaed;text-align:center;margin-top:15px;min-height:26px}.ddl-card-modal-buttons-container{width:100%;margin:20px 0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;gap:20px}.ddl-card-modal-button{padding:0;border:none;font-family:var(--ddl-font-family),sans-serif;font-weight:var(--ddl-font-weight);font-size:26px;color:#f8c7e8;text-align:center;margin-top:0;background-color:#74386f;padding:16px 32px;-webkit-border-image:url(/button_border.png);-o-border-image:url(/button_border.png);border-image:url(/button_border.png);border-image-slice:4 5;border-image-width:4px 5px;border-image-outset:3px 0;min-height:58px;min-width:170px;text-transform:uppercase}.ddl-card-modal-button:hover{background-color:#ff4470}.ddl-container{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:auto;overflow:hidden}.ddl-intro-text{position:absolute;left:0;top:0;width:460px;margin:0 40px;font-family:var(--ddl-font-family),sans-serif;font-weight:var(--ddl-font-weight);font-size:31px;color:#95a1cb;text-align:center;opacity:0;visibility:hidden}.ddl-loading-screen{position:absolute;left:0;top:0;width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.ddl-loading-spinner{width:150px;height:150px}.ddl-loading-text{font-family:var(--ddl-font-family),sans-serif;font-weight:var(--ddl-font-weight);font-size:24px;color:#95a1cb}.ddl-match-canvas{position:absolute;left:0;top:0;width:100%;height:100%}.ddl-match-dom-container,.ddl-match-svg-container{position:absolute;left:0;top:0;width:100%;height:100%;opacity:1}.ddl-player-score,.ddl-moon-score{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;position:absolute;gap:8px}.ddl-score-alternate-font{-webkit-box-align:center;-webkit-align-items:center;align-items:center}.ddl-player-score{position:absolute;left:28px;top:665px}.ddl-moon-score{position:absolute;right:28px;top:287px}.ddl-score-text{font-family:var(--ddl-font-family),sans-serif;font-weight:var(--ddl-font-weight);font-size:32px;color:#bbcefd;margin-top:-4px;width:38px;text-align:center}.ddl-score-star{width:28px;height:28px}.ddl-score-turn{margin-top:5px;opacity:0;visibility:hidden}.ddl-match-dialog{position:absolute;left:0;margin:0 54px;width:432px;min-height:125px;border-radius:16px;background:#131932;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-border-image:url(/border.png);-o-border-image:url(/border.png);border-image:url(/border.png);border-image-width:21px;border-image-outset:9px;border-image-slice:30}.ddl-match-dialog-text{width:100%;padding:17px;font-family:var(--ddl-font-family),sans-serif;font-weight:var(--ddl-font-weight);font-size:30px;color:#95a1cb;text-align:center}.ddl-match-dialog-highlight{font-weight:bold;text-transform:uppercase;color:#fff}.ddl-add-score-light .ddl-score-text{-webkit-animation:.25s 2 alternate addScoreText;animation:.25s 2 alternate addScoreText}.ddl-add-score-light .ddl-score-star{-webkit-animation:.25s 2 alternate addScoreStar;animation:.25s 2 alternate addScoreStar}@-webkit-keyframes addScoreText{0%{-webkit-transform:scale(1);transform:scale(1);text-shadow:0 0 0 #fff}100%{-webkit-transform:scale(1.3);transform:scale(1.3);text-shadow:0 0 10px #fff}}@keyframes addScoreText{0%{-webkit-transform:scale(1);transform:scale(1);text-shadow:0 0 0 #fff}100%{-webkit-transform:scale(1.3);transform:scale(1.3);text-shadow:0 0 10px #fff}}@-webkit-keyframes addScoreStar{0%{-webkit-filter:drop-shadow(0 0 0 #fff);filter:drop-shadow(0 0 0 #fff)}100%{-webkit-filter:drop-shadow(0 0 10px #fff);filter:drop-shadow(0 0 10px #fff)}}@keyframes addScoreStar{0%{-webkit-filter:drop-shadow(0 0 0 #fff);filter:drop-shadow(0 0 0 #fff)}100%{-webkit-filter:drop-shadow(0 0 10px #fff);filter:drop-shadow(0 0 10px #fff)}}.ddl-match-debug-buttons{position:absolute;left:25px;top:70px;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;gap:5px}.ddl-match-win-button,.ddl-match-lose-button,.ddl-match-tie-button{padding:10px}.ddl-outro-canvas{position:absolute;left:0;top:0;opacity:0;visibility:hidden}.ddl-outro-svg-container,.ddl-progress-canvas,.ddl-progress-svg-container{position:absolute;left:0;top:0;width:100%;height:100%}.ddl-progress-results-title,.ddl-progress-next-level-title,.ddl-progress-top-message,.ddl-progress-bottom-message{display:inline-block;text-align:center;font-family:var(--ddl-font-family),sans-serif;font-weight:var(--ddl-font-weight);font-size:32px;color:#a8b5f7;opacity:0;visibility:hidden;width:83%}.ddl-progress-results-title{font-size:28px}.ddl-progress-top-message{position:absolute;left:50%;top:214px;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%);color:#a8b5f7}.ddl-progress-bottom-message{position:absolute;left:50%;top:700px;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%)}.ddl-progress-next-level-title,.ddl-progress-results{position:absolute;left:0;top:700px;width:100%;text-align:center}.ddl-progress-results-stats{font-family:var(--ddl-font-family),sans-serif;font-weight:var(--ddl-font-weight);font-size:24px;color:#a8b5f7;margin:auto;margin-top:6px;opacity:0;visibility:hidden}.ddl-progress-results-stats th{width:50%;text-align:end;-webkit-padding-end:.25em;padding-inline-end:.25em;font-weight:var(--ddl-font-weight)}.ddl-progress-results-stats td{width:26%;text-align:start;-webkit-padding-start:.25em;padding-inline-start:.25em}.ddl-progress-results-stats tr{line-height:20px;vertical-align:baseline}.ddl-progress-buttons{opacity:0;visibility:hidden;position:absolute;left:0;bottom:56px;width:100%;text-align:center;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.ddl-progress-search-button,.ddl-progress-continue-button,.ddl-progress-share-button{padding:0;border:none;color:#a8b5f7;padding:16px 32px;margin:0 8px;-webkit-border-image:url(/button_border.png);-o-border-image:url(/button_border.png);border-image:url(/button_border.png);border-image-slice:4 5;border-image-width:4px 5px;border-image-outset:3px 0}.ddl-progress-continue-button{font-family:var(--ddl-font-family),sans-serif;font-weight:var(--ddl-font-weight);font-size:30px;height:60px}.ddl-progress-search-button,.ddl-progress-share-button{width:56px;height:48px;padding:4px;fill:#a8b5f7}line.ddl-progress-line-empty,line.ddl-progress-line-full{stroke-linecap:round}line.ddl-progress-line-empty{stroke:#6e7bae;stroke-width:1px;-webkit-filter:drop-shadow(0 0 5px #8294fc);filter:drop-shadow(0 0 5px #8294fc)}line.ddl-progress-line-full{stroke:#fff;stroke-width:2px;-webkit-filter:drop-shadow(0 0 10px #4757fb);filter:drop-shadow(0 0 10px #4757fb)}circle.ddl-progress-star-circle{fill:none;stroke:#6e7bae}.ddl-progress-wildcard-slot{opacity:0;visibility:hidden}.ddl-progress-wildcard-slot>path{stroke:#394a82;stroke-width:1px;fill:#000}.ddl-progress-results-total-stars{opacity:0;visibility:hidden}.ddl-progress-results-level-stars,.ddl-progress-results-total-stars{color:#fff;font-weight:bold}.ddl-rules-button{padding:0;border:none;position:absolute;left:30px;bottom:40px;width:40px;height:40px;border:solid 2px #6e7bae;border-radius:12px;font-family:sans-serif;font-weight:400;font-size:30px;color:#6e7bae;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;background:transparent}.ddl-rules-container{position:absolute;left:0;top:0;width:100%;height:100%;opacity:0;visibility:hidden;background:rgba(0,0,0,.7);display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;pointer-events:auto;z-index:1}.ddl-rules{width:485px;min-height:800px;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;background:-webkit-gradient(linear,left top,left bottom,from(#445794),to(#303b61));background:-webkit-linear-gradient(#445794,#303b61);background:linear-gradient(#445794,#303b61);-webkit-border-image:url(/border.png);-o-border-image:url(/border.png);border-image:url(/border.png);border-image-width:24px;border-image-outset:10px;border-image-slice:30;visibility:hidden;-webkit-transform:translateY(1000px) scale(1);-ms-transform:translateY(1000px) scale(1);transform:translateY(1000px) scale(1)}.ddl-rules-title{font-family:var(--ddl-font-family),sans-serif;font-weight:var(--ddl-font-weight);font-size:38px;margin-top:30px;text-align:center;color:#fff;text-transform:uppercase}.ddl-rules-subtitle-container{width:465px;min-height:100px;margin:15px 0;font-family:var(--ddl-font-family),sans-serif;font-weight:var(--ddl-font-weight);font-size:20px;color:#fff;text-align:center;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.ddl-rules-subtitle{width:100%;margin-top:25px}.ddl-rules-subtitle-container .ddl-rules-subtitle:first-child{margin:0}.ddl-rules-matches{background:black;border-radius:12px;margin-top:3px;width:465px;min-height:345px;font-family:var(--ddl-font-family),sans-serif;font-weight:var(--ddl-font-weight);font-size:20px;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.ddl-matches-title{margin-top:15px}.ddl-matches-title,.ddl-bonus-title{font-family:var(--ddl-font-family),sans-serif;font-weight:var(--ddl-font-weight);font-size:26px;text-align:center;color:#fff;text-transform:uppercase}.ddl-rules-match-row{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;margin-top:15px}.ddl-rules-match{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.ddl-rules-match-pair{width:50%}.ddl-match-cycle{margin:20px 0 10px}.ddl-rules-match-title{color:white;text-align:center;margin-top:8px}.ddl-rules-match-points{color:#7589d9;text-align:center}.ddl-rules-phase-graphic{background:url(/rules-sprite.png) -273px 0/501px 180px no-repeat;width:133px;height:58px}.ddl-rules-fullmoon-graphic{background:url(/rules-sprite.png) -273px -61px/501px 180px no-repeat;width:131px;height:58px}.ddl-rules-cycle-graphic{background:url(/rules-sprite.png) 0 0/501px 180px no-repeat;width:270px;height:131px}.ddl-rules-bonus{width:465px;min-height:140px;margin:22px 0 10px;font-family:var(--ddl-font-family),sans-serif;font-weight:var(--ddl-font-weight);font-size:16px;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;gap:7px}.ddl-bonus-row{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;gap:20px}.ddl-bonus-light{background:url(/rules-sprite.png) -273px -122px/501px 180px no-repeat;width:114px;height:58px}.ddl-bonus-dark{background:url(/rules-sprite.png) -390px -122px/501px 180px no-repeat;width:111px;height:58px}.ddl-bonus-subtitle{color:white;text-align:center;width:100%}.ddl-rules-close{position:absolute;top:10px;right:10px;width:40px;height:40px;padding:0;border:none;background:transparent;padding:5px;-webkit-transition:-webkit-filter .2s,-webkit-transform .1s;transition:-webkit-filter .2s,-webkit-transform .1s;transition:filter .2s,transform .1s;transition:filter .2s,transform .1s,-webkit-filter .2s,-webkit-transform .1s}.ddl-rules-close:hover{-webkit-filter:brightness(.75);filter:brightness(.75)}.ddl-skip-button{padding:0;border:none;position:absolute;right:20px;bottom:50px;min-width:100px;min-height:50px;font-family:var(--ddl-font-family),sans-serif;font-weight:var(--ddl-font-weight);font-size:24px;color:#a8b5f7;padding:16px 32px;margin:0 8px;-webkit-border-image:url(/button_border.png);-o-border-image:url(/button_border.png);border-image:url(/button_border.png);border-image-slice:4 5;border-image-width:4px 5px;border-image-outset:3px 0}.ddl-star-white{fill:#fff;stroke:#bbcefd;stroke-width:1px}.ddl-star-black{fill:#000;stroke:#5e7cd2;stroke-width:1px}.ddl-tile{background:url(/cards-sprite.png) -927px -203px/1012px 509px no-repeat;width:50px;height:50px;padding:0;border:none;-webkit-transform-origin:center;-ms-transform-origin:center;transform-origin:center;opacity:0}.ddl-tile-border{width:100%;height:100%;opacity:0;-webkit-transform:scale(.85);-ms-transform:scale(.85);transform:scale(.85)}.ddl-tile-selectable .ddl-tile-border{-webkit-animation:.6s infinite alternate pulseAnimation;animation:.6s infinite alternate pulseAnimation;-webkit-animation-timing-function:linear;animation-timing-function:linear}.ddl-tile-selectable{cursor:pointer}@-webkit-keyframes pulseAnimation{0%{opacity:0}100%{opacity:1}}@keyframes pulseAnimation{0%{opacity:0}100%{opacity:1}}.ddl-connection-default,.ddl-connection-highlight{opacity:1}.ddl-doodle-container{--ddl-font-family:"Nebulove";--ddl-font-weight:normal}#hplogo{-webkit-transition:opacity .2s;transition:opacity .2s;touch-action:none;-webkit-touch-callout:none}#ddlDomRoot{overflow:hidden}.ddl-doodle-container{width:540px;height:960px;overflow:hidden}.ddl-content{position:absolute;left:0;top:0;width:100%;height:100%}.ddl-doodle-content{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:auto}.ddl-game-container{width:100%;height:100%}.ddl-frame{position:absolute;left:0;top:0;width:100%;height:100%;-webkit-border-image:url(/GoogleFrame.png);-o-border-image:url(/GoogleFrame.png);border-image:url(/GoogleFrame.png);border-image-width:38px;border-image-outset:0;border-image-slice:85;border-image-repeat:repeat stretch;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:reverse;-webkit-flex-direction:column-reverse;flex-direction:column-reverse;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.ddl-frame-month{min-width:100px;min-height:30px;font-family:var(--ddl-font-family),sans-serif;font-weight:var(--ddl-font-weight);font-size:30px;color:#95a1cb;text-align:center;margin-bottom:32px;text-transform:uppercase}.ddl-doodle-fade{position:absolute;left:0;top:0;width:100%;height:100%;opacity:0;visibility:hidden;background:white}.closeFullscreenBtn{z-index:3000}.expanderHide{opacity:0}#sadoodle .showCta .moonCta,#fpdoodle .showCta .moonCta{opacity:1}#ctaRoot{background:none}.ddl-play-button{position:absolute;top:100px;left:200px;height:100px;width:100px;pointer-events:none;background:none;opacity:0}@-webkit-keyframes playFade{0%{opacity:0}100%{opacity:1}}@keyframes playFade{0%{opacity:0}100%{opacity:1}}.ddl-play-button.showPlayButton{-webkit-animation:playFade .1s linear 1 forwards;animation:playFade .1s linear 1 forwards}.ctaHideDuringLightbox .ddl-play-button{opacity:0}.ctaAnimated #moon-animated{display:block}.ctaAnimated #moon-static{display:none}#ddlContentRoot button{pointer-events:auto}.ddl-button{cursor:pointer;-webkit-transition:background-color .2s linear,-webkit-transform .1s linear;transition:background-color .2s linear,-webkit-transform .1s linear;transition:background-color .2s linear,transform .1s linear;transition:background-color .2s linear,transform .1s linear,-webkit-transform .1s linear}.ddl-button-default{background-color:#141831}.ddl-button-default:hover{background-color:#515dc8}.ddl-button:active{-webkit-transform:scale(.9);-ms-transform:scale(.9);transform:scale(.9)}.ddl-mute-button{position:absolute;left:18px;top:18px;width:52px;height:52px;background:none;fill:#6e7bae;stroke:#6e7bae;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;cursor:pointer}.hplogocta{width:100%;height:100%;-webkit-background-size:contain;background-size:contain;background-position:center;border:none;overflow:hidden;position:absolute;left:0;top:0;z-index:10;cursor:pointer;padding:0;-webkit-transition:opacity .5s;transition:opacity .5s;opacity:0;pointer-events:auto}.hplogocta.showCta{opacity:1}.hplogocta.ctaHideDuringLightbox{display:none}.closeFullscreenBtn{pointer-events:all;cursor:pointer;position:absolute;top:5px;right:5px;z-index:3000}.domRootLightboxed{left:0;top:0}.contentHide{display:none}#ddlDomRoot{pointer-events:none}#ddl-background{pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:absolute;top:0;left:0;width:100%;height:100%}.lightboxMode,#hplogo.lightboxMode{position:fixed;top:0;left:0;height:100%;width:100%;z-index:1000;overflow:hidden}.ddlLightboxNoScroll{overflow-y:hidden}.lightboxContentContainer{position:relative;height:100%;width:100%}.lightboxEnabled .lightboxContentContainer{height:90%;width:90%}.lightboxContent{-webkit-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0}.lightboxContainer{position:absolute;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:100%;height:100%;left:0;top:0}.lightboxBackground{opacity:0;background-color:rgba(0,0,0,.8)}.lightboxEnabled{opacity:1;-webkit-transition:opacity .5s;transition:opacity .5s}.ddl-share-modal{position:absolute;left:0;top:0;width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.ddl-modal-overlay{position:absolute;height:100%;width:100%;left:0;top:0;background:#000;border-radius:0;opacity:.32;-webkit-transition:opacity .15s;transition:opacity .15s;-webkit-animation:ddl-overlay-fade-in .15s 1;animation:ddl-overlay-fade-in .15s 1}.ddl-closing .ddl-modal-overlay{opacity:0}@-webkit-keyframes ddl-overlay-fade-in{0%{opacity:0}to{opacity:.32}}@keyframes ddl-overlay-fade-in{0%{opacity:0}to{opacity:.32}}.ddl-modal-dialog{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start;margin:0 0 24px;isolation:isolate;position:absolute;width:364px;height:328px;left:88px;top:308px;background:#fff;border-radius:16px;opacity:1;-webkit-transition:opacity .15s;transition:opacity .15s;-webkit-animation:ddl-dialog-fade-in 83ms 1,ddl-dialog-grow-in .15s 1;animation:ddl-dialog-fade-in 83ms 1,ddl-dialog-grow-in .15s 1;overflow:hidden}@-webkit-keyframes ddl-dialog-fade-in{0%{opacity:0}to{opacity:1}}@keyframes ddl-dialog-fade-in{0%{opacity:0}to{opacity:1}}@-webkit-keyframes ddl-dialog-grow-in{0%{scale:.8}to{scale:1}}@keyframes ddl-dialog-grow-in{0%{scale:.8}to{scale:1}}.ddl-closing .ddl-modal-dialog{opacity:0}.ddl-modal-header{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start;padding-top:12px;padding-bottom:0;-webkit-padding-start:24px;padding-inline-start:24px;-webkit-padding-end:12px;padding-inline-end:12px;height:61px;-webkit-box-flex:0;-webkit-flex:none;flex:none;-webkit-box-ordinal-group:1;-webkit-order:0;order:0;-webkit-align-self:stretch;align-self:stretch;-webkit-flex-grow:0;flex-grow:0;z-index:0}.ddl-modal-header-text{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end;padding:12px 0 0;gap:10px;width:280px;height:36px;-webkit-box-flex:0;-webkit-flex:none;flex:none;-webkit-box-ordinal-group:1;-webkit-order:0;order:0;-webkit-box-flex:1;-webkit-flex-grow:1;flex-grow:1;font-family:Google Sans;font-style:normal;font-weight:400;font-size:28px;line-height:36px;color:#000}.ddl-modal-close{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;background:transparent;width:48px;height:48px;-webkit-box-flex:0;-webkit-flex:none;flex:none;-webkit-box-ordinal-group:2;-webkit-order:1;order:1;-webkit-flex-grow:0;flex-grow:0;cursor:pointer;pointer-events:auto;border:none;padding:0}.ddl-modal-close-icon{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-radius:50%;width:40px;height:40px;background:rgba(68,71,70,0);-webkit-transition:background .2s;transition:background .2s}.ddl-modal-close-icon:hover{background:rgba(68,71,70,.08)}.ddl-modal-close-icon:active{background:rgba(68,71,70,.12)}.ddl-closing .ddl-modal-close-icon{pointer-events:none}.ddl-modal-content{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:8px 24px;gap:24px;height:224px;-webkit-box-flex:0;-webkit-flex:none;flex:none;-webkit-box-ordinal-group:4;-webkit-order:3;order:3;-webkit-flex-grow:0;flex-grow:0;z-index:1}.ddl-modal-buttons{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:0;gap:24px;width:316px;height:108px;-webkit-box-flex:0;-webkit-flex:none;flex:none;-webkit-box-ordinal-group:1;-webkit-order:0;order:0;-webkit-align-self:stretch;align-self:stretch;-webkit-flex-grow:0;flex-grow:0}.ddl-modal-button-container{height:107px;-webkit-box-flex:0;-webkit-flex:none;flex:none;-webkit-box-ordinal-group:1;-webkit-order:0;order:0;-webkit-flex-grow:0;flex-grow:0}.ddl-modal-button-label{height:19px;padding:8px 0 0;font-family:Google Sans;font-style:normal;font-weight:400;font-size:14px;line-height:20px;text-align:center;color:#444746}.ddl-share-modal .ddl-share-facebook{cursor:pointer;pointer-events:auto;border:none;padding:0;width:80px;height:80px;border-radius:50%;-webkit-transition:background .2s;transition:background .2s;background:#3b5998}.ddl-share-modal .ddl-share-facebook:hover{background:#324b80}.ddl-share-modal .ddl-share-facebook:active{background:#2d4474}.ddl-share-modal .ddl-share-twitter{cursor:pointer;pointer-events:auto;border:none;padding:0;width:80px;height:80px;border-radius:50%;-webkit-transition:background .2s;transition:background .2s;background:#000}.ddl-share-modal .ddl-share-twitter:hover{background:#3f3f3f}.ddl-share-modal .ddl-share-twitter:active{background:#656565}.ddl-share-facebook-icon{padding:22.5px 30.5px}.ddl-share-email-icon,.ddl-share-twitter-icon{padding:26px 23px}.ddl-modal-copy-link-container{width:316px;height:84px;-webkit-box-flex:0;-webkit-flex:none;flex:none;-webkit-box-ordinal-group:2;-webkit-order:1;order:1;-webkit-align-self:stretch;align-self:stretch;-webkit-flex-grow:0;flex-grow:0;pointer-events:auto;cursor:pointer}.ddl-modal-copy-link{cursor:pointer;pointer-events:auto;border:none;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;gap:0;padding:0;width:316px;height:56px;background:#dde3ea;border-radius:4px;-webkit-transition:background .4s;transition:background .4s}.ddl-link-copied .ddl-modal-copy-link{pointer-events:none;background-color:#a8c7fa}.ddl-modal-copy-link-icon{padding:4px 0;width:48px;height:48px}.ddl-modal-copy-link-icon path{-webkit-transition:fill .4s;transition:fill .4s;fill:#444746}.ddl-link-copied .ddl-modal-copy-link-icon path{fill:#041e49}.ddl-modal-share-link{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;cursor:text;height:24px;padding:16px 0;-webkit-box-flex:0;-webkit-flex:none;flex:none;-webkit-box-ordinal-group:2;-webkit-order:1;order:1;-webkit-flex-grow:0;flex-grow:0;max-width:268px;font-family:Google Sans Text;font-style:normal;font-weight:400;font-size:16px;line-height:24px;color:#1f1f1f;overflow:hidden;text-overflow:ellipsis;-webkit-transition:color .4s;transition:color .4s}.ddl-link-copied .ddl-modal-share-link{color:#041e49}.ddl-modal-help-text{font-family:Google Sans Text;font-style:normal;font-weight:400;font-size:14px;line-height:20px;text-align:center;color:#444746;padding:8px}.ddl-modal-snack-bar{position:absolute;bottom:-50px;visibility:hidden}.ddl-with-snack-bar .ddl-modal-snack-bar{width:116px;height:47px;bottom:-50px;left:124px;margin:0 auto;background:#303030;border-radius:4px 4px 0 0;font-family:Google Sans Text;font-style:normal;font-weight:400;font-size:16px;line-height:47px;text-align:center;color:#f2f2f2;z-index:2;-webkit-animation:ddl-snack-bar-in .4s 1 forwards,ddl-snack-bar-out .4s 2.4s 1 forwards;animation:ddl-snack-bar-in .4s 1 forwards,ddl-snack-bar-out .4s 2.4s 1 forwards;visibility:visible}@-webkit-keyframes ddl-snack-bar-in{0%{bottom:-50px}to{bottom:0}}@keyframes ddl-snack-bar-in{0%{bottom:-50px}to{bottom:0}}@-webkit-keyframes ddl-snack-bar-out{0%{bottom:0}to{bottom:-50px}}@keyframes ddl-snack-bar-out{0%{bottom:0}to{bottom:-50px}}sentinel{}\n</style>');
        return e(b + "<style" + (d ? ' nonce="' + M(di(d)) + '"' : "") + ">.ddl-doodle-container {--ddl-font-family: 'Nebulove'; --ddl-font-weight: normal;}</style>")
    }

    function vo() {
        return L('<canvas class="ddl-play-button" width="100" height="100"></canvas>')
    }

    function wo(a) {
        a = a.month;
        return L('<div class="' + M("ddl-doodle-container") + '"><div class="' + M("ddl-background") + '"><div class="' + M("ddl-background-inner") + '"><div class="' + M("ddl-background-stars") + '"></div><canvas class="' + M("ddl-background-moon-canvas") + '"></canvas></div></div><div class="' + M("ddl-doodle-content") + '"></div><div class="' + M("ddl-rules-container") + '"></div><div class="' + M("ddl-frame") + '"><span class="' + M("ddl-frame-month") + '">' + K(a) + '</span></div><div class="' + M("ddl-doodle-mute-container") +
            '"></div><div class="' + M("ddl-doodle-fade") + '"></div></div>')
    }

    function xo() {
        return L('<div class="' + M("ddl-game-container") + '"></div>')
    }

    function yo(a) {
        a = a.text;
        return L('<button class="' + M("ddl-skip-button") + " " + M("ddl-button") + " " + M("ddl-button-default") + '">' + K(a) + "</button>")
    };

    function zo(a, b) {
        return m(function* () {
            a.o = b;
            return yield b.play()
        })
    }
    var Ao = class {
        constructor(a) {
            this.Ha = a;
            this.i = po()
        }
        play() {
            const a = this;
            return m(function* () {
                for (; ;) {
                    const b = N(xo);
                    a.Ha.appendChild(b);
                    yield a.j(b);
                    b.remove()
                }
            })
        }
        update(a) {
            let b;
            (b = this.o) == null || b.update(a)
        }
    },
        Co = class extends Ao {
            constructor() {
                super(...arguments);
                this.g = new cm
            }
            j(a) {
                const b = this;
                return m(function* () {
                    b.g.g = -1;
                    yield zo(b, new mo(a, b.g, 0));
                    var c = b.g.j === 0 ? b.g.i.length === 0 ? [$k, bl, dl] : [$k, tm(cl), tm(el)] : [tm(al), tm(cl), tm(el)];
                    let d;
                    for (let h = 0; h < c.length; ++h) {
                        d = yield zo(b, new qn(a, c[h], b.g.i,
                            b.i, b.g.j));
                        b.g.u = d.Ba.Ra.total;
                        b.g.Ba += d.Ba.Ra.total;
                        b.g.Ja += d.Ja;
                        d.result === 0 && b.g.j++;
                        var e = d,
                            f = b.g.Ba;
                        H("d4", e.result);
                        H("d5", e.Ba.Ra.total);
                        H("d13", e.Ba.Ra.Na);
                        H("d15", e.Ba.Ra.Ua);
                        H("d6", e.Ba.Xa.total);
                        H("d14", e.Ba.Xa.Na);
                        H("d16", e.Ba.Xa.Ua);
                        G.s = f;
                        I(e.result === 0 ? 106 : e.result === 1 ? 107 : 108);
                        G.c = 20 + 2 * Yl;
                        I(1);
                        delete G.d9;
                        delete G.d4;
                        delete G.d5;
                        delete G.d13;
                        delete G.d15;
                        delete G.d6;
                        delete G.d14;
                        delete G.d16;
                        yield zo(b, new mo(a, b.g, d.result === 0 ? 2 : d.result === 2 ? 4 : 3));
                        if (d.result === 1) {
                            c = b.g;
                            c.Ba = 0;
                            c.Ja =
                                0;
                            c.j = 0;
                            for (var g of c.i) g.Mb = !1;
                            return
                        }
                        d.result === 2 && --h
                    }
                    if (g = bm(b.g)) yield zo(b, new En(a, g)), yield zo(b, new mo(a, b.g, 1))
                })
            }
        },
        Do = class extends Ao {
            constructor(a) {
                super(a);
                this.g = new cm;
                document.querySelector(".ddl-doodle-fade").style.visibility = "hidden"
            }
            j(a) {
                const b = this;
                return m(function* () {
                    if (!jj || jj === "match") yield zo(b, new qn(a, $k, Oj.map(c => new fk(c)), b.i, 0));
                    else if (jj === "outro") {
                        b.g.j = 3;
                        b.g.g = 3;
                        const c = bm(b.g);
                        c && (yield zo(b, new En(a, c)), yield zo(b, new mo(a, b.g, 1)))
                    }
                })
            }
        };

    function Eo(a) {
        a = a.Be;
        return L(sl(L('<div class="' + M("ddl-loading-screen") + '"><canvas class="' + M("ddl-loading-spinner") + '" width="150" height="150"></canvas><span class="' + M("ddl-loading-text") + '">' + K(a) + "</span></div>")))
    };
    var Fo = class extends mn {
        constructor(a, b) {
            var c = N(Eo, {
                Be: U("loading")
            });
            super(a, c);
            this.v = b;
            this.g = new Se;
            this.j = new B(new E, new gf);
            this.actions = new B(new Ve);
            a = new E;
            b = new F(uf(Oi[0]));
            c = nf;
            if (tf === void 0) throw Error();
            var d = of(tf, Oi);
            this.i = new B(a, b, new c(d));
            C(this.g, this.j);
            C(this.g, this.i);
            C(this.g, this.actions);
            this.i.get(nf).framesPerSecond = 24
        }
        o() {
            const a = this;
            return m(function* () {
                var b = a.W.querySelector(".ddl-loading-spinner").getContext("2d");
                a.g.g = [new yf(a.g), new Xe(a.g), new xf(a.g, b)];
                I(0);
                G.c = 0;
                I(1);
                jn(a, 0);
                yield kn(a, a.actions, 0, 1)
            })
        }
        H() {
            const a = this;
            return m(function* () {
                const b = [xi([13, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 16, 17, 18, 19, 20, 21, 22, 23]), (new Kg(Fe("border.png"))).i(), (new Kg(Fe("button_border.png"))).i(), (new Kg(Fe("border-card.png"))).i(), Fh().load(xe, ye, sj, "/"), a.v.load(Fe("intro.mp4")), id.Xb.i()];
                yield Promise.all([...b, ki(1500)]);
                yield O(Ul(), a.actions);
                G.c = 1;
                I(1)
            })
        }
        update(a) {
            this.g.update(a)
        }
        u() {
            const a = this;
            return m(function* () {
                var b = Gj;
                b.o.style.visibility =
                    "visible";
                b.o.style.opacity = "1";
                a.W.remove();
                qf().g[lf(14)].H()
            })
        }
    };

    function Go(a) {
        return m(function* () {
            yield a.g.promise
        })
    }
    var Ho = class {
        constructor() {
            this.g = If();
            this.va = N(yo, {
                text: U("skip")
            });
            const hasSeenIntroVideo = Bh("ddl-has_seen_intro_video", !1);
            if (!hasSeenIntroVideo) {
                this.va.style.display = "none";
                this.va.style.visibility = "hidden";
                this.va.style.opacity = "0";
                this.va.style.pointerEvents = "none";
            }
            this.va.addEventListener("click", () => {
                S(R(), w.wb);
                this.g.resolve()
            })
        }
    };

    function Io() {
        return L(sl(L("")))
    }

    function Jo() {
        return L('<div class="' + M("ddl-intro-text") + '"></div>')
    }

    function Ko(a, b) {
        if (a.v.length !== 0) {
            var c = a.v[0];
            if (!(b < c.startTime))
                if (a.v.shift(), c.type === 0) Lo(a, U(c.text)), a.g.style.top = `${c.Pa}px`, We(a.actions, new n([new q(() => {
                    a.g.style.visibility = "visible"
                }), new v(300, 0, 1, d => {
                    a.g.style.opacity = `${d}`
                })]));
                else if (c.type === 1) We(a.actions, new n([new v(300, 1, 0, d => {
                    a.g.style.opacity = `${d}`
                }), new q(() => {
                    a.g.style.visibility = "hidden"
                })]));
                else throw Error("H`" + c.type);
        }
    }

    function Mo(a, b) {
        return m(function* () {
            if (!a.N) {
                a.N = Ul(2E3);
                const c = [a.N];
                b && c.push(new v(2E3, a.video.g.volume, 0, d => {
                    a.video.g.volume = d
                }));
                yield O(new t(c), a.actions)
            }
        })
    }

    function Lo(a, b) {
        a.g.innerText = b;
        J(a.g, 25, 460, 125, 18)
    }
    var Oo = class extends mn {
        constructor(a, b) {
            const c = N(Io, {
                width: 540,
                height: 960
            });
            super(a, c);
            this.video = b;
            this.i = new Se;
            this.actions = new B(new Ve);
            this.v = [...No];
            this.j = new Ho;
            this.g = N(Jo);
            this.W.appendChild(this.video.g);
            this.W.appendChild(this.j.va);
            this.W.appendChild(this.g)
        }
        o() {
            const a = this;
            return m(function* () {
                jn(a, 1);
                J(a.j.va, 24, 175, 70, 18);
                const hasSeenIntroVideo = Bh("ddl-has_seen_intro_video", !1);
                if (!hasSeenIntroVideo) {
                    a.j.va.style.display = "none";
                    a.j.va.style.visibility = "hidden";
                    a.j.va.style.opacity = "0";
                    a.j.va.style.pointerEvents = "none";
                }
                a.video.g.addEventListener("timeupdate", () => {
                    const b = a.video.g.currentTime;
                    Ko(a, b * 1E3);
                    if (b > 29) {
                        Mo(a, !1);
                        Ch("ddl-has_seen_intro_video", !0);
                    }
                });
                C(a.i, a.actions);
                a.i.g = [new Xe(a.i)];
                yield O(Wl(), a.actions)
            })
        }
        resume() {
            this.video.resume()
        }
        pause() {
            this.video.pause()
        }
        H() {
            const a =
                this;
            return m(function* () {
                G.c = 2;
                I(1);
                const b = fj.Hc();
                fd(b, () => {
                    var d = a.video,
                        e = !b.isMuted();
                    d.g.muted = !e
                });
                const c = a.video.play();
                (yield Promise.race([c.Lc.then(() => !1), Go(a.j).then(() => m(function* () {
                    I(101);
                    yield Mo(a, !0);
                    return !0
                }))])) || (G.c = 3, I(1))
            })
        }
        update(a) {
            this.i.update(a)
        }
        u() {
            const a = this;
            return m(function* () {
                a.W.remove();
                yield O(Wl(), a.actions);
                xj(Gj, 1)
            })
        }
    };
    const No = [{
        type: 0,
        startTime: 1664,
        Pa: 590,
        text: "intro_01_2"
    }, {
        type: 1,
        startTime: 7613
    }, {
        type: 0,
        startTime: 9568,
        Pa: 710,
        text: "intro_02"
    }, {
        type: 1,
        startTime: 18554
    }, {
        type: 0,
        startTime: 19385,
        Pa: 730,
        text: "intro_03"
    }, {
        type: 1,
        startTime: 25200
    }, {
        type: 0,
        startTime: 26749,
        duration: 3333,
        Pa: 280,
        text: "intro_04"
    }, {
        type: 1,
        startTime: 29078
    }];

    function Po(a) {
        a.isVisible = !0;
        Vd() && a.i.start()
    }
    var Qo = class {
        constructor(a) {
            this.g = new Se;
            this.isVisible = !0;
            this.i = new $d(e => {
                this.update(e)
            });
            const b = a.getContext("2d");
            a.classList.add("showPlayButton");
            this.g.g = [new yf(this.g), new xf(this.g, b)];
            const {
                Yd: c,
                animation: d
            } = pf();
            C(this.g, new B(new E, new gf, c, d));
            this.g.update(1)
        }
        update(a) {
            Vd() && this.isVisible && this.g.update(a)
        }
        pause() {
            this.i.pause()
        }
        resume() {
            this.isVisible && Vd() && this.i.start()
        }
    };

    function Ro(a) {
        var b = U("tutorial_01");
        return m(function* () {
            yield O(mm(a.v, b), a.actions);
            yield P(7E3, a.actions)
        })
    }

    function So(a) {
        return m(function* () {
            G.c = 5;
            I(1);
            yield Promise.all([To(a, "waxing_crescent", "0"), Uo(a, U("tutorial_02"), 0)]);
            yield Vo(a, "waxing_crescent", "1", {
                text: U("tutorial_03"),
                duration: 4E3
            })
        })
    }

    function Uo(a, b, c) {
        return m(function* () {
            yield O(nm(a.v, b), a.actions);
            c > 0 && (yield P(c, a.actions))
        })
    }

    function Wo(a) {
        return m(function* () {
            G.c = 6;
            I(1);
            yield Promise.all([To(a, "third_quarter", "3"), Uo(a, U("tutorial_05"), 0)]);
            yield Vo(a, "first_quarter", "4", {
                text: U("tutorial_06"),
                duration: 4E3
            })
        })
    }

    function Xo(a) {
        return m(function* () {
            G.c = 7;
            I(1);
            yield Promise.all([To(a, "new_moon", "6"), To(a, "third_quarter", "8")]);
            yield Uo(a, U("tutorial_08"), 0);
            yield Vo(a, "waning_crescent", "7", {
                text: U("tutorial_09"),
                duration: 4E3
            })
        })
    }

    function Yo(a) {
        return m(function* () {
            G.c = 8;
            I(1);
            yield Promise.all([To(a, "waning_gibbous", "5"), new Promise(b => m(function* () {
                yield P(1E3, a.actions);
                yield Uo(a, U("tutorial_11"), 7E3);
                b()
            }))])
        })
    }

    function Zo(a) {
        return m(function* () {
            G.c = 9;
            I(1);
            yield Promise.all([Uo(a, U("tutorial_12"), 0), Vo(a, "full_moon", "2", {
                text: U("tutorial_13"),
                duration: 7E3
            })])
        })
    }

    function $o(a) {
        return m(function* () {
            G.c = 10;
            I(1);
            yield Promise.all([Uo(a, U("tutorial_15"), 5E3), O((new Tl(a.o, a.g, a.i, a.u)).create(), a.actions)])
        })
    }

    function ap(a) {
        return m(function* () {
            G.c = 11;
            I(1);
            yield Promise.all([Uo(a, U("landingpage_rules"), 7E3), new Promise(b => m(function* () {
                yield P(1E3, a.actions);
                yield aj(po().button, a.actions, 300);
                b()
            }))])
        })
    }

    function bp(a) {
        return m(function* () {
            yield Tk(a.i, a.actions);
            yield Ro(a);
            yield So(a);
            yield Uo(a, U("tutorial_04"), 4E3);
            yield Wo(a);
            yield Uo(a, U("tutorial_07"), 5E3);
            yield Xo(a);
            yield Uo(a, U("tutorial_10"), 3E3);
            yield Yo(a);
            yield Zo(a);
            yield Uo(a, U("tutorial_14"), 4E3);
            yield P(1E3, a.actions);
            yield $o(a);
            yield P(1E3, a.actions);
            yield ap(a);
            yield O(om(a.v), a.actions)
        })
    }

    function To(a, b, c) {
        return m(function* () {
            var d = a.N;
            d = em(d, Lj[b], d.cardSize);
            const e = a.i.tiles.get(c),
                f = d.get(T).el;
            d.get(E).position.set(270, -100);
            ak(d, 180);
            $e(d.get(V).Aa, Vk(a.i));
            C(a.g, d);
            a.H.appendChild(f);
            yield aj(f, a.actions, 10);
            yield cp(a, {
                T: d,
                ya: e,
                ha: a.O
            })
        })
    }

    function Vo(a, b, c, d) {
        return m(function* () {
            var e = a.N;
            e = em(e, Lj[b], e.cardSize);
            yield dp(a, a.o, e);
            a.i.tiles.get(c);
            e = new Set([c]);
            for (var f of a.g.find(Y)) {
                const g = f.get(Y);
                g.g = e.has(g.id);
                const h = f.get(Bk);
                h.i = !1;
                h.set(g.g);
                h.update(f)
            }
            f = yield Gm(new Lm(a.g, a.o, a.j, a.actions));
            f = [cp(a, f)];
            d && f.push(Uo(a, d.text, d.duration));
            yield Promise.all(f)
        })
    }

    function cp(a, b) {
        return m(function* () {
            b.T.get(W);
            yield Xk(a.i, b.ya, b.T, a.actions);
            yield rk(b.ha.get(X).Qa, b.T);
            b.T.get(gk).set(!1);
            var c = Hk(a.ka, b);
            for (const d of c) c = (new Pm(d, a.i, a.g, a.u)).create(), yield O(c, a.actions), a.state.update(d)
        })
    }

    function dp(a, b, c) {
        return m(function* () {
            yield qk(b.get(X).Qa, c, a.actions, a.g)
        })
    }
    var ep = class {
        constructor(a, b, c, d) {
            this.g = a;
            this.j = b;
            this.ta = c;
            this.actions = d;
            this.v = new pm(this.j.querySelector(".ddl-match-dialog-container"));
            this.state = new rm(this.g);
            this.H = this.j.querySelector(".ddl-match-cards");
            this.u = this.j.querySelector(".ddl-match-stars");
            this.N = new im;
            this.o = wk(this.H);
            this.O = xk(this.H);
            this.i = new Zk($k, this.j.querySelector(".ddl-match-tiles"), this.ta, this.g);
            this.ka = new Jk(this.i)
        }
    };
    var fp = class extends mn {
        constructor(a) {
            const b = ei(ul, {
                width: 540,
                height: 960
            });
            super(a, b);
            this.g = new Se;
            this.N = new B(new E, new gf);
            this.actions = new B(new Ve);
            this.i = new Ho;
            this.j = !1;
            this.v = new ep(this.g, Z(this, ".ddl-match-dom-container"), Z(this, ".ddl-match-svg-container"), this.actions);
            this.W.appendChild(this.i.va)
        }
        o() {
            const a = this;
            return m(function* () {
                G.c = 4;
                I(1);
                qj(R(), w.Jd, 750);
                jn(a);
                var b = po().button;
                b.disabled = !0;
                b.style.opacity = "0";
                b.style.visibility = "hidden";
                a.W.appendChild(po().button);
                J(a.i.va,
                    24, 175, 70, 18);
                C(a.g, a.N);
                C(a.g, a.actions);
                var c = Z(a, ".ddl-match-canvas").getContext("2d");
                b = new Xe(a.g);
                const d = new tj(a.g),
                    e = new yf(a.g);
                c = new xf(a.g, c);
                a.g.g = [new Wj(a.g), new Uj(a.g, Bk, gk), b, d, e, c];
                b = a.v;
                C(b.g, b.o);
                C(b.g, b.O);
                Cl(b.u, b.g);
                Fl(b.u, b.g);
                a.j = !0;
                yield kn(a, a.actions, 0, 1, 750)
            })
        }
        H() {
            const a = this;
            return m(function* () {
                (yield Promise.race([bp(a.v).then(() => !1), Go(a.i).then(() => m(function* () {
                    I(102);
                    return !0
                }))])) || (G.c = 12, I(1))
            })
        }
        u() {
            const a = this;
            return m(function* () {
                rj(R(), 1875);
                yield kn(a,
                    a.actions, 1, 0, 750);
                const b = po().button;
                b.disabled = !1;
                po().button.style.opacity = "1";
                po().button.style.visibility = "visible";
                b.remove();
                a.W.remove()
            })
        }
        update(a) {
            this.j && this.g.update(a)
        }
    };
    const gp = qf(),
        cd = fj.Hc();

    function hp(a) {
        a.i.querySelector(".ddl-doodle-mute-container").appendChild(a.H.g);
        a.H.addListener(b => {
            let c;
            (c = a.j) != null && (c.g.muted = !!b)
        })
    }

    function vg(a) {
        m(function* () {
            var b = a.u;
            b.g.appendChild(b.i);
            so(b);
            C(b.u, b.actions);
            b.u.g = [new Xe(b.u)];
            J(b.g.querySelector(".ddl-rules-subtitle-container"), 24, 465, 125, 20);
            J(b.g.querySelector(".ddl-rules-matches"), 24, 465, 385, 20);
            J(b.g.querySelector(".ddl-rules-bonus"), 24, 465, 175, 20);
            b = a.i.querySelector(".ddl-doodle-content");
            yield a.play(new Fo(b, a.j));
            if (ij)
                for (; ;) yield a.play(new Do(b));
            yield a.play(new Oo(b, a.j));
            if (a.j) {
                const c = a.j.g;
                c.pause();
                c.removeAttribute("src");
                c.load();
                a.j = void 0
            }
            Bh("ddl-has_seen_tutorial", !1) || (yield a.play(new fp(b)), Ch("ddl-has_seen_tutorial", !0));
            yield a.play(new Co(b))
        })
    }
    class ip {
        constructor(a, b) {
            this.j = new Ci;
            this.i = N(wo, {
                month: U("october")
            });
            this.background = Gj = new Fj(this.i);
            this.H = new ji;
            this.v = R();
            a.i.oa.appendChild(ei(uo, {
                fontFamily: Rj,
                fontWeight: Sj
            }));
            b && (this.o = new Qo(b), Po(this.o), Dg(a, {
                Sb: () => {
                    let c;
                    (c = this.o) == null || Po(c)
                }
            }));
            this.Ha = a.i.Ha;
            this.u = po(this.i);
            tf = gp;
            bd(this.Ha);
            hp(this);
            if (kj && window.localStorage)
                for (const c of hj) window.localStorage.removeItem(c)
        }
        Va(a) {
            this.background.update(a);
            let b;
            (b = this.g) == null || b.update(a);
            this.u.update(a);
            this.v.update(a)
        }
        Tb() {
            this.g &&
                this.g.resume && this.g.resume();
            Hd() ? zc(this.i.querySelector(".ddl-doodle-content"), "pointerdown", () => gd()) : gd();
            let a;
            (a = this.o) == null || a.resume()
        }
        play(a) {
            const b = this;
            return m(function* () {
                b.g = a;
                yield b.g.play();
                b.g = void 0
            })
        }
    }
    m(function* () {
        var a = xh;
        kg = Date.now();
        G.d = a;
        !lg && Xd() && (lg = !0, I(10));
        a = [yh(), Fh().load(xe, ye, sj, "/"), xi([0, 1, 2, 14]), (new Kg(Fe("GoogleFrame.png"))).i(), Jg([`${Rj}:${Sj}`, ...ri])];
        try {
            yield Promise.all(a);
            const d = N(vo);
            a = {
                width: 540,
                height: 960,
                Bc: xh,
                orientation: "portrait-primary",
                Wa: {
                    width: 500,
                    height: 200,
                    Je: d,
                    Vd: "ctaAnimated",
                    ab: 1
                },
                le: 18E4
            };
            var b = ip,
                c = [Xd() ? void 0 : d];
            const e = new Fg(a, b, c);
            sg(e);
            return e.doodle
        } catch (d) {
            console.error("Failed to initialize Doodle. Error: ", d)
        }
    });
}).call(this);