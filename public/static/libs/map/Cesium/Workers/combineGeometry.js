define([
  './PrimitivePipeline-82a942e9',
  './createTaskProcessorWorker',
  './Transforms-7cd3197b',
  './Matrix2-f2da41d4',
  './RuntimeError-ffe03243',
  './when-229515d6',
  './ComponentDatatype-17b06483',
  './WebGLConstants-4e26b85a',
  './combine-8ce3f24b',
  './GeometryAttribute-80036e07',
  './GeometryAttributes-b253752a',
  './GeometryPipeline-5b3fba53',
  './AttributeCompression-0af3c035',
  './EncodedCartesian3-d4f305ce',
  './IndexDatatype-b10faa0b',
  './IntersectionTests-1b8a3cb9',
  './Plane-0421a8be',
  './WebMercatorProjection-d69cec15',
], function (e, t, i, r, n, a, o, b, c, m, s, P, f, p, u, d, y, l) {
  'use strict';
  return t(function (t, i) {
    var r = e.PrimitivePipeline.unpackCombineGeometryParameters(t),
      n = e.PrimitivePipeline.combineGeometry(r);
    return e.PrimitivePipeline.packCombineGeometryResults(n, i);
  });
});
