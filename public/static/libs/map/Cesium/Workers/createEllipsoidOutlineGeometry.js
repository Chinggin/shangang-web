define([
  './when-229515d6',
  './EllipsoidOutlineGeometry-207e73be',
  './GeometryOffsetAttribute-ff1e192c',
  './RuntimeError-ffe03243',
  './Transforms-7cd3197b',
  './Matrix2-f2da41d4',
  './ComponentDatatype-17b06483',
  './WebGLConstants-4e26b85a',
  './combine-8ce3f24b',
  './GeometryAttribute-80036e07',
  './GeometryAttributes-b253752a',
  './IndexDatatype-b10faa0b',
], function (e, t, r, n, i, o, f, a, b, u, d, m) {
  'use strict';
  return function (r, n) {
    return (
      e.defined(r.buffer) && (r = t.EllipsoidOutlineGeometry.unpack(r, n)),
      t.EllipsoidOutlineGeometry.createGeometry(r)
    );
  };
});
