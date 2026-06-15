var Bv = Object.defineProperty;
var qv = (l, i, o) =>
  i in l ? Bv(l, i, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (l[i] = o);
var Ju = (l, i, o) => qv(l, typeof i != 'symbol' ? i + '' : i, o);
(function () {
  const i = document.createElement('link').relList;
  if (i && i.supports && i.supports('modulepreload')) return;
  for (const c of document.querySelectorAll('link[rel="modulepreload"]')) r(c);
  new MutationObserver((c) => {
    for (const d of c)
      if (d.type === 'childList')
        for (const _ of d.addedNodes) _.tagName === 'LINK' && _.rel === 'modulepreload' && r(_);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(c) {
    const d = {};
    return (
      c.integrity && (d.integrity = c.integrity),
      c.referrerPolicy && (d.referrerPolicy = c.referrerPolicy),
      c.crossOrigin === 'use-credentials'
        ? (d.credentials = 'include')
        : c.crossOrigin === 'anonymous'
          ? (d.credentials = 'omit')
          : (d.credentials = 'same-origin'),
      d
    );
  }
  function r(c) {
    if (c.ep) return;
    c.ep = !0;
    const d = o(c);
    fetch(c.href, d);
  }
})();
var Pu = { exports: {} },
  Ci = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var lp;
function Ov() {
  if (lp) return Ci;
  lp = 1;
  var l = Symbol.for('react.transitional.element'),
    i = Symbol.for('react.fragment');
  function o(r, c, d) {
    var _ = null;
    if ((d !== void 0 && (_ = '' + d), c.key !== void 0 && (_ = '' + c.key), 'key' in c)) {
      d = {};
      for (var h in c) h !== 'key' && (d[h] = c[h]);
    } else d = c;
    return ((c = d.ref), { $$typeof: l, type: r, key: _, ref: c !== void 0 ? c : null, props: d });
  }
  return ((Ci.Fragment = i), (Ci.jsx = o), (Ci.jsxs = o), Ci);
}
var ap;
function Iv() {
  return (ap || ((ap = 1), (Pu.exports = Ov())), Pu.exports);
}
var f = Iv(),
  Wu = { exports: {} },
  Ni = {},
  Fu = { exports: {} },
  ec = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var np;
function Dv() {
  return (
    np ||
      ((np = 1),
      (function (l) {
        function i(j, Q) {
          var U = j.length;
          j.push(Q);
          e: for (; 0 < U; ) {
            var K = (U - 1) >>> 1,
              ie = j[K];
            if (0 < c(ie, Q)) ((j[K] = Q), (j[U] = ie), (U = K));
            else break e;
          }
        }
        function o(j) {
          return j.length === 0 ? null : j[0];
        }
        function r(j) {
          if (j.length === 0) return null;
          var Q = j[0],
            U = j.pop();
          if (U !== Q) {
            j[0] = U;
            e: for (var K = 0, ie = j.length, w = ie >>> 1; K < w; ) {
              var R = 2 * (K + 1) - 1,
                Z = j[R],
                F = R + 1,
                le = j[F];
              if (0 > c(Z, U))
                F < ie && 0 > c(le, Z)
                  ? ((j[K] = le), (j[F] = U), (K = F))
                  : ((j[K] = Z), (j[R] = U), (K = R));
              else if (F < ie && 0 > c(le, U)) ((j[K] = le), (j[F] = U), (K = F));
              else break e;
            }
          }
          return Q;
        }
        function c(j, Q) {
          var U = j.sortIndex - Q.sortIndex;
          return U !== 0 ? U : j.id - Q.id;
        }
        if (
          ((l.unstable_now = void 0),
          typeof performance == 'object' && typeof performance.now == 'function')
        ) {
          var d = performance;
          l.unstable_now = function () {
            return d.now();
          };
        } else {
          var _ = Date,
            h = _.now();
          l.unstable_now = function () {
            return _.now() - h;
          };
        }
        var k = [],
          p = [],
          v = 1,
          y = null,
          S = 3,
          q = !1,
          b = !1,
          L = !1,
          C = !1,
          T = typeof setTimeout == 'function' ? setTimeout : null,
          A = typeof clearTimeout == 'function' ? clearTimeout : null,
          M = typeof setImmediate < 'u' ? setImmediate : null;
        function P(j) {
          for (var Q = o(p); Q !== null; ) {
            if (Q.callback === null) r(p);
            else if (Q.startTime <= j) (r(p), (Q.sortIndex = Q.expirationTime), i(k, Q));
            else break;
            Q = o(p);
          }
        }
        function J(j) {
          if (((L = !1), P(j), !b))
            if (o(k) !== null) ((b = !0), V || ((V = !0), fe()));
            else {
              var Q = o(p);
              Q !== null && he(J, Q.startTime - j);
            }
        }
        var V = !1,
          H = -1,
          W = 5,
          ne = -1;
        function te() {
          return C ? !0 : !(l.unstable_now() - ne < W);
        }
        function oe() {
          if (((C = !1), V)) {
            var j = l.unstable_now();
            ne = j;
            var Q = !0;
            try {
              e: {
                ((b = !1), L && ((L = !1), A(H), (H = -1)), (q = !0));
                var U = S;
                try {
                  t: {
                    for (P(j), y = o(k); y !== null && !(y.expirationTime > j && te()); ) {
                      var K = y.callback;
                      if (typeof K == 'function') {
                        ((y.callback = null), (S = y.priorityLevel));
                        var ie = K(y.expirationTime <= j);
                        if (((j = l.unstable_now()), typeof ie == 'function')) {
                          ((y.callback = ie), P(j), (Q = !0));
                          break t;
                        }
                        (y === o(k) && r(k), P(j));
                      } else r(k);
                      y = o(k);
                    }
                    if (y !== null) Q = !0;
                    else {
                      var w = o(p);
                      (w !== null && he(J, w.startTime - j), (Q = !1));
                    }
                  }
                  break e;
                } finally {
                  ((y = null), (S = U), (q = !1));
                }
                Q = void 0;
              }
            } finally {
              Q ? fe() : (V = !1);
            }
          }
        }
        var fe;
        if (typeof M == 'function')
          fe = function () {
            M(oe);
          };
        else if (typeof MessageChannel < 'u') {
          var ke = new MessageChannel(),
            xe = ke.port2;
          ((ke.port1.onmessage = oe),
            (fe = function () {
              xe.postMessage(null);
            }));
        } else
          fe = function () {
            T(oe, 0);
          };
        function he(j, Q) {
          H = T(function () {
            j(l.unstable_now());
          }, Q);
        }
        ((l.unstable_IdlePriority = 5),
          (l.unstable_ImmediatePriority = 1),
          (l.unstable_LowPriority = 4),
          (l.unstable_NormalPriority = 3),
          (l.unstable_Profiling = null),
          (l.unstable_UserBlockingPriority = 2),
          (l.unstable_cancelCallback = function (j) {
            j.callback = null;
          }),
          (l.unstable_forceFrameRate = function (j) {
            0 > j || 125 < j
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (W = 0 < j ? Math.floor(1e3 / j) : 5);
          }),
          (l.unstable_getCurrentPriorityLevel = function () {
            return S;
          }),
          (l.unstable_next = function (j) {
            switch (S) {
              case 1:
              case 2:
              case 3:
                var Q = 3;
                break;
              default:
                Q = S;
            }
            var U = S;
            S = Q;
            try {
              return j();
            } finally {
              S = U;
            }
          }),
          (l.unstable_requestPaint = function () {
            C = !0;
          }),
          (l.unstable_runWithPriority = function (j, Q) {
            switch (j) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                j = 3;
            }
            var U = S;
            S = j;
            try {
              return Q();
            } finally {
              S = U;
            }
          }),
          (l.unstable_scheduleCallback = function (j, Q, U) {
            var K = l.unstable_now();
            switch (
              (typeof U == 'object' && U !== null
                ? ((U = U.delay), (U = typeof U == 'number' && 0 < U ? K + U : K))
                : (U = K),
              j)
            ) {
              case 1:
                var ie = -1;
                break;
              case 2:
                ie = 250;
                break;
              case 5:
                ie = 1073741823;
                break;
              case 4:
                ie = 1e4;
                break;
              default:
                ie = 5e3;
            }
            return (
              (ie = U + ie),
              (j = {
                id: v++,
                callback: Q,
                priorityLevel: j,
                startTime: U,
                expirationTime: ie,
                sortIndex: -1,
              }),
              U > K
                ? ((j.sortIndex = U),
                  i(p, j),
                  o(k) === null && j === o(p) && (L ? (A(H), (H = -1)) : (L = !0), he(J, U - K)))
                : ((j.sortIndex = ie), i(k, j), b || q || ((b = !0), V || ((V = !0), fe()))),
              j
            );
          }),
          (l.unstable_shouldYield = te),
          (l.unstable_wrapCallback = function (j) {
            var Q = S;
            return function () {
              var U = S;
              S = Q;
              try {
                return j.apply(this, arguments);
              } finally {
                S = U;
              }
            };
          }));
      })(ec)),
    ec
  );
}
var ip;
function Rv() {
  return (ip || ((ip = 1), (Fu.exports = Dv())), Fu.exports);
}
var tc = { exports: {} },
  ge = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var sp;
function zv() {
  if (sp) return ge;
  sp = 1;
  var l = Symbol.for('react.transitional.element'),
    i = Symbol.for('react.portal'),
    o = Symbol.for('react.fragment'),
    r = Symbol.for('react.strict_mode'),
    c = Symbol.for('react.profiler'),
    d = Symbol.for('react.consumer'),
    _ = Symbol.for('react.context'),
    h = Symbol.for('react.forward_ref'),
    k = Symbol.for('react.suspense'),
    p = Symbol.for('react.memo'),
    v = Symbol.for('react.lazy'),
    y = Symbol.for('react.activity'),
    S = Symbol.iterator;
  function q(w) {
    return w === null || typeof w != 'object'
      ? null
      : ((w = (S && w[S]) || w['@@iterator']), typeof w == 'function' ? w : null);
  }
  var b = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    L = Object.assign,
    C = {};
  function T(w, R, Z) {
    ((this.props = w), (this.context = R), (this.refs = C), (this.updater = Z || b));
  }
  ((T.prototype.isReactComponent = {}),
    (T.prototype.setState = function (w, R) {
      if (typeof w != 'object' && typeof w != 'function' && w != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, w, R, 'setState');
    }),
    (T.prototype.forceUpdate = function (w) {
      this.updater.enqueueForceUpdate(this, w, 'forceUpdate');
    }));
  function A() {}
  A.prototype = T.prototype;
  function M(w, R, Z) {
    ((this.props = w), (this.context = R), (this.refs = C), (this.updater = Z || b));
  }
  var P = (M.prototype = new A());
  ((P.constructor = M), L(P, T.prototype), (P.isPureReactComponent = !0));
  var J = Array.isArray;
  function V() {}
  var H = { H: null, A: null, T: null, S: null },
    W = Object.prototype.hasOwnProperty;
  function ne(w, R, Z) {
    var F = Z.ref;
    return { $$typeof: l, type: w, key: R, ref: F !== void 0 ? F : null, props: Z };
  }
  function te(w, R) {
    return ne(w.type, R, w.props);
  }
  function oe(w) {
    return typeof w == 'object' && w !== null && w.$$typeof === l;
  }
  function fe(w) {
    var R = { '=': '=0', ':': '=2' };
    return (
      '$' +
      w.replace(/[=:]/g, function (Z) {
        return R[Z];
      })
    );
  }
  var ke = /\/+/g;
  function xe(w, R) {
    return typeof w == 'object' && w !== null && w.key != null ? fe('' + w.key) : R.toString(36);
  }
  function he(w) {
    switch (w.status) {
      case 'fulfilled':
        return w.value;
      case 'rejected':
        throw w.reason;
      default:
        switch (
          (typeof w.status == 'string'
            ? w.then(V, V)
            : ((w.status = 'pending'),
              w.then(
                function (R) {
                  w.status === 'pending' && ((w.status = 'fulfilled'), (w.value = R));
                },
                function (R) {
                  w.status === 'pending' && ((w.status = 'rejected'), (w.reason = R));
                }
              )),
          w.status)
        ) {
          case 'fulfilled':
            return w.value;
          case 'rejected':
            throw w.reason;
        }
    }
    throw w;
  }
  function j(w, R, Z, F, le) {
    var ce = typeof w;
    (ce === 'undefined' || ce === 'boolean') && (w = null);
    var be = !1;
    if (w === null) be = !0;
    else
      switch (ce) {
        case 'bigint':
        case 'string':
        case 'number':
          be = !0;
          break;
        case 'object':
          switch (w.$$typeof) {
            case l:
            case i:
              be = !0;
              break;
            case v:
              return ((be = w._init), j(be(w._payload), R, Z, F, le));
          }
      }
    if (be)
      return (
        (le = le(w)),
        (be = F === '' ? '.' + xe(w, 0) : F),
        J(le)
          ? ((Z = ''),
            be != null && (Z = be.replace(ke, '$&/') + '/'),
            j(le, R, Z, '', function (G) {
              return G;
            }))
          : le != null &&
            (oe(le) &&
              (le = te(
                le,
                Z +
                  (le.key == null || (w && w.key === le.key)
                    ? ''
                    : ('' + le.key).replace(ke, '$&/') + '/') +
                  be
              )),
            R.push(le)),
        1
      );
    be = 0;
    var et = F === '' ? '.' : F + ':';
    if (J(w))
      for (var Ge = 0; Ge < w.length; Ge++)
        ((F = w[Ge]), (ce = et + xe(F, Ge)), (be += j(F, R, Z, ce, le)));
    else if (((Ge = q(w)), typeof Ge == 'function'))
      for (w = Ge.call(w), Ge = 0; !(F = w.next()).done; )
        ((F = F.value), (ce = et + xe(F, Ge++)), (be += j(F, R, Z, ce, le)));
    else if (ce === 'object') {
      if (typeof w.then == 'function') return j(he(w), R, Z, F, le);
      throw (
        (R = String(w)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (R === '[object Object]' ? 'object with keys {' + Object.keys(w).join(', ') + '}' : R) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return be;
  }
  function Q(w, R, Z) {
    if (w == null) return w;
    var F = [],
      le = 0;
    return (
      j(w, F, '', '', function (ce) {
        return R.call(Z, ce, le++);
      }),
      F
    );
  }
  function U(w) {
    if (w._status === -1) {
      var R = w._result;
      ((R = R()),
        R.then(
          function (Z) {
            (w._status === 0 || w._status === -1) && ((w._status = 1), (w._result = Z));
          },
          function (Z) {
            (w._status === 0 || w._status === -1) && ((w._status = 2), (w._result = Z));
          }
        ),
        w._status === -1 && ((w._status = 0), (w._result = R)));
    }
    if (w._status === 1) return w._result.default;
    throw w._result;
  }
  var K =
      typeof reportError == 'function'
        ? reportError
        : function (w) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var R = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof w == 'object' && w !== null && typeof w.message == 'string'
                    ? String(w.message)
                    : String(w),
                error: w,
              });
              if (!window.dispatchEvent(R)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', w);
              return;
            }
            console.error(w);
          },
    ie = {
      map: Q,
      forEach: function (w, R, Z) {
        Q(
          w,
          function () {
            R.apply(this, arguments);
          },
          Z
        );
      },
      count: function (w) {
        var R = 0;
        return (
          Q(w, function () {
            R++;
          }),
          R
        );
      },
      toArray: function (w) {
        return (
          Q(w, function (R) {
            return R;
          }) || []
        );
      },
      only: function (w) {
        if (!oe(w))
          throw Error('React.Children.only expected to receive a single React element child.');
        return w;
      },
    };
  return (
    (ge.Activity = y),
    (ge.Children = ie),
    (ge.Component = T),
    (ge.Fragment = o),
    (ge.Profiler = c),
    (ge.PureComponent = M),
    (ge.StrictMode = r),
    (ge.Suspense = k),
    (ge.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = H),
    (ge.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (w) {
        return H.H.useMemoCache(w);
      },
    }),
    (ge.cache = function (w) {
      return function () {
        return w.apply(null, arguments);
      };
    }),
    (ge.cacheSignal = function () {
      return null;
    }),
    (ge.cloneElement = function (w, R, Z) {
      if (w == null) throw Error('The argument must be a React element, but you passed ' + w + '.');
      var F = L({}, w.props),
        le = w.key;
      if (R != null)
        for (ce in (R.key !== void 0 && (le = '' + R.key), R))
          !W.call(R, ce) ||
            ce === 'key' ||
            ce === '__self' ||
            ce === '__source' ||
            (ce === 'ref' && R.ref === void 0) ||
            (F[ce] = R[ce]);
      var ce = arguments.length - 2;
      if (ce === 1) F.children = Z;
      else if (1 < ce) {
        for (var be = Array(ce), et = 0; et < ce; et++) be[et] = arguments[et + 2];
        F.children = be;
      }
      return ne(w.type, le, F);
    }),
    (ge.createContext = function (w) {
      return (
        (w = {
          $$typeof: _,
          _currentValue: w,
          _currentValue2: w,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (w.Provider = w),
        (w.Consumer = { $$typeof: d, _context: w }),
        w
      );
    }),
    (ge.createElement = function (w, R, Z) {
      var F,
        le = {},
        ce = null;
      if (R != null)
        for (F in (R.key !== void 0 && (ce = '' + R.key), R))
          W.call(R, F) && F !== 'key' && F !== '__self' && F !== '__source' && (le[F] = R[F]);
      var be = arguments.length - 2;
      if (be === 1) le.children = Z;
      else if (1 < be) {
        for (var et = Array(be), Ge = 0; Ge < be; Ge++) et[Ge] = arguments[Ge + 2];
        le.children = et;
      }
      if (w && w.defaultProps)
        for (F in ((be = w.defaultProps), be)) le[F] === void 0 && (le[F] = be[F]);
      return ne(w, ce, le);
    }),
    (ge.createRef = function () {
      return { current: null };
    }),
    (ge.forwardRef = function (w) {
      return { $$typeof: h, render: w };
    }),
    (ge.isValidElement = oe),
    (ge.lazy = function (w) {
      return { $$typeof: v, _payload: { _status: -1, _result: w }, _init: U };
    }),
    (ge.memo = function (w, R) {
      return { $$typeof: p, type: w, compare: R === void 0 ? null : R };
    }),
    (ge.startTransition = function (w) {
      var R = H.T,
        Z = {};
      H.T = Z;
      try {
        var F = w(),
          le = H.S;
        (le !== null && le(Z, F),
          typeof F == 'object' && F !== null && typeof F.then == 'function' && F.then(V, K));
      } catch (ce) {
        K(ce);
      } finally {
        (R !== null && Z.types !== null && (R.types = Z.types), (H.T = R));
      }
    }),
    (ge.unstable_useCacheRefresh = function () {
      return H.H.useCacheRefresh();
    }),
    (ge.use = function (w) {
      return H.H.use(w);
    }),
    (ge.useActionState = function (w, R, Z) {
      return H.H.useActionState(w, R, Z);
    }),
    (ge.useCallback = function (w, R) {
      return H.H.useCallback(w, R);
    }),
    (ge.useContext = function (w) {
      return H.H.useContext(w);
    }),
    (ge.useDebugValue = function () {}),
    (ge.useDeferredValue = function (w, R) {
      return H.H.useDeferredValue(w, R);
    }),
    (ge.useEffect = function (w, R) {
      return H.H.useEffect(w, R);
    }),
    (ge.useEffectEvent = function (w) {
      return H.H.useEffectEvent(w);
    }),
    (ge.useId = function () {
      return H.H.useId();
    }),
    (ge.useImperativeHandle = function (w, R, Z) {
      return H.H.useImperativeHandle(w, R, Z);
    }),
    (ge.useInsertionEffect = function (w, R) {
      return H.H.useInsertionEffect(w, R);
    }),
    (ge.useLayoutEffect = function (w, R) {
      return H.H.useLayoutEffect(w, R);
    }),
    (ge.useMemo = function (w, R) {
      return H.H.useMemo(w, R);
    }),
    (ge.useOptimistic = function (w, R) {
      return H.H.useOptimistic(w, R);
    }),
    (ge.useReducer = function (w, R, Z) {
      return H.H.useReducer(w, R, Z);
    }),
    (ge.useRef = function (w) {
      return H.H.useRef(w);
    }),
    (ge.useState = function (w) {
      return H.H.useState(w);
    }),
    (ge.useSyncExternalStore = function (w, R, Z) {
      return H.H.useSyncExternalStore(w, R, Z);
    }),
    (ge.useTransition = function () {
      return H.H.useTransition();
    }),
    (ge.version = '19.2.5'),
    ge
  );
}
var rp;
function Bc() {
  return (rp || ((rp = 1), (tc.exports = zv())), tc.exports);
}
var lc = { exports: {} },
  vt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var op;
function Hv() {
  if (op) return vt;
  op = 1;
  var l = Bc();
  function i(k) {
    var p = 'https://react.dev/errors/' + k;
    if (1 < arguments.length) {
      p += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var v = 2; v < arguments.length; v++) p += '&args[]=' + encodeURIComponent(arguments[v]);
    }
    return (
      'Minified React error #' +
      k +
      '; visit ' +
      p +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function o() {}
  var r = {
      d: {
        f: o,
        r: function () {
          throw Error(i(522));
        },
        D: o,
        C: o,
        L: o,
        m: o,
        X: o,
        S: o,
        M: o,
      },
      p: 0,
      findDOMNode: null,
    },
    c = Symbol.for('react.portal');
  function d(k, p, v) {
    var y = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: y == null ? null : '' + y,
      children: k,
      containerInfo: p,
      implementation: v,
    };
  }
  var _ = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(k, p) {
    if (k === 'font') return '';
    if (typeof p == 'string') return p === 'use-credentials' ? p : '';
  }
  return (
    (vt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
    (vt.createPortal = function (k, p) {
      var v = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!p || (p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)) throw Error(i(299));
      return d(k, p, null, v);
    }),
    (vt.flushSync = function (k) {
      var p = _.T,
        v = r.p;
      try {
        if (((_.T = null), (r.p = 2), k)) return k();
      } finally {
        ((_.T = p), (r.p = v), r.d.f());
      }
    }),
    (vt.preconnect = function (k, p) {
      typeof k == 'string' &&
        (p
          ? ((p = p.crossOrigin),
            (p = typeof p == 'string' ? (p === 'use-credentials' ? p : '') : void 0))
          : (p = null),
        r.d.C(k, p));
    }),
    (vt.prefetchDNS = function (k) {
      typeof k == 'string' && r.d.D(k);
    }),
    (vt.preinit = function (k, p) {
      if (typeof k == 'string' && p && typeof p.as == 'string') {
        var v = p.as,
          y = h(v, p.crossOrigin),
          S = typeof p.integrity == 'string' ? p.integrity : void 0,
          q = typeof p.fetchPriority == 'string' ? p.fetchPriority : void 0;
        v === 'style'
          ? r.d.S(k, typeof p.precedence == 'string' ? p.precedence : void 0, {
              crossOrigin: y,
              integrity: S,
              fetchPriority: q,
            })
          : v === 'script' &&
            r.d.X(k, {
              crossOrigin: y,
              integrity: S,
              fetchPriority: q,
              nonce: typeof p.nonce == 'string' ? p.nonce : void 0,
            });
      }
    }),
    (vt.preinitModule = function (k, p) {
      if (typeof k == 'string')
        if (typeof p == 'object' && p !== null) {
          if (p.as == null || p.as === 'script') {
            var v = h(p.as, p.crossOrigin);
            r.d.M(k, {
              crossOrigin: v,
              integrity: typeof p.integrity == 'string' ? p.integrity : void 0,
              nonce: typeof p.nonce == 'string' ? p.nonce : void 0,
            });
          }
        } else p == null && r.d.M(k);
    }),
    (vt.preload = function (k, p) {
      if (typeof k == 'string' && typeof p == 'object' && p !== null && typeof p.as == 'string') {
        var v = p.as,
          y = h(v, p.crossOrigin);
        r.d.L(k, v, {
          crossOrigin: y,
          integrity: typeof p.integrity == 'string' ? p.integrity : void 0,
          nonce: typeof p.nonce == 'string' ? p.nonce : void 0,
          type: typeof p.type == 'string' ? p.type : void 0,
          fetchPriority: typeof p.fetchPriority == 'string' ? p.fetchPriority : void 0,
          referrerPolicy: typeof p.referrerPolicy == 'string' ? p.referrerPolicy : void 0,
          imageSrcSet: typeof p.imageSrcSet == 'string' ? p.imageSrcSet : void 0,
          imageSizes: typeof p.imageSizes == 'string' ? p.imageSizes : void 0,
          media: typeof p.media == 'string' ? p.media : void 0,
        });
      }
    }),
    (vt.preloadModule = function (k, p) {
      if (typeof k == 'string')
        if (p) {
          var v = h(p.as, p.crossOrigin);
          r.d.m(k, {
            as: typeof p.as == 'string' && p.as !== 'script' ? p.as : void 0,
            crossOrigin: v,
            integrity: typeof p.integrity == 'string' ? p.integrity : void 0,
          });
        } else r.d.m(k);
    }),
    (vt.requestFormReset = function (k) {
      r.d.r(k);
    }),
    (vt.unstable_batchedUpdates = function (k, p) {
      return k(p);
    }),
    (vt.useFormState = function (k, p, v) {
      return _.H.useFormState(k, p, v);
    }),
    (vt.useFormStatus = function () {
      return _.H.useHostTransitionStatus();
    }),
    (vt.version = '19.2.5'),
    vt
  );
}
var up;
function Uv() {
  if (up) return lc.exports;
  up = 1;
  function l() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (i) {
        console.error(i);
      }
  }
  return (l(), (lc.exports = Hv()), lc.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var cp;
function Gv() {
  if (cp) return Ni;
  cp = 1;
  var l = Rv(),
    i = Bc(),
    o = Uv();
  function r(e) {
    var t = 'https://react.dev/errors/' + e;
    if (1 < arguments.length) {
      t += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++) t += '&args[]=' + encodeURIComponent(arguments[a]);
    }
    return (
      'Minified React error #' +
      e +
      '; visit ' +
      t +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function c(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function d(e) {
    var t = e,
      a = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do ((t = e), (t.flags & 4098) !== 0 && (a = t.return), (e = t.return));
      while (e);
    }
    return t.tag === 3 ? a : null;
  }
  function _(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function h(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function k(e) {
    if (d(e) !== e) throw Error(r(188));
  }
  function p(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = d(e)), t === null)) throw Error(r(188));
      return t !== e ? null : e;
    }
    for (var a = e, n = t; ; ) {
      var s = a.return;
      if (s === null) break;
      var u = s.alternate;
      if (u === null) {
        if (((n = s.return), n !== null)) {
          a = n;
          continue;
        }
        break;
      }
      if (s.child === u.child) {
        for (u = s.child; u; ) {
          if (u === a) return (k(s), e);
          if (u === n) return (k(s), t);
          u = u.sibling;
        }
        throw Error(r(188));
      }
      if (a.return !== n.return) ((a = s), (n = u));
      else {
        for (var m = !1, g = s.child; g; ) {
          if (g === a) {
            ((m = !0), (a = s), (n = u));
            break;
          }
          if (g === n) {
            ((m = !0), (n = s), (a = u));
            break;
          }
          g = g.sibling;
        }
        if (!m) {
          for (g = u.child; g; ) {
            if (g === a) {
              ((m = !0), (a = u), (n = s));
              break;
            }
            if (g === n) {
              ((m = !0), (n = u), (a = s));
              break;
            }
            g = g.sibling;
          }
          if (!m) throw Error(r(189));
        }
      }
      if (a.alternate !== n) throw Error(r(190));
    }
    if (a.tag !== 3) throw Error(r(188));
    return a.stateNode.current === a ? e : t;
  }
  function v(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = v(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var y = Object.assign,
    S = Symbol.for('react.element'),
    q = Symbol.for('react.transitional.element'),
    b = Symbol.for('react.portal'),
    L = Symbol.for('react.fragment'),
    C = Symbol.for('react.strict_mode'),
    T = Symbol.for('react.profiler'),
    A = Symbol.for('react.consumer'),
    M = Symbol.for('react.context'),
    P = Symbol.for('react.forward_ref'),
    J = Symbol.for('react.suspense'),
    V = Symbol.for('react.suspense_list'),
    H = Symbol.for('react.memo'),
    W = Symbol.for('react.lazy'),
    ne = Symbol.for('react.activity'),
    te = Symbol.for('react.memo_cache_sentinel'),
    oe = Symbol.iterator;
  function fe(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (oe && e[oe]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var ke = Symbol.for('react.client.reference');
  function xe(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === ke ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case L:
        return 'Fragment';
      case T:
        return 'Profiler';
      case C:
        return 'StrictMode';
      case J:
        return 'Suspense';
      case V:
        return 'SuspenseList';
      case ne:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case b:
          return 'Portal';
        case M:
          return e.displayName || 'Context';
        case A:
          return (e._context.displayName || 'Context') + '.Consumer';
        case P:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case H:
          return ((t = e.displayName || null), t !== null ? t : xe(e.type) || 'Memo');
        case W:
          ((t = e._payload), (e = e._init));
          try {
            return xe(e(t));
          } catch {}
      }
    return null;
  }
  var he = Array.isArray,
    j = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Q = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    U = { pending: !1, data: null, method: null, action: null },
    K = [],
    ie = -1;
  function w(e) {
    return { current: e };
  }
  function R(e) {
    0 > ie || ((e.current = K[ie]), (K[ie] = null), ie--);
  }
  function Z(e, t) {
    (ie++, (K[ie] = e.current), (e.current = t));
  }
  var F = w(null),
    le = w(null),
    ce = w(null),
    be = w(null);
  function et(e, t) {
    switch ((Z(ce, t), Z(le, e), Z(F, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Tf(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) ((t = Tf(t)), (e = Ef(t, e)));
        else
          switch (e) {
            case 'svg':
              e = 1;
              break;
            case 'math':
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    (R(F), Z(F, e));
  }
  function Ge() {
    (R(F), R(le), R(ce));
  }
  function G(e) {
    e.memoizedState !== null && Z(be, e);
    var t = F.current,
      a = Ef(t, e.type);
    t !== a && (Z(le, e), Z(F, a));
  }
  function de(e) {
    (le.current === e && (R(F), R(le)), be.current === e && (R(be), (Si._currentValue = U)));
  }
  var pe, je;
  function Te(e) {
    if (pe === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        ((pe = (t && t[1]) || ''),
          (je =
            -1 <
            a.stack.indexOf(`
    at`)
              ? ' (<anonymous>)'
              : -1 < a.stack.indexOf('@')
                ? '@unknown:0:0'
                : ''));
      }
    return (
      `
` +
      pe +
      e +
      je
    );
  }
  var xt = !1;
  function Br(e, t) {
    if (!e || xt) return '';
    xt = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var X = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(X.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(X, []);
                } catch (z) {
                  var D = z;
                }
                Reflect.construct(e, [], X);
              } else {
                try {
                  X.call();
                } catch (z) {
                  D = z;
                }
                e.call(X.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (z) {
                D = z;
              }
              (X = e()) && typeof X.catch == 'function' && X.catch(function () {});
            }
          } catch (z) {
            if (z && D && typeof z.stack == 'string') return [z.stack, D.stack];
          }
          return [null, null];
        },
      };
      n.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
      var s = Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot, 'name');
      s &&
        s.configurable &&
        Object.defineProperty(n.DetermineComponentFrameRoot, 'name', {
          value: 'DetermineComponentFrameRoot',
        });
      var u = n.DetermineComponentFrameRoot(),
        m = u[0],
        g = u[1];
      if (m && g) {
        var x = m.split(`
`),
          I = g.split(`
`);
        for (s = n = 0; n < x.length && !x[n].includes('DetermineComponentFrameRoot'); ) n++;
        for (; s < I.length && !I[s].includes('DetermineComponentFrameRoot'); ) s++;
        if (n === x.length || s === I.length)
          for (n = x.length - 1, s = I.length - 1; 1 <= n && 0 <= s && x[n] !== I[s]; ) s--;
        for (; 1 <= n && 0 <= s; n--, s--)
          if (x[n] !== I[s]) {
            if (n !== 1 || s !== 1)
              do
                if ((n--, s--, 0 > s || x[n] !== I[s])) {
                  var $ =
                    `
` + x[n].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      $.includes('<anonymous>') &&
                      ($ = $.replace('<anonymous>', e.displayName)),
                    $
                  );
                }
              while (1 <= n && 0 <= s);
            break;
          }
      }
    } finally {
      ((xt = !1), (Error.prepareStackTrace = a));
    }
    return (a = e ? e.displayName || e.name : '') ? Te(a) : '';
  }
  function cg(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Te(e.type);
      case 16:
        return Te('Lazy');
      case 13:
        return e.child !== t && t !== null ? Te('Suspense Fallback') : Te('Suspense');
      case 19:
        return Te('SuspenseList');
      case 0:
      case 15:
        return Br(e.type, !1);
      case 11:
        return Br(e.type.render, !1);
      case 1:
        return Br(e.type, !0);
      case 31:
        return Te('Activity');
      default:
        return '';
    }
  }
  function td(e) {
    try {
      var t = '',
        a = null;
      do ((t += cg(e, a)), (a = e), (e = e.return));
      while (e);
      return t;
    } catch (n) {
      return (
        `
Error generating stack: ` +
        n.message +
        `
` +
        n.stack
      );
    }
  }
  var qr = Object.prototype.hasOwnProperty,
    Or = l.unstable_scheduleCallback,
    Ir = l.unstable_cancelCallback,
    dg = l.unstable_shouldYield,
    mg = l.unstable_requestPaint,
    Lt = l.unstable_now,
    _g = l.unstable_getCurrentPriorityLevel,
    ld = l.unstable_ImmediatePriority,
    ad = l.unstable_UserBlockingPriority,
    Hi = l.unstable_NormalPriority,
    fg = l.unstable_LowPriority,
    nd = l.unstable_IdlePriority,
    pg = l.log,
    hg = l.unstable_setDisableYieldValue,
    On = null,
    jt = null;
  function Gl(e) {
    if ((typeof pg == 'function' && hg(e), jt && typeof jt.setStrictMode == 'function'))
      try {
        jt.setStrictMode(On, e);
      } catch {}
  }
  var Mt = Math.clz32 ? Math.clz32 : vg,
    gg = Math.log,
    kg = Math.LN2;
  function vg(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((gg(e) / kg) | 0)) | 0);
  }
  var Ui = 256,
    Gi = 262144,
    $i = 4194304;
  function pa(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
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
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
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
        return e;
    }
  }
  function Yi(e, t, a) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var s = 0,
      u = e.suspendedLanes,
      m = e.pingedLanes;
    e = e.warmLanes;
    var g = n & 134217727;
    return (
      g !== 0
        ? ((n = g & ~u),
          n !== 0
            ? (s = pa(n))
            : ((m &= g), m !== 0 ? (s = pa(m)) : a || ((a = g & ~e), a !== 0 && (s = pa(a)))))
        : ((g = n & ~u),
          g !== 0
            ? (s = pa(g))
            : m !== 0
              ? (s = pa(m))
              : a || ((a = n & ~e), a !== 0 && (s = pa(a)))),
      s === 0
        ? 0
        : t !== 0 &&
            t !== s &&
            (t & u) === 0 &&
            ((u = s & -s), (a = t & -t), u >= a || (u === 32 && (a & 4194048) !== 0))
          ? t
          : s
    );
  }
  function In(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function yg(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
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
        return t + 5e3;
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
  function id() {
    var e = $i;
    return (($i <<= 1), ($i & 62914560) === 0 && ($i = 4194304), e);
  }
  function Dr(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function Dn(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function bg(e, t, a, n, s, u) {
    var m = e.pendingLanes;
    ((e.pendingLanes = a),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= a),
      (e.entangledLanes &= a),
      (e.errorRecoveryDisabledLanes &= a),
      (e.shellSuspendCounter = 0));
    var g = e.entanglements,
      x = e.expirationTimes,
      I = e.hiddenUpdates;
    for (a = m & ~a; 0 < a; ) {
      var $ = 31 - Mt(a),
        X = 1 << $;
      ((g[$] = 0), (x[$] = -1));
      var D = I[$];
      if (D !== null)
        for (I[$] = null, $ = 0; $ < D.length; $++) {
          var z = D[$];
          z !== null && (z.lane &= -536870913);
        }
      a &= ~X;
    }
    (n !== 0 && sd(e, n, 0),
      u !== 0 && s === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(m & ~t)));
  }
  function sd(e, t, a) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var n = 31 - Mt(t);
    ((e.entangledLanes |= t),
      (e.entanglements[n] = e.entanglements[n] | 1073741824 | (a & 261930)));
  }
  function rd(e, t) {
    var a = (e.entangledLanes |= t);
    for (e = e.entanglements; a; ) {
      var n = 31 - Mt(a),
        s = 1 << n;
      ((s & t) | (e[n] & t) && (e[n] |= t), (a &= ~s));
    }
  }
  function od(e, t) {
    var a = t & -t;
    return ((a = (a & 42) !== 0 ? 1 : Rr(a)), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a);
  }
  function Rr(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
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
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function zr(e) {
    return ((e &= -e), 2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function ud() {
    var e = Q.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Zf(e.type));
  }
  function cd(e, t) {
    var a = Q.p;
    try {
      return ((Q.p = e), t());
    } finally {
      Q.p = a;
    }
  }
  var $l = Math.random().toString(36).slice(2),
    ft = '__reactFiber$' + $l,
    St = '__reactProps$' + $l,
    Da = '__reactContainer$' + $l,
    Hr = '__reactEvents$' + $l,
    xg = '__reactListeners$' + $l,
    Sg = '__reactHandles$' + $l,
    dd = '__reactResources$' + $l,
    Rn = '__reactMarker$' + $l;
  function Ur(e) {
    (delete e[ft], delete e[St], delete e[Hr], delete e[xg], delete e[Sg]);
  }
  function Ra(e) {
    var t = e[ft];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if ((t = a[Da] || a[ft])) {
        if (((a = t.alternate), t.child !== null || (a !== null && a.child !== null)))
          for (e = Bf(e); e !== null; ) {
            if ((a = e[ft])) return a;
            e = Bf(e);
          }
        return t;
      }
      ((e = a), (a = e.parentNode));
    }
    return null;
  }
  function za(e) {
    if ((e = e[ft] || e[Da])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function zn(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(r(33));
  }
  function Ha(e) {
    var t = e[dd];
    return (t || (t = e[dd] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function ct(e) {
    e[Rn] = !0;
  }
  var md = new Set(),
    _d = {};
  function ha(e, t) {
    (Ua(e, t), Ua(e + 'Capture', t));
  }
  function Ua(e, t) {
    for (_d[e] = t, e = 0; e < t.length; e++) md.add(t[e]);
  }
  var wg = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    fd = {},
    pd = {};
  function Tg(e) {
    return qr.call(pd, e)
      ? !0
      : qr.call(fd, e)
        ? !1
        : wg.test(e)
          ? (pd[e] = !0)
          : ((fd[e] = !0), !1);
  }
  function Xi(e, t, a) {
    if (Tg(t))
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case 'undefined':
          case 'function':
          case 'symbol':
            e.removeAttribute(t);
            return;
          case 'boolean':
            var n = t.toLowerCase().slice(0, 5);
            if (n !== 'data-' && n !== 'aria-') {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, '' + a);
      }
  }
  function Vi(e, t, a) {
    if (a === null) e.removeAttribute(t);
    else {
      switch (typeof a) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, '' + a);
    }
  }
  function gl(e, t, a, n) {
    if (n === null) e.removeAttribute(a);
    else {
      switch (typeof n) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          e.removeAttribute(a);
          return;
      }
      e.setAttributeNS(t, a, '' + n);
    }
  }
  function Gt(e) {
    switch (typeof e) {
      case 'bigint':
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
        return e;
      case 'object':
        return e;
      default:
        return '';
    }
  }
  function hd(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function Eg(e, t, a) {
    var n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (
      !e.hasOwnProperty(t) &&
      typeof n < 'u' &&
      typeof n.get == 'function' &&
      typeof n.set == 'function'
    ) {
      var s = n.get,
        u = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return s.call(this);
          },
          set: function (m) {
            ((a = '' + m), u.call(this, m));
          },
        }),
        Object.defineProperty(e, t, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (m) {
            a = '' + m;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function Gr(e) {
    if (!e._valueTracker) {
      var t = hd(e) ? 'checked' : 'value';
      e._valueTracker = Eg(e, t, '' + e[t]);
    }
  }
  function gd(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      n = '';
    return (
      e && (n = hd(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = n),
      e !== a ? (t.setValue(e), !0) : !1
    );
  }
  function Qi(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Cg = /[\n"\\]/g;
  function $t(e) {
    return e.replace(Cg, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function $r(e, t, a, n, s, u, m, g) {
    ((e.name = ''),
      m != null && typeof m != 'function' && typeof m != 'symbol' && typeof m != 'boolean'
        ? (e.type = m)
        : e.removeAttribute('type'),
      t != null
        ? m === 'number'
          ? ((t === 0 && e.value === '') || e.value != t) && (e.value = '' + Gt(t))
          : e.value !== '' + Gt(t) && (e.value = '' + Gt(t))
        : (m !== 'submit' && m !== 'reset') || e.removeAttribute('value'),
      t != null
        ? Yr(e, m, Gt(t))
        : a != null
          ? Yr(e, m, Gt(a))
          : n != null && e.removeAttribute('value'),
      s == null && u != null && (e.defaultChecked = !!u),
      s != null && (e.checked = s && typeof s != 'function' && typeof s != 'symbol'),
      g != null && typeof g != 'function' && typeof g != 'symbol' && typeof g != 'boolean'
        ? (e.name = '' + Gt(g))
        : e.removeAttribute('name'));
  }
  function kd(e, t, a, n, s, u, m, g) {
    if (
      (u != null &&
        typeof u != 'function' &&
        typeof u != 'symbol' &&
        typeof u != 'boolean' &&
        (e.type = u),
      t != null || a != null)
    ) {
      if (!((u !== 'submit' && u !== 'reset') || t != null)) {
        Gr(e);
        return;
      }
      ((a = a != null ? '' + Gt(a) : ''),
        (t = t != null ? '' + Gt(t) : a),
        g || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((n = n ?? s),
      (n = typeof n != 'function' && typeof n != 'symbol' && !!n),
      (e.checked = g ? e.checked : !!n),
      (e.defaultChecked = !!n),
      m != null &&
        typeof m != 'function' &&
        typeof m != 'symbol' &&
        typeof m != 'boolean' &&
        (e.name = m),
      Gr(e));
  }
  function Yr(e, t, a) {
    (t === 'number' && Qi(e.ownerDocument) === e) ||
      e.defaultValue === '' + a ||
      (e.defaultValue = '' + a);
  }
  function Ga(e, t, a, n) {
    if (((e = e.options), t)) {
      t = {};
      for (var s = 0; s < a.length; s++) t['$' + a[s]] = !0;
      for (a = 0; a < e.length; a++)
        ((s = t.hasOwnProperty('$' + e[a].value)),
          e[a].selected !== s && (e[a].selected = s),
          s && n && (e[a].defaultSelected = !0));
    } else {
      for (a = '' + Gt(a), t = null, s = 0; s < e.length; s++) {
        if (e[s].value === a) {
          ((e[s].selected = !0), n && (e[s].defaultSelected = !0));
          return;
        }
        t !== null || e[s].disabled || (t = e[s]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function vd(e, t, a) {
    if (t != null && ((t = '' + Gt(t)), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? '' + Gt(a) : '';
  }
  function yd(e, t, a, n) {
    if (t == null) {
      if (n != null) {
        if (a != null) throw Error(r(92));
        if (he(n)) {
          if (1 < n.length) throw Error(r(93));
          n = n[0];
        }
        a = n;
      }
      (a == null && (a = ''), (t = a));
    }
    ((a = Gt(t)),
      (e.defaultValue = a),
      (n = e.textContent),
      n === a && n !== '' && n !== null && (e.value = n),
      Gr(e));
  }
  function $a(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Ng = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function bd(e, t, a) {
    var n = t.indexOf('--') === 0;
    a == null || typeof a == 'boolean' || a === ''
      ? n
        ? e.setProperty(t, '')
        : t === 'float'
          ? (e.cssFloat = '')
          : (e[t] = '')
      : n
        ? e.setProperty(t, a)
        : typeof a != 'number' || a === 0 || Ng.has(t)
          ? t === 'float'
            ? (e.cssFloat = a)
            : (e[t] = ('' + a).trim())
          : (e[t] = a + 'px');
  }
  function xd(e, t, a) {
    if (t != null && typeof t != 'object') throw Error(r(62));
    if (((e = e.style), a != null)) {
      for (var n in a)
        !a.hasOwnProperty(n) ||
          (t != null && t.hasOwnProperty(n)) ||
          (n.indexOf('--') === 0
            ? e.setProperty(n, '')
            : n === 'float'
              ? (e.cssFloat = '')
              : (e[n] = ''));
      for (var s in t) ((n = t[s]), t.hasOwnProperty(s) && a[s] !== n && bd(e, s, n));
    } else for (var u in t) t.hasOwnProperty(u) && bd(e, u, t[u]);
  }
  function Xr(e) {
    if (e.indexOf('-') === -1) return !1;
    switch (e) {
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
  var Ag = new Map([
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
    Lg =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ki(e) {
    return Lg.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function kl() {}
  var Vr = null;
  function Qr(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Ya = null,
    Xa = null;
  function Sd(e) {
    var t = za(e);
    if (t && (e = t.stateNode)) {
      var a = e[St] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            ($r(
              e,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name
            ),
            (t = a.name),
            a.type === 'radio' && t != null)
          ) {
            for (a = e; a.parentNode; ) a = a.parentNode;
            for (
              a = a.querySelectorAll('input[name="' + $t('' + t) + '"][type="radio"]'), t = 0;
              t < a.length;
              t++
            ) {
              var n = a[t];
              if (n !== e && n.form === e.form) {
                var s = n[St] || null;
                if (!s) throw Error(r(90));
                $r(
                  n,
                  s.value,
                  s.defaultValue,
                  s.defaultValue,
                  s.checked,
                  s.defaultChecked,
                  s.type,
                  s.name
                );
              }
            }
            for (t = 0; t < a.length; t++) ((n = a[t]), n.form === e.form && gd(n));
          }
          break e;
        case 'textarea':
          vd(e, a.value, a.defaultValue);
          break e;
        case 'select':
          ((t = a.value), t != null && Ga(e, !!a.multiple, t, !1));
      }
    }
  }
  var Kr = !1;
  function wd(e, t, a) {
    if (Kr) return e(t, a);
    Kr = !0;
    try {
      var n = e(t);
      return n;
    } finally {
      if (
        ((Kr = !1),
        (Ya !== null || Xa !== null) &&
          (Os(), Ya && ((t = Ya), (e = Xa), (Xa = Ya = null), Sd(t), e)))
      )
        for (t = 0; t < e.length; t++) Sd(e[t]);
    }
  }
  function Hn(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var n = a[St] || null;
    if (n === null) return null;
    a = n[t];
    e: switch (t) {
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
        ((n = !n.disabled) ||
          ((e = e.type),
          (n = !(e === 'button' || e === 'input' || e === 'select' || e === 'textarea'))),
          (e = !n));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (a && typeof a != 'function') throw Error(r(231, t, typeof a));
    return a;
  }
  var vl = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Zr = !1;
  if (vl)
    try {
      var Un = {};
      (Object.defineProperty(Un, 'passive', {
        get: function () {
          Zr = !0;
        },
      }),
        window.addEventListener('test', Un, Un),
        window.removeEventListener('test', Un, Un));
    } catch {
      Zr = !1;
    }
  var Yl = null,
    Jr = null,
    Zi = null;
  function Td() {
    if (Zi) return Zi;
    var e,
      t = Jr,
      a = t.length,
      n,
      s = 'value' in Yl ? Yl.value : Yl.textContent,
      u = s.length;
    for (e = 0; e < a && t[e] === s[e]; e++);
    var m = a - e;
    for (n = 1; n <= m && t[a - n] === s[u - n]; n++);
    return (Zi = s.slice(e, 1 < n ? 1 - n : void 0));
  }
  function Ji(e) {
    var t = e.keyCode;
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Pi() {
    return !0;
  }
  function Ed() {
    return !1;
  }
  function wt(e) {
    function t(a, n, s, u, m) {
      ((this._reactName = a),
        (this._targetInst = s),
        (this.type = n),
        (this.nativeEvent = u),
        (this.target = m),
        (this.currentTarget = null));
      for (var g in e) e.hasOwnProperty(g) && ((a = e[g]), (this[g] = a ? a(u) : u[g]));
      return (
        (this.isDefaultPrevented = (
          u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1
        )
          ? Pi
          : Ed),
        (this.isPropagationStopped = Ed),
        this
      );
    }
    return (
      y(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != 'unknown' && (a.returnValue = !1),
            (this.isDefaultPrevented = Pi));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != 'unknown' && (a.cancelBubble = !0),
            (this.isPropagationStopped = Pi));
        },
        persist: function () {},
        isPersistent: Pi,
      }),
      t
    );
  }
  var ga = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Wi = wt(ga),
    Gn = y({}, ga, { view: 0, detail: 0 }),
    jg = wt(Gn),
    Pr,
    Wr,
    $n,
    Fi = y({}, Gn, {
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
      getModifierState: eo,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return 'movementX' in e
          ? e.movementX
          : (e !== $n &&
              ($n && e.type === 'mousemove'
                ? ((Pr = e.screenX - $n.screenX), (Wr = e.screenY - $n.screenY))
                : (Wr = Pr = 0),
              ($n = e)),
            Pr);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : Wr;
      },
    }),
    Cd = wt(Fi),
    Mg = y({}, Fi, { dataTransfer: 0 }),
    Bg = wt(Mg),
    qg = y({}, Gn, { relatedTarget: 0 }),
    Fr = wt(qg),
    Og = y({}, ga, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Ig = wt(Og),
    Dg = y({}, ga, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Rg = wt(Dg),
    zg = y({}, ga, { data: 0 }),
    Nd = wt(zg),
    Hg = {
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
    Ug = {
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
    Gg = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function $g(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Gg[e]) ? !!t[e] : !1;
  }
  function eo() {
    return $g;
  }
  var Yg = y({}, Gn, {
      key: function (e) {
        if (e.key) {
          var t = Hg[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = Ji(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? Ug[e.keyCode] || 'Unidentified'
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
      getModifierState: eo,
      charCode: function (e) {
        return e.type === 'keypress' ? Ji(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? Ji(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    Xg = wt(Yg),
    Vg = y({}, Fi, {
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
    Ad = wt(Vg),
    Qg = y({}, Gn, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: eo,
    }),
    Kg = wt(Qg),
    Zg = y({}, ga, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Jg = wt(Zg),
    Pg = y({}, Fi, {
      deltaX: function (e) {
        return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function (e) {
        return 'deltaY' in e
          ? e.deltaY
          : 'wheelDeltaY' in e
            ? -e.wheelDeltaY
            : 'wheelDelta' in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Wg = wt(Pg),
    Fg = y({}, ga, { newState: 0, oldState: 0 }),
    ek = wt(Fg),
    tk = [9, 13, 27, 32],
    to = vl && 'CompositionEvent' in window,
    Yn = null;
  vl && 'documentMode' in document && (Yn = document.documentMode);
  var lk = vl && 'TextEvent' in window && !Yn,
    Ld = vl && (!to || (Yn && 8 < Yn && 11 >= Yn)),
    jd = ' ',
    Md = !1;
  function Bd(e, t) {
    switch (e) {
      case 'keyup':
        return tk.indexOf(t.keyCode) !== -1;
      case 'keydown':
        return t.keyCode !== 229;
      case 'keypress':
      case 'mousedown':
      case 'focusout':
        return !0;
      default:
        return !1;
    }
  }
  function qd(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var Va = !1;
  function ak(e, t) {
    switch (e) {
      case 'compositionend':
        return qd(t);
      case 'keypress':
        return t.which !== 32 ? null : ((Md = !0), jd);
      case 'textInput':
        return ((e = t.data), e === jd && Md ? null : e);
      default:
        return null;
    }
  }
  function nk(e, t) {
    if (Va)
      return e === 'compositionend' || (!to && Bd(e, t))
        ? ((e = Td()), (Zi = Jr = Yl = null), (Va = !1), e)
        : null;
    switch (e) {
      case 'paste':
        return null;
      case 'keypress':
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case 'compositionend':
        return Ld && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var ik = {
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
  function Od(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!ik[e.type] : t === 'textarea';
  }
  function Id(e, t, a, n) {
    (Ya ? (Xa ? Xa.push(n) : (Xa = [n])) : (Ya = n),
      (t = Gs(t, 'onChange')),
      0 < t.length &&
        ((a = new Wi('onChange', 'change', null, a, n)), e.push({ event: a, listeners: t })));
  }
  var Xn = null,
    Vn = null;
  function sk(e) {
    vf(e, 0);
  }
  function es(e) {
    var t = zn(e);
    if (gd(t)) return e;
  }
  function Dd(e, t) {
    if (e === 'change') return t;
  }
  var Rd = !1;
  if (vl) {
    var lo;
    if (vl) {
      var ao = 'oninput' in document;
      if (!ao) {
        var zd = document.createElement('div');
        (zd.setAttribute('oninput', 'return;'), (ao = typeof zd.oninput == 'function'));
      }
      lo = ao;
    } else lo = !1;
    Rd = lo && (!document.documentMode || 9 < document.documentMode);
  }
  function Hd() {
    Xn && (Xn.detachEvent('onpropertychange', Ud), (Vn = Xn = null));
  }
  function Ud(e) {
    if (e.propertyName === 'value' && es(Vn)) {
      var t = [];
      (Id(t, Vn, e, Qr(e)), wd(sk, t));
    }
  }
  function rk(e, t, a) {
    e === 'focusin'
      ? (Hd(), (Xn = t), (Vn = a), Xn.attachEvent('onpropertychange', Ud))
      : e === 'focusout' && Hd();
  }
  function ok(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return es(Vn);
  }
  function uk(e, t) {
    if (e === 'click') return es(t);
  }
  function ck(e, t) {
    if (e === 'input' || e === 'change') return es(t);
  }
  function dk(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Bt = typeof Object.is == 'function' ? Object.is : dk;
  function Qn(e, t) {
    if (Bt(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var a = Object.keys(e),
      n = Object.keys(t);
    if (a.length !== n.length) return !1;
    for (n = 0; n < a.length; n++) {
      var s = a[n];
      if (!qr.call(t, s) || !Bt(e[s], t[s])) return !1;
    }
    return !0;
  }
  function Gd(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function $d(e, t) {
    var a = Gd(e);
    e = 0;
    for (var n; a; ) {
      if (a.nodeType === 3) {
        if (((n = e + a.textContent.length), e <= t && n >= t)) return { node: a, offset: t - e };
        e = n;
      }
      e: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break e;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = Gd(a);
    }
  }
  function Yd(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Yd(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Xd(e) {
    e =
      e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = Qi(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == 'string';
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = Qi(e.document);
    }
    return t;
  }
  function no(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === 'input' &&
        (e.type === 'text' ||
          e.type === 'search' ||
          e.type === 'tel' ||
          e.type === 'url' ||
          e.type === 'password')) ||
        t === 'textarea' ||
        e.contentEditable === 'true')
    );
  }
  var mk = vl && 'documentMode' in document && 11 >= document.documentMode,
    Qa = null,
    io = null,
    Kn = null,
    so = !1;
  function Vd(e, t, a) {
    var n = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    so ||
      Qa == null ||
      Qa !== Qi(n) ||
      ((n = Qa),
      'selectionStart' in n && no(n)
        ? (n = { start: n.selectionStart, end: n.selectionEnd })
        : ((n = ((n.ownerDocument && n.ownerDocument.defaultView) || window).getSelection()),
          (n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset,
          })),
      (Kn && Qn(Kn, n)) ||
        ((Kn = n),
        (n = Gs(io, 'onSelect')),
        0 < n.length &&
          ((t = new Wi('onSelect', 'select', null, t, a)),
          e.push({ event: t, listeners: n }),
          (t.target = Qa))));
  }
  function ka(e, t) {
    var a = {};
    return (
      (a[e.toLowerCase()] = t.toLowerCase()),
      (a['Webkit' + e] = 'webkit' + t),
      (a['Moz' + e] = 'moz' + t),
      a
    );
  }
  var Ka = {
      animationend: ka('Animation', 'AnimationEnd'),
      animationiteration: ka('Animation', 'AnimationIteration'),
      animationstart: ka('Animation', 'AnimationStart'),
      transitionrun: ka('Transition', 'TransitionRun'),
      transitionstart: ka('Transition', 'TransitionStart'),
      transitioncancel: ka('Transition', 'TransitionCancel'),
      transitionend: ka('Transition', 'TransitionEnd'),
    },
    ro = {},
    Qd = {};
  vl &&
    ((Qd = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Ka.animationend.animation,
      delete Ka.animationiteration.animation,
      delete Ka.animationstart.animation),
    'TransitionEvent' in window || delete Ka.transitionend.transition);
  function va(e) {
    if (ro[e]) return ro[e];
    if (!Ka[e]) return e;
    var t = Ka[e],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in Qd) return (ro[e] = t[a]);
    return e;
  }
  var Kd = va('animationend'),
    Zd = va('animationiteration'),
    Jd = va('animationstart'),
    _k = va('transitionrun'),
    fk = va('transitionstart'),
    pk = va('transitioncancel'),
    Pd = va('transitionend'),
    Wd = new Map(),
    oo =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  oo.push('scrollEnd');
  function el(e, t) {
    (Wd.set(e, t), ha(t, [e]));
  }
  var ts =
      typeof reportError == 'function'
        ? reportError
        : function (e) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var t = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof e == 'object' && e !== null && typeof e.message == 'string'
                    ? String(e.message)
                    : String(e),
                error: e,
              });
              if (!window.dispatchEvent(t)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', e);
              return;
            }
            console.error(e);
          },
    Yt = [],
    Za = 0,
    uo = 0;
  function ls() {
    for (var e = Za, t = (uo = Za = 0); t < e; ) {
      var a = Yt[t];
      Yt[t++] = null;
      var n = Yt[t];
      Yt[t++] = null;
      var s = Yt[t];
      Yt[t++] = null;
      var u = Yt[t];
      if (((Yt[t++] = null), n !== null && s !== null)) {
        var m = n.pending;
        (m === null ? (s.next = s) : ((s.next = m.next), (m.next = s)), (n.pending = s));
      }
      u !== 0 && Fd(a, s, u);
    }
  }
  function as(e, t, a, n) {
    ((Yt[Za++] = e),
      (Yt[Za++] = t),
      (Yt[Za++] = a),
      (Yt[Za++] = n),
      (uo |= n),
      (e.lanes |= n),
      (e = e.alternate),
      e !== null && (e.lanes |= n));
  }
  function co(e, t, a, n) {
    return (as(e, t, a, n), ns(e));
  }
  function ya(e, t) {
    return (as(e, null, null, t), ns(e));
  }
  function Fd(e, t, a) {
    e.lanes |= a;
    var n = e.alternate;
    n !== null && (n.lanes |= a);
    for (var s = !1, u = e.return; u !== null; )
      ((u.childLanes |= a),
        (n = u.alternate),
        n !== null && (n.childLanes |= a),
        u.tag === 22 && ((e = u.stateNode), e === null || e._visibility & 1 || (s = !0)),
        (e = u),
        (u = u.return));
    return e.tag === 3
      ? ((u = e.stateNode),
        s &&
          t !== null &&
          ((s = 31 - Mt(a)),
          (e = u.hiddenUpdates),
          (n = e[s]),
          n === null ? (e[s] = [t]) : n.push(t),
          (t.lane = a | 536870912)),
        u)
      : null;
  }
  function ns(e) {
    if (50 < hi) throw ((hi = 0), (yu = null), Error(r(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var Ja = {};
  function hk(e, t, a, n) {
    ((this.tag = e),
      (this.key = a),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
      (this.mode = n),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function qt(e, t, a, n) {
    return new hk(e, t, a, n);
  }
  function mo(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function yl(e, t) {
    var a = e.alternate;
    return (
      a === null
        ? ((a = qt(e.tag, t, e.key, e.mode)),
          (a.elementType = e.elementType),
          (a.type = e.type),
          (a.stateNode = e.stateNode),
          (a.alternate = e),
          (e.alternate = a))
        : ((a.pendingProps = t),
          (a.type = e.type),
          (a.flags = 0),
          (a.subtreeFlags = 0),
          (a.deletions = null)),
      (a.flags = e.flags & 65011712),
      (a.childLanes = e.childLanes),
      (a.lanes = e.lanes),
      (a.child = e.child),
      (a.memoizedProps = e.memoizedProps),
      (a.memoizedState = e.memoizedState),
      (a.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (a.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (a.sibling = e.sibling),
      (a.index = e.index),
      (a.ref = e.ref),
      (a.refCleanup = e.refCleanup),
      a
    );
  }
  function em(e, t) {
    e.flags &= 65011714;
    var a = e.alternate;
    return (
      a === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = a.childLanes),
          (e.lanes = a.lanes),
          (e.child = a.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = a.memoizedProps),
          (e.memoizedState = a.memoizedState),
          (e.updateQueue = a.updateQueue),
          (e.type = a.type),
          (t = a.dependencies),
          (e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function is(e, t, a, n, s, u) {
    var m = 0;
    if (((n = e), typeof e == 'function')) mo(e) && (m = 1);
    else if (typeof e == 'string')
      m = bv(e, a, F.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case ne:
          return ((e = qt(31, a, t, s)), (e.elementType = ne), (e.lanes = u), e);
        case L:
          return ba(a.children, s, u, t);
        case C:
          ((m = 8), (s |= 24));
          break;
        case T:
          return ((e = qt(12, a, t, s | 2)), (e.elementType = T), (e.lanes = u), e);
        case J:
          return ((e = qt(13, a, t, s)), (e.elementType = J), (e.lanes = u), e);
        case V:
          return ((e = qt(19, a, t, s)), (e.elementType = V), (e.lanes = u), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case M:
                m = 10;
                break e;
              case A:
                m = 9;
                break e;
              case P:
                m = 11;
                break e;
              case H:
                m = 14;
                break e;
              case W:
                ((m = 16), (n = null));
                break e;
            }
          ((m = 29), (a = Error(r(130, e === null ? 'null' : typeof e, ''))), (n = null));
      }
    return ((t = qt(m, a, t, s)), (t.elementType = e), (t.type = n), (t.lanes = u), t);
  }
  function ba(e, t, a, n) {
    return ((e = qt(7, e, n, t)), (e.lanes = a), e);
  }
  function _o(e, t, a) {
    return ((e = qt(6, e, null, t)), (e.lanes = a), e);
  }
  function tm(e) {
    var t = qt(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function fo(e, t, a) {
    return (
      (t = qt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = a),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var lm = new WeakMap();
  function Xt(e, t) {
    if (typeof e == 'object' && e !== null) {
      var a = lm.get(e);
      return a !== void 0 ? a : ((t = { value: e, source: t, stack: td(t) }), lm.set(e, t), t);
    }
    return { value: e, source: t, stack: td(t) };
  }
  var Pa = [],
    Wa = 0,
    ss = null,
    Zn = 0,
    Vt = [],
    Qt = 0,
    Xl = null,
    dl = 1,
    ml = '';
  function bl(e, t) {
    ((Pa[Wa++] = Zn), (Pa[Wa++] = ss), (ss = e), (Zn = t));
  }
  function am(e, t, a) {
    ((Vt[Qt++] = dl), (Vt[Qt++] = ml), (Vt[Qt++] = Xl), (Xl = e));
    var n = dl;
    e = ml;
    var s = 32 - Mt(n) - 1;
    ((n &= ~(1 << s)), (a += 1));
    var u = 32 - Mt(t) + s;
    if (30 < u) {
      var m = s - (s % 5);
      ((u = (n & ((1 << m) - 1)).toString(32)),
        (n >>= m),
        (s -= m),
        (dl = (1 << (32 - Mt(t) + s)) | (a << s) | n),
        (ml = u + e));
    } else ((dl = (1 << u) | (a << s) | n), (ml = e));
  }
  function po(e) {
    e.return !== null && (bl(e, 1), am(e, 1, 0));
  }
  function ho(e) {
    for (; e === ss; ) ((ss = Pa[--Wa]), (Pa[Wa] = null), (Zn = Pa[--Wa]), (Pa[Wa] = null));
    for (; e === Xl; )
      ((Xl = Vt[--Qt]),
        (Vt[Qt] = null),
        (ml = Vt[--Qt]),
        (Vt[Qt] = null),
        (dl = Vt[--Qt]),
        (Vt[Qt] = null));
  }
  function nm(e, t) {
    ((Vt[Qt++] = dl), (Vt[Qt++] = ml), (Vt[Qt++] = Xl), (dl = t.id), (ml = t.overflow), (Xl = e));
  }
  var pt = null,
    Ye = null,
    Ne = !1,
    Vl = null,
    Kt = !1,
    go = Error(r(519));
  function Ql(e) {
    var t = Error(
      r(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (Jn(Xt(t, e)), go);
  }
  function im(e) {
    var t = e.stateNode,
      a = e.type,
      n = e.memoizedProps;
    switch (((t[ft] = e), (t[St] = n), a)) {
      case 'dialog':
        (we('cancel', t), we('close', t));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        we('load', t);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < ki.length; a++) we(ki[a], t);
        break;
      case 'source':
        we('error', t);
        break;
      case 'img':
      case 'image':
      case 'link':
        (we('error', t), we('load', t));
        break;
      case 'details':
        we('toggle', t);
        break;
      case 'input':
        (we('invalid', t),
          kd(t, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, !0));
        break;
      case 'select':
        we('invalid', t);
        break;
      case 'textarea':
        (we('invalid', t), yd(t, n.value, n.defaultValue, n.children));
    }
    ((a = n.children),
      (typeof a != 'string' && typeof a != 'number' && typeof a != 'bigint') ||
      t.textContent === '' + a ||
      n.suppressHydrationWarning === !0 ||
      Sf(t.textContent, a)
        ? (n.popover != null && (we('beforetoggle', t), we('toggle', t)),
          n.onScroll != null && we('scroll', t),
          n.onScrollEnd != null && we('scrollend', t),
          n.onClick != null && (t.onclick = kl),
          (t = !0))
        : (t = !1),
      t || Ql(e, !0));
  }
  function sm(e) {
    for (pt = e.return; pt; )
      switch (pt.tag) {
        case 5:
        case 31:
        case 13:
          Kt = !1;
          return;
        case 27:
        case 3:
          Kt = !0;
          return;
        default:
          pt = pt.return;
      }
  }
  function Fa(e) {
    if (e !== pt) return !1;
    if (!Ne) return (sm(e), (Ne = !0), !1);
    var t = e.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = e.type), (a = !(a !== 'form' && a !== 'button') || Ou(e.type, e.memoizedProps))),
        (a = !a)),
      a && Ye && Ql(e),
      sm(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(r(317));
      Ye = Mf(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(r(317));
      Ye = Mf(e);
    } else
      t === 27
        ? ((t = Ye), ra(e.type) ? ((e = Hu), (Hu = null), (Ye = e)) : (Ye = t))
        : (Ye = pt ? Jt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function xa() {
    ((Ye = pt = null), (Ne = !1));
  }
  function ko() {
    var e = Vl;
    return (e !== null && (Nt === null ? (Nt = e) : Nt.push.apply(Nt, e), (Vl = null)), e);
  }
  function Jn(e) {
    Vl === null ? (Vl = [e]) : Vl.push(e);
  }
  var vo = w(null),
    Sa = null,
    xl = null;
  function Kl(e, t, a) {
    (Z(vo, t._currentValue), (t._currentValue = a));
  }
  function Sl(e) {
    ((e._currentValue = vo.current), R(vo));
  }
  function yo(e, t, a) {
    for (; e !== null; ) {
      var n = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), n !== null && (n.childLanes |= t))
          : n !== null && (n.childLanes & t) !== t && (n.childLanes |= t),
        e === a)
      )
        break;
      e = e.return;
    }
  }
  function bo(e, t, a, n) {
    var s = e.child;
    for (s !== null && (s.return = e); s !== null; ) {
      var u = s.dependencies;
      if (u !== null) {
        var m = s.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var g = u;
          u = s;
          for (var x = 0; x < t.length; x++)
            if (g.context === t[x]) {
              ((u.lanes |= a),
                (g = u.alternate),
                g !== null && (g.lanes |= a),
                yo(u.return, a, e),
                n || (m = null));
              break e;
            }
          u = g.next;
        }
      } else if (s.tag === 18) {
        if (((m = s.return), m === null)) throw Error(r(341));
        ((m.lanes |= a), (u = m.alternate), u !== null && (u.lanes |= a), yo(m, a, e), (m = null));
      } else m = s.child;
      if (m !== null) m.return = s;
      else
        for (m = s; m !== null; ) {
          if (m === e) {
            m = null;
            break;
          }
          if (((s = m.sibling), s !== null)) {
            ((s.return = m.return), (m = s));
            break;
          }
          m = m.return;
        }
      s = m;
    }
  }
  function en(e, t, a, n) {
    e = null;
    for (var s = t, u = !1; s !== null; ) {
      if (!u) {
        if ((s.flags & 524288) !== 0) u = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var m = s.alternate;
        if (m === null) throw Error(r(387));
        if (((m = m.memoizedProps), m !== null)) {
          var g = s.type;
          Bt(s.pendingProps.value, m.value) || (e !== null ? e.push(g) : (e = [g]));
        }
      } else if (s === be.current) {
        if (((m = s.alternate), m === null)) throw Error(r(387));
        m.memoizedState.memoizedState !== s.memoizedState.memoizedState &&
          (e !== null ? e.push(Si) : (e = [Si]));
      }
      s = s.return;
    }
    (e !== null && bo(t, e, a, n), (t.flags |= 262144));
  }
  function rs(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Bt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function wa(e) {
    ((Sa = e), (xl = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function ht(e) {
    return rm(Sa, e);
  }
  function os(e, t) {
    return (Sa === null && wa(e), rm(e, t));
  }
  function rm(e, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), xl === null)) {
      if (e === null) throw Error(r(308));
      ((xl = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else xl = xl.next = t;
    return a;
  }
  var gk =
      typeof AbortController < 'u'
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (a, n) {
                  e.push(n);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                e.forEach(function (a) {
                  return a();
                }));
            };
          },
    kk = l.unstable_scheduleCallback,
    vk = l.unstable_NormalPriority,
    nt = {
      $$typeof: M,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function xo() {
    return { controller: new gk(), data: new Map(), refCount: 0 };
  }
  function Pn(e) {
    (e.refCount--,
      e.refCount === 0 &&
        kk(vk, function () {
          e.controller.abort();
        }));
  }
  var Wn = null,
    So = 0,
    tn = 0,
    ln = null;
  function yk(e, t) {
    if (Wn === null) {
      var a = (Wn = []);
      ((So = 0),
        (tn = Eu()),
        (ln = {
          status: 'pending',
          value: void 0,
          then: function (n) {
            a.push(n);
          },
        }));
    }
    return (So++, t.then(om, om), t);
  }
  function om() {
    if (--So === 0 && Wn !== null) {
      ln !== null && (ln.status = 'fulfilled');
      var e = Wn;
      ((Wn = null), (tn = 0), (ln = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function bk(e, t) {
    var a = [],
      n = {
        status: 'pending',
        value: null,
        reason: null,
        then: function (s) {
          a.push(s);
        },
      };
    return (
      e.then(
        function () {
          ((n.status = 'fulfilled'), (n.value = t));
          for (var s = 0; s < a.length; s++) (0, a[s])(t);
        },
        function (s) {
          for (n.status = 'rejected', n.reason = s, s = 0; s < a.length; s++) (0, a[s])(void 0);
        }
      ),
      n
    );
  }
  var um = j.S;
  j.S = function (e, t) {
    ((V_ = Lt()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && yk(e, t),
      um !== null && um(e, t));
  };
  var Ta = w(null);
  function wo() {
    var e = Ta.current;
    return e !== null ? e : $e.pooledCache;
  }
  function us(e, t) {
    t === null ? Z(Ta, Ta.current) : Z(Ta, t.pool);
  }
  function cm() {
    var e = wo();
    return e === null ? null : { parent: nt._currentValue, pool: e };
  }
  var an = Error(r(460)),
    To = Error(r(474)),
    cs = Error(r(542)),
    ds = { then: function () {} };
  function dm(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function mm(e, t, a) {
    switch (
      ((a = e[a]), a === void 0 ? e.push(t) : a !== t && (t.then(kl, kl), (t = a)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), fm(e), e);
      default:
        if (typeof t.status == 'string') t.then(kl, kl);
        else {
          if (((e = $e), e !== null && 100 < e.shellSuspendCounter)) throw Error(r(482));
          ((e = t),
            (e.status = 'pending'),
            e.then(
              function (n) {
                if (t.status === 'pending') {
                  var s = t;
                  ((s.status = 'fulfilled'), (s.value = n));
                }
              },
              function (n) {
                if (t.status === 'pending') {
                  var s = t;
                  ((s.status = 'rejected'), (s.reason = n));
                }
              }
            ));
        }
        switch (t.status) {
          case 'fulfilled':
            return t.value;
          case 'rejected':
            throw ((e = t.reason), fm(e), e);
        }
        throw ((Ca = t), an);
    }
  }
  function Ea(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == 'object' && typeof a.then == 'function' ? ((Ca = a), an) : a;
    }
  }
  var Ca = null;
  function _m() {
    if (Ca === null) throw Error(r(459));
    var e = Ca;
    return ((Ca = null), e);
  }
  function fm(e) {
    if (e === an || e === cs) throw Error(r(483));
  }
  var nn = null,
    Fn = 0;
  function ms(e) {
    var t = Fn;
    return ((Fn += 1), nn === null && (nn = []), mm(nn, e, t));
  }
  function ei(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function _s(e, t) {
    throw t.$$typeof === S
      ? Error(r(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          r(
            31,
            e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e
          )
        ));
  }
  function pm(e) {
    function t(B, N) {
      if (e) {
        var O = B.deletions;
        O === null ? ((B.deletions = [N]), (B.flags |= 16)) : O.push(N);
      }
    }
    function a(B, N) {
      if (!e) return null;
      for (; N !== null; ) (t(B, N), (N = N.sibling));
      return null;
    }
    function n(B) {
      for (var N = new Map(); B !== null; )
        (B.key !== null ? N.set(B.key, B) : N.set(B.index, B), (B = B.sibling));
      return N;
    }
    function s(B, N) {
      return ((B = yl(B, N)), (B.index = 0), (B.sibling = null), B);
    }
    function u(B, N, O) {
      return (
        (B.index = O),
        e
          ? ((O = B.alternate),
            O !== null
              ? ((O = O.index), O < N ? ((B.flags |= 67108866), N) : O)
              : ((B.flags |= 67108866), N))
          : ((B.flags |= 1048576), N)
      );
    }
    function m(B) {
      return (e && B.alternate === null && (B.flags |= 67108866), B);
    }
    function g(B, N, O, Y) {
      return N === null || N.tag !== 6
        ? ((N = _o(O, B.mode, Y)), (N.return = B), N)
        : ((N = s(N, O)), (N.return = B), N);
    }
    function x(B, N, O, Y) {
      var ue = O.type;
      return ue === L
        ? $(B, N, O.props.children, Y, O.key)
        : N !== null &&
            (N.elementType === ue ||
              (typeof ue == 'object' && ue !== null && ue.$$typeof === W && Ea(ue) === N.type))
          ? ((N = s(N, O.props)), ei(N, O), (N.return = B), N)
          : ((N = is(O.type, O.key, O.props, null, B.mode, Y)), ei(N, O), (N.return = B), N);
    }
    function I(B, N, O, Y) {
      return N === null ||
        N.tag !== 4 ||
        N.stateNode.containerInfo !== O.containerInfo ||
        N.stateNode.implementation !== O.implementation
        ? ((N = fo(O, B.mode, Y)), (N.return = B), N)
        : ((N = s(N, O.children || [])), (N.return = B), N);
    }
    function $(B, N, O, Y, ue) {
      return N === null || N.tag !== 7
        ? ((N = ba(O, B.mode, Y, ue)), (N.return = B), N)
        : ((N = s(N, O)), (N.return = B), N);
    }
    function X(B, N, O) {
      if ((typeof N == 'string' && N !== '') || typeof N == 'number' || typeof N == 'bigint')
        return ((N = _o('' + N, B.mode, O)), (N.return = B), N);
      if (typeof N == 'object' && N !== null) {
        switch (N.$$typeof) {
          case q:
            return ((O = is(N.type, N.key, N.props, null, B.mode, O)), ei(O, N), (O.return = B), O);
          case b:
            return ((N = fo(N, B.mode, O)), (N.return = B), N);
          case W:
            return ((N = Ea(N)), X(B, N, O));
        }
        if (he(N) || fe(N)) return ((N = ba(N, B.mode, O, null)), (N.return = B), N);
        if (typeof N.then == 'function') return X(B, ms(N), O);
        if (N.$$typeof === M) return X(B, os(B, N), O);
        _s(B, N);
      }
      return null;
    }
    function D(B, N, O, Y) {
      var ue = N !== null ? N.key : null;
      if ((typeof O == 'string' && O !== '') || typeof O == 'number' || typeof O == 'bigint')
        return ue !== null ? null : g(B, N, '' + O, Y);
      if (typeof O == 'object' && O !== null) {
        switch (O.$$typeof) {
          case q:
            return O.key === ue ? x(B, N, O, Y) : null;
          case b:
            return O.key === ue ? I(B, N, O, Y) : null;
          case W:
            return ((O = Ea(O)), D(B, N, O, Y));
        }
        if (he(O) || fe(O)) return ue !== null ? null : $(B, N, O, Y, null);
        if (typeof O.then == 'function') return D(B, N, ms(O), Y);
        if (O.$$typeof === M) return D(B, N, os(B, O), Y);
        _s(B, O);
      }
      return null;
    }
    function z(B, N, O, Y, ue) {
      if ((typeof Y == 'string' && Y !== '') || typeof Y == 'number' || typeof Y == 'bigint')
        return ((B = B.get(O) || null), g(N, B, '' + Y, ue));
      if (typeof Y == 'object' && Y !== null) {
        switch (Y.$$typeof) {
          case q:
            return ((B = B.get(Y.key === null ? O : Y.key) || null), x(N, B, Y, ue));
          case b:
            return ((B = B.get(Y.key === null ? O : Y.key) || null), I(N, B, Y, ue));
          case W:
            return ((Y = Ea(Y)), z(B, N, O, Y, ue));
        }
        if (he(Y) || fe(Y)) return ((B = B.get(O) || null), $(N, B, Y, ue, null));
        if (typeof Y.then == 'function') return z(B, N, O, ms(Y), ue);
        if (Y.$$typeof === M) return z(B, N, O, os(N, Y), ue);
        _s(N, Y);
      }
      return null;
    }
    function ae(B, N, O, Y) {
      for (
        var ue = null, Ae = null, se = N, ye = (N = 0), Ce = null;
        se !== null && ye < O.length;
        ye++
      ) {
        se.index > ye ? ((Ce = se), (se = null)) : (Ce = se.sibling);
        var Le = D(B, se, O[ye], Y);
        if (Le === null) {
          se === null && (se = Ce);
          break;
        }
        (e && se && Le.alternate === null && t(B, se),
          (N = u(Le, N, ye)),
          Ae === null ? (ue = Le) : (Ae.sibling = Le),
          (Ae = Le),
          (se = Ce));
      }
      if (ye === O.length) return (a(B, se), Ne && bl(B, ye), ue);
      if (se === null) {
        for (; ye < O.length; ye++)
          ((se = X(B, O[ye], Y)),
            se !== null &&
              ((N = u(se, N, ye)), Ae === null ? (ue = se) : (Ae.sibling = se), (Ae = se)));
        return (Ne && bl(B, ye), ue);
      }
      for (se = n(se); ye < O.length; ye++)
        ((Ce = z(se, B, ye, O[ye], Y)),
          Ce !== null &&
            (e && Ce.alternate !== null && se.delete(Ce.key === null ? ye : Ce.key),
            (N = u(Ce, N, ye)),
            Ae === null ? (ue = Ce) : (Ae.sibling = Ce),
            (Ae = Ce)));
      return (
        e &&
          se.forEach(function (ma) {
            return t(B, ma);
          }),
        Ne && bl(B, ye),
        ue
      );
    }
    function me(B, N, O, Y) {
      if (O == null) throw Error(r(151));
      for (
        var ue = null, Ae = null, se = N, ye = (N = 0), Ce = null, Le = O.next();
        se !== null && !Le.done;
        ye++, Le = O.next()
      ) {
        se.index > ye ? ((Ce = se), (se = null)) : (Ce = se.sibling);
        var ma = D(B, se, Le.value, Y);
        if (ma === null) {
          se === null && (se = Ce);
          break;
        }
        (e && se && ma.alternate === null && t(B, se),
          (N = u(ma, N, ye)),
          Ae === null ? (ue = ma) : (Ae.sibling = ma),
          (Ae = ma),
          (se = Ce));
      }
      if (Le.done) return (a(B, se), Ne && bl(B, ye), ue);
      if (se === null) {
        for (; !Le.done; ye++, Le = O.next())
          ((Le = X(B, Le.value, Y)),
            Le !== null &&
              ((N = u(Le, N, ye)), Ae === null ? (ue = Le) : (Ae.sibling = Le), (Ae = Le)));
        return (Ne && bl(B, ye), ue);
      }
      for (se = n(se); !Le.done; ye++, Le = O.next())
        ((Le = z(se, B, ye, Le.value, Y)),
          Le !== null &&
            (e && Le.alternate !== null && se.delete(Le.key === null ? ye : Le.key),
            (N = u(Le, N, ye)),
            Ae === null ? (ue = Le) : (Ae.sibling = Le),
            (Ae = Le)));
      return (
        e &&
          se.forEach(function (Mv) {
            return t(B, Mv);
          }),
        Ne && bl(B, ye),
        ue
      );
    }
    function ze(B, N, O, Y) {
      if (
        (typeof O == 'object' &&
          O !== null &&
          O.type === L &&
          O.key === null &&
          (O = O.props.children),
        typeof O == 'object' && O !== null)
      ) {
        switch (O.$$typeof) {
          case q:
            e: {
              for (var ue = O.key; N !== null; ) {
                if (N.key === ue) {
                  if (((ue = O.type), ue === L)) {
                    if (N.tag === 7) {
                      (a(B, N.sibling), (Y = s(N, O.props.children)), (Y.return = B), (B = Y));
                      break e;
                    }
                  } else if (
                    N.elementType === ue ||
                    (typeof ue == 'object' && ue !== null && ue.$$typeof === W && Ea(ue) === N.type)
                  ) {
                    (a(B, N.sibling), (Y = s(N, O.props)), ei(Y, O), (Y.return = B), (B = Y));
                    break e;
                  }
                  a(B, N);
                  break;
                } else t(B, N);
                N = N.sibling;
              }
              O.type === L
                ? ((Y = ba(O.props.children, B.mode, Y, O.key)), (Y.return = B), (B = Y))
                : ((Y = is(O.type, O.key, O.props, null, B.mode, Y)),
                  ei(Y, O),
                  (Y.return = B),
                  (B = Y));
            }
            return m(B);
          case b:
            e: {
              for (ue = O.key; N !== null; ) {
                if (N.key === ue)
                  if (
                    N.tag === 4 &&
                    N.stateNode.containerInfo === O.containerInfo &&
                    N.stateNode.implementation === O.implementation
                  ) {
                    (a(B, N.sibling), (Y = s(N, O.children || [])), (Y.return = B), (B = Y));
                    break e;
                  } else {
                    a(B, N);
                    break;
                  }
                else t(B, N);
                N = N.sibling;
              }
              ((Y = fo(O, B.mode, Y)), (Y.return = B), (B = Y));
            }
            return m(B);
          case W:
            return ((O = Ea(O)), ze(B, N, O, Y));
        }
        if (he(O)) return ae(B, N, O, Y);
        if (fe(O)) {
          if (((ue = fe(O)), typeof ue != 'function')) throw Error(r(150));
          return ((O = ue.call(O)), me(B, N, O, Y));
        }
        if (typeof O.then == 'function') return ze(B, N, ms(O), Y);
        if (O.$$typeof === M) return ze(B, N, os(B, O), Y);
        _s(B, O);
      }
      return (typeof O == 'string' && O !== '') || typeof O == 'number' || typeof O == 'bigint'
        ? ((O = '' + O),
          N !== null && N.tag === 6
            ? (a(B, N.sibling), (Y = s(N, O)), (Y.return = B), (B = Y))
            : (a(B, N), (Y = _o(O, B.mode, Y)), (Y.return = B), (B = Y)),
          m(B))
        : a(B, N);
    }
    return function (B, N, O, Y) {
      try {
        Fn = 0;
        var ue = ze(B, N, O, Y);
        return ((nn = null), ue);
      } catch (se) {
        if (se === an || se === cs) throw se;
        var Ae = qt(29, se, null, B.mode);
        return ((Ae.lanes = Y), (Ae.return = B), Ae);
      } finally {
      }
    };
  }
  var Na = pm(!0),
    hm = pm(!1),
    Zl = !1;
  function Eo(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Co(e, t) {
    ((e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        }));
  }
  function Jl(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Pl(e, t, a) {
    var n = e.updateQueue;
    if (n === null) return null;
    if (((n = n.shared), (Me & 2) !== 0)) {
      var s = n.pending;
      return (
        s === null ? (t.next = t) : ((t.next = s.next), (s.next = t)),
        (n.pending = t),
        (t = ns(e)),
        Fd(e, null, a),
        t
      );
    }
    return (as(e, n, t, a), ns(e));
  }
  function ti(e, t, a) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194048) !== 0))) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (a |= n), (t.lanes = a), rd(e, a));
    }
  }
  function No(e, t) {
    var a = e.updateQueue,
      n = e.alternate;
    if (n !== null && ((n = n.updateQueue), a === n)) {
      var s = null,
        u = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var m = { lane: a.lane, tag: a.tag, payload: a.payload, callback: null, next: null };
          (u === null ? (s = u = m) : (u = u.next = m), (a = a.next));
        } while (a !== null);
        u === null ? (s = u = t) : (u = u.next = t);
      } else s = u = t;
      ((a = {
        baseState: n.baseState,
        firstBaseUpdate: s,
        lastBaseUpdate: u,
        shared: n.shared,
        callbacks: n.callbacks,
      }),
        (e.updateQueue = a));
      return;
    }
    ((e = a.lastBaseUpdate),
      e === null ? (a.firstBaseUpdate = t) : (e.next = t),
      (a.lastBaseUpdate = t));
  }
  var Ao = !1;
  function li() {
    if (Ao) {
      var e = ln;
      if (e !== null) throw e;
    }
  }
  function ai(e, t, a, n) {
    Ao = !1;
    var s = e.updateQueue;
    Zl = !1;
    var u = s.firstBaseUpdate,
      m = s.lastBaseUpdate,
      g = s.shared.pending;
    if (g !== null) {
      s.shared.pending = null;
      var x = g,
        I = x.next;
      ((x.next = null), m === null ? (u = I) : (m.next = I), (m = x));
      var $ = e.alternate;
      $ !== null &&
        (($ = $.updateQueue),
        (g = $.lastBaseUpdate),
        g !== m && (g === null ? ($.firstBaseUpdate = I) : (g.next = I), ($.lastBaseUpdate = x)));
    }
    if (u !== null) {
      var X = s.baseState;
      ((m = 0), ($ = I = x = null), (g = u));
      do {
        var D = g.lane & -536870913,
          z = D !== g.lane;
        if (z ? (Ee & D) === D : (n & D) === D) {
          (D !== 0 && D === tn && (Ao = !0),
            $ !== null &&
              ($ = $.next =
                { lane: 0, tag: g.tag, payload: g.payload, callback: null, next: null }));
          e: {
            var ae = e,
              me = g;
            D = t;
            var ze = a;
            switch (me.tag) {
              case 1:
                if (((ae = me.payload), typeof ae == 'function')) {
                  X = ae.call(ze, X, D);
                  break e;
                }
                X = ae;
                break e;
              case 3:
                ae.flags = (ae.flags & -65537) | 128;
              case 0:
                if (
                  ((ae = me.payload),
                  (D = typeof ae == 'function' ? ae.call(ze, X, D) : ae),
                  D == null)
                )
                  break e;
                X = y({}, X, D);
                break e;
              case 2:
                Zl = !0;
            }
          }
          ((D = g.callback),
            D !== null &&
              ((e.flags |= 64),
              z && (e.flags |= 8192),
              (z = s.callbacks),
              z === null ? (s.callbacks = [D]) : z.push(D)));
        } else
          ((z = { lane: D, tag: g.tag, payload: g.payload, callback: g.callback, next: null }),
            $ === null ? ((I = $ = z), (x = X)) : ($ = $.next = z),
            (m |= D));
        if (((g = g.next), g === null)) {
          if (((g = s.shared.pending), g === null)) break;
          ((z = g),
            (g = z.next),
            (z.next = null),
            (s.lastBaseUpdate = z),
            (s.shared.pending = null));
        }
      } while (!0);
      ($ === null && (x = X),
        (s.baseState = x),
        (s.firstBaseUpdate = I),
        (s.lastBaseUpdate = $),
        u === null && (s.shared.lanes = 0),
        (la |= m),
        (e.lanes = m),
        (e.memoizedState = X));
    }
  }
  function gm(e, t) {
    if (typeof e != 'function') throw Error(r(191, e));
    e.call(t);
  }
  function km(e, t) {
    var a = e.callbacks;
    if (a !== null) for (e.callbacks = null, e = 0; e < a.length; e++) gm(a[e], t);
  }
  var sn = w(null),
    fs = w(0);
  function vm(e, t) {
    ((e = Ml), Z(fs, e), Z(sn, t), (Ml = e | t.baseLanes));
  }
  function Lo() {
    (Z(fs, Ml), Z(sn, sn.current));
  }
  function jo() {
    ((Ml = fs.current), R(sn), R(fs));
  }
  var Ot = w(null),
    Zt = null;
  function Wl(e) {
    var t = e.alternate;
    (Z(tt, tt.current & 1),
      Z(Ot, e),
      Zt === null && (t === null || sn.current !== null || t.memoizedState !== null) && (Zt = e));
  }
  function Mo(e) {
    (Z(tt, tt.current), Z(Ot, e), Zt === null && (Zt = e));
  }
  function ym(e) {
    e.tag === 22 ? (Z(tt, tt.current), Z(Ot, e), Zt === null && (Zt = e)) : Fl();
  }
  function Fl() {
    (Z(tt, tt.current), Z(Ot, Ot.current));
  }
  function It(e) {
    (R(Ot), Zt === e && (Zt = null), R(tt));
  }
  var tt = w(0);
  function ps(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || Ru(a) || zu(a))) return t;
      } else if (
        t.tag === 19 &&
        (t.memoizedProps.revealOrder === 'forwards' ||
          t.memoizedProps.revealOrder === 'backwards' ||
          t.memoizedProps.revealOrder === 'unstable_legacy-backwards' ||
          t.memoizedProps.revealOrder === 'together')
      ) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  var wl = 0,
    ve = null,
    De = null,
    it = null,
    hs = !1,
    rn = !1,
    Aa = !1,
    gs = 0,
    ni = 0,
    on = null,
    xk = 0;
  function Je() {
    throw Error(r(321));
  }
  function Bo(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++) if (!Bt(e[a], t[a])) return !1;
    return !0;
  }
  function qo(e, t, a, n, s, u) {
    return (
      (wl = u),
      (ve = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (j.H = e === null || e.memoizedState === null ? a_ : Zo),
      (Aa = !1),
      (u = a(n, s)),
      (Aa = !1),
      rn && (u = xm(t, a, n, s)),
      bm(e),
      u
    );
  }
  function bm(e) {
    j.H = ri;
    var t = De !== null && De.next !== null;
    if (((wl = 0), (it = De = ve = null), (hs = !1), (ni = 0), (on = null), t)) throw Error(r(300));
    e === null || st || ((e = e.dependencies), e !== null && rs(e) && (st = !0));
  }
  function xm(e, t, a, n) {
    ve = e;
    var s = 0;
    do {
      if ((rn && (on = null), (ni = 0), (rn = !1), 25 <= s)) throw Error(r(301));
      if (((s += 1), (it = De = null), e.updateQueue != null)) {
        var u = e.updateQueue;
        ((u.lastEffect = null),
          (u.events = null),
          (u.stores = null),
          u.memoCache != null && (u.memoCache.index = 0));
      }
      ((j.H = n_), (u = t(a, n)));
    } while (rn);
    return u;
  }
  function Sk() {
    var e = j.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? ii(t) : t),
      (e = e.useState()[0]),
      (De !== null ? De.memoizedState : null) !== e && (ve.flags |= 1024),
      t
    );
  }
  function Oo() {
    var e = gs !== 0;
    return ((gs = 0), e);
  }
  function Io(e, t, a) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a));
  }
  function Do(e) {
    if (hs) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      hs = !1;
    }
    ((wl = 0), (it = De = ve = null), (rn = !1), (ni = gs = 0), (on = null));
  }
  function yt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (it === null ? (ve.memoizedState = it = e) : (it = it.next = e), it);
  }
  function lt() {
    if (De === null) {
      var e = ve.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = De.next;
    var t = it === null ? ve.memoizedState : it.next;
    if (t !== null) ((it = t), (De = e));
    else {
      if (e === null) throw ve.alternate === null ? Error(r(467)) : Error(r(310));
      ((De = e),
        (e = {
          memoizedState: De.memoizedState,
          baseState: De.baseState,
          baseQueue: De.baseQueue,
          queue: De.queue,
          next: null,
        }),
        it === null ? (ve.memoizedState = it = e) : (it = it.next = e));
    }
    return it;
  }
  function ks() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ii(e) {
    var t = ni;
    return (
      (ni += 1),
      on === null && (on = []),
      (e = mm(on, e, t)),
      (t = ve),
      (it === null ? t.memoizedState : it.next) === null &&
        ((t = t.alternate), (j.H = t === null || t.memoizedState === null ? a_ : Zo)),
      e
    );
  }
  function vs(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return ii(e);
      if (e.$$typeof === M) return ht(e);
    }
    throw Error(r(438, String(e)));
  }
  function Ro(e) {
    var t = null,
      a = ve.updateQueue;
    if ((a !== null && (t = a.memoCache), t == null)) {
      var n = ve.alternate;
      n !== null &&
        ((n = n.updateQueue),
        n !== null &&
          ((n = n.memoCache),
          n != null &&
            (t = {
              data: n.data.map(function (s) {
                return s.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      a === null && ((a = ks()), (ve.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(e), n = 0; n < e; n++) a[n] = te;
    return (t.index++, a);
  }
  function Tl(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function ys(e) {
    var t = lt();
    return zo(t, De, e);
  }
  function zo(e, t, a) {
    var n = e.queue;
    if (n === null) throw Error(r(311));
    n.lastRenderedReducer = a;
    var s = e.baseQueue,
      u = n.pending;
    if (u !== null) {
      if (s !== null) {
        var m = s.next;
        ((s.next = u.next), (u.next = m));
      }
      ((t.baseQueue = s = u), (n.pending = null));
    }
    if (((u = e.baseState), s === null)) e.memoizedState = u;
    else {
      t = s.next;
      var g = (m = null),
        x = null,
        I = t,
        $ = !1;
      do {
        var X = I.lane & -536870913;
        if (X !== I.lane ? (Ee & X) === X : (wl & X) === X) {
          var D = I.revertLane;
          if (D === 0)
            (x !== null &&
              (x = x.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: I.action,
                  hasEagerState: I.hasEagerState,
                  eagerState: I.eagerState,
                  next: null,
                }),
              X === tn && ($ = !0));
          else if ((wl & D) === D) {
            ((I = I.next), D === tn && ($ = !0));
            continue;
          } else
            ((X = {
              lane: 0,
              revertLane: I.revertLane,
              gesture: null,
              action: I.action,
              hasEagerState: I.hasEagerState,
              eagerState: I.eagerState,
              next: null,
            }),
              x === null ? ((g = x = X), (m = u)) : (x = x.next = X),
              (ve.lanes |= D),
              (la |= D));
          ((X = I.action), Aa && a(u, X), (u = I.hasEagerState ? I.eagerState : a(u, X)));
        } else
          ((D = {
            lane: X,
            revertLane: I.revertLane,
            gesture: I.gesture,
            action: I.action,
            hasEagerState: I.hasEagerState,
            eagerState: I.eagerState,
            next: null,
          }),
            x === null ? ((g = x = D), (m = u)) : (x = x.next = D),
            (ve.lanes |= X),
            (la |= X));
        I = I.next;
      } while (I !== null && I !== t);
      if (
        (x === null ? (m = u) : (x.next = g),
        !Bt(u, e.memoizedState) && ((st = !0), $ && ((a = ln), a !== null)))
      )
        throw a;
      ((e.memoizedState = u), (e.baseState = m), (e.baseQueue = x), (n.lastRenderedState = u));
    }
    return (s === null && (n.lanes = 0), [e.memoizedState, n.dispatch]);
  }
  function Ho(e) {
    var t = lt(),
      a = t.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = e;
    var n = a.dispatch,
      s = a.pending,
      u = t.memoizedState;
    if (s !== null) {
      a.pending = null;
      var m = (s = s.next);
      do ((u = e(u, m.action)), (m = m.next));
      while (m !== s);
      (Bt(u, t.memoizedState) || (st = !0),
        (t.memoizedState = u),
        t.baseQueue === null && (t.baseState = u),
        (a.lastRenderedState = u));
    }
    return [u, n];
  }
  function Sm(e, t, a) {
    var n = ve,
      s = lt(),
      u = Ne;
    if (u) {
      if (a === void 0) throw Error(r(407));
      a = a();
    } else a = t();
    var m = !Bt((De || s).memoizedState, a);
    if (
      (m && ((s.memoizedState = a), (st = !0)),
      (s = s.queue),
      $o(Em.bind(null, n, s, e), [e]),
      s.getSnapshot !== t || m || (it !== null && it.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        un(9, { destroy: void 0 }, Tm.bind(null, n, s, a, t), null),
        $e === null)
      )
        throw Error(r(349));
      u || (wl & 127) !== 0 || wm(n, t, a);
    }
    return a;
  }
  function wm(e, t, a) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: a }),
      (t = ve.updateQueue),
      t === null
        ? ((t = ks()), (ve.updateQueue = t), (t.stores = [e]))
        : ((a = t.stores), a === null ? (t.stores = [e]) : a.push(e)));
  }
  function Tm(e, t, a, n) {
    ((t.value = a), (t.getSnapshot = n), Cm(t) && Nm(e));
  }
  function Em(e, t, a) {
    return a(function () {
      Cm(t) && Nm(e);
    });
  }
  function Cm(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !Bt(e, a);
    } catch {
      return !0;
    }
  }
  function Nm(e) {
    var t = ya(e, 2);
    t !== null && At(t, e, 2);
  }
  function Uo(e) {
    var t = yt();
    if (typeof e == 'function') {
      var a = e;
      if (((e = a()), Aa)) {
        Gl(!0);
        try {
          a();
        } finally {
          Gl(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Tl,
        lastRenderedState: e,
      }),
      t
    );
  }
  function Am(e, t, a, n) {
    return ((e.baseState = a), zo(e, De, typeof n == 'function' ? n : Tl));
  }
  function wk(e, t, a, n, s) {
    if (Ss(e)) throw Error(r(485));
    if (((e = t.action), e !== null)) {
      var u = {
        payload: s,
        action: e,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (m) {
          u.listeners.push(m);
        },
      };
      (j.T !== null ? a(!0) : (u.isTransition = !1),
        n(u),
        (a = t.pending),
        a === null
          ? ((u.next = t.pending = u), Lm(t, u))
          : ((u.next = a.next), (t.pending = a.next = u)));
    }
  }
  function Lm(e, t) {
    var a = t.action,
      n = t.payload,
      s = e.state;
    if (t.isTransition) {
      var u = j.T,
        m = {};
      j.T = m;
      try {
        var g = a(s, n),
          x = j.S;
        (x !== null && x(m, g), jm(e, t, g));
      } catch (I) {
        Go(e, t, I);
      } finally {
        (u !== null && m.types !== null && (u.types = m.types), (j.T = u));
      }
    } else
      try {
        ((u = a(s, n)), jm(e, t, u));
      } catch (I) {
        Go(e, t, I);
      }
  }
  function jm(e, t, a) {
    a !== null && typeof a == 'object' && typeof a.then == 'function'
      ? a.then(
          function (n) {
            Mm(e, t, n);
          },
          function (n) {
            return Go(e, t, n);
          }
        )
      : Mm(e, t, a);
  }
  function Mm(e, t, a) {
    ((t.status = 'fulfilled'),
      (t.value = a),
      Bm(t),
      (e.state = a),
      (t = e.pending),
      t !== null &&
        ((a = t.next), a === t ? (e.pending = null) : ((a = a.next), (t.next = a), Lm(e, a))));
  }
  function Go(e, t, a) {
    var n = e.pending;
    if (((e.pending = null), n !== null)) {
      n = n.next;
      do ((t.status = 'rejected'), (t.reason = a), Bm(t), (t = t.next));
      while (t !== n);
    }
    e.action = null;
  }
  function Bm(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function qm(e, t) {
    return t;
  }
  function Om(e, t) {
    if (Ne) {
      var a = $e.formState;
      if (a !== null) {
        e: {
          var n = ve;
          if (Ne) {
            if (Ye) {
              t: {
                for (var s = Ye, u = Kt; s.nodeType !== 8; ) {
                  if (!u) {
                    s = null;
                    break t;
                  }
                  if (((s = Jt(s.nextSibling)), s === null)) {
                    s = null;
                    break t;
                  }
                }
                ((u = s.data), (s = u === 'F!' || u === 'F' ? s : null));
              }
              if (s) {
                ((Ye = Jt(s.nextSibling)), (n = s.data === 'F!'));
                break e;
              }
            }
            Ql(n);
          }
          n = !1;
        }
        n && (t = a[0]);
      }
    }
    return (
      (a = yt()),
      (a.memoizedState = a.baseState = t),
      (n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: qm,
        lastRenderedState: t,
      }),
      (a.queue = n),
      (a = e_.bind(null, ve, n)),
      (n.dispatch = a),
      (n = Uo(!1)),
      (u = Ko.bind(null, ve, !1, n.queue)),
      (n = yt()),
      (s = { state: t, dispatch: null, action: e, pending: null }),
      (n.queue = s),
      (a = wk.bind(null, ve, s, u, a)),
      (s.dispatch = a),
      (n.memoizedState = e),
      [t, a, !1]
    );
  }
  function Im(e) {
    var t = lt();
    return Dm(t, De, e);
  }
  function Dm(e, t, a) {
    if (
      ((t = zo(e, t, qm)[0]),
      (e = ys(Tl)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var n = ii(t);
      } catch (m) {
        throw m === an ? cs : m;
      }
    else n = t;
    t = lt();
    var s = t.queue,
      u = s.dispatch;
    return (
      a !== t.memoizedState &&
        ((ve.flags |= 2048), un(9, { destroy: void 0 }, Tk.bind(null, s, a), null)),
      [n, u, e]
    );
  }
  function Tk(e, t) {
    e.action = t;
  }
  function Rm(e) {
    var t = lt(),
      a = De;
    if (a !== null) return Dm(t, a, e);
    (lt(), (t = t.memoizedState), (a = lt()));
    var n = a.queue.dispatch;
    return ((a.memoizedState = e), [t, n, !1]);
  }
  function un(e, t, a, n) {
    return (
      (e = { tag: e, create: a, deps: n, inst: t, next: null }),
      (t = ve.updateQueue),
      t === null && ((t = ks()), (ve.updateQueue = t)),
      (a = t.lastEffect),
      a === null
        ? (t.lastEffect = e.next = e)
        : ((n = a.next), (a.next = e), (e.next = n), (t.lastEffect = e)),
      e
    );
  }
  function zm() {
    return lt().memoizedState;
  }
  function bs(e, t, a, n) {
    var s = yt();
    ((ve.flags |= e),
      (s.memoizedState = un(1 | t, { destroy: void 0 }, a, n === void 0 ? null : n)));
  }
  function xs(e, t, a, n) {
    var s = lt();
    n = n === void 0 ? null : n;
    var u = s.memoizedState.inst;
    De !== null && n !== null && Bo(n, De.memoizedState.deps)
      ? (s.memoizedState = un(t, u, a, n))
      : ((ve.flags |= e), (s.memoizedState = un(1 | t, u, a, n)));
  }
  function Hm(e, t) {
    bs(8390656, 8, e, t);
  }
  function $o(e, t) {
    xs(2048, 8, e, t);
  }
  function Ek(e) {
    ve.flags |= 4;
    var t = ve.updateQueue;
    if (t === null) ((t = ks()), (ve.updateQueue = t), (t.events = [e]));
    else {
      var a = t.events;
      a === null ? (t.events = [e]) : a.push(e);
    }
  }
  function Um(e) {
    var t = lt().memoizedState;
    return (
      Ek({ ref: t, nextImpl: e }),
      function () {
        if ((Me & 2) !== 0) throw Error(r(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function Gm(e, t) {
    return xs(4, 2, e, t);
  }
  function $m(e, t) {
    return xs(4, 4, e, t);
  }
  function Ym(e, t) {
    if (typeof t == 'function') {
      e = e();
      var a = t(e);
      return function () {
        typeof a == 'function' ? a() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function Xm(e, t, a) {
    ((a = a != null ? a.concat([e]) : null), xs(4, 4, Ym.bind(null, t, e), a));
  }
  function Yo() {}
  function Vm(e, t) {
    var a = lt();
    t = t === void 0 ? null : t;
    var n = a.memoizedState;
    return t !== null && Bo(t, n[1]) ? n[0] : ((a.memoizedState = [e, t]), e);
  }
  function Qm(e, t) {
    var a = lt();
    t = t === void 0 ? null : t;
    var n = a.memoizedState;
    if (t !== null && Bo(t, n[1])) return n[0];
    if (((n = e()), Aa)) {
      Gl(!0);
      try {
        e();
      } finally {
        Gl(!1);
      }
    }
    return ((a.memoizedState = [n, t]), n);
  }
  function Xo(e, t, a) {
    return a === void 0 || ((wl & 1073741824) !== 0 && (Ee & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = a), (e = K_()), (ve.lanes |= e), (la |= e), a);
  }
  function Km(e, t, a, n) {
    return Bt(a, t)
      ? a
      : sn.current !== null
        ? ((e = Xo(e, a, n)), Bt(e, t) || (st = !0), e)
        : (wl & 42) === 0 || ((wl & 1073741824) !== 0 && (Ee & 261930) === 0)
          ? ((st = !0), (e.memoizedState = a))
          : ((e = K_()), (ve.lanes |= e), (la |= e), t);
  }
  function Zm(e, t, a, n, s) {
    var u = Q.p;
    Q.p = u !== 0 && 8 > u ? u : 8;
    var m = j.T,
      g = {};
    ((j.T = g), Ko(e, !1, t, a));
    try {
      var x = s(),
        I = j.S;
      if (
        (I !== null && I(g, x), x !== null && typeof x == 'object' && typeof x.then == 'function')
      ) {
        var $ = bk(x, n);
        si(e, t, $, zt(e));
      } else si(e, t, n, zt(e));
    } catch (X) {
      si(e, t, { then: function () {}, status: 'rejected', reason: X }, zt());
    } finally {
      ((Q.p = u), m !== null && g.types !== null && (m.types = g.types), (j.T = m));
    }
  }
  function Ck() {}
  function Vo(e, t, a, n) {
    if (e.tag !== 5) throw Error(r(476));
    var s = Jm(e).queue;
    Zm(
      e,
      s,
      t,
      U,
      a === null
        ? Ck
        : function () {
            return (Pm(e), a(n));
          }
    );
  }
  function Jm(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: U,
      baseState: U,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Tl,
        lastRenderedState: U,
      },
      next: null,
    };
    var a = {};
    return (
      (t.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Tl,
          lastRenderedState: a,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function Pm(e) {
    var t = Jm(e);
    (t.next === null && (t = e.alternate.memoizedState), si(e, t.next.queue, {}, zt()));
  }
  function Qo() {
    return ht(Si);
  }
  function Wm() {
    return lt().memoizedState;
  }
  function Fm() {
    return lt().memoizedState;
  }
  function Nk(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = zt();
          e = Jl(a);
          var n = Pl(t, e, a);
          (n !== null && (At(n, t, a), ti(n, t, a)), (t = { cache: xo() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function Ak(e, t, a) {
    var n = zt();
    ((a = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Ss(e) ? t_(t, a) : ((a = co(e, t, a, n)), a !== null && (At(a, e, n), l_(a, t, n))));
  }
  function e_(e, t, a) {
    var n = zt();
    si(e, t, a, n);
  }
  function si(e, t, a, n) {
    var s = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Ss(e)) t_(t, s);
    else {
      var u = e.alternate;
      if (
        e.lanes === 0 &&
        (u === null || u.lanes === 0) &&
        ((u = t.lastRenderedReducer), u !== null)
      )
        try {
          var m = t.lastRenderedState,
            g = u(m, a);
          if (((s.hasEagerState = !0), (s.eagerState = g), Bt(g, m)))
            return (as(e, t, s, 0), $e === null && ls(), !1);
        } catch {
        } finally {
        }
      if (((a = co(e, t, s, n)), a !== null)) return (At(a, e, n), l_(a, t, n), !0);
    }
    return !1;
  }
  function Ko(e, t, a, n) {
    if (
      ((n = {
        lane: 2,
        revertLane: Eu(),
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Ss(e))
    ) {
      if (t) throw Error(r(479));
    } else ((t = co(e, a, n, 2)), t !== null && At(t, e, 2));
  }
  function Ss(e) {
    var t = e.alternate;
    return e === ve || (t !== null && t === ve);
  }
  function t_(e, t) {
    rn = hs = !0;
    var a = e.pending;
    (a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)), (e.pending = t));
  }
  function l_(e, t, a) {
    if ((a & 4194048) !== 0) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (a |= n), (t.lanes = a), rd(e, a));
    }
  }
  var ri = {
    readContext: ht,
    use: vs,
    useCallback: Je,
    useContext: Je,
    useEffect: Je,
    useImperativeHandle: Je,
    useLayoutEffect: Je,
    useInsertionEffect: Je,
    useMemo: Je,
    useReducer: Je,
    useRef: Je,
    useState: Je,
    useDebugValue: Je,
    useDeferredValue: Je,
    useTransition: Je,
    useSyncExternalStore: Je,
    useId: Je,
    useHostTransitionStatus: Je,
    useFormState: Je,
    useActionState: Je,
    useOptimistic: Je,
    useMemoCache: Je,
    useCacheRefresh: Je,
  };
  ri.useEffectEvent = Je;
  var a_ = {
      readContext: ht,
      use: vs,
      useCallback: function (e, t) {
        return ((yt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: ht,
      useEffect: Hm,
      useImperativeHandle: function (e, t, a) {
        ((a = a != null ? a.concat([e]) : null), bs(4194308, 4, Ym.bind(null, t, e), a));
      },
      useLayoutEffect: function (e, t) {
        return bs(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        bs(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var a = yt();
        t = t === void 0 ? null : t;
        var n = e();
        if (Aa) {
          Gl(!0);
          try {
            e();
          } finally {
            Gl(!1);
          }
        }
        return ((a.memoizedState = [n, t]), n);
      },
      useReducer: function (e, t, a) {
        var n = yt();
        if (a !== void 0) {
          var s = a(t);
          if (Aa) {
            Gl(!0);
            try {
              a(t);
            } finally {
              Gl(!1);
            }
          }
        } else s = t;
        return (
          (n.memoizedState = n.baseState = s),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: s,
          }),
          (n.queue = e),
          (e = e.dispatch = Ak.bind(null, ve, e)),
          [n.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = yt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = Uo(e);
        var t = e.queue,
          a = e_.bind(null, ve, t);
        return ((t.dispatch = a), [e.memoizedState, a]);
      },
      useDebugValue: Yo,
      useDeferredValue: function (e, t) {
        var a = yt();
        return Xo(a, e, t);
      },
      useTransition: function () {
        var e = Uo(!1);
        return ((e = Zm.bind(null, ve, e.queue, !0, !1)), (yt().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, a) {
        var n = ve,
          s = yt();
        if (Ne) {
          if (a === void 0) throw Error(r(407));
          a = a();
        } else {
          if (((a = t()), $e === null)) throw Error(r(349));
          (Ee & 127) !== 0 || wm(n, t, a);
        }
        s.memoizedState = a;
        var u = { value: a, getSnapshot: t };
        return (
          (s.queue = u),
          Hm(Em.bind(null, n, u, e), [e]),
          (n.flags |= 2048),
          un(9, { destroy: void 0 }, Tm.bind(null, n, u, a, t), null),
          a
        );
      },
      useId: function () {
        var e = yt(),
          t = $e.identifierPrefix;
        if (Ne) {
          var a = ml,
            n = dl;
          ((a = (n & ~(1 << (32 - Mt(n) - 1))).toString(32) + a),
            (t = '_' + t + 'R_' + a),
            (a = gs++),
            0 < a && (t += 'H' + a.toString(32)),
            (t += '_'));
        } else ((a = xk++), (t = '_' + t + 'r_' + a.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: Qo,
      useFormState: Om,
      useActionState: Om,
      useOptimistic: function (e) {
        var t = yt();
        t.memoizedState = t.baseState = e;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((t.queue = a), (t = Ko.bind(null, ve, !0, a)), (a.dispatch = t), [e, t]);
      },
      useMemoCache: Ro,
      useCacheRefresh: function () {
        return (yt().memoizedState = Nk.bind(null, ve));
      },
      useEffectEvent: function (e) {
        var t = yt(),
          a = { impl: e };
        return (
          (t.memoizedState = a),
          function () {
            if ((Me & 2) !== 0) throw Error(r(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Zo = {
      readContext: ht,
      use: vs,
      useCallback: Vm,
      useContext: ht,
      useEffect: $o,
      useImperativeHandle: Xm,
      useInsertionEffect: Gm,
      useLayoutEffect: $m,
      useMemo: Qm,
      useReducer: ys,
      useRef: zm,
      useState: function () {
        return ys(Tl);
      },
      useDebugValue: Yo,
      useDeferredValue: function (e, t) {
        var a = lt();
        return Km(a, De.memoizedState, e, t);
      },
      useTransition: function () {
        var e = ys(Tl)[0],
          t = lt().memoizedState;
        return [typeof e == 'boolean' ? e : ii(e), t];
      },
      useSyncExternalStore: Sm,
      useId: Wm,
      useHostTransitionStatus: Qo,
      useFormState: Im,
      useActionState: Im,
      useOptimistic: function (e, t) {
        var a = lt();
        return Am(a, De, e, t);
      },
      useMemoCache: Ro,
      useCacheRefresh: Fm,
    };
  Zo.useEffectEvent = Um;
  var n_ = {
    readContext: ht,
    use: vs,
    useCallback: Vm,
    useContext: ht,
    useEffect: $o,
    useImperativeHandle: Xm,
    useInsertionEffect: Gm,
    useLayoutEffect: $m,
    useMemo: Qm,
    useReducer: Ho,
    useRef: zm,
    useState: function () {
      return Ho(Tl);
    },
    useDebugValue: Yo,
    useDeferredValue: function (e, t) {
      var a = lt();
      return De === null ? Xo(a, e, t) : Km(a, De.memoizedState, e, t);
    },
    useTransition: function () {
      var e = Ho(Tl)[0],
        t = lt().memoizedState;
      return [typeof e == 'boolean' ? e : ii(e), t];
    },
    useSyncExternalStore: Sm,
    useId: Wm,
    useHostTransitionStatus: Qo,
    useFormState: Rm,
    useActionState: Rm,
    useOptimistic: function (e, t) {
      var a = lt();
      return De !== null ? Am(a, De, e, t) : ((a.baseState = e), [e, a.queue.dispatch]);
    },
    useMemoCache: Ro,
    useCacheRefresh: Fm,
  };
  n_.useEffectEvent = Um;
  function Jo(e, t, a, n) {
    ((t = e.memoizedState),
      (a = a(n, t)),
      (a = a == null ? t : y({}, t, a)),
      (e.memoizedState = a),
      e.lanes === 0 && (e.updateQueue.baseState = a));
  }
  var Po = {
    enqueueSetState: function (e, t, a) {
      e = e._reactInternals;
      var n = zt(),
        s = Jl(n);
      ((s.payload = t),
        a != null && (s.callback = a),
        (t = Pl(e, s, n)),
        t !== null && (At(t, e, n), ti(t, e, n)));
    },
    enqueueReplaceState: function (e, t, a) {
      e = e._reactInternals;
      var n = zt(),
        s = Jl(n);
      ((s.tag = 1),
        (s.payload = t),
        a != null && (s.callback = a),
        (t = Pl(e, s, n)),
        t !== null && (At(t, e, n), ti(t, e, n)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var a = zt(),
        n = Jl(a);
      ((n.tag = 2),
        t != null && (n.callback = t),
        (t = Pl(e, n, a)),
        t !== null && (At(t, e, a), ti(t, e, a)));
    },
  };
  function i_(e, t, a, n, s, u, m) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(n, u, m)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Qn(a, n) || !Qn(s, u)
          : !0
    );
  }
  function s_(e, t, a, n) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(a, n),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(a, n),
      t.state !== e && Po.enqueueReplaceState(t, t.state, null));
  }
  function La(e, t) {
    var a = t;
    if ('ref' in t) {
      a = {};
      for (var n in t) n !== 'ref' && (a[n] = t[n]);
    }
    if ((e = e.defaultProps)) {
      a === t && (a = y({}, a));
      for (var s in e) a[s] === void 0 && (a[s] = e[s]);
    }
    return a;
  }
  function r_(e) {
    ts(e);
  }
  function o_(e) {
    console.error(e);
  }
  function u_(e) {
    ts(e);
  }
  function ws(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function c_(e, t, a) {
    try {
      var n = e.onCaughtError;
      n(a.value, { componentStack: a.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (s) {
      setTimeout(function () {
        throw s;
      });
    }
  }
  function Wo(e, t, a) {
    return (
      (a = Jl(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        ws(e, t);
      }),
      a
    );
  }
  function d_(e) {
    return ((e = Jl(e)), (e.tag = 3), e);
  }
  function m_(e, t, a, n) {
    var s = a.type.getDerivedStateFromError;
    if (typeof s == 'function') {
      var u = n.value;
      ((e.payload = function () {
        return s(u);
      }),
        (e.callback = function () {
          c_(t, a, n);
        }));
    }
    var m = a.stateNode;
    m !== null &&
      typeof m.componentDidCatch == 'function' &&
      (e.callback = function () {
        (c_(t, a, n),
          typeof s != 'function' && (aa === null ? (aa = new Set([this])) : aa.add(this)));
        var g = n.stack;
        this.componentDidCatch(n.value, { componentStack: g !== null ? g : '' });
      });
  }
  function Lk(e, t, a, n, s) {
    if (((a.flags |= 32768), n !== null && typeof n == 'object' && typeof n.then == 'function')) {
      if (((t = a.alternate), t !== null && en(t, a, s, !0), (a = Ot.current), a !== null)) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              Zt === null ? Is() : a.alternate === null && Pe === 0 && (Pe = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = s),
              n === ds
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([n])) : t.add(n),
                  Su(e, n, s)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              n === ds
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([n]) }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue), a === null ? (t.retryQueue = new Set([n])) : a.add(n)),
                  Su(e, n, s)),
              !1
            );
        }
        throw Error(r(435, a.tag));
      }
      return (Su(e, n, s), Is(), !1);
    }
    if (Ne)
      return (
        (t = Ot.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = s),
            n !== go && ((e = Error(r(422), { cause: n })), Jn(Xt(e, a))))
          : (n !== go && ((t = Error(r(423), { cause: n })), Jn(Xt(t, a))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (s &= -s),
            (e.lanes |= s),
            (n = Xt(n, a)),
            (s = Wo(e.stateNode, n, s)),
            No(e, s),
            Pe !== 4 && (Pe = 2)),
        !1
      );
    var u = Error(r(520), { cause: n });
    if (((u = Xt(u, a)), pi === null ? (pi = [u]) : pi.push(u), Pe !== 4 && (Pe = 2), t === null))
      return !0;
    ((n = Xt(n, a)), (a = t));
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (e = s & -s),
            (a.lanes |= e),
            (e = Wo(a.stateNode, n, e)),
            No(a, e),
            !1
          );
        case 1:
          if (
            ((t = a.type),
            (u = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == 'function' ||
                (u !== null &&
                  typeof u.componentDidCatch == 'function' &&
                  (aa === null || !aa.has(u)))))
          )
            return (
              (a.flags |= 65536),
              (s &= -s),
              (a.lanes |= s),
              (s = d_(s)),
              m_(s, e, a, n),
              No(a, s),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var Fo = Error(r(461)),
    st = !1;
  function gt(e, t, a, n) {
    t.child = e === null ? hm(t, null, a, n) : Na(t, e.child, a, n);
  }
  function __(e, t, a, n, s) {
    a = a.render;
    var u = t.ref;
    if ('ref' in n) {
      var m = {};
      for (var g in n) g !== 'ref' && (m[g] = n[g]);
    } else m = n;
    return (
      wa(t),
      (n = qo(e, t, a, m, u, s)),
      (g = Oo()),
      e !== null && !st
        ? (Io(e, t, s), El(e, t, s))
        : (Ne && g && po(t), (t.flags |= 1), gt(e, t, n, s), t.child)
    );
  }
  function f_(e, t, a, n, s) {
    if (e === null) {
      var u = a.type;
      return typeof u == 'function' && !mo(u) && u.defaultProps === void 0 && a.compare === null
        ? ((t.tag = 15), (t.type = u), p_(e, t, u, n, s))
        : ((e = is(a.type, null, n, t, t.mode, s)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((u = e.child), !ru(e, s))) {
      var m = u.memoizedProps;
      if (((a = a.compare), (a = a !== null ? a : Qn), a(m, n) && e.ref === t.ref))
        return El(e, t, s);
    }
    return ((t.flags |= 1), (e = yl(u, n)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function p_(e, t, a, n, s) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (Qn(u, n) && e.ref === t.ref)
        if (((st = !1), (t.pendingProps = n = u), ru(e, s))) (e.flags & 131072) !== 0 && (st = !0);
        else return ((t.lanes = e.lanes), El(e, t, s));
    }
    return eu(e, t, a, n, s);
  }
  function h_(e, t, a, n) {
    var s = n.children,
      u = e !== null ? e.memoizedState : null;
    if (
      (e === null &&
        t.stateNode === null &&
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      n.mode === 'hidden')
    ) {
      if ((t.flags & 128) !== 0) {
        if (((u = u !== null ? u.baseLanes | a : a), e !== null)) {
          for (n = t.child = e.child, s = 0; n !== null; )
            ((s = s | n.lanes | n.childLanes), (n = n.sibling));
          n = s & ~u;
        } else ((n = 0), (t.child = null));
        return g_(e, t, u, a, n);
      }
      if ((a & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && us(t, u !== null ? u.cachePool : null),
          u !== null ? vm(t, u) : Lo(),
          ym(t));
      else return ((n = t.lanes = 536870912), g_(e, t, u !== null ? u.baseLanes | a : a, a, n));
    } else
      u !== null
        ? (us(t, u.cachePool), vm(t, u), Fl(), (t.memoizedState = null))
        : (e !== null && us(t, null), Lo(), Fl());
    return (gt(e, t, s, a), t.child);
  }
  function oi(e, t) {
    return (
      (e !== null && e.tag === 22) ||
        t.stateNode !== null ||
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      t.sibling
    );
  }
  function g_(e, t, a, n, s) {
    var u = wo();
    return (
      (u = u === null ? null : { parent: nt._currentValue, pool: u }),
      (t.memoizedState = { baseLanes: a, cachePool: u }),
      e !== null && us(t, null),
      Lo(),
      ym(t),
      e !== null && en(e, t, n, !0),
      (t.childLanes = s),
      null
    );
  }
  function Ts(e, t) {
    return (
      (t = Cs({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function k_(e, t, a) {
    return (
      Na(t, e.child, null, a),
      (e = Ts(t, t.pendingProps)),
      (e.flags |= 2),
      It(t),
      (t.memoizedState = null),
      e
    );
  }
  function jk(e, t, a) {
    var n = t.pendingProps,
      s = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (Ne) {
        if (n.mode === 'hidden') return ((e = Ts(t, n)), (t.lanes = 536870912), oi(null, e));
        if (
          (Mo(t),
          (e = Ye)
            ? ((e = jf(e, Kt)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Xl !== null ? { id: dl, overflow: ml } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = tm(e)),
                (a.return = t),
                (t.child = a),
                (pt = t),
                (Ye = null)))
            : (e = null),
          e === null)
        )
          throw Ql(t);
        return ((t.lanes = 536870912), null);
      }
      return Ts(t, n);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var m = u.dehydrated;
      if ((Mo(t), s))
        if (t.flags & 256) ((t.flags &= -257), (t = k_(e, t, a)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(r(558));
      else if ((st || en(e, t, a, !1), (s = (a & e.childLanes) !== 0), st || s)) {
        if (((n = $e), n !== null && ((m = od(n, a)), m !== 0 && m !== u.retryLane)))
          throw ((u.retryLane = m), ya(e, m), At(n, e, m), Fo);
        (Is(), (t = k_(e, t, a)));
      } else
        ((e = u.treeContext),
          (Ye = Jt(m.nextSibling)),
          (pt = t),
          (Ne = !0),
          (Vl = null),
          (Kt = !1),
          e !== null && nm(t, e),
          (t = Ts(t, n)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = yl(e.child, { mode: n.mode, children: n.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function Es(e, t) {
    var a = t.ref;
    if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != 'function' && typeof a != 'object') throw Error(r(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function eu(e, t, a, n, s) {
    return (
      wa(t),
      (a = qo(e, t, a, n, void 0, s)),
      (n = Oo()),
      e !== null && !st
        ? (Io(e, t, s), El(e, t, s))
        : (Ne && n && po(t), (t.flags |= 1), gt(e, t, a, s), t.child)
    );
  }
  function v_(e, t, a, n, s, u) {
    return (
      wa(t),
      (t.updateQueue = null),
      (a = xm(t, n, a, s)),
      bm(e),
      (n = Oo()),
      e !== null && !st
        ? (Io(e, t, u), El(e, t, u))
        : (Ne && n && po(t), (t.flags |= 1), gt(e, t, a, u), t.child)
    );
  }
  function y_(e, t, a, n, s) {
    if ((wa(t), t.stateNode === null)) {
      var u = Ja,
        m = a.contextType;
      (typeof m == 'object' && m !== null && (u = ht(m)),
        (u = new a(n, u)),
        (t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null),
        (u.updater = Po),
        (t.stateNode = u),
        (u._reactInternals = t),
        (u = t.stateNode),
        (u.props = n),
        (u.state = t.memoizedState),
        (u.refs = {}),
        Eo(t),
        (m = a.contextType),
        (u.context = typeof m == 'object' && m !== null ? ht(m) : Ja),
        (u.state = t.memoizedState),
        (m = a.getDerivedStateFromProps),
        typeof m == 'function' && (Jo(t, a, m, n), (u.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == 'function' ||
          typeof u.getSnapshotBeforeUpdate == 'function' ||
          (typeof u.UNSAFE_componentWillMount != 'function' &&
            typeof u.componentWillMount != 'function') ||
          ((m = u.state),
          typeof u.componentWillMount == 'function' && u.componentWillMount(),
          typeof u.UNSAFE_componentWillMount == 'function' && u.UNSAFE_componentWillMount(),
          m !== u.state && Po.enqueueReplaceState(u, u.state, null),
          ai(t, n, u, s),
          li(),
          (u.state = t.memoizedState)),
        typeof u.componentDidMount == 'function' && (t.flags |= 4194308),
        (n = !0));
    } else if (e === null) {
      u = t.stateNode;
      var g = t.memoizedProps,
        x = La(a, g);
      u.props = x;
      var I = u.context,
        $ = a.contextType;
      ((m = Ja), typeof $ == 'object' && $ !== null && (m = ht($)));
      var X = a.getDerivedStateFromProps;
      (($ = typeof X == 'function' || typeof u.getSnapshotBeforeUpdate == 'function'),
        (g = t.pendingProps !== g),
        $ ||
          (typeof u.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof u.componentWillReceiveProps != 'function') ||
          ((g || I !== m) && s_(t, u, n, m)),
        (Zl = !1));
      var D = t.memoizedState;
      ((u.state = D),
        ai(t, n, u, s),
        li(),
        (I = t.memoizedState),
        g || D !== I || Zl
          ? (typeof X == 'function' && (Jo(t, a, X, n), (I = t.memoizedState)),
            (x = Zl || i_(t, a, x, n, D, I, m))
              ? ($ ||
                  (typeof u.UNSAFE_componentWillMount != 'function' &&
                    typeof u.componentWillMount != 'function') ||
                  (typeof u.componentWillMount == 'function' && u.componentWillMount(),
                  typeof u.UNSAFE_componentWillMount == 'function' &&
                    u.UNSAFE_componentWillMount()),
                typeof u.componentDidMount == 'function' && (t.flags |= 4194308))
              : (typeof u.componentDidMount == 'function' && (t.flags |= 4194308),
                (t.memoizedProps = n),
                (t.memoizedState = I)),
            (u.props = n),
            (u.state = I),
            (u.context = m),
            (n = x))
          : (typeof u.componentDidMount == 'function' && (t.flags |= 4194308), (n = !1)));
    } else {
      ((u = t.stateNode),
        Co(e, t),
        (m = t.memoizedProps),
        ($ = La(a, m)),
        (u.props = $),
        (X = t.pendingProps),
        (D = u.context),
        (I = a.contextType),
        (x = Ja),
        typeof I == 'object' && I !== null && (x = ht(I)),
        (g = a.getDerivedStateFromProps),
        (I = typeof g == 'function' || typeof u.getSnapshotBeforeUpdate == 'function') ||
          (typeof u.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof u.componentWillReceiveProps != 'function') ||
          ((m !== X || D !== x) && s_(t, u, n, x)),
        (Zl = !1),
        (D = t.memoizedState),
        (u.state = D),
        ai(t, n, u, s),
        li());
      var z = t.memoizedState;
      m !== X || D !== z || Zl || (e !== null && e.dependencies !== null && rs(e.dependencies))
        ? (typeof g == 'function' && (Jo(t, a, g, n), (z = t.memoizedState)),
          ($ =
            Zl ||
            i_(t, a, $, n, D, z, x) ||
            (e !== null && e.dependencies !== null && rs(e.dependencies)))
            ? (I ||
                (typeof u.UNSAFE_componentWillUpdate != 'function' &&
                  typeof u.componentWillUpdate != 'function') ||
                (typeof u.componentWillUpdate == 'function' && u.componentWillUpdate(n, z, x),
                typeof u.UNSAFE_componentWillUpdate == 'function' &&
                  u.UNSAFE_componentWillUpdate(n, z, x)),
              typeof u.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof u.componentDidUpdate != 'function' ||
                (m === e.memoizedProps && D === e.memoizedState) ||
                (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate != 'function' ||
                (m === e.memoizedProps && D === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = n),
              (t.memoizedState = z)),
          (u.props = n),
          (u.state = z),
          (u.context = x),
          (n = $))
        : (typeof u.componentDidUpdate != 'function' ||
            (m === e.memoizedProps && D === e.memoizedState) ||
            (t.flags |= 4),
          typeof u.getSnapshotBeforeUpdate != 'function' ||
            (m === e.memoizedProps && D === e.memoizedState) ||
            (t.flags |= 1024),
          (n = !1));
    }
    return (
      (u = n),
      Es(e, t),
      (n = (t.flags & 128) !== 0),
      u || n
        ? ((u = t.stateNode),
          (a = n && typeof a.getDerivedStateFromError != 'function' ? null : u.render()),
          (t.flags |= 1),
          e !== null && n
            ? ((t.child = Na(t, e.child, null, s)), (t.child = Na(t, null, a, s)))
            : gt(e, t, a, s),
          (t.memoizedState = u.state),
          (e = t.child))
        : (e = El(e, t, s)),
      e
    );
  }
  function b_(e, t, a, n) {
    return (xa(), (t.flags |= 256), gt(e, t, a, n), t.child);
  }
  var tu = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function lu(e) {
    return { baseLanes: e, cachePool: cm() };
  }
  function au(e, t, a) {
    return ((e = e !== null ? e.childLanes & ~a : 0), t && (e |= Rt), e);
  }
  function x_(e, t, a) {
    var n = t.pendingProps,
      s = !1,
      u = (t.flags & 128) !== 0,
      m;
    if (
      ((m = u) || (m = e !== null && e.memoizedState === null ? !1 : (tt.current & 2) !== 0),
      m && ((s = !0), (t.flags &= -129)),
      (m = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (Ne) {
        if (
          (s ? Wl(t) : Fl(),
          (e = Ye)
            ? ((e = jf(e, Kt)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Xl !== null ? { id: dl, overflow: ml } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = tm(e)),
                (a.return = t),
                (t.child = a),
                (pt = t),
                (Ye = null)))
            : (e = null),
          e === null)
        )
          throw Ql(t);
        return (zu(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var g = n.children;
      return (
        (n = n.fallback),
        s
          ? (Fl(),
            (s = t.mode),
            (g = Cs({ mode: 'hidden', children: g }, s)),
            (n = ba(n, s, a, null)),
            (g.return = t),
            (n.return = t),
            (g.sibling = n),
            (t.child = g),
            (n = t.child),
            (n.memoizedState = lu(a)),
            (n.childLanes = au(e, m, a)),
            (t.memoizedState = tu),
            oi(null, n))
          : (Wl(t), nu(t, g))
      );
    }
    var x = e.memoizedState;
    if (x !== null && ((g = x.dehydrated), g !== null)) {
      if (u)
        t.flags & 256
          ? (Wl(t), (t.flags &= -257), (t = iu(e, t, a)))
          : t.memoizedState !== null
            ? (Fl(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (Fl(),
              (g = n.fallback),
              (s = t.mode),
              (n = Cs({ mode: 'visible', children: n.children }, s)),
              (g = ba(g, s, a, null)),
              (g.flags |= 2),
              (n.return = t),
              (g.return = t),
              (n.sibling = g),
              (t.child = n),
              Na(t, e.child, null, a),
              (n = t.child),
              (n.memoizedState = lu(a)),
              (n.childLanes = au(e, m, a)),
              (t.memoizedState = tu),
              (t = oi(null, n)));
      else if ((Wl(t), zu(g))) {
        if (((m = g.nextSibling && g.nextSibling.dataset), m)) var I = m.dgst;
        ((m = I),
          (n = Error(r(419))),
          (n.stack = ''),
          (n.digest = m),
          Jn({ value: n, source: null, stack: null }),
          (t = iu(e, t, a)));
      } else if ((st || en(e, t, a, !1), (m = (a & e.childLanes) !== 0), st || m)) {
        if (((m = $e), m !== null && ((n = od(m, a)), n !== 0 && n !== x.retryLane)))
          throw ((x.retryLane = n), ya(e, n), At(m, e, n), Fo);
        (Ru(g) || Is(), (t = iu(e, t, a)));
      } else
        Ru(g)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = x.treeContext),
            (Ye = Jt(g.nextSibling)),
            (pt = t),
            (Ne = !0),
            (Vl = null),
            (Kt = !1),
            e !== null && nm(t, e),
            (t = nu(t, n.children)),
            (t.flags |= 4096));
      return t;
    }
    return s
      ? (Fl(),
        (g = n.fallback),
        (s = t.mode),
        (x = e.child),
        (I = x.sibling),
        (n = yl(x, { mode: 'hidden', children: n.children })),
        (n.subtreeFlags = x.subtreeFlags & 65011712),
        I !== null ? (g = yl(I, g)) : ((g = ba(g, s, a, null)), (g.flags |= 2)),
        (g.return = t),
        (n.return = t),
        (n.sibling = g),
        (t.child = n),
        oi(null, n),
        (n = t.child),
        (g = e.child.memoizedState),
        g === null
          ? (g = lu(a))
          : ((s = g.cachePool),
            s !== null
              ? ((x = nt._currentValue), (s = s.parent !== x ? { parent: x, pool: x } : s))
              : (s = cm()),
            (g = { baseLanes: g.baseLanes | a, cachePool: s })),
        (n.memoizedState = g),
        (n.childLanes = au(e, m, a)),
        (t.memoizedState = tu),
        oi(e.child, n))
      : (Wl(t),
        (a = e.child),
        (e = a.sibling),
        (a = yl(a, { mode: 'visible', children: n.children })),
        (a.return = t),
        (a.sibling = null),
        e !== null &&
          ((m = t.deletions), m === null ? ((t.deletions = [e]), (t.flags |= 16)) : m.push(e)),
        (t.child = a),
        (t.memoizedState = null),
        a);
  }
  function nu(e, t) {
    return ((t = Cs({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function Cs(e, t) {
    return ((e = qt(22, e, null, t)), (e.lanes = 0), e);
  }
  function iu(e, t, a) {
    return (
      Na(t, e.child, null, a),
      (e = nu(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function S_(e, t, a) {
    e.lanes |= t;
    var n = e.alternate;
    (n !== null && (n.lanes |= t), yo(e.return, t, a));
  }
  function su(e, t, a, n, s, u) {
    var m = e.memoizedState;
    m === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: n,
          tail: a,
          tailMode: s,
          treeForkCount: u,
        })
      : ((m.isBackwards = t),
        (m.rendering = null),
        (m.renderingStartTime = 0),
        (m.last = n),
        (m.tail = a),
        (m.tailMode = s),
        (m.treeForkCount = u));
  }
  function w_(e, t, a) {
    var n = t.pendingProps,
      s = n.revealOrder,
      u = n.tail;
    n = n.children;
    var m = tt.current,
      g = (m & 2) !== 0;
    if (
      (g ? ((m = (m & 1) | 2), (t.flags |= 128)) : (m &= 1),
      Z(tt, m),
      gt(e, t, n, a),
      (n = Ne ? Zn : 0),
      !g && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && S_(e, a, t);
        else if (e.tag === 19) S_(e, a, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    switch (s) {
      case 'forwards':
        for (a = t.child, s = null; a !== null; )
          ((e = a.alternate), e !== null && ps(e) === null && (s = a), (a = a.sibling));
        ((a = s),
          a === null ? ((s = t.child), (t.child = null)) : ((s = a.sibling), (a.sibling = null)),
          su(t, !1, s, a, u, n));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (a = null, s = t.child, t.child = null; s !== null; ) {
          if (((e = s.alternate), e !== null && ps(e) === null)) {
            t.child = s;
            break;
          }
          ((e = s.sibling), (s.sibling = a), (a = s), (s = e));
        }
        su(t, !0, a, null, u, n);
        break;
      case 'together':
        su(t, !1, null, null, void 0, n);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function El(e, t, a) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (la |= t.lanes), (a & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((en(e, t, a, !1), (a & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(r(153));
    if (t.child !== null) {
      for (e = t.child, a = yl(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        ((e = e.sibling), (a = a.sibling = yl(e, e.pendingProps)), (a.return = t));
      a.sibling = null;
    }
    return t.child;
  }
  function ru(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && rs(e)));
  }
  function Mk(e, t, a) {
    switch (t.tag) {
      case 3:
        (et(t, t.stateNode.containerInfo), Kl(t, nt, e.memoizedState.cache), xa());
        break;
      case 27:
      case 5:
        G(t);
        break;
      case 4:
        et(t, t.stateNode.containerInfo);
        break;
      case 10:
        Kl(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), Mo(t), null);
        break;
      case 13:
        var n = t.memoizedState;
        if (n !== null)
          return n.dehydrated !== null
            ? (Wl(t), (t.flags |= 128), null)
            : (a & t.child.childLanes) !== 0
              ? x_(e, t, a)
              : (Wl(t), (e = El(e, t, a)), e !== null ? e.sibling : null);
        Wl(t);
        break;
      case 19:
        var s = (e.flags & 128) !== 0;
        if (
          ((n = (a & t.childLanes) !== 0),
          n || (en(e, t, a, !1), (n = (a & t.childLanes) !== 0)),
          s)
        ) {
          if (n) return w_(e, t, a);
          t.flags |= 128;
        }
        if (
          ((s = t.memoizedState),
          s !== null && ((s.rendering = null), (s.tail = null), (s.lastEffect = null)),
          Z(tt, tt.current),
          n)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), h_(e, t, a, t.pendingProps));
      case 24:
        Kl(t, nt, e.memoizedState.cache);
    }
    return El(e, t, a);
  }
  function T_(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) st = !0;
      else {
        if (!ru(e, a) && (t.flags & 128) === 0) return ((st = !1), Mk(e, t, a));
        st = (e.flags & 131072) !== 0;
      }
    else ((st = !1), Ne && (t.flags & 1048576) !== 0 && am(t, Zn, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var n = t.pendingProps;
          if (((e = Ea(t.elementType)), (t.type = e), typeof e == 'function'))
            mo(e)
              ? ((n = La(e, n)), (t.tag = 1), (t = y_(null, t, e, n, a)))
              : ((t.tag = 0), (t = eu(null, t, e, n, a)));
          else {
            if (e != null) {
              var s = e.$$typeof;
              if (s === P) {
                ((t.tag = 11), (t = __(null, t, e, n, a)));
                break e;
              } else if (s === H) {
                ((t.tag = 14), (t = f_(null, t, e, n, a)));
                break e;
              }
            }
            throw ((t = xe(e) || e), Error(r(306, t, '')));
          }
        }
        return t;
      case 0:
        return eu(e, t, t.type, t.pendingProps, a);
      case 1:
        return ((n = t.type), (s = La(n, t.pendingProps)), y_(e, t, n, s, a));
      case 3:
        e: {
          if ((et(t, t.stateNode.containerInfo), e === null)) throw Error(r(387));
          n = t.pendingProps;
          var u = t.memoizedState;
          ((s = u.element), Co(e, t), ai(t, n, null, a));
          var m = t.memoizedState;
          if (
            ((n = m.cache),
            Kl(t, nt, n),
            n !== u.cache && bo(t, [nt], a, !0),
            li(),
            (n = m.element),
            u.isDehydrated)
          )
            if (
              ((u = { element: n, isDehydrated: !1, cache: m.cache }),
              (t.updateQueue.baseState = u),
              (t.memoizedState = u),
              t.flags & 256)
            ) {
              t = b_(e, t, n, a);
              break e;
            } else if (n !== s) {
              ((s = Xt(Error(r(424)), t)), Jn(s), (t = b_(e, t, n, a)));
              break e;
            } else {
              switch (((e = t.stateNode.containerInfo), e.nodeType)) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === 'HTML' ? e.ownerDocument.body : e;
              }
              for (
                Ye = Jt(e.firstChild),
                  pt = t,
                  Ne = !0,
                  Vl = null,
                  Kt = !0,
                  a = hm(t, null, n, a),
                  t.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
            }
          else {
            if ((xa(), n === s)) {
              t = El(e, t, a);
              break e;
            }
            gt(e, t, n, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          Es(e, t),
          e === null
            ? (a = Df(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : Ne ||
                ((a = t.type),
                (e = t.pendingProps),
                (n = $s(ce.current).createElement(a)),
                (n[ft] = t),
                (n[St] = e),
                kt(n, a, e),
                ct(n),
                (t.stateNode = n))
            : (t.memoizedState = Df(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          G(t),
          e === null &&
            Ne &&
            ((n = t.stateNode = qf(t.type, t.pendingProps, ce.current)),
            (pt = t),
            (Kt = !0),
            (s = Ye),
            ra(t.type) ? ((Hu = s), (Ye = Jt(n.firstChild))) : (Ye = s)),
          gt(e, t, t.pendingProps.children, a),
          Es(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            Ne &&
            ((s = n = Ye) &&
              ((n = ov(n, t.type, t.pendingProps, Kt)),
              n !== null
                ? ((t.stateNode = n), (pt = t), (Ye = Jt(n.firstChild)), (Kt = !1), (s = !0))
                : (s = !1)),
            s || Ql(t)),
          G(t),
          (s = t.type),
          (u = t.pendingProps),
          (m = e !== null ? e.memoizedProps : null),
          (n = u.children),
          Ou(s, u) ? (n = null) : m !== null && Ou(s, m) && (t.flags |= 32),
          t.memoizedState !== null && ((s = qo(e, t, Sk, null, null, a)), (Si._currentValue = s)),
          Es(e, t),
          gt(e, t, n, a),
          t.child
        );
      case 6:
        return (
          e === null &&
            Ne &&
            ((e = a = Ye) &&
              ((a = uv(a, t.pendingProps, Kt)),
              a !== null ? ((t.stateNode = a), (pt = t), (Ye = null), (e = !0)) : (e = !1)),
            e || Ql(t)),
          null
        );
      case 13:
        return x_(e, t, a);
      case 4:
        return (
          et(t, t.stateNode.containerInfo),
          (n = t.pendingProps),
          e === null ? (t.child = Na(t, null, n, a)) : gt(e, t, n, a),
          t.child
        );
      case 11:
        return __(e, t, t.type, t.pendingProps, a);
      case 7:
        return (gt(e, t, t.pendingProps, a), t.child);
      case 8:
        return (gt(e, t, t.pendingProps.children, a), t.child);
      case 12:
        return (gt(e, t, t.pendingProps.children, a), t.child);
      case 10:
        return ((n = t.pendingProps), Kl(t, t.type, n.value), gt(e, t, n.children, a), t.child);
      case 9:
        return (
          (s = t.type._context),
          (n = t.pendingProps.children),
          wa(t),
          (s = ht(s)),
          (n = n(s)),
          (t.flags |= 1),
          gt(e, t, n, a),
          t.child
        );
      case 14:
        return f_(e, t, t.type, t.pendingProps, a);
      case 15:
        return p_(e, t, t.type, t.pendingProps, a);
      case 19:
        return w_(e, t, a);
      case 31:
        return jk(e, t, a);
      case 22:
        return h_(e, t, a, t.pendingProps);
      case 24:
        return (
          wa(t),
          (n = ht(nt)),
          e === null
            ? ((s = wo()),
              s === null &&
                ((s = $e),
                (u = xo()),
                (s.pooledCache = u),
                u.refCount++,
                u !== null && (s.pooledCacheLanes |= a),
                (s = u)),
              (t.memoizedState = { parent: n, cache: s }),
              Eo(t),
              Kl(t, nt, s))
            : ((e.lanes & a) !== 0 && (Co(e, t), ai(t, null, null, a), li()),
              (s = e.memoizedState),
              (u = t.memoizedState),
              s.parent !== n
                ? ((s = { parent: n, cache: n }),
                  (t.memoizedState = s),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = s),
                  Kl(t, nt, n))
                : ((n = u.cache), Kl(t, nt, n), n !== s.cache && bo(t, [nt], a, !0))),
          gt(e, t, t.pendingProps.children, a),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(r(156, t.tag));
  }
  function Cl(e) {
    e.flags |= 4;
  }
  function ou(e, t, a, n, s) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (s & 335544128) === s))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (W_()) e.flags |= 8192;
        else throw ((Ca = ds), To);
    } else e.flags &= -16777217;
  }
  function E_(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !Gf(t)))
      if (W_()) e.flags |= 8192;
      else throw ((Ca = ds), To);
  }
  function Ns(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? id() : 536870912), (e.lanes |= t), (_n |= t)));
  }
  function ui(e, t) {
    if (!Ne)
      switch (e.tailMode) {
        case 'hidden':
          t = e.tail;
          for (var a = null; t !== null; ) (t.alternate !== null && (a = t), (t = t.sibling));
          a === null ? (e.tail = null) : (a.sibling = null);
          break;
        case 'collapsed':
          a = e.tail;
          for (var n = null; a !== null; ) (a.alternate !== null && (n = a), (a = a.sibling));
          n === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (n.sibling = null);
      }
  }
  function Xe(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      a = 0,
      n = 0;
    if (t)
      for (var s = e.child; s !== null; )
        ((a |= s.lanes | s.childLanes),
          (n |= s.subtreeFlags & 65011712),
          (n |= s.flags & 65011712),
          (s.return = e),
          (s = s.sibling));
    else
      for (s = e.child; s !== null; )
        ((a |= s.lanes | s.childLanes),
          (n |= s.subtreeFlags),
          (n |= s.flags),
          (s.return = e),
          (s = s.sibling));
    return ((e.subtreeFlags |= n), (e.childLanes = a), t);
  }
  function Bk(e, t, a) {
    var n = t.pendingProps;
    switch ((ho(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Xe(t), null);
      case 1:
        return (Xe(t), null);
      case 3:
        return (
          (a = t.stateNode),
          (n = null),
          e !== null && (n = e.memoizedState.cache),
          t.memoizedState.cache !== n && (t.flags |= 2048),
          Sl(nt),
          Ge(),
          a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
          (e === null || e.child === null) &&
            (Fa(t)
              ? Cl(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), ko())),
          Xe(t),
          null
        );
      case 26:
        var s = t.type,
          u = t.memoizedState;
        return (
          e === null
            ? (Cl(t), u !== null ? (Xe(t), E_(t, u)) : (Xe(t), ou(t, s, null, n, a)))
            : u
              ? u !== e.memoizedState
                ? (Cl(t), Xe(t), E_(t, u))
                : (Xe(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== n && Cl(t), Xe(t), ou(t, s, e, n, a)),
          null
        );
      case 27:
        if ((de(t), (a = ce.current), (s = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && Cl(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(r(166));
            return (Xe(t), null);
          }
          ((e = F.current), Fa(t) ? im(t) : ((e = qf(s, n, a)), (t.stateNode = e), Cl(t)));
        }
        return (Xe(t), null);
      case 5:
        if ((de(t), (s = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && Cl(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(r(166));
            return (Xe(t), null);
          }
          if (((u = F.current), Fa(t))) im(t);
          else {
            var m = $s(ce.current);
            switch (u) {
              case 1:
                u = m.createElementNS('http://www.w3.org/2000/svg', s);
                break;
              case 2:
                u = m.createElementNS('http://www.w3.org/1998/Math/MathML', s);
                break;
              default:
                switch (s) {
                  case 'svg':
                    u = m.createElementNS('http://www.w3.org/2000/svg', s);
                    break;
                  case 'math':
                    u = m.createElementNS('http://www.w3.org/1998/Math/MathML', s);
                    break;
                  case 'script':
                    ((u = m.createElement('div')),
                      (u.innerHTML = '<script><\/script>'),
                      (u = u.removeChild(u.firstChild)));
                    break;
                  case 'select':
                    ((u =
                      typeof n.is == 'string'
                        ? m.createElement('select', { is: n.is })
                        : m.createElement('select')),
                      n.multiple ? (u.multiple = !0) : n.size && (u.size = n.size));
                    break;
                  default:
                    u =
                      typeof n.is == 'string'
                        ? m.createElement(s, { is: n.is })
                        : m.createElement(s);
                }
            }
            ((u[ft] = t), (u[St] = n));
            e: for (m = t.child; m !== null; ) {
              if (m.tag === 5 || m.tag === 6) u.appendChild(m.stateNode);
              else if (m.tag !== 4 && m.tag !== 27 && m.child !== null) {
                ((m.child.return = m), (m = m.child));
                continue;
              }
              if (m === t) break e;
              for (; m.sibling === null; ) {
                if (m.return === null || m.return === t) break e;
                m = m.return;
              }
              ((m.sibling.return = m.return), (m = m.sibling));
            }
            t.stateNode = u;
            e: switch ((kt(u, s, n), s)) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                n = !!n.autoFocus;
                break e;
              case 'img':
                n = !0;
                break e;
              default:
                n = !1;
            }
            n && Cl(t);
          }
        }
        return (Xe(t), ou(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== n && Cl(t);
        else {
          if (typeof n != 'string' && t.stateNode === null) throw Error(r(166));
          if (((e = ce.current), Fa(t))) {
            if (((e = t.stateNode), (a = t.memoizedProps), (n = null), (s = pt), s !== null))
              switch (s.tag) {
                case 27:
                case 5:
                  n = s.memoizedProps;
              }
            ((e[ft] = t),
              (e = !!(
                e.nodeValue === a ||
                (n !== null && n.suppressHydrationWarning === !0) ||
                Sf(e.nodeValue, a)
              )),
              e || Ql(t, !0));
          } else ((e = $s(e).createTextNode(n)), (e[ft] = t), (t.stateNode = e));
        }
        return (Xe(t), null);
      case 31:
        if (((a = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((n = Fa(t)), a !== null)) {
            if (e === null) {
              if (!n) throw Error(r(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(r(557));
              e[ft] = t;
            } else (xa(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Xe(t), (e = !1));
          } else
            ((a = ko()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a),
              (e = !0));
          if (!e) return t.flags & 256 ? (It(t), t) : (It(t), null);
          if ((t.flags & 128) !== 0) throw Error(r(558));
        }
        return (Xe(t), null);
      case 13:
        if (
          ((n = t.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((s = Fa(t)), n !== null && n.dehydrated !== null)) {
            if (e === null) {
              if (!s) throw Error(r(318));
              if (((s = t.memoizedState), (s = s !== null ? s.dehydrated : null), !s))
                throw Error(r(317));
              s[ft] = t;
            } else (xa(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Xe(t), (s = !1));
          } else
            ((s = ko()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = s),
              (s = !0));
          if (!s) return t.flags & 256 ? (It(t), t) : (It(t), null);
        }
        return (
          It(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = a), t)
            : ((a = n !== null),
              (e = e !== null && e.memoizedState !== null),
              a &&
                ((n = t.child),
                (s = null),
                n.alternate !== null &&
                  n.alternate.memoizedState !== null &&
                  n.alternate.memoizedState.cachePool !== null &&
                  (s = n.alternate.memoizedState.cachePool.pool),
                (u = null),
                n.memoizedState !== null &&
                  n.memoizedState.cachePool !== null &&
                  (u = n.memoizedState.cachePool.pool),
                u !== s && (n.flags |= 2048)),
              a !== e && a && (t.child.flags |= 8192),
              Ns(t, t.updateQueue),
              Xe(t),
              null)
        );
      case 4:
        return (Ge(), e === null && Lu(t.stateNode.containerInfo), Xe(t), null);
      case 10:
        return (Sl(t.type), Xe(t), null);
      case 19:
        if ((R(tt), (n = t.memoizedState), n === null)) return (Xe(t), null);
        if (((s = (t.flags & 128) !== 0), (u = n.rendering), u === null))
          if (s) ui(n, !1);
          else {
            if (Pe !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((u = ps(e)), u !== null)) {
                  for (
                    t.flags |= 128,
                      ui(n, !1),
                      e = u.updateQueue,
                      t.updateQueue = e,
                      Ns(t, e),
                      t.subtreeFlags = 0,
                      e = a,
                      a = t.child;
                    a !== null;
                  )
                    (em(a, e), (a = a.sibling));
                  return (Z(tt, (tt.current & 1) | 2), Ne && bl(t, n.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            n.tail !== null &&
              Lt() > Bs &&
              ((t.flags |= 128), (s = !0), ui(n, !1), (t.lanes = 4194304));
          }
        else {
          if (!s)
            if (((e = ps(u)), e !== null)) {
              if (
                ((t.flags |= 128),
                (s = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Ns(t, e),
                ui(n, !0),
                n.tail === null && n.tailMode === 'hidden' && !u.alternate && !Ne)
              )
                return (Xe(t), null);
            } else
              2 * Lt() - n.renderingStartTime > Bs &&
                a !== 536870912 &&
                ((t.flags |= 128), (s = !0), ui(n, !1), (t.lanes = 4194304));
          n.isBackwards
            ? ((u.sibling = t.child), (t.child = u))
            : ((e = n.last), e !== null ? (e.sibling = u) : (t.child = u), (n.last = u));
        }
        return n.tail !== null
          ? ((e = n.tail),
            (n.rendering = e),
            (n.tail = e.sibling),
            (n.renderingStartTime = Lt()),
            (e.sibling = null),
            (a = tt.current),
            Z(tt, s ? (a & 1) | 2 : a & 1),
            Ne && bl(t, n.treeForkCount),
            e)
          : (Xe(t), null);
      case 22:
      case 23:
        return (
          It(t),
          jo(),
          (n = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== n && (t.flags |= 8192)
            : n && (t.flags |= 8192),
          n
            ? (a & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Xe(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Xe(t),
          (a = t.updateQueue),
          a !== null && Ns(t, a.retryQueue),
          (a = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (a = e.memoizedState.cachePool.pool),
          (n = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (n = t.memoizedState.cachePool.pool),
          n !== a && (t.flags |= 2048),
          e !== null && R(Ta),
          null
        );
      case 24:
        return (
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Sl(nt),
          Xe(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, t.tag));
  }
  function qk(e, t) {
    switch ((ho(t), t.tag)) {
      case 1:
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 3:
        return (
          Sl(nt),
          Ge(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 26:
      case 27:
      case 5:
        return (de(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((It(t), t.alternate === null)) throw Error(r(340));
          xa();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((It(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(r(340));
          xa();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (R(tt), null);
      case 4:
        return (Ge(), null);
      case 10:
        return (Sl(t.type), null);
      case 22:
      case 23:
        return (
          It(t),
          jo(),
          e !== null && R(Ta),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (Sl(nt), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function C_(e, t) {
    switch ((ho(t), t.tag)) {
      case 3:
        (Sl(nt), Ge());
        break;
      case 26:
      case 27:
      case 5:
        de(t);
        break;
      case 4:
        Ge();
        break;
      case 31:
        t.memoizedState !== null && It(t);
        break;
      case 13:
        It(t);
        break;
      case 19:
        R(tt);
        break;
      case 10:
        Sl(t.type);
        break;
      case 22:
      case 23:
        (It(t), jo(), e !== null && R(Ta));
        break;
      case 24:
        Sl(nt);
    }
  }
  function ci(e, t) {
    try {
      var a = t.updateQueue,
        n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var s = n.next;
        a = s;
        do {
          if ((a.tag & e) === e) {
            n = void 0;
            var u = a.create,
              m = a.inst;
            ((n = u()), (m.destroy = n));
          }
          a = a.next;
        } while (a !== s);
      }
    } catch (g) {
      Ie(t, t.return, g);
    }
  }
  function ea(e, t, a) {
    try {
      var n = t.updateQueue,
        s = n !== null ? n.lastEffect : null;
      if (s !== null) {
        var u = s.next;
        n = u;
        do {
          if ((n.tag & e) === e) {
            var m = n.inst,
              g = m.destroy;
            if (g !== void 0) {
              ((m.destroy = void 0), (s = t));
              var x = a,
                I = g;
              try {
                I();
              } catch ($) {
                Ie(s, x, $);
              }
            }
          }
          n = n.next;
        } while (n !== u);
      }
    } catch ($) {
      Ie(t, t.return, $);
    }
  }
  function N_(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        km(t, a);
      } catch (n) {
        Ie(e, e.return, n);
      }
    }
  }
  function A_(e, t, a) {
    ((a.props = La(e.type, e.memoizedProps)), (a.state = e.memoizedState));
    try {
      a.componentWillUnmount();
    } catch (n) {
      Ie(e, t, n);
    }
  }
  function di(e, t) {
    try {
      var a = e.ref;
      if (a !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var n = e.stateNode;
            break;
          case 30:
            n = e.stateNode;
            break;
          default:
            n = e.stateNode;
        }
        typeof a == 'function' ? (e.refCleanup = a(n)) : (a.current = n);
      }
    } catch (s) {
      Ie(e, t, s);
    }
  }
  function _l(e, t) {
    var a = e.ref,
      n = e.refCleanup;
    if (a !== null)
      if (typeof n == 'function')
        try {
          n();
        } catch (s) {
          Ie(e, t, s);
        } finally {
          ((e.refCleanup = null), (e = e.alternate), e != null && (e.refCleanup = null));
        }
      else if (typeof a == 'function')
        try {
          a(null);
        } catch (s) {
          Ie(e, t, s);
        }
      else a.current = null;
  }
  function L_(e) {
    var t = e.type,
      a = e.memoizedProps,
      n = e.stateNode;
    try {
      e: switch (t) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          a.autoFocus && n.focus();
          break e;
        case 'img':
          a.src ? (n.src = a.src) : a.srcSet && (n.srcset = a.srcSet);
      }
    } catch (s) {
      Ie(e, e.return, s);
    }
  }
  function uu(e, t, a) {
    try {
      var n = e.stateNode;
      (lv(n, e.type, a, t), (n[St] = t));
    } catch (s) {
      Ie(e, e.return, s);
    }
  }
  function j_(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && ra(e.type)) || e.tag === 4
    );
  }
  function cu(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || j_(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if ((e.tag === 27 && ra(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function du(e, t, a) {
    var n = e.tag;
    if (n === 5 || n === 6)
      ((e = e.stateNode),
        t
          ? (a.nodeType === 9
              ? a.body
              : a.nodeName === 'HTML'
                ? a.ownerDocument.body
                : a
            ).insertBefore(e, t)
          : ((t = a.nodeType === 9 ? a.body : a.nodeName === 'HTML' ? a.ownerDocument.body : a),
            t.appendChild(e),
            (a = a._reactRootContainer),
            a != null || t.onclick !== null || (t.onclick = kl)));
    else if (
      n !== 4 &&
      (n === 27 && ra(e.type) && ((a = e.stateNode), (t = null)), (e = e.child), e !== null)
    )
      for (du(e, t, a), e = e.sibling; e !== null; ) (du(e, t, a), (e = e.sibling));
  }
  function As(e, t, a) {
    var n = e.tag;
    if (n === 5 || n === 6) ((e = e.stateNode), t ? a.insertBefore(e, t) : a.appendChild(e));
    else if (n !== 4 && (n === 27 && ra(e.type) && (a = e.stateNode), (e = e.child), e !== null))
      for (As(e, t, a), e = e.sibling; e !== null; ) (As(e, t, a), (e = e.sibling));
  }
  function M_(e) {
    var t = e.stateNode,
      a = e.memoizedProps;
    try {
      for (var n = e.type, s = t.attributes; s.length; ) t.removeAttributeNode(s[0]);
      (kt(t, n, a), (t[ft] = e), (t[St] = a));
    } catch (u) {
      Ie(e, e.return, u);
    }
  }
  var Nl = !1,
    rt = !1,
    mu = !1,
    B_ = typeof WeakSet == 'function' ? WeakSet : Set,
    dt = null;
  function Ok(e, t) {
    if (((e = e.containerInfo), (Bu = Js), (e = Xd(e)), no(e))) {
      if ('selectionStart' in e) var a = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          a = ((a = e.ownerDocument) && a.defaultView) || window;
          var n = a.getSelection && a.getSelection();
          if (n && n.rangeCount !== 0) {
            a = n.anchorNode;
            var s = n.anchorOffset,
              u = n.focusNode;
            n = n.focusOffset;
            try {
              (a.nodeType, u.nodeType);
            } catch {
              a = null;
              break e;
            }
            var m = 0,
              g = -1,
              x = -1,
              I = 0,
              $ = 0,
              X = e,
              D = null;
            t: for (;;) {
              for (
                var z;
                X !== a || (s !== 0 && X.nodeType !== 3) || (g = m + s),
                  X !== u || (n !== 0 && X.nodeType !== 3) || (x = m + n),
                  X.nodeType === 3 && (m += X.nodeValue.length),
                  (z = X.firstChild) !== null;
              )
                ((D = X), (X = z));
              for (;;) {
                if (X === e) break t;
                if (
                  (D === a && ++I === s && (g = m),
                  D === u && ++$ === n && (x = m),
                  (z = X.nextSibling) !== null)
                )
                  break;
                ((X = D), (D = X.parentNode));
              }
              X = z;
            }
            a = g === -1 || x === -1 ? null : { start: g, end: x };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (qu = { focusedElem: e, selectionRange: a }, Js = !1, dt = t; dt !== null; )
      if (((t = dt), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (dt = e));
      else
        for (; dt !== null; ) {
          switch (((t = dt), (u = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              if (
                (e & 4) !== 0 &&
                ((e = t.updateQueue), (e = e !== null ? e.events : null), e !== null)
              )
                for (a = 0; a < e.length; a++) ((s = e[a]), (s.ref.impl = s.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && u !== null) {
                ((e = void 0),
                  (a = t),
                  (s = u.memoizedProps),
                  (u = u.memoizedState),
                  (n = a.stateNode));
                try {
                  var ae = La(a.type, s);
                  ((e = n.getSnapshotBeforeUpdate(ae, u)),
                    (n.__reactInternalSnapshotBeforeUpdate = e));
                } catch (me) {
                  Ie(a, a.return, me);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (((e = t.stateNode.containerInfo), (a = e.nodeType), a === 9)) Du(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      Du(e);
                      break;
                    default:
                      e.textContent = '';
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
              if ((e & 1024) !== 0) throw Error(r(163));
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (dt = e));
            break;
          }
          dt = t.return;
        }
  }
  function q_(e, t, a) {
    var n = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (Ll(e, a), n & 4 && ci(5, a));
        break;
      case 1:
        if ((Ll(e, a), n & 4))
          if (((e = a.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (m) {
              Ie(a, a.return, m);
            }
          else {
            var s = La(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(s, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (m) {
              Ie(a, a.return, m);
            }
          }
        (n & 64 && N_(a), n & 512 && di(a, a.return));
        break;
      case 3:
        if ((Ll(e, a), n & 64 && ((e = a.updateQueue), e !== null))) {
          if (((t = null), a.child !== null))
            switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
          try {
            km(e, t);
          } catch (m) {
            Ie(a, a.return, m);
          }
        }
        break;
      case 27:
        t === null && n & 4 && M_(a);
      case 26:
      case 5:
        (Ll(e, a), t === null && n & 4 && L_(a), n & 512 && di(a, a.return));
        break;
      case 12:
        Ll(e, a);
        break;
      case 31:
        (Ll(e, a), n & 4 && D_(e, a));
        break;
      case 13:
        (Ll(e, a),
          n & 4 && R_(e, a),
          n & 64 &&
            ((e = a.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((a = Yk.bind(null, a)), cv(e, a)))));
        break;
      case 22:
        if (((n = a.memoizedState !== null || Nl), !n)) {
          ((t = (t !== null && t.memoizedState !== null) || rt), (s = Nl));
          var u = rt;
          ((Nl = n),
            (rt = t) && !u ? jl(e, a, (a.subtreeFlags & 8772) !== 0) : Ll(e, a),
            (Nl = s),
            (rt = u));
        }
        break;
      case 30:
        break;
      default:
        Ll(e, a);
    }
  }
  function O_(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), O_(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Ur(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var Qe = null,
    Tt = !1;
  function Al(e, t, a) {
    for (a = a.child; a !== null; ) (I_(e, t, a), (a = a.sibling));
  }
  function I_(e, t, a) {
    if (jt && typeof jt.onCommitFiberUnmount == 'function')
      try {
        jt.onCommitFiberUnmount(On, a);
      } catch {}
    switch (a.tag) {
      case 26:
        (rt || _l(a, t),
          Al(e, t, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
        break;
      case 27:
        rt || _l(a, t);
        var n = Qe,
          s = Tt;
        (ra(a.type) && ((Qe = a.stateNode), (Tt = !1)),
          Al(e, t, a),
          yi(a.stateNode),
          (Qe = n),
          (Tt = s));
        break;
      case 5:
        rt || _l(a, t);
      case 6:
        if (((n = Qe), (s = Tt), (Qe = null), Al(e, t, a), (Qe = n), (Tt = s), Qe !== null))
          if (Tt)
            try {
              (Qe.nodeType === 9
                ? Qe.body
                : Qe.nodeName === 'HTML'
                  ? Qe.ownerDocument.body
                  : Qe
              ).removeChild(a.stateNode);
            } catch (u) {
              Ie(a, t, u);
            }
          else
            try {
              Qe.removeChild(a.stateNode);
            } catch (u) {
              Ie(a, t, u);
            }
        break;
      case 18:
        Qe !== null &&
          (Tt
            ? ((e = Qe),
              Af(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                a.stateNode
              ),
              bn(e))
            : Af(Qe, a.stateNode));
        break;
      case 4:
        ((n = Qe),
          (s = Tt),
          (Qe = a.stateNode.containerInfo),
          (Tt = !0),
          Al(e, t, a),
          (Qe = n),
          (Tt = s));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (ea(2, a, t), rt || ea(4, a, t), Al(e, t, a));
        break;
      case 1:
        (rt ||
          (_l(a, t), (n = a.stateNode), typeof n.componentWillUnmount == 'function' && A_(a, t, n)),
          Al(e, t, a));
        break;
      case 21:
        Al(e, t, a);
        break;
      case 22:
        ((rt = (n = rt) || a.memoizedState !== null), Al(e, t, a), (rt = n));
        break;
      default:
        Al(e, t, a);
    }
  }
  function D_(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        bn(e);
      } catch (a) {
        Ie(t, t.return, a);
      }
    }
  }
  function R_(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        bn(e);
      } catch (a) {
        Ie(t, t.return, a);
      }
  }
  function Ik(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new B_()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new B_()),
          t
        );
      default:
        throw Error(r(435, e.tag));
    }
  }
  function Ls(e, t) {
    var a = Ik(e);
    t.forEach(function (n) {
      if (!a.has(n)) {
        a.add(n);
        var s = Xk.bind(null, e, n);
        n.then(s, s);
      }
    });
  }
  function Et(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var n = 0; n < a.length; n++) {
        var s = a[n],
          u = e,
          m = t,
          g = m;
        e: for (; g !== null; ) {
          switch (g.tag) {
            case 27:
              if (ra(g.type)) {
                ((Qe = g.stateNode), (Tt = !1));
                break e;
              }
              break;
            case 5:
              ((Qe = g.stateNode), (Tt = !1));
              break e;
            case 3:
            case 4:
              ((Qe = g.stateNode.containerInfo), (Tt = !0));
              break e;
          }
          g = g.return;
        }
        if (Qe === null) throw Error(r(160));
        (I_(u, m, s),
          (Qe = null),
          (Tt = !1),
          (u = s.alternate),
          u !== null && (u.return = null),
          (s.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (z_(t, e), (t = t.sibling));
  }
  var tl = null;
  function z_(e, t) {
    var a = e.alternate,
      n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Et(t, e), Ct(e), n & 4 && (ea(3, e, e.return), ci(3, e), ea(5, e, e.return)));
        break;
      case 1:
        (Et(t, e),
          Ct(e),
          n & 512 && (rt || a === null || _l(a, a.return)),
          n & 64 &&
            Nl &&
            ((e = e.updateQueue),
            e !== null &&
              ((n = e.callbacks),
              n !== null &&
                ((a = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = a === null ? n : a.concat(n))))));
        break;
      case 26:
        var s = tl;
        if ((Et(t, e), Ct(e), n & 512 && (rt || a === null || _l(a, a.return)), n & 4)) {
          var u = a !== null ? a.memoizedState : null;
          if (((n = e.memoizedState), a === null))
            if (n === null)
              if (e.stateNode === null) {
                e: {
                  ((n = e.type), (a = e.memoizedProps), (s = s.ownerDocument || s));
                  t: switch (n) {
                    case 'title':
                      ((u = s.getElementsByTagName('title')[0]),
                        (!u ||
                          u[Rn] ||
                          u[ft] ||
                          u.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          u.hasAttribute('itemprop')) &&
                          ((u = s.createElement(n)),
                          s.head.insertBefore(u, s.querySelector('head > title'))),
                        kt(u, n, a),
                        (u[ft] = e),
                        ct(u),
                        (n = u));
                      break e;
                    case 'link':
                      var m = Hf('link', 'href', s).get(n + (a.href || ''));
                      if (m) {
                        for (var g = 0; g < m.length; g++)
                          if (
                            ((u = m[g]),
                            u.getAttribute('href') ===
                              (a.href == null || a.href === '' ? null : a.href) &&
                              u.getAttribute('rel') === (a.rel == null ? null : a.rel) &&
                              u.getAttribute('title') === (a.title == null ? null : a.title) &&
                              u.getAttribute('crossorigin') ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            m.splice(g, 1);
                            break t;
                          }
                      }
                      ((u = s.createElement(n)), kt(u, n, a), s.head.appendChild(u));
                      break;
                    case 'meta':
                      if ((m = Hf('meta', 'content', s).get(n + (a.content || '')))) {
                        for (g = 0; g < m.length; g++)
                          if (
                            ((u = m[g]),
                            u.getAttribute('content') ===
                              (a.content == null ? null : '' + a.content) &&
                              u.getAttribute('name') === (a.name == null ? null : a.name) &&
                              u.getAttribute('property') ===
                                (a.property == null ? null : a.property) &&
                              u.getAttribute('http-equiv') ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              u.getAttribute('charset') === (a.charSet == null ? null : a.charSet))
                          ) {
                            m.splice(g, 1);
                            break t;
                          }
                      }
                      ((u = s.createElement(n)), kt(u, n, a), s.head.appendChild(u));
                      break;
                    default:
                      throw Error(r(468, n));
                  }
                  ((u[ft] = e), ct(u), (n = u));
                }
                e.stateNode = n;
              } else Uf(s, e.type, e.stateNode);
            else e.stateNode = zf(s, n, e.memoizedProps);
          else
            u !== n
              ? (u === null
                  ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a))
                  : u.count--,
                n === null ? Uf(s, e.type, e.stateNode) : zf(s, n, e.memoizedProps))
              : n === null && e.stateNode !== null && uu(e, e.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (Et(t, e),
          Ct(e),
          n & 512 && (rt || a === null || _l(a, a.return)),
          a !== null && n & 4 && uu(e, e.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if ((Et(t, e), Ct(e), n & 512 && (rt || a === null || _l(a, a.return)), e.flags & 32)) {
          s = e.stateNode;
          try {
            $a(s, '');
          } catch (ae) {
            Ie(e, e.return, ae);
          }
        }
        (n & 4 &&
          e.stateNode != null &&
          ((s = e.memoizedProps), uu(e, s, a !== null ? a.memoizedProps : s)),
          n & 1024 && (mu = !0));
        break;
      case 6:
        if ((Et(t, e), Ct(e), n & 4)) {
          if (e.stateNode === null) throw Error(r(162));
          ((n = e.memoizedProps), (a = e.stateNode));
          try {
            a.nodeValue = n;
          } catch (ae) {
            Ie(e, e.return, ae);
          }
        }
        break;
      case 3:
        if (
          ((Vs = null),
          (s = tl),
          (tl = Ys(t.containerInfo)),
          Et(t, e),
          (tl = s),
          Ct(e),
          n & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            bn(t.containerInfo);
          } catch (ae) {
            Ie(e, e.return, ae);
          }
        mu && ((mu = !1), H_(e));
        break;
      case 4:
        ((n = tl), (tl = Ys(e.stateNode.containerInfo)), Et(t, e), Ct(e), (tl = n));
        break;
      case 12:
        (Et(t, e), Ct(e));
        break;
      case 31:
        (Et(t, e),
          Ct(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Ls(e, n))));
        break;
      case 13:
        (Et(t, e),
          Ct(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
            (Ms = Lt()),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Ls(e, n))));
        break;
      case 22:
        s = e.memoizedState !== null;
        var x = a !== null && a.memoizedState !== null,
          I = Nl,
          $ = rt;
        if (((Nl = I || s), (rt = $ || x), Et(t, e), (rt = $), (Nl = I), Ct(e), n & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = s ? t._visibility & -2 : t._visibility | 1,
              s && (a === null || x || Nl || rt || ja(e)),
              a = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                x = a = t;
                try {
                  if (((u = x.stateNode), s))
                    ((m = u.style),
                      typeof m.setProperty == 'function'
                        ? m.setProperty('display', 'none', 'important')
                        : (m.display = 'none'));
                  else {
                    g = x.stateNode;
                    var X = x.memoizedProps.style,
                      D = X != null && X.hasOwnProperty('display') ? X.display : null;
                    g.style.display = D == null || typeof D == 'boolean' ? '' : ('' + D).trim();
                  }
                } catch (ae) {
                  Ie(x, x.return, ae);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                x = t;
                try {
                  x.stateNode.nodeValue = s ? '' : x.memoizedProps;
                } catch (ae) {
                  Ie(x, x.return, ae);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                x = t;
                try {
                  var z = x.stateNode;
                  s ? Lf(z, !0) : Lf(x.stateNode, !1);
                } catch (ae) {
                  Ie(x, x.return, ae);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) || t.memoizedState === null || t === e) &&
              t.child !== null
            ) {
              ((t.child.return = t), (t = t.child));
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              (a === t && (a = null), (t = t.return));
            }
            (a === t && (a = null), (t.sibling.return = t.return), (t = t.sibling));
          }
        n & 4 &&
          ((n = e.updateQueue),
          n !== null && ((a = n.retryQueue), a !== null && ((n.retryQueue = null), Ls(e, a))));
        break;
      case 19:
        (Et(t, e),
          Ct(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Ls(e, n))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Et(t, e), Ct(e));
    }
  }
  function Ct(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, n = e.return; n !== null; ) {
          if (j_(n)) {
            a = n;
            break;
          }
          n = n.return;
        }
        if (a == null) throw Error(r(160));
        switch (a.tag) {
          case 27:
            var s = a.stateNode,
              u = cu(e);
            As(e, u, s);
            break;
          case 5:
            var m = a.stateNode;
            a.flags & 32 && ($a(m, ''), (a.flags &= -33));
            var g = cu(e);
            As(e, g, m);
            break;
          case 3:
          case 4:
            var x = a.stateNode.containerInfo,
              I = cu(e);
            du(e, I, x);
            break;
          default:
            throw Error(r(161));
        }
      } catch ($) {
        Ie(e, e.return, $);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function H_(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (H_(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling));
      }
  }
  function Ll(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (q_(e, t.alternate, t), (t = t.sibling));
  }
  function ja(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (ea(4, t, t.return), ja(t));
          break;
        case 1:
          _l(t, t.return);
          var a = t.stateNode;
          (typeof a.componentWillUnmount == 'function' && A_(t, t.return, a), ja(t));
          break;
        case 27:
          yi(t.stateNode);
        case 26:
        case 5:
          (_l(t, t.return), ja(t));
          break;
        case 22:
          t.memoizedState === null && ja(t);
          break;
        case 30:
          ja(t);
          break;
        default:
          ja(t);
      }
      e = e.sibling;
    }
  }
  function jl(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var n = t.alternate,
        s = e,
        u = t,
        m = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          (jl(s, u, a), ci(4, u));
          break;
        case 1:
          if ((jl(s, u, a), (n = u), (s = n.stateNode), typeof s.componentDidMount == 'function'))
            try {
              s.componentDidMount();
            } catch (I) {
              Ie(n, n.return, I);
            }
          if (((n = u), (s = n.updateQueue), s !== null)) {
            var g = n.stateNode;
            try {
              var x = s.shared.hiddenCallbacks;
              if (x !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < x.length; s++) gm(x[s], g);
            } catch (I) {
              Ie(n, n.return, I);
            }
          }
          (a && m & 64 && N_(u), di(u, u.return));
          break;
        case 27:
          M_(u);
        case 26:
        case 5:
          (jl(s, u, a), a && n === null && m & 4 && L_(u), di(u, u.return));
          break;
        case 12:
          jl(s, u, a);
          break;
        case 31:
          (jl(s, u, a), a && m & 4 && D_(s, u));
          break;
        case 13:
          (jl(s, u, a), a && m & 4 && R_(s, u));
          break;
        case 22:
          (u.memoizedState === null && jl(s, u, a), di(u, u.return));
          break;
        case 30:
          break;
        default:
          jl(s, u, a);
      }
      t = t.sibling;
    }
  }
  function _u(e, t) {
    var a = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (a = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== a && (e != null && e.refCount++, a != null && Pn(a)));
  }
  function fu(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && Pn(e)));
  }
  function ll(e, t, a, n) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (U_(e, t, a, n), (t = t.sibling));
  }
  function U_(e, t, a, n) {
    var s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (ll(e, t, a, n), s & 2048 && ci(9, t));
        break;
      case 1:
        ll(e, t, a, n);
        break;
      case 3:
        (ll(e, t, a, n),
          s & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && Pn(e))));
        break;
      case 12:
        if (s & 2048) {
          (ll(e, t, a, n), (e = t.stateNode));
          try {
            var u = t.memoizedProps,
              m = u.id,
              g = u.onPostCommit;
            typeof g == 'function' &&
              g(m, t.alternate === null ? 'mount' : 'update', e.passiveEffectDuration, -0);
          } catch (x) {
            Ie(t, t.return, x);
          }
        } else ll(e, t, a, n);
        break;
      case 31:
        ll(e, t, a, n);
        break;
      case 13:
        ll(e, t, a, n);
        break;
      case 23:
        break;
      case 22:
        ((u = t.stateNode),
          (m = t.alternate),
          t.memoizedState !== null
            ? u._visibility & 2
              ? ll(e, t, a, n)
              : mi(e, t)
            : u._visibility & 2
              ? ll(e, t, a, n)
              : ((u._visibility |= 2), cn(e, t, a, n, (t.subtreeFlags & 10256) !== 0 || !1)),
          s & 2048 && _u(m, t));
        break;
      case 24:
        (ll(e, t, a, n), s & 2048 && fu(t.alternate, t));
        break;
      default:
        ll(e, t, a, n);
    }
  }
  function cn(e, t, a, n, s) {
    for (s = s && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e,
        m = t,
        g = a,
        x = n,
        I = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          (cn(u, m, g, x, s), ci(8, m));
          break;
        case 23:
          break;
        case 22:
          var $ = m.stateNode;
          (m.memoizedState !== null
            ? $._visibility & 2
              ? cn(u, m, g, x, s)
              : mi(u, m)
            : (($._visibility |= 2), cn(u, m, g, x, s)),
            s && I & 2048 && _u(m.alternate, m));
          break;
        case 24:
          (cn(u, m, g, x, s), s && I & 2048 && fu(m.alternate, m));
          break;
        default:
          cn(u, m, g, x, s);
      }
      t = t.sibling;
    }
  }
  function mi(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e,
          n = t,
          s = n.flags;
        switch (n.tag) {
          case 22:
            (mi(a, n), s & 2048 && _u(n.alternate, n));
            break;
          case 24:
            (mi(a, n), s & 2048 && fu(n.alternate, n));
            break;
          default:
            mi(a, n);
        }
        t = t.sibling;
      }
  }
  var _i = 8192;
  function dn(e, t, a) {
    if (e.subtreeFlags & _i) for (e = e.child; e !== null; ) (G_(e, t, a), (e = e.sibling));
  }
  function G_(e, t, a) {
    switch (e.tag) {
      case 26:
        (dn(e, t, a),
          e.flags & _i && e.memoizedState !== null && xv(a, tl, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        dn(e, t, a);
        break;
      case 3:
      case 4:
        var n = tl;
        ((tl = Ys(e.stateNode.containerInfo)), dn(e, t, a), (tl = n));
        break;
      case 22:
        e.memoizedState === null &&
          ((n = e.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = _i), (_i = 16777216), dn(e, t, a), (_i = n))
            : dn(e, t, a));
        break;
      default:
        dn(e, t, a);
    }
  }
  function $_(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function fi(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var n = t[a];
          ((dt = n), X_(n, e));
        }
      $_(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (Y_(e), (e = e.sibling));
  }
  function Y_(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (fi(e), e.flags & 2048 && ea(9, e, e.return));
        break;
      case 3:
        fi(e);
        break;
      case 12:
        fi(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), js(e))
          : fi(e);
        break;
      default:
        fi(e);
    }
  }
  function js(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var n = t[a];
          ((dt = n), X_(n, e));
        }
      $_(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (ea(8, t, t.return), js(t));
          break;
        case 22:
          ((a = t.stateNode), a._visibility & 2 && ((a._visibility &= -3), js(t)));
          break;
        default:
          js(t);
      }
      e = e.sibling;
    }
  }
  function X_(e, t) {
    for (; dt !== null; ) {
      var a = dt;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          ea(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var n = a.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          Pn(a.memoizedState.cache);
      }
      if (((n = a.child), n !== null)) ((n.return = a), (dt = n));
      else
        e: for (a = e; dt !== null; ) {
          n = dt;
          var s = n.sibling,
            u = n.return;
          if ((O_(n), n === a)) {
            dt = null;
            break e;
          }
          if (s !== null) {
            ((s.return = u), (dt = s));
            break e;
          }
          dt = u;
        }
    }
  }
  var Dk = {
      getCacheForType: function (e) {
        var t = ht(nt),
          a = t.data.get(e);
        return (a === void 0 && ((a = e()), t.data.set(e, a)), a);
      },
      cacheSignal: function () {
        return ht(nt).controller.signal;
      },
    },
    Rk = typeof WeakMap == 'function' ? WeakMap : Map,
    Me = 0,
    $e = null,
    Se = null,
    Ee = 0,
    Oe = 0,
    Dt = null,
    ta = !1,
    mn = !1,
    pu = !1,
    Ml = 0,
    Pe = 0,
    la = 0,
    Ma = 0,
    hu = 0,
    Rt = 0,
    _n = 0,
    pi = null,
    Nt = null,
    gu = !1,
    Ms = 0,
    V_ = 0,
    Bs = 1 / 0,
    qs = null,
    aa = null,
    ut = 0,
    na = null,
    fn = null,
    Bl = 0,
    ku = 0,
    vu = null,
    Q_ = null,
    hi = 0,
    yu = null;
  function zt() {
    return (Me & 2) !== 0 && Ee !== 0 ? Ee & -Ee : j.T !== null ? Eu() : ud();
  }
  function K_() {
    if (Rt === 0)
      if ((Ee & 536870912) === 0 || Ne) {
        var e = Gi;
        ((Gi <<= 1), (Gi & 3932160) === 0 && (Gi = 262144), (Rt = e));
      } else Rt = 536870912;
    return ((e = Ot.current), e !== null && (e.flags |= 32), Rt);
  }
  function At(e, t, a) {
    (((e === $e && (Oe === 2 || Oe === 9)) || e.cancelPendingCommit !== null) &&
      (pn(e, 0), ia(e, Ee, Rt, !1)),
      Dn(e, a),
      ((Me & 2) === 0 || e !== $e) &&
        (e === $e && ((Me & 2) === 0 && (Ma |= a), Pe === 4 && ia(e, Ee, Rt, !1)), fl(e)));
  }
  function Z_(e, t, a) {
    if ((Me & 6) !== 0) throw Error(r(327));
    var n = (!a && (t & 127) === 0 && (t & e.expiredLanes) === 0) || In(e, t),
      s = n ? Uk(e, t) : xu(e, t, !0),
      u = n;
    do {
      if (s === 0) {
        mn && !n && ia(e, t, 0, !1);
        break;
      } else {
        if (((a = e.current.alternate), u && !zk(a))) {
          ((s = xu(e, t, !1)), (u = !1));
          continue;
        }
        if (s === 2) {
          if (((u = t), e.errorRecoveryDisabledLanes & u)) var m = 0;
          else
            ((m = e.pendingLanes & -536870913), (m = m !== 0 ? m : m & 536870912 ? 536870912 : 0));
          if (m !== 0) {
            t = m;
            e: {
              var g = e;
              s = pi;
              var x = g.current.memoizedState.isDehydrated;
              if ((x && (pn(g, m).flags |= 256), (m = xu(g, m, !1)), m !== 2)) {
                if (pu && !x) {
                  ((g.errorRecoveryDisabledLanes |= u), (Ma |= u), (s = 4));
                  break e;
                }
                ((u = Nt), (Nt = s), u !== null && (Nt === null ? (Nt = u) : Nt.push.apply(Nt, u)));
              }
              s = m;
            }
            if (((u = !1), s !== 2)) continue;
          }
        }
        if (s === 1) {
          (pn(e, 0), ia(e, t, 0, !0));
          break;
        }
        e: {
          switch (((n = e), (u = s), u)) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ia(n, t, Rt, !ta);
              break e;
            case 2:
              Nt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((t & 62914560) === t && ((s = Ms + 300 - Lt()), 10 < s)) {
            if ((ia(n, t, Rt, !ta), Yi(n, 0, !0) !== 0)) break e;
            ((Bl = t),
              (n.timeoutHandle = Cf(
                J_.bind(null, n, a, Nt, qs, gu, t, Rt, Ma, _n, ta, u, 'Throttled', -0, 0),
                s
              )));
            break e;
          }
          J_(n, a, Nt, qs, gu, t, Rt, Ma, _n, ta, u, null, -0, 0);
        }
      }
      break;
    } while (!0);
    fl(e);
  }
  function J_(e, t, a, n, s, u, m, g, x, I, $, X, D, z) {
    if (((e.timeoutHandle = -1), (X = t.subtreeFlags), X & 8192 || (X & 16785408) === 16785408)) {
      ((X = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: kl,
      }),
        G_(t, u, X));
      var ae = (u & 62914560) === u ? Ms - Lt() : (u & 4194048) === u ? V_ - Lt() : 0;
      if (((ae = Sv(X, ae)), ae !== null)) {
        ((Bl = u),
          (e.cancelPendingCommit = ae(nf.bind(null, e, t, u, a, n, s, m, g, x, $, X, null, D, z))),
          ia(e, u, m, !I));
        return;
      }
    }
    nf(e, t, u, a, n, s, m, g, x);
  }
  function zk(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        t.flags & 16384 &&
        ((a = t.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var n = 0; n < a.length; n++) {
          var s = a[n],
            u = s.getSnapshot;
          s = s.value;
          try {
            if (!Bt(u(), s)) return !1;
          } catch {
            return !1;
          }
        }
      if (((a = t.child), t.subtreeFlags & 16384 && a !== null)) ((a.return = t), (t = a));
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function ia(e, t, a, n) {
    ((t &= ~hu),
      (t &= ~Ma),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      n && (e.warmLanes |= t),
      (n = e.expirationTimes));
    for (var s = t; 0 < s; ) {
      var u = 31 - Mt(s),
        m = 1 << u;
      ((n[u] = -1), (s &= ~m));
    }
    a !== 0 && sd(e, a, t);
  }
  function Os() {
    return (Me & 6) === 0 ? (gi(0), !1) : !0;
  }
  function bu() {
    if (Se !== null) {
      if (Oe === 0) var e = Se.return;
      else ((e = Se), (xl = Sa = null), Do(e), (nn = null), (Fn = 0), (e = Se));
      for (; e !== null; ) (C_(e.alternate, e), (e = e.return));
      Se = null;
    }
  }
  function pn(e, t) {
    var a = e.timeoutHandle;
    (a !== -1 && ((e.timeoutHandle = -1), iv(a)),
      (a = e.cancelPendingCommit),
      a !== null && ((e.cancelPendingCommit = null), a()),
      (Bl = 0),
      bu(),
      ($e = e),
      (Se = a = yl(e.current, null)),
      (Ee = t),
      (Oe = 0),
      (Dt = null),
      (ta = !1),
      (mn = In(e, t)),
      (pu = !1),
      (_n = Rt = hu = Ma = la = Pe = 0),
      (Nt = pi = null),
      (gu = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var s = 31 - Mt(n),
          u = 1 << s;
        ((t |= e[s]), (n &= ~u));
      }
    return ((Ml = t), ls(), a);
  }
  function P_(e, t) {
    ((ve = null),
      (j.H = ri),
      t === an || t === cs
        ? ((t = _m()), (Oe = 3))
        : t === To
          ? ((t = _m()), (Oe = 4))
          : (Oe =
              t === Fo
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (Dt = t),
      Se === null && ((Pe = 1), ws(e, Xt(t, e.current))));
  }
  function W_() {
    var e = Ot.current;
    return e === null
      ? !0
      : (Ee & 4194048) === Ee
        ? Zt === null
        : (Ee & 62914560) === Ee || (Ee & 536870912) !== 0
          ? e === Zt
          : !1;
  }
  function F_() {
    var e = j.H;
    return ((j.H = ri), e === null ? ri : e);
  }
  function ef() {
    var e = j.A;
    return ((j.A = Dk), e);
  }
  function Is() {
    ((Pe = 4),
      ta || ((Ee & 4194048) !== Ee && Ot.current !== null) || (mn = !0),
      ((la & 134217727) === 0 && (Ma & 134217727) === 0) || $e === null || ia($e, Ee, Rt, !1));
  }
  function xu(e, t, a) {
    var n = Me;
    Me |= 2;
    var s = F_(),
      u = ef();
    (($e !== e || Ee !== t) && ((qs = null), pn(e, t)), (t = !1));
    var m = Pe;
    e: do
      try {
        if (Oe !== 0 && Se !== null) {
          var g = Se,
            x = Dt;
          switch (Oe) {
            case 8:
              (bu(), (m = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Ot.current === null && (t = !0);
              var I = Oe;
              if (((Oe = 0), (Dt = null), hn(e, g, x, I), a && mn)) {
                m = 0;
                break e;
              }
              break;
            default:
              ((I = Oe), (Oe = 0), (Dt = null), hn(e, g, x, I));
          }
        }
        (Hk(), (m = Pe));
        break;
      } catch ($) {
        P_(e, $);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (xl = Sa = null),
      (Me = n),
      (j.H = s),
      (j.A = u),
      Se === null && (($e = null), (Ee = 0), ls()),
      m
    );
  }
  function Hk() {
    for (; Se !== null; ) tf(Se);
  }
  function Uk(e, t) {
    var a = Me;
    Me |= 2;
    var n = F_(),
      s = ef();
    $e !== e || Ee !== t ? ((qs = null), (Bs = Lt() + 500), pn(e, t)) : (mn = In(e, t));
    e: do
      try {
        if (Oe !== 0 && Se !== null) {
          t = Se;
          var u = Dt;
          t: switch (Oe) {
            case 1:
              ((Oe = 0), (Dt = null), hn(e, t, u, 1));
              break;
            case 2:
            case 9:
              if (dm(u)) {
                ((Oe = 0), (Dt = null), lf(t));
                break;
              }
              ((t = function () {
                ((Oe !== 2 && Oe !== 9) || $e !== e || (Oe = 7), fl(e));
              }),
                u.then(t, t));
              break e;
            case 3:
              Oe = 7;
              break e;
            case 4:
              Oe = 5;
              break e;
            case 7:
              dm(u) ? ((Oe = 0), (Dt = null), lf(t)) : ((Oe = 0), (Dt = null), hn(e, t, u, 7));
              break;
            case 5:
              var m = null;
              switch (Se.tag) {
                case 26:
                  m = Se.memoizedState;
                case 5:
                case 27:
                  var g = Se;
                  if (m ? Gf(m) : g.stateNode.complete) {
                    ((Oe = 0), (Dt = null));
                    var x = g.sibling;
                    if (x !== null) Se = x;
                    else {
                      var I = g.return;
                      I !== null ? ((Se = I), Ds(I)) : (Se = null);
                    }
                    break t;
                  }
              }
              ((Oe = 0), (Dt = null), hn(e, t, u, 5));
              break;
            case 6:
              ((Oe = 0), (Dt = null), hn(e, t, u, 6));
              break;
            case 8:
              (bu(), (Pe = 6));
              break e;
            default:
              throw Error(r(462));
          }
        }
        Gk();
        break;
      } catch ($) {
        P_(e, $);
      }
    while (!0);
    return (
      (xl = Sa = null),
      (j.H = n),
      (j.A = s),
      (Me = a),
      Se !== null ? 0 : (($e = null), (Ee = 0), ls(), Pe)
    );
  }
  function Gk() {
    for (; Se !== null && !dg(); ) tf(Se);
  }
  function tf(e) {
    var t = T_(e.alternate, e, Ml);
    ((e.memoizedProps = e.pendingProps), t === null ? Ds(e) : (Se = t));
  }
  function lf(e) {
    var t = e,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = v_(a, t, t.pendingProps, t.type, void 0, Ee);
        break;
      case 11:
        t = v_(a, t, t.pendingProps, t.type.render, t.ref, Ee);
        break;
      case 5:
        Do(t);
      default:
        (C_(a, t), (t = Se = em(t, Ml)), (t = T_(a, t, Ml)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? Ds(e) : (Se = t));
  }
  function hn(e, t, a, n) {
    ((xl = Sa = null), Do(t), (nn = null), (Fn = 0));
    var s = t.return;
    try {
      if (Lk(e, s, t, a, Ee)) {
        ((Pe = 1), ws(e, Xt(a, e.current)), (Se = null));
        return;
      }
    } catch (u) {
      if (s !== null) throw ((Se = s), u);
      ((Pe = 1), ws(e, Xt(a, e.current)), (Se = null));
      return;
    }
    t.flags & 32768
      ? (Ne || n === 1
          ? (e = !0)
          : mn || (Ee & 536870912) !== 0
            ? (e = !1)
            : ((ta = e = !0),
              (n === 2 || n === 9 || n === 3 || n === 6) &&
                ((n = Ot.current), n !== null && n.tag === 13 && (n.flags |= 16384))),
        af(t, e))
      : Ds(t);
  }
  function Ds(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        af(t, ta);
        return;
      }
      e = t.return;
      var a = Bk(t.alternate, t, Ml);
      if (a !== null) {
        Se = a;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        Se = t;
        return;
      }
      Se = t = e;
    } while (t !== null);
    Pe === 0 && (Pe = 5);
  }
  function af(e, t) {
    do {
      var a = qk(e.alternate, e);
      if (a !== null) {
        ((a.flags &= 32767), (Se = a));
        return;
      }
      if (
        ((a = e.return),
        a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        Se = e;
        return;
      }
      Se = e = a;
    } while (e !== null);
    ((Pe = 6), (Se = null));
  }
  function nf(e, t, a, n, s, u, m, g, x) {
    e.cancelPendingCommit = null;
    do Rs();
    while (ut !== 0);
    if ((Me & 6) !== 0) throw Error(r(327));
    if (t !== null) {
      if (t === e.current) throw Error(r(177));
      if (
        ((u = t.lanes | t.childLanes),
        (u |= uo),
        bg(e, a, u, m, g, x),
        e === $e && ((Se = $e = null), (Ee = 0)),
        (fn = t),
        (na = e),
        (Bl = a),
        (ku = u),
        (vu = s),
        (Q_ = n),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            Vk(Hi, function () {
              return (cf(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (n = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || n)
      ) {
        ((n = j.T), (j.T = null), (s = Q.p), (Q.p = 2), (m = Me), (Me |= 4));
        try {
          Ok(e, t, a);
        } finally {
          ((Me = m), (Q.p = s), (j.T = n));
        }
      }
      ((ut = 1), sf(), rf(), of());
    }
  }
  function sf() {
    if (ut === 1) {
      ut = 0;
      var e = na,
        t = fn,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        ((a = j.T), (j.T = null));
        var n = Q.p;
        Q.p = 2;
        var s = Me;
        Me |= 4;
        try {
          z_(t, e);
          var u = qu,
            m = Xd(e.containerInfo),
            g = u.focusedElem,
            x = u.selectionRange;
          if (m !== g && g && g.ownerDocument && Yd(g.ownerDocument.documentElement, g)) {
            if (x !== null && no(g)) {
              var I = x.start,
                $ = x.end;
              if (($ === void 0 && ($ = I), 'selectionStart' in g))
                ((g.selectionStart = I), (g.selectionEnd = Math.min($, g.value.length)));
              else {
                var X = g.ownerDocument || document,
                  D = (X && X.defaultView) || window;
                if (D.getSelection) {
                  var z = D.getSelection(),
                    ae = g.textContent.length,
                    me = Math.min(x.start, ae),
                    ze = x.end === void 0 ? me : Math.min(x.end, ae);
                  !z.extend && me > ze && ((m = ze), (ze = me), (me = m));
                  var B = $d(g, me),
                    N = $d(g, ze);
                  if (
                    B &&
                    N &&
                    (z.rangeCount !== 1 ||
                      z.anchorNode !== B.node ||
                      z.anchorOffset !== B.offset ||
                      z.focusNode !== N.node ||
                      z.focusOffset !== N.offset)
                  ) {
                    var O = X.createRange();
                    (O.setStart(B.node, B.offset),
                      z.removeAllRanges(),
                      me > ze
                        ? (z.addRange(O), z.extend(N.node, N.offset))
                        : (O.setEnd(N.node, N.offset), z.addRange(O)));
                  }
                }
              }
            }
            for (X = [], z = g; (z = z.parentNode); )
              z.nodeType === 1 && X.push({ element: z, left: z.scrollLeft, top: z.scrollTop });
            for (typeof g.focus == 'function' && g.focus(), g = 0; g < X.length; g++) {
              var Y = X[g];
              ((Y.element.scrollLeft = Y.left), (Y.element.scrollTop = Y.top));
            }
          }
          ((Js = !!Bu), (qu = Bu = null));
        } finally {
          ((Me = s), (Q.p = n), (j.T = a));
        }
      }
      ((e.current = t), (ut = 2));
    }
  }
  function rf() {
    if (ut === 2) {
      ut = 0;
      var e = na,
        t = fn,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        ((a = j.T), (j.T = null));
        var n = Q.p;
        Q.p = 2;
        var s = Me;
        Me |= 4;
        try {
          q_(e, t.alternate, t);
        } finally {
          ((Me = s), (Q.p = n), (j.T = a));
        }
      }
      ut = 3;
    }
  }
  function of() {
    if (ut === 4 || ut === 3) {
      ((ut = 0), mg());
      var e = na,
        t = fn,
        a = Bl,
        n = Q_;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (ut = 5)
        : ((ut = 0), (fn = na = null), uf(e, e.pendingLanes));
      var s = e.pendingLanes;
      if (
        (s === 0 && (aa = null),
        zr(a),
        (t = t.stateNode),
        jt && typeof jt.onCommitFiberRoot == 'function')
      )
        try {
          jt.onCommitFiberRoot(On, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        ((t = j.T), (s = Q.p), (Q.p = 2), (j.T = null));
        try {
          for (var u = e.onRecoverableError, m = 0; m < n.length; m++) {
            var g = n[m];
            u(g.value, { componentStack: g.stack });
          }
        } finally {
          ((j.T = t), (Q.p = s));
        }
      }
      ((Bl & 3) !== 0 && Rs(),
        fl(e),
        (s = e.pendingLanes),
        (a & 261930) !== 0 && (s & 42) !== 0 ? (e === yu ? hi++ : ((hi = 0), (yu = e))) : (hi = 0),
        gi(0));
    }
  }
  function uf(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), Pn(t)));
  }
  function Rs() {
    return (sf(), rf(), of(), cf());
  }
  function cf() {
    if (ut !== 5) return !1;
    var e = na,
      t = ku;
    ku = 0;
    var a = zr(Bl),
      n = j.T,
      s = Q.p;
    try {
      ((Q.p = 32 > a ? 32 : a), (j.T = null), (a = vu), (vu = null));
      var u = na,
        m = Bl;
      if (((ut = 0), (fn = na = null), (Bl = 0), (Me & 6) !== 0)) throw Error(r(331));
      var g = Me;
      if (
        ((Me |= 4),
        Y_(u.current),
        U_(u, u.current, m, a),
        (Me = g),
        gi(0, !1),
        jt && typeof jt.onPostCommitFiberRoot == 'function')
      )
        try {
          jt.onPostCommitFiberRoot(On, u);
        } catch {}
      return !0;
    } finally {
      ((Q.p = s), (j.T = n), uf(e, t));
    }
  }
  function df(e, t, a) {
    ((t = Xt(a, t)),
      (t = Wo(e.stateNode, t, 2)),
      (e = Pl(e, t, 2)),
      e !== null && (Dn(e, 2), fl(e)));
  }
  function Ie(e, t, a) {
    if (e.tag === 3) df(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          df(t, e, a);
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof n.componentDidCatch == 'function' && (aa === null || !aa.has(n)))
          ) {
            ((e = Xt(a, e)),
              (a = d_(2)),
              (n = Pl(t, a, 2)),
              n !== null && (m_(a, n, t, e), Dn(n, 2), fl(n)));
            break;
          }
        }
        t = t.return;
      }
  }
  function Su(e, t, a) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new Rk();
      var s = new Set();
      n.set(t, s);
    } else ((s = n.get(t)), s === void 0 && ((s = new Set()), n.set(t, s)));
    s.has(a) || ((pu = !0), s.add(a), (e = $k.bind(null, e, t, a)), t.then(e, e));
  }
  function $k(e, t, a) {
    var n = e.pingCache;
    (n !== null && n.delete(t),
      (e.pingedLanes |= e.suspendedLanes & a),
      (e.warmLanes &= ~a),
      $e === e &&
        (Ee & a) === a &&
        (Pe === 4 || (Pe === 3 && (Ee & 62914560) === Ee && 300 > Lt() - Ms)
          ? (Me & 2) === 0 && pn(e, 0)
          : (hu |= a),
        _n === Ee && (_n = 0)),
      fl(e));
  }
  function mf(e, t) {
    (t === 0 && (t = id()), (e = ya(e, t)), e !== null && (Dn(e, t), fl(e)));
  }
  function Yk(e) {
    var t = e.memoizedState,
      a = 0;
    (t !== null && (a = t.retryLane), mf(e, a));
  }
  function Xk(e, t) {
    var a = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var n = e.stateNode,
          s = e.memoizedState;
        s !== null && (a = s.retryLane);
        break;
      case 19:
        n = e.stateNode;
        break;
      case 22:
        n = e.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    (n !== null && n.delete(t), mf(e, a));
  }
  function Vk(e, t) {
    return Or(e, t);
  }
  var zs = null,
    gn = null,
    wu = !1,
    Hs = !1,
    Tu = !1,
    sa = 0;
  function fl(e) {
    (e !== gn && e.next === null && (gn === null ? (zs = gn = e) : (gn = gn.next = e)),
      (Hs = !0),
      wu || ((wu = !0), Kk()));
  }
  function gi(e, t) {
    if (!Tu && Hs) {
      Tu = !0;
      do
        for (var a = !1, n = zs; n !== null; ) {
          if (e !== 0) {
            var s = n.pendingLanes;
            if (s === 0) var u = 0;
            else {
              var m = n.suspendedLanes,
                g = n.pingedLanes;
              ((u = (1 << (31 - Mt(42 | e) + 1)) - 1),
                (u &= s & ~(m & ~g)),
                (u = u & 201326741 ? (u & 201326741) | 1 : u ? u | 2 : 0));
            }
            u !== 0 && ((a = !0), hf(n, u));
          } else
            ((u = Ee),
              (u = Yi(
                n,
                n === $e ? u : 0,
                n.cancelPendingCommit !== null || n.timeoutHandle !== -1
              )),
              (u & 3) === 0 || In(n, u) || ((a = !0), hf(n, u)));
          n = n.next;
        }
      while (a);
      Tu = !1;
    }
  }
  function Qk() {
    _f();
  }
  function _f() {
    Hs = wu = !1;
    var e = 0;
    sa !== 0 && nv() && (e = sa);
    for (var t = Lt(), a = null, n = zs; n !== null; ) {
      var s = n.next,
        u = ff(n, t);
      (u === 0
        ? ((n.next = null), a === null ? (zs = s) : (a.next = s), s === null && (gn = a))
        : ((a = n), (e !== 0 || (u & 3) !== 0) && (Hs = !0)),
        (n = s));
    }
    ((ut !== 0 && ut !== 5) || gi(e), sa !== 0 && (sa = 0));
  }
  function ff(e, t) {
    for (
      var a = e.suspendedLanes,
        n = e.pingedLanes,
        s = e.expirationTimes,
        u = e.pendingLanes & -62914561;
      0 < u;
    ) {
      var m = 31 - Mt(u),
        g = 1 << m,
        x = s[m];
      (x === -1
        ? ((g & a) === 0 || (g & n) !== 0) && (s[m] = yg(g, t))
        : x <= t && (e.expiredLanes |= g),
        (u &= ~g));
    }
    if (
      ((t = $e),
      (a = Ee),
      (a = Yi(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (n = e.callbackNode),
      a === 0 || (e === t && (Oe === 2 || Oe === 9)) || e.cancelPendingCommit !== null)
    )
      return (n !== null && n !== null && Ir(n), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((a & 3) === 0 || In(e, a)) {
      if (((t = a & -a), t === e.callbackPriority)) return t;
      switch ((n !== null && Ir(n), zr(a))) {
        case 2:
        case 8:
          a = ad;
          break;
        case 32:
          a = Hi;
          break;
        case 268435456:
          a = nd;
          break;
        default:
          a = Hi;
      }
      return (
        (n = pf.bind(null, e)),
        (a = Or(a, n)),
        (e.callbackPriority = t),
        (e.callbackNode = a),
        t
      );
    }
    return (
      n !== null && n !== null && Ir(n),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function pf(e, t) {
    if (ut !== 0 && ut !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var a = e.callbackNode;
    if (Rs() && e.callbackNode !== a) return null;
    var n = Ee;
    return (
      (n = Yi(e, e === $e ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      n === 0
        ? null
        : (Z_(e, n, t),
          ff(e, Lt()),
          e.callbackNode != null && e.callbackNode === a ? pf.bind(null, e) : null)
    );
  }
  function hf(e, t) {
    if (Rs()) return null;
    Z_(e, t, !0);
  }
  function Kk() {
    sv(function () {
      (Me & 6) !== 0 ? Or(ld, Qk) : _f();
    });
  }
  function Eu() {
    if (sa === 0) {
      var e = tn;
      (e === 0 && ((e = Ui), (Ui <<= 1), (Ui & 261888) === 0 && (Ui = 256)), (sa = e));
    }
    return sa;
  }
  function gf(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : Ki('' + e);
  }
  function kf(e, t) {
    var a = t.ownerDocument.createElement('input');
    return (
      (a.name = t.name),
      (a.value = t.value),
      e.id && a.setAttribute('form', e.id),
      t.parentNode.insertBefore(a, t),
      (e = new FormData(e)),
      a.parentNode.removeChild(a),
      e
    );
  }
  function Zk(e, t, a, n, s) {
    if (t === 'submit' && a && a.stateNode === s) {
      var u = gf((s[St] || null).action),
        m = n.submitter;
      m &&
        ((t = (t = m[St] || null) ? gf(t.formAction) : m.getAttribute('formAction')),
        t !== null && ((u = t), (m = null)));
      var g = new Wi('action', 'action', null, n, s);
      e.push({
        event: g,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (n.defaultPrevented) {
                if (sa !== 0) {
                  var x = m ? kf(s, m) : new FormData(s);
                  Vo(a, { pending: !0, data: x, method: s.method, action: u }, null, x);
                }
              } else
                typeof u == 'function' &&
                  (g.preventDefault(),
                  (x = m ? kf(s, m) : new FormData(s)),
                  Vo(a, { pending: !0, data: x, method: s.method, action: u }, u, x));
            },
            currentTarget: s,
          },
        ],
      });
    }
  }
  for (var Cu = 0; Cu < oo.length; Cu++) {
    var Nu = oo[Cu],
      Jk = Nu.toLowerCase(),
      Pk = Nu[0].toUpperCase() + Nu.slice(1);
    el(Jk, 'on' + Pk);
  }
  (el(Kd, 'onAnimationEnd'),
    el(Zd, 'onAnimationIteration'),
    el(Jd, 'onAnimationStart'),
    el('dblclick', 'onDoubleClick'),
    el('focusin', 'onFocus'),
    el('focusout', 'onBlur'),
    el(_k, 'onTransitionRun'),
    el(fk, 'onTransitionStart'),
    el(pk, 'onTransitionCancel'),
    el(Pd, 'onTransitionEnd'),
    Ua('onMouseEnter', ['mouseout', 'mouseover']),
    Ua('onMouseLeave', ['mouseout', 'mouseover']),
    Ua('onPointerEnter', ['pointerout', 'pointerover']),
    Ua('onPointerLeave', ['pointerout', 'pointerover']),
    ha('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    ha(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    ha('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    ha('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    ha(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    ha(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var ki =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    Wk = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(ki)
    );
  function vf(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var n = e[a],
        s = n.event;
      n = n.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var m = n.length - 1; 0 <= m; m--) {
            var g = n[m],
              x = g.instance,
              I = g.currentTarget;
            if (((g = g.listener), x !== u && s.isPropagationStopped())) break e;
            ((u = g), (s.currentTarget = I));
            try {
              u(s);
            } catch ($) {
              ts($);
            }
            ((s.currentTarget = null), (u = x));
          }
        else
          for (m = 0; m < n.length; m++) {
            if (
              ((g = n[m]),
              (x = g.instance),
              (I = g.currentTarget),
              (g = g.listener),
              x !== u && s.isPropagationStopped())
            )
              break e;
            ((u = g), (s.currentTarget = I));
            try {
              u(s);
            } catch ($) {
              ts($);
            }
            ((s.currentTarget = null), (u = x));
          }
      }
    }
  }
  function we(e, t) {
    var a = t[Hr];
    a === void 0 && (a = t[Hr] = new Set());
    var n = e + '__bubble';
    a.has(n) || (yf(t, e, 2, !1), a.add(n));
  }
  function Au(e, t, a) {
    var n = 0;
    (t && (n |= 4), yf(a, e, n, t));
  }
  var Us = '_reactListening' + Math.random().toString(36).slice(2);
  function Lu(e) {
    if (!e[Us]) {
      ((e[Us] = !0),
        md.forEach(function (a) {
          a !== 'selectionchange' && (Wk.has(a) || Au(a, !1, e), Au(a, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Us] || ((t[Us] = !0), Au('selectionchange', !1, t));
    }
  }
  function yf(e, t, a, n) {
    switch (Zf(t)) {
      case 2:
        var s = Ev;
        break;
      case 8:
        s = Cv;
        break;
      default:
        s = Xu;
    }
    ((a = s.bind(null, t, a, e)),
      (s = void 0),
      !Zr || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (s = !0),
      n
        ? s !== void 0
          ? e.addEventListener(t, a, { capture: !0, passive: s })
          : e.addEventListener(t, a, !0)
        : s !== void 0
          ? e.addEventListener(t, a, { passive: s })
          : e.addEventListener(t, a, !1));
  }
  function ju(e, t, a, n, s) {
    var u = n;
    if ((t & 1) === 0 && (t & 2) === 0 && n !== null)
      e: for (;;) {
        if (n === null) return;
        var m = n.tag;
        if (m === 3 || m === 4) {
          var g = n.stateNode.containerInfo;
          if (g === s) break;
          if (m === 4)
            for (m = n.return; m !== null; ) {
              var x = m.tag;
              if ((x === 3 || x === 4) && m.stateNode.containerInfo === s) return;
              m = m.return;
            }
          for (; g !== null; ) {
            if (((m = Ra(g)), m === null)) return;
            if (((x = m.tag), x === 5 || x === 6 || x === 26 || x === 27)) {
              n = u = m;
              continue e;
            }
            g = g.parentNode;
          }
        }
        n = n.return;
      }
    wd(function () {
      var I = u,
        $ = Qr(a),
        X = [];
      e: {
        var D = Wd.get(e);
        if (D !== void 0) {
          var z = Wi,
            ae = e;
          switch (e) {
            case 'keypress':
              if (Ji(a) === 0) break e;
            case 'keydown':
            case 'keyup':
              z = Xg;
              break;
            case 'focusin':
              ((ae = 'focus'), (z = Fr));
              break;
            case 'focusout':
              ((ae = 'blur'), (z = Fr));
              break;
            case 'beforeblur':
            case 'afterblur':
              z = Fr;
              break;
            case 'click':
              if (a.button === 2) break e;
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              z = Cd;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              z = Bg;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              z = Kg;
              break;
            case Kd:
            case Zd:
            case Jd:
              z = Ig;
              break;
            case Pd:
              z = Jg;
              break;
            case 'scroll':
            case 'scrollend':
              z = jg;
              break;
            case 'wheel':
              z = Wg;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              z = Rg;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              z = Ad;
              break;
            case 'toggle':
            case 'beforetoggle':
              z = ek;
          }
          var me = (t & 4) !== 0,
            ze = !me && (e === 'scroll' || e === 'scrollend'),
            B = me ? (D !== null ? D + 'Capture' : null) : D;
          me = [];
          for (var N = I, O; N !== null; ) {
            var Y = N;
            if (
              ((O = Y.stateNode),
              (Y = Y.tag),
              (Y !== 5 && Y !== 26 && Y !== 27) ||
                O === null ||
                B === null ||
                ((Y = Hn(N, B)), Y != null && me.push(vi(N, Y, O))),
              ze)
            )
              break;
            N = N.return;
          }
          0 < me.length && ((D = new z(D, ae, null, a, $)), X.push({ event: D, listeners: me }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((D = e === 'mouseover' || e === 'pointerover'),
            (z = e === 'mouseout' || e === 'pointerout'),
            D && a !== Vr && (ae = a.relatedTarget || a.fromElement) && (Ra(ae) || ae[Da]))
          )
            break e;
          if (
            (z || D) &&
            ((D =
              $.window === $
                ? $
                : (D = $.ownerDocument)
                  ? D.defaultView || D.parentWindow
                  : window),
            z
              ? ((ae = a.relatedTarget || a.toElement),
                (z = I),
                (ae = ae ? Ra(ae) : null),
                ae !== null &&
                  ((ze = d(ae)), (me = ae.tag), ae !== ze || (me !== 5 && me !== 27 && me !== 6)) &&
                  (ae = null))
              : ((z = null), (ae = I)),
            z !== ae)
          ) {
            if (
              ((me = Cd),
              (Y = 'onMouseLeave'),
              (B = 'onMouseEnter'),
              (N = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((me = Ad), (Y = 'onPointerLeave'), (B = 'onPointerEnter'), (N = 'pointer')),
              (ze = z == null ? D : zn(z)),
              (O = ae == null ? D : zn(ae)),
              (D = new me(Y, N + 'leave', z, a, $)),
              (D.target = ze),
              (D.relatedTarget = O),
              (Y = null),
              Ra($) === I &&
                ((me = new me(B, N + 'enter', ae, a, $)),
                (me.target = O),
                (me.relatedTarget = ze),
                (Y = me)),
              (ze = Y),
              z && ae)
            )
              t: {
                for (me = Fk, B = z, N = ae, O = 0, Y = B; Y; Y = me(Y)) O++;
                Y = 0;
                for (var ue = N; ue; ue = me(ue)) Y++;
                for (; 0 < O - Y; ) ((B = me(B)), O--);
                for (; 0 < Y - O; ) ((N = me(N)), Y--);
                for (; O--; ) {
                  if (B === N || (N !== null && B === N.alternate)) {
                    me = B;
                    break t;
                  }
                  ((B = me(B)), (N = me(N)));
                }
                me = null;
              }
            else me = null;
            (z !== null && bf(X, D, z, me, !1),
              ae !== null && ze !== null && bf(X, ze, ae, me, !0));
          }
        }
        e: {
          if (
            ((D = I ? zn(I) : window),
            (z = D.nodeName && D.nodeName.toLowerCase()),
            z === 'select' || (z === 'input' && D.type === 'file'))
          )
            var Ae = Dd;
          else if (Od(D))
            if (Rd) Ae = ck;
            else {
              Ae = ok;
              var se = rk;
            }
          else
            ((z = D.nodeName),
              !z || z.toLowerCase() !== 'input' || (D.type !== 'checkbox' && D.type !== 'radio')
                ? I && Xr(I.elementType) && (Ae = Dd)
                : (Ae = uk));
          if (Ae && (Ae = Ae(e, I))) {
            Id(X, Ae, a, $);
            break e;
          }
          (se && se(e, D, I),
            e === 'focusout' &&
              I &&
              D.type === 'number' &&
              I.memoizedProps.value != null &&
              Yr(D, 'number', D.value));
        }
        switch (((se = I ? zn(I) : window), e)) {
          case 'focusin':
            (Od(se) || se.contentEditable === 'true') && ((Qa = se), (io = I), (Kn = null));
            break;
          case 'focusout':
            Kn = io = Qa = null;
            break;
          case 'mousedown':
            so = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((so = !1), Vd(X, a, $));
            break;
          case 'selectionchange':
            if (mk) break;
          case 'keydown':
          case 'keyup':
            Vd(X, a, $);
        }
        var ye;
        if (to)
          e: {
            switch (e) {
              case 'compositionstart':
                var Ce = 'onCompositionStart';
                break e;
              case 'compositionend':
                Ce = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                Ce = 'onCompositionUpdate';
                break e;
            }
            Ce = void 0;
          }
        else
          Va
            ? Bd(e, a) && (Ce = 'onCompositionEnd')
            : e === 'keydown' && a.keyCode === 229 && (Ce = 'onCompositionStart');
        (Ce &&
          (Ld &&
            a.locale !== 'ko' &&
            (Va || Ce !== 'onCompositionStart'
              ? Ce === 'onCompositionEnd' && Va && (ye = Td())
              : ((Yl = $), (Jr = 'value' in Yl ? Yl.value : Yl.textContent), (Va = !0))),
          (se = Gs(I, Ce)),
          0 < se.length &&
            ((Ce = new Nd(Ce, e, null, a, $)),
            X.push({ event: Ce, listeners: se }),
            ye ? (Ce.data = ye) : ((ye = qd(a)), ye !== null && (Ce.data = ye)))),
          (ye = lk ? ak(e, a) : nk(e, a)) &&
            ((Ce = Gs(I, 'onBeforeInput')),
            0 < Ce.length &&
              ((se = new Nd('onBeforeInput', 'beforeinput', null, a, $)),
              X.push({ event: se, listeners: Ce }),
              (se.data = ye))),
          Zk(X, e, I, a, $));
      }
      vf(X, t);
    });
  }
  function vi(e, t, a) {
    return { instance: e, listener: t, currentTarget: a };
  }
  function Gs(e, t) {
    for (var a = t + 'Capture', n = []; e !== null; ) {
      var s = e,
        u = s.stateNode;
      if (
        ((s = s.tag),
        (s !== 5 && s !== 26 && s !== 27) ||
          u === null ||
          ((s = Hn(e, a)),
          s != null && n.unshift(vi(e, s, u)),
          (s = Hn(e, t)),
          s != null && n.push(vi(e, s, u))),
        e.tag === 3)
      )
        return n;
      e = e.return;
    }
    return [];
  }
  function Fk(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function bf(e, t, a, n, s) {
    for (var u = t._reactName, m = []; a !== null && a !== n; ) {
      var g = a,
        x = g.alternate,
        I = g.stateNode;
      if (((g = g.tag), x !== null && x === n)) break;
      ((g !== 5 && g !== 26 && g !== 27) ||
        I === null ||
        ((x = I),
        s
          ? ((I = Hn(a, u)), I != null && m.unshift(vi(a, I, x)))
          : s || ((I = Hn(a, u)), I != null && m.push(vi(a, I, x)))),
        (a = a.return));
    }
    m.length !== 0 && e.push({ event: t, listeners: m });
  }
  var ev = /\r\n?/g,
    tv = /\u0000|\uFFFD/g;
  function xf(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        ev,
        `
`
      )
      .replace(tv, '');
  }
  function Sf(e, t) {
    return ((t = xf(t)), xf(e) === t);
  }
  function Re(e, t, a, n, s, u) {
    switch (a) {
      case 'children':
        typeof n == 'string'
          ? t === 'body' || (t === 'textarea' && n === '') || $a(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && t !== 'body' && $a(e, '' + n);
        break;
      case 'className':
        Vi(e, 'class', n);
        break;
      case 'tabIndex':
        Vi(e, 'tabindex', n);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Vi(e, a, n);
        break;
      case 'style':
        xd(e, n, u);
        break;
      case 'data':
        if (t !== 'object') {
          Vi(e, 'data', n);
          break;
        }
      case 'src':
      case 'href':
        if (n === '' && (t !== 'a' || a !== 'href')) {
          e.removeAttribute(a);
          break;
        }
        if (n == null || typeof n == 'function' || typeof n == 'symbol' || typeof n == 'boolean') {
          e.removeAttribute(a);
          break;
        }
        ((n = Ki('' + n)), e.setAttribute(a, n));
        break;
      case 'action':
      case 'formAction':
        if (typeof n == 'function') {
          e.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == 'function' &&
            (a === 'formAction'
              ? (t !== 'input' && Re(e, t, 'name', s.name, s, null),
                Re(e, t, 'formEncType', s.formEncType, s, null),
                Re(e, t, 'formMethod', s.formMethod, s, null),
                Re(e, t, 'formTarget', s.formTarget, s, null))
              : (Re(e, t, 'encType', s.encType, s, null),
                Re(e, t, 'method', s.method, s, null),
                Re(e, t, 'target', s.target, s, null)));
        if (n == null || typeof n == 'symbol' || typeof n == 'boolean') {
          e.removeAttribute(a);
          break;
        }
        ((n = Ki('' + n)), e.setAttribute(a, n));
        break;
      case 'onClick':
        n != null && (e.onclick = kl);
        break;
      case 'onScroll':
        n != null && we('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && we('scrollend', e);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(r(61));
          if (((a = n.__html), a != null)) {
            if (s.children != null) throw Error(r(60));
            e.innerHTML = a;
          }
        }
        break;
      case 'multiple':
        e.multiple = n && typeof n != 'function' && typeof n != 'symbol';
        break;
      case 'muted':
        e.muted = n && typeof n != 'function' && typeof n != 'symbol';
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
        if (n == null || typeof n == 'function' || typeof n == 'boolean' || typeof n == 'symbol') {
          e.removeAttribute('xlink:href');
          break;
        }
        ((a = Ki('' + n)), e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a));
        break;
      case 'contentEditable':
      case 'spellCheck':
      case 'draggable':
      case 'value':
      case 'autoReverse':
      case 'externalResourcesRequired':
      case 'focusable':
      case 'preserveAlpha':
        n != null && typeof n != 'function' && typeof n != 'symbol'
          ? e.setAttribute(a, '' + n)
          : e.removeAttribute(a);
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
        n && typeof n != 'function' && typeof n != 'symbol'
          ? e.setAttribute(a, '')
          : e.removeAttribute(a);
        break;
      case 'capture':
      case 'download':
        n === !0
          ? e.setAttribute(a, '')
          : n !== !1 && n != null && typeof n != 'function' && typeof n != 'symbol'
            ? e.setAttribute(a, n)
            : e.removeAttribute(a);
        break;
      case 'cols':
      case 'rows':
      case 'size':
      case 'span':
        n != null && typeof n != 'function' && typeof n != 'symbol' && !isNaN(n) && 1 <= n
          ? e.setAttribute(a, n)
          : e.removeAttribute(a);
        break;
      case 'rowSpan':
      case 'start':
        n == null || typeof n == 'function' || typeof n == 'symbol' || isNaN(n)
          ? e.removeAttribute(a)
          : e.setAttribute(a, n);
        break;
      case 'popover':
        (we('beforetoggle', e), we('toggle', e), Xi(e, 'popover', n));
        break;
      case 'xlinkActuate':
        gl(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', n);
        break;
      case 'xlinkArcrole':
        gl(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', n);
        break;
      case 'xlinkRole':
        gl(e, 'http://www.w3.org/1999/xlink', 'xlink:role', n);
        break;
      case 'xlinkShow':
        gl(e, 'http://www.w3.org/1999/xlink', 'xlink:show', n);
        break;
      case 'xlinkTitle':
        gl(e, 'http://www.w3.org/1999/xlink', 'xlink:title', n);
        break;
      case 'xlinkType':
        gl(e, 'http://www.w3.org/1999/xlink', 'xlink:type', n);
        break;
      case 'xmlBase':
        gl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', n);
        break;
      case 'xmlLang':
        gl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', n);
        break;
      case 'xmlSpace':
        gl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', n);
        break;
      case 'is':
        Xi(e, 'is', n);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < a.length) || (a[0] !== 'o' && a[0] !== 'O') || (a[1] !== 'n' && a[1] !== 'N')) &&
          ((a = Ag.get(a) || a), Xi(e, a, n));
    }
  }
  function Mu(e, t, a, n, s, u) {
    switch (a) {
      case 'style':
        xd(e, n, u);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(r(61));
          if (((a = n.__html), a != null)) {
            if (s.children != null) throw Error(r(60));
            e.innerHTML = a;
          }
        }
        break;
      case 'children':
        typeof n == 'string'
          ? $a(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && $a(e, '' + n);
        break;
      case 'onScroll':
        n != null && we('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && we('scrollend', e);
        break;
      case 'onClick':
        n != null && (e.onclick = kl);
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
        if (!_d.hasOwnProperty(a))
          e: {
            if (
              a[0] === 'o' &&
              a[1] === 'n' &&
              ((s = a.endsWith('Capture')),
              (t = a.slice(2, s ? a.length - 7 : void 0)),
              (u = e[St] || null),
              (u = u != null ? u[a] : null),
              typeof u == 'function' && e.removeEventListener(t, u, s),
              typeof n == 'function')
            ) {
              (typeof u != 'function' &&
                u !== null &&
                (a in e ? (e[a] = null) : e.hasAttribute(a) && e.removeAttribute(a)),
                e.addEventListener(t, n, s));
              break e;
            }
            a in e ? (e[a] = n) : n === !0 ? e.setAttribute(a, '') : Xi(e, a, n);
          }
    }
  }
  function kt(e, t, a) {
    switch (t) {
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
        (we('error', e), we('load', e));
        var n = !1,
          s = !1,
          u;
        for (u in a)
          if (a.hasOwnProperty(u)) {
            var m = a[u];
            if (m != null)
              switch (u) {
                case 'src':
                  n = !0;
                  break;
                case 'srcSet':
                  s = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(r(137, t));
                default:
                  Re(e, t, u, m, a, null);
              }
          }
        (s && Re(e, t, 'srcSet', a.srcSet, a, null), n && Re(e, t, 'src', a.src, a, null));
        return;
      case 'input':
        we('invalid', e);
        var g = (u = m = s = null),
          x = null,
          I = null;
        for (n in a)
          if (a.hasOwnProperty(n)) {
            var $ = a[n];
            if ($ != null)
              switch (n) {
                case 'name':
                  s = $;
                  break;
                case 'type':
                  m = $;
                  break;
                case 'checked':
                  x = $;
                  break;
                case 'defaultChecked':
                  I = $;
                  break;
                case 'value':
                  u = $;
                  break;
                case 'defaultValue':
                  g = $;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if ($ != null) throw Error(r(137, t));
                  break;
                default:
                  Re(e, t, n, $, a, null);
              }
          }
        kd(e, u, g, x, I, m, s, !1);
        return;
      case 'select':
        (we('invalid', e), (n = m = u = null));
        for (s in a)
          if (a.hasOwnProperty(s) && ((g = a[s]), g != null))
            switch (s) {
              case 'value':
                u = g;
                break;
              case 'defaultValue':
                m = g;
                break;
              case 'multiple':
                n = g;
              default:
                Re(e, t, s, g, a, null);
            }
        ((t = u),
          (a = m),
          (e.multiple = !!n),
          t != null ? Ga(e, !!n, t, !1) : a != null && Ga(e, !!n, a, !0));
        return;
      case 'textarea':
        (we('invalid', e), (u = s = n = null));
        for (m in a)
          if (a.hasOwnProperty(m) && ((g = a[m]), g != null))
            switch (m) {
              case 'value':
                n = g;
                break;
              case 'defaultValue':
                s = g;
                break;
              case 'children':
                u = g;
                break;
              case 'dangerouslySetInnerHTML':
                if (g != null) throw Error(r(91));
                break;
              default:
                Re(e, t, m, g, a, null);
            }
        yd(e, n, s, u);
        return;
      case 'option':
        for (x in a)
          if (a.hasOwnProperty(x) && ((n = a[x]), n != null))
            switch (x) {
              case 'selected':
                e.selected = n && typeof n != 'function' && typeof n != 'symbol';
                break;
              default:
                Re(e, t, x, n, a, null);
            }
        return;
      case 'dialog':
        (we('beforetoggle', e), we('toggle', e), we('cancel', e), we('close', e));
        break;
      case 'iframe':
      case 'object':
        we('load', e);
        break;
      case 'video':
      case 'audio':
        for (n = 0; n < ki.length; n++) we(ki[n], e);
        break;
      case 'image':
        (we('error', e), we('load', e));
        break;
      case 'details':
        we('toggle', e);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (we('error', e), we('load', e));
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
        for (I in a)
          if (a.hasOwnProperty(I) && ((n = a[I]), n != null))
            switch (I) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(r(137, t));
              default:
                Re(e, t, I, n, a, null);
            }
        return;
      default:
        if (Xr(t)) {
          for ($ in a)
            a.hasOwnProperty($) && ((n = a[$]), n !== void 0 && Mu(e, t, $, n, a, void 0));
          return;
        }
    }
    for (g in a) a.hasOwnProperty(g) && ((n = a[g]), n != null && Re(e, t, g, n, a, null));
  }
  function lv(e, t, a, n) {
    switch (t) {
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
        var s = null,
          u = null,
          m = null,
          g = null,
          x = null,
          I = null,
          $ = null;
        for (z in a) {
          var X = a[z];
          if (a.hasOwnProperty(z) && X != null)
            switch (z) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                x = X;
              default:
                n.hasOwnProperty(z) || Re(e, t, z, null, n, X);
            }
        }
        for (var D in n) {
          var z = n[D];
          if (((X = a[D]), n.hasOwnProperty(D) && (z != null || X != null)))
            switch (D) {
              case 'type':
                u = z;
                break;
              case 'name':
                s = z;
                break;
              case 'checked':
                I = z;
                break;
              case 'defaultChecked':
                $ = z;
                break;
              case 'value':
                m = z;
                break;
              case 'defaultValue':
                g = z;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (z != null) throw Error(r(137, t));
                break;
              default:
                z !== X && Re(e, t, D, z, n, X);
            }
        }
        $r(e, m, g, x, I, $, u, s);
        return;
      case 'select':
        z = m = g = D = null;
        for (u in a)
          if (((x = a[u]), a.hasOwnProperty(u) && x != null))
            switch (u) {
              case 'value':
                break;
              case 'multiple':
                z = x;
              default:
                n.hasOwnProperty(u) || Re(e, t, u, null, n, x);
            }
        for (s in n)
          if (((u = n[s]), (x = a[s]), n.hasOwnProperty(s) && (u != null || x != null)))
            switch (s) {
              case 'value':
                D = u;
                break;
              case 'defaultValue':
                g = u;
                break;
              case 'multiple':
                m = u;
              default:
                u !== x && Re(e, t, s, u, n, x);
            }
        ((t = g),
          (a = m),
          (n = z),
          D != null
            ? Ga(e, !!a, D, !1)
            : !!n != !!a && (t != null ? Ga(e, !!a, t, !0) : Ga(e, !!a, a ? [] : '', !1)));
        return;
      case 'textarea':
        z = D = null;
        for (g in a)
          if (((s = a[g]), a.hasOwnProperty(g) && s != null && !n.hasOwnProperty(g)))
            switch (g) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                Re(e, t, g, null, n, s);
            }
        for (m in n)
          if (((s = n[m]), (u = a[m]), n.hasOwnProperty(m) && (s != null || u != null)))
            switch (m) {
              case 'value':
                D = s;
                break;
              case 'defaultValue':
                z = s;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (s != null) throw Error(r(91));
                break;
              default:
                s !== u && Re(e, t, m, s, n, u);
            }
        vd(e, D, z);
        return;
      case 'option':
        for (var ae in a)
          if (((D = a[ae]), a.hasOwnProperty(ae) && D != null && !n.hasOwnProperty(ae)))
            switch (ae) {
              case 'selected':
                e.selected = !1;
                break;
              default:
                Re(e, t, ae, null, n, D);
            }
        for (x in n)
          if (((D = n[x]), (z = a[x]), n.hasOwnProperty(x) && D !== z && (D != null || z != null)))
            switch (x) {
              case 'selected':
                e.selected = D && typeof D != 'function' && typeof D != 'symbol';
                break;
              default:
                Re(e, t, x, D, n, z);
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
        for (var me in a)
          ((D = a[me]),
            a.hasOwnProperty(me) && D != null && !n.hasOwnProperty(me) && Re(e, t, me, null, n, D));
        for (I in n)
          if (((D = n[I]), (z = a[I]), n.hasOwnProperty(I) && D !== z && (D != null || z != null)))
            switch (I) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (D != null) throw Error(r(137, t));
                break;
              default:
                Re(e, t, I, D, n, z);
            }
        return;
      default:
        if (Xr(t)) {
          for (var ze in a)
            ((D = a[ze]),
              a.hasOwnProperty(ze) &&
                D !== void 0 &&
                !n.hasOwnProperty(ze) &&
                Mu(e, t, ze, void 0, n, D));
          for ($ in n)
            ((D = n[$]),
              (z = a[$]),
              !n.hasOwnProperty($) ||
                D === z ||
                (D === void 0 && z === void 0) ||
                Mu(e, t, $, D, n, z));
          return;
        }
    }
    for (var B in a)
      ((D = a[B]),
        a.hasOwnProperty(B) && D != null && !n.hasOwnProperty(B) && Re(e, t, B, null, n, D));
    for (X in n)
      ((D = n[X]),
        (z = a[X]),
        !n.hasOwnProperty(X) || D === z || (D == null && z == null) || Re(e, t, X, D, n, z));
  }
  function wf(e) {
    switch (e) {
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
  function av() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var e = 0, t = 0, a = performance.getEntriesByType('resource'), n = 0;
        n < a.length;
        n++
      ) {
        var s = a[n],
          u = s.transferSize,
          m = s.initiatorType,
          g = s.duration;
        if (u && g && wf(m)) {
          for (m = 0, g = s.responseEnd, n += 1; n < a.length; n++) {
            var x = a[n],
              I = x.startTime;
            if (I > g) break;
            var $ = x.transferSize,
              X = x.initiatorType;
            $ && wf(X) && ((x = x.responseEnd), (m += $ * (x < g ? 1 : (g - I) / (x - I))));
          }
          if ((--n, (t += (8 * (u + m)) / (s.duration / 1e3)), e++, 10 < e)) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && ((e = navigator.connection.downlink), typeof e == 'number')
      ? e
      : 5;
  }
  var Bu = null,
    qu = null;
  function $s(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Tf(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function Ef(e, t) {
    if (e === 0)
      switch (t) {
        case 'svg':
          return 1;
        case 'math':
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === 'foreignObject' ? 0 : e;
  }
  function Ou(e, t) {
    return (
      e === 'textarea' ||
      e === 'noscript' ||
      typeof t.children == 'string' ||
      typeof t.children == 'number' ||
      typeof t.children == 'bigint' ||
      (typeof t.dangerouslySetInnerHTML == 'object' &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Iu = null;
  function nv() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === Iu ? !1 : ((Iu = e), !0)) : ((Iu = null), !1);
  }
  var Cf = typeof setTimeout == 'function' ? setTimeout : void 0,
    iv = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Nf = typeof Promise == 'function' ? Promise : void 0,
    sv =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Nf < 'u'
          ? function (e) {
              return Nf.resolve(null).then(e).catch(rv);
            }
          : Cf;
  function rv(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function ra(e) {
    return e === 'head';
  }
  function Af(e, t) {
    var a = t,
      n = 0;
    do {
      var s = a.nextSibling;
      if ((e.removeChild(a), s && s.nodeType === 8))
        if (((a = s.data), a === '/$' || a === '/&')) {
          if (n === 0) {
            (e.removeChild(s), bn(t));
            return;
          }
          n--;
        } else if (a === '$' || a === '$?' || a === '$~' || a === '$!' || a === '&') n++;
        else if (a === 'html') yi(e.ownerDocument.documentElement);
        else if (a === 'head') {
          ((a = e.ownerDocument.head), yi(a));
          for (var u = a.firstChild; u; ) {
            var m = u.nextSibling,
              g = u.nodeName;
            (u[Rn] ||
              g === 'SCRIPT' ||
              g === 'STYLE' ||
              (g === 'LINK' && u.rel.toLowerCase() === 'stylesheet') ||
              a.removeChild(u),
              (u = m));
          }
        } else a === 'body' && yi(e.ownerDocument.body);
      a = s;
    } while (a);
    bn(t);
  }
  function Lf(e, t) {
    var a = e;
    e = 0;
    do {
      var n = a.nextSibling;
      if (
        (a.nodeType === 1
          ? t
            ? ((a._stashedDisplay = a.style.display), (a.style.display = 'none'))
            : ((a.style.display = a._stashedDisplay || ''),
              a.getAttribute('style') === '' && a.removeAttribute('style'))
          : a.nodeType === 3 &&
            (t
              ? ((a._stashedText = a.nodeValue), (a.nodeValue = ''))
              : (a.nodeValue = a._stashedText || '')),
        n && n.nodeType === 8)
      )
        if (((a = n.data), a === '/$')) {
          if (e === 0) break;
          e--;
        } else (a !== '$' && a !== '$?' && a !== '$~' && a !== '$!') || e++;
      a = n;
    } while (a);
  }
  function Du(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (((t = t.nextSibling), a.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (Du(a), Ur(a));
          continue;
        case 'SCRIPT':
        case 'STYLE':
          continue;
        case 'LINK':
          if (a.rel.toLowerCase() === 'stylesheet') continue;
      }
      e.removeChild(a);
    }
  }
  function ov(e, t, a, n) {
    for (; e.nodeType === 1; ) {
      var s = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!n && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (n) {
        if (!e[Rn])
          switch (t) {
            case 'meta':
              if (!e.hasAttribute('itemprop')) break;
              return e;
            case 'link':
              if (
                ((u = e.getAttribute('rel')),
                u === 'stylesheet' && e.hasAttribute('data-precedence'))
              )
                break;
              if (
                u !== s.rel ||
                e.getAttribute('href') !== (s.href == null || s.href === '' ? null : s.href) ||
                e.getAttribute('crossorigin') !== (s.crossOrigin == null ? null : s.crossOrigin) ||
                e.getAttribute('title') !== (s.title == null ? null : s.title)
              )
                break;
              return e;
            case 'style':
              if (e.hasAttribute('data-precedence')) break;
              return e;
            case 'script':
              if (
                ((u = e.getAttribute('src')),
                (u !== (s.src == null ? null : s.src) ||
                  e.getAttribute('type') !== (s.type == null ? null : s.type) ||
                  e.getAttribute('crossorigin') !==
                    (s.crossOrigin == null ? null : s.crossOrigin)) &&
                  u &&
                  e.hasAttribute('async') &&
                  !e.hasAttribute('itemprop'))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === 'input' && e.type === 'hidden') {
        var u = s.name == null ? null : '' + s.name;
        if (s.type === 'hidden' && e.getAttribute('name') === u) return e;
      } else return e;
      if (((e = Jt(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function uv(e, t, a) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !a) ||
        ((e = Jt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function jf(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = Jt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Ru(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function zu(e) {
    return e.data === '$!' || (e.data === '$?' && e.ownerDocument.readyState !== 'loading');
  }
  function cv(e, t) {
    var a = e.ownerDocument;
    if (e.data === '$~') e._reactRetry = t;
    else if (e.data !== '$?' || a.readyState !== 'loading') t();
    else {
      var n = function () {
        (t(), a.removeEventListener('DOMContentLoaded', n));
      };
      (a.addEventListener('DOMContentLoaded', n), (e._reactRetry = n));
    }
  }
  function Jt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === '$' ||
            t === '$!' ||
            t === '$?' ||
            t === '$~' ||
            t === '&' ||
            t === 'F!' ||
            t === 'F')
        )
          break;
        if (t === '/$' || t === '/&') return null;
      }
    }
    return e;
  }
  var Hu = null;
  function Mf(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === '/$' || a === '/&') {
          if (t === 0) return Jt(e.nextSibling);
          t--;
        } else (a !== '$' && a !== '$!' && a !== '$?' && a !== '$~' && a !== '&') || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Bf(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === '$' || a === '$!' || a === '$?' || a === '$~' || a === '&') {
          if (t === 0) return e;
          t--;
        } else (a !== '/$' && a !== '/&') || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function qf(e, t, a) {
    switch (((t = $s(a)), e)) {
      case 'html':
        if (((e = t.documentElement), !e)) throw Error(r(452));
        return e;
      case 'head':
        if (((e = t.head), !e)) throw Error(r(453));
        return e;
      case 'body':
        if (((e = t.body), !e)) throw Error(r(454));
        return e;
      default:
        throw Error(r(451));
    }
  }
  function yi(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    Ur(e);
  }
  var Pt = new Map(),
    Of = new Set();
  function Ys(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var ql = Q.d;
  Q.d = { f: dv, r: mv, D: _v, C: fv, L: pv, m: hv, X: kv, S: gv, M: vv };
  function dv() {
    var e = ql.f(),
      t = Os();
    return e || t;
  }
  function mv(e) {
    var t = za(e);
    t !== null && t.tag === 5 && t.type === 'form' ? Pm(t) : ql.r(e);
  }
  var kn = typeof document > 'u' ? null : document;
  function If(e, t, a) {
    var n = kn;
    if (n && typeof t == 'string' && t) {
      var s = $t(t);
      ((s = 'link[rel="' + e + '"][href="' + s + '"]'),
        typeof a == 'string' && (s += '[crossorigin="' + a + '"]'),
        Of.has(s) ||
          (Of.add(s),
          (e = { rel: e, crossOrigin: a, href: t }),
          n.querySelector(s) === null &&
            ((t = n.createElement('link')), kt(t, 'link', e), ct(t), n.head.appendChild(t))));
    }
  }
  function _v(e) {
    (ql.D(e), If('dns-prefetch', e, null));
  }
  function fv(e, t) {
    (ql.C(e, t), If('preconnect', e, t));
  }
  function pv(e, t, a) {
    ql.L(e, t, a);
    var n = kn;
    if (n && e && t) {
      var s = 'link[rel="preload"][as="' + $t(t) + '"]';
      t === 'image' && a && a.imageSrcSet
        ? ((s += '[imagesrcset="' + $t(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == 'string' && (s += '[imagesizes="' + $t(a.imageSizes) + '"]'))
        : (s += '[href="' + $t(e) + '"]');
      var u = s;
      switch (t) {
        case 'style':
          u = vn(e);
          break;
        case 'script':
          u = yn(e);
      }
      Pt.has(u) ||
        ((e = y(
          { rel: 'preload', href: t === 'image' && a && a.imageSrcSet ? void 0 : e, as: t },
          a
        )),
        Pt.set(u, e),
        n.querySelector(s) !== null ||
          (t === 'style' && n.querySelector(bi(u))) ||
          (t === 'script' && n.querySelector(xi(u))) ||
          ((t = n.createElement('link')), kt(t, 'link', e), ct(t), n.head.appendChild(t)));
    }
  }
  function hv(e, t) {
    ql.m(e, t);
    var a = kn;
    if (a && e) {
      var n = t && typeof t.as == 'string' ? t.as : 'script',
        s = 'link[rel="modulepreload"][as="' + $t(n) + '"][href="' + $t(e) + '"]',
        u = s;
      switch (n) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          u = yn(e);
      }
      if (
        !Pt.has(u) &&
        ((e = y({ rel: 'modulepreload', href: e }, t)), Pt.set(u, e), a.querySelector(s) === null)
      ) {
        switch (n) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (a.querySelector(xi(u))) return;
        }
        ((n = a.createElement('link')), kt(n, 'link', e), ct(n), a.head.appendChild(n));
      }
    }
  }
  function gv(e, t, a) {
    ql.S(e, t, a);
    var n = kn;
    if (n && e) {
      var s = Ha(n).hoistableStyles,
        u = vn(e);
      t = t || 'default';
      var m = s.get(u);
      if (!m) {
        var g = { loading: 0, preload: null };
        if ((m = n.querySelector(bi(u)))) g.loading = 5;
        else {
          ((e = y({ rel: 'stylesheet', href: e, 'data-precedence': t }, a)),
            (a = Pt.get(u)) && Uu(e, a));
          var x = (m = n.createElement('link'));
          (ct(x),
            kt(x, 'link', e),
            (x._p = new Promise(function (I, $) {
              ((x.onload = I), (x.onerror = $));
            })),
            x.addEventListener('load', function () {
              g.loading |= 1;
            }),
            x.addEventListener('error', function () {
              g.loading |= 2;
            }),
            (g.loading |= 4),
            Xs(m, t, n));
        }
        ((m = { type: 'stylesheet', instance: m, count: 1, state: g }), s.set(u, m));
      }
    }
  }
  function kv(e, t) {
    ql.X(e, t);
    var a = kn;
    if (a && e) {
      var n = Ha(a).hoistableScripts,
        s = yn(e),
        u = n.get(s);
      u ||
        ((u = a.querySelector(xi(s))),
        u ||
          ((e = y({ src: e, async: !0 }, t)),
          (t = Pt.get(s)) && Gu(e, t),
          (u = a.createElement('script')),
          ct(u),
          kt(u, 'link', e),
          a.head.appendChild(u)),
        (u = { type: 'script', instance: u, count: 1, state: null }),
        n.set(s, u));
    }
  }
  function vv(e, t) {
    ql.M(e, t);
    var a = kn;
    if (a && e) {
      var n = Ha(a).hoistableScripts,
        s = yn(e),
        u = n.get(s);
      u ||
        ((u = a.querySelector(xi(s))),
        u ||
          ((e = y({ src: e, async: !0, type: 'module' }, t)),
          (t = Pt.get(s)) && Gu(e, t),
          (u = a.createElement('script')),
          ct(u),
          kt(u, 'link', e),
          a.head.appendChild(u)),
        (u = { type: 'script', instance: u, count: 1, state: null }),
        n.set(s, u));
    }
  }
  function Df(e, t, a, n) {
    var s = (s = ce.current) ? Ys(s) : null;
    if (!s) throw Error(r(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof a.precedence == 'string' && typeof a.href == 'string'
          ? ((t = vn(a.href)),
            (a = Ha(s).hoistableStyles),
            (n = a.get(t)),
            n || ((n = { type: 'style', instance: null, count: 0, state: null }), a.set(t, n)),
            n)
          : { type: 'void', instance: null, count: 0, state: null };
      case 'link':
        if (
          a.rel === 'stylesheet' &&
          typeof a.href == 'string' &&
          typeof a.precedence == 'string'
        ) {
          e = vn(a.href);
          var u = Ha(s).hoistableStyles,
            m = u.get(e);
          if (
            (m ||
              ((s = s.ownerDocument || s),
              (m = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              u.set(e, m),
              (u = s.querySelector(bi(e))) && !u._p && ((m.instance = u), (m.state.loading = 5)),
              Pt.has(e) ||
                ((a = {
                  rel: 'preload',
                  as: 'style',
                  href: a.href,
                  crossOrigin: a.crossOrigin,
                  integrity: a.integrity,
                  media: a.media,
                  hrefLang: a.hrefLang,
                  referrerPolicy: a.referrerPolicy,
                }),
                Pt.set(e, a),
                u || yv(s, e, a, m.state))),
            t && n === null)
          )
            throw Error(r(528, ''));
          return m;
        }
        if (t && n !== null) throw Error(r(529, ''));
        return null;
      case 'script':
        return (
          (t = a.async),
          (a = a.src),
          typeof a == 'string' && t && typeof t != 'function' && typeof t != 'symbol'
            ? ((t = yn(a)),
              (a = Ha(s).hoistableScripts),
              (n = a.get(t)),
              n || ((n = { type: 'script', instance: null, count: 0, state: null }), a.set(t, n)),
              n)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(r(444, e));
    }
  }
  function vn(e) {
    return 'href="' + $t(e) + '"';
  }
  function bi(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function Rf(e) {
    return y({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function yv(e, t, a, n) {
    e.querySelector('link[rel="preload"][as="style"][' + t + ']')
      ? (n.loading = 1)
      : ((t = e.createElement('link')),
        (n.preload = t),
        t.addEventListener('load', function () {
          return (n.loading |= 1);
        }),
        t.addEventListener('error', function () {
          return (n.loading |= 2);
        }),
        kt(t, 'link', a),
        ct(t),
        e.head.appendChild(t));
  }
  function yn(e) {
    return '[src="' + $t(e) + '"]';
  }
  function xi(e) {
    return 'script[async]' + e;
  }
  function zf(e, t, a) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var n = e.querySelector('style[data-href~="' + $t(a.href) + '"]');
          if (n) return ((t.instance = n), ct(n), n);
          var s = y({}, a, {
            'data-href': a.href,
            'data-precedence': a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (n = (e.ownerDocument || e).createElement('style')),
            ct(n),
            kt(n, 'style', s),
            Xs(n, a.precedence, e),
            (t.instance = n)
          );
        case 'stylesheet':
          s = vn(a.href);
          var u = e.querySelector(bi(s));
          if (u) return ((t.state.loading |= 4), (t.instance = u), ct(u), u);
          ((n = Rf(a)),
            (s = Pt.get(s)) && Uu(n, s),
            (u = (e.ownerDocument || e).createElement('link')),
            ct(u));
          var m = u;
          return (
            (m._p = new Promise(function (g, x) {
              ((m.onload = g), (m.onerror = x));
            })),
            kt(u, 'link', n),
            (t.state.loading |= 4),
            Xs(u, a.precedence, e),
            (t.instance = u)
          );
        case 'script':
          return (
            (u = yn(a.src)),
            (s = e.querySelector(xi(u)))
              ? ((t.instance = s), ct(s), s)
              : ((n = a),
                (s = Pt.get(u)) && ((n = y({}, a)), Gu(n, s)),
                (e = e.ownerDocument || e),
                (s = e.createElement('script')),
                ct(s),
                kt(s, 'link', n),
                e.head.appendChild(s),
                (t.instance = s))
          );
        case 'void':
          return null;
        default:
          throw Error(r(443, t.type));
      }
    else
      t.type === 'stylesheet' &&
        (t.state.loading & 4) === 0 &&
        ((n = t.instance), (t.state.loading |= 4), Xs(n, a.precedence, e));
    return t.instance;
  }
  function Xs(e, t, a) {
    for (
      var n = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        s = n.length ? n[n.length - 1] : null,
        u = s,
        m = 0;
      m < n.length;
      m++
    ) {
      var g = n[m];
      if (g.dataset.precedence === t) u = g;
      else if (u !== s) break;
    }
    u
      ? u.parentNode.insertBefore(e, u.nextSibling)
      : ((t = a.nodeType === 9 ? a.head : a), t.insertBefore(e, t.firstChild));
  }
  function Uu(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function Gu(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var Vs = null;
  function Hf(e, t, a) {
    if (Vs === null) {
      var n = new Map(),
        s = (Vs = new Map());
      s.set(a, n);
    } else ((s = Vs), (n = s.get(a)), n || ((n = new Map()), s.set(a, n)));
    if (n.has(e)) return n;
    for (n.set(e, null), a = a.getElementsByTagName(e), s = 0; s < a.length; s++) {
      var u = a[s];
      if (
        !(u[Rn] || u[ft] || (e === 'link' && u.getAttribute('rel') === 'stylesheet')) &&
        u.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var m = u.getAttribute(t) || '';
        m = e + m;
        var g = n.get(m);
        g ? g.push(u) : n.set(m, [u]);
      }
    }
    return n;
  }
  function Uf(e, t, a) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(a, t === 'title' ? e.querySelector('head > title') : null));
  }
  function bv(e, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
    switch (e) {
      case 'meta':
      case 'title':
        return !0;
      case 'style':
        if (typeof t.precedence != 'string' || typeof t.href != 'string' || t.href === '') break;
        return !0;
      case 'link':
        if (
          typeof t.rel != 'string' ||
          typeof t.href != 'string' ||
          t.href === '' ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case 'stylesheet':
            return ((e = t.disabled), typeof t.precedence == 'string' && e == null);
          default:
            return !0;
        }
      case 'script':
        if (
          t.async &&
          typeof t.async != 'function' &&
          typeof t.async != 'symbol' &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == 'string'
        )
          return !0;
    }
    return !1;
  }
  function Gf(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  function xv(e, t, a, n) {
    if (
      a.type === 'stylesheet' &&
      (typeof n.media != 'string' || matchMedia(n.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var s = vn(n.href),
          u = t.querySelector(bi(s));
        if (u) {
          ((t = u._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = Qs.bind(e)), t.then(e, e)),
            (a.state.loading |= 4),
            (a.instance = u),
            ct(u));
          return;
        }
        ((u = t.ownerDocument || t),
          (n = Rf(n)),
          (s = Pt.get(s)) && Uu(n, s),
          (u = u.createElement('link')),
          ct(u));
        var m = u;
        ((m._p = new Promise(function (g, x) {
          ((m.onload = g), (m.onerror = x));
        })),
          kt(u, 'link', n),
          (a.instance = u));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(a, t),
        (t = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (e.count++,
          (a = Qs.bind(e)),
          t.addEventListener('load', a),
          t.addEventListener('error', a)));
    }
  }
  var $u = 0;
  function Sv(e, t) {
    return (
      e.stylesheets && e.count === 0 && Zs(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (a) {
            var n = setTimeout(function () {
              if ((e.stylesheets && Zs(e, e.stylesheets), e.unsuspend)) {
                var u = e.unsuspend;
                ((e.unsuspend = null), u());
              }
            }, 6e4 + t);
            0 < e.imgBytes && $u === 0 && ($u = 62500 * av());
            var s = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 && (e.stylesheets && Zs(e, e.stylesheets), e.unsuspend))
                ) {
                  var u = e.unsuspend;
                  ((e.unsuspend = null), u());
                }
              },
              (e.imgBytes > $u ? 50 : 800) + t
            );
            return (
              (e.unsuspend = a),
              function () {
                ((e.unsuspend = null), clearTimeout(n), clearTimeout(s));
              }
            );
          }
        : null
    );
  }
  function Qs() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) Zs(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var Ks = null;
  function Zs(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++, (Ks = new Map()), t.forEach(wv, e), (Ks = null), Qs.call(e)));
  }
  function wv(e, t) {
    if (!(t.state.loading & 4)) {
      var a = Ks.get(e);
      if (a) var n = a.get(null);
      else {
        ((a = new Map()), Ks.set(e, a));
        for (
          var s = e.querySelectorAll('link[data-precedence],style[data-precedence]'), u = 0;
          u < s.length;
          u++
        ) {
          var m = s[u];
          (m.nodeName === 'LINK' || m.getAttribute('media') !== 'not all') &&
            (a.set(m.dataset.precedence, m), (n = m));
        }
        n && a.set(null, n);
      }
      ((s = t.instance),
        (m = s.getAttribute('data-precedence')),
        (u = a.get(m) || n),
        u === n && a.set(null, s),
        a.set(m, s),
        this.count++,
        (n = Qs.bind(this)),
        s.addEventListener('load', n),
        s.addEventListener('error', n),
        u
          ? u.parentNode.insertBefore(s, u.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(s, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var Si = {
    $$typeof: M,
    Provider: null,
    Consumer: null,
    _currentValue: U,
    _currentValue2: U,
    _threadCount: 0,
  };
  function Tv(e, t, a, n, s, u, m, g, x) {
    ((this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Dr(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Dr(0)),
      (this.hiddenUpdates = Dr(null)),
      (this.identifierPrefix = n),
      (this.onUncaughtError = s),
      (this.onCaughtError = u),
      (this.onRecoverableError = m),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = x),
      (this.incompleteTransitions = new Map()));
  }
  function $f(e, t, a, n, s, u, m, g, x, I, $, X) {
    return (
      (e = new Tv(e, t, a, m, x, I, $, X, g)),
      (t = 1),
      u === !0 && (t |= 24),
      (u = qt(3, null, null, t)),
      (e.current = u),
      (u.stateNode = e),
      (t = xo()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (u.memoizedState = { element: n, isDehydrated: a, cache: t }),
      Eo(u),
      e
    );
  }
  function Yf(e) {
    return e ? ((e = Ja), e) : Ja;
  }
  function Xf(e, t, a, n, s, u) {
    ((s = Yf(s)),
      n.context === null ? (n.context = s) : (n.pendingContext = s),
      (n = Jl(t)),
      (n.payload = { element: a }),
      (u = u === void 0 ? null : u),
      u !== null && (n.callback = u),
      (a = Pl(e, n, t)),
      a !== null && (At(a, e, t), ti(a, e, t)));
  }
  function Vf(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function Yu(e, t) {
    (Vf(e, t), (e = e.alternate) && Vf(e, t));
  }
  function Qf(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = ya(e, 67108864);
      (t !== null && At(t, e, 67108864), Yu(e, 67108864));
    }
  }
  function Kf(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = zt();
      t = Rr(t);
      var a = ya(e, t);
      (a !== null && At(a, e, t), Yu(e, t));
    }
  }
  var Js = !0;
  function Ev(e, t, a, n) {
    var s = j.T;
    j.T = null;
    var u = Q.p;
    try {
      ((Q.p = 2), Xu(e, t, a, n));
    } finally {
      ((Q.p = u), (j.T = s));
    }
  }
  function Cv(e, t, a, n) {
    var s = j.T;
    j.T = null;
    var u = Q.p;
    try {
      ((Q.p = 8), Xu(e, t, a, n));
    } finally {
      ((Q.p = u), (j.T = s));
    }
  }
  function Xu(e, t, a, n) {
    if (Js) {
      var s = Vu(n);
      if (s === null) (ju(e, t, n, Ps, a), Jf(e, n));
      else if (Av(s, e, t, a, n)) n.stopPropagation();
      else if ((Jf(e, n), t & 4 && -1 < Nv.indexOf(e))) {
        for (; s !== null; ) {
          var u = za(s);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (((u = u.stateNode), u.current.memoizedState.isDehydrated)) {
                  var m = pa(u.pendingLanes);
                  if (m !== 0) {
                    var g = u;
                    for (g.pendingLanes |= 2, g.entangledLanes |= 2; m; ) {
                      var x = 1 << (31 - Mt(m));
                      ((g.entanglements[1] |= x), (m &= ~x));
                    }
                    (fl(u), (Me & 6) === 0 && ((Bs = Lt() + 500), gi(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((g = ya(u, 2)), g !== null && At(g, u, 2), Os(), Yu(u, 2));
            }
          if (((u = Vu(n)), u === null && ju(e, t, n, Ps, a), u === s)) break;
          s = u;
        }
        s !== null && n.stopPropagation();
      } else ju(e, t, n, null, a);
    }
  }
  function Vu(e) {
    return ((e = Qr(e)), Qu(e));
  }
  var Ps = null;
  function Qu(e) {
    if (((Ps = null), (e = Ra(e)), e !== null)) {
      var t = d(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (((e = _(t)), e !== null)) return e;
          e = null;
        } else if (a === 31) {
          if (((e = h(t)), e !== null)) return e;
          e = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ((Ps = e), null);
  }
  function Zf(e) {
    switch (e) {
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
        switch (_g()) {
          case ld:
            return 2;
          case ad:
            return 8;
          case Hi:
          case fg:
            return 32;
          case nd:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Ku = !1,
    oa = null,
    ua = null,
    ca = null,
    wi = new Map(),
    Ti = new Map(),
    da = [],
    Nv =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function Jf(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        oa = null;
        break;
      case 'dragenter':
      case 'dragleave':
        ua = null;
        break;
      case 'mouseover':
      case 'mouseout':
        ca = null;
        break;
      case 'pointerover':
      case 'pointerout':
        wi.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        Ti.delete(t.pointerId);
    }
  }
  function Ei(e, t, a, n, s, u) {
    return e === null || e.nativeEvent !== u
      ? ((e = {
          blockedOn: t,
          domEventName: a,
          eventSystemFlags: n,
          nativeEvent: u,
          targetContainers: [s],
        }),
        t !== null && ((t = za(t)), t !== null && Qf(t)),
        e)
      : ((e.eventSystemFlags |= n),
        (t = e.targetContainers),
        s !== null && t.indexOf(s) === -1 && t.push(s),
        e);
  }
  function Av(e, t, a, n, s) {
    switch (t) {
      case 'focusin':
        return ((oa = Ei(oa, e, t, a, n, s)), !0);
      case 'dragenter':
        return ((ua = Ei(ua, e, t, a, n, s)), !0);
      case 'mouseover':
        return ((ca = Ei(ca, e, t, a, n, s)), !0);
      case 'pointerover':
        var u = s.pointerId;
        return (wi.set(u, Ei(wi.get(u) || null, e, t, a, n, s)), !0);
      case 'gotpointercapture':
        return ((u = s.pointerId), Ti.set(u, Ei(Ti.get(u) || null, e, t, a, n, s)), !0);
    }
    return !1;
  }
  function Pf(e) {
    var t = Ra(e.target);
    if (t !== null) {
      var a = d(t);
      if (a !== null) {
        if (((t = a.tag), t === 13)) {
          if (((t = _(a)), t !== null)) {
            ((e.blockedOn = t),
              cd(e.priority, function () {
                Kf(a);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = h(a)), t !== null)) {
            ((e.blockedOn = t),
              cd(e.priority, function () {
                Kf(a);
              }));
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Ws(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = Vu(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var n = new a.constructor(a.type, a);
        ((Vr = n), a.target.dispatchEvent(n), (Vr = null));
      } else return ((t = za(a)), t !== null && Qf(t), (e.blockedOn = a), !1);
      t.shift();
    }
    return !0;
  }
  function Wf(e, t, a) {
    Ws(e) && a.delete(t);
  }
  function Lv() {
    ((Ku = !1),
      oa !== null && Ws(oa) && (oa = null),
      ua !== null && Ws(ua) && (ua = null),
      ca !== null && Ws(ca) && (ca = null),
      wi.forEach(Wf),
      Ti.forEach(Wf));
  }
  function Fs(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Ku || ((Ku = !0), l.unstable_scheduleCallback(l.unstable_NormalPriority, Lv)));
  }
  var er = null;
  function Ff(e) {
    er !== e &&
      ((er = e),
      l.unstable_scheduleCallback(l.unstable_NormalPriority, function () {
        er === e && (er = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t],
            n = e[t + 1],
            s = e[t + 2];
          if (typeof n != 'function') {
            if (Qu(n || a) === null) continue;
            break;
          }
          var u = za(a);
          u !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Vo(u, { pending: !0, data: s, method: a.method, action: n }, n, s));
        }
      }));
  }
  function bn(e) {
    function t(x) {
      return Fs(x, e);
    }
    (oa !== null && Fs(oa, e),
      ua !== null && Fs(ua, e),
      ca !== null && Fs(ca, e),
      wi.forEach(t),
      Ti.forEach(t));
    for (var a = 0; a < da.length; a++) {
      var n = da[a];
      n.blockedOn === e && (n.blockedOn = null);
    }
    for (; 0 < da.length && ((a = da[0]), a.blockedOn === null); )
      (Pf(a), a.blockedOn === null && da.shift());
    if (((a = (e.ownerDocument || e).$$reactFormReplay), a != null))
      for (n = 0; n < a.length; n += 3) {
        var s = a[n],
          u = a[n + 1],
          m = s[St] || null;
        if (typeof u == 'function') m || Ff(a);
        else if (m) {
          var g = null;
          if (u && u.hasAttribute('formAction')) {
            if (((s = u), (m = u[St] || null))) g = m.formAction;
            else if (Qu(s) !== null) continue;
          } else g = m.action;
          (typeof g == 'function' ? (a[n + 1] = g) : (a.splice(n, 3), (n -= 3)), Ff(a));
        }
      }
  }
  function ep() {
    function e(u) {
      u.canIntercept &&
        u.info === 'react-transition' &&
        u.intercept({
          handler: function () {
            return new Promise(function (m) {
              return (s = m);
            });
          },
          focusReset: 'manual',
          scroll: 'manual',
        });
    }
    function t() {
      (s !== null && (s(), (s = null)), n || setTimeout(a, 20));
    }
    function a() {
      if (!n && !navigation.transition) {
        var u = navigation.currentEntry;
        u &&
          u.url != null &&
          navigation.navigate(u.url, {
            state: u.getState(),
            info: 'react-transition',
            history: 'replace',
          });
      }
    }
    if (typeof navigation == 'object') {
      var n = !1,
        s = null;
      return (
        navigation.addEventListener('navigate', e),
        navigation.addEventListener('navigatesuccess', t),
        navigation.addEventListener('navigateerror', t),
        setTimeout(a, 100),
        function () {
          ((n = !0),
            navigation.removeEventListener('navigate', e),
            navigation.removeEventListener('navigatesuccess', t),
            navigation.removeEventListener('navigateerror', t),
            s !== null && (s(), (s = null)));
        }
      );
    }
  }
  function Zu(e) {
    this._internalRoot = e;
  }
  ((tr.prototype.render = Zu.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(r(409));
      var a = t.current,
        n = zt();
      Xf(a, n, e, t, null, null);
    }),
    (tr.prototype.unmount = Zu.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (Xf(e.current, 2, null, e, null, null), Os(), (t[Da] = null));
        }
      }));
  function tr(e) {
    this._internalRoot = e;
  }
  tr.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = ud();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < da.length && t !== 0 && t < da[a].priority; a++);
      (da.splice(a, 0, e), a === 0 && Pf(e));
    }
  };
  var tp = i.version;
  if (tp !== '19.2.5') throw Error(r(527, tp, '19.2.5'));
  Q.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(r(188))
        : ((e = Object.keys(e).join(',')), Error(r(268, e)));
    return ((e = p(t)), (e = e !== null ? v(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var jv = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: j,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var lr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!lr.isDisabled && lr.supportsFiber)
      try {
        ((On = lr.inject(jv)), (jt = lr));
      } catch {}
  }
  return (
    (Ni.createRoot = function (e, t) {
      if (!c(e)) throw Error(r(299));
      var a = !1,
        n = '',
        s = r_,
        u = o_,
        m = u_;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (s = t.onUncaughtError),
          t.onCaughtError !== void 0 && (u = t.onCaughtError),
          t.onRecoverableError !== void 0 && (m = t.onRecoverableError)),
        (t = $f(e, 1, !1, null, null, a, n, null, s, u, m, ep)),
        (e[Da] = t.current),
        Lu(e),
        new Zu(t)
      );
    }),
    (Ni.hydrateRoot = function (e, t, a) {
      if (!c(e)) throw Error(r(299));
      var n = !1,
        s = '',
        u = r_,
        m = o_,
        g = u_,
        x = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (n = !0),
          a.identifierPrefix !== void 0 && (s = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (u = a.onUncaughtError),
          a.onCaughtError !== void 0 && (m = a.onCaughtError),
          a.onRecoverableError !== void 0 && (g = a.onRecoverableError),
          a.formState !== void 0 && (x = a.formState)),
        (t = $f(e, 1, !0, t, a ?? null, n, s, x, u, m, g, ep)),
        (t.context = Yf(null)),
        (a = t.current),
        (n = zt()),
        (n = Rr(n)),
        (s = Jl(n)),
        (s.callback = null),
        Pl(a, s, n),
        (a = n),
        (t.current.lanes = a),
        Dn(t, a),
        fl(t),
        (e[Da] = t.current),
        Lu(e),
        new tr(t)
      );
    }),
    (Ni.version = '19.2.5'),
    Ni
  );
}
var dp;
function $v() {
  if (dp) return Wu.exports;
  dp = 1;
  function l() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (i) {
        console.error(i);
      }
  }
  return (l(), (Wu.exports = Gv()), Wu.exports);
}
var Yv = $v(),
  E = Bc();
/**
 * react-router v7.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var mp = 'popstate';
function _p(l) {
  return (
    typeof l == 'object' &&
    l != null &&
    'pathname' in l &&
    'search' in l &&
    'hash' in l &&
    'state' in l &&
    'key' in l
  );
}
function Xv(l = {}) {
  function i(r, c) {
    var p;
    let d = (p = c.state) == null ? void 0 : p.masked,
      { pathname: _, search: h, hash: k } = d || r.location;
    return vc(
      '',
      { pathname: _, search: h, hash: k },
      (c.state && c.state.usr) || null,
      (c.state && c.state.key) || 'default',
      d
        ? { pathname: r.location.pathname, search: r.location.search, hash: r.location.hash }
        : void 0
    );
  }
  function o(r, c) {
    return typeof c == 'string' ? c : Oi(c);
  }
  return Qv(i, o, null, l);
}
function Ke(l, i) {
  if (l === !1 || l === null || typeof l > 'u') throw new Error(i);
}
function sl(l, i) {
  if (!l) {
    typeof console < 'u' && console.warn(i);
    try {
      throw new Error(i);
    } catch {}
  }
}
function Vv() {
  return Math.random().toString(36).substring(2, 10);
}
function fp(l, i) {
  return {
    usr: l.state,
    key: l.key,
    idx: i,
    masked: l.unstable_mask ? { pathname: l.pathname, search: l.search, hash: l.hash } : void 0,
  };
}
function vc(l, i, o = null, r, c) {
  return {
    pathname: typeof l == 'string' ? l : l.pathname,
    search: '',
    hash: '',
    ...(typeof i == 'string' ? Ln(i) : i),
    state: o,
    key: (i && i.key) || r || Vv(),
    unstable_mask: c,
  };
}
function Oi({ pathname: l = '/', search: i = '', hash: o = '' }) {
  return (
    i && i !== '?' && (l += i.charAt(0) === '?' ? i : '?' + i),
    o && o !== '#' && (l += o.charAt(0) === '#' ? o : '#' + o),
    l
  );
}
function Ln(l) {
  let i = {};
  if (l) {
    let o = l.indexOf('#');
    o >= 0 && ((i.hash = l.substring(o)), (l = l.substring(0, o)));
    let r = l.indexOf('?');
    (r >= 0 && ((i.search = l.substring(r)), (l = l.substring(0, r))), l && (i.pathname = l));
  }
  return i;
}
function Qv(l, i, o, r = {}) {
  let { window: c = document.defaultView, v5Compat: d = !1 } = r,
    _ = c.history,
    h = 'POP',
    k = null,
    p = v();
  p == null && ((p = 0), _.replaceState({ ..._.state, idx: p }, ''));
  function v() {
    return (_.state || { idx: null }).idx;
  }
  function y() {
    h = 'POP';
    let C = v(),
      T = C == null ? null : C - p;
    ((p = C), k && k({ action: h, location: L.location, delta: T }));
  }
  function S(C, T) {
    h = 'PUSH';
    let A = _p(C) ? C : vc(L.location, C, T);
    p = v() + 1;
    let M = fp(A, p),
      P = L.createHref(A.unstable_mask || A);
    try {
      _.pushState(M, '', P);
    } catch (J) {
      if (J instanceof DOMException && J.name === 'DataCloneError') throw J;
      c.location.assign(P);
    }
    d && k && k({ action: h, location: L.location, delta: 1 });
  }
  function q(C, T) {
    h = 'REPLACE';
    let A = _p(C) ? C : vc(L.location, C, T);
    p = v();
    let M = fp(A, p),
      P = L.createHref(A.unstable_mask || A);
    (_.replaceState(M, '', P), d && k && k({ action: h, location: L.location, delta: 0 }));
  }
  function b(C) {
    return Kv(C);
  }
  let L = {
    get action() {
      return h;
    },
    get location() {
      return l(c, _);
    },
    listen(C) {
      if (k) throw new Error('A history only accepts one active listener');
      return (
        c.addEventListener(mp, y),
        (k = C),
        () => {
          (c.removeEventListener(mp, y), (k = null));
        }
      );
    },
    createHref(C) {
      return i(c, C);
    },
    createURL: b,
    encodeLocation(C) {
      let T = b(C);
      return { pathname: T.pathname, search: T.search, hash: T.hash };
    },
    push: S,
    replace: q,
    go(C) {
      return _.go(C);
    },
  };
  return L;
}
function Kv(l, i = !1) {
  let o = 'http://localhost';
  (typeof window < 'u' &&
    (o = window.location.origin !== 'null' ? window.location.origin : window.location.href),
    Ke(o, 'No window.location.(origin|href) available to create URL'));
  let r = typeof l == 'string' ? l : Oi(l);
  return ((r = r.replace(/ $/, '%20')), !i && r.startsWith('//') && (r = o + r), new URL(r, o));
}
function Yp(l, i, o = '/') {
  return Zv(l, i, o, !1);
}
function Zv(l, i, o, r) {
  let c = typeof i == 'string' ? Ln(i) : i,
    d = Hl(c.pathname || '/', o);
  if (d == null) return null;
  let _ = Xp(l);
  Jv(_);
  let h = null;
  for (let k = 0; h == null && k < _.length; ++k) {
    let p = r0(d);
    h = i0(_[k], p, r);
  }
  return h;
}
function Xp(l, i = [], o = [], r = '', c = !1) {
  let d = (_, h, k = c, p) => {
    let v = {
      relativePath: p === void 0 ? _.path || '' : p,
      caseSensitive: _.caseSensitive === !0,
      childrenIndex: h,
      route: _,
    };
    if (v.relativePath.startsWith('/')) {
      if (!v.relativePath.startsWith(r) && k) return;
      (Ke(
        v.relativePath.startsWith(r),
        `Absolute route path "${v.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (v.relativePath = v.relativePath.slice(r.length)));
    }
    let y = il([r, v.relativePath]),
      S = o.concat(v);
    (_.children &&
      _.children.length > 0 &&
      (Ke(
        _.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${y}".`
      ),
      Xp(_.children, i, S, y, k)),
      !(_.path == null && !_.index) && i.push({ path: y, score: a0(y, _.index), routesMeta: S }));
  };
  return (
    l.forEach((_, h) => {
      var k;
      if (_.path === '' || !((k = _.path) != null && k.includes('?'))) d(_, h);
      else for (let p of Vp(_.path)) d(_, h, !0, p);
    }),
    i
  );
}
function Vp(l) {
  let i = l.split('/');
  if (i.length === 0) return [];
  let [o, ...r] = i,
    c = o.endsWith('?'),
    d = o.replace(/\?$/, '');
  if (r.length === 0) return c ? [d, ''] : [d];
  let _ = Vp(r.join('/')),
    h = [];
  return (
    h.push(..._.map((k) => (k === '' ? d : [d, k].join('/')))),
    c && h.push(..._),
    h.map((k) => (l.startsWith('/') && k === '' ? '/' : k))
  );
}
function Jv(l) {
  l.sort((i, o) =>
    i.score !== o.score
      ? o.score - i.score
      : n0(
          i.routesMeta.map((r) => r.childrenIndex),
          o.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
var Pv = /^:[\w-]+$/,
  Wv = 3,
  Fv = 2,
  e0 = 1,
  t0 = 10,
  l0 = -2,
  pp = (l) => l === '*';
function a0(l, i) {
  let o = l.split('/'),
    r = o.length;
  return (
    o.some(pp) && (r += l0),
    i && (r += Fv),
    o.filter((c) => !pp(c)).reduce((c, d) => c + (Pv.test(d) ? Wv : d === '' ? e0 : t0), r)
  );
}
function n0(l, i) {
  return l.length === i.length && l.slice(0, -1).every((r, c) => r === i[c])
    ? l[l.length - 1] - i[i.length - 1]
    : 0;
}
function i0(l, i, o = !1) {
  let { routesMeta: r } = l,
    c = {},
    d = '/',
    _ = [];
  for (let h = 0; h < r.length; ++h) {
    let k = r[h],
      p = h === r.length - 1,
      v = d === '/' ? i : i.slice(d.length) || '/',
      y = fr({ path: k.relativePath, caseSensitive: k.caseSensitive, end: p }, v),
      S = k.route;
    if (
      (!y &&
        p &&
        o &&
        !r[r.length - 1].route.index &&
        (y = fr({ path: k.relativePath, caseSensitive: k.caseSensitive, end: !1 }, v)),
      !y)
    )
      return null;
    (Object.assign(c, y.params),
      _.push({
        params: c,
        pathname: il([d, y.pathname]),
        pathnameBase: d0(il([d, y.pathnameBase])),
        route: S,
      }),
      y.pathnameBase !== '/' && (d = il([d, y.pathnameBase])));
  }
  return _;
}
function fr(l, i) {
  typeof l == 'string' && (l = { path: l, caseSensitive: !1, end: !0 });
  let [o, r] = s0(l.path, l.caseSensitive, l.end),
    c = i.match(o);
  if (!c) return null;
  let d = c[0],
    _ = d.replace(/(.)\/+$/, '$1'),
    h = c.slice(1);
  return {
    params: r.reduce((p, { paramName: v, isOptional: y }, S) => {
      if (v === '*') {
        let b = h[S] || '';
        _ = d.slice(0, d.length - b.length).replace(/(.)\/+$/, '$1');
      }
      const q = h[S];
      return (y && !q ? (p[v] = void 0) : (p[v] = (q || '').replace(/%2F/g, '/')), p);
    }, {}),
    pathname: d,
    pathnameBase: _,
    pattern: l,
  };
}
function s0(l, i = !1, o = !0) {
  sl(
    l === '*' || !l.endsWith('*') || l.endsWith('/*'),
    `Route path "${l}" will be treated as if it were "${l.replace(/\*$/, '/*')}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${l.replace(/\*$/, '/*')}".`
  );
  let r = [],
    c =
      '^' +
      l
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(/\/:([\w-]+)(\?)?/g, (_, h, k, p, v) => {
          if ((r.push({ paramName: h, isOptional: k != null }), k)) {
            let y = v.charAt(p + _.length);
            return y && y !== '/' ? '/([^\\/]*)' : '(?:/([^\\/]*))?';
          }
          return '/([^\\/]+)';
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, '(/$1)?$2');
  return (
    l.endsWith('*')
      ? (r.push({ paramName: '*' }), (c += l === '*' || l === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : o
        ? (c += '\\/*$')
        : l !== '' && l !== '/' && (c += '(?:(?=\\/|$))'),
    [new RegExp(c, i ? void 0 : 'i'), r]
  );
}
function r0(l) {
  try {
    return l
      .split('/')
      .map((i) => decodeURIComponent(i).replace(/\//g, '%2F'))
      .join('/');
  } catch (i) {
    return (
      sl(
        !1,
        `The URL path "${l}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${i}).`
      ),
      l
    );
  }
}
function Hl(l, i) {
  if (i === '/') return l;
  if (!l.toLowerCase().startsWith(i.toLowerCase())) return null;
  let o = i.endsWith('/') ? i.length - 1 : i.length,
    r = l.charAt(o);
  return r && r !== '/' ? null : l.slice(o) || '/';
}
var o0 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function u0(l, i = '/') {
  let { pathname: o, search: r = '', hash: c = '' } = typeof l == 'string' ? Ln(l) : l,
    d;
  return (
    o ? ((o = Qp(o)), o.startsWith('/') ? (d = hp(o.substring(1), '/')) : (d = hp(o, i))) : (d = i),
    { pathname: d, search: m0(r), hash: _0(c) }
  );
}
function hp(l, i) {
  let o = pr(i).split('/');
  return (
    l.split('/').forEach((c) => {
      c === '..' ? o.length > 1 && o.pop() : c !== '.' && o.push(c);
    }),
    o.length > 1 ? o.join('/') : '/'
  );
}
function ac(l, i, o, r) {
  return `Cannot include a '${l}' character in a manually specified \`to.${i}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function c0(l) {
  return l.filter((i, o) => o === 0 || (i.route.path && i.route.path.length > 0));
}
function qc(l) {
  let i = c0(l);
  return i.map((o, r) => (r === i.length - 1 ? o.pathname : o.pathnameBase));
}
function wr(l, i, o, r = !1) {
  let c;
  typeof l == 'string'
    ? (c = Ln(l))
    : ((c = { ...l }),
      Ke(!c.pathname || !c.pathname.includes('?'), ac('?', 'pathname', 'search', c)),
      Ke(!c.pathname || !c.pathname.includes('#'), ac('#', 'pathname', 'hash', c)),
      Ke(!c.search || !c.search.includes('#'), ac('#', 'search', 'hash', c)));
  let d = l === '' || c.pathname === '',
    _ = d ? '/' : c.pathname,
    h;
  if (_ == null) h = o;
  else {
    let y = i.length - 1;
    if (!r && _.startsWith('..')) {
      let S = _.split('/');
      for (; S[0] === '..'; ) (S.shift(), (y -= 1));
      c.pathname = S.join('/');
    }
    h = y >= 0 ? i[y] : '/';
  }
  let k = u0(c, h),
    p = _ && _ !== '/' && _.endsWith('/'),
    v = (d || _ === '.') && o.endsWith('/');
  return (!k.pathname.endsWith('/') && (p || v) && (k.pathname += '/'), k);
}
var Qp = (l) => l.replace(/\/\/+/g, '/'),
  il = (l) => Qp(l.join('/')),
  pr = (l) => l.replace(/\/+$/, ''),
  d0 = (l) => pr(l).replace(/^\/*/, '/'),
  m0 = (l) => (!l || l === '?' ? '' : l.startsWith('?') ? l : '?' + l),
  _0 = (l) => (!l || l === '#' ? '' : l.startsWith('#') ? l : '#' + l),
  f0 = class {
    constructor(l, i, o, r = !1) {
      ((this.status = l),
        (this.statusText = i || ''),
        (this.internal = r),
        o instanceof Error ? ((this.data = o.toString()), (this.error = o)) : (this.data = o));
    }
  };
function p0(l) {
  return (
    l != null &&
    typeof l.status == 'number' &&
    typeof l.statusText == 'string' &&
    typeof l.internal == 'boolean' &&
    'data' in l
  );
}
function h0(l) {
  let i = l.map((o) => o.route.path).filter(Boolean);
  return il(i) || '/';
}
var Kp =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
function Zp(l, i) {
  let o = l;
  if (typeof o != 'string' || !o0.test(o)) return { absoluteURL: void 0, isExternal: !1, to: o };
  let r = o,
    c = !1;
  if (Kp)
    try {
      let d = new URL(window.location.href),
        _ = o.startsWith('//') ? new URL(d.protocol + o) : new URL(o),
        h = Hl(_.pathname, i);
      _.origin === d.origin && h != null ? (o = h + _.search + _.hash) : (c = !0);
    } catch {
      sl(
        !1,
        `<Link to="${o}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: r, isExternal: c, to: o };
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
var Jp = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(Jp);
var g0 = ['GET', ...Jp];
new Set(g0);
var jn = E.createContext(null);
jn.displayName = 'DataRouter';
var Tr = E.createContext(null);
Tr.displayName = 'DataRouterState';
var Pp = E.createContext(!1);
function k0() {
  return E.useContext(Pp);
}
var Wp = E.createContext({ isTransitioning: !1 });
Wp.displayName = 'ViewTransition';
var v0 = E.createContext(new Map());
v0.displayName = 'Fetchers';
var y0 = E.createContext(null);
y0.displayName = 'Await';
var Ut = E.createContext(null);
Ut.displayName = 'Navigation';
var Ri = E.createContext(null);
Ri.displayName = 'Location';
var ul = E.createContext({ outlet: null, matches: [], isDataRoute: !1 });
ul.displayName = 'Route';
var Oc = E.createContext(null);
Oc.displayName = 'RouteError';
var Fp = 'REACT_ROUTER_ERROR',
  b0 = 'REDIRECT',
  x0 = 'ROUTE_ERROR_RESPONSE';
function S0(l) {
  if (l.startsWith(`${Fp}:${b0}:{`))
    try {
      let i = JSON.parse(l.slice(28));
      if (
        typeof i == 'object' &&
        i &&
        typeof i.status == 'number' &&
        typeof i.statusText == 'string' &&
        typeof i.location == 'string' &&
        typeof i.reloadDocument == 'boolean' &&
        typeof i.replace == 'boolean'
      )
        return i;
    } catch {}
}
function w0(l) {
  if (l.startsWith(`${Fp}:${x0}:{`))
    try {
      let i = JSON.parse(l.slice(40));
      if (
        typeof i == 'object' &&
        i &&
        typeof i.status == 'number' &&
        typeof i.statusText == 'string'
      )
        return new f0(i.status, i.statusText, i.data);
    } catch {}
}
function T0(l, { relative: i } = {}) {
  Ke(Mn(), 'useHref() may be used only in the context of a <Router> component.');
  let { basename: o, navigator: r } = E.useContext(Ut),
    { hash: c, pathname: d, search: _ } = zi(l, { relative: i }),
    h = d;
  return (
    o !== '/' && (h = d === '/' ? o : il([o, d])),
    r.createHref({ pathname: h, search: _, hash: c })
  );
}
function Mn() {
  return E.useContext(Ri) != null;
}
function hl() {
  return (
    Ke(Mn(), 'useLocation() may be used only in the context of a <Router> component.'),
    E.useContext(Ri).location
  );
}
var eh =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function th(l) {
  E.useContext(Ut).static || E.useLayoutEffect(l);
}
function cl() {
  let { isDataRoute: l } = E.useContext(ul);
  return l ? z0() : E0();
}
function E0() {
  Ke(Mn(), 'useNavigate() may be used only in the context of a <Router> component.');
  let l = E.useContext(jn),
    { basename: i, navigator: o } = E.useContext(Ut),
    { matches: r } = E.useContext(ul),
    { pathname: c } = hl(),
    d = JSON.stringify(qc(r)),
    _ = E.useRef(!1);
  return (
    th(() => {
      _.current = !0;
    }),
    E.useCallback(
      (k, p = {}) => {
        if ((sl(_.current, eh), !_.current)) return;
        if (typeof k == 'number') {
          o.go(k);
          return;
        }
        let v = wr(k, JSON.parse(d), c, p.relative === 'path');
        (l == null && i !== '/' && (v.pathname = v.pathname === '/' ? i : il([i, v.pathname])),
          (p.replace ? o.replace : o.push)(v, p.state, p));
      },
      [i, o, d, c, l]
    )
  );
}
E.createContext(null);
function C0() {
  let { matches: l } = E.useContext(ul),
    i = l[l.length - 1];
  return (i == null ? void 0 : i.params) ?? {};
}
function zi(l, { relative: i } = {}) {
  let { matches: o } = E.useContext(ul),
    { pathname: r } = hl(),
    c = JSON.stringify(qc(o));
  return E.useMemo(() => wr(l, JSON.parse(c), r, i === 'path'), [l, c, r, i]);
}
function N0(l, i) {
  return lh(l, i);
}
function lh(l, i, o) {
  var C;
  Ke(Mn(), 'useRoutes() may be used only in the context of a <Router> component.');
  let { navigator: r } = E.useContext(Ut),
    { matches: c } = E.useContext(ul),
    d = c[c.length - 1],
    _ = d ? d.params : {},
    h = d ? d.pathname : '/',
    k = d ? d.pathnameBase : '/',
    p = d && d.route;
  {
    let T = (p && p.path) || '';
    nh(
      h,
      !p || T.endsWith('*') || T.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${T}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${T}"> to <Route path="${T === '/' ? '*' : `${T}/*`}">.`
    );
  }
  let v = hl(),
    y;
  if (i) {
    let T = typeof i == 'string' ? Ln(i) : i;
    (Ke(
      k === '/' || ((C = T.pathname) == null ? void 0 : C.startsWith(k)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${k}" but pathname "${T.pathname}" was given in the \`location\` prop.`
    ),
      (y = T));
  } else y = v;
  let S = y.pathname || '/',
    q = S;
  if (k !== '/') {
    let T = k.replace(/^\//, '').split('/');
    q = '/' + S.replace(/^\//, '').split('/').slice(T.length).join('/');
  }
  let b = Yp(l, { pathname: q });
  (sl(p || b != null, `No routes matched location "${y.pathname}${y.search}${y.hash}" `),
    sl(
      b == null ||
        b[b.length - 1].route.element !== void 0 ||
        b[b.length - 1].route.Component !== void 0 ||
        b[b.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${y.pathname}${y.search}${y.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let L = B0(
    b &&
      b.map((T) =>
        Object.assign({}, T, {
          params: Object.assign({}, _, T.params),
          pathname: il([
            k,
            r.encodeLocation
              ? r.encodeLocation(
                  T.pathname.replace(/%/g, '%25').replace(/\?/g, '%3F').replace(/#/g, '%23')
                ).pathname
              : T.pathname,
          ]),
          pathnameBase:
            T.pathnameBase === '/'
              ? k
              : il([
                  k,
                  r.encodeLocation
                    ? r.encodeLocation(
                        T.pathnameBase
                          .replace(/%/g, '%25')
                          .replace(/\?/g, '%3F')
                          .replace(/#/g, '%23')
                      ).pathname
                    : T.pathnameBase,
                ]),
        })
      ),
    c,
    o
  );
  return i && L
    ? E.createElement(
        Ri.Provider,
        {
          value: {
            location: {
              pathname: '/',
              search: '',
              hash: '',
              state: null,
              key: 'default',
              unstable_mask: void 0,
              ...y,
            },
            navigationType: 'POP',
          },
        },
        L
      )
    : L;
}
function A0() {
  let l = R0(),
    i = p0(l) ? `${l.status} ${l.statusText}` : l instanceof Error ? l.message : JSON.stringify(l),
    o = l instanceof Error ? l.stack : null,
    r = 'rgba(200,200,200, 0.5)',
    c = { padding: '0.5rem', backgroundColor: r },
    d = { padding: '2px 4px', backgroundColor: r },
    _ = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', l),
    (_ = E.createElement(
      E.Fragment,
      null,
      E.createElement('p', null, '💿 Hey developer 👋'),
      E.createElement(
        'p',
        null,
        'You can provide a way better UX than this when your app throws errors by providing your own ',
        E.createElement('code', { style: d }, 'ErrorBoundary'),
        ' or',
        ' ',
        E.createElement('code', { style: d }, 'errorElement'),
        ' prop on your route.'
      )
    )),
    E.createElement(
      E.Fragment,
      null,
      E.createElement('h2', null, 'Unexpected Application Error!'),
      E.createElement('h3', { style: { fontStyle: 'italic' } }, i),
      o ? E.createElement('pre', { style: c }, o) : null,
      _
    )
  );
}
var L0 = E.createElement(A0, null),
  ah = class extends E.Component {
    constructor(l) {
      (super(l),
        (this.state = { location: l.location, revalidation: l.revalidation, error: l.error }));
    }
    static getDerivedStateFromError(l) {
      return { error: l };
    }
    static getDerivedStateFromProps(l, i) {
      return i.location !== l.location || (i.revalidation !== 'idle' && l.revalidation === 'idle')
        ? { error: l.error, location: l.location, revalidation: l.revalidation }
        : {
            error: l.error !== void 0 ? l.error : i.error,
            location: i.location,
            revalidation: l.revalidation || i.revalidation,
          };
    }
    componentDidCatch(l, i) {
      this.props.onError
        ? this.props.onError(l, i)
        : console.error('React Router caught the following error during render', l);
    }
    render() {
      let l = this.state.error;
      if (
        this.context &&
        typeof l == 'object' &&
        l &&
        'digest' in l &&
        typeof l.digest == 'string'
      ) {
        const o = w0(l.digest);
        o && (l = o);
      }
      let i =
        l !== void 0
          ? E.createElement(
              ul.Provider,
              { value: this.props.routeContext },
              E.createElement(Oc.Provider, { value: l, children: this.props.component })
            )
          : this.props.children;
      return this.context ? E.createElement(j0, { error: l }, i) : i;
    }
  };
ah.contextType = Pp;
var nc = new WeakMap();
function j0({ children: l, error: i }) {
  let { basename: o } = E.useContext(Ut);
  if (typeof i == 'object' && i && 'digest' in i && typeof i.digest == 'string') {
    let r = S0(i.digest);
    if (r) {
      let c = nc.get(i);
      if (c) throw c;
      let d = Zp(r.location, o);
      if (Kp && !nc.get(i))
        if (d.isExternal || r.reloadDocument) window.location.href = d.absoluteURL || d.to;
        else {
          const _ = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(d.to, { replace: r.replace })
          );
          throw (nc.set(i, _), _);
        }
      return E.createElement('meta', {
        httpEquiv: 'refresh',
        content: `0;url=${d.absoluteURL || d.to}`,
      });
    }
  }
  return l;
}
function M0({ routeContext: l, match: i, children: o }) {
  let r = E.useContext(jn);
  return (
    r &&
      r.static &&
      r.staticContext &&
      (i.route.errorElement || i.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = i.route.id),
    E.createElement(ul.Provider, { value: l }, o)
  );
}
function B0(l, i = [], o) {
  let r = o == null ? void 0 : o.state;
  if (l == null) {
    if (!r) return null;
    if (r.errors) l = r.matches;
    else if (i.length === 0 && !r.initialized && r.matches.length > 0) l = r.matches;
    else return null;
  }
  let c = l,
    d = r == null ? void 0 : r.errors;
  if (d != null) {
    let v = c.findIndex((y) => y.route.id && (d == null ? void 0 : d[y.route.id]) !== void 0);
    (Ke(
      v >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(d).join(',')}`
    ),
      (c = c.slice(0, Math.min(c.length, v + 1))));
  }
  let _ = !1,
    h = -1;
  if (o && r) {
    _ = r.renderFallback;
    for (let v = 0; v < c.length; v++) {
      let y = c[v];
      if (((y.route.HydrateFallback || y.route.hydrateFallbackElement) && (h = v), y.route.id)) {
        let { loaderData: S, errors: q } = r,
          b = y.route.loader && !S.hasOwnProperty(y.route.id) && (!q || q[y.route.id] === void 0);
        if (y.route.lazy || b) {
          (o.isStatic && (_ = !0), h >= 0 ? (c = c.slice(0, h + 1)) : (c = [c[0]]));
          break;
        }
      }
    }
  }
  let k = o == null ? void 0 : o.onError,
    p =
      r && k
        ? (v, y) => {
            var S, q;
            k(v, {
              location: r.location,
              params:
                ((q = (S = r.matches) == null ? void 0 : S[0]) == null ? void 0 : q.params) ?? {},
              unstable_pattern: h0(r.matches),
              errorInfo: y,
            });
          }
        : void 0;
  return c.reduceRight((v, y, S) => {
    let q,
      b = !1,
      L = null,
      C = null;
    r &&
      ((q = d && y.route.id ? d[y.route.id] : void 0),
      (L = y.route.errorElement || L0),
      _ &&
        (h < 0 && S === 0
          ? (nh(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration'
            ),
            (b = !0),
            (C = null))
          : h === S && ((b = !0), (C = y.route.hydrateFallbackElement || null))));
    let T = i.concat(c.slice(0, S + 1)),
      A = () => {
        let M;
        return (
          q
            ? (M = L)
            : b
              ? (M = C)
              : y.route.Component
                ? (M = E.createElement(y.route.Component, null))
                : y.route.element
                  ? (M = y.route.element)
                  : (M = v),
          E.createElement(M0, {
            match: y,
            routeContext: { outlet: v, matches: T, isDataRoute: r != null },
            children: M,
          })
        );
      };
    return r && (y.route.ErrorBoundary || y.route.errorElement || S === 0)
      ? E.createElement(ah, {
          location: r.location,
          revalidation: r.revalidation,
          component: L,
          error: q,
          children: A(),
          routeContext: { outlet: null, matches: T, isDataRoute: !0 },
          onError: p,
        })
      : A();
  }, null);
}
function Ic(l) {
  return `${l} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function q0(l) {
  let i = E.useContext(jn);
  return (Ke(i, Ic(l)), i);
}
function O0(l) {
  let i = E.useContext(Tr);
  return (Ke(i, Ic(l)), i);
}
function I0(l) {
  let i = E.useContext(ul);
  return (Ke(i, Ic(l)), i);
}
function Dc(l) {
  let i = I0(l),
    o = i.matches[i.matches.length - 1];
  return (Ke(o.route.id, `${l} can only be used on routes that contain a unique "id"`), o.route.id);
}
function D0() {
  return Dc('useRouteId');
}
function R0() {
  var r;
  let l = E.useContext(Oc),
    i = O0('useRouteError'),
    o = Dc('useRouteError');
  return l !== void 0 ? l : (r = i.errors) == null ? void 0 : r[o];
}
function z0() {
  let { router: l } = q0('useNavigate'),
    i = Dc('useNavigate'),
    o = E.useRef(!1);
  return (
    th(() => {
      o.current = !0;
    }),
    E.useCallback(
      async (c, d = {}) => {
        (sl(o.current, eh),
          o.current &&
            (typeof c == 'number'
              ? await l.navigate(c)
              : await l.navigate(c, { fromRouteId: i, ...d })));
      },
      [l, i]
    )
  );
}
var gp = {};
function nh(l, i, o) {
  !i && !gp[l] && ((gp[l] = !0), sl(!1, o));
}
E.memo(H0);
function H0({ routes: l, future: i, state: o, isStatic: r, onError: c }) {
  return lh(l, void 0, { state: o, isStatic: r, onError: c });
}
function rl({ to: l, replace: i, state: o, relative: r }) {
  Ke(Mn(), '<Navigate> may be used only in the context of a <Router> component.');
  let { static: c } = E.useContext(Ut);
  sl(
    !c,
    '<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.'
  );
  let { matches: d } = E.useContext(ul),
    { pathname: _ } = hl(),
    h = cl(),
    k = wr(l, qc(d), _, r === 'path'),
    p = JSON.stringify(k);
  return (
    E.useEffect(() => {
      h(JSON.parse(p), { replace: i, state: o, relative: r });
    }, [h, p, r, i, o]),
    null
  );
}
function Wt(l) {
  Ke(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  );
}
function U0({
  basename: l = '/',
  children: i = null,
  location: o,
  navigationType: r = 'POP',
  navigator: c,
  static: d = !1,
  unstable_useTransitions: _,
}) {
  Ke(
    !Mn(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  let h = l.replace(/^\/*/, '/'),
    k = E.useMemo(
      () => ({ basename: h, navigator: c, static: d, unstable_useTransitions: _, future: {} }),
      [h, c, d, _]
    );
  typeof o == 'string' && (o = Ln(o));
  let {
      pathname: p = '/',
      search: v = '',
      hash: y = '',
      state: S = null,
      key: q = 'default',
      unstable_mask: b,
    } = o,
    L = E.useMemo(() => {
      let C = Hl(p, h);
      return C == null
        ? null
        : {
            location: { pathname: C, search: v, hash: y, state: S, key: q, unstable_mask: b },
            navigationType: r,
          };
    }, [h, p, v, y, S, q, r, b]);
  return (
    sl(
      L != null,
      `<Router basename="${h}"> is not able to match the URL "${p}${v}${y}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    L == null
      ? null
      : E.createElement(
          Ut.Provider,
          { value: k },
          E.createElement(Ri.Provider, { children: i, value: L })
        )
  );
}
function G0({ children: l, location: i }) {
  return N0(yc(l), i);
}
function yc(l, i = []) {
  let o = [];
  return (
    E.Children.forEach(l, (r, c) => {
      if (!E.isValidElement(r)) return;
      let d = [...i, c];
      if (r.type === E.Fragment) {
        o.push.apply(o, yc(r.props.children, d));
        return;
      }
      (Ke(
        r.type === Wt,
        `[${typeof r.type == 'string' ? r.type : r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Ke(!r.props.index || !r.props.children, 'An index route cannot have child routes.'));
      let _ = {
        id: r.props.id || d.join('-'),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        middleware: r.props.middleware,
        loader: r.props.loader,
        action: r.props.action,
        hydrateFallbackElement: r.props.hydrateFallbackElement,
        HydrateFallback: r.props.HydrateFallback,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.hasErrorBoundary === !0 ||
          r.props.ErrorBoundary != null ||
          r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      (r.props.children && (_.children = yc(r.props.children, d)), o.push(_));
    }),
    o
  );
}
var dr = 'get',
  mr = 'application/x-www-form-urlencoded';
function Er(l) {
  return typeof HTMLElement < 'u' && l instanceof HTMLElement;
}
function $0(l) {
  return Er(l) && l.tagName.toLowerCase() === 'button';
}
function Y0(l) {
  return Er(l) && l.tagName.toLowerCase() === 'form';
}
function X0(l) {
  return Er(l) && l.tagName.toLowerCase() === 'input';
}
function V0(l) {
  return !!(l.metaKey || l.altKey || l.ctrlKey || l.shiftKey);
}
function Q0(l, i) {
  return l.button === 0 && (!i || i === '_self') && !V0(l);
}
var ar = null;
function K0() {
  if (ar === null)
    try {
      (new FormData(document.createElement('form'), 0), (ar = !1));
    } catch {
      ar = !0;
    }
  return ar;
}
var Z0 = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
function ic(l) {
  return l != null && !Z0.has(l)
    ? (sl(
        !1,
        `"${l}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${mr}"`
      ),
      null)
    : l;
}
function J0(l, i) {
  let o, r, c, d, _;
  if (Y0(l)) {
    let h = l.getAttribute('action');
    ((r = h ? Hl(h, i) : null),
      (o = l.getAttribute('method') || dr),
      (c = ic(l.getAttribute('enctype')) || mr),
      (d = new FormData(l)));
  } else if ($0(l) || (X0(l) && (l.type === 'submit' || l.type === 'image'))) {
    let h = l.form;
    if (h == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let k = l.getAttribute('formaction') || h.getAttribute('action');
    if (
      ((r = k ? Hl(k, i) : null),
      (o = l.getAttribute('formmethod') || h.getAttribute('method') || dr),
      (c = ic(l.getAttribute('formenctype')) || ic(h.getAttribute('enctype')) || mr),
      (d = new FormData(h, l)),
      !K0())
    ) {
      let { name: p, type: v, value: y } = l;
      if (v === 'image') {
        let S = p ? `${p}.` : '';
        (d.append(`${S}x`, '0'), d.append(`${S}y`, '0'));
      } else p && d.append(p, y);
    }
  } else {
    if (Er(l))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((o = dr), (r = null), (c = mr), (_ = l));
  }
  return (
    d && c === 'text/plain' && ((_ = d), (d = void 0)),
    { action: r, method: o.toLowerCase(), encType: c, formData: d, body: _ }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function Rc(l, i) {
  if (l === !1 || l === null || typeof l > 'u') throw new Error(i);
}
function ih(l, i, o, r) {
  let c =
    typeof l == 'string'
      ? new URL(l, typeof window > 'u' ? 'server://singlefetch/' : window.location.origin)
      : l;
  return (
    o
      ? c.pathname.endsWith('/')
        ? (c.pathname = `${c.pathname}_.${r}`)
        : (c.pathname = `${c.pathname}.${r}`)
      : c.pathname === '/'
        ? (c.pathname = `_root.${r}`)
        : i && Hl(c.pathname, i) === '/'
          ? (c.pathname = `${pr(i)}/_root.${r}`)
          : (c.pathname = `${pr(c.pathname)}.${r}`),
    c
  );
}
async function P0(l, i) {
  if (l.id in i) return i[l.id];
  try {
    let o = await import(l.module);
    return ((i[l.id] = o), o);
  } catch (o) {
    return (
      console.error(`Error loading route module \`${l.module}\`, reloading page...`),
      console.error(o),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function W0(l) {
  return l == null
    ? !1
    : l.href == null
      ? l.rel === 'preload' && typeof l.imageSrcSet == 'string' && typeof l.imageSizes == 'string'
      : typeof l.rel == 'string' && typeof l.href == 'string';
}
async function F0(l, i, o) {
  let r = await Promise.all(
    l.map(async (c) => {
      let d = i.routes[c.route.id];
      if (d) {
        let _ = await P0(d, o);
        return _.links ? _.links() : [];
      }
      return [];
    })
  );
  return ay(
    r
      .flat(1)
      .filter(W0)
      .filter((c) => c.rel === 'stylesheet' || c.rel === 'preload')
      .map((c) =>
        c.rel === 'stylesheet' ? { ...c, rel: 'prefetch', as: 'style' } : { ...c, rel: 'prefetch' }
      )
  );
}
function kp(l, i, o, r, c, d) {
  let _ = (k, p) => (o[p] ? k.route.id !== o[p].route.id : !0),
    h = (k, p) => {
      var v;
      return (
        o[p].pathname !== k.pathname ||
        (((v = o[p].route.path) == null ? void 0 : v.endsWith('*')) &&
          o[p].params['*'] !== k.params['*'])
      );
    };
  return d === 'assets'
    ? i.filter((k, p) => _(k, p) || h(k, p))
    : d === 'data'
      ? i.filter((k, p) => {
          var y;
          let v = r.routes[k.route.id];
          if (!v || !v.hasLoader) return !1;
          if (_(k, p) || h(k, p)) return !0;
          if (k.route.shouldRevalidate) {
            let S = k.route.shouldRevalidate({
              currentUrl: new URL(c.pathname + c.search + c.hash, window.origin),
              currentParams: ((y = o[0]) == null ? void 0 : y.params) || {},
              nextUrl: new URL(l, window.origin),
              nextParams: k.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof S == 'boolean') return S;
          }
          return !0;
        })
      : [];
}
function ey(l, i, { includeHydrateFallback: o } = {}) {
  return ty(
    l
      .map((r) => {
        let c = i.routes[r.route.id];
        if (!c) return [];
        let d = [c.module];
        return (
          c.clientActionModule && (d = d.concat(c.clientActionModule)),
          c.clientLoaderModule && (d = d.concat(c.clientLoaderModule)),
          o && c.hydrateFallbackModule && (d = d.concat(c.hydrateFallbackModule)),
          c.imports && (d = d.concat(c.imports)),
          d
        );
      })
      .flat(1)
  );
}
function ty(l) {
  return [...new Set(l)];
}
function ly(l) {
  let i = {},
    o = Object.keys(l).sort();
  for (let r of o) i[r] = l[r];
  return i;
}
function ay(l, i) {
  let o = new Set();
  return (
    new Set(i),
    l.reduce((r, c) => {
      let d = JSON.stringify(ly(c));
      return (o.has(d) || (o.add(d), r.push({ key: d, link: c })), r);
    }, [])
  );
}
function zc() {
  let l = E.useContext(jn);
  return (Rc(l, 'You must render this element inside a <DataRouterContext.Provider> element'), l);
}
function ny() {
  let l = E.useContext(Tr);
  return (
    Rc(l, 'You must render this element inside a <DataRouterStateContext.Provider> element'),
    l
  );
}
var Hc = E.createContext(void 0);
Hc.displayName = 'FrameworkContext';
function Uc() {
  let l = E.useContext(Hc);
  return (Rc(l, 'You must render this element inside a <HydratedRouter> element'), l);
}
function iy(l, i) {
  let o = E.useContext(Hc),
    [r, c] = E.useState(!1),
    [d, _] = E.useState(!1),
    { onFocus: h, onBlur: k, onMouseEnter: p, onMouseLeave: v, onTouchStart: y } = i,
    S = E.useRef(null);
  (E.useEffect(() => {
    if ((l === 'render' && _(!0), l === 'viewport')) {
      let L = (T) => {
          T.forEach((A) => {
            _(A.isIntersecting);
          });
        },
        C = new IntersectionObserver(L, { threshold: 0.5 });
      return (
        S.current && C.observe(S.current),
        () => {
          C.disconnect();
        }
      );
    }
  }, [l]),
    E.useEffect(() => {
      if (r) {
        let L = setTimeout(() => {
          _(!0);
        }, 100);
        return () => {
          clearTimeout(L);
        };
      }
    }, [r]));
  let q = () => {
      c(!0);
    },
    b = () => {
      (c(!1), _(!1));
    };
  return o
    ? l !== 'intent'
      ? [d, S, {}]
      : [
          d,
          S,
          {
            onFocus: Ai(h, q),
            onBlur: Ai(k, b),
            onMouseEnter: Ai(p, q),
            onMouseLeave: Ai(v, b),
            onTouchStart: Ai(y, q),
          },
        ]
    : [!1, S, {}];
}
function Ai(l, i) {
  return (o) => {
    (l && l(o), o.defaultPrevented || i(o));
  };
}
function sy({ page: l, ...i }) {
  let o = k0(),
    { router: r } = zc(),
    c = E.useMemo(() => Yp(r.routes, l, r.basename), [r.routes, l, r.basename]);
  return c
    ? o
      ? E.createElement(oy, { page: l, matches: c, ...i })
      : E.createElement(uy, { page: l, matches: c, ...i })
    : null;
}
function ry(l) {
  let { manifest: i, routeModules: o } = Uc(),
    [r, c] = E.useState([]);
  return (
    E.useEffect(() => {
      let d = !1;
      return (
        F0(l, i, o).then((_) => {
          d || c(_);
        }),
        () => {
          d = !0;
        }
      );
    }, [l, i, o]),
    r
  );
}
function oy({ page: l, matches: i, ...o }) {
  let r = hl(),
    { future: c } = Uc(),
    { basename: d } = zc(),
    _ = E.useMemo(() => {
      if (l === r.pathname + r.search + r.hash) return [];
      let h = ih(l, d, c.unstable_trailingSlashAwareDataRequests, 'rsc'),
        k = !1,
        p = [];
      for (let v of i)
        typeof v.route.shouldRevalidate == 'function' ? (k = !0) : p.push(v.route.id);
      return (
        k && p.length > 0 && h.searchParams.set('_routes', p.join(',')),
        [h.pathname + h.search]
      );
    }, [d, c.unstable_trailingSlashAwareDataRequests, l, r, i]);
  return E.createElement(
    E.Fragment,
    null,
    _.map((h) => E.createElement('link', { key: h, rel: 'prefetch', as: 'fetch', href: h, ...o }))
  );
}
function uy({ page: l, matches: i, ...o }) {
  let r = hl(),
    { future: c, manifest: d, routeModules: _ } = Uc(),
    { basename: h } = zc(),
    { loaderData: k, matches: p } = ny(),
    v = E.useMemo(() => kp(l, i, p, d, r, 'data'), [l, i, p, d, r]),
    y = E.useMemo(() => kp(l, i, p, d, r, 'assets'), [l, i, p, d, r]),
    S = E.useMemo(() => {
      if (l === r.pathname + r.search + r.hash) return [];
      let L = new Set(),
        C = !1;
      if (
        (i.forEach((A) => {
          var P;
          let M = d.routes[A.route.id];
          !M ||
            !M.hasLoader ||
            ((!v.some((J) => J.route.id === A.route.id) &&
              A.route.id in k &&
              (P = _[A.route.id]) != null &&
              P.shouldRevalidate) ||
            M.hasClientLoader
              ? (C = !0)
              : L.add(A.route.id));
        }),
        L.size === 0)
      )
        return [];
      let T = ih(l, h, c.unstable_trailingSlashAwareDataRequests, 'data');
      return (
        C &&
          L.size > 0 &&
          T.searchParams.set(
            '_routes',
            i
              .filter((A) => L.has(A.route.id))
              .map((A) => A.route.id)
              .join(',')
          ),
        [T.pathname + T.search]
      );
    }, [h, c.unstable_trailingSlashAwareDataRequests, k, r, d, v, i, l, _]),
    q = E.useMemo(() => ey(y, d), [y, d]),
    b = ry(y);
  return E.createElement(
    E.Fragment,
    null,
    S.map((L) => E.createElement('link', { key: L, rel: 'prefetch', as: 'fetch', href: L, ...o })),
    q.map((L) => E.createElement('link', { key: L, rel: 'modulepreload', href: L, ...o })),
    b.map(({ key: L, link: C }) =>
      E.createElement('link', {
        key: L,
        nonce: o.nonce,
        ...C,
        crossOrigin: C.crossOrigin ?? o.crossOrigin,
      })
    )
  );
}
function cy(...l) {
  return (i) => {
    l.forEach((o) => {
      typeof o == 'function' ? o(i) : o != null && (o.current = i);
    });
  };
}
var dy =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
try {
  dy && (window.__reactRouterVersion = '7.14.2');
} catch {}
function my({ basename: l, children: i, unstable_useTransitions: o, window: r }) {
  let c = E.useRef();
  c.current == null && (c.current = Xv({ window: r, v5Compat: !0 }));
  let d = c.current,
    [_, h] = E.useState({ action: d.action, location: d.location }),
    k = E.useCallback(
      (p) => {
        o === !1 ? h(p) : E.startTransition(() => h(p));
      },
      [o]
    );
  return (
    E.useLayoutEffect(() => d.listen(k), [d, k]),
    E.createElement(U0, {
      basename: l,
      children: i,
      location: _.location,
      navigationType: _.action,
      navigator: d,
      unstable_useTransitions: o,
    })
  );
}
var sh = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  rh = E.forwardRef(function (
    {
      onClick: i,
      discover: o = 'render',
      prefetch: r = 'none',
      relative: c,
      reloadDocument: d,
      replace: _,
      unstable_mask: h,
      state: k,
      target: p,
      to: v,
      preventScrollReset: y,
      viewTransition: S,
      unstable_defaultShouldRevalidate: q,
      ...b
    },
    L
  ) {
    let { basename: C, navigator: T, unstable_useTransitions: A } = E.useContext(Ut),
      M = typeof v == 'string' && sh.test(v),
      P = Zp(v, C);
    v = P.to;
    let J = T0(v, { relative: c }),
      V = hl(),
      H = null;
    if (h) {
      let he = wr(h, [], V.unstable_mask ? V.unstable_mask.pathname : '/', !0);
      (C !== '/' && (he.pathname = he.pathname === '/' ? C : il([C, he.pathname])),
        (H = T.createHref(he)));
    }
    let [W, ne, te] = iy(r, b),
      oe = hy(v, {
        replace: _,
        unstable_mask: h,
        state: k,
        target: p,
        preventScrollReset: y,
        relative: c,
        viewTransition: S,
        unstable_defaultShouldRevalidate: q,
        unstable_useTransitions: A,
      });
    function fe(he) {
      (i && i(he), he.defaultPrevented || oe(he));
    }
    let ke = !(P.isExternal || d),
      xe = E.createElement('a', {
        ...b,
        ...te,
        href: (ke ? H : void 0) || P.absoluteURL || J,
        onClick: ke ? fe : i,
        ref: cy(L, ne),
        target: p,
        'data-discover': !M && o === 'render' ? 'true' : void 0,
      });
    return W && !M ? E.createElement(E.Fragment, null, xe, E.createElement(sy, { page: J })) : xe;
  });
rh.displayName = 'Link';
var _y = E.forwardRef(function (
  {
    'aria-current': i = 'page',
    caseSensitive: o = !1,
    className: r = '',
    end: c = !1,
    style: d,
    to: _,
    viewTransition: h,
    children: k,
    ...p
  },
  v
) {
  let y = zi(_, { relative: p.relative }),
    S = hl(),
    q = E.useContext(Tr),
    { navigator: b, basename: L } = E.useContext(Ut),
    C = q != null && by(y) && h === !0,
    T = b.encodeLocation ? b.encodeLocation(y).pathname : y.pathname,
    A = S.pathname,
    M = q && q.navigation && q.navigation.location ? q.navigation.location.pathname : null;
  (o || ((A = A.toLowerCase()), (M = M ? M.toLowerCase() : null), (T = T.toLowerCase())),
    M && L && (M = Hl(M, L) || M));
  const P = T !== '/' && T.endsWith('/') ? T.length - 1 : T.length;
  let J = A === T || (!c && A.startsWith(T) && A.charAt(P) === '/'),
    V = M != null && (M === T || (!c && M.startsWith(T) && M.charAt(T.length) === '/')),
    H = { isActive: J, isPending: V, isTransitioning: C },
    W = J ? i : void 0,
    ne;
  typeof r == 'function'
    ? (ne = r(H))
    : (ne = [r, J ? 'active' : null, V ? 'pending' : null, C ? 'transitioning' : null]
        .filter(Boolean)
        .join(' '));
  let te = typeof d == 'function' ? d(H) : d;
  return E.createElement(
    rh,
    { ...p, 'aria-current': W, className: ne, ref: v, style: te, to: _, viewTransition: h },
    typeof k == 'function' ? k(H) : k
  );
});
_y.displayName = 'NavLink';
var fy = E.forwardRef(
  (
    {
      discover: l = 'render',
      fetcherKey: i,
      navigate: o,
      reloadDocument: r,
      replace: c,
      state: d,
      method: _ = dr,
      action: h,
      onSubmit: k,
      relative: p,
      preventScrollReset: v,
      viewTransition: y,
      unstable_defaultShouldRevalidate: S,
      ...q
    },
    b
  ) => {
    let { unstable_useTransitions: L } = E.useContext(Ut),
      C = vy(),
      T = yy(h, { relative: p }),
      A = _.toLowerCase() === 'get' ? 'get' : 'post',
      M = typeof h == 'string' && sh.test(h),
      P = (J) => {
        if ((k && k(J), J.defaultPrevented)) return;
        J.preventDefault();
        let V = J.nativeEvent.submitter,
          H = (V == null ? void 0 : V.getAttribute('formmethod')) || _,
          W = () =>
            C(V || J.currentTarget, {
              fetcherKey: i,
              method: H,
              navigate: o,
              replace: c,
              state: d,
              relative: p,
              preventScrollReset: v,
              viewTransition: y,
              unstable_defaultShouldRevalidate: S,
            });
        L && o !== !1 ? E.startTransition(() => W()) : W();
      };
    return E.createElement('form', {
      ref: b,
      method: A,
      action: T,
      onSubmit: r ? k : P,
      ...q,
      'data-discover': !M && l === 'render' ? 'true' : void 0,
    });
  }
);
fy.displayName = 'Form';
function py(l) {
  return `${l} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function oh(l) {
  let i = E.useContext(jn);
  return (Ke(i, py(l)), i);
}
function hy(
  l,
  {
    target: i,
    replace: o,
    unstable_mask: r,
    state: c,
    preventScrollReset: d,
    relative: _,
    viewTransition: h,
    unstable_defaultShouldRevalidate: k,
    unstable_useTransitions: p,
  } = {}
) {
  let v = cl(),
    y = hl(),
    S = zi(l, { relative: _ });
  return E.useCallback(
    (q) => {
      if (Q0(q, i)) {
        q.preventDefault();
        let b = o !== void 0 ? o : Oi(y) === Oi(S),
          L = () =>
            v(l, {
              replace: b,
              unstable_mask: r,
              state: c,
              preventScrollReset: d,
              relative: _,
              viewTransition: h,
              unstable_defaultShouldRevalidate: k,
            });
        p ? E.startTransition(() => L()) : L();
      }
    },
    [y, v, S, o, r, c, i, l, d, _, h, k, p]
  );
}
var gy = 0,
  ky = () => `__${String(++gy)}__`;
function vy() {
  let { router: l } = oh('useSubmit'),
    { basename: i } = E.useContext(Ut),
    o = D0(),
    r = l.fetch,
    c = l.navigate;
  return E.useCallback(
    async (d, _ = {}) => {
      let { action: h, method: k, encType: p, formData: v, body: y } = J0(d, i);
      if (_.navigate === !1) {
        let S = _.fetcherKey || ky();
        await r(S, o, _.action || h, {
          unstable_defaultShouldRevalidate: _.unstable_defaultShouldRevalidate,
          preventScrollReset: _.preventScrollReset,
          formData: v,
          body: y,
          formMethod: _.method || k,
          formEncType: _.encType || p,
          flushSync: _.flushSync,
        });
      } else
        await c(_.action || h, {
          unstable_defaultShouldRevalidate: _.unstable_defaultShouldRevalidate,
          preventScrollReset: _.preventScrollReset,
          formData: v,
          body: y,
          formMethod: _.method || k,
          formEncType: _.encType || p,
          replace: _.replace,
          state: _.state,
          fromRouteId: o,
          flushSync: _.flushSync,
          viewTransition: _.viewTransition,
        });
    },
    [r, c, i, o]
  );
}
function yy(l, { relative: i } = {}) {
  let { basename: o } = E.useContext(Ut),
    r = E.useContext(ul);
  Ke(r, 'useFormAction must be used inside a RouteContext');
  let [c] = r.matches.slice(-1),
    d = { ...zi(l || '.', { relative: i }) },
    _ = hl();
  if (l == null) {
    d.search = _.search;
    let h = new URLSearchParams(d.search),
      k = h.getAll('index');
    if (k.some((v) => v === '')) {
      (h.delete('index'), k.filter((y) => y).forEach((y) => h.append('index', y)));
      let v = h.toString();
      d.search = v ? `?${v}` : '';
    }
  }
  return (
    (!l || l === '.') &&
      c.route.index &&
      (d.search = d.search ? d.search.replace(/^\?/, '?index&') : '?index'),
    o !== '/' && (d.pathname = d.pathname === '/' ? o : il([o, d.pathname])),
    Oi(d)
  );
}
function by(l, { relative: i } = {}) {
  let o = E.useContext(Wp);
  Ke(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: r } = oh('useViewTransitionState'),
    c = zi(l, { relative: i });
  if (!o.isTransitioning) return !1;
  let d = Hl(o.currentLocation.pathname, r) || o.currentLocation.pathname,
    _ = Hl(o.nextLocation.pathname, r) || o.nextLocation.pathname;
  return fr(c.pathname, _) != null || fr(c.pathname, d) != null;
}
const xy = '_layout_mn6ug_1',
  Sy = '_enemies_mn6ug_12',
  wy = '_enemy_mn6ug_20',
  Ty = '_targeted_mn6ug_35',
  Ey = '_enemyName_mn6ug_39',
  Cy = '_down_mn6ug_44',
  Ny = '_log_mn6ug_48',
  Ay = '_logLine_mn6ug_60',
  Ly = '_party_mn6ug_64',
  jy = '_rowTag_mn6ug_71',
  My = '_cardRow_mn6ug_77',
  By = '_card_mn6ug_77',
  qy = '_cardActive_mn6ug_99',
  Oy = '_cardDecided_mn6ug_104',
  Iy = '_cardName_mn6ug_108',
  Dy = '_uni_mn6ug_116',
  Ry = '_summons_mn6ug_120',
  zy = '_summon_mn6ug_120',
  Hy = '_summonName_mn6ug_138',
  Uy = '_summonHp_mn6ug_147',
  Gy = '_cardNums_mn6ug_153',
  $y = '_cardCmd_mn6ug_159',
  Yy = '_empty_mn6ug_165',
  Xy = '_command_mn6ug_170',
  Vy = '_skillList_mn6ug_176',
  Qy = '_skillBtn_mn6ug_182',
  Ky = '_skillTop_mn6ug_194',
  Zy = '_skillName_mn6ug_201',
  Jy = '_skillDesc_mn6ug_206',
  Py = '_target_mn6ug_35',
  Wy = '_unionBanner_mn6ug_217',
  Fy = '_unionCancel_mn6ug_231',
  eb = '_unionHint_mn6ug_240',
  tb = '_unionBtn_mn6ug_246',
  lb = '_cmdHead_mn6ug_252',
  ab = '_menu_mn6ug_257',
  nb = '_menuBtn_mn6ug_263',
  ib = '_tp_mn6ug_280',
  sb = '_menuBack_mn6ug_286',
  rb = '_execRow_mn6ug_296',
  ob = '_redo_mn6ug_301',
  ub = '_primary_mn6ug_311',
  cb = '_result_mn6ug_326',
  db = '_resultTitle_mn6ug_337',
  mb = '_resultBody_mn6ug_342',
  ee = {
    layout: xy,
    enemies: Sy,
    enemy: wy,
    targeted: Ty,
    enemyName: Ey,
    down: Cy,
    log: Ny,
    logLine: Ay,
    party: Ly,
    rowTag: jy,
    cardRow: My,
    card: By,
    cardActive: qy,
    cardDecided: Oy,
    cardName: Iy,
    uni: Dy,
    summons: Ry,
    summon: zy,
    summonName: Hy,
    summonHp: Uy,
    cardNums: Gy,
    cardCmd: $y,
    empty: Yy,
    command: Xy,
    skillList: Vy,
    skillBtn: Qy,
    skillTop: Ky,
    skillName: Zy,
    skillDesc: Jy,
    target: Py,
    unionBanner: Wy,
    unionCancel: Fy,
    unionHint: eb,
    unionBtn: tb,
    cmdHead: lb,
    menu: ab,
    menuBtn: nb,
    tp: ib,
    menuBack: sb,
    execRow: rb,
    redo: ob,
    primary: ub,
    result: cb,
    resultTitle: db,
    resultBody: mb,
  },
  _b = '_row_1t6j7_1',
  fb = '_label_1t6j7_8',
  pb = '_track_1t6j7_16',
  hb = '_fill_1t6j7_24',
  gb = '_value_1t6j7_30',
  Li = { row: _b, label: fb, track: pb, fill: hb, value: gb },
  nr = ({ value: l, max: i, color: o = '#4caf50', label: r, showValue: c = !0 }) => {
    const d = i > 0 ? Math.max(0, Math.min(100, (l / i) * 100)) : 0;
    return f.jsxs('div', {
      className: Li.row,
      children: [
        r ? f.jsx('span', { className: Li.label, children: r }) : null,
        f.jsx('div', {
          className: Li.track,
          children: f.jsx('div', {
            className: Li.fill,
            style: { width: `${d}%`, backgroundColor: o },
          }),
        }),
        c
          ? f.jsxs('span', {
              className: Li.value,
              children: [Math.max(0, Math.round(l)), '/', Math.round(i)],
            })
          : null,
      ],
    });
  },
  Il = {
    skill_power_slash: {
      id: 'skill_power_slash',
      name: 'パワースラッシュ',
      tree: 'base',
      tpCost: (l) => 3 + l,
      element: 'slash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 1.4 + 0.2 * l }],
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
          modifier: (l) => 1.2 + 0.05 * l,
          turns: 3,
          stackGroup: 'defBuff',
        },
      ],
    },
    skill_shield_bash: {
      id: 'skill_shield_bash',
      name: 'シールドバッシュ',
      tree: 'base',
      tpCost: (l) => 3 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 1 + 0.15 * l },
        { kind: 'ailment', ailment: 'paralysis', chance: (l) => 0.2 + 0.05 * l, turns: 2 },
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
        { kind: 'decoy', weight: (l) => 2 + l, turns: 2 },
      ],
    },
    skill_fire_bolt: {
      id: 'skill_fire_bolt',
      name: 'ファイアボルト',
      tree: 'base',
      tpCost: (l) => 4 + l,
      element: 'fire',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.5 + 0.25 * l }],
    },
    skill_ice_bolt: {
      id: 'skill_ice_bolt',
      name: 'アイスボルト',
      tree: 'base',
      tpCost: (l) => 4 + l,
      element: 'ice',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.5 + 0.25 * l }],
    },
    skill_aimed_shot: {
      id: 'skill_aimed_shot',
      name: '狙撃',
      tree: 'base',
      tpCost: (l) => 3 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 1.3 + 0.2 * l }],
    },
    skill_spread_shot: {
      id: 'skill_spread_shot',
      name: '拡散射撃',
      tree: 'base',
      tpCost: (l) => 5 + l,
      element: 'pierce',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.8 + 0.12 * l }],
    },
    skill_leg_snipe: {
      id: 'skill_leg_snipe',
      name: '脚封じの矢',
      tree: 'base',
      tpCost: (l) => 4 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 1 + 0.15 * l },
        { kind: 'ailment', ailment: 'legBind', chance: (l) => 0.35 + 0.05 * l, turns: 3 },
      ],
    },
    skill_arm_snipe: {
      id: 'skill_arm_snipe',
      name: '腕封じの矢',
      tree: 'base',
      tpCost: (l) => 4 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 1 + 0.15 * l },
        { kind: 'ailment', ailment: 'armBind', chance: (l) => 0.35 + 0.05 * l, turns: 3 },
      ],
    },
    skill_head_snipe: {
      id: 'skill_head_snipe',
      name: '頭封じの矢',
      tree: 'base',
      tpCost: (l) => 4 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 1 + 0.15 * l },
        { kind: 'ailment', ailment: 'headBind', chance: (l) => 0.35 + 0.05 * l, turns: 3 },
      ],
    },
    skill_summon_wolf: {
      id: 'skill_summon_wolf',
      name: '狼を召喚',
      tree: 'base',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_wolf' }],
    },
    skill_summon_bulwark: {
      id: 'skill_summon_bulwark',
      name: '石像を召喚',
      tree: 'base',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_bulwark' }],
    },
    skill_summon_familiar: {
      id: 'skill_summon_familiar',
      name: '使い魔を召喚',
      tree: 'base',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_familiar' }],
    },
    skill_cleave: {
      id: 'skill_cleave',
      name: 'なぎ払い',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'slash',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.7 + 0.12 * l }],
    },
    skill_volt_bolt: {
      id: 'skill_volt_bolt',
      name: 'ボルトショック',
      tree: 'master',
      tpCost: (l) => 4 + l,
      element: 'volt',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.5 + 0.25 * l }],
    },
    skill_heal: {
      id: 'skill_heal',
      name: 'ヒール',
      tree: 'base',
      tpCost: (l) => 4 + l,
      element: 'almighty',
      target: 'allyOne',
      effects: [{ kind: 'heal', amount: (l) => 40 + 20 * l }],
    },
    skill_mass_heal: {
      id: 'skill_mass_heal',
      name: 'マスヒール',
      tree: 'base',
      tpCost: (l) => 8 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'heal', amount: (l) => 25 + 15 * l }],
    },
    skill_protect_hymn: {
      id: 'skill_protect_hymn',
      name: '守りの聖歌',
      tree: 'base',
      tpCost: () => 6,
      element: 'almighty',
      target: 'allyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'mdef',
          modifier: (l) => 1.2 + 0.05 * l,
          turns: 3,
          stackGroup: 'defBuff',
        },
      ],
    },
    skill_war_dance: {
      id: 'skill_war_dance',
      name: '戦いの舞',
      tree: 'base',
      tpCost: () => 6,
      element: 'almighty',
      target: 'allyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'patk',
          modifier: (l) => 1.2 + 0.05 * l,
          turns: 3,
          stackGroup: 'atkBuff',
        },
      ],
    },
    skill_evasion_dance: {
      id: 'skill_evasion_dance',
      name: '回避の舞',
      tree: 'base',
      tpCost: () => 6,
      element: 'almighty',
      target: 'allyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'eva',
          modifier: (l) => 1.2 + 0.05 * l,
          turns: 3,
          stackGroup: 'evaBuff',
        },
      ],
    },
    skill_weaken_song: {
      id: 'skill_weaken_song',
      name: '弱体の歌',
      tree: 'base',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'patk',
          modifier: (l) => 0.85 - 0.03 * l,
          turns: 3,
          stackGroup: 'atkDebuff',
        },
      ],
    },
    skill_triple_strike: {
      id: 'skill_triple_strike',
      name: '三段突き',
      tree: 'base',
      tpCost: (l) => 4 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.7 + 0.1 * l, hits: 3 }],
    },
    skill_focus_ki: {
      id: 'skill_focus_ki',
      name: '練気',
      tree: 'base',
      tpCost: () => 4,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'buff',
          stat: 'patk',
          modifier: (l) => 1.3 + 0.05 * l,
          turns: 3,
          stackGroup: 'atkBuff',
        },
      ],
    },
    skill_iron_body: {
      id: 'skill_iron_body',
      name: '鉄身',
      tree: 'base',
      tpCost: () => 4,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'buff',
          stat: 'pdef',
          modifier: (l) => 1.4 + 0.05 * l,
          turns: 3,
          stackGroup: 'defBuff',
        },
      ],
    },
    skill_venom_hex: {
      id: 'skill_venom_hex',
      name: '毒の呪',
      tree: 'base',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'int', power: (l) => 0.8 + 0.1 * l },
        { kind: 'ailment', ailment: 'poison', chance: (l) => 0.5 + 0.05 * l, turns: 3 },
      ],
    },
    skill_sleep_hex: {
      id: 'skill_sleep_hex',
      name: '眠りの呪',
      tree: 'base',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'ailment', ailment: 'sleep', chance: (l) => 0.35 + 0.03 * l, turns: 2 }],
    },
    skill_weaken_hex: {
      id: 'skill_weaken_hex',
      name: '魔弱の呪',
      tree: 'base',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [
        {
          kind: 'buff',
          stat: 'matk',
          modifier: (l) => 0.8 - 0.03 * l,
          turns: 3,
          stackGroup: 'matkDebuff',
        },
      ],
    },
    skill_chain_slash: {
      id: 'skill_chain_slash',
      name: '連刃の構え',
      tree: 'master',
      tpCost: () => 5,
      element: 'slash',
      target: 'self',
      effects: [{ kind: 'chase', statBase: 'str', power: (l) => 0.6 + 0.1 * l, turns: 3 }],
    },
    skill_riposte: {
      id: 'skill_riposte',
      name: '反攻の構え',
      tree: 'master',
      tpCost: () => 5,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'counter',
          chance: (l) => 0.4 + 0.05 * l,
          power: (l) => 1 + 0.1 * l,
          statBase: 'str',
          turns: 3,
        },
      ],
    },
    skill_line_guard: {
      id: 'skill_line_guard',
      name: 'ラインガード',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'barrier', absorb: (l) => 30 + 15 * l, turns: 2 }],
    },
    skill_counter_guard: {
      id: 'skill_counter_guard',
      name: 'カウンターガード',
      tree: 'master',
      tpCost: () => 5,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'counter',
          chance: (l) => 0.5 + 0.04 * l,
          power: (l) => 1.1 + 0.1 * l,
          statBase: 'str',
          turns: 3,
        },
      ],
    },
    skill_fire_storm: {
      id: 'skill_fire_storm',
      name: 'ファイアストーム',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'fire',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 0.9 + 0.15 * l }],
    },
    skill_first_aid: {
      id: 'skill_first_aid',
      name: '救護指示',
      tree: 'master',
      tpCost: (l) => 4 + l,
      element: 'almighty',
      target: 'allyOne',
      effects: [{ kind: 'heal', amount: (l) => 30 + 15 * l }],
    },
    skill_refresh_herb: {
      id: 'skill_refresh_herb',
      name: 'リフレシュハーブ',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'cleanse' }],
    },
    skill_poison_smoke: {
      id: 'skill_poison_smoke',
      name: 'ポイズンスモーク',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'ailment', ailment: 'poison', chance: (l) => 0.4 + 0.04 * l, turns: 3 }],
    },
    skill_guard_dance: {
      id: 'skill_guard_dance',
      name: '守りの舞',
      tree: 'master',
      tpCost: () => 6,
      element: 'almighty',
      target: 'allyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'pdef',
          modifier: (l) => 1.2 + 0.05 * l,
          turns: 3,
          stackGroup: 'defBuff',
        },
      ],
    },
    skill_healing_song: {
      id: 'skill_healing_song',
      name: '癒しの歌',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'heal', amount: (l) => 18 + 10 * l }],
    },
    skill_arm_break: {
      id: 'skill_arm_break',
      name: 'アームブレイク',
      tree: 'master',
      tpCost: (l) => 4 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 1 + 0.15 * l },
        { kind: 'ailment', ailment: 'armBind', chance: (l) => 0.4 + 0.05 * l, turns: 3 },
      ],
    },
    skill_cross_counter: {
      id: 'skill_cross_counter',
      name: 'クロスカウンター',
      tree: 'master',
      tpCost: () => 5,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'counter',
          chance: (l) => 0.5 + 0.04 * l,
          power: (l) => 1.3 + 0.1 * l,
          statBase: 'str',
          turns: 3,
        },
      ],
    },
    skill_blind_hex: {
      id: 'skill_blind_hex',
      name: '盲目の呪',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'ailment', ailment: 'blind', chance: (l) => 0.35 + 0.03 * l, turns: 3 }],
    },
    skill_armor_hex: {
      id: 'skill_armor_hex',
      name: '鎧弱の呪',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [
        {
          kind: 'buff',
          stat: 'pdef',
          modifier: (l) => 0.8 - 0.03 * l,
          turns: 3,
          stackGroup: 'pdefDebuff',
        },
      ],
    },
    skill_call_wraith: {
      id: 'skill_call_wraith',
      name: '死霊召喚',
      tree: 'base',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_wraith' }],
    },
    skill_soul_barrier: {
      id: 'skill_soul_barrier',
      name: '無慈悲な盾',
      tree: 'base',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'barrier', absorb: (l) => 25 + 12 * l, turns: 2 }],
    },
    skill_call_sentinel: {
      id: 'skill_call_sentinel',
      name: '亡者の壁',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_revenant' }],
    },
    skill_soul_burst: {
      id: 'skill_soul_burst',
      name: '死霊爆裂',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 0.9 + 0.15 * l }],
    },
    skill_cleanse_draft: {
      id: 'skill_cleanse_draft',
      name: '解毒の秘薬',
      tree: 'title',
      tpCost: (l) => 4 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'cleanse' }],
    },
    skill_counter_throw: {
      id: 'skill_counter_throw',
      name: '当て身投げ',
      tree: 'title',
      tpCost: () => 5,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'counter',
          chance: (l) => 0.45 + 0.05 * l,
          power: (l) => 1.2 + 0.1 * l,
          statBase: 'str',
          turns: 3,
        },
      ],
    },
    skill_warrior_double_slash: {
      id: 'skill_warrior_double_slash',
      name: 'ダブルスラッシュ',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'slash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.6 + 0.1 * l, hits: 2 }],
    },
    skill_warrior_heavy_swing: {
      id: 'skill_warrior_heavy_swing',
      name: 'ヘビースイング',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 1.5 + 0.2 * l },
        { kind: 'ailment', ailment: 'headBind', chance: (l) => 0.35 + 0.05 * l, turns: 2 },
      ],
    },
    skill_warrior_war_cry: {
      id: 'skill_warrior_war_cry',
      name: '雄叫び',
      tree: 'base',
      tpCost: () => 4,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'buff',
          stat: 'patk',
          modifier: (l) => 1.3 + 0.05 * l,
          turns: 3,
          stackGroup: 'atkBuff',
        },
      ],
    },
    skill_warrior_blade_storm: {
      id: 'skill_warrior_blade_storm',
      name: 'ブレイドストーム',
      tree: 'master',
      tpCost: (l) => 8 + l,
      element: 'slash',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 1.1 + 0.18 * l }],
    },
    skill_warrior_executioner: {
      id: 'skill_warrior_executioner',
      name: 'エグゼキューション',
      tree: 'master',
      tpCost: (l) => 8 + l,
      element: 'slash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 2 + 0.3 * l }],
    },
    skill_warrior_t_rampage: {
      id: 'skill_warrior_t_rampage',
      name: 'ランページ',
      tree: 'title',
      tpCost: (l) => 8 + l,
      element: 'slash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.6 + 0.1 * l, hits: 3 }],
    },
    skill_warrior_t_overwatch: {
      id: 'skill_warrior_t_overwatch',
      name: '哨戒の構え',
      tree: 'title',
      tpCost: () => 5,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'counter',
          chance: (l) => 0.4 + 0.05 * l,
          power: (l) => 1.1 + 0.1 * l,
          statBase: 'str',
          turns: 3,
        },
      ],
    },
    skill_guardian_shield_press: {
      id: 'skill_guardian_shield_press',
      name: 'シールドプレス',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'bash',
      target: 'enemyAll',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 0.85 + 0.13 * l },
        { kind: 'ailment', ailment: 'paralysis', chance: (l) => 0.3 + 0.03 * l, turns: 2 },
      ],
    },
    skill_guardian_taunt_roar: {
      id: 'skill_guardian_taunt_roar',
      name: '威圧の咆哮',
      tree: 'master',
      tpCost: () => 5,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'buff',
          stat: 'pdef',
          modifier: (l) => 1.3 + 0.05 * l,
          turns: 3,
          stackGroup: 'defBuff',
        },
        { kind: 'decoy', weight: (l) => 2 + l, turns: 3 },
      ],
    },
    skill_guardian_aegis: {
      id: 'skill_guardian_aegis',
      name: 'イージスウォール',
      tree: 'master',
      tpCost: (l) => 8 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'barrier', absorb: (l) => 25 + 12 * l, turns: 3 }],
    },
    skill_guardian_retribution: {
      id: 'skill_guardian_retribution',
      name: 'リトリビューション',
      tree: 'master',
      tpCost: () => 6,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'counter',
          chance: (l) => 0.4 + 0.05 * l,
          power: (l) => 1.1 + 0.1 * l,
          statBase: 'str',
          turns: 3,
        },
      ],
    },
    skill_guardian_t_last_bastion: {
      id: 'skill_guardian_t_last_bastion',
      name: 'ラストバスティオン',
      tree: 'title',
      tpCost: (l) => 8 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'barrier', absorb: (l) => 40 + 15 * l, turns: 3 }],
    },
    skill_guardian_t_lance_charge: {
      id: 'skill_guardian_t_lance_charge',
      name: 'ランスチャージ',
      tree: 'title',
      tpCost: (l) => 5 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 1.5 + 0.2 * l }],
    },
    skill_mage_ice_storm: {
      id: 'skill_mage_ice_storm',
      name: 'アイスストーム',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'ice',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 0.85 + 0.13 * l }],
    },
    skill_mage_volt_storm: {
      id: 'skill_mage_volt_storm',
      name: 'ボルトストーム',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'volt',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 0.85 + 0.13 * l }],
    },
    skill_mage_focus: {
      id: 'skill_mage_focus',
      name: '魔力集中',
      tree: 'base',
      tpCost: () => 4,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'buff',
          stat: 'matk',
          modifier: (l) => 1.3 + 0.05 * l,
          turns: 3,
          stackGroup: 'matkBuff',
        },
      ],
    },
    skill_mage_meteor: {
      id: 'skill_mage_meteor',
      name: 'メテオ',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'fire',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.1 + 0.18 * l }],
    },
    skill_mage_thunderbolt: {
      id: 'skill_mage_thunderbolt',
      name: 'サンダーボルト',
      tree: 'master',
      tpCost: (l) => 8 + l,
      element: 'volt',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 2 + 0.3 * l }],
    },
    skill_mage_t_hellfire: {
      id: 'skill_mage_t_hellfire',
      name: 'ヘルファイア',
      tree: 'title',
      tpCost: (l) => 8 + l,
      element: 'fire',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 2 + 0.3 * l }],
    },
    skill_mage_t_mana_surge: {
      id: 'skill_mage_t_mana_surge',
      name: 'マナサージ',
      tree: 'title',
      tpCost: () => 0,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'restoreTp', amount: (l) => 8 + 4 * l }],
    },
    skill_ranger_piercing_arrow: {
      id: 'skill_ranger_piercing_arrow',
      name: '貫通の矢',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 1.5 + 0.2 * l }],
    },
    skill_ranger_charged_shot: {
      id: 'skill_ranger_charged_shot',
      name: 'チャージショット',
      tree: 'master',
      tpCost: (l) => 8 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 2 + 0.3 * l }],
    },
    skill_ranger_rain_of_arrows: {
      id: 'skill_ranger_rain_of_arrows',
      name: '矢の雨',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'pierce',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.85 + 0.13 * l }],
    },
    skill_ranger_pin_shot: {
      id: 'skill_ranger_pin_shot',
      name: '足止めの矢',
      tree: 'master',
      tpCost: (l) => 4 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 1 + 0.15 * l },
        { kind: 'ailment', ailment: 'legBind', chance: (l) => 0.35 + 0.05 * l, turns: 3 },
      ],
    },
    skill_ranger_summon_falcon: {
      id: 'skill_ranger_summon_falcon',
      name: '鷹を召喚',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_familiar' }],
    },
    skill_ranger_t_snipe: {
      id: 'skill_ranger_t_snipe',
      name: '一矢必中',
      tree: 'title',
      tpCost: (l) => 8 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 2 + 0.3 * l }],
    },
    skill_ranger_t_camouflage: {
      id: 'skill_ranger_t_camouflage',
      name: '韜晦',
      tree: 'title',
      tpCost: () => 5,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'buff',
          stat: 'eva',
          modifier: (l) => 1.3 + 0.05 * l,
          turns: 3,
          stackGroup: 'evaBuff',
        },
      ],
    },
    skill_medic_full_heal: {
      id: 'skill_medic_full_heal',
      name: 'フルヒール',
      tree: 'master',
      tpCost: (l) => 8 + l,
      element: 'almighty',
      target: 'allyOne',
      effects: [{ kind: 'heal', amount: (l) => 40 + 20 * l }],
    },
    skill_medic_party_cure: {
      id: 'skill_medic_party_cure',
      name: 'パーティキュア',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'heal', amount: (l) => 25 + 15 * l }],
    },
    skill_medic_tp_tonic: {
      id: 'skill_medic_tp_tonic',
      name: 'TPトニック',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'restoreTp', amount: (l) => 8 + 4 * l }],
    },
    skill_medic_blind_powder: {
      id: 'skill_medic_blind_powder',
      name: '目潰しの粉',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'ailment', ailment: 'blind', chance: (l) => 0.3 + 0.03 * l, turns: 3 }],
    },
    skill_medic_t_revive_light: {
      id: 'skill_medic_t_revive_light',
      name: '蘇生の光',
      tree: 'title',
      tpCost: (l) => 10 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'heal', amount: (l) => 30 + 18 * l }],
    },
    skill_medic_t_stimulant: {
      id: 'skill_medic_t_stimulant',
      name: '気付け薬',
      tree: 'title',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'restoreTp', amount: (l) => 8 + 4 * l }],
    },
    skill_dancer_blade_waltz: {
      id: 'skill_dancer_blade_waltz',
      name: '剣舞の円',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'slash',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.85 + 0.13 * l }],
    },
    skill_dancer_inspire_dance: {
      id: 'skill_dancer_inspire_dance',
      name: '鼓舞の舞',
      tree: 'master',
      tpCost: () => 6,
      element: 'almighty',
      target: 'allyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'matk',
          modifier: (l) => 1.2 + 0.05 * l,
          turns: 3,
          stackGroup: 'matkBuff',
        },
      ],
    },
    skill_dancer_grace_song: {
      id: 'skill_dancer_grace_song',
      name: '加護の歌',
      tree: 'master',
      tpCost: () => 6,
      element: 'almighty',
      target: 'allyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'mdef',
          modifier: (l) => 1.2 + 0.05 * l,
          turns: 3,
          stackGroup: 'mdefBuff',
        },
      ],
    },
    skill_dancer_revival_dance: {
      id: 'skill_dancer_revival_dance',
      name: '蘇生の舞',
      tree: 'master',
      tpCost: (l) => 8 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'heal', amount: (l) => 25 + 15 * l }],
    },
    skill_dancer_t_finale: {
      id: 'skill_dancer_t_finale',
      name: '剣の終幕',
      tree: 'title',
      tpCost: (l) => 8 + l,
      element: 'slash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 2 + 0.3 * l }],
    },
    skill_dancer_t_lullaby: {
      id: 'skill_dancer_t_lullaby',
      name: '子守唄',
      tree: 'title',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'ailment', ailment: 'sleep', chance: (l) => 0.3 + 0.03 * l, turns: 2 }],
    },
    skill_monk_palm_strike: {
      id: 'skill_monk_palm_strike',
      name: '崩拳',
      tree: 'base',
      tpCost: (l) => 3 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 1.2 + 0.18 * l }],
    },
    skill_monk_leg_sweep: {
      id: 'skill_monk_leg_sweep',
      name: '足払い',
      tree: 'base',
      tpCost: (l) => 3 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 1 + 0.15 * l },
        { kind: 'ailment', ailment: 'legBind', chance: (l) => 0.35 + 0.05 * l, turns: 3 },
      ],
    },
    skill_monk_flurry: {
      id: 'skill_monk_flurry',
      name: '連弾',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.6 + 0.1 * l, hits: 4 }],
    },
    skill_monk_head_smash: {
      id: 'skill_monk_head_smash',
      name: '当て身打ち',
      tree: 'master',
      tpCost: (l) => 4 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 1 + 0.15 * l },
        { kind: 'ailment', ailment: 'headBind', chance: (l) => 0.4 + 0.05 * l, turns: 3 },
      ],
    },
    skill_monk_rising_dragon: {
      id: 'skill_monk_rising_dragon',
      name: '昇龍奥義',
      tree: 'master',
      tpCost: (l) => 8 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 2 + 0.3 * l }],
    },
    skill_grappler_t_chain_throw: {
      id: 'skill_grappler_t_chain_throw',
      name: '連環投げ',
      tree: 'title',
      tpCost: () => 5,
      element: 'bash',
      target: 'self',
      effects: [{ kind: 'chase', statBase: 'str', power: (l) => 0.6 + 0.1 * l, turns: 3 }],
    },
    skill_zen_t_mountain_stance: {
      id: 'skill_zen_t_mountain_stance',
      name: '不動明王の構え',
      tree: 'title',
      tpCost: (l) => 4 + l,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'buff',
          stat: 'pdef',
          modifier: (l) => 1.3 + 0.05 * l,
          turns: 3,
          stackGroup: 'defBuff',
        },
        { kind: 'decoy', weight: (l) => 2 + l, turns: 3 },
      ],
    },
    skill_zen_t_meditation: {
      id: 'skill_zen_t_meditation',
      name: '瞑想',
      tree: 'title',
      tpCost: () => 0,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'restoreTp', amount: (l) => 8 + 4 * l }],
    },
    skill_hexer_paralyze_hex: {
      id: 'skill_hexer_paralyze_hex',
      name: '麻痺の呪',
      tree: 'base',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'int', power: (l) => 0.8 + 0.1 * l },
        { kind: 'ailment', ailment: 'paralysis', chance: (l) => 0.35 + 0.05 * l, turns: 2 },
      ],
    },
    skill_hexer_eva_hex: {
      id: 'skill_hexer_eva_hex',
      name: '鈍重の呪',
      tree: 'base',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'eva',
          modifier: (l) => 0.85 - 0.03 * l,
          turns: 3,
          stackGroup: 'evaDebuff',
        },
      ],
    },
    skill_hexer_acc_hex: {
      id: 'skill_hexer_acc_hex',
      name: '失明の呪',
      tree: 'base',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [
        {
          kind: 'buff',
          stat: 'acc',
          modifier: (l) => 0.85 - 0.03 * l,
          turns: 3,
          stackGroup: 'accDebuff',
        },
      ],
    },
    skill_hexer_mass_venom: {
      id: 'skill_hexer_mass_venom',
      name: '瘴気の呪',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'ailment', ailment: 'poison', chance: (l) => 0.3 + 0.03 * l, turns: 3 }],
    },
    skill_hexer_doom_hex: {
      id: 'skill_hexer_doom_hex',
      name: '崩呪',
      tree: 'master',
      tpCost: (l) => 8 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'int', power: (l) => 2 + 0.3 * l },
        { kind: 'ailment', ailment: 'paralysis', chance: (l) => 0.35 + 0.05 * l, turns: 2 },
      ],
    },
    skill_hexer_curse_field: {
      id: 'skill_hexer_curse_field',
      name: '呪縛の領域',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'patk',
          modifier: (l) => 0.85 - 0.03 * l,
          turns: 3,
          stackGroup: 'atkDebuff',
        },
      ],
    },
    skill_plague_t_pandemic: {
      id: 'skill_plague_t_pandemic',
      name: '疫病の散布',
      tree: 'title',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [
        { kind: 'damage', statBase: 'int', power: (l) => 0.7 + 0.12 * l },
        { kind: 'ailment', ailment: 'poison', chance: (l) => 0.3 + 0.03 * l, turns: 3 },
      ],
    },
    skill_plague_t_wither: {
      id: 'skill_plague_t_wither',
      name: '衰弱の呪',
      tree: 'title',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'matk',
          modifier: (l) => 0.85 - 0.03 * l,
          turns: 3,
          stackGroup: 'matkDebuff',
        },
      ],
    },
    skill_warlock_t_dark_bolt: {
      id: 'skill_warlock_t_dark_bolt',
      name: '闇撃の呪',
      tree: 'title',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.5 + 0.2 * l }],
    },
    skill_summoner_call_familiar: {
      id: 'skill_summoner_call_familiar',
      name: '使い魔召喚',
      tree: 'base',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_familiar' }],
    },
    skill_summoner_soul_drain: {
      id: 'skill_summoner_soul_drain',
      name: '吸魂',
      tree: 'base',
      tpCost: (l) => 3 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.2 + 0.18 * l }],
    },
    skill_summoner_tp_offering: {
      id: 'skill_summoner_tp_offering',
      name: '供物の儀',
      tree: 'master',
      tpCost: () => 0,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'restoreTp', amount: (l) => 8 + 4 * l }],
    },
    skill_summoner_grave_chill: {
      id: 'skill_summoner_grave_chill',
      name: '冥府の冷気',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'ice',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'int', power: (l) => 1.5 + 0.2 * l },
        { kind: 'ailment', ailment: 'paralysis', chance: (l) => 0.35 + 0.05 * l, turns: 2 },
      ],
    },
    skill_summoner_oblivion: {
      id: 'skill_summoner_oblivion',
      name: '滅魂爆裂',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.1 + 0.18 * l }],
    },
    skill_summoner_spirit_chase: {
      id: 'skill_summoner_spirit_chase',
      name: '霊撃連鎖',
      tree: 'master',
      tpCost: () => 5,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'chase', statBase: 'int', power: (l) => 0.6 + 0.1 * l, turns: 3 }],
    },
    skill_necromancer_t_call_revenant: {
      id: 'skill_necromancer_t_call_revenant',
      name: '亡者召喚',
      tree: 'title',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_revenant' }],
    },
    skill_necromancer_t_death_pulse: {
      id: 'skill_necromancer_t_death_pulse',
      name: '死波',
      tree: 'title',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 0.85 + 0.13 * l }],
    },
    skill_puppeteer_t_aegis: {
      id: 'skill_puppeteer_t_aegis',
      name: '傀儡の盾',
      tree: 'title',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'barrier', absorb: (l) => 25 + 12 * l, turns: 3 }],
    },
    skill_warrior_flame_blade: {
      id: 'skill_warrior_flame_blade',
      name: 'フレイムブレイド',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'fire',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 1.5 + 0.2 * l }],
    },
    skill_warrior_whirlwind: {
      id: 'skill_warrior_whirlwind',
      name: 'ワールウィンド',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'bash',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.85 + 0.13 * l }],
    },
    skill_warrior_armor_crush: {
      id: 'skill_warrior_armor_crush',
      name: 'アーマークラッシュ',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 1.5 + 0.2 * l },
        { kind: 'ailment', ailment: 'armBind', chance: (l) => 0.35 + 0.05 * l, turns: 2 },
      ],
    },
    skill_warrior_blade_dance: {
      id: 'skill_warrior_blade_dance',
      name: 'ブレイドダンス',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'slash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.6 + 0.1 * l, hits: 3 }],
    },
    skill_warrior_savage_blow: {
      id: 'skill_warrior_savage_blow',
      name: 'サベージブロウ',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 2.4 + 0.35 * l }],
    },
    skill_warrior_meteor_strike: {
      id: 'skill_warrior_meteor_strike',
      name: 'メテオストライク',
      tree: 'master',
      tpCost: (l) => 12 + l,
      element: 'slash',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 1.3 + 0.2 * l }],
    },
    skill_guardian_shield_throw: {
      id: 'skill_guardian_shield_throw',
      name: 'シールドスロー',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'bash',
      target: 'enemyAll',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 0.85 + 0.13 * l },
        { kind: 'ailment', ailment: 'paralysis', chance: (l) => 0.3 + 0.03 * l, turns: 2 },
      ],
    },
    skill_guardian_spear_thrust: {
      id: 'skill_guardian_spear_thrust',
      name: 'スピアスラスト',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 1.5 + 0.2 * l }],
    },
    skill_guardian_bulwark_stance: {
      id: 'skill_guardian_bulwark_stance',
      name: 'バルワークの構え',
      tree: 'master',
      tpCost: (l) => 4 + l,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'buff',
          stat: 'pdef',
          modifier: (l) => 1.3 + 0.05 * l,
          turns: 3,
          stackGroup: 'defBuff',
        },
        { kind: 'decoy', weight: (l) => 2 + l, turns: 3 },
      ],
    },
    skill_guardian_iron_counter: {
      id: 'skill_guardian_iron_counter',
      name: 'アイアンカウンター',
      tree: 'master',
      tpCost: () => 6,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'counter',
          chance: (l) => 0.5 + 0.04 * l,
          power: (l) => 1.3 + 0.1 * l,
          statBase: 'str',
          turns: 3,
        },
      ],
    },
    skill_guardian_phalanx: {
      id: 'skill_guardian_phalanx',
      name: 'ファランクス',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'barrier', absorb: (l) => 30 + 15 * l, turns: 2 }],
    },
    skill_guardian_dragon_lance: {
      id: 'skill_guardian_dragon_lance',
      name: 'ドラゴンランス',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 2.4 + 0.35 * l }],
    },
    skill_guardian_great_wall: {
      id: 'skill_guardian_great_wall',
      name: 'グレートウォール',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'barrier', absorb: (l) => 40 + 15 * l, turns: 3 }],
    },
    skill_mage_fire_lance: {
      id: 'skill_mage_fire_lance',
      name: 'ファイアランス',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'fire',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.5 + 0.2 * l }],
    },
    skill_mage_frost_lance: {
      id: 'skill_mage_frost_lance',
      name: 'フロストランス',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'ice',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'int', power: (l) => 1.5 + 0.2 * l },
        { kind: 'ailment', ailment: 'paralysis', chance: (l) => 0.35 + 0.05 * l, turns: 2 },
      ],
    },
    skill_mage_volt_lance: {
      id: 'skill_mage_volt_lance',
      name: 'ボルトランス',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'volt',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.5 + 0.2 * l }],
    },
    skill_mage_mana_charge: {
      id: 'skill_mage_mana_charge',
      name: 'マナチャージ',
      tree: 'master',
      tpCost: (l) => 4 + l,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'restoreTp', amount: (l) => 6 + 3 * l }],
    },
    skill_mage_absolute_zero: {
      id: 'skill_mage_absolute_zero',
      name: 'アブソリュートゼロ',
      tree: 'master',
      tpCost: (l) => 12 + l,
      element: 'ice',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.3 + 0.2 * l }],
    },
    skill_mage_ragnarok: {
      id: 'skill_mage_ragnarok',
      name: 'ラグナロク',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 2.4 + 0.35 * l }],
    },
    skill_ranger_double_shot: {
      id: 'skill_ranger_double_shot',
      name: 'ダブルショット',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.6 + 0.1 * l, hits: 2 }],
    },
    skill_ranger_sky_volley: {
      id: 'skill_ranger_sky_volley',
      name: '空裂の斉射',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'pierce',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 1.3 + 0.2 * l }],
    },
    skill_ranger_apollo_shot: {
      id: 'skill_ranger_apollo_shot',
      name: '滅びの一矢',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 2.4 + 0.35 * l }],
    },
    skill_ranger_binding_volley: {
      id: 'skill_ranger_binding_volley',
      name: '封鎖の斉射',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'pierce',
      target: 'enemyAll',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 0.85 + 0.13 * l },
        { kind: 'ailment', ailment: 'armBind', chance: (l) => 0.3 + 0.03 * l, turns: 2 },
      ],
    },
    skill_ranger_falconry: {
      id: 'skill_ranger_falconry',
      name: '鷹匠の絆',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_falcon' }],
    },
    skill_ranger_hunters_mark: {
      id: 'skill_ranger_hunters_mark',
      name: '狩人の照準',
      tree: 'master',
      tpCost: () => 4,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'buff',
          stat: 'acc',
          modifier: (l) => 1.3 + 0.05 * l,
          turns: 3,
          stackGroup: 'accBuff',
        },
      ],
    },
    skill_ranger_field_dressing: {
      id: 'skill_ranger_field_dressing',
      name: '応急手当',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'cleanse' }],
    },
    skill_ranger_volley_chase: {
      id: 'skill_ranger_volley_chase',
      name: '追い討ちの構え',
      tree: 'master',
      tpCost: () => 5,
      element: 'pierce',
      target: 'self',
      effects: [{ kind: 'chase', statBase: 'str', power: (l) => 0.6 + 0.1 * l, turns: 3 }],
    },
    skill_medic_regen_balm: {
      id: 'skill_medic_regen_balm',
      name: 'リジェネバーム',
      tree: 'master',
      tpCost: (l) => 8 + l,
      element: 'almighty',
      target: 'allyOne',
      effects: [{ kind: 'heal', amount: (l) => 40 + 20 * l }],
    },
    skill_medic_salvation: {
      id: 'skill_medic_salvation',
      name: 'サルベーション',
      tree: 'master',
      tpCost: (l) => 12 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'heal', amount: (l) => 25 + 15 * l }],
    },
    skill_medic_panacea: {
      id: 'skill_medic_panacea',
      name: 'パナケイア',
      tree: 'master',
      tpCost: (l) => 12 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'heal', amount: (l) => 25 + 15 * l }, { kind: 'cleanse' }],
    },
    skill_medic_sleep_mist: {
      id: 'skill_medic_sleep_mist',
      name: 'スリープミスト',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'ailment', ailment: 'sleep', chance: (l) => 0.3 + 0.03 * l, turns: 2 }],
    },
    skill_medic_paralysis_powder: {
      id: 'skill_medic_paralysis_powder',
      name: '痺れ粉',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'ailment', ailment: 'paralysis', chance: (l) => 0.3 + 0.03 * l, turns: 2 }],
    },
    skill_medic_immune_hymn: {
      id: 'skill_medic_immune_hymn',
      name: '免疫の聖歌',
      tree: 'master',
      tpCost: () => 6,
      element: 'almighty',
      target: 'allyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'pdef',
          modifier: (l) => 1.2 + 0.05 * l,
          turns: 3,
          stackGroup: 'defBuff',
        },
      ],
    },
    skill_medic_revive_draft: {
      id: 'skill_medic_revive_draft',
      name: '蘇生薬',
      tree: 'master',
      tpCost: (l) => 8 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'restoreTp', amount: (l) => 6 + 3 * l }],
    },
    skill_medic_weakening_smoke: {
      id: 'skill_medic_weakening_smoke',
      name: '衰弱の煙',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'patk',
          modifier: (l) => 0.85 - 0.03 * l,
          turns: 3,
          stackGroup: 'atkDebuff',
        },
      ],
    },
    skill_dancer_chant_of_valor: {
      id: 'skill_dancer_chant_of_valor',
      name: '勇気の歌',
      tree: 'master',
      tpCost: () => 6,
      element: 'almighty',
      target: 'allyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'acc',
          modifier: (l) => 1.2 + 0.05 * l,
          turns: 3,
          stackGroup: 'accBuff',
        },
      ],
    },
    skill_dancer_curse_dance: {
      id: 'skill_dancer_curse_dance',
      name: '呪縛の舞',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'eva',
          modifier: (l) => 0.85 - 0.03 * l,
          turns: 3,
          stackGroup: 'evaDebuff',
        },
      ],
    },
    skill_dancer_storm_waltz: {
      id: 'skill_dancer_storm_waltz',
      name: '嵐の円舞',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'slash',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 1.3 + 0.2 * l }],
    },
    skill_dancer_dual_blade: {
      id: 'skill_dancer_dual_blade',
      name: '双剣の舞',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'slash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.6 + 0.1 * l, hits: 2 }],
    },
    skill_dancer_grand_finale: {
      id: 'skill_dancer_grand_finale',
      name: '大円舞曲',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'heal', amount: (l) => 25 + 15 * l }],
    },
    skill_dancer_blade_chase: {
      id: 'skill_dancer_blade_chase',
      name: '連舞の構え',
      tree: 'master',
      tpCost: () => 5,
      element: 'slash',
      target: 'self',
      effects: [{ kind: 'chase', statBase: 'str', power: (l) => 0.6 + 0.1 * l, turns: 3 }],
    },
    skill_dancer_lullaby_song: {
      id: 'skill_dancer_lullaby_song',
      name: '安らぎの調べ',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'ailment', ailment: 'sleep', chance: (l) => 0.3 + 0.03 * l, turns: 2 }],
    },
    skill_dancer_mana_song: {
      id: 'skill_dancer_mana_song',
      name: '律動の歌',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'restoreTp', amount: (l) => 6 + 3 * l }],
    },
    skill_monk_double_palm: {
      id: 'skill_monk_double_palm',
      name: '双掌打',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.6 + 0.1 * l, hits: 2 }],
    },
    skill_monk_pressure_point: {
      id: 'skill_monk_pressure_point',
      name: '点穴突き',
      tree: 'master',
      tpCost: (l) => 4 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 1 + 0.15 * l },
        { kind: 'ailment', ailment: 'armBind', chance: (l) => 0.35 + 0.05 * l, turns: 3 },
      ],
    },
    skill_monk_whirlwind_kick: {
      id: 'skill_monk_whirlwind_kick',
      name: '旋風脚',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'bash',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.85 + 0.13 * l }],
    },
    skill_monk_ki_guard: {
      id: 'skill_monk_ki_guard',
      name: '気功護身',
      tree: 'base',
      tpCost: () => 4,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'buff',
          stat: 'pdef',
          modifier: (l) => 1.3 + 0.05 * l,
          turns: 3,
          stackGroup: 'defBuff',
        },
      ],
    },
    skill_monk_breathing: {
      id: 'skill_monk_breathing',
      name: '吐納',
      tree: 'master',
      tpCost: (l) => 4 + l,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'restoreTp', amount: (l) => 6 + 3 * l }],
    },
    skill_monk_seven_star: {
      id: 'skill_monk_seven_star',
      name: '七星連撃',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.6 + 0.1 * l, hits: 5 }],
    },
    skill_monk_demon_palm: {
      id: 'skill_monk_demon_palm',
      name: '羅刹掌',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 2.4 + 0.35 * l }],
    },
    skill_hexer_drowsy_hex: {
      id: 'skill_hexer_drowsy_hex',
      name: '微睡の呪',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [{ kind: 'ailment', ailment: 'sleep', chance: (l) => 0.35 + 0.05 * l, turns: 2 }],
    },
    skill_hexer_dark_bolt: {
      id: 'skill_hexer_dark_bolt',
      name: '闇の呪弾',
      tree: 'master',
      tpCost: (l) => 3 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.2 + 0.18 * l }],
    },
    skill_hexer_mass_paralyze: {
      id: 'skill_hexer_mass_paralyze',
      name: '痺れの呪',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'ailment', ailment: 'paralysis', chance: (l) => 0.3 + 0.03 * l, turns: 2 }],
    },
    skill_hexer_def_hex: {
      id: 'skill_hexer_def_hex',
      name: '虚弱の呪',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'pdef',
          modifier: (l) => 0.85 - 0.03 * l,
          turns: 3,
          stackGroup: 'pdefDebuff',
        },
      ],
    },
    skill_hexer_mdef_hex: {
      id: 'skill_hexer_mdef_hex',
      name: '崩魔の呪',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'mdef',
          modifier: (l) => 0.85 - 0.03 * l,
          turns: 3,
          stackGroup: 'mdefDebuff',
        },
      ],
    },
    skill_hexer_nightmare: {
      id: 'skill_hexer_nightmare',
      name: '悪夢の呪',
      tree: 'master',
      tpCost: (l) => 8 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'int', power: (l) => 2 + 0.3 * l },
        { kind: 'ailment', ailment: 'sleep', chance: (l) => 0.35 + 0.05 * l, turns: 2 },
      ],
    },
    skill_hexer_calamity: {
      id: 'skill_hexer_calamity',
      name: '災禍の呪',
      tree: 'master',
      tpCost: (l) => 12 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [
        { kind: 'damage', statBase: 'int', power: (l) => 1.3 + 0.2 * l },
        { kind: 'ailment', ailment: 'poison', chance: (l) => 0.3 + 0.03 * l, turns: 3 },
      ],
    },
    skill_summoner_bone_spear: {
      id: 'skill_summoner_bone_spear',
      name: '骨の槍',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'int', power: (l) => 1.5 + 0.2 * l },
        { kind: 'ailment', ailment: 'paralysis', chance: (l) => 0.35 + 0.05 * l, turns: 2 },
      ],
    },
    skill_summoner_grave_field: {
      id: 'skill_summoner_grave_field',
      name: '墓標の凍土',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'ice',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 0.85 + 0.13 * l }],
    },
    skill_summoner_soul_ward: {
      id: 'skill_summoner_soul_ward',
      name: '霊障の壁',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'barrier', absorb: (l) => 25 + 12 * l, turns: 3 }],
    },
    skill_summoner_spirit_veil: {
      id: 'skill_summoner_spirit_veil',
      name: '霊衣',
      tree: 'base',
      tpCost: () => 4,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'buff',
          stat: 'mdef',
          modifier: (l) => 1.3 + 0.05 * l,
          turns: 3,
          stackGroup: 'defBuff',
        },
      ],
    },
    skill_summoner_necro_bolt: {
      id: 'skill_summoner_necro_bolt',
      name: '死霊弾',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.5 + 0.2 * l }],
    },
    skill_summoner_annihilation: {
      id: 'skill_summoner_annihilation',
      name: '冥滅爆裂',
      tree: 'master',
      tpCost: (l) => 12 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.3 + 0.2 * l }],
    },
    skill_summoner_soul_render: {
      id: 'skill_summoner_soul_render',
      name: '魂喰らい',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 2.4 + 0.35 * l }],
    },
    skill_summoner_call_revenant: {
      id: 'skill_summoner_call_revenant',
      name: '亡者召喚',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_revenant' }],
    },
  },
  Fe = {
    item_potion: {
      id: 'item_potion',
      name: 'やくそう',
      description: 'HP を 30 回復する。',
      category: 'consumable',
      buyPrice: 30,
      useContext: ['battle', 'field'],
      effects: [{ kind: 'heal', amount: () => 30 }],
    },
    item_hi_potion: {
      id: 'item_hi_potion',
      name: 'よいやくそう',
      description: 'HP を 80 回復する。',
      category: 'consumable',
      buyPrice: 90,
      useContext: ['battle', 'field'],
      effects: [{ kind: 'heal', amount: () => 80 }],
    },
    item_tp_herb: {
      id: 'item_tp_herb',
      name: 'まほうのは',
      description: 'TP を 15 回復する。',
      category: 'consumable',
      buyPrice: 40,
      useContext: ['battle', 'field'],
      effects: [{ kind: 'restoreTp', amount: () => 15 }],
    },
    item_return_thread: {
      id: 'item_return_thread',
      name: '帰還の糸',
      description: '使用すると拠点へ帰還する（探索中のみ）。',
      category: 'consumable',
      buyPrice: 50,
      useContext: ['field'],
    },
    item_slime_jelly: {
      id: 'item_slime_jelly',
      name: 'スライムゼリー',
      description: 'スライムの素材。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_rat_tail: {
      id: 'item_rat_tail',
      name: 'ねずみのしっぽ',
      description: 'おおねずみの素材。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_bat_wing: {
      id: 'item_bat_wing',
      name: 'コウモリの翼',
      description: 'どうくつコウモリの素材。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_golem_core: {
      id: 'item_golem_core',
      name: 'ゴーレムの核',
      description: '門番のゴーレムの素材。売ると強力な装備が並ぶ。',
      category: 'material',
      buyPrice: 0,
    },
    item_ore: {
      id: 'item_ore',
      name: '鉄鉱石',
      description: '採掘で得られる鉱石。',
      category: 'material',
      buyPrice: 0,
    },
    item_medic_herb: {
      id: 'item_medic_herb',
      name: '薬の葉',
      description: '採取で得られる薬草。',
      category: 'material',
      buyPrice: 0,
    },
    item_lumber: {
      id: 'item_lumber',
      name: '良質な木材',
      description: '伐採で得られる木材。',
      category: 'material',
      buyPrice: 0,
    },
    item_food_fish: {
      id: 'item_food_fish',
      name: '川魚',
      description: '釣りで得た食材。探索中に食べて HP を 25 回復。',
      category: 'food',
      buyPrice: 0,
      useContext: ['field'],
      effects: [{ kind: 'heal', amount: () => 25 }],
    },
    item_food_nuts: {
      id: 'item_food_nuts',
      name: '木の実',
      description: '収穫で得た食材。探索中に食べて TP を 12 回復。',
      category: 'food',
      buyPrice: 0,
      useContext: ['field'],
      effects: [{ kind: 'restoreTp', amount: () => 12 }],
    },
    item_food_meat: {
      id: 'item_food_meat',
      name: '生肉',
      description: '狩猟で得た食材。探索中に食べて HP を 30 回復。',
      category: 'food',
      buyPrice: 0,
      useContext: ['field'],
      effects: [{ kind: 'heal', amount: () => 30 }],
    },
    item_dish_grilled_fish: {
      id: 'item_dish_grilled_fish',
      name: '焼き魚',
      description: '川魚を焼いた料理。探索中に食べて HP を 70 回復。',
      category: 'food',
      buyPrice: 0,
      useContext: ['field'],
      effects: [{ kind: 'heal', amount: () => 70 }],
    },
    item_dish_nut_platter: {
      id: 'item_dish_nut_platter',
      name: '木の実の盛り合わせ',
      description: '木の実を調理した一品。探索中に食べて TP を 35 回復。',
      category: 'food',
      buyPrice: 0,
      useContext: ['field'],
      effects: [{ kind: 'restoreTp', amount: () => 35 }],
    },
    item_dish_grilled_meat: {
      id: 'item_dish_grilled_meat',
      name: '焼き肉',
      description: '生肉を焼いた料理。探索中に食べて HP を 90 回復。',
      category: 'food',
      buyPrice: 0,
      useContext: ['field'],
      effects: [{ kind: 'heal', amount: () => 90 }],
    },
    item_mat_t0_soft_pelt: {
      id: 'item_mat_t0_soft_pelt',
      name: 'やわらかな毛皮',
      description: '森の小動物の素材。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t0_spore_cap: {
      id: 'item_mat_t0_spore_cap',
      name: 'ひかるかさ',
      description: '光るきのこの素材。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t0_faint_ember: {
      id: 'item_mat_t0_faint_ember',
      name: 'かすかな残り火',
      description: '亡霊が残した素材。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t0_great_antler: {
      id: 'item_mat_t0_great_antler',
      name: 'りっぱな角',
      description: '森の大型獣の素材。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t0_chitin_plate: {
      id: 'item_mat_t0_chitin_plate',
      name: '硬い甲殻板',
      description: '洞窟の蟲の素材。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t1_coarse_hide: {
      id: 'item_mat_t1_coarse_hide',
      name: 'あらい獣皮',
      description: '山岳の獣の素材。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t1_stone_scale: {
      id: 'item_mat_t1_stone_scale',
      name: '岩のうろこ',
      description: '岩トカゲ類の素材。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t1_sharp_feather: {
      id: 'item_mat_t1_sharp_feather',
      name: 'するどい風切羽',
      description: '高地の猛禽の素材。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t1_ogre_fang: {
      id: 'item_mat_t1_ogre_fang',
      name: 'オーガの牙',
      description: '岩のオーガの素材。売ると強めの装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t1_drake_horn: {
      id: 'item_mat_t1_drake_horn',
      name: '竜トカゲの角',
      description: 'マグマの竜トカゲの素材。売ると強めの装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t1_lord_pelt: {
      id: 'item_mat_t1_lord_pelt',
      name: '猿王の毛皮',
      description: '山嶺の大猿王の素材。売ると強力な装備が並ぶ。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t2_frost_pelt: {
      id: 'item_mat_t2_frost_pelt',
      name: '霜降りの毛皮',
      description: '氷雪の獣の毛皮。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t2_ice_crystal: {
      id: 'item_mat_t2_ice_crystal',
      name: '凍てつく結晶',
      description: '溶けない氷の結晶。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t2_chill_core: {
      id: 'item_mat_t2_chill_core',
      name: '冷気の核',
      description: '氷霊から採れる冷気の核。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t2_monarch_diadem: {
      id: 'item_mat_t2_monarch_diadem',
      name: '女王の氷冠',
      description: '氷晶の女王の冠。極めて貴重な素材。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t3_charged_hide: {
      id: 'item_mat_t3_charged_hide',
      name: '帯電した獣皮',
      description: '雷を帯びた獣の皮。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t3_storm_feather: {
      id: 'item_mat_t3_storm_feather',
      name: '嵐鳥の風切羽',
      description: '嵐をまとう鳥の羽。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t3_thunder_carapace: {
      id: 'item_mat_t3_thunder_carapace',
      name: '雷甲の外殻',
      description: '放電する虫や結晶の外殻。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t3_sovereign_horn: {
      id: 'item_mat_t3_sovereign_horn',
      name: '覇王の雷角',
      description: '雷霆の覇王の角。至高の素材。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t4_rotflesh: {
      id: 'item_mat_t4_rotflesh',
      name: '腐肉のかけら',
      description: '瘴気に侵され朽ちた肉片。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t4_grave_dust: {
      id: 'item_mat_t4_grave_dust',
      name: '墓場の灰塵',
      description: '墓土と骨の粉。不死の素材。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t4_cursed_marrow: {
      id: 'item_mat_t4_cursed_marrow',
      name: '呪詛の髄液',
      description: '呪われた骸から滲む粘液。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t4_toxic_scale: {
      id: 'item_mat_t4_toxic_scale',
      name: '毒鱗の粉',
      description: '瘴気蟲の猛毒の鱗粉。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t4_spectral_ash: {
      id: 'item_mat_t4_spectral_ash',
      name: '亡霊の燐灰',
      description: '鬼火が遺す青白い灰。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t4_steel_gear: {
      id: 'item_mat_t4_steel_gear',
      name: '鋼の歯車',
      description: '機械兵の精密な駆動部品。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t4_corroded_plate: {
      id: 'item_mat_t4_corroded_plate',
      name: '腐食した装甲板',
      description: '瘴気で錆びた重装甲の破片。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t4_sovereign_crown: {
      id: 'item_mat_t4_sovereign_crown',
      name: '腐王の冠',
      description: '瘴気を統べる者の朽ちた王冠。',
      category: 'material',
      buyPrice: 0,
    },
  };
function kb(l) {
  return l.category === 'food' ? 0 : l.category === 'material' ? 8 : Math.floor(l.buyPrice / 2);
}
function vb(l) {
  var i;
  return ((i = Fe[l]) == null ? void 0 : i.category) === 'food';
}
const bt = {
    race_human: {
      id: 'race_human',
      name: 'ヒト',
      baseStatsAtLv1: { hp: 40, tp: 20, str: 8, vit: 8, agi: 8, int: 8, mnd: 8, luc: 8 },
      statGrowth: { hp: 8, tp: 4, str: 2, vit: 2, agi: 2, int: 2, mnd: 2, luc: 2 },
      raceSkillTree: {
        skills: [
          { skillId: 'skill_union_rally', maxLevel: 3 },
          { skillId: 'passive_race_human_adapt', maxLevel: 3 },
          { skillId: 'skill_mining', maxLevel: 1 },
          { skillId: 'skill_gathering', maxLevel: 1 },
        ],
      },
      defaultClassId: 'class_warrior',
    },
    race_garon: {
      id: 'race_garon',
      name: 'ガロン',
      baseStatsAtLv1: { hp: 55, tp: 12, str: 11, vit: 11, agi: 5, int: 4, mnd: 6, luc: 6 },
      statGrowth: { hp: 12, tp: 2, str: 3, vit: 3, agi: 1, int: 1, mnd: 2, luc: 2 },
      raceSkillTree: {
        skills: [
          { skillId: 'skill_union_smash', maxLevel: 3 },
          { skillId: 'passive_race_garon_might', maxLevel: 3 },
          { skillId: 'skill_logging', maxLevel: 1 },
          { skillId: 'skill_hunting', maxLevel: 1 },
        ],
      },
      defaultClassId: 'class_guardian',
    },
    race_pix: {
      id: 'race_pix',
      name: 'ピクス',
      baseStatsAtLv1: { hp: 28, tp: 32, str: 4, vit: 5, agi: 9, int: 12, mnd: 11, luc: 7 },
      statGrowth: { hp: 5, tp: 7, str: 1, vit: 1, agi: 2, int: 3, mnd: 3, luc: 2 },
      raceSkillTree: {
        skills: [
          { skillId: 'skill_union_nova', maxLevel: 3 },
          { skillId: 'passive_race_pix_focus', maxLevel: 3 },
          { skillId: 'skill_gathering', maxLevel: 1 },
          { skillId: 'skill_harvest', maxLevel: 1 },
        ],
      },
      defaultClassId: 'class_mage',
    },
    race_therian: {
      id: 'race_therian',
      name: 'テリアン',
      baseStatsAtLv1: { hp: 38, tp: 18, str: 9, vit: 7, agi: 11, int: 6, mnd: 6, luc: 9 },
      statGrowth: { hp: 7, tp: 3, str: 2, vit: 2, agi: 3, int: 1, mnd: 1, luc: 3 },
      raceSkillTree: {
        skills: [
          { skillId: 'skill_union_fang', maxLevel: 3 },
          { skillId: 'passive_race_therian_swift', maxLevel: 3 },
          { skillId: 'skill_fishing', maxLevel: 1 },
          { skillId: 'skill_hunting', maxLevel: 1 },
          { skillId: 'skill_harvest', maxLevel: 1 },
        ],
      },
      defaultClassId: 'class_ranger',
    },
    race_lunar: {
      id: 'race_lunar',
      name: 'ルーナ',
      baseStatsAtLv1: { hp: 30, tp: 28, str: 5, vit: 6, agi: 8, int: 10, mnd: 12, luc: 10 },
      statGrowth: { hp: 5, tp: 6, str: 1, vit: 1, agi: 2, int: 3, mnd: 3, luc: 3 },
      raceSkillTree: {
        skills: [
          { skillId: 'skill_union_moonlight', maxLevel: 3 },
          { skillId: 'passive_race_lunar_grace', maxLevel: 3 },
          { skillId: 'skill_gathering', maxLevel: 1 },
          { skillId: 'skill_harvest', maxLevel: 1 },
        ],
      },
      defaultClassId: 'class_medic',
    },
    race_golan: {
      id: 'race_golan',
      name: 'ゴラン',
      baseStatsAtLv1: { hp: 60, tp: 10, str: 12, vit: 13, agi: 4, int: 3, mnd: 6, luc: 5 },
      statGrowth: { hp: 13, tp: 2, str: 3, vit: 3, agi: 1, int: 1, mnd: 1, luc: 2 },
      raceSkillTree: {
        skills: [
          { skillId: 'skill_union_quake', maxLevel: 3 },
          { skillId: 'passive_race_golan_fortitude', maxLevel: 3 },
          { skillId: 'skill_mining', maxLevel: 1 },
          { skillId: 'skill_logging', maxLevel: 1 },
        ],
      },
      defaultClassId: 'class_monk',
    },
  },
  ji = {
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
    skill_leg_snipe: {
      id: 'skill_leg_snipe',
      name: '脚封じの矢',
      description: '射撃ダメージを与え、確率で脚を封じる（回避低下・逃走不可）。',
    },
    skill_arm_snipe: {
      id: 'skill_arm_snipe',
      name: '腕封じの矢',
      description: '射撃ダメージを与え、確率で腕を封じる（通常攻撃・物理スキル不可）。',
    },
    skill_head_snipe: {
      id: 'skill_head_snipe',
      name: '頭封じの矢',
      description: '射撃ダメージを与え、確率で頭を封じる（魔法・補助スキル不可）。',
    },
    skill_summon_wolf: {
      id: 'skill_summon_wolf',
      name: '狼を召喚',
      description: '自律して敵を攻撃する召喚獣・狼を最前列に呼ぶ（戦闘限り）。',
    },
    skill_summon_bulwark: {
      id: 'skill_summon_bulwark',
      name: '石像を召喚',
      description: '敵の攻撃を引き受ける高耐久の石像を最前列に呼ぶ（戦闘限り）。',
    },
    skill_summon_familiar: {
      id: 'skill_summon_familiar',
      name: '使い魔を召喚',
      description: '自律攻撃する使い魔を呼ぶ。戦闘をまたいで残る（拠点帰還で消える）。',
    },
    skill_mining: {
      id: 'skill_mining',
      name: '採掘',
      description: '採掘ポイントから鉱石を採取できる。',
    },
    skill_gathering: {
      id: 'skill_gathering',
      name: '採取',
      description: '採取ポイントから薬草などを集められる。',
    },
    skill_logging: {
      id: 'skill_logging',
      name: '伐採',
      description: '伐採ポイントから木材を得られる。',
    },
    skill_fishing: {
      id: 'skill_fishing',
      name: '釣り',
      description: '釣りポイントから食材（魚）を得られる。',
    },
    skill_harvest: {
      id: 'skill_harvest',
      name: '収穫',
      description: '収穫ポイントから食材（木の実）を得られる。',
    },
    skill_hunting: {
      id: 'skill_hunting',
      name: '狩猟',
      description: '狩猟ポイントから食材（肉）を得られる。',
    },
    skill_union_rally: {
      id: 'skill_union_rally',
      name: '結束の鬨',
      description: '味方全体を大回復し攻撃力を高めるユニオンスキル（ヒト）。',
    },
    skill_union_smash: {
      id: 'skill_union_smash',
      name: '豪砕',
      description: '敵全体に強力な壊打を与えるユニオンスキル（ガロン・2名）。',
    },
    skill_union_nova: {
      id: 'skill_union_nova',
      name: '魔光爆裂',
      description: '敵全体に大きな火属性魔法を与えるユニオンスキル（ピクス・2名）。',
    },
    skill_union_fang: {
      id: 'skill_union_fang',
      name: '連牙',
      description: '単体に貫通3連撃を浴びせるユニオンスキル（テリアン）。',
    },
    skill_union_moonlight: {
      id: 'skill_union_moonlight',
      name: '月光の癒し',
      description: '味方全体を回復し魔法防御を高めるユニオンスキル（ルーナ）。',
    },
    skill_union_quake: {
      id: 'skill_union_quake',
      name: '大震撃',
      description: '敵全体に大きな壊打を与えるユニオンスキル（ゴラン・2名）。',
    },
    skill_cleave: { id: 'skill_cleave', name: 'なぎ払い', description: '敵全体に斬撃ダメージ。' },
    skill_volt_bolt: {
      id: 'skill_volt_bolt',
      name: 'ボルトショック',
      description: '単体に雷属性魔法ダメージ。',
    },
    skill_heal: { id: 'skill_heal', name: 'ヒール', description: '味方1人の HP を回復する。' },
    skill_mass_heal: {
      id: 'skill_mass_heal',
      name: 'マスヒール',
      description: '味方全体の HP を回復する。',
    },
    skill_protect_hymn: {
      id: 'skill_protect_hymn',
      name: '守りの聖歌',
      description: '味方全体の魔法防御を高める。',
    },
    skill_war_dance: {
      id: 'skill_war_dance',
      name: '戦いの舞',
      description: '味方全体の物理攻撃力を高める。',
    },
    skill_evasion_dance: {
      id: 'skill_evasion_dance',
      name: '回避の舞',
      description: '味方全体の回避を高める。',
    },
    skill_weaken_song: {
      id: 'skill_weaken_song',
      name: '弱体の歌',
      description: '敵全体の物理攻撃力を下げる。',
    },
    skill_triple_strike: {
      id: 'skill_triple_strike',
      name: '三段突き',
      description: '単体に壊打の3連撃。',
    },
    skill_focus_ki: {
      id: 'skill_focus_ki',
      name: '練気',
      description: '自身の物理攻撃力を高める。',
    },
    skill_iron_body: {
      id: 'skill_iron_body',
      name: '鉄身',
      description: '自身の物理防御を高める。',
    },
    skill_venom_hex: {
      id: 'skill_venom_hex',
      name: '毒の呪',
      description: '単体に魔法ダメージを与え毒を付与する。',
    },
    skill_sleep_hex: {
      id: 'skill_sleep_hex',
      name: '眠りの呪',
      description: '敵全体を眠らせる（被ダメで解除）。',
    },
    skill_weaken_hex: {
      id: 'skill_weaken_hex',
      name: '魔弱の呪',
      description: '単体の魔法攻撃力を下げる。',
    },
    passive_race_human_adapt: {
      id: 'passive_race_human_adapt',
      name: '適応力',
      description: '最大HPと命中が上昇する（常時）。',
    },
    passive_race_garon_might: {
      id: 'passive_race_garon_might',
      name: '剛力',
      description: '物理攻撃力と最大HPが上昇する（常時）。',
    },
    passive_race_pix_focus: {
      id: 'passive_race_pix_focus',
      name: '魔力集中',
      description: '魔法攻撃力と最大TPが上昇する（常時）。',
    },
    passive_race_therian_swift: {
      id: 'passive_race_therian_swift',
      name: '俊足',
      description: '命中と回避が上昇する（常時）。',
    },
    passive_race_lunar_grace: {
      id: 'passive_race_lunar_grace',
      name: '月の加護',
      description: '魔法防御と最大TPが上昇する（常時）。',
    },
    passive_race_golan_fortitude: {
      id: 'passive_race_golan_fortitude',
      name: '頑健',
      description: '物理防御と最大HPが上昇する（常時）。',
    },
    passive_warrior_blade_mastery: {
      id: 'passive_warrior_blade_mastery',
      name: '剣の心得',
      description: '剣を装備中、物理攻撃力が上昇する（常時）。',
    },
    passive_warrior_phys_boost: {
      id: 'passive_warrior_phys_boost',
      name: '剛腕',
      description: '物理攻撃力が上昇する（常時）。',
    },
    passive_guardian_shield_mastery: {
      id: 'passive_guardian_shield_mastery',
      name: '盾の心得',
      description: '物理防御が上昇する（常時）。',
    },
    passive_guardian_hp_boost: {
      id: 'passive_guardian_hp_boost',
      name: '頑強',
      description: '最大HPが上昇する（常時）。',
    },
    passive_mage_staff_mastery: {
      id: 'passive_mage_staff_mastery',
      name: '杖の心得',
      description: '杖を装備中、魔法攻撃力が上昇する（常時）。',
    },
    passive_mage_tp_boost: {
      id: 'passive_mage_tp_boost',
      name: '精神統一',
      description: '最大TPが上昇する（常時）。',
    },
    passive_ranger_bow_mastery: {
      id: 'passive_ranger_bow_mastery',
      name: '弓の心得',
      description: '弓を装備中、物理攻撃力が上昇する（常時）。',
    },
    passive_ranger_agi_boost: {
      id: 'passive_ranger_agi_boost',
      name: '機敏',
      description: '命中と回避が上昇する（常時）。',
    },
    passive_medic_tp_boost: {
      id: 'passive_medic_tp_boost',
      name: '薬学の知識',
      description: '最大TPが上昇する（常時）。',
    },
    passive_medic_mdef_boost: {
      id: 'passive_medic_mdef_boost',
      name: '抗体',
      description: '魔法防御が上昇する（常時）。',
    },
    passive_dancer_agi_boost: {
      id: 'passive_dancer_agi_boost',
      name: '舞踏の足捌き',
      description: '回避と命中が上昇する（常時）。',
    },
    passive_dancer_tp_boost: {
      id: 'passive_dancer_tp_boost',
      name: '高揚',
      description: '最大TPが上昇する（常時）。',
    },
    passive_monk_fist_mastery: {
      id: 'passive_monk_fist_mastery',
      name: '拳の心得',
      description: '拳を装備中、物理攻撃力が上昇する（常時）。',
    },
    passive_monk_crit_boost: {
      id: 'passive_monk_crit_boost',
      name: '練達',
      description: 'クリティカル率が上昇する（常時）。',
    },
    passive_hexer_matk_boost: {
      id: 'passive_hexer_matk_boost',
      name: '呪詛',
      description: '魔法攻撃力が上昇する（常時）。',
    },
    passive_hexer_mdef_boost: {
      id: 'passive_hexer_mdef_boost',
      name: '瘴気の衣',
      description: '魔法防御が上昇する（常時）。',
    },
    passive_summoner_staff_mastery: {
      id: 'passive_summoner_staff_mastery',
      name: '霊媒の心得',
      description: '杖を装備中、魔法攻撃力が上昇する（常時）。',
    },
    passive_summoner_tp_boost: {
      id: 'passive_summoner_tp_boost',
      name: '死霊術の知識',
      description: '最大TPが上昇する（常時）。',
    },
    passive_title_berserker: {
      id: 'passive_title_berserker',
      name: '狂気の力',
      description: '物理攻撃力とクリティカル率が上昇する（常時）。',
    },
    passive_title_sentinel: {
      id: 'passive_title_sentinel',
      name: '警戒',
      description: '物理防御と命中が上昇する（常時）。',
    },
    passive_title_bulwark: {
      id: 'passive_title_bulwark',
      name: '鉄壁',
      description: '物理防御と最大HPが上昇する（常時）。',
    },
    passive_title_vanguard: {
      id: 'passive_title_vanguard',
      name: '突撃',
      description: '物理攻撃力が大きく上昇する（常時）。',
    },
    passive_title_pyromancer: {
      id: 'passive_title_pyromancer',
      name: '業火',
      description: '魔法攻撃力が大きく上昇する（常時）。',
    },
    passive_title_sage: {
      id: 'passive_title_sage',
      name: '英知',
      description: '最大TPと魔法防御が上昇する（常時）。',
    },
    passive_title_sniper: {
      id: 'passive_title_sniper',
      name: '精密射撃',
      description: 'クリティカル率と命中が上昇する（常時）。',
    },
    passive_title_tracker: {
      id: 'passive_title_tracker',
      name: '隠密',
      description: '回避が大きく上昇する（常時）。',
    },
    passive_title_saint: {
      id: 'passive_title_saint',
      name: '慈愛',
      description: '最大TPと魔法防御が上昇する（常時）。',
    },
    passive_title_blade_dancer: {
      id: 'passive_title_blade_dancer',
      name: '剣の舞',
      description: '物理攻撃力と回避が上昇する（常時）。',
    },
    passive_title_muse: {
      id: 'passive_title_muse',
      name: '詩心',
      description: '最大TPが大きく上昇する（常時）。',
    },
    passive_title_zen: {
      id: 'passive_title_zen',
      name: '不動',
      description: '物理防御と最大HPが上昇する（常時）。',
    },
    passive_title_plague: {
      id: 'passive_title_plague',
      name: '疫病',
      description: '魔法攻撃力が大きく上昇する（常時）。',
    },
    passive_title_warlock: {
      id: 'passive_title_warlock',
      name: '魔道の極み',
      description: '魔法攻撃力とクリティカル率が上昇する（常時）。',
    },
    passive_title_necromancer: {
      id: 'passive_title_necromancer',
      name: '降霊',
      description: '魔法攻撃力と最大TPが上昇する（常時）。',
    },
    passive_title_puppeteer: {
      id: 'passive_title_puppeteer',
      name: '傀儡操糸',
      description: '最大HPと最大TPが上昇する（常時）。',
    },
    skill_chain_slash: {
      id: 'skill_chain_slash',
      name: '連刃の構え',
      description: '味方が斬属性で敵を攻撃した時、追撃する構えを取る（数ターン）。',
    },
    skill_riposte: {
      id: 'skill_riposte',
      name: '反攻の構え',
      description: '敵の攻撃を受けた時、確率で反撃する構えを取る（数ターン）。',
    },
    skill_line_guard: {
      id: 'skill_line_guard',
      name: 'ラインガード',
      description: '味方全体に、被弾を肩代わりする障壁を張る（数ターン）。',
    },
    skill_counter_guard: {
      id: 'skill_counter_guard',
      name: 'カウンターガード',
      description: '敵の攻撃を受けた時、高確率で反撃する構えを取る（数ターン）。',
    },
    skill_fire_storm: {
      id: 'skill_fire_storm',
      name: 'ファイアストーム',
      description: '敵全体に火属性魔法ダメージ。',
    },
    skill_first_aid: {
      id: 'skill_first_aid',
      name: '救護指示',
      description: '味方1人のHPを回復する。',
    },
    skill_refresh_herb: {
      id: 'skill_refresh_herb',
      name: 'リフレシュハーブ',
      description: '味方全体の状態異常を治療する。',
    },
    skill_poison_smoke: {
      id: 'skill_poison_smoke',
      name: 'ポイズンスモーク',
      description: '敵全体を確率で毒にする。',
    },
    skill_guard_dance: {
      id: 'skill_guard_dance',
      name: '守りの舞',
      description: '味方全体の物理防御を高める。',
    },
    skill_healing_song: {
      id: 'skill_healing_song',
      name: '癒しの歌',
      description: '味方全体のHPを小回復する。',
    },
    skill_arm_break: {
      id: 'skill_arm_break',
      name: 'アームブレイク',
      description: '単体に壊打ダメージを与え、確率で腕を封じる。',
    },
    skill_cross_counter: {
      id: 'skill_cross_counter',
      name: 'クロスカウンター',
      description: '敵の攻撃を受けた時、高確率で強烈な反撃を行う構えを取る（数ターン）。',
    },
    skill_blind_hex: {
      id: 'skill_blind_hex',
      name: '盲目の呪',
      description: '敵全体を確率で盲目にする。',
    },
    skill_armor_hex: {
      id: 'skill_armor_hex',
      name: '鎧弱の呪',
      description: '単体の物理防御を下げる。',
    },
    skill_call_wraith: {
      id: 'skill_call_wraith',
      name: '死霊召喚',
      description: '自律して敵を貫通攻撃する死霊を最前列に呼ぶ（戦闘限り）。',
    },
    skill_soul_barrier: {
      id: 'skill_soul_barrier',
      name: '無慈悲な盾',
      description: '味方全体に、被弾を肩代わりする障壁を張る（数ターン）。',
    },
    skill_call_sentinel: {
      id: 'skill_call_sentinel',
      name: '亡者の壁',
      description: '敵の攻撃を引き受ける高耐久の壁を最前列に呼ぶ（戦闘限り）。',
    },
    skill_soul_burst: {
      id: 'skill_soul_burst',
      name: '死霊爆裂',
      description: '敵全体に無属性魔法ダメージ。',
    },
    skill_cleanse_draft: {
      id: 'skill_cleanse_draft',
      name: '解毒の秘薬',
      description: '味方全体の状態異常を治療する。',
    },
    skill_counter_throw: {
      id: 'skill_counter_throw',
      name: '当て身投げ',
      description: '敵の攻撃を受けた時、確率で反撃する構えを取る（数ターン）。',
    },
    skill_warrior_double_slash: {
      id: 'skill_warrior_double_slash',
      name: 'ダブルスラッシュ',
      description: '単体に2連続の斬撃を浴びせる。',
    },
    skill_warrior_heavy_swing: {
      id: 'skill_warrior_heavy_swing',
      name: 'ヘビースイング',
      description: '斧で単体を強打し、確率で頭を封じる。',
    },
    skill_warrior_war_cry: {
      id: 'skill_warrior_war_cry',
      name: '雄叫び',
      description: '自身の物理攻撃を一時的に大きく高める。',
    },
    skill_warrior_blade_storm: {
      id: 'skill_warrior_blade_storm',
      name: 'ブレイドストーム',
      description: '敵全体を斬り払う奥義。',
    },
    skill_warrior_executioner: {
      id: 'skill_warrior_executioner',
      name: 'エグゼキューション',
      description: '渾身の一撃を単体に叩き込む奥義。',
    },
    passive_warrior_axe_mastery: {
      id: 'passive_warrior_axe_mastery',
      name: '斧の心得',
      description: '斧を装備中、物理攻撃力が上昇する（常時）。',
    },
    passive_warrior_crit_focus: {
      id: 'passive_warrior_crit_focus',
      name: '会心',
      description: 'クリティカル率が上昇する（常時）。',
    },
    passive_warrior_vitality: {
      id: 'passive_warrior_vitality',
      name: '頑健な肉体',
      description: '最大HPが上昇する（常時）。',
    },
    skill_warrior_t_rampage: {
      id: 'skill_warrior_t_rampage',
      name: 'ランページ',
      description: '渾身の3連撃を放つ狂戦士の奥義。',
    },
    passive_warrior_t_bloodlust: {
      id: 'passive_warrior_t_bloodlust',
      name: '血の渇き',
      description: '物理攻撃とクリティカル率が上昇する（常時）。',
    },
    skill_warrior_t_overwatch: {
      id: 'skill_warrior_t_overwatch',
      name: '哨戒の構え',
      description: '構えをとり、被弾時に確率で反撃する。',
    },
    passive_warrior_t_guardian_eye: {
      id: 'passive_warrior_t_guardian_eye',
      name: '監視眼',
      description: '物理防御と命中が上昇する（常時）。',
    },
    skill_guardian_shield_press: {
      id: 'skill_guardian_shield_press',
      name: 'シールドプレス',
      description: '盾で敵全体を押し潰し、確率で麻痺させる。',
    },
    skill_guardian_taunt_roar: {
      id: 'skill_guardian_taunt_roar',
      name: '威圧の咆哮',
      description: '敵の注意を引きつけつつ自身の物理防御を高める。',
    },
    skill_guardian_aegis: {
      id: 'skill_guardian_aegis',
      name: 'イージスウォール',
      description: '味方全体に強固な障壁を張る奥義。',
    },
    skill_guardian_retribution: {
      id: 'skill_guardian_retribution',
      name: 'リトリビューション',
      description: '盾を構え、被弾時に反撃を返す奥義。',
    },
    passive_guardian_spear_mastery: {
      id: 'passive_guardian_spear_mastery',
      name: '槍の心得',
      description: '槍を装備中、物理攻撃力が上昇する（常時）。',
    },
    passive_guardian_mdef_boost: {
      id: 'passive_guardian_mdef_boost',
      name: '魔法耐性',
      description: '魔法防御が上昇する（常時）。',
    },
    passive_guardian_iron_will: {
      id: 'passive_guardian_iron_will',
      name: '鋼の意志',
      description: '物理防御と最大HPが上昇する（常時）。',
    },
    passive_guardian_t_fortress: {
      id: 'passive_guardian_t_fortress',
      name: '要塞',
      description: '物理防御と最大HPが大きく上昇する（常時）。',
    },
    skill_guardian_t_last_bastion: {
      id: 'skill_guardian_t_last_bastion',
      name: 'ラストバスティオン',
      description: '味方全体に極大の障壁を展開する城壁の奥義。',
    },
    passive_guardian_t_spearhead: {
      id: 'passive_guardian_t_spearhead',
      name: '尖兵',
      description: '物理攻撃が上昇する（常時）。',
    },
    skill_guardian_t_lance_charge: {
      id: 'skill_guardian_t_lance_charge',
      name: 'ランスチャージ',
      description: '槍で単体を貫く先鋒の突撃。',
    },
    skill_mage_ice_storm: {
      id: 'skill_mage_ice_storm',
      name: 'アイスストーム',
      description: '敵全体に氷属性魔法ダメージ。',
    },
    skill_mage_volt_storm: {
      id: 'skill_mage_volt_storm',
      name: 'ボルトストーム',
      description: '敵全体に雷属性魔法ダメージ。',
    },
    skill_mage_focus: {
      id: 'skill_mage_focus',
      name: '魔力集中',
      description: '自身の魔法攻撃を一時的に大きく高める。',
    },
    skill_mage_meteor: {
      id: 'skill_mage_meteor',
      name: 'メテオ',
      description: '敵全体に超火力の火属性魔法を降らせる奥義。',
    },
    skill_mage_thunderbolt: {
      id: 'skill_mage_thunderbolt',
      name: 'サンダーボルト',
      description: '単体に極大の雷属性魔法を撃ち込む奥義。',
    },
    passive_mage_matk_boost: {
      id: 'passive_mage_matk_boost',
      name: '魔力増幅',
      description: '魔法攻撃が上昇する（常時）。',
    },
    passive_mage_spell_focus: {
      id: 'passive_mage_spell_focus',
      name: '魔法熟練',
      description: '魔法攻撃とクリティカル率が上昇する（常時）。',
    },
    passive_mage_t_inferno: {
      id: 'passive_mage_t_inferno',
      name: '業炎',
      description: '魔法攻撃が大きく上昇する（常時）。',
    },
    skill_mage_t_hellfire: {
      id: 'skill_mage_t_hellfire',
      name: 'ヘルファイア',
      description: '単体を業火で焼き尽くす紅蓮術士の奥義。',
    },
    passive_mage_t_arcane_lore: {
      id: 'passive_mage_t_arcane_lore',
      name: '深淵の知識',
      description: '最大TPと魔法防御が上昇する（常時）。',
    },
    skill_mage_t_mana_surge: {
      id: 'skill_mage_t_mana_surge',
      name: 'マナサージ',
      description: '自身のTPを回復する賢者の秘術。',
    },
    skill_ranger_piercing_arrow: {
      id: 'skill_ranger_piercing_arrow',
      name: '貫通の矢',
      description: '単体に強力な貫通射撃ダメージ。',
    },
    skill_ranger_charged_shot: {
      id: 'skill_ranger_charged_shot',
      name: 'チャージショット',
      description: '単体に絶大な貫通ダメージを与える奥義。',
    },
    skill_ranger_rain_of_arrows: {
      id: 'skill_ranger_rain_of_arrows',
      name: '矢の雨',
      description: '敵全体に降り注ぐ射撃ダメージ。',
    },
    skill_ranger_pin_shot: {
      id: 'skill_ranger_pin_shot',
      name: '足止めの矢',
      description: '射撃ダメージを与え、確率で脚を封じる。',
    },
    skill_ranger_summon_falcon: {
      id: 'skill_ranger_summon_falcon',
      name: '鷹を召喚',
      description: '自律して敵を攻撃する鷹を呼ぶ（戦闘限り）。',
    },
    passive_ranger_eagle_eye: {
      id: 'passive_ranger_eagle_eye',
      name: '鷹の目',
      description: '命中とクリティカル率が上昇する（常時）。',
    },
    skill_ranger_t_snipe: {
      id: 'skill_ranger_t_snipe',
      name: '一矢必中',
      description: '弱点を狙い澄ました必殺の一射。',
    },
    passive_ranger_t_keen_sight: {
      id: 'passive_ranger_t_keen_sight',
      name: '眼力',
      description: '命中が上昇する（常時）。',
    },
    skill_ranger_t_camouflage: {
      id: 'skill_ranger_t_camouflage',
      name: '韜晦',
      description: '自身の回避を大きく高める。',
    },
    passive_ranger_t_shadowstep: {
      id: 'passive_ranger_t_shadowstep',
      name: '影縫い',
      description: '回避が上昇する（常時）。',
    },
    skill_medic_full_heal: {
      id: 'skill_medic_full_heal',
      name: 'フルヒール',
      description: '味方1人のHPを大きく回復する。',
    },
    skill_medic_party_cure: {
      id: 'skill_medic_party_cure',
      name: 'パーティキュア',
      description: '味方全体のHPを大きく回復する。',
    },
    skill_medic_tp_tonic: {
      id: 'skill_medic_tp_tonic',
      name: 'TPトニック',
      description: '味方全体のTPを回復させる。',
    },
    skill_medic_blind_powder: {
      id: 'skill_medic_blind_powder',
      name: '目潰しの粉',
      description: '敵全体を確率で盲目にする。',
    },
    passive_medic_mind_boost: {
      id: 'passive_medic_mind_boost',
      name: '治療の心得',
      description: '魔法攻撃力が上昇する（常時）。',
    },
    skill_medic_t_revive_light: {
      id: 'skill_medic_t_revive_light',
      name: '蘇生の光',
      description: '味方全体のHPを絶大に回復する聖者の奇跡。',
    },
    passive_medic_t_blessing: {
      id: 'passive_medic_t_blessing',
      name: '祝福',
      description: '最大TPと魔法防御が上昇する（常時）。',
    },
    skill_medic_t_stimulant: {
      id: 'skill_medic_t_stimulant',
      name: '気付け薬',
      description: '味方全体のTPを回復させる。',
    },
    passive_medic_t_alchemy: {
      id: 'passive_medic_t_alchemy',
      name: '錬薬',
      description: '最大TPが上昇する（常時）。',
    },
    skill_dancer_blade_waltz: {
      id: 'skill_dancer_blade_waltz',
      name: '剣舞の円',
      description: '舞いながら敵全体を斬りつける。',
    },
    skill_dancer_inspire_dance: {
      id: 'skill_dancer_inspire_dance',
      name: '鼓舞の舞',
      description: '味方全体の魔法攻撃を高める。',
    },
    skill_dancer_grace_song: {
      id: 'skill_dancer_grace_song',
      name: '加護の歌',
      description: '味方全体の魔法防御を高める。',
    },
    skill_dancer_revival_dance: {
      id: 'skill_dancer_revival_dance',
      name: '蘇生の舞',
      description: '味方全体のHPを回復する癒しの舞。',
    },
    passive_dancer_grace: {
      id: 'passive_dancer_grace',
      name: '優美',
      description: '回避と命中が上昇する（常時）。',
    },
    skill_dancer_t_finale: {
      id: 'skill_dancer_t_finale',
      name: '剣の終幕',
      description: '渾身の舞で単体に絶大な斬撃ダメージを与える奥義。',
    },
    passive_dancer_t_grace: {
      id: 'passive_dancer_t_grace',
      name: '舞の極み',
      description: '物理攻撃と回避が上昇する（常時）。',
    },
    skill_dancer_t_lullaby: {
      id: 'skill_dancer_t_lullaby',
      name: '子守唄',
      description: '敵全体を確率で眠らせる舞姫の歌。',
    },
    passive_dancer_t_melody: {
      id: 'passive_dancer_t_melody',
      name: '調べ',
      description: '最大TPと魔法防御が上昇する（常時）。',
    },
    skill_monk_palm_strike: {
      id: 'skill_monk_palm_strike',
      name: '崩拳',
      description: '単体に強烈な壊打の一撃を放つ。',
    },
    skill_monk_leg_sweep: {
      id: 'skill_monk_leg_sweep',
      name: '足払い',
      description: '単体に壊打ダメージを与え、確率で脚を封じる。',
    },
    skill_monk_flurry: {
      id: 'skill_monk_flurry',
      name: '連弾',
      description: '単体に壊打の4連撃を浴びせる。',
    },
    skill_monk_head_smash: {
      id: 'skill_monk_head_smash',
      name: '当て身打ち',
      description: '単体に壊打ダメージを与え、確率で頭を封じる。',
    },
    skill_monk_rising_dragon: {
      id: 'skill_monk_rising_dragon',
      name: '昇龍奥義',
      description: '単体に壊打の奥義を叩き込む。',
    },
    passive_monk_hp_boost: {
      id: 'passive_monk_hp_boost',
      name: '鍛錬',
      description: '最大HPが上昇する（常時）。',
    },
    passive_monk_eva_boost: {
      id: 'passive_monk_eva_boost',
      name: '見切り',
      description: '回避が上昇する（常時）。',
    },
    skill_grappler_t_chain_throw: {
      id: 'skill_grappler_t_chain_throw',
      name: '連環投げ',
      description: '味方が壊属性で敵を攻撃した時、追撃する構えを取る（数ターン）。',
    },
    passive_grappler_t_counter_mastery: {
      id: 'passive_grappler_t_counter_mastery',
      name: '体捌き',
      description: '回避とクリティカル率が上昇する（常時）。',
    },
    skill_zen_t_mountain_stance: {
      id: 'skill_zen_t_mountain_stance',
      name: '不動明王の構え',
      description: '物理防御を大きく高め、敵の注意を引きつける。',
    },
    skill_zen_t_meditation: {
      id: 'skill_zen_t_meditation',
      name: '瞑想',
      description: '自身のTPを回復する。',
    },
    skill_hexer_paralyze_hex: {
      id: 'skill_hexer_paralyze_hex',
      name: '麻痺の呪',
      description: '単体に魔法ダメージを与え、確率で麻痺させる。',
    },
    skill_hexer_eva_hex: {
      id: 'skill_hexer_eva_hex',
      name: '鈍重の呪',
      description: '敵全体の回避を下げる。',
    },
    skill_hexer_acc_hex: {
      id: 'skill_hexer_acc_hex',
      name: '失明の呪',
      description: '単体の命中を下げる。',
    },
    skill_hexer_mass_venom: {
      id: 'skill_hexer_mass_venom',
      name: '瘴気の呪',
      description: '敵全体を確率で毒にする。',
    },
    skill_hexer_doom_hex: {
      id: 'skill_hexer_doom_hex',
      name: '崩呪',
      description: '単体に強力な魔法ダメージを与え、確率で麻痺させる奥義。',
    },
    skill_hexer_curse_field: {
      id: 'skill_hexer_curse_field',
      name: '呪縛の領域',
      description: '敵全体の物理攻撃力を下げる。',
    },
    passive_hexer_acc_boost: {
      id: 'passive_hexer_acc_boost',
      name: '呪言',
      description: '命中が上昇する（常時）。',
    },
    skill_plague_t_pandemic: {
      id: 'skill_plague_t_pandemic',
      name: '疫病の散布',
      description: '敵全体に魔法ダメージを与え、確率で毒にする。',
    },
    skill_plague_t_wither: {
      id: 'skill_plague_t_wither',
      name: '衰弱の呪',
      description: '敵全体の魔法攻撃力を下げる。',
    },
    skill_warlock_t_dark_bolt: {
      id: 'skill_warlock_t_dark_bolt',
      name: '闇撃の呪',
      description: '単体に強力な無属性魔法ダメージ。',
    },
    passive_warlock_t_matk_mastery: {
      id: 'passive_warlock_t_matk_mastery',
      name: '禁術の知識',
      description: '魔法攻撃力が大きく上昇する（常時）。',
    },
    skill_summoner_call_familiar: {
      id: 'skill_summoner_call_familiar',
      name: '使い魔召喚',
      description: '自律攻撃する使い魔を呼ぶ（戦闘限り）。',
    },
    skill_summoner_soul_drain: {
      id: 'skill_summoner_soul_drain',
      name: '吸魂',
      description: '単体に無属性魔法ダメージを与える。',
    },
    skill_summoner_tp_offering: {
      id: 'skill_summoner_tp_offering',
      name: '供物の儀',
      description: '味方全体のTPを回復する。',
    },
    skill_summoner_grave_chill: {
      id: 'skill_summoner_grave_chill',
      name: '冥府の冷気',
      description: '単体に氷属性魔法ダメージを与え、確率で麻痺させる。',
    },
    skill_summoner_oblivion: {
      id: 'skill_summoner_oblivion',
      name: '滅魂爆裂',
      description: '敵全体に強力な無属性魔法ダメージを与える奥義。',
    },
    skill_summoner_spirit_chase: {
      id: 'skill_summoner_spirit_chase',
      name: '霊撃連鎖',
      description: '味方が無属性で敵を攻撃した時、死霊が追撃する構えを取る（数ターン）。',
    },
    passive_summoner_mdef_boost: {
      id: 'passive_summoner_mdef_boost',
      name: '霊体防護',
      description: '魔法防御が上昇する（常時）。',
    },
    skill_necromancer_t_call_revenant: {
      id: 'skill_necromancer_t_call_revenant',
      name: '亡者召喚',
      description: '高耐久の亡者の壁を最前列に呼ぶ（戦闘限り）。',
    },
    skill_necromancer_t_death_pulse: {
      id: 'skill_necromancer_t_death_pulse',
      name: '死波',
      description: '敵全体に無属性魔法ダメージ。',
    },
    skill_puppeteer_t_aegis: {
      id: 'skill_puppeteer_t_aegis',
      name: '傀儡の盾',
      description: '味方全体に、被弾を肩代わりする障壁を張る（数ターン）。',
    },
    passive_puppeteer_t_vitality: {
      id: 'passive_puppeteer_t_vitality',
      name: '操糸の妙',
      description: '最大HPと最大TPが上昇する（常時）。',
    },
    skill_warrior_flame_blade: {
      id: 'skill_warrior_flame_blade',
      name: 'フレイムブレイド',
      description: '剣に炎を纏わせ単体に火属性の斬撃を放つ。',
    },
    skill_warrior_whirlwind: {
      id: 'skill_warrior_whirlwind',
      name: 'ワールウィンド',
      description: '斧で全方位を薙ぎ払い敵全体を強打する。',
    },
    skill_warrior_armor_crush: {
      id: 'skill_warrior_armor_crush',
      name: 'アーマークラッシュ',
      description: '斧で単体を打ち砕き、確率で腕を封じる。',
    },
    skill_warrior_blade_dance: {
      id: 'skill_warrior_blade_dance',
      name: 'ブレイドダンス',
      description: '単体に高速の3連斬を浴びせる。',
    },
    passive_warrior_dual_edge: {
      id: 'passive_warrior_dual_edge',
      name: '双刃の理',
      description: '物理攻撃とクリティカル率が上昇する（常時）。',
    },
    skill_warrior_savage_blow: {
      id: 'skill_warrior_savage_blow',
      name: 'サベージブロウ',
      description: '渾身の一撃を単体に叩き込む斧の極奥義。',
    },
    skill_warrior_meteor_strike: {
      id: 'skill_warrior_meteor_strike',
      name: 'メテオストライク',
      description: '剣で敵全体を斬り裂く極大の全体奥義。',
    },
    skill_guardian_shield_throw: {
      id: 'skill_guardian_shield_throw',
      name: 'シールドスロー',
      description: '盾を投げ敵全体を強打し、確率で麻痺させる。',
    },
    skill_guardian_spear_thrust: {
      id: 'skill_guardian_spear_thrust',
      name: 'スピアスラスト',
      description: '槍で単体を鋭く貫く突き技。',
    },
    skill_guardian_bulwark_stance: {
      id: 'skill_guardian_bulwark_stance',
      name: 'バルワークの構え',
      description: '物理防御を大きく高め、敵の注意を引きつける。',
    },
    skill_guardian_iron_counter: {
      id: 'skill_guardian_iron_counter',
      name: 'アイアンカウンター',
      description: '構えをとり、被弾時に高確率で強烈な反撃を返す。',
    },
    skill_guardian_phalanx: {
      id: 'skill_guardian_phalanx',
      name: 'ファランクス',
      description: '味方全体に被弾を肩代わりする障壁を張る。',
    },
    skill_guardian_dragon_lance: {
      id: 'skill_guardian_dragon_lance',
      name: 'ドラゴンランス',
      description: '槍で単体を貫く渾身の極奥義。',
    },
    skill_guardian_great_wall: {
      id: 'skill_guardian_great_wall',
      name: 'グレートウォール',
      description: '味方全体に極大の障壁を展開する城壁の奥義。',
    },
    skill_mage_fire_lance: {
      id: 'skill_mage_fire_lance',
      name: 'ファイアランス',
      description: '単体に上位の火属性魔法ダメージ。',
    },
    skill_mage_frost_lance: {
      id: 'skill_mage_frost_lance',
      name: 'フロストランス',
      description: '単体に上位の氷属性魔法を放ち、確率で麻痺させる。',
    },
    skill_mage_volt_lance: {
      id: 'skill_mage_volt_lance',
      name: 'ボルトランス',
      description: '単体に上位の雷属性魔法ダメージ。',
    },
    skill_mage_mana_charge: {
      id: 'skill_mage_mana_charge',
      name: 'マナチャージ',
      description: '自身のTPを回復する魔導士の秘術。',
    },
    skill_mage_absolute_zero: {
      id: 'skill_mage_absolute_zero',
      name: 'アブソリュートゼロ',
      description: '敵全体を凍てつかせる極大の氷属性奥義。',
    },
    skill_mage_ragnarok: {
      id: 'skill_mage_ragnarok',
      name: 'ラグナロク',
      description: '単体を無属性の極大魔法で滅する極奥義。',
    },
    passive_mage_overload: {
      id: 'passive_mage_overload',
      name: '魔導過負荷',
      description: '魔法攻撃が大きく上昇する（常時）。',
    },
    skill_ranger_double_shot: {
      id: 'skill_ranger_double_shot',
      name: 'ダブルショット',
      description: '単体に2連続の射撃を浴びせる。',
    },
    skill_ranger_sky_volley: {
      id: 'skill_ranger_sky_volley',
      name: '空裂の斉射',
      description: '敵全体に降り注ぐ強力な射撃ダメージ（奥義）。',
    },
    skill_ranger_apollo_shot: {
      id: 'skill_ranger_apollo_shot',
      name: '滅びの一矢',
      description: '単体に絶大な貫通ダメージを与える狙撃の極致（奥義）。',
    },
    skill_ranger_binding_volley: {
      id: 'skill_ranger_binding_volley',
      name: '封鎖の斉射',
      description: '敵全体に射撃ダメージを与え、確率で腕を封じる。',
    },
    skill_ranger_falconry: {
      id: 'skill_ranger_falconry',
      name: '鷹匠の絆',
      description: '自律して敵を攻撃する鷹を最前列に呼ぶ（戦闘限り）。',
    },
    skill_ranger_hunters_mark: {
      id: 'skill_ranger_hunters_mark',
      name: '狩人の照準',
      description: '自身の命中を大きく高める。',
    },
    skill_ranger_field_dressing: {
      id: 'skill_ranger_field_dressing',
      name: '応急手当',
      description: '味方全体の状態異常を治療する。',
    },
    skill_ranger_volley_chase: {
      id: 'skill_ranger_volley_chase',
      name: '追い討ちの構え',
      description: '味方が突属性で敵を攻撃した時、追撃する構えを取る（数ターン）。',
    },
    passive_ranger_keen_eye: {
      id: 'passive_ranger_keen_eye',
      name: '精密眼',
      description: '命中とクリティカル率が上昇する（常時）。',
    },
    passive_ranger_swift_hands: {
      id: 'passive_ranger_swift_hands',
      name: '速射の手',
      description: '物理攻撃が上昇する（常時）。',
    },
    passive_ranger_predator: {
      id: 'passive_ranger_predator',
      name: '狩猟本能',
      description: '物理攻撃とクリティカル率が上昇する（常時）。',
    },
    skill_medic_regen_balm: {
      id: 'skill_medic_regen_balm',
      name: 'リジェネバーム',
      description: '味方1人のHPを大きく回復する。',
    },
    skill_medic_salvation: {
      id: 'skill_medic_salvation',
      name: 'サルベーション',
      description: '味方全体のHPを絶大に回復する奥義。',
    },
    skill_medic_panacea: {
      id: 'skill_medic_panacea',
      name: 'パナケイア',
      description: '味方全体のHPを大きく回復しつつ状態異常を治療する奥義。',
    },
    skill_medic_sleep_mist: {
      id: 'skill_medic_sleep_mist',
      name: 'スリープミスト',
      description: '敵全体を確率で眠らせる。',
    },
    skill_medic_paralysis_powder: {
      id: 'skill_medic_paralysis_powder',
      name: '痺れ粉',
      description: '敵全体を確率で麻痺させる。',
    },
    skill_medic_immune_hymn: {
      id: 'skill_medic_immune_hymn',
      name: '免疫の聖歌',
      description: '味方全体の物理防御を高める。',
    },
    skill_medic_revive_draft: {
      id: 'skill_medic_revive_draft',
      name: '蘇生薬',
      description: '味方全体のTPを回復させる。',
    },
    skill_medic_weakening_smoke: {
      id: 'skill_medic_weakening_smoke',
      name: '衰弱の煙',
      description: '敵全体の物理攻撃力を下げる。',
    },
    passive_medic_healing_hands: {
      id: 'passive_medic_healing_hands',
      name: '癒しの手',
      description: '魔法攻撃力が上昇する（常時）。',
    },
    passive_medic_staff_mastery: {
      id: 'passive_medic_staff_mastery',
      name: '杖の心得',
      description: '杖を装備中、魔法攻撃力が上昇する（常時）。',
    },
    passive_medic_vitality: {
      id: 'passive_medic_vitality',
      name: '健勝',
      description: '最大HPが上昇する（常時）。',
    },
    skill_dancer_chant_of_valor: {
      id: 'skill_dancer_chant_of_valor',
      name: '勇気の歌',
      description: '味方全体の命中を高める。',
    },
    skill_dancer_curse_dance: {
      id: 'skill_dancer_curse_dance',
      name: '呪縛の舞',
      description: '敵全体の回避を下げる。',
    },
    skill_dancer_storm_waltz: {
      id: 'skill_dancer_storm_waltz',
      name: '嵐の円舞',
      description: '敵全体を斬り払う剣舞の奥義。',
    },
    skill_dancer_dual_blade: {
      id: 'skill_dancer_dual_blade',
      name: '双剣の舞',
      description: '単体に2連続の斬撃を浴びせる。',
    },
    skill_dancer_grand_finale: {
      id: 'skill_dancer_grand_finale',
      name: '大円舞曲',
      description: '味方全体のHPを大きく回復する癒しの奥義。',
    },
    skill_dancer_blade_chase: {
      id: 'skill_dancer_blade_chase',
      name: '連舞の構え',
      description: '味方が斬属性で敵を攻撃した時、追撃する構えを取る（数ターン）。',
    },
    skill_dancer_lullaby_song: {
      id: 'skill_dancer_lullaby_song',
      name: '安らぎの調べ',
      description: '敵全体を確率で眠らせる舞姫の歌。',
    },
    skill_dancer_mana_song: {
      id: 'skill_dancer_mana_song',
      name: '律動の歌',
      description: '味方全体のTPを回復させる。',
    },
    passive_dancer_blade_mastery: {
      id: 'passive_dancer_blade_mastery',
      name: '剣の心得',
      description: '剣を装備中、物理攻撃力が上昇する（常時）。',
    },
    passive_dancer_vigor: {
      id: 'passive_dancer_vigor',
      name: '活力',
      description: '最大HPが上昇する（常時）。',
    },
    passive_dancer_resonance: {
      id: 'passive_dancer_resonance',
      name: '共鳴',
      description: '魔法攻撃力と最大TPが上昇する（常時）。',
    },
    skill_monk_double_palm: {
      id: 'skill_monk_double_palm',
      name: '双掌打',
      description: '単体に壊打の2連撃を浴びせる。',
    },
    skill_monk_pressure_point: {
      id: 'skill_monk_pressure_point',
      name: '点穴突き',
      description: '単体に壊打ダメージを与え、確率で腕を封じる。',
    },
    skill_monk_whirlwind_kick: {
      id: 'skill_monk_whirlwind_kick',
      name: '旋風脚',
      description: '敵全体を蹴り払う壊打。',
    },
    skill_monk_ki_guard: {
      id: 'skill_monk_ki_guard',
      name: '気功護身',
      description: '自身の物理防御を高める。',
    },
    skill_monk_breathing: {
      id: 'skill_monk_breathing',
      name: '吐納',
      description: '自身のTPを回復する呼吸法。',
    },
    skill_monk_seven_star: {
      id: 'skill_monk_seven_star',
      name: '七星連撃',
      description: '単体に壊打の5連撃を叩き込む奥義。',
    },
    skill_monk_demon_palm: {
      id: 'skill_monk_demon_palm',
      name: '羅刹掌',
      description: '単体に壊打の渾身奥義を放つ。',
    },
    passive_monk_counter_mastery: {
      id: 'passive_monk_counter_mastery',
      name: '反骨',
      description: '物理攻撃力とクリティカル率が上昇する（常時）。',
    },
    skill_hexer_drowsy_hex: {
      id: 'skill_hexer_drowsy_hex',
      name: '微睡の呪',
      description: '単体を確率で眠らせる（被ダメで解除）。',
    },
    skill_hexer_dark_bolt: {
      id: 'skill_hexer_dark_bolt',
      name: '闇の呪弾',
      description: '単体に無属性魔法ダメージ。',
    },
    skill_hexer_mass_paralyze: {
      id: 'skill_hexer_mass_paralyze',
      name: '痺れの呪',
      description: '敵全体を確率で麻痺させる。',
    },
    skill_hexer_def_hex: {
      id: 'skill_hexer_def_hex',
      name: '虚弱の呪',
      description: '敵全体の物理防御を下げる。',
    },
    skill_hexer_mdef_hex: {
      id: 'skill_hexer_mdef_hex',
      name: '崩魔の呪',
      description: '敵全体の魔法防御を下げる。',
    },
    skill_hexer_nightmare: {
      id: 'skill_hexer_nightmare',
      name: '悪夢の呪',
      description: '単体に魔法ダメージを与え、確率で眠らせる奥義。',
    },
    skill_hexer_calamity: {
      id: 'skill_hexer_calamity',
      name: '災禍の呪',
      description: '敵全体に強力な無属性魔法ダメージを与え、確率で毒にする奥義。',
    },
    passive_hexer_curse_lore: {
      id: 'passive_hexer_curse_lore',
      name: '呪術の知識',
      description: '魔法攻撃力が上昇する（常時）。',
    },
    skill_summoner_bone_spear: {
      id: 'skill_summoner_bone_spear',
      name: '骨の槍',
      description: '単体に無属性魔法ダメージを与え、確率で麻痺させる。',
    },
    skill_summoner_grave_field: {
      id: 'skill_summoner_grave_field',
      name: '墓標の凍土',
      description: '敵全体に氷属性魔法ダメージ。',
    },
    skill_summoner_soul_ward: {
      id: 'skill_summoner_soul_ward',
      name: '霊障の壁',
      description: '味方全体に、被弾を肩代わりする障壁を張る（数ターン）。',
    },
    skill_summoner_spirit_veil: {
      id: 'skill_summoner_spirit_veil',
      name: '霊衣',
      description: '自身の魔法防御を高める。',
    },
    skill_summoner_necro_bolt: {
      id: 'skill_summoner_necro_bolt',
      name: '死霊弾',
      description: '単体に無属性魔法ダメージ。',
    },
    skill_summoner_annihilation: {
      id: 'skill_summoner_annihilation',
      name: '冥滅爆裂',
      description: '敵全体に絶大な無属性魔法ダメージを与える奥義。',
    },
    skill_summoner_soul_render: {
      id: 'skill_summoner_soul_render',
      name: '魂喰らい',
      description: '単体に極大の無属性魔法ダメージを与える奥義。',
    },
    passive_summoner_spirit_lore: {
      id: 'passive_summoner_spirit_lore',
      name: '冥導',
      description: '魔法攻撃力と最大TPが上昇する（常時）。',
    },
    skill_summoner_call_revenant: {
      id: 'skill_summoner_call_revenant',
      name: '亡者召喚',
      description: '敵の攻撃を引き受ける高耐久の亡者の壁を最前列に呼ぶ（戦闘限り）。',
    },
  },
  En = {
    skill_union_rally: {
      id: 'skill_union_rally',
      name: '結束の鬨',
      description: '味方全体を大回復し、物理攻撃力を高める。単独で発動できる。',
      raceId: 'race_human',
      requiredParticipants: 1,
      gaugeCostPerParticipant: 100,
      element: 'almighty',
      target: 'allyAll',
      effects: [
        { kind: 'heal', amount: (l) => 60 + 25 * l },
        {
          kind: 'buff',
          stat: 'patk',
          modifier: (l) => 1.2 + 0.05 * l,
          turns: 3,
          stackGroup: 'union',
        },
      ],
    },
    skill_union_smash: {
      id: 'skill_union_smash',
      name: '豪砕',
      description: '2名のユニオンで敵全体に強力な壊打ダメージを与える。',
      raceId: 'race_garon',
      requiredParticipants: 2,
      gaugeCostPerParticipant: 50,
      element: 'bash',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 2.2 + 0.4 * l }],
    },
    skill_union_nova: {
      id: 'skill_union_nova',
      name: '魔光爆裂',
      description: '2名のユニオンで敵全体に大きな火属性魔法ダメージを与える。',
      raceId: 'race_pix',
      requiredParticipants: 2,
      gaugeCostPerParticipant: 50,
      element: 'fire',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 2.4 + 0.5 * l }],
    },
    skill_union_fang: {
      id: 'skill_union_fang',
      name: '連牙',
      description: '単体に貫通の3連撃を浴びせる。単独で発動できる。',
      raceId: 'race_therian',
      requiredParticipants: 1,
      gaugeCostPerParticipant: 100,
      element: 'pierce',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 1.4 + 0.3 * l, hits: 3 }],
    },
    skill_union_moonlight: {
      id: 'skill_union_moonlight',
      name: '月光の癒し',
      description: '味方全体を大回復し、魔法防御を高める。単独で発動できる。',
      raceId: 'race_lunar',
      requiredParticipants: 1,
      gaugeCostPerParticipant: 100,
      element: 'almighty',
      target: 'allyAll',
      effects: [
        { kind: 'heal', amount: (l) => 55 + 22 * l },
        {
          kind: 'buff',
          stat: 'mdef',
          modifier: (l) => 1.2 + 0.05 * l,
          turns: 3,
          stackGroup: 'union',
        },
      ],
    },
    skill_union_quake: {
      id: 'skill_union_quake',
      name: '大震撃',
      description: '2名のユニオンで敵全体に大きな壊打ダメージを与える。',
      raceId: 'race_golan',
      requiredParticipants: 2,
      gaugeCostPerParticipant: 50,
      element: 'bash',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 2.3 + 0.4 * l }],
    },
  },
  Ue = {
    LEVEL_CAP: 100,
    BOSS_INTERVAL: 10,
    BAND_SIZE: 10,
    ENEMY_SCALE_K: 0.06,
    EXP_CURVE_BASE: 20,
    EXP_CURVE_POW: 1.6,
    SP_PER_LEVEL: 1.62,
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
  yb = 500,
  bc = 30,
  Cr = 3,
  Nr = 2,
  bb = Cr + Nr,
  Mi = { TITLE_DEPTH: 20, REBIRTH_MIN_LEVEL: 30 },
  uh = 5,
  xb = 5,
  pl = {
    MAX_LEVEL: 5,
    STAT_PER_LEVEL: 2,
    INGOT_INC: { copper: 1, silver: 3, gold: 5 },
    FRAGMENTS_PER_INGOT: 10,
    RECYCLE_FRAGMENTS: 3,
  },
  Bi = (l) => l > 0 && l % Ue.BOSS_INTERVAL === 0,
  vp = (l) => Math.round(Ue.EXP_CURVE_BASE * Math.pow(l, Ue.EXP_CURVE_POW)),
  hr = (l) => Math.round(Ue.SP_PER_LEVEL * Math.max(0, l - 1)),
  Sb = (l) => hr(l) - hr(l - 1),
  sc = (l) => l < Ue.LEVEL_CAP,
  Gc = (l, i) => 1 + Ue.ENEMY_SCALE_K * (l - i),
  ol = {
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
      drops: [{ itemId: 'item_slime_jelly', rate: 0.6 }],
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
      drops: [{ itemId: 'item_rat_tail', rate: 0.5 }],
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
      drops: [{ itemId: 'item_bat_wing', rate: 0.5 }],
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
      drops: [{ itemId: 'item_golem_core', rate: 1 }],
      isBoss: !0,
      kind: 'boss',
    },
    enemy_t0_forest_rabbit: {
      id: 'enemy_t0_forest_rabbit',
      name: 'もりウサギ',
      baseStats: { hp: 16, tp: 0, str: 5, vit: 3, agi: 9, int: 2, mnd: 3, luc: 6 },
      refDepth: 3,
      tierBand: 0,
      exp: 5,
      gold: 4,
      attackElement: 'bash',
      drops: [{ itemId: 'item_mat_t0_soft_pelt', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t0_glow_mushroom: {
      id: 'enemy_t0_glow_mushroom',
      name: 'ひかりタケ',
      baseStats: { hp: 22, tp: 0, str: 6, vit: 6, agi: 4, int: 4, mnd: 4, luc: 3 },
      refDepth: 3,
      tierBand: 0,
      exp: 7,
      gold: 5,
      attackElement: 'bash',
      resist: { fire: 1.5, volt: 0.5 },
      drops: [{ itemId: 'item_mat_t0_spore_cap', rate: 0.6 }],
      kind: 'zako',
    },
    enemy_t0_wood_caracal: {
      id: 'enemy_t0_wood_caracal',
      name: 'やぶカラカル',
      baseStats: { hp: 20, tp: 0, str: 8, vit: 4, agi: 8, int: 3, mnd: 2, luc: 5 },
      refDepth: 3,
      tierBand: 0,
      exp: 8,
      gold: 6,
      attackElement: 'slash',
      drops: [{ itemId: 'item_mat_t0_soft_pelt', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t0_pale_wisp: {
      id: 'enemy_t0_pale_wisp',
      name: 'あおざめた亡霊',
      baseStats: { hp: 19, tp: 0, str: 6, vit: 3, agi: 6, int: 4, mnd: 4, luc: 4 },
      refDepth: 3,
      tierBand: 0,
      exp: 8,
      gold: 7,
      attackElement: 'bash',
      resist: { slash: 0.5, pierce: 0.5, fire: 1.5 },
      drops: [{ itemId: 'item_mat_t0_faint_ember', rate: 0.4 }],
      kind: 'zako',
    },
    enemy_t0_bristle_boar: {
      id: 'enemy_t0_bristle_boar',
      name: 'こイノシシ',
      baseStats: { hp: 26, tp: 0, str: 8, vit: 6, agi: 5, int: 2, mnd: 3, luc: 4 },
      refDepth: 3,
      tierBand: 0,
      exp: 9,
      gold: 8,
      attackElement: 'bash',
      drops: [{ itemId: 'item_mat_t0_soft_pelt', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t0_thicket_stag: {
      id: 'enemy_t0_thicket_stag',
      name: 'しげみのオオツノジカ',
      baseStats: { hp: 58, tp: 0, str: 11, vit: 9, agi: 8, int: 3, mnd: 5, luc: 5 },
      refDepth: 6,
      tierBand: 0,
      exp: 30,
      gold: 40,
      attackElement: 'pierce',
      resist: { fire: 1.5 },
      drops: [{ itemId: 'item_mat_t0_great_antler', rate: 0.7 }],
      kind: 'foe',
    },
    enemy_t0_cave_crawler: {
      id: 'enemy_t0_cave_crawler',
      name: 'どうくつヤスデ',
      baseStats: { hp: 70, tp: 0, str: 10, vit: 10, agi: 5, int: 2, mnd: 4, luc: 3 },
      refDepth: 6,
      tierBand: 0,
      exp: 35,
      gold: 45,
      attackElement: 'bash',
      resist: { pierce: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t0_chitin_plate', rate: 0.7 }],
      kind: 'foe',
    },
    enemy_t0_elder_treant: {
      id: 'enemy_t0_elder_treant',
      name: 'ふるびた樹人',
      baseStats: { hp: 68, tp: 0, str: 13, vit: 10, agi: 5, int: 4, mnd: 6, luc: 4 },
      refDepth: 6,
      tierBand: 0,
      exp: 40,
      gold: 55,
      attackElement: 'bash',
      resist: { slash: 0.5, bash: 0.5, fire: 1.5, ice: 0.5 },
      drops: [{ itemId: 'item_mat_t0_great_antler', rate: 0.6 }],
      kind: 'foe',
    },
    enemy_t1_crag_goat: {
      id: 'enemy_t1_crag_goat',
      name: 'がんぺきヤギ',
      baseStats: { hp: 44, tp: 0, str: 14, vit: 11, agi: 9, int: 3, mnd: 4, luc: 5 },
      refDepth: 13,
      tierBand: 1,
      exp: 16,
      gold: 14,
      attackElement: 'bash',
      drops: [{ itemId: 'item_mat_t1_coarse_hide', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t1_rock_lizard: {
      id: 'enemy_t1_rock_lizard',
      name: 'いわトカゲ',
      baseStats: { hp: 50, tp: 0, str: 13, vit: 13, agi: 7, int: 3, mnd: 4, luc: 4 },
      refDepth: 13,
      tierBand: 1,
      exp: 18,
      gold: 16,
      attackElement: 'slash',
      resist: { fire: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t1_stone_scale', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t1_highland_hawk: {
      id: 'enemy_t1_highland_hawk',
      name: 'こうちタカ',
      baseStats: { hp: 38, tp: 0, str: 15, vit: 8, agi: 12, int: 4, mnd: 4, luc: 6 },
      refDepth: 13,
      tierBand: 1,
      exp: 17,
      gold: 15,
      attackElement: 'pierce',
      resist: { volt: 1.5 },
      drops: [{ itemId: 'item_mat_t1_sharp_feather', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t1_stone_beetle: {
      id: 'enemy_t1_stone_beetle',
      name: 'いわかぶとムシ',
      baseStats: { hp: 56, tp: 0, str: 13, vit: 13, agi: 6, int: 2, mnd: 5, luc: 4 },
      refDepth: 13,
      tierBand: 1,
      exp: 19,
      gold: 17,
      attackElement: 'bash',
      resist: { bash: 0.5, pierce: 0.5, volt: 1.5 },
      drops: [{ itemId: 'item_mat_t1_stone_scale', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t1_cliff_ram: {
      id: 'enemy_t1_cliff_ram',
      name: 'がけのオオヒツジ',
      baseStats: { hp: 52, tp: 0, str: 16, vit: 12, agi: 8, int: 2, mnd: 4, luc: 5 },
      refDepth: 13,
      tierBand: 1,
      exp: 20,
      gold: 18,
      attackElement: 'bash',
      drops: [{ itemId: 'item_mat_t1_coarse_hide', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t1_ember_lizard: {
      id: 'enemy_t1_ember_lizard',
      name: 'ほむらトカゲ',
      baseStats: { hp: 46, tp: 0, str: 17, vit: 10, agi: 10, int: 5, mnd: 5, luc: 5 },
      refDepth: 13,
      tierBand: 1,
      exp: 21,
      gold: 20,
      attackElement: 'slash',
      resist: { fire: 0, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t1_stone_scale', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t1_boulder_toad: {
      id: 'enemy_t1_boulder_toad',
      name: 'いわガマ',
      baseStats: { hp: 58, tp: 0, str: 12, vit: 12, agi: 6, int: 4, mnd: 6, luc: 4 },
      refDepth: 13,
      tierBand: 1,
      exp: 18,
      gold: 16,
      attackElement: 'bash',
      resist: { volt: 1.5, ice: 0.5 },
      drops: [{ itemId: 'item_mat_t1_coarse_hide', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t1_young_baboon: {
      id: 'enemy_t1_young_baboon',
      name: 'わかザル',
      baseStats: { hp: 48, tp: 0, str: 16, vit: 9, agi: 11, int: 4, mnd: 4, luc: 6 },
      refDepth: 13,
      tierBand: 1,
      exp: 22,
      gold: 22,
      attackElement: 'bash',
      drops: [{ itemId: 'item_mat_t1_coarse_hide', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t1_boulder_ogre: {
      id: 'enemy_t1_boulder_ogre',
      name: 'おおいわのオーガ',
      baseStats: { hp: 150, tp: 0, str: 28, vit: 22, agi: 7, int: 3, mnd: 8, luc: 5 },
      refDepth: 16,
      tierBand: 1,
      exp: 100,
      gold: 140,
      attackElement: 'bash',
      resist: { bash: 0.5, slash: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t1_ogre_fang', rate: 0.7 }],
      kind: 'foe',
    },
    enemy_t1_thunder_roc: {
      id: 'enemy_t1_thunder_roc',
      name: 'いかずちの大ワシ',
      baseStats: { hp: 110, tp: 0, str: 26, vit: 16, agi: 13, int: 6, mnd: 7, luc: 6 },
      refDepth: 16,
      tierBand: 1,
      exp: 80,
      gold: 110,
      attackElement: 'pierce',
      resist: { volt: 0, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t1_sharp_feather', rate: 0.7 }],
      kind: 'foe',
    },
    enemy_t1_magma_drake: {
      id: 'enemy_t1_magma_drake',
      name: 'マグマの竜トカゲ',
      baseStats: { hp: 160, tp: 0, str: 30, vit: 20, agi: 9, int: 7, mnd: 9, luc: 5 },
      refDepth: 16,
      tierBand: 1,
      exp: 110,
      gold: 160,
      attackElement: 'slash',
      resist: { fire: 0, slash: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t1_drake_horn', rate: 0.8 }],
      kind: 'foe',
    },
    enemy_t1_boss_mountain_lord: {
      id: 'enemy_t1_boss_mountain_lord',
      name: '山嶺の大猿王',
      baseStats: { hp: 620, tp: 0, str: 40, vit: 34, agi: 12, int: 8, mnd: 18, luc: 8 },
      refDepth: 20,
      tierBand: 1,
      exp: 400,
      gold: 650,
      attackElement: 'bash',
      resist: { bash: 0.5, slash: 0.5, pierce: 0.5, fire: 0.5, volt: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t1_lord_pelt', rate: 1 }],
      kind: 'boss',
      isBoss: !0,
    },
    enemy_t2_frostfang_wolf: {
      id: 'enemy_t2_frostfang_wolf',
      name: 'シモフリオオカミ',
      baseStats: { hp: 88, tp: 0, str: 26, vit: 16, agi: 14, int: 6, mnd: 8, luc: 7 },
      refDepth: 23,
      tierBand: 2,
      exp: 46,
      gold: 42,
      attackElement: 'slash',
      resist: { ice: 0.5, fire: 1.5 },
      drops: [{ itemId: 'item_mat_t2_frost_pelt', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t2_snow_ape: {
      id: 'enemy_t2_snow_ape',
      name: 'セッペキザル',
      baseStats: { hp: 96, tp: 0, str: 27, vit: 18, agi: 10, int: 5, mnd: 9, luc: 6 },
      refDepth: 23,
      tierBand: 2,
      exp: 50,
      gold: 48,
      attackElement: 'bash',
      resist: { ice: 0.5, fire: 1.5, bash: 0.5 },
      drops: [{ itemId: 'item_mat_t2_frost_pelt', rate: 0.45 }],
      kind: 'zako',
    },
    enemy_t2_glacier_crab: {
      id: 'enemy_t2_glacier_crab',
      name: 'ヒョウケツガニ',
      baseStats: { hp: 100, tp: 0, str: 23, vit: 20, agi: 8, int: 4, mnd: 10, luc: 5 },
      refDepth: 23,
      tierBand: 2,
      exp: 48,
      gold: 50,
      attackElement: 'pierce',
      resist: { ice: 0.5, fire: 1.5, slash: 0.5 },
      drops: [{ itemId: 'item_mat_t2_ice_crystal', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t2_snow_owl: {
      id: 'enemy_t2_snow_owl',
      name: 'セツゲンフクロウ',
      baseStats: { hp: 72, tp: 0, str: 24, vit: 14, agi: 16, int: 9, mnd: 8, luc: 9 },
      refDepth: 23,
      tierBand: 2,
      exp: 44,
      gold: 38,
      attackElement: 'slash',
      resist: { ice: 0.5, fire: 1.5, volt: 1.5 },
      drops: [{ itemId: 'item_mat_t2_frost_pelt', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t2_ice_wisp: {
      id: 'enemy_t2_ice_wisp',
      name: 'コオリビ',
      baseStats: { hp: 70, tp: 0, str: 22, vit: 14, agi: 15, int: 12, mnd: 12, luc: 8 },
      refDepth: 23,
      tierBand: 2,
      exp: 42,
      gold: 40,
      attackElement: 'bash',
      resist: { ice: 0, fire: 1.5, slash: 0.5, pierce: 0.5 },
      drops: [{ itemId: 'item_mat_t2_chill_core', rate: 0.45 }],
      kind: 'zako',
    },
    enemy_t2_rime_beetle: {
      id: 'enemy_t2_rime_beetle',
      name: 'ジュヒョウムシ',
      baseStats: { hp: 92, tp: 0, str: 25, vit: 19, agi: 11, int: 5, mnd: 7, luc: 6 },
      refDepth: 23,
      tierBand: 2,
      exp: 47,
      gold: 44,
      attackElement: 'pierce',
      resist: { ice: 0.5, fire: 1.5 },
      drops: [{ itemId: 'item_mat_t2_ice_crystal', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t2_frost_stag: {
      id: 'enemy_t2_frost_stag',
      name: 'ヒョウガジカ',
      baseStats: { hp: 98, tp: 0, str: 28, vit: 18, agi: 13, int: 6, mnd: 9, luc: 7 },
      refDepth: 23,
      tierBand: 2,
      exp: 52,
      gold: 46,
      attackElement: 'pierce',
      resist: { ice: 0.5, fire: 1.5 },
      drops: [{ itemId: 'item_mat_t2_frost_pelt', rate: 0.55 }],
      kind: 'zako',
    },
    enemy_t2_snow_serpent: {
      id: 'enemy_t2_snow_serpent',
      name: 'セツゲンヘビ',
      baseStats: { hp: 84, tp: 0, str: 27, vit: 15, agi: 16, int: 7, mnd: 7, luc: 8 },
      refDepth: 23,
      tierBand: 2,
      exp: 49,
      gold: 43,
      attackElement: 'pierce',
      resist: { ice: 0.5, fire: 1.5, volt: 0.5 },
      drops: [{ itemId: 'item_mat_t2_chill_core', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t2_glacial_bear: {
      id: 'enemy_t2_glacial_bear',
      name: 'ヒョウガグマ',
      baseStats: { hp: 280, tp: 0, str: 50, vit: 30, agi: 12, int: 6, mnd: 14, luc: 8 },
      refDepth: 26,
      tierBand: 2,
      exp: 220,
      gold: 320,
      attackElement: 'bash',
      resist: { ice: 0.5, fire: 1.5, bash: 0.5 },
      drops: [
        { itemId: 'item_mat_t2_frost_pelt', rate: 0.8 },
        { itemId: 'item_mat_t2_chill_core', rate: 0.6 },
      ],
      kind: 'foe',
    },
    enemy_t2_iron_ice_golem: {
      id: 'enemy_t2_iron_ice_golem',
      name: 'ヒョウケツゴーレム',
      baseStats: { hp: 300, tp: 0, str: 46, vit: 34, agi: 8, int: 5, mnd: 16, luc: 6 },
      refDepth: 26,
      tierBand: 2,
      exp: 210,
      gold: 340,
      attackElement: 'bash',
      resist: { ice: 0, fire: 1.5, slash: 0.5, pierce: 0.5 },
      drops: [
        { itemId: 'item_mat_t2_ice_crystal', rate: 0.8 },
        { itemId: 'item_mat_t2_chill_core', rate: 0.6 },
      ],
      kind: 'foe',
    },
    enemy_t2_blizzard_hawk: {
      id: 'enemy_t2_blizzard_hawk',
      name: 'フブキタカ',
      baseStats: { hp: 200, tp: 0, str: 52, vit: 24, agi: 22, int: 8, mnd: 10, luc: 11 },
      refDepth: 26,
      tierBand: 2,
      exp: 160,
      gold: 220,
      attackElement: 'slash',
      resist: { ice: 0.5, fire: 1.5, volt: 1.5 },
      drops: [
        { itemId: 'item_mat_t2_frost_pelt', rate: 0.7 },
        { itemId: 'item_mat_t2_ice_crystal', rate: 0.6 },
      ],
      kind: 'foe',
    },
    enemy_t2_boss_frost_monarch: {
      id: 'enemy_t2_boss_frost_monarch',
      name: '氷晶の女王',
      baseStats: { hp: 1300, tp: 0, str: 64, vit: 54, agi: 18, int: 16, mnd: 22, luc: 12 },
      refDepth: 30,
      tierBand: 2,
      exp: 860,
      gold: 1400,
      attackElement: 'bash',
      resist: { ice: 0, fire: 1.5, slash: 0.5, pierce: 0.5, bash: 0.5, volt: 0.5 },
      drops: [{ itemId: 'item_mat_t2_monarch_diadem', rate: 1 }],
      kind: 'boss',
      isBoss: !0,
    },
    enemy_t3_storm_wolf: {
      id: 'enemy_t3_storm_wolf',
      name: 'ライメイオオカミ',
      baseStats: { hp: 150, tp: 0, str: 42, vit: 26, agi: 24, int: 8, mnd: 10, luc: 10 },
      refDepth: 33,
      tierBand: 3,
      exp: 96,
      gold: 84,
      attackElement: 'slash',
      resist: { volt: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t3_charged_hide', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t3_thunder_bird: {
      id: 'enemy_t3_thunder_bird',
      name: 'ライウチョウ',
      baseStats: { hp: 134, tp: 0, str: 40, vit: 24, agi: 30, int: 12, mnd: 11, luc: 13 },
      refDepth: 33,
      tierBand: 3,
      exp: 92,
      gold: 78,
      attackElement: 'slash',
      resist: { volt: 0, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t3_storm_feather', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t3_spark_beetle: {
      id: 'enemy_t3_spark_beetle',
      name: 'ホウデンムシ',
      baseStats: { hp: 156, tp: 0, str: 38, vit: 30, agi: 20, int: 10, mnd: 9, luc: 9 },
      refDepth: 33,
      tierBand: 3,
      exp: 90,
      gold: 80,
      attackElement: 'pierce',
      resist: { volt: 0.5, ice: 1.5, bash: 0.5 },
      drops: [{ itemId: 'item_mat_t3_thunder_carapace', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t3_gale_serpent: {
      id: 'enemy_t3_gale_serpent',
      name: 'シップウヘビ',
      baseStats: { hp: 140, tp: 0, str: 44, vit: 24, agi: 28, int: 9, mnd: 8, luc: 11 },
      refDepth: 33,
      tierBand: 3,
      exp: 94,
      gold: 82,
      attackElement: 'pierce',
      resist: { volt: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t3_charged_hide', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t3_charged_wisp: {
      id: 'enemy_t3_charged_wisp',
      name: 'イカズチビ',
      baseStats: { hp: 130, tp: 0, str: 36, vit: 24, agi: 26, int: 16, mnd: 14, luc: 10 },
      refDepth: 33,
      tierBand: 3,
      exp: 88,
      gold: 86,
      attackElement: 'bash',
      resist: { volt: 0, ice: 1.5, slash: 0.5, pierce: 0.5 },
      drops: [{ itemId: 'item_mat_t3_storm_feather', rate: 0.45 }],
      kind: 'zako',
    },
    enemy_t3_tempest_ape: {
      id: 'enemy_t3_tempest_ape',
      name: 'アラシザル',
      baseStats: { hp: 168, tp: 0, str: 45, vit: 32, agi: 22, int: 7, mnd: 10, luc: 8 },
      refDepth: 33,
      tierBand: 3,
      exp: 100,
      gold: 90,
      attackElement: 'bash',
      resist: { volt: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t3_charged_hide', rate: 0.55 }],
      kind: 'zako',
    },
    enemy_t3_static_crystal: {
      id: 'enemy_t3_static_crystal',
      name: 'タイデンクリスタル',
      baseStats: { hp: 162, tp: 0, str: 38, vit: 32, agi: 18, int: 14, mnd: 16, luc: 7 },
      refDepth: 33,
      tierBand: 3,
      exp: 98,
      gold: 100,
      attackElement: 'bash',
      resist: { volt: 0, ice: 1.5, slash: 0.5, pierce: 0.5 },
      drops: [{ itemId: 'item_mat_t3_thunder_carapace', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t3_rain_hawk: {
      id: 'enemy_t3_rain_hawk',
      name: 'シグレタカ',
      baseStats: { hp: 138, tp: 0, str: 41, vit: 25, agi: 32, int: 10, mnd: 11, luc: 13 },
      refDepth: 33,
      tierBand: 3,
      exp: 95,
      gold: 76,
      attackElement: 'slash',
      resist: { volt: 0.5, ice: 1.5, fire: 1.5 },
      drops: [{ itemId: 'item_mat_t3_storm_feather', rate: 0.55 }],
      kind: 'zako',
    },
    enemy_t3_thunder_beast: {
      id: 'enemy_t3_thunder_beast',
      name: 'ゴウライジュウ',
      baseStats: { hp: 480, tp: 0, str: 78, vit: 40, agi: 26, int: 10, mnd: 14, luc: 10 },
      refDepth: 36,
      tierBand: 3,
      exp: 440,
      gold: 640,
      attackElement: 'bash',
      resist: { volt: 0, ice: 1.5, bash: 0.5 },
      drops: [
        { itemId: 'item_mat_t3_charged_hide', rate: 0.8 },
        { itemId: 'item_mat_t3_thunder_carapace', rate: 0.6 },
      ],
      kind: 'foe',
    },
    enemy_t3_storm_roc: {
      id: 'enemy_t3_storm_roc',
      name: 'バクフウチョウ',
      baseStats: { hp: 360, tp: 0, str: 80, vit: 34, agi: 36, int: 12, mnd: 12, luc: 14 },
      refDepth: 36,
      tierBand: 3,
      exp: 360,
      gold: 480,
      attackElement: 'slash',
      resist: { volt: 0.5, ice: 1.5 },
      drops: [
        { itemId: 'item_mat_t3_storm_feather', rate: 0.8 },
        { itemId: 'item_mat_t3_charged_hide', rate: 0.6 },
      ],
      kind: 'foe',
    },
    enemy_t3_discharge_idol: {
      id: 'enemy_t3_discharge_idol',
      name: 'ホウデンキョゾウ',
      baseStats: { hp: 520, tp: 0, str: 64, vit: 44, agi: 20, int: 18, mnd: 20, luc: 8 },
      refDepth: 36,
      tierBand: 3,
      exp: 380,
      gold: 560,
      attackElement: 'bash',
      resist: { volt: 0, ice: 1.5, slash: 0.5, pierce: 0.5 },
      drops: [
        { itemId: 'item_mat_t3_thunder_carapace', rate: 0.8 },
        { itemId: 'item_mat_t3_storm_feather', rate: 0.6 },
      ],
      kind: 'foe',
    },
    enemy_t3_boss_tempest_sovereign: {
      id: 'enemy_t3_boss_tempest_sovereign',
      name: '雷霆の覇王',
      baseStats: { hp: 2500, tp: 0, str: 102, vit: 86, agi: 34, int: 22, mnd: 26, luc: 14 },
      refDepth: 40,
      tierBand: 3,
      exp: 1680,
      gold: 2800,
      attackElement: 'slash',
      resist: { volt: 0, ice: 1.5, slash: 0.5, pierce: 0.5, bash: 0.5, fire: 0.5 },
      drops: [{ itemId: 'item_mat_t3_sovereign_horn', rate: 1 }],
      kind: 'boss',
      isBoss: !0,
    },
    enemy_t4_rotwalker: {
      id: 'enemy_t4_rotwalker',
      name: '腐肉の徘徊者',
      baseStats: { hp: 290, tp: 0, str: 64, vit: 50, agi: 11, int: 8, mnd: 18, luc: 14 },
      refDepth: 43,
      tierBand: 4,
      exp: 180,
      gold: 140,
      attackElement: 'bash',
      resist: { slash: 0.5, pierce: 0.5, fire: 1.5, ice: 0.5 },
      drops: [
        { itemId: 'item_mat_t4_rotflesh', rate: 0.55 },
        { itemId: 'item_mat_t4_grave_dust', rate: 0.4 },
      ],
      kind: 'zako',
    },
    enemy_t4_bone_lancer: {
      id: 'enemy_t4_bone_lancer',
      name: '骸骨の突撃兵',
      baseStats: { hp: 248, tp: 0, str: 70, vit: 44, agi: 18, int: 6, mnd: 12, luc: 16 },
      refDepth: 43,
      tierBand: 4,
      exp: 175,
      gold: 150,
      attackElement: 'pierce',
      resist: { pierce: 0.5, ice: 1.5, volt: 0.5 },
      drops: [
        { itemId: 'item_mat_t4_grave_dust', rate: 0.5 },
        { itemId: 'item_mat_t4_cursed_marrow', rate: 0.45 },
      ],
      kind: 'zako',
    },
    enemy_t4_miasma_moth: {
      id: 'enemy_t4_miasma_moth',
      name: '瘴気の毒蛾',
      baseStats: { hp: 232, tp: 0, str: 58, vit: 40, agi: 22, int: 16, mnd: 16, luc: 20 },
      refDepth: 43,
      tierBand: 4,
      exp: 165,
      gold: 120,
      attackElement: 'slash',
      resist: { fire: 0.5, ice: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_toxic_scale', rate: 0.6 },
        { itemId: 'item_mat_t4_rotflesh', rate: 0.4 },
      ],
      kind: 'zako',
    },
    enemy_t4_wraith_lantern: {
      id: 'enemy_t4_wraith_lantern',
      name: '彷徨う鬼火',
      baseStats: { hp: 240, tp: 0, str: 60, vit: 42, agi: 20, int: 20, mnd: 22, luc: 18 },
      refDepth: 43,
      tierBand: 4,
      exp: 190,
      gold: 160,
      attackElement: 'bash',
      resist: { slash: 0.5, bash: 0.5, fire: 0.5, volt: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_spectral_ash', rate: 0.5 },
        { itemId: 'item_mat_t4_cursed_marrow', rate: 0.4 },
      ],
      kind: 'zako',
    },
    enemy_t4_rust_sentinel: {
      id: 'enemy_t4_rust_sentinel',
      name: '錆びた哨戒機',
      baseStats: { hp: 312, tp: 0, str: 66, vit: 52, agi: 10, int: 10, mnd: 14, luc: 12 },
      refDepth: 43,
      tierBand: 4,
      exp: 210,
      gold: 185,
      attackElement: 'bash',
      resist: { slash: 0.5, fire: 0.5, volt: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_steel_gear', rate: 0.55 },
        { itemId: 'item_mat_t4_corroded_plate', rate: 0.45 },
      ],
      kind: 'zako',
    },
    enemy_t4_plague_crawler: {
      id: 'enemy_t4_plague_crawler',
      name: '疫病の這い虫',
      baseStats: { hp: 268, tp: 0, str: 62, vit: 46, agi: 16, int: 12, mnd: 14, luc: 16 },
      refDepth: 43,
      tierBand: 4,
      exp: 170,
      gold: 130,
      attackElement: 'pierce',
      resist: { pierce: 0.5, ice: 0.5, fire: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_toxic_scale', rate: 0.5 },
        { itemId: 'item_mat_t4_rotflesh', rate: 0.45 },
      ],
      kind: 'zako',
    },
    enemy_t4_grave_acolyte: {
      id: 'enemy_t4_grave_acolyte',
      name: '墓守の呪詛師',
      baseStats: { hp: 236, tp: 0, str: 59, vit: 41, agi: 14, int: 22, mnd: 24, luc: 18 },
      refDepth: 43,
      tierBand: 4,
      exp: 200,
      gold: 175,
      attackElement: 'slash',
      resist: { volt: 0.5, ice: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_cursed_marrow', rate: 0.55 },
        { itemId: 'item_mat_t4_spectral_ash', rate: 0.4 },
      ],
      kind: 'zako',
    },
    enemy_t4_gear_hound: {
      id: 'enemy_t4_gear_hound',
      name: '鋼鉄の番犬',
      baseStats: { hp: 256, tp: 0, str: 72, vit: 48, agi: 21, int: 8, mnd: 10, luc: 14 },
      refDepth: 43,
      tierBand: 4,
      exp: 195,
      gold: 165,
      attackElement: 'slash',
      resist: { bash: 0.5, fire: 0.5, ice: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_steel_gear', rate: 0.5 },
        { itemId: 'item_mat_t4_corroded_plate', rate: 0.4 },
      ],
      kind: 'zako',
    },
    enemy_t4_corpse_colossus: {
      id: 'enemy_t4_corpse_colossus',
      name: '腐肉の巨像',
      baseStats: { hp: 860, tp: 0, str: 118, vit: 86, agi: 10, int: 12, mnd: 24, luc: 18 },
      refDepth: 46,
      tierBand: 4,
      exp: 880,
      gold: 1280,
      attackElement: 'bash',
      resist: { slash: 0.5, pierce: 0.5, bash: 0.5, fire: 1.5, ice: 0.5 },
      drops: [
        { itemId: 'item_mat_t4_rotflesh', rate: 0.75 },
        { itemId: 'item_mat_t4_grave_dust', rate: 0.6 },
      ],
      kind: 'foe',
    },
    enemy_t4_siege_automaton: {
      id: 'enemy_t4_siege_automaton',
      name: '攻城の自動兵器',
      baseStats: { hp: 820, tp: 0, str: 124, vit: 96, agi: 8, int: 14, mnd: 20, luc: 14 },
      refDepth: 46,
      tierBand: 4,
      exp: 820,
      gold: 1300,
      attackElement: 'pierce',
      resist: { slash: 0.5, pierce: 0.5, fire: 0.5, volt: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_steel_gear', rate: 0.7 },
        { itemId: 'item_mat_t4_corroded_plate', rate: 0.65 },
      ],
      kind: 'foe',
    },
    enemy_t4_shroud_revenant: {
      id: 'enemy_t4_shroud_revenant',
      name: '帷子の怨霊',
      baseStats: { hp: 700, tp: 0, str: 108, vit: 70, agi: 18, int: 24, mnd: 30, luc: 22 },
      refDepth: 46,
      tierBand: 4,
      exp: 760,
      gold: 980,
      attackElement: 'slash',
      resist: { slash: 0.5, bash: 0.5, volt: 0.5, ice: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_spectral_ash', rate: 0.7 },
        { itemId: 'item_mat_t4_cursed_marrow', rate: 0.6 },
      ],
      kind: 'foe',
    },
    enemy_t4_boss_blight_sovereign: {
      id: 'enemy_t4_boss_blight_sovereign',
      name: '瘴気を統べる腐王',
      baseStats: { hp: 4200, tp: 0, str: 142, vit: 122, agi: 16, int: 30, mnd: 64, luc: 26 },
      refDepth: 50,
      tierBand: 4,
      exp: 3e3,
      gold: 4800,
      attackElement: 'bash',
      resist: { slash: 0.5, pierce: 0.5, bash: 0.5, fire: 0.5, volt: 0.5, ice: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_sovereign_crown', rate: 1 },
        { itemId: 'item_mat_t4_rotflesh', rate: 0.8 },
        { itemId: 'item_mat_t4_cursed_marrow', rate: 0.7 },
      ],
      kind: 'boss',
      isBoss: !0,
    },
  },
  ot = {
    equip_short_sword: {
      id: 'equip_short_sword',
      name: 'ショートソード',
      slot: 'weapon',
      tier: 0,
      buyPrice: 120,
      weaponType: 'sword',
      bonuses: { atk: 6 },
    },
    equip_iron_spear: {
      id: 'equip_iron_spear',
      name: '鉄の槍',
      slot: 'weapon',
      tier: 0,
      buyPrice: 150,
      weaponType: 'spear',
      bonuses: { atk: 7 },
    },
    equip_oak_staff: {
      id: 'equip_oak_staff',
      name: '樫の杖',
      slot: 'weapon',
      tier: 0,
      buyPrice: 150,
      weaponType: 'staff',
      bonuses: { mat: 7 },
    },
    equip_short_bow: {
      id: 'equip_short_bow',
      name: 'ショートボウ',
      slot: 'weapon',
      tier: 0,
      buyPrice: 110,
      weaponType: 'bow',
      bonuses: { atk: 5 },
    },
    equip_iron_knuckle: {
      id: 'equip_iron_knuckle',
      name: '鉄甲',
      slot: 'weapon',
      tier: 0,
      buyPrice: 100,
      weaponType: 'fist',
      bonuses: { atk: 5 },
    },
    equip_battle_axe: {
      id: 'equip_battle_axe',
      name: 'バトルアックス',
      slot: 'weapon',
      tier: 0,
      buyPrice: 160,
      weaponType: 'axe',
      bonuses: { atk: 8 },
    },
    equip_leather_armor: {
      id: 'equip_leather_armor',
      name: 'レザーアーマー',
      slot: 'armor',
      tier: 0,
      buyPrice: 100,
      armorType: 'light',
      bonuses: { def: 5 },
    },
    equip_iron_armor: {
      id: 'equip_iron_armor',
      name: '鉄の鎧',
      slot: 'armor',
      tier: 0,
      buyPrice: 180,
      armorType: 'heavy',
      bonuses: { def: 8 },
    },
    equip_cloth_robe: {
      id: 'equip_cloth_robe',
      name: '布のローブ',
      slot: 'armor',
      tier: 0,
      buyPrice: 120,
      armorType: 'clothes',
      bonuses: { def: 2, mdf: 4 },
    },
    equip_amulet: {
      id: 'equip_amulet',
      name: 'まもりのお守り',
      slot: 'accessory',
      tier: 0,
      buyPrice: 140,
      bonuses: { def: 2, mdf: 2 },
    },
    equip_slime_shield: {
      id: 'equip_slime_shield',
      name: 'スライムの盾',
      slot: 'armor',
      tier: 1,
      buyPrice: 220,
      armorType: 'heavy',
      bonuses: { def: 10, mdf: 3 },
    },
    equip_rat_dagger: {
      id: 'equip_rat_dagger',
      name: 'ねずみ牙の短剣',
      slot: 'weapon',
      tier: 1,
      buyPrice: 230,
      weaponType: 'sword',
      bonuses: { atk: 10 },
    },
    equip_bat_cloak: {
      id: 'equip_bat_cloak',
      name: 'コウモリのマント',
      slot: 'armor',
      tier: 1,
      buyPrice: 210,
      armorType: 'light',
      bonuses: { def: 7, mdf: 4 },
    },
    equip_golem_blade: {
      id: 'equip_golem_blade',
      name: 'ゴーレムの大剣',
      slot: 'weapon',
      tier: 1,
      buyPrice: 480,
      weaponType: 'sword',
      bonuses: { atk: 18 },
    },
    equip_t2_sword: {
      id: 'equip_t2_sword',
      name: '鋼の剣',
      slot: 'weapon',
      tier: 2,
      buyPrice: 620,
      weaponType: 'sword',
      bonuses: { atk: 20 },
    },
    equip_t2_spear: {
      id: 'equip_t2_spear',
      name: '鋼の槍',
      slot: 'weapon',
      tier: 2,
      buyPrice: 660,
      weaponType: 'spear',
      bonuses: { atk: 21 },
    },
    equip_t2_axe: {
      id: 'equip_t2_axe',
      name: '鋼の戦斧',
      slot: 'weapon',
      tier: 2,
      buyPrice: 700,
      weaponType: 'axe',
      bonuses: { atk: 23 },
    },
    equip_t2_bow: {
      id: 'equip_t2_bow',
      name: '狩人の弓',
      slot: 'weapon',
      tier: 2,
      buyPrice: 580,
      weaponType: 'bow',
      bonuses: { atk: 17 },
    },
    equip_t2_fist: {
      id: 'equip_t2_fist',
      name: '鋼の籠手',
      slot: 'weapon',
      tier: 2,
      buyPrice: 560,
      weaponType: 'fist',
      bonuses: { atk: 16 },
    },
    equip_t2_staff: {
      id: 'equip_t2_staff',
      name: '銀飾りの杖',
      slot: 'weapon',
      tier: 2,
      buyPrice: 660,
      weaponType: 'staff',
      bonuses: { mat: 21 },
    },
    equip_t2_heavy: {
      id: 'equip_t2_heavy',
      name: '鋼の鎧',
      slot: 'armor',
      tier: 2,
      buyPrice: 600,
      armorType: 'heavy',
      bonuses: { def: 16, mdf: 6 },
    },
    equip_t2_light: {
      id: 'equip_t2_light',
      name: '鎖かたびら',
      slot: 'armor',
      tier: 2,
      buyPrice: 560,
      armorType: 'light',
      bonuses: { def: 11, mdf: 9 },
    },
    equip_t2_clothes: {
      id: 'equip_t2_clothes',
      name: '魔導のローブ',
      slot: 'armor',
      tier: 2,
      buyPrice: 560,
      armorType: 'clothes',
      bonuses: { def: 6, mdf: 15 },
    },
    equip_t2_accessory: {
      id: 'equip_t2_accessory',
      name: '守りの護符',
      slot: 'accessory',
      tier: 2,
      buyPrice: 480,
      bonuses: { def: 4, mdf: 4 },
    },
    equip_t3_sword: {
      id: 'equip_t3_sword',
      name: '銀の剣',
      slot: 'weapon',
      tier: 3,
      buyPrice: 1400,
      weaponType: 'sword',
      bonuses: { atk: 30 },
    },
    equip_t3_spear: {
      id: 'equip_t3_spear',
      name: '銀の槍',
      slot: 'weapon',
      tier: 3,
      buyPrice: 1480,
      weaponType: 'spear',
      bonuses: { atk: 31 },
    },
    equip_t3_axe: {
      id: 'equip_t3_axe',
      name: '銀の大斧',
      slot: 'weapon',
      tier: 3,
      buyPrice: 1560,
      weaponType: 'axe',
      bonuses: { atk: 33 },
    },
    equip_t3_bow: {
      id: 'equip_t3_bow',
      name: '精霊の弓',
      slot: 'weapon',
      tier: 3,
      buyPrice: 1320,
      weaponType: 'bow',
      bonuses: { atk: 27 },
    },
    equip_t3_fist: {
      id: 'equip_t3_fist',
      name: '銀の籠手',
      slot: 'weapon',
      tier: 3,
      buyPrice: 1280,
      weaponType: 'fist',
      bonuses: { atk: 26 },
    },
    equip_t3_staff: {
      id: 'equip_t3_staff',
      name: '賢者の杖',
      slot: 'weapon',
      tier: 3,
      buyPrice: 1480,
      weaponType: 'staff',
      bonuses: { mat: 31 },
    },
    equip_t3_heavy: {
      id: 'equip_t3_heavy',
      name: '銀の鎧',
      slot: 'armor',
      tier: 3,
      buyPrice: 1360,
      armorType: 'heavy',
      bonuses: { def: 24, mdf: 10 },
    },
    equip_t3_light: {
      id: 'equip_t3_light',
      name: '精霊布の服',
      slot: 'armor',
      tier: 3,
      buyPrice: 1280,
      armorType: 'light',
      bonuses: { def: 17, mdf: 13 },
    },
    equip_t3_clothes: {
      id: 'equip_t3_clothes',
      name: '大魔導のローブ',
      slot: 'armor',
      tier: 3,
      buyPrice: 1280,
      armorType: 'clothes',
      bonuses: { def: 9, mdf: 22 },
    },
    equip_t3_accessory: {
      id: 'equip_t3_accessory',
      name: '精霊の指輪',
      slot: 'accessory',
      tier: 3,
      buyPrice: 1100,
      bonuses: { def: 6, mdf: 6 },
    },
    equip_t4_sword: {
      id: 'equip_t4_sword',
      name: 'ミスリルソード',
      slot: 'weapon',
      tier: 4,
      buyPrice: 3e3,
      weaponType: 'sword',
      bonuses: { atk: 42 },
    },
    equip_t4_spear: {
      id: 'equip_t4_spear',
      name: 'ミスリルランス',
      slot: 'weapon',
      tier: 4,
      buyPrice: 3150,
      weaponType: 'spear',
      bonuses: { atk: 43 },
    },
    equip_t4_axe: {
      id: 'equip_t4_axe',
      name: 'ミスリルアックス',
      slot: 'weapon',
      tier: 4,
      buyPrice: 3300,
      weaponType: 'axe',
      bonuses: { atk: 45 },
    },
    equip_t4_bow: {
      id: 'equip_t4_bow',
      name: '月光の弓',
      slot: 'weapon',
      tier: 4,
      buyPrice: 2850,
      weaponType: 'bow',
      bonuses: { atk: 39 },
    },
    equip_t4_fist: {
      id: 'equip_t4_fist',
      name: 'ミスリルの籠手',
      slot: 'weapon',
      tier: 4,
      buyPrice: 2750,
      weaponType: 'fist',
      bonuses: { atk: 38 },
    },
    equip_t4_staff: {
      id: 'equip_t4_staff',
      name: '星見の杖',
      slot: 'weapon',
      tier: 4,
      buyPrice: 3150,
      weaponType: 'staff',
      bonuses: { mat: 43 },
    },
    equip_t4_heavy: {
      id: 'equip_t4_heavy',
      name: 'ミスリルメイル',
      slot: 'armor',
      tier: 4,
      buyPrice: 2900,
      armorType: 'heavy',
      bonuses: { def: 34, mdf: 14 },
    },
    equip_t4_light: {
      id: 'equip_t4_light',
      name: '月光の装束',
      slot: 'armor',
      tier: 4,
      buyPrice: 2750,
      armorType: 'light',
      bonuses: { def: 24, mdf: 19 },
    },
    equip_t4_clothes: {
      id: 'equip_t4_clothes',
      name: '賢者のローブ',
      slot: 'armor',
      tier: 4,
      buyPrice: 2750,
      armorType: 'clothes',
      bonuses: { def: 13, mdf: 31 },
    },
    equip_t4_accessory: {
      id: 'equip_t4_accessory',
      name: '星詠みの護符',
      slot: 'accessory',
      tier: 4,
      buyPrice: 2400,
      bonuses: { def: 9, mdf: 9 },
    },
    equip_t5_sword: {
      id: 'equip_t5_sword',
      name: '竜鱗の剣',
      slot: 'weapon',
      tier: 5,
      buyPrice: 6e3,
      weaponType: 'sword',
      bonuses: { atk: 56 },
    },
    equip_t5_spear: {
      id: 'equip_t5_spear',
      name: '竜牙の槍',
      slot: 'weapon',
      tier: 5,
      buyPrice: 6300,
      weaponType: 'spear',
      bonuses: { atk: 57 },
    },
    equip_t5_axe: {
      id: 'equip_t5_axe',
      name: '竜骨の大斧',
      slot: 'weapon',
      tier: 5,
      buyPrice: 6600,
      weaponType: 'axe',
      bonuses: { atk: 59 },
    },
    equip_t5_bow: {
      id: 'equip_t5_bow',
      name: '竜骨の弓',
      slot: 'weapon',
      tier: 5,
      buyPrice: 5700,
      weaponType: 'bow',
      bonuses: { atk: 53 },
    },
    equip_t5_fist: {
      id: 'equip_t5_fist',
      name: '竜鱗の籠手',
      slot: 'weapon',
      tier: 5,
      buyPrice: 5500,
      weaponType: 'fist',
      bonuses: { atk: 52 },
    },
    equip_t5_staff: {
      id: 'equip_t5_staff',
      name: '竜詠みの杖',
      slot: 'weapon',
      tier: 5,
      buyPrice: 6300,
      weaponType: 'staff',
      bonuses: { mat: 57 },
    },
    equip_t5_heavy: {
      id: 'equip_t5_heavy',
      name: '竜鱗の鎧',
      slot: 'armor',
      tier: 5,
      buyPrice: 5800,
      armorType: 'heavy',
      bonuses: { def: 46, mdf: 18 },
    },
    equip_t5_light: {
      id: 'equip_t5_light',
      name: '竜革の装束',
      slot: 'armor',
      tier: 5,
      buyPrice: 5500,
      armorType: 'light',
      bonuses: { def: 32, mdf: 25 },
    },
    equip_t5_clothes: {
      id: 'equip_t5_clothes',
      name: '竜詠みのローブ',
      slot: 'armor',
      tier: 5,
      buyPrice: 5500,
      armorType: 'clothes',
      bonuses: { def: 18, mdf: 42 },
    },
    equip_t5_accessory: {
      id: 'equip_t5_accessory',
      name: '竜の紋章',
      slot: 'accessory',
      tier: 5,
      buyPrice: 4800,
      bonuses: { def: 12, mdf: 12 },
    },
  },
  Bn = {
    summon_wolf: {
      id: 'summon_wolf',
      name: '召喚獣・狼',
      baseStats: { hp: 45, tp: 0, str: 12, vit: 6, agi: 14, int: 4, mnd: 4, luc: 6 },
      refDepth: 1,
      attackElement: 'pierce',
      actsOnTurn: !0,
      buffImmune: !1,
      persistsAfterBattle: !1,
      persistsOutOfDungeon: !1,
    },
    summon_bulwark: {
      id: 'summon_bulwark',
      name: '守りの石像',
      baseStats: { hp: 110, tp: 0, str: 4, vit: 16, agi: 2, int: 2, mnd: 10, luc: 2 },
      refDepth: 1,
      attackElement: 'bash',
      actsOnTurn: !1,
      buffImmune: !0,
      persistsAfterBattle: !1,
      persistsOutOfDungeon: !1,
    },
    summon_familiar: {
      id: 'summon_familiar',
      name: '使い魔',
      baseStats: { hp: 35, tp: 0, str: 7, vit: 5, agi: 12, int: 9, mnd: 6, luc: 7 },
      refDepth: 1,
      attackElement: 'bash',
      actsOnTurn: !0,
      buffImmune: !1,
      persistsAfterBattle: !0,
      persistsOutOfDungeon: !1,
    },
    summon_falcon: {
      id: 'summon_falcon',
      name: '召喚獣・鷹',
      baseStats: { hp: 38, tp: 0, str: 11, vit: 5, agi: 18, int: 5, mnd: 4, luc: 8 },
      refDepth: 1,
      attackElement: 'pierce',
      actsOnTurn: !0,
      buffImmune: !1,
      persistsAfterBattle: !1,
      persistsOutOfDungeon: !1,
    },
    summon_wraith: {
      id: 'summon_wraith',
      name: '死霊',
      baseStats: { hp: 40, tp: 0, str: 13, vit: 5, agi: 13, int: 8, mnd: 5, luc: 6 },
      refDepth: 1,
      attackElement: 'pierce',
      actsOnTurn: !0,
      buffImmune: !1,
      persistsAfterBattle: !1,
      persistsOutOfDungeon: !1,
    },
    summon_revenant: {
      id: 'summon_revenant',
      name: '亡者の壁',
      baseStats: { hp: 120, tp: 0, str: 4, vit: 17, agi: 3, int: 2, mnd: 11, luc: 2 },
      refDepth: 1,
      attackElement: 'bash',
      actsOnTurn: !1,
      buffImmune: !0,
      persistsAfterBattle: !1,
      persistsOutOfDungeon: !1,
    },
  },
  wb = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'],
  Tb = ['slash', 'pierce', 'bash'],
  gr = (l, i, o) => Math.max(i, Math.min(o, l));
function ch(l, i) {
  const o = {};
  for (const r of wb) o[r] = Math.round(l[r] * i);
  return o;
}
function Eb(l, i) {
  return ch(l.baseStats, Gc(i, l.refDepth));
}
function xn(l, i) {
  const o = new Map();
  for (const c of l) {
    if (c.stat !== i) continue;
    const d = gr(c.modifier, 0.5, 1.5),
      _ = o.get(c.stackGroup);
    (_ === void 0 || Math.abs(d - 1) > Math.abs(_ - 1)) && o.set(c.stackGroup, d);
  }
  let r = 1;
  for (const c of o.values()) r *= c;
  return gr(r, 0.25, 2);
}
function yp(l, i, o, r) {
  const c = (p) => (r == null ? void 0 : r[p]) ?? 1,
    d = (l.str * 2 + (i.atk ?? 0)) * xn(o, 'patk') * c('patk'),
    _ = (l.vit * 2 + (i.def ?? 0)) * xn(o, 'pdef') * c('pdef'),
    h = (l.int * 2 + (i.mat ?? 0)) * xn(o, 'matk') * c('matk'),
    k = (l.mnd * 2 + (i.mdf ?? 0)) * xn(o, 'mdef') * c('mdef');
  return {
    patk: d,
    pdef: _,
    matk: h,
    mdef: k,
    hit: l.agi,
    acc: l.agi * xn(o, 'acc') * c('acc'),
    eva: l.agi * xn(o, 'eva') * c('eva'),
    crit: l.luc,
  };
}
const Cb = (l) => l.ailments.some((i) => i.type === 'blind'),
  Nb = (l) => l.ailments.some((i) => i.type === 'legBind');
function Ab(l, i, o, r) {
  var H;
  const c = o.statBase === 'str',
    d = yp(l.stats, l.equip, l.buffs, l.passive),
    _ = yp(i.stats, i.equip, i.buffs, i.passive),
    h = c ? d.patk : d.matk,
    k = c ? _.pdef : _.mdef;
  let p = !0;
  if (c) {
    const W = Cb(l) ? Ue.BLIND_ACC_PENALTY : 0,
      ne = Nb(i) ? 0 : _.eva,
      te = gr(Ue.BASE_HIT + (d.acc - ne) * Ue.HIT_AGI_K - W, Ue.HIT_MIN, 1);
    p = r.next() < te;
  }
  if (!p) return { damage: 0, hit: !1, critical: !1 };
  const y = (h * o.power * Ue.DAMAGE_DEF_K) / (Ue.DAMAGE_DEF_K + Math.max(0, k)),
    S = c && Tb.includes(o.element),
    q = S && l.row === 'back' ? Ue.BACK_ROW_MELEE_MULT : 1,
    b = S && i.row === 'back' ? Ue.BACK_ROW_MELEE_MULT : 1,
    L = q * b,
    [C, T] = Ue.DMG_VARIANCE,
    A = C + r.next() * (T - C);
  let M = y * o.elementMultiplier * L * A;
  const P = gr(
      Ue.CRIT_BASE +
        (l.stats.luc - i.stats.luc) * Ue.CRIT_LUC_K +
        (((H = l.passive) == null ? void 0 : H.crit) ?? 0),
      Ue.CRIT_MIN,
      Ue.CRIT_MAX
    ),
    J = r.next() < P;
  return (
    J && (M *= Ue.CRIT_MULT),
    { damage: o.elementMultiplier === 0 ? 0 : Math.max(1, Math.floor(M)), hit: !0, critical: J }
  );
}
const dh = () => Math.max(0, ...Object.values(ol).map((l) => l.tierBand)),
  mh = (l) => Math.floor((l - 1) / Ue.BAND_SIZE);
function _h(l) {
  return mh(l) % (dh() + 1);
}
function fh(l) {
  return Math.floor(mh(l) / (dh() + 1)) + 1;
}
function Lb(l) {
  const i = _h(l);
  return Object.values(ol)
    .filter((o) => o.tierBand === i && !o.isBoss && o.kind !== 'foe')
    .map((o) => o.id);
}
function jb(l, i) {
  const o = Lb(l);
  if (o.length === 0) return [];
  const r = i.range(1, 3);
  return Array.from({ length: r }, () => i.pick(o));
}
function Mb(l, i) {
  const o = ot[l];
  if (!o || i <= 0) return {};
  const r = i * pl.STAT_PER_LEVEL;
  return o.slot === 'weapon' ? { atk: r, mat: r } : o.slot === 'armor' ? { def: r, mdf: r } : {};
}
function Nn(l) {
  return 1 + 0.5 * (Math.max(1, l ?? 1) - 1);
}
function ph(l, i) {
  const o = ot[l];
  if (!o) return {};
  const r = Nn(i),
    c = {};
  return (
    o.bonuses.atk && (c.atk = Math.round(o.bonuses.atk * r)),
    o.bonuses.mat && (c.mat = Math.round(o.bonuses.mat * r)),
    o.bonuses.def && (c.def = Math.round(o.bonuses.def * r)),
    o.bonuses.mdf && (c.mdf = Math.round(o.bonuses.mdf * r)),
    o.bonuses.statMods && (c.statMods = o.bonuses.statMods),
    c
  );
}
const hh = ['weapon', 'armor', 'accessory'];
function Bb(l, i, o) {
  const r = l.guild.equipment.map((d) => (d.id === i ? o(d) : d)),
    c = l.guild.members.map((d) => {
      let _ = !1;
      const h = { ...d.equipment };
      for (const k of hh) {
        const p = h[k];
        p && p.id === i && ((h[k] = o(p)), (_ = !0));
      }
      return _ ? { ...d, equipment: h } : d;
    });
  return { ...l, guild: { ...l.guild, equipment: r, members: c } };
}
function qb(l, i, o) {
  let r = l.guild.equipment.find((_) => _.id === i);
  if (!r)
    for (const _ of l.guild.members)
      for (const h of hh) {
        const k = _.equipment[h];
        (k == null ? void 0 : k.id) === i && (r = k);
      }
  if (!r) return { ok: !1, save: l, reason: 'notFound' };
  if (r.forgeLevel >= pl.MAX_LEVEL) return { ok: !1, save: l, reason: 'maxLevel' };
  if ((l.forgeInventory.ingots[o] ?? 0) <= 0) return { ok: !1, save: l, reason: 'noIngot' };
  const c = Math.min(pl.MAX_LEVEL, r.forgeLevel + pl.INGOT_INC[o]);
  let d = {
    ...l,
    forgeInventory: {
      ...l.forgeInventory,
      ingots: { ...l.forgeInventory.ingots, [o]: l.forgeInventory.ingots[o] - 1 },
    },
  };
  return ((d = Bb(d, i, (_) => ({ ..._, forgeLevel: c }))), { ok: !0, save: d });
}
function Ob(l, i) {
  if (!l.guild.equipment.find((_) => _.id === i)) return { ok: !1, save: l, reason: 'notFound' };
  const r = l.guild.equipment.filter((_) => _.id !== i),
    c = { ...l.forgeInventory.fragments };
  c.common = (c.common ?? 0) + pl.RECYCLE_FRAGMENTS;
  let d = l.forgeInventory.ingots.copper;
  for (; c.common >= pl.FRAGMENTS_PER_INGOT; ) ((c.common -= pl.FRAGMENTS_PER_INGOT), (d += 1));
  return {
    ok: !0,
    save: {
      ...l,
      guild: { ...l.guild, equipment: r },
      forgeInventory: {
        ...l.forgeInventory,
        fragments: c,
        ingots: { ...l.forgeInventory.ingots, copper: d },
      },
    },
  };
}
function kr(l) {
  var r;
  const i = ((r = ot[l.masterId]) == null ? void 0 : r.name) ?? l.masterId,
    o = l.grade && l.grade > 1 ? `${i} Lv${l.grade}` : i;
  return l.forgeLevel > 0 ? `${o} +${l.forgeLevel}` : o;
}
const at = {
    class_warrior: {
      id: 'class_warrior',
      name: '戦士',
      skillTree: {
        skills: [
          { skillId: 'skill_power_slash', maxLevel: 5 },
          { skillId: 'passive_warrior_blade_mastery', maxLevel: 3 },
          { skillId: 'passive_warrior_axe_mastery', maxLevel: 3 },
          { skillId: 'passive_warrior_phys_boost', maxLevel: 3 },
          { skillId: 'skill_guard_stance', maxLevel: 3 },
          { skillId: 'skill_warrior_war_cry', maxLevel: 3 },
          {
            skillId: 'skill_cleave',
            maxLevel: 5,
            requires: [{ skillId: 'skill_power_slash', level: 2 }],
          },
          {
            skillId: 'skill_warrior_double_slash',
            maxLevel: 5,
            requires: [{ skillId: 'passive_warrior_blade_mastery', level: 2 }],
          },
          {
            skillId: 'skill_warrior_heavy_swing',
            maxLevel: 5,
            requires: [{ skillId: 'passive_warrior_axe_mastery', level: 2 }],
          },
          {
            skillId: 'skill_chain_slash',
            maxLevel: 3,
            requires: [{ skillId: 'passive_warrior_blade_mastery', level: 1 }],
          },
          {
            skillId: 'skill_riposte',
            maxLevel: 3,
            requires: [{ skillId: 'skill_guard_stance', level: 1 }],
          },
          {
            skillId: 'passive_warrior_crit_focus',
            maxLevel: 3,
            requires: [{ skillId: 'passive_warrior_phys_boost', level: 2 }],
          },
          {
            skillId: 'skill_warrior_blade_storm',
            maxLevel: 5,
            requires: [{ skillId: 'skill_cleave', level: 3 }],
          },
          {
            skillId: 'skill_warrior_executioner',
            maxLevel: 5,
            requires: [{ skillId: 'skill_warrior_double_slash', level: 3 }],
          },
          {
            skillId: 'passive_warrior_vitality',
            maxLevel: 3,
            requires: [{ skillId: 'passive_warrior_crit_focus', level: 3 }],
          },
          {
            skillId: 'skill_warrior_flame_blade',
            maxLevel: 5,
            requires: [{ skillId: 'skill_warrior_double_slash', level: 2 }],
          },
          {
            skillId: 'skill_warrior_armor_crush',
            maxLevel: 5,
            requires: [{ skillId: 'skill_warrior_heavy_swing', level: 3 }],
          },
          {
            skillId: 'passive_warrior_dual_edge',
            maxLevel: 3,
            requires: [{ skillId: 'passive_warrior_crit_focus', level: 2 }],
          },
          {
            skillId: 'skill_warrior_blade_dance',
            maxLevel: 5,
            requires: [{ skillId: 'skill_warrior_flame_blade', level: 3 }],
          },
          {
            skillId: 'skill_warrior_savage_blow',
            maxLevel: 5,
            requires: [{ skillId: 'skill_warrior_armor_crush', level: 3 }],
          },
          {
            skillId: 'skill_warrior_meteor_strike',
            maxLevel: 5,
            requires: [{ skillId: 'skill_warrior_blade_storm', level: 3 }],
          },
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
          { skillId: 'passive_guardian_shield_mastery', maxLevel: 3 },
          { skillId: 'passive_guardian_spear_mastery', maxLevel: 3 },
          { skillId: 'passive_guardian_hp_boost', maxLevel: 3 },
          { skillId: 'skill_provoke', maxLevel: 3 },
          { skillId: 'skill_summon_bulwark', maxLevel: 3 },
          {
            skillId: 'skill_line_guard',
            maxLevel: 3,
            requires: [{ skillId: 'passive_guardian_shield_mastery', level: 1 }],
          },
          {
            skillId: 'skill_counter_guard',
            maxLevel: 3,
            requires: [{ skillId: 'skill_provoke', level: 1 }],
          },
          {
            skillId: 'skill_guardian_shield_press',
            maxLevel: 5,
            requires: [{ skillId: 'skill_shield_bash', level: 2 }],
          },
          {
            skillId: 'skill_guardian_taunt_roar',
            maxLevel: 3,
            requires: [{ skillId: 'skill_provoke', level: 2 }],
          },
          {
            skillId: 'passive_guardian_mdef_boost',
            maxLevel: 3,
            requires: [{ skillId: 'passive_guardian_hp_boost', level: 2 }],
          },
          {
            skillId: 'skill_guardian_retribution',
            maxLevel: 3,
            requires: [{ skillId: 'skill_counter_guard', level: 2 }],
          },
          {
            skillId: 'skill_guardian_spear_thrust',
            maxLevel: 5,
            requires: [{ skillId: 'passive_guardian_spear_mastery', level: 2 }],
          },
          {
            skillId: 'skill_guardian_aegis',
            maxLevel: 3,
            requires: [{ skillId: 'skill_line_guard', level: 3 }],
          },
          {
            skillId: 'passive_guardian_iron_will',
            maxLevel: 3,
            requires: [{ skillId: 'passive_guardian_mdef_boost', level: 3 }],
          },
          {
            skillId: 'skill_guardian_shield_throw',
            maxLevel: 5,
            requires: [{ skillId: 'skill_guardian_shield_press', level: 3 }],
          },
          {
            skillId: 'skill_guardian_bulwark_stance',
            maxLevel: 3,
            requires: [{ skillId: 'skill_guardian_taunt_roar', level: 3 }],
          },
          {
            skillId: 'skill_guardian_iron_counter',
            maxLevel: 3,
            requires: [{ skillId: 'skill_guardian_retribution', level: 3 }],
          },
          {
            skillId: 'skill_guardian_phalanx',
            maxLevel: 3,
            requires: [{ skillId: 'skill_guardian_aegis', level: 3 }],
          },
          {
            skillId: 'skill_guardian_great_wall',
            maxLevel: 3,
            requires: [{ skillId: 'skill_guardian_phalanx', level: 2 }],
          },
          {
            skillId: 'skill_guardian_dragon_lance',
            maxLevel: 5,
            requires: [{ skillId: 'skill_guardian_spear_thrust', level: 3 }],
          },
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
          {
            skillId: 'skill_volt_bolt',
            maxLevel: 5,
            requires: [{ skillId: 'skill_ice_bolt', level: 1 }],
          },
          { skillId: 'passive_mage_staff_mastery', maxLevel: 3 },
          { skillId: 'passive_mage_tp_boost', maxLevel: 3 },
          { skillId: 'skill_mage_focus', maxLevel: 3 },
          {
            skillId: 'skill_fire_storm',
            maxLevel: 5,
            requires: [{ skillId: 'skill_fire_bolt', level: 3 }],
          },
          {
            skillId: 'skill_mage_ice_storm',
            maxLevel: 5,
            requires: [{ skillId: 'skill_ice_bolt', level: 3 }],
          },
          {
            skillId: 'skill_mage_volt_storm',
            maxLevel: 5,
            requires: [{ skillId: 'skill_volt_bolt', level: 3 }],
          },
          {
            skillId: 'passive_mage_matk_boost',
            maxLevel: 3,
            requires: [{ skillId: 'passive_mage_staff_mastery', level: 2 }],
          },
          {
            skillId: 'skill_summon_familiar',
            maxLevel: 2,
            requires: [{ skillId: 'passive_mage_tp_boost', level: 2 }],
          },
          {
            skillId: 'skill_mage_mana_charge',
            maxLevel: 5,
            requires: [{ skillId: 'passive_mage_tp_boost', level: 2 }],
          },
          {
            skillId: 'skill_mage_meteor',
            maxLevel: 5,
            requires: [{ skillId: 'skill_fire_storm', level: 3 }],
          },
          {
            skillId: 'skill_mage_thunderbolt',
            maxLevel: 5,
            requires: [{ skillId: 'skill_mage_volt_storm', level: 3 }],
          },
          {
            skillId: 'passive_mage_spell_focus',
            maxLevel: 3,
            requires: [{ skillId: 'passive_mage_matk_boost', level: 3 }],
          },
          {
            skillId: 'skill_mage_fire_lance',
            maxLevel: 5,
            requires: [{ skillId: 'skill_fire_storm', level: 2 }],
          },
          {
            skillId: 'skill_mage_frost_lance',
            maxLevel: 5,
            requires: [{ skillId: 'skill_mage_ice_storm', level: 2 }],
          },
          {
            skillId: 'skill_mage_volt_lance',
            maxLevel: 5,
            requires: [{ skillId: 'skill_mage_volt_storm', level: 2 }],
          },
          {
            skillId: 'passive_mage_overload',
            maxLevel: 3,
            requires: [{ skillId: 'passive_mage_matk_boost', level: 2 }],
          },
          {
            skillId: 'skill_mage_absolute_zero',
            maxLevel: 5,
            requires: [{ skillId: 'skill_mage_frost_lance', level: 3 }],
          },
          {
            skillId: 'skill_mage_ragnarok',
            maxLevel: 5,
            requires: [{ skillId: 'skill_mage_thunderbolt', level: 3 }],
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
          { skillId: 'skill_leg_snipe', maxLevel: 3 },
          { skillId: 'skill_arm_snipe', maxLevel: 3 },
          { skillId: 'passive_ranger_bow_mastery', maxLevel: 3 },
          { skillId: 'passive_ranger_agi_boost', maxLevel: 3 },
          {
            skillId: 'skill_head_snipe',
            maxLevel: 3,
            requires: [{ skillId: 'skill_aimed_shot', level: 2 }],
          },
          {
            skillId: 'skill_ranger_piercing_arrow',
            maxLevel: 5,
            requires: [{ skillId: 'skill_aimed_shot', level: 3 }],
          },
          {
            skillId: 'skill_ranger_double_shot',
            maxLevel: 5,
            requires: [{ skillId: 'skill_aimed_shot', level: 2 }],
          },
          {
            skillId: 'skill_ranger_rain_of_arrows',
            maxLevel: 5,
            requires: [{ skillId: 'skill_spread_shot', level: 2 }],
          },
          {
            skillId: 'skill_ranger_pin_shot',
            maxLevel: 3,
            requires: [{ skillId: 'skill_leg_snipe', level: 2 }],
          },
          {
            skillId: 'passive_ranger_eagle_eye',
            maxLevel: 3,
            requires: [{ skillId: 'passive_ranger_bow_mastery', level: 2 }],
          },
          {
            skillId: 'passive_ranger_swift_hands',
            maxLevel: 3,
            requires: [{ skillId: 'passive_ranger_bow_mastery', level: 2 }],
          },
          {
            skillId: 'skill_first_aid',
            maxLevel: 3,
            requires: [{ skillId: 'passive_ranger_agi_boost', level: 2 }],
          },
          {
            skillId: 'skill_summon_wolf',
            maxLevel: 3,
            requires: [{ skillId: 'passive_ranger_agi_boost', level: 2 }],
          },
          {
            skillId: 'skill_ranger_charged_shot',
            maxLevel: 5,
            requires: [{ skillId: 'skill_ranger_piercing_arrow', level: 3 }],
          },
          {
            skillId: 'skill_ranger_binding_volley',
            maxLevel: 3,
            requires: [{ skillId: 'skill_ranger_rain_of_arrows', level: 3 }],
          },
          {
            skillId: 'skill_ranger_hunters_mark',
            maxLevel: 3,
            requires: [{ skillId: 'passive_ranger_eagle_eye', level: 3 }],
          },
          {
            skillId: 'skill_ranger_falconry',
            maxLevel: 3,
            requires: [{ skillId: 'skill_summon_wolf', level: 3 }],
          },
          {
            skillId: 'skill_ranger_field_dressing',
            maxLevel: 3,
            requires: [{ skillId: 'skill_first_aid', level: 3 }],
          },
          {
            skillId: 'skill_ranger_volley_chase',
            maxLevel: 3,
            requires: [{ skillId: 'skill_ranger_double_shot', level: 3 }],
          },
          {
            skillId: 'passive_ranger_predator',
            maxLevel: 3,
            requires: [{ skillId: 'passive_ranger_swift_hands', level: 3 }],
          },
          {
            skillId: 'skill_ranger_apollo_shot',
            maxLevel: 5,
            requires: [{ skillId: 'skill_ranger_charged_shot', level: 3 }],
          },
          {
            skillId: 'skill_ranger_sky_volley',
            maxLevel: 5,
            requires: [{ skillId: 'skill_ranger_binding_volley', level: 3 }],
          },
        ],
      },
      equipableWeaponTypes: ['bow', 'fist'],
      equipableArmorTypes: ['light', 'clothes'],
      titleOptions: ['title_sniper', 'title_tracker'],
    },
    class_medic: {
      id: 'class_medic',
      name: '薬師',
      skillTree: {
        skills: [
          { skillId: 'skill_heal', maxLevel: 5 },
          { skillId: 'skill_protect_hymn', maxLevel: 3 },
          { skillId: 'skill_refresh_herb', maxLevel: 3 },
          { skillId: 'skill_poison_smoke', maxLevel: 3 },
          { skillId: 'passive_medic_tp_boost', maxLevel: 3 },
          { skillId: 'passive_medic_mdef_boost', maxLevel: 3 },
          {
            skillId: 'skill_mass_heal',
            maxLevel: 5,
            requires: [{ skillId: 'skill_heal', level: 2 }],
          },
          {
            skillId: 'skill_medic_full_heal',
            maxLevel: 5,
            requires: [{ skillId: 'skill_heal', level: 3 }],
          },
          {
            skillId: 'skill_medic_immune_hymn',
            maxLevel: 3,
            requires: [{ skillId: 'skill_protect_hymn', level: 2 }],
          },
          {
            skillId: 'skill_medic_blind_powder',
            maxLevel: 3,
            requires: [{ skillId: 'skill_poison_smoke', level: 2 }],
          },
          {
            skillId: 'skill_medic_sleep_mist',
            maxLevel: 3,
            requires: [{ skillId: 'skill_poison_smoke', level: 2 }],
          },
          {
            skillId: 'skill_medic_tp_tonic',
            maxLevel: 3,
            requires: [{ skillId: 'passive_medic_tp_boost', level: 2 }],
          },
          {
            skillId: 'passive_medic_mind_boost',
            maxLevel: 3,
            requires: [{ skillId: 'skill_heal', level: 2 }],
          },
          {
            skillId: 'passive_medic_healing_hands',
            maxLevel: 3,
            requires: [{ skillId: 'passive_medic_mdef_boost', level: 2 }],
          },
          {
            skillId: 'passive_medic_staff_mastery',
            maxLevel: 3,
            requires: [{ skillId: 'passive_medic_mdef_boost', level: 2 }],
          },
          {
            skillId: 'skill_medic_party_cure',
            maxLevel: 5,
            requires: [{ skillId: 'skill_mass_heal', level: 3 }],
          },
          {
            skillId: 'skill_medic_regen_balm',
            maxLevel: 5,
            requires: [{ skillId: 'skill_medic_full_heal', level: 3 }],
          },
          {
            skillId: 'skill_medic_paralysis_powder',
            maxLevel: 3,
            requires: [{ skillId: 'skill_medic_sleep_mist', level: 3 }],
          },
          {
            skillId: 'skill_medic_weakening_smoke',
            maxLevel: 3,
            requires: [{ skillId: 'skill_medic_blind_powder', level: 3 }],
          },
          {
            skillId: 'skill_medic_revive_draft',
            maxLevel: 3,
            requires: [{ skillId: 'skill_medic_tp_tonic', level: 3 }],
          },
          {
            skillId: 'passive_medic_vitality',
            maxLevel: 3,
            requires: [{ skillId: 'passive_medic_healing_hands', level: 3 }],
          },
          {
            skillId: 'skill_medic_salvation',
            maxLevel: 5,
            requires: [{ skillId: 'skill_medic_party_cure', level: 3 }],
          },
          {
            skillId: 'skill_medic_panacea',
            maxLevel: 5,
            requires: [{ skillId: 'skill_medic_regen_balm', level: 3 }],
          },
        ],
      },
      equipableWeaponTypes: ['staff', 'fist'],
      equipableArmorTypes: ['clothes', 'light'],
      titleOptions: ['title_saint', 'title_apothecary'],
    },
    class_dancer: {
      id: 'class_dancer',
      name: '剣舞士',
      skillTree: {
        skills: [
          { skillId: 'skill_war_dance', maxLevel: 3 },
          { skillId: 'skill_evasion_dance', maxLevel: 3 },
          { skillId: 'skill_guard_dance', maxLevel: 3 },
          { skillId: 'skill_weaken_song', maxLevel: 3 },
          { skillId: 'passive_dancer_agi_boost', maxLevel: 3 },
          { skillId: 'passive_dancer_tp_boost', maxLevel: 3 },
          {
            skillId: 'skill_healing_song',
            maxLevel: 3,
            requires: [{ skillId: 'skill_war_dance', level: 1 }],
          },
          {
            skillId: 'skill_dancer_inspire_dance',
            maxLevel: 3,
            requires: [{ skillId: 'skill_war_dance', level: 2 }],
          },
          {
            skillId: 'skill_dancer_chant_of_valor',
            maxLevel: 3,
            requires: [{ skillId: 'skill_war_dance', level: 2 }],
          },
          {
            skillId: 'skill_dancer_grace_song',
            maxLevel: 3,
            requires: [{ skillId: 'skill_guard_dance', level: 2 }],
          },
          {
            skillId: 'skill_dancer_blade_waltz',
            maxLevel: 5,
            requires: [{ skillId: 'skill_evasion_dance', level: 2 }],
          },
          {
            skillId: 'skill_dancer_dual_blade',
            maxLevel: 5,
            requires: [{ skillId: 'skill_evasion_dance', level: 2 }],
          },
          {
            skillId: 'skill_dancer_curse_dance',
            maxLevel: 3,
            requires: [{ skillId: 'skill_weaken_song', level: 2 }],
          },
          {
            skillId: 'passive_dancer_grace',
            maxLevel: 3,
            requires: [{ skillId: 'passive_dancer_agi_boost', level: 2 }],
          },
          {
            skillId: 'passive_dancer_blade_mastery',
            maxLevel: 3,
            requires: [{ skillId: 'passive_dancer_agi_boost', level: 2 }],
          },
          {
            skillId: 'skill_dancer_revival_dance',
            maxLevel: 3,
            requires: [{ skillId: 'skill_healing_song', level: 3 }],
          },
          {
            skillId: 'skill_dancer_mana_song',
            maxLevel: 3,
            requires: [{ skillId: 'skill_dancer_inspire_dance', level: 3 }],
          },
          {
            skillId: 'skill_dancer_lullaby_song',
            maxLevel: 3,
            requires: [{ skillId: 'skill_dancer_curse_dance', level: 3 }],
          },
          {
            skillId: 'skill_dancer_blade_chase',
            maxLevel: 3,
            requires: [{ skillId: 'skill_dancer_dual_blade', level: 3 }],
          },
          {
            skillId: 'passive_dancer_resonance',
            maxLevel: 3,
            requires: [{ skillId: 'passive_dancer_grace', level: 3 }],
          },
          {
            skillId: 'passive_dancer_vigor',
            maxLevel: 3,
            requires: [{ skillId: 'passive_dancer_blade_mastery', level: 3 }],
          },
          {
            skillId: 'skill_dancer_grand_finale',
            maxLevel: 3,
            requires: [{ skillId: 'skill_dancer_revival_dance', level: 3 }],
          },
          {
            skillId: 'skill_dancer_storm_waltz',
            maxLevel: 5,
            requires: [{ skillId: 'skill_dancer_blade_waltz', level: 3 }],
          },
        ],
      },
      equipableWeaponTypes: ['sword', 'fist'],
      equipableArmorTypes: ['light', 'clothes'],
      titleOptions: ['title_blade_dancer', 'title_muse'],
    },
    class_monk: {
      id: 'class_monk',
      name: '拳聖',
      skillTree: {
        skills: [
          { skillId: 'skill_triple_strike', maxLevel: 5 },
          { skillId: 'skill_monk_palm_strike', maxLevel: 5 },
          { skillId: 'passive_monk_fist_mastery', maxLevel: 3 },
          { skillId: 'passive_monk_crit_boost', maxLevel: 3 },
          { skillId: 'passive_monk_hp_boost', maxLevel: 3 },
          { skillId: 'skill_focus_ki', maxLevel: 3 },
          {
            skillId: 'skill_arm_break',
            maxLevel: 5,
            requires: [{ skillId: 'skill_triple_strike', level: 2 }],
          },
          {
            skillId: 'skill_monk_leg_sweep',
            maxLevel: 3,
            requires: [{ skillId: 'skill_monk_palm_strike', level: 2 }],
          },
          {
            skillId: 'skill_monk_flurry',
            maxLevel: 5,
            requires: [{ skillId: 'skill_triple_strike', level: 3 }],
          },
          {
            skillId: 'skill_monk_double_palm',
            maxLevel: 5,
            requires: [{ skillId: 'skill_monk_palm_strike', level: 3 }],
          },
          {
            skillId: 'skill_monk_ki_guard',
            maxLevel: 3,
            requires: [{ skillId: 'skill_focus_ki', level: 2 }],
          },
          {
            skillId: 'skill_cross_counter',
            maxLevel: 3,
            requires: [{ skillId: 'skill_focus_ki', level: 1 }],
          },
          {
            skillId: 'passive_monk_eva_boost',
            maxLevel: 3,
            requires: [{ skillId: 'passive_monk_crit_boost', level: 2 }],
          },
          {
            skillId: 'passive_monk_counter_mastery',
            maxLevel: 3,
            requires: [{ skillId: 'passive_monk_fist_mastery', level: 2 }],
          },
          {
            skillId: 'skill_monk_head_smash',
            maxLevel: 3,
            requires: [{ skillId: 'skill_monk_leg_sweep', level: 3 }],
          },
          {
            skillId: 'skill_monk_pressure_point',
            maxLevel: 3,
            requires: [{ skillId: 'skill_arm_break', level: 3 }],
          },
          {
            skillId: 'skill_monk_whirlwind_kick',
            maxLevel: 5,
            requires: [{ skillId: 'skill_monk_double_palm', level: 3 }],
          },
          {
            skillId: 'skill_iron_body',
            maxLevel: 3,
            requires: [{ skillId: 'skill_monk_ki_guard', level: 3 }],
          },
          {
            skillId: 'skill_monk_breathing',
            maxLevel: 3,
            requires: [{ skillId: 'passive_monk_counter_mastery', level: 3 }],
          },
          {
            skillId: 'skill_monk_rising_dragon',
            maxLevel: 5,
            requires: [{ skillId: 'skill_monk_flurry', level: 3 }],
          },
          {
            skillId: 'skill_monk_seven_star',
            maxLevel: 5,
            requires: [{ skillId: 'skill_monk_whirlwind_kick', level: 3 }],
          },
          {
            skillId: 'skill_monk_demon_palm',
            maxLevel: 5,
            requires: [{ skillId: 'skill_monk_pressure_point', level: 3 }],
          },
        ],
      },
      equipableWeaponTypes: ['fist'],
      equipableArmorTypes: ['light', 'heavy'],
      titleOptions: ['title_grappler', 'title_zen'],
    },
    class_hexer: {
      id: 'class_hexer',
      name: '呪術士',
      skillTree: {
        skills: [
          { skillId: 'skill_venom_hex', maxLevel: 5 },
          { skillId: 'skill_sleep_hex', maxLevel: 3 },
          { skillId: 'skill_weaken_hex', maxLevel: 3 },
          { skillId: 'passive_hexer_matk_boost', maxLevel: 3 },
          { skillId: 'passive_hexer_mdef_boost', maxLevel: 3 },
          { skillId: 'passive_hexer_acc_boost', maxLevel: 3 },
          {
            skillId: 'skill_hexer_paralyze_hex',
            maxLevel: 5,
            requires: [{ skillId: 'skill_venom_hex', level: 2 }],
          },
          {
            skillId: 'skill_blind_hex',
            maxLevel: 3,
            requires: [{ skillId: 'skill_sleep_hex', level: 2 }],
          },
          {
            skillId: 'skill_armor_hex',
            maxLevel: 3,
            requires: [{ skillId: 'skill_weaken_hex', level: 2 }],
          },
          {
            skillId: 'skill_hexer_eva_hex',
            maxLevel: 3,
            requires: [{ skillId: 'skill_weaken_hex', level: 2 }],
          },
          {
            skillId: 'skill_hexer_acc_hex',
            maxLevel: 3,
            requires: [{ skillId: 'skill_venom_hex', level: 3 }],
          },
          {
            skillId: 'skill_hexer_mass_venom',
            maxLevel: 3,
            requires: [{ skillId: 'skill_venom_hex', level: 3 }],
          },
          {
            skillId: 'skill_hexer_drowsy_hex',
            maxLevel: 3,
            requires: [{ skillId: 'skill_sleep_hex', level: 2 }],
          },
          {
            skillId: 'passive_hexer_curse_lore',
            maxLevel: 3,
            requires: [{ skillId: 'passive_hexer_matk_boost', level: 2 }],
          },
          {
            skillId: 'skill_hexer_doom_hex',
            maxLevel: 5,
            requires: [{ skillId: 'skill_hexer_paralyze_hex', level: 3 }],
          },
          {
            skillId: 'skill_hexer_curse_field',
            maxLevel: 3,
            requires: [{ skillId: 'skill_hexer_mass_venom', level: 3 }],
          },
          {
            skillId: 'skill_hexer_mass_paralyze',
            maxLevel: 3,
            requires: [{ skillId: 'skill_hexer_paralyze_hex', level: 3 }],
          },
          {
            skillId: 'skill_hexer_def_hex',
            maxLevel: 3,
            requires: [{ skillId: 'skill_armor_hex', level: 3 }],
          },
          {
            skillId: 'skill_hexer_dark_bolt',
            maxLevel: 5,
            requires: [{ skillId: 'passive_hexer_curse_lore', level: 3 }],
          },
          {
            skillId: 'skill_hexer_nightmare',
            maxLevel: 5,
            requires: [{ skillId: 'skill_hexer_drowsy_hex', level: 3 }],
          },
          {
            skillId: 'skill_hexer_calamity',
            maxLevel: 5,
            requires: [{ skillId: 'skill_hexer_mass_paralyze', level: 3 }],
          },
          {
            skillId: 'skill_hexer_mdef_hex',
            maxLevel: 3,
            requires: [{ skillId: 'skill_hexer_def_hex', level: 3 }],
          },
        ],
      },
      equipableWeaponTypes: ['staff'],
      equipableArmorTypes: ['clothes'],
      titleOptions: ['title_plague', 'title_warlock'],
    },
    class_summoner: {
      id: 'class_summoner',
      name: '降霊術士',
      skillTree: {
        skills: [
          { skillId: 'skill_call_wraith', maxLevel: 3 },
          { skillId: 'skill_soul_barrier', maxLevel: 3 },
          { skillId: 'skill_summoner_soul_drain', maxLevel: 5 },
          { skillId: 'passive_summoner_staff_mastery', maxLevel: 3 },
          { skillId: 'passive_summoner_tp_boost', maxLevel: 3 },
          { skillId: 'passive_summoner_mdef_boost', maxLevel: 3 },
          {
            skillId: 'skill_call_sentinel',
            maxLevel: 3,
            requires: [{ skillId: 'skill_call_wraith', level: 1 }],
          },
          {
            skillId: 'skill_soul_burst',
            maxLevel: 5,
            requires: [{ skillId: 'passive_summoner_staff_mastery', level: 1 }],
          },
          {
            skillId: 'skill_summoner_call_familiar',
            maxLevel: 2,
            requires: [{ skillId: 'skill_call_wraith', level: 2 }],
          },
          {
            skillId: 'skill_summoner_grave_chill',
            maxLevel: 5,
            requires: [{ skillId: 'skill_summoner_soul_drain', level: 2 }],
          },
          {
            skillId: 'skill_summoner_tp_offering',
            maxLevel: 3,
            requires: [{ skillId: 'passive_summoner_tp_boost', level: 2 }],
          },
          {
            skillId: 'skill_summoner_necro_bolt',
            maxLevel: 5,
            requires: [{ skillId: 'skill_summoner_soul_drain', level: 2 }],
          },
          {
            skillId: 'skill_summoner_spirit_veil',
            maxLevel: 3,
            requires: [{ skillId: 'passive_summoner_mdef_boost', level: 2 }],
          },
          {
            skillId: 'skill_summoner_oblivion',
            maxLevel: 5,
            requires: [{ skillId: 'skill_soul_burst', level: 3 }],
          },
          {
            skillId: 'skill_summoner_spirit_chase',
            maxLevel: 3,
            requires: [{ skillId: 'skill_summoner_soul_drain', level: 3 }],
          },
          {
            skillId: 'skill_summoner_grave_field',
            maxLevel: 5,
            requires: [{ skillId: 'skill_summoner_grave_chill', level: 3 }],
          },
          {
            skillId: 'skill_summoner_soul_ward',
            maxLevel: 3,
            requires: [{ skillId: 'skill_summoner_spirit_veil', level: 3 }],
          },
          {
            skillId: 'passive_summoner_spirit_lore',
            maxLevel: 3,
            requires: [{ skillId: 'skill_summoner_necro_bolt', level: 3 }],
          },
          {
            skillId: 'skill_summoner_annihilation',
            maxLevel: 5,
            requires: [{ skillId: 'skill_summoner_oblivion', level: 3 }],
          },
          {
            skillId: 'skill_summoner_soul_render',
            maxLevel: 5,
            requires: [{ skillId: 'passive_summoner_spirit_lore', level: 3 }],
          },
          {
            skillId: 'skill_summoner_call_revenant',
            maxLevel: 3,
            requires: [{ skillId: 'skill_summoner_soul_ward', level: 3 }],
          },
        ],
      },
      equipableWeaponTypes: ['staff'],
      equipableArmorTypes: ['clothes', 'light'],
      titleOptions: ['title_necromancer', 'title_puppeteer'],
    },
  },
  gh = (l) => l.grade ?? 1;
function kh(l, i, o) {
  return l.guild.storage
    .filter((r) => r.itemId === i && o === void 0)
    .reduce((r, c) => r + c.qty, 0);
}
function $c(l, i, o = 1, r = 1) {
  if (o <= 0) return l;
  const c = [...l.guild.storage],
    d = c.findIndex((_) => _.itemId === i && gh(_) === r);
  return (
    d >= 0
      ? (c[d] = { ...c[d], qty: c[d].qty + o })
      : c.push(r > 1 ? { itemId: i, qty: o, grade: r } : { itemId: i, qty: o }),
    { ...l, guild: { ...l.guild, storage: c } }
  );
}
function Yc(l, i, o = 1, r = 1) {
  if (o <= 0) return l;
  const c = l.guild.storage.findIndex((h) => h.itemId === i && gh(h) === r);
  if (c < 0 || l.guild.storage[c].qty < o) return l;
  const d = [...l.guild.storage],
    _ = d[c].qty - o;
  return (
    _ <= 0 ? d.splice(c, 1) : (d[c] = { ...d[c], qty: _ }),
    { ...l, guild: { ...l.guild, storage: d } }
  );
}
const vh = 60,
  Ar = (l) => l.guild.foodStorage ?? [];
function yh(l) {
  return Ar(l).reduce((i, o) => i + o.qty, 0);
}
function Xc(l, i) {
  var o;
  return ((o = Ar(l).find((r) => r.itemId === i)) == null ? void 0 : o.qty) ?? 0;
}
function bh(l, i, o = 1) {
  if (o <= 0) return l;
  const r = vh - yh(l),
    c = Math.min(o, Math.max(0, r));
  if (c <= 0) return l;
  const d = [...Ar(l)],
    _ = d.findIndex((h) => h.itemId === i);
  return (
    _ >= 0 ? (d[_] = { ...d[_], qty: d[_].qty + c }) : d.push({ itemId: i, qty: c }),
    { ...l, guild: { ...l.guild, foodStorage: d } }
  );
}
function xh(l, i, o = 1) {
  if (o <= 0) return l;
  const r = [...Ar(l)],
    c = r.findIndex((_) => _.itemId === i);
  if (c < 0 || r[c].qty < o) return l;
  const d = r[c].qty - o;
  return (
    d <= 0 ? r.splice(c, 1) : (r[c] = { ...r[c], qty: d }),
    { ...l, guild: { ...l.guild, foodStorage: r } }
  );
}
function Sh(l, i, o) {
  return {
    ...l,
    guild: { ...l.guild, members: l.guild.members.map((r) => (r.id === i ? o(r) : r)) },
  };
}
function Ib() {
  return `eq_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function Db(l, i, o = 0, r = 1) {
  if (!ot[i]) return l;
  const c = { id: Ib(), masterId: i, forgeLevel: o };
  return (
    r > 1 && (c.grade = r),
    { ...l, guild: { ...l.guild, equipment: [...l.guild.equipment, c] } }
  );
}
function Vc(l, i) {
  const o = ot[i];
  if (!o) return !1;
  const r = at[l.classId];
  return r
    ? o.slot === 'weapon'
      ? !!o.weaponType && r.equipableWeaponTypes.includes(o.weaponType)
      : o.slot === 'armor'
        ? !!o.armorType && r.equipableArmorTypes.includes(o.armorType)
        : !0
    : !1;
}
function Rb(l, i, o) {
  const r = l.guild.equipment.find((p) => p.id === o),
    c = l.guild.members.find((p) => p.id === i);
  if (!r || !c || !Vc(c, r.masterId)) return l;
  const d = ot[r.masterId];
  let _ = l.guild.equipment.filter((p) => p.id !== o);
  const h = c.equipment[d.slot];
  h && (_ = [..._, h]);
  const k = { ...l, guild: { ...l.guild, equipment: _ } };
  return Sh(k, i, (p) => ({ ...p, equipment: { ...p.equipment, [d.slot]: r } }));
}
function Qc(l, i, o) {
  const r = l.guild.members.find((_) => _.id === i);
  if (!r) return l;
  const c = r.equipment[o];
  if (!c) return l;
  const d = { ...l, guild: { ...l.guild, equipment: [...l.guild.equipment, c] } };
  return Sh(d, i, (_) => ({ ..._, equipment: { ..._.equipment, [o]: null } }));
}
const xc = {
    passive_race_human_adapt: {
      id: 'passive_race_human_adapt',
      name: '適応力',
      tree: 'race',
      mods: (l) => ({ maxHp: 1 + 0.02 * l, acc: 1 + 0.02 * l }),
    },
    passive_race_garon_might: {
      id: 'passive_race_garon_might',
      name: '剛力',
      tree: 'race',
      mods: (l) => ({ patk: 1 + 0.03 * l, maxHp: 1 + 0.02 * l }),
    },
    passive_race_pix_focus: {
      id: 'passive_race_pix_focus',
      name: '魔力集中',
      tree: 'race',
      mods: (l) => ({ matk: 1 + 0.03 * l, maxTp: 1 + 0.03 * l }),
    },
    passive_race_therian_swift: {
      id: 'passive_race_therian_swift',
      name: '俊足',
      tree: 'race',
      mods: (l) => ({ acc: 1 + 0.03 * l, eva: 1 + 0.03 * l }),
    },
    passive_race_lunar_grace: {
      id: 'passive_race_lunar_grace',
      name: '月の加護',
      tree: 'race',
      mods: (l) => ({ mdef: 1 + 0.03 * l, maxTp: 1 + 0.02 * l }),
    },
    passive_race_golan_fortitude: {
      id: 'passive_race_golan_fortitude',
      name: '頑健',
      tree: 'race',
      mods: (l) => ({ pdef: 1 + 0.03 * l, maxHp: 1 + 0.03 * l }),
    },
    passive_warrior_blade_mastery: {
      id: 'passive_warrior_blade_mastery',
      name: '剣の心得',
      tree: 'base',
      weaponType: 'sword',
      mods: (l) => ({ patk: 1 + 0.04 * l }),
    },
    passive_warrior_phys_boost: {
      id: 'passive_warrior_phys_boost',
      name: '剛腕',
      tree: 'base',
      mods: (l) => ({ patk: 1 + 0.03 * l }),
    },
    passive_guardian_shield_mastery: {
      id: 'passive_guardian_shield_mastery',
      name: '盾の心得',
      tree: 'base',
      mods: (l) => ({ pdef: 1 + 0.04 * l }),
    },
    passive_guardian_hp_boost: {
      id: 'passive_guardian_hp_boost',
      name: '頑強',
      tree: 'base',
      mods: (l) => ({ maxHp: 1 + 0.04 * l }),
    },
    passive_mage_staff_mastery: {
      id: 'passive_mage_staff_mastery',
      name: '杖の心得',
      tree: 'base',
      weaponType: 'staff',
      mods: (l) => ({ matk: 1 + 0.04 * l }),
    },
    passive_mage_tp_boost: {
      id: 'passive_mage_tp_boost',
      name: '精神統一',
      tree: 'base',
      mods: (l) => ({ maxTp: 1 + 0.04 * l }),
    },
    passive_ranger_bow_mastery: {
      id: 'passive_ranger_bow_mastery',
      name: '弓の心得',
      tree: 'base',
      weaponType: 'bow',
      mods: (l) => ({ patk: 1 + 0.04 * l }),
    },
    passive_ranger_agi_boost: {
      id: 'passive_ranger_agi_boost',
      name: '機敏',
      tree: 'base',
      mods: (l) => ({ acc: 1 + 0.03 * l, eva: 1 + 0.02 * l }),
    },
    passive_medic_tp_boost: {
      id: 'passive_medic_tp_boost',
      name: '薬学の知識',
      tree: 'base',
      mods: (l) => ({ maxTp: 1 + 0.04 * l }),
    },
    passive_medic_mdef_boost: {
      id: 'passive_medic_mdef_boost',
      name: '抗体',
      tree: 'base',
      mods: (l) => ({ mdef: 1 + 0.03 * l }),
    },
    passive_dancer_agi_boost: {
      id: 'passive_dancer_agi_boost',
      name: '舞踏の足捌き',
      tree: 'base',
      mods: (l) => ({ eva: 1 + 0.03 * l, acc: 1 + 0.02 * l }),
    },
    passive_dancer_tp_boost: {
      id: 'passive_dancer_tp_boost',
      name: '高揚',
      tree: 'base',
      mods: (l) => ({ maxTp: 1 + 0.03 * l }),
    },
    passive_monk_fist_mastery: {
      id: 'passive_monk_fist_mastery',
      name: '拳の心得',
      tree: 'base',
      weaponType: 'fist',
      mods: (l) => ({ patk: 1 + 0.04 * l }),
    },
    passive_monk_crit_boost: {
      id: 'passive_monk_crit_boost',
      name: '練達',
      tree: 'base',
      mods: (l) => ({ crit: 0.015 * l }),
    },
    passive_hexer_matk_boost: {
      id: 'passive_hexer_matk_boost',
      name: '呪詛',
      tree: 'base',
      mods: (l) => ({ matk: 1 + 0.03 * l }),
    },
    passive_hexer_mdef_boost: {
      id: 'passive_hexer_mdef_boost',
      name: '瘴気の衣',
      tree: 'base',
      mods: (l) => ({ mdef: 1 + 0.03 * l }),
    },
    passive_summoner_staff_mastery: {
      id: 'passive_summoner_staff_mastery',
      name: '霊媒の心得',
      tree: 'base',
      weaponType: 'staff',
      mods: (l) => ({ matk: 1 + 0.04 * l }),
    },
    passive_summoner_tp_boost: {
      id: 'passive_summoner_tp_boost',
      name: '死霊術の知識',
      tree: 'base',
      mods: (l) => ({ maxTp: 1 + 0.04 * l }),
    },
    passive_title_berserker: {
      id: 'passive_title_berserker',
      name: '狂気の力',
      tree: 'title',
      mods: (l) => ({ patk: 1 + 0.03 * l, crit: 0.01 * l }),
    },
    passive_title_sentinel: {
      id: 'passive_title_sentinel',
      name: '警戒',
      tree: 'title',
      mods: (l) => ({ pdef: 1 + 0.03 * l, acc: 1 + 0.02 * l }),
    },
    passive_title_bulwark: {
      id: 'passive_title_bulwark',
      name: '鉄壁',
      tree: 'title',
      mods: (l) => ({ pdef: 1 + 0.03 * l, maxHp: 1 + 0.03 * l }),
    },
    passive_title_vanguard: {
      id: 'passive_title_vanguard',
      name: '突撃',
      tree: 'title',
      mods: (l) => ({ patk: 1 + 0.04 * l }),
    },
    passive_title_pyromancer: {
      id: 'passive_title_pyromancer',
      name: '業火',
      tree: 'title',
      mods: (l) => ({ matk: 1 + 0.04 * l }),
    },
    passive_title_sage: {
      id: 'passive_title_sage',
      name: '英知',
      tree: 'title',
      mods: (l) => ({ maxTp: 1 + 0.04 * l, mdef: 1 + 0.02 * l }),
    },
    passive_title_sniper: {
      id: 'passive_title_sniper',
      name: '精密射撃',
      tree: 'title',
      mods: (l) => ({ crit: 0.015 * l, acc: 1 + 0.02 * l }),
    },
    passive_title_tracker: {
      id: 'passive_title_tracker',
      name: '隠密',
      tree: 'title',
      mods: (l) => ({ eva: 1 + 0.04 * l }),
    },
    passive_title_saint: {
      id: 'passive_title_saint',
      name: '慈愛',
      tree: 'title',
      mods: (l) => ({ maxTp: 1 + 0.03 * l, mdef: 1 + 0.03 * l }),
    },
    passive_title_blade_dancer: {
      id: 'passive_title_blade_dancer',
      name: '剣の舞',
      tree: 'title',
      mods: (l) => ({ patk: 1 + 0.03 * l, eva: 1 + 0.02 * l }),
    },
    passive_title_muse: {
      id: 'passive_title_muse',
      name: '詩心',
      tree: 'title',
      mods: (l) => ({ maxTp: 1 + 0.04 * l }),
    },
    passive_title_zen: {
      id: 'passive_title_zen',
      name: '不動',
      tree: 'title',
      mods: (l) => ({ pdef: 1 + 0.03 * l, maxHp: 1 + 0.03 * l }),
    },
    passive_title_plague: {
      id: 'passive_title_plague',
      name: '疫病',
      tree: 'title',
      mods: (l) => ({ matk: 1 + 0.04 * l }),
    },
    passive_title_warlock: {
      id: 'passive_title_warlock',
      name: '魔道の極み',
      tree: 'title',
      mods: (l) => ({ matk: 1 + 0.03 * l, crit: 0.01 * l }),
    },
    passive_title_necromancer: {
      id: 'passive_title_necromancer',
      name: '降霊',
      tree: 'title',
      mods: (l) => ({ matk: 1 + 0.03 * l, maxTp: 1 + 0.03 * l }),
    },
    passive_title_puppeteer: {
      id: 'passive_title_puppeteer',
      name: '傀儡操糸',
      tree: 'title',
      mods: (l) => ({ maxHp: 1 + 0.03 * l, maxTp: 1 + 0.02 * l }),
    },
    passive_warrior_axe_mastery: {
      id: 'passive_warrior_axe_mastery',
      name: '斧の心得',
      tree: 'base',
      weaponType: 'axe',
      mods: (l) => ({ patk: 1 + 0.04 * l }),
    },
    passive_warrior_crit_focus: {
      id: 'passive_warrior_crit_focus',
      name: '会心',
      tree: 'base',
      mods: (l) => ({ crit: 0.015 * l }),
    },
    passive_warrior_vitality: {
      id: 'passive_warrior_vitality',
      name: '頑健な肉体',
      tree: 'base',
      mods: (l) => ({ maxHp: 1 + 0.04 * l }),
    },
    passive_warrior_t_bloodlust: {
      id: 'passive_warrior_t_bloodlust',
      name: '血の渇き',
      tree: 'title',
      mods: (l) => ({ patk: 1 + 0.03 * l, crit: 0.015 * l }),
    },
    passive_warrior_t_guardian_eye: {
      id: 'passive_warrior_t_guardian_eye',
      name: '監視眼',
      tree: 'title',
      mods: (l) => ({ pdef: 1 + 0.03 * l, acc: 1 + 0.03 * l }),
    },
    passive_guardian_spear_mastery: {
      id: 'passive_guardian_spear_mastery',
      name: '槍の心得',
      tree: 'base',
      weaponType: 'spear',
      mods: (l) => ({ patk: 1 + 0.04 * l }),
    },
    passive_guardian_mdef_boost: {
      id: 'passive_guardian_mdef_boost',
      name: '魔法耐性',
      tree: 'base',
      mods: (l) => ({ mdef: 1 + 0.03 * l }),
    },
    passive_guardian_iron_will: {
      id: 'passive_guardian_iron_will',
      name: '鋼の意志',
      tree: 'base',
      mods: (l) => ({ pdef: 1 + 0.03 * l, maxHp: 1 + 0.04 * l }),
    },
    passive_guardian_t_fortress: {
      id: 'passive_guardian_t_fortress',
      name: '要塞',
      tree: 'title',
      mods: (l) => ({ pdef: 1 + 0.04 * l, maxHp: 1 + 0.04 * l }),
    },
    passive_guardian_t_spearhead: {
      id: 'passive_guardian_t_spearhead',
      name: '尖兵',
      tree: 'title',
      mods: (l) => ({ patk: 1 + 0.04 * l }),
    },
    passive_mage_matk_boost: {
      id: 'passive_mage_matk_boost',
      name: '魔力増幅',
      tree: 'base',
      mods: (l) => ({ matk: 1 + 0.03 * l }),
    },
    passive_mage_spell_focus: {
      id: 'passive_mage_spell_focus',
      name: '魔法熟練',
      tree: 'base',
      mods: (l) => ({ matk: 1 + 0.03 * l, crit: 0.015 * l }),
    },
    passive_mage_t_inferno: {
      id: 'passive_mage_t_inferno',
      name: '業炎',
      tree: 'title',
      mods: (l) => ({ matk: 1 + 0.04 * l }),
    },
    passive_mage_t_arcane_lore: {
      id: 'passive_mage_t_arcane_lore',
      name: '深淵の知識',
      tree: 'title',
      mods: (l) => ({ maxTp: 1 + 0.04 * l, mdef: 1 + 0.03 * l }),
    },
    passive_ranger_eagle_eye: {
      id: 'passive_ranger_eagle_eye',
      name: '鷹の目',
      tree: 'base',
      mods: (l) => ({ acc: 1 + 0.03 * l, crit: 0.015 * l }),
    },
    passive_ranger_t_keen_sight: {
      id: 'passive_ranger_t_keen_sight',
      name: '眼力',
      tree: 'title',
      mods: (l) => ({ acc: 1 + 0.03 * l }),
    },
    passive_ranger_t_shadowstep: {
      id: 'passive_ranger_t_shadowstep',
      name: '影縫い',
      tree: 'title',
      mods: (l) => ({ eva: 1 + 0.03 * l }),
    },
    passive_medic_mind_boost: {
      id: 'passive_medic_mind_boost',
      name: '治療の心得',
      tree: 'base',
      mods: (l) => ({ matk: 1 + 0.03 * l }),
    },
    passive_medic_t_blessing: {
      id: 'passive_medic_t_blessing',
      name: '祝福',
      tree: 'title',
      mods: (l) => ({ maxTp: 1 + 0.04 * l, mdef: 1 + 0.02 * l }),
    },
    passive_medic_t_alchemy: {
      id: 'passive_medic_t_alchemy',
      name: '錬薬',
      tree: 'title',
      mods: (l) => ({ maxTp: 1 + 0.04 * l }),
    },
    passive_dancer_grace: {
      id: 'passive_dancer_grace',
      name: '優美',
      tree: 'base',
      mods: (l) => ({ eva: 1 + 0.03 * l, acc: 1 + 0.02 * l }),
    },
    passive_dancer_t_grace: {
      id: 'passive_dancer_t_grace',
      name: '舞の極み',
      tree: 'title',
      mods: (l) => ({ patk: 1 + 0.03 * l, eva: 1 + 0.02 * l }),
    },
    passive_dancer_t_melody: {
      id: 'passive_dancer_t_melody',
      name: '調べ',
      tree: 'title',
      mods: (l) => ({ maxTp: 1 + 0.04 * l, mdef: 1 + 0.02 * l }),
    },
    passive_monk_hp_boost: {
      id: 'passive_monk_hp_boost',
      name: '鍛錬',
      tree: 'base',
      mods: (l) => ({ maxHp: 1 + 0.04 * l }),
    },
    passive_monk_eva_boost: {
      id: 'passive_monk_eva_boost',
      name: '見切り',
      tree: 'base',
      mods: (l) => ({ eva: 1 + 0.03 * l }),
    },
    passive_grappler_t_counter_mastery: {
      id: 'passive_grappler_t_counter_mastery',
      name: '体捌き',
      tree: 'title',
      mods: (l) => ({ eva: 1 + 0.03 * l, crit: 0.015 * l }),
    },
    passive_hexer_acc_boost: {
      id: 'passive_hexer_acc_boost',
      name: '呪言',
      tree: 'base',
      mods: (l) => ({ acc: 1 + 0.03 * l }),
    },
    passive_warlock_t_matk_mastery: {
      id: 'passive_warlock_t_matk_mastery',
      name: '禁術の知識',
      tree: 'title',
      mods: (l) => ({ matk: 1 + 0.04 * l }),
    },
    passive_summoner_mdef_boost: {
      id: 'passive_summoner_mdef_boost',
      name: '霊体防護',
      tree: 'base',
      mods: (l) => ({ mdef: 1 + 0.03 * l }),
    },
    passive_puppeteer_t_vitality: {
      id: 'passive_puppeteer_t_vitality',
      name: '操糸の妙',
      tree: 'title',
      mods: (l) => ({ maxHp: 1 + 0.04 * l, maxTp: 1 + 0.04 * l }),
    },
    passive_warrior_dual_edge: {
      id: 'passive_warrior_dual_edge',
      name: '双刃の理',
      tree: 'base',
      mods: (l) => ({ patk: 1 + 0.04 * l, crit: 0.015 * l }),
    },
    passive_mage_overload: {
      id: 'passive_mage_overload',
      name: '魔導過負荷',
      tree: 'base',
      mods: (l) => ({ matk: 1 + 0.04 * l }),
    },
    passive_ranger_keen_eye: {
      id: 'passive_ranger_keen_eye',
      name: '精密眼',
      tree: 'base',
      mods: (l) => ({ acc: 1 + 0.03 * l, crit: 0.015 * l }),
    },
    passive_ranger_swift_hands: {
      id: 'passive_ranger_swift_hands',
      name: '速射の手',
      tree: 'base',
      mods: (l) => ({ patk: 1 + 0.03 * l }),
    },
    passive_ranger_predator: {
      id: 'passive_ranger_predator',
      name: '狩猟本能',
      tree: 'base',
      mods: (l) => ({ patk: 1 + 0.04 * l, crit: 0.015 * l }),
    },
    passive_medic_healing_hands: {
      id: 'passive_medic_healing_hands',
      name: '癒しの手',
      tree: 'base',
      mods: (l) => ({ matk: 1 + 0.03 * l }),
    },
    passive_medic_staff_mastery: {
      id: 'passive_medic_staff_mastery',
      name: '杖の心得',
      tree: 'base',
      weaponType: 'staff',
      mods: (l) => ({ matk: 1 + 0.04 * l }),
    },
    passive_medic_vitality: {
      id: 'passive_medic_vitality',
      name: '健勝',
      tree: 'base',
      mods: (l) => ({ maxHp: 1 + 0.04 * l }),
    },
    passive_dancer_blade_mastery: {
      id: 'passive_dancer_blade_mastery',
      name: '剣の心得',
      tree: 'base',
      weaponType: 'sword',
      mods: (l) => ({ patk: 1 + 0.04 * l }),
    },
    passive_dancer_vigor: {
      id: 'passive_dancer_vigor',
      name: '活力',
      tree: 'base',
      mods: (l) => ({ maxHp: 1 + 0.04 * l }),
    },
    passive_dancer_resonance: {
      id: 'passive_dancer_resonance',
      name: '共鳴',
      tree: 'base',
      mods: (l) => ({ matk: 1 + 0.03 * l, maxTp: 1 + 0.03 * l }),
    },
    passive_monk_counter_mastery: {
      id: 'passive_monk_counter_mastery',
      name: '反骨',
      tree: 'base',
      mods: (l) => ({ patk: 1 + 0.03 * l, crit: 0.015 * l }),
    },
    passive_hexer_curse_lore: {
      id: 'passive_hexer_curse_lore',
      name: '呪術の知識',
      tree: 'base',
      mods: (l) => ({ matk: 1 + 0.04 * l }),
    },
    passive_summoner_spirit_lore: {
      id: 'passive_summoner_spirit_lore',
      name: '冥導',
      tree: 'base',
      mods: (l) => ({ matk: 1 + 0.03 * l, maxTp: 1 + 0.03 * l }),
    },
  },
  zb = ['patk', 'matk', 'pdef', 'mdef', 'acc', 'eva', 'maxHp', 'maxTp'];
function Hb(l) {
  var o;
  const i = l.equipment.weapon;
  if (i) return (o = ot[i.masterId]) == null ? void 0 : o.weaponType;
}
function Ub(l) {
  const i = Hb(l),
    o = {};
  let r = 0;
  for (const [c, d] of Object.entries(l.learnedSkills)) {
    if (d <= 0) continue;
    const _ = xc[c];
    if (!_ || (_.weaponType && _.weaponType !== i)) continue;
    const h = _.mods(d);
    for (const k of zb) h[k] !== void 0 && (o[k] = (o[k] ?? 1) * h[k]);
    h.crit !== void 0 && (r += h.crit);
  }
  return (r !== 0 && (o.crit = r), o);
}
const mt = (l) => ({ hp: 0, tp: 0, str: 0, vit: 0, agi: 0, int: 0, mnd: 0, luc: 0, ...l }),
  Rl = {
    title_berserker: {
      id: 'title_berserker',
      name: '狂戦士',
      parentClassId: 'class_warrior',
      skillTree: {
        skills: [
          { skillId: 'passive_title_berserker', maxLevel: 3 },
          { skillId: 'passive_warrior_t_bloodlust', maxLevel: 3 },
          {
            skillId: 'skill_warrior_t_rampage',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_berserker', level: 2 }],
          },
        ],
      },
      growthModifier: mt({ str: 1 }),
    },
    title_sentinel: {
      id: 'title_sentinel',
      name: '哨戒兵',
      parentClassId: 'class_warrior',
      skillTree: {
        skills: [
          { skillId: 'passive_title_sentinel', maxLevel: 3 },
          { skillId: 'passive_warrior_t_guardian_eye', maxLevel: 3 },
          {
            skillId: 'skill_warrior_t_overwatch',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_sentinel', level: 2 }],
          },
        ],
      },
      growthModifier: mt({ vit: 1 }),
    },
    title_bulwark: {
      id: 'title_bulwark',
      name: '城壁',
      parentClassId: 'class_guardian',
      skillTree: {
        skills: [
          { skillId: 'passive_title_bulwark', maxLevel: 3 },
          { skillId: 'passive_guardian_t_fortress', maxLevel: 3 },
          {
            skillId: 'skill_guardian_t_last_bastion',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_bulwark', level: 2 }],
          },
        ],
      },
      growthModifier: mt({ vit: 1, hp: 2 }),
    },
    title_vanguard: {
      id: 'title_vanguard',
      name: '先鋒',
      parentClassId: 'class_guardian',
      skillTree: {
        skills: [
          { skillId: 'passive_title_vanguard', maxLevel: 3 },
          { skillId: 'passive_guardian_t_spearhead', maxLevel: 3 },
          {
            skillId: 'skill_guardian_t_lance_charge',
            maxLevel: 5,
            requires: [{ skillId: 'passive_title_vanguard', level: 2 }],
          },
        ],
      },
      growthModifier: mt({ str: 1 }),
    },
    title_pyromancer: {
      id: 'title_pyromancer',
      name: '紅蓮術士',
      parentClassId: 'class_mage',
      skillTree: {
        skills: [
          { skillId: 'passive_title_pyromancer', maxLevel: 3 },
          { skillId: 'passive_mage_t_inferno', maxLevel: 3 },
          {
            skillId: 'skill_mage_t_hellfire',
            maxLevel: 5,
            requires: [{ skillId: 'passive_title_pyromancer', level: 2 }],
          },
        ],
      },
      growthModifier: mt({ int: 1 }),
    },
    title_sage: {
      id: 'title_sage',
      name: '賢者',
      parentClassId: 'class_mage',
      skillTree: {
        skills: [
          { skillId: 'passive_title_sage', maxLevel: 3 },
          { skillId: 'passive_mage_t_arcane_lore', maxLevel: 3 },
          {
            skillId: 'skill_mage_t_mana_surge',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_sage', level: 2 }],
          },
        ],
      },
      growthModifier: mt({ tp: 2, mnd: 1 }),
    },
    title_sniper: {
      id: 'title_sniper',
      name: '狙撃手',
      parentClassId: 'class_ranger',
      skillTree: {
        skills: [
          { skillId: 'passive_title_sniper', maxLevel: 3 },
          { skillId: 'passive_ranger_t_keen_sight', maxLevel: 3 },
          {
            skillId: 'skill_ranger_t_snipe',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_sniper', level: 2 }],
          },
        ],
      },
      growthModifier: mt({ agi: 1, luc: 1 }),
    },
    title_tracker: {
      id: 'title_tracker',
      name: '追跡者',
      parentClassId: 'class_ranger',
      skillTree: {
        skills: [
          { skillId: 'passive_title_tracker', maxLevel: 3 },
          { skillId: 'passive_ranger_t_shadowstep', maxLevel: 3 },
          {
            skillId: 'skill_ranger_t_camouflage',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_tracker', level: 2 }],
          },
        ],
      },
      growthModifier: mt({ agi: 1 }),
    },
    title_saint: {
      id: 'title_saint',
      name: '聖者',
      parentClassId: 'class_medic',
      skillTree: {
        skills: [
          { skillId: 'passive_title_saint', maxLevel: 3 },
          { skillId: 'passive_medic_t_blessing', maxLevel: 3 },
          {
            skillId: 'skill_medic_t_revive_light',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_saint', level: 2 }],
          },
        ],
      },
      growthModifier: mt({ mnd: 1, tp: 2 }),
    },
    title_apothecary: {
      id: 'title_apothecary',
      name: '調薬師',
      parentClassId: 'class_medic',
      skillTree: {
        skills: [
          { skillId: 'skill_cleanse_draft', maxLevel: 3 },
          { skillId: 'passive_medic_t_alchemy', maxLevel: 3 },
          {
            skillId: 'skill_medic_t_stimulant',
            maxLevel: 3,
            requires: [{ skillId: 'skill_cleanse_draft', level: 2 }],
          },
        ],
      },
      growthModifier: mt({ luc: 1, tp: 1 }),
    },
    title_blade_dancer: {
      id: 'title_blade_dancer',
      name: '剣の舞手',
      parentClassId: 'class_dancer',
      skillTree: {
        skills: [
          { skillId: 'passive_title_blade_dancer', maxLevel: 3 },
          { skillId: 'passive_dancer_t_grace', maxLevel: 3 },
          {
            skillId: 'skill_dancer_t_finale',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_blade_dancer', level: 2 }],
          },
        ],
      },
      growthModifier: mt({ agi: 1, str: 1 }),
    },
    title_muse: {
      id: 'title_muse',
      name: '舞姫',
      parentClassId: 'class_dancer',
      skillTree: {
        skills: [
          { skillId: 'passive_title_muse', maxLevel: 3 },
          { skillId: 'passive_dancer_t_melody', maxLevel: 3 },
          {
            skillId: 'skill_dancer_t_lullaby',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_muse', level: 2 }],
          },
        ],
      },
      growthModifier: mt({ mnd: 1, tp: 1 }),
    },
    title_grappler: {
      id: 'title_grappler',
      name: '組手家',
      parentClassId: 'class_monk',
      skillTree: {
        skills: [
          { skillId: 'skill_counter_throw', maxLevel: 3 },
          { skillId: 'passive_grappler_t_counter_mastery', maxLevel: 3 },
          {
            skillId: 'skill_grappler_t_chain_throw',
            maxLevel: 3,
            requires: [{ skillId: 'skill_counter_throw', level: 1 }],
          },
        ],
      },
      growthModifier: mt({ str: 1, agi: 1 }),
    },
    title_zen: {
      id: 'title_zen',
      name: '禅僧',
      parentClassId: 'class_monk',
      skillTree: {
        skills: [
          { skillId: 'passive_title_zen', maxLevel: 3 },
          { skillId: 'skill_zen_t_meditation', maxLevel: 3 },
          {
            skillId: 'skill_zen_t_mountain_stance',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_zen', level: 1 }],
          },
        ],
      },
      growthModifier: mt({ vit: 1, tp: 1 }),
    },
    title_plague: {
      id: 'title_plague',
      name: '疫病使い',
      parentClassId: 'class_hexer',
      skillTree: {
        skills: [
          { skillId: 'passive_title_plague', maxLevel: 3 },
          { skillId: 'skill_plague_t_wither', maxLevel: 3 },
          {
            skillId: 'skill_plague_t_pandemic',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_plague', level: 1 }],
          },
        ],
      },
      growthModifier: mt({ int: 1 }),
    },
    title_warlock: {
      id: 'title_warlock',
      name: '魔道師',
      parentClassId: 'class_hexer',
      skillTree: {
        skills: [
          { skillId: 'passive_title_warlock', maxLevel: 3 },
          { skillId: 'passive_warlock_t_matk_mastery', maxLevel: 3 },
          {
            skillId: 'skill_warlock_t_dark_bolt',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_warlock', level: 1 }],
          },
        ],
      },
      growthModifier: mt({ int: 1, luc: 1 }),
    },
    title_necromancer: {
      id: 'title_necromancer',
      name: '降霊師',
      parentClassId: 'class_summoner',
      skillTree: {
        skills: [
          { skillId: 'passive_title_necromancer', maxLevel: 3 },
          { skillId: 'skill_necromancer_t_death_pulse', maxLevel: 3 },
          {
            skillId: 'skill_necromancer_t_call_revenant',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_necromancer', level: 1 }],
          },
        ],
      },
      growthModifier: mt({ int: 1, tp: 1 }),
    },
    title_puppeteer: {
      id: 'title_puppeteer',
      name: '傀儡師',
      parentClassId: 'class_summoner',
      skillTree: {
        skills: [
          { skillId: 'passive_title_puppeteer', maxLevel: 3 },
          { skillId: 'passive_puppeteer_t_vitality', maxLevel: 3 },
          {
            skillId: 'skill_puppeteer_t_aegis',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_puppeteer', level: 1 }],
          },
        ],
      },
      growthModifier: mt({ mnd: 1, vit: 1 }),
    },
  },
  Gb = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];
function qa(l) {
  var h, k;
  const i = bt[l.raceId];
  if (!i) throw new Error(`computeBaseStats: 未定義の種族 "${l.raceId}"`);
  const r = Math.max(1, Math.min(l.level, Ue.LEVEL_CAP)) - 1,
    c = l.titleId ? ((h = Rl[l.titleId]) == null ? void 0 : h.growthModifier) : void 0,
    d = ((k = l.rebirthBonus) == null ? void 0 : k.allStats) ?? 0,
    _ = {};
  for (const p of Gb) {
    const v = i.statGrowth[p] + ((c == null ? void 0 : c[p]) ?? 0);
    _[p] = i.baseStatsAtLv1[p] + v * r + d;
  }
  return _;
}
const $b = 3,
  zl = (l, i, o) => Math.max(i, Math.min(o, l)),
  Yb = {
    poison: '毒',
    paralysis: '麻痺',
    sleep: '睡眠',
    confusion: '混乱',
    curse: '呪い',
    blind: '盲目',
    instantDeath: '即死',
    headBind: '頭封じ',
    armBind: '腕封じ',
    legBind: '脚封じ',
  };
function Xb(l) {
  const i = { atk: 0, mat: 0, def: 0, mdf: 0 };
  for (const o of Object.values(l.equipment)) {
    if (!o || !ot[o.masterId]) continue;
    const c = ph(o.masterId, o.grade),
      d = Mb(o.masterId, o.forgeLevel);
    ((i.atk += (c.atk ?? 0) + (d.atk ?? 0)),
      (i.mat += (c.mat ?? 0) + (d.mat ?? 0)),
      (i.def += (c.def ?? 0) + (d.def ?? 0)),
      (i.mdf += (c.mdf ?? 0) + (d.mdf ?? 0)));
  }
  return i;
}
function Vb(l, i) {
  var p;
  const o = l.guild.members.find((v) => v.id === i);
  if (!o) return null;
  const r = (p = l.diveState) == null ? void 0 : p.party.find((v) => v.charId === i),
    c = qa(o),
    d = Ub(o),
    _ = Math.round(c.hp * (d.maxHp ?? 1)),
    h = Math.round(c.tp * (d.maxTp ?? 1)),
    k = l.guild.party.front.includes(i);
  return {
    id: i,
    name: o.name,
    side: 'ally',
    row: k ? 'front' : 'back',
    stats: c,
    equip: Xb(o),
    hp: r ? Math.min(r.hp, _) : _,
    maxHp: _,
    tp: r ? Math.min(r.tp, h) : h,
    maxTp: h,
    buffs: [],
    ailments: r ? [...r.ailments] : [],
    states: [],
    passive: d,
    unionGauge: (r == null ? void 0 : r.unionGauge) ?? 0,
    isDown: r ? r.hp <= 0 : !1,
  };
}
function Qb(l, i, o) {
  const r = ol[l],
    c = Eb(r, o),
    d = fh(o);
  return {
    id: `enemy_${i}`,
    name: d >= 2 ? `${r.name} Lv${d}` : r.name,
    side: 'enemy',
    row: 'front',
    stats: c,
    equip: {},
    hp: c.hp,
    maxHp: c.hp,
    tp: c.tp,
    maxTp: c.tp,
    buffs: [],
    ailments: [],
    unionGauge: 0,
    isDown: !1,
    enemyId: l,
    resist: r.resist,
  };
}
function wh(l, i, o, r, c) {
  const d = Bn[l],
    _ = ch(d.baseStats, Gc(i, d.refDepth)),
    h = c ?? _.hp;
  return {
    id: r,
    name: d.name,
    side: 'ally',
    row: 'front',
    stats: _,
    equip: {},
    hp: h,
    maxHp: _.hp,
    tp: 0,
    maxTp: 0,
    buffs: [],
    ailments: [],
    unionGauge: 0,
    isDown: h <= 0,
    isSummon: !0,
    summonKind: l,
    ownerId: o,
  };
}
function bp(l, i, o = 'none') {
  var k, p;
  const r = ((k = l.diveState) == null ? void 0 : k.depth) ?? 1,
    d = [...l.guild.party.front, ...l.guild.party.back]
      .filter((v) => v !== null)
      .map((v) => Vb(l, v))
      .filter((v) => v !== null),
    _ = i.map((v, y) => Qb(v, y, r)),
    h = (((p = l.diveState) == null ? void 0 : p.persistentSummons) ?? [])
      .map((v, y) => wh(v.summonKind, r, v.ownerId, `summon_persist_${y}`, v.hp))
      .filter((v) => !v.isDown);
  return {
    turn: 1,
    depth: r,
    allies: d,
    enemies: _,
    summons: h,
    log: [],
    outcome: 'ongoing',
    firstStrike: o,
    drops: [],
    consumedItems: [],
  };
}
const _t = (l, i) => (i === 'ally' ? l.allies : l.enemies).filter((o) => !o.isDown),
  Lr = (l) => l.summons.filter((i) => !i.isDown);
function Dl(l, i) {
  return (
    l.allies.find((o) => o.id === i) ??
    l.enemies.find((o) => o.id === i) ??
    l.summons.find((o) => o.id === i)
  );
}
const Kc = (l) => {
    var i;
    return (
      !!l.isSummon && !!l.summonKind && ((i = Bn[l.summonKind]) == null ? void 0 : i.buffImmune)
    );
  },
  Kb = (l, i) => {
    var o;
    return ((o = l.resist) == null ? void 0 : o[i]) ?? 1;
  };
function Th(l, i, o) {
  ((l.hp = zl(l.hp - i, 0, l.maxHp)),
    i > 0 &&
      l.ailments.some((r) => r.type === 'sleep') &&
      ((l.ailments = l.ailments.filter((r) => r.type !== 'sleep')),
      o.push({ text: `${l.name} は目を覚ました` })),
    l.hp === 0 &&
      !l.isDown &&
      ((l.isDown = !0),
      (l.unionGauge = Math.floor(l.unionGauge / 2)),
      o.push({ text: `${l.name} は倒れた！` })));
}
function Sc(l, i) {
  l.isDown || (l.unionGauge = zl(l.unionGauge + i, 0, 100));
}
function wc(l, i) {
  Kc(l) ||
    ((l.buffs = l.buffs.filter((o) => !(o.stat === i.stat && o.stackGroup === i.stackGroup))),
    l.buffs.push(i));
}
function Zb(l, i) {
  if (Kc(l)) return;
  const o = l.ailments.find((r) => r.type === i.type);
  if (o) {
    o.remainingTurns = Math.max(o.remainingTurns, i.remainingTurns);
    return;
  }
  l.ailments.push(i);
}
function ir(l, i) {
  Kc(l) || (l.states = [...(l.states ?? []).filter((o) => o.kind !== i.kind), i]);
}
function Jb(l, i) {
  return i.side === 'ally' ? [..._t(l, 'ally'), ...Lr(l)] : _t(l, 'enemy');
}
function Pb(l, i, o) {
  const r = (l.states ?? []).find((d) => d.kind === 'barrier' && d.absorb > 0);
  if (!r || r.kind !== 'barrier') return i;
  const c = Math.min(r.absorb, i);
  return (
    (r.absorb -= c),
    c > 0 && o.push({ text: `${l.name} は障壁で ${c} のダメージを防いだ` }),
    r.absorb <= 0 && (l.states = (l.states ?? []).filter((d) => d !== r)),
    i - c
  );
}
function vr(l, i, o, r, c, d = {}) {
  if (o.isDown) return { hit: !1, dealt: 0 };
  const _ = Ab(
    i,
    o,
    {
      statBase: r.statBase,
      power: r.power,
      element: r.element,
      elementMultiplier: Kb(o, r.element),
    },
    c
  );
  if (!_.hit) return (l.log.push({ text: `${i.name} の攻撃は外れた` }), { hit: !1, dealt: 0 });
  const h = Pb(o, _.damage, l.log);
  return (
    Th(o, h, l.log),
    d.actorUnion && Sc(i, d.actorUnion),
    Sc(o, 5),
    h > 0 &&
      l.log.push({
        text: `${i.name} の攻撃！ ${o.name} に ${h} ダメージ${_.critical ? '（会心）' : ''}`,
      }),
    { hit: !0, dealt: h }
  );
}
function Eh(l, i, o, r, c, d) {
  if (!o.isDown && !i.isDown && o.side !== i.side)
    for (const _ of o.states ?? []) {
      if (_.kind !== 'counter' || d.next() >= _.chance) continue;
      l.log.push({ text: `${o.name} の反撃！` });
      const h = _.statBase === 'str' ? 'bash' : 'almighty';
      if ((vr(l, o, i, { statBase: _.statBase, power: _.power, element: h }, d), i.isDown)) break;
    }
  if (c > 0 && o.side !== i.side) {
    for (const _ of Jb(l, i))
      if (!(_.id === i.id || _.isDown || o.isDown))
        for (const h of _.states ?? [])
          h.kind === 'chase' &&
            ((h.element !== r && h.element !== 'almighty' && r !== 'almighty') ||
              (l.log.push({ text: `${_.name} の連携追撃！` }),
              vr(l, _, o, { statBase: h.statBase, power: h.power, element: h.element }, d)));
  }
}
function Wb(l, i, o) {
  return zl(l * (1 + (i.stats.luc - o.stats.luc) * Ue.AILMENT_LUC_K), 0, Ue.AILMENT_MAX);
}
function Ch(l, i, o, r) {
  const c = i.side === 'ally' ? 'enemy' : 'ally';
  switch (o) {
    case 'self':
      return [i];
    case 'allyAll':
      return i.side === 'ally' ? [..._t(l, 'ally'), ...Lr(l)] : _t(l, 'enemy');
    case 'allyOne': {
      const d = Dl(l, r);
      return d && d.side === i.side ? [d] : [i];
    }
    case 'enemyAll':
      return _t(l, c);
    case 'enemyRow':
    case 'enemyOne':
    default: {
      const d = Dl(l, r);
      return d && d.side === c && !d.isDown ? [d] : _t(l, c).slice(0, 1);
    }
  }
}
function Fb(l, i, o, r) {
  return Ch(l, i, o.target, r);
}
function Nh(l, i, o, r, c, d, _) {
  switch (o.kind) {
    case 'damage': {
      const h = o.hits ?? 1,
        k = o.power(c);
      for (const p of d) {
        if (p.isDown) continue;
        let v = !1,
          y = 0;
        for (let S = 0; S < h && !p.isDown; S++) {
          const q = vr(l, i, p, { statBase: o.statBase, power: k, element: r }, _);
          q.hit && ((v = !0), (y += q.dealt));
        }
        v && Eh(l, i, p, r, y, _);
      }
      break;
    }
    case 'heal': {
      const h = o.amount(c);
      for (const k of d) k.isDown || (k.hp = zl(k.hp + h, 0, k.maxHp));
      l.log.push({ text: `${i.name} は回復魔法を使った（+${h}）` });
      break;
    }
    case 'buff': {
      for (const h of d)
        wc(h, {
          stat: o.stat,
          modifier: o.modifier(c),
          remainingTurns: o.turns,
          stackGroup: o.stackGroup,
        });
      l.log.push({ text: `${i.name} は態勢を整えた` });
      break;
    }
    case 'ailment': {
      for (const h of d) {
        if (h.isDown) continue;
        const k = Wb(o.chance(c), i, h);
        _.next() < k &&
          (Zb(h, { type: o.ailment, remainingTurns: o.turns, magnitude: o.magnitude }),
          l.log.push({ text: `${h.name} は${Yb[o.ailment]}になった` }));
      }
      break;
    }
    case 'summon': {
      if (i.side !== 'ally') break;
      if (Lr(l).length >= $b) {
        l.log.push({ text: 'これ以上は召喚できない' });
        break;
      }
      const h = `summon_${l.turn}_${l.summons.length}`,
        k = wh(o.summonKind, l.depth, i.id, h);
      (l.summons.push(k), l.log.push({ text: `${i.name} は ${k.name} を召喚した！` }));
      break;
    }
    case 'counter': {
      for (const h of d)
        h.isDown ||
          ir(h, {
            kind: 'counter',
            chance: o.chance(c),
            power: o.power(c),
            statBase: o.statBase,
            remainingTurns: o.turns,
          });
      l.log.push({ text: `${i.name} は反撃の構えを取った` });
      break;
    }
    case 'chase': {
      for (const h of d)
        h.isDown ||
          ir(h, {
            kind: 'chase',
            element: r,
            power: o.power(c),
            statBase: o.statBase,
            remainingTurns: o.turns,
          });
      l.log.push({ text: `${i.name} は連携の構えを取った` });
      break;
    }
    case 'decoy': {
      for (const h of d)
        h.isDown || ir(h, { kind: 'decoy', weight: o.weight(c), remainingTurns: o.turns });
      l.log.push({ text: `${i.name} は敵の注意を引きつけた` });
      break;
    }
    case 'barrier': {
      for (const h of d)
        h.isDown || ir(h, { kind: 'barrier', absorb: o.absorb(c), remainingTurns: o.turns });
      l.log.push({ text: `${i.name} は守りの障壁を張った` });
      break;
    }
    case 'cleanse': {
      for (const h of d)
        h.isDown ||
          h.ailments.length === 0 ||
          ((h.ailments = []), l.log.push({ text: `${h.name} の状態異常が治療された` }));
      break;
    }
  }
}
function rc(l, i, o, r) {
  var _;
  if (o.isDown) return;
  const c = i.enemyId
      ? (ol[i.enemyId].attackElement ?? 'bash')
      : i.isSummon && i.summonKind
        ? (((_ = Bn[i.summonKind]) == null ? void 0 : _.attackElement) ?? 'bash')
        : 'bash',
    d = vr(l, i, o, { statBase: 'str', power: 1, element: c }, r, { actorUnion: 5 });
  d.hit && Eh(l, i, o, c, d.dealt, r);
}
const xp = (l) => (l.length === 0 ? 0 : l.reduce((i, o) => i + o.stats.agi, 0) / l.length);
function e1(l, i) {
  const o = l.map(
      (d) => 1 + (d.states ?? []).reduce((_, h) => _ + (h.kind === 'decoy' ? h.weight : 0), 0)
    ),
    r = o.reduce((d, _) => d + _, 0);
  let c = i.next() * r;
  for (let d = 0; d < l.length; d++) if (((c -= o[d]), c < 0)) return l[d];
  return l[l.length - 1];
}
const t1 = (l) => l.ailments.some((i) => i.type === 'paralysis'),
  l1 = (l) => l.ailments.some((i) => i.type === 'sleep'),
  Zc = (l, i) => l.ailments.some((o) => o.type === i),
  oc = (l) => Zc(l, 'armBind'),
  a1 = (l) => Zc(l, 'headBind'),
  n1 = (l) => Zc(l, 'legBind');
function Sp(l) {
  return l.effects.some((i) => i.kind === 'damage' && i.statBase === 'str');
}
function i1(l, i, o) {
  const r = En[i.unionSkillId];
  if (!r) return;
  const c = Dl(l, i.actorId);
  if (!c || c.isDown || c.side !== 'ally') return;
  if (c.unionGauge < 100) {
    l.log.push({ text: `${c.name} はユニオンゲージが足りない` });
    return;
  }
  const d = new Set(i.participantIds);
  d.add(c.id);
  const _ = [...d].map((v) => Dl(l, v)).filter((v) => !!v && !v.isDown && v.side === 'ally');
  if (_.length < r.requiredParticipants) {
    l.log.push({ text: `${c.name} の${r.name}は参加人数が足りない` });
    return;
  }
  const h = [c, ..._.filter((v) => v.id !== c.id)].slice(0, r.requiredParticipants);
  for (const v of h) v.unionGauge = zl(v.unionGauge - r.gaugeCostPerParticipant, 0, 100);
  l.log.push({ text: `ユニオン！ ${c.name} の${r.name}！` });
  const k = 1,
    p = Ch(l, c, r.target, i.targetId);
  for (const v of r.effects) Nh(l, c, v, r.element, k, p, o);
}
function uc(l, i, o) {
  var y, S, q;
  if (l.outcome !== 'ongoing') return l;
  const r = structuredClone({ ...l, log: [] }),
    c = new Map(i.filter((b) => b.kind !== 'union').map((b) => [b.actorId, b])),
    d = r.turn === 1 && r.firstStrike !== 'none',
    _ = d && r.firstStrike === 'preemptive',
    h = d && r.firstStrike === 'ambush';
  if (
    (_ && r.log.push({ text: '先制攻撃！ 味方が先手を取った' }),
    h && r.log.push({ text: '不意打ち！ 敵に先手を取られた' }),
    !h)
  )
    for (const b of i) b.kind === 'union' && i1(r, b, o);
  const k = i.find((b) => b.kind === 'flee');
  if (!h && k && r.outcome === 'ongoing') {
    const b = Dl(r, k.actorId);
    if (b && n1(b)) r.log.push({ text: `${b.name} は脚を封じられて逃げられない` });
    else {
      const L = zl(0.5 + (xp(_t(r, 'ally')) - xp(_t(r, 'enemy'))) * 0.02, 0.1, 0.95);
      if (o.next() < L)
        return (r.log.push({ text: 'うまく逃げ切れた！' }), (r.outcome = 'fled'), r);
      r.log.push({ text: '逃げられなかった！' });
    }
  }
  if (!h)
    for (const b of i) {
      if (b.kind !== 'guard') continue;
      const L = Dl(r, b.actorId);
      !L ||
        L.isDown ||
        (wc(L, { stat: 'pdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }),
        wc(L, { stat: 'mdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }));
    }
  const p = new Map();
  if (!_)
    for (const b of _t(r, 'enemy')) {
      const L = [...Lr(r), ..._t(r, 'ally')];
      L.length > 0 && p.set(b.id, e1(L, o).id);
    }
  const v = [...r.allies, ...r.enemies, ...r.summons]
    .filter((b) => !b.isDown)
    .filter((b) => !(_ && b.side === 'enemy') && !(h && b.side === 'ally'))
    .map((b) => ({ c: b, agi: b.stats.agi, tie: o.next() }))
    .sort((b, L) => L.agi - b.agi || L.tie - b.tie)
    .map((b) => b.c);
  for (const b of v)
    if (!b.isDown) {
      if (r.outcome !== 'ongoing') break;
      if (l1(b)) {
        r.log.push({ text: `${b.name} は眠っている` });
        continue;
      }
      if (t1(b) && o.next() < Ue.PARALYSIS_SKIP) {
        r.log.push({ text: `${b.name} は麻痺で動けない` });
        continue;
      }
      if (b.isSummon) {
        const L = b.summonKind ? Bn[b.summonKind] : void 0;
        if (L != null && L.actsOnTurn) {
          const C = _t(r, 'enemy');
          C.length > 0 && rc(r, b, o.pick(C), o);
        }
        if (_t(r, 'enemy').length === 0) break;
        continue;
      }
      if (b.side === 'enemy') {
        if (oc(b)) {
          r.log.push({ text: `${b.name} は腕を封じられて攻撃できない` });
          continue;
        }
        const L = p.get(b.id),
          C = L ? Dl(r, L) : void 0,
          T = C && !C.isDown ? C : _t(r, 'ally')[0];
        T && rc(r, b, T, o);
      } else {
        const L = c.get(b.id);
        if (!L || L.kind === 'guard' || L.kind === 'flee') continue;
        if (L.kind === 'attack') {
          if (oc(b)) {
            r.log.push({ text: `${b.name} は腕を封じられて攻撃できない` });
            continue;
          }
          const C = Dl(r, L.targetId),
            T = C && !C.isDown ? C : _t(r, 'enemy')[0];
          T && rc(r, b, T, o);
        } else if (L.kind === 'skill') {
          const C = Il[L.skillId];
          if (!C) continue;
          if (Sp(C) && oc(b)) {
            r.log.push({ text: `${b.name} は腕を封じられてスキルを使えない` });
            continue;
          }
          if (!Sp(C) && a1(b)) {
            r.log.push({ text: `${b.name} は頭を封じられてスキルを使えない` });
            continue;
          }
          const T = 1,
            A = C.tpCost(T);
          if (b.tp < A) {
            r.log.push({ text: `${b.name} は TP が足りない` });
            continue;
          }
          ((b.tp -= A), Sc(b, 10));
          const M = Fb(r, b, C, L.targetId);
          for (const P of C.effects) Nh(r, b, P, C.element, T, M, o);
        } else if (L.kind === 'item') {
          const C = Fe[L.itemId];
          if (!C || !((y = C.useContext) != null && y.includes('battle'))) continue;
          const T = Dl(r, L.targetId) ?? b;
          for (const A of C.effects ?? [])
            A.kind === 'heal'
              ? (T.hp = zl(T.hp + A.amount(1), 0, T.maxHp))
              : A.kind === 'restoreTp' && (T.tp = zl(T.tp + A.amount(1), 0, T.maxTp));
          (r.consumedItems.push(L.itemId), r.log.push({ text: `${b.name} は ${C.name} を使った` }));
        }
      }
      if (_t(r, 'enemy').length === 0 || _t(r, 'ally').length === 0) break;
    }
  for (const b of [...r.allies, ...r.enemies, ...r.summons]) {
    if (b.isDown) continue;
    const L = b.ailments.find((C) => C.type === 'poison');
    if (L) {
      const C = L.magnitude ?? Math.max(1, Math.floor(b.maxHp * Ue.POISON_HP_RATIO));
      (Th(b, C, r.log), r.log.push({ text: `${b.name} は毒で ${C} のダメージ` }));
    }
  }
  for (const b of [...r.allies, ...r.enemies, ...r.summons])
    (!b.isDown &&
      b.maxTp > 0 &&
      (b.tp = Math.min(b.maxTp, b.tp + Math.ceil(b.maxTp * Ue.TP_REGEN_RATIO))),
      (b.buffs = b.buffs
        .map((L) => ({ ...L, remainingTurns: L.remainingTurns - 1 }))
        .filter((L) => L.remainingTurns > 0)),
      (b.ailments = b.ailments
        .map((L) => ({ ...L, remainingTurns: L.remainingTurns - 1 }))
        .filter((L) => L.remainingTurns > 0)),
      b.states &&
        b.states.length > 0 &&
        (b.states = b.states
          .map((L) => ({ ...L, remainingTurns: L.remainingTurns - 1 }))
          .filter((L) => L.remainingTurns > 0)));
  for (const b of r.enemies)
    if (
      !(
        !b.isDown ||
        !b.enemyId ||
        (((S = l.enemies.find((C) => C.id === b.id)) == null ? void 0 : S.isDown) ?? !1)
      )
    )
      for (const C of ol[b.enemyId].drops ?? [])
        o.next() < C.rate &&
          (r.drops.push({ enemyId: b.enemyId, itemId: C.itemId }),
          r.log.push({
            text: `${b.name} は ${((q = Fe[C.itemId]) == null ? void 0 : q.name) ?? C.itemId} を落とした`,
          }));
  return (
    (r.summons = r.summons.filter((b) => !b.isDown)),
    (r.turn += 1),
    _t(r, 'enemy').length === 0
      ? (r.outcome = 'win')
      : _t(r, 'ally').length === 0 && (r.outcome = 'lose'),
    r
  );
}
function Ah(l) {
  let i = 0,
    o = 0;
  for (const r of l.enemies) {
    if (!r.enemyId) continue;
    const c = ol[r.enemyId],
      d = Gc(l.depth, c.refDepth);
    ((i += Math.round(c.exp * d)), (o += Math.round(c.gold * d)));
  }
  return { exp: i, gold: o };
}
function s1(l, i) {
  let o = l.level,
    r = l.exp + (sc(o) ? i : 0),
    c = l.skillPoints.total;
  for (; sc(o) && r >= vp(o); ) ((r -= vp(o)), (o += 1), (c += Sb(o)));
  return {
    ...l,
    level: o,
    exp: sc(l.level) ? r : l.exp,
    skillPoints: { ...l.skillPoints, total: c },
  };
}
function wp(l, i) {
  if (!l.diveState) return l;
  const o = i.outcome === 'win',
    r = i.outcome === 'win' || i.outcome === 'fled',
    c = new Map(i.allies.map((q) => [q.id, q])),
    d = l.diveState.party.map((q) => {
      const b = c.get(q.charId);
      if (!b) return q;
      let L = b.unionGauge;
      return (
        r && !b.isDown && (L = zl(L + Ue.UNION_GAIN_ON_WIN, 0, 100)),
        { ...q, hp: b.hp, tp: b.tp, unionGauge: L, ailments: b.ailments }
      );
    });
  let _ = l.guild.members,
    h = l.guild.gold;
  const k = { ...l.bestiary.monsters };
  for (const q of i.enemies) {
    if (!q.enemyId) continue;
    const b = k[q.enemyId] ?? { seen: !1, defeated: !1, dropsFound: [] };
    k[q.enemyId] = { ...b, seen: !0, defeated: b.defeated || q.isDown };
  }
  if (o)
    for (const q of i.drops) {
      const b = k[q.enemyId];
      b &&
        !b.dropsFound.includes(q.itemId) &&
        (k[q.enemyId] = { ...b, dropsFound: [...b.dropsFound, q.itemId] });
    }
  const p = { ...l.bestiary, monsters: k };
  if (o) {
    const { exp: q, gold: b } = Ah(i);
    h += b;
    const L = new Set(d.map((T) => T.charId)),
      C = L.size > 0 ? Math.floor(q / L.size) : 0;
    _ = _.map((T) => (L.has(T.id) ? s1(T, C) : T));
  }
  const v = i.summons
    .filter((q) => {
      var b;
      return (
        !q.isDown &&
        q.summonKind &&
        ((b = Bn[q.summonKind]) == null ? void 0 : b.persistsAfterBattle)
      );
    })
    .map((q) => ({ summonKind: q.summonKind, ownerId: q.ownerId ?? '', hp: q.hp }));
  let y = {
    ...l,
    guild: { ...l.guild, members: _, gold: h, bestiary: p },
    bestiary: p,
    diveState: { ...l.diveState, party: d, persistentSummons: v },
  };
  for (const q of i.consumedItems) y = Yc(y, q, 1);
  const S = fh(i.depth);
  if (o) for (const q of i.drops) y = $c(y, q.itemId, 1, S);
  return y;
}
const r1 = 8,
  Tc = 16,
  qi = 5;
function Jc(l) {
  return l.range(r1, Tc);
}
function o1(l, i) {
  const o = l - 1;
  return o <= 0
    ? { stepsUntilEncounter: Jc(i), triggered: !0 }
    : { stepsUntilEncounter: o, triggered: !1 };
}
function u1(l) {
  const i = Math.max(0, Tc - l),
    o = Math.round((i / Tc) * qi);
  return Math.min(qi, Math.max(0, o));
}
const Ft = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  An = ['N', 'E', 'S', 'W'];
function Lh(l) {
  return An[(An.indexOf(l) + 1) % 4];
}
function jh(l) {
  return An[(An.indexOf(l) + 3) % 4];
}
function c1(l) {
  return An[(An.indexOf(l) + 2) % 4];
}
const Mh = (l, i, o) => l >= 0 && i >= 0 && l < o.width && i < o.height;
function Ba(l, i, o, r) {
  if (l.cells[o][i].walls[r]) return !1;
  const c = i + Ft[r].dx,
    d = o + Ft[r].dy;
  return Mh(c, d, l) ? l.cells[d][c].passable : !1;
}
function d1(l, i, o) {
  return Ba(l, i.x, i.y, o) ? { x: i.x + Ft[o].dx, y: i.y + Ft[o].dy } : null;
}
function Pc(l, i, o) {
  return ['N', 'E', 'S', 'W'].filter((r) => !l.cells[o][i].walls[r]);
}
function m1(l, i, o) {
  if (i.x === o.x && i.y === o.y) return [];
  if (!Mh(o.x, o.y, l) || !l.cells[o.y][o.x].passable) return null;
  const r = (_, h) => `${_},${h}`,
    c = new Map();
  c.set(r(i.x, i.y), null);
  const d = [{ ...i }];
  for (; d.length > 0; ) {
    const _ = d.shift();
    for (const h of ['N', 'E', 'S', 'W']) {
      if (!Ba(l, _.x, _.y, h)) continue;
      const k = _.x + Ft[h].dx,
        p = _.y + Ft[h].dy,
        v = r(k, p);
      if (!c.has(v)) {
        if ((c.set(v, { x: _.x, y: _.y, dir: h }), k === o.x && p === o.y)) {
          const y = [];
          let S = v;
          for (;;) {
            const q = c.get(S);
            if (!q) break;
            (y.unshift(q.dir), (S = r(q.x, q.y)));
          }
          return y;
        }
        d.push({ x: k, y: p });
      }
    }
  }
  return null;
}
const Tp = ['N', 'E', 'S', 'W'],
  cc = (l, i) => Math.abs(l.x - i.x) + Math.abs(l.y - i.y);
function _1(l, i, o, r, c) {
  const d = i.map((v) => ({ ...v, cell: { ...v.cell } })),
    _ = new Map(l.foeSpawns.map((v) => [v.id, v])),
    h = new Set(d.filter((v) => !v.defeated).map((v) => `${v.cell.x},${v.cell.y}`));
  let k = null;
  const p = [...d].sort((v, y) => v.spawnId.localeCompare(y.spawnId, void 0, { numeric: !0 }));
  for (const v of p) {
    if (k) break;
    if (v.defeated) continue;
    const y = _.get(v.spawnId);
    if (!y) continue;
    !v.alerted && cc(v.cell, o) <= y.sightRange && (v.alerted = !0);
    const S = (q) => {
      if (!Ba(l, v.cell.x, v.cell.y, q)) return 'blocked';
      const b = v.cell.x + Ft[q].dx,
        L = v.cell.y + Ft[q].dy;
      if (b === o.x && L === o.y) {
        const C = q === r;
        return (
          (k = { spawnId: v.spawnId, enemyId: y.enemyId, firstStrike: C ? 'ambush' : 'none' }),
          'contact'
        );
      }
      return h.has(`${b},${L}`)
        ? 'blocked'
        : (h.delete(`${v.cell.x},${v.cell.y}`),
          (v.cell = { x: b, y: L }),
          h.add(`${b},${L}`),
          'moved');
    };
    if (v.alerted)
      for (let q = 0; q < y.moveSpeed; q++) {
        let b = null,
          L = cc(v.cell, o),
          C = !1;
        for (const A of Tp) {
          const M = v.cell.x + Ft[A].dx,
            P = v.cell.y + Ft[A].dy;
          if (M === o.x && P === o.y && Ba(l, v.cell.x, v.cell.y, A)) {
            ((b = A), (C = !0));
            break;
          }
          if (!Ba(l, v.cell.x, v.cell.y, A) || h.has(`${M},${P}`)) continue;
          const J = cc({ x: M, y: P }, o);
          J < L && ((L = J), (b = A));
        }
        if (!b) break;
        const T = S(b);
        if (T === 'contact' || T === 'blocked' || C) break;
      }
    else {
      const q = y.patrol;
      if (q.kind === 'wander') {
        const b = Tp.filter(
          (L) =>
            Ba(l, v.cell.x, v.cell.y, L) && !h.has(`${v.cell.x + Ft[L].dx},${v.cell.y + Ft[L].dy}`)
        );
        b.length > 0 && S(c.pick(b));
      } else q.kind === 'charge' && S(q.dir);
    }
  }
  return { foes: d, contact: k };
}
const Oa = {
    mining: {
      type: 'mining',
      name: '採掘',
      requiredSkillId: 'skill_mining',
      food: !1,
      drops: [{ itemId: 'item_ore', weight: 3 }],
    },
    gathering: {
      type: 'gathering',
      name: '採取',
      requiredSkillId: 'skill_gathering',
      food: !1,
      drops: [{ itemId: 'item_medic_herb', weight: 3 }],
    },
    logging: {
      type: 'logging',
      name: '伐採',
      requiredSkillId: 'skill_logging',
      food: !1,
      drops: [{ itemId: 'item_lumber', weight: 3 }],
    },
    fishing: {
      type: 'fishing',
      name: '釣り',
      requiredSkillId: 'skill_fishing',
      food: !0,
      drops: [{ itemId: 'item_food_fish', weight: 3 }],
    },
    harvest: {
      type: 'harvest',
      name: '収穫',
      requiredSkillId: 'skill_harvest',
      food: !0,
      drops: [{ itemId: 'item_food_nuts', weight: 3 }],
    },
    hunting: {
      type: 'hunting',
      name: '狩猟',
      requiredSkillId: 'skill_hunting',
      food: !0,
      drops: [{ itemId: 'item_food_meat', weight: 3 }],
    },
  },
  f1 = Object.keys(Oa);
function p1(l) {
  const i = Object.values(ol)
    .filter((o) => o.tierBand === l && o.kind === 'foe')
    .map((o) => o.id);
  return i.length > 0
    ? i
    : Object.values(ol)
        .filter((o) => o.tierBand === l && !o.isBoss && o.kind !== 'foe')
        .map((o) => o.id);
}
function h1(l) {
  const i = Object.values(ol).filter((r) => r.isBoss);
  if (i.length === 0) return null;
  const o = i.filter((r) => r.tierBand === l);
  return o.length > 0 ? o[0].id : i.sort((r, c) => c.tierBand - r.tierBand)[0].id;
}
function g1(l, i, o, r, c) {
  for (const d of ['N', 'E', 'S', 'W']) {
    if (l[o][i].walls[d]) continue;
    const _ = i + nl[d].dx,
      h = o + nl[d].dy;
    if (yr(_, h, r, c) && !l[h][_].event) return { x: _, y: h };
  }
  return null;
}
const nl = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  k1 = { N: 'S', E: 'W', S: 'N', W: 'E' };
function v1(l) {
  return Math.min(25, 15 + Math.floor(l / 5));
}
function y1() {
  return { walls: { N: !0, E: !0, S: !0, W: !0 }, floorType: 'normal', passable: !0 };
}
const yr = (l, i, o, r) => l >= 0 && i >= 0 && l < o && i < r;
function Ep(l, i, o, r) {
  const { dx: c, dy: d } = nl[r];
  ((l[o][i].walls[r] = !1), (l[o + d][i + c].walls[k1[r]] = !1));
}
function b1(l, i, o) {
  const r = l.length,
    c = l[0].length,
    d = Array.from({ length: r }, () => Array(c).fill(-1)),
    _ = [{ x: i, y: o }];
  d[o][i] = 0;
  for (let h = 0; h < _.length; h++) {
    const { x: k, y: p } = _[h];
    for (const v of ['N', 'E', 'S', 'W']) {
      if (l[p][k].walls[v]) continue;
      const y = k + nl[v].dx,
        S = p + nl[v].dy;
      !yr(y, S, c, r) || d[S][y] !== -1 || ((d[S][y] = d[p][k] + 1), _.push({ x: y, y: S }));
    }
  }
  return d;
}
function x1(l, i) {
  const o = v1(l),
    r = o,
    c = o,
    d = Array.from({ length: c }, () => Array.from({ length: r }, () => y1())),
    _ = Array.from({ length: c }, () => Array(r).fill(!1)),
    h = i.int(r),
    k = i.int(c),
    p = [{ x: h, y: k }];
  for (_[k][h] = !0; p.length > 0; ) {
    const V = p[p.length - 1],
      H = [];
    for (const oe of ['N', 'E', 'S', 'W']) {
      const fe = V.x + nl[oe].dx,
        ke = V.y + nl[oe].dy;
      yr(fe, ke, r, c) && !_[ke][fe] && H.push(oe);
    }
    if (H.length === 0) {
      p.pop();
      continue;
    }
    const W = i.pick(H);
    Ep(d, V.x, V.y, W);
    const ne = V.x + nl[W].dx,
      te = V.y + nl[W].dy;
    ((_[te][ne] = !0), p.push({ x: ne, y: te }));
  }
  const v = Math.floor((r * c) / 25);
  for (let V = 0; V < v; V++) {
    const H = i.int(r),
      W = i.int(c),
      ne = i.pick(['N', 'E', 'S', 'W']),
      te = H + nl[ne].dx,
      oe = W + nl[ne].dy;
    yr(te, oe, r, c) && d[W][H].walls[ne] && Ep(d, H, W, ne);
  }
  const y = i.int(r),
    S = i.int(c),
    q = b1(d, y, S);
  let b = y,
    L = S,
    C = -1;
  for (let V = 0; V < c; V++)
    for (let H = 0; H < r; H++) q[V][H] > C && ((C = q[V][H]), (b = H), (L = V));
  ((d[S][y].event = { kind: 'stairsDown' }), (d[L][b].event = { kind: 'stairsUp' }));
  const T = _h(l),
    A = [];
  if (Bi(l)) {
    const V = h1(T);
    if (V) {
      const H = g1(d, b, L, r, c) ?? { x: b, y: L };
      A.push({
        id: 'boss',
        enemyId: V,
        startCell: H,
        patrol: { kind: 'static' },
        moveSpeed: 0,
        sightRange: 0,
        respawn: !1,
        isBoss: !0,
      });
    }
  } else {
    const V = p1(T),
      H = 1 + Math.floor(l / 8);
    for (let W = 0; W < H && V.length > 0; W++) {
      let ne = i.int(r),
        te = i.int(c);
      for (let oe = 0; oe < 20; oe++) {
        ((ne = i.int(r)), (te = i.int(c)));
        const fe = d[te][ne].event,
          ke = Math.abs(ne - y) + Math.abs(te - S) >= 3;
        if (!fe && ke) break;
      }
      A.push({
        id: `foe_${W}`,
        enemyId: i.pick(V),
        startCell: { x: ne, y: te },
        patrol: { kind: 'wander' },
        moveSpeed: 1,
        sightRange: 3,
        respawn: !1,
      });
    }
  }
  const M = [],
    P = () => {
      for (let V = 0; V < 25; V++) {
        const H = i.int(r),
          W = i.int(c),
          ne = Math.abs(H - y) + Math.abs(W - S) >= 2;
        if (!d[W][H].event && ne) return { x: H, y: W };
      }
      return null;
    },
    J = 2 + Math.floor(l / 10);
  for (let V = 0; V < J; V++) {
    const H = P();
    if (!H) break;
    const W = i.pick(f1),
      ne = `gather_${V}`;
    ((d[H.y][H.x].event = { kind: 'gather', gatherId: ne }), M.push({ id: ne, cell: H, type: W }));
  }
  if (!Bi(l)) {
    const V = P();
    V && (d[V.y][V.x].event = { kind: 'cookingSpot', spotId: 'cook_0' });
  }
  return {
    depth: l,
    width: r,
    height: c,
    cells: d,
    encounterTable: `band_${T}`,
    foeSpawns: A,
    gatheringPoints: M,
    bgmId: Bi(l) ? 'bgm_boss' : 'bgm_dungeon',
  };
}
function Bh(l, i) {
  var o;
  for (let r = 0; r < l.height; r++)
    for (let c = 0; c < l.width; c++)
      if (((o = l.cells[r][c].event) == null ? void 0 : o.kind) === i) return { x: c, y: r };
  return null;
}
const S1 = 4294967296;
function w1(l, i) {
  let o = 3735928559 ^ l,
    r = 1103547991 ^ l;
  for (let c = 0; c < i.length; c++) {
    const d = i.charCodeAt(c);
    ((o = Math.imul(o ^ d, 2654435761)), (r = Math.imul(r ^ d, 1597334677)));
  }
  return (
    (o = Math.imul(o ^ (o >>> 16), 2246822507) ^ Math.imul(r ^ (r >>> 13), 3266489909)),
    (r = Math.imul(r ^ (r >>> 16), 2246822507) ^ Math.imul(o ^ (o >>> 13), 3266489909)),
    (r >>> 0) ^ (o >>> 0)
  );
}
class Wc {
  constructor(i, o) {
    Ju(this, 'baseSeed');
    Ju(this, '_state');
    ((this._state = i >>> 0), (this.baseSeed = (o ?? i) >>> 0));
  }
  get state() {
    return this._state;
  }
  next() {
    this._state = (this._state + 1831565813) >>> 0;
    let i = this._state;
    return (
      (i = Math.imul(i ^ (i >>> 15), i | 1)),
      (i ^= i + Math.imul(i ^ (i >>> 7), i | 61)),
      ((i ^ (i >>> 14)) >>> 0) / S1
    );
  }
  int(i) {
    return i <= 0 ? 0 : Math.floor(this.next() * i);
  }
  range(i, o) {
    o < i && ([i, o] = [o, i]);
    const r = o - i + 1;
    return i + this.int(r);
  }
  pick(i) {
    if (i.length === 0) throw new Error('Rng.pick: 空配列は選択できません');
    return i[this.int(i.length)];
  }
  fork(i) {
    const o = w1(this.baseSeed, i);
    return new Wc(o, o);
  }
}
function fa(l) {
  return new Wc(l, l);
}
function T1() {
  return Math.floor(Math.random() * 4294967296) >>> 0;
}
const br = (l, i) => `${l},${i}`;
function E1(l, i) {
  return fa(l).fork(`floor:${i}`);
}
function qh(l, i) {
  const o = l.towerState.floors[i];
  if (o) return { save: l, floor: o };
  const r = x1(i, E1(l.masterSeed, i)),
    c = r.foeSpawns.map((h) => ({
      spawnId: h.id,
      cell: { ...h.startCell },
      defeated: !1,
      alerted: !1,
    })),
    d = {
      depth: i,
      seed: l.masterSeed,
      generated: r,
      isBossFloor: Bi(i),
      encounterTier: Math.floor((i - 1) / 10),
      foeRuntime: c,
      openedChests: [],
      depletedGathers: [],
      consumedEvents: [],
    };
  return {
    save: { ...l, towerState: { ...l.towerState, floors: { ...l.towerState.floors, [i]: d } } },
    floor: d,
  };
}
function C1(l) {
  const i = [...l.guild.party.front, ...l.guild.party.back].filter((r) => r !== null),
    o = [];
  for (const r of i) {
    const c = l.guild.members.find((_) => _.id === r);
    if (!c) continue;
    const d = qa(c);
    o.push({ charId: r, hp: d.hp, tp: d.tp, unionGauge: 0, ailments: [] });
  }
  return o;
}
function xr(l, i, o, r) {
  const c = l.towerState.floors[i].generated,
    d = new Set(l.exploredCells[i] ?? []);
  d.add(br(o, r));
  for (const _ of Pc(c, o, r)) {
    const h = o + (_ === 'E' ? 1 : _ === 'W' ? -1 : 0),
      k = r + (_ === 'S' ? 1 : _ === 'N' ? -1 : 0);
    d.add(br(h, k));
  }
  return { ...l, exploredCells: { ...l.exploredCells, [i]: [...d] } };
}
function Oh(l, i, o) {
  var k, p;
  const r = qh(l, i);
  let c = r.save;
  const d = r.floor.generated,
    _ = Bh(d, 'stairsDown') ?? { x: 0, y: 0 },
    h = Pc(d, _.x, _.y)[0] ?? 'N';
  return (
    i > c.towerState.record.deepestReached &&
      (c = {
        ...c,
        towerState: { ...c.towerState, record: { ...c.towerState.record, deepestReached: i } },
      }),
    (c = {
      ...c,
      diveState: {
        depth: i,
        pos: { x: _.x, y: _.y },
        dir: h,
        party: ((k = c.diveState) == null ? void 0 : k.party) ?? C1(c),
        persistentSummons: ((p = c.diveState) == null ? void 0 : p.persistentSummons) ?? [],
        encounter: { stepsUntilEncounter: Jc(o) },
        pendingFoeBattle: null,
      },
    }),
    xr(c, i, _.x, _.y)
  );
}
function Cp(l, i = 1) {
  const o = fa(l.masterSeed).fork(`dive:${l.towerState.record.totalDives}`),
    r = {
      ...l,
      diveState: null,
      towerState: {
        ...l.towerState,
        record: { ...l.towerState.record, totalDives: l.towerState.record.totalDives + 1 },
      },
    };
  return Oh(r, i, o);
}
function Ih(l, i) {
  return l.diveState ? { ...l, diveState: { ...l.diveState, dir: i } } : l;
}
function Dh(l, i, o) {
  const r = l.towerState.floors[i];
  return {
    ...l,
    towerState: {
      ...l.towerState,
      floors: { ...l.towerState.floors, [i]: { ...r, foeRuntime: o } },
    },
  };
}
function Np(l, i, o) {
  const r = l.diveState;
  if (!r) return { save: l, moved: !1, triggered: !1 };
  const c = l.towerState.floors[r.depth],
    d = c.generated,
    _ = d1(d, r.pos, i);
  if (!_) return { save: Ih(l, i), moved: !1, triggered: !1 };
  const h = c.foeRuntime.find((y) => !y.defeated && y.cell.x === _.x && y.cell.y === _.y);
  if (h) {
    const y = d.foeSpawns.find((b) => b.id === h.spawnId),
      S = y
        ? {
            spawnId: h.spawnId,
            enemyId: y.enemyId,
            firstStrike: y.isBoss ? 'none' : 'preemptive',
            isBoss: y.isBoss,
          }
        : null;
    let q = { ...l, diveState: { ...r, pos: _, dir: i, pendingFoeBattle: S } };
    return ((q = xr(q, r.depth, _.x, _.y)), { save: q, moved: !0, triggered: S !== null });
  }
  const k = o1(r.encounter.stepsUntilEncounter, o);
  let p = {
    ...l,
    diveState: {
      ...r,
      pos: _,
      dir: i,
      encounter: { stepsUntilEncounter: k.stepsUntilEncounter },
      pendingFoeBattle: null,
    },
  };
  p = xr(p, r.depth, _.x, _.y);
  const v = _1(d, c.foeRuntime, _, i, o);
  return (
    (p = Dh(p, r.depth, v.foes)),
    v.contact
      ? ((p = {
          ...p,
          diveState: {
            ...p.diveState,
            pendingFoeBattle: {
              spawnId: v.contact.spawnId,
              enemyId: v.contact.enemyId,
              firstStrike: v.contact.firstStrike,
            },
          },
        }),
        { save: p, moved: !0, triggered: !0 })
      : { save: p, moved: !0, triggered: k.triggered }
  );
}
function N1(l, i) {
  const o = l.diveState;
  if (!o) return l;
  const r = o.pendingFoeBattle;
  let c = { ...l, diveState: { ...o, pendingFoeBattle: null } };
  if (r && i) {
    const _ = c.towerState.floors[o.depth].foeRuntime.map((h) =>
      h.spawnId === r.spawnId ? { ...h, defeated: !0 } : h
    );
    ((c = Dh(c, o.depth, _)), r.isBoss && (c = A1(c, o.depth)));
  }
  return c;
}
function A1(l, i, o = Date.now()) {
  const r = l.towerState,
    c = { ...r.bossGates, [i]: { depth: i, defeated: !0 } },
    d = r.warp.unlockedCheckpoints.includes(i)
      ? r.warp.unlockedCheckpoints
      : [...r.warp.unlockedCheckpoints, i].sort((k, p) => k - p),
    _ = r.record.bossDefeatLog.some((k) => k.depth === i),
    h = {
      ...r.record,
      highestBossDefeated: Math.max(r.record.highestBossDefeated, i),
      bossDefeatLog: _ ? r.record.bossDefeatLog : [...r.record.bossDefeatLog, { depth: i, at: o }],
    };
  return {
    ...l,
    towerState: { ...r, bossGates: c, warp: { ...r.warp, unlockedCheckpoints: d }, record: h },
  };
}
function Rh(l, i) {
  var o;
  return Bi(i) ? ((o = l.towerState.bossGates[i]) == null ? void 0 : o.defeated) === !0 : !0;
}
function Ap(l) {
  const i = l.diveState;
  if (!i) return null;
  const o = l.towerState.floors[i.depth].generated.cells[i.pos.y][i.pos.x].event;
  return (o == null ? void 0 : o.kind) === 'stairsUp' ||
    (o == null ? void 0 : o.kind) === 'stairsDown'
    ? o.kind
    : null;
}
function L1(l) {
  if (!l.diveState || !Rh(l, l.diveState.depth)) return l;
  const i = l.diveState.depth + 1,
    o = fa(l.masterSeed).fork(`enc:${i}:${l.towerState.record.totalDives}`);
  return Oh(l, i, o);
}
function j1(l) {
  if (!l.diveState) return l;
  const i = l.diveState.depth;
  if (i <= 1) return Ii(l);
  const o = i - 1,
    r = qh(l, o),
    c = Bh(r.floor.generated, 'stairsUp') ?? { x: 0, y: 0 },
    d = fa(l.masterSeed).fork(`enc:${o}:${l.towerState.record.totalDives}`);
  let _ = r.save;
  const h = r.floor.generated,
    k = Pc(h, c.x, c.y)[0] ?? 'N';
  return (
    (_ = {
      ..._,
      diveState: {
        ..._.diveState,
        depth: o,
        pos: { x: c.x, y: c.y },
        dir: k,
        encounter: { stepsUntilEncounter: Jc(d) },
        pendingFoeBattle: null,
      },
    }),
    xr(_, o, c.x, c.y)
  );
}
function Ii(l) {
  return { ...l, diveState: null };
}
const qn = {
  recipe_grilled_fish: {
    id: 'recipe_grilled_fish',
    name: '焼き魚',
    ingredients: [{ itemId: 'item_food_fish', qty: 2 }],
    result: { itemId: 'item_dish_grilled_fish', count: 1 },
    unlockedByDefault: !0,
  },
  recipe_grilled_meat: {
    id: 'recipe_grilled_meat',
    name: '焼き肉',
    ingredients: [{ itemId: 'item_food_meat', qty: 2 }],
    result: { itemId: 'item_dish_grilled_meat', count: 1 },
    unlockedByDefault: !0,
  },
  recipe_nut_platter: {
    id: 'recipe_nut_platter',
    name: '木の実の盛り合わせ',
    ingredients: [{ itemId: 'item_food_nuts', qty: 3 }],
    result: { itemId: 'item_dish_nut_platter', count: 1 },
    unlockedByDefault: !1,
  },
};
function M1() {
  return Object.values(qn)
    .filter((l) => l.unlockedByDefault)
    .map((l) => l.id);
}
const _r = 2,
  B1 = { autoMap: 'on', bgmVolume: 0.6, seVolume: 0.6 };
function Lp() {
  return { monsters: {}, items: {} };
}
function q1() {
  return { deepestReached: 0, highestBossDefeated: 0, totalDives: 0, bossDefeatLog: [] };
}
const O1 = () => ({ weapon: null, armor: null, accessory: null });
function I1() {
  return `char_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function zh(l) {
  var h;
  const { raceId: i, classId: o, name: r, id: c } = l;
  if (!bt[i]) throw new Error(`createCharacter: 未定義の種族 "${i}"`);
  if (!at[o]) throw new Error(`createCharacter: 未定義の職業 "${o}"`);
  const d = (h = at[o].skillTree.skills[0]) == null ? void 0 : h.skillId,
    _ = d ? { [d]: 1 } : {};
  return {
    id: c ?? I1(),
    name: r,
    raceId: i,
    classId: o,
    titleId: null,
    level: 1,
    exp: 0,
    skillPoints: { total: 0, spent: 0 },
    learnedSkills: _,
    equipment: O1(),
  };
}
function D1() {
  return { front: Array(Cr).fill(null), back: Array(Nr).fill(null) };
}
function R1(l, i) {
  const o = l.front.indexOf(null);
  if (o !== -1) {
    const c = [...l.front];
    return ((c[o] = i), { ...l, front: c });
  }
  const r = l.back.indexOf(null);
  if (r !== -1) {
    const c = [...l.back];
    return ((c[r] = i), { ...l, back: c });
  }
  return l;
}
function z1(l, i) {
  return l.guild.members.length >= bc
    ? l
    : {
        ...l,
        guild: { ...l.guild, members: [...l.guild.members, i], party: R1(l.guild.party, i.id) },
      };
}
function H1(l) {
  return {
    schemaVersion: _r,
    savedAt: 0,
    masterSeed: T1(),
    settings: { ...B1 },
    guild: {
      name: l,
      gold: yb,
      members: [],
      party: D1(),
      storage: [],
      equipment: [],
      foodStorage: [],
      bestiary: Lp(),
    },
    towerState: { floors: {}, bossGates: {}, warp: { unlockedCheckpoints: [] }, record: q1() },
    diveState: null,
    bestiary: Lp(),
    playerMaps: {},
    exploredCells: {},
    forgeInventory: { fragments: {}, ingots: { copper: 0, silver: 0, gold: 0 } },
    shopStock: { unlockedTier: 0, unlockedItemIds: [] },
    unlockedRecipeIds: M1(),
    flags: {},
  };
}
const Ec = (l, i) => i.some((o) => l instanceof o);
let jp, Mp;
function U1() {
  return jp || (jp = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function G1() {
  return (
    Mp ||
    (Mp = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const Cc = new WeakMap(),
  dc = new WeakMap(),
  jr = new WeakMap();
function $1(l) {
  const i = new Promise((o, r) => {
    const c = () => {
        (l.removeEventListener('success', d), l.removeEventListener('error', _));
      },
      d = () => {
        (o(Ia(l.result)), c());
      },
      _ = () => {
        (r(l.error), c());
      };
    (l.addEventListener('success', d), l.addEventListener('error', _));
  });
  return (jr.set(i, l), i);
}
function Y1(l) {
  if (Cc.has(l)) return;
  const i = new Promise((o, r) => {
    const c = () => {
        (l.removeEventListener('complete', d),
          l.removeEventListener('error', _),
          l.removeEventListener('abort', _));
      },
      d = () => {
        (o(), c());
      },
      _ = () => {
        (r(l.error || new DOMException('AbortError', 'AbortError')), c());
      };
    (l.addEventListener('complete', d),
      l.addEventListener('error', _),
      l.addEventListener('abort', _));
  });
  Cc.set(l, i);
}
let Nc = {
  get(l, i, o) {
    if (l instanceof IDBTransaction) {
      if (i === 'done') return Cc.get(l);
      if (i === 'store')
        return o.objectStoreNames[1] ? void 0 : o.objectStore(o.objectStoreNames[0]);
    }
    return Ia(l[i]);
  },
  set(l, i, o) {
    return ((l[i] = o), !0);
  },
  has(l, i) {
    return l instanceof IDBTransaction && (i === 'done' || i === 'store') ? !0 : i in l;
  },
};
function Hh(l) {
  Nc = l(Nc);
}
function X1(l) {
  return G1().includes(l)
    ? function (...i) {
        return (l.apply(Ac(this), i), Ia(this.request));
      }
    : function (...i) {
        return Ia(l.apply(Ac(this), i));
      };
}
function V1(l) {
  return typeof l == 'function'
    ? X1(l)
    : (l instanceof IDBTransaction && Y1(l), Ec(l, U1()) ? new Proxy(l, Nc) : l);
}
function Ia(l) {
  if (l instanceof IDBRequest) return $1(l);
  if (dc.has(l)) return dc.get(l);
  const i = V1(l);
  return (i !== l && (dc.set(l, i), jr.set(i, l)), i);
}
const Ac = (l) => jr.get(l);
function Q1(l, i, { blocked: o, upgrade: r, blocking: c, terminated: d } = {}) {
  const _ = indexedDB.open(l, i),
    h = Ia(_);
  return (
    r &&
      _.addEventListener('upgradeneeded', (k) => {
        r(Ia(_.result), k.oldVersion, k.newVersion, Ia(_.transaction), k);
      }),
    o && _.addEventListener('blocked', (k) => o(k.oldVersion, k.newVersion, k)),
    h
      .then((k) => {
        (d && k.addEventListener('close', () => d()),
          c && k.addEventListener('versionchange', (p) => c(p.oldVersion, p.newVersion, p)));
      })
      .catch(() => {}),
    h
  );
}
const K1 = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  Z1 = ['put', 'add', 'delete', 'clear'],
  mc = new Map();
function Bp(l, i) {
  if (!(l instanceof IDBDatabase && !(i in l) && typeof i == 'string')) return;
  if (mc.get(i)) return mc.get(i);
  const o = i.replace(/FromIndex$/, ''),
    r = i !== o,
    c = Z1.includes(o);
  if (!(o in (r ? IDBIndex : IDBObjectStore).prototype) || !(c || K1.includes(o))) return;
  const d = async function (_, ...h) {
    const k = this.transaction(_, c ? 'readwrite' : 'readonly');
    let p = k.store;
    return (r && (p = p.index(h.shift())), (await Promise.all([p[o](...h), c && k.done]))[0]);
  };
  return (mc.set(i, d), d);
}
Hh((l) => ({
  ...l,
  get: (i, o, r) => Bp(i, o) || l.get(i, o, r),
  has: (i, o) => !!Bp(i, o) || l.has(i, o),
}));
const J1 = ['continue', 'continuePrimaryKey', 'advance'],
  qp = {},
  Lc = new WeakMap(),
  Uh = new WeakMap(),
  P1 = {
    get(l, i) {
      if (!J1.includes(i)) return l[i];
      let o = qp[i];
      return (
        o ||
          (o = qp[i] =
            function (...r) {
              Lc.set(this, Uh.get(this)[i](...r));
            }),
        o
      );
    },
  };
async function* W1(...l) {
  let i = this;
  if ((i instanceof IDBCursor || (i = await i.openCursor(...l)), !i)) return;
  i = i;
  const o = new Proxy(i, P1);
  for (Uh.set(o, i), jr.set(o, Ac(i)); i; )
    (yield o, (i = await (Lc.get(o) || i.continue())), Lc.delete(o));
}
function Op(l, i) {
  return (
    (i === Symbol.asyncIterator && Ec(l, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (i === 'iterate' && Ec(l, [IDBIndex, IDBObjectStore]))
  );
}
Hh((l) => ({
  ...l,
  get(i, o, r) {
    return Op(i, o) ? W1 : l.get(i, o, r);
  },
  has(i, o) {
    return Op(i, o) || l.has(i, o);
  },
}));
const F1 = { 1: (l) => ex(l) },
  _c = (l) => typeof l == 'object' && l !== null && !Array.isArray(l);
function ex(l) {
  const i = { ...l, schemaVersion: 2 };
  let o = 0;
  const r = (d) => ({ id: `eq_mig_${Date.now().toString(36)}_${o++}`, masterId: d, forgeLevel: 0 }),
    c = _c(i.guild) ? { ...i.guild } : {};
  return (
    Array.isArray(c.equipment) || (c.equipment = []),
    Array.isArray(c.foodStorage) || (c.foodStorage = []),
    Array.isArray(c.members) &&
      (c.members = c.members.map((d) => {
        if (!_c(d)) return d;
        const _ = _c(d.equipment) ? { ...d.equipment } : {};
        for (const h of ['weapon', 'armor', 'accessory']) {
          const k = _[h];
          _[h] = typeof k == 'string' ? r(k) : (k ?? null);
        }
        return { ...d, equipment: _ };
      })),
    (i.guild = c),
    Array.isArray(i.unlockedRecipeIds) || (i.unlockedRecipeIds = []),
    i
  );
}
function tx(l) {
  return structuredClone(l);
}
function Tn(l) {
  return typeof l == 'object' && l !== null && !Array.isArray(l);
}
function lx(l) {
  if (
    !Tn(l) ||
    typeof l.schemaVersion != 'number' ||
    typeof l.masterSeed != 'number' ||
    !Tn(l.guild)
  )
    return !1;
  const i = l.guild;
  return !(
    typeof i.name != 'string' ||
    !Array.isArray(i.members) ||
    !Array.isArray(i.equipment) ||
    !Tn(l.forgeInventory) ||
    !Tn(l.towerState) ||
    !Tn(l.towerState.record) ||
    typeof l.towerState.record.deepestReached != 'number'
  );
}
function Gh(l) {
  if (!Tn(l) || typeof l.schemaVersion != 'number')
    return { ok: !1, reason: 'セーブデータの構造が不正です' };
  let i = l.schemaVersion;
  if (i > _r) return { ok: !1, reason: `未知のバージョン (${i} > ${_r}) のセーブデータです` };
  let o = { ...l };
  for (; i < _r; ) {
    const r = F1[i];
    if (!r) return { ok: !1, reason: `バージョン ${i} の migration が未定義です` };
    ((o = r(o)), (i = typeof o.schemaVersion == 'number' ? o.schemaVersion : i + 1));
  }
  return lx(o)
    ? { ok: !0, data: o }
    : { ok: !1, reason: 'migration 後のデータが SaveData の形をしていません' };
}
function ax(l) {
  return {
    guildName: l.guild.name,
    deepestReached: l.towerState.record.deepestReached,
    memberCount: l.guild.members.length,
    savedAt: l.savedAt,
  };
}
function Ip() {
  return {
    guildName: '(破損データ)',
    deepestReached: 0,
    memberCount: 0,
    savedAt: 0,
    corrupted: !0,
  };
}
const nx = 'sekaiju-like-game',
  ix = 1,
  Di = 'saves',
  Fc = 'main';
let fc = null;
function ed() {
  return (
    fc ||
      (fc = Q1(nx, ix, {
        upgrade(l) {
          l.objectStoreNames.contains(Di) || l.createObjectStore(Di);
        },
      })),
    fc
  );
}
async function pc(l) {
  const i = { ...l, savedAt: Date.now() };
  return (await (await ed()).put(Di, tx(i), Fc), i);
}
async function sx() {
  const i = await (await ed()).get(Di, Fc);
  return i === void 0 ? { ok: !1, reason: 'empty' } : Gh(i);
}
async function rx() {
  const i = await (await ed()).get(Di, Fc);
  if (i === void 0) return null;
  const o = Gh(i);
  if (!o.ok) return Ip();
  try {
    return ax(o.data);
  } catch {
    return Ip();
  }
}
const $h = { save: null, saving: !1 };
function ox(l, i) {
  switch (i.type) {
    case 'load':
      return { ...l, save: i.save };
    case 'updateSave':
      return l.save ? { ...l, save: i.updater(l.save) } : l;
    case 'setSave':
      return { ...l, save: i.save };
    case 'saving':
      return { ...l, saving: i.saving };
    case 'clear':
      return { ...$h };
  }
}
const Yh = E.createContext(null);
function ux(l) {
  const i = E.useRef(l);
  return ((i.current = l), i);
}
function cx({ children: l }) {
  const [i, o] = E.useReducer(ox, $h),
    r = ux(i),
    c = E.useCallback(async (y) => {
      const S = H1(y),
        q = await pc(S);
      o({ type: 'load', save: q });
    }, []),
    d = E.useCallback(async () => {
      const y = await sx();
      return y.ok ? (o({ type: 'load', save: y.data }), { ok: !0 }) : { ok: !1, reason: y.reason };
    }, []),
    _ = E.useCallback((y) => {
      o({ type: 'updateSave', updater: y });
    }, []),
    h = E.useCallback(
      async (y) => {
        const S = r.current.save;
        if (!S) return;
        const q = y(S);
        (o({ type: 'setSave', save: q }), o({ type: 'saving', saving: !0 }));
        try {
          const b = await pc(q);
          o({ type: 'setSave', save: b });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      },
      [r]
    ),
    k = E.useCallback(async () => {
      const { save: y } = r.current;
      if (y) {
        o({ type: 'saving', saving: !0 });
        try {
          const S = await pc(y);
          o({ type: 'setSave', save: S });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      }
    }, [r]),
    p = E.useCallback(() => {
      o({ type: 'clear' });
    }, []),
    v = E.useMemo(
      () => ({
        ...i,
        startNewGame: c,
        continueGame: d,
        applySave: _,
        applyAndPersist: h,
        persist: k,
        exitToTitle: p,
      }),
      [i, c, d, _, h, k, p]
    );
  return f.jsx(Yh.Provider, { value: v, children: l });
}
function Ul() {
  const l = E.useContext(Yh);
  if (!l) throw new Error('useGameState は GameStateProvider の内側で使ってください');
  return l;
}
const dx = () => {
    var et, Ge;
    const l = cl(),
      { save: i, applyAndPersist: o } = Ul(),
      r = E.useRef(null),
      [c, d] = E.useState(null),
      [_, h] = E.useState({}),
      [k, p] = E.useState(null),
      [v, y] = E.useState(!1),
      [S, q] = E.useState(!1),
      [b, L] = E.useState(null),
      [C, T] = E.useState(!1),
      [A, M] = E.useState(null),
      [P, J] = E.useState(null);
    E.useEffect(() => {
      if (c || !(i != null && i.diveState)) return;
      const G = i.diveState.depth,
        de = (i.masterSeed ^ (G * 2654435761) ^ (i.towerState.record.totalDives * 40503)) >>> 0;
      r.current = fa(de);
      const pe = i.diveState.pendingFoeBattle;
      d(pe ? bp(i, [pe.enemyId], pe.firstStrike) : bp(i, jb(G, r.current)));
    }, [i, c]);
    const V = E.useRef(!1);
    E.useEffect(() => {
      !c ||
        !r.current ||
        V.current ||
        (c.turn === 1 &&
          c.firstStrike === 'ambush' &&
          c.outcome === 'ongoing' &&
          ((V.current = !0), d(uc(c, [], r.current))));
    }, [c]);
    const H = E.useMemo(() => (c == null ? void 0 : c.enemies.filter((G) => !G.isDown)) ?? [], [c]),
      W = E.useMemo(() => (c == null ? void 0 : c.allies.filter((G) => !G.isDown)) ?? [], [c]);
    (E.useEffect(() => {
      H.length > 0 && !H.some((G) => G.id === b) && L(H[0].id);
    }, [H, b]),
      E.useEffect(() => {
        if ((c == null ? void 0 : c.outcome) !== 'ongoing' || (k && W.some((de) => de.id === k)))
          return;
        const G = W.find((de) => !_[de.id]) ?? null;
        p(G ? G.id : null);
      }, [c, W, k, _]));
    const ne = W.length > 0 && W.every((G) => _[G.id] !== void 0),
      te = E.useCallback(
        (G, de) => {
          const pe = { ..._, [G]: de };
          (h(pe), y(!1), q(!1));
          const je = W.find((Te) => Te.id !== G && !pe[Te.id]);
          p(je ? je.id : null);
        },
        [_, W]
      ),
      oe = E.useCallback(
        async (G) => {
          T(!0);
          const de = G.outcome === 'win';
          G.outcome === 'lose'
            ? (await o((pe) => Ii(wp(pe, G))), l('/town'))
            : (await o((pe) => N1(wp(pe, G), de)), l('/dungeon'));
        },
        [o, l]
      ),
      fe = E.useCallback(() => {
        var G;
        (h({}), y(!1), q(!1), M(null), J(null), p(((G = W[0]) == null ? void 0 : G.id) ?? null));
      }, [W]),
      ke = E.useCallback(() => {
        var je;
        if (!c || !r.current || c.outcome !== 'ongoing') return;
        const G = b ?? ((je = H[0]) == null ? void 0 : je.id) ?? '',
          de = W.map((Te) => {
            const xt = _[Te.id] ?? { kind: 'attack' };
            return xt.kind === 'guard'
              ? { kind: 'guard', actorId: Te.id }
              : xt.kind === 'skill'
                ? { kind: 'skill', actorId: Te.id, skillId: xt.skillId, targetId: G }
                : xt.kind === 'item'
                  ? { kind: 'item', actorId: Te.id, itemId: xt.itemId, targetId: Te.id }
                  : { kind: 'attack', actorId: Te.id, targetId: G };
          });
        if (A) {
          const Te = En[A.unionSkillId],
            xt =
              (Te == null ? void 0 : Te.target) === 'enemyOne' ||
              (Te == null ? void 0 : Te.target) === 'enemyRow' ||
              (Te == null ? void 0 : Te.target) === 'enemyAll';
          de.unshift({ kind: 'union', ...A, targetId: xt ? G : A.targetId });
        }
        const pe = uc(c, de, r.current);
        (d(pe), h({}), y(!1), q(!1), M(null), J(null), p(null));
      }, [c, _, b, W, H, A]),
      xe = E.useCallback(() => {
        if (!c || !r.current || c.outcome !== 'ongoing') return;
        const G = W[0];
        G && (d(uc(c, [{ kind: 'flee', actorId: G.id }], r.current)), h({}), p(null));
      }, [c, W]);
    if (!i || !i.diveState) return f.jsx(rl, { to: '/town', replace: !0 });
    if (!c) return f.jsx('div', { className: ee.layout, children: '戦闘準備中...' });
    const he = (G) => {
        const de = i.guild.members.find((pe) => pe.id === G.id);
        return de
          ? Object.keys(de.learnedSkills).filter((pe) => pe in Il && G.tp >= Il[pe].tpCost(1))
          : [];
      },
      j = () => {
        const G = (pe) =>
            Object.values(_).filter((je) => je.kind === 'item' && je.itemId === pe).length,
          de = (pe) => c.consumedItems.filter((je) => je === pe).length;
        return i.guild.storage
          .filter((pe) => {
            var je, Te;
            return (Te = (je = Fe[pe.itemId]) == null ? void 0 : je.useContext) == null
              ? void 0
              : Te.includes('battle');
          })
          .map((pe) => ({
            id: pe.itemId,
            remaining: kh(i, pe.itemId) - de(pe.itemId) - G(pe.itemId),
          }))
          .filter((pe) => pe.remaining > 0);
      },
      Q = (G) => {
        var pe, je;
        const de = _[G.id];
        return de
          ? de.kind === 'attack'
            ? '攻撃'
            : de.kind === 'guard'
              ? '防御'
              : de.kind === 'item'
                ? (((pe = Fe[de.itemId]) == null ? void 0 : pe.name) ?? 'どうぐ')
                : (((je = Il[de.skillId]) == null ? void 0 : je.name) ?? 'スキル')
          : '';
      },
      U = (G) => {
        const de = (je) => je === 'headBind' || je === 'armBind' || je === 'legBind';
        let pe = '';
        return (
          G.ailments.some((je) => de(je.type)) && (pe += ' 🔒'),
          G.ailments.some((je) => !de(je.type)) && (pe += ' 🌀'),
          pe
        );
      },
      K = (G) => {
        var je;
        const de = i.guild.members.find((Te) => Te.id === G.id);
        if (!de) return null;
        const pe =
          (je = bt[de.raceId]) == null
            ? void 0
            : je.raceSkillTree.skills.find((Te) => Te.skillId in En);
        return !pe || !(pe.skillId in de.learnedSkills) ? null : (En[pe.skillId] ?? null);
      },
      ie = (G, de, pe) => {
        var xt;
        const Te =
          de.target === 'enemyOne' || de.target === 'enemyRow' || de.target === 'enemyAll'
            ? (b ?? ((xt = H[0]) == null ? void 0 : xt.id) ?? '')
            : G;
        (M({ actorId: G, unionSkillId: de.id, participantIds: pe, targetId: Te }), J(null));
      },
      w = (G, de) => {
        de.requiredParticipants <= 1 ? ie(G.id, de, [G.id]) : J({ actorId: G.id, def: de });
      },
      R = k ? W.find((G) => G.id === k) : void 0,
      Z = ((et = c.enemies.find((G) => G.id === b)) == null ? void 0 : et.name) ?? '-',
      F = Ah(c),
      le = (G) =>
        f.jsxs(
          'button',
          {
            type: 'button',
            className: [
              ee.card,
              G.isDown ? ee.down : '',
              k === G.id ? ee.cardActive : '',
              _[G.id] ? ee.cardDecided : '',
            ].join(' '),
            disabled: G.isDown || c.outcome !== 'ongoing',
            onClick: () => {
              (p(G.id), y(!1), q(!1));
            },
            children: [
              f.jsxs('div', {
                className: ee.cardName,
                children: [
                  G.name,
                  G.unionGauge >= 100 ? f.jsx('span', { className: ee.uni, children: '★' }) : null,
                  U(G),
                ],
              }),
              f.jsx(nr, { value: G.hp, max: G.maxHp, color: '#4caf50', showValue: !1 }),
              f.jsx(nr, { value: G.tp, max: G.maxTp, color: '#2196f3', showValue: !1 }),
              f.jsxs('div', {
                className: ee.cardNums,
                children: ['HP ', Math.max(0, G.hp), ' · TP ', G.tp],
              }),
              _[G.id] ? f.jsxs('div', { className: ee.cardCmd, children: ['▶ ', Q(G)] }) : null,
            ],
          },
          G.id
        ),
      ce = c.allies.filter((G) => G.row === 'front'),
      be = c.allies.filter((G) => G.row === 'back');
    return f.jsxs('div', {
      className: ee.layout,
      children: [
        f.jsx('div', {
          className: ee.enemies,
          children: c.enemies.map((G) =>
            f.jsxs(
              'button',
              {
                type: 'button',
                className: `${ee.enemy} ${G.isDown ? ee.down : ''} ${b === G.id ? ee.targeted : ''}`,
                disabled: G.isDown,
                onClick: () => L(G.id),
                children: [
                  f.jsxs('span', { className: ee.enemyName, children: [G.name, U(G)] }),
                  f.jsx(nr, { value: G.hp, max: G.maxHp, color: '#e57373', showValue: !1 }),
                ],
              },
              G.id
            )
          ),
        }),
        c.summons.length > 0
          ? f.jsx('div', {
              className: ee.summons,
              children: c.summons.map((G) =>
                f.jsxs(
                  'div',
                  {
                    className: `${ee.summon} ${G.isDown ? ee.down : ''}`,
                    children: [
                      f.jsxs('span', { className: ee.summonName, children: ['🐾 ', G.name] }),
                      f.jsx(nr, { value: G.hp, max: G.maxHp, color: '#8d6e63', showValue: !1 }),
                      f.jsxs('span', {
                        className: ee.summonHp,
                        children: ['HP ', Math.max(0, G.hp)],
                      }),
                    ],
                  },
                  G.id
                )
              ),
            })
          : null,
        f.jsxs('div', {
          className: ee.party,
          children: [
            f.jsx('div', { className: ee.rowTag, children: '前衛' }),
            f.jsx('div', { className: ee.cardRow, children: ce.map(le) }),
            f.jsx('div', { className: ee.rowTag, children: '後衛（近接ダメージ -30%）' }),
            f.jsx('div', {
              className: ee.cardRow,
              children:
                be.length > 0
                  ? be.map(le)
                  : f.jsx('div', { className: ee.empty, children: '（なし）' }),
            }),
          ],
        }),
        c.outcome !== 'ongoing'
          ? f.jsxs('div', {
              className: ee.result,
              children: [
                f.jsx('div', {
                  className: ee.resultTitle,
                  children:
                    c.outcome === 'win' ? '勝利！' : c.outcome === 'fled' ? '逃走した' : '全滅...',
                }),
                c.outcome === 'win'
                  ? f.jsxs('div', {
                      className: ee.resultBody,
                      children: ['経験値 ', F.exp, ' ／ ', F.gold, ' G を獲得'],
                    })
                  : c.outcome === 'lose'
                    ? f.jsx('div', { className: ee.resultBody, children: '拠点へ帰還する' })
                    : null,
                f.jsx('button', {
                  type: 'button',
                  className: ee.primary,
                  disabled: C,
                  onClick: () => void oe(c),
                  children: 'つづける',
                }),
              ],
            })
          : f.jsxs('div', {
              className: ee.command,
              children: [
                f.jsxs('div', {
                  className: ee.target,
                  children: ['対象: ', Z, '（敵をタップで変更）'],
                }),
                A
                  ? f.jsxs('div', {
                      className: ee.unionBanner,
                      children: [
                        '⚡ ユニオン予約: ',
                        (Ge = En[A.unionSkillId]) == null ? void 0 : Ge.name,
                        f.jsx('button', {
                          type: 'button',
                          className: ee.unionCancel,
                          onClick: () => M(null),
                          children: '取消',
                        }),
                      ],
                    })
                  : null,
                R
                  ? f.jsxs(f.Fragment, {
                      children: [
                        f.jsxs('div', { className: ee.cmdHead, children: [R.name, ' のコマンド'] }),
                        v
                          ? f.jsxs('div', {
                              className: ee.skillList,
                              children: [
                                he(R).map((G) => {
                                  var de;
                                  return f.jsxs(
                                    'button',
                                    {
                                      type: 'button',
                                      className: ee.skillBtn,
                                      onClick: () => te(R.id, { kind: 'skill', skillId: G }),
                                      children: [
                                        f.jsxs('span', {
                                          className: ee.skillTop,
                                          children: [
                                            f.jsx('span', {
                                              className: ee.skillName,
                                              children: Il[G].name,
                                            }),
                                            f.jsxs('span', {
                                              className: ee.tp,
                                              children: ['TP ', Il[G].tpCost(1)],
                                            }),
                                          ],
                                        }),
                                        f.jsx('span', {
                                          className: ee.skillDesc,
                                          children:
                                            ((de = ji[G]) == null ? void 0 : de.description) ?? '',
                                        }),
                                      ],
                                    },
                                    G
                                  );
                                }),
                                he(R).length === 0
                                  ? f.jsx('div', {
                                      className: ee.empty,
                                      children: '使えるスキルがない',
                                    })
                                  : null,
                                f.jsx('button', {
                                  type: 'button',
                                  className: ee.menuBack,
                                  onClick: () => y(!1),
                                  children: 'もどる',
                                }),
                              ],
                            })
                          : S
                            ? f.jsxs('div', {
                                className: ee.skillList,
                                children: [
                                  j().map(({ id: G, remaining: de }) =>
                                    f.jsxs(
                                      'button',
                                      {
                                        type: 'button',
                                        className: ee.skillBtn,
                                        onClick: () => te(R.id, { kind: 'item', itemId: G }),
                                        children: [
                                          f.jsx('span', {
                                            className: ee.skillTop,
                                            children: f.jsxs('span', {
                                              className: ee.skillName,
                                              children: [Fe[G].name, ' ×', de],
                                            }),
                                          }),
                                          f.jsx('span', {
                                            className: ee.skillDesc,
                                            children: Fe[G].description,
                                          }),
                                        ],
                                      },
                                      G
                                    )
                                  ),
                                  j().length === 0
                                    ? f.jsx('div', {
                                        className: ee.empty,
                                        children: '使える道具がない',
                                      })
                                    : null,
                                  f.jsx('button', {
                                    type: 'button',
                                    className: ee.menuBack,
                                    onClick: () => q(!1),
                                    children: 'もどる',
                                  }),
                                ],
                              })
                            : P
                              ? f.jsxs('div', {
                                  className: ee.skillList,
                                  children: [
                                    f.jsxs('div', {
                                      className: ee.unionHint,
                                      children: [
                                        P.def.name,
                                        '：協力者を選択（あと',
                                        P.def.requiredParticipants - 1,
                                        '人。各自ゲージ',
                                        P.def.gaugeCostPerParticipant,
                                        '消費）',
                                      ],
                                    }),
                                    W.filter((G) => G.id !== P.actorId).map((G) =>
                                      f.jsx(
                                        'button',
                                        {
                                          type: 'button',
                                          className: ee.skillBtn,
                                          onClick: () => ie(P.actorId, P.def, [P.actorId, G.id]),
                                          children: f.jsxs('span', {
                                            className: ee.skillTop,
                                            children: [
                                              f.jsx('span', {
                                                className: ee.skillName,
                                                children: G.name,
                                              }),
                                              f.jsxs('span', {
                                                className: ee.tp,
                                                children: ['ゲージ ', G.unionGauge],
                                              }),
                                            ],
                                          }),
                                        },
                                        G.id
                                      )
                                    ),
                                    W.filter((G) => G.id !== P.actorId).length === 0
                                      ? f.jsx('div', {
                                          className: ee.empty,
                                          children: '協力できる味方がいない',
                                        })
                                      : null,
                                    f.jsx('button', {
                                      type: 'button',
                                      className: ee.menuBack,
                                      onClick: () => J(null),
                                      children: 'もどる',
                                    }),
                                  ],
                                })
                              : f.jsxs('div', {
                                  className: ee.menu,
                                  children: [
                                    f.jsx('button', {
                                      type: 'button',
                                      className: ee.menuBtn,
                                      onClick: () => te(R.id, { kind: 'attack' }),
                                      children: '攻撃',
                                    }),
                                    f.jsx('button', {
                                      type: 'button',
                                      className: ee.menuBtn,
                                      onClick: () => te(R.id, { kind: 'guard' }),
                                      children: '防御',
                                    }),
                                    f.jsx('button', {
                                      type: 'button',
                                      className: ee.menuBtn,
                                      disabled: he(R).length === 0,
                                      onClick: () => y(!0),
                                      children: 'スキル',
                                    }),
                                    f.jsx('button', {
                                      type: 'button',
                                      className: ee.menuBtn,
                                      disabled: j().length === 0,
                                      onClick: () => q(!0),
                                      children: 'どうぐ',
                                    }),
                                    (() => {
                                      const G = K(R);
                                      return !G || R.unionGauge < 100 || A
                                        ? null
                                        : f.jsx('button', {
                                            type: 'button',
                                            className: `${ee.menuBtn} ${ee.unionBtn}`,
                                            onClick: () => w(R, G),
                                            children: '⚡ユニオン',
                                          });
                                    })(),
                                    f.jsx('button', {
                                      type: 'button',
                                      className: ee.menuBtn,
                                      onClick: xe,
                                      children: '逃走',
                                    }),
                                  ],
                                }),
                      ],
                    })
                  : f.jsxs('div', {
                      className: ee.execRow,
                      children: [
                        f.jsx('button', {
                          type: 'button',
                          className: ee.redo,
                          onClick: fe,
                          children: 'やり直す',
                        }),
                        f.jsx('button', {
                          type: 'button',
                          className: ee.primary,
                          disabled: !ne,
                          onClick: ke,
                          children: '実行',
                        }),
                      ],
                    }),
              ],
            }),
        f.jsx('div', {
          className: ee.log,
          children:
            c.log.length === 0
              ? f.jsxs('div', {
                  className: ee.logLine,
                  children: ['てきが あらわれた！（', c.turn, ' ターン目）'],
                })
              : c.log.map((G, de) => f.jsx('div', { className: ee.logLine, children: G.text }, de)),
        }),
      ],
    });
  },
  mx = '_layout_iunlg_1',
  _x = '_head_iunlg_11',
  fx = '_title_iunlg_15',
  px = '_tabs_iunlg_21',
  hx = '_tab_iunlg_21',
  gx = '_tabActive_iunlg_38',
  kx = '_records_iunlg_43',
  vx = '_statBig_iunlg_48',
  yx = '_statNum_iunlg_60',
  bx = '_statLabel_iunlg_67',
  xx = '_statList_iunlg_72',
  Sx = '_statRow_iunlg_76',
  wx = '_h2_iunlg_91',
  Tx = '_bossLog_iunlg_97',
  Ex = '_bossRow_iunlg_106',
  Cx = '_codex_iunlg_114',
  Nx = '_codexSummary_iunlg_121',
  Ax = '_list_iunlg_127',
  Lx = '_row_iunlg_133',
  jx = '_unseen_iunlg_140',
  Mx = '_info_iunlg_144',
  Bx = '_name_iunlg_150',
  qx = '_badge_iunlg_158',
  Ox = '_sub_iunlg_167',
  Ix = '_empty_iunlg_172',
  Dx = '_foot_iunlg_177',
  Rx = '_back_iunlg_181',
  Be = {
    layout: mx,
    head: _x,
    title: fx,
    tabs: px,
    tab: hx,
    tabActive: gx,
    records: kx,
    statBig: vx,
    statNum: yx,
    statLabel: bx,
    statList: xx,
    statRow: Sx,
    h2: wx,
    bossLog: Tx,
    bossRow: Ex,
    codex: Cx,
    codexSummary: Nx,
    list: Ax,
    row: Lx,
    unseen: jx,
    info: Mx,
    name: Bx,
    badge: qx,
    sub: Ox,
    empty: Ix,
    foot: Dx,
    back: Rx,
  };
function Xh(l) {
  const i = l.bestiary.monsters;
  return Object.values(ol)
    .slice()
    .sort((o, r) => o.tierBand - r.tierBand || o.id.localeCompare(r.id))
    .map((o) => {
      const r = i[o.id],
        c = new Set((r == null ? void 0 : r.dropsFound) ?? []);
      return {
        id: o.id,
        name: o.name,
        tierBand: o.tierBand,
        seen: (r == null ? void 0 : r.seen) ?? !1,
        defeated: (r == null ? void 0 : r.defeated) ?? !1,
        drops: (o.drops ?? []).map((d) => {
          var _;
          return {
            itemId: d.itemId,
            name: ((_ = Fe[d.itemId]) == null ? void 0 : _.name) ?? d.itemId,
            found: c.has(d.itemId),
          };
        }),
      };
    });
}
function zx(l) {
  const i = Xh(l),
    o = i.length,
    r = i.filter((v) => v.seen).length,
    c = i.filter((v) => v.defeated).length;
  let d = 0,
    _ = 0;
  for (const v of i) for (const y of v.drops) ((d += 1), y.found && (_ += 1));
  const h = o + d,
    k = c + _,
    p = h === 0 ? 0 : Math.round((k / h) * 100);
  return {
    monstersTotal: o,
    monstersSeen: r,
    monstersDefeated: c,
    dropsTotal: d,
    dropsFound: _,
    completionPct: p,
  };
}
const Hx = () => {
    const l = cl(),
      { save: i } = Ul(),
      [o, r] = E.useState('record');
    if (!i) return f.jsx(rl, { to: '/title', replace: !0 });
    const c = i.towerState.record,
      d = zx(i),
      _ = Xh(i);
    return f.jsxs('div', {
      className: Be.layout,
      children: [
        f.jsx('header', {
          className: Be.head,
          children: f.jsx('h1', { className: Be.title, children: '図鑑 / 記録' }),
        }),
        f.jsxs('div', {
          className: Be.tabs,
          children: [
            f.jsx('button', {
              type: 'button',
              className: `${Be.tab} ${o === 'record' ? Be.tabActive : ''}`,
              onClick: () => r('record'),
              children: '到達記録',
            }),
            f.jsx('button', {
              type: 'button',
              className: `${Be.tab} ${o === 'codex' ? Be.tabActive : ''}`,
              onClick: () => r('codex'),
              children: '図鑑',
            }),
          ],
        }),
        o === 'record'
          ? f.jsxs('div', {
              className: Be.records,
              children: [
                f.jsxs('div', {
                  className: Be.statBig,
                  children: [
                    f.jsx('span', { className: Be.statNum, children: c.deepestReached }),
                    f.jsx('span', { className: Be.statLabel, children: '最深到達階' }),
                  ],
                }),
                f.jsxs('dl', {
                  className: Be.statList,
                  children: [
                    f.jsxs('div', {
                      className: Be.statRow,
                      children: [
                        f.jsx('dt', { children: '最高撃破ボス階' }),
                        f.jsx('dd', {
                          children: c.highestBossDefeated > 0 ? `${c.highestBossDefeated}F` : '—',
                        }),
                      ],
                    }),
                    f.jsxs('div', {
                      className: Be.statRow,
                      children: [
                        f.jsx('dt', { children: '挑戦回数' }),
                        f.jsx('dd', { children: c.totalDives }),
                      ],
                    }),
                    f.jsxs('div', {
                      className: Be.statRow,
                      children: [
                        f.jsx('dt', { children: '図鑑達成率' }),
                        f.jsxs('dd', { children: [d.completionPct, '%'] }),
                      ],
                    }),
                  ],
                }),
                f.jsx('h2', { className: Be.h2, children: 'ボス撃破履歴' }),
                c.bossDefeatLog.length === 0
                  ? f.jsx('p', { className: Be.empty, children: 'まだボスを倒していません。' })
                  : f.jsx('ul', {
                      className: Be.bossLog,
                      children: c.bossDefeatLog
                        .slice()
                        .reverse()
                        .map((h, k) =>
                          f.jsx(
                            'li',
                            {
                              className: Be.bossRow,
                              children: f.jsxs('span', { children: [h.depth, 'F のボス撃破'] }),
                            },
                            k
                          )
                        ),
                    }),
              ],
            })
          : f.jsxs('div', {
              className: Be.codex,
              children: [
                f.jsxs('div', {
                  className: Be.codexSummary,
                  children: [
                    '撃破 ',
                    d.monstersDefeated,
                    '/',
                    d.monstersTotal,
                    '・ドロップ ',
                    d.dropsFound,
                    '/',
                    d.dropsTotal,
                  ],
                }),
                f.jsx('div', {
                  className: Be.list,
                  children: _.map((h) =>
                    f.jsx(
                      'div',
                      {
                        className: `${Be.row} ${h.seen ? '' : Be.unseen}`,
                        children: f.jsxs('div', {
                          className: Be.info,
                          children: [
                            f.jsxs('span', {
                              className: Be.name,
                              children: [
                                h.seen ? h.name : '？？？',
                                h.defeated
                                  ? f.jsx('span', { className: Be.badge, children: '撃破' })
                                  : null,
                              ],
                            }),
                            f.jsxs('span', {
                              className: Be.sub,
                              children: [
                                '第',
                                h.tierBand + 1,
                                '帯',
                                h.seen && h.drops.length > 0
                                  ? '・' + h.drops.map((k) => (k.found ? k.name : '？')).join(' / ')
                                  : '',
                              ],
                            }),
                          ],
                        }),
                      },
                      h.id
                    )
                  ),
                }),
              ],
            }),
        f.jsx('footer', {
          className: Be.foot,
          children: f.jsx('button', {
            type: 'button',
            className: Be.back,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  Ux = '_layout_pdb07_1',
  Gx = '_head_pdb07_13',
  $x = '_depth_pdb07_22',
  Yx = '_theme_pdb07_28',
  Xx = '_fpvWrap_pdb07_45',
  Vx = '_fpvControls_pdb07_52',
  Qx = '_fpvTurn_pdb07_63',
  Kx = '_fpvForward_pdb07_64',
  Zx = '_fpvBack_pdb07_65',
  Jx = '_menuGold_pdb07_99',
  Px = '_menuMember_pdb07_105',
  Wx = '_menuMemberName_pdb07_119',
  Fx = '_menuMemberJob_pdb07_123',
  e3 = '_menuMemberStat_pdb07_130',
  t3 = '_menuSp_pdb07_135',
  l3 = '_menuStats_pdb07_142',
  a3 = '_menuStat_pdb07_142',
  n3 = '_skillTabs_pdb07_154',
  i3 = '_skillTab_pdb07_154',
  s3 = '_skillTabOn_pdb07_171',
  r3 = '_mapWrap_pdb07_177',
  o3 = '_paletteHint_pdb07_211',
  u3 = '_stairs_pdb07_220',
  c3 = '_action_pdb07_234',
  d3 = '_notice_pdb07_251',
  m3 = '_itemOverlay_pdb07_315',
  _3 = '_itemPanel_pdb07_325',
  f3 = '_itemTitle_pdb07_338',
  p3 = '_itemEmpty_pdb07_343',
  h3 = '_itemRow_pdb07_349',
  g3 = '_itemName_pdb07_357',
  k3 = '_itemDesc_pdb07_365',
  v3 = '_itemTargets_pdb07_371',
  y3 = '_itemTarget_pdb07_371',
  b3 = '_itemHp_pdb07_391',
  x3 = '_itemUse_pdb07_397',
  S3 = '_itemClose_pdb07_414',
  re = {
    layout: Ux,
    head: Gx,
    depth: $x,
    theme: Yx,
    return: '_return_pdb07_34',
    fpvWrap: Xx,
    fpvControls: Vx,
    fpvTurn: Qx,
    fpvForward: Kx,
    fpvBack: Zx,
    menuGold: Jx,
    menuMember: Px,
    menuMemberName: Wx,
    menuMemberJob: Fx,
    menuMemberStat: e3,
    menuSp: t3,
    menuStats: l3,
    menuStat: a3,
    skillTabs: n3,
    skillTab: i3,
    skillTabOn: s3,
    mapWrap: r3,
    paletteHint: o3,
    stairs: u3,
    action: c3,
    notice: d3,
    itemOverlay: m3,
    itemPanel: _3,
    itemTitle: f3,
    itemEmpty: p3,
    itemRow: h3,
    itemName: g3,
    itemDesc: k3,
    itemTargets: v3,
    itemTarget: y3,
    itemHp: b3,
    itemUse: x3,
    itemClose: S3,
  },
  w3 = '_canvas_1keax_1',
  T3 = { canvas: w3 },
  E3 = [
    { id: 'icon_chest', symbol: '📦', label: '宝箱' },
    { id: 'icon_foe', symbol: '👹', label: '強敵(FOE)' },
    { id: 'icon_warning', symbol: '⚠️', label: '注意' },
    { id: 'icon_door', symbol: '🚪', label: '扉/近道' },
    { id: 'icon_gather', symbol: '⛏️', label: '採集' },
    { id: 'icon_event', symbol: '❗', label: 'イベント' },
    { id: 'icon_note', symbol: '📝', label: 'メモ' },
    { id: 'icon_star', symbol: '⭐', label: '任意' },
  ],
  C3 = new Map(E3.map((l) => [l.id, l]));
function N3(l) {
  var i;
  return ((i = C3.get(l)) == null ? void 0 : i.symbol) ?? '•';
}
const Ol = {
    fog: '#cdd9b8',
    floor: '#fbfdf7',
    wall: '#4a5a3a',
    grid: '#e3ebd6',
    player: '#2196f3',
    stairsUp: '#e8923a',
    stairsDown: '#7aa2d6',
    foe: '#b0533a',
    foeAlert: '#d32f2f',
  },
  A3 = {
    mining: '⛏️',
    gathering: '🌿',
    logging: '🪓',
    fishing: '🎣',
    harvest: '🌰',
    hunting: '🍖',
  },
  L3 = '🍳',
  j3 = ({
    floor: l,
    explored: i,
    pos: o,
    dir: r,
    icons: c = [],
    foes: d = [],
    depletedGathers: _ = [],
    maxCell: h = 26,
    onCellClick: k,
  }) => {
    const p = E.useRef(null),
      v = Math.max(10, Math.min(h, Math.floor(360 / l.width))),
      y = l.width * v,
      S = l.height * v;
    E.useEffect(() => {
      const b = p.current;
      if (!b) return;
      const L = new Set(i),
        C = new Set(_),
        T = new Map(l.gatheringPoints.map((te) => [`${te.cell.x},${te.cell.y}`, te.type])),
        A = window.devicePixelRatio || 1;
      ((b.width = y * A), (b.height = S * A));
      const M = b.getContext('2d');
      if (!M) return;
      (M.scale(A, A), M.clearRect(0, 0, y, S));
      for (let te = 0; te < l.height; te++)
        for (let oe = 0; oe < l.width; oe++) {
          const fe = L.has(`${oe},${te}`);
          ((M.fillStyle = fe ? Ol.floor : Ol.fog),
            M.fillRect(oe * v, te * v, v, v),
            fe &&
              ((M.strokeStyle = Ol.grid),
              (M.lineWidth = 1),
              M.strokeRect(oe * v + 0.5, te * v + 0.5, v - 1, v - 1)));
        }
      ((M.strokeStyle = Ol.wall), (M.lineWidth = 2), (M.lineCap = 'round'));
      const P = (te, oe, fe, ke) => {
        (M.beginPath(), M.moveTo(te, oe), M.lineTo(fe, ke), M.stroke());
      };
      for (let te = 0; te < l.height; te++)
        for (let oe = 0; oe < l.width; oe++) {
          if (!L.has(`${oe},${te}`)) continue;
          const fe = l.cells[te][oe],
            ke = oe * v,
            xe = te * v;
          (fe.walls.N && P(ke, xe, ke + v, xe),
            fe.walls.S && P(ke, xe + v, ke + v, xe + v),
            fe.walls.W && P(ke, xe, ke, xe + v),
            fe.walls.E && P(ke + v, xe, ke + v, xe + v));
          const he = fe.event;
          if (
            (he == null ? void 0 : he.kind) === 'stairsUp' ||
            (he == null ? void 0 : he.kind) === 'stairsDown'
          ) {
            const j = he.kind === 'stairsUp',
              Q = 3,
              U = v * 0.62,
              K = ke + (v - U) / 2,
              ie = xe + (v - U) / 2,
              w = U / Q;
            M.fillStyle = j ? Ol.stairsUp : Ol.stairsDown;
            for (let R = 0; R < Q; R++) {
              const Z = (U / Q) * (j ? R + 1 : Q - R);
              M.fillRect(K + R * w, ie + U - Z, w - 1, Z);
            }
          } else if ((he == null ? void 0 : he.kind) === 'gather') {
            const j = C.has(`${oe},${te}`),
              Q = T.get(`${oe},${te}`);
            ((M.globalAlpha = j ? 0.35 : 1),
              (M.font = `${Math.floor(v * 0.7)}px sans-serif`),
              (M.textAlign = 'center'),
              (M.textBaseline = 'middle'),
              M.fillText((Q && A3[Q]) || '🌿', ke + v / 2, xe + v / 2 + 1),
              (M.globalAlpha = 1));
          } else
            (he == null ? void 0 : he.kind) === 'cookingSpot' &&
              ((M.font = `${Math.floor(v * 0.7)}px sans-serif`),
              (M.textAlign = 'center'),
              (M.textBaseline = 'middle'),
              M.fillText(L3, ke + v / 2, xe + v / 2 + 1));
        }
      ((M.font = `${Math.floor(v * 0.66)}px sans-serif`),
        (M.textAlign = 'center'),
        (M.textBaseline = 'middle'));
      for (const te of c)
        L.has(`${te.x},${te.y}`) &&
          M.fillText(N3(te.iconId), te.x * v + v / 2, te.y * v + v / 2 + 1);
      for (const te of d) {
        if (!L.has(`${te.x},${te.y}`)) continue;
        const oe = te.x * v + v / 2,
          fe = te.y * v + v / 2;
        ((M.fillStyle = te.alerted ? Ol.foeAlert : Ol.foe),
          M.beginPath(),
          M.arc(oe, fe, v * 0.3, 0, Math.PI * 2),
          M.fill(),
          (M.fillStyle = '#ffffff'),
          (M.font = `bold ${Math.floor(v * 0.5)}px sans-serif`),
          (M.textAlign = 'center'),
          (M.textBaseline = 'middle'),
          M.fillText('!', oe, fe + 1));
      }
      const J = o.x * v + v / 2,
        V = o.y * v + v / 2,
        H = v * 0.34,
        ne = { N: -Math.PI / 2, E: 0, S: Math.PI / 2, W: Math.PI }[r];
      ((M.fillStyle = Ol.player),
        M.beginPath(),
        M.moveTo(J + Math.cos(ne) * H, V + Math.sin(ne) * H),
        M.lineTo(J + Math.cos(ne + 2.5) * H, V + Math.sin(ne + 2.5) * H),
        M.lineTo(J + Math.cos(ne - 2.5) * H, V + Math.sin(ne - 2.5) * H),
        M.closePath(),
        M.fill());
    }, [l, i, o, r, c, d, _, v, y, S]);
    const q = (b) => {
      if (!k) return;
      const L = b.currentTarget.getBoundingClientRect(),
        C = Math.floor(((b.clientX - L.left) / L.width) * l.width),
        T = Math.floor(((b.clientY - L.top) / L.height) * l.height);
      C >= 0 && T >= 0 && C < l.width && T < l.height && k(C, T);
    };
    return f.jsx('canvas', {
      ref: p,
      className: T3.canvas,
      style: { width: y, height: S },
      onClick: q,
    });
  },
  M3 = '_gauge_1o2hx_1',
  B3 = '_icon_1o2hx_11',
  q3 = '_segments_1o2hx_16',
  O3 = '_seg_1o2hx_16',
  I3 = '_filled_1o2hx_28',
  D3 = '_danger_1o2hx_32',
  Sn = { gauge: M3, icon: B3, segments: q3, seg: O3, filled: I3, danger: D3 },
  R3 = ({ level: l }) => {
    const i = l >= qi;
    return f.jsxs('div', {
      className: Sn.gauge,
      role: 'img',
      'aria-label': `エンカウントゲージ ${l}/${qi}`,
      children: [
        f.jsx('span', { className: Sn.icon, children: i ? '⚠' : '👣' }),
        f.jsx('div', {
          className: Sn.segments,
          children: Array.from({ length: qi }, (o, r) =>
            f.jsx(
              'span',
              { className: [Sn.seg, r < l ? Sn.filled : '', i ? Sn.danger : ''].join(' ') },
              r
            )
          ),
        }),
      ],
    });
  },
  z3 = '_view_tw2v9_1',
  H3 = { view: z3 },
  Dp = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } };
function U3(l, i, o, r = 4) {
  const c = jh(o),
    d = Lh(o),
    _ = [];
  let { x: h, y: k } = i;
  for (let p = 0; p < r; p++) {
    const v = Ba(l, h, k, o);
    if (
      (_.push({
        x: h,
        y: k,
        leftOpen: !l.cells[k][h].walls[c],
        rightOpen: !l.cells[k][h].walls[d],
        frontOpen: v,
        event: l.cells[k][h].event,
      }),
      !v)
    )
      break;
    ((h += Dp[o].dx), (k += Dp[o].dy));
  }
  return _;
}
const G3 = {
    sky: '#26301c',
    ceiling: '#3a4a2c',
    floor: '#5d6b46',
    wall: '#8b9a6b',
    frontWall: '#7a8a5c',
    outline: '#2c3720',
  },
  $3 = 0.56,
  Y3 = ({
    floor: l,
    pos: i,
    dir: o,
    foes: r = [],
    theme: c,
    maxDepth: d = 4,
    width: _ = 358,
    height: h = 200,
  }) => {
    const k = E.useRef(null);
    return (
      E.useEffect(() => {
        const p = { ...G3, ...(c ?? {}) },
          v = k.current;
        if (!v) return;
        const y = window.devicePixelRatio || 1;
        ((v.width = _ * y), (v.height = h * y));
        const S = v.getContext('2d');
        if (!S) return;
        S.scale(y, y);
        const q = _,
          b = h,
          L = q / 2,
          C = b / 2,
          T = U3(l, i, o, d),
          A = (J) => {
            const V = Math.pow($3, J);
            return {
              l: L - (q / 2) * V,
              r: L + (q / 2) * V,
              t: C - (b / 2) * V,
              b: C + (b / 2) * V,
            };
          },
          M = (J, V, H = !1) => {
            (S.beginPath(), S.moveTo(J[0][0], J[0][1]));
            for (let W = 1; W < J.length; W++) S.lineTo(J[W][0], J[W][1]);
            (S.closePath(),
              (S.fillStyle = V),
              S.fill(),
              H && ((S.strokeStyle = p.outline), (S.lineWidth = 1), S.stroke()));
          },
          P = (J) => `rgba(0,0,0,${Math.min(0.5, J * 0.13)})`;
        ((S.fillStyle = p.sky), S.fillRect(0, 0, q, b));
        for (let J = T.length - 1; J >= 0; J--) {
          const V = A(J),
            H = A(J + 1),
            W = T[J];
          (M(
            [
              [V.l, V.t],
              [V.r, V.t],
              [H.r, H.t],
              [H.l, H.t],
            ],
            p.ceiling
          ),
            M(
              [
                [V.l, V.b],
                [V.r, V.b],
                [H.r, H.b],
                [H.l, H.b],
              ],
              p.floor
            ),
            M(
              [
                [V.l, V.t],
                [H.l, H.t],
                [H.l, H.b],
                [V.l, V.b],
              ],
              W.leftOpen ? p.sky : p.wall,
              !0
            ),
            M(
              [
                [V.r, V.t],
                [H.r, H.t],
                [H.r, H.b],
                [V.r, V.b],
              ],
              W.rightOpen ? p.sky : p.wall,
              !0
            ),
            W.frontOpen ||
              M(
                [
                  [H.l, H.t],
                  [H.r, H.t],
                  [H.r, H.b],
                  [H.l, H.b],
                ],
                p.frontWall,
                !0
              ),
            (S.fillStyle = P(J)),
            S.fillRect(H.l, H.t, H.r - H.l, H.b - H.t));
          const ne = W.event;
          if (
            (ne == null ? void 0 : ne.kind) === 'stairsUp' ||
            (ne == null ? void 0 : ne.kind) === 'stairsDown'
          ) {
            const te = ne.kind === 'stairsUp',
              oe = Math.max(18, (V.b - V.t) * 0.4),
              fe = 4,
              ke = oe / fe,
              xe = L - oe / 2,
              he = (V.b + H.b) / 2 + oe / 2;
            S.fillStyle = te ? '#e8923a' : '#7aa2d6';
            for (let j = 0; j < fe; j++) {
              const Q = ke * (te ? j + 1 : fe - j);
              S.fillRect(xe + j * ke, he - Q, ke - 1, Q);
            }
          }
          if (J > 0 && r.some((te) => te.x === W.x && te.y === W.y)) {
            const te = r.some((xe) => xe.x === W.x && xe.y === W.y && xe.alerted),
              oe = L,
              fe = (V.b + H.b) / 2 - (V.b - H.b) * 0.1,
              ke = Math.max(14, (V.b - V.t) * 0.22);
            ((S.fillStyle = te ? '#d32f2f' : '#b0533a'),
              S.beginPath(),
              S.arc(oe, fe, ke, 0, Math.PI * 2),
              S.fill(),
              (S.fillStyle = '#fff'),
              (S.font = `bold ${Math.floor(ke * 1.3)}px sans-serif`),
              (S.textAlign = 'center'),
              (S.textBaseline = 'middle'),
              S.fillText('!', oe, fe + 1));
          }
        }
      }, [l, i, o, r, c, d, _, h]),
      f.jsx('canvas', { ref: k, className: H3.view, style: { width: _, height: h } })
    );
  },
  X3 = '_wrap_1ke60_1',
  V3 = '_scroll_1ke60_7',
  Q3 = '_canvas_1ke60_17',
  K3 = '_edges_1ke60_21',
  Z3 = '_edge_1ke60_21',
  J3 = '_edgeLabel_1ke60_34',
  P3 = '_node_1ke60_40',
  W3 = '_learned_1ke60_57',
  F3 = '_maxed_1ke60_62',
  e2 = '_available_1ke60_67',
  t2 = '_locked_1ke60_72',
  l2 = '_selected_1ke60_76',
  a2 = '_nodeName_1ke60_81',
  n2 = '_nodeCost_1ke60_92',
  i2 = '_nodeLv_1ke60_104',
  s2 = '_lvNum_1ke60_112',
  r2 = '_lvBar_1ke60_118',
  o2 = '_lvFill_1ke60_126',
  u2 = '_lvMax_1ke60_132',
  c2 = '_detail_1ke60_136',
  d2 = '_detailName_1ke60_143',
  m2 = '_detailLv_1ke60_151',
  _2 = '_detailDesc_1ke60_157',
  f2 = '_detailReq_1ke60_164',
  p2 = '_hint_1ke60_170',
  Ve = {
    wrap: X3,
    scroll: V3,
    canvas: Q3,
    edges: K3,
    edge: Z3,
    edgeLabel: J3,
    node: P3,
    learned: W3,
    maxed: F3,
    available: e2,
    locked: t2,
    selected: l2,
    nodeName: a2,
    nodeCost: n2,
    nodeLv: i2,
    lvNum: s2,
    lvBar: r2,
    lvFill: o2,
    lvMax: u2,
    detail: c2,
    detailName: d2,
    detailLv: m2,
    detailDesc: _2,
    detailReq: f2,
    hint: p2,
  },
  Rp = [1, 2, 2, 2, 2];
function Vh(l) {
  return Rp[Math.min(Math.max(0, l), Rp.length - 1)];
}
function Qh(l) {
  var o, r;
  const i = [
    ...(((o = at[l.classId]) == null ? void 0 : o.skillTree.skills) ?? []),
    ...(((r = bt[l.raceId]) == null ? void 0 : r.raceSkillTree.skills) ?? []),
  ];
  return (l.titleId && Rl[l.titleId] && i.push(...Rl[l.titleId].skillTree.skills), i);
}
function h2(l, i) {
  const o = new Map(l.map((d) => [d.skillId, d])),
    r = new Map(),
    c = (d, _ = 0) => {
      var v;
      const h = r.get(d);
      if (h !== void 0) return h;
      const k = o.get(d);
      if (!k || !((v = k.requires) != null && v.length) || _ > 30) return (r.set(d, 0), 0);
      const p =
        1 + Math.max(...k.requires.map((y) => (o.has(y.skillId) ? c(y.skillId, _ + 1) : 0)));
      return (r.set(d, p), p);
    };
  return c(i);
}
function Mr(l, i) {
  return Vh(h2(Qh(l), i));
}
function Cn(l, i) {
  return l.learnedSkills[i] ?? 0;
}
function Sr(l) {
  return l.skillPoints.total - l.skillPoints.spent;
}
function g2(l, i) {
  return (i.requires ?? []).every((o) => Cn(l, o.skillId) >= o.level);
}
function Kh(l, i) {
  const o = Qh(l).find((r) => r.skillId === i);
  return !o || Cn(l, i) >= o.maxLevel || Sr(l) < Mr(l, i) ? !1 : g2(l, o);
}
function Zh(l, i) {
  return Kh(l, i)
    ? {
        ...l,
        learnedSkills: { ...l.learnedSkills, [i]: Cn(l, i) + 1 },
        skillPoints: { ...l.skillPoints, spent: l.skillPoints.spent + Mr(l, i) },
      }
    : l;
}
const hc = 132,
  gc = 48,
  sr = 176,
  rr = 62,
  Jh = ({ nodes: l, char: i, onLearn: o }) => {
    var k;
    const [r, c] = E.useState(null),
      d = E.useMemo(() => {
        var A;
        const p = new Map(l.map((M) => [M.skillId, M])),
          v = new Map(),
          y = (M, P = 0) => {
            var H;
            if (v.has(M)) return v.get(M);
            const J = p.get(M);
            if (!J || !((H = J.requires) != null && H.length) || P > 20) return (v.set(M, 0), 0);
            const V =
              1 + Math.max(...J.requires.map((W) => (p.has(W.skillId) ? y(W.skillId, P + 1) : 0)));
            return (v.set(M, V), V);
          },
          S = [];
        l.forEach((M, P) => {
          const J = y(M.skillId);
          (S[J] || (S[J] = [])).push(P);
        });
        const q = new Map(),
          b = S.map(() => new Set());
        for (let M = 0; M < S.length; M++)
          for (const P of S[M] ?? []) {
            const J = l[P];
            let V = 0;
            if (M > 0 && (A = J.requires) != null && A.length) {
              const W = J.requires.map((ne) => q.get(ne.skillId)).filter((ne) => ne !== void 0);
              W.length && (V = Math.min(...W));
            }
            let H = V;
            for (; b[M].has(H); ) H++;
            (b[M].add(H), q.set(J.skillId, H));
          }
        const L = Math.max(0, ...q.values()),
          C = l.map((M) => ({ node: M, col: y(M.skillId), row: q.get(M.skillId) ?? 0 })),
          T = [];
        for (const M of C)
          for (const P of M.node.requires ?? []) {
            const J = C.find((V) => V.node.skillId === P.skillId);
            J &&
              T.push({
                from: P.skillId,
                to: M.node.skillId,
                level: P.level,
                x1: J.col * sr + hc,
                y1: J.row * rr + gc / 2,
                x2: M.col * sr,
                y2: M.row * rr + gc / 2,
              });
          }
        return { placed: C, edges: T, width: (S.length - 1) * sr + hc, height: (L + 1) * rr };
      }, [l]),
      _ = r ? ji[r] : null,
      h = r ? l.find((p) => p.skillId === r) : null;
    return f.jsxs('div', {
      className: Ve.wrap,
      children: [
        f.jsx('div', {
          className: Ve.scroll,
          children: f.jsxs('div', {
            className: Ve.canvas,
            style: { width: d.width, height: d.height },
            children: [
              f.jsx('svg', {
                className: Ve.edges,
                width: d.width,
                height: d.height,
                children: d.edges.map((p) => {
                  const v = (p.x1 + p.x2) / 2;
                  return f.jsxs(
                    'g',
                    {
                      children: [
                        f.jsx('path', {
                          className: Ve.edge,
                          d: `M ${p.x1} ${p.y1} H ${v} V ${p.y2} H ${p.x2}`,
                          fill: 'none',
                        }),
                        f.jsxs('text', {
                          className: Ve.edgeLabel,
                          x: p.x2 - 6,
                          y: p.y2 - 5,
                          textAnchor: 'end',
                          children: ['Lv', p.level],
                        }),
                      ],
                    },
                    `${p.from}-${p.to}`
                  );
                }),
              }),
              d.placed.map(({ node: p, col: v, row: y }) => {
                var T;
                const S = Cn(i, p.skillId),
                  q = S >= p.maxLevel,
                  b = (p.requires ?? []).every((A) => Cn(i, A.skillId) >= A.level),
                  L = Kh(i, p.skillId),
                  C = [
                    Ve.node,
                    S > 0 ? Ve.learned : '',
                    q ? Ve.maxed : '',
                    L ? Ve.available : '',
                    b ? '' : Ve.locked,
                    r === p.skillId ? Ve.selected : '',
                  ]
                    .filter(Boolean)
                    .join(' ');
                return f.jsxs(
                  'button',
                  {
                    type: 'button',
                    className: C,
                    style: { left: v * sr, top: y * rr, width: hc, height: gc },
                    onClick: () => {
                      (c(p.skillId), L && o(p.skillId));
                    },
                    children: [
                      f.jsx('span', {
                        className: Ve.nodeName,
                        children: ((T = ji[p.skillId]) == null ? void 0 : T.name) ?? p.skillId,
                      }),
                      f.jsxs('span', { className: Ve.nodeCost, children: ['SP', Vh(v)] }),
                      f.jsxs('span', {
                        className: Ve.nodeLv,
                        children: [
                          f.jsx('span', { className: Ve.lvNum, children: S }),
                          f.jsx('span', {
                            className: Ve.lvBar,
                            children: f.jsx('span', {
                              className: Ve.lvFill,
                              style: { width: `${(S / p.maxLevel) * 100}%` },
                            }),
                          }),
                          f.jsx('span', { className: Ve.lvMax, children: p.maxLevel }),
                        ],
                      }),
                    ],
                  },
                  p.skillId
                );
              }),
            ],
          }),
        }),
        _
          ? f.jsxs('div', {
              className: Ve.detail,
              children: [
                f.jsxs('div', {
                  className: Ve.detailName,
                  children: [
                    _.name,
                    f.jsxs('span', {
                      className: Ve.detailLv,
                      children: ['Lv ', Cn(i, _.id), '/', (h == null ? void 0 : h.maxLevel) ?? 0],
                    }),
                  ],
                }),
                f.jsx('div', { className: Ve.detailDesc, children: _.description }),
                (k = h == null ? void 0 : h.requires) != null && k.length
                  ? f.jsxs('div', {
                      className: Ve.detailReq,
                      children: [
                        '前提:',
                        ' ',
                        h.requires
                          .map((p) => {
                            var v;
                            return `${((v = ji[p.skillId]) == null ? void 0 : v.name) ?? p.skillId} Lv${p.level}`;
                          })
                          .join('・'),
                      ],
                    })
                  : null,
              ],
            })
          : f.jsx('div', {
              className: Ve.hint,
              children:
                'ノードをタップで習得（1Lvあたりの消費SPは各ノードの「SP◯」。深いスキルほど高コスト）。緑=習得済 / 枠強調=習得可 / 暗=前提未達。',
            }),
      ],
    });
  },
  or = [
    {
      name: '樹海',
      sky: '#26301c',
      ceiling: '#3a4a2c',
      floor: '#5d6b46',
      wall: '#8b9a6b',
      frontWall: '#7a8a5c',
      outline: '#2c3720',
      mapFloor: '#fbfdf7',
    },
    {
      name: '洞窟',
      sky: '#1c2630',
      ceiling: '#2c3a4a',
      floor: '#46586b',
      wall: '#6b7f9a',
      frontWall: '#5c708a',
      outline: '#202c37',
      mapFloor: '#f5f8fb',
    },
    {
      name: '火山',
      sky: '#30201c',
      ceiling: '#4a302c',
      floor: '#6b4a46',
      wall: '#9a6f6b',
      frontWall: '#8a5f5c',
      outline: '#371f20',
      mapFloor: '#fdf6f4',
    },
    {
      name: '氷窟',
      sky: '#243038',
      ceiling: '#3a4e58',
      floor: '#5d7682',
      wall: '#8fb0bd',
      frontWall: '#7f9fad',
      outline: '#22343c',
      mapFloor: '#f4fafd',
    },
    {
      name: '霊廟',
      sky: '#2a2030',
      ceiling: '#3e2c4a',
      floor: '#5d466b',
      wall: '#8a6f9a',
      frontWall: '#7a5f8a',
      outline: '#2c2237',
      mapFloor: '#faf4fd',
    },
  ];
function zp(l) {
  const i = Math.floor((l - 1) / 10);
  return or[((i % or.length) + or.length) % or.length];
}
function k2(l) {
  var r, c, d;
  const i = l.diveState;
  if (!i) return !1;
  const o =
    (c = (r = l.towerState.floors[i.depth]) == null ? void 0 : r.generated.cells[i.pos.y]) == null
      ? void 0
      : c[i.pos.x];
  return ((d = o == null ? void 0 : o.event) == null ? void 0 : d.kind) === 'cookingSpot';
}
function v2(l) {
  const i = new Set(l.unlockedRecipeIds ?? []);
  return Object.values(qn).filter((o) => i.has(o.id));
}
function Ph(l, i) {
  const o = qn[i];
  return !o || !(l.unlockedRecipeIds ?? []).includes(i)
    ? !1
    : o.ingredients.every((r) => Xc(l, r.itemId) >= r.qty);
}
function y2(l, i) {
  if (!Ph(l, i)) return { ok: !1, save: l };
  const o = qn[i];
  let r = l;
  for (const c of o.ingredients) r = xh(r, c.itemId, c.qty);
  return ((r = bh(r, o.result.itemId, o.result.count)), { ok: !0, save: r });
}
function Wh(l, i) {
  const o = new Set([...l.guild.party.front, ...l.guild.party.back].filter((r) => r !== null));
  return l.guild.members.some((r) => o.has(r.id) && (r.learnedSkills[i] ?? 0) > 0);
}
function Fh(l) {
  var d, _, h;
  const i = l.diveState;
  if (!i) return null;
  const o = (d = l.towerState.floors[i.depth]) == null ? void 0 : d.generated,
    r = (_ = o == null ? void 0 : o.cells[i.pos.y]) == null ? void 0 : _[i.pos.x];
  if (!o || ((h = r == null ? void 0 : r.event) == null ? void 0 : h.kind) !== 'gather')
    return null;
  const c = r.event.gatherId;
  return o.gatheringPoints.find((k) => k.id === c) ?? null;
}
function jc(l, i) {
  var c;
  const o = l.diveState;
  return o
    ? (((c = l.towerState.floors[o.depth]) == null ? void 0 : c.depletedGathers) ?? []).includes(
        br(i.cell.x, i.cell.y)
      )
    : !0;
}
function Hp(l, i) {
  return Wh(l, Oa[i.type].requiredSkillId);
}
function b2(l, i) {
  const o = l.reduce((c, d) => c + d.weight, 0);
  let r = i.next() * o;
  for (const c of l) if (((r -= c.weight), r < 0)) return c.itemId;
  return l[l.length - 1].itemId;
}
function x2(l, i) {
  const o = l.diveState;
  if (!o) return { ok: !1, save: l, reason: 'noDive' };
  const r = Fh(l);
  if (!r) return { ok: !1, save: l, reason: 'noPoint' };
  if (jc(l, r)) return { ok: !1, save: l, reason: 'depleted' };
  const c = Oa[r.type];
  if (!Wh(l, c.requiredSkillId)) return { ok: !1, save: l, reason: 'noSkill' };
  if (c.food && yh(l) >= vh) return { ok: !1, save: l, reason: 'foodFull' };
  const d = b2(c.drops, i);
  let _ = c.food ? bh(l, d, 1) : $c(l, d, 1);
  const h = br(r.cell.x, r.cell.y),
    k = _.towerState.floors[o.depth],
    p = k.depletedGathers.includes(h) ? k.depletedGathers : [...k.depletedGathers, h];
  return (
    (_ = {
      ..._,
      towerState: {
        ..._.towerState,
        floors: { ..._.towerState.floors, [o.depth]: { ...k, depletedGathers: p } },
      },
    }),
    { ok: !0, save: _, itemId: d, reason: void 0 }
  );
}
function S2(l, i, o) {
  var L;
  const r = Fe[i];
  if (!r) return { save: l, ok: !1, message: 'そのアイテムは無い' };
  if (!((L = r.useContext) != null && L.includes('field')))
    return { save: l, ok: !1, message: 'ここでは使えない' };
  const c = vb(i);
  if ((c ? Xc(l, i) : kh(l, i)) <= 0) return { save: l, ok: !1, message: '所持していない' };
  const _ = (C) => (c ? xh(C, i, 1) : Yc(C, i, 1));
  if (i === 'item_return_thread')
    return l.diveState
      ? { save: Ii(_(l)), ok: !0, message: '拠点へ帰還した' }
      : { save: l, ok: !1, message: '探索中のみ使える' };
  if (!l.diveState) return { save: l, ok: !1, message: '探索中のみ使える' };
  const h = l.diveState.party.find((C) => C.charId === o),
    k = l.guild.members.find((C) => C.id === o);
  if (!h || !k) return { save: l, ok: !1, message: '対象がいない' };
  const p = qa(k);
  let v = h.hp,
    y = h.tp,
    S = !1;
  for (const C of r.effects ?? [])
    C.kind === 'heal'
      ? ((v = Math.min(p.hp, v + C.amount(1))), (S = !0))
      : C.kind === 'restoreTp' && ((y = Math.min(p.tp, y + C.amount(1))), (S = !0));
  if (!S) return { save: l, ok: !1, message: 'いま使う効果がない' };
  const q = l.diveState.party.map((C) => (C.charId === o ? { ...C, hp: v, tp: y } : C));
  return {
    save: _({ ...l, diveState: { ...l.diveState, party: q } }),
    ok: !0,
    message: `${k.name} に ${r.name} を使った`,
  };
}
const w2 = (l) => new Promise((i) => setTimeout(i, l)),
  T2 = () => {
    const l = cl(),
      { save: i, applySave: o, applyAndPersist: r } = Ul(),
      c = E.useRef(null),
      d = E.useRef(!1),
      [_, h] = E.useState(!1),
      [k, p] = E.useState(!1),
      [v, y] = E.useState(!1),
      [S, q] = E.useState(null),
      [b, L] = E.useState('class'),
      [C, T] = E.useState(null),
      A = (i == null ? void 0 : i.diveState) ?? null,
      M = E.useMemo(() => {
        var U;
        return i && A ? ((U = i.towerState.floors[A.depth]) == null ? void 0 : U.generated) : null;
      }, [i, A]),
      P = E.useMemo(() => {
        var U;
        return i && A
          ? (((U = i.towerState.floors[A.depth]) == null ? void 0 : U.foeRuntime) ?? [])
              .filter((K) => !K.defeated)
              .map((K) => ({ x: K.cell.x, y: K.cell.y, alerted: K.alerted }))
          : [];
      }, [i, A]),
      J = E.useMemo(() => (i ? Fh(i) : null), [i]),
      V = E.useMemo(() => (i ? k2(i) : !1), [i]),
      H = E.useMemo(() => {
        var U;
        return i && A
          ? (((U = i.towerState.floors[A.depth]) == null ? void 0 : U.depletedGathers) ?? [])
          : [];
      }, [i, A]),
      W = E.useCallback(() => {
        var K;
        if (!i) return;
        c.current || (c.current = fa((i.masterSeed ^ 2654435769) >>> 0));
        const U = x2(i, c.current);
        if (!U.ok) {
          T(
            U.reason === 'noSkill'
              ? '対応する採集スキルを持つ仲間がいない'
              : U.reason === 'foodFull'
                ? '食料がいっぱいで採れない'
                : '採集できない'
          );
          return;
        }
        (r(() => U.save),
          T(
            `${U.itemId ? (((K = Fe[U.itemId]) == null ? void 0 : K.name) ?? '素材') : '素材'} を手に入れた`
          ));
      }, [i, r]),
      ne = E.useCallback(
        (U) => {
          var ie;
          if (!i) return;
          const K = y2(i, U);
          K.ok &&
            (r(() => K.save), T(`${((ie = qn[U]) == null ? void 0 : ie.name) ?? '料理'} を作った`));
        },
        [i, r]
      ),
      te = E.useCallback(
        (U) => {
          if (!i) return;
          (T(null), c.current || (c.current = fa((i.masterSeed ^ 2654435769) >>> 0)));
          const K = Np(i, U, c.current);
          (r(() => K.save), K.triggered && l('/battle'));
        },
        [i, r, l]
      ),
      oe = E.useCallback(
        (U) => {
          o((K) => Ih(K, U));
        },
        [o]
      ),
      fe = E.useCallback(async () => {
        if (!i) return;
        const U = Ap(i);
        if (U === 'stairsUp') {
          if (!Rh(i, i.diveState.depth)) {
            T('強大な力に阻まれている。階層ボスを倒さねば先へ進めない。');
            return;
          }
          await r((K) => L1(K));
        } else
          U === 'stairsDown' &&
            (i.diveState.depth <= 1 ? (await r((K) => Ii(K)), l('/town')) : await r((K) => j1(K)));
      }, [i, r, l]),
      ke = E.useCallback(async () => {
        (await r((U) => Ii(U)), l('/town'));
      }, [r, l]),
      xe = E.useCallback(
        (U, K) => {
          if (!i) return;
          const ie = S2(i, U, K);
          ie.ok && (r(() => ie.save), ie.save.diveState || (h(!1), l('/town')));
        },
        [i, r, l]
      ),
      he = E.useCallback(
        async (U) => {
          if (!(d.current || U.length === 0)) {
            ((d.current = !0), T(null));
            try {
              for (const K of U) {
                if (!c.current) continue;
                let ie = !1,
                  w = !1;
                if (
                  (await r((R) => {
                    if (!R.diveState) return R;
                    const Z = Np(R, K, c.current);
                    return ((ie = Z.triggered), (w = Z.moved), Z.save);
                  }),
                  ie)
                ) {
                  l('/battle');
                  return;
                }
                if (!w) return;
                await w2(110);
              }
            } finally {
              d.current = !1;
            }
          }
        },
        [r, l]
      ),
      j = E.useCallback(
        (U, K) => {
          if (!A || !M || d.current) return;
          c.current || (c.current = fa((i.masterSeed ^ 2654435769) >>> 0));
          const ie = m1(M, A.pos, { x: U, y: K });
          ie && ie.length > 0 && he(ie);
        },
        [A, M, i, he]
      );
    if (!i) return f.jsx(rl, { to: '/title', replace: !0 });
    if (!A || !M) return f.jsx(rl, { to: '/town', replace: !0 });
    const Q = Ap(i);
    return f.jsxs('div', {
      className: re.layout,
      children: [
        f.jsxs('header', {
          className: re.head,
          children: [
            f.jsxs('div', {
              className: re.depth,
              children: [
                A.depth,
                'F ',
                f.jsx('span', { className: re.theme, children: zp(A.depth).name }),
              ],
            }),
            f.jsx(R3, { level: u1(A.encounter.stepsUntilEncounter) }),
            f.jsx('button', {
              type: 'button',
              className: re.return,
              onClick: () => {
                (q(null), y(!0));
              },
              children: 'メニュー',
            }),
            f.jsx('button', {
              type: 'button',
              className: re.return,
              onClick: () => h(!0),
              children: '道具',
            }),
            f.jsx('button', {
              type: 'button',
              className: re.return,
              onClick: () => void ke(),
              children: '帰還',
            }),
          ],
        }),
        f.jsxs('div', {
          className: re.fpvWrap,
          children: [
            f.jsx(Y3, { floor: M, pos: A.pos, dir: A.dir, foes: P, theme: zp(A.depth) }),
            f.jsxs('div', {
              className: re.fpvControls,
              children: [
                f.jsx('button', {
                  type: 'button',
                  className: re.fpvTurn,
                  onClick: () => oe(jh(A.dir)),
                  'aria-label': '左を向く',
                  children: '↰',
                }),
                f.jsx('button', {
                  type: 'button',
                  className: re.fpvForward,
                  onClick: () => te(A.dir),
                  children: '▲ 前進',
                }),
                f.jsx('button', {
                  type: 'button',
                  className: re.fpvTurn,
                  onClick: () => oe(Lh(A.dir)),
                  'aria-label': '右を向く',
                  children: '↱',
                }),
              ],
            }),
            f.jsx('button', {
              type: 'button',
              className: re.fpvBack,
              onClick: () => oe(c1(A.dir)),
              'aria-label': '振り向く',
              children: '↻',
            }),
          ],
        }),
        f.jsx('div', {
          className: re.mapWrap,
          children: f.jsx(j3, {
            floor: M,
            explored: i.exploredCells[A.depth] ?? [],
            pos: A.pos,
            dir: A.dir,
            foes: P,
            depletedGathers: H,
            onCellClick: j,
          }),
        }),
        f.jsx('p', {
          className: re.paletteHint,
          children: 'マップのマスをタップすると、そこまで自動で移動します。',
        }),
        Q &&
          f.jsx('button', {
            type: 'button',
            className: re.stairs,
            onClick: () => void fe(),
            children:
              Q === 'stairsUp'
                ? '▲ 次の階へ進む'
                : A.depth <= 1
                  ? '▼ 拠点へ戻る'
                  : '▼ 前の階へ戻る',
          }),
        J &&
          f.jsx('button', {
            type: 'button',
            className: re.action,
            disabled: jc(i, J) || !Hp(i, J),
            onClick: W,
            children: jc(i, J)
              ? `🌿 ${Oa[J.type].name}（採集済み）`
              : Hp(i, J)
                ? `🌿 ${Oa[J.type].name}する`
                : `🌿 ${Oa[J.type].name}（スキル要）`,
          }),
        V &&
          f.jsx('button', {
            type: 'button',
            className: re.action,
            onClick: () => p(!0),
            children: '🍳 調理する',
          }),
        C && f.jsx('p', { className: re.notice, children: C }),
        _
          ? f.jsx('div', {
              className: re.itemOverlay,
              onClick: () => h(!1),
              children: f.jsxs('div', {
                className: re.itemPanel,
                onClick: (U) => U.stopPropagation(),
                children: [
                  f.jsx('div', { className: re.itemTitle, children: 'どうぐ・食料' }),
                  (() => {
                    const U = [...i.guild.storage, ...(i.guild.foodStorage ?? [])].filter((K) => {
                      var ie, w;
                      return (
                        ((w = (ie = Fe[K.itemId]) == null ? void 0 : ie.useContext) == null
                          ? void 0
                          : w.includes('field')) && K.qty > 0
                      );
                    });
                    return U.length === 0
                      ? f.jsx('p', {
                          className: re.itemEmpty,
                          children: '使える道具がありません。',
                        })
                      : U.map((K) => {
                          const ie = Fe[K.itemId],
                            w = K.itemId === 'item_return_thread';
                          return f.jsxs(
                            'div',
                            {
                              className: re.itemRow,
                              children: [
                                f.jsxs('div', {
                                  className: re.itemName,
                                  children: [
                                    ie.name,
                                    ' ×',
                                    K.qty,
                                    f.jsx('span', {
                                      className: re.itemDesc,
                                      children: ie.description,
                                    }),
                                  ],
                                }),
                                w
                                  ? f.jsx('button', {
                                      type: 'button',
                                      className: re.itemUse,
                                      onClick: () => xe(K.itemId),
                                      children: '使う',
                                    })
                                  : f.jsx('div', {
                                      className: re.itemTargets,
                                      children: A.party.map((R) => {
                                        const Z = i.guild.members.find((le) => le.id === R.charId);
                                        if (!Z) return null;
                                        const F = qa(Z);
                                        return f.jsxs(
                                          'button',
                                          {
                                            type: 'button',
                                            className: re.itemTarget,
                                            onClick: () => xe(K.itemId, R.charId),
                                            children: [
                                              Z.name,
                                              f.jsxs('span', {
                                                className: re.itemHp,
                                                children: [
                                                  'HP ',
                                                  R.hp,
                                                  '/',
                                                  F.hp,
                                                  '・TP ',
                                                  R.tp,
                                                  '/',
                                                  F.tp,
                                                ],
                                              }),
                                            ],
                                          },
                                          R.charId
                                        );
                                      }),
                                    }),
                              ],
                            },
                            K.itemId
                          );
                        });
                  })(),
                  f.jsx('button', {
                    type: 'button',
                    className: re.itemClose,
                    onClick: () => h(!1),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
        k
          ? f.jsx('div', {
              className: re.itemOverlay,
              onClick: () => p(!1),
              children: f.jsxs('div', {
                className: re.itemPanel,
                onClick: (U) => U.stopPropagation(),
                children: [
                  f.jsx('div', { className: re.itemTitle, children: '調理' }),
                  (() => {
                    const U = v2(i);
                    return U.length === 0
                      ? f.jsx('p', {
                          className: re.itemEmpty,
                          children: '作れるレシピがありません。',
                        })
                      : U.map((K) => {
                          var R;
                          const ie = Ph(i, K.id),
                            w = K.ingredients
                              .map((Z) => {
                                var F;
                                return `${((F = Fe[Z.itemId]) == null ? void 0 : F.name) ?? Z.itemId}×${Z.qty}`;
                              })
                              .join(' ＋ ');
                          return f.jsxs(
                            'div',
                            {
                              className: re.itemRow,
                              children: [
                                f.jsxs('div', {
                                  className: re.itemName,
                                  children: [
                                    K.name,
                                    f.jsxs('span', {
                                      className: re.itemDesc,
                                      children: [
                                        w,
                                        ' → ',
                                        ((R = Fe[K.result.itemId]) == null ? void 0 : R.name) ??
                                          K.result.itemId,
                                        '（所持',
                                        K.ingredients
                                          .map((Z) => {
                                            var F;
                                            return `${((F = Fe[Z.itemId]) == null ? void 0 : F.name) ?? ''}${Xc(i, Z.itemId)}`;
                                          })
                                          .join('・'),
                                        '）',
                                      ],
                                    }),
                                  ],
                                }),
                                f.jsx('button', {
                                  type: 'button',
                                  className: re.itemUse,
                                  disabled: !ie,
                                  onClick: () => ne(K.id),
                                  children: '作る',
                                }),
                              ],
                            },
                            K.id
                          );
                        });
                  })(),
                  f.jsx('button', {
                    type: 'button',
                    className: re.itemClose,
                    onClick: () => p(!1),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
        v
          ? f.jsx('div', {
              className: re.itemOverlay,
              onClick: () => y(!1),
              children: f.jsx('div', {
                className: re.itemPanel,
                onClick: (U) => U.stopPropagation(),
                children: (() => {
                  var w, R, Z, F;
                  const U = S ? i.guild.members.find((le) => le.id === S) : null;
                  if (!U)
                    return f.jsxs(f.Fragment, {
                      children: [
                        f.jsx('div', { className: re.itemTitle, children: 'メニュー' }),
                        f.jsxs('p', {
                          className: re.menuGold,
                          children: ['所持金 ', i.guild.gold, ' G'],
                        }),
                        A.party.map((le) => {
                          var Ge;
                          const ce = i.guild.members.find((G) => G.id === le.charId);
                          if (!ce) return null;
                          const be = qa(ce),
                            et = Sr(ce);
                          return f.jsxs(
                            'button',
                            {
                              type: 'button',
                              className: re.menuMember,
                              onClick: () => {
                                (q(le.charId), L('class'));
                              },
                              children: [
                                f.jsxs('span', {
                                  className: re.menuMemberName,
                                  children: [
                                    ce.name,
                                    f.jsxs('span', {
                                      className: re.menuMemberJob,
                                      children: [
                                        (Ge = at[ce.classId]) == null ? void 0 : Ge.name,
                                        ' Lv',
                                        ce.level,
                                      ],
                                    }),
                                  ],
                                }),
                                f.jsxs('span', {
                                  className: re.menuMemberStat,
                                  children: [
                                    'HP ',
                                    le.hp,
                                    '/',
                                    be.hp,
                                    '・TP ',
                                    le.tp,
                                    '/',
                                    be.tp,
                                    et > 0
                                      ? f.jsxs('span', {
                                          className: re.menuSp,
                                          children: ['SP ', et],
                                        })
                                      : null,
                                  ],
                                }),
                              ],
                            },
                            le.charId
                          );
                        }),
                        f.jsx('button', {
                          type: 'button',
                          className: re.itemClose,
                          onClick: () => y(!1),
                          children: 'とじる',
                        }),
                      ],
                    });
                  const K = qa(U),
                    ie =
                      b === 'class'
                        ? (((w = at[U.classId]) == null ? void 0 : w.skillTree.skills) ?? [])
                        : b === 'race'
                          ? (((R = bt[U.raceId]) == null ? void 0 : R.raceSkillTree.skills) ?? [])
                          : U.titleId
                            ? (((Z = Rl[U.titleId]) == null ? void 0 : Z.skillTree.skills) ?? [])
                            : [];
                  return f.jsxs(f.Fragment, {
                    children: [
                      f.jsxs('div', {
                        className: re.itemTitle,
                        children: [
                          U.name,
                          '（',
                          (F = at[U.classId]) == null ? void 0 : F.name,
                          ' Lv',
                          U.level,
                          '）',
                          f.jsxs('span', { className: re.menuSp, children: ['SP ', Sr(U)] }),
                        ],
                      }),
                      f.jsx('div', {
                        className: re.menuStats,
                        children: [
                          ['HP', K.hp],
                          ['TP', K.tp],
                          ['STR', K.str],
                          ['VIT', K.vit],
                          ['AGI', K.agi],
                          ['INT', K.int],
                          ['MND', K.mnd],
                          ['LUC', K.luc],
                        ].map(([le, ce]) =>
                          f.jsxs('span', { className: re.menuStat, children: [le, ' ', ce] }, le)
                        ),
                      }),
                      f.jsx('div', {
                        className: re.skillTabs,
                        children: ['class', 'race', 'title'].map((le) =>
                          f.jsx(
                            'button',
                            {
                              type: 'button',
                              className: `${re.skillTab} ${b === le ? re.skillTabOn : ''}`,
                              onClick: () => L(le),
                              disabled: le === 'title' && !U.titleId,
                              children: le === 'class' ? '職業' : le === 'race' ? '種族' : '称号',
                            },
                            le
                          )
                        ),
                      }),
                      f.jsx(Jh, {
                        nodes: ie,
                        char: U,
                        onLearn: (le) =>
                          void r((ce) => ({
                            ...ce,
                            guild: {
                              ...ce.guild,
                              members: ce.guild.members.map((be) =>
                                be.id === U.id ? Zh(be, le) : be
                              ),
                            },
                          })),
                      }),
                      f.jsx('button', {
                        type: 'button',
                        className: re.itemClose,
                        onClick: () => q(null),
                        children: '← もどる',
                      }),
                    ],
                  });
                })(),
              }),
            })
          : null,
      ],
    });
  },
  E2 = '_layout_34t9v_1',
  C2 = '_head_34t9v_11',
  N2 = '_title_34t9v_18',
  A2 = '_stock_34t9v_24',
  L2 = '_tabs_34t9v_29',
  j2 = '_tab_34t9v_29',
  M2 = '_tabActive_34t9v_46',
  B2 = '_hint_34t9v_51',
  q2 = '_list_34t9v_57',
  O2 = '_row_34t9v_65',
  I2 = '_info_34t9v_76',
  D2 = '_name_34t9v_82',
  R2 = '_note_34t9v_87',
  z2 = '_actions_34t9v_92',
  H2 = '_ingot_34t9v_97',
  U2 = '_recycle_34t9v_114',
  G2 = '_maxed_34t9v_126',
  $2 = '_empty_34t9v_132',
  Y2 = '_foot_34t9v_137',
  X2 = '_back_34t9v_141',
  We = {
    layout: E2,
    head: C2,
    title: N2,
    stock: A2,
    tabs: L2,
    tab: j2,
    tabActive: M2,
    hint: B2,
    list: q2,
    row: O2,
    info: I2,
    name: D2,
    note: R2,
    actions: z2,
    ingot: H2,
    recycle: U2,
    maxed: G2,
    empty: $2,
    foot: Y2,
    back: X2,
  },
  V2 = () => {
    const l = cl(),
      { save: i, applyAndPersist: o } = Ul(),
      [r, c] = E.useState('forge');
    if (!i) return f.jsx(rl, { to: '/title', replace: !0 });
    const { copper: d, silver: _, gold: h } = i.forgeInventory.ingots,
      k = i.forgeInventory.fragments.common ?? 0,
      p = i.guild.equipment,
      v = (y, S, q, b) =>
        f.jsxs('button', {
          type: 'button',
          className: We.ingot,
          disabled: b <= 0,
          onClick: () => void o((L) => qb(L, y, S).save),
          children: [q, '+', pl.INGOT_INC[S], '（', b, '）'],
        });
    return f.jsxs('div', {
      className: We.layout,
      children: [
        f.jsxs('header', {
          className: We.head,
          children: [
            f.jsx('h1', { className: We.title, children: '鍛冶屋' }),
            f.jsxs('span', {
              className: We.stock,
              children: ['銅', d, '・銀', _, '・金', h, '／断片', k],
            }),
          ],
        }),
        f.jsxs('div', {
          className: We.tabs,
          children: [
            f.jsx('button', {
              type: 'button',
              className: `${We.tab} ${r === 'forge' ? We.tabActive : ''}`,
              onClick: () => c('forge'),
              children: '強化',
            }),
            f.jsx('button', {
              type: 'button',
              className: `${We.tab} ${r === 'recycle' ? We.tabActive : ''}`,
              onClick: () => c('recycle'),
              children: 'リサイクル',
            }),
          ],
        }),
        f.jsx('p', {
          className: We.hint,
          children:
            r === 'forge'
              ? 'インゴットで装備を強化（最大 +5）。銅+1・銀+3・金+5。'
              : '不要な装備を断片に変換。断片10個で銅インゴット1個になる。',
        }),
        f.jsx('div', {
          className: We.list,
          children:
            p.length === 0
              ? f.jsx('p', { className: We.empty, children: '所有している装備がありません。' })
              : p.map((y) => {
                  const S = ot[y.masterId],
                    q = y.forgeLevel >= pl.MAX_LEVEL;
                  return f.jsxs(
                    'div',
                    {
                      className: We.row,
                      children: [
                        f.jsxs('div', {
                          className: We.info,
                          children: [
                            f.jsx('span', { className: We.name, children: kr(y) }),
                            f.jsx('span', {
                              className: We.note,
                              children: S == null ? void 0 : S.slot,
                            }),
                          ],
                        }),
                        r === 'forge'
                          ? f.jsx('div', {
                              className: We.actions,
                              children: q
                                ? f.jsx('span', { className: We.maxed, children: '最大強化' })
                                : f.jsxs(f.Fragment, {
                                    children: [
                                      v(y.id, 'copper', '銅', d),
                                      v(y.id, 'silver', '銀', _),
                                      v(y.id, 'gold', '金', h),
                                    ],
                                  }),
                            })
                          : f.jsxs('button', {
                              type: 'button',
                              className: We.recycle,
                              onClick: () => void o((b) => Ob(b, y.id).save),
                              children: ['分解（断片+', pl.RECYCLE_FRAGMENTS, '）'],
                            }),
                      ],
                    },
                    y.id
                  );
                }),
        }),
        f.jsx('footer', {
          className: We.foot,
          children: f.jsx('button', {
            type: 'button',
            className: We.back,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  Q2 = '_layout_16au8_2',
  K2 = '_head_16au8_13',
  Z2 = '_title_16au8_20',
  J2 = '_count_16au8_26',
  P2 = '_create_16au8_31',
  W2 = '_sectionTitle_16au8_42',
  F2 = '_field_16au8_48',
  eS = '_primary_16au8_64',
  tS = '_list_16au8_79',
  lS = '_empty_16au8_83',
  aS = '_members_16au8_88',
  nS = '_member_16au8_88',
  iS = '_memberMain_16au8_107',
  sS = '_memberName_16au8_119',
  rS = '_pos_16au8_127',
  oS = '_memberSub_16au8_144',
  uS = '_posBtns_16au8_149',
  cS = '_posBtn_16au8_149',
  dS = '_posBtnActive_16au8_164',
  mS = '_foot_16au8_170',
  _S = '_sub_16au8_174',
  qe = {
    layout: Q2,
    head: K2,
    title: Z2,
    count: J2,
    create: P2,
    sectionTitle: W2,
    field: F2,
    primary: eS,
    list: tS,
    empty: lS,
    members: aS,
    member: nS,
    memberMain: iS,
    memberName: sS,
    pos: rS,
    pos_前衛: '_pos_前衛_16au8_136',
    pos_後衛: '_pos_後衛_16au8_140',
    memberSub: oS,
    posBtns: uS,
    posBtn: cS,
    posBtnActive: dS,
    foot: mS,
    sub: _S,
  };
function fS(l) {
  return [...l.guild.party.front, ...l.guild.party.back].filter((i) => i !== null).length;
}
const eg = (l) => (l === 'front' ? Cr : Nr);
function pS(l, i, o, r) {
  if (o < 0 || o >= eg(i) || (r !== null && !l.guild.members.some((_) => _.id === r))) return l;
  const c = l.guild.party.front.map((_) => (_ === r ? null : _)),
    d = l.guild.party.back.map((_) => (_ === r ? null : _));
  for (; c.length < Cr; ) c.push(null);
  for (; d.length < Nr; ) d.push(null);
  return (
    i === 'front' ? (c[o] = r) : (d[o] = r),
    { ...l, guild: { ...l.guild, party: { front: c, back: d } } }
  );
}
function tg(l, i) {
  const o = l.guild.party.front.map((c) => (c === i ? null : c)),
    r = l.guild.party.back.map((c) => (c === i ? null : c));
  return { ...l, guild: { ...l.guild, party: { front: o, back: r } } };
}
function Up(l, i, o) {
  if (
    !l.guild.members.some((h) => h.id === i) ||
    (o === 'front' ? l.guild.party.front : l.guild.party.back).includes(i)
  )
    return l;
  const c = tg(l, i),
    d = o === 'front' ? c.guild.party.front : c.guild.party.back;
  let _ = d.indexOf(null);
  if (_ < 0)
    if (d.length < eg(o)) _ = d.length;
    else return l;
  return pS(c, o, _, i);
}
function hS(l, i) {
  return l.guild.party.front.includes(i)
    ? '前衛'
    : l.guild.party.back.includes(i)
      ? '後衛'
      : '控え';
}
const gS = () => {
    const l = cl(),
      { save: i, applyAndPersist: o } = Ul(),
      r = Object.keys(bt),
      c = Object.keys(at),
      [d, _] = E.useState(''),
      [h, k] = E.useState(r[0]),
      [p, v] = E.useState(c[0]),
      [y, S] = E.useState(!1),
      q = E.useCallback(async () => {
        const C = d.trim() || '名もなき冒険者',
          T = zh({ raceId: h, classId: p, name: C });
        (S(!0), await o((A) => z1(A, T)), _(''), S(!1));
      }, [d, h, p, o]);
    if (!i) return f.jsx(rl, { to: '/title', replace: !0 });
    const { members: b } = i.guild,
      L = b.length >= bc;
    return f.jsxs('div', {
      className: qe.layout,
      children: [
        f.jsxs('header', {
          className: qe.head,
          children: [
            f.jsx('h1', { className: qe.title, children: 'ギルド管理' }),
            f.jsxs('span', { className: qe.count, children: ['団員 ', b.length, ' / ', bc] }),
          ],
        }),
        f.jsxs('section', {
          className: qe.create,
          children: [
            f.jsx('h2', { className: qe.sectionTitle, children: '冒険者を作成' }),
            f.jsxs('label', {
              className: qe.field,
              children: [
                f.jsx('span', { children: '名前' }),
                f.jsx('input', {
                  type: 'text',
                  value: d,
                  maxLength: 16,
                  placeholder: '名もなき冒険者',
                  onChange: (C) => _(C.target.value),
                }),
              ],
            }),
            f.jsxs('label', {
              className: qe.field,
              children: [
                f.jsx('span', { children: '種族' }),
                f.jsx('select', {
                  value: h,
                  onChange: (C) => k(C.target.value),
                  children: r.map((C) => f.jsx('option', { value: C, children: bt[C].name }, C)),
                }),
              ],
            }),
            f.jsxs('label', {
              className: qe.field,
              children: [
                f.jsx('span', { children: '職業' }),
                f.jsx('select', {
                  value: p,
                  onChange: (C) => v(C.target.value),
                  children: c.map((C) => f.jsx('option', { value: C, children: at[C].name }, C)),
                }),
              ],
            }),
            f.jsx('button', {
              type: 'button',
              className: qe.primary,
              disabled: y || L,
              onClick: () => void q(),
              children: L ? '団員が上限です' : '作成する',
            }),
          ],
        }),
        f.jsxs('section', {
          className: qe.list,
          children: [
            f.jsxs('h2', {
              className: qe.sectionTitle,
              children: [
                '団員一覧',
                ' ',
                f.jsxs('span', {
                  className: qe.count,
                  children: ['（出撃 ', fS(i), ' / ', bb, '）'],
                }),
              ],
            }),
            b.length === 0
              ? f.jsx('p', { className: qe.empty, children: 'まだ冒険者がいません。' })
              : f.jsx('ul', {
                  className: qe.members,
                  children: b.map((C) => {
                    var A, M;
                    const T = hS(i, C.id);
                    return f.jsxs(
                      'li',
                      {
                        className: qe.member,
                        children: [
                          f.jsxs('button', {
                            type: 'button',
                            className: qe.memberMain,
                            onClick: () => l(`/guild/char/${C.id}`),
                            children: [
                              f.jsxs('span', {
                                className: qe.memberName,
                                children: [
                                  C.name,
                                  f.jsx('span', {
                                    className: `${qe.pos} ${qe[`pos_${T}`] ?? ''}`,
                                    children: T,
                                  }),
                                ],
                              }),
                              f.jsxs('span', {
                                className: qe.memberSub,
                                children: [
                                  (A = bt[C.raceId]) == null ? void 0 : A.name,
                                  ' / ',
                                  (M = at[C.classId]) == null ? void 0 : M.name,
                                  ' / Lv',
                                  C.level,
                                  ' ›',
                                ],
                              }),
                            ],
                          }),
                          f.jsxs('div', {
                            className: qe.posBtns,
                            children: [
                              f.jsx('button', {
                                type: 'button',
                                className: `${qe.posBtn} ${T === '前衛' ? qe.posBtnActive : ''}`,
                                onClick: () => void o((P) => Up(P, C.id, 'front')),
                                children: '前',
                              }),
                              f.jsx('button', {
                                type: 'button',
                                className: `${qe.posBtn} ${T === '後衛' ? qe.posBtnActive : ''}`,
                                onClick: () => void o((P) => Up(P, C.id, 'back')),
                                children: '後',
                              }),
                              f.jsx('button', {
                                type: 'button',
                                className: `${qe.posBtn} ${T === '控え' ? qe.posBtnActive : ''}`,
                                onClick: () => void o((P) => tg(P, C.id)),
                                children: '控',
                              }),
                            ],
                          }),
                        ],
                      },
                      C.id
                    );
                  }),
                }),
          ],
        }),
        f.jsx('footer', {
          className: qe.foot,
          children: f.jsx('button', {
            type: 'button',
            className: qe.sub,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  kS = '_layout_c3v63_1',
  vS = '_head_c3v63_12',
  yS = '_title_c3v63_16',
  bS = '_sub_c3v63_22',
  xS = '_card_c3v63_27',
  SS = '_h2_c3v63_35',
  wS = '_sp_c3v63_44',
  TS = '_stats_c3v63_50',
  ES = '_equipSlot_c3v63_74',
  CS = '_equipHead_c3v63_82',
  NS = '_slotLabel_c3v63_88',
  AS = '_equipName_c3v63_95',
  LS = '_smallBtn_c3v63_100',
  jS = '_equipPick_c3v63_110',
  MS = '_pickBtn_c3v63_118',
  BS = '_jobRow_c3v63_185',
  qS = '_select_c3v63_192',
  OS = '_input_c3v63_193',
  IS = '_actBtn_c3v63_203',
  DS = '_warn_c3v63_220',
  RS = '_titleHave_c3v63_227',
  zS = '_titleOpts_c3v63_233',
  HS = '_titleBtn_c3v63_240',
  US = '_rbForm_c3v63_252',
  GS = '_danger_c3v63_258',
  $S = '_foot_c3v63_270',
  YS = '_back_c3v63_274',
  XS = '_skillTabs_c3v63_284',
  VS = '_skillTab_c3v63_284',
  QS = '_skillTabOn_c3v63_304',
  _e = {
    layout: kS,
    head: vS,
    title: yS,
    sub: bS,
    card: xS,
    h2: SS,
    sp: wS,
    stats: TS,
    equipSlot: ES,
    equipHead: CS,
    slotLabel: NS,
    equipName: AS,
    smallBtn: LS,
    equipPick: jS,
    pickBtn: MS,
    jobRow: BS,
    select: qS,
    input: OS,
    actBtn: IS,
    warn: DS,
    titleHave: RS,
    titleOpts: zS,
    titleBtn: HS,
    rbForm: US,
    danger: GS,
    foot: $S,
    back: YS,
    skillTabs: XS,
    skillTab: VS,
    skillTabOn: QS,
  },
  lg = ['weapon', 'armor', 'accessory'];
function ag(l, i, o) {
  return { ...l, guild: { ...l.guild, members: l.guild.members.map((r) => (r.id === i ? o : r)) } };
}
function KS(l) {
  var i, o;
  return (o = (i = at[l]) == null ? void 0 : i.skillTree.skills[0]) == null ? void 0 : o.skillId;
}
function ZS(l) {
  var i;
  return new Set(
    (((i = bt[l]) == null ? void 0 : i.raceSkillTree.skills) ?? []).map((o) => o.skillId)
  );
}
const JS = (l, i) => {
  const o = { ...l };
  let r = 0;
  for (const [c, d] of Object.entries(i)) r += Mr(o, c) * d;
  return r;
};
function PS(l, i) {
  if (!at[i]) return l;
  const o = ZS(l.raceId);
  let r = {};
  for (const [p, v] of Object.entries(l.learnedSkills)) o.has(p) && (r[p] = v);
  const c = KS(i);
  c && !r[c] && (r[c] = 1);
  const d = Math.max(1, l.level - uh),
    _ = hr(d),
    h = { ...l, classId: i, titleId: null, learnedSkills: r };
  let k = JS(h, r) - (c && r[c] ? Mr(h, c) : 0);
  return (
    k > _ && ((r = c ? { [c]: 1 } : {}), (k = 0)),
    {
      ...l,
      classId: i,
      titleId: null,
      level: d,
      exp: 0,
      learnedSkills: r,
      skillPoints: { total: _, spent: k },
    }
  );
}
function WS(l, i, o) {
  const r = l.guild.members.find((_) => _.id === i);
  if (!r) return l;
  let c = ag(l, i, PS(r, o));
  const d = c.guild.members.find((_) => _.id === i);
  for (const _ of lg) {
    const h = d.equipment[_];
    h && !Vc(d, h.masterId) && (c = Qc(c, i, _));
  }
  return c;
}
const FS = [
  { min: 30, max: 34, allStats: 2, bonusSp: 4 },
  { min: 35, max: 39, allStats: 3, bonusSp: 4 },
  { min: 40, max: 44, allStats: 4, bonusSp: 5 },
  { min: 45, max: 49, allStats: 5, bonusSp: 5 },
  { min: 50, max: 54, allStats: 6, bonusSp: 6 },
  { min: 55, max: 59, allStats: 7, bonusSp: 6 },
  { min: 60, max: 64, allStats: 8, bonusSp: 7 },
  { min: 65, max: 69, allStats: 9, bonusSp: 7 },
  { min: 70, max: 99, allStats: 10, bonusSp: 8 },
  { min: 100, max: 100, allStats: 20, bonusSp: 10 },
];
function e5(l) {
  const i = FS.find((o) => l >= o.min && l <= o.max);
  return i ? { allStats: i.allStats, bonusSp: i.bonusSp } : null;
}
function ng(l) {
  return l.level >= Mi.REBIRTH_MIN_LEVEL;
}
function t5(l, i) {
  const o = e5(l.level);
  if (!o) return l;
  const r = Math.min(30, Math.floor(l.level / 2)),
    c = zh({ ...i, id: l.id }),
    d = hr(r) + o.bonusSp;
  return {
    ...c,
    level: Math.max(1, r),
    exp: 0,
    rebirthBonus: o,
    skillPoints: { total: d, spent: c.skillPoints.spent },
  };
}
function l5(l, i, o) {
  const r = l.guild.members.find((_) => _.id === i);
  if (!r || !ng(r)) return l;
  let c = l;
  for (const _ of lg) r.equipment[_] && (c = Qc(c, i, _));
  const d = c.guild.members.find((_) => _.id === i);
  return ag(c, i, t5(d, o));
}
function ig(l, i, o) {
  var c;
  return o < Mi.TITLE_DEPTH || l.titleId
    ? !1
    : (((c = at[l.classId]) == null ? void 0 : c.titleOptions) ?? []).includes(i);
}
function a5(l, i, o) {
  return ig(l, i, o)
    ? { ...l, titleId: i, skillPoints: { ...l.skillPoints, total: l.skillPoints.total + xb } }
    : l;
}
const Gp = Object.keys(bt),
  ur = Object.keys(at),
  n5 = ['weapon', 'armor', 'accessory'],
  i5 = { weapon: '武器', armor: '防具', accessory: '装飾' },
  s5 = [
    { key: 'hp', label: 'HP' },
    { key: 'tp', label: 'TP' },
    { key: 'str', label: 'STR' },
    { key: 'vit', label: 'VIT' },
    { key: 'agi', label: 'AGI' },
    { key: 'int', label: 'INT' },
    { key: 'mnd', label: 'MND' },
    { key: 'luc', label: 'LUC' },
  ],
  r5 = () => {
    var V, H, W, ne, te, oe, fe, ke, xe, he;
    const l = cl(),
      { id: i } = C0(),
      { save: o, applyAndPersist: r } = Ul(),
      [c, d] = E.useState('class'),
      [_, h] = E.useState(ur[0]),
      [k, p] = E.useState(''),
      [v, y] = E.useState(Gp[0]),
      [S, q] = E.useState(ur[0]),
      [b, L] = E.useState(!1);
    if (!o) return f.jsx(rl, { to: '/title', replace: !0 });
    const C = o.guild.members.find((j) => j.id === i);
    if (!C || !i) return f.jsx(rl, { to: '/guild', replace: !0 });
    const T = qa(C),
      A = Sr(C),
      M = o.towerState.record.deepestReached,
      P = (j) =>
        r((Q) => ({
          ...Q,
          guild: { ...Q.guild, members: Q.guild.members.map((U) => (U.id === i ? j(U) : U)) },
        }));
    return f.jsxs('div', {
      className: _e.layout,
      children: [
        f.jsxs('header', {
          className: _e.head,
          children: [
            f.jsx('h1', { className: _e.title, children: C.name }),
            f.jsxs('span', {
              className: _e.sub,
              children: [
                (V = bt[C.raceId]) == null ? void 0 : V.name,
                ' / ',
                (H = at[C.classId]) == null ? void 0 : H.name,
                ' / Lv',
                C.level,
              ],
            }),
          ],
        }),
        f.jsxs('section', {
          className: _e.card,
          children: [
            f.jsx('h2', { className: _e.h2, children: 'ステータス' }),
            f.jsx('dl', {
              className: _e.stats,
              children: s5.map((j) =>
                f.jsxs(
                  'div',
                  {
                    children: [
                      f.jsx('dt', { children: j.label }),
                      f.jsx('dd', { children: T[j.key] }),
                    ],
                  },
                  j.key
                )
              ),
            }),
          ],
        }),
        f.jsxs('section', {
          className: _e.card,
          children: [
            f.jsx('h2', { className: _e.h2, children: '装備' }),
            n5.map((j) => {
              const Q = C.equipment[j],
                U = o.guild.equipment.filter((K) => {
                  var ie;
                  return (
                    ((ie = ot[K.masterId]) == null ? void 0 : ie.slot) === j && Vc(C, K.masterId)
                  );
                });
              return f.jsxs(
                'div',
                {
                  className: _e.equipSlot,
                  children: [
                    f.jsxs('div', {
                      className: _e.equipHead,
                      children: [
                        f.jsx('span', { className: _e.slotLabel, children: i5[j] }),
                        f.jsx('span', {
                          className: _e.equipName,
                          children: Q ? kr(Q) : '（なし）',
                        }),
                        Q
                          ? f.jsx('button', {
                              type: 'button',
                              className: _e.smallBtn,
                              onClick: () => void J(j),
                              children: '外す',
                            })
                          : null,
                      ],
                    }),
                    U.length > 0
                      ? f.jsx('div', {
                          className: _e.equipPick,
                          children: U.map((K) =>
                            f.jsxs(
                              'button',
                              {
                                type: 'button',
                                className: _e.pickBtn,
                                onClick: () => void r((ie) => Rb(ie, i, K.id)),
                                children: [kr(K), ' 装備'],
                              },
                              K.id
                            )
                          ),
                        })
                      : null,
                  ],
                },
                j
              );
            }),
          ],
        }),
        f.jsxs('section', {
          className: _e.card,
          children: [
            f.jsxs('h2', {
              className: _e.h2,
              children: ['スキル ', f.jsxs('span', { className: _e.sp, children: ['SP ', A] })],
            }),
            f.jsxs('div', {
              className: _e.skillTabs,
              children: [
                f.jsxs('button', {
                  type: 'button',
                  className: `${_e.skillTab} ${c === 'class' ? _e.skillTabOn : ''}`,
                  onClick: () => d('class'),
                  children: ['職業（', ((W = at[C.classId]) == null ? void 0 : W.name) ?? '', '）'],
                }),
                f.jsxs('button', {
                  type: 'button',
                  className: `${_e.skillTab} ${c === 'race' ? _e.skillTabOn : ''}`,
                  onClick: () => d('race'),
                  children: [
                    '種族（',
                    ((ne = bt[C.raceId]) == null ? void 0 : ne.name) ?? '',
                    '）',
                  ],
                }),
                C.titleId
                  ? f.jsxs('button', {
                      type: 'button',
                      className: `${_e.skillTab} ${c === 'title' ? _e.skillTabOn : ''}`,
                      onClick: () => d('title'),
                      children: [
                        '称号（',
                        ((te = Rl[C.titleId]) == null ? void 0 : te.name) ?? '',
                        '）',
                      ],
                    })
                  : null,
              ],
            }),
            f.jsx(Jh, {
              nodes:
                c === 'class'
                  ? (((oe = at[C.classId]) == null ? void 0 : oe.skillTree.skills) ?? [])
                  : c === 'race'
                    ? (((fe = bt[C.raceId]) == null ? void 0 : fe.raceSkillTree.skills) ?? [])
                    : C.titleId
                      ? (((ke = Rl[C.titleId]) == null ? void 0 : ke.skillTree.skills) ?? [])
                      : [],
              char: C,
              onLearn: (j) => void P((Q) => Zh(Q, j)),
            }),
          ],
        }),
        f.jsxs('section', {
          className: _e.card,
          children: [
            f.jsx('h2', { className: _e.h2, children: '転職' }),
            f.jsxs('div', {
              className: _e.jobRow,
              children: [
                f.jsx('select', {
                  className: _e.select,
                  value: _,
                  onChange: (j) => h(j.target.value),
                  children: ur.map((j) => f.jsx('option', { value: j, children: at[j].name }, j)),
                }),
                f.jsx('button', {
                  type: 'button',
                  className: _e.actBtn,
                  disabled: _ === C.classId,
                  onClick: () => void r((j) => WS(j, i, _)),
                  children: '転職する',
                }),
              ],
            }),
            f.jsxs('p', {
              className: _e.warn,
              children: [
                '※ レベルが ',
                uh,
                ' ',
                '下がり、職業/称号スキルは振り直しになります（種族スキルは保持）。',
              ],
            }),
            f.jsx('h2', { className: _e.h2, children: '称号' }),
            C.titleId
              ? f.jsxs('p', {
                  className: _e.titleHave,
                  children: ['習得済み: ', (xe = Rl[C.titleId]) == null ? void 0 : xe.name],
                })
              : M < Mi.TITLE_DEPTH
                ? f.jsxs('p', {
                    className: _e.warn,
                    children: ['第 ', Mi.TITLE_DEPTH, ' 階到達で習得できます（現在 ', M, 'F）。'],
                  })
                : f.jsx('div', {
                    className: _e.titleOpts,
                    children: (((he = at[C.classId]) == null ? void 0 : he.titleOptions) ?? []).map(
                      (j) => {
                        var Q;
                        return f.jsxs(
                          'button',
                          {
                            type: 'button',
                            className: _e.titleBtn,
                            disabled: !ig(C, j, M),
                            onClick: () => void P((U) => a5(U, j, M)),
                            children: [(Q = Rl[j]) == null ? void 0 : Q.name, '（SP+5）'],
                          },
                          j
                        );
                      }
                    ),
                  }),
            f.jsx('h2', { className: _e.h2, children: '転生' }),
            ng(C)
              ? b
                ? f.jsxs('div', {
                    className: _e.rbForm,
                    children: [
                      f.jsxs('p', {
                        className: _e.warn,
                        children: [
                          '※ 作り直して強い新人になります（開始Lv ',
                          Math.min(30, Math.floor(C.level / 2)),
                          '・ボーナス付き）。',
                        ],
                      }),
                      f.jsx('input', {
                        className: _e.input,
                        type: 'text',
                        maxLength: 16,
                        placeholder: C.name,
                        value: k,
                        onChange: (j) => p(j.target.value),
                      }),
                      f.jsxs('div', {
                        className: _e.jobRow,
                        children: [
                          f.jsx('select', {
                            className: _e.select,
                            value: v,
                            onChange: (j) => y(j.target.value),
                            children: Gp.map((j) =>
                              f.jsx('option', { value: j, children: bt[j].name }, j)
                            ),
                          }),
                          f.jsx('select', {
                            className: _e.select,
                            value: S,
                            onChange: (j) => q(j.target.value),
                            children: ur.map((j) =>
                              f.jsx('option', { value: j, children: at[j].name }, j)
                            ),
                          }),
                        ],
                      }),
                      f.jsxs('div', {
                        className: _e.jobRow,
                        children: [
                          f.jsx('button', {
                            type: 'button',
                            className: _e.danger,
                            onClick: () => {
                              (r((j) =>
                                l5(j, i, { raceId: v, classId: S, name: k.trim() || C.name })
                              ),
                                L(!1));
                            },
                            children: '転生を実行',
                          }),
                          f.jsx('button', {
                            type: 'button',
                            className: _e.actBtn,
                            onClick: () => L(!1),
                            children: 'やめる',
                          }),
                        ],
                      }),
                    ],
                  })
                : f.jsx('button', {
                    type: 'button',
                    className: _e.actBtn,
                    onClick: () => L(!0),
                    children: '転生する…',
                  })
              : f.jsxs('p', {
                  className: _e.warn,
                  children: [
                    'Lv',
                    Mi.REBIRTH_MIN_LEVEL,
                    ' 以上で転生できます（現在 Lv',
                    C.level,
                    '）。',
                  ],
                }),
          ],
        }),
        f.jsx('footer', {
          className: _e.foot,
          children: f.jsx('button', {
            type: 'button',
            className: _e.back,
            onClick: () => l('/guild'),
            children: 'もどる',
          }),
        }),
      ],
    });
    function J(j) {
      return r((Q) => Qc(Q, i, j));
    }
  },
  o5 = () => f.jsx('div', { children: f.jsx('h1', { children: 'Not Found' }) }),
  u5 = '_layout_1u0ua_1',
  c5 = '_head_1u0ua_11',
  d5 = '_title_1u0ua_18',
  m5 = '_gold_1u0ua_24',
  _5 = '_tabs_1u0ua_29',
  f5 = '_tab_1u0ua_29',
  p5 = '_tabActive_1u0ua_46',
  h5 = '_list_1u0ua_51',
  g5 = '_row_1u0ua_59',
  k5 = '_info_1u0ua_70',
  v5 = '_name_1u0ua_76',
  y5 = '_note_1u0ua_81',
  b5 = '_action_1u0ua_86',
  x5 = '_empty_1u0ua_103',
  S5 = '_foot_1u0ua_108',
  w5 = '_back_1u0ua_112',
  He = {
    layout: u5,
    head: c5,
    title: d5,
    gold: m5,
    tabs: _5,
    tab: f5,
    tabActive: p5,
    list: h5,
    row: g5,
    info: k5,
    name: v5,
    note: y5,
    action: b5,
    empty: x5,
    foot: S5,
    back: w5,
  };
function T5(l) {
  return Math.max(0, Math.floor(l.towerState.record.deepestReached / 10));
}
const sg = {
    item_slime_jelly: ['equip_slime_shield'],
    item_rat_tail: ['equip_rat_dagger'],
    item_bat_wing: ['equip_bat_cloak'],
    item_golem_core: ['equip_golem_blade'],
    item_mat_t1_coarse_hide: ['equip_t2_light'],
    item_mat_t1_lord_pelt: ['equip_t2_sword', 'equip_t2_heavy'],
    item_mat_t2_frost_pelt: ['equip_t3_light'],
    item_mat_t2_monarch_diadem: ['equip_t3_staff', 'equip_t3_clothes'],
    item_mat_t3_charged_hide: ['equip_t4_light'],
    item_mat_t3_sovereign_horn: ['equip_t4_sword', 'equip_t4_heavy'],
    item_mat_t4_corroded_plate: ['equip_t5_light'],
    item_mat_t4_sovereign_crown: ['equip_t5_sword', 'equip_t5_heavy'],
  },
  E5 = (l, i = 1) => {
    const o = ph(l, i),
      r = [];
    return (
      o.atk && r.push(`ATK+${o.atk}`),
      o.mat && r.push(`MAT+${o.mat}`),
      o.def && r.push(`DEF+${o.def}`),
      o.mdf && r.push(`MDF+${o.mdf}`),
      r.join(' ')
    );
  };
function rg(l, i) {
  var o;
  return ((o = l.shopStock.unlockedGrades) == null ? void 0 : o[i]) ?? 1;
}
function C5(l) {
  const i = T5(l),
    o = new Set(l.shopStock.unlockedItemIds),
    r = Object.values(Fe)
      .filter((d) => d.buyPrice > 0)
      .map((d) => ({ id: d.id, name: d.name, price: d.buyPrice, kind: 'item' }));
  return [
    ...Object.values(ot)
      .filter((d) => d.tier <= i || o.has(d.id))
      .map((d) => {
        const _ = rg(l, d.id);
        return {
          id: d.id,
          name: _ > 1 ? `${d.name} Lv${_}` : d.name,
          price: Math.round(d.buyPrice * Nn(_)),
          kind: 'equip',
          note: E5(d.id, _),
        };
      }),
    ...r,
  ];
}
function N5(l) {
  return sg[l] ?? [];
}
function A5(l, i = 1) {
  return Fe[l] ? Fe[l].buyPrice : ot[l] ? Math.round(ot[l].buyPrice * Nn(i)) : null;
}
function Mc(l, i = 1) {
  return Fe[l]
    ? Math.round(kb(Fe[l]) * Nn(i))
    : ot[l]
      ? Math.floor((ot[l].buyPrice * Nn(i)) / 2)
      : 0;
}
function L5(l, i) {
  const o = ot[i] ? rg(l, i) : 1,
    r = A5(i, o);
  if (r === null || r <= 0 || l.guild.gold < r) return l;
  const c = ot[i] ? Db(l, i, 0, o) : $c(l, i, 1);
  return { ...c, guild: { ...c.guild, gold: c.guild.gold - r } };
}
function og(l) {
  var o;
  const i = (((o = ot[l.masterId]) == null ? void 0 : o.buyPrice) ?? 0) * Nn(l.grade);
  return Math.floor(i / 2) + l.forgeLevel * 10;
}
function j5(l, i) {
  const o = l.guild.equipment.find((d) => d.id === i);
  if (!o) return l;
  const r = og(o),
    c = l.guild.equipment.filter((d) => d.id !== i);
  return { ...l, guild: { ...l.guild, equipment: c, gold: l.guild.gold + r } };
}
function M5(l, i, o = 1, r = 1) {
  if (
    l.guild.storage
      .filter((v) => v.itemId === i && (v.grade ?? 1) === r)
      .reduce((v, y) => v + y.qty, 0) < o
  )
    return l;
  const d = Mc(i, r) * o,
    _ = Yc(l, i, o, r),
    h = N5(i),
    k = [
      ..._.shopStock.unlockedItemIds,
      ...h.filter((v) => !_.shopStock.unlockedItemIds.includes(v)),
    ],
    p = { ...(_.shopStock.unlockedGrades ?? {}) };
  for (const v of h) p[v] = Math.max(p[v] ?? 1, r);
  return {
    ..._,
    guild: { ..._.guild, gold: _.guild.gold + d },
    shopStock: { ..._.shopStock, unlockedItemIds: k, unlockedGrades: p },
  };
}
const B5 = () => {
    const l = cl(),
      { save: i, applyAndPersist: o } = Ul(),
      [r, c] = E.useState('buy');
    if (!i) return f.jsx(rl, { to: '/title', replace: !0 });
    const d = i.guild.gold,
      _ = C5(i),
      h = i.guild.storage.filter((y) => Mc(y.itemId, y.grade ?? 1) > 0),
      k = i.guild.equipment,
      p = h.length === 0 && k.length === 0,
      v = (y, S = 1) => {
        var b, L;
        const q =
          ((b = Fe[y]) == null ? void 0 : b.name) ?? ((L = ot[y]) == null ? void 0 : L.name) ?? y;
        return S > 1 ? `${q} Lv${S}` : q;
      };
    return f.jsxs('div', {
      className: He.layout,
      children: [
        f.jsxs('header', {
          className: He.head,
          children: [
            f.jsx('h1', { className: He.title, children: 'ショップ' }),
            f.jsxs('span', { className: He.gold, children: [d, ' G'] }),
          ],
        }),
        f.jsxs('div', {
          className: He.tabs,
          children: [
            f.jsx('button', {
              type: 'button',
              className: `${He.tab} ${r === 'buy' ? He.tabActive : ''}`,
              onClick: () => c('buy'),
              children: '買う',
            }),
            f.jsx('button', {
              type: 'button',
              className: `${He.tab} ${r === 'sell' ? He.tabActive : ''}`,
              onClick: () => c('sell'),
              children: '売る',
            }),
          ],
        }),
        f.jsx('div', {
          className: He.list,
          children:
            r === 'buy'
              ? _.map((y) =>
                  f.jsxs(
                    'div',
                    {
                      className: He.row,
                      children: [
                        f.jsxs('div', {
                          className: He.info,
                          children: [
                            f.jsx('span', { className: He.name, children: y.name }),
                            y.note ? f.jsx('span', { className: He.note, children: y.note }) : null,
                          ],
                        }),
                        f.jsxs('button', {
                          type: 'button',
                          className: He.action,
                          disabled: d < y.price,
                          onClick: () => void o((S) => L5(S, y.id)),
                          children: [y.price, ' G'],
                        }),
                      ],
                    },
                    y.id
                  )
                )
              : p
                ? f.jsx('p', { className: He.empty, children: '売れる物がありません。' })
                : f.jsxs(f.Fragment, {
                    children: [
                      k.map((y) =>
                        f.jsxs(
                          'div',
                          {
                            className: He.row,
                            children: [
                              f.jsxs('div', {
                                className: He.info,
                                children: [
                                  f.jsx('span', { className: He.name, children: kr(y) }),
                                  f.jsx('span', { className: He.note, children: '装備' }),
                                ],
                              }),
                              f.jsxs('button', {
                                type: 'button',
                                className: He.action,
                                onClick: () => void o((S) => j5(S, y.id)),
                                children: ['売却 ', og(y), ' G'],
                              }),
                            ],
                          },
                          y.id
                        )
                      ),
                      h.map((y) =>
                        f.jsxs(
                          'div',
                          {
                            className: He.row,
                            children: [
                              f.jsxs('div', {
                                className: He.info,
                                children: [
                                  f.jsx('span', {
                                    className: He.name,
                                    children: v(y.itemId, y.grade ?? 1),
                                  }),
                                  f.jsxs('span', {
                                    className: He.note,
                                    children: ['所持 ', y.qty],
                                  }),
                                ],
                              }),
                              f.jsxs('button', {
                                type: 'button',
                                className: He.action,
                                onClick: () => void o((S) => M5(S, y.itemId, 1, y.grade ?? 1)),
                                children: ['売却 ', Mc(y.itemId, y.grade ?? 1), ' G'],
                              }),
                            ],
                          },
                          `${y.itemId}_${y.grade ?? 1}`
                        )
                      ),
                    ],
                  }),
        }),
        f.jsx('footer', {
          className: He.foot,
          children: f.jsx('button', {
            type: 'button',
            className: He.back,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  q5 = '_layout_1xkiw_1',
  O5 = '_head_1xkiw_12',
  I5 = '_title_1xkiw_17',
  D5 = '_subtitle_1xkiw_24',
  R5 = '_body_1xkiw_30',
  z5 = '_menu_1xkiw_34',
  H5 = '_loading_1xkiw_40',
  U5 = '_warn_1xkiw_45',
  G5 = '_danger_1xkiw_52',
  $5 = '_dialog_1xkiw_67',
  Y5 = '_dialogTitle_1xkiw_77',
  X5 = '_field_1xkiw_82',
  V5 = '_note_1xkiw_96',
  Q5 = '_dialogActions_1xkiw_102',
  K5 = '_primary_1xkiw_107',
  Z5 = '_sub_1xkiw_24',
  J5 = '_foot_1xkiw_132',
  Ze = {
    layout: q5,
    head: O5,
    title: I5,
    subtitle: D5,
    body: R5,
    menu: z5,
    loading: H5,
    warn: U5,
    danger: G5,
    dialog: $5,
    dialogTitle: Y5,
    field: X5,
    note: V5,
    dialogActions: Q5,
    primary: K5,
    sub: Z5,
    foot: J5,
  },
  P5 = '_card_3vsn6_1',
  W5 = '_corrupted_3vsn6_14',
  F5 = '_corruptedText_3vsn6_19',
  ew = '_corruptedNote_3vsn6_25',
  tw = '_guildName_3vsn6_31',
  lw = '_meta_3vsn6_36',
  _a = {
    card: P5,
    corrupted: W5,
    corruptedText: F5,
    corruptedNote: ew,
    guildName: tw,
    meta: lw,
    continue: '_continue_3vsn6_56',
  },
  aw = (l) => {
    if (!l) return '-';
    const i = new Date(l),
      o = (r) => String(r).padStart(2, '0');
    return `${i.getFullYear()}/${o(i.getMonth() + 1)}/${o(i.getDate())} ${o(i.getHours())}:${o(i.getMinutes())}`;
  },
  nw = ({ meta: l, onContinue: i }) =>
    l.corrupted
      ? f.jsxs('div', {
          className: `${_a.card} ${_a.corrupted}`,
          children: [
            f.jsx('div', { className: _a.corruptedText, children: 'セーブデータが破損しています' }),
            f.jsx('p', {
              className: _a.corruptedNote,
              children: '「最初から」で新しく始められます。',
            }),
          ],
        })
      : f.jsxs('div', {
          className: _a.card,
          children: [
            f.jsx('div', { className: _a.guildName, children: l.guildName }),
            f.jsxs('dl', {
              className: _a.meta,
              children: [
                f.jsxs('div', {
                  children: [
                    f.jsx('dt', { children: '最高到達階' }),
                    f.jsx('dd', {
                      children: l.deepestReached > 0 ? `${l.deepestReached}F` : '未踏破',
                    }),
                  ],
                }),
                f.jsxs('div', {
                  children: [
                    f.jsx('dt', { children: '団員' }),
                    f.jsxs('dd', { children: [l.memberCount, '人'] }),
                  ],
                }),
                f.jsxs('div', {
                  children: [
                    f.jsx('dt', { children: '最終セーブ' }),
                    f.jsx('dd', { children: aw(l.savedAt) }),
                  ],
                }),
              ],
            }),
            f.jsx('button', {
              type: 'button',
              className: _a.continue,
              onClick: i,
              children: 'つづきから',
            }),
          ],
        }),
  iw = () => {
    const l = cl(),
      { startNewGame: i, continueGame: o } = Ul(),
      [r, c] = E.useState(null),
      [d, _] = E.useState(!0),
      [h, k] = E.useState('menu'),
      [p, v] = E.useState(''),
      [y, S] = E.useState(!1);
    E.useEffect(() => {
      (async () => (c(await rx()), _(!1)))();
    }, []);
    const q = r !== null && !r.corrupted,
      b = E.useCallback(async () => {
        S(!0);
        const T = await o();
        (S(!1), T.ok && l('/town'));
      }, [o, l]),
      L = E.useCallback(() => {
        (v(''), k(q ? 'confirm' : 'guildName'));
      }, [q]),
      C = E.useCallback(async () => {
        const T = p.trim() || 'ななしのギルド';
        (S(!0), await i(T), S(!1), l('/town'));
      }, [p, i, l]);
    return f.jsxs('div', {
      className: Ze.layout,
      children: [
        f.jsxs('header', {
          className: Ze.head,
          children: [
            f.jsx('h1', { className: Ze.title, children: '世界樹ライク' }),
            f.jsx('p', { className: Ze.subtitle, children: '無限タワー探索 RPG' }),
          ],
        }),
        f.jsx('main', {
          className: Ze.body,
          children: d
            ? f.jsx('p', { className: Ze.loading, children: '読み込み中...' })
            : h === 'guildName'
              ? f.jsxs('div', {
                  className: Ze.dialog,
                  children: [
                    f.jsx('h2', { className: Ze.dialogTitle, children: '新しいギルド' }),
                    f.jsxs('label', {
                      className: Ze.field,
                      children: [
                        f.jsx('span', { children: 'ギルド名' }),
                        f.jsx('input', {
                          type: 'text',
                          value: p,
                          maxLength: 16,
                          placeholder: 'ななしのギルド',
                          onChange: (T) => v(T.target.value),
                          autoFocus: !0,
                        }),
                      ],
                    }),
                    f.jsx('p', {
                      className: Ze.note,
                      children:
                        '冒険者はまだいません。開始後、ギルドメニューで仲間を作成してください。',
                    }),
                    f.jsxs('div', {
                      className: Ze.dialogActions,
                      children: [
                        f.jsx('button', {
                          type: 'button',
                          className: Ze.primary,
                          disabled: y,
                          onClick: C,
                          children: 'はじめる',
                        }),
                        f.jsx('button', {
                          type: 'button',
                          className: Ze.sub,
                          disabled: y,
                          onClick: () => k('menu'),
                          children: 'もどる',
                        }),
                      ],
                    }),
                  ],
                })
              : h === 'confirm'
                ? f.jsxs('div', {
                    className: Ze.dialog,
                    children: [
                      f.jsx('h2', { className: Ze.dialogTitle, children: '最初から始めますか？' }),
                      f.jsxs('p', {
                        className: Ze.warn,
                        children: [
                          '現在のセーブデータ「',
                          r == null ? void 0 : r.guildName,
                          '」は上書きされ、元に戻せません。',
                        ],
                      }),
                      f.jsxs('div', {
                        className: Ze.dialogActions,
                        children: [
                          f.jsx('button', {
                            type: 'button',
                            className: Ze.danger,
                            disabled: y,
                            onClick: () => k('guildName'),
                            children: 'データを消して始める',
                          }),
                          f.jsx('button', {
                            type: 'button',
                            className: Ze.sub,
                            disabled: y,
                            onClick: () => k('menu'),
                            children: 'もどる',
                          }),
                        ],
                      }),
                    ],
                  })
                : f.jsxs('div', {
                    className: Ze.menu,
                    children: [
                      r !== null && f.jsx(nw, { meta: r, onContinue: () => void b() }),
                      f.jsx('button', {
                        type: 'button',
                        className: q ? Ze.sub : Ze.primary,
                        onClick: L,
                        children: '最初から',
                      }),
                    ],
                  }),
        }),
        f.jsxs('footer', { className: Ze.foot, children: ['v', '0.1.29'] }),
      ],
    });
  },
  sw = '_layout_uxqv8_1',
  rw = '_head_uxqv8_12',
  ow = '_guildName_uxqv8_16',
  uw = '_stats_uxqv8_21',
  cw = '_hint_uxqv8_40',
  dw = '_menu_uxqv8_50',
  mw = '_foot_uxqv8_57',
  _w = '_exit_uxqv8_61',
  fw = '_warpOverlay_uxqv8_72',
  pw = '_warpPanel_uxqv8_83',
  hw = '_warpTitle_uxqv8_94',
  gw = '_warpBtn_uxqv8_99',
  kw = '_warpClose_uxqv8_110',
  Ht = {
    layout: sw,
    head: rw,
    guildName: ow,
    stats: uw,
    hint: cw,
    menu: dw,
    foot: mw,
    exit: _w,
    warpOverlay: fw,
    warpPanel: pw,
    warpTitle: hw,
    warpBtn: gw,
    warpClose: kw,
  },
  vw = '_button_1tp4a_1',
  yw = '_primary_1tp4a_26',
  bw = '_label_1tp4a_32',
  xw = '_description_1tp4a_37',
  cr = { button: vw, primary: yw, label: bw, description: xw },
  wn = ({ label: l, description: i, variant: o = 'default', disabled: r = !1, onClick: c }) =>
    f.jsxs('button', {
      type: 'button',
      className: `${cr.button} ${o === 'primary' ? cr.primary : ''}`,
      disabled: r,
      onClick: c,
      children: [
        f.jsx('span', { className: cr.label, children: l }),
        i ? f.jsx('span', { className: cr.description, children: i }) : null,
      ],
    }),
  Sw = () => {
    const l = cl(),
      { save: i, exitToTitle: o, applyAndPersist: r } = Ul(),
      [c, d] = E.useState(!1);
    if (!i) return f.jsx(rl, { to: '/title', replace: !0 });
    const { guild: _, towerState: h, diveState: k } = i,
      p = _.members.length > 0,
      v = () => {
        (o(), l('/title'));
      },
      y = async () => {
        (k || (await r((b) => Cp(b, 1))), l('/dungeon'));
      },
      S = h.warp.unlockedCheckpoints,
      q = async (b) => {
        (d(!1), await r((L) => Cp(L, b)), l('/dungeon'));
      };
    return f.jsxs('div', {
      className: Ht.layout,
      children: [
        f.jsxs('header', {
          className: Ht.head,
          children: [
            f.jsx('div', { className: Ht.guildName, children: _.name }),
            f.jsxs('dl', {
              className: Ht.stats,
              children: [
                f.jsxs('div', {
                  children: [
                    f.jsx('dt', { children: '所持金' }),
                    f.jsxs('dd', { children: [_.gold, ' G'] }),
                  ],
                }),
                f.jsxs('div', {
                  children: [
                    f.jsx('dt', { children: '最高到達' }),
                    f.jsx('dd', {
                      children: h.record.deepestReached > 0 ? `${h.record.deepestReached}F` : '-',
                    }),
                  ],
                }),
                f.jsxs('div', {
                  children: [
                    f.jsx('dt', { children: '団員' }),
                    f.jsxs('dd', { children: [_.members.length, '人'] }),
                  ],
                }),
              ],
            }),
          ],
        }),
        !p &&
          f.jsx('p', {
            className: Ht.hint,
            children:
              'まずは「ギルド管理」で冒険者を作成してください。団員がいないとダイブできません。',
          }),
        f.jsxs('main', {
          className: Ht.menu,
          children: [
            f.jsx(wn, {
              label: k ? '潜行を再開' : 'ダイブ開始',
              description: p
                ? k
                  ? `${k.depth}F から再開`
                  : '第1階からタワーへ潜る'
                : '団員が必要です',
              variant: 'primary',
              disabled: !p,
              onClick: () => void y(),
            }),
            f.jsx(wn, {
              label: 'ワープ',
              description:
                S.length === 0
                  ? 'ボス撃破で解放'
                  : k
                    ? '潜行中は使えません'
                    : `解放済み: ${S.map((b) => `${b}F`).join('・')}`,
              disabled: !p || S.length === 0 || !!k,
              onClick: () => d(!0),
            }),
            f.jsx(wn, {
              label: 'ギルド管理',
              description: '編成・キャラ作成',
              onClick: () => l('/guild'),
            }),
            f.jsx(wn, {
              label: 'ショップ',
              description: '装備・アイテム売買',
              onClick: () => l('/shop'),
            }),
            f.jsx(wn, {
              label: '鍛冶屋',
              description: '装備の強化・リサイクル',
              onClick: () => l('/forge'),
            }),
            f.jsx(wn, {
              label: '図鑑 / 記録',
              description: '到達記録・モンスター図鑑',
              onClick: () => l('/codex'),
            }),
          ],
        }),
        f.jsx('footer', {
          className: Ht.foot,
          children: f.jsx('button', {
            type: 'button',
            className: Ht.exit,
            onClick: v,
            children: 'タイトルへ戻る',
          }),
        }),
        c
          ? f.jsx('div', {
              className: Ht.warpOverlay,
              onClick: () => d(!1),
              children: f.jsxs('div', {
                className: Ht.warpPanel,
                onClick: (b) => b.stopPropagation(),
                children: [
                  f.jsx('div', { className: Ht.warpTitle, children: 'ワープ先を選択' }),
                  S.map((b) =>
                    f.jsxs(
                      'button',
                      {
                        type: 'button',
                        className: Ht.warpBtn,
                        onClick: () => void q(b),
                        children: ['第 ', b, ' 階へ'],
                      },
                      b
                    )
                  ),
                  f.jsx('button', {
                    type: 'button',
                    className: Ht.warpClose,
                    onClick: () => d(!1),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
      ],
    });
  };
function ww() {
  return f.jsxs(G0, {
    children: [
      f.jsx(Wt, { path: '/', element: f.jsx(rl, { to: '/title', replace: !0 }) }),
      f.jsx(Wt, { path: '/title', element: f.jsx(iw, {}) }),
      f.jsx(Wt, { path: '/town', element: f.jsx(Sw, {}) }),
      f.jsx(Wt, { path: '/guild', element: f.jsx(gS, {}) }),
      f.jsx(Wt, { path: '/guild/char/:id', element: f.jsx(r5, {}) }),
      f.jsx(Wt, { path: '/shop', element: f.jsx(B5, {}) }),
      f.jsx(Wt, { path: '/forge', element: f.jsx(V2, {}) }),
      f.jsx(Wt, { path: '/codex', element: f.jsx(Hx, {}) }),
      f.jsx(Wt, { path: '/dungeon', element: f.jsx(T2, {}) }),
      f.jsx(Wt, { path: '/battle', element: f.jsx(dx, {}) }),
      f.jsx(Wt, { path: '*', element: f.jsx(o5, {}) }),
    ],
  });
}
const Tw = {
    races: bt,
    classes: at,
    titles: Rl,
    skills: ji,
    unionSkills: En,
    summons: Bn,
    gatherTypes: Oa,
    recipes: qn,
    enemies: ol,
    items: Fe,
    equipment: ot,
  },
  Ew = /^[a-z]+_[a-z0-9_]+$/;
function al(l, i, o) {
  for (const r of i)
    Ew.test(r) || o.push(`[${l}] ID 命名規約違反: "${r}"（期待: <domain>_<name>）`);
}
function kc(l, i, o, r) {
  const c = new Set(i.skills.map((d) => d.skillId));
  for (const d of i.skills) {
    o.has(d.skillId) || r.push(`[${l}] 未定義スキルを参照: "${d.skillId}"`);
    for (const _ of d.requires ?? [])
      c.has(_.skillId) ||
        r.push(`[${l}] スキル "${d.skillId}" の前提 "${_.skillId}" が同ツリーに存在しない`);
  }
}
function Cw() {
  var C;
  const l = [],
    {
      races: i,
      classes: o,
      titles: r,
      skills: c,
      unionSkills: d,
      summons: _,
      gatherTypes: h,
      recipes: k,
      enemies: p,
      items: v,
      equipment: y,
    } = Tw;
  (al('races', Object.keys(i), l),
    al('classes', Object.keys(o), l),
    al('titles', Object.keys(r), l),
    al('skills', Object.keys(c), l),
    al('enemies', Object.keys(p), l),
    al('items', Object.keys(v), l),
    al('equipment', Object.keys(y), l));
  const S = (T, A) => {
    for (const [M, P] of Object.entries(A))
      M !== P.id && l.push(`[${T}] キー "${M}" と id "${P.id}" が不一致`);
  };
  (S('races', i),
    S('classes', o),
    S('titles', r),
    S('skills', c),
    S('enemies', p),
    S('items', v),
    S('equipment', y));
  const q = new Set(Object.keys(c)),
    b = new Set(Object.keys(o)),
    L = new Set(Object.keys(r));
  for (const T of Object.values(i)) {
    (b.has(T.defaultClassId) ||
      l.push(`[races] "${T.id}" の defaultClassId "${T.defaultClassId}" が未定義`),
      kc(`races/${T.id}`, T.raceSkillTree, q, l));
    for (const A of T.raceSkillTree.skills) {
      const M = d[A.skillId];
      M &&
        M.raceId !== T.id &&
        l.push(`[races/${T.id}] ユニオンスキル "${A.skillId}" の raceId "${M.raceId}" が不一致`);
    }
  }
  for (const T of Object.values(d)) {
    const A = (C = i[T.raceId]) == null ? void 0 : C.raceSkillTree;
    (!A || !A.skills.some((M) => M.skillId === T.id)) &&
      l.push(`[unionSkills] "${T.id}" が種族 "${T.raceId}" のスキルツリーに無い`);
  }
  al('unionSkills', Object.keys(d), l);
  for (const [T, A] of Object.entries(d))
    (T !== A.id && l.push(`[unionSkills] キー "${T}" と id "${A.id}" が不一致`),
      A.id in c || l.push(`[unionSkills] "${A.id}" が skills に未定義`),
      A.requiredParticipants < 1 &&
        l.push(`[unionSkills] "${A.id}" の requiredParticipants が 1 未満`),
      (A.gaugeCostPerParticipant < 0 || A.gaugeCostPerParticipant > 100) &&
        l.push(`[unionSkills] "${A.id}" の gaugeCostPerParticipant が 0..100 外`),
      A.id in Il &&
        l.push(
          `[unionSkills] "${A.id}" が BATTLE_SKILLS にも存在（通常スキルとして撃ててしまう）`
        ));
  al('passiveSkills', Object.keys(xc), l);
  for (const [T, A] of Object.entries(xc))
    (T !== A.id && l.push(`[passiveSkills] キー "${T}" と id "${A.id}" が不一致`),
      q.has(A.id) || l.push(`[passiveSkills] "${A.id}" が skills に未定義`),
      A.id in Il &&
        l.push(`[passiveSkills] "${A.id}" が BATTLE_SKILLS にも存在（戦闘で撃ててしまう）`),
      A.id in d && l.push(`[passiveSkills] "${A.id}" が UNION_SKILLS にも存在`));
  al('summons', Object.keys(_), l);
  for (const [T, A] of Object.entries(_))
    T !== A.id && l.push(`[summons] キー "${T}" と id "${A.id}" が不一致`);
  for (const T of Object.values(Il))
    for (const A of T.effects)
      A.kind === 'summon' &&
        !(A.summonKind in _) &&
        l.push(`[battleSkills] "${T.id}" の召喚 "${A.summonKind}" が未定義`);
  for (const [T, A] of Object.entries(h)) {
    (T !== A.type && l.push(`[gatherTypes] キー "${T}" と type "${A.type}" が不一致`),
      q.has(A.requiredSkillId) ||
        l.push(`[gatherTypes] "${A.type}" の requiredSkillId "${A.requiredSkillId}" が未定義`));
    for (const M of A.drops) {
      if (!(M.itemId in v))
        l.push(`[gatherTypes] "${A.type}" のドロップ "${M.itemId}" が未定義アイテム`);
      else {
        const P = v[M.itemId].category === 'food';
        (A.food &&
          !P &&
          l.push(`[gatherTypes] 食材系統 "${A.type}" のドロップ "${M.itemId}" が food でない`),
          !A.food &&
            P &&
            l.push(`[gatherTypes] 素材系統 "${A.type}" のドロップ "${M.itemId}" が food`));
      }
      M.weight <= 0 && l.push(`[gatherTypes] "${A.type}" のドロップ重みが正でない`);
    }
  }
  al('recipes', Object.keys(k), l);
  for (const [T, A] of Object.entries(k)) {
    T !== A.id && l.push(`[recipes] キー "${T}" と id "${A.id}" が不一致`);
    for (const M of A.ingredients)
      M.itemId in v
        ? v[M.itemId].category !== 'food' &&
          l.push(`[recipes] "${A.id}" の材料 "${M.itemId}" が food カテゴリでない`)
        : l.push(`[recipes] "${A.id}" の材料 "${M.itemId}" が未定義`);
    A.result.itemId in v
      ? v[A.result.itemId].category !== 'food' &&
        l.push(`[recipes] "${A.id}" の結果 "${A.result.itemId}" が food カテゴリでない`)
      : l.push(`[recipes] "${A.id}" の結果 "${A.result.itemId}" が未定義`);
  }
  for (const T of Object.values(o)) {
    kc(`classes/${T.id}`, T.skillTree, q, l);
    for (const A of T.titleOptions) {
      if (!L.has(A)) {
        l.push(`[classes] "${T.id}" の称号 "${A}" が未定義`);
        continue;
      }
      r[A].parentClassId !== T.id &&
        l.push(`[classes] 称号 "${A}" の parentClassId が "${T.id}" と不一致`);
    }
  }
  for (const T of Object.values(r))
    (b.has(T.parentClassId) ||
      l.push(`[titles] "${T.id}" の parentClassId "${T.parentClassId}" が未定義`),
      kc(`titles/${T.id}`, T.skillTree, q, l));
  for (const T of Object.values(y))
    (T.slot === 'weapon' &&
      !T.weaponType &&
      l.push(`[equipment] "${T.id}" は weapon だが weaponType が未設定`),
      T.slot === 'armor' &&
        !T.armorType &&
        l.push(`[equipment] "${T.id}" は armor だが armorType が未設定`),
      (T.buyPrice < 0 || T.tier < 0) && l.push(`[equipment] "${T.id}" の buyPrice/tier が負`));
  for (const T of Object.values(v))
    (T.buyPrice < 0 && l.push(`[items] "${T.id}" の buyPrice が負`),
      T.category === 'consumable' &&
        !T.useContext &&
        !T.effects &&
        l.push(`[items] 消費アイテム "${T.id}" に useContext も effects も無い（使用不能）`));
  for (const T of Object.values(p))
    for (const A of T.drops ?? [])
      (A.itemId in v || l.push(`[enemies] "${T.id}" のドロップ "${A.itemId}" が未定義アイテム`),
        (A.rate < 0 || A.rate > 1) &&
          l.push(`[enemies] "${T.id}" のドロップ "${A.itemId}" の rate が 0..1 外`));
  for (const [T, A] of Object.entries(sg)) {
    T in v || l.push(`[SELL_UNLOCKS] キー素材 "${T}" が未定義`);
    for (const M of A) M in y || l.push(`[SELL_UNLOCKS] 解放先装備 "${M}" が未定義`);
  }
  return { ok: l.length === 0, errors: l };
}
const $p = Cw();
$p.ok || console.error('マスターデータ検証エラー:', $p.errors);
const ug = document.getElementById('root');
if (!ug) throw new Error('Failed to find #root element');
Yv.createRoot(ug).render(
  f.jsx(my, { basename: '/sekaiju-like-game', children: f.jsx(cx, { children: f.jsx(ww, {}) }) })
);
