define([
  'exports',
  './Matrix2-f2da41d4',
  './RuntimeError-ffe03243',
  './when-229515d6',
  './ComponentDatatype-17b06483',
], function (t, i, e, a, n) {
  'use strict';
  function s(t, i, e) {
    if (0 === t) return i * e;
    var a = t * t,
      n = a * a,
      s = n * a,
      h = s * a,
      u = h * a,
      r = u * a,
      o = e;
    return (
      i *
      ((1 -
        a / 4 -
        (3 * n) / 64 -
        (5 * s) / 256 -
        (175 * h) / 16384 -
        (441 * u) / 65536 -
        (4851 * r) / 1048576) *
        o -
        ((3 * a) / 8 +
          (3 * n) / 32 +
          (45 * s) / 1024 +
          (105 * h) / 4096 +
          (2205 * u) / 131072 +
          (6237 * r) / 524288) *
          Math.sin(2 * o) +
        ((15 * n) / 256 +
          (45 * s) / 1024 +
          (525 * h) / 16384 +
          (1575 * u) / 65536 +
          (155925 * r) / 8388608) *
          Math.sin(4 * o) -
        ((35 * s) / 3072 + (175 * h) / 12288 + (3675 * u) / 262144 + (13475 * r) / 1048576) *
          Math.sin(6 * o) +
        ((315 * h) / 131072 + (2205 * u) / 524288 + (43659 * r) / 8388608) * Math.sin(8 * o) -
        ((693 * u) / 1310720 + (6237 * r) / 5242880) * Math.sin(10 * o) +
        ((1001 * r) / 8388608) * Math.sin(12 * o))
    );
  }
  function h(t, i) {
    if (0 === t) return Math.log(Math.tan(0.5 * (n.CesiumMath.PI_OVER_TWO + i)));
    var e = t * Math.sin(i);
    return (
      Math.log(Math.tan(0.5 * (n.CesiumMath.PI_OVER_TWO + i))) -
      (t / 2) * Math.log((1 + e) / (1 - e))
    );
  }
  var u = new i.Cartesian3(),
    r = new i.Cartesian3();
  function o(t, e, a, o) {
    i.Cartesian3.normalize(o.cartographicToCartesian(e, r), u),
      i.Cartesian3.normalize(o.cartographicToCartesian(a, r), r);
    var l = o.maximumRadius,
      d = o.minimumRadius,
      M = l * l,
      c = d * d;
    (t._ellipticitySquared = (M - c) / M),
      (t._ellipticity = Math.sqrt(t._ellipticitySquared)),
      (t._start = i.Cartographic.clone(e, t._start)),
      (t._start.height = 0),
      (t._end = i.Cartographic.clone(a, t._end)),
      (t._end.height = 0),
      (t._heading = (function (t, i, e, a, s) {
        var u = h(t._ellipticity, e),
          r = h(t._ellipticity, s);
        return Math.atan2(n.CesiumMath.negativePiToPi(a - i), r - u);
      })(t, e.longitude, e.latitude, a.longitude, a.latitude)),
      (t._distance = (function (t, i, e, a, h, u, r) {
        var o = t._heading,
          l = u - a,
          d = 0;
        if (
          n.CesiumMath.equalsEpsilon(Math.abs(o), n.CesiumMath.PI_OVER_TWO, n.CesiumMath.EPSILON8)
        )
          if (i === e) d = i * Math.cos(h) * n.CesiumMath.negativePiToPi(l);
          else {
            var M = Math.sin(h);
            d =
              (i * Math.cos(h) * n.CesiumMath.negativePiToPi(l)) /
              Math.sqrt(1 - t._ellipticitySquared * M * M);
          }
        else {
          var c = s(t._ellipticity, i, h);
          d = (s(t._ellipticity, i, r) - c) / Math.cos(o);
        }
        return Math.abs(d);
      })(t, o.maximumRadius, o.minimumRadius, e.longitude, e.latitude, a.longitude, a.latitude));
  }
  function l(t, e, u, r, o, l) {
    if (0 === u) return i.Cartographic.clone(t, l);
    var d,
      M,
      c,
      m = o * o;
    if (Math.abs(n.CesiumMath.PI_OVER_TWO - Math.abs(e)) > n.CesiumMath.EPSILON8) {
      M = (function (t, i, e) {
        var a = t / e;
        if (0 === i) return a;
        var n = a * a,
          s = n * a,
          h = s * a,
          u = i * i,
          r = u * u,
          o = r * u,
          l = o * u,
          d = l * u,
          M = d * u,
          c = Math.sin(2 * a),
          m = Math.cos(2 * a),
          g = Math.sin(4 * a),
          _ = Math.cos(4 * a),
          p = Math.sin(6 * a),
          f = Math.cos(6 * a),
          C = Math.sin(8 * a),
          P = Math.cos(8 * a),
          v = Math.sin(10 * a);
        return (
          a +
          (a * u) / 4 +
          (7 * a * r) / 64 +
          (15 * a * o) / 256 +
          (579 * a * l) / 16384 +
          (1515 * a * d) / 65536 +
          (16837 * a * M) / 1048576 +
          ((3 * a * r) / 16 +
            (45 * a * o) / 256 -
            (a * (32 * n - 561) * l) / 4096 -
            (a * (232 * n - 1677) * d) / 16384 +
            (a * (399985 - 90560 * n + 512 * h) * M) / 5242880) *
            m +
          ((21 * a * o) / 256 +
            (483 * a * l) / 4096 -
            (a * (224 * n - 1969) * d) / 16384 -
            (a * (33152 * n - 112599) * M) / 1048576) *
            _ +
          ((151 * a * l) / 4096 +
            (4681 * a * d) / 65536 +
            (1479 * a * M) / 16384 -
            (453 * s * M) / 32768) *
            f +
          ((1097 * a * d) / 65536 + (42783 * a * M) / 1048576) * P +
          ((8011 * a * M) / 1048576) * Math.cos(10 * a) +
          ((3 * u) / 8 +
            (3 * r) / 16 +
            (213 * o) / 2048 -
            (3 * n * o) / 64 +
            (255 * l) / 4096 -
            (33 * n * l) / 512 +
            (20861 * d) / 524288 -
            (33 * n * d) / 512 +
            (h * d) / 1024 +
            (28273 * M) / 1048576 -
            (471 * n * M) / 8192 +
            (9 * h * M) / 4096) *
            c +
          ((21 * r) / 256 +
            (21 * o) / 256 +
            (533 * l) / 8192 -
            (21 * n * l) / 512 +
            (197 * d) / 4096 -
            (315 * n * d) / 4096 +
            (584039 * M) / 16777216 -
            (12517 * n * M) / 131072 +
            (7 * h * M) / 2048) *
            g +
          ((151 * o) / 6144 +
            (151 * l) / 4096 +
            (5019 * d) / 131072 -
            (453 * n * d) / 16384 +
            (26965 * M) / 786432 -
            (8607 * n * M) / 131072) *
            p +
          ((1097 * l) / 131072 +
            (1097 * d) / 65536 +
            (225797 * M) / 10485760 -
            (1097 * n * M) / 65536) *
            C +
          ((8011 * d) / 2621440 + (8011 * M) / 1048576) * v +
          ((293393 * M) / 251658240) * Math.sin(12 * a)
        );
      })(s(o, r, t.latitude) + u * Math.cos(e), o, r);
      var g = h(o, t.latitude),
        _ = h(o, M);
      (c = Math.tan(e) * (_ - g)), (d = n.CesiumMath.negativePiToPi(t.longitude + c));
    } else {
      var p;
      if (((M = t.latitude), 0 === o)) p = r * Math.cos(t.latitude);
      else {
        var f = Math.sin(t.latitude);
        p = (r * Math.cos(t.latitude)) / Math.sqrt(1 - m * f * f);
      }
      (c = u / p),
        (d =
          e > 0
            ? n.CesiumMath.negativePiToPi(t.longitude + c)
            : n.CesiumMath.negativePiToPi(t.longitude - c));
    }
    return a.defined(l)
      ? ((l.longitude = d), (l.latitude = M), (l.height = 0), l)
      : new i.Cartographic(d, M, 0);
  }
  function d(t, e, n) {
    var s = a.defaultValue(n, i.Ellipsoid.WGS84);
    (this._ellipsoid = s),
      (this._start = new i.Cartographic()),
      (this._end = new i.Cartographic()),
      (this._heading = void 0),
      (this._distance = void 0),
      (this._ellipticity = void 0),
      (this._ellipticitySquared = void 0),
      a.defined(t) && a.defined(e) && o(this, t, e, s);
  }
  Object.defineProperties(d.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid;
      },
    },
    surfaceDistance: {
      get: function () {
        return this._distance;
      },
    },
    start: {
      get: function () {
        return this._start;
      },
    },
    end: {
      get: function () {
        return this._end;
      },
    },
    heading: {
      get: function () {
        return this._heading;
      },
    },
  }),
    (d.fromStartHeadingDistance = function (t, e, s, h, u) {
      var r = a.defaultValue(h, i.Ellipsoid.WGS84),
        o = r.maximumRadius,
        M = r.minimumRadius,
        c = o * o,
        m = M * M,
        g = Math.sqrt((c - m) / c),
        _ = l(t, (e = n.CesiumMath.negativePiToPi(e)), s, r.maximumRadius, g);
      return !a.defined(u) || (a.defined(h) && !h.equals(u.ellipsoid))
        ? new d(t, _, r)
        : (u.setEndPoints(t, _), u);
    }),
    (d.prototype.setEndPoints = function (t, i) {
      o(this, t, i, this._ellipsoid);
    }),
    (d.prototype.interpolateUsingFraction = function (t, i) {
      return this.interpolateUsingSurfaceDistance(t * this._distance, i);
    }),
    (d.prototype.interpolateUsingSurfaceDistance = function (t, i) {
      return l(this._start, this._heading, t, this._ellipsoid.maximumRadius, this._ellipticity, i);
    }),
    (d.prototype.findIntersectionWithLongitude = function (t, e) {
      var s = this._ellipticity,
        h = this._heading,
        u = Math.abs(h),
        r = this._start;
      if (
        ((t = n.CesiumMath.negativePiToPi(t)),
        n.CesiumMath.equalsEpsilon(Math.abs(t), Math.PI, n.CesiumMath.EPSILON14) &&
          (t = n.CesiumMath.sign(r.longitude) * Math.PI),
        a.defined(e) || (e = new i.Cartographic()),
        Math.abs(n.CesiumMath.PI_OVER_TWO - u) <= n.CesiumMath.EPSILON8)
      )
        return (e.longitude = t), (e.latitude = r.latitude), (e.height = 0), e;
      if (
        n.CesiumMath.equalsEpsilon(
          Math.abs(n.CesiumMath.PI_OVER_TWO - u),
          n.CesiumMath.PI_OVER_TWO,
          n.CesiumMath.EPSILON8
        )
      ) {
        if (n.CesiumMath.equalsEpsilon(t, r.longitude, n.CesiumMath.EPSILON12)) return;
        return (
          (e.longitude = t),
          (e.latitude = n.CesiumMath.PI_OVER_TWO * n.CesiumMath.sign(n.CesiumMath.PI_OVER_TWO - h)),
          (e.height = 0),
          e
        );
      }
      var o,
        l = r.latitude,
        d = s * Math.sin(l),
        M =
          Math.tan(0.5 * (n.CesiumMath.PI_OVER_TWO + l)) *
          Math.exp((t - r.longitude) / Math.tan(h)),
        c = (1 + d) / (1 - d),
        m = r.latitude;
      do {
        o = m;
        var g = s * Math.sin(o),
          _ = (1 + g) / (1 - g);
        m = 2 * Math.atan(M * Math.pow(_ / c, s / 2)) - n.CesiumMath.PI_OVER_TWO;
      } while (!n.CesiumMath.equalsEpsilon(m, o, n.CesiumMath.EPSILON12));
      return (e.longitude = t), (e.latitude = m), (e.height = 0), e;
    }),
    (d.prototype.findIntersectionWithLatitude = function (t, e) {
      var s = this._ellipticity,
        u = this._heading,
        r = this._start;
      if (
        !n.CesiumMath.equalsEpsilon(Math.abs(u), n.CesiumMath.PI_OVER_TWO, n.CesiumMath.EPSILON8)
      ) {
        var o = h(s, r.latitude),
          l = h(s, t),
          d = Math.tan(u) * (l - o),
          M = n.CesiumMath.negativePiToPi(r.longitude + d);
        return a.defined(e)
          ? ((e.longitude = M), (e.latitude = t), (e.height = 0), e)
          : new i.Cartographic(M, t, 0);
      }
    }),
    (t.EllipsoidRhumbLine = d);
});
