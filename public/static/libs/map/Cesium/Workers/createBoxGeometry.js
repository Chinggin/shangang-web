define([
  './BoxGeometry-a530ddad',
  './when-229515d6',
  './GeometryOffsetAttribute-ff1e192c',
  './RuntimeError-ffe03243',
  './Transforms-7cd3197b',
  './Matrix2-f2da41d4',
  './ComponentDatatype-17b06483',
  './WebGLConstants-4e26b85a',
  './combine-8ce3f24b',
  './GeometryAttribute-80036e07',
  './GeometryAttributes-b253752a',
  './VertexFormat-565d6a6c',
], function (e, t, r, o, n, a, f, m, d, i, b, c) {
  'use strict';
  return function (r, o) {
    return t.defined(o) && (r = e.BoxGeometry.unpack(r, o)), e.BoxGeometry.createGeometry(r);
  };
});
