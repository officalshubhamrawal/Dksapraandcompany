! function(t) {
    function e(t) {
        var e = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        t = t.replace(e, function(t, e, a, i) {
            return e + e + a + a + i + i
        });
        var a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
        return a ? {
            r: parseInt(a[1], 16),
            g: parseInt(a[2], 16),
            b: parseInt(a[3], 16)
        } : null
    }

    function a() {
        var t = document.createElement("canvas");
        return !(!t.getContext || !t.getContext("2d"))
    }

    function i() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
    }

    function n() {
        return i() + i() + "-" + i() + "-" + i() + "-" + i() + "-" + i() + i() + i()
    }

    function s(t) {
        var e = t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{1,2}:[0-9]{2}:[0-9]{2}$/);
        if (null !== e && e.length > 0) {
            var a = t.split(" "),
                i = a[0].split("-"),
                n = a[1].split(":");
            return new Date(i[0], i[1] - 1, i[2], n[0], n[1], n[2])
        }
        var s = Date.parse(t);
        return isNaN(s) ? (s = Date.parse(t.replace(/-/g, "/").replace("T", " ")), isNaN(s) ? new Date : s) : s
    }

    function r(t, e, a, i, n) {
        for (var s = {}, r = {}, o = {}, h = {}, d = {}, u = {}, l = null, f = 0; f < i.length; f++) {
            var c, p = i[f];
            c = null === l ? a / m[p] : m[l] / m[p];
            var _ = t / m[p],
                b = e / m[p];
            n && (_ = _ > 0 ? Math.floor(_) : Math.ceil(_), b = b > 0 ? Math.floor(b) : Math.ceil(b)), "Days" !== p && (_ %= c, b %= c), s[p] = _, o[p] = Math.abs(_), r[p] = b, u[p] = Math.abs(b), h[p] = Math.abs(_) / c, d[p] = Math.abs(b) / c, l = p
        }
        return {
            raw_time: s,
            raw_old_time: r,
            time: o,
            old_time: u,
            pct: h,
            old_pct: d
        }
    }

    function o() {
        "undefined" != typeof d.TC_Instance_List ? p = d.TC_Instance_List : d.TC_Instance_List = p, h(d)
    }

    function h(t) {
        for (var e = ["webkit", "moz"], a = 0; a < e.length && !t.requestAnimationFrame; ++a) t.requestAnimationFrame = t[e[a] + "RequestAnimationFrame"], t.cancelAnimationFrame = t[e[a] + "CancelAnimationFrame"];
        t.requestAnimationFrame && t.cancelAnimationFrame || (t.requestAnimationFrame = function(e, a, i) {
            "undefined" == typeof i && (i = {
                data: {
                    last_frame: 0
                }
            });
            var n = (new Date).getTime(),
                s = Math.max(0, 16 - (n - i.data.last_frame)),
                r = t.setTimeout(function() {
                    e(n + s)
                }, s);
            return i.data.last_frame = n + s, r
        }, t.cancelAnimationFrame = function(t) {
            clearTimeout(t)
        })
    }
    var d = window;
    Object.keys || (Object.keys = function() {
        "use strict";
        var t = Object.prototype.hasOwnProperty,
            e = !{
                toString: null
            }.propertyIsEnumerable("toString"),
            a = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
            i = a.length;
        return function(n) {
            if ("object" != typeof n && ("function" != typeof n || null === n)) throw new TypeError("Object.keys called on non-object");
            var s, r, o = [];
            for (s in n) t.call(n, s) && o.push(s);
            if (e)
                for (r = 0; i > r; r++) t.call(n, a[r]) && o.push(a[r]);
            return o
        }
    }());
    var u = !1,
        l = 200,
        f = ("#debug" === location.hash, ["Days", "Hours", "Minutes", "Seconds"]),
        c = {
            Seconds: "Minutes",
            Minutes: "Hours",
            Hours: "Days",
            Days: "Years"
        },
        m = {
            Seconds: 1,
            Minutes: 60,
            Hours: 3600,
            Days: 86400,
            Months: 2678400,
            Years: 31536e3
        };
    Array.prototype.indexOf || (Array.prototype.indexOf = function(t) {
        var e = this.length >>> 0,
            a = Number(arguments[1]) || 0;
        for (a = 0 > a ? Math.ceil(a) : Math.floor(a), 0 > a && (a += e); e > a; a++)
            if (a in this && this[a] === t) return a;
        return -1
    });
    var p = {},
        _ = function(t, e) {
            this.element = t, this.container, this.listeners = null, this.data = {
                paused: !1,
                last_frame: 0,
                animation_frame: null,
                interval_fallback: null,
                timer: !1,
                total_duration: null,
                prev_time: null,
                drawn_units: [],
                text_elements: {
                    Days: null,
                    Hours: null,
                    Minutes: null,
                    Seconds: null
                },
                attributes: {
                    canvas: null,
                    context: null,
                    item_size: null,
                    line_width: null,
                    radius: null,
                    outer_radius: null
                },
                state: {
                    fading: {
                        Days: !1,
                        Hours: !1,
                        Minutes: !1,
                        Seconds: !1
                    }
                }
            }, this.config = null, this.setOptions(e), this.initialize()
        };
    _.prototype.clearListeners = function() {
        this.listeners = {
            all: [],
            visible: []
        }
    }, _.prototype.addTime = function(t) {
        if (this.data.attributes.ref_date instanceof Date) {
            var e = this.data.attributes.ref_date;
            e.setSeconds(e.getSeconds() + t)
        } else isNaN(this.data.attributes.ref_date) || (this.data.attributes.ref_date += 1e3 * t)
    }, _.prototype.initialize = function(e) {
        this.data.drawn_units = [];
        for (var i = 0; i < Object.keys(this.config.time).length; i++) {
            var n = Object.keys(this.config.time)[i];
            this.config.time[n].show && this.data.drawn_units.push(n)
        }
        t(this.element).children("div.time_circles").remove(), "undefined" == typeof e && (e = !0), (e || null === this.listeners) && this.clearListeners(), this.container = t("<div>"), this.container.addClass("time_circles"), this.container.appendTo(this.element);
        var s = this.element.offsetHeight,
            r = this.element.offsetWidth;
        0 === s && (s = t(this.element).height()), 0 === r && (r = t(this.element).width()), 0 === s && r > 0 ? s = r / this.data.drawn_units.length : 0 === r && s > 0 && (r = s * this.data.drawn_units.length);
        var o = document.createElement("canvas");
        o.width = r, o.height = s, this.data.attributes.canvas = t(o), this.data.attributes.canvas.appendTo(this.container);
        var h = a();
        h || "undefined" == typeof G_vmlCanvasManager || (G_vmlCanvasManager.initElement(o), u = !0, h = !0), h && (this.data.attributes.context = o.getContext("2d")), this.data.attributes.item_size = Math.min(r / this.data.drawn_units.length, s), this.data.attributes.line_width = this.data.attributes.item_size * this.config.fg_width, this.data.attributes.radius = (.8 * this.data.attributes.item_size - this.data.attributes.line_width) / 2, this.data.attributes.outer_radius = this.data.attributes.radius + .5 * Math.max(this.data.attributes.line_width, this.data.attributes.line_width * this.config.bg_width);
        var i = 0;
        for (var l in this.data.text_elements)
            if (this.config.time[l].show) {
                var f = t("<div>");
                f.addClass("textDiv_" + l), f.css("top", Math.round(.35 * this.data.attributes.item_size)), f.css("left", Math.round(i++ * this.data.attributes.item_size)), f.css("width", this.data.attributes.item_size), f.appendTo(this.container);
                var c = t("<span class='number'>");
                c.appendTo(f);
                var m = t("<span class='text'>");
                m.text(this.config.time[l].text), m.appendTo(f), this.data.text_elements[l] = c
            }
        this.start(), this.config.start || (this.data.paused = !0);
        var p = this;
        this.data.interval_fallback = d.setInterval(function() {
            p.update.call(p, !0)
        }, 100)
    }, _.prototype.update = function(t) {
        if ("undefined" == typeof t) t = !1;
        else if (t && this.data.paused) return;
        u && this.data.attributes.context.clearRect(0, 0, this.data.attributes.canvas[0].width, this.data.attributes.canvas[0].hright);
        var e, a, i = this.data.prev_time,
            n = new Date;
        if (this.data.prev_time = n, null === i && (i = n), !this.config.count_past_zero && n > this.data.attributes.ref_date) {
            for (var s = 0; s < this.data.drawn_units.length; s++) {
                var o = this.data.drawn_units[s];
                this.data.text_elements[o].text("0");
                var h = s * this.data.attributes.item_size + this.data.attributes.item_size / 2,
                    c = this.data.attributes.item_size / 2,
                    p = this.config.time[o].color;
                this.drawArc(h, c, p, 0)
            }
            return void this.stop()
        }
        e = (this.data.attributes.ref_date - n) / 1e3, a = (this.data.attributes.ref_date - i) / 1e3;
        var _ = "smooth" !== this.config.animation,
            b = r(e, a, this.data.total_duration, this.data.drawn_units, _),
            g = r(e, a, m.Years, f, _),
            s = 0,
            v = 0,
            y = null,
            w = this.data.drawn_units.slice();
        for (var s in f) {
            var o = f[s];
            if (Math.floor(g.raw_time[o]) !== Math.floor(g.raw_old_time[o]) && this.notifyListeners(o, Math.floor(g.time[o]), Math.floor(e), "all"), !(w.indexOf(o) < 0)) {
                if (Math.floor(b.raw_time[o]) !== Math.floor(b.raw_old_time[o]) && this.notifyListeners(o, Math.floor(b.time[o]), Math.floor(e), "visible"), !t) {
                    this.data.text_elements[o].text(Math.floor(Math.abs(b.time[o])));
                    var h = v * this.data.attributes.item_size + this.data.attributes.item_size / 2,
                        c = this.data.attributes.item_size / 2,
                        p = this.config.time[o].color;
                    "smooth" === this.config.animation ? (null === y || u || (Math.floor(b.time[y]) > Math.floor(b.old_time[y]) ? (this.radialFade(h, c, p, 1, o), this.data.state.fading[o] = !0) : Math.floor(b.time[y]) < Math.floor(b.old_time[y]) && (this.radialFade(h, c, p, 0, o), this.data.state.fading[o] = !0)), this.data.state.fading[o] || this.drawArc(h, c, p, b.pct[o])) : this.animateArc(h, c, p, b.pct[o], b.old_pct[o], (new Date).getTime() + l)
                }
                y = o, v++
            }
        }
        if (!this.data.paused && !t) {
            var M = this,
                x = function() {
                    M.update.call(M)
                };
            if ("smooth" === this.config.animation) this.data.animation_frame = d.requestAnimationFrame(x, M.element, M);
            else {
                var A = e % 1 * 1e3;
                0 > A && (A = 1e3 + A), A += 50, M.data.animation_frame = d.setTimeout(function() {
                    M.data.animation_frame = d.requestAnimationFrame(x, M.element, M)
                }, A)
            }
        }
    }, _.prototype.animateArc = function(t, e, a, i, n, s) {
        if (null !== this.data.attributes.context) {
            var r = n - i;
            if (Math.abs(r) > .5) 0 === i ? this.radialFade(t, e, a, 1) : this.radialFade(t, e, a, 0);
            else {
                var o = (l - (s - (new Date).getTime())) / l;
                o > 1 && (o = 1);
                var h = n * (1 - o) + i * o;
                if (this.drawArc(t, e, a, h), o >= 1) return;
                var u = this;
                d.requestAnimationFrame(function() {
                    u.animateArc(t, e, a, i, n, s)
                }, this.element)
            }
        }
    }, _.prototype.drawArc = function(t, e, a, i) {
        if (null !== this.data.attributes.context) {
            var n = Math.max(this.data.attributes.outer_radius, this.data.attributes.item_size / 2);
            u || this.data.attributes.context.clearRect(t - n, e - n, 2 * n, 2 * n), this.config.use_background && (this.data.attributes.context.beginPath(), this.data.attributes.context.arc(t, e, this.data.attributes.radius, 0, 2 * Math.PI, !1), this.data.attributes.context.lineWidth = this.data.attributes.line_width * this.config.bg_width, this.data.attributes.context.strokeStyle = this.config.circle_bg_color, this.data.attributes.context.stroke());
            var s, r, o, h = -.5 * Math.PI,
                d = 2 * Math.PI;
            s = h + this.config.start_angle / 360 * d;
            var l = 2 * i * Math.PI;
            "Both" === this.config.direction ? (o = !1, s -= l / 2, r = s + l) : "Clockwise" === this.config.direction ? (o = !1, r = s + l) : (o = !0, r = s - l), this.data.attributes.context.beginPath(), this.data.attributes.context.arc(t, e, this.data.attributes.radius, s, r, o), this.data.attributes.context.lineWidth = this.data.attributes.line_width, this.data.attributes.context.strokeStyle = a, this.data.attributes.context.stroke()
        }
    }, _.prototype.radialFade = function(t, a, i, n, s) {
        var r, o = e(i),
            h = this,
            u = .2 * (1 === n ? -1 : 1);
        for (r = 0; 1 >= n && n >= 0; r++) ! function() {
            var e = 50 * r,
                i = "rgba(" + o.r + ", " + o.g + ", " + o.b + ", " + Math.round(10 * n) / 10 + ")";
            d.setTimeout(function() {
                h.drawArc(t, a, i, 1)
            }, e)
        }(), n += u;
        void 0 !== typeof s && d.setTimeout(function() {
            h.data.state.fading[s] = !1
        }, 50 * r)
    }, _.prototype.timeLeft = function() {
        if (this.data.paused && "number" == typeof this.data.timer) return this.data.timer;
        var t = new Date;
        return (this.data.attributes.ref_date - t) / 1e3
    }, _.prototype.start = function() {
        d.cancelAnimationFrame(this.data.animation_frame), d.clearTimeout(this.data.animation_frame);
        var e = t(this.element).data("date");
        if ("undefined" == typeof e && (e = t(this.element).attr("data-date")), "string" == typeof e) this.data.attributes.ref_date = s(e);
        else if ("number" == typeof this.data.timer) this.data.paused && (this.data.attributes.ref_date = (new Date).getTime() + 1e3 * this.data.timer);
        else {
            var a = t(this.element).data("timer");
            "undefined" == typeof a && (a = t(this.element).attr("data-timer")), "string" == typeof a && (a = parseFloat(a)), "number" == typeof a ? (this.data.timer = a, this.data.attributes.ref_date = (new Date).getTime() + 1e3 * a) : this.data.attributes.ref_date = this.config.ref_date
        }
        this.data.paused = !1, this.update.call(this)
    }, _.prototype.restart = function() {
        this.data.timer = !1, this.start()
    }, _.prototype.stop = function() {
        "number" == typeof this.data.timer && (this.data.timer = this.timeLeft(this)), this.data.paused = !0, d.cancelAnimationFrame(this.data.animation_frame)
    }, _.prototype.destroy = function() {
        this.clearListeners(), this.stop(), d.clearInterval(this.data.interval_fallback), this.data.interval_fallback = null, this.container.remove(), t(this.element).removeAttr("data-tc-id"), t(this.element).removeData("tc-id")
    }, _.prototype.setOptions = function(e) {
        if (null === this.config && (this.default_options.ref_date = new Date, this.config = t.extend(!0, {}, this.default_options)), t.extend(!0, this.config, e), d = this.config.use_top_frame ? window.top : window, o(), this.data.total_duration = this.config.total_duration, "string" == typeof this.data.total_duration)
            if ("undefined" != typeof m[this.data.total_duration]) this.data.total_duration = m[this.data.total_duration];
            else if ("Auto" === this.data.total_duration)
            for (var a = 0; a < Object.keys(this.config.time).length; a++) {
                var i = Object.keys(this.config.time)[a];
                if (this.config.time[i].show) {
                    this.data.total_duration = m[c[i]];
                    break
                }
            } else this.data.total_duration = m.Years, console.error("Valid values for TimeCircles config.total_duration are either numeric, or (string) Years, Months, Days, Hours, Minutes, Auto")
    }, _.prototype.addListener = function(t, e, a) {
        "function" == typeof t && ("undefined" == typeof a && (a = "visible"), this.listeners[a].push({
            func: t,
            scope: e
        }))
    }, _.prototype.notifyListeners = function(t, e, a, i) {
        for (var n = 0; n < this.listeners[i].length; n++) {
            var s = this.listeners[i][n];
            s.func.apply(s.scope, [t, e, a])
        }
    }, _.prototype.default_options = {
        ref_date: new Date,
        start: !0,
        animation: "smooth",
        count_past_zero: !0,
        circle_bg_color: "#fff",
        use_background: !0,
        fg_width: .1,
        bg_width: 1.2,
        text_size: .07,
        total_duration: "Auto",
        direction: "Clockwise",
        use_top_frame: !1,
        start_angle: 0,
        time: {
            Days: {
                show: !0,
                text: "Days",
                color: "#FC6"
            },
            Hours: {
                show: !0,
                text: "Hours",
                color: "#9CF"
            },
            Minutes: {
                show: !0,
                text: "Minutes",
                color: "#BFB"
            },
            Seconds: {
                show: !0,
                text: "Seconds",
                color: "#F99"
            }
        }
    };
    var b = function(t, e) {
        this.elements = t, this.options = e, this.foreach()
    };
    b.prototype.getInstance = function(e) {
        var a, i = t(e).data("tc-id");
        if ("undefined" == typeof i && (i = n(), t(e).attr("data-tc-id", i)), "undefined" == typeof p[i]) {
            var s = this.options,
                r = t(e).data("options");
            "string" == typeof r && (r = JSON.parse(r)), "object" == typeof r && (s = t.extend(!0, {}, this.options, r)), a = new _(e, s), p[i] = a
        } else a = p[i], "undefined" != typeof this.options && a.setOptions(this.options);
        return a
    }, b.prototype.addTime = function(t) {
        this.foreach(function(e) {
            e.addTime(t)
        })
    }, b.prototype.foreach = function(t) {
        var e = this;
        return this.elements.each(function() {
            var a = e.getInstance(this);
            "function" == typeof t && t(a)
        }), this
    }, b.prototype.start = function() {
        return this.foreach(function(t) {
            t.start()
        }), this
    }, b.prototype.stop = function() {
        return this.foreach(function(t) {
            t.stop()
        }), this
    }, b.prototype.restart = function() {
        return this.foreach(function(t) {
            t.restart()
        }), this
    }, b.prototype.rebuild = function() {
        return this.foreach(function(t) {
            t.initialize(!1)
        }), this
    }, b.prototype.getTime = function() {
        return this.getInstance(this.elements[0]).timeLeft()
    }, b.prototype.addListener = function(t, e) {
        "undefined" == typeof e && (e = "visible");
        var a = this;
        return this.foreach(function(i) {
            i.addListener(t, a.elements, e)
        }), this
    }, b.prototype.destroy = function() {
        return this.foreach(function(t) {
            t.destroy()
        }), this
    }, b.prototype.end = function() {
        return this.elements
    }, t.fn.TimeCircles = function(t) {
        return new b(this, t)
    }
}(jQuery);