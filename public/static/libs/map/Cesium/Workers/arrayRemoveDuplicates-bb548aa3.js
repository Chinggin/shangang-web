define([
  'exports',
  './RuntimeError-ffe03243',
  './when-229515d6',
  './ComponentDatatype-17b06483',
], function (e, n, i, d) {
  'use strict';
  var t = d.CesiumMath.EPSILON10;
  e.arrayRemoveDuplicates = function (e, n, d, f) {
    if (i.defined(e)) {
      d = i.defaultValue(d, !1);
      var r,
        u = i.defined(f),
        a = e.length;
      if (a < 2) return e;
      var s,
        l,
        h = e[0],
        o = 0,
        p = -1;
      for (r = 1; r < a; ++r)
        n(h, (s = e[r]), t)
          ? (i.defined(l) || ((l = e.slice(0, r)), (o = r - 1), (p = 0)), u && f.push(r))
          : (i.defined(l) && (l.push(s), (o = r), u && (p = f.length)), (h = s));
      return (
        d &&
          n(e[0], e[a - 1], t) &&
          (u && (i.defined(l) ? f.splice(p, 0, o) : f.push(a - 1)),
          i.defined(l) ? (l.length -= 1) : (l = e.slice(0, -1))),
        i.defined(l) ? l : e
      );
    }
  };
});
