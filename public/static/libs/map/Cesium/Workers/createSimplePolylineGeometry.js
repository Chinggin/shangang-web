define([
  './when-229515d6',
  './Matrix2-f2da41d4',
  './ArcType-1da7fdca',
  './Transforms-7cd3197b',
  './Color-d2414093',
  './ComponentDatatype-17b06483',
  './RuntimeError-ffe03243',
  './GeometryAttribute-80036e07',
  './GeometryAttributes-b253752a',
  './IndexDatatype-b10faa0b',
  './PolylinePipeline-a3ba6f24',
  './combine-8ce3f24b',
  './WebGLConstants-4e26b85a',
  './EllipsoidGeodesic-43ba18de',
  './EllipsoidRhumbLine-afd6cd20',
  './IntersectionTests-1b8a3cb9',
  './Plane-0421a8be',
], function (e, o, r, t, a, l, i, n, s, p, d, y, f, c, u, h, C) {
  'use strict';
  function T(e, o, r, t, l, i, n) {
    var s,
      p = d.PolylinePipeline.numberOfPoints(e, o, l),
      y = r.red,
      f = r.green,
      c = r.blue,
      u = r.alpha,
      h = t.red,
      C = t.green,
      T = t.blue,
      g = t.alpha;
    if (a.Color.equals(r, t)) {
      for (s = 0; s < p; s++)
        (i[n++] = a.Color.floatToByte(y)),
          (i[n++] = a.Color.floatToByte(f)),
          (i[n++] = a.Color.floatToByte(c)),
          (i[n++] = a.Color.floatToByte(u));
      return n;
    }
    var m = (h - y) / p,
      b = (C - f) / p,
      v = (T - c) / p,
      P = (g - u) / p,
      _ = n;
    for (s = 0; s < p; s++)
      (i[_++] = a.Color.floatToByte(y + s * m)),
        (i[_++] = a.Color.floatToByte(f + s * b)),
        (i[_++] = a.Color.floatToByte(c + s * v)),
        (i[_++] = a.Color.floatToByte(u + s * P));
    return _;
  }
  function g(t) {
    var i = (t = e.defaultValue(t, e.defaultValue.EMPTY_OBJECT)).positions,
      n = t.colors,
      s = e.defaultValue(t.colorsPerVertex, !1);
    (this._positions = i),
      (this._colors = n),
      (this._colorsPerVertex = s),
      (this._arcType = e.defaultValue(t.arcType, r.ArcType.GEODESIC)),
      (this._granularity = e.defaultValue(t.granularity, l.CesiumMath.RADIANS_PER_DEGREE)),
      (this._ellipsoid = e.defaultValue(t.ellipsoid, o.Ellipsoid.WGS84)),
      (this._workerName = 'createSimplePolylineGeometry');
    var p = 1 + i.length * o.Cartesian3.packedLength;
    (p += e.defined(n) ? 1 + n.length * a.Color.packedLength : 1),
      (this.packedLength = p + o.Ellipsoid.packedLength + 3);
  }
  (g.pack = function (r, t, l) {
    var i;
    l = e.defaultValue(l, 0);
    var n = r._positions,
      s = n.length;
    for (t[l++] = s, i = 0; i < s; ++i, l += o.Cartesian3.packedLength)
      o.Cartesian3.pack(n[i], t, l);
    var p = r._colors;
    for (s = e.defined(p) ? p.length : 0, t[l++] = s, i = 0; i < s; ++i, l += a.Color.packedLength)
      a.Color.pack(p[i], t, l);
    return (
      o.Ellipsoid.pack(r._ellipsoid, t, l),
      (l += o.Ellipsoid.packedLength),
      (t[l++] = r._colorsPerVertex ? 1 : 0),
      (t[l++] = r._arcType),
      (t[l] = r._granularity),
      t
    );
  }),
    (g.unpack = function (r, t, l) {
      var i;
      t = e.defaultValue(t, 0);
      var n = r[t++],
        s = new Array(n);
      for (i = 0; i < n; ++i, t += o.Cartesian3.packedLength) s[i] = o.Cartesian3.unpack(r, t);
      var p = (n = r[t++]) > 0 ? new Array(n) : void 0;
      for (i = 0; i < n; ++i, t += a.Color.packedLength) p[i] = a.Color.unpack(r, t);
      var d = o.Ellipsoid.unpack(r, t);
      t += o.Ellipsoid.packedLength;
      var y = 1 === r[t++],
        f = r[t++],
        c = r[t];
      return e.defined(l)
        ? ((l._positions = s),
          (l._colors = p),
          (l._ellipsoid = d),
          (l._colorsPerVertex = y),
          (l._arcType = f),
          (l._granularity = c),
          l)
        : new g({
            positions: s,
            colors: p,
            ellipsoid: d,
            colorsPerVertex: y,
            arcType: f,
            granularity: c,
          });
    });
  var m = new Array(2),
    b = new Array(2),
    v = { positions: m, height: b, ellipsoid: void 0, minDistance: void 0, granularity: void 0 };
  return (
    (g.createGeometry = function (i) {
      var y,
        f,
        c,
        u,
        h,
        C = i._positions,
        g = i._colors,
        P = i._colorsPerVertex,
        _ = i._arcType,
        B = i._granularity,
        A = i._ellipsoid,
        E = l.CesiumMath.chordLength(B, A.maximumRadius),
        k = e.defined(g) && !P,
        G = C.length,
        w = 0;
      if (_ === r.ArcType.GEODESIC || _ === r.ArcType.RHUMB) {
        var D, L, V;
        _ === r.ArcType.GEODESIC
          ? ((D = l.CesiumMath.chordLength(B, A.maximumRadius)),
            (L = d.PolylinePipeline.numberOfPoints),
            (V = d.PolylinePipeline.generateArc))
          : ((D = B),
            (L = d.PolylinePipeline.numberOfPointsRhumbLine),
            (V = d.PolylinePipeline.generateRhumbArc));
        var x = d.PolylinePipeline.extractHeights(C, A),
          S = v;
        if (
          (_ === r.ArcType.GEODESIC ? (S.minDistance = E) : (S.granularity = B),
          (S.ellipsoid = A),
          k)
        ) {
          var I = 0;
          for (y = 0; y < G - 1; y++) I += L(C[y], C[y + 1], D) + 1;
          (f = new Float64Array(3 * I)),
            (u = new Uint8Array(4 * I)),
            (S.positions = m),
            (S.height = b);
          var R = 0;
          for (y = 0; y < G - 1; ++y) {
            (m[0] = C[y]), (m[1] = C[y + 1]), (b[0] = x[y]), (b[1] = x[y + 1]);
            var O = V(S);
            if (e.defined(g)) {
              var M = O.length / 3;
              h = g[y];
              for (var U = 0; U < M; ++U)
                (u[R++] = a.Color.floatToByte(h.red)),
                  (u[R++] = a.Color.floatToByte(h.green)),
                  (u[R++] = a.Color.floatToByte(h.blue)),
                  (u[R++] = a.Color.floatToByte(h.alpha));
            }
            f.set(O, w), (w += O.length);
          }
        } else if (
          ((S.positions = C), (S.height = x), (f = new Float64Array(V(S))), e.defined(g))
        ) {
          for (u = new Uint8Array((f.length / 3) * 4), y = 0; y < G - 1; ++y) {
            w = T(C[y], C[y + 1], g[y], g[y + 1], E, u, w);
          }
          var N = g[G - 1];
          (u[w++] = a.Color.floatToByte(N.red)),
            (u[w++] = a.Color.floatToByte(N.green)),
            (u[w++] = a.Color.floatToByte(N.blue)),
            (u[w++] = a.Color.floatToByte(N.alpha));
        }
      } else {
        (c = k ? 2 * G - 2 : G),
          (f = new Float64Array(3 * c)),
          (u = e.defined(g) ? new Uint8Array(4 * c) : void 0);
        var F = 0,
          H = 0;
        for (y = 0; y < G; ++y) {
          var W = C[y];
          if (
            (k &&
              y > 0 &&
              (o.Cartesian3.pack(W, f, F),
              (F += 3),
              (h = g[y - 1]),
              (u[H++] = a.Color.floatToByte(h.red)),
              (u[H++] = a.Color.floatToByte(h.green)),
              (u[H++] = a.Color.floatToByte(h.blue)),
              (u[H++] = a.Color.floatToByte(h.alpha))),
            k && y === G - 1)
          )
            break;
          o.Cartesian3.pack(W, f, F),
            (F += 3),
            e.defined(g) &&
              ((h = g[y]),
              (u[H++] = a.Color.floatToByte(h.red)),
              (u[H++] = a.Color.floatToByte(h.green)),
              (u[H++] = a.Color.floatToByte(h.blue)),
              (u[H++] = a.Color.floatToByte(h.alpha)));
        }
      }
      var Y = new s.GeometryAttributes();
      (Y.position = new n.GeometryAttribute({
        componentDatatype: l.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: f,
      })),
        e.defined(g) &&
          (Y.color = new n.GeometryAttribute({
            componentDatatype: l.ComponentDatatype.UNSIGNED_BYTE,
            componentsPerAttribute: 4,
            values: u,
            normalize: !0,
          }));
      var q = 2 * ((c = f.length / 3) - 1),
        z = p.IndexDatatype.createTypedArray(c, q),
        J = 0;
      for (y = 0; y < c - 1; ++y) (z[J++] = y), (z[J++] = y + 1);
      return new n.Geometry({
        attributes: Y,
        indices: z,
        primitiveType: n.PrimitiveType.LINES,
        boundingSphere: t.BoundingSphere.fromPoints(C),
      });
    }),
    function (r, t) {
      return (
        e.defined(t) && (r = g.unpack(r, t)),
        (r._ellipsoid = o.Ellipsoid.clone(r._ellipsoid)),
        g.createGeometry(r)
      );
    }
  );
});
