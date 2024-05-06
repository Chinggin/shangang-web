define([
  './Matrix2-f2da41d4',
  './RuntimeError-ffe03243',
  './when-229515d6',
  './EllipseOutlineGeometry-c29842bd',
  './ComponentDatatype-17b06483',
  './WebGLConstants-4e26b85a',
  './GeometryOffsetAttribute-ff1e192c',
  './Transforms-7cd3197b',
  './combine-8ce3f24b',
  './EllipseGeometryLibrary-69f5ff56',
  './GeometryAttribute-80036e07',
  './GeometryAttributes-b253752a',
  './IndexDatatype-b10faa0b',
], function (e, i, t, r, l, n, s, o, a, u, d, m, c) {
  'use strict';
  function p(e) {
    var i = (e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)).radius,
      l = {
        center: e.center,
        semiMajorAxis: i,
        semiMinorAxis: i,
        ellipsoid: e.ellipsoid,
        height: e.height,
        extrudedHeight: e.extrudedHeight,
        granularity: e.granularity,
        numberOfVerticalLines: e.numberOfVerticalLines,
      };
    (this._ellipseGeometry = new r.EllipseOutlineGeometry(l)),
      (this._workerName = 'createCircleOutlineGeometry');
  }
  (p.packedLength = r.EllipseOutlineGeometry.packedLength),
    (p.pack = function (e, i, t) {
      return r.EllipseOutlineGeometry.pack(e._ellipseGeometry, i, t);
    });
  var y = new r.EllipseOutlineGeometry({
      center: new e.Cartesian3(),
      semiMajorAxis: 1,
      semiMinorAxis: 1,
    }),
    f = {
      center: new e.Cartesian3(),
      radius: void 0,
      ellipsoid: e.Ellipsoid.clone(e.Ellipsoid.UNIT_SPHERE),
      height: void 0,
      extrudedHeight: void 0,
      granularity: void 0,
      numberOfVerticalLines: void 0,
      semiMajorAxis: void 0,
      semiMinorAxis: void 0,
    };
  return (
    (p.unpack = function (i, l, n) {
      var s = r.EllipseOutlineGeometry.unpack(i, l, y);
      return (
        (f.center = e.Cartesian3.clone(s._center, f.center)),
        (f.ellipsoid = e.Ellipsoid.clone(s._ellipsoid, f.ellipsoid)),
        (f.height = s._height),
        (f.extrudedHeight = s._extrudedHeight),
        (f.granularity = s._granularity),
        (f.numberOfVerticalLines = s._numberOfVerticalLines),
        t.defined(n)
          ? ((f.semiMajorAxis = s._semiMajorAxis),
            (f.semiMinorAxis = s._semiMinorAxis),
            (n._ellipseGeometry = new r.EllipseOutlineGeometry(f)),
            n)
          : ((f.radius = s._semiMajorAxis), new p(f))
      );
    }),
    (p.createGeometry = function (e) {
      return r.EllipseOutlineGeometry.createGeometry(e._ellipseGeometry);
    }),
    function (i, r) {
      return (
        t.defined(r) && (i = p.unpack(i, r)),
        (i._ellipseGeometry._center = e.Cartesian3.clone(i._ellipseGeometry._center)),
        (i._ellipseGeometry._ellipsoid = e.Ellipsoid.clone(i._ellipseGeometry._ellipsoid)),
        p.createGeometry(i)
      );
    }
  );
});
