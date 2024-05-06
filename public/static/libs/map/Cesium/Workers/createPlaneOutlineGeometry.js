define([
  './when-229515d6',
  './Transforms-7cd3197b',
  './Matrix2-f2da41d4',
  './RuntimeError-ffe03243',
  './ComponentDatatype-17b06483',
  './GeometryAttribute-80036e07',
  './GeometryAttributes-b253752a',
  './combine-8ce3f24b',
  './WebGLConstants-4e26b85a',
], function (e, t, n, r, i, a, o, u, c) {
  'use strict';
  function y() {
    this._workerName = 'createPlaneOutlineGeometry';
  }
  (y.packedLength = 0),
    (y.pack = function (e, t) {
      return t;
    }),
    (y.unpack = function (t, n, r) {
      return e.defined(r) ? r : new y();
    });
  var m = new n.Cartesian3(-0.5, -0.5, 0),
    s = new n.Cartesian3(0.5, 0.5, 0);
  return (
    (y.createGeometry = function () {
      var e = new o.GeometryAttributes(),
        r = new Uint16Array(8),
        u = new Float64Array(12);
      return (
        (u[0] = m.x),
        (u[1] = m.y),
        (u[2] = m.z),
        (u[3] = s.x),
        (u[4] = m.y),
        (u[5] = m.z),
        (u[6] = s.x),
        (u[7] = s.y),
        (u[8] = m.z),
        (u[9] = m.x),
        (u[10] = s.y),
        (u[11] = m.z),
        (e.position = new a.GeometryAttribute({
          componentDatatype: i.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: u,
        })),
        (r[0] = 0),
        (r[1] = 1),
        (r[2] = 1),
        (r[3] = 2),
        (r[4] = 2),
        (r[5] = 3),
        (r[6] = 3),
        (r[7] = 0),
        new a.Geometry({
          attributes: e,
          indices: r,
          primitiveType: a.PrimitiveType.LINES,
          boundingSphere: new t.BoundingSphere(n.Cartesian3.ZERO, Math.sqrt(2)),
        })
      );
    }),
    function (t, n) {
      return e.defined(n) && (t = y.unpack(t, n)), y.createGeometry(t);
    }
  );
});
