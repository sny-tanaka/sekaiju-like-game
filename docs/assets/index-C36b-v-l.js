var Iv = Object.defineProperty;
var Pv = (u, c, f) =>
  c in u ? Iv(u, c, { enumerable: !0, configurable: !0, writable: !0, value: f }) : (u[c] = f);
var mf = (u, c, f) => Pv(u, typeof c != 'symbol' ? c + '' : c, f);
(function () {
  const c = document.createElement('link').relList;
  if (c && c.supports && c.supports('modulepreload')) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
  new MutationObserver((r) => {
    for (const m of r)
      if (m.type === 'childList')
        for (const v of m.addedNodes) v.tagName === 'LINK' && v.rel === 'modulepreload' && s(v);
  }).observe(document, { childList: !0, subtree: !0 });
  function f(r) {
    const m = {};
    return (
      r.integrity && (m.integrity = r.integrity),
      r.referrerPolicy && (m.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === 'use-credentials'
        ? (m.credentials = 'include')
        : r.crossOrigin === 'anonymous'
          ? (m.credentials = 'omit')
          : (m.credentials = 'same-origin'),
      m
    );
  }
  function s(r) {
    if (r.ep) return;
    r.ep = !0;
    const m = f(r);
    fetch(r.href, m);
  }
})();
var hf = { exports: {} },
  lu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ih;
function t0() {
  if (ih) return lu;
  ih = 1;
  var u = Symbol.for('react.transitional.element'),
    c = Symbol.for('react.fragment');
  function f(s, r, m) {
    var v = null;
    if ((m !== void 0 && (v = '' + m), r.key !== void 0 && (v = '' + r.key), 'key' in r)) {
      m = {};
      for (var p in r) p !== 'key' && (m[p] = r[p]);
    } else m = r;
    return ((r = m.ref), { $$typeof: u, type: s, key: v, ref: r !== void 0 ? r : null, props: m });
  }
  return ((lu.Fragment = c), (lu.jsx = f), (lu.jsxs = f), lu);
}
var ch;
function e0() {
  return (ch || ((ch = 1), (hf.exports = t0())), hf.exports);
}
var E = e0(),
  yf = { exports: {} },
  au = {},
  pf = { exports: {} },
  vf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var sh;
function l0() {
  return (
    sh ||
      ((sh = 1),
      (function (u) {
        function c(w, R) {
          var V = w.length;
          w.push(R);
          t: for (; 0 < V; ) {
            var it = (V - 1) >>> 1,
              yt = w[it];
            if (0 < r(yt, R)) ((w[it] = R), (w[V] = yt), (V = it));
            else break t;
          }
        }
        function f(w) {
          return w.length === 0 ? null : w[0];
        }
        function s(w) {
          if (w.length === 0) return null;
          var R = w[0],
            V = w.pop();
          if (V !== R) {
            w[0] = V;
            t: for (var it = 0, yt = w.length, b = yt >>> 1; it < b; ) {
              var H = 2 * (it + 1) - 1,
                Z = w[H],
                W = H + 1,
                nt = w[W];
              if (0 > r(Z, V))
                W < yt && 0 > r(nt, Z)
                  ? ((w[it] = nt), (w[W] = V), (it = W))
                  : ((w[it] = Z), (w[H] = V), (it = H));
              else if (W < yt && 0 > r(nt, V)) ((w[it] = nt), (w[W] = V), (it = W));
              else break t;
            }
          }
          return R;
        }
        function r(w, R) {
          var V = w.sortIndex - R.sortIndex;
          return V !== 0 ? V : w.id - R.id;
        }
        if (
          ((u.unstable_now = void 0),
          typeof performance == 'object' && typeof performance.now == 'function')
        ) {
          var m = performance;
          u.unstable_now = function () {
            return m.now();
          };
        } else {
          var v = Date,
            p = v.now();
          u.unstable_now = function () {
            return v.now() - p;
          };
        }
        var h = [],
          y = [],
          T = 1,
          _ = null,
          M = 3,
          G = !1,
          Y = !1,
          B = !1,
          j = !1,
          O = typeof setTimeout == 'function' ? setTimeout : null,
          X = typeof clearTimeout == 'function' ? clearTimeout : null,
          q = typeof setImmediate < 'u' ? setImmediate : null;
        function Q(w) {
          for (var R = f(y); R !== null; ) {
            if (R.callback === null) s(y);
            else if (R.startTime <= w) (s(y), (R.sortIndex = R.expirationTime), c(h, R));
            else break;
            R = f(y);
          }
        }
        function I(w) {
          if (((B = !1), Q(w), !Y))
            if (f(h) !== null) ((Y = !0), J || ((J = !0), Vt()));
            else {
              var R = f(y);
              R !== null && jt(I, R.startTime - w);
            }
        }
        var J = !1,
          K = -1,
          lt = 5,
          ht = -1;
        function _t() {
          return j ? !0 : !(u.unstable_now() - ht < lt);
        }
        function Ot() {
          if (((j = !1), J)) {
            var w = u.unstable_now();
            ht = w;
            var R = !0;
            try {
              t: {
                ((Y = !1), B && ((B = !1), X(K), (K = -1)), (G = !0));
                var V = M;
                try {
                  e: {
                    for (Q(w), _ = f(h); _ !== null && !(_.expirationTime > w && _t()); ) {
                      var it = _.callback;
                      if (typeof it == 'function') {
                        ((_.callback = null), (M = _.priorityLevel));
                        var yt = it(_.expirationTime <= w);
                        if (((w = u.unstable_now()), typeof yt == 'function')) {
                          ((_.callback = yt), Q(w), (R = !0));
                          break e;
                        }
                        (_ === f(h) && s(h), Q(w));
                      } else s(h);
                      _ = f(h);
                    }
                    if (_ !== null) R = !0;
                    else {
                      var b = f(y);
                      (b !== null && jt(I, b.startTime - w), (R = !1));
                    }
                  }
                  break t;
                } finally {
                  ((_ = null), (M = V), (G = !1));
                }
                R = void 0;
              }
            } finally {
              R ? Vt() : (J = !1);
            }
          }
        }
        var Vt;
        if (typeof q == 'function')
          Vt = function () {
            q(Ot);
          };
        else if (typeof MessageChannel < 'u') {
          var de = new MessageChannel(),
            ne = de.port2;
          ((de.port1.onmessage = Ot),
            (Vt = function () {
              ne.postMessage(null);
            }));
        } else
          Vt = function () {
            O(Ot, 0);
          };
        function jt(w, R) {
          K = O(function () {
            w(u.unstable_now());
          }, R);
        }
        ((u.unstable_IdlePriority = 5),
          (u.unstable_ImmediatePriority = 1),
          (u.unstable_LowPriority = 4),
          (u.unstable_NormalPriority = 3),
          (u.unstable_Profiling = null),
          (u.unstable_UserBlockingPriority = 2),
          (u.unstable_cancelCallback = function (w) {
            w.callback = null;
          }),
          (u.unstable_forceFrameRate = function (w) {
            0 > w || 125 < w
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (lt = 0 < w ? Math.floor(1e3 / w) : 5);
          }),
          (u.unstable_getCurrentPriorityLevel = function () {
            return M;
          }),
          (u.unstable_next = function (w) {
            switch (M) {
              case 1:
              case 2:
              case 3:
                var R = 3;
                break;
              default:
                R = M;
            }
            var V = M;
            M = R;
            try {
              return w();
            } finally {
              M = V;
            }
          }),
          (u.unstable_requestPaint = function () {
            j = !0;
          }),
          (u.unstable_runWithPriority = function (w, R) {
            switch (w) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                w = 3;
            }
            var V = M;
            M = w;
            try {
              return R();
            } finally {
              M = V;
            }
          }),
          (u.unstable_scheduleCallback = function (w, R, V) {
            var it = u.unstable_now();
            switch (
              (typeof V == 'object' && V !== null
                ? ((V = V.delay), (V = typeof V == 'number' && 0 < V ? it + V : it))
                : (V = it),
              w)
            ) {
              case 1:
                var yt = -1;
                break;
              case 2:
                yt = 250;
                break;
              case 5:
                yt = 1073741823;
                break;
              case 4:
                yt = 1e4;
                break;
              default:
                yt = 5e3;
            }
            return (
              (yt = V + yt),
              (w = {
                id: T++,
                callback: R,
                priorityLevel: w,
                startTime: V,
                expirationTime: yt,
                sortIndex: -1,
              }),
              V > it
                ? ((w.sortIndex = V),
                  c(y, w),
                  f(h) === null && w === f(y) && (B ? (X(K), (K = -1)) : (B = !0), jt(I, V - it)))
                : ((w.sortIndex = yt), c(h, w), Y || G || ((Y = !0), J || ((J = !0), Vt()))),
              w
            );
          }),
          (u.unstable_shouldYield = _t),
          (u.unstable_wrapCallback = function (w) {
            var R = M;
            return function () {
              var V = M;
              M = R;
              try {
                return w.apply(this, arguments);
              } finally {
                M = V;
              }
            };
          }));
      })(vf)),
    vf
  );
}
var fh;
function a0() {
  return (fh || ((fh = 1), (pf.exports = l0())), pf.exports);
}
var gf = { exports: {} },
  at = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var oh;
function n0() {
  if (oh) return at;
  oh = 1;
  var u = Symbol.for('react.transitional.element'),
    c = Symbol.for('react.portal'),
    f = Symbol.for('react.fragment'),
    s = Symbol.for('react.strict_mode'),
    r = Symbol.for('react.profiler'),
    m = Symbol.for('react.consumer'),
    v = Symbol.for('react.context'),
    p = Symbol.for('react.forward_ref'),
    h = Symbol.for('react.suspense'),
    y = Symbol.for('react.memo'),
    T = Symbol.for('react.lazy'),
    _ = Symbol.for('react.activity'),
    M = Symbol.iterator;
  function G(b) {
    return b === null || typeof b != 'object'
      ? null
      : ((b = (M && b[M]) || b['@@iterator']), typeof b == 'function' ? b : null);
  }
  var Y = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    B = Object.assign,
    j = {};
  function O(b, H, Z) {
    ((this.props = b), (this.context = H), (this.refs = j), (this.updater = Z || Y));
  }
  ((O.prototype.isReactComponent = {}),
    (O.prototype.setState = function (b, H) {
      if (typeof b != 'object' && typeof b != 'function' && b != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, b, H, 'setState');
    }),
    (O.prototype.forceUpdate = function (b) {
      this.updater.enqueueForceUpdate(this, b, 'forceUpdate');
    }));
  function X() {}
  X.prototype = O.prototype;
  function q(b, H, Z) {
    ((this.props = b), (this.context = H), (this.refs = j), (this.updater = Z || Y));
  }
  var Q = (q.prototype = new X());
  ((Q.constructor = q), B(Q, O.prototype), (Q.isPureReactComponent = !0));
  var I = Array.isArray;
  function J() {}
  var K = { H: null, A: null, T: null, S: null },
    lt = Object.prototype.hasOwnProperty;
  function ht(b, H, Z) {
    var W = Z.ref;
    return { $$typeof: u, type: b, key: H, ref: W !== void 0 ? W : null, props: Z };
  }
  function _t(b, H) {
    return ht(b.type, H, b.props);
  }
  function Ot(b) {
    return typeof b == 'object' && b !== null && b.$$typeof === u;
  }
  function Vt(b) {
    var H = { '=': '=0', ':': '=2' };
    return (
      '$' +
      b.replace(/[=:]/g, function (Z) {
        return H[Z];
      })
    );
  }
  var de = /\/+/g;
  function ne(b, H) {
    return typeof b == 'object' && b !== null && b.key != null ? Vt('' + b.key) : H.toString(36);
  }
  function jt(b) {
    switch (b.status) {
      case 'fulfilled':
        return b.value;
      case 'rejected':
        throw b.reason;
      default:
        switch (
          (typeof b.status == 'string'
            ? b.then(J, J)
            : ((b.status = 'pending'),
              b.then(
                function (H) {
                  b.status === 'pending' && ((b.status = 'fulfilled'), (b.value = H));
                },
                function (H) {
                  b.status === 'pending' && ((b.status = 'rejected'), (b.reason = H));
                }
              )),
          b.status)
        ) {
          case 'fulfilled':
            return b.value;
          case 'rejected':
            throw b.reason;
        }
    }
    throw b;
  }
  function w(b, H, Z, W, nt) {
    var st = typeof b;
    (st === 'undefined' || st === 'boolean') && (b = null);
    var bt = !1;
    if (b === null) bt = !0;
    else
      switch (st) {
        case 'bigint':
        case 'string':
        case 'number':
          bt = !0;
          break;
        case 'object':
          switch (b.$$typeof) {
            case u:
            case c:
              bt = !0;
              break;
            case T:
              return ((bt = b._init), w(bt(b._payload), H, Z, W, nt));
          }
      }
    if (bt)
      return (
        (nt = nt(b)),
        (bt = W === '' ? '.' + ne(b, 0) : W),
        I(nt)
          ? ((Z = ''),
            bt != null && (Z = bt.replace(de, '$&/') + '/'),
            w(nt, H, Z, '', function (fn) {
              return fn;
            }))
          : nt != null &&
            (Ot(nt) &&
              (nt = _t(
                nt,
                Z +
                  (nt.key == null || (b && b.key === nt.key)
                    ? ''
                    : ('' + nt.key).replace(de, '$&/') + '/') +
                  bt
              )),
            H.push(nt)),
        1
      );
    bt = 0;
    var le = W === '' ? '.' : W + ':';
    if (I(b))
      for (var kt = 0; kt < b.length; kt++)
        ((W = b[kt]), (st = le + ne(W, kt)), (bt += w(W, H, Z, st, nt)));
    else if (((kt = G(b)), typeof kt == 'function'))
      for (b = kt.call(b), kt = 0; !(W = b.next()).done; )
        ((W = W.value), (st = le + ne(W, kt++)), (bt += w(W, H, Z, st, nt)));
    else if (st === 'object') {
      if (typeof b.then == 'function') return w(jt(b), H, Z, W, nt);
      throw (
        (H = String(b)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (H === '[object Object]' ? 'object with keys {' + Object.keys(b).join(', ') + '}' : H) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return bt;
  }
  function R(b, H, Z) {
    if (b == null) return b;
    var W = [],
      nt = 0;
    return (
      w(b, W, '', '', function (st) {
        return H.call(Z, st, nt++);
      }),
      W
    );
  }
  function V(b) {
    if (b._status === -1) {
      var H = b._result;
      ((H = H()),
        H.then(
          function (Z) {
            (b._status === 0 || b._status === -1) && ((b._status = 1), (b._result = Z));
          },
          function (Z) {
            (b._status === 0 || b._status === -1) && ((b._status = 2), (b._result = Z));
          }
        ),
        b._status === -1 && ((b._status = 0), (b._result = H)));
    }
    if (b._status === 1) return b._result.default;
    throw b._result;
  }
  var it =
      typeof reportError == 'function'
        ? reportError
        : function (b) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var H = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof b == 'object' && b !== null && typeof b.message == 'string'
                    ? String(b.message)
                    : String(b),
                error: b,
              });
              if (!window.dispatchEvent(H)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', b);
              return;
            }
            console.error(b);
          },
    yt = {
      map: R,
      forEach: function (b, H, Z) {
        R(
          b,
          function () {
            H.apply(this, arguments);
          },
          Z
        );
      },
      count: function (b) {
        var H = 0;
        return (
          R(b, function () {
            H++;
          }),
          H
        );
      },
      toArray: function (b) {
        return (
          R(b, function (H) {
            return H;
          }) || []
        );
      },
      only: function (b) {
        if (!Ot(b))
          throw Error('React.Children.only expected to receive a single React element child.');
        return b;
      },
    };
  return (
    (at.Activity = _),
    (at.Children = yt),
    (at.Component = O),
    (at.Fragment = f),
    (at.Profiler = r),
    (at.PureComponent = q),
    (at.StrictMode = s),
    (at.Suspense = h),
    (at.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = K),
    (at.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (b) {
        return K.H.useMemoCache(b);
      },
    }),
    (at.cache = function (b) {
      return function () {
        return b.apply(null, arguments);
      };
    }),
    (at.cacheSignal = function () {
      return null;
    }),
    (at.cloneElement = function (b, H, Z) {
      if (b == null) throw Error('The argument must be a React element, but you passed ' + b + '.');
      var W = B({}, b.props),
        nt = b.key;
      if (H != null)
        for (st in (H.key !== void 0 && (nt = '' + H.key), H))
          !lt.call(H, st) ||
            st === 'key' ||
            st === '__self' ||
            st === '__source' ||
            (st === 'ref' && H.ref === void 0) ||
            (W[st] = H[st]);
      var st = arguments.length - 2;
      if (st === 1) W.children = Z;
      else if (1 < st) {
        for (var bt = Array(st), le = 0; le < st; le++) bt[le] = arguments[le + 2];
        W.children = bt;
      }
      return ht(b.type, nt, W);
    }),
    (at.createContext = function (b) {
      return (
        (b = {
          $$typeof: v,
          _currentValue: b,
          _currentValue2: b,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (b.Provider = b),
        (b.Consumer = { $$typeof: m, _context: b }),
        b
      );
    }),
    (at.createElement = function (b, H, Z) {
      var W,
        nt = {},
        st = null;
      if (H != null)
        for (W in (H.key !== void 0 && (st = '' + H.key), H))
          lt.call(H, W) && W !== 'key' && W !== '__self' && W !== '__source' && (nt[W] = H[W]);
      var bt = arguments.length - 2;
      if (bt === 1) nt.children = Z;
      else if (1 < bt) {
        for (var le = Array(bt), kt = 0; kt < bt; kt++) le[kt] = arguments[kt + 2];
        nt.children = le;
      }
      if (b && b.defaultProps)
        for (W in ((bt = b.defaultProps), bt)) nt[W] === void 0 && (nt[W] = bt[W]);
      return ht(b, st, nt);
    }),
    (at.createRef = function () {
      return { current: null };
    }),
    (at.forwardRef = function (b) {
      return { $$typeof: p, render: b };
    }),
    (at.isValidElement = Ot),
    (at.lazy = function (b) {
      return { $$typeof: T, _payload: { _status: -1, _result: b }, _init: V };
    }),
    (at.memo = function (b, H) {
      return { $$typeof: y, type: b, compare: H === void 0 ? null : H };
    }),
    (at.startTransition = function (b) {
      var H = K.T,
        Z = {};
      K.T = Z;
      try {
        var W = b(),
          nt = K.S;
        (nt !== null && nt(Z, W),
          typeof W == 'object' && W !== null && typeof W.then == 'function' && W.then(J, it));
      } catch (st) {
        it(st);
      } finally {
        (H !== null && Z.types !== null && (H.types = Z.types), (K.T = H));
      }
    }),
    (at.unstable_useCacheRefresh = function () {
      return K.H.useCacheRefresh();
    }),
    (at.use = function (b) {
      return K.H.use(b);
    }),
    (at.useActionState = function (b, H, Z) {
      return K.H.useActionState(b, H, Z);
    }),
    (at.useCallback = function (b, H) {
      return K.H.useCallback(b, H);
    }),
    (at.useContext = function (b) {
      return K.H.useContext(b);
    }),
    (at.useDebugValue = function () {}),
    (at.useDeferredValue = function (b, H) {
      return K.H.useDeferredValue(b, H);
    }),
    (at.useEffect = function (b, H) {
      return K.H.useEffect(b, H);
    }),
    (at.useEffectEvent = function (b) {
      return K.H.useEffectEvent(b);
    }),
    (at.useId = function () {
      return K.H.useId();
    }),
    (at.useImperativeHandle = function (b, H, Z) {
      return K.H.useImperativeHandle(b, H, Z);
    }),
    (at.useInsertionEffect = function (b, H) {
      return K.H.useInsertionEffect(b, H);
    }),
    (at.useLayoutEffect = function (b, H) {
      return K.H.useLayoutEffect(b, H);
    }),
    (at.useMemo = function (b, H) {
      return K.H.useMemo(b, H);
    }),
    (at.useOptimistic = function (b, H) {
      return K.H.useOptimistic(b, H);
    }),
    (at.useReducer = function (b, H, Z) {
      return K.H.useReducer(b, H, Z);
    }),
    (at.useRef = function (b) {
      return K.H.useRef(b);
    }),
    (at.useState = function (b) {
      return K.H.useState(b);
    }),
    (at.useSyncExternalStore = function (b, H, Z) {
      return K.H.useSyncExternalStore(b, H, Z);
    }),
    (at.useTransition = function () {
      return K.H.useTransition();
    }),
    (at.version = '19.2.5'),
    at
  );
}
var rh;
function Gf() {
  return (rh || ((rh = 1), (gf.exports = n0())), gf.exports);
}
var _f = { exports: {} },
  ee = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var dh;
function u0() {
  if (dh) return ee;
  dh = 1;
  var u = Gf();
  function c(h) {
    var y = 'https://react.dev/errors/' + h;
    if (1 < arguments.length) {
      y += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var T = 2; T < arguments.length; T++) y += '&args[]=' + encodeURIComponent(arguments[T]);
    }
    return (
      'Minified React error #' +
      h +
      '; visit ' +
      y +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function f() {}
  var s = {
      d: {
        f,
        r: function () {
          throw Error(c(522));
        },
        D: f,
        C: f,
        L: f,
        m: f,
        X: f,
        S: f,
        M: f,
      },
      p: 0,
      findDOMNode: null,
    },
    r = Symbol.for('react.portal');
  function m(h, y, T) {
    var _ = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: _ == null ? null : '' + _,
      children: h,
      containerInfo: y,
      implementation: T,
    };
  }
  var v = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(h, y) {
    if (h === 'font') return '';
    if (typeof y == 'string') return y === 'use-credentials' ? y : '';
  }
  return (
    (ee.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s),
    (ee.createPortal = function (h, y) {
      var T = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!y || (y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)) throw Error(c(299));
      return m(h, y, null, T);
    }),
    (ee.flushSync = function (h) {
      var y = v.T,
        T = s.p;
      try {
        if (((v.T = null), (s.p = 2), h)) return h();
      } finally {
        ((v.T = y), (s.p = T), s.d.f());
      }
    }),
    (ee.preconnect = function (h, y) {
      typeof h == 'string' &&
        (y
          ? ((y = y.crossOrigin),
            (y = typeof y == 'string' ? (y === 'use-credentials' ? y : '') : void 0))
          : (y = null),
        s.d.C(h, y));
    }),
    (ee.prefetchDNS = function (h) {
      typeof h == 'string' && s.d.D(h);
    }),
    (ee.preinit = function (h, y) {
      if (typeof h == 'string' && y && typeof y.as == 'string') {
        var T = y.as,
          _ = p(T, y.crossOrigin),
          M = typeof y.integrity == 'string' ? y.integrity : void 0,
          G = typeof y.fetchPriority == 'string' ? y.fetchPriority : void 0;
        T === 'style'
          ? s.d.S(h, typeof y.precedence == 'string' ? y.precedence : void 0, {
              crossOrigin: _,
              integrity: M,
              fetchPriority: G,
            })
          : T === 'script' &&
            s.d.X(h, {
              crossOrigin: _,
              integrity: M,
              fetchPriority: G,
              nonce: typeof y.nonce == 'string' ? y.nonce : void 0,
            });
      }
    }),
    (ee.preinitModule = function (h, y) {
      if (typeof h == 'string')
        if (typeof y == 'object' && y !== null) {
          if (y.as == null || y.as === 'script') {
            var T = p(y.as, y.crossOrigin);
            s.d.M(h, {
              crossOrigin: T,
              integrity: typeof y.integrity == 'string' ? y.integrity : void 0,
              nonce: typeof y.nonce == 'string' ? y.nonce : void 0,
            });
          }
        } else y == null && s.d.M(h);
    }),
    (ee.preload = function (h, y) {
      if (typeof h == 'string' && typeof y == 'object' && y !== null && typeof y.as == 'string') {
        var T = y.as,
          _ = p(T, y.crossOrigin);
        s.d.L(h, T, {
          crossOrigin: _,
          integrity: typeof y.integrity == 'string' ? y.integrity : void 0,
          nonce: typeof y.nonce == 'string' ? y.nonce : void 0,
          type: typeof y.type == 'string' ? y.type : void 0,
          fetchPriority: typeof y.fetchPriority == 'string' ? y.fetchPriority : void 0,
          referrerPolicy: typeof y.referrerPolicy == 'string' ? y.referrerPolicy : void 0,
          imageSrcSet: typeof y.imageSrcSet == 'string' ? y.imageSrcSet : void 0,
          imageSizes: typeof y.imageSizes == 'string' ? y.imageSizes : void 0,
          media: typeof y.media == 'string' ? y.media : void 0,
        });
      }
    }),
    (ee.preloadModule = function (h, y) {
      if (typeof h == 'string')
        if (y) {
          var T = p(y.as, y.crossOrigin);
          s.d.m(h, {
            as: typeof y.as == 'string' && y.as !== 'script' ? y.as : void 0,
            crossOrigin: T,
            integrity: typeof y.integrity == 'string' ? y.integrity : void 0,
          });
        } else s.d.m(h);
    }),
    (ee.requestFormReset = function (h) {
      s.d.r(h);
    }),
    (ee.unstable_batchedUpdates = function (h, y) {
      return h(y);
    }),
    (ee.useFormState = function (h, y, T) {
      return v.H.useFormState(h, y, T);
    }),
    (ee.useFormStatus = function () {
      return v.H.useHostTransitionStatus();
    }),
    (ee.version = '19.2.5'),
    ee
  );
}
var mh;
function i0() {
  if (mh) return _f.exports;
  mh = 1;
  function u() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (c) {
        console.error(c);
      }
  }
  return (u(), (_f.exports = u0()), _f.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var hh;
function c0() {
  if (hh) return au;
  hh = 1;
  var u = a0(),
    c = Gf(),
    f = i0();
  function s(t) {
    var e = 'https://react.dev/errors/' + t;
    if (1 < arguments.length) {
      e += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++) e += '&args[]=' + encodeURIComponent(arguments[l]);
    }
    return (
      'Minified React error #' +
      t +
      '; visit ' +
      e +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function r(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function m(t) {
    var e = t,
      l = t;
    if (t.alternate) for (; e.return; ) e = e.return;
    else {
      t = e;
      do ((e = t), (e.flags & 4098) !== 0 && (l = e.return), (t = e.return));
      while (t);
    }
    return e.tag === 3 ? l : null;
  }
  function v(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if ((e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)), e !== null))
        return e.dehydrated;
    }
    return null;
  }
  function p(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if ((e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)), e !== null))
        return e.dehydrated;
    }
    return null;
  }
  function h(t) {
    if (m(t) !== t) throw Error(s(188));
  }
  function y(t) {
    var e = t.alternate;
    if (!e) {
      if (((e = m(t)), e === null)) throw Error(s(188));
      return e !== t ? null : t;
    }
    for (var l = t, a = e; ; ) {
      var n = l.return;
      if (n === null) break;
      var i = n.alternate;
      if (i === null) {
        if (((a = n.return), a !== null)) {
          l = a;
          continue;
        }
        break;
      }
      if (n.child === i.child) {
        for (i = n.child; i; ) {
          if (i === l) return (h(n), t);
          if (i === a) return (h(n), e);
          i = i.sibling;
        }
        throw Error(s(188));
      }
      if (l.return !== a.return) ((l = n), (a = i));
      else {
        for (var o = !1, d = n.child; d; ) {
          if (d === l) {
            ((o = !0), (l = n), (a = i));
            break;
          }
          if (d === a) {
            ((o = !0), (a = n), (l = i));
            break;
          }
          d = d.sibling;
        }
        if (!o) {
          for (d = i.child; d; ) {
            if (d === l) {
              ((o = !0), (l = i), (a = n));
              break;
            }
            if (d === a) {
              ((o = !0), (a = i), (l = n));
              break;
            }
            d = d.sibling;
          }
          if (!o) throw Error(s(189));
        }
      }
      if (l.alternate !== a) throw Error(s(190));
    }
    if (l.tag !== 3) throw Error(s(188));
    return l.stateNode.current === l ? t : e;
  }
  function T(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((e = T(t)), e !== null)) return e;
      t = t.sibling;
    }
    return null;
  }
  var _ = Object.assign,
    M = Symbol.for('react.element'),
    G = Symbol.for('react.transitional.element'),
    Y = Symbol.for('react.portal'),
    B = Symbol.for('react.fragment'),
    j = Symbol.for('react.strict_mode'),
    O = Symbol.for('react.profiler'),
    X = Symbol.for('react.consumer'),
    q = Symbol.for('react.context'),
    Q = Symbol.for('react.forward_ref'),
    I = Symbol.for('react.suspense'),
    J = Symbol.for('react.suspense_list'),
    K = Symbol.for('react.memo'),
    lt = Symbol.for('react.lazy'),
    ht = Symbol.for('react.activity'),
    _t = Symbol.for('react.memo_cache_sentinel'),
    Ot = Symbol.iterator;
  function Vt(t) {
    return t === null || typeof t != 'object'
      ? null
      : ((t = (Ot && t[Ot]) || t['@@iterator']), typeof t == 'function' ? t : null);
  }
  var de = Symbol.for('react.client.reference');
  function ne(t) {
    if (t == null) return null;
    if (typeof t == 'function') return t.$$typeof === de ? null : t.displayName || t.name || null;
    if (typeof t == 'string') return t;
    switch (t) {
      case B:
        return 'Fragment';
      case O:
        return 'Profiler';
      case j:
        return 'StrictMode';
      case I:
        return 'Suspense';
      case J:
        return 'SuspenseList';
      case ht:
        return 'Activity';
    }
    if (typeof t == 'object')
      switch (t.$$typeof) {
        case Y:
          return 'Portal';
        case q:
          return t.displayName || 'Context';
        case X:
          return (t._context.displayName || 'Context') + '.Consumer';
        case Q:
          var e = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = e.displayName || e.name || ''),
              (t = t !== '' ? 'ForwardRef(' + t + ')' : 'ForwardRef')),
            t
          );
        case K:
          return ((e = t.displayName || null), e !== null ? e : ne(t.type) || 'Memo');
        case lt:
          ((e = t._payload), (t = t._init));
          try {
            return ne(t(e));
          } catch {}
      }
    return null;
  }
  var jt = Array.isArray,
    w = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    R = f.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    V = { pending: !1, data: null, method: null, action: null },
    it = [],
    yt = -1;
  function b(t) {
    return { current: t };
  }
  function H(t) {
    0 > yt || ((t.current = it[yt]), (it[yt] = null), yt--);
  }
  function Z(t, e) {
    (yt++, (it[yt] = t.current), (t.current = e));
  }
  var W = b(null),
    nt = b(null),
    st = b(null),
    bt = b(null);
  function le(t, e) {
    switch ((Z(st, e), Z(nt, t), Z(W, null), e.nodeType)) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? Rm(t) : 0;
        break;
      default:
        if (((t = e.tagName), (e = e.namespaceURI))) ((e = Rm(e)), (t = zm(e, t)));
        else
          switch (t) {
            case 'svg':
              t = 1;
              break;
            case 'math':
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    (H(W), Z(W, t));
  }
  function kt() {
    (H(W), H(nt), H(st));
  }
  function fn(t) {
    t.memoizedState !== null && Z(bt, t);
    var e = W.current,
      l = zm(e, t.type);
    e !== l && (Z(nt, t), Z(W, l));
  }
  function pu(t) {
    (nt.current === t && (H(W), H(nt)), bt.current === t && (H(bt), (In._currentValue = V)));
  }
  var Ji, no;
  function Yl(t) {
    if (Ji === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        ((Ji = (e && e[1]) || ''),
          (no =
            -1 <
            l.stack.indexOf(`
    at`)
              ? ' (<anonymous>)'
              : -1 < l.stack.indexOf('@')
                ? '@unknown:0:0'
                : ''));
      }
    return (
      `
` +
      Ji +
      t +
      no
    );
  }
  var $i = !1;
  function Wi(t, e) {
    if (!t || $i) return '';
    $i = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (e) {
              var L = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(L.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(L, []);
                } catch (D) {
                  var z = D;
                }
                Reflect.construct(t, [], L);
              } else {
                try {
                  L.call();
                } catch (D) {
                  z = D;
                }
                t.call(L.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (D) {
                z = D;
              }
              (L = t()) && typeof L.catch == 'function' && L.catch(function () {});
            }
          } catch (D) {
            if (D && z && typeof D.stack == 'string') return [D.stack, z.stack];
          }
          return [null, null];
        },
      };
      a.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
      var n = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, 'name');
      n &&
        n.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, 'name', {
          value: 'DetermineComponentFrameRoot',
        });
      var i = a.DetermineComponentFrameRoot(),
        o = i[0],
        d = i[1];
      if (o && d) {
        var g = o.split(`
`),
          C = d.split(`
`);
        for (n = a = 0; a < g.length && !g[a].includes('DetermineComponentFrameRoot'); ) a++;
        for (; n < C.length && !C[n].includes('DetermineComponentFrameRoot'); ) n++;
        if (a === g.length || n === C.length)
          for (a = g.length - 1, n = C.length - 1; 1 <= a && 0 <= n && g[a] !== C[n]; ) n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (g[a] !== C[n]) {
            if (a !== 1 || n !== 1)
              do
                if ((a--, n--, 0 > n || g[a] !== C[n])) {
                  var U =
                    `
` + g[a].replace(' at new ', ' at ');
                  return (
                    t.displayName &&
                      U.includes('<anonymous>') &&
                      (U = U.replace('<anonymous>', t.displayName)),
                    U
                  );
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      (($i = !1), (Error.prepareStackTrace = l));
    }
    return (l = t ? t.displayName || t.name : '') ? Yl(l) : '';
  }
  function Ry(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Yl(t.type);
      case 16:
        return Yl('Lazy');
      case 13:
        return t.child !== e && e !== null ? Yl('Suspense Fallback') : Yl('Suspense');
      case 19:
        return Yl('SuspenseList');
      case 0:
      case 15:
        return Wi(t.type, !1);
      case 11:
        return Wi(t.type.render, !1);
      case 1:
        return Wi(t.type, !0);
      case 31:
        return Yl('Activity');
      default:
        return '';
    }
  }
  function uo(t) {
    try {
      var e = '',
        l = null;
      do ((e += Ry(t, l)), (l = t), (t = t.return));
      while (t);
      return e;
    } catch (a) {
      return (
        `
Error generating stack: ` +
        a.message +
        `
` +
        a.stack
      );
    }
  }
  var Fi = Object.prototype.hasOwnProperty,
    Ii = u.unstable_scheduleCallback,
    Pi = u.unstable_cancelCallback,
    zy = u.unstable_shouldYield,
    Dy = u.unstable_requestPaint,
    me = u.unstable_now,
    Oy = u.unstable_getCurrentPriorityLevel,
    io = u.unstable_ImmediatePriority,
    co = u.unstable_UserBlockingPriority,
    vu = u.unstable_NormalPriority,
    jy = u.unstable_LowPriority,
    so = u.unstable_IdlePriority,
    Uy = u.log,
    wy = u.unstable_setDisableYieldValue,
    on = null,
    he = null;
  function ml(t) {
    if ((typeof Uy == 'function' && wy(t), he && typeof he.setStrictMode == 'function'))
      try {
        he.setStrictMode(on, t);
      } catch {}
  }
  var ye = Math.clz32 ? Math.clz32 : Hy,
    By = Math.log,
    ky = Math.LN2;
  function Hy(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((By(t) / ky) | 0)) | 0);
  }
  var gu = 256,
    _u = 262144,
    bu = 4194304;
  function Xl(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function Su(t, e, l) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var n = 0,
      i = t.suspendedLanes,
      o = t.pingedLanes;
    t = t.warmLanes;
    var d = a & 134217727;
    return (
      d !== 0
        ? ((a = d & ~i),
          a !== 0
            ? (n = Xl(a))
            : ((o &= d), o !== 0 ? (n = Xl(o)) : l || ((l = d & ~t), l !== 0 && (n = Xl(l)))))
        : ((d = a & ~i),
          d !== 0
            ? (n = Xl(d))
            : o !== 0
              ? (n = Xl(o))
              : l || ((l = a & ~t), l !== 0 && (n = Xl(l)))),
      n === 0
        ? 0
        : e !== 0 &&
            e !== n &&
            (e & i) === 0 &&
            ((i = n & -n), (l = e & -e), i >= l || (i === 32 && (l & 4194048) !== 0))
          ? e
          : n
    );
  }
  function rn(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function Ly(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function fo() {
    var t = bu;
    return ((bu <<= 1), (bu & 62914560) === 0 && (bu = 4194304), t);
  }
  function tc(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function dn(t, e) {
    ((t.pendingLanes |= e),
      e !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
  }
  function qy(t, e, l, a, n, i) {
    var o = t.pendingLanes;
    ((t.pendingLanes = l),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= l),
      (t.entangledLanes &= l),
      (t.errorRecoveryDisabledLanes &= l),
      (t.shellSuspendCounter = 0));
    var d = t.entanglements,
      g = t.expirationTimes,
      C = t.hiddenUpdates;
    for (l = o & ~l; 0 < l; ) {
      var U = 31 - ye(l),
        L = 1 << U;
      ((d[U] = 0), (g[U] = -1));
      var z = C[U];
      if (z !== null)
        for (C[U] = null, U = 0; U < z.length; U++) {
          var D = z[U];
          D !== null && (D.lane &= -536870913);
        }
      l &= ~L;
    }
    (a !== 0 && oo(t, a, 0),
      i !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= i & ~(o & ~e)));
  }
  function oo(t, e, l) {
    ((t.pendingLanes |= e), (t.suspendedLanes &= ~e));
    var a = 31 - ye(e);
    ((t.entangledLanes |= e),
      (t.entanglements[a] = t.entanglements[a] | 1073741824 | (l & 261930)));
  }
  function ro(t, e) {
    var l = (t.entangledLanes |= e);
    for (t = t.entanglements; l; ) {
      var a = 31 - ye(l),
        n = 1 << a;
      ((n & e) | (t[a] & e) && (t[a] |= e), (l &= ~n));
    }
  }
  function mo(t, e) {
    var l = e & -e;
    return ((l = (l & 42) !== 0 ? 1 : ec(l)), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l);
  }
  function ec(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function lc(t) {
    return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function ho() {
    var t = R.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : Pm(t.type));
  }
  function yo(t, e) {
    var l = R.p;
    try {
      return ((R.p = t), e());
    } finally {
      R.p = l;
    }
  }
  var hl = Math.random().toString(36).slice(2),
    Wt = '__reactFiber$' + hl,
    ue = '__reactProps$' + hl,
    ra = '__reactContainer$' + hl,
    ac = '__reactEvents$' + hl,
    Gy = '__reactListeners$' + hl,
    Yy = '__reactHandles$' + hl,
    po = '__reactResources$' + hl,
    mn = '__reactMarker$' + hl;
  function nc(t) {
    (delete t[Wt], delete t[ue], delete t[ac], delete t[Gy], delete t[Yy]);
  }
  function da(t) {
    var e = t[Wt];
    if (e) return e;
    for (var l = t.parentNode; l; ) {
      if ((e = l[ra] || l[Wt])) {
        if (((l = e.alternate), e.child !== null || (l !== null && l.child !== null)))
          for (t = km(t); t !== null; ) {
            if ((l = t[Wt])) return l;
            t = km(t);
          }
        return e;
      }
      ((t = l), (l = t.parentNode));
    }
    return null;
  }
  function ma(t) {
    if ((t = t[Wt] || t[ra])) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3) return t;
    }
    return null;
  }
  function hn(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(s(33));
  }
  function ha(t) {
    var e = t[po];
    return (e || (e = t[po] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), e);
  }
  function Jt(t) {
    t[mn] = !0;
  }
  var vo = new Set(),
    go = {};
  function Ql(t, e) {
    (ya(t, e), ya(t + 'Capture', e));
  }
  function ya(t, e) {
    for (go[t] = e, t = 0; t < e.length; t++) vo.add(e[t]);
  }
  var Xy = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    _o = {},
    bo = {};
  function Qy(t) {
    return Fi.call(bo, t)
      ? !0
      : Fi.call(_o, t)
        ? !1
        : Xy.test(t)
          ? (bo[t] = !0)
          : ((_o[t] = !0), !1);
  }
  function Eu(t, e, l) {
    if (Qy(e))
      if (l === null) t.removeAttribute(e);
      else {
        switch (typeof l) {
          case 'undefined':
          case 'function':
          case 'symbol':
            t.removeAttribute(e);
            return;
          case 'boolean':
            var a = e.toLowerCase().slice(0, 5);
            if (a !== 'data-' && a !== 'aria-') {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, '' + l);
      }
  }
  function Tu(t, e, l) {
    if (l === null) t.removeAttribute(e);
    else {
      switch (typeof l) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, '' + l);
    }
  }
  function Ze(t, e, l, a) {
    if (a === null) t.removeAttribute(l);
    else {
      switch (typeof a) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          t.removeAttribute(l);
          return;
      }
      t.setAttributeNS(e, l, '' + a);
    }
  }
  function xe(t) {
    switch (typeof t) {
      case 'bigint':
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
        return t;
      case 'object':
        return t;
      default:
        return '';
    }
  }
  function So(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === 'input' && (e === 'checkbox' || e === 'radio');
  }
  function Vy(t, e, l) {
    var a = Object.getOwnPropertyDescriptor(t.constructor.prototype, e);
    if (
      !t.hasOwnProperty(e) &&
      typeof a < 'u' &&
      typeof a.get == 'function' &&
      typeof a.set == 'function'
    ) {
      var n = a.get,
        i = a.set;
      return (
        Object.defineProperty(t, e, {
          configurable: !0,
          get: function () {
            return n.call(this);
          },
          set: function (o) {
            ((l = '' + o), i.call(this, o));
          },
        }),
        Object.defineProperty(t, e, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return l;
          },
          setValue: function (o) {
            l = '' + o;
          },
          stopTracking: function () {
            ((t._valueTracker = null), delete t[e]);
          },
        }
      );
    }
  }
  function uc(t) {
    if (!t._valueTracker) {
      var e = So(t) ? 'checked' : 'value';
      t._valueTracker = Vy(t, e, '' + t[e]);
    }
  }
  function Eo(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(),
      a = '';
    return (
      t && (a = So(t) ? (t.checked ? 'true' : 'false') : t.value),
      (t = a),
      t !== l ? (e.setValue(t), !0) : !1
    );
  }
  function xu(t) {
    if (((t = t || (typeof document < 'u' ? document : void 0)), typeof t > 'u')) return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Zy = /[\n"\\]/g;
  function Ae(t) {
    return t.replace(Zy, function (e) {
      return '\\' + e.charCodeAt(0).toString(16) + ' ';
    });
  }
  function ic(t, e, l, a, n, i, o, d) {
    ((t.name = ''),
      o != null && typeof o != 'function' && typeof o != 'symbol' && typeof o != 'boolean'
        ? (t.type = o)
        : t.removeAttribute('type'),
      e != null
        ? o === 'number'
          ? ((e === 0 && t.value === '') || t.value != e) && (t.value = '' + xe(e))
          : t.value !== '' + xe(e) && (t.value = '' + xe(e))
        : (o !== 'submit' && o !== 'reset') || t.removeAttribute('value'),
      e != null
        ? cc(t, o, xe(e))
        : l != null
          ? cc(t, o, xe(l))
          : a != null && t.removeAttribute('value'),
      n == null && i != null && (t.defaultChecked = !!i),
      n != null && (t.checked = n && typeof n != 'function' && typeof n != 'symbol'),
      d != null && typeof d != 'function' && typeof d != 'symbol' && typeof d != 'boolean'
        ? (t.name = '' + xe(d))
        : t.removeAttribute('name'));
  }
  function To(t, e, l, a, n, i, o, d) {
    if (
      (i != null &&
        typeof i != 'function' &&
        typeof i != 'symbol' &&
        typeof i != 'boolean' &&
        (t.type = i),
      e != null || l != null)
    ) {
      if (!((i !== 'submit' && i !== 'reset') || e != null)) {
        uc(t);
        return;
      }
      ((l = l != null ? '' + xe(l) : ''),
        (e = e != null ? '' + xe(e) : l),
        d || e === t.value || (t.value = e),
        (t.defaultValue = e));
    }
    ((a = a ?? n),
      (a = typeof a != 'function' && typeof a != 'symbol' && !!a),
      (t.checked = d ? t.checked : !!a),
      (t.defaultChecked = !!a),
      o != null &&
        typeof o != 'function' &&
        typeof o != 'symbol' &&
        typeof o != 'boolean' &&
        (t.name = o),
      uc(t));
  }
  function cc(t, e, l) {
    (e === 'number' && xu(t.ownerDocument) === t) ||
      t.defaultValue === '' + l ||
      (t.defaultValue = '' + l);
  }
  function pa(t, e, l, a) {
    if (((t = t.options), e)) {
      e = {};
      for (var n = 0; n < l.length; n++) e['$' + l[n]] = !0;
      for (l = 0; l < t.length; l++)
        ((n = e.hasOwnProperty('$' + t[l].value)),
          t[l].selected !== n && (t[l].selected = n),
          n && a && (t[l].defaultSelected = !0));
    } else {
      for (l = '' + xe(l), e = null, n = 0; n < t.length; n++) {
        if (t[n].value === l) {
          ((t[n].selected = !0), a && (t[n].defaultSelected = !0));
          return;
        }
        e !== null || t[n].disabled || (e = t[n]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function xo(t, e, l) {
    if (e != null && ((e = '' + xe(e)), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? '' + xe(l) : '';
  }
  function Ao(t, e, l, a) {
    if (e == null) {
      if (a != null) {
        if (l != null) throw Error(s(92));
        if (jt(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        l = a;
      }
      (l == null && (l = ''), (e = l));
    }
    ((l = xe(e)),
      (t.defaultValue = l),
      (a = t.textContent),
      a === l && a !== '' && a !== null && (t.value = a),
      uc(t));
  }
  function va(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var Ky = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function Mo(t, e, l) {
    var a = e.indexOf('--') === 0;
    l == null || typeof l == 'boolean' || l === ''
      ? a
        ? t.setProperty(e, '')
        : e === 'float'
          ? (t.cssFloat = '')
          : (t[e] = '')
      : a
        ? t.setProperty(e, l)
        : typeof l != 'number' || l === 0 || Ky.has(e)
          ? e === 'float'
            ? (t.cssFloat = l)
            : (t[e] = ('' + l).trim())
          : (t[e] = l + 'px');
  }
  function No(t, e, l) {
    if (e != null && typeof e != 'object') throw Error(s(62));
    if (((t = t.style), l != null)) {
      for (var a in l)
        !l.hasOwnProperty(a) ||
          (e != null && e.hasOwnProperty(a)) ||
          (a.indexOf('--') === 0
            ? t.setProperty(a, '')
            : a === 'float'
              ? (t.cssFloat = '')
              : (t[a] = ''));
      for (var n in e) ((a = e[n]), e.hasOwnProperty(n) && l[n] !== a && Mo(t, n, a));
    } else for (var i in e) e.hasOwnProperty(i) && Mo(t, i, e[i]);
  }
  function sc(t) {
    if (t.indexOf('-') === -1) return !1;
    switch (t) {
      case 'annotation-xml':
      case 'color-profile':
      case 'font-face':
      case 'font-face-src':
      case 'font-face-uri':
      case 'font-face-format':
      case 'font-face-name':
      case 'missing-glyph':
        return !1;
      default:
        return !0;
    }
  }
  var Jy = new Map([
      ['acceptCharset', 'accept-charset'],
      ['htmlFor', 'for'],
      ['httpEquiv', 'http-equiv'],
      ['crossOrigin', 'crossorigin'],
      ['accentHeight', 'accent-height'],
      ['alignmentBaseline', 'alignment-baseline'],
      ['arabicForm', 'arabic-form'],
      ['baselineShift', 'baseline-shift'],
      ['capHeight', 'cap-height'],
      ['clipPath', 'clip-path'],
      ['clipRule', 'clip-rule'],
      ['colorInterpolation', 'color-interpolation'],
      ['colorInterpolationFilters', 'color-interpolation-filters'],
      ['colorProfile', 'color-profile'],
      ['colorRendering', 'color-rendering'],
      ['dominantBaseline', 'dominant-baseline'],
      ['enableBackground', 'enable-background'],
      ['fillOpacity', 'fill-opacity'],
      ['fillRule', 'fill-rule'],
      ['floodColor', 'flood-color'],
      ['floodOpacity', 'flood-opacity'],
      ['fontFamily', 'font-family'],
      ['fontSize', 'font-size'],
      ['fontSizeAdjust', 'font-size-adjust'],
      ['fontStretch', 'font-stretch'],
      ['fontStyle', 'font-style'],
      ['fontVariant', 'font-variant'],
      ['fontWeight', 'font-weight'],
      ['glyphName', 'glyph-name'],
      ['glyphOrientationHorizontal', 'glyph-orientation-horizontal'],
      ['glyphOrientationVertical', 'glyph-orientation-vertical'],
      ['horizAdvX', 'horiz-adv-x'],
      ['horizOriginX', 'horiz-origin-x'],
      ['imageRendering', 'image-rendering'],
      ['letterSpacing', 'letter-spacing'],
      ['lightingColor', 'lighting-color'],
      ['markerEnd', 'marker-end'],
      ['markerMid', 'marker-mid'],
      ['markerStart', 'marker-start'],
      ['overlinePosition', 'overline-position'],
      ['overlineThickness', 'overline-thickness'],
      ['paintOrder', 'paint-order'],
      ['panose-1', 'panose-1'],
      ['pointerEvents', 'pointer-events'],
      ['renderingIntent', 'rendering-intent'],
      ['shapeRendering', 'shape-rendering'],
      ['stopColor', 'stop-color'],
      ['stopOpacity', 'stop-opacity'],
      ['strikethroughPosition', 'strikethrough-position'],
      ['strikethroughThickness', 'strikethrough-thickness'],
      ['strokeDasharray', 'stroke-dasharray'],
      ['strokeDashoffset', 'stroke-dashoffset'],
      ['strokeLinecap', 'stroke-linecap'],
      ['strokeLinejoin', 'stroke-linejoin'],
      ['strokeMiterlimit', 'stroke-miterlimit'],
      ['strokeOpacity', 'stroke-opacity'],
      ['strokeWidth', 'stroke-width'],
      ['textAnchor', 'text-anchor'],
      ['textDecoration', 'text-decoration'],
      ['textRendering', 'text-rendering'],
      ['transformOrigin', 'transform-origin'],
      ['underlinePosition', 'underline-position'],
      ['underlineThickness', 'underline-thickness'],
      ['unicodeBidi', 'unicode-bidi'],
      ['unicodeRange', 'unicode-range'],
      ['unitsPerEm', 'units-per-em'],
      ['vAlphabetic', 'v-alphabetic'],
      ['vHanging', 'v-hanging'],
      ['vIdeographic', 'v-ideographic'],
      ['vMathematical', 'v-mathematical'],
      ['vectorEffect', 'vector-effect'],
      ['vertAdvY', 'vert-adv-y'],
      ['vertOriginX', 'vert-origin-x'],
      ['vertOriginY', 'vert-origin-y'],
      ['wordSpacing', 'word-spacing'],
      ['writingMode', 'writing-mode'],
      ['xmlnsXlink', 'xmlns:xlink'],
      ['xHeight', 'x-height'],
    ]),
    $y =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Au(t) {
    return $y.test('' + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  function Ke() {}
  var fc = null;
  function oc(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var ga = null,
    _a = null;
  function Co(t) {
    var e = ma(t);
    if (e && (t = e.stateNode)) {
      var l = t[ue] || null;
      t: switch (((t = e.stateNode), e.type)) {
        case 'input':
          if (
            (ic(
              t,
              l.value,
              l.defaultValue,
              l.defaultValue,
              l.checked,
              l.defaultChecked,
              l.type,
              l.name
            ),
            (e = l.name),
            l.type === 'radio' && e != null)
          ) {
            for (l = t; l.parentNode; ) l = l.parentNode;
            for (
              l = l.querySelectorAll('input[name="' + Ae('' + e) + '"][type="radio"]'), e = 0;
              e < l.length;
              e++
            ) {
              var a = l[e];
              if (a !== t && a.form === t.form) {
                var n = a[ue] || null;
                if (!n) throw Error(s(90));
                ic(
                  a,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name
                );
              }
            }
            for (e = 0; e < l.length; e++) ((a = l[e]), a.form === t.form && Eo(a));
          }
          break t;
        case 'textarea':
          xo(t, l.value, l.defaultValue);
          break t;
        case 'select':
          ((e = l.value), e != null && pa(t, !!l.multiple, e, !1));
      }
    }
  }
  var rc = !1;
  function Ro(t, e, l) {
    if (rc) return t(e, l);
    rc = !0;
    try {
      var a = t(e);
      return a;
    } finally {
      if (
        ((rc = !1),
        (ga !== null || _a !== null) &&
          (di(), ga && ((e = ga), (t = _a), (_a = ga = null), Co(e), t)))
      )
        for (e = 0; e < t.length; e++) Co(t[e]);
    }
  }
  function yn(t, e) {
    var l = t.stateNode;
    if (l === null) return null;
    var a = l[ue] || null;
    if (a === null) return null;
    l = a[e];
    t: switch (e) {
      case 'onClick':
      case 'onClickCapture':
      case 'onDoubleClick':
      case 'onDoubleClickCapture':
      case 'onMouseDown':
      case 'onMouseDownCapture':
      case 'onMouseMove':
      case 'onMouseMoveCapture':
      case 'onMouseUp':
      case 'onMouseUpCapture':
      case 'onMouseEnter':
        ((a = !a.disabled) ||
          ((t = t.type),
          (a = !(t === 'button' || t === 'input' || t === 'select' || t === 'textarea'))),
          (t = !a));
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (l && typeof l != 'function') throw Error(s(231, e, typeof l));
    return l;
  }
  var Je = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    dc = !1;
  if (Je)
    try {
      var pn = {};
      (Object.defineProperty(pn, 'passive', {
        get: function () {
          dc = !0;
        },
      }),
        window.addEventListener('test', pn, pn),
        window.removeEventListener('test', pn, pn));
    } catch {
      dc = !1;
    }
  var yl = null,
    mc = null,
    Mu = null;
  function zo() {
    if (Mu) return Mu;
    var t,
      e = mc,
      l = e.length,
      a,
      n = 'value' in yl ? yl.value : yl.textContent,
      i = n.length;
    for (t = 0; t < l && e[t] === n[t]; t++);
    var o = l - t;
    for (a = 1; a <= o && e[l - a] === n[i - a]; a++);
    return (Mu = n.slice(t, 1 < a ? 1 - a : void 0));
  }
  function Nu(t) {
    var e = t.keyCode;
    return (
      'charCode' in t ? ((t = t.charCode), t === 0 && e === 13 && (t = 13)) : (t = e),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function Cu() {
    return !0;
  }
  function Do() {
    return !1;
  }
  function ie(t) {
    function e(l, a, n, i, o) {
      ((this._reactName = l),
        (this._targetInst = n),
        (this.type = a),
        (this.nativeEvent = i),
        (this.target = o),
        (this.currentTarget = null));
      for (var d in t) t.hasOwnProperty(d) && ((l = t[d]), (this[d] = l ? l(i) : i[d]));
      return (
        (this.isDefaultPrevented = (
          i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
        )
          ? Cu
          : Do),
        (this.isPropagationStopped = Do),
        this
      );
    }
    return (
      _(e.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var l = this.nativeEvent;
          l &&
            (l.preventDefault
              ? l.preventDefault()
              : typeof l.returnValue != 'unknown' && (l.returnValue = !1),
            (this.isDefaultPrevented = Cu));
        },
        stopPropagation: function () {
          var l = this.nativeEvent;
          l &&
            (l.stopPropagation
              ? l.stopPropagation()
              : typeof l.cancelBubble != 'unknown' && (l.cancelBubble = !0),
            (this.isPropagationStopped = Cu));
        },
        persist: function () {},
        isPersistent: Cu,
      }),
      e
    );
  }
  var Vl = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Ru = ie(Vl),
    vn = _({}, Vl, { view: 0, detail: 0 }),
    Wy = ie(vn),
    hc,
    yc,
    gn,
    zu = _({}, vn, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: vc,
      button: 0,
      buttons: 0,
      relatedTarget: function (t) {
        return t.relatedTarget === void 0
          ? t.fromElement === t.srcElement
            ? t.toElement
            : t.fromElement
          : t.relatedTarget;
      },
      movementX: function (t) {
        return 'movementX' in t
          ? t.movementX
          : (t !== gn &&
              (gn && t.type === 'mousemove'
                ? ((hc = t.screenX - gn.screenX), (yc = t.screenY - gn.screenY))
                : (yc = hc = 0),
              (gn = t)),
            hc);
      },
      movementY: function (t) {
        return 'movementY' in t ? t.movementY : yc;
      },
    }),
    Oo = ie(zu),
    Fy = _({}, zu, { dataTransfer: 0 }),
    Iy = ie(Fy),
    Py = _({}, vn, { relatedTarget: 0 }),
    pc = ie(Py),
    tp = _({}, Vl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    ep = ie(tp),
    lp = _({}, Vl, {
      clipboardData: function (t) {
        return 'clipboardData' in t ? t.clipboardData : window.clipboardData;
      },
    }),
    ap = ie(lp),
    np = _({}, Vl, { data: 0 }),
    jo = ie(np),
    up = {
      Esc: 'Escape',
      Spacebar: ' ',
      Left: 'ArrowLeft',
      Up: 'ArrowUp',
      Right: 'ArrowRight',
      Down: 'ArrowDown',
      Del: 'Delete',
      Win: 'OS',
      Menu: 'ContextMenu',
      Apps: 'ContextMenu',
      Scroll: 'ScrollLock',
      MozPrintableKey: 'Unidentified',
    },
    ip = {
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
      20: 'CapsLock',
      27: 'Escape',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      45: 'Insert',
      46: 'Delete',
      112: 'F1',
      113: 'F2',
      114: 'F3',
      115: 'F4',
      116: 'F5',
      117: 'F6',
      118: 'F7',
      119: 'F8',
      120: 'F9',
      121: 'F10',
      122: 'F11',
      123: 'F12',
      144: 'NumLock',
      145: 'ScrollLock',
      224: 'Meta',
    },
    cp = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function sp(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = cp[t]) ? !!e[t] : !1;
  }
  function vc() {
    return sp;
  }
  var fp = _({}, vn, {
      key: function (t) {
        if (t.key) {
          var e = up[t.key] || t.key;
          if (e !== 'Unidentified') return e;
        }
        return t.type === 'keypress'
          ? ((t = Nu(t)), t === 13 ? 'Enter' : String.fromCharCode(t))
          : t.type === 'keydown' || t.type === 'keyup'
            ? ip[t.keyCode] || 'Unidentified'
            : '';
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: vc,
      charCode: function (t) {
        return t.type === 'keypress' ? Nu(t) : 0;
      },
      keyCode: function (t) {
        return t.type === 'keydown' || t.type === 'keyup' ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === 'keypress'
          ? Nu(t)
          : t.type === 'keydown' || t.type === 'keyup'
            ? t.keyCode
            : 0;
      },
    }),
    op = ie(fp),
    rp = _({}, zu, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Uo = ie(rp),
    dp = _({}, vn, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: vc,
    }),
    mp = ie(dp),
    hp = _({}, Vl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    yp = ie(hp),
    pp = _({}, zu, {
      deltaX: function (t) {
        return 'deltaX' in t ? t.deltaX : 'wheelDeltaX' in t ? -t.wheelDeltaX : 0;
      },
      deltaY: function (t) {
        return 'deltaY' in t
          ? t.deltaY
          : 'wheelDeltaY' in t
            ? -t.wheelDeltaY
            : 'wheelDelta' in t
              ? -t.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    vp = ie(pp),
    gp = _({}, Vl, { newState: 0, oldState: 0 }),
    _p = ie(gp),
    bp = [9, 13, 27, 32],
    gc = Je && 'CompositionEvent' in window,
    _n = null;
  Je && 'documentMode' in document && (_n = document.documentMode);
  var Sp = Je && 'TextEvent' in window && !_n,
    wo = Je && (!gc || (_n && 8 < _n && 11 >= _n)),
    Bo = ' ',
    ko = !1;
  function Ho(t, e) {
    switch (t) {
      case 'keyup':
        return bp.indexOf(e.keyCode) !== -1;
      case 'keydown':
        return e.keyCode !== 229;
      case 'keypress':
      case 'mousedown':
      case 'focusout':
        return !0;
      default:
        return !1;
    }
  }
  function Lo(t) {
    return ((t = t.detail), typeof t == 'object' && 'data' in t ? t.data : null);
  }
  var ba = !1;
  function Ep(t, e) {
    switch (t) {
      case 'compositionend':
        return Lo(e);
      case 'keypress':
        return e.which !== 32 ? null : ((ko = !0), Bo);
      case 'textInput':
        return ((t = e.data), t === Bo && ko ? null : t);
      default:
        return null;
    }
  }
  function Tp(t, e) {
    if (ba)
      return t === 'compositionend' || (!gc && Ho(t, e))
        ? ((t = zo()), (Mu = mc = yl = null), (ba = !1), t)
        : null;
    switch (t) {
      case 'paste':
        return null;
      case 'keypress':
        if (!(e.ctrlKey || e.altKey || e.metaKey) || (e.ctrlKey && e.altKey)) {
          if (e.char && 1 < e.char.length) return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case 'compositionend':
        return wo && e.locale !== 'ko' ? null : e.data;
      default:
        return null;
    }
  }
  var xp = {
    color: !0,
    date: !0,
    datetime: !0,
    'datetime-local': !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function qo(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === 'input' ? !!xp[t.type] : e === 'textarea';
  }
  function Go(t, e, l, a) {
    (ga ? (_a ? _a.push(a) : (_a = [a])) : (ga = a),
      (e = _i(e, 'onChange')),
      0 < e.length &&
        ((l = new Ru('onChange', 'change', null, l, a)), t.push({ event: l, listeners: e })));
  }
  var bn = null,
    Sn = null;
  function Ap(t) {
    Tm(t, 0);
  }
  function Du(t) {
    var e = hn(t);
    if (Eo(e)) return t;
  }
  function Yo(t, e) {
    if (t === 'change') return e;
  }
  var Xo = !1;
  if (Je) {
    var _c;
    if (Je) {
      var bc = 'oninput' in document;
      if (!bc) {
        var Qo = document.createElement('div');
        (Qo.setAttribute('oninput', 'return;'), (bc = typeof Qo.oninput == 'function'));
      }
      _c = bc;
    } else _c = !1;
    Xo = _c && (!document.documentMode || 9 < document.documentMode);
  }
  function Vo() {
    bn && (bn.detachEvent('onpropertychange', Zo), (Sn = bn = null));
  }
  function Zo(t) {
    if (t.propertyName === 'value' && Du(Sn)) {
      var e = [];
      (Go(e, Sn, t, oc(t)), Ro(Ap, e));
    }
  }
  function Mp(t, e, l) {
    t === 'focusin'
      ? (Vo(), (bn = e), (Sn = l), bn.attachEvent('onpropertychange', Zo))
      : t === 'focusout' && Vo();
  }
  function Np(t) {
    if (t === 'selectionchange' || t === 'keyup' || t === 'keydown') return Du(Sn);
  }
  function Cp(t, e) {
    if (t === 'click') return Du(e);
  }
  function Rp(t, e) {
    if (t === 'input' || t === 'change') return Du(e);
  }
  function zp(t, e) {
    return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
  }
  var pe = typeof Object.is == 'function' ? Object.is : zp;
  function En(t, e) {
    if (pe(t, e)) return !0;
    if (typeof t != 'object' || t === null || typeof e != 'object' || e === null) return !1;
    var l = Object.keys(t),
      a = Object.keys(e);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var n = l[a];
      if (!Fi.call(e, n) || !pe(t[n], e[n])) return !1;
    }
    return !0;
  }
  function Ko(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Jo(t, e) {
    var l = Ko(t);
    t = 0;
    for (var a; l; ) {
      if (l.nodeType === 3) {
        if (((a = t + l.textContent.length), t <= e && a >= e)) return { node: l, offset: e - t };
        t = a;
      }
      t: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break t;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = Ko(l);
    }
  }
  function $o(t, e) {
    return t && e
      ? t === e
        ? !0
        : t && t.nodeType === 3
          ? !1
          : e && e.nodeType === 3
            ? $o(t, e.parentNode)
            : 'contains' in t
              ? t.contains(e)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(e) & 16)
                : !1
      : !1;
  }
  function Wo(t) {
    t =
      t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var e = xu(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == 'string';
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = xu(t.document);
    }
    return e;
  }
  function Sc(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return (
      e &&
      ((e === 'input' &&
        (t.type === 'text' ||
          t.type === 'search' ||
          t.type === 'tel' ||
          t.type === 'url' ||
          t.type === 'password')) ||
        e === 'textarea' ||
        t.contentEditable === 'true')
    );
  }
  var Dp = Je && 'documentMode' in document && 11 >= document.documentMode,
    Sa = null,
    Ec = null,
    Tn = null,
    Tc = !1;
  function Fo(t, e, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Tc ||
      Sa == null ||
      Sa !== xu(a) ||
      ((a = Sa),
      'selectionStart' in a && Sc(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = ((a.ownerDocument && a.ownerDocument.defaultView) || window).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (Tn && En(Tn, a)) ||
        ((Tn = a),
        (a = _i(Ec, 'onSelect')),
        0 < a.length &&
          ((e = new Ru('onSelect', 'select', null, e, l)),
          t.push({ event: e, listeners: a }),
          (e.target = Sa))));
  }
  function Zl(t, e) {
    var l = {};
    return (
      (l[t.toLowerCase()] = e.toLowerCase()),
      (l['Webkit' + t] = 'webkit' + e),
      (l['Moz' + t] = 'moz' + e),
      l
    );
  }
  var Ea = {
      animationend: Zl('Animation', 'AnimationEnd'),
      animationiteration: Zl('Animation', 'AnimationIteration'),
      animationstart: Zl('Animation', 'AnimationStart'),
      transitionrun: Zl('Transition', 'TransitionRun'),
      transitionstart: Zl('Transition', 'TransitionStart'),
      transitioncancel: Zl('Transition', 'TransitionCancel'),
      transitionend: Zl('Transition', 'TransitionEnd'),
    },
    xc = {},
    Io = {};
  Je &&
    ((Io = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Ea.animationend.animation,
      delete Ea.animationiteration.animation,
      delete Ea.animationstart.animation),
    'TransitionEvent' in window || delete Ea.transitionend.transition);
  function Kl(t) {
    if (xc[t]) return xc[t];
    if (!Ea[t]) return t;
    var e = Ea[t],
      l;
    for (l in e) if (e.hasOwnProperty(l) && l in Io) return (xc[t] = e[l]);
    return t;
  }
  var Po = Kl('animationend'),
    tr = Kl('animationiteration'),
    er = Kl('animationstart'),
    Op = Kl('transitionrun'),
    jp = Kl('transitionstart'),
    Up = Kl('transitioncancel'),
    lr = Kl('transitionend'),
    ar = new Map(),
    Ac =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  Ac.push('scrollEnd');
  function we(t, e) {
    (ar.set(t, e), Ql(e, [t]));
  }
  var Ou =
      typeof reportError == 'function'
        ? reportError
        : function (t) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var e = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof t == 'object' && t !== null && typeof t.message == 'string'
                    ? String(t.message)
                    : String(t),
                error: t,
              });
              if (!window.dispatchEvent(e)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', t);
              return;
            }
            console.error(t);
          },
    Me = [],
    Ta = 0,
    Mc = 0;
  function ju() {
    for (var t = Ta, e = (Mc = Ta = 0); e < t; ) {
      var l = Me[e];
      Me[e++] = null;
      var a = Me[e];
      Me[e++] = null;
      var n = Me[e];
      Me[e++] = null;
      var i = Me[e];
      if (((Me[e++] = null), a !== null && n !== null)) {
        var o = a.pending;
        (o === null ? (n.next = n) : ((n.next = o.next), (o.next = n)), (a.pending = n));
      }
      i !== 0 && nr(l, n, i);
    }
  }
  function Uu(t, e, l, a) {
    ((Me[Ta++] = t),
      (Me[Ta++] = e),
      (Me[Ta++] = l),
      (Me[Ta++] = a),
      (Mc |= a),
      (t.lanes |= a),
      (t = t.alternate),
      t !== null && (t.lanes |= a));
  }
  function Nc(t, e, l, a) {
    return (Uu(t, e, l, a), wu(t));
  }
  function Jl(t, e) {
    return (Uu(t, null, null, e), wu(t));
  }
  function nr(t, e, l) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l);
    for (var n = !1, i = t.return; i !== null; )
      ((i.childLanes |= l),
        (a = i.alternate),
        a !== null && (a.childLanes |= l),
        i.tag === 22 && ((t = i.stateNode), t === null || t._visibility & 1 || (n = !0)),
        (t = i),
        (i = i.return));
    return t.tag === 3
      ? ((i = t.stateNode),
        n &&
          e !== null &&
          ((n = 31 - ye(l)),
          (t = i.hiddenUpdates),
          (a = t[n]),
          a === null ? (t[n] = [e]) : a.push(e),
          (e.lane = l | 536870912)),
        i)
      : null;
  }
  function wu(t) {
    if (50 < Vn) throw ((Vn = 0), (Bs = null), Error(s(185)));
    for (var e = t.return; e !== null; ) ((t = e), (e = t.return));
    return t.tag === 3 ? t.stateNode : null;
  }
  var xa = {};
  function wp(t, e, l, a) {
    ((this.tag = t),
      (this.key = l),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = e),
      (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function ve(t, e, l, a) {
    return new wp(t, e, l, a);
  }
  function Cc(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function $e(t, e) {
    var l = t.alternate;
    return (
      l === null
        ? ((l = ve(t.tag, e, t.key, t.mode)),
          (l.elementType = t.elementType),
          (l.type = t.type),
          (l.stateNode = t.stateNode),
          (l.alternate = t),
          (t.alternate = l))
        : ((l.pendingProps = e),
          (l.type = t.type),
          (l.flags = 0),
          (l.subtreeFlags = 0),
          (l.deletions = null)),
      (l.flags = t.flags & 65011712),
      (l.childLanes = t.childLanes),
      (l.lanes = t.lanes),
      (l.child = t.child),
      (l.memoizedProps = t.memoizedProps),
      (l.memoizedState = t.memoizedState),
      (l.updateQueue = t.updateQueue),
      (e = t.dependencies),
      (l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }),
      (l.sibling = t.sibling),
      (l.index = t.index),
      (l.ref = t.ref),
      (l.refCleanup = t.refCleanup),
      l
    );
  }
  function ur(t, e) {
    t.flags &= 65011714;
    var l = t.alternate;
    return (
      l === null
        ? ((t.childLanes = 0),
          (t.lanes = e),
          (t.child = null),
          (t.subtreeFlags = 0),
          (t.memoizedProps = null),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.dependencies = null),
          (t.stateNode = null))
        : ((t.childLanes = l.childLanes),
          (t.lanes = l.lanes),
          (t.child = l.child),
          (t.subtreeFlags = 0),
          (t.deletions = null),
          (t.memoizedProps = l.memoizedProps),
          (t.memoizedState = l.memoizedState),
          (t.updateQueue = l.updateQueue),
          (t.type = l.type),
          (e = l.dependencies),
          (t.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext })),
      t
    );
  }
  function Bu(t, e, l, a, n, i) {
    var o = 0;
    if (((a = t), typeof t == 'function')) Cc(t) && (o = 1);
    else if (typeof t == 'string')
      o = qv(t, l, W.current) ? 26 : t === 'html' || t === 'head' || t === 'body' ? 27 : 5;
    else
      t: switch (t) {
        case ht:
          return ((t = ve(31, l, e, n)), (t.elementType = ht), (t.lanes = i), t);
        case B:
          return $l(l.children, n, i, e);
        case j:
          ((o = 8), (n |= 24));
          break;
        case O:
          return ((t = ve(12, l, e, n | 2)), (t.elementType = O), (t.lanes = i), t);
        case I:
          return ((t = ve(13, l, e, n)), (t.elementType = I), (t.lanes = i), t);
        case J:
          return ((t = ve(19, l, e, n)), (t.elementType = J), (t.lanes = i), t);
        default:
          if (typeof t == 'object' && t !== null)
            switch (t.$$typeof) {
              case q:
                o = 10;
                break t;
              case X:
                o = 9;
                break t;
              case Q:
                o = 11;
                break t;
              case K:
                o = 14;
                break t;
              case lt:
                ((o = 16), (a = null));
                break t;
            }
          ((o = 29), (l = Error(s(130, t === null ? 'null' : typeof t, ''))), (a = null));
      }
    return ((e = ve(o, l, e, n)), (e.elementType = t), (e.type = a), (e.lanes = i), e);
  }
  function $l(t, e, l, a) {
    return ((t = ve(7, t, a, e)), (t.lanes = l), t);
  }
  function Rc(t, e, l) {
    return ((t = ve(6, t, null, e)), (t.lanes = l), t);
  }
  function ir(t) {
    var e = ve(18, null, null, 0);
    return ((e.stateNode = t), e);
  }
  function zc(t, e, l) {
    return (
      (e = ve(4, t.children !== null ? t.children : [], t.key, e)),
      (e.lanes = l),
      (e.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      e
    );
  }
  var cr = new WeakMap();
  function Ne(t, e) {
    if (typeof t == 'object' && t !== null) {
      var l = cr.get(t);
      return l !== void 0 ? l : ((e = { value: t, source: e, stack: uo(e) }), cr.set(t, e), e);
    }
    return { value: t, source: e, stack: uo(e) };
  }
  var Aa = [],
    Ma = 0,
    ku = null,
    xn = 0,
    Ce = [],
    Re = 0,
    pl = null,
    qe = 1,
    Ge = '';
  function We(t, e) {
    ((Aa[Ma++] = xn), (Aa[Ma++] = ku), (ku = t), (xn = e));
  }
  function sr(t, e, l) {
    ((Ce[Re++] = qe), (Ce[Re++] = Ge), (Ce[Re++] = pl), (pl = t));
    var a = qe;
    t = Ge;
    var n = 32 - ye(a) - 1;
    ((a &= ~(1 << n)), (l += 1));
    var i = 32 - ye(e) + n;
    if (30 < i) {
      var o = n - (n % 5);
      ((i = (a & ((1 << o) - 1)).toString(32)),
        (a >>= o),
        (n -= o),
        (qe = (1 << (32 - ye(e) + n)) | (l << n) | a),
        (Ge = i + t));
    } else ((qe = (1 << i) | (l << n) | a), (Ge = t));
  }
  function Dc(t) {
    t.return !== null && (We(t, 1), sr(t, 1, 0));
  }
  function Oc(t) {
    for (; t === ku; ) ((ku = Aa[--Ma]), (Aa[Ma] = null), (xn = Aa[--Ma]), (Aa[Ma] = null));
    for (; t === pl; )
      ((pl = Ce[--Re]),
        (Ce[Re] = null),
        (Ge = Ce[--Re]),
        (Ce[Re] = null),
        (qe = Ce[--Re]),
        (Ce[Re] = null));
  }
  function fr(t, e) {
    ((Ce[Re++] = qe), (Ce[Re++] = Ge), (Ce[Re++] = pl), (qe = e.id), (Ge = e.overflow), (pl = t));
  }
  var Ft = null,
    Ct = null,
    mt = !1,
    vl = null,
    ze = !1,
    jc = Error(s(519));
  function gl(t) {
    var e = Error(
      s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (An(Ne(e, t)), jc);
  }
  function or(t) {
    var e = t.stateNode,
      l = t.type,
      a = t.memoizedProps;
    switch (((e[Wt] = t), (e[ue] = a), l)) {
      case 'dialog':
        (ot('cancel', e), ot('close', e));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        ot('load', e);
        break;
      case 'video':
      case 'audio':
        for (l = 0; l < Kn.length; l++) ot(Kn[l], e);
        break;
      case 'source':
        ot('error', e);
        break;
      case 'img':
      case 'image':
      case 'link':
        (ot('error', e), ot('load', e));
        break;
      case 'details':
        ot('toggle', e);
        break;
      case 'input':
        (ot('invalid', e),
          To(e, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, !0));
        break;
      case 'select':
        ot('invalid', e);
        break;
      case 'textarea':
        (ot('invalid', e), Ao(e, a.value, a.defaultValue, a.children));
    }
    ((l = a.children),
      (typeof l != 'string' && typeof l != 'number' && typeof l != 'bigint') ||
      e.textContent === '' + l ||
      a.suppressHydrationWarning === !0 ||
      Nm(e.textContent, l)
        ? (a.popover != null && (ot('beforetoggle', e), ot('toggle', e)),
          a.onScroll != null && ot('scroll', e),
          a.onScrollEnd != null && ot('scrollend', e),
          a.onClick != null && (e.onclick = Ke),
          (e = !0))
        : (e = !1),
      e || gl(t, !0));
  }
  function rr(t) {
    for (Ft = t.return; Ft; )
      switch (Ft.tag) {
        case 5:
        case 31:
        case 13:
          ze = !1;
          return;
        case 27:
        case 3:
          ze = !0;
          return;
        default:
          Ft = Ft.return;
      }
  }
  function Na(t) {
    if (t !== Ft) return !1;
    if (!mt) return (rr(t), (mt = !0), !1);
    var e = t.tag,
      l;
    if (
      ((l = e !== 3 && e !== 27) &&
        ((l = e === 5) &&
          ((l = t.type), (l = !(l !== 'form' && l !== 'button') || Fs(t.type, t.memoizedProps))),
        (l = !l)),
      l && Ct && gl(t),
      rr(t),
      e === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(317));
      Ct = Bm(t);
    } else if (e === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(317));
      Ct = Bm(t);
    } else
      e === 27
        ? ((e = Ct), Ol(t.type) ? ((t = lf), (lf = null), (Ct = t)) : (Ct = e))
        : (Ct = Ft ? Oe(t.stateNode.nextSibling) : null);
    return !0;
  }
  function Wl() {
    ((Ct = Ft = null), (mt = !1));
  }
  function Uc() {
    var t = vl;
    return (t !== null && (oe === null ? (oe = t) : oe.push.apply(oe, t), (vl = null)), t);
  }
  function An(t) {
    vl === null ? (vl = [t]) : vl.push(t);
  }
  var wc = b(null),
    Fl = null,
    Fe = null;
  function _l(t, e, l) {
    (Z(wc, e._currentValue), (e._currentValue = l));
  }
  function Ie(t) {
    ((t._currentValue = wc.current), H(wc));
  }
  function Bc(t, e, l) {
    for (; t !== null; ) {
      var a = t.alternate;
      if (
        ((t.childLanes & e) !== e
          ? ((t.childLanes |= e), a !== null && (a.childLanes |= e))
          : a !== null && (a.childLanes & e) !== e && (a.childLanes |= e),
        t === l)
      )
        break;
      t = t.return;
    }
  }
  function kc(t, e, l, a) {
    var n = t.child;
    for (n !== null && (n.return = t); n !== null; ) {
      var i = n.dependencies;
      if (i !== null) {
        var o = n.child;
        i = i.firstContext;
        t: for (; i !== null; ) {
          var d = i;
          i = n;
          for (var g = 0; g < e.length; g++)
            if (d.context === e[g]) {
              ((i.lanes |= l),
                (d = i.alternate),
                d !== null && (d.lanes |= l),
                Bc(i.return, l, t),
                a || (o = null));
              break t;
            }
          i = d.next;
        }
      } else if (n.tag === 18) {
        if (((o = n.return), o === null)) throw Error(s(341));
        ((o.lanes |= l), (i = o.alternate), i !== null && (i.lanes |= l), Bc(o, l, t), (o = null));
      } else o = n.child;
      if (o !== null) o.return = n;
      else
        for (o = n; o !== null; ) {
          if (o === t) {
            o = null;
            break;
          }
          if (((n = o.sibling), n !== null)) {
            ((n.return = o.return), (o = n));
            break;
          }
          o = o.return;
        }
      n = o;
    }
  }
  function Ca(t, e, l, a) {
    t = null;
    for (var n = e, i = !1; n !== null; ) {
      if (!i) {
        if ((n.flags & 524288) !== 0) i = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var o = n.alternate;
        if (o === null) throw Error(s(387));
        if (((o = o.memoizedProps), o !== null)) {
          var d = n.type;
          pe(n.pendingProps.value, o.value) || (t !== null ? t.push(d) : (t = [d]));
        }
      } else if (n === bt.current) {
        if (((o = n.alternate), o === null)) throw Error(s(387));
        o.memoizedState.memoizedState !== n.memoizedState.memoizedState &&
          (t !== null ? t.push(In) : (t = [In]));
      }
      n = n.return;
    }
    (t !== null && kc(e, t, l, a), (e.flags |= 262144));
  }
  function Hu(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!pe(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function Il(t) {
    ((Fl = t), (Fe = null), (t = t.dependencies), t !== null && (t.firstContext = null));
  }
  function It(t) {
    return dr(Fl, t);
  }
  function Lu(t, e) {
    return (Fl === null && Il(t), dr(t, e));
  }
  function dr(t, e) {
    var l = e._currentValue;
    if (((e = { context: e, memoizedValue: l, next: null }), Fe === null)) {
      if (t === null) throw Error(s(308));
      ((Fe = e), (t.dependencies = { lanes: 0, firstContext: e }), (t.flags |= 524288));
    } else Fe = Fe.next = e;
    return l;
  }
  var Bp =
      typeof AbortController < 'u'
        ? AbortController
        : function () {
            var t = [],
              e = (this.signal = {
                aborted: !1,
                addEventListener: function (l, a) {
                  t.push(a);
                },
              });
            this.abort = function () {
              ((e.aborted = !0),
                t.forEach(function (l) {
                  return l();
                }));
            };
          },
    kp = u.unstable_scheduleCallback,
    Hp = u.unstable_NormalPriority,
    Gt = {
      $$typeof: q,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Hc() {
    return { controller: new Bp(), data: new Map(), refCount: 0 };
  }
  function Mn(t) {
    (t.refCount--,
      t.refCount === 0 &&
        kp(Hp, function () {
          t.controller.abort();
        }));
  }
  var Nn = null,
    Lc = 0,
    Ra = 0,
    za = null;
  function Lp(t, e) {
    if (Nn === null) {
      var l = (Nn = []);
      ((Lc = 0),
        (Ra = Ys()),
        (za = {
          status: 'pending',
          value: void 0,
          then: function (a) {
            l.push(a);
          },
        }));
    }
    return (Lc++, e.then(mr, mr), e);
  }
  function mr() {
    if (--Lc === 0 && Nn !== null) {
      za !== null && (za.status = 'fulfilled');
      var t = Nn;
      ((Nn = null), (Ra = 0), (za = null));
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function qp(t, e) {
    var l = [],
      a = {
        status: 'pending',
        value: null,
        reason: null,
        then: function (n) {
          l.push(n);
        },
      };
    return (
      t.then(
        function () {
          ((a.status = 'fulfilled'), (a.value = e));
          for (var n = 0; n < l.length; n++) (0, l[n])(e);
        },
        function (n) {
          for (a.status = 'rejected', a.reason = n, n = 0; n < l.length; n++) (0, l[n])(void 0);
        }
      ),
      a
    );
  }
  var hr = w.S;
  w.S = function (t, e) {
    ((Fd = me()),
      typeof e == 'object' && e !== null && typeof e.then == 'function' && Lp(t, e),
      hr !== null && hr(t, e));
  };
  var Pl = b(null);
  function qc() {
    var t = Pl.current;
    return t !== null ? t : Mt.pooledCache;
  }
  function qu(t, e) {
    e === null ? Z(Pl, Pl.current) : Z(Pl, e.pool);
  }
  function yr() {
    var t = qc();
    return t === null ? null : { parent: Gt._currentValue, pool: t };
  }
  var Da = Error(s(460)),
    Gc = Error(s(474)),
    Gu = Error(s(542)),
    Yu = { then: function () {} };
  function pr(t) {
    return ((t = t.status), t === 'fulfilled' || t === 'rejected');
  }
  function vr(t, e, l) {
    switch (
      ((l = t[l]), l === void 0 ? t.push(e) : l !== e && (e.then(Ke, Ke), (e = l)), e.status)
    ) {
      case 'fulfilled':
        return e.value;
      case 'rejected':
        throw ((t = e.reason), _r(t), t);
      default:
        if (typeof e.status == 'string') e.then(Ke, Ke);
        else {
          if (((t = Mt), t !== null && 100 < t.shellSuspendCounter)) throw Error(s(482));
          ((t = e),
            (t.status = 'pending'),
            t.then(
              function (a) {
                if (e.status === 'pending') {
                  var n = e;
                  ((n.status = 'fulfilled'), (n.value = a));
                }
              },
              function (a) {
                if (e.status === 'pending') {
                  var n = e;
                  ((n.status = 'rejected'), (n.reason = a));
                }
              }
            ));
        }
        switch (e.status) {
          case 'fulfilled':
            return e.value;
          case 'rejected':
            throw ((t = e.reason), _r(t), t);
        }
        throw ((ea = e), Da);
    }
  }
  function ta(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == 'object' && typeof l.then == 'function' ? ((ea = l), Da) : l;
    }
  }
  var ea = null;
  function gr() {
    if (ea === null) throw Error(s(459));
    var t = ea;
    return ((ea = null), t);
  }
  function _r(t) {
    if (t === Da || t === Gu) throw Error(s(483));
  }
  var Oa = null,
    Cn = 0;
  function Xu(t) {
    var e = Cn;
    return ((Cn += 1), Oa === null && (Oa = []), vr(Oa, t, e));
  }
  function Rn(t, e) {
    ((e = e.props.ref), (t.ref = e !== void 0 ? e : null));
  }
  function Qu(t, e) {
    throw e.$$typeof === M
      ? Error(s(525))
      : ((t = Object.prototype.toString.call(e)),
        Error(
          s(
            31,
            t === '[object Object]' ? 'object with keys {' + Object.keys(e).join(', ') + '}' : t
          )
        ));
  }
  function br(t) {
    function e(x, S) {
      if (t) {
        var N = x.deletions;
        N === null ? ((x.deletions = [S]), (x.flags |= 16)) : N.push(S);
      }
    }
    function l(x, S) {
      if (!t) return null;
      for (; S !== null; ) (e(x, S), (S = S.sibling));
      return null;
    }
    function a(x) {
      for (var S = new Map(); x !== null; )
        (x.key !== null ? S.set(x.key, x) : S.set(x.index, x), (x = x.sibling));
      return S;
    }
    function n(x, S) {
      return ((x = $e(x, S)), (x.index = 0), (x.sibling = null), x);
    }
    function i(x, S, N) {
      return (
        (x.index = N),
        t
          ? ((N = x.alternate),
            N !== null
              ? ((N = N.index), N < S ? ((x.flags |= 67108866), S) : N)
              : ((x.flags |= 67108866), S))
          : ((x.flags |= 1048576), S)
      );
    }
    function o(x) {
      return (t && x.alternate === null && (x.flags |= 67108866), x);
    }
    function d(x, S, N, k) {
      return S === null || S.tag !== 6
        ? ((S = Rc(N, x.mode, k)), (S.return = x), S)
        : ((S = n(S, N)), (S.return = x), S);
    }
    function g(x, S, N, k) {
      var P = N.type;
      return P === B
        ? U(x, S, N.props.children, k, N.key)
        : S !== null &&
            (S.elementType === P ||
              (typeof P == 'object' && P !== null && P.$$typeof === lt && ta(P) === S.type))
          ? ((S = n(S, N.props)), Rn(S, N), (S.return = x), S)
          : ((S = Bu(N.type, N.key, N.props, null, x.mode, k)), Rn(S, N), (S.return = x), S);
    }
    function C(x, S, N, k) {
      return S === null ||
        S.tag !== 4 ||
        S.stateNode.containerInfo !== N.containerInfo ||
        S.stateNode.implementation !== N.implementation
        ? ((S = zc(N, x.mode, k)), (S.return = x), S)
        : ((S = n(S, N.children || [])), (S.return = x), S);
    }
    function U(x, S, N, k, P) {
      return S === null || S.tag !== 7
        ? ((S = $l(N, x.mode, k, P)), (S.return = x), S)
        : ((S = n(S, N)), (S.return = x), S);
    }
    function L(x, S, N) {
      if ((typeof S == 'string' && S !== '') || typeof S == 'number' || typeof S == 'bigint')
        return ((S = Rc('' + S, x.mode, N)), (S.return = x), S);
      if (typeof S == 'object' && S !== null) {
        switch (S.$$typeof) {
          case G:
            return ((N = Bu(S.type, S.key, S.props, null, x.mode, N)), Rn(N, S), (N.return = x), N);
          case Y:
            return ((S = zc(S, x.mode, N)), (S.return = x), S);
          case lt:
            return ((S = ta(S)), L(x, S, N));
        }
        if (jt(S) || Vt(S)) return ((S = $l(S, x.mode, N, null)), (S.return = x), S);
        if (typeof S.then == 'function') return L(x, Xu(S), N);
        if (S.$$typeof === q) return L(x, Lu(x, S), N);
        Qu(x, S);
      }
      return null;
    }
    function z(x, S, N, k) {
      var P = S !== null ? S.key : null;
      if ((typeof N == 'string' && N !== '') || typeof N == 'number' || typeof N == 'bigint')
        return P !== null ? null : d(x, S, '' + N, k);
      if (typeof N == 'object' && N !== null) {
        switch (N.$$typeof) {
          case G:
            return N.key === P ? g(x, S, N, k) : null;
          case Y:
            return N.key === P ? C(x, S, N, k) : null;
          case lt:
            return ((N = ta(N)), z(x, S, N, k));
        }
        if (jt(N) || Vt(N)) return P !== null ? null : U(x, S, N, k, null);
        if (typeof N.then == 'function') return z(x, S, Xu(N), k);
        if (N.$$typeof === q) return z(x, S, Lu(x, N), k);
        Qu(x, N);
      }
      return null;
    }
    function D(x, S, N, k, P) {
      if ((typeof k == 'string' && k !== '') || typeof k == 'number' || typeof k == 'bigint')
        return ((x = x.get(N) || null), d(S, x, '' + k, P));
      if (typeof k == 'object' && k !== null) {
        switch (k.$$typeof) {
          case G:
            return ((x = x.get(k.key === null ? N : k.key) || null), g(S, x, k, P));
          case Y:
            return ((x = x.get(k.key === null ? N : k.key) || null), C(S, x, k, P));
          case lt:
            return ((k = ta(k)), D(x, S, N, k, P));
        }
        if (jt(k) || Vt(k)) return ((x = x.get(N) || null), U(S, x, k, P, null));
        if (typeof k.then == 'function') return D(x, S, N, Xu(k), P);
        if (k.$$typeof === q) return D(x, S, N, Lu(S, k), P);
        Qu(S, k);
      }
      return null;
    }
    function $(x, S, N, k) {
      for (
        var P = null, pt = null, F = S, ct = (S = 0), dt = null;
        F !== null && ct < N.length;
        ct++
      ) {
        F.index > ct ? ((dt = F), (F = null)) : (dt = F.sibling);
        var vt = z(x, F, N[ct], k);
        if (vt === null) {
          F === null && (F = dt);
          break;
        }
        (t && F && vt.alternate === null && e(x, F),
          (S = i(vt, S, ct)),
          pt === null ? (P = vt) : (pt.sibling = vt),
          (pt = vt),
          (F = dt));
      }
      if (ct === N.length) return (l(x, F), mt && We(x, ct), P);
      if (F === null) {
        for (; ct < N.length; ct++)
          ((F = L(x, N[ct], k)),
            F !== null && ((S = i(F, S, ct)), pt === null ? (P = F) : (pt.sibling = F), (pt = F)));
        return (mt && We(x, ct), P);
      }
      for (F = a(F); ct < N.length; ct++)
        ((dt = D(F, x, ct, N[ct], k)),
          dt !== null &&
            (t && dt.alternate !== null && F.delete(dt.key === null ? ct : dt.key),
            (S = i(dt, S, ct)),
            pt === null ? (P = dt) : (pt.sibling = dt),
            (pt = dt)));
      return (
        t &&
          F.forEach(function (kl) {
            return e(x, kl);
          }),
        mt && We(x, ct),
        P
      );
    }
    function tt(x, S, N, k) {
      if (N == null) throw Error(s(151));
      for (
        var P = null, pt = null, F = S, ct = (S = 0), dt = null, vt = N.next();
        F !== null && !vt.done;
        ct++, vt = N.next()
      ) {
        F.index > ct ? ((dt = F), (F = null)) : (dt = F.sibling);
        var kl = z(x, F, vt.value, k);
        if (kl === null) {
          F === null && (F = dt);
          break;
        }
        (t && F && kl.alternate === null && e(x, F),
          (S = i(kl, S, ct)),
          pt === null ? (P = kl) : (pt.sibling = kl),
          (pt = kl),
          (F = dt));
      }
      if (vt.done) return (l(x, F), mt && We(x, ct), P);
      if (F === null) {
        for (; !vt.done; ct++, vt = N.next())
          ((vt = L(x, vt.value, k)),
            vt !== null &&
              ((S = i(vt, S, ct)), pt === null ? (P = vt) : (pt.sibling = vt), (pt = vt)));
        return (mt && We(x, ct), P);
      }
      for (F = a(F); !vt.done; ct++, vt = N.next())
        ((vt = D(F, x, ct, vt.value, k)),
          vt !== null &&
            (t && vt.alternate !== null && F.delete(vt.key === null ? ct : vt.key),
            (S = i(vt, S, ct)),
            pt === null ? (P = vt) : (pt.sibling = vt),
            (pt = vt)));
      return (
        t &&
          F.forEach(function (Fv) {
            return e(x, Fv);
          }),
        mt && We(x, ct),
        P
      );
    }
    function At(x, S, N, k) {
      if (
        (typeof N == 'object' &&
          N !== null &&
          N.type === B &&
          N.key === null &&
          (N = N.props.children),
        typeof N == 'object' && N !== null)
      ) {
        switch (N.$$typeof) {
          case G:
            t: {
              for (var P = N.key; S !== null; ) {
                if (S.key === P) {
                  if (((P = N.type), P === B)) {
                    if (S.tag === 7) {
                      (l(x, S.sibling), (k = n(S, N.props.children)), (k.return = x), (x = k));
                      break t;
                    }
                  } else if (
                    S.elementType === P ||
                    (typeof P == 'object' && P !== null && P.$$typeof === lt && ta(P) === S.type)
                  ) {
                    (l(x, S.sibling), (k = n(S, N.props)), Rn(k, N), (k.return = x), (x = k));
                    break t;
                  }
                  l(x, S);
                  break;
                } else e(x, S);
                S = S.sibling;
              }
              N.type === B
                ? ((k = $l(N.props.children, x.mode, k, N.key)), (k.return = x), (x = k))
                : ((k = Bu(N.type, N.key, N.props, null, x.mode, k)),
                  Rn(k, N),
                  (k.return = x),
                  (x = k));
            }
            return o(x);
          case Y:
            t: {
              for (P = N.key; S !== null; ) {
                if (S.key === P)
                  if (
                    S.tag === 4 &&
                    S.stateNode.containerInfo === N.containerInfo &&
                    S.stateNode.implementation === N.implementation
                  ) {
                    (l(x, S.sibling), (k = n(S, N.children || [])), (k.return = x), (x = k));
                    break t;
                  } else {
                    l(x, S);
                    break;
                  }
                else e(x, S);
                S = S.sibling;
              }
              ((k = zc(N, x.mode, k)), (k.return = x), (x = k));
            }
            return o(x);
          case lt:
            return ((N = ta(N)), At(x, S, N, k));
        }
        if (jt(N)) return $(x, S, N, k);
        if (Vt(N)) {
          if (((P = Vt(N)), typeof P != 'function')) throw Error(s(150));
          return ((N = P.call(N)), tt(x, S, N, k));
        }
        if (typeof N.then == 'function') return At(x, S, Xu(N), k);
        if (N.$$typeof === q) return At(x, S, Lu(x, N), k);
        Qu(x, N);
      }
      return (typeof N == 'string' && N !== '') || typeof N == 'number' || typeof N == 'bigint'
        ? ((N = '' + N),
          S !== null && S.tag === 6
            ? (l(x, S.sibling), (k = n(S, N)), (k.return = x), (x = k))
            : (l(x, S), (k = Rc(N, x.mode, k)), (k.return = x), (x = k)),
          o(x))
        : l(x, S);
    }
    return function (x, S, N, k) {
      try {
        Cn = 0;
        var P = At(x, S, N, k);
        return ((Oa = null), P);
      } catch (F) {
        if (F === Da || F === Gu) throw F;
        var pt = ve(29, F, null, x.mode);
        return ((pt.lanes = k), (pt.return = x), pt);
      } finally {
      }
    };
  }
  var la = br(!0),
    Sr = br(!1),
    bl = !1;
  function Yc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Xc(t, e) {
    ((t = t.updateQueue),
      e.updateQueue === t &&
        (e.updateQueue = {
          baseState: t.baseState,
          firstBaseUpdate: t.firstBaseUpdate,
          lastBaseUpdate: t.lastBaseUpdate,
          shared: t.shared,
          callbacks: null,
        }));
  }
  function Sl(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function El(t, e, l) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (gt & 2) !== 0)) {
      var n = a.pending;
      return (
        n === null ? (e.next = e) : ((e.next = n.next), (n.next = e)),
        (a.pending = e),
        (e = wu(t)),
        nr(t, null, l),
        e
      );
    }
    return (Uu(t, a, e, l), wu(t));
  }
  function zn(t, e, l) {
    if (((e = e.updateQueue), e !== null && ((e = e.shared), (l & 4194048) !== 0))) {
      var a = e.lanes;
      ((a &= t.pendingLanes), (l |= a), (e.lanes = l), ro(t, l));
    }
  }
  function Qc(t, e) {
    var l = t.updateQueue,
      a = t.alternate;
    if (a !== null && ((a = a.updateQueue), l === a)) {
      var n = null,
        i = null;
      if (((l = l.firstBaseUpdate), l !== null)) {
        do {
          var o = { lane: l.lane, tag: l.tag, payload: l.payload, callback: null, next: null };
          (i === null ? (n = i = o) : (i = i.next = o), (l = l.next));
        } while (l !== null);
        i === null ? (n = i = e) : (i = i.next = e);
      } else n = i = e;
      ((l = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: i,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (t.updateQueue = l));
      return;
    }
    ((t = l.lastBaseUpdate),
      t === null ? (l.firstBaseUpdate = e) : (t.next = e),
      (l.lastBaseUpdate = e));
  }
  var Vc = !1;
  function Dn() {
    if (Vc) {
      var t = za;
      if (t !== null) throw t;
    }
  }
  function On(t, e, l, a) {
    Vc = !1;
    var n = t.updateQueue;
    bl = !1;
    var i = n.firstBaseUpdate,
      o = n.lastBaseUpdate,
      d = n.shared.pending;
    if (d !== null) {
      n.shared.pending = null;
      var g = d,
        C = g.next;
      ((g.next = null), o === null ? (i = C) : (o.next = C), (o = g));
      var U = t.alternate;
      U !== null &&
        ((U = U.updateQueue),
        (d = U.lastBaseUpdate),
        d !== o && (d === null ? (U.firstBaseUpdate = C) : (d.next = C), (U.lastBaseUpdate = g)));
    }
    if (i !== null) {
      var L = n.baseState;
      ((o = 0), (U = C = g = null), (d = i));
      do {
        var z = d.lane & -536870913,
          D = z !== d.lane;
        if (D ? (rt & z) === z : (a & z) === z) {
          (z !== 0 && z === Ra && (Vc = !0),
            U !== null &&
              (U = U.next =
                { lane: 0, tag: d.tag, payload: d.payload, callback: null, next: null }));
          t: {
            var $ = t,
              tt = d;
            z = e;
            var At = l;
            switch (tt.tag) {
              case 1:
                if ((($ = tt.payload), typeof $ == 'function')) {
                  L = $.call(At, L, z);
                  break t;
                }
                L = $;
                break t;
              case 3:
                $.flags = ($.flags & -65537) | 128;
              case 0:
                if (
                  (($ = tt.payload), (z = typeof $ == 'function' ? $.call(At, L, z) : $), z == null)
                )
                  break t;
                L = _({}, L, z);
                break t;
              case 2:
                bl = !0;
            }
          }
          ((z = d.callback),
            z !== null &&
              ((t.flags |= 64),
              D && (t.flags |= 8192),
              (D = n.callbacks),
              D === null ? (n.callbacks = [z]) : D.push(z)));
        } else
          ((D = { lane: z, tag: d.tag, payload: d.payload, callback: d.callback, next: null }),
            U === null ? ((C = U = D), (g = L)) : (U = U.next = D),
            (o |= z));
        if (((d = d.next), d === null)) {
          if (((d = n.shared.pending), d === null)) break;
          ((D = d),
            (d = D.next),
            (D.next = null),
            (n.lastBaseUpdate = D),
            (n.shared.pending = null));
        }
      } while (!0);
      (U === null && (g = L),
        (n.baseState = g),
        (n.firstBaseUpdate = C),
        (n.lastBaseUpdate = U),
        i === null && (n.shared.lanes = 0),
        (Nl |= o),
        (t.lanes = o),
        (t.memoizedState = L));
    }
  }
  function Er(t, e) {
    if (typeof t != 'function') throw Error(s(191, t));
    t.call(e);
  }
  function Tr(t, e) {
    var l = t.callbacks;
    if (l !== null) for (t.callbacks = null, t = 0; t < l.length; t++) Er(l[t], e);
  }
  var ja = b(null),
    Vu = b(0);
  function xr(t, e) {
    ((t = cl), Z(Vu, t), Z(ja, e), (cl = t | e.baseLanes));
  }
  function Zc() {
    (Z(Vu, cl), Z(ja, ja.current));
  }
  function Kc() {
    ((cl = Vu.current), H(ja), H(Vu));
  }
  var ge = b(null),
    De = null;
  function Tl(t) {
    var e = t.alternate;
    (Z(Ht, Ht.current & 1),
      Z(ge, t),
      De === null && (e === null || ja.current !== null || e.memoizedState !== null) && (De = t));
  }
  function Jc(t) {
    (Z(Ht, Ht.current), Z(ge, t), De === null && (De = t));
  }
  function Ar(t) {
    t.tag === 22 ? (Z(Ht, Ht.current), Z(ge, t), De === null && (De = t)) : xl();
  }
  function xl() {
    (Z(Ht, Ht.current), Z(ge, ge.current));
  }
  function _e(t) {
    (H(ge), De === t && (De = null), H(Ht));
  }
  var Ht = b(0);
  function Zu(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && ((l = l.dehydrated), l === null || tf(l) || ef(l))) return e;
      } else if (
        e.tag === 19 &&
        (e.memoizedProps.revealOrder === 'forwards' ||
          e.memoizedProps.revealOrder === 'backwards' ||
          e.memoizedProps.revealOrder === 'unstable_legacy-backwards' ||
          e.memoizedProps.revealOrder === 'together')
      ) {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        ((e.child.return = e), (e = e.child));
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      ((e.sibling.return = e.return), (e = e.sibling));
    }
    return null;
  }
  var Pe = 0,
    ut = null,
    Tt = null,
    Yt = null,
    Ku = !1,
    Ua = !1,
    aa = !1,
    Ju = 0,
    jn = 0,
    wa = null,
    Gp = 0;
  function wt() {
    throw Error(s(321));
  }
  function $c(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++) if (!pe(t[l], e[l])) return !1;
    return !0;
  }
  function Wc(t, e, l, a, n, i) {
    return (
      (Pe = i),
      (ut = e),
      (e.memoizedState = null),
      (e.updateQueue = null),
      (e.lanes = 0),
      (w.H = t === null || t.memoizedState === null ? sd : rs),
      (aa = !1),
      (i = l(a, n)),
      (aa = !1),
      Ua && (i = Nr(e, l, a, n)),
      Mr(t),
      i
    );
  }
  function Mr(t) {
    w.H = Bn;
    var e = Tt !== null && Tt.next !== null;
    if (((Pe = 0), (Yt = Tt = ut = null), (Ku = !1), (jn = 0), (wa = null), e)) throw Error(s(300));
    t === null || Xt || ((t = t.dependencies), t !== null && Hu(t) && (Xt = !0));
  }
  function Nr(t, e, l, a) {
    ut = t;
    var n = 0;
    do {
      if ((Ua && (wa = null), (jn = 0), (Ua = !1), 25 <= n)) throw Error(s(301));
      if (((n += 1), (Yt = Tt = null), t.updateQueue != null)) {
        var i = t.updateQueue;
        ((i.lastEffect = null),
          (i.events = null),
          (i.stores = null),
          i.memoCache != null && (i.memoCache.index = 0));
      }
      ((w.H = fd), (i = e(l, a)));
    } while (Ua);
    return i;
  }
  function Yp() {
    var t = w.H,
      e = t.useState()[0];
    return (
      (e = typeof e.then == 'function' ? Un(e) : e),
      (t = t.useState()[0]),
      (Tt !== null ? Tt.memoizedState : null) !== t && (ut.flags |= 1024),
      e
    );
  }
  function Fc() {
    var t = Ju !== 0;
    return ((Ju = 0), t);
  }
  function Ic(t, e, l) {
    ((e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~l));
  }
  function Pc(t) {
    if (Ku) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        (e !== null && (e.pending = null), (t = t.next));
      }
      Ku = !1;
    }
    ((Pe = 0), (Yt = Tt = ut = null), (Ua = !1), (jn = Ju = 0), (wa = null));
  }
  function ae() {
    var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (Yt === null ? (ut.memoizedState = Yt = t) : (Yt = Yt.next = t), Yt);
  }
  function Lt() {
    if (Tt === null) {
      var t = ut.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Tt.next;
    var e = Yt === null ? ut.memoizedState : Yt.next;
    if (e !== null) ((Yt = e), (Tt = t));
    else {
      if (t === null) throw ut.alternate === null ? Error(s(467)) : Error(s(310));
      ((Tt = t),
        (t = {
          memoizedState: Tt.memoizedState,
          baseState: Tt.baseState,
          baseQueue: Tt.baseQueue,
          queue: Tt.queue,
          next: null,
        }),
        Yt === null ? (ut.memoizedState = Yt = t) : (Yt = Yt.next = t));
    }
    return Yt;
  }
  function $u() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Un(t) {
    var e = jn;
    return (
      (jn += 1),
      wa === null && (wa = []),
      (t = vr(wa, t, e)),
      (e = ut),
      (Yt === null ? e.memoizedState : Yt.next) === null &&
        ((e = e.alternate), (w.H = e === null || e.memoizedState === null ? sd : rs)),
      t
    );
  }
  function Wu(t) {
    if (t !== null && typeof t == 'object') {
      if (typeof t.then == 'function') return Un(t);
      if (t.$$typeof === q) return It(t);
    }
    throw Error(s(438, String(t)));
  }
  function ts(t) {
    var e = null,
      l = ut.updateQueue;
    if ((l !== null && (e = l.memoCache), e == null)) {
      var a = ut.alternate;
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (e = {
              data: a.data.map(function (n) {
                return n.slice();
              }),
              index: 0,
            })));
    }
    if (
      (e == null && (e = { data: [], index: 0 }),
      l === null && ((l = $u()), (ut.updateQueue = l)),
      (l.memoCache = e),
      (l = e.data[e.index]),
      l === void 0)
    )
      for (l = e.data[e.index] = Array(t), a = 0; a < t; a++) l[a] = _t;
    return (e.index++, l);
  }
  function tl(t, e) {
    return typeof e == 'function' ? e(t) : e;
  }
  function Fu(t) {
    var e = Lt();
    return es(e, Tt, t);
  }
  function es(t, e, l) {
    var a = t.queue;
    if (a === null) throw Error(s(311));
    a.lastRenderedReducer = l;
    var n = t.baseQueue,
      i = a.pending;
    if (i !== null) {
      if (n !== null) {
        var o = n.next;
        ((n.next = i.next), (i.next = o));
      }
      ((e.baseQueue = n = i), (a.pending = null));
    }
    if (((i = t.baseState), n === null)) t.memoizedState = i;
    else {
      e = n.next;
      var d = (o = null),
        g = null,
        C = e,
        U = !1;
      do {
        var L = C.lane & -536870913;
        if (L !== C.lane ? (rt & L) === L : (Pe & L) === L) {
          var z = C.revertLane;
          if (z === 0)
            (g !== null &&
              (g = g.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: C.action,
                  hasEagerState: C.hasEagerState,
                  eagerState: C.eagerState,
                  next: null,
                }),
              L === Ra && (U = !0));
          else if ((Pe & z) === z) {
            ((C = C.next), z === Ra && (U = !0));
            continue;
          } else
            ((L = {
              lane: 0,
              revertLane: C.revertLane,
              gesture: null,
              action: C.action,
              hasEagerState: C.hasEagerState,
              eagerState: C.eagerState,
              next: null,
            }),
              g === null ? ((d = g = L), (o = i)) : (g = g.next = L),
              (ut.lanes |= z),
              (Nl |= z));
          ((L = C.action), aa && l(i, L), (i = C.hasEagerState ? C.eagerState : l(i, L)));
        } else
          ((z = {
            lane: L,
            revertLane: C.revertLane,
            gesture: C.gesture,
            action: C.action,
            hasEagerState: C.hasEagerState,
            eagerState: C.eagerState,
            next: null,
          }),
            g === null ? ((d = g = z), (o = i)) : (g = g.next = z),
            (ut.lanes |= L),
            (Nl |= L));
        C = C.next;
      } while (C !== null && C !== e);
      if (
        (g === null ? (o = i) : (g.next = d),
        !pe(i, t.memoizedState) && ((Xt = !0), U && ((l = za), l !== null)))
      )
        throw l;
      ((t.memoizedState = i), (t.baseState = o), (t.baseQueue = g), (a.lastRenderedState = i));
    }
    return (n === null && (a.lanes = 0), [t.memoizedState, a.dispatch]);
  }
  function ls(t) {
    var e = Lt(),
      l = e.queue;
    if (l === null) throw Error(s(311));
    l.lastRenderedReducer = t;
    var a = l.dispatch,
      n = l.pending,
      i = e.memoizedState;
    if (n !== null) {
      l.pending = null;
      var o = (n = n.next);
      do ((i = t(i, o.action)), (o = o.next));
      while (o !== n);
      (pe(i, e.memoizedState) || (Xt = !0),
        (e.memoizedState = i),
        e.baseQueue === null && (e.baseState = i),
        (l.lastRenderedState = i));
    }
    return [i, a];
  }
  function Cr(t, e, l) {
    var a = ut,
      n = Lt(),
      i = mt;
    if (i) {
      if (l === void 0) throw Error(s(407));
      l = l();
    } else l = e();
    var o = !pe((Tt || n).memoizedState, l);
    if (
      (o && ((n.memoizedState = l), (Xt = !0)),
      (n = n.queue),
      us(Dr.bind(null, a, n, t), [t]),
      n.getSnapshot !== e || o || (Yt !== null && Yt.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        Ba(9, { destroy: void 0 }, zr.bind(null, a, n, l, e), null),
        Mt === null)
      )
        throw Error(s(349));
      i || (Pe & 127) !== 0 || Rr(a, e, l);
    }
    return l;
  }
  function Rr(t, e, l) {
    ((t.flags |= 16384),
      (t = { getSnapshot: e, value: l }),
      (e = ut.updateQueue),
      e === null
        ? ((e = $u()), (ut.updateQueue = e), (e.stores = [t]))
        : ((l = e.stores), l === null ? (e.stores = [t]) : l.push(t)));
  }
  function zr(t, e, l, a) {
    ((e.value = l), (e.getSnapshot = a), Or(e) && jr(t));
  }
  function Dr(t, e, l) {
    return l(function () {
      Or(e) && jr(t);
    });
  }
  function Or(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !pe(t, l);
    } catch {
      return !0;
    }
  }
  function jr(t) {
    var e = Jl(t, 2);
    e !== null && re(e, t, 2);
  }
  function as(t) {
    var e = ae();
    if (typeof t == 'function') {
      var l = t;
      if (((t = l()), aa)) {
        ml(!0);
        try {
          l();
        } finally {
          ml(!1);
        }
      }
    }
    return (
      (e.memoizedState = e.baseState = t),
      (e.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: tl,
        lastRenderedState: t,
      }),
      e
    );
  }
  function Ur(t, e, l, a) {
    return ((t.baseState = l), es(t, Tt, typeof a == 'function' ? a : tl));
  }
  function Xp(t, e, l, a, n) {
    if (ti(t)) throw Error(s(485));
    if (((t = e.action), t !== null)) {
      var i = {
        payload: n,
        action: t,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (o) {
          i.listeners.push(o);
        },
      };
      (w.T !== null ? l(!0) : (i.isTransition = !1),
        a(i),
        (l = e.pending),
        l === null
          ? ((i.next = e.pending = i), wr(e, i))
          : ((i.next = l.next), (e.pending = l.next = i)));
    }
  }
  function wr(t, e) {
    var l = e.action,
      a = e.payload,
      n = t.state;
    if (e.isTransition) {
      var i = w.T,
        o = {};
      w.T = o;
      try {
        var d = l(n, a),
          g = w.S;
        (g !== null && g(o, d), Br(t, e, d));
      } catch (C) {
        ns(t, e, C);
      } finally {
        (i !== null && o.types !== null && (i.types = o.types), (w.T = i));
      }
    } else
      try {
        ((i = l(n, a)), Br(t, e, i));
      } catch (C) {
        ns(t, e, C);
      }
  }
  function Br(t, e, l) {
    l !== null && typeof l == 'object' && typeof l.then == 'function'
      ? l.then(
          function (a) {
            kr(t, e, a);
          },
          function (a) {
            return ns(t, e, a);
          }
        )
      : kr(t, e, l);
  }
  function kr(t, e, l) {
    ((e.status = 'fulfilled'),
      (e.value = l),
      Hr(e),
      (t.state = l),
      (e = t.pending),
      e !== null &&
        ((l = e.next), l === e ? (t.pending = null) : ((l = l.next), (e.next = l), wr(t, l))));
  }
  function ns(t, e, l) {
    var a = t.pending;
    if (((t.pending = null), a !== null)) {
      a = a.next;
      do ((e.status = 'rejected'), (e.reason = l), Hr(e), (e = e.next));
      while (e !== a);
    }
    t.action = null;
  }
  function Hr(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function Lr(t, e) {
    return e;
  }
  function qr(t, e) {
    if (mt) {
      var l = Mt.formState;
      if (l !== null) {
        t: {
          var a = ut;
          if (mt) {
            if (Ct) {
              e: {
                for (var n = Ct, i = ze; n.nodeType !== 8; ) {
                  if (!i) {
                    n = null;
                    break e;
                  }
                  if (((n = Oe(n.nextSibling)), n === null)) {
                    n = null;
                    break e;
                  }
                }
                ((i = n.data), (n = i === 'F!' || i === 'F' ? n : null));
              }
              if (n) {
                ((Ct = Oe(n.nextSibling)), (a = n.data === 'F!'));
                break t;
              }
            }
            gl(a);
          }
          a = !1;
        }
        a && (e = l[0]);
      }
    }
    return (
      (l = ae()),
      (l.memoizedState = l.baseState = e),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Lr,
        lastRenderedState: e,
      }),
      (l.queue = a),
      (l = ud.bind(null, ut, a)),
      (a.dispatch = l),
      (a = as(!1)),
      (i = os.bind(null, ut, !1, a.queue)),
      (a = ae()),
      (n = { state: e, dispatch: null, action: t, pending: null }),
      (a.queue = n),
      (l = Xp.bind(null, ut, n, i, l)),
      (n.dispatch = l),
      (a.memoizedState = t),
      [e, l, !1]
    );
  }
  function Gr(t) {
    var e = Lt();
    return Yr(e, Tt, t);
  }
  function Yr(t, e, l) {
    if (
      ((e = es(t, e, Lr)[0]),
      (t = Fu(tl)[0]),
      typeof e == 'object' && e !== null && typeof e.then == 'function')
    )
      try {
        var a = Un(e);
      } catch (o) {
        throw o === Da ? Gu : o;
      }
    else a = e;
    e = Lt();
    var n = e.queue,
      i = n.dispatch;
    return (
      l !== e.memoizedState &&
        ((ut.flags |= 2048), Ba(9, { destroy: void 0 }, Qp.bind(null, n, l), null)),
      [a, i, t]
    );
  }
  function Qp(t, e) {
    t.action = e;
  }
  function Xr(t) {
    var e = Lt(),
      l = Tt;
    if (l !== null) return Yr(e, l, t);
    (Lt(), (e = e.memoizedState), (l = Lt()));
    var a = l.queue.dispatch;
    return ((l.memoizedState = t), [e, a, !1]);
  }
  function Ba(t, e, l, a) {
    return (
      (t = { tag: t, create: l, deps: a, inst: e, next: null }),
      (e = ut.updateQueue),
      e === null && ((e = $u()), (ut.updateQueue = e)),
      (l = e.lastEffect),
      l === null
        ? (e.lastEffect = t.next = t)
        : ((a = l.next), (l.next = t), (t.next = a), (e.lastEffect = t)),
      t
    );
  }
  function Qr() {
    return Lt().memoizedState;
  }
  function Iu(t, e, l, a) {
    var n = ae();
    ((ut.flags |= t),
      (n.memoizedState = Ba(1 | e, { destroy: void 0 }, l, a === void 0 ? null : a)));
  }
  function Pu(t, e, l, a) {
    var n = Lt();
    a = a === void 0 ? null : a;
    var i = n.memoizedState.inst;
    Tt !== null && a !== null && $c(a, Tt.memoizedState.deps)
      ? (n.memoizedState = Ba(e, i, l, a))
      : ((ut.flags |= t), (n.memoizedState = Ba(1 | e, i, l, a)));
  }
  function Vr(t, e) {
    Iu(8390656, 8, t, e);
  }
  function us(t, e) {
    Pu(2048, 8, t, e);
  }
  function Vp(t) {
    ut.flags |= 4;
    var e = ut.updateQueue;
    if (e === null) ((e = $u()), (ut.updateQueue = e), (e.events = [t]));
    else {
      var l = e.events;
      l === null ? (e.events = [t]) : l.push(t);
    }
  }
  function Zr(t) {
    var e = Lt().memoizedState;
    return (
      Vp({ ref: e, nextImpl: t }),
      function () {
        if ((gt & 2) !== 0) throw Error(s(440));
        return e.impl.apply(void 0, arguments);
      }
    );
  }
  function Kr(t, e) {
    return Pu(4, 2, t, e);
  }
  function Jr(t, e) {
    return Pu(4, 4, t, e);
  }
  function $r(t, e) {
    if (typeof e == 'function') {
      t = t();
      var l = e(t);
      return function () {
        typeof l == 'function' ? l() : e(null);
      };
    }
    if (e != null)
      return (
        (t = t()),
        (e.current = t),
        function () {
          e.current = null;
        }
      );
  }
  function Wr(t, e, l) {
    ((l = l != null ? l.concat([t]) : null), Pu(4, 4, $r.bind(null, e, t), l));
  }
  function is() {}
  function Fr(t, e) {
    var l = Lt();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    return e !== null && $c(e, a[1]) ? a[0] : ((l.memoizedState = [t, e]), t);
  }
  function Ir(t, e) {
    var l = Lt();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    if (e !== null && $c(e, a[1])) return a[0];
    if (((a = t()), aa)) {
      ml(!0);
      try {
        t();
      } finally {
        ml(!1);
      }
    }
    return ((l.memoizedState = [a, e]), a);
  }
  function cs(t, e, l) {
    return l === void 0 || ((Pe & 1073741824) !== 0 && (rt & 261930) === 0)
      ? (t.memoizedState = e)
      : ((t.memoizedState = l), (t = Pd()), (ut.lanes |= t), (Nl |= t), l);
  }
  function Pr(t, e, l, a) {
    return pe(l, e)
      ? l
      : ja.current !== null
        ? ((t = cs(t, l, a)), pe(t, e) || (Xt = !0), t)
        : (Pe & 42) === 0 || ((Pe & 1073741824) !== 0 && (rt & 261930) === 0)
          ? ((Xt = !0), (t.memoizedState = l))
          : ((t = Pd()), (ut.lanes |= t), (Nl |= t), e);
  }
  function td(t, e, l, a, n) {
    var i = R.p;
    R.p = i !== 0 && 8 > i ? i : 8;
    var o = w.T,
      d = {};
    ((w.T = d), os(t, !1, e, l));
    try {
      var g = n(),
        C = w.S;
      if (
        (C !== null && C(d, g), g !== null && typeof g == 'object' && typeof g.then == 'function')
      ) {
        var U = qp(g, a);
        wn(t, e, U, Ee(t));
      } else wn(t, e, a, Ee(t));
    } catch (L) {
      wn(t, e, { then: function () {}, status: 'rejected', reason: L }, Ee());
    } finally {
      ((R.p = i), o !== null && d.types !== null && (o.types = d.types), (w.T = o));
    }
  }
  function Zp() {}
  function ss(t, e, l, a) {
    if (t.tag !== 5) throw Error(s(476));
    var n = ed(t).queue;
    td(
      t,
      n,
      e,
      V,
      l === null
        ? Zp
        : function () {
            return (ld(t), l(a));
          }
    );
  }
  function ed(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: V,
      baseState: V,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: tl,
        lastRenderedState: V,
      },
      next: null,
    };
    var l = {};
    return (
      (e.next = {
        memoizedState: l,
        baseState: l,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: tl,
          lastRenderedState: l,
        },
        next: null,
      }),
      (t.memoizedState = e),
      (t = t.alternate),
      t !== null && (t.memoizedState = e),
      e
    );
  }
  function ld(t) {
    var e = ed(t);
    (e.next === null && (e = t.alternate.memoizedState), wn(t, e.next.queue, {}, Ee()));
  }
  function fs() {
    return It(In);
  }
  function ad() {
    return Lt().memoizedState;
  }
  function nd() {
    return Lt().memoizedState;
  }
  function Kp(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = Ee();
          t = Sl(l);
          var a = El(e, t, l);
          (a !== null && (re(a, e, l), zn(a, e, l)), (e = { cache: Hc() }), (t.payload = e));
          return;
      }
      e = e.return;
    }
  }
  function Jp(t, e, l) {
    var a = Ee();
    ((l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      ti(t) ? id(e, l) : ((l = Nc(t, e, l, a)), l !== null && (re(l, t, a), cd(l, e, a))));
  }
  function ud(t, e, l) {
    var a = Ee();
    wn(t, e, l, a);
  }
  function wn(t, e, l, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (ti(t)) id(e, n);
    else {
      var i = t.alternate;
      if (
        t.lanes === 0 &&
        (i === null || i.lanes === 0) &&
        ((i = e.lastRenderedReducer), i !== null)
      )
        try {
          var o = e.lastRenderedState,
            d = i(o, l);
          if (((n.hasEagerState = !0), (n.eagerState = d), pe(d, o)))
            return (Uu(t, e, n, 0), Mt === null && ju(), !1);
        } catch {
        } finally {
        }
      if (((l = Nc(t, e, n, a)), l !== null)) return (re(l, t, a), cd(l, e, a), !0);
    }
    return !1;
  }
  function os(t, e, l, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: Ys(),
        gesture: null,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      ti(t))
    ) {
      if (e) throw Error(s(479));
    } else ((e = Nc(t, l, a, 2)), e !== null && re(e, t, 2));
  }
  function ti(t) {
    var e = t.alternate;
    return t === ut || (e !== null && e === ut);
  }
  function id(t, e) {
    Ua = Ku = !0;
    var l = t.pending;
    (l === null ? (e.next = e) : ((e.next = l.next), (l.next = e)), (t.pending = e));
  }
  function cd(t, e, l) {
    if ((l & 4194048) !== 0) {
      var a = e.lanes;
      ((a &= t.pendingLanes), (l |= a), (e.lanes = l), ro(t, l));
    }
  }
  var Bn = {
    readContext: It,
    use: Wu,
    useCallback: wt,
    useContext: wt,
    useEffect: wt,
    useImperativeHandle: wt,
    useLayoutEffect: wt,
    useInsertionEffect: wt,
    useMemo: wt,
    useReducer: wt,
    useRef: wt,
    useState: wt,
    useDebugValue: wt,
    useDeferredValue: wt,
    useTransition: wt,
    useSyncExternalStore: wt,
    useId: wt,
    useHostTransitionStatus: wt,
    useFormState: wt,
    useActionState: wt,
    useOptimistic: wt,
    useMemoCache: wt,
    useCacheRefresh: wt,
  };
  Bn.useEffectEvent = wt;
  var sd = {
      readContext: It,
      use: Wu,
      useCallback: function (t, e) {
        return ((ae().memoizedState = [t, e === void 0 ? null : e]), t);
      },
      useContext: It,
      useEffect: Vr,
      useImperativeHandle: function (t, e, l) {
        ((l = l != null ? l.concat([t]) : null), Iu(4194308, 4, $r.bind(null, e, t), l));
      },
      useLayoutEffect: function (t, e) {
        return Iu(4194308, 4, t, e);
      },
      useInsertionEffect: function (t, e) {
        Iu(4, 2, t, e);
      },
      useMemo: function (t, e) {
        var l = ae();
        e = e === void 0 ? null : e;
        var a = t();
        if (aa) {
          ml(!0);
          try {
            t();
          } finally {
            ml(!1);
          }
        }
        return ((l.memoizedState = [a, e]), a);
      },
      useReducer: function (t, e, l) {
        var a = ae();
        if (l !== void 0) {
          var n = l(e);
          if (aa) {
            ml(!0);
            try {
              l(e);
            } finally {
              ml(!1);
            }
          }
        } else n = e;
        return (
          (a.memoizedState = a.baseState = n),
          (t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: n,
          }),
          (a.queue = t),
          (t = t.dispatch = Jp.bind(null, ut, t)),
          [a.memoizedState, t]
        );
      },
      useRef: function (t) {
        var e = ae();
        return ((t = { current: t }), (e.memoizedState = t));
      },
      useState: function (t) {
        t = as(t);
        var e = t.queue,
          l = ud.bind(null, ut, e);
        return ((e.dispatch = l), [t.memoizedState, l]);
      },
      useDebugValue: is,
      useDeferredValue: function (t, e) {
        var l = ae();
        return cs(l, t, e);
      },
      useTransition: function () {
        var t = as(!1);
        return ((t = td.bind(null, ut, t.queue, !0, !1)), (ae().memoizedState = t), [!1, t]);
      },
      useSyncExternalStore: function (t, e, l) {
        var a = ut,
          n = ae();
        if (mt) {
          if (l === void 0) throw Error(s(407));
          l = l();
        } else {
          if (((l = e()), Mt === null)) throw Error(s(349));
          (rt & 127) !== 0 || Rr(a, e, l);
        }
        n.memoizedState = l;
        var i = { value: l, getSnapshot: e };
        return (
          (n.queue = i),
          Vr(Dr.bind(null, a, i, t), [t]),
          (a.flags |= 2048),
          Ba(9, { destroy: void 0 }, zr.bind(null, a, i, l, e), null),
          l
        );
      },
      useId: function () {
        var t = ae(),
          e = Mt.identifierPrefix;
        if (mt) {
          var l = Ge,
            a = qe;
          ((l = (a & ~(1 << (32 - ye(a) - 1))).toString(32) + l),
            (e = '_' + e + 'R_' + l),
            (l = Ju++),
            0 < l && (e += 'H' + l.toString(32)),
            (e += '_'));
        } else ((l = Gp++), (e = '_' + e + 'r_' + l.toString(32) + '_'));
        return (t.memoizedState = e);
      },
      useHostTransitionStatus: fs,
      useFormState: qr,
      useActionState: qr,
      useOptimistic: function (t) {
        var e = ae();
        e.memoizedState = e.baseState = t;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((e.queue = l), (e = os.bind(null, ut, !0, l)), (l.dispatch = e), [t, e]);
      },
      useMemoCache: ts,
      useCacheRefresh: function () {
        return (ae().memoizedState = Kp.bind(null, ut));
      },
      useEffectEvent: function (t) {
        var e = ae(),
          l = { impl: t };
        return (
          (e.memoizedState = l),
          function () {
            if ((gt & 2) !== 0) throw Error(s(440));
            return l.impl.apply(void 0, arguments);
          }
        );
      },
    },
    rs = {
      readContext: It,
      use: Wu,
      useCallback: Fr,
      useContext: It,
      useEffect: us,
      useImperativeHandle: Wr,
      useInsertionEffect: Kr,
      useLayoutEffect: Jr,
      useMemo: Ir,
      useReducer: Fu,
      useRef: Qr,
      useState: function () {
        return Fu(tl);
      },
      useDebugValue: is,
      useDeferredValue: function (t, e) {
        var l = Lt();
        return Pr(l, Tt.memoizedState, t, e);
      },
      useTransition: function () {
        var t = Fu(tl)[0],
          e = Lt().memoizedState;
        return [typeof t == 'boolean' ? t : Un(t), e];
      },
      useSyncExternalStore: Cr,
      useId: ad,
      useHostTransitionStatus: fs,
      useFormState: Gr,
      useActionState: Gr,
      useOptimistic: function (t, e) {
        var l = Lt();
        return Ur(l, Tt, t, e);
      },
      useMemoCache: ts,
      useCacheRefresh: nd,
    };
  rs.useEffectEvent = Zr;
  var fd = {
    readContext: It,
    use: Wu,
    useCallback: Fr,
    useContext: It,
    useEffect: us,
    useImperativeHandle: Wr,
    useInsertionEffect: Kr,
    useLayoutEffect: Jr,
    useMemo: Ir,
    useReducer: ls,
    useRef: Qr,
    useState: function () {
      return ls(tl);
    },
    useDebugValue: is,
    useDeferredValue: function (t, e) {
      var l = Lt();
      return Tt === null ? cs(l, t, e) : Pr(l, Tt.memoizedState, t, e);
    },
    useTransition: function () {
      var t = ls(tl)[0],
        e = Lt().memoizedState;
      return [typeof t == 'boolean' ? t : Un(t), e];
    },
    useSyncExternalStore: Cr,
    useId: ad,
    useHostTransitionStatus: fs,
    useFormState: Xr,
    useActionState: Xr,
    useOptimistic: function (t, e) {
      var l = Lt();
      return Tt !== null ? Ur(l, Tt, t, e) : ((l.baseState = t), [t, l.queue.dispatch]);
    },
    useMemoCache: ts,
    useCacheRefresh: nd,
  };
  fd.useEffectEvent = Zr;
  function ds(t, e, l, a) {
    ((e = t.memoizedState),
      (l = l(a, e)),
      (l = l == null ? e : _({}, e, l)),
      (t.memoizedState = l),
      t.lanes === 0 && (t.updateQueue.baseState = l));
  }
  var ms = {
    enqueueSetState: function (t, e, l) {
      t = t._reactInternals;
      var a = Ee(),
        n = Sl(a);
      ((n.payload = e),
        l != null && (n.callback = l),
        (e = El(t, n, a)),
        e !== null && (re(e, t, a), zn(e, t, a)));
    },
    enqueueReplaceState: function (t, e, l) {
      t = t._reactInternals;
      var a = Ee(),
        n = Sl(a);
      ((n.tag = 1),
        (n.payload = e),
        l != null && (n.callback = l),
        (e = El(t, n, a)),
        e !== null && (re(e, t, a), zn(e, t, a)));
    },
    enqueueForceUpdate: function (t, e) {
      t = t._reactInternals;
      var l = Ee(),
        a = Sl(l);
      ((a.tag = 2),
        e != null && (a.callback = e),
        (e = El(t, a, l)),
        e !== null && (re(e, t, l), zn(e, t, l)));
    },
  };
  function od(t, e, l, a, n, i, o) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == 'function'
        ? t.shouldComponentUpdate(a, i, o)
        : e.prototype && e.prototype.isPureReactComponent
          ? !En(l, a) || !En(n, i)
          : !0
    );
  }
  function rd(t, e, l, a) {
    ((t = e.state),
      typeof e.componentWillReceiveProps == 'function' && e.componentWillReceiveProps(l, a),
      typeof e.UNSAFE_componentWillReceiveProps == 'function' &&
        e.UNSAFE_componentWillReceiveProps(l, a),
      e.state !== t && ms.enqueueReplaceState(e, e.state, null));
  }
  function na(t, e) {
    var l = e;
    if ('ref' in e) {
      l = {};
      for (var a in e) a !== 'ref' && (l[a] = e[a]);
    }
    if ((t = t.defaultProps)) {
      l === e && (l = _({}, l));
      for (var n in t) l[n] === void 0 && (l[n] = t[n]);
    }
    return l;
  }
  function dd(t) {
    Ou(t);
  }
  function md(t) {
    console.error(t);
  }
  function hd(t) {
    Ou(t);
  }
  function ei(t, e) {
    try {
      var l = t.onUncaughtError;
      l(e.value, { componentStack: e.stack });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function yd(t, e, l) {
    try {
      var a = t.onCaughtError;
      a(l.value, { componentStack: l.stack, errorBoundary: e.tag === 1 ? e.stateNode : null });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function hs(t, e, l) {
    return (
      (l = Sl(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        ei(t, e);
      }),
      l
    );
  }
  function pd(t) {
    return ((t = Sl(t)), (t.tag = 3), t);
  }
  function vd(t, e, l, a) {
    var n = l.type.getDerivedStateFromError;
    if (typeof n == 'function') {
      var i = a.value;
      ((t.payload = function () {
        return n(i);
      }),
        (t.callback = function () {
          yd(e, l, a);
        }));
    }
    var o = l.stateNode;
    o !== null &&
      typeof o.componentDidCatch == 'function' &&
      (t.callback = function () {
        (yd(e, l, a),
          typeof n != 'function' && (Cl === null ? (Cl = new Set([this])) : Cl.add(this)));
        var d = a.stack;
        this.componentDidCatch(a.value, { componentStack: d !== null ? d : '' });
      });
  }
  function $p(t, e, l, a, n) {
    if (((l.flags |= 32768), a !== null && typeof a == 'object' && typeof a.then == 'function')) {
      if (((e = l.alternate), e !== null && Ca(e, l, n, !0), (l = ge.current), l !== null)) {
        switch (l.tag) {
          case 31:
          case 13:
            return (
              De === null ? mi() : l.alternate === null && Bt === 0 && (Bt = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = n),
              a === Yu
                ? (l.flags |= 16384)
                : ((e = l.updateQueue),
                  e === null ? (l.updateQueue = new Set([a])) : e.add(a),
                  Ls(t, a, n)),
              !1
            );
          case 22:
            return (
              (l.flags |= 65536),
              a === Yu
                ? (l.flags |= 16384)
                : ((e = l.updateQueue),
                  e === null
                    ? ((e = { transitions: null, markerInstances: null, retryQueue: new Set([a]) }),
                      (l.updateQueue = e))
                    : ((l = e.retryQueue), l === null ? (e.retryQueue = new Set([a])) : l.add(a)),
                  Ls(t, a, n)),
              !1
            );
        }
        throw Error(s(435, l.tag));
      }
      return (Ls(t, a, n), mi(), !1);
    }
    if (mt)
      return (
        (e = ge.current),
        e !== null
          ? ((e.flags & 65536) === 0 && (e.flags |= 256),
            (e.flags |= 65536),
            (e.lanes = n),
            a !== jc && ((t = Error(s(422), { cause: a })), An(Ne(t, l))))
          : (a !== jc && ((e = Error(s(423), { cause: a })), An(Ne(e, l))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (n &= -n),
            (t.lanes |= n),
            (a = Ne(a, l)),
            (n = hs(t.stateNode, a, n)),
            Qc(t, n),
            Bt !== 4 && (Bt = 2)),
        !1
      );
    var i = Error(s(520), { cause: a });
    if (((i = Ne(i, l)), Qn === null ? (Qn = [i]) : Qn.push(i), Bt !== 4 && (Bt = 2), e === null))
      return !0;
    ((a = Ne(a, l)), (l = e));
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (t = n & -n),
            (l.lanes |= t),
            (t = hs(l.stateNode, a, t)),
            Qc(l, t),
            !1
          );
        case 1:
          if (
            ((e = l.type),
            (i = l.stateNode),
            (l.flags & 128) === 0 &&
              (typeof e.getDerivedStateFromError == 'function' ||
                (i !== null &&
                  typeof i.componentDidCatch == 'function' &&
                  (Cl === null || !Cl.has(i)))))
          )
            return (
              (l.flags |= 65536),
              (n &= -n),
              (l.lanes |= n),
              (n = pd(n)),
              vd(n, t, l, a),
              Qc(l, n),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var ys = Error(s(461)),
    Xt = !1;
  function Pt(t, e, l, a) {
    e.child = t === null ? Sr(e, null, l, a) : la(e, t.child, l, a);
  }
  function gd(t, e, l, a, n) {
    l = l.render;
    var i = e.ref;
    if ('ref' in a) {
      var o = {};
      for (var d in a) d !== 'ref' && (o[d] = a[d]);
    } else o = a;
    return (
      Il(e),
      (a = Wc(t, e, l, o, i, n)),
      (d = Fc()),
      t !== null && !Xt
        ? (Ic(t, e, n), el(t, e, n))
        : (mt && d && Dc(e), (e.flags |= 1), Pt(t, e, a, n), e.child)
    );
  }
  function _d(t, e, l, a, n) {
    if (t === null) {
      var i = l.type;
      return typeof i == 'function' && !Cc(i) && i.defaultProps === void 0 && l.compare === null
        ? ((e.tag = 15), (e.type = i), bd(t, e, i, a, n))
        : ((t = Bu(l.type, null, a, e, e.mode, n)), (t.ref = e.ref), (t.return = e), (e.child = t));
    }
    if (((i = t.child), !Ts(t, n))) {
      var o = i.memoizedProps;
      if (((l = l.compare), (l = l !== null ? l : En), l(o, a) && t.ref === e.ref))
        return el(t, e, n);
    }
    return ((e.flags |= 1), (t = $e(i, a)), (t.ref = e.ref), (t.return = e), (e.child = t));
  }
  function bd(t, e, l, a, n) {
    if (t !== null) {
      var i = t.memoizedProps;
      if (En(i, a) && t.ref === e.ref)
        if (((Xt = !1), (e.pendingProps = a = i), Ts(t, n))) (t.flags & 131072) !== 0 && (Xt = !0);
        else return ((e.lanes = t.lanes), el(t, e, n));
    }
    return ps(t, e, l, a, n);
  }
  function Sd(t, e, l, a) {
    var n = a.children,
      i = t !== null ? t.memoizedState : null;
    if (
      (t === null &&
        e.stateNode === null &&
        (e.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      a.mode === 'hidden')
    ) {
      if ((e.flags & 128) !== 0) {
        if (((i = i !== null ? i.baseLanes | l : l), t !== null)) {
          for (a = e.child = t.child, n = 0; a !== null; )
            ((n = n | a.lanes | a.childLanes), (a = a.sibling));
          a = n & ~i;
        } else ((a = 0), (e.child = null));
        return Ed(t, e, i, l, a);
      }
      if ((l & 536870912) !== 0)
        ((e.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && qu(e, i !== null ? i.cachePool : null),
          i !== null ? xr(e, i) : Zc(),
          Ar(e));
      else return ((a = e.lanes = 536870912), Ed(t, e, i !== null ? i.baseLanes | l : l, l, a));
    } else
      i !== null
        ? (qu(e, i.cachePool), xr(e, i), xl(), (e.memoizedState = null))
        : (t !== null && qu(e, null), Zc(), xl());
    return (Pt(t, e, n, l), e.child);
  }
  function kn(t, e) {
    return (
      (t !== null && t.tag === 22) ||
        e.stateNode !== null ||
        (e.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      e.sibling
    );
  }
  function Ed(t, e, l, a, n) {
    var i = qc();
    return (
      (i = i === null ? null : { parent: Gt._currentValue, pool: i }),
      (e.memoizedState = { baseLanes: l, cachePool: i }),
      t !== null && qu(e, null),
      Zc(),
      Ar(e),
      t !== null && Ca(t, e, a, !0),
      (e.childLanes = n),
      null
    );
  }
  function li(t, e) {
    return (
      (e = ni({ mode: e.mode, children: e.children }, t.mode)),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function Td(t, e, l) {
    return (
      la(e, t.child, null, l),
      (t = li(e, e.pendingProps)),
      (t.flags |= 2),
      _e(e),
      (e.memoizedState = null),
      t
    );
  }
  function Wp(t, e, l) {
    var a = e.pendingProps,
      n = (e.flags & 128) !== 0;
    if (((e.flags &= -129), t === null)) {
      if (mt) {
        if (a.mode === 'hidden') return ((t = li(e, a)), (e.lanes = 536870912), kn(null, t));
        if (
          (Jc(e),
          (t = Ct)
            ? ((t = wm(t, ze)),
              (t = t !== null && t.data === '&' ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: pl !== null ? { id: qe, overflow: Ge } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = ir(t)),
                (l.return = e),
                (e.child = l),
                (Ft = e),
                (Ct = null)))
            : (t = null),
          t === null)
        )
          throw gl(e);
        return ((e.lanes = 536870912), null);
      }
      return li(e, a);
    }
    var i = t.memoizedState;
    if (i !== null) {
      var o = i.dehydrated;
      if ((Jc(e), n))
        if (e.flags & 256) ((e.flags &= -257), (e = Td(t, e, l)));
        else if (e.memoizedState !== null) ((e.child = t.child), (e.flags |= 128), (e = null));
        else throw Error(s(558));
      else if ((Xt || Ca(t, e, l, !1), (n = (l & t.childLanes) !== 0), Xt || n)) {
        if (((a = Mt), a !== null && ((o = mo(a, l)), o !== 0 && o !== i.retryLane)))
          throw ((i.retryLane = o), Jl(t, o), re(a, t, o), ys);
        (mi(), (e = Td(t, e, l)));
      } else
        ((t = i.treeContext),
          (Ct = Oe(o.nextSibling)),
          (Ft = e),
          (mt = !0),
          (vl = null),
          (ze = !1),
          t !== null && fr(e, t),
          (e = li(e, a)),
          (e.flags |= 4096));
      return e;
    }
    return (
      (t = $e(t.child, { mode: a.mode, children: a.children })),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function ai(t, e) {
    var l = e.ref;
    if (l === null) t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != 'function' && typeof l != 'object') throw Error(s(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function ps(t, e, l, a, n) {
    return (
      Il(e),
      (l = Wc(t, e, l, a, void 0, n)),
      (a = Fc()),
      t !== null && !Xt
        ? (Ic(t, e, n), el(t, e, n))
        : (mt && a && Dc(e), (e.flags |= 1), Pt(t, e, l, n), e.child)
    );
  }
  function xd(t, e, l, a, n, i) {
    return (
      Il(e),
      (e.updateQueue = null),
      (l = Nr(e, a, l, n)),
      Mr(t),
      (a = Fc()),
      t !== null && !Xt
        ? (Ic(t, e, i), el(t, e, i))
        : (mt && a && Dc(e), (e.flags |= 1), Pt(t, e, l, i), e.child)
    );
  }
  function Ad(t, e, l, a, n) {
    if ((Il(e), e.stateNode === null)) {
      var i = xa,
        o = l.contextType;
      (typeof o == 'object' && o !== null && (i = It(o)),
        (i = new l(a, i)),
        (e.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null),
        (i.updater = ms),
        (e.stateNode = i),
        (i._reactInternals = e),
        (i = e.stateNode),
        (i.props = a),
        (i.state = e.memoizedState),
        (i.refs = {}),
        Yc(e),
        (o = l.contextType),
        (i.context = typeof o == 'object' && o !== null ? It(o) : xa),
        (i.state = e.memoizedState),
        (o = l.getDerivedStateFromProps),
        typeof o == 'function' && (ds(e, l, o, a), (i.state = e.memoizedState)),
        typeof l.getDerivedStateFromProps == 'function' ||
          typeof i.getSnapshotBeforeUpdate == 'function' ||
          (typeof i.UNSAFE_componentWillMount != 'function' &&
            typeof i.componentWillMount != 'function') ||
          ((o = i.state),
          typeof i.componentWillMount == 'function' && i.componentWillMount(),
          typeof i.UNSAFE_componentWillMount == 'function' && i.UNSAFE_componentWillMount(),
          o !== i.state && ms.enqueueReplaceState(i, i.state, null),
          On(e, a, i, n),
          Dn(),
          (i.state = e.memoizedState)),
        typeof i.componentDidMount == 'function' && (e.flags |= 4194308),
        (a = !0));
    } else if (t === null) {
      i = e.stateNode;
      var d = e.memoizedProps,
        g = na(l, d);
      i.props = g;
      var C = i.context,
        U = l.contextType;
      ((o = xa), typeof U == 'object' && U !== null && (o = It(U)));
      var L = l.getDerivedStateFromProps;
      ((U = typeof L == 'function' || typeof i.getSnapshotBeforeUpdate == 'function'),
        (d = e.pendingProps !== d),
        U ||
          (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof i.componentWillReceiveProps != 'function') ||
          ((d || C !== o) && rd(e, i, a, o)),
        (bl = !1));
      var z = e.memoizedState;
      ((i.state = z),
        On(e, a, i, n),
        Dn(),
        (C = e.memoizedState),
        d || z !== C || bl
          ? (typeof L == 'function' && (ds(e, l, L, a), (C = e.memoizedState)),
            (g = bl || od(e, l, g, a, z, C, o))
              ? (U ||
                  (typeof i.UNSAFE_componentWillMount != 'function' &&
                    typeof i.componentWillMount != 'function') ||
                  (typeof i.componentWillMount == 'function' && i.componentWillMount(),
                  typeof i.UNSAFE_componentWillMount == 'function' &&
                    i.UNSAFE_componentWillMount()),
                typeof i.componentDidMount == 'function' && (e.flags |= 4194308))
              : (typeof i.componentDidMount == 'function' && (e.flags |= 4194308),
                (e.memoizedProps = a),
                (e.memoizedState = C)),
            (i.props = a),
            (i.state = C),
            (i.context = o),
            (a = g))
          : (typeof i.componentDidMount == 'function' && (e.flags |= 4194308), (a = !1)));
    } else {
      ((i = e.stateNode),
        Xc(t, e),
        (o = e.memoizedProps),
        (U = na(l, o)),
        (i.props = U),
        (L = e.pendingProps),
        (z = i.context),
        (C = l.contextType),
        (g = xa),
        typeof C == 'object' && C !== null && (g = It(C)),
        (d = l.getDerivedStateFromProps),
        (C = typeof d == 'function' || typeof i.getSnapshotBeforeUpdate == 'function') ||
          (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof i.componentWillReceiveProps != 'function') ||
          ((o !== L || z !== g) && rd(e, i, a, g)),
        (bl = !1),
        (z = e.memoizedState),
        (i.state = z),
        On(e, a, i, n),
        Dn());
      var D = e.memoizedState;
      o !== L || z !== D || bl || (t !== null && t.dependencies !== null && Hu(t.dependencies))
        ? (typeof d == 'function' && (ds(e, l, d, a), (D = e.memoizedState)),
          (U =
            bl ||
            od(e, l, U, a, z, D, g) ||
            (t !== null && t.dependencies !== null && Hu(t.dependencies)))
            ? (C ||
                (typeof i.UNSAFE_componentWillUpdate != 'function' &&
                  typeof i.componentWillUpdate != 'function') ||
                (typeof i.componentWillUpdate == 'function' && i.componentWillUpdate(a, D, g),
                typeof i.UNSAFE_componentWillUpdate == 'function' &&
                  i.UNSAFE_componentWillUpdate(a, D, g)),
              typeof i.componentDidUpdate == 'function' && (e.flags |= 4),
              typeof i.getSnapshotBeforeUpdate == 'function' && (e.flags |= 1024))
            : (typeof i.componentDidUpdate != 'function' ||
                (o === t.memoizedProps && z === t.memoizedState) ||
                (e.flags |= 4),
              typeof i.getSnapshotBeforeUpdate != 'function' ||
                (o === t.memoizedProps && z === t.memoizedState) ||
                (e.flags |= 1024),
              (e.memoizedProps = a),
              (e.memoizedState = D)),
          (i.props = a),
          (i.state = D),
          (i.context = g),
          (a = U))
        : (typeof i.componentDidUpdate != 'function' ||
            (o === t.memoizedProps && z === t.memoizedState) ||
            (e.flags |= 4),
          typeof i.getSnapshotBeforeUpdate != 'function' ||
            (o === t.memoizedProps && z === t.memoizedState) ||
            (e.flags |= 1024),
          (a = !1));
    }
    return (
      (i = a),
      ai(t, e),
      (a = (e.flags & 128) !== 0),
      i || a
        ? ((i = e.stateNode),
          (l = a && typeof l.getDerivedStateFromError != 'function' ? null : i.render()),
          (e.flags |= 1),
          t !== null && a
            ? ((e.child = la(e, t.child, null, n)), (e.child = la(e, null, l, n)))
            : Pt(t, e, l, n),
          (e.memoizedState = i.state),
          (t = e.child))
        : (t = el(t, e, n)),
      t
    );
  }
  function Md(t, e, l, a) {
    return (Wl(), (e.flags |= 256), Pt(t, e, l, a), e.child);
  }
  var vs = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function gs(t) {
    return { baseLanes: t, cachePool: yr() };
  }
  function _s(t, e, l) {
    return ((t = t !== null ? t.childLanes & ~l : 0), e && (t |= Se), t);
  }
  function Nd(t, e, l) {
    var a = e.pendingProps,
      n = !1,
      i = (e.flags & 128) !== 0,
      o;
    if (
      ((o = i) || (o = t !== null && t.memoizedState === null ? !1 : (Ht.current & 2) !== 0),
      o && ((n = !0), (e.flags &= -129)),
      (o = (e.flags & 32) !== 0),
      (e.flags &= -33),
      t === null)
    ) {
      if (mt) {
        if (
          (n ? Tl(e) : xl(),
          (t = Ct)
            ? ((t = wm(t, ze)),
              (t = t !== null && t.data !== '&' ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: pl !== null ? { id: qe, overflow: Ge } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = ir(t)),
                (l.return = e),
                (e.child = l),
                (Ft = e),
                (Ct = null)))
            : (t = null),
          t === null)
        )
          throw gl(e);
        return (ef(t) ? (e.lanes = 32) : (e.lanes = 536870912), null);
      }
      var d = a.children;
      return (
        (a = a.fallback),
        n
          ? (xl(),
            (n = e.mode),
            (d = ni({ mode: 'hidden', children: d }, n)),
            (a = $l(a, n, l, null)),
            (d.return = e),
            (a.return = e),
            (d.sibling = a),
            (e.child = d),
            (a = e.child),
            (a.memoizedState = gs(l)),
            (a.childLanes = _s(t, o, l)),
            (e.memoizedState = vs),
            kn(null, a))
          : (Tl(e), bs(e, d))
      );
    }
    var g = t.memoizedState;
    if (g !== null && ((d = g.dehydrated), d !== null)) {
      if (i)
        e.flags & 256
          ? (Tl(e), (e.flags &= -257), (e = Ss(t, e, l)))
          : e.memoizedState !== null
            ? (xl(), (e.child = t.child), (e.flags |= 128), (e = null))
            : (xl(),
              (d = a.fallback),
              (n = e.mode),
              (a = ni({ mode: 'visible', children: a.children }, n)),
              (d = $l(d, n, l, null)),
              (d.flags |= 2),
              (a.return = e),
              (d.return = e),
              (a.sibling = d),
              (e.child = a),
              la(e, t.child, null, l),
              (a = e.child),
              (a.memoizedState = gs(l)),
              (a.childLanes = _s(t, o, l)),
              (e.memoizedState = vs),
              (e = kn(null, a)));
      else if ((Tl(e), ef(d))) {
        if (((o = d.nextSibling && d.nextSibling.dataset), o)) var C = o.dgst;
        ((o = C),
          (a = Error(s(419))),
          (a.stack = ''),
          (a.digest = o),
          An({ value: a, source: null, stack: null }),
          (e = Ss(t, e, l)));
      } else if ((Xt || Ca(t, e, l, !1), (o = (l & t.childLanes) !== 0), Xt || o)) {
        if (((o = Mt), o !== null && ((a = mo(o, l)), a !== 0 && a !== g.retryLane)))
          throw ((g.retryLane = a), Jl(t, a), re(o, t, a), ys);
        (tf(d) || mi(), (e = Ss(t, e, l)));
      } else
        tf(d)
          ? ((e.flags |= 192), (e.child = t.child), (e = null))
          : ((t = g.treeContext),
            (Ct = Oe(d.nextSibling)),
            (Ft = e),
            (mt = !0),
            (vl = null),
            (ze = !1),
            t !== null && fr(e, t),
            (e = bs(e, a.children)),
            (e.flags |= 4096));
      return e;
    }
    return n
      ? (xl(),
        (d = a.fallback),
        (n = e.mode),
        (g = t.child),
        (C = g.sibling),
        (a = $e(g, { mode: 'hidden', children: a.children })),
        (a.subtreeFlags = g.subtreeFlags & 65011712),
        C !== null ? (d = $e(C, d)) : ((d = $l(d, n, l, null)), (d.flags |= 2)),
        (d.return = e),
        (a.return = e),
        (a.sibling = d),
        (e.child = a),
        kn(null, a),
        (a = e.child),
        (d = t.child.memoizedState),
        d === null
          ? (d = gs(l))
          : ((n = d.cachePool),
            n !== null
              ? ((g = Gt._currentValue), (n = n.parent !== g ? { parent: g, pool: g } : n))
              : (n = yr()),
            (d = { baseLanes: d.baseLanes | l, cachePool: n })),
        (a.memoizedState = d),
        (a.childLanes = _s(t, o, l)),
        (e.memoizedState = vs),
        kn(t.child, a))
      : (Tl(e),
        (l = t.child),
        (t = l.sibling),
        (l = $e(l, { mode: 'visible', children: a.children })),
        (l.return = e),
        (l.sibling = null),
        t !== null &&
          ((o = e.deletions), o === null ? ((e.deletions = [t]), (e.flags |= 16)) : o.push(t)),
        (e.child = l),
        (e.memoizedState = null),
        l);
  }
  function bs(t, e) {
    return ((e = ni({ mode: 'visible', children: e }, t.mode)), (e.return = t), (t.child = e));
  }
  function ni(t, e) {
    return ((t = ve(22, t, null, e)), (t.lanes = 0), t);
  }
  function Ss(t, e, l) {
    return (
      la(e, t.child, null, l),
      (t = bs(e, e.pendingProps.children)),
      (t.flags |= 2),
      (e.memoizedState = null),
      t
    );
  }
  function Cd(t, e, l) {
    t.lanes |= e;
    var a = t.alternate;
    (a !== null && (a.lanes |= e), Bc(t.return, e, l));
  }
  function Es(t, e, l, a, n, i) {
    var o = t.memoizedState;
    o === null
      ? (t.memoizedState = {
          isBackwards: e,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: l,
          tailMode: n,
          treeForkCount: i,
        })
      : ((o.isBackwards = e),
        (o.rendering = null),
        (o.renderingStartTime = 0),
        (o.last = a),
        (o.tail = l),
        (o.tailMode = n),
        (o.treeForkCount = i));
  }
  function Rd(t, e, l) {
    var a = e.pendingProps,
      n = a.revealOrder,
      i = a.tail;
    a = a.children;
    var o = Ht.current,
      d = (o & 2) !== 0;
    if (
      (d ? ((o = (o & 1) | 2), (e.flags |= 128)) : (o &= 1),
      Z(Ht, o),
      Pt(t, e, a, l),
      (a = mt ? xn : 0),
      !d && t !== null && (t.flags & 128) !== 0)
    )
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && Cd(t, l, e);
        else if (t.tag === 19) Cd(t, l, e);
        else if (t.child !== null) {
          ((t.child.return = t), (t = t.child));
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) break t;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    switch (n) {
      case 'forwards':
        for (l = e.child, n = null; l !== null; )
          ((t = l.alternate), t !== null && Zu(t) === null && (n = l), (l = l.sibling));
        ((l = n),
          l === null ? ((n = e.child), (e.child = null)) : ((n = l.sibling), (l.sibling = null)),
          Es(e, !1, n, l, i, a));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (l = null, n = e.child, e.child = null; n !== null; ) {
          if (((t = n.alternate), t !== null && Zu(t) === null)) {
            e.child = n;
            break;
          }
          ((t = n.sibling), (n.sibling = l), (l = n), (n = t));
        }
        Es(e, !0, l, null, i, a);
        break;
      case 'together':
        Es(e, !1, null, null, void 0, a);
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function el(t, e, l) {
    if (
      (t !== null && (e.dependencies = t.dependencies), (Nl |= e.lanes), (l & e.childLanes) === 0)
    )
      if (t !== null) {
        if ((Ca(t, e, l, !1), (l & e.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && e.child !== t.child) throw Error(s(153));
    if (e.child !== null) {
      for (t = e.child, l = $e(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
        ((t = t.sibling), (l = l.sibling = $e(t, t.pendingProps)), (l.return = e));
      l.sibling = null;
    }
    return e.child;
  }
  function Ts(t, e) {
    return (t.lanes & e) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && Hu(t)));
  }
  function Fp(t, e, l) {
    switch (e.tag) {
      case 3:
        (le(e, e.stateNode.containerInfo), _l(e, Gt, t.memoizedState.cache), Wl());
        break;
      case 27:
      case 5:
        fn(e);
        break;
      case 4:
        le(e, e.stateNode.containerInfo);
        break;
      case 10:
        _l(e, e.type, e.memoizedProps.value);
        break;
      case 31:
        if (e.memoizedState !== null) return ((e.flags |= 128), Jc(e), null);
        break;
      case 13:
        var a = e.memoizedState;
        if (a !== null)
          return a.dehydrated !== null
            ? (Tl(e), (e.flags |= 128), null)
            : (l & e.child.childLanes) !== 0
              ? Nd(t, e, l)
              : (Tl(e), (t = el(t, e, l)), t !== null ? t.sibling : null);
        Tl(e);
        break;
      case 19:
        var n = (t.flags & 128) !== 0;
        if (
          ((a = (l & e.childLanes) !== 0),
          a || (Ca(t, e, l, !1), (a = (l & e.childLanes) !== 0)),
          n)
        ) {
          if (a) return Rd(t, e, l);
          e.flags |= 128;
        }
        if (
          ((n = e.memoizedState),
          n !== null && ((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
          Z(Ht, Ht.current),
          a)
        )
          break;
        return null;
      case 22:
        return ((e.lanes = 0), Sd(t, e, l, e.pendingProps));
      case 24:
        _l(e, Gt, t.memoizedState.cache);
    }
    return el(t, e, l);
  }
  function zd(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps) Xt = !0;
      else {
        if (!Ts(t, l) && (e.flags & 128) === 0) return ((Xt = !1), Fp(t, e, l));
        Xt = (t.flags & 131072) !== 0;
      }
    else ((Xt = !1), mt && (e.flags & 1048576) !== 0 && sr(e, xn, e.index));
    switch (((e.lanes = 0), e.tag)) {
      case 16:
        t: {
          var a = e.pendingProps;
          if (((t = ta(e.elementType)), (e.type = t), typeof t == 'function'))
            Cc(t)
              ? ((a = na(t, a)), (e.tag = 1), (e = Ad(null, e, t, a, l)))
              : ((e.tag = 0), (e = ps(null, e, t, a, l)));
          else {
            if (t != null) {
              var n = t.$$typeof;
              if (n === Q) {
                ((e.tag = 11), (e = gd(null, e, t, a, l)));
                break t;
              } else if (n === K) {
                ((e.tag = 14), (e = _d(null, e, t, a, l)));
                break t;
              }
            }
            throw ((e = ne(t) || t), Error(s(306, e, '')));
          }
        }
        return e;
      case 0:
        return ps(t, e, e.type, e.pendingProps, l);
      case 1:
        return ((a = e.type), (n = na(a, e.pendingProps)), Ad(t, e, a, n, l));
      case 3:
        t: {
          if ((le(e, e.stateNode.containerInfo), t === null)) throw Error(s(387));
          a = e.pendingProps;
          var i = e.memoizedState;
          ((n = i.element), Xc(t, e), On(e, a, null, l));
          var o = e.memoizedState;
          if (
            ((a = o.cache),
            _l(e, Gt, a),
            a !== i.cache && kc(e, [Gt], l, !0),
            Dn(),
            (a = o.element),
            i.isDehydrated)
          )
            if (
              ((i = { element: a, isDehydrated: !1, cache: o.cache }),
              (e.updateQueue.baseState = i),
              (e.memoizedState = i),
              e.flags & 256)
            ) {
              e = Md(t, e, a, l);
              break t;
            } else if (a !== n) {
              ((n = Ne(Error(s(424)), e)), An(n), (e = Md(t, e, a, l)));
              break t;
            } else {
              switch (((t = e.stateNode.containerInfo), t.nodeType)) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === 'HTML' ? t.ownerDocument.body : t;
              }
              for (
                Ct = Oe(t.firstChild),
                  Ft = e,
                  mt = !0,
                  vl = null,
                  ze = !0,
                  l = Sr(e, null, a, l),
                  e.child = l;
                l;
              )
                ((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
            }
          else {
            if ((Wl(), a === n)) {
              e = el(t, e, l);
              break t;
            }
            Pt(t, e, a, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return (
          ai(t, e),
          t === null
            ? (l = Gm(e.type, null, e.pendingProps, null))
              ? (e.memoizedState = l)
              : mt ||
                ((l = e.type),
                (t = e.pendingProps),
                (a = bi(st.current).createElement(l)),
                (a[Wt] = e),
                (a[ue] = t),
                te(a, l, t),
                Jt(a),
                (e.stateNode = a))
            : (e.memoizedState = Gm(e.type, t.memoizedProps, e.pendingProps, t.memoizedState)),
          null
        );
      case 27:
        return (
          fn(e),
          t === null &&
            mt &&
            ((a = e.stateNode = Hm(e.type, e.pendingProps, st.current)),
            (Ft = e),
            (ze = !0),
            (n = Ct),
            Ol(e.type) ? ((lf = n), (Ct = Oe(a.firstChild))) : (Ct = n)),
          Pt(t, e, e.pendingProps.children, l),
          ai(t, e),
          t === null && (e.flags |= 4194304),
          e.child
        );
      case 5:
        return (
          t === null &&
            mt &&
            ((n = a = Ct) &&
              ((a = Nv(a, e.type, e.pendingProps, ze)),
              a !== null
                ? ((e.stateNode = a), (Ft = e), (Ct = Oe(a.firstChild)), (ze = !1), (n = !0))
                : (n = !1)),
            n || gl(e)),
          fn(e),
          (n = e.type),
          (i = e.pendingProps),
          (o = t !== null ? t.memoizedProps : null),
          (a = i.children),
          Fs(n, i) ? (a = null) : o !== null && Fs(n, o) && (e.flags |= 32),
          e.memoizedState !== null && ((n = Wc(t, e, Yp, null, null, l)), (In._currentValue = n)),
          ai(t, e),
          Pt(t, e, a, l),
          e.child
        );
      case 6:
        return (
          t === null &&
            mt &&
            ((t = l = Ct) &&
              ((l = Cv(l, e.pendingProps, ze)),
              l !== null ? ((e.stateNode = l), (Ft = e), (Ct = null), (t = !0)) : (t = !1)),
            t || gl(e)),
          null
        );
      case 13:
        return Nd(t, e, l);
      case 4:
        return (
          le(e, e.stateNode.containerInfo),
          (a = e.pendingProps),
          t === null ? (e.child = la(e, null, a, l)) : Pt(t, e, a, l),
          e.child
        );
      case 11:
        return gd(t, e, e.type, e.pendingProps, l);
      case 7:
        return (Pt(t, e, e.pendingProps, l), e.child);
      case 8:
        return (Pt(t, e, e.pendingProps.children, l), e.child);
      case 12:
        return (Pt(t, e, e.pendingProps.children, l), e.child);
      case 10:
        return ((a = e.pendingProps), _l(e, e.type, a.value), Pt(t, e, a.children, l), e.child);
      case 9:
        return (
          (n = e.type._context),
          (a = e.pendingProps.children),
          Il(e),
          (n = It(n)),
          (a = a(n)),
          (e.flags |= 1),
          Pt(t, e, a, l),
          e.child
        );
      case 14:
        return _d(t, e, e.type, e.pendingProps, l);
      case 15:
        return bd(t, e, e.type, e.pendingProps, l);
      case 19:
        return Rd(t, e, l);
      case 31:
        return Wp(t, e, l);
      case 22:
        return Sd(t, e, l, e.pendingProps);
      case 24:
        return (
          Il(e),
          (a = It(Gt)),
          t === null
            ? ((n = qc()),
              n === null &&
                ((n = Mt),
                (i = Hc()),
                (n.pooledCache = i),
                i.refCount++,
                i !== null && (n.pooledCacheLanes |= l),
                (n = i)),
              (e.memoizedState = { parent: a, cache: n }),
              Yc(e),
              _l(e, Gt, n))
            : ((t.lanes & l) !== 0 && (Xc(t, e), On(e, null, null, l), Dn()),
              (n = t.memoizedState),
              (i = e.memoizedState),
              n.parent !== a
                ? ((n = { parent: a, cache: a }),
                  (e.memoizedState = n),
                  e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = n),
                  _l(e, Gt, a))
                : ((a = i.cache), _l(e, Gt, a), a !== n.cache && kc(e, [Gt], l, !0))),
          Pt(t, e, e.pendingProps.children, l),
          e.child
        );
      case 29:
        throw e.pendingProps;
    }
    throw Error(s(156, e.tag));
  }
  function ll(t) {
    t.flags |= 4;
  }
  function xs(t, e, l, a, n) {
    if (((e = (t.mode & 32) !== 0) && (e = !1), e)) {
      if (((t.flags |= 16777216), (n & 335544128) === n))
        if (t.stateNode.complete) t.flags |= 8192;
        else if (am()) t.flags |= 8192;
        else throw ((ea = Yu), Gc);
    } else t.flags &= -16777217;
  }
  function Dd(t, e) {
    if (e.type !== 'stylesheet' || (e.state.loading & 4) !== 0) t.flags &= -16777217;
    else if (((t.flags |= 16777216), !Zm(e)))
      if (am()) t.flags |= 8192;
      else throw ((ea = Yu), Gc);
  }
  function ui(t, e) {
    (e !== null && (t.flags |= 4),
      t.flags & 16384 && ((e = t.tag !== 22 ? fo() : 536870912), (t.lanes |= e), (qa |= e)));
  }
  function Hn(t, e) {
    if (!mt)
      switch (t.tailMode) {
        case 'hidden':
          e = t.tail;
          for (var l = null; e !== null; ) (e.alternate !== null && (l = e), (e = e.sibling));
          l === null ? (t.tail = null) : (l.sibling = null);
          break;
        case 'collapsed':
          l = t.tail;
          for (var a = null; l !== null; ) (l.alternate !== null && (a = l), (l = l.sibling));
          a === null
            ? e || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (a.sibling = null);
      }
  }
  function Rt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child,
      l = 0,
      a = 0;
    if (e)
      for (var n = t.child; n !== null; )
        ((l |= n.lanes | n.childLanes),
          (a |= n.subtreeFlags & 65011712),
          (a |= n.flags & 65011712),
          (n.return = t),
          (n = n.sibling));
    else
      for (n = t.child; n !== null; )
        ((l |= n.lanes | n.childLanes),
          (a |= n.subtreeFlags),
          (a |= n.flags),
          (n.return = t),
          (n = n.sibling));
    return ((t.subtreeFlags |= a), (t.childLanes = l), e);
  }
  function Ip(t, e, l) {
    var a = e.pendingProps;
    switch ((Oc(e), e.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Rt(e), null);
      case 1:
        return (Rt(e), null);
      case 3:
        return (
          (l = e.stateNode),
          (a = null),
          t !== null && (a = t.memoizedState.cache),
          e.memoizedState.cache !== a && (e.flags |= 2048),
          Ie(Gt),
          kt(),
          l.pendingContext && ((l.context = l.pendingContext), (l.pendingContext = null)),
          (t === null || t.child === null) &&
            (Na(e)
              ? ll(e)
              : t === null ||
                (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                ((e.flags |= 1024), Uc())),
          Rt(e),
          null
        );
      case 26:
        var n = e.type,
          i = e.memoizedState;
        return (
          t === null
            ? (ll(e), i !== null ? (Rt(e), Dd(e, i)) : (Rt(e), xs(e, n, null, a, l)))
            : i
              ? i !== t.memoizedState
                ? (ll(e), Rt(e), Dd(e, i))
                : (Rt(e), (e.flags &= -16777217))
              : ((t = t.memoizedProps), t !== a && ll(e), Rt(e), xs(e, n, t, a, l)),
          null
        );
      case 27:
        if ((pu(e), (l = st.current), (n = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== a && ll(e);
        else {
          if (!a) {
            if (e.stateNode === null) throw Error(s(166));
            return (Rt(e), null);
          }
          ((t = W.current), Na(e) ? or(e) : ((t = Hm(n, a, l)), (e.stateNode = t), ll(e)));
        }
        return (Rt(e), null);
      case 5:
        if ((pu(e), (n = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== a && ll(e);
        else {
          if (!a) {
            if (e.stateNode === null) throw Error(s(166));
            return (Rt(e), null);
          }
          if (((i = W.current), Na(e))) or(e);
          else {
            var o = bi(st.current);
            switch (i) {
              case 1:
                i = o.createElementNS('http://www.w3.org/2000/svg', n);
                break;
              case 2:
                i = o.createElementNS('http://www.w3.org/1998/Math/MathML', n);
                break;
              default:
                switch (n) {
                  case 'svg':
                    i = o.createElementNS('http://www.w3.org/2000/svg', n);
                    break;
                  case 'math':
                    i = o.createElementNS('http://www.w3.org/1998/Math/MathML', n);
                    break;
                  case 'script':
                    ((i = o.createElement('div')),
                      (i.innerHTML = '<script><\/script>'),
                      (i = i.removeChild(i.firstChild)));
                    break;
                  case 'select':
                    ((i =
                      typeof a.is == 'string'
                        ? o.createElement('select', { is: a.is })
                        : o.createElement('select')),
                      a.multiple ? (i.multiple = !0) : a.size && (i.size = a.size));
                    break;
                  default:
                    i =
                      typeof a.is == 'string'
                        ? o.createElement(n, { is: a.is })
                        : o.createElement(n);
                }
            }
            ((i[Wt] = e), (i[ue] = a));
            t: for (o = e.child; o !== null; ) {
              if (o.tag === 5 || o.tag === 6) i.appendChild(o.stateNode);
              else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
                ((o.child.return = o), (o = o.child));
                continue;
              }
              if (o === e) break t;
              for (; o.sibling === null; ) {
                if (o.return === null || o.return === e) break t;
                o = o.return;
              }
              ((o.sibling.return = o.return), (o = o.sibling));
            }
            e.stateNode = i;
            t: switch ((te(i, n, a), n)) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                a = !!a.autoFocus;
                break t;
              case 'img':
                a = !0;
                break t;
              default:
                a = !1;
            }
            a && ll(e);
          }
        }
        return (Rt(e), xs(e, e.type, t === null ? null : t.memoizedProps, e.pendingProps, l), null);
      case 6:
        if (t && e.stateNode != null) t.memoizedProps !== a && ll(e);
        else {
          if (typeof a != 'string' && e.stateNode === null) throw Error(s(166));
          if (((t = st.current), Na(e))) {
            if (((t = e.stateNode), (l = e.memoizedProps), (a = null), (n = Ft), n !== null))
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            ((t[Wt] = e),
              (t = !!(
                t.nodeValue === l ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                Nm(t.nodeValue, l)
              )),
              t || gl(e, !0));
          } else ((t = bi(t).createTextNode(a)), (t[Wt] = e), (e.stateNode = t));
        }
        return (Rt(e), null);
      case 31:
        if (((l = e.memoizedState), t === null || t.memoizedState !== null)) {
          if (((a = Na(e)), l !== null)) {
            if (t === null) {
              if (!a) throw Error(s(318));
              if (((t = e.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
                throw Error(s(557));
              t[Wt] = e;
            } else (Wl(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (Rt(e), (t = !1));
          } else
            ((l = Uc()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l),
              (t = !0));
          if (!t) return e.flags & 256 ? (_e(e), e) : (_e(e), null);
          if ((e.flags & 128) !== 0) throw Error(s(558));
        }
        return (Rt(e), null);
      case 13:
        if (
          ((a = e.memoizedState),
          t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((n = Na(e)), a !== null && a.dehydrated !== null)) {
            if (t === null) {
              if (!n) throw Error(s(318));
              if (((n = e.memoizedState), (n = n !== null ? n.dehydrated : null), !n))
                throw Error(s(317));
              n[Wt] = e;
            } else (Wl(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (Rt(e), (n = !1));
          } else
            ((n = Uc()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n),
              (n = !0));
          if (!n) return e.flags & 256 ? (_e(e), e) : (_e(e), null);
        }
        return (
          _e(e),
          (e.flags & 128) !== 0
            ? ((e.lanes = l), e)
            : ((l = a !== null),
              (t = t !== null && t.memoizedState !== null),
              l &&
                ((a = e.child),
                (n = null),
                a.alternate !== null &&
                  a.alternate.memoizedState !== null &&
                  a.alternate.memoizedState.cachePool !== null &&
                  (n = a.alternate.memoizedState.cachePool.pool),
                (i = null),
                a.memoizedState !== null &&
                  a.memoizedState.cachePool !== null &&
                  (i = a.memoizedState.cachePool.pool),
                i !== n && (a.flags |= 2048)),
              l !== t && l && (e.child.flags |= 8192),
              ui(e, e.updateQueue),
              Rt(e),
              null)
        );
      case 4:
        return (kt(), t === null && Zs(e.stateNode.containerInfo), Rt(e), null);
      case 10:
        return (Ie(e.type), Rt(e), null);
      case 19:
        if ((H(Ht), (a = e.memoizedState), a === null)) return (Rt(e), null);
        if (((n = (e.flags & 128) !== 0), (i = a.rendering), i === null))
          if (n) Hn(a, !1);
          else {
            if (Bt !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = e.child; t !== null; ) {
                if (((i = Zu(t)), i !== null)) {
                  for (
                    e.flags |= 128,
                      Hn(a, !1),
                      t = i.updateQueue,
                      e.updateQueue = t,
                      ui(e, t),
                      e.subtreeFlags = 0,
                      t = l,
                      l = e.child;
                    l !== null;
                  )
                    (ur(l, t), (l = l.sibling));
                  return (Z(Ht, (Ht.current & 1) | 2), mt && We(e, a.treeForkCount), e.child);
                }
                t = t.sibling;
              }
            a.tail !== null &&
              me() > oi &&
              ((e.flags |= 128), (n = !0), Hn(a, !1), (e.lanes = 4194304));
          }
        else {
          if (!n)
            if (((t = Zu(i)), t !== null)) {
              if (
                ((e.flags |= 128),
                (n = !0),
                (t = t.updateQueue),
                (e.updateQueue = t),
                ui(e, t),
                Hn(a, !0),
                a.tail === null && a.tailMode === 'hidden' && !i.alternate && !mt)
              )
                return (Rt(e), null);
            } else
              2 * me() - a.renderingStartTime > oi &&
                l !== 536870912 &&
                ((e.flags |= 128), (n = !0), Hn(a, !1), (e.lanes = 4194304));
          a.isBackwards
            ? ((i.sibling = e.child), (e.child = i))
            : ((t = a.last), t !== null ? (t.sibling = i) : (e.child = i), (a.last = i));
        }
        return a.tail !== null
          ? ((t = a.tail),
            (a.rendering = t),
            (a.tail = t.sibling),
            (a.renderingStartTime = me()),
            (t.sibling = null),
            (l = Ht.current),
            Z(Ht, n ? (l & 1) | 2 : l & 1),
            mt && We(e, a.treeForkCount),
            t)
          : (Rt(e), null);
      case 22:
      case 23:
        return (
          _e(e),
          Kc(),
          (a = e.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== a && (e.flags |= 8192)
            : a && (e.flags |= 8192),
          a
            ? (l & 536870912) !== 0 &&
              (e.flags & 128) === 0 &&
              (Rt(e), e.subtreeFlags & 6 && (e.flags |= 8192))
            : Rt(e),
          (l = e.updateQueue),
          l !== null && ui(e, l.retryQueue),
          (l = null),
          t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (l = t.memoizedState.cachePool.pool),
          (a = null),
          e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (a = e.memoizedState.cachePool.pool),
          a !== l && (e.flags |= 2048),
          t !== null && H(Pl),
          null
        );
      case 24:
        return (
          (l = null),
          t !== null && (l = t.memoizedState.cache),
          e.memoizedState.cache !== l && (e.flags |= 2048),
          Ie(Gt),
          Rt(e),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, e.tag));
  }
  function Pp(t, e) {
    switch ((Oc(e), e.tag)) {
      case 1:
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 3:
        return (
          Ie(Gt),
          kt(),
          (t = e.flags),
          (t & 65536) !== 0 && (t & 128) === 0 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 26:
      case 27:
      case 5:
        return (pu(e), null);
      case 31:
        if (e.memoizedState !== null) {
          if ((_e(e), e.alternate === null)) throw Error(s(340));
          Wl();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 13:
        if ((_e(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)) {
          if (e.alternate === null) throw Error(s(340));
          Wl();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 19:
        return (H(Ht), null);
      case 4:
        return (kt(), null);
      case 10:
        return (Ie(e.type), null);
      case 22:
      case 23:
        return (
          _e(e),
          Kc(),
          t !== null && H(Pl),
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 24:
        return (Ie(Gt), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Od(t, e) {
    switch ((Oc(e), e.tag)) {
      case 3:
        (Ie(Gt), kt());
        break;
      case 26:
      case 27:
      case 5:
        pu(e);
        break;
      case 4:
        kt();
        break;
      case 31:
        e.memoizedState !== null && _e(e);
        break;
      case 13:
        _e(e);
        break;
      case 19:
        H(Ht);
        break;
      case 10:
        Ie(e.type);
        break;
      case 22:
      case 23:
        (_e(e), Kc(), t !== null && H(Pl));
        break;
      case 24:
        Ie(Gt);
    }
  }
  function Ln(t, e) {
    try {
      var l = e.updateQueue,
        a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        l = n;
        do {
          if ((l.tag & t) === t) {
            a = void 0;
            var i = l.create,
              o = l.inst;
            ((a = i()), (o.destroy = a));
          }
          l = l.next;
        } while (l !== n);
      }
    } catch (d) {
      Et(e, e.return, d);
    }
  }
  function Al(t, e, l) {
    try {
      var a = e.updateQueue,
        n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var i = n.next;
        a = i;
        do {
          if ((a.tag & t) === t) {
            var o = a.inst,
              d = o.destroy;
            if (d !== void 0) {
              ((o.destroy = void 0), (n = e));
              var g = l,
                C = d;
              try {
                C();
              } catch (U) {
                Et(n, g, U);
              }
            }
          }
          a = a.next;
        } while (a !== i);
      }
    } catch (U) {
      Et(e, e.return, U);
    }
  }
  function jd(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        Tr(e, l);
      } catch (a) {
        Et(t, t.return, a);
      }
    }
  }
  function Ud(t, e, l) {
    ((l.props = na(t.type, t.memoizedProps)), (l.state = t.memoizedState));
    try {
      l.componentWillUnmount();
    } catch (a) {
      Et(t, e, a);
    }
  }
  function qn(t, e) {
    try {
      var l = t.ref;
      if (l !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var a = t.stateNode;
            break;
          case 30:
            a = t.stateNode;
            break;
          default:
            a = t.stateNode;
        }
        typeof l == 'function' ? (t.refCleanup = l(a)) : (l.current = a);
      }
    } catch (n) {
      Et(t, e, n);
    }
  }
  function Ye(t, e) {
    var l = t.ref,
      a = t.refCleanup;
    if (l !== null)
      if (typeof a == 'function')
        try {
          a();
        } catch (n) {
          Et(t, e, n);
        } finally {
          ((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
        }
      else if (typeof l == 'function')
        try {
          l(null);
        } catch (n) {
          Et(t, e, n);
        }
      else l.current = null;
  }
  function wd(t) {
    var e = t.type,
      l = t.memoizedProps,
      a = t.stateNode;
    try {
      t: switch (e) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          l.autoFocus && a.focus();
          break t;
        case 'img':
          l.src ? (a.src = l.src) : l.srcSet && (a.srcset = l.srcSet);
      }
    } catch (n) {
      Et(t, t.return, n);
    }
  }
  function As(t, e, l) {
    try {
      var a = t.stateNode;
      (Sv(a, t.type, l, e), (a[ue] = e));
    } catch (n) {
      Et(t, t.return, n);
    }
  }
  function Bd(t) {
    return (
      t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && Ol(t.type)) || t.tag === 4
    );
  }
  function Ms(t) {
    t: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || Bd(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
      ) {
        if ((t.tag === 27 && Ol(t.type)) || t.flags & 2 || t.child === null || t.tag === 4)
          continue t;
        ((t.child.return = t), (t = t.child));
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Ns(t, e, l) {
    var a = t.tag;
    if (a === 5 || a === 6)
      ((t = t.stateNode),
        e
          ? (l.nodeType === 9
              ? l.body
              : l.nodeName === 'HTML'
                ? l.ownerDocument.body
                : l
            ).insertBefore(t, e)
          : ((e = l.nodeType === 9 ? l.body : l.nodeName === 'HTML' ? l.ownerDocument.body : l),
            e.appendChild(t),
            (l = l._reactRootContainer),
            l != null || e.onclick !== null || (e.onclick = Ke)));
    else if (
      a !== 4 &&
      (a === 27 && Ol(t.type) && ((l = t.stateNode), (e = null)), (t = t.child), t !== null)
    )
      for (Ns(t, e, l), t = t.sibling; t !== null; ) (Ns(t, e, l), (t = t.sibling));
  }
  function ii(t, e, l) {
    var a = t.tag;
    if (a === 5 || a === 6) ((t = t.stateNode), e ? l.insertBefore(t, e) : l.appendChild(t));
    else if (a !== 4 && (a === 27 && Ol(t.type) && (l = t.stateNode), (t = t.child), t !== null))
      for (ii(t, e, l), t = t.sibling; t !== null; ) (ii(t, e, l), (t = t.sibling));
  }
  function kd(t) {
    var e = t.stateNode,
      l = t.memoizedProps;
    try {
      for (var a = t.type, n = e.attributes; n.length; ) e.removeAttributeNode(n[0]);
      (te(e, a, l), (e[Wt] = t), (e[ue] = l));
    } catch (i) {
      Et(t, t.return, i);
    }
  }
  var al = !1,
    Qt = !1,
    Cs = !1,
    Hd = typeof WeakSet == 'function' ? WeakSet : Set,
    $t = null;
  function tv(t, e) {
    if (((t = t.containerInfo), ($s = Ni), (t = Wo(t)), Sc(t))) {
      if ('selectionStart' in t) var l = { start: t.selectionStart, end: t.selectionEnd };
      else
        t: {
          l = ((l = t.ownerDocument) && l.defaultView) || window;
          var a = l.getSelection && l.getSelection();
          if (a && a.rangeCount !== 0) {
            l = a.anchorNode;
            var n = a.anchorOffset,
              i = a.focusNode;
            a = a.focusOffset;
            try {
              (l.nodeType, i.nodeType);
            } catch {
              l = null;
              break t;
            }
            var o = 0,
              d = -1,
              g = -1,
              C = 0,
              U = 0,
              L = t,
              z = null;
            e: for (;;) {
              for (
                var D;
                L !== l || (n !== 0 && L.nodeType !== 3) || (d = o + n),
                  L !== i || (a !== 0 && L.nodeType !== 3) || (g = o + a),
                  L.nodeType === 3 && (o += L.nodeValue.length),
                  (D = L.firstChild) !== null;
              )
                ((z = L), (L = D));
              for (;;) {
                if (L === t) break e;
                if (
                  (z === l && ++C === n && (d = o),
                  z === i && ++U === a && (g = o),
                  (D = L.nextSibling) !== null)
                )
                  break;
                ((L = z), (z = L.parentNode));
              }
              L = D;
            }
            l = d === -1 || g === -1 ? null : { start: d, end: g };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Ws = { focusedElem: t, selectionRange: l }, Ni = !1, $t = e; $t !== null; )
      if (((e = $t), (t = e.child), (e.subtreeFlags & 1028) !== 0 && t !== null))
        ((t.return = e), ($t = t));
      else
        for (; $t !== null; ) {
          switch (((e = $t), (i = e.alternate), (t = e.flags), e.tag)) {
            case 0:
              if (
                (t & 4) !== 0 &&
                ((t = e.updateQueue), (t = t !== null ? t.events : null), t !== null)
              )
                for (l = 0; l < t.length; l++) ((n = t[l]), (n.ref.impl = n.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && i !== null) {
                ((t = void 0),
                  (l = e),
                  (n = i.memoizedProps),
                  (i = i.memoizedState),
                  (a = l.stateNode));
                try {
                  var $ = na(l.type, n);
                  ((t = a.getSnapshotBeforeUpdate($, i)),
                    (a.__reactInternalSnapshotBeforeUpdate = t));
                } catch (tt) {
                  Et(l, l.return, tt);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (((t = e.stateNode.containerInfo), (l = t.nodeType), l === 9)) Ps(t);
                else if (l === 1)
                  switch (t.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      Ps(t);
                      break;
                    default:
                      t.textContent = '';
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(s(163));
          }
          if (((t = e.sibling), t !== null)) {
            ((t.return = e.return), ($t = t));
            break;
          }
          $t = e.return;
        }
  }
  function Ld(t, e, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (ul(t, l), a & 4 && Ln(5, l));
        break;
      case 1:
        if ((ul(t, l), a & 4))
          if (((t = l.stateNode), e === null))
            try {
              t.componentDidMount();
            } catch (o) {
              Et(l, l.return, o);
            }
          else {
            var n = na(l.type, e.memoizedProps);
            e = e.memoizedState;
            try {
              t.componentDidUpdate(n, e, t.__reactInternalSnapshotBeforeUpdate);
            } catch (o) {
              Et(l, l.return, o);
            }
          }
        (a & 64 && jd(l), a & 512 && qn(l, l.return));
        break;
      case 3:
        if ((ul(t, l), a & 64 && ((t = l.updateQueue), t !== null))) {
          if (((e = null), l.child !== null))
            switch (l.child.tag) {
              case 27:
              case 5:
                e = l.child.stateNode;
                break;
              case 1:
                e = l.child.stateNode;
            }
          try {
            Tr(t, e);
          } catch (o) {
            Et(l, l.return, o);
          }
        }
        break;
      case 27:
        e === null && a & 4 && kd(l);
      case 26:
      case 5:
        (ul(t, l), e === null && a & 4 && wd(l), a & 512 && qn(l, l.return));
        break;
      case 12:
        ul(t, l);
        break;
      case 31:
        (ul(t, l), a & 4 && Yd(t, l));
        break;
      case 13:
        (ul(t, l),
          a & 4 && Xd(t, l),
          a & 64 &&
            ((t = l.memoizedState),
            t !== null && ((t = t.dehydrated), t !== null && ((l = fv.bind(null, l)), Rv(t, l)))));
        break;
      case 22:
        if (((a = l.memoizedState !== null || al), !a)) {
          ((e = (e !== null && e.memoizedState !== null) || Qt), (n = al));
          var i = Qt;
          ((al = a),
            (Qt = e) && !i ? il(t, l, (l.subtreeFlags & 8772) !== 0) : ul(t, l),
            (al = n),
            (Qt = i));
        }
        break;
      case 30:
        break;
      default:
        ul(t, l);
    }
  }
  function qd(t) {
    var e = t.alternate;
    (e !== null && ((t.alternate = null), qd(e)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((e = t.stateNode), e !== null && nc(e)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null));
  }
  var zt = null,
    ce = !1;
  function nl(t, e, l) {
    for (l = l.child; l !== null; ) (Gd(t, e, l), (l = l.sibling));
  }
  function Gd(t, e, l) {
    if (he && typeof he.onCommitFiberUnmount == 'function')
      try {
        he.onCommitFiberUnmount(on, l);
      } catch {}
    switch (l.tag) {
      case 26:
        (Qt || Ye(l, e),
          nl(t, e, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
        break;
      case 27:
        Qt || Ye(l, e);
        var a = zt,
          n = ce;
        (Ol(l.type) && ((zt = l.stateNode), (ce = !1)),
          nl(t, e, l),
          $n(l.stateNode),
          (zt = a),
          (ce = n));
        break;
      case 5:
        Qt || Ye(l, e);
      case 6:
        if (((a = zt), (n = ce), (zt = null), nl(t, e, l), (zt = a), (ce = n), zt !== null))
          if (ce)
            try {
              (zt.nodeType === 9
                ? zt.body
                : zt.nodeName === 'HTML'
                  ? zt.ownerDocument.body
                  : zt
              ).removeChild(l.stateNode);
            } catch (i) {
              Et(l, e, i);
            }
          else
            try {
              zt.removeChild(l.stateNode);
            } catch (i) {
              Et(l, e, i);
            }
        break;
      case 18:
        zt !== null &&
          (ce
            ? ((t = zt),
              jm(
                t.nodeType === 9 ? t.body : t.nodeName === 'HTML' ? t.ownerDocument.body : t,
                l.stateNode
              ),
              Ja(t))
            : jm(zt, l.stateNode));
        break;
      case 4:
        ((a = zt),
          (n = ce),
          (zt = l.stateNode.containerInfo),
          (ce = !0),
          nl(t, e, l),
          (zt = a),
          (ce = n));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Al(2, l, e), Qt || Al(4, l, e), nl(t, e, l));
        break;
      case 1:
        (Qt ||
          (Ye(l, e), (a = l.stateNode), typeof a.componentWillUnmount == 'function' && Ud(l, e, a)),
          nl(t, e, l));
        break;
      case 21:
        nl(t, e, l);
        break;
      case 22:
        ((Qt = (a = Qt) || l.memoizedState !== null), nl(t, e, l), (Qt = a));
        break;
      default:
        nl(t, e, l);
    }
  }
  function Yd(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated;
      try {
        Ja(t);
      } catch (l) {
        Et(e, e.return, l);
      }
    }
  }
  function Xd(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate),
      t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        Ja(t);
      } catch (l) {
        Et(e, e.return, l);
      }
  }
  function ev(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return (e === null && (e = t.stateNode = new Hd()), e);
      case 22:
        return (
          (t = t.stateNode),
          (e = t._retryCache),
          e === null && (e = t._retryCache = new Hd()),
          e
        );
      default:
        throw Error(s(435, t.tag));
    }
  }
  function ci(t, e) {
    var l = ev(t);
    e.forEach(function (a) {
      if (!l.has(a)) {
        l.add(a);
        var n = ov.bind(null, t, a);
        a.then(n, n);
      }
    });
  }
  function se(t, e) {
    var l = e.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a],
          i = t,
          o = e,
          d = o;
        t: for (; d !== null; ) {
          switch (d.tag) {
            case 27:
              if (Ol(d.type)) {
                ((zt = d.stateNode), (ce = !1));
                break t;
              }
              break;
            case 5:
              ((zt = d.stateNode), (ce = !1));
              break t;
            case 3:
            case 4:
              ((zt = d.stateNode.containerInfo), (ce = !0));
              break t;
          }
          d = d.return;
        }
        if (zt === null) throw Error(s(160));
        (Gd(i, o, n),
          (zt = null),
          (ce = !1),
          (i = n.alternate),
          i !== null && (i.return = null),
          (n.return = null));
      }
    if (e.subtreeFlags & 13886) for (e = e.child; e !== null; ) (Qd(e, t), (e = e.sibling));
  }
  var Be = null;
  function Qd(t, e) {
    var l = t.alternate,
      a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (se(e, t), fe(t), a & 4 && (Al(3, t, t.return), Ln(3, t), Al(5, t, t.return)));
        break;
      case 1:
        (se(e, t),
          fe(t),
          a & 512 && (Qt || l === null || Ye(l, l.return)),
          a & 64 &&
            al &&
            ((t = t.updateQueue),
            t !== null &&
              ((a = t.callbacks),
              a !== null &&
                ((l = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = l === null ? a : l.concat(a))))));
        break;
      case 26:
        var n = Be;
        if ((se(e, t), fe(t), a & 512 && (Qt || l === null || Ye(l, l.return)), a & 4)) {
          var i = l !== null ? l.memoizedState : null;
          if (((a = t.memoizedState), l === null))
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  ((a = t.type), (l = t.memoizedProps), (n = n.ownerDocument || n));
                  e: switch (a) {
                    case 'title':
                      ((i = n.getElementsByTagName('title')[0]),
                        (!i ||
                          i[mn] ||
                          i[Wt] ||
                          i.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          i.hasAttribute('itemprop')) &&
                          ((i = n.createElement(a)),
                          n.head.insertBefore(i, n.querySelector('head > title'))),
                        te(i, a, l),
                        (i[Wt] = t),
                        Jt(i),
                        (a = i));
                      break t;
                    case 'link':
                      var o = Qm('link', 'href', n).get(a + (l.href || ''));
                      if (o) {
                        for (var d = 0; d < o.length; d++)
                          if (
                            ((i = o[d]),
                            i.getAttribute('href') ===
                              (l.href == null || l.href === '' ? null : l.href) &&
                              i.getAttribute('rel') === (l.rel == null ? null : l.rel) &&
                              i.getAttribute('title') === (l.title == null ? null : l.title) &&
                              i.getAttribute('crossorigin') ===
                                (l.crossOrigin == null ? null : l.crossOrigin))
                          ) {
                            o.splice(d, 1);
                            break e;
                          }
                      }
                      ((i = n.createElement(a)), te(i, a, l), n.head.appendChild(i));
                      break;
                    case 'meta':
                      if ((o = Qm('meta', 'content', n).get(a + (l.content || '')))) {
                        for (d = 0; d < o.length; d++)
                          if (
                            ((i = o[d]),
                            i.getAttribute('content') ===
                              (l.content == null ? null : '' + l.content) &&
                              i.getAttribute('name') === (l.name == null ? null : l.name) &&
                              i.getAttribute('property') ===
                                (l.property == null ? null : l.property) &&
                              i.getAttribute('http-equiv') ===
                                (l.httpEquiv == null ? null : l.httpEquiv) &&
                              i.getAttribute('charset') === (l.charSet == null ? null : l.charSet))
                          ) {
                            o.splice(d, 1);
                            break e;
                          }
                      }
                      ((i = n.createElement(a)), te(i, a, l), n.head.appendChild(i));
                      break;
                    default:
                      throw Error(s(468, a));
                  }
                  ((i[Wt] = t), Jt(i), (a = i));
                }
                t.stateNode = a;
              } else Vm(n, t.type, t.stateNode);
            else t.stateNode = Xm(n, a, t.memoizedProps);
          else
            i !== a
              ? (i === null
                  ? l.stateNode !== null && ((l = l.stateNode), l.parentNode.removeChild(l))
                  : i.count--,
                a === null ? Vm(n, t.type, t.stateNode) : Xm(n, a, t.memoizedProps))
              : a === null && t.stateNode !== null && As(t, t.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        (se(e, t),
          fe(t),
          a & 512 && (Qt || l === null || Ye(l, l.return)),
          l !== null && a & 4 && As(t, t.memoizedProps, l.memoizedProps));
        break;
      case 5:
        if ((se(e, t), fe(t), a & 512 && (Qt || l === null || Ye(l, l.return)), t.flags & 32)) {
          n = t.stateNode;
          try {
            va(n, '');
          } catch ($) {
            Et(t, t.return, $);
          }
        }
        (a & 4 &&
          t.stateNode != null &&
          ((n = t.memoizedProps), As(t, n, l !== null ? l.memoizedProps : n)),
          a & 1024 && (Cs = !0));
        break;
      case 6:
        if ((se(e, t), fe(t), a & 4)) {
          if (t.stateNode === null) throw Error(s(162));
          ((a = t.memoizedProps), (l = t.stateNode));
          try {
            l.nodeValue = a;
          } catch ($) {
            Et(t, t.return, $);
          }
        }
        break;
      case 3:
        if (
          ((Ti = null),
          (n = Be),
          (Be = Si(e.containerInfo)),
          se(e, t),
          (Be = n),
          fe(t),
          a & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            Ja(e.containerInfo);
          } catch ($) {
            Et(t, t.return, $);
          }
        Cs && ((Cs = !1), Vd(t));
        break;
      case 4:
        ((a = Be), (Be = Si(t.stateNode.containerInfo)), se(e, t), fe(t), (Be = a));
        break;
      case 12:
        (se(e, t), fe(t));
        break;
      case 31:
        (se(e, t),
          fe(t),
          a & 4 && ((a = t.updateQueue), a !== null && ((t.updateQueue = null), ci(t, a))));
        break;
      case 13:
        (se(e, t),
          fe(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) != (l !== null && l.memoizedState !== null) &&
            (fi = me()),
          a & 4 && ((a = t.updateQueue), a !== null && ((t.updateQueue = null), ci(t, a))));
        break;
      case 22:
        n = t.memoizedState !== null;
        var g = l !== null && l.memoizedState !== null,
          C = al,
          U = Qt;
        if (((al = C || n), (Qt = U || g), se(e, t), (Qt = U), (al = C), fe(t), a & 8192))
          t: for (
            e = t.stateNode,
              e._visibility = n ? e._visibility & -2 : e._visibility | 1,
              n && (l === null || g || al || Qt || ua(t)),
              l = null,
              e = t;
            ;
          ) {
            if (e.tag === 5 || e.tag === 26) {
              if (l === null) {
                g = l = e;
                try {
                  if (((i = g.stateNode), n))
                    ((o = i.style),
                      typeof o.setProperty == 'function'
                        ? o.setProperty('display', 'none', 'important')
                        : (o.display = 'none'));
                  else {
                    d = g.stateNode;
                    var L = g.memoizedProps.style,
                      z = L != null && L.hasOwnProperty('display') ? L.display : null;
                    d.style.display = z == null || typeof z == 'boolean' ? '' : ('' + z).trim();
                  }
                } catch ($) {
                  Et(g, g.return, $);
                }
              }
            } else if (e.tag === 6) {
              if (l === null) {
                g = e;
                try {
                  g.stateNode.nodeValue = n ? '' : g.memoizedProps;
                } catch ($) {
                  Et(g, g.return, $);
                }
              }
            } else if (e.tag === 18) {
              if (l === null) {
                g = e;
                try {
                  var D = g.stateNode;
                  n ? Um(D, !0) : Um(g.stateNode, !1);
                } catch ($) {
                  Et(g, g.return, $);
                }
              }
            } else if (
              ((e.tag !== 22 && e.tag !== 23) || e.memoizedState === null || e === t) &&
              e.child !== null
            ) {
              ((e.child.return = e), (e = e.child));
              continue;
            }
            if (e === t) break t;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t;
              (l === e && (l = null), (e = e.return));
            }
            (l === e && (l = null), (e.sibling.return = e.return), (e = e.sibling));
          }
        a & 4 &&
          ((a = t.updateQueue),
          a !== null && ((l = a.retryQueue), l !== null && ((a.retryQueue = null), ci(t, l))));
        break;
      case 19:
        (se(e, t),
          fe(t),
          a & 4 && ((a = t.updateQueue), a !== null && ((t.updateQueue = null), ci(t, a))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (se(e, t), fe(t));
    }
  }
  function fe(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var l, a = t.return; a !== null; ) {
          if (Bd(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        if (l == null) throw Error(s(160));
        switch (l.tag) {
          case 27:
            var n = l.stateNode,
              i = Ms(t);
            ii(t, i, n);
            break;
          case 5:
            var o = l.stateNode;
            l.flags & 32 && (va(o, ''), (l.flags &= -33));
            var d = Ms(t);
            ii(t, d, o);
            break;
          case 3:
          case 4:
            var g = l.stateNode.containerInfo,
              C = Ms(t);
            Ns(t, C, g);
            break;
          default:
            throw Error(s(161));
        }
      } catch (U) {
        Et(t, t.return, U);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Vd(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        (Vd(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), (t = t.sibling));
      }
  }
  function ul(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; ) (Ld(t, e.alternate, e), (e = e.sibling));
  }
  function ua(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Al(4, e, e.return), ua(e));
          break;
        case 1:
          Ye(e, e.return);
          var l = e.stateNode;
          (typeof l.componentWillUnmount == 'function' && Ud(e, e.return, l), ua(e));
          break;
        case 27:
          $n(e.stateNode);
        case 26:
        case 5:
          (Ye(e, e.return), ua(e));
          break;
        case 22:
          e.memoizedState === null && ua(e);
          break;
        case 30:
          ua(e);
          break;
        default:
          ua(e);
      }
      t = t.sibling;
    }
  }
  function il(t, e, l) {
    for (l = l && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var a = e.alternate,
        n = t,
        i = e,
        o = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          (il(n, i, l), Ln(4, i));
          break;
        case 1:
          if ((il(n, i, l), (a = i), (n = a.stateNode), typeof n.componentDidMount == 'function'))
            try {
              n.componentDidMount();
            } catch (C) {
              Et(a, a.return, C);
            }
          if (((a = i), (n = a.updateQueue), n !== null)) {
            var d = a.stateNode;
            try {
              var g = n.shared.hiddenCallbacks;
              if (g !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < g.length; n++) Er(g[n], d);
            } catch (C) {
              Et(a, a.return, C);
            }
          }
          (l && o & 64 && jd(i), qn(i, i.return));
          break;
        case 27:
          kd(i);
        case 26:
        case 5:
          (il(n, i, l), l && a === null && o & 4 && wd(i), qn(i, i.return));
          break;
        case 12:
          il(n, i, l);
          break;
        case 31:
          (il(n, i, l), l && o & 4 && Yd(n, i));
          break;
        case 13:
          (il(n, i, l), l && o & 4 && Xd(n, i));
          break;
        case 22:
          (i.memoizedState === null && il(n, i, l), qn(i, i.return));
          break;
        case 30:
          break;
        default:
          il(n, i, l);
      }
      e = e.sibling;
    }
  }
  function Rs(t, e) {
    var l = null;
    (t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (l = t.memoizedState.cachePool.pool),
      (t = null),
      e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (t = e.memoizedState.cachePool.pool),
      t !== l && (t != null && t.refCount++, l != null && Mn(l)));
  }
  function zs(t, e) {
    ((t = null),
      e.alternate !== null && (t = e.alternate.memoizedState.cache),
      (e = e.memoizedState.cache),
      e !== t && (e.refCount++, t != null && Mn(t)));
  }
  function ke(t, e, l, a) {
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (Zd(t, e, l, a), (e = e.sibling));
  }
  function Zd(t, e, l, a) {
    var n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (ke(t, e, l, a), n & 2048 && Ln(9, e));
        break;
      case 1:
        ke(t, e, l, a);
        break;
      case 3:
        (ke(t, e, l, a),
          n & 2048 &&
            ((t = null),
            e.alternate !== null && (t = e.alternate.memoizedState.cache),
            (e = e.memoizedState.cache),
            e !== t && (e.refCount++, t != null && Mn(t))));
        break;
      case 12:
        if (n & 2048) {
          (ke(t, e, l, a), (t = e.stateNode));
          try {
            var i = e.memoizedProps,
              o = i.id,
              d = i.onPostCommit;
            typeof d == 'function' &&
              d(o, e.alternate === null ? 'mount' : 'update', t.passiveEffectDuration, -0);
          } catch (g) {
            Et(e, e.return, g);
          }
        } else ke(t, e, l, a);
        break;
      case 31:
        ke(t, e, l, a);
        break;
      case 13:
        ke(t, e, l, a);
        break;
      case 23:
        break;
      case 22:
        ((i = e.stateNode),
          (o = e.alternate),
          e.memoizedState !== null
            ? i._visibility & 2
              ? ke(t, e, l, a)
              : Gn(t, e)
            : i._visibility & 2
              ? ke(t, e, l, a)
              : ((i._visibility |= 2), ka(t, e, l, a, (e.subtreeFlags & 10256) !== 0 || !1)),
          n & 2048 && Rs(o, e));
        break;
      case 24:
        (ke(t, e, l, a), n & 2048 && zs(e.alternate, e));
        break;
      default:
        ke(t, e, l, a);
    }
  }
  function ka(t, e, l, a, n) {
    for (n = n && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var i = t,
        o = e,
        d = l,
        g = a,
        C = o.flags;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          (ka(i, o, d, g, n), Ln(8, o));
          break;
        case 23:
          break;
        case 22:
          var U = o.stateNode;
          (o.memoizedState !== null
            ? U._visibility & 2
              ? ka(i, o, d, g, n)
              : Gn(i, o)
            : ((U._visibility |= 2), ka(i, o, d, g, n)),
            n && C & 2048 && Rs(o.alternate, o));
          break;
        case 24:
          (ka(i, o, d, g, n), n && C & 2048 && zs(o.alternate, o));
          break;
        default:
          ka(i, o, d, g, n);
      }
      e = e.sibling;
    }
  }
  function Gn(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t,
          a = e,
          n = a.flags;
        switch (a.tag) {
          case 22:
            (Gn(l, a), n & 2048 && Rs(a.alternate, a));
            break;
          case 24:
            (Gn(l, a), n & 2048 && zs(a.alternate, a));
            break;
          default:
            Gn(l, a);
        }
        e = e.sibling;
      }
  }
  var Yn = 8192;
  function Ha(t, e, l) {
    if (t.subtreeFlags & Yn) for (t = t.child; t !== null; ) (Kd(t, e, l), (t = t.sibling));
  }
  function Kd(t, e, l) {
    switch (t.tag) {
      case 26:
        (Ha(t, e, l),
          t.flags & Yn && t.memoizedState !== null && Gv(l, Be, t.memoizedState, t.memoizedProps));
        break;
      case 5:
        Ha(t, e, l);
        break;
      case 3:
      case 4:
        var a = Be;
        ((Be = Si(t.stateNode.containerInfo)), Ha(t, e, l), (Be = a));
        break;
      case 22:
        t.memoizedState === null &&
          ((a = t.alternate),
          a !== null && a.memoizedState !== null
            ? ((a = Yn), (Yn = 16777216), Ha(t, e, l), (Yn = a))
            : Ha(t, e, l));
        break;
      default:
        Ha(t, e, l);
    }
  }
  function Jd(t) {
    var e = t.alternate;
    if (e !== null && ((t = e.child), t !== null)) {
      e.child = null;
      do ((e = t.sibling), (t.sibling = null), (t = e));
      while (t !== null);
    }
  }
  function Xn(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          (($t = a), Wd(a, t));
        }
      Jd(t);
    }
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) ($d(t), (t = t.sibling));
  }
  function $d(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Xn(t), t.flags & 2048 && Al(9, t, t.return));
        break;
      case 3:
        Xn(t);
        break;
      case 12:
        Xn(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13)
          ? ((e._visibility &= -3), si(t))
          : Xn(t);
        break;
      default:
        Xn(t);
    }
  }
  function si(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          (($t = a), Wd(a, t));
        }
      Jd(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((e = t), e.tag)) {
        case 0:
        case 11:
        case 15:
          (Al(8, e, e.return), si(e));
          break;
        case 22:
          ((l = e.stateNode), l._visibility & 2 && ((l._visibility &= -3), si(e)));
          break;
        default:
          si(e);
      }
      t = t.sibling;
    }
  }
  function Wd(t, e) {
    for (; $t !== null; ) {
      var l = $t;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Al(8, l, e);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Mn(l.memoizedState.cache);
      }
      if (((a = l.child), a !== null)) ((a.return = l), ($t = a));
      else
        t: for (l = t; $t !== null; ) {
          a = $t;
          var n = a.sibling,
            i = a.return;
          if ((qd(a), a === l)) {
            $t = null;
            break t;
          }
          if (n !== null) {
            ((n.return = i), ($t = n));
            break t;
          }
          $t = i;
        }
    }
  }
  var lv = {
      getCacheForType: function (t) {
        var e = It(Gt),
          l = e.data.get(t);
        return (l === void 0 && ((l = t()), e.data.set(t, l)), l);
      },
      cacheSignal: function () {
        return It(Gt).controller.signal;
      },
    },
    av = typeof WeakMap == 'function' ? WeakMap : Map,
    gt = 0,
    Mt = null,
    ft = null,
    rt = 0,
    St = 0,
    be = null,
    Ml = !1,
    La = !1,
    Ds = !1,
    cl = 0,
    Bt = 0,
    Nl = 0,
    ia = 0,
    Os = 0,
    Se = 0,
    qa = 0,
    Qn = null,
    oe = null,
    js = !1,
    fi = 0,
    Fd = 0,
    oi = 1 / 0,
    ri = null,
    Cl = null,
    Zt = 0,
    Rl = null,
    Ga = null,
    sl = 0,
    Us = 0,
    ws = null,
    Id = null,
    Vn = 0,
    Bs = null;
  function Ee() {
    return (gt & 2) !== 0 && rt !== 0 ? rt & -rt : w.T !== null ? Ys() : ho();
  }
  function Pd() {
    if (Se === 0)
      if ((rt & 536870912) === 0 || mt) {
        var t = _u;
        ((_u <<= 1), (_u & 3932160) === 0 && (_u = 262144), (Se = t));
      } else Se = 536870912;
    return ((t = ge.current), t !== null && (t.flags |= 32), Se);
  }
  function re(t, e, l) {
    (((t === Mt && (St === 2 || St === 9)) || t.cancelPendingCommit !== null) &&
      (Ya(t, 0), zl(t, rt, Se, !1)),
      dn(t, l),
      ((gt & 2) === 0 || t !== Mt) &&
        (t === Mt && ((gt & 2) === 0 && (ia |= l), Bt === 4 && zl(t, rt, Se, !1)), Xe(t)));
  }
  function tm(t, e, l) {
    if ((gt & 6) !== 0) throw Error(s(327));
    var a = (!l && (e & 127) === 0 && (e & t.expiredLanes) === 0) || rn(t, e),
      n = a ? iv(t, e) : Hs(t, e, !0),
      i = a;
    do {
      if (n === 0) {
        La && !a && zl(t, e, 0, !1);
        break;
      } else {
        if (((l = t.current.alternate), i && !nv(l))) {
          ((n = Hs(t, e, !1)), (i = !1));
          continue;
        }
        if (n === 2) {
          if (((i = e), t.errorRecoveryDisabledLanes & i)) var o = 0;
          else
            ((o = t.pendingLanes & -536870913), (o = o !== 0 ? o : o & 536870912 ? 536870912 : 0));
          if (o !== 0) {
            e = o;
            t: {
              var d = t;
              n = Qn;
              var g = d.current.memoizedState.isDehydrated;
              if ((g && (Ya(d, o).flags |= 256), (o = Hs(d, o, !1)), o !== 2)) {
                if (Ds && !g) {
                  ((d.errorRecoveryDisabledLanes |= i), (ia |= i), (n = 4));
                  break t;
                }
                ((i = oe), (oe = n), i !== null && (oe === null ? (oe = i) : oe.push.apply(oe, i)));
              }
              n = o;
            }
            if (((i = !1), n !== 2)) continue;
          }
        }
        if (n === 1) {
          (Ya(t, 0), zl(t, e, 0, !0));
          break;
        }
        t: {
          switch (((a = t), (i = n), i)) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              zl(a, e, Se, !Ml);
              break t;
            case 2:
              oe = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((e & 62914560) === e && ((n = fi + 300 - me()), 10 < n)) {
            if ((zl(a, e, Se, !Ml), Su(a, 0, !0) !== 0)) break t;
            ((sl = e),
              (a.timeoutHandle = Dm(
                em.bind(null, a, l, oe, ri, js, e, Se, ia, qa, Ml, i, 'Throttled', -0, 0),
                n
              )));
            break t;
          }
          em(a, l, oe, ri, js, e, Se, ia, qa, Ml, i, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Xe(t);
  }
  function em(t, e, l, a, n, i, o, d, g, C, U, L, z, D) {
    if (((t.timeoutHandle = -1), (L = e.subtreeFlags), L & 8192 || (L & 16785408) === 16785408)) {
      ((L = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ke,
      }),
        Kd(e, i, L));
      var $ = (i & 62914560) === i ? fi - me() : (i & 4194048) === i ? Fd - me() : 0;
      if ((($ = Yv(L, $)), $ !== null)) {
        ((sl = i),
          (t.cancelPendingCommit = $(fm.bind(null, t, e, i, l, a, n, o, d, g, U, L, null, z, D))),
          zl(t, i, o, !C));
        return;
      }
    }
    fm(t, e, i, l, a, n, o, d, g);
  }
  function nv(t) {
    for (var e = t; ; ) {
      var l = e.tag;
      if (
        (l === 0 || l === 11 || l === 15) &&
        e.flags & 16384 &&
        ((l = e.updateQueue), l !== null && ((l = l.stores), l !== null))
      )
        for (var a = 0; a < l.length; a++) {
          var n = l[a],
            i = n.getSnapshot;
          n = n.value;
          try {
            if (!pe(i(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (((l = e.child), e.subtreeFlags & 16384 && l !== null)) ((l.return = e), (e = l));
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    }
    return !0;
  }
  function zl(t, e, l, a) {
    ((e &= ~Os),
      (e &= ~ia),
      (t.suspendedLanes |= e),
      (t.pingedLanes &= ~e),
      a && (t.warmLanes |= e),
      (a = t.expirationTimes));
    for (var n = e; 0 < n; ) {
      var i = 31 - ye(n),
        o = 1 << i;
      ((a[i] = -1), (n &= ~o));
    }
    l !== 0 && oo(t, l, e);
  }
  function di() {
    return (gt & 6) === 0 ? (Zn(0), !1) : !0;
  }
  function ks() {
    if (ft !== null) {
      if (St === 0) var t = ft.return;
      else ((t = ft), (Fe = Fl = null), Pc(t), (Oa = null), (Cn = 0), (t = ft));
      for (; t !== null; ) (Od(t.alternate, t), (t = t.return));
      ft = null;
    }
  }
  function Ya(t, e) {
    var l = t.timeoutHandle;
    (l !== -1 && ((t.timeoutHandle = -1), xv(l)),
      (l = t.cancelPendingCommit),
      l !== null && ((t.cancelPendingCommit = null), l()),
      (sl = 0),
      ks(),
      (Mt = t),
      (ft = l = $e(t.current, null)),
      (rt = e),
      (St = 0),
      (be = null),
      (Ml = !1),
      (La = rn(t, e)),
      (Ds = !1),
      (qa = Se = Os = ia = Nl = Bt = 0),
      (oe = Qn = null),
      (js = !1),
      (e & 8) !== 0 && (e |= e & 32));
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= e; 0 < a; ) {
        var n = 31 - ye(a),
          i = 1 << n;
        ((e |= t[n]), (a &= ~i));
      }
    return ((cl = e), ju(), l);
  }
  function lm(t, e) {
    ((ut = null),
      (w.H = Bn),
      e === Da || e === Gu
        ? ((e = gr()), (St = 3))
        : e === Gc
          ? ((e = gr()), (St = 4))
          : (St =
              e === ys
                ? 8
                : e !== null && typeof e == 'object' && typeof e.then == 'function'
                  ? 6
                  : 1),
      (be = e),
      ft === null && ((Bt = 1), ei(t, Ne(e, t.current))));
  }
  function am() {
    var t = ge.current;
    return t === null
      ? !0
      : (rt & 4194048) === rt
        ? De === null
        : (rt & 62914560) === rt || (rt & 536870912) !== 0
          ? t === De
          : !1;
  }
  function nm() {
    var t = w.H;
    return ((w.H = Bn), t === null ? Bn : t);
  }
  function um() {
    var t = w.A;
    return ((w.A = lv), t);
  }
  function mi() {
    ((Bt = 4),
      Ml || ((rt & 4194048) !== rt && ge.current !== null) || (La = !0),
      ((Nl & 134217727) === 0 && (ia & 134217727) === 0) || Mt === null || zl(Mt, rt, Se, !1));
  }
  function Hs(t, e, l) {
    var a = gt;
    gt |= 2;
    var n = nm(),
      i = um();
    ((Mt !== t || rt !== e) && ((ri = null), Ya(t, e)), (e = !1));
    var o = Bt;
    t: do
      try {
        if (St !== 0 && ft !== null) {
          var d = ft,
            g = be;
          switch (St) {
            case 8:
              (ks(), (o = 6));
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              ge.current === null && (e = !0);
              var C = St;
              if (((St = 0), (be = null), Xa(t, d, g, C), l && La)) {
                o = 0;
                break t;
              }
              break;
            default:
              ((C = St), (St = 0), (be = null), Xa(t, d, g, C));
          }
        }
        (uv(), (o = Bt));
        break;
      } catch (U) {
        lm(t, U);
      }
    while (!0);
    return (
      e && t.shellSuspendCounter++,
      (Fe = Fl = null),
      (gt = a),
      (w.H = n),
      (w.A = i),
      ft === null && ((Mt = null), (rt = 0), ju()),
      o
    );
  }
  function uv() {
    for (; ft !== null; ) im(ft);
  }
  function iv(t, e) {
    var l = gt;
    gt |= 2;
    var a = nm(),
      n = um();
    Mt !== t || rt !== e ? ((ri = null), (oi = me() + 500), Ya(t, e)) : (La = rn(t, e));
    t: do
      try {
        if (St !== 0 && ft !== null) {
          e = ft;
          var i = be;
          e: switch (St) {
            case 1:
              ((St = 0), (be = null), Xa(t, e, i, 1));
              break;
            case 2:
            case 9:
              if (pr(i)) {
                ((St = 0), (be = null), cm(e));
                break;
              }
              ((e = function () {
                ((St !== 2 && St !== 9) || Mt !== t || (St = 7), Xe(t));
              }),
                i.then(e, e));
              break t;
            case 3:
              St = 7;
              break t;
            case 4:
              St = 5;
              break t;
            case 7:
              pr(i) ? ((St = 0), (be = null), cm(e)) : ((St = 0), (be = null), Xa(t, e, i, 7));
              break;
            case 5:
              var o = null;
              switch (ft.tag) {
                case 26:
                  o = ft.memoizedState;
                case 5:
                case 27:
                  var d = ft;
                  if (o ? Zm(o) : d.stateNode.complete) {
                    ((St = 0), (be = null));
                    var g = d.sibling;
                    if (g !== null) ft = g;
                    else {
                      var C = d.return;
                      C !== null ? ((ft = C), hi(C)) : (ft = null);
                    }
                    break e;
                  }
              }
              ((St = 0), (be = null), Xa(t, e, i, 5));
              break;
            case 6:
              ((St = 0), (be = null), Xa(t, e, i, 6));
              break;
            case 8:
              (ks(), (Bt = 6));
              break t;
            default:
              throw Error(s(462));
          }
        }
        cv();
        break;
      } catch (U) {
        lm(t, U);
      }
    while (!0);
    return (
      (Fe = Fl = null),
      (w.H = a),
      (w.A = n),
      (gt = l),
      ft !== null ? 0 : ((Mt = null), (rt = 0), ju(), Bt)
    );
  }
  function cv() {
    for (; ft !== null && !zy(); ) im(ft);
  }
  function im(t) {
    var e = zd(t.alternate, t, cl);
    ((t.memoizedProps = t.pendingProps), e === null ? hi(t) : (ft = e));
  }
  function cm(t) {
    var e = t,
      l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = xd(l, e, e.pendingProps, e.type, void 0, rt);
        break;
      case 11:
        e = xd(l, e, e.pendingProps, e.type.render, e.ref, rt);
        break;
      case 5:
        Pc(e);
      default:
        (Od(l, e), (e = ft = ur(e, cl)), (e = zd(l, e, cl)));
    }
    ((t.memoizedProps = t.pendingProps), e === null ? hi(t) : (ft = e));
  }
  function Xa(t, e, l, a) {
    ((Fe = Fl = null), Pc(e), (Oa = null), (Cn = 0));
    var n = e.return;
    try {
      if ($p(t, n, e, l, rt)) {
        ((Bt = 1), ei(t, Ne(l, t.current)), (ft = null));
        return;
      }
    } catch (i) {
      if (n !== null) throw ((ft = n), i);
      ((Bt = 1), ei(t, Ne(l, t.current)), (ft = null));
      return;
    }
    e.flags & 32768
      ? (mt || a === 1
          ? (t = !0)
          : La || (rt & 536870912) !== 0
            ? (t = !1)
            : ((Ml = t = !0),
              (a === 2 || a === 9 || a === 3 || a === 6) &&
                ((a = ge.current), a !== null && a.tag === 13 && (a.flags |= 16384))),
        sm(e, t))
      : hi(e);
  }
  function hi(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        sm(e, Ml);
        return;
      }
      t = e.return;
      var l = Ip(e.alternate, e, cl);
      if (l !== null) {
        ft = l;
        return;
      }
      if (((e = e.sibling), e !== null)) {
        ft = e;
        return;
      }
      ft = e = t;
    } while (e !== null);
    Bt === 0 && (Bt = 5);
  }
  function sm(t, e) {
    do {
      var l = Pp(t.alternate, t);
      if (l !== null) {
        ((l.flags &= 32767), (ft = l));
        return;
      }
      if (
        ((l = t.return),
        l !== null && ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
        !e && ((t = t.sibling), t !== null))
      ) {
        ft = t;
        return;
      }
      ft = t = l;
    } while (t !== null);
    ((Bt = 6), (ft = null));
  }
  function fm(t, e, l, a, n, i, o, d, g) {
    t.cancelPendingCommit = null;
    do yi();
    while (Zt !== 0);
    if ((gt & 6) !== 0) throw Error(s(327));
    if (e !== null) {
      if (e === t.current) throw Error(s(177));
      if (
        ((i = e.lanes | e.childLanes),
        (i |= Mc),
        qy(t, l, i, o, d, g),
        t === Mt && ((ft = Mt = null), (rt = 0)),
        (Ga = e),
        (Rl = t),
        (sl = l),
        (Us = i),
        (ws = n),
        (Id = a),
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            rv(vu, function () {
              return (hm(), null);
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (a = (e.flags & 13878) !== 0),
        (e.subtreeFlags & 13878) !== 0 || a)
      ) {
        ((a = w.T), (w.T = null), (n = R.p), (R.p = 2), (o = gt), (gt |= 4));
        try {
          tv(t, e, l);
        } finally {
          ((gt = o), (R.p = n), (w.T = a));
        }
      }
      ((Zt = 1), om(), rm(), dm());
    }
  }
  function om() {
    if (Zt === 1) {
      Zt = 0;
      var t = Rl,
        e = Ga,
        l = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || l) {
        ((l = w.T), (w.T = null));
        var a = R.p;
        R.p = 2;
        var n = gt;
        gt |= 4;
        try {
          Qd(e, t);
          var i = Ws,
            o = Wo(t.containerInfo),
            d = i.focusedElem,
            g = i.selectionRange;
          if (o !== d && d && d.ownerDocument && $o(d.ownerDocument.documentElement, d)) {
            if (g !== null && Sc(d)) {
              var C = g.start,
                U = g.end;
              if ((U === void 0 && (U = C), 'selectionStart' in d))
                ((d.selectionStart = C), (d.selectionEnd = Math.min(U, d.value.length)));
              else {
                var L = d.ownerDocument || document,
                  z = (L && L.defaultView) || window;
                if (z.getSelection) {
                  var D = z.getSelection(),
                    $ = d.textContent.length,
                    tt = Math.min(g.start, $),
                    At = g.end === void 0 ? tt : Math.min(g.end, $);
                  !D.extend && tt > At && ((o = At), (At = tt), (tt = o));
                  var x = Jo(d, tt),
                    S = Jo(d, At);
                  if (
                    x &&
                    S &&
                    (D.rangeCount !== 1 ||
                      D.anchorNode !== x.node ||
                      D.anchorOffset !== x.offset ||
                      D.focusNode !== S.node ||
                      D.focusOffset !== S.offset)
                  ) {
                    var N = L.createRange();
                    (N.setStart(x.node, x.offset),
                      D.removeAllRanges(),
                      tt > At
                        ? (D.addRange(N), D.extend(S.node, S.offset))
                        : (N.setEnd(S.node, S.offset), D.addRange(N)));
                  }
                }
              }
            }
            for (L = [], D = d; (D = D.parentNode); )
              D.nodeType === 1 && L.push({ element: D, left: D.scrollLeft, top: D.scrollTop });
            for (typeof d.focus == 'function' && d.focus(), d = 0; d < L.length; d++) {
              var k = L[d];
              ((k.element.scrollLeft = k.left), (k.element.scrollTop = k.top));
            }
          }
          ((Ni = !!$s), (Ws = $s = null));
        } finally {
          ((gt = n), (R.p = a), (w.T = l));
        }
      }
      ((t.current = e), (Zt = 2));
    }
  }
  function rm() {
    if (Zt === 2) {
      Zt = 0;
      var t = Rl,
        e = Ga,
        l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        ((l = w.T), (w.T = null));
        var a = R.p;
        R.p = 2;
        var n = gt;
        gt |= 4;
        try {
          Ld(t, e.alternate, e);
        } finally {
          ((gt = n), (R.p = a), (w.T = l));
        }
      }
      Zt = 3;
    }
  }
  function dm() {
    if (Zt === 4 || Zt === 3) {
      ((Zt = 0), Dy());
      var t = Rl,
        e = Ga,
        l = sl,
        a = Id;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
        ? (Zt = 5)
        : ((Zt = 0), (Ga = Rl = null), mm(t, t.pendingLanes));
      var n = t.pendingLanes;
      if (
        (n === 0 && (Cl = null),
        lc(l),
        (e = e.stateNode),
        he && typeof he.onCommitFiberRoot == 'function')
      )
        try {
          he.onCommitFiberRoot(on, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
      if (a !== null) {
        ((e = w.T), (n = R.p), (R.p = 2), (w.T = null));
        try {
          for (var i = t.onRecoverableError, o = 0; o < a.length; o++) {
            var d = a[o];
            i(d.value, { componentStack: d.stack });
          }
        } finally {
          ((w.T = e), (R.p = n));
        }
      }
      ((sl & 3) !== 0 && yi(),
        Xe(t),
        (n = t.pendingLanes),
        (l & 261930) !== 0 && (n & 42) !== 0 ? (t === Bs ? Vn++ : ((Vn = 0), (Bs = t))) : (Vn = 0),
        Zn(0));
    }
  }
  function mm(t, e) {
    (t.pooledCacheLanes &= e) === 0 &&
      ((e = t.pooledCache), e != null && ((t.pooledCache = null), Mn(e)));
  }
  function yi() {
    return (om(), rm(), dm(), hm());
  }
  function hm() {
    if (Zt !== 5) return !1;
    var t = Rl,
      e = Us;
    Us = 0;
    var l = lc(sl),
      a = w.T,
      n = R.p;
    try {
      ((R.p = 32 > l ? 32 : l), (w.T = null), (l = ws), (ws = null));
      var i = Rl,
        o = sl;
      if (((Zt = 0), (Ga = Rl = null), (sl = 0), (gt & 6) !== 0)) throw Error(s(331));
      var d = gt;
      if (
        ((gt |= 4),
        $d(i.current),
        Zd(i, i.current, o, l),
        (gt = d),
        Zn(0, !1),
        he && typeof he.onPostCommitFiberRoot == 'function')
      )
        try {
          he.onPostCommitFiberRoot(on, i);
        } catch {}
      return !0;
    } finally {
      ((R.p = n), (w.T = a), mm(t, e));
    }
  }
  function ym(t, e, l) {
    ((e = Ne(l, e)),
      (e = hs(t.stateNode, e, 2)),
      (t = El(t, e, 2)),
      t !== null && (dn(t, 2), Xe(t)));
  }
  function Et(t, e, l) {
    if (t.tag === 3) ym(t, t, l);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          ym(e, t, l);
          break;
        } else if (e.tag === 1) {
          var a = e.stateNode;
          if (
            typeof e.type.getDerivedStateFromError == 'function' ||
            (typeof a.componentDidCatch == 'function' && (Cl === null || !Cl.has(a)))
          ) {
            ((t = Ne(l, t)),
              (l = pd(2)),
              (a = El(e, l, 2)),
              a !== null && (vd(l, a, e, t), dn(a, 2), Xe(a)));
            break;
          }
        }
        e = e.return;
      }
  }
  function Ls(t, e, l) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new av();
      var n = new Set();
      a.set(e, n);
    } else ((n = a.get(e)), n === void 0 && ((n = new Set()), a.set(e, n)));
    n.has(l) || ((Ds = !0), n.add(l), (t = sv.bind(null, t, e, l)), e.then(t, t));
  }
  function sv(t, e, l) {
    var a = t.pingCache;
    (a !== null && a.delete(e),
      (t.pingedLanes |= t.suspendedLanes & l),
      (t.warmLanes &= ~l),
      Mt === t &&
        (rt & l) === l &&
        (Bt === 4 || (Bt === 3 && (rt & 62914560) === rt && 300 > me() - fi)
          ? (gt & 2) === 0 && Ya(t, 0)
          : (Os |= l),
        qa === rt && (qa = 0)),
      Xe(t));
  }
  function pm(t, e) {
    (e === 0 && (e = fo()), (t = Jl(t, e)), t !== null && (dn(t, e), Xe(t)));
  }
  function fv(t) {
    var e = t.memoizedState,
      l = 0;
    (e !== null && (l = e.retryLane), pm(t, l));
  }
  function ov(t, e) {
    var l = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var a = t.stateNode,
          n = t.memoizedState;
        n !== null && (l = n.retryLane);
        break;
      case 19:
        a = t.stateNode;
        break;
      case 22:
        a = t.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    (a !== null && a.delete(e), pm(t, l));
  }
  function rv(t, e) {
    return Ii(t, e);
  }
  var pi = null,
    Qa = null,
    qs = !1,
    vi = !1,
    Gs = !1,
    Dl = 0;
  function Xe(t) {
    (t !== Qa && t.next === null && (Qa === null ? (pi = Qa = t) : (Qa = Qa.next = t)),
      (vi = !0),
      qs || ((qs = !0), mv()));
  }
  function Zn(t, e) {
    if (!Gs && vi) {
      Gs = !0;
      do
        for (var l = !1, a = pi; a !== null; ) {
          if (t !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var i = 0;
            else {
              var o = a.suspendedLanes,
                d = a.pingedLanes;
              ((i = (1 << (31 - ye(42 | t) + 1)) - 1),
                (i &= n & ~(o & ~d)),
                (i = i & 201326741 ? (i & 201326741) | 1 : i ? i | 2 : 0));
            }
            i !== 0 && ((l = !0), bm(a, i));
          } else
            ((i = rt),
              (i = Su(
                a,
                a === Mt ? i : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1
              )),
              (i & 3) === 0 || rn(a, i) || ((l = !0), bm(a, i)));
          a = a.next;
        }
      while (l);
      Gs = !1;
    }
  }
  function dv() {
    vm();
  }
  function vm() {
    vi = qs = !1;
    var t = 0;
    Dl !== 0 && Tv() && (t = Dl);
    for (var e = me(), l = null, a = pi; a !== null; ) {
      var n = a.next,
        i = gm(a, e);
      (i === 0
        ? ((a.next = null), l === null ? (pi = n) : (l.next = n), n === null && (Qa = l))
        : ((l = a), (t !== 0 || (i & 3) !== 0) && (vi = !0)),
        (a = n));
    }
    ((Zt !== 0 && Zt !== 5) || Zn(t), Dl !== 0 && (Dl = 0));
  }
  function gm(t, e) {
    for (
      var l = t.suspendedLanes,
        a = t.pingedLanes,
        n = t.expirationTimes,
        i = t.pendingLanes & -62914561;
      0 < i;
    ) {
      var o = 31 - ye(i),
        d = 1 << o,
        g = n[o];
      (g === -1
        ? ((d & l) === 0 || (d & a) !== 0) && (n[o] = Ly(d, e))
        : g <= e && (t.expiredLanes |= d),
        (i &= ~d));
    }
    if (
      ((e = Mt),
      (l = rt),
      (l = Su(t, t === e ? l : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      (a = t.callbackNode),
      l === 0 || (t === e && (St === 2 || St === 9)) || t.cancelPendingCommit !== null)
    )
      return (a !== null && a !== null && Pi(a), (t.callbackNode = null), (t.callbackPriority = 0));
    if ((l & 3) === 0 || rn(t, l)) {
      if (((e = l & -l), e === t.callbackPriority)) return e;
      switch ((a !== null && Pi(a), lc(l))) {
        case 2:
        case 8:
          l = co;
          break;
        case 32:
          l = vu;
          break;
        case 268435456:
          l = so;
          break;
        default:
          l = vu;
      }
      return (
        (a = _m.bind(null, t)),
        (l = Ii(l, a)),
        (t.callbackPriority = e),
        (t.callbackNode = l),
        e
      );
    }
    return (
      a !== null && a !== null && Pi(a),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function _m(t, e) {
    if (Zt !== 0 && Zt !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
    var l = t.callbackNode;
    if (yi() && t.callbackNode !== l) return null;
    var a = rt;
    return (
      (a = Su(t, t === Mt ? a : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      a === 0
        ? null
        : (tm(t, a, e),
          gm(t, me()),
          t.callbackNode != null && t.callbackNode === l ? _m.bind(null, t) : null)
    );
  }
  function bm(t, e) {
    if (yi()) return null;
    tm(t, e, !0);
  }
  function mv() {
    Av(function () {
      (gt & 6) !== 0 ? Ii(io, dv) : vm();
    });
  }
  function Ys() {
    if (Dl === 0) {
      var t = Ra;
      (t === 0 && ((t = gu), (gu <<= 1), (gu & 261888) === 0 && (gu = 256)), (Dl = t));
    }
    return Dl;
  }
  function Sm(t) {
    return t == null || typeof t == 'symbol' || typeof t == 'boolean'
      ? null
      : typeof t == 'function'
        ? t
        : Au('' + t);
  }
  function Em(t, e) {
    var l = e.ownerDocument.createElement('input');
    return (
      (l.name = e.name),
      (l.value = e.value),
      t.id && l.setAttribute('form', t.id),
      e.parentNode.insertBefore(l, e),
      (t = new FormData(t)),
      l.parentNode.removeChild(l),
      t
    );
  }
  function hv(t, e, l, a, n) {
    if (e === 'submit' && l && l.stateNode === n) {
      var i = Sm((n[ue] || null).action),
        o = a.submitter;
      o &&
        ((e = (e = o[ue] || null) ? Sm(e.formAction) : o.getAttribute('formAction')),
        e !== null && ((i = e), (o = null)));
      var d = new Ru('action', 'action', null, a, n);
      t.push({
        event: d,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (Dl !== 0) {
                  var g = o ? Em(n, o) : new FormData(n);
                  ss(l, { pending: !0, data: g, method: n.method, action: i }, null, g);
                }
              } else
                typeof i == 'function' &&
                  (d.preventDefault(),
                  (g = o ? Em(n, o) : new FormData(n)),
                  ss(l, { pending: !0, data: g, method: n.method, action: i }, i, g));
            },
            currentTarget: n,
          },
        ],
      });
    }
  }
  for (var Xs = 0; Xs < Ac.length; Xs++) {
    var Qs = Ac[Xs],
      yv = Qs.toLowerCase(),
      pv = Qs[0].toUpperCase() + Qs.slice(1);
    we(yv, 'on' + pv);
  }
  (we(Po, 'onAnimationEnd'),
    we(tr, 'onAnimationIteration'),
    we(er, 'onAnimationStart'),
    we('dblclick', 'onDoubleClick'),
    we('focusin', 'onFocus'),
    we('focusout', 'onBlur'),
    we(Op, 'onTransitionRun'),
    we(jp, 'onTransitionStart'),
    we(Up, 'onTransitionCancel'),
    we(lr, 'onTransitionEnd'),
    ya('onMouseEnter', ['mouseout', 'mouseover']),
    ya('onMouseLeave', ['mouseout', 'mouseover']),
    ya('onPointerEnter', ['pointerout', 'pointerover']),
    ya('onPointerLeave', ['pointerout', 'pointerover']),
    Ql('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    Ql(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    Ql('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    Ql('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    Ql(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    Ql(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var Kn =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    vv = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(Kn)
    );
  function Tm(t, e) {
    e = (e & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var a = t[l],
        n = a.event;
      a = a.listeners;
      t: {
        var i = void 0;
        if (e)
          for (var o = a.length - 1; 0 <= o; o--) {
            var d = a[o],
              g = d.instance,
              C = d.currentTarget;
            if (((d = d.listener), g !== i && n.isPropagationStopped())) break t;
            ((i = d), (n.currentTarget = C));
            try {
              i(n);
            } catch (U) {
              Ou(U);
            }
            ((n.currentTarget = null), (i = g));
          }
        else
          for (o = 0; o < a.length; o++) {
            if (
              ((d = a[o]),
              (g = d.instance),
              (C = d.currentTarget),
              (d = d.listener),
              g !== i && n.isPropagationStopped())
            )
              break t;
            ((i = d), (n.currentTarget = C));
            try {
              i(n);
            } catch (U) {
              Ou(U);
            }
            ((n.currentTarget = null), (i = g));
          }
      }
    }
  }
  function ot(t, e) {
    var l = e[ac];
    l === void 0 && (l = e[ac] = new Set());
    var a = t + '__bubble';
    l.has(a) || (xm(e, t, 2, !1), l.add(a));
  }
  function Vs(t, e, l) {
    var a = 0;
    (e && (a |= 4), xm(l, t, a, e));
  }
  var gi = '_reactListening' + Math.random().toString(36).slice(2);
  function Zs(t) {
    if (!t[gi]) {
      ((t[gi] = !0),
        vo.forEach(function (l) {
          l !== 'selectionchange' && (vv.has(l) || Vs(l, !1, t), Vs(l, !0, t));
        }));
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[gi] || ((e[gi] = !0), Vs('selectionchange', !1, e));
    }
  }
  function xm(t, e, l, a) {
    switch (Pm(e)) {
      case 2:
        var n = Vv;
        break;
      case 8:
        n = Zv;
        break;
      default:
        n = sf;
    }
    ((l = n.bind(null, e, l, t)),
      (n = void 0),
      !dc || (e !== 'touchstart' && e !== 'touchmove' && e !== 'wheel') || (n = !0),
      a
        ? n !== void 0
          ? t.addEventListener(e, l, { capture: !0, passive: n })
          : t.addEventListener(e, l, !0)
        : n !== void 0
          ? t.addEventListener(e, l, { passive: n })
          : t.addEventListener(e, l, !1));
  }
  function Ks(t, e, l, a, n) {
    var i = a;
    if ((e & 1) === 0 && (e & 2) === 0 && a !== null)
      t: for (;;) {
        if (a === null) return;
        var o = a.tag;
        if (o === 3 || o === 4) {
          var d = a.stateNode.containerInfo;
          if (d === n) break;
          if (o === 4)
            for (o = a.return; o !== null; ) {
              var g = o.tag;
              if ((g === 3 || g === 4) && o.stateNode.containerInfo === n) return;
              o = o.return;
            }
          for (; d !== null; ) {
            if (((o = da(d)), o === null)) return;
            if (((g = o.tag), g === 5 || g === 6 || g === 26 || g === 27)) {
              a = i = o;
              continue t;
            }
            d = d.parentNode;
          }
        }
        a = a.return;
      }
    Ro(function () {
      var C = i,
        U = oc(l),
        L = [];
      t: {
        var z = ar.get(t);
        if (z !== void 0) {
          var D = Ru,
            $ = t;
          switch (t) {
            case 'keypress':
              if (Nu(l) === 0) break t;
            case 'keydown':
            case 'keyup':
              D = op;
              break;
            case 'focusin':
              (($ = 'focus'), (D = pc));
              break;
            case 'focusout':
              (($ = 'blur'), (D = pc));
              break;
            case 'beforeblur':
            case 'afterblur':
              D = pc;
              break;
            case 'click':
              if (l.button === 2) break t;
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              D = Oo;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              D = Iy;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              D = mp;
              break;
            case Po:
            case tr:
            case er:
              D = ep;
              break;
            case lr:
              D = yp;
              break;
            case 'scroll':
            case 'scrollend':
              D = Wy;
              break;
            case 'wheel':
              D = vp;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              D = ap;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              D = Uo;
              break;
            case 'toggle':
            case 'beforetoggle':
              D = _p;
          }
          var tt = (e & 4) !== 0,
            At = !tt && (t === 'scroll' || t === 'scrollend'),
            x = tt ? (z !== null ? z + 'Capture' : null) : z;
          tt = [];
          for (var S = C, N; S !== null; ) {
            var k = S;
            if (
              ((N = k.stateNode),
              (k = k.tag),
              (k !== 5 && k !== 26 && k !== 27) ||
                N === null ||
                x === null ||
                ((k = yn(S, x)), k != null && tt.push(Jn(S, k, N))),
              At)
            )
              break;
            S = S.return;
          }
          0 < tt.length && ((z = new D(z, $, null, l, U)), L.push({ event: z, listeners: tt }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (
            ((z = t === 'mouseover' || t === 'pointerover'),
            (D = t === 'mouseout' || t === 'pointerout'),
            z && l !== fc && ($ = l.relatedTarget || l.fromElement) && (da($) || $[ra]))
          )
            break t;
          if (
            (D || z) &&
            ((z =
              U.window === U
                ? U
                : (z = U.ownerDocument)
                  ? z.defaultView || z.parentWindow
                  : window),
            D
              ? (($ = l.relatedTarget || l.toElement),
                (D = C),
                ($ = $ ? da($) : null),
                $ !== null &&
                  ((At = m($)), (tt = $.tag), $ !== At || (tt !== 5 && tt !== 27 && tt !== 6)) &&
                  ($ = null))
              : ((D = null), ($ = C)),
            D !== $)
          ) {
            if (
              ((tt = Oo),
              (k = 'onMouseLeave'),
              (x = 'onMouseEnter'),
              (S = 'mouse'),
              (t === 'pointerout' || t === 'pointerover') &&
                ((tt = Uo), (k = 'onPointerLeave'), (x = 'onPointerEnter'), (S = 'pointer')),
              (At = D == null ? z : hn(D)),
              (N = $ == null ? z : hn($)),
              (z = new tt(k, S + 'leave', D, l, U)),
              (z.target = At),
              (z.relatedTarget = N),
              (k = null),
              da(U) === C &&
                ((tt = new tt(x, S + 'enter', $, l, U)),
                (tt.target = N),
                (tt.relatedTarget = At),
                (k = tt)),
              (At = k),
              D && $)
            )
              e: {
                for (tt = gv, x = D, S = $, N = 0, k = x; k; k = tt(k)) N++;
                k = 0;
                for (var P = S; P; P = tt(P)) k++;
                for (; 0 < N - k; ) ((x = tt(x)), N--);
                for (; 0 < k - N; ) ((S = tt(S)), k--);
                for (; N--; ) {
                  if (x === S || (S !== null && x === S.alternate)) {
                    tt = x;
                    break e;
                  }
                  ((x = tt(x)), (S = tt(S)));
                }
                tt = null;
              }
            else tt = null;
            (D !== null && Am(L, z, D, tt, !1), $ !== null && At !== null && Am(L, At, $, tt, !0));
          }
        }
        t: {
          if (
            ((z = C ? hn(C) : window),
            (D = z.nodeName && z.nodeName.toLowerCase()),
            D === 'select' || (D === 'input' && z.type === 'file'))
          )
            var pt = Yo;
          else if (qo(z))
            if (Xo) pt = Rp;
            else {
              pt = Np;
              var F = Mp;
            }
          else
            ((D = z.nodeName),
              !D || D.toLowerCase() !== 'input' || (z.type !== 'checkbox' && z.type !== 'radio')
                ? C && sc(C.elementType) && (pt = Yo)
                : (pt = Cp));
          if (pt && (pt = pt(t, C))) {
            Go(L, pt, l, U);
            break t;
          }
          (F && F(t, z, C),
            t === 'focusout' &&
              C &&
              z.type === 'number' &&
              C.memoizedProps.value != null &&
              cc(z, 'number', z.value));
        }
        switch (((F = C ? hn(C) : window), t)) {
          case 'focusin':
            (qo(F) || F.contentEditable === 'true') && ((Sa = F), (Ec = C), (Tn = null));
            break;
          case 'focusout':
            Tn = Ec = Sa = null;
            break;
          case 'mousedown':
            Tc = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((Tc = !1), Fo(L, l, U));
            break;
          case 'selectionchange':
            if (Dp) break;
          case 'keydown':
          case 'keyup':
            Fo(L, l, U);
        }
        var ct;
        if (gc)
          t: {
            switch (t) {
              case 'compositionstart':
                var dt = 'onCompositionStart';
                break t;
              case 'compositionend':
                dt = 'onCompositionEnd';
                break t;
              case 'compositionupdate':
                dt = 'onCompositionUpdate';
                break t;
            }
            dt = void 0;
          }
        else
          ba
            ? Ho(t, l) && (dt = 'onCompositionEnd')
            : t === 'keydown' && l.keyCode === 229 && (dt = 'onCompositionStart');
        (dt &&
          (wo &&
            l.locale !== 'ko' &&
            (ba || dt !== 'onCompositionStart'
              ? dt === 'onCompositionEnd' && ba && (ct = zo())
              : ((yl = U), (mc = 'value' in yl ? yl.value : yl.textContent), (ba = !0))),
          (F = _i(C, dt)),
          0 < F.length &&
            ((dt = new jo(dt, t, null, l, U)),
            L.push({ event: dt, listeners: F }),
            ct ? (dt.data = ct) : ((ct = Lo(l)), ct !== null && (dt.data = ct)))),
          (ct = Sp ? Ep(t, l) : Tp(t, l)) &&
            ((dt = _i(C, 'onBeforeInput')),
            0 < dt.length &&
              ((F = new jo('onBeforeInput', 'beforeinput', null, l, U)),
              L.push({ event: F, listeners: dt }),
              (F.data = ct))),
          hv(L, t, C, l, U));
      }
      Tm(L, e);
    });
  }
  function Jn(t, e, l) {
    return { instance: t, listener: e, currentTarget: l };
  }
  function _i(t, e) {
    for (var l = e + 'Capture', a = []; t !== null; ) {
      var n = t,
        i = n.stateNode;
      if (
        ((n = n.tag),
        (n !== 5 && n !== 26 && n !== 27) ||
          i === null ||
          ((n = yn(t, l)),
          n != null && a.unshift(Jn(t, n, i)),
          (n = yn(t, e)),
          n != null && a.push(Jn(t, n, i))),
        t.tag === 3)
      )
        return a;
      t = t.return;
    }
    return [];
  }
  function gv(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Am(t, e, l, a, n) {
    for (var i = e._reactName, o = []; l !== null && l !== a; ) {
      var d = l,
        g = d.alternate,
        C = d.stateNode;
      if (((d = d.tag), g !== null && g === a)) break;
      ((d !== 5 && d !== 26 && d !== 27) ||
        C === null ||
        ((g = C),
        n
          ? ((C = yn(l, i)), C != null && o.unshift(Jn(l, C, g)))
          : n || ((C = yn(l, i)), C != null && o.push(Jn(l, C, g)))),
        (l = l.return));
    }
    o.length !== 0 && t.push({ event: e, listeners: o });
  }
  var _v = /\r\n?/g,
    bv = /\u0000|\uFFFD/g;
  function Mm(t) {
    return (typeof t == 'string' ? t : '' + t)
      .replace(
        _v,
        `
`
      )
      .replace(bv, '');
  }
  function Nm(t, e) {
    return ((e = Mm(e)), Mm(t) === e);
  }
  function xt(t, e, l, a, n, i) {
    switch (l) {
      case 'children':
        typeof a == 'string'
          ? e === 'body' || (e === 'textarea' && a === '') || va(t, a)
          : (typeof a == 'number' || typeof a == 'bigint') && e !== 'body' && va(t, '' + a);
        break;
      case 'className':
        Tu(t, 'class', a);
        break;
      case 'tabIndex':
        Tu(t, 'tabindex', a);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Tu(t, l, a);
        break;
      case 'style':
        No(t, a, i);
        break;
      case 'data':
        if (e !== 'object') {
          Tu(t, 'data', a);
          break;
        }
      case 'src':
      case 'href':
        if (a === '' && (e !== 'a' || l !== 'href')) {
          t.removeAttribute(l);
          break;
        }
        if (a == null || typeof a == 'function' || typeof a == 'symbol' || typeof a == 'boolean') {
          t.removeAttribute(l);
          break;
        }
        ((a = Au('' + a)), t.setAttribute(l, a));
        break;
      case 'action':
      case 'formAction':
        if (typeof a == 'function') {
          t.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof i == 'function' &&
            (l === 'formAction'
              ? (e !== 'input' && xt(t, e, 'name', n.name, n, null),
                xt(t, e, 'formEncType', n.formEncType, n, null),
                xt(t, e, 'formMethod', n.formMethod, n, null),
                xt(t, e, 'formTarget', n.formTarget, n, null))
              : (xt(t, e, 'encType', n.encType, n, null),
                xt(t, e, 'method', n.method, n, null),
                xt(t, e, 'target', n.target, n, null)));
        if (a == null || typeof a == 'symbol' || typeof a == 'boolean') {
          t.removeAttribute(l);
          break;
        }
        ((a = Au('' + a)), t.setAttribute(l, a));
        break;
      case 'onClick':
        a != null && (t.onclick = Ke);
        break;
      case 'onScroll':
        a != null && ot('scroll', t);
        break;
      case 'onScrollEnd':
        a != null && ot('scrollend', t);
        break;
      case 'dangerouslySetInnerHTML':
        if (a != null) {
          if (typeof a != 'object' || !('__html' in a)) throw Error(s(61));
          if (((l = a.__html), l != null)) {
            if (n.children != null) throw Error(s(60));
            t.innerHTML = l;
          }
        }
        break;
      case 'multiple':
        t.multiple = a && typeof a != 'function' && typeof a != 'symbol';
        break;
      case 'muted':
        t.muted = a && typeof a != 'function' && typeof a != 'symbol';
        break;
      case 'suppressContentEditableWarning':
      case 'suppressHydrationWarning':
      case 'defaultValue':
      case 'defaultChecked':
      case 'innerHTML':
      case 'ref':
        break;
      case 'autoFocus':
        break;
      case 'xlinkHref':
        if (a == null || typeof a == 'function' || typeof a == 'boolean' || typeof a == 'symbol') {
          t.removeAttribute('xlink:href');
          break;
        }
        ((l = Au('' + a)), t.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', l));
        break;
      case 'contentEditable':
      case 'spellCheck':
      case 'draggable':
      case 'value':
      case 'autoReverse':
      case 'externalResourcesRequired':
      case 'focusable':
      case 'preserveAlpha':
        a != null && typeof a != 'function' && typeof a != 'symbol'
          ? t.setAttribute(l, '' + a)
          : t.removeAttribute(l);
        break;
      case 'inert':
      case 'allowFullScreen':
      case 'async':
      case 'autoPlay':
      case 'controls':
      case 'default':
      case 'defer':
      case 'disabled':
      case 'disablePictureInPicture':
      case 'disableRemotePlayback':
      case 'formNoValidate':
      case 'hidden':
      case 'loop':
      case 'noModule':
      case 'noValidate':
      case 'open':
      case 'playsInline':
      case 'readOnly':
      case 'required':
      case 'reversed':
      case 'scoped':
      case 'seamless':
      case 'itemScope':
        a && typeof a != 'function' && typeof a != 'symbol'
          ? t.setAttribute(l, '')
          : t.removeAttribute(l);
        break;
      case 'capture':
      case 'download':
        a === !0
          ? t.setAttribute(l, '')
          : a !== !1 && a != null && typeof a != 'function' && typeof a != 'symbol'
            ? t.setAttribute(l, a)
            : t.removeAttribute(l);
        break;
      case 'cols':
      case 'rows':
      case 'size':
      case 'span':
        a != null && typeof a != 'function' && typeof a != 'symbol' && !isNaN(a) && 1 <= a
          ? t.setAttribute(l, a)
          : t.removeAttribute(l);
        break;
      case 'rowSpan':
      case 'start':
        a == null || typeof a == 'function' || typeof a == 'symbol' || isNaN(a)
          ? t.removeAttribute(l)
          : t.setAttribute(l, a);
        break;
      case 'popover':
        (ot('beforetoggle', t), ot('toggle', t), Eu(t, 'popover', a));
        break;
      case 'xlinkActuate':
        Ze(t, 'http://www.w3.org/1999/xlink', 'xlink:actuate', a);
        break;
      case 'xlinkArcrole':
        Ze(t, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', a);
        break;
      case 'xlinkRole':
        Ze(t, 'http://www.w3.org/1999/xlink', 'xlink:role', a);
        break;
      case 'xlinkShow':
        Ze(t, 'http://www.w3.org/1999/xlink', 'xlink:show', a);
        break;
      case 'xlinkTitle':
        Ze(t, 'http://www.w3.org/1999/xlink', 'xlink:title', a);
        break;
      case 'xlinkType':
        Ze(t, 'http://www.w3.org/1999/xlink', 'xlink:type', a);
        break;
      case 'xmlBase':
        Ze(t, 'http://www.w3.org/XML/1998/namespace', 'xml:base', a);
        break;
      case 'xmlLang':
        Ze(t, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', a);
        break;
      case 'xmlSpace':
        Ze(t, 'http://www.w3.org/XML/1998/namespace', 'xml:space', a);
        break;
      case 'is':
        Eu(t, 'is', a);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < l.length) || (l[0] !== 'o' && l[0] !== 'O') || (l[1] !== 'n' && l[1] !== 'N')) &&
          ((l = Jy.get(l) || l), Eu(t, l, a));
    }
  }
  function Js(t, e, l, a, n, i) {
    switch (l) {
      case 'style':
        No(t, a, i);
        break;
      case 'dangerouslySetInnerHTML':
        if (a != null) {
          if (typeof a != 'object' || !('__html' in a)) throw Error(s(61));
          if (((l = a.__html), l != null)) {
            if (n.children != null) throw Error(s(60));
            t.innerHTML = l;
          }
        }
        break;
      case 'children':
        typeof a == 'string'
          ? va(t, a)
          : (typeof a == 'number' || typeof a == 'bigint') && va(t, '' + a);
        break;
      case 'onScroll':
        a != null && ot('scroll', t);
        break;
      case 'onScrollEnd':
        a != null && ot('scrollend', t);
        break;
      case 'onClick':
        a != null && (t.onclick = Ke);
        break;
      case 'suppressContentEditableWarning':
      case 'suppressHydrationWarning':
      case 'innerHTML':
      case 'ref':
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        if (!go.hasOwnProperty(l))
          t: {
            if (
              l[0] === 'o' &&
              l[1] === 'n' &&
              ((n = l.endsWith('Capture')),
              (e = l.slice(2, n ? l.length - 7 : void 0)),
              (i = t[ue] || null),
              (i = i != null ? i[l] : null),
              typeof i == 'function' && t.removeEventListener(e, i, n),
              typeof a == 'function')
            ) {
              (typeof i != 'function' &&
                i !== null &&
                (l in t ? (t[l] = null) : t.hasAttribute(l) && t.removeAttribute(l)),
                t.addEventListener(e, a, n));
              break t;
            }
            l in t ? (t[l] = a) : a === !0 ? t.setAttribute(l, '') : Eu(t, l, a);
          }
    }
  }
  function te(t, e, l) {
    switch (e) {
      case 'div':
      case 'span':
      case 'svg':
      case 'path':
      case 'a':
      case 'g':
      case 'p':
      case 'li':
        break;
      case 'img':
        (ot('error', t), ot('load', t));
        var a = !1,
          n = !1,
          i;
        for (i in l)
          if (l.hasOwnProperty(i)) {
            var o = l[i];
            if (o != null)
              switch (i) {
                case 'src':
                  a = !0;
                  break;
                case 'srcSet':
                  n = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(s(137, e));
                default:
                  xt(t, e, i, o, l, null);
              }
          }
        (n && xt(t, e, 'srcSet', l.srcSet, l, null), a && xt(t, e, 'src', l.src, l, null));
        return;
      case 'input':
        ot('invalid', t);
        var d = (i = o = n = null),
          g = null,
          C = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var U = l[a];
            if (U != null)
              switch (a) {
                case 'name':
                  n = U;
                  break;
                case 'type':
                  o = U;
                  break;
                case 'checked':
                  g = U;
                  break;
                case 'defaultChecked':
                  C = U;
                  break;
                case 'value':
                  i = U;
                  break;
                case 'defaultValue':
                  d = U;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (U != null) throw Error(s(137, e));
                  break;
                default:
                  xt(t, e, a, U, l, null);
              }
          }
        To(t, i, d, g, C, o, n, !1);
        return;
      case 'select':
        (ot('invalid', t), (a = o = i = null));
        for (n in l)
          if (l.hasOwnProperty(n) && ((d = l[n]), d != null))
            switch (n) {
              case 'value':
                i = d;
                break;
              case 'defaultValue':
                o = d;
                break;
              case 'multiple':
                a = d;
              default:
                xt(t, e, n, d, l, null);
            }
        ((e = i),
          (l = o),
          (t.multiple = !!a),
          e != null ? pa(t, !!a, e, !1) : l != null && pa(t, !!a, l, !0));
        return;
      case 'textarea':
        (ot('invalid', t), (i = n = a = null));
        for (o in l)
          if (l.hasOwnProperty(o) && ((d = l[o]), d != null))
            switch (o) {
              case 'value':
                a = d;
                break;
              case 'defaultValue':
                n = d;
                break;
              case 'children':
                i = d;
                break;
              case 'dangerouslySetInnerHTML':
                if (d != null) throw Error(s(91));
                break;
              default:
                xt(t, e, o, d, l, null);
            }
        Ao(t, a, n, i);
        return;
      case 'option':
        for (g in l)
          if (l.hasOwnProperty(g) && ((a = l[g]), a != null))
            switch (g) {
              case 'selected':
                t.selected = a && typeof a != 'function' && typeof a != 'symbol';
                break;
              default:
                xt(t, e, g, a, l, null);
            }
        return;
      case 'dialog':
        (ot('beforetoggle', t), ot('toggle', t), ot('cancel', t), ot('close', t));
        break;
      case 'iframe':
      case 'object':
        ot('load', t);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < Kn.length; a++) ot(Kn[a], t);
        break;
      case 'image':
        (ot('error', t), ot('load', t));
        break;
      case 'details':
        ot('toggle', t);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (ot('error', t), ot('load', t));
      case 'area':
      case 'base':
      case 'br':
      case 'col':
      case 'hr':
      case 'keygen':
      case 'meta':
      case 'param':
      case 'track':
      case 'wbr':
      case 'menuitem':
        for (C in l)
          if (l.hasOwnProperty(C) && ((a = l[C]), a != null))
            switch (C) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(s(137, e));
              default:
                xt(t, e, C, a, l, null);
            }
        return;
      default:
        if (sc(e)) {
          for (U in l)
            l.hasOwnProperty(U) && ((a = l[U]), a !== void 0 && Js(t, e, U, a, l, void 0));
          return;
        }
    }
    for (d in l) l.hasOwnProperty(d) && ((a = l[d]), a != null && xt(t, e, d, a, l, null));
  }
  function Sv(t, e, l, a) {
    switch (e) {
      case 'div':
      case 'span':
      case 'svg':
      case 'path':
      case 'a':
      case 'g':
      case 'p':
      case 'li':
        break;
      case 'input':
        var n = null,
          i = null,
          o = null,
          d = null,
          g = null,
          C = null,
          U = null;
        for (D in l) {
          var L = l[D];
          if (l.hasOwnProperty(D) && L != null)
            switch (D) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                g = L;
              default:
                a.hasOwnProperty(D) || xt(t, e, D, null, a, L);
            }
        }
        for (var z in a) {
          var D = a[z];
          if (((L = l[z]), a.hasOwnProperty(z) && (D != null || L != null)))
            switch (z) {
              case 'type':
                i = D;
                break;
              case 'name':
                n = D;
                break;
              case 'checked':
                C = D;
                break;
              case 'defaultChecked':
                U = D;
                break;
              case 'value':
                o = D;
                break;
              case 'defaultValue':
                d = D;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (D != null) throw Error(s(137, e));
                break;
              default:
                D !== L && xt(t, e, z, D, a, L);
            }
        }
        ic(t, o, d, g, C, U, i, n);
        return;
      case 'select':
        D = o = d = z = null;
        for (i in l)
          if (((g = l[i]), l.hasOwnProperty(i) && g != null))
            switch (i) {
              case 'value':
                break;
              case 'multiple':
                D = g;
              default:
                a.hasOwnProperty(i) || xt(t, e, i, null, a, g);
            }
        for (n in a)
          if (((i = a[n]), (g = l[n]), a.hasOwnProperty(n) && (i != null || g != null)))
            switch (n) {
              case 'value':
                z = i;
                break;
              case 'defaultValue':
                d = i;
                break;
              case 'multiple':
                o = i;
              default:
                i !== g && xt(t, e, n, i, a, g);
            }
        ((e = d),
          (l = o),
          (a = D),
          z != null
            ? pa(t, !!l, z, !1)
            : !!a != !!l && (e != null ? pa(t, !!l, e, !0) : pa(t, !!l, l ? [] : '', !1)));
        return;
      case 'textarea':
        D = z = null;
        for (d in l)
          if (((n = l[d]), l.hasOwnProperty(d) && n != null && !a.hasOwnProperty(d)))
            switch (d) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                xt(t, e, d, null, a, n);
            }
        for (o in a)
          if (((n = a[o]), (i = l[o]), a.hasOwnProperty(o) && (n != null || i != null)))
            switch (o) {
              case 'value':
                z = n;
                break;
              case 'defaultValue':
                D = n;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (n != null) throw Error(s(91));
                break;
              default:
                n !== i && xt(t, e, o, n, a, i);
            }
        xo(t, z, D);
        return;
      case 'option':
        for (var $ in l)
          if (((z = l[$]), l.hasOwnProperty($) && z != null && !a.hasOwnProperty($)))
            switch ($) {
              case 'selected':
                t.selected = !1;
                break;
              default:
                xt(t, e, $, null, a, z);
            }
        for (g in a)
          if (((z = a[g]), (D = l[g]), a.hasOwnProperty(g) && z !== D && (z != null || D != null)))
            switch (g) {
              case 'selected':
                t.selected = z && typeof z != 'function' && typeof z != 'symbol';
                break;
              default:
                xt(t, e, g, z, a, D);
            }
        return;
      case 'img':
      case 'link':
      case 'area':
      case 'base':
      case 'br':
      case 'col':
      case 'embed':
      case 'hr':
      case 'keygen':
      case 'meta':
      case 'param':
      case 'source':
      case 'track':
      case 'wbr':
      case 'menuitem':
        for (var tt in l)
          ((z = l[tt]),
            l.hasOwnProperty(tt) && z != null && !a.hasOwnProperty(tt) && xt(t, e, tt, null, a, z));
        for (C in a)
          if (((z = a[C]), (D = l[C]), a.hasOwnProperty(C) && z !== D && (z != null || D != null)))
            switch (C) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (z != null) throw Error(s(137, e));
                break;
              default:
                xt(t, e, C, z, a, D);
            }
        return;
      default:
        if (sc(e)) {
          for (var At in l)
            ((z = l[At]),
              l.hasOwnProperty(At) &&
                z !== void 0 &&
                !a.hasOwnProperty(At) &&
                Js(t, e, At, void 0, a, z));
          for (U in a)
            ((z = a[U]),
              (D = l[U]),
              !a.hasOwnProperty(U) ||
                z === D ||
                (z === void 0 && D === void 0) ||
                Js(t, e, U, z, a, D));
          return;
        }
    }
    for (var x in l)
      ((z = l[x]),
        l.hasOwnProperty(x) && z != null && !a.hasOwnProperty(x) && xt(t, e, x, null, a, z));
    for (L in a)
      ((z = a[L]),
        (D = l[L]),
        !a.hasOwnProperty(L) || z === D || (z == null && D == null) || xt(t, e, L, z, a, D));
  }
  function Cm(t) {
    switch (t) {
      case 'css':
      case 'script':
      case 'font':
      case 'img':
      case 'image':
      case 'input':
      case 'link':
        return !0;
      default:
        return !1;
    }
  }
  function Ev() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var t = 0, e = 0, l = performance.getEntriesByType('resource'), a = 0;
        a < l.length;
        a++
      ) {
        var n = l[a],
          i = n.transferSize,
          o = n.initiatorType,
          d = n.duration;
        if (i && d && Cm(o)) {
          for (o = 0, d = n.responseEnd, a += 1; a < l.length; a++) {
            var g = l[a],
              C = g.startTime;
            if (C > d) break;
            var U = g.transferSize,
              L = g.initiatorType;
            U && Cm(L) && ((g = g.responseEnd), (o += U * (g < d ? 1 : (d - C) / (g - C))));
          }
          if ((--a, (e += (8 * (i + o)) / (n.duration / 1e3)), t++, 10 < t)) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && ((t = navigator.connection.downlink), typeof t == 'number')
      ? t
      : 5;
  }
  var $s = null,
    Ws = null;
  function bi(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Rm(t) {
    switch (t) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function zm(t, e) {
    if (t === 0)
      switch (e) {
        case 'svg':
          return 1;
        case 'math':
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === 'foreignObject' ? 0 : t;
  }
  function Fs(t, e) {
    return (
      t === 'textarea' ||
      t === 'noscript' ||
      typeof e.children == 'string' ||
      typeof e.children == 'number' ||
      typeof e.children == 'bigint' ||
      (typeof e.dangerouslySetInnerHTML == 'object' &&
        e.dangerouslySetInnerHTML !== null &&
        e.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Is = null;
  function Tv() {
    var t = window.event;
    return t && t.type === 'popstate' ? (t === Is ? !1 : ((Is = t), !0)) : ((Is = null), !1);
  }
  var Dm = typeof setTimeout == 'function' ? setTimeout : void 0,
    xv = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Om = typeof Promise == 'function' ? Promise : void 0,
    Av =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Om < 'u'
          ? function (t) {
              return Om.resolve(null).then(t).catch(Mv);
            }
          : Dm;
  function Mv(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function Ol(t) {
    return t === 'head';
  }
  function jm(t, e) {
    var l = e,
      a = 0;
    do {
      var n = l.nextSibling;
      if ((t.removeChild(l), n && n.nodeType === 8))
        if (((l = n.data), l === '/$' || l === '/&')) {
          if (a === 0) {
            (t.removeChild(n), Ja(e));
            return;
          }
          a--;
        } else if (l === '$' || l === '$?' || l === '$~' || l === '$!' || l === '&') a++;
        else if (l === 'html') $n(t.ownerDocument.documentElement);
        else if (l === 'head') {
          ((l = t.ownerDocument.head), $n(l));
          for (var i = l.firstChild; i; ) {
            var o = i.nextSibling,
              d = i.nodeName;
            (i[mn] ||
              d === 'SCRIPT' ||
              d === 'STYLE' ||
              (d === 'LINK' && i.rel.toLowerCase() === 'stylesheet') ||
              l.removeChild(i),
              (i = o));
          }
        } else l === 'body' && $n(t.ownerDocument.body);
      l = n;
    } while (l);
    Ja(e);
  }
  function Um(t, e) {
    var l = t;
    t = 0;
    do {
      var a = l.nextSibling;
      if (
        (l.nodeType === 1
          ? e
            ? ((l._stashedDisplay = l.style.display), (l.style.display = 'none'))
            : ((l.style.display = l._stashedDisplay || ''),
              l.getAttribute('style') === '' && l.removeAttribute('style'))
          : l.nodeType === 3 &&
            (e
              ? ((l._stashedText = l.nodeValue), (l.nodeValue = ''))
              : (l.nodeValue = l._stashedText || '')),
        a && a.nodeType === 8)
      )
        if (((l = a.data), l === '/$')) {
          if (t === 0) break;
          t--;
        } else (l !== '$' && l !== '$?' && l !== '$~' && l !== '$!') || t++;
      l = a;
    } while (l);
  }
  function Ps(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (((e = e.nextSibling), l.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (Ps(l), nc(l));
          continue;
        case 'SCRIPT':
        case 'STYLE':
          continue;
        case 'LINK':
          if (l.rel.toLowerCase() === 'stylesheet') continue;
      }
      t.removeChild(l);
    }
  }
  function Nv(t, e, l, a) {
    for (; t.nodeType === 1; ) {
      var n = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!a && (t.nodeName !== 'INPUT' || t.type !== 'hidden')) break;
      } else if (a) {
        if (!t[mn])
          switch (e) {
            case 'meta':
              if (!t.hasAttribute('itemprop')) break;
              return t;
            case 'link':
              if (
                ((i = t.getAttribute('rel')),
                i === 'stylesheet' && t.hasAttribute('data-precedence'))
              )
                break;
              if (
                i !== n.rel ||
                t.getAttribute('href') !== (n.href == null || n.href === '' ? null : n.href) ||
                t.getAttribute('crossorigin') !== (n.crossOrigin == null ? null : n.crossOrigin) ||
                t.getAttribute('title') !== (n.title == null ? null : n.title)
              )
                break;
              return t;
            case 'style':
              if (t.hasAttribute('data-precedence')) break;
              return t;
            case 'script':
              if (
                ((i = t.getAttribute('src')),
                (i !== (n.src == null ? null : n.src) ||
                  t.getAttribute('type') !== (n.type == null ? null : n.type) ||
                  t.getAttribute('crossorigin') !==
                    (n.crossOrigin == null ? null : n.crossOrigin)) &&
                  i &&
                  t.hasAttribute('async') &&
                  !t.hasAttribute('itemprop'))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (e === 'input' && t.type === 'hidden') {
        var i = n.name == null ? null : '' + n.name;
        if (n.type === 'hidden' && t.getAttribute('name') === i) return t;
      } else return t;
      if (((t = Oe(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function Cv(t, e, l) {
    if (e === '') return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !l) ||
        ((t = Oe(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function wm(t, e) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !e) ||
        ((t = Oe(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function tf(t) {
    return t.data === '$?' || t.data === '$~';
  }
  function ef(t) {
    return t.data === '$!' || (t.data === '$?' && t.ownerDocument.readyState !== 'loading');
  }
  function Rv(t, e) {
    var l = t.ownerDocument;
    if (t.data === '$~') t._reactRetry = e;
    else if (t.data !== '$?' || l.readyState !== 'loading') e();
    else {
      var a = function () {
        (e(), l.removeEventListener('DOMContentLoaded', a));
      };
      (l.addEventListener('DOMContentLoaded', a), (t._reactRetry = a));
    }
  }
  function Oe(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (
          ((e = t.data),
          e === '$' ||
            e === '$!' ||
            e === '$?' ||
            e === '$~' ||
            e === '&' ||
            e === 'F!' ||
            e === 'F')
        )
          break;
        if (e === '/$' || e === '/&') return null;
      }
    }
    return t;
  }
  var lf = null;
  function Bm(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === '/$' || l === '/&') {
          if (e === 0) return Oe(t.nextSibling);
          e--;
        } else (l !== '$' && l !== '$!' && l !== '$?' && l !== '$~' && l !== '&') || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function km(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === '$' || l === '$!' || l === '$?' || l === '$~' || l === '&') {
          if (e === 0) return t;
          e--;
        } else (l !== '/$' && l !== '/&') || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Hm(t, e, l) {
    switch (((e = bi(l)), t)) {
      case 'html':
        if (((t = e.documentElement), !t)) throw Error(s(452));
        return t;
      case 'head':
        if (((t = e.head), !t)) throw Error(s(453));
        return t;
      case 'body':
        if (((t = e.body), !t)) throw Error(s(454));
        return t;
      default:
        throw Error(s(451));
    }
  }
  function $n(t) {
    for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
    nc(t);
  }
  var je = new Map(),
    Lm = new Set();
  function Si(t) {
    return typeof t.getRootNode == 'function'
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument;
  }
  var fl = R.d;
  R.d = { f: zv, r: Dv, D: Ov, C: jv, L: Uv, m: wv, X: kv, S: Bv, M: Hv };
  function zv() {
    var t = fl.f(),
      e = di();
    return t || e;
  }
  function Dv(t) {
    var e = ma(t);
    e !== null && e.tag === 5 && e.type === 'form' ? ld(e) : fl.r(t);
  }
  var Va = typeof document > 'u' ? null : document;
  function qm(t, e, l) {
    var a = Va;
    if (a && typeof e == 'string' && e) {
      var n = Ae(e);
      ((n = 'link[rel="' + t + '"][href="' + n + '"]'),
        typeof l == 'string' && (n += '[crossorigin="' + l + '"]'),
        Lm.has(n) ||
          (Lm.add(n),
          (t = { rel: t, crossOrigin: l, href: e }),
          a.querySelector(n) === null &&
            ((e = a.createElement('link')), te(e, 'link', t), Jt(e), a.head.appendChild(e))));
    }
  }
  function Ov(t) {
    (fl.D(t), qm('dns-prefetch', t, null));
  }
  function jv(t, e) {
    (fl.C(t, e), qm('preconnect', t, e));
  }
  function Uv(t, e, l) {
    fl.L(t, e, l);
    var a = Va;
    if (a && t && e) {
      var n = 'link[rel="preload"][as="' + Ae(e) + '"]';
      e === 'image' && l && l.imageSrcSet
        ? ((n += '[imagesrcset="' + Ae(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == 'string' && (n += '[imagesizes="' + Ae(l.imageSizes) + '"]'))
        : (n += '[href="' + Ae(t) + '"]');
      var i = n;
      switch (e) {
        case 'style':
          i = Za(t);
          break;
        case 'script':
          i = Ka(t);
      }
      je.has(i) ||
        ((t = _(
          { rel: 'preload', href: e === 'image' && l && l.imageSrcSet ? void 0 : t, as: e },
          l
        )),
        je.set(i, t),
        a.querySelector(n) !== null ||
          (e === 'style' && a.querySelector(Wn(i))) ||
          (e === 'script' && a.querySelector(Fn(i))) ||
          ((e = a.createElement('link')), te(e, 'link', t), Jt(e), a.head.appendChild(e)));
    }
  }
  function wv(t, e) {
    fl.m(t, e);
    var l = Va;
    if (l && t) {
      var a = e && typeof e.as == 'string' ? e.as : 'script',
        n = 'link[rel="modulepreload"][as="' + Ae(a) + '"][href="' + Ae(t) + '"]',
        i = n;
      switch (a) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          i = Ka(t);
      }
      if (
        !je.has(i) &&
        ((t = _({ rel: 'modulepreload', href: t }, e)), je.set(i, t), l.querySelector(n) === null)
      ) {
        switch (a) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (l.querySelector(Fn(i))) return;
        }
        ((a = l.createElement('link')), te(a, 'link', t), Jt(a), l.head.appendChild(a));
      }
    }
  }
  function Bv(t, e, l) {
    fl.S(t, e, l);
    var a = Va;
    if (a && t) {
      var n = ha(a).hoistableStyles,
        i = Za(t);
      e = e || 'default';
      var o = n.get(i);
      if (!o) {
        var d = { loading: 0, preload: null };
        if ((o = a.querySelector(Wn(i)))) d.loading = 5;
        else {
          ((t = _({ rel: 'stylesheet', href: t, 'data-precedence': e }, l)),
            (l = je.get(i)) && af(t, l));
          var g = (o = a.createElement('link'));
          (Jt(g),
            te(g, 'link', t),
            (g._p = new Promise(function (C, U) {
              ((g.onload = C), (g.onerror = U));
            })),
            g.addEventListener('load', function () {
              d.loading |= 1;
            }),
            g.addEventListener('error', function () {
              d.loading |= 2;
            }),
            (d.loading |= 4),
            Ei(o, e, a));
        }
        ((o = { type: 'stylesheet', instance: o, count: 1, state: d }), n.set(i, o));
      }
    }
  }
  function kv(t, e) {
    fl.X(t, e);
    var l = Va;
    if (l && t) {
      var a = ha(l).hoistableScripts,
        n = Ka(t),
        i = a.get(n);
      i ||
        ((i = l.querySelector(Fn(n))),
        i ||
          ((t = _({ src: t, async: !0 }, e)),
          (e = je.get(n)) && nf(t, e),
          (i = l.createElement('script')),
          Jt(i),
          te(i, 'link', t),
          l.head.appendChild(i)),
        (i = { type: 'script', instance: i, count: 1, state: null }),
        a.set(n, i));
    }
  }
  function Hv(t, e) {
    fl.M(t, e);
    var l = Va;
    if (l && t) {
      var a = ha(l).hoistableScripts,
        n = Ka(t),
        i = a.get(n);
      i ||
        ((i = l.querySelector(Fn(n))),
        i ||
          ((t = _({ src: t, async: !0, type: 'module' }, e)),
          (e = je.get(n)) && nf(t, e),
          (i = l.createElement('script')),
          Jt(i),
          te(i, 'link', t),
          l.head.appendChild(i)),
        (i = { type: 'script', instance: i, count: 1, state: null }),
        a.set(n, i));
    }
  }
  function Gm(t, e, l, a) {
    var n = (n = st.current) ? Si(n) : null;
    if (!n) throw Error(s(446));
    switch (t) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof l.precedence == 'string' && typeof l.href == 'string'
          ? ((e = Za(l.href)),
            (l = ha(n).hoistableStyles),
            (a = l.get(e)),
            a || ((a = { type: 'style', instance: null, count: 0, state: null }), l.set(e, a)),
            a)
          : { type: 'void', instance: null, count: 0, state: null };
      case 'link':
        if (
          l.rel === 'stylesheet' &&
          typeof l.href == 'string' &&
          typeof l.precedence == 'string'
        ) {
          t = Za(l.href);
          var i = ha(n).hoistableStyles,
            o = i.get(t);
          if (
            (o ||
              ((n = n.ownerDocument || n),
              (o = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              i.set(t, o),
              (i = n.querySelector(Wn(t))) && !i._p && ((o.instance = i), (o.state.loading = 5)),
              je.has(t) ||
                ((l = {
                  rel: 'preload',
                  as: 'style',
                  href: l.href,
                  crossOrigin: l.crossOrigin,
                  integrity: l.integrity,
                  media: l.media,
                  hrefLang: l.hrefLang,
                  referrerPolicy: l.referrerPolicy,
                }),
                je.set(t, l),
                i || Lv(n, t, l, o.state))),
            e && a === null)
          )
            throw Error(s(528, ''));
          return o;
        }
        if (e && a !== null) throw Error(s(529, ''));
        return null;
      case 'script':
        return (
          (e = l.async),
          (l = l.src),
          typeof l == 'string' && e && typeof e != 'function' && typeof e != 'symbol'
            ? ((e = Ka(l)),
              (l = ha(n).hoistableScripts),
              (a = l.get(e)),
              a || ((a = { type: 'script', instance: null, count: 0, state: null }), l.set(e, a)),
              a)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(s(444, t));
    }
  }
  function Za(t) {
    return 'href="' + Ae(t) + '"';
  }
  function Wn(t) {
    return 'link[rel="stylesheet"][' + t + ']';
  }
  function Ym(t) {
    return _({}, t, { 'data-precedence': t.precedence, precedence: null });
  }
  function Lv(t, e, l, a) {
    t.querySelector('link[rel="preload"][as="style"][' + e + ']')
      ? (a.loading = 1)
      : ((e = t.createElement('link')),
        (a.preload = e),
        e.addEventListener('load', function () {
          return (a.loading |= 1);
        }),
        e.addEventListener('error', function () {
          return (a.loading |= 2);
        }),
        te(e, 'link', l),
        Jt(e),
        t.head.appendChild(e));
  }
  function Ka(t) {
    return '[src="' + Ae(t) + '"]';
  }
  function Fn(t) {
    return 'script[async]' + t;
  }
  function Xm(t, e, l) {
    if ((e.count++, e.instance === null))
      switch (e.type) {
        case 'style':
          var a = t.querySelector('style[data-href~="' + Ae(l.href) + '"]');
          if (a) return ((e.instance = a), Jt(a), a);
          var n = _({}, l, {
            'data-href': l.href,
            'data-precedence': l.precedence,
            href: null,
            precedence: null,
          });
          return (
            (a = (t.ownerDocument || t).createElement('style')),
            Jt(a),
            te(a, 'style', n),
            Ei(a, l.precedence, t),
            (e.instance = a)
          );
        case 'stylesheet':
          n = Za(l.href);
          var i = t.querySelector(Wn(n));
          if (i) return ((e.state.loading |= 4), (e.instance = i), Jt(i), i);
          ((a = Ym(l)),
            (n = je.get(n)) && af(a, n),
            (i = (t.ownerDocument || t).createElement('link')),
            Jt(i));
          var o = i;
          return (
            (o._p = new Promise(function (d, g) {
              ((o.onload = d), (o.onerror = g));
            })),
            te(i, 'link', a),
            (e.state.loading |= 4),
            Ei(i, l.precedence, t),
            (e.instance = i)
          );
        case 'script':
          return (
            (i = Ka(l.src)),
            (n = t.querySelector(Fn(i)))
              ? ((e.instance = n), Jt(n), n)
              : ((a = l),
                (n = je.get(i)) && ((a = _({}, l)), nf(a, n)),
                (t = t.ownerDocument || t),
                (n = t.createElement('script')),
                Jt(n),
                te(n, 'link', a),
                t.head.appendChild(n),
                (e.instance = n))
          );
        case 'void':
          return null;
        default:
          throw Error(s(443, e.type));
      }
    else
      e.type === 'stylesheet' &&
        (e.state.loading & 4) === 0 &&
        ((a = e.instance), (e.state.loading |= 4), Ei(a, l.precedence, t));
    return e.instance;
  }
  function Ei(t, e, l) {
    for (
      var a = l.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        n = a.length ? a[a.length - 1] : null,
        i = n,
        o = 0;
      o < a.length;
      o++
    ) {
      var d = a[o];
      if (d.dataset.precedence === e) i = d;
      else if (i !== n) break;
    }
    i
      ? i.parentNode.insertBefore(t, i.nextSibling)
      : ((e = l.nodeType === 9 ? l.head : l), e.insertBefore(t, e.firstChild));
  }
  function af(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.title == null && (t.title = e.title));
  }
  function nf(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.integrity == null && (t.integrity = e.integrity));
  }
  var Ti = null;
  function Qm(t, e, l) {
    if (Ti === null) {
      var a = new Map(),
        n = (Ti = new Map());
      n.set(l, a);
    } else ((n = Ti), (a = n.get(l)), a || ((a = new Map()), n.set(l, a)));
    if (a.has(t)) return a;
    for (a.set(t, null), l = l.getElementsByTagName(t), n = 0; n < l.length; n++) {
      var i = l[n];
      if (
        !(i[mn] || i[Wt] || (t === 'link' && i.getAttribute('rel') === 'stylesheet')) &&
        i.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var o = i.getAttribute(e) || '';
        o = t + o;
        var d = a.get(o);
        d ? d.push(i) : a.set(o, [i]);
      }
    }
    return a;
  }
  function Vm(t, e, l) {
    ((t = t.ownerDocument || t),
      t.head.insertBefore(l, e === 'title' ? t.querySelector('head > title') : null));
  }
  function qv(t, e, l) {
    if (l === 1 || e.itemProp != null) return !1;
    switch (t) {
      case 'meta':
      case 'title':
        return !0;
      case 'style':
        if (typeof e.precedence != 'string' || typeof e.href != 'string' || e.href === '') break;
        return !0;
      case 'link':
        if (
          typeof e.rel != 'string' ||
          typeof e.href != 'string' ||
          e.href === '' ||
          e.onLoad ||
          e.onError
        )
          break;
        switch (e.rel) {
          case 'stylesheet':
            return ((t = e.disabled), typeof e.precedence == 'string' && t == null);
          default:
            return !0;
        }
      case 'script':
        if (
          e.async &&
          typeof e.async != 'function' &&
          typeof e.async != 'symbol' &&
          !e.onLoad &&
          !e.onError &&
          e.src &&
          typeof e.src == 'string'
        )
          return !0;
    }
    return !1;
  }
  function Zm(t) {
    return !(t.type === 'stylesheet' && (t.state.loading & 3) === 0);
  }
  function Gv(t, e, l, a) {
    if (
      l.type === 'stylesheet' &&
      (typeof a.media != 'string' || matchMedia(a.media).matches !== !1) &&
      (l.state.loading & 4) === 0
    ) {
      if (l.instance === null) {
        var n = Za(a.href),
          i = e.querySelector(Wn(n));
        if (i) {
          ((e = i._p),
            e !== null &&
              typeof e == 'object' &&
              typeof e.then == 'function' &&
              (t.count++, (t = xi.bind(t)), e.then(t, t)),
            (l.state.loading |= 4),
            (l.instance = i),
            Jt(i));
          return;
        }
        ((i = e.ownerDocument || e),
          (a = Ym(a)),
          (n = je.get(n)) && af(a, n),
          (i = i.createElement('link')),
          Jt(i));
        var o = i;
        ((o._p = new Promise(function (d, g) {
          ((o.onload = d), (o.onerror = g));
        })),
          te(i, 'link', a),
          (l.instance = i));
      }
      (t.stylesheets === null && (t.stylesheets = new Map()),
        t.stylesheets.set(l, e),
        (e = l.state.preload) &&
          (l.state.loading & 3) === 0 &&
          (t.count++,
          (l = xi.bind(t)),
          e.addEventListener('load', l),
          e.addEventListener('error', l)));
    }
  }
  var uf = 0;
  function Yv(t, e) {
    return (
      t.stylesheets && t.count === 0 && Mi(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (l) {
            var a = setTimeout(function () {
              if ((t.stylesheets && Mi(t, t.stylesheets), t.unsuspend)) {
                var i = t.unsuspend;
                ((t.unsuspend = null), i());
              }
            }, 6e4 + e);
            0 < t.imgBytes && uf === 0 && (uf = 62500 * Ev());
            var n = setTimeout(
              function () {
                if (
                  ((t.waitingForImages = !1),
                  t.count === 0 && (t.stylesheets && Mi(t, t.stylesheets), t.unsuspend))
                ) {
                  var i = t.unsuspend;
                  ((t.unsuspend = null), i());
                }
              },
              (t.imgBytes > uf ? 50 : 800) + e
            );
            return (
              (t.unsuspend = l),
              function () {
                ((t.unsuspend = null), clearTimeout(a), clearTimeout(n));
              }
            );
          }
        : null
    );
  }
  function xi() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) Mi(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        ((this.unsuspend = null), t());
      }
    }
  }
  var Ai = null;
  function Mi(t, e) {
    ((t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++, (Ai = new Map()), e.forEach(Xv, t), (Ai = null), xi.call(t)));
  }
  function Xv(t, e) {
    if (!(e.state.loading & 4)) {
      var l = Ai.get(t);
      if (l) var a = l.get(null);
      else {
        ((l = new Map()), Ai.set(t, l));
        for (
          var n = t.querySelectorAll('link[data-precedence],style[data-precedence]'), i = 0;
          i < n.length;
          i++
        ) {
          var o = n[i];
          (o.nodeName === 'LINK' || o.getAttribute('media') !== 'not all') &&
            (l.set(o.dataset.precedence, o), (a = o));
        }
        a && l.set(null, a);
      }
      ((n = e.instance),
        (o = n.getAttribute('data-precedence')),
        (i = l.get(o) || a),
        i === a && l.set(null, n),
        l.set(o, n),
        this.count++,
        (a = xi.bind(this)),
        n.addEventListener('load', a),
        n.addEventListener('error', a),
        i
          ? i.parentNode.insertBefore(n, i.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(n, t.firstChild)),
        (e.state.loading |= 4));
    }
  }
  var In = {
    $$typeof: q,
    Provider: null,
    Consumer: null,
    _currentValue: V,
    _currentValue2: V,
    _threadCount: 0,
  };
  function Qv(t, e, l, a, n, i, o, d, g) {
    ((this.tag = 1),
      (this.containerInfo = t),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = tc(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = tc(0)),
      (this.hiddenUpdates = tc(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = n),
      (this.onCaughtError = i),
      (this.onRecoverableError = o),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = g),
      (this.incompleteTransitions = new Map()));
  }
  function Km(t, e, l, a, n, i, o, d, g, C, U, L) {
    return (
      (t = new Qv(t, e, l, o, g, C, U, L, d)),
      (e = 1),
      i === !0 && (e |= 24),
      (i = ve(3, null, null, e)),
      (t.current = i),
      (i.stateNode = t),
      (e = Hc()),
      e.refCount++,
      (t.pooledCache = e),
      e.refCount++,
      (i.memoizedState = { element: a, isDehydrated: l, cache: e }),
      Yc(i),
      t
    );
  }
  function Jm(t) {
    return t ? ((t = xa), t) : xa;
  }
  function $m(t, e, l, a, n, i) {
    ((n = Jm(n)),
      a.context === null ? (a.context = n) : (a.pendingContext = n),
      (a = Sl(e)),
      (a.payload = { element: l }),
      (i = i === void 0 ? null : i),
      i !== null && (a.callback = i),
      (l = El(t, a, e)),
      l !== null && (re(l, t, e), zn(l, t, e)));
  }
  function Wm(t, e) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function cf(t, e) {
    (Wm(t, e), (t = t.alternate) && Wm(t, e));
  }
  function Fm(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Jl(t, 67108864);
      (e !== null && re(e, t, 67108864), cf(t, 67108864));
    }
  }
  function Im(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ee();
      e = ec(e);
      var l = Jl(t, e);
      (l !== null && re(l, t, e), cf(t, e));
    }
  }
  var Ni = !0;
  function Vv(t, e, l, a) {
    var n = w.T;
    w.T = null;
    var i = R.p;
    try {
      ((R.p = 2), sf(t, e, l, a));
    } finally {
      ((R.p = i), (w.T = n));
    }
  }
  function Zv(t, e, l, a) {
    var n = w.T;
    w.T = null;
    var i = R.p;
    try {
      ((R.p = 8), sf(t, e, l, a));
    } finally {
      ((R.p = i), (w.T = n));
    }
  }
  function sf(t, e, l, a) {
    if (Ni) {
      var n = ff(a);
      if (n === null) (Ks(t, e, a, Ci, l), th(t, a));
      else if (Jv(n, t, e, l, a)) a.stopPropagation();
      else if ((th(t, a), e & 4 && -1 < Kv.indexOf(t))) {
        for (; n !== null; ) {
          var i = ma(n);
          if (i !== null)
            switch (i.tag) {
              case 3:
                if (((i = i.stateNode), i.current.memoizedState.isDehydrated)) {
                  var o = Xl(i.pendingLanes);
                  if (o !== 0) {
                    var d = i;
                    for (d.pendingLanes |= 2, d.entangledLanes |= 2; o; ) {
                      var g = 1 << (31 - ye(o));
                      ((d.entanglements[1] |= g), (o &= ~g));
                    }
                    (Xe(i), (gt & 6) === 0 && ((oi = me() + 500), Zn(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((d = Jl(i, 2)), d !== null && re(d, i, 2), di(), cf(i, 2));
            }
          if (((i = ff(a)), i === null && Ks(t, e, a, Ci, l), i === n)) break;
          n = i;
        }
        n !== null && a.stopPropagation();
      } else Ks(t, e, a, null, l);
    }
  }
  function ff(t) {
    return ((t = oc(t)), of(t));
  }
  var Ci = null;
  function of(t) {
    if (((Ci = null), (t = da(t)), t !== null)) {
      var e = m(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (((t = v(e)), t !== null)) return t;
          t = null;
        } else if (l === 31) {
          if (((t = p(e)), t !== null)) return t;
          t = null;
        } else if (l === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return ((Ci = t), null);
  }
  function Pm(t) {
    switch (t) {
      case 'beforetoggle':
      case 'cancel':
      case 'click':
      case 'close':
      case 'contextmenu':
      case 'copy':
      case 'cut':
      case 'auxclick':
      case 'dblclick':
      case 'dragend':
      case 'dragstart':
      case 'drop':
      case 'focusin':
      case 'focusout':
      case 'input':
      case 'invalid':
      case 'keydown':
      case 'keypress':
      case 'keyup':
      case 'mousedown':
      case 'mouseup':
      case 'paste':
      case 'pause':
      case 'play':
      case 'pointercancel':
      case 'pointerdown':
      case 'pointerup':
      case 'ratechange':
      case 'reset':
      case 'resize':
      case 'seeked':
      case 'submit':
      case 'toggle':
      case 'touchcancel':
      case 'touchend':
      case 'touchstart':
      case 'volumechange':
      case 'change':
      case 'selectionchange':
      case 'textInput':
      case 'compositionstart':
      case 'compositionend':
      case 'compositionupdate':
      case 'beforeblur':
      case 'afterblur':
      case 'beforeinput':
      case 'blur':
      case 'fullscreenchange':
      case 'focus':
      case 'hashchange':
      case 'popstate':
      case 'select':
      case 'selectstart':
        return 2;
      case 'drag':
      case 'dragenter':
      case 'dragexit':
      case 'dragleave':
      case 'dragover':
      case 'mousemove':
      case 'mouseout':
      case 'mouseover':
      case 'pointermove':
      case 'pointerout':
      case 'pointerover':
      case 'scroll':
      case 'touchmove':
      case 'wheel':
      case 'mouseenter':
      case 'mouseleave':
      case 'pointerenter':
      case 'pointerleave':
        return 8;
      case 'message':
        switch (Oy()) {
          case io:
            return 2;
          case co:
            return 8;
          case vu:
          case jy:
            return 32;
          case so:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var rf = !1,
    jl = null,
    Ul = null,
    wl = null,
    Pn = new Map(),
    tu = new Map(),
    Bl = [],
    Kv =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function th(t, e) {
    switch (t) {
      case 'focusin':
      case 'focusout':
        jl = null;
        break;
      case 'dragenter':
      case 'dragleave':
        Ul = null;
        break;
      case 'mouseover':
      case 'mouseout':
        wl = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Pn.delete(e.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        tu.delete(e.pointerId);
    }
  }
  function eu(t, e, l, a, n, i) {
    return t === null || t.nativeEvent !== i
      ? ((t = {
          blockedOn: e,
          domEventName: l,
          eventSystemFlags: a,
          nativeEvent: i,
          targetContainers: [n],
        }),
        e !== null && ((e = ma(e)), e !== null && Fm(e)),
        t)
      : ((t.eventSystemFlags |= a),
        (e = t.targetContainers),
        n !== null && e.indexOf(n) === -1 && e.push(n),
        t);
  }
  function Jv(t, e, l, a, n) {
    switch (e) {
      case 'focusin':
        return ((jl = eu(jl, t, e, l, a, n)), !0);
      case 'dragenter':
        return ((Ul = eu(Ul, t, e, l, a, n)), !0);
      case 'mouseover':
        return ((wl = eu(wl, t, e, l, a, n)), !0);
      case 'pointerover':
        var i = n.pointerId;
        return (Pn.set(i, eu(Pn.get(i) || null, t, e, l, a, n)), !0);
      case 'gotpointercapture':
        return ((i = n.pointerId), tu.set(i, eu(tu.get(i) || null, t, e, l, a, n)), !0);
    }
    return !1;
  }
  function eh(t) {
    var e = da(t.target);
    if (e !== null) {
      var l = m(e);
      if (l !== null) {
        if (((e = l.tag), e === 13)) {
          if (((e = v(l)), e !== null)) {
            ((t.blockedOn = e),
              yo(t.priority, function () {
                Im(l);
              }));
            return;
          }
        } else if (e === 31) {
          if (((e = p(l)), e !== null)) {
            ((t.blockedOn = e),
              yo(t.priority, function () {
                Im(l);
              }));
            return;
          }
        } else if (e === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Ri(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = ff(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var a = new l.constructor(l.type, l);
        ((fc = a), l.target.dispatchEvent(a), (fc = null));
      } else return ((e = ma(l)), e !== null && Fm(e), (t.blockedOn = l), !1);
      e.shift();
    }
    return !0;
  }
  function lh(t, e, l) {
    Ri(t) && l.delete(e);
  }
  function $v() {
    ((rf = !1),
      jl !== null && Ri(jl) && (jl = null),
      Ul !== null && Ri(Ul) && (Ul = null),
      wl !== null && Ri(wl) && (wl = null),
      Pn.forEach(lh),
      tu.forEach(lh));
  }
  function zi(t, e) {
    t.blockedOn === e &&
      ((t.blockedOn = null),
      rf || ((rf = !0), u.unstable_scheduleCallback(u.unstable_NormalPriority, $v)));
  }
  var Di = null;
  function ah(t) {
    Di !== t &&
      ((Di = t),
      u.unstable_scheduleCallback(u.unstable_NormalPriority, function () {
        Di === t && (Di = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e],
            a = t[e + 1],
            n = t[e + 2];
          if (typeof a != 'function') {
            if (of(a || l) === null) continue;
            break;
          }
          var i = ma(l);
          i !== null &&
            (t.splice(e, 3),
            (e -= 3),
            ss(i, { pending: !0, data: n, method: l.method, action: a }, a, n));
        }
      }));
  }
  function Ja(t) {
    function e(g) {
      return zi(g, t);
    }
    (jl !== null && zi(jl, t),
      Ul !== null && zi(Ul, t),
      wl !== null && zi(wl, t),
      Pn.forEach(e),
      tu.forEach(e));
    for (var l = 0; l < Bl.length; l++) {
      var a = Bl[l];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < Bl.length && ((l = Bl[0]), l.blockedOn === null); )
      (eh(l), l.blockedOn === null && Bl.shift());
    if (((l = (t.ownerDocument || t).$$reactFormReplay), l != null))
      for (a = 0; a < l.length; a += 3) {
        var n = l[a],
          i = l[a + 1],
          o = n[ue] || null;
        if (typeof i == 'function') o || ah(l);
        else if (o) {
          var d = null;
          if (i && i.hasAttribute('formAction')) {
            if (((n = i), (o = i[ue] || null))) d = o.formAction;
            else if (of(n) !== null) continue;
          } else d = o.action;
          (typeof d == 'function' ? (l[a + 1] = d) : (l.splice(a, 3), (a -= 3)), ah(l));
        }
      }
  }
  function nh() {
    function t(i) {
      i.canIntercept &&
        i.info === 'react-transition' &&
        i.intercept({
          handler: function () {
            return new Promise(function (o) {
              return (n = o);
            });
          },
          focusReset: 'manual',
          scroll: 'manual',
        });
    }
    function e() {
      (n !== null && (n(), (n = null)), a || setTimeout(l, 20));
    }
    function l() {
      if (!a && !navigation.transition) {
        var i = navigation.currentEntry;
        i &&
          i.url != null &&
          navigation.navigate(i.url, {
            state: i.getState(),
            info: 'react-transition',
            history: 'replace',
          });
      }
    }
    if (typeof navigation == 'object') {
      var a = !1,
        n = null;
      return (
        navigation.addEventListener('navigate', t),
        navigation.addEventListener('navigatesuccess', e),
        navigation.addEventListener('navigateerror', e),
        setTimeout(l, 100),
        function () {
          ((a = !0),
            navigation.removeEventListener('navigate', t),
            navigation.removeEventListener('navigatesuccess', e),
            navigation.removeEventListener('navigateerror', e),
            n !== null && (n(), (n = null)));
        }
      );
    }
  }
  function df(t) {
    this._internalRoot = t;
  }
  ((Oi.prototype.render = df.prototype.render =
    function (t) {
      var e = this._internalRoot;
      if (e === null) throw Error(s(409));
      var l = e.current,
        a = Ee();
      $m(l, a, t, e, null, null);
    }),
    (Oi.prototype.unmount = df.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var e = t.containerInfo;
          ($m(t.current, 2, null, t, null, null), di(), (e[ra] = null));
        }
      }));
  function Oi(t) {
    this._internalRoot = t;
  }
  Oi.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var e = ho();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < Bl.length && e !== 0 && e < Bl[l].priority; l++);
      (Bl.splice(l, 0, t), l === 0 && eh(t));
    }
  };
  var uh = c.version;
  if (uh !== '19.2.5') throw Error(s(527, uh, '19.2.5'));
  R.findDOMNode = function (t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == 'function'
        ? Error(s(188))
        : ((t = Object.keys(t).join(',')), Error(s(268, t)));
    return ((t = y(e)), (t = t !== null ? T(t) : null), (t = t === null ? null : t.stateNode), t);
  };
  var Wv = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: w,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var ji = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ji.isDisabled && ji.supportsFiber)
      try {
        ((on = ji.inject(Wv)), (he = ji));
      } catch {}
  }
  return (
    (au.createRoot = function (t, e) {
      if (!r(t)) throw Error(s(299));
      var l = !1,
        a = '',
        n = dd,
        i = md,
        o = hd;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (l = !0),
          e.identifierPrefix !== void 0 && (a = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (n = e.onUncaughtError),
          e.onCaughtError !== void 0 && (i = e.onCaughtError),
          e.onRecoverableError !== void 0 && (o = e.onRecoverableError)),
        (e = Km(t, 1, !1, null, null, l, a, null, n, i, o, nh)),
        (t[ra] = e.current),
        Zs(t),
        new df(e)
      );
    }),
    (au.hydrateRoot = function (t, e, l) {
      if (!r(t)) throw Error(s(299));
      var a = !1,
        n = '',
        i = dd,
        o = md,
        d = hd,
        g = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (a = !0),
          l.identifierPrefix !== void 0 && (n = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (i = l.onUncaughtError),
          l.onCaughtError !== void 0 && (o = l.onCaughtError),
          l.onRecoverableError !== void 0 && (d = l.onRecoverableError),
          l.formState !== void 0 && (g = l.formState)),
        (e = Km(t, 1, !0, e, l ?? null, a, n, g, i, o, d, nh)),
        (e.context = Jm(null)),
        (l = e.current),
        (a = Ee()),
        (a = ec(a)),
        (n = Sl(a)),
        (n.callback = null),
        El(l, n, a),
        (l = a),
        (e.current.lanes = l),
        dn(e, l),
        Xe(e),
        (t[ra] = e.current),
        Zs(t),
        new Oi(e)
      );
    }),
    (au.version = '19.2.5'),
    au
  );
}
var yh;
function s0() {
  if (yh) return yf.exports;
  yh = 1;
  function u() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (c) {
        console.error(c);
      }
  }
  return (u(), (yf.exports = c0()), yf.exports);
}
var f0 = s0(),
  A = Gf();
/**
 * react-router v7.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var ph = 'popstate';
function vh(u) {
  return (
    typeof u == 'object' &&
    u != null &&
    'pathname' in u &&
    'search' in u &&
    'hash' in u &&
    'state' in u &&
    'key' in u
  );
}
function o0(u = {}) {
  function c(s, r) {
    var y;
    let m = (y = r.state) == null ? void 0 : y.masked,
      { pathname: v, search: p, hash: h } = m || s.location;
    return zf(
      '',
      { pathname: v, search: p, hash: h },
      (r.state && r.state.usr) || null,
      (r.state && r.state.key) || 'default',
      m
        ? { pathname: s.location.pathname, search: s.location.search, hash: s.location.hash }
        : void 0
    );
  }
  function f(s, r) {
    return typeof r == 'string' ? r : ou(r);
  }
  return d0(c, f, null, u);
}
function Dt(u, c) {
  if (u === !1 || u === null || typeof u > 'u') throw new Error(c);
}
function Le(u, c) {
  if (!u) {
    typeof console < 'u' && console.warn(c);
    try {
      throw new Error(c);
    } catch {}
  }
}
function r0() {
  return Math.random().toString(36).substring(2, 10);
}
function gh(u, c) {
  return {
    usr: u.state,
    key: u.key,
    idx: c,
    masked: u.unstable_mask ? { pathname: u.pathname, search: u.search, hash: u.hash } : void 0,
  };
}
function zf(u, c, f = null, s, r) {
  return {
    pathname: typeof u == 'string' ? u : u.pathname,
    search: '',
    hash: '',
    ...(typeof c == 'string' ? an(c) : c),
    state: f,
    key: (c && c.key) || s || r0(),
    unstable_mask: r,
  };
}
function ou({ pathname: u = '/', search: c = '', hash: f = '' }) {
  return (
    c && c !== '?' && (u += c.charAt(0) === '?' ? c : '?' + c),
    f && f !== '#' && (u += f.charAt(0) === '#' ? f : '#' + f),
    u
  );
}
function an(u) {
  let c = {};
  if (u) {
    let f = u.indexOf('#');
    f >= 0 && ((c.hash = u.substring(f)), (u = u.substring(0, f)));
    let s = u.indexOf('?');
    (s >= 0 && ((c.search = u.substring(s)), (u = u.substring(0, s))), u && (c.pathname = u));
  }
  return c;
}
function d0(u, c, f, s = {}) {
  let { window: r = document.defaultView, v5Compat: m = !1 } = s,
    v = r.history,
    p = 'POP',
    h = null,
    y = T();
  y == null && ((y = 0), v.replaceState({ ...v.state, idx: y }, ''));
  function T() {
    return (v.state || { idx: null }).idx;
  }
  function _() {
    p = 'POP';
    let j = T(),
      O = j == null ? null : j - y;
    ((y = j), h && h({ action: p, location: B.location, delta: O }));
  }
  function M(j, O) {
    p = 'PUSH';
    let X = vh(j) ? j : zf(B.location, j, O);
    y = T() + 1;
    let q = gh(X, y),
      Q = B.createHref(X.unstable_mask || X);
    try {
      v.pushState(q, '', Q);
    } catch (I) {
      if (I instanceof DOMException && I.name === 'DataCloneError') throw I;
      r.location.assign(Q);
    }
    m && h && h({ action: p, location: B.location, delta: 1 });
  }
  function G(j, O) {
    p = 'REPLACE';
    let X = vh(j) ? j : zf(B.location, j, O);
    y = T();
    let q = gh(X, y),
      Q = B.createHref(X.unstable_mask || X);
    (v.replaceState(q, '', Q), m && h && h({ action: p, location: B.location, delta: 0 }));
  }
  function Y(j) {
    return m0(j);
  }
  let B = {
    get action() {
      return p;
    },
    get location() {
      return u(r, v);
    },
    listen(j) {
      if (h) throw new Error('A history only accepts one active listener');
      return (
        r.addEventListener(ph, _),
        (h = j),
        () => {
          (r.removeEventListener(ph, _), (h = null));
        }
      );
    },
    createHref(j) {
      return c(r, j);
    },
    createURL: Y,
    encodeLocation(j) {
      let O = Y(j);
      return { pathname: O.pathname, search: O.search, hash: O.hash };
    },
    push: M,
    replace: G,
    go(j) {
      return v.go(j);
    },
  };
  return B;
}
function m0(u, c = !1) {
  let f = 'http://localhost';
  (typeof window < 'u' &&
    (f = window.location.origin !== 'null' ? window.location.origin : window.location.href),
    Dt(f, 'No window.location.(origin|href) available to create URL'));
  let s = typeof u == 'string' ? u : ou(u);
  return ((s = s.replace(/ $/, '%20')), !c && s.startsWith('//') && (s = f + s), new URL(s, f));
}
function Gh(u, c, f = '/') {
  return h0(u, c, f, !1);
}
function h0(u, c, f, s) {
  let r = typeof c == 'string' ? an(c) : c,
    m = dl(r.pathname || '/', f);
  if (m == null) return null;
  let v = Yh(u);
  y0(v);
  let p = null;
  for (let h = 0; p == null && h < v.length; ++h) {
    let y = M0(m);
    p = x0(v[h], y, s);
  }
  return p;
}
function Yh(u, c = [], f = [], s = '', r = !1) {
  let m = (v, p, h = r, y) => {
    let T = {
      relativePath: y === void 0 ? v.path || '' : y,
      caseSensitive: v.caseSensitive === !0,
      childrenIndex: p,
      route: v,
    };
    if (T.relativePath.startsWith('/')) {
      if (!T.relativePath.startsWith(s) && h) return;
      (Dt(
        T.relativePath.startsWith(s),
        `Absolute route path "${T.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (T.relativePath = T.relativePath.slice(s.length)));
    }
    let _ = He([s, T.relativePath]),
      M = f.concat(T);
    (v.children &&
      v.children.length > 0 &&
      (Dt(
        v.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${_}".`
      ),
      Yh(v.children, c, M, _, h)),
      !(v.path == null && !v.index) && c.push({ path: _, score: E0(_, v.index), routesMeta: M }));
  };
  return (
    u.forEach((v, p) => {
      var h;
      if (v.path === '' || !((h = v.path) != null && h.includes('?'))) m(v, p);
      else for (let y of Xh(v.path)) m(v, p, !0, y);
    }),
    c
  );
}
function Xh(u) {
  let c = u.split('/');
  if (c.length === 0) return [];
  let [f, ...s] = c,
    r = f.endsWith('?'),
    m = f.replace(/\?$/, '');
  if (s.length === 0) return r ? [m, ''] : [m];
  let v = Xh(s.join('/')),
    p = [];
  return (
    p.push(...v.map((h) => (h === '' ? m : [m, h].join('/')))),
    r && p.push(...v),
    p.map((h) => (u.startsWith('/') && h === '' ? '/' : h))
  );
}
function y0(u) {
  u.sort((c, f) =>
    c.score !== f.score
      ? f.score - c.score
      : T0(
          c.routesMeta.map((s) => s.childrenIndex),
          f.routesMeta.map((s) => s.childrenIndex)
        )
  );
}
var p0 = /^:[\w-]+$/,
  v0 = 3,
  g0 = 2,
  _0 = 1,
  b0 = 10,
  S0 = -2,
  _h = (u) => u === '*';
function E0(u, c) {
  let f = u.split('/'),
    s = f.length;
  return (
    f.some(_h) && (s += S0),
    c && (s += g0),
    f.filter((r) => !_h(r)).reduce((r, m) => r + (p0.test(m) ? v0 : m === '' ? _0 : b0), s)
  );
}
function T0(u, c) {
  return u.length === c.length && u.slice(0, -1).every((s, r) => s === c[r])
    ? u[u.length - 1] - c[c.length - 1]
    : 0;
}
function x0(u, c, f = !1) {
  let { routesMeta: s } = u,
    r = {},
    m = '/',
    v = [];
  for (let p = 0; p < s.length; ++p) {
    let h = s[p],
      y = p === s.length - 1,
      T = m === '/' ? c : c.slice(m.length) || '/',
      _ = Li({ path: h.relativePath, caseSensitive: h.caseSensitive, end: y }, T),
      M = h.route;
    if (
      (!_ &&
        y &&
        f &&
        !s[s.length - 1].route.index &&
        (_ = Li({ path: h.relativePath, caseSensitive: h.caseSensitive, end: !1 }, T)),
      !_)
    )
      return null;
    (Object.assign(r, _.params),
      v.push({
        params: r,
        pathname: He([m, _.pathname]),
        pathnameBase: z0(He([m, _.pathnameBase])),
        route: M,
      }),
      _.pathnameBase !== '/' && (m = He([m, _.pathnameBase])));
  }
  return v;
}
function Li(u, c) {
  typeof u == 'string' && (u = { path: u, caseSensitive: !1, end: !0 });
  let [f, s] = A0(u.path, u.caseSensitive, u.end),
    r = c.match(f);
  if (!r) return null;
  let m = r[0],
    v = m.replace(/(.)\/+$/, '$1'),
    p = r.slice(1);
  return {
    params: s.reduce((y, { paramName: T, isOptional: _ }, M) => {
      if (T === '*') {
        let Y = p[M] || '';
        v = m.slice(0, m.length - Y.length).replace(/(.)\/+$/, '$1');
      }
      const G = p[M];
      return (_ && !G ? (y[T] = void 0) : (y[T] = (G || '').replace(/%2F/g, '/')), y);
    }, {}),
    pathname: m,
    pathnameBase: v,
    pattern: u,
  };
}
function A0(u, c = !1, f = !0) {
  Le(
    u === '*' || !u.endsWith('*') || u.endsWith('/*'),
    `Route path "${u}" will be treated as if it were "${u.replace(/\*$/, '/*')}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${u.replace(/\*$/, '/*')}".`
  );
  let s = [],
    r =
      '^' +
      u
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(/\/:([\w-]+)(\?)?/g, (v, p, h, y, T) => {
          if ((s.push({ paramName: p, isOptional: h != null }), h)) {
            let _ = T.charAt(y + v.length);
            return _ && _ !== '/' ? '/([^\\/]*)' : '(?:/([^\\/]*))?';
          }
          return '/([^\\/]+)';
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, '(/$1)?$2');
  return (
    u.endsWith('*')
      ? (s.push({ paramName: '*' }), (r += u === '*' || u === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : f
        ? (r += '\\/*$')
        : u !== '' && u !== '/' && (r += '(?:(?=\\/|$))'),
    [new RegExp(r, c ? void 0 : 'i'), s]
  );
}
function M0(u) {
  try {
    return u
      .split('/')
      .map((c) => decodeURIComponent(c).replace(/\//g, '%2F'))
      .join('/');
  } catch (c) {
    return (
      Le(
        !1,
        `The URL path "${u}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${c}).`
      ),
      u
    );
  }
}
function dl(u, c) {
  if (c === '/') return u;
  if (!u.toLowerCase().startsWith(c.toLowerCase())) return null;
  let f = c.endsWith('/') ? c.length - 1 : c.length,
    s = u.charAt(f);
  return s && s !== '/' ? null : u.slice(f) || '/';
}
var N0 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function C0(u, c = '/') {
  let { pathname: f, search: s = '', hash: r = '' } = typeof u == 'string' ? an(u) : u,
    m;
  return (
    f ? ((f = Qh(f)), f.startsWith('/') ? (m = bh(f.substring(1), '/')) : (m = bh(f, c))) : (m = c),
    { pathname: m, search: D0(s), hash: O0(r) }
  );
}
function bh(u, c) {
  let f = qi(c).split('/');
  return (
    u.split('/').forEach((r) => {
      r === '..' ? f.length > 1 && f.pop() : r !== '.' && f.push(r);
    }),
    f.length > 1 ? f.join('/') : '/'
  );
}
function bf(u, c, f, s) {
  return `Cannot include a '${u}' character in a manually specified \`to.${c}\` field [${JSON.stringify(s)}].  Please separate it out to the \`to.${f}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function R0(u) {
  return u.filter((c, f) => f === 0 || (c.route.path && c.route.path.length > 0));
}
function Yf(u) {
  let c = R0(u);
  return c.map((f, s) => (s === c.length - 1 ? f.pathname : f.pathnameBase));
}
function Qi(u, c, f, s = !1) {
  let r;
  typeof u == 'string'
    ? (r = an(u))
    : ((r = { ...u }),
      Dt(!r.pathname || !r.pathname.includes('?'), bf('?', 'pathname', 'search', r)),
      Dt(!r.pathname || !r.pathname.includes('#'), bf('#', 'pathname', 'hash', r)),
      Dt(!r.search || !r.search.includes('#'), bf('#', 'search', 'hash', r)));
  let m = u === '' || r.pathname === '',
    v = m ? '/' : r.pathname,
    p;
  if (v == null) p = f;
  else {
    let _ = c.length - 1;
    if (!s && v.startsWith('..')) {
      let M = v.split('/');
      for (; M[0] === '..'; ) (M.shift(), (_ -= 1));
      r.pathname = M.join('/');
    }
    p = _ >= 0 ? c[_] : '/';
  }
  let h = C0(r, p),
    y = v && v !== '/' && v.endsWith('/'),
    T = (m || v === '.') && f.endsWith('/');
  return (!h.pathname.endsWith('/') && (y || T) && (h.pathname += '/'), h);
}
var Qh = (u) => u.replace(/\/\/+/g, '/'),
  He = (u) => Qh(u.join('/')),
  qi = (u) => u.replace(/\/+$/, ''),
  z0 = (u) => qi(u).replace(/^\/*/, '/'),
  D0 = (u) => (!u || u === '?' ? '' : u.startsWith('?') ? u : '?' + u),
  O0 = (u) => (!u || u === '#' ? '' : u.startsWith('#') ? u : '#' + u),
  j0 = class {
    constructor(u, c, f, s = !1) {
      ((this.status = u),
        (this.statusText = c || ''),
        (this.internal = s),
        f instanceof Error ? ((this.data = f.toString()), (this.error = f)) : (this.data = f));
    }
  };
function U0(u) {
  return (
    u != null &&
    typeof u.status == 'number' &&
    typeof u.statusText == 'string' &&
    typeof u.internal == 'boolean' &&
    'data' in u
  );
}
function w0(u) {
  let c = u.map((f) => f.route.path).filter(Boolean);
  return He(c) || '/';
}
var Vh =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
function Zh(u, c) {
  let f = u;
  if (typeof f != 'string' || !N0.test(f)) return { absoluteURL: void 0, isExternal: !1, to: f };
  let s = f,
    r = !1;
  if (Vh)
    try {
      let m = new URL(window.location.href),
        v = f.startsWith('//') ? new URL(m.protocol + f) : new URL(f),
        p = dl(v.pathname, c);
      v.origin === m.origin && p != null ? (f = p + v.search + v.hash) : (r = !0);
    } catch {
      Le(
        !1,
        `<Link to="${f}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: s, isExternal: r, to: f };
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
var Kh = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(Kh);
var B0 = ['GET', ...Kh];
new Set(B0);
var nn = A.createContext(null);
nn.displayName = 'DataRouter';
var Vi = A.createContext(null);
Vi.displayName = 'DataRouterState';
var Jh = A.createContext(!1);
function k0() {
  return A.useContext(Jh);
}
var $h = A.createContext({ isTransitioning: !1 });
$h.displayName = 'ViewTransition';
var H0 = A.createContext(new Map());
H0.displayName = 'Fetchers';
var L0 = A.createContext(null);
L0.displayName = 'Await';
var Te = A.createContext(null);
Te.displayName = 'Navigation';
var du = A.createContext(null);
du.displayName = 'Location';
var Qe = A.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Qe.displayName = 'Route';
var Xf = A.createContext(null);
Xf.displayName = 'RouteError';
var Wh = 'REACT_ROUTER_ERROR',
  q0 = 'REDIRECT',
  G0 = 'ROUTE_ERROR_RESPONSE';
function Y0(u) {
  if (u.startsWith(`${Wh}:${q0}:{`))
    try {
      let c = JSON.parse(u.slice(28));
      if (
        typeof c == 'object' &&
        c &&
        typeof c.status == 'number' &&
        typeof c.statusText == 'string' &&
        typeof c.location == 'string' &&
        typeof c.reloadDocument == 'boolean' &&
        typeof c.replace == 'boolean'
      )
        return c;
    } catch {}
}
function X0(u) {
  if (u.startsWith(`${Wh}:${G0}:{`))
    try {
      let c = JSON.parse(u.slice(40));
      if (
        typeof c == 'object' &&
        c &&
        typeof c.status == 'number' &&
        typeof c.statusText == 'string'
      )
        return new j0(c.status, c.statusText, c.data);
    } catch {}
}
function Q0(u, { relative: c } = {}) {
  Dt(un(), 'useHref() may be used only in the context of a <Router> component.');
  let { basename: f, navigator: s } = A.useContext(Te),
    { hash: r, pathname: m, search: v } = mu(u, { relative: c }),
    p = m;
  return (
    f !== '/' && (p = m === '/' ? f : He([f, m])),
    s.createHref({ pathname: p, search: v, hash: r })
  );
}
function un() {
  return A.useContext(du) != null;
}
function Ve() {
  return (
    Dt(un(), 'useLocation() may be used only in the context of a <Router> component.'),
    A.useContext(du).location
  );
}
var Fh =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function Ih(u) {
  A.useContext(Te).static || A.useLayoutEffect(u);
}
function oa() {
  let { isDataRoute: u } = A.useContext(Qe);
  return u ? ag() : V0();
}
function V0() {
  Dt(un(), 'useNavigate() may be used only in the context of a <Router> component.');
  let u = A.useContext(nn),
    { basename: c, navigator: f } = A.useContext(Te),
    { matches: s } = A.useContext(Qe),
    { pathname: r } = Ve(),
    m = JSON.stringify(Yf(s)),
    v = A.useRef(!1);
  return (
    Ih(() => {
      v.current = !0;
    }),
    A.useCallback(
      (h, y = {}) => {
        if ((Le(v.current, Fh), !v.current)) return;
        if (typeof h == 'number') {
          f.go(h);
          return;
        }
        let T = Qi(h, JSON.parse(m), r, y.relative === 'path');
        (u == null && c !== '/' && (T.pathname = T.pathname === '/' ? c : He([c, T.pathname])),
          (y.replace ? f.replace : f.push)(T, y.state, y));
      },
      [c, f, m, r, u]
    )
  );
}
A.createContext(null);
function mu(u, { relative: c } = {}) {
  let { matches: f } = A.useContext(Qe),
    { pathname: s } = Ve(),
    r = JSON.stringify(Yf(f));
  return A.useMemo(() => Qi(u, JSON.parse(r), s, c === 'path'), [u, r, s, c]);
}
function Z0(u, c) {
  return Ph(u, c);
}
function Ph(u, c, f) {
  var j;
  Dt(un(), 'useRoutes() may be used only in the context of a <Router> component.');
  let { navigator: s } = A.useContext(Te),
    { matches: r } = A.useContext(Qe),
    m = r[r.length - 1],
    v = m ? m.params : {},
    p = m ? m.pathname : '/',
    h = m ? m.pathnameBase : '/',
    y = m && m.route;
  {
    let O = (y && y.path) || '';
    ey(
      p,
      !y || O.endsWith('*') || O.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${p}" (under <Route path="${O}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${O}"> to <Route path="${O === '/' ? '*' : `${O}/*`}">.`
    );
  }
  let T = Ve(),
    _;
  if (c) {
    let O = typeof c == 'string' ? an(c) : c;
    (Dt(
      h === '/' || ((j = O.pathname) == null ? void 0 : j.startsWith(h)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${h}" but pathname "${O.pathname}" was given in the \`location\` prop.`
    ),
      (_ = O));
  } else _ = T;
  let M = _.pathname || '/',
    G = M;
  if (h !== '/') {
    let O = h.replace(/^\//, '').split('/');
    G = '/' + M.replace(/^\//, '').split('/').slice(O.length).join('/');
  }
  let Y = Gh(u, { pathname: G });
  (Le(y || Y != null, `No routes matched location "${_.pathname}${_.search}${_.hash}" `),
    Le(
      Y == null ||
        Y[Y.length - 1].route.element !== void 0 ||
        Y[Y.length - 1].route.Component !== void 0 ||
        Y[Y.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${_.pathname}${_.search}${_.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let B = F0(
    Y &&
      Y.map((O) =>
        Object.assign({}, O, {
          params: Object.assign({}, v, O.params),
          pathname: He([
            h,
            s.encodeLocation
              ? s.encodeLocation(
                  O.pathname.replace(/%/g, '%25').replace(/\?/g, '%3F').replace(/#/g, '%23')
                ).pathname
              : O.pathname,
          ]),
          pathnameBase:
            O.pathnameBase === '/'
              ? h
              : He([
                  h,
                  s.encodeLocation
                    ? s.encodeLocation(
                        O.pathnameBase
                          .replace(/%/g, '%25')
                          .replace(/\?/g, '%3F')
                          .replace(/#/g, '%23')
                      ).pathname
                    : O.pathnameBase,
                ]),
        })
      ),
    r,
    f
  );
  return c && B
    ? A.createElement(
        du.Provider,
        {
          value: {
            location: {
              pathname: '/',
              search: '',
              hash: '',
              state: null,
              key: 'default',
              unstable_mask: void 0,
              ..._,
            },
            navigationType: 'POP',
          },
        },
        B
      )
    : B;
}
function K0() {
  let u = lg(),
    c = U0(u) ? `${u.status} ${u.statusText}` : u instanceof Error ? u.message : JSON.stringify(u),
    f = u instanceof Error ? u.stack : null,
    s = 'rgba(200,200,200, 0.5)',
    r = { padding: '0.5rem', backgroundColor: s },
    m = { padding: '2px 4px', backgroundColor: s },
    v = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', u),
    (v = A.createElement(
      A.Fragment,
      null,
      A.createElement('p', null, '💿 Hey developer 👋'),
      A.createElement(
        'p',
        null,
        'You can provide a way better UX than this when your app throws errors by providing your own ',
        A.createElement('code', { style: m }, 'ErrorBoundary'),
        ' or',
        ' ',
        A.createElement('code', { style: m }, 'errorElement'),
        ' prop on your route.'
      )
    )),
    A.createElement(
      A.Fragment,
      null,
      A.createElement('h2', null, 'Unexpected Application Error!'),
      A.createElement('h3', { style: { fontStyle: 'italic' } }, c),
      f ? A.createElement('pre', { style: r }, f) : null,
      v
    )
  );
}
var J0 = A.createElement(K0, null),
  ty = class extends A.Component {
    constructor(u) {
      (super(u),
        (this.state = { location: u.location, revalidation: u.revalidation, error: u.error }));
    }
    static getDerivedStateFromError(u) {
      return { error: u };
    }
    static getDerivedStateFromProps(u, c) {
      return c.location !== u.location || (c.revalidation !== 'idle' && u.revalidation === 'idle')
        ? { error: u.error, location: u.location, revalidation: u.revalidation }
        : {
            error: u.error !== void 0 ? u.error : c.error,
            location: c.location,
            revalidation: u.revalidation || c.revalidation,
          };
    }
    componentDidCatch(u, c) {
      this.props.onError
        ? this.props.onError(u, c)
        : console.error('React Router caught the following error during render', u);
    }
    render() {
      let u = this.state.error;
      if (
        this.context &&
        typeof u == 'object' &&
        u &&
        'digest' in u &&
        typeof u.digest == 'string'
      ) {
        const f = X0(u.digest);
        f && (u = f);
      }
      let c =
        u !== void 0
          ? A.createElement(
              Qe.Provider,
              { value: this.props.routeContext },
              A.createElement(Xf.Provider, { value: u, children: this.props.component })
            )
          : this.props.children;
      return this.context ? A.createElement($0, { error: u }, c) : c;
    }
  };
ty.contextType = Jh;
var Sf = new WeakMap();
function $0({ children: u, error: c }) {
  let { basename: f } = A.useContext(Te);
  if (typeof c == 'object' && c && 'digest' in c && typeof c.digest == 'string') {
    let s = Y0(c.digest);
    if (s) {
      let r = Sf.get(c);
      if (r) throw r;
      let m = Zh(s.location, f);
      if (Vh && !Sf.get(c))
        if (m.isExternal || s.reloadDocument) window.location.href = m.absoluteURL || m.to;
        else {
          const v = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(m.to, { replace: s.replace })
          );
          throw (Sf.set(c, v), v);
        }
      return A.createElement('meta', {
        httpEquiv: 'refresh',
        content: `0;url=${m.absoluteURL || m.to}`,
      });
    }
  }
  return u;
}
function W0({ routeContext: u, match: c, children: f }) {
  let s = A.useContext(nn);
  return (
    s &&
      s.static &&
      s.staticContext &&
      (c.route.errorElement || c.route.ErrorBoundary) &&
      (s.staticContext._deepestRenderedBoundaryId = c.route.id),
    A.createElement(Qe.Provider, { value: u }, f)
  );
}
function F0(u, c = [], f) {
  let s = f == null ? void 0 : f.state;
  if (u == null) {
    if (!s) return null;
    if (s.errors) u = s.matches;
    else if (c.length === 0 && !s.initialized && s.matches.length > 0) u = s.matches;
    else return null;
  }
  let r = u,
    m = s == null ? void 0 : s.errors;
  if (m != null) {
    let T = r.findIndex((_) => _.route.id && (m == null ? void 0 : m[_.route.id]) !== void 0);
    (Dt(
      T >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(m).join(',')}`
    ),
      (r = r.slice(0, Math.min(r.length, T + 1))));
  }
  let v = !1,
    p = -1;
  if (f && s) {
    v = s.renderFallback;
    for (let T = 0; T < r.length; T++) {
      let _ = r[T];
      if (((_.route.HydrateFallback || _.route.hydrateFallbackElement) && (p = T), _.route.id)) {
        let { loaderData: M, errors: G } = s,
          Y = _.route.loader && !M.hasOwnProperty(_.route.id) && (!G || G[_.route.id] === void 0);
        if (_.route.lazy || Y) {
          (f.isStatic && (v = !0), p >= 0 ? (r = r.slice(0, p + 1)) : (r = [r[0]]));
          break;
        }
      }
    }
  }
  let h = f == null ? void 0 : f.onError,
    y =
      s && h
        ? (T, _) => {
            var M, G;
            h(T, {
              location: s.location,
              params:
                ((G = (M = s.matches) == null ? void 0 : M[0]) == null ? void 0 : G.params) ?? {},
              unstable_pattern: w0(s.matches),
              errorInfo: _,
            });
          }
        : void 0;
  return r.reduceRight((T, _, M) => {
    let G,
      Y = !1,
      B = null,
      j = null;
    s &&
      ((G = m && _.route.id ? m[_.route.id] : void 0),
      (B = _.route.errorElement || J0),
      v &&
        (p < 0 && M === 0
          ? (ey(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration'
            ),
            (Y = !0),
            (j = null))
          : p === M && ((Y = !0), (j = _.route.hydrateFallbackElement || null))));
    let O = c.concat(r.slice(0, M + 1)),
      X = () => {
        let q;
        return (
          G
            ? (q = B)
            : Y
              ? (q = j)
              : _.route.Component
                ? (q = A.createElement(_.route.Component, null))
                : _.route.element
                  ? (q = _.route.element)
                  : (q = T),
          A.createElement(W0, {
            match: _,
            routeContext: { outlet: T, matches: O, isDataRoute: s != null },
            children: q,
          })
        );
      };
    return s && (_.route.ErrorBoundary || _.route.errorElement || M === 0)
      ? A.createElement(ty, {
          location: s.location,
          revalidation: s.revalidation,
          component: B,
          error: G,
          children: X(),
          routeContext: { outlet: null, matches: O, isDataRoute: !0 },
          onError: y,
        })
      : X();
  }, null);
}
function Qf(u) {
  return `${u} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function I0(u) {
  let c = A.useContext(nn);
  return (Dt(c, Qf(u)), c);
}
function P0(u) {
  let c = A.useContext(Vi);
  return (Dt(c, Qf(u)), c);
}
function tg(u) {
  let c = A.useContext(Qe);
  return (Dt(c, Qf(u)), c);
}
function Vf(u) {
  let c = tg(u),
    f = c.matches[c.matches.length - 1];
  return (Dt(f.route.id, `${u} can only be used on routes that contain a unique "id"`), f.route.id);
}
function eg() {
  return Vf('useRouteId');
}
function lg() {
  var s;
  let u = A.useContext(Xf),
    c = P0('useRouteError'),
    f = Vf('useRouteError');
  return u !== void 0 ? u : (s = c.errors) == null ? void 0 : s[f];
}
function ag() {
  let { router: u } = I0('useNavigate'),
    c = Vf('useNavigate'),
    f = A.useRef(!1);
  return (
    Ih(() => {
      f.current = !0;
    }),
    A.useCallback(
      async (r, m = {}) => {
        (Le(f.current, Fh),
          f.current &&
            (typeof r == 'number'
              ? await u.navigate(r)
              : await u.navigate(r, { fromRouteId: c, ...m })));
      },
      [u, c]
    )
  );
}
var Sh = {};
function ey(u, c, f) {
  !c && !Sh[u] && ((Sh[u] = !0), Le(!1, f));
}
A.memo(ng);
function ng({ routes: u, future: c, state: f, isStatic: s, onError: r }) {
  return Ph(u, void 0, { state: f, isStatic: s, onError: r });
}
function tn({ to: u, replace: c, state: f, relative: s }) {
  Dt(un(), '<Navigate> may be used only in the context of a <Router> component.');
  let { static: r } = A.useContext(Te);
  Le(
    !r,
    '<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.'
  );
  let { matches: m } = A.useContext(Qe),
    { pathname: v } = Ve(),
    p = oa(),
    h = Qi(u, Yf(m), v, s === 'path'),
    y = JSON.stringify(h);
  return (
    A.useEffect(() => {
      p(JSON.parse(y), { replace: c, state: f, relative: s });
    }, [p, y, s, c, f]),
    null
  );
}
function Gl(u) {
  Dt(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  );
}
function ug({
  basename: u = '/',
  children: c = null,
  location: f,
  navigationType: s = 'POP',
  navigator: r,
  static: m = !1,
  unstable_useTransitions: v,
}) {
  Dt(
    !un(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  let p = u.replace(/^\/*/, '/'),
    h = A.useMemo(
      () => ({ basename: p, navigator: r, static: m, unstable_useTransitions: v, future: {} }),
      [p, r, m, v]
    );
  typeof f == 'string' && (f = an(f));
  let {
      pathname: y = '/',
      search: T = '',
      hash: _ = '',
      state: M = null,
      key: G = 'default',
      unstable_mask: Y,
    } = f,
    B = A.useMemo(() => {
      let j = dl(y, p);
      return j == null
        ? null
        : {
            location: { pathname: j, search: T, hash: _, state: M, key: G, unstable_mask: Y },
            navigationType: s,
          };
    }, [p, y, T, _, M, G, s, Y]);
  return (
    Le(
      B != null,
      `<Router basename="${p}"> is not able to match the URL "${y}${T}${_}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    B == null
      ? null
      : A.createElement(
          Te.Provider,
          { value: h },
          A.createElement(du.Provider, { children: c, value: B })
        )
  );
}
function ig({ children: u, location: c }) {
  return Z0(Df(u), c);
}
function Df(u, c = []) {
  let f = [];
  return (
    A.Children.forEach(u, (s, r) => {
      if (!A.isValidElement(s)) return;
      let m = [...c, r];
      if (s.type === A.Fragment) {
        f.push.apply(f, Df(s.props.children, m));
        return;
      }
      (Dt(
        s.type === Gl,
        `[${typeof s.type == 'string' ? s.type : s.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Dt(!s.props.index || !s.props.children, 'An index route cannot have child routes.'));
      let v = {
        id: s.props.id || m.join('-'),
        caseSensitive: s.props.caseSensitive,
        element: s.props.element,
        Component: s.props.Component,
        index: s.props.index,
        path: s.props.path,
        middleware: s.props.middleware,
        loader: s.props.loader,
        action: s.props.action,
        hydrateFallbackElement: s.props.hydrateFallbackElement,
        HydrateFallback: s.props.HydrateFallback,
        errorElement: s.props.errorElement,
        ErrorBoundary: s.props.ErrorBoundary,
        hasErrorBoundary:
          s.props.hasErrorBoundary === !0 ||
          s.props.ErrorBoundary != null ||
          s.props.errorElement != null,
        shouldRevalidate: s.props.shouldRevalidate,
        handle: s.props.handle,
        lazy: s.props.lazy,
      };
      (s.props.children && (v.children = Df(s.props.children, m)), f.push(v));
    }),
    f
  );
}
var Bi = 'get',
  ki = 'application/x-www-form-urlencoded';
function Zi(u) {
  return typeof HTMLElement < 'u' && u instanceof HTMLElement;
}
function cg(u) {
  return Zi(u) && u.tagName.toLowerCase() === 'button';
}
function sg(u) {
  return Zi(u) && u.tagName.toLowerCase() === 'form';
}
function fg(u) {
  return Zi(u) && u.tagName.toLowerCase() === 'input';
}
function og(u) {
  return !!(u.metaKey || u.altKey || u.ctrlKey || u.shiftKey);
}
function rg(u, c) {
  return u.button === 0 && (!c || c === '_self') && !og(u);
}
var Ui = null;
function dg() {
  if (Ui === null)
    try {
      (new FormData(document.createElement('form'), 0), (Ui = !1));
    } catch {
      Ui = !0;
    }
  return Ui;
}
var mg = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
function Ef(u) {
  return u != null && !mg.has(u)
    ? (Le(
        !1,
        `"${u}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ki}"`
      ),
      null)
    : u;
}
function hg(u, c) {
  let f, s, r, m, v;
  if (sg(u)) {
    let p = u.getAttribute('action');
    ((s = p ? dl(p, c) : null),
      (f = u.getAttribute('method') || Bi),
      (r = Ef(u.getAttribute('enctype')) || ki),
      (m = new FormData(u)));
  } else if (cg(u) || (fg(u) && (u.type === 'submit' || u.type === 'image'))) {
    let p = u.form;
    if (p == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let h = u.getAttribute('formaction') || p.getAttribute('action');
    if (
      ((s = h ? dl(h, c) : null),
      (f = u.getAttribute('formmethod') || p.getAttribute('method') || Bi),
      (r = Ef(u.getAttribute('formenctype')) || Ef(p.getAttribute('enctype')) || ki),
      (m = new FormData(p, u)),
      !dg())
    ) {
      let { name: y, type: T, value: _ } = u;
      if (T === 'image') {
        let M = y ? `${y}.` : '';
        (m.append(`${M}x`, '0'), m.append(`${M}y`, '0'));
      } else y && m.append(y, _);
    }
  } else {
    if (Zi(u))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((f = Bi), (s = null), (r = ki), (v = u));
  }
  return (
    m && r === 'text/plain' && ((v = m), (m = void 0)),
    { action: s, method: f.toLowerCase(), encType: r, formData: m, body: v }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function Zf(u, c) {
  if (u === !1 || u === null || typeof u > 'u') throw new Error(c);
}
function ly(u, c, f, s) {
  let r =
    typeof u == 'string'
      ? new URL(u, typeof window > 'u' ? 'server://singlefetch/' : window.location.origin)
      : u;
  return (
    f
      ? r.pathname.endsWith('/')
        ? (r.pathname = `${r.pathname}_.${s}`)
        : (r.pathname = `${r.pathname}.${s}`)
      : r.pathname === '/'
        ? (r.pathname = `_root.${s}`)
        : c && dl(r.pathname, c) === '/'
          ? (r.pathname = `${qi(c)}/_root.${s}`)
          : (r.pathname = `${qi(r.pathname)}.${s}`),
    r
  );
}
async function yg(u, c) {
  if (u.id in c) return c[u.id];
  try {
    let f = await import(u.module);
    return ((c[u.id] = f), f);
  } catch (f) {
    return (
      console.error(`Error loading route module \`${u.module}\`, reloading page...`),
      console.error(f),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function pg(u) {
  return u == null
    ? !1
    : u.href == null
      ? u.rel === 'preload' && typeof u.imageSrcSet == 'string' && typeof u.imageSizes == 'string'
      : typeof u.rel == 'string' && typeof u.href == 'string';
}
async function vg(u, c, f) {
  let s = await Promise.all(
    u.map(async (r) => {
      let m = c.routes[r.route.id];
      if (m) {
        let v = await yg(m, f);
        return v.links ? v.links() : [];
      }
      return [];
    })
  );
  return Sg(
    s
      .flat(1)
      .filter(pg)
      .filter((r) => r.rel === 'stylesheet' || r.rel === 'preload')
      .map((r) =>
        r.rel === 'stylesheet' ? { ...r, rel: 'prefetch', as: 'style' } : { ...r, rel: 'prefetch' }
      )
  );
}
function Eh(u, c, f, s, r, m) {
  let v = (h, y) => (f[y] ? h.route.id !== f[y].route.id : !0),
    p = (h, y) => {
      var T;
      return (
        f[y].pathname !== h.pathname ||
        (((T = f[y].route.path) == null ? void 0 : T.endsWith('*')) &&
          f[y].params['*'] !== h.params['*'])
      );
    };
  return m === 'assets'
    ? c.filter((h, y) => v(h, y) || p(h, y))
    : m === 'data'
      ? c.filter((h, y) => {
          var _;
          let T = s.routes[h.route.id];
          if (!T || !T.hasLoader) return !1;
          if (v(h, y) || p(h, y)) return !0;
          if (h.route.shouldRevalidate) {
            let M = h.route.shouldRevalidate({
              currentUrl: new URL(r.pathname + r.search + r.hash, window.origin),
              currentParams: ((_ = f[0]) == null ? void 0 : _.params) || {},
              nextUrl: new URL(u, window.origin),
              nextParams: h.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof M == 'boolean') return M;
          }
          return !0;
        })
      : [];
}
function gg(u, c, { includeHydrateFallback: f } = {}) {
  return _g(
    u
      .map((s) => {
        let r = c.routes[s.route.id];
        if (!r) return [];
        let m = [r.module];
        return (
          r.clientActionModule && (m = m.concat(r.clientActionModule)),
          r.clientLoaderModule && (m = m.concat(r.clientLoaderModule)),
          f && r.hydrateFallbackModule && (m = m.concat(r.hydrateFallbackModule)),
          r.imports && (m = m.concat(r.imports)),
          m
        );
      })
      .flat(1)
  );
}
function _g(u) {
  return [...new Set(u)];
}
function bg(u) {
  let c = {},
    f = Object.keys(u).sort();
  for (let s of f) c[s] = u[s];
  return c;
}
function Sg(u, c) {
  let f = new Set();
  return (
    new Set(c),
    u.reduce((s, r) => {
      let m = JSON.stringify(bg(r));
      return (f.has(m) || (f.add(m), s.push({ key: m, link: r })), s);
    }, [])
  );
}
function Kf() {
  let u = A.useContext(nn);
  return (Zf(u, 'You must render this element inside a <DataRouterContext.Provider> element'), u);
}
function Eg() {
  let u = A.useContext(Vi);
  return (
    Zf(u, 'You must render this element inside a <DataRouterStateContext.Provider> element'),
    u
  );
}
var Jf = A.createContext(void 0);
Jf.displayName = 'FrameworkContext';
function $f() {
  let u = A.useContext(Jf);
  return (Zf(u, 'You must render this element inside a <HydratedRouter> element'), u);
}
function Tg(u, c) {
  let f = A.useContext(Jf),
    [s, r] = A.useState(!1),
    [m, v] = A.useState(!1),
    { onFocus: p, onBlur: h, onMouseEnter: y, onMouseLeave: T, onTouchStart: _ } = c,
    M = A.useRef(null);
  (A.useEffect(() => {
    if ((u === 'render' && v(!0), u === 'viewport')) {
      let B = (O) => {
          O.forEach((X) => {
            v(X.isIntersecting);
          });
        },
        j = new IntersectionObserver(B, { threshold: 0.5 });
      return (
        M.current && j.observe(M.current),
        () => {
          j.disconnect();
        }
      );
    }
  }, [u]),
    A.useEffect(() => {
      if (s) {
        let B = setTimeout(() => {
          v(!0);
        }, 100);
        return () => {
          clearTimeout(B);
        };
      }
    }, [s]));
  let G = () => {
      r(!0);
    },
    Y = () => {
      (r(!1), v(!1));
    };
  return f
    ? u !== 'intent'
      ? [m, M, {}]
      : [
          m,
          M,
          {
            onFocus: nu(p, G),
            onBlur: nu(h, Y),
            onMouseEnter: nu(y, G),
            onMouseLeave: nu(T, Y),
            onTouchStart: nu(_, G),
          },
        ]
    : [!1, M, {}];
}
function nu(u, c) {
  return (f) => {
    (u && u(f), f.defaultPrevented || c(f));
  };
}
function xg({ page: u, ...c }) {
  let f = k0(),
    { router: s } = Kf(),
    r = A.useMemo(() => Gh(s.routes, u, s.basename), [s.routes, u, s.basename]);
  return r
    ? f
      ? A.createElement(Mg, { page: u, matches: r, ...c })
      : A.createElement(Ng, { page: u, matches: r, ...c })
    : null;
}
function Ag(u) {
  let { manifest: c, routeModules: f } = $f(),
    [s, r] = A.useState([]);
  return (
    A.useEffect(() => {
      let m = !1;
      return (
        vg(u, c, f).then((v) => {
          m || r(v);
        }),
        () => {
          m = !0;
        }
      );
    }, [u, c, f]),
    s
  );
}
function Mg({ page: u, matches: c, ...f }) {
  let s = Ve(),
    { future: r } = $f(),
    { basename: m } = Kf(),
    v = A.useMemo(() => {
      if (u === s.pathname + s.search + s.hash) return [];
      let p = ly(u, m, r.unstable_trailingSlashAwareDataRequests, 'rsc'),
        h = !1,
        y = [];
      for (let T of c)
        typeof T.route.shouldRevalidate == 'function' ? (h = !0) : y.push(T.route.id);
      return (
        h && y.length > 0 && p.searchParams.set('_routes', y.join(',')),
        [p.pathname + p.search]
      );
    }, [m, r.unstable_trailingSlashAwareDataRequests, u, s, c]);
  return A.createElement(
    A.Fragment,
    null,
    v.map((p) => A.createElement('link', { key: p, rel: 'prefetch', as: 'fetch', href: p, ...f }))
  );
}
function Ng({ page: u, matches: c, ...f }) {
  let s = Ve(),
    { future: r, manifest: m, routeModules: v } = $f(),
    { basename: p } = Kf(),
    { loaderData: h, matches: y } = Eg(),
    T = A.useMemo(() => Eh(u, c, y, m, s, 'data'), [u, c, y, m, s]),
    _ = A.useMemo(() => Eh(u, c, y, m, s, 'assets'), [u, c, y, m, s]),
    M = A.useMemo(() => {
      if (u === s.pathname + s.search + s.hash) return [];
      let B = new Set(),
        j = !1;
      if (
        (c.forEach((X) => {
          var Q;
          let q = m.routes[X.route.id];
          !q ||
            !q.hasLoader ||
            ((!T.some((I) => I.route.id === X.route.id) &&
              X.route.id in h &&
              (Q = v[X.route.id]) != null &&
              Q.shouldRevalidate) ||
            q.hasClientLoader
              ? (j = !0)
              : B.add(X.route.id));
        }),
        B.size === 0)
      )
        return [];
      let O = ly(u, p, r.unstable_trailingSlashAwareDataRequests, 'data');
      return (
        j &&
          B.size > 0 &&
          O.searchParams.set(
            '_routes',
            c
              .filter((X) => B.has(X.route.id))
              .map((X) => X.route.id)
              .join(',')
          ),
        [O.pathname + O.search]
      );
    }, [p, r.unstable_trailingSlashAwareDataRequests, h, s, m, T, c, u, v]),
    G = A.useMemo(() => gg(_, m), [_, m]),
    Y = Ag(_);
  return A.createElement(
    A.Fragment,
    null,
    M.map((B) => A.createElement('link', { key: B, rel: 'prefetch', as: 'fetch', href: B, ...f })),
    G.map((B) => A.createElement('link', { key: B, rel: 'modulepreload', href: B, ...f })),
    Y.map(({ key: B, link: j }) =>
      A.createElement('link', {
        key: B,
        nonce: f.nonce,
        ...j,
        crossOrigin: j.crossOrigin ?? f.crossOrigin,
      })
    )
  );
}
function Cg(...u) {
  return (c) => {
    u.forEach((f) => {
      typeof f == 'function' ? f(c) : f != null && (f.current = c);
    });
  };
}
var Rg =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
try {
  Rg && (window.__reactRouterVersion = '7.14.2');
} catch {}
function zg({ basename: u, children: c, unstable_useTransitions: f, window: s }) {
  let r = A.useRef();
  r.current == null && (r.current = o0({ window: s, v5Compat: !0 }));
  let m = r.current,
    [v, p] = A.useState({ action: m.action, location: m.location }),
    h = A.useCallback(
      (y) => {
        f === !1 ? p(y) : A.startTransition(() => p(y));
      },
      [f]
    );
  return (
    A.useLayoutEffect(() => m.listen(h), [m, h]),
    A.createElement(ug, {
      basename: u,
      children: c,
      location: v.location,
      navigationType: v.action,
      navigator: m,
      unstable_useTransitions: f,
    })
  );
}
var ay = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  ny = A.forwardRef(function (
    {
      onClick: c,
      discover: f = 'render',
      prefetch: s = 'none',
      relative: r,
      reloadDocument: m,
      replace: v,
      unstable_mask: p,
      state: h,
      target: y,
      to: T,
      preventScrollReset: _,
      viewTransition: M,
      unstable_defaultShouldRevalidate: G,
      ...Y
    },
    B
  ) {
    let { basename: j, navigator: O, unstable_useTransitions: X } = A.useContext(Te),
      q = typeof T == 'string' && ay.test(T),
      Q = Zh(T, j);
    T = Q.to;
    let I = Q0(T, { relative: r }),
      J = Ve(),
      K = null;
    if (p) {
      let jt = Qi(p, [], J.unstable_mask ? J.unstable_mask.pathname : '/', !0);
      (j !== '/' && (jt.pathname = jt.pathname === '/' ? j : He([j, jt.pathname])),
        (K = O.createHref(jt)));
    }
    let [lt, ht, _t] = Tg(s, Y),
      Ot = Ug(T, {
        replace: v,
        unstable_mask: p,
        state: h,
        target: y,
        preventScrollReset: _,
        relative: r,
        viewTransition: M,
        unstable_defaultShouldRevalidate: G,
        unstable_useTransitions: X,
      });
    function Vt(jt) {
      (c && c(jt), jt.defaultPrevented || Ot(jt));
    }
    let de = !(Q.isExternal || m),
      ne = A.createElement('a', {
        ...Y,
        ..._t,
        href: (de ? K : void 0) || Q.absoluteURL || I,
        onClick: de ? Vt : c,
        ref: Cg(B, ht),
        target: y,
        'data-discover': !q && f === 'render' ? 'true' : void 0,
      });
    return lt && !q ? A.createElement(A.Fragment, null, ne, A.createElement(xg, { page: I })) : ne;
  });
ny.displayName = 'Link';
var Dg = A.forwardRef(function (
  {
    'aria-current': c = 'page',
    caseSensitive: f = !1,
    className: s = '',
    end: r = !1,
    style: m,
    to: v,
    viewTransition: p,
    children: h,
    ...y
  },
  T
) {
  let _ = mu(v, { relative: y.relative }),
    M = Ve(),
    G = A.useContext(Vi),
    { navigator: Y, basename: B } = A.useContext(Te),
    j = G != null && Lg(_) && p === !0,
    O = Y.encodeLocation ? Y.encodeLocation(_).pathname : _.pathname,
    X = M.pathname,
    q = G && G.navigation && G.navigation.location ? G.navigation.location.pathname : null;
  (f || ((X = X.toLowerCase()), (q = q ? q.toLowerCase() : null), (O = O.toLowerCase())),
    q && B && (q = dl(q, B) || q));
  const Q = O !== '/' && O.endsWith('/') ? O.length - 1 : O.length;
  let I = X === O || (!r && X.startsWith(O) && X.charAt(Q) === '/'),
    J = q != null && (q === O || (!r && q.startsWith(O) && q.charAt(O.length) === '/')),
    K = { isActive: I, isPending: J, isTransitioning: j },
    lt = I ? c : void 0,
    ht;
  typeof s == 'function'
    ? (ht = s(K))
    : (ht = [s, I ? 'active' : null, J ? 'pending' : null, j ? 'transitioning' : null]
        .filter(Boolean)
        .join(' '));
  let _t = typeof m == 'function' ? m(K) : m;
  return A.createElement(
    ny,
    { ...y, 'aria-current': lt, className: ht, ref: T, style: _t, to: v, viewTransition: p },
    typeof h == 'function' ? h(K) : h
  );
});
Dg.displayName = 'NavLink';
var Og = A.forwardRef(
  (
    {
      discover: u = 'render',
      fetcherKey: c,
      navigate: f,
      reloadDocument: s,
      replace: r,
      state: m,
      method: v = Bi,
      action: p,
      onSubmit: h,
      relative: y,
      preventScrollReset: T,
      viewTransition: _,
      unstable_defaultShouldRevalidate: M,
      ...G
    },
    Y
  ) => {
    let { unstable_useTransitions: B } = A.useContext(Te),
      j = kg(),
      O = Hg(p, { relative: y }),
      X = v.toLowerCase() === 'get' ? 'get' : 'post',
      q = typeof p == 'string' && ay.test(p),
      Q = (I) => {
        if ((h && h(I), I.defaultPrevented)) return;
        I.preventDefault();
        let J = I.nativeEvent.submitter,
          K = (J == null ? void 0 : J.getAttribute('formmethod')) || v,
          lt = () =>
            j(J || I.currentTarget, {
              fetcherKey: c,
              method: K,
              navigate: f,
              replace: r,
              state: m,
              relative: y,
              preventScrollReset: T,
              viewTransition: _,
              unstable_defaultShouldRevalidate: M,
            });
        B && f !== !1 ? A.startTransition(() => lt()) : lt();
      };
    return A.createElement('form', {
      ref: Y,
      method: X,
      action: O,
      onSubmit: s ? h : Q,
      ...G,
      'data-discover': !q && u === 'render' ? 'true' : void 0,
    });
  }
);
Og.displayName = 'Form';
function jg(u) {
  return `${u} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function uy(u) {
  let c = A.useContext(nn);
  return (Dt(c, jg(u)), c);
}
function Ug(
  u,
  {
    target: c,
    replace: f,
    unstable_mask: s,
    state: r,
    preventScrollReset: m,
    relative: v,
    viewTransition: p,
    unstable_defaultShouldRevalidate: h,
    unstable_useTransitions: y,
  } = {}
) {
  let T = oa(),
    _ = Ve(),
    M = mu(u, { relative: v });
  return A.useCallback(
    (G) => {
      if (rg(G, c)) {
        G.preventDefault();
        let Y = f !== void 0 ? f : ou(_) === ou(M),
          B = () =>
            T(u, {
              replace: Y,
              unstable_mask: s,
              state: r,
              preventScrollReset: m,
              relative: v,
              viewTransition: p,
              unstable_defaultShouldRevalidate: h,
            });
        y ? A.startTransition(() => B()) : B();
      }
    },
    [_, T, M, f, s, r, c, u, m, v, p, h, y]
  );
}
var wg = 0,
  Bg = () => `__${String(++wg)}__`;
function kg() {
  let { router: u } = uy('useSubmit'),
    { basename: c } = A.useContext(Te),
    f = eg(),
    s = u.fetch,
    r = u.navigate;
  return A.useCallback(
    async (m, v = {}) => {
      let { action: p, method: h, encType: y, formData: T, body: _ } = hg(m, c);
      if (v.navigate === !1) {
        let M = v.fetcherKey || Bg();
        await s(M, f, v.action || p, {
          unstable_defaultShouldRevalidate: v.unstable_defaultShouldRevalidate,
          preventScrollReset: v.preventScrollReset,
          formData: T,
          body: _,
          formMethod: v.method || h,
          formEncType: v.encType || y,
          flushSync: v.flushSync,
        });
      } else
        await r(v.action || p, {
          unstable_defaultShouldRevalidate: v.unstable_defaultShouldRevalidate,
          preventScrollReset: v.preventScrollReset,
          formData: T,
          body: _,
          formMethod: v.method || h,
          formEncType: v.encType || y,
          replace: v.replace,
          state: v.state,
          fromRouteId: f,
          flushSync: v.flushSync,
          viewTransition: v.viewTransition,
        });
    },
    [s, r, c, f]
  );
}
function Hg(u, { relative: c } = {}) {
  let { basename: f } = A.useContext(Te),
    s = A.useContext(Qe);
  Dt(s, 'useFormAction must be used inside a RouteContext');
  let [r] = s.matches.slice(-1),
    m = { ...mu(u || '.', { relative: c }) },
    v = Ve();
  if (u == null) {
    m.search = v.search;
    let p = new URLSearchParams(m.search),
      h = p.getAll('index');
    if (h.some((T) => T === '')) {
      (p.delete('index'), h.filter((_) => _).forEach((_) => p.append('index', _)));
      let T = p.toString();
      m.search = T ? `?${T}` : '';
    }
  }
  return (
    (!u || u === '.') &&
      r.route.index &&
      (m.search = m.search ? m.search.replace(/^\?/, '?index&') : '?index'),
    f !== '/' && (m.pathname = m.pathname === '/' ? f : He([f, m.pathname])),
    ou(m)
  );
}
function Lg(u, { relative: c } = {}) {
  let f = A.useContext($h);
  Dt(
    f != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = uy('useViewTransitionState'),
    r = mu(u, { relative: c });
  if (!f.isTransitioning) return !1;
  let m = dl(f.currentLocation.pathname, s) || f.currentLocation.pathname,
    v = dl(f.nextLocation.pathname, s) || f.nextLocation.pathname;
  return Li(r.pathname, v) != null || Li(r.pathname, m) != null;
}
const qg = '_layout_apkdr_1',
  Gg = '_enemies_apkdr_12',
  Yg = '_enemy_apkdr_20',
  Xg = '_targeted_apkdr_35',
  Qg = '_enemyName_apkdr_39',
  Vg = '_down_apkdr_44',
  Zg = '_log_apkdr_48',
  Kg = '_logLine_apkdr_60',
  Jg = '_party_apkdr_64',
  $g = '_rowTag_apkdr_71',
  Wg = '_cardRow_apkdr_77',
  Fg = '_card_apkdr_77',
  Ig = '_cardActive_apkdr_99',
  Pg = '_cardDecided_apkdr_104',
  t1 = '_cardName_apkdr_108',
  e1 = '_uni_apkdr_116',
  l1 = '_cardNums_apkdr_120',
  a1 = '_cardCmd_apkdr_126',
  n1 = '_empty_apkdr_132',
  u1 = '_command_apkdr_137',
  i1 = '_skillList_apkdr_143',
  c1 = '_skillBtn_apkdr_149',
  s1 = '_skillTop_apkdr_161',
  f1 = '_skillName_apkdr_168',
  o1 = '_skillDesc_apkdr_173',
  r1 = '_target_apkdr_35',
  d1 = '_cmdHead_apkdr_184',
  m1 = '_menu_apkdr_189',
  h1 = '_menuBtn_apkdr_195',
  y1 = '_tp_apkdr_212',
  p1 = '_menuBack_apkdr_218',
  v1 = '_execRow_apkdr_228',
  g1 = '_redo_apkdr_233',
  _1 = '_primary_apkdr_243',
  b1 = '_result_apkdr_258',
  S1 = '_resultTitle_apkdr_269',
  E1 = '_resultBody_apkdr_274',
  et = {
    layout: qg,
    enemies: Gg,
    enemy: Yg,
    targeted: Xg,
    enemyName: Qg,
    down: Vg,
    log: Zg,
    logLine: Kg,
    party: Jg,
    rowTag: $g,
    cardRow: Wg,
    card: Fg,
    cardActive: Ig,
    cardDecided: Pg,
    cardName: t1,
    uni: e1,
    cardNums: l1,
    cardCmd: a1,
    empty: n1,
    command: u1,
    skillList: i1,
    skillBtn: c1,
    skillTop: s1,
    skillName: f1,
    skillDesc: o1,
    target: r1,
    cmdHead: d1,
    menu: m1,
    menuBtn: h1,
    tp: y1,
    menuBack: p1,
    execRow: v1,
    redo: g1,
    primary: _1,
    result: b1,
    resultTitle: S1,
    resultBody: E1,
  },
  T1 = '_row_1t6j7_1',
  x1 = '_label_1t6j7_8',
  A1 = '_track_1t6j7_16',
  M1 = '_fill_1t6j7_24',
  N1 = '_value_1t6j7_30',
  uu = { row: T1, label: x1, track: A1, fill: M1, value: N1 },
  Tf = ({ value: u, max: c, color: f = '#4caf50', label: s, showValue: r = !0 }) => {
    const m = c > 0 ? Math.max(0, Math.min(100, (u / c) * 100)) : 0;
    return E.jsxs('div', {
      className: uu.row,
      children: [
        s ? E.jsx('span', { className: uu.label, children: s }) : null,
        E.jsx('div', {
          className: uu.track,
          children: E.jsx('div', {
            className: uu.fill,
            style: { width: `${m}%`, backgroundColor: f },
          }),
        }),
        r
          ? E.jsxs('span', {
              className: uu.value,
              children: [Math.max(0, Math.round(u)), '/', Math.round(c)],
            })
          : null,
      ],
    });
  },
  Fa = {
    skill_power_slash: {
      id: 'skill_power_slash',
      name: 'パワースラッシュ',
      tree: 'base',
      tpCost: (u) => 3 + u,
      element: 'slash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (u) => 1.4 + 0.2 * u }],
    },
    skill_guard_stance: {
      id: 'skill_guard_stance',
      name: 'ガードスタンス',
      tree: 'base',
      tpCost: () => 4,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'buff',
          stat: 'pdef',
          modifier: (u) => 1.2 + 0.05 * u,
          turns: 3,
          stackGroup: 'defBuff',
        },
      ],
    },
    skill_shield_bash: {
      id: 'skill_shield_bash',
      name: 'シールドバッシュ',
      tree: 'base',
      tpCost: (u) => 3 + u,
      element: 'bash',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (u) => 1 + 0.15 * u },
        { kind: 'ailment', ailment: 'paralysis', chance: (u) => 0.2 + 0.05 * u, turns: 2 },
      ],
    },
    skill_provoke: {
      id: 'skill_provoke',
      name: '挑発',
      tree: 'base',
      tpCost: () => 3,
      element: 'almighty',
      target: 'self',
      effects: [
        { kind: 'buff', stat: 'pdef', modifier: () => 1.3, turns: 2, stackGroup: 'defBuff' },
      ],
    },
    skill_fire_bolt: {
      id: 'skill_fire_bolt',
      name: 'ファイアボルト',
      tree: 'base',
      tpCost: (u) => 4 + u,
      element: 'fire',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (u) => 1.5 + 0.25 * u }],
    },
    skill_ice_bolt: {
      id: 'skill_ice_bolt',
      name: 'アイスボルト',
      tree: 'base',
      tpCost: (u) => 4 + u,
      element: 'ice',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (u) => 1.5 + 0.25 * u }],
    },
    skill_aimed_shot: {
      id: 'skill_aimed_shot',
      name: '狙撃',
      tree: 'base',
      tpCost: (u) => 3 + u,
      element: 'pierce',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (u) => 1.3 + 0.2 * u }],
    },
    skill_spread_shot: {
      id: 'skill_spread_shot',
      name: '拡散射撃',
      tree: 'base',
      tpCost: (u) => 5 + u,
      element: 'pierce',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (u) => 0.8 + 0.12 * u }],
    },
    skill_union_rally: {
      id: 'skill_union_rally',
      name: 'ラリー',
      tree: 'race',
      tpCost: () => 0,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'heal', amount: (u) => 10 + 5 * u }],
    },
  },
  iy = {
    skill_power_slash: {
      id: 'skill_power_slash',
      name: 'パワースラッシュ',
      description: '単体に強力な斬撃。',
    },
    skill_guard_stance: {
      id: 'skill_guard_stance',
      name: 'ガードスタンス',
      description: '物理防御を一時的に高める。',
    },
    skill_shield_bash: {
      id: 'skill_shield_bash',
      name: 'シールドバッシュ',
      description: '盾で殴り行動を遅延させる。',
    },
    skill_provoke: {
      id: 'skill_provoke',
      name: '挑発',
      description: '敵の攻撃を自身へ引きつける。',
    },
    skill_fire_bolt: {
      id: 'skill_fire_bolt',
      name: 'ファイアボルト',
      description: '単体に火属性魔法ダメージ。',
    },
    skill_ice_bolt: {
      id: 'skill_ice_bolt',
      name: 'アイスボルト',
      description: '単体に氷属性魔法ダメージ。',
    },
    skill_aimed_shot: {
      id: 'skill_aimed_shot',
      name: '狙撃',
      description: '命中とクリティカルに優れた射撃。',
    },
    skill_spread_shot: {
      id: 'skill_spread_shot',
      name: '拡散射撃',
      description: '敵1列に射撃ダメージ。',
    },
    skill_union_rally: {
      id: 'skill_union_rally',
      name: 'ラリー',
      description: '味方全体を鼓舞するユニオンスキル。',
    },
  },
  Nt = {
    LEVEL_CAP: 100,
    BOSS_INTERVAL: 10,
    ENEMY_SCALE_K: 0.06,
    EXP_CURVE_BASE: 20,
    EXP_CURVE_POW: 1.6,
    SP_PER_LEVEL: 3,
    DAMAGE_DEF_K: 100,
    CRIT_MULT: 1.5,
    BACK_ROW_MELEE_MULT: 0.7,
    DMG_VARIANCE: [0.95, 1.05],
    BASE_HIT: 0.9,
    HIT_AGI_K: 0.01,
    HIT_MIN: 0.3,
    BLIND_ACC_PENALTY: 0.5,
    CRIT_BASE: 0.05,
    CRIT_LUC_K: 0.005,
    CRIT_MIN: 0.02,
    CRIT_MAX: 0.5,
    AILMENT_LUC_K: 0.01,
    AILMENT_MAX: 0.95,
    PARALYSIS_SKIP: 0.3,
    POISON_HP_RATIO: 0.05,
    TP_REGEN_RATIO: 0.05,
    UNION_GAIN_ON_WIN: 15,
  },
  C1 = 500,
  Of = 30,
  R1 = 3,
  z1 = 2,
  Wf = (u) => u > 0 && u % Nt.BOSS_INTERVAL === 0,
  Th = (u) => Math.round(Nt.EXP_CURVE_BASE * Math.pow(u, Nt.EXP_CURVE_POW)),
  xf = (u) => u < Nt.LEVEL_CAP,
  cy = (u, c) => 1 + Nt.ENEMY_SCALE_K * (u - c),
  hu = {
    enemy_slime: {
      id: 'enemy_slime',
      name: 'スライム',
      baseStats: { hp: 18, tp: 0, str: 5, vit: 4, agi: 4, int: 2, mnd: 3, luc: 3 },
      refDepth: 1,
      tierBand: 0,
      exp: 6,
      gold: 4,
      attackElement: 'bash',
      resist: { fire: 1.5, ice: 0.5 },
    },
    enemy_giant_rat: {
      id: 'enemy_giant_rat',
      name: 'おおねずみ',
      baseStats: { hp: 14, tp: 0, str: 6, vit: 3, agi: 7, int: 2, mnd: 2, luc: 4 },
      refDepth: 1,
      tierBand: 0,
      exp: 5,
      gold: 5,
      attackElement: 'slash',
    },
    enemy_cave_bat: {
      id: 'enemy_cave_bat',
      name: 'どうくつコウモリ',
      baseStats: { hp: 12, tp: 0, str: 5, vit: 2, agi: 9, int: 3, mnd: 2, luc: 5 },
      refDepth: 1,
      tierBand: 0,
      exp: 5,
      gold: 3,
      attackElement: 'pierce',
      resist: { volt: 1.5 },
    },
    enemy_boss_gatekeeper: {
      id: 'enemy_boss_gatekeeper',
      name: '門番のゴーレム',
      baseStats: { hp: 220, tp: 0, str: 18, vit: 16, agi: 6, int: 4, mnd: 10, luc: 6 },
      refDepth: 10,
      tierBand: 0,
      exp: 120,
      gold: 200,
      attackElement: 'bash',
      resist: { slash: 0.5, pierce: 0.5, ice: 1.5 },
    },
  },
  sy = {
    equip_short_sword: {
      id: 'equip_short_sword',
      name: 'ショートソード',
      slot: 'weapon',
      weaponType: 'sword',
      bonuses: { atk: 6 },
    },
    equip_iron_spear: {
      id: 'equip_iron_spear',
      name: '鉄の槍',
      slot: 'weapon',
      weaponType: 'spear',
      bonuses: { atk: 7 },
    },
    equip_oak_staff: {
      id: 'equip_oak_staff',
      name: '樫の杖',
      slot: 'weapon',
      weaponType: 'staff',
      bonuses: { mat: 7 },
    },
    equip_short_bow: {
      id: 'equip_short_bow',
      name: 'ショートボウ',
      slot: 'weapon',
      weaponType: 'bow',
      bonuses: { atk: 5 },
    },
    equip_leather_armor: {
      id: 'equip_leather_armor',
      name: 'レザーアーマー',
      slot: 'armor',
      armorType: 'light',
      bonuses: { def: 5 },
    },
    equip_iron_armor: {
      id: 'equip_iron_armor',
      name: '鉄の鎧',
      slot: 'armor',
      armorType: 'heavy',
      bonuses: { def: 8 },
    },
    equip_cloth_robe: {
      id: 'equip_cloth_robe',
      name: '布のローブ',
      slot: 'armor',
      armorType: 'clothes',
      bonuses: { def: 2, mdf: 4 },
    },
  },
  D1 = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'],
  O1 = ['slash', 'pierce', 'bash'],
  Gi = (u, c, f) => Math.max(c, Math.min(f, u));
function j1(u, c) {
  const f = {};
  for (const s of D1) f[s] = Math.round(u[s] * c);
  return f;
}
function U1(u, c) {
  return j1(u.baseStats, cy(c, u.refDepth));
}
function $a(u, c) {
  const f = new Map();
  for (const r of u) {
    if (r.stat !== c) continue;
    const m = Gi(r.modifier, 0.5, 1.5),
      v = f.get(r.stackGroup);
    (v === void 0 || Math.abs(m - 1) > Math.abs(v - 1)) && f.set(r.stackGroup, m);
  }
  let s = 1;
  for (const r of f.values()) s *= r;
  return Gi(s, 0.25, 2);
}
function xh(u, c, f) {
  const s = (u.str * 2 + (c.atk ?? 0)) * $a(f, 'patk'),
    r = (u.vit * 2 + (c.def ?? 0)) * $a(f, 'pdef'),
    m = (u.int * 2 + (c.mat ?? 0)) * $a(f, 'matk'),
    v = (u.mnd * 2 + (c.mdf ?? 0)) * $a(f, 'mdef');
  return {
    patk: s,
    pdef: r,
    matk: m,
    mdef: v,
    hit: u.agi,
    acc: u.agi * $a(f, 'acc'),
    eva: u.agi * $a(f, 'eva'),
    crit: u.luc,
  };
}
const w1 = (u) => u.ailments.some((c) => c.type === 'blind');
function fy(u, c, f, s) {
  const r = f.statBase === 'str',
    m = xh(u.stats, u.equip, u.buffs),
    v = xh(c.stats, c.equip, c.buffs),
    p = r ? m.patk : m.matk,
    h = r ? v.pdef : v.mdef;
  let y = !0;
  if (r) {
    const K = w1(u) ? Nt.BLIND_ACC_PENALTY : 0,
      lt = Gi(Nt.BASE_HIT + (m.acc - v.eva) * Nt.HIT_AGI_K - K, Nt.HIT_MIN, 1);
    y = s.next() < lt;
  }
  if (!y) return { damage: 0, hit: !1, critical: !1 };
  const _ = (p * f.power * Nt.DAMAGE_DEF_K) / (Nt.DAMAGE_DEF_K + Math.max(0, h)),
    M = r && O1.includes(f.element),
    G = M && u.row === 'back' ? Nt.BACK_ROW_MELEE_MULT : 1,
    Y = M && c.row === 'back' ? Nt.BACK_ROW_MELEE_MULT : 1,
    B = G * Y,
    [j, O] = Nt.DMG_VARIANCE,
    X = j + s.next() * (O - j);
  let q = _ * f.elementMultiplier * B * X;
  const Q = Gi(
      Nt.CRIT_BASE + (u.stats.luc - c.stats.luc) * Nt.CRIT_LUC_K,
      Nt.CRIT_MIN,
      Nt.CRIT_MAX
    ),
    I = s.next() < Q;
  return (
    I && (q *= Nt.CRIT_MULT),
    { damage: f.elementMultiplier === 0 ? 0 : Math.max(1, Math.floor(q)), hit: !0, critical: I }
  );
}
const Ia = {
    race_human: {
      id: 'race_human',
      name: 'ヒト',
      baseStatsAtLv1: { hp: 40, tp: 20, str: 8, vit: 8, agi: 8, int: 8, mnd: 8, luc: 8 },
      statGrowth: { hp: 8, tp: 4, str: 2, vit: 2, agi: 2, int: 2, mnd: 2, luc: 2 },
      unionSkillTree: { skills: [{ skillId: 'skill_union_rally', maxLevel: 3 }] },
      defaultClassId: 'class_warrior',
    },
    race_garon: {
      id: 'race_garon',
      name: 'ガロン',
      baseStatsAtLv1: { hp: 55, tp: 12, str: 11, vit: 11, agi: 5, int: 4, mnd: 6, luc: 6 },
      statGrowth: { hp: 12, tp: 2, str: 3, vit: 3, agi: 1, int: 1, mnd: 2, luc: 2 },
      unionSkillTree: { skills: [{ skillId: 'skill_union_rally', maxLevel: 3 }] },
      defaultClassId: 'class_guardian',
    },
    race_pix: {
      id: 'race_pix',
      name: 'ピクス',
      baseStatsAtLv1: { hp: 28, tp: 32, str: 4, vit: 5, agi: 9, int: 12, mnd: 11, luc: 7 },
      statGrowth: { hp: 5, tp: 7, str: 1, vit: 1, agi: 2, int: 3, mnd: 3, luc: 2 },
      unionSkillTree: { skills: [{ skillId: 'skill_union_rally', maxLevel: 3 }] },
      defaultClassId: 'class_mage',
    },
    race_therian: {
      id: 'race_therian',
      name: 'テリアン',
      baseStatsAtLv1: { hp: 38, tp: 18, str: 9, vit: 7, agi: 11, int: 6, mnd: 6, luc: 9 },
      statGrowth: { hp: 7, tp: 3, str: 2, vit: 2, agi: 3, int: 1, mnd: 1, luc: 3 },
      unionSkillTree: { skills: [{ skillId: 'skill_union_rally', maxLevel: 3 }] },
      defaultClassId: 'class_ranger',
    },
  },
  Hl = (u) => ({ hp: 0, tp: 0, str: 0, vit: 0, agi: 0, int: 0, mnd: 0, luc: 0, ...u }),
  oy = {
    title_berserker: {
      id: 'title_berserker',
      name: '狂戦士',
      parentClassId: 'class_warrior',
      skillTree: { skills: [] },
      growthModifier: Hl({ str: 1 }),
    },
    title_sentinel: {
      id: 'title_sentinel',
      name: '哨戒兵',
      parentClassId: 'class_warrior',
      skillTree: { skills: [] },
      growthModifier: Hl({ vit: 1 }),
    },
    title_bulwark: {
      id: 'title_bulwark',
      name: '城壁',
      parentClassId: 'class_guardian',
      skillTree: { skills: [] },
      growthModifier: Hl({ vit: 1, hp: 2 }),
    },
    title_vanguard: {
      id: 'title_vanguard',
      name: '先鋒',
      parentClassId: 'class_guardian',
      skillTree: { skills: [] },
      growthModifier: Hl({ str: 1 }),
    },
    title_pyromancer: {
      id: 'title_pyromancer',
      name: '紅蓮術士',
      parentClassId: 'class_mage',
      skillTree: { skills: [] },
      growthModifier: Hl({ int: 1 }),
    },
    title_sage: {
      id: 'title_sage',
      name: '賢者',
      parentClassId: 'class_mage',
      skillTree: { skills: [] },
      growthModifier: Hl({ tp: 2, mnd: 1 }),
    },
    title_sniper: {
      id: 'title_sniper',
      name: '狙撃手',
      parentClassId: 'class_ranger',
      skillTree: { skills: [] },
      growthModifier: Hl({ agi: 1, luc: 1 }),
    },
    title_tracker: {
      id: 'title_tracker',
      name: '追跡者',
      parentClassId: 'class_ranger',
      skillTree: { skills: [] },
      growthModifier: Hl({ agi: 1 }),
    },
  },
  B1 = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];
function ry(u) {
  var p, h;
  const c = Ia[u.raceId];
  if (!c) throw new Error(`computeBaseStats: 未定義の種族 "${u.raceId}"`);
  const s = Math.max(1, Math.min(u.level, Nt.LEVEL_CAP)) - 1,
    r = u.titleId ? ((p = oy[u.titleId]) == null ? void 0 : p.growthModifier) : void 0,
    m = ((h = u.rebirthBonus) == null ? void 0 : h.allStats) ?? 0,
    v = {};
  for (const y of B1) {
    const T = c.statGrowth[y] + ((r == null ? void 0 : r[y]) ?? 0);
    v[y] = c.baseStatsAtLv1[y] + T * s + m;
  }
  return v;
}
const cn = (u, c, f) => Math.max(c, Math.min(f, u));
function k1(u) {
  const c = { atk: 0, mat: 0, def: 0, mdf: 0 };
  for (const f of Object.values(u.equipment)) {
    if (!f) continue;
    const s = sy[f];
    s &&
      ((c.atk += s.bonuses.atk ?? 0),
      (c.mat += s.bonuses.mat ?? 0),
      (c.def += s.bonuses.def ?? 0),
      (c.mdf += s.bonuses.mdf ?? 0));
  }
  return c;
}
function H1(u, c) {
  var v;
  const f = u.guild.members.find((p) => p.id === c);
  if (!f) return null;
  const s = (v = u.diveState) == null ? void 0 : v.party.find((p) => p.charId === c),
    r = ry(f),
    m = u.guild.party.front.includes(c);
  return {
    id: c,
    name: f.name,
    side: 'ally',
    row: m ? 'front' : 'back',
    stats: r,
    equip: k1(f),
    hp: s ? s.hp : r.hp,
    maxHp: r.hp,
    tp: s ? s.tp : r.tp,
    maxTp: r.tp,
    buffs: [],
    ailments: s ? [...s.ailments] : [],
    unionGauge: (s == null ? void 0 : s.unionGauge) ?? 0,
    isDown: s ? s.hp <= 0 : !1,
  };
}
function L1(u, c, f) {
  const s = hu[u],
    r = U1(s, f);
  return {
    id: `enemy_${c}`,
    name: s.name,
    side: 'enemy',
    row: 'front',
    stats: r,
    equip: {},
    hp: r.hp,
    maxHp: r.hp,
    tp: r.tp,
    maxTp: r.tp,
    buffs: [],
    ailments: [],
    unionGauge: 0,
    isDown: !1,
    enemyId: u,
    resist: s.resist,
  };
}
function q1(u, c) {
  var v;
  const f = ((v = u.diveState) == null ? void 0 : v.depth) ?? 1,
    r = [...u.guild.party.front, ...u.guild.party.back]
      .filter((p) => p !== null)
      .map((p) => H1(u, p))
      .filter((p) => p !== null),
    m = c.map((p, h) => L1(p, h, f));
  return { turn: 1, depth: f, allies: r, enemies: m, log: [], outcome: 'ongoing' };
}
const Ue = (u, c) => (c === 'ally' ? u.allies : u.enemies).filter((f) => !f.isDown);
function su(u, c) {
  return u.allies.find((f) => f.id === c) ?? u.enemies.find((f) => f.id === c);
}
const dy = (u, c) => {
  var f;
  return ((f = u.resist) == null ? void 0 : f[c]) ?? 1;
};
function Ff(u, c, f) {
  ((u.hp = cn(u.hp - c, 0, u.maxHp)),
    u.hp === 0 &&
      !u.isDown &&
      ((u.isDown = !0),
      (u.unionGauge = Math.floor(u.unionGauge / 2)),
      f.push({ text: `${u.name} は倒れた！` })));
}
function Yi(u, c) {
  u.isDown || (u.unionGauge = cn(u.unionGauge + c, 0, 100));
}
function jf(u, c) {
  ((u.buffs = u.buffs.filter((f) => !(f.stat === c.stat && f.stackGroup === c.stackGroup))),
    u.buffs.push(c));
}
function G1(u, c) {
  const f = u.ailments.find((s) => s.type === c.type);
  if (f) {
    f.remainingTurns = Math.max(f.remainingTurns, c.remainingTurns);
    return;
  }
  u.ailments.push(c);
}
function Y1(u, c, f) {
  return cn(u * (1 + (c.stats.luc - f.stats.luc) * Nt.AILMENT_LUC_K), 0, Nt.AILMENT_MAX);
}
function X1(u, c, f, s) {
  switch (f.target) {
    case 'self':
      return [c];
    case 'allyAll':
      return Ue(u, c.side);
    case 'allyOne': {
      const r = su(u, s);
      return r ? [r] : [];
    }
    case 'enemyAll':
      return Ue(u, c.side === 'ally' ? 'enemy' : 'ally');
    case 'enemyRow':
    case 'enemyOne':
    default: {
      const r = su(u, s);
      return r ? [r] : [];
    }
  }
}
function Q1(u, c, f, s, r, m, v) {
  switch (f.kind) {
    case 'damage': {
      const p = f.hits ?? 1;
      for (const h of m)
        if (!h.isDown)
          for (let y = 0; y < p; y++) {
            const T = fy(
              c,
              h,
              { statBase: f.statBase, power: f.power(r), element: s, elementMultiplier: dy(h, s) },
              v
            );
            T.hit
              ? (Ff(h, T.damage, u.log),
                Yi(h, 5),
                u.log.push({
                  text: `${c.name} の攻撃！ ${h.name} に ${T.damage} ダメージ${T.critical ? '（会心）' : ''}`,
                }))
              : u.log.push({ text: `${c.name} の攻撃は外れた` });
          }
      break;
    }
    case 'heal': {
      const p = f.amount(r);
      for (const h of m) h.isDown || (h.hp = cn(h.hp + p, 0, h.maxHp));
      u.log.push({ text: `${c.name} は回復魔法を使った（+${p}）` });
      break;
    }
    case 'buff': {
      for (const p of m)
        jf(p, {
          stat: f.stat,
          modifier: f.modifier(r),
          remainingTurns: f.turns,
          stackGroup: f.stackGroup,
        });
      u.log.push({ text: `${c.name} は態勢を整えた` });
      break;
    }
    case 'ailment': {
      for (const p of m) {
        if (p.isDown) continue;
        const h = Y1(f.chance(r), c, p);
        v.next() < h &&
          (G1(p, { type: f.ailment, remainingTurns: f.turns, magnitude: f.magnitude }),
          u.log.push({ text: `${p.name} は${f.ailment}になった` }));
      }
      break;
    }
  }
}
function Ah(u, c, f, s) {
  if (f.isDown) return;
  const r = c.enemyId ? (hu[c.enemyId].attackElement ?? 'bash') : 'bash',
    m = fy(c, f, { statBase: 'str', power: 1, element: r, elementMultiplier: dy(f, r) }, s);
  m.hit
    ? (Ff(f, m.damage, u.log),
      Yi(c, 5),
      Yi(f, 5),
      u.log.push({
        text: `${c.name} の攻撃！ ${f.name} に ${m.damage} ダメージ${m.critical ? '（会心）' : ''}`,
      }))
    : u.log.push({ text: `${c.name} の攻撃は外れた` });
}
const Mh = (u) => (u.length === 0 ? 0 : u.reduce((c, f) => c + f.stats.agi, 0) / u.length),
  V1 = (u) => u.ailments.some((c) => c.type === 'paralysis');
function Nh(u, c, f) {
  if (u.outcome !== 'ongoing') return u;
  const s = structuredClone({ ...u, log: [] }),
    r = new Map(c.map((p) => [p.actorId, p]));
  if (c.some((p) => p.kind === 'flee')) {
    const p = cn(0.5 + (Mh(Ue(s, 'ally')) - Mh(Ue(s, 'enemy'))) * 0.02, 0.1, 0.95);
    if (f.next() < p) return (s.log.push({ text: 'うまく逃げ切れた！' }), (s.outcome = 'fled'), s);
    s.log.push({ text: '逃げられなかった！' });
  }
  for (const p of c) {
    if (p.kind !== 'guard') continue;
    const h = su(s, p.actorId);
    !h ||
      h.isDown ||
      (jf(h, { stat: 'pdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }),
      jf(h, { stat: 'mdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }));
  }
  const m = new Map();
  for (const p of Ue(s, 'enemy')) {
    const h = Ue(s, 'ally');
    h.length > 0 && m.set(p.id, f.pick(h).id);
  }
  const v = [...s.allies, ...s.enemies]
    .filter((p) => !p.isDown)
    .map((p) => ({ c: p, agi: p.stats.agi, tie: f.next() }))
    .sort((p, h) => h.agi - p.agi || h.tie - p.tie)
    .map((p) => p.c);
  for (const p of v)
    if (!p.isDown) {
      if (s.outcome !== 'ongoing') break;
      if (V1(p) && f.next() < Nt.PARALYSIS_SKIP) {
        s.log.push({ text: `${p.name} は麻痺で動けない` });
        continue;
      }
      if (p.side === 'enemy') {
        const h = m.get(p.id),
          y = h ? su(s, h) : void 0,
          T = y && !y.isDown ? y : Ue(s, 'ally')[0];
        T && Ah(s, p, T, f);
      } else {
        const h = r.get(p.id);
        if (!h || h.kind === 'guard' || h.kind === 'flee') continue;
        if (h.kind === 'attack') {
          const y = su(s, h.targetId),
            T = y && !y.isDown ? y : Ue(s, 'enemy')[0];
          T && Ah(s, p, T, f);
        } else if (h.kind === 'skill') {
          const y = Fa[h.skillId];
          if (!y) continue;
          const T = 1,
            _ = y.tpCost(T);
          if (p.tp < _) {
            s.log.push({ text: `${p.name} は TP が足りない` });
            continue;
          }
          ((p.tp -= _), Yi(p, 10));
          const M = X1(s, p, y, h.targetId);
          for (const G of y.effects) Q1(s, p, G, y.element, T, M, f);
        }
      }
      if (Ue(s, 'enemy').length === 0 || Ue(s, 'ally').length === 0) break;
    }
  for (const p of [...s.allies, ...s.enemies]) {
    if (p.isDown) continue;
    const h = p.ailments.find((y) => y.type === 'poison');
    if (h) {
      const y = h.magnitude ?? Math.max(1, Math.floor(p.maxHp * Nt.POISON_HP_RATIO));
      (Ff(p, y, s.log), s.log.push({ text: `${p.name} は毒で ${y} のダメージ` }));
    }
  }
  for (const p of [...s.allies, ...s.enemies])
    (!p.isDown &&
      p.maxTp > 0 &&
      (p.tp = Math.min(p.maxTp, p.tp + Math.ceil(p.maxTp * Nt.TP_REGEN_RATIO))),
      (p.buffs = p.buffs
        .map((h) => ({ ...h, remainingTurns: h.remainingTurns - 1 }))
        .filter((h) => h.remainingTurns > 0)),
      (p.ailments = p.ailments
        .map((h) => ({ ...h, remainingTurns: h.remainingTurns - 1 }))
        .filter((h) => h.remainingTurns > 0)));
  return (
    (s.turn += 1),
    Ue(s, 'enemy').length === 0
      ? (s.outcome = 'win')
      : Ue(s, 'ally').length === 0 && (s.outcome = 'lose'),
    s
  );
}
function my(u) {
  let c = 0,
    f = 0;
  for (const s of u.enemies) {
    if (!s.enemyId) continue;
    const r = hu[s.enemyId],
      m = cy(u.depth, r.refDepth);
    ((c += Math.round(r.exp * m)), (f += Math.round(r.gold * m)));
  }
  return { exp: c, gold: f };
}
function Z1(u, c) {
  let f = u.level,
    s = u.exp + (xf(f) ? c : 0),
    r = u.skillPoints.total;
  for (; xf(f) && s >= Th(f); ) ((s -= Th(f)), (f += 1), (r += Nt.SP_PER_LEVEL));
  return {
    ...u,
    level: f,
    exp: xf(u.level) ? s : u.exp,
    skillPoints: { ...u.skillPoints, total: r },
  };
}
function Ch(u, c) {
  if (!u.diveState) return u;
  const f = c.outcome === 'win',
    s = c.outcome === 'win' || c.outcome === 'fled',
    r = new Map(c.allies.map((T) => [T.id, T])),
    m = u.diveState.party.map((T) => {
      const _ = r.get(T.charId);
      if (!_) return T;
      let M = _.unionGauge;
      return (
        s && !_.isDown && (M = cn(M + Nt.UNION_GAIN_ON_WIN, 0, 100)),
        { ...T, hp: _.hp, tp: _.tp, unionGauge: M, ailments: _.ailments }
      );
    });
  let v = u.guild.members,
    p = u.guild.gold;
  const h = { ...u.bestiary.monsters };
  for (const T of c.enemies) {
    if (!T.enemyId) continue;
    const _ = h[T.enemyId] ?? { seen: !1, defeated: !1, dropsFound: [] };
    h[T.enemyId] = { ..._, seen: !0, defeated: _.defeated || T.isDown };
  }
  const y = { ...u.bestiary, monsters: h };
  if (f) {
    const { exp: T, gold: _ } = my(c);
    p += _;
    const M = new Set(m.map((Y) => Y.charId)),
      G = M.size > 0 ? Math.floor(T / M.size) : 0;
    v = v.map((Y) => (M.has(Y.id) ? Z1(Y, G) : Y));
  }
  return {
    ...u,
    guild: { ...u.guild, members: v, gold: p, bestiary: y },
    bestiary: y,
    diveState: { ...u.diveState, party: m },
  };
}
const K1 = 8,
  Uf = 16,
  fu = 5;
function If(u) {
  return u.range(K1, Uf);
}
function J1(u, c) {
  const f = u - 1;
  return f <= 0
    ? { stepsUntilEncounter: If(c), triggered: !0 }
    : { stepsUntilEncounter: f, triggered: !1 };
}
function $1(u) {
  const c = Math.max(0, Uf - u),
    f = Math.round((c / Uf) * fu);
  return Math.min(fu, Math.max(0, f));
}
const rl = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  W1 = { N: 'S', E: 'W', S: 'N', W: 'E' };
function F1(u) {
  return Math.min(25, 15 + Math.floor(u / 5));
}
function I1() {
  return { walls: { N: !0, E: !0, S: !0, W: !0 }, floorType: 'normal', passable: !0 };
}
const wf = (u, c, f, s) => u >= 0 && c >= 0 && u < f && c < s;
function Rh(u, c, f, s) {
  const { dx: r, dy: m } = rl[s];
  ((u[f][c].walls[s] = !1), (u[f + m][c + r].walls[W1[s]] = !1));
}
function P1(u, c, f) {
  const s = u.length,
    r = u[0].length,
    m = Array.from({ length: s }, () => Array(r).fill(-1)),
    v = [{ x: c, y: f }];
  m[f][c] = 0;
  for (let p = 0; p < v.length; p++) {
    const { x: h, y } = v[p];
    for (const T of ['N', 'E', 'S', 'W']) {
      if (u[y][h].walls[T]) continue;
      const _ = h + rl[T].dx,
        M = y + rl[T].dy;
      !wf(_, M, r, s) || m[M][_] !== -1 || ((m[M][_] = m[y][h] + 1), v.push({ x: _, y: M }));
    }
  }
  return m;
}
function t_(u, c) {
  const f = F1(u),
    s = f,
    r = f,
    m = Array.from({ length: r }, () => Array.from({ length: s }, () => I1())),
    v = Array.from({ length: r }, () => Array(s).fill(!1)),
    p = c.int(s),
    h = c.int(r),
    y = [{ x: p, y: h }];
  for (v[h][p] = !0; y.length > 0; ) {
    const O = y[y.length - 1],
      X = [];
    for (const J of ['N', 'E', 'S', 'W']) {
      const K = O.x + rl[J].dx,
        lt = O.y + rl[J].dy;
      wf(K, lt, s, r) && !v[lt][K] && X.push(J);
    }
    if (X.length === 0) {
      y.pop();
      continue;
    }
    const q = c.pick(X);
    Rh(m, O.x, O.y, q);
    const Q = O.x + rl[q].dx,
      I = O.y + rl[q].dy;
    ((v[I][Q] = !0), y.push({ x: Q, y: I }));
  }
  const T = Math.floor((s * r) / 25);
  for (let O = 0; O < T; O++) {
    const X = c.int(s),
      q = c.int(r),
      Q = c.pick(['N', 'E', 'S', 'W']),
      I = X + rl[Q].dx,
      J = q + rl[Q].dy;
    wf(I, J, s, r) && m[q][X].walls[Q] && Rh(m, X, q, Q);
  }
  const _ = c.int(s),
    M = c.int(r),
    G = P1(m, _, M);
  let Y = _,
    B = M,
    j = -1;
  for (let O = 0; O < r; O++)
    for (let X = 0; X < s; X++) G[O][X] > j && ((j = G[O][X]), (Y = X), (B = O));
  return (
    (m[M][_].event = { kind: 'stairsDown' }),
    (m[B][Y].event = { kind: 'stairsUp' }),
    {
      depth: u,
      width: s,
      height: r,
      cells: m,
      encounterTable: `band_${Math.floor((u - 1) / 10)}`,
      foeSpawns: [],
      bgmId: Wf(u) ? 'bgm_boss' : 'bgm_dungeon',
    }
  );
}
function hy(u, c) {
  var f;
  for (let s = 0; s < u.height; s++)
    for (let r = 0; r < u.width; r++)
      if (((f = u.cells[s][r].event) == null ? void 0 : f.kind) === c) return { x: r, y: s };
  return null;
}
const en = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  ln = ['N', 'E', 'S', 'W'];
function yy(u) {
  return ln[(ln.indexOf(u) + 1) % 4];
}
function py(u) {
  return ln[(ln.indexOf(u) + 3) % 4];
}
function e_(u) {
  return ln[(ln.indexOf(u) + 2) % 4];
}
const l_ = (u, c, f) => u >= 0 && c >= 0 && u < f.width && c < f.height;
function vy(u, c, f, s) {
  if (u.cells[f][c].walls[s]) return !1;
  const r = c + en[s].dx,
    m = f + en[s].dy;
  return l_(r, m, u) ? u.cells[m][r].passable : !1;
}
function a_(u, c, f) {
  return vy(u, c.x, c.y, f) ? { x: c.x + en[f].dx, y: c.y + en[f].dy } : null;
}
function Pf(u, c, f) {
  return ['N', 'E', 'S', 'W'].filter((s) => !u.cells[f][c].walls[s]);
}
const n_ = 4294967296;
function u_(u, c) {
  let f = 3735928559 ^ u,
    s = 1103547991 ^ u;
  for (let r = 0; r < c.length; r++) {
    const m = c.charCodeAt(r);
    ((f = Math.imul(f ^ m, 2654435761)), (s = Math.imul(s ^ m, 1597334677)));
  }
  return (
    (f = Math.imul(f ^ (f >>> 16), 2246822507) ^ Math.imul(s ^ (s >>> 13), 3266489909)),
    (s = Math.imul(s ^ (s >>> 16), 2246822507) ^ Math.imul(f ^ (f >>> 13), 3266489909)),
    (s >>> 0) ^ (f >>> 0)
  );
}
class to {
  constructor(c, f) {
    mf(this, 'baseSeed');
    mf(this, '_state');
    ((this._state = c >>> 0), (this.baseSeed = (f ?? c) >>> 0));
  }
  get state() {
    return this._state;
  }
  next() {
    this._state = (this._state + 1831565813) >>> 0;
    let c = this._state;
    return (
      (c = Math.imul(c ^ (c >>> 15), c | 1)),
      (c ^= c + Math.imul(c ^ (c >>> 7), c | 61)),
      ((c ^ (c >>> 14)) >>> 0) / n_
    );
  }
  int(c) {
    return c <= 0 ? 0 : Math.floor(this.next() * c);
  }
  range(c, f) {
    f < c && ([c, f] = [f, c]);
    const s = f - c + 1;
    return c + this.int(s);
  }
  pick(c) {
    if (c.length === 0) throw new Error('Rng.pick: 空配列は選択できません');
    return c[this.int(c.length)];
  }
  fork(c) {
    const f = u_(this.baseSeed, c);
    return new to(f, f);
  }
}
function sn(u) {
  return new to(u, u);
}
function i_() {
  return Math.floor(Math.random() * 4294967296) >>> 0;
}
const zh = (u, c) => `${u},${c}`;
function c_(u, c) {
  return sn(u).fork(`floor:${c}`);
}
function gy(u, c) {
  const f = u.towerState.floors[c];
  if (f) return { save: u, floor: f };
  const s = t_(c, c_(u.masterSeed, c)),
    r = {
      depth: c,
      seed: u.masterSeed,
      generated: s,
      isBossFloor: Wf(c),
      encounterTier: Math.floor((c - 1) / 10),
      foeRuntime: [],
      openedChests: [],
      depletedGathers: [],
      consumedEvents: [],
    };
  return {
    save: { ...u, towerState: { ...u.towerState, floors: { ...u.towerState.floors, [c]: r } } },
    floor: r,
  };
}
function s_(u) {
  const c = [...u.guild.party.front, ...u.guild.party.back].filter((s) => s !== null),
    f = [];
  for (const s of c) {
    const r = u.guild.members.find((v) => v.id === s);
    if (!r) continue;
    const m = ry(r);
    f.push({ charId: s, hp: m.hp, tp: m.tp, unionGauge: 0, ailments: [] });
  }
  return f;
}
function eo(u, c, f, s) {
  const r = u.towerState.floors[c].generated,
    m = new Set(u.exploredCells[c] ?? []);
  m.add(zh(f, s));
  for (const v of Pf(r, f, s)) {
    const p = f + (v === 'E' ? 1 : v === 'W' ? -1 : 0),
      h = s + (v === 'S' ? 1 : v === 'N' ? -1 : 0);
    m.add(zh(p, h));
  }
  return { ...u, exploredCells: { ...u.exploredCells, [c]: [...m] } };
}
function _y(u, c, f) {
  var h, y;
  const s = gy(u, c);
  let r = s.save;
  const m = s.floor.generated,
    v = hy(m, 'stairsDown') ?? { x: 0, y: 0 },
    p = Pf(m, v.x, v.y)[0] ?? 'N';
  return (
    c > r.towerState.record.deepestReached &&
      (r = {
        ...r,
        towerState: { ...r.towerState, record: { ...r.towerState.record, deepestReached: c } },
      }),
    (r = {
      ...r,
      diveState: {
        depth: c,
        pos: { x: v.x, y: v.y },
        dir: p,
        party: ((h = r.diveState) == null ? void 0 : h.party) ?? s_(r),
        persistentSummons: ((y = r.diveState) == null ? void 0 : y.persistentSummons) ?? [],
        encounter: { stepsUntilEncounter: If(f) },
      },
    }),
    eo(r, c, v.x, v.y)
  );
}
function f_(u, c = 1) {
  const f = sn(u.masterSeed).fork(`dive:${u.towerState.record.totalDives}`),
    s = {
      ...u,
      diveState: null,
      towerState: {
        ...u.towerState,
        record: { ...u.towerState.record, totalDives: u.towerState.record.totalDives + 1 },
      },
    };
  return _y(s, c, f);
}
function by(u, c) {
  return u.diveState ? { ...u, diveState: { ...u.diveState, dir: c } } : u;
}
function o_(u, c, f) {
  const s = u.diveState;
  if (!s) return { save: u, moved: !1, triggered: !1 };
  const r = u.towerState.floors[s.depth].generated,
    m = a_(r, s.pos, c);
  if (!m) return { save: by(u, c), moved: !1, triggered: !1 };
  const v = J1(s.encounter.stepsUntilEncounter, f);
  let p = {
    ...u,
    diveState: { ...s, pos: m, dir: c, encounter: { stepsUntilEncounter: v.stepsUntilEncounter } },
  };
  return ((p = eo(p, s.depth, m.x, m.y)), { save: p, moved: !0, triggered: v.triggered });
}
function Dh(u) {
  const c = u.diveState;
  if (!c) return null;
  const f = u.towerState.floors[c.depth].generated.cells[c.pos.y][c.pos.x].event;
  return (f == null ? void 0 : f.kind) === 'stairsUp' ||
    (f == null ? void 0 : f.kind) === 'stairsDown'
    ? f.kind
    : null;
}
function r_(u) {
  if (!u.diveState) return u;
  const c = u.diveState.depth + 1,
    f = sn(u.masterSeed).fork(`enc:${c}:${u.towerState.record.totalDives}`);
  return _y(u, c, f);
}
function d_(u) {
  if (!u.diveState) return u;
  const c = u.diveState.depth;
  if (c <= 1) return Xi(u);
  const f = c - 1,
    s = gy(u, f),
    r = hy(s.floor.generated, 'stairsUp') ?? { x: 0, y: 0 },
    m = sn(u.masterSeed).fork(`enc:${f}:${u.towerState.record.totalDives}`);
  let v = s.save;
  const p = s.floor.generated,
    h = Pf(p, r.x, r.y)[0] ?? 'N';
  return (
    (v = {
      ...v,
      diveState: {
        ...v.diveState,
        depth: f,
        pos: { x: r.x, y: r.y },
        dir: h,
        encounter: { stepsUntilEncounter: If(m) },
      },
    }),
    eo(v, f, r.x, r.y)
  );
}
function Xi(u) {
  return { ...u, diveState: null };
}
const m_ = { 10: 'enemy_boss_gatekeeper' };
function h_(u) {
  const c = Math.floor((u - 1) / 10);
  return Object.values(hu)
    .filter((f) => f.tierBand === c && !f.id.startsWith('enemy_boss'))
    .map((f) => f.id);
}
function y_(u, c) {
  if (Wf(u)) {
    const r = m_[u];
    if (r) return [r];
  }
  const f = h_(u);
  if (f.length === 0) return [];
  const s = c.range(1, 3);
  return Array.from({ length: s }, () => c.pick(f));
}
const Pa = {
    class_warrior: {
      id: 'class_warrior',
      name: '戦士',
      skillTree: {
        skills: [
          { skillId: 'skill_power_slash', maxLevel: 5 },
          { skillId: 'skill_guard_stance', maxLevel: 3 },
        ],
      },
      equipableWeaponTypes: ['sword', 'axe'],
      equipableArmorTypes: ['heavy', 'light'],
      titleOptions: ['title_berserker', 'title_sentinel'],
    },
    class_guardian: {
      id: 'class_guardian',
      name: '守護兵',
      skillTree: {
        skills: [
          { skillId: 'skill_shield_bash', maxLevel: 5 },
          { skillId: 'skill_provoke', maxLevel: 3 },
        ],
      },
      equipableWeaponTypes: ['spear', 'sword'],
      equipableArmorTypes: ['heavy'],
      titleOptions: ['title_bulwark', 'title_vanguard'],
    },
    class_mage: {
      id: 'class_mage',
      name: '魔導士',
      skillTree: {
        skills: [
          { skillId: 'skill_fire_bolt', maxLevel: 5 },
          {
            skillId: 'skill_ice_bolt',
            maxLevel: 5,
            requires: [{ skillId: 'skill_fire_bolt', level: 1 }],
          },
        ],
      },
      equipableWeaponTypes: ['staff'],
      equipableArmorTypes: ['clothes'],
      titleOptions: ['title_pyromancer', 'title_sage'],
    },
    class_ranger: {
      id: 'class_ranger',
      name: '狩人',
      skillTree: {
        skills: [
          { skillId: 'skill_aimed_shot', maxLevel: 5 },
          { skillId: 'skill_spread_shot', maxLevel: 5 },
        ],
      },
      equipableWeaponTypes: ['bow', 'fist'],
      equipableArmorTypes: ['light', 'clothes'],
      titleOptions: ['title_sniper', 'title_tracker'],
    },
  },
  Hi = 1,
  p_ = { autoMap: 'on', bgmVolume: 0.6, seVolume: 0.6 };
function Oh() {
  return { monsters: {}, items: {} };
}
function v_() {
  return { deepestReached: 0, highestBossDefeated: 0, totalDives: 0, bossDefeatLog: [] };
}
const g_ = () => ({ weapon: null, armor: null, accessory: null });
function __() {
  return `char_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function b_(u) {
  var p;
  const { raceId: c, classId: f, name: s, id: r } = u;
  if (!Ia[c]) throw new Error(`createCharacter: 未定義の種族 "${c}"`);
  if (!Pa[f]) throw new Error(`createCharacter: 未定義の職業 "${f}"`);
  const m = (p = Pa[f].skillTree.skills[0]) == null ? void 0 : p.skillId,
    v = m ? { [m]: 1 } : {};
  return {
    id: r ?? __(),
    name: s,
    raceId: c,
    classId: f,
    titleId: null,
    level: 1,
    exp: 0,
    skillPoints: { total: 0, spent: 0 },
    learnedSkills: v,
    equipment: g_(),
  };
}
function S_() {
  return { front: Array(R1).fill(null), back: Array(z1).fill(null) };
}
function E_(u, c) {
  const f = u.front.indexOf(null);
  if (f !== -1) {
    const r = [...u.front];
    return ((r[f] = c), { ...u, front: r });
  }
  const s = u.back.indexOf(null);
  if (s !== -1) {
    const r = [...u.back];
    return ((r[s] = c), { ...u, back: r });
  }
  return u;
}
function T_(u, c) {
  return u.guild.members.length >= Of
    ? u
    : {
        ...u,
        guild: { ...u.guild, members: [...u.guild.members, c], party: E_(u.guild.party, c.id) },
      };
}
function x_(u) {
  return {
    schemaVersion: Hi,
    savedAt: 0,
    masterSeed: i_(),
    settings: { ...p_ },
    guild: { name: u, gold: C1, members: [], party: S_(), storage: [], bestiary: Oh() },
    towerState: { floors: {}, bossGates: {}, warp: { unlockedCheckpoints: [] }, record: v_() },
    diveState: null,
    bestiary: Oh(),
    playerMaps: {},
    exploredCells: {},
    forgeInventory: { fragments: {}, ingots: { copper: 0, silver: 0, gold: 0 } },
    shopStock: { unlockedTiers: [0] },
    flags: {},
  };
}
const Bf = (u, c) => c.some((f) => u instanceof f);
let jh, Uh;
function A_() {
  return jh || (jh = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function M_() {
  return (
    Uh ||
    (Uh = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const kf = new WeakMap(),
  Af = new WeakMap(),
  Ki = new WeakMap();
function N_(u) {
  const c = new Promise((f, s) => {
    const r = () => {
        (u.removeEventListener('success', m), u.removeEventListener('error', v));
      },
      m = () => {
        (f(fa(u.result)), r());
      },
      v = () => {
        (s(u.error), r());
      };
    (u.addEventListener('success', m), u.addEventListener('error', v));
  });
  return (Ki.set(c, u), c);
}
function C_(u) {
  if (kf.has(u)) return;
  const c = new Promise((f, s) => {
    const r = () => {
        (u.removeEventListener('complete', m),
          u.removeEventListener('error', v),
          u.removeEventListener('abort', v));
      },
      m = () => {
        (f(), r());
      },
      v = () => {
        (s(u.error || new DOMException('AbortError', 'AbortError')), r());
      };
    (u.addEventListener('complete', m),
      u.addEventListener('error', v),
      u.addEventListener('abort', v));
  });
  kf.set(u, c);
}
let Hf = {
  get(u, c, f) {
    if (u instanceof IDBTransaction) {
      if (c === 'done') return kf.get(u);
      if (c === 'store')
        return f.objectStoreNames[1] ? void 0 : f.objectStore(f.objectStoreNames[0]);
    }
    return fa(u[c]);
  },
  set(u, c, f) {
    return ((u[c] = f), !0);
  },
  has(u, c) {
    return u instanceof IDBTransaction && (c === 'done' || c === 'store') ? !0 : c in u;
  },
};
function Sy(u) {
  Hf = u(Hf);
}
function R_(u) {
  return M_().includes(u)
    ? function (...c) {
        return (u.apply(Lf(this), c), fa(this.request));
      }
    : function (...c) {
        return fa(u.apply(Lf(this), c));
      };
}
function z_(u) {
  return typeof u == 'function'
    ? R_(u)
    : (u instanceof IDBTransaction && C_(u), Bf(u, A_()) ? new Proxy(u, Hf) : u);
}
function fa(u) {
  if (u instanceof IDBRequest) return N_(u);
  if (Af.has(u)) return Af.get(u);
  const c = z_(u);
  return (c !== u && (Af.set(u, c), Ki.set(c, u)), c);
}
const Lf = (u) => Ki.get(u);
function D_(u, c, { blocked: f, upgrade: s, blocking: r, terminated: m } = {}) {
  const v = indexedDB.open(u, c),
    p = fa(v);
  return (
    s &&
      v.addEventListener('upgradeneeded', (h) => {
        s(fa(v.result), h.oldVersion, h.newVersion, fa(v.transaction), h);
      }),
    f && v.addEventListener('blocked', (h) => f(h.oldVersion, h.newVersion, h)),
    p
      .then((h) => {
        (m && h.addEventListener('close', () => m()),
          r && h.addEventListener('versionchange', (y) => r(y.oldVersion, y.newVersion, y)));
      })
      .catch(() => {}),
    p
  );
}
const O_ = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  j_ = ['put', 'add', 'delete', 'clear'],
  Mf = new Map();
function wh(u, c) {
  if (!(u instanceof IDBDatabase && !(c in u) && typeof c == 'string')) return;
  if (Mf.get(c)) return Mf.get(c);
  const f = c.replace(/FromIndex$/, ''),
    s = c !== f,
    r = j_.includes(f);
  if (!(f in (s ? IDBIndex : IDBObjectStore).prototype) || !(r || O_.includes(f))) return;
  const m = async function (v, ...p) {
    const h = this.transaction(v, r ? 'readwrite' : 'readonly');
    let y = h.store;
    return (s && (y = y.index(p.shift())), (await Promise.all([y[f](...p), r && h.done]))[0]);
  };
  return (Mf.set(c, m), m);
}
Sy((u) => ({
  ...u,
  get: (c, f, s) => wh(c, f) || u.get(c, f, s),
  has: (c, f) => !!wh(c, f) || u.has(c, f),
}));
const U_ = ['continue', 'continuePrimaryKey', 'advance'],
  Bh = {},
  qf = new WeakMap(),
  Ey = new WeakMap(),
  w_ = {
    get(u, c) {
      if (!U_.includes(c)) return u[c];
      let f = Bh[c];
      return (
        f ||
          (f = Bh[c] =
            function (...s) {
              qf.set(this, Ey.get(this)[c](...s));
            }),
        f
      );
    },
  };
async function* B_(...u) {
  let c = this;
  if ((c instanceof IDBCursor || (c = await c.openCursor(...u)), !c)) return;
  c = c;
  const f = new Proxy(c, w_);
  for (Ey.set(f, c), Ki.set(f, Lf(c)); c; )
    (yield f, (c = await (qf.get(f) || c.continue())), qf.delete(f));
}
function kh(u, c) {
  return (
    (c === Symbol.asyncIterator && Bf(u, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (c === 'iterate' && Bf(u, [IDBIndex, IDBObjectStore]))
  );
}
Sy((u) => ({
  ...u,
  get(c, f, s) {
    return kh(c, f) ? B_ : u.get(c, f, s);
  },
  has(c, f) {
    return kh(c, f) || u.has(c, f);
  },
}));
const k_ = {};
function H_(u) {
  return structuredClone(u);
}
function cu(u) {
  return typeof u == 'object' && u !== null && !Array.isArray(u);
}
function L_(u) {
  if (
    !cu(u) ||
    typeof u.schemaVersion != 'number' ||
    typeof u.masterSeed != 'number' ||
    !cu(u.guild)
  )
    return !1;
  const c = u.guild;
  return !(
    typeof c.name != 'string' ||
    !Array.isArray(c.members) ||
    !cu(u.towerState) ||
    !cu(u.towerState.record) ||
    typeof u.towerState.record.deepestReached != 'number'
  );
}
function Ty(u) {
  if (!cu(u) || typeof u.schemaVersion != 'number')
    return { ok: !1, reason: 'セーブデータの構造が不正です' };
  let c = u.schemaVersion;
  if (c > Hi) return { ok: !1, reason: `未知のバージョン (${c} > ${Hi}) のセーブデータです` };
  let f = { ...u };
  for (; c < Hi; ) {
    const s = k_[c];
    if (!s) return { ok: !1, reason: `バージョン ${c} の migration が未定義です` };
    ((f = s(f)), (c = typeof f.schemaVersion == 'number' ? f.schemaVersion : c + 1));
  }
  return L_(f)
    ? { ok: !0, data: f }
    : { ok: !1, reason: 'migration 後のデータが SaveData の形をしていません' };
}
function q_(u) {
  return {
    guildName: u.guild.name,
    deepestReached: u.towerState.record.deepestReached,
    memberCount: u.guild.members.length,
    savedAt: u.savedAt,
  };
}
function Hh() {
  return {
    guildName: '(破損データ)',
    deepestReached: 0,
    memberCount: 0,
    savedAt: 0,
    corrupted: !0,
  };
}
const G_ = 'sekaiju-like-game',
  Y_ = 1,
  ru = 'saves',
  lo = 'main';
let Nf = null;
function ao() {
  return (
    Nf ||
      (Nf = D_(G_, Y_, {
        upgrade(u) {
          u.objectStoreNames.contains(ru) || u.createObjectStore(ru);
        },
      })),
    Nf
  );
}
async function Cf(u) {
  const c = { ...u, savedAt: Date.now() };
  return (await (await ao()).put(ru, H_(c), lo), c);
}
async function X_() {
  const c = await (await ao()).get(ru, lo);
  return c === void 0 ? { ok: !1, reason: 'empty' } : Ty(c);
}
async function Q_() {
  const c = await (await ao()).get(ru, lo);
  if (c === void 0) return null;
  const f = Ty(c);
  if (!f.ok) return Hh();
  try {
    return q_(f.data);
  } catch {
    return Hh();
  }
}
const xy = { save: null, saving: !1 };
function V_(u, c) {
  switch (c.type) {
    case 'load':
      return { ...u, save: c.save };
    case 'updateSave':
      return u.save ? { ...u, save: c.updater(u.save) } : u;
    case 'setSave':
      return { ...u, save: c.save };
    case 'saving':
      return { ...u, saving: c.saving };
    case 'clear':
      return { ...xy };
  }
}
const Ay = A.createContext(null);
function Z_(u) {
  const c = A.useRef(u);
  return ((c.current = u), c);
}
function K_({ children: u }) {
  const [c, f] = A.useReducer(V_, xy),
    s = Z_(c),
    r = A.useCallback(async (_) => {
      const M = x_(_),
        G = await Cf(M);
      f({ type: 'load', save: G });
    }, []),
    m = A.useCallback(async () => {
      const _ = await X_();
      return _.ok ? (f({ type: 'load', save: _.data }), { ok: !0 }) : { ok: !1, reason: _.reason };
    }, []),
    v = A.useCallback((_) => {
      f({ type: 'updateSave', updater: _ });
    }, []),
    p = A.useCallback(
      async (_) => {
        const M = s.current.save;
        if (!M) return;
        const G = _(M);
        (f({ type: 'setSave', save: G }), f({ type: 'saving', saving: !0 }));
        try {
          const Y = await Cf(G);
          f({ type: 'setSave', save: Y });
        } finally {
          f({ type: 'saving', saving: !1 });
        }
      },
      [s]
    ),
    h = A.useCallback(async () => {
      const { save: _ } = s.current;
      if (_) {
        f({ type: 'saving', saving: !0 });
        try {
          const M = await Cf(_);
          f({ type: 'setSave', save: M });
        } finally {
          f({ type: 'saving', saving: !1 });
        }
      }
    }, [s]),
    y = A.useCallback(() => {
      f({ type: 'clear' });
    }, []),
    T = A.useMemo(
      () => ({
        ...c,
        startNewGame: r,
        continueGame: m,
        applySave: v,
        applyAndPersist: p,
        persist: h,
        exitToTitle: y,
      }),
      [c, r, m, v, p, h, y]
    );
  return E.jsx(Ay.Provider, { value: T, children: u });
}
function yu() {
  const u = A.useContext(Ay);
  if (!u) throw new Error('useGameState は GameStateProvider の内側で使ってください');
  return u;
}
const J_ = () => {
    var w;
    const u = oa(),
      { save: c, applyAndPersist: f } = yu(),
      s = A.useRef(null),
      [r, m] = A.useState(null),
      [v, p] = A.useState({}),
      [h, y] = A.useState(null),
      [T, _] = A.useState(!1),
      [M, G] = A.useState(null),
      [Y, B] = A.useState(!1);
    A.useEffect(() => {
      if (r || !(c != null && c.diveState)) return;
      const R = c.diveState.depth,
        V = (c.masterSeed ^ (R * 2654435761) ^ (c.towerState.record.totalDives * 40503)) >>> 0;
      ((s.current = sn(V)), m(q1(c, y_(R, s.current))));
    }, [c, r]);
    const j = A.useMemo(() => (r == null ? void 0 : r.enemies.filter((R) => !R.isDown)) ?? [], [r]),
      O = A.useMemo(() => (r == null ? void 0 : r.allies.filter((R) => !R.isDown)) ?? [], [r]);
    (A.useEffect(() => {
      j.length > 0 && !j.some((R) => R.id === M) && G(j[0].id);
    }, [j, M]),
      A.useEffect(() => {
        if ((r == null ? void 0 : r.outcome) !== 'ongoing' || (h && O.some((V) => V.id === h)))
          return;
        const R = O.find((V) => !v[V.id]) ?? null;
        y(R ? R.id : null);
      }, [r, O, h, v]));
    const X = O.length > 0 && O.every((R) => v[R.id] !== void 0),
      q = A.useCallback(
        (R, V) => {
          const it = { ...v, [R]: V };
          (p(it), _(!1));
          const yt = O.find((b) => b.id !== R && !it[b.id]);
          y(yt ? yt.id : null);
        },
        [v, O]
      ),
      Q = A.useCallback(
        async (R) => {
          (B(!0),
            R.outcome === 'lose'
              ? (await f((V) => Xi(Ch(V, R))), u('/town'))
              : (await f((V) => Ch(V, R)), u('/dungeon')));
        },
        [f, u]
      ),
      I = A.useCallback(() => {
        var R;
        (p({}), _(!1), y(((R = O[0]) == null ? void 0 : R.id) ?? null));
      }, [O]),
      J = A.useCallback(() => {
        var yt;
        if (!r || !s.current || r.outcome !== 'ongoing') return;
        const R = M ?? ((yt = j[0]) == null ? void 0 : yt.id) ?? '',
          V = O.map((b) => {
            const H = v[b.id] ?? { kind: 'attack' };
            return H.kind === 'guard'
              ? { kind: 'guard', actorId: b.id }
              : H.kind === 'skill'
                ? { kind: 'skill', actorId: b.id, skillId: H.skillId, targetId: R }
                : { kind: 'attack', actorId: b.id, targetId: R };
          }),
          it = Nh(r, V, s.current);
        (m(it), p({}), _(!1), y(null));
      }, [r, v, M, O, j]),
      K = A.useCallback(() => {
        if (!r || !s.current || r.outcome !== 'ongoing') return;
        const R = O[0];
        R && (m(Nh(r, [{ kind: 'flee', actorId: R.id }], s.current)), p({}), y(null));
      }, [r, O]);
    if (!c || !c.diveState) return E.jsx(tn, { to: '/town', replace: !0 });
    if (!r) return E.jsx('div', { className: et.layout, children: '戦闘準備中...' });
    const lt = (R) => {
        const V = c.guild.members.find((it) => it.id === R.id);
        return V
          ? Object.keys(V.learnedSkills).filter((it) => it in Fa && R.tp >= Fa[it].tpCost(1))
          : [];
      },
      ht = (R) => {
        var it;
        const V = v[R.id];
        return V
          ? V.kind === 'attack'
            ? '攻撃'
            : V.kind === 'guard'
              ? '防御'
              : (((it = Fa[V.skillId]) == null ? void 0 : it.name) ?? 'スキル')
          : '';
      },
      _t = h ? O.find((R) => R.id === h) : void 0,
      Ot = ((w = r.enemies.find((R) => R.id === M)) == null ? void 0 : w.name) ?? '-',
      Vt = my(r),
      de = (R) =>
        E.jsxs(
          'button',
          {
            type: 'button',
            className: [
              et.card,
              R.isDown ? et.down : '',
              h === R.id ? et.cardActive : '',
              v[R.id] ? et.cardDecided : '',
            ].join(' '),
            disabled: R.isDown || r.outcome !== 'ongoing',
            onClick: () => {
              (y(R.id), _(!1));
            },
            children: [
              E.jsxs('div', {
                className: et.cardName,
                children: [
                  R.name,
                  R.unionGauge >= 100 ? E.jsx('span', { className: et.uni, children: '★' }) : null,
                ],
              }),
              E.jsx(Tf, { value: R.hp, max: R.maxHp, color: '#4caf50', showValue: !1 }),
              E.jsx(Tf, { value: R.tp, max: R.maxTp, color: '#2196f3', showValue: !1 }),
              E.jsxs('div', {
                className: et.cardNums,
                children: ['HP ', Math.max(0, R.hp), ' · TP ', R.tp],
              }),
              v[R.id] ? E.jsxs('div', { className: et.cardCmd, children: ['▶ ', ht(R)] }) : null,
            ],
          },
          R.id
        ),
      ne = r.allies.filter((R) => R.row === 'front'),
      jt = r.allies.filter((R) => R.row === 'back');
    return E.jsxs('div', {
      className: et.layout,
      children: [
        E.jsx('div', {
          className: et.enemies,
          children: r.enemies.map((R) =>
            E.jsxs(
              'button',
              {
                type: 'button',
                className: `${et.enemy} ${R.isDown ? et.down : ''} ${M === R.id ? et.targeted : ''}`,
                disabled: R.isDown,
                onClick: () => G(R.id),
                children: [
                  E.jsxs('span', {
                    className: et.enemyName,
                    children: [R.name, R.ailments.length > 0 ? ' 🌀' : ''],
                  }),
                  E.jsx(Tf, { value: R.hp, max: R.maxHp, color: '#e57373', showValue: !1 }),
                ],
              },
              R.id
            )
          ),
        }),
        E.jsxs('div', {
          className: et.party,
          children: [
            E.jsx('div', { className: et.rowTag, children: '前衛' }),
            E.jsx('div', { className: et.cardRow, children: ne.map(de) }),
            E.jsx('div', { className: et.rowTag, children: '後衛（近接ダメージ -30%）' }),
            E.jsx('div', {
              className: et.cardRow,
              children:
                jt.length > 0
                  ? jt.map(de)
                  : E.jsx('div', { className: et.empty, children: '（なし）' }),
            }),
          ],
        }),
        r.outcome !== 'ongoing'
          ? E.jsxs('div', {
              className: et.result,
              children: [
                E.jsx('div', {
                  className: et.resultTitle,
                  children:
                    r.outcome === 'win' ? '勝利！' : r.outcome === 'fled' ? '逃走した' : '全滅...',
                }),
                r.outcome === 'win'
                  ? E.jsxs('div', {
                      className: et.resultBody,
                      children: ['経験値 ', Vt.exp, ' ／ ', Vt.gold, ' G を獲得'],
                    })
                  : r.outcome === 'lose'
                    ? E.jsx('div', { className: et.resultBody, children: '拠点へ帰還する' })
                    : null,
                E.jsx('button', {
                  type: 'button',
                  className: et.primary,
                  disabled: Y,
                  onClick: () => void Q(r),
                  children: 'つづける',
                }),
              ],
            })
          : E.jsxs('div', {
              className: et.command,
              children: [
                E.jsxs('div', {
                  className: et.target,
                  children: ['対象: ', Ot, '（敵をタップで変更）'],
                }),
                _t
                  ? E.jsxs(E.Fragment, {
                      children: [
                        E.jsxs('div', {
                          className: et.cmdHead,
                          children: [_t.name, ' のコマンド'],
                        }),
                        T
                          ? E.jsxs('div', {
                              className: et.skillList,
                              children: [
                                lt(_t).map((R) => {
                                  var V;
                                  return E.jsxs(
                                    'button',
                                    {
                                      type: 'button',
                                      className: et.skillBtn,
                                      onClick: () => q(_t.id, { kind: 'skill', skillId: R }),
                                      children: [
                                        E.jsxs('span', {
                                          className: et.skillTop,
                                          children: [
                                            E.jsx('span', {
                                              className: et.skillName,
                                              children: Fa[R].name,
                                            }),
                                            E.jsxs('span', {
                                              className: et.tp,
                                              children: ['TP ', Fa[R].tpCost(1)],
                                            }),
                                          ],
                                        }),
                                        E.jsx('span', {
                                          className: et.skillDesc,
                                          children:
                                            ((V = iy[R]) == null ? void 0 : V.description) ?? '',
                                        }),
                                      ],
                                    },
                                    R
                                  );
                                }),
                                lt(_t).length === 0
                                  ? E.jsx('div', {
                                      className: et.empty,
                                      children: '使えるスキルがない',
                                    })
                                  : null,
                                E.jsx('button', {
                                  type: 'button',
                                  className: et.menuBack,
                                  onClick: () => _(!1),
                                  children: 'もどる',
                                }),
                              ],
                            })
                          : E.jsxs('div', {
                              className: et.menu,
                              children: [
                                E.jsx('button', {
                                  type: 'button',
                                  className: et.menuBtn,
                                  onClick: () => q(_t.id, { kind: 'attack' }),
                                  children: '攻撃',
                                }),
                                E.jsx('button', {
                                  type: 'button',
                                  className: et.menuBtn,
                                  onClick: () => q(_t.id, { kind: 'guard' }),
                                  children: '防御',
                                }),
                                E.jsx('button', {
                                  type: 'button',
                                  className: et.menuBtn,
                                  disabled: lt(_t).length === 0,
                                  onClick: () => _(!0),
                                  children: 'スキル',
                                }),
                                E.jsx('button', {
                                  type: 'button',
                                  className: et.menuBtn,
                                  onClick: K,
                                  children: '逃走',
                                }),
                              ],
                            }),
                      ],
                    })
                  : E.jsxs('div', {
                      className: et.execRow,
                      children: [
                        E.jsx('button', {
                          type: 'button',
                          className: et.redo,
                          onClick: I,
                          children: 'やり直す',
                        }),
                        E.jsx('button', {
                          type: 'button',
                          className: et.primary,
                          disabled: !X,
                          onClick: J,
                          children: '実行',
                        }),
                      ],
                    }),
              ],
            }),
        E.jsx('div', {
          className: et.log,
          children:
            r.log.length === 0
              ? E.jsxs('div', {
                  className: et.logLine,
                  children: ['てきが あらわれた！（', r.turn, ' ターン目）'],
                })
              : r.log.map((R, V) => E.jsx('div', { className: et.logLine, children: R.text }, V)),
        }),
      ],
    });
  },
  $_ = '_layout_ao2mn_1',
  W_ = '_head_ao2mn_13',
  F_ = '_depth_ao2mn_22',
  I_ = '_fpvWrap_ao2mn_39',
  P_ = '_mapWrap_ao2mn_45',
  tb = '_palette_ao2mn_52',
  eb = '_tool_ao2mn_62',
  lb = '_toolActive_ao2mn_73',
  ab = '_paletteHint_ao2mn_79',
  nb = '_stairs_ao2mn_88',
  ub = '_controls_ao2mn_102',
  ib = '_row_ao2mn_112',
  cb = '_forward_ao2mn_118',
  sb = '_turn_ao2mn_133',
  fb = '_back_ao2mn_147',
  qt = {
    layout: $_,
    head: W_,
    depth: F_,
    return: '_return_ao2mn_28',
    fpvWrap: I_,
    mapWrap: P_,
    palette: tb,
    tool: eb,
    toolActive: lb,
    paletteHint: ab,
    stairs: nb,
    controls: ub,
    row: ib,
    forward: cb,
    turn: sb,
    back: fb,
  },
  ob = '_canvas_1keax_1',
  rb = { canvas: ob },
  My = [
    { id: 'icon_chest', symbol: '📦', label: '宝箱' },
    { id: 'icon_foe', symbol: '👹', label: '強敵(FOE)' },
    { id: 'icon_warning', symbol: '⚠️', label: '注意' },
    { id: 'icon_door', symbol: '🚪', label: '扉/近道' },
    { id: 'icon_gather', symbol: '⛏️', label: '採集' },
    { id: 'icon_event', symbol: '❗', label: 'イベント' },
    { id: 'icon_note', symbol: '📝', label: 'メモ' },
    { id: 'icon_star', symbol: '⭐', label: '任意' },
  ],
  db = new Map(My.map((u) => [u.id, u]));
function mb(u) {
  var c;
  return ((c = db.get(u)) == null ? void 0 : c.symbol) ?? '•';
}
const ca = {
    fog: '#cdd9b8',
    floor: '#fbfdf7',
    wall: '#4a5a3a',
    grid: '#e3ebd6',
    player: '#2196f3',
    stairsUp: '#e8923a',
    stairsDown: '#7aa2d6',
  },
  hb = ({
    floor: u,
    explored: c,
    pos: f,
    dir: s,
    icons: r = [],
    maxCell: m = 26,
    onCellClick: v,
  }) => {
    const p = A.useRef(null),
      h = Math.max(10, Math.min(m, Math.floor(360 / u.width))),
      y = u.width * h,
      T = u.height * h;
    A.useEffect(() => {
      const M = p.current;
      if (!M) return;
      const G = new Set(c),
        Y = window.devicePixelRatio || 1;
      ((M.width = y * Y), (M.height = T * Y));
      const B = M.getContext('2d');
      if (!B) return;
      (B.scale(Y, Y), B.clearRect(0, 0, y, T));
      for (let J = 0; J < u.height; J++)
        for (let K = 0; K < u.width; K++) {
          const lt = G.has(`${K},${J}`);
          ((B.fillStyle = lt ? ca.floor : ca.fog),
            B.fillRect(K * h, J * h, h, h),
            lt &&
              ((B.strokeStyle = ca.grid),
              (B.lineWidth = 1),
              B.strokeRect(K * h + 0.5, J * h + 0.5, h - 1, h - 1)));
        }
      ((B.strokeStyle = ca.wall), (B.lineWidth = 2), (B.lineCap = 'round'));
      const j = (J, K, lt, ht) => {
        (B.beginPath(), B.moveTo(J, K), B.lineTo(lt, ht), B.stroke());
      };
      for (let J = 0; J < u.height; J++)
        for (let K = 0; K < u.width; K++) {
          if (!G.has(`${K},${J}`)) continue;
          const lt = u.cells[J][K],
            ht = K * h,
            _t = J * h;
          (lt.walls.N && j(ht, _t, ht + h, _t),
            lt.walls.S && j(ht, _t + h, ht + h, _t + h),
            lt.walls.W && j(ht, _t, ht, _t + h),
            lt.walls.E && j(ht + h, _t, ht + h, _t + h));
          const Ot = lt.event;
          ((Ot == null ? void 0 : Ot.kind) === 'stairsUp' ||
            (Ot == null ? void 0 : Ot.kind) === 'stairsDown') &&
            ((B.fillStyle = Ot.kind === 'stairsUp' ? ca.stairsUp : ca.stairsDown),
            B.beginPath(),
            B.arc(ht + h / 2, _t + h / 2, h * 0.28, 0, Math.PI * 2),
            B.fill(),
            (B.fillStyle = '#ffffff'),
            (B.font = `bold ${Math.floor(h * 0.5)}px sans-serif`),
            (B.textAlign = 'center'),
            (B.textBaseline = 'middle'),
            B.fillText(Ot.kind === 'stairsUp' ? '▲' : '▼', ht + h / 2, _t + h / 2 + 1));
        }
      ((B.font = `${Math.floor(h * 0.66)}px sans-serif`),
        (B.textAlign = 'center'),
        (B.textBaseline = 'middle'));
      for (const J of r)
        G.has(`${J.x},${J.y}`) && B.fillText(mb(J.iconId), J.x * h + h / 2, J.y * h + h / 2 + 1);
      const O = f.x * h + h / 2,
        X = f.y * h + h / 2,
        q = h * 0.34,
        I = { N: -Math.PI / 2, E: 0, S: Math.PI / 2, W: Math.PI }[s];
      ((B.fillStyle = ca.player),
        B.beginPath(),
        B.moveTo(O + Math.cos(I) * q, X + Math.sin(I) * q),
        B.lineTo(O + Math.cos(I + 2.5) * q, X + Math.sin(I + 2.5) * q),
        B.lineTo(O + Math.cos(I - 2.5) * q, X + Math.sin(I - 2.5) * q),
        B.closePath(),
        B.fill());
    }, [u, c, f, s, r, h, y, T]);
    const _ = (M) => {
      if (!v) return;
      const G = M.currentTarget.getBoundingClientRect(),
        Y = Math.floor(((M.clientX - G.left) / G.width) * u.width),
        B = Math.floor(((M.clientY - G.top) / G.height) * u.height);
      Y >= 0 && B >= 0 && Y < u.width && B < u.height && v(Y, B);
    };
    return E.jsx('canvas', {
      ref: p,
      className: rb.canvas,
      style: { width: y, height: T },
      onClick: _,
    });
  },
  yb = '_gauge_1o2hx_1',
  pb = '_icon_1o2hx_11',
  vb = '_segments_1o2hx_16',
  gb = '_seg_1o2hx_16',
  _b = '_filled_1o2hx_28',
  bb = '_danger_1o2hx_32',
  Wa = { gauge: yb, icon: pb, segments: vb, seg: gb, filled: _b, danger: bb },
  Sb = ({ level: u }) => {
    const c = u >= fu;
    return E.jsxs('div', {
      className: Wa.gauge,
      role: 'img',
      'aria-label': `エンカウントゲージ ${u}/${fu}`,
      children: [
        E.jsx('span', { className: Wa.icon, children: c ? '⚠' : '👣' }),
        E.jsx('div', {
          className: Wa.segments,
          children: Array.from({ length: fu }, (f, s) =>
            E.jsx(
              'span',
              { className: [Wa.seg, s < u ? Wa.filled : '', c ? Wa.danger : ''].join(' ') },
              s
            )
          ),
        }),
      ],
    });
  },
  Eb = '_view_tw2v9_1',
  Tb = { view: Eb },
  Lh = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } };
function xb(u, c, f, s = 4) {
  const r = py(f),
    m = yy(f),
    v = [];
  let { x: p, y: h } = c;
  for (let y = 0; y < s; y++) {
    const T = vy(u, p, h, f);
    if (
      (v.push({
        x: p,
        y: h,
        leftOpen: !u.cells[h][p].walls[r],
        rightOpen: !u.cells[h][p].walls[m],
        frontOpen: T,
        event: u.cells[h][p].event,
      }),
      !T)
    )
      break;
    ((p += Lh[f].dx), (h += Lh[f].dy));
  }
  return v;
}
const ol = {
    sky: '#26301c',
    ceiling: '#3a4a2c',
    floor: '#5d6b46',
    wall: '#8b9a6b',
    frontWall: '#7a8a5c',
    outline: '#2c3720',
  },
  Ab = 0.56,
  Mb = ({ floor: u, pos: c, dir: f, maxDepth: s = 4, width: r = 358, height: m = 200 }) => {
    const v = A.useRef(null);
    return (
      A.useEffect(() => {
        const p = v.current;
        if (!p) return;
        const h = window.devicePixelRatio || 1;
        ((p.width = r * h), (p.height = m * h));
        const y = p.getContext('2d');
        if (!y) return;
        y.scale(h, h);
        const T = r,
          _ = m,
          M = T / 2,
          G = _ / 2,
          Y = xb(u, c, f, s),
          B = (X) => {
            const q = Math.pow(Ab, X);
            return {
              l: M - (T / 2) * q,
              r: M + (T / 2) * q,
              t: G - (_ / 2) * q,
              b: G + (_ / 2) * q,
            };
          },
          j = (X, q, Q = !1) => {
            (y.beginPath(), y.moveTo(X[0][0], X[0][1]));
            for (let I = 1; I < X.length; I++) y.lineTo(X[I][0], X[I][1]);
            (y.closePath(),
              (y.fillStyle = q),
              y.fill(),
              Q && ((y.strokeStyle = ol.outline), (y.lineWidth = 1), y.stroke()));
          },
          O = (X) => `rgba(0,0,0,${Math.min(0.5, X * 0.13)})`;
        ((y.fillStyle = ol.sky), y.fillRect(0, 0, T, _));
        for (let X = Y.length - 1; X >= 0; X--) {
          const q = B(X),
            Q = B(X + 1),
            I = Y[X];
          (j(
            [
              [q.l, q.t],
              [q.r, q.t],
              [Q.r, Q.t],
              [Q.l, Q.t],
            ],
            ol.ceiling
          ),
            j(
              [
                [q.l, q.b],
                [q.r, q.b],
                [Q.r, Q.b],
                [Q.l, Q.b],
              ],
              ol.floor
            ),
            j(
              [
                [q.l, q.t],
                [Q.l, Q.t],
                [Q.l, Q.b],
                [q.l, q.b],
              ],
              I.leftOpen ? ol.sky : ol.wall,
              !0
            ),
            j(
              [
                [q.r, q.t],
                [Q.r, Q.t],
                [Q.r, Q.b],
                [q.r, q.b],
              ],
              I.rightOpen ? ol.sky : ol.wall,
              !0
            ),
            I.frontOpen ||
              j(
                [
                  [Q.l, Q.t],
                  [Q.r, Q.t],
                  [Q.r, Q.b],
                  [Q.l, Q.b],
                ],
                ol.frontWall,
                !0
              ),
            (y.fillStyle = O(X)),
            y.fillRect(Q.l, Q.t, Q.r - Q.l, Q.b - Q.t));
          const J = I.event;
          if (
            (J == null ? void 0 : J.kind) === 'stairsUp' ||
            (J == null ? void 0 : J.kind) === 'stairsDown'
          ) {
            const K = M,
              lt = (q.b + Q.b) / 2 - (q.b - Q.b) * 0.15,
              ht = Math.max(12, (q.b - q.t) * 0.18);
            ((y.fillStyle = J.kind === 'stairsUp' ? '#e8923a' : '#7aa2d6'),
              y.beginPath(),
              y.arc(K, lt, ht, 0, Math.PI * 2),
              y.fill(),
              (y.fillStyle = '#fff'),
              (y.font = `bold ${Math.floor(ht * 1.2)}px sans-serif`),
              (y.textAlign = 'center'),
              (y.textBaseline = 'middle'),
              y.fillText(J.kind === 'stairsUp' ? '▲' : '▼', K, lt + 1));
          }
        }
      }, [u, c, f, s, r, m]),
      E.jsx('canvas', { ref: v, className: Tb.view, style: { width: r, height: m } })
    );
  };
function Nb(u) {
  return { depth: u, floorPaint: [], wallDraw: [], icons: [], notes: [], autopilotRoutes: [] };
}
function Cb(u, c) {
  return u.playerMaps[c] ?? Nb(c);
}
function Ny(u, c, f) {
  return { ...u, playerMaps: { ...u.playerMaps, [c]: f } };
}
function Rb(u, c, f, s, r) {
  const m = Cb(u, c),
    v = m.icons.find((y) => y.x === f && y.y === s),
    p = m.icons.filter((y) => !(y.x === f && y.y === s)),
    h = (v == null ? void 0 : v.iconId) === r ? p : [...p, { x: f, y: s, iconId: r }];
  return Ny(u, c, { ...m, icons: h });
}
function zb(u, c, f, s) {
  const r = u.playerMaps[c];
  return r ? Ny(u, c, { ...r, icons: r.icons.filter((m) => !(m.x === f && m.y === s)) }) : u;
}
const Db = () => {
    var B;
    const u = oa(),
      { save: c, applySave: f, applyAndPersist: s } = yu(),
      r = A.useRef(null),
      [m, v] = A.useState(null),
      p = (c == null ? void 0 : c.diveState) ?? null,
      h = A.useMemo(() => {
        var j;
        return c && p ? ((j = c.towerState.floors[p.depth]) == null ? void 0 : j.generated) : null;
      }, [c, p]),
      y = A.useCallback(
        (j) => {
          if (!c) return;
          r.current || (r.current = sn((c.masterSeed ^ 2654435769) >>> 0));
          const O = o_(c, j, r.current);
          (s(() => O.save), O.triggered && u('/battle'));
        },
        [c, s, u]
      ),
      T = A.useCallback(
        (j) => {
          f((O) => by(O, j));
        },
        [f]
      ),
      _ = A.useCallback(async () => {
        if (!c) return;
        const j = Dh(c);
        j === 'stairsUp'
          ? await s((O) => r_(O))
          : j === 'stairsDown' &&
            (c.diveState.depth <= 1 ? (await s((O) => Xi(O)), u('/town')) : await s((O) => d_(O)));
      }, [c, s, u]),
      M = A.useCallback(async () => {
        (await s((j) => Xi(j)), u('/town'));
      }, [s, u]),
      G = A.useCallback(
        (j, O) => {
          if (!p) return;
          const X = p.depth;
          if (m !== null) {
            if (!((c == null ? void 0 : c.exploredCells[X]) ?? []).includes(`${j},${O}`)) return;
            s(m === 'erase' ? (K) => zb(K, X, j, O) : (K) => Rb(K, X, j, O, m));
            return;
          }
          const q = j - p.pos.x,
            Q = O - p.pos.y,
            I = ['N', 'E', 'S', 'W'].find((J) => en[J].dx === q && en[J].dy === Q);
          I && y(I);
        },
        [p, y, m, c, s]
      );
    if (!c) return E.jsx(tn, { to: '/title', replace: !0 });
    if (!p || !h) return E.jsx(tn, { to: '/town', replace: !0 });
    const Y = Dh(c);
    return E.jsxs('div', {
      className: qt.layout,
      children: [
        E.jsxs('header', {
          className: qt.head,
          children: [
            E.jsxs('div', { className: qt.depth, children: [p.depth, 'F'] }),
            E.jsx(Sb, { level: $1(p.encounter.stepsUntilEncounter) }),
            E.jsx('button', {
              type: 'button',
              className: qt.return,
              onClick: () => void M(),
              children: '帰還',
            }),
          ],
        }),
        E.jsx('div', {
          className: qt.fpvWrap,
          children: E.jsx(Mb, { floor: h, pos: p.pos, dir: p.dir }),
        }),
        E.jsx('div', {
          className: qt.mapWrap,
          children: E.jsx(hb, {
            floor: h,
            explored: c.exploredCells[p.depth] ?? [],
            pos: p.pos,
            dir: p.dir,
            icons: ((B = c.playerMaps[p.depth]) == null ? void 0 : B.icons) ?? [],
            onCellClick: G,
          }),
        }),
        E.jsxs('div', {
          className: qt.palette,
          children: [
            E.jsx('button', {
              type: 'button',
              className: `${qt.tool} ${m === null ? qt.toolActive : ''}`,
              onClick: () => v(null),
              'aria-label': '移動モード',
              children: '🚶',
            }),
            My.map((j) =>
              E.jsx(
                'button',
                {
                  type: 'button',
                  className: `${qt.tool} ${m === j.id ? qt.toolActive : ''}`,
                  onClick: () => v(j.id),
                  'aria-label': j.label,
                  children: j.symbol,
                },
                j.id
              )
            ),
            E.jsx('button', {
              type: 'button',
              className: `${qt.tool} ${m === 'erase' ? qt.toolActive : ''}`,
              onClick: () => v('erase'),
              'aria-label': '消しゴム',
              children: '🧽',
            }),
          ],
        }),
        E.jsx('p', {
          className: qt.paletteHint,
          children:
            m === null
              ? '隣接マスをタップで移動。アイコンを選ぶとマップに書き込めます。'
              : m === 'erase'
                ? 'マップ上のマスをタップでアイコンを消去。'
                : 'マップ上の探索済みマスをタップでアイコンを配置（再タップで消去）。',
        }),
        Y &&
          E.jsx('button', {
            type: 'button',
            className: qt.stairs,
            onClick: () => void _(),
            children:
              Y === 'stairsUp'
                ? '▲ 次の階へ進む'
                : p.depth <= 1
                  ? '▼ 拠点へ戻る'
                  : '▼ 前の階へ戻る',
          }),
        E.jsxs('div', {
          className: qt.controls,
          children: [
            E.jsxs('div', {
              className: qt.row,
              children: [
                E.jsx('button', {
                  type: 'button',
                  className: qt.turn,
                  onClick: () => T(py(p.dir)),
                  'aria-label': '左を向く',
                  children: '↰',
                }),
                E.jsx('button', {
                  type: 'button',
                  className: qt.forward,
                  onClick: () => y(p.dir),
                  children: '前進',
                }),
                E.jsx('button', {
                  type: 'button',
                  className: qt.turn,
                  onClick: () => T(yy(p.dir)),
                  'aria-label': '右を向く',
                  children: '↱',
                }),
              ],
            }),
            E.jsx('button', {
              type: 'button',
              className: qt.back,
              onClick: () => T(e_(p.dir)),
              'aria-label': '振り向く',
              children: '↻ 振り向く',
            }),
          ],
        }),
      ],
    });
  },
  Ob = '_layout_1k2ki_1',
  jb = '_head_1k2ki_12',
  Ub = '_title_1k2ki_19',
  wb = '_count_1k2ki_25',
  Bb = '_create_1k2ki_30',
  kb = '_sectionTitle_1k2ki_41',
  Hb = '_field_1k2ki_47',
  Lb = '_primary_1k2ki_63',
  qb = '_list_1k2ki_78',
  Gb = '_empty_1k2ki_82',
  Yb = '_members_1k2ki_87',
  Xb = '_member_1k2ki_87',
  Qb = '_memberName_1k2ki_106',
  Vb = '_memberSub_1k2ki_111',
  Zb = '_foot_1k2ki_116',
  Kb = '_sub_1k2ki_120',
  Kt = {
    layout: Ob,
    head: jb,
    title: Ub,
    count: wb,
    create: Bb,
    sectionTitle: kb,
    field: Hb,
    primary: Lb,
    list: qb,
    empty: Gb,
    members: Yb,
    member: Xb,
    memberName: Qb,
    memberSub: Vb,
    foot: Zb,
    sub: Kb,
  },
  Jb = () => {
    const u = oa(),
      { save: c, applyAndPersist: f } = yu(),
      s = Object.keys(Ia),
      r = Object.keys(Pa),
      [m, v] = A.useState(''),
      [p, h] = A.useState(s[0]),
      [y, T] = A.useState(r[0]),
      [_, M] = A.useState(!1),
      G = A.useCallback(async () => {
        const j = m.trim() || '名もなき冒険者',
          O = b_({ raceId: p, classId: y, name: j });
        (M(!0), await f((X) => T_(X, O)), v(''), M(!1));
      }, [m, p, y, f]);
    if (!c) return E.jsx(tn, { to: '/title', replace: !0 });
    const { members: Y } = c.guild,
      B = Y.length >= Of;
    return E.jsxs('div', {
      className: Kt.layout,
      children: [
        E.jsxs('header', {
          className: Kt.head,
          children: [
            E.jsx('h1', { className: Kt.title, children: 'ギルド管理' }),
            E.jsxs('span', { className: Kt.count, children: ['団員 ', Y.length, ' / ', Of] }),
          ],
        }),
        E.jsxs('section', {
          className: Kt.create,
          children: [
            E.jsx('h2', { className: Kt.sectionTitle, children: '冒険者を作成' }),
            E.jsxs('label', {
              className: Kt.field,
              children: [
                E.jsx('span', { children: '名前' }),
                E.jsx('input', {
                  type: 'text',
                  value: m,
                  maxLength: 16,
                  placeholder: '名もなき冒険者',
                  onChange: (j) => v(j.target.value),
                }),
              ],
            }),
            E.jsxs('label', {
              className: Kt.field,
              children: [
                E.jsx('span', { children: '種族' }),
                E.jsx('select', {
                  value: p,
                  onChange: (j) => h(j.target.value),
                  children: s.map((j) => E.jsx('option', { value: j, children: Ia[j].name }, j)),
                }),
              ],
            }),
            E.jsxs('label', {
              className: Kt.field,
              children: [
                E.jsx('span', { children: '職業' }),
                E.jsx('select', {
                  value: y,
                  onChange: (j) => T(j.target.value),
                  children: r.map((j) => E.jsx('option', { value: j, children: Pa[j].name }, j)),
                }),
              ],
            }),
            E.jsx('button', {
              type: 'button',
              className: Kt.primary,
              disabled: _ || B,
              onClick: () => void G(),
              children: B ? '団員が上限です' : '作成する',
            }),
          ],
        }),
        E.jsxs('section', {
          className: Kt.list,
          children: [
            E.jsx('h2', { className: Kt.sectionTitle, children: '団員一覧' }),
            Y.length === 0
              ? E.jsx('p', { className: Kt.empty, children: 'まだ冒険者がいません。' })
              : E.jsx('ul', {
                  className: Kt.members,
                  children: Y.map((j) => {
                    var O, X;
                    return E.jsxs(
                      'li',
                      {
                        className: Kt.member,
                        children: [
                          E.jsx('span', { className: Kt.memberName, children: j.name }),
                          E.jsxs('span', {
                            className: Kt.memberSub,
                            children: [
                              (O = Ia[j.raceId]) == null ? void 0 : O.name,
                              ' / ',
                              (X = Pa[j.classId]) == null ? void 0 : X.name,
                              ' / Lv',
                              j.level,
                            ],
                          }),
                        ],
                      },
                      j.id
                    );
                  }),
                }),
          ],
        }),
        E.jsx('footer', {
          className: Kt.foot,
          children: E.jsx('button', {
            type: 'button',
            className: Kt.sub,
            onClick: () => u('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  $b = () => E.jsx('div', { children: E.jsx('h1', { children: 'Not Found' }) }),
  Wb = '_layout_1xkiw_1',
  Fb = '_head_1xkiw_12',
  Ib = '_title_1xkiw_17',
  Pb = '_subtitle_1xkiw_24',
  tS = '_body_1xkiw_30',
  eS = '_menu_1xkiw_34',
  lS = '_loading_1xkiw_40',
  aS = '_warn_1xkiw_45',
  nS = '_danger_1xkiw_52',
  uS = '_dialog_1xkiw_67',
  iS = '_dialogTitle_1xkiw_77',
  cS = '_field_1xkiw_82',
  sS = '_note_1xkiw_96',
  fS = '_dialogActions_1xkiw_102',
  oS = '_primary_1xkiw_107',
  rS = '_sub_1xkiw_24',
  dS = '_foot_1xkiw_132',
  Ut = {
    layout: Wb,
    head: Fb,
    title: Ib,
    subtitle: Pb,
    body: tS,
    menu: eS,
    loading: lS,
    warn: aS,
    danger: nS,
    dialog: uS,
    dialogTitle: iS,
    field: cS,
    note: sS,
    dialogActions: fS,
    primary: oS,
    sub: rS,
    foot: dS,
  },
  mS = '_card_3vsn6_1',
  hS = '_corrupted_3vsn6_14',
  yS = '_corruptedText_3vsn6_19',
  pS = '_corruptedNote_3vsn6_25',
  vS = '_guildName_3vsn6_31',
  gS = '_meta_3vsn6_36',
  Ll = {
    card: mS,
    corrupted: hS,
    corruptedText: yS,
    corruptedNote: pS,
    guildName: vS,
    meta: gS,
    continue: '_continue_3vsn6_56',
  },
  _S = (u) => {
    if (!u) return '-';
    const c = new Date(u),
      f = (s) => String(s).padStart(2, '0');
    return `${c.getFullYear()}/${f(c.getMonth() + 1)}/${f(c.getDate())} ${f(c.getHours())}:${f(c.getMinutes())}`;
  },
  bS = ({ meta: u, onContinue: c }) =>
    u.corrupted
      ? E.jsxs('div', {
          className: `${Ll.card} ${Ll.corrupted}`,
          children: [
            E.jsx('div', { className: Ll.corruptedText, children: 'セーブデータが破損しています' }),
            E.jsx('p', {
              className: Ll.corruptedNote,
              children: '「最初から」で新しく始められます。',
            }),
          ],
        })
      : E.jsxs('div', {
          className: Ll.card,
          children: [
            E.jsx('div', { className: Ll.guildName, children: u.guildName }),
            E.jsxs('dl', {
              className: Ll.meta,
              children: [
                E.jsxs('div', {
                  children: [
                    E.jsx('dt', { children: '最高到達階' }),
                    E.jsx('dd', {
                      children: u.deepestReached > 0 ? `${u.deepestReached}F` : '未踏破',
                    }),
                  ],
                }),
                E.jsxs('div', {
                  children: [
                    E.jsx('dt', { children: '団員' }),
                    E.jsxs('dd', { children: [u.memberCount, '人'] }),
                  ],
                }),
                E.jsxs('div', {
                  children: [
                    E.jsx('dt', { children: '最終セーブ' }),
                    E.jsx('dd', { children: _S(u.savedAt) }),
                  ],
                }),
              ],
            }),
            E.jsx('button', {
              type: 'button',
              className: Ll.continue,
              onClick: c,
              children: 'つづきから',
            }),
          ],
        }),
  SS = () => {
    const u = oa(),
      { startNewGame: c, continueGame: f } = yu(),
      [s, r] = A.useState(null),
      [m, v] = A.useState(!0),
      [p, h] = A.useState('menu'),
      [y, T] = A.useState(''),
      [_, M] = A.useState(!1);
    A.useEffect(() => {
      (async () => (r(await Q_()), v(!1)))();
    }, []);
    const G = s !== null && !s.corrupted,
      Y = A.useCallback(async () => {
        M(!0);
        const O = await f();
        (M(!1), O.ok && u('/town'));
      }, [f, u]),
      B = A.useCallback(() => {
        (T(''), h(G ? 'confirm' : 'guildName'));
      }, [G]),
      j = A.useCallback(async () => {
        const O = y.trim() || 'ななしのギルド';
        (M(!0), await c(O), M(!1), u('/town'));
      }, [y, c, u]);
    return E.jsxs('div', {
      className: Ut.layout,
      children: [
        E.jsxs('header', {
          className: Ut.head,
          children: [
            E.jsx('h1', { className: Ut.title, children: '世界樹ライク' }),
            E.jsx('p', { className: Ut.subtitle, children: '無限タワー探索 RPG' }),
          ],
        }),
        E.jsx('main', {
          className: Ut.body,
          children: m
            ? E.jsx('p', { className: Ut.loading, children: '読み込み中...' })
            : p === 'guildName'
              ? E.jsxs('div', {
                  className: Ut.dialog,
                  children: [
                    E.jsx('h2', { className: Ut.dialogTitle, children: '新しいギルド' }),
                    E.jsxs('label', {
                      className: Ut.field,
                      children: [
                        E.jsx('span', { children: 'ギルド名' }),
                        E.jsx('input', {
                          type: 'text',
                          value: y,
                          maxLength: 16,
                          placeholder: 'ななしのギルド',
                          onChange: (O) => T(O.target.value),
                          autoFocus: !0,
                        }),
                      ],
                    }),
                    E.jsx('p', {
                      className: Ut.note,
                      children:
                        '冒険者はまだいません。開始後、ギルドメニューで仲間を作成してください。',
                    }),
                    E.jsxs('div', {
                      className: Ut.dialogActions,
                      children: [
                        E.jsx('button', {
                          type: 'button',
                          className: Ut.primary,
                          disabled: _,
                          onClick: j,
                          children: 'はじめる',
                        }),
                        E.jsx('button', {
                          type: 'button',
                          className: Ut.sub,
                          disabled: _,
                          onClick: () => h('menu'),
                          children: 'もどる',
                        }),
                      ],
                    }),
                  ],
                })
              : p === 'confirm'
                ? E.jsxs('div', {
                    className: Ut.dialog,
                    children: [
                      E.jsx('h2', { className: Ut.dialogTitle, children: '最初から始めますか？' }),
                      E.jsxs('p', {
                        className: Ut.warn,
                        children: [
                          '現在のセーブデータ「',
                          s == null ? void 0 : s.guildName,
                          '」は上書きされ、元に戻せません。',
                        ],
                      }),
                      E.jsxs('div', {
                        className: Ut.dialogActions,
                        children: [
                          E.jsx('button', {
                            type: 'button',
                            className: Ut.danger,
                            disabled: _,
                            onClick: () => h('guildName'),
                            children: 'データを消して始める',
                          }),
                          E.jsx('button', {
                            type: 'button',
                            className: Ut.sub,
                            disabled: _,
                            onClick: () => h('menu'),
                            children: 'もどる',
                          }),
                        ],
                      }),
                    ],
                  })
                : E.jsxs('div', {
                    className: Ut.menu,
                    children: [
                      s !== null && E.jsx(bS, { meta: s, onContinue: () => void Y() }),
                      E.jsx('button', {
                        type: 'button',
                        className: G ? Ut.sub : Ut.primary,
                        onClick: B,
                        children: '最初から',
                      }),
                    ],
                  }),
        }),
        E.jsxs('footer', { className: Ut.foot, children: ['v', '0.1.7'] }),
      ],
    });
  },
  ES = '_layout_1wdo2_1',
  TS = '_head_1wdo2_12',
  xS = '_guildName_1wdo2_16',
  AS = '_stats_1wdo2_21',
  MS = '_hint_1wdo2_40',
  NS = '_menu_1wdo2_50',
  CS = '_foot_1wdo2_57',
  RS = '_exit_1wdo2_61',
  ql = { layout: ES, head: TS, guildName: xS, stats: AS, hint: MS, menu: NS, foot: CS, exit: RS },
  zS = '_button_1tp4a_1',
  DS = '_primary_1tp4a_26',
  OS = '_label_1tp4a_32',
  jS = '_description_1tp4a_37',
  wi = { button: zS, primary: DS, label: OS, description: jS },
  iu = ({ label: u, description: c, variant: f = 'default', disabled: s = !1, onClick: r }) =>
    E.jsxs('button', {
      type: 'button',
      className: `${wi.button} ${f === 'primary' ? wi.primary : ''}`,
      disabled: s,
      onClick: r,
      children: [
        E.jsx('span', { className: wi.label, children: u }),
        c ? E.jsx('span', { className: wi.description, children: c }) : null,
      ],
    }),
  US = () => {
    const u = oa(),
      { save: c, exitToTitle: f, applyAndPersist: s } = yu();
    if (!c) return E.jsx(tn, { to: '/title', replace: !0 });
    const { guild: r, towerState: m, diveState: v } = c,
      p = r.members.length > 0,
      h = () => {
        (f(), u('/title'));
      },
      y = async () => {
        (v || (await s((T) => f_(T, 1))), u('/dungeon'));
      };
    return E.jsxs('div', {
      className: ql.layout,
      children: [
        E.jsxs('header', {
          className: ql.head,
          children: [
            E.jsx('div', { className: ql.guildName, children: r.name }),
            E.jsxs('dl', {
              className: ql.stats,
              children: [
                E.jsxs('div', {
                  children: [
                    E.jsx('dt', { children: '所持金' }),
                    E.jsxs('dd', { children: [r.gold, ' G'] }),
                  ],
                }),
                E.jsxs('div', {
                  children: [
                    E.jsx('dt', { children: '最高到達' }),
                    E.jsx('dd', {
                      children: m.record.deepestReached > 0 ? `${m.record.deepestReached}F` : '-',
                    }),
                  ],
                }),
                E.jsxs('div', {
                  children: [
                    E.jsx('dt', { children: '団員' }),
                    E.jsxs('dd', { children: [r.members.length, '人'] }),
                  ],
                }),
              ],
            }),
          ],
        }),
        !p &&
          E.jsx('p', {
            className: ql.hint,
            children:
              'まずは「ギルド管理」で冒険者を作成してください。団員がいないとダイブできません。',
          }),
        E.jsxs('main', {
          className: ql.menu,
          children: [
            E.jsx(iu, {
              label: v ? '潜行を再開' : 'ダイブ開始',
              description: p
                ? v
                  ? `${v.depth}F から再開`
                  : '第1階からタワーへ潜る'
                : '団員が必要です',
              variant: 'primary',
              disabled: !p,
              onClick: () => void y(),
            }),
            E.jsx(iu, {
              label: 'ギルド管理',
              description: '編成・キャラ作成',
              onClick: () => u('/guild'),
            }),
            E.jsx(iu, {
              label: 'ショップ',
              description: '装備・アイテム売買（Phase 3）',
              disabled: !0,
            }),
            E.jsx(iu, { label: '鍛冶屋', description: '武器強化（Phase 4）', disabled: !0 }),
            E.jsx(iu, {
              label: '図鑑 / 記録',
              description: '到達記録・図鑑（Phase 4-5）',
              disabled: !0,
            }),
          ],
        }),
        E.jsx('footer', {
          className: ql.foot,
          children: E.jsx('button', {
            type: 'button',
            className: ql.exit,
            onClick: h,
            children: 'タイトルへ戻る',
          }),
        }),
      ],
    });
  };
function wS() {
  return E.jsxs(ig, {
    children: [
      E.jsx(Gl, { path: '/', element: E.jsx(tn, { to: '/title', replace: !0 }) }),
      E.jsx(Gl, { path: '/title', element: E.jsx(SS, {}) }),
      E.jsx(Gl, { path: '/town', element: E.jsx(US, {}) }),
      E.jsx(Gl, { path: '/guild', element: E.jsx(Jb, {}) }),
      E.jsx(Gl, { path: '/dungeon', element: E.jsx(Db, {}) }),
      E.jsx(Gl, { path: '/battle', element: E.jsx(J_, {}) }),
      E.jsx(Gl, { path: '*', element: E.jsx($b, {}) }),
    ],
  });
}
const BS = {
    item_potion: { id: 'item_potion', name: 'やくそう', description: 'HP を少し回復する。' },
    item_tp_herb: { id: 'item_tp_herb', name: 'まほうのは', description: 'TP を少し回復する。' },
    item_return_thread: {
      id: 'item_return_thread',
      name: '帰還の糸',
      description: '使用すると拠点へ帰還する。',
    },
  },
  kS = { races: Ia, classes: Pa, titles: oy, skills: iy, enemies: hu, items: BS, equipment: sy },
  HS = /^[a-z]+_[a-z0-9_]+$/;
function sa(u, c, f) {
  for (const s of c)
    HS.test(s) || f.push(`[${u}] ID 命名規約違反: "${s}"（期待: <domain>_<name>）`);
}
function Rf(u, c, f, s) {
  const r = new Set(c.skills.map((m) => m.skillId));
  for (const m of c.skills) {
    f.has(m.skillId) || s.push(`[${u}] 未定義スキルを参照: "${m.skillId}"`);
    for (const v of m.requires ?? [])
      r.has(v.skillId) ||
        s.push(`[${u}] スキル "${m.skillId}" の前提 "${v.skillId}" が同ツリーに存在しない`);
  }
}
function LS() {
  const u = [],
    { races: c, classes: f, titles: s, skills: r, enemies: m, items: v, equipment: p } = kS;
  (sa('races', Object.keys(c), u),
    sa('classes', Object.keys(f), u),
    sa('titles', Object.keys(s), u),
    sa('skills', Object.keys(r), u),
    sa('enemies', Object.keys(m), u),
    sa('items', Object.keys(v), u),
    sa('equipment', Object.keys(p), u));
  const h = (M, G) => {
    for (const [Y, B] of Object.entries(G))
      Y !== B.id && u.push(`[${M}] キー "${Y}" と id "${B.id}" が不一致`);
  };
  (h('races', c),
    h('classes', f),
    h('titles', s),
    h('skills', r),
    h('enemies', m),
    h('items', v),
    h('equipment', p));
  const y = new Set(Object.keys(r)),
    T = new Set(Object.keys(f)),
    _ = new Set(Object.keys(s));
  for (const M of Object.values(c))
    (T.has(M.defaultClassId) ||
      u.push(`[races] "${M.id}" の defaultClassId "${M.defaultClassId}" が未定義`),
      Rf(`races/${M.id}`, M.unionSkillTree, y, u));
  for (const M of Object.values(f)) {
    Rf(`classes/${M.id}`, M.skillTree, y, u);
    for (const G of M.titleOptions) {
      if (!_.has(G)) {
        u.push(`[classes] "${M.id}" の称号 "${G}" が未定義`);
        continue;
      }
      s[G].parentClassId !== M.id &&
        u.push(`[classes] 称号 "${G}" の parentClassId が "${M.id}" と不一致`);
    }
  }
  for (const M of Object.values(s))
    (T.has(M.parentClassId) ||
      u.push(`[titles] "${M.id}" の parentClassId "${M.parentClassId}" が未定義`),
      Rf(`titles/${M.id}`, M.skillTree, y, u));
  for (const M of Object.values(p))
    (M.slot === 'weapon' &&
      !M.weaponType &&
      u.push(`[equipment] "${M.id}" は weapon だが weaponType が未設定`),
      M.slot === 'armor' &&
        !M.armorType &&
        u.push(`[equipment] "${M.id}" は armor だが armorType が未設定`));
  return { ok: u.length === 0, errors: u };
}
const qh = LS();
qh.ok || console.error('マスターデータ検証エラー:', qh.errors);
const Cy = document.getElementById('root');
if (!Cy) throw new Error('Failed to find #root element');
f0.createRoot(Cy).render(
  E.jsx(zg, { basename: '/sekaiju-like-game', children: E.jsx(K_, { children: E.jsx(wS, {}) }) })
);
