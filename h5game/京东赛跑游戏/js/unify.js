/*Thu Jul 20 2017 08:02:27*/
!function() {
    function isSpider() {
        var a = navigator.userAgent
          , b = /Googlebot|Feedfetcher-Google|Mediapartners-Google|Adsbot-Google|Sogou\s{1}web\s{1}spider|Sogou\s{1}inst\s{1}spider|Sogou\s{1}inst\s{1}spider\/4\.0|HaoSouSpider|360Spider|Baiduspider|bingbot|qihoobot|YoudaoBot|Sosospider|Sogou\s{1}web\s{1}spider|iaskspider|msnbot|Yahoo!\s{1}Slurp|Yahoo!\s{1}Slurp\s{1}China|yisouspider|msnbot/
          , c = b.test(a);
        return c
    }
    function namespace(name) {
        for (var arr = name.split(","), r = 0, len = arr.length; r < len; r++)
            for (var i = 0, k, n = arr[r].split("."), parent = {}; k = n[i]; i++)
                0 === i ? eval("(typeof " + k + ')==="undefined"?(' + k + '={}):"";parent=' + k) : parent = parent[k] = parent[k] || {}
    }
    function isEmbedded() {
        return navigator.userAgent.indexOf("jdapp;") > -1
    }
    function getSeparatedUrl(a) {
        var b = a.split("#")[0].split("?");
        return b
    }
    function genHash(a) {
        var b, c = 1, d = 0;
        if (a)
            for (c = 0,
            b = a.length - 1; b >= 0; b--)
                d = a.charCodeAt(b),
                c = (c << 6 & 268435455) + d + (d << 14),
                d = 266338304 & c,
                c = 0 !== d ? c ^ d >> 21 : c;
        return c
    }
    function joinArrayBySeparator(a, b) {
        if (b || (b = "|||"),
        a instanceof Array) {
            var c, d, e = "";
            for (c = 0,
            d = a.length; c < d; c++)
                e += a[c] + (c === d - 1 ? "" : b);
            return e
        }
        return a
    }
    function joinJsonBySeparator(a, b) {
        var c = "";
        b || (b = "$");
        for (var d in a)
            c += d + "=" + a[d] + "$";
        return c = c.substring(0, c.length - 1)
    }
    function jsonExtend(a, b, c) {
        var d;
        if (b instanceof Array)
            for (d = 0,
            len = b.length; d < len; d++)
                jsonExtend(a, b[d], c);
        for (d in b)
            !c && d in a || (a[d] = b[d]);
        return a
    }
    function setCookie(a, b, c, d) {
        if (a) {
            var e = "";
            if (d) {
                var f = new Date;
                f.setTime(f.getTime() + d),
                e = ";expires=" + f.toGMTString()
            }
            document.cookie = a + "=" + b + e + ";path=/;domain=" + c + ";"
        }
    }
    function getCookie(a, b) {
        var c = document.cookie.match(new RegExp("(^| )" + a + "=([^;]*)(;|$)"));
        return null !== c ? b ? c[2] : decodeURIComponent(c[2]) : ""
    }
    function flashChecker() {
        var a, b = "", c = 0;
        if (c) {
            if (a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),
            a && (b = a.GetVariable("$version"))) {
                var d = b.split(" ")[1].split(",");
                b = d[0] + "." + d[1] + " r" + d[2]
            }
        } else
            navigator.plugins && navigator.plugins.length > 0 && (a = navigator.plugins["Shockwave Flash"],
            a && (b = a.description.split(" "),
            b && b.length >= 4 && (b = b[2] + " " + b[3])));
        return b
    }
    function getParameter(a, b) {
        var c = b || document.location.href
          , d = new RegExp("(?:^|&|[?]|[/])" + a + "=([^&]*)")
          , e = d.exec(c);
        return e ? decodeURIComponent(e[1]) : null
    }
    function getSkuid() {
        var a;
        return "undefined" != typeof pageConfig && (a = pageConfig.product ? pageConfig.product.skuid : 0),
        a || ""
    }
    function getShopid() {
        var a;
        return "undefined" != typeof pageConfig && (a = pageConfig.product ? pageConfig.product.shopId : 0),
        a || ""
    }
    function getOrderid() {
        var a;
        return a = "undefined" != typeof SucInfo_OrderId ? SucInfo_OrderId : getParameter("suc_orderid"),
        a || ""
    }
    function getHashDomain() {
        var a = document.domain.replace(/.*?(\w+\.\w+)$/, "$1");
        return genHash(a)
    }
    function Ic() {
        for (var a = window.navigator, b = a.appName + a.version + lr.language + a.platform + a.userAgent + lr.javaEnabled + lr.resolution + lr.color + (document.cookie || "") + (document.referrer || ""), c = b.length, d = window.history.length; d > 0; )
            b += d-- ^ c++;
        return genHash(b)
    }
    function genUuid() {
        return (new Date).getTime() + "" + parseInt(2147483647 * Math.random())
    }
    function getOSInfo() {
        var a = navigator.userAgent.toLowerCase()
          , b = /android|iphone|ipad|ipod|windows phone|symbianos|nokia|bb/
          , c = /linux|windows|mac|sunos|solaris/
          , d = b.exec(a) || c.exec(a);
        return null === d ? "other" : d[0]
    }
    function getCurTime() {
        var a = (new Date).valueOf() + "";
        return a
    }
    function getBrowserInfo() {
        var a, b, c = {
            name: "other",
            version: "0"
        }, d = navigator.userAgent.toLowerCase(), e = [];
        for (e = [["JDAPP", /jdapp;/], ["QIHU", /qihu|360se/], ["LieBao", /(?:lbbrowser|liebaofast)\/?([\d\.]+)?/], ["Sogou", /(?:metasr|sogou[\w]*)[ \/]([\d\.]+)/], ["Opera", /(?:opera|opr|oupeng)\/([\d\.]+)/], ["BaiduBrowser", /(?:bidubrowser|baidubrowser)[\/ ]?([\d\.\w]+)/], ["BaiduBox", /baiduboxapp|baiduboxpad/], ["UC", /(?:ucweb|ucbrowser)\/?([\d\.]+)/], ["QQBrowser", /(?:qqbrowser|qqlivebrowser)\/([^\s]+)/], ["Maxthon", /maxthon\/([\d\.]+)/], ["Samsung", /samsungbrowser\/([\d\.]+)/], ["Dolphin", /aphone|apad/], ["2345", /2345/], ["Miui", /miuibrowser\/([\d\.]+)/], ["OppoBrowser", /oppobrowser\/([\d\.]+)/], ["MeiZu", / mz-/], ["WeiXin", /micromessenger\/([^\s]+)/], ["QQ", / qq\/([^\s]+)/], ["Weibo", / weibo /], ["Youku", /youku/], ["NewsApp", /newsapp/], ["AliApp", /aliapp/], ["Firefox", /firefox\/([\d\.\w]+)/], ["Chrome", /chrome\/([\d\.]+)/], ["IE", /msie[ ](\d+\.\d+)/], ["Safari", /safari\/([\d\.]+)/]],
        a = 0; a < e.length; a++)
            if (b = d.match(e[a][1])) {
                c.name = e[a][0],
                c.version = b[1] || "0";
                break
            }
        return c
    }
    function getCommonData(a) {
        var b, c = {}, d = a.logType;
        for (c.pin_sid = getParameter("sid") || getCookie("sid") || "",
        c.report_ts = getCurTime(),
        c.scr = lr.resolution,
        c.token = lr.hex_md5(c.report_ts + lr.md5Key),
        c.ut = "s",
        c.clt = "web",
        c.jvr = lr.jvr || "3.0.5",
        c.std = lr.siteId,
        c.tpc = (a.topic || lr.topic) + "." + (d === lr.logType.pv ? "pv" : d === lr.logType.cl ? "cl" : "ot"),
        c.uuid = lr.uuid,
        b = 0; b < lr.getCommonDataF.length; b++)
            lr.getCommonDataF[b](a, c);
        return c
    }
    function getJdv() {
        var a = getCookie(lr.ckJdv || "__jdv", 1).split("|")
          , b = getHashDomain()
          , c = "direct"
          , d = "none"
          , e = "-"
          , f = "-"
          , g = (new Date).getTime();
        return 6 == a.length && (b = a[0],
        c = a[1],
        e = a[2],
        d = a[3],
        f = a[4],
        g = a[5]),
        a = [b, c, e, d, f, g].join("|"),
        {
            jdv: a,
            hash: b,
            source: c,
            campaign: e,
            medium: d,
            term: f,
            time: g
        }
    }
    function compare(a, b) {
        var c, d = a.split("."), e = b.split("."), f = parseFloat(d[0]), g = parseFloat(d[1]), h = parseFloat(e[0]), i = parseFloat(e[1]);
        return c = f > h ? a : f === h && g >= i ? a : b
    }
    function updateEMSid(a) {
        var b, c, d, e = navigator.userAgent, f = /(?:^|;)pv\/(.+?)(?:;|$)/, g = e.match(f);
        if (g) {
            if (b = g[1],
            lr.EmbeddedUA) {
                var h = lr.EmbeddedUA.match(f);
                h && (b = compare(b, h[1]))
            }
        } else
            b = "1.0";
        if (getCookie(lr.ckmba_sid))
            c = getCookie(lr.ckmba_sid);
        else {
            var i = getCookie(lr.ckmba_muid)
              , j = i.split(".");
            if (3 === j.length) {
                var k = j[1]
                  , l = parseInt(j[2]);
                c = (new Date).getTime() - l > lr.ckmba_sidExp ? [1 * k + 1, 0].join(".") : [k, 0].join(".")
            } else
                c = "1.0"
        }
        d = compare(b, c),
        lr._mbaSidSeq[0] = d.split(".")[0],
        lr._mbaSidSeq[1] = 1 * (d.split(".")[1] ? d.split(".")[1] : 0) + (a ? 1 : 0),
        lr._mbaMuidSeq[1] = lr._mbaSidSeq[0],
        lr._mbaMuidSeq[2] = (new Date).getTime(),
        setCookie(lr.ckmba_sid, encodeURI(lr._mbaSidSeq.join(".")), lr.ckDomain, lr.ckmba_sidExp),
        setCookie(lr.ckmba_muid, encodeURI(lr._mbaMuidSeq.join(".")), lr.ckDomain, lr.ckmba_muidExp)
    }
    function updateMSid(a) {
        return isEmbedded() ? void updateEMSid(a) : (getCookie(lr.ckmba_sid) ? (lr._mbaSidSeq = getCookie(lr.ckmba_sid).split("."),
        lr._mbaSidSeq[1] = 1 * (void 0 === lr._mbaSidSeq[1] ? 1 : lr._mbaSidSeq[1]) + (a ? 1 : 0)) : (lr._mbaSidSeq[0] = (new Date).getTime() + "" + parseInt(1e16 * Math.random()),
        lr._mbaSidSeq[1] = a ? 1 : 0),
        void setCookie(lr.ckmba_sid, encodeURI(lr._mbaSidSeq.join(".")), lr.ckDomain, lr.ckmba_sidExp))
    }
    function updateMuid() {
        getCookie(lr.ckmba_muid) ? lr._mbaMuidSeq[0] = getCookie(lr.ckmba_muid).split(".")[0] : lr._mbaMuidSeq[0] = lr.uuid + "",
        setCookie(lr.ckmba_muid, encodeURI(lr._mbaMuidSeq.join(".")), lr.ckDomain, lr.ckmba_muidExp)
    }
    function getMSidSeq() {
        var a;
        updateMSid(),
        a = (lr._mbaSidSeq || []).slice(0);
        for (var b = 0; b < a.length; b++)
            a[b] = a[b] + "";
        return a
    }
    function getReservedCookies() {
        for (var a = [lr.ckJda, lr.ckJdv, lr.ckJdb, lr.ckJdu, lr.ckJdb, "mu_subsite", "mt_xid", "unpl"], b = [], c = 0, d = a.length; c < d; c++)
            b.push(getCookie(a[c]));
        return b.join("_").replace(/\|/g, "_")
    }
    function getMuid() {
        return updateMuid(),
        lr._mbaMuidSeq[0]
    }
    function updateMFLSeries(a) {
        if (isEmbedded()) {
            var b = a.event_id
              , c = a.event_level || b && lr.MPEventsMap[b];
            c && (lr.eventSeries.event_id = b,
            lr.eventSeries.event_level = parseInt(c),
            lr.eventSeries.event_param = a.event_param,
            lr.eventSeries.page_name = a.page_name,
            lr.eventSeries.page_param = a.page_param)
        }
    }
    function keysMap(a) {
        var b = {
            client: "cli",
            channel: "chf"
        };
        return b[a] ? b[a] : a
    }
    function logByGet(a, b) {
        var c = encodeURIComponent(a)
          , d = ("https:" === document.location.protocol ? "https:" : "http:") + lr.logUrl + "/log.gif?"
          , e = [];
        e.push("std=" + lr.siteId),
        e.push("data=" + c);
        var f = d + e.join("&")
          , g = new Image(1,1);
        g.onload = function() {
            g.onload = null,
            g = null,
            b && b()
        }
        ,
        g.src = f
    }
    function logByPost(a, b) {
        var c = new window.XMLHttpRequest;
        c.open("POST", ("https:" === document.location.protocol ? "https:" : "http:") + lr.logUrl + "?std=" + lr.siteId, !0),
        c.setRequestHeader("Content-Type", "text/plain"),
        c.onreadystatechange = function() {
            4 === c.readyState && (b && b(),
            c = null)
        }
        ,
        c.send(a)
    }
    function logCmd(a) {
        if (a && !isSpider()) {
            var b, c = getCommonData(a), d = {};
            c.data = [];
            var e = getSeparatedUrl(lr.refUrl);
            e[0] && (d.ref = e[0]),
            e[1] && (d.rpr = e[1]),
            d.ctm = getCurTime();
            var f = getCookie("pwdt_id") || getCookie("pin") || getCookie("pt_pin");
            f && (d.pin = f),
            lr.pinId && (d.pid = lr.pinId),
            e = getSeparatedUrl(lr.curUrl),
            d.ctp = a.page_name || e[0],
            d.par = a.page_param || e[1];
            var g = getJdv();
            for (d.usc = g.source,
            d.umd = g.medium,
            d.utr = g.term,
            d.ucp = g.campaign,
            d.jdv = g.jdv,
            d.vts = lr.visitTimes,
            d.seq = lr.sequenceNum,
            lr.adsCookieName && (d.adk = lr.adsCookieName),
            lr.ads && (d.ads = lr.ads),
            lr.jdpts && lr.jdpts._st && (d.ldt = (new Date).valueOf() - lr.jdpts._st),
            d.browser_ver = lr.browser.version,
            d.browser = lr.browser.name,
            d.fst = lr.firSesTime,
            d.pst = lr.preSesTime,
            d.vct = lr.curSesTime,
            d.clr = lr.color,
            d.bsl = lr.language,
            d.bsc = lr.characterSet,
            d.jav = lr.javaEnabled,
            d.flv = lr.flash_ver,
            d.tit = lr.title,
            d.hash = encodeURIComponent(document.location.hash) || "",
            d.tad = document.cookie ? "1" : "0",
            d.dataver = lr.data_version,
            a.logType === lr.logType.pv ? (d.typ = "pv",
            d.lgt = "pv",
            lr.skuId && (d.sku = lr.skuId),
            lr.orderId && (d.ord = lr.orderId),
            lr.shopId && (d.shp = lr.shopId),
            d.ext = lr.extParams) : a.logType === lr.logType.cl ? (d.typ = "cl",
            d.lgt = "cl",
            d.tar = a.tarUrl || "",
            a.cls && (d.cls = a.cls)) : a.logType === lr.logType.hm ? (d.typ = "sr",
            d.lts = "hm",
            d.lgt = "hm",
            a.cls && (d.cls = a.cls),
            a.x && (d.x = String(a.x)),
            a.y && (d.y = String(a.y)),
            document.body.scrollWidth && (d.scw = String(document.body.scrollWidth)),
            document.body.scrollHeight && (d.sch = String(document.body.scrollHeight)),
            a.offset_left && (d.ofl = String(a.offset_left))) : a.logType === lr.logType.pd ? (d.typ = "sr",
            d.lts = "ot",
            d.lgt = a.pdlogType,
            a.lgv && (d.lgv = a.lgv),
            a.pdsvj && (d.sfj = a.pdsvj)) : a.logType === lr.logType.magic ? (d.typ = "mg",
            d.lts = "ot",
            d.lgt = "mg",
            a.pdsvj && (d.sfj = a.pdsvj)) : a.logType === lr.logType.od && (d.typ = "sr",
            d.lts = "od"),
            b = 0; b < lr.getPrivateDataF.length; b++)
                lr.getPrivateDataF[b](a, d);
            for (a.logType !== lr.logType.cl && a.logType !== lr.logType.od || (d.unpl = getCookie("unpl")),
            a.logType !== lr.logType.cl && a.logType !== lr.logType.pv || (d.mjds = getCookie("_mjds")),
            c.data.push(d),
            c = JSON.stringify(c),
            lr.getRequest ? logByGet(c, a.callback) : logByPost(c, a.callback),
            b = 0; b < lr.logOldF.length; b++)
                lr.logOldF[b](a)
        }
    }
    function lg(a, b, c) {
        var d = {};
        d.pdsvj = {},
        2 === arguments.length && "object" == typeof arguments[1] ? d.pdsvj = arguments[1] : 3 === arguments.length && "object" == typeof arguments[2] && (d.pdsvj = arguments[2]),
        "object" != typeof b && (d.lgv = b),
        d.logType = lr.logType.pd,
        d.pdlogType = a,
        logCmd(d)
    }
    function logPv() {
        var a = {};
        a.logType = lr.logType.pv,
        logCmd(a)
    }
    function MPing(a) {
        if ("function" == typeof a) {
            this.ready = a
        }
    }
    function Request(a) {
        this.cmdParam = {}
    }
    function PV(a) {
        Request.call(this, "PV", null),
        this.cmdParam.logType = lr.logType.pv,
        this.setPageId(a)
    }
    function Click(a) {
        Request.call(this, "Click", null),
        this.cmdParam.logType = lr.logType.cl,
        this.cmdParam.clickType = lr.clickType.Jtag,
        this.cmdParam.event_id = a;
        var b = getSeparatedUrl(document.location.href);
        this.page_name = b[0],
        this.page_param = b[1]
    }
    function Order(a) {
        Request.call(this, "Order", null),
        this.cmdParam.logType = lr.logType.od,
        this.cmdParam.prod_id = a
    }
    function AddCart(a, b) {
        Click.call(this, a, null),
        this.reportAsOrder(b)
    }
    function RmCart(a, b) {
        Click.call(this, a, null)
    }
    function haveTag(a) {
        for (cltvalue = a.getAttribute("clstag"); !cltvalue && (a = a.parentNode,
        a && "BODY" != a.nodeName); )
            cltvalue = a.getAttribute("clstag");
        return !!cltvalue
    }
    function subUrl(a) {
        var b = 0;
        return a && a.length > 500 && (b = a.indexOf("?"),
        b && (a = a.substring(0, b))),
        a
    }
    function mouseX(a) {
        return a.pageX ? a.pageX : a.clientX ? a.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) : -1
    }
    function mouseY(a) {
        return a.pageY ? a.pageY : a.clientY ? a.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) : -1
    }
    function pageOffsetLeft() {
        var a = (document.body.scrollWidth - document.body.clientWidth) / 2;
        return parseInt(a)
    }
    function isPrey() {
        var a = lr.uuid + ""
          , b = 1 * a.substr(a.length - 2);
        return !!b && b % 10 == 8
    }
    function magictreelog(a, b) {
        var c = {}
          , d = Array.prototype.slice.call(arguments);
        d = d && d.slice(2),
        c.pdsvj = {},
        c.logType = lr.logType.magic,
        c.pdsvj.t1 = a,
        c.pdsvj.t2 = b,
        c.pdsvj.p0 = encodeURIComponent(joinArrayBySeparator(d)),
        logCmd(c)
    }
    function initMagicModel() {
        try {
            loadJS("//magicforest.jd.com/magicapp.js")
        } catch (a) {
            magictreelog("ERROR", "AT_MagicappJS")
        }
    }
    function isMeta(a) {
        if (a.metaKey || a.altKey || a.ctrlKey || a.shiftKey)
            return !0;
        var b = a.which
          , c = a.button;
        return b || void 0 === c ? 2 === b || 2 === c : 1 & !c && 2 & !c && 4 & c
    }
    function logClstag(a, b, c) {
        if (a && b) {
            var d = {};
            d.logType = lr.logType.cl,
            d.clickType = lr.clickType.Clstag,
            d.cls = a + "|" + b,
            d.tarUrl = c || "",
            logCmd(d)
        }
    }
    function getUnionSeriesJsonObj() {
        var a = getJdv()
          , b = {
            psn: lr.uuid + "|" + lr.visitTimes,
            psq: lr.sequenceNum,
            ref: encodeURIComponent(lr.curUrl),
            usc: a.source,
            ucp: a.campaign,
            umd: a.medium,
            utr: a.term,
            adk: lr.adsCookieName,
            ads: lr.ads,
            ext: lr.extParams
        };
        return b
    }
    function getUnionSeries() {
        var a = getJdv()
          , b = {
            psn: lr.uuid + "|" + lr.visitTimes,
            psq: lr.sequenceNum,
            ref: encodeURIComponent(lr.curUrl),
            usc: a.source,
            ucp: a.campaign,
            umd: a.medium,
            utr: a.term,
            adk: lr.adsCookieName,
            ads: lr.ads
        }
          , c = JSON.stringify(b);
        return c
    }
    function getAndroidUnionSeries() {
        var a = getUnionSeries();
        try {
            window.AndriodPing.setSeriesUnion(a)
        } catch (a) {}
    }
    function isDegrade(a, b) {
        function c(a) {
            var b = getCookie("__jda");
            if (b) {
                var c = b.split(".");
                if (c.length > 1) {
                    var d = c[1]
                      , e = c[1].length;
                    return d = parseInt(d.substr(e - 1, e)),
                    d >= a
                }
            }
        }
        var d = {
            "magic.000001": 2,
            "other.000000": 2
        }
          , e = new Date(2017,5,16).getTime()
          , f = new Date(2017,5,20).getTime()
          , g = (new Date).getTime();
        if (g >= e && g < f) {
            if ("magic.000001" == a && c(d[a]))
                return !0;
            if ("other.000000" == a && "pv_stock" == b && c(d[a]))
                return !0
        }
        return !1
    }
    function log(a, b) {
        var c = {}
          , d = Array.prototype.slice.call(arguments);
        d = d && d.slice(2),
        c.pdsvj = {},
        c.logType = lr.logType.pd,
        c.pdsvj.t1 = a,
        c.pdsvj.t2 = b,
        c.pdsvj.p0 = encodeURIComponent(joinArrayBySeparator(d)),
        logCmd(c)
    }
    function logJSON(a, b, c) {
        var d = {};
        d.logType = lr.logType.pd,
        d.isByJson = !0,
        d.pdsvj = {
            t1: a,
            t2: b,
            p0: c
        },
        d.toWarriors = !0,
        logCmd(d)
    }
    function nlog(a, b) {
        var c = {};
        c.logType = lr.logType.pd,
        c.pdsvj = b,
        c.topic = a,
        logCmd(c)
    }
    function expLogJSON(a, b, c) {
        var d = {};
        d.topic = "exp_log.100000",
        d.logType = lr.logType.pd,
        d.isByJson = !0,
        d.pdsvj = {
            t1: a,
            t2: b,
            p0: c
        },
        d.toWarriors = !0,
        logCmd(d)
    }
    var JA = {}
      , lr = {};
    lr.getCommonDataF = [],
    lr.updateCookieF = [],
    lr.initBF = [],
    lr.initAF = [],
    lr.getPrivateDataF = [],
    lr.clickCBF = [],
    lr.logOldF = [],
    lr.data_version = "0.1",
    lr.getCommonDataF.push(function(a, b) {
        var c, d = {
            IOS_M: {
                UAname: "iPhone",
                value: "IOS-M"
            },
            ANDROID_M: {
                UAname: "android",
                value: "ANDROID-M"
            },
            IPAD_M: {
                UAname: "iPad",
                value: "iPad-M"
            },
            MICRO_M: {
                UAname: "MicroMessenger",
                value: "WEIXIN-M"
            },
            MM: {
                UAname: "MM",
                value: "M-M"
            }
        }, e = navigator.userAgent, f = [];
        isEmbedded() ? (f = e.split(";"),
        f[1].toLowerCase() === d.IOS_M.UAname.toLowerCase() ? b.cli = d.IOS_M.value : f[1].toLowerCase() === d.ANDROID_M.UAname.toLowerCase() ? b.cli = d.ANDROID_M.value : f[1].toLowerCase() === d.IPAD_M.UAname.toLowerCase() && (b.cli = d.IPAD_M.value),
        lr.appv = f[2],
        b.osv = f[3],
        b.uid = f[4]) : e.indexOf(d.MICRO_M.UAname) > -1 ? b.cli = d.MICRO_M.value : b.cli = d.MM.value;
        for (c in lr.commonData)
            lr.commonData[c] && "page_id" !== c && (b[c] = lr.commonData[c]);
        b.biz = lr.Biz,
        b.mba_muid = lr._mbaMuidSeq[0],
        b.mba_sid = lr._mbaSidSeq[0],
        b.proj_id = "3",
        b.reserved3 = getReservedCookies(),
        b.osp = lr.os
    }),
    lr.initBF.push(function() {
        lr.siteId = lr.siteId || "MO-J2011-1",
        lr.jvr = "3.0.5"
    }),
    lr.initAF.push(function() {
        lr.ckmba_sid = "mba_sid",
        lr.ckmba_muid = "mba_muid",
        lr.ckmba_sidExp = 18e5,
        lr.ckmba_muidExp = 15552e6,
        lr._mbaMuidSeq = [],
        lr._mbaSidSeq = [],
        lr.eventSeries = {},
        lr.ProjectId = "3",
        lr.Biz = "mba",
        lr.md5Key = "5YT%aC89$22OI@pQ",
        lr.autoLogPv = lr.autoLogPv || !1,
        lr.commonData = {
            page_id: "",
            cli: "",
            chf: ""
        }
    }),
    function() {
        var a, b = window.screen, c = window.navigator;
        if ("object" == typeof jap) {
            jap.noConflict && (jap.noConflict = JA);
            for (a in jap)
                jap.hasOwnProperty(a) && (lr[a] = jap[a])
        }
        if ("undefined" != typeof jaq && jaq instanceof Array)
            for (a = 0; a < jaq.length; a++)
                "account" === jaq[a][0] && (lr.siteId = jaq[a][1]);
        for (function() {
            var a = "";
            if (document.currentScript)
                a = document.currentScript.src;
            else if (document.scripts) {
                var b;
                for (b = 0; b < document.scripts.length; b++)
                    if ("interactive" === document.scripts[b].readyState) {
                        a = document.scripts[b].src;
                        break
                    }
            }
            a.match("/wl.js") ? JA.isWl = !0 : a.match("/joya.js") ? JA.isJoya = !0 : a.match("/ja.js") ? JA.isJa = !0 : a.toLowerCase().match("/mping.min.js") && (JA.isMping = !0)
        }(),
        a = 0; a < lr.initBF.length; a++)
            lr.initBF[a]();
        lr.rpDomain = lr.rpDomain || "uranus.jd.com",
        lr.logUrl = "//" + lr.rpDomain + "/log/m",
        lr.logType = {
            pv: "1",
            pf: "2",
            cl: "3",
            od: "4",
            pd: "5",
            hm: "6",
            magic: "000001"
        },
        lr.noConflict || (window.JA = JA),
        lr.useTmpCookie ? (lr.ckJda = "__tra",
        lr.ckJdb = "__trb",
        lr.ckJdc = "__trc",
        lr.ckJdu = "__tru") : (lr.ckJda = "__jda",
        lr.ckJdb = "__jdb",
        lr.ckJdc = "__jdc",
        lr.ckJdu = "__jdu"),
        lr.ckJdv = "__jdv",
        lr.ckJdaExp = 15552e6,
        lr.ckJdbExp = 18e5,
        lr.ckJduExp = 15552e6,
        lr.ckJdvExp = 1296e6,
        lr.ckJdvEmbeddedExp = 864e5,
        lr.mtSubsiteExp = 31536e6,
        lr.skuId = lr.skuid || lr.skuId || getSkuid(),
        lr.shopId = lr.shopid || lr.shopId || getShopid(),
        lr.orderId = lr.orderid || lr.orderId || getOrderid(),
        lr.flash_ver = flashChecker(),
        lr.resolution = window.screen ? window.screen.width + "x" + window.screen.height : "-",
        lr.color = b ? b.colorDepth + "-bit" : "",
        lr.language = (c && (c.language || c.browserLanguage) || "").toLowerCase(),
        lr.javaEnabled = c && c.javaEnabled() ? 1 : 0,
        lr.characterSet = document.characterSet || document.charset || "",
        lr.topic = lr.topic || "traffic-jdm",
        lr.pinId = getCookie("pinId") || "",
        lr.account && "-" !== lr.account || (lr.pin ? lr.account = lr.pin : JA.isMping ? lr.account = getCookie("pwdt_id") || getCookie("pt_pin") : lr.account = getCookie("pin"),
        lr.account = lr.account || "-"),
        lr.ckDomain = document.domain.replace(/.*?(\w+\.\w+)$/, "$1"),
        lr.title = document.title,
        lr.refUrl = document.referrer,
        lr.curUrl = document.location.href,
        lr.browser = getBrowserInfo(),
        lr.os = getOSInfo(),
        lr.jdpts = "undefined" != typeof jdpts ? jdpts : {},
        lr.seo = ["i.easou.com:q", "m.baidu.com:word", "m.sm.cn:q", "m.so.com:q", "wap.sogou.com:keyword", "m.sogou.com:keyword", "page.roboo.com:q", "ask.com:q", "baidu:word", "baidu:wd", "bing:q", "easou:q", "google:q", "roboo:word", "roboo:q", "sm.cn:q", "so.com:q", "sogou:keyword", "sogou:query", "yahoo:p", "yandex:text", "yicha:key"],
        lr.codeVer = "0.1",
        lr.clickEvent = "touchstart"in window ? "touchstart" : "click",
        lr.clickType = {
            Clstag: 1,
            Jtag: 2
        },
        lr.adsCookieName && (lr.ads = getCookie(lr.adsCookieName)),
        lr.getRequest = !1;
        for (a = 0; a < lr.initAF.length; a++)
            lr.initAF[a]()
    }(),
    lr.updateCookieF.push(function() {
        updateMuid(),
        updateMSid(!0)
    }),
    function() {
        var a, b, c, d, e, f = (getCookie(lr.ckJda) || "").split("."), g = (getCookie(lr.ckJdb) || "").split("."), h = (getCookie(lr.ckJdv) || "").split("|"), i = (getCookie(lr.ckJdu) || "",
        getCookie(lr.ckJdc) || ""), j = parseInt((new Date).getTime() / 1e3), k = 0, l = 1, m = "direct", n = "-", o = "none", p = "-";
        if (f.length > 3)
            for (var e = 2; e < 5 && e < f.length; e++) {
                var q = f[e];
                q.length > 10 && (f[e] = q.substr(0, 10))
            }
        f.length > 5 ? (c = f[0],
        d = f[1],
        a = parseInt(f[2], 10),
        b = parseInt(f[3], 10),
        j = parseInt(f[4], 10),
        l = parseInt(f[5], 10) || l) : (d = genUuid(),
        a = j,
        b = j),
        g.length > 3 && (c || (c = g[0]),
        k = parseInt(g[1], 10) || 0),
        h.length > 4 && (c || (c = h[0]),
        m = h[1],
        n = h[2],
        o = h[3],
        p = h[4]),
        i && "" !== i && (c || (c = i));
        var r = []
          , s = g.length < 4
          , t = getParameter("utm_source")
          , u = !1
          , v = !1;
        if (t) {
            var w = getParameter("utm_campaign")
              , x = getParameter("utm_medium")
              , y = getParameter("utm_term");
            r.push(t || m),
            r.push(w || n),
            r.push(x || o),
            r.push(y || p),
            p = r[3],
            u = !0
        } else {
            var z, A = lr.refUrl && lr.refUrl.split("/")[2], B = !1;
            if (A && A.indexOf(lr.ckDomain) < 0) {
                for (z = lr.seo,
                e = 0; e < z.length; e++) {
                    var C = z[e].split(":");
                    if (A.indexOf(C[0].toLowerCase()) > -1 && lr.refUrl.indexOf((C[1] + "=").toLowerCase()) > -1) {
                        var D = getParameter(C[1], lr.refUrl);
                        /[^\x00-\xff]/.test(D) && (D = encodeURIComponent(D)),
                        r.push(C[0]),
                        r.push("-"),
                        r.push("organic"),
                        r.push(D || "not set"),
                        p = r[3],
                        B = !0;
                        break
                    }
                }
                B || (A.indexOf("zol.com.cn") > -1 ? (r.push("zol.com.cn"),
                r.push("-"),
                r.push("cpc"),
                r.push("not set")) : (r.push(A),
                r.push("-"),
                r.push("referral"),
                r.push("-")))
            }
        }
        for (v = r.length > 0 && (r[0] !== m || r[1] !== n || r[2] !== o) && "referral" !== r[2],
        s || !s && v ? (m = r[0] || m,
        n = r[1] || n,
        o = r[2] || o,
        p = r[3] || p,
        f.length > 5 ? (a = parseInt(f[2], 10),
        b = parseInt(f[4], 10),
        j = parseInt((new Date).getTime() / 1e3),
        l++,
        k = 1) : (l = 1,
        k = 1)) : k++,
        c || (c = getHashDomain()),
        setCookie(lr.ckJda, [c, d, a, b, j, l || 1].join("."), lr.ckDomain, lr.ckJdaExp),
        setCookie(lr.ckJdb, [c, k, d + "|" + l, j].join("."), lr.ckDomain, lr.ckJdbExp),
        (u || v || h.length < 5) && (isEmbedded() ? setCookie(lr.ckJdv, [c, m || "direct", n || "-", o || "none", p || "-", (new Date).getTime()].join("|"), lr.ckDomain, lr.ckJdvEmbeddedExp) : setCookie(lr.ckJdv, [c, m || "direct", n || "-", o || "none", p || "-", (new Date).getTime()].join("|"), lr.ckDomain, lr.ckJdvExp)),
        setCookie(lr.ckJdc, c, lr.ckDomain),
        lr.utm_source = m,
        lr.utm_campaign = n,
        lr.utm_medium = o,
        lr.utm_term = p,
        lr.sequenceNum = k,
        lr.firSesTime = a,
        lr.preSesTime = b,
        lr.curSesTime = j,
        lr.uuid = d,
        lr.visitTimes = l,
        lr.hashDomain = c,
        e = 0; e < lr.updateCookieF.length; e++)
            lr.updateCookieF[e]()
    }(),
    lr.getPrivateDataF.push(function(a, b) {
        if (a.logType === lr.logType.od ? (b.mba_seq = String(lr._mbaSidSeq[1]),
        b.prod_id = String(a.prod_id),
        lr.appv && (b.apv = lr.appv)) : (lr.appv && (b.apv = lr.appv),
        a.logType === lr.logType.pv ? (b.mba_seq = String(lr._mbaSidSeq[1]),
        lr.preSession && (b.psn = lr.preSession),
        lr.preSeqnum && (b.psq = lr.preSeqnum),
        lr.pre_app && (b.pap = lr.pre_app)) : a.logType === lr.logType.cl ? (b.mba_seq = String(lr._mbaSidSeq[1]),
        b.event_id = a.event_id,
        a.event_param && (b.event_param = a.event_param),
        a.event_level && (b.event_level = a.event_level)) : a.logType === lr.logType.hm || a.logType === lr.logType.pd),
        lr.commonData.page_id && (b.page_id = lr.commonData.page_id),
        a.request) {
            var c, d = a.request;
            for (c in d)
                "function" != typeof d[c] && d[c] !== a && (b[c] = d[c] ? d[c] + "" : "")
        }
        isEmbedded() && (b.pv_sid = String(lr._mbaSidSeq[0]),
        b.pv_seq = String(lr._mbaSidSeq[1]))
    }),
    lr.logOldF.push(function(a) {
        function b(a, b) {
            var c = encodeURIComponent(a)
              , d = ("https:" === document.location.protocol ? "https:" : "http:") + "//stat.m.jd.com/m/access.jpg?"
              , e = [];
            e.push("data=" + c);
            var f = d + e.join("&")
              , g = new Image(1,1);
            g.onload = function() {
                g.onload = null,
                g = null
            }
            ,
            g.src = f
        }
        function c(a, b) {
            var c = new window.XMLHttpRequest;
            c.open("POST", ("https:" === document.location.protocol ? "https:" : "http:") + "//stat.m.jd.com/m/access", !0),
            c.setRequestHeader("Content-Type", "text/plain"),
            c.onreadystatechange = function() {
                4 === c.readyState && (c = null)
            }
            ,
            c.send(a)
        }
        function d() {
            var a = (new Date).valueOf() / 1e3 + "";
            return a
        }
        if (a.logType !== lr.logType.pd && a.logType !== lr.logType.hm && a.logType !== lr.logType.magic && (a.logType !== lr.logType.cl || a.clickType === lr.clickType.Jtag)) {
            var e = getCommonData(a)
              , f = {}
              , g = {};
            g.data = [],
            isEmbedded() && (g.appv = lr.appv,
            g.osv = e.osv,
            g.guid = e.uid),
            g.client = e.cli,
            e.chf && (g.channel = e.chf),
            g.device = isEmbedded() ? e.cli : lr.os,
            g.proj_id = e.proj_id,
            g.biz = e.biz,
            g.method = "bp.report",
            g.report_ts = d(),
            g.resolu = window.innerWidth + "*" + window.innerHeight,
            g.token = lr.hex_md5(g.report_ts + lr.md5Key),
            lr.refUrl && (g.reserved1 = lr.refUrl),
            g.reserved3 = e.reserved3,
            g.mba_muid = e.mba_muid,
            g.mba_sid = e.mba_sid,
            e.pin_sid && (g.pin_sid = e.pin_sid),
            g.browser = lr.browser.name,
            g.borwser_version = lr.browser.version,
            g.mobile_model = lr.os;
            var h = getCookie("pwdt_id") || getCookie("pin") || getCookie("pt_pin");
            h && (g.m_userid = h),
            f.jdv = getJdv().jdv,
            f.type = a.logType,
            f.hash = encodeURIComponent(document.location.hash) || "",
            f.dataver = lr.data_version;
            var i = getSeparatedUrl(lr.curUrl);
            if (a.logType === lr.logType.pv ? (g.reserved2 = lr.jvr,
            f.page_ts = d(),
            f.page_name = i[0] || "",
            f.page_param = i[1] || "",
            getParameter("utm_source") && (f.utm_source = getParameter("utm_source")),
            getParameter("utm_medium") && (f.utm_medium = getParameter("utm_medium")),
            getParameter("utm_term") && (f.utm_term = getParameter("utm_term")),
            getParameter("utm_campaign") && (f.utm_campaign = getParameter("utm_campaign"))) : a.logType === lr.logType.cl ? (g.reserved4 = lr.jvr || "3.0.5",
            f.event_id = a.event_id,
            f.click_ts = d(),
            f.page_name = a.page_name || i[0] || "",
            f.page_param = a.page_param || i[1] || "",
            a.event_param && (f.event_param = a.event_param),
            a.event_level && (f.event_level = a.event_level)) : a.logType === lr.logType.od && (g.reserved4 = lr.jvr || "3.0.5",
            f.order_ts = d(),
            f.prod_id = String(a.prod_id)),
            lr.commonData.page_id && (g.page_id = lr.commonData.page_id,
            f.page_id = String(lr.commonData.page_id)),
            lr.pinId && (g.pinid = lr.pinId),
            f.pinid = lr.pinId,
            a.request) {
                var j, k = a.request;
                for (j in k)
                    "function" != typeof k[j] && k[j] !== a && (f[j] = k[j] ? k[j] + "" : ""),
                    "pinid" === j && (g.pinid = f.pinId)
            }
            f.mba_seq = String(lr._mbaSidSeq[1]),
            isEmbedded() && (f.pv_sid = String(lr._mbaSidSeq[0]),
            f.pv_seq = String(lr._mbaSidSeq[1])),
            a.logType !== lr.logType.cl && a.logType !== lr.logType.od || (f.unpl = getCookie("unpl")),
            a.logType !== lr.logType.cl && a.logType !== lr.logType.pv || (f.mjds = getCookie("_mjds")),
            g.data.push(f),
            g = JSON.stringify(g),
            lr.getRequest ? b(g, a.callback) : c(g, a.callback)
        }
    }),
    lr.logOldF.push(function(a) {
        function b(a) {
            var b = document.createElement("img");
            return b.width = 1,
            b.height = 1,
            b.src = a,
            b
        }
        function c(a) {
            var c = b(a);
            c.onload = c.onerror = function() {
                c.onload = null,
                c.onerror = null
            }
        }
        if (!(a.logType !== lr.logType.pd && a.logType !== lr.logType.hm && a.logType !== lr.logType.cl && a.logType !== lr.logType.pv || a.logType === lr.logType.cl && a.clickType !== lr.clickType.Clstag)) {
            var d = getJdv()
              , e = {
                je: String(lr.javaEnabled),
                sc: lr.color,
                sr: lr.resolution,
                ul: lr.language,
                cs: lr.characterSet,
                dt: lr.title || "-",
                hn: document.location.hostname,
                fl: lr.flash_ver,
                os: lr.os,
                br: lr.browser.name,
                bv: lr.browser.version,
                wb: String(lr.firSesTime),
                xb: String(lr.preSesTime),
                yb: String(lr.curSesTime),
                zb: String(lr.visitTimes),
                cb: String(lr.sequenceNum),
                usc: d.source,
                ucp: d.campaign,
                umd: d.medium,
                uct: d.term,
                lt: lr.jdpts && lr.jdpts._st ? (new Date).valueOf() - lr.jdpts._st : "-",
                ct: String((new Date).getTime()),
                tad: document.cookie ? "1" : "0",
                pinid: lr.pinId || "-",
                jdv: d.jdv,
                hash: encodeURIComponent(document.location.hash) || "",
                dataver: lr.data_version
            }
              , f = ""
              , g = ""
              , h = lr.refUrl || "-"
              , i = lr.jav || "wap"
              , j = ""
              , k = [];
            a.topic ? j = a.topic : a.logType === lr.logType.pv ? (j = "m.100000",
            e.js_ver = lr.jvr || "3.0.5") : j = "other.000000",
            lr.utmp ? (g = 0 === lr.utmp.indexOf("http:") || 0 === lr.utmp.indexOf("https:") ? lr.utmp : document.location.protocol + "//" + document.domain + lr.utmp,
            g += (g.indexOf("?") >= 0 ? "&jav=" : "?jav=") + i) : g = lr.curUrl,
            a.logType === lr.logType.cl ? (e.js_ver = lr.jvr || "3.0.5",
            k = a.cls.split("|"),
            a.pdsvj = {
                t1: k[0],
                t2: k[1],
                cb: lr.sequenceNum
            },
            a.tarUrl ? a.pdsvj.p0 = encodeURIComponent(joinArrayBySeparator(["Q", a.tarUrl])) : a.pdsvj.p0 = encodeURIComponent(joinArrayBySeparator(["Q"]))) : a.logType === lr.logType.hm && (a.pdsvj = {
                t1: "d",
                t2: "c",
                p0: encodeURIComponent(joinArrayBySeparator([a.cls, a.x + "x" + a.y, document.body.scrollWidth + "x" + document.body.scrollHeight, a.offset_left]))
            }),
            a.isByJson ? (jsonExtend(e, a.pdsvj),
            vsstring = JSON.stringify(e)) : (a.pdsvj && jsonExtend(e, a.pdsvj),
            vsstring = joinJsonBySeparator(e));
            var l = "mercury";
            a.toWarriors && (l = "warriors"),
            f = ("https:" === document.location.protocol ? "https://" + l : "http://" + l) + ".jd.com/log.gif?t=" + j + "&m=" + lr.siteId + "&cul=" + encodeURIComponent(g) + "&pin=" + encodeURIComponent(lr.account) + "&uid=" + lr.uuid + "&sid=" + lr.uuid + "|" + lr.visitTimes + "&ref=" + encodeURIComponent(h) + "&v=" + encodeURIComponent(vsstring) + "&rm=" + (new Date).getTime(),
            c(f)
        }
    }),
    window.lg = lg,
    JA.lg = lg,
    window.lgPv = logPv,
    JA.lgPv = logPv,
    MPing.prototype.send = function(a, b) {
        a && a.cmdParam && (a.cmdParam.callback = b,
        a.cmdParam.request = a,
        updateMuid(),
        updateMSid(),
        logCmd(a.cmdParam))
    }
    ,
    MPing.prototype.ready = function() {}
    ,
    MPing.prototype.initUid = function() {}
    ,
    MPing.prototype.sendByRequest = function(a, b) {
        this.send(a, b)
    }
    ,
    MPing.prototype.sendByImg = function() {
        this.send(request, callback)
    }
    ,
    MPing.prototype.getReportData = function() {}
    ,
    MPing.prototype.isSpider = isSpider,
    MPing.prototype.options = {},
    MPing.prototype.privates = {},
    window.MPing = MPing,
    MPing.Request = Request,
    Request.prototype.getReportObj = function() {}
    ,
    Request.prototype.getTime = function() {}
    ,
    Request.prototype.setTs = function() {}
    ,
    Request.prototype.setPageParam = function() {}
    ,
    Request.prototype.getUrlInfo = function() {}
    ,
    PV.prototype = new Request,
    PV.prototype.setSourceParam = function() {}
    ,
    PV.prototype.setPvParams = function() {}
    ,
    PV.prototype.setPageId = function(a) {
        var b;
        if ("string" == typeof a || "number" == typeof a)
            this.cmdParam.page_id = a;
        else if (a && "object" == typeof a) {
            for (b in a)
                this.cmdParam[keysMap(b)] = a[b];
            this.cmdParam.cli && (this.cmdParam.cli += "-M")
        }
        for (b in lr.commonData)
            this.cmdParam[b] && (lr.commonData[b] = this.cmdParam[b])
    }
    ,
    Click.prototype = new Request,
    Click.prototype.updateEventSeries = function() {
        this.cmdParam.event_param = this.event_param,
        this.cmdParam.page_name = this.page_name,
        this.cmdParam.page_param = this.page_param,
        this.cmdParam.event_level = this.event_level,
        updateMFLSeries(this.cmdParam)
    }
    ,
    Click.prototype.setPageId = function() {}
    ,
    Click.attachEvent = function(a) {
        Click.attachedEvent || (lr.cClass = a || "J_ping",
        Click.attachedEvent = !0)
    }
    ,
    Order.prototype = new Request,
    Order.prototype.deleteSeries = function() {}
    ,
    Order.prototype.setPageParam = function() {}
    ,
    Order.prototype.setParams = function() {}
    ,
    AddCart.prototype = new Click,
    AddCart.prototype.addSeries = function() {}
    ,
    AddCart.prototype.reportAsOrder = function(a) {
        if (a) {
            var b = new Order(a)
              , c = new MPing;
            c.send(b)
        }
    }
    ,
    RmCart.prototype = new Click,
    RmCart.prototype.deleteSeries = function() {}
    ,
    MPing.inputs = {},
    MPing.inputs.PV = PV,
    MPing.inputs.Click = Click,
    MPing.inputs.AddCart = AddCart,
    MPing.inputs.RmCart = RmCart,
    MPing.inputs.Order = Order,
    MPing.EventSeries = {
        getSeries: function() {
            var a = getMSidSeq()
              , b = getJdv()
              , c = {
                m_source: isEmbedded() ? "1" : "0",
                event_series: lr.eventSeries,
                jda: getCookie(lr.ckJda),
                usc: b.source,
                ucp: b.campaign,
                umd: b.medium,
                utr: b.term,
                jdv: b.jdv,
                ref: encodeURIComponent(lr.curUrl),
                psn: lr.uuid + "|" + lr.visitTimes,
                psq: lr.sequenceNum,
                adk: lr.adsCookieName,
                ads: lr.ads,
                unpl: getCookie("unpl"),
                pc_source: getParameter("pc_source") || ""
            };
            return isEmbedded() ? (c.pv_sid = a[0] + "",
            c.pv_seq = a[1] + "",
            c.pv_timestamp = (new Date).getTime() + "") : (c.mba_muid = getMuid(),
            c.mba_sid = a[0] + ""),
            JSON.stringify(c)
        },
        androidSeries: function() {
            var a = this.getSeries();
            try {
                window.AndriodPing.setSeries(a)
            } catch (a) {}
        },
        updateUA: function(a) {
            isEmbedded() && (lr.EmbeddedUA = a,
            updateMSid(!0))
        },
        writeSeries: function() {},
        updateSeries: function() {},
        addSeries: function() {},
        deleteSeries: function() {},
        subCookieParts: function() {},
        getCookiePart: function() {},
        setCookiePart: function() {},
        getAllSubCookies: function() {},
        setSubCookieValue: function() {},
        getDomain: function() {},
        param: function() {}
    },
    function() {
        var a, b, c, d, e = navigator.userAgent;
        if (e && (isEmbedded() || e.indexOf("Android") >= 0 || e.indexOf("iPhone") >= 0)) {
            var f, g;
            e += ";";
            var h = function(a) {
                var b = a + "/"
                  , c = e.indexOf(b)
                  , d = 0
                  , f = "";
                return c >= 0 && (c += b.length,
                d = e.indexOf(";", c),
                c < d && (f = e.substring(c, d))),
                f
            };
            e.indexOf("psn/") >= 0 && (f = e.indexOf("psn/") + 4,
            g = e.indexOf(";", f),
            f <= g && (a = e.substring(f, g))),
            e.indexOf("psq/") >= 0 && (f = e.indexOf("psq/") + 4,
            g = e.indexOf(";", f),
            f <= g && (b = e.substring(f, g))),
            e.indexOf("ref/") >= 0 && (f = e.indexOf("ref/") + 4,
            g = e.indexOf(";", f),
            f <= g && (lr.refUrl = decodeURIComponent(e.substring(f, g)))),
            e.indexOf("pap/") >= 0 && (f = e.indexOf("pap/") + 4,
            g = e.indexOf(";", f),
            f <= g && (lr.pre_app = e.substring(f, g)));
            var i = !0
              , j = h("jdv")
              , k = (new Date).getTime();
            if (j) {
                var l = decodeURIComponent
                  , m = l(j).split("|");
                m.length > 5 && (c = lr.utm_source = m[1],
                lr.utm_campaign = m[2],
                lr.utm_medium = m[3],
                lr.utm_term = m[4],
                m[5] && (k = m[5].length < 13 ? 1e3 * m[5] : m[5]),
                i = !1)
            }
            i && e.indexOf("usc/") >= 0 && (f = e.indexOf("usc/") + 4,
            g = e.indexOf(";", f),
            f <= g && (c = lr.utm_source = e.substring(f, g))),
            i && e.indexOf("ucp/") >= 0 && (f = e.indexOf("ucp/") + 4,
            g = e.indexOf(";", f),
            f <= g && (lr.utm_campaign = e.substring(f, g))),
            i && e.indexOf("umd/") >= 0 && (f = e.indexOf("umd/") + 4,
            g = e.indexOf(";", f),
            f <= g && (lr.utm_medium = e.substring(f, g))),
            i && e.indexOf("utr/") >= 0 && (f = e.indexOf("utr/") + 4,
            g = e.indexOf(";", f),
            f <= g && (lr.utm_term = e.substring(f, g))),
            e.indexOf("adk/") >= 0 && (f = e.indexOf("adk/") + 4,
            g = e.indexOf(";", f),
            f <= g && (lr.adsCookieName = e.substring(f, g))),
            e.indexOf("ads/") >= 0 && (f = e.indexOf("ads/") + 4,
            g = e.indexOf(";", f),
            f <= g && (d = e.substring(f, g))),
            a && b ? (setCookie("pre_session", a, lr.ckDomain),
            setCookie("pre_seq", b, lr.ckDomain)) : (a = getCookie("pre_session") || "",
            b = getCookie("pre_seq") || ""),
            lr.preSession = a,
            lr.preSeqnum = b,
            c && setCookie(lr.ckJdv, [lr.hashDomain, lr.utm_source || "direct", lr.utm_campaign || "-", lr.utm_medium || "none", lr.utm_term || "-", k].join("|"), lr.ckDomain, lr.ckJdvEmbeddedExp),
            d && (lr.ads = d,
            setCookie(lr.adsCookieName, lr.ads, lr.ckDomain, lr.mtSubsiteExp))
        }
    }(),
    lr.clickCBF.push(function(a) {
        if (Click.attachedEvent) {
            for (var b, c = {}, d = a.target, e = document.querySelector("body"); d !== e; ) {
                var f = d.className || "";
                if (f && f.baseVal && (f = f.baseVal),
                f && f.indexOf(lr.cClass) > -1) {
                    b = d;
                    break
                }
                d = d.parentNode || e
            }
            if (b) {
                var g = b.getAttribute("href")
                  , h = b.getAttribute("report-eventid") || ""
                  , i = b.getAttribute("report-eventlevel") || ""
                  , j = b.getAttribute("report-pagename") || ""
                  , k = b.getAttribute("report-pageparam") || ""
                  , l = b.getAttribute("report-eventparam") || "";
                if (h) {
                    var m = getSeparatedUrl(document.location.href);
                    c.logType = lr.logType.cl,
                    c.clickType = lr.clickType.Jtag,
                    c.event_id = h,
                    c.event_level = i,
                    c.page_name = j || m[0] || "",
                    c.page_param = k || m[1] || "",
                    c.event_param = l,
                    c.tarUrl = g,
                    updateMFLSeries(c),
                    logCmd(c)
                }
                g && /^(http:\/\/|https:\/\/|\/\/).*/.exec(g) && "_blank" !== b.getAttribute("target") && (a.preventDefault ? a.preventDefault() : a.returnValue = !1,
                setTimeout(function() {
                    window.location.href = g
                }, 200))
            }
        }
    });
    var getAbsoluteXPath = function(a) {
        for (var b = ""; a && 1 == a.nodeType; a = a.parentNode) {
            for (var c = a.parentNode.childNodes, d = "", e = 0, f = 0, g = c.length; e < g; e++) {
                var h = c[e];
                a.tagName === h.tagName && f++,
                a == h && (d = f > 1 ? "[" + f + "]" : "")
            }
            b = "/" + a.tagName.toLowerCase() + d + b
        }
        return b
    }
      , getXPath = function(a) {
        for (var b = ""; a && 1 == a.nodeType; a = a.parentNode) {
            if ("" !== a.id) {
                b = '//*[@id="' + a.id + '"]' + b;
                break
            }
            for (var c = a.parentNode.childNodes, d = "", e = 0, f = 0, g = c.length; e < g; e++) {
                var h = c[e];
                a.tagName === h.tagName && f++,
                a == h && (d = f > 1 ? "[" + f + "]" : "")
            }
            b = "/" + a.tagName.toLowerCase() + d + b
        }
        return b
    }
      , isLeafElemt = function(a) {
        var b = !0
          , c = a.children;
        return c.length > 0 && (b = !1),
        b
    }
      , isReportElement = function(a) {
        var b = !1;
        if (a && a.tagName) {
            var c = a.tagName.toLowerCase();
            b = !("html" === c || "body" === c || a.id && "tol_selected_xelemts_area" === a.id || a.parentElement.id && "tol_selected_xelemts_area" === a.parentElement.id) && (!!haveTag(a) || ("a" === c || isLeafElemt(a)))
        }
        return b
    }
      , cltvalue = "";
    document.getElementsByClassName || (document.getElementsByClassName = function(a) {
        for (var b = document.getElementsByTagName("*"), c = [], d = 0; d < b.length; d++)
            for (var e = b[d], f = e.className.split(" "), g = 0; g < f.length; g++)
                if (f[g] == a) {
                    c.push(e);
                    break
                }
        return c
    }
    );
    var coordinateInfo = function(a) {
        var b = {};
        return b.scrollWidth = document.body.scrollWidth,
        b.scrollHeight = document.body.scrollHeight,
        b.offsetLeft = pageOffsetLeft(),
        b.x = parseInt(mouseX(a)),
        b.y = parseInt(mouseY(a)),
        b.offsetLeft > 0 && (b.x = parseInt(b.x - b.offsetLeft)),
        b
    }
      , xpathReport = function(a) {
        try {
            var b = a.target || a.srcElement;
            if (isReportElement(b)) {
                for (var c = coordinateInfo(a), d = b, e = b.tagName.toLowerCase(), f = getXPath(b) || "-", g = b.parentNode ? getXPath(b.parentNode) : "-", h = b.parentNode ? getAbsoluteXPath(b.parentNode) + "/" : "-", i = getAbsoluteXPath(b) || "-", j = i ? i.split("/").length : 1, k = document.body.clientWidth, l = k > 0 ? (c.x / k).toFixed(4) : 0, m = c.scrollHeight > 0 ? (c.y / c.scrollHeight).toFixed(4) : 0, n = d.tagName.toLowerCase(); "a" != n && (d = d.parentNode,
                d && "BODY" != d.nodeName); )
                    n = d.tagName.toLowerCase();
                var o = "-"
                  , p = "-";
                if (cltvalue)
                    var q = cltvalue.split("|")
                      , o = q[2]
                      , p = q[3];
                var r = d && d.href ? subUrl(d.href) : "-"
                  , s = b.innerText.substring(.2) || "-"
                  , t = b.src ? subUrl(b.src) : "-";
                "a" !== e || isLeafElemt(b) || (s = "-"),
                magictreelog("magictree", "Z", encodeURIComponent(f), encodeURIComponent(g), encodeURIComponent(h), j, c.x + "x" + c.y, c.scrollWidth + "x" + c.scrollHeight, c.offsetLeft, l, m, o, p, encodeURIComponent(r), encodeURIComponent(s), encodeURIComponent(t))
            }
        } catch (a) {
            magictreelog("ERROR", "AT_xpathReport")
        }
    }
      , loadJS = function(a) {
        var b = document.createElement("script");
        b.type = "application/javascript",
        b.src = a,
        b.charset = "UTF-8",
        document.body ? document.body.appendChild(b) : document.getElementsByTagName("head")[0].appendChild(b)
    }
      , loadCSS = function(a) {
        var b = document.createElement("link");
        b.type = "text/css",
        b.rel = "stylesheet",
        b.href = a,
        document.getElementsByTagName("head")[0].appendChild(b)
    }
      , typepar = getParameter("typepar");
    if (typepar && ("query" === typepar || "apply" === typepar))
        try {
            loadCSS("//magicforest.jd.com/x.css"),
            loadJS("//magicforest.jd.com/tol2.min.js")
        } catch (a) {
            magictreelog("ERROR", "AT_loadCSS_OR_loadJS")
        }
    window.initMagicModel = initMagicModel,
    document.addEventListener(lr.clickEvent, function(a) {
        var b, c = {}, d = a.srcElement || a.target, e = d, f = d.getAttribute("clstag"), g = a || event;
        if (g.clientX || g.clientY || g.pageX || g.pageY) {
            try {
                xpathReport(g)
            } catch (a) {
                log("ERROR", "AT_Document_Onclick")
            }
            for (; !f && "BODY" !== d.nodeName && "HTML" !== d.nodeName && (d = d.parentNode,
            d && ("BODY" !== d.nodeName || "HTML" === d.nodeName)); )
                f = d.getAttribute("clstag");
            var h;
            if (f) {
                var i = f.split("|")
                  , j = i[1]
                  , k = i[2]
                  , l = i[3];
                if ("keycount" === j) {
                    h = k + "|" + l;
                    var m = e.getAttribute("href");
                    c.logType = lr.logType.cl,
                    c.clickType = lr.clickType.Clstag,
                    c.cls = h,
                    c.tarUrl = m,
                    logCmd(c),
                    m && /^(http:\/\/|https:\/\/|\/\/).*/.exec(m) && "_blank" !== e.getAttribute("target") && !isMeta(a) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1,
                    setTimeout(function() {
                        window.location.href = m
                    }, 200))
                }
            }
            var n = window.location.hostname.toLowerCase();
            if (lr.heatmapEnable || /(sale|mall|jmall|pop|bdp).(jd|360buy).com/.test(n)) {
                var o = 0
                  , p = 0;
                a.pageX || a.pageY ? (o = a.pageX,
                p = a.pageY) : (o = a.clientX + document.body.scrollLeft - document.body.clientLeft,
                p = a.clientY + document.body.scrollTop - document.body.clientTop);
                var q = window.screen.width >= 1210 ? 1210 : 990
                  , r = document.body.clientWidth > q ? Math.round((document.body.clientWidth - q) / 2) : 0;
                c.logType = lr.logType.hm,
                c.cls = h || "-",
                c.x = o,
                c.y = p,
                c.offset_left = r,
                logCmd(c)
            }
            for (b = 0; b < lr.clickCBF.length; b++)
                lr.clickCBF[b](a)
        }
    }, !1),
    window.logClstag = logClstag,
    lr.MPEventsMap = {
        MTimeLimitDiscount_TopTab: 3,
        MTimeLimitDiscount_TopTabSlide: 4,
        MTimeLimitDiscount_TabExpand: 4,
        MTimeLimitDiscount_Activity: 4,
        MTimeLimitDiscount_JumpToNext: 4,
        MTimeLimitDiscount_ToTop: 4,
        MOneForAll_TopBanner: 3,
        MOneForAll_HotProduct: 3,
        MOneForAll_SoonFull: 3,
        MOneForAll_PopularOutbreak: 4,
        MOneForAll_Product: 4,
        MOneForAll_ADollarGrabTreasure: 4,
        MOneForAll_ParticipationRecord: 4,
        MOneForAll_ClassificationTab: 3,
        MOneForAll_ClassificationTabSlide: 4,
        MOneForAll_ClassificationProduct: 4,
        MOneForAll_GrabTreasure: 4,
        MOneForAll_PicSlide: 4,
        MOneForAll_Pic: 4,
        MOneForAll_Details: 4,
        MOneForAll_Past: 4,
        MOneForAll_FastSelect: 4,
        MOneForAll_Confirm: 4,
        MOneForAll_AllNum: 4,
        MOneForAll_Next: 4,
        MOneForAll_PastProduct: 4,
        MOneForAll_ScreenSlideUp: 4,
        MOneForAll_MoreLottery: 4,
        MOneForAll_Balance: 4,
        MOneForAll_JingBean: 4,
        MOneForAll_Coupon: 4,
        MOneForAll_Pay: 4,
        MOneForAll_Order: 4,
        MOneForAll_ContinueBuy: 4,
        MOneForAll_OrderTracking: 4,
        MOneForAll_LogisticsDetails: 4,
        MOneForAll_ReceivingInformation: 4,
        MOneForAll_AllRecords: 4,
        MOneForAll_ContinueToGrabTreasure: 4,
        MAuction_TopBanner: 4,
        MAuction_Classification: 4,
        MAuction_PopularCategory: 4,
        MAuction_BottomTab: 4,
        MAuction_TodaySpecial: 4,
        MAuction_FirstLevelNavigation: 4,
        MAuction_ClassificationJump: 4,
        MAuction_TwoCategory: 4,
        MAuction_MyAuction: 4,
        MAuction_MyProduct: 4,
        MAuction_MyBond: 4,
        MAuction_MyCommodity: 4,
        MAuction_Rule: 4,
        MAuction_TimeSelect: 4,
        MAuction_SecondCategory: 4,
        MAuction_Commodity: 4,
        MAuction_CommodityDescription: 4,
        MAuction_CustomerService: 4,
        MAuction_BidRecord: 4,
        MAuction_MarginRule: 4,
        MAuction_SellerCommitment: 4,
        MAuction_GoToMyAuction: 4,
        MGroupPurchase_BottomNavigation: 3,
        MProductdetail_Promotion: 5,
        MProductdetail_CommentBackToTop: 5,
        MProductdetail_ConsultationBackToTop: 5,
        MProductdetail_DetailViewGoods: 5,
        MProductdetail_ProductTab: 5,
        MProductdetail_DetailTab: 5,
        MProductdetail_CommentTab: 5,
        MProductdetail_ProductTabSlide: 5,
        MProductdetail_DetailTabSlide: 5,
        MProductdetail_CommentTabSlide: 5,
        MProductdetail_PriceNotice: 5,
        MProductdetail_SpecificationsPackUp: 5,
        MProductdetail_PicComment: 5,
        MProductdetail_OnlyComment: 5,
        MProductdetail_MobileAccessory: 5,
        MProductdetail_ContactJIMI: 5,
        MProductdetail_MoreYouLike: 5,
        MProductdetail_ArrivalNotice: 5,
        MProductdetail_Similar: 5,
        MProductdetail_DepreciatePriceInput: 5,
        MProductdetail_DepreciateNumInput: 5,
        MProductdetail_DepreciateCancel: 5,
        MProductdetail_DepreciateConfirm: 5,
        MProductdetail_DepreciateMask: 5,
        MProductdetail_ArrivalNumInput: 5,
        MProductdetail_ArrivalCancel: 5,
        MProductdetail_ArrivalConfirm: 5,
        MProductdetail_ArrivalMask: 5,
        MProductdetail_EnergySaving: 5,
        MJingDouHome_ShopActivity: 2,
        Mrecommendation_Product: 3,
        MHome_FocusPic: 1,
        Mhome_Classification: 1,
        Mhome_Cart: 1,
        MRecharge_Recharge: 1,
        MHome_Lottery: 1,
        MHome_MyJD: 1,
        MHome_HandSeckill: 1,
        MHome_ActivitiesInFloors: 1,
        MHome_ThemeHall: 1,
        MHome_Searchthi: 2,
        MHome_Search: 1,
        MHome_SearchDropDownAssociationalWords: 1,
        MHome_SearchDropDownHistoryWords: 1,
        MHome_AirTicket: 1,
        MHome_Icons: 1,
        MHomeGuessYouLike_Login: 1,
        MHomeGuessYouLike_Products: 1,
        MHomeGuessYouLike_Similarities: 1,
        MHomeSimilarities_Products: 1,
        MHome_FloatEntrance: 1,
        MHome_BacktoTop: 1,
        MVirtual_ProductDetail_Expose: 1,
        MProductList_Search: 2,
        MSearch_Search: 2,
        MSearch_SearchButton: 2,
        MSearch_Searchthi: 2,
        MSearch_SearchDropDownAssociationalWords: 2,
        MSearch_HistoryRecords: 2,
        MSearch_HotWords: 2,
        MSearch_Productid: 3,
        MCommonHead_NavigateButton: 1,
        MCommonHead_home: 1,
        MCommonHead_CategorySearch: 1,
        MCommonHead_Cart: 1,
        MCommonHead_MYJD: 1,
        MCommonHTail_Account: 1,
        MCommonHTail_ToTop: 1,
        MCommonHTail_ClientApp: 1,
        MDownLoadFloat_OpenNow: 1,
        MGroupBuy_ChannelIcons: 2,
        MJingDouHome_Activity: 2,
        MJingDouHome_JindouExCoupon: 2,
        MJingDouHome_JingdouBuyLottery: 2,
        MJingDouHome_Jump: 2,
        MJingDouHome_Cut: 2,
        MJingDouHome_ProductPic: 2,
        MJingDouShare_GetMyJingdou: 2,
        MJingDouJigsaw_Jigsaw_Expose: 2,
        MMyJDOrders_Categories: 2,
        MMyJDFollowed_Commodities: 2,
        MMyJDFollowed_Shops: 2,
        MMyJDFollowed_Commodity: 2,
        MMyJDFollowed_Shop: 2,
        MMyJDBrowsedHistory_Commodites: 2,
        MMyJDService_Categories: 2,
        MMyJDAccountManage_Categories: 2,
        MMyJD_Ordersnotpay: 2,
        MMyJD_Ordersnotreceiving: 2,
        MMyJD_MyMessages: 2,
        MMyJD_FuntionMenus: 2,
        MMyJD_GuessYouLike: 2,
        MHandSecKill_Commodity: 2,
        MHandSecKill_GotoAPPA: 2,
        Jshop_FocusPic: 4,
        Jshop_ProductID: 4,
        Jshop_CategoryTab: 4,
        Jshop_ProductID_Category: 4,
        Jshop_Navigation: 4,
        Jshop_CountDown: 4,
        Jshop_Lottery: 4,
        Jshop_GroupBuy: 4,
        Jshop_ShopRec: 4,
        Jshop_PromoRec: 4,
        Jshop_PromoTurns: 4,
        Jshop_PreSale: 4,
        Jshop_Html_Content: 4,
        Jshop_ImgWord: 4,
        Jshop_PullDown: 4,
        Jshop_PullDown_ProductID: 4,
        Jshop_AddtoCart: 4,
        MProductShow_ProductSku: 4,
        MMCDDownLoad_DownloadNow: 4,
        MobileWare_TreasureBoxEntrance: 4,
        MMobileWareLocate_Search: 4,
        MMobileWareLocate_Searchthi: 4,
        MMobileWareLocate_Locating: 4,
        MMobileWareLocate_HistoryAddr: 4,
        MMobileWareLocate_AssociateAddr: 4,
        MMobileWareCommonHead_GoToCart: 4,
        MMobileWareCommonHead_ChangeAddr: 4,
        MMobileWareProductList_BackToTop: 4,
        MMobileWareProductList_Product: 4,
        MMobileWareProductDetail_ProductMsg: 4,
        MMobileWareProductDetail_ProductIntroduction: 4,
        MMobileWareProductDetail_ProductSpecification: 4,
        MMobileWareProductDetail_ProductPackage: 4,
        MMobileWareProductDetail_AddToCart: 4,
        MMobileWareProductDetail_DeliveryAddr: 4,
        MMobileWareCart_DeleteProduct: 4,
        MMobileWareCart_NumIncrease: 4,
        MMobileWareCart_NumDecrease: 4,
        MMobileWareCart_SelectAll: 4,
        MMobileWareCart_CheckOut: 4,
        MMobileWareCheckout_ChangeAddr: 4,
        MMobileWareCheckout_MapCoordinate: 4,
        MMobileWareCheckout_OrderSubmit: 4,
        MMobileWareCheckout_PaperInvoice: 4,
        Shopcart_Productid: 5,
        Shopcart_Stroll: 5,
        Shopcart_Label: 5,
        Shopcart_Getresent: 5,
        Shopcart_Warranty: 5,
        Shopcart_Pay: 5,
        Shopcart_AddtoCart: 5,
        Shopcart_Present: 5,
        MProductdetail_Photo: 5,
        MProductdetail_Productinfo: 5,
        MProductdetail_Saleinfo: 5,
        MProductdetail_Shopid: 5,
        MProductdetail_GuessYouLike: 5,
        MProductdetail_Addtocart: 5,
        MProductdetail_Easybuy: 5,
        MProductdetail_GotoCart: 5,
        MProductdetail_AddtoFollowed: 5,
        MNeworder_Submit: 5,
        MNeworder_Function: 5,
        MNeworder_Address: 5,
        MNeworder_PayType: 5,
        MNeworder_ProdictList: 5,
        MHome_OrderSubmit: 5,
        MPayFinish_HomeMain: 5,
        MLOCOffLineProductDetail_BuyNow: 2,
        MLOCShopList_Call: 3,
        MLOCCheckOut_Submit: 4,
        LOCOffLineProductDetail_BuyNow: 2,
        LOCOnLineProductDetail_BuyNow: 2,
        MLOCOnLineProductDetail_BuyNow: 2,
        MLOCShopList_CallMap: 3,
        MFlashbuy_NewArrival: 2,
        MFlashbuy_LastSale: 2,
        MFlashbuy_ActivityForecast: 2,
        Mflashbuy_FocusPic: 2,
        MFlashbuy_NewArrivalFloor: 2,
        MFlashbuy_LastSaleFloor: 2,
        MFlashbuy_ActivityForecastFloor: 2,
        MFlashbuy_ProductPic: 3,
        MPresell_GetFreshFloor: 2,
        MTopic_FocusPic: 2,
        MTopic_SecKill: 2,
        MTopic_Floors: 2,
        MTopic_Products: 2,
        MTopic_Menus: 2,
        MTopic_Classify: 2,
        MTopic_recommend: 2,
        MTopic_brand: 2,
        Jshop_AD_button: 4,
        "Jshop_AD_TopCarousel ": 4,
        Jshop_AD_Tab: 4,
        Jshop_AD_Picture: 4,
        Jshop_AD_Rolled: 4,
        Jshop_AD_Close: 4,
        Jshop_Hot_Tab: 4,
        Jshop_Hot_ProductID: 4,
        "Jshop_Commended_ProductID ": 4,
        Jshop_Commended_GotoShop: 4,
        Jshop_Commended_Pic: 4,
        Jshop_Commended_Url: 4,
        MShopCheckIn_Pic: 2,
        MShopCheckIn_CheckInGetGift: 2,
        MShopCheckIn_RecommendShopid: 2,
        MShopCheckIn_MoreShops: 2,
        ShopHome_CheckInGetGift: 3,
        ShopCheckIn_Productid: 4,
        MJingDouHome_CouponCenter: 1,
        MWidget_Sign: 1,
        Widget_Operate: 1,
        Widget_Commodity: 1,
        Widget_More: 1,
        MJingDouHome_Checkin: 2,
        MSeckill_OrderSubmit: 5,
        MMyJD_MyPurse: 2,
        MMyJD_MyFollows: 2,
        MMyJD_BrowserHistory: 2,
        MMyJD_ServiceManager: 2,
        MMyJD_AccountManager: 2,
        MMyJD_MyAppointment: 2,
        MMyJD_ApplicationRecommend: 2,
        MMyJD_JCode: 2,
        MNeworder_Coupons: 5,
        MNeworder_Jdcard: 5,
        MNeworder_JdBean: 5,
        MNeworder_Invoice: 5,
        MNeworder_RestAccount: 5,
        MNeworder_GuessYouLike: 5,
        MNeworder_UnavaliableCoupons: 5,
        MMyJD_AllOrders: 2,
        MSaleBDCoupon_BannerPic: 3,
        MSaleBDCouponResult_BannerPic: 3,
        MShopcart_Productid: 4,
        MShopcart_EditAmount: 5,
        MShopcart_Amount: 5,
        MShopcart_Stroll: 4,
        MShopcart_CheckProd: 4,
        MShopcart_CheckAll: 4,
        MShopcart_Label: 4,
        MShopcart_Getresent: 5,
        MShopcart_Warranty: 5,
        MShopcart_Delete: 5,
        MShopcart_Pay: 5,
        MShopcart_Present: 5,
        MShopcartDeleteProduct_Sure: 5,
        MShopcartDeleteProduct_Cancel: 5,
        MShopcart_Login: 5,
        MShopcart_ShopEntrance: 5,
        MShopcart_GuessYouLikeFold: 5,
        MShopcart_GuessYouLike: 4,
        MShopcart_SimilaritiesEntrance: 5,
        MShopcart_SimilaritiesProductList: 4,
        MCategory_1st: 2,
        MCategory_3rd: 2,
        MCategory_Banner: 2,
        MCategory_Recommend: 2,
        MList_AdProducts: 3,
        MListFilter_Brand: 3,
        MListFilter_Back: 3,
        MListFilter_Address: 3,
        MShopLIst_JDShop: 3,
        MShopLIst_POPShop: 3,
        MShopcart_LoginEmptyCart: 5,
        MShopcart_LoginFullCart: 5,
        MJDMembersHome_SecKillProducts: 3,
        MJDMembersSecKill_Products: 4,
        MJDMembersHome_MemberProducts: 3,
        MJDMembersHome_MemberProductsToCart: 3,
        MJDMembersHome_AllMemberProducts: 3,
        MJDMembersSpecialSale_Categories: 4,
        MJDMembersSpecialSale_Products: 4,
        MJDMembers_FocusPic: 3,
        MJDMembers_Shopid: 3,
        MJDMembers_GetCoupon: 3,
        MVacationHonme_banner: 3,
        MVacationHonme_Destinations: 3,
        MVacationHonme_More: 3,
        MVacationHonme_HotDestinations: 3,
        MVacationHonme_SetOutCity: 3,
        MVacationHonme_SearchBox: 3,
        MVacationHonme_RecommendedProducts: 3,
        MVacationSearch_HotWord: 4,
        MVacationSearchResult_SearchBox: 4,
        MVacationSearchResult_Synthesize: 4,
        MVacationSearchResult_SalesVolume: 4,
        MVacationSearchResult_Price: 4,
        MVacationSearchResult_Fliter: 4,
        MVacationSearchResult_Lines: 4,
        MVacationProductDetail_Calendar: 5,
        MVacationProductDetail_ProductPoint: 5,
        MVacationProductDetail_Schedule: 5,
        MVacationProductDetail_Comment: 5,
        MVacationProductDetail_Costs: 5,
        MVacationProductDetail_ReserveNotice: 5,
        MVacationProductDetail_VisaInfo: 5,
        MVacationProductDetail_ContactService: 5,
        MVacationProductDetail_Call: 5,
        MVacationProductDetail_ReserveNow: 5,
        MJingDouHome_ShopCheckin: 2,
        MJingDouHome_GetJBean: 2,
        MJingDouHome_Topic: 2,
        MProductdetail_Specification: 5,
        MProductdetail_ProductdetailEntrance: 5,
        MProductdetail_Address: 5,
        MProductdetail_FirstAddress: 5,
        MProductdetail_SecondAddress: 5,
        MProductdetail_ThirdAddress: 5,
        MProductdetail_AskServiceEntrance: 5,
        MProductdetail_ProductCommentEntrance: 5,
        MProductdetail_ProductShowEntrance: 5,
        MProductdetail_ServiceInfo: 5,
        MProductdetail_Advert: 5,
        MProductdetail_ConsultEntrance: 5,
        MSearch_ClearHistory: 1,
        MProductdetail_Insurances: 5,
        MSearch_ChangeKeyWords: 1,
        MHome_SearchButton: 2,
        MProductdetail_SalesPromotion: 5,
        MProductdetail_Back: 5,
        MProductdetail_PreferentialPackage: 5,
        MProductdetail_PackageAddToCart: 5,
        MProductdetail_InsurancesSelect: 5,
        MProductdetail_FourthAddress: 5,
        MTicketsProductdetail_Tab: 5,
        MTicketsSearchResult_Fliter: 4,
        MTicketsProductdetail_TicketBomb: 5,
        MTicketsProductdetail_MoreTickets: 5,
        MTicketsSearchResult_SightSpot: 4,
        MTicketsHome_Theme: 3,
        MTicketsProductdetail_ReserveNow: 5,
        MTicketsSearchResult_SearchBox: 4,
        MTicketsHome_SightSpot: 3,
        MTicketsHome_Banner: 3,
        MTicketsHome_Location: 3,
        MTicketsThemes_Theme: 4,
        MTicketsSearch_Hotword: 4,
        MTicketsProductdetail_Map: 5,
        MTicketsHome_More: 3,
        MFlashbuy_CategoryBeautyFloor: 2,
        MTwelve_Play: 4,
        MProductdetail_ad: 3,
        MProductdetail_Comment: 5,
        MProductdetail_CommentPhoto: 5,
        MProductdetail_CouponSlide: 5,
        MProductdetail_Coupon: 5,
        MProductdetail_IdentifyingCodeInput: 5,
        MProductdetail_IdentifyingCodeImage: 5,
        MProductdetail_IdentifyingCodeCancel: 5,
        MProductdetail_IdentifyingCodeConfirm: 5,
        MProductdetail_IdentifyingCodeClose: 5,
        MProductdetail_ChooseSpecifications: 5,
        MProductdetail_ChooseInsurance: 5,
        MProductdetail_EnterShop: 5,
        MProductdetail_BackToTop: 5,
        MProductdetail_SubscribeImmediately: 5,
        MProductdetail_PurchaseImmediately: 5,
        MProductdetail_OrderImmediately: 5,
        MProductdetail_ShoppingCodeBuy: 5,
        MProductdetail_DetailProductIntroduction: 5,
        MProductdetail_DetailParameter: 5,
        MProductdetail_DetailCustomerService: 5,
        MProductdetail_DetailBackToTop: 5,
        MProductdetail_CommentAllTab: 5,
        MProductdetail_CommentFavorableTab: 5,
        MProductdetail_CommentMediumTab: 5,
        MProductdetail_CommentPoorTab: 5,
        MProductdetail_CommentPictureTab: 5,
        MProductdetail_CommentLikebutton: 5,
        MProductdetail_CommentReply: 5,
        MProductdetail_CommentAll: 5,
        MProductdetail_ReplyCommentInput: 5,
        MProductdetail_ReplyCommentSend: 5,
        MProductdetail_ReplyCommentReply: 5,
        MBMobileWareProductDetail_ProductMsg: 4,
        MBMobileWareProductDetail_ProductIntroduction: 4,
        MBMobileWareProductDetail_ProductSpecification: 4,
        MBMobileWareProductDetail_ProductPackage: 4,
        MBMobileWareProductDetail_AddToCart: 4,
        MBMobileWareProductDetail_DeliveryAddr: 4,
        MBProductdetail_Photo: 5,
        MBProductdetail_Productinfo: 5,
        MBProductdetail_Saleinfo: 5,
        MBProductdetail_Shopid: 5,
        MBProductdetail_GuessYouLike: 5,
        MBProductdetail_Addtocart: 5,
        MBProductdetail_Easybuy: 5,
        MBProductdetail_GotoCart: 5,
        MBProductdetail_AddtoFollowed: 5,
        MBProductdetail_Advert: 5,
        MBProductdetail_SalesPromotion: 5,
        MBProductdetail_PreferentialPackage: 5,
        MBProductdetail_Specification: 5,
        MBProductdetail_Address: 5,
        MBProductdetail_ServiceInfo: 5,
        MBProductdetail_Insurances: 5,
        MBProductdetail_InsurancesSelect: 5,
        MBProductdetail_ProductdetailEntrance: 5,
        MBProductdetail_ProductCommentEntrance: 5,
        MBProductdetail_ProductShowEntrance: 5,
        MBProductdetail_ConsultEntrance: 5,
        MBProductdetail_AskServiceEntrance: 5,
        MRecharge_PhoneBillTab: 4,
        MRecharge_PhoneTrafficTab: 4,
        MRecharge_Product: 4,
        MRecharge_ViewRechargeRecords: 4,
        MRecharge_ImmediateRecharge: 4,
        MRecharge_Coupons: 4,
        MRecharge_JDBeans: 4,
        MRecharge_ConfirmThePayment: 4,
        MRecharge_TrafficOrder: 4,
        MRecharge_TelephoneBill: 4,
        MRecharge_OrderBuyAgain: 4,
        MRecharge_OrderGoToPay: 4,
        MRecharge_Order: 4,
        MRecharge_OrderDetailBuyAgain: 4,
        MRecharge_OrderDetailGoToPay: 4,
        MGroupPurchase_TopClassification: 4,
        MGroupPurchase_Search: 4,
        MGroupPurchase_FocusPic: 4,
        MGroupPurchase_TimeSlotProduct: 4,
        MGroupPurchase_TimeSlot: 4,
        MGroupPurchase_1Plus2AdPosition: 4,
        MGroupPurchase_TodayProduct: 4,
        MGroupPurchase_BrandProduct: 4,
        MGroupPurchase_BrandSearch: 4,
        MGroupPurchase_LifeLocation: 4,
        MGroupPurchase_LifeSearch: 4,
        MGroupPurchase_LifeFocusPic: 4,
        MGroupPurchase_LifeClassificationIcon: 4,
        MGroupPurchase_Life1Plus2AdPosition: 4,
        MGroupPurchase_LifeYouLikeProduct: 4,
        MProductCoupon_GetSpecialcoupon: 2,
        MProductCoupon_Get: 2,
        MList_Comprehensive: 1,
        MSearch_Banner: 3,
        MExplosionPurchase_Qualification: 4,
        MExplosionPurchase_Purchase: 4,
        MDoubleElevenStrategy_RemindMe: 4,
        MShake_GoToProductDetail: 4,
        MJingDouHome_Exclusive: 2,
        MJingDouHome_Rank: 2,
        MTopic_Search: 2,
        MTopic_TopFocusPic: 2,
        MTopic_AdvancedFocusPic: 2,
        MTopic_Words: 2,
        MTopic_SecKillProduct: 2,
        MTopic_HighFocusPic: 2,
        MTopic_SingleRecommendProduct: 2,
        MTopic_DoubleRecommendProduct: 2,
        MTopic_LongPicProduct: 2,
        MTopic_SecondMenus: 2,
        MShopcartShare_AddtoMyShopcart: 2,
        MHandSecKill_Morespecialslae: 2,
        MHandSecKill_Preferential: 2,
        MHandSecKill_Banner: 2,
        MAuction_PreProduct: 4,
        MJingDouHome_Ad: 2,
        MJingDouHome_TopicProduct: 4,
        MProductdetail_ImmediatelyBuy: 5,
        MCashierPay_RecommendProduct: 3,
        MMyJD_MyCommodityCard: 4,
        MMarket_Eight: 4,
        MMarket_Twelve: 4,
        MMarket_Twenty: 4,
        MMarket_BuyNow: 4,
        MMarket_Product: 4,
        MMarket_ShopCart: 4,
        MCarSteward_TireShop: 4,
        MCarSteward_TireChange: 4,
        MCarSteward_TireAddress: 4,
        MCarSteward_TireConfirmUnlogin: 4,
        MCarSteward_TireTelNum: 4,
        MCarSteward_TireConfirmLogin: 4,
        MSpringPurchase_Strategy: 4,
        MSpringPurchase_RedBag: 4,
        MSpringPurchase_SecKillTime: 3,
        MSpringPurchase_SecKillProduct: 4,
        MSpringPurchase_SellingTabProduct: 3,
        MSpringPurchase_MainSubField: 3,
        MSpringPurchase_SubField: 3,
        MSpringPurchase_FieldProduct: 4,
        MSpringPurchase_SellingTab: 3,
        MSpringPurchase_SellingTabProduct: 4,
        MSpringPurchaseNavigation_AllTheMeeting: 3,
        MSpringPurchaseNavigation_FirstClassDirectory: 3,
        MSpringPurchaseNavigation_SecondClassDirectory: 3,
        MSpringPurchaseNavigation_FieldProduct: 4,
        MSpringPurchaseNavigation_NavigationBottomTab: 3,
        MSpringPurchase_MemberActivity: 3,
        MSpringPurchase_BIField: 3,
        MCarSteward_Accessory: 4,
        MCarSteward_Maintenance: 4,
        MCarSteward_Models: 4,
        MCarStewardModels_BrandLetter: 4,
        MCarStewardModels_Models: 4,
        MCarSteward_AccessoryType: 4,
        MCarSteward_QueryAccessory: 4,
        MCarSteward_QueryMaintenance: 4,
        MCarSteward_Product: 4,
        MCarSteward_Check: 4,
        MCarSteward_Change: 4,
        MCarStewardChange_SalesVolume: 4,
        MCarStewardChange_Price: 4,
        MCarStewardChange_Popularity: 4,
        MCarStewardChange_Product: 4,
        MCarStewardChange_Selection: 4,
        MCarSteward_ShoppingCart: 4,
        MDonotClose_Banner: 3,
        MDonotClose_SubField: 3,
        MDonotClose_WBanner: 3,
        MDonotClose_WSubField: 3,
        Babel_HtmlContent: 4,
        Babel_CodeContent: 4,
        MFlashbuy_TopTab: 3,
        MFlashbuy_FocusPic: 3,
        MFlashbuy_RecommendLeft: 3,
        MFlashbuy_RecommendRightUp: 3,
        MFlashbuy_RecommendRightDownLeft: 3,
        MFlashbuy_RecommendRightDownRight: 3,
        MFlashbuy_ValueRush: 4,
        MFlashbuy_Brand: 3,
        MFlashbuy_BrandProduct: 4,
        MList_BSelfProduct: 4,
        MList_BPopProduct: 4,
        MList_Product: 4,
        Morder_Allorders_Cancel: 4,
        Morder_Cancelorder_Buy: 5,
        Morder_Orderdetailed_Buy: 5,
        Morder_Allorders_Buy: 5,
        MLifeTravel_Banner: 3,
        MLifeTravel_PlaneTicket: 3,
        MLifeTravel_Hotel: 3,
        MLifeTravel_Vacation: 3,
        MLifeTravel_AdmissionTicket: 3,
        MLifeTravel_Popular: 4,
        MLifeTravel_SecKill: 4,
        MLifeTravel_CharacteristicUL: 3,
        MLifeTravel_CharacteristicUR: 3,
        MLifeTravel_CharacteristicDL: 3,
        MLifeTravel_CharacteristicDM: 3,
        MLifeTravel_CharacteristicDR: 3,
        MLifeTravel_Travel: 3,
        MLifeTravel_Selected: 4,
        MSeaStore_Banner: 3,
        MSeaStore_SubField: 3,
        MSeaStore_WBanner: 3,
        MSeaStore_WSubField: 3,
        MHotel_Banner: 3,
        MHotel_HotelNear: 3,
        MHotel_Search: 3,
        MHotel_ListHotel: 4,
        MHotel_DetailOrder: 5,
        MHotel_OrderOrderAgain: 5,
        MHotel_OrderDetailOrderAgain: 5,
        MShopcartShare_Product: 2,
        MHome_Floor: 1,
        MBuyer_Banner: 3,
        MBuyer_InfoSpecial: 3,
        MBuyer_DetailPic: 4,
        MBuyer_CoDetailProduct: 4,
        MSeaGroup_Product: 4,
        MSeaGroup_MyGroupProduct: 4,
        MSeaGroup_GroupPurchase: 4,
        MSeaGroup_Friend: 4,
        MSeaGroup_Purchase: 4,
        MSeaGroup_LaunchPurchase: 4,
        MSeaGroup_WMyGroupProduct: 4,
        MSeaGroup_WProduct: 4,
        MSeaGroup_WGroupPurchase: 4,
        MSeaGroup_WParticipate: 4,
        MSeaGroup_WLaunchPurchase: 4,
        MSpringThunder_SecTabProduct: 4,
        MSpringThunder_SubField: 3,
        MSpringThunder_ClassificationTab: 3,
        MSpringThunder_ClassificationTabProduct: 4,
        MSpringThunder_AllFieldTab: 3,
        MSpringThunder_ClassificationOne: 3,
        MSpringThunder_ClassificationTwo: 3,
        MSpringThunder_MoreProduct: 3,
        MShopcartsale_JoinProduct: 4,
        MShopcartsale_AllClassification: 4,
        MShopcartsale_SecondClassification: 4,
        MShopcartsale_HotSale: 4,
        MShopcartsale_SecKill: 4,
        MShopcart_BProductid: 4,
        MShopcart_BStroll: 4,
        MShopcart_BCheckProd: 4,
        MShopcart_BCheckAll: 4,
        MShopcart_BLabel: 4,
        MShopcart_BPay: 5,
        MShopcart_BGuessYouLike: 4,
        MShopcart_BSimilaritiesEntrance: 5,
        MShopcart_BSimilaritiesProductList: 4,
        MShopcart_BCoupon: 4,
        MShopcart_BFreightnote: 4,
        MShopcart_BShopEntrance: 5,
        MSeaGroup_WFriend: 4,
        MSeaGroup_WPurchase: 4,
        MKProductDetail_AddtoShoppingCart: 2,
        MKProductDetail_BuyNow: 2,
        MKShoppingCart_RecommendSku: 1,
        MKShoppingCart_GotoBuy: 3,
        MKCheckOut_GotoBuy: 4,
        MMobileVip_Banner: 3,
        MMobileVip_SecKill: 4,
        MMobileVip_Tab: 3,
        MMobileVip_Product: 4,
        MGlobalPurchase_Zero: 3,
        MGlobalPurchase_Sixteen: 3,
        MGlobalPurchase_BuyNow: 4,
        MGlobalPurchase_Product: 4,
        MGlobalPurchase_ShopCart: 5,
        MNewPeople_RecProduct: 4,
        MNewPeople_Tab: 3,
        MNewPeople_Product: 4,
        MShop_AllProduct: 4,
        MShop_Update: 4,
        MShop_Promotion: 4,
        MShop_Coupon: 4,
        MShop_Banner: 4,
        MShop_Activity: 4,
        MShop_Product: 4,
        MShop_AllProduct: 4,
        MProductSale_Product: 4,
        MProductSale_LookMore: 4,
        MSameShopSale_Product: 5,
        ShopBrandCelebration_HeadLine: 2,
        ShopBrandCelebration_Shop: 2,
        ShopBrandCelebration_BottomButton: 2,
        ShopBrandCelebration_ShopStreet: 2,
        MNewFunctionNavigation_QuickEntrance: 1,
        MStarDesign_Article: 3,
        MProductdetail_WindowMask: 4,
        MProductdetail_WindowClose: 4,
        MProductdetail_WindowProduct: 4,
        MProductdetail_WindowStroll: 4,
        MProductdetail_WindowShopCart: 5,
        MProductdetail_MoreYouLike: 3,
        MStarDesign_DetailPic: 4,
        MStarDesign_CoDetailProduct: 4,
        MStarDesign_Banner: 3,
        MStarDesign_SpecialLT: 3,
        MStarDesign_SpecialLB: 3,
        MStarDesign_SpecialRT: 3,
        MStarDesign_SpecialRB: 3,
        MJingDouBuy_Product: 4,
        MJingDouBuy_AddToCart: 5,
        MFlashbuy_KillProduct: 4,
        MKCheckOut_Confirm: 4,
        MNewPeople_BottomBanner: 3,
        MTopic_TimeLimitSeckillMore: 2,
        MTopic_TimeLimitSeckillTab: 2,
        MTopic_TimeLimitSeckillProduct: 2,
        MTopic_TimeLimitSeckillBuy: 2,
        MTopic_TryTab: 2,
        MTopic_TryProduct: 2,
        MTopic_TryPayPostageApply: 2,
        MTopic_TryCouponApply: 2,
        MTopic_IntelligentSale: 2,
        MTopic_ForumMessagesFstTab: 2,
        MTopic_ForumMessagesScdTab: 2,
        MTopic_ForumMessagesProduct: 2,
        MTopic_ForumMessagesBuyNow: 2,
        MTopic_ForumMessagesArticle: 2,
        MTopic_BuyPerDayPic: 2,
        MHandSecKill_Brand: 2,
        MHandSecKill_BrandProduct: 4,
        MHandSecKill_BrandDetailProduct: 4
    },
    function() {
        function a(a) {
            return c(b(d(a)))
        }
        function b(a) {
            return f(g(e(a), 8 * a.length))
        }
        function c(a) {
            try {} catch (a) {
                o = 0
            }
            for (var b, c = o ? "0123456789ABCDEF" : "0123456789abcdef", d = "", e = 0; e < a.length; e++)
                b = a.charCodeAt(e),
                d += c.charAt(b >>> 4 & 15) + c.charAt(15 & b);
            return d
        }
        function d(a) {
            for (var b, c, d = "", e = -1; ++e < a.length; )
                b = a.charCodeAt(e),
                c = e + 1 < a.length ? a.charCodeAt(e + 1) : 0,
                55296 <= b && b <= 56319 && 56320 <= c && c <= 57343 && (b = 65536 + ((1023 & b) << 10) + (1023 & c),
                e++),
                b <= 127 ? d += String.fromCharCode(b) : b <= 2047 ? d += String.fromCharCode(192 | b >>> 6 & 31, 128 | 63 & b) : b <= 65535 ? d += String.fromCharCode(224 | b >>> 12 & 15, 128 | b >>> 6 & 63, 128 | 63 & b) : b <= 2097151 && (d += String.fromCharCode(240 | b >>> 18 & 7, 128 | b >>> 12 & 63, 128 | b >>> 6 & 63, 128 | 63 & b));
            return d
        }
        function e(a) {
            var b, c = Array(a.length >> 2);
            for (b = 0; b < c.length; b++)
                c[b] = 0;
            for (b = 0; b < 8 * a.length; b += 8)
                c[b >> 5] |= (255 & a.charCodeAt(b / 8)) << b % 32;
            return c
        }
        function f(a) {
            for (var b = "", c = 0; c < 32 * a.length; c += 8)
                b += String.fromCharCode(a[c >> 5] >>> c % 32 & 255);
            return b
        }
        function g(a, b) {
            a[b >> 5] |= 128 << b % 32,
            a[(b + 64 >>> 9 << 4) + 14] = b;
            for (var c = 1732584193, d = -271733879, e = -1732584194, f = 271733878, g = 0; g < a.length; g += 16) {
                var h = c
                  , n = d
                  , o = e
                  , p = f;
                c = i(c, d, e, f, a[g + 0], 7, -680876936),
                f = i(f, c, d, e, a[g + 1], 12, -389564586),
                e = i(e, f, c, d, a[g + 2], 17, 606105819),
                d = i(d, e, f, c, a[g + 3], 22, -1044525330),
                c = i(c, d, e, f, a[g + 4], 7, -176418897),
                f = i(f, c, d, e, a[g + 5], 12, 1200080426),
                e = i(e, f, c, d, a[g + 6], 17, -1473231341),
                d = i(d, e, f, c, a[g + 7], 22, -45705983),
                c = i(c, d, e, f, a[g + 8], 7, 1770035416),
                f = i(f, c, d, e, a[g + 9], 12, -1958414417),
                e = i(e, f, c, d, a[g + 10], 17, -42063),
                d = i(d, e, f, c, a[g + 11], 22, -1990404162),
                c = i(c, d, e, f, a[g + 12], 7, 1804603682),
                f = i(f, c, d, e, a[g + 13], 12, -40341101),
                e = i(e, f, c, d, a[g + 14], 17, -1502002290),
                d = i(d, e, f, c, a[g + 15], 22, 1236535329),
                c = j(c, d, e, f, a[g + 1], 5, -165796510),
                f = j(f, c, d, e, a[g + 6], 9, -1069501632),
                e = j(e, f, c, d, a[g + 11], 14, 643717713),
                d = j(d, e, f, c, a[g + 0], 20, -373897302),
                c = j(c, d, e, f, a[g + 5], 5, -701558691),
                f = j(f, c, d, e, a[g + 10], 9, 38016083),
                e = j(e, f, c, d, a[g + 15], 14, -660478335),
                d = j(d, e, f, c, a[g + 4], 20, -405537848),
                c = j(c, d, e, f, a[g + 9], 5, 568446438),
                f = j(f, c, d, e, a[g + 14], 9, -1019803690),
                e = j(e, f, c, d, a[g + 3], 14, -187363961),
                d = j(d, e, f, c, a[g + 8], 20, 1163531501),
                c = j(c, d, e, f, a[g + 13], 5, -1444681467),
                f = j(f, c, d, e, a[g + 2], 9, -51403784),
                e = j(e, f, c, d, a[g + 7], 14, 1735328473),
                d = j(d, e, f, c, a[g + 12], 20, -1926607734),
                c = k(c, d, e, f, a[g + 5], 4, -378558),
                f = k(f, c, d, e, a[g + 8], 11, -2022574463),
                e = k(e, f, c, d, a[g + 11], 16, 1839030562),
                d = k(d, e, f, c, a[g + 14], 23, -35309556),
                c = k(c, d, e, f, a[g + 1], 4, -1530992060),
                f = k(f, c, d, e, a[g + 4], 11, 1272893353),
                e = k(e, f, c, d, a[g + 7], 16, -155497632),
                d = k(d, e, f, c, a[g + 10], 23, -1094730640),
                c = k(c, d, e, f, a[g + 13], 4, 681279174),
                f = k(f, c, d, e, a[g + 0], 11, -358537222),
                e = k(e, f, c, d, a[g + 3], 16, -722521979),
                d = k(d, e, f, c, a[g + 6], 23, 76029189),
                c = k(c, d, e, f, a[g + 9], 4, -640364487),
                f = k(f, c, d, e, a[g + 12], 11, -421815835),
                e = k(e, f, c, d, a[g + 15], 16, 530742520),
                d = k(d, e, f, c, a[g + 2], 23, -995338651),
                c = l(c, d, e, f, a[g + 0], 6, -198630844),
                f = l(f, c, d, e, a[g + 7], 10, 1126891415),
                e = l(e, f, c, d, a[g + 14], 15, -1416354905),
                d = l(d, e, f, c, a[g + 5], 21, -57434055),
                c = l(c, d, e, f, a[g + 12], 6, 1700485571),
                f = l(f, c, d, e, a[g + 3], 10, -1894986606),
                e = l(e, f, c, d, a[g + 10], 15, -1051523),
                d = l(d, e, f, c, a[g + 1], 21, -2054922799),
                c = l(c, d, e, f, a[g + 8], 6, 1873313359),
                f = l(f, c, d, e, a[g + 15], 10, -30611744),
                e = l(e, f, c, d, a[g + 6], 15, -1560198380),
                d = l(d, e, f, c, a[g + 13], 21, 1309151649),
                c = l(c, d, e, f, a[g + 4], 6, -145523070),
                f = l(f, c, d, e, a[g + 11], 10, -1120210379),
                e = l(e, f, c, d, a[g + 2], 15, 718787259),
                d = l(d, e, f, c, a[g + 9], 21, -343485551),
                c = m(c, h),
                d = m(d, n),
                e = m(e, o),
                f = m(f, p)
            }
            return Array(c, d, e, f)
        }
        function h(a, b, c, d, e, f) {
            return m(n(m(m(b, a), m(d, f)), e), c)
        }
        function i(a, b, c, d, e, f, g) {
            return h(b & c | ~b & d, a, b, e, f, g)
        }
        function j(a, b, c, d, e, f, g) {
            return h(b & d | c & ~d, a, b, e, f, g)
        }
        function k(a, b, c, d, e, f, g) {
            return h(b ^ c ^ d, a, b, e, f, g)
        }
        function l(a, b, c, d, e, f, g) {
            return h(c ^ (b | ~d), a, b, e, f, g)
        }
        function m(a, b) {
            var c = (65535 & a) + (65535 & b)
              , d = (a >> 16) + (b >> 16) + (c >> 16);
            return d << 16 | 65535 & c
        }
        function n(a, b) {
            return a << b | a >>> 32 - b
        }
        var o = 0;
        lr.hex_md5 = a
    }(),
    function() {
        var a = lr.provinceId || lr.provinceid || ""
          , b = lr.cityId || lr.cityid || ""
          , c = lr.countryId || lr.countryid || ""
          , d = lr.townId || lr.townid || ""
          , e = lr.skuId || lr.skuid || ""
          , f = lr.skuPrice || lr.skuprice || ""
          , g = lr.stockState || lr.stockstate || ""
          , h = {}
          , i = {};
        if (a && b && c && e && f && g) {
            var j, k, l = -1, m = -1, n = -1, o = {};
            o.pdsvj = {},
            "有货" === g ? (l = 1,
            m = 5,
            n = 33) : 0 === g.indexOf("有货") ? (l = 2,
            m = 5,
            n = 39) : g.indexOf("预定") > -1 ? (l = 3,
            m = 5,
            n = 36) : "无货" === g ? (l = 4,
            m = 5,
            n = 34) : g.indexOf("现货") > -1 ? (l = 7,
            m = 5,
            n = 33) : g.indexOf("暂不支持配送") > -1 && (l = 8,
            m = 6,
            n = 40),
            isNaN(f) && (f = -1),
            j = a + "_" + b + "_" + c + "_" + d,
            k = [e, f, l, m, n],
            h.area = j,
            h.sku = [k],
            i.t1 = "pv_stock",
            i.t2 = "sku",
            i.p0 = h,
            o.logType = lr.logType.pd,
            o.pdsvj = i,
            o.isByJson = !0,
            o.toWarriors = !0,
            logCmd(o)
        }
    }(),
    window.getUnionSeries = getUnionSeries,
    window.getAndroidUnionSeries = getAndroidUnionSeries,
    window.getUnionSeriesJsonObj = getUnionSeriesJsonObj,
    ("undefined" == typeof lr.autoLogPv || lr.autoLogPv) && (logPv(),
    lr.anchorpvflag && (window.history ? (!function(a) {
        var b = a.pushState;
        a.pushState = function(c) {
            return "function" == typeof a.onpushstate && a.onpushstate({
                state: c
            }),
            b.apply(a, arguments)
        }
    }(window.history),
    lr.account = "undefined" != typeof lr.account ? lr.account : getCookie("pin"),
    window.onpopstate = history.onpushstate = function(a) {
        setTimeout(function() {
            lr.refUrl = lr.curUrl,
            lr.curUrl = document.location.href,
            logPv()
        }, 0)
    }
    ) : window.addEventListener("hashchange", function() {
        lr.refUrl = lr.curUrl,
        lr.curUrl = document.location.href,
        lr.account = "undefined" != typeof lr.account ? lr.account : getCookie("pin"),
        logPv()
    }))),
    JA.util = {
        join: function(a) {
            return joinArrayBySeparator(a)
        },
        getParameter: function(a, b) {
            return getParameter(b, a)
        },
        Wv: function(a, b, c, d) {
            setCookie(a, b, c, d)
        },
        Vv: function(a) {
            return getCookie(a)
        }
    },
    JA.tracker = {
        sendNew: function(a, b) {},
        ngloader: function(a, b) {},
        ngaloader: function(a, b, c) {},
        ngloaderJSON: function(a, b) {},
        bloading: function(a, b, c) {},
        sendOld: function() {},
        loading: function() {},
        aloading: function() {},
        aloadingJSON: function() {}
    },
    window.log = log,
    window.logJSON = logJSON,
    window.nlog = nlog,
    window.expLogJSON = expLogJSON
}();
