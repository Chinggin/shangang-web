define([
  './when-229515d6',
  './Matrix2-f2da41d4',
  './RuntimeError-ffe03243',
  './EllipsoidGeometry-6edeb2a4',
  './VertexFormat-565d6a6c',
  './ComponentDatatype-17b06483',
  './WebGLConstants-4e26b85a',
  './GeometryOffsetAttribute-ff1e192c',
  './Transforms-7cd3197b',
  './combine-8ce3f24b',
  './GeometryAttribute-80036e07',
  './GeometryAttributes-b253752a',
  './IndexDatatype-b10faa0b',
], function (e, t, r, i, a, o, n, s, d, c, l, m, u) {
  'use strict';
  function p(r) {
    var a = e.defaultValue(r.radius, 1),
      o = {
        radii: new t.Cartesian3(a, a, a),
        stackPartitions: r.stackPartitions,
        slicePartitions: r.slicePartitions,
        vertexFormat: r.vertexFormat,
      };
    (this._ellipsoidGeometry = new i.EllipsoidGeometry(o)),
      (this._workerName = 'createSphereGeometry');
  }
  (p.packedLength = i.EllipsoidGeometry.packedLength),
    (p.pack = function (e, t, r) {
      return i.EllipsoidGeometry.pack(e._ellipsoidGeometry, t, r);
    });
  var y = new i.EllipsoidGeometry(),
    f = {
      radius: void 0,
      radii: new t.Cartesian3(),
      vertexFormat: new a.VertexFormat(),
      stackPartitions: void 0,
      slicePartitions: void 0,
    };
  return (
    (p.unpack = function (r, o, n) {
      var s = i.EllipsoidGeometry.unpack(r, o, y);
      return (
        (f.vertexFormat = a.VertexFormat.clone(s._vertexFormat, f.vertexFormat)),
        (f.stackPartitions = s._stackPartitions),
        (f.slicePartitions = s._slicePartitions),
        e.defined(n)
          ? (t.Cartesian3.clone(s._radii, f.radii),
            (n._ellipsoidGeometry = new i.EllipsoidGeometry(f)),
            n)
          : ((f.radius = s._radii.x), new p(f))
      );
    }),
    (p.createGeometry = function (e) {
      return i.EllipsoidGeometry.createGeometry(e._ellipsoidGeometry);
    }),
    function (t, r) {
      return e.defined(r) && (t = p.unpack(t, r)), p.createGeometry(t);
    }
  );
});
