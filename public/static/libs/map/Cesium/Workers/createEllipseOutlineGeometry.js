define([
  './Matrix2-f2da41d4',
  './when-229515d6',
  './EllipseOutlineGeometry-c29842bd',
  './RuntimeError-ffe03243',
  './ComponentDatatype-17b06483',
  './WebGLConstants-4e26b85a',
  './GeometryOffsetAttribute-ff1e192c',
  './Transforms-7cd3197b',
  './combine-8ce3f24b',
  './EllipseGeometryLibrary-69f5ff56',
  './GeometryAttribute-80036e07',
  './GeometryAttributes-b253752a',
  './IndexDatatype-b10faa0b',
], function (e, t, r, i, n, o, l, a, f, s, b, c, u) {
  'use strict';
  return function (i, n) {
    return (
      t.defined(n) && (i = r.EllipseOutlineGeometry.unpack(i, n)),
      (i._center = e.Cartesian3.clone(i._center)),
      (i._ellipsoid = e.Ellipsoid.clone(i._ellipsoid)),
      r.EllipseOutlineGeometry.createGeometry(i)
    );
  };
});
