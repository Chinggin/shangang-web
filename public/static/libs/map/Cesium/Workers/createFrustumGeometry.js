define([
  './when-229515d6',
  './FrustumGeometry-3d147886',
  './Transforms-7cd3197b',
  './Matrix2-f2da41d4',
  './RuntimeError-ffe03243',
  './ComponentDatatype-17b06483',
  './WebGLConstants-4e26b85a',
  './combine-8ce3f24b',
  './GeometryAttribute-80036e07',
  './GeometryAttributes-b253752a',
  './Plane-0421a8be',
  './VertexFormat-565d6a6c',
], function (e, t, r, n, o, u, a, m, b, i, s, c) {
  'use strict';
  return function (r, n) {
    return (
      e.defined(n) && (r = t.FrustumGeometry.unpack(r, n)), t.FrustumGeometry.createGeometry(r)
    );
  };
});
