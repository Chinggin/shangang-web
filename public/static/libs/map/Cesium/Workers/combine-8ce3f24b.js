define(['exports', './when-229515d6'], function (e, n) {
  'use strict';
  e.combine = function e(r, t, o) {
    o = n.defaultValue(o, !1);
    var f,
      i,
      a,
      d = {},
      p = n.defined(r),
      s = n.defined(t);
    if (p)
      for (f in r)
        r.hasOwnProperty(f) &&
          ((i = r[f]),
          s && o && 'object' == typeof i && t.hasOwnProperty(f)
            ? ((a = t[f]), (d[f] = 'object' == typeof a ? e(i, a, o) : i))
            : (d[f] = i));
    if (s) for (f in t) t.hasOwnProperty(f) && !d.hasOwnProperty(f) && ((a = t[f]), (d[f] = a));
    return d;
  };
});
