define([
  './when-229515d6',
  './Transforms-7cd3197b',
  './Matrix2-f2da41d4',
  './RuntimeError-ffe03243',
  './ComponentDatatype-17b06483',
  './FrustumGeometry-3d147886',
  './GeometryAttribute-80036e07',
  './GeometryAttributes-b253752a',
  './combine-8ce3f24b',
  './WebGLConstants-4e26b85a',
  './Plane-0421a8be',
  './VertexFormat-565d6a6c',
], function (e, t, r, n, a, i, u, o, s, c, p, m) {
  'use strict';
  function d(n) {
    var a,
      u,
      o = n.frustum,
      s = n.orientation,
      c = n.origin,
      p = e.defaultValue(n._drawNearPlane, !0);
    o instanceof i.PerspectiveFrustum
      ? ((a = 0), (u = i.PerspectiveFrustum.packedLength))
      : o instanceof i.OrthographicFrustum && ((a = 1), (u = i.OrthographicFrustum.packedLength)),
      (this._frustumType = a),
      (this._frustum = o.clone()),
      (this._origin = r.Cartesian3.clone(c)),
      (this._orientation = t.Quaternion.clone(s)),
      (this._drawNearPlane = p),
      (this._workerName = 'createFrustumOutlineGeometry'),
      (this.packedLength = 2 + u + r.Cartesian3.packedLength + t.Quaternion.packedLength);
  }
  d.pack = function (n, a, u) {
    u = e.defaultValue(u, 0);
    var o = n._frustumType,
      s = n._frustum;
    return (
      (a[u++] = o),
      0 === o
        ? (i.PerspectiveFrustum.pack(s, a, u), (u += i.PerspectiveFrustum.packedLength))
        : (i.OrthographicFrustum.pack(s, a, u), (u += i.OrthographicFrustum.packedLength)),
      r.Cartesian3.pack(n._origin, a, u),
      (u += r.Cartesian3.packedLength),
      t.Quaternion.pack(n._orientation, a, u),
      (a[(u += t.Quaternion.packedLength)] = n._drawNearPlane ? 1 : 0),
      a
    );
  };
  var h = new i.PerspectiveFrustum(),
    f = new i.OrthographicFrustum(),
    g = new t.Quaternion(),
    _ = new r.Cartesian3();
  return (
    (d.unpack = function (n, a, u) {
      a = e.defaultValue(a, 0);
      var o,
        s = n[a++];
      0 === s
        ? ((o = i.PerspectiveFrustum.unpack(n, a, h)), (a += i.PerspectiveFrustum.packedLength))
        : ((o = i.OrthographicFrustum.unpack(n, a, f)), (a += i.OrthographicFrustum.packedLength));
      var c = r.Cartesian3.unpack(n, a, _);
      a += r.Cartesian3.packedLength;
      var p = t.Quaternion.unpack(n, a, g),
        m = 1 === n[(a += t.Quaternion.packedLength)];
      if (!e.defined(u)) return new d({ frustum: o, origin: c, orientation: p, _drawNearPlane: m });
      var k = s === u._frustumType ? u._frustum : void 0;
      return (
        (u._frustum = o.clone(k)),
        (u._frustumType = s),
        (u._origin = r.Cartesian3.clone(c, u._origin)),
        (u._orientation = t.Quaternion.clone(p, u._orientation)),
        (u._drawNearPlane = m),
        u
      );
    }),
    (d.createGeometry = function (e) {
      var r = e._frustumType,
        n = e._frustum,
        s = e._origin,
        c = e._orientation,
        p = e._drawNearPlane,
        m = new Float64Array(24);
      i.FrustumGeometry._computeNearFarPlanes(s, c, r, n, m);
      for (
        var d,
          h,
          f = new o.GeometryAttributes({
            position: new u.GeometryAttribute({
              componentDatatype: a.ComponentDatatype.DOUBLE,
              componentsPerAttribute: 3,
              values: m,
            }),
          }),
          g = p ? 2 : 1,
          _ = new Uint16Array(8 * (g + 1)),
          k = p ? 0 : 1;
        k < 2;
        ++k
      )
        (h = 4 * k),
          (_[(d = p ? 8 * k : 0)] = h),
          (_[d + 1] = h + 1),
          (_[d + 2] = h + 1),
          (_[d + 3] = h + 2),
          (_[d + 4] = h + 2),
          (_[d + 5] = h + 3),
          (_[d + 6] = h + 3),
          (_[d + 7] = h);
      for (k = 0; k < 2; ++k)
        (h = 4 * k),
          (_[(d = 8 * (g + k))] = h),
          (_[d + 1] = h + 4),
          (_[d + 2] = h + 1),
          (_[d + 3] = h + 5),
          (_[d + 4] = h + 2),
          (_[d + 5] = h + 6),
          (_[d + 6] = h + 3),
          (_[d + 7] = h + 7);
      return new u.Geometry({
        attributes: f,
        indices: _,
        primitiveType: u.PrimitiveType.LINES,
        boundingSphere: t.BoundingSphere.fromVertices(m),
      });
    }),
    function (t, r) {
      return e.defined(r) && (t = d.unpack(t, r)), d.createGeometry(t);
    }
  );
});
