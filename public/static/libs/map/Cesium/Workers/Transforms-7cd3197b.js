define([
  'exports',
  './Matrix2-f2da41d4',
  './RuntimeError-ffe03243',
  './when-229515d6',
  './ComponentDatatype-17b06483',
  './combine-8ce3f24b',
], function (e, t, r, n, a, i) {
  'use strict';
  function o(e) {
    (this._ellipsoid = n.defaultValue(e, t.Ellipsoid.WGS84)),
      (this._semimajorAxis = this._ellipsoid.maximumRadius),
      (this._oneOverSemimajorAxis = 1 / this._semimajorAxis);
  }
  Object.defineProperties(o.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid;
      },
    },
  }),
    (o.prototype.project = function (e, r) {
      var a = this._semimajorAxis,
        i = e.longitude * a,
        o = e.latitude * a,
        s = e.height;
      return n.defined(r) ? ((r.x = i), (r.y = o), (r.z = s), r) : new t.Cartesian3(i, o, s);
    }),
    (o.prototype.unproject = function (e, r) {
      var a = this._oneOverSemimajorAxis,
        i = e.x * a,
        o = e.y * a,
        s = e.z;
      return n.defined(r)
        ? ((r.longitude = i), (r.latitude = o), (r.height = s), r)
        : new t.Cartographic(i, o, s);
    });
  var s = Object.freeze({ OUTSIDE: -1, INTERSECTING: 0, INSIDE: 1 });
  function u(e, t) {
    (this.start = n.defaultValue(e, 0)), (this.stop = n.defaultValue(t, 0));
  }
  function l(e, r) {
    (this.center = t.Cartesian3.clone(n.defaultValue(e, t.Cartesian3.ZERO))),
      (this.radius = n.defaultValue(r, 0));
  }
  var c = new t.Cartesian3(),
    d = new t.Cartesian3(),
    f = new t.Cartesian3(),
    p = new t.Cartesian3(),
    h = new t.Cartesian3(),
    m = new t.Cartesian3(),
    g = new t.Cartesian3(),
    v = new t.Cartesian3(),
    y = new t.Cartesian3(),
    w = new t.Cartesian3(),
    C = new t.Cartesian3(),
    _ = new t.Cartesian3(),
    b = (4 / 3) * a.CesiumMath.PI;
  l.fromPoints = function (e, r) {
    if ((n.defined(r) || (r = new l()), !n.defined(e) || 0 === e.length))
      return (r.center = t.Cartesian3.clone(t.Cartesian3.ZERO, r.center)), (r.radius = 0), r;
    var a,
      i = t.Cartesian3.clone(e[0], g),
      o = t.Cartesian3.clone(i, c),
      s = t.Cartesian3.clone(i, d),
      u = t.Cartesian3.clone(i, f),
      b = t.Cartesian3.clone(i, p),
      x = t.Cartesian3.clone(i, h),
      S = t.Cartesian3.clone(i, m),
      E = e.length;
    for (a = 1; a < E; a++) {
      t.Cartesian3.clone(e[a], i);
      var A = i.x,
        O = i.y,
        I = i.z;
      A < o.x && t.Cartesian3.clone(i, o),
        A > b.x && t.Cartesian3.clone(i, b),
        O < s.y && t.Cartesian3.clone(i, s),
        O > x.y && t.Cartesian3.clone(i, x),
        I < u.z && t.Cartesian3.clone(i, u),
        I > S.z && t.Cartesian3.clone(i, S);
    }
    var R = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(b, o, v)),
      P = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(x, s, v)),
      T = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(S, u, v)),
      q = o,
      z = b,
      M = R;
    P > M && ((M = P), (q = s), (z = x)), T > M && ((M = T), (q = u), (z = S));
    var D = y;
    (D.x = 0.5 * (q.x + z.x)), (D.y = 0.5 * (q.y + z.y)), (D.z = 0.5 * (q.z + z.z));
    var U = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(z, D, v)),
      k = Math.sqrt(U),
      F = w;
    (F.x = o.x), (F.y = s.y), (F.z = u.z);
    var N = C;
    (N.x = b.x), (N.y = x.y), (N.z = S.z);
    var j = t.Cartesian3.midpoint(F, N, _),
      B = 0;
    for (a = 0; a < E; a++) {
      t.Cartesian3.clone(e[a], i);
      var V = t.Cartesian3.magnitude(t.Cartesian3.subtract(i, j, v));
      V > B && (B = V);
      var L = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(i, D, v));
      if (L > U) {
        var Q = Math.sqrt(L);
        U = (k = 0.5 * (k + Q)) * k;
        var W = Q - k;
        (D.x = (k * D.x + W * i.x) / Q),
          (D.y = (k * D.y + W * i.y) / Q),
          (D.z = (k * D.z + W * i.z) / Q);
      }
    }
    return (
      k < B
        ? (t.Cartesian3.clone(D, r.center), (r.radius = k))
        : (t.Cartesian3.clone(j, r.center), (r.radius = B)),
      r
    );
  };
  var x = new o(),
    S = new t.Cartesian3(),
    E = new t.Cartesian3(),
    A = new t.Cartographic(),
    O = new t.Cartographic();
  (l.fromRectangle2D = function (e, t, r) {
    return l.fromRectangleWithHeights2D(e, t, 0, 0, r);
  }),
    (l.fromRectangleWithHeights2D = function (e, r, a, i, o) {
      if ((n.defined(o) || (o = new l()), !n.defined(e)))
        return (o.center = t.Cartesian3.clone(t.Cartesian3.ZERO, o.center)), (o.radius = 0), o;
      (r = n.defaultValue(r, x)),
        t.Rectangle.southwest(e, A),
        (A.height = a),
        t.Rectangle.northeast(e, O),
        (O.height = i);
      var s = r.project(A, S),
        u = r.project(O, E),
        c = u.x - s.x,
        d = u.y - s.y,
        f = u.z - s.z;
      o.radius = 0.5 * Math.sqrt(c * c + d * d + f * f);
      var p = o.center;
      return (p.x = s.x + 0.5 * c), (p.y = s.y + 0.5 * d), (p.z = s.z + 0.5 * f), o;
    });
  var I = [];
  (l.fromRectangle3D = function (e, r, a, i) {
    if (
      ((r = n.defaultValue(r, t.Ellipsoid.WGS84)),
      (a = n.defaultValue(a, 0)),
      n.defined(i) || (i = new l()),
      !n.defined(e))
    )
      return (i.center = t.Cartesian3.clone(t.Cartesian3.ZERO, i.center)), (i.radius = 0), i;
    var o = t.Rectangle.subsample(e, r, a, I);
    return l.fromPoints(o, i);
  }),
    (l.fromVertices = function (e, r, a, i) {
      if ((n.defined(i) || (i = new l()), !n.defined(e) || 0 === e.length))
        return (i.center = t.Cartesian3.clone(t.Cartesian3.ZERO, i.center)), (i.radius = 0), i;
      (r = n.defaultValue(r, t.Cartesian3.ZERO)), (a = n.defaultValue(a, 3));
      var o = g;
      (o.x = e[0] + r.x), (o.y = e[1] + r.y), (o.z = e[2] + r.z);
      var s,
        u = t.Cartesian3.clone(o, c),
        b = t.Cartesian3.clone(o, d),
        x = t.Cartesian3.clone(o, f),
        S = t.Cartesian3.clone(o, p),
        E = t.Cartesian3.clone(o, h),
        A = t.Cartesian3.clone(o, m),
        O = e.length;
      for (s = 0; s < O; s += a) {
        var I = e[s] + r.x,
          R = e[s + 1] + r.y,
          P = e[s + 2] + r.z;
        (o.x = I),
          (o.y = R),
          (o.z = P),
          I < u.x && t.Cartesian3.clone(o, u),
          I > S.x && t.Cartesian3.clone(o, S),
          R < b.y && t.Cartesian3.clone(o, b),
          R > E.y && t.Cartesian3.clone(o, E),
          P < x.z && t.Cartesian3.clone(o, x),
          P > A.z && t.Cartesian3.clone(o, A);
      }
      var T = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(S, u, v)),
        q = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(E, b, v)),
        z = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(A, x, v)),
        M = u,
        D = S,
        U = T;
      q > U && ((U = q), (M = b), (D = E)), z > U && ((U = z), (M = x), (D = A));
      var k = y;
      (k.x = 0.5 * (M.x + D.x)), (k.y = 0.5 * (M.y + D.y)), (k.z = 0.5 * (M.z + D.z));
      var F = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(D, k, v)),
        N = Math.sqrt(F),
        j = w;
      (j.x = u.x), (j.y = b.y), (j.z = x.z);
      var B = C;
      (B.x = S.x), (B.y = E.y), (B.z = A.z);
      var V = t.Cartesian3.midpoint(j, B, _),
        L = 0;
      for (s = 0; s < O; s += a) {
        (o.x = e[s] + r.x), (o.y = e[s + 1] + r.y), (o.z = e[s + 2] + r.z);
        var Q = t.Cartesian3.magnitude(t.Cartesian3.subtract(o, V, v));
        Q > L && (L = Q);
        var W = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(o, k, v));
        if (W > F) {
          var H = Math.sqrt(W);
          F = (N = 0.5 * (N + H)) * N;
          var Y = H - N;
          (k.x = (N * k.x + Y * o.x) / H),
            (k.y = (N * k.y + Y * o.y) / H),
            (k.z = (N * k.z + Y * o.z) / H);
        }
      }
      return (
        N < L
          ? (t.Cartesian3.clone(k, i.center), (i.radius = N))
          : (t.Cartesian3.clone(V, i.center), (i.radius = L)),
        i
      );
    }),
    (l.fromEncodedCartesianVertices = function (e, r, a) {
      if (
        (n.defined(a) || (a = new l()),
        !n.defined(e) || !n.defined(r) || e.length !== r.length || 0 === e.length)
      )
        return (a.center = t.Cartesian3.clone(t.Cartesian3.ZERO, a.center)), (a.radius = 0), a;
      var i = g;
      (i.x = e[0] + r[0]), (i.y = e[1] + r[1]), (i.z = e[2] + r[2]);
      var o,
        s = t.Cartesian3.clone(i, c),
        u = t.Cartesian3.clone(i, d),
        b = t.Cartesian3.clone(i, f),
        x = t.Cartesian3.clone(i, p),
        S = t.Cartesian3.clone(i, h),
        E = t.Cartesian3.clone(i, m),
        A = e.length;
      for (o = 0; o < A; o += 3) {
        var O = e[o] + r[o],
          I = e[o + 1] + r[o + 1],
          R = e[o + 2] + r[o + 2];
        (i.x = O),
          (i.y = I),
          (i.z = R),
          O < s.x && t.Cartesian3.clone(i, s),
          O > x.x && t.Cartesian3.clone(i, x),
          I < u.y && t.Cartesian3.clone(i, u),
          I > S.y && t.Cartesian3.clone(i, S),
          R < b.z && t.Cartesian3.clone(i, b),
          R > E.z && t.Cartesian3.clone(i, E);
      }
      var P = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(x, s, v)),
        T = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(S, u, v)),
        q = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(E, b, v)),
        z = s,
        M = x,
        D = P;
      T > D && ((D = T), (z = u), (M = S)), q > D && ((D = q), (z = b), (M = E));
      var U = y;
      (U.x = 0.5 * (z.x + M.x)), (U.y = 0.5 * (z.y + M.y)), (U.z = 0.5 * (z.z + M.z));
      var k = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(M, U, v)),
        F = Math.sqrt(k),
        N = w;
      (N.x = s.x), (N.y = u.y), (N.z = b.z);
      var j = C;
      (j.x = x.x), (j.y = S.y), (j.z = E.z);
      var B = t.Cartesian3.midpoint(N, j, _),
        V = 0;
      for (o = 0; o < A; o += 3) {
        (i.x = e[o] + r[o]), (i.y = e[o + 1] + r[o + 1]), (i.z = e[o + 2] + r[o + 2]);
        var L = t.Cartesian3.magnitude(t.Cartesian3.subtract(i, B, v));
        L > V && (V = L);
        var Q = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(i, U, v));
        if (Q > k) {
          var W = Math.sqrt(Q);
          k = (F = 0.5 * (F + W)) * F;
          var H = W - F;
          (U.x = (F * U.x + H * i.x) / W),
            (U.y = (F * U.y + H * i.y) / W),
            (U.z = (F * U.z + H * i.z) / W);
        }
      }
      return (
        F < V
          ? (t.Cartesian3.clone(U, a.center), (a.radius = F))
          : (t.Cartesian3.clone(B, a.center), (a.radius = V)),
        a
      );
    }),
    (l.fromCornerPoints = function (e, r, a) {
      n.defined(a) || (a = new l());
      var i = t.Cartesian3.midpoint(e, r, a.center);
      return (a.radius = t.Cartesian3.distance(i, r)), a;
    }),
    (l.fromEllipsoid = function (e, r) {
      return (
        n.defined(r) || (r = new l()),
        t.Cartesian3.clone(t.Cartesian3.ZERO, r.center),
        (r.radius = e.maximumRadius),
        r
      );
    });
  var R = new t.Cartesian3();
  l.fromBoundingSpheres = function (e, r) {
    if ((n.defined(r) || (r = new l()), !n.defined(e) || 0 === e.length))
      return (r.center = t.Cartesian3.clone(t.Cartesian3.ZERO, r.center)), (r.radius = 0), r;
    var a = e.length;
    if (1 === a) return l.clone(e[0], r);
    if (2 === a) return l.union(e[0], e[1], r);
    var i,
      o = [];
    for (i = 0; i < a; i++) o.push(e[i].center);
    var s = (r = l.fromPoints(o, r)).center,
      u = r.radius;
    for (i = 0; i < a; i++) {
      var c = e[i];
      u = Math.max(u, t.Cartesian3.distance(s, c.center, R) + c.radius);
    }
    return (r.radius = u), r;
  };
  var P = new t.Cartesian3(),
    T = new t.Cartesian3(),
    q = new t.Cartesian3();
  (l.fromOrientedBoundingBox = function (e, r) {
    n.defined(r) || (r = new l());
    var a = e.halfAxes,
      i = t.Matrix3.getColumn(a, 0, P),
      o = t.Matrix3.getColumn(a, 1, T),
      s = t.Matrix3.getColumn(a, 2, q);
    return (
      t.Cartesian3.add(i, o, i),
      t.Cartesian3.add(i, s, i),
      (r.center = t.Cartesian3.clone(e.center, r.center)),
      (r.radius = t.Cartesian3.magnitude(i)),
      r
    );
  }),
    (l.clone = function (e, r) {
      if (n.defined(e))
        return n.defined(r)
          ? ((r.center = t.Cartesian3.clone(e.center, r.center)), (r.radius = e.radius), r)
          : new l(e.center, e.radius);
    }),
    (l.packedLength = 4),
    (l.pack = function (e, t, r) {
      r = n.defaultValue(r, 0);
      var a = e.center;
      return (t[r++] = a.x), (t[r++] = a.y), (t[r++] = a.z), (t[r] = e.radius), t;
    }),
    (l.unpack = function (e, t, r) {
      (t = n.defaultValue(t, 0)), n.defined(r) || (r = new l());
      var a = r.center;
      return (a.x = e[t++]), (a.y = e[t++]), (a.z = e[t++]), (r.radius = e[t]), r;
    });
  var z = new t.Cartesian3(),
    M = new t.Cartesian3();
  l.union = function (e, r, a) {
    n.defined(a) || (a = new l());
    var i = e.center,
      o = e.radius,
      s = r.center,
      u = r.radius,
      c = t.Cartesian3.subtract(s, i, z),
      d = t.Cartesian3.magnitude(c);
    if (o >= d + u) return e.clone(a), a;
    if (u >= d + o) return r.clone(a), a;
    var f = 0.5 * (o + d + u),
      p = t.Cartesian3.multiplyByScalar(c, (-o + f) / d, M);
    return t.Cartesian3.add(p, i, p), t.Cartesian3.clone(p, a.center), (a.radius = f), a;
  };
  var D = new t.Cartesian3();
  (l.expand = function (e, r, n) {
    n = l.clone(e, n);
    var a = t.Cartesian3.magnitude(t.Cartesian3.subtract(r, n.center, D));
    return a > n.radius && (n.radius = a), n;
  }),
    (l.intersectPlane = function (e, r) {
      var n = e.center,
        a = e.radius,
        i = r.normal,
        o = t.Cartesian3.dot(i, n) + r.distance;
      return o < -a ? s.OUTSIDE : o < a ? s.INTERSECTING : s.INSIDE;
    }),
    (l.transform = function (e, r, a) {
      return (
        n.defined(a) || (a = new l()),
        (a.center = t.Matrix4.multiplyByPoint(r, e.center, a.center)),
        (a.radius = t.Matrix4.getMaximumScale(r) * e.radius),
        a
      );
    });
  var U = new t.Cartesian3();
  (l.distanceSquaredTo = function (e, r) {
    var n = t.Cartesian3.subtract(e.center, r, U),
      a = t.Cartesian3.magnitude(n) - e.radius;
    return a <= 0 ? 0 : a * a;
  }),
    (l.transformWithoutScale = function (e, r, a) {
      return (
        n.defined(a) || (a = new l()),
        (a.center = t.Matrix4.multiplyByPoint(r, e.center, a.center)),
        (a.radius = e.radius),
        a
      );
    });
  var k = new t.Cartesian3();
  l.computePlaneDistances = function (e, r, a, i) {
    n.defined(i) || (i = new u());
    var o = t.Cartesian3.subtract(e.center, r, k),
      s = t.Cartesian3.dot(a, o);
    return (i.start = s - e.radius), (i.stop = s + e.radius), i;
  };
  for (
    var F = new t.Cartesian3(),
      N = new t.Cartesian3(),
      j = new t.Cartesian3(),
      B = new t.Cartesian3(),
      V = new t.Cartesian3(),
      L = new t.Cartographic(),
      Q = new Array(8),
      W = 0;
    W < 8;
    ++W
  )
    Q[W] = new t.Cartesian3();
  var H,
    Y = new o();
  (l.projectTo2D = function (e, r, a) {
    var i,
      o = (r = n.defaultValue(r, Y)).ellipsoid,
      s = e.center,
      u = e.radius;
    i = t.Cartesian3.equals(s, t.Cartesian3.ZERO)
      ? t.Cartesian3.clone(t.Cartesian3.UNIT_X, F)
      : o.geodeticSurfaceNormal(s, F);
    var c = t.Cartesian3.cross(t.Cartesian3.UNIT_Z, i, N);
    t.Cartesian3.normalize(c, c);
    var d = t.Cartesian3.cross(i, c, j);
    t.Cartesian3.normalize(d, d),
      t.Cartesian3.multiplyByScalar(i, u, i),
      t.Cartesian3.multiplyByScalar(d, u, d),
      t.Cartesian3.multiplyByScalar(c, u, c);
    var f = t.Cartesian3.negate(d, V),
      p = t.Cartesian3.negate(c, B),
      h = Q,
      m = h[0];
    t.Cartesian3.add(i, d, m),
      t.Cartesian3.add(m, c, m),
      (m = h[1]),
      t.Cartesian3.add(i, d, m),
      t.Cartesian3.add(m, p, m),
      (m = h[2]),
      t.Cartesian3.add(i, f, m),
      t.Cartesian3.add(m, p, m),
      (m = h[3]),
      t.Cartesian3.add(i, f, m),
      t.Cartesian3.add(m, c, m),
      t.Cartesian3.negate(i, i),
      (m = h[4]),
      t.Cartesian3.add(i, d, m),
      t.Cartesian3.add(m, c, m),
      (m = h[5]),
      t.Cartesian3.add(i, d, m),
      t.Cartesian3.add(m, p, m),
      (m = h[6]),
      t.Cartesian3.add(i, f, m),
      t.Cartesian3.add(m, p, m),
      (m = h[7]),
      t.Cartesian3.add(i, f, m),
      t.Cartesian3.add(m, c, m);
    for (var g = h.length, v = 0; v < g; ++v) {
      var y = h[v];
      t.Cartesian3.add(s, y, y);
      var w = o.cartesianToCartographic(y, L);
      r.project(w, y);
    }
    var C = (s = (a = l.fromPoints(h, a)).center).x,
      _ = s.y,
      b = s.z;
    return (s.x = b), (s.y = C), (s.z = _), a;
  }),
    (l.isOccluded = function (e, t) {
      return !t.isBoundingSphereVisible(e);
    }),
    (l.equals = function (e, r) {
      return (
        e === r ||
        (n.defined(e) &&
          n.defined(r) &&
          t.Cartesian3.equals(e.center, r.center) &&
          e.radius === r.radius)
      );
    }),
    (l.prototype.intersectPlane = function (e) {
      return l.intersectPlane(this, e);
    }),
    (l.prototype.distanceSquaredTo = function (e) {
      return l.distanceSquaredTo(this, e);
    }),
    (l.prototype.computePlaneDistances = function (e, t, r) {
      return l.computePlaneDistances(this, e, t, r);
    }),
    (l.prototype.isOccluded = function (e) {
      return l.isOccluded(this, e);
    }),
    (l.prototype.equals = function (e) {
      return l.equals(this, e);
    }),
    (l.prototype.clone = function (e) {
      return l.clone(this, e);
    }),
    (l.prototype.volume = function () {
      var e = this.radius;
      return b * e * e * e;
    });
  var Z,
    G,
    J,
    $,
    X,
    K,
    ee,
    te,
    re,
    ne,
    ae,
    ie,
    oe,
    se,
    ue,
    le,
    ce,
    de = {
      requestFullscreen: void 0,
      exitFullscreen: void 0,
      fullscreenEnabled: void 0,
      fullscreenElement: void 0,
      fullscreenchange: void 0,
      fullscreenerror: void 0,
    },
    fe = {};
  function pe(e) {
    for (var t = e.split('.'), r = 0, n = t.length; r < n; ++r) t[r] = parseInt(t[r], 10);
    return t;
  }
  function he() {
    if (!n.defined(G) && ((G = !1), !ye())) {
      var e = / Chrome\/([\.0-9]+)/.exec(Z.userAgent);
      null !== e && ((G = !0), (J = pe(e[1])));
    }
    return G;
  }
  function me() {
    if (!n.defined($) && (($ = !1), !he() && !ye() && / Safari\/[\.0-9]+/.test(Z.userAgent))) {
      var e = / Version\/([\.0-9]+)/.exec(Z.userAgent);
      null !== e && (($ = !0), (X = pe(e[1])));
    }
    return $;
  }
  function ge() {
    if (!n.defined(K)) {
      K = !1;
      var e = / AppleWebKit\/([\.0-9]+)(\+?)/.exec(Z.userAgent);
      null !== e && ((K = !0), ((ee = pe(e[1])).isNightly = !!e[2]));
    }
    return K;
  }
  function ve() {
    var e;
    n.defined(te) ||
      ((te = !1),
      'Microsoft Internet Explorer' === Z.appName
        ? null !== (e = /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(Z.userAgent)) &&
          ((te = !0), (re = pe(e[1])))
        : 'Netscape' === Z.appName &&
          null !== (e = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(Z.userAgent)) &&
          ((te = !0), (re = pe(e[1]))));
    return te;
  }
  function ye() {
    if (!n.defined(ne)) {
      ne = !1;
      var e = / Edge\/([\.0-9]+)/.exec(Z.userAgent);
      null !== e && ((ne = !0), (ae = pe(e[1])));
    }
    return ne;
  }
  function we() {
    if (!n.defined(ie)) {
      ie = !1;
      var e = /Firefox\/([\.0-9]+)/.exec(Z.userAgent);
      null !== e && ((ie = !0), (oe = pe(e[1])));
    }
    return ie;
  }
  function Ce() {
    if (!n.defined(ce)) {
      var e = document.createElement('canvas');
      e.setAttribute('style', 'image-rendering: -moz-crisp-edges;image-rendering: pixelated;');
      var t = e.style.imageRendering;
      (ce = n.defined(t) && '' !== t) && (le = t);
    }
    return ce;
  }
  function _e() {
    return _e._result;
  }
  Object.defineProperties(fe, {
    element: {
      get: function () {
        if (fe.supportsFullscreen()) return document[de.fullscreenElement];
      },
    },
    changeEventName: {
      get: function () {
        if (fe.supportsFullscreen()) return de.fullscreenchange;
      },
    },
    errorEventName: {
      get: function () {
        if (fe.supportsFullscreen()) return de.fullscreenerror;
      },
    },
    enabled: {
      get: function () {
        if (fe.supportsFullscreen()) return document[de.fullscreenEnabled];
      },
    },
    fullscreen: {
      get: function () {
        if (fe.supportsFullscreen()) return null !== fe.element;
      },
    },
  }),
    (fe.supportsFullscreen = function () {
      if (n.defined(H)) return H;
      H = !1;
      var e = document.body;
      if ('function' == typeof e.requestFullscreen)
        return (
          (de.requestFullscreen = 'requestFullscreen'),
          (de.exitFullscreen = 'exitFullscreen'),
          (de.fullscreenEnabled = 'fullscreenEnabled'),
          (de.fullscreenElement = 'fullscreenElement'),
          (de.fullscreenchange = 'fullscreenchange'),
          (de.fullscreenerror = 'fullscreenerror'),
          (H = !0)
        );
      for (var t, r = ['webkit', 'moz', 'o', 'ms', 'khtml'], a = 0, i = r.length; a < i; ++a) {
        var o = r[a];
        ('function' == typeof e[(t = o + 'RequestFullscreen')] ||
          'function' == typeof e[(t = o + 'RequestFullScreen')]) &&
          ((de.requestFullscreen = t), (H = !0)),
          (t = o + 'ExitFullscreen'),
          'function' == typeof document[t]
            ? (de.exitFullscreen = t)
            : ((t = o + 'CancelFullScreen'),
              'function' == typeof document[t] && (de.exitFullscreen = t)),
          (t = o + 'FullscreenEnabled'),
          void 0 !== document[t]
            ? (de.fullscreenEnabled = t)
            : ((t = o + 'FullScreenEnabled'), void 0 !== document[t] && (de.fullscreenEnabled = t)),
          (t = o + 'FullscreenElement'),
          void 0 !== document[t]
            ? (de.fullscreenElement = t)
            : ((t = o + 'FullScreenElement'), void 0 !== document[t] && (de.fullscreenElement = t)),
          (t = o + 'fullscreenchange'),
          void 0 !== document['on' + t] &&
            ('ms' === o && (t = 'MSFullscreenChange'), (de.fullscreenchange = t)),
          (t = o + 'fullscreenerror'),
          void 0 !== document['on' + t] &&
            ('ms' === o && (t = 'MSFullscreenError'), (de.fullscreenerror = t));
      }
      return H;
    }),
    (fe.requestFullscreen = function (e, t) {
      fe.supportsFullscreen() && e[de.requestFullscreen]({ vrDisplay: t });
    }),
    (fe.exitFullscreen = function () {
      fe.supportsFullscreen() && document[de.exitFullscreen]();
    }),
    (fe._names = de),
    (Z = 'undefined' != typeof navigator ? navigator : {}),
    (_e._promise = void 0),
    (_e._result = void 0),
    (_e.initialize = function () {
      if (n.defined(_e._promise)) return _e._promise;
      var e = n.when.defer();
      if (((_e._promise = e.promise), ye()))
        return (_e._result = !1), e.resolve(_e._result), e.promise;
      var t = new Image();
      return (
        (t.onload = function () {
          (_e._result = t.width > 0 && t.height > 0), e.resolve(_e._result);
        }),
        (t.onerror = function () {
          (_e._result = !1), e.resolve(_e._result);
        }),
        (t.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA'),
        e.promise
      );
    }),
    Object.defineProperties(_e, {
      initialized: {
        get: function () {
          return n.defined(_e._result);
        },
      },
    });
  var be = [];
  'undefined' != typeof ArrayBuffer &&
    (be.push(
      Int8Array,
      Uint8Array,
      Int16Array,
      Uint16Array,
      Int32Array,
      Uint32Array,
      Float32Array,
      Float64Array
    ),
    'undefined' != typeof Uint8ClampedArray && be.push(Uint8ClampedArray),
    'undefined' != typeof Uint8ClampedArray && be.push(Uint8ClampedArray),
    'undefined' != typeof BigInt64Array && be.push(BigInt64Array),
    'undefined' != typeof BigUint64Array && be.push(BigUint64Array));
  var xe = {
    isChrome: he,
    chromeVersion: function () {
      return he() && J;
    },
    isSafari: me,
    safariVersion: function () {
      return me() && X;
    },
    isWebkit: ge,
    webkitVersion: function () {
      return ge() && ee;
    },
    isInternetExplorer: ve,
    internetExplorerVersion: function () {
      return ve() && re;
    },
    isEdge: ye,
    edgeVersion: function () {
      return ye() && ae;
    },
    isFirefox: we,
    firefoxVersion: function () {
      return we() && oe;
    },
    isWindows: function () {
      return n.defined(se) || (se = /Windows/i.test(Z.appVersion)), se;
    },
    hardwareConcurrency: n.defaultValue(Z.hardwareConcurrency, 3),
    supportsPointerEvents: function () {
      return (
        n.defined(ue) ||
          (ue =
            !we() &&
            'undefined' != typeof PointerEvent &&
            (!n.defined(Z.pointerEnabled) || Z.pointerEnabled)),
        ue
      );
    },
    supportsImageRenderingPixelated: Ce,
    supportsWebP: _e,
    imageRenderingValue: function () {
      return Ce() ? le : void 0;
    },
    typedArrayTypes: be,
  };
  function Se(e, t, r, a) {
    (this.x = n.defaultValue(e, 0)),
      (this.y = n.defaultValue(t, 0)),
      (this.z = n.defaultValue(r, 0)),
      (this.w = n.defaultValue(a, 0));
  }
  (xe.supportsBasis = function (e) {
    return xe.supportsWebAssembly() && e.context.supportsBasis;
  }),
    (xe.supportsFullscreen = function () {
      return fe.supportsFullscreen();
    }),
    (xe.supportsTypedArrays = function () {
      return 'undefined' != typeof ArrayBuffer;
    }),
    (xe.supportsBigInt64Array = function () {
      return 'undefined' != typeof BigInt64Array;
    }),
    (xe.supportsBigUint64Array = function () {
      return 'undefined' != typeof BigUint64Array;
    }),
    (xe.supportsBigInt = function () {
      return 'undefined' != typeof BigInt;
    }),
    (xe.supportsWebWorkers = function () {
      return 'undefined' != typeof Worker;
    }),
    (xe.supportsWebAssembly = function () {
      return 'undefined' != typeof WebAssembly && !xe.isEdge();
    });
  var Ee = new t.Cartesian3();
  Se.fromAxisAngle = function (e, r, a) {
    var i = r / 2,
      o = Math.sin(i),
      s = (Ee = t.Cartesian3.normalize(e, Ee)).x * o,
      u = Ee.y * o,
      l = Ee.z * o,
      c = Math.cos(i);
    return n.defined(a) ? ((a.x = s), (a.y = u), (a.z = l), (a.w = c), a) : new Se(s, u, l, c);
  };
  var Ae = [1, 2, 0],
    Oe = new Array(3);
  Se.fromRotationMatrix = function (e, r) {
    var a,
      i,
      o,
      s,
      u,
      l = e[t.Matrix3.COLUMN0ROW0],
      c = e[t.Matrix3.COLUMN1ROW1],
      d = e[t.Matrix3.COLUMN2ROW2],
      f = l + c + d;
    if (f > 0)
      (u = 0.5 * (a = Math.sqrt(f + 1))),
        (a = 0.5 / a),
        (i = (e[t.Matrix3.COLUMN1ROW2] - e[t.Matrix3.COLUMN2ROW1]) * a),
        (o = (e[t.Matrix3.COLUMN2ROW0] - e[t.Matrix3.COLUMN0ROW2]) * a),
        (s = (e[t.Matrix3.COLUMN0ROW1] - e[t.Matrix3.COLUMN1ROW0]) * a);
    else {
      var p = 0;
      c > l && (p = 1), d > l && d > c && (p = 2);
      var h = Ae[p],
        m = Ae[h];
      a = Math.sqrt(
        e[t.Matrix3.getElementIndex(p, p)] -
          e[t.Matrix3.getElementIndex(h, h)] -
          e[t.Matrix3.getElementIndex(m, m)] +
          1
      );
      var g = Oe;
      (g[p] = 0.5 * a),
        (a = 0.5 / a),
        (u = (e[t.Matrix3.getElementIndex(m, h)] - e[t.Matrix3.getElementIndex(h, m)]) * a),
        (g[h] = (e[t.Matrix3.getElementIndex(h, p)] + e[t.Matrix3.getElementIndex(p, h)]) * a),
        (g[m] = (e[t.Matrix3.getElementIndex(m, p)] + e[t.Matrix3.getElementIndex(p, m)]) * a),
        (i = -g[0]),
        (o = -g[1]),
        (s = -g[2]);
    }
    return n.defined(r) ? ((r.x = i), (r.y = o), (r.z = s), (r.w = u), r) : new Se(i, o, s, u);
  };
  var Ie = new Se(),
    Re = new Se(),
    Pe = new Se(),
    Te = new Se();
  Se.fromHeadingPitchRoll = function (e, r) {
    return (
      (Te = Se.fromAxisAngle(t.Cartesian3.UNIT_X, e.roll, Ie)),
      (Pe = Se.fromAxisAngle(t.Cartesian3.UNIT_Y, -e.pitch, r)),
      (r = Se.multiply(Pe, Te, Pe)),
      (Re = Se.fromAxisAngle(t.Cartesian3.UNIT_Z, -e.heading, Ie)),
      Se.multiply(Re, r, r)
    );
  };
  var qe = new t.Cartesian3(),
    ze = new t.Cartesian3(),
    Me = new Se(),
    De = new Se(),
    Ue = new Se();
  (Se.packedLength = 4),
    (Se.pack = function (e, t, r) {
      return (
        (r = n.defaultValue(r, 0)), (t[r++] = e.x), (t[r++] = e.y), (t[r++] = e.z), (t[r] = e.w), t
      );
    }),
    (Se.unpack = function (e, t, r) {
      return (
        (t = n.defaultValue(t, 0)),
        n.defined(r) || (r = new Se()),
        (r.x = e[t]),
        (r.y = e[t + 1]),
        (r.z = e[t + 2]),
        (r.w = e[t + 3]),
        r
      );
    }),
    (Se.packedInterpolationLength = 3),
    (Se.convertPackedArrayForInterpolation = function (e, t, r, a) {
      Se.unpack(e, 4 * r, Ue), Se.conjugate(Ue, Ue);
      for (var i = 0, o = r - t + 1; i < o; i++) {
        var s = 3 * i;
        Se.unpack(e, 4 * (t + i), Me),
          Se.multiply(Me, Ue, Me),
          Me.w < 0 && Se.negate(Me, Me),
          Se.computeAxis(Me, qe);
        var u = Se.computeAngle(Me);
        n.defined(a) || (a = []), (a[s] = qe.x * u), (a[s + 1] = qe.y * u), (a[s + 2] = qe.z * u);
      }
    }),
    (Se.unpackInterpolationResult = function (e, r, a, i, o) {
      n.defined(o) || (o = new Se()), t.Cartesian3.fromArray(e, 0, ze);
      var s = t.Cartesian3.magnitude(ze);
      return (
        Se.unpack(r, 4 * i, De),
        0 === s ? Se.clone(Se.IDENTITY, Me) : Se.fromAxisAngle(ze, s, Me),
        Se.multiply(Me, De, o)
      );
    }),
    (Se.clone = function (e, t) {
      if (n.defined(e))
        return n.defined(t)
          ? ((t.x = e.x), (t.y = e.y), (t.z = e.z), (t.w = e.w), t)
          : new Se(e.x, e.y, e.z, e.w);
    }),
    (Se.conjugate = function (e, t) {
      return (t.x = -e.x), (t.y = -e.y), (t.z = -e.z), (t.w = e.w), t;
    }),
    (Se.magnitudeSquared = function (e) {
      return e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w;
    }),
    (Se.magnitude = function (e) {
      return Math.sqrt(Se.magnitudeSquared(e));
    }),
    (Se.normalize = function (e, t) {
      var r = 1 / Se.magnitude(e),
        n = e.x * r,
        a = e.y * r,
        i = e.z * r,
        o = e.w * r;
      return (t.x = n), (t.y = a), (t.z = i), (t.w = o), t;
    }),
    (Se.inverse = function (e, t) {
      var r = Se.magnitudeSquared(e);
      return (t = Se.conjugate(e, t)), Se.multiplyByScalar(t, 1 / r, t);
    }),
    (Se.add = function (e, t, r) {
      return (r.x = e.x + t.x), (r.y = e.y + t.y), (r.z = e.z + t.z), (r.w = e.w + t.w), r;
    }),
    (Se.subtract = function (e, t, r) {
      return (r.x = e.x - t.x), (r.y = e.y - t.y), (r.z = e.z - t.z), (r.w = e.w - t.w), r;
    }),
    (Se.negate = function (e, t) {
      return (t.x = -e.x), (t.y = -e.y), (t.z = -e.z), (t.w = -e.w), t;
    }),
    (Se.dot = function (e, t) {
      return e.x * t.x + e.y * t.y + e.z * t.z + e.w * t.w;
    }),
    (Se.multiply = function (e, t, r) {
      var n = e.x,
        a = e.y,
        i = e.z,
        o = e.w,
        s = t.x,
        u = t.y,
        l = t.z,
        c = t.w,
        d = o * s + n * c + a * l - i * u,
        f = o * u - n * l + a * c + i * s,
        p = o * l + n * u - a * s + i * c,
        h = o * c - n * s - a * u - i * l;
      return (r.x = d), (r.y = f), (r.z = p), (r.w = h), r;
    }),
    (Se.multiplyByScalar = function (e, t, r) {
      return (r.x = e.x * t), (r.y = e.y * t), (r.z = e.z * t), (r.w = e.w * t), r;
    }),
    (Se.divideByScalar = function (e, t, r) {
      return (r.x = e.x / t), (r.y = e.y / t), (r.z = e.z / t), (r.w = e.w / t), r;
    }),
    (Se.computeAxis = function (e, t) {
      var r = e.w;
      if (Math.abs(r - 1) < a.CesiumMath.EPSILON6) return (t.x = t.y = t.z = 0), t;
      var n = 1 / Math.sqrt(1 - r * r);
      return (t.x = e.x * n), (t.y = e.y * n), (t.z = e.z * n), t;
    }),
    (Se.computeAngle = function (e) {
      return Math.abs(e.w - 1) < a.CesiumMath.EPSILON6 ? 0 : 2 * Math.acos(e.w);
    });
  var ke = new Se();
  Se.lerp = function (e, t, r, n) {
    return (
      (ke = Se.multiplyByScalar(t, r, ke)), (n = Se.multiplyByScalar(e, 1 - r, n)), Se.add(ke, n, n)
    );
  };
  var Fe = new Se(),
    Ne = new Se(),
    je = new Se();
  (Se.slerp = function (e, t, r, n) {
    var i = Se.dot(e, t),
      o = t;
    if ((i < 0 && ((i = -i), (o = Fe = Se.negate(t, Fe))), 1 - i < a.CesiumMath.EPSILON6))
      return Se.lerp(e, o, r, n);
    var s = Math.acos(i);
    return (
      (Ne = Se.multiplyByScalar(e, Math.sin((1 - r) * s), Ne)),
      (je = Se.multiplyByScalar(o, Math.sin(r * s), je)),
      (n = Se.add(Ne, je, n)),
      Se.multiplyByScalar(n, 1 / Math.sin(s), n)
    );
  }),
    (Se.log = function (e, r) {
      var n = a.CesiumMath.acosClamped(e.w),
        i = 0;
      return 0 !== n && (i = n / Math.sin(n)), t.Cartesian3.multiplyByScalar(e, i, r);
    }),
    (Se.exp = function (e, r) {
      var n = t.Cartesian3.magnitude(e),
        a = 0;
      return (
        0 !== n && (a = Math.sin(n) / n),
        (r.x = e.x * a),
        (r.y = e.y * a),
        (r.z = e.z * a),
        (r.w = Math.cos(n)),
        r
      );
    });
  var Be = new t.Cartesian3(),
    Ve = new t.Cartesian3(),
    Le = new Se(),
    Qe = new Se();
  (Se.computeInnerQuadrangle = function (e, r, n, a) {
    var i = Se.conjugate(r, Le);
    Se.multiply(i, n, Qe);
    var o = Se.log(Qe, Be);
    Se.multiply(i, e, Qe);
    var s = Se.log(Qe, Ve);
    return (
      t.Cartesian3.add(o, s, o),
      t.Cartesian3.multiplyByScalar(o, 0.25, o),
      t.Cartesian3.negate(o, o),
      Se.exp(o, Le),
      Se.multiply(r, Le, a)
    );
  }),
    (Se.squad = function (e, t, r, n, a, i) {
      var o = Se.slerp(e, t, a, Le),
        s = Se.slerp(r, n, a, Qe);
      return Se.slerp(o, s, 2 * a * (1 - a), i);
    });
  for (
    var We = new Se(),
      He = 1.9011074535173003,
      Ye = xe.supportsTypedArrays() ? new Float32Array(8) : [],
      Ze = xe.supportsTypedArrays() ? new Float32Array(8) : [],
      Ge = xe.supportsTypedArrays() ? new Float32Array(8) : [],
      Je = xe.supportsTypedArrays() ? new Float32Array(8) : [],
      $e = 0;
    $e < 7;
    ++$e
  ) {
    var Xe = $e + 1,
      Ke = 2 * Xe + 1;
    (Ye[$e] = 1 / (Xe * Ke)), (Ze[$e] = Xe / Ke);
  }
  function et(e, t, r) {
    for (var n, a, i = 0, o = e.length - 1; i <= o; )
      if ((a = r(e[(n = ~~((i + o) / 2))], t)) < 0) i = n + 1;
      else {
        if (!(a > 0)) return n;
        o = n - 1;
      }
    return ~(o + 1);
  }
  function tt(e, t, r, n, a) {
    (this.xPoleWander = e),
      (this.yPoleWander = t),
      (this.xPoleOffset = r),
      (this.yPoleOffset = n),
      (this.ut1MinusUtc = a);
  }
  function rt(e, t, r, n, a, i, o, s) {
    (this.year = e),
      (this.month = t),
      (this.day = r),
      (this.hour = n),
      (this.minute = a),
      (this.second = i),
      (this.millisecond = o),
      (this.isLeapSecond = s);
  }
  function nt(e) {
    return (e % 4 == 0 && e % 100 != 0) || e % 400 == 0;
  }
  function at(e, t) {
    (this.julianDate = e), (this.offset = t);
  }
  (Ye[7] = He / 136),
    (Ze[7] = (8 * He) / 17),
    (Se.fastSlerp = function (e, t, r, n) {
      var a,
        i = Se.dot(e, t);
      i >= 0 ? (a = 1) : ((a = -1), (i = -i));
      for (var o = i - 1, s = 1 - r, u = r * r, l = s * s, c = 7; c >= 0; --c)
        (Ge[c] = (Ye[c] * u - Ze[c]) * o), (Je[c] = (Ye[c] * l - Ze[c]) * o);
      var d =
          a *
          r *
          (1 +
            Ge[0] *
              (1 +
                Ge[1] *
                  (1 +
                    Ge[2] * (1 + Ge[3] * (1 + Ge[4] * (1 + Ge[5] * (1 + Ge[6] * (1 + Ge[7])))))))),
        f =
          s *
          (1 +
            Je[0] *
              (1 +
                Je[1] *
                  (1 +
                    Je[2] * (1 + Je[3] * (1 + Je[4] * (1 + Je[5] * (1 + Je[6] * (1 + Je[7])))))))),
        p = Se.multiplyByScalar(e, f, We);
      return Se.multiplyByScalar(t, d, n), Se.add(p, n, n);
    }),
    (Se.fastSquad = function (e, t, r, n, a, i) {
      var o = Se.fastSlerp(e, t, a, Le),
        s = Se.fastSlerp(r, n, a, Qe);
      return Se.fastSlerp(o, s, 2 * a * (1 - a), i);
    }),
    (Se.equals = function (e, t) {
      return (
        e === t ||
        (n.defined(e) && n.defined(t) && e.x === t.x && e.y === t.y && e.z === t.z && e.w === t.w)
      );
    }),
    (Se.equalsEpsilon = function (e, t, r) {
      return (
        (r = n.defaultValue(r, 0)),
        e === t ||
          (n.defined(e) &&
            n.defined(t) &&
            Math.abs(e.x - t.x) <= r &&
            Math.abs(e.y - t.y) <= r &&
            Math.abs(e.z - t.z) <= r &&
            Math.abs(e.w - t.w) <= r)
      );
    }),
    (Se.ZERO = Object.freeze(new Se(0, 0, 0, 0))),
    (Se.IDENTITY = Object.freeze(new Se(0, 0, 0, 1))),
    (Se.prototype.clone = function (e) {
      return Se.clone(this, e);
    }),
    (Se.prototype.equals = function (e) {
      return Se.equals(this, e);
    }),
    (Se.prototype.equalsEpsilon = function (e, t) {
      return Se.equalsEpsilon(this, e, t);
    }),
    (Se.prototype.toString = function () {
      return '(' + this.x + ', ' + this.y + ', ' + this.z + ', ' + this.w + ')';
    });
  var it = Object.freeze({
      SECONDS_PER_MILLISECOND: 0.001,
      SECONDS_PER_MINUTE: 60,
      MINUTES_PER_HOUR: 60,
      HOURS_PER_DAY: 24,
      SECONDS_PER_HOUR: 3600,
      MINUTES_PER_DAY: 1440,
      SECONDS_PER_DAY: 86400,
      DAYS_PER_JULIAN_CENTURY: 36525,
      PICOSECOND: 1e-9,
      MODIFIED_JULIAN_DATE_DIFFERENCE: 2400000.5,
    }),
    ot = Object.freeze({ UTC: 0, TAI: 1 }),
    st = new rt(),
    ut = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function lt(e, t) {
    return St.compare(e.julianDate, t.julianDate);
  }
  var ct = new at();
  function dt(e) {
    ct.julianDate = e;
    var t = St.leapSeconds,
      r = et(t, ct, lt);
    r < 0 && (r = ~r), r >= t.length && (r = t.length - 1);
    var n = t[r].offset;
    r > 0 && St.secondsDifference(t[r].julianDate, e) > n && (n = t[--r].offset);
    St.addSeconds(e, n, e);
  }
  function ft(e, t) {
    ct.julianDate = e;
    var r = St.leapSeconds,
      n = et(r, ct, lt);
    if ((n < 0 && (n = ~n), 0 === n)) return St.addSeconds(e, -r[0].offset, t);
    if (n >= r.length) return St.addSeconds(e, -r[n - 1].offset, t);
    var a = St.secondsDifference(r[n].julianDate, e);
    return 0 === a
      ? St.addSeconds(e, -r[n].offset, t)
      : a <= 1
      ? void 0
      : St.addSeconds(e, -r[--n].offset, t);
  }
  function pt(e, t, r) {
    var n = (t / it.SECONDS_PER_DAY) | 0;
    return (
      (e += n),
      (t -= it.SECONDS_PER_DAY * n) < 0 && (e--, (t += it.SECONDS_PER_DAY)),
      (r.dayNumber = e),
      (r.secondsOfDay = t),
      r
    );
  }
  function ht(e, t, r, n, a, i, o) {
    var s = ((t - 14) / 12) | 0,
      u = e + 4800 + s,
      l =
        (((1461 * u) / 4) | 0) +
        (((367 * (t - 2 - 12 * s)) / 12) | 0) -
        (((3 * (((u + 100) / 100) | 0)) / 4) | 0) +
        r -
        32075;
    (n -= 12) < 0 && (n += 24);
    var c =
      i + (n * it.SECONDS_PER_HOUR + a * it.SECONDS_PER_MINUTE + o * it.SECONDS_PER_MILLISECOND);
    return c >= 43200 && (l -= 1), [l, c];
  }
  var mt = /^(\d{4})$/,
    gt = /^(\d{4})-(\d{2})$/,
    vt = /^(\d{4})-?(\d{3})$/,
    yt = /^(\d{4})-?W(\d{2})-?(\d{1})?$/,
    wt = /^(\d{4})-?(\d{2})-?(\d{2})$/,
    Ct = /([Z+\-])?(\d{2})?:?(\d{2})?$/,
    _t = /^(\d{2})(\.\d+)?/.source + Ct.source,
    bt = /^(\d{2}):?(\d{2})(\.\d+)?/.source + Ct.source,
    xt = /^(\d{2}):?(\d{2}):?(\d{2})(\.\d+)?/.source + Ct.source;
  function St(e, t, r) {
    (this.dayNumber = void 0),
      (this.secondsOfDay = void 0),
      (e = n.defaultValue(e, 0)),
      (t = n.defaultValue(t, 0)),
      (r = n.defaultValue(r, ot.UTC));
    var a = 0 | e;
    pt(a, (t += (e - a) * it.SECONDS_PER_DAY), this), r === ot.UTC && dt(this);
  }
  (St.fromGregorianDate = function (e, t) {
    var r = ht(e.year, e.month, e.day, e.hour, e.minute, e.second, e.millisecond);
    return n.defined(t) ? (pt(r[0], r[1], t), dt(t), t) : new St(r[0], r[1], ot.UTC);
  }),
    (St.fromDate = function (e, t) {
      var r = ht(
        e.getUTCFullYear(),
        e.getUTCMonth() + 1,
        e.getUTCDate(),
        e.getUTCHours(),
        e.getUTCMinutes(),
        e.getUTCSeconds(),
        e.getUTCMilliseconds()
      );
      return n.defined(t) ? (pt(r[0], r[1], t), dt(t), t) : new St(r[0], r[1], ot.UTC);
    }),
    (St.fromIso8601 = function (e, t) {
      var r,
        a,
        i,
        o,
        s = (e = e.replace(',', '.')).split('T'),
        u = 1,
        l = 1,
        c = 0,
        d = 0,
        f = 0,
        p = 0,
        h = s[0],
        m = s[1];
      if (null !== (s = h.match(wt))) (r = +s[1]), (u = +s[2]), (l = +s[3]);
      else if (null !== (s = h.match(gt))) (r = +s[1]), (u = +s[2]);
      else if (null !== (s = h.match(mt))) r = +s[1];
      else {
        var g;
        if (null !== (s = h.match(vt))) (r = +s[1]), (g = +s[2]), (i = nt(r));
        else if (null !== (s = h.match(yt)))
          (r = +s[1]), (g = 7 * +s[2] + (+s[3] || 0) - new Date(Date.UTC(r, 0, 4)).getUTCDay() - 3);
        (a = new Date(Date.UTC(r, 0, 1))).setUTCDate(g),
          (u = a.getUTCMonth() + 1),
          (l = a.getUTCDate());
      }
      if (((i = nt(r)), n.defined(m))) {
        null !== (s = m.match(xt))
          ? ((c = +s[1]), (d = +s[2]), (f = +s[3]), (p = 1e3 * +(s[4] || 0)), (o = 5))
          : null !== (s = m.match(bt))
          ? ((c = +s[1]), (d = +s[2]), (f = 60 * +(s[3] || 0)), (o = 4))
          : null !== (s = m.match(_t)) && ((c = +s[1]), (d = 60 * +(s[2] || 0)), (o = 3));
        var v = s[o],
          y = +s[o + 1],
          w = +(s[o + 2] || 0);
        switch (v) {
          case '+':
            (c -= y), (d -= w);
            break;
          case '-':
            (c += y), (d += w);
            break;
          case 'Z':
            break;
          default:
            d += new Date(Date.UTC(r, u - 1, l, c, d)).getTimezoneOffset();
        }
      }
      var C = 60 === f;
      for (C && f--; d >= 60; ) (d -= 60), c++;
      for (; c >= 24; ) (c -= 24), l++;
      for (a = i && 2 === u ? 29 : ut[u - 1]; l > a; )
        (l -= a), ++u > 12 && ((u -= 12), r++), (a = i && 2 === u ? 29 : ut[u - 1]);
      for (; d < 0; ) (d += 60), c--;
      for (; c < 0; ) (c += 24), l--;
      for (; l < 1; ) --u < 1 && ((u += 12), r--), (l += a = i && 2 === u ? 29 : ut[u - 1]);
      var _ = ht(r, u, l, c, d, f, p);
      return (
        n.defined(t) ? (pt(_[0], _[1], t), dt(t)) : (t = new St(_[0], _[1], ot.UTC)),
        C && St.addSeconds(t, 1, t),
        t
      );
    }),
    (St.now = function (e) {
      return St.fromDate(new Date(), e);
    });
  var Et = new St(0, 0, ot.TAI);
  (St.toGregorianDate = function (e, t) {
    var r = !1,
      a = ft(e, Et);
    n.defined(a) || (St.addSeconds(e, -1, Et), (a = ft(Et, Et)), (r = !0));
    var i = a.dayNumber,
      o = a.secondsOfDay;
    o >= 43200 && (i += 1);
    var s = (i + 68569) | 0,
      u = ((4 * s) / 146097) | 0,
      l = ((4e3 * ((s = (s - (((146097 * u + 3) / 4) | 0)) | 0) + 1)) / 1461001) | 0,
      c = ((80 * (s = (s - (((1461 * l) / 4) | 0) + 31) | 0)) / 2447) | 0,
      d = (s - (((2447 * c) / 80) | 0)) | 0,
      f = (c + 2 - 12 * (s = (c / 11) | 0)) | 0,
      p = (100 * (u - 49) + l + s) | 0,
      h = (o / it.SECONDS_PER_HOUR) | 0,
      m = o - h * it.SECONDS_PER_HOUR,
      g = (m / it.SECONDS_PER_MINUTE) | 0,
      v = 0 | (m -= g * it.SECONDS_PER_MINUTE),
      y = (m - v) / it.SECONDS_PER_MILLISECOND;
    return (
      (h += 12) > 23 && (h -= 24),
      r && (v += 1),
      n.defined(t)
        ? ((t.year = p),
          (t.month = f),
          (t.day = d),
          (t.hour = h),
          (t.minute = g),
          (t.second = v),
          (t.millisecond = y),
          (t.isLeapSecond = r),
          t)
        : new rt(p, f, d, h, g, v, y, r)
    );
  }),
    (St.toDate = function (e) {
      var t = St.toGregorianDate(e, st),
        r = t.second;
      return (
        t.isLeapSecond && (r -= 1),
        new Date(Date.UTC(t.year, t.month - 1, t.day, t.hour, t.minute, r, t.millisecond))
      );
    }),
    (St.toIso8601 = function (e, t) {
      var r,
        a = St.toGregorianDate(e, st),
        i = a.year,
        o = a.month,
        s = a.day,
        u = a.hour,
        l = a.minute,
        c = a.second,
        d = a.millisecond;
      return (
        1e4 === i &&
          1 === o &&
          1 === s &&
          0 === u &&
          0 === l &&
          0 === c &&
          0 === d &&
          ((i = 9999), (o = 12), (s = 31), (u = 24)),
        n.defined(t) || 0 === d
          ? n.defined(t) && 0 !== t
            ? ((r = (0.01 * d).toFixed(t).replace('.', '').slice(0, t)),
              i.toString().padStart(4, '0') +
                '-' +
                o.toString().padStart(2, '0') +
                '-' +
                s.toString().padStart(2, '0') +
                'T' +
                u.toString().padStart(2, '0') +
                ':' +
                l.toString().padStart(2, '0') +
                ':' +
                c.toString().padStart(2, '0') +
                '.' +
                r +
                'Z')
            : i.toString().padStart(4, '0') +
              '-' +
              o.toString().padStart(2, '0') +
              '-' +
              s.toString().padStart(2, '0') +
              'T' +
              u.toString().padStart(2, '0') +
              ':' +
              l.toString().padStart(2, '0') +
              ':' +
              c.toString().padStart(2, '0') +
              'Z'
          : ((r = (0.01 * d).toString().replace('.', '')),
            i.toString().padStart(4, '0') +
              '-' +
              o.toString().padStart(2, '0') +
              '-' +
              s.toString().padStart(2, '0') +
              'T' +
              u.toString().padStart(2, '0') +
              ':' +
              l.toString().padStart(2, '0') +
              ':' +
              c.toString().padStart(2, '0') +
              '.' +
              r +
              'Z')
      );
    }),
    (St.clone = function (e, t) {
      if (n.defined(e))
        return n.defined(t)
          ? ((t.dayNumber = e.dayNumber), (t.secondsOfDay = e.secondsOfDay), t)
          : new St(e.dayNumber, e.secondsOfDay, ot.TAI);
    }),
    (St.compare = function (e, t) {
      var r = e.dayNumber - t.dayNumber;
      return 0 !== r ? r : e.secondsOfDay - t.secondsOfDay;
    }),
    (St.equals = function (e, t) {
      return (
        e === t ||
        (n.defined(e) &&
          n.defined(t) &&
          e.dayNumber === t.dayNumber &&
          e.secondsOfDay === t.secondsOfDay)
      );
    }),
    (St.equalsEpsilon = function (e, t, r) {
      return (
        (r = n.defaultValue(r, 0)),
        e === t || (n.defined(e) && n.defined(t) && Math.abs(St.secondsDifference(e, t)) <= r)
      );
    }),
    (St.totalDays = function (e) {
      return e.dayNumber + e.secondsOfDay / it.SECONDS_PER_DAY;
    }),
    (St.secondsDifference = function (e, t) {
      return (e.dayNumber - t.dayNumber) * it.SECONDS_PER_DAY + (e.secondsOfDay - t.secondsOfDay);
    }),
    (St.daysDifference = function (e, t) {
      return e.dayNumber - t.dayNumber + (e.secondsOfDay - t.secondsOfDay) / it.SECONDS_PER_DAY;
    }),
    (St.computeTaiMinusUtc = function (e) {
      ct.julianDate = e;
      var t = St.leapSeconds,
        r = et(t, ct, lt);
      return r < 0 && ((r = ~r), --r < 0 && (r = 0)), t[r].offset;
    }),
    (St.addSeconds = function (e, t, r) {
      return pt(e.dayNumber, e.secondsOfDay + t, r);
    }),
    (St.addMinutes = function (e, t, r) {
      var n = e.secondsOfDay + t * it.SECONDS_PER_MINUTE;
      return pt(e.dayNumber, n, r);
    }),
    (St.addHours = function (e, t, r) {
      var n = e.secondsOfDay + t * it.SECONDS_PER_HOUR;
      return pt(e.dayNumber, n, r);
    }),
    (St.addDays = function (e, t, r) {
      return pt(e.dayNumber + t, e.secondsOfDay, r);
    }),
    (St.lessThan = function (e, t) {
      return St.compare(e, t) < 0;
    }),
    (St.lessThanOrEquals = function (e, t) {
      return St.compare(e, t) <= 0;
    }),
    (St.greaterThan = function (e, t) {
      return St.compare(e, t) > 0;
    }),
    (St.greaterThanOrEquals = function (e, t) {
      return St.compare(e, t) >= 0;
    }),
    (St.prototype.clone = function (e) {
      return St.clone(this, e);
    }),
    (St.prototype.equals = function (e) {
      return St.equals(this, e);
    }),
    (St.prototype.equalsEpsilon = function (e, t) {
      return St.equalsEpsilon(this, e, t);
    }),
    (St.prototype.toString = function () {
      return St.toIso8601(this);
    }),
    (St.leapSeconds = [
      new at(new St(2441317, 43210, ot.TAI), 10),
      new at(new St(2441499, 43211, ot.TAI), 11),
      new at(new St(2441683, 43212, ot.TAI), 12),
      new at(new St(2442048, 43213, ot.TAI), 13),
      new at(new St(2442413, 43214, ot.TAI), 14),
      new at(new St(2442778, 43215, ot.TAI), 15),
      new at(new St(2443144, 43216, ot.TAI), 16),
      new at(new St(2443509, 43217, ot.TAI), 17),
      new at(new St(2443874, 43218, ot.TAI), 18),
      new at(new St(2444239, 43219, ot.TAI), 19),
      new at(new St(2444786, 43220, ot.TAI), 20),
      new at(new St(2445151, 43221, ot.TAI), 21),
      new at(new St(2445516, 43222, ot.TAI), 22),
      new at(new St(2446247, 43223, ot.TAI), 23),
      new at(new St(2447161, 43224, ot.TAI), 24),
      new at(new St(2447892, 43225, ot.TAI), 25),
      new at(new St(2448257, 43226, ot.TAI), 26),
      new at(new St(2448804, 43227, ot.TAI), 27),
      new at(new St(2449169, 43228, ot.TAI), 28),
      new at(new St(2449534, 43229, ot.TAI), 29),
      new at(new St(2450083, 43230, ot.TAI), 30),
      new at(new St(2450630, 43231, ot.TAI), 31),
      new at(new St(2451179, 43232, ot.TAI), 32),
      new at(new St(2453736, 43233, ot.TAI), 33),
      new at(new St(2454832, 43234, ot.TAI), 34),
      new at(new St(2456109, 43235, ot.TAI), 35),
      new at(new St(2457204, 43236, ot.TAI), 36),
      new at(new St(2457754, 43237, ot.TAI), 37),
    ]);
  var At = n.createCommonjsModule(function (e, t) {
      !(function (r) {
        var a = t && !t.nodeType && t,
          i = e && !e.nodeType && e,
          o = 'object' == typeof n.commonjsGlobal && n.commonjsGlobal;
        (o.global !== o && o.window !== o && o.self !== o) || (r = o);
        var s,
          u,
          l = 2147483647,
          c = 36,
          d = /^xn--/,
          f = /[^\x20-\x7E]/,
          p = /[\x2E\u3002\uFF0E\uFF61]/g,
          h = {
            overflow: 'Overflow: input needs wider integers to process',
            'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
            'invalid-input': 'Invalid input',
          },
          m = Math.floor,
          g = String.fromCharCode;
        function v(e) {
          throw new RangeError(h[e]);
        }
        function y(e, t) {
          for (var r = e.length, n = []; r--; ) n[r] = t(e[r]);
          return n;
        }
        function w(e, t) {
          var r = e.split('@'),
            n = '';
          return (
            r.length > 1 && ((n = r[0] + '@'), (e = r[1])),
            n + y((e = e.replace(p, '.')).split('.'), t).join('.')
          );
        }
        function C(e) {
          for (var t, r, n = [], a = 0, i = e.length; a < i; )
            (t = e.charCodeAt(a++)) >= 55296 && t <= 56319 && a < i
              ? 56320 == (64512 & (r = e.charCodeAt(a++)))
                ? n.push(((1023 & t) << 10) + (1023 & r) + 65536)
                : (n.push(t), a--)
              : n.push(t);
          return n;
        }
        function _(e) {
          return y(e, function (e) {
            var t = '';
            return (
              e > 65535 &&
                ((t += g((((e -= 65536) >>> 10) & 1023) | 55296)), (e = 56320 | (1023 & e))),
              (t += g(e))
            );
          }).join('');
        }
        function b(e, t) {
          return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
        }
        function x(e, t, r) {
          var n = 0;
          for (e = r ? m(e / 700) : e >> 1, e += m(e / t); e > 455; n += c) e = m(e / 35);
          return m(n + (36 * e) / (e + 38));
        }
        function S(e) {
          var t,
            r,
            n,
            a,
            i,
            o,
            s,
            u,
            d,
            f,
            p,
            h = [],
            g = e.length,
            y = 0,
            w = 128,
            C = 72;
          for ((r = e.lastIndexOf('-')) < 0 && (r = 0), n = 0; n < r; ++n)
            e.charCodeAt(n) >= 128 && v('not-basic'), h.push(e.charCodeAt(n));
          for (a = r > 0 ? r + 1 : 0; a < g; ) {
            for (
              i = y, o = 1, s = c;
              a >= g && v('invalid-input'),
                ((u =
                  (p = e.charCodeAt(a++)) - 48 < 10
                    ? p - 22
                    : p - 65 < 26
                    ? p - 65
                    : p - 97 < 26
                    ? p - 97
                    : c) >= c ||
                  u > m((l - y) / o)) &&
                  v('overflow'),
                (y += u * o),
                !(u < (d = s <= C ? 1 : s >= C + 26 ? 26 : s - C));
              s += c
            )
              o > m(l / (f = c - d)) && v('overflow'), (o *= f);
            (C = x(y - i, (t = h.length + 1), 0 == i)),
              m(y / t) > l - w && v('overflow'),
              (w += m(y / t)),
              (y %= t),
              h.splice(y++, 0, w);
          }
          return _(h);
        }
        function E(e) {
          var t,
            r,
            n,
            a,
            i,
            o,
            s,
            u,
            d,
            f,
            p,
            h,
            y,
            w,
            _,
            S = [];
          for (h = (e = C(e)).length, t = 128, r = 0, i = 72, o = 0; o < h; ++o)
            (p = e[o]) < 128 && S.push(g(p));
          for (n = a = S.length, a && S.push('-'); n < h; ) {
            for (s = l, o = 0; o < h; ++o) (p = e[o]) >= t && p < s && (s = p);
            for (
              s - t > m((l - r) / (y = n + 1)) && v('overflow'), r += (s - t) * y, t = s, o = 0;
              o < h;
              ++o
            )
              if (((p = e[o]) < t && ++r > l && v('overflow'), p == t)) {
                for (u = r, d = c; !(u < (f = d <= i ? 1 : d >= i + 26 ? 26 : d - i)); d += c)
                  (_ = u - f), (w = c - f), S.push(g(b(f + (_ % w), 0))), (u = m(_ / w));
                S.push(g(b(u, 0))), (i = x(r, y, n == a)), (r = 0), ++n;
              }
            ++r, ++t;
          }
          return S.join('');
        }
        if (
          ((s = {
            version: '1.3.2',
            ucs2: { decode: C, encode: _ },
            decode: S,
            encode: E,
            toASCII: function (e) {
              return w(e, function (e) {
                return f.test(e) ? 'xn--' + E(e) : e;
              });
            },
            toUnicode: function (e) {
              return w(e, function (e) {
                return d.test(e) ? S(e.slice(4).toLowerCase()) : e;
              });
            },
          }),
          a && i)
        )
          if (e.exports == a) i.exports = s;
          else for (u in s) s.hasOwnProperty(u) && (a[u] = s[u]);
        else r.punycode = s;
      })(n.commonjsGlobal);
    }),
    Ot = n.createCommonjsModule(function (e) {
      /*!
       * URI.js - Mutating URLs
       * IPv6 Support
       *
       * Version: 1.19.7
       *
       * Author: Rodney Rehm
       * Web: http://medialize.github.io/URI.js/
       *
       * Licensed under
       *   MIT License http://www.opensource.org/licenses/mit-license
       *
       */ var t, r;
      (t = n.commonjsGlobal),
        (r = function (e) {
          var t = e && e.IPv6;
          return {
            best: function (e) {
              var t,
                r,
                n = e.toLowerCase().split(':'),
                a = n.length,
                i = 8;
              for (
                '' === n[0] && '' === n[1] && '' === n[2]
                  ? (n.shift(), n.shift())
                  : '' === n[0] && '' === n[1]
                  ? n.shift()
                  : '' === n[a - 1] && '' === n[a - 2] && n.pop(),
                  -1 !== n[(a = n.length) - 1].indexOf('.') && (i = 7),
                  t = 0;
                t < a && '' !== n[t];
                t++
              );
              if (t < i) for (n.splice(t, 1, '0000'); n.length < i; ) n.splice(t, 0, '0000');
              for (var o = 0; o < i; o++) {
                r = n[o].split('');
                for (var s = 0; s < 3 && '0' === r[0] && r.length > 1; s++) r.splice(0, 1);
                n[o] = r.join('');
              }
              var u = -1,
                l = 0,
                c = 0,
                d = -1,
                f = !1;
              for (o = 0; o < i; o++)
                f
                  ? '0' === n[o]
                    ? (c += 1)
                    : ((f = !1), c > l && ((u = d), (l = c)))
                  : '0' === n[o] && ((f = !0), (d = o), (c = 1));
              c > l && ((u = d), (l = c)), l > 1 && n.splice(u, l, ''), (a = n.length);
              var p = '';
              for ('' === n[0] && (p = ':'), o = 0; o < a && ((p += n[o]), o !== a - 1); o++)
                p += ':';
              return '' === n[a - 1] && (p += ':'), p;
            },
            noConflict: function () {
              return e.IPv6 === this && (e.IPv6 = t), this;
            },
          };
        }),
        e.exports ? (e.exports = r()) : (t.IPv6 = r(t));
    }),
    It = n.createCommonjsModule(function (e) {
      /*!
       * URI.js - Mutating URLs
       * Second Level Domain (SLD) Support
       *
       * Version: 1.19.7
       *
       * Author: Rodney Rehm
       * Web: http://medialize.github.io/URI.js/
       *
       * Licensed under
       *   MIT License http://www.opensource.org/licenses/mit-license
       *
       */ var t, r;
      (t = n.commonjsGlobal),
        (r = function (e) {
          var t = e && e.SecondLevelDomains,
            r = {
              list: {
                ac: ' com gov mil net org ',
                ae: ' ac co gov mil name net org pro sch ',
                af: ' com edu gov net org ',
                al: ' com edu gov mil net org ',
                ao: ' co ed gv it og pb ',
                ar: ' com edu gob gov int mil net org tur ',
                at: ' ac co gv or ',
                au: ' asn com csiro edu gov id net org ',
                ba: ' co com edu gov mil net org rs unbi unmo unsa untz unze ',
                bb: ' biz co com edu gov info net org store tv ',
                bh: ' biz cc com edu gov info net org ',
                bn: ' com edu gov net org ',
                bo: ' com edu gob gov int mil net org tv ',
                br: ' adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ',
                bs: ' com edu gov net org ',
                bz: ' du et om ov rg ',
                ca: ' ab bc mb nb nf nl ns nt nu on pe qc sk yk ',
                ck: ' biz co edu gen gov info net org ',
                cn: ' ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ',
                co: ' com edu gov mil net nom org ',
                cr: ' ac c co ed fi go or sa ',
                cy: ' ac biz com ekloges gov ltd name net org parliament press pro tm ',
                do: ' art com edu gob gov mil net org sld web ',
                dz: ' art asso com edu gov net org pol ',
                ec: ' com edu fin gov info med mil net org pro ',
                eg: ' com edu eun gov mil name net org sci ',
                er: ' com edu gov ind mil net org rochest w ',
                es: ' com edu gob nom org ',
                et: ' biz com edu gov info name net org ',
                fj: ' ac biz com info mil name net org pro ',
                fk: ' ac co gov net nom org ',
                fr: ' asso com f gouv nom prd presse tm ',
                gg: ' co net org ',
                gh: ' com edu gov mil org ',
                gn: ' ac com gov net org ',
                gr: ' com edu gov mil net org ',
                gt: ' com edu gob ind mil net org ',
                gu: ' com edu gov net org ',
                hk: ' com edu gov idv net org ',
                hu: ' 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ',
                id: ' ac co go mil net or sch web ',
                il: ' ac co gov idf k12 muni net org ',
                in: ' ac co edu ernet firm gen gov i ind mil net nic org res ',
                iq: ' com edu gov i mil net org ',
                ir: ' ac co dnssec gov i id net org sch ',
                it: ' edu gov ',
                je: ' co net org ',
                jo: ' com edu gov mil name net org sch ',
                jp: ' ac ad co ed go gr lg ne or ',
                ke: ' ac co go info me mobi ne or sc ',
                kh: ' com edu gov mil net org per ',
                ki: ' biz com de edu gov info mob net org tel ',
                km: ' asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ',
                kn: ' edu gov net org ',
                kr: ' ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ',
                kw: ' com edu gov net org ',
                ky: ' com edu gov net org ',
                kz: ' com edu gov mil net org ',
                lb: ' com edu gov net org ',
                lk: ' assn com edu gov grp hotel int ltd net ngo org sch soc web ',
                lr: ' com edu gov net org ',
                lv: ' asn com conf edu gov id mil net org ',
                ly: ' com edu gov id med net org plc sch ',
                ma: ' ac co gov m net org press ',
                mc: ' asso tm ',
                me: ' ac co edu gov its net org priv ',
                mg: ' com edu gov mil nom org prd tm ',
                mk: ' com edu gov inf name net org pro ',
                ml: ' com edu gov net org presse ',
                mn: ' edu gov org ',
                mo: ' com edu gov net org ',
                mt: ' com edu gov net org ',
                mv: ' aero biz com coop edu gov info int mil museum name net org pro ',
                mw: ' ac co com coop edu gov int museum net org ',
                mx: ' com edu gob net org ',
                my: ' com edu gov mil name net org sch ',
                nf: ' arts com firm info net other per rec store web ',
                ng: ' biz com edu gov mil mobi name net org sch ',
                ni: ' ac co com edu gob mil net nom org ',
                np: ' com edu gov mil net org ',
                nr: ' biz com edu gov info net org ',
                om: ' ac biz co com edu gov med mil museum net org pro sch ',
                pe: ' com edu gob mil net nom org sld ',
                ph: ' com edu gov i mil net ngo org ',
                pk: ' biz com edu fam gob gok gon gop gos gov net org web ',
                pl: ' art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ',
                pr: ' ac biz com edu est gov info isla name net org pro prof ',
                ps: ' com edu gov net org plo sec ',
                pw: ' belau co ed go ne or ',
                ro: ' arts com firm info nom nt org rec store tm www ',
                rs: ' ac co edu gov in org ',
                sb: ' com edu gov net org ',
                sc: ' com edu gov net org ',
                sh: ' co com edu gov net nom org ',
                sl: ' com edu gov net org ',
                st: ' co com consulado edu embaixada gov mil net org principe saotome store ',
                sv: ' com edu gob org red ',
                sz: ' ac co org ',
                tr: ' av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ',
                tt: ' aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ',
                tw: ' club com ebiz edu game gov idv mil net org ',
                mu: ' ac co com gov net or org ',
                mz: ' ac co edu gov org ',
                na: ' co com ',
                nz: ' ac co cri geek gen govt health iwi maori mil net org parliament school ',
                pa: ' abo ac com edu gob ing med net nom org sld ',
                pt: ' com edu gov int net nome org publ ',
                py: ' com edu gov mil net org ',
                qa: ' com edu gov mil net org ',
                re: ' asso com nom ',
                ru: ' ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ',
                rw: ' ac co com edu gouv gov int mil net ',
                sa: ' com edu gov med net org pub sch ',
                sd: ' com edu gov info med net org tv ',
                se: ' a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ',
                sg: ' com edu gov idn net org per ',
                sn: ' art com edu gouv org perso univ ',
                sy: ' com edu gov mil net news org ',
                th: ' ac co go in mi net or ',
                tj: ' ac biz co com edu go gov info int mil name net nic org test web ',
                tn: ' agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ',
                tz: ' ac co go ne or ',
                ua: ' biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ',
                ug: ' ac co go ne or org sc ',
                uk: ' ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ',
                us: ' dni fed isa kids nsn ',
                uy: ' com edu gub mil net org ',
                ve: ' co com edu gob info mil net org web ',
                vi: ' co com k12 net org ',
                vn: ' ac biz com edu gov health info int name net org pro ',
                ye: ' co com gov ltd me net org plc ',
                yu: ' ac co edu gov org ',
                za: ' ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ',
                zm: ' ac co com edu gov net org sch ',
                com: 'ar br cn de eu gb gr hu jpn kr no qc ru sa se uk us uy za ',
                net: 'gb jp se uk ',
                org: 'ae',
                de: 'com ',
              },
              has: function (e) {
                var t = e.lastIndexOf('.');
                if (t <= 0 || t >= e.length - 1) return !1;
                var n = e.lastIndexOf('.', t - 1);
                if (n <= 0 || n >= t - 1) return !1;
                var a = r.list[e.slice(t + 1)];
                return !!a && a.indexOf(' ' + e.slice(n + 1, t) + ' ') >= 0;
              },
              is: function (e) {
                var t = e.lastIndexOf('.');
                if (t <= 0 || t >= e.length - 1) return !1;
                if (e.lastIndexOf('.', t - 1) >= 0) return !1;
                var n = r.list[e.slice(t + 1)];
                return !!n && n.indexOf(' ' + e.slice(0, t) + ' ') >= 0;
              },
              get: function (e) {
                var t = e.lastIndexOf('.');
                if (t <= 0 || t >= e.length - 1) return null;
                var n = e.lastIndexOf('.', t - 1);
                if (n <= 0 || n >= t - 1) return null;
                var a = r.list[e.slice(t + 1)];
                return a
                  ? a.indexOf(' ' + e.slice(n + 1, t) + ' ') < 0
                    ? null
                    : e.slice(n + 1)
                  : null;
              },
              noConflict: function () {
                return e.SecondLevelDomains === this && (e.SecondLevelDomains = t), this;
              },
            };
          return r;
        }),
        e.exports ? (e.exports = r()) : (t.SecondLevelDomains = r(t));
    }),
    Rt = n.createCommonjsModule(function (e) {
      /*!
       * URI.js - Mutating URLs
       *
       * Version: 1.19.7
       *
       * Author: Rodney Rehm
       * Web: http://medialize.github.io/URI.js/
       *
       * Licensed under
       *   MIT License http://www.opensource.org/licenses/mit-license
       *
       */ var t, r;
      (t = n.commonjsGlobal),
        (r = function (e, t, r, n) {
          var a = n && n.URI;
          function i(e, t) {
            var r = arguments.length >= 1,
              n = arguments.length >= 2;
            if (!(this instanceof i)) return r ? (n ? new i(e, t) : new i(e)) : new i();
            if (void 0 === e) {
              if (r) throw new TypeError('undefined is not a valid argument for URI');
              e = 'undefined' != typeof location ? location.href + '' : '';
            }
            if (null === e && r) throw new TypeError('null is not a valid argument for URI');
            return this.href(e), void 0 !== t ? this.absoluteTo(t) : this;
          }
          i.version = '1.19.7';
          var o = i.prototype,
            s = Object.prototype.hasOwnProperty;
          function u(e) {
            return e.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
          }
          function l(e) {
            return void 0 === e
              ? 'Undefined'
              : String(Object.prototype.toString.call(e)).slice(8, -1);
          }
          function c(e) {
            return 'Array' === l(e);
          }
          function d(e, t) {
            var r,
              n,
              a = {};
            if ('RegExp' === l(t)) a = null;
            else if (c(t)) for (r = 0, n = t.length; r < n; r++) a[t[r]] = !0;
            else a[t] = !0;
            for (r = 0, n = e.length; r < n; r++)
              ((a && void 0 !== a[e[r]]) || (!a && t.test(e[r]))) && (e.splice(r, 1), n--, r--);
            return e;
          }
          function f(e, t) {
            var r, n;
            if (c(t)) {
              for (r = 0, n = t.length; r < n; r++) if (!f(e, t[r])) return !1;
              return !0;
            }
            var a = l(t);
            for (r = 0, n = e.length; r < n; r++)
              if ('RegExp' === a) {
                if ('string' == typeof e[r] && e[r].match(t)) return !0;
              } else if (e[r] === t) return !0;
            return !1;
          }
          function p(e, t) {
            if (!c(e) || !c(t)) return !1;
            if (e.length !== t.length) return !1;
            e.sort(), t.sort();
            for (var r = 0, n = e.length; r < n; r++) if (e[r] !== t[r]) return !1;
            return !0;
          }
          function h(e) {
            return e.replace(/^\/+|\/+$/g, '');
          }
          function m(e) {
            return escape(e);
          }
          function g(e) {
            return encodeURIComponent(e)
              .replace(/[!'()*]/g, m)
              .replace(/\*/g, '%2A');
          }
          (i._parts = function () {
            return {
              protocol: null,
              username: null,
              password: null,
              hostname: null,
              urn: null,
              port: null,
              path: null,
              query: null,
              fragment: null,
              preventInvalidHostname: i.preventInvalidHostname,
              duplicateQueryParameters: i.duplicateQueryParameters,
              escapeQuerySpace: i.escapeQuerySpace,
            };
          }),
            (i.preventInvalidHostname = !1),
            (i.duplicateQueryParameters = !1),
            (i.escapeQuerySpace = !0),
            (i.protocol_expression = /^[a-z][a-z0-9.+-]*$/i),
            (i.idn_expression = /[^a-z0-9\._-]/i),
            (i.punycode_expression = /(xn--)/i),
            (i.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/),
            (i.ip6_expression =
              /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/),
            (i.find_uri_expression =
              /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi),
            (i.findUri = {
              start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
              end: /[\s\r\n]|$/,
              trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/,
              parens: /(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g,
            }),
            (i.defaultPorts = {
              http: '80',
              https: '443',
              ftp: '21',
              gopher: '70',
              ws: '80',
              wss: '443',
            }),
            (i.hostProtocols = ['http', 'https']),
            (i.invalid_hostname_characters = /[^a-zA-Z0-9\.\-:_]/),
            (i.domAttributes = {
              a: 'href',
              blockquote: 'cite',
              link: 'href',
              base: 'href',
              script: 'src',
              form: 'action',
              img: 'src',
              area: 'href',
              iframe: 'src',
              embed: 'src',
              source: 'src',
              track: 'src',
              input: 'src',
              audio: 'src',
              video: 'src',
            }),
            (i.getDomAttribute = function (e) {
              if (e && e.nodeName) {
                var t = e.nodeName.toLowerCase();
                if ('input' !== t || 'image' === e.type) return i.domAttributes[t];
              }
            }),
            (i.encode = g),
            (i.decode = decodeURIComponent),
            (i.iso8859 = function () {
              (i.encode = escape), (i.decode = unescape);
            }),
            (i.unicode = function () {
              (i.encode = g), (i.decode = decodeURIComponent);
            }),
            (i.characters = {
              pathname: {
                encode: {
                  expression: /%(24|26|2B|2C|3B|3D|3A|40)/gi,
                  map: {
                    '%24': '$',
                    '%26': '&',
                    '%2B': '+',
                    '%2C': ',',
                    '%3B': ';',
                    '%3D': '=',
                    '%3A': ':',
                    '%40': '@',
                  },
                },
                decode: { expression: /[\/\?#]/g, map: { '/': '%2F', '?': '%3F', '#': '%23' } },
              },
              reserved: {
                encode: {
                  expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/gi,
                  map: {
                    '%3A': ':',
                    '%2F': '/',
                    '%3F': '?',
                    '%23': '#',
                    '%5B': '[',
                    '%5D': ']',
                    '%40': '@',
                    '%21': '!',
                    '%24': '$',
                    '%26': '&',
                    '%27': "'",
                    '%28': '(',
                    '%29': ')',
                    '%2A': '*',
                    '%2B': '+',
                    '%2C': ',',
                    '%3B': ';',
                    '%3D': '=',
                  },
                },
              },
              urnpath: {
                encode: {
                  expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/gi,
                  map: {
                    '%21': '!',
                    '%24': '$',
                    '%27': "'",
                    '%28': '(',
                    '%29': ')',
                    '%2A': '*',
                    '%2B': '+',
                    '%2C': ',',
                    '%3B': ';',
                    '%3D': '=',
                    '%40': '@',
                  },
                },
                decode: {
                  expression: /[\/\?#:]/g,
                  map: { '/': '%2F', '?': '%3F', '#': '%23', ':': '%3A' },
                },
              },
            }),
            (i.encodeQuery = function (e, t) {
              var r = i.encode(e + '');
              return void 0 === t && (t = i.escapeQuerySpace), t ? r.replace(/%20/g, '+') : r;
            }),
            (i.decodeQuery = function (e, t) {
              (e += ''), void 0 === t && (t = i.escapeQuerySpace);
              try {
                return i.decode(t ? e.replace(/\+/g, '%20') : e);
              } catch (t) {
                return e;
              }
            });
          var v,
            y = { encode: 'encode', decode: 'decode' },
            w = function (e, t) {
              return function (r) {
                try {
                  return i[t](r + '').replace(i.characters[e][t].expression, function (r) {
                    return i.characters[e][t].map[r];
                  });
                } catch (e) {
                  return r;
                }
              };
            };
          for (v in y)
            (i[v + 'PathSegment'] = w('pathname', y[v])),
              (i[v + 'UrnPathSegment'] = w('urnpath', y[v]));
          var C = function (e, t, r) {
            return function (n) {
              var a;
              a = r
                ? function (e) {
                    return i[t](i[r](e));
                  }
                : i[t];
              for (var o = (n + '').split(e), s = 0, u = o.length; s < u; s++) o[s] = a(o[s]);
              return o.join(e);
            };
          };
          function _(e) {
            return function (t, r) {
              return void 0 === t
                ? this._parts[e] || ''
                : ((this._parts[e] = t || null), this.build(!r), this);
            };
          }
          function b(e, t) {
            return function (r, n) {
              return void 0 === r
                ? this._parts[e] || ''
                : (null !== r && (r += '').charAt(0) === t && (r = r.substring(1)),
                  (this._parts[e] = r),
                  this.build(!n),
                  this);
            };
          }
          (i.decodePath = C('/', 'decodePathSegment')),
            (i.decodeUrnPath = C(':', 'decodeUrnPathSegment')),
            (i.recodePath = C('/', 'encodePathSegment', 'decode')),
            (i.recodeUrnPath = C(':', 'encodeUrnPathSegment', 'decode')),
            (i.encodeReserved = w('reserved', 'encode')),
            (i.parse = function (e, t) {
              var r;
              return (
                t || (t = { preventInvalidHostname: i.preventInvalidHostname }),
                (r = e.indexOf('#')) > -1 &&
                  ((t.fragment = e.substring(r + 1) || null), (e = e.substring(0, r))),
                (r = e.indexOf('?')) > -1 &&
                  ((t.query = e.substring(r + 1) || null), (e = e.substring(0, r))),
                '//' === (e = e.replace(/^(https?|ftp|wss?)?:[/\\]*/, '$1://')).substring(0, 2)
                  ? ((t.protocol = null), (e = e.substring(2)), (e = i.parseAuthority(e, t)))
                  : (r = e.indexOf(':')) > -1 &&
                    ((t.protocol = e.substring(0, r) || null),
                    t.protocol && !t.protocol.match(i.protocol_expression)
                      ? (t.protocol = void 0)
                      : '//' === e.substring(r + 1, r + 3).replace(/\\/g, '/')
                      ? ((e = e.substring(r + 3)), (e = i.parseAuthority(e, t)))
                      : ((e = e.substring(r + 1)), (t.urn = !0))),
                (t.path = e),
                t
              );
            }),
            (i.parseHost = function (e, t) {
              e || (e = '');
              var r,
                n,
                a = (e = e.replace(/\\/g, '/')).indexOf('/');
              if ((-1 === a && (a = e.length), '[' === e.charAt(0)))
                (r = e.indexOf(']')),
                  (t.hostname = e.substring(1, r) || null),
                  (t.port = e.substring(r + 2, a) || null),
                  '/' === t.port && (t.port = null);
              else {
                var o = e.indexOf(':'),
                  s = e.indexOf('/'),
                  u = e.indexOf(':', o + 1);
                -1 !== u && (-1 === s || u < s)
                  ? ((t.hostname = e.substring(0, a) || null), (t.port = null))
                  : ((n = e.substring(0, a).split(':')),
                    (t.hostname = n[0] || null),
                    (t.port = n[1] || null));
              }
              return (
                t.hostname && '/' !== e.substring(a).charAt(0) && (a++, (e = '/' + e)),
                t.preventInvalidHostname && i.ensureValidHostname(t.hostname, t.protocol),
                t.port && i.ensureValidPort(t.port),
                e.substring(a) || '/'
              );
            }),
            (i.parseAuthority = function (e, t) {
              return (e = i.parseUserinfo(e, t)), i.parseHost(e, t);
            }),
            (i.parseUserinfo = function (e, t) {
              var r = e;
              -1 !== e.indexOf('\\') && (e = e.replace(/\\/g, '/'));
              var n,
                a = e.indexOf('/'),
                o = e.lastIndexOf('@', a > -1 ? a : e.length - 1);
              return (
                o > -1 && (-1 === a || o < a)
                  ? ((n = e.substring(0, o).split(':')),
                    (t.username = n[0] ? i.decode(n[0]) : null),
                    n.shift(),
                    (t.password = n[0] ? i.decode(n.join(':')) : null),
                    (e = r.substring(o + 1)))
                  : ((t.username = null), (t.password = null)),
                e
              );
            }),
            (i.parseQuery = function (e, t) {
              if (!e) return {};
              if (!(e = e.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, ''))) return {};
              for (var r, n, a, o = {}, u = e.split('&'), l = u.length, c = 0; c < l; c++)
                (r = u[c].split('=')),
                  (n = i.decodeQuery(r.shift(), t)),
                  (a = r.length ? i.decodeQuery(r.join('='), t) : null),
                  '__proto__' !== n &&
                    (s.call(o, n)
                      ? (('string' != typeof o[n] && null !== o[n]) || (o[n] = [o[n]]),
                        o[n].push(a))
                      : (o[n] = a));
              return o;
            }),
            (i.build = function (e) {
              var t = '',
                r = !1;
              return (
                e.protocol && (t += e.protocol + ':'),
                e.urn || (!t && !e.hostname) || ((t += '//'), (r = !0)),
                (t += i.buildAuthority(e) || ''),
                'string' == typeof e.path &&
                  ('/' !== e.path.charAt(0) && r && (t += '/'), (t += e.path)),
                'string' == typeof e.query && e.query && (t += '?' + e.query),
                'string' == typeof e.fragment && e.fragment && (t += '#' + e.fragment),
                t
              );
            }),
            (i.buildHost = function (e) {
              var t = '';
              return e.hostname
                ? (i.ip6_expression.test(e.hostname)
                    ? (t += '[' + e.hostname + ']')
                    : (t += e.hostname),
                  e.port && (t += ':' + e.port),
                  t)
                : '';
            }),
            (i.buildAuthority = function (e) {
              return i.buildUserinfo(e) + i.buildHost(e);
            }),
            (i.buildUserinfo = function (e) {
              var t = '';
              return (
                e.username && (t += i.encode(e.username)),
                e.password && (t += ':' + i.encode(e.password)),
                t && (t += '@'),
                t
              );
            }),
            (i.buildQuery = function (e, t, r) {
              var n,
                a,
                o,
                u,
                l = '';
              for (a in e)
                if ('__proto__' !== a && s.call(e, a))
                  if (c(e[a]))
                    for (n = {}, o = 0, u = e[a].length; o < u; o++)
                      void 0 !== e[a][o] &&
                        void 0 === n[e[a][o] + ''] &&
                        ((l += '&' + i.buildQueryParameter(a, e[a][o], r)),
                        !0 !== t && (n[e[a][o] + ''] = !0));
                  else void 0 !== e[a] && (l += '&' + i.buildQueryParameter(a, e[a], r));
              return l.substring(1);
            }),
            (i.buildQueryParameter = function (e, t, r) {
              return i.encodeQuery(e, r) + (null !== t ? '=' + i.encodeQuery(t, r) : '');
            }),
            (i.addQuery = function (e, t, r) {
              if ('object' == typeof t) for (var n in t) s.call(t, n) && i.addQuery(e, n, t[n]);
              else {
                if ('string' != typeof t)
                  throw new TypeError(
                    'URI.addQuery() accepts an object, string as the name parameter'
                  );
                if (void 0 === e[t]) return void (e[t] = r);
                'string' == typeof e[t] && (e[t] = [e[t]]),
                  c(r) || (r = [r]),
                  (e[t] = (e[t] || []).concat(r));
              }
            }),
            (i.setQuery = function (e, t, r) {
              if ('object' == typeof t) for (var n in t) s.call(t, n) && i.setQuery(e, n, t[n]);
              else {
                if ('string' != typeof t)
                  throw new TypeError(
                    'URI.setQuery() accepts an object, string as the name parameter'
                  );
                e[t] = void 0 === r ? null : r;
              }
            }),
            (i.removeQuery = function (e, t, r) {
              var n, a, o;
              if (c(t)) for (n = 0, a = t.length; n < a; n++) e[t[n]] = void 0;
              else if ('RegExp' === l(t)) for (o in e) t.test(o) && (e[o] = void 0);
              else if ('object' == typeof t) for (o in t) s.call(t, o) && i.removeQuery(e, o, t[o]);
              else {
                if ('string' != typeof t)
                  throw new TypeError(
                    'URI.removeQuery() accepts an object, string, RegExp as the first parameter'
                  );
                void 0 !== r
                  ? 'RegExp' === l(r)
                    ? !c(e[t]) && r.test(e[t])
                      ? (e[t] = void 0)
                      : (e[t] = d(e[t], r))
                    : e[t] !== String(r) || (c(r) && 1 !== r.length)
                    ? c(e[t]) && (e[t] = d(e[t], r))
                    : (e[t] = void 0)
                  : (e[t] = void 0);
              }
            }),
            (i.hasQuery = function (e, t, r, n) {
              switch (l(t)) {
                case 'String':
                  break;
                case 'RegExp':
                  for (var a in e)
                    if (s.call(e, a) && t.test(a) && (void 0 === r || i.hasQuery(e, a, r)))
                      return !0;
                  return !1;
                case 'Object':
                  for (var o in t) if (s.call(t, o) && !i.hasQuery(e, o, t[o])) return !1;
                  return !0;
                default:
                  throw new TypeError(
                    'URI.hasQuery() accepts a string, regular expression or object as the name parameter'
                  );
              }
              switch (l(r)) {
                case 'Undefined':
                  return t in e;
                case 'Boolean':
                  return r === Boolean(c(e[t]) ? e[t].length : e[t]);
                case 'Function':
                  return !!r(e[t], t, e);
                case 'Array':
                  return !!c(e[t]) && (n ? f : p)(e[t], r);
                case 'RegExp':
                  return c(e[t]) ? !!n && f(e[t], r) : Boolean(e[t] && e[t].match(r));
                case 'Number':
                  r = String(r);
                case 'String':
                  return c(e[t]) ? !!n && f(e[t], r) : e[t] === r;
                default:
                  throw new TypeError(
                    'URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter'
                  );
              }
            }),
            (i.joinPaths = function () {
              for (var e = [], t = [], r = 0, n = 0; n < arguments.length; n++) {
                var a = new i(arguments[n]);
                e.push(a);
                for (var o = a.segment(), s = 0; s < o.length; s++)
                  'string' == typeof o[s] && t.push(o[s]), o[s] && r++;
              }
              if (!t.length || !r) return new i('');
              var u = new i('').segment(t);
              return (
                ('' !== e[0].path() && '/' !== e[0].path().slice(0, 1)) || u.path('/' + u.path()),
                u.normalize()
              );
            }),
            (i.commonPath = function (e, t) {
              var r,
                n = Math.min(e.length, t.length);
              for (r = 0; r < n; r++)
                if (e.charAt(r) !== t.charAt(r)) {
                  r--;
                  break;
                }
              return r < 1
                ? e.charAt(0) === t.charAt(0) && '/' === e.charAt(0)
                  ? '/'
                  : ''
                : (('/' === e.charAt(r) && '/' === t.charAt(r)) ||
                    (r = e.substring(0, r).lastIndexOf('/')),
                  e.substring(0, r + 1));
            }),
            (i.withinString = function (e, t, r) {
              r || (r = {});
              var n = r.start || i.findUri.start,
                a = r.end || i.findUri.end,
                o = r.trim || i.findUri.trim,
                s = r.parens || i.findUri.parens,
                u = /[a-z0-9-]=["']?$/i;
              for (n.lastIndex = 0; ; ) {
                var l = n.exec(e);
                if (!l) break;
                var c = l.index;
                if (r.ignoreHtml) {
                  var d = e.slice(Math.max(c - 3, 0), c);
                  if (d && u.test(d)) continue;
                }
                for (var f = c + e.slice(c).search(a), p = e.slice(c, f), h = -1; ; ) {
                  var m = s.exec(p);
                  if (!m) break;
                  var g = m.index + m[0].length;
                  h = Math.max(h, g);
                }
                if (
                  !(
                    (p = h > -1 ? p.slice(0, h) + p.slice(h).replace(o, '') : p.replace(o, ''))
                      .length <= l[0].length ||
                    (r.ignore && r.ignore.test(p))
                  )
                ) {
                  var v = t(p, c, (f = c + p.length), e);
                  void 0 !== v
                    ? ((v = String(v)),
                      (e = e.slice(0, c) + v + e.slice(f)),
                      (n.lastIndex = c + v.length))
                    : (n.lastIndex = f);
                }
              }
              return (n.lastIndex = 0), e;
            }),
            (i.ensureValidHostname = function (t, r) {
              var n = !!t,
                a = !1;
              if ((!!r && (a = f(i.hostProtocols, r)), a && !n))
                throw new TypeError('Hostname cannot be empty, if protocol is ' + r);
              if (t && t.match(i.invalid_hostname_characters)) {
                if (!e)
                  throw new TypeError(
                    'Hostname "' +
                      t +
                      '" contains characters other than [A-Z0-9.-:_] and Punycode.js is not available'
                  );
                if (e.toASCII(t).match(i.invalid_hostname_characters))
                  throw new TypeError(
                    'Hostname "' + t + '" contains characters other than [A-Z0-9.-:_]'
                  );
              }
            }),
            (i.ensureValidPort = function (e) {
              if (e) {
                var t = Number(e);
                if (!(/^[0-9]+$/.test(t) && t > 0 && t < 65536))
                  throw new TypeError('Port "' + e + '" is not a valid port');
              }
            }),
            (i.noConflict = function (e) {
              if (e) {
                var t = { URI: this.noConflict() };
                return (
                  n.URITemplate &&
                    'function' == typeof n.URITemplate.noConflict &&
                    (t.URITemplate = n.URITemplate.noConflict()),
                  n.IPv6 &&
                    'function' == typeof n.IPv6.noConflict &&
                    (t.IPv6 = n.IPv6.noConflict()),
                  n.SecondLevelDomains &&
                    'function' == typeof n.SecondLevelDomains.noConflict &&
                    (t.SecondLevelDomains = n.SecondLevelDomains.noConflict()),
                  t
                );
              }
              return n.URI === this && (n.URI = a), this;
            }),
            (o.build = function (e) {
              return (
                !0 === e
                  ? (this._deferred_build = !0)
                  : (void 0 === e || this._deferred_build) &&
                    ((this._string = i.build(this._parts)), (this._deferred_build = !1)),
                this
              );
            }),
            (o.clone = function () {
              return new i(this);
            }),
            (o.valueOf = o.toString =
              function () {
                return this.build(!1)._string;
              }),
            (o.protocol = _('protocol')),
            (o.username = _('username')),
            (o.password = _('password')),
            (o.hostname = _('hostname')),
            (o.port = _('port')),
            (o.query = b('query', '?')),
            (o.fragment = b('fragment', '#')),
            (o.search = function (e, t) {
              var r = this.query(e, t);
              return 'string' == typeof r && r.length ? '?' + r : r;
            }),
            (o.hash = function (e, t) {
              var r = this.fragment(e, t);
              return 'string' == typeof r && r.length ? '#' + r : r;
            }),
            (o.pathname = function (e, t) {
              if (void 0 === e || !0 === e) {
                var r = this._parts.path || (this._parts.hostname ? '/' : '');
                return e ? (this._parts.urn ? i.decodeUrnPath : i.decodePath)(r) : r;
              }
              return (
                this._parts.urn
                  ? (this._parts.path = e ? i.recodeUrnPath(e) : '')
                  : (this._parts.path = e ? i.recodePath(e) : '/'),
                this.build(!t),
                this
              );
            }),
            (o.path = o.pathname),
            (o.href = function (e, t) {
              var r;
              if (void 0 === e) return this.toString();
              (this._string = ''), (this._parts = i._parts());
              var n = e instanceof i,
                a = 'object' == typeof e && (e.hostname || e.path || e.pathname);
              if (
                (e.nodeName && ((e = e[i.getDomAttribute(e)] || ''), (a = !1)),
                !n && a && void 0 !== e.pathname && (e = e.toString()),
                'string' == typeof e || e instanceof String)
              )
                this._parts = i.parse(String(e), this._parts);
              else {
                if (!n && !a) throw new TypeError('invalid input');
                var o = n ? e._parts : e;
                for (r in o) 'query' !== r && s.call(this._parts, r) && (this._parts[r] = o[r]);
                o.query && this.query(o.query, !1);
              }
              return this.build(!t), this;
            }),
            (o.is = function (e) {
              var t = !1,
                n = !1,
                a = !1,
                o = !1,
                s = !1,
                u = !1,
                l = !1,
                c = !this._parts.urn;
              switch (
                (this._parts.hostname &&
                  ((c = !1),
                  (n = i.ip4_expression.test(this._parts.hostname)),
                  (a = i.ip6_expression.test(this._parts.hostname)),
                  (s = (o = !(t = n || a)) && r && r.has(this._parts.hostname)),
                  (u = o && i.idn_expression.test(this._parts.hostname)),
                  (l = o && i.punycode_expression.test(this._parts.hostname))),
                e.toLowerCase())
              ) {
                case 'relative':
                  return c;
                case 'absolute':
                  return !c;
                case 'domain':
                case 'name':
                  return o;
                case 'sld':
                  return s;
                case 'ip':
                  return t;
                case 'ip4':
                case 'ipv4':
                case 'inet4':
                  return n;
                case 'ip6':
                case 'ipv6':
                case 'inet6':
                  return a;
                case 'idn':
                  return u;
                case 'url':
                  return !this._parts.urn;
                case 'urn':
                  return !!this._parts.urn;
                case 'punycode':
                  return l;
              }
              return null;
            });
          var x = o.protocol,
            S = o.port,
            E = o.hostname;
          (o.protocol = function (e, t) {
            if (e && !(e = e.replace(/:(\/\/)?$/, '')).match(i.protocol_expression))
              throw new TypeError(
                'Protocol "' +
                  e +
                  '" contains characters other than [A-Z0-9.+-] or doesn\'t start with [A-Z]'
              );
            return x.call(this, e, t);
          }),
            (o.scheme = o.protocol),
            (o.port = function (e, t) {
              return this._parts.urn
                ? void 0 === e
                  ? ''
                  : this
                : (void 0 !== e &&
                    (0 === e && (e = null),
                    e &&
                      (':' === (e += '').charAt(0) && (e = e.substring(1)), i.ensureValidPort(e))),
                  S.call(this, e, t));
            }),
            (o.hostname = function (e, t) {
              if (this._parts.urn) return void 0 === e ? '' : this;
              if (void 0 !== e) {
                var r = { preventInvalidHostname: this._parts.preventInvalidHostname };
                if ('/' !== i.parseHost(e, r))
                  throw new TypeError(
                    'Hostname "' + e + '" contains characters other than [A-Z0-9.-]'
                  );
                (e = r.hostname),
                  this._parts.preventInvalidHostname &&
                    i.ensureValidHostname(e, this._parts.protocol);
              }
              return E.call(this, e, t);
            }),
            (o.origin = function (e, t) {
              if (this._parts.urn) return void 0 === e ? '' : this;
              if (void 0 === e) {
                var r = this.protocol();
                return this.authority() ? (r ? r + '://' : '') + this.authority() : '';
              }
              var n = i(e);
              return this.protocol(n.protocol()).authority(n.authority()).build(!t), this;
            }),
            (o.host = function (e, t) {
              if (this._parts.urn) return void 0 === e ? '' : this;
              if (void 0 === e) return this._parts.hostname ? i.buildHost(this._parts) : '';
              if ('/' !== i.parseHost(e, this._parts))
                throw new TypeError(
                  'Hostname "' + e + '" contains characters other than [A-Z0-9.-]'
                );
              return this.build(!t), this;
            }),
            (o.authority = function (e, t) {
              if (this._parts.urn) return void 0 === e ? '' : this;
              if (void 0 === e) return this._parts.hostname ? i.buildAuthority(this._parts) : '';
              if ('/' !== i.parseAuthority(e, this._parts))
                throw new TypeError(
                  'Hostname "' + e + '" contains characters other than [A-Z0-9.-]'
                );
              return this.build(!t), this;
            }),
            (o.userinfo = function (e, t) {
              if (this._parts.urn) return void 0 === e ? '' : this;
              if (void 0 === e) {
                var r = i.buildUserinfo(this._parts);
                return r ? r.substring(0, r.length - 1) : r;
              }
              return (
                '@' !== e[e.length - 1] && (e += '@'),
                i.parseUserinfo(e, this._parts),
                this.build(!t),
                this
              );
            }),
            (o.resource = function (e, t) {
              var r;
              return void 0 === e
                ? this.path() + this.search() + this.hash()
                : ((r = i.parse(e)),
                  (this._parts.path = r.path),
                  (this._parts.query = r.query),
                  (this._parts.fragment = r.fragment),
                  this.build(!t),
                  this);
            }),
            (o.subdomain = function (e, t) {
              if (this._parts.urn) return void 0 === e ? '' : this;
              if (void 0 === e) {
                if (!this._parts.hostname || this.is('IP')) return '';
                var r = this._parts.hostname.length - this.domain().length - 1;
                return this._parts.hostname.substring(0, r) || '';
              }
              var n = this._parts.hostname.length - this.domain().length,
                a = this._parts.hostname.substring(0, n),
                o = new RegExp('^' + u(a));
              if ((e && '.' !== e.charAt(e.length - 1) && (e += '.'), -1 !== e.indexOf(':')))
                throw new TypeError('Domains cannot contain colons');
              return (
                e && i.ensureValidHostname(e, this._parts.protocol),
                (this._parts.hostname = this._parts.hostname.replace(o, e)),
                this.build(!t),
                this
              );
            }),
            (o.domain = function (e, t) {
              if (this._parts.urn) return void 0 === e ? '' : this;
              if (('boolean' == typeof e && ((t = e), (e = void 0)), void 0 === e)) {
                if (!this._parts.hostname || this.is('IP')) return '';
                var r = this._parts.hostname.match(/\./g);
                if (r && r.length < 2) return this._parts.hostname;
                var n = this._parts.hostname.length - this.tld(t).length - 1;
                return (
                  (n = this._parts.hostname.lastIndexOf('.', n - 1) + 1),
                  this._parts.hostname.substring(n) || ''
                );
              }
              if (!e) throw new TypeError('cannot set domain empty');
              if (-1 !== e.indexOf(':')) throw new TypeError('Domains cannot contain colons');
              if (
                (i.ensureValidHostname(e, this._parts.protocol),
                !this._parts.hostname || this.is('IP'))
              )
                this._parts.hostname = e;
              else {
                var a = new RegExp(u(this.domain()) + '$');
                this._parts.hostname = this._parts.hostname.replace(a, e);
              }
              return this.build(!t), this;
            }),
            (o.tld = function (e, t) {
              if (this._parts.urn) return void 0 === e ? '' : this;
              if (('boolean' == typeof e && ((t = e), (e = void 0)), void 0 === e)) {
                if (!this._parts.hostname || this.is('IP')) return '';
                var n = this._parts.hostname.lastIndexOf('.'),
                  a = this._parts.hostname.substring(n + 1);
                return (
                  (!0 !== t && r && r.list[a.toLowerCase()] && r.get(this._parts.hostname)) || a
                );
              }
              var i;
              if (!e) throw new TypeError('cannot set TLD empty');
              if (e.match(/[^a-zA-Z0-9-]/)) {
                if (!r || !r.is(e))
                  throw new TypeError('TLD "' + e + '" contains characters other than [A-Z0-9]');
                (i = new RegExp(u(this.tld()) + '$')),
                  (this._parts.hostname = this._parts.hostname.replace(i, e));
              } else {
                if (!this._parts.hostname || this.is('IP'))
                  throw new ReferenceError('cannot set TLD on non-domain host');
                (i = new RegExp(u(this.tld()) + '$')),
                  (this._parts.hostname = this._parts.hostname.replace(i, e));
              }
              return this.build(!t), this;
            }),
            (o.directory = function (e, t) {
              if (this._parts.urn) return void 0 === e ? '' : this;
              if (void 0 === e || !0 === e) {
                if (!this._parts.path && !this._parts.hostname) return '';
                if ('/' === this._parts.path) return '/';
                var r = this._parts.path.length - this.filename().length - 1,
                  n = this._parts.path.substring(0, r) || (this._parts.hostname ? '/' : '');
                return e ? i.decodePath(n) : n;
              }
              var a = this._parts.path.length - this.filename().length,
                o = this._parts.path.substring(0, a),
                s = new RegExp('^' + u(o));
              return (
                this.is('relative') || (e || (e = '/'), '/' !== e.charAt(0) && (e = '/' + e)),
                e && '/' !== e.charAt(e.length - 1) && (e += '/'),
                (e = i.recodePath(e)),
                (this._parts.path = this._parts.path.replace(s, e)),
                this.build(!t),
                this
              );
            }),
            (o.filename = function (e, t) {
              if (this._parts.urn) return void 0 === e ? '' : this;
              if ('string' != typeof e) {
                if (!this._parts.path || '/' === this._parts.path) return '';
                var r = this._parts.path.lastIndexOf('/'),
                  n = this._parts.path.substring(r + 1);
                return e ? i.decodePathSegment(n) : n;
              }
              var a = !1;
              '/' === e.charAt(0) && (e = e.substring(1)), e.match(/\.?\//) && (a = !0);
              var o = new RegExp(u(this.filename()) + '$');
              return (
                (e = i.recodePath(e)),
                (this._parts.path = this._parts.path.replace(o, e)),
                a ? this.normalizePath(t) : this.build(!t),
                this
              );
            }),
            (o.suffix = function (e, t) {
              if (this._parts.urn) return void 0 === e ? '' : this;
              if (void 0 === e || !0 === e) {
                if (!this._parts.path || '/' === this._parts.path) return '';
                var r,
                  n,
                  a = this.filename(),
                  o = a.lastIndexOf('.');
                return -1 === o
                  ? ''
                  : ((r = a.substring(o + 1)),
                    (n = /^[a-z0-9%]+$/i.test(r) ? r : ''),
                    e ? i.decodePathSegment(n) : n);
              }
              '.' === e.charAt(0) && (e = e.substring(1));
              var s,
                l = this.suffix();
              if (l) s = e ? new RegExp(u(l) + '$') : new RegExp(u('.' + l) + '$');
              else {
                if (!e) return this;
                this._parts.path += '.' + i.recodePath(e);
              }
              return (
                s && ((e = i.recodePath(e)), (this._parts.path = this._parts.path.replace(s, e))),
                this.build(!t),
                this
              );
            }),
            (o.segment = function (e, t, r) {
              var n = this._parts.urn ? ':' : '/',
                a = this.path(),
                i = '/' === a.substring(0, 1),
                o = a.split(n);
              if (
                (void 0 !== e && 'number' != typeof e && ((r = t), (t = e), (e = void 0)),
                void 0 !== e && 'number' != typeof e)
              )
                throw new Error('Bad segment "' + e + '", must be 0-based integer');
              if ((i && o.shift(), e < 0 && (e = Math.max(o.length + e, 0)), void 0 === t))
                return void 0 === e ? o : o[e];
              if (null === e || void 0 === o[e])
                if (c(t)) {
                  o = [];
                  for (var s = 0, u = t.length; s < u; s++)
                    (t[s].length || (o.length && o[o.length - 1].length)) &&
                      (o.length && !o[o.length - 1].length && o.pop(), o.push(h(t[s])));
                } else
                  (t || 'string' == typeof t) &&
                    ((t = h(t)), '' === o[o.length - 1] ? (o[o.length - 1] = t) : o.push(t));
              else t ? (o[e] = h(t)) : o.splice(e, 1);
              return i && o.unshift(''), this.path(o.join(n), r);
            }),
            (o.segmentCoded = function (e, t, r) {
              var n, a, o;
              if (('number' != typeof e && ((r = t), (t = e), (e = void 0)), void 0 === t)) {
                if (c((n = this.segment(e, t, r))))
                  for (a = 0, o = n.length; a < o; a++) n[a] = i.decode(n[a]);
                else n = void 0 !== n ? i.decode(n) : void 0;
                return n;
              }
              if (c(t)) for (a = 0, o = t.length; a < o; a++) t[a] = i.encode(t[a]);
              else t = 'string' == typeof t || t instanceof String ? i.encode(t) : t;
              return this.segment(e, t, r);
            });
          var A = o.query;
          return (
            (o.query = function (e, t) {
              if (!0 === e) return i.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
              if ('function' == typeof e) {
                var r = i.parseQuery(this._parts.query, this._parts.escapeQuerySpace),
                  n = e.call(this, r);
                return (
                  (this._parts.query = i.buildQuery(
                    n || r,
                    this._parts.duplicateQueryParameters,
                    this._parts.escapeQuerySpace
                  )),
                  this.build(!t),
                  this
                );
              }
              return void 0 !== e && 'string' != typeof e
                ? ((this._parts.query = i.buildQuery(
                    e,
                    this._parts.duplicateQueryParameters,
                    this._parts.escapeQuerySpace
                  )),
                  this.build(!t),
                  this)
                : A.call(this, e, t);
            }),
            (o.setQuery = function (e, t, r) {
              var n = i.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
              if ('string' == typeof e || e instanceof String) n[e] = void 0 !== t ? t : null;
              else {
                if ('object' != typeof e)
                  throw new TypeError(
                    'URI.addQuery() accepts an object, string as the name parameter'
                  );
                for (var a in e) s.call(e, a) && (n[a] = e[a]);
              }
              return (
                (this._parts.query = i.buildQuery(
                  n,
                  this._parts.duplicateQueryParameters,
                  this._parts.escapeQuerySpace
                )),
                'string' != typeof e && (r = t),
                this.build(!r),
                this
              );
            }),
            (o.addQuery = function (e, t, r) {
              var n = i.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
              return (
                i.addQuery(n, e, void 0 === t ? null : t),
                (this._parts.query = i.buildQuery(
                  n,
                  this._parts.duplicateQueryParameters,
                  this._parts.escapeQuerySpace
                )),
                'string' != typeof e && (r = t),
                this.build(!r),
                this
              );
            }),
            (o.removeQuery = function (e, t, r) {
              var n = i.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
              return (
                i.removeQuery(n, e, t),
                (this._parts.query = i.buildQuery(
                  n,
                  this._parts.duplicateQueryParameters,
                  this._parts.escapeQuerySpace
                )),
                'string' != typeof e && (r = t),
                this.build(!r),
                this
              );
            }),
            (o.hasQuery = function (e, t, r) {
              var n = i.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
              return i.hasQuery(n, e, t, r);
            }),
            (o.setSearch = o.setQuery),
            (o.addSearch = o.addQuery),
            (o.removeSearch = o.removeQuery),
            (o.hasSearch = o.hasQuery),
            (o.normalize = function () {
              return this._parts.urn
                ? this.normalizeProtocol(!1)
                    .normalizePath(!1)
                    .normalizeQuery(!1)
                    .normalizeFragment(!1)
                    .build()
                : this.normalizeProtocol(!1)
                    .normalizeHostname(!1)
                    .normalizePort(!1)
                    .normalizePath(!1)
                    .normalizeQuery(!1)
                    .normalizeFragment(!1)
                    .build();
            }),
            (o.normalizeProtocol = function (e) {
              return (
                'string' == typeof this._parts.protocol &&
                  ((this._parts.protocol = this._parts.protocol.toLowerCase()), this.build(!e)),
                this
              );
            }),
            (o.normalizeHostname = function (r) {
              return (
                this._parts.hostname &&
                  (this.is('IDN') && e
                    ? (this._parts.hostname = e.toASCII(this._parts.hostname))
                    : this.is('IPv6') && t && (this._parts.hostname = t.best(this._parts.hostname)),
                  (this._parts.hostname = this._parts.hostname.toLowerCase()),
                  this.build(!r)),
                this
              );
            }),
            (o.normalizePort = function (e) {
              return (
                'string' == typeof this._parts.protocol &&
                  this._parts.port === i.defaultPorts[this._parts.protocol] &&
                  ((this._parts.port = null), this.build(!e)),
                this
              );
            }),
            (o.normalizePath = function (e) {
              var t,
                r = this._parts.path;
              if (!r) return this;
              if (this._parts.urn)
                return (this._parts.path = i.recodeUrnPath(this._parts.path)), this.build(!e), this;
              if ('/' === this._parts.path) return this;
              var n,
                a,
                o = '';
              for (
                '/' !== (r = i.recodePath(r)).charAt(0) && ((t = !0), (r = '/' + r)),
                  ('/..' !== r.slice(-3) && '/.' !== r.slice(-2)) || (r += '/'),
                  r = r.replace(/(\/(\.\/)+)|(\/\.$)/g, '/').replace(/\/{2,}/g, '/'),
                  t && (o = r.substring(1).match(/^(\.\.\/)+/) || '') && (o = o[0]);
                -1 !== (n = r.search(/\/\.\.(\/|$)/));

              )
                0 !== n
                  ? (-1 === (a = r.substring(0, n).lastIndexOf('/')) && (a = n),
                    (r = r.substring(0, a) + r.substring(n + 3)))
                  : (r = r.substring(3));
              return (
                t && this.is('relative') && (r = o + r.substring(1)),
                (this._parts.path = r),
                this.build(!e),
                this
              );
            }),
            (o.normalizePathname = o.normalizePath),
            (o.normalizeQuery = function (e) {
              return (
                'string' == typeof this._parts.query &&
                  (this._parts.query.length
                    ? this.query(i.parseQuery(this._parts.query, this._parts.escapeQuerySpace))
                    : (this._parts.query = null),
                  this.build(!e)),
                this
              );
            }),
            (o.normalizeFragment = function (e) {
              return this._parts.fragment || ((this._parts.fragment = null), this.build(!e)), this;
            }),
            (o.normalizeSearch = o.normalizeQuery),
            (o.normalizeHash = o.normalizeFragment),
            (o.iso8859 = function () {
              var e = i.encode,
                t = i.decode;
              (i.encode = escape), (i.decode = decodeURIComponent);
              try {
                this.normalize();
              } finally {
                (i.encode = e), (i.decode = t);
              }
              return this;
            }),
            (o.unicode = function () {
              var e = i.encode,
                t = i.decode;
              (i.encode = g), (i.decode = unescape);
              try {
                this.normalize();
              } finally {
                (i.encode = e), (i.decode = t);
              }
              return this;
            }),
            (o.readable = function () {
              var t = this.clone();
              t.username('').password('').normalize();
              var r = '';
              if (
                (t._parts.protocol && (r += t._parts.protocol + '://'),
                t._parts.hostname &&
                  (t.is('punycode') && e
                    ? ((r += e.toUnicode(t._parts.hostname)),
                      t._parts.port && (r += ':' + t._parts.port))
                    : (r += t.host())),
                t._parts.hostname && t._parts.path && '/' !== t._parts.path.charAt(0) && (r += '/'),
                (r += t.path(!0)),
                t._parts.query)
              ) {
                for (var n = '', a = 0, o = t._parts.query.split('&'), s = o.length; a < s; a++) {
                  var u = (o[a] || '').split('=');
                  (n +=
                    '&' + i.decodeQuery(u[0], this._parts.escapeQuerySpace).replace(/&/g, '%26')),
                    void 0 !== u[1] &&
                      (n +=
                        '=' +
                        i.decodeQuery(u[1], this._parts.escapeQuerySpace).replace(/&/g, '%26'));
                }
                r += '?' + n.substring(1);
              }
              return (r += i.decodeQuery(t.hash(), !0));
            }),
            (o.absoluteTo = function (e) {
              var t,
                r,
                n,
                a = this.clone(),
                o = ['protocol', 'username', 'password', 'hostname', 'port'];
              if (this._parts.urn)
                throw new Error('URNs do not have any generally defined hierarchical components');
              if ((e instanceof i || (e = new i(e)), a._parts.protocol)) return a;
              if (((a._parts.protocol = e._parts.protocol), this._parts.hostname)) return a;
              for (r = 0; (n = o[r]); r++) a._parts[n] = e._parts[n];
              return (
                a._parts.path
                  ? ('..' === a._parts.path.substring(-2) && (a._parts.path += '/'),
                    '/' !== a.path().charAt(0) &&
                      ((t = (t = e.directory()) || (0 === e.path().indexOf('/') ? '/' : '')),
                      (a._parts.path = (t ? t + '/' : '') + a._parts.path),
                      a.normalizePath()))
                  : ((a._parts.path = e._parts.path),
                    a._parts.query || (a._parts.query = e._parts.query)),
                a.build(),
                a
              );
            }),
            (o.relativeTo = function (e) {
              var t,
                r,
                n,
                a,
                o,
                s = this.clone().normalize();
              if (s._parts.urn)
                throw new Error('URNs do not have any generally defined hierarchical components');
              if (
                ((e = new i(e).normalize()),
                (t = s._parts),
                (r = e._parts),
                (a = s.path()),
                (o = e.path()),
                '/' !== a.charAt(0))
              )
                throw new Error('URI is already relative');
              if ('/' !== o.charAt(0))
                throw new Error('Cannot calculate a URI relative to another relative URI');
              if (
                (t.protocol === r.protocol && (t.protocol = null),
                t.username !== r.username || t.password !== r.password)
              )
                return s.build();
              if (null !== t.protocol || null !== t.username || null !== t.password)
                return s.build();
              if (t.hostname !== r.hostname || t.port !== r.port) return s.build();
              if (((t.hostname = null), (t.port = null), a === o)) return (t.path = ''), s.build();
              if (!(n = i.commonPath(a, o))) return s.build();
              var u = r.path
                .substring(n.length)
                .replace(/[^\/]*$/, '')
                .replace(/.*?\//g, '../');
              return (t.path = u + t.path.substring(n.length) || './'), s.build();
            }),
            (o.equals = function (e) {
              var t,
                r,
                n,
                a,
                o,
                u = this.clone(),
                l = new i(e),
                d = {};
              if ((u.normalize(), l.normalize(), u.toString() === l.toString())) return !0;
              if (
                ((n = u.query()),
                (a = l.query()),
                u.query(''),
                l.query(''),
                u.toString() !== l.toString())
              )
                return !1;
              if (n.length !== a.length) return !1;
              for (o in ((t = i.parseQuery(n, this._parts.escapeQuerySpace)),
              (r = i.parseQuery(a, this._parts.escapeQuerySpace)),
              t))
                if (s.call(t, o)) {
                  if (c(t[o])) {
                    if (!p(t[o], r[o])) return !1;
                  } else if (t[o] !== r[o]) return !1;
                  d[o] = !0;
                }
              for (o in r) if (s.call(r, o) && !d[o]) return !1;
              return !0;
            }),
            (o.preventInvalidHostname = function (e) {
              return (this._parts.preventInvalidHostname = !!e), this;
            }),
            (o.duplicateQueryParameters = function (e) {
              return (this._parts.duplicateQueryParameters = !!e), this;
            }),
            (o.escapeQuerySpace = function (e) {
              return (this._parts.escapeQuerySpace = !!e), this;
            }),
            i
          );
        }),
        e.exports
          ? (e.exports = r(At, Ot, It))
          : (t.URI = r(t.punycode, t.IPv6, t.SecondLevelDomains, t));
    });
  function Pt(e, t) {
    if (null === e || 'object' != typeof e) return e;
    t = n.defaultValue(t, !1);
    var r = new e.constructor();
    for (var a in e)
      if (e.hasOwnProperty(a)) {
        var i = e[a];
        t && (i = Pt(i, t)), (r[a] = i);
      }
    return r;
  }
  function Tt(e, t) {
    var r;
    return 'undefined' != typeof document && (r = document), Tt._implementation(e, t, r);
  }
  Tt._implementation = function (e, t, r) {
    if (!n.defined(t)) {
      if (void 0 === r) return e;
      t = n.defaultValue(r.baseURI, r.location.href);
    }
    var a = new Rt(e);
    return '' !== a.scheme() ? a.toString() : a.absoluteTo(t).toString();
  };
  var qt,
    zt = /^blob:/i;
  function Mt(e) {
    return zt.test(e);
  }
  var Dt = /^data:/i;
  function Ut(e) {
    return Dt.test(e);
  }
  var kt = Object.freeze({
      UNISSUED: 0,
      ISSUED: 1,
      ACTIVE: 2,
      RECEIVED: 3,
      CANCELLED: 4,
      FAILED: 5,
    }),
    Ft = Object.freeze({ TERRAIN: 0, IMAGERY: 1, TILES3D: 2, OTHER: 3 });
  function Nt(e) {
    e = n.defaultValue(e, n.defaultValue.EMPTY_OBJECT);
    var t = n.defaultValue(e.throttleByServer, !1),
      r = n.defaultValue(e.throttle, !1);
    (this.url = e.url),
      (this.requestFunction = e.requestFunction),
      (this.cancelFunction = e.cancelFunction),
      (this.priorityFunction = e.priorityFunction),
      (this.priority = n.defaultValue(e.priority, 0)),
      (this.throttle = r),
      (this.throttleByServer = t),
      (this.type = n.defaultValue(e.type, Ft.OTHER)),
      (this.serverKey = void 0),
      (this.state = kt.UNISSUED),
      (this.deferred = void 0),
      (this.cancelled = !1);
  }
  function jt(e, t, r) {
    (this.statusCode = e),
      (this.response = t),
      (this.responseHeaders = r),
      'string' == typeof this.responseHeaders &&
        (this.responseHeaders = (function (e) {
          var t = {};
          if (!e) return t;
          for (var r = e.split('\r\n'), n = 0; n < r.length; ++n) {
            var a = r[n],
              i = a.indexOf(': ');
            if (i > 0) {
              var o = a.substring(0, i),
                s = a.substring(i + 2);
              t[o] = s;
            }
          }
          return t;
        })(this.responseHeaders));
  }
  function Bt() {
    (this._listeners = []),
      (this._scopes = []),
      (this._toRemove = []),
      (this._insideRaiseEvent = !1);
  }
  function Vt(e, t) {
    return t - e;
  }
  function Lt(e) {
    (this._comparator = e.comparator),
      (this._array = []),
      (this._length = 0),
      (this._maximumLength = void 0);
  }
  function Qt(e, t, r) {
    var n = e[t];
    (e[t] = e[r]), (e[r] = n);
  }
  (Nt.prototype.cancel = function () {
    this.cancelled = !0;
  }),
    (Nt.prototype.clone = function (e) {
      return n.defined(e)
        ? ((e.url = this.url),
          (e.requestFunction = this.requestFunction),
          (e.cancelFunction = this.cancelFunction),
          (e.priorityFunction = this.priorityFunction),
          (e.priority = this.priority),
          (e.throttle = this.throttle),
          (e.throttleByServer = this.throttleByServer),
          (e.type = this.type),
          (e.serverKey = this.serverKey),
          (e.state = this.RequestState.UNISSUED),
          (e.deferred = void 0),
          (e.cancelled = !1),
          e)
        : new Nt(this);
    }),
    (jt.prototype.toString = function () {
      var e = 'Request has failed.';
      return n.defined(this.statusCode) && (e += ' Status Code: ' + this.statusCode), e;
    }),
    Object.defineProperties(Bt.prototype, {
      numberOfListeners: {
        get: function () {
          return this._listeners.length - this._toRemove.length;
        },
      },
    }),
    (Bt.prototype.addEventListener = function (e, t) {
      this._listeners.push(e), this._scopes.push(t);
      var r = this;
      return function () {
        r.removeEventListener(e, t);
      };
    }),
    (Bt.prototype.removeEventListener = function (e, t) {
      for (var r = this._listeners, n = this._scopes, a = -1, i = 0; i < r.length; i++)
        if (r[i] === e && n[i] === t) {
          a = i;
          break;
        }
      return (
        -1 !== a &&
        (this._insideRaiseEvent
          ? (this._toRemove.push(a), (r[a] = void 0), (n[a] = void 0))
          : (r.splice(a, 1), n.splice(a, 1)),
        !0)
      );
    }),
    (Bt.prototype.raiseEvent = function () {
      var e;
      this._insideRaiseEvent = !0;
      var t = this._listeners,
        r = this._scopes,
        a = t.length;
      for (e = 0; e < a; e++) {
        var i = t[e];
        n.defined(i) && t[e].apply(r[e], arguments);
      }
      var o = this._toRemove;
      if ((a = o.length) > 0) {
        for (o.sort(Vt), e = 0; e < a; e++) {
          var s = o[e];
          t.splice(s, 1), r.splice(s, 1);
        }
        o.length = 0;
      }
      this._insideRaiseEvent = !1;
    }),
    Object.defineProperties(Lt.prototype, {
      length: {
        get: function () {
          return this._length;
        },
      },
      internalArray: {
        get: function () {
          return this._array;
        },
      },
      maximumLength: {
        get: function () {
          return this._maximumLength;
        },
        set: function (e) {
          var t = this._length;
          if (e < t) {
            for (var r = this._array, n = e; n < t; ++n) r[n] = void 0;
            (this._length = e), (r.length = e);
          }
          this._maximumLength = e;
        },
      },
      comparator: {
        get: function () {
          return this._comparator;
        },
      },
    }),
    (Lt.prototype.reserve = function (e) {
      (e = n.defaultValue(e, this._length)), (this._array.length = e);
    }),
    (Lt.prototype.heapify = function (e) {
      e = n.defaultValue(e, 0);
      for (var t = this._length, r = this._comparator, a = this._array, i = -1, o = !0; o; ) {
        var s = 2 * (e + 1),
          u = s - 1;
        (i = u < t && r(a[u], a[e]) < 0 ? u : e),
          s < t && r(a[s], a[i]) < 0 && (i = s),
          i !== e ? (Qt(a, i, e), (e = i)) : (o = !1);
      }
    }),
    (Lt.prototype.resort = function () {
      for (var e = this._length, t = Math.ceil(e / 2); t >= 0; --t) this.heapify(t);
    }),
    (Lt.prototype.insert = function (e) {
      var t,
        r = this._array,
        a = this._comparator,
        i = this._maximumLength,
        o = this._length++;
      for (o < r.length ? (r[o] = e) : r.push(e); 0 !== o; ) {
        var s = Math.floor((o - 1) / 2);
        if (!(a(r[o], r[s]) < 0)) break;
        Qt(r, o, s), (o = s);
      }
      return n.defined(i) && this._length > i && ((t = r[i]), (this._length = i)), t;
    }),
    (Lt.prototype.pop = function (e) {
      if (((e = n.defaultValue(e, 0)), 0 !== this._length)) {
        var t = this._array,
          r = t[e];
        return Qt(t, e, --this._length), this.heapify(e), (t[this._length] = void 0), r;
      }
    });
  var Wt = {
      numberOfAttemptedRequests: 0,
      numberOfActiveRequests: 0,
      numberOfCancelledRequests: 0,
      numberOfCancelledActiveRequests: 0,
      numberOfFailedRequests: 0,
      numberOfActiveRequestsEver: 0,
      lastNumberOfActiveRequests: 0,
    },
    Ht = 20,
    Yt = new Lt({
      comparator: function (e, t) {
        return e.priority - t.priority;
      },
    });
  (Yt.maximumLength = Ht), Yt.reserve(Ht);
  var Zt = [],
    Gt = {},
    Jt = 'undefined' != typeof document ? new Rt(document.location.href) : new Rt(),
    $t = new Bt();
  function Xt() {}
  function Kt(e) {
    n.defined(e.priorityFunction) && (e.priority = e.priorityFunction());
  }
  function er(e) {
    return (
      e.state === kt.UNISSUED && ((e.state = kt.ISSUED), (e.deferred = n.when.defer())),
      e.deferred.promise
    );
  }
  function tr(e) {
    var t = er(e);
    return (
      (e.state = kt.ACTIVE),
      Zt.push(e),
      ++Wt.numberOfActiveRequests,
      ++Wt.numberOfActiveRequestsEver,
      ++Gt[e.serverKey],
      e
        .requestFunction()
        .then(
          (function (e) {
            return function (t) {
              if (e.state !== kt.CANCELLED) {
                var r = e.deferred;
                --Wt.numberOfActiveRequests,
                  --Gt[e.serverKey],
                  $t.raiseEvent(),
                  (e.state = kt.RECEIVED),
                  (e.deferred = void 0),
                  r.resolve(t);
              }
            };
          })(e)
        )
        .otherwise(
          (function (e) {
            return function (t) {
              e.state !== kt.CANCELLED &&
                (++Wt.numberOfFailedRequests,
                --Wt.numberOfActiveRequests,
                --Gt[e.serverKey],
                $t.raiseEvent(t),
                (e.state = kt.FAILED),
                e.deferred.reject(t));
            };
          })(e)
        ),
      t
    );
  }
  function rr(e) {
    var t = e.state === kt.ACTIVE;
    if (((e.state = kt.CANCELLED), ++Wt.numberOfCancelledRequests, n.defined(e.deferred))) {
      var r = e.deferred;
      (e.deferred = void 0), r.reject();
    }
    t && (--Wt.numberOfActiveRequests, --Gt[e.serverKey], ++Wt.numberOfCancelledActiveRequests),
      n.defined(e.cancelFunction) && e.cancelFunction();
  }
  (Xt.maximumRequests = 50),
    (Xt.maximumRequestsPerServer = 6),
    (Xt.requestsByServer = { 'api.cesium.com:443': 18, 'assets.cesium.com:443': 18 }),
    (Xt.throttleRequests = !0),
    (Xt.debugShowStatistics = !1),
    (Xt.requestCompletedEvent = $t),
    Object.defineProperties(Xt, {
      statistics: {
        get: function () {
          return Wt;
        },
      },
      priorityHeapLength: {
        get: function () {
          return Ht;
        },
        set: function (e) {
          if (e < Ht)
            for (; Yt.length > e; ) {
              rr(Yt.pop());
            }
          (Ht = e), (Yt.maximumLength = e), Yt.reserve(e);
        },
      },
    }),
    (Xt.serverHasOpenSlots = function (e, t) {
      t = n.defaultValue(t, 1);
      var r = n.defaultValue(Xt.requestsByServer[e], Xt.maximumRequestsPerServer);
      return Gt[e] + t <= r;
    }),
    (Xt.heapHasOpenSlots = function (e) {
      return Yt.length + e <= Ht;
    }),
    (Xt.update = function () {
      var e,
        t,
        r = 0,
        n = Zt.length;
      for (e = 0; e < n; ++e)
        (t = Zt[e]).cancelled && rr(t), t.state === kt.ACTIVE ? r > 0 && (Zt[e - r] = t) : ++r;
      Zt.length -= r;
      var a = Yt.internalArray,
        i = Yt.length;
      for (e = 0; e < i; ++e) Kt(a[e]);
      Yt.resort();
      for (var o = Math.max(Xt.maximumRequests - Zt.length, 0), s = 0; s < o && Yt.length > 0; )
        (t = Yt.pop()).cancelled
          ? rr(t)
          : !t.throttleByServer || Xt.serverHasOpenSlots(t.serverKey)
          ? (tr(t), ++s)
          : rr(t);
      !(function () {
        if (!Xt.debugShowStatistics) return;
        0 === Wt.numberOfActiveRequests &&
          Wt.lastNumberOfActiveRequests > 0 &&
          (Wt.numberOfAttemptedRequests > 0 &&
            (console.log('Number of attempted requests: ' + Wt.numberOfAttemptedRequests),
            (Wt.numberOfAttemptedRequests = 0)),
          Wt.numberOfCancelledRequests > 0 &&
            (console.log('Number of cancelled requests: ' + Wt.numberOfCancelledRequests),
            (Wt.numberOfCancelledRequests = 0)),
          Wt.numberOfCancelledActiveRequests > 0 &&
            (console.log(
              'Number of cancelled active requests: ' + Wt.numberOfCancelledActiveRequests
            ),
            (Wt.numberOfCancelledActiveRequests = 0)),
          Wt.numberOfFailedRequests > 0 &&
            (console.log('Number of failed requests: ' + Wt.numberOfFailedRequests),
            (Wt.numberOfFailedRequests = 0)));
        Wt.lastNumberOfActiveRequests = Wt.numberOfActiveRequests;
      })();
    }),
    (Xt.getServerKey = function (e) {
      var t = new Rt(e);
      '' === t.scheme() && (t = new Rt(e).absoluteTo(Jt)).normalize();
      var r = t.authority();
      /:/.test(r) || (r = r + ':' + ('https' === t.scheme() ? '443' : '80'));
      var a = Gt[r];
      return n.defined(a) || (Gt[r] = 0), r;
    }),
    (Xt.request = function (e) {
      if (Ut(e.url) || Mt(e.url))
        return $t.raiseEvent(), (e.state = kt.RECEIVED), e.requestFunction();
      if (
        (++Wt.numberOfAttemptedRequests,
        n.defined(e.serverKey) || (e.serverKey = Xt.getServerKey(e.url)),
        !Xt.throttleRequests || !e.throttleByServer || Xt.serverHasOpenSlots(e.serverKey))
      ) {
        if (!Xt.throttleRequests || !e.throttle) return tr(e);
        if (!(Zt.length >= Xt.maximumRequests)) {
          Kt(e);
          var t = Yt.insert(e);
          if (n.defined(t)) {
            if (t === e) return;
            rr(t);
          }
          return er(e);
        }
      }
    }),
    (Xt.clearForSpecs = function () {
      for (; Yt.length > 0; ) {
        rr(Yt.pop());
      }
      for (var e = Zt.length, t = 0; t < e; ++t) rr(Zt[t]);
      (Zt.length = 0),
        (Gt = {}),
        (Wt.numberOfAttemptedRequests = 0),
        (Wt.numberOfActiveRequests = 0),
        (Wt.numberOfCancelledRequests = 0),
        (Wt.numberOfCancelledActiveRequests = 0),
        (Wt.numberOfFailedRequests = 0),
        (Wt.numberOfActiveRequestsEver = 0),
        (Wt.lastNumberOfActiveRequests = 0);
    }),
    (Xt.numberOfActiveRequestsByServer = function (e) {
      return Gt[e];
    }),
    (Xt.requestHeap = Yt);
  var nr = {},
    ar = {};
  (nr.add = function (e, t) {
    var r = e.toLowerCase() + ':' + t;
    n.defined(ar[r]) || (ar[r] = !0);
  }),
    (nr.remove = function (e, t) {
      var r = e.toLowerCase() + ':' + t;
      n.defined(ar[r]) && delete ar[r];
    }),
    (nr.contains = function (e) {
      var t = (function (e) {
        var t = new Rt(e);
        t.normalize();
        var r = t.authority();
        if (0 !== r.length) {
          if ((t.authority(r), -1 !== r.indexOf('@'))) {
            var n = r.split('@');
            r = n[1];
          }
          if (-1 === r.indexOf(':')) {
            var a = t.scheme();
            if (
              (0 === a.length && (a = (a = window.location.protocol).substring(0, a.length - 1)),
              'http' === a)
            )
              r += ':80';
            else {
              if ('https' !== a) return;
              r += ':443';
            }
          }
          return r;
        }
      })(e);
      return !(!n.defined(t) || !n.defined(ar[t]));
    }),
    (nr.clear = function () {
      ar = {};
    });
  var ir,
    or = (function () {
      try {
        var e = new XMLHttpRequest();
        return e.open('GET', '#', !0), (e.responseType = 'blob'), 'blob' === e.responseType;
      } catch (e) {
        return !1;
      }
    })();
  function sr(e, t, r, a) {
    var i,
      o = e.query();
    if (0 === o.length) return {};
    if (-1 === o.indexOf('=')) {
      var s = {};
      (s[o] = void 0), (i = s);
    } else
      i = (function (e) {
        var t = {};
        if ('' === e) return t;
        for (var r = e.replace(/\+/g, '%20').split(/[&;]/), a = 0, i = r.length; a < i; ++a) {
          var o = r[a].split('='),
            s = decodeURIComponent(o[0]),
            u = o[1];
          u = n.defined(u) ? decodeURIComponent(u) : '';
          var l = t[s];
          'string' == typeof l ? (t[s] = [l, u]) : Array.isArray(l) ? l.push(u) : (t[s] = u);
        }
        return t;
      })(o);
    (t._queryParameters = r ? dr(i, t._queryParameters, a) : i), e.search('');
  }
  function ur(e, t) {
    var r = t._queryParameters,
      a = Object.keys(r);
    1 !== a.length || n.defined(r[a[0]])
      ? e.search(
          (function (e) {
            var t = '';
            for (var r in e)
              if (e.hasOwnProperty(r)) {
                var n = e[r],
                  a = encodeURIComponent(r) + '=';
                if (Array.isArray(n))
                  for (var i = 0, o = n.length; i < o; ++i) t += a + encodeURIComponent(n[i]) + '&';
                else t += a + encodeURIComponent(n) + '&';
              }
            return t.slice(0, -1);
          })(r)
        )
      : e.search(a[0]);
  }
  function lr(e, t) {
    return n.defined(e) ? (n.defined(e.clone) ? e.clone() : Pt(e)) : t;
  }
  function cr(e) {
    if (e.state === kt.ISSUED || e.state === kt.ACTIVE)
      throw new r.RuntimeError('The Resource is already being fetched.');
    (e.state = kt.UNISSUED), (e.deferred = void 0);
  }
  function dr(e, t, r) {
    if (!r) return i.combine(e, t);
    var a = Pt(e, !0);
    for (var o in t)
      if (t.hasOwnProperty(o)) {
        var s = a[o],
          u = t[o];
        n.defined(s)
          ? (Array.isArray(s) || (s = a[o] = [s]), (a[o] = s.concat(u)))
          : (a[o] = Array.isArray(u) ? u.slice() : u);
      }
    return a;
  }
  function fr(e) {
    'string' == typeof (e = n.defaultValue(e, n.defaultValue.EMPTY_OBJECT)) && (e = { url: e }),
      (this._url = void 0),
      (this._templateValues = lr(e.templateValues, {})),
      (this._queryParameters = lr(e.queryParameters, {})),
      (this.headers = lr(e.headers, {})),
      (this.request = n.defaultValue(e.request, new Nt())),
      (this.proxy = e.proxy),
      (this.retryCallback = e.retryCallback),
      (this.retryAttempts = n.defaultValue(e.retryAttempts, 0)),
      (this._retryCount = 0);
    var t = new Rt(e.url);
    sr(t, this, !0, !0), t.fragment(''), (this._url = t.toString());
  }
  function pr(e) {
    var t = e.resource,
      r = e.flipY,
      a = e.skipColorSpaceConversion,
      i = e.preferImageBitmap,
      o = t.request;
    (o.url = t.url),
      (o.requestFunction = function () {
        var e = !1;
        t.isDataUri || t.isBlobUri || (e = t.isCrossOriginUrl);
        var s = n.when.defer();
        return fr._Implementations.createImage(o, e, s, r, a, i), s.promise;
      });
    var s = Xt.request(o);
    if (n.defined(s))
      return s.otherwise(function (e) {
        return o.state !== kt.FAILED
          ? n.when.reject(e)
          : t.retryOnError(e).then(function (s) {
              return s
                ? ((o.state = kt.UNISSUED),
                  (o.deferred = void 0),
                  pr({ resource: t, flipY: r, skipColorSpaceConversion: a, preferImageBitmap: i }))
                : n.when.reject(e);
            });
      });
  }
  function hr(e, t, r) {
    var a = {};
    (a[t] = r), e.setQueryParameters(a);
    var i = e.request;
    (i.url = e.url),
      (i.requestFunction = function () {
        var t = n.when.defer();
        return (
          (window[r] = function (e) {
            t.resolve(e);
            try {
              delete window[r];
            } catch (e) {
              window[r] = void 0;
            }
          }),
          fr._Implementations.loadAndExecuteScript(e.url, r, t),
          t.promise
        );
      });
    var o = Xt.request(i);
    if (n.defined(o))
      return o.otherwise(function (a) {
        return i.state !== kt.FAILED
          ? n.when.reject(a)
          : e.retryOnError(a).then(function (o) {
              return o
                ? ((i.state = kt.UNISSUED), (i.deferred = void 0), hr(e, t, r))
                : n.when.reject(a);
            });
      });
  }
  (fr.createIfNeeded = function (e) {
    return e instanceof fr
      ? e.getDerivedResource({ request: e.request })
      : 'string' != typeof e
      ? e
      : new fr({ url: e });
  }),
    (fr.supportsImageBitmapOptions = function () {
      if (n.defined(ir)) return ir;
      if ('function' != typeof createImageBitmap) return (ir = n.when.resolve(!1));
      return (ir = fr
        .fetchBlob({
          url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWP4////fwAJ+wP9CNHoHgAAAABJRU5ErkJggg==',
        })
        .then(function (e) {
          return createImageBitmap(e, {
            imageOrientation: 'flipY',
            premultiplyAlpha: 'none',
            colorSpaceConversion: 'none',
          });
        })
        .then(function (e) {
          return !0;
        })
        .otherwise(function () {
          return !1;
        }));
    }),
    Object.defineProperties(fr, {
      isBlobSupported: {
        get: function () {
          return or;
        },
      },
    }),
    Object.defineProperties(fr.prototype, {
      queryParameters: {
        get: function () {
          return this._queryParameters;
        },
      },
      templateValues: {
        get: function () {
          return this._templateValues;
        },
      },
      url: {
        get: function () {
          return this.getUrlComponent(!0, !0);
        },
        set: function (e) {
          var t = new Rt(e);
          sr(t, this, !1), t.fragment(''), (this._url = t.toString());
        },
      },
      extension: {
        get: function () {
          return (function (e) {
            var t = new Rt(e);
            t.normalize();
            var r = t.path(),
              n = r.lastIndexOf('/');
            return (
              -1 !== n && (r = r.substr(n + 1)),
              (n = r.lastIndexOf('.')),
              -1 === n ? '' : r.substr(n + 1)
            );
          })(this._url);
        },
      },
      isDataUri: {
        get: function () {
          return Ut(this._url);
        },
      },
      isBlobUri: {
        get: function () {
          return Mt(this._url);
        },
      },
      isCrossOriginUrl: {
        get: function () {
          return (function (e) {
            n.defined(qt) || (qt = document.createElement('a')), (qt.href = window.location.href);
            var t = qt.host,
              r = qt.protocol;
            return (qt.href = e), (qt.href = qt.href), r !== qt.protocol || t !== qt.host;
          })(this._url);
        },
      },
      hasHeaders: {
        get: function () {
          return Object.keys(this.headers).length > 0;
        },
      },
    }),
    (fr.prototype.toString = function () {
      return this.getUrlComponent(!0, !0);
    }),
    (fr.prototype.getUrlComponent = function (e, t) {
      if (this.isDataUri) return this._url;
      var r = new Rt(this._url);
      e && ur(r, this);
      var a = r.toString().replace(/%7B/g, '{').replace(/%7D/g, '}');
      a = a.replace(new RegExp('\\+', 'gm'), '%2B');
      var i = this._templateValues;
      return (
        (a = a.replace(/{(.*?)}/g, function (e, t) {
          var r = i[t];
          return n.defined(r) ? encodeURIComponent(r) : e;
        })),
        t && n.defined(this.proxy) && (a = this.proxy.getURL(a)),
        a
      );
    }),
    (fr.prototype.setQueryParameters = function (e, t) {
      this._queryParameters = t
        ? dr(this._queryParameters, e, !1)
        : dr(e, this._queryParameters, !1);
    }),
    (fr.prototype.appendQueryParameters = function (e) {
      this._queryParameters = dr(e, this._queryParameters, !0);
    }),
    (fr.prototype.setTemplateValues = function (e, t) {
      this._templateValues = t
        ? i.combine(this._templateValues, e)
        : i.combine(e, this._templateValues);
    }),
    (fr.prototype.getDerivedResource = function (e) {
      var t = this.clone();
      if (((t._retryCount = 0), n.defined(e.url))) {
        var r = new Rt(e.url);
        sr(r, t, !0, n.defaultValue(e.preserveQueryParameters, !1)),
          r.fragment(''),
          '' !== r.scheme()
            ? (t._url = r.toString())
            : (t._url = r.absoluteTo(new Rt(Tt(this._url))).toString());
      }
      return (
        n.defined(e.queryParameters) &&
          (t._queryParameters = i.combine(e.queryParameters, t._queryParameters)),
        n.defined(e.templateValues) &&
          (t._templateValues = i.combine(e.templateValues, t.templateValues)),
        n.defined(e.headers) && (t.headers = i.combine(e.headers, t.headers)),
        n.defined(e.proxy) && (t.proxy = e.proxy),
        n.defined(e.request) && (t.request = e.request),
        n.defined(e.retryCallback) && (t.retryCallback = e.retryCallback),
        n.defined(e.retryAttempts) && (t.retryAttempts = e.retryAttempts),
        t
      );
    }),
    (fr.prototype.retryOnError = function (e) {
      var t = this.retryCallback;
      if ('function' != typeof t || this._retryCount >= this.retryAttempts) return n.when(!1);
      var r = this;
      return n.when(t(this, e)).then(function (e) {
        return ++r._retryCount, e;
      });
    }),
    (fr.prototype.clone = function (e) {
      return (
        n.defined(e) || (e = new fr({ url: this._url })),
        (e._url = this._url),
        (e._queryParameters = Pt(this._queryParameters)),
        (e._templateValues = Pt(this._templateValues)),
        (e.headers = Pt(this.headers)),
        (e.proxy = this.proxy),
        (e.retryCallback = this.retryCallback),
        (e.retryAttempts = this.retryAttempts),
        (e._retryCount = 0),
        (e.request = this.request.clone()),
        e
      );
    }),
    (fr.prototype.getBaseUri = function (e) {
      return (function (e, t) {
        var r = '',
          n = e.lastIndexOf('/');
        return (
          -1 !== n && (r = e.substring(0, n + 1)),
          t
            ? (0 !== (e = new Rt(e)).query().length && (r += '?' + e.query()),
              0 !== e.fragment().length && (r += '#' + e.fragment()),
              r)
            : r
        );
      })(this.getUrlComponent(e), e);
    }),
    (fr.prototype.appendForwardSlash = function () {
      var e;
      this._url = ((0 !== (e = this._url).length && '/' === e[e.length - 1]) || (e += '/'), e);
    }),
    (fr.prototype.fetchArrayBuffer = function () {
      return this.fetch({ responseType: 'arraybuffer' });
    }),
    (fr.fetchArrayBuffer = function (e) {
      return new fr(e).fetchArrayBuffer();
    }),
    (fr.prototype.fetchBlob = function () {
      return this.fetch({ responseType: 'blob' });
    }),
    (fr.fetchBlob = function (e) {
      return new fr(e).fetchBlob();
    }),
    (fr.prototype.fetchImage = function (e) {
      e = n.defaultValue(e, n.defaultValue.EMPTY_OBJECT);
      var t = n.defaultValue(e.preferImageBitmap, !1),
        r = n.defaultValue(e.preferBlob, !1),
        a = n.defaultValue(e.flipY, !1),
        i = n.defaultValue(e.skipColorSpaceConversion, !1);
      if ((cr(this.request), !or || this.isDataUri || this.isBlobUri || (!this.hasHeaders && !r)))
        return pr({ resource: this, flipY: a, skipColorSpaceConversion: i, preferImageBitmap: t });
      var o,
        s,
        u,
        l = this.fetchBlob();
      return n.defined(l)
        ? fr
            .supportsImageBitmapOptions()
            .then(function (e) {
              return (o = e && t), l;
            })
            .then(function (e) {
              if (n.defined(e)) {
                if (((u = e), o))
                  return fr.createImageBitmapFromBlob(e, {
                    flipY: a,
                    premultiplyAlpha: !1,
                    skipColorSpaceConversion: i,
                  });
                var t = window.URL.createObjectURL(e);
                return pr({
                  resource: (s = new fr({ url: t })),
                  flipY: a,
                  skipColorSpaceConversion: i,
                  preferImageBitmap: !1,
                });
              }
            })
            .then(function (e) {
              if (n.defined(e)) return (e.blob = u), o || window.URL.revokeObjectURL(s.url), e;
            })
            .otherwise(function (e) {
              return (
                n.defined(s) && window.URL.revokeObjectURL(s.url), (e.blob = u), n.when.reject(e)
              );
            })
        : void 0;
    }),
    (fr.fetchImage = function (e) {
      return new fr(e).fetchImage({
        flipY: e.flipY,
        skipColorSpaceConversion: e.skipColorSpaceConversion,
        preferBlob: e.preferBlob,
        preferImageBitmap: e.preferImageBitmap,
      });
    }),
    (fr.prototype.fetchText = function () {
      return this.fetch({ responseType: 'text' });
    }),
    (fr.fetchText = function (e) {
      return new fr(e).fetchText();
    }),
    (fr.prototype.fetchJson = function () {
      var e = this.fetch({
        responseType: 'text',
        headers: { Accept: 'application/json,*/*;q=0.01' },
      });
      if (n.defined(e))
        return e.then(function (e) {
          if (n.defined(e)) return JSON.parse(e);
        });
    }),
    (fr.fetchJson = function (e) {
      return new fr(e).fetchJson();
    }),
    (fr.prototype.fetchXML = function () {
      return this.fetch({ responseType: 'document', overrideMimeType: 'text/xml' });
    }),
    (fr.fetchXML = function (e) {
      return new fr(e).fetchXML();
    }),
    (fr.prototype.fetchJsonp = function (e) {
      var t;
      (e = n.defaultValue(e, 'callback')), cr(this.request);
      do {
        t = 'loadJsonp' + a.CesiumMath.nextRandomNumber().toString().substring(2, 8);
      } while (n.defined(window[t]));
      return hr(this, e, t);
    }),
    (fr.fetchJsonp = function (e) {
      return new fr(e).fetchJsonp(e.callbackParameterName);
    }),
    (fr.prototype._makeRequest = function (e) {
      var t = this;
      cr(t.request);
      var r = t.request;
      (r.url = t.url),
        (r.requestFunction = function () {
          var a = e.responseType,
            o = i.combine(e.headers, t.headers),
            s = e.overrideMimeType,
            u = e.method,
            l = e.data,
            c = n.when.defer(),
            d = fr._Implementations.loadWithXhr(t.url, a, u, l, o, c, s);
          return (
            n.defined(d) &&
              n.defined(d.abort) &&
              (r.cancelFunction = function () {
                d.abort();
              }),
            c.promise
          );
        });
      var a = Xt.request(r);
      if (n.defined(a))
        return a
          .then(function (e) {
            return (r.cancelFunction = void 0), e;
          })
          .otherwise(function (a) {
            return (
              (r.cancelFunction = void 0),
              r.state !== kt.FAILED
                ? n.when.reject(a)
                : t.retryOnError(a).then(function (i) {
                    return i
                      ? ((r.state = kt.UNISSUED), (r.deferred = void 0), t.fetch(e))
                      : n.when.reject(a);
                  })
            );
          });
    });
  var mr = /^data:(.*?)(;base64)?,(.*)$/;
  function gr(e, t) {
    var r = decodeURIComponent(t);
    return e ? atob(r) : r;
  }
  function vr(e, t) {
    for (
      var r = gr(e, t), n = new ArrayBuffer(r.length), a = new Uint8Array(n), i = 0;
      i < r.length;
      i++
    )
      a[i] = r.charCodeAt(i);
    return n;
  }
  function yr(e, t) {
    switch (t) {
      case 'text':
        return e.toString('utf8');
      case 'json':
        return JSON.parse(e.toString('utf8'));
      default:
        return new Uint8Array(e).buffer;
    }
  }
  (fr.prototype.fetch = function (e) {
    return ((e = lr(e, {})).method = 'GET'), this._makeRequest(e);
  }),
    (fr.fetch = function (e) {
      return new fr(e).fetch({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
      });
    }),
    (fr.prototype.delete = function (e) {
      return ((e = lr(e, {})).method = 'DELETE'), this._makeRequest(e);
    }),
    (fr.delete = function (e) {
      return new fr(e).delete({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
        data: e.data,
      });
    }),
    (fr.prototype.head = function (e) {
      return ((e = lr(e, {})).method = 'HEAD'), this._makeRequest(e);
    }),
    (fr.head = function (e) {
      return new fr(e).head({ responseType: e.responseType, overrideMimeType: e.overrideMimeType });
    }),
    (fr.prototype.options = function (e) {
      return ((e = lr(e, {})).method = 'OPTIONS'), this._makeRequest(e);
    }),
    (fr.options = function (e) {
      return new fr(e).options({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
      });
    }),
    (fr.prototype.post = function (e, t) {
      return (
        r.Check.defined('data', e),
        ((t = lr(t, {})).method = 'POST'),
        (t.data = e),
        this._makeRequest(t)
      );
    }),
    (fr.post = function (e) {
      return new fr(e).post(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
      });
    }),
    (fr.prototype.put = function (e, t) {
      return (
        r.Check.defined('data', e),
        ((t = lr(t, {})).method = 'PUT'),
        (t.data = e),
        this._makeRequest(t)
      );
    }),
    (fr.put = function (e) {
      return new fr(e).put(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
      });
    }),
    (fr.prototype.patch = function (e, t) {
      return (
        r.Check.defined('data', e),
        ((t = lr(t, {})).method = 'PATCH'),
        (t.data = e),
        this._makeRequest(t)
      );
    }),
    (fr.patch = function (e) {
      return new fr(e).patch(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
      });
    }),
    (fr._Implementations = {}),
    (fr._Implementations.createImage = function (e, t, a, i, o, s) {
      var u = e.url;
      fr.supportsImageBitmapOptions()
        .then(function (l) {
          if (l && s) {
            var c = n.when.defer(),
              d = fr._Implementations.loadWithXhr(
                u,
                'blob',
                'GET',
                void 0,
                void 0,
                c,
                void 0,
                void 0,
                void 0
              );
            return (
              n.defined(d) &&
                n.defined(d.abort) &&
                (e.cancelFunction = function () {
                  d.abort();
                }),
              c.promise
                .then(function (e) {
                  if (n.defined(e))
                    return fr.createImageBitmapFromBlob(e, {
                      flipY: i,
                      premultiplyAlpha: !1,
                      skipColorSpaceConversion: o,
                    });
                  a.reject(
                    new r.RuntimeError(
                      'Successfully retrieved ' + u + ' but it contained no content.'
                    )
                  );
                })
                .then(a.resolve)
            );
          }
          !(function (e, t, r) {
            var n = new Image();
            (n.onload = function () {
              r.resolve(n);
            }),
              (n.onerror = function (e) {
                r.reject(e);
              }),
              t && (nr.contains(e) ? (n.crossOrigin = 'use-credentials') : (n.crossOrigin = '')),
              (n.src = e);
          })(u, t, a);
        })
        .otherwise(a.reject);
    }),
    (fr.createImageBitmapFromBlob = function (e, t) {
      return (
        r.Check.defined('options', t),
        r.Check.typeOf.bool('options.flipY', t.flipY),
        r.Check.typeOf.bool('options.premultiplyAlpha', t.premultiplyAlpha),
        r.Check.typeOf.bool('options.skipColorSpaceConversion', t.skipColorSpaceConversion),
        createImageBitmap(e, {
          imageOrientation: t.flipY ? 'flipY' : 'none',
          premultiplyAlpha: t.premultiplyAlpha ? 'premultiply' : 'none',
          colorSpaceConversion: t.skipColorSpaceConversion ? 'none' : 'default',
        })
      );
    });
  var wr = 'undefined' == typeof XMLHttpRequest;
  function Cr(e) {
    if (
      ((e = n.defaultValue(e, n.defaultValue.EMPTY_OBJECT)),
      (this._dates = void 0),
      (this._samples = void 0),
      (this._dateColumn = -1),
      (this._xPoleWanderRadiansColumn = -1),
      (this._yPoleWanderRadiansColumn = -1),
      (this._ut1MinusUtcSecondsColumn = -1),
      (this._xCelestialPoleOffsetRadiansColumn = -1),
      (this._yCelestialPoleOffsetRadiansColumn = -1),
      (this._taiMinusUtcSecondsColumn = -1),
      (this._columnCount = 0),
      (this._lastIndex = -1),
      (this._downloadPromise = void 0),
      (this._dataError = void 0),
      (this._addNewLeapSeconds = n.defaultValue(e.addNewLeapSeconds, !0)),
      n.defined(e.data))
    )
      br(this, e.data);
    else if (n.defined(e.url)) {
      var t = fr.createIfNeeded(e.url),
        r = this;
      this._downloadPromise = t
        .fetchJson()
        .then(function (e) {
          br(r, e);
        })
        .otherwise(function () {
          r._dataError =
            'An error occurred while retrieving the EOP data from the URL ' + t.url + '.';
        });
    } else
      br(this, {
        columnNames: [
          'dateIso8601',
          'modifiedJulianDateUtc',
          'xPoleWanderRadians',
          'yPoleWanderRadians',
          'ut1MinusUtcSeconds',
          'lengthOfDayCorrectionSeconds',
          'xCelestialPoleOffsetRadians',
          'yCelestialPoleOffsetRadians',
          'taiMinusUtcSeconds',
        ],
        samples: [],
      });
  }
  function _r(e, t) {
    return St.compare(e.julianDate, t);
  }
  function br(e, t) {
    if (n.defined(t.columnNames))
      if (n.defined(t.samples)) {
        var r = t.columnNames.indexOf('modifiedJulianDateUtc'),
          a = t.columnNames.indexOf('xPoleWanderRadians'),
          i = t.columnNames.indexOf('yPoleWanderRadians'),
          o = t.columnNames.indexOf('ut1MinusUtcSeconds'),
          s = t.columnNames.indexOf('xCelestialPoleOffsetRadians'),
          u = t.columnNames.indexOf('yCelestialPoleOffsetRadians'),
          l = t.columnNames.indexOf('taiMinusUtcSeconds');
        if (r < 0 || a < 0 || i < 0 || o < 0 || s < 0 || u < 0 || l < 0)
          e._dataError =
            'Error in loaded EOP data: The columnNames property must include modifiedJulianDateUtc, xPoleWanderRadians, yPoleWanderRadians, ut1MinusUtcSeconds, xCelestialPoleOffsetRadians, yCelestialPoleOffsetRadians, and taiMinusUtcSeconds columns';
        else {
          var c,
            d = (e._samples = t.samples),
            f = (e._dates = []);
          (e._dateColumn = r),
            (e._xPoleWanderRadiansColumn = a),
            (e._yPoleWanderRadiansColumn = i),
            (e._ut1MinusUtcSecondsColumn = o),
            (e._xCelestialPoleOffsetRadiansColumn = s),
            (e._yCelestialPoleOffsetRadiansColumn = u),
            (e._taiMinusUtcSecondsColumn = l),
            (e._columnCount = t.columnNames.length),
            (e._lastIndex = void 0);
          for (var p = e._addNewLeapSeconds, h = 0, m = d.length; h < m; h += e._columnCount) {
            var g = d[h + r],
              v = d[h + l],
              y = new St(g + it.MODIFIED_JULIAN_DATE_DIFFERENCE, v, ot.TAI);
            if ((f.push(y), p)) {
              if (v !== c && n.defined(c)) {
                var w = St.leapSeconds,
                  C = et(w, y, _r);
                if (C < 0) {
                  var _ = new at(y, v);
                  w.splice(~C, 0, _);
                }
              }
              c = v;
            }
          }
        }
      } else e._dataError = 'Error in loaded EOP data: The samples property is required.';
    else e._dataError = 'Error in loaded EOP data: The columnNames property is required.';
  }
  function xr(e, t, r, n, a) {
    var i = r * n;
    (a.xPoleWander = t[i + e._xPoleWanderRadiansColumn]),
      (a.yPoleWander = t[i + e._yPoleWanderRadiansColumn]),
      (a.xPoleOffset = t[i + e._xCelestialPoleOffsetRadiansColumn]),
      (a.yPoleOffset = t[i + e._yCelestialPoleOffsetRadiansColumn]),
      (a.ut1MinusUtc = t[i + e._ut1MinusUtcSecondsColumn]);
  }
  function Sr(e, t, r) {
    return t + e * (r - t);
  }
  function Er(e, t, r, n, a, i, o) {
    var s = e._columnCount;
    if (i > t.length - 1)
      return (
        (o.xPoleWander = 0),
        (o.yPoleWander = 0),
        (o.xPoleOffset = 0),
        (o.yPoleOffset = 0),
        (o.ut1MinusUtc = 0),
        o
      );
    var u = t[a],
      l = t[i];
    if (u.equals(l) || n.equals(u)) return xr(e, r, a, s, o), o;
    if (n.equals(l)) return xr(e, r, i, s, o), o;
    var c = St.secondsDifference(n, u) / St.secondsDifference(l, u),
      d = a * s,
      f = i * s,
      p = r[d + e._ut1MinusUtcSecondsColumn],
      h = r[f + e._ut1MinusUtcSecondsColumn],
      m = h - p;
    if (m > 0.5 || m < -0.5) {
      var g = r[d + e._taiMinusUtcSecondsColumn],
        v = r[f + e._taiMinusUtcSecondsColumn];
      g !== v && (l.equals(n) ? (p = h) : (h -= v - g));
    }
    return (
      (o.xPoleWander = Sr(
        c,
        r[d + e._xPoleWanderRadiansColumn],
        r[f + e._xPoleWanderRadiansColumn]
      )),
      (o.yPoleWander = Sr(
        c,
        r[d + e._yPoleWanderRadiansColumn],
        r[f + e._yPoleWanderRadiansColumn]
      )),
      (o.xPoleOffset = Sr(
        c,
        r[d + e._xCelestialPoleOffsetRadiansColumn],
        r[f + e._xCelestialPoleOffsetRadiansColumn]
      )),
      (o.yPoleOffset = Sr(
        c,
        r[d + e._yCelestialPoleOffsetRadiansColumn],
        r[f + e._yCelestialPoleOffsetRadiansColumn]
      )),
      (o.ut1MinusUtc = Sr(c, p, h)),
      o
    );
  }
  function Ar(e, t, r) {
    (this.heading = n.defaultValue(e, 0)),
      (this.pitch = n.defaultValue(t, 0)),
      (this.roll = n.defaultValue(r, 0));
  }
  (fr._Implementations.loadWithXhr = function (e, t, a, i, o, s, u) {
    var l = mr.exec(e);
    if (null === l) {
      if (!wr) {
        var c = new XMLHttpRequest();
        if (
          (nr.contains(e) && (c.withCredentials = !0),
          c.open(a, e, !0),
          n.defined(u) && n.defined(c.overrideMimeType) && c.overrideMimeType(u),
          n.defined(o))
        )
          for (var d in o) o.hasOwnProperty(d) && c.setRequestHeader(d, o[d]);
        n.defined(t) && (c.responseType = t);
        var f = !1;
        return (
          'string' == typeof e &&
            (f =
              0 === e.indexOf('file://') ||
              ('undefined' != typeof window && 'file://' === window.location.origin)),
          (c.onload = function () {
            if (!(c.status < 200 || c.status >= 300) || (f && 0 === c.status)) {
              var e = c.response,
                i = c.responseType;
              if ('HEAD' === a || 'OPTIONS' === a) {
                var o = c
                    .getAllResponseHeaders()
                    .trim()
                    .split(/[\r\n]+/),
                  u = {};
                return (
                  o.forEach(function (e) {
                    var t = e.split(': '),
                      r = t.shift();
                    u[r] = t.join(': ');
                  }),
                  void s.resolve(u)
                );
              }
              if (204 === c.status) s.resolve();
              else if (!n.defined(e) || (n.defined(t) && i !== t))
                if ('json' === t && 'string' == typeof e)
                  try {
                    s.resolve(JSON.parse(e));
                  } catch (e) {
                    s.reject(e);
                  }
                else
                  ('' === i || 'document' === i) &&
                  n.defined(c.responseXML) &&
                  c.responseXML.hasChildNodes()
                    ? s.resolve(c.responseXML)
                    : ('' !== i && 'text' !== i) || !n.defined(c.responseText)
                    ? s.reject(new r.RuntimeError('Invalid XMLHttpRequest response type.'))
                    : s.resolve(c.responseText);
              else s.resolve(e);
            } else s.reject(new jt(c.status, c.response, c.getAllResponseHeaders()));
          }),
          (c.onerror = function (e) {
            s.reject(new jt());
          }),
          c.send(i),
          c
        );
      }
      !(function (e, t, n, a, i, o, s) {
        var u = require('url').parse(e),
          l = 'https:' === u.protocol ? require('https') : require('http'),
          c = require('zlib'),
          d = {
            protocol: u.protocol,
            hostname: u.hostname,
            port: u.port,
            path: u.path,
            query: u.query,
            method: n,
            headers: i,
          };
        l.request(d)
          .on('response', function (e) {
            if (e.statusCode < 200 || e.statusCode >= 300)
              o.reject(new jt(e.statusCode, e, e.headers));
            else {
              var n = [];
              e.on('data', function (e) {
                n.push(e);
              }),
                e.on('end', function () {
                  var a = Buffer.concat(n);
                  'gzip' === e.headers['content-encoding']
                    ? c.gunzip(a, function (e, n) {
                        e
                          ? o.reject(new r.RuntimeError('Error decompressing response.'))
                          : o.resolve(yr(n, t));
                      })
                    : o.resolve(yr(a, t));
                });
            }
          })
          .on('error', function (e) {
            o.reject(new jt());
          })
          .end();
      })(e, t, a, 0, o, s);
    } else
      s.resolve(
        (function (e, t) {
          t = n.defaultValue(t, '');
          var r = e[1],
            a = !!e[2],
            i = e[3];
          switch (t) {
            case '':
            case 'text':
              return gr(a, i);
            case 'arraybuffer':
              return vr(a, i);
            case 'blob':
              var o = vr(a, i);
              return new Blob([o], { type: r });
            case 'document':
              return new DOMParser().parseFromString(gr(a, i), r);
            case 'json':
              return JSON.parse(gr(a, i));
          }
        })(l, t)
      );
  }),
    (fr._Implementations.loadAndExecuteScript = function (e, t, r) {
      return (function (e) {
        var t = n.when.defer(),
          r = document.createElement('script');
        (r.async = !0), (r.src = e);
        var a = document.getElementsByTagName('head')[0];
        return (
          (r.onload = function () {
            (r.onload = void 0), a.removeChild(r), t.resolve();
          }),
          (r.onerror = function (e) {
            t.reject(e);
          }),
          a.appendChild(r),
          t.promise
        );
      })(e).otherwise(r.reject);
    }),
    (fr._DefaultImplementations = {}),
    (fr._DefaultImplementations.createImage = fr._Implementations.createImage),
    (fr._DefaultImplementations.loadWithXhr = fr._Implementations.loadWithXhr),
    (fr._DefaultImplementations.loadAndExecuteScript = fr._Implementations.loadAndExecuteScript),
    (fr.DEFAULT = Object.freeze(
      new fr({ url: 'undefined' == typeof document ? '' : document.location.href.split('?')[0] })
    )),
    (Cr.NONE = Object.freeze({
      getPromiseToLoad: function () {
        return n.when.resolve();
      },
      compute: function (e, t) {
        return (
          n.defined(t)
            ? ((t.xPoleWander = 0),
              (t.yPoleWander = 0),
              (t.xPoleOffset = 0),
              (t.yPoleOffset = 0),
              (t.ut1MinusUtc = 0))
            : (t = new tt(0, 0, 0, 0, 0)),
          t
        );
      },
    })),
    (Cr.prototype.getPromiseToLoad = function () {
      return n.when(this._downloadPromise);
    }),
    (Cr.prototype.compute = function (e, t) {
      if (n.defined(this._samples)) {
        if ((n.defined(t) || (t = new tt(0, 0, 0, 0, 0)), 0 === this._samples.length))
          return (
            (t.xPoleWander = 0),
            (t.yPoleWander = 0),
            (t.xPoleOffset = 0),
            (t.yPoleOffset = 0),
            (t.ut1MinusUtc = 0),
            t
          );
        var a = this._dates,
          i = this._lastIndex,
          o = 0,
          s = 0;
        if (n.defined(i)) {
          var u = a[i],
            l = a[i + 1],
            c = St.lessThanOrEquals(u, e),
            d = !n.defined(l),
            f = d || St.greaterThanOrEquals(l, e);
          if (c && f)
            return (
              (o = i),
              !d && l.equals(e) && ++o,
              (s = o + 1),
              Er(this, a, this._samples, e, o, s, t),
              t
            );
        }
        var p = et(a, e, St.compare, this._dateColumn);
        return (
          p >= 0
            ? (p < a.length - 1 && a[p + 1].equals(e) && ++p, (o = p), (s = p))
            : (o = (s = ~p) - 1) < 0 && (o = 0),
          (this._lastIndex = o),
          Er(this, a, this._samples, e, o, s, t),
          t
        );
      }
      if (n.defined(this._dataError)) throw new r.RuntimeError(this._dataError);
    }),
    (Ar.fromQuaternion = function (e, t) {
      n.defined(t) || (t = new Ar());
      var r = 2 * (e.w * e.y - e.z * e.x),
        i = 1 - 2 * (e.x * e.x + e.y * e.y),
        o = 2 * (e.w * e.x + e.y * e.z),
        s = 1 - 2 * (e.y * e.y + e.z * e.z),
        u = 2 * (e.w * e.z + e.x * e.y);
      return (
        (t.heading = -Math.atan2(u, s)),
        (t.roll = Math.atan2(o, i)),
        (t.pitch = -a.CesiumMath.asinClamped(r)),
        t
      );
    }),
    (Ar.fromDegrees = function (e, t, r, i) {
      return (
        n.defined(i) || (i = new Ar()),
        (i.heading = e * a.CesiumMath.RADIANS_PER_DEGREE),
        (i.pitch = t * a.CesiumMath.RADIANS_PER_DEGREE),
        (i.roll = r * a.CesiumMath.RADIANS_PER_DEGREE),
        i
      );
    }),
    (Ar.clone = function (e, t) {
      if (n.defined(e))
        return n.defined(t)
          ? ((t.heading = e.heading), (t.pitch = e.pitch), (t.roll = e.roll), t)
          : new Ar(e.heading, e.pitch, e.roll);
    }),
    (Ar.equals = function (e, t) {
      return (
        e === t ||
        (n.defined(e) &&
          n.defined(t) &&
          e.heading === t.heading &&
          e.pitch === t.pitch &&
          e.roll === t.roll)
      );
    }),
    (Ar.equalsEpsilon = function (e, t, r, i) {
      return (
        e === t ||
        (n.defined(e) &&
          n.defined(t) &&
          a.CesiumMath.equalsEpsilon(e.heading, t.heading, r, i) &&
          a.CesiumMath.equalsEpsilon(e.pitch, t.pitch, r, i) &&
          a.CesiumMath.equalsEpsilon(e.roll, t.roll, r, i))
      );
    }),
    (Ar.prototype.clone = function (e) {
      return Ar.clone(this, e);
    }),
    (Ar.prototype.equals = function (e) {
      return Ar.equals(this, e);
    }),
    (Ar.prototype.equalsEpsilon = function (e, t, r) {
      return Ar.equalsEpsilon(this, e, t, r);
    }),
    (Ar.prototype.toString = function () {
      return '(' + this.heading + ', ' + this.pitch + ', ' + this.roll + ')';
    });
  var Or,
    Ir,
    Rr,
    Pr = /((?:.*\/)|^)Cesium\.js(?:\?|\#|$)/;
  function Tr(e) {
    return 'undefined' == typeof document
      ? e
      : (n.defined(Or) || (Or = document.createElement('a')),
        (Or.href = e),
        (Or.href = Or.href),
        Or.href);
  }
  function qr() {
    return (
      n.defined(Ir) ||
        ((e =
          'undefined' != typeof CESIUM_BASE_URL
            ? CESIUM_BASE_URL
            : 'object' == typeof define &&
              n.defined(define.amd) &&
              !define.amd.toUrlUndefined &&
              n.defined(require.toUrl)
            ? Tt('..', Dr('Core/buildModuleUrl.js'))
            : (function () {
                for (
                  var e = document.getElementsByTagName('script'), t = 0, r = e.length;
                  t < r;
                  ++t
                ) {
                  var n = e[t].getAttribute('src'),
                    a = Pr.exec(n);
                  if (null !== a) return a[1];
                }
              })()),
        (Ir = new fr({ url: Tr(e) })).appendForwardSlash()),
      Ir
    );
    var e;
  }
  function zr(e) {
    return Tr(require.toUrl('../' + e));
  }
  function Mr(e) {
    return qr().getDerivedResource({ url: e }).url;
  }
  function Dr(e) {
    return (
      n.defined(Rr) ||
        (Rr =
          'object' == typeof define &&
          n.defined(define.amd) &&
          !define.amd.toUrlUndefined &&
          n.defined(require.toUrl)
            ? zr
            : Mr),
      Rr(e)
    );
  }
  function Ur(e, t, r) {
    (this.x = e), (this.y = t), (this.s = r);
  }
  function kr(e) {
    (e = n.defaultValue(e, n.defaultValue.EMPTY_OBJECT)),
      (this._xysFileUrlTemplate = fr.createIfNeeded(e.xysFileUrlTemplate)),
      (this._interpolationOrder = n.defaultValue(e.interpolationOrder, 9)),
      (this._sampleZeroJulianEphemerisDate = n.defaultValue(
        e.sampleZeroJulianEphemerisDate,
        2442396.5
      )),
      (this._sampleZeroDateTT = new St(this._sampleZeroJulianEphemerisDate, 0, ot.TAI)),
      (this._stepSizeDays = n.defaultValue(e.stepSizeDays, 1)),
      (this._samplesPerXysFile = n.defaultValue(e.samplesPerXysFile, 1e3)),
      (this._totalSamples = n.defaultValue(e.totalSamples, 27426)),
      (this._samples = new Array(3 * this._totalSamples)),
      (this._chunkDownloadsInProgress = []);
    for (
      var t = this._interpolationOrder,
        r = (this._denominators = new Array(t + 1)),
        a = (this._xTable = new Array(t + 1)),
        i = Math.pow(this._stepSizeDays, t),
        o = 0;
      o <= t;
      ++o
    ) {
      (r[o] = i), (a[o] = o * this._stepSizeDays);
      for (var s = 0; s <= t; ++s) s !== o && (r[o] *= o - s);
      r[o] = 1 / r[o];
    }
    (this._work = new Array(t + 1)), (this._coef = new Array(t + 1));
  }
  (Dr._cesiumScriptRegex = Pr),
    (Dr._buildModuleUrlFromBaseUrl = Mr),
    (Dr._clearBaseResource = function () {
      Ir = void 0;
    }),
    (Dr.setBaseUrl = function (e) {
      Ir = fr.DEFAULT.getDerivedResource({ url: e });
    }),
    (Dr.getCesiumBaseUrl = qr);
  var Fr = new St(0, 0, ot.TAI);
  function Nr(e, t, r) {
    var n = Fr;
    return (n.dayNumber = t), (n.secondsOfDay = r), St.daysDifference(n, e._sampleZeroDateTT);
  }
  function jr(e, t) {
    if (e._chunkDownloadsInProgress[t]) return e._chunkDownloadsInProgress[t];
    var r,
      a = n.when.defer();
    e._chunkDownloadsInProgress[t] = a;
    var i = e._xysFileUrlTemplate;
    return (
      (r = n.defined(i)
        ? i.getDerivedResource({ templateValues: { 0: t } })
        : new fr({ url: Dr('Assets/IAU2006_XYS/IAU2006_XYS_' + t + '.json') })),
      n.when(r.fetchJson(), function (r) {
        e._chunkDownloadsInProgress[t] = !1;
        for (
          var n = e._samples, i = r.samples, o = t * e._samplesPerXysFile * 3, s = 0, u = i.length;
          s < u;
          ++s
        )
          n[o + s] = i[s];
        a.resolve();
      }),
      a.promise
    );
  }
  (kr.prototype.preload = function (e, t, r, a) {
    var i = Nr(this, e, t),
      o = Nr(this, r, a),
      s = (i / this._stepSizeDays - this._interpolationOrder / 2) | 0;
    s < 0 && (s = 0);
    var u =
      (o / this._stepSizeDays - this._interpolationOrder / 2) | (0 + this._interpolationOrder);
    u >= this._totalSamples && (u = this._totalSamples - 1);
    for (
      var l = (s / this._samplesPerXysFile) | 0,
        c = (u / this._samplesPerXysFile) | 0,
        d = [],
        f = l;
      f <= c;
      ++f
    )
      d.push(jr(this, f));
    return n.when.all(d);
  }),
    (kr.prototype.computeXysRadians = function (e, t, r) {
      var a = Nr(this, e, t);
      if (!(a < 0)) {
        var i = (a / this._stepSizeDays) | 0;
        if (!(i >= this._totalSamples)) {
          var o = this._interpolationOrder,
            s = i - ((o / 2) | 0);
          s < 0 && (s = 0);
          var u = s + o;
          u >= this._totalSamples && (s = (u = this._totalSamples - 1) - o) < 0 && (s = 0);
          var l = !1,
            c = this._samples;
          if (
            (n.defined(c[3 * s]) || (jr(this, (s / this._samplesPerXysFile) | 0), (l = !0)),
            n.defined(c[3 * u]) || (jr(this, (u / this._samplesPerXysFile) | 0), (l = !0)),
            !l)
          ) {
            n.defined(r) ? ((r.x = 0), (r.y = 0), (r.s = 0)) : (r = new Ur(0, 0, 0));
            var d,
              f,
              p = a - s * this._stepSizeDays,
              h = this._work,
              m = this._denominators,
              g = this._coef,
              v = this._xTable;
            for (d = 0; d <= o; ++d) h[d] = p - v[d];
            for (d = 0; d <= o; ++d) {
              for (g[d] = 1, f = 0; f <= o; ++f) f !== d && (g[d] *= h[f]);
              g[d] *= m[d];
              var y = 3 * (s + d);
              (r.x += g[d] * c[y++]), (r.y += g[d] * c[y++]), (r.s += g[d] * c[y]);
            }
            return r;
          }
        }
      }
    });
  var Br = {},
    Vr = {
      up: { south: 'east', north: 'west', west: 'south', east: 'north' },
      down: { south: 'west', north: 'east', west: 'north', east: 'south' },
      south: { up: 'west', down: 'east', west: 'down', east: 'up' },
      north: { up: 'east', down: 'west', west: 'up', east: 'down' },
      west: { up: 'north', down: 'south', north: 'down', south: 'up' },
      east: { up: 'south', down: 'north', north: 'up', south: 'down' },
    },
    Lr = {
      north: [-1, 0, 0],
      east: [0, 1, 0],
      up: [0, 0, 1],
      south: [1, 0, 0],
      west: [0, -1, 0],
      down: [0, 0, -1],
    },
    Qr = {},
    Wr = {
      east: new t.Cartesian3(),
      north: new t.Cartesian3(),
      up: new t.Cartesian3(),
      west: new t.Cartesian3(),
      south: new t.Cartesian3(),
      down: new t.Cartesian3(),
    },
    Hr = new t.Cartesian3(),
    Yr = new t.Cartesian3(),
    Zr = new t.Cartesian3();
  (Br.localFrameToFixedFrameGenerator = function (e, i) {
    if (!Vr.hasOwnProperty(e) || !Vr[e].hasOwnProperty(i))
      throw new r.DeveloperError(
        'firstAxis and secondAxis must be east, north, up, west, south or down.'
      );
    var o,
      s = Vr[e][i],
      u = e + i;
    return (
      n.defined(Qr[u])
        ? (o = Qr[u])
        : ((o = function (r, o, u) {
            if (
              (n.defined(u) || (u = new t.Matrix4()),
              t.Cartesian3.equalsEpsilon(r, t.Cartesian3.ZERO, a.CesiumMath.EPSILON14))
            )
              t.Cartesian3.unpack(Lr[e], 0, Hr),
                t.Cartesian3.unpack(Lr[i], 0, Yr),
                t.Cartesian3.unpack(Lr[s], 0, Zr);
            else if (
              a.CesiumMath.equalsEpsilon(r.x, 0, a.CesiumMath.EPSILON14) &&
              a.CesiumMath.equalsEpsilon(r.y, 0, a.CesiumMath.EPSILON14)
            ) {
              var l = a.CesiumMath.sign(r.z);
              t.Cartesian3.unpack(Lr[e], 0, Hr),
                'east' !== e && 'west' !== e && t.Cartesian3.multiplyByScalar(Hr, l, Hr),
                t.Cartesian3.unpack(Lr[i], 0, Yr),
                'east' !== i && 'west' !== i && t.Cartesian3.multiplyByScalar(Yr, l, Yr),
                t.Cartesian3.unpack(Lr[s], 0, Zr),
                'east' !== s && 'west' !== s && t.Cartesian3.multiplyByScalar(Zr, l, Zr);
            } else {
              (o = n.defaultValue(o, t.Ellipsoid.WGS84)).geodeticSurfaceNormal(r, Wr.up);
              var c = Wr.up,
                d = Wr.east;
              (d.x = -r.y),
                (d.y = r.x),
                (d.z = 0),
                t.Cartesian3.normalize(d, Wr.east),
                t.Cartesian3.cross(c, d, Wr.north),
                t.Cartesian3.multiplyByScalar(Wr.up, -1, Wr.down),
                t.Cartesian3.multiplyByScalar(Wr.east, -1, Wr.west),
                t.Cartesian3.multiplyByScalar(Wr.north, -1, Wr.south),
                (Hr = Wr[e]),
                (Yr = Wr[i]),
                (Zr = Wr[s]);
            }
            return (
              (u[0] = Hr.x),
              (u[1] = Hr.y),
              (u[2] = Hr.z),
              (u[3] = 0),
              (u[4] = Yr.x),
              (u[5] = Yr.y),
              (u[6] = Yr.z),
              (u[7] = 0),
              (u[8] = Zr.x),
              (u[9] = Zr.y),
              (u[10] = Zr.z),
              (u[11] = 0),
              (u[12] = r.x),
              (u[13] = r.y),
              (u[14] = r.z),
              (u[15] = 1),
              u
            );
          }),
          (Qr[u] = o)),
      o
    );
  }),
    (Br.eastNorthUpToFixedFrame = Br.localFrameToFixedFrameGenerator('east', 'north')),
    (Br.northEastDownToFixedFrame = Br.localFrameToFixedFrameGenerator('north', 'east')),
    (Br.northUpEastToFixedFrame = Br.localFrameToFixedFrameGenerator('north', 'up')),
    (Br.northWestUpToFixedFrame = Br.localFrameToFixedFrameGenerator('north', 'west'));
  var Gr = new Se(),
    Jr = new t.Cartesian3(1, 1, 1),
    $r = new t.Matrix4();
  Br.headingPitchRollToFixedFrame = function (e, r, a, i, o) {
    i = n.defaultValue(i, Br.eastNorthUpToFixedFrame);
    var s = Se.fromHeadingPitchRoll(r, Gr),
      u = t.Matrix4.fromTranslationQuaternionRotationScale(t.Cartesian3.ZERO, s, Jr, $r);
    return (o = i(e, a, o)), t.Matrix4.multiply(o, u, o);
  };
  var Xr = new t.Matrix4(),
    Kr = new t.Matrix3();
  Br.headingPitchRollQuaternion = function (e, r, n, a, i) {
    var o = Br.headingPitchRollToFixedFrame(e, r, n, a, Xr),
      s = t.Matrix4.getMatrix3(o, Kr);
    return Se.fromRotationMatrix(s, i);
  };
  var en = new t.Cartesian3(1, 1, 1),
    tn = new t.Cartesian3(),
    rn = new t.Matrix4(),
    nn = new t.Matrix4(),
    an = new t.Matrix3(),
    on = new Se();
  Br.fixedFrameToHeadingPitchRoll = function (e, r, a, i) {
    (r = n.defaultValue(r, t.Ellipsoid.WGS84)),
      (a = n.defaultValue(a, Br.eastNorthUpToFixedFrame)),
      n.defined(i) || (i = new Ar());
    var o = t.Matrix4.getTranslation(e, tn);
    if (t.Cartesian3.equals(o, t.Cartesian3.ZERO))
      return (i.heading = 0), (i.pitch = 0), (i.roll = 0), i;
    var s = t.Matrix4.inverseTransformation(a(o, r, rn), rn),
      u = t.Matrix4.setScale(e, en, nn);
    (u = t.Matrix4.setTranslation(u, t.Cartesian3.ZERO, u)), (s = t.Matrix4.multiply(s, u, s));
    var l = Se.fromRotationMatrix(t.Matrix4.getMatrix3(s, an), on);
    return (l = Se.normalize(l, l)), Ar.fromQuaternion(l, i);
  };
  var sn = a.CesiumMath.TWO_PI / 86400,
    un = new St();
  (Br.computeTemeToPseudoFixedMatrix = function (e, r) {
    var i,
      o = (un = St.addSeconds(e, -St.computeTaiMinusUtc(e), un)).dayNumber,
      s = un.secondsOfDay,
      u = o - 2451545,
      l =
        (((24110.54841 +
          (i =
            s >= 43200
              ? (u + 0.5) / it.DAYS_PER_JULIAN_CENTURY
              : (u - 0.5) / it.DAYS_PER_JULIAN_CENTURY) *
            (8640184.812866 + i * (0.093104 + -62e-7 * i))) *
          sn) %
          a.CesiumMath.TWO_PI) +
        (72921158553e-15 + 11772758384668e-32 * (o - 2451545.5)) *
          ((s + 0.5 * it.SECONDS_PER_DAY) % it.SECONDS_PER_DAY),
      c = Math.cos(l),
      d = Math.sin(l);
    return n.defined(r)
      ? ((r[0] = c),
        (r[1] = -d),
        (r[2] = 0),
        (r[3] = d),
        (r[4] = c),
        (r[5] = 0),
        (r[6] = 0),
        (r[7] = 0),
        (r[8] = 1),
        r)
      : new t.Matrix3(c, d, 0, -d, c, 0, 0, 0, 1);
  }),
    (Br.iau2006XysData = new kr()),
    (Br.earthOrientationParameters = Cr.NONE);
  var ln = 32.184;
  (Br.preloadIcrfFixed = function (e) {
    var t = e.start.dayNumber,
      r = e.start.secondsOfDay + ln,
      a = e.stop.dayNumber,
      i = e.stop.secondsOfDay + ln,
      o = Br.iau2006XysData.preload(t, r, a, i),
      s = Br.earthOrientationParameters.getPromiseToLoad();
    return n.when.all([o, s]);
  }),
    (Br.computeIcrfToFixedMatrix = function (e, r) {
      n.defined(r) || (r = new t.Matrix3());
      var a = Br.computeFixedToIcrfMatrix(e, r);
      if (n.defined(a)) return t.Matrix3.transpose(a, r);
    });
  var cn = new Ur(0, 0, 0),
    dn = new tt(0, 0, 0, 0, 0, 0),
    fn = new t.Matrix3(),
    pn = new t.Matrix3();
  Br.computeFixedToIcrfMatrix = function (e, r) {
    n.defined(r) || (r = new t.Matrix3());
    var i = Br.earthOrientationParameters.compute(e, dn);
    if (n.defined(i)) {
      var o = e.dayNumber,
        s = e.secondsOfDay + ln,
        u = Br.iau2006XysData.computeXysRadians(o, s, cn);
      if (n.defined(u)) {
        var l = u.x + i.xPoleOffset,
          c = u.y + i.yPoleOffset,
          d = 1 / (1 + Math.sqrt(1 - l * l - c * c)),
          f = fn;
        (f[0] = 1 - d * l * l),
          (f[3] = -d * l * c),
          (f[6] = l),
          (f[1] = -d * l * c),
          (f[4] = 1 - d * c * c),
          (f[7] = c),
          (f[2] = -l),
          (f[5] = -c),
          (f[8] = 1 - d * (l * l + c * c));
        var p = t.Matrix3.fromRotationZ(-u.s, pn),
          h = t.Matrix3.multiply(f, p, fn),
          m = e.dayNumber - 2451545,
          g = (e.secondsOfDay - St.computeTaiMinusUtc(e) + i.ut1MinusUtc) / it.SECONDS_PER_DAY,
          v = 0.779057273264 + g + 0.00273781191135448 * (m + g);
        v = (v % 1) * a.CesiumMath.TWO_PI;
        var y = t.Matrix3.fromRotationZ(v, pn),
          w = t.Matrix3.multiply(h, y, fn),
          C = Math.cos(i.xPoleWander),
          _ = Math.cos(i.yPoleWander),
          b = Math.sin(i.xPoleWander),
          x = Math.sin(i.yPoleWander),
          S = o - 2451545 + s / it.SECONDS_PER_DAY,
          E = (-47e-6 * (S /= 36525) * a.CesiumMath.RADIANS_PER_DEGREE) / 3600,
          A = Math.cos(E),
          O = Math.sin(E),
          I = pn;
        return (
          (I[0] = C * A),
          (I[1] = C * O),
          (I[2] = b),
          (I[3] = -_ * O + x * b * A),
          (I[4] = _ * A + x * b * O),
          (I[5] = -x * C),
          (I[6] = -x * O - _ * b * A),
          (I[7] = x * A - _ * b * O),
          (I[8] = _ * C),
          t.Matrix3.multiply(w, I, r)
        );
      }
    }
  };
  var hn = new t.Cartesian4();
  (Br.pointToWindowCoordinates = function (e, t, r, n) {
    return ((n = Br.pointToGLWindowCoordinates(e, t, r, n)).y = 2 * t[5] - n.y), n;
  }),
    (Br.pointToGLWindowCoordinates = function (e, r, a, i) {
      n.defined(i) || (i = new t.Cartesian2());
      var o = hn;
      return (
        t.Matrix4.multiplyByVector(e, t.Cartesian4.fromElements(a.x, a.y, a.z, 1, o), o),
        t.Cartesian4.multiplyByScalar(o, 1 / o.w, o),
        t.Matrix4.multiplyByVector(r, o, o),
        t.Cartesian2.fromCartesian4(o, i)
      );
    });
  var mn = new t.Cartesian3(),
    gn = new t.Cartesian3(),
    vn = new t.Cartesian3();
  Br.rotationMatrixFromPositionVelocity = function (e, r, i, o) {
    var s = n.defaultValue(i, t.Ellipsoid.WGS84).geodeticSurfaceNormal(e, mn),
      u = t.Cartesian3.cross(r, s, gn);
    t.Cartesian3.equalsEpsilon(u, t.Cartesian3.ZERO, a.CesiumMath.EPSILON6) &&
      (u = t.Cartesian3.clone(t.Cartesian3.UNIT_X, u));
    var l = t.Cartesian3.cross(u, r, vn);
    return (
      t.Cartesian3.normalize(l, l),
      t.Cartesian3.cross(r, l, u),
      t.Cartesian3.negate(u, u),
      t.Cartesian3.normalize(u, u),
      n.defined(o) || (o = new t.Matrix3()),
      (o[0] = r.x),
      (o[1] = r.y),
      (o[2] = r.z),
      (o[3] = u.x),
      (o[4] = u.y),
      (o[5] = u.z),
      (o[6] = l.x),
      (o[7] = l.y),
      (o[8] = l.z),
      o
    );
  };
  var yn = new t.Matrix4(0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1),
    wn = new t.Cartographic(),
    Cn = new t.Cartesian3(),
    _n = new t.Cartesian3(),
    bn = new t.Matrix3(),
    xn = new t.Matrix4(),
    Sn = new t.Matrix4();
  (Br.basisTo2D = function (e, r, n) {
    var a = t.Matrix4.getTranslation(r, _n),
      i = e.ellipsoid,
      o = i.cartesianToCartographic(a, wn),
      s = e.project(o, Cn);
    t.Cartesian3.fromElements(s.z, s.x, s.y, s);
    var u = Br.eastNorthUpToFixedFrame(a, i, xn),
      l = t.Matrix4.inverseTransformation(u, Sn),
      c = t.Matrix4.getMatrix3(r, bn),
      d = t.Matrix4.multiplyByMatrix3(l, c, n);
    return t.Matrix4.multiply(yn, d, n), t.Matrix4.setTranslation(n, s, n), n;
  }),
    (Br.wgs84To2DModelMatrix = function (e, r, n) {
      var a = e.ellipsoid,
        i = Br.eastNorthUpToFixedFrame(r, a, xn),
        o = t.Matrix4.inverseTransformation(i, Sn),
        s = a.cartesianToCartographic(r, wn),
        u = e.project(s, Cn);
      t.Cartesian3.fromElements(u.z, u.x, u.y, u);
      var l = t.Matrix4.fromTranslation(u, xn);
      return t.Matrix4.multiply(yn, o, n), t.Matrix4.multiply(l, n, n), n;
    }),
    (e.BoundingSphere = l),
    (e.FeatureDetection = xe),
    (e.GeographicProjection = o),
    (e.Intersect = s),
    (e.Interval = u),
    (e.Quaternion = Se),
    (e.Resource = fr),
    (e.Transforms = Br),
    (e.buildModuleUrl = Dr);
});
