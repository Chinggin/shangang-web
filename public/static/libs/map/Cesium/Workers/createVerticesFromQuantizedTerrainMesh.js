define([
  './AxisAlignedBoundingBox-1feb0c48',
  './Matrix2-f2da41d4',
  './when-229515d6',
  './TerrainEncoding-6355a4fe',
  './IndexDatatype-b10faa0b',
  './ComponentDatatype-17b06483',
  './RuntimeError-ffe03243',
  './Transforms-7cd3197b',
  './WebMercatorProjection-d69cec15',
  './createTaskProcessorWorker',
  './AttributeCompression-0af3c035',
  './WebGLConstants-4e26b85a',
  './combine-8ce3f24b',
], function (e, t, r, i, n, o, a, s, d, c, h, u, I) {
  'use strict';
  function l() {
    a.DeveloperError.throwInstantiationError();
  }
  Object.defineProperties(l.prototype, {
    errorEvent: { get: a.DeveloperError.throwInstantiationError },
    credit: { get: a.DeveloperError.throwInstantiationError },
    tilingScheme: { get: a.DeveloperError.throwInstantiationError },
    ready: { get: a.DeveloperError.throwInstantiationError },
    readyPromise: { get: a.DeveloperError.throwInstantiationError },
    hasWaterMask: { get: a.DeveloperError.throwInstantiationError },
    hasVertexNormals: { get: a.DeveloperError.throwInstantiationError },
    availability: { get: a.DeveloperError.throwInstantiationError },
  });
  var g = [];
  l.getRegularGridIndices = function (e, t) {
    var i = g[e];
    r.defined(i) || (g[e] = i = []);
    var n = i[t];
    return (
      r.defined(n) ||
        E(
          e,
          t,
          (n =
            e * t < o.CesiumMath.SIXTY_FOUR_KILOBYTES
              ? (i[t] = new Uint16Array((e - 1) * (t - 1) * 6))
              : (i[t] = new Uint32Array((e - 1) * (t - 1) * 6))),
          0
        ),
      n
    );
  };
  var m = [];
  l.getRegularGridIndicesAndEdgeIndices = function (e, t) {
    var i = m[e];
    r.defined(i) || (m[e] = i = []);
    var n = i[t];
    if (!r.defined(n)) {
      var o = l.getRegularGridIndices(e, t),
        a = f(e, t),
        s = a.westIndicesSouthToNorth,
        d = a.southIndicesEastToWest,
        c = a.eastIndicesNorthToSouth,
        h = a.northIndicesWestToEast;
      n = i[t] = {
        indices: o,
        westIndicesSouthToNorth: s,
        southIndicesEastToWest: d,
        eastIndicesNorthToSouth: c,
        northIndicesWestToEast: h,
      };
    }
    return n;
  };
  var T = [];
  function f(e, t) {
    var r,
      i = new Array(t),
      n = new Array(e),
      o = new Array(t),
      a = new Array(e);
    for (r = 0; r < e; ++r) (a[r] = r), (n[r] = e * t - 1 - r);
    for (r = 0; r < t; ++r) (o[r] = (r + 1) * e - 1), (i[r] = (t - r - 1) * e);
    return {
      westIndicesSouthToNorth: i,
      southIndicesEastToWest: n,
      eastIndicesNorthToSouth: o,
      northIndicesWestToEast: a,
    };
  }
  function E(e, t, r, i) {
    for (var n = 0, o = 0; o < t - 1; ++o) {
      for (var a = 0; a < e - 1; ++a) {
        var s = n,
          d = s + e,
          c = d + 1,
          h = s + 1;
        (r[i++] = s), (r[i++] = d), (r[i++] = h), (r[i++] = h), (r[i++] = d), (r[i++] = c), ++n;
      }
      ++n;
    }
  }
  function v(e, t, r, i) {
    for (var n = e[0], o = e.length, a = 1; a < o; ++a) {
      var s = e[a];
      (r[i++] = n),
        (r[i++] = s),
        (r[i++] = t),
        (r[i++] = t),
        (r[i++] = s),
        (r[i++] = t + 1),
        (n = s),
        ++t;
    }
    return i;
  }
  (l.getRegularGridAndSkirtIndicesAndEdgeIndices = function (e, t) {
    var i = T[e];
    r.defined(i) || (T[e] = i = []);
    var o = i[t];
    if (!r.defined(o)) {
      var a = e * t,
        s = (e - 1) * (t - 1) * 6,
        d = 2 * e + 2 * t,
        c = a + d,
        h = s + 6 * Math.max(0, d - 4),
        u = f(e, t),
        I = u.westIndicesSouthToNorth,
        g = u.southIndicesEastToWest,
        m = u.eastIndicesNorthToSouth,
        v = u.northIndicesWestToEast,
        p = n.IndexDatatype.createTypedArray(c, h);
      E(e, t, p, 0),
        l.addSkirtIndices(I, g, m, v, a, p, s),
        (o = i[t] =
          {
            indices: p,
            westIndicesSouthToNorth: I,
            southIndicesEastToWest: g,
            eastIndicesNorthToSouth: m,
            northIndicesWestToEast: v,
            indexCountWithoutSkirts: s,
          });
    }
    return o;
  }),
    (l.addSkirtIndices = function (e, t, r, i, n, o, a) {
      var s = n;
      (a = v(e, s, o, a)),
        (a = v(t, (s += e.length), o, a)),
        (a = v(r, (s += t.length), o, a)),
        v(i, (s += r.length), o, a);
    }),
    (l.heightmapTerrainQuality = 0.25),
    (l.getEstimatedLevelZeroGeometricErrorForAHeightmap = function (e, t, r) {
      return (2 * e.maximumRadius * Math.PI * l.heightmapTerrainQuality) / (t * r);
    }),
    (l.prototype.requestTileGeometry = a.DeveloperError.throwInstantiationError),
    (l.prototype.getLevelMaximumGeometricError = a.DeveloperError.throwInstantiationError),
    (l.prototype.getTileDataAvailable = a.DeveloperError.throwInstantiationError),
    (l.prototype.loadTileDataAvailability = a.DeveloperError.throwInstantiationError);
  var p = 32767,
    y = new t.Cartesian3(),
    N = new t.Cartesian3(),
    w = new t.Cartesian3(),
    S = new t.Cartographic(),
    b = new t.Cartesian2();
  function M(e, r, i, n, a, s, d, c, h) {
    var u = Number.POSITIVE_INFINITY,
      I = a.north,
      l = a.south,
      g = a.east,
      m = a.west;
    g < m && (g += o.CesiumMath.TWO_PI);
    for (var T = e.length, f = 0; f < T; ++f) {
      var E = e[f],
        v = i[E],
        p = n[E];
      (S.longitude = o.CesiumMath.lerp(m, g, p.x)),
        (S.latitude = o.CesiumMath.lerp(l, I, p.y)),
        (S.height = v - r);
      var N = s.cartographicToCartesian(S, y);
      t.Matrix4.multiplyByPoint(d, N, N),
        t.Cartesian3.minimumByComponent(N, c, c),
        t.Cartesian3.maximumByComponent(N, h, h),
        (u = Math.min(u, S.height));
    }
    return u;
  }
  function x(e, t, i, n, a, s, c, h, u, I, l, g, m, T) {
    var f = r.defined(c),
      E = u.north,
      v = u.south,
      p = u.east,
      N = u.west;
    p < N && (p += o.CesiumMath.TWO_PI);
    for (var w = i.length, M = 0; M < w; ++M) {
      var x = i[M],
        A = a[x],
        C = s[x];
      (S.longitude = o.CesiumMath.lerp(N, p, C.x) + m),
        (S.latitude = o.CesiumMath.lerp(v, E, C.y) + T),
        (S.height = A - I);
      var W,
        P,
        D = h.cartographicToCartesian(S, y);
      if (f) {
        var k = 2 * x;
        (b.x = c[k]), (b.y = c[k + 1]);
      }
      n.hasWebMercatorT &&
        (W = (d.WebMercatorProjection.geodeticLatitudeToMercatorAngle(S.latitude) - l) * g),
        n.hasGeodeticSurfaceNormals && (P = h.geodeticSurfaceNormal(D)),
        (t = n.encode(e, t, D, C, S.height, b, W, P));
    }
  }
  function A(e, t) {
    var i;
    return (
      'function' == typeof e.slice && 'function' != typeof (i = e.slice()).sort && (i = void 0),
      r.defined(i) || (i = Array.prototype.slice.call(e)),
      i.sort(t),
      i
    );
  }
  return c(function (a, c) {
    var h,
      u,
      I = a.quantizedVertices,
      g = I.length / 3,
      m = a.octEncodedNormals,
      T =
        a.westIndices.length + a.eastIndices.length + a.southIndices.length + a.northIndices.length,
      f = a.includeWebMercatorT,
      E = a.exaggeration,
      v = a.exaggerationRelativeHeight,
      C = 1 !== E,
      W = t.Rectangle.clone(a.rectangle),
      P = W.west,
      D = W.south,
      k = W.east,
      F = W.north,
      H = t.Ellipsoid.clone(a.ellipsoid),
      _ = a.minimumHeight,
      G = a.maximumHeight,
      V = a.relativeToCenter,
      Y = s.Transforms.eastNorthUpToFixedFrame(V, H),
      O = t.Matrix4.inverseTransformation(Y, new t.Matrix4());
    f &&
      ((h = d.WebMercatorProjection.geodeticLatitudeToMercatorAngle(D)),
      (u = 1 / (d.WebMercatorProjection.geodeticLatitudeToMercatorAngle(F) - h)));
    var B = I.subarray(0, g),
      R = I.subarray(g, 2 * g),
      L = I.subarray(2 * g, 3 * g),
      j = r.defined(m),
      U = new Array(g),
      z = new Array(g),
      q = new Array(g),
      Q = f ? new Array(g) : [],
      K = C ? new Array(g) : [],
      X = N;
    (X.x = Number.POSITIVE_INFINITY),
      (X.y = Number.POSITIVE_INFINITY),
      (X.z = Number.POSITIVE_INFINITY);
    var Z = w;
    (Z.x = Number.NEGATIVE_INFINITY),
      (Z.y = Number.NEGATIVE_INFINITY),
      (Z.z = Number.NEGATIVE_INFINITY);
    for (
      var J = Number.POSITIVE_INFINITY,
        $ = Number.NEGATIVE_INFINITY,
        ee = Number.POSITIVE_INFINITY,
        te = Number.NEGATIVE_INFINITY,
        re = 0;
      re < g;
      ++re
    ) {
      var ie = B[re],
        ne = R[re],
        oe = ie / p,
        ae = ne / p,
        se = o.CesiumMath.lerp(_, G, L[re] / p);
      (S.longitude = o.CesiumMath.lerp(P, k, oe)),
        (S.latitude = o.CesiumMath.lerp(D, F, ae)),
        (S.height = se),
        (J = Math.min(S.longitude, J)),
        ($ = Math.max(S.longitude, $)),
        (ee = Math.min(S.latitude, ee)),
        (te = Math.max(S.latitude, te));
      var de = H.cartographicToCartesian(S);
      (U[re] = new t.Cartesian2(oe, ae)),
        (z[re] = se),
        (q[re] = de),
        f &&
          (Q[re] = (d.WebMercatorProjection.geodeticLatitudeToMercatorAngle(S.latitude) - h) * u),
        C && (K[re] = H.geodeticSurfaceNormal(de)),
        t.Matrix4.multiplyByPoint(O, de, y),
        t.Cartesian3.minimumByComponent(y, X, X),
        t.Cartesian3.maximumByComponent(y, Z, Z);
    }
    var ce,
      he = A(a.westIndices, function (e, t) {
        return U[e].y - U[t].y;
      }),
      ue = A(a.eastIndices, function (e, t) {
        return U[t].y - U[e].y;
      }),
      Ie = A(a.southIndices, function (e, t) {
        return U[t].x - U[e].x;
      }),
      le = A(a.northIndices, function (e, t) {
        return U[e].x - U[t].x;
      });
    _ < 0 &&
      (ce = new i.EllipsoidalOccluder(H).computeHorizonCullingPointPossiblyUnderEllipsoid(V, q, _));
    var ge = _;
    (ge = Math.min(ge, M(a.westIndices, a.westSkirtHeight, z, U, W, H, O, X, Z))),
      (ge = Math.min(ge, M(a.southIndices, a.southSkirtHeight, z, U, W, H, O, X, Z))),
      (ge = Math.min(ge, M(a.eastIndices, a.eastSkirtHeight, z, U, W, H, O, X, Z))),
      (ge = Math.min(ge, M(a.northIndices, a.northSkirtHeight, z, U, W, H, O, X, Z)));
    for (
      var me = new e.AxisAlignedBoundingBox(X, Z, V),
        Te = new i.TerrainEncoding(V, me, ge, G, Y, j, f, C, E, v),
        fe = Te.stride,
        Ee = new Float32Array(g * fe + T * fe),
        ve = 0,
        pe = 0;
      pe < g;
      ++pe
    ) {
      if (j) {
        var ye = 2 * pe;
        (b.x = m[ye]), (b.y = m[ye + 1]);
      }
      ve = Te.encode(Ee, ve, q[pe], U[pe], z[pe], b, Q[pe], K[pe]);
    }
    var Ne = Math.max(0, 2 * (T - 4)),
      we = a.indices.length + 3 * Ne,
      Se = n.IndexDatatype.createTypedArray(g + T, we);
    Se.set(a.indices, 0);
    var be = 1e-4,
      Me = ($ - J) * be,
      xe = (te - ee) * be,
      Ae = -Me,
      Ce = Me,
      We = xe,
      Pe = -xe,
      De = g * fe;
    return (
      x(Ee, De, he, Te, z, U, m, H, W, a.westSkirtHeight, h, u, Ae, 0),
      x(
        Ee,
        (De += a.westIndices.length * fe),
        Ie,
        Te,
        z,
        U,
        m,
        H,
        W,
        a.southSkirtHeight,
        h,
        u,
        0,
        Pe
      ),
      x(
        Ee,
        (De += a.southIndices.length * fe),
        ue,
        Te,
        z,
        U,
        m,
        H,
        W,
        a.eastSkirtHeight,
        h,
        u,
        Ce,
        0
      ),
      x(
        Ee,
        (De += a.eastIndices.length * fe),
        le,
        Te,
        z,
        U,
        m,
        H,
        W,
        a.northSkirtHeight,
        h,
        u,
        0,
        We
      ),
      l.addSkirtIndices(he, Ie, ue, le, g, Se, a.indices.length),
      c.push(Ee.buffer, Se.buffer),
      {
        vertices: Ee.buffer,
        indices: Se.buffer,
        westIndicesSouthToNorth: he,
        southIndicesEastToWest: Ie,
        eastIndicesNorthToSouth: ue,
        northIndicesWestToEast: le,
        vertexStride: fe,
        center: V,
        minimumHeight: _,
        maximumHeight: G,
        occludeePointInScaledSpace: ce,
        encoding: Te,
        indexCountWithoutSkirts: a.indices.length,
      }
    );
  });
});
