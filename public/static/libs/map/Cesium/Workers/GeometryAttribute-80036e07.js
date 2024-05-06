define([
  'exports',
  './Matrix2-f2da41d4',
  './RuntimeError-ffe03243',
  './when-229515d6',
  './WebGLConstants-4e26b85a',
  './Transforms-7cd3197b',
], function (t, e, a, r, n, i) {
  'use strict';
  var o = Object.freeze({ NONE: 0, TRIANGLES: 1, LINES: 2, POLYLINES: 3 }),
    s = {
      POINTS: n.WebGLConstants.POINTS,
      LINES: n.WebGLConstants.LINES,
      LINE_LOOP: n.WebGLConstants.LINE_LOOP,
      LINE_STRIP: n.WebGLConstants.LINE_STRIP,
      TRIANGLES: n.WebGLConstants.TRIANGLES,
      TRIANGLE_STRIP: n.WebGLConstants.TRIANGLE_STRIP,
      TRIANGLE_FAN: n.WebGLConstants.TRIANGLE_FAN,
      validate: function (t) {
        return (
          t === s.POINTS ||
          t === s.LINES ||
          t === s.LINE_LOOP ||
          t === s.LINE_STRIP ||
          t === s.TRIANGLES ||
          t === s.TRIANGLE_STRIP ||
          t === s.TRIANGLE_FAN
        );
      },
    },
    u = Object.freeze(s);
  function I(t) {
    (t = r.defaultValue(t, r.defaultValue.EMPTY_OBJECT)),
      (this.attributes = t.attributes),
      (this.indices = t.indices),
      (this.primitiveType = r.defaultValue(t.primitiveType, u.TRIANGLES)),
      (this.boundingSphere = t.boundingSphere),
      (this.geometryType = r.defaultValue(t.geometryType, o.NONE)),
      (this.boundingSphereCV = t.boundingSphereCV),
      (this.offsetAttribute = t.offsetAttribute);
  }
  I.computeNumberOfVertices = function (t) {
    var e = -1;
    for (var a in t.attributes)
      if (
        t.attributes.hasOwnProperty(a) &&
        r.defined(t.attributes[a]) &&
        r.defined(t.attributes[a].values)
      ) {
        var n = t.attributes[a];
        e = n.values.length / n.componentsPerAttribute;
      }
    return e;
  };
  var N = new e.Cartographic(),
    T = new e.Cartesian3(),
    l = new e.Matrix4(),
    f = [new e.Cartographic(), new e.Cartographic(), new e.Cartographic()],
    m = [new e.Cartesian2(), new e.Cartesian2(), new e.Cartesian2()],
    p = [new e.Cartesian2(), new e.Cartesian2(), new e.Cartesian2()],
    y = new e.Cartesian3(),
    E = new i.Quaternion(),
    b = new e.Matrix4(),
    c = new e.Matrix2();
  (I._textureCoordinateRotationPoints = function (t, a, r, n) {
    var o,
      s = e.Rectangle.center(n, N),
      u = e.Cartographic.toCartesian(s, r, T),
      I = i.Transforms.eastNorthUpToFixedFrame(u, r, l),
      L = e.Matrix4.inverse(I, l),
      h = m,
      C = f;
    (C[0].longitude = n.west),
      (C[0].latitude = n.south),
      (C[1].longitude = n.west),
      (C[1].latitude = n.north),
      (C[2].longitude = n.east),
      (C[2].latitude = n.south);
    var d = y;
    for (o = 0; o < 3; o++)
      e.Cartographic.toCartesian(C[o], r, d),
        (d = e.Matrix4.multiplyByPointAsVector(L, d, d)),
        (h[o].x = d.x),
        (h[o].y = d.y);
    var x = i.Quaternion.fromAxisAngle(e.Cartesian3.UNIT_Z, -a, E),
      A = e.Matrix3.fromQuaternion(x, b),
      P = t.length,
      S = Number.POSITIVE_INFINITY,
      G = Number.POSITIVE_INFINITY,
      v = Number.NEGATIVE_INFINITY,
      w = Number.NEGATIVE_INFINITY;
    for (o = 0; o < P; o++)
      (d = e.Matrix4.multiplyByPointAsVector(L, t[o], d)),
        (d = e.Matrix3.multiplyByVector(A, d, d)),
        (S = Math.min(S, d.x)),
        (G = Math.min(G, d.y)),
        (v = Math.max(v, d.x)),
        (w = Math.max(w, d.y));
    var R = e.Matrix2.fromRotation(a, c),
      O = p;
    (O[0].x = S), (O[0].y = G), (O[1].x = S), (O[1].y = w), (O[2].x = v), (O[2].y = G);
    var _ = h[0],
      g = h[2].x - _.x,
      V = h[1].y - _.y;
    for (o = 0; o < 3; o++) {
      var M = O[o];
      e.Matrix2.multiplyByVector(R, M, M), (M.x = (M.x - _.x) / g), (M.y = (M.y - _.y) / V);
    }
    var F = O[0],
      W = O[1],
      Y = O[2],
      B = new Array(6);
    return e.Cartesian2.pack(F, B), e.Cartesian2.pack(W, B, 2), e.Cartesian2.pack(Y, B, 4), B;
  }),
    (t.Geometry = I),
    (t.GeometryAttribute = function (t) {
      (t = r.defaultValue(t, r.defaultValue.EMPTY_OBJECT)),
        (this.componentDatatype = t.componentDatatype),
        (this.componentsPerAttribute = t.componentsPerAttribute),
        (this.normalize = r.defaultValue(t.normalize, !1)),
        (this.values = t.values);
    }),
    (t.GeometryType = o),
    (t.PrimitiveType = u);
});
