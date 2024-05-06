define([
  'exports',
  './Matrix2-f2da41d4',
  './when-229515d6',
  './RuntimeError-ffe03243',
  './Transforms-7cd3197b',
  './ComponentDatatype-17b06483',
], function (t, n, a, r, e, o) {
  'use strict';
  var s = Math.cos,
    i = Math.sin,
    g = Math.sqrt,
    u = {
      computePosition: function (t, n, r, e, o, u, h) {
        var c = n.radiiSquared,
          C = t.nwCorner,
          l = t.boundingRectangle,
          d = C.latitude - t.granYCos * e + o * t.granXSin,
          S = s(d),
          w = i(d),
          M = c.z * w,
          m = C.longitude + e * t.granYSin + o * t.granXCos,
          X = S * s(m),
          Y = S * i(m),
          f = c.x * X,
          p = c.y * Y,
          v = g(f * X + p * Y + M * w);
        if (((u.x = f / v), (u.y = p / v), (u.z = M / v), r)) {
          var x = t.stNwCorner;
          a.defined(x)
            ? ((d = x.latitude - t.stGranYCos * e + o * t.stGranXSin),
              (m = x.longitude + e * t.stGranYSin + o * t.stGranXCos),
              (h.x = (m - t.stWest) * t.lonScalar),
              (h.y = (d - t.stSouth) * t.latScalar))
            : ((h.x = (m - l.west) * t.lonScalar), (h.y = (d - l.south) * t.latScalar));
        }
      },
    },
    h = new n.Matrix2(),
    c = new n.Cartesian3(),
    C = new n.Cartographic(),
    l = new n.Cartesian3(),
    d = new e.GeographicProjection();
  function S(t, a, r, e, o, s, i) {
    var g = Math.cos(a),
      u = e * g,
      C = r * g,
      S = Math.sin(a),
      w = e * S,
      M = r * S;
    (c = d.project(t, c)), (c = n.Cartesian3.subtract(c, l, c));
    var m = n.Matrix2.fromRotation(a, h);
    (c = n.Matrix2.multiplyByVector(m, c, c)), (c = n.Cartesian3.add(c, l, c)), (s -= 1), (i -= 1);
    var X = (t = d.unproject(c, t)).latitude,
      Y = X + s * M,
      f = X - u * i,
      p = X - u * i + s * M,
      v = Math.max(X, Y, f, p),
      x = Math.min(X, Y, f, p),
      R = t.longitude,
      G = R + s * C,
      y = R + i * w,
      O = R + i * w + s * C;
    return {
      north: v,
      south: x,
      east: Math.max(R, G, y, O),
      west: Math.min(R, G, y, O),
      granYCos: u,
      granYSin: w,
      granXCos: C,
      granXSin: M,
      nwCorner: t,
    };
  }
  (u.computeOptions = function (t, a, r, e, s, i, g) {
    var u,
      h,
      c,
      w,
      M,
      m = t.east,
      X = t.west,
      Y = t.north,
      f = t.south,
      p = !1,
      v = !1;
    Y === o.CesiumMath.PI_OVER_TWO && (p = !0), f === -o.CesiumMath.PI_OVER_TWO && (v = !0);
    var x = Y - f;
    (c = (M = X > m ? o.CesiumMath.TWO_PI - X + m : m - X) / ((u = Math.ceil(M / a) + 1) - 1)),
      (w = x / ((h = Math.ceil(x / a) + 1) - 1));
    var R = n.Rectangle.northwest(t, i),
      G = n.Rectangle.center(t, C);
    (0 === r && 0 === e) ||
      (G.longitude < R.longitude && (G.longitude += o.CesiumMath.TWO_PI), (l = d.project(G, l)));
    var y = w,
      O = c,
      b = n.Rectangle.clone(t, s),
      P = {
        granYCos: y,
        granYSin: 0,
        granXCos: O,
        granXSin: 0,
        nwCorner: R,
        boundingRectangle: b,
        width: u,
        height: h,
        northCap: p,
        southCap: v,
      };
    if (0 !== r) {
      var W = S(R, r, c, w, 0, u, h);
      (Y = W.north),
        (f = W.south),
        (m = W.east),
        (X = W.west),
        (P.granYCos = W.granYCos),
        (P.granYSin = W.granYSin),
        (P.granXCos = W.granXCos),
        (P.granXSin = W.granXSin),
        (b.north = Y),
        (b.south = f),
        (b.east = m),
        (b.west = X);
    }
    if (0 !== e) {
      r -= e;
      var _ = n.Rectangle.northwest(b, g),
        T = S(_, r, c, w, 0, u, h);
      (P.stGranYCos = T.granYCos),
        (P.stGranXCos = T.granXCos),
        (P.stGranYSin = T.granYSin),
        (P.stGranXSin = T.granXSin),
        (P.stNwCorner = _),
        (P.stWest = T.west),
        (P.stSouth = T.south);
    }
    return P;
  }),
    (t.RectangleGeometryLibrary = u);
});
