define([
  './Matrix2-f2da41d4',
  './when-229515d6',
  './EllipseGeometry-0fca35c1',
  './RuntimeError-ffe03243',
  './ComponentDatatype-17b06483',
  './WebGLConstants-4e26b85a',
  './GeometryOffsetAttribute-ff1e192c',
  './Transforms-7cd3197b',
  './combine-8ce3f24b',
  './EllipseGeometryLibrary-69f5ff56',
  './GeometryAttribute-80036e07',
  './GeometryAttributes-b253752a',
  './GeometryInstance-16601d2a',
  './GeometryPipeline-5b3fba53',
  './AttributeCompression-0af3c035',
  './EncodedCartesian3-d4f305ce',
  './IndexDatatype-b10faa0b',
  './IntersectionTests-1b8a3cb9',
  './Plane-0421a8be',
  './VertexFormat-565d6a6c',
], function (e, t, r, n, a, i, o, s, c, f, b, l, d, m, p, y, u, G, E, C) {
  'use strict';
  return function (n, a) {
    return (
      t.defined(a) && (n = r.EllipseGeometry.unpack(n, a)),
      (n._center = e.Cartesian3.clone(n._center)),
      (n._ellipsoid = e.Ellipsoid.clone(n._ellipsoid)),
      r.EllipseGeometry.createGeometry(n)
    );
  };
});
