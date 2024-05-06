define([
  'exports',
  './AxisAlignedBoundingBox-1feb0c48',
  './Matrix2-f2da41d4',
  './RuntimeError-ffe03243',
  './when-229515d6',
  './IntersectionTests-1b8a3cb9',
  './Plane-0421a8be',
  './Transforms-7cd3197b',
], function (e, t, n, i, r, a, o, s) {
  'use strict';
  var l = new n.Cartesian4();
  function d(e, t) {
    e = (t = r.defaultValue(t, n.Ellipsoid.WGS84)).scaleToGeodeticSurface(e);
    var i = s.Transforms.eastNorthUpToFixedFrame(e, t);
    (this._ellipsoid = t),
      (this._origin = e),
      (this._xAxis = n.Cartesian3.fromCartesian4(n.Matrix4.getColumn(i, 0, l))),
      (this._yAxis = n.Cartesian3.fromCartesian4(n.Matrix4.getColumn(i, 1, l)));
    var a = n.Cartesian3.fromCartesian4(n.Matrix4.getColumn(i, 2, l));
    this._plane = o.Plane.fromPointNormal(e, a);
  }
  Object.defineProperties(d.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid;
      },
    },
    origin: {
      get: function () {
        return this._origin;
      },
    },
    plane: {
      get: function () {
        return this._plane;
      },
    },
    xAxis: {
      get: function () {
        return this._xAxis;
      },
    },
    yAxis: {
      get: function () {
        return this._yAxis;
      },
    },
    zAxis: {
      get: function () {
        return this._plane.normal;
      },
    },
  });
  var c = new t.AxisAlignedBoundingBox();
  d.fromPoints = function (e, n) {
    return new d(t.AxisAlignedBoundingBox.fromPoints(e, c).center, n);
  };
  var f = new a.Ray(),
    p = new n.Cartesian3();
  (d.prototype.projectPointOntoPlane = function (e, t) {
    var i = f;
    (i.origin = e), n.Cartesian3.normalize(e, i.direction);
    var o = a.IntersectionTests.rayPlane(i, this._plane, p);
    if (
      (r.defined(o) ||
        (n.Cartesian3.negate(i.direction, i.direction),
        (o = a.IntersectionTests.rayPlane(i, this._plane, p))),
      r.defined(o))
    ) {
      var s = n.Cartesian3.subtract(o, this._origin, o),
        l = n.Cartesian3.dot(this._xAxis, s),
        d = n.Cartesian3.dot(this._yAxis, s);
      return r.defined(t) ? ((t.x = l), (t.y = d), t) : new n.Cartesian2(l, d);
    }
  }),
    (d.prototype.projectPointsOntoPlane = function (e, t) {
      r.defined(t) || (t = []);
      for (var n = 0, i = e.length, a = 0; a < i; a++) {
        var o = this.projectPointOntoPlane(e[a], t[n]);
        r.defined(o) && ((t[n] = o), n++);
      }
      return (t.length = n), t;
    }),
    (d.prototype.projectPointToNearestOnPlane = function (e, t) {
      r.defined(t) || (t = new n.Cartesian2());
      var i = f;
      (i.origin = e), n.Cartesian3.clone(this._plane.normal, i.direction);
      var o = a.IntersectionTests.rayPlane(i, this._plane, p);
      r.defined(o) ||
        (n.Cartesian3.negate(i.direction, i.direction),
        (o = a.IntersectionTests.rayPlane(i, this._plane, p)));
      var s = n.Cartesian3.subtract(o, this._origin, o),
        l = n.Cartesian3.dot(this._xAxis, s),
        d = n.Cartesian3.dot(this._yAxis, s);
      return (t.x = l), (t.y = d), t;
    }),
    (d.prototype.projectPointsToNearestOnPlane = function (e, t) {
      r.defined(t) || (t = []);
      var n = e.length;
      t.length = n;
      for (var i = 0; i < n; i++) t[i] = this.projectPointToNearestOnPlane(e[i], t[i]);
      return t;
    });
  var u = new n.Cartesian3();
  (d.prototype.projectPointOntoEllipsoid = function (e, t) {
    r.defined(t) || (t = new n.Cartesian3());
    var i = this._ellipsoid,
      a = this._origin,
      o = this._xAxis,
      s = this._yAxis,
      l = u;
    return (
      n.Cartesian3.multiplyByScalar(o, e.x, l),
      (t = n.Cartesian3.add(a, l, t)),
      n.Cartesian3.multiplyByScalar(s, e.y, l),
      n.Cartesian3.add(t, l, t),
      i.scaleToGeocentricSurface(t, t),
      t
    );
  }),
    (d.prototype.projectPointsOntoEllipsoid = function (e, t) {
      var n = e.length;
      r.defined(t) ? (t.length = n) : (t = new Array(n));
      for (var i = 0; i < n; ++i) t[i] = this.projectPointOntoEllipsoid(e[i], t[i]);
      return t;
    }),
    (e.EllipsoidTangentPlane = d);
});
