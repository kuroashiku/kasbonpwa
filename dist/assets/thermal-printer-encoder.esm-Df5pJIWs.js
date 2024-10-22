function e(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
var t = { exports: {} }, i = { html: { skipScheme: "html", lineBreakScheme: "html", whitespace: "collapse" } }, s = /<\s*br(?:[\s/]*|\s[^>]*)>/gi, n = { unix: [/\n/g, "\n"], dos: [/\r\n/g, "\r\n"], mac: [/\r/g, "\r"], html: [s, "<br>"], xhtml: [s, "<br/>"] }, r = { "ansi-color": /\x1B\[[^m]*m/g, html: /<[^>]*>/g, bbcode: /\[[^]]*\]/g }, a = { soft: 1, hard: 1 }, o = { collapse: 1, default: 1, line: 1, all: 1 }, h = { all: 1, multi: 1, none: 1 }, l = /([sm])(\d+)/, d = /[-/\\^$*+?.()|[\]{}]/g;
function c(e2) {
  return e2.replace(d, "\\$&");
}
var p = t.exports = function(e2, t2, s2) {
  "object" == typeof e2 && (e2 = (s2 = e2).start, t2 = s2.stop), "object" == typeof t2 && (s2 = t2, e2 = e2 || s2.start, t2 = void 0), t2 || (t2 = e2, e2 = 0), s2 || (s2 = {});
  var d2, p2, u2, g2, f2, w2, _2, b2, m2, y2, v2, k2, q2, E2, L, A, x, j, I = "soft", M = "default", R = 4, B = "all", S = "", C = "";
  if (d2 = s2.preset)
    for (d2 instanceof Array || (d2 = [d2]), j = 0; j < d2.length; j++) {
      if (!(A = i[d2[j]]))
        throw new TypeError('preset must be one of "' + Object.keys(i).join('", "') + '"');
      A.mode && (I = A.mode), A.whitespace && (M = A.whitespace), void 0 !== A.tabWidth && (R = A.tabWidth), A.skip && (p2 = A.skip), A.skipScheme && (u2 = A.skipScheme), A.lineBreak && (g2 = A.lineBreak), A.lineBreakScheme && (f2 = A.lineBreakScheme), A.respectLineBreaks && (B = A.respectLineBreaks), void 0 !== A.preservedLineIndent && (_2 = A.preservedLineIndent), void 0 !== A.wrapLineIndent && (b2 = A.wrapLineIndent), A.wrapLineIndentBase && (m2 = A.wrapLineIndentBase);
    }
  if (s2.mode) {
    if (!a[s2.mode])
      throw new TypeError('mode must be one of "' + Object.keys(a).join('", "') + '"');
    I = s2.mode;
  }
  if (s2.whitespace) {
    if (!o[s2.whitespace])
      throw new TypeError('whitespace must be one of "' + Object.keys(o).join('", "') + '"');
    M = s2.whitespace;
  }
  if (void 0 !== s2.tabWidth) {
    if (!(parseInt(s2.tabWidth, 10) >= 0))
      throw new TypeError("tabWidth must be a non-negative integer");
    R = parseInt(s2.tabWidth, 10);
  }
  if (L = new Array(R + 1).join(" "), s2.respectLineBreaks) {
    if (!h[s2.respectLineBreaks] && !l.test(s2.respectLineBreaks))
      throw new TypeError('respectLineBreaks must be one of "' + Object.keys(h).join('", "') + '", "m<num>", "s<num>"');
    B = s2.respectLineBreaks;
  }
  if ("multi" === B)
    B = "m", w2 = 2;
  else if (!h[B]) {
    var O = l.exec(B);
    B = O[1], w2 = parseInt(O[2], 10);
  }
  if (void 0 !== s2.preservedLineIndent) {
    if (!(parseInt(s2.preservedLineIndent, 10) >= 0))
      throw new TypeError("preservedLineIndent must be a non-negative integer");
    _2 = parseInt(s2.preservedLineIndent, 10);
  }
  if (_2 > 0 && (S = new Array(_2 + 1).join(" ")), void 0 !== s2.wrapLineIndent) {
    if (isNaN(parseInt(s2.wrapLineIndent, 10)))
      throw new TypeError("wrapLineIndent must be an integer");
    b2 = parseInt(s2.wrapLineIndent, 10);
  }
  if (s2.wrapLineIndentBase && (m2 = s2.wrapLineIndentBase), m2) {
    if (void 0 === b2)
      throw new TypeError("wrapLineIndent must be specified when wrapLineIndentBase is specified");
    if (m2 instanceof RegExp)
      E2 = m2;
    else {
      if ("string" != typeof m2)
        throw new TypeError("wrapLineIndentBase must be either a RegExp object or a string");
      E2 = new RegExp(c(m2));
    }
  } else if (b2 > 0)
    C = new Array(b2 + 1).join(" ");
  else if (b2 < 0)
    throw new TypeError("wrapLineIndent must be non-negative when a base is not specified");
  if (s2.skipScheme) {
    if (!r[s2.skipScheme])
      throw new TypeError('skipScheme must be one of "' + Object.keys(r).join('", "') + '"');
    u2 = s2.skipScheme;
  }
  if (s2.skip && (p2 = s2.skip), p2)
    if (p2 instanceof RegExp)
      (y2 = p2).global || (x = "g", y2.ignoreCase && (x += "i"), y2.multiline && (x += "m"), y2 = new RegExp(y2.source, x));
    else {
      if ("string" != typeof p2)
        throw new TypeError("skip must be either a RegExp object or a string");
      y2 = new RegExp(c(p2), "g");
    }
  if (!y2 && u2 && (y2 = r[u2]), s2.lineBreakScheme) {
    if (!n[s2.lineBreakScheme])
      throw new TypeError('lineBreakScheme must be one of "' + Object.keys(n).join('", "') + '"');
    f2 = s2.lineBreakScheme;
  }
  if (s2.lineBreak && (g2 = s2.lineBreak), f2 && (A = n[f2]) && (v2 = A[0], k2 = A[1]), g2) {
    if (g2 instanceof Array && (1 === g2.length ? g2 = g2[0] : g2.length >= 2 && (g2[0] instanceof RegExp ? (v2 = g2[0], "string" == typeof g2[1] && (k2 = g2[1])) : g2[1] instanceof RegExp ? (v2 = g2[1], "string" == typeof g2[0] && (k2 = g2[0])) : "string" == typeof g2[0] && "string" == typeof g2[1] ? (v2 = new RegExp(c(g2[0]), "g"), k2 = g2[1]) : g2 = g2[0])), "string" == typeof g2)
      k2 = g2, v2 || (v2 = new RegExp(c(g2), "g"));
    else if (g2 instanceof RegExp)
      v2 = g2;
    else if (!(g2 instanceof Array))
      throw new TypeError("lineBreak must be a RegExp object, a string, or an array consisted of a RegExp object and a string");
  }
  v2 || (v2 = /\n/g, k2 = "\n"), x = "g", v2.ignoreCase && (x += "i"), v2.multiline && (x += "m"), q2 = new RegExp("\\s*(?:" + v2.source + ")(?:" + v2.source + "|\\s)*", x), v2.global || (v2 = new RegExp(v2.source, x));
  var z = "hard" === I ? /\b/ : /(\S+\s+)/, T = new Array(e2 + 1).join(" "), U = "default" === M || "collapse" === M, W = "collapse" === M, N = "line" === M, P = "all" === M, H = /\t/g, G = /  +/g, K = /^\s+/, $ = /\s+$/, F = /\S/, Q = /\s/, D = t2 - e2;
  return function(i2) {
    var s3;
    if (i2 = i2.toString().replace(H, L), !k2) {
      if (v2.lastIndex = 0, !(s3 = v2.exec(i2)))
        throw new TypeError("Line break string for the output not specified");
      k2 = s3[0];
    }
    var n2, r2, a2, o2, h2, l2, d3, c2, p3, u3 = 0;
    for (n2 = [], q2.lastIndex = 0, s3 = q2.exec(i2); s3; ) {
      if (n2.push(i2.substring(u3, s3.index)), "none" !== B) {
        for (a2 = [], o2 = 0, v2.lastIndex = 0, r2 = v2.exec(s3[0]); r2; )
          a2.push(s3[0].substring(o2, r2.index)), o2 = r2.index + r2[0].length, r2 = v2.exec(s3[0]);
        a2.push(s3[0].substring(o2)), n2.push({ type: "break", breaks: a2 });
      } else
        h2 = W ? " " : s3[0].replace(v2, ""), n2.push({ type: "break", remaining: h2 });
      u3 = s3.index + s3[0].length, s3 = q2.exec(i2);
    }
    if (n2.push(i2.substring(u3)), y2)
      for (p3 = [], l2 = 0; l2 < n2.length; l2++) {
        var g3 = n2[l2];
        if ("string" != typeof g3)
          p3.push(g3);
        else {
          for (u3 = 0, y2.lastIndex = 0, s3 = y2.exec(g3); s3; )
            p3.push(g3.substring(u3, s3.index)), p3.push({ type: "skip", value: s3[0] }), u3 = s3.index + s3[0].length, s3 = y2.exec(g3);
          p3.push(g3.substring(u3));
        }
      }
    else
      p3 = n2;
    var f3 = [];
    for (l2 = 0; l2 < p3.length; l2++) {
      var _3 = p3[l2];
      if ("string" != typeof _3)
        f3.push(_3);
      else {
        W && (_3 = _3.replace(G, " "));
        var m3 = _3.split(z), A2 = [];
        for (d3 = 0; d3 < m3.length; d3++) {
          var x2 = m3[d3];
          if ("hard" === I)
            for (c2 = 0; c2 < x2.length; c2 += D)
              A2.push(x2.slice(c2, c2 + D));
          else
            A2.push(x2);
        }
        f3 = f3.concat(A2);
      }
    }
    var j2, M2 = 0, R2 = e2 + S.length, O2 = [T + S], V = 0, Y = true, J = true, X = C;
    function Z(i3) {
      var s4, n3, r3, a3 = O2[M2];
      if (P)
        R2 > t2 && (V = V || t2, r3 = a3.length - (R2 - V), O2[M2] = a3.substring(0, r3)), V = 0;
      else {
        for (s4 = a3.length - 1; s4 >= e2 && " " === a3[s4]; )
          s4--;
        for (; s4 >= e2 && Q.test(a3[s4]); )
          s4--;
        ++s4 !== a3.length && (O2[M2] = a3.substring(0, s4)), J && Y && N && R2 > t2 && (r3 = a3.length - (R2 - t2)) < s4 && (r3 = s4);
      }
      if (J && (J = false, E2 && (s4 = O2[M2].substring(e2).search(E2), X = s4 >= 0 && s4 + b2 > 0 ? new Array(s4 + b2 + 1).join(" ") : "")), r3) {
        for (; r3 + D < a3.length; )
          P ? (n3 = a3.substring(r3, r3 + D), O2.push(T + X + n3)) : O2.push(T + X), r3 += D, M2++;
        if (!i3)
          return n3 = a3.substring(r3), X + n3;
        P ? (n3 = a3.substring(r3), O2.push(T + X + n3)) : O2.push(T + X), M2++;
      }
      return "";
    }
    for (l2 = 0; l2 < f3.length; l2++) {
      var ee = f3[l2];
      if ("" !== ee)
        if ("string" == typeof ee) {
          for (var te; ; ) {
            if (te = void 0, R2 + ee.length > t2 && R2 + (te = ee.replace($, "")).length > t2 && "" !== te && R2 > e2) {
              if (j2 = Z(false), O2.push(T + X), M2++, R2 = e2 + X.length, j2) {
                O2[M2] += j2, R2 += j2.length, Y = true;
                continue;
              }
              !U && (!N || J && Y) || (ee = ee.replace(K, "")), Y = false;
            } else
              Y && (U || N && (!J || !Y) ? "" !== (ee = ee.replace(K, "")) && (Y = false) : F.test(ee) && (Y = false));
            break;
          }
          P && te && R2 + te.length > t2 && (V = R2 + te.length), O2[M2] += ee, R2 += ee.length;
        } else if ("break" === ee.type)
          if ("none" !== B) {
            var ie = ee.breaks, se = ie.length - 1;
            if ("s" === B) {
              for (d3 = 0; d3 < se; d3++)
                ie[d3 + 1].length < w2 ? ie[d3 + 1] = W ? " " : ie[d3] + ie[d3 + 1] : (P && (O2[M2] += ie[d3], R2 += ie[d3].length), Z(true), O2.push(T + S), M2++, R2 = e2 + S.length, J = Y = true);
              (!Y || P || N && J) && ((W || !Y && "" === ie[se]) && (ie[se] = " "), O2[M2] += ie[se], R2 += ie[se].length);
            } else if ("m" === B && se < w2)
              (!Y || P || N && J) && (W ? ee = " " : (ee = ie.join(""), Y || "" !== ee || (ee = " ")), O2[M2] += ee, R2 += ee.length);
            else if (U) {
              for (Z(true), d3 = 0; d3 < se; d3++)
                O2.push(T + S), M2++;
              R2 = e2 + S.length, J = Y = true;
            } else
              for ((P || J && Y) && (O2[M2] += ie[0], R2 += ie[0].length), d3 = 0; d3 < se; d3++)
                Z(true), O2.push(T + S + ie[d3 + 1]), M2++, R2 = e2 + S.length + ie[d3 + 1].length, J = Y = true;
          } else
            (!Y || P || N && J) && (ee = ee.remaining, (W || !Y && "" === ee) && (ee = " "), O2[M2] += ee, R2 += ee.length);
        else
          "skip" === ee.type && (R2 > t2 && (j2 = Z(false), O2.push(T + X), M2++, R2 = e2 + X.length, j2 && (O2[M2] += j2, R2 += j2.length), Y = true), O2[M2] += ee.value);
    }
    return Z(true), O2.join(k2);
  };
};
p.soft = p, p.hard = function() {
  var e2 = [].slice.call(arguments), t2 = e2.length - 1;
  return "object" == typeof e2[t2] ? e2[t2].mode = "hard" : e2.push({ mode: "hard" }), p.apply(null, e2);
}, p.wrap = function(e2) {
  var t2 = [].slice.call(arguments);
  return t2.shift(), p.apply(null, t2)(e2);
};
var u = e(t.exports), g = function(e2, t2) {
  return Object.assign(document.createElement("canvas"), { width: e2, height: t2 });
};
var f = e(new class {
  grayscale(e2) {
    for (let t2 = 0; t2 < e2.data.length; t2 += 4) {
      const i2 = 0.299 * e2.data[t2] + 0.587 * e2.data[t2 + 1] + 0.114 * e2.data[t2 + 2];
      e2.data.fill(i2, t2, t2 + 3);
    }
    return e2;
  }
  threshold(e2, t2) {
    for (let i2 = 0; i2 < e2.data.length; i2 += 4) {
      const s2 = 0.299 * e2.data[i2] + 0.587 * e2.data[i2 + 1] + 0.114 * e2.data[i2 + 2] < t2 ? 0 : 255;
      e2.data.fill(s2, i2, i2 + 3);
    }
    return e2;
  }
  bayer(e2, t2) {
    const i2 = [[15, 135, 45, 165], [195, 75, 225, 105], [60, 180, 30, 150], [240, 120, 210, 90]];
    for (let s2 = 0; s2 < e2.data.length; s2 += 4) {
      const n2 = 0.299 * e2.data[s2] + 0.587 * e2.data[s2 + 1] + 0.114 * e2.data[s2 + 2], r2 = s2 / 4 % e2.width, a2 = Math.floor(s2 / 4 / e2.width), o2 = Math.floor((n2 + i2[r2 % 4][a2 % 4]) / 2) < t2 ? 0 : 255;
      e2.data.fill(o2, s2, s2 + 3);
    }
    return e2;
  }
  floydsteinberg(e2) {
    const t2 = e2.width, i2 = new Uint8ClampedArray(e2.width * e2.height);
    for (let t3 = 0, s2 = 0; s2 < e2.data.length; t3++, s2 += 4)
      i2[t3] = 0.299 * e2.data[s2] + 0.587 * e2.data[s2 + 1] + 0.114 * e2.data[s2 + 2];
    for (let s2 = 0, n2 = 0; n2 < e2.data.length; s2++, n2 += 4) {
      const r2 = i2[s2] < 129 ? 0 : 255, a2 = Math.floor((i2[s2] - r2) / 16);
      e2.data.fill(r2, n2, n2 + 3), i2[s2 + 1] += 7 * a2, i2[s2 + t2 - 1] += 3 * a2, i2[s2 + t2] += 5 * a2, i2[s2 + t2 + 1] += 1 * a2;
    }
    return e2;
  }
  atkinson(e2) {
    const t2 = e2.width, i2 = new Uint8ClampedArray(e2.width * e2.height);
    for (let t3 = 0, s2 = 0; s2 < e2.data.length; t3++, s2 += 4)
      i2[t3] = 0.299 * e2.data[s2] + 0.587 * e2.data[s2 + 1] + 0.114 * e2.data[s2 + 2];
    for (let s2 = 0, n2 = 0; n2 < e2.data.length; s2++, n2 += 4) {
      const r2 = i2[s2] < 129 ? 0 : 255, a2 = Math.floor((i2[s2] - r2) / 8);
      e2.data.fill(r2, n2, n2 + 3), i2[s2 + 1] += a2, i2[s2 + 2] += a2, i2[s2 + t2 - 1] += a2, i2[s2 + t2] += a2, i2[s2 + t2 + 1] += a2, i2[s2 + 2 * t2] += a2;
    }
    return e2;
  }
}());
var w = e(new class {
  flatten(e2, t2) {
    for (let i2 = 0; i2 < e2.data.length; i2 += 4) {
      const s2 = e2.data[i2 + 3], n2 = 255 - s2;
      e2.data[i2] = (s2 * e2.data[i2] + n2 * t2[0]) / 255, e2.data[i2 + 1] = (s2 * e2.data[i2 + 1] + n2 * t2[1]) / 255, e2.data[i2 + 2] = (s2 * e2.data[i2 + 2] + n2 * t2[2]) / 255, e2.data[i2 + 3] = 255;
    }
    return e2;
  }
}());
const _ = { cp437: { name: "USA, Standard Europe", languages: ["en"], offset: 128, chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ " }, cp720: { name: "Arabic", languages: ["ar"], offset: 128, chars: "éâàçêëèïîّْô¤ـûùءآأؤ£إئابةتثجحخدذرزسشص«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ضطظعغفµقكلمنهوىي≡ًٌٍَُِ≈°∙·√ⁿ²■ " }, cp737: { name: "Greek", languages: ["el"], offset: 128, chars: "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρσςτυφχψ░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ωάέήϊίόύϋώΆΈΉΊΌΎΏ±≥≤ΪΫ÷≈°∙·√ⁿ²■ " }, cp775: { name: "Baltic Rim", languages: ["et", "lt"], offset: 128, chars: "ĆüéāäģåćłēŖŗīŹÄÅÉæÆōöĢ¢ŚśÖÜø£Ø×¤ĀĪóŻżź”¦©®¬½¼Ł«»░▒▓│┤ĄČĘĖ╣║╗╝ĮŠ┐└┴┬├─┼ŲŪ╚╔╩╦╠═╬Žąčęėįšųūž┘┌█▄▌▐▀ÓßŌŃõÕµńĶķĻļņĒŅ’­±“¾¶§÷„°∙·¹³²■ " }, cp850: { name: "Multilingual", languages: ["en"], offset: 128, chars: "ÇüéâäůćçłëŐőîŹÄĆÉĹĺôöĽľŚśÖÜŤťŁ×čáíóúĄąŽžĘę¬źČş«»░▒▓│┤ÁÂĚŞ╣║╗╝Żż┐└┴┬├─┼Ăă╚╔╩╦╠═╬¤đĐĎËďŇÍÎě┘┌█▄ŢŮ▀ÓßÔŃńňŠšŔÚŕŰýÝţ´­˝˛ˇ˘§÷¸°¨˙űŘř■ " }, cp851: { name: "Greek", languages: ["el"], offset: 128, chars: "ÇüéâäàΆçêëèïîΈÄΉΊ ΌôöΎûùΏÖÜά£έήίϊΐόύΑΒΓΔΕΖΗ½ΘΙ«»░▒▓│┤ΚΛΜΝ╣║╗╝ΞΟ┐└┴┬├─┼ΠΡ╚╔╩╦╠═╬ΣΤΥΦΧΨΩαβγ┘┌█▄δε▀ζηθικλμνξοπρσςτ´­±υφχ§ψ¸°¨ωϋΰώ■ " }, cp852: { name: "Latin 2", languages: ["hu", "pl", "cz"], offset: 128, chars: "ÇüéâäůćçłëŐőîŹÄĆÉĹĺôöĽľŚśÖÜŤťŁ×čáíóúĄąŽžĘę¬źČş«»░▒▓│┤ÁÂĚŞ╣║╗╝Żż┐└┴┬├─┼Ăă╚╔╩╦╠═╬¤đĐĎËďŇÍÎě┘┌█▄ŢŮ▀ÓßÔŃńňŠšŔÚŕŰýÝţ´­˝˛ˇ˘§÷¸°¨˙űŘř■ " }, cp853: { name: "Turkish", languages: ["tr"], offset: 128, chars: "ÇüéâäàĉçêëèïîìÄĈÉċĊôöòûùİÖÜĝ£Ĝ×ĵáíóúñÑĞğĤĥ�½Ĵş«»░▒▓│┤ÁÂÀŞ╣║╗╝Żż┐└┴┬├─┼Ŝŝ╚╔╩╦╠═╬¤��ÊËÈıÍÎÏ┘┌█▄�Ì▀ÓßÔÒĠġµĦħÚÛÙŬŭ�´­�ℓŉ˘§÷¸°¨˙�³²■ " }, cp855: { name: "Cyrillic", languages: ["bg"], offset: 128, chars: "ђЂѓЃёЁєЄѕЅіІїЇјЈљЉњЊћЋќЌўЎџЏюЮъЪаАбБцЦдДеЕфФгГ«»░▒▓│┤хХиИ╣║╗╝йЙ┐└┴┬├─┼кК╚╔╩╦╠═╬¤лЛмМнНоОп┘┌█▄Пя▀ЯрРсСтТуУжЖвВьЬ№­ыЫзЗшШэЭщЩчЧ§■ " }, cp857: { name: "Turkish", languages: ["tr"], offset: 128, chars: "ÇüéâäàåçêëèïîıÄÅÉæÆôöòûùİÖÜø£ØŞşáíóúñÑĞğ¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ºªÊËÈ�ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµ�×ÚÛÙìÿ¯´­±�¾¶§÷¸°¨·¹³²■ " }, cp858: { name: "Euro", languages: ["en"], offset: 128, chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈ€ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ " }, cp860: { name: "Portuguese", languages: ["pt"], offset: 128, chars: "ÇüéâãàÁçêÊèÍÔìÃÂÉÀÈôõòÚùÌÕÜ¢£Ù₧ÓáíóúñÑªº¿Ò¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ " }, cp861: { name: "Icelandic", languages: ["is"], offset: 128, chars: "ÇüéâäàåçêëèÐðÞÄÅÉæÆôöþûÝýÖÜø£Ø₧ƒáíóúÁÍÓÚ¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ " }, cp862: { name: "Hebrew", languages: ["he"], offset: 128, chars: "אבגדהוזחטיךכלםמןנסעףפץצקרשת¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ " }, cp863: { name: "Canadian French", languages: ["fr"], offset: 128, chars: "ÇüéâÂà¶çêëèïî‗À§ÉÈÊôËÏûù¤ÔÜ¢£ÙÛƒ¦´óú¨¸³¯Î⌐¬½¼¾«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ " }, cp864: { name: "Arabic", languages: ["ar"], offset: 0, chars: "\0\x07\b	\n\v\f\r\x1B !\"#$٪&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~°·∙√▒─│┼┤┬├┴┐┌└┘β∞φ±½¼≈«»ﻷﻸ��ﻻﻼ� ­ﺂ£¤ﺄ��ﺎﺏﺕﺙ،ﺝﺡﺥ٠١٢٣٤٥٦٧٨٩ﻑ؛ﺱﺵﺹ؟¢ﺀﺁﺃﺅﻊﺋﺍﺑﺓﺗﺛﺟﺣﺧﺩﺫﺭﺯﺳﺷﺻﺿﻁﻅﻋﻏ¦¬÷×ﻉـﻓﻗﻛﻟﻣﻧﻫﻭﻯﻳﺽﻌﻎﻍﻡﹽّﻥﻩﻬﻰﻲﻐﻕﻵﻶﻝﻙﻱ■�" }, cp865: { name: "Nordic", languages: ["sv", "dk"], offset: 128, chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø₧ƒáíóúñÑªº¿⌐¬½¼¡«¤░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ " }, cp866: { name: "Cyrillic 2", languages: ["ru"], offset: 128, chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№¤■ " }, cp869: { name: "Greek", languages: ["el"], offset: 128, chars: "������Ά�·¬¦‘’Έ―ΉΊΪΌ��ΎΫ©Ώ²³ά£έήίϊΐόύΑΒΓΔΕΖΗ½ΘΙ«»░▒▓│┤ΚΛΜΝ╣║╗╝ΞΟ┐└┴┬├─┼ΠΡ╚╔╩╦╠═╬ΣΤΥΦΧΨΩαβγ┘┌█▄δε▀ζηθικλμνξοπρσςτ΄­±υφχ§ψ΅°¨ωϋΰώ■ " }, cp874: { name: "Thai", languages: ["th"], offset: 128, chars: "€����…�����������‘’“”•–—�������� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����" }, cp1098: { name: "Farsi", languages: ["fa"], offset: 128, chars: "  ،؛؟ًآﺂاﺎءأﺄؤﺋبﺑﭖﭘتﺗثﺛجﺟﭺﭼ×حﺣخﺧدذرزﮊسﺳشﺷصﺻ«»░▒▓│┤ضﺿﻁﻃ╣║╗╝¤ﻅ┐└┴┬├─┼ﻇع╚╔╩╦╠═╬ ﻊﻋﻌغﻎﻏﻐفﻓ┘┌█▄قﻗ▀ﮎﻛﮒﮔلﻟمﻣنﻧوهﻫﻬﮤﯼ­ﯽﯾـ٠١٢٣٤٥٦٧٨٩■ " }, cp1118: { name: "Lithuanian", languages: ["lt"], offset: 128, chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤ĄČĘĖ╣║╗╝ĮŠ┐└┴┬├─┼ŲŪ╚╔╩╦╠═╬Žąčęėįšųūž┘┌█▄▌▐▀αβΓπΣσµτΦΘΩδ∞φε⋂≡±≥≤„“÷≈°∙˙√ⁿ²■ " }, cp1119: { name: "Lithuanian", languages: ["lt"], offset: 128, chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤ĄČĘĖ╣║╗╝ĮŠ┐└┴┬├─┼ŲŪ╚╔╩╦╠═╬Žąčęėįšųūž┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁё≥≤„“÷≈°∙·√ⁿ²■ " }, cp1125: { name: "Ukrainian", languages: ["uk"], offset: 128, chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёҐґЄєІіЇї·√№¤■ " }, cp1162: { name: "Thai", languages: ["th"], offset: 128, chars: "€…‘’“”•–— กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����" }, cp2001: { name: "Lithuanian KBL or 771", languages: ["lt"], offset: 128, chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█ĄąČčрстуфхцчшщъыьэюяĘęĖėĮįŠšŲųŪūŽž■ " }, cp3001: { name: "Estonian 1 or 1116", languages: ["et"], offset: 128, chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤šŠÊËÈıÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµžŽÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ " }, cp3002: { name: "Estonian 2", languages: ["et"], offset: 128, chars: " ¡¢£¤¥¦§¨©ª«¬­®‾°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŠÑÒÓÔÕÖ×ØÙÚÛÜÝŽßàáâãäåæçèéêëìíîïšñòóôõö÷øùúûüýžÿ" }, cp3011: { name: "Latvian 1", languages: ["lv"], offset: 128, chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤Ā╢ņ╕╣║╗╝╜╛┐└┴┬├─┼ā╟╚╔╩╦╠═╬╧Š╤čČ╘╒ģĪī┘┌█▄ūŪ▀αßΓπΣσµτΦΘΩδ∞φε∩ĒēĢķĶļĻžŽ∙·√Ņš■ " }, cp3012: { name: "Latvian 2 (modified 866)", languages: ["lv"], offset: 128, chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤Ā╢ņ╕╣║╗╝Ō╛┐└┴┬├─┼ā╟╚╔╩╦╠═╬╧Š╤čČ╘╒ģĪī┘┌█▄ūŪ▀рстуфхцчшщъыьэюяĒēĢķĶļĻžŽō·√Ņš■ " }, cp3021: { name: "Bulgarian (MIK)", languages: ["bg"], offset: 128, chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя└┴┬├─┼╣║╚╔╩╦╠═╬┐░▒▓│┤№§╗╝┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ " }, cp3041: { name: "Maltese ISO 646", languages: ["mt"], offset: 0, chars: `\0\x07\b	
\v\f\r\x1B !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZġżħ^_ċabcdefghijklmnopqrstuvwxyzĠŻĦĊ` }, cp3840: { name: "Russian (modified 866)", languages: ["ru"], offset: 128, chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюя≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ " }, cp3841: { name: "Ghost", languages: ["ru"], offset: 128, chars: `ғәёіїјҝөўүӽӈҹҷє£ҒӘЁІЇЈҜӨЎҮӼӇҸҶЄЪ !"#$%&'()*+,-./0123456789:;<=>?юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧ∅` }, cp3843: { name: "Polish (Mazovia)", languages: ["pl"], offset: 128, chars: "ÇüéâäàąçêëèïîćÄĄĘęłôöĆûùŚÖÜ¢Ł¥śƒŹŻóÓńŃźż¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ " }, cp3844: { name: "Czech (Kamenický)", languages: ["cz"], offset: 128, chars: "ČüéďäĎŤčěĚĹÍľĺÄÁÉžŽôöÓůÚýÖÜŠĽÝŘťáíóúňŇŮÔšřŕŔ¼§«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ " }, cp3845: { name: "Hungarian (CWI-2)", languages: ["hu"], offset: 128, chars: "ÇüéâäàåçêëèïîÍÄÁÉæÆőöÓűÚŰÖÜ¢£¥₧ƒáíóúñÑªŐ¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ " }, cp3846: { name: "Turkish", languages: ["tr"], offset: 128, chars: "ÇüéâäàåçêëèïîıÄÅÉæÆôöòûùİÖÜ¢£¥ŞşáíóúñÑĞğ¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ " }, cp3847: { name: "Brazil ABNT", languages: ["pt"], offset: 256, chars: "" }, cp3848: { name: "Brazil ABICOMP", languages: ["pt"], offset: 160, chars: " ÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖŒÙÚÛÜŸ¨£¦§°¡àáâãäçèéêëìíîïñòóôõöœùúûüÿßªº¿±" }, iso88591: { name: "Latin 1", languages: ["en"], offset: 128, chars: " ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ" }, iso88592: { name: "Latin 2", languages: ["hu", "pl", "cz"], offset: 128, chars: " Ą˘Ł¤ĽŚ§¨ŠŞŤŹ­ŽŻ°ą˛ł´ľśˇ¸šşťź˝žżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙" }, iso88597: { name: "Greek", languages: ["el"], offset: 128, chars: " ‘’£€₯¦§¨©ͺ«¬­�―°±²³΄΅Ά·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�" }, iso885915: { name: "Latin 9", languages: ["fr"], offset: 128, chars: " ¡¢£€¥Š§š©ª«¬­®¯°±²³Žµ¶·ž¹º»ŒœŸ¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ" }, rk1048: { name: "Kazakh", languages: ["kk"], offset: 128, chars: "ЂЃ‚ѓ„…†‡€‰Љ‹ЊҚҺЏђ‘’“”•–—�™љ›њқһџ ҰұӘ¤Ө¦§Ё©Ғ«¬­®Ү°±Ііөµ¶·ё№ғ»әҢңүАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя" }, windows1250: { name: "Latin 2", languages: ["hu", "pl", "cz"], offset: 128, chars: "€�‚�„…†‡�‰Š‹ŚŤŽŹ�‘’“”•–—�™š›śťžź ˇ˘Ł¤Ą¦§¨©Ş«¬­®Ż°±˛ł´µ¶·¸ąş»Ľ˝ľżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙" }, windows1251: { name: "Cyrillic", languages: ["ru"], offset: 128, chars: "ЂЃ‚ѓ„…†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—�™љ›њќћџ ЎўЈ¤Ґ¦§Ё©Є«¬­®Ї°±Ііґµ¶·ё№є»јЅѕїАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя" }, windows1252: { name: "Latin", languages: ["fr"], offset: 128, chars: "€�‚ƒ„…†‡ˆ‰Š‹Œ�Ž��‘’“”•–—˜™š›œ�žŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ" }, windows1253: { name: "Greek", languages: ["el"], offset: 128, chars: "€�‚ƒ„…†‡�‰�‹�����‘’“”•–—�™�›���� ΅Ά£¤¥¦§¨©�«¬­®―°±²³΄µ¶·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�" }, windows1254: { name: "Turkish", languages: ["tr"], offset: 128, chars: "€�‚ƒ„…†‡ˆ‰Š‹Œ����‘’“”•–—˜™š›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ" }, windows1255: { name: "Hebrew", languages: ["he"], offset: 128, chars: "€�‚ƒ„…†‡ˆ‰�‹�����‘’“”•–—˜™�›���� ¡¢£₪¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾¿ְֱֲֳִֵֶַָֹֺֻּֽ־ֿ׀ׁׂ׃װױײ׳״�������אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�" }, windows1256: { name: "Arabic", languages: ["ar"], offset: 128, chars: "€پ‚ƒ„…†‡ˆ‰ٹ‹Œچژڈگ‘’“”•–—ک™ڑ›œ‌‍ں ،¢£¤¥¦§¨©ھ«¬­®¯°±²³´µ¶·¸¹؛»¼½¾؟ہءآأؤإئابةتثجحخدذرزسشصض×طظعغـفقكàلâمنهوçèéêëىيîïًٌٍَôُِ÷ّùْûü‎‏ے" }, windows1257: { name: "Baltic Rim", languages: ["et", "lt"], offset: 128, chars: "€�‚�„…†‡�‰�‹�¨ˇ¸�‘’“”•–—�™�›�¯˛� �¢£¤�¦§Ø©Ŗ«¬­®Æ°±²³´µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž˙" }, windows1258: { name: "Vietnamese", languages: ["vi"], offset: 128, chars: "€�‚ƒ„…†‡ˆ‰�‹Œ����‘’“”•–—˜™�›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ" } }, b = { en: "The quick brown fox jumps over the lazy dog.", jp: "イロハニホヘト チリヌルヲ ワカヨタレソ ツネナラム", pt: "O próximo vôo à noite sobre o Atlântico, põe freqüentemente o único médico.", fr: "Les naïfs ægithales hâtifs pondant à Noël où il gèle sont sûrs d'être déçus en voyant leurs drôles d'œufs abîmés.", sv: "Flygande bäckasiner söka strax hwila på mjuka tuvor.", dk: "Quizdeltagerne spiste jordbær med fløde", el: "ξεσκεπάζω την ψυχοφθόρα βδελυγμία", tr: "Pijamalı hasta, yağız şoföre çabucak güvendi.", ru: "Съешь же ещё этих мягких французских булок да выпей чаю", hu: "Árvíztűrő tükörfúrógép", pl: "Pchnąć w tę łódź jeża lub ośm skrzyń fig", cz: "Mohu jíst sklo, neublíží mi.", ar: "أنا قادر على أكل الزجاج و هذا لا يؤلمني.", et: "Ma võin klaasi süüa, see ei tee mulle midagi.", lt: "Aš galiu valgyti stiklą ir jis manęs nežeidžia.", bg: "Мога да ям стъкло, то не ми вреди.", is: "Ég get etið gler án þess að meiða mig.", he: "אני יכול לאכול זכוכית וזה לא מזיק לי.", fa: ".من می توانم بدونِ احساس درد شيشه بخورم", uk: "Я можу їсти скло, і воно мені не зашкодить.", vi: "Tôi có thể ăn thủy tinh mà không hại gì.", kk: "қазақша", lv: "Es varu ēst stiklu, tas man nekaitē.", mt: "Nista' niekol il-ħġieġ u ma jagħmilli xejn.", th: "ฉันกินกระจกได้ แต่มันไม่ทำให้ฉันเจ็บ" };
class m {
  static getEncodings() {
    return Object.keys(_);
  }
  static getTestStrings(e2) {
    return void 0 !== _[e2] && void 0 !== _[e2].languages ? _[e2].languages.map((e3) => ({ language: e3, string: b[e3] })) : [];
  }
  static supports(e2) {
    return void 0 !== _[e2] && void 0 !== _[e2].chars;
  }
  static encode(e2, t2) {
    const i2 = new Uint8Array(e2.length);
    let s2 = "\0".repeat(128), n2 = 128;
    void 0 !== _[t2] && void 0 !== _[t2].chars && (s2 = _[t2].chars, n2 = _[t2].offset);
    for (let t3 = 0; t3 < e2.length; t3++) {
      const r2 = e2.codePointAt(t3);
      if (r2 < 128)
        i2[t3] = r2;
      else {
        const a2 = s2.indexOf(e2[t3]);
        -1 !== a2 ? i2[t3] = n2 + a2 : r2 < 256 && (r2 < n2 || r2 >= n2 + s2.length) ? i2[t3] = r2 : i2[t3] = 63;
      }
    }
    return i2;
  }
  static autoEncode(e2, t2) {
    const i2 = [];
    let s2, n2 = -1;
    for (let r2 = 0; r2 < e2.length; r2++) {
      const a2 = e2.codePointAt(r2);
      let o2, h2 = 0;
      if (a2 < 128 && (o2 = s2 || t2[0], h2 = a2), !o2 && s2) {
        const t3 = _[s2].chars.indexOf(e2[r2]);
        -1 !== t3 && (o2 = s2, h2 = _[s2].offset + t3);
      }
      if (!o2)
        for (let i3 = 0; i3 < t2.length; i3++) {
          const s3 = _[t2[i3]].chars.indexOf(e2[r2]);
          if (-1 !== s3) {
            o2 = t2[i3], h2 = _[t2[i3]].offset + s3;
            break;
          }
        }
      o2 || (o2 = s2 || t2[0], h2 = 63), s2 != o2 && (s2 && (i2[n2].bytes = new Uint8Array(i2[n2].bytes)), n2++, i2[n2] = { codepage: o2, bytes: [] }, s2 = o2), i2[n2].bytes.push(h2);
    }
    return s2 && (i2[n2].bytes = new Uint8Array(i2[n2].bytes)), i2;
  }
}
const y = { epson: { cp437: 0, shiftjis: 1, cp850: 2, cp860: 3, cp863: 4, cp865: 5, cp851: 11, cp853: 12, cp857: 13, cp737: 14, iso88597: 15, windows1252: 16, cp866: 17, cp852: 18, cp858: 19, cp720: 32, cp775: 33, cp855: 34, cp861: 35, cp862: 36, cp864: 37, cp869: 38, iso88592: 39, iso885915: 40, cp1098: 41, cp1118: 42, cp1119: 43, cp1125: 44, windows1250: 45, windows1251: 46, windows1253: 47, windows1254: 48, windows1255: 49, windows1256: 50, windows1257: 51, windows1258: 52, rk1048: 53 }, zjiang: { cp437: 0, shiftjis: 1, cp850: 2, cp860: 3, cp863: 4, cp865: 5, windows1252: 16, cp866: 17, cp852: 18, cp858: 19, windows1255: 32, cp861: 56, cp855: 60, cp857: 61, cp862: 62, cp864: 63, cp737: 64, cp851: 65, cp869: 66, cp1119: 68, cp1118: 69, windows1250: 72, windows1251: 73, cp3840: 74, cp3843: 76, cp3844: 77, cp3845: 78, cp3846: 79, cp3847: 80, cp3848: 81, cp2001: 83, cp3001: 84, cp3002: 85, cp3011: 86, cp3012: 87, cp3021: 88, cp3041: 89, windows1253: 90, windows1254: 91, windows1256: 92, cp720: 93, windows1258: 94, cp775: 95 }, bixolon: { cp437: 0, shiftjis: 1, cp850: 2, cp860: 3, cp863: 4, cp865: 5, cp851: 11, cp858: 19 }, star: { cp437: 0, shiftjis: 1, cp850: 2, cp860: 3, cp863: 4, cp865: 5, windows1252: 16, cp866: 17, cp852: 18, cp858: 19 }, citizen: { cp437: 0, shiftjis: 1, cp850: 2, cp860: 3, cp863: 4, cp865: 5, cp852: 18, cp866: 17, cp857: 8, windows1252: 16, cp858: 19, cp864: 40 }, legacy: { cp437: 0, cp737: 64, cp850: 2, cp775: 95, cp852: 18, cp855: 60, cp857: 61, cp858: 19, cp860: 3, cp861: 56, cp862: 62, cp863: 4, cp864: 28, cp865: 5, cp866: 17, cp869: 66, cp936: 255, cp949: 253, cp950: 254, cp1252: 16, iso88596: 22, shiftjis: 252, windows874: 30, windows1250: 72, windows1251: 73, windows1252: 71, windows1253: 90, windows1254: 91, windows1255: 32, windows1256: 92, windows1257: 25, windows1258: 94 } };
class v {
  constructor(e2) {
    this._reset(e2);
  }
  _reset(e2) {
    this._options = Object.assign({ width: null, embedded: false, wordWrap: true, imageMode: "column", codepageMapping: "epson", codepageCandidates: ["cp437", "cp858", "cp860", "cp861", "cp863", "cp865", "cp852", "cp857", "cp855", "cp866", "cp869"] }, e2), this._embedded = this._options.width && this._options.embedded, this._buffer = [], this._queued = [], this._cursor = 0, this._codepage = "ascii", this._state = { codepage: 0, align: "left", bold: false, italic: false, underline: false, invert: false, width: 1, height: 1 };
  }
  _encode(e2) {
    if ("auto" != this._codepage)
      return m.encode(e2, this._codepage);
    let t2;
    t2 = "string" == typeof this._options.codepageMapping ? y[this._options.codepageMapping] : this._options.codepageMapping;
    const i2 = m.autoEncode(e2, this._options.codepageCandidates);
    let s2 = 0;
    for (let e3 = 0; e3 < i2.length; e3++)
      s2 += 3 + i2[e3].bytes.byteLength;
    const n2 = new Uint8Array(s2);
    let r2 = 0;
    for (let e3 = 0; e3 < i2.length; e3++)
      n2.set([27, 116, t2[i2[e3].codepage]], r2), n2.set(i2[e3].bytes, r2 + 3), r2 += 3 + i2[e3].bytes.byteLength, this._state.codepage = t2[i2[e3].codepage];
    return n2;
  }
  _queue(e2) {
    e2.forEach((e3) => this._queued.push(e3));
  }
  _flush() {
    if (this._embedded) {
      let e2 = this._options.width - this._cursor;
      if ("left" == this._state.align && this._queued.push(new Array(e2).fill(32)), "center" == this._state.align) {
        const t2 = e2 % 2;
        e2 >>= 1, e2 > 0 && this._queued.push(new Array(e2).fill(32)), e2 + t2 > 0 && this._queued.unshift(new Array(e2 + t2).fill(32));
      }
      "right" == this._state.align && this._queued.unshift(new Array(e2).fill(32));
    }
    this._buffer = this._buffer.concat(this._queued), this._queued = [], this._cursor = 0;
  }
  _wrap(e2, t2) {
    if (t2 || this._options.wordWrap && this._options.width) {
      const i2 = "-".repeat(this._cursor);
      return u(t2 || this._options.width, { lineBreak: "\n", whitespace: "all" })(i2 + e2).substring(this._cursor).split("\n");
    }
    return [e2];
  }
  _restoreState() {
    this.bold(this._state.bold), this.italic(this._state.italic), this.underline(this._state.underline), this.invert(this._state.invert), this._queue([27, 116, this._state.codepage]);
  }
  _getCodepageIdentifier(e2) {
    let t2;
    return t2 = "string" == typeof this._options.codepageMapping ? y[this._options.codepageMapping] : this._options.codepageMapping, t2[e2];
  }
  initialize() {
    return this._queue([27, 64]), this._flush(), this;
  }
  codepage(e2) {
    if ("auto" === e2)
      return this._codepage = e2, this;
    if (!m.supports(e2))
      throw new Error("Unknown codepage");
    let t2;
    if (t2 = "string" == typeof this._options.codepageMapping ? y[this._options.codepageMapping] : this._options.codepageMapping, void 0 === t2[e2])
      throw new Error("Codepage not supported by printer");
    return this._codepage = e2, this._state.codepage = t2[e2], this._queue([27, 116, t2[e2]]), this;
  }
  text(e2, t2) {
    const i2 = this._wrap(e2, t2);
    for (let e3 = 0; e3 < i2.length; e3++) {
      const t3 = this._encode(i2[e3]);
      this._queue([t3]), this._cursor += i2[e3].length * this._state.width, this._options.width && !this._embedded && (this._cursor = this._cursor % this._options.width), e3 < i2.length - 1 && this.newline();
    }
    return this;
  }
  newline() {
    return this._flush(), this._queue([10, 13]), this._embedded && this._restoreState(), this;
  }
  line(e2, t2) {
    return this.text(e2, t2), this.newline(), this;
  }
  underline(e2) {
    return void 0 === e2 && (e2 = !this._state.underline), this._state.underline = e2, this._queue([27, 45, Number(e2)]), this;
  }
  italic(e2) {
    return void 0 === e2 && (e2 = !this._state.italic), this._state.italic = e2, this._queue([27, 52, Number(e2)]), this;
  }
  bold(e2) {
    return void 0 === e2 && (e2 = !this._state.bold), this._state.bold = e2, this._queue([27, 69, Number(e2)]), this;
  }
  width(e2) {
    if (void 0 === e2 && (e2 = 1), "number" != typeof e2)
      throw new Error("Width must be a number");
    if (e2 < 1 || e2 > 8)
      throw new Error("Width must be between 1 and 8");
    return this._state.width = e2, this._queue([29, 33, this._state.height - 1 | this._state.width - 1 << 4]), this;
  }
  height(e2) {
    if (void 0 === e2 && (e2 = 1), "number" != typeof e2)
      throw new Error("Height must be a number");
    if (e2 < 1 || e2 > 8)
      throw new Error("Height must be between 1 and 8");
    return this._state.height = e2, this._queue([29, 33, this._state.height - 1 | this._state.width - 1 << 4]), this;
  }
  invert(e2) {
    return void 0 === e2 && (e2 = !this._state.invert), this._state.invert = e2, this._queue([29, 66, Number(e2)]), this;
  }
  size(e2) {
    return e2 = "small" === e2 ? 1 : 0, this._queue([27, 77, e2]), this;
  }
  align(e2) {
    const t2 = { left: 0, center: 1, right: 2 };
    if (!(e2 in t2))
      throw new Error("Unknown alignment");
    return this._state.align = e2, this._embedded || this._queue([27, 97, t2[e2]]), this;
  }
  table(e2, t2) {
    0 != this._cursor && this.newline();
    for (let i2 = 0; i2 < t2.length; i2++) {
      const s2 = [];
      let n2 = 0;
      for (let r2 = 0; r2 < e2.length; r2++) {
        const a2 = [];
        if ("string" == typeof t2[i2][r2]) {
          const s3 = u(e2[r2].width, { lineBreak: "\n" })(t2[i2][r2]).split("\n");
          for (let t3 = 0; t3 < s3.length; t3++)
            "right" == e2[r2].align ? a2[t3] = this._encode(s3[t3].padStart(e2[r2].width)) : a2[t3] = this._encode(s3[t3].padEnd(e2[r2].width));
        }
        if ("function" == typeof t2[i2][r2]) {
          const s3 = new v(Object.assign({}, this._options, { width: e2[r2].width, embedded: true }));
          s3._codepage = this._codepage, s3.align(e2[r2].align), t2[i2][r2](s3);
          const n3 = s3.encode();
          let o2 = [];
          for (let e3 = 0; e3 < n3.byteLength; e3++)
            e3 < n3.byteLength - 1 && 10 === n3[e3] && 13 === n3[e3 + 1] ? (a2.push(o2), o2 = [], e3++) : o2.push(n3[e3]);
          o2.length && a2.push(o2);
        }
        n2 = Math.max(n2, a2.length), s2[r2] = a2;
      }
      for (let t3 = 0; t3 < e2.length; t3++)
        if (s2[t3].length < n2)
          for (let i3 = s2[t3].length; i3 < n2; i3++) {
            let i4 = "top";
            void 0 !== e2[t3].verticalAlign && (i4 = e2[t3].verticalAlign), "bottom" == i4 ? s2[t3].unshift(new Array(e2[t3].width).fill(32)) : s2[t3].push(new Array(e2[t3].width).fill(32));
          }
      for (let t3 = 0; t3 < n2; t3++) {
        for (let i3 = 0; i3 < e2.length; i3++)
          void 0 !== e2[i3].marginLeft && this.raw(new Array(e2[i3].marginLeft).fill(32)), this.raw(s2[i3][t3]), void 0 !== e2[i3].marginRight && this.raw(new Array(e2[i3].marginRight).fill(32));
        this.newline();
      }
    }
    return this;
  }
  rule(e2) {
    return e2 = Object.assign({ style: "single", width: this._options.width || 10 }, e2 || {}), this._queue([27, 116, this._getCodepageIdentifier("cp437"), new Array(e2.width).fill("double" === e2.style ? 205 : 196)]), this._queue([27, 116, this._state.codepage]), this.newline(), this;
  }
  box(e2, t2) {
    let i2;
    i2 = "double" == (e2 = Object.assign({ style: "single", width: this._options.width || 30, marginLeft: 0, marginRight: 0, paddingLeft: 0, paddingRight: 0 }, e2 || {})).style ? [201, 187, 200, 188, 205, 186] : [218, 191, 192, 217, 196, 179], 0 != this._cursor && this.newline(), this._restoreState(), this._queue([27, 116, this._getCodepageIdentifier("cp437")]), this._queue([new Array(e2.marginLeft).fill(32), i2[0], new Array(e2.width - 2).fill(i2[4]), i2[1], new Array(e2.marginRight).fill(32)]), this.newline();
    const s2 = [];
    if ("string" == typeof t2) {
      const i3 = u(e2.width - 2 - e2.paddingLeft - e2.paddingRight, { lineBreak: "\n" })(t2).split("\n");
      for (let t3 = 0; t3 < i3.length; t3++)
        "right" == e2.align ? s2[t3] = this._encode(i3[t3].padStart(e2.width - 2 - e2.paddingLeft - e2.paddingRight)) : s2[t3] = this._encode(i3[t3].padEnd(e2.width - 2 - e2.paddingLeft - e2.paddingRight));
    }
    if ("function" == typeof t2) {
      const i3 = new v(Object.assign({}, this._options, { width: e2.width - 2 - e2.paddingLeft - e2.paddingRight, embedded: true }));
      i3._codepage = this._codepage, i3.align(e2.align), t2(i3);
      const n2 = i3.encode();
      let r2 = [];
      for (let e3 = 0; e3 < n2.byteLength; e3++)
        e3 < n2.byteLength - 1 && 10 === n2[e3] && 13 === n2[e3 + 1] ? (s2.push(r2), r2 = [], e3++) : r2.push(n2[e3]);
      r2.length && s2.push(r2);
    }
    for (let t3 = 0; t3 < s2.length; t3++)
      this._queue([new Array(e2.marginLeft).fill(32), i2[5], new Array(e2.paddingLeft).fill(32)]), this._queue([s2[t3]]), this._restoreState(), this._queue([27, 116, this._getCodepageIdentifier("cp437")]), this._queue([new Array(e2.paddingRight).fill(32), i2[5], new Array(e2.marginRight).fill(32)]), this.newline();
    return this._queue([new Array(e2.marginLeft).fill(32), i2[2], new Array(e2.width - 2).fill(i2[4]), i2[3], new Array(e2.marginRight).fill(32)]), this._restoreState(), this.newline(), this;
  }
  barcode(e2, t2, i2) {
    if (this._embedded)
      throw new Error("Barcodes are not supported in table cells or boxes");
    const s2 = { upca: 0, upce: 1, ean13: 2, ean8: 3, code39: 4, coda39: 4, itf: 5, codabar: 6, code93: 72, code128: 73, "gs1-128": 80, "gs1-databar-omni": 81, "gs1-databar-truncated": 82, "gs1-databar-limited": 83, "gs1-databar-expanded": 84, "code128-auto": 85 };
    if (!(t2 in s2))
      throw new Error("Symbology not supported by printer");
    {
      const n2 = m.encode(e2, "ascii");
      0 != this._cursor && this.newline(), this._queue([29, 104, i2, 29, 119, "code39" === t2 ? 2 : 3]), "code128" == t2 && 123 !== n2[0] ? this._queue([29, 107, s2[t2], n2.length + 2, 123, 66, n2]) : s2[t2] > 64 ? this._queue([29, 107, s2[t2], n2.length, n2]) : this._queue([29, 107, s2[t2], n2, 0]);
    }
    return this._flush(), this;
  }
  qrcode(e2, t2, i2, s2) {
    if (this._embedded)
      throw new Error("QR codes are not supported in table cells or boxes");
    this._queue([10]);
    const n2 = { 1: 49, 2: 50 };
    if (void 0 === t2 && (t2 = 2), !(t2 in n2))
      throw new Error("Model must be 1 or 2");
    if (this._queue([29, 40, 107, 4, 0, 49, 65, n2[t2], 0]), void 0 === i2 && (i2 = 6), "number" != typeof i2)
      throw new Error("Size must be a number");
    if (i2 < 1 || i2 > 8)
      throw new Error("Size must be between 1 and 8");
    this._queue([29, 40, 107, 3, 0, 49, 67, i2]);
    const r2 = { l: 48, m: 49, q: 50, h: 51 };
    if (void 0 === s2 && (s2 = "m"), !(s2 in r2))
      throw new Error("Error level must be l, m, q or h");
    this._queue([29, 40, 107, 3, 0, 49, 69, r2[s2]]);
    const a2 = m.encode(e2, "iso88591"), o2 = a2.length + 3;
    return this._queue([29, 40, 107, o2 % 255, o2 / 255, 49, 80, 48, a2]), this._queue([29, 40, 107, 3, 0, 49, 81, 48]), this._flush(), this;
  }
  image(e2, t2, i2, s2, n2) {
    if (this._embedded)
      throw new Error("Images are not supported in table cells or boxes");
    if (t2 % 8 != 0)
      throw new Error("Width must be a multiple of 8");
    if (i2 % 8 != 0)
      throw new Error("Height must be a multiple of 8");
    void 0 === s2 && (s2 = "threshold"), void 0 === n2 && (n2 = 128);
    const r2 = g(t2, i2).getContext("2d");
    r2.drawImage(e2, 0, 0, t2, i2);
    let a2 = r2.getImageData(0, 0, t2, i2);
    switch (a2 = w.flatten(a2, [255, 255, 255]), s2) {
      case "threshold":
        a2 = f.threshold(a2, n2);
        break;
      case "bayer":
        a2 = f.bayer(a2, n2);
        break;
      case "floydsteinberg":
        a2 = f.floydsteinberg(a2);
        break;
      case "atkinson":
        a2 = f.atkinson(a2);
    }
    const o2 = (e3, s3) => e3 < t2 && s3 < i2 ? a2.data[4 * (t2 * s3 + e3)] > 0 ? 0 : 1 : 0, h2 = (e3, t3) => {
      const i3 = new Uint8Array(e3 * t3 >> 3);
      for (let s3 = 0; s3 < t3; s3++)
        for (let t4 = 0; t4 < e3; t4 += 8)
          for (let n3 = 0; n3 < 8; n3++)
            i3[s3 * (e3 >> 3) + (t4 >> 3)] |= o2(t4 + n3, s3) << 7 - n3;
      return i3;
    };
    return 0 != this._cursor && this.newline(), "column" == this._options.imageMode && (this._queue([27, 51, 36]), ((e3, t3) => {
      const i3 = [];
      for (let s3 = 0; s3 < Math.ceil(t3 / 24); s3++) {
        const t4 = new Uint8Array(3 * e3);
        for (let i4 = 0; i4 < e3; i4++)
          for (let e4 = 0; e4 < 3; e4++)
            for (let n3 = 0; n3 < 8; n3++)
              t4[3 * i4 + e4] |= o2(i4, 24 * s3 + n3 + 8 * e4) << 7 - n3;
        i3.push(t4);
      }
      return i3;
    })(t2, i2).forEach((e3) => {
      this._queue([27, 42, 33, 255 & t2, t2 >> 8 & 255, e3, 10]);
    }), this._queue([27, 50])), "raster" == this._options.imageMode && this._queue([29, 118, 48, 0, t2 >> 3 & 255, t2 >> 3 >> 8 & 255, 255 & i2, i2 >> 8 & 255, h2(t2, i2)]), this._flush(), this;
  }
  cut(e2) {
    if (this._embedded)
      throw new Error("Cut is not supported in table cells or boxes");
    let t2 = 0;
    return "partial" == e2 && (t2 = 1), this._queue([29, 86, t2]), this;
  }
  pulse(e2, t2, i2) {
    if (this._embedded)
      throw new Error("Pulse is not supported in table cells or boxes");
    return void 0 === e2 && (e2 = 0), void 0 === t2 && (t2 = 100), void 0 === i2 && (i2 = 500), t2 = Math.min(500, Math.round(t2 / 2)), i2 = Math.min(500, Math.round(i2 / 2)), this._queue([27, 112, e2 ? 1 : 0, 255 & t2, 255 & i2]), this;
  }
  raw(e2) {
    return this._queue(e2), this;
  }
  encode() {
    this._flush();
    let e2 = 0;
    this._buffer.forEach((t3) => {
      "number" == typeof t3 ? e2++ : e2 += t3.length;
    });
    const t2 = new Uint8Array(e2);
    let i2 = 0;
    return this._buffer.forEach((e3) => {
      "number" == typeof e3 ? (t2[i2] = e3, i2++) : (t2.set(e3, i2), i2 += e3.length);
    }), this._reset(), t2;
  }
}
const k = { star: { cp437: 1, cp858: 4, cp852: 5, cp860: 6, cp861: 7, cp863: 8, cp865: 9, cp866: 10, cp855: 11, cp857: 12, cp862: 13, cp864: 14, cp737: 15, cp869: 17, cp874: 20, windows1252: 32, windows1250: 33, windows1251: 34 } };
class q {
  constructor(e2) {
    this._reset(e2);
  }
  _reset(e2) {
    this._options = Object.assign({ width: null, embedded: false, wordWrap: true, codepageMapping: "star", codepageCandidates: ["cp437", "cp858", "cp860", "cp861", "cp863", "cp865", "cp852", "cp857", "cp855", "cp866", "cp869"] }, e2), this._embedded = this._options.width && this._options.embedded, this._buffer = [], this._queued = [], this._cursor = 0, this._codepage = "ascii", this._state = { codepage: 0, align: "left", bold: false, italic: false, underline: false, invert: false, width: 1, height: 1 };
  }
  _encode(e2) {
    if ("auto" != this._codepage)
      return m.encode(e2, this._codepage);
    let t2;
    t2 = "string" == typeof this._options.codepageMapping ? k[this._options.codepageMapping] : this._options.codepageMapping;
    const i2 = m.autoEncode(e2, this._options.codepageCandidates);
    let s2 = 0;
    for (let e3 = 0; e3 < i2.length; e3++)
      s2 += 4 + i2[e3].bytes.byteLength;
    const n2 = new Uint8Array(s2);
    let r2 = 0;
    for (let e3 = 0; e3 < i2.length; e3++)
      n2.set([27, 29, 116, t2[i2[e3].codepage]], r2), n2.set(i2[e3].bytes, r2 + 4), r2 += 4 + i2[e3].bytes.byteLength, this._state.codepage = t2[i2[e3].codepage];
    return n2;
  }
  _queue(e2) {
    e2.forEach((e3) => this._queued.push(e3));
  }
  _flush() {
    if (this._embedded) {
      let e2 = this._options.width - this._cursor;
      if ("left" == this._state.align && this._queued.push(new Array(e2).fill(32)), "center" == this._state.align) {
        const t2 = e2 % 2;
        e2 >>= 1, e2 > 0 && this._queued.push(new Array(e2).fill(32)), e2 + t2 > 0 && this._queued.unshift(new Array(e2 + t2).fill(32));
      }
      "right" == this._state.align && this._queued.unshift(new Array(e2).fill(32));
    }
    this._buffer = this._buffer.concat(this._queued), this._queued = [], this._cursor = 0;
  }
  _wrap(e2, t2) {
    if (t2 || this._options.wordWrap && this._options.width) {
      const i2 = "-".repeat(this._cursor);
      return u(t2 || this._options.width, { lineBreak: "\n", whitespace: "all" })(i2 + e2).substring(this._cursor).split("\n");
    }
    return [e2];
  }
  _restoreState() {
    this.bold(this._state.bold), this.italic(this._state.italic), this.underline(this._state.underline), this.invert(this._state.invert), this._queue([27, 29, 116, this._state.codepage]);
  }
  _getCodepageIdentifier(e2) {
    let t2;
    return t2 = "string" == typeof this._options.codepageMapping ? k[this._options.codepageMapping] : this._options.codepageMapping, t2[e2];
  }
  initialize() {
    return this._queue([27, 64, 24]), this._flush(), this;
  }
  codepage(e2) {
    if ("auto" === e2)
      return this._codepage = e2, this;
    if (!m.supports(e2))
      throw new Error("Unknown codepage");
    let t2;
    if (t2 = "string" == typeof this._options.codepageMapping ? k[this._options.codepageMapping] : this._options.codepageMapping, void 0 === t2[e2])
      throw new Error("Codepage not supported by printer");
    return this._codepage = e2, this._state.codepage = t2[e2], this._queue([27, 29, 116, t2[e2]]), this;
  }
  text(e2, t2) {
    const i2 = this._wrap(e2, t2);
    for (let e3 = 0; e3 < i2.length; e3++) {
      const t3 = this._encode(i2[e3]);
      this._queue([t3]), this._cursor += i2[e3].length * this._state.width, this._options.width && !this._embedded && (this._cursor = this._cursor % this._options.width), e3 < i2.length - 1 && this.newline();
    }
    return this;
  }
  newline() {
    return this._flush(), this._queue([10, 13]), this._embedded && this._restoreState(), this;
  }
  line(e2, t2) {
    return this.text(e2, t2), this.newline(), this;
  }
  underline(e2) {
    return void 0 === e2 && (e2 = !this._state.underline), this._state.underline = e2, this._queue([27, 45, Number(e2)]), this;
  }
  italic(e2) {
    return this;
  }
  bold(e2) {
    return void 0 === e2 && (e2 = !this._state.bold), this._state.bold = e2, e2 ? this._queue([27, 69]) : this._queue([27, 70]), this;
  }
  width(e2) {
    if (void 0 === e2 && (e2 = 1), "number" != typeof e2)
      throw new Error("Width must be a number");
    if (e2 < 1 || e2 > 6)
      throw new Error("Width must be between 1 and 6");
    return this._state.width = e2, this._queue([27, 105, this._state.height - 1, this._state.width - 1]), this;
  }
  height(e2) {
    if (void 0 === e2 && (e2 = 1), "number" != typeof e2)
      throw new Error("Height must be a number");
    if (e2 < 1 || e2 > 6)
      throw new Error("Height must be between 1 and 6");
    return this._state.height = e2, this._queue([27, 105, this._state.height - 1, this._state.width - 1]), this;
  }
  invert(e2) {
    return void 0 === e2 && (e2 = !this._state.invert), this._state.invert = e2, this._queue([27, e2 ? 52 : 53]), this;
  }
  size(e2) {
    return e2 = "smaller" === e2 ? 2 : "small" === e2 ? 1 : 0, this._queue([27, 30, 70, e2]), this;
  }
  align(e2) {
    const t2 = { left: 0, center: 1, right: 2 };
    if (!(e2 in t2))
      throw new Error("Unknown alignment");
    return this._state.align = e2, this._embedded || this._queue([27, 29, 97, t2[e2]]), this;
  }
  table(e2, t2) {
    0 != this._cursor && this.newline();
    for (let i2 = 0; i2 < t2.length; i2++) {
      const s2 = [];
      let n2 = 0;
      for (let r2 = 0; r2 < e2.length; r2++) {
        const a2 = [];
        if ("string" == typeof t2[i2][r2]) {
          const s3 = u(e2[r2].width, { lineBreak: "\n" })(t2[i2][r2]).split("\n");
          for (let t3 = 0; t3 < s3.length; t3++)
            "right" == e2[r2].align ? a2[t3] = this._encode(s3[t3].padStart(e2[r2].width)) : a2[t3] = this._encode(s3[t3].padEnd(e2[r2].width));
        }
        if ("function" == typeof t2[i2][r2]) {
          const s3 = new q(Object.assign({}, this._options, { width: e2[r2].width, embedded: true }));
          s3._codepage = this._codepage, s3.align(e2[r2].align), t2[i2][r2](s3);
          const n3 = s3.encode();
          let o2 = [];
          for (let e3 = 0; e3 < n3.byteLength; e3++)
            e3 < n3.byteLength - 1 && 10 === n3[e3] && 13 === n3[e3 + 1] ? (a2.push(o2), o2 = [], e3++) : o2.push(n3[e3]);
          o2.length && a2.push(o2);
        }
        n2 = Math.max(n2, a2.length), s2[r2] = a2;
      }
      for (let t3 = 0; t3 < e2.length; t3++)
        if (s2[t3].length < n2)
          for (let i3 = s2[t3].length; i3 < n2; i3++) {
            let i4 = "top";
            void 0 !== e2[t3].verticalAlign && (i4 = e2[t3].verticalAlign), "bottom" == i4 ? s2[t3].unshift(new Array(e2[t3].width).fill(32)) : s2[t3].push(new Array(e2[t3].width).fill(32));
          }
      for (let t3 = 0; t3 < n2; t3++) {
        for (let i3 = 0; i3 < e2.length; i3++)
          void 0 !== e2[i3].marginLeft && this.raw(new Array(e2[i3].marginLeft).fill(32)), this.raw(s2[i3][t3]), void 0 !== e2[i3].marginRight && this.raw(new Array(e2[i3].marginRight).fill(32));
        this.newline();
      }
    }
    return this;
  }
  rule(e2) {
    return e2 = Object.assign({ style: "single", width: this._options.width || 10 }, e2 || {}), this._queue([27, 29, 116, this._getCodepageIdentifier("cp437"), new Array(e2.width).fill("double" === e2.style ? 205 : 196)]), this._queue([27, 29, 116, this._state.codepage]), this.newline(), this;
  }
  box(e2, t2) {
    let i2;
    i2 = "double" == (e2 = Object.assign({ style: "single", width: this._options.width || 30, marginLeft: 0, marginRight: 0, paddingLeft: 0, paddingRight: 0 }, e2 || {})).style ? [201, 187, 200, 188, 205, 186] : [218, 191, 192, 217, 196, 179], 0 != this._cursor && this.newline(), this._restoreState(), this._queue([27, 29, 116, this._getCodepageIdentifier("cp437")]), this._queue([new Array(e2.marginLeft).fill(32), i2[0], new Array(e2.width - 2).fill(i2[4]), i2[1], new Array(e2.marginRight).fill(32)]), this.newline();
    const s2 = [];
    if ("string" == typeof t2) {
      const i3 = u(e2.width - 2 - e2.paddingLeft - e2.paddingRight, { lineBreak: "\n" })(t2).split("\n");
      for (let t3 = 0; t3 < i3.length; t3++)
        "right" == e2.align ? s2[t3] = this._encode(i3[t3].padStart(e2.width - 2 - e2.paddingLeft - e2.paddingRight)) : s2[t3] = this._encode(i3[t3].padEnd(e2.width - 2 - e2.paddingLeft - e2.paddingRight));
    }
    if ("function" == typeof t2) {
      const i3 = new q(Object.assign({}, this._options, { width: e2.width - 2 - e2.paddingLeft - e2.paddingRight, embedded: true }));
      i3._codepage = this._codepage, i3.align(e2.align), t2(i3);
      const n2 = i3.encode();
      let r2 = [];
      for (let e3 = 0; e3 < n2.byteLength; e3++)
        e3 < n2.byteLength - 1 && 10 === n2[e3] && 13 === n2[e3 + 1] ? (s2.push(r2), r2 = [], e3++) : r2.push(n2[e3]);
      r2.length && s2.push(r2);
    }
    for (let t3 = 0; t3 < s2.length; t3++)
      this._queue([new Array(e2.marginLeft).fill(32), i2[5], new Array(e2.paddingLeft).fill(32)]), this._queue([s2[t3]]), this._restoreState(), this._queue([27, 29, 116, this._getCodepageIdentifier("cp437")]), this._queue([new Array(e2.paddingRight).fill(32), i2[5], new Array(e2.marginRight).fill(32)]), this.newline();
    return this._queue([new Array(e2.marginLeft).fill(32), i2[2], new Array(e2.width - 2).fill(i2[4]), i2[3], new Array(e2.marginRight).fill(32)]), this._restoreState(), this.newline(), this;
  }
  barcode(e2, t2, i2) {
    if (this._embedded)
      throw new Error("Barcodes are not supported in table cells or boxes");
    const s2 = { upce: 0, upca: 1, ean8: 2, ean13: 3, code39: 4, itf: 5, code128: 6, code93: 7, "nw-7": 8, "gs1-128": 9, "gs1-databar-omni": 10, "gs1-databar-truncated": 11, "gs1-databar-limited": 12, "gs1-databar-expanded": 13 };
    if (!(t2 in s2))
      throw new Error("Symbology not supported by printer");
    {
      const n2 = m.encode(e2, "ascii");
      this._queue([27, 98, s2[t2], 1, 3, i2, n2, 30]);
    }
    return this._flush(), this;
  }
  qrcode(e2, t2, i2, s2) {
    if (this._embedded)
      throw new Error("QR codes are not supported in table cells or boxes");
    this._queue([10]);
    const n2 = { 1: 1, 2: 2 };
    if (void 0 === t2 && (t2 = 2), !(t2 in n2))
      throw new Error("Model must be 1 or 2");
    if (this._queue([27, 29, 121, 83, 48, n2[t2]]), void 0 === i2 && (i2 = 6), "number" != typeof i2)
      throw new Error("Size must be a number");
    if (i2 < 1 || i2 > 8)
      throw new Error("Size must be between 1 and 8");
    this._queue([27, 29, 121, 83, 50, i2]);
    const r2 = { l: 0, m: 1, q: 2, h: 3 };
    if (void 0 === s2 && (s2 = "m"), !(s2 in r2))
      throw new Error("Error level must be l, m, q or h");
    this._queue([27, 29, 121, 83, 49, r2[s2]]);
    const a2 = m.encode(e2, "iso88591"), o2 = a2.length;
    return this._queue([27, 29, 121, 68, 49, 0, o2 % 255, o2 / 255, a2]), this._queue([27, 29, 121, 80]), this._flush(), this;
  }
  image(e2, t2, i2, s2, n2) {
    if (this._embedded)
      throw new Error("Images are not supported in table cells or boxes");
    if (t2 % 8 != 0)
      throw new Error("Width must be a multiple of 8");
    if (i2 % 24 != 0)
      throw new Error("Height must be a multiple of 24");
    void 0 === s2 && (s2 = "threshold"), void 0 === n2 && (n2 = 128);
    const r2 = g(t2, i2).getContext("2d");
    r2.drawImage(e2, 0, 0, t2, i2);
    let a2 = r2.getImageData(0, 0, t2, i2);
    switch (a2 = w.flatten(a2, [255, 255, 255]), s2) {
      case "threshold":
        a2 = f.threshold(a2, n2);
        break;
      case "bayer":
        a2 = f.bayer(a2, n2);
        break;
      case "floydsteinberg":
        a2 = f.floydsteinberg(a2);
        break;
      case "atkinson":
        a2 = f.atkinson(a2);
    }
    const o2 = (e3, i3) => a2.data[4 * (t2 * i3 + e3)] > 0 ? 0 : 1;
    this._queue([27, 48]);
    for (let e3 = 0; e3 < i2 / 24; e3++) {
      const i3 = 24 * e3, s3 = new Uint8Array(3 * t2);
      for (let e4 = 0; e4 < t2; e4++) {
        const t3 = 3 * e4;
        s3[t3] = o2(e4, i3 + 0) << 7 | o2(e4, i3 + 1) << 6 | o2(e4, i3 + 2) << 5 | o2(e4, i3 + 3) << 4 | o2(e4, i3 + 4) << 3 | o2(e4, i3 + 5) << 2 | o2(e4, i3 + 6) << 1 | o2(e4, i3 + 7), s3[t3 + 1] = o2(e4, i3 + 8) << 7 | o2(e4, i3 + 9) << 6 | o2(e4, i3 + 10) << 5 | o2(e4, i3 + 11) << 4 | o2(e4, i3 + 12) << 3 | o2(e4, i3 + 13) << 2 | o2(e4, i3 + 14) << 1 | o2(e4, i3 + 15), s3[t3 + 2] = o2(e4, i3 + 16) << 7 | o2(e4, i3 + 17) << 6 | o2(e4, i3 + 18) << 5 | o2(e4, i3 + 19) << 4 | o2(e4, i3 + 20) << 3 | o2(e4, i3 + 21) << 2 | o2(e4, i3 + 22) << 1 | o2(e4, i3 + 23);
      }
      this._queue([27, 88, 255 & t2, t2 >> 8 & 255, s3, 10, 13]);
    }
    return this._queue([27, 122, 1]), this._flush(), this;
  }
  cut(e2) {
    if (this._embedded)
      throw new Error("Cut is not supported in table cells or boxes");
    let t2 = 0;
    return "partial" == e2 && (t2 = 1), this._queue([27, 100, t2]), this;
  }
  pulse(e2, t2, i2) {
    if (this._embedded)
      throw new Error("Pulse is not supported in table cells or boxes");
    return void 0 === e2 && (e2 = 0), void 0 === t2 && (t2 = 200), void 0 === i2 && (i2 = 200), t2 = Math.min(127, Math.round(t2 / 10)), i2 = Math.min(127, Math.round(i2 / 10)), this._queue([27, 7, 255 & t2, 255 & i2, e2 ? 26 : 7]), this;
  }
  raw(e2) {
    return this._queue(e2), this;
  }
  encode() {
    this._flush();
    let e2 = 0;
    this._buffer.forEach((t3) => {
      "number" == typeof t3 ? e2++ : e2 += t3.length;
    });
    const t2 = new Uint8Array(e2);
    let i2 = 0;
    return this._buffer.forEach((e3) => {
      "number" == typeof e3 ? (t2[i2] = e3, i2++) : (t2.set(e3, i2), i2 += e3.length);
    }), this._reset(), t2;
  }
}
class E {
  constructor(e2) {
    const t2 = { "esc-pos": v, "star-prnt": q };
    if (void 0 === e2 || void 0 === e2.language)
      throw new Error("You need to specify the language of the thermal printer");
    if (void 0 === t2[e2.language])
      throw new Error("Language not supported by this library");
    this.language = e2.language;
    const i2 = t2[this.language].prototype;
    Object.getOwnPropertyNames(i2).forEach((e3) => {
      this[e3] = i2[e3];
    }), this._reset(e2);
  }
}
export {
  E
};
