define([
  './arrayRemoveDuplicates-bb548aa3',
  './Transforms-7cd3197b',
  './Matrix2-f2da41d4',
  './RuntimeError-ffe03243',
  './ComponentDatatype-17b06483',
  './CoplanarPolygonGeometryLibrary-4653bf5b',
  './when-229515d6',
  './GeometryAttribute-80036e07',
  './GeometryAttributes-b253752a',
  './GeometryInstance-16601d2a',
  './GeometryPipeline-5b3fba53',
  './IndexDatatype-b10faa0b',
  './PolygonGeometryLibrary-f129e954',
  './combine-8ce3f24b',
  './WebGLConstants-4e26b85a',
  './OrientedBoundingBox-86debc5a',
  './EllipsoidTangentPlane-b27cd2f7',
  './AxisAlignedBoundingBox-1feb0c48',
  './IntersectionTests-1b8a3cb9',
  './Plane-0421a8be',
  './AttributeCompression-0af3c035',
  './EncodedCartesian3-d4f305ce',
  './ArcType-1da7fdca',
  './EllipsoidRhumbLine-afd6cd20',
  './PolygonPipeline-5582b1ec',
], function (e, t, r, n, o, a, i, y, l, c, p, s, u, d, m, b, f, g, h, P, G, v, L, T, E) {
  'use strict';
  function A(e) {
    for (
      var t = e.length,
        r = new Float64Array(3 * t),
        n = s.IndexDatatype.createTypedArray(t, 2 * t),
        a = 0,
        i = 0,
        c = 0;
      c < t;
      c++
    ) {
      var p = e[c];
      (r[a++] = p.x), (r[a++] = p.y), (r[a++] = p.z), (n[i++] = c), (n[i++] = (c + 1) % t);
    }
    var u = new l.GeometryAttributes({
      position: new y.GeometryAttribute({
        componentDatatype: o.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: r,
      }),
    });
    return new y.Geometry({ attributes: u, indices: n, primitiveType: y.PrimitiveType.LINES });
  }
  function C(e) {
    var t = (e = i.defaultValue(e, i.defaultValue.EMPTY_OBJECT)).polygonHierarchy;
    (this._polygonHierarchy = t),
      (this._workerName = 'createCoplanarPolygonOutlineGeometry'),
      (this.packedLength = u.PolygonGeometryLibrary.computeHierarchyPackedLength(t) + 1);
  }
  (C.fromPositions = function (e) {
    return new C({
      polygonHierarchy: {
        positions: (e = i.defaultValue(e, i.defaultValue.EMPTY_OBJECT)).positions,
      },
    });
  }),
    (C.pack = function (e, t, r) {
      return (
        (r = i.defaultValue(r, 0)),
        (t[(r = u.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy, t, r))] =
          e.packedLength),
        t
      );
    });
  var H = { polygonHierarchy: {} };
  return (
    (C.unpack = function (e, t, r) {
      t = i.defaultValue(t, 0);
      var n = u.PolygonGeometryLibrary.unpackPolygonHierarchy(e, t);
      (t = n.startingIndex), delete n.startingIndex;
      var o = e[t];
      return i.defined(r) || (r = new C(H)), (r._polygonHierarchy = n), (r.packedLength = o), r;
    }),
    (C.createGeometry = function (n) {
      var o = n._polygonHierarchy,
        i = o.positions;
      if (
        !((i = e.arrayRemoveDuplicates(i, r.Cartesian3.equalsEpsilon, !0)).length < 3) &&
        a.CoplanarPolygonGeometryLibrary.validOutline(i)
      ) {
        var l = u.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(o, !1);
        if (0 !== l.length) {
          for (var s = [], d = 0; d < l.length; d++) {
            var m = new c.GeometryInstance({ geometry: A(l[d]) });
            s.push(m);
          }
          var b = p.GeometryPipeline.combineInstances(s)[0],
            f = t.BoundingSphere.fromPoints(o.positions);
          return new y.Geometry({
            attributes: b.attributes,
            indices: b.indices,
            primitiveType: b.primitiveType,
            boundingSphere: f,
          });
        }
      }
    }),
    function (e, t) {
      return (
        i.defined(t) && (e = C.unpack(e, t)),
        (e._ellipsoid = r.Ellipsoid.clone(e._ellipsoid)),
        C.createGeometry(e)
      );
    }
  );
});
