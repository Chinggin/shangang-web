define([
  'exports',
  './RuntimeError-ffe03243',
  './when-229515d6',
  './WebGLConstants-4e26b85a',
], function (t, n, r, e) {
  'use strict';
  var a = function (t) {
    null == t && (t = new Date().getTime()),
      (this.N = 624),
      (this.M = 397),
      (this.MATRIX_A = 2567483615),
      (this.UPPER_MASK = 2147483648),
      (this.LOWER_MASK = 2147483647),
      (this.mt = new Array(this.N)),
      (this.mti = this.N + 1),
      t.constructor == Array ? this.init_by_array(t, t.length) : this.init_seed(t);
  };
  (a.prototype.init_seed = function (t) {
    for (this.mt[0] = t >>> 0, this.mti = 1; this.mti < this.N; this.mti++) {
      t = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
      (this.mt[this.mti] =
        ((1812433253 * ((4294901760 & t) >>> 16)) << 16) + 1812433253 * (65535 & t) + this.mti),
        (this.mt[this.mti] >>>= 0);
    }
  }),
    (a.prototype.init_by_array = function (t, n) {
      var r, e, a;
      for (this.init_seed(19650218), r = 1, e = 0, a = this.N > n ? this.N : n; a; a--) {
        var i = this.mt[r - 1] ^ (this.mt[r - 1] >>> 30);
        (this.mt[r] =
          (this.mt[r] ^ (((1664525 * ((4294901760 & i) >>> 16)) << 16) + 1664525 * (65535 & i))) +
          t[e] +
          e),
          (this.mt[r] >>>= 0),
          e++,
          ++r >= this.N && ((this.mt[0] = this.mt[this.N - 1]), (r = 1)),
          e >= n && (e = 0);
      }
      for (a = this.N - 1; a; a--) {
        i = this.mt[r - 1] ^ (this.mt[r - 1] >>> 30);
        (this.mt[r] =
          (this.mt[r] ^
            (((1566083941 * ((4294901760 & i) >>> 16)) << 16) + 1566083941 * (65535 & i))) -
          r),
          (this.mt[r] >>>= 0),
          ++r >= this.N && ((this.mt[0] = this.mt[this.N - 1]), (r = 1));
      }
      this.mt[0] = 2147483648;
    }),
    (a.prototype.random_int = function () {
      var t,
        n = new Array(0, this.MATRIX_A);
      if (this.mti >= this.N) {
        var r;
        for (this.mti == this.N + 1 && this.init_seed(5489), r = 0; r < this.N - this.M; r++)
          (t = (this.mt[r] & this.UPPER_MASK) | (this.mt[r + 1] & this.LOWER_MASK)),
            (this.mt[r] = this.mt[r + this.M] ^ (t >>> 1) ^ n[1 & t]);
        for (; r < this.N - 1; r++)
          (t = (this.mt[r] & this.UPPER_MASK) | (this.mt[r + 1] & this.LOWER_MASK)),
            (this.mt[r] = this.mt[r + (this.M - this.N)] ^ (t >>> 1) ^ n[1 & t]);
        (t = (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK)),
          (this.mt[this.N - 1] = this.mt[this.M - 1] ^ (t >>> 1) ^ n[1 & t]),
          (this.mti = 0);
      }
      return (
        (t = this.mt[this.mti++]),
        (t ^= t >>> 11),
        (t ^= (t << 7) & 2636928640),
        (t ^= (t << 15) & 4022730752),
        (t ^= t >>> 18) >>> 0
      );
    }),
    (a.prototype.random_int31 = function () {
      return this.random_int() >>> 1;
    }),
    (a.prototype.random_incl = function () {
      return this.random_int() * (1 / 4294967295);
    }),
    (a.prototype.random = function () {
      return this.random_int() * (1 / 4294967296);
    }),
    (a.prototype.random_excl = function () {
      return (this.random_int() + 0.5) * (1 / 4294967296);
    }),
    (a.prototype.random_long = function () {
      return (
        (67108864 * (this.random_int() >>> 5) + (this.random_int() >>> 6)) * (1 / 9007199254740992)
      );
    });
  var i = a,
    s = {
      EPSILON1: 0.1,
      EPSILON2: 0.01,
      EPSILON3: 0.001,
      EPSILON4: 1e-4,
      EPSILON5: 1e-5,
      EPSILON6: 1e-6,
      EPSILON7: 1e-7,
      EPSILON8: 1e-8,
      EPSILON9: 1e-9,
      EPSILON10: 1e-10,
      EPSILON11: 1e-11,
      EPSILON12: 1e-12,
      EPSILON13: 1e-13,
      EPSILON14: 1e-14,
      EPSILON15: 1e-15,
      EPSILON16: 1e-16,
      EPSILON17: 1e-17,
      EPSILON18: 1e-18,
      EPSILON19: 1e-19,
      EPSILON20: 1e-20,
      EPSILON21: 1e-21,
      GRAVITATIONALPARAMETER: 3986004418e5,
      SOLAR_RADIUS: 6955e5,
      LUNAR_RADIUS: 1737400,
      SIXTY_FOUR_KILOBYTES: 65536,
      FOUR_GIGABYTES: 4294967296,
    };
  (s.sign = r.defaultValue(Math.sign, function (t) {
    return 0 === (t = +t) || t != t ? t : t > 0 ? 1 : -1;
  })),
    (s.signNotZero = function (t) {
      return t < 0 ? -1 : 1;
    }),
    (s.toSNorm = function (t, n) {
      return (n = r.defaultValue(n, 255)), Math.round((0.5 * s.clamp(t, -1, 1) + 0.5) * n);
    }),
    (s.fromSNorm = function (t, n) {
      return (n = r.defaultValue(n, 255)), (s.clamp(t, 0, n) / n) * 2 - 1;
    }),
    (s.normalize = function (t, n, r) {
      return 0 === (r = Math.max(r - n, 0)) ? 0 : s.clamp((t - n) / r, 0, 1);
    }),
    (s.sinh = r.defaultValue(Math.sinh, function (t) {
      return (Math.exp(t) - Math.exp(-t)) / 2;
    })),
    (s.cosh = r.defaultValue(Math.cosh, function (t) {
      return (Math.exp(t) + Math.exp(-t)) / 2;
    })),
    (s.lerp = function (t, n, r) {
      return (1 - r) * t + r * n;
    }),
    (s.PI = Math.PI),
    (s.ONE_OVER_PI = 1 / Math.PI),
    (s.PI_OVER_TWO = Math.PI / 2),
    (s.PI_OVER_THREE = Math.PI / 3),
    (s.PI_OVER_FOUR = Math.PI / 4),
    (s.PI_OVER_SIX = Math.PI / 6),
    (s.THREE_PI_OVER_TWO = (3 * Math.PI) / 2),
    (s.TWO_PI = 2 * Math.PI),
    (s.ONE_OVER_TWO_PI = 1 / (2 * Math.PI)),
    (s.RADIANS_PER_DEGREE = Math.PI / 180),
    (s.DEGREES_PER_RADIAN = 180 / Math.PI),
    (s.RADIANS_PER_ARCSECOND = s.RADIANS_PER_DEGREE / 3600),
    (s.toRadians = function (t) {
      return t * s.RADIANS_PER_DEGREE;
    }),
    (s.toDegrees = function (t) {
      return t * s.DEGREES_PER_RADIAN;
    }),
    (s.convertLongitudeRange = function (t) {
      var n = s.TWO_PI,
        r = t - Math.floor(t / n) * n;
      return r < -Math.PI ? r + n : r >= Math.PI ? r - n : r;
    }),
    (s.clampToLatitudeRange = function (t) {
      return s.clamp(t, -1 * s.PI_OVER_TWO, s.PI_OVER_TWO);
    }),
    (s.negativePiToPi = function (t) {
      return t >= -s.PI && t <= s.PI ? t : s.zeroToTwoPi(t + s.PI) - s.PI;
    }),
    (s.zeroToTwoPi = function (t) {
      if (t >= 0 && t <= s.TWO_PI) return t;
      var n = s.mod(t, s.TWO_PI);
      return Math.abs(n) < s.EPSILON14 && Math.abs(t) > s.EPSILON14 ? s.TWO_PI : n;
    }),
    (s.mod = function (t, n) {
      return s.sign(t) === s.sign(n) && Math.abs(t) < Math.abs(n) ? t : ((t % n) + n) % n;
    }),
    (s.equalsEpsilon = function (t, n, e, a) {
      (e = r.defaultValue(e, 0)), (a = r.defaultValue(a, e));
      var i = Math.abs(t - n);
      return i <= a || i <= e * Math.max(Math.abs(t), Math.abs(n));
    }),
    (s.lessThan = function (t, n, r) {
      return t - n < -r;
    }),
    (s.lessThanOrEquals = function (t, n, r) {
      return t - n < r;
    }),
    (s.greaterThan = function (t, n, r) {
      return t - n > r;
    }),
    (s.greaterThanOrEquals = function (t, n, r) {
      return t - n > -r;
    });
  var o = [1];
  (s.factorial = function (t) {
    var n = o.length;
    if (t >= n)
      for (var r = o[n - 1], e = n; e <= t; e++) {
        var a = r * e;
        o.push(a), (r = a);
      }
    return o[t];
  }),
    (s.incrementWrap = function (t, n, e) {
      return (e = r.defaultValue(e, 0)), ++t > n && (t = e), t;
    }),
    (s.isPowerOfTwo = function (t) {
      return 0 !== t && 0 == (t & (t - 1));
    }),
    (s.nextPowerOfTwo = function (t) {
      return --t, (t |= t >> 1), (t |= t >> 2), (t |= t >> 4), (t |= t >> 8), (t |= t >> 16), ++t;
    }),
    (s.previousPowerOfTwo = function (t) {
      return (
        (t |= t >> 1),
        (t |= t >> 2),
        (t |= t >> 4),
        (t |= t >> 8),
        (t |= t >> 16),
        (t = ((t |= t >> 32) >>> 0) - (t >>> 1))
      );
    }),
    (s.clamp = function (t, n, r) {
      return t < n ? n : t > r ? r : t;
    });
  var u = new i();
  (s.setRandomNumberSeed = function (t) {
    u = new i(t);
  }),
    (s.nextRandomNumber = function () {
      return u.random();
    }),
    (s.randomBetween = function (t, n) {
      return s.nextRandomNumber() * (n - t) + t;
    }),
    (s.acosClamped = function (t) {
      return Math.acos(s.clamp(t, -1, 1));
    }),
    (s.asinClamped = function (t) {
      return Math.asin(s.clamp(t, -1, 1));
    }),
    (s.chordLength = function (t, n) {
      return 2 * n * Math.sin(0.5 * t);
    }),
    (s.logBase = function (t, n) {
      return Math.log(t) / Math.log(n);
    }),
    (s.cbrt = r.defaultValue(Math.cbrt, function (t) {
      var n = Math.pow(Math.abs(t), 1 / 3);
      return t < 0 ? -n : n;
    })),
    (s.log2 = r.defaultValue(Math.log2, function (t) {
      return Math.log(t) * Math.LOG2E;
    })),
    (s.fog = function (t, n) {
      var r = t * n;
      return 1 - Math.exp(-r * r);
    }),
    (s.fastApproximateAtan = function (t) {
      return t * (-0.1784 * Math.abs(t) - 0.0663 * t * t + 1.0301);
    }),
    (s.fastApproximateAtan2 = function (t, n) {
      var r,
        e,
        a = Math.abs(t);
      (r = Math.abs(n)), (e = Math.max(a, r));
      var i = (r = Math.min(a, r)) / e;
      return (
        (a = s.fastApproximateAtan(i)),
        (a = Math.abs(n) > Math.abs(t) ? s.PI_OVER_TWO - a : a),
        (a = t < 0 ? s.PI - a : a),
        (a = n < 0 ? -a : a)
      );
    });
  var E = {
      BYTE: e.WebGLConstants.BYTE,
      UNSIGNED_BYTE: e.WebGLConstants.UNSIGNED_BYTE,
      SHORT: e.WebGLConstants.SHORT,
      UNSIGNED_SHORT: e.WebGLConstants.UNSIGNED_SHORT,
      INT: e.WebGLConstants.INT,
      UNSIGNED_INT: e.WebGLConstants.UNSIGNED_INT,
      FLOAT: e.WebGLConstants.FLOAT,
      DOUBLE: e.WebGLConstants.DOUBLE,
      getSizeInBytes: function (t) {
        switch (t) {
          case E.BYTE:
            return Int8Array.BYTES_PER_ELEMENT;
          case E.UNSIGNED_BYTE:
            return Uint8Array.BYTES_PER_ELEMENT;
          case E.SHORT:
            return Int16Array.BYTES_PER_ELEMENT;
          case E.UNSIGNED_SHORT:
            return Uint16Array.BYTES_PER_ELEMENT;
          case E.INT:
            return Int32Array.BYTES_PER_ELEMENT;
          case E.UNSIGNED_INT:
            return Uint32Array.BYTES_PER_ELEMENT;
          case E.FLOAT:
            return Float32Array.BYTES_PER_ELEMENT;
          case E.DOUBLE:
            return Float64Array.BYTES_PER_ELEMENT;
        }
      },
      fromTypedArray: function (t) {
        return t instanceof Int8Array
          ? E.BYTE
          : t instanceof Uint8Array
          ? E.UNSIGNED_BYTE
          : t instanceof Int16Array
          ? E.SHORT
          : t instanceof Uint16Array
          ? E.UNSIGNED_SHORT
          : t instanceof Int32Array
          ? E.INT
          : t instanceof Uint32Array
          ? E.UNSIGNED_INT
          : t instanceof Float32Array
          ? E.FLOAT
          : t instanceof Float64Array
          ? E.DOUBLE
          : void 0;
      },
      validate: function (t) {
        return (
          r.defined(t) &&
          (t === E.BYTE ||
            t === E.UNSIGNED_BYTE ||
            t === E.SHORT ||
            t === E.UNSIGNED_SHORT ||
            t === E.INT ||
            t === E.UNSIGNED_INT ||
            t === E.FLOAT ||
            t === E.DOUBLE)
        );
      },
      createTypedArray: function (t, n) {
        switch (t) {
          case E.BYTE:
            return new Int8Array(n);
          case E.UNSIGNED_BYTE:
            return new Uint8Array(n);
          case E.SHORT:
            return new Int16Array(n);
          case E.UNSIGNED_SHORT:
            return new Uint16Array(n);
          case E.INT:
            return new Int32Array(n);
          case E.UNSIGNED_INT:
            return new Uint32Array(n);
          case E.FLOAT:
            return new Float32Array(n);
          case E.DOUBLE:
            return new Float64Array(n);
        }
      },
      createArrayBufferView: function (t, n, e, a) {
        switch (
          ((e = r.defaultValue(e, 0)),
          (a = r.defaultValue(a, (n.byteLength - e) / E.getSizeInBytes(t))),
          t)
        ) {
          case E.BYTE:
            return new Int8Array(n, e, a);
          case E.UNSIGNED_BYTE:
            return new Uint8Array(n, e, a);
          case E.SHORT:
            return new Int16Array(n, e, a);
          case E.UNSIGNED_SHORT:
            return new Uint16Array(n, e, a);
          case E.INT:
            return new Int32Array(n, e, a);
          case E.UNSIGNED_INT:
            return new Uint32Array(n, e, a);
          case E.FLOAT:
            return new Float32Array(n, e, a);
          case E.DOUBLE:
            return new Float64Array(n, e, a);
        }
      },
      fromName: function (t) {
        switch (t) {
          case 'BYTE':
            return E.BYTE;
          case 'UNSIGNED_BYTE':
            return E.UNSIGNED_BYTE;
          case 'SHORT':
            return E.SHORT;
          case 'UNSIGNED_SHORT':
            return E.UNSIGNED_SHORT;
          case 'INT':
            return E.INT;
          case 'UNSIGNED_INT':
            return E.UNSIGNED_INT;
          case 'FLOAT':
            return E.FLOAT;
          case 'DOUBLE':
            return E.DOUBLE;
        }
      },
    },
    h = Object.freeze(E);
  (t.CesiumMath = s), (t.ComponentDatatype = h);
});
