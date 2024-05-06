define([
  './when-229515d6',
  './EllipsoidGeometry-6edeb2a4',
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
  './VertexFormat-565d6a6c',
], function (e, t, r, o, n, a, i, f, b, d, m, s, c) {
  'use strict';
  return function (r, o) {
    return (
      e.defined(o) && (r = t.EllipsoidGeometry.unpack(r, o)), t.EllipsoidGeometry.createGeometry(r)
    );
  };
});
