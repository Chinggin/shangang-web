define([
  './GeometryOffsetAttribute-ff1e192c',
  './arrayRemoveDuplicates-bb548aa3',
  './Transforms-7cd3197b',
  './Matrix2-f2da41d4',
  './RuntimeError-ffe03243',
  './ComponentDatatype-17b06483',
  './PolylineVolumeGeometryLibrary-4af6d4dc',
  './CorridorGeometryLibrary-df5b99e3',
  './when-229515d6',
  './GeometryAttribute-80036e07',
  './GeometryAttributes-b253752a',
  './IndexDatatype-b10faa0b',
  './PolygonPipeline-5582b1ec',
  './VertexFormat-565d6a6c',
  './combine-8ce3f24b',
  './WebGLConstants-4e26b85a',
  './EllipsoidTangentPlane-b27cd2f7',
  './AxisAlignedBoundingBox-1feb0c48',
  './IntersectionTests-1b8a3cb9',
  './Plane-0421a8be',
  './PolylinePipeline-a3ba6f24',
  './EllipsoidGeodesic-43ba18de',
  './EllipsoidRhumbLine-afd6cd20',
], function (t, e, r, a, i, o, n, s, l, d, u, m, f, y, p, c, g, h, b, C, v, A, _) {
  'use strict';
  var w = new a.Cartesian3(),
    T = new a.Cartesian3(),
    G = new a.Cartesian3(),
    E = new a.Cartesian3(),
    V = new a.Cartesian3(),
    x = new a.Cartesian3(),
    F = new a.Cartesian3(),
    L = new a.Cartesian3();
  function P(t, e) {
    for (var r = 0; r < t.length; r++) t[r] = e.scaleToGeodeticSurface(t[r], t[r]);
    return t;
  }
  function N(t, e, r, i, o, n) {
    var l = t.normals,
      d = t.tangents,
      u = t.bitangents,
      m = a.Cartesian3.normalize(a.Cartesian3.cross(r, e, F), F);
    n.normal && s.CorridorGeometryLibrary.addAttribute(l, e, i, o),
      n.tangent && s.CorridorGeometryLibrary.addAttribute(d, m, i, o),
      n.bitangent && s.CorridorGeometryLibrary.addAttribute(u, r, i, o);
  }
  function D(t, e, r) {
    var i,
      n,
      f,
      y = t.positions,
      p = t.corners,
      c = t.endPositions,
      g = t.lefts,
      h = t.normals,
      b = new u.GeometryAttributes(),
      C = 0,
      v = 0,
      A = 0;
    for (n = 0; n < y.length; n += 2)
      (C += f = y[n].length - 3), (A += 2 * f), (v += y[n + 1].length - 3);
    for (C += 3, v += 3, n = 0; n < p.length; n++) {
      i = p[n];
      var _ = p[n].leftPositions;
      l.defined(_)
        ? ((C += f = _.length), (A += f))
        : ((v += f = p[n].rightPositions.length), (A += f));
    }
    var V,
      P = l.defined(c);
    P && ((C += V = c[0].length - 3), (v += V), (A += 6 * (V /= 3)));
    var D,
      M,
      O,
      I,
      S,
      R,
      k = C + v,
      H = new Float64Array(k),
      z = {
        normals: e.normal ? new Float32Array(k) : void 0,
        tangents: e.tangent ? new Float32Array(k) : void 0,
        bitangents: e.bitangent ? new Float32Array(k) : void 0,
      },
      B = 0,
      U = k - 1,
      Y = w,
      W = T,
      q = V / 2,
      J = m.IndexDatatype.createTypedArray(k / 3, A),
      j = 0;
    if (P) {
      (R = G), (S = E);
      var K = c[0];
      for (
        Y = a.Cartesian3.fromArray(h, 0, Y), W = a.Cartesian3.fromArray(g, 0, W), n = 0;
        n < q;
        n++
      )
        (R = a.Cartesian3.fromArray(K, 3 * (q - 1 - n), R)),
          (S = a.Cartesian3.fromArray(K, 3 * (q + n), S)),
          s.CorridorGeometryLibrary.addAttribute(H, S, B),
          s.CorridorGeometryLibrary.addAttribute(H, R, void 0, U),
          N(z, Y, W, B, U, e),
          (I = (M = B / 3) + 1),
          (O = (D = (U - 2) / 3) - 1),
          (J[j++] = D),
          (J[j++] = M),
          (J[j++] = O),
          (J[j++] = O),
          (J[j++] = M),
          (J[j++] = I),
          (B += 3),
          (U -= 3);
    }
    var Q,
      X,
      Z = 0,
      $ = 0,
      tt = y[Z++],
      et = y[Z++];
    for (
      H.set(tt, B),
        H.set(et, U - et.length + 1),
        W = a.Cartesian3.fromArray(g, $, W),
        f = et.length - 3,
        n = 0;
      n < f;
      n += 3
    )
      (Q = r.geodeticSurfaceNormal(a.Cartesian3.fromArray(tt, n, F), F)),
        (X = r.geodeticSurfaceNormal(a.Cartesian3.fromArray(et, f - n, L), L)),
        N(z, (Y = a.Cartesian3.normalize(a.Cartesian3.add(Q, X, Y), Y)), W, B, U, e),
        (I = (M = B / 3) + 1),
        (O = (D = (U - 2) / 3) - 1),
        (J[j++] = D),
        (J[j++] = M),
        (J[j++] = O),
        (J[j++] = O),
        (J[j++] = M),
        (J[j++] = I),
        (B += 3),
        (U -= 3);
    for (
      Q = r.geodeticSurfaceNormal(a.Cartesian3.fromArray(tt, f, F), F),
        X = r.geodeticSurfaceNormal(a.Cartesian3.fromArray(et, f, L), L),
        Y = a.Cartesian3.normalize(a.Cartesian3.add(Q, X, Y), Y),
        $ += 3,
        n = 0;
      n < p.length;
      n++
    ) {
      var rt,
        at,
        it,
        ot = (i = p[n]).leftPositions,
        nt = i.rightPositions,
        st = x,
        lt = G,
        dt = E;
      if (((Y = a.Cartesian3.fromArray(h, $, Y)), l.defined(ot))) {
        for (N(z, Y, W, void 0, U, e), U -= 3, at = I, it = O, rt = 0; rt < ot.length / 3; rt++)
          (st = a.Cartesian3.fromArray(ot, 3 * rt, st)),
            (J[j++] = at),
            (J[j++] = it - rt - 1),
            (J[j++] = it - rt),
            s.CorridorGeometryLibrary.addAttribute(H, st, void 0, U),
            (lt = a.Cartesian3.fromArray(H, 3 * (it - rt - 1), lt)),
            (dt = a.Cartesian3.fromArray(H, 3 * at, dt)),
            N(
              z,
              Y,
              (W = a.Cartesian3.normalize(a.Cartesian3.subtract(lt, dt, W), W)),
              void 0,
              U,
              e
            ),
            (U -= 3);
        (st = a.Cartesian3.fromArray(H, 3 * at, st)),
          (lt = a.Cartesian3.subtract(a.Cartesian3.fromArray(H, 3 * it, lt), st, lt)),
          (dt = a.Cartesian3.subtract(a.Cartesian3.fromArray(H, 3 * (it - rt), dt), st, dt)),
          N(z, Y, (W = a.Cartesian3.normalize(a.Cartesian3.add(lt, dt, W), W)), B, void 0, e),
          (B += 3);
      } else {
        for (N(z, Y, W, B, void 0, e), B += 3, at = O, it = I, rt = 0; rt < nt.length / 3; rt++)
          (st = a.Cartesian3.fromArray(nt, 3 * rt, st)),
            (J[j++] = at),
            (J[j++] = it + rt),
            (J[j++] = it + rt + 1),
            s.CorridorGeometryLibrary.addAttribute(H, st, B),
            (lt = a.Cartesian3.fromArray(H, 3 * at, lt)),
            (dt = a.Cartesian3.fromArray(H, 3 * (it + rt), dt)),
            N(
              z,
              Y,
              (W = a.Cartesian3.normalize(a.Cartesian3.subtract(lt, dt, W), W)),
              B,
              void 0,
              e
            ),
            (B += 3);
        (st = a.Cartesian3.fromArray(H, 3 * at, st)),
          (lt = a.Cartesian3.subtract(a.Cartesian3.fromArray(H, 3 * (it + rt), lt), st, lt)),
          (dt = a.Cartesian3.subtract(a.Cartesian3.fromArray(H, 3 * it, dt), st, dt)),
          N(
            z,
            Y,
            (W = a.Cartesian3.normalize(a.Cartesian3.negate(a.Cartesian3.add(dt, lt, W), W), W)),
            void 0,
            U,
            e
          ),
          (U -= 3);
      }
      for (
        tt = y[Z++],
          et = y[Z++],
          tt.splice(0, 3),
          et.splice(et.length - 3, 3),
          H.set(tt, B),
          H.set(et, U - et.length + 1),
          f = et.length - 3,
          $ += 3,
          W = a.Cartesian3.fromArray(g, $, W),
          rt = 0;
        rt < et.length;
        rt += 3
      )
        (Q = r.geodeticSurfaceNormal(a.Cartesian3.fromArray(tt, rt, F), F)),
          (X = r.geodeticSurfaceNormal(a.Cartesian3.fromArray(et, f - rt, L), L)),
          N(z, (Y = a.Cartesian3.normalize(a.Cartesian3.add(Q, X, Y), Y)), W, B, U, e),
          (M = (I = B / 3) - 1),
          (D = (O = (U - 2) / 3) + 1),
          (J[j++] = D),
          (J[j++] = M),
          (J[j++] = O),
          (J[j++] = O),
          (J[j++] = M),
          (J[j++] = I),
          (B += 3),
          (U -= 3);
      (B -= 3), (U += 3);
    }
    if ((N(z, (Y = a.Cartesian3.fromArray(h, h.length - 3, Y)), W, B, U, e), P)) {
      (B += 3), (U -= 3), (R = G), (S = E);
      var ut = c[1];
      for (n = 0; n < q; n++)
        (R = a.Cartesian3.fromArray(ut, 3 * (V - n - 1), R)),
          (S = a.Cartesian3.fromArray(ut, 3 * n, S)),
          s.CorridorGeometryLibrary.addAttribute(H, R, void 0, U),
          s.CorridorGeometryLibrary.addAttribute(H, S, B),
          N(z, Y, W, B, U, e),
          (M = (I = B / 3) - 1),
          (D = (O = (U - 2) / 3) + 1),
          (J[j++] = D),
          (J[j++] = M),
          (J[j++] = O),
          (J[j++] = O),
          (J[j++] = M),
          (J[j++] = I),
          (B += 3),
          (U -= 3);
    }
    if (
      ((b.position = new d.GeometryAttribute({
        componentDatatype: o.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: H,
      })),
      e.st)
    ) {
      var mt,
        ft,
        yt = new Float32Array((k / 3) * 2),
        pt = 0;
      if (P) {
        (C /= 3), (v /= 3);
        var ct,
          gt = Math.PI / (V + 1);
        (ft = 1 / (C - V + 1)), (mt = 1 / (v - V + 1));
        var ht = V / 2;
        for (n = ht + 1; n < V + 1; n++)
          (ct = o.CesiumMath.PI_OVER_TWO + gt * n),
            (yt[pt++] = mt * (1 + Math.cos(ct))),
            (yt[pt++] = 0.5 * (1 + Math.sin(ct)));
        for (n = 1; n < v - V + 1; n++) (yt[pt++] = n * mt), (yt[pt++] = 0);
        for (n = V; n > ht; n--)
          (ct = o.CesiumMath.PI_OVER_TWO - n * gt),
            (yt[pt++] = 1 - mt * (1 + Math.cos(ct))),
            (yt[pt++] = 0.5 * (1 + Math.sin(ct)));
        for (n = ht; n > 0; n--)
          (ct = o.CesiumMath.PI_OVER_TWO - gt * n),
            (yt[pt++] = 1 - ft * (1 + Math.cos(ct))),
            (yt[pt++] = 0.5 * (1 + Math.sin(ct)));
        for (n = C - V; n > 0; n--) (yt[pt++] = n * ft), (yt[pt++] = 1);
        for (n = 1; n < ht + 1; n++)
          (ct = o.CesiumMath.PI_OVER_TWO + gt * n),
            (yt[pt++] = ft * (1 + Math.cos(ct))),
            (yt[pt++] = 0.5 * (1 + Math.sin(ct)));
      } else {
        for (ft = 1 / ((C /= 3) - 1), mt = 1 / ((v /= 3) - 1), n = 0; n < v; n++)
          (yt[pt++] = n * mt), (yt[pt++] = 0);
        for (n = C; n > 0; n--) (yt[pt++] = (n - 1) * ft), (yt[pt++] = 1);
      }
      b.st = new d.GeometryAttribute({
        componentDatatype: o.ComponentDatatype.FLOAT,
        componentsPerAttribute: 2,
        values: yt,
      });
    }
    return (
      e.normal &&
        (b.normal = new d.GeometryAttribute({
          componentDatatype: o.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: z.normals,
        })),
      e.tangent &&
        (b.tangent = new d.GeometryAttribute({
          componentDatatype: o.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: z.tangents,
        })),
      e.bitangent &&
        (b.bitangent = new d.GeometryAttribute({
          componentDatatype: o.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: z.bitangents,
        })),
      { attributes: b, indices: J }
    );
  }
  function M(t, e, r) {
    (r[e++] = t[0]), (r[e++] = t[1]), (r[e++] = t[2]);
    for (var a = 3; a < t.length; a += 3) {
      var i = t[a],
        o = t[a + 1],
        n = t[a + 2];
      (r[e++] = i), (r[e++] = o), (r[e++] = n), (r[e++] = i), (r[e++] = o), (r[e++] = n);
    }
    return (r[e++] = t[0]), (r[e++] = t[1]), (r[e++] = t[2]), r;
  }
  function O(e, r) {
    var i = new y.VertexFormat({
        position: r.position,
        normal: r.normal || r.bitangent || e.shadowVolume,
        tangent: r.tangent,
        bitangent: r.normal || r.bitangent,
        st: r.st,
      }),
      n = e.ellipsoid,
      u = D(s.CorridorGeometryLibrary.computePositions(e), i, n),
      p = e.height,
      c = e.extrudedHeight,
      g = u.attributes,
      h = u.indices,
      b = g.position.values,
      C = b.length,
      v = new Float64Array(6 * C),
      A = new Float64Array(C);
    A.set(b);
    var _,
      F = new Float64Array(4 * C);
    (F = M((b = f.PolygonPipeline.scaleToGeodeticHeight(b, p, n)), 0, F)),
      (F = M((A = f.PolygonPipeline.scaleToGeodeticHeight(A, c, n)), 2 * C, F)),
      v.set(b),
      v.set(A, C),
      v.set(F, 2 * C),
      (g.position.values = v),
      (g = (function (t, e) {
        if (!(e.normal || e.tangent || e.bitangent || e.st)) return t;
        var r,
          i,
          o = t.position.values;
        (e.normal || e.bitangent) && ((r = t.normal.values), (i = t.bitangent.values));
        var n,
          l = t.position.values.length / 18,
          d = 3 * l,
          u = 2 * l,
          m = 2 * d;
        if (e.normal || e.bitangent || e.tangent) {
          var f = e.normal ? new Float32Array(6 * d) : void 0,
            y = e.tangent ? new Float32Array(6 * d) : void 0,
            p = e.bitangent ? new Float32Array(6 * d) : void 0,
            c = w,
            g = T,
            h = G,
            b = E,
            C = V,
            v = x,
            A = m;
          for (n = 0; n < d; n += 3) {
            var _ = A + m;
            (c = a.Cartesian3.fromArray(o, n, c)),
              (g = a.Cartesian3.fromArray(o, n + d, g)),
              (h = a.Cartesian3.fromArray(o, (n + 3) % d, h)),
              (g = a.Cartesian3.subtract(g, c, g)),
              (h = a.Cartesian3.subtract(h, c, h)),
              (b = a.Cartesian3.normalize(a.Cartesian3.cross(g, h, b), b)),
              e.normal &&
                (s.CorridorGeometryLibrary.addAttribute(f, b, _),
                s.CorridorGeometryLibrary.addAttribute(f, b, _ + 3),
                s.CorridorGeometryLibrary.addAttribute(f, b, A),
                s.CorridorGeometryLibrary.addAttribute(f, b, A + 3)),
              (e.tangent || e.bitangent) &&
                ((v = a.Cartesian3.fromArray(r, n, v)),
                e.bitangent &&
                  (s.CorridorGeometryLibrary.addAttribute(p, v, _),
                  s.CorridorGeometryLibrary.addAttribute(p, v, _ + 3),
                  s.CorridorGeometryLibrary.addAttribute(p, v, A),
                  s.CorridorGeometryLibrary.addAttribute(p, v, A + 3)),
                e.tangent &&
                  ((C = a.Cartesian3.normalize(a.Cartesian3.cross(v, b, C), C)),
                  s.CorridorGeometryLibrary.addAttribute(y, C, _),
                  s.CorridorGeometryLibrary.addAttribute(y, C, _ + 3),
                  s.CorridorGeometryLibrary.addAttribute(y, C, A),
                  s.CorridorGeometryLibrary.addAttribute(y, C, A + 3))),
              (A += 6);
          }
          if (e.normal) {
            for (f.set(r), n = 0; n < d; n += 3)
              (f[n + d] = -r[n]), (f[n + d + 1] = -r[n + 1]), (f[n + d + 2] = -r[n + 2]);
            t.normal.values = f;
          } else t.normal = void 0;
          if (
            (e.bitangent
              ? (p.set(i), p.set(i, d), (t.bitangent.values = p))
              : (t.bitangent = void 0),
            e.tangent)
          ) {
            var F = t.tangent.values;
            y.set(F), y.set(F, d), (t.tangent.values = y);
          }
        }
        if (e.st) {
          var L = t.st.values,
            P = new Float32Array(6 * u);
          P.set(L), P.set(L, u);
          for (var N = 2 * u, D = 0; D < 2; D++) {
            for (P[N++] = L[0], P[N++] = L[1], n = 2; n < u; n += 2) {
              var M = L[n],
                O = L[n + 1];
              (P[N++] = M), (P[N++] = O), (P[N++] = M), (P[N++] = O);
            }
            (P[N++] = L[0]), (P[N++] = L[1]);
          }
          t.st.values = P;
        }
        return t;
      })(g, r));
    var L = C / 3;
    if (e.shadowVolume) {
      var P = g.normal.values;
      C = P.length;
      var N = new Float32Array(6 * C);
      for (_ = 0; _ < C; _++) P[_] = -P[_];
      N.set(P, C),
        (N = M(P, 4 * C, N)),
        (g.extrudeDirection = new d.GeometryAttribute({
          componentDatatype: o.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: N,
        })),
        r.normal || (g.normal = void 0);
    }
    if (l.defined(e.offsetAttribute)) {
      var O = new Uint8Array(6 * L);
      if (e.offsetAttribute === t.GeometryOffsetAttribute.TOP)
        (O = t.arrayFill(O, 1, 0, L)), (O = t.arrayFill(O, 1, 2 * L, 4 * L));
      else {
        var I = e.offsetAttribute === t.GeometryOffsetAttribute.NONE ? 0 : 1;
        O = t.arrayFill(O, I);
      }
      g.applyOffset = new d.GeometryAttribute({
        componentDatatype: o.ComponentDatatype.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: O,
      });
    }
    var S = h.length,
      R = L + L,
      k = m.IndexDatatype.createTypedArray(v.length / 3, 2 * S + 3 * R);
    k.set(h);
    var H,
      z,
      B,
      U,
      Y = S;
    for (_ = 0; _ < S; _ += 3) {
      var W = h[_],
        q = h[_ + 1],
        J = h[_ + 2];
      (k[Y++] = J + L), (k[Y++] = q + L), (k[Y++] = W + L);
    }
    for (_ = 0; _ < R; _ += 2)
      (B = (H = _ + R) + 1),
        (U = (z = H + R) + 1),
        (k[Y++] = H),
        (k[Y++] = z),
        (k[Y++] = B),
        (k[Y++] = B),
        (k[Y++] = z),
        (k[Y++] = U);
    return { attributes: g, indices: k };
  }
  var I = new a.Cartesian3(),
    S = new a.Cartesian3(),
    R = new a.Cartographic();
  function k(t, e, r, i, o, n) {
    var s = a.Cartesian3.subtract(e, t, I);
    a.Cartesian3.normalize(s, s);
    var l = r.geodeticSurfaceNormal(t, S),
      d = a.Cartesian3.cross(s, l, I);
    a.Cartesian3.multiplyByScalar(d, i, d);
    var u = o.latitude,
      m = o.longitude,
      f = n.latitude,
      y = n.longitude;
    a.Cartesian3.add(t, d, S), r.cartesianToCartographic(S, R);
    var p = R.latitude,
      c = R.longitude;
    (u = Math.min(u, p)),
      (m = Math.min(m, c)),
      (f = Math.max(f, p)),
      (y = Math.max(y, c)),
      a.Cartesian3.subtract(t, d, S),
      r.cartesianToCartographic(S, R),
      (p = R.latitude),
      (c = R.longitude),
      (u = Math.min(u, p)),
      (m = Math.min(m, c)),
      (f = Math.max(f, p)),
      (y = Math.max(y, c)),
      (o.latitude = u),
      (o.longitude = m),
      (n.latitude = f),
      (n.longitude = y);
  }
  var H = new a.Cartesian3(),
    z = new a.Cartesian3(),
    B = new a.Cartographic(),
    U = new a.Cartographic();
  function Y(t, r, i, o, s) {
    t = P(t, r);
    var d = e.arrayRemoveDuplicates(t, a.Cartesian3.equalsEpsilon),
      u = d.length;
    if (u < 2 || i <= 0) return new a.Rectangle();
    var m,
      f,
      y = 0.5 * i;
    if (
      ((B.latitude = Number.POSITIVE_INFINITY),
      (B.longitude = Number.POSITIVE_INFINITY),
      (U.latitude = Number.NEGATIVE_INFINITY),
      (U.longitude = Number.NEGATIVE_INFINITY),
      o === n.CornerType.ROUNDED)
    ) {
      var p = d[0];
      a.Cartesian3.subtract(p, d[1], H),
        a.Cartesian3.normalize(H, H),
        a.Cartesian3.multiplyByScalar(H, y, H),
        a.Cartesian3.add(p, H, z),
        r.cartesianToCartographic(z, R),
        (m = R.latitude),
        (f = R.longitude),
        (B.latitude = Math.min(B.latitude, m)),
        (B.longitude = Math.min(B.longitude, f)),
        (U.latitude = Math.max(U.latitude, m)),
        (U.longitude = Math.max(U.longitude, f));
    }
    for (var c = 0; c < u - 1; ++c) k(d[c], d[c + 1], r, y, B, U);
    var g = d[u - 1];
    a.Cartesian3.subtract(g, d[u - 2], H),
      a.Cartesian3.normalize(H, H),
      a.Cartesian3.multiplyByScalar(H, y, H),
      a.Cartesian3.add(g, H, z),
      k(g, z, r, y, B, U),
      o === n.CornerType.ROUNDED &&
        (r.cartesianToCartographic(z, R),
        (m = R.latitude),
        (f = R.longitude),
        (B.latitude = Math.min(B.latitude, m)),
        (B.longitude = Math.min(B.longitude, f)),
        (U.latitude = Math.max(U.latitude, m)),
        (U.longitude = Math.max(U.longitude, f)));
    var h = l.defined(s) ? s : new a.Rectangle();
    return (
      (h.north = U.latitude),
      (h.south = B.latitude),
      (h.east = U.longitude),
      (h.west = B.longitude),
      h
    );
  }
  function W(t) {
    var e = (t = l.defaultValue(t, l.defaultValue.EMPTY_OBJECT)).positions,
      r = t.width,
      i = l.defaultValue(t.height, 0),
      s = l.defaultValue(t.extrudedHeight, i);
    (this._positions = e),
      (this._ellipsoid = a.Ellipsoid.clone(l.defaultValue(t.ellipsoid, a.Ellipsoid.WGS84))),
      (this._vertexFormat = y.VertexFormat.clone(
        l.defaultValue(t.vertexFormat, y.VertexFormat.DEFAULT)
      )),
      (this._width = r),
      (this._height = Math.max(i, s)),
      (this._extrudedHeight = Math.min(i, s)),
      (this._cornerType = l.defaultValue(t.cornerType, n.CornerType.ROUNDED)),
      (this._granularity = l.defaultValue(t.granularity, o.CesiumMath.RADIANS_PER_DEGREE)),
      (this._shadowVolume = l.defaultValue(t.shadowVolume, !1)),
      (this._workerName = 'createCorridorGeometry'),
      (this._offsetAttribute = t.offsetAttribute),
      (this._rectangle = void 0),
      (this.packedLength =
        1 +
        e.length * a.Cartesian3.packedLength +
        a.Ellipsoid.packedLength +
        y.VertexFormat.packedLength +
        7);
  }
  W.pack = function (t, e, r) {
    r = l.defaultValue(r, 0);
    var i = t._positions,
      o = i.length;
    e[r++] = o;
    for (var n = 0; n < o; ++n, r += a.Cartesian3.packedLength) a.Cartesian3.pack(i[n], e, r);
    return (
      a.Ellipsoid.pack(t._ellipsoid, e, r),
      (r += a.Ellipsoid.packedLength),
      y.VertexFormat.pack(t._vertexFormat, e, r),
      (r += y.VertexFormat.packedLength),
      (e[r++] = t._width),
      (e[r++] = t._height),
      (e[r++] = t._extrudedHeight),
      (e[r++] = t._cornerType),
      (e[r++] = t._granularity),
      (e[r++] = t._shadowVolume ? 1 : 0),
      (e[r] = l.defaultValue(t._offsetAttribute, -1)),
      e
    );
  };
  var q = a.Ellipsoid.clone(a.Ellipsoid.UNIT_SPHERE),
    J = new y.VertexFormat(),
    j = {
      positions: void 0,
      ellipsoid: q,
      vertexFormat: J,
      width: void 0,
      height: void 0,
      extrudedHeight: void 0,
      cornerType: void 0,
      granularity: void 0,
      shadowVolume: void 0,
      offsetAttribute: void 0,
    };
  return (
    (W.unpack = function (t, e, r) {
      e = l.defaultValue(e, 0);
      for (var i = t[e++], o = new Array(i), n = 0; n < i; ++n, e += a.Cartesian3.packedLength)
        o[n] = a.Cartesian3.unpack(t, e);
      var s = a.Ellipsoid.unpack(t, e, q);
      e += a.Ellipsoid.packedLength;
      var d = y.VertexFormat.unpack(t, e, J);
      e += y.VertexFormat.packedLength;
      var u = t[e++],
        m = t[e++],
        f = t[e++],
        p = t[e++],
        c = t[e++],
        g = 1 === t[e++],
        h = t[e];
      return l.defined(r)
        ? ((r._positions = o),
          (r._ellipsoid = a.Ellipsoid.clone(s, r._ellipsoid)),
          (r._vertexFormat = y.VertexFormat.clone(d, r._vertexFormat)),
          (r._width = u),
          (r._height = m),
          (r._extrudedHeight = f),
          (r._cornerType = p),
          (r._granularity = c),
          (r._shadowVolume = g),
          (r._offsetAttribute = -1 === h ? void 0 : h),
          r)
        : ((j.positions = o),
          (j.width = u),
          (j.height = m),
          (j.extrudedHeight = f),
          (j.cornerType = p),
          (j.granularity = c),
          (j.shadowVolume = g),
          (j.offsetAttribute = -1 === h ? void 0 : h),
          new W(j));
    }),
    (W.computeRectangle = function (t, e) {
      var r = (t = l.defaultValue(t, l.defaultValue.EMPTY_OBJECT)).positions,
        i = t.width;
      return Y(
        r,
        l.defaultValue(t.ellipsoid, a.Ellipsoid.WGS84),
        i,
        l.defaultValue(t.cornerType, n.CornerType.ROUNDED),
        e
      );
    }),
    (W.createGeometry = function (i) {
      var n = i._positions,
        u = i._width,
        m = i._ellipsoid;
      n = P(n, m);
      var y = e.arrayRemoveDuplicates(n, a.Cartesian3.equalsEpsilon);
      if (!(y.length < 2 || u <= 0)) {
        var p,
          c = i._height,
          g = i._extrudedHeight,
          h = !o.CesiumMath.equalsEpsilon(c, g, 0, o.CesiumMath.EPSILON2),
          b = i._vertexFormat,
          C = {
            ellipsoid: m,
            positions: y,
            width: u,
            cornerType: i._cornerType,
            granularity: i._granularity,
            saveAttributes: !0,
          };
        if (h)
          (C.height = c),
            (C.extrudedHeight = g),
            (C.shadowVolume = i._shadowVolume),
            (C.offsetAttribute = i._offsetAttribute),
            (p = O(C, b));
        else if (
          (((p = D(
            s.CorridorGeometryLibrary.computePositions(C),
            b,
            m
          )).attributes.position.values = f.PolygonPipeline.scaleToGeodeticHeight(
            p.attributes.position.values,
            c,
            m
          )),
          l.defined(i._offsetAttribute))
        ) {
          var v = i._offsetAttribute === t.GeometryOffsetAttribute.NONE ? 0 : 1,
            A = p.attributes.position.values.length,
            _ = new Uint8Array(A / 3);
          t.arrayFill(_, v),
            (p.attributes.applyOffset = new d.GeometryAttribute({
              componentDatatype: o.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 1,
              values: _,
            }));
        }
        var w = p.attributes,
          T = r.BoundingSphere.fromVertices(w.position.values, void 0, 3);
        return (
          b.position || (p.attributes.position.values = void 0),
          new d.Geometry({
            attributes: w,
            indices: p.indices,
            primitiveType: d.PrimitiveType.TRIANGLES,
            boundingSphere: T,
            offsetAttribute: i._offsetAttribute,
          })
        );
      }
    }),
    (W.createShadowVolume = function (t, e, r) {
      var a = t._granularity,
        i = t._ellipsoid,
        o = e(a, i),
        n = r(a, i);
      return new W({
        positions: t._positions,
        width: t._width,
        cornerType: t._cornerType,
        ellipsoid: i,
        granularity: a,
        extrudedHeight: o,
        height: n,
        vertexFormat: y.VertexFormat.POSITION_ONLY,
        shadowVolume: !0,
      });
    }),
    Object.defineProperties(W.prototype, {
      rectangle: {
        get: function () {
          return (
            l.defined(this._rectangle) ||
              (this._rectangle = Y(
                this._positions,
                this._ellipsoid,
                this._width,
                this._cornerType
              )),
            this._rectangle
          );
        },
      },
      textureCoordinateRotationPoints: {
        get: function () {
          return [0, 0, 0, 1, 1, 0];
        },
      },
    }),
    function (t, e) {
      return (
        l.defined(e) && (t = W.unpack(t, e)),
        (t._ellipsoid = a.Ellipsoid.clone(t._ellipsoid)),
        W.createGeometry(t)
      );
    }
  );
});
