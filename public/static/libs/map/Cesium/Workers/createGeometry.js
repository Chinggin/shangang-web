define([
  './when-229515d6',
  './PrimitivePipeline-82a942e9',
  './createTaskProcessorWorker',
  './Transforms-7cd3197b',
  './Matrix2-f2da41d4',
  './RuntimeError-ffe03243',
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
], function (e, r, t, n, a, i, o, s, c, f, b, u, d, m, l, p, y, P) {
  'use strict';
  var v = {};
  function k(r) {
    var t = v[r];
    return (
      e.defined(t) ||
        ('object' == typeof exports
          ? (v[t] = t = require('Workers/' + r))
          : require(['Workers/' + r], function (e) {
              v[(t = e)] = e;
            })),
      t
    );
  }
  return t(function (t, n) {
    for (var a = t.subTasks, i = a.length, o = new Array(i), s = 0; s < i; s++) {
      var c = a[s],
        f = c.geometry,
        b = c.moduleName;
      if (e.defined(b)) {
        var u = k(b);
        o[s] = u(f, c.offset);
      } else o[s] = f;
    }
    return e.when.all(o, function (e) {
      return r.PrimitivePipeline.packCreateGeometryResults(e, n);
    });
  });
});
