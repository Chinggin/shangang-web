define([
  './when-229515d6',
  './Matrix2-f2da41d4',
  './arrayRemoveDuplicates-bb548aa3',
  './BoundingRectangle-18e42324',
  './Transforms-7cd3197b',
  './ComponentDatatype-17b06483',
  './PolylineVolumeGeometryLibrary-4af6d4dc',
  './RuntimeError-ffe03243',
  './GeometryAttribute-80036e07',
  './GeometryAttributes-b253752a',
  './GeometryPipeline-5b3fba53',
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
  './AttributeCompression-0af3c035',
  './EncodedCartesian3-d4f305ce',
], function (e, t, n, a, i, r, o, l, s, p, d, c, u, m, y, g, f, h, b, v, P, E, _, k, L) {
  'use strict';
  function V(n) {
    var a = (n = e.defaultValue(n, e.defaultValue.EMPTY_OBJECT)).polylinePositions,
      i = n.shapePositions;
    (this._positions = a),
      (this._shape = i),
      (this._ellipsoid = t.Ellipsoid.clone(e.defaultValue(n.ellipsoid, t.Ellipsoid.WGS84))),
      (this._cornerType = e.defaultValue(n.cornerType, o.CornerType.ROUNDED)),
      (this._vertexFormat = m.VertexFormat.clone(
        e.defaultValue(n.vertexFormat, m.VertexFormat.DEFAULT)
      )),
      (this._granularity = e.defaultValue(n.granularity, r.CesiumMath.RADIANS_PER_DEGREE)),
      (this._workerName = 'createPolylineVolumeGeometry');
    var l = 1 + a.length * t.Cartesian3.packedLength;
    (l += 1 + i.length * t.Cartesian2.packedLength),
      (this.packedLength = l + t.Ellipsoid.packedLength + m.VertexFormat.packedLength + 2);
  }
  V.pack = function (n, a, i) {
    var r;
    i = e.defaultValue(i, 0);
    var o = n._positions,
      l = o.length;
    for (a[i++] = l, r = 0; r < l; ++r, i += t.Cartesian3.packedLength)
      t.Cartesian3.pack(o[r], a, i);
    var s = n._shape;
    for (l = s.length, a[i++] = l, r = 0; r < l; ++r, i += t.Cartesian2.packedLength)
      t.Cartesian2.pack(s[r], a, i);
    return (
      t.Ellipsoid.pack(n._ellipsoid, a, i),
      (i += t.Ellipsoid.packedLength),
      m.VertexFormat.pack(n._vertexFormat, a, i),
      (i += m.VertexFormat.packedLength),
      (a[i++] = n._cornerType),
      (a[i] = n._granularity),
      a
    );
  };
  var x = t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),
    C = new m.VertexFormat(),
    F = {
      polylinePositions: void 0,
      shapePositions: void 0,
      ellipsoid: x,
      vertexFormat: C,
      cornerType: void 0,
      granularity: void 0,
    };
  V.unpack = function (n, a, i) {
    var r;
    a = e.defaultValue(a, 0);
    var o = n[a++],
      l = new Array(o);
    for (r = 0; r < o; ++r, a += t.Cartesian3.packedLength) l[r] = t.Cartesian3.unpack(n, a);
    o = n[a++];
    var s = new Array(o);
    for (r = 0; r < o; ++r, a += t.Cartesian2.packedLength) s[r] = t.Cartesian2.unpack(n, a);
    var p = t.Ellipsoid.unpack(n, a, x);
    a += t.Ellipsoid.packedLength;
    var d = m.VertexFormat.unpack(n, a, C);
    a += m.VertexFormat.packedLength;
    var c = n[a++],
      u = n[a];
    return e.defined(i)
      ? ((i._positions = l),
        (i._shape = s),
        (i._ellipsoid = t.Ellipsoid.clone(p, i._ellipsoid)),
        (i._vertexFormat = m.VertexFormat.clone(d, i._vertexFormat)),
        (i._cornerType = c),
        (i._granularity = u),
        i)
      : ((F.polylinePositions = l),
        (F.shapePositions = s),
        (F.cornerType = c),
        (F.granularity = u),
        new V(F));
  };
  var A = new a.BoundingRectangle();
  return (
    (V.createGeometry = function (e) {
      var l = e._positions,
        m = n.arrayRemoveDuplicates(l, t.Cartesian3.equalsEpsilon),
        y = e._shape;
      if (
        ((y = o.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(y)),
        !(m.length < 2 || y.length < 3))
      ) {
        u.PolygonPipeline.computeWindingOrder2D(y) === u.WindingOrder.CLOCKWISE && y.reverse();
        var g = a.BoundingRectangle.fromPoints(y, A);
        return (function (e, t, n, a) {
          var l = new p.GeometryAttributes();
          a.position &&
            (l.position = new s.GeometryAttribute({
              componentDatatype: r.ComponentDatatype.DOUBLE,
              componentsPerAttribute: 3,
              values: e,
            }));
          var m,
            y,
            g,
            f,
            h,
            b,
            v = t.length,
            P = e.length / 3,
            E = (P - 2 * v) / (2 * v),
            _ = u.PolygonPipeline.triangulate(t),
            k = (E - 1) * v * 6 + 2 * _.length,
            L = c.IndexDatatype.createTypedArray(P, k),
            V = 2 * v,
            x = 0;
          for (m = 0; m < E - 1; m++) {
            for (y = 0; y < v - 1; y++)
              (b = (g = 2 * y + m * v * 2) + V),
                (h = (f = g + 1) + V),
                (L[x++] = f),
                (L[x++] = g),
                (L[x++] = h),
                (L[x++] = h),
                (L[x++] = g),
                (L[x++] = b);
            (h = (f = 1 + (g = 2 * v - 2 + m * v * 2)) + V),
              (b = g + V),
              (L[x++] = f),
              (L[x++] = g),
              (L[x++] = h),
              (L[x++] = h),
              (L[x++] = g),
              (L[x++] = b);
          }
          if (a.st || a.tangent || a.bitangent) {
            var C,
              F,
              A = new Float32Array(2 * P),
              T = 1 / (E - 1),
              G = 1 / n.height,
              D = n.height / 2,
              w = 0;
            for (m = 0; m < E; m++) {
              for (C = m * T, F = G * (t[0].y + D), A[w++] = C, A[w++] = F, y = 1; y < v; y++)
                (F = G * (t[y].y + D)), (A[w++] = C), (A[w++] = F), (A[w++] = C), (A[w++] = F);
              (F = G * (t[0].y + D)), (A[w++] = C), (A[w++] = F);
            }
            for (y = 0; y < v; y++) (C = 0), (F = G * (t[y].y + D)), (A[w++] = C), (A[w++] = F);
            for (y = 0; y < v; y++)
              (C = (E - 1) * T), (F = G * (t[y].y + D)), (A[w++] = C), (A[w++] = F);
            l.st = new s.GeometryAttribute({
              componentDatatype: r.ComponentDatatype.FLOAT,
              componentsPerAttribute: 2,
              values: new Float32Array(A),
            });
          }
          var R = P - 2 * v;
          for (m = 0; m < _.length; m += 3) {
            var B = _[m] + R,
              S = _[m + 1] + R,
              I = _[m + 2] + R;
            (L[x++] = B),
              (L[x++] = S),
              (L[x++] = I),
              (L[x++] = I + v),
              (L[x++] = S + v),
              (L[x++] = B + v);
          }
          var O = new s.Geometry({
            attributes: l,
            indices: L,
            boundingSphere: i.BoundingSphere.fromVertices(e),
            primitiveType: s.PrimitiveType.TRIANGLES,
          });
          if ((a.normal && (O = d.GeometryPipeline.computeNormal(O)), a.tangent || a.bitangent)) {
            try {
              O = d.GeometryPipeline.computeTangentAndBitangent(O);
            } catch (e) {
              o.oneTimeWarning(
                'polyline-volume-tangent-bitangent',
                'Unable to compute tangents and bitangents for polyline volume geometry'
              );
            }
            a.tangent || (O.attributes.tangent = void 0),
              a.bitangent || (O.attributes.bitangent = void 0),
              a.st || (O.attributes.st = void 0);
          }
          return O;
        })(o.PolylineVolumeGeometryLibrary.computePositions(m, y, g, e, !0), y, g, e._vertexFormat);
      }
    }),
    function (n, a) {
      return (
        e.defined(a) && (n = V.unpack(n, a)),
        (n._ellipsoid = t.Ellipsoid.clone(n._ellipsoid)),
        V.createGeometry(n)
      );
    }
  );
});
