define([
  'exports',
  './GeometryOffsetAttribute-ff1e192c',
  './Transforms-7cd3197b',
  './Matrix2-f2da41d4',
  './RuntimeError-ffe03243',
  './ComponentDatatype-17b06483',
  './when-229515d6',
  './EllipseGeometryLibrary-69f5ff56',
  './GeometryAttribute-80036e07',
  './GeometryAttributes-b253752a',
  './GeometryInstance-16601d2a',
  './GeometryPipeline-5b3fba53',
  './IndexDatatype-b10faa0b',
  './VertexFormat-565d6a6c',
], function (e, t, r, a, i, n, o, s, l, u, m, p, y, c) {
  'use strict';
  var d = new a.Cartesian3(),
    f = new a.Cartesian3(),
    A = new a.Cartesian3(),
    x = new a.Cartesian3(),
    h = new a.Cartesian2(),
    g = new a.Matrix3(),
    _ = new a.Matrix3(),
    b = new r.Quaternion(),
    v = new a.Cartesian3(),
    C = new a.Cartesian3(),
    w = new a.Cartesian3(),
    E = new a.Cartographic(),
    M = new a.Cartesian3(),
    I = new a.Cartesian2(),
    T = new a.Cartesian2();
  function G(e, i, m) {
    var p = i.vertexFormat,
      y = i.center,
      c = i.semiMajorAxis,
      x = i.semiMinorAxis,
      G = i.ellipsoid,
      N = i.stRotation,
      P = m ? (e.length / 3) * 2 : e.length / 3,
      F = i.shadowVolume,
      V = p.st ? new Float32Array(2 * P) : void 0,
      D = p.normal ? new Float32Array(3 * P) : void 0,
      O = p.tangent ? new Float32Array(3 * P) : void 0,
      S = p.bitangent ? new Float32Array(3 * P) : void 0,
      L = F ? new Float32Array(3 * P) : void 0,
      R = 0,
      j = v,
      z = C,
      k = w,
      B = new r.GeographicProjection(G),
      Y = B.project(G.cartesianToCartographic(y, E), M),
      H = G.scaleToGeodeticSurface(y, d);
    G.geodeticSurfaceNormal(H, H);
    var U = g,
      Q = _;
    if (0 !== N) {
      var W = r.Quaternion.fromAxisAngle(H, N, b);
      (U = a.Matrix3.fromQuaternion(W, U)),
        (W = r.Quaternion.fromAxisAngle(H, -N, b)),
        (Q = a.Matrix3.fromQuaternion(W, Q));
    } else
      (U = a.Matrix3.clone(a.Matrix3.IDENTITY, U)), (Q = a.Matrix3.clone(a.Matrix3.IDENTITY, Q));
    for (
      var J = a.Cartesian2.fromElements(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, I),
        q = a.Cartesian2.fromElements(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, T),
        Z = e.length,
        K = m ? Z : 0,
        X = (K / 3) * 2,
        $ = 0;
      $ < Z;
      $ += 3
    ) {
      var ee = $ + 1,
        te = $ + 2,
        re = a.Cartesian3.fromArray(e, $, d);
      if (p.st) {
        var ae = a.Matrix3.multiplyByVector(U, re, f),
          ie = B.project(G.cartesianToCartographic(ae, E), A);
        a.Cartesian3.subtract(ie, Y, ie),
          (h.x = (ie.x + c) / (2 * c)),
          (h.y = (ie.y + x) / (2 * x)),
          (J.x = Math.min(h.x, J.x)),
          (J.y = Math.min(h.y, J.y)),
          (q.x = Math.max(h.x, q.x)),
          (q.y = Math.max(h.y, q.y)),
          m && ((V[R + X] = h.x), (V[R + 1 + X] = h.y)),
          (V[R++] = h.x),
          (V[R++] = h.y);
      }
      (p.normal || p.tangent || p.bitangent || F) &&
        ((j = G.geodeticSurfaceNormal(re, j)),
        F && ((L[$ + K] = -j.x), (L[ee + K] = -j.y), (L[te + K] = -j.z)),
        (p.normal || p.tangent || p.bitangent) &&
          ((p.tangent || p.bitangent) &&
            ((z = a.Cartesian3.normalize(a.Cartesian3.cross(a.Cartesian3.UNIT_Z, j, z), z)),
            a.Matrix3.multiplyByVector(Q, z, z)),
          p.normal &&
            ((D[$] = j.x),
            (D[ee] = j.y),
            (D[te] = j.z),
            m && ((D[$ + K] = -j.x), (D[ee + K] = -j.y), (D[te + K] = -j.z))),
          p.tangent &&
            ((O[$] = z.x),
            (O[ee] = z.y),
            (O[te] = z.z),
            m && ((O[$ + K] = -z.x), (O[ee + K] = -z.y), (O[te + K] = -z.z))),
          p.bitangent &&
            ((k = a.Cartesian3.normalize(a.Cartesian3.cross(j, z, k), k)),
            (S[$] = k.x),
            (S[ee] = k.y),
            (S[te] = k.z),
            m && ((S[$ + K] = k.x), (S[ee + K] = k.y), (S[te + K] = k.z)))));
    }
    if (p.st) {
      Z = V.length;
      for (var ne = 0; ne < Z; ne += 2)
        (V[ne] = (V[ne] - J.x) / (q.x - J.x)), (V[ne + 1] = (V[ne + 1] - J.y) / (q.y - J.y));
    }
    var oe = new u.GeometryAttributes();
    if (p.position) {
      var se = s.EllipseGeometryLibrary.raisePositionsToHeight(e, i, m);
      oe.position = new l.GeometryAttribute({
        componentDatatype: n.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: se,
      });
    }
    if (
      (p.st &&
        (oe.st = new l.GeometryAttribute({
          componentDatatype: n.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          values: V,
        })),
      p.normal &&
        (oe.normal = new l.GeometryAttribute({
          componentDatatype: n.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: D,
        })),
      p.tangent &&
        (oe.tangent = new l.GeometryAttribute({
          componentDatatype: n.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: O,
        })),
      p.bitangent &&
        (oe.bitangent = new l.GeometryAttribute({
          componentDatatype: n.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: S,
        })),
      F &&
        (oe.extrudeDirection = new l.GeometryAttribute({
          componentDatatype: n.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: L,
        })),
      m && o.defined(i.offsetAttribute))
    ) {
      var le = new Uint8Array(P);
      if (i.offsetAttribute === t.GeometryOffsetAttribute.TOP) le = t.arrayFill(le, 1, 0, P / 2);
      else {
        var ue = i.offsetAttribute === t.GeometryOffsetAttribute.NONE ? 0 : 1;
        le = t.arrayFill(le, ue);
      }
      oe.applyOffset = new l.GeometryAttribute({
        componentDatatype: n.ComponentDatatype.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: le,
      });
    }
    return oe;
  }
  function N(e) {
    var t,
      r,
      a,
      i,
      n,
      o = new Array(e * (e + 1) * 12 - 6),
      s = 0;
    for (t = 0, a = 1, i = 0; i < 3; i++) (o[s++] = a++), (o[s++] = t), (o[s++] = a);
    for (i = 2; i < e + 1; ++i) {
      for (
        a = i * (i + 1) - 1,
          t = (i - 1) * i - 1,
          o[s++] = a++,
          o[s++] = t,
          o[s++] = a,
          r = 2 * i,
          n = 0;
        n < r - 1;
        ++n
      )
        (o[s++] = a), (o[s++] = t++), (o[s++] = t), (o[s++] = a++), (o[s++] = t), (o[s++] = a);
      (o[s++] = a++), (o[s++] = t), (o[s++] = a);
    }
    for (r = 2 * e, ++a, ++t, i = 0; i < r - 1; ++i)
      (o[s++] = a), (o[s++] = t++), (o[s++] = t), (o[s++] = a++), (o[s++] = t), (o[s++] = a);
    for (
      o[s++] = a, o[s++] = t++, o[s++] = t, o[s++] = a++, o[s++] = t++, o[s++] = t, ++t, i = e - 1;
      i > 1;
      --i
    ) {
      for (o[s++] = t++, o[s++] = t, o[s++] = a, r = 2 * i, n = 0; n < r - 1; ++n)
        (o[s++] = a), (o[s++] = t++), (o[s++] = t), (o[s++] = a++), (o[s++] = t), (o[s++] = a);
      (o[s++] = t++), (o[s++] = t++), (o[s++] = a++);
    }
    for (i = 0; i < 3; i++) (o[s++] = t++), (o[s++] = t), (o[s++] = a);
    return o;
  }
  var P = new a.Cartesian3();
  var F = new r.BoundingSphere(),
    V = new r.BoundingSphere();
  function D(e) {
    var i = e.center,
      c = e.ellipsoid,
      _ = e.semiMajorAxis,
      P = a.Cartesian3.multiplyByScalar(c.geodeticSurfaceNormal(i, d), e.height, d);
    (F.center = a.Cartesian3.add(i, P, F.center)),
      (F.radius = _),
      (P = a.Cartesian3.multiplyByScalar(c.geodeticSurfaceNormal(i, P), e.extrudedHeight, P)),
      (V.center = a.Cartesian3.add(i, P, V.center)),
      (V.radius = _);
    var D = s.EllipseGeometryLibrary.computeEllipsePositions(e, !0, !0),
      O = D.positions,
      S = D.numPts,
      L = D.outerPositions,
      R = r.BoundingSphere.union(F, V),
      j = G(O, e, !0),
      z = N(S),
      k = z.length;
    z.length = 2 * k;
    for (var B = O.length / 3, Y = 0; Y < k; Y += 3)
      (z[Y + k] = z[Y + 2] + B), (z[Y + 1 + k] = z[Y + 1] + B), (z[Y + 2 + k] = z[Y] + B);
    var H = y.IndexDatatype.createTypedArray((2 * B) / 3, z),
      U = new l.Geometry({ attributes: j, indices: H, primitiveType: l.PrimitiveType.TRIANGLES }),
      Q = (function (e, i) {
        var s = i.vertexFormat,
          m = i.center,
          p = i.semiMajorAxis,
          y = i.semiMinorAxis,
          c = i.ellipsoid,
          _ = i.height,
          G = i.extrudedHeight,
          N = i.stRotation,
          P = (e.length / 3) * 2,
          F = new Float64Array(3 * P),
          V = s.st ? new Float32Array(2 * P) : void 0,
          D = s.normal ? new Float32Array(3 * P) : void 0,
          O = s.tangent ? new Float32Array(3 * P) : void 0,
          S = s.bitangent ? new Float32Array(3 * P) : void 0,
          L = i.shadowVolume,
          R = L ? new Float32Array(3 * P) : void 0,
          j = 0,
          z = v,
          k = C,
          B = w,
          Y = new r.GeographicProjection(c),
          H = Y.project(c.cartesianToCartographic(m, E), M),
          U = c.scaleToGeodeticSurface(m, d);
        c.geodeticSurfaceNormal(U, U);
        for (
          var Q = r.Quaternion.fromAxisAngle(U, N, b),
            W = a.Matrix3.fromQuaternion(Q, g),
            J = a.Cartesian2.fromElements(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, I),
            q = a.Cartesian2.fromElements(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, T),
            Z = e.length,
            K = (Z / 3) * 2,
            X = 0;
          X < Z;
          X += 3
        ) {
          var $,
            ee = X + 1,
            te = X + 2,
            re = a.Cartesian3.fromArray(e, X, d);
          if (s.st) {
            var ae = a.Matrix3.multiplyByVector(W, re, f),
              ie = Y.project(c.cartesianToCartographic(ae, E), A);
            a.Cartesian3.subtract(ie, H, ie),
              (h.x = (ie.x + p) / (2 * p)),
              (h.y = (ie.y + y) / (2 * y)),
              (J.x = Math.min(h.x, J.x)),
              (J.y = Math.min(h.y, J.y)),
              (q.x = Math.max(h.x, q.x)),
              (q.y = Math.max(h.y, q.y)),
              (V[j + K] = h.x),
              (V[j + 1 + K] = h.y),
              (V[j++] = h.x),
              (V[j++] = h.y);
          }
          (re = c.scaleToGeodeticSurface(re, re)),
            ($ = a.Cartesian3.clone(re, f)),
            (z = c.geodeticSurfaceNormal(re, z)),
            L && ((R[X + Z] = -z.x), (R[ee + Z] = -z.y), (R[te + Z] = -z.z));
          var ne = a.Cartesian3.multiplyByScalar(z, _, x);
          if (
            ((re = a.Cartesian3.add(re, ne, re)),
            (ne = a.Cartesian3.multiplyByScalar(z, G, ne)),
            ($ = a.Cartesian3.add($, ne, $)),
            s.position &&
              ((F[X + Z] = $.x),
              (F[ee + Z] = $.y),
              (F[te + Z] = $.z),
              (F[X] = re.x),
              (F[ee] = re.y),
              (F[te] = re.z)),
            s.normal || s.tangent || s.bitangent)
          ) {
            B = a.Cartesian3.clone(z, B);
            var oe = a.Cartesian3.fromArray(e, (X + 3) % Z, x);
            a.Cartesian3.subtract(oe, re, oe);
            var se = a.Cartesian3.subtract($, re, A);
            (z = a.Cartesian3.normalize(a.Cartesian3.cross(se, oe, z), z)),
              s.normal &&
                ((D[X] = z.x),
                (D[ee] = z.y),
                (D[te] = z.z),
                (D[X + Z] = z.x),
                (D[ee + Z] = z.y),
                (D[te + Z] = z.z)),
              s.tangent &&
                ((k = a.Cartesian3.normalize(a.Cartesian3.cross(B, z, k), k)),
                (O[X] = k.x),
                (O[ee] = k.y),
                (O[te] = k.z),
                (O[X + Z] = k.x),
                (O[X + 1 + Z] = k.y),
                (O[X + 2 + Z] = k.z)),
              s.bitangent &&
                ((S[X] = B.x),
                (S[ee] = B.y),
                (S[te] = B.z),
                (S[X + Z] = B.x),
                (S[ee + Z] = B.y),
                (S[te + Z] = B.z));
          }
        }
        if (s.st) {
          Z = V.length;
          for (var le = 0; le < Z; le += 2)
            (V[le] = (V[le] - J.x) / (q.x - J.x)), (V[le + 1] = (V[le + 1] - J.y) / (q.y - J.y));
        }
        var ue = new u.GeometryAttributes();
        if (
          (s.position &&
            (ue.position = new l.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.DOUBLE,
              componentsPerAttribute: 3,
              values: F,
            })),
          s.st &&
            (ue.st = new l.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.FLOAT,
              componentsPerAttribute: 2,
              values: V,
            })),
          s.normal &&
            (ue.normal = new l.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: D,
            })),
          s.tangent &&
            (ue.tangent = new l.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: O,
            })),
          s.bitangent &&
            (ue.bitangent = new l.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: S,
            })),
          L &&
            (ue.extrudeDirection = new l.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: R,
            })),
          o.defined(i.offsetAttribute))
        ) {
          var me = new Uint8Array(P);
          if (i.offsetAttribute === t.GeometryOffsetAttribute.TOP)
            me = t.arrayFill(me, 1, 0, P / 2);
          else {
            var pe = i.offsetAttribute === t.GeometryOffsetAttribute.NONE ? 0 : 1;
            me = t.arrayFill(me, pe);
          }
          ue.applyOffset = new l.GeometryAttribute({
            componentDatatype: n.ComponentDatatype.UNSIGNED_BYTE,
            componentsPerAttribute: 1,
            values: me,
          });
        }
        return ue;
      })(L, e);
    z = (function (e) {
      for (
        var t = e.length / 3, r = y.IndexDatatype.createTypedArray(t, 6 * t), a = 0, i = 0;
        i < t;
        i++
      ) {
        var n = i,
          o = i + t,
          s = (n + 1) % t,
          l = s + t;
        (r[a++] = n), (r[a++] = o), (r[a++] = s), (r[a++] = s), (r[a++] = o), (r[a++] = l);
      }
      return r;
    })(L);
    var W = y.IndexDatatype.createTypedArray((2 * L.length) / 3, z),
      J = new l.Geometry({ attributes: Q, indices: W, primitiveType: l.PrimitiveType.TRIANGLES }),
      q = p.GeometryPipeline.combineInstances([
        new m.GeometryInstance({ geometry: U }),
        new m.GeometryInstance({ geometry: J }),
      ]);
    return { boundingSphere: R, attributes: q[0].attributes, indices: q[0].indices };
  }
  function O(e, t, r, i, o, l, u) {
    for (
      var m = s.EllipseGeometryLibrary.computeEllipsePositions(
          { center: e, semiMajorAxis: t, semiMinorAxis: r, rotation: i, granularity: o },
          !1,
          !0
        ).outerPositions,
        p = m.length / 3,
        y = new Array(p),
        c = 0;
      c < p;
      ++c
    )
      y[c] = a.Cartesian3.fromArray(m, 3 * c);
    var d = a.Rectangle.fromCartesianArray(y, l, u);
    return (
      d.width > n.CesiumMath.PI &&
        ((d.north = d.north > 0 ? n.CesiumMath.PI_OVER_TWO - n.CesiumMath.EPSILON7 : d.north),
        (d.south = d.south < 0 ? n.CesiumMath.EPSILON7 - n.CesiumMath.PI_OVER_TWO : d.south),
        (d.east = n.CesiumMath.PI),
        (d.west = -n.CesiumMath.PI)),
      d
    );
  }
  function S(e) {
    var t = (e = o.defaultValue(e, o.defaultValue.EMPTY_OBJECT)).center,
      r = o.defaultValue(e.ellipsoid, a.Ellipsoid.WGS84),
      i = e.semiMajorAxis,
      s = e.semiMinorAxis,
      l = o.defaultValue(e.granularity, n.CesiumMath.RADIANS_PER_DEGREE),
      u = o.defaultValue(e.vertexFormat, c.VertexFormat.DEFAULT),
      m = o.defaultValue(e.height, 0),
      p = o.defaultValue(e.extrudedHeight, m);
    (this._center = a.Cartesian3.clone(t)),
      (this._semiMajorAxis = i),
      (this._semiMinorAxis = s),
      (this._ellipsoid = a.Ellipsoid.clone(r)),
      (this._rotation = o.defaultValue(e.rotation, 0)),
      (this._stRotation = o.defaultValue(e.stRotation, 0)),
      (this._height = Math.max(p, m)),
      (this._granularity = l),
      (this._vertexFormat = c.VertexFormat.clone(u)),
      (this._extrudedHeight = Math.min(p, m)),
      (this._shadowVolume = o.defaultValue(e.shadowVolume, !1)),
      (this._workerName = 'createEllipseGeometry'),
      (this._offsetAttribute = e.offsetAttribute),
      (this._rectangle = void 0),
      (this._textureCoordinateRotationPoints = void 0);
  }
  (S.packedLength =
    a.Cartesian3.packedLength + a.Ellipsoid.packedLength + c.VertexFormat.packedLength + 9),
    (S.pack = function (e, t, r) {
      return (
        (r = o.defaultValue(r, 0)),
        a.Cartesian3.pack(e._center, t, r),
        (r += a.Cartesian3.packedLength),
        a.Ellipsoid.pack(e._ellipsoid, t, r),
        (r += a.Ellipsoid.packedLength),
        c.VertexFormat.pack(e._vertexFormat, t, r),
        (r += c.VertexFormat.packedLength),
        (t[r++] = e._semiMajorAxis),
        (t[r++] = e._semiMinorAxis),
        (t[r++] = e._rotation),
        (t[r++] = e._stRotation),
        (t[r++] = e._height),
        (t[r++] = e._granularity),
        (t[r++] = e._extrudedHeight),
        (t[r++] = e._shadowVolume ? 1 : 0),
        (t[r] = o.defaultValue(e._offsetAttribute, -1)),
        t
      );
    });
  var L = new a.Cartesian3(),
    R = new a.Ellipsoid(),
    j = new c.VertexFormat(),
    z = {
      center: L,
      ellipsoid: R,
      vertexFormat: j,
      semiMajorAxis: void 0,
      semiMinorAxis: void 0,
      rotation: void 0,
      stRotation: void 0,
      height: void 0,
      granularity: void 0,
      extrudedHeight: void 0,
      shadowVolume: void 0,
      offsetAttribute: void 0,
    };
  (S.unpack = function (e, t, r) {
    t = o.defaultValue(t, 0);
    var i = a.Cartesian3.unpack(e, t, L);
    t += a.Cartesian3.packedLength;
    var n = a.Ellipsoid.unpack(e, t, R);
    t += a.Ellipsoid.packedLength;
    var s = c.VertexFormat.unpack(e, t, j);
    t += c.VertexFormat.packedLength;
    var l = e[t++],
      u = e[t++],
      m = e[t++],
      p = e[t++],
      y = e[t++],
      d = e[t++],
      f = e[t++],
      A = 1 === e[t++],
      x = e[t];
    return o.defined(r)
      ? ((r._center = a.Cartesian3.clone(i, r._center)),
        (r._ellipsoid = a.Ellipsoid.clone(n, r._ellipsoid)),
        (r._vertexFormat = c.VertexFormat.clone(s, r._vertexFormat)),
        (r._semiMajorAxis = l),
        (r._semiMinorAxis = u),
        (r._rotation = m),
        (r._stRotation = p),
        (r._height = y),
        (r._granularity = d),
        (r._extrudedHeight = f),
        (r._shadowVolume = A),
        (r._offsetAttribute = -1 === x ? void 0 : x),
        r)
      : ((z.height = y),
        (z.extrudedHeight = f),
        (z.granularity = d),
        (z.stRotation = p),
        (z.rotation = m),
        (z.semiMajorAxis = l),
        (z.semiMinorAxis = u),
        (z.shadowVolume = A),
        (z.offsetAttribute = -1 === x ? void 0 : x),
        new S(z));
  }),
    (S.computeRectangle = function (e, t) {
      var r = (e = o.defaultValue(e, o.defaultValue.EMPTY_OBJECT)).center,
        i = o.defaultValue(e.ellipsoid, a.Ellipsoid.WGS84),
        s = e.semiMajorAxis,
        l = e.semiMinorAxis,
        u = o.defaultValue(e.granularity, n.CesiumMath.RADIANS_PER_DEGREE);
      return O(r, s, l, o.defaultValue(e.rotation, 0), u, i, t);
    }),
    (S.createGeometry = function (e) {
      if (!(e._semiMajorAxis <= 0 || e._semiMinorAxis <= 0)) {
        var i = e._height,
          u = e._extrudedHeight,
          m = !n.CesiumMath.equalsEpsilon(i, u, 0, n.CesiumMath.EPSILON2);
        e._center = e._ellipsoid.scaleToGeodeticSurface(e._center, e._center);
        var p,
          c = {
            center: e._center,
            semiMajorAxis: e._semiMajorAxis,
            semiMinorAxis: e._semiMinorAxis,
            ellipsoid: e._ellipsoid,
            rotation: e._rotation,
            height: i,
            granularity: e._granularity,
            vertexFormat: e._vertexFormat,
            stRotation: e._stRotation,
          };
        if (m)
          (c.extrudedHeight = u),
            (c.shadowVolume = e._shadowVolume),
            (c.offsetAttribute = e._offsetAttribute),
            (p = D(c));
        else if (
          ((p = (function (e) {
            var t = e.center;
            (P = a.Cartesian3.multiplyByScalar(
              e.ellipsoid.geodeticSurfaceNormal(t, P),
              e.height,
              P
            )),
              (P = a.Cartesian3.add(t, P, P));
            var i = new r.BoundingSphere(P, e.semiMajorAxis),
              n = s.EllipseGeometryLibrary.computeEllipsePositions(e, !0, !1),
              o = n.positions,
              l = n.numPts,
              u = G(o, e, !1),
              m = N(l);
            return {
              boundingSphere: i,
              attributes: u,
              indices: (m = y.IndexDatatype.createTypedArray(o.length / 3, m)),
            };
          })(c)),
          o.defined(e._offsetAttribute))
        ) {
          var d = p.attributes.position.values.length,
            f = new Uint8Array(d / 3),
            A = e._offsetAttribute === t.GeometryOffsetAttribute.NONE ? 0 : 1;
          t.arrayFill(f, A),
            (p.attributes.applyOffset = new l.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 1,
              values: f,
            }));
        }
        return new l.Geometry({
          attributes: p.attributes,
          indices: p.indices,
          primitiveType: l.PrimitiveType.TRIANGLES,
          boundingSphere: p.boundingSphere,
          offsetAttribute: e._offsetAttribute,
        });
      }
    }),
    (S.createShadowVolume = function (e, t, r) {
      var a = e._granularity,
        i = e._ellipsoid,
        n = t(a, i),
        o = r(a, i);
      return new S({
        center: e._center,
        semiMajorAxis: e._semiMajorAxis,
        semiMinorAxis: e._semiMinorAxis,
        ellipsoid: i,
        rotation: e._rotation,
        stRotation: e._stRotation,
        granularity: a,
        extrudedHeight: n,
        height: o,
        vertexFormat: c.VertexFormat.POSITION_ONLY,
        shadowVolume: !0,
      });
    }),
    Object.defineProperties(S.prototype, {
      rectangle: {
        get: function () {
          return (
            o.defined(this._rectangle) ||
              (this._rectangle = O(
                this._center,
                this._semiMajorAxis,
                this._semiMinorAxis,
                this._rotation,
                this._granularity,
                this._ellipsoid
              )),
            this._rectangle
          );
        },
      },
      textureCoordinateRotationPoints: {
        get: function () {
          return (
            o.defined(this._textureCoordinateRotationPoints) ||
              (this._textureCoordinateRotationPoints = (function (e) {
                var t = -e._stRotation;
                if (0 === t) return [0, 0, 0, 1, 1, 0];
                for (
                  var r = s.EllipseGeometryLibrary.computeEllipsePositions(
                      {
                        center: e._center,
                        semiMajorAxis: e._semiMajorAxis,
                        semiMinorAxis: e._semiMinorAxis,
                        rotation: e._rotation,
                        granularity: e._granularity,
                      },
                      !1,
                      !0
                    ).outerPositions,
                    i = r.length / 3,
                    n = new Array(i),
                    o = 0;
                  o < i;
                  ++o
                )
                  n[o] = a.Cartesian3.fromArray(r, 3 * o);
                var u = e._ellipsoid,
                  m = e.rectangle;
                return l.Geometry._textureCoordinateRotationPoints(n, t, u, m);
              })(this)),
            this._textureCoordinateRotationPoints
          );
        },
      },
    }),
    (e.EllipseGeometry = S);
});
