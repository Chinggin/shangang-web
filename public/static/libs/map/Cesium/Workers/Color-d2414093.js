define([
  'exports',
  './RuntimeError-ffe03243',
  './when-229515d6',
  './Transforms-7cd3197b',
  './ComponentDatatype-17b06483',
], function (e, r, o, t, f) {
  'use strict';
  function s(e, r, o) {
    return (
      o < 0 && (o += 1),
      o > 1 && (o -= 1),
      6 * o < 1
        ? e + 6 * (r - e) * o
        : 2 * o < 1
        ? r
        : 3 * o < 2
        ? e + (r - e) * (2 / 3 - o) * 6
        : e
    );
  }
  function n(e, r, t, f) {
    (this.red = o.defaultValue(e, 1)),
      (this.green = o.defaultValue(r, 1)),
      (this.blue = o.defaultValue(t, 1)),
      (this.alpha = o.defaultValue(f, 1));
  }
  var l, C, a;
  (n.fromCartesian4 = function (e, r) {
    return o.defined(r)
      ? ((r.red = e.x), (r.green = e.y), (r.blue = e.z), (r.alpha = e.w), r)
      : new n(e.x, e.y, e.z, e.w);
  }),
    (n.fromBytes = function (e, r, t, f, s) {
      return (
        (e = n.byteToFloat(o.defaultValue(e, 255))),
        (r = n.byteToFloat(o.defaultValue(r, 255))),
        (t = n.byteToFloat(o.defaultValue(t, 255))),
        (f = n.byteToFloat(o.defaultValue(f, 255))),
        o.defined(s)
          ? ((s.red = e), (s.green = r), (s.blue = t), (s.alpha = f), s)
          : new n(e, r, t, f)
      );
    }),
    (n.fromAlpha = function (e, r, t) {
      return o.defined(t)
        ? ((t.red = e.red), (t.green = e.green), (t.blue = e.blue), (t.alpha = r), t)
        : new n(e.red, e.green, e.blue, r);
    }),
    t.FeatureDetection.supportsTypedArrays() &&
      ((l = new ArrayBuffer(4)), (C = new Uint32Array(l)), (a = new Uint8Array(l))),
    (n.fromRgba = function (e, r) {
      return (C[0] = e), n.fromBytes(a[0], a[1], a[2], a[3], r);
    }),
    (n.fromHsl = function (e, r, t, f, l) {
      (e = o.defaultValue(e, 0) % 1),
        (r = o.defaultValue(r, 0)),
        (t = o.defaultValue(t, 0)),
        (f = o.defaultValue(f, 1));
      var C = t,
        a = t,
        i = t;
      if (0 !== r) {
        var E,
          u = 2 * t - (E = t < 0.5 ? t * (1 + r) : t + r - t * r);
        (C = s(u, E, e + 1 / 3)), (a = s(u, E, e)), (i = s(u, E, e - 1 / 3));
      }
      return o.defined(l)
        ? ((l.red = C), (l.green = a), (l.blue = i), (l.alpha = f), l)
        : new n(C, a, i, f);
    }),
    (n.fromRandom = function (e, r) {
      var t = (e = o.defaultValue(e, o.defaultValue.EMPTY_OBJECT)).red;
      if (!o.defined(t)) {
        var s = o.defaultValue(e.minimumRed, 0),
          l = o.defaultValue(e.maximumRed, 1);
        t = s + f.CesiumMath.nextRandomNumber() * (l - s);
      }
      var C = e.green;
      if (!o.defined(C)) {
        var a = o.defaultValue(e.minimumGreen, 0),
          i = o.defaultValue(e.maximumGreen, 1);
        C = a + f.CesiumMath.nextRandomNumber() * (i - a);
      }
      var E = e.blue;
      if (!o.defined(E)) {
        var u = o.defaultValue(e.minimumBlue, 0),
          b = o.defaultValue(e.maximumBlue, 1);
        E = u + f.CesiumMath.nextRandomNumber() * (b - u);
      }
      var O = e.alpha;
      if (!o.defined(O)) {
        var g = o.defaultValue(e.minimumAlpha, 0),
          S = o.defaultValue(e.maximumAlpha, 1);
        O = g + f.CesiumMath.nextRandomNumber() * (S - g);
      }
      return o.defined(r)
        ? ((r.red = t), (r.green = C), (r.blue = E), (r.alpha = O), r)
        : new n(t, C, E, O);
    });
  var i = /^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?$/i,
    E = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i,
    u = /^rgba?\(\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)(?:\s*,\s*([0-9.]+))?\s*\)$/i,
    b = /^hsla?\(\s*([0-9.]+)\s*,\s*([0-9.]+%)\s*,\s*([0-9.]+%)(?:\s*,\s*([0-9.]+))?\s*\)$/i;
  (n.fromCssColorString = function (e, r) {
    o.defined(r) || (r = new n());
    var t = n[(e = e.replace(/\s/g, '')).toUpperCase()];
    if (o.defined(t)) return n.clone(t, r), r;
    var f = i.exec(e);
    return null !== f
      ? ((r.red = parseInt(f[1], 16) / 15),
        (r.green = parseInt(f[2], 16) / 15),
        (r.blue = parseInt(f[3], 16) / 15),
        (r.alpha = parseInt(o.defaultValue(f[4], 'f'), 16) / 15),
        r)
      : null !== (f = E.exec(e))
      ? ((r.red = parseInt(f[1], 16) / 255),
        (r.green = parseInt(f[2], 16) / 255),
        (r.blue = parseInt(f[3], 16) / 255),
        (r.alpha = parseInt(o.defaultValue(f[4], 'ff'), 16) / 255),
        r)
      : null !== (f = u.exec(e))
      ? ((r.red = parseFloat(f[1]) / ('%' === f[1].substr(-1) ? 100 : 255)),
        (r.green = parseFloat(f[2]) / ('%' === f[2].substr(-1) ? 100 : 255)),
        (r.blue = parseFloat(f[3]) / ('%' === f[3].substr(-1) ? 100 : 255)),
        (r.alpha = parseFloat(o.defaultValue(f[4], '1.0'))),
        r)
      : null !== (f = b.exec(e))
      ? n.fromHsl(
          parseFloat(f[1]) / 360,
          parseFloat(f[2]) / 100,
          parseFloat(f[3]) / 100,
          parseFloat(o.defaultValue(f[4], '1.0')),
          r
        )
      : (r = void 0);
  }),
    (n.packedLength = 4),
    (n.pack = function (e, r, t) {
      return (
        (t = o.defaultValue(t, 0)),
        (r[t++] = e.red),
        (r[t++] = e.green),
        (r[t++] = e.blue),
        (r[t] = e.alpha),
        r
      );
    }),
    (n.unpack = function (e, r, t) {
      return (
        (r = o.defaultValue(r, 0)),
        o.defined(t) || (t = new n()),
        (t.red = e[r++]),
        (t.green = e[r++]),
        (t.blue = e[r++]),
        (t.alpha = e[r]),
        t
      );
    }),
    (n.byteToFloat = function (e) {
      return e / 255;
    }),
    (n.floatToByte = function (e) {
      return 1 === e ? 255 : (256 * e) | 0;
    }),
    (n.clone = function (e, r) {
      if (o.defined(e))
        return o.defined(r)
          ? ((r.red = e.red), (r.green = e.green), (r.blue = e.blue), (r.alpha = e.alpha), r)
          : new n(e.red, e.green, e.blue, e.alpha);
    }),
    (n.equals = function (e, r) {
      return (
        e === r ||
        (o.defined(e) &&
          o.defined(r) &&
          e.red === r.red &&
          e.green === r.green &&
          e.blue === r.blue &&
          e.alpha === r.alpha)
      );
    }),
    (n.equalsArray = function (e, r, o) {
      return e.red === r[o] && e.green === r[o + 1] && e.blue === r[o + 2] && e.alpha === r[o + 3];
    }),
    (n.prototype.clone = function (e) {
      return n.clone(this, e);
    }),
    (n.prototype.equals = function (e) {
      return n.equals(this, e);
    }),
    (n.prototype.equalsEpsilon = function (e, r) {
      return (
        this === e ||
        (o.defined(e) &&
          Math.abs(this.red - e.red) <= r &&
          Math.abs(this.green - e.green) <= r &&
          Math.abs(this.blue - e.blue) <= r &&
          Math.abs(this.alpha - e.alpha) <= r)
      );
    }),
    (n.prototype.toString = function () {
      return '(' + this.red + ', ' + this.green + ', ' + this.blue + ', ' + this.alpha + ')';
    }),
    (n.prototype.toCssColorString = function () {
      var e = n.floatToByte(this.red),
        r = n.floatToByte(this.green),
        o = n.floatToByte(this.blue);
      return 1 === this.alpha
        ? 'rgb(' + e + ',' + r + ',' + o + ')'
        : 'rgba(' + e + ',' + r + ',' + o + ',' + this.alpha + ')';
    }),
    (n.prototype.toCssHexString = function () {
      var e = n.floatToByte(this.red).toString(16);
      e.length < 2 && (e = '0' + e);
      var r = n.floatToByte(this.green).toString(16);
      r.length < 2 && (r = '0' + r);
      var o = n.floatToByte(this.blue).toString(16);
      if ((o.length < 2 && (o = '0' + o), this.alpha < 1)) {
        var t = n.floatToByte(this.alpha).toString(16);
        return t.length < 2 && (t = '0' + t), '#' + e + r + o + t;
      }
      return '#' + e + r + o;
    }),
    (n.prototype.toBytes = function (e) {
      var r = n.floatToByte(this.red),
        t = n.floatToByte(this.green),
        f = n.floatToByte(this.blue),
        s = n.floatToByte(this.alpha);
      return o.defined(e) ? ((e[0] = r), (e[1] = t), (e[2] = f), (e[3] = s), e) : [r, t, f, s];
    }),
    (n.prototype.toRgba = function () {
      return (
        (a[0] = n.floatToByte(this.red)),
        (a[1] = n.floatToByte(this.green)),
        (a[2] = n.floatToByte(this.blue)),
        (a[3] = n.floatToByte(this.alpha)),
        C[0]
      );
    }),
    (n.prototype.brighten = function (e, r) {
      return (
        (e = 1 - e),
        (r.red = 1 - (1 - this.red) * e),
        (r.green = 1 - (1 - this.green) * e),
        (r.blue = 1 - (1 - this.blue) * e),
        (r.alpha = this.alpha),
        r
      );
    }),
    (n.prototype.darken = function (e, r) {
      return (
        (e = 1 - e),
        (r.red = this.red * e),
        (r.green = this.green * e),
        (r.blue = this.blue * e),
        (r.alpha = this.alpha),
        r
      );
    }),
    (n.prototype.withAlpha = function (e, r) {
      return n.fromAlpha(this, e, r);
    }),
    (n.add = function (e, r, o) {
      return (
        (o.red = e.red + r.red),
        (o.green = e.green + r.green),
        (o.blue = e.blue + r.blue),
        (o.alpha = e.alpha + r.alpha),
        o
      );
    }),
    (n.subtract = function (e, r, o) {
      return (
        (o.red = e.red - r.red),
        (o.green = e.green - r.green),
        (o.blue = e.blue - r.blue),
        (o.alpha = e.alpha - r.alpha),
        o
      );
    }),
    (n.multiply = function (e, r, o) {
      return (
        (o.red = e.red * r.red),
        (o.green = e.green * r.green),
        (o.blue = e.blue * r.blue),
        (o.alpha = e.alpha * r.alpha),
        o
      );
    }),
    (n.divide = function (e, r, o) {
      return (
        (o.red = e.red / r.red),
        (o.green = e.green / r.green),
        (o.blue = e.blue / r.blue),
        (o.alpha = e.alpha / r.alpha),
        o
      );
    }),
    (n.mod = function (e, r, o) {
      return (
        (o.red = e.red % r.red),
        (o.green = e.green % r.green),
        (o.blue = e.blue % r.blue),
        (o.alpha = e.alpha % r.alpha),
        o
      );
    }),
    (n.lerp = function (e, r, o, t) {
      return (
        (t.red = f.CesiumMath.lerp(e.red, r.red, o)),
        (t.green = f.CesiumMath.lerp(e.green, r.green, o)),
        (t.blue = f.CesiumMath.lerp(e.blue, r.blue, o)),
        (t.alpha = f.CesiumMath.lerp(e.alpha, r.alpha, o)),
        t
      );
    }),
    (n.multiplyByScalar = function (e, r, o) {
      return (
        (o.red = e.red * r),
        (o.green = e.green * r),
        (o.blue = e.blue * r),
        (o.alpha = e.alpha * r),
        o
      );
    }),
    (n.divideByScalar = function (e, r, o) {
      return (
        (o.red = e.red / r),
        (o.green = e.green / r),
        (o.blue = e.blue / r),
        (o.alpha = e.alpha / r),
        o
      );
    }),
    (n.ALICEBLUE = Object.freeze(n.fromCssColorString('#F0F8FF'))),
    (n.ANTIQUEWHITE = Object.freeze(n.fromCssColorString('#FAEBD7'))),
    (n.AQUA = Object.freeze(n.fromCssColorString('#00FFFF'))),
    (n.AQUAMARINE = Object.freeze(n.fromCssColorString('#7FFFD4'))),
    (n.AZURE = Object.freeze(n.fromCssColorString('#F0FFFF'))),
    (n.BEIGE = Object.freeze(n.fromCssColorString('#F5F5DC'))),
    (n.BISQUE = Object.freeze(n.fromCssColorString('#FFE4C4'))),
    (n.BLACK = Object.freeze(n.fromCssColorString('#000000'))),
    (n.BLANCHEDALMOND = Object.freeze(n.fromCssColorString('#FFEBCD'))),
    (n.BLUE = Object.freeze(n.fromCssColorString('#0000FF'))),
    (n.BLUEVIOLET = Object.freeze(n.fromCssColorString('#8A2BE2'))),
    (n.BROWN = Object.freeze(n.fromCssColorString('#A52A2A'))),
    (n.BURLYWOOD = Object.freeze(n.fromCssColorString('#DEB887'))),
    (n.CADETBLUE = Object.freeze(n.fromCssColorString('#5F9EA0'))),
    (n.CHARTREUSE = Object.freeze(n.fromCssColorString('#7FFF00'))),
    (n.CHOCOLATE = Object.freeze(n.fromCssColorString('#D2691E'))),
    (n.CORAL = Object.freeze(n.fromCssColorString('#FF7F50'))),
    (n.CORNFLOWERBLUE = Object.freeze(n.fromCssColorString('#6495ED'))),
    (n.CORNSILK = Object.freeze(n.fromCssColorString('#FFF8DC'))),
    (n.CRIMSON = Object.freeze(n.fromCssColorString('#DC143C'))),
    (n.CYAN = Object.freeze(n.fromCssColorString('#00FFFF'))),
    (n.DARKBLUE = Object.freeze(n.fromCssColorString('#00008B'))),
    (n.DARKCYAN = Object.freeze(n.fromCssColorString('#008B8B'))),
    (n.DARKGOLDENROD = Object.freeze(n.fromCssColorString('#B8860B'))),
    (n.DARKGRAY = Object.freeze(n.fromCssColorString('#A9A9A9'))),
    (n.DARKGREEN = Object.freeze(n.fromCssColorString('#006400'))),
    (n.DARKGREY = n.DARKGRAY),
    (n.DARKKHAKI = Object.freeze(n.fromCssColorString('#BDB76B'))),
    (n.DARKMAGENTA = Object.freeze(n.fromCssColorString('#8B008B'))),
    (n.DARKOLIVEGREEN = Object.freeze(n.fromCssColorString('#556B2F'))),
    (n.DARKORANGE = Object.freeze(n.fromCssColorString('#FF8C00'))),
    (n.DARKORCHID = Object.freeze(n.fromCssColorString('#9932CC'))),
    (n.DARKRED = Object.freeze(n.fromCssColorString('#8B0000'))),
    (n.DARKSALMON = Object.freeze(n.fromCssColorString('#E9967A'))),
    (n.DARKSEAGREEN = Object.freeze(n.fromCssColorString('#8FBC8F'))),
    (n.DARKSLATEBLUE = Object.freeze(n.fromCssColorString('#483D8B'))),
    (n.DARKSLATEGRAY = Object.freeze(n.fromCssColorString('#2F4F4F'))),
    (n.DARKSLATEGREY = n.DARKSLATEGRAY),
    (n.DARKTURQUOISE = Object.freeze(n.fromCssColorString('#00CED1'))),
    (n.DARKVIOLET = Object.freeze(n.fromCssColorString('#9400D3'))),
    (n.DEEPPINK = Object.freeze(n.fromCssColorString('#FF1493'))),
    (n.DEEPSKYBLUE = Object.freeze(n.fromCssColorString('#00BFFF'))),
    (n.DIMGRAY = Object.freeze(n.fromCssColorString('#696969'))),
    (n.DIMGREY = n.DIMGRAY),
    (n.DODGERBLUE = Object.freeze(n.fromCssColorString('#1E90FF'))),
    (n.FIREBRICK = Object.freeze(n.fromCssColorString('#B22222'))),
    (n.FLORALWHITE = Object.freeze(n.fromCssColorString('#FFFAF0'))),
    (n.FORESTGREEN = Object.freeze(n.fromCssColorString('#228B22'))),
    (n.FUCHSIA = Object.freeze(n.fromCssColorString('#FF00FF'))),
    (n.GAINSBORO = Object.freeze(n.fromCssColorString('#DCDCDC'))),
    (n.GHOSTWHITE = Object.freeze(n.fromCssColorString('#F8F8FF'))),
    (n.GOLD = Object.freeze(n.fromCssColorString('#FFD700'))),
    (n.GOLDENROD = Object.freeze(n.fromCssColorString('#DAA520'))),
    (n.GRAY = Object.freeze(n.fromCssColorString('#808080'))),
    (n.GREEN = Object.freeze(n.fromCssColorString('#008000'))),
    (n.GREENYELLOW = Object.freeze(n.fromCssColorString('#ADFF2F'))),
    (n.GREY = n.GRAY),
    (n.HONEYDEW = Object.freeze(n.fromCssColorString('#F0FFF0'))),
    (n.HOTPINK = Object.freeze(n.fromCssColorString('#FF69B4'))),
    (n.INDIANRED = Object.freeze(n.fromCssColorString('#CD5C5C'))),
    (n.INDIGO = Object.freeze(n.fromCssColorString('#4B0082'))),
    (n.IVORY = Object.freeze(n.fromCssColorString('#FFFFF0'))),
    (n.KHAKI = Object.freeze(n.fromCssColorString('#F0E68C'))),
    (n.LAVENDER = Object.freeze(n.fromCssColorString('#E6E6FA'))),
    (n.LAVENDAR_BLUSH = Object.freeze(n.fromCssColorString('#FFF0F5'))),
    (n.LAWNGREEN = Object.freeze(n.fromCssColorString('#7CFC00'))),
    (n.LEMONCHIFFON = Object.freeze(n.fromCssColorString('#FFFACD'))),
    (n.LIGHTBLUE = Object.freeze(n.fromCssColorString('#ADD8E6'))),
    (n.LIGHTCORAL = Object.freeze(n.fromCssColorString('#F08080'))),
    (n.LIGHTCYAN = Object.freeze(n.fromCssColorString('#E0FFFF'))),
    (n.LIGHTGOLDENRODYELLOW = Object.freeze(n.fromCssColorString('#FAFAD2'))),
    (n.LIGHTGRAY = Object.freeze(n.fromCssColorString('#D3D3D3'))),
    (n.LIGHTGREEN = Object.freeze(n.fromCssColorString('#90EE90'))),
    (n.LIGHTGREY = n.LIGHTGRAY),
    (n.LIGHTPINK = Object.freeze(n.fromCssColorString('#FFB6C1'))),
    (n.LIGHTSEAGREEN = Object.freeze(n.fromCssColorString('#20B2AA'))),
    (n.LIGHTSKYBLUE = Object.freeze(n.fromCssColorString('#87CEFA'))),
    (n.LIGHTSLATEGRAY = Object.freeze(n.fromCssColorString('#778899'))),
    (n.LIGHTSLATEGREY = n.LIGHTSLATEGRAY),
    (n.LIGHTSTEELBLUE = Object.freeze(n.fromCssColorString('#B0C4DE'))),
    (n.LIGHTYELLOW = Object.freeze(n.fromCssColorString('#FFFFE0'))),
    (n.LIME = Object.freeze(n.fromCssColorString('#00FF00'))),
    (n.LIMEGREEN = Object.freeze(n.fromCssColorString('#32CD32'))),
    (n.LINEN = Object.freeze(n.fromCssColorString('#FAF0E6'))),
    (n.MAGENTA = Object.freeze(n.fromCssColorString('#FF00FF'))),
    (n.MAROON = Object.freeze(n.fromCssColorString('#800000'))),
    (n.MEDIUMAQUAMARINE = Object.freeze(n.fromCssColorString('#66CDAA'))),
    (n.MEDIUMBLUE = Object.freeze(n.fromCssColorString('#0000CD'))),
    (n.MEDIUMORCHID = Object.freeze(n.fromCssColorString('#BA55D3'))),
    (n.MEDIUMPURPLE = Object.freeze(n.fromCssColorString('#9370DB'))),
    (n.MEDIUMSEAGREEN = Object.freeze(n.fromCssColorString('#3CB371'))),
    (n.MEDIUMSLATEBLUE = Object.freeze(n.fromCssColorString('#7B68EE'))),
    (n.MEDIUMSPRINGGREEN = Object.freeze(n.fromCssColorString('#00FA9A'))),
    (n.MEDIUMTURQUOISE = Object.freeze(n.fromCssColorString('#48D1CC'))),
    (n.MEDIUMVIOLETRED = Object.freeze(n.fromCssColorString('#C71585'))),
    (n.MIDNIGHTBLUE = Object.freeze(n.fromCssColorString('#191970'))),
    (n.MINTCREAM = Object.freeze(n.fromCssColorString('#F5FFFA'))),
    (n.MISTYROSE = Object.freeze(n.fromCssColorString('#FFE4E1'))),
    (n.MOCCASIN = Object.freeze(n.fromCssColorString('#FFE4B5'))),
    (n.NAVAJOWHITE = Object.freeze(n.fromCssColorString('#FFDEAD'))),
    (n.NAVY = Object.freeze(n.fromCssColorString('#000080'))),
    (n.OLDLACE = Object.freeze(n.fromCssColorString('#FDF5E6'))),
    (n.OLIVE = Object.freeze(n.fromCssColorString('#808000'))),
    (n.OLIVEDRAB = Object.freeze(n.fromCssColorString('#6B8E23'))),
    (n.ORANGE = Object.freeze(n.fromCssColorString('#FFA500'))),
    (n.ORANGERED = Object.freeze(n.fromCssColorString('#FF4500'))),
    (n.ORCHID = Object.freeze(n.fromCssColorString('#DA70D6'))),
    (n.PALEGOLDENROD = Object.freeze(n.fromCssColorString('#EEE8AA'))),
    (n.PALEGREEN = Object.freeze(n.fromCssColorString('#98FB98'))),
    (n.PALETURQUOISE = Object.freeze(n.fromCssColorString('#AFEEEE'))),
    (n.PALEVIOLETRED = Object.freeze(n.fromCssColorString('#DB7093'))),
    (n.PAPAYAWHIP = Object.freeze(n.fromCssColorString('#FFEFD5'))),
    (n.PEACHPUFF = Object.freeze(n.fromCssColorString('#FFDAB9'))),
    (n.PERU = Object.freeze(n.fromCssColorString('#CD853F'))),
    (n.PINK = Object.freeze(n.fromCssColorString('#FFC0CB'))),
    (n.PLUM = Object.freeze(n.fromCssColorString('#DDA0DD'))),
    (n.POWDERBLUE = Object.freeze(n.fromCssColorString('#B0E0E6'))),
    (n.PURPLE = Object.freeze(n.fromCssColorString('#800080'))),
    (n.RED = Object.freeze(n.fromCssColorString('#FF0000'))),
    (n.ROSYBROWN = Object.freeze(n.fromCssColorString('#BC8F8F'))),
    (n.ROYALBLUE = Object.freeze(n.fromCssColorString('#4169E1'))),
    (n.SADDLEBROWN = Object.freeze(n.fromCssColorString('#8B4513'))),
    (n.SALMON = Object.freeze(n.fromCssColorString('#FA8072'))),
    (n.SANDYBROWN = Object.freeze(n.fromCssColorString('#F4A460'))),
    (n.SEAGREEN = Object.freeze(n.fromCssColorString('#2E8B57'))),
    (n.SEASHELL = Object.freeze(n.fromCssColorString('#FFF5EE'))),
    (n.SIENNA = Object.freeze(n.fromCssColorString('#A0522D'))),
    (n.SILVER = Object.freeze(n.fromCssColorString('#C0C0C0'))),
    (n.SKYBLUE = Object.freeze(n.fromCssColorString('#87CEEB'))),
    (n.SLATEBLUE = Object.freeze(n.fromCssColorString('#6A5ACD'))),
    (n.SLATEGRAY = Object.freeze(n.fromCssColorString('#708090'))),
    (n.SLATEGREY = n.SLATEGRAY),
    (n.SNOW = Object.freeze(n.fromCssColorString('#FFFAFA'))),
    (n.SPRINGGREEN = Object.freeze(n.fromCssColorString('#00FF7F'))),
    (n.STEELBLUE = Object.freeze(n.fromCssColorString('#4682B4'))),
    (n.TAN = Object.freeze(n.fromCssColorString('#D2B48C'))),
    (n.TEAL = Object.freeze(n.fromCssColorString('#008080'))),
    (n.THISTLE = Object.freeze(n.fromCssColorString('#D8BFD8'))),
    (n.TOMATO = Object.freeze(n.fromCssColorString('#FF6347'))),
    (n.TURQUOISE = Object.freeze(n.fromCssColorString('#40E0D0'))),
    (n.VIOLET = Object.freeze(n.fromCssColorString('#EE82EE'))),
    (n.WHEAT = Object.freeze(n.fromCssColorString('#F5DEB3'))),
    (n.WHITE = Object.freeze(n.fromCssColorString('#FFFFFF'))),
    (n.WHITESMOKE = Object.freeze(n.fromCssColorString('#F5F5F5'))),
    (n.YELLOW = Object.freeze(n.fromCssColorString('#FFFF00'))),
    (n.YELLOWGREEN = Object.freeze(n.fromCssColorString('#9ACD32'))),
    (n.TRANSPARENT = Object.freeze(new n(0, 0, 0, 0))),
    (e.Color = n);
});
