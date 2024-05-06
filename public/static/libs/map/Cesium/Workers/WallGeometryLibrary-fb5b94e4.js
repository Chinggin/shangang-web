define([
  'exports',
  './arrayRemoveDuplicates-bb548aa3',
  './Matrix2-f2da41d4',
  './when-229515d6',
  './ComponentDatatype-17b06483',
  './PolylinePipeline-a3ba6f24',
], function (e, i, t, a, r, n) {
  'use strict';
  var o = {};
  function l(e, i) {
    return (
      r.CesiumMath.equalsEpsilon(e.latitude, i.latitude, r.CesiumMath.EPSILON10) &&
      r.CesiumMath.equalsEpsilon(e.longitude, i.longitude, r.CesiumMath.EPSILON10)
    );
  }
  var s = new t.Cartographic(),
    h = new t.Cartographic();
  var g = new Array(2),
    p = new Array(2),
    u = { positions: void 0, height: void 0, granularity: void 0, ellipsoid: void 0 };
  (o.computePositions = function (e, o, c, d, y, v) {
    var m = (function (e, r, n, o) {
      var g = (r = i.arrayRemoveDuplicates(r, t.Cartesian3.equalsEpsilon)).length;
      if (!(g < 2)) {
        var p = a.defined(o),
          u = a.defined(n),
          c = new Array(g),
          d = new Array(g),
          y = new Array(g),
          v = r[0];
        c[0] = v;
        var m = e.cartesianToCartographic(v, s);
        u && (m.height = n[0]), (d[0] = m.height), (y[0] = p ? o[0] : 0);
        for (var f = d[0] === y[0], P = 1, A = 1; A < g; ++A) {
          var C = r[A],
            w = e.cartesianToCartographic(C, h);
          u && (w.height = n[A]),
            (f = f && 0 === w.height),
            l(m, w)
              ? m.height < w.height && (d[P - 1] = w.height)
              : ((c[P] = C),
                (d[P] = w.height),
                (y[P] = p ? o[A] : 0),
                (f = f && d[P] === y[P]),
                t.Cartographic.clone(w, m),
                ++P);
        }
        if (!(f || P < 2))
          return (
            (c.length = P),
            (d.length = P),
            (y.length = P),
            { positions: c, topHeights: d, bottomHeights: y }
          );
      }
    })(e, o, c, d);
    if (a.defined(m)) {
      (o = m.positions), (c = m.topHeights), (d = m.bottomHeights);
      var f,
        P,
        A = o.length,
        C = A - 2,
        w = r.CesiumMath.chordLength(y, e.maximumRadius),
        b = u;
      if (((b.minDistance = w), (b.ellipsoid = e), v)) {
        var M,
          E = 0;
        for (M = 0; M < A - 1; M++) E += n.PolylinePipeline.numberOfPoints(o[M], o[M + 1], w) + 1;
        (f = new Float64Array(3 * E)), (P = new Float64Array(3 * E));
        var D = g,
          F = p;
        (b.positions = D), (b.height = F);
        var H = 0;
        for (M = 0; M < A - 1; M++) {
          (D[0] = o[M]), (D[1] = o[M + 1]), (F[0] = c[M]), (F[1] = c[M + 1]);
          var L = n.PolylinePipeline.generateArc(b);
          f.set(L, H),
            (F[0] = d[M]),
            (F[1] = d[M + 1]),
            P.set(n.PolylinePipeline.generateArc(b), H),
            (H += L.length);
        }
      } else
        (b.positions = o),
          (b.height = c),
          (f = new Float64Array(n.PolylinePipeline.generateArc(b))),
          (b.height = d),
          (P = new Float64Array(n.PolylinePipeline.generateArc(b)));
      return { bottomPositions: P, topPositions: f, numCorners: C };
    }
  }),
    (e.WallGeometryLibrary = o);
});
