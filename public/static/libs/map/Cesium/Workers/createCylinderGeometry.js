define([
  './CylinderGeometry-4a23db6d',
  './when-229515d6',
  './GeometryOffsetAttribute-ff1e192c',
  './RuntimeError-ffe03243',
  './Transforms-7cd3197b',
  './Matrix2-f2da41d4',
  './ComponentDatatype-17b06483',
  './WebGLConstants-4e26b85a',
  './combine-8ce3f24b',
  './CylinderGeometryLibrary-7b000e1b',
  './GeometryAttribute-80036e07',
  './GeometryAttributes-b253752a',
  './IndexDatatype-b10faa0b',
  './VertexFormat-565d6a6c',
], function (e, t, r, n, a, o, b, i, d, y, f, m, c, u) {
  'use strict';
  return function (r, n) {
    return (
      t.defined(n) && (r = e.CylinderGeometry.unpack(r, n)), e.CylinderGeometry.createGeometry(r)
    );
  };
});
