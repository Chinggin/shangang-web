define([
  './AttributeCompression-0af3c035',
  './Transforms-7cd3197b',
  './Matrix2-f2da41d4',
  './when-229515d6',
  './TerrainEncoding-6355a4fe',
  './IndexDatatype-b10faa0b',
  './RuntimeError-ffe03243',
  './ComponentDatatype-17b06483',
  './OrientedBoundingBox-86debc5a',
  './createTaskProcessorWorker',
  './combine-8ce3f24b',
  './WebGLConstants-4e26b85a',
  './EllipsoidTangentPlane-b27cd2f7',
  './AxisAlignedBoundingBox-1feb0c48',
  './IntersectionTests-1b8a3cb9',
  './Plane-0421a8be',
], function (e, i, t, n, s, r, h, u, o, a, p, d, f, l, c, g) {
  'use strict';
  var m = {
      clipTriangleAtAxisAlignedThreshold: function (e, i, t, s, r, h) {
        var u, o, a;
        n.defined(h) ? (h.length = 0) : (h = []),
          i ? ((u = t < e), (o = s < e), (a = r < e)) : ((u = t > e), (o = s > e), (a = r > e));
        var p,
          d,
          f,
          l,
          c,
          g,
          m = u + o + a;
        return (
          1 === m
            ? u
              ? ((p = (e - t) / (s - t)),
                (d = (e - t) / (r - t)),
                h.push(1),
                h.push(2),
                1 !== d && (h.push(-1), h.push(0), h.push(2), h.push(d)),
                1 !== p && (h.push(-1), h.push(0), h.push(1), h.push(p)))
              : o
              ? ((f = (e - s) / (r - s)),
                (l = (e - s) / (t - s)),
                h.push(2),
                h.push(0),
                1 !== l && (h.push(-1), h.push(1), h.push(0), h.push(l)),
                1 !== f && (h.push(-1), h.push(1), h.push(2), h.push(f)))
              : a &&
                ((c = (e - r) / (t - r)),
                (g = (e - r) / (s - r)),
                h.push(0),
                h.push(1),
                1 !== g && (h.push(-1), h.push(2), h.push(1), h.push(g)),
                1 !== c && (h.push(-1), h.push(2), h.push(0), h.push(c)))
            : 2 === m
            ? u || t === e
              ? o || s === e
                ? a ||
                  r === e ||
                  ((d = (e - t) / (r - t)),
                  (f = (e - s) / (r - s)),
                  h.push(2),
                  h.push(-1),
                  h.push(0),
                  h.push(2),
                  h.push(d),
                  h.push(-1),
                  h.push(1),
                  h.push(2),
                  h.push(f))
                : ((g = (e - r) / (s - r)),
                  (p = (e - t) / (s - t)),
                  h.push(1),
                  h.push(-1),
                  h.push(2),
                  h.push(1),
                  h.push(g),
                  h.push(-1),
                  h.push(0),
                  h.push(1),
                  h.push(p))
              : ((l = (e - s) / (t - s)),
                (c = (e - r) / (t - r)),
                h.push(0),
                h.push(-1),
                h.push(1),
                h.push(0),
                h.push(l),
                h.push(-1),
                h.push(2),
                h.push(0),
                h.push(c))
            : 3 !== m && (h.push(0), h.push(1), h.push(2)),
          h
        );
      },
      computeBarycentricCoordinates: function (e, i, s, r, h, u, o, a, p) {
        var d = s - o,
          f = o - h,
          l = u - a,
          c = r - a,
          g = 1 / (l * d + f * c),
          m = i - a,
          x = e - o,
          v = (l * x + f * m) * g,
          w = (-c * x + d * m) * g,
          C = 1 - v - w;
        return n.defined(p) ? ((p.x = v), (p.y = w), (p.z = C), p) : new t.Cartesian3(v, w, C);
      },
      computeLineSegmentLineSegmentIntersection: function (e, i, s, r, h, u, o, a, p) {
        var d = (a - u) * (s - e) - (o - h) * (r - i);
        if (0 !== d) {
          var f = ((o - h) * (i - u) - (a - u) * (e - h)) / d,
            l = ((s - e) * (i - u) - (r - i) * (e - h)) / d;
          return f >= 0 && f <= 1 && l >= 0 && l <= 1
            ? (n.defined(p) || (p = new t.Cartesian2()),
              (p.x = e + f * (s - e)),
              (p.y = i + f * (r - i)),
              p)
            : void 0;
        }
      },
    },
    x = 32767,
    v = 16383,
    w = [],
    C = [],
    B = [],
    y = new t.Cartographic(),
    b = new t.Cartesian3(),
    I = [],
    A = [],
    T = [],
    z = [],
    M = [],
    N = new t.Cartesian3(),
    V = new i.BoundingSphere(),
    E = new o.OrientedBoundingBox(),
    R = new t.Cartesian2(),
    H = new t.Cartesian3();
  function O() {
    (this.vertexBuffer = void 0),
      (this.index = void 0),
      (this.first = void 0),
      (this.second = void 0),
      (this.ratio = void 0);
  }
  (O.prototype.clone = function (e) {
    return (
      n.defined(e) || (e = new O()),
      (e.uBuffer = this.uBuffer),
      (e.vBuffer = this.vBuffer),
      (e.heightBuffer = this.heightBuffer),
      (e.normalBuffer = this.normalBuffer),
      (e.index = this.index),
      (e.first = this.first),
      (e.second = this.second),
      (e.ratio = this.ratio),
      e
    );
  }),
    (O.prototype.initializeIndexed = function (e, i, t, n, s) {
      (this.uBuffer = e),
        (this.vBuffer = i),
        (this.heightBuffer = t),
        (this.normalBuffer = n),
        (this.index = s),
        (this.first = void 0),
        (this.second = void 0),
        (this.ratio = void 0);
    }),
    (O.prototype.initializeFromClipResult = function (e, i, t) {
      var n = i + 1;
      return (
        -1 !== e[i]
          ? t[e[i]].clone(this)
          : ((this.vertexBuffer = void 0),
            (this.index = void 0),
            (this.first = t[e[n]]),
            ++n,
            (this.second = t[e[n]]),
            ++n,
            (this.ratio = e[n]),
            ++n),
        n
      );
    }),
    (O.prototype.getKey = function () {
      return this.isIndexed()
        ? this.index
        : JSON.stringify({
            first: this.first.getKey(),
            second: this.second.getKey(),
            ratio: this.ratio,
          });
    }),
    (O.prototype.isIndexed = function () {
      return n.defined(this.index);
    }),
    (O.prototype.getH = function () {
      return n.defined(this.index)
        ? this.heightBuffer[this.index]
        : u.CesiumMath.lerp(this.first.getH(), this.second.getH(), this.ratio);
    }),
    (O.prototype.getU = function () {
      return n.defined(this.index)
        ? this.uBuffer[this.index]
        : u.CesiumMath.lerp(this.first.getU(), this.second.getU(), this.ratio);
    }),
    (O.prototype.getV = function () {
      return n.defined(this.index)
        ? this.vBuffer[this.index]
        : u.CesiumMath.lerp(this.first.getV(), this.second.getV(), this.ratio);
    });
  var S = new t.Cartesian2(),
    U = -1,
    F = [new t.Cartesian3(), new t.Cartesian3()],
    P = [new t.Cartesian3(), new t.Cartesian3()];
  function D(i, n) {
    ++U;
    var s = F[U],
      r = P[U];
    return (
      (s = e.AttributeCompression.octDecode(i.first.getNormalX(), i.first.getNormalY(), s)),
      (r = e.AttributeCompression.octDecode(i.second.getNormalX(), i.second.getNormalY(), r)),
      (b = t.Cartesian3.lerp(s, r, i.ratio, b)),
      t.Cartesian3.normalize(b, b),
      e.AttributeCompression.octEncode(b, n),
      --U,
      n
    );
  }
  (O.prototype.getNormalX = function () {
    return n.defined(this.index) ? this.normalBuffer[2 * this.index] : (S = D(this, S)).x;
  }),
    (O.prototype.getNormalY = function () {
      return n.defined(this.index) ? this.normalBuffer[2 * this.index + 1] : (S = D(this, S)).y;
    });
  var W = [];
  function X(e, i, t, s, r, h, u, o, a) {
    if (0 !== u.length) {
      for (var p = 0, d = 0; d < u.length; ) d = W[p++].initializeFromClipResult(u, d, o);
      for (var f = 0; f < p; ++f) {
        var l = W[f];
        if (l.isIndexed())
          (l.newIndex = h[l.index]),
            (l.uBuffer = e),
            (l.vBuffer = i),
            (l.heightBuffer = t),
            a && (l.normalBuffer = s);
        else {
          var c = l.getKey();
          if (n.defined(h[c])) l.newIndex = h[c];
          else {
            var g = e.length;
            e.push(l.getU()),
              i.push(l.getV()),
              t.push(l.getH()),
              a && (s.push(l.getNormalX()), s.push(l.getNormalY())),
              (l.newIndex = g),
              (h[c] = g);
          }
        }
      }
      3 === p
        ? (r.push(W[0].newIndex), r.push(W[1].newIndex), r.push(W[2].newIndex))
        : 4 === p &&
          (r.push(W[0].newIndex),
          r.push(W[1].newIndex),
          r.push(W[2].newIndex),
          r.push(W[0].newIndex),
          r.push(W[2].newIndex),
          r.push(W[3].newIndex));
    }
  }
  return (
    W.push(new O()),
    W.push(new O()),
    W.push(new O()),
    W.push(new O()),
    a(function (e, n) {
      var h = e.isEastChild,
        a = e.isNorthChild,
        p = h ? v : 0,
        d = h ? x : v,
        f = a ? v : 0,
        l = a ? x : v,
        c = I,
        g = A,
        S = T,
        U = M;
      (c.length = 0), (g.length = 0), (S.length = 0), (U.length = 0);
      var F = z;
      F.length = 0;
      var P = {},
        D = e.vertices,
        W = e.indices;
      W = W.subarray(0, e.indexCountWithoutSkirts);
      var k,
        K,
        L,
        Y,
        _,
        G = s.TerrainEncoding.clone(e.encoding),
        J = G.hasVertexNormals,
        Z = 0,
        j = e.vertexCountWithoutSkirts,
        q = e.minimumHeight,
        Q = e.maximumHeight,
        $ = new Array(j),
        ee = new Array(j),
        ie = new Array(j),
        te = J ? new Array(2 * j) : void 0;
      for (K = 0, L = 0; K < j; ++K, L += 2) {
        var ne = G.decodeTextureCoordinates(D, K, R);
        if (
          ((k = G.decodeHeight(D, K)),
          (Y = u.CesiumMath.clamp((ne.x * x) | 0, 0, x)),
          (_ = u.CesiumMath.clamp((ne.y * x) | 0, 0, x)),
          (ie[K] = u.CesiumMath.clamp((((k - q) / (Q - q)) * x) | 0, 0, x)),
          Y < 20 && (Y = 0),
          _ < 20 && (_ = 0),
          x - Y < 20 && (Y = x),
          x - _ < 20 && (_ = x),
          ($[K] = Y),
          (ee[K] = _),
          J)
        ) {
          var se = G.getOctEncodedNormal(D, K, H);
          (te[L] = se.x), (te[L + 1] = se.y);
        }
        ((h && Y >= v) || (!h && Y <= v)) &&
          ((a && _ >= v) || (!a && _ <= v)) &&
          ((P[K] = Z),
          c.push(Y),
          g.push(_),
          S.push(ie[K]),
          J && (U.push(te[L]), U.push(te[L + 1])),
          ++Z);
      }
      var re = [];
      re.push(new O()), re.push(new O()), re.push(new O());
      var he,
        ue = [];
      for (ue.push(new O()), ue.push(new O()), ue.push(new O()), K = 0; K < W.length; K += 3) {
        var oe = W[K],
          ae = W[K + 1],
          pe = W[K + 2],
          de = $[oe],
          fe = $[ae],
          le = $[pe];
        re[0].initializeIndexed($, ee, ie, te, oe),
          re[1].initializeIndexed($, ee, ie, te, ae),
          re[2].initializeIndexed($, ee, ie, te, pe);
        var ce = m.clipTriangleAtAxisAlignedThreshold(v, h, de, fe, le, w);
        (he = 0) >= ce.length ||
          (he = ue[0].initializeFromClipResult(ce, he, re)) >= ce.length ||
          (he = ue[1].initializeFromClipResult(ce, he, re)) >= ce.length ||
          ((he = ue[2].initializeFromClipResult(ce, he, re)),
          X(
            c,
            g,
            S,
            U,
            F,
            P,
            m.clipTriangleAtAxisAlignedThreshold(v, a, ue[0].getV(), ue[1].getV(), ue[2].getV(), C),
            ue,
            J
          ),
          he < ce.length &&
            (ue[2].clone(ue[1]),
            ue[2].initializeFromClipResult(ce, he, re),
            X(
              c,
              g,
              S,
              U,
              F,
              P,
              m.clipTriangleAtAxisAlignedThreshold(
                v,
                a,
                ue[0].getV(),
                ue[1].getV(),
                ue[2].getV(),
                C
              ),
              ue,
              J
            )));
      }
      var ge = h ? -32767 : 0,
        me = a ? -32767 : 0,
        xe = [],
        ve = [],
        we = [],
        Ce = [],
        Be = Number.MAX_VALUE,
        ye = -Be,
        be = B;
      be.length = 0;
      var Ie = t.Ellipsoid.clone(e.ellipsoid),
        Ae = t.Rectangle.clone(e.childRectangle),
        Te = Ae.north,
        ze = Ae.south,
        Me = Ae.east,
        Ne = Ae.west;
      for (Me < Ne && (Me += u.CesiumMath.TWO_PI), K = 0; K < c.length; ++K)
        (Y = Math.round(c[K])) <= p
          ? (xe.push(K), (Y = 0))
          : Y >= d
          ? (we.push(K), (Y = x))
          : (Y = 2 * Y + ge),
          (c[K] = Y),
          (_ = Math.round(g[K])) <= f
            ? (ve.push(K), (_ = 0))
            : _ >= l
            ? (Ce.push(K), (_ = x))
            : (_ = 2 * _ + me),
          (g[K] = _),
          (k = u.CesiumMath.lerp(q, Q, S[K] / x)) < Be && (Be = k),
          k > ye && (ye = k),
          (S[K] = k),
          (y.longitude = u.CesiumMath.lerp(Ne, Me, Y / x)),
          (y.latitude = u.CesiumMath.lerp(ze, Te, _ / x)),
          (y.height = k),
          Ie.cartographicToCartesian(y, b),
          be.push(b.x),
          be.push(b.y),
          be.push(b.z);
      var Ve = i.BoundingSphere.fromVertices(be, t.Cartesian3.ZERO, 3, V),
        Ee = o.OrientedBoundingBox.fromRectangle(Ae, Be, ye, Ie, E),
        Re = new s.EllipsoidalOccluder(
          Ie
        ).computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid(
          Ve.center,
          be,
          3,
          Ve.center,
          Be,
          N
        ),
        He = ye - Be,
        Oe = new Uint16Array(c.length + g.length + S.length);
      for (K = 0; K < c.length; ++K) Oe[K] = c[K];
      var Se = c.length;
      for (K = 0; K < g.length; ++K) Oe[Se + K] = g[K];
      for (Se += g.length, K = 0; K < S.length; ++K) Oe[Se + K] = (x * (S[K] - Be)) / He;
      var Ue,
        Fe = r.IndexDatatype.createTypedArray(c.length, F);
      if (J) {
        var Pe = new Uint8Array(U);
        n.push(Oe.buffer, Fe.buffer, Pe.buffer), (Ue = Pe.buffer);
      } else n.push(Oe.buffer, Fe.buffer);
      return {
        vertices: Oe.buffer,
        encodedNormals: Ue,
        indices: Fe.buffer,
        minimumHeight: Be,
        maximumHeight: ye,
        westIndices: xe,
        southIndices: ve,
        eastIndices: we,
        northIndices: Ce,
        boundingSphere: Ve,
        orientedBoundingBox: Ee,
        horizonOcclusionPoint: Re,
      };
    })
  );
});
