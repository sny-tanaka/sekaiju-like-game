var Bv = Object.defineProperty;
var qv = (l, n, o) =>
  n in l ? Bv(l, n, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (l[n] = o);
var Zu = (l, n, o) => qv(l, typeof n != 'symbol' ? n + '' : n, o);
(function () {
  const n = document.createElement('link').relList;
  if (n && n.supports && n.supports('modulepreload')) return;
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
var Ju = { exports: {} },
  En = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var tp;
function Mv() {
  if (tp) return En;
  tp = 1;
  var l = Symbol.for('react.transitional.element'),
    n = Symbol.for('react.fragment');
  function o(r, c, d) {
    var _ = null;
    if ((d !== void 0 && (_ = '' + d), c.key !== void 0 && (_ = '' + c.key), 'key' in c)) {
      d = {};
      for (var h in c) h !== 'key' && (d[h] = c[h]);
    } else d = c;
    return ((c = d.ref), { $$typeof: l, type: r, key: _, ref: c !== void 0 ? c : null, props: d });
  }
  return ((En.Fragment = n), (En.jsx = o), (En.jsxs = o), En);
}
var lp;
function jv() {
  return (lp || ((lp = 1), (Ju.exports = Mv())), Ju.exports);
}
var f = jv(),
  Pu = { exports: {} },
  Cn = {},
  Wu = { exports: {} },
  Fu = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ap;
function Ov() {
  return (
    ap ||
      ((ap = 1),
      (function (l) {
        function n(q, V) {
          var ee = q.length;
          q.push(V);
          e: for (; 0 < ee; ) {
            var de = (ee - 1) >>> 1,
              ve = q[de];
            if (0 < c(ve, V)) ((q[de] = V), (q[ee] = ve), (ee = de));
            else break e;
          }
        }
        function o(q) {
          return q.length === 0 ? null : q[0];
        }
        function r(q) {
          if (q.length === 0) return null;
          var V = q[0],
            ee = q.pop();
          if (ee !== V) {
            q[0] = ee;
            e: for (var de = 0, ve = q.length, A = ve >>> 1; de < A; ) {
              var H = 2 * (de + 1) - 1,
                F = q[H],
                le = H + 1,
                he = q[le];
              if (0 > c(F, ee))
                le < ve && 0 > c(he, F)
                  ? ((q[de] = he), (q[le] = ee), (de = le))
                  : ((q[de] = F), (q[H] = ee), (de = H));
              else if (le < ve && 0 > c(he, ee)) ((q[de] = he), (q[le] = ee), (de = le));
              else break e;
            }
          }
          return V;
        }
        function c(q, V) {
          var ee = q.sortIndex - V.sortIndex;
          return ee !== 0 ? ee : q.id - V.id;
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
          L = !1,
          b = !1,
          B = !1,
          w = !1,
          E = typeof setTimeout == 'function' ? setTimeout : null,
          T = typeof clearTimeout == 'function' ? clearTimeout : null,
          R = typeof setImmediate < 'u' ? setImmediate : null;
        function W(q) {
          for (var V = o(p); V !== null; ) {
            if (V.callback === null) r(p);
            else if (V.startTime <= q) (r(p), (V.sortIndex = V.expirationTime), n(k, V));
            else break;
            V = o(p);
          }
        }
        function K(q) {
          if (((B = !1), W(q), !b))
            if (o(k) !== null) ((b = !0), Y || ((Y = !0), ce()));
            else {
              var V = o(p);
              V !== null && _e(K, V.startTime - q);
            }
        }
        var Y = !1,
          z = -1,
          Q = 5,
          P = -1;
        function ne() {
          return w ? !0 : !(l.unstable_now() - P < Q);
        }
        function me() {
          if (((w = !1), Y)) {
            var q = l.unstable_now();
            P = q;
            var V = !0;
            try {
              e: {
                ((b = !1), B && ((B = !1), T(z), (z = -1)), (L = !0));
                var ee = S;
                try {
                  t: {
                    for (W(q), y = o(k); y !== null && !(y.expirationTime > q && ne()); ) {
                      var de = y.callback;
                      if (typeof de == 'function') {
                        ((y.callback = null), (S = y.priorityLevel));
                        var ve = de(y.expirationTime <= q);
                        if (((q = l.unstable_now()), typeof ve == 'function')) {
                          ((y.callback = ve), W(q), (V = !0));
                          break t;
                        }
                        (y === o(k) && r(k), W(q));
                      } else r(k);
                      y = o(k);
                    }
                    if (y !== null) V = !0;
                    else {
                      var A = o(p);
                      (A !== null && _e(K, A.startTime - q), (V = !1));
                    }
                  }
                  break e;
                } finally {
                  ((y = null), (S = ee), (L = !1));
                }
                V = void 0;
              }
            } finally {
              V ? ce() : (Y = !1);
            }
          }
        }
        var ce;
        if (typeof R == 'function')
          ce = function () {
            R(me);
          };
        else if (typeof MessageChannel < 'u') {
          var Z = new MessageChannel(),
            J = Z.port2;
          ((Z.port1.onmessage = me),
            (ce = function () {
              J.postMessage(null);
            }));
        } else
          ce = function () {
            E(me, 0);
          };
        function _e(q, V) {
          z = E(function () {
            q(l.unstable_now());
          }, V);
        }
        ((l.unstable_IdlePriority = 5),
          (l.unstable_ImmediatePriority = 1),
          (l.unstable_LowPriority = 4),
          (l.unstable_NormalPriority = 3),
          (l.unstable_Profiling = null),
          (l.unstable_UserBlockingPriority = 2),
          (l.unstable_cancelCallback = function (q) {
            q.callback = null;
          }),
          (l.unstable_forceFrameRate = function (q) {
            0 > q || 125 < q
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (Q = 0 < q ? Math.floor(1e3 / q) : 5);
          }),
          (l.unstable_getCurrentPriorityLevel = function () {
            return S;
          }),
          (l.unstable_next = function (q) {
            switch (S) {
              case 1:
              case 2:
              case 3:
                var V = 3;
                break;
              default:
                V = S;
            }
            var ee = S;
            S = V;
            try {
              return q();
            } finally {
              S = ee;
            }
          }),
          (l.unstable_requestPaint = function () {
            w = !0;
          }),
          (l.unstable_runWithPriority = function (q, V) {
            switch (q) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                q = 3;
            }
            var ee = S;
            S = q;
            try {
              return V();
            } finally {
              S = ee;
            }
          }),
          (l.unstable_scheduleCallback = function (q, V, ee) {
            var de = l.unstable_now();
            switch (
              (typeof ee == 'object' && ee !== null
                ? ((ee = ee.delay), (ee = typeof ee == 'number' && 0 < ee ? de + ee : de))
                : (ee = de),
              q)
            ) {
              case 1:
                var ve = -1;
                break;
              case 2:
                ve = 250;
                break;
              case 5:
                ve = 1073741823;
                break;
              case 4:
                ve = 1e4;
                break;
              default:
                ve = 5e3;
            }
            return (
              (ve = ee + ve),
              (q = {
                id: v++,
                callback: V,
                priorityLevel: q,
                startTime: ee,
                expirationTime: ve,
                sortIndex: -1,
              }),
              ee > de
                ? ((q.sortIndex = ee),
                  n(p, q),
                  o(k) === null && q === o(p) && (B ? (T(z), (z = -1)) : (B = !0), _e(K, ee - de)))
                : ((q.sortIndex = ve), n(k, q), b || L || ((b = !0), Y || ((Y = !0), ce()))),
              q
            );
          }),
          (l.unstable_shouldYield = ne),
          (l.unstable_wrapCallback = function (q) {
            var V = S;
            return function () {
              var ee = S;
              S = V;
              try {
                return q.apply(this, arguments);
              } finally {
                S = ee;
              }
            };
          }));
      })(Fu)),
    Fu
  );
}
var ip;
function Dv() {
  return (ip || ((ip = 1), (Wu.exports = Ov())), Wu.exports);
}
var ec = { exports: {} },
  ge = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var np;
function Iv() {
  if (np) return ge;
  np = 1;
  var l = Symbol.for('react.transitional.element'),
    n = Symbol.for('react.portal'),
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
  function L(A) {
    return A === null || typeof A != 'object'
      ? null
      : ((A = (S && A[S]) || A['@@iterator']), typeof A == 'function' ? A : null);
  }
  var b = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    B = Object.assign,
    w = {};
  function E(A, H, F) {
    ((this.props = A), (this.context = H), (this.refs = w), (this.updater = F || b));
  }
  ((E.prototype.isReactComponent = {}),
    (E.prototype.setState = function (A, H) {
      if (typeof A != 'object' && typeof A != 'function' && A != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, A, H, 'setState');
    }),
    (E.prototype.forceUpdate = function (A) {
      this.updater.enqueueForceUpdate(this, A, 'forceUpdate');
    }));
  function T() {}
  T.prototype = E.prototype;
  function R(A, H, F) {
    ((this.props = A), (this.context = H), (this.refs = w), (this.updater = F || b));
  }
  var W = (R.prototype = new T());
  ((W.constructor = R), B(W, E.prototype), (W.isPureReactComponent = !0));
  var K = Array.isArray;
  function Y() {}
  var z = { H: null, A: null, T: null, S: null },
    Q = Object.prototype.hasOwnProperty;
  function P(A, H, F) {
    var le = F.ref;
    return { $$typeof: l, type: A, key: H, ref: le !== void 0 ? le : null, props: F };
  }
  function ne(A, H) {
    return P(A.type, H, A.props);
  }
  function me(A) {
    return typeof A == 'object' && A !== null && A.$$typeof === l;
  }
  function ce(A) {
    var H = { '=': '=0', ':': '=2' };
    return (
      '$' +
      A.replace(/[=:]/g, function (F) {
        return H[F];
      })
    );
  }
  var Z = /\/+/g;
  function J(A, H) {
    return typeof A == 'object' && A !== null && A.key != null ? ce('' + A.key) : H.toString(36);
  }
  function _e(A) {
    switch (A.status) {
      case 'fulfilled':
        return A.value;
      case 'rejected':
        throw A.reason;
      default:
        switch (
          (typeof A.status == 'string'
            ? A.then(Y, Y)
            : ((A.status = 'pending'),
              A.then(
                function (H) {
                  A.status === 'pending' && ((A.status = 'fulfilled'), (A.value = H));
                },
                function (H) {
                  A.status === 'pending' && ((A.status = 'rejected'), (A.reason = H));
                }
              )),
          A.status)
        ) {
          case 'fulfilled':
            return A.value;
          case 'rejected':
            throw A.reason;
        }
    }
    throw A;
  }
  function q(A, H, F, le, he) {
    var be = typeof A;
    (be === 'undefined' || be === 'boolean') && (A = null);
    var Ne = !1;
    if (A === null) Ne = !0;
    else
      switch (be) {
        case 'bigint':
        case 'string':
        case 'number':
          Ne = !0;
          break;
        case 'object':
          switch (A.$$typeof) {
            case l:
            case n:
              Ne = !0;
              break;
            case v:
              return ((Ne = A._init), q(Ne(A._payload), H, F, le, he));
          }
      }
    if (Ne)
      return (
        (he = he(A)),
        (Ne = le === '' ? '.' + J(A, 0) : le),
        K(he)
          ? ((F = ''),
            Ne != null && (F = Ne.replace(Z, '$&/') + '/'),
            q(he, H, F, '', function (G) {
              return G;
            }))
          : he != null &&
            (me(he) &&
              (he = ne(
                he,
                F +
                  (he.key == null || (A && A.key === he.key)
                    ? ''
                    : ('' + he.key).replace(Z, '$&/') + '/') +
                  Ne
              )),
            H.push(he)),
        1
      );
    Ne = 0;
    var ot = le === '' ? '.' : le + ':';
    if (K(A))
      for (var Ve = 0; Ve < A.length; Ve++)
        ((le = A[Ve]), (be = ot + J(le, Ve)), (Ne += q(le, H, F, be, he)));
    else if (((Ve = L(A)), typeof Ve == 'function'))
      for (A = Ve.call(A), Ve = 0; !(le = A.next()).done; )
        ((le = le.value), (be = ot + J(le, Ve++)), (Ne += q(le, H, F, be, he)));
    else if (be === 'object') {
      if (typeof A.then == 'function') return q(_e(A), H, F, le, he);
      throw (
        (H = String(A)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (H === '[object Object]' ? 'object with keys {' + Object.keys(A).join(', ') + '}' : H) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return Ne;
  }
  function V(A, H, F) {
    if (A == null) return A;
    var le = [],
      he = 0;
    return (
      q(A, le, '', '', function (be) {
        return H.call(F, be, he++);
      }),
      le
    );
  }
  function ee(A) {
    if (A._status === -1) {
      var H = A._result;
      ((H = H()),
        H.then(
          function (F) {
            (A._status === 0 || A._status === -1) && ((A._status = 1), (A._result = F));
          },
          function (F) {
            (A._status === 0 || A._status === -1) && ((A._status = 2), (A._result = F));
          }
        ),
        A._status === -1 && ((A._status = 0), (A._result = H)));
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var de =
      typeof reportError == 'function'
        ? reportError
        : function (A) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var H = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof A == 'object' && A !== null && typeof A.message == 'string'
                    ? String(A.message)
                    : String(A),
                error: A,
              });
              if (!window.dispatchEvent(H)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', A);
              return;
            }
            console.error(A);
          },
    ve = {
      map: V,
      forEach: function (A, H, F) {
        V(
          A,
          function () {
            H.apply(this, arguments);
          },
          F
        );
      },
      count: function (A) {
        var H = 0;
        return (
          V(A, function () {
            H++;
          }),
          H
        );
      },
      toArray: function (A) {
        return (
          V(A, function (H) {
            return H;
          }) || []
        );
      },
      only: function (A) {
        if (!me(A))
          throw Error('React.Children.only expected to receive a single React element child.');
        return A;
      },
    };
  return (
    (ge.Activity = y),
    (ge.Children = ve),
    (ge.Component = E),
    (ge.Fragment = o),
    (ge.Profiler = c),
    (ge.PureComponent = R),
    (ge.StrictMode = r),
    (ge.Suspense = k),
    (ge.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = z),
    (ge.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (A) {
        return z.H.useMemoCache(A);
      },
    }),
    (ge.cache = function (A) {
      return function () {
        return A.apply(null, arguments);
      };
    }),
    (ge.cacheSignal = function () {
      return null;
    }),
    (ge.cloneElement = function (A, H, F) {
      if (A == null) throw Error('The argument must be a React element, but you passed ' + A + '.');
      var le = B({}, A.props),
        he = A.key;
      if (H != null)
        for (be in (H.key !== void 0 && (he = '' + H.key), H))
          !Q.call(H, be) ||
            be === 'key' ||
            be === '__self' ||
            be === '__source' ||
            (be === 'ref' && H.ref === void 0) ||
            (le[be] = H[be]);
      var be = arguments.length - 2;
      if (be === 1) le.children = F;
      else if (1 < be) {
        for (var Ne = Array(be), ot = 0; ot < be; ot++) Ne[ot] = arguments[ot + 2];
        le.children = Ne;
      }
      return P(A.type, he, le);
    }),
    (ge.createContext = function (A) {
      return (
        (A = {
          $$typeof: _,
          _currentValue: A,
          _currentValue2: A,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (A.Provider = A),
        (A.Consumer = { $$typeof: d, _context: A }),
        A
      );
    }),
    (ge.createElement = function (A, H, F) {
      var le,
        he = {},
        be = null;
      if (H != null)
        for (le in (H.key !== void 0 && (be = '' + H.key), H))
          Q.call(H, le) && le !== 'key' && le !== '__self' && le !== '__source' && (he[le] = H[le]);
      var Ne = arguments.length - 2;
      if (Ne === 1) he.children = F;
      else if (1 < Ne) {
        for (var ot = Array(Ne), Ve = 0; Ve < Ne; Ve++) ot[Ve] = arguments[Ve + 2];
        he.children = ot;
      }
      if (A && A.defaultProps)
        for (le in ((Ne = A.defaultProps), Ne)) he[le] === void 0 && (he[le] = Ne[le]);
      return P(A, be, he);
    }),
    (ge.createRef = function () {
      return { current: null };
    }),
    (ge.forwardRef = function (A) {
      return { $$typeof: h, render: A };
    }),
    (ge.isValidElement = me),
    (ge.lazy = function (A) {
      return { $$typeof: v, _payload: { _status: -1, _result: A }, _init: ee };
    }),
    (ge.memo = function (A, H) {
      return { $$typeof: p, type: A, compare: H === void 0 ? null : H };
    }),
    (ge.startTransition = function (A) {
      var H = z.T,
        F = {};
      z.T = F;
      try {
        var le = A(),
          he = z.S;
        (he !== null && he(F, le),
          typeof le == 'object' && le !== null && typeof le.then == 'function' && le.then(Y, de));
      } catch (be) {
        de(be);
      } finally {
        (H !== null && F.types !== null && (H.types = F.types), (z.T = H));
      }
    }),
    (ge.unstable_useCacheRefresh = function () {
      return z.H.useCacheRefresh();
    }),
    (ge.use = function (A) {
      return z.H.use(A);
    }),
    (ge.useActionState = function (A, H, F) {
      return z.H.useActionState(A, H, F);
    }),
    (ge.useCallback = function (A, H) {
      return z.H.useCallback(A, H);
    }),
    (ge.useContext = function (A) {
      return z.H.useContext(A);
    }),
    (ge.useDebugValue = function () {}),
    (ge.useDeferredValue = function (A, H) {
      return z.H.useDeferredValue(A, H);
    }),
    (ge.useEffect = function (A, H) {
      return z.H.useEffect(A, H);
    }),
    (ge.useEffectEvent = function (A) {
      return z.H.useEffectEvent(A);
    }),
    (ge.useId = function () {
      return z.H.useId();
    }),
    (ge.useImperativeHandle = function (A, H, F) {
      return z.H.useImperativeHandle(A, H, F);
    }),
    (ge.useInsertionEffect = function (A, H) {
      return z.H.useInsertionEffect(A, H);
    }),
    (ge.useLayoutEffect = function (A, H) {
      return z.H.useLayoutEffect(A, H);
    }),
    (ge.useMemo = function (A, H) {
      return z.H.useMemo(A, H);
    }),
    (ge.useOptimistic = function (A, H) {
      return z.H.useOptimistic(A, H);
    }),
    (ge.useReducer = function (A, H, F) {
      return z.H.useReducer(A, H, F);
    }),
    (ge.useRef = function (A) {
      return z.H.useRef(A);
    }),
    (ge.useState = function (A) {
      return z.H.useState(A);
    }),
    (ge.useSyncExternalStore = function (A, H, F) {
      return z.H.useSyncExternalStore(A, H, F);
    }),
    (ge.useTransition = function () {
      return z.H.useTransition();
    }),
    (ge.version = '19.2.5'),
    ge
  );
}
var sp;
function qc() {
  return (sp || ((sp = 1), (ec.exports = Iv())), ec.exports);
}
var tc = { exports: {} },
  vt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var rp;
function Rv() {
  if (rp) return vt;
  rp = 1;
  var l = qc();
  function n(k) {
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
          throw Error(n(522));
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
      if (!p || (p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)) throw Error(n(299));
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
          L = typeof p.fetchPriority == 'string' ? p.fetchPriority : void 0;
        v === 'style'
          ? r.d.S(k, typeof p.precedence == 'string' ? p.precedence : void 0, {
              crossOrigin: y,
              integrity: S,
              fetchPriority: L,
            })
          : v === 'script' &&
            r.d.X(k, {
              crossOrigin: y,
              integrity: S,
              fetchPriority: L,
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
var op;
function zv() {
  if (op) return tc.exports;
  op = 1;
  function l() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (n) {
        console.error(n);
      }
  }
  return (l(), (tc.exports = Rv()), tc.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var up;
function Uv() {
  if (up) return Cn;
  up = 1;
  var l = Dv(),
    n = qc(),
    o = zv();
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
    for (var a = e, i = t; ; ) {
      var s = a.return;
      if (s === null) break;
      var u = s.alternate;
      if (u === null) {
        if (((i = s.return), i !== null)) {
          a = i;
          continue;
        }
        break;
      }
      if (s.child === u.child) {
        for (u = s.child; u; ) {
          if (u === a) return (k(s), e);
          if (u === i) return (k(s), t);
          u = u.sibling;
        }
        throw Error(r(188));
      }
      if (a.return !== i.return) ((a = s), (i = u));
      else {
        for (var m = !1, g = s.child; g; ) {
          if (g === a) {
            ((m = !0), (a = s), (i = u));
            break;
          }
          if (g === i) {
            ((m = !0), (i = s), (a = u));
            break;
          }
          g = g.sibling;
        }
        if (!m) {
          for (g = u.child; g; ) {
            if (g === a) {
              ((m = !0), (a = u), (i = s));
              break;
            }
            if (g === i) {
              ((m = !0), (i = u), (a = s));
              break;
            }
            g = g.sibling;
          }
          if (!m) throw Error(r(189));
        }
      }
      if (a.alternate !== i) throw Error(r(190));
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
    L = Symbol.for('react.transitional.element'),
    b = Symbol.for('react.portal'),
    B = Symbol.for('react.fragment'),
    w = Symbol.for('react.strict_mode'),
    E = Symbol.for('react.profiler'),
    T = Symbol.for('react.consumer'),
    R = Symbol.for('react.context'),
    W = Symbol.for('react.forward_ref'),
    K = Symbol.for('react.suspense'),
    Y = Symbol.for('react.suspense_list'),
    z = Symbol.for('react.memo'),
    Q = Symbol.for('react.lazy'),
    P = Symbol.for('react.activity'),
    ne = Symbol.for('react.memo_cache_sentinel'),
    me = Symbol.iterator;
  function ce(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (me && e[me]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var Z = Symbol.for('react.client.reference');
  function J(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === Z ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case B:
        return 'Fragment';
      case E:
        return 'Profiler';
      case w:
        return 'StrictMode';
      case K:
        return 'Suspense';
      case Y:
        return 'SuspenseList';
      case P:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case b:
          return 'Portal';
        case R:
          return e.displayName || 'Context';
        case T:
          return (e._context.displayName || 'Context') + '.Consumer';
        case W:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case z:
          return ((t = e.displayName || null), t !== null ? t : J(e.type) || 'Memo');
        case Q:
          ((t = e._payload), (e = e._init));
          try {
            return J(e(t));
          } catch {}
      }
    return null;
  }
  var _e = Array.isArray,
    q = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    V = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    ee = { pending: !1, data: null, method: null, action: null },
    de = [],
    ve = -1;
  function A(e) {
    return { current: e };
  }
  function H(e) {
    0 > ve || ((e.current = de[ve]), (de[ve] = null), ve--);
  }
  function F(e, t) {
    (ve++, (de[ve] = e.current), (e.current = t));
  }
  var le = A(null),
    he = A(null),
    be = A(null),
    Ne = A(null);
  function ot(e, t) {
    switch ((F(be, t), F(he, e), F(le, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? wf(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) ((t = wf(t)), (e = Tf(t, e)));
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
    (H(le), F(le, e));
  }
  function Ve() {
    (H(le), H(he), H(be));
  }
  function G(e) {
    e.memoizedState !== null && F(Ne, e);
    var t = le.current,
      a = Tf(t, e.type);
    t !== a && (F(he, e), F(le, a));
  }
  function re(e) {
    (he.current === e && (H(le), H(he)), Ne.current === e && (H(Ne), (xn._currentValue = ee)));
  }
  var fe, Be;
  function we(e) {
    if (fe === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        ((fe = (t && t[1]) || ''),
          (Be =
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
      fe +
      e +
      Be
    );
  }
  var bt = !1;
  function qr(e, t) {
    if (!e || bt) return '';
    bt = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = {
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
                } catch (I) {
                  var D = I;
                }
                Reflect.construct(e, [], X);
              } else {
                try {
                  X.call();
                } catch (I) {
                  D = I;
                }
                e.call(X.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (I) {
                D = I;
              }
              (X = e()) && typeof X.catch == 'function' && X.catch(function () {});
            }
          } catch (I) {
            if (I && D && typeof I.stack == 'string') return [I.stack, D.stack];
          }
          return [null, null];
        },
      };
      i.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
      var s = Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot, 'name');
      s &&
        s.configurable &&
        Object.defineProperty(i.DetermineComponentFrameRoot, 'name', {
          value: 'DetermineComponentFrameRoot',
        });
      var u = i.DetermineComponentFrameRoot(),
        m = u[0],
        g = u[1];
      if (m && g) {
        var x = m.split(`
`),
          O = g.split(`
`);
        for (s = i = 0; i < x.length && !x[i].includes('DetermineComponentFrameRoot'); ) i++;
        for (; s < O.length && !O[s].includes('DetermineComponentFrameRoot'); ) s++;
        if (i === x.length || s === O.length)
          for (i = x.length - 1, s = O.length - 1; 1 <= i && 0 <= s && x[i] !== O[s]; ) s--;
        for (; 1 <= i && 0 <= s; i--, s--)
          if (x[i] !== O[s]) {
            if (i !== 1 || s !== 1)
              do
                if ((i--, s--, 0 > s || x[i] !== O[s])) {
                  var U =
                    `
` + x[i].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      U.includes('<anonymous>') &&
                      (U = U.replace('<anonymous>', e.displayName)),
                    U
                  );
                }
              while (1 <= i && 0 <= s);
            break;
          }
      }
    } finally {
      ((bt = !1), (Error.prepareStackTrace = a));
    }
    return (a = e ? e.displayName || e.name : '') ? we(a) : '';
  }
  function og(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return we(e.type);
      case 16:
        return we('Lazy');
      case 13:
        return e.child !== t && t !== null ? we('Suspense Fallback') : we('Suspense');
      case 19:
        return we('SuspenseList');
      case 0:
      case 15:
        return qr(e.type, !1);
      case 11:
        return qr(e.type.render, !1);
      case 1:
        return qr(e.type, !0);
      case 31:
        return we('Activity');
      default:
        return '';
    }
  }
  function ed(e) {
    try {
      var t = '',
        a = null;
      do ((t += og(e, a)), (a = e), (e = e.return));
      while (e);
      return t;
    } catch (i) {
      return (
        `
Error generating stack: ` +
        i.message +
        `
` +
        i.stack
      );
    }
  }
  var Mr = Object.prototype.hasOwnProperty,
    jr = l.unstable_scheduleCallback,
    Or = l.unstable_cancelCallback,
    ug = l.unstable_shouldYield,
    cg = l.unstable_requestPaint,
    Lt = l.unstable_now,
    dg = l.unstable_getCurrentPriorityLevel,
    td = l.unstable_ImmediatePriority,
    ld = l.unstable_UserBlockingPriority,
    Un = l.unstable_NormalPriority,
    mg = l.unstable_LowPriority,
    ad = l.unstable_IdlePriority,
    _g = l.log,
    fg = l.unstable_setDisableYieldValue,
    Mi = null,
    Bt = null;
  function Hl(e) {
    if ((typeof _g == 'function' && fg(e), Bt && typeof Bt.setStrictMode == 'function'))
      try {
        Bt.setStrictMode(Mi, e);
      } catch {}
  }
  var qt = Math.clz32 ? Math.clz32 : gg,
    pg = Math.log,
    hg = Math.LN2;
  function gg(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((pg(e) / hg) | 0)) | 0);
  }
  var Hn = 256,
    Gn = 262144,
    $n = 4194304;
  function fa(e) {
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
  function Yn(e, t, a) {
    var i = e.pendingLanes;
    if (i === 0) return 0;
    var s = 0,
      u = e.suspendedLanes,
      m = e.pingedLanes;
    e = e.warmLanes;
    var g = i & 134217727;
    return (
      g !== 0
        ? ((i = g & ~u),
          i !== 0
            ? (s = fa(i))
            : ((m &= g), m !== 0 ? (s = fa(m)) : a || ((a = g & ~e), a !== 0 && (s = fa(a)))))
        : ((g = i & ~u),
          g !== 0
            ? (s = fa(g))
            : m !== 0
              ? (s = fa(m))
              : a || ((a = i & ~e), a !== 0 && (s = fa(a)))),
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
  function ji(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function kg(e, t) {
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
    var e = $n;
    return (($n <<= 1), ($n & 62914560) === 0 && ($n = 4194304), e);
  }
  function Dr(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function Oi(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function vg(e, t, a, i, s, u) {
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
      O = e.hiddenUpdates;
    for (a = m & ~a; 0 < a; ) {
      var U = 31 - qt(a),
        X = 1 << U;
      ((g[U] = 0), (x[U] = -1));
      var D = O[U];
      if (D !== null)
        for (O[U] = null, U = 0; U < D.length; U++) {
          var I = D[U];
          I !== null && (I.lane &= -536870913);
        }
      a &= ~X;
    }
    (i !== 0 && nd(e, i, 0),
      u !== 0 && s === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(m & ~t)));
  }
  function nd(e, t, a) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var i = 31 - qt(t);
    ((e.entangledLanes |= t),
      (e.entanglements[i] = e.entanglements[i] | 1073741824 | (a & 261930)));
  }
  function sd(e, t) {
    var a = (e.entangledLanes |= t);
    for (e = e.entanglements; a; ) {
      var i = 31 - qt(a),
        s = 1 << i;
      ((s & t) | (e[i] & t) && (e[i] |= t), (a &= ~s));
    }
  }
  function rd(e, t) {
    var a = t & -t;
    return ((a = (a & 42) !== 0 ? 1 : Ir(a)), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a);
  }
  function Ir(e) {
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
  function Rr(e) {
    return ((e &= -e), 2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function od() {
    var e = V.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Kf(e.type));
  }
  function ud(e, t) {
    var a = V.p;
    try {
      return ((V.p = e), t());
    } finally {
      V.p = a;
    }
  }
  var Gl = Math.random().toString(36).slice(2),
    ft = '__reactFiber$' + Gl,
    xt = '__reactProps$' + Gl,
    Oa = '__reactContainer$' + Gl,
    zr = '__reactEvents$' + Gl,
    yg = '__reactListeners$' + Gl,
    bg = '__reactHandles$' + Gl,
    cd = '__reactResources$' + Gl,
    Di = '__reactMarker$' + Gl;
  function Ur(e) {
    (delete e[ft], delete e[xt], delete e[zr], delete e[yg], delete e[bg]);
  }
  function Da(e) {
    var t = e[ft];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if ((t = a[Oa] || a[ft])) {
        if (((a = t.alternate), t.child !== null || (a !== null && a.child !== null)))
          for (e = qf(e); e !== null; ) {
            if ((a = e[ft])) return a;
            e = qf(e);
          }
        return t;
      }
      ((e = a), (a = e.parentNode));
    }
    return null;
  }
  function Ia(e) {
    if ((e = e[ft] || e[Oa])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function Ii(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(r(33));
  }
  function Ra(e) {
    var t = e[cd];
    return (t || (t = e[cd] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function ut(e) {
    e[Di] = !0;
  }
  var dd = new Set(),
    md = {};
  function pa(e, t) {
    (za(e, t), za(e + 'Capture', t));
  }
  function za(e, t) {
    for (md[e] = t, e = 0; e < t.length; e++) dd.add(t[e]);
  }
  var xg = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    _d = {},
    fd = {};
  function Sg(e) {
    return Mr.call(fd, e)
      ? !0
      : Mr.call(_d, e)
        ? !1
        : xg.test(e)
          ? (fd[e] = !0)
          : ((_d[e] = !0), !1);
  }
  function Xn(e, t, a) {
    if (Sg(t))
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case 'undefined':
          case 'function':
          case 'symbol':
            e.removeAttribute(t);
            return;
          case 'boolean':
            var i = t.toLowerCase().slice(0, 5);
            if (i !== 'data-' && i !== 'aria-') {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, '' + a);
      }
  }
  function Vn(e, t, a) {
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
  function kl(e, t, a, i) {
    if (i === null) e.removeAttribute(a);
    else {
      switch (typeof i) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          e.removeAttribute(a);
          return;
      }
      e.setAttributeNS(t, a, '' + i);
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
  function pd(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function wg(e, t, a) {
    var i = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (
      !e.hasOwnProperty(t) &&
      typeof i < 'u' &&
      typeof i.get == 'function' &&
      typeof i.set == 'function'
    ) {
      var s = i.get,
        u = i.set;
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
        Object.defineProperty(e, t, { enumerable: i.enumerable }),
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
  function Hr(e) {
    if (!e._valueTracker) {
      var t = pd(e) ? 'checked' : 'value';
      e._valueTracker = wg(e, t, '' + e[t]);
    }
  }
  function hd(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      i = '';
    return (
      e && (i = pd(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = i),
      e !== a ? (t.setValue(e), !0) : !1
    );
  }
  function Qn(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Tg = /[\n"\\]/g;
  function $t(e) {
    return e.replace(Tg, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function Gr(e, t, a, i, s, u, m, g) {
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
        ? $r(e, m, Gt(t))
        : a != null
          ? $r(e, m, Gt(a))
          : i != null && e.removeAttribute('value'),
      s == null && u != null && (e.defaultChecked = !!u),
      s != null && (e.checked = s && typeof s != 'function' && typeof s != 'symbol'),
      g != null && typeof g != 'function' && typeof g != 'symbol' && typeof g != 'boolean'
        ? (e.name = '' + Gt(g))
        : e.removeAttribute('name'));
  }
  function gd(e, t, a, i, s, u, m, g) {
    if (
      (u != null &&
        typeof u != 'function' &&
        typeof u != 'symbol' &&
        typeof u != 'boolean' &&
        (e.type = u),
      t != null || a != null)
    ) {
      if (!((u !== 'submit' && u !== 'reset') || t != null)) {
        Hr(e);
        return;
      }
      ((a = a != null ? '' + Gt(a) : ''),
        (t = t != null ? '' + Gt(t) : a),
        g || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((i = i ?? s),
      (i = typeof i != 'function' && typeof i != 'symbol' && !!i),
      (e.checked = g ? e.checked : !!i),
      (e.defaultChecked = !!i),
      m != null &&
        typeof m != 'function' &&
        typeof m != 'symbol' &&
        typeof m != 'boolean' &&
        (e.name = m),
      Hr(e));
  }
  function $r(e, t, a) {
    (t === 'number' && Qn(e.ownerDocument) === e) ||
      e.defaultValue === '' + a ||
      (e.defaultValue = '' + a);
  }
  function Ua(e, t, a, i) {
    if (((e = e.options), t)) {
      t = {};
      for (var s = 0; s < a.length; s++) t['$' + a[s]] = !0;
      for (a = 0; a < e.length; a++)
        ((s = t.hasOwnProperty('$' + e[a].value)),
          e[a].selected !== s && (e[a].selected = s),
          s && i && (e[a].defaultSelected = !0));
    } else {
      for (a = '' + Gt(a), t = null, s = 0; s < e.length; s++) {
        if (e[s].value === a) {
          ((e[s].selected = !0), i && (e[s].defaultSelected = !0));
          return;
        }
        t !== null || e[s].disabled || (t = e[s]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function kd(e, t, a) {
    if (t != null && ((t = '' + Gt(t)), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? '' + Gt(a) : '';
  }
  function vd(e, t, a, i) {
    if (t == null) {
      if (i != null) {
        if (a != null) throw Error(r(92));
        if (_e(i)) {
          if (1 < i.length) throw Error(r(93));
          i = i[0];
        }
        a = i;
      }
      (a == null && (a = ''), (t = a));
    }
    ((a = Gt(t)),
      (e.defaultValue = a),
      (i = e.textContent),
      i === a && i !== '' && i !== null && (e.value = i),
      Hr(e));
  }
  function Ha(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Eg = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function yd(e, t, a) {
    var i = t.indexOf('--') === 0;
    a == null || typeof a == 'boolean' || a === ''
      ? i
        ? e.setProperty(t, '')
        : t === 'float'
          ? (e.cssFloat = '')
          : (e[t] = '')
      : i
        ? e.setProperty(t, a)
        : typeof a != 'number' || a === 0 || Eg.has(t)
          ? t === 'float'
            ? (e.cssFloat = a)
            : (e[t] = ('' + a).trim())
          : (e[t] = a + 'px');
  }
  function bd(e, t, a) {
    if (t != null && typeof t != 'object') throw Error(r(62));
    if (((e = e.style), a != null)) {
      for (var i in a)
        !a.hasOwnProperty(i) ||
          (t != null && t.hasOwnProperty(i)) ||
          (i.indexOf('--') === 0
            ? e.setProperty(i, '')
            : i === 'float'
              ? (e.cssFloat = '')
              : (e[i] = ''));
      for (var s in t) ((i = t[s]), t.hasOwnProperty(s) && a[s] !== i && yd(e, s, i));
    } else for (var u in t) t.hasOwnProperty(u) && yd(e, u, t[u]);
  }
  function Yr(e) {
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
  var Cg = new Map([
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
    Ng =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Kn(e) {
    return Ng.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function vl() {}
  var Xr = null;
  function Vr(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Ga = null,
    $a = null;
  function xd(e) {
    var t = Ia(e);
    if (t && (e = t.stateNode)) {
      var a = e[xt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (Gr(
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
              var i = a[t];
              if (i !== e && i.form === e.form) {
                var s = i[xt] || null;
                if (!s) throw Error(r(90));
                Gr(
                  i,
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
            for (t = 0; t < a.length; t++) ((i = a[t]), i.form === e.form && hd(i));
          }
          break e;
        case 'textarea':
          kd(e, a.value, a.defaultValue);
          break e;
        case 'select':
          ((t = a.value), t != null && Ua(e, !!a.multiple, t, !1));
      }
    }
  }
  var Qr = !1;
  function Sd(e, t, a) {
    if (Qr) return e(t, a);
    Qr = !0;
    try {
      var i = e(t);
      return i;
    } finally {
      if (
        ((Qr = !1),
        (Ga !== null || $a !== null) &&
          (Os(), Ga && ((t = Ga), (e = $a), ($a = Ga = null), xd(t), e)))
      )
        for (t = 0; t < e.length; t++) xd(e[t]);
    }
  }
  function Ri(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var i = a[xt] || null;
    if (i === null) return null;
    a = i[t];
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
        ((i = !i.disabled) ||
          ((e = e.type),
          (i = !(e === 'button' || e === 'input' || e === 'select' || e === 'textarea'))),
          (e = !i));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (a && typeof a != 'function') throw Error(r(231, t, typeof a));
    return a;
  }
  var yl = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Kr = !1;
  if (yl)
    try {
      var zi = {};
      (Object.defineProperty(zi, 'passive', {
        get: function () {
          Kr = !0;
        },
      }),
        window.addEventListener('test', zi, zi),
        window.removeEventListener('test', zi, zi));
    } catch {
      Kr = !1;
    }
  var $l = null,
    Zr = null,
    Zn = null;
  function wd() {
    if (Zn) return Zn;
    var e,
      t = Zr,
      a = t.length,
      i,
      s = 'value' in $l ? $l.value : $l.textContent,
      u = s.length;
    for (e = 0; e < a && t[e] === s[e]; e++);
    var m = a - e;
    for (i = 1; i <= m && t[a - i] === s[u - i]; i++);
    return (Zn = s.slice(e, 1 < i ? 1 - i : void 0));
  }
  function Jn(e) {
    var t = e.keyCode;
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Pn() {
    return !0;
  }
  function Td() {
    return !1;
  }
  function St(e) {
    function t(a, i, s, u, m) {
      ((this._reactName = a),
        (this._targetInst = s),
        (this.type = i),
        (this.nativeEvent = u),
        (this.target = m),
        (this.currentTarget = null));
      for (var g in e) e.hasOwnProperty(g) && ((a = e[g]), (this[g] = a ? a(u) : u[g]));
      return (
        (this.isDefaultPrevented = (
          u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1
        )
          ? Pn
          : Td),
        (this.isPropagationStopped = Td),
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
            (this.isDefaultPrevented = Pn));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != 'unknown' && (a.cancelBubble = !0),
            (this.isPropagationStopped = Pn));
        },
        persist: function () {},
        isPersistent: Pn,
      }),
      t
    );
  }
  var ha = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Wn = St(ha),
    Ui = y({}, ha, { view: 0, detail: 0 }),
    Ag = St(Ui),
    Jr,
    Pr,
    Hi,
    Fn = y({}, Ui, {
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
      getModifierState: Fr,
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
          : (e !== Hi &&
              (Hi && e.type === 'mousemove'
                ? ((Jr = e.screenX - Hi.screenX), (Pr = e.screenY - Hi.screenY))
                : (Pr = Jr = 0),
              (Hi = e)),
            Jr);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : Pr;
      },
    }),
    Ed = St(Fn),
    Lg = y({}, Fn, { dataTransfer: 0 }),
    Bg = St(Lg),
    qg = y({}, Ui, { relatedTarget: 0 }),
    Wr = St(qg),
    Mg = y({}, ha, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    jg = St(Mg),
    Og = y({}, ha, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Dg = St(Og),
    Ig = y({}, ha, { data: 0 }),
    Cd = St(Ig),
    Rg = {
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
    zg = {
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
    Ug = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function Hg(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Ug[e]) ? !!t[e] : !1;
  }
  function Fr() {
    return Hg;
  }
  var Gg = y({}, Ui, {
      key: function (e) {
        if (e.key) {
          var t = Rg[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = Jn(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? zg[e.keyCode] || 'Unidentified'
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
      getModifierState: Fr,
      charCode: function (e) {
        return e.type === 'keypress' ? Jn(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? Jn(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    $g = St(Gg),
    Yg = y({}, Fn, {
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
    Nd = St(Yg),
    Xg = y({}, Ui, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Fr,
    }),
    Vg = St(Xg),
    Qg = y({}, ha, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Kg = St(Qg),
    Zg = y({}, Fn, {
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
    Jg = St(Zg),
    Pg = y({}, ha, { newState: 0, oldState: 0 }),
    Wg = St(Pg),
    Fg = [9, 13, 27, 32],
    eo = yl && 'CompositionEvent' in window,
    Gi = null;
  yl && 'documentMode' in document && (Gi = document.documentMode);
  var ek = yl && 'TextEvent' in window && !Gi,
    Ad = yl && (!eo || (Gi && 8 < Gi && 11 >= Gi)),
    Ld = ' ',
    Bd = !1;
  function qd(e, t) {
    switch (e) {
      case 'keyup':
        return Fg.indexOf(t.keyCode) !== -1;
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
  function Md(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var Ya = !1;
  function tk(e, t) {
    switch (e) {
      case 'compositionend':
        return Md(t);
      case 'keypress':
        return t.which !== 32 ? null : ((Bd = !0), Ld);
      case 'textInput':
        return ((e = t.data), e === Ld && Bd ? null : e);
      default:
        return null;
    }
  }
  function lk(e, t) {
    if (Ya)
      return e === 'compositionend' || (!eo && qd(e, t))
        ? ((e = wd()), (Zn = Zr = $l = null), (Ya = !1), e)
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
        return Ad && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var ak = {
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
  function jd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!ak[e.type] : t === 'textarea';
  }
  function Od(e, t, a, i) {
    (Ga ? ($a ? $a.push(i) : ($a = [i])) : (Ga = i),
      (t = Gs(t, 'onChange')),
      0 < t.length &&
        ((a = new Wn('onChange', 'change', null, a, i)), e.push({ event: a, listeners: t })));
  }
  var $i = null,
    Yi = null;
  function ik(e) {
    kf(e, 0);
  }
  function es(e) {
    var t = Ii(e);
    if (hd(t)) return e;
  }
  function Dd(e, t) {
    if (e === 'change') return t;
  }
  var Id = !1;
  if (yl) {
    var to;
    if (yl) {
      var lo = 'oninput' in document;
      if (!lo) {
        var Rd = document.createElement('div');
        (Rd.setAttribute('oninput', 'return;'), (lo = typeof Rd.oninput == 'function'));
      }
      to = lo;
    } else to = !1;
    Id = to && (!document.documentMode || 9 < document.documentMode);
  }
  function zd() {
    $i && ($i.detachEvent('onpropertychange', Ud), (Yi = $i = null));
  }
  function Ud(e) {
    if (e.propertyName === 'value' && es(Yi)) {
      var t = [];
      (Od(t, Yi, e, Vr(e)), Sd(ik, t));
    }
  }
  function nk(e, t, a) {
    e === 'focusin'
      ? (zd(), ($i = t), (Yi = a), $i.attachEvent('onpropertychange', Ud))
      : e === 'focusout' && zd();
  }
  function sk(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return es(Yi);
  }
  function rk(e, t) {
    if (e === 'click') return es(t);
  }
  function ok(e, t) {
    if (e === 'input' || e === 'change') return es(t);
  }
  function uk(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Mt = typeof Object.is == 'function' ? Object.is : uk;
  function Xi(e, t) {
    if (Mt(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var a = Object.keys(e),
      i = Object.keys(t);
    if (a.length !== i.length) return !1;
    for (i = 0; i < a.length; i++) {
      var s = a[i];
      if (!Mr.call(t, s) || !Mt(e[s], t[s])) return !1;
    }
    return !0;
  }
  function Hd(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Gd(e, t) {
    var a = Hd(e);
    e = 0;
    for (var i; a; ) {
      if (a.nodeType === 3) {
        if (((i = e + a.textContent.length), e <= t && i >= t)) return { node: a, offset: t - e };
        e = i;
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
      a = Hd(a);
    }
  }
  function $d(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? $d(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Yd(e) {
    e =
      e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = Qn(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == 'string';
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = Qn(e.document);
    }
    return t;
  }
  function ao(e) {
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
  var ck = yl && 'documentMode' in document && 11 >= document.documentMode,
    Xa = null,
    io = null,
    Vi = null,
    no = !1;
  function Xd(e, t, a) {
    var i = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    no ||
      Xa == null ||
      Xa !== Qn(i) ||
      ((i = Xa),
      'selectionStart' in i && ao(i)
        ? (i = { start: i.selectionStart, end: i.selectionEnd })
        : ((i = ((i.ownerDocument && i.ownerDocument.defaultView) || window).getSelection()),
          (i = {
            anchorNode: i.anchorNode,
            anchorOffset: i.anchorOffset,
            focusNode: i.focusNode,
            focusOffset: i.focusOffset,
          })),
      (Vi && Xi(Vi, i)) ||
        ((Vi = i),
        (i = Gs(io, 'onSelect')),
        0 < i.length &&
          ((t = new Wn('onSelect', 'select', null, t, a)),
          e.push({ event: t, listeners: i }),
          (t.target = Xa))));
  }
  function ga(e, t) {
    var a = {};
    return (
      (a[e.toLowerCase()] = t.toLowerCase()),
      (a['Webkit' + e] = 'webkit' + t),
      (a['Moz' + e] = 'moz' + t),
      a
    );
  }
  var Va = {
      animationend: ga('Animation', 'AnimationEnd'),
      animationiteration: ga('Animation', 'AnimationIteration'),
      animationstart: ga('Animation', 'AnimationStart'),
      transitionrun: ga('Transition', 'TransitionRun'),
      transitionstart: ga('Transition', 'TransitionStart'),
      transitioncancel: ga('Transition', 'TransitionCancel'),
      transitionend: ga('Transition', 'TransitionEnd'),
    },
    so = {},
    Vd = {};
  yl &&
    ((Vd = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Va.animationend.animation,
      delete Va.animationiteration.animation,
      delete Va.animationstart.animation),
    'TransitionEvent' in window || delete Va.transitionend.transition);
  function ka(e) {
    if (so[e]) return so[e];
    if (!Va[e]) return e;
    var t = Va[e],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in Vd) return (so[e] = t[a]);
    return e;
  }
  var Qd = ka('animationend'),
    Kd = ka('animationiteration'),
    Zd = ka('animationstart'),
    dk = ka('transitionrun'),
    mk = ka('transitionstart'),
    _k = ka('transitioncancel'),
    Jd = ka('transitionend'),
    Pd = new Map(),
    ro =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  ro.push('scrollEnd');
  function tl(e, t) {
    (Pd.set(e, t), pa(t, [e]));
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
    Qa = 0,
    oo = 0;
  function ls() {
    for (var e = Qa, t = (oo = Qa = 0); t < e; ) {
      var a = Yt[t];
      Yt[t++] = null;
      var i = Yt[t];
      Yt[t++] = null;
      var s = Yt[t];
      Yt[t++] = null;
      var u = Yt[t];
      if (((Yt[t++] = null), i !== null && s !== null)) {
        var m = i.pending;
        (m === null ? (s.next = s) : ((s.next = m.next), (m.next = s)), (i.pending = s));
      }
      u !== 0 && Wd(a, s, u);
    }
  }
  function as(e, t, a, i) {
    ((Yt[Qa++] = e),
      (Yt[Qa++] = t),
      (Yt[Qa++] = a),
      (Yt[Qa++] = i),
      (oo |= i),
      (e.lanes |= i),
      (e = e.alternate),
      e !== null && (e.lanes |= i));
  }
  function uo(e, t, a, i) {
    return (as(e, t, a, i), is(e));
  }
  function va(e, t) {
    return (as(e, null, null, t), is(e));
  }
  function Wd(e, t, a) {
    e.lanes |= a;
    var i = e.alternate;
    i !== null && (i.lanes |= a);
    for (var s = !1, u = e.return; u !== null; )
      ((u.childLanes |= a),
        (i = u.alternate),
        i !== null && (i.childLanes |= a),
        u.tag === 22 && ((e = u.stateNode), e === null || e._visibility & 1 || (s = !0)),
        (e = u),
        (u = u.return));
    return e.tag === 3
      ? ((u = e.stateNode),
        s &&
          t !== null &&
          ((s = 31 - qt(a)),
          (e = u.hiddenUpdates),
          (i = e[s]),
          i === null ? (e[s] = [t]) : i.push(t),
          (t.lane = a | 536870912)),
        u)
      : null;
  }
  function is(e) {
    if (50 < pn) throw ((pn = 0), (vu = null), Error(r(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var Ka = {};
  function fk(e, t, a, i) {
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
      (this.mode = i),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function jt(e, t, a, i) {
    return new fk(e, t, a, i);
  }
  function co(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function bl(e, t) {
    var a = e.alternate;
    return (
      a === null
        ? ((a = jt(e.tag, t, e.key, e.mode)),
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
  function Fd(e, t) {
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
  function ns(e, t, a, i, s, u) {
    var m = 0;
    if (((i = e), typeof e == 'function')) co(e) && (m = 1);
    else if (typeof e == 'string')
      m = vv(e, a, le.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case P:
          return ((e = jt(31, a, t, s)), (e.elementType = P), (e.lanes = u), e);
        case B:
          return ya(a.children, s, u, t);
        case w:
          ((m = 8), (s |= 24));
          break;
        case E:
          return ((e = jt(12, a, t, s | 2)), (e.elementType = E), (e.lanes = u), e);
        case K:
          return ((e = jt(13, a, t, s)), (e.elementType = K), (e.lanes = u), e);
        case Y:
          return ((e = jt(19, a, t, s)), (e.elementType = Y), (e.lanes = u), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case R:
                m = 10;
                break e;
              case T:
                m = 9;
                break e;
              case W:
                m = 11;
                break e;
              case z:
                m = 14;
                break e;
              case Q:
                ((m = 16), (i = null));
                break e;
            }
          ((m = 29), (a = Error(r(130, e === null ? 'null' : typeof e, ''))), (i = null));
      }
    return ((t = jt(m, a, t, s)), (t.elementType = e), (t.type = i), (t.lanes = u), t);
  }
  function ya(e, t, a, i) {
    return ((e = jt(7, e, i, t)), (e.lanes = a), e);
  }
  function mo(e, t, a) {
    return ((e = jt(6, e, null, t)), (e.lanes = a), e);
  }
  function em(e) {
    var t = jt(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function _o(e, t, a) {
    return (
      (t = jt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = a),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var tm = new WeakMap();
  function Xt(e, t) {
    if (typeof e == 'object' && e !== null) {
      var a = tm.get(e);
      return a !== void 0 ? a : ((t = { value: e, source: t, stack: ed(t) }), tm.set(e, t), t);
    }
    return { value: e, source: t, stack: ed(t) };
  }
  var Za = [],
    Ja = 0,
    ss = null,
    Qi = 0,
    Vt = [],
    Qt = 0,
    Yl = null,
    ml = 1,
    _l = '';
  function xl(e, t) {
    ((Za[Ja++] = Qi), (Za[Ja++] = ss), (ss = e), (Qi = t));
  }
  function lm(e, t, a) {
    ((Vt[Qt++] = ml), (Vt[Qt++] = _l), (Vt[Qt++] = Yl), (Yl = e));
    var i = ml;
    e = _l;
    var s = 32 - qt(i) - 1;
    ((i &= ~(1 << s)), (a += 1));
    var u = 32 - qt(t) + s;
    if (30 < u) {
      var m = s - (s % 5);
      ((u = (i & ((1 << m) - 1)).toString(32)),
        (i >>= m),
        (s -= m),
        (ml = (1 << (32 - qt(t) + s)) | (a << s) | i),
        (_l = u + e));
    } else ((ml = (1 << u) | (a << s) | i), (_l = e));
  }
  function fo(e) {
    e.return !== null && (xl(e, 1), lm(e, 1, 0));
  }
  function po(e) {
    for (; e === ss; ) ((ss = Za[--Ja]), (Za[Ja] = null), (Qi = Za[--Ja]), (Za[Ja] = null));
    for (; e === Yl; )
      ((Yl = Vt[--Qt]),
        (Vt[Qt] = null),
        (_l = Vt[--Qt]),
        (Vt[Qt] = null),
        (ml = Vt[--Qt]),
        (Vt[Qt] = null));
  }
  function am(e, t) {
    ((Vt[Qt++] = ml), (Vt[Qt++] = _l), (Vt[Qt++] = Yl), (ml = t.id), (_l = t.overflow), (Yl = e));
  }
  var pt = null,
    $e = null,
    Ce = !1,
    Xl = null,
    Kt = !1,
    ho = Error(r(519));
  function Vl(e) {
    var t = Error(
      r(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (Ki(Xt(t, e)), ho);
  }
  function im(e) {
    var t = e.stateNode,
      a = e.type,
      i = e.memoizedProps;
    switch (((t[ft] = e), (t[xt] = i), a)) {
      case 'dialog':
        (Se('cancel', t), Se('close', t));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        Se('load', t);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < gn.length; a++) Se(gn[a], t);
        break;
      case 'source':
        Se('error', t);
        break;
      case 'img':
      case 'image':
      case 'link':
        (Se('error', t), Se('load', t));
        break;
      case 'details':
        Se('toggle', t);
        break;
      case 'input':
        (Se('invalid', t),
          gd(t, i.value, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name, !0));
        break;
      case 'select':
        Se('invalid', t);
        break;
      case 'textarea':
        (Se('invalid', t), vd(t, i.value, i.defaultValue, i.children));
    }
    ((a = i.children),
      (typeof a != 'string' && typeof a != 'number' && typeof a != 'bigint') ||
      t.textContent === '' + a ||
      i.suppressHydrationWarning === !0 ||
      xf(t.textContent, a)
        ? (i.popover != null && (Se('beforetoggle', t), Se('toggle', t)),
          i.onScroll != null && Se('scroll', t),
          i.onScrollEnd != null && Se('scrollend', t),
          i.onClick != null && (t.onclick = vl),
          (t = !0))
        : (t = !1),
      t || Vl(e, !0));
  }
  function nm(e) {
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
  function Pa(e) {
    if (e !== pt) return !1;
    if (!Ce) return (nm(e), (Ce = !0), !1);
    var t = e.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = e.type), (a = !(a !== 'form' && a !== 'button') || ju(e.type, e.memoizedProps))),
        (a = !a)),
      a && $e && Vl(e),
      nm(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(r(317));
      $e = Bf(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(r(317));
      $e = Bf(e);
    } else
      t === 27
        ? ((t = $e), sa(e.type) ? ((e = zu), (zu = null), ($e = e)) : ($e = t))
        : ($e = pt ? Jt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function ba() {
    (($e = pt = null), (Ce = !1));
  }
  function go() {
    var e = Xl;
    return (e !== null && (Ct === null ? (Ct = e) : Ct.push.apply(Ct, e), (Xl = null)), e);
  }
  function Ki(e) {
    Xl === null ? (Xl = [e]) : Xl.push(e);
  }
  var ko = A(null),
    xa = null,
    Sl = null;
  function Ql(e, t, a) {
    (F(ko, t._currentValue), (t._currentValue = a));
  }
  function wl(e) {
    ((e._currentValue = ko.current), H(ko));
  }
  function vo(e, t, a) {
    for (; e !== null; ) {
      var i = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), i !== null && (i.childLanes |= t))
          : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t),
        e === a)
      )
        break;
      e = e.return;
    }
  }
  function yo(e, t, a, i) {
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
                vo(u.return, a, e),
                i || (m = null));
              break e;
            }
          u = g.next;
        }
      } else if (s.tag === 18) {
        if (((m = s.return), m === null)) throw Error(r(341));
        ((m.lanes |= a), (u = m.alternate), u !== null && (u.lanes |= a), vo(m, a, e), (m = null));
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
  function Wa(e, t, a, i) {
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
          Mt(s.pendingProps.value, m.value) || (e !== null ? e.push(g) : (e = [g]));
        }
      } else if (s === Ne.current) {
        if (((m = s.alternate), m === null)) throw Error(r(387));
        m.memoizedState.memoizedState !== s.memoizedState.memoizedState &&
          (e !== null ? e.push(xn) : (e = [xn]));
      }
      s = s.return;
    }
    (e !== null && yo(t, e, a, i), (t.flags |= 262144));
  }
  function rs(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Mt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Sa(e) {
    ((xa = e), (Sl = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function ht(e) {
    return sm(xa, e);
  }
  function os(e, t) {
    return (xa === null && Sa(e), sm(e, t));
  }
  function sm(e, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), Sl === null)) {
      if (e === null) throw Error(r(308));
      ((Sl = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else Sl = Sl.next = t;
    return a;
  }
  var pk =
      typeof AbortController < 'u'
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (a, i) {
                  e.push(i);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                e.forEach(function (a) {
                  return a();
                }));
            };
          },
    hk = l.unstable_scheduleCallback,
    gk = l.unstable_NormalPriority,
    lt = {
      $$typeof: R,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function bo() {
    return { controller: new pk(), data: new Map(), refCount: 0 };
  }
  function Zi(e) {
    (e.refCount--,
      e.refCount === 0 &&
        hk(gk, function () {
          e.controller.abort();
        }));
  }
  var Ji = null,
    xo = 0,
    Fa = 0,
    ei = null;
  function kk(e, t) {
    if (Ji === null) {
      var a = (Ji = []);
      ((xo = 0),
        (Fa = Tu()),
        (ei = {
          status: 'pending',
          value: void 0,
          then: function (i) {
            a.push(i);
          },
        }));
    }
    return (xo++, t.then(rm, rm), t);
  }
  function rm() {
    if (--xo === 0 && Ji !== null) {
      ei !== null && (ei.status = 'fulfilled');
      var e = Ji;
      ((Ji = null), (Fa = 0), (ei = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function vk(e, t) {
    var a = [],
      i = {
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
          ((i.status = 'fulfilled'), (i.value = t));
          for (var s = 0; s < a.length; s++) (0, a[s])(t);
        },
        function (s) {
          for (i.status = 'rejected', i.reason = s, s = 0; s < a.length; s++) (0, a[s])(void 0);
        }
      ),
      i
    );
  }
  var om = q.S;
  q.S = function (e, t) {
    ((X_ = Lt()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && kk(e, t),
      om !== null && om(e, t));
  };
  var wa = A(null);
  function So() {
    var e = wa.current;
    return e !== null ? e : Ge.pooledCache;
  }
  function us(e, t) {
    t === null ? F(wa, wa.current) : F(wa, t.pool);
  }
  function um() {
    var e = So();
    return e === null ? null : { parent: lt._currentValue, pool: e };
  }
  var ti = Error(r(460)),
    wo = Error(r(474)),
    cs = Error(r(542)),
    ds = { then: function () {} };
  function cm(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function dm(e, t, a) {
    switch (
      ((a = e[a]), a === void 0 ? e.push(t) : a !== t && (t.then(vl, vl), (t = a)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), _m(e), e);
      default:
        if (typeof t.status == 'string') t.then(vl, vl);
        else {
          if (((e = Ge), e !== null && 100 < e.shellSuspendCounter)) throw Error(r(482));
          ((e = t),
            (e.status = 'pending'),
            e.then(
              function (i) {
                if (t.status === 'pending') {
                  var s = t;
                  ((s.status = 'fulfilled'), (s.value = i));
                }
              },
              function (i) {
                if (t.status === 'pending') {
                  var s = t;
                  ((s.status = 'rejected'), (s.reason = i));
                }
              }
            ));
        }
        switch (t.status) {
          case 'fulfilled':
            return t.value;
          case 'rejected':
            throw ((e = t.reason), _m(e), e);
        }
        throw ((Ea = t), ti);
    }
  }
  function Ta(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == 'object' && typeof a.then == 'function' ? ((Ea = a), ti) : a;
    }
  }
  var Ea = null;
  function mm() {
    if (Ea === null) throw Error(r(459));
    var e = Ea;
    return ((Ea = null), e);
  }
  function _m(e) {
    if (e === ti || e === cs) throw Error(r(483));
  }
  var li = null,
    Pi = 0;
  function ms(e) {
    var t = Pi;
    return ((Pi += 1), li === null && (li = []), dm(li, e, t));
  }
  function Wi(e, t) {
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
  function fm(e) {
    function t(M, N) {
      if (e) {
        var j = M.deletions;
        j === null ? ((M.deletions = [N]), (M.flags |= 16)) : j.push(N);
      }
    }
    function a(M, N) {
      if (!e) return null;
      for (; N !== null; ) (t(M, N), (N = N.sibling));
      return null;
    }
    function i(M) {
      for (var N = new Map(); M !== null; )
        (M.key !== null ? N.set(M.key, M) : N.set(M.index, M), (M = M.sibling));
      return N;
    }
    function s(M, N) {
      return ((M = bl(M, N)), (M.index = 0), (M.sibling = null), M);
    }
    function u(M, N, j) {
      return (
        (M.index = j),
        e
          ? ((j = M.alternate),
            j !== null
              ? ((j = j.index), j < N ? ((M.flags |= 67108866), N) : j)
              : ((M.flags |= 67108866), N))
          : ((M.flags |= 1048576), N)
      );
    }
    function m(M) {
      return (e && M.alternate === null && (M.flags |= 67108866), M);
    }
    function g(M, N, j, $) {
      return N === null || N.tag !== 6
        ? ((N = mo(j, M.mode, $)), (N.return = M), N)
        : ((N = s(N, j)), (N.return = M), N);
    }
    function x(M, N, j, $) {
      var se = j.type;
      return se === B
        ? U(M, N, j.props.children, $, j.key)
        : N !== null &&
            (N.elementType === se ||
              (typeof se == 'object' && se !== null && se.$$typeof === Q && Ta(se) === N.type))
          ? ((N = s(N, j.props)), Wi(N, j), (N.return = M), N)
          : ((N = ns(j.type, j.key, j.props, null, M.mode, $)), Wi(N, j), (N.return = M), N);
    }
    function O(M, N, j, $) {
      return N === null ||
        N.tag !== 4 ||
        N.stateNode.containerInfo !== j.containerInfo ||
        N.stateNode.implementation !== j.implementation
        ? ((N = _o(j, M.mode, $)), (N.return = M), N)
        : ((N = s(N, j.children || [])), (N.return = M), N);
    }
    function U(M, N, j, $, se) {
      return N === null || N.tag !== 7
        ? ((N = ya(j, M.mode, $, se)), (N.return = M), N)
        : ((N = s(N, j)), (N.return = M), N);
    }
    function X(M, N, j) {
      if ((typeof N == 'string' && N !== '') || typeof N == 'number' || typeof N == 'bigint')
        return ((N = mo('' + N, M.mode, j)), (N.return = M), N);
      if (typeof N == 'object' && N !== null) {
        switch (N.$$typeof) {
          case L:
            return ((j = ns(N.type, N.key, N.props, null, M.mode, j)), Wi(j, N), (j.return = M), j);
          case b:
            return ((N = _o(N, M.mode, j)), (N.return = M), N);
          case Q:
            return ((N = Ta(N)), X(M, N, j));
        }
        if (_e(N) || ce(N)) return ((N = ya(N, M.mode, j, null)), (N.return = M), N);
        if (typeof N.then == 'function') return X(M, ms(N), j);
        if (N.$$typeof === R) return X(M, os(M, N), j);
        _s(M, N);
      }
      return null;
    }
    function D(M, N, j, $) {
      var se = N !== null ? N.key : null;
      if ((typeof j == 'string' && j !== '') || typeof j == 'number' || typeof j == 'bigint')
        return se !== null ? null : g(M, N, '' + j, $);
      if (typeof j == 'object' && j !== null) {
        switch (j.$$typeof) {
          case L:
            return j.key === se ? x(M, N, j, $) : null;
          case b:
            return j.key === se ? O(M, N, j, $) : null;
          case Q:
            return ((j = Ta(j)), D(M, N, j, $));
        }
        if (_e(j) || ce(j)) return se !== null ? null : U(M, N, j, $, null);
        if (typeof j.then == 'function') return D(M, N, ms(j), $);
        if (j.$$typeof === R) return D(M, N, os(M, j), $);
        _s(M, j);
      }
      return null;
    }
    function I(M, N, j, $, se) {
      if ((typeof $ == 'string' && $ !== '') || typeof $ == 'number' || typeof $ == 'bigint')
        return ((M = M.get(j) || null), g(N, M, '' + $, se));
      if (typeof $ == 'object' && $ !== null) {
        switch ($.$$typeof) {
          case L:
            return ((M = M.get($.key === null ? j : $.key) || null), x(N, M, $, se));
          case b:
            return ((M = M.get($.key === null ? j : $.key) || null), O(N, M, $, se));
          case Q:
            return (($ = Ta($)), I(M, N, j, $, se));
        }
        if (_e($) || ce($)) return ((M = M.get(j) || null), U(N, M, $, se, null));
        if (typeof $.then == 'function') return I(M, N, j, ms($), se);
        if ($.$$typeof === R) return I(M, N, j, os(N, $), se);
        _s(N, $);
      }
      return null;
    }
    function ae(M, N, j, $) {
      for (
        var se = null, Ae = null, ie = N, ye = (N = 0), Ee = null;
        ie !== null && ye < j.length;
        ye++
      ) {
        ie.index > ye ? ((Ee = ie), (ie = null)) : (Ee = ie.sibling);
        var Le = D(M, ie, j[ye], $);
        if (Le === null) {
          ie === null && (ie = Ee);
          break;
        }
        (e && ie && Le.alternate === null && t(M, ie),
          (N = u(Le, N, ye)),
          Ae === null ? (se = Le) : (Ae.sibling = Le),
          (Ae = Le),
          (ie = Ee));
      }
      if (ye === j.length) return (a(M, ie), Ce && xl(M, ye), se);
      if (ie === null) {
        for (; ye < j.length; ye++)
          ((ie = X(M, j[ye], $)),
            ie !== null &&
              ((N = u(ie, N, ye)), Ae === null ? (se = ie) : (Ae.sibling = ie), (Ae = ie)));
        return (Ce && xl(M, ye), se);
      }
      for (ie = i(ie); ye < j.length; ye++)
        ((Ee = I(ie, M, ye, j[ye], $)),
          Ee !== null &&
            (e && Ee.alternate !== null && ie.delete(Ee.key === null ? ye : Ee.key),
            (N = u(Ee, N, ye)),
            Ae === null ? (se = Ee) : (Ae.sibling = Ee),
            (Ae = Ee)));
      return (
        e &&
          ie.forEach(function (da) {
            return t(M, da);
          }),
        Ce && xl(M, ye),
        se
      );
    }
    function oe(M, N, j, $) {
      if (j == null) throw Error(r(151));
      for (
        var se = null, Ae = null, ie = N, ye = (N = 0), Ee = null, Le = j.next();
        ie !== null && !Le.done;
        ye++, Le = j.next()
      ) {
        ie.index > ye ? ((Ee = ie), (ie = null)) : (Ee = ie.sibling);
        var da = D(M, ie, Le.value, $);
        if (da === null) {
          ie === null && (ie = Ee);
          break;
        }
        (e && ie && da.alternate === null && t(M, ie),
          (N = u(da, N, ye)),
          Ae === null ? (se = da) : (Ae.sibling = da),
          (Ae = da),
          (ie = Ee));
      }
      if (Le.done) return (a(M, ie), Ce && xl(M, ye), se);
      if (ie === null) {
        for (; !Le.done; ye++, Le = j.next())
          ((Le = X(M, Le.value, $)),
            Le !== null &&
              ((N = u(Le, N, ye)), Ae === null ? (se = Le) : (Ae.sibling = Le), (Ae = Le)));
        return (Ce && xl(M, ye), se);
      }
      for (ie = i(ie); !Le.done; ye++, Le = j.next())
        ((Le = I(ie, M, ye, Le.value, $)),
          Le !== null &&
            (e && Le.alternate !== null && ie.delete(Le.key === null ? ye : Le.key),
            (N = u(Le, N, ye)),
            Ae === null ? (se = Le) : (Ae.sibling = Le),
            (Ae = Le)));
      return (
        e &&
          ie.forEach(function (Lv) {
            return t(M, Lv);
          }),
        Ce && xl(M, ye),
        se
      );
    }
    function ze(M, N, j, $) {
      if (
        (typeof j == 'object' &&
          j !== null &&
          j.type === B &&
          j.key === null &&
          (j = j.props.children),
        typeof j == 'object' && j !== null)
      ) {
        switch (j.$$typeof) {
          case L:
            e: {
              for (var se = j.key; N !== null; ) {
                if (N.key === se) {
                  if (((se = j.type), se === B)) {
                    if (N.tag === 7) {
                      (a(M, N.sibling), ($ = s(N, j.props.children)), ($.return = M), (M = $));
                      break e;
                    }
                  } else if (
                    N.elementType === se ||
                    (typeof se == 'object' && se !== null && se.$$typeof === Q && Ta(se) === N.type)
                  ) {
                    (a(M, N.sibling), ($ = s(N, j.props)), Wi($, j), ($.return = M), (M = $));
                    break e;
                  }
                  a(M, N);
                  break;
                } else t(M, N);
                N = N.sibling;
              }
              j.type === B
                ? (($ = ya(j.props.children, M.mode, $, j.key)), ($.return = M), (M = $))
                : (($ = ns(j.type, j.key, j.props, null, M.mode, $)),
                  Wi($, j),
                  ($.return = M),
                  (M = $));
            }
            return m(M);
          case b:
            e: {
              for (se = j.key; N !== null; ) {
                if (N.key === se)
                  if (
                    N.tag === 4 &&
                    N.stateNode.containerInfo === j.containerInfo &&
                    N.stateNode.implementation === j.implementation
                  ) {
                    (a(M, N.sibling), ($ = s(N, j.children || [])), ($.return = M), (M = $));
                    break e;
                  } else {
                    a(M, N);
                    break;
                  }
                else t(M, N);
                N = N.sibling;
              }
              (($ = _o(j, M.mode, $)), ($.return = M), (M = $));
            }
            return m(M);
          case Q:
            return ((j = Ta(j)), ze(M, N, j, $));
        }
        if (_e(j)) return ae(M, N, j, $);
        if (ce(j)) {
          if (((se = ce(j)), typeof se != 'function')) throw Error(r(150));
          return ((j = se.call(j)), oe(M, N, j, $));
        }
        if (typeof j.then == 'function') return ze(M, N, ms(j), $);
        if (j.$$typeof === R) return ze(M, N, os(M, j), $);
        _s(M, j);
      }
      return (typeof j == 'string' && j !== '') || typeof j == 'number' || typeof j == 'bigint'
        ? ((j = '' + j),
          N !== null && N.tag === 6
            ? (a(M, N.sibling), ($ = s(N, j)), ($.return = M), (M = $))
            : (a(M, N), ($ = mo(j, M.mode, $)), ($.return = M), (M = $)),
          m(M))
        : a(M, N);
    }
    return function (M, N, j, $) {
      try {
        Pi = 0;
        var se = ze(M, N, j, $);
        return ((li = null), se);
      } catch (ie) {
        if (ie === ti || ie === cs) throw ie;
        var Ae = jt(29, ie, null, M.mode);
        return ((Ae.lanes = $), (Ae.return = M), Ae);
      } finally {
      }
    };
  }
  var Ca = fm(!0),
    pm = fm(!1),
    Kl = !1;
  function To(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Eo(e, t) {
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
  function Zl(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Jl(e, t, a) {
    var i = e.updateQueue;
    if (i === null) return null;
    if (((i = i.shared), (qe & 2) !== 0)) {
      var s = i.pending;
      return (
        s === null ? (t.next = t) : ((t.next = s.next), (s.next = t)),
        (i.pending = t),
        (t = is(e)),
        Wd(e, null, a),
        t
      );
    }
    return (as(e, i, t, a), is(e));
  }
  function Fi(e, t, a) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194048) !== 0))) {
      var i = t.lanes;
      ((i &= e.pendingLanes), (a |= i), (t.lanes = a), sd(e, a));
    }
  }
  function Co(e, t) {
    var a = e.updateQueue,
      i = e.alternate;
    if (i !== null && ((i = i.updateQueue), a === i)) {
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
        baseState: i.baseState,
        firstBaseUpdate: s,
        lastBaseUpdate: u,
        shared: i.shared,
        callbacks: i.callbacks,
      }),
        (e.updateQueue = a));
      return;
    }
    ((e = a.lastBaseUpdate),
      e === null ? (a.firstBaseUpdate = t) : (e.next = t),
      (a.lastBaseUpdate = t));
  }
  var No = !1;
  function en() {
    if (No) {
      var e = ei;
      if (e !== null) throw e;
    }
  }
  function tn(e, t, a, i) {
    No = !1;
    var s = e.updateQueue;
    Kl = !1;
    var u = s.firstBaseUpdate,
      m = s.lastBaseUpdate,
      g = s.shared.pending;
    if (g !== null) {
      s.shared.pending = null;
      var x = g,
        O = x.next;
      ((x.next = null), m === null ? (u = O) : (m.next = O), (m = x));
      var U = e.alternate;
      U !== null &&
        ((U = U.updateQueue),
        (g = U.lastBaseUpdate),
        g !== m && (g === null ? (U.firstBaseUpdate = O) : (g.next = O), (U.lastBaseUpdate = x)));
    }
    if (u !== null) {
      var X = s.baseState;
      ((m = 0), (U = O = x = null), (g = u));
      do {
        var D = g.lane & -536870913,
          I = D !== g.lane;
        if (I ? (Te & D) === D : (i & D) === D) {
          (D !== 0 && D === Fa && (No = !0),
            U !== null &&
              (U = U.next =
                { lane: 0, tag: g.tag, payload: g.payload, callback: null, next: null }));
          e: {
            var ae = e,
              oe = g;
            D = t;
            var ze = a;
            switch (oe.tag) {
              case 1:
                if (((ae = oe.payload), typeof ae == 'function')) {
                  X = ae.call(ze, X, D);
                  break e;
                }
                X = ae;
                break e;
              case 3:
                ae.flags = (ae.flags & -65537) | 128;
              case 0:
                if (
                  ((ae = oe.payload),
                  (D = typeof ae == 'function' ? ae.call(ze, X, D) : ae),
                  D == null)
                )
                  break e;
                X = y({}, X, D);
                break e;
              case 2:
                Kl = !0;
            }
          }
          ((D = g.callback),
            D !== null &&
              ((e.flags |= 64),
              I && (e.flags |= 8192),
              (I = s.callbacks),
              I === null ? (s.callbacks = [D]) : I.push(D)));
        } else
          ((I = { lane: D, tag: g.tag, payload: g.payload, callback: g.callback, next: null }),
            U === null ? ((O = U = I), (x = X)) : (U = U.next = I),
            (m |= D));
        if (((g = g.next), g === null)) {
          if (((g = s.shared.pending), g === null)) break;
          ((I = g),
            (g = I.next),
            (I.next = null),
            (s.lastBaseUpdate = I),
            (s.shared.pending = null));
        }
      } while (!0);
      (U === null && (x = X),
        (s.baseState = x),
        (s.firstBaseUpdate = O),
        (s.lastBaseUpdate = U),
        u === null && (s.shared.lanes = 0),
        (ta |= m),
        (e.lanes = m),
        (e.memoizedState = X));
    }
  }
  function hm(e, t) {
    if (typeof e != 'function') throw Error(r(191, e));
    e.call(t);
  }
  function gm(e, t) {
    var a = e.callbacks;
    if (a !== null) for (e.callbacks = null, e = 0; e < a.length; e++) hm(a[e], t);
  }
  var ai = A(null),
    fs = A(0);
  function km(e, t) {
    ((e = Ml), F(fs, e), F(ai, t), (Ml = e | t.baseLanes));
  }
  function Ao() {
    (F(fs, Ml), F(ai, ai.current));
  }
  function Lo() {
    ((Ml = fs.current), H(ai), H(fs));
  }
  var Ot = A(null),
    Zt = null;
  function Pl(e) {
    var t = e.alternate;
    (F(et, et.current & 1),
      F(Ot, e),
      Zt === null && (t === null || ai.current !== null || t.memoizedState !== null) && (Zt = e));
  }
  function Bo(e) {
    (F(et, et.current), F(Ot, e), Zt === null && (Zt = e));
  }
  function vm(e) {
    e.tag === 22 ? (F(et, et.current), F(Ot, e), Zt === null && (Zt = e)) : Wl();
  }
  function Wl() {
    (F(et, et.current), F(Ot, Ot.current));
  }
  function Dt(e) {
    (H(Ot), Zt === e && (Zt = null), H(et));
  }
  var et = A(0);
  function ps(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || Iu(a) || Ru(a))) return t;
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
  var Tl = 0,
    ke = null,
    Ie = null,
    at = null,
    hs = !1,
    ii = !1,
    Na = !1,
    gs = 0,
    ln = 0,
    ni = null,
    yk = 0;
  function Je() {
    throw Error(r(321));
  }
  function qo(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++) if (!Mt(e[a], t[a])) return !1;
    return !0;
  }
  function Mo(e, t, a, i, s, u) {
    return (
      (Tl = u),
      (ke = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (q.H = e === null || e.memoizedState === null ? l_ : Ko),
      (Na = !1),
      (u = a(i, s)),
      (Na = !1),
      ii && (u = bm(t, a, i, s)),
      ym(e),
      u
    );
  }
  function ym(e) {
    q.H = sn;
    var t = Ie !== null && Ie.next !== null;
    if (((Tl = 0), (at = Ie = ke = null), (hs = !1), (ln = 0), (ni = null), t)) throw Error(r(300));
    e === null || it || ((e = e.dependencies), e !== null && rs(e) && (it = !0));
  }
  function bm(e, t, a, i) {
    ke = e;
    var s = 0;
    do {
      if ((ii && (ni = null), (ln = 0), (ii = !1), 25 <= s)) throw Error(r(301));
      if (((s += 1), (at = Ie = null), e.updateQueue != null)) {
        var u = e.updateQueue;
        ((u.lastEffect = null),
          (u.events = null),
          (u.stores = null),
          u.memoCache != null && (u.memoCache.index = 0));
      }
      ((q.H = a_), (u = t(a, i)));
    } while (ii);
    return u;
  }
  function bk() {
    var e = q.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? an(t) : t),
      (e = e.useState()[0]),
      (Ie !== null ? Ie.memoizedState : null) !== e && (ke.flags |= 1024),
      t
    );
  }
  function jo() {
    var e = gs !== 0;
    return ((gs = 0), e);
  }
  function Oo(e, t, a) {
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
    ((Tl = 0), (at = Ie = ke = null), (ii = !1), (ln = gs = 0), (ni = null));
  }
  function yt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (at === null ? (ke.memoizedState = at = e) : (at = at.next = e), at);
  }
  function tt() {
    if (Ie === null) {
      var e = ke.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ie.next;
    var t = at === null ? ke.memoizedState : at.next;
    if (t !== null) ((at = t), (Ie = e));
    else {
      if (e === null) throw ke.alternate === null ? Error(r(467)) : Error(r(310));
      ((Ie = e),
        (e = {
          memoizedState: Ie.memoizedState,
          baseState: Ie.baseState,
          baseQueue: Ie.baseQueue,
          queue: Ie.queue,
          next: null,
        }),
        at === null ? (ke.memoizedState = at = e) : (at = at.next = e));
    }
    return at;
  }
  function ks() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function an(e) {
    var t = ln;
    return (
      (ln += 1),
      ni === null && (ni = []),
      (e = dm(ni, e, t)),
      (t = ke),
      (at === null ? t.memoizedState : at.next) === null &&
        ((t = t.alternate), (q.H = t === null || t.memoizedState === null ? l_ : Ko)),
      e
    );
  }
  function vs(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return an(e);
      if (e.$$typeof === R) return ht(e);
    }
    throw Error(r(438, String(e)));
  }
  function Io(e) {
    var t = null,
      a = ke.updateQueue;
    if ((a !== null && (t = a.memoCache), t == null)) {
      var i = ke.alternate;
      i !== null &&
        ((i = i.updateQueue),
        i !== null &&
          ((i = i.memoCache),
          i != null &&
            (t = {
              data: i.data.map(function (s) {
                return s.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      a === null && ((a = ks()), (ke.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(e), i = 0; i < e; i++) a[i] = ne;
    return (t.index++, a);
  }
  function El(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function ys(e) {
    var t = tt();
    return Ro(t, Ie, e);
  }
  function Ro(e, t, a) {
    var i = e.queue;
    if (i === null) throw Error(r(311));
    i.lastRenderedReducer = a;
    var s = e.baseQueue,
      u = i.pending;
    if (u !== null) {
      if (s !== null) {
        var m = s.next;
        ((s.next = u.next), (u.next = m));
      }
      ((t.baseQueue = s = u), (i.pending = null));
    }
    if (((u = e.baseState), s === null)) e.memoizedState = u;
    else {
      t = s.next;
      var g = (m = null),
        x = null,
        O = t,
        U = !1;
      do {
        var X = O.lane & -536870913;
        if (X !== O.lane ? (Te & X) === X : (Tl & X) === X) {
          var D = O.revertLane;
          if (D === 0)
            (x !== null &&
              (x = x.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: O.action,
                  hasEagerState: O.hasEagerState,
                  eagerState: O.eagerState,
                  next: null,
                }),
              X === Fa && (U = !0));
          else if ((Tl & D) === D) {
            ((O = O.next), D === Fa && (U = !0));
            continue;
          } else
            ((X = {
              lane: 0,
              revertLane: O.revertLane,
              gesture: null,
              action: O.action,
              hasEagerState: O.hasEagerState,
              eagerState: O.eagerState,
              next: null,
            }),
              x === null ? ((g = x = X), (m = u)) : (x = x.next = X),
              (ke.lanes |= D),
              (ta |= D));
          ((X = O.action), Na && a(u, X), (u = O.hasEagerState ? O.eagerState : a(u, X)));
        } else
          ((D = {
            lane: X,
            revertLane: O.revertLane,
            gesture: O.gesture,
            action: O.action,
            hasEagerState: O.hasEagerState,
            eagerState: O.eagerState,
            next: null,
          }),
            x === null ? ((g = x = D), (m = u)) : (x = x.next = D),
            (ke.lanes |= X),
            (ta |= X));
        O = O.next;
      } while (O !== null && O !== t);
      if (
        (x === null ? (m = u) : (x.next = g),
        !Mt(u, e.memoizedState) && ((it = !0), U && ((a = ei), a !== null)))
      )
        throw a;
      ((e.memoizedState = u), (e.baseState = m), (e.baseQueue = x), (i.lastRenderedState = u));
    }
    return (s === null && (i.lanes = 0), [e.memoizedState, i.dispatch]);
  }
  function zo(e) {
    var t = tt(),
      a = t.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = e;
    var i = a.dispatch,
      s = a.pending,
      u = t.memoizedState;
    if (s !== null) {
      a.pending = null;
      var m = (s = s.next);
      do ((u = e(u, m.action)), (m = m.next));
      while (m !== s);
      (Mt(u, t.memoizedState) || (it = !0),
        (t.memoizedState = u),
        t.baseQueue === null && (t.baseState = u),
        (a.lastRenderedState = u));
    }
    return [u, i];
  }
  function xm(e, t, a) {
    var i = ke,
      s = tt(),
      u = Ce;
    if (u) {
      if (a === void 0) throw Error(r(407));
      a = a();
    } else a = t();
    var m = !Mt((Ie || s).memoizedState, a);
    if (
      (m && ((s.memoizedState = a), (it = !0)),
      (s = s.queue),
      Go(Tm.bind(null, i, s, e), [e]),
      s.getSnapshot !== t || m || (at !== null && at.memoizedState.tag & 1))
    ) {
      if (
        ((i.flags |= 2048),
        si(9, { destroy: void 0 }, wm.bind(null, i, s, a, t), null),
        Ge === null)
      )
        throw Error(r(349));
      u || (Tl & 127) !== 0 || Sm(i, t, a);
    }
    return a;
  }
  function Sm(e, t, a) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: a }),
      (t = ke.updateQueue),
      t === null
        ? ((t = ks()), (ke.updateQueue = t), (t.stores = [e]))
        : ((a = t.stores), a === null ? (t.stores = [e]) : a.push(e)));
  }
  function wm(e, t, a, i) {
    ((t.value = a), (t.getSnapshot = i), Em(t) && Cm(e));
  }
  function Tm(e, t, a) {
    return a(function () {
      Em(t) && Cm(e);
    });
  }
  function Em(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !Mt(e, a);
    } catch {
      return !0;
    }
  }
  function Cm(e) {
    var t = va(e, 2);
    t !== null && Nt(t, e, 2);
  }
  function Uo(e) {
    var t = yt();
    if (typeof e == 'function') {
      var a = e;
      if (((e = a()), Na)) {
        Hl(!0);
        try {
          a();
        } finally {
          Hl(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: El,
        lastRenderedState: e,
      }),
      t
    );
  }
  function Nm(e, t, a, i) {
    return ((e.baseState = a), Ro(e, Ie, typeof i == 'function' ? i : El));
  }
  function xk(e, t, a, i, s) {
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
      (q.T !== null ? a(!0) : (u.isTransition = !1),
        i(u),
        (a = t.pending),
        a === null
          ? ((u.next = t.pending = u), Am(t, u))
          : ((u.next = a.next), (t.pending = a.next = u)));
    }
  }
  function Am(e, t) {
    var a = t.action,
      i = t.payload,
      s = e.state;
    if (t.isTransition) {
      var u = q.T,
        m = {};
      q.T = m;
      try {
        var g = a(s, i),
          x = q.S;
        (x !== null && x(m, g), Lm(e, t, g));
      } catch (O) {
        Ho(e, t, O);
      } finally {
        (u !== null && m.types !== null && (u.types = m.types), (q.T = u));
      }
    } else
      try {
        ((u = a(s, i)), Lm(e, t, u));
      } catch (O) {
        Ho(e, t, O);
      }
  }
  function Lm(e, t, a) {
    a !== null && typeof a == 'object' && typeof a.then == 'function'
      ? a.then(
          function (i) {
            Bm(e, t, i);
          },
          function (i) {
            return Ho(e, t, i);
          }
        )
      : Bm(e, t, a);
  }
  function Bm(e, t, a) {
    ((t.status = 'fulfilled'),
      (t.value = a),
      qm(t),
      (e.state = a),
      (t = e.pending),
      t !== null &&
        ((a = t.next), a === t ? (e.pending = null) : ((a = a.next), (t.next = a), Am(e, a))));
  }
  function Ho(e, t, a) {
    var i = e.pending;
    if (((e.pending = null), i !== null)) {
      i = i.next;
      do ((t.status = 'rejected'), (t.reason = a), qm(t), (t = t.next));
      while (t !== i);
    }
    e.action = null;
  }
  function qm(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Mm(e, t) {
    return t;
  }
  function jm(e, t) {
    if (Ce) {
      var a = Ge.formState;
      if (a !== null) {
        e: {
          var i = ke;
          if (Ce) {
            if ($e) {
              t: {
                for (var s = $e, u = Kt; s.nodeType !== 8; ) {
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
                (($e = Jt(s.nextSibling)), (i = s.data === 'F!'));
                break e;
              }
            }
            Vl(i);
          }
          i = !1;
        }
        i && (t = a[0]);
      }
    }
    return (
      (a = yt()),
      (a.memoizedState = a.baseState = t),
      (i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Mm,
        lastRenderedState: t,
      }),
      (a.queue = i),
      (a = Fm.bind(null, ke, i)),
      (i.dispatch = a),
      (i = Uo(!1)),
      (u = Qo.bind(null, ke, !1, i.queue)),
      (i = yt()),
      (s = { state: t, dispatch: null, action: e, pending: null }),
      (i.queue = s),
      (a = xk.bind(null, ke, s, u, a)),
      (s.dispatch = a),
      (i.memoizedState = e),
      [t, a, !1]
    );
  }
  function Om(e) {
    var t = tt();
    return Dm(t, Ie, e);
  }
  function Dm(e, t, a) {
    if (
      ((t = Ro(e, t, Mm)[0]),
      (e = ys(El)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var i = an(t);
      } catch (m) {
        throw m === ti ? cs : m;
      }
    else i = t;
    t = tt();
    var s = t.queue,
      u = s.dispatch;
    return (
      a !== t.memoizedState &&
        ((ke.flags |= 2048), si(9, { destroy: void 0 }, Sk.bind(null, s, a), null)),
      [i, u, e]
    );
  }
  function Sk(e, t) {
    e.action = t;
  }
  function Im(e) {
    var t = tt(),
      a = Ie;
    if (a !== null) return Dm(t, a, e);
    (tt(), (t = t.memoizedState), (a = tt()));
    var i = a.queue.dispatch;
    return ((a.memoizedState = e), [t, i, !1]);
  }
  function si(e, t, a, i) {
    return (
      (e = { tag: e, create: a, deps: i, inst: t, next: null }),
      (t = ke.updateQueue),
      t === null && ((t = ks()), (ke.updateQueue = t)),
      (a = t.lastEffect),
      a === null
        ? (t.lastEffect = e.next = e)
        : ((i = a.next), (a.next = e), (e.next = i), (t.lastEffect = e)),
      e
    );
  }
  function Rm() {
    return tt().memoizedState;
  }
  function bs(e, t, a, i) {
    var s = yt();
    ((ke.flags |= e),
      (s.memoizedState = si(1 | t, { destroy: void 0 }, a, i === void 0 ? null : i)));
  }
  function xs(e, t, a, i) {
    var s = tt();
    i = i === void 0 ? null : i;
    var u = s.memoizedState.inst;
    Ie !== null && i !== null && qo(i, Ie.memoizedState.deps)
      ? (s.memoizedState = si(t, u, a, i))
      : ((ke.flags |= e), (s.memoizedState = si(1 | t, u, a, i)));
  }
  function zm(e, t) {
    bs(8390656, 8, e, t);
  }
  function Go(e, t) {
    xs(2048, 8, e, t);
  }
  function wk(e) {
    ke.flags |= 4;
    var t = ke.updateQueue;
    if (t === null) ((t = ks()), (ke.updateQueue = t), (t.events = [e]));
    else {
      var a = t.events;
      a === null ? (t.events = [e]) : a.push(e);
    }
  }
  function Um(e) {
    var t = tt().memoizedState;
    return (
      wk({ ref: t, nextImpl: e }),
      function () {
        if ((qe & 2) !== 0) throw Error(r(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function Hm(e, t) {
    return xs(4, 2, e, t);
  }
  function Gm(e, t) {
    return xs(4, 4, e, t);
  }
  function $m(e, t) {
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
  function Ym(e, t, a) {
    ((a = a != null ? a.concat([e]) : null), xs(4, 4, $m.bind(null, t, e), a));
  }
  function $o() {}
  function Xm(e, t) {
    var a = tt();
    t = t === void 0 ? null : t;
    var i = a.memoizedState;
    return t !== null && qo(t, i[1]) ? i[0] : ((a.memoizedState = [e, t]), e);
  }
  function Vm(e, t) {
    var a = tt();
    t = t === void 0 ? null : t;
    var i = a.memoizedState;
    if (t !== null && qo(t, i[1])) return i[0];
    if (((i = e()), Na)) {
      Hl(!0);
      try {
        e();
      } finally {
        Hl(!1);
      }
    }
    return ((a.memoizedState = [i, t]), i);
  }
  function Yo(e, t, a) {
    return a === void 0 || ((Tl & 1073741824) !== 0 && (Te & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = a), (e = Q_()), (ke.lanes |= e), (ta |= e), a);
  }
  function Qm(e, t, a, i) {
    return Mt(a, t)
      ? a
      : ai.current !== null
        ? ((e = Yo(e, a, i)), Mt(e, t) || (it = !0), e)
        : (Tl & 42) === 0 || ((Tl & 1073741824) !== 0 && (Te & 261930) === 0)
          ? ((it = !0), (e.memoizedState = a))
          : ((e = Q_()), (ke.lanes |= e), (ta |= e), t);
  }
  function Km(e, t, a, i, s) {
    var u = V.p;
    V.p = u !== 0 && 8 > u ? u : 8;
    var m = q.T,
      g = {};
    ((q.T = g), Qo(e, !1, t, a));
    try {
      var x = s(),
        O = q.S;
      if (
        (O !== null && O(g, x), x !== null && typeof x == 'object' && typeof x.then == 'function')
      ) {
        var U = vk(x, i);
        nn(e, t, U, zt(e));
      } else nn(e, t, i, zt(e));
    } catch (X) {
      nn(e, t, { then: function () {}, status: 'rejected', reason: X }, zt());
    } finally {
      ((V.p = u), m !== null && g.types !== null && (m.types = g.types), (q.T = m));
    }
  }
  function Tk() {}
  function Xo(e, t, a, i) {
    if (e.tag !== 5) throw Error(r(476));
    var s = Zm(e).queue;
    Km(
      e,
      s,
      t,
      ee,
      a === null
        ? Tk
        : function () {
            return (Jm(e), a(i));
          }
    );
  }
  function Zm(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: ee,
      baseState: ee,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: El,
        lastRenderedState: ee,
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
          lastRenderedReducer: El,
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
  function Jm(e) {
    var t = Zm(e);
    (t.next === null && (t = e.alternate.memoizedState), nn(e, t.next.queue, {}, zt()));
  }
  function Vo() {
    return ht(xn);
  }
  function Pm() {
    return tt().memoizedState;
  }
  function Wm() {
    return tt().memoizedState;
  }
  function Ek(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = zt();
          e = Zl(a);
          var i = Jl(t, e, a);
          (i !== null && (Nt(i, t, a), Fi(i, t, a)), (t = { cache: bo() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function Ck(e, t, a) {
    var i = zt();
    ((a = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Ss(e) ? e_(t, a) : ((a = uo(e, t, a, i)), a !== null && (Nt(a, e, i), t_(a, t, i))));
  }
  function Fm(e, t, a) {
    var i = zt();
    nn(e, t, a, i);
  }
  function nn(e, t, a, i) {
    var s = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Ss(e)) e_(t, s);
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
          if (((s.hasEagerState = !0), (s.eagerState = g), Mt(g, m)))
            return (as(e, t, s, 0), Ge === null && ls(), !1);
        } catch {
        } finally {
        }
      if (((a = uo(e, t, s, i)), a !== null)) return (Nt(a, e, i), t_(a, t, i), !0);
    }
    return !1;
  }
  function Qo(e, t, a, i) {
    if (
      ((i = {
        lane: 2,
        revertLane: Tu(),
        gesture: null,
        action: i,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Ss(e))
    ) {
      if (t) throw Error(r(479));
    } else ((t = uo(e, a, i, 2)), t !== null && Nt(t, e, 2));
  }
  function Ss(e) {
    var t = e.alternate;
    return e === ke || (t !== null && t === ke);
  }
  function e_(e, t) {
    ii = hs = !0;
    var a = e.pending;
    (a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)), (e.pending = t));
  }
  function t_(e, t, a) {
    if ((a & 4194048) !== 0) {
      var i = t.lanes;
      ((i &= e.pendingLanes), (a |= i), (t.lanes = a), sd(e, a));
    }
  }
  var sn = {
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
  sn.useEffectEvent = Je;
  var l_ = {
      readContext: ht,
      use: vs,
      useCallback: function (e, t) {
        return ((yt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: ht,
      useEffect: zm,
      useImperativeHandle: function (e, t, a) {
        ((a = a != null ? a.concat([e]) : null), bs(4194308, 4, $m.bind(null, t, e), a));
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
        var i = e();
        if (Na) {
          Hl(!0);
          try {
            e();
          } finally {
            Hl(!1);
          }
        }
        return ((a.memoizedState = [i, t]), i);
      },
      useReducer: function (e, t, a) {
        var i = yt();
        if (a !== void 0) {
          var s = a(t);
          if (Na) {
            Hl(!0);
            try {
              a(t);
            } finally {
              Hl(!1);
            }
          }
        } else s = t;
        return (
          (i.memoizedState = i.baseState = s),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: s,
          }),
          (i.queue = e),
          (e = e.dispatch = Ck.bind(null, ke, e)),
          [i.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = yt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = Uo(e);
        var t = e.queue,
          a = Fm.bind(null, ke, t);
        return ((t.dispatch = a), [e.memoizedState, a]);
      },
      useDebugValue: $o,
      useDeferredValue: function (e, t) {
        var a = yt();
        return Yo(a, e, t);
      },
      useTransition: function () {
        var e = Uo(!1);
        return ((e = Km.bind(null, ke, e.queue, !0, !1)), (yt().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, a) {
        var i = ke,
          s = yt();
        if (Ce) {
          if (a === void 0) throw Error(r(407));
          a = a();
        } else {
          if (((a = t()), Ge === null)) throw Error(r(349));
          (Te & 127) !== 0 || Sm(i, t, a);
        }
        s.memoizedState = a;
        var u = { value: a, getSnapshot: t };
        return (
          (s.queue = u),
          zm(Tm.bind(null, i, u, e), [e]),
          (i.flags |= 2048),
          si(9, { destroy: void 0 }, wm.bind(null, i, u, a, t), null),
          a
        );
      },
      useId: function () {
        var e = yt(),
          t = Ge.identifierPrefix;
        if (Ce) {
          var a = _l,
            i = ml;
          ((a = (i & ~(1 << (32 - qt(i) - 1))).toString(32) + a),
            (t = '_' + t + 'R_' + a),
            (a = gs++),
            0 < a && (t += 'H' + a.toString(32)),
            (t += '_'));
        } else ((a = yk++), (t = '_' + t + 'r_' + a.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: Vo,
      useFormState: jm,
      useActionState: jm,
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
        return ((t.queue = a), (t = Qo.bind(null, ke, !0, a)), (a.dispatch = t), [e, t]);
      },
      useMemoCache: Io,
      useCacheRefresh: function () {
        return (yt().memoizedState = Ek.bind(null, ke));
      },
      useEffectEvent: function (e) {
        var t = yt(),
          a = { impl: e };
        return (
          (t.memoizedState = a),
          function () {
            if ((qe & 2) !== 0) throw Error(r(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Ko = {
      readContext: ht,
      use: vs,
      useCallback: Xm,
      useContext: ht,
      useEffect: Go,
      useImperativeHandle: Ym,
      useInsertionEffect: Hm,
      useLayoutEffect: Gm,
      useMemo: Vm,
      useReducer: ys,
      useRef: Rm,
      useState: function () {
        return ys(El);
      },
      useDebugValue: $o,
      useDeferredValue: function (e, t) {
        var a = tt();
        return Qm(a, Ie.memoizedState, e, t);
      },
      useTransition: function () {
        var e = ys(El)[0],
          t = tt().memoizedState;
        return [typeof e == 'boolean' ? e : an(e), t];
      },
      useSyncExternalStore: xm,
      useId: Pm,
      useHostTransitionStatus: Vo,
      useFormState: Om,
      useActionState: Om,
      useOptimistic: function (e, t) {
        var a = tt();
        return Nm(a, Ie, e, t);
      },
      useMemoCache: Io,
      useCacheRefresh: Wm,
    };
  Ko.useEffectEvent = Um;
  var a_ = {
    readContext: ht,
    use: vs,
    useCallback: Xm,
    useContext: ht,
    useEffect: Go,
    useImperativeHandle: Ym,
    useInsertionEffect: Hm,
    useLayoutEffect: Gm,
    useMemo: Vm,
    useReducer: zo,
    useRef: Rm,
    useState: function () {
      return zo(El);
    },
    useDebugValue: $o,
    useDeferredValue: function (e, t) {
      var a = tt();
      return Ie === null ? Yo(a, e, t) : Qm(a, Ie.memoizedState, e, t);
    },
    useTransition: function () {
      var e = zo(El)[0],
        t = tt().memoizedState;
      return [typeof e == 'boolean' ? e : an(e), t];
    },
    useSyncExternalStore: xm,
    useId: Pm,
    useHostTransitionStatus: Vo,
    useFormState: Im,
    useActionState: Im,
    useOptimistic: function (e, t) {
      var a = tt();
      return Ie !== null ? Nm(a, Ie, e, t) : ((a.baseState = e), [e, a.queue.dispatch]);
    },
    useMemoCache: Io,
    useCacheRefresh: Wm,
  };
  a_.useEffectEvent = Um;
  function Zo(e, t, a, i) {
    ((t = e.memoizedState),
      (a = a(i, t)),
      (a = a == null ? t : y({}, t, a)),
      (e.memoizedState = a),
      e.lanes === 0 && (e.updateQueue.baseState = a));
  }
  var Jo = {
    enqueueSetState: function (e, t, a) {
      e = e._reactInternals;
      var i = zt(),
        s = Zl(i);
      ((s.payload = t),
        a != null && (s.callback = a),
        (t = Jl(e, s, i)),
        t !== null && (Nt(t, e, i), Fi(t, e, i)));
    },
    enqueueReplaceState: function (e, t, a) {
      e = e._reactInternals;
      var i = zt(),
        s = Zl(i);
      ((s.tag = 1),
        (s.payload = t),
        a != null && (s.callback = a),
        (t = Jl(e, s, i)),
        t !== null && (Nt(t, e, i), Fi(t, e, i)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var a = zt(),
        i = Zl(a);
      ((i.tag = 2),
        t != null && (i.callback = t),
        (t = Jl(e, i, a)),
        t !== null && (Nt(t, e, a), Fi(t, e, a)));
    },
  };
  function i_(e, t, a, i, s, u, m) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(i, u, m)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Xi(a, i) || !Xi(s, u)
          : !0
    );
  }
  function n_(e, t, a, i) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(a, i),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(a, i),
      t.state !== e && Jo.enqueueReplaceState(t, t.state, null));
  }
  function Aa(e, t) {
    var a = t;
    if ('ref' in t) {
      a = {};
      for (var i in t) i !== 'ref' && (a[i] = t[i]);
    }
    if ((e = e.defaultProps)) {
      a === t && (a = y({}, a));
      for (var s in e) a[s] === void 0 && (a[s] = e[s]);
    }
    return a;
  }
  function s_(e) {
    ts(e);
  }
  function r_(e) {
    console.error(e);
  }
  function o_(e) {
    ts(e);
  }
  function ws(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (i) {
      setTimeout(function () {
        throw i;
      });
    }
  }
  function u_(e, t, a) {
    try {
      var i = e.onCaughtError;
      i(a.value, { componentStack: a.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (s) {
      setTimeout(function () {
        throw s;
      });
    }
  }
  function Po(e, t, a) {
    return (
      (a = Zl(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        ws(e, t);
      }),
      a
    );
  }
  function c_(e) {
    return ((e = Zl(e)), (e.tag = 3), e);
  }
  function d_(e, t, a, i) {
    var s = a.type.getDerivedStateFromError;
    if (typeof s == 'function') {
      var u = i.value;
      ((e.payload = function () {
        return s(u);
      }),
        (e.callback = function () {
          u_(t, a, i);
        }));
    }
    var m = a.stateNode;
    m !== null &&
      typeof m.componentDidCatch == 'function' &&
      (e.callback = function () {
        (u_(t, a, i),
          typeof s != 'function' && (la === null ? (la = new Set([this])) : la.add(this)));
        var g = i.stack;
        this.componentDidCatch(i.value, { componentStack: g !== null ? g : '' });
      });
  }
  function Nk(e, t, a, i, s) {
    if (((a.flags |= 32768), i !== null && typeof i == 'object' && typeof i.then == 'function')) {
      if (((t = a.alternate), t !== null && Wa(t, a, s, !0), (a = Ot.current), a !== null)) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              Zt === null ? Ds() : a.alternate === null && Pe === 0 && (Pe = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = s),
              i === ds
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([i])) : t.add(i),
                  xu(e, i, s)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              i === ds
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([i]) }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue), a === null ? (t.retryQueue = new Set([i])) : a.add(i)),
                  xu(e, i, s)),
              !1
            );
        }
        throw Error(r(435, a.tag));
      }
      return (xu(e, i, s), Ds(), !1);
    }
    if (Ce)
      return (
        (t = Ot.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = s),
            i !== ho && ((e = Error(r(422), { cause: i })), Ki(Xt(e, a))))
          : (i !== ho && ((t = Error(r(423), { cause: i })), Ki(Xt(t, a))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (s &= -s),
            (e.lanes |= s),
            (i = Xt(i, a)),
            (s = Po(e.stateNode, i, s)),
            Co(e, s),
            Pe !== 4 && (Pe = 2)),
        !1
      );
    var u = Error(r(520), { cause: i });
    if (((u = Xt(u, a)), fn === null ? (fn = [u]) : fn.push(u), Pe !== 4 && (Pe = 2), t === null))
      return !0;
    ((i = Xt(i, a)), (a = t));
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (e = s & -s),
            (a.lanes |= e),
            (e = Po(a.stateNode, i, e)),
            Co(a, e),
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
                  (la === null || !la.has(u)))))
          )
            return (
              (a.flags |= 65536),
              (s &= -s),
              (a.lanes |= s),
              (s = c_(s)),
              d_(s, e, a, i),
              Co(a, s),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var Wo = Error(r(461)),
    it = !1;
  function gt(e, t, a, i) {
    t.child = e === null ? pm(t, null, a, i) : Ca(t, e.child, a, i);
  }
  function m_(e, t, a, i, s) {
    a = a.render;
    var u = t.ref;
    if ('ref' in i) {
      var m = {};
      for (var g in i) g !== 'ref' && (m[g] = i[g]);
    } else m = i;
    return (
      Sa(t),
      (i = Mo(e, t, a, m, u, s)),
      (g = jo()),
      e !== null && !it
        ? (Oo(e, t, s), Cl(e, t, s))
        : (Ce && g && fo(t), (t.flags |= 1), gt(e, t, i, s), t.child)
    );
  }
  function __(e, t, a, i, s) {
    if (e === null) {
      var u = a.type;
      return typeof u == 'function' && !co(u) && u.defaultProps === void 0 && a.compare === null
        ? ((t.tag = 15), (t.type = u), f_(e, t, u, i, s))
        : ((e = ns(a.type, null, i, t, t.mode, s)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((u = e.child), !su(e, s))) {
      var m = u.memoizedProps;
      if (((a = a.compare), (a = a !== null ? a : Xi), a(m, i) && e.ref === t.ref))
        return Cl(e, t, s);
    }
    return ((t.flags |= 1), (e = bl(u, i)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function f_(e, t, a, i, s) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (Xi(u, i) && e.ref === t.ref)
        if (((it = !1), (t.pendingProps = i = u), su(e, s))) (e.flags & 131072) !== 0 && (it = !0);
        else return ((t.lanes = e.lanes), Cl(e, t, s));
    }
    return Fo(e, t, a, i, s);
  }
  function p_(e, t, a, i) {
    var s = i.children,
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
      i.mode === 'hidden')
    ) {
      if ((t.flags & 128) !== 0) {
        if (((u = u !== null ? u.baseLanes | a : a), e !== null)) {
          for (i = t.child = e.child, s = 0; i !== null; )
            ((s = s | i.lanes | i.childLanes), (i = i.sibling));
          i = s & ~u;
        } else ((i = 0), (t.child = null));
        return h_(e, t, u, a, i);
      }
      if ((a & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && us(t, u !== null ? u.cachePool : null),
          u !== null ? km(t, u) : Ao(),
          vm(t));
      else return ((i = t.lanes = 536870912), h_(e, t, u !== null ? u.baseLanes | a : a, a, i));
    } else
      u !== null
        ? (us(t, u.cachePool), km(t, u), Wl(), (t.memoizedState = null))
        : (e !== null && us(t, null), Ao(), Wl());
    return (gt(e, t, s, a), t.child);
  }
  function rn(e, t) {
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
  function h_(e, t, a, i, s) {
    var u = So();
    return (
      (u = u === null ? null : { parent: lt._currentValue, pool: u }),
      (t.memoizedState = { baseLanes: a, cachePool: u }),
      e !== null && us(t, null),
      Ao(),
      vm(t),
      e !== null && Wa(e, t, i, !0),
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
  function g_(e, t, a) {
    return (
      Ca(t, e.child, null, a),
      (e = Ts(t, t.pendingProps)),
      (e.flags |= 2),
      Dt(t),
      (t.memoizedState = null),
      e
    );
  }
  function Ak(e, t, a) {
    var i = t.pendingProps,
      s = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (Ce) {
        if (i.mode === 'hidden') return ((e = Ts(t, i)), (t.lanes = 536870912), rn(null, e));
        if (
          (Bo(t),
          (e = $e)
            ? ((e = Lf(e, Kt)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Yl !== null ? { id: ml, overflow: _l } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = em(e)),
                (a.return = t),
                (t.child = a),
                (pt = t),
                ($e = null)))
            : (e = null),
          e === null)
        )
          throw Vl(t);
        return ((t.lanes = 536870912), null);
      }
      return Ts(t, i);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var m = u.dehydrated;
      if ((Bo(t), s))
        if (t.flags & 256) ((t.flags &= -257), (t = g_(e, t, a)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(r(558));
      else if ((it || Wa(e, t, a, !1), (s = (a & e.childLanes) !== 0), it || s)) {
        if (((i = Ge), i !== null && ((m = rd(i, a)), m !== 0 && m !== u.retryLane)))
          throw ((u.retryLane = m), va(e, m), Nt(i, e, m), Wo);
        (Ds(), (t = g_(e, t, a)));
      } else
        ((e = u.treeContext),
          ($e = Jt(m.nextSibling)),
          (pt = t),
          (Ce = !0),
          (Xl = null),
          (Kt = !1),
          e !== null && am(t, e),
          (t = Ts(t, i)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = bl(e.child, { mode: i.mode, children: i.children })),
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
  function Fo(e, t, a, i, s) {
    return (
      Sa(t),
      (a = Mo(e, t, a, i, void 0, s)),
      (i = jo()),
      e !== null && !it
        ? (Oo(e, t, s), Cl(e, t, s))
        : (Ce && i && fo(t), (t.flags |= 1), gt(e, t, a, s), t.child)
    );
  }
  function k_(e, t, a, i, s, u) {
    return (
      Sa(t),
      (t.updateQueue = null),
      (a = bm(t, i, a, s)),
      ym(e),
      (i = jo()),
      e !== null && !it
        ? (Oo(e, t, u), Cl(e, t, u))
        : (Ce && i && fo(t), (t.flags |= 1), gt(e, t, a, u), t.child)
    );
  }
  function v_(e, t, a, i, s) {
    if ((Sa(t), t.stateNode === null)) {
      var u = Ka,
        m = a.contextType;
      (typeof m == 'object' && m !== null && (u = ht(m)),
        (u = new a(i, u)),
        (t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null),
        (u.updater = Jo),
        (t.stateNode = u),
        (u._reactInternals = t),
        (u = t.stateNode),
        (u.props = i),
        (u.state = t.memoizedState),
        (u.refs = {}),
        To(t),
        (m = a.contextType),
        (u.context = typeof m == 'object' && m !== null ? ht(m) : Ka),
        (u.state = t.memoizedState),
        (m = a.getDerivedStateFromProps),
        typeof m == 'function' && (Zo(t, a, m, i), (u.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == 'function' ||
          typeof u.getSnapshotBeforeUpdate == 'function' ||
          (typeof u.UNSAFE_componentWillMount != 'function' &&
            typeof u.componentWillMount != 'function') ||
          ((m = u.state),
          typeof u.componentWillMount == 'function' && u.componentWillMount(),
          typeof u.UNSAFE_componentWillMount == 'function' && u.UNSAFE_componentWillMount(),
          m !== u.state && Jo.enqueueReplaceState(u, u.state, null),
          tn(t, i, u, s),
          en(),
          (u.state = t.memoizedState)),
        typeof u.componentDidMount == 'function' && (t.flags |= 4194308),
        (i = !0));
    } else if (e === null) {
      u = t.stateNode;
      var g = t.memoizedProps,
        x = Aa(a, g);
      u.props = x;
      var O = u.context,
        U = a.contextType;
      ((m = Ka), typeof U == 'object' && U !== null && (m = ht(U)));
      var X = a.getDerivedStateFromProps;
      ((U = typeof X == 'function' || typeof u.getSnapshotBeforeUpdate == 'function'),
        (g = t.pendingProps !== g),
        U ||
          (typeof u.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof u.componentWillReceiveProps != 'function') ||
          ((g || O !== m) && n_(t, u, i, m)),
        (Kl = !1));
      var D = t.memoizedState;
      ((u.state = D),
        tn(t, i, u, s),
        en(),
        (O = t.memoizedState),
        g || D !== O || Kl
          ? (typeof X == 'function' && (Zo(t, a, X, i), (O = t.memoizedState)),
            (x = Kl || i_(t, a, x, i, D, O, m))
              ? (U ||
                  (typeof u.UNSAFE_componentWillMount != 'function' &&
                    typeof u.componentWillMount != 'function') ||
                  (typeof u.componentWillMount == 'function' && u.componentWillMount(),
                  typeof u.UNSAFE_componentWillMount == 'function' &&
                    u.UNSAFE_componentWillMount()),
                typeof u.componentDidMount == 'function' && (t.flags |= 4194308))
              : (typeof u.componentDidMount == 'function' && (t.flags |= 4194308),
                (t.memoizedProps = i),
                (t.memoizedState = O)),
            (u.props = i),
            (u.state = O),
            (u.context = m),
            (i = x))
          : (typeof u.componentDidMount == 'function' && (t.flags |= 4194308), (i = !1)));
    } else {
      ((u = t.stateNode),
        Eo(e, t),
        (m = t.memoizedProps),
        (U = Aa(a, m)),
        (u.props = U),
        (X = t.pendingProps),
        (D = u.context),
        (O = a.contextType),
        (x = Ka),
        typeof O == 'object' && O !== null && (x = ht(O)),
        (g = a.getDerivedStateFromProps),
        (O = typeof g == 'function' || typeof u.getSnapshotBeforeUpdate == 'function') ||
          (typeof u.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof u.componentWillReceiveProps != 'function') ||
          ((m !== X || D !== x) && n_(t, u, i, x)),
        (Kl = !1),
        (D = t.memoizedState),
        (u.state = D),
        tn(t, i, u, s),
        en());
      var I = t.memoizedState;
      m !== X || D !== I || Kl || (e !== null && e.dependencies !== null && rs(e.dependencies))
        ? (typeof g == 'function' && (Zo(t, a, g, i), (I = t.memoizedState)),
          (U =
            Kl ||
            i_(t, a, U, i, D, I, x) ||
            (e !== null && e.dependencies !== null && rs(e.dependencies)))
            ? (O ||
                (typeof u.UNSAFE_componentWillUpdate != 'function' &&
                  typeof u.componentWillUpdate != 'function') ||
                (typeof u.componentWillUpdate == 'function' && u.componentWillUpdate(i, I, x),
                typeof u.UNSAFE_componentWillUpdate == 'function' &&
                  u.UNSAFE_componentWillUpdate(i, I, x)),
              typeof u.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof u.componentDidUpdate != 'function' ||
                (m === e.memoizedProps && D === e.memoizedState) ||
                (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate != 'function' ||
                (m === e.memoizedProps && D === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = i),
              (t.memoizedState = I)),
          (u.props = i),
          (u.state = I),
          (u.context = x),
          (i = U))
        : (typeof u.componentDidUpdate != 'function' ||
            (m === e.memoizedProps && D === e.memoizedState) ||
            (t.flags |= 4),
          typeof u.getSnapshotBeforeUpdate != 'function' ||
            (m === e.memoizedProps && D === e.memoizedState) ||
            (t.flags |= 1024),
          (i = !1));
    }
    return (
      (u = i),
      Es(e, t),
      (i = (t.flags & 128) !== 0),
      u || i
        ? ((u = t.stateNode),
          (a = i && typeof a.getDerivedStateFromError != 'function' ? null : u.render()),
          (t.flags |= 1),
          e !== null && i
            ? ((t.child = Ca(t, e.child, null, s)), (t.child = Ca(t, null, a, s)))
            : gt(e, t, a, s),
          (t.memoizedState = u.state),
          (e = t.child))
        : (e = Cl(e, t, s)),
      e
    );
  }
  function y_(e, t, a, i) {
    return (ba(), (t.flags |= 256), gt(e, t, a, i), t.child);
  }
  var eu = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function tu(e) {
    return { baseLanes: e, cachePool: um() };
  }
  function lu(e, t, a) {
    return ((e = e !== null ? e.childLanes & ~a : 0), t && (e |= Rt), e);
  }
  function b_(e, t, a) {
    var i = t.pendingProps,
      s = !1,
      u = (t.flags & 128) !== 0,
      m;
    if (
      ((m = u) || (m = e !== null && e.memoizedState === null ? !1 : (et.current & 2) !== 0),
      m && ((s = !0), (t.flags &= -129)),
      (m = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (Ce) {
        if (
          (s ? Pl(t) : Wl(),
          (e = $e)
            ? ((e = Lf(e, Kt)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Yl !== null ? { id: ml, overflow: _l } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = em(e)),
                (a.return = t),
                (t.child = a),
                (pt = t),
                ($e = null)))
            : (e = null),
          e === null)
        )
          throw Vl(t);
        return (Ru(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var g = i.children;
      return (
        (i = i.fallback),
        s
          ? (Wl(),
            (s = t.mode),
            (g = Cs({ mode: 'hidden', children: g }, s)),
            (i = ya(i, s, a, null)),
            (g.return = t),
            (i.return = t),
            (g.sibling = i),
            (t.child = g),
            (i = t.child),
            (i.memoizedState = tu(a)),
            (i.childLanes = lu(e, m, a)),
            (t.memoizedState = eu),
            rn(null, i))
          : (Pl(t), au(t, g))
      );
    }
    var x = e.memoizedState;
    if (x !== null && ((g = x.dehydrated), g !== null)) {
      if (u)
        t.flags & 256
          ? (Pl(t), (t.flags &= -257), (t = iu(e, t, a)))
          : t.memoizedState !== null
            ? (Wl(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (Wl(),
              (g = i.fallback),
              (s = t.mode),
              (i = Cs({ mode: 'visible', children: i.children }, s)),
              (g = ya(g, s, a, null)),
              (g.flags |= 2),
              (i.return = t),
              (g.return = t),
              (i.sibling = g),
              (t.child = i),
              Ca(t, e.child, null, a),
              (i = t.child),
              (i.memoizedState = tu(a)),
              (i.childLanes = lu(e, m, a)),
              (t.memoizedState = eu),
              (t = rn(null, i)));
      else if ((Pl(t), Ru(g))) {
        if (((m = g.nextSibling && g.nextSibling.dataset), m)) var O = m.dgst;
        ((m = O),
          (i = Error(r(419))),
          (i.stack = ''),
          (i.digest = m),
          Ki({ value: i, source: null, stack: null }),
          (t = iu(e, t, a)));
      } else if ((it || Wa(e, t, a, !1), (m = (a & e.childLanes) !== 0), it || m)) {
        if (((m = Ge), m !== null && ((i = rd(m, a)), i !== 0 && i !== x.retryLane)))
          throw ((x.retryLane = i), va(e, i), Nt(m, e, i), Wo);
        (Iu(g) || Ds(), (t = iu(e, t, a)));
      } else
        Iu(g)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = x.treeContext),
            ($e = Jt(g.nextSibling)),
            (pt = t),
            (Ce = !0),
            (Xl = null),
            (Kt = !1),
            e !== null && am(t, e),
            (t = au(t, i.children)),
            (t.flags |= 4096));
      return t;
    }
    return s
      ? (Wl(),
        (g = i.fallback),
        (s = t.mode),
        (x = e.child),
        (O = x.sibling),
        (i = bl(x, { mode: 'hidden', children: i.children })),
        (i.subtreeFlags = x.subtreeFlags & 65011712),
        O !== null ? (g = bl(O, g)) : ((g = ya(g, s, a, null)), (g.flags |= 2)),
        (g.return = t),
        (i.return = t),
        (i.sibling = g),
        (t.child = i),
        rn(null, i),
        (i = t.child),
        (g = e.child.memoizedState),
        g === null
          ? (g = tu(a))
          : ((s = g.cachePool),
            s !== null
              ? ((x = lt._currentValue), (s = s.parent !== x ? { parent: x, pool: x } : s))
              : (s = um()),
            (g = { baseLanes: g.baseLanes | a, cachePool: s })),
        (i.memoizedState = g),
        (i.childLanes = lu(e, m, a)),
        (t.memoizedState = eu),
        rn(e.child, i))
      : (Pl(t),
        (a = e.child),
        (e = a.sibling),
        (a = bl(a, { mode: 'visible', children: i.children })),
        (a.return = t),
        (a.sibling = null),
        e !== null &&
          ((m = t.deletions), m === null ? ((t.deletions = [e]), (t.flags |= 16)) : m.push(e)),
        (t.child = a),
        (t.memoizedState = null),
        a);
  }
  function au(e, t) {
    return ((t = Cs({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function Cs(e, t) {
    return ((e = jt(22, e, null, t)), (e.lanes = 0), e);
  }
  function iu(e, t, a) {
    return (
      Ca(t, e.child, null, a),
      (e = au(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function x_(e, t, a) {
    e.lanes |= t;
    var i = e.alternate;
    (i !== null && (i.lanes |= t), vo(e.return, t, a));
  }
  function nu(e, t, a, i, s, u) {
    var m = e.memoizedState;
    m === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: i,
          tail: a,
          tailMode: s,
          treeForkCount: u,
        })
      : ((m.isBackwards = t),
        (m.rendering = null),
        (m.renderingStartTime = 0),
        (m.last = i),
        (m.tail = a),
        (m.tailMode = s),
        (m.treeForkCount = u));
  }
  function S_(e, t, a) {
    var i = t.pendingProps,
      s = i.revealOrder,
      u = i.tail;
    i = i.children;
    var m = et.current,
      g = (m & 2) !== 0;
    if (
      (g ? ((m = (m & 1) | 2), (t.flags |= 128)) : (m &= 1),
      F(et, m),
      gt(e, t, i, a),
      (i = Ce ? Qi : 0),
      !g && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && x_(e, a, t);
        else if (e.tag === 19) x_(e, a, t);
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
          nu(t, !1, s, a, u, i));
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
        nu(t, !0, a, null, u, i);
        break;
      case 'together':
        nu(t, !1, null, null, void 0, i);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Cl(e, t, a) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (ta |= t.lanes), (a & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((Wa(e, t, a, !1), (a & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(r(153));
    if (t.child !== null) {
      for (e = t.child, a = bl(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        ((e = e.sibling), (a = a.sibling = bl(e, e.pendingProps)), (a.return = t));
      a.sibling = null;
    }
    return t.child;
  }
  function su(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && rs(e)));
  }
  function Lk(e, t, a) {
    switch (t.tag) {
      case 3:
        (ot(t, t.stateNode.containerInfo), Ql(t, lt, e.memoizedState.cache), ba());
        break;
      case 27:
      case 5:
        G(t);
        break;
      case 4:
        ot(t, t.stateNode.containerInfo);
        break;
      case 10:
        Ql(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), Bo(t), null);
        break;
      case 13:
        var i = t.memoizedState;
        if (i !== null)
          return i.dehydrated !== null
            ? (Pl(t), (t.flags |= 128), null)
            : (a & t.child.childLanes) !== 0
              ? b_(e, t, a)
              : (Pl(t), (e = Cl(e, t, a)), e !== null ? e.sibling : null);
        Pl(t);
        break;
      case 19:
        var s = (e.flags & 128) !== 0;
        if (
          ((i = (a & t.childLanes) !== 0),
          i || (Wa(e, t, a, !1), (i = (a & t.childLanes) !== 0)),
          s)
        ) {
          if (i) return S_(e, t, a);
          t.flags |= 128;
        }
        if (
          ((s = t.memoizedState),
          s !== null && ((s.rendering = null), (s.tail = null), (s.lastEffect = null)),
          F(et, et.current),
          i)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), p_(e, t, a, t.pendingProps));
      case 24:
        Ql(t, lt, e.memoizedState.cache);
    }
    return Cl(e, t, a);
  }
  function w_(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) it = !0;
      else {
        if (!su(e, a) && (t.flags & 128) === 0) return ((it = !1), Lk(e, t, a));
        it = (e.flags & 131072) !== 0;
      }
    else ((it = !1), Ce && (t.flags & 1048576) !== 0 && lm(t, Qi, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var i = t.pendingProps;
          if (((e = Ta(t.elementType)), (t.type = e), typeof e == 'function'))
            co(e)
              ? ((i = Aa(e, i)), (t.tag = 1), (t = v_(null, t, e, i, a)))
              : ((t.tag = 0), (t = Fo(null, t, e, i, a)));
          else {
            if (e != null) {
              var s = e.$$typeof;
              if (s === W) {
                ((t.tag = 11), (t = m_(null, t, e, i, a)));
                break e;
              } else if (s === z) {
                ((t.tag = 14), (t = __(null, t, e, i, a)));
                break e;
              }
            }
            throw ((t = J(e) || e), Error(r(306, t, '')));
          }
        }
        return t;
      case 0:
        return Fo(e, t, t.type, t.pendingProps, a);
      case 1:
        return ((i = t.type), (s = Aa(i, t.pendingProps)), v_(e, t, i, s, a));
      case 3:
        e: {
          if ((ot(t, t.stateNode.containerInfo), e === null)) throw Error(r(387));
          i = t.pendingProps;
          var u = t.memoizedState;
          ((s = u.element), Eo(e, t), tn(t, i, null, a));
          var m = t.memoizedState;
          if (
            ((i = m.cache),
            Ql(t, lt, i),
            i !== u.cache && yo(t, [lt], a, !0),
            en(),
            (i = m.element),
            u.isDehydrated)
          )
            if (
              ((u = { element: i, isDehydrated: !1, cache: m.cache }),
              (t.updateQueue.baseState = u),
              (t.memoizedState = u),
              t.flags & 256)
            ) {
              t = y_(e, t, i, a);
              break e;
            } else if (i !== s) {
              ((s = Xt(Error(r(424)), t)), Ki(s), (t = y_(e, t, i, a)));
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
                $e = Jt(e.firstChild),
                  pt = t,
                  Ce = !0,
                  Xl = null,
                  Kt = !0,
                  a = pm(t, null, i, a),
                  t.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
            }
          else {
            if ((ba(), i === s)) {
              t = Cl(e, t, a);
              break e;
            }
            gt(e, t, i, a);
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
              : Ce ||
                ((a = t.type),
                (e = t.pendingProps),
                (i = $s(be.current).createElement(a)),
                (i[ft] = t),
                (i[xt] = e),
                kt(i, a, e),
                ut(i),
                (t.stateNode = i))
            : (t.memoizedState = Df(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          G(t),
          e === null &&
            Ce &&
            ((i = t.stateNode = Mf(t.type, t.pendingProps, be.current)),
            (pt = t),
            (Kt = !0),
            (s = $e),
            sa(t.type) ? ((zu = s), ($e = Jt(i.firstChild))) : ($e = s)),
          gt(e, t, t.pendingProps.children, a),
          Es(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            Ce &&
            ((s = i = $e) &&
              ((i = sv(i, t.type, t.pendingProps, Kt)),
              i !== null
                ? ((t.stateNode = i), (pt = t), ($e = Jt(i.firstChild)), (Kt = !1), (s = !0))
                : (s = !1)),
            s || Vl(t)),
          G(t),
          (s = t.type),
          (u = t.pendingProps),
          (m = e !== null ? e.memoizedProps : null),
          (i = u.children),
          ju(s, u) ? (i = null) : m !== null && ju(s, m) && (t.flags |= 32),
          t.memoizedState !== null && ((s = Mo(e, t, bk, null, null, a)), (xn._currentValue = s)),
          Es(e, t),
          gt(e, t, i, a),
          t.child
        );
      case 6:
        return (
          e === null &&
            Ce &&
            ((e = a = $e) &&
              ((a = rv(a, t.pendingProps, Kt)),
              a !== null ? ((t.stateNode = a), (pt = t), ($e = null), (e = !0)) : (e = !1)),
            e || Vl(t)),
          null
        );
      case 13:
        return b_(e, t, a);
      case 4:
        return (
          ot(t, t.stateNode.containerInfo),
          (i = t.pendingProps),
          e === null ? (t.child = Ca(t, null, i, a)) : gt(e, t, i, a),
          t.child
        );
      case 11:
        return m_(e, t, t.type, t.pendingProps, a);
      case 7:
        return (gt(e, t, t.pendingProps, a), t.child);
      case 8:
        return (gt(e, t, t.pendingProps.children, a), t.child);
      case 12:
        return (gt(e, t, t.pendingProps.children, a), t.child);
      case 10:
        return ((i = t.pendingProps), Ql(t, t.type, i.value), gt(e, t, i.children, a), t.child);
      case 9:
        return (
          (s = t.type._context),
          (i = t.pendingProps.children),
          Sa(t),
          (s = ht(s)),
          (i = i(s)),
          (t.flags |= 1),
          gt(e, t, i, a),
          t.child
        );
      case 14:
        return __(e, t, t.type, t.pendingProps, a);
      case 15:
        return f_(e, t, t.type, t.pendingProps, a);
      case 19:
        return S_(e, t, a);
      case 31:
        return Ak(e, t, a);
      case 22:
        return p_(e, t, a, t.pendingProps);
      case 24:
        return (
          Sa(t),
          (i = ht(lt)),
          e === null
            ? ((s = So()),
              s === null &&
                ((s = Ge),
                (u = bo()),
                (s.pooledCache = u),
                u.refCount++,
                u !== null && (s.pooledCacheLanes |= a),
                (s = u)),
              (t.memoizedState = { parent: i, cache: s }),
              To(t),
              Ql(t, lt, s))
            : ((e.lanes & a) !== 0 && (Eo(e, t), tn(t, null, null, a), en()),
              (s = e.memoizedState),
              (u = t.memoizedState),
              s.parent !== i
                ? ((s = { parent: i, cache: i }),
                  (t.memoizedState = s),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = s),
                  Ql(t, lt, i))
                : ((i = u.cache), Ql(t, lt, i), i !== s.cache && yo(t, [lt], a, !0))),
          gt(e, t, t.pendingProps.children, a),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(r(156, t.tag));
  }
  function Nl(e) {
    e.flags |= 4;
  }
  function ru(e, t, a, i, s) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (s & 335544128) === s))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (P_()) e.flags |= 8192;
        else throw ((Ea = ds), wo);
    } else e.flags &= -16777217;
  }
  function T_(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !Hf(t)))
      if (P_()) e.flags |= 8192;
      else throw ((Ea = ds), wo);
  }
  function Ns(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? id() : 536870912), (e.lanes |= t), (ci |= t)));
  }
  function on(e, t) {
    if (!Ce)
      switch (e.tailMode) {
        case 'hidden':
          t = e.tail;
          for (var a = null; t !== null; ) (t.alternate !== null && (a = t), (t = t.sibling));
          a === null ? (e.tail = null) : (a.sibling = null);
          break;
        case 'collapsed':
          a = e.tail;
          for (var i = null; a !== null; ) (a.alternate !== null && (i = a), (a = a.sibling));
          i === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (i.sibling = null);
      }
  }
  function Ye(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      a = 0,
      i = 0;
    if (t)
      for (var s = e.child; s !== null; )
        ((a |= s.lanes | s.childLanes),
          (i |= s.subtreeFlags & 65011712),
          (i |= s.flags & 65011712),
          (s.return = e),
          (s = s.sibling));
    else
      for (s = e.child; s !== null; )
        ((a |= s.lanes | s.childLanes),
          (i |= s.subtreeFlags),
          (i |= s.flags),
          (s.return = e),
          (s = s.sibling));
    return ((e.subtreeFlags |= i), (e.childLanes = a), t);
  }
  function Bk(e, t, a) {
    var i = t.pendingProps;
    switch ((po(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Ye(t), null);
      case 1:
        return (Ye(t), null);
      case 3:
        return (
          (a = t.stateNode),
          (i = null),
          e !== null && (i = e.memoizedState.cache),
          t.memoizedState.cache !== i && (t.flags |= 2048),
          wl(lt),
          Ve(),
          a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
          (e === null || e.child === null) &&
            (Pa(t)
              ? Nl(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), go())),
          Ye(t),
          null
        );
      case 26:
        var s = t.type,
          u = t.memoizedState;
        return (
          e === null
            ? (Nl(t), u !== null ? (Ye(t), T_(t, u)) : (Ye(t), ru(t, s, null, i, a)))
            : u
              ? u !== e.memoizedState
                ? (Nl(t), Ye(t), T_(t, u))
                : (Ye(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== i && Nl(t), Ye(t), ru(t, s, e, i, a)),
          null
        );
      case 27:
        if ((re(t), (a = be.current), (s = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== i && Nl(t);
        else {
          if (!i) {
            if (t.stateNode === null) throw Error(r(166));
            return (Ye(t), null);
          }
          ((e = le.current), Pa(t) ? im(t) : ((e = Mf(s, i, a)), (t.stateNode = e), Nl(t)));
        }
        return (Ye(t), null);
      case 5:
        if ((re(t), (s = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== i && Nl(t);
        else {
          if (!i) {
            if (t.stateNode === null) throw Error(r(166));
            return (Ye(t), null);
          }
          if (((u = le.current), Pa(t))) im(t);
          else {
            var m = $s(be.current);
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
                      typeof i.is == 'string'
                        ? m.createElement('select', { is: i.is })
                        : m.createElement('select')),
                      i.multiple ? (u.multiple = !0) : i.size && (u.size = i.size));
                    break;
                  default:
                    u =
                      typeof i.is == 'string'
                        ? m.createElement(s, { is: i.is })
                        : m.createElement(s);
                }
            }
            ((u[ft] = t), (u[xt] = i));
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
            e: switch ((kt(u, s, i), s)) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                i = !!i.autoFocus;
                break e;
              case 'img':
                i = !0;
                break e;
              default:
                i = !1;
            }
            i && Nl(t);
          }
        }
        return (Ye(t), ru(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== i && Nl(t);
        else {
          if (typeof i != 'string' && t.stateNode === null) throw Error(r(166));
          if (((e = be.current), Pa(t))) {
            if (((e = t.stateNode), (a = t.memoizedProps), (i = null), (s = pt), s !== null))
              switch (s.tag) {
                case 27:
                case 5:
                  i = s.memoizedProps;
              }
            ((e[ft] = t),
              (e = !!(
                e.nodeValue === a ||
                (i !== null && i.suppressHydrationWarning === !0) ||
                xf(e.nodeValue, a)
              )),
              e || Vl(t, !0));
          } else ((e = $s(e).createTextNode(i)), (e[ft] = t), (t.stateNode = e));
        }
        return (Ye(t), null);
      case 31:
        if (((a = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((i = Pa(t)), a !== null)) {
            if (e === null) {
              if (!i) throw Error(r(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(r(557));
              e[ft] = t;
            } else (ba(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Ye(t), (e = !1));
          } else
            ((a = go()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a),
              (e = !0));
          if (!e) return t.flags & 256 ? (Dt(t), t) : (Dt(t), null);
          if ((t.flags & 128) !== 0) throw Error(r(558));
        }
        return (Ye(t), null);
      case 13:
        if (
          ((i = t.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((s = Pa(t)), i !== null && i.dehydrated !== null)) {
            if (e === null) {
              if (!s) throw Error(r(318));
              if (((s = t.memoizedState), (s = s !== null ? s.dehydrated : null), !s))
                throw Error(r(317));
              s[ft] = t;
            } else (ba(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Ye(t), (s = !1));
          } else
            ((s = go()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = s),
              (s = !0));
          if (!s) return t.flags & 256 ? (Dt(t), t) : (Dt(t), null);
        }
        return (
          Dt(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = a), t)
            : ((a = i !== null),
              (e = e !== null && e.memoizedState !== null),
              a &&
                ((i = t.child),
                (s = null),
                i.alternate !== null &&
                  i.alternate.memoizedState !== null &&
                  i.alternate.memoizedState.cachePool !== null &&
                  (s = i.alternate.memoizedState.cachePool.pool),
                (u = null),
                i.memoizedState !== null &&
                  i.memoizedState.cachePool !== null &&
                  (u = i.memoizedState.cachePool.pool),
                u !== s && (i.flags |= 2048)),
              a !== e && a && (t.child.flags |= 8192),
              Ns(t, t.updateQueue),
              Ye(t),
              null)
        );
      case 4:
        return (Ve(), e === null && Au(t.stateNode.containerInfo), Ye(t), null);
      case 10:
        return (wl(t.type), Ye(t), null);
      case 19:
        if ((H(et), (i = t.memoizedState), i === null)) return (Ye(t), null);
        if (((s = (t.flags & 128) !== 0), (u = i.rendering), u === null))
          if (s) on(i, !1);
          else {
            if (Pe !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((u = ps(e)), u !== null)) {
                  for (
                    t.flags |= 128,
                      on(i, !1),
                      e = u.updateQueue,
                      t.updateQueue = e,
                      Ns(t, e),
                      t.subtreeFlags = 0,
                      e = a,
                      a = t.child;
                    a !== null;
                  )
                    (Fd(a, e), (a = a.sibling));
                  return (F(et, (et.current & 1) | 2), Ce && xl(t, i.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            i.tail !== null &&
              Lt() > Ms &&
              ((t.flags |= 128), (s = !0), on(i, !1), (t.lanes = 4194304));
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
                on(i, !0),
                i.tail === null && i.tailMode === 'hidden' && !u.alternate && !Ce)
              )
                return (Ye(t), null);
            } else
              2 * Lt() - i.renderingStartTime > Ms &&
                a !== 536870912 &&
                ((t.flags |= 128), (s = !0), on(i, !1), (t.lanes = 4194304));
          i.isBackwards
            ? ((u.sibling = t.child), (t.child = u))
            : ((e = i.last), e !== null ? (e.sibling = u) : (t.child = u), (i.last = u));
        }
        return i.tail !== null
          ? ((e = i.tail),
            (i.rendering = e),
            (i.tail = e.sibling),
            (i.renderingStartTime = Lt()),
            (e.sibling = null),
            (a = et.current),
            F(et, s ? (a & 1) | 2 : a & 1),
            Ce && xl(t, i.treeForkCount),
            e)
          : (Ye(t), null);
      case 22:
      case 23:
        return (
          Dt(t),
          Lo(),
          (i = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== i && (t.flags |= 8192)
            : i && (t.flags |= 8192),
          i
            ? (a & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Ye(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Ye(t),
          (a = t.updateQueue),
          a !== null && Ns(t, a.retryQueue),
          (a = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (a = e.memoizedState.cachePool.pool),
          (i = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (i = t.memoizedState.cachePool.pool),
          i !== a && (t.flags |= 2048),
          e !== null && H(wa),
          null
        );
      case 24:
        return (
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          wl(lt),
          Ye(t),
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
    switch ((po(t), t.tag)) {
      case 1:
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 3:
        return (
          wl(lt),
          Ve(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 26:
      case 27:
      case 5:
        return (re(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((Dt(t), t.alternate === null)) throw Error(r(340));
          ba();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((Dt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(r(340));
          ba();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (H(et), null);
      case 4:
        return (Ve(), null);
      case 10:
        return (wl(t.type), null);
      case 22:
      case 23:
        return (
          Dt(t),
          Lo(),
          e !== null && H(wa),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (wl(lt), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function E_(e, t) {
    switch ((po(t), t.tag)) {
      case 3:
        (wl(lt), Ve());
        break;
      case 26:
      case 27:
      case 5:
        re(t);
        break;
      case 4:
        Ve();
        break;
      case 31:
        t.memoizedState !== null && Dt(t);
        break;
      case 13:
        Dt(t);
        break;
      case 19:
        H(et);
        break;
      case 10:
        wl(t.type);
        break;
      case 22:
      case 23:
        (Dt(t), Lo(), e !== null && H(wa));
        break;
      case 24:
        wl(lt);
    }
  }
  function un(e, t) {
    try {
      var a = t.updateQueue,
        i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var s = i.next;
        a = s;
        do {
          if ((a.tag & e) === e) {
            i = void 0;
            var u = a.create,
              m = a.inst;
            ((i = u()), (m.destroy = i));
          }
          a = a.next;
        } while (a !== s);
      }
    } catch (g) {
      De(t, t.return, g);
    }
  }
  function Fl(e, t, a) {
    try {
      var i = t.updateQueue,
        s = i !== null ? i.lastEffect : null;
      if (s !== null) {
        var u = s.next;
        i = u;
        do {
          if ((i.tag & e) === e) {
            var m = i.inst,
              g = m.destroy;
            if (g !== void 0) {
              ((m.destroy = void 0), (s = t));
              var x = a,
                O = g;
              try {
                O();
              } catch (U) {
                De(s, x, U);
              }
            }
          }
          i = i.next;
        } while (i !== u);
      }
    } catch (U) {
      De(t, t.return, U);
    }
  }
  function C_(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        gm(t, a);
      } catch (i) {
        De(e, e.return, i);
      }
    }
  }
  function N_(e, t, a) {
    ((a.props = Aa(e.type, e.memoizedProps)), (a.state = e.memoizedState));
    try {
      a.componentWillUnmount();
    } catch (i) {
      De(e, t, i);
    }
  }
  function cn(e, t) {
    try {
      var a = e.ref;
      if (a !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var i = e.stateNode;
            break;
          case 30:
            i = e.stateNode;
            break;
          default:
            i = e.stateNode;
        }
        typeof a == 'function' ? (e.refCleanup = a(i)) : (a.current = i);
      }
    } catch (s) {
      De(e, t, s);
    }
  }
  function fl(e, t) {
    var a = e.ref,
      i = e.refCleanup;
    if (a !== null)
      if (typeof i == 'function')
        try {
          i();
        } catch (s) {
          De(e, t, s);
        } finally {
          ((e.refCleanup = null), (e = e.alternate), e != null && (e.refCleanup = null));
        }
      else if (typeof a == 'function')
        try {
          a(null);
        } catch (s) {
          De(e, t, s);
        }
      else a.current = null;
  }
  function A_(e) {
    var t = e.type,
      a = e.memoizedProps,
      i = e.stateNode;
    try {
      e: switch (t) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          a.autoFocus && i.focus();
          break e;
        case 'img':
          a.src ? (i.src = a.src) : a.srcSet && (i.srcset = a.srcSet);
      }
    } catch (s) {
      De(e, e.return, s);
    }
  }
  function ou(e, t, a) {
    try {
      var i = e.stateNode;
      (ev(i, e.type, a, t), (i[xt] = t));
    } catch (s) {
      De(e, e.return, s);
    }
  }
  function L_(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && sa(e.type)) || e.tag === 4
    );
  }
  function uu(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || L_(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if ((e.tag === 27 && sa(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function cu(e, t, a) {
    var i = e.tag;
    if (i === 5 || i === 6)
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
            a != null || t.onclick !== null || (t.onclick = vl)));
    else if (
      i !== 4 &&
      (i === 27 && sa(e.type) && ((a = e.stateNode), (t = null)), (e = e.child), e !== null)
    )
      for (cu(e, t, a), e = e.sibling; e !== null; ) (cu(e, t, a), (e = e.sibling));
  }
  function As(e, t, a) {
    var i = e.tag;
    if (i === 5 || i === 6) ((e = e.stateNode), t ? a.insertBefore(e, t) : a.appendChild(e));
    else if (i !== 4 && (i === 27 && sa(e.type) && (a = e.stateNode), (e = e.child), e !== null))
      for (As(e, t, a), e = e.sibling; e !== null; ) (As(e, t, a), (e = e.sibling));
  }
  function B_(e) {
    var t = e.stateNode,
      a = e.memoizedProps;
    try {
      for (var i = e.type, s = t.attributes; s.length; ) t.removeAttributeNode(s[0]);
      (kt(t, i, a), (t[ft] = e), (t[xt] = a));
    } catch (u) {
      De(e, e.return, u);
    }
  }
  var Al = !1,
    nt = !1,
    du = !1,
    q_ = typeof WeakSet == 'function' ? WeakSet : Set,
    ct = null;
  function Mk(e, t) {
    if (((e = e.containerInfo), (qu = Js), (e = Yd(e)), ao(e))) {
      if ('selectionStart' in e) var a = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          a = ((a = e.ownerDocument) && a.defaultView) || window;
          var i = a.getSelection && a.getSelection();
          if (i && i.rangeCount !== 0) {
            a = i.anchorNode;
            var s = i.anchorOffset,
              u = i.focusNode;
            i = i.focusOffset;
            try {
              (a.nodeType, u.nodeType);
            } catch {
              a = null;
              break e;
            }
            var m = 0,
              g = -1,
              x = -1,
              O = 0,
              U = 0,
              X = e,
              D = null;
            t: for (;;) {
              for (
                var I;
                X !== a || (s !== 0 && X.nodeType !== 3) || (g = m + s),
                  X !== u || (i !== 0 && X.nodeType !== 3) || (x = m + i),
                  X.nodeType === 3 && (m += X.nodeValue.length),
                  (I = X.firstChild) !== null;
              )
                ((D = X), (X = I));
              for (;;) {
                if (X === e) break t;
                if (
                  (D === a && ++O === s && (g = m),
                  D === u && ++U === i && (x = m),
                  (I = X.nextSibling) !== null)
                )
                  break;
                ((X = D), (D = X.parentNode));
              }
              X = I;
            }
            a = g === -1 || x === -1 ? null : { start: g, end: x };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Mu = { focusedElem: e, selectionRange: a }, Js = !1, ct = t; ct !== null; )
      if (((t = ct), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (ct = e));
      else
        for (; ct !== null; ) {
          switch (((t = ct), (u = t.alternate), (e = t.flags), t.tag)) {
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
                  (i = a.stateNode));
                try {
                  var ae = Aa(a.type, s);
                  ((e = i.getSnapshotBeforeUpdate(ae, u)),
                    (i.__reactInternalSnapshotBeforeUpdate = e));
                } catch (oe) {
                  De(a, a.return, oe);
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
            ((e.return = t.return), (ct = e));
            break;
          }
          ct = t.return;
        }
  }
  function M_(e, t, a) {
    var i = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (Bl(e, a), i & 4 && un(5, a));
        break;
      case 1:
        if ((Bl(e, a), i & 4))
          if (((e = a.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (m) {
              De(a, a.return, m);
            }
          else {
            var s = Aa(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(s, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (m) {
              De(a, a.return, m);
            }
          }
        (i & 64 && C_(a), i & 512 && cn(a, a.return));
        break;
      case 3:
        if ((Bl(e, a), i & 64 && ((e = a.updateQueue), e !== null))) {
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
            gm(e, t);
          } catch (m) {
            De(a, a.return, m);
          }
        }
        break;
      case 27:
        t === null && i & 4 && B_(a);
      case 26:
      case 5:
        (Bl(e, a), t === null && i & 4 && A_(a), i & 512 && cn(a, a.return));
        break;
      case 12:
        Bl(e, a);
        break;
      case 31:
        (Bl(e, a), i & 4 && D_(e, a));
        break;
      case 13:
        (Bl(e, a),
          i & 4 && I_(e, a),
          i & 64 &&
            ((e = a.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((a = Gk.bind(null, a)), ov(e, a)))));
        break;
      case 22:
        if (((i = a.memoizedState !== null || Al), !i)) {
          ((t = (t !== null && t.memoizedState !== null) || nt), (s = Al));
          var u = nt;
          ((Al = i),
            (nt = t) && !u ? ql(e, a, (a.subtreeFlags & 8772) !== 0) : Bl(e, a),
            (Al = s),
            (nt = u));
        }
        break;
      case 30:
        break;
      default:
        Bl(e, a);
    }
  }
  function j_(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), j_(t)),
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
    wt = !1;
  function Ll(e, t, a) {
    for (a = a.child; a !== null; ) (O_(e, t, a), (a = a.sibling));
  }
  function O_(e, t, a) {
    if (Bt && typeof Bt.onCommitFiberUnmount == 'function')
      try {
        Bt.onCommitFiberUnmount(Mi, a);
      } catch {}
    switch (a.tag) {
      case 26:
        (nt || fl(a, t),
          Ll(e, t, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
        break;
      case 27:
        nt || fl(a, t);
        var i = Qe,
          s = wt;
        (sa(a.type) && ((Qe = a.stateNode), (wt = !1)),
          Ll(e, t, a),
          vn(a.stateNode),
          (Qe = i),
          (wt = s));
        break;
      case 5:
        nt || fl(a, t);
      case 6:
        if (((i = Qe), (s = wt), (Qe = null), Ll(e, t, a), (Qe = i), (wt = s), Qe !== null))
          if (wt)
            try {
              (Qe.nodeType === 9
                ? Qe.body
                : Qe.nodeName === 'HTML'
                  ? Qe.ownerDocument.body
                  : Qe
              ).removeChild(a.stateNode);
            } catch (u) {
              De(a, t, u);
            }
          else
            try {
              Qe.removeChild(a.stateNode);
            } catch (u) {
              De(a, t, u);
            }
        break;
      case 18:
        Qe !== null &&
          (wt
            ? ((e = Qe),
              Nf(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                a.stateNode
              ),
              ki(e))
            : Nf(Qe, a.stateNode));
        break;
      case 4:
        ((i = Qe),
          (s = wt),
          (Qe = a.stateNode.containerInfo),
          (wt = !0),
          Ll(e, t, a),
          (Qe = i),
          (wt = s));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Fl(2, a, t), nt || Fl(4, a, t), Ll(e, t, a));
        break;
      case 1:
        (nt ||
          (fl(a, t), (i = a.stateNode), typeof i.componentWillUnmount == 'function' && N_(a, t, i)),
          Ll(e, t, a));
        break;
      case 21:
        Ll(e, t, a);
        break;
      case 22:
        ((nt = (i = nt) || a.memoizedState !== null), Ll(e, t, a), (nt = i));
        break;
      default:
        Ll(e, t, a);
    }
  }
  function D_(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        ki(e);
      } catch (a) {
        De(t, t.return, a);
      }
    }
  }
  function I_(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        ki(e);
      } catch (a) {
        De(t, t.return, a);
      }
  }
  function jk(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new q_()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new q_()),
          t
        );
      default:
        throw Error(r(435, e.tag));
    }
  }
  function Ls(e, t) {
    var a = jk(e);
    t.forEach(function (i) {
      if (!a.has(i)) {
        a.add(i);
        var s = $k.bind(null, e, i);
        i.then(s, s);
      }
    });
  }
  function Tt(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var i = 0; i < a.length; i++) {
        var s = a[i],
          u = e,
          m = t,
          g = m;
        e: for (; g !== null; ) {
          switch (g.tag) {
            case 27:
              if (sa(g.type)) {
                ((Qe = g.stateNode), (wt = !1));
                break e;
              }
              break;
            case 5:
              ((Qe = g.stateNode), (wt = !1));
              break e;
            case 3:
            case 4:
              ((Qe = g.stateNode.containerInfo), (wt = !0));
              break e;
          }
          g = g.return;
        }
        if (Qe === null) throw Error(r(160));
        (O_(u, m, s),
          (Qe = null),
          (wt = !1),
          (u = s.alternate),
          u !== null && (u.return = null),
          (s.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (R_(t, e), (t = t.sibling));
  }
  var ll = null;
  function R_(e, t) {
    var a = e.alternate,
      i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Tt(t, e), Et(e), i & 4 && (Fl(3, e, e.return), un(3, e), Fl(5, e, e.return)));
        break;
      case 1:
        (Tt(t, e),
          Et(e),
          i & 512 && (nt || a === null || fl(a, a.return)),
          i & 64 &&
            Al &&
            ((e = e.updateQueue),
            e !== null &&
              ((i = e.callbacks),
              i !== null &&
                ((a = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = a === null ? i : a.concat(i))))));
        break;
      case 26:
        var s = ll;
        if ((Tt(t, e), Et(e), i & 512 && (nt || a === null || fl(a, a.return)), i & 4)) {
          var u = a !== null ? a.memoizedState : null;
          if (((i = e.memoizedState), a === null))
            if (i === null)
              if (e.stateNode === null) {
                e: {
                  ((i = e.type), (a = e.memoizedProps), (s = s.ownerDocument || s));
                  t: switch (i) {
                    case 'title':
                      ((u = s.getElementsByTagName('title')[0]),
                        (!u ||
                          u[Di] ||
                          u[ft] ||
                          u.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          u.hasAttribute('itemprop')) &&
                          ((u = s.createElement(i)),
                          s.head.insertBefore(u, s.querySelector('head > title'))),
                        kt(u, i, a),
                        (u[ft] = e),
                        ut(u),
                        (i = u));
                      break e;
                    case 'link':
                      var m = zf('link', 'href', s).get(i + (a.href || ''));
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
                      ((u = s.createElement(i)), kt(u, i, a), s.head.appendChild(u));
                      break;
                    case 'meta':
                      if ((m = zf('meta', 'content', s).get(i + (a.content || '')))) {
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
                      ((u = s.createElement(i)), kt(u, i, a), s.head.appendChild(u));
                      break;
                    default:
                      throw Error(r(468, i));
                  }
                  ((u[ft] = e), ut(u), (i = u));
                }
                e.stateNode = i;
              } else Uf(s, e.type, e.stateNode);
            else e.stateNode = Rf(s, i, e.memoizedProps);
          else
            u !== i
              ? (u === null
                  ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a))
                  : u.count--,
                i === null ? Uf(s, e.type, e.stateNode) : Rf(s, i, e.memoizedProps))
              : i === null && e.stateNode !== null && ou(e, e.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (Tt(t, e),
          Et(e),
          i & 512 && (nt || a === null || fl(a, a.return)),
          a !== null && i & 4 && ou(e, e.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if ((Tt(t, e), Et(e), i & 512 && (nt || a === null || fl(a, a.return)), e.flags & 32)) {
          s = e.stateNode;
          try {
            Ha(s, '');
          } catch (ae) {
            De(e, e.return, ae);
          }
        }
        (i & 4 &&
          e.stateNode != null &&
          ((s = e.memoizedProps), ou(e, s, a !== null ? a.memoizedProps : s)),
          i & 1024 && (du = !0));
        break;
      case 6:
        if ((Tt(t, e), Et(e), i & 4)) {
          if (e.stateNode === null) throw Error(r(162));
          ((i = e.memoizedProps), (a = e.stateNode));
          try {
            a.nodeValue = i;
          } catch (ae) {
            De(e, e.return, ae);
          }
        }
        break;
      case 3:
        if (
          ((Vs = null),
          (s = ll),
          (ll = Ys(t.containerInfo)),
          Tt(t, e),
          (ll = s),
          Et(e),
          i & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            ki(t.containerInfo);
          } catch (ae) {
            De(e, e.return, ae);
          }
        du && ((du = !1), z_(e));
        break;
      case 4:
        ((i = ll), (ll = Ys(e.stateNode.containerInfo)), Tt(t, e), Et(e), (ll = i));
        break;
      case 12:
        (Tt(t, e), Et(e));
        break;
      case 31:
        (Tt(t, e),
          Et(e),
          i & 4 && ((i = e.updateQueue), i !== null && ((e.updateQueue = null), Ls(e, i))));
        break;
      case 13:
        (Tt(t, e),
          Et(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
            (qs = Lt()),
          i & 4 && ((i = e.updateQueue), i !== null && ((e.updateQueue = null), Ls(e, i))));
        break;
      case 22:
        s = e.memoizedState !== null;
        var x = a !== null && a.memoizedState !== null,
          O = Al,
          U = nt;
        if (((Al = O || s), (nt = U || x), Tt(t, e), (nt = U), (Al = O), Et(e), i & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = s ? t._visibility & -2 : t._visibility | 1,
              s && (a === null || x || Al || nt || La(e)),
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
                  De(x, x.return, ae);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                x = t;
                try {
                  x.stateNode.nodeValue = s ? '' : x.memoizedProps;
                } catch (ae) {
                  De(x, x.return, ae);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                x = t;
                try {
                  var I = x.stateNode;
                  s ? Af(I, !0) : Af(x.stateNode, !1);
                } catch (ae) {
                  De(x, x.return, ae);
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
        i & 4 &&
          ((i = e.updateQueue),
          i !== null && ((a = i.retryQueue), a !== null && ((i.retryQueue = null), Ls(e, a))));
        break;
      case 19:
        (Tt(t, e),
          Et(e),
          i & 4 && ((i = e.updateQueue), i !== null && ((e.updateQueue = null), Ls(e, i))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Tt(t, e), Et(e));
    }
  }
  function Et(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, i = e.return; i !== null; ) {
          if (L_(i)) {
            a = i;
            break;
          }
          i = i.return;
        }
        if (a == null) throw Error(r(160));
        switch (a.tag) {
          case 27:
            var s = a.stateNode,
              u = uu(e);
            As(e, u, s);
            break;
          case 5:
            var m = a.stateNode;
            a.flags & 32 && (Ha(m, ''), (a.flags &= -33));
            var g = uu(e);
            As(e, g, m);
            break;
          case 3:
          case 4:
            var x = a.stateNode.containerInfo,
              O = uu(e);
            cu(e, O, x);
            break;
          default:
            throw Error(r(161));
        }
      } catch (U) {
        De(e, e.return, U);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function z_(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (z_(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling));
      }
  }
  function Bl(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (M_(e, t.alternate, t), (t = t.sibling));
  }
  function La(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Fl(4, t, t.return), La(t));
          break;
        case 1:
          fl(t, t.return);
          var a = t.stateNode;
          (typeof a.componentWillUnmount == 'function' && N_(t, t.return, a), La(t));
          break;
        case 27:
          vn(t.stateNode);
        case 26:
        case 5:
          (fl(t, t.return), La(t));
          break;
        case 22:
          t.memoizedState === null && La(t);
          break;
        case 30:
          La(t);
          break;
        default:
          La(t);
      }
      e = e.sibling;
    }
  }
  function ql(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var i = t.alternate,
        s = e,
        u = t,
        m = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          (ql(s, u, a), un(4, u));
          break;
        case 1:
          if ((ql(s, u, a), (i = u), (s = i.stateNode), typeof s.componentDidMount == 'function'))
            try {
              s.componentDidMount();
            } catch (O) {
              De(i, i.return, O);
            }
          if (((i = u), (s = i.updateQueue), s !== null)) {
            var g = i.stateNode;
            try {
              var x = s.shared.hiddenCallbacks;
              if (x !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < x.length; s++) hm(x[s], g);
            } catch (O) {
              De(i, i.return, O);
            }
          }
          (a && m & 64 && C_(u), cn(u, u.return));
          break;
        case 27:
          B_(u);
        case 26:
        case 5:
          (ql(s, u, a), a && i === null && m & 4 && A_(u), cn(u, u.return));
          break;
        case 12:
          ql(s, u, a);
          break;
        case 31:
          (ql(s, u, a), a && m & 4 && D_(s, u));
          break;
        case 13:
          (ql(s, u, a), a && m & 4 && I_(s, u));
          break;
        case 22:
          (u.memoizedState === null && ql(s, u, a), cn(u, u.return));
          break;
        case 30:
          break;
        default:
          ql(s, u, a);
      }
      t = t.sibling;
    }
  }
  function mu(e, t) {
    var a = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (a = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== a && (e != null && e.refCount++, a != null && Zi(a)));
  }
  function _u(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && Zi(e)));
  }
  function al(e, t, a, i) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (U_(e, t, a, i), (t = t.sibling));
  }
  function U_(e, t, a, i) {
    var s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (al(e, t, a, i), s & 2048 && un(9, t));
        break;
      case 1:
        al(e, t, a, i);
        break;
      case 3:
        (al(e, t, a, i),
          s & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && Zi(e))));
        break;
      case 12:
        if (s & 2048) {
          (al(e, t, a, i), (e = t.stateNode));
          try {
            var u = t.memoizedProps,
              m = u.id,
              g = u.onPostCommit;
            typeof g == 'function' &&
              g(m, t.alternate === null ? 'mount' : 'update', e.passiveEffectDuration, -0);
          } catch (x) {
            De(t, t.return, x);
          }
        } else al(e, t, a, i);
        break;
      case 31:
        al(e, t, a, i);
        break;
      case 13:
        al(e, t, a, i);
        break;
      case 23:
        break;
      case 22:
        ((u = t.stateNode),
          (m = t.alternate),
          t.memoizedState !== null
            ? u._visibility & 2
              ? al(e, t, a, i)
              : dn(e, t)
            : u._visibility & 2
              ? al(e, t, a, i)
              : ((u._visibility |= 2), ri(e, t, a, i, (t.subtreeFlags & 10256) !== 0 || !1)),
          s & 2048 && mu(m, t));
        break;
      case 24:
        (al(e, t, a, i), s & 2048 && _u(t.alternate, t));
        break;
      default:
        al(e, t, a, i);
    }
  }
  function ri(e, t, a, i, s) {
    for (s = s && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e,
        m = t,
        g = a,
        x = i,
        O = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          (ri(u, m, g, x, s), un(8, m));
          break;
        case 23:
          break;
        case 22:
          var U = m.stateNode;
          (m.memoizedState !== null
            ? U._visibility & 2
              ? ri(u, m, g, x, s)
              : dn(u, m)
            : ((U._visibility |= 2), ri(u, m, g, x, s)),
            s && O & 2048 && mu(m.alternate, m));
          break;
        case 24:
          (ri(u, m, g, x, s), s && O & 2048 && _u(m.alternate, m));
          break;
        default:
          ri(u, m, g, x, s);
      }
      t = t.sibling;
    }
  }
  function dn(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e,
          i = t,
          s = i.flags;
        switch (i.tag) {
          case 22:
            (dn(a, i), s & 2048 && mu(i.alternate, i));
            break;
          case 24:
            (dn(a, i), s & 2048 && _u(i.alternate, i));
            break;
          default:
            dn(a, i);
        }
        t = t.sibling;
      }
  }
  var mn = 8192;
  function oi(e, t, a) {
    if (e.subtreeFlags & mn) for (e = e.child; e !== null; ) (H_(e, t, a), (e = e.sibling));
  }
  function H_(e, t, a) {
    switch (e.tag) {
      case 26:
        (oi(e, t, a),
          e.flags & mn && e.memoizedState !== null && yv(a, ll, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        oi(e, t, a);
        break;
      case 3:
      case 4:
        var i = ll;
        ((ll = Ys(e.stateNode.containerInfo)), oi(e, t, a), (ll = i));
        break;
      case 22:
        e.memoizedState === null &&
          ((i = e.alternate),
          i !== null && i.memoizedState !== null
            ? ((i = mn), (mn = 16777216), oi(e, t, a), (mn = i))
            : oi(e, t, a));
        break;
      default:
        oi(e, t, a);
    }
  }
  function G_(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function _n(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var i = t[a];
          ((ct = i), Y_(i, e));
        }
      G_(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) ($_(e), (e = e.sibling));
  }
  function $_(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (_n(e), e.flags & 2048 && Fl(9, e, e.return));
        break;
      case 3:
        _n(e);
        break;
      case 12:
        _n(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Bs(e))
          : _n(e);
        break;
      default:
        _n(e);
    }
  }
  function Bs(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var i = t[a];
          ((ct = i), Y_(i, e));
        }
      G_(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (Fl(8, t, t.return), Bs(t));
          break;
        case 22:
          ((a = t.stateNode), a._visibility & 2 && ((a._visibility &= -3), Bs(t)));
          break;
        default:
          Bs(t);
      }
      e = e.sibling;
    }
  }
  function Y_(e, t) {
    for (; ct !== null; ) {
      var a = ct;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Fl(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var i = a.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          Zi(a.memoizedState.cache);
      }
      if (((i = a.child), i !== null)) ((i.return = a), (ct = i));
      else
        e: for (a = e; ct !== null; ) {
          i = ct;
          var s = i.sibling,
            u = i.return;
          if ((j_(i), i === a)) {
            ct = null;
            break e;
          }
          if (s !== null) {
            ((s.return = u), (ct = s));
            break e;
          }
          ct = u;
        }
    }
  }
  var Ok = {
      getCacheForType: function (e) {
        var t = ht(lt),
          a = t.data.get(e);
        return (a === void 0 && ((a = e()), t.data.set(e, a)), a);
      },
      cacheSignal: function () {
        return ht(lt).controller.signal;
      },
    },
    Dk = typeof WeakMap == 'function' ? WeakMap : Map,
    qe = 0,
    Ge = null,
    xe = null,
    Te = 0,
    Oe = 0,
    It = null,
    ea = !1,
    ui = !1,
    fu = !1,
    Ml = 0,
    Pe = 0,
    ta = 0,
    Ba = 0,
    pu = 0,
    Rt = 0,
    ci = 0,
    fn = null,
    Ct = null,
    hu = !1,
    qs = 0,
    X_ = 0,
    Ms = 1 / 0,
    js = null,
    la = null,
    rt = 0,
    aa = null,
    di = null,
    jl = 0,
    gu = 0,
    ku = null,
    V_ = null,
    pn = 0,
    vu = null;
  function zt() {
    return (qe & 2) !== 0 && Te !== 0 ? Te & -Te : q.T !== null ? Tu() : od();
  }
  function Q_() {
    if (Rt === 0)
      if ((Te & 536870912) === 0 || Ce) {
        var e = Gn;
        ((Gn <<= 1), (Gn & 3932160) === 0 && (Gn = 262144), (Rt = e));
      } else Rt = 536870912;
    return ((e = Ot.current), e !== null && (e.flags |= 32), Rt);
  }
  function Nt(e, t, a) {
    (((e === Ge && (Oe === 2 || Oe === 9)) || e.cancelPendingCommit !== null) &&
      (mi(e, 0), ia(e, Te, Rt, !1)),
      Oi(e, a),
      ((qe & 2) === 0 || e !== Ge) &&
        (e === Ge && ((qe & 2) === 0 && (Ba |= a), Pe === 4 && ia(e, Te, Rt, !1)), pl(e)));
  }
  function K_(e, t, a) {
    if ((qe & 6) !== 0) throw Error(r(327));
    var i = (!a && (t & 127) === 0 && (t & e.expiredLanes) === 0) || ji(e, t),
      s = i ? zk(e, t) : bu(e, t, !0),
      u = i;
    do {
      if (s === 0) {
        ui && !i && ia(e, t, 0, !1);
        break;
      } else {
        if (((a = e.current.alternate), u && !Ik(a))) {
          ((s = bu(e, t, !1)), (u = !1));
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
              s = fn;
              var x = g.current.memoizedState.isDehydrated;
              if ((x && (mi(g, m).flags |= 256), (m = bu(g, m, !1)), m !== 2)) {
                if (fu && !x) {
                  ((g.errorRecoveryDisabledLanes |= u), (Ba |= u), (s = 4));
                  break e;
                }
                ((u = Ct), (Ct = s), u !== null && (Ct === null ? (Ct = u) : Ct.push.apply(Ct, u)));
              }
              s = m;
            }
            if (((u = !1), s !== 2)) continue;
          }
        }
        if (s === 1) {
          (mi(e, 0), ia(e, t, 0, !0));
          break;
        }
        e: {
          switch (((i = e), (u = s), u)) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ia(i, t, Rt, !ea);
              break e;
            case 2:
              Ct = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((t & 62914560) === t && ((s = qs + 300 - Lt()), 10 < s)) {
            if ((ia(i, t, Rt, !ea), Yn(i, 0, !0) !== 0)) break e;
            ((jl = t),
              (i.timeoutHandle = Ef(
                Z_.bind(null, i, a, Ct, js, hu, t, Rt, Ba, ci, ea, u, 'Throttled', -0, 0),
                s
              )));
            break e;
          }
          Z_(i, a, Ct, js, hu, t, Rt, Ba, ci, ea, u, null, -0, 0);
        }
      }
      break;
    } while (!0);
    pl(e);
  }
  function Z_(e, t, a, i, s, u, m, g, x, O, U, X, D, I) {
    if (((e.timeoutHandle = -1), (X = t.subtreeFlags), X & 8192 || (X & 16785408) === 16785408)) {
      ((X = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: vl,
      }),
        H_(t, u, X));
      var ae = (u & 62914560) === u ? qs - Lt() : (u & 4194048) === u ? X_ - Lt() : 0;
      if (((ae = bv(X, ae)), ae !== null)) {
        ((jl = u),
          (e.cancelPendingCommit = ae(af.bind(null, e, t, u, a, i, s, m, g, x, U, X, null, D, I))),
          ia(e, u, m, !O));
        return;
      }
    }
    af(e, t, u, a, i, s, m, g, x);
  }
  function Ik(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        t.flags & 16384 &&
        ((a = t.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var i = 0; i < a.length; i++) {
          var s = a[i],
            u = s.getSnapshot;
          s = s.value;
          try {
            if (!Mt(u(), s)) return !1;
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
  function ia(e, t, a, i) {
    ((t &= ~pu),
      (t &= ~Ba),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      i && (e.warmLanes |= t),
      (i = e.expirationTimes));
    for (var s = t; 0 < s; ) {
      var u = 31 - qt(s),
        m = 1 << u;
      ((i[u] = -1), (s &= ~m));
    }
    a !== 0 && nd(e, a, t);
  }
  function Os() {
    return (qe & 6) === 0 ? (hn(0), !1) : !0;
  }
  function yu() {
    if (xe !== null) {
      if (Oe === 0) var e = xe.return;
      else ((e = xe), (Sl = xa = null), Do(e), (li = null), (Pi = 0), (e = xe));
      for (; e !== null; ) (E_(e.alternate, e), (e = e.return));
      xe = null;
    }
  }
  function mi(e, t) {
    var a = e.timeoutHandle;
    (a !== -1 && ((e.timeoutHandle = -1), av(a)),
      (a = e.cancelPendingCommit),
      a !== null && ((e.cancelPendingCommit = null), a()),
      (jl = 0),
      yu(),
      (Ge = e),
      (xe = a = bl(e.current, null)),
      (Te = t),
      (Oe = 0),
      (It = null),
      (ea = !1),
      (ui = ji(e, t)),
      (fu = !1),
      (ci = Rt = pu = Ba = ta = Pe = 0),
      (Ct = fn = null),
      (hu = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var i = e.entangledLanes;
    if (i !== 0)
      for (e = e.entanglements, i &= t; 0 < i; ) {
        var s = 31 - qt(i),
          u = 1 << s;
        ((t |= e[s]), (i &= ~u));
      }
    return ((Ml = t), ls(), a);
  }
  function J_(e, t) {
    ((ke = null),
      (q.H = sn),
      t === ti || t === cs
        ? ((t = mm()), (Oe = 3))
        : t === wo
          ? ((t = mm()), (Oe = 4))
          : (Oe =
              t === Wo
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (It = t),
      xe === null && ((Pe = 1), ws(e, Xt(t, e.current))));
  }
  function P_() {
    var e = Ot.current;
    return e === null
      ? !0
      : (Te & 4194048) === Te
        ? Zt === null
        : (Te & 62914560) === Te || (Te & 536870912) !== 0
          ? e === Zt
          : !1;
  }
  function W_() {
    var e = q.H;
    return ((q.H = sn), e === null ? sn : e);
  }
  function F_() {
    var e = q.A;
    return ((q.A = Ok), e);
  }
  function Ds() {
    ((Pe = 4),
      ea || ((Te & 4194048) !== Te && Ot.current !== null) || (ui = !0),
      ((ta & 134217727) === 0 && (Ba & 134217727) === 0) || Ge === null || ia(Ge, Te, Rt, !1));
  }
  function bu(e, t, a) {
    var i = qe;
    qe |= 2;
    var s = W_(),
      u = F_();
    ((Ge !== e || Te !== t) && ((js = null), mi(e, t)), (t = !1));
    var m = Pe;
    e: do
      try {
        if (Oe !== 0 && xe !== null) {
          var g = xe,
            x = It;
          switch (Oe) {
            case 8:
              (yu(), (m = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Ot.current === null && (t = !0);
              var O = Oe;
              if (((Oe = 0), (It = null), _i(e, g, x, O), a && ui)) {
                m = 0;
                break e;
              }
              break;
            default:
              ((O = Oe), (Oe = 0), (It = null), _i(e, g, x, O));
          }
        }
        (Rk(), (m = Pe));
        break;
      } catch (U) {
        J_(e, U);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (Sl = xa = null),
      (qe = i),
      (q.H = s),
      (q.A = u),
      xe === null && ((Ge = null), (Te = 0), ls()),
      m
    );
  }
  function Rk() {
    for (; xe !== null; ) ef(xe);
  }
  function zk(e, t) {
    var a = qe;
    qe |= 2;
    var i = W_(),
      s = F_();
    Ge !== e || Te !== t ? ((js = null), (Ms = Lt() + 500), mi(e, t)) : (ui = ji(e, t));
    e: do
      try {
        if (Oe !== 0 && xe !== null) {
          t = xe;
          var u = It;
          t: switch (Oe) {
            case 1:
              ((Oe = 0), (It = null), _i(e, t, u, 1));
              break;
            case 2:
            case 9:
              if (cm(u)) {
                ((Oe = 0), (It = null), tf(t));
                break;
              }
              ((t = function () {
                ((Oe !== 2 && Oe !== 9) || Ge !== e || (Oe = 7), pl(e));
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
              cm(u) ? ((Oe = 0), (It = null), tf(t)) : ((Oe = 0), (It = null), _i(e, t, u, 7));
              break;
            case 5:
              var m = null;
              switch (xe.tag) {
                case 26:
                  m = xe.memoizedState;
                case 5:
                case 27:
                  var g = xe;
                  if (m ? Hf(m) : g.stateNode.complete) {
                    ((Oe = 0), (It = null));
                    var x = g.sibling;
                    if (x !== null) xe = x;
                    else {
                      var O = g.return;
                      O !== null ? ((xe = O), Is(O)) : (xe = null);
                    }
                    break t;
                  }
              }
              ((Oe = 0), (It = null), _i(e, t, u, 5));
              break;
            case 6:
              ((Oe = 0), (It = null), _i(e, t, u, 6));
              break;
            case 8:
              (yu(), (Pe = 6));
              break e;
            default:
              throw Error(r(462));
          }
        }
        Uk();
        break;
      } catch (U) {
        J_(e, U);
      }
    while (!0);
    return (
      (Sl = xa = null),
      (q.H = i),
      (q.A = s),
      (qe = a),
      xe !== null ? 0 : ((Ge = null), (Te = 0), ls(), Pe)
    );
  }
  function Uk() {
    for (; xe !== null && !ug(); ) ef(xe);
  }
  function ef(e) {
    var t = w_(e.alternate, e, Ml);
    ((e.memoizedProps = e.pendingProps), t === null ? Is(e) : (xe = t));
  }
  function tf(e) {
    var t = e,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = k_(a, t, t.pendingProps, t.type, void 0, Te);
        break;
      case 11:
        t = k_(a, t, t.pendingProps, t.type.render, t.ref, Te);
        break;
      case 5:
        Do(t);
      default:
        (E_(a, t), (t = xe = Fd(t, Ml)), (t = w_(a, t, Ml)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? Is(e) : (xe = t));
  }
  function _i(e, t, a, i) {
    ((Sl = xa = null), Do(t), (li = null), (Pi = 0));
    var s = t.return;
    try {
      if (Nk(e, s, t, a, Te)) {
        ((Pe = 1), ws(e, Xt(a, e.current)), (xe = null));
        return;
      }
    } catch (u) {
      if (s !== null) throw ((xe = s), u);
      ((Pe = 1), ws(e, Xt(a, e.current)), (xe = null));
      return;
    }
    t.flags & 32768
      ? (Ce || i === 1
          ? (e = !0)
          : ui || (Te & 536870912) !== 0
            ? (e = !1)
            : ((ea = e = !0),
              (i === 2 || i === 9 || i === 3 || i === 6) &&
                ((i = Ot.current), i !== null && i.tag === 13 && (i.flags |= 16384))),
        lf(t, e))
      : Is(t);
  }
  function Is(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        lf(t, ea);
        return;
      }
      e = t.return;
      var a = Bk(t.alternate, t, Ml);
      if (a !== null) {
        xe = a;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        xe = t;
        return;
      }
      xe = t = e;
    } while (t !== null);
    Pe === 0 && (Pe = 5);
  }
  function lf(e, t) {
    do {
      var a = qk(e.alternate, e);
      if (a !== null) {
        ((a.flags &= 32767), (xe = a));
        return;
      }
      if (
        ((a = e.return),
        a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        xe = e;
        return;
      }
      xe = e = a;
    } while (e !== null);
    ((Pe = 6), (xe = null));
  }
  function af(e, t, a, i, s, u, m, g, x) {
    e.cancelPendingCommit = null;
    do Rs();
    while (rt !== 0);
    if ((qe & 6) !== 0) throw Error(r(327));
    if (t !== null) {
      if (t === e.current) throw Error(r(177));
      if (
        ((u = t.lanes | t.childLanes),
        (u |= oo),
        vg(e, a, u, m, g, x),
        e === Ge && ((xe = Ge = null), (Te = 0)),
        (di = t),
        (aa = e),
        (jl = a),
        (gu = u),
        (ku = s),
        (V_ = i),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            Yk(Un, function () {
              return (uf(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (i = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || i)
      ) {
        ((i = q.T), (q.T = null), (s = V.p), (V.p = 2), (m = qe), (qe |= 4));
        try {
          Mk(e, t, a);
        } finally {
          ((qe = m), (V.p = s), (q.T = i));
        }
      }
      ((rt = 1), nf(), sf(), rf());
    }
  }
  function nf() {
    if (rt === 1) {
      rt = 0;
      var e = aa,
        t = di,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        ((a = q.T), (q.T = null));
        var i = V.p;
        V.p = 2;
        var s = qe;
        qe |= 4;
        try {
          R_(t, e);
          var u = Mu,
            m = Yd(e.containerInfo),
            g = u.focusedElem,
            x = u.selectionRange;
          if (m !== g && g && g.ownerDocument && $d(g.ownerDocument.documentElement, g)) {
            if (x !== null && ao(g)) {
              var O = x.start,
                U = x.end;
              if ((U === void 0 && (U = O), 'selectionStart' in g))
                ((g.selectionStart = O), (g.selectionEnd = Math.min(U, g.value.length)));
              else {
                var X = g.ownerDocument || document,
                  D = (X && X.defaultView) || window;
                if (D.getSelection) {
                  var I = D.getSelection(),
                    ae = g.textContent.length,
                    oe = Math.min(x.start, ae),
                    ze = x.end === void 0 ? oe : Math.min(x.end, ae);
                  !I.extend && oe > ze && ((m = ze), (ze = oe), (oe = m));
                  var M = Gd(g, oe),
                    N = Gd(g, ze);
                  if (
                    M &&
                    N &&
                    (I.rangeCount !== 1 ||
                      I.anchorNode !== M.node ||
                      I.anchorOffset !== M.offset ||
                      I.focusNode !== N.node ||
                      I.focusOffset !== N.offset)
                  ) {
                    var j = X.createRange();
                    (j.setStart(M.node, M.offset),
                      I.removeAllRanges(),
                      oe > ze
                        ? (I.addRange(j), I.extend(N.node, N.offset))
                        : (j.setEnd(N.node, N.offset), I.addRange(j)));
                  }
                }
              }
            }
            for (X = [], I = g; (I = I.parentNode); )
              I.nodeType === 1 && X.push({ element: I, left: I.scrollLeft, top: I.scrollTop });
            for (typeof g.focus == 'function' && g.focus(), g = 0; g < X.length; g++) {
              var $ = X[g];
              (($.element.scrollLeft = $.left), ($.element.scrollTop = $.top));
            }
          }
          ((Js = !!qu), (Mu = qu = null));
        } finally {
          ((qe = s), (V.p = i), (q.T = a));
        }
      }
      ((e.current = t), (rt = 2));
    }
  }
  function sf() {
    if (rt === 2) {
      rt = 0;
      var e = aa,
        t = di,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        ((a = q.T), (q.T = null));
        var i = V.p;
        V.p = 2;
        var s = qe;
        qe |= 4;
        try {
          M_(e, t.alternate, t);
        } finally {
          ((qe = s), (V.p = i), (q.T = a));
        }
      }
      rt = 3;
    }
  }
  function rf() {
    if (rt === 4 || rt === 3) {
      ((rt = 0), cg());
      var e = aa,
        t = di,
        a = jl,
        i = V_;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (rt = 5)
        : ((rt = 0), (di = aa = null), of(e, e.pendingLanes));
      var s = e.pendingLanes;
      if (
        (s === 0 && (la = null),
        Rr(a),
        (t = t.stateNode),
        Bt && typeof Bt.onCommitFiberRoot == 'function')
      )
        try {
          Bt.onCommitFiberRoot(Mi, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (i !== null) {
        ((t = q.T), (s = V.p), (V.p = 2), (q.T = null));
        try {
          for (var u = e.onRecoverableError, m = 0; m < i.length; m++) {
            var g = i[m];
            u(g.value, { componentStack: g.stack });
          }
        } finally {
          ((q.T = t), (V.p = s));
        }
      }
      ((jl & 3) !== 0 && Rs(),
        pl(e),
        (s = e.pendingLanes),
        (a & 261930) !== 0 && (s & 42) !== 0 ? (e === vu ? pn++ : ((pn = 0), (vu = e))) : (pn = 0),
        hn(0));
    }
  }
  function of(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), Zi(t)));
  }
  function Rs() {
    return (nf(), sf(), rf(), uf());
  }
  function uf() {
    if (rt !== 5) return !1;
    var e = aa,
      t = gu;
    gu = 0;
    var a = Rr(jl),
      i = q.T,
      s = V.p;
    try {
      ((V.p = 32 > a ? 32 : a), (q.T = null), (a = ku), (ku = null));
      var u = aa,
        m = jl;
      if (((rt = 0), (di = aa = null), (jl = 0), (qe & 6) !== 0)) throw Error(r(331));
      var g = qe;
      if (
        ((qe |= 4),
        $_(u.current),
        U_(u, u.current, m, a),
        (qe = g),
        hn(0, !1),
        Bt && typeof Bt.onPostCommitFiberRoot == 'function')
      )
        try {
          Bt.onPostCommitFiberRoot(Mi, u);
        } catch {}
      return !0;
    } finally {
      ((V.p = s), (q.T = i), of(e, t));
    }
  }
  function cf(e, t, a) {
    ((t = Xt(a, t)),
      (t = Po(e.stateNode, t, 2)),
      (e = Jl(e, t, 2)),
      e !== null && (Oi(e, 2), pl(e)));
  }
  function De(e, t, a) {
    if (e.tag === 3) cf(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          cf(t, e, a);
          break;
        } else if (t.tag === 1) {
          var i = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof i.componentDidCatch == 'function' && (la === null || !la.has(i)))
          ) {
            ((e = Xt(a, e)),
              (a = c_(2)),
              (i = Jl(t, a, 2)),
              i !== null && (d_(a, i, t, e), Oi(i, 2), pl(i)));
            break;
          }
        }
        t = t.return;
      }
  }
  function xu(e, t, a) {
    var i = e.pingCache;
    if (i === null) {
      i = e.pingCache = new Dk();
      var s = new Set();
      i.set(t, s);
    } else ((s = i.get(t)), s === void 0 && ((s = new Set()), i.set(t, s)));
    s.has(a) || ((fu = !0), s.add(a), (e = Hk.bind(null, e, t, a)), t.then(e, e));
  }
  function Hk(e, t, a) {
    var i = e.pingCache;
    (i !== null && i.delete(t),
      (e.pingedLanes |= e.suspendedLanes & a),
      (e.warmLanes &= ~a),
      Ge === e &&
        (Te & a) === a &&
        (Pe === 4 || (Pe === 3 && (Te & 62914560) === Te && 300 > Lt() - qs)
          ? (qe & 2) === 0 && mi(e, 0)
          : (pu |= a),
        ci === Te && (ci = 0)),
      pl(e));
  }
  function df(e, t) {
    (t === 0 && (t = id()), (e = va(e, t)), e !== null && (Oi(e, t), pl(e)));
  }
  function Gk(e) {
    var t = e.memoizedState,
      a = 0;
    (t !== null && (a = t.retryLane), df(e, a));
  }
  function $k(e, t) {
    var a = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var i = e.stateNode,
          s = e.memoizedState;
        s !== null && (a = s.retryLane);
        break;
      case 19:
        i = e.stateNode;
        break;
      case 22:
        i = e.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    (i !== null && i.delete(t), df(e, a));
  }
  function Yk(e, t) {
    return jr(e, t);
  }
  var zs = null,
    fi = null,
    Su = !1,
    Us = !1,
    wu = !1,
    na = 0;
  function pl(e) {
    (e !== fi && e.next === null && (fi === null ? (zs = fi = e) : (fi = fi.next = e)),
      (Us = !0),
      Su || ((Su = !0), Vk()));
  }
  function hn(e, t) {
    if (!wu && Us) {
      wu = !0;
      do
        for (var a = !1, i = zs; i !== null; ) {
          if (e !== 0) {
            var s = i.pendingLanes;
            if (s === 0) var u = 0;
            else {
              var m = i.suspendedLanes,
                g = i.pingedLanes;
              ((u = (1 << (31 - qt(42 | e) + 1)) - 1),
                (u &= s & ~(m & ~g)),
                (u = u & 201326741 ? (u & 201326741) | 1 : u ? u | 2 : 0));
            }
            u !== 0 && ((a = !0), pf(i, u));
          } else
            ((u = Te),
              (u = Yn(
                i,
                i === Ge ? u : 0,
                i.cancelPendingCommit !== null || i.timeoutHandle !== -1
              )),
              (u & 3) === 0 || ji(i, u) || ((a = !0), pf(i, u)));
          i = i.next;
        }
      while (a);
      wu = !1;
    }
  }
  function Xk() {
    mf();
  }
  function mf() {
    Us = Su = !1;
    var e = 0;
    na !== 0 && lv() && (e = na);
    for (var t = Lt(), a = null, i = zs; i !== null; ) {
      var s = i.next,
        u = _f(i, t);
      (u === 0
        ? ((i.next = null), a === null ? (zs = s) : (a.next = s), s === null && (fi = a))
        : ((a = i), (e !== 0 || (u & 3) !== 0) && (Us = !0)),
        (i = s));
    }
    ((rt !== 0 && rt !== 5) || hn(e), na !== 0 && (na = 0));
  }
  function _f(e, t) {
    for (
      var a = e.suspendedLanes,
        i = e.pingedLanes,
        s = e.expirationTimes,
        u = e.pendingLanes & -62914561;
      0 < u;
    ) {
      var m = 31 - qt(u),
        g = 1 << m,
        x = s[m];
      (x === -1
        ? ((g & a) === 0 || (g & i) !== 0) && (s[m] = kg(g, t))
        : x <= t && (e.expiredLanes |= g),
        (u &= ~g));
    }
    if (
      ((t = Ge),
      (a = Te),
      (a = Yn(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (i = e.callbackNode),
      a === 0 || (e === t && (Oe === 2 || Oe === 9)) || e.cancelPendingCommit !== null)
    )
      return (i !== null && i !== null && Or(i), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((a & 3) === 0 || ji(e, a)) {
      if (((t = a & -a), t === e.callbackPriority)) return t;
      switch ((i !== null && Or(i), Rr(a))) {
        case 2:
        case 8:
          a = ld;
          break;
        case 32:
          a = Un;
          break;
        case 268435456:
          a = ad;
          break;
        default:
          a = Un;
      }
      return (
        (i = ff.bind(null, e)),
        (a = jr(a, i)),
        (e.callbackPriority = t),
        (e.callbackNode = a),
        t
      );
    }
    return (
      i !== null && i !== null && Or(i),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function ff(e, t) {
    if (rt !== 0 && rt !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var a = e.callbackNode;
    if (Rs() && e.callbackNode !== a) return null;
    var i = Te;
    return (
      (i = Yn(e, e === Ge ? i : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      i === 0
        ? null
        : (K_(e, i, t),
          _f(e, Lt()),
          e.callbackNode != null && e.callbackNode === a ? ff.bind(null, e) : null)
    );
  }
  function pf(e, t) {
    if (Rs()) return null;
    K_(e, t, !0);
  }
  function Vk() {
    iv(function () {
      (qe & 6) !== 0 ? jr(td, Xk) : mf();
    });
  }
  function Tu() {
    if (na === 0) {
      var e = Fa;
      (e === 0 && ((e = Hn), (Hn <<= 1), (Hn & 261888) === 0 && (Hn = 256)), (na = e));
    }
    return na;
  }
  function hf(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : Kn('' + e);
  }
  function gf(e, t) {
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
  function Qk(e, t, a, i, s) {
    if (t === 'submit' && a && a.stateNode === s) {
      var u = hf((s[xt] || null).action),
        m = i.submitter;
      m &&
        ((t = (t = m[xt] || null) ? hf(t.formAction) : m.getAttribute('formAction')),
        t !== null && ((u = t), (m = null)));
      var g = new Wn('action', 'action', null, i, s);
      e.push({
        event: g,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (i.defaultPrevented) {
                if (na !== 0) {
                  var x = m ? gf(s, m) : new FormData(s);
                  Xo(a, { pending: !0, data: x, method: s.method, action: u }, null, x);
                }
              } else
                typeof u == 'function' &&
                  (g.preventDefault(),
                  (x = m ? gf(s, m) : new FormData(s)),
                  Xo(a, { pending: !0, data: x, method: s.method, action: u }, u, x));
            },
            currentTarget: s,
          },
        ],
      });
    }
  }
  for (var Eu = 0; Eu < ro.length; Eu++) {
    var Cu = ro[Eu],
      Kk = Cu.toLowerCase(),
      Zk = Cu[0].toUpperCase() + Cu.slice(1);
    tl(Kk, 'on' + Zk);
  }
  (tl(Qd, 'onAnimationEnd'),
    tl(Kd, 'onAnimationIteration'),
    tl(Zd, 'onAnimationStart'),
    tl('dblclick', 'onDoubleClick'),
    tl('focusin', 'onFocus'),
    tl('focusout', 'onBlur'),
    tl(dk, 'onTransitionRun'),
    tl(mk, 'onTransitionStart'),
    tl(_k, 'onTransitionCancel'),
    tl(Jd, 'onTransitionEnd'),
    za('onMouseEnter', ['mouseout', 'mouseover']),
    za('onMouseLeave', ['mouseout', 'mouseover']),
    za('onPointerEnter', ['pointerout', 'pointerover']),
    za('onPointerLeave', ['pointerout', 'pointerover']),
    pa('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    pa(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    pa('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    pa('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    pa(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    pa(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var gn =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    Jk = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(gn)
    );
  function kf(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var i = e[a],
        s = i.event;
      i = i.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var m = i.length - 1; 0 <= m; m--) {
            var g = i[m],
              x = g.instance,
              O = g.currentTarget;
            if (((g = g.listener), x !== u && s.isPropagationStopped())) break e;
            ((u = g), (s.currentTarget = O));
            try {
              u(s);
            } catch (U) {
              ts(U);
            }
            ((s.currentTarget = null), (u = x));
          }
        else
          for (m = 0; m < i.length; m++) {
            if (
              ((g = i[m]),
              (x = g.instance),
              (O = g.currentTarget),
              (g = g.listener),
              x !== u && s.isPropagationStopped())
            )
              break e;
            ((u = g), (s.currentTarget = O));
            try {
              u(s);
            } catch (U) {
              ts(U);
            }
            ((s.currentTarget = null), (u = x));
          }
      }
    }
  }
  function Se(e, t) {
    var a = t[zr];
    a === void 0 && (a = t[zr] = new Set());
    var i = e + '__bubble';
    a.has(i) || (vf(t, e, 2, !1), a.add(i));
  }
  function Nu(e, t, a) {
    var i = 0;
    (t && (i |= 4), vf(a, e, i, t));
  }
  var Hs = '_reactListening' + Math.random().toString(36).slice(2);
  function Au(e) {
    if (!e[Hs]) {
      ((e[Hs] = !0),
        dd.forEach(function (a) {
          a !== 'selectionchange' && (Jk.has(a) || Nu(a, !1, e), Nu(a, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Hs] || ((t[Hs] = !0), Nu('selectionchange', !1, t));
    }
  }
  function vf(e, t, a, i) {
    switch (Kf(t)) {
      case 2:
        var s = wv;
        break;
      case 8:
        s = Tv;
        break;
      default:
        s = Yu;
    }
    ((a = s.bind(null, t, a, e)),
      (s = void 0),
      !Kr || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (s = !0),
      i
        ? s !== void 0
          ? e.addEventListener(t, a, { capture: !0, passive: s })
          : e.addEventListener(t, a, !0)
        : s !== void 0
          ? e.addEventListener(t, a, { passive: s })
          : e.addEventListener(t, a, !1));
  }
  function Lu(e, t, a, i, s) {
    var u = i;
    if ((t & 1) === 0 && (t & 2) === 0 && i !== null)
      e: for (;;) {
        if (i === null) return;
        var m = i.tag;
        if (m === 3 || m === 4) {
          var g = i.stateNode.containerInfo;
          if (g === s) break;
          if (m === 4)
            for (m = i.return; m !== null; ) {
              var x = m.tag;
              if ((x === 3 || x === 4) && m.stateNode.containerInfo === s) return;
              m = m.return;
            }
          for (; g !== null; ) {
            if (((m = Da(g)), m === null)) return;
            if (((x = m.tag), x === 5 || x === 6 || x === 26 || x === 27)) {
              i = u = m;
              continue e;
            }
            g = g.parentNode;
          }
        }
        i = i.return;
      }
    Sd(function () {
      var O = u,
        U = Vr(a),
        X = [];
      e: {
        var D = Pd.get(e);
        if (D !== void 0) {
          var I = Wn,
            ae = e;
          switch (e) {
            case 'keypress':
              if (Jn(a) === 0) break e;
            case 'keydown':
            case 'keyup':
              I = $g;
              break;
            case 'focusin':
              ((ae = 'focus'), (I = Wr));
              break;
            case 'focusout':
              ((ae = 'blur'), (I = Wr));
              break;
            case 'beforeblur':
            case 'afterblur':
              I = Wr;
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
              I = Ed;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              I = Bg;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              I = Vg;
              break;
            case Qd:
            case Kd:
            case Zd:
              I = jg;
              break;
            case Jd:
              I = Kg;
              break;
            case 'scroll':
            case 'scrollend':
              I = Ag;
              break;
            case 'wheel':
              I = Jg;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              I = Dg;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              I = Nd;
              break;
            case 'toggle':
            case 'beforetoggle':
              I = Wg;
          }
          var oe = (t & 4) !== 0,
            ze = !oe && (e === 'scroll' || e === 'scrollend'),
            M = oe ? (D !== null ? D + 'Capture' : null) : D;
          oe = [];
          for (var N = O, j; N !== null; ) {
            var $ = N;
            if (
              ((j = $.stateNode),
              ($ = $.tag),
              ($ !== 5 && $ !== 26 && $ !== 27) ||
                j === null ||
                M === null ||
                (($ = Ri(N, M)), $ != null && oe.push(kn(N, $, j))),
              ze)
            )
              break;
            N = N.return;
          }
          0 < oe.length && ((D = new I(D, ae, null, a, U)), X.push({ event: D, listeners: oe }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((D = e === 'mouseover' || e === 'pointerover'),
            (I = e === 'mouseout' || e === 'pointerout'),
            D && a !== Xr && (ae = a.relatedTarget || a.fromElement) && (Da(ae) || ae[Oa]))
          )
            break e;
          if (
            (I || D) &&
            ((D =
              U.window === U
                ? U
                : (D = U.ownerDocument)
                  ? D.defaultView || D.parentWindow
                  : window),
            I
              ? ((ae = a.relatedTarget || a.toElement),
                (I = O),
                (ae = ae ? Da(ae) : null),
                ae !== null &&
                  ((ze = d(ae)), (oe = ae.tag), ae !== ze || (oe !== 5 && oe !== 27 && oe !== 6)) &&
                  (ae = null))
              : ((I = null), (ae = O)),
            I !== ae)
          ) {
            if (
              ((oe = Ed),
              ($ = 'onMouseLeave'),
              (M = 'onMouseEnter'),
              (N = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((oe = Nd), ($ = 'onPointerLeave'), (M = 'onPointerEnter'), (N = 'pointer')),
              (ze = I == null ? D : Ii(I)),
              (j = ae == null ? D : Ii(ae)),
              (D = new oe($, N + 'leave', I, a, U)),
              (D.target = ze),
              (D.relatedTarget = j),
              ($ = null),
              Da(U) === O &&
                ((oe = new oe(M, N + 'enter', ae, a, U)),
                (oe.target = j),
                (oe.relatedTarget = ze),
                ($ = oe)),
              (ze = $),
              I && ae)
            )
              t: {
                for (oe = Pk, M = I, N = ae, j = 0, $ = M; $; $ = oe($)) j++;
                $ = 0;
                for (var se = N; se; se = oe(se)) $++;
                for (; 0 < j - $; ) ((M = oe(M)), j--);
                for (; 0 < $ - j; ) ((N = oe(N)), $--);
                for (; j--; ) {
                  if (M === N || (N !== null && M === N.alternate)) {
                    oe = M;
                    break t;
                  }
                  ((M = oe(M)), (N = oe(N)));
                }
                oe = null;
              }
            else oe = null;
            (I !== null && yf(X, D, I, oe, !1),
              ae !== null && ze !== null && yf(X, ze, ae, oe, !0));
          }
        }
        e: {
          if (
            ((D = O ? Ii(O) : window),
            (I = D.nodeName && D.nodeName.toLowerCase()),
            I === 'select' || (I === 'input' && D.type === 'file'))
          )
            var Ae = Dd;
          else if (jd(D))
            if (Id) Ae = ok;
            else {
              Ae = sk;
              var ie = nk;
            }
          else
            ((I = D.nodeName),
              !I || I.toLowerCase() !== 'input' || (D.type !== 'checkbox' && D.type !== 'radio')
                ? O && Yr(O.elementType) && (Ae = Dd)
                : (Ae = rk));
          if (Ae && (Ae = Ae(e, O))) {
            Od(X, Ae, a, U);
            break e;
          }
          (ie && ie(e, D, O),
            e === 'focusout' &&
              O &&
              D.type === 'number' &&
              O.memoizedProps.value != null &&
              $r(D, 'number', D.value));
        }
        switch (((ie = O ? Ii(O) : window), e)) {
          case 'focusin':
            (jd(ie) || ie.contentEditable === 'true') && ((Xa = ie), (io = O), (Vi = null));
            break;
          case 'focusout':
            Vi = io = Xa = null;
            break;
          case 'mousedown':
            no = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((no = !1), Xd(X, a, U));
            break;
          case 'selectionchange':
            if (ck) break;
          case 'keydown':
          case 'keyup':
            Xd(X, a, U);
        }
        var ye;
        if (eo)
          e: {
            switch (e) {
              case 'compositionstart':
                var Ee = 'onCompositionStart';
                break e;
              case 'compositionend':
                Ee = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                Ee = 'onCompositionUpdate';
                break e;
            }
            Ee = void 0;
          }
        else
          Ya
            ? qd(e, a) && (Ee = 'onCompositionEnd')
            : e === 'keydown' && a.keyCode === 229 && (Ee = 'onCompositionStart');
        (Ee &&
          (Ad &&
            a.locale !== 'ko' &&
            (Ya || Ee !== 'onCompositionStart'
              ? Ee === 'onCompositionEnd' && Ya && (ye = wd())
              : (($l = U), (Zr = 'value' in $l ? $l.value : $l.textContent), (Ya = !0))),
          (ie = Gs(O, Ee)),
          0 < ie.length &&
            ((Ee = new Cd(Ee, e, null, a, U)),
            X.push({ event: Ee, listeners: ie }),
            ye ? (Ee.data = ye) : ((ye = Md(a)), ye !== null && (Ee.data = ye)))),
          (ye = ek ? tk(e, a) : lk(e, a)) &&
            ((Ee = Gs(O, 'onBeforeInput')),
            0 < Ee.length &&
              ((ie = new Cd('onBeforeInput', 'beforeinput', null, a, U)),
              X.push({ event: ie, listeners: Ee }),
              (ie.data = ye))),
          Qk(X, e, O, a, U));
      }
      kf(X, t);
    });
  }
  function kn(e, t, a) {
    return { instance: e, listener: t, currentTarget: a };
  }
  function Gs(e, t) {
    for (var a = t + 'Capture', i = []; e !== null; ) {
      var s = e,
        u = s.stateNode;
      if (
        ((s = s.tag),
        (s !== 5 && s !== 26 && s !== 27) ||
          u === null ||
          ((s = Ri(e, a)),
          s != null && i.unshift(kn(e, s, u)),
          (s = Ri(e, t)),
          s != null && i.push(kn(e, s, u))),
        e.tag === 3)
      )
        return i;
      e = e.return;
    }
    return [];
  }
  function Pk(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function yf(e, t, a, i, s) {
    for (var u = t._reactName, m = []; a !== null && a !== i; ) {
      var g = a,
        x = g.alternate,
        O = g.stateNode;
      if (((g = g.tag), x !== null && x === i)) break;
      ((g !== 5 && g !== 26 && g !== 27) ||
        O === null ||
        ((x = O),
        s
          ? ((O = Ri(a, u)), O != null && m.unshift(kn(a, O, x)))
          : s || ((O = Ri(a, u)), O != null && m.push(kn(a, O, x)))),
        (a = a.return));
    }
    m.length !== 0 && e.push({ event: t, listeners: m });
  }
  var Wk = /\r\n?/g,
    Fk = /\u0000|\uFFFD/g;
  function bf(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        Wk,
        `
`
      )
      .replace(Fk, '');
  }
  function xf(e, t) {
    return ((t = bf(t)), bf(e) === t);
  }
  function Re(e, t, a, i, s, u) {
    switch (a) {
      case 'children':
        typeof i == 'string'
          ? t === 'body' || (t === 'textarea' && i === '') || Ha(e, i)
          : (typeof i == 'number' || typeof i == 'bigint') && t !== 'body' && Ha(e, '' + i);
        break;
      case 'className':
        Vn(e, 'class', i);
        break;
      case 'tabIndex':
        Vn(e, 'tabindex', i);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Vn(e, a, i);
        break;
      case 'style':
        bd(e, i, u);
        break;
      case 'data':
        if (t !== 'object') {
          Vn(e, 'data', i);
          break;
        }
      case 'src':
      case 'href':
        if (i === '' && (t !== 'a' || a !== 'href')) {
          e.removeAttribute(a);
          break;
        }
        if (i == null || typeof i == 'function' || typeof i == 'symbol' || typeof i == 'boolean') {
          e.removeAttribute(a);
          break;
        }
        ((i = Kn('' + i)), e.setAttribute(a, i));
        break;
      case 'action':
      case 'formAction':
        if (typeof i == 'function') {
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
        if (i == null || typeof i == 'symbol' || typeof i == 'boolean') {
          e.removeAttribute(a);
          break;
        }
        ((i = Kn('' + i)), e.setAttribute(a, i));
        break;
      case 'onClick':
        i != null && (e.onclick = vl);
        break;
      case 'onScroll':
        i != null && Se('scroll', e);
        break;
      case 'onScrollEnd':
        i != null && Se('scrollend', e);
        break;
      case 'dangerouslySetInnerHTML':
        if (i != null) {
          if (typeof i != 'object' || !('__html' in i)) throw Error(r(61));
          if (((a = i.__html), a != null)) {
            if (s.children != null) throw Error(r(60));
            e.innerHTML = a;
          }
        }
        break;
      case 'multiple':
        e.multiple = i && typeof i != 'function' && typeof i != 'symbol';
        break;
      case 'muted':
        e.muted = i && typeof i != 'function' && typeof i != 'symbol';
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
        if (i == null || typeof i == 'function' || typeof i == 'boolean' || typeof i == 'symbol') {
          e.removeAttribute('xlink:href');
          break;
        }
        ((a = Kn('' + i)), e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a));
        break;
      case 'contentEditable':
      case 'spellCheck':
      case 'draggable':
      case 'value':
      case 'autoReverse':
      case 'externalResourcesRequired':
      case 'focusable':
      case 'preserveAlpha':
        i != null && typeof i != 'function' && typeof i != 'symbol'
          ? e.setAttribute(a, '' + i)
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
        i && typeof i != 'function' && typeof i != 'symbol'
          ? e.setAttribute(a, '')
          : e.removeAttribute(a);
        break;
      case 'capture':
      case 'download':
        i === !0
          ? e.setAttribute(a, '')
          : i !== !1 && i != null && typeof i != 'function' && typeof i != 'symbol'
            ? e.setAttribute(a, i)
            : e.removeAttribute(a);
        break;
      case 'cols':
      case 'rows':
      case 'size':
      case 'span':
        i != null && typeof i != 'function' && typeof i != 'symbol' && !isNaN(i) && 1 <= i
          ? e.setAttribute(a, i)
          : e.removeAttribute(a);
        break;
      case 'rowSpan':
      case 'start':
        i == null || typeof i == 'function' || typeof i == 'symbol' || isNaN(i)
          ? e.removeAttribute(a)
          : e.setAttribute(a, i);
        break;
      case 'popover':
        (Se('beforetoggle', e), Se('toggle', e), Xn(e, 'popover', i));
        break;
      case 'xlinkActuate':
        kl(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', i);
        break;
      case 'xlinkArcrole':
        kl(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', i);
        break;
      case 'xlinkRole':
        kl(e, 'http://www.w3.org/1999/xlink', 'xlink:role', i);
        break;
      case 'xlinkShow':
        kl(e, 'http://www.w3.org/1999/xlink', 'xlink:show', i);
        break;
      case 'xlinkTitle':
        kl(e, 'http://www.w3.org/1999/xlink', 'xlink:title', i);
        break;
      case 'xlinkType':
        kl(e, 'http://www.w3.org/1999/xlink', 'xlink:type', i);
        break;
      case 'xmlBase':
        kl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', i);
        break;
      case 'xmlLang':
        kl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', i);
        break;
      case 'xmlSpace':
        kl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', i);
        break;
      case 'is':
        Xn(e, 'is', i);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < a.length) || (a[0] !== 'o' && a[0] !== 'O') || (a[1] !== 'n' && a[1] !== 'N')) &&
          ((a = Cg.get(a) || a), Xn(e, a, i));
    }
  }
  function Bu(e, t, a, i, s, u) {
    switch (a) {
      case 'style':
        bd(e, i, u);
        break;
      case 'dangerouslySetInnerHTML':
        if (i != null) {
          if (typeof i != 'object' || !('__html' in i)) throw Error(r(61));
          if (((a = i.__html), a != null)) {
            if (s.children != null) throw Error(r(60));
            e.innerHTML = a;
          }
        }
        break;
      case 'children':
        typeof i == 'string'
          ? Ha(e, i)
          : (typeof i == 'number' || typeof i == 'bigint') && Ha(e, '' + i);
        break;
      case 'onScroll':
        i != null && Se('scroll', e);
        break;
      case 'onScrollEnd':
        i != null && Se('scrollend', e);
        break;
      case 'onClick':
        i != null && (e.onclick = vl);
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
        if (!md.hasOwnProperty(a))
          e: {
            if (
              a[0] === 'o' &&
              a[1] === 'n' &&
              ((s = a.endsWith('Capture')),
              (t = a.slice(2, s ? a.length - 7 : void 0)),
              (u = e[xt] || null),
              (u = u != null ? u[a] : null),
              typeof u == 'function' && e.removeEventListener(t, u, s),
              typeof i == 'function')
            ) {
              (typeof u != 'function' &&
                u !== null &&
                (a in e ? (e[a] = null) : e.hasAttribute(a) && e.removeAttribute(a)),
                e.addEventListener(t, i, s));
              break e;
            }
            a in e ? (e[a] = i) : i === !0 ? e.setAttribute(a, '') : Xn(e, a, i);
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
        (Se('error', e), Se('load', e));
        var i = !1,
          s = !1,
          u;
        for (u in a)
          if (a.hasOwnProperty(u)) {
            var m = a[u];
            if (m != null)
              switch (u) {
                case 'src':
                  i = !0;
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
        (s && Re(e, t, 'srcSet', a.srcSet, a, null), i && Re(e, t, 'src', a.src, a, null));
        return;
      case 'input':
        Se('invalid', e);
        var g = (u = m = s = null),
          x = null,
          O = null;
        for (i in a)
          if (a.hasOwnProperty(i)) {
            var U = a[i];
            if (U != null)
              switch (i) {
                case 'name':
                  s = U;
                  break;
                case 'type':
                  m = U;
                  break;
                case 'checked':
                  x = U;
                  break;
                case 'defaultChecked':
                  O = U;
                  break;
                case 'value':
                  u = U;
                  break;
                case 'defaultValue':
                  g = U;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (U != null) throw Error(r(137, t));
                  break;
                default:
                  Re(e, t, i, U, a, null);
              }
          }
        gd(e, u, g, x, O, m, s, !1);
        return;
      case 'select':
        (Se('invalid', e), (i = m = u = null));
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
                i = g;
              default:
                Re(e, t, s, g, a, null);
            }
        ((t = u),
          (a = m),
          (e.multiple = !!i),
          t != null ? Ua(e, !!i, t, !1) : a != null && Ua(e, !!i, a, !0));
        return;
      case 'textarea':
        (Se('invalid', e), (u = s = i = null));
        for (m in a)
          if (a.hasOwnProperty(m) && ((g = a[m]), g != null))
            switch (m) {
              case 'value':
                i = g;
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
        vd(e, i, s, u);
        return;
      case 'option':
        for (x in a)
          if (a.hasOwnProperty(x) && ((i = a[x]), i != null))
            switch (x) {
              case 'selected':
                e.selected = i && typeof i != 'function' && typeof i != 'symbol';
                break;
              default:
                Re(e, t, x, i, a, null);
            }
        return;
      case 'dialog':
        (Se('beforetoggle', e), Se('toggle', e), Se('cancel', e), Se('close', e));
        break;
      case 'iframe':
      case 'object':
        Se('load', e);
        break;
      case 'video':
      case 'audio':
        for (i = 0; i < gn.length; i++) Se(gn[i], e);
        break;
      case 'image':
        (Se('error', e), Se('load', e));
        break;
      case 'details':
        Se('toggle', e);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (Se('error', e), Se('load', e));
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
        for (O in a)
          if (a.hasOwnProperty(O) && ((i = a[O]), i != null))
            switch (O) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(r(137, t));
              default:
                Re(e, t, O, i, a, null);
            }
        return;
      default:
        if (Yr(t)) {
          for (U in a)
            a.hasOwnProperty(U) && ((i = a[U]), i !== void 0 && Bu(e, t, U, i, a, void 0));
          return;
        }
    }
    for (g in a) a.hasOwnProperty(g) && ((i = a[g]), i != null && Re(e, t, g, i, a, null));
  }
  function ev(e, t, a, i) {
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
          O = null,
          U = null;
        for (I in a) {
          var X = a[I];
          if (a.hasOwnProperty(I) && X != null)
            switch (I) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                x = X;
              default:
                i.hasOwnProperty(I) || Re(e, t, I, null, i, X);
            }
        }
        for (var D in i) {
          var I = i[D];
          if (((X = a[D]), i.hasOwnProperty(D) && (I != null || X != null)))
            switch (D) {
              case 'type':
                u = I;
                break;
              case 'name':
                s = I;
                break;
              case 'checked':
                O = I;
                break;
              case 'defaultChecked':
                U = I;
                break;
              case 'value':
                m = I;
                break;
              case 'defaultValue':
                g = I;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (I != null) throw Error(r(137, t));
                break;
              default:
                I !== X && Re(e, t, D, I, i, X);
            }
        }
        Gr(e, m, g, x, O, U, u, s);
        return;
      case 'select':
        I = m = g = D = null;
        for (u in a)
          if (((x = a[u]), a.hasOwnProperty(u) && x != null))
            switch (u) {
              case 'value':
                break;
              case 'multiple':
                I = x;
              default:
                i.hasOwnProperty(u) || Re(e, t, u, null, i, x);
            }
        for (s in i)
          if (((u = i[s]), (x = a[s]), i.hasOwnProperty(s) && (u != null || x != null)))
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
                u !== x && Re(e, t, s, u, i, x);
            }
        ((t = g),
          (a = m),
          (i = I),
          D != null
            ? Ua(e, !!a, D, !1)
            : !!i != !!a && (t != null ? Ua(e, !!a, t, !0) : Ua(e, !!a, a ? [] : '', !1)));
        return;
      case 'textarea':
        I = D = null;
        for (g in a)
          if (((s = a[g]), a.hasOwnProperty(g) && s != null && !i.hasOwnProperty(g)))
            switch (g) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                Re(e, t, g, null, i, s);
            }
        for (m in i)
          if (((s = i[m]), (u = a[m]), i.hasOwnProperty(m) && (s != null || u != null)))
            switch (m) {
              case 'value':
                D = s;
                break;
              case 'defaultValue':
                I = s;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (s != null) throw Error(r(91));
                break;
              default:
                s !== u && Re(e, t, m, s, i, u);
            }
        kd(e, D, I);
        return;
      case 'option':
        for (var ae in a)
          if (((D = a[ae]), a.hasOwnProperty(ae) && D != null && !i.hasOwnProperty(ae)))
            switch (ae) {
              case 'selected':
                e.selected = !1;
                break;
              default:
                Re(e, t, ae, null, i, D);
            }
        for (x in i)
          if (((D = i[x]), (I = a[x]), i.hasOwnProperty(x) && D !== I && (D != null || I != null)))
            switch (x) {
              case 'selected':
                e.selected = D && typeof D != 'function' && typeof D != 'symbol';
                break;
              default:
                Re(e, t, x, D, i, I);
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
        for (var oe in a)
          ((D = a[oe]),
            a.hasOwnProperty(oe) && D != null && !i.hasOwnProperty(oe) && Re(e, t, oe, null, i, D));
        for (O in i)
          if (((D = i[O]), (I = a[O]), i.hasOwnProperty(O) && D !== I && (D != null || I != null)))
            switch (O) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (D != null) throw Error(r(137, t));
                break;
              default:
                Re(e, t, O, D, i, I);
            }
        return;
      default:
        if (Yr(t)) {
          for (var ze in a)
            ((D = a[ze]),
              a.hasOwnProperty(ze) &&
                D !== void 0 &&
                !i.hasOwnProperty(ze) &&
                Bu(e, t, ze, void 0, i, D));
          for (U in i)
            ((D = i[U]),
              (I = a[U]),
              !i.hasOwnProperty(U) ||
                D === I ||
                (D === void 0 && I === void 0) ||
                Bu(e, t, U, D, i, I));
          return;
        }
    }
    for (var M in a)
      ((D = a[M]),
        a.hasOwnProperty(M) && D != null && !i.hasOwnProperty(M) && Re(e, t, M, null, i, D));
    for (X in i)
      ((D = i[X]),
        (I = a[X]),
        !i.hasOwnProperty(X) || D === I || (D == null && I == null) || Re(e, t, X, D, i, I));
  }
  function Sf(e) {
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
  function tv() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var e = 0, t = 0, a = performance.getEntriesByType('resource'), i = 0;
        i < a.length;
        i++
      ) {
        var s = a[i],
          u = s.transferSize,
          m = s.initiatorType,
          g = s.duration;
        if (u && g && Sf(m)) {
          for (m = 0, g = s.responseEnd, i += 1; i < a.length; i++) {
            var x = a[i],
              O = x.startTime;
            if (O > g) break;
            var U = x.transferSize,
              X = x.initiatorType;
            U && Sf(X) && ((x = x.responseEnd), (m += U * (x < g ? 1 : (g - O) / (x - O))));
          }
          if ((--i, (t += (8 * (u + m)) / (s.duration / 1e3)), e++, 10 < e)) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && ((e = navigator.connection.downlink), typeof e == 'number')
      ? e
      : 5;
  }
  var qu = null,
    Mu = null;
  function $s(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function wf(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function Tf(e, t) {
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
  function ju(e, t) {
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
  var Ou = null;
  function lv() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === Ou ? !1 : ((Ou = e), !0)) : ((Ou = null), !1);
  }
  var Ef = typeof setTimeout == 'function' ? setTimeout : void 0,
    av = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Cf = typeof Promise == 'function' ? Promise : void 0,
    iv =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Cf < 'u'
          ? function (e) {
              return Cf.resolve(null).then(e).catch(nv);
            }
          : Ef;
  function nv(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function sa(e) {
    return e === 'head';
  }
  function Nf(e, t) {
    var a = t,
      i = 0;
    do {
      var s = a.nextSibling;
      if ((e.removeChild(a), s && s.nodeType === 8))
        if (((a = s.data), a === '/$' || a === '/&')) {
          if (i === 0) {
            (e.removeChild(s), ki(t));
            return;
          }
          i--;
        } else if (a === '$' || a === '$?' || a === '$~' || a === '$!' || a === '&') i++;
        else if (a === 'html') vn(e.ownerDocument.documentElement);
        else if (a === 'head') {
          ((a = e.ownerDocument.head), vn(a));
          for (var u = a.firstChild; u; ) {
            var m = u.nextSibling,
              g = u.nodeName;
            (u[Di] ||
              g === 'SCRIPT' ||
              g === 'STYLE' ||
              (g === 'LINK' && u.rel.toLowerCase() === 'stylesheet') ||
              a.removeChild(u),
              (u = m));
          }
        } else a === 'body' && vn(e.ownerDocument.body);
      a = s;
    } while (a);
    ki(t);
  }
  function Af(e, t) {
    var a = e;
    e = 0;
    do {
      var i = a.nextSibling;
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
        i && i.nodeType === 8)
      )
        if (((a = i.data), a === '/$')) {
          if (e === 0) break;
          e--;
        } else (a !== '$' && a !== '$?' && a !== '$~' && a !== '$!') || e++;
      a = i;
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
  function sv(e, t, a, i) {
    for (; e.nodeType === 1; ) {
      var s = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!i && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (i) {
        if (!e[Di])
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
  function rv(e, t, a) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !a) ||
        ((e = Jt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Lf(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = Jt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Iu(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function Ru(e) {
    return e.data === '$!' || (e.data === '$?' && e.ownerDocument.readyState !== 'loading');
  }
  function ov(e, t) {
    var a = e.ownerDocument;
    if (e.data === '$~') e._reactRetry = t;
    else if (e.data !== '$?' || a.readyState !== 'loading') t();
    else {
      var i = function () {
        (t(), a.removeEventListener('DOMContentLoaded', i));
      };
      (a.addEventListener('DOMContentLoaded', i), (e._reactRetry = i));
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
  var zu = null;
  function Bf(e) {
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
  function qf(e) {
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
  function Mf(e, t, a) {
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
  function vn(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    Ur(e);
  }
  var Pt = new Map(),
    jf = new Set();
  function Ys(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var Ol = V.d;
  V.d = { f: uv, r: cv, D: dv, C: mv, L: _v, m: fv, X: hv, S: pv, M: gv };
  function uv() {
    var e = Ol.f(),
      t = Os();
    return e || t;
  }
  function cv(e) {
    var t = Ia(e);
    t !== null && t.tag === 5 && t.type === 'form' ? Jm(t) : Ol.r(e);
  }
  var pi = typeof document > 'u' ? null : document;
  function Of(e, t, a) {
    var i = pi;
    if (i && typeof t == 'string' && t) {
      var s = $t(t);
      ((s = 'link[rel="' + e + '"][href="' + s + '"]'),
        typeof a == 'string' && (s += '[crossorigin="' + a + '"]'),
        jf.has(s) ||
          (jf.add(s),
          (e = { rel: e, crossOrigin: a, href: t }),
          i.querySelector(s) === null &&
            ((t = i.createElement('link')), kt(t, 'link', e), ut(t), i.head.appendChild(t))));
    }
  }
  function dv(e) {
    (Ol.D(e), Of('dns-prefetch', e, null));
  }
  function mv(e, t) {
    (Ol.C(e, t), Of('preconnect', e, t));
  }
  function _v(e, t, a) {
    Ol.L(e, t, a);
    var i = pi;
    if (i && e && t) {
      var s = 'link[rel="preload"][as="' + $t(t) + '"]';
      t === 'image' && a && a.imageSrcSet
        ? ((s += '[imagesrcset="' + $t(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == 'string' && (s += '[imagesizes="' + $t(a.imageSizes) + '"]'))
        : (s += '[href="' + $t(e) + '"]');
      var u = s;
      switch (t) {
        case 'style':
          u = hi(e);
          break;
        case 'script':
          u = gi(e);
      }
      Pt.has(u) ||
        ((e = y(
          { rel: 'preload', href: t === 'image' && a && a.imageSrcSet ? void 0 : e, as: t },
          a
        )),
        Pt.set(u, e),
        i.querySelector(s) !== null ||
          (t === 'style' && i.querySelector(yn(u))) ||
          (t === 'script' && i.querySelector(bn(u))) ||
          ((t = i.createElement('link')), kt(t, 'link', e), ut(t), i.head.appendChild(t)));
    }
  }
  function fv(e, t) {
    Ol.m(e, t);
    var a = pi;
    if (a && e) {
      var i = t && typeof t.as == 'string' ? t.as : 'script',
        s = 'link[rel="modulepreload"][as="' + $t(i) + '"][href="' + $t(e) + '"]',
        u = s;
      switch (i) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          u = gi(e);
      }
      if (
        !Pt.has(u) &&
        ((e = y({ rel: 'modulepreload', href: e }, t)), Pt.set(u, e), a.querySelector(s) === null)
      ) {
        switch (i) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (a.querySelector(bn(u))) return;
        }
        ((i = a.createElement('link')), kt(i, 'link', e), ut(i), a.head.appendChild(i));
      }
    }
  }
  function pv(e, t, a) {
    Ol.S(e, t, a);
    var i = pi;
    if (i && e) {
      var s = Ra(i).hoistableStyles,
        u = hi(e);
      t = t || 'default';
      var m = s.get(u);
      if (!m) {
        var g = { loading: 0, preload: null };
        if ((m = i.querySelector(yn(u)))) g.loading = 5;
        else {
          ((e = y({ rel: 'stylesheet', href: e, 'data-precedence': t }, a)),
            (a = Pt.get(u)) && Uu(e, a));
          var x = (m = i.createElement('link'));
          (ut(x),
            kt(x, 'link', e),
            (x._p = new Promise(function (O, U) {
              ((x.onload = O), (x.onerror = U));
            })),
            x.addEventListener('load', function () {
              g.loading |= 1;
            }),
            x.addEventListener('error', function () {
              g.loading |= 2;
            }),
            (g.loading |= 4),
            Xs(m, t, i));
        }
        ((m = { type: 'stylesheet', instance: m, count: 1, state: g }), s.set(u, m));
      }
    }
  }
  function hv(e, t) {
    Ol.X(e, t);
    var a = pi;
    if (a && e) {
      var i = Ra(a).hoistableScripts,
        s = gi(e),
        u = i.get(s);
      u ||
        ((u = a.querySelector(bn(s))),
        u ||
          ((e = y({ src: e, async: !0 }, t)),
          (t = Pt.get(s)) && Hu(e, t),
          (u = a.createElement('script')),
          ut(u),
          kt(u, 'link', e),
          a.head.appendChild(u)),
        (u = { type: 'script', instance: u, count: 1, state: null }),
        i.set(s, u));
    }
  }
  function gv(e, t) {
    Ol.M(e, t);
    var a = pi;
    if (a && e) {
      var i = Ra(a).hoistableScripts,
        s = gi(e),
        u = i.get(s);
      u ||
        ((u = a.querySelector(bn(s))),
        u ||
          ((e = y({ src: e, async: !0, type: 'module' }, t)),
          (t = Pt.get(s)) && Hu(e, t),
          (u = a.createElement('script')),
          ut(u),
          kt(u, 'link', e),
          a.head.appendChild(u)),
        (u = { type: 'script', instance: u, count: 1, state: null }),
        i.set(s, u));
    }
  }
  function Df(e, t, a, i) {
    var s = (s = be.current) ? Ys(s) : null;
    if (!s) throw Error(r(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof a.precedence == 'string' && typeof a.href == 'string'
          ? ((t = hi(a.href)),
            (a = Ra(s).hoistableStyles),
            (i = a.get(t)),
            i || ((i = { type: 'style', instance: null, count: 0, state: null }), a.set(t, i)),
            i)
          : { type: 'void', instance: null, count: 0, state: null };
      case 'link':
        if (
          a.rel === 'stylesheet' &&
          typeof a.href == 'string' &&
          typeof a.precedence == 'string'
        ) {
          e = hi(a.href);
          var u = Ra(s).hoistableStyles,
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
              (u = s.querySelector(yn(e))) && !u._p && ((m.instance = u), (m.state.loading = 5)),
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
                u || kv(s, e, a, m.state))),
            t && i === null)
          )
            throw Error(r(528, ''));
          return m;
        }
        if (t && i !== null) throw Error(r(529, ''));
        return null;
      case 'script':
        return (
          (t = a.async),
          (a = a.src),
          typeof a == 'string' && t && typeof t != 'function' && typeof t != 'symbol'
            ? ((t = gi(a)),
              (a = Ra(s).hoistableScripts),
              (i = a.get(t)),
              i || ((i = { type: 'script', instance: null, count: 0, state: null }), a.set(t, i)),
              i)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(r(444, e));
    }
  }
  function hi(e) {
    return 'href="' + $t(e) + '"';
  }
  function yn(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function If(e) {
    return y({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function kv(e, t, a, i) {
    e.querySelector('link[rel="preload"][as="style"][' + t + ']')
      ? (i.loading = 1)
      : ((t = e.createElement('link')),
        (i.preload = t),
        t.addEventListener('load', function () {
          return (i.loading |= 1);
        }),
        t.addEventListener('error', function () {
          return (i.loading |= 2);
        }),
        kt(t, 'link', a),
        ut(t),
        e.head.appendChild(t));
  }
  function gi(e) {
    return '[src="' + $t(e) + '"]';
  }
  function bn(e) {
    return 'script[async]' + e;
  }
  function Rf(e, t, a) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var i = e.querySelector('style[data-href~="' + $t(a.href) + '"]');
          if (i) return ((t.instance = i), ut(i), i);
          var s = y({}, a, {
            'data-href': a.href,
            'data-precedence': a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (i = (e.ownerDocument || e).createElement('style')),
            ut(i),
            kt(i, 'style', s),
            Xs(i, a.precedence, e),
            (t.instance = i)
          );
        case 'stylesheet':
          s = hi(a.href);
          var u = e.querySelector(yn(s));
          if (u) return ((t.state.loading |= 4), (t.instance = u), ut(u), u);
          ((i = If(a)),
            (s = Pt.get(s)) && Uu(i, s),
            (u = (e.ownerDocument || e).createElement('link')),
            ut(u));
          var m = u;
          return (
            (m._p = new Promise(function (g, x) {
              ((m.onload = g), (m.onerror = x));
            })),
            kt(u, 'link', i),
            (t.state.loading |= 4),
            Xs(u, a.precedence, e),
            (t.instance = u)
          );
        case 'script':
          return (
            (u = gi(a.src)),
            (s = e.querySelector(bn(u)))
              ? ((t.instance = s), ut(s), s)
              : ((i = a),
                (s = Pt.get(u)) && ((i = y({}, a)), Hu(i, s)),
                (e = e.ownerDocument || e),
                (s = e.createElement('script')),
                ut(s),
                kt(s, 'link', i),
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
        ((i = t.instance), (t.state.loading |= 4), Xs(i, a.precedence, e));
    return t.instance;
  }
  function Xs(e, t, a) {
    for (
      var i = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        s = i.length ? i[i.length - 1] : null,
        u = s,
        m = 0;
      m < i.length;
      m++
    ) {
      var g = i[m];
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
  function Hu(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var Vs = null;
  function zf(e, t, a) {
    if (Vs === null) {
      var i = new Map(),
        s = (Vs = new Map());
      s.set(a, i);
    } else ((s = Vs), (i = s.get(a)), i || ((i = new Map()), s.set(a, i)));
    if (i.has(e)) return i;
    for (i.set(e, null), a = a.getElementsByTagName(e), s = 0; s < a.length; s++) {
      var u = a[s];
      if (
        !(u[Di] || u[ft] || (e === 'link' && u.getAttribute('rel') === 'stylesheet')) &&
        u.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var m = u.getAttribute(t) || '';
        m = e + m;
        var g = i.get(m);
        g ? g.push(u) : i.set(m, [u]);
      }
    }
    return i;
  }
  function Uf(e, t, a) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(a, t === 'title' ? e.querySelector('head > title') : null));
  }
  function vv(e, t, a) {
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
  function Hf(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  function yv(e, t, a, i) {
    if (
      a.type === 'stylesheet' &&
      (typeof i.media != 'string' || matchMedia(i.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var s = hi(i.href),
          u = t.querySelector(yn(s));
        if (u) {
          ((t = u._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = Qs.bind(e)), t.then(e, e)),
            (a.state.loading |= 4),
            (a.instance = u),
            ut(u));
          return;
        }
        ((u = t.ownerDocument || t),
          (i = If(i)),
          (s = Pt.get(s)) && Uu(i, s),
          (u = u.createElement('link')),
          ut(u));
        var m = u;
        ((m._p = new Promise(function (g, x) {
          ((m.onload = g), (m.onerror = x));
        })),
          kt(u, 'link', i),
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
  var Gu = 0;
  function bv(e, t) {
    return (
      e.stylesheets && e.count === 0 && Zs(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (a) {
            var i = setTimeout(function () {
              if ((e.stylesheets && Zs(e, e.stylesheets), e.unsuspend)) {
                var u = e.unsuspend;
                ((e.unsuspend = null), u());
              }
            }, 6e4 + t);
            0 < e.imgBytes && Gu === 0 && (Gu = 62500 * tv());
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
              (e.imgBytes > Gu ? 50 : 800) + t
            );
            return (
              (e.unsuspend = a),
              function () {
                ((e.unsuspend = null), clearTimeout(i), clearTimeout(s));
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
        (e.count++, (Ks = new Map()), t.forEach(xv, e), (Ks = null), Qs.call(e)));
  }
  function xv(e, t) {
    if (!(t.state.loading & 4)) {
      var a = Ks.get(e);
      if (a) var i = a.get(null);
      else {
        ((a = new Map()), Ks.set(e, a));
        for (
          var s = e.querySelectorAll('link[data-precedence],style[data-precedence]'), u = 0;
          u < s.length;
          u++
        ) {
          var m = s[u];
          (m.nodeName === 'LINK' || m.getAttribute('media') !== 'not all') &&
            (a.set(m.dataset.precedence, m), (i = m));
        }
        i && a.set(null, i);
      }
      ((s = t.instance),
        (m = s.getAttribute('data-precedence')),
        (u = a.get(m) || i),
        u === i && a.set(null, s),
        a.set(m, s),
        this.count++,
        (i = Qs.bind(this)),
        s.addEventListener('load', i),
        s.addEventListener('error', i),
        u
          ? u.parentNode.insertBefore(s, u.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(s, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var xn = {
    $$typeof: R,
    Provider: null,
    Consumer: null,
    _currentValue: ee,
    _currentValue2: ee,
    _threadCount: 0,
  };
  function Sv(e, t, a, i, s, u, m, g, x) {
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
      (this.identifierPrefix = i),
      (this.onUncaughtError = s),
      (this.onCaughtError = u),
      (this.onRecoverableError = m),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = x),
      (this.incompleteTransitions = new Map()));
  }
  function Gf(e, t, a, i, s, u, m, g, x, O, U, X) {
    return (
      (e = new Sv(e, t, a, m, x, O, U, X, g)),
      (t = 1),
      u === !0 && (t |= 24),
      (u = jt(3, null, null, t)),
      (e.current = u),
      (u.stateNode = e),
      (t = bo()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (u.memoizedState = { element: i, isDehydrated: a, cache: t }),
      To(u),
      e
    );
  }
  function $f(e) {
    return e ? ((e = Ka), e) : Ka;
  }
  function Yf(e, t, a, i, s, u) {
    ((s = $f(s)),
      i.context === null ? (i.context = s) : (i.pendingContext = s),
      (i = Zl(t)),
      (i.payload = { element: a }),
      (u = u === void 0 ? null : u),
      u !== null && (i.callback = u),
      (a = Jl(e, i, t)),
      a !== null && (Nt(a, e, t), Fi(a, e, t)));
  }
  function Xf(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function $u(e, t) {
    (Xf(e, t), (e = e.alternate) && Xf(e, t));
  }
  function Vf(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = va(e, 67108864);
      (t !== null && Nt(t, e, 67108864), $u(e, 67108864));
    }
  }
  function Qf(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = zt();
      t = Ir(t);
      var a = va(e, t);
      (a !== null && Nt(a, e, t), $u(e, t));
    }
  }
  var Js = !0;
  function wv(e, t, a, i) {
    var s = q.T;
    q.T = null;
    var u = V.p;
    try {
      ((V.p = 2), Yu(e, t, a, i));
    } finally {
      ((V.p = u), (q.T = s));
    }
  }
  function Tv(e, t, a, i) {
    var s = q.T;
    q.T = null;
    var u = V.p;
    try {
      ((V.p = 8), Yu(e, t, a, i));
    } finally {
      ((V.p = u), (q.T = s));
    }
  }
  function Yu(e, t, a, i) {
    if (Js) {
      var s = Xu(i);
      if (s === null) (Lu(e, t, i, Ps, a), Zf(e, i));
      else if (Cv(s, e, t, a, i)) i.stopPropagation();
      else if ((Zf(e, i), t & 4 && -1 < Ev.indexOf(e))) {
        for (; s !== null; ) {
          var u = Ia(s);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (((u = u.stateNode), u.current.memoizedState.isDehydrated)) {
                  var m = fa(u.pendingLanes);
                  if (m !== 0) {
                    var g = u;
                    for (g.pendingLanes |= 2, g.entangledLanes |= 2; m; ) {
                      var x = 1 << (31 - qt(m));
                      ((g.entanglements[1] |= x), (m &= ~x));
                    }
                    (pl(u), (qe & 6) === 0 && ((Ms = Lt() + 500), hn(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((g = va(u, 2)), g !== null && Nt(g, u, 2), Os(), $u(u, 2));
            }
          if (((u = Xu(i)), u === null && Lu(e, t, i, Ps, a), u === s)) break;
          s = u;
        }
        s !== null && i.stopPropagation();
      } else Lu(e, t, i, null, a);
    }
  }
  function Xu(e) {
    return ((e = Vr(e)), Vu(e));
  }
  var Ps = null;
  function Vu(e) {
    if (((Ps = null), (e = Da(e)), e !== null)) {
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
  function Kf(e) {
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
        switch (dg()) {
          case td:
            return 2;
          case ld:
            return 8;
          case Un:
          case mg:
            return 32;
          case ad:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Qu = !1,
    ra = null,
    oa = null,
    ua = null,
    Sn = new Map(),
    wn = new Map(),
    ca = [],
    Ev =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function Zf(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        ra = null;
        break;
      case 'dragenter':
      case 'dragleave':
        oa = null;
        break;
      case 'mouseover':
      case 'mouseout':
        ua = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Sn.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        wn.delete(t.pointerId);
    }
  }
  function Tn(e, t, a, i, s, u) {
    return e === null || e.nativeEvent !== u
      ? ((e = {
          blockedOn: t,
          domEventName: a,
          eventSystemFlags: i,
          nativeEvent: u,
          targetContainers: [s],
        }),
        t !== null && ((t = Ia(t)), t !== null && Vf(t)),
        e)
      : ((e.eventSystemFlags |= i),
        (t = e.targetContainers),
        s !== null && t.indexOf(s) === -1 && t.push(s),
        e);
  }
  function Cv(e, t, a, i, s) {
    switch (t) {
      case 'focusin':
        return ((ra = Tn(ra, e, t, a, i, s)), !0);
      case 'dragenter':
        return ((oa = Tn(oa, e, t, a, i, s)), !0);
      case 'mouseover':
        return ((ua = Tn(ua, e, t, a, i, s)), !0);
      case 'pointerover':
        var u = s.pointerId;
        return (Sn.set(u, Tn(Sn.get(u) || null, e, t, a, i, s)), !0);
      case 'gotpointercapture':
        return ((u = s.pointerId), wn.set(u, Tn(wn.get(u) || null, e, t, a, i, s)), !0);
    }
    return !1;
  }
  function Jf(e) {
    var t = Da(e.target);
    if (t !== null) {
      var a = d(t);
      if (a !== null) {
        if (((t = a.tag), t === 13)) {
          if (((t = _(a)), t !== null)) {
            ((e.blockedOn = t),
              ud(e.priority, function () {
                Qf(a);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = h(a)), t !== null)) {
            ((e.blockedOn = t),
              ud(e.priority, function () {
                Qf(a);
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
      var a = Xu(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var i = new a.constructor(a.type, a);
        ((Xr = i), a.target.dispatchEvent(i), (Xr = null));
      } else return ((t = Ia(a)), t !== null && Vf(t), (e.blockedOn = a), !1);
      t.shift();
    }
    return !0;
  }
  function Pf(e, t, a) {
    Ws(e) && a.delete(t);
  }
  function Nv() {
    ((Qu = !1),
      ra !== null && Ws(ra) && (ra = null),
      oa !== null && Ws(oa) && (oa = null),
      ua !== null && Ws(ua) && (ua = null),
      Sn.forEach(Pf),
      wn.forEach(Pf));
  }
  function Fs(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Qu || ((Qu = !0), l.unstable_scheduleCallback(l.unstable_NormalPriority, Nv)));
  }
  var er = null;
  function Wf(e) {
    er !== e &&
      ((er = e),
      l.unstable_scheduleCallback(l.unstable_NormalPriority, function () {
        er === e && (er = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t],
            i = e[t + 1],
            s = e[t + 2];
          if (typeof i != 'function') {
            if (Vu(i || a) === null) continue;
            break;
          }
          var u = Ia(a);
          u !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Xo(u, { pending: !0, data: s, method: a.method, action: i }, i, s));
        }
      }));
  }
  function ki(e) {
    function t(x) {
      return Fs(x, e);
    }
    (ra !== null && Fs(ra, e),
      oa !== null && Fs(oa, e),
      ua !== null && Fs(ua, e),
      Sn.forEach(t),
      wn.forEach(t));
    for (var a = 0; a < ca.length; a++) {
      var i = ca[a];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; 0 < ca.length && ((a = ca[0]), a.blockedOn === null); )
      (Jf(a), a.blockedOn === null && ca.shift());
    if (((a = (e.ownerDocument || e).$$reactFormReplay), a != null))
      for (i = 0; i < a.length; i += 3) {
        var s = a[i],
          u = a[i + 1],
          m = s[xt] || null;
        if (typeof u == 'function') m || Wf(a);
        else if (m) {
          var g = null;
          if (u && u.hasAttribute('formAction')) {
            if (((s = u), (m = u[xt] || null))) g = m.formAction;
            else if (Vu(s) !== null) continue;
          } else g = m.action;
          (typeof g == 'function' ? (a[i + 1] = g) : (a.splice(i, 3), (i -= 3)), Wf(a));
        }
      }
  }
  function Ff() {
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
      (s !== null && (s(), (s = null)), i || setTimeout(a, 20));
    }
    function a() {
      if (!i && !navigation.transition) {
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
      var i = !1,
        s = null;
      return (
        navigation.addEventListener('navigate', e),
        navigation.addEventListener('navigatesuccess', t),
        navigation.addEventListener('navigateerror', t),
        setTimeout(a, 100),
        function () {
          ((i = !0),
            navigation.removeEventListener('navigate', e),
            navigation.removeEventListener('navigatesuccess', t),
            navigation.removeEventListener('navigateerror', t),
            s !== null && (s(), (s = null)));
        }
      );
    }
  }
  function Ku(e) {
    this._internalRoot = e;
  }
  ((tr.prototype.render = Ku.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(r(409));
      var a = t.current,
        i = zt();
      Yf(a, i, e, t, null, null);
    }),
    (tr.prototype.unmount = Ku.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (Yf(e.current, 2, null, e, null, null), Os(), (t[Oa] = null));
        }
      }));
  function tr(e) {
    this._internalRoot = e;
  }
  tr.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = od();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < ca.length && t !== 0 && t < ca[a].priority; a++);
      (ca.splice(a, 0, e), a === 0 && Jf(e));
    }
  };
  var ep = n.version;
  if (ep !== '19.2.5') throw Error(r(527, ep, '19.2.5'));
  V.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(r(188))
        : ((e = Object.keys(e).join(',')), Error(r(268, e)));
    return ((e = p(t)), (e = e !== null ? v(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var Av = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: q,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var lr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!lr.isDisabled && lr.supportsFiber)
      try {
        ((Mi = lr.inject(Av)), (Bt = lr));
      } catch {}
  }
  return (
    (Cn.createRoot = function (e, t) {
      if (!c(e)) throw Error(r(299));
      var a = !1,
        i = '',
        s = s_,
        u = r_,
        m = o_;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (i = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (s = t.onUncaughtError),
          t.onCaughtError !== void 0 && (u = t.onCaughtError),
          t.onRecoverableError !== void 0 && (m = t.onRecoverableError)),
        (t = Gf(e, 1, !1, null, null, a, i, null, s, u, m, Ff)),
        (e[Oa] = t.current),
        Au(e),
        new Ku(t)
      );
    }),
    (Cn.hydrateRoot = function (e, t, a) {
      if (!c(e)) throw Error(r(299));
      var i = !1,
        s = '',
        u = s_,
        m = r_,
        g = o_,
        x = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (i = !0),
          a.identifierPrefix !== void 0 && (s = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (u = a.onUncaughtError),
          a.onCaughtError !== void 0 && (m = a.onCaughtError),
          a.onRecoverableError !== void 0 && (g = a.onRecoverableError),
          a.formState !== void 0 && (x = a.formState)),
        (t = Gf(e, 1, !0, t, a ?? null, i, s, x, u, m, g, Ff)),
        (t.context = $f(null)),
        (a = t.current),
        (i = zt()),
        (i = Ir(i)),
        (s = Zl(i)),
        (s.callback = null),
        Jl(a, s, i),
        (a = i),
        (t.current.lanes = a),
        Oi(t, a),
        pl(t),
        (e[Oa] = t.current),
        Au(e),
        new tr(t)
      );
    }),
    (Cn.version = '19.2.5'),
    Cn
  );
}
var cp;
function Hv() {
  if (cp) return Pu.exports;
  cp = 1;
  function l() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (n) {
        console.error(n);
      }
  }
  return (l(), (Pu.exports = Uv()), Pu.exports);
}
var Gv = Hv(),
  C = qc();
/**
 * react-router v7.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var dp = 'popstate';
function mp(l) {
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
function $v(l = {}) {
  function n(r, c) {
    var p;
    let d = (p = c.state) == null ? void 0 : p.masked,
      { pathname: _, search: h, hash: k } = d || r.location;
    return kc(
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
    return typeof c == 'string' ? c : jn(c);
  }
  return Xv(n, o, null, l);
}
function Ke(l, n) {
  if (l === !1 || l === null || typeof l > 'u') throw new Error(n);
}
function rl(l, n) {
  if (!l) {
    typeof console < 'u' && console.warn(n);
    try {
      throw new Error(n);
    } catch {}
  }
}
function Yv() {
  return Math.random().toString(36).substring(2, 10);
}
function _p(l, n) {
  return {
    usr: l.state,
    key: l.key,
    idx: n,
    masked: l.unstable_mask ? { pathname: l.pathname, search: l.search, hash: l.hash } : void 0,
  };
}
function kc(l, n, o = null, r, c) {
  return {
    pathname: typeof l == 'string' ? l : l.pathname,
    search: '',
    hash: '',
    ...(typeof n == 'string' ? Ni(n) : n),
    state: o,
    key: (n && n.key) || r || Yv(),
    unstable_mask: c,
  };
}
function jn({ pathname: l = '/', search: n = '', hash: o = '' }) {
  return (
    n && n !== '?' && (l += n.charAt(0) === '?' ? n : '?' + n),
    o && o !== '#' && (l += o.charAt(0) === '#' ? o : '#' + o),
    l
  );
}
function Ni(l) {
  let n = {};
  if (l) {
    let o = l.indexOf('#');
    o >= 0 && ((n.hash = l.substring(o)), (l = l.substring(0, o)));
    let r = l.indexOf('?');
    (r >= 0 && ((n.search = l.substring(r)), (l = l.substring(0, r))), l && (n.pathname = l));
  }
  return n;
}
function Xv(l, n, o, r = {}) {
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
    let w = v(),
      E = w == null ? null : w - p;
    ((p = w), k && k({ action: h, location: B.location, delta: E }));
  }
  function S(w, E) {
    h = 'PUSH';
    let T = mp(w) ? w : kc(B.location, w, E);
    p = v() + 1;
    let R = _p(T, p),
      W = B.createHref(T.unstable_mask || T);
    try {
      _.pushState(R, '', W);
    } catch (K) {
      if (K instanceof DOMException && K.name === 'DataCloneError') throw K;
      c.location.assign(W);
    }
    d && k && k({ action: h, location: B.location, delta: 1 });
  }
  function L(w, E) {
    h = 'REPLACE';
    let T = mp(w) ? w : kc(B.location, w, E);
    p = v();
    let R = _p(T, p),
      W = B.createHref(T.unstable_mask || T);
    (_.replaceState(R, '', W), d && k && k({ action: h, location: B.location, delta: 0 }));
  }
  function b(w) {
    return Vv(w);
  }
  let B = {
    get action() {
      return h;
    },
    get location() {
      return l(c, _);
    },
    listen(w) {
      if (k) throw new Error('A history only accepts one active listener');
      return (
        c.addEventListener(dp, y),
        (k = w),
        () => {
          (c.removeEventListener(dp, y), (k = null));
        }
      );
    },
    createHref(w) {
      return n(c, w);
    },
    createURL: b,
    encodeLocation(w) {
      let E = b(w);
      return { pathname: E.pathname, search: E.search, hash: E.hash };
    },
    push: S,
    replace: L,
    go(w) {
      return _.go(w);
    },
  };
  return B;
}
function Vv(l, n = !1) {
  let o = 'http://localhost';
  (typeof window < 'u' &&
    (o = window.location.origin !== 'null' ? window.location.origin : window.location.href),
    Ke(o, 'No window.location.(origin|href) available to create URL'));
  let r = typeof l == 'string' ? l : jn(l);
  return ((r = r.replace(/ $/, '%20')), !n && r.startsWith('//') && (r = o + r), new URL(r, o));
}
function Gp(l, n, o = '/') {
  return Qv(l, n, o, !1);
}
function Qv(l, n, o, r) {
  let c = typeof n == 'string' ? Ni(n) : n,
    d = zl(c.pathname || '/', o);
  if (d == null) return null;
  let _ = $p(l);
  Kv(_);
  let h = null;
  for (let k = 0; h == null && k < _.length; ++k) {
    let p = n0(d);
    h = a0(_[k], p, r);
  }
  return h;
}
function $p(l, n = [], o = [], r = '', c = !1) {
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
    let y = sl([r, v.relativePath]),
      S = o.concat(v);
    (_.children &&
      _.children.length > 0 &&
      (Ke(
        _.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${y}".`
      ),
      $p(_.children, n, S, y, k)),
      !(_.path == null && !_.index) && n.push({ path: y, score: t0(y, _.index), routesMeta: S }));
  };
  return (
    l.forEach((_, h) => {
      var k;
      if (_.path === '' || !((k = _.path) != null && k.includes('?'))) d(_, h);
      else for (let p of Yp(_.path)) d(_, h, !0, p);
    }),
    n
  );
}
function Yp(l) {
  let n = l.split('/');
  if (n.length === 0) return [];
  let [o, ...r] = n,
    c = o.endsWith('?'),
    d = o.replace(/\?$/, '');
  if (r.length === 0) return c ? [d, ''] : [d];
  let _ = Yp(r.join('/')),
    h = [];
  return (
    h.push(..._.map((k) => (k === '' ? d : [d, k].join('/')))),
    c && h.push(..._),
    h.map((k) => (l.startsWith('/') && k === '' ? '/' : k))
  );
}
function Kv(l) {
  l.sort((n, o) =>
    n.score !== o.score
      ? o.score - n.score
      : l0(
          n.routesMeta.map((r) => r.childrenIndex),
          o.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
var Zv = /^:[\w-]+$/,
  Jv = 3,
  Pv = 2,
  Wv = 1,
  Fv = 10,
  e0 = -2,
  fp = (l) => l === '*';
function t0(l, n) {
  let o = l.split('/'),
    r = o.length;
  return (
    o.some(fp) && (r += e0),
    n && (r += Pv),
    o.filter((c) => !fp(c)).reduce((c, d) => c + (Zv.test(d) ? Jv : d === '' ? Wv : Fv), r)
  );
}
function l0(l, n) {
  return l.length === n.length && l.slice(0, -1).every((r, c) => r === n[c])
    ? l[l.length - 1] - n[n.length - 1]
    : 0;
}
function a0(l, n, o = !1) {
  let { routesMeta: r } = l,
    c = {},
    d = '/',
    _ = [];
  for (let h = 0; h < r.length; ++h) {
    let k = r[h],
      p = h === r.length - 1,
      v = d === '/' ? n : n.slice(d.length) || '/',
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
        pathname: sl([d, y.pathname]),
        pathnameBase: u0(sl([d, y.pathnameBase])),
        route: S,
      }),
      y.pathnameBase !== '/' && (d = sl([d, y.pathnameBase])));
  }
  return _;
}
function fr(l, n) {
  typeof l == 'string' && (l = { path: l, caseSensitive: !1, end: !0 });
  let [o, r] = i0(l.path, l.caseSensitive, l.end),
    c = n.match(o);
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
      const L = h[S];
      return (y && !L ? (p[v] = void 0) : (p[v] = (L || '').replace(/%2F/g, '/')), p);
    }, {}),
    pathname: d,
    pathnameBase: _,
    pattern: l,
  };
}
function i0(l, n = !1, o = !0) {
  rl(
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
    [new RegExp(c, n ? void 0 : 'i'), r]
  );
}
function n0(l) {
  try {
    return l
      .split('/')
      .map((n) => decodeURIComponent(n).replace(/\//g, '%2F'))
      .join('/');
  } catch (n) {
    return (
      rl(
        !1,
        `The URL path "${l}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${n}).`
      ),
      l
    );
  }
}
function zl(l, n) {
  if (n === '/') return l;
  if (!l.toLowerCase().startsWith(n.toLowerCase())) return null;
  let o = n.endsWith('/') ? n.length - 1 : n.length,
    r = l.charAt(o);
  return r && r !== '/' ? null : l.slice(o) || '/';
}
var s0 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function r0(l, n = '/') {
  let { pathname: o, search: r = '', hash: c = '' } = typeof l == 'string' ? Ni(l) : l,
    d;
  return (
    o ? ((o = Xp(o)), o.startsWith('/') ? (d = pp(o.substring(1), '/')) : (d = pp(o, n))) : (d = n),
    { pathname: d, search: c0(r), hash: d0(c) }
  );
}
function pp(l, n) {
  let o = pr(n).split('/');
  return (
    l.split('/').forEach((c) => {
      c === '..' ? o.length > 1 && o.pop() : c !== '.' && o.push(c);
    }),
    o.length > 1 ? o.join('/') : '/'
  );
}
function lc(l, n, o, r) {
  return `Cannot include a '${l}' character in a manually specified \`to.${n}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function o0(l) {
  return l.filter((n, o) => o === 0 || (n.route.path && n.route.path.length > 0));
}
function Mc(l) {
  let n = o0(l);
  return n.map((o, r) => (r === n.length - 1 ? o.pathname : o.pathnameBase));
}
function Sr(l, n, o, r = !1) {
  let c;
  typeof l == 'string'
    ? (c = Ni(l))
    : ((c = { ...l }),
      Ke(!c.pathname || !c.pathname.includes('?'), lc('?', 'pathname', 'search', c)),
      Ke(!c.pathname || !c.pathname.includes('#'), lc('#', 'pathname', 'hash', c)),
      Ke(!c.search || !c.search.includes('#'), lc('#', 'search', 'hash', c)));
  let d = l === '' || c.pathname === '',
    _ = d ? '/' : c.pathname,
    h;
  if (_ == null) h = o;
  else {
    let y = n.length - 1;
    if (!r && _.startsWith('..')) {
      let S = _.split('/');
      for (; S[0] === '..'; ) (S.shift(), (y -= 1));
      c.pathname = S.join('/');
    }
    h = y >= 0 ? n[y] : '/';
  }
  let k = r0(c, h),
    p = _ && _ !== '/' && _.endsWith('/'),
    v = (d || _ === '.') && o.endsWith('/');
  return (!k.pathname.endsWith('/') && (p || v) && (k.pathname += '/'), k);
}
var Xp = (l) => l.replace(/\/\/+/g, '/'),
  sl = (l) => Xp(l.join('/')),
  pr = (l) => l.replace(/\/+$/, ''),
  u0 = (l) => pr(l).replace(/^\/*/, '/'),
  c0 = (l) => (!l || l === '?' ? '' : l.startsWith('?') ? l : '?' + l),
  d0 = (l) => (!l || l === '#' ? '' : l.startsWith('#') ? l : '#' + l),
  m0 = class {
    constructor(l, n, o, r = !1) {
      ((this.status = l),
        (this.statusText = n || ''),
        (this.internal = r),
        o instanceof Error ? ((this.data = o.toString()), (this.error = o)) : (this.data = o));
    }
  };
function _0(l) {
  return (
    l != null &&
    typeof l.status == 'number' &&
    typeof l.statusText == 'string' &&
    typeof l.internal == 'boolean' &&
    'data' in l
  );
}
function f0(l) {
  let n = l.map((o) => o.route.path).filter(Boolean);
  return sl(n) || '/';
}
var Vp =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
function Qp(l, n) {
  let o = l;
  if (typeof o != 'string' || !s0.test(o)) return { absoluteURL: void 0, isExternal: !1, to: o };
  let r = o,
    c = !1;
  if (Vp)
    try {
      let d = new URL(window.location.href),
        _ = o.startsWith('//') ? new URL(d.protocol + o) : new URL(o),
        h = zl(_.pathname, n);
      _.origin === d.origin && h != null ? (o = h + _.search + _.hash) : (c = !0);
    } catch {
      rl(
        !1,
        `<Link to="${o}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: r, isExternal: c, to: o };
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
var Kp = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(Kp);
var p0 = ['GET', ...Kp];
new Set(p0);
var Ai = C.createContext(null);
Ai.displayName = 'DataRouter';
var wr = C.createContext(null);
wr.displayName = 'DataRouterState';
var Zp = C.createContext(!1);
function h0() {
  return C.useContext(Zp);
}
var Jp = C.createContext({ isTransitioning: !1 });
Jp.displayName = 'ViewTransition';
var g0 = C.createContext(new Map());
g0.displayName = 'Fetchers';
var k0 = C.createContext(null);
k0.displayName = 'Await';
var Ht = C.createContext(null);
Ht.displayName = 'Navigation';
var In = C.createContext(null);
In.displayName = 'Location';
var cl = C.createContext({ outlet: null, matches: [], isDataRoute: !1 });
cl.displayName = 'Route';
var jc = C.createContext(null);
jc.displayName = 'RouteError';
var Pp = 'REACT_ROUTER_ERROR',
  v0 = 'REDIRECT',
  y0 = 'ROUTE_ERROR_RESPONSE';
function b0(l) {
  if (l.startsWith(`${Pp}:${v0}:{`))
    try {
      let n = JSON.parse(l.slice(28));
      if (
        typeof n == 'object' &&
        n &&
        typeof n.status == 'number' &&
        typeof n.statusText == 'string' &&
        typeof n.location == 'string' &&
        typeof n.reloadDocument == 'boolean' &&
        typeof n.replace == 'boolean'
      )
        return n;
    } catch {}
}
function x0(l) {
  if (l.startsWith(`${Pp}:${y0}:{`))
    try {
      let n = JSON.parse(l.slice(40));
      if (
        typeof n == 'object' &&
        n &&
        typeof n.status == 'number' &&
        typeof n.statusText == 'string'
      )
        return new m0(n.status, n.statusText, n.data);
    } catch {}
}
function S0(l, { relative: n } = {}) {
  Ke(Li(), 'useHref() may be used only in the context of a <Router> component.');
  let { basename: o, navigator: r } = C.useContext(Ht),
    { hash: c, pathname: d, search: _ } = Rn(l, { relative: n }),
    h = d;
  return (
    o !== '/' && (h = d === '/' ? o : sl([o, d])),
    r.createHref({ pathname: h, search: _, hash: c })
  );
}
function Li() {
  return C.useContext(In) != null;
}
function gl() {
  return (
    Ke(Li(), 'useLocation() may be used only in the context of a <Router> component.'),
    C.useContext(In).location
  );
}
var Wp =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function Fp(l) {
  C.useContext(Ht).static || C.useLayoutEffect(l);
}
function dl() {
  let { isDataRoute: l } = C.useContext(cl);
  return l ? I0() : w0();
}
function w0() {
  Ke(Li(), 'useNavigate() may be used only in the context of a <Router> component.');
  let l = C.useContext(Ai),
    { basename: n, navigator: o } = C.useContext(Ht),
    { matches: r } = C.useContext(cl),
    { pathname: c } = gl(),
    d = JSON.stringify(Mc(r)),
    _ = C.useRef(!1);
  return (
    Fp(() => {
      _.current = !0;
    }),
    C.useCallback(
      (k, p = {}) => {
        if ((rl(_.current, Wp), !_.current)) return;
        if (typeof k == 'number') {
          o.go(k);
          return;
        }
        let v = Sr(k, JSON.parse(d), c, p.relative === 'path');
        (l == null && n !== '/' && (v.pathname = v.pathname === '/' ? n : sl([n, v.pathname])),
          (p.replace ? o.replace : o.push)(v, p.state, p));
      },
      [n, o, d, c, l]
    )
  );
}
C.createContext(null);
function T0() {
  let { matches: l } = C.useContext(cl),
    n = l[l.length - 1];
  return (n == null ? void 0 : n.params) ?? {};
}
function Rn(l, { relative: n } = {}) {
  let { matches: o } = C.useContext(cl),
    { pathname: r } = gl(),
    c = JSON.stringify(Mc(o));
  return C.useMemo(() => Sr(l, JSON.parse(c), r, n === 'path'), [l, c, r, n]);
}
function E0(l, n) {
  return eh(l, n);
}
function eh(l, n, o) {
  var w;
  Ke(Li(), 'useRoutes() may be used only in the context of a <Router> component.');
  let { navigator: r } = C.useContext(Ht),
    { matches: c } = C.useContext(cl),
    d = c[c.length - 1],
    _ = d ? d.params : {},
    h = d ? d.pathname : '/',
    k = d ? d.pathnameBase : '/',
    p = d && d.route;
  {
    let E = (p && p.path) || '';
    lh(
      h,
      !p || E.endsWith('*') || E.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${E}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${E}"> to <Route path="${E === '/' ? '*' : `${E}/*`}">.`
    );
  }
  let v = gl(),
    y;
  if (n) {
    let E = typeof n == 'string' ? Ni(n) : n;
    (Ke(
      k === '/' || ((w = E.pathname) == null ? void 0 : w.startsWith(k)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${k}" but pathname "${E.pathname}" was given in the \`location\` prop.`
    ),
      (y = E));
  } else y = v;
  let S = y.pathname || '/',
    L = S;
  if (k !== '/') {
    let E = k.replace(/^\//, '').split('/');
    L = '/' + S.replace(/^\//, '').split('/').slice(E.length).join('/');
  }
  let b = Gp(l, { pathname: L });
  (rl(p || b != null, `No routes matched location "${y.pathname}${y.search}${y.hash}" `),
    rl(
      b == null ||
        b[b.length - 1].route.element !== void 0 ||
        b[b.length - 1].route.Component !== void 0 ||
        b[b.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${y.pathname}${y.search}${y.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let B = B0(
    b &&
      b.map((E) =>
        Object.assign({}, E, {
          params: Object.assign({}, _, E.params),
          pathname: sl([
            k,
            r.encodeLocation
              ? r.encodeLocation(
                  E.pathname.replace(/%/g, '%25').replace(/\?/g, '%3F').replace(/#/g, '%23')
                ).pathname
              : E.pathname,
          ]),
          pathnameBase:
            E.pathnameBase === '/'
              ? k
              : sl([
                  k,
                  r.encodeLocation
                    ? r.encodeLocation(
                        E.pathnameBase
                          .replace(/%/g, '%25')
                          .replace(/\?/g, '%3F')
                          .replace(/#/g, '%23')
                      ).pathname
                    : E.pathnameBase,
                ]),
        })
      ),
    c,
    o
  );
  return n && B
    ? C.createElement(
        In.Provider,
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
        B
      )
    : B;
}
function C0() {
  let l = D0(),
    n = _0(l) ? `${l.status} ${l.statusText}` : l instanceof Error ? l.message : JSON.stringify(l),
    o = l instanceof Error ? l.stack : null,
    r = 'rgba(200,200,200, 0.5)',
    c = { padding: '0.5rem', backgroundColor: r },
    d = { padding: '2px 4px', backgroundColor: r },
    _ = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', l),
    (_ = C.createElement(
      C.Fragment,
      null,
      C.createElement('p', null, '💿 Hey developer 👋'),
      C.createElement(
        'p',
        null,
        'You can provide a way better UX than this when your app throws errors by providing your own ',
        C.createElement('code', { style: d }, 'ErrorBoundary'),
        ' or',
        ' ',
        C.createElement('code', { style: d }, 'errorElement'),
        ' prop on your route.'
      )
    )),
    C.createElement(
      C.Fragment,
      null,
      C.createElement('h2', null, 'Unexpected Application Error!'),
      C.createElement('h3', { style: { fontStyle: 'italic' } }, n),
      o ? C.createElement('pre', { style: c }, o) : null,
      _
    )
  );
}
var N0 = C.createElement(C0, null),
  th = class extends C.Component {
    constructor(l) {
      (super(l),
        (this.state = { location: l.location, revalidation: l.revalidation, error: l.error }));
    }
    static getDerivedStateFromError(l) {
      return { error: l };
    }
    static getDerivedStateFromProps(l, n) {
      return n.location !== l.location || (n.revalidation !== 'idle' && l.revalidation === 'idle')
        ? { error: l.error, location: l.location, revalidation: l.revalidation }
        : {
            error: l.error !== void 0 ? l.error : n.error,
            location: n.location,
            revalidation: l.revalidation || n.revalidation,
          };
    }
    componentDidCatch(l, n) {
      this.props.onError
        ? this.props.onError(l, n)
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
        const o = x0(l.digest);
        o && (l = o);
      }
      let n =
        l !== void 0
          ? C.createElement(
              cl.Provider,
              { value: this.props.routeContext },
              C.createElement(jc.Provider, { value: l, children: this.props.component })
            )
          : this.props.children;
      return this.context ? C.createElement(A0, { error: l }, n) : n;
    }
  };
th.contextType = Zp;
var ac = new WeakMap();
function A0({ children: l, error: n }) {
  let { basename: o } = C.useContext(Ht);
  if (typeof n == 'object' && n && 'digest' in n && typeof n.digest == 'string') {
    let r = b0(n.digest);
    if (r) {
      let c = ac.get(n);
      if (c) throw c;
      let d = Qp(r.location, o);
      if (Vp && !ac.get(n))
        if (d.isExternal || r.reloadDocument) window.location.href = d.absoluteURL || d.to;
        else {
          const _ = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(d.to, { replace: r.replace })
          );
          throw (ac.set(n, _), _);
        }
      return C.createElement('meta', {
        httpEquiv: 'refresh',
        content: `0;url=${d.absoluteURL || d.to}`,
      });
    }
  }
  return l;
}
function L0({ routeContext: l, match: n, children: o }) {
  let r = C.useContext(Ai);
  return (
    r &&
      r.static &&
      r.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = n.route.id),
    C.createElement(cl.Provider, { value: l }, o)
  );
}
function B0(l, n = [], o) {
  let r = o == null ? void 0 : o.state;
  if (l == null) {
    if (!r) return null;
    if (r.errors) l = r.matches;
    else if (n.length === 0 && !r.initialized && r.matches.length > 0) l = r.matches;
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
        let { loaderData: S, errors: L } = r,
          b = y.route.loader && !S.hasOwnProperty(y.route.id) && (!L || L[y.route.id] === void 0);
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
            var S, L;
            k(v, {
              location: r.location,
              params:
                ((L = (S = r.matches) == null ? void 0 : S[0]) == null ? void 0 : L.params) ?? {},
              unstable_pattern: f0(r.matches),
              errorInfo: y,
            });
          }
        : void 0;
  return c.reduceRight((v, y, S) => {
    let L,
      b = !1,
      B = null,
      w = null;
    r &&
      ((L = d && y.route.id ? d[y.route.id] : void 0),
      (B = y.route.errorElement || N0),
      _ &&
        (h < 0 && S === 0
          ? (lh(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration'
            ),
            (b = !0),
            (w = null))
          : h === S && ((b = !0), (w = y.route.hydrateFallbackElement || null))));
    let E = n.concat(c.slice(0, S + 1)),
      T = () => {
        let R;
        return (
          L
            ? (R = B)
            : b
              ? (R = w)
              : y.route.Component
                ? (R = C.createElement(y.route.Component, null))
                : y.route.element
                  ? (R = y.route.element)
                  : (R = v),
          C.createElement(L0, {
            match: y,
            routeContext: { outlet: v, matches: E, isDataRoute: r != null },
            children: R,
          })
        );
      };
    return r && (y.route.ErrorBoundary || y.route.errorElement || S === 0)
      ? C.createElement(th, {
          location: r.location,
          revalidation: r.revalidation,
          component: B,
          error: L,
          children: T(),
          routeContext: { outlet: null, matches: E, isDataRoute: !0 },
          onError: p,
        })
      : T();
  }, null);
}
function Oc(l) {
  return `${l} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function q0(l) {
  let n = C.useContext(Ai);
  return (Ke(n, Oc(l)), n);
}
function M0(l) {
  let n = C.useContext(wr);
  return (Ke(n, Oc(l)), n);
}
function j0(l) {
  let n = C.useContext(cl);
  return (Ke(n, Oc(l)), n);
}
function Dc(l) {
  let n = j0(l),
    o = n.matches[n.matches.length - 1];
  return (Ke(o.route.id, `${l} can only be used on routes that contain a unique "id"`), o.route.id);
}
function O0() {
  return Dc('useRouteId');
}
function D0() {
  var r;
  let l = C.useContext(jc),
    n = M0('useRouteError'),
    o = Dc('useRouteError');
  return l !== void 0 ? l : (r = n.errors) == null ? void 0 : r[o];
}
function I0() {
  let { router: l } = q0('useNavigate'),
    n = Dc('useNavigate'),
    o = C.useRef(!1);
  return (
    Fp(() => {
      o.current = !0;
    }),
    C.useCallback(
      async (c, d = {}) => {
        (rl(o.current, Wp),
          o.current &&
            (typeof c == 'number'
              ? await l.navigate(c)
              : await l.navigate(c, { fromRouteId: n, ...d })));
      },
      [l, n]
    )
  );
}
var hp = {};
function lh(l, n, o) {
  !n && !hp[l] && ((hp[l] = !0), rl(!1, o));
}
C.memo(R0);
function R0({ routes: l, future: n, state: o, isStatic: r, onError: c }) {
  return eh(l, void 0, { state: o, isStatic: r, onError: c });
}
function ol({ to: l, replace: n, state: o, relative: r }) {
  Ke(Li(), '<Navigate> may be used only in the context of a <Router> component.');
  let { static: c } = C.useContext(Ht);
  rl(
    !c,
    '<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.'
  );
  let { matches: d } = C.useContext(cl),
    { pathname: _ } = gl(),
    h = dl(),
    k = Sr(l, Mc(d), _, r === 'path'),
    p = JSON.stringify(k);
  return (
    C.useEffect(() => {
      h(JSON.parse(p), { replace: n, state: o, relative: r });
    }, [h, p, r, n, o]),
    null
  );
}
function Ft(l) {
  Ke(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  );
}
function z0({
  basename: l = '/',
  children: n = null,
  location: o,
  navigationType: r = 'POP',
  navigator: c,
  static: d = !1,
  unstable_useTransitions: _,
}) {
  Ke(
    !Li(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  let h = l.replace(/^\/*/, '/'),
    k = C.useMemo(
      () => ({ basename: h, navigator: c, static: d, unstable_useTransitions: _, future: {} }),
      [h, c, d, _]
    );
  typeof o == 'string' && (o = Ni(o));
  let {
      pathname: p = '/',
      search: v = '',
      hash: y = '',
      state: S = null,
      key: L = 'default',
      unstable_mask: b,
    } = o,
    B = C.useMemo(() => {
      let w = zl(p, h);
      return w == null
        ? null
        : {
            location: { pathname: w, search: v, hash: y, state: S, key: L, unstable_mask: b },
            navigationType: r,
          };
    }, [h, p, v, y, S, L, r, b]);
  return (
    rl(
      B != null,
      `<Router basename="${h}"> is not able to match the URL "${p}${v}${y}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    B == null
      ? null
      : C.createElement(
          Ht.Provider,
          { value: k },
          C.createElement(In.Provider, { children: n, value: B })
        )
  );
}
function U0({ children: l, location: n }) {
  return E0(vc(l), n);
}
function vc(l, n = []) {
  let o = [];
  return (
    C.Children.forEach(l, (r, c) => {
      if (!C.isValidElement(r)) return;
      let d = [...n, c];
      if (r.type === C.Fragment) {
        o.push.apply(o, vc(r.props.children, d));
        return;
      }
      (Ke(
        r.type === Ft,
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
      (r.props.children && (_.children = vc(r.props.children, d)), o.push(_));
    }),
    o
  );
}
var dr = 'get',
  mr = 'application/x-www-form-urlencoded';
function Tr(l) {
  return typeof HTMLElement < 'u' && l instanceof HTMLElement;
}
function H0(l) {
  return Tr(l) && l.tagName.toLowerCase() === 'button';
}
function G0(l) {
  return Tr(l) && l.tagName.toLowerCase() === 'form';
}
function $0(l) {
  return Tr(l) && l.tagName.toLowerCase() === 'input';
}
function Y0(l) {
  return !!(l.metaKey || l.altKey || l.ctrlKey || l.shiftKey);
}
function X0(l, n) {
  return l.button === 0 && (!n || n === '_self') && !Y0(l);
}
var ar = null;
function V0() {
  if (ar === null)
    try {
      (new FormData(document.createElement('form'), 0), (ar = !1));
    } catch {
      ar = !0;
    }
  return ar;
}
var Q0 = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
function ic(l) {
  return l != null && !Q0.has(l)
    ? (rl(
        !1,
        `"${l}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${mr}"`
      ),
      null)
    : l;
}
function K0(l, n) {
  let o, r, c, d, _;
  if (G0(l)) {
    let h = l.getAttribute('action');
    ((r = h ? zl(h, n) : null),
      (o = l.getAttribute('method') || dr),
      (c = ic(l.getAttribute('enctype')) || mr),
      (d = new FormData(l)));
  } else if (H0(l) || ($0(l) && (l.type === 'submit' || l.type === 'image'))) {
    let h = l.form;
    if (h == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let k = l.getAttribute('formaction') || h.getAttribute('action');
    if (
      ((r = k ? zl(k, n) : null),
      (o = l.getAttribute('formmethod') || h.getAttribute('method') || dr),
      (c = ic(l.getAttribute('formenctype')) || ic(h.getAttribute('enctype')) || mr),
      (d = new FormData(h, l)),
      !V0())
    ) {
      let { name: p, type: v, value: y } = l;
      if (v === 'image') {
        let S = p ? `${p}.` : '';
        (d.append(`${S}x`, '0'), d.append(`${S}y`, '0'));
      } else p && d.append(p, y);
    }
  } else {
    if (Tr(l))
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
function Ic(l, n) {
  if (l === !1 || l === null || typeof l > 'u') throw new Error(n);
}
function ah(l, n, o, r) {
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
        : n && zl(c.pathname, n) === '/'
          ? (c.pathname = `${pr(n)}/_root.${r}`)
          : (c.pathname = `${pr(c.pathname)}.${r}`),
    c
  );
}
async function Z0(l, n) {
  if (l.id in n) return n[l.id];
  try {
    let o = await import(l.module);
    return ((n[l.id] = o), o);
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
function J0(l) {
  return l == null
    ? !1
    : l.href == null
      ? l.rel === 'preload' && typeof l.imageSrcSet == 'string' && typeof l.imageSizes == 'string'
      : typeof l.rel == 'string' && typeof l.href == 'string';
}
async function P0(l, n, o) {
  let r = await Promise.all(
    l.map(async (c) => {
      let d = n.routes[c.route.id];
      if (d) {
        let _ = await Z0(d, o);
        return _.links ? _.links() : [];
      }
      return [];
    })
  );
  return ty(
    r
      .flat(1)
      .filter(J0)
      .filter((c) => c.rel === 'stylesheet' || c.rel === 'preload')
      .map((c) =>
        c.rel === 'stylesheet' ? { ...c, rel: 'prefetch', as: 'style' } : { ...c, rel: 'prefetch' }
      )
  );
}
function gp(l, n, o, r, c, d) {
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
    ? n.filter((k, p) => _(k, p) || h(k, p))
    : d === 'data'
      ? n.filter((k, p) => {
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
function W0(l, n, { includeHydrateFallback: o } = {}) {
  return F0(
    l
      .map((r) => {
        let c = n.routes[r.route.id];
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
function F0(l) {
  return [...new Set(l)];
}
function ey(l) {
  let n = {},
    o = Object.keys(l).sort();
  for (let r of o) n[r] = l[r];
  return n;
}
function ty(l, n) {
  let o = new Set();
  return (
    new Set(n),
    l.reduce((r, c) => {
      let d = JSON.stringify(ey(c));
      return (o.has(d) || (o.add(d), r.push({ key: d, link: c })), r);
    }, [])
  );
}
function Rc() {
  let l = C.useContext(Ai);
  return (Ic(l, 'You must render this element inside a <DataRouterContext.Provider> element'), l);
}
function ly() {
  let l = C.useContext(wr);
  return (
    Ic(l, 'You must render this element inside a <DataRouterStateContext.Provider> element'),
    l
  );
}
var zc = C.createContext(void 0);
zc.displayName = 'FrameworkContext';
function Uc() {
  let l = C.useContext(zc);
  return (Ic(l, 'You must render this element inside a <HydratedRouter> element'), l);
}
function ay(l, n) {
  let o = C.useContext(zc),
    [r, c] = C.useState(!1),
    [d, _] = C.useState(!1),
    { onFocus: h, onBlur: k, onMouseEnter: p, onMouseLeave: v, onTouchStart: y } = n,
    S = C.useRef(null);
  (C.useEffect(() => {
    if ((l === 'render' && _(!0), l === 'viewport')) {
      let B = (E) => {
          E.forEach((T) => {
            _(T.isIntersecting);
          });
        },
        w = new IntersectionObserver(B, { threshold: 0.5 });
      return (
        S.current && w.observe(S.current),
        () => {
          w.disconnect();
        }
      );
    }
  }, [l]),
    C.useEffect(() => {
      if (r) {
        let B = setTimeout(() => {
          _(!0);
        }, 100);
        return () => {
          clearTimeout(B);
        };
      }
    }, [r]));
  let L = () => {
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
            onFocus: Nn(h, L),
            onBlur: Nn(k, b),
            onMouseEnter: Nn(p, L),
            onMouseLeave: Nn(v, b),
            onTouchStart: Nn(y, L),
          },
        ]
    : [!1, S, {}];
}
function Nn(l, n) {
  return (o) => {
    (l && l(o), o.defaultPrevented || n(o));
  };
}
function iy({ page: l, ...n }) {
  let o = h0(),
    { router: r } = Rc(),
    c = C.useMemo(() => Gp(r.routes, l, r.basename), [r.routes, l, r.basename]);
  return c
    ? o
      ? C.createElement(sy, { page: l, matches: c, ...n })
      : C.createElement(ry, { page: l, matches: c, ...n })
    : null;
}
function ny(l) {
  let { manifest: n, routeModules: o } = Uc(),
    [r, c] = C.useState([]);
  return (
    C.useEffect(() => {
      let d = !1;
      return (
        P0(l, n, o).then((_) => {
          d || c(_);
        }),
        () => {
          d = !0;
        }
      );
    }, [l, n, o]),
    r
  );
}
function sy({ page: l, matches: n, ...o }) {
  let r = gl(),
    { future: c } = Uc(),
    { basename: d } = Rc(),
    _ = C.useMemo(() => {
      if (l === r.pathname + r.search + r.hash) return [];
      let h = ah(l, d, c.unstable_trailingSlashAwareDataRequests, 'rsc'),
        k = !1,
        p = [];
      for (let v of n)
        typeof v.route.shouldRevalidate == 'function' ? (k = !0) : p.push(v.route.id);
      return (
        k && p.length > 0 && h.searchParams.set('_routes', p.join(',')),
        [h.pathname + h.search]
      );
    }, [d, c.unstable_trailingSlashAwareDataRequests, l, r, n]);
  return C.createElement(
    C.Fragment,
    null,
    _.map((h) => C.createElement('link', { key: h, rel: 'prefetch', as: 'fetch', href: h, ...o }))
  );
}
function ry({ page: l, matches: n, ...o }) {
  let r = gl(),
    { future: c, manifest: d, routeModules: _ } = Uc(),
    { basename: h } = Rc(),
    { loaderData: k, matches: p } = ly(),
    v = C.useMemo(() => gp(l, n, p, d, r, 'data'), [l, n, p, d, r]),
    y = C.useMemo(() => gp(l, n, p, d, r, 'assets'), [l, n, p, d, r]),
    S = C.useMemo(() => {
      if (l === r.pathname + r.search + r.hash) return [];
      let B = new Set(),
        w = !1;
      if (
        (n.forEach((T) => {
          var W;
          let R = d.routes[T.route.id];
          !R ||
            !R.hasLoader ||
            ((!v.some((K) => K.route.id === T.route.id) &&
              T.route.id in k &&
              (W = _[T.route.id]) != null &&
              W.shouldRevalidate) ||
            R.hasClientLoader
              ? (w = !0)
              : B.add(T.route.id));
        }),
        B.size === 0)
      )
        return [];
      let E = ah(l, h, c.unstable_trailingSlashAwareDataRequests, 'data');
      return (
        w &&
          B.size > 0 &&
          E.searchParams.set(
            '_routes',
            n
              .filter((T) => B.has(T.route.id))
              .map((T) => T.route.id)
              .join(',')
          ),
        [E.pathname + E.search]
      );
    }, [h, c.unstable_trailingSlashAwareDataRequests, k, r, d, v, n, l, _]),
    L = C.useMemo(() => W0(y, d), [y, d]),
    b = ny(y);
  return C.createElement(
    C.Fragment,
    null,
    S.map((B) => C.createElement('link', { key: B, rel: 'prefetch', as: 'fetch', href: B, ...o })),
    L.map((B) => C.createElement('link', { key: B, rel: 'modulepreload', href: B, ...o })),
    b.map(({ key: B, link: w }) =>
      C.createElement('link', {
        key: B,
        nonce: o.nonce,
        ...w,
        crossOrigin: w.crossOrigin ?? o.crossOrigin,
      })
    )
  );
}
function oy(...l) {
  return (n) => {
    l.forEach((o) => {
      typeof o == 'function' ? o(n) : o != null && (o.current = n);
    });
  };
}
var uy =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
try {
  uy && (window.__reactRouterVersion = '7.14.2');
} catch {}
function cy({ basename: l, children: n, unstable_useTransitions: o, window: r }) {
  let c = C.useRef();
  c.current == null && (c.current = $v({ window: r, v5Compat: !0 }));
  let d = c.current,
    [_, h] = C.useState({ action: d.action, location: d.location }),
    k = C.useCallback(
      (p) => {
        o === !1 ? h(p) : C.startTransition(() => h(p));
      },
      [o]
    );
  return (
    C.useLayoutEffect(() => d.listen(k), [d, k]),
    C.createElement(z0, {
      basename: l,
      children: n,
      location: _.location,
      navigationType: _.action,
      navigator: d,
      unstable_useTransitions: o,
    })
  );
}
var ih = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  nh = C.forwardRef(function (
    {
      onClick: n,
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
      unstable_defaultShouldRevalidate: L,
      ...b
    },
    B
  ) {
    let { basename: w, navigator: E, unstable_useTransitions: T } = C.useContext(Ht),
      R = typeof v == 'string' && ih.test(v),
      W = Qp(v, w);
    v = W.to;
    let K = S0(v, { relative: c }),
      Y = gl(),
      z = null;
    if (h) {
      let _e = Sr(h, [], Y.unstable_mask ? Y.unstable_mask.pathname : '/', !0);
      (w !== '/' && (_e.pathname = _e.pathname === '/' ? w : sl([w, _e.pathname])),
        (z = E.createHref(_e)));
    }
    let [Q, P, ne] = ay(r, b),
      me = fy(v, {
        replace: _,
        unstable_mask: h,
        state: k,
        target: p,
        preventScrollReset: y,
        relative: c,
        viewTransition: S,
        unstable_defaultShouldRevalidate: L,
        unstable_useTransitions: T,
      });
    function ce(_e) {
      (n && n(_e), _e.defaultPrevented || me(_e));
    }
    let Z = !(W.isExternal || d),
      J = C.createElement('a', {
        ...b,
        ...ne,
        href: (Z ? z : void 0) || W.absoluteURL || K,
        onClick: Z ? ce : n,
        ref: oy(B, P),
        target: p,
        'data-discover': !R && o === 'render' ? 'true' : void 0,
      });
    return Q && !R ? C.createElement(C.Fragment, null, J, C.createElement(iy, { page: K })) : J;
  });
nh.displayName = 'Link';
var dy = C.forwardRef(function (
  {
    'aria-current': n = 'page',
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
  let y = Rn(_, { relative: p.relative }),
    S = gl(),
    L = C.useContext(wr),
    { navigator: b, basename: B } = C.useContext(Ht),
    w = L != null && vy(y) && h === !0,
    E = b.encodeLocation ? b.encodeLocation(y).pathname : y.pathname,
    T = S.pathname,
    R = L && L.navigation && L.navigation.location ? L.navigation.location.pathname : null;
  (o || ((T = T.toLowerCase()), (R = R ? R.toLowerCase() : null), (E = E.toLowerCase())),
    R && B && (R = zl(R, B) || R));
  const W = E !== '/' && E.endsWith('/') ? E.length - 1 : E.length;
  let K = T === E || (!c && T.startsWith(E) && T.charAt(W) === '/'),
    Y = R != null && (R === E || (!c && R.startsWith(E) && R.charAt(E.length) === '/')),
    z = { isActive: K, isPending: Y, isTransitioning: w },
    Q = K ? n : void 0,
    P;
  typeof r == 'function'
    ? (P = r(z))
    : (P = [r, K ? 'active' : null, Y ? 'pending' : null, w ? 'transitioning' : null]
        .filter(Boolean)
        .join(' '));
  let ne = typeof d == 'function' ? d(z) : d;
  return C.createElement(
    nh,
    { ...p, 'aria-current': Q, className: P, ref: v, style: ne, to: _, viewTransition: h },
    typeof k == 'function' ? k(z) : k
  );
});
dy.displayName = 'NavLink';
var my = C.forwardRef(
  (
    {
      discover: l = 'render',
      fetcherKey: n,
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
      ...L
    },
    b
  ) => {
    let { unstable_useTransitions: B } = C.useContext(Ht),
      w = gy(),
      E = ky(h, { relative: p }),
      T = _.toLowerCase() === 'get' ? 'get' : 'post',
      R = typeof h == 'string' && ih.test(h),
      W = (K) => {
        if ((k && k(K), K.defaultPrevented)) return;
        K.preventDefault();
        let Y = K.nativeEvent.submitter,
          z = (Y == null ? void 0 : Y.getAttribute('formmethod')) || _,
          Q = () =>
            w(Y || K.currentTarget, {
              fetcherKey: n,
              method: z,
              navigate: o,
              replace: c,
              state: d,
              relative: p,
              preventScrollReset: v,
              viewTransition: y,
              unstable_defaultShouldRevalidate: S,
            });
        B && o !== !1 ? C.startTransition(() => Q()) : Q();
      };
    return C.createElement('form', {
      ref: b,
      method: T,
      action: E,
      onSubmit: r ? k : W,
      ...L,
      'data-discover': !R && l === 'render' ? 'true' : void 0,
    });
  }
);
my.displayName = 'Form';
function _y(l) {
  return `${l} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function sh(l) {
  let n = C.useContext(Ai);
  return (Ke(n, _y(l)), n);
}
function fy(
  l,
  {
    target: n,
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
  let v = dl(),
    y = gl(),
    S = Rn(l, { relative: _ });
  return C.useCallback(
    (L) => {
      if (X0(L, n)) {
        L.preventDefault();
        let b = o !== void 0 ? o : jn(y) === jn(S),
          B = () =>
            v(l, {
              replace: b,
              unstable_mask: r,
              state: c,
              preventScrollReset: d,
              relative: _,
              viewTransition: h,
              unstable_defaultShouldRevalidate: k,
            });
        p ? C.startTransition(() => B()) : B();
      }
    },
    [y, v, S, o, r, c, n, l, d, _, h, k, p]
  );
}
var py = 0,
  hy = () => `__${String(++py)}__`;
function gy() {
  let { router: l } = sh('useSubmit'),
    { basename: n } = C.useContext(Ht),
    o = O0(),
    r = l.fetch,
    c = l.navigate;
  return C.useCallback(
    async (d, _ = {}) => {
      let { action: h, method: k, encType: p, formData: v, body: y } = K0(d, n);
      if (_.navigate === !1) {
        let S = _.fetcherKey || hy();
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
    [r, c, n, o]
  );
}
function ky(l, { relative: n } = {}) {
  let { basename: o } = C.useContext(Ht),
    r = C.useContext(cl);
  Ke(r, 'useFormAction must be used inside a RouteContext');
  let [c] = r.matches.slice(-1),
    d = { ...Rn(l || '.', { relative: n }) },
    _ = gl();
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
    o !== '/' && (d.pathname = d.pathname === '/' ? o : sl([o, d.pathname])),
    jn(d)
  );
}
function vy(l, { relative: n } = {}) {
  let o = C.useContext(Jp);
  Ke(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: r } = sh('useViewTransitionState'),
    c = Rn(l, { relative: n });
  if (!o.isTransitioning) return !1;
  let d = zl(o.currentLocation.pathname, r) || o.currentLocation.pathname,
    _ = zl(o.nextLocation.pathname, r) || o.nextLocation.pathname;
  return fr(c.pathname, _) != null || fr(c.pathname, d) != null;
}
const yy = '_layout_mn6ug_1',
  by = '_enemies_mn6ug_12',
  xy = '_enemy_mn6ug_20',
  Sy = '_targeted_mn6ug_35',
  wy = '_enemyName_mn6ug_39',
  Ty = '_down_mn6ug_44',
  Ey = '_log_mn6ug_48',
  Cy = '_logLine_mn6ug_60',
  Ny = '_party_mn6ug_64',
  Ay = '_rowTag_mn6ug_71',
  Ly = '_cardRow_mn6ug_77',
  By = '_card_mn6ug_77',
  qy = '_cardActive_mn6ug_99',
  My = '_cardDecided_mn6ug_104',
  jy = '_cardName_mn6ug_108',
  Oy = '_uni_mn6ug_116',
  Dy = '_summons_mn6ug_120',
  Iy = '_summon_mn6ug_120',
  Ry = '_summonName_mn6ug_138',
  zy = '_summonHp_mn6ug_147',
  Uy = '_cardNums_mn6ug_153',
  Hy = '_cardCmd_mn6ug_159',
  Gy = '_empty_mn6ug_165',
  $y = '_command_mn6ug_170',
  Yy = '_skillList_mn6ug_176',
  Xy = '_skillBtn_mn6ug_182',
  Vy = '_skillTop_mn6ug_194',
  Qy = '_skillName_mn6ug_201',
  Ky = '_skillDesc_mn6ug_206',
  Zy = '_target_mn6ug_35',
  Jy = '_unionBanner_mn6ug_217',
  Py = '_unionCancel_mn6ug_231',
  Wy = '_unionHint_mn6ug_240',
  Fy = '_unionBtn_mn6ug_246',
  eb = '_cmdHead_mn6ug_252',
  tb = '_menu_mn6ug_257',
  lb = '_menuBtn_mn6ug_263',
  ab = '_tp_mn6ug_280',
  ib = '_menuBack_mn6ug_286',
  nb = '_execRow_mn6ug_296',
  sb = '_redo_mn6ug_301',
  rb = '_primary_mn6ug_311',
  ob = '_result_mn6ug_326',
  ub = '_resultTitle_mn6ug_337',
  cb = '_resultBody_mn6ug_342',
  te = {
    layout: yy,
    enemies: by,
    enemy: xy,
    targeted: Sy,
    enemyName: wy,
    down: Ty,
    log: Ey,
    logLine: Cy,
    party: Ny,
    rowTag: Ay,
    cardRow: Ly,
    card: By,
    cardActive: qy,
    cardDecided: My,
    cardName: jy,
    uni: Oy,
    summons: Dy,
    summon: Iy,
    summonName: Ry,
    summonHp: zy,
    cardNums: Uy,
    cardCmd: Hy,
    empty: Gy,
    command: $y,
    skillList: Yy,
    skillBtn: Xy,
    skillTop: Vy,
    skillName: Qy,
    skillDesc: Ky,
    target: Zy,
    unionBanner: Jy,
    unionCancel: Py,
    unionHint: Wy,
    unionBtn: Fy,
    cmdHead: eb,
    menu: tb,
    menuBtn: lb,
    tp: ab,
    menuBack: ib,
    execRow: nb,
    redo: sb,
    primary: rb,
    result: ob,
    resultTitle: ub,
    resultBody: cb,
  },
  db = '_row_1t6j7_1',
  mb = '_label_1t6j7_8',
  _b = '_track_1t6j7_16',
  fb = '_fill_1t6j7_24',
  pb = '_value_1t6j7_30',
  An = { row: db, label: mb, track: _b, fill: fb, value: pb },
  ir = ({ value: l, max: n, color: o = '#4caf50', label: r, showValue: c = !0 }) => {
    const d = n > 0 ? Math.max(0, Math.min(100, (l / n) * 100)) : 0;
    return f.jsxs('div', {
      className: An.row,
      children: [
        r ? f.jsx('span', { className: An.label, children: r }) : null,
        f.jsx('div', {
          className: An.track,
          children: f.jsx('div', {
            className: An.fill,
            style: { width: `${d}%`, backgroundColor: o },
          }),
        }),
        c
          ? f.jsxs('span', {
              className: An.value,
              children: [Math.max(0, Math.round(l)), '/', Math.round(n)],
            })
          : null,
      ],
    });
  },
  Dl = {
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
function hb(l) {
  return l.category === 'food' ? 0 : l.category === 'material' ? 8 : Math.floor(l.buyPrice / 2);
}
function gb(l) {
  var n;
  return ((n = Fe[l]) == null ? void 0 : n.category) === 'food';
}
const At = {
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
  Ln = {
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
  Si = {
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
  He = {
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
  kb = 500,
  yc = 30,
  Er = 3,
  Cr = 2,
  vb = Er + Cr,
  Bn = { TITLE_DEPTH: 20, REBIRTH_MIN_LEVEL: 30 },
  rh = 5,
  yb = 5,
  hl = {
    MAX_LEVEL: 5,
    STAT_PER_LEVEL: 2,
    INGOT_INC: { copper: 1, silver: 3, gold: 5 },
    FRAGMENTS_PER_INGOT: 10,
    RECYCLE_FRAGMENTS: 3,
  },
  qn = (l) => l > 0 && l % He.BOSS_INTERVAL === 0,
  kp = (l) => Math.round(He.EXP_CURVE_BASE * Math.pow(l, He.EXP_CURVE_POW)),
  hr = (l) => Math.round(He.SP_PER_LEVEL * Math.max(0, l - 1)),
  bb = (l) => hr(l) - hr(l - 1),
  nc = (l) => l < He.LEVEL_CAP,
  Hc = (l, n) => 1 + He.ENEMY_SCALE_K * (l - n),
  ul = {
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
  st = {
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
  Bi = {
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
  xb = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'],
  Sb = ['slash', 'pierce', 'bash'],
  gr = (l, n, o) => Math.max(n, Math.min(o, l));
function oh(l, n) {
  const o = {};
  for (const r of xb) o[r] = Math.round(l[r] * n);
  return o;
}
function wb(l, n) {
  return oh(l.baseStats, Hc(n, l.refDepth));
}
function vi(l, n) {
  const o = new Map();
  for (const c of l) {
    if (c.stat !== n) continue;
    const d = gr(c.modifier, 0.5, 1.5),
      _ = o.get(c.stackGroup);
    (_ === void 0 || Math.abs(d - 1) > Math.abs(_ - 1)) && o.set(c.stackGroup, d);
  }
  let r = 1;
  for (const c of o.values()) r *= c;
  return gr(r, 0.25, 2);
}
function vp(l, n, o, r) {
  const c = (p) => (r == null ? void 0 : r[p]) ?? 1,
    d = (l.str * 2 + (n.atk ?? 0)) * vi(o, 'patk') * c('patk'),
    _ = (l.vit * 2 + (n.def ?? 0)) * vi(o, 'pdef') * c('pdef'),
    h = (l.int * 2 + (n.mat ?? 0)) * vi(o, 'matk') * c('matk'),
    k = (l.mnd * 2 + (n.mdf ?? 0)) * vi(o, 'mdef') * c('mdef');
  return {
    patk: d,
    pdef: _,
    matk: h,
    mdef: k,
    hit: l.agi,
    acc: l.agi * vi(o, 'acc') * c('acc'),
    eva: l.agi * vi(o, 'eva') * c('eva'),
    crit: l.luc,
  };
}
const Tb = (l) => l.ailments.some((n) => n.type === 'blind'),
  Eb = (l) => l.ailments.some((n) => n.type === 'legBind');
function Cb(l, n, o, r) {
  var z;
  const c = o.statBase === 'str',
    d = vp(l.stats, l.equip, l.buffs, l.passive),
    _ = vp(n.stats, n.equip, n.buffs, n.passive),
    h = c ? d.patk : d.matk,
    k = c ? _.pdef : _.mdef;
  let p = !0;
  if (c) {
    const Q = Tb(l) ? He.BLIND_ACC_PENALTY : 0,
      P = Eb(n) ? 0 : _.eva,
      ne = gr(He.BASE_HIT + (d.acc - P) * He.HIT_AGI_K - Q, He.HIT_MIN, 1);
    p = r.next() < ne;
  }
  if (!p) return { damage: 0, hit: !1, critical: !1 };
  const y = (h * o.power * He.DAMAGE_DEF_K) / (He.DAMAGE_DEF_K + Math.max(0, k)),
    S = c && Sb.includes(o.element),
    L = S && l.row === 'back' ? He.BACK_ROW_MELEE_MULT : 1,
    b = S && n.row === 'back' ? He.BACK_ROW_MELEE_MULT : 1,
    B = L * b,
    [w, E] = He.DMG_VARIANCE,
    T = w + r.next() * (E - w);
  let R = y * o.elementMultiplier * B * T;
  const W = gr(
      He.CRIT_BASE +
        (l.stats.luc - n.stats.luc) * He.CRIT_LUC_K +
        (((z = l.passive) == null ? void 0 : z.crit) ?? 0),
      He.CRIT_MIN,
      He.CRIT_MAX
    ),
    K = r.next() < W;
  return (
    K && (R *= He.CRIT_MULT),
    { damage: o.elementMultiplier === 0 ? 0 : Math.max(1, Math.floor(R)), hit: !0, critical: K }
  );
}
const uh = () => Math.max(0, ...Object.values(ul).map((l) => l.tierBand)),
  ch = (l) => Math.floor((l - 1) / He.BAND_SIZE);
function dh(l) {
  return ch(l) % (uh() + 1);
}
function mh(l) {
  return Math.floor(ch(l) / (uh() + 1)) + 1;
}
function Nb(l) {
  const n = dh(l);
  return Object.values(ul)
    .filter((o) => o.tierBand === n && !o.isBoss && o.kind !== 'foe')
    .map((o) => o.id);
}
function Ab(l, n) {
  const o = Nb(l);
  if (o.length === 0) return [];
  const r = n.range(1, 3);
  return Array.from({ length: r }, () => n.pick(o));
}
function Lb(l, n) {
  const o = st[l];
  if (!o || n <= 0) return {};
  const r = n * hl.STAT_PER_LEVEL;
  return o.slot === 'weapon' ? { atk: r, mat: r } : o.slot === 'armor' ? { def: r, mdf: r } : {};
}
function Ei(l) {
  return 1 + 0.5 * (Math.max(1, l ?? 1) - 1);
}
function _h(l, n) {
  const o = st[l];
  if (!o) return {};
  const r = Ei(n),
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
const fh = ['weapon', 'armor', 'accessory'];
function Bb(l, n, o) {
  const r = l.guild.equipment.map((d) => (d.id === n ? o(d) : d)),
    c = l.guild.members.map((d) => {
      let _ = !1;
      const h = { ...d.equipment };
      for (const k of fh) {
        const p = h[k];
        p && p.id === n && ((h[k] = o(p)), (_ = !0));
      }
      return _ ? { ...d, equipment: h } : d;
    });
  return { ...l, guild: { ...l.guild, equipment: r, members: c } };
}
function qb(l, n, o) {
  let r = l.guild.equipment.find((_) => _.id === n);
  if (!r)
    for (const _ of l.guild.members)
      for (const h of fh) {
        const k = _.equipment[h];
        (k == null ? void 0 : k.id) === n && (r = k);
      }
  if (!r) return { ok: !1, save: l, reason: 'notFound' };
  if (r.forgeLevel >= hl.MAX_LEVEL) return { ok: !1, save: l, reason: 'maxLevel' };
  if ((l.forgeInventory.ingots[o] ?? 0) <= 0) return { ok: !1, save: l, reason: 'noIngot' };
  const c = Math.min(hl.MAX_LEVEL, r.forgeLevel + hl.INGOT_INC[o]);
  let d = {
    ...l,
    forgeInventory: {
      ...l.forgeInventory,
      ingots: { ...l.forgeInventory.ingots, [o]: l.forgeInventory.ingots[o] - 1 },
    },
  };
  return ((d = Bb(d, n, (_) => ({ ..._, forgeLevel: c }))), { ok: !0, save: d });
}
function Mb(l, n) {
  if (!l.guild.equipment.find((_) => _.id === n)) return { ok: !1, save: l, reason: 'notFound' };
  const r = l.guild.equipment.filter((_) => _.id !== n),
    c = { ...l.forgeInventory.fragments };
  c.common = (c.common ?? 0) + hl.RECYCLE_FRAGMENTS;
  let d = l.forgeInventory.ingots.copper;
  for (; c.common >= hl.FRAGMENTS_PER_INGOT; ) ((c.common -= hl.FRAGMENTS_PER_INGOT), (d += 1));
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
  const n = ((r = st[l.masterId]) == null ? void 0 : r.name) ?? l.masterId,
    o = l.grade && l.grade > 1 ? `${n} Lv${l.grade}` : n;
  return l.forgeLevel > 0 ? `${o} +${l.forgeLevel}` : o;
}
const _t = {
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
  ph = (l) => l.grade ?? 1;
function hh(l, n, o) {
  return l.guild.storage
    .filter((r) => r.itemId === n && o === void 0)
    .reduce((r, c) => r + c.qty, 0);
}
function Gc(l, n, o = 1, r = 1) {
  if (o <= 0) return l;
  const c = [...l.guild.storage],
    d = c.findIndex((_) => _.itemId === n && ph(_) === r);
  return (
    d >= 0
      ? (c[d] = { ...c[d], qty: c[d].qty + o })
      : c.push(r > 1 ? { itemId: n, qty: o, grade: r } : { itemId: n, qty: o }),
    { ...l, guild: { ...l.guild, storage: c } }
  );
}
function $c(l, n, o = 1, r = 1) {
  if (o <= 0) return l;
  const c = l.guild.storage.findIndex((h) => h.itemId === n && ph(h) === r);
  if (c < 0 || l.guild.storage[c].qty < o) return l;
  const d = [...l.guild.storage],
    _ = d[c].qty - o;
  return (
    _ <= 0 ? d.splice(c, 1) : (d[c] = { ...d[c], qty: _ }),
    { ...l, guild: { ...l.guild, storage: d } }
  );
}
const gh = 60,
  Nr = (l) => l.guild.foodStorage ?? [];
function kh(l) {
  return Nr(l).reduce((n, o) => n + o.qty, 0);
}
function Yc(l, n) {
  var o;
  return ((o = Nr(l).find((r) => r.itemId === n)) == null ? void 0 : o.qty) ?? 0;
}
function vh(l, n, o = 1) {
  if (o <= 0) return l;
  const r = gh - kh(l),
    c = Math.min(o, Math.max(0, r));
  if (c <= 0) return l;
  const d = [...Nr(l)],
    _ = d.findIndex((h) => h.itemId === n);
  return (
    _ >= 0 ? (d[_] = { ...d[_], qty: d[_].qty + c }) : d.push({ itemId: n, qty: c }),
    { ...l, guild: { ...l.guild, foodStorage: d } }
  );
}
function yh(l, n, o = 1) {
  if (o <= 0) return l;
  const r = [...Nr(l)],
    c = r.findIndex((_) => _.itemId === n);
  if (c < 0 || r[c].qty < o) return l;
  const d = r[c].qty - o;
  return (
    d <= 0 ? r.splice(c, 1) : (r[c] = { ...r[c], qty: d }),
    { ...l, guild: { ...l.guild, foodStorage: r } }
  );
}
function bh(l, n, o) {
  return {
    ...l,
    guild: { ...l.guild, members: l.guild.members.map((r) => (r.id === n ? o(r) : r)) },
  };
}
function jb() {
  return `eq_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function Ob(l, n, o = 0, r = 1) {
  if (!st[n]) return l;
  const c = { id: jb(), masterId: n, forgeLevel: o };
  return (
    r > 1 && (c.grade = r),
    { ...l, guild: { ...l.guild, equipment: [...l.guild.equipment, c] } }
  );
}
function Xc(l, n) {
  const o = st[n];
  if (!o) return !1;
  const r = _t[l.classId];
  return r
    ? o.slot === 'weapon'
      ? !!o.weaponType && r.equipableWeaponTypes.includes(o.weaponType)
      : o.slot === 'armor'
        ? !!o.armorType && r.equipableArmorTypes.includes(o.armorType)
        : !0
    : !1;
}
function Db(l, n, o) {
  const r = l.guild.equipment.find((p) => p.id === o),
    c = l.guild.members.find((p) => p.id === n);
  if (!r || !c || !Xc(c, r.masterId)) return l;
  const d = st[r.masterId];
  let _ = l.guild.equipment.filter((p) => p.id !== o);
  const h = c.equipment[d.slot];
  h && (_ = [..._, h]);
  const k = { ...l, guild: { ...l.guild, equipment: _ } };
  return bh(k, n, (p) => ({ ...p, equipment: { ...p.equipment, [d.slot]: r } }));
}
function Vc(l, n, o) {
  const r = l.guild.members.find((_) => _.id === n);
  if (!r) return l;
  const c = r.equipment[o];
  if (!c) return l;
  const d = { ...l, guild: { ...l.guild, equipment: [...l.guild.equipment, c] } };
  return bh(d, n, (_) => ({ ..._, equipment: { ..._.equipment, [o]: null } }));
}
const bc = {
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
  Ib = ['patk', 'matk', 'pdef', 'mdef', 'acc', 'eva', 'maxHp', 'maxTp'];
function Rb(l) {
  var o;
  const n = l.equipment.weapon;
  if (n) return (o = st[n.masterId]) == null ? void 0 : o.weaponType;
}
function zb(l) {
  const n = Rb(l),
    o = {};
  let r = 0;
  for (const [c, d] of Object.entries(l.learnedSkills)) {
    if (d <= 0) continue;
    const _ = bc[c];
    if (!_ || (_.weaponType && _.weaponType !== n)) continue;
    const h = _.mods(d);
    for (const k of Ib) h[k] !== void 0 && (o[k] = (o[k] ?? 1) * h[k]);
    h.crit !== void 0 && (r += h.crit);
  }
  return (r !== 0 && (o.crit = r), o);
}
const dt = (l) => ({ hp: 0, tp: 0, str: 0, vit: 0, agi: 0, int: 0, mnd: 0, luc: 0, ...l }),
  _a = {
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
      growthModifier: dt({ str: 1 }),
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
      growthModifier: dt({ vit: 1 }),
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
      growthModifier: dt({ vit: 1, hp: 2 }),
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
      growthModifier: dt({ str: 1 }),
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
      growthModifier: dt({ int: 1 }),
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
      growthModifier: dt({ tp: 2, mnd: 1 }),
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
      growthModifier: dt({ agi: 1, luc: 1 }),
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
      growthModifier: dt({ agi: 1 }),
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
      growthModifier: dt({ mnd: 1, tp: 2 }),
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
      growthModifier: dt({ luc: 1, tp: 1 }),
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
      growthModifier: dt({ agi: 1, str: 1 }),
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
      growthModifier: dt({ mnd: 1, tp: 1 }),
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
      growthModifier: dt({ str: 1, agi: 1 }),
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
      growthModifier: dt({ vit: 1, tp: 1 }),
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
      growthModifier: dt({ int: 1 }),
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
      growthModifier: dt({ int: 1, luc: 1 }),
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
      growthModifier: dt({ int: 1, tp: 1 }),
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
      growthModifier: dt({ mnd: 1, vit: 1 }),
    },
  },
  Ub = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];
function zn(l) {
  var h, k;
  const n = At[l.raceId];
  if (!n) throw new Error(`computeBaseStats: 未定義の種族 "${l.raceId}"`);
  const r = Math.max(1, Math.min(l.level, He.LEVEL_CAP)) - 1,
    c = l.titleId ? ((h = _a[l.titleId]) == null ? void 0 : h.growthModifier) : void 0,
    d = ((k = l.rebirthBonus) == null ? void 0 : k.allStats) ?? 0,
    _ = {};
  for (const p of Ub) {
    const v = n.statGrowth[p] + ((c == null ? void 0 : c[p]) ?? 0);
    _[p] = n.baseStatsAtLv1[p] + v * r + d;
  }
  return _;
}
const Hb = 3,
  Rl = (l, n, o) => Math.max(n, Math.min(o, l)),
  Gb = {
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
function $b(l) {
  const n = { atk: 0, mat: 0, def: 0, mdf: 0 };
  for (const o of Object.values(l.equipment)) {
    if (!o || !st[o.masterId]) continue;
    const c = _h(o.masterId, o.grade),
      d = Lb(o.masterId, o.forgeLevel);
    ((n.atk += (c.atk ?? 0) + (d.atk ?? 0)),
      (n.mat += (c.mat ?? 0) + (d.mat ?? 0)),
      (n.def += (c.def ?? 0) + (d.def ?? 0)),
      (n.mdf += (c.mdf ?? 0) + (d.mdf ?? 0)));
  }
  return n;
}
function Yb(l, n) {
  var p;
  const o = l.guild.members.find((v) => v.id === n);
  if (!o) return null;
  const r = (p = l.diveState) == null ? void 0 : p.party.find((v) => v.charId === n),
    c = zn(o),
    d = zb(o),
    _ = Math.round(c.hp * (d.maxHp ?? 1)),
    h = Math.round(c.tp * (d.maxTp ?? 1)),
    k = l.guild.party.front.includes(n);
  return {
    id: n,
    name: o.name,
    side: 'ally',
    row: k ? 'front' : 'back',
    stats: c,
    equip: $b(o),
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
function Xb(l, n, o) {
  const r = ul[l],
    c = wb(r, o),
    d = mh(o);
  return {
    id: `enemy_${n}`,
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
function xh(l, n, o, r, c) {
  const d = Bi[l],
    _ = oh(d.baseStats, Hc(n, d.refDepth)),
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
function yp(l, n, o = 'none') {
  var k, p;
  const r = ((k = l.diveState) == null ? void 0 : k.depth) ?? 1,
    d = [...l.guild.party.front, ...l.guild.party.back]
      .filter((v) => v !== null)
      .map((v) => Yb(l, v))
      .filter((v) => v !== null),
    _ = n.map((v, y) => Xb(v, y, r)),
    h = (((p = l.diveState) == null ? void 0 : p.persistentSummons) ?? [])
      .map((v, y) => xh(v.summonKind, r, v.ownerId, `summon_persist_${y}`, v.hp))
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
const mt = (l, n) => (n === 'ally' ? l.allies : l.enemies).filter((o) => !o.isDown),
  Ar = (l) => l.summons.filter((n) => !n.isDown);
function Il(l, n) {
  return (
    l.allies.find((o) => o.id === n) ??
    l.enemies.find((o) => o.id === n) ??
    l.summons.find((o) => o.id === n)
  );
}
const Qc = (l) => {
    var n;
    return (
      !!l.isSummon && !!l.summonKind && ((n = Bi[l.summonKind]) == null ? void 0 : n.buffImmune)
    );
  },
  Vb = (l, n) => {
    var o;
    return ((o = l.resist) == null ? void 0 : o[n]) ?? 1;
  };
function Sh(l, n, o) {
  ((l.hp = Rl(l.hp - n, 0, l.maxHp)),
    n > 0 &&
      l.ailments.some((r) => r.type === 'sleep') &&
      ((l.ailments = l.ailments.filter((r) => r.type !== 'sleep')),
      o.push({ text: `${l.name} は目を覚ました` })),
    l.hp === 0 &&
      !l.isDown &&
      ((l.isDown = !0),
      (l.unionGauge = Math.floor(l.unionGauge / 2)),
      o.push({ text: `${l.name} は倒れた！` })));
}
function xc(l, n) {
  l.isDown || (l.unionGauge = Rl(l.unionGauge + n, 0, 100));
}
function Sc(l, n) {
  Qc(l) ||
    ((l.buffs = l.buffs.filter((o) => !(o.stat === n.stat && o.stackGroup === n.stackGroup))),
    l.buffs.push(n));
}
function Qb(l, n) {
  if (Qc(l)) return;
  const o = l.ailments.find((r) => r.type === n.type);
  if (o) {
    o.remainingTurns = Math.max(o.remainingTurns, n.remainingTurns);
    return;
  }
  l.ailments.push(n);
}
function nr(l, n) {
  Qc(l) || (l.states = [...(l.states ?? []).filter((o) => o.kind !== n.kind), n]);
}
function Kb(l, n) {
  return n.side === 'ally' ? [...mt(l, 'ally'), ...Ar(l)] : mt(l, 'enemy');
}
function Zb(l, n, o) {
  const r = (l.states ?? []).find((d) => d.kind === 'barrier' && d.absorb > 0);
  if (!r || r.kind !== 'barrier') return n;
  const c = Math.min(r.absorb, n);
  return (
    (r.absorb -= c),
    c > 0 && o.push({ text: `${l.name} は障壁で ${c} のダメージを防いだ` }),
    r.absorb <= 0 && (l.states = (l.states ?? []).filter((d) => d !== r)),
    n - c
  );
}
function vr(l, n, o, r, c, d = {}) {
  if (o.isDown) return { hit: !1, dealt: 0 };
  const _ = Cb(
    n,
    o,
    {
      statBase: r.statBase,
      power: r.power,
      element: r.element,
      elementMultiplier: Vb(o, r.element),
    },
    c
  );
  if (!_.hit) return (l.log.push({ text: `${n.name} の攻撃は外れた` }), { hit: !1, dealt: 0 });
  const h = Zb(o, _.damage, l.log);
  return (
    Sh(o, h, l.log),
    d.actorUnion && xc(n, d.actorUnion),
    xc(o, 5),
    h > 0 &&
      l.log.push({
        text: `${n.name} の攻撃！ ${o.name} に ${h} ダメージ${_.critical ? '（会心）' : ''}`,
      }),
    { hit: !0, dealt: h }
  );
}
function wh(l, n, o, r, c, d) {
  if (!o.isDown && !n.isDown && o.side !== n.side)
    for (const _ of o.states ?? []) {
      if (_.kind !== 'counter' || d.next() >= _.chance) continue;
      l.log.push({ text: `${o.name} の反撃！` });
      const h = _.statBase === 'str' ? 'bash' : 'almighty';
      if ((vr(l, o, n, { statBase: _.statBase, power: _.power, element: h }, d), n.isDown)) break;
    }
  if (c > 0 && o.side !== n.side) {
    for (const _ of Kb(l, n))
      if (!(_.id === n.id || _.isDown || o.isDown))
        for (const h of _.states ?? [])
          h.kind === 'chase' &&
            ((h.element !== r && h.element !== 'almighty' && r !== 'almighty') ||
              (l.log.push({ text: `${_.name} の連携追撃！` }),
              vr(l, _, o, { statBase: h.statBase, power: h.power, element: h.element }, d)));
  }
}
function Jb(l, n, o) {
  return Rl(l * (1 + (n.stats.luc - o.stats.luc) * He.AILMENT_LUC_K), 0, He.AILMENT_MAX);
}
function Th(l, n, o, r) {
  const c = n.side === 'ally' ? 'enemy' : 'ally';
  switch (o) {
    case 'self':
      return [n];
    case 'allyAll':
      return n.side === 'ally' ? [...mt(l, 'ally'), ...Ar(l)] : mt(l, 'enemy');
    case 'allyOne': {
      const d = Il(l, r);
      return d && d.side === n.side ? [d] : [n];
    }
    case 'enemyAll':
      return mt(l, c);
    case 'enemyRow':
    case 'enemyOne':
    default: {
      const d = Il(l, r);
      return d && d.side === c && !d.isDown ? [d] : mt(l, c).slice(0, 1);
    }
  }
}
function Pb(l, n, o, r) {
  return Th(l, n, o.target, r);
}
function Eh(l, n, o, r, c, d, _) {
  switch (o.kind) {
    case 'damage': {
      const h = o.hits ?? 1,
        k = o.power(c);
      for (const p of d) {
        if (p.isDown) continue;
        let v = !1,
          y = 0;
        for (let S = 0; S < h && !p.isDown; S++) {
          const L = vr(l, n, p, { statBase: o.statBase, power: k, element: r }, _);
          L.hit && ((v = !0), (y += L.dealt));
        }
        v && wh(l, n, p, r, y, _);
      }
      break;
    }
    case 'heal': {
      const h = o.amount(c);
      for (const k of d) k.isDown || (k.hp = Rl(k.hp + h, 0, k.maxHp));
      l.log.push({ text: `${n.name} は回復魔法を使った（+${h}）` });
      break;
    }
    case 'buff': {
      for (const h of d)
        Sc(h, {
          stat: o.stat,
          modifier: o.modifier(c),
          remainingTurns: o.turns,
          stackGroup: o.stackGroup,
        });
      l.log.push({ text: `${n.name} は態勢を整えた` });
      break;
    }
    case 'ailment': {
      for (const h of d) {
        if (h.isDown) continue;
        const k = Jb(o.chance(c), n, h);
        _.next() < k &&
          (Qb(h, { type: o.ailment, remainingTurns: o.turns, magnitude: o.magnitude }),
          l.log.push({ text: `${h.name} は${Gb[o.ailment]}になった` }));
      }
      break;
    }
    case 'summon': {
      if (n.side !== 'ally') break;
      if (Ar(l).length >= Hb) {
        l.log.push({ text: 'これ以上は召喚できない' });
        break;
      }
      const h = `summon_${l.turn}_${l.summons.length}`,
        k = xh(o.summonKind, l.depth, n.id, h);
      (l.summons.push(k), l.log.push({ text: `${n.name} は ${k.name} を召喚した！` }));
      break;
    }
    case 'counter': {
      for (const h of d)
        h.isDown ||
          nr(h, {
            kind: 'counter',
            chance: o.chance(c),
            power: o.power(c),
            statBase: o.statBase,
            remainingTurns: o.turns,
          });
      l.log.push({ text: `${n.name} は反撃の構えを取った` });
      break;
    }
    case 'chase': {
      for (const h of d)
        h.isDown ||
          nr(h, {
            kind: 'chase',
            element: r,
            power: o.power(c),
            statBase: o.statBase,
            remainingTurns: o.turns,
          });
      l.log.push({ text: `${n.name} は連携の構えを取った` });
      break;
    }
    case 'decoy': {
      for (const h of d)
        h.isDown || nr(h, { kind: 'decoy', weight: o.weight(c), remainingTurns: o.turns });
      l.log.push({ text: `${n.name} は敵の注意を引きつけた` });
      break;
    }
    case 'barrier': {
      for (const h of d)
        h.isDown || nr(h, { kind: 'barrier', absorb: o.absorb(c), remainingTurns: o.turns });
      l.log.push({ text: `${n.name} は守りの障壁を張った` });
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
function sc(l, n, o, r) {
  var _;
  if (o.isDown) return;
  const c = n.enemyId
      ? (ul[n.enemyId].attackElement ?? 'bash')
      : n.isSummon && n.summonKind
        ? (((_ = Bi[n.summonKind]) == null ? void 0 : _.attackElement) ?? 'bash')
        : 'bash',
    d = vr(l, n, o, { statBase: 'str', power: 1, element: c }, r, { actorUnion: 5 });
  d.hit && wh(l, n, o, c, d.dealt, r);
}
const bp = (l) => (l.length === 0 ? 0 : l.reduce((n, o) => n + o.stats.agi, 0) / l.length);
function Wb(l, n) {
  const o = l.map(
      (d) => 1 + (d.states ?? []).reduce((_, h) => _ + (h.kind === 'decoy' ? h.weight : 0), 0)
    ),
    r = o.reduce((d, _) => d + _, 0);
  let c = n.next() * r;
  for (let d = 0; d < l.length; d++) if (((c -= o[d]), c < 0)) return l[d];
  return l[l.length - 1];
}
const Fb = (l) => l.ailments.some((n) => n.type === 'paralysis'),
  e1 = (l) => l.ailments.some((n) => n.type === 'sleep'),
  Kc = (l, n) => l.ailments.some((o) => o.type === n),
  rc = (l) => Kc(l, 'armBind'),
  t1 = (l) => Kc(l, 'headBind'),
  l1 = (l) => Kc(l, 'legBind');
function xp(l) {
  return l.effects.some((n) => n.kind === 'damage' && n.statBase === 'str');
}
function a1(l, n, o) {
  const r = Si[n.unionSkillId];
  if (!r) return;
  const c = Il(l, n.actorId);
  if (!c || c.isDown || c.side !== 'ally') return;
  if (c.unionGauge < 100) {
    l.log.push({ text: `${c.name} はユニオンゲージが足りない` });
    return;
  }
  const d = new Set(n.participantIds);
  d.add(c.id);
  const _ = [...d].map((v) => Il(l, v)).filter((v) => !!v && !v.isDown && v.side === 'ally');
  if (_.length < r.requiredParticipants) {
    l.log.push({ text: `${c.name} の${r.name}は参加人数が足りない` });
    return;
  }
  const h = [c, ..._.filter((v) => v.id !== c.id)].slice(0, r.requiredParticipants);
  for (const v of h) v.unionGauge = Rl(v.unionGauge - r.gaugeCostPerParticipant, 0, 100);
  l.log.push({ text: `ユニオン！ ${c.name} の${r.name}！` });
  const k = 1,
    p = Th(l, c, r.target, n.targetId);
  for (const v of r.effects) Eh(l, c, v, r.element, k, p, o);
}
function oc(l, n, o) {
  var y, S, L;
  if (l.outcome !== 'ongoing') return l;
  const r = structuredClone({ ...l, log: [] }),
    c = new Map(n.filter((b) => b.kind !== 'union').map((b) => [b.actorId, b])),
    d = r.turn === 1 && r.firstStrike !== 'none',
    _ = d && r.firstStrike === 'preemptive',
    h = d && r.firstStrike === 'ambush';
  if (
    (_ && r.log.push({ text: '先制攻撃！ 味方が先手を取った' }),
    h && r.log.push({ text: '不意打ち！ 敵に先手を取られた' }),
    !h)
  )
    for (const b of n) b.kind === 'union' && a1(r, b, o);
  const k = n.find((b) => b.kind === 'flee');
  if (!h && k && r.outcome === 'ongoing') {
    const b = Il(r, k.actorId);
    if (b && l1(b)) r.log.push({ text: `${b.name} は脚を封じられて逃げられない` });
    else {
      const B = Rl(0.5 + (bp(mt(r, 'ally')) - bp(mt(r, 'enemy'))) * 0.02, 0.1, 0.95);
      if (o.next() < B)
        return (r.log.push({ text: 'うまく逃げ切れた！' }), (r.outcome = 'fled'), r);
      r.log.push({ text: '逃げられなかった！' });
    }
  }
  if (!h)
    for (const b of n) {
      if (b.kind !== 'guard') continue;
      const B = Il(r, b.actorId);
      !B ||
        B.isDown ||
        (Sc(B, { stat: 'pdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }),
        Sc(B, { stat: 'mdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }));
    }
  const p = new Map();
  if (!_)
    for (const b of mt(r, 'enemy')) {
      const B = [...Ar(r), ...mt(r, 'ally')];
      B.length > 0 && p.set(b.id, Wb(B, o).id);
    }
  const v = [...r.allies, ...r.enemies, ...r.summons]
    .filter((b) => !b.isDown)
    .filter((b) => !(_ && b.side === 'enemy') && !(h && b.side === 'ally'))
    .map((b) => ({ c: b, agi: b.stats.agi, tie: o.next() }))
    .sort((b, B) => B.agi - b.agi || B.tie - b.tie)
    .map((b) => b.c);
  for (const b of v)
    if (!b.isDown) {
      if (r.outcome !== 'ongoing') break;
      if (e1(b)) {
        r.log.push({ text: `${b.name} は眠っている` });
        continue;
      }
      if (Fb(b) && o.next() < He.PARALYSIS_SKIP) {
        r.log.push({ text: `${b.name} は麻痺で動けない` });
        continue;
      }
      if (b.isSummon) {
        const B = b.summonKind ? Bi[b.summonKind] : void 0;
        if (B != null && B.actsOnTurn) {
          const w = mt(r, 'enemy');
          w.length > 0 && sc(r, b, o.pick(w), o);
        }
        if (mt(r, 'enemy').length === 0) break;
        continue;
      }
      if (b.side === 'enemy') {
        if (rc(b)) {
          r.log.push({ text: `${b.name} は腕を封じられて攻撃できない` });
          continue;
        }
        const B = p.get(b.id),
          w = B ? Il(r, B) : void 0,
          E = w && !w.isDown ? w : mt(r, 'ally')[0];
        E && sc(r, b, E, o);
      } else {
        const B = c.get(b.id);
        if (!B || B.kind === 'guard' || B.kind === 'flee') continue;
        if (B.kind === 'attack') {
          if (rc(b)) {
            r.log.push({ text: `${b.name} は腕を封じられて攻撃できない` });
            continue;
          }
          const w = Il(r, B.targetId),
            E = w && !w.isDown ? w : mt(r, 'enemy')[0];
          E && sc(r, b, E, o);
        } else if (B.kind === 'skill') {
          const w = Dl[B.skillId];
          if (!w) continue;
          if (xp(w) && rc(b)) {
            r.log.push({ text: `${b.name} は腕を封じられてスキルを使えない` });
            continue;
          }
          if (!xp(w) && t1(b)) {
            r.log.push({ text: `${b.name} は頭を封じられてスキルを使えない` });
            continue;
          }
          const E = 1,
            T = w.tpCost(E);
          if (b.tp < T) {
            r.log.push({ text: `${b.name} は TP が足りない` });
            continue;
          }
          ((b.tp -= T), xc(b, 10));
          const R = Pb(r, b, w, B.targetId);
          for (const W of w.effects) Eh(r, b, W, w.element, E, R, o);
        } else if (B.kind === 'item') {
          const w = Fe[B.itemId];
          if (!w || !((y = w.useContext) != null && y.includes('battle'))) continue;
          const E = Il(r, B.targetId) ?? b;
          for (const T of w.effects ?? [])
            T.kind === 'heal'
              ? (E.hp = Rl(E.hp + T.amount(1), 0, E.maxHp))
              : T.kind === 'restoreTp' && (E.tp = Rl(E.tp + T.amount(1), 0, E.maxTp));
          (r.consumedItems.push(B.itemId), r.log.push({ text: `${b.name} は ${w.name} を使った` }));
        }
      }
      if (mt(r, 'enemy').length === 0 || mt(r, 'ally').length === 0) break;
    }
  for (const b of [...r.allies, ...r.enemies, ...r.summons]) {
    if (b.isDown) continue;
    const B = b.ailments.find((w) => w.type === 'poison');
    if (B) {
      const w = B.magnitude ?? Math.max(1, Math.floor(b.maxHp * He.POISON_HP_RATIO));
      (Sh(b, w, r.log), r.log.push({ text: `${b.name} は毒で ${w} のダメージ` }));
    }
  }
  for (const b of [...r.allies, ...r.enemies, ...r.summons])
    (!b.isDown &&
      b.maxTp > 0 &&
      (b.tp = Math.min(b.maxTp, b.tp + Math.ceil(b.maxTp * He.TP_REGEN_RATIO))),
      (b.buffs = b.buffs
        .map((B) => ({ ...B, remainingTurns: B.remainingTurns - 1 }))
        .filter((B) => B.remainingTurns > 0)),
      (b.ailments = b.ailments
        .map((B) => ({ ...B, remainingTurns: B.remainingTurns - 1 }))
        .filter((B) => B.remainingTurns > 0)),
      b.states &&
        b.states.length > 0 &&
        (b.states = b.states
          .map((B) => ({ ...B, remainingTurns: B.remainingTurns - 1 }))
          .filter((B) => B.remainingTurns > 0)));
  for (const b of r.enemies)
    if (
      !(
        !b.isDown ||
        !b.enemyId ||
        (((S = l.enemies.find((w) => w.id === b.id)) == null ? void 0 : S.isDown) ?? !1)
      )
    )
      for (const w of ul[b.enemyId].drops ?? [])
        o.next() < w.rate &&
          (r.drops.push({ enemyId: b.enemyId, itemId: w.itemId }),
          r.log.push({
            text: `${b.name} は ${((L = Fe[w.itemId]) == null ? void 0 : L.name) ?? w.itemId} を落とした`,
          }));
  return (
    (r.summons = r.summons.filter((b) => !b.isDown)),
    (r.turn += 1),
    mt(r, 'enemy').length === 0
      ? (r.outcome = 'win')
      : mt(r, 'ally').length === 0 && (r.outcome = 'lose'),
    r
  );
}
function Ch(l) {
  let n = 0,
    o = 0;
  for (const r of l.enemies) {
    if (!r.enemyId) continue;
    const c = ul[r.enemyId],
      d = Hc(l.depth, c.refDepth);
    ((n += Math.round(c.exp * d)), (o += Math.round(c.gold * d)));
  }
  return { exp: n, gold: o };
}
function i1(l, n) {
  let o = l.level,
    r = l.exp + (nc(o) ? n : 0),
    c = l.skillPoints.total;
  for (; nc(o) && r >= kp(o); ) ((r -= kp(o)), (o += 1), (c += bb(o)));
  return {
    ...l,
    level: o,
    exp: nc(l.level) ? r : l.exp,
    skillPoints: { ...l.skillPoints, total: c },
  };
}
function Sp(l, n) {
  if (!l.diveState) return l;
  const o = n.outcome === 'win',
    r = n.outcome === 'win' || n.outcome === 'fled',
    c = new Map(n.allies.map((L) => [L.id, L])),
    d = l.diveState.party.map((L) => {
      const b = c.get(L.charId);
      if (!b) return L;
      let B = b.unionGauge;
      return (
        r && !b.isDown && (B = Rl(B + He.UNION_GAIN_ON_WIN, 0, 100)),
        { ...L, hp: b.hp, tp: b.tp, unionGauge: B, ailments: b.ailments }
      );
    });
  let _ = l.guild.members,
    h = l.guild.gold;
  const k = { ...l.bestiary.monsters };
  for (const L of n.enemies) {
    if (!L.enemyId) continue;
    const b = k[L.enemyId] ?? { seen: !1, defeated: !1, dropsFound: [] };
    k[L.enemyId] = { ...b, seen: !0, defeated: b.defeated || L.isDown };
  }
  if (o)
    for (const L of n.drops) {
      const b = k[L.enemyId];
      b &&
        !b.dropsFound.includes(L.itemId) &&
        (k[L.enemyId] = { ...b, dropsFound: [...b.dropsFound, L.itemId] });
    }
  const p = { ...l.bestiary, monsters: k };
  if (o) {
    const { exp: L, gold: b } = Ch(n);
    h += b;
    const B = new Set(d.map((E) => E.charId)),
      w = B.size > 0 ? Math.floor(L / B.size) : 0;
    _ = _.map((E) => (B.has(E.id) ? i1(E, w) : E));
  }
  const v = n.summons
    .filter((L) => {
      var b;
      return (
        !L.isDown &&
        L.summonKind &&
        ((b = Bi[L.summonKind]) == null ? void 0 : b.persistsAfterBattle)
      );
    })
    .map((L) => ({ summonKind: L.summonKind, ownerId: L.ownerId ?? '', hp: L.hp }));
  let y = {
    ...l,
    guild: { ...l.guild, members: _, gold: h, bestiary: p },
    bestiary: p,
    diveState: { ...l.diveState, party: d, persistentSummons: v },
  };
  for (const L of n.consumedItems) y = $c(y, L, 1);
  const S = mh(n.depth);
  if (o) for (const L of n.drops) y = Gc(y, L.itemId, 1, S);
  return y;
}
const n1 = 8,
  wc = 16,
  Mn = 5;
function Zc(l) {
  return l.range(n1, wc);
}
function s1(l, n) {
  const o = l - 1;
  return o <= 0
    ? { stepsUntilEncounter: Zc(n), triggered: !0 }
    : { stepsUntilEncounter: o, triggered: !1 };
}
function r1(l) {
  const n = Math.max(0, wc - l),
    o = Math.round((n / wc) * Mn);
  return Math.min(Mn, Math.max(0, o));
}
const el = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  Ci = ['N', 'E', 'S', 'W'];
function Nh(l) {
  return Ci[(Ci.indexOf(l) + 1) % 4];
}
function Ah(l) {
  return Ci[(Ci.indexOf(l) + 3) % 4];
}
function o1(l) {
  return Ci[(Ci.indexOf(l) + 2) % 4];
}
const u1 = (l, n, o) => l >= 0 && n >= 0 && l < o.width && n < o.height;
function wi(l, n, o, r) {
  if (l.cells[o][n].walls[r]) return !1;
  const c = n + el[r].dx,
    d = o + el[r].dy;
  return u1(c, d, l) ? l.cells[d][c].passable : !1;
}
function c1(l, n, o) {
  return wi(l, n.x, n.y, o) ? { x: n.x + el[o].dx, y: n.y + el[o].dy } : null;
}
function Jc(l, n, o) {
  return ['N', 'E', 'S', 'W'].filter((r) => !l.cells[o][n].walls[r]);
}
const wp = ['N', 'E', 'S', 'W'],
  uc = (l, n) => Math.abs(l.x - n.x) + Math.abs(l.y - n.y);
function d1(l, n, o, r, c) {
  const d = n.map((v) => ({ ...v, cell: { ...v.cell } })),
    _ = new Map(l.foeSpawns.map((v) => [v.id, v])),
    h = new Set(d.filter((v) => !v.defeated).map((v) => `${v.cell.x},${v.cell.y}`));
  let k = null;
  const p = [...d].sort((v, y) => v.spawnId.localeCompare(y.spawnId, void 0, { numeric: !0 }));
  for (const v of p) {
    if (k) break;
    if (v.defeated) continue;
    const y = _.get(v.spawnId);
    if (!y) continue;
    !v.alerted && uc(v.cell, o) <= y.sightRange && (v.alerted = !0);
    const S = (L) => {
      if (!wi(l, v.cell.x, v.cell.y, L)) return 'blocked';
      const b = v.cell.x + el[L].dx,
        B = v.cell.y + el[L].dy;
      if (b === o.x && B === o.y) {
        const w = L === r;
        return (
          (k = { spawnId: v.spawnId, enemyId: y.enemyId, firstStrike: w ? 'ambush' : 'none' }),
          'contact'
        );
      }
      return h.has(`${b},${B}`)
        ? 'blocked'
        : (h.delete(`${v.cell.x},${v.cell.y}`),
          (v.cell = { x: b, y: B }),
          h.add(`${b},${B}`),
          'moved');
    };
    if (v.alerted)
      for (let L = 0; L < y.moveSpeed; L++) {
        let b = null,
          B = uc(v.cell, o),
          w = !1;
        for (const T of wp) {
          const R = v.cell.x + el[T].dx,
            W = v.cell.y + el[T].dy;
          if (R === o.x && W === o.y && wi(l, v.cell.x, v.cell.y, T)) {
            ((b = T), (w = !0));
            break;
          }
          if (!wi(l, v.cell.x, v.cell.y, T) || h.has(`${R},${W}`)) continue;
          const K = uc({ x: R, y: W }, o);
          K < B && ((B = K), (b = T));
        }
        if (!b) break;
        const E = S(b);
        if (E === 'contact' || E === 'blocked' || w) break;
      }
    else {
      const L = y.patrol;
      if (L.kind === 'wander') {
        const b = wp.filter(
          (B) =>
            wi(l, v.cell.x, v.cell.y, B) && !h.has(`${v.cell.x + el[B].dx},${v.cell.y + el[B].dy}`)
        );
        b.length > 0 && S(c.pick(b));
      } else L.kind === 'charge' && S(L.dir);
    }
  }
  return { foes: d, contact: k };
}
const qa = {
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
  m1 = Object.keys(qa);
function _1(l) {
  const n = Object.values(ul)
    .filter((o) => o.tierBand === l && o.kind === 'foe')
    .map((o) => o.id);
  return n.length > 0
    ? n
    : Object.values(ul)
        .filter((o) => o.tierBand === l && !o.isBoss && o.kind !== 'foe')
        .map((o) => o.id);
}
function f1(l) {
  const n = Object.values(ul).filter((r) => r.isBoss);
  if (n.length === 0) return null;
  const o = n.filter((r) => r.tierBand === l);
  return o.length > 0 ? o[0].id : n.sort((r, c) => c.tierBand - r.tierBand)[0].id;
}
function p1(l, n, o, r, c) {
  for (const d of ['N', 'E', 'S', 'W']) {
    if (l[o][n].walls[d]) continue;
    const _ = n + nl[d].dx,
      h = o + nl[d].dy;
    if (yr(_, h, r, c) && !l[h][_].event) return { x: _, y: h };
  }
  return null;
}
const nl = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  h1 = { N: 'S', E: 'W', S: 'N', W: 'E' };
function g1(l) {
  return Math.min(25, 15 + Math.floor(l / 5));
}
function k1() {
  return { walls: { N: !0, E: !0, S: !0, W: !0 }, floorType: 'normal', passable: !0 };
}
const yr = (l, n, o, r) => l >= 0 && n >= 0 && l < o && n < r;
function Tp(l, n, o, r) {
  const { dx: c, dy: d } = nl[r];
  ((l[o][n].walls[r] = !1), (l[o + d][n + c].walls[h1[r]] = !1));
}
function v1(l, n, o) {
  const r = l.length,
    c = l[0].length,
    d = Array.from({ length: r }, () => Array(c).fill(-1)),
    _ = [{ x: n, y: o }];
  d[o][n] = 0;
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
function y1(l, n) {
  const o = g1(l),
    r = o,
    c = o,
    d = Array.from({ length: c }, () => Array.from({ length: r }, () => k1())),
    _ = Array.from({ length: c }, () => Array(r).fill(!1)),
    h = n.int(r),
    k = n.int(c),
    p = [{ x: h, y: k }];
  for (_[k][h] = !0; p.length > 0; ) {
    const Y = p[p.length - 1],
      z = [];
    for (const me of ['N', 'E', 'S', 'W']) {
      const ce = Y.x + nl[me].dx,
        Z = Y.y + nl[me].dy;
      yr(ce, Z, r, c) && !_[Z][ce] && z.push(me);
    }
    if (z.length === 0) {
      p.pop();
      continue;
    }
    const Q = n.pick(z);
    Tp(d, Y.x, Y.y, Q);
    const P = Y.x + nl[Q].dx,
      ne = Y.y + nl[Q].dy;
    ((_[ne][P] = !0), p.push({ x: P, y: ne }));
  }
  const v = Math.floor((r * c) / 25);
  for (let Y = 0; Y < v; Y++) {
    const z = n.int(r),
      Q = n.int(c),
      P = n.pick(['N', 'E', 'S', 'W']),
      ne = z + nl[P].dx,
      me = Q + nl[P].dy;
    yr(ne, me, r, c) && d[Q][z].walls[P] && Tp(d, z, Q, P);
  }
  const y = n.int(r),
    S = n.int(c),
    L = v1(d, y, S);
  let b = y,
    B = S,
    w = -1;
  for (let Y = 0; Y < c; Y++)
    for (let z = 0; z < r; z++) L[Y][z] > w && ((w = L[Y][z]), (b = z), (B = Y));
  ((d[S][y].event = { kind: 'stairsDown' }), (d[B][b].event = { kind: 'stairsUp' }));
  const E = dh(l),
    T = [];
  if (qn(l)) {
    const Y = f1(E);
    if (Y) {
      const z = p1(d, b, B, r, c) ?? { x: b, y: B };
      T.push({
        id: 'boss',
        enemyId: Y,
        startCell: z,
        patrol: { kind: 'static' },
        moveSpeed: 0,
        sightRange: 0,
        respawn: !1,
        isBoss: !0,
      });
    }
  } else {
    const Y = _1(E),
      z = 1 + Math.floor(l / 8);
    for (let Q = 0; Q < z && Y.length > 0; Q++) {
      let P = n.int(r),
        ne = n.int(c);
      for (let me = 0; me < 20; me++) {
        ((P = n.int(r)), (ne = n.int(c)));
        const ce = d[ne][P].event,
          Z = Math.abs(P - y) + Math.abs(ne - S) >= 3;
        if (!ce && Z) break;
      }
      T.push({
        id: `foe_${Q}`,
        enemyId: n.pick(Y),
        startCell: { x: P, y: ne },
        patrol: { kind: 'wander' },
        moveSpeed: 1,
        sightRange: 3,
        respawn: !1,
      });
    }
  }
  const R = [],
    W = () => {
      for (let Y = 0; Y < 25; Y++) {
        const z = n.int(r),
          Q = n.int(c),
          P = Math.abs(z - y) + Math.abs(Q - S) >= 2;
        if (!d[Q][z].event && P) return { x: z, y: Q };
      }
      return null;
    },
    K = 2 + Math.floor(l / 10);
  for (let Y = 0; Y < K; Y++) {
    const z = W();
    if (!z) break;
    const Q = n.pick(m1),
      P = `gather_${Y}`;
    ((d[z.y][z.x].event = { kind: 'gather', gatherId: P }), R.push({ id: P, cell: z, type: Q }));
  }
  if (!qn(l)) {
    const Y = W();
    Y && (d[Y.y][Y.x].event = { kind: 'cookingSpot', spotId: 'cook_0' });
  }
  return {
    depth: l,
    width: r,
    height: c,
    cells: d,
    encounterTable: `band_${E}`,
    foeSpawns: T,
    gatheringPoints: R,
    bgmId: qn(l) ? 'bgm_boss' : 'bgm_dungeon',
  };
}
function Lh(l, n) {
  var o;
  for (let r = 0; r < l.height; r++)
    for (let c = 0; c < l.width; c++)
      if (((o = l.cells[r][c].event) == null ? void 0 : o.kind) === n) return { x: c, y: r };
  return null;
}
const b1 = 4294967296;
function x1(l, n) {
  let o = 3735928559 ^ l,
    r = 1103547991 ^ l;
  for (let c = 0; c < n.length; c++) {
    const d = n.charCodeAt(c);
    ((o = Math.imul(o ^ d, 2654435761)), (r = Math.imul(r ^ d, 1597334677)));
  }
  return (
    (o = Math.imul(o ^ (o >>> 16), 2246822507) ^ Math.imul(r ^ (r >>> 13), 3266489909)),
    (r = Math.imul(r ^ (r >>> 16), 2246822507) ^ Math.imul(o ^ (o >>> 13), 3266489909)),
    (r >>> 0) ^ (o >>> 0)
  );
}
class Pc {
  constructor(n, o) {
    Zu(this, 'baseSeed');
    Zu(this, '_state');
    ((this._state = n >>> 0), (this.baseSeed = (o ?? n) >>> 0));
  }
  get state() {
    return this._state;
  }
  next() {
    this._state = (this._state + 1831565813) >>> 0;
    let n = this._state;
    return (
      (n = Math.imul(n ^ (n >>> 15), n | 1)),
      (n ^= n + Math.imul(n ^ (n >>> 7), n | 61)),
      ((n ^ (n >>> 14)) >>> 0) / b1
    );
  }
  int(n) {
    return n <= 0 ? 0 : Math.floor(this.next() * n);
  }
  range(n, o) {
    o < n && ([n, o] = [o, n]);
    const r = o - n + 1;
    return n + this.int(r);
  }
  pick(n) {
    if (n.length === 0) throw new Error('Rng.pick: 空配列は選択できません');
    return n[this.int(n.length)];
  }
  fork(n) {
    const o = x1(this.baseSeed, n);
    return new Pc(o, o);
  }
}
function ja(l) {
  return new Pc(l, l);
}
function S1() {
  return Math.floor(Math.random() * 4294967296) >>> 0;
}
const br = (l, n) => `${l},${n}`;
function w1(l, n) {
  return ja(l).fork(`floor:${n}`);
}
function Bh(l, n) {
  const o = l.towerState.floors[n];
  if (o) return { save: l, floor: o };
  const r = y1(n, w1(l.masterSeed, n)),
    c = r.foeSpawns.map((h) => ({
      spawnId: h.id,
      cell: { ...h.startCell },
      defeated: !1,
      alerted: !1,
    })),
    d = {
      depth: n,
      seed: l.masterSeed,
      generated: r,
      isBossFloor: qn(n),
      encounterTier: Math.floor((n - 1) / 10),
      foeRuntime: c,
      openedChests: [],
      depletedGathers: [],
      consumedEvents: [],
    };
  return {
    save: { ...l, towerState: { ...l.towerState, floors: { ...l.towerState.floors, [n]: d } } },
    floor: d,
  };
}
function T1(l) {
  const n = [...l.guild.party.front, ...l.guild.party.back].filter((r) => r !== null),
    o = [];
  for (const r of n) {
    const c = l.guild.members.find((_) => _.id === r);
    if (!c) continue;
    const d = zn(c);
    o.push({ charId: r, hp: d.hp, tp: d.tp, unionGauge: 0, ailments: [] });
  }
  return o;
}
function xr(l, n, o, r) {
  const c = l.towerState.floors[n].generated,
    d = new Set(l.exploredCells[n] ?? []);
  d.add(br(o, r));
  for (const _ of Jc(c, o, r)) {
    const h = o + (_ === 'E' ? 1 : _ === 'W' ? -1 : 0),
      k = r + (_ === 'S' ? 1 : _ === 'N' ? -1 : 0);
    d.add(br(h, k));
  }
  return { ...l, exploredCells: { ...l.exploredCells, [n]: [...d] } };
}
function qh(l, n, o) {
  var k, p;
  const r = Bh(l, n);
  let c = r.save;
  const d = r.floor.generated,
    _ = Lh(d, 'stairsDown') ?? { x: 0, y: 0 },
    h = Jc(d, _.x, _.y)[0] ?? 'N';
  return (
    n > c.towerState.record.deepestReached &&
      (c = {
        ...c,
        towerState: { ...c.towerState, record: { ...c.towerState.record, deepestReached: n } },
      }),
    (c = {
      ...c,
      diveState: {
        depth: n,
        pos: { x: _.x, y: _.y },
        dir: h,
        party: ((k = c.diveState) == null ? void 0 : k.party) ?? T1(c),
        persistentSummons: ((p = c.diveState) == null ? void 0 : p.persistentSummons) ?? [],
        encounter: { stepsUntilEncounter: Zc(o) },
        pendingFoeBattle: null,
      },
    }),
    xr(c, n, _.x, _.y)
  );
}
function Ep(l, n = 1) {
  const o = ja(l.masterSeed).fork(`dive:${l.towerState.record.totalDives}`),
    r = {
      ...l,
      diveState: null,
      towerState: {
        ...l.towerState,
        record: { ...l.towerState.record, totalDives: l.towerState.record.totalDives + 1 },
      },
    };
  return qh(r, n, o);
}
function Mh(l, n) {
  return l.diveState ? { ...l, diveState: { ...l.diveState, dir: n } } : l;
}
function jh(l, n, o) {
  const r = l.towerState.floors[n];
  return {
    ...l,
    towerState: {
      ...l.towerState,
      floors: { ...l.towerState.floors, [n]: { ...r, foeRuntime: o } },
    },
  };
}
function E1(l, n, o) {
  const r = l.diveState;
  if (!r) return { save: l, moved: !1, triggered: !1 };
  const c = l.towerState.floors[r.depth],
    d = c.generated,
    _ = c1(d, r.pos, n);
  if (!_) return { save: Mh(l, n), moved: !1, triggered: !1 };
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
    let L = { ...l, diveState: { ...r, pos: _, dir: n, pendingFoeBattle: S } };
    return ((L = xr(L, r.depth, _.x, _.y)), { save: L, moved: !0, triggered: S !== null });
  }
  const k = s1(r.encounter.stepsUntilEncounter, o);
  let p = {
    ...l,
    diveState: {
      ...r,
      pos: _,
      dir: n,
      encounter: { stepsUntilEncounter: k.stepsUntilEncounter },
      pendingFoeBattle: null,
    },
  };
  p = xr(p, r.depth, _.x, _.y);
  const v = d1(d, c.foeRuntime, _, n, o);
  return (
    (p = jh(p, r.depth, v.foes)),
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
function C1(l, n) {
  const o = l.diveState;
  if (!o) return l;
  const r = o.pendingFoeBattle;
  let c = { ...l, diveState: { ...o, pendingFoeBattle: null } };
  if (r && n) {
    const _ = c.towerState.floors[o.depth].foeRuntime.map((h) =>
      h.spawnId === r.spawnId ? { ...h, defeated: !0 } : h
    );
    ((c = jh(c, o.depth, _)), r.isBoss && (c = N1(c, o.depth)));
  }
  return c;
}
function N1(l, n, o = Date.now()) {
  const r = l.towerState,
    c = { ...r.bossGates, [n]: { depth: n, defeated: !0 } },
    d = r.warp.unlockedCheckpoints.includes(n)
      ? r.warp.unlockedCheckpoints
      : [...r.warp.unlockedCheckpoints, n].sort((k, p) => k - p),
    _ = r.record.bossDefeatLog.some((k) => k.depth === n),
    h = {
      ...r.record,
      highestBossDefeated: Math.max(r.record.highestBossDefeated, n),
      bossDefeatLog: _ ? r.record.bossDefeatLog : [...r.record.bossDefeatLog, { depth: n, at: o }],
    };
  return {
    ...l,
    towerState: { ...r, bossGates: c, warp: { ...r.warp, unlockedCheckpoints: d }, record: h },
  };
}
function Oh(l, n) {
  var o;
  return qn(n) ? ((o = l.towerState.bossGates[n]) == null ? void 0 : o.defeated) === !0 : !0;
}
function Cp(l) {
  const n = l.diveState;
  if (!n) return null;
  const o = l.towerState.floors[n.depth].generated.cells[n.pos.y][n.pos.x].event;
  return (o == null ? void 0 : o.kind) === 'stairsUp' ||
    (o == null ? void 0 : o.kind) === 'stairsDown'
    ? o.kind
    : null;
}
function A1(l) {
  if (!l.diveState || !Oh(l, l.diveState.depth)) return l;
  const n = l.diveState.depth + 1,
    o = ja(l.masterSeed).fork(`enc:${n}:${l.towerState.record.totalDives}`);
  return qh(l, n, o);
}
function L1(l) {
  if (!l.diveState) return l;
  const n = l.diveState.depth;
  if (n <= 1) return On(l);
  const o = n - 1,
    r = Bh(l, o),
    c = Lh(r.floor.generated, 'stairsUp') ?? { x: 0, y: 0 },
    d = ja(l.masterSeed).fork(`enc:${o}:${l.towerState.record.totalDives}`);
  let _ = r.save;
  const h = r.floor.generated,
    k = Jc(h, c.x, c.y)[0] ?? 'N';
  return (
    (_ = {
      ..._,
      diveState: {
        ..._.diveState,
        depth: o,
        pos: { x: c.x, y: c.y },
        dir: k,
        encounter: { stepsUntilEncounter: Zc(d) },
        pendingFoeBattle: null,
      },
    }),
    xr(_, o, c.x, c.y)
  );
}
function On(l) {
  return { ...l, diveState: null };
}
const qi = {
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
function B1() {
  return Object.values(qi)
    .filter((l) => l.unlockedByDefault)
    .map((l) => l.id);
}
const _r = 2,
  q1 = { autoMap: 'on', bgmVolume: 0.6, seVolume: 0.6 };
function Np() {
  return { monsters: {}, items: {} };
}
function M1() {
  return { deepestReached: 0, highestBossDefeated: 0, totalDives: 0, bossDefeatLog: [] };
}
const j1 = () => ({ weapon: null, armor: null, accessory: null });
function O1() {
  return `char_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function Dh(l) {
  var h;
  const { raceId: n, classId: o, name: r, id: c } = l;
  if (!At[n]) throw new Error(`createCharacter: 未定義の種族 "${n}"`);
  if (!_t[o]) throw new Error(`createCharacter: 未定義の職業 "${o}"`);
  const d = (h = _t[o].skillTree.skills[0]) == null ? void 0 : h.skillId,
    _ = d ? { [d]: 1 } : {};
  return {
    id: c ?? O1(),
    name: r,
    raceId: n,
    classId: o,
    titleId: null,
    level: 1,
    exp: 0,
    skillPoints: { total: 0, spent: 0 },
    learnedSkills: _,
    equipment: j1(),
  };
}
function D1() {
  return { front: Array(Er).fill(null), back: Array(Cr).fill(null) };
}
function I1(l, n) {
  const o = l.front.indexOf(null);
  if (o !== -1) {
    const c = [...l.front];
    return ((c[o] = n), { ...l, front: c });
  }
  const r = l.back.indexOf(null);
  if (r !== -1) {
    const c = [...l.back];
    return ((c[r] = n), { ...l, back: c });
  }
  return l;
}
function R1(l, n) {
  return l.guild.members.length >= yc
    ? l
    : {
        ...l,
        guild: { ...l.guild, members: [...l.guild.members, n], party: I1(l.guild.party, n.id) },
      };
}
function z1(l) {
  return {
    schemaVersion: _r,
    savedAt: 0,
    masterSeed: S1(),
    settings: { ...q1 },
    guild: {
      name: l,
      gold: kb,
      members: [],
      party: D1(),
      storage: [],
      equipment: [],
      foodStorage: [],
      bestiary: Np(),
    },
    towerState: { floors: {}, bossGates: {}, warp: { unlockedCheckpoints: [] }, record: M1() },
    diveState: null,
    bestiary: Np(),
    playerMaps: {},
    exploredCells: {},
    forgeInventory: { fragments: {}, ingots: { copper: 0, silver: 0, gold: 0 } },
    shopStock: { unlockedTier: 0, unlockedItemIds: [] },
    unlockedRecipeIds: B1(),
    flags: {},
  };
}
const Tc = (l, n) => n.some((o) => l instanceof o);
let Ap, Lp;
function U1() {
  return Ap || (Ap = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function H1() {
  return (
    Lp ||
    (Lp = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const Ec = new WeakMap(),
  cc = new WeakMap(),
  Lr = new WeakMap();
function G1(l) {
  const n = new Promise((o, r) => {
    const c = () => {
        (l.removeEventListener('success', d), l.removeEventListener('error', _));
      },
      d = () => {
        (o(Ma(l.result)), c());
      },
      _ = () => {
        (r(l.error), c());
      };
    (l.addEventListener('success', d), l.addEventListener('error', _));
  });
  return (Lr.set(n, l), n);
}
function $1(l) {
  if (Ec.has(l)) return;
  const n = new Promise((o, r) => {
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
  Ec.set(l, n);
}
let Cc = {
  get(l, n, o) {
    if (l instanceof IDBTransaction) {
      if (n === 'done') return Ec.get(l);
      if (n === 'store')
        return o.objectStoreNames[1] ? void 0 : o.objectStore(o.objectStoreNames[0]);
    }
    return Ma(l[n]);
  },
  set(l, n, o) {
    return ((l[n] = o), !0);
  },
  has(l, n) {
    return l instanceof IDBTransaction && (n === 'done' || n === 'store') ? !0 : n in l;
  },
};
function Ih(l) {
  Cc = l(Cc);
}
function Y1(l) {
  return H1().includes(l)
    ? function (...n) {
        return (l.apply(Nc(this), n), Ma(this.request));
      }
    : function (...n) {
        return Ma(l.apply(Nc(this), n));
      };
}
function X1(l) {
  return typeof l == 'function'
    ? Y1(l)
    : (l instanceof IDBTransaction && $1(l), Tc(l, U1()) ? new Proxy(l, Cc) : l);
}
function Ma(l) {
  if (l instanceof IDBRequest) return G1(l);
  if (cc.has(l)) return cc.get(l);
  const n = X1(l);
  return (n !== l && (cc.set(l, n), Lr.set(n, l)), n);
}
const Nc = (l) => Lr.get(l);
function V1(l, n, { blocked: o, upgrade: r, blocking: c, terminated: d } = {}) {
  const _ = indexedDB.open(l, n),
    h = Ma(_);
  return (
    r &&
      _.addEventListener('upgradeneeded', (k) => {
        r(Ma(_.result), k.oldVersion, k.newVersion, Ma(_.transaction), k);
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
const Q1 = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  K1 = ['put', 'add', 'delete', 'clear'],
  dc = new Map();
function Bp(l, n) {
  if (!(l instanceof IDBDatabase && !(n in l) && typeof n == 'string')) return;
  if (dc.get(n)) return dc.get(n);
  const o = n.replace(/FromIndex$/, ''),
    r = n !== o,
    c = K1.includes(o);
  if (!(o in (r ? IDBIndex : IDBObjectStore).prototype) || !(c || Q1.includes(o))) return;
  const d = async function (_, ...h) {
    const k = this.transaction(_, c ? 'readwrite' : 'readonly');
    let p = k.store;
    return (r && (p = p.index(h.shift())), (await Promise.all([p[o](...h), c && k.done]))[0]);
  };
  return (dc.set(n, d), d);
}
Ih((l) => ({
  ...l,
  get: (n, o, r) => Bp(n, o) || l.get(n, o, r),
  has: (n, o) => !!Bp(n, o) || l.has(n, o),
}));
const Z1 = ['continue', 'continuePrimaryKey', 'advance'],
  qp = {},
  Ac = new WeakMap(),
  Rh = new WeakMap(),
  J1 = {
    get(l, n) {
      if (!Z1.includes(n)) return l[n];
      let o = qp[n];
      return (
        o ||
          (o = qp[n] =
            function (...r) {
              Ac.set(this, Rh.get(this)[n](...r));
            }),
        o
      );
    },
  };
async function* P1(...l) {
  let n = this;
  if ((n instanceof IDBCursor || (n = await n.openCursor(...l)), !n)) return;
  n = n;
  const o = new Proxy(n, J1);
  for (Rh.set(o, n), Lr.set(o, Nc(n)); n; )
    (yield o, (n = await (Ac.get(o) || n.continue())), Ac.delete(o));
}
function Mp(l, n) {
  return (
    (n === Symbol.asyncIterator && Tc(l, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (n === 'iterate' && Tc(l, [IDBIndex, IDBObjectStore]))
  );
}
Ih((l) => ({
  ...l,
  get(n, o, r) {
    return Mp(n, o) ? P1 : l.get(n, o, r);
  },
  has(n, o) {
    return Mp(n, o) || l.has(n, o);
  },
}));
const W1 = { 1: (l) => F1(l) },
  mc = (l) => typeof l == 'object' && l !== null && !Array.isArray(l);
function F1(l) {
  const n = { ...l, schemaVersion: 2 };
  let o = 0;
  const r = (d) => ({ id: `eq_mig_${Date.now().toString(36)}_${o++}`, masterId: d, forgeLevel: 0 }),
    c = mc(n.guild) ? { ...n.guild } : {};
  return (
    Array.isArray(c.equipment) || (c.equipment = []),
    Array.isArray(c.foodStorage) || (c.foodStorage = []),
    Array.isArray(c.members) &&
      (c.members = c.members.map((d) => {
        if (!mc(d)) return d;
        const _ = mc(d.equipment) ? { ...d.equipment } : {};
        for (const h of ['weapon', 'armor', 'accessory']) {
          const k = _[h];
          _[h] = typeof k == 'string' ? r(k) : (k ?? null);
        }
        return { ...d, equipment: _ };
      })),
    (n.guild = c),
    Array.isArray(n.unlockedRecipeIds) || (n.unlockedRecipeIds = []),
    n
  );
}
function ex(l) {
  return structuredClone(l);
}
function xi(l) {
  return typeof l == 'object' && l !== null && !Array.isArray(l);
}
function tx(l) {
  if (
    !xi(l) ||
    typeof l.schemaVersion != 'number' ||
    typeof l.masterSeed != 'number' ||
    !xi(l.guild)
  )
    return !1;
  const n = l.guild;
  return !(
    typeof n.name != 'string' ||
    !Array.isArray(n.members) ||
    !Array.isArray(n.equipment) ||
    !xi(l.forgeInventory) ||
    !xi(l.towerState) ||
    !xi(l.towerState.record) ||
    typeof l.towerState.record.deepestReached != 'number'
  );
}
function zh(l) {
  if (!xi(l) || typeof l.schemaVersion != 'number')
    return { ok: !1, reason: 'セーブデータの構造が不正です' };
  let n = l.schemaVersion;
  if (n > _r) return { ok: !1, reason: `未知のバージョン (${n} > ${_r}) のセーブデータです` };
  let o = { ...l };
  for (; n < _r; ) {
    const r = W1[n];
    if (!r) return { ok: !1, reason: `バージョン ${n} の migration が未定義です` };
    ((o = r(o)), (n = typeof o.schemaVersion == 'number' ? o.schemaVersion : n + 1));
  }
  return tx(o)
    ? { ok: !0, data: o }
    : { ok: !1, reason: 'migration 後のデータが SaveData の形をしていません' };
}
function lx(l) {
  return {
    guildName: l.guild.name,
    deepestReached: l.towerState.record.deepestReached,
    memberCount: l.guild.members.length,
    savedAt: l.savedAt,
  };
}
function jp() {
  return {
    guildName: '(破損データ)',
    deepestReached: 0,
    memberCount: 0,
    savedAt: 0,
    corrupted: !0,
  };
}
const ax = 'sekaiju-like-game',
  ix = 1,
  Dn = 'saves',
  Wc = 'main';
let _c = null;
function Fc() {
  return (
    _c ||
      (_c = V1(ax, ix, {
        upgrade(l) {
          l.objectStoreNames.contains(Dn) || l.createObjectStore(Dn);
        },
      })),
    _c
  );
}
async function fc(l) {
  const n = { ...l, savedAt: Date.now() };
  return (await (await Fc()).put(Dn, ex(n), Wc), n);
}
async function nx() {
  const n = await (await Fc()).get(Dn, Wc);
  return n === void 0 ? { ok: !1, reason: 'empty' } : zh(n);
}
async function sx() {
  const n = await (await Fc()).get(Dn, Wc);
  if (n === void 0) return null;
  const o = zh(n);
  if (!o.ok) return jp();
  try {
    return lx(o.data);
  } catch {
    return jp();
  }
}
const Uh = { save: null, saving: !1 };
function rx(l, n) {
  switch (n.type) {
    case 'load':
      return { ...l, save: n.save };
    case 'updateSave':
      return l.save ? { ...l, save: n.updater(l.save) } : l;
    case 'setSave':
      return { ...l, save: n.save };
    case 'saving':
      return { ...l, saving: n.saving };
    case 'clear':
      return { ...Uh };
  }
}
const Hh = C.createContext(null);
function ox(l) {
  const n = C.useRef(l);
  return ((n.current = l), n);
}
function ux({ children: l }) {
  const [n, o] = C.useReducer(rx, Uh),
    r = ox(n),
    c = C.useCallback(async (y) => {
      const S = z1(y),
        L = await fc(S);
      o({ type: 'load', save: L });
    }, []),
    d = C.useCallback(async () => {
      const y = await nx();
      return y.ok ? (o({ type: 'load', save: y.data }), { ok: !0 }) : { ok: !1, reason: y.reason };
    }, []),
    _ = C.useCallback((y) => {
      o({ type: 'updateSave', updater: y });
    }, []),
    h = C.useCallback(
      async (y) => {
        const S = r.current.save;
        if (!S) return;
        const L = y(S);
        (o({ type: 'setSave', save: L }), o({ type: 'saving', saving: !0 }));
        try {
          const b = await fc(L);
          o({ type: 'setSave', save: b });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      },
      [r]
    ),
    k = C.useCallback(async () => {
      const { save: y } = r.current;
      if (y) {
        o({ type: 'saving', saving: !0 });
        try {
          const S = await fc(y);
          o({ type: 'setSave', save: S });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      }
    }, [r]),
    p = C.useCallback(() => {
      o({ type: 'clear' });
    }, []),
    v = C.useMemo(
      () => ({
        ...n,
        startNewGame: c,
        continueGame: d,
        applySave: _,
        applyAndPersist: h,
        persist: k,
        exitToTitle: p,
      }),
      [n, c, d, _, h, k, p]
    );
  return f.jsx(Hh.Provider, { value: v, children: l });
}
function Ul() {
  const l = C.useContext(Hh);
  if (!l) throw new Error('useGameState は GameStateProvider の内側で使ってください');
  return l;
}
const cx = () => {
    var ot, Ve;
    const l = dl(),
      { save: n, applyAndPersist: o } = Ul(),
      r = C.useRef(null),
      [c, d] = C.useState(null),
      [_, h] = C.useState({}),
      [k, p] = C.useState(null),
      [v, y] = C.useState(!1),
      [S, L] = C.useState(!1),
      [b, B] = C.useState(null),
      [w, E] = C.useState(!1),
      [T, R] = C.useState(null),
      [W, K] = C.useState(null);
    C.useEffect(() => {
      if (c || !(n != null && n.diveState)) return;
      const G = n.diveState.depth,
        re = (n.masterSeed ^ (G * 2654435761) ^ (n.towerState.record.totalDives * 40503)) >>> 0;
      r.current = ja(re);
      const fe = n.diveState.pendingFoeBattle;
      d(fe ? yp(n, [fe.enemyId], fe.firstStrike) : yp(n, Ab(G, r.current)));
    }, [n, c]);
    const Y = C.useRef(!1);
    C.useEffect(() => {
      !c ||
        !r.current ||
        Y.current ||
        (c.turn === 1 &&
          c.firstStrike === 'ambush' &&
          c.outcome === 'ongoing' &&
          ((Y.current = !0), d(oc(c, [], r.current))));
    }, [c]);
    const z = C.useMemo(() => (c == null ? void 0 : c.enemies.filter((G) => !G.isDown)) ?? [], [c]),
      Q = C.useMemo(() => (c == null ? void 0 : c.allies.filter((G) => !G.isDown)) ?? [], [c]);
    (C.useEffect(() => {
      z.length > 0 && !z.some((G) => G.id === b) && B(z[0].id);
    }, [z, b]),
      C.useEffect(() => {
        if ((c == null ? void 0 : c.outcome) !== 'ongoing' || (k && Q.some((re) => re.id === k)))
          return;
        const G = Q.find((re) => !_[re.id]) ?? null;
        p(G ? G.id : null);
      }, [c, Q, k, _]));
    const P = Q.length > 0 && Q.every((G) => _[G.id] !== void 0),
      ne = C.useCallback(
        (G, re) => {
          const fe = { ..._, [G]: re };
          (h(fe), y(!1), L(!1));
          const Be = Q.find((we) => we.id !== G && !fe[we.id]);
          p(Be ? Be.id : null);
        },
        [_, Q]
      ),
      me = C.useCallback(
        async (G) => {
          E(!0);
          const re = G.outcome === 'win';
          G.outcome === 'lose'
            ? (await o((fe) => On(Sp(fe, G))), l('/town'))
            : (await o((fe) => C1(Sp(fe, G), re)), l('/dungeon'));
        },
        [o, l]
      ),
      ce = C.useCallback(() => {
        var G;
        (h({}), y(!1), L(!1), R(null), K(null), p(((G = Q[0]) == null ? void 0 : G.id) ?? null));
      }, [Q]),
      Z = C.useCallback(() => {
        var Be;
        if (!c || !r.current || c.outcome !== 'ongoing') return;
        const G = b ?? ((Be = z[0]) == null ? void 0 : Be.id) ?? '',
          re = Q.map((we) => {
            const bt = _[we.id] ?? { kind: 'attack' };
            return bt.kind === 'guard'
              ? { kind: 'guard', actorId: we.id }
              : bt.kind === 'skill'
                ? { kind: 'skill', actorId: we.id, skillId: bt.skillId, targetId: G }
                : bt.kind === 'item'
                  ? { kind: 'item', actorId: we.id, itemId: bt.itemId, targetId: we.id }
                  : { kind: 'attack', actorId: we.id, targetId: G };
          });
        if (T) {
          const we = Si[T.unionSkillId],
            bt =
              (we == null ? void 0 : we.target) === 'enemyOne' ||
              (we == null ? void 0 : we.target) === 'enemyRow' ||
              (we == null ? void 0 : we.target) === 'enemyAll';
          re.unshift({ kind: 'union', ...T, targetId: bt ? G : T.targetId });
        }
        const fe = oc(c, re, r.current);
        (d(fe), h({}), y(!1), L(!1), R(null), K(null), p(null));
      }, [c, _, b, Q, z, T]),
      J = C.useCallback(() => {
        if (!c || !r.current || c.outcome !== 'ongoing') return;
        const G = Q[0];
        G && (d(oc(c, [{ kind: 'flee', actorId: G.id }], r.current)), h({}), p(null));
      }, [c, Q]);
    if (!n || !n.diveState) return f.jsx(ol, { to: '/town', replace: !0 });
    if (!c) return f.jsx('div', { className: te.layout, children: '戦闘準備中...' });
    const _e = (G) => {
        const re = n.guild.members.find((fe) => fe.id === G.id);
        return re
          ? Object.keys(re.learnedSkills).filter((fe) => fe in Dl && G.tp >= Dl[fe].tpCost(1))
          : [];
      },
      q = () => {
        const G = (fe) =>
            Object.values(_).filter((Be) => Be.kind === 'item' && Be.itemId === fe).length,
          re = (fe) => c.consumedItems.filter((Be) => Be === fe).length;
        return n.guild.storage
          .filter((fe) => {
            var Be, we;
            return (we = (Be = Fe[fe.itemId]) == null ? void 0 : Be.useContext) == null
              ? void 0
              : we.includes('battle');
          })
          .map((fe) => ({
            id: fe.itemId,
            remaining: hh(n, fe.itemId) - re(fe.itemId) - G(fe.itemId),
          }))
          .filter((fe) => fe.remaining > 0);
      },
      V = (G) => {
        var fe, Be;
        const re = _[G.id];
        return re
          ? re.kind === 'attack'
            ? '攻撃'
            : re.kind === 'guard'
              ? '防御'
              : re.kind === 'item'
                ? (((fe = Fe[re.itemId]) == null ? void 0 : fe.name) ?? 'どうぐ')
                : (((Be = Dl[re.skillId]) == null ? void 0 : Be.name) ?? 'スキル')
          : '';
      },
      ee = (G) => {
        const re = (Be) => Be === 'headBind' || Be === 'armBind' || Be === 'legBind';
        let fe = '';
        return (
          G.ailments.some((Be) => re(Be.type)) && (fe += ' 🔒'),
          G.ailments.some((Be) => !re(Be.type)) && (fe += ' 🌀'),
          fe
        );
      },
      de = (G) => {
        var Be;
        const re = n.guild.members.find((we) => we.id === G.id);
        if (!re) return null;
        const fe =
          (Be = At[re.raceId]) == null
            ? void 0
            : Be.raceSkillTree.skills.find((we) => we.skillId in Si);
        return !fe || !(fe.skillId in re.learnedSkills) ? null : (Si[fe.skillId] ?? null);
      },
      ve = (G, re, fe) => {
        var bt;
        const we =
          re.target === 'enemyOne' || re.target === 'enemyRow' || re.target === 'enemyAll'
            ? (b ?? ((bt = z[0]) == null ? void 0 : bt.id) ?? '')
            : G;
        (R({ actorId: G, unionSkillId: re.id, participantIds: fe, targetId: we }), K(null));
      },
      A = (G, re) => {
        re.requiredParticipants <= 1 ? ve(G.id, re, [G.id]) : K({ actorId: G.id, def: re });
      },
      H = k ? Q.find((G) => G.id === k) : void 0,
      F = ((ot = c.enemies.find((G) => G.id === b)) == null ? void 0 : ot.name) ?? '-',
      le = Ch(c),
      he = (G) =>
        f.jsxs(
          'button',
          {
            type: 'button',
            className: [
              te.card,
              G.isDown ? te.down : '',
              k === G.id ? te.cardActive : '',
              _[G.id] ? te.cardDecided : '',
            ].join(' '),
            disabled: G.isDown || c.outcome !== 'ongoing',
            onClick: () => {
              (p(G.id), y(!1), L(!1));
            },
            children: [
              f.jsxs('div', {
                className: te.cardName,
                children: [
                  G.name,
                  G.unionGauge >= 100 ? f.jsx('span', { className: te.uni, children: '★' }) : null,
                  ee(G),
                ],
              }),
              f.jsx(ir, { value: G.hp, max: G.maxHp, color: '#4caf50', showValue: !1 }),
              f.jsx(ir, { value: G.tp, max: G.maxTp, color: '#2196f3', showValue: !1 }),
              f.jsxs('div', {
                className: te.cardNums,
                children: ['HP ', Math.max(0, G.hp), ' · TP ', G.tp],
              }),
              _[G.id] ? f.jsxs('div', { className: te.cardCmd, children: ['▶ ', V(G)] }) : null,
            ],
          },
          G.id
        ),
      be = c.allies.filter((G) => G.row === 'front'),
      Ne = c.allies.filter((G) => G.row === 'back');
    return f.jsxs('div', {
      className: te.layout,
      children: [
        f.jsx('div', {
          className: te.enemies,
          children: c.enemies.map((G) =>
            f.jsxs(
              'button',
              {
                type: 'button',
                className: `${te.enemy} ${G.isDown ? te.down : ''} ${b === G.id ? te.targeted : ''}`,
                disabled: G.isDown,
                onClick: () => B(G.id),
                children: [
                  f.jsxs('span', { className: te.enemyName, children: [G.name, ee(G)] }),
                  f.jsx(ir, { value: G.hp, max: G.maxHp, color: '#e57373', showValue: !1 }),
                ],
              },
              G.id
            )
          ),
        }),
        c.summons.length > 0
          ? f.jsx('div', {
              className: te.summons,
              children: c.summons.map((G) =>
                f.jsxs(
                  'div',
                  {
                    className: `${te.summon} ${G.isDown ? te.down : ''}`,
                    children: [
                      f.jsxs('span', { className: te.summonName, children: ['🐾 ', G.name] }),
                      f.jsx(ir, { value: G.hp, max: G.maxHp, color: '#8d6e63', showValue: !1 }),
                      f.jsxs('span', {
                        className: te.summonHp,
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
          className: te.party,
          children: [
            f.jsx('div', { className: te.rowTag, children: '前衛' }),
            f.jsx('div', { className: te.cardRow, children: be.map(he) }),
            f.jsx('div', { className: te.rowTag, children: '後衛（近接ダメージ -30%）' }),
            f.jsx('div', {
              className: te.cardRow,
              children:
                Ne.length > 0
                  ? Ne.map(he)
                  : f.jsx('div', { className: te.empty, children: '（なし）' }),
            }),
          ],
        }),
        c.outcome !== 'ongoing'
          ? f.jsxs('div', {
              className: te.result,
              children: [
                f.jsx('div', {
                  className: te.resultTitle,
                  children:
                    c.outcome === 'win' ? '勝利！' : c.outcome === 'fled' ? '逃走した' : '全滅...',
                }),
                c.outcome === 'win'
                  ? f.jsxs('div', {
                      className: te.resultBody,
                      children: ['経験値 ', le.exp, ' ／ ', le.gold, ' G を獲得'],
                    })
                  : c.outcome === 'lose'
                    ? f.jsx('div', { className: te.resultBody, children: '拠点へ帰還する' })
                    : null,
                f.jsx('button', {
                  type: 'button',
                  className: te.primary,
                  disabled: w,
                  onClick: () => void me(c),
                  children: 'つづける',
                }),
              ],
            })
          : f.jsxs('div', {
              className: te.command,
              children: [
                f.jsxs('div', {
                  className: te.target,
                  children: ['対象: ', F, '（敵をタップで変更）'],
                }),
                T
                  ? f.jsxs('div', {
                      className: te.unionBanner,
                      children: [
                        '⚡ ユニオン予約: ',
                        (Ve = Si[T.unionSkillId]) == null ? void 0 : Ve.name,
                        f.jsx('button', {
                          type: 'button',
                          className: te.unionCancel,
                          onClick: () => R(null),
                          children: '取消',
                        }),
                      ],
                    })
                  : null,
                H
                  ? f.jsxs(f.Fragment, {
                      children: [
                        f.jsxs('div', { className: te.cmdHead, children: [H.name, ' のコマンド'] }),
                        v
                          ? f.jsxs('div', {
                              className: te.skillList,
                              children: [
                                _e(H).map((G) => {
                                  var re;
                                  return f.jsxs(
                                    'button',
                                    {
                                      type: 'button',
                                      className: te.skillBtn,
                                      onClick: () => ne(H.id, { kind: 'skill', skillId: G }),
                                      children: [
                                        f.jsxs('span', {
                                          className: te.skillTop,
                                          children: [
                                            f.jsx('span', {
                                              className: te.skillName,
                                              children: Dl[G].name,
                                            }),
                                            f.jsxs('span', {
                                              className: te.tp,
                                              children: ['TP ', Dl[G].tpCost(1)],
                                            }),
                                          ],
                                        }),
                                        f.jsx('span', {
                                          className: te.skillDesc,
                                          children:
                                            ((re = Ln[G]) == null ? void 0 : re.description) ?? '',
                                        }),
                                      ],
                                    },
                                    G
                                  );
                                }),
                                _e(H).length === 0
                                  ? f.jsx('div', {
                                      className: te.empty,
                                      children: '使えるスキルがない',
                                    })
                                  : null,
                                f.jsx('button', {
                                  type: 'button',
                                  className: te.menuBack,
                                  onClick: () => y(!1),
                                  children: 'もどる',
                                }),
                              ],
                            })
                          : S
                            ? f.jsxs('div', {
                                className: te.skillList,
                                children: [
                                  q().map(({ id: G, remaining: re }) =>
                                    f.jsxs(
                                      'button',
                                      {
                                        type: 'button',
                                        className: te.skillBtn,
                                        onClick: () => ne(H.id, { kind: 'item', itemId: G }),
                                        children: [
                                          f.jsx('span', {
                                            className: te.skillTop,
                                            children: f.jsxs('span', {
                                              className: te.skillName,
                                              children: [Fe[G].name, ' ×', re],
                                            }),
                                          }),
                                          f.jsx('span', {
                                            className: te.skillDesc,
                                            children: Fe[G].description,
                                          }),
                                        ],
                                      },
                                      G
                                    )
                                  ),
                                  q().length === 0
                                    ? f.jsx('div', {
                                        className: te.empty,
                                        children: '使える道具がない',
                                      })
                                    : null,
                                  f.jsx('button', {
                                    type: 'button',
                                    className: te.menuBack,
                                    onClick: () => L(!1),
                                    children: 'もどる',
                                  }),
                                ],
                              })
                            : W
                              ? f.jsxs('div', {
                                  className: te.skillList,
                                  children: [
                                    f.jsxs('div', {
                                      className: te.unionHint,
                                      children: [
                                        W.def.name,
                                        '：協力者を選択（あと',
                                        W.def.requiredParticipants - 1,
                                        '人。各自ゲージ',
                                        W.def.gaugeCostPerParticipant,
                                        '消費）',
                                      ],
                                    }),
                                    Q.filter((G) => G.id !== W.actorId).map((G) =>
                                      f.jsx(
                                        'button',
                                        {
                                          type: 'button',
                                          className: te.skillBtn,
                                          onClick: () => ve(W.actorId, W.def, [W.actorId, G.id]),
                                          children: f.jsxs('span', {
                                            className: te.skillTop,
                                            children: [
                                              f.jsx('span', {
                                                className: te.skillName,
                                                children: G.name,
                                              }),
                                              f.jsxs('span', {
                                                className: te.tp,
                                                children: ['ゲージ ', G.unionGauge],
                                              }),
                                            ],
                                          }),
                                        },
                                        G.id
                                      )
                                    ),
                                    Q.filter((G) => G.id !== W.actorId).length === 0
                                      ? f.jsx('div', {
                                          className: te.empty,
                                          children: '協力できる味方がいない',
                                        })
                                      : null,
                                    f.jsx('button', {
                                      type: 'button',
                                      className: te.menuBack,
                                      onClick: () => K(null),
                                      children: 'もどる',
                                    }),
                                  ],
                                })
                              : f.jsxs('div', {
                                  className: te.menu,
                                  children: [
                                    f.jsx('button', {
                                      type: 'button',
                                      className: te.menuBtn,
                                      onClick: () => ne(H.id, { kind: 'attack' }),
                                      children: '攻撃',
                                    }),
                                    f.jsx('button', {
                                      type: 'button',
                                      className: te.menuBtn,
                                      onClick: () => ne(H.id, { kind: 'guard' }),
                                      children: '防御',
                                    }),
                                    f.jsx('button', {
                                      type: 'button',
                                      className: te.menuBtn,
                                      disabled: _e(H).length === 0,
                                      onClick: () => y(!0),
                                      children: 'スキル',
                                    }),
                                    f.jsx('button', {
                                      type: 'button',
                                      className: te.menuBtn,
                                      disabled: q().length === 0,
                                      onClick: () => L(!0),
                                      children: 'どうぐ',
                                    }),
                                    (() => {
                                      const G = de(H);
                                      return !G || H.unionGauge < 100 || T
                                        ? null
                                        : f.jsx('button', {
                                            type: 'button',
                                            className: `${te.menuBtn} ${te.unionBtn}`,
                                            onClick: () => A(H, G),
                                            children: '⚡ユニオン',
                                          });
                                    })(),
                                    f.jsx('button', {
                                      type: 'button',
                                      className: te.menuBtn,
                                      onClick: J,
                                      children: '逃走',
                                    }),
                                  ],
                                }),
                      ],
                    })
                  : f.jsxs('div', {
                      className: te.execRow,
                      children: [
                        f.jsx('button', {
                          type: 'button',
                          className: te.redo,
                          onClick: ce,
                          children: 'やり直す',
                        }),
                        f.jsx('button', {
                          type: 'button',
                          className: te.primary,
                          disabled: !P,
                          onClick: Z,
                          children: '実行',
                        }),
                      ],
                    }),
              ],
            }),
        f.jsx('div', {
          className: te.log,
          children:
            c.log.length === 0
              ? f.jsxs('div', {
                  className: te.logLine,
                  children: ['てきが あらわれた！（', c.turn, ' ターン目）'],
                })
              : c.log.map((G, re) => f.jsx('div', { className: te.logLine, children: G.text }, re)),
        }),
      ],
    });
  },
  dx = '_layout_iunlg_1',
  mx = '_head_iunlg_11',
  _x = '_title_iunlg_15',
  fx = '_tabs_iunlg_21',
  px = '_tab_iunlg_21',
  hx = '_tabActive_iunlg_38',
  gx = '_records_iunlg_43',
  kx = '_statBig_iunlg_48',
  vx = '_statNum_iunlg_60',
  yx = '_statLabel_iunlg_67',
  bx = '_statList_iunlg_72',
  xx = '_statRow_iunlg_76',
  Sx = '_h2_iunlg_91',
  wx = '_bossLog_iunlg_97',
  Tx = '_bossRow_iunlg_106',
  Ex = '_codex_iunlg_114',
  Cx = '_codexSummary_iunlg_121',
  Nx = '_list_iunlg_127',
  Ax = '_row_iunlg_133',
  Lx = '_unseen_iunlg_140',
  Bx = '_info_iunlg_144',
  qx = '_name_iunlg_150',
  Mx = '_badge_iunlg_158',
  jx = '_sub_iunlg_167',
  Ox = '_empty_iunlg_172',
  Dx = '_foot_iunlg_177',
  Ix = '_back_iunlg_181',
  Me = {
    layout: dx,
    head: mx,
    title: _x,
    tabs: fx,
    tab: px,
    tabActive: hx,
    records: gx,
    statBig: kx,
    statNum: vx,
    statLabel: yx,
    statList: bx,
    statRow: xx,
    h2: Sx,
    bossLog: wx,
    bossRow: Tx,
    codex: Ex,
    codexSummary: Cx,
    list: Nx,
    row: Ax,
    unseen: Lx,
    info: Bx,
    name: qx,
    badge: Mx,
    sub: jx,
    empty: Ox,
    foot: Dx,
    back: Ix,
  };
function Gh(l) {
  const n = l.bestiary.monsters;
  return Object.values(ul)
    .slice()
    .sort((o, r) => o.tierBand - r.tierBand || o.id.localeCompare(r.id))
    .map((o) => {
      const r = n[o.id],
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
function Rx(l) {
  const n = Gh(l),
    o = n.length,
    r = n.filter((v) => v.seen).length,
    c = n.filter((v) => v.defeated).length;
  let d = 0,
    _ = 0;
  for (const v of n) for (const y of v.drops) ((d += 1), y.found && (_ += 1));
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
const zx = () => {
    const l = dl(),
      { save: n } = Ul(),
      [o, r] = C.useState('record');
    if (!n) return f.jsx(ol, { to: '/title', replace: !0 });
    const c = n.towerState.record,
      d = Rx(n),
      _ = Gh(n);
    return f.jsxs('div', {
      className: Me.layout,
      children: [
        f.jsx('header', {
          className: Me.head,
          children: f.jsx('h1', { className: Me.title, children: '図鑑 / 記録' }),
        }),
        f.jsxs('div', {
          className: Me.tabs,
          children: [
            f.jsx('button', {
              type: 'button',
              className: `${Me.tab} ${o === 'record' ? Me.tabActive : ''}`,
              onClick: () => r('record'),
              children: '到達記録',
            }),
            f.jsx('button', {
              type: 'button',
              className: `${Me.tab} ${o === 'codex' ? Me.tabActive : ''}`,
              onClick: () => r('codex'),
              children: '図鑑',
            }),
          ],
        }),
        o === 'record'
          ? f.jsxs('div', {
              className: Me.records,
              children: [
                f.jsxs('div', {
                  className: Me.statBig,
                  children: [
                    f.jsx('span', { className: Me.statNum, children: c.deepestReached }),
                    f.jsx('span', { className: Me.statLabel, children: '最深到達階' }),
                  ],
                }),
                f.jsxs('dl', {
                  className: Me.statList,
                  children: [
                    f.jsxs('div', {
                      className: Me.statRow,
                      children: [
                        f.jsx('dt', { children: '最高撃破ボス階' }),
                        f.jsx('dd', {
                          children: c.highestBossDefeated > 0 ? `${c.highestBossDefeated}F` : '—',
                        }),
                      ],
                    }),
                    f.jsxs('div', {
                      className: Me.statRow,
                      children: [
                        f.jsx('dt', { children: '挑戦回数' }),
                        f.jsx('dd', { children: c.totalDives }),
                      ],
                    }),
                    f.jsxs('div', {
                      className: Me.statRow,
                      children: [
                        f.jsx('dt', { children: '図鑑達成率' }),
                        f.jsxs('dd', { children: [d.completionPct, '%'] }),
                      ],
                    }),
                  ],
                }),
                f.jsx('h2', { className: Me.h2, children: 'ボス撃破履歴' }),
                c.bossDefeatLog.length === 0
                  ? f.jsx('p', { className: Me.empty, children: 'まだボスを倒していません。' })
                  : f.jsx('ul', {
                      className: Me.bossLog,
                      children: c.bossDefeatLog
                        .slice()
                        .reverse()
                        .map((h, k) =>
                          f.jsx(
                            'li',
                            {
                              className: Me.bossRow,
                              children: f.jsxs('span', { children: [h.depth, 'F のボス撃破'] }),
                            },
                            k
                          )
                        ),
                    }),
              ],
            })
          : f.jsxs('div', {
              className: Me.codex,
              children: [
                f.jsxs('div', {
                  className: Me.codexSummary,
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
                  className: Me.list,
                  children: _.map((h) =>
                    f.jsx(
                      'div',
                      {
                        className: `${Me.row} ${h.seen ? '' : Me.unseen}`,
                        children: f.jsxs('div', {
                          className: Me.info,
                          children: [
                            f.jsxs('span', {
                              className: Me.name,
                              children: [
                                h.seen ? h.name : '？？？',
                                h.defeated
                                  ? f.jsx('span', { className: Me.badge, children: '撃破' })
                                  : null,
                              ],
                            }),
                            f.jsxs('span', {
                              className: Me.sub,
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
          className: Me.foot,
          children: f.jsx('button', {
            type: 'button',
            className: Me.back,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  Ux = '_layout_1395s_1',
  Hx = '_head_1395s_13',
  Gx = '_depth_1395s_22',
  $x = '_theme_1395s_28',
  Yx = '_fpvWrap_1395s_45',
  Xx = '_mapWrap_1395s_51',
  Vx = '_palette_1395s_58',
  Qx = '_tool_1395s_68',
  Kx = '_toolActive_1395s_79',
  Zx = '_paletteHint_1395s_85',
  Jx = '_stairs_1395s_94',
  Px = '_action_1395s_108',
  Wx = '_notice_1395s_125',
  Fx = '_controls_1395s_133',
  e3 = '_row_1395s_143',
  t3 = '_forward_1395s_149',
  l3 = '_turn_1395s_164',
  a3 = '_back_1395s_178',
  i3 = '_itemOverlay_1395s_189',
  n3 = '_itemPanel_1395s_199',
  s3 = '_itemTitle_1395s_212',
  r3 = '_itemEmpty_1395s_217',
  o3 = '_itemRow_1395s_223',
  u3 = '_itemName_1395s_231',
  c3 = '_itemDesc_1395s_239',
  d3 = '_itemTargets_1395s_245',
  m3 = '_itemTarget_1395s_245',
  _3 = '_itemHp_1395s_265',
  f3 = '_itemUse_1395s_271',
  p3 = '_itemClose_1395s_288',
  pe = {
    layout: Ux,
    head: Hx,
    depth: Gx,
    theme: $x,
    return: '_return_1395s_34',
    fpvWrap: Yx,
    mapWrap: Xx,
    palette: Vx,
    tool: Qx,
    toolActive: Kx,
    paletteHint: Zx,
    stairs: Jx,
    action: Px,
    notice: Wx,
    controls: Fx,
    row: e3,
    forward: t3,
    turn: l3,
    back: a3,
    itemOverlay: i3,
    itemPanel: n3,
    itemTitle: s3,
    itemEmpty: r3,
    itemRow: o3,
    itemName: u3,
    itemDesc: c3,
    itemTargets: d3,
    itemTarget: m3,
    itemHp: _3,
    itemUse: f3,
    itemClose: p3,
  },
  h3 = '_canvas_1keax_1',
  g3 = { canvas: h3 },
  $h = [
    { id: 'icon_chest', symbol: '📦', label: '宝箱' },
    { id: 'icon_foe', symbol: '👹', label: '強敵(FOE)' },
    { id: 'icon_warning', symbol: '⚠️', label: '注意' },
    { id: 'icon_door', symbol: '🚪', label: '扉/近道' },
    { id: 'icon_gather', symbol: '⛏️', label: '採集' },
    { id: 'icon_event', symbol: '❗', label: 'イベント' },
    { id: 'icon_note', symbol: '📝', label: 'メモ' },
    { id: 'icon_star', symbol: '⭐', label: '任意' },
  ],
  k3 = new Map($h.map((l) => [l.id, l]));
function v3(l) {
  var n;
  return ((n = k3.get(l)) == null ? void 0 : n.symbol) ?? '•';
}
const Wt = {
    fog: '#cdd9b8',
    floor: '#fbfdf7',
    wall: '#4a5a3a',
    grid: '#e3ebd6',
    player: '#2196f3',
    stairsUp: '#e8923a',
    stairsDown: '#7aa2d6',
    foe: '#b0533a',
    foeAlert: '#d32f2f',
    gather: '#4a9d52',
    gatherDone: '#a9c6ab',
    cooking: '#e8923a',
  },
  y3 = ({
    floor: l,
    explored: n,
    pos: o,
    dir: r,
    icons: c = [],
    foes: d = [],
    depletedGathers: _ = [],
    maxCell: h = 26,
    onCellClick: k,
  }) => {
    const p = C.useRef(null),
      v = Math.max(10, Math.min(h, Math.floor(360 / l.width))),
      y = l.width * v,
      S = l.height * v;
    C.useEffect(() => {
      const b = p.current;
      if (!b) return;
      const B = new Set(n),
        w = new Set(_),
        E = window.devicePixelRatio || 1;
      ((b.width = y * E), (b.height = S * E));
      const T = b.getContext('2d');
      if (!T) return;
      (T.scale(E, E), T.clearRect(0, 0, y, S));
      for (let P = 0; P < l.height; P++)
        for (let ne = 0; ne < l.width; ne++) {
          const me = B.has(`${ne},${P}`);
          ((T.fillStyle = me ? Wt.floor : Wt.fog),
            T.fillRect(ne * v, P * v, v, v),
            me &&
              ((T.strokeStyle = Wt.grid),
              (T.lineWidth = 1),
              T.strokeRect(ne * v + 0.5, P * v + 0.5, v - 1, v - 1)));
        }
      ((T.strokeStyle = Wt.wall), (T.lineWidth = 2), (T.lineCap = 'round'));
      const R = (P, ne, me, ce) => {
        (T.beginPath(), T.moveTo(P, ne), T.lineTo(me, ce), T.stroke());
      };
      for (let P = 0; P < l.height; P++)
        for (let ne = 0; ne < l.width; ne++) {
          if (!B.has(`${ne},${P}`)) continue;
          const me = l.cells[P][ne],
            ce = ne * v,
            Z = P * v;
          (me.walls.N && R(ce, Z, ce + v, Z),
            me.walls.S && R(ce, Z + v, ce + v, Z + v),
            me.walls.W && R(ce, Z, ce, Z + v),
            me.walls.E && R(ce + v, Z, ce + v, Z + v));
          const J = me.event;
          if (
            (J == null ? void 0 : J.kind) === 'stairsUp' ||
            (J == null ? void 0 : J.kind) === 'stairsDown'
          )
            ((T.fillStyle = J.kind === 'stairsUp' ? Wt.stairsUp : Wt.stairsDown),
              T.beginPath(),
              T.arc(ce + v / 2, Z + v / 2, v * 0.28, 0, Math.PI * 2),
              T.fill(),
              (T.fillStyle = '#ffffff'),
              (T.font = `bold ${Math.floor(v * 0.5)}px sans-serif`),
              (T.textAlign = 'center'),
              (T.textBaseline = 'middle'),
              T.fillText(J.kind === 'stairsUp' ? '▲' : '▼', ce + v / 2, Z + v / 2 + 1));
          else if ((J == null ? void 0 : J.kind) === 'gather') {
            const _e = w.has(`${ne},${P}`);
            ((T.fillStyle = _e ? Wt.gatherDone : Wt.gather),
              T.beginPath(),
              T.arc(ce + v / 2, Z + v / 2, v * 0.24, 0, Math.PI * 2),
              T.fill());
          } else
            (J == null ? void 0 : J.kind) === 'cookingSpot' &&
              ((T.fillStyle = Wt.cooking),
              T.fillRect(ce + v * 0.28, Z + v * 0.28, v * 0.44, v * 0.44));
        }
      ((T.font = `${Math.floor(v * 0.66)}px sans-serif`),
        (T.textAlign = 'center'),
        (T.textBaseline = 'middle'));
      for (const P of c)
        B.has(`${P.x},${P.y}`) && T.fillText(v3(P.iconId), P.x * v + v / 2, P.y * v + v / 2 + 1);
      for (const P of d) {
        if (!B.has(`${P.x},${P.y}`)) continue;
        const ne = P.x * v + v / 2,
          me = P.y * v + v / 2;
        ((T.fillStyle = P.alerted ? Wt.foeAlert : Wt.foe),
          T.beginPath(),
          T.arc(ne, me, v * 0.3, 0, Math.PI * 2),
          T.fill(),
          (T.fillStyle = '#ffffff'),
          (T.font = `bold ${Math.floor(v * 0.5)}px sans-serif`),
          (T.textAlign = 'center'),
          (T.textBaseline = 'middle'),
          T.fillText('!', ne, me + 1));
      }
      const W = o.x * v + v / 2,
        K = o.y * v + v / 2,
        Y = v * 0.34,
        Q = { N: -Math.PI / 2, E: 0, S: Math.PI / 2, W: Math.PI }[r];
      ((T.fillStyle = Wt.player),
        T.beginPath(),
        T.moveTo(W + Math.cos(Q) * Y, K + Math.sin(Q) * Y),
        T.lineTo(W + Math.cos(Q + 2.5) * Y, K + Math.sin(Q + 2.5) * Y),
        T.lineTo(W + Math.cos(Q - 2.5) * Y, K + Math.sin(Q - 2.5) * Y),
        T.closePath(),
        T.fill());
    }, [l, n, o, r, c, d, _, v, y, S]);
    const L = (b) => {
      if (!k) return;
      const B = b.currentTarget.getBoundingClientRect(),
        w = Math.floor(((b.clientX - B.left) / B.width) * l.width),
        E = Math.floor(((b.clientY - B.top) / B.height) * l.height);
      w >= 0 && E >= 0 && w < l.width && E < l.height && k(w, E);
    };
    return f.jsx('canvas', {
      ref: p,
      className: g3.canvas,
      style: { width: y, height: S },
      onClick: L,
    });
  },
  b3 = '_gauge_1o2hx_1',
  x3 = '_icon_1o2hx_11',
  S3 = '_segments_1o2hx_16',
  w3 = '_seg_1o2hx_16',
  T3 = '_filled_1o2hx_28',
  E3 = '_danger_1o2hx_32',
  yi = { gauge: b3, icon: x3, segments: S3, seg: w3, filled: T3, danger: E3 },
  C3 = ({ level: l }) => {
    const n = l >= Mn;
    return f.jsxs('div', {
      className: yi.gauge,
      role: 'img',
      'aria-label': `エンカウントゲージ ${l}/${Mn}`,
      children: [
        f.jsx('span', { className: yi.icon, children: n ? '⚠' : '👣' }),
        f.jsx('div', {
          className: yi.segments,
          children: Array.from({ length: Mn }, (o, r) =>
            f.jsx(
              'span',
              { className: [yi.seg, r < l ? yi.filled : '', n ? yi.danger : ''].join(' ') },
              r
            )
          ),
        }),
      ],
    });
  },
  N3 = '_view_tw2v9_1',
  A3 = { view: N3 },
  Op = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } };
function L3(l, n, o, r = 4) {
  const c = Ah(o),
    d = Nh(o),
    _ = [];
  let { x: h, y: k } = n;
  for (let p = 0; p < r; p++) {
    const v = wi(l, h, k, o);
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
    ((h += Op[o].dx), (k += Op[o].dy));
  }
  return _;
}
const B3 = {
    sky: '#26301c',
    ceiling: '#3a4a2c',
    floor: '#5d6b46',
    wall: '#8b9a6b',
    frontWall: '#7a8a5c',
    outline: '#2c3720',
  },
  q3 = 0.56,
  M3 = ({
    floor: l,
    pos: n,
    dir: o,
    foes: r = [],
    theme: c,
    maxDepth: d = 4,
    width: _ = 358,
    height: h = 200,
  }) => {
    const k = C.useRef(null);
    return (
      C.useEffect(() => {
        const p = { ...B3, ...(c ?? {}) },
          v = k.current;
        if (!v) return;
        const y = window.devicePixelRatio || 1;
        ((v.width = _ * y), (v.height = h * y));
        const S = v.getContext('2d');
        if (!S) return;
        S.scale(y, y);
        const L = _,
          b = h,
          B = L / 2,
          w = b / 2,
          E = L3(l, n, o, d),
          T = (K) => {
            const Y = Math.pow(q3, K);
            return {
              l: B - (L / 2) * Y,
              r: B + (L / 2) * Y,
              t: w - (b / 2) * Y,
              b: w + (b / 2) * Y,
            };
          },
          R = (K, Y, z = !1) => {
            (S.beginPath(), S.moveTo(K[0][0], K[0][1]));
            for (let Q = 1; Q < K.length; Q++) S.lineTo(K[Q][0], K[Q][1]);
            (S.closePath(),
              (S.fillStyle = Y),
              S.fill(),
              z && ((S.strokeStyle = p.outline), (S.lineWidth = 1), S.stroke()));
          },
          W = (K) => `rgba(0,0,0,${Math.min(0.5, K * 0.13)})`;
        ((S.fillStyle = p.sky), S.fillRect(0, 0, L, b));
        for (let K = E.length - 1; K >= 0; K--) {
          const Y = T(K),
            z = T(K + 1),
            Q = E[K];
          (R(
            [
              [Y.l, Y.t],
              [Y.r, Y.t],
              [z.r, z.t],
              [z.l, z.t],
            ],
            p.ceiling
          ),
            R(
              [
                [Y.l, Y.b],
                [Y.r, Y.b],
                [z.r, z.b],
                [z.l, z.b],
              ],
              p.floor
            ),
            R(
              [
                [Y.l, Y.t],
                [z.l, z.t],
                [z.l, z.b],
                [Y.l, Y.b],
              ],
              Q.leftOpen ? p.sky : p.wall,
              !0
            ),
            R(
              [
                [Y.r, Y.t],
                [z.r, z.t],
                [z.r, z.b],
                [Y.r, Y.b],
              ],
              Q.rightOpen ? p.sky : p.wall,
              !0
            ),
            Q.frontOpen ||
              R(
                [
                  [z.l, z.t],
                  [z.r, z.t],
                  [z.r, z.b],
                  [z.l, z.b],
                ],
                p.frontWall,
                !0
              ),
            (S.fillStyle = W(K)),
            S.fillRect(z.l, z.t, z.r - z.l, z.b - z.t));
          const P = Q.event;
          if (
            (P == null ? void 0 : P.kind) === 'stairsUp' ||
            (P == null ? void 0 : P.kind) === 'stairsDown'
          ) {
            const ne = B,
              me = (Y.b + z.b) / 2 - (Y.b - z.b) * 0.15,
              ce = Math.max(12, (Y.b - Y.t) * 0.18);
            ((S.fillStyle = P.kind === 'stairsUp' ? '#e8923a' : '#7aa2d6'),
              S.beginPath(),
              S.arc(ne, me, ce, 0, Math.PI * 2),
              S.fill(),
              (S.fillStyle = '#fff'),
              (S.font = `bold ${Math.floor(ce * 1.2)}px sans-serif`),
              (S.textAlign = 'center'),
              (S.textBaseline = 'middle'),
              S.fillText(P.kind === 'stairsUp' ? '▲' : '▼', ne, me + 1));
          }
          if (K > 0 && r.some((ne) => ne.x === Q.x && ne.y === Q.y)) {
            const ne = r.some((J) => J.x === Q.x && J.y === Q.y && J.alerted),
              me = B,
              ce = (Y.b + z.b) / 2 - (Y.b - z.b) * 0.1,
              Z = Math.max(14, (Y.b - Y.t) * 0.22);
            ((S.fillStyle = ne ? '#d32f2f' : '#b0533a'),
              S.beginPath(),
              S.arc(me, ce, Z, 0, Math.PI * 2),
              S.fill(),
              (S.fillStyle = '#fff'),
              (S.font = `bold ${Math.floor(Z * 1.3)}px sans-serif`),
              (S.textAlign = 'center'),
              (S.textBaseline = 'middle'),
              S.fillText('!', me, ce + 1));
          }
        }
      }, [l, n, o, r, c, d, _, h]),
      f.jsx('canvas', { ref: k, className: A3.view, style: { width: _, height: h } })
    );
  },
  sr = [
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
function Dp(l) {
  const n = Math.floor((l - 1) / 10);
  return sr[((n % sr.length) + sr.length) % sr.length];
}
function j3(l) {
  var r, c, d;
  const n = l.diveState;
  if (!n) return !1;
  const o =
    (c = (r = l.towerState.floors[n.depth]) == null ? void 0 : r.generated.cells[n.pos.y]) == null
      ? void 0
      : c[n.pos.x];
  return ((d = o == null ? void 0 : o.event) == null ? void 0 : d.kind) === 'cookingSpot';
}
function O3(l) {
  const n = new Set(l.unlockedRecipeIds ?? []);
  return Object.values(qi).filter((o) => n.has(o.id));
}
function Yh(l, n) {
  const o = qi[n];
  return !o || !(l.unlockedRecipeIds ?? []).includes(n)
    ? !1
    : o.ingredients.every((r) => Yc(l, r.itemId) >= r.qty);
}
function D3(l, n) {
  if (!Yh(l, n)) return { ok: !1, save: l };
  const o = qi[n];
  let r = l;
  for (const c of o.ingredients) r = yh(r, c.itemId, c.qty);
  return ((r = vh(r, o.result.itemId, o.result.count)), { ok: !0, save: r });
}
function Xh(l, n) {
  const o = new Set([...l.guild.party.front, ...l.guild.party.back].filter((r) => r !== null));
  return l.guild.members.some((r) => o.has(r.id) && (r.learnedSkills[n] ?? 0) > 0);
}
function Vh(l) {
  var d, _, h;
  const n = l.diveState;
  if (!n) return null;
  const o = (d = l.towerState.floors[n.depth]) == null ? void 0 : d.generated,
    r = (_ = o == null ? void 0 : o.cells[n.pos.y]) == null ? void 0 : _[n.pos.x];
  if (!o || ((h = r == null ? void 0 : r.event) == null ? void 0 : h.kind) !== 'gather')
    return null;
  const c = r.event.gatherId;
  return o.gatheringPoints.find((k) => k.id === c) ?? null;
}
function Lc(l, n) {
  var c;
  const o = l.diveState;
  return o
    ? (((c = l.towerState.floors[o.depth]) == null ? void 0 : c.depletedGathers) ?? []).includes(
        br(n.cell.x, n.cell.y)
      )
    : !0;
}
function Ip(l, n) {
  return Xh(l, qa[n.type].requiredSkillId);
}
function I3(l, n) {
  const o = l.reduce((c, d) => c + d.weight, 0);
  let r = n.next() * o;
  for (const c of l) if (((r -= c.weight), r < 0)) return c.itemId;
  return l[l.length - 1].itemId;
}
function R3(l, n) {
  const o = l.diveState;
  if (!o) return { ok: !1, save: l, reason: 'noDive' };
  const r = Vh(l);
  if (!r) return { ok: !1, save: l, reason: 'noPoint' };
  if (Lc(l, r)) return { ok: !1, save: l, reason: 'depleted' };
  const c = qa[r.type];
  if (!Xh(l, c.requiredSkillId)) return { ok: !1, save: l, reason: 'noSkill' };
  if (c.food && kh(l) >= gh) return { ok: !1, save: l, reason: 'foodFull' };
  const d = I3(c.drops, n);
  let _ = c.food ? vh(l, d, 1) : Gc(l, d, 1);
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
function z3(l, n, o) {
  var B;
  const r = Fe[n];
  if (!r) return { save: l, ok: !1, message: 'そのアイテムは無い' };
  if (!((B = r.useContext) != null && B.includes('field')))
    return { save: l, ok: !1, message: 'ここでは使えない' };
  const c = gb(n);
  if ((c ? Yc(l, n) : hh(l, n)) <= 0) return { save: l, ok: !1, message: '所持していない' };
  const _ = (w) => (c ? yh(w, n, 1) : $c(w, n, 1));
  if (n === 'item_return_thread')
    return l.diveState
      ? { save: On(_(l)), ok: !0, message: '拠点へ帰還した' }
      : { save: l, ok: !1, message: '探索中のみ使える' };
  if (!l.diveState) return { save: l, ok: !1, message: '探索中のみ使える' };
  const h = l.diveState.party.find((w) => w.charId === o),
    k = l.guild.members.find((w) => w.id === o);
  if (!h || !k) return { save: l, ok: !1, message: '対象がいない' };
  const p = zn(k);
  let v = h.hp,
    y = h.tp,
    S = !1;
  for (const w of r.effects ?? [])
    w.kind === 'heal'
      ? ((v = Math.min(p.hp, v + w.amount(1))), (S = !0))
      : w.kind === 'restoreTp' && ((y = Math.min(p.tp, y + w.amount(1))), (S = !0));
  if (!S) return { save: l, ok: !1, message: 'いま使う効果がない' };
  const L = l.diveState.party.map((w) => (w.charId === o ? { ...w, hp: v, tp: y } : w));
  return {
    save: _({ ...l, diveState: { ...l.diveState, party: L } }),
    ok: !0,
    message: `${k.name} に ${r.name} を使った`,
  };
}
function U3(l) {
  return { depth: l, floorPaint: [], wallDraw: [], icons: [], notes: [], autopilotRoutes: [] };
}
function H3(l, n) {
  return l.playerMaps[n] ?? U3(n);
}
function Qh(l, n, o) {
  return { ...l, playerMaps: { ...l.playerMaps, [n]: o } };
}
function G3(l, n, o, r, c) {
  const d = H3(l, n),
    _ = d.icons.find((p) => p.x === o && p.y === r),
    h = d.icons.filter((p) => !(p.x === o && p.y === r)),
    k = (_ == null ? void 0 : _.iconId) === c ? h : [...h, { x: o, y: r, iconId: c }];
  return Qh(l, n, { ...d, icons: k });
}
function $3(l, n, o, r) {
  const c = l.playerMaps[n];
  return c ? Qh(l, n, { ...c, icons: c.icons.filter((d) => !(d.x === o && d.y === r)) }) : l;
}
const Y3 = () => {
    var ce;
    const l = dl(),
      { save: n, applySave: o, applyAndPersist: r } = Ul(),
      c = C.useRef(null),
      [d, _] = C.useState(null),
      [h, k] = C.useState(!1),
      [p, v] = C.useState(!1),
      [y, S] = C.useState(null),
      L = (n == null ? void 0 : n.diveState) ?? null,
      b = C.useMemo(() => {
        var Z;
        return n && L ? ((Z = n.towerState.floors[L.depth]) == null ? void 0 : Z.generated) : null;
      }, [n, L]),
      B = C.useMemo(() => {
        var Z;
        return n && L
          ? (((Z = n.towerState.floors[L.depth]) == null ? void 0 : Z.foeRuntime) ?? [])
              .filter((J) => !J.defeated)
              .map((J) => ({ x: J.cell.x, y: J.cell.y, alerted: J.alerted }))
          : [];
      }, [n, L]),
      w = C.useMemo(() => (n ? Vh(n) : null), [n]),
      E = C.useMemo(() => (n ? j3(n) : !1), [n]),
      T = C.useMemo(() => {
        var Z;
        return n && L
          ? (((Z = n.towerState.floors[L.depth]) == null ? void 0 : Z.depletedGathers) ?? [])
          : [];
      }, [n, L]),
      R = C.useCallback(() => {
        var J;
        if (!n) return;
        c.current || (c.current = ja((n.masterSeed ^ 2654435769) >>> 0));
        const Z = R3(n, c.current);
        if (!Z.ok) {
          S(
            Z.reason === 'noSkill'
              ? '対応する採集スキルを持つ仲間がいない'
              : Z.reason === 'foodFull'
                ? '食料がいっぱいで採れない'
                : '採集できない'
          );
          return;
        }
        (r(() => Z.save),
          S(
            `${Z.itemId ? (((J = Fe[Z.itemId]) == null ? void 0 : J.name) ?? '素材') : '素材'} を手に入れた`
          ));
      }, [n, r]),
      W = C.useCallback(
        (Z) => {
          var _e;
          if (!n) return;
          const J = D3(n, Z);
          J.ok &&
            (r(() => J.save), S(`${((_e = qi[Z]) == null ? void 0 : _e.name) ?? '料理'} を作った`));
        },
        [n, r]
      ),
      K = C.useCallback(
        (Z) => {
          if (!n) return;
          (S(null), c.current || (c.current = ja((n.masterSeed ^ 2654435769) >>> 0)));
          const J = E1(n, Z, c.current);
          (r(() => J.save), J.triggered && l('/battle'));
        },
        [n, r, l]
      ),
      Y = C.useCallback(
        (Z) => {
          o((J) => Mh(J, Z));
        },
        [o]
      ),
      z = C.useCallback(async () => {
        if (!n) return;
        const Z = Cp(n);
        if (Z === 'stairsUp') {
          if (!Oh(n, n.diveState.depth)) {
            S('強大な力に阻まれている。階層ボスを倒さねば先へ進めない。');
            return;
          }
          await r((J) => A1(J));
        } else
          Z === 'stairsDown' &&
            (n.diveState.depth <= 1 ? (await r((J) => On(J)), l('/town')) : await r((J) => L1(J)));
      }, [n, r, l]),
      Q = C.useCallback(async () => {
        (await r((Z) => On(Z)), l('/town'));
      }, [r, l]),
      P = C.useCallback(
        (Z, J) => {
          if (!n) return;
          const _e = z3(n, Z, J);
          _e.ok && (r(() => _e.save), _e.save.diveState || (k(!1), l('/town')));
        },
        [n, r, l]
      ),
      ne = C.useCallback(
        (Z, J) => {
          if (!L) return;
          const _e = L.depth;
          if (d !== null) {
            if (!((n == null ? void 0 : n.exploredCells[_e]) ?? []).includes(`${Z},${J}`)) return;
            r(d === 'erase' ? (ve) => $3(ve, _e, Z, J) : (ve) => G3(ve, _e, Z, J, d));
            return;
          }
          const q = Z - L.pos.x,
            V = J - L.pos.y,
            ee = ['N', 'E', 'S', 'W'].find((de) => el[de].dx === q && el[de].dy === V);
          ee && K(ee);
        },
        [L, K, d, n, r]
      );
    if (!n) return f.jsx(ol, { to: '/title', replace: !0 });
    if (!L || !b) return f.jsx(ol, { to: '/town', replace: !0 });
    const me = Cp(n);
    return f.jsxs('div', {
      className: pe.layout,
      children: [
        f.jsxs('header', {
          className: pe.head,
          children: [
            f.jsxs('div', {
              className: pe.depth,
              children: [
                L.depth,
                'F ',
                f.jsx('span', { className: pe.theme, children: Dp(L.depth).name }),
              ],
            }),
            f.jsx(C3, { level: r1(L.encounter.stepsUntilEncounter) }),
            f.jsx('button', {
              type: 'button',
              className: pe.return,
              onClick: () => k(!0),
              children: '道具',
            }),
            f.jsx('button', {
              type: 'button',
              className: pe.return,
              onClick: () => void Q(),
              children: '帰還',
            }),
          ],
        }),
        f.jsx('div', {
          className: pe.fpvWrap,
          children: f.jsx(M3, { floor: b, pos: L.pos, dir: L.dir, foes: B, theme: Dp(L.depth) }),
        }),
        f.jsx('div', {
          className: pe.mapWrap,
          children: f.jsx(y3, {
            floor: b,
            explored: n.exploredCells[L.depth] ?? [],
            pos: L.pos,
            dir: L.dir,
            icons: ((ce = n.playerMaps[L.depth]) == null ? void 0 : ce.icons) ?? [],
            foes: B,
            depletedGathers: T,
            onCellClick: ne,
          }),
        }),
        f.jsxs('div', {
          className: pe.palette,
          children: [
            f.jsx('button', {
              type: 'button',
              className: `${pe.tool} ${d === null ? pe.toolActive : ''}`,
              onClick: () => _(null),
              'aria-label': '移動モード',
              children: '🚶',
            }),
            $h.map((Z) =>
              f.jsx(
                'button',
                {
                  type: 'button',
                  className: `${pe.tool} ${d === Z.id ? pe.toolActive : ''}`,
                  onClick: () => _(Z.id),
                  'aria-label': Z.label,
                  children: Z.symbol,
                },
                Z.id
              )
            ),
            f.jsx('button', {
              type: 'button',
              className: `${pe.tool} ${d === 'erase' ? pe.toolActive : ''}`,
              onClick: () => _('erase'),
              'aria-label': '消しゴム',
              children: '🧽',
            }),
          ],
        }),
        f.jsx('p', {
          className: pe.paletteHint,
          children:
            d === null
              ? '隣接マスをタップで移動。アイコンを選ぶとマップに書き込めます。'
              : d === 'erase'
                ? 'マップ上のマスをタップでアイコンを消去。'
                : 'マップ上の探索済みマスをタップでアイコンを配置（再タップで消去）。',
        }),
        me &&
          f.jsx('button', {
            type: 'button',
            className: pe.stairs,
            onClick: () => void z(),
            children:
              me === 'stairsUp'
                ? '▲ 次の階へ進む'
                : L.depth <= 1
                  ? '▼ 拠点へ戻る'
                  : '▼ 前の階へ戻る',
          }),
        w &&
          f.jsx('button', {
            type: 'button',
            className: pe.action,
            disabled: Lc(n, w) || !Ip(n, w),
            onClick: R,
            children: Lc(n, w)
              ? `🌿 ${qa[w.type].name}（採集済み）`
              : Ip(n, w)
                ? `🌿 ${qa[w.type].name}する`
                : `🌿 ${qa[w.type].name}（スキル要）`,
          }),
        E &&
          f.jsx('button', {
            type: 'button',
            className: pe.action,
            onClick: () => v(!0),
            children: '🍳 調理する',
          }),
        y && f.jsx('p', { className: pe.notice, children: y }),
        f.jsxs('div', {
          className: pe.controls,
          children: [
            f.jsxs('div', {
              className: pe.row,
              children: [
                f.jsx('button', {
                  type: 'button',
                  className: pe.turn,
                  onClick: () => Y(Ah(L.dir)),
                  'aria-label': '左を向く',
                  children: '↰',
                }),
                f.jsx('button', {
                  type: 'button',
                  className: pe.forward,
                  onClick: () => K(L.dir),
                  children: '前進',
                }),
                f.jsx('button', {
                  type: 'button',
                  className: pe.turn,
                  onClick: () => Y(Nh(L.dir)),
                  'aria-label': '右を向く',
                  children: '↱',
                }),
              ],
            }),
            f.jsx('button', {
              type: 'button',
              className: pe.back,
              onClick: () => Y(o1(L.dir)),
              'aria-label': '振り向く',
              children: '↻ 振り向く',
            }),
          ],
        }),
        h
          ? f.jsx('div', {
              className: pe.itemOverlay,
              onClick: () => k(!1),
              children: f.jsxs('div', {
                className: pe.itemPanel,
                onClick: (Z) => Z.stopPropagation(),
                children: [
                  f.jsx('div', { className: pe.itemTitle, children: 'どうぐ・食料' }),
                  (() => {
                    const Z = [...n.guild.storage, ...(n.guild.foodStorage ?? [])].filter((J) => {
                      var _e, q;
                      return (
                        ((q = (_e = Fe[J.itemId]) == null ? void 0 : _e.useContext) == null
                          ? void 0
                          : q.includes('field')) && J.qty > 0
                      );
                    });
                    return Z.length === 0
                      ? f.jsx('p', {
                          className: pe.itemEmpty,
                          children: '使える道具がありません。',
                        })
                      : Z.map((J) => {
                          const _e = Fe[J.itemId],
                            q = J.itemId === 'item_return_thread';
                          return f.jsxs(
                            'div',
                            {
                              className: pe.itemRow,
                              children: [
                                f.jsxs('div', {
                                  className: pe.itemName,
                                  children: [
                                    _e.name,
                                    ' ×',
                                    J.qty,
                                    f.jsx('span', {
                                      className: pe.itemDesc,
                                      children: _e.description,
                                    }),
                                  ],
                                }),
                                q
                                  ? f.jsx('button', {
                                      type: 'button',
                                      className: pe.itemUse,
                                      onClick: () => P(J.itemId),
                                      children: '使う',
                                    })
                                  : f.jsx('div', {
                                      className: pe.itemTargets,
                                      children: L.party.map((V) => {
                                        const ee = n.guild.members.find((ve) => ve.id === V.charId);
                                        if (!ee) return null;
                                        const de = zn(ee);
                                        return f.jsxs(
                                          'button',
                                          {
                                            type: 'button',
                                            className: pe.itemTarget,
                                            onClick: () => P(J.itemId, V.charId),
                                            children: [
                                              ee.name,
                                              f.jsxs('span', {
                                                className: pe.itemHp,
                                                children: [
                                                  'HP ',
                                                  V.hp,
                                                  '/',
                                                  de.hp,
                                                  '・TP ',
                                                  V.tp,
                                                  '/',
                                                  de.tp,
                                                ],
                                              }),
                                            ],
                                          },
                                          V.charId
                                        );
                                      }),
                                    }),
                              ],
                            },
                            J.itemId
                          );
                        });
                  })(),
                  f.jsx('button', {
                    type: 'button',
                    className: pe.itemClose,
                    onClick: () => k(!1),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
        p
          ? f.jsx('div', {
              className: pe.itemOverlay,
              onClick: () => v(!1),
              children: f.jsxs('div', {
                className: pe.itemPanel,
                onClick: (Z) => Z.stopPropagation(),
                children: [
                  f.jsx('div', { className: pe.itemTitle, children: '調理' }),
                  (() => {
                    const Z = O3(n);
                    return Z.length === 0
                      ? f.jsx('p', {
                          className: pe.itemEmpty,
                          children: '作れるレシピがありません。',
                        })
                      : Z.map((J) => {
                          var V;
                          const _e = Yh(n, J.id),
                            q = J.ingredients
                              .map((ee) => {
                                var de;
                                return `${((de = Fe[ee.itemId]) == null ? void 0 : de.name) ?? ee.itemId}×${ee.qty}`;
                              })
                              .join(' ＋ ');
                          return f.jsxs(
                            'div',
                            {
                              className: pe.itemRow,
                              children: [
                                f.jsxs('div', {
                                  className: pe.itemName,
                                  children: [
                                    J.name,
                                    f.jsxs('span', {
                                      className: pe.itemDesc,
                                      children: [
                                        q,
                                        ' → ',
                                        ((V = Fe[J.result.itemId]) == null ? void 0 : V.name) ??
                                          J.result.itemId,
                                        '（所持',
                                        J.ingredients
                                          .map((ee) => {
                                            var de;
                                            return `${((de = Fe[ee.itemId]) == null ? void 0 : de.name) ?? ''}${Yc(n, ee.itemId)}`;
                                          })
                                          .join('・'),
                                        '）',
                                      ],
                                    }),
                                  ],
                                }),
                                f.jsx('button', {
                                  type: 'button',
                                  className: pe.itemUse,
                                  disabled: !_e,
                                  onClick: () => W(J.id),
                                  children: '作る',
                                }),
                              ],
                            },
                            J.id
                          );
                        });
                  })(),
                  f.jsx('button', {
                    type: 'button',
                    className: pe.itemClose,
                    onClick: () => v(!1),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
      ],
    });
  },
  X3 = '_layout_34t9v_1',
  V3 = '_head_34t9v_11',
  Q3 = '_title_34t9v_18',
  K3 = '_stock_34t9v_24',
  Z3 = '_tabs_34t9v_29',
  J3 = '_tab_34t9v_29',
  P3 = '_tabActive_34t9v_46',
  W3 = '_hint_34t9v_51',
  F3 = '_list_34t9v_57',
  e2 = '_row_34t9v_65',
  t2 = '_info_34t9v_76',
  l2 = '_name_34t9v_82',
  a2 = '_note_34t9v_87',
  i2 = '_actions_34t9v_92',
  n2 = '_ingot_34t9v_97',
  s2 = '_recycle_34t9v_114',
  r2 = '_maxed_34t9v_126',
  o2 = '_empty_34t9v_132',
  u2 = '_foot_34t9v_137',
  c2 = '_back_34t9v_141',
  We = {
    layout: X3,
    head: V3,
    title: Q3,
    stock: K3,
    tabs: Z3,
    tab: J3,
    tabActive: P3,
    hint: W3,
    list: F3,
    row: e2,
    info: t2,
    name: l2,
    note: a2,
    actions: i2,
    ingot: n2,
    recycle: s2,
    maxed: r2,
    empty: o2,
    foot: u2,
    back: c2,
  },
  d2 = () => {
    const l = dl(),
      { save: n, applyAndPersist: o } = Ul(),
      [r, c] = C.useState('forge');
    if (!n) return f.jsx(ol, { to: '/title', replace: !0 });
    const { copper: d, silver: _, gold: h } = n.forgeInventory.ingots,
      k = n.forgeInventory.fragments.common ?? 0,
      p = n.guild.equipment,
      v = (y, S, L, b) =>
        f.jsxs('button', {
          type: 'button',
          className: We.ingot,
          disabled: b <= 0,
          onClick: () => void o((B) => qb(B, y, S).save),
          children: [L, '+', hl.INGOT_INC[S], '（', b, '）'],
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
                  const S = st[y.masterId],
                    L = y.forgeLevel >= hl.MAX_LEVEL;
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
                              children: L
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
                              onClick: () => void o((b) => Mb(b, y.id).save),
                              children: ['分解（断片+', hl.RECYCLE_FRAGMENTS, '）'],
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
  m2 = '_layout_16au8_2',
  _2 = '_head_16au8_13',
  f2 = '_title_16au8_20',
  p2 = '_count_16au8_26',
  h2 = '_create_16au8_31',
  g2 = '_sectionTitle_16au8_42',
  k2 = '_field_16au8_48',
  v2 = '_primary_16au8_64',
  y2 = '_list_16au8_79',
  b2 = '_empty_16au8_83',
  x2 = '_members_16au8_88',
  S2 = '_member_16au8_88',
  w2 = '_memberMain_16au8_107',
  T2 = '_memberName_16au8_119',
  E2 = '_pos_16au8_127',
  C2 = '_memberSub_16au8_144',
  N2 = '_posBtns_16au8_149',
  A2 = '_posBtn_16au8_149',
  L2 = '_posBtnActive_16au8_164',
  B2 = '_foot_16au8_170',
  q2 = '_sub_16au8_174',
  je = {
    layout: m2,
    head: _2,
    title: f2,
    count: p2,
    create: h2,
    sectionTitle: g2,
    field: k2,
    primary: v2,
    list: y2,
    empty: b2,
    members: x2,
    member: S2,
    memberMain: w2,
    memberName: T2,
    pos: E2,
    pos_前衛: '_pos_前衛_16au8_136',
    pos_後衛: '_pos_後衛_16au8_140',
    memberSub: C2,
    posBtns: N2,
    posBtn: A2,
    posBtnActive: L2,
    foot: B2,
    sub: q2,
  };
function M2(l) {
  return [...l.guild.party.front, ...l.guild.party.back].filter((n) => n !== null).length;
}
const Kh = (l) => (l === 'front' ? Er : Cr);
function j2(l, n, o, r) {
  if (o < 0 || o >= Kh(n) || (r !== null && !l.guild.members.some((_) => _.id === r))) return l;
  const c = l.guild.party.front.map((_) => (_ === r ? null : _)),
    d = l.guild.party.back.map((_) => (_ === r ? null : _));
  for (; c.length < Er; ) c.push(null);
  for (; d.length < Cr; ) d.push(null);
  return (
    n === 'front' ? (c[o] = r) : (d[o] = r),
    { ...l, guild: { ...l.guild, party: { front: c, back: d } } }
  );
}
function Zh(l, n) {
  const o = l.guild.party.front.map((c) => (c === n ? null : c)),
    r = l.guild.party.back.map((c) => (c === n ? null : c));
  return { ...l, guild: { ...l.guild, party: { front: o, back: r } } };
}
function Rp(l, n, o) {
  if (
    !l.guild.members.some((h) => h.id === n) ||
    (o === 'front' ? l.guild.party.front : l.guild.party.back).includes(n)
  )
    return l;
  const c = Zh(l, n),
    d = o === 'front' ? c.guild.party.front : c.guild.party.back;
  let _ = d.indexOf(null);
  if (_ < 0)
    if (d.length < Kh(o)) _ = d.length;
    else return l;
  return j2(c, o, _, n);
}
function O2(l, n) {
  return l.guild.party.front.includes(n)
    ? '前衛'
    : l.guild.party.back.includes(n)
      ? '後衛'
      : '控え';
}
const D2 = () => {
    const l = dl(),
      { save: n, applyAndPersist: o } = Ul(),
      r = Object.keys(At),
      c = Object.keys(_t),
      [d, _] = C.useState(''),
      [h, k] = C.useState(r[0]),
      [p, v] = C.useState(c[0]),
      [y, S] = C.useState(!1),
      L = C.useCallback(async () => {
        const w = d.trim() || '名もなき冒険者',
          E = Dh({ raceId: h, classId: p, name: w });
        (S(!0), await o((T) => R1(T, E)), _(''), S(!1));
      }, [d, h, p, o]);
    if (!n) return f.jsx(ol, { to: '/title', replace: !0 });
    const { members: b } = n.guild,
      B = b.length >= yc;
    return f.jsxs('div', {
      className: je.layout,
      children: [
        f.jsxs('header', {
          className: je.head,
          children: [
            f.jsx('h1', { className: je.title, children: 'ギルド管理' }),
            f.jsxs('span', { className: je.count, children: ['団員 ', b.length, ' / ', yc] }),
          ],
        }),
        f.jsxs('section', {
          className: je.create,
          children: [
            f.jsx('h2', { className: je.sectionTitle, children: '冒険者を作成' }),
            f.jsxs('label', {
              className: je.field,
              children: [
                f.jsx('span', { children: '名前' }),
                f.jsx('input', {
                  type: 'text',
                  value: d,
                  maxLength: 16,
                  placeholder: '名もなき冒険者',
                  onChange: (w) => _(w.target.value),
                }),
              ],
            }),
            f.jsxs('label', {
              className: je.field,
              children: [
                f.jsx('span', { children: '種族' }),
                f.jsx('select', {
                  value: h,
                  onChange: (w) => k(w.target.value),
                  children: r.map((w) => f.jsx('option', { value: w, children: At[w].name }, w)),
                }),
              ],
            }),
            f.jsxs('label', {
              className: je.field,
              children: [
                f.jsx('span', { children: '職業' }),
                f.jsx('select', {
                  value: p,
                  onChange: (w) => v(w.target.value),
                  children: c.map((w) => f.jsx('option', { value: w, children: _t[w].name }, w)),
                }),
              ],
            }),
            f.jsx('button', {
              type: 'button',
              className: je.primary,
              disabled: y || B,
              onClick: () => void L(),
              children: B ? '団員が上限です' : '作成する',
            }),
          ],
        }),
        f.jsxs('section', {
          className: je.list,
          children: [
            f.jsxs('h2', {
              className: je.sectionTitle,
              children: [
                '団員一覧',
                ' ',
                f.jsxs('span', {
                  className: je.count,
                  children: ['（出撃 ', M2(n), ' / ', vb, '）'],
                }),
              ],
            }),
            b.length === 0
              ? f.jsx('p', { className: je.empty, children: 'まだ冒険者がいません。' })
              : f.jsx('ul', {
                  className: je.members,
                  children: b.map((w) => {
                    var T, R;
                    const E = O2(n, w.id);
                    return f.jsxs(
                      'li',
                      {
                        className: je.member,
                        children: [
                          f.jsxs('button', {
                            type: 'button',
                            className: je.memberMain,
                            onClick: () => l(`/guild/char/${w.id}`),
                            children: [
                              f.jsxs('span', {
                                className: je.memberName,
                                children: [
                                  w.name,
                                  f.jsx('span', {
                                    className: `${je.pos} ${je[`pos_${E}`] ?? ''}`,
                                    children: E,
                                  }),
                                ],
                              }),
                              f.jsxs('span', {
                                className: je.memberSub,
                                children: [
                                  (T = At[w.raceId]) == null ? void 0 : T.name,
                                  ' / ',
                                  (R = _t[w.classId]) == null ? void 0 : R.name,
                                  ' / Lv',
                                  w.level,
                                  ' ›',
                                ],
                              }),
                            ],
                          }),
                          f.jsxs('div', {
                            className: je.posBtns,
                            children: [
                              f.jsx('button', {
                                type: 'button',
                                className: `${je.posBtn} ${E === '前衛' ? je.posBtnActive : ''}`,
                                onClick: () => void o((W) => Rp(W, w.id, 'front')),
                                children: '前',
                              }),
                              f.jsx('button', {
                                type: 'button',
                                className: `${je.posBtn} ${E === '後衛' ? je.posBtnActive : ''}`,
                                onClick: () => void o((W) => Rp(W, w.id, 'back')),
                                children: '後',
                              }),
                              f.jsx('button', {
                                type: 'button',
                                className: `${je.posBtn} ${E === '控え' ? je.posBtnActive : ''}`,
                                onClick: () => void o((W) => Zh(W, w.id)),
                                children: '控',
                              }),
                            ],
                          }),
                        ],
                      },
                      w.id
                    );
                  }),
                }),
          ],
        }),
        f.jsx('footer', {
          className: je.foot,
          children: f.jsx('button', {
            type: 'button',
            className: je.sub,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  I2 = '_layout_c3v63_1',
  R2 = '_head_c3v63_12',
  z2 = '_title_c3v63_16',
  U2 = '_sub_c3v63_22',
  H2 = '_card_c3v63_27',
  G2 = '_h2_c3v63_35',
  $2 = '_sp_c3v63_44',
  Y2 = '_stats_c3v63_50',
  X2 = '_equipSlot_c3v63_74',
  V2 = '_equipHead_c3v63_82',
  Q2 = '_slotLabel_c3v63_88',
  K2 = '_equipName_c3v63_95',
  Z2 = '_smallBtn_c3v63_100',
  J2 = '_equipPick_c3v63_110',
  P2 = '_pickBtn_c3v63_118',
  W2 = '_jobRow_c3v63_185',
  F2 = '_select_c3v63_192',
  eS = '_input_c3v63_193',
  tS = '_actBtn_c3v63_203',
  lS = '_warn_c3v63_220',
  aS = '_titleHave_c3v63_227',
  iS = '_titleOpts_c3v63_233',
  nS = '_titleBtn_c3v63_240',
  sS = '_rbForm_c3v63_252',
  rS = '_danger_c3v63_258',
  oS = '_foot_c3v63_270',
  uS = '_back_c3v63_274',
  cS = '_skillTabs_c3v63_284',
  dS = '_skillTab_c3v63_284',
  mS = '_skillTabOn_c3v63_304',
  ue = {
    layout: I2,
    head: R2,
    title: z2,
    sub: U2,
    card: H2,
    h2: G2,
    sp: $2,
    stats: Y2,
    equipSlot: X2,
    equipHead: V2,
    slotLabel: Q2,
    equipName: K2,
    smallBtn: Z2,
    equipPick: J2,
    pickBtn: P2,
    jobRow: W2,
    select: F2,
    input: eS,
    actBtn: tS,
    warn: lS,
    titleHave: aS,
    titleOpts: iS,
    titleBtn: nS,
    rbForm: sS,
    danger: rS,
    foot: oS,
    back: uS,
    skillTabs: cS,
    skillTab: dS,
    skillTabOn: mS,
  },
  _S = '_wrap_1ke60_1',
  fS = '_scroll_1ke60_7',
  pS = '_canvas_1ke60_17',
  hS = '_edges_1ke60_21',
  gS = '_edge_1ke60_21',
  kS = '_edgeLabel_1ke60_34',
  vS = '_node_1ke60_40',
  yS = '_learned_1ke60_57',
  bS = '_maxed_1ke60_62',
  xS = '_available_1ke60_67',
  SS = '_locked_1ke60_72',
  wS = '_selected_1ke60_76',
  TS = '_nodeName_1ke60_81',
  ES = '_nodeCost_1ke60_92',
  CS = '_nodeLv_1ke60_104',
  NS = '_lvNum_1ke60_112',
  AS = '_lvBar_1ke60_118',
  LS = '_lvFill_1ke60_126',
  BS = '_lvMax_1ke60_132',
  qS = '_detail_1ke60_136',
  MS = '_detailName_1ke60_143',
  jS = '_detailLv_1ke60_151',
  OS = '_detailDesc_1ke60_157',
  DS = '_detailReq_1ke60_164',
  IS = '_hint_1ke60_170',
  Xe = {
    wrap: _S,
    scroll: fS,
    canvas: pS,
    edges: hS,
    edge: gS,
    edgeLabel: kS,
    node: vS,
    learned: yS,
    maxed: bS,
    available: xS,
    locked: SS,
    selected: wS,
    nodeName: TS,
    nodeCost: ES,
    nodeLv: CS,
    lvNum: NS,
    lvBar: AS,
    lvFill: LS,
    lvMax: BS,
    detail: qS,
    detailName: MS,
    detailLv: jS,
    detailDesc: OS,
    detailReq: DS,
    hint: IS,
  },
  zp = [1, 2, 2, 2, 2];
function Jh(l) {
  return zp[Math.min(Math.max(0, l), zp.length - 1)];
}
function Ph(l) {
  var o, r;
  const n = [
    ...(((o = _t[l.classId]) == null ? void 0 : o.skillTree.skills) ?? []),
    ...(((r = At[l.raceId]) == null ? void 0 : r.raceSkillTree.skills) ?? []),
  ];
  return (l.titleId && _a[l.titleId] && n.push(..._a[l.titleId].skillTree.skills), n);
}
function RS(l, n) {
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
  return c(n);
}
function Br(l, n) {
  return Jh(RS(Ph(l), n));
}
function Ti(l, n) {
  return l.learnedSkills[n] ?? 0;
}
function Wh(l) {
  return l.skillPoints.total - l.skillPoints.spent;
}
function zS(l, n) {
  return (n.requires ?? []).every((o) => Ti(l, o.skillId) >= o.level);
}
function Fh(l, n) {
  const o = Ph(l).find((r) => r.skillId === n);
  return !o || Ti(l, n) >= o.maxLevel || Wh(l) < Br(l, n) ? !1 : zS(l, o);
}
function US(l, n) {
  return Fh(l, n)
    ? {
        ...l,
        learnedSkills: { ...l.learnedSkills, [n]: Ti(l, n) + 1 },
        skillPoints: { ...l.skillPoints, spent: l.skillPoints.spent + Br(l, n) },
      }
    : l;
}
const pc = 132,
  hc = 48,
  rr = 176,
  or = 62,
  HS = ({ nodes: l, char: n, onLearn: o }) => {
    var k;
    const [r, c] = C.useState(null),
      d = C.useMemo(() => {
        var T;
        const p = new Map(l.map((R) => [R.skillId, R])),
          v = new Map(),
          y = (R, W = 0) => {
            var z;
            if (v.has(R)) return v.get(R);
            const K = p.get(R);
            if (!K || !((z = K.requires) != null && z.length) || W > 20) return (v.set(R, 0), 0);
            const Y =
              1 + Math.max(...K.requires.map((Q) => (p.has(Q.skillId) ? y(Q.skillId, W + 1) : 0)));
            return (v.set(R, Y), Y);
          },
          S = [];
        l.forEach((R, W) => {
          const K = y(R.skillId);
          (S[K] || (S[K] = [])).push(W);
        });
        const L = new Map(),
          b = S.map(() => new Set());
        for (let R = 0; R < S.length; R++)
          for (const W of S[R] ?? []) {
            const K = l[W];
            let Y = 0;
            if (R > 0 && (T = K.requires) != null && T.length) {
              const Q = K.requires.map((P) => L.get(P.skillId)).filter((P) => P !== void 0);
              Q.length && (Y = Math.min(...Q));
            }
            let z = Y;
            for (; b[R].has(z); ) z++;
            (b[R].add(z), L.set(K.skillId, z));
          }
        const B = Math.max(0, ...L.values()),
          w = l.map((R) => ({ node: R, col: y(R.skillId), row: L.get(R.skillId) ?? 0 })),
          E = [];
        for (const R of w)
          for (const W of R.node.requires ?? []) {
            const K = w.find((Y) => Y.node.skillId === W.skillId);
            K &&
              E.push({
                from: W.skillId,
                to: R.node.skillId,
                level: W.level,
                x1: K.col * rr + pc,
                y1: K.row * or + hc / 2,
                x2: R.col * rr,
                y2: R.row * or + hc / 2,
              });
          }
        return { placed: w, edges: E, width: (S.length - 1) * rr + pc, height: (B + 1) * or };
      }, [l]),
      _ = r ? Ln[r] : null,
      h = r ? l.find((p) => p.skillId === r) : null;
    return f.jsxs('div', {
      className: Xe.wrap,
      children: [
        f.jsx('div', {
          className: Xe.scroll,
          children: f.jsxs('div', {
            className: Xe.canvas,
            style: { width: d.width, height: d.height },
            children: [
              f.jsx('svg', {
                className: Xe.edges,
                width: d.width,
                height: d.height,
                children: d.edges.map((p) => {
                  const v = (p.x1 + p.x2) / 2;
                  return f.jsxs(
                    'g',
                    {
                      children: [
                        f.jsx('path', {
                          className: Xe.edge,
                          d: `M ${p.x1} ${p.y1} H ${v} V ${p.y2} H ${p.x2}`,
                          fill: 'none',
                        }),
                        f.jsxs('text', {
                          className: Xe.edgeLabel,
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
                var E;
                const S = Ti(n, p.skillId),
                  L = S >= p.maxLevel,
                  b = (p.requires ?? []).every((T) => Ti(n, T.skillId) >= T.level),
                  B = Fh(n, p.skillId),
                  w = [
                    Xe.node,
                    S > 0 ? Xe.learned : '',
                    L ? Xe.maxed : '',
                    B ? Xe.available : '',
                    b ? '' : Xe.locked,
                    r === p.skillId ? Xe.selected : '',
                  ]
                    .filter(Boolean)
                    .join(' ');
                return f.jsxs(
                  'button',
                  {
                    type: 'button',
                    className: w,
                    style: { left: v * rr, top: y * or, width: pc, height: hc },
                    onClick: () => {
                      (c(p.skillId), B && o(p.skillId));
                    },
                    children: [
                      f.jsx('span', {
                        className: Xe.nodeName,
                        children: ((E = Ln[p.skillId]) == null ? void 0 : E.name) ?? p.skillId,
                      }),
                      f.jsxs('span', { className: Xe.nodeCost, children: ['SP', Jh(v)] }),
                      f.jsxs('span', {
                        className: Xe.nodeLv,
                        children: [
                          f.jsx('span', { className: Xe.lvNum, children: S }),
                          f.jsx('span', {
                            className: Xe.lvBar,
                            children: f.jsx('span', {
                              className: Xe.lvFill,
                              style: { width: `${(S / p.maxLevel) * 100}%` },
                            }),
                          }),
                          f.jsx('span', { className: Xe.lvMax, children: p.maxLevel }),
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
              className: Xe.detail,
              children: [
                f.jsxs('div', {
                  className: Xe.detailName,
                  children: [
                    _.name,
                    f.jsxs('span', {
                      className: Xe.detailLv,
                      children: ['Lv ', Ti(n, _.id), '/', (h == null ? void 0 : h.maxLevel) ?? 0],
                    }),
                  ],
                }),
                f.jsx('div', { className: Xe.detailDesc, children: _.description }),
                (k = h == null ? void 0 : h.requires) != null && k.length
                  ? f.jsxs('div', {
                      className: Xe.detailReq,
                      children: [
                        '前提:',
                        ' ',
                        h.requires
                          .map((p) => {
                            var v;
                            return `${((v = Ln[p.skillId]) == null ? void 0 : v.name) ?? p.skillId} Lv${p.level}`;
                          })
                          .join('・'),
                      ],
                    })
                  : null,
              ],
            })
          : f.jsx('div', {
              className: Xe.hint,
              children:
                'ノードをタップで習得（1Lvあたりの消費SPは各ノードの「SP◯」。深いスキルほど高コスト）。緑=習得済 / 枠強調=習得可 / 暗=前提未達。',
            }),
      ],
    });
  },
  eg = ['weapon', 'armor', 'accessory'];
function tg(l, n, o) {
  return { ...l, guild: { ...l.guild, members: l.guild.members.map((r) => (r.id === n ? o : r)) } };
}
function GS(l) {
  var n, o;
  return (o = (n = _t[l]) == null ? void 0 : n.skillTree.skills[0]) == null ? void 0 : o.skillId;
}
function $S(l) {
  var n;
  return new Set(
    (((n = At[l]) == null ? void 0 : n.raceSkillTree.skills) ?? []).map((o) => o.skillId)
  );
}
const YS = (l, n) => {
  const o = { ...l };
  let r = 0;
  for (const [c, d] of Object.entries(n)) r += Br(o, c) * d;
  return r;
};
function XS(l, n) {
  if (!_t[n]) return l;
  const o = $S(l.raceId);
  let r = {};
  for (const [p, v] of Object.entries(l.learnedSkills)) o.has(p) && (r[p] = v);
  const c = GS(n);
  c && !r[c] && (r[c] = 1);
  const d = Math.max(1, l.level - rh),
    _ = hr(d),
    h = { ...l, classId: n, titleId: null, learnedSkills: r };
  let k = YS(h, r) - (c && r[c] ? Br(h, c) : 0);
  return (
    k > _ && ((r = c ? { [c]: 1 } : {}), (k = 0)),
    {
      ...l,
      classId: n,
      titleId: null,
      level: d,
      exp: 0,
      learnedSkills: r,
      skillPoints: { total: _, spent: k },
    }
  );
}
function VS(l, n, o) {
  const r = l.guild.members.find((_) => _.id === n);
  if (!r) return l;
  let c = tg(l, n, XS(r, o));
  const d = c.guild.members.find((_) => _.id === n);
  for (const _ of eg) {
    const h = d.equipment[_];
    h && !Xc(d, h.masterId) && (c = Vc(c, n, _));
  }
  return c;
}
const QS = [
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
function KS(l) {
  const n = QS.find((o) => l >= o.min && l <= o.max);
  return n ? { allStats: n.allStats, bonusSp: n.bonusSp } : null;
}
function lg(l) {
  return l.level >= Bn.REBIRTH_MIN_LEVEL;
}
function ZS(l, n) {
  const o = KS(l.level);
  if (!o) return l;
  const r = Math.min(30, Math.floor(l.level / 2)),
    c = Dh({ ...n, id: l.id }),
    d = hr(r) + o.bonusSp;
  return {
    ...c,
    level: Math.max(1, r),
    exp: 0,
    rebirthBonus: o,
    skillPoints: { total: d, spent: c.skillPoints.spent },
  };
}
function JS(l, n, o) {
  const r = l.guild.members.find((_) => _.id === n);
  if (!r || !lg(r)) return l;
  let c = l;
  for (const _ of eg) r.equipment[_] && (c = Vc(c, n, _));
  const d = c.guild.members.find((_) => _.id === n);
  return tg(c, n, ZS(d, o));
}
function ag(l, n, o) {
  var c;
  return o < Bn.TITLE_DEPTH || l.titleId
    ? !1
    : (((c = _t[l.classId]) == null ? void 0 : c.titleOptions) ?? []).includes(n);
}
function PS(l, n, o) {
  return ag(l, n, o)
    ? { ...l, titleId: n, skillPoints: { ...l.skillPoints, total: l.skillPoints.total + yb } }
    : l;
}
const Up = Object.keys(At),
  ur = Object.keys(_t),
  WS = ['weapon', 'armor', 'accessory'],
  FS = { weapon: '武器', armor: '防具', accessory: '装飾' },
  e5 = [
    { key: 'hp', label: 'HP' },
    { key: 'tp', label: 'TP' },
    { key: 'str', label: 'STR' },
    { key: 'vit', label: 'VIT' },
    { key: 'agi', label: 'AGI' },
    { key: 'int', label: 'INT' },
    { key: 'mnd', label: 'MND' },
    { key: 'luc', label: 'LUC' },
  ],
  t5 = () => {
    var Y, z, Q, P, ne, me, ce, Z, J, _e;
    const l = dl(),
      { id: n } = T0(),
      { save: o, applyAndPersist: r } = Ul(),
      [c, d] = C.useState('class'),
      [_, h] = C.useState(ur[0]),
      [k, p] = C.useState(''),
      [v, y] = C.useState(Up[0]),
      [S, L] = C.useState(ur[0]),
      [b, B] = C.useState(!1);
    if (!o) return f.jsx(ol, { to: '/title', replace: !0 });
    const w = o.guild.members.find((q) => q.id === n);
    if (!w || !n) return f.jsx(ol, { to: '/guild', replace: !0 });
    const E = zn(w),
      T = Wh(w),
      R = o.towerState.record.deepestReached,
      W = (q) =>
        r((V) => ({
          ...V,
          guild: { ...V.guild, members: V.guild.members.map((ee) => (ee.id === n ? q(ee) : ee)) },
        }));
    return f.jsxs('div', {
      className: ue.layout,
      children: [
        f.jsxs('header', {
          className: ue.head,
          children: [
            f.jsx('h1', { className: ue.title, children: w.name }),
            f.jsxs('span', {
              className: ue.sub,
              children: [
                (Y = At[w.raceId]) == null ? void 0 : Y.name,
                ' / ',
                (z = _t[w.classId]) == null ? void 0 : z.name,
                ' / Lv',
                w.level,
              ],
            }),
          ],
        }),
        f.jsxs('section', {
          className: ue.card,
          children: [
            f.jsx('h2', { className: ue.h2, children: 'ステータス' }),
            f.jsx('dl', {
              className: ue.stats,
              children: e5.map((q) =>
                f.jsxs(
                  'div',
                  {
                    children: [
                      f.jsx('dt', { children: q.label }),
                      f.jsx('dd', { children: E[q.key] }),
                    ],
                  },
                  q.key
                )
              ),
            }),
          ],
        }),
        f.jsxs('section', {
          className: ue.card,
          children: [
            f.jsx('h2', { className: ue.h2, children: '装備' }),
            WS.map((q) => {
              const V = w.equipment[q],
                ee = o.guild.equipment.filter((de) => {
                  var ve;
                  return (
                    ((ve = st[de.masterId]) == null ? void 0 : ve.slot) === q && Xc(w, de.masterId)
                  );
                });
              return f.jsxs(
                'div',
                {
                  className: ue.equipSlot,
                  children: [
                    f.jsxs('div', {
                      className: ue.equipHead,
                      children: [
                        f.jsx('span', { className: ue.slotLabel, children: FS[q] }),
                        f.jsx('span', {
                          className: ue.equipName,
                          children: V ? kr(V) : '（なし）',
                        }),
                        V
                          ? f.jsx('button', {
                              type: 'button',
                              className: ue.smallBtn,
                              onClick: () => void K(q),
                              children: '外す',
                            })
                          : null,
                      ],
                    }),
                    ee.length > 0
                      ? f.jsx('div', {
                          className: ue.equipPick,
                          children: ee.map((de) =>
                            f.jsxs(
                              'button',
                              {
                                type: 'button',
                                className: ue.pickBtn,
                                onClick: () => void r((ve) => Db(ve, n, de.id)),
                                children: [kr(de), ' 装備'],
                              },
                              de.id
                            )
                          ),
                        })
                      : null,
                  ],
                },
                q
              );
            }),
          ],
        }),
        f.jsxs('section', {
          className: ue.card,
          children: [
            f.jsxs('h2', {
              className: ue.h2,
              children: ['スキル ', f.jsxs('span', { className: ue.sp, children: ['SP ', T] })],
            }),
            f.jsxs('div', {
              className: ue.skillTabs,
              children: [
                f.jsxs('button', {
                  type: 'button',
                  className: `${ue.skillTab} ${c === 'class' ? ue.skillTabOn : ''}`,
                  onClick: () => d('class'),
                  children: ['職業（', ((Q = _t[w.classId]) == null ? void 0 : Q.name) ?? '', '）'],
                }),
                f.jsxs('button', {
                  type: 'button',
                  className: `${ue.skillTab} ${c === 'race' ? ue.skillTabOn : ''}`,
                  onClick: () => d('race'),
                  children: ['種族（', ((P = At[w.raceId]) == null ? void 0 : P.name) ?? '', '）'],
                }),
                w.titleId
                  ? f.jsxs('button', {
                      type: 'button',
                      className: `${ue.skillTab} ${c === 'title' ? ue.skillTabOn : ''}`,
                      onClick: () => d('title'),
                      children: [
                        '称号（',
                        ((ne = _a[w.titleId]) == null ? void 0 : ne.name) ?? '',
                        '）',
                      ],
                    })
                  : null,
              ],
            }),
            f.jsx(HS, {
              nodes:
                c === 'class'
                  ? (((me = _t[w.classId]) == null ? void 0 : me.skillTree.skills) ?? [])
                  : c === 'race'
                    ? (((ce = At[w.raceId]) == null ? void 0 : ce.raceSkillTree.skills) ?? [])
                    : w.titleId
                      ? (((Z = _a[w.titleId]) == null ? void 0 : Z.skillTree.skills) ?? [])
                      : [],
              char: w,
              onLearn: (q) => void W((V) => US(V, q)),
            }),
          ],
        }),
        f.jsxs('section', {
          className: ue.card,
          children: [
            f.jsx('h2', { className: ue.h2, children: '転職' }),
            f.jsxs('div', {
              className: ue.jobRow,
              children: [
                f.jsx('select', {
                  className: ue.select,
                  value: _,
                  onChange: (q) => h(q.target.value),
                  children: ur.map((q) => f.jsx('option', { value: q, children: _t[q].name }, q)),
                }),
                f.jsx('button', {
                  type: 'button',
                  className: ue.actBtn,
                  disabled: _ === w.classId,
                  onClick: () => void r((q) => VS(q, n, _)),
                  children: '転職する',
                }),
              ],
            }),
            f.jsxs('p', {
              className: ue.warn,
              children: [
                '※ レベルが ',
                rh,
                ' ',
                '下がり、職業/称号スキルは振り直しになります（種族スキルは保持）。',
              ],
            }),
            f.jsx('h2', { className: ue.h2, children: '称号' }),
            w.titleId
              ? f.jsxs('p', {
                  className: ue.titleHave,
                  children: ['習得済み: ', (J = _a[w.titleId]) == null ? void 0 : J.name],
                })
              : R < Bn.TITLE_DEPTH
                ? f.jsxs('p', {
                    className: ue.warn,
                    children: ['第 ', Bn.TITLE_DEPTH, ' 階到達で習得できます（現在 ', R, 'F）。'],
                  })
                : f.jsx('div', {
                    className: ue.titleOpts,
                    children: (((_e = _t[w.classId]) == null ? void 0 : _e.titleOptions) ?? []).map(
                      (q) => {
                        var V;
                        return f.jsxs(
                          'button',
                          {
                            type: 'button',
                            className: ue.titleBtn,
                            disabled: !ag(w, q, R),
                            onClick: () => void W((ee) => PS(ee, q, R)),
                            children: [(V = _a[q]) == null ? void 0 : V.name, '（SP+5）'],
                          },
                          q
                        );
                      }
                    ),
                  }),
            f.jsx('h2', { className: ue.h2, children: '転生' }),
            lg(w)
              ? b
                ? f.jsxs('div', {
                    className: ue.rbForm,
                    children: [
                      f.jsxs('p', {
                        className: ue.warn,
                        children: [
                          '※ 作り直して強い新人になります（開始Lv ',
                          Math.min(30, Math.floor(w.level / 2)),
                          '・ボーナス付き）。',
                        ],
                      }),
                      f.jsx('input', {
                        className: ue.input,
                        type: 'text',
                        maxLength: 16,
                        placeholder: w.name,
                        value: k,
                        onChange: (q) => p(q.target.value),
                      }),
                      f.jsxs('div', {
                        className: ue.jobRow,
                        children: [
                          f.jsx('select', {
                            className: ue.select,
                            value: v,
                            onChange: (q) => y(q.target.value),
                            children: Up.map((q) =>
                              f.jsx('option', { value: q, children: At[q].name }, q)
                            ),
                          }),
                          f.jsx('select', {
                            className: ue.select,
                            value: S,
                            onChange: (q) => L(q.target.value),
                            children: ur.map((q) =>
                              f.jsx('option', { value: q, children: _t[q].name }, q)
                            ),
                          }),
                        ],
                      }),
                      f.jsxs('div', {
                        className: ue.jobRow,
                        children: [
                          f.jsx('button', {
                            type: 'button',
                            className: ue.danger,
                            onClick: () => {
                              (r((q) =>
                                JS(q, n, { raceId: v, classId: S, name: k.trim() || w.name })
                              ),
                                B(!1));
                            },
                            children: '転生を実行',
                          }),
                          f.jsx('button', {
                            type: 'button',
                            className: ue.actBtn,
                            onClick: () => B(!1),
                            children: 'やめる',
                          }),
                        ],
                      }),
                    ],
                  })
                : f.jsx('button', {
                    type: 'button',
                    className: ue.actBtn,
                    onClick: () => B(!0),
                    children: '転生する…',
                  })
              : f.jsxs('p', {
                  className: ue.warn,
                  children: [
                    'Lv',
                    Bn.REBIRTH_MIN_LEVEL,
                    ' 以上で転生できます（現在 Lv',
                    w.level,
                    '）。',
                  ],
                }),
          ],
        }),
        f.jsx('footer', {
          className: ue.foot,
          children: f.jsx('button', {
            type: 'button',
            className: ue.back,
            onClick: () => l('/guild'),
            children: 'もどる',
          }),
        }),
      ],
    });
    function K(q) {
      return r((V) => Vc(V, n, q));
    }
  },
  l5 = () => f.jsx('div', { children: f.jsx('h1', { children: 'Not Found' }) }),
  a5 = '_layout_1u0ua_1',
  i5 = '_head_1u0ua_11',
  n5 = '_title_1u0ua_18',
  s5 = '_gold_1u0ua_24',
  r5 = '_tabs_1u0ua_29',
  o5 = '_tab_1u0ua_29',
  u5 = '_tabActive_1u0ua_46',
  c5 = '_list_1u0ua_51',
  d5 = '_row_1u0ua_59',
  m5 = '_info_1u0ua_70',
  _5 = '_name_1u0ua_76',
  f5 = '_note_1u0ua_81',
  p5 = '_action_1u0ua_86',
  h5 = '_empty_1u0ua_103',
  g5 = '_foot_1u0ua_108',
  k5 = '_back_1u0ua_112',
  Ue = {
    layout: a5,
    head: i5,
    title: n5,
    gold: s5,
    tabs: r5,
    tab: o5,
    tabActive: u5,
    list: c5,
    row: d5,
    info: m5,
    name: _5,
    note: f5,
    action: p5,
    empty: h5,
    foot: g5,
    back: k5,
  };
function v5(l) {
  return Math.max(0, Math.floor(l.towerState.record.deepestReached / 10));
}
const ig = {
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
  y5 = (l, n = 1) => {
    const o = _h(l, n),
      r = [];
    return (
      o.atk && r.push(`ATK+${o.atk}`),
      o.mat && r.push(`MAT+${o.mat}`),
      o.def && r.push(`DEF+${o.def}`),
      o.mdf && r.push(`MDF+${o.mdf}`),
      r.join(' ')
    );
  };
function ng(l, n) {
  var o;
  return ((o = l.shopStock.unlockedGrades) == null ? void 0 : o[n]) ?? 1;
}
function b5(l) {
  const n = v5(l),
    o = new Set(l.shopStock.unlockedItemIds),
    r = Object.values(Fe)
      .filter((d) => d.buyPrice > 0)
      .map((d) => ({ id: d.id, name: d.name, price: d.buyPrice, kind: 'item' }));
  return [
    ...Object.values(st)
      .filter((d) => d.tier <= n || o.has(d.id))
      .map((d) => {
        const _ = ng(l, d.id);
        return {
          id: d.id,
          name: _ > 1 ? `${d.name} Lv${_}` : d.name,
          price: Math.round(d.buyPrice * Ei(_)),
          kind: 'equip',
          note: y5(d.id, _),
        };
      }),
    ...r,
  ];
}
function x5(l) {
  return ig[l] ?? [];
}
function S5(l, n = 1) {
  return Fe[l] ? Fe[l].buyPrice : st[l] ? Math.round(st[l].buyPrice * Ei(n)) : null;
}
function Bc(l, n = 1) {
  return Fe[l]
    ? Math.round(hb(Fe[l]) * Ei(n))
    : st[l]
      ? Math.floor((st[l].buyPrice * Ei(n)) / 2)
      : 0;
}
function w5(l, n) {
  const o = st[n] ? ng(l, n) : 1,
    r = S5(n, o);
  if (r === null || r <= 0 || l.guild.gold < r) return l;
  const c = st[n] ? Ob(l, n, 0, o) : Gc(l, n, 1);
  return { ...c, guild: { ...c.guild, gold: c.guild.gold - r } };
}
function sg(l) {
  var o;
  const n = (((o = st[l.masterId]) == null ? void 0 : o.buyPrice) ?? 0) * Ei(l.grade);
  return Math.floor(n / 2) + l.forgeLevel * 10;
}
function T5(l, n) {
  const o = l.guild.equipment.find((d) => d.id === n);
  if (!o) return l;
  const r = sg(o),
    c = l.guild.equipment.filter((d) => d.id !== n);
  return { ...l, guild: { ...l.guild, equipment: c, gold: l.guild.gold + r } };
}
function E5(l, n, o = 1, r = 1) {
  if (
    l.guild.storage
      .filter((v) => v.itemId === n && (v.grade ?? 1) === r)
      .reduce((v, y) => v + y.qty, 0) < o
  )
    return l;
  const d = Bc(n, r) * o,
    _ = $c(l, n, o, r),
    h = x5(n),
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
const C5 = () => {
    const l = dl(),
      { save: n, applyAndPersist: o } = Ul(),
      [r, c] = C.useState('buy');
    if (!n) return f.jsx(ol, { to: '/title', replace: !0 });
    const d = n.guild.gold,
      _ = b5(n),
      h = n.guild.storage.filter((y) => Bc(y.itemId, y.grade ?? 1) > 0),
      k = n.guild.equipment,
      p = h.length === 0 && k.length === 0,
      v = (y, S = 1) => {
        var b, B;
        const L =
          ((b = Fe[y]) == null ? void 0 : b.name) ?? ((B = st[y]) == null ? void 0 : B.name) ?? y;
        return S > 1 ? `${L} Lv${S}` : L;
      };
    return f.jsxs('div', {
      className: Ue.layout,
      children: [
        f.jsxs('header', {
          className: Ue.head,
          children: [
            f.jsx('h1', { className: Ue.title, children: 'ショップ' }),
            f.jsxs('span', { className: Ue.gold, children: [d, ' G'] }),
          ],
        }),
        f.jsxs('div', {
          className: Ue.tabs,
          children: [
            f.jsx('button', {
              type: 'button',
              className: `${Ue.tab} ${r === 'buy' ? Ue.tabActive : ''}`,
              onClick: () => c('buy'),
              children: '買う',
            }),
            f.jsx('button', {
              type: 'button',
              className: `${Ue.tab} ${r === 'sell' ? Ue.tabActive : ''}`,
              onClick: () => c('sell'),
              children: '売る',
            }),
          ],
        }),
        f.jsx('div', {
          className: Ue.list,
          children:
            r === 'buy'
              ? _.map((y) =>
                  f.jsxs(
                    'div',
                    {
                      className: Ue.row,
                      children: [
                        f.jsxs('div', {
                          className: Ue.info,
                          children: [
                            f.jsx('span', { className: Ue.name, children: y.name }),
                            y.note ? f.jsx('span', { className: Ue.note, children: y.note }) : null,
                          ],
                        }),
                        f.jsxs('button', {
                          type: 'button',
                          className: Ue.action,
                          disabled: d < y.price,
                          onClick: () => void o((S) => w5(S, y.id)),
                          children: [y.price, ' G'],
                        }),
                      ],
                    },
                    y.id
                  )
                )
              : p
                ? f.jsx('p', { className: Ue.empty, children: '売れる物がありません。' })
                : f.jsxs(f.Fragment, {
                    children: [
                      k.map((y) =>
                        f.jsxs(
                          'div',
                          {
                            className: Ue.row,
                            children: [
                              f.jsxs('div', {
                                className: Ue.info,
                                children: [
                                  f.jsx('span', { className: Ue.name, children: kr(y) }),
                                  f.jsx('span', { className: Ue.note, children: '装備' }),
                                ],
                              }),
                              f.jsxs('button', {
                                type: 'button',
                                className: Ue.action,
                                onClick: () => void o((S) => T5(S, y.id)),
                                children: ['売却 ', sg(y), ' G'],
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
                            className: Ue.row,
                            children: [
                              f.jsxs('div', {
                                className: Ue.info,
                                children: [
                                  f.jsx('span', {
                                    className: Ue.name,
                                    children: v(y.itemId, y.grade ?? 1),
                                  }),
                                  f.jsxs('span', {
                                    className: Ue.note,
                                    children: ['所持 ', y.qty],
                                  }),
                                ],
                              }),
                              f.jsxs('button', {
                                type: 'button',
                                className: Ue.action,
                                onClick: () => void o((S) => E5(S, y.itemId, 1, y.grade ?? 1)),
                                children: ['売却 ', Bc(y.itemId, y.grade ?? 1), ' G'],
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
          className: Ue.foot,
          children: f.jsx('button', {
            type: 'button',
            className: Ue.back,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  N5 = '_layout_1xkiw_1',
  A5 = '_head_1xkiw_12',
  L5 = '_title_1xkiw_17',
  B5 = '_subtitle_1xkiw_24',
  q5 = '_body_1xkiw_30',
  M5 = '_menu_1xkiw_34',
  j5 = '_loading_1xkiw_40',
  O5 = '_warn_1xkiw_45',
  D5 = '_danger_1xkiw_52',
  I5 = '_dialog_1xkiw_67',
  R5 = '_dialogTitle_1xkiw_77',
  z5 = '_field_1xkiw_82',
  U5 = '_note_1xkiw_96',
  H5 = '_dialogActions_1xkiw_102',
  G5 = '_primary_1xkiw_107',
  $5 = '_sub_1xkiw_24',
  Y5 = '_foot_1xkiw_132',
  Ze = {
    layout: N5,
    head: A5,
    title: L5,
    subtitle: B5,
    body: q5,
    menu: M5,
    loading: j5,
    warn: O5,
    danger: D5,
    dialog: I5,
    dialogTitle: R5,
    field: z5,
    note: U5,
    dialogActions: H5,
    primary: G5,
    sub: $5,
    foot: Y5,
  },
  X5 = '_card_3vsn6_1',
  V5 = '_corrupted_3vsn6_14',
  Q5 = '_corruptedText_3vsn6_19',
  K5 = '_corruptedNote_3vsn6_25',
  Z5 = '_guildName_3vsn6_31',
  J5 = '_meta_3vsn6_36',
  ma = {
    card: X5,
    corrupted: V5,
    corruptedText: Q5,
    corruptedNote: K5,
    guildName: Z5,
    meta: J5,
    continue: '_continue_3vsn6_56',
  },
  P5 = (l) => {
    if (!l) return '-';
    const n = new Date(l),
      o = (r) => String(r).padStart(2, '0');
    return `${n.getFullYear()}/${o(n.getMonth() + 1)}/${o(n.getDate())} ${o(n.getHours())}:${o(n.getMinutes())}`;
  },
  W5 = ({ meta: l, onContinue: n }) =>
    l.corrupted
      ? f.jsxs('div', {
          className: `${ma.card} ${ma.corrupted}`,
          children: [
            f.jsx('div', { className: ma.corruptedText, children: 'セーブデータが破損しています' }),
            f.jsx('p', {
              className: ma.corruptedNote,
              children: '「最初から」で新しく始められます。',
            }),
          ],
        })
      : f.jsxs('div', {
          className: ma.card,
          children: [
            f.jsx('div', { className: ma.guildName, children: l.guildName }),
            f.jsxs('dl', {
              className: ma.meta,
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
                    f.jsx('dd', { children: P5(l.savedAt) }),
                  ],
                }),
              ],
            }),
            f.jsx('button', {
              type: 'button',
              className: ma.continue,
              onClick: n,
              children: 'つづきから',
            }),
          ],
        }),
  F5 = () => {
    const l = dl(),
      { startNewGame: n, continueGame: o } = Ul(),
      [r, c] = C.useState(null),
      [d, _] = C.useState(!0),
      [h, k] = C.useState('menu'),
      [p, v] = C.useState(''),
      [y, S] = C.useState(!1);
    C.useEffect(() => {
      (async () => (c(await sx()), _(!1)))();
    }, []);
    const L = r !== null && !r.corrupted,
      b = C.useCallback(async () => {
        S(!0);
        const E = await o();
        (S(!1), E.ok && l('/town'));
      }, [o, l]),
      B = C.useCallback(() => {
        (v(''), k(L ? 'confirm' : 'guildName'));
      }, [L]),
      w = C.useCallback(async () => {
        const E = p.trim() || 'ななしのギルド';
        (S(!0), await n(E), S(!1), l('/town'));
      }, [p, n, l]);
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
                          onChange: (E) => v(E.target.value),
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
                          onClick: w,
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
                      r !== null && f.jsx(W5, { meta: r, onContinue: () => void b() }),
                      f.jsx('button', {
                        type: 'button',
                        className: L ? Ze.sub : Ze.primary,
                        onClick: B,
                        children: '最初から',
                      }),
                    ],
                  }),
        }),
        f.jsxs('footer', { className: Ze.foot, children: ['v', '0.1.28'] }),
      ],
    });
  },
  ew = '_layout_uxqv8_1',
  tw = '_head_uxqv8_12',
  lw = '_guildName_uxqv8_16',
  aw = '_stats_uxqv8_21',
  iw = '_hint_uxqv8_40',
  nw = '_menu_uxqv8_50',
  sw = '_foot_uxqv8_57',
  rw = '_exit_uxqv8_61',
  ow = '_warpOverlay_uxqv8_72',
  uw = '_warpPanel_uxqv8_83',
  cw = '_warpTitle_uxqv8_94',
  dw = '_warpBtn_uxqv8_99',
  mw = '_warpClose_uxqv8_110',
  Ut = {
    layout: ew,
    head: tw,
    guildName: lw,
    stats: aw,
    hint: iw,
    menu: nw,
    foot: sw,
    exit: rw,
    warpOverlay: ow,
    warpPanel: uw,
    warpTitle: cw,
    warpBtn: dw,
    warpClose: mw,
  },
  _w = '_button_1tp4a_1',
  fw = '_primary_1tp4a_26',
  pw = '_label_1tp4a_32',
  hw = '_description_1tp4a_37',
  cr = { button: _w, primary: fw, label: pw, description: hw },
  bi = ({ label: l, description: n, variant: o = 'default', disabled: r = !1, onClick: c }) =>
    f.jsxs('button', {
      type: 'button',
      className: `${cr.button} ${o === 'primary' ? cr.primary : ''}`,
      disabled: r,
      onClick: c,
      children: [
        f.jsx('span', { className: cr.label, children: l }),
        n ? f.jsx('span', { className: cr.description, children: n }) : null,
      ],
    }),
  gw = () => {
    const l = dl(),
      { save: n, exitToTitle: o, applyAndPersist: r } = Ul(),
      [c, d] = C.useState(!1);
    if (!n) return f.jsx(ol, { to: '/title', replace: !0 });
    const { guild: _, towerState: h, diveState: k } = n,
      p = _.members.length > 0,
      v = () => {
        (o(), l('/title'));
      },
      y = async () => {
        (k || (await r((b) => Ep(b, 1))), l('/dungeon'));
      },
      S = h.warp.unlockedCheckpoints,
      L = async (b) => {
        (d(!1), await r((B) => Ep(B, b)), l('/dungeon'));
      };
    return f.jsxs('div', {
      className: Ut.layout,
      children: [
        f.jsxs('header', {
          className: Ut.head,
          children: [
            f.jsx('div', { className: Ut.guildName, children: _.name }),
            f.jsxs('dl', {
              className: Ut.stats,
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
            className: Ut.hint,
            children:
              'まずは「ギルド管理」で冒険者を作成してください。団員がいないとダイブできません。',
          }),
        f.jsxs('main', {
          className: Ut.menu,
          children: [
            f.jsx(bi, {
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
            f.jsx(bi, {
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
            f.jsx(bi, {
              label: 'ギルド管理',
              description: '編成・キャラ作成',
              onClick: () => l('/guild'),
            }),
            f.jsx(bi, {
              label: 'ショップ',
              description: '装備・アイテム売買',
              onClick: () => l('/shop'),
            }),
            f.jsx(bi, {
              label: '鍛冶屋',
              description: '装備の強化・リサイクル',
              onClick: () => l('/forge'),
            }),
            f.jsx(bi, {
              label: '図鑑 / 記録',
              description: '到達記録・モンスター図鑑',
              onClick: () => l('/codex'),
            }),
          ],
        }),
        f.jsx('footer', {
          className: Ut.foot,
          children: f.jsx('button', {
            type: 'button',
            className: Ut.exit,
            onClick: v,
            children: 'タイトルへ戻る',
          }),
        }),
        c
          ? f.jsx('div', {
              className: Ut.warpOverlay,
              onClick: () => d(!1),
              children: f.jsxs('div', {
                className: Ut.warpPanel,
                onClick: (b) => b.stopPropagation(),
                children: [
                  f.jsx('div', { className: Ut.warpTitle, children: 'ワープ先を選択' }),
                  S.map((b) =>
                    f.jsxs(
                      'button',
                      {
                        type: 'button',
                        className: Ut.warpBtn,
                        onClick: () => void L(b),
                        children: ['第 ', b, ' 階へ'],
                      },
                      b
                    )
                  ),
                  f.jsx('button', {
                    type: 'button',
                    className: Ut.warpClose,
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
function kw() {
  return f.jsxs(U0, {
    children: [
      f.jsx(Ft, { path: '/', element: f.jsx(ol, { to: '/title', replace: !0 }) }),
      f.jsx(Ft, { path: '/title', element: f.jsx(F5, {}) }),
      f.jsx(Ft, { path: '/town', element: f.jsx(gw, {}) }),
      f.jsx(Ft, { path: '/guild', element: f.jsx(D2, {}) }),
      f.jsx(Ft, { path: '/guild/char/:id', element: f.jsx(t5, {}) }),
      f.jsx(Ft, { path: '/shop', element: f.jsx(C5, {}) }),
      f.jsx(Ft, { path: '/forge', element: f.jsx(d2, {}) }),
      f.jsx(Ft, { path: '/codex', element: f.jsx(zx, {}) }),
      f.jsx(Ft, { path: '/dungeon', element: f.jsx(Y3, {}) }),
      f.jsx(Ft, { path: '/battle', element: f.jsx(cx, {}) }),
      f.jsx(Ft, { path: '*', element: f.jsx(l5, {}) }),
    ],
  });
}
const vw = {
    races: At,
    classes: _t,
    titles: _a,
    skills: Ln,
    unionSkills: Si,
    summons: Bi,
    gatherTypes: qa,
    recipes: qi,
    enemies: ul,
    items: Fe,
    equipment: st,
  },
  yw = /^[a-z]+_[a-z0-9_]+$/;
function il(l, n, o) {
  for (const r of n)
    yw.test(r) || o.push(`[${l}] ID 命名規約違反: "${r}"（期待: <domain>_<name>）`);
}
function gc(l, n, o, r) {
  const c = new Set(n.skills.map((d) => d.skillId));
  for (const d of n.skills) {
    o.has(d.skillId) || r.push(`[${l}] 未定義スキルを参照: "${d.skillId}"`);
    for (const _ of d.requires ?? [])
      c.has(_.skillId) ||
        r.push(`[${l}] スキル "${d.skillId}" の前提 "${_.skillId}" が同ツリーに存在しない`);
  }
}
function bw() {
  var w;
  const l = [],
    {
      races: n,
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
    } = vw;
  (il('races', Object.keys(n), l),
    il('classes', Object.keys(o), l),
    il('titles', Object.keys(r), l),
    il('skills', Object.keys(c), l),
    il('enemies', Object.keys(p), l),
    il('items', Object.keys(v), l),
    il('equipment', Object.keys(y), l));
  const S = (E, T) => {
    for (const [R, W] of Object.entries(T))
      R !== W.id && l.push(`[${E}] キー "${R}" と id "${W.id}" が不一致`);
  };
  (S('races', n),
    S('classes', o),
    S('titles', r),
    S('skills', c),
    S('enemies', p),
    S('items', v),
    S('equipment', y));
  const L = new Set(Object.keys(c)),
    b = new Set(Object.keys(o)),
    B = new Set(Object.keys(r));
  for (const E of Object.values(n)) {
    (b.has(E.defaultClassId) ||
      l.push(`[races] "${E.id}" の defaultClassId "${E.defaultClassId}" が未定義`),
      gc(`races/${E.id}`, E.raceSkillTree, L, l));
    for (const T of E.raceSkillTree.skills) {
      const R = d[T.skillId];
      R &&
        R.raceId !== E.id &&
        l.push(`[races/${E.id}] ユニオンスキル "${T.skillId}" の raceId "${R.raceId}" が不一致`);
    }
  }
  for (const E of Object.values(d)) {
    const T = (w = n[E.raceId]) == null ? void 0 : w.raceSkillTree;
    (!T || !T.skills.some((R) => R.skillId === E.id)) &&
      l.push(`[unionSkills] "${E.id}" が種族 "${E.raceId}" のスキルツリーに無い`);
  }
  il('unionSkills', Object.keys(d), l);
  for (const [E, T] of Object.entries(d))
    (E !== T.id && l.push(`[unionSkills] キー "${E}" と id "${T.id}" が不一致`),
      T.id in c || l.push(`[unionSkills] "${T.id}" が skills に未定義`),
      T.requiredParticipants < 1 &&
        l.push(`[unionSkills] "${T.id}" の requiredParticipants が 1 未満`),
      (T.gaugeCostPerParticipant < 0 || T.gaugeCostPerParticipant > 100) &&
        l.push(`[unionSkills] "${T.id}" の gaugeCostPerParticipant が 0..100 外`),
      T.id in Dl &&
        l.push(
          `[unionSkills] "${T.id}" が BATTLE_SKILLS にも存在（通常スキルとして撃ててしまう）`
        ));
  il('passiveSkills', Object.keys(bc), l);
  for (const [E, T] of Object.entries(bc))
    (E !== T.id && l.push(`[passiveSkills] キー "${E}" と id "${T.id}" が不一致`),
      L.has(T.id) || l.push(`[passiveSkills] "${T.id}" が skills に未定義`),
      T.id in Dl &&
        l.push(`[passiveSkills] "${T.id}" が BATTLE_SKILLS にも存在（戦闘で撃ててしまう）`),
      T.id in d && l.push(`[passiveSkills] "${T.id}" が UNION_SKILLS にも存在`));
  il('summons', Object.keys(_), l);
  for (const [E, T] of Object.entries(_))
    E !== T.id && l.push(`[summons] キー "${E}" と id "${T.id}" が不一致`);
  for (const E of Object.values(Dl))
    for (const T of E.effects)
      T.kind === 'summon' &&
        !(T.summonKind in _) &&
        l.push(`[battleSkills] "${E.id}" の召喚 "${T.summonKind}" が未定義`);
  for (const [E, T] of Object.entries(h)) {
    (E !== T.type && l.push(`[gatherTypes] キー "${E}" と type "${T.type}" が不一致`),
      L.has(T.requiredSkillId) ||
        l.push(`[gatherTypes] "${T.type}" の requiredSkillId "${T.requiredSkillId}" が未定義`));
    for (const R of T.drops) {
      if (!(R.itemId in v))
        l.push(`[gatherTypes] "${T.type}" のドロップ "${R.itemId}" が未定義アイテム`);
      else {
        const W = v[R.itemId].category === 'food';
        (T.food &&
          !W &&
          l.push(`[gatherTypes] 食材系統 "${T.type}" のドロップ "${R.itemId}" が food でない`),
          !T.food &&
            W &&
            l.push(`[gatherTypes] 素材系統 "${T.type}" のドロップ "${R.itemId}" が food`));
      }
      R.weight <= 0 && l.push(`[gatherTypes] "${T.type}" のドロップ重みが正でない`);
    }
  }
  il('recipes', Object.keys(k), l);
  for (const [E, T] of Object.entries(k)) {
    E !== T.id && l.push(`[recipes] キー "${E}" と id "${T.id}" が不一致`);
    for (const R of T.ingredients)
      R.itemId in v
        ? v[R.itemId].category !== 'food' &&
          l.push(`[recipes] "${T.id}" の材料 "${R.itemId}" が food カテゴリでない`)
        : l.push(`[recipes] "${T.id}" の材料 "${R.itemId}" が未定義`);
    T.result.itemId in v
      ? v[T.result.itemId].category !== 'food' &&
        l.push(`[recipes] "${T.id}" の結果 "${T.result.itemId}" が food カテゴリでない`)
      : l.push(`[recipes] "${T.id}" の結果 "${T.result.itemId}" が未定義`);
  }
  for (const E of Object.values(o)) {
    gc(`classes/${E.id}`, E.skillTree, L, l);
    for (const T of E.titleOptions) {
      if (!B.has(T)) {
        l.push(`[classes] "${E.id}" の称号 "${T}" が未定義`);
        continue;
      }
      r[T].parentClassId !== E.id &&
        l.push(`[classes] 称号 "${T}" の parentClassId が "${E.id}" と不一致`);
    }
  }
  for (const E of Object.values(r))
    (b.has(E.parentClassId) ||
      l.push(`[titles] "${E.id}" の parentClassId "${E.parentClassId}" が未定義`),
      gc(`titles/${E.id}`, E.skillTree, L, l));
  for (const E of Object.values(y))
    (E.slot === 'weapon' &&
      !E.weaponType &&
      l.push(`[equipment] "${E.id}" は weapon だが weaponType が未設定`),
      E.slot === 'armor' &&
        !E.armorType &&
        l.push(`[equipment] "${E.id}" は armor だが armorType が未設定`),
      (E.buyPrice < 0 || E.tier < 0) && l.push(`[equipment] "${E.id}" の buyPrice/tier が負`));
  for (const E of Object.values(v))
    (E.buyPrice < 0 && l.push(`[items] "${E.id}" の buyPrice が負`),
      E.category === 'consumable' &&
        !E.useContext &&
        !E.effects &&
        l.push(`[items] 消費アイテム "${E.id}" に useContext も effects も無い（使用不能）`));
  for (const E of Object.values(p))
    for (const T of E.drops ?? [])
      (T.itemId in v || l.push(`[enemies] "${E.id}" のドロップ "${T.itemId}" が未定義アイテム`),
        (T.rate < 0 || T.rate > 1) &&
          l.push(`[enemies] "${E.id}" のドロップ "${T.itemId}" の rate が 0..1 外`));
  for (const [E, T] of Object.entries(ig)) {
    E in v || l.push(`[SELL_UNLOCKS] キー素材 "${E}" が未定義`);
    for (const R of T) R in y || l.push(`[SELL_UNLOCKS] 解放先装備 "${R}" が未定義`);
  }
  return { ok: l.length === 0, errors: l };
}
const Hp = bw();
Hp.ok || console.error('マスターデータ検証エラー:', Hp.errors);
const rg = document.getElementById('root');
if (!rg) throw new Error('Failed to find #root element');
Gv.createRoot(rg).render(
  f.jsx(cy, { basename: '/sekaiju-like-game', children: f.jsx(ux, { children: f.jsx(kw, {}) }) })
);
