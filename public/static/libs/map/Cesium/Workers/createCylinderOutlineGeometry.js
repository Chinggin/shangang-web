define([
  './GeometryOffsetAttribute-ff1e192c',
  './Transforms-7cd3197b',
  './Matrix2-f2da41d4',
  './RuntimeError-ffe03243',
  './ComponentDatatype-17b06483',
  './CylinderGeometryLibrary-7b000e1b',
  './when-229515d6',
  './GeometryAttribute-80036e07',
  './GeometryAttributes-b253752a',
  './IndexDatatype-b10faa0b',
  './combine-8ce3f24b',
  './WebGLConstants-4e26b85a',
], function (t, e, i, r, a, n, o, u, s, f, d, b) {
  'use strict';
  var l = new i.Cartesian2();
  function m(t) {
    var e = (t = o.defaultValue(t, o.defaultValue.EMPTY_OBJECT)).length,
      i = t.topRadius,
      r = t.bottomRadius,
      a = o.defaultValue(t.slices, 128),
      n = Math.max(o.defaultValue(t.numberOfVerticalLines, 16), 0);
    (this._length = e),
      (this._topRadius = i),
      (this._bottomRadius = r),
      (this._slices = a),
      (this._numberOfVerticalLines = n),
      (this._offsetAttribute = t.offsetAttribute),
      (this._workerName = 'createCylinderOutlineGeometry');
  }
  (m.packedLength = 6),
    (m.pack = function (t, e, i) {
      return (
        (i = o.defaultValue(i, 0)),
        (e[i++] = t._length),
        (e[i++] = t._topRadius),
        (e[i++] = t._bottomRadius),
        (e[i++] = t._slices),
        (e[i++] = t._numberOfVerticalLines),
        (e[i] = o.defaultValue(t._offsetAttribute, -1)),
        e
      );
    });
  var c = {
    length: void 0,
    topRadius: void 0,
    bottomRadius: void 0,
    slices: void 0,
    numberOfVerticalLines: void 0,
    offsetAttribute: void 0,
  };
  return (
    (m.unpack = function (t, e, i) {
      e = o.defaultValue(e, 0);
      var r = t[e++],
        a = t[e++],
        n = t[e++],
        u = t[e++],
        s = t[e++],
        f = t[e];
      return o.defined(i)
        ? ((i._length = r),
          (i._topRadius = a),
          (i._bottomRadius = n),
          (i._slices = u),
          (i._numberOfVerticalLines = s),
          (i._offsetAttribute = -1 === f ? void 0 : f),
          i)
        : ((c.length = r),
          (c.topRadius = a),
          (c.bottomRadius = n),
          (c.slices = u),
          (c.numberOfVerticalLines = s),
          (c.offsetAttribute = -1 === f ? void 0 : f),
          new m(c));
    }),
    (m.createGeometry = function (r) {
      var d = r._length,
        b = r._topRadius,
        m = r._bottomRadius,
        c = r._slices,
        p = r._numberOfVerticalLines;
      if (!(d <= 0 || b < 0 || m < 0 || (0 === b && 0 === m))) {
        var y,
          _ = 2 * c,
          h = n.CylinderGeometryLibrary.computePositions(d, b, m, c, !1),
          v = 2 * c;
        if (p > 0) {
          var A = Math.min(p, c);
          (y = Math.round(c / A)), (v += A);
        }
        var R,
          G = f.IndexDatatype.createTypedArray(_, 2 * v),
          O = 0;
        for (R = 0; R < c - 1; R++)
          (G[O++] = R), (G[O++] = R + 1), (G[O++] = R + c), (G[O++] = R + 1 + c);
        if (((G[O++] = c - 1), (G[O++] = 0), (G[O++] = c + c - 1), (G[O++] = c), p > 0))
          for (R = 0; R < c; R += y) (G[O++] = R), (G[O++] = R + c);
        var V = new s.GeometryAttributes();
        (V.position = new u.GeometryAttribute({
          componentDatatype: a.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: h,
        })),
          (l.x = 0.5 * d),
          (l.y = Math.max(m, b));
        var L = new e.BoundingSphere(i.Cartesian3.ZERO, i.Cartesian2.magnitude(l));
        if (o.defined(r._offsetAttribute)) {
          d = h.length;
          var g = new Uint8Array(d / 3),
            C = r._offsetAttribute === t.GeometryOffsetAttribute.NONE ? 0 : 1;
          t.arrayFill(g, C),
            (V.applyOffset = new u.GeometryAttribute({
              componentDatatype: a.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 1,
              values: g,
            }));
        }
        return new u.Geometry({
          attributes: V,
          indices: G,
          primitiveType: u.PrimitiveType.LINES,
          boundingSphere: L,
          offsetAttribute: r._offsetAttribute,
        });
      }
    }),
    function (t, e) {
      return o.defined(e) && (t = m.unpack(t, e)), m.createGeometry(t);
    }
  );
});
