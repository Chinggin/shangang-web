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
  './IndexDatatype-b10faa0b',
  './PolygonPipeline-5582b1ec',
  './combine-8ce3f24b',
  './WebGLConstants-4e26b85a',
  './EllipsoidTangentPlane-b27cd2f7',
  './AxisAlignedBoundingBox-1feb0c48',
  './IntersectionTests-1b8a3cb9',
  './Plane-0421a8be',
  './PolylinePipeline-a3ba6f24',
  './EllipsoidGeodesic-43ba18de',
  './EllipsoidRhumbLine-afd6cd20',
], function (e, i, n, a, t, r, o, l, s, p, d, u, c, y, g, h, f, m, b, v, E) {
  'use strict';
  function P(n) {
    var a = (n = e.defaultValue(n, e.defaultValue.EMPTY_OBJECT)).polylinePositions,
      t = n.shapePositions;
    (this._positions = a),
      (this._shape = t),
      (this._ellipsoid = i.Ellipsoid.clone(e.defaultValue(n.ellipsoid, i.Ellipsoid.WGS84))),
      (this._cornerType = e.defaultValue(n.cornerType, o.CornerType.ROUNDED)),
      (this._granularity = e.defaultValue(n.granularity, r.CesiumMath.RADIANS_PER_DEGREE)),
      (this._workerName = 'createPolylineVolumeOutlineGeometry');
    var l = 1 + a.length * i.Cartesian3.packedLength;
    (l += 1 + t.length * i.Cartesian2.packedLength),
      (this.packedLength = l + i.Ellipsoid.packedLength + 2);
  }
  P.pack = function (n, a, t) {
    var r;
    t = e.defaultValue(t, 0);
    var o = n._positions,
      l = o.length;
    for (a[t++] = l, r = 0; r < l; ++r, t += i.Cartesian3.packedLength)
      i.Cartesian3.pack(o[r], a, t);
    var s = n._shape;
    for (l = s.length, a[t++] = l, r = 0; r < l; ++r, t += i.Cartesian2.packedLength)
      i.Cartesian2.pack(s[r], a, t);
    return (
      i.Ellipsoid.pack(n._ellipsoid, a, t),
      (t += i.Ellipsoid.packedLength),
      (a[t++] = n._cornerType),
      (a[t] = n._granularity),
      a
    );
  };
  var _ = i.Ellipsoid.clone(i.Ellipsoid.UNIT_SPHERE),
    k = {
      polylinePositions: void 0,
      shapePositions: void 0,
      ellipsoid: _,
      height: void 0,
      cornerType: void 0,
      granularity: void 0,
    };
  P.unpack = function (n, a, t) {
    var r;
    a = e.defaultValue(a, 0);
    var o = n[a++],
      l = new Array(o);
    for (r = 0; r < o; ++r, a += i.Cartesian3.packedLength) l[r] = i.Cartesian3.unpack(n, a);
    o = n[a++];
    var s = new Array(o);
    for (r = 0; r < o; ++r, a += i.Cartesian2.packedLength) s[r] = i.Cartesian2.unpack(n, a);
    var p = i.Ellipsoid.unpack(n, a, _);
    a += i.Ellipsoid.packedLength;
    var d = n[a++],
      u = n[a];
    return e.defined(t)
      ? ((t._positions = l),
        (t._shape = s),
        (t._ellipsoid = i.Ellipsoid.clone(p, t._ellipsoid)),
        (t._cornerType = d),
        (t._granularity = u),
        t)
      : ((k.polylinePositions = l),
        (k.shapePositions = s),
        (k.cornerType = d),
        (k.granularity = u),
        new P(k));
  };
  var C = new a.BoundingRectangle();
  return (
    (P.createGeometry = function (e) {
      var l = e._positions,
        c = n.arrayRemoveDuplicates(l, i.Cartesian3.equalsEpsilon),
        y = e._shape;
      if (
        ((y = o.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(y)),
        !(c.length < 2 || y.length < 3))
      ) {
        u.PolygonPipeline.computeWindingOrder2D(y) === u.WindingOrder.CLOCKWISE && y.reverse();
        var g = a.BoundingRectangle.fromPoints(y, C);
        return (function (e, i) {
          var n = new p.GeometryAttributes();
          n.position = new s.GeometryAttribute({
            componentDatatype: r.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            values: e,
          });
          var a,
            o,
            l = i.length,
            u = n.position.values.length / 3,
            c = e.length / 3 / l,
            y = d.IndexDatatype.createTypedArray(u, 2 * l * (c + 1)),
            g = 0,
            h = (a = 0) * l;
          for (o = 0; o < l - 1; o++) (y[g++] = o + h), (y[g++] = o + h + 1);
          for (y[g++] = l - 1 + h, y[g++] = h, h = (a = c - 1) * l, o = 0; o < l - 1; o++)
            (y[g++] = o + h), (y[g++] = o + h + 1);
          for (y[g++] = l - 1 + h, y[g++] = h, a = 0; a < c - 1; a++) {
            var f = l * a,
              m = f + l;
            for (o = 0; o < l; o++) (y[g++] = o + f), (y[g++] = o + m);
          }
          return new s.Geometry({
            attributes: n,
            indices: d.IndexDatatype.createTypedArray(u, y),
            boundingSphere: t.BoundingSphere.fromVertices(e),
            primitiveType: s.PrimitiveType.LINES,
          });
        })(o.PolylineVolumeGeometryLibrary.computePositions(c, y, g, e, !1), y);
      }
    }),
    function (n, a) {
      return (
        e.defined(a) && (n = P.unpack(n, a)),
        (n._ellipsoid = i.Ellipsoid.clone(n._ellipsoid)),
        P.createGeometry(n)
      );
    }
  );
});
