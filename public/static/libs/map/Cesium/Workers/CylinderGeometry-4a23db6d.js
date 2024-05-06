define([
  'exports',
  './GeometryOffsetAttribute-ff1e192c',
  './Transforms-7cd3197b',
  './Matrix2-f2da41d4',
  './ComponentDatatype-17b06483',
  './CylinderGeometryLibrary-7b000e1b',
  './when-229515d6',
  './RuntimeError-ffe03243',
  './GeometryAttribute-80036e07',
  './GeometryAttributes-b253752a',
  './IndexDatatype-b10faa0b',
  './VertexFormat-565d6a6c',
], function (t, e, a, r, n, o, i, s, m, u, d, f) {
  'use strict';
  var p = new r.Cartesian2(),
    y = new r.Cartesian3(),
    l = new r.Cartesian3(),
    b = new r.Cartesian3(),
    c = new r.Cartesian3();
  function v(t) {
    var e = (t = i.defaultValue(t, i.defaultValue.EMPTY_OBJECT)).length,
      a = t.topRadius,
      r = t.bottomRadius,
      n = i.defaultValue(t.vertexFormat, f.VertexFormat.DEFAULT),
      o = i.defaultValue(t.slices, 128);
    (this._length = e),
      (this._topRadius = a),
      (this._bottomRadius = r),
      (this._vertexFormat = f.VertexFormat.clone(n)),
      (this._slices = o),
      (this._offsetAttribute = t.offsetAttribute),
      (this._workerName = 'createCylinderGeometry');
  }
  (v.packedLength = f.VertexFormat.packedLength + 5),
    (v.pack = function (t, e, a) {
      return (
        (a = i.defaultValue(a, 0)),
        f.VertexFormat.pack(t._vertexFormat, e, a),
        (a += f.VertexFormat.packedLength),
        (e[a++] = t._length),
        (e[a++] = t._topRadius),
        (e[a++] = t._bottomRadius),
        (e[a++] = t._slices),
        (e[a] = i.defaultValue(t._offsetAttribute, -1)),
        e
      );
    });
  var A,
    x = new f.VertexFormat(),
    g = {
      vertexFormat: x,
      length: void 0,
      topRadius: void 0,
      bottomRadius: void 0,
      slices: void 0,
      offsetAttribute: void 0,
    };
  (v.unpack = function (t, e, a) {
    e = i.defaultValue(e, 0);
    var r = f.VertexFormat.unpack(t, e, x);
    e += f.VertexFormat.packedLength;
    var n = t[e++],
      o = t[e++],
      s = t[e++],
      m = t[e++],
      u = t[e];
    return i.defined(a)
      ? ((a._vertexFormat = f.VertexFormat.clone(r, a._vertexFormat)),
        (a._length = n),
        (a._topRadius = o),
        (a._bottomRadius = s),
        (a._slices = m),
        (a._offsetAttribute = -1 === u ? void 0 : u),
        a)
      : ((g.length = n),
        (g.topRadius = o),
        (g.bottomRadius = s),
        (g.slices = m),
        (g.offsetAttribute = -1 === u ? void 0 : u),
        new v(g));
  }),
    (v.createGeometry = function (t) {
      var s = t._length,
        f = t._topRadius,
        v = t._bottomRadius,
        A = t._vertexFormat,
        x = t._slices;
      if (!(s <= 0 || f < 0 || v < 0 || (0 === f && 0 === v))) {
        var g,
          _ = x + x,
          h = x + _,
          F = _ + _,
          C = o.CylinderGeometryLibrary.computePositions(s, f, v, x, !0),
          w = A.st ? new Float32Array(2 * F) : void 0,
          G = A.normal ? new Float32Array(3 * F) : void 0,
          R = A.tangent ? new Float32Array(3 * F) : void 0,
          D = A.bitangent ? new Float32Array(3 * F) : void 0,
          V = A.normal || A.tangent || A.bitangent;
        if (V) {
          var T = A.tangent || A.bitangent,
            O = 0,
            L = 0,
            P = 0,
            E = Math.atan2(v - f, s),
            M = y;
          M.z = Math.sin(E);
          var k = Math.cos(E),
            z = b,
            N = l;
          for (g = 0; g < x; g++) {
            var I = (g / x) * n.CesiumMath.TWO_PI,
              U = k * Math.cos(I),
              S = k * Math.sin(I);
            V &&
              ((M.x = U),
              (M.y = S),
              T && (z = r.Cartesian3.normalize(r.Cartesian3.cross(r.Cartesian3.UNIT_Z, M, z), z)),
              A.normal &&
                ((G[O++] = M.x),
                (G[O++] = M.y),
                (G[O++] = M.z),
                (G[O++] = M.x),
                (G[O++] = M.y),
                (G[O++] = M.z)),
              A.tangent &&
                ((R[L++] = z.x),
                (R[L++] = z.y),
                (R[L++] = z.z),
                (R[L++] = z.x),
                (R[L++] = z.y),
                (R[L++] = z.z)),
              A.bitangent &&
                ((N = r.Cartesian3.normalize(r.Cartesian3.cross(M, z, N), N)),
                (D[P++] = N.x),
                (D[P++] = N.y),
                (D[P++] = N.z),
                (D[P++] = N.x),
                (D[P++] = N.y),
                (D[P++] = N.z)));
          }
          for (g = 0; g < x; g++)
            A.normal && ((G[O++] = 0), (G[O++] = 0), (G[O++] = -1)),
              A.tangent && ((R[L++] = 1), (R[L++] = 0), (R[L++] = 0)),
              A.bitangent && ((D[P++] = 0), (D[P++] = -1), (D[P++] = 0));
          for (g = 0; g < x; g++)
            A.normal && ((G[O++] = 0), (G[O++] = 0), (G[O++] = 1)),
              A.tangent && ((R[L++] = 1), (R[L++] = 0), (R[L++] = 0)),
              A.bitangent && ((D[P++] = 0), (D[P++] = 1), (D[P++] = 0));
        }
        var B = 12 * x - 12,
          Y = d.IndexDatatype.createTypedArray(F, B),
          Z = 0,
          J = 0;
        for (g = 0; g < x - 1; g++)
          (Y[Z++] = J),
            (Y[Z++] = J + 2),
            (Y[Z++] = J + 3),
            (Y[Z++] = J),
            (Y[Z++] = J + 3),
            (Y[Z++] = J + 1),
            (J += 2);
        for (
          Y[Z++] = _ - 2, Y[Z++] = 0, Y[Z++] = 1, Y[Z++] = _ - 2, Y[Z++] = 1, Y[Z++] = _ - 1, g = 1;
          g < x - 1;
          g++
        )
          (Y[Z++] = _ + g + 1), (Y[Z++] = _ + g), (Y[Z++] = _);
        for (g = 1; g < x - 1; g++) (Y[Z++] = h), (Y[Z++] = h + g), (Y[Z++] = h + g + 1);
        var W = 0;
        if (A.st) {
          var j = Math.max(f, v);
          for (g = 0; g < F; g++) {
            var q = r.Cartesian3.fromArray(C, 3 * g, c);
            (w[W++] = (q.x + j) / (2 * j)), (w[W++] = (q.y + j) / (2 * j));
          }
        }
        var H = new u.GeometryAttributes();
        A.position &&
          (H.position = new m.GeometryAttribute({
            componentDatatype: n.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            values: C,
          })),
          A.normal &&
            (H.normal = new m.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: G,
            })),
          A.tangent &&
            (H.tangent = new m.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: R,
            })),
          A.bitangent &&
            (H.bitangent = new m.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: D,
            })),
          A.st &&
            (H.st = new m.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.FLOAT,
              componentsPerAttribute: 2,
              values: w,
            })),
          (p.x = 0.5 * s),
          (p.y = Math.max(v, f));
        var K = new a.BoundingSphere(r.Cartesian3.ZERO, r.Cartesian2.magnitude(p));
        if (i.defined(t._offsetAttribute)) {
          s = C.length;
          var Q = new Uint8Array(s / 3),
            X = t._offsetAttribute === e.GeometryOffsetAttribute.NONE ? 0 : 1;
          e.arrayFill(Q, X),
            (H.applyOffset = new m.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 1,
              values: Q,
            }));
        }
        return new m.Geometry({
          attributes: H,
          indices: Y,
          primitiveType: m.PrimitiveType.TRIANGLES,
          boundingSphere: K,
          offsetAttribute: t._offsetAttribute,
        });
      }
    }),
    (v.getUnitCylinder = function () {
      return (
        i.defined(A) ||
          (A = v.createGeometry(
            new v({
              topRadius: 1,
              bottomRadius: 1,
              length: 1,
              vertexFormat: f.VertexFormat.POSITION_ONLY,
            })
          )),
        A
      );
    }),
    (t.CylinderGeometry = v);
});
