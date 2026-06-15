var t_ = Object.defineProperty;
var l_ = (a, u, o) =>
  u in a ? t_(a, u, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (a[u] = o);
var Uo = (a, u, o) => l_(a, typeof u != 'symbol' ? u + '' : u, o);
(function () {
  const u = document.createElement('link').relList;
  if (u && u.supports && u.supports('modulepreload')) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) c(r);
  new MutationObserver((r) => {
    for (const d of r)
      if (d.type === 'childList')
        for (const m of d.addedNodes) m.tagName === 'LINK' && m.rel === 'modulepreload' && c(m);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(r) {
    const d = {};
    return (
      r.integrity && (d.integrity = r.integrity),
      r.referrerPolicy && (d.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === 'use-credentials'
        ? (d.credentials = 'include')
        : r.crossOrigin === 'anonymous'
          ? (d.credentials = 'omit')
          : (d.credentials = 'same-origin'),
      d
    );
  }
  function c(r) {
    if (r.ep) return;
    r.ep = !0;
    const d = o(r);
    fetch(r.href, d);
  }
})();
var Lo = { exports: {} },
  _i = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var qh;
function n_() {
  if (qh) return _i;
  qh = 1;
  var a = Symbol.for('react.transitional.element'),
    u = Symbol.for('react.fragment');
  function o(c, r, d) {
    var m = null;
    if ((d !== void 0 && (m = '' + d), r.key !== void 0 && (m = '' + r.key), 'key' in r)) {
      d = {};
      for (var v in r) v !== 'key' && (d[v] = r[v]);
    } else d = r;
    return ((r = d.ref), { $$typeof: a, type: c, key: m, ref: r !== void 0 ? r : null, props: d });
  }
  return ((_i.Fragment = u), (_i.jsx = o), (_i.jsxs = o), _i);
}
var Gh;
function a_() {
  return (Gh || ((Gh = 1), (Lo.exports = n_())), Lo.exports);
}
var p = a_(),
  Ho = { exports: {} },
  vi = {},
  qo = { exports: {} },
  Go = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Yh;
function i_() {
  return (
    Yh ||
      ((Yh = 1),
      (function (a) {
        function u(U, J) {
          var te = U.length;
          U.push(J);
          e: for (; 0 < te; ) {
            var ge = (te - 1) >>> 1,
              Ee = U[ge];
            if (0 < r(Ee, J)) ((U[ge] = J), (U[te] = Ee), (te = ge));
            else break e;
          }
        }
        function o(U) {
          return U.length === 0 ? null : U[0];
        }
        function c(U) {
          if (U.length === 0) return null;
          var J = U[0],
            te = U.pop();
          if (te !== J) {
            U[0] = te;
            e: for (var ge = 0, Ee = U.length, k = Ee >>> 1; ge < k; ) {
              var q = 2 * (ge + 1) - 1,
                P = U[q],
                le = q + 1,
                pe = U[le];
              if (0 > r(P, te))
                le < Ee && 0 > r(pe, P)
                  ? ((U[ge] = pe), (U[le] = te), (ge = le))
                  : ((U[ge] = P), (U[q] = te), (ge = q));
              else if (le < Ee && 0 > r(pe, te)) ((U[ge] = pe), (U[le] = te), (ge = le));
              else break e;
            }
          }
          return J;
        }
        function r(U, J) {
          var te = U.sortIndex - J.sortIndex;
          return te !== 0 ? te : U.id - J.id;
        }
        if (
          ((a.unstable_now = void 0),
          typeof performance == 'object' && typeof performance.now == 'function')
        ) {
          var d = performance;
          a.unstable_now = function () {
            return d.now();
          };
        } else {
          var m = Date,
            v = m.now();
          a.unstable_now = function () {
            return m.now() - v;
          };
        }
        var _ = [],
          g = [],
          y = 1,
          S = null,
          C = 3,
          R = !1,
          x = !1,
          j = !1,
          b = !1,
          A = typeof setTimeout == 'function' ? setTimeout : null,
          w = typeof clearTimeout == 'function' ? clearTimeout : null,
          $ = typeof setImmediate < 'u' ? setImmediate : null;
        function V(U) {
          for (var J = o(g); J !== null; ) {
            if (J.callback === null) c(g);
            else if (J.startTime <= U) (c(g), (J.sortIndex = J.expirationTime), u(_, J));
            else break;
            J = o(g);
          }
        }
        function K(U) {
          if (((j = !1), V(U), !x))
            if (o(_) !== null) ((x = !0), I || ((I = !0), ue()));
            else {
              var J = o(g);
              J !== null && he(K, J.startTime - U);
            }
        }
        var I = !1,
          Q = -1,
          L = 5,
          Z = -1;
        function ae() {
          return b ? !0 : !(a.unstable_now() - Z < L);
        }
        function ce() {
          if (((b = !1), I)) {
            var U = a.unstable_now();
            Z = U;
            var J = !0;
            try {
              e: {
                ((x = !1), j && ((j = !1), w(Q), (Q = -1)), (R = !0));
                var te = C;
                try {
                  t: {
                    for (V(U), S = o(_); S !== null && !(S.expirationTime > U && ae()); ) {
                      var ge = S.callback;
                      if (typeof ge == 'function') {
                        ((S.callback = null), (C = S.priorityLevel));
                        var Ee = ge(S.expirationTime <= U);
                        if (((U = a.unstable_now()), typeof Ee == 'function')) {
                          ((S.callback = Ee), V(U), (J = !0));
                          break t;
                        }
                        (S === o(_) && c(_), V(U));
                      } else c(_);
                      S = o(_);
                    }
                    if (S !== null) J = !0;
                    else {
                      var k = o(g);
                      (k !== null && he(K, k.startTime - U), (J = !1));
                    }
                  }
                  break e;
                } finally {
                  ((S = null), (C = te), (R = !1));
                }
                J = void 0;
              }
            } finally {
              J ? ue() : (I = !1);
            }
          }
        }
        var ue;
        if (typeof $ == 'function')
          ue = function () {
            $(ce);
          };
        else if (typeof MessageChannel < 'u') {
          var W = new MessageChannel(),
            F = W.port2;
          ((W.port1.onmessage = ce),
            (ue = function () {
              F.postMessage(null);
            }));
        } else
          ue = function () {
            A(ce, 0);
          };
        function he(U, J) {
          Q = A(function () {
            U(a.unstable_now());
          }, J);
        }
        ((a.unstable_IdlePriority = 5),
          (a.unstable_ImmediatePriority = 1),
          (a.unstable_LowPriority = 4),
          (a.unstable_NormalPriority = 3),
          (a.unstable_Profiling = null),
          (a.unstable_UserBlockingPriority = 2),
          (a.unstable_cancelCallback = function (U) {
            U.callback = null;
          }),
          (a.unstable_forceFrameRate = function (U) {
            0 > U || 125 < U
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (L = 0 < U ? Math.floor(1e3 / U) : 5);
          }),
          (a.unstable_getCurrentPriorityLevel = function () {
            return C;
          }),
          (a.unstable_next = function (U) {
            switch (C) {
              case 1:
              case 2:
              case 3:
                var J = 3;
                break;
              default:
                J = C;
            }
            var te = C;
            C = J;
            try {
              return U();
            } finally {
              C = te;
            }
          }),
          (a.unstable_requestPaint = function () {
            b = !0;
          }),
          (a.unstable_runWithPriority = function (U, J) {
            switch (U) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                U = 3;
            }
            var te = C;
            C = U;
            try {
              return J();
            } finally {
              C = te;
            }
          }),
          (a.unstable_scheduleCallback = function (U, J, te) {
            var ge = a.unstable_now();
            switch (
              (typeof te == 'object' && te !== null
                ? ((te = te.delay), (te = typeof te == 'number' && 0 < te ? ge + te : ge))
                : (te = ge),
              U)
            ) {
              case 1:
                var Ee = -1;
                break;
              case 2:
                Ee = 250;
                break;
              case 5:
                Ee = 1073741823;
                break;
              case 4:
                Ee = 1e4;
                break;
              default:
                Ee = 5e3;
            }
            return (
              (Ee = te + Ee),
              (U = {
                id: y++,
                callback: J,
                priorityLevel: U,
                startTime: te,
                expirationTime: Ee,
                sortIndex: -1,
              }),
              te > ge
                ? ((U.sortIndex = te),
                  u(g, U),
                  o(_) === null && U === o(g) && (j ? (w(Q), (Q = -1)) : (j = !0), he(K, te - ge)))
                : ((U.sortIndex = Ee), u(_, U), x || R || ((x = !0), I || ((I = !0), ue()))),
              U
            );
          }),
          (a.unstable_shouldYield = ae),
          (a.unstable_wrapCallback = function (U) {
            var J = C;
            return function () {
              var te = C;
              C = J;
              try {
                return U.apply(this, arguments);
              } finally {
                C = te;
              }
            };
          }));
      })(Go)),
    Go
  );
}
var Xh;
function u_() {
  return (Xh || ((Xh = 1), (qo.exports = i_())), qo.exports);
}
var Yo = { exports: {} },
  ye = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $h;
function s_() {
  if ($h) return ye;
  $h = 1;
  var a = Symbol.for('react.transitional.element'),
    u = Symbol.for('react.portal'),
    o = Symbol.for('react.fragment'),
    c = Symbol.for('react.strict_mode'),
    r = Symbol.for('react.profiler'),
    d = Symbol.for('react.consumer'),
    m = Symbol.for('react.context'),
    v = Symbol.for('react.forward_ref'),
    _ = Symbol.for('react.suspense'),
    g = Symbol.for('react.memo'),
    y = Symbol.for('react.lazy'),
    S = Symbol.for('react.activity'),
    C = Symbol.iterator;
  function R(k) {
    return k === null || typeof k != 'object'
      ? null
      : ((k = (C && k[C]) || k['@@iterator']), typeof k == 'function' ? k : null);
  }
  var x = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    j = Object.assign,
    b = {};
  function A(k, q, P) {
    ((this.props = k), (this.context = q), (this.refs = b), (this.updater = P || x));
  }
  ((A.prototype.isReactComponent = {}),
    (A.prototype.setState = function (k, q) {
      if (typeof k != 'object' && typeof k != 'function' && k != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, k, q, 'setState');
    }),
    (A.prototype.forceUpdate = function (k) {
      this.updater.enqueueForceUpdate(this, k, 'forceUpdate');
    }));
  function w() {}
  w.prototype = A.prototype;
  function $(k, q, P) {
    ((this.props = k), (this.context = q), (this.refs = b), (this.updater = P || x));
  }
  var V = ($.prototype = new w());
  ((V.constructor = $), j(V, A.prototype), (V.isPureReactComponent = !0));
  var K = Array.isArray;
  function I() {}
  var Q = { H: null, A: null, T: null, S: null },
    L = Object.prototype.hasOwnProperty;
  function Z(k, q, P) {
    var le = P.ref;
    return { $$typeof: a, type: k, key: q, ref: le !== void 0 ? le : null, props: P };
  }
  function ae(k, q) {
    return Z(k.type, q, k.props);
  }
  function ce(k) {
    return typeof k == 'object' && k !== null && k.$$typeof === a;
  }
  function ue(k) {
    var q = { '=': '=0', ':': '=2' };
    return (
      '$' +
      k.replace(/[=:]/g, function (P) {
        return q[P];
      })
    );
  }
  var W = /\/+/g;
  function F(k, q) {
    return typeof k == 'object' && k !== null && k.key != null ? ue('' + k.key) : q.toString(36);
  }
  function he(k) {
    switch (k.status) {
      case 'fulfilled':
        return k.value;
      case 'rejected':
        throw k.reason;
      default:
        switch (
          (typeof k.status == 'string'
            ? k.then(I, I)
            : ((k.status = 'pending'),
              k.then(
                function (q) {
                  k.status === 'pending' && ((k.status = 'fulfilled'), (k.value = q));
                },
                function (q) {
                  k.status === 'pending' && ((k.status = 'rejected'), (k.reason = q));
                }
              )),
          k.status)
        ) {
          case 'fulfilled':
            return k.value;
          case 'rejected':
            throw k.reason;
        }
    }
    throw k;
  }
  function U(k, q, P, le, pe) {
    var be = typeof k;
    (be === 'undefined' || be === 'boolean') && (k = null);
    var Ce = !1;
    if (k === null) Ce = !0;
    else
      switch (be) {
        case 'bigint':
        case 'string':
        case 'number':
          Ce = !0;
          break;
        case 'object':
          switch (k.$$typeof) {
            case a:
            case u:
              Ce = !0;
              break;
            case y:
              return ((Ce = k._init), U(Ce(k._payload), q, P, le, pe));
          }
      }
    if (Ce)
      return (
        (pe = pe(k)),
        (Ce = le === '' ? '.' + F(k, 0) : le),
        K(pe)
          ? ((P = ''),
            Ce != null && (P = Ce.replace(W, '$&/') + '/'),
            U(pe, q, P, '', function (G) {
              return G;
            }))
          : pe != null &&
            (ce(pe) &&
              (pe = ae(
                pe,
                P +
                  (pe.key == null || (k && k.key === pe.key)
                    ? ''
                    : ('' + pe.key).replace(W, '$&/') + '/') +
                  Ce
              )),
            q.push(pe)),
        1
      );
    Ce = 0;
    var at = le === '' ? '.' : le + ':';
    if (K(k))
      for (var Xe = 0; Xe < k.length; Xe++)
        ((le = k[Xe]), (be = at + F(le, Xe)), (Ce += U(le, q, P, be, pe)));
    else if (((Xe = R(k)), typeof Xe == 'function'))
      for (k = Xe.call(k), Xe = 0; !(le = k.next()).done; )
        ((le = le.value), (be = at + F(le, Xe++)), (Ce += U(le, q, P, be, pe)));
    else if (be === 'object') {
      if (typeof k.then == 'function') return U(he(k), q, P, le, pe);
      throw (
        (q = String(k)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (q === '[object Object]' ? 'object with keys {' + Object.keys(k).join(', ') + '}' : q) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return Ce;
  }
  function J(k, q, P) {
    if (k == null) return k;
    var le = [],
      pe = 0;
    return (
      U(k, le, '', '', function (be) {
        return q.call(P, be, pe++);
      }),
      le
    );
  }
  function te(k) {
    if (k._status === -1) {
      var q = k._result;
      ((q = q()),
        q.then(
          function (P) {
            (k._status === 0 || k._status === -1) && ((k._status = 1), (k._result = P));
          },
          function (P) {
            (k._status === 0 || k._status === -1) && ((k._status = 2), (k._result = P));
          }
        ),
        k._status === -1 && ((k._status = 0), (k._result = q)));
    }
    if (k._status === 1) return k._result.default;
    throw k._result;
  }
  var ge =
      typeof reportError == 'function'
        ? reportError
        : function (k) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var q = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof k == 'object' && k !== null && typeof k.message == 'string'
                    ? String(k.message)
                    : String(k),
                error: k,
              });
              if (!window.dispatchEvent(q)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', k);
              return;
            }
            console.error(k);
          },
    Ee = {
      map: J,
      forEach: function (k, q, P) {
        J(
          k,
          function () {
            q.apply(this, arguments);
          },
          P
        );
      },
      count: function (k) {
        var q = 0;
        return (
          J(k, function () {
            q++;
          }),
          q
        );
      },
      toArray: function (k) {
        return (
          J(k, function (q) {
            return q;
          }) || []
        );
      },
      only: function (k) {
        if (!ce(k))
          throw Error('React.Children.only expected to receive a single React element child.');
        return k;
      },
    };
  return (
    (ye.Activity = S),
    (ye.Children = Ee),
    (ye.Component = A),
    (ye.Fragment = o),
    (ye.Profiler = r),
    (ye.PureComponent = $),
    (ye.StrictMode = c),
    (ye.Suspense = _),
    (ye.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Q),
    (ye.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (k) {
        return Q.H.useMemoCache(k);
      },
    }),
    (ye.cache = function (k) {
      return function () {
        return k.apply(null, arguments);
      };
    }),
    (ye.cacheSignal = function () {
      return null;
    }),
    (ye.cloneElement = function (k, q, P) {
      if (k == null) throw Error('The argument must be a React element, but you passed ' + k + '.');
      var le = j({}, k.props),
        pe = k.key;
      if (q != null)
        for (be in (q.key !== void 0 && (pe = '' + q.key), q))
          !L.call(q, be) ||
            be === 'key' ||
            be === '__self' ||
            be === '__source' ||
            (be === 'ref' && q.ref === void 0) ||
            (le[be] = q[be]);
      var be = arguments.length - 2;
      if (be === 1) le.children = P;
      else if (1 < be) {
        for (var Ce = Array(be), at = 0; at < be; at++) Ce[at] = arguments[at + 2];
        le.children = Ce;
      }
      return Z(k.type, pe, le);
    }),
    (ye.createContext = function (k) {
      return (
        (k = {
          $$typeof: m,
          _currentValue: k,
          _currentValue2: k,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (k.Provider = k),
        (k.Consumer = { $$typeof: d, _context: k }),
        k
      );
    }),
    (ye.createElement = function (k, q, P) {
      var le,
        pe = {},
        be = null;
      if (q != null)
        for (le in (q.key !== void 0 && (be = '' + q.key), q))
          L.call(q, le) && le !== 'key' && le !== '__self' && le !== '__source' && (pe[le] = q[le]);
      var Ce = arguments.length - 2;
      if (Ce === 1) pe.children = P;
      else if (1 < Ce) {
        for (var at = Array(Ce), Xe = 0; Xe < Ce; Xe++) at[Xe] = arguments[Xe + 2];
        pe.children = at;
      }
      if (k && k.defaultProps)
        for (le in ((Ce = k.defaultProps), Ce)) pe[le] === void 0 && (pe[le] = Ce[le]);
      return Z(k, be, pe);
    }),
    (ye.createRef = function () {
      return { current: null };
    }),
    (ye.forwardRef = function (k) {
      return { $$typeof: v, render: k };
    }),
    (ye.isValidElement = ce),
    (ye.lazy = function (k) {
      return { $$typeof: y, _payload: { _status: -1, _result: k }, _init: te };
    }),
    (ye.memo = function (k, q) {
      return { $$typeof: g, type: k, compare: q === void 0 ? null : q };
    }),
    (ye.startTransition = function (k) {
      var q = Q.T,
        P = {};
      Q.T = P;
      try {
        var le = k(),
          pe = Q.S;
        (pe !== null && pe(P, le),
          typeof le == 'object' && le !== null && typeof le.then == 'function' && le.then(I, ge));
      } catch (be) {
        ge(be);
      } finally {
        (q !== null && P.types !== null && (q.types = P.types), (Q.T = q));
      }
    }),
    (ye.unstable_useCacheRefresh = function () {
      return Q.H.useCacheRefresh();
    }),
    (ye.use = function (k) {
      return Q.H.use(k);
    }),
    (ye.useActionState = function (k, q, P) {
      return Q.H.useActionState(k, q, P);
    }),
    (ye.useCallback = function (k, q) {
      return Q.H.useCallback(k, q);
    }),
    (ye.useContext = function (k) {
      return Q.H.useContext(k);
    }),
    (ye.useDebugValue = function () {}),
    (ye.useDeferredValue = function (k, q) {
      return Q.H.useDeferredValue(k, q);
    }),
    (ye.useEffect = function (k, q) {
      return Q.H.useEffect(k, q);
    }),
    (ye.useEffectEvent = function (k) {
      return Q.H.useEffectEvent(k);
    }),
    (ye.useId = function () {
      return Q.H.useId();
    }),
    (ye.useImperativeHandle = function (k, q, P) {
      return Q.H.useImperativeHandle(k, q, P);
    }),
    (ye.useInsertionEffect = function (k, q) {
      return Q.H.useInsertionEffect(k, q);
    }),
    (ye.useLayoutEffect = function (k, q) {
      return Q.H.useLayoutEffect(k, q);
    }),
    (ye.useMemo = function (k, q) {
      return Q.H.useMemo(k, q);
    }),
    (ye.useOptimistic = function (k, q) {
      return Q.H.useOptimistic(k, q);
    }),
    (ye.useReducer = function (k, q, P) {
      return Q.H.useReducer(k, q, P);
    }),
    (ye.useRef = function (k) {
      return Q.H.useRef(k);
    }),
    (ye.useState = function (k) {
      return Q.H.useState(k);
    }),
    (ye.useSyncExternalStore = function (k, q, P) {
      return Q.H.useSyncExternalStore(k, q, P);
    }),
    (ye.useTransition = function () {
      return Q.H.useTransition();
    }),
    (ye.version = '19.2.5'),
    ye
  );
}
var Vh;
function yr() {
  return (Vh || ((Vh = 1), (Yo.exports = s_())), Yo.exports);
}
var Xo = { exports: {} },
  dt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Qh;
function c_() {
  if (Qh) return dt;
  Qh = 1;
  var a = yr();
  function u(_) {
    var g = 'https://react.dev/errors/' + _;
    if (1 < arguments.length) {
      g += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++) g += '&args[]=' + encodeURIComponent(arguments[y]);
    }
    return (
      'Minified React error #' +
      _ +
      '; visit ' +
      g +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function o() {}
  var c = {
      d: {
        f: o,
        r: function () {
          throw Error(u(522));
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
    r = Symbol.for('react.portal');
  function d(_, g, y) {
    var S = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: S == null ? null : '' + S,
      children: _,
      containerInfo: g,
      implementation: y,
    };
  }
  var m = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function v(_, g) {
    if (_ === 'font') return '';
    if (typeof g == 'string') return g === 'use-credentials' ? g : '';
  }
  return (
    (dt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c),
    (dt.createPortal = function (_, g) {
      var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!g || (g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)) throw Error(u(299));
      return d(_, g, null, y);
    }),
    (dt.flushSync = function (_) {
      var g = m.T,
        y = c.p;
      try {
        if (((m.T = null), (c.p = 2), _)) return _();
      } finally {
        ((m.T = g), (c.p = y), c.d.f());
      }
    }),
    (dt.preconnect = function (_, g) {
      typeof _ == 'string' &&
        (g
          ? ((g = g.crossOrigin),
            (g = typeof g == 'string' ? (g === 'use-credentials' ? g : '') : void 0))
          : (g = null),
        c.d.C(_, g));
    }),
    (dt.prefetchDNS = function (_) {
      typeof _ == 'string' && c.d.D(_);
    }),
    (dt.preinit = function (_, g) {
      if (typeof _ == 'string' && g && typeof g.as == 'string') {
        var y = g.as,
          S = v(y, g.crossOrigin),
          C = typeof g.integrity == 'string' ? g.integrity : void 0,
          R = typeof g.fetchPriority == 'string' ? g.fetchPriority : void 0;
        y === 'style'
          ? c.d.S(_, typeof g.precedence == 'string' ? g.precedence : void 0, {
              crossOrigin: S,
              integrity: C,
              fetchPriority: R,
            })
          : y === 'script' &&
            c.d.X(_, {
              crossOrigin: S,
              integrity: C,
              fetchPriority: R,
              nonce: typeof g.nonce == 'string' ? g.nonce : void 0,
            });
      }
    }),
    (dt.preinitModule = function (_, g) {
      if (typeof _ == 'string')
        if (typeof g == 'object' && g !== null) {
          if (g.as == null || g.as === 'script') {
            var y = v(g.as, g.crossOrigin);
            c.d.M(_, {
              crossOrigin: y,
              integrity: typeof g.integrity == 'string' ? g.integrity : void 0,
              nonce: typeof g.nonce == 'string' ? g.nonce : void 0,
            });
          }
        } else g == null && c.d.M(_);
    }),
    (dt.preload = function (_, g) {
      if (typeof _ == 'string' && typeof g == 'object' && g !== null && typeof g.as == 'string') {
        var y = g.as,
          S = v(y, g.crossOrigin);
        c.d.L(_, y, {
          crossOrigin: S,
          integrity: typeof g.integrity == 'string' ? g.integrity : void 0,
          nonce: typeof g.nonce == 'string' ? g.nonce : void 0,
          type: typeof g.type == 'string' ? g.type : void 0,
          fetchPriority: typeof g.fetchPriority == 'string' ? g.fetchPriority : void 0,
          referrerPolicy: typeof g.referrerPolicy == 'string' ? g.referrerPolicy : void 0,
          imageSrcSet: typeof g.imageSrcSet == 'string' ? g.imageSrcSet : void 0,
          imageSizes: typeof g.imageSizes == 'string' ? g.imageSizes : void 0,
          media: typeof g.media == 'string' ? g.media : void 0,
        });
      }
    }),
    (dt.preloadModule = function (_, g) {
      if (typeof _ == 'string')
        if (g) {
          var y = v(g.as, g.crossOrigin);
          c.d.m(_, {
            as: typeof g.as == 'string' && g.as !== 'script' ? g.as : void 0,
            crossOrigin: y,
            integrity: typeof g.integrity == 'string' ? g.integrity : void 0,
          });
        } else c.d.m(_);
    }),
    (dt.requestFormReset = function (_) {
      c.d.r(_);
    }),
    (dt.unstable_batchedUpdates = function (_, g) {
      return _(g);
    }),
    (dt.useFormState = function (_, g, y) {
      return m.H.useFormState(_, g, y);
    }),
    (dt.useFormStatus = function () {
      return m.H.useHostTransitionStatus();
    }),
    (dt.version = '19.2.5'),
    dt
  );
}
var Kh;
function o_() {
  if (Kh) return Xo.exports;
  Kh = 1;
  function a() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (u) {
        console.error(u);
      }
  }
  return (a(), (Xo.exports = c_()), Xo.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Zh;
function r_() {
  if (Zh) return vi;
  Zh = 1;
  var a = u_(),
    u = yr(),
    o = o_();
  function c(e) {
    var t = 'https://react.dev/errors/' + e;
    if (1 < arguments.length) {
      t += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++) t += '&args[]=' + encodeURIComponent(arguments[l]);
    }
    return (
      'Minified React error #' +
      e +
      '; visit ' +
      t +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function r(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function d(e) {
    var t = e,
      l = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do ((t = e), (t.flags & 4098) !== 0 && (l = t.return), (e = t.return));
      while (e);
    }
    return t.tag === 3 ? l : null;
  }
  function m(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function v(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function _(e) {
    if (d(e) !== e) throw Error(c(188));
  }
  function g(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = d(e)), t === null)) throw Error(c(188));
      return t !== e ? null : e;
    }
    for (var l = e, n = t; ; ) {
      var i = l.return;
      if (i === null) break;
      var s = i.alternate;
      if (s === null) {
        if (((n = i.return), n !== null)) {
          l = n;
          continue;
        }
        break;
      }
      if (i.child === s.child) {
        for (s = i.child; s; ) {
          if (s === l) return (_(i), e);
          if (s === n) return (_(i), t);
          s = s.sibling;
        }
        throw Error(c(188));
      }
      if (l.return !== n.return) ((l = i), (n = s));
      else {
        for (var f = !1, h = i.child; h; ) {
          if (h === l) {
            ((f = !0), (l = i), (n = s));
            break;
          }
          if (h === n) {
            ((f = !0), (n = i), (l = s));
            break;
          }
          h = h.sibling;
        }
        if (!f) {
          for (h = s.child; h; ) {
            if (h === l) {
              ((f = !0), (l = s), (n = i));
              break;
            }
            if (h === n) {
              ((f = !0), (n = s), (l = i));
              break;
            }
            h = h.sibling;
          }
          if (!f) throw Error(c(189));
        }
      }
      if (l.alternate !== n) throw Error(c(190));
    }
    if (l.tag !== 3) throw Error(c(188));
    return l.stateNode.current === l ? e : t;
  }
  function y(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = y(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var S = Object.assign,
    C = Symbol.for('react.element'),
    R = Symbol.for('react.transitional.element'),
    x = Symbol.for('react.portal'),
    j = Symbol.for('react.fragment'),
    b = Symbol.for('react.strict_mode'),
    A = Symbol.for('react.profiler'),
    w = Symbol.for('react.consumer'),
    $ = Symbol.for('react.context'),
    V = Symbol.for('react.forward_ref'),
    K = Symbol.for('react.suspense'),
    I = Symbol.for('react.suspense_list'),
    Q = Symbol.for('react.memo'),
    L = Symbol.for('react.lazy'),
    Z = Symbol.for('react.activity'),
    ae = Symbol.for('react.memo_cache_sentinel'),
    ce = Symbol.iterator;
  function ue(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (ce && e[ce]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var W = Symbol.for('react.client.reference');
  function F(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === W ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case j:
        return 'Fragment';
      case A:
        return 'Profiler';
      case b:
        return 'StrictMode';
      case K:
        return 'Suspense';
      case I:
        return 'SuspenseList';
      case Z:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case x:
          return 'Portal';
        case $:
          return e.displayName || 'Context';
        case w:
          return (e._context.displayName || 'Context') + '.Consumer';
        case V:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case Q:
          return ((t = e.displayName || null), t !== null ? t : F(e.type) || 'Memo');
        case L:
          ((t = e._payload), (e = e._init));
          try {
            return F(e(t));
          } catch {}
      }
    return null;
  }
  var he = Array.isArray,
    U = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    J = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    te = { pending: !1, data: null, method: null, action: null },
    ge = [],
    Ee = -1;
  function k(e) {
    return { current: e };
  }
  function q(e) {
    0 > Ee || ((e.current = ge[Ee]), (ge[Ee] = null), Ee--);
  }
  function P(e, t) {
    (Ee++, (ge[Ee] = e.current), (e.current = t));
  }
  var le = k(null),
    pe = k(null),
    be = k(null),
    Ce = k(null);
  function at(e, t) {
    switch ((P(be, t), P(pe, e), P(le, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? oh(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) ((t = oh(t)), (e = rh(t, e)));
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
    (q(le), P(le, e));
  }
  function Xe() {
    (q(le), q(pe), q(be));
  }
  function G(e) {
    e.memoizedState !== null && P(Ce, e);
    var t = le.current,
      l = rh(t, e.type);
    t !== l && (P(pe, e), P(le, l));
  }
  function oe(e) {
    (pe.current === e && (q(le), q(pe)), Ce.current === e && (q(Ce), (hi._currentValue = te)));
  }
  var de, je;
  function Ae(e) {
    if (de === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        ((de = (t && t[1]) || ''),
          (je =
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
      de +
      e +
      je
    );
  }
  var yt = !1;
  function bs(e, t) {
    if (!e || yt) return '';
    yt = !0;
    var l = Error.prepareStackTrace;
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
                } catch (B) {
                  var D = B;
                }
                Reflect.construct(e, [], X);
              } else {
                try {
                  X.call();
                } catch (B) {
                  D = B;
                }
                e.call(X.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (B) {
                D = B;
              }
              (X = e()) && typeof X.catch == 'function' && X.catch(function () {});
            }
          } catch (B) {
            if (B && D && typeof B.stack == 'string') return [B.stack, D.stack];
          }
          return [null, null];
        },
      };
      n.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
      var i = Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot, 'name');
      i &&
        i.configurable &&
        Object.defineProperty(n.DetermineComponentFrameRoot, 'name', {
          value: 'DetermineComponentFrameRoot',
        });
      var s = n.DetermineComponentFrameRoot(),
        f = s[0],
        h = s[1];
      if (f && h) {
        var E = f.split(`
`),
          z = h.split(`
`);
        for (i = n = 0; n < E.length && !E[n].includes('DetermineComponentFrameRoot'); ) n++;
        for (; i < z.length && !z[i].includes('DetermineComponentFrameRoot'); ) i++;
        if (n === E.length || i === z.length)
          for (n = E.length - 1, i = z.length - 1; 1 <= n && 0 <= i && E[n] !== z[i]; ) i--;
        for (; 1 <= n && 0 <= i; n--, i--)
          if (E[n] !== z[i]) {
            if (n !== 1 || i !== 1)
              do
                if ((n--, i--, 0 > i || E[n] !== z[i])) {
                  var H =
                    `
` + E[n].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      H.includes('<anonymous>') &&
                      (H = H.replace('<anonymous>', e.displayName)),
                    H
                  );
                }
              while (1 <= n && 0 <= i);
            break;
          }
      }
    } finally {
      ((yt = !1), (Error.prepareStackTrace = l));
    }
    return (l = e ? e.displayName || e.name : '') ? Ae(l) : '';
  }
  function Oy(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ae(e.type);
      case 16:
        return Ae('Lazy');
      case 13:
        return e.child !== t && t !== null ? Ae('Suspense Fallback') : Ae('Suspense');
      case 19:
        return Ae('SuspenseList');
      case 0:
      case 15:
        return bs(e.type, !1);
      case 11:
        return bs(e.type.render, !1);
      case 1:
        return bs(e.type, !0);
      case 31:
        return Ae('Activity');
      default:
        return '';
    }
  }
  function Hr(e) {
    try {
      var t = '',
        l = null;
      do ((t += Oy(e, l)), (l = e), (e = e.return));
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
  var Ss = Object.prototype.hasOwnProperty,
    xs = a.unstable_scheduleCallback,
    Es = a.unstable_cancelCallback,
    zy = a.unstable_shouldYield,
    wy = a.unstable_requestPaint,
    Tt = a.unstable_now,
    Dy = a.unstable_getCurrentPriorityLevel,
    qr = a.unstable_ImmediatePriority,
    Gr = a.unstable_UserBlockingPriority,
    Di = a.unstable_NormalPriority,
    By = a.unstable_LowPriority,
    Yr = a.unstable_IdlePriority,
    Uy = a.log,
    Ly = a.unstable_setDisableYieldValue,
    ka = null,
    Nt = null;
  function zl(e) {
    if ((typeof Uy == 'function' && Ly(e), Nt && typeof Nt.setStrictMode == 'function'))
      try {
        Nt.setStrictMode(ka, e);
      } catch {}
  }
  var kt = Math.clz32 ? Math.clz32 : Gy,
    Hy = Math.log,
    qy = Math.LN2;
  function Gy(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Hy(e) / qy) | 0)) | 0);
  }
  var Bi = 256,
    Ui = 262144,
    Li = 4194304;
  function on(e) {
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
  function Hi(e, t, l) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var i = 0,
      s = e.suspendedLanes,
      f = e.pingedLanes;
    e = e.warmLanes;
    var h = n & 134217727;
    return (
      h !== 0
        ? ((n = h & ~s),
          n !== 0
            ? (i = on(n))
            : ((f &= h), f !== 0 ? (i = on(f)) : l || ((l = h & ~e), l !== 0 && (i = on(l)))))
        : ((h = n & ~s),
          h !== 0
            ? (i = on(h))
            : f !== 0
              ? (i = on(f))
              : l || ((l = n & ~e), l !== 0 && (i = on(l)))),
      i === 0
        ? 0
        : t !== 0 &&
            t !== i &&
            (t & s) === 0 &&
            ((s = i & -i), (l = t & -t), s >= l || (s === 32 && (l & 4194048) !== 0))
          ? t
          : i
    );
  }
  function Aa(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Yy(e, t) {
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
  function Xr() {
    var e = Li;
    return ((Li <<= 1), (Li & 62914560) === 0 && (Li = 4194304), e);
  }
  function Ts(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function Ca(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function Xy(e, t, l, n, i, s) {
    var f = e.pendingLanes;
    ((e.pendingLanes = l),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= l),
      (e.entangledLanes &= l),
      (e.errorRecoveryDisabledLanes &= l),
      (e.shellSuspendCounter = 0));
    var h = e.entanglements,
      E = e.expirationTimes,
      z = e.hiddenUpdates;
    for (l = f & ~l; 0 < l; ) {
      var H = 31 - kt(l),
        X = 1 << H;
      ((h[H] = 0), (E[H] = -1));
      var D = z[H];
      if (D !== null)
        for (z[H] = null, H = 0; H < D.length; H++) {
          var B = D[H];
          B !== null && (B.lane &= -536870913);
        }
      l &= ~X;
    }
    (n !== 0 && $r(e, n, 0),
      s !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= s & ~(f & ~t)));
  }
  function $r(e, t, l) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var n = 31 - kt(t);
    ((e.entangledLanes |= t),
      (e.entanglements[n] = e.entanglements[n] | 1073741824 | (l & 261930)));
  }
  function Vr(e, t) {
    var l = (e.entangledLanes |= t);
    for (e = e.entanglements; l; ) {
      var n = 31 - kt(l),
        i = 1 << n;
      ((i & t) | (e[n] & t) && (e[n] |= t), (l &= ~i));
    }
  }
  function Qr(e, t) {
    var l = t & -t;
    return ((l = (l & 42) !== 0 ? 1 : Ns(l)), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l);
  }
  function Ns(e) {
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
  function ks(e) {
    return ((e &= -e), 2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function Kr() {
    var e = J.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : zh(e.type));
  }
  function Zr(e, t) {
    var l = J.p;
    try {
      return ((J.p = e), t());
    } finally {
      J.p = l;
    }
  }
  var wl = Math.random().toString(36).slice(2),
    st = '__reactFiber$' + wl,
    gt = '__reactProps$' + wl,
    On = '__reactContainer$' + wl,
    As = '__reactEvents$' + wl,
    $y = '__reactListeners$' + wl,
    Vy = '__reactHandles$' + wl,
    Ir = '__reactResources$' + wl,
    Ma = '__reactMarker$' + wl;
  function Cs(e) {
    (delete e[st], delete e[gt], delete e[As], delete e[$y], delete e[Vy]);
  }
  function zn(e) {
    var t = e[st];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if ((t = l[On] || l[st])) {
        if (((l = t.alternate), t.child !== null || (l !== null && l.child !== null)))
          for (e = gh(e); e !== null; ) {
            if ((l = e[st])) return l;
            e = gh(e);
          }
        return t;
      }
      ((e = l), (l = e.parentNode));
    }
    return null;
  }
  function wn(e) {
    if ((e = e[st] || e[On])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function Ra(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(c(33));
  }
  function Dn(e) {
    var t = e[Ir];
    return (t || (t = e[Ir] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function it(e) {
    e[Ma] = !0;
  }
  var Jr = new Set(),
    Wr = {};
  function rn(e, t) {
    (Bn(e, t), Bn(e + 'Capture', t));
  }
  function Bn(e, t) {
    for (Wr[e] = t, e = 0; e < t.length; e++) Jr.add(t[e]);
  }
  var Qy = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    Fr = {},
    Pr = {};
  function Ky(e) {
    return Ss.call(Pr, e)
      ? !0
      : Ss.call(Fr, e)
        ? !1
        : Qy.test(e)
          ? (Pr[e] = !0)
          : ((Fr[e] = !0), !1);
  }
  function qi(e, t, l) {
    if (Ky(t))
      if (l === null) e.removeAttribute(t);
      else {
        switch (typeof l) {
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
        e.setAttribute(t, '' + l);
      }
  }
  function Gi(e, t, l) {
    if (l === null) e.removeAttribute(t);
    else {
      switch (typeof l) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, '' + l);
    }
  }
  function cl(e, t, l, n) {
    if (n === null) e.removeAttribute(l);
    else {
      switch (typeof n) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          e.removeAttribute(l);
          return;
      }
      e.setAttributeNS(t, l, '' + n);
    }
  }
  function Bt(e) {
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
  function ef(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function Zy(e, t, l) {
    var n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (
      !e.hasOwnProperty(t) &&
      typeof n < 'u' &&
      typeof n.get == 'function' &&
      typeof n.set == 'function'
    ) {
      var i = n.get,
        s = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return i.call(this);
          },
          set: function (f) {
            ((l = '' + f), s.call(this, f));
          },
        }),
        Object.defineProperty(e, t, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return l;
          },
          setValue: function (f) {
            l = '' + f;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function Ms(e) {
    if (!e._valueTracker) {
      var t = ef(e) ? 'checked' : 'value';
      e._valueTracker = Zy(e, t, '' + e[t]);
    }
  }
  function tf(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(),
      n = '';
    return (
      e && (n = ef(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = n),
      e !== l ? (t.setValue(e), !0) : !1
    );
  }
  function Yi(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Iy = /[\n"\\]/g;
  function Ut(e) {
    return e.replace(Iy, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function Rs(e, t, l, n, i, s, f, h) {
    ((e.name = ''),
      f != null && typeof f != 'function' && typeof f != 'symbol' && typeof f != 'boolean'
        ? (e.type = f)
        : e.removeAttribute('type'),
      t != null
        ? f === 'number'
          ? ((t === 0 && e.value === '') || e.value != t) && (e.value = '' + Bt(t))
          : e.value !== '' + Bt(t) && (e.value = '' + Bt(t))
        : (f !== 'submit' && f !== 'reset') || e.removeAttribute('value'),
      t != null
        ? js(e, f, Bt(t))
        : l != null
          ? js(e, f, Bt(l))
          : n != null && e.removeAttribute('value'),
      i == null && s != null && (e.defaultChecked = !!s),
      i != null && (e.checked = i && typeof i != 'function' && typeof i != 'symbol'),
      h != null && typeof h != 'function' && typeof h != 'symbol' && typeof h != 'boolean'
        ? (e.name = '' + Bt(h))
        : e.removeAttribute('name'));
  }
  function lf(e, t, l, n, i, s, f, h) {
    if (
      (s != null &&
        typeof s != 'function' &&
        typeof s != 'symbol' &&
        typeof s != 'boolean' &&
        (e.type = s),
      t != null || l != null)
    ) {
      if (!((s !== 'submit' && s !== 'reset') || t != null)) {
        Ms(e);
        return;
      }
      ((l = l != null ? '' + Bt(l) : ''),
        (t = t != null ? '' + Bt(t) : l),
        h || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((n = n ?? i),
      (n = typeof n != 'function' && typeof n != 'symbol' && !!n),
      (e.checked = h ? e.checked : !!n),
      (e.defaultChecked = !!n),
      f != null &&
        typeof f != 'function' &&
        typeof f != 'symbol' &&
        typeof f != 'boolean' &&
        (e.name = f),
      Ms(e));
  }
  function js(e, t, l) {
    (t === 'number' && Yi(e.ownerDocument) === e) ||
      e.defaultValue === '' + l ||
      (e.defaultValue = '' + l);
  }
  function Un(e, t, l, n) {
    if (((e = e.options), t)) {
      t = {};
      for (var i = 0; i < l.length; i++) t['$' + l[i]] = !0;
      for (l = 0; l < e.length; l++)
        ((i = t.hasOwnProperty('$' + e[l].value)),
          e[l].selected !== i && (e[l].selected = i),
          i && n && (e[l].defaultSelected = !0));
    } else {
      for (l = '' + Bt(l), t = null, i = 0; i < e.length; i++) {
        if (e[i].value === l) {
          ((e[i].selected = !0), n && (e[i].defaultSelected = !0));
          return;
        }
        t !== null || e[i].disabled || (t = e[i]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function nf(e, t, l) {
    if (t != null && ((t = '' + Bt(t)), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? '' + Bt(l) : '';
  }
  function af(e, t, l, n) {
    if (t == null) {
      if (n != null) {
        if (l != null) throw Error(c(92));
        if (he(n)) {
          if (1 < n.length) throw Error(c(93));
          n = n[0];
        }
        l = n;
      }
      (l == null && (l = ''), (t = l));
    }
    ((l = Bt(t)),
      (e.defaultValue = l),
      (n = e.textContent),
      n === l && n !== '' && n !== null && (e.value = n),
      Ms(e));
  }
  function Ln(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Jy = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function uf(e, t, l) {
    var n = t.indexOf('--') === 0;
    l == null || typeof l == 'boolean' || l === ''
      ? n
        ? e.setProperty(t, '')
        : t === 'float'
          ? (e.cssFloat = '')
          : (e[t] = '')
      : n
        ? e.setProperty(t, l)
        : typeof l != 'number' || l === 0 || Jy.has(t)
          ? t === 'float'
            ? (e.cssFloat = l)
            : (e[t] = ('' + l).trim())
          : (e[t] = l + 'px');
  }
  function sf(e, t, l) {
    if (t != null && typeof t != 'object') throw Error(c(62));
    if (((e = e.style), l != null)) {
      for (var n in l)
        !l.hasOwnProperty(n) ||
          (t != null && t.hasOwnProperty(n)) ||
          (n.indexOf('--') === 0
            ? e.setProperty(n, '')
            : n === 'float'
              ? (e.cssFloat = '')
              : (e[n] = ''));
      for (var i in t) ((n = t[i]), t.hasOwnProperty(i) && l[i] !== n && uf(e, i, n));
    } else for (var s in t) t.hasOwnProperty(s) && uf(e, s, t[s]);
  }
  function Os(e) {
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
  var Wy = new Map([
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
    Fy =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Xi(e) {
    return Fy.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function ol() {}
  var zs = null;
  function ws(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Hn = null,
    qn = null;
  function cf(e) {
    var t = wn(e);
    if (t && (e = t.stateNode)) {
      var l = e[gt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (Rs(
              e,
              l.value,
              l.defaultValue,
              l.defaultValue,
              l.checked,
              l.defaultChecked,
              l.type,
              l.name
            ),
            (t = l.name),
            l.type === 'radio' && t != null)
          ) {
            for (l = e; l.parentNode; ) l = l.parentNode;
            for (
              l = l.querySelectorAll('input[name="' + Ut('' + t) + '"][type="radio"]'), t = 0;
              t < l.length;
              t++
            ) {
              var n = l[t];
              if (n !== e && n.form === e.form) {
                var i = n[gt] || null;
                if (!i) throw Error(c(90));
                Rs(
                  n,
                  i.value,
                  i.defaultValue,
                  i.defaultValue,
                  i.checked,
                  i.defaultChecked,
                  i.type,
                  i.name
                );
              }
            }
            for (t = 0; t < l.length; t++) ((n = l[t]), n.form === e.form && tf(n));
          }
          break e;
        case 'textarea':
          nf(e, l.value, l.defaultValue);
          break e;
        case 'select':
          ((t = l.value), t != null && Un(e, !!l.multiple, t, !1));
      }
    }
  }
  var Ds = !1;
  function of(e, t, l) {
    if (Ds) return e(t, l);
    Ds = !0;
    try {
      var n = e(t);
      return n;
    } finally {
      if (
        ((Ds = !1),
        (Hn !== null || qn !== null) &&
          (Ru(), Hn && ((t = Hn), (e = qn), (qn = Hn = null), cf(t), e)))
      )
        for (t = 0; t < e.length; t++) cf(e[t]);
    }
  }
  function ja(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var n = l[gt] || null;
    if (n === null) return null;
    l = n[t];
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
    if (l && typeof l != 'function') throw Error(c(231, t, typeof l));
    return l;
  }
  var rl = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Bs = !1;
  if (rl)
    try {
      var Oa = {};
      (Object.defineProperty(Oa, 'passive', {
        get: function () {
          Bs = !0;
        },
      }),
        window.addEventListener('test', Oa, Oa),
        window.removeEventListener('test', Oa, Oa));
    } catch {
      Bs = !1;
    }
  var Dl = null,
    Us = null,
    $i = null;
  function rf() {
    if ($i) return $i;
    var e,
      t = Us,
      l = t.length,
      n,
      i = 'value' in Dl ? Dl.value : Dl.textContent,
      s = i.length;
    for (e = 0; e < l && t[e] === i[e]; e++);
    var f = l - e;
    for (n = 1; n <= f && t[l - n] === i[s - n]; n++);
    return ($i = i.slice(e, 1 < n ? 1 - n : void 0));
  }
  function Vi(e) {
    var t = e.keyCode;
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Qi() {
    return !0;
  }
  function ff() {
    return !1;
  }
  function _t(e) {
    function t(l, n, i, s, f) {
      ((this._reactName = l),
        (this._targetInst = i),
        (this.type = n),
        (this.nativeEvent = s),
        (this.target = f),
        (this.currentTarget = null));
      for (var h in e) e.hasOwnProperty(h) && ((l = e[h]), (this[h] = l ? l(s) : s[h]));
      return (
        (this.isDefaultPrevented = (
          s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1
        )
          ? Qi
          : ff),
        (this.isPropagationStopped = ff),
        this
      );
    }
    return (
      S(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var l = this.nativeEvent;
          l &&
            (l.preventDefault
              ? l.preventDefault()
              : typeof l.returnValue != 'unknown' && (l.returnValue = !1),
            (this.isDefaultPrevented = Qi));
        },
        stopPropagation: function () {
          var l = this.nativeEvent;
          l &&
            (l.stopPropagation
              ? l.stopPropagation()
              : typeof l.cancelBubble != 'unknown' && (l.cancelBubble = !0),
            (this.isPropagationStopped = Qi));
        },
        persist: function () {},
        isPersistent: Qi,
      }),
      t
    );
  }
  var fn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Ki = _t(fn),
    za = S({}, fn, { view: 0, detail: 0 }),
    Py = _t(za),
    Ls,
    Hs,
    wa,
    Zi = S({}, za, {
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
      getModifierState: Gs,
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
          : (e !== wa &&
              (wa && e.type === 'mousemove'
                ? ((Ls = e.screenX - wa.screenX), (Hs = e.screenY - wa.screenY))
                : (Hs = Ls = 0),
              (wa = e)),
            Ls);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : Hs;
      },
    }),
    df = _t(Zi),
    eg = S({}, Zi, { dataTransfer: 0 }),
    tg = _t(eg),
    lg = S({}, za, { relatedTarget: 0 }),
    qs = _t(lg),
    ng = S({}, fn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    ag = _t(ng),
    ig = S({}, fn, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    ug = _t(ig),
    sg = S({}, fn, { data: 0 }),
    mf = _t(sg),
    cg = {
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
    og = {
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
    rg = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function fg(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = rg[e]) ? !!t[e] : !1;
  }
  function Gs() {
    return fg;
  }
  var dg = S({}, za, {
      key: function (e) {
        if (e.key) {
          var t = cg[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = Vi(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? og[e.keyCode] || 'Unidentified'
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
      getModifierState: Gs,
      charCode: function (e) {
        return e.type === 'keypress' ? Vi(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? Vi(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    mg = _t(dg),
    hg = S({}, Zi, {
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
    hf = _t(hg),
    pg = S({}, za, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Gs,
    }),
    yg = _t(pg),
    gg = S({}, fn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    _g = _t(gg),
    vg = S({}, Zi, {
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
    bg = _t(vg),
    Sg = S({}, fn, { newState: 0, oldState: 0 }),
    xg = _t(Sg),
    Eg = [9, 13, 27, 32],
    Ys = rl && 'CompositionEvent' in window,
    Da = null;
  rl && 'documentMode' in document && (Da = document.documentMode);
  var Tg = rl && 'TextEvent' in window && !Da,
    pf = rl && (!Ys || (Da && 8 < Da && 11 >= Da)),
    yf = ' ',
    gf = !1;
  function _f(e, t) {
    switch (e) {
      case 'keyup':
        return Eg.indexOf(t.keyCode) !== -1;
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
  function vf(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var Gn = !1;
  function Ng(e, t) {
    switch (e) {
      case 'compositionend':
        return vf(t);
      case 'keypress':
        return t.which !== 32 ? null : ((gf = !0), yf);
      case 'textInput':
        return ((e = t.data), e === yf && gf ? null : e);
      default:
        return null;
    }
  }
  function kg(e, t) {
    if (Gn)
      return e === 'compositionend' || (!Ys && _f(e, t))
        ? ((e = rf()), ($i = Us = Dl = null), (Gn = !1), e)
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
        return pf && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var Ag = {
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
  function bf(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!Ag[e.type] : t === 'textarea';
  }
  function Sf(e, t, l, n) {
    (Hn ? (qn ? qn.push(n) : (qn = [n])) : (Hn = n),
      (t = Uu(t, 'onChange')),
      0 < t.length &&
        ((l = new Ki('onChange', 'change', null, l, n)), e.push({ event: l, listeners: t })));
  }
  var Ba = null,
    Ua = null;
  function Cg(e) {
    nh(e, 0);
  }
  function Ii(e) {
    var t = Ra(e);
    if (tf(t)) return e;
  }
  function xf(e, t) {
    if (e === 'change') return t;
  }
  var Ef = !1;
  if (rl) {
    var Xs;
    if (rl) {
      var $s = 'oninput' in document;
      if (!$s) {
        var Tf = document.createElement('div');
        (Tf.setAttribute('oninput', 'return;'), ($s = typeof Tf.oninput == 'function'));
      }
      Xs = $s;
    } else Xs = !1;
    Ef = Xs && (!document.documentMode || 9 < document.documentMode);
  }
  function Nf() {
    Ba && (Ba.detachEvent('onpropertychange', kf), (Ua = Ba = null));
  }
  function kf(e) {
    if (e.propertyName === 'value' && Ii(Ua)) {
      var t = [];
      (Sf(t, Ua, e, ws(e)), of(Cg, t));
    }
  }
  function Mg(e, t, l) {
    e === 'focusin'
      ? (Nf(), (Ba = t), (Ua = l), Ba.attachEvent('onpropertychange', kf))
      : e === 'focusout' && Nf();
  }
  function Rg(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return Ii(Ua);
  }
  function jg(e, t) {
    if (e === 'click') return Ii(t);
  }
  function Og(e, t) {
    if (e === 'input' || e === 'change') return Ii(t);
  }
  function zg(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var At = typeof Object.is == 'function' ? Object.is : zg;
  function La(e, t) {
    if (At(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var l = Object.keys(e),
      n = Object.keys(t);
    if (l.length !== n.length) return !1;
    for (n = 0; n < l.length; n++) {
      var i = l[n];
      if (!Ss.call(t, i) || !At(e[i], t[i])) return !1;
    }
    return !0;
  }
  function Af(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Cf(e, t) {
    var l = Af(e);
    e = 0;
    for (var n; l; ) {
      if (l.nodeType === 3) {
        if (((n = e + l.textContent.length), e <= t && n >= t)) return { node: l, offset: t - e };
        e = n;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = Af(l);
    }
  }
  function Mf(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Mf(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Rf(e) {
    e =
      e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = Yi(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == 'string';
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = Yi(e.document);
    }
    return t;
  }
  function Vs(e) {
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
  var wg = rl && 'documentMode' in document && 11 >= document.documentMode,
    Yn = null,
    Qs = null,
    Ha = null,
    Ks = !1;
  function jf(e, t, l) {
    var n = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Ks ||
      Yn == null ||
      Yn !== Yi(n) ||
      ((n = Yn),
      'selectionStart' in n && Vs(n)
        ? (n = { start: n.selectionStart, end: n.selectionEnd })
        : ((n = ((n.ownerDocument && n.ownerDocument.defaultView) || window).getSelection()),
          (n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset,
          })),
      (Ha && La(Ha, n)) ||
        ((Ha = n),
        (n = Uu(Qs, 'onSelect')),
        0 < n.length &&
          ((t = new Ki('onSelect', 'select', null, t, l)),
          e.push({ event: t, listeners: n }),
          (t.target = Yn))));
  }
  function dn(e, t) {
    var l = {};
    return (
      (l[e.toLowerCase()] = t.toLowerCase()),
      (l['Webkit' + e] = 'webkit' + t),
      (l['Moz' + e] = 'moz' + t),
      l
    );
  }
  var Xn = {
      animationend: dn('Animation', 'AnimationEnd'),
      animationiteration: dn('Animation', 'AnimationIteration'),
      animationstart: dn('Animation', 'AnimationStart'),
      transitionrun: dn('Transition', 'TransitionRun'),
      transitionstart: dn('Transition', 'TransitionStart'),
      transitioncancel: dn('Transition', 'TransitionCancel'),
      transitionend: dn('Transition', 'TransitionEnd'),
    },
    Zs = {},
    Of = {};
  rl &&
    ((Of = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Xn.animationend.animation,
      delete Xn.animationiteration.animation,
      delete Xn.animationstart.animation),
    'TransitionEvent' in window || delete Xn.transitionend.transition);
  function mn(e) {
    if (Zs[e]) return Zs[e];
    if (!Xn[e]) return e;
    var t = Xn[e],
      l;
    for (l in t) if (t.hasOwnProperty(l) && l in Of) return (Zs[e] = t[l]);
    return e;
  }
  var zf = mn('animationend'),
    wf = mn('animationiteration'),
    Df = mn('animationstart'),
    Dg = mn('transitionrun'),
    Bg = mn('transitionstart'),
    Ug = mn('transitioncancel'),
    Bf = mn('transitionend'),
    Uf = new Map(),
    Is =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  Is.push('scrollEnd');
  function It(e, t) {
    (Uf.set(e, t), rn(t, [e]));
  }
  var Ji =
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
    Lt = [],
    $n = 0,
    Js = 0;
  function Wi() {
    for (var e = $n, t = (Js = $n = 0); t < e; ) {
      var l = Lt[t];
      Lt[t++] = null;
      var n = Lt[t];
      Lt[t++] = null;
      var i = Lt[t];
      Lt[t++] = null;
      var s = Lt[t];
      if (((Lt[t++] = null), n !== null && i !== null)) {
        var f = n.pending;
        (f === null ? (i.next = i) : ((i.next = f.next), (f.next = i)), (n.pending = i));
      }
      s !== 0 && Lf(l, i, s);
    }
  }
  function Fi(e, t, l, n) {
    ((Lt[$n++] = e),
      (Lt[$n++] = t),
      (Lt[$n++] = l),
      (Lt[$n++] = n),
      (Js |= n),
      (e.lanes |= n),
      (e = e.alternate),
      e !== null && (e.lanes |= n));
  }
  function Ws(e, t, l, n) {
    return (Fi(e, t, l, n), Pi(e));
  }
  function hn(e, t) {
    return (Fi(e, null, null, t), Pi(e));
  }
  function Lf(e, t, l) {
    e.lanes |= l;
    var n = e.alternate;
    n !== null && (n.lanes |= l);
    for (var i = !1, s = e.return; s !== null; )
      ((s.childLanes |= l),
        (n = s.alternate),
        n !== null && (n.childLanes |= l),
        s.tag === 22 && ((e = s.stateNode), e === null || e._visibility & 1 || (i = !0)),
        (e = s),
        (s = s.return));
    return e.tag === 3
      ? ((s = e.stateNode),
        i &&
          t !== null &&
          ((i = 31 - kt(l)),
          (e = s.hiddenUpdates),
          (n = e[i]),
          n === null ? (e[i] = [t]) : n.push(t),
          (t.lane = l | 536870912)),
        s)
      : null;
  }
  function Pi(e) {
    if (50 < si) throw ((si = 0), (uo = null), Error(c(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var Vn = {};
  function Lg(e, t, l, n) {
    ((this.tag = e),
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
      (this.pendingProps = t),
      (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
      (this.mode = n),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function Ct(e, t, l, n) {
    return new Lg(e, t, l, n);
  }
  function Fs(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function fl(e, t) {
    var l = e.alternate;
    return (
      l === null
        ? ((l = Ct(e.tag, t, e.key, e.mode)),
          (l.elementType = e.elementType),
          (l.type = e.type),
          (l.stateNode = e.stateNode),
          (l.alternate = e),
          (e.alternate = l))
        : ((l.pendingProps = t),
          (l.type = e.type),
          (l.flags = 0),
          (l.subtreeFlags = 0),
          (l.deletions = null)),
      (l.flags = e.flags & 65011712),
      (l.childLanes = e.childLanes),
      (l.lanes = e.lanes),
      (l.child = e.child),
      (l.memoizedProps = e.memoizedProps),
      (l.memoizedState = e.memoizedState),
      (l.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (l.sibling = e.sibling),
      (l.index = e.index),
      (l.ref = e.ref),
      (l.refCleanup = e.refCleanup),
      l
    );
  }
  function Hf(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return (
      l === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = l.childLanes),
          (e.lanes = l.lanes),
          (e.child = l.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = l.memoizedProps),
          (e.memoizedState = l.memoizedState),
          (e.updateQueue = l.updateQueue),
          (e.type = l.type),
          (t = l.dependencies),
          (e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function eu(e, t, l, n, i, s) {
    var f = 0;
    if (((n = e), typeof e == 'function')) Fs(e) && (f = 1);
    else if (typeof e == 'string')
      f = X0(e, l, le.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case Z:
          return ((e = Ct(31, l, t, i)), (e.elementType = Z), (e.lanes = s), e);
        case j:
          return pn(l.children, i, s, t);
        case b:
          ((f = 8), (i |= 24));
          break;
        case A:
          return ((e = Ct(12, l, t, i | 2)), (e.elementType = A), (e.lanes = s), e);
        case K:
          return ((e = Ct(13, l, t, i)), (e.elementType = K), (e.lanes = s), e);
        case I:
          return ((e = Ct(19, l, t, i)), (e.elementType = I), (e.lanes = s), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case $:
                f = 10;
                break e;
              case w:
                f = 9;
                break e;
              case V:
                f = 11;
                break e;
              case Q:
                f = 14;
                break e;
              case L:
                ((f = 16), (n = null));
                break e;
            }
          ((f = 29), (l = Error(c(130, e === null ? 'null' : typeof e, ''))), (n = null));
      }
    return ((t = Ct(f, l, t, i)), (t.elementType = e), (t.type = n), (t.lanes = s), t);
  }
  function pn(e, t, l, n) {
    return ((e = Ct(7, e, n, t)), (e.lanes = l), e);
  }
  function Ps(e, t, l) {
    return ((e = Ct(6, e, null, t)), (e.lanes = l), e);
  }
  function qf(e) {
    var t = Ct(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function ec(e, t, l) {
    return (
      (t = Ct(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = l),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var Gf = new WeakMap();
  function Ht(e, t) {
    if (typeof e == 'object' && e !== null) {
      var l = Gf.get(e);
      return l !== void 0 ? l : ((t = { value: e, source: t, stack: Hr(t) }), Gf.set(e, t), t);
    }
    return { value: e, source: t, stack: Hr(t) };
  }
  var Qn = [],
    Kn = 0,
    tu = null,
    qa = 0,
    qt = [],
    Gt = 0,
    Bl = null,
    tl = 1,
    ll = '';
  function dl(e, t) {
    ((Qn[Kn++] = qa), (Qn[Kn++] = tu), (tu = e), (qa = t));
  }
  function Yf(e, t, l) {
    ((qt[Gt++] = tl), (qt[Gt++] = ll), (qt[Gt++] = Bl), (Bl = e));
    var n = tl;
    e = ll;
    var i = 32 - kt(n) - 1;
    ((n &= ~(1 << i)), (l += 1));
    var s = 32 - kt(t) + i;
    if (30 < s) {
      var f = i - (i % 5);
      ((s = (n & ((1 << f) - 1)).toString(32)),
        (n >>= f),
        (i -= f),
        (tl = (1 << (32 - kt(t) + i)) | (l << i) | n),
        (ll = s + e));
    } else ((tl = (1 << s) | (l << i) | n), (ll = e));
  }
  function tc(e) {
    e.return !== null && (dl(e, 1), Yf(e, 1, 0));
  }
  function lc(e) {
    for (; e === tu; ) ((tu = Qn[--Kn]), (Qn[Kn] = null), (qa = Qn[--Kn]), (Qn[Kn] = null));
    for (; e === Bl; )
      ((Bl = qt[--Gt]),
        (qt[Gt] = null),
        (ll = qt[--Gt]),
        (qt[Gt] = null),
        (tl = qt[--Gt]),
        (qt[Gt] = null));
  }
  function Xf(e, t) {
    ((qt[Gt++] = tl), (qt[Gt++] = ll), (qt[Gt++] = Bl), (tl = t.id), (ll = t.overflow), (Bl = e));
  }
  var ct = null,
    Ge = null,
    ke = !1,
    Ul = null,
    Yt = !1,
    nc = Error(c(519));
  function Ll(e) {
    var t = Error(
      c(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (Ga(Ht(t, e)), nc);
  }
  function $f(e) {
    var t = e.stateNode,
      l = e.type,
      n = e.memoizedProps;
    switch (((t[st] = e), (t[gt] = n), l)) {
      case 'dialog':
        (xe('cancel', t), xe('close', t));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        xe('load', t);
        break;
      case 'video':
      case 'audio':
        for (l = 0; l < oi.length; l++) xe(oi[l], t);
        break;
      case 'source':
        xe('error', t);
        break;
      case 'img':
      case 'image':
      case 'link':
        (xe('error', t), xe('load', t));
        break;
      case 'details':
        xe('toggle', t);
        break;
      case 'input':
        (xe('invalid', t),
          lf(t, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, !0));
        break;
      case 'select':
        xe('invalid', t);
        break;
      case 'textarea':
        (xe('invalid', t), af(t, n.value, n.defaultValue, n.children));
    }
    ((l = n.children),
      (typeof l != 'string' && typeof l != 'number' && typeof l != 'bigint') ||
      t.textContent === '' + l ||
      n.suppressHydrationWarning === !0 ||
      sh(t.textContent, l)
        ? (n.popover != null && (xe('beforetoggle', t), xe('toggle', t)),
          n.onScroll != null && xe('scroll', t),
          n.onScrollEnd != null && xe('scrollend', t),
          n.onClick != null && (t.onclick = ol),
          (t = !0))
        : (t = !1),
      t || Ll(e, !0));
  }
  function Vf(e) {
    for (ct = e.return; ct; )
      switch (ct.tag) {
        case 5:
        case 31:
        case 13:
          Yt = !1;
          return;
        case 27:
        case 3:
          Yt = !0;
          return;
        default:
          ct = ct.return;
      }
  }
  function Zn(e) {
    if (e !== ct) return !1;
    if (!ke) return (Vf(e), (ke = !0), !1);
    var t = e.tag,
      l;
    if (
      ((l = t !== 3 && t !== 27) &&
        ((l = t === 5) &&
          ((l = e.type), (l = !(l !== 'form' && l !== 'button') || xo(e.type, e.memoizedProps))),
        (l = !l)),
      l && Ge && Ll(e),
      Vf(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(c(317));
      Ge = yh(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(c(317));
      Ge = yh(e);
    } else
      t === 27
        ? ((t = Ge), Fl(e.type) ? ((e = Ao), (Ao = null), (Ge = e)) : (Ge = t))
        : (Ge = ct ? $t(e.stateNode.nextSibling) : null);
    return !0;
  }
  function yn() {
    ((Ge = ct = null), (ke = !1));
  }
  function ac() {
    var e = Ul;
    return (e !== null && (xt === null ? (xt = e) : xt.push.apply(xt, e), (Ul = null)), e);
  }
  function Ga(e) {
    Ul === null ? (Ul = [e]) : Ul.push(e);
  }
  var ic = k(null),
    gn = null,
    ml = null;
  function Hl(e, t, l) {
    (P(ic, t._currentValue), (t._currentValue = l));
  }
  function hl(e) {
    ((e._currentValue = ic.current), q(ic));
  }
  function uc(e, t, l) {
    for (; e !== null; ) {
      var n = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), n !== null && (n.childLanes |= t))
          : n !== null && (n.childLanes & t) !== t && (n.childLanes |= t),
        e === l)
      )
        break;
      e = e.return;
    }
  }
  function sc(e, t, l, n) {
    var i = e.child;
    for (i !== null && (i.return = e); i !== null; ) {
      var s = i.dependencies;
      if (s !== null) {
        var f = i.child;
        s = s.firstContext;
        e: for (; s !== null; ) {
          var h = s;
          s = i;
          for (var E = 0; E < t.length; E++)
            if (h.context === t[E]) {
              ((s.lanes |= l),
                (h = s.alternate),
                h !== null && (h.lanes |= l),
                uc(s.return, l, e),
                n || (f = null));
              break e;
            }
          s = h.next;
        }
      } else if (i.tag === 18) {
        if (((f = i.return), f === null)) throw Error(c(341));
        ((f.lanes |= l), (s = f.alternate), s !== null && (s.lanes |= l), uc(f, l, e), (f = null));
      } else f = i.child;
      if (f !== null) f.return = i;
      else
        for (f = i; f !== null; ) {
          if (f === e) {
            f = null;
            break;
          }
          if (((i = f.sibling), i !== null)) {
            ((i.return = f.return), (f = i));
            break;
          }
          f = f.return;
        }
      i = f;
    }
  }
  function In(e, t, l, n) {
    e = null;
    for (var i = t, s = !1; i !== null; ) {
      if (!s) {
        if ((i.flags & 524288) !== 0) s = !0;
        else if ((i.flags & 262144) !== 0) break;
      }
      if (i.tag === 10) {
        var f = i.alternate;
        if (f === null) throw Error(c(387));
        if (((f = f.memoizedProps), f !== null)) {
          var h = i.type;
          At(i.pendingProps.value, f.value) || (e !== null ? e.push(h) : (e = [h]));
        }
      } else if (i === Ce.current) {
        if (((f = i.alternate), f === null)) throw Error(c(387));
        f.memoizedState.memoizedState !== i.memoizedState.memoizedState &&
          (e !== null ? e.push(hi) : (e = [hi]));
      }
      i = i.return;
    }
    (e !== null && sc(t, e, l, n), (t.flags |= 262144));
  }
  function lu(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!At(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function _n(e) {
    ((gn = e), (ml = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function ot(e) {
    return Qf(gn, e);
  }
  function nu(e, t) {
    return (gn === null && _n(e), Qf(e, t));
  }
  function Qf(e, t) {
    var l = t._currentValue;
    if (((t = { context: t, memoizedValue: l, next: null }), ml === null)) {
      if (e === null) throw Error(c(308));
      ((ml = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else ml = ml.next = t;
    return l;
  }
  var Hg =
      typeof AbortController < 'u'
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (l, n) {
                  e.push(n);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                e.forEach(function (l) {
                  return l();
                }));
            };
          },
    qg = a.unstable_scheduleCallback,
    Gg = a.unstable_NormalPriority,
    Fe = {
      $$typeof: $,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function cc() {
    return { controller: new Hg(), data: new Map(), refCount: 0 };
  }
  function Ya(e) {
    (e.refCount--,
      e.refCount === 0 &&
        qg(Gg, function () {
          e.controller.abort();
        }));
  }
  var Xa = null,
    oc = 0,
    Jn = 0,
    Wn = null;
  function Yg(e, t) {
    if (Xa === null) {
      var l = (Xa = []);
      ((oc = 0),
        (Jn = mo()),
        (Wn = {
          status: 'pending',
          value: void 0,
          then: function (n) {
            l.push(n);
          },
        }));
    }
    return (oc++, t.then(Kf, Kf), t);
  }
  function Kf() {
    if (--oc === 0 && Xa !== null) {
      Wn !== null && (Wn.status = 'fulfilled');
      var e = Xa;
      ((Xa = null), (Jn = 0), (Wn = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Xg(e, t) {
    var l = [],
      n = {
        status: 'pending',
        value: null,
        reason: null,
        then: function (i) {
          l.push(i);
        },
      };
    return (
      e.then(
        function () {
          ((n.status = 'fulfilled'), (n.value = t));
          for (var i = 0; i < l.length; i++) (0, l[i])(t);
        },
        function (i) {
          for (n.status = 'rejected', n.reason = i, i = 0; i < l.length; i++) (0, l[i])(void 0);
        }
      ),
      n
    );
  }
  var Zf = U.S;
  U.S = function (e, t) {
    ((jm = Tt()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && Yg(e, t),
      Zf !== null && Zf(e, t));
  };
  var vn = k(null);
  function rc() {
    var e = vn.current;
    return e !== null ? e : qe.pooledCache;
  }
  function au(e, t) {
    t === null ? P(vn, vn.current) : P(vn, t.pool);
  }
  function If() {
    var e = rc();
    return e === null ? null : { parent: Fe._currentValue, pool: e };
  }
  var Fn = Error(c(460)),
    fc = Error(c(474)),
    iu = Error(c(542)),
    uu = { then: function () {} };
  function Jf(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function Wf(e, t, l) {
    switch (
      ((l = e[l]), l === void 0 ? e.push(t) : l !== t && (t.then(ol, ol), (t = l)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), Pf(e), e);
      default:
        if (typeof t.status == 'string') t.then(ol, ol);
        else {
          if (((e = qe), e !== null && 100 < e.shellSuspendCounter)) throw Error(c(482));
          ((e = t),
            (e.status = 'pending'),
            e.then(
              function (n) {
                if (t.status === 'pending') {
                  var i = t;
                  ((i.status = 'fulfilled'), (i.value = n));
                }
              },
              function (n) {
                if (t.status === 'pending') {
                  var i = t;
                  ((i.status = 'rejected'), (i.reason = n));
                }
              }
            ));
        }
        switch (t.status) {
          case 'fulfilled':
            return t.value;
          case 'rejected':
            throw ((e = t.reason), Pf(e), e);
        }
        throw ((Sn = t), Fn);
    }
  }
  function bn(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == 'object' && typeof l.then == 'function' ? ((Sn = l), Fn) : l;
    }
  }
  var Sn = null;
  function Ff() {
    if (Sn === null) throw Error(c(459));
    var e = Sn;
    return ((Sn = null), e);
  }
  function Pf(e) {
    if (e === Fn || e === iu) throw Error(c(483));
  }
  var Pn = null,
    $a = 0;
  function su(e) {
    var t = $a;
    return (($a += 1), Pn === null && (Pn = []), Wf(Pn, e, t));
  }
  function Va(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function cu(e, t) {
    throw t.$$typeof === C
      ? Error(c(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          c(
            31,
            e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e
          )
        ));
  }
  function ed(e) {
    function t(M, T) {
      if (e) {
        var O = M.deletions;
        O === null ? ((M.deletions = [T]), (M.flags |= 16)) : O.push(T);
      }
    }
    function l(M, T) {
      if (!e) return null;
      for (; T !== null; ) (t(M, T), (T = T.sibling));
      return null;
    }
    function n(M) {
      for (var T = new Map(); M !== null; )
        (M.key !== null ? T.set(M.key, M) : T.set(M.index, M), (M = M.sibling));
      return T;
    }
    function i(M, T) {
      return ((M = fl(M, T)), (M.index = 0), (M.sibling = null), M);
    }
    function s(M, T, O) {
      return (
        (M.index = O),
        e
          ? ((O = M.alternate),
            O !== null
              ? ((O = O.index), O < T ? ((M.flags |= 67108866), T) : O)
              : ((M.flags |= 67108866), T))
          : ((M.flags |= 1048576), T)
      );
    }
    function f(M) {
      return (e && M.alternate === null && (M.flags |= 67108866), M);
    }
    function h(M, T, O, Y) {
      return T === null || T.tag !== 6
        ? ((T = Ps(O, M.mode, Y)), (T.return = M), T)
        : ((T = i(T, O)), (T.return = M), T);
    }
    function E(M, T, O, Y) {
      var se = O.type;
      return se === j
        ? H(M, T, O.props.children, Y, O.key)
        : T !== null &&
            (T.elementType === se ||
              (typeof se == 'object' && se !== null && se.$$typeof === L && bn(se) === T.type))
          ? ((T = i(T, O.props)), Va(T, O), (T.return = M), T)
          : ((T = eu(O.type, O.key, O.props, null, M.mode, Y)), Va(T, O), (T.return = M), T);
    }
    function z(M, T, O, Y) {
      return T === null ||
        T.tag !== 4 ||
        T.stateNode.containerInfo !== O.containerInfo ||
        T.stateNode.implementation !== O.implementation
        ? ((T = ec(O, M.mode, Y)), (T.return = M), T)
        : ((T = i(T, O.children || [])), (T.return = M), T);
    }
    function H(M, T, O, Y, se) {
      return T === null || T.tag !== 7
        ? ((T = pn(O, M.mode, Y, se)), (T.return = M), T)
        : ((T = i(T, O)), (T.return = M), T);
    }
    function X(M, T, O) {
      if ((typeof T == 'string' && T !== '') || typeof T == 'number' || typeof T == 'bigint')
        return ((T = Ps('' + T, M.mode, O)), (T.return = M), T);
      if (typeof T == 'object' && T !== null) {
        switch (T.$$typeof) {
          case R:
            return ((O = eu(T.type, T.key, T.props, null, M.mode, O)), Va(O, T), (O.return = M), O);
          case x:
            return ((T = ec(T, M.mode, O)), (T.return = M), T);
          case L:
            return ((T = bn(T)), X(M, T, O));
        }
        if (he(T) || ue(T)) return ((T = pn(T, M.mode, O, null)), (T.return = M), T);
        if (typeof T.then == 'function') return X(M, su(T), O);
        if (T.$$typeof === $) return X(M, nu(M, T), O);
        cu(M, T);
      }
      return null;
    }
    function D(M, T, O, Y) {
      var se = T !== null ? T.key : null;
      if ((typeof O == 'string' && O !== '') || typeof O == 'number' || typeof O == 'bigint')
        return se !== null ? null : h(M, T, '' + O, Y);
      if (typeof O == 'object' && O !== null) {
        switch (O.$$typeof) {
          case R:
            return O.key === se ? E(M, T, O, Y) : null;
          case x:
            return O.key === se ? z(M, T, O, Y) : null;
          case L:
            return ((O = bn(O)), D(M, T, O, Y));
        }
        if (he(O) || ue(O)) return se !== null ? null : H(M, T, O, Y, null);
        if (typeof O.then == 'function') return D(M, T, su(O), Y);
        if (O.$$typeof === $) return D(M, T, nu(M, O), Y);
        cu(M, O);
      }
      return null;
    }
    function B(M, T, O, Y, se) {
      if ((typeof Y == 'string' && Y !== '') || typeof Y == 'number' || typeof Y == 'bigint')
        return ((M = M.get(O) || null), h(T, M, '' + Y, se));
      if (typeof Y == 'object' && Y !== null) {
        switch (Y.$$typeof) {
          case R:
            return ((M = M.get(Y.key === null ? O : Y.key) || null), E(T, M, Y, se));
          case x:
            return ((M = M.get(Y.key === null ? O : Y.key) || null), z(T, M, Y, se));
          case L:
            return ((Y = bn(Y)), B(M, T, O, Y, se));
        }
        if (he(Y) || ue(Y)) return ((M = M.get(O) || null), H(T, M, Y, se, null));
        if (typeof Y.then == 'function') return B(M, T, O, su(Y), se);
        if (Y.$$typeof === $) return B(M, T, O, nu(T, Y), se);
        cu(T, Y);
      }
      return null;
    }
    function ne(M, T, O, Y) {
      for (
        var se = null, Me = null, ie = T, ve = (T = 0), Ne = null;
        ie !== null && ve < O.length;
        ve++
      ) {
        ie.index > ve ? ((Ne = ie), (ie = null)) : (Ne = ie.sibling);
        var Re = D(M, ie, O[ve], Y);
        if (Re === null) {
          ie === null && (ie = Ne);
          break;
        }
        (e && ie && Re.alternate === null && t(M, ie),
          (T = s(Re, T, ve)),
          Me === null ? (se = Re) : (Me.sibling = Re),
          (Me = Re),
          (ie = Ne));
      }
      if (ve === O.length) return (l(M, ie), ke && dl(M, ve), se);
      if (ie === null) {
        for (; ve < O.length; ve++)
          ((ie = X(M, O[ve], Y)),
            ie !== null &&
              ((T = s(ie, T, ve)), Me === null ? (se = ie) : (Me.sibling = ie), (Me = ie)));
        return (ke && dl(M, ve), se);
      }
      for (ie = n(ie); ve < O.length; ve++)
        ((Ne = B(ie, M, ve, O[ve], Y)),
          Ne !== null &&
            (e && Ne.alternate !== null && ie.delete(Ne.key === null ? ve : Ne.key),
            (T = s(Ne, T, ve)),
            Me === null ? (se = Ne) : (Me.sibling = Ne),
            (Me = Ne)));
      return (
        e &&
          ie.forEach(function (nn) {
            return t(M, nn);
          }),
        ke && dl(M, ve),
        se
      );
    }
    function re(M, T, O, Y) {
      if (O == null) throw Error(c(151));
      for (
        var se = null, Me = null, ie = T, ve = (T = 0), Ne = null, Re = O.next();
        ie !== null && !Re.done;
        ve++, Re = O.next()
      ) {
        ie.index > ve ? ((Ne = ie), (ie = null)) : (Ne = ie.sibling);
        var nn = D(M, ie, Re.value, Y);
        if (nn === null) {
          ie === null && (ie = Ne);
          break;
        }
        (e && ie && nn.alternate === null && t(M, ie),
          (T = s(nn, T, ve)),
          Me === null ? (se = nn) : (Me.sibling = nn),
          (Me = nn),
          (ie = Ne));
      }
      if (Re.done) return (l(M, ie), ke && dl(M, ve), se);
      if (ie === null) {
        for (; !Re.done; ve++, Re = O.next())
          ((Re = X(M, Re.value, Y)),
            Re !== null &&
              ((T = s(Re, T, ve)), Me === null ? (se = Re) : (Me.sibling = Re), (Me = Re)));
        return (ke && dl(M, ve), se);
      }
      for (ie = n(ie); !Re.done; ve++, Re = O.next())
        ((Re = B(ie, M, ve, Re.value, Y)),
          Re !== null &&
            (e && Re.alternate !== null && ie.delete(Re.key === null ? ve : Re.key),
            (T = s(Re, T, ve)),
            Me === null ? (se = Re) : (Me.sibling = Re),
            (Me = Re)));
      return (
        e &&
          ie.forEach(function (e_) {
            return t(M, e_);
          }),
        ke && dl(M, ve),
        se
      );
    }
    function He(M, T, O, Y) {
      if (
        (typeof O == 'object' &&
          O !== null &&
          O.type === j &&
          O.key === null &&
          (O = O.props.children),
        typeof O == 'object' && O !== null)
      ) {
        switch (O.$$typeof) {
          case R:
            e: {
              for (var se = O.key; T !== null; ) {
                if (T.key === se) {
                  if (((se = O.type), se === j)) {
                    if (T.tag === 7) {
                      (l(M, T.sibling), (Y = i(T, O.props.children)), (Y.return = M), (M = Y));
                      break e;
                    }
                  } else if (
                    T.elementType === se ||
                    (typeof se == 'object' && se !== null && se.$$typeof === L && bn(se) === T.type)
                  ) {
                    (l(M, T.sibling), (Y = i(T, O.props)), Va(Y, O), (Y.return = M), (M = Y));
                    break e;
                  }
                  l(M, T);
                  break;
                } else t(M, T);
                T = T.sibling;
              }
              O.type === j
                ? ((Y = pn(O.props.children, M.mode, Y, O.key)), (Y.return = M), (M = Y))
                : ((Y = eu(O.type, O.key, O.props, null, M.mode, Y)),
                  Va(Y, O),
                  (Y.return = M),
                  (M = Y));
            }
            return f(M);
          case x:
            e: {
              for (se = O.key; T !== null; ) {
                if (T.key === se)
                  if (
                    T.tag === 4 &&
                    T.stateNode.containerInfo === O.containerInfo &&
                    T.stateNode.implementation === O.implementation
                  ) {
                    (l(M, T.sibling), (Y = i(T, O.children || [])), (Y.return = M), (M = Y));
                    break e;
                  } else {
                    l(M, T);
                    break;
                  }
                else t(M, T);
                T = T.sibling;
              }
              ((Y = ec(O, M.mode, Y)), (Y.return = M), (M = Y));
            }
            return f(M);
          case L:
            return ((O = bn(O)), He(M, T, O, Y));
        }
        if (he(O)) return ne(M, T, O, Y);
        if (ue(O)) {
          if (((se = ue(O)), typeof se != 'function')) throw Error(c(150));
          return ((O = se.call(O)), re(M, T, O, Y));
        }
        if (typeof O.then == 'function') return He(M, T, su(O), Y);
        if (O.$$typeof === $) return He(M, T, nu(M, O), Y);
        cu(M, O);
      }
      return (typeof O == 'string' && O !== '') || typeof O == 'number' || typeof O == 'bigint'
        ? ((O = '' + O),
          T !== null && T.tag === 6
            ? (l(M, T.sibling), (Y = i(T, O)), (Y.return = M), (M = Y))
            : (l(M, T), (Y = Ps(O, M.mode, Y)), (Y.return = M), (M = Y)),
          f(M))
        : l(M, T);
    }
    return function (M, T, O, Y) {
      try {
        $a = 0;
        var se = He(M, T, O, Y);
        return ((Pn = null), se);
      } catch (ie) {
        if (ie === Fn || ie === iu) throw ie;
        var Me = Ct(29, ie, null, M.mode);
        return ((Me.lanes = Y), (Me.return = M), Me);
      } finally {
      }
    };
  }
  var xn = ed(!0),
    td = ed(!1),
    ql = !1;
  function dc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function mc(e, t) {
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
  function Gl(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Yl(e, t, l) {
    var n = e.updateQueue;
    if (n === null) return null;
    if (((n = n.shared), (Oe & 2) !== 0)) {
      var i = n.pending;
      return (
        i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
        (n.pending = t),
        (t = Pi(e)),
        Lf(e, null, l),
        t
      );
    }
    return (Fi(e, n, t, l), Pi(e));
  }
  function Qa(e, t, l) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (l & 4194048) !== 0))) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (l |= n), (t.lanes = l), Vr(e, l));
    }
  }
  function hc(e, t) {
    var l = e.updateQueue,
      n = e.alternate;
    if (n !== null && ((n = n.updateQueue), l === n)) {
      var i = null,
        s = null;
      if (((l = l.firstBaseUpdate), l !== null)) {
        do {
          var f = { lane: l.lane, tag: l.tag, payload: l.payload, callback: null, next: null };
          (s === null ? (i = s = f) : (s = s.next = f), (l = l.next));
        } while (l !== null);
        s === null ? (i = s = t) : (s = s.next = t);
      } else i = s = t;
      ((l = {
        baseState: n.baseState,
        firstBaseUpdate: i,
        lastBaseUpdate: s,
        shared: n.shared,
        callbacks: n.callbacks,
      }),
        (e.updateQueue = l));
      return;
    }
    ((e = l.lastBaseUpdate),
      e === null ? (l.firstBaseUpdate = t) : (e.next = t),
      (l.lastBaseUpdate = t));
  }
  var pc = !1;
  function Ka() {
    if (pc) {
      var e = Wn;
      if (e !== null) throw e;
    }
  }
  function Za(e, t, l, n) {
    pc = !1;
    var i = e.updateQueue;
    ql = !1;
    var s = i.firstBaseUpdate,
      f = i.lastBaseUpdate,
      h = i.shared.pending;
    if (h !== null) {
      i.shared.pending = null;
      var E = h,
        z = E.next;
      ((E.next = null), f === null ? (s = z) : (f.next = z), (f = E));
      var H = e.alternate;
      H !== null &&
        ((H = H.updateQueue),
        (h = H.lastBaseUpdate),
        h !== f && (h === null ? (H.firstBaseUpdate = z) : (h.next = z), (H.lastBaseUpdate = E)));
    }
    if (s !== null) {
      var X = i.baseState;
      ((f = 0), (H = z = E = null), (h = s));
      do {
        var D = h.lane & -536870913,
          B = D !== h.lane;
        if (B ? (Te & D) === D : (n & D) === D) {
          (D !== 0 && D === Jn && (pc = !0),
            H !== null &&
              (H = H.next =
                { lane: 0, tag: h.tag, payload: h.payload, callback: null, next: null }));
          e: {
            var ne = e,
              re = h;
            D = t;
            var He = l;
            switch (re.tag) {
              case 1:
                if (((ne = re.payload), typeof ne == 'function')) {
                  X = ne.call(He, X, D);
                  break e;
                }
                X = ne;
                break e;
              case 3:
                ne.flags = (ne.flags & -65537) | 128;
              case 0:
                if (
                  ((ne = re.payload),
                  (D = typeof ne == 'function' ? ne.call(He, X, D) : ne),
                  D == null)
                )
                  break e;
                X = S({}, X, D);
                break e;
              case 2:
                ql = !0;
            }
          }
          ((D = h.callback),
            D !== null &&
              ((e.flags |= 64),
              B && (e.flags |= 8192),
              (B = i.callbacks),
              B === null ? (i.callbacks = [D]) : B.push(D)));
        } else
          ((B = { lane: D, tag: h.tag, payload: h.payload, callback: h.callback, next: null }),
            H === null ? ((z = H = B), (E = X)) : (H = H.next = B),
            (f |= D));
        if (((h = h.next), h === null)) {
          if (((h = i.shared.pending), h === null)) break;
          ((B = h),
            (h = B.next),
            (B.next = null),
            (i.lastBaseUpdate = B),
            (i.shared.pending = null));
        }
      } while (!0);
      (H === null && (E = X),
        (i.baseState = E),
        (i.firstBaseUpdate = z),
        (i.lastBaseUpdate = H),
        s === null && (i.shared.lanes = 0),
        (Kl |= f),
        (e.lanes = f),
        (e.memoizedState = X));
    }
  }
  function ld(e, t) {
    if (typeof e != 'function') throw Error(c(191, e));
    e.call(t);
  }
  function nd(e, t) {
    var l = e.callbacks;
    if (l !== null) for (e.callbacks = null, e = 0; e < l.length; e++) ld(l[e], t);
  }
  var ea = k(null),
    ou = k(0);
  function ad(e, t) {
    ((e = El), P(ou, e), P(ea, t), (El = e | t.baseLanes));
  }
  function yc() {
    (P(ou, El), P(ea, ea.current));
  }
  function gc() {
    ((El = ou.current), q(ea), q(ou));
  }
  var Mt = k(null),
    Xt = null;
  function Xl(e) {
    var t = e.alternate;
    (P(Je, Je.current & 1),
      P(Mt, e),
      Xt === null && (t === null || ea.current !== null || t.memoizedState !== null) && (Xt = e));
  }
  function _c(e) {
    (P(Je, Je.current), P(Mt, e), Xt === null && (Xt = e));
  }
  function id(e) {
    e.tag === 22 ? (P(Je, Je.current), P(Mt, e), Xt === null && (Xt = e)) : $l();
  }
  function $l() {
    (P(Je, Je.current), P(Mt, Mt.current));
  }
  function Rt(e) {
    (q(Mt), Xt === e && (Xt = null), q(Je));
  }
  var Je = k(0);
  function ru(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && ((l = l.dehydrated), l === null || No(l) || ko(l))) return t;
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
  var pl = 0,
    _e = null,
    Ue = null,
    Pe = null,
    fu = !1,
    ta = !1,
    En = !1,
    du = 0,
    Ia = 0,
    la = null,
    $g = 0;
  function Ze() {
    throw Error(c(321));
  }
  function vc(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++) if (!At(e[l], t[l])) return !1;
    return !0;
  }
  function bc(e, t, l, n, i, s) {
    return (
      (pl = s),
      (_e = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (U.H = e === null || e.memoizedState === null ? Yd : Dc),
      (En = !1),
      (s = l(n, i)),
      (En = !1),
      ta && (s = sd(t, l, n, i)),
      ud(e),
      s
    );
  }
  function ud(e) {
    U.H = Fa;
    var t = Ue !== null && Ue.next !== null;
    if (((pl = 0), (Pe = Ue = _e = null), (fu = !1), (Ia = 0), (la = null), t)) throw Error(c(300));
    e === null || et || ((e = e.dependencies), e !== null && lu(e) && (et = !0));
  }
  function sd(e, t, l, n) {
    _e = e;
    var i = 0;
    do {
      if ((ta && (la = null), (Ia = 0), (ta = !1), 25 <= i)) throw Error(c(301));
      if (((i += 1), (Pe = Ue = null), e.updateQueue != null)) {
        var s = e.updateQueue;
        ((s.lastEffect = null),
          (s.events = null),
          (s.stores = null),
          s.memoCache != null && (s.memoCache.index = 0));
      }
      ((U.H = Xd), (s = t(l, n)));
    } while (ta);
    return s;
  }
  function Vg() {
    var e = U.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? Ja(t) : t),
      (e = e.useState()[0]),
      (Ue !== null ? Ue.memoizedState : null) !== e && (_e.flags |= 1024),
      t
    );
  }
  function Sc() {
    var e = du !== 0;
    return ((du = 0), e);
  }
  function xc(e, t, l) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l));
  }
  function Ec(e) {
    if (fu) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      fu = !1;
    }
    ((pl = 0), (Pe = Ue = _e = null), (ta = !1), (Ia = du = 0), (la = null));
  }
  function pt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (Pe === null ? (_e.memoizedState = Pe = e) : (Pe = Pe.next = e), Pe);
  }
  function We() {
    if (Ue === null) {
      var e = _e.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ue.next;
    var t = Pe === null ? _e.memoizedState : Pe.next;
    if (t !== null) ((Pe = t), (Ue = e));
    else {
      if (e === null) throw _e.alternate === null ? Error(c(467)) : Error(c(310));
      ((Ue = e),
        (e = {
          memoizedState: Ue.memoizedState,
          baseState: Ue.baseState,
          baseQueue: Ue.baseQueue,
          queue: Ue.queue,
          next: null,
        }),
        Pe === null ? (_e.memoizedState = Pe = e) : (Pe = Pe.next = e));
    }
    return Pe;
  }
  function mu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ja(e) {
    var t = Ia;
    return (
      (Ia += 1),
      la === null && (la = []),
      (e = Wf(la, e, t)),
      (t = _e),
      (Pe === null ? t.memoizedState : Pe.next) === null &&
        ((t = t.alternate), (U.H = t === null || t.memoizedState === null ? Yd : Dc)),
      e
    );
  }
  function hu(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return Ja(e);
      if (e.$$typeof === $) return ot(e);
    }
    throw Error(c(438, String(e)));
  }
  function Tc(e) {
    var t = null,
      l = _e.updateQueue;
    if ((l !== null && (t = l.memoCache), t == null)) {
      var n = _e.alternate;
      n !== null &&
        ((n = n.updateQueue),
        n !== null &&
          ((n = n.memoCache),
          n != null &&
            (t = {
              data: n.data.map(function (i) {
                return i.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      l === null && ((l = mu()), (_e.updateQueue = l)),
      (l.memoCache = t),
      (l = t.data[t.index]),
      l === void 0)
    )
      for (l = t.data[t.index] = Array(e), n = 0; n < e; n++) l[n] = ae;
    return (t.index++, l);
  }
  function yl(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function pu(e) {
    var t = We();
    return Nc(t, Ue, e);
  }
  function Nc(e, t, l) {
    var n = e.queue;
    if (n === null) throw Error(c(311));
    n.lastRenderedReducer = l;
    var i = e.baseQueue,
      s = n.pending;
    if (s !== null) {
      if (i !== null) {
        var f = i.next;
        ((i.next = s.next), (s.next = f));
      }
      ((t.baseQueue = i = s), (n.pending = null));
    }
    if (((s = e.baseState), i === null)) e.memoizedState = s;
    else {
      t = i.next;
      var h = (f = null),
        E = null,
        z = t,
        H = !1;
      do {
        var X = z.lane & -536870913;
        if (X !== z.lane ? (Te & X) === X : (pl & X) === X) {
          var D = z.revertLane;
          if (D === 0)
            (E !== null &&
              (E = E.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: z.action,
                  hasEagerState: z.hasEagerState,
                  eagerState: z.eagerState,
                  next: null,
                }),
              X === Jn && (H = !0));
          else if ((pl & D) === D) {
            ((z = z.next), D === Jn && (H = !0));
            continue;
          } else
            ((X = {
              lane: 0,
              revertLane: z.revertLane,
              gesture: null,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null,
            }),
              E === null ? ((h = E = X), (f = s)) : (E = E.next = X),
              (_e.lanes |= D),
              (Kl |= D));
          ((X = z.action), En && l(s, X), (s = z.hasEagerState ? z.eagerState : l(s, X)));
        } else
          ((D = {
            lane: X,
            revertLane: z.revertLane,
            gesture: z.gesture,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null,
          }),
            E === null ? ((h = E = D), (f = s)) : (E = E.next = D),
            (_e.lanes |= X),
            (Kl |= X));
        z = z.next;
      } while (z !== null && z !== t);
      if (
        (E === null ? (f = s) : (E.next = h),
        !At(s, e.memoizedState) && ((et = !0), H && ((l = Wn), l !== null)))
      )
        throw l;
      ((e.memoizedState = s), (e.baseState = f), (e.baseQueue = E), (n.lastRenderedState = s));
    }
    return (i === null && (n.lanes = 0), [e.memoizedState, n.dispatch]);
  }
  function kc(e) {
    var t = We(),
      l = t.queue;
    if (l === null) throw Error(c(311));
    l.lastRenderedReducer = e;
    var n = l.dispatch,
      i = l.pending,
      s = t.memoizedState;
    if (i !== null) {
      l.pending = null;
      var f = (i = i.next);
      do ((s = e(s, f.action)), (f = f.next));
      while (f !== i);
      (At(s, t.memoizedState) || (et = !0),
        (t.memoizedState = s),
        t.baseQueue === null && (t.baseState = s),
        (l.lastRenderedState = s));
    }
    return [s, n];
  }
  function cd(e, t, l) {
    var n = _e,
      i = We(),
      s = ke;
    if (s) {
      if (l === void 0) throw Error(c(407));
      l = l();
    } else l = t();
    var f = !At((Ue || i).memoizedState, l);
    if (
      (f && ((i.memoizedState = l), (et = !0)),
      (i = i.queue),
      Mc(fd.bind(null, n, i, e), [e]),
      i.getSnapshot !== t || f || (Pe !== null && Pe.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        na(9, { destroy: void 0 }, rd.bind(null, n, i, l, t), null),
        qe === null)
      )
        throw Error(c(349));
      s || (pl & 127) !== 0 || od(n, t, l);
    }
    return l;
  }
  function od(e, t, l) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: l }),
      (t = _e.updateQueue),
      t === null
        ? ((t = mu()), (_e.updateQueue = t), (t.stores = [e]))
        : ((l = t.stores), l === null ? (t.stores = [e]) : l.push(e)));
  }
  function rd(e, t, l, n) {
    ((t.value = l), (t.getSnapshot = n), dd(t) && md(e));
  }
  function fd(e, t, l) {
    return l(function () {
      dd(t) && md(e);
    });
  }
  function dd(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !At(e, l);
    } catch {
      return !0;
    }
  }
  function md(e) {
    var t = hn(e, 2);
    t !== null && Et(t, e, 2);
  }
  function Ac(e) {
    var t = pt();
    if (typeof e == 'function') {
      var l = e;
      if (((e = l()), En)) {
        zl(!0);
        try {
          l();
        } finally {
          zl(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: yl,
        lastRenderedState: e,
      }),
      t
    );
  }
  function hd(e, t, l, n) {
    return ((e.baseState = l), Nc(e, Ue, typeof n == 'function' ? n : yl));
  }
  function Qg(e, t, l, n, i) {
    if (_u(e)) throw Error(c(485));
    if (((e = t.action), e !== null)) {
      var s = {
        payload: i,
        action: e,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (f) {
          s.listeners.push(f);
        },
      };
      (U.T !== null ? l(!0) : (s.isTransition = !1),
        n(s),
        (l = t.pending),
        l === null
          ? ((s.next = t.pending = s), pd(t, s))
          : ((s.next = l.next), (t.pending = l.next = s)));
    }
  }
  function pd(e, t) {
    var l = t.action,
      n = t.payload,
      i = e.state;
    if (t.isTransition) {
      var s = U.T,
        f = {};
      U.T = f;
      try {
        var h = l(i, n),
          E = U.S;
        (E !== null && E(f, h), yd(e, t, h));
      } catch (z) {
        Cc(e, t, z);
      } finally {
        (s !== null && f.types !== null && (s.types = f.types), (U.T = s));
      }
    } else
      try {
        ((s = l(i, n)), yd(e, t, s));
      } catch (z) {
        Cc(e, t, z);
      }
  }
  function yd(e, t, l) {
    l !== null && typeof l == 'object' && typeof l.then == 'function'
      ? l.then(
          function (n) {
            gd(e, t, n);
          },
          function (n) {
            return Cc(e, t, n);
          }
        )
      : gd(e, t, l);
  }
  function gd(e, t, l) {
    ((t.status = 'fulfilled'),
      (t.value = l),
      _d(t),
      (e.state = l),
      (t = e.pending),
      t !== null &&
        ((l = t.next), l === t ? (e.pending = null) : ((l = l.next), (t.next = l), pd(e, l))));
  }
  function Cc(e, t, l) {
    var n = e.pending;
    if (((e.pending = null), n !== null)) {
      n = n.next;
      do ((t.status = 'rejected'), (t.reason = l), _d(t), (t = t.next));
      while (t !== n);
    }
    e.action = null;
  }
  function _d(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function vd(e, t) {
    return t;
  }
  function bd(e, t) {
    if (ke) {
      var l = qe.formState;
      if (l !== null) {
        e: {
          var n = _e;
          if (ke) {
            if (Ge) {
              t: {
                for (var i = Ge, s = Yt; i.nodeType !== 8; ) {
                  if (!s) {
                    i = null;
                    break t;
                  }
                  if (((i = $t(i.nextSibling)), i === null)) {
                    i = null;
                    break t;
                  }
                }
                ((s = i.data), (i = s === 'F!' || s === 'F' ? i : null));
              }
              if (i) {
                ((Ge = $t(i.nextSibling)), (n = i.data === 'F!'));
                break e;
              }
            }
            Ll(n);
          }
          n = !1;
        }
        n && (t = l[0]);
      }
    }
    return (
      (l = pt()),
      (l.memoizedState = l.baseState = t),
      (n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: vd,
        lastRenderedState: t,
      }),
      (l.queue = n),
      (l = Hd.bind(null, _e, n)),
      (n.dispatch = l),
      (n = Ac(!1)),
      (s = wc.bind(null, _e, !1, n.queue)),
      (n = pt()),
      (i = { state: t, dispatch: null, action: e, pending: null }),
      (n.queue = i),
      (l = Qg.bind(null, _e, i, s, l)),
      (i.dispatch = l),
      (n.memoizedState = e),
      [t, l, !1]
    );
  }
  function Sd(e) {
    var t = We();
    return xd(t, Ue, e);
  }
  function xd(e, t, l) {
    if (
      ((t = Nc(e, t, vd)[0]),
      (e = pu(yl)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var n = Ja(t);
      } catch (f) {
        throw f === Fn ? iu : f;
      }
    else n = t;
    t = We();
    var i = t.queue,
      s = i.dispatch;
    return (
      l !== t.memoizedState &&
        ((_e.flags |= 2048), na(9, { destroy: void 0 }, Kg.bind(null, i, l), null)),
      [n, s, e]
    );
  }
  function Kg(e, t) {
    e.action = t;
  }
  function Ed(e) {
    var t = We(),
      l = Ue;
    if (l !== null) return xd(t, l, e);
    (We(), (t = t.memoizedState), (l = We()));
    var n = l.queue.dispatch;
    return ((l.memoizedState = e), [t, n, !1]);
  }
  function na(e, t, l, n) {
    return (
      (e = { tag: e, create: l, deps: n, inst: t, next: null }),
      (t = _e.updateQueue),
      t === null && ((t = mu()), (_e.updateQueue = t)),
      (l = t.lastEffect),
      l === null
        ? (t.lastEffect = e.next = e)
        : ((n = l.next), (l.next = e), (e.next = n), (t.lastEffect = e)),
      e
    );
  }
  function Td() {
    return We().memoizedState;
  }
  function yu(e, t, l, n) {
    var i = pt();
    ((_e.flags |= e),
      (i.memoizedState = na(1 | t, { destroy: void 0 }, l, n === void 0 ? null : n)));
  }
  function gu(e, t, l, n) {
    var i = We();
    n = n === void 0 ? null : n;
    var s = i.memoizedState.inst;
    Ue !== null && n !== null && vc(n, Ue.memoizedState.deps)
      ? (i.memoizedState = na(t, s, l, n))
      : ((_e.flags |= e), (i.memoizedState = na(1 | t, s, l, n)));
  }
  function Nd(e, t) {
    yu(8390656, 8, e, t);
  }
  function Mc(e, t) {
    gu(2048, 8, e, t);
  }
  function Zg(e) {
    _e.flags |= 4;
    var t = _e.updateQueue;
    if (t === null) ((t = mu()), (_e.updateQueue = t), (t.events = [e]));
    else {
      var l = t.events;
      l === null ? (t.events = [e]) : l.push(e);
    }
  }
  function kd(e) {
    var t = We().memoizedState;
    return (
      Zg({ ref: t, nextImpl: e }),
      function () {
        if ((Oe & 2) !== 0) throw Error(c(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function Ad(e, t) {
    return gu(4, 2, e, t);
  }
  function Cd(e, t) {
    return gu(4, 4, e, t);
  }
  function Md(e, t) {
    if (typeof t == 'function') {
      e = e();
      var l = t(e);
      return function () {
        typeof l == 'function' ? l() : t(null);
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
  function Rd(e, t, l) {
    ((l = l != null ? l.concat([e]) : null), gu(4, 4, Md.bind(null, t, e), l));
  }
  function Rc() {}
  function jd(e, t) {
    var l = We();
    t = t === void 0 ? null : t;
    var n = l.memoizedState;
    return t !== null && vc(t, n[1]) ? n[0] : ((l.memoizedState = [e, t]), e);
  }
  function Od(e, t) {
    var l = We();
    t = t === void 0 ? null : t;
    var n = l.memoizedState;
    if (t !== null && vc(t, n[1])) return n[0];
    if (((n = e()), En)) {
      zl(!0);
      try {
        e();
      } finally {
        zl(!1);
      }
    }
    return ((l.memoizedState = [n, t]), n);
  }
  function jc(e, t, l) {
    return l === void 0 || ((pl & 1073741824) !== 0 && (Te & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = l), (e = zm()), (_e.lanes |= e), (Kl |= e), l);
  }
  function zd(e, t, l, n) {
    return At(l, t)
      ? l
      : ea.current !== null
        ? ((e = jc(e, l, n)), At(e, t) || (et = !0), e)
        : (pl & 42) === 0 || ((pl & 1073741824) !== 0 && (Te & 261930) === 0)
          ? ((et = !0), (e.memoizedState = l))
          : ((e = zm()), (_e.lanes |= e), (Kl |= e), t);
  }
  function wd(e, t, l, n, i) {
    var s = J.p;
    J.p = s !== 0 && 8 > s ? s : 8;
    var f = U.T,
      h = {};
    ((U.T = h), wc(e, !1, t, l));
    try {
      var E = i(),
        z = U.S;
      if (
        (z !== null && z(h, E), E !== null && typeof E == 'object' && typeof E.then == 'function')
      ) {
        var H = Xg(E, n);
        Wa(e, t, H, zt(e));
      } else Wa(e, t, n, zt(e));
    } catch (X) {
      Wa(e, t, { then: function () {}, status: 'rejected', reason: X }, zt());
    } finally {
      ((J.p = s), f !== null && h.types !== null && (f.types = h.types), (U.T = f));
    }
  }
  function Ig() {}
  function Oc(e, t, l, n) {
    if (e.tag !== 5) throw Error(c(476));
    var i = Dd(e).queue;
    wd(
      e,
      i,
      t,
      te,
      l === null
        ? Ig
        : function () {
            return (Bd(e), l(n));
          }
    );
  }
  function Dd(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: te,
      baseState: te,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: yl,
        lastRenderedState: te,
      },
      next: null,
    };
    var l = {};
    return (
      (t.next = {
        memoizedState: l,
        baseState: l,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: yl,
          lastRenderedState: l,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function Bd(e) {
    var t = Dd(e);
    (t.next === null && (t = e.alternate.memoizedState), Wa(e, t.next.queue, {}, zt()));
  }
  function zc() {
    return ot(hi);
  }
  function Ud() {
    return We().memoizedState;
  }
  function Ld() {
    return We().memoizedState;
  }
  function Jg(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = zt();
          e = Gl(l);
          var n = Yl(t, e, l);
          (n !== null && (Et(n, t, l), Qa(n, t, l)), (t = { cache: cc() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function Wg(e, t, l) {
    var n = zt();
    ((l = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      _u(e) ? qd(t, l) : ((l = Ws(e, t, l, n)), l !== null && (Et(l, e, n), Gd(l, t, n))));
  }
  function Hd(e, t, l) {
    var n = zt();
    Wa(e, t, l, n);
  }
  function Wa(e, t, l, n) {
    var i = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (_u(e)) qd(t, i);
    else {
      var s = e.alternate;
      if (
        e.lanes === 0 &&
        (s === null || s.lanes === 0) &&
        ((s = t.lastRenderedReducer), s !== null)
      )
        try {
          var f = t.lastRenderedState,
            h = s(f, l);
          if (((i.hasEagerState = !0), (i.eagerState = h), At(h, f)))
            return (Fi(e, t, i, 0), qe === null && Wi(), !1);
        } catch {
        } finally {
        }
      if (((l = Ws(e, t, i, n)), l !== null)) return (Et(l, e, n), Gd(l, t, n), !0);
    }
    return !1;
  }
  function wc(e, t, l, n) {
    if (
      ((n = {
        lane: 2,
        revertLane: mo(),
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      _u(e))
    ) {
      if (t) throw Error(c(479));
    } else ((t = Ws(e, l, n, 2)), t !== null && Et(t, e, 2));
  }
  function _u(e) {
    var t = e.alternate;
    return e === _e || (t !== null && t === _e);
  }
  function qd(e, t) {
    ta = fu = !0;
    var l = e.pending;
    (l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)), (e.pending = t));
  }
  function Gd(e, t, l) {
    if ((l & 4194048) !== 0) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (l |= n), (t.lanes = l), Vr(e, l));
    }
  }
  var Fa = {
    readContext: ot,
    use: hu,
    useCallback: Ze,
    useContext: Ze,
    useEffect: Ze,
    useImperativeHandle: Ze,
    useLayoutEffect: Ze,
    useInsertionEffect: Ze,
    useMemo: Ze,
    useReducer: Ze,
    useRef: Ze,
    useState: Ze,
    useDebugValue: Ze,
    useDeferredValue: Ze,
    useTransition: Ze,
    useSyncExternalStore: Ze,
    useId: Ze,
    useHostTransitionStatus: Ze,
    useFormState: Ze,
    useActionState: Ze,
    useOptimistic: Ze,
    useMemoCache: Ze,
    useCacheRefresh: Ze,
  };
  Fa.useEffectEvent = Ze;
  var Yd = {
      readContext: ot,
      use: hu,
      useCallback: function (e, t) {
        return ((pt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: ot,
      useEffect: Nd,
      useImperativeHandle: function (e, t, l) {
        ((l = l != null ? l.concat([e]) : null), yu(4194308, 4, Md.bind(null, t, e), l));
      },
      useLayoutEffect: function (e, t) {
        return yu(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        yu(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var l = pt();
        t = t === void 0 ? null : t;
        var n = e();
        if (En) {
          zl(!0);
          try {
            e();
          } finally {
            zl(!1);
          }
        }
        return ((l.memoizedState = [n, t]), n);
      },
      useReducer: function (e, t, l) {
        var n = pt();
        if (l !== void 0) {
          var i = l(t);
          if (En) {
            zl(!0);
            try {
              l(t);
            } finally {
              zl(!1);
            }
          }
        } else i = t;
        return (
          (n.memoizedState = n.baseState = i),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: i,
          }),
          (n.queue = e),
          (e = e.dispatch = Wg.bind(null, _e, e)),
          [n.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = pt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = Ac(e);
        var t = e.queue,
          l = Hd.bind(null, _e, t);
        return ((t.dispatch = l), [e.memoizedState, l]);
      },
      useDebugValue: Rc,
      useDeferredValue: function (e, t) {
        var l = pt();
        return jc(l, e, t);
      },
      useTransition: function () {
        var e = Ac(!1);
        return ((e = wd.bind(null, _e, e.queue, !0, !1)), (pt().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, l) {
        var n = _e,
          i = pt();
        if (ke) {
          if (l === void 0) throw Error(c(407));
          l = l();
        } else {
          if (((l = t()), qe === null)) throw Error(c(349));
          (Te & 127) !== 0 || od(n, t, l);
        }
        i.memoizedState = l;
        var s = { value: l, getSnapshot: t };
        return (
          (i.queue = s),
          Nd(fd.bind(null, n, s, e), [e]),
          (n.flags |= 2048),
          na(9, { destroy: void 0 }, rd.bind(null, n, s, l, t), null),
          l
        );
      },
      useId: function () {
        var e = pt(),
          t = qe.identifierPrefix;
        if (ke) {
          var l = ll,
            n = tl;
          ((l = (n & ~(1 << (32 - kt(n) - 1))).toString(32) + l),
            (t = '_' + t + 'R_' + l),
            (l = du++),
            0 < l && (t += 'H' + l.toString(32)),
            (t += '_'));
        } else ((l = $g++), (t = '_' + t + 'r_' + l.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: zc,
      useFormState: bd,
      useActionState: bd,
      useOptimistic: function (e) {
        var t = pt();
        t.memoizedState = t.baseState = e;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((t.queue = l), (t = wc.bind(null, _e, !0, l)), (l.dispatch = t), [e, t]);
      },
      useMemoCache: Tc,
      useCacheRefresh: function () {
        return (pt().memoizedState = Jg.bind(null, _e));
      },
      useEffectEvent: function (e) {
        var t = pt(),
          l = { impl: e };
        return (
          (t.memoizedState = l),
          function () {
            if ((Oe & 2) !== 0) throw Error(c(440));
            return l.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Dc = {
      readContext: ot,
      use: hu,
      useCallback: jd,
      useContext: ot,
      useEffect: Mc,
      useImperativeHandle: Rd,
      useInsertionEffect: Ad,
      useLayoutEffect: Cd,
      useMemo: Od,
      useReducer: pu,
      useRef: Td,
      useState: function () {
        return pu(yl);
      },
      useDebugValue: Rc,
      useDeferredValue: function (e, t) {
        var l = We();
        return zd(l, Ue.memoizedState, e, t);
      },
      useTransition: function () {
        var e = pu(yl)[0],
          t = We().memoizedState;
        return [typeof e == 'boolean' ? e : Ja(e), t];
      },
      useSyncExternalStore: cd,
      useId: Ud,
      useHostTransitionStatus: zc,
      useFormState: Sd,
      useActionState: Sd,
      useOptimistic: function (e, t) {
        var l = We();
        return hd(l, Ue, e, t);
      },
      useMemoCache: Tc,
      useCacheRefresh: Ld,
    };
  Dc.useEffectEvent = kd;
  var Xd = {
    readContext: ot,
    use: hu,
    useCallback: jd,
    useContext: ot,
    useEffect: Mc,
    useImperativeHandle: Rd,
    useInsertionEffect: Ad,
    useLayoutEffect: Cd,
    useMemo: Od,
    useReducer: kc,
    useRef: Td,
    useState: function () {
      return kc(yl);
    },
    useDebugValue: Rc,
    useDeferredValue: function (e, t) {
      var l = We();
      return Ue === null ? jc(l, e, t) : zd(l, Ue.memoizedState, e, t);
    },
    useTransition: function () {
      var e = kc(yl)[0],
        t = We().memoizedState;
      return [typeof e == 'boolean' ? e : Ja(e), t];
    },
    useSyncExternalStore: cd,
    useId: Ud,
    useHostTransitionStatus: zc,
    useFormState: Ed,
    useActionState: Ed,
    useOptimistic: function (e, t) {
      var l = We();
      return Ue !== null ? hd(l, Ue, e, t) : ((l.baseState = e), [e, l.queue.dispatch]);
    },
    useMemoCache: Tc,
    useCacheRefresh: Ld,
  };
  Xd.useEffectEvent = kd;
  function Bc(e, t, l, n) {
    ((t = e.memoizedState),
      (l = l(n, t)),
      (l = l == null ? t : S({}, t, l)),
      (e.memoizedState = l),
      e.lanes === 0 && (e.updateQueue.baseState = l));
  }
  var Uc = {
    enqueueSetState: function (e, t, l) {
      e = e._reactInternals;
      var n = zt(),
        i = Gl(n);
      ((i.payload = t),
        l != null && (i.callback = l),
        (t = Yl(e, i, n)),
        t !== null && (Et(t, e, n), Qa(t, e, n)));
    },
    enqueueReplaceState: function (e, t, l) {
      e = e._reactInternals;
      var n = zt(),
        i = Gl(n);
      ((i.tag = 1),
        (i.payload = t),
        l != null && (i.callback = l),
        (t = Yl(e, i, n)),
        t !== null && (Et(t, e, n), Qa(t, e, n)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var l = zt(),
        n = Gl(l);
      ((n.tag = 2),
        t != null && (n.callback = t),
        (t = Yl(e, n, l)),
        t !== null && (Et(t, e, l), Qa(t, e, l)));
    },
  };
  function $d(e, t, l, n, i, s, f) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(n, s, f)
        : t.prototype && t.prototype.isPureReactComponent
          ? !La(l, n) || !La(i, s)
          : !0
    );
  }
  function Vd(e, t, l, n) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(l, n),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(l, n),
      t.state !== e && Uc.enqueueReplaceState(t, t.state, null));
  }
  function Tn(e, t) {
    var l = t;
    if ('ref' in t) {
      l = {};
      for (var n in t) n !== 'ref' && (l[n] = t[n]);
    }
    if ((e = e.defaultProps)) {
      l === t && (l = S({}, l));
      for (var i in e) l[i] === void 0 && (l[i] = e[i]);
    }
    return l;
  }
  function Qd(e) {
    Ji(e);
  }
  function Kd(e) {
    console.error(e);
  }
  function Zd(e) {
    Ji(e);
  }
  function vu(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function Id(e, t, l) {
    try {
      var n = e.onCaughtError;
      n(l.value, { componentStack: l.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (i) {
      setTimeout(function () {
        throw i;
      });
    }
  }
  function Lc(e, t, l) {
    return (
      (l = Gl(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        vu(e, t);
      }),
      l
    );
  }
  function Jd(e) {
    return ((e = Gl(e)), (e.tag = 3), e);
  }
  function Wd(e, t, l, n) {
    var i = l.type.getDerivedStateFromError;
    if (typeof i == 'function') {
      var s = n.value;
      ((e.payload = function () {
        return i(s);
      }),
        (e.callback = function () {
          Id(t, l, n);
        }));
    }
    var f = l.stateNode;
    f !== null &&
      typeof f.componentDidCatch == 'function' &&
      (e.callback = function () {
        (Id(t, l, n),
          typeof i != 'function' && (Zl === null ? (Zl = new Set([this])) : Zl.add(this)));
        var h = n.stack;
        this.componentDidCatch(n.value, { componentStack: h !== null ? h : '' });
      });
  }
  function Fg(e, t, l, n, i) {
    if (((l.flags |= 32768), n !== null && typeof n == 'object' && typeof n.then == 'function')) {
      if (((t = l.alternate), t !== null && In(t, l, i, !0), (l = Mt.current), l !== null)) {
        switch (l.tag) {
          case 31:
          case 13:
            return (
              Xt === null ? ju() : l.alternate === null && Ie === 0 && (Ie = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = i),
              n === uu
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null ? (l.updateQueue = new Set([n])) : t.add(n),
                  oo(e, n, i)),
              !1
            );
          case 22:
            return (
              (l.flags |= 65536),
              n === uu
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([n]) }),
                      (l.updateQueue = t))
                    : ((l = t.retryQueue), l === null ? (t.retryQueue = new Set([n])) : l.add(n)),
                  oo(e, n, i)),
              !1
            );
        }
        throw Error(c(435, l.tag));
      }
      return (oo(e, n, i), ju(), !1);
    }
    if (ke)
      return (
        (t = Mt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = i),
            n !== nc && ((e = Error(c(422), { cause: n })), Ga(Ht(e, l))))
          : (n !== nc && ((t = Error(c(423), { cause: n })), Ga(Ht(t, l))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (i &= -i),
            (e.lanes |= i),
            (n = Ht(n, l)),
            (i = Lc(e.stateNode, n, i)),
            hc(e, i),
            Ie !== 4 && (Ie = 2)),
        !1
      );
    var s = Error(c(520), { cause: n });
    if (((s = Ht(s, l)), ui === null ? (ui = [s]) : ui.push(s), Ie !== 4 && (Ie = 2), t === null))
      return !0;
    ((n = Ht(n, l)), (l = t));
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (e = i & -i),
            (l.lanes |= e),
            (e = Lc(l.stateNode, n, e)),
            hc(l, e),
            !1
          );
        case 1:
          if (
            ((t = l.type),
            (s = l.stateNode),
            (l.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == 'function' ||
                (s !== null &&
                  typeof s.componentDidCatch == 'function' &&
                  (Zl === null || !Zl.has(s)))))
          )
            return (
              (l.flags |= 65536),
              (i &= -i),
              (l.lanes |= i),
              (i = Jd(i)),
              Wd(i, e, l, n),
              hc(l, i),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Hc = Error(c(461)),
    et = !1;
  function rt(e, t, l, n) {
    t.child = e === null ? td(t, null, l, n) : xn(t, e.child, l, n);
  }
  function Fd(e, t, l, n, i) {
    l = l.render;
    var s = t.ref;
    if ('ref' in n) {
      var f = {};
      for (var h in n) h !== 'ref' && (f[h] = n[h]);
    } else f = n;
    return (
      _n(t),
      (n = bc(e, t, l, f, s, i)),
      (h = Sc()),
      e !== null && !et
        ? (xc(e, t, i), gl(e, t, i))
        : (ke && h && tc(t), (t.flags |= 1), rt(e, t, n, i), t.child)
    );
  }
  function Pd(e, t, l, n, i) {
    if (e === null) {
      var s = l.type;
      return typeof s == 'function' && !Fs(s) && s.defaultProps === void 0 && l.compare === null
        ? ((t.tag = 15), (t.type = s), em(e, t, s, n, i))
        : ((e = eu(l.type, null, n, t, t.mode, i)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((s = e.child), !Kc(e, i))) {
      var f = s.memoizedProps;
      if (((l = l.compare), (l = l !== null ? l : La), l(f, n) && e.ref === t.ref))
        return gl(e, t, i);
    }
    return ((t.flags |= 1), (e = fl(s, n)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function em(e, t, l, n, i) {
    if (e !== null) {
      var s = e.memoizedProps;
      if (La(s, n) && e.ref === t.ref)
        if (((et = !1), (t.pendingProps = n = s), Kc(e, i))) (e.flags & 131072) !== 0 && (et = !0);
        else return ((t.lanes = e.lanes), gl(e, t, i));
    }
    return qc(e, t, l, n, i);
  }
  function tm(e, t, l, n) {
    var i = n.children,
      s = e !== null ? e.memoizedState : null;
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
        if (((s = s !== null ? s.baseLanes | l : l), e !== null)) {
          for (n = t.child = e.child, i = 0; n !== null; )
            ((i = i | n.lanes | n.childLanes), (n = n.sibling));
          n = i & ~s;
        } else ((n = 0), (t.child = null));
        return lm(e, t, s, l, n);
      }
      if ((l & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && au(t, s !== null ? s.cachePool : null),
          s !== null ? ad(t, s) : yc(),
          id(t));
      else return ((n = t.lanes = 536870912), lm(e, t, s !== null ? s.baseLanes | l : l, l, n));
    } else
      s !== null
        ? (au(t, s.cachePool), ad(t, s), $l(), (t.memoizedState = null))
        : (e !== null && au(t, null), yc(), $l());
    return (rt(e, t, i, l), t.child);
  }
  function Pa(e, t) {
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
  function lm(e, t, l, n, i) {
    var s = rc();
    return (
      (s = s === null ? null : { parent: Fe._currentValue, pool: s }),
      (t.memoizedState = { baseLanes: l, cachePool: s }),
      e !== null && au(t, null),
      yc(),
      id(t),
      e !== null && In(e, t, n, !0),
      (t.childLanes = i),
      null
    );
  }
  function bu(e, t) {
    return (
      (t = xu({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function nm(e, t, l) {
    return (
      xn(t, e.child, null, l),
      (e = bu(t, t.pendingProps)),
      (e.flags |= 2),
      Rt(t),
      (t.memoizedState = null),
      e
    );
  }
  function Pg(e, t, l) {
    var n = t.pendingProps,
      i = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (ke) {
        if (n.mode === 'hidden') return ((e = bu(t, n)), (t.lanes = 536870912), Pa(null, e));
        if (
          (_c(t),
          (e = Ge)
            ? ((e = ph(e, Yt)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Bl !== null ? { id: tl, overflow: ll } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = qf(e)),
                (l.return = t),
                (t.child = l),
                (ct = t),
                (Ge = null)))
            : (e = null),
          e === null)
        )
          throw Ll(t);
        return ((t.lanes = 536870912), null);
      }
      return bu(t, n);
    }
    var s = e.memoizedState;
    if (s !== null) {
      var f = s.dehydrated;
      if ((_c(t), i))
        if (t.flags & 256) ((t.flags &= -257), (t = nm(e, t, l)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(c(558));
      else if ((et || In(e, t, l, !1), (i = (l & e.childLanes) !== 0), et || i)) {
        if (((n = qe), n !== null && ((f = Qr(n, l)), f !== 0 && f !== s.retryLane)))
          throw ((s.retryLane = f), hn(e, f), Et(n, e, f), Hc);
        (ju(), (t = nm(e, t, l)));
      } else
        ((e = s.treeContext),
          (Ge = $t(f.nextSibling)),
          (ct = t),
          (ke = !0),
          (Ul = null),
          (Yt = !1),
          e !== null && Xf(t, e),
          (t = bu(t, n)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = fl(e.child, { mode: n.mode, children: n.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function Su(e, t) {
    var l = t.ref;
    if (l === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != 'function' && typeof l != 'object') throw Error(c(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function qc(e, t, l, n, i) {
    return (
      _n(t),
      (l = bc(e, t, l, n, void 0, i)),
      (n = Sc()),
      e !== null && !et
        ? (xc(e, t, i), gl(e, t, i))
        : (ke && n && tc(t), (t.flags |= 1), rt(e, t, l, i), t.child)
    );
  }
  function am(e, t, l, n, i, s) {
    return (
      _n(t),
      (t.updateQueue = null),
      (l = sd(t, n, l, i)),
      ud(e),
      (n = Sc()),
      e !== null && !et
        ? (xc(e, t, s), gl(e, t, s))
        : (ke && n && tc(t), (t.flags |= 1), rt(e, t, l, s), t.child)
    );
  }
  function im(e, t, l, n, i) {
    if ((_n(t), t.stateNode === null)) {
      var s = Vn,
        f = l.contextType;
      (typeof f == 'object' && f !== null && (s = ot(f)),
        (s = new l(n, s)),
        (t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null),
        (s.updater = Uc),
        (t.stateNode = s),
        (s._reactInternals = t),
        (s = t.stateNode),
        (s.props = n),
        (s.state = t.memoizedState),
        (s.refs = {}),
        dc(t),
        (f = l.contextType),
        (s.context = typeof f == 'object' && f !== null ? ot(f) : Vn),
        (s.state = t.memoizedState),
        (f = l.getDerivedStateFromProps),
        typeof f == 'function' && (Bc(t, l, f, n), (s.state = t.memoizedState)),
        typeof l.getDerivedStateFromProps == 'function' ||
          typeof s.getSnapshotBeforeUpdate == 'function' ||
          (typeof s.UNSAFE_componentWillMount != 'function' &&
            typeof s.componentWillMount != 'function') ||
          ((f = s.state),
          typeof s.componentWillMount == 'function' && s.componentWillMount(),
          typeof s.UNSAFE_componentWillMount == 'function' && s.UNSAFE_componentWillMount(),
          f !== s.state && Uc.enqueueReplaceState(s, s.state, null),
          Za(t, n, s, i),
          Ka(),
          (s.state = t.memoizedState)),
        typeof s.componentDidMount == 'function' && (t.flags |= 4194308),
        (n = !0));
    } else if (e === null) {
      s = t.stateNode;
      var h = t.memoizedProps,
        E = Tn(l, h);
      s.props = E;
      var z = s.context,
        H = l.contextType;
      ((f = Vn), typeof H == 'object' && H !== null && (f = ot(H)));
      var X = l.getDerivedStateFromProps;
      ((H = typeof X == 'function' || typeof s.getSnapshotBeforeUpdate == 'function'),
        (h = t.pendingProps !== h),
        H ||
          (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof s.componentWillReceiveProps != 'function') ||
          ((h || z !== f) && Vd(t, s, n, f)),
        (ql = !1));
      var D = t.memoizedState;
      ((s.state = D),
        Za(t, n, s, i),
        Ka(),
        (z = t.memoizedState),
        h || D !== z || ql
          ? (typeof X == 'function' && (Bc(t, l, X, n), (z = t.memoizedState)),
            (E = ql || $d(t, l, E, n, D, z, f))
              ? (H ||
                  (typeof s.UNSAFE_componentWillMount != 'function' &&
                    typeof s.componentWillMount != 'function') ||
                  (typeof s.componentWillMount == 'function' && s.componentWillMount(),
                  typeof s.UNSAFE_componentWillMount == 'function' &&
                    s.UNSAFE_componentWillMount()),
                typeof s.componentDidMount == 'function' && (t.flags |= 4194308))
              : (typeof s.componentDidMount == 'function' && (t.flags |= 4194308),
                (t.memoizedProps = n),
                (t.memoizedState = z)),
            (s.props = n),
            (s.state = z),
            (s.context = f),
            (n = E))
          : (typeof s.componentDidMount == 'function' && (t.flags |= 4194308), (n = !1)));
    } else {
      ((s = t.stateNode),
        mc(e, t),
        (f = t.memoizedProps),
        (H = Tn(l, f)),
        (s.props = H),
        (X = t.pendingProps),
        (D = s.context),
        (z = l.contextType),
        (E = Vn),
        typeof z == 'object' && z !== null && (E = ot(z)),
        (h = l.getDerivedStateFromProps),
        (z = typeof h == 'function' || typeof s.getSnapshotBeforeUpdate == 'function') ||
          (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof s.componentWillReceiveProps != 'function') ||
          ((f !== X || D !== E) && Vd(t, s, n, E)),
        (ql = !1),
        (D = t.memoizedState),
        (s.state = D),
        Za(t, n, s, i),
        Ka());
      var B = t.memoizedState;
      f !== X || D !== B || ql || (e !== null && e.dependencies !== null && lu(e.dependencies))
        ? (typeof h == 'function' && (Bc(t, l, h, n), (B = t.memoizedState)),
          (H =
            ql ||
            $d(t, l, H, n, D, B, E) ||
            (e !== null && e.dependencies !== null && lu(e.dependencies)))
            ? (z ||
                (typeof s.UNSAFE_componentWillUpdate != 'function' &&
                  typeof s.componentWillUpdate != 'function') ||
                (typeof s.componentWillUpdate == 'function' && s.componentWillUpdate(n, B, E),
                typeof s.UNSAFE_componentWillUpdate == 'function' &&
                  s.UNSAFE_componentWillUpdate(n, B, E)),
              typeof s.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof s.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof s.componentDidUpdate != 'function' ||
                (f === e.memoizedProps && D === e.memoizedState) ||
                (t.flags |= 4),
              typeof s.getSnapshotBeforeUpdate != 'function' ||
                (f === e.memoizedProps && D === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = n),
              (t.memoizedState = B)),
          (s.props = n),
          (s.state = B),
          (s.context = E),
          (n = H))
        : (typeof s.componentDidUpdate != 'function' ||
            (f === e.memoizedProps && D === e.memoizedState) ||
            (t.flags |= 4),
          typeof s.getSnapshotBeforeUpdate != 'function' ||
            (f === e.memoizedProps && D === e.memoizedState) ||
            (t.flags |= 1024),
          (n = !1));
    }
    return (
      (s = n),
      Su(e, t),
      (n = (t.flags & 128) !== 0),
      s || n
        ? ((s = t.stateNode),
          (l = n && typeof l.getDerivedStateFromError != 'function' ? null : s.render()),
          (t.flags |= 1),
          e !== null && n
            ? ((t.child = xn(t, e.child, null, i)), (t.child = xn(t, null, l, i)))
            : rt(e, t, l, i),
          (t.memoizedState = s.state),
          (e = t.child))
        : (e = gl(e, t, i)),
      e
    );
  }
  function um(e, t, l, n) {
    return (yn(), (t.flags |= 256), rt(e, t, l, n), t.child);
  }
  var Gc = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Yc(e) {
    return { baseLanes: e, cachePool: If() };
  }
  function Xc(e, t, l) {
    return ((e = e !== null ? e.childLanes & ~l : 0), t && (e |= Ot), e);
  }
  function sm(e, t, l) {
    var n = t.pendingProps,
      i = !1,
      s = (t.flags & 128) !== 0,
      f;
    if (
      ((f = s) || (f = e !== null && e.memoizedState === null ? !1 : (Je.current & 2) !== 0),
      f && ((i = !0), (t.flags &= -129)),
      (f = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (ke) {
        if (
          (i ? Xl(t) : $l(),
          (e = Ge)
            ? ((e = ph(e, Yt)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Bl !== null ? { id: tl, overflow: ll } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = qf(e)),
                (l.return = t),
                (t.child = l),
                (ct = t),
                (Ge = null)))
            : (e = null),
          e === null)
        )
          throw Ll(t);
        return (ko(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var h = n.children;
      return (
        (n = n.fallback),
        i
          ? ($l(),
            (i = t.mode),
            (h = xu({ mode: 'hidden', children: h }, i)),
            (n = pn(n, i, l, null)),
            (h.return = t),
            (n.return = t),
            (h.sibling = n),
            (t.child = h),
            (n = t.child),
            (n.memoizedState = Yc(l)),
            (n.childLanes = Xc(e, f, l)),
            (t.memoizedState = Gc),
            Pa(null, n))
          : (Xl(t), $c(t, h))
      );
    }
    var E = e.memoizedState;
    if (E !== null && ((h = E.dehydrated), h !== null)) {
      if (s)
        t.flags & 256
          ? (Xl(t), (t.flags &= -257), (t = Vc(e, t, l)))
          : t.memoizedState !== null
            ? ($l(), (t.child = e.child), (t.flags |= 128), (t = null))
            : ($l(),
              (h = n.fallback),
              (i = t.mode),
              (n = xu({ mode: 'visible', children: n.children }, i)),
              (h = pn(h, i, l, null)),
              (h.flags |= 2),
              (n.return = t),
              (h.return = t),
              (n.sibling = h),
              (t.child = n),
              xn(t, e.child, null, l),
              (n = t.child),
              (n.memoizedState = Yc(l)),
              (n.childLanes = Xc(e, f, l)),
              (t.memoizedState = Gc),
              (t = Pa(null, n)));
      else if ((Xl(t), ko(h))) {
        if (((f = h.nextSibling && h.nextSibling.dataset), f)) var z = f.dgst;
        ((f = z),
          (n = Error(c(419))),
          (n.stack = ''),
          (n.digest = f),
          Ga({ value: n, source: null, stack: null }),
          (t = Vc(e, t, l)));
      } else if ((et || In(e, t, l, !1), (f = (l & e.childLanes) !== 0), et || f)) {
        if (((f = qe), f !== null && ((n = Qr(f, l)), n !== 0 && n !== E.retryLane)))
          throw ((E.retryLane = n), hn(e, n), Et(f, e, n), Hc);
        (No(h) || ju(), (t = Vc(e, t, l)));
      } else
        No(h)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = E.treeContext),
            (Ge = $t(h.nextSibling)),
            (ct = t),
            (ke = !0),
            (Ul = null),
            (Yt = !1),
            e !== null && Xf(t, e),
            (t = $c(t, n.children)),
            (t.flags |= 4096));
      return t;
    }
    return i
      ? ($l(),
        (h = n.fallback),
        (i = t.mode),
        (E = e.child),
        (z = E.sibling),
        (n = fl(E, { mode: 'hidden', children: n.children })),
        (n.subtreeFlags = E.subtreeFlags & 65011712),
        z !== null ? (h = fl(z, h)) : ((h = pn(h, i, l, null)), (h.flags |= 2)),
        (h.return = t),
        (n.return = t),
        (n.sibling = h),
        (t.child = n),
        Pa(null, n),
        (n = t.child),
        (h = e.child.memoizedState),
        h === null
          ? (h = Yc(l))
          : ((i = h.cachePool),
            i !== null
              ? ((E = Fe._currentValue), (i = i.parent !== E ? { parent: E, pool: E } : i))
              : (i = If()),
            (h = { baseLanes: h.baseLanes | l, cachePool: i })),
        (n.memoizedState = h),
        (n.childLanes = Xc(e, f, l)),
        (t.memoizedState = Gc),
        Pa(e.child, n))
      : (Xl(t),
        (l = e.child),
        (e = l.sibling),
        (l = fl(l, { mode: 'visible', children: n.children })),
        (l.return = t),
        (l.sibling = null),
        e !== null &&
          ((f = t.deletions), f === null ? ((t.deletions = [e]), (t.flags |= 16)) : f.push(e)),
        (t.child = l),
        (t.memoizedState = null),
        l);
  }
  function $c(e, t) {
    return ((t = xu({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function xu(e, t) {
    return ((e = Ct(22, e, null, t)), (e.lanes = 0), e);
  }
  function Vc(e, t, l) {
    return (
      xn(t, e.child, null, l),
      (e = $c(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function cm(e, t, l) {
    e.lanes |= t;
    var n = e.alternate;
    (n !== null && (n.lanes |= t), uc(e.return, t, l));
  }
  function Qc(e, t, l, n, i, s) {
    var f = e.memoizedState;
    f === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: n,
          tail: l,
          tailMode: i,
          treeForkCount: s,
        })
      : ((f.isBackwards = t),
        (f.rendering = null),
        (f.renderingStartTime = 0),
        (f.last = n),
        (f.tail = l),
        (f.tailMode = i),
        (f.treeForkCount = s));
  }
  function om(e, t, l) {
    var n = t.pendingProps,
      i = n.revealOrder,
      s = n.tail;
    n = n.children;
    var f = Je.current,
      h = (f & 2) !== 0;
    if (
      (h ? ((f = (f & 1) | 2), (t.flags |= 128)) : (f &= 1),
      P(Je, f),
      rt(e, t, n, l),
      (n = ke ? qa : 0),
      !h && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && cm(e, l, t);
        else if (e.tag === 19) cm(e, l, t);
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
    switch (i) {
      case 'forwards':
        for (l = t.child, i = null; l !== null; )
          ((e = l.alternate), e !== null && ru(e) === null && (i = l), (l = l.sibling));
        ((l = i),
          l === null ? ((i = t.child), (t.child = null)) : ((i = l.sibling), (l.sibling = null)),
          Qc(t, !1, i, l, s, n));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (l = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && ru(e) === null)) {
            t.child = i;
            break;
          }
          ((e = i.sibling), (i.sibling = l), (l = i), (i = e));
        }
        Qc(t, !0, l, null, s, n);
        break;
      case 'together':
        Qc(t, !1, null, null, void 0, n);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function gl(e, t, l) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (Kl |= t.lanes), (l & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((In(e, t, l, !1), (l & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(c(153));
    if (t.child !== null) {
      for (e = t.child, l = fl(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        ((e = e.sibling), (l = l.sibling = fl(e, e.pendingProps)), (l.return = t));
      l.sibling = null;
    }
    return t.child;
  }
  function Kc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && lu(e)));
  }
  function e0(e, t, l) {
    switch (t.tag) {
      case 3:
        (at(t, t.stateNode.containerInfo), Hl(t, Fe, e.memoizedState.cache), yn());
        break;
      case 27:
      case 5:
        G(t);
        break;
      case 4:
        at(t, t.stateNode.containerInfo);
        break;
      case 10:
        Hl(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), _c(t), null);
        break;
      case 13:
        var n = t.memoizedState;
        if (n !== null)
          return n.dehydrated !== null
            ? (Xl(t), (t.flags |= 128), null)
            : (l & t.child.childLanes) !== 0
              ? sm(e, t, l)
              : (Xl(t), (e = gl(e, t, l)), e !== null ? e.sibling : null);
        Xl(t);
        break;
      case 19:
        var i = (e.flags & 128) !== 0;
        if (
          ((n = (l & t.childLanes) !== 0),
          n || (In(e, t, l, !1), (n = (l & t.childLanes) !== 0)),
          i)
        ) {
          if (n) return om(e, t, l);
          t.flags |= 128;
        }
        if (
          ((i = t.memoizedState),
          i !== null && ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
          P(Je, Je.current),
          n)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), tm(e, t, l, t.pendingProps));
      case 24:
        Hl(t, Fe, e.memoizedState.cache);
    }
    return gl(e, t, l);
  }
  function rm(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) et = !0;
      else {
        if (!Kc(e, l) && (t.flags & 128) === 0) return ((et = !1), e0(e, t, l));
        et = (e.flags & 131072) !== 0;
      }
    else ((et = !1), ke && (t.flags & 1048576) !== 0 && Yf(t, qa, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var n = t.pendingProps;
          if (((e = bn(t.elementType)), (t.type = e), typeof e == 'function'))
            Fs(e)
              ? ((n = Tn(e, n)), (t.tag = 1), (t = im(null, t, e, n, l)))
              : ((t.tag = 0), (t = qc(null, t, e, n, l)));
          else {
            if (e != null) {
              var i = e.$$typeof;
              if (i === V) {
                ((t.tag = 11), (t = Fd(null, t, e, n, l)));
                break e;
              } else if (i === Q) {
                ((t.tag = 14), (t = Pd(null, t, e, n, l)));
                break e;
              }
            }
            throw ((t = F(e) || e), Error(c(306, t, '')));
          }
        }
        return t;
      case 0:
        return qc(e, t, t.type, t.pendingProps, l);
      case 1:
        return ((n = t.type), (i = Tn(n, t.pendingProps)), im(e, t, n, i, l));
      case 3:
        e: {
          if ((at(t, t.stateNode.containerInfo), e === null)) throw Error(c(387));
          n = t.pendingProps;
          var s = t.memoizedState;
          ((i = s.element), mc(e, t), Za(t, n, null, l));
          var f = t.memoizedState;
          if (
            ((n = f.cache),
            Hl(t, Fe, n),
            n !== s.cache && sc(t, [Fe], l, !0),
            Ka(),
            (n = f.element),
            s.isDehydrated)
          )
            if (
              ((s = { element: n, isDehydrated: !1, cache: f.cache }),
              (t.updateQueue.baseState = s),
              (t.memoizedState = s),
              t.flags & 256)
            ) {
              t = um(e, t, n, l);
              break e;
            } else if (n !== i) {
              ((i = Ht(Error(c(424)), t)), Ga(i), (t = um(e, t, n, l)));
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
                Ge = $t(e.firstChild),
                  ct = t,
                  ke = !0,
                  Ul = null,
                  Yt = !0,
                  l = td(t, null, n, l),
                  t.child = l;
                l;
              )
                ((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
            }
          else {
            if ((yn(), n === i)) {
              t = gl(e, t, l);
              break e;
            }
            rt(e, t, n, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          Su(e, t),
          e === null
            ? (l = Sh(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = l)
              : ke ||
                ((l = t.type),
                (e = t.pendingProps),
                (n = Lu(be.current).createElement(l)),
                (n[st] = t),
                (n[gt] = e),
                ft(n, l, e),
                it(n),
                (t.stateNode = n))
            : (t.memoizedState = Sh(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          G(t),
          e === null &&
            ke &&
            ((n = t.stateNode = _h(t.type, t.pendingProps, be.current)),
            (ct = t),
            (Yt = !0),
            (i = Ge),
            Fl(t.type) ? ((Ao = i), (Ge = $t(n.firstChild))) : (Ge = i)),
          rt(e, t, t.pendingProps.children, l),
          Su(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            ke &&
            ((i = n = Ge) &&
              ((n = R0(n, t.type, t.pendingProps, Yt)),
              n !== null
                ? ((t.stateNode = n), (ct = t), (Ge = $t(n.firstChild)), (Yt = !1), (i = !0))
                : (i = !1)),
            i || Ll(t)),
          G(t),
          (i = t.type),
          (s = t.pendingProps),
          (f = e !== null ? e.memoizedProps : null),
          (n = s.children),
          xo(i, s) ? (n = null) : f !== null && xo(i, f) && (t.flags |= 32),
          t.memoizedState !== null && ((i = bc(e, t, Vg, null, null, l)), (hi._currentValue = i)),
          Su(e, t),
          rt(e, t, n, l),
          t.child
        );
      case 6:
        return (
          e === null &&
            ke &&
            ((e = l = Ge) &&
              ((l = j0(l, t.pendingProps, Yt)),
              l !== null ? ((t.stateNode = l), (ct = t), (Ge = null), (e = !0)) : (e = !1)),
            e || Ll(t)),
          null
        );
      case 13:
        return sm(e, t, l);
      case 4:
        return (
          at(t, t.stateNode.containerInfo),
          (n = t.pendingProps),
          e === null ? (t.child = xn(t, null, n, l)) : rt(e, t, n, l),
          t.child
        );
      case 11:
        return Fd(e, t, t.type, t.pendingProps, l);
      case 7:
        return (rt(e, t, t.pendingProps, l), t.child);
      case 8:
        return (rt(e, t, t.pendingProps.children, l), t.child);
      case 12:
        return (rt(e, t, t.pendingProps.children, l), t.child);
      case 10:
        return ((n = t.pendingProps), Hl(t, t.type, n.value), rt(e, t, n.children, l), t.child);
      case 9:
        return (
          (i = t.type._context),
          (n = t.pendingProps.children),
          _n(t),
          (i = ot(i)),
          (n = n(i)),
          (t.flags |= 1),
          rt(e, t, n, l),
          t.child
        );
      case 14:
        return Pd(e, t, t.type, t.pendingProps, l);
      case 15:
        return em(e, t, t.type, t.pendingProps, l);
      case 19:
        return om(e, t, l);
      case 31:
        return Pg(e, t, l);
      case 22:
        return tm(e, t, l, t.pendingProps);
      case 24:
        return (
          _n(t),
          (n = ot(Fe)),
          e === null
            ? ((i = rc()),
              i === null &&
                ((i = qe),
                (s = cc()),
                (i.pooledCache = s),
                s.refCount++,
                s !== null && (i.pooledCacheLanes |= l),
                (i = s)),
              (t.memoizedState = { parent: n, cache: i }),
              dc(t),
              Hl(t, Fe, i))
            : ((e.lanes & l) !== 0 && (mc(e, t), Za(t, null, null, l), Ka()),
              (i = e.memoizedState),
              (s = t.memoizedState),
              i.parent !== n
                ? ((i = { parent: n, cache: n }),
                  (t.memoizedState = i),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i),
                  Hl(t, Fe, n))
                : ((n = s.cache), Hl(t, Fe, n), n !== i.cache && sc(t, [Fe], l, !0))),
          rt(e, t, t.pendingProps.children, l),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(c(156, t.tag));
  }
  function _l(e) {
    e.flags |= 4;
  }
  function Zc(e, t, l, n, i) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (i & 335544128) === i))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Um()) e.flags |= 8192;
        else throw ((Sn = uu), fc);
    } else e.flags &= -16777217;
  }
  function fm(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !kh(t)))
      if (Um()) e.flags |= 8192;
      else throw ((Sn = uu), fc);
  }
  function Eu(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? Xr() : 536870912), (e.lanes |= t), (sa |= t)));
  }
  function ei(e, t) {
    if (!ke)
      switch (e.tailMode) {
        case 'hidden':
          t = e.tail;
          for (var l = null; t !== null; ) (t.alternate !== null && (l = t), (t = t.sibling));
          l === null ? (e.tail = null) : (l.sibling = null);
          break;
        case 'collapsed':
          l = e.tail;
          for (var n = null; l !== null; ) (l.alternate !== null && (n = l), (l = l.sibling));
          n === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (n.sibling = null);
      }
  }
  function Ye(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      l = 0,
      n = 0;
    if (t)
      for (var i = e.child; i !== null; )
        ((l |= i.lanes | i.childLanes),
          (n |= i.subtreeFlags & 65011712),
          (n |= i.flags & 65011712),
          (i.return = e),
          (i = i.sibling));
    else
      for (i = e.child; i !== null; )
        ((l |= i.lanes | i.childLanes),
          (n |= i.subtreeFlags),
          (n |= i.flags),
          (i.return = e),
          (i = i.sibling));
    return ((e.subtreeFlags |= n), (e.childLanes = l), t);
  }
  function t0(e, t, l) {
    var n = t.pendingProps;
    switch ((lc(t), t.tag)) {
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
          (l = t.stateNode),
          (n = null),
          e !== null && (n = e.memoizedState.cache),
          t.memoizedState.cache !== n && (t.flags |= 2048),
          hl(Fe),
          Xe(),
          l.pendingContext && ((l.context = l.pendingContext), (l.pendingContext = null)),
          (e === null || e.child === null) &&
            (Zn(t)
              ? _l(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), ac())),
          Ye(t),
          null
        );
      case 26:
        var i = t.type,
          s = t.memoizedState;
        return (
          e === null
            ? (_l(t), s !== null ? (Ye(t), fm(t, s)) : (Ye(t), Zc(t, i, null, n, l)))
            : s
              ? s !== e.memoizedState
                ? (_l(t), Ye(t), fm(t, s))
                : (Ye(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== n && _l(t), Ye(t), Zc(t, i, e, n, l)),
          null
        );
      case 27:
        if ((oe(t), (l = be.current), (i = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && _l(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(c(166));
            return (Ye(t), null);
          }
          ((e = le.current), Zn(t) ? $f(t) : ((e = _h(i, n, l)), (t.stateNode = e), _l(t)));
        }
        return (Ye(t), null);
      case 5:
        if ((oe(t), (i = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && _l(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(c(166));
            return (Ye(t), null);
          }
          if (((s = le.current), Zn(t))) $f(t);
          else {
            var f = Lu(be.current);
            switch (s) {
              case 1:
                s = f.createElementNS('http://www.w3.org/2000/svg', i);
                break;
              case 2:
                s = f.createElementNS('http://www.w3.org/1998/Math/MathML', i);
                break;
              default:
                switch (i) {
                  case 'svg':
                    s = f.createElementNS('http://www.w3.org/2000/svg', i);
                    break;
                  case 'math':
                    s = f.createElementNS('http://www.w3.org/1998/Math/MathML', i);
                    break;
                  case 'script':
                    ((s = f.createElement('div')),
                      (s.innerHTML = '<script><\/script>'),
                      (s = s.removeChild(s.firstChild)));
                    break;
                  case 'select':
                    ((s =
                      typeof n.is == 'string'
                        ? f.createElement('select', { is: n.is })
                        : f.createElement('select')),
                      n.multiple ? (s.multiple = !0) : n.size && (s.size = n.size));
                    break;
                  default:
                    s =
                      typeof n.is == 'string'
                        ? f.createElement(i, { is: n.is })
                        : f.createElement(i);
                }
            }
            ((s[st] = t), (s[gt] = n));
            e: for (f = t.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6) s.appendChild(f.stateNode);
              else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                ((f.child.return = f), (f = f.child));
                continue;
              }
              if (f === t) break e;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === t) break e;
                f = f.return;
              }
              ((f.sibling.return = f.return), (f = f.sibling));
            }
            t.stateNode = s;
            e: switch ((ft(s, i, n), i)) {
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
            n && _l(t);
          }
        }
        return (Ye(t), Zc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, l), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== n && _l(t);
        else {
          if (typeof n != 'string' && t.stateNode === null) throw Error(c(166));
          if (((e = be.current), Zn(t))) {
            if (((e = t.stateNode), (l = t.memoizedProps), (n = null), (i = ct), i !== null))
              switch (i.tag) {
                case 27:
                case 5:
                  n = i.memoizedProps;
              }
            ((e[st] = t),
              (e = !!(
                e.nodeValue === l ||
                (n !== null && n.suppressHydrationWarning === !0) ||
                sh(e.nodeValue, l)
              )),
              e || Ll(t, !0));
          } else ((e = Lu(e).createTextNode(n)), (e[st] = t), (t.stateNode = e));
        }
        return (Ye(t), null);
      case 31:
        if (((l = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((n = Zn(t)), l !== null)) {
            if (e === null) {
              if (!n) throw Error(c(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(c(557));
              e[st] = t;
            } else (yn(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Ye(t), (e = !1));
          } else
            ((l = ac()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l),
              (e = !0));
          if (!e) return t.flags & 256 ? (Rt(t), t) : (Rt(t), null);
          if ((t.flags & 128) !== 0) throw Error(c(558));
        }
        return (Ye(t), null);
      case 13:
        if (
          ((n = t.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((i = Zn(t)), n !== null && n.dehydrated !== null)) {
            if (e === null) {
              if (!i) throw Error(c(318));
              if (((i = t.memoizedState), (i = i !== null ? i.dehydrated : null), !i))
                throw Error(c(317));
              i[st] = t;
            } else (yn(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Ye(t), (i = !1));
          } else
            ((i = ac()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i),
              (i = !0));
          if (!i) return t.flags & 256 ? (Rt(t), t) : (Rt(t), null);
        }
        return (
          Rt(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = l), t)
            : ((l = n !== null),
              (e = e !== null && e.memoizedState !== null),
              l &&
                ((n = t.child),
                (i = null),
                n.alternate !== null &&
                  n.alternate.memoizedState !== null &&
                  n.alternate.memoizedState.cachePool !== null &&
                  (i = n.alternate.memoizedState.cachePool.pool),
                (s = null),
                n.memoizedState !== null &&
                  n.memoizedState.cachePool !== null &&
                  (s = n.memoizedState.cachePool.pool),
                s !== i && (n.flags |= 2048)),
              l !== e && l && (t.child.flags |= 8192),
              Eu(t, t.updateQueue),
              Ye(t),
              null)
        );
      case 4:
        return (Xe(), e === null && go(t.stateNode.containerInfo), Ye(t), null);
      case 10:
        return (hl(t.type), Ye(t), null);
      case 19:
        if ((q(Je), (n = t.memoizedState), n === null)) return (Ye(t), null);
        if (((i = (t.flags & 128) !== 0), (s = n.rendering), s === null))
          if (i) ei(n, !1);
          else {
            if (Ie !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((s = ru(e)), s !== null)) {
                  for (
                    t.flags |= 128,
                      ei(n, !1),
                      e = s.updateQueue,
                      t.updateQueue = e,
                      Eu(t, e),
                      t.subtreeFlags = 0,
                      e = l,
                      l = t.child;
                    l !== null;
                  )
                    (Hf(l, e), (l = l.sibling));
                  return (P(Je, (Je.current & 1) | 2), ke && dl(t, n.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            n.tail !== null &&
              Tt() > Cu &&
              ((t.flags |= 128), (i = !0), ei(n, !1), (t.lanes = 4194304));
          }
        else {
          if (!i)
            if (((e = ru(s)), e !== null)) {
              if (
                ((t.flags |= 128),
                (i = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Eu(t, e),
                ei(n, !0),
                n.tail === null && n.tailMode === 'hidden' && !s.alternate && !ke)
              )
                return (Ye(t), null);
            } else
              2 * Tt() - n.renderingStartTime > Cu &&
                l !== 536870912 &&
                ((t.flags |= 128), (i = !0), ei(n, !1), (t.lanes = 4194304));
          n.isBackwards
            ? ((s.sibling = t.child), (t.child = s))
            : ((e = n.last), e !== null ? (e.sibling = s) : (t.child = s), (n.last = s));
        }
        return n.tail !== null
          ? ((e = n.tail),
            (n.rendering = e),
            (n.tail = e.sibling),
            (n.renderingStartTime = Tt()),
            (e.sibling = null),
            (l = Je.current),
            P(Je, i ? (l & 1) | 2 : l & 1),
            ke && dl(t, n.treeForkCount),
            e)
          : (Ye(t), null);
      case 22:
      case 23:
        return (
          Rt(t),
          gc(),
          (n = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== n && (t.flags |= 8192)
            : n && (t.flags |= 8192),
          n
            ? (l & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Ye(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Ye(t),
          (l = t.updateQueue),
          l !== null && Eu(t, l.retryQueue),
          (l = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (l = e.memoizedState.cachePool.pool),
          (n = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (n = t.memoizedState.cachePool.pool),
          n !== l && (t.flags |= 2048),
          e !== null && q(vn),
          null
        );
      case 24:
        return (
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          t.memoizedState.cache !== l && (t.flags |= 2048),
          hl(Fe),
          Ye(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(c(156, t.tag));
  }
  function l0(e, t) {
    switch ((lc(t), t.tag)) {
      case 1:
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 3:
        return (
          hl(Fe),
          Xe(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 26:
      case 27:
      case 5:
        return (oe(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((Rt(t), t.alternate === null)) throw Error(c(340));
          yn();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((Rt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(c(340));
          yn();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (q(Je), null);
      case 4:
        return (Xe(), null);
      case 10:
        return (hl(t.type), null);
      case 22:
      case 23:
        return (
          Rt(t),
          gc(),
          e !== null && q(vn),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (hl(Fe), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function dm(e, t) {
    switch ((lc(t), t.tag)) {
      case 3:
        (hl(Fe), Xe());
        break;
      case 26:
      case 27:
      case 5:
        oe(t);
        break;
      case 4:
        Xe();
        break;
      case 31:
        t.memoizedState !== null && Rt(t);
        break;
      case 13:
        Rt(t);
        break;
      case 19:
        q(Je);
        break;
      case 10:
        hl(t.type);
        break;
      case 22:
      case 23:
        (Rt(t), gc(), e !== null && q(vn));
        break;
      case 24:
        hl(Fe);
    }
  }
  function ti(e, t) {
    try {
      var l = t.updateQueue,
        n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var i = n.next;
        l = i;
        do {
          if ((l.tag & e) === e) {
            n = void 0;
            var s = l.create,
              f = l.inst;
            ((n = s()), (f.destroy = n));
          }
          l = l.next;
        } while (l !== i);
      }
    } catch (h) {
      De(t, t.return, h);
    }
  }
  function Vl(e, t, l) {
    try {
      var n = t.updateQueue,
        i = n !== null ? n.lastEffect : null;
      if (i !== null) {
        var s = i.next;
        n = s;
        do {
          if ((n.tag & e) === e) {
            var f = n.inst,
              h = f.destroy;
            if (h !== void 0) {
              ((f.destroy = void 0), (i = t));
              var E = l,
                z = h;
              try {
                z();
              } catch (H) {
                De(i, E, H);
              }
            }
          }
          n = n.next;
        } while (n !== s);
      }
    } catch (H) {
      De(t, t.return, H);
    }
  }
  function mm(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        nd(t, l);
      } catch (n) {
        De(e, e.return, n);
      }
    }
  }
  function hm(e, t, l) {
    ((l.props = Tn(e.type, e.memoizedProps)), (l.state = e.memoizedState));
    try {
      l.componentWillUnmount();
    } catch (n) {
      De(e, t, n);
    }
  }
  function li(e, t) {
    try {
      var l = e.ref;
      if (l !== null) {
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
        typeof l == 'function' ? (e.refCleanup = l(n)) : (l.current = n);
      }
    } catch (i) {
      De(e, t, i);
    }
  }
  function nl(e, t) {
    var l = e.ref,
      n = e.refCleanup;
    if (l !== null)
      if (typeof n == 'function')
        try {
          n();
        } catch (i) {
          De(e, t, i);
        } finally {
          ((e.refCleanup = null), (e = e.alternate), e != null && (e.refCleanup = null));
        }
      else if (typeof l == 'function')
        try {
          l(null);
        } catch (i) {
          De(e, t, i);
        }
      else l.current = null;
  }
  function pm(e) {
    var t = e.type,
      l = e.memoizedProps,
      n = e.stateNode;
    try {
      e: switch (t) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          l.autoFocus && n.focus();
          break e;
        case 'img':
          l.src ? (n.src = l.src) : l.srcSet && (n.srcset = l.srcSet);
      }
    } catch (i) {
      De(e, e.return, i);
    }
  }
  function Ic(e, t, l) {
    try {
      var n = e.stateNode;
      (T0(n, e.type, l, t), (n[gt] = t));
    } catch (i) {
      De(e, e.return, i);
    }
  }
  function ym(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && Fl(e.type)) || e.tag === 4
    );
  }
  function Jc(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || ym(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if ((e.tag === 27 && Fl(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Wc(e, t, l) {
    var n = e.tag;
    if (n === 5 || n === 6)
      ((e = e.stateNode),
        t
          ? (l.nodeType === 9
              ? l.body
              : l.nodeName === 'HTML'
                ? l.ownerDocument.body
                : l
            ).insertBefore(e, t)
          : ((t = l.nodeType === 9 ? l.body : l.nodeName === 'HTML' ? l.ownerDocument.body : l),
            t.appendChild(e),
            (l = l._reactRootContainer),
            l != null || t.onclick !== null || (t.onclick = ol)));
    else if (
      n !== 4 &&
      (n === 27 && Fl(e.type) && ((l = e.stateNode), (t = null)), (e = e.child), e !== null)
    )
      for (Wc(e, t, l), e = e.sibling; e !== null; ) (Wc(e, t, l), (e = e.sibling));
  }
  function Tu(e, t, l) {
    var n = e.tag;
    if (n === 5 || n === 6) ((e = e.stateNode), t ? l.insertBefore(e, t) : l.appendChild(e));
    else if (n !== 4 && (n === 27 && Fl(e.type) && (l = e.stateNode), (e = e.child), e !== null))
      for (Tu(e, t, l), e = e.sibling; e !== null; ) (Tu(e, t, l), (e = e.sibling));
  }
  function gm(e) {
    var t = e.stateNode,
      l = e.memoizedProps;
    try {
      for (var n = e.type, i = t.attributes; i.length; ) t.removeAttributeNode(i[0]);
      (ft(t, n, l), (t[st] = e), (t[gt] = l));
    } catch (s) {
      De(e, e.return, s);
    }
  }
  var vl = !1,
    tt = !1,
    Fc = !1,
    _m = typeof WeakSet == 'function' ? WeakSet : Set,
    ut = null;
  function n0(e, t) {
    if (((e = e.containerInfo), (bo = Vu), (e = Rf(e)), Vs(e))) {
      if ('selectionStart' in e) var l = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          l = ((l = e.ownerDocument) && l.defaultView) || window;
          var n = l.getSelection && l.getSelection();
          if (n && n.rangeCount !== 0) {
            l = n.anchorNode;
            var i = n.anchorOffset,
              s = n.focusNode;
            n = n.focusOffset;
            try {
              (l.nodeType, s.nodeType);
            } catch {
              l = null;
              break e;
            }
            var f = 0,
              h = -1,
              E = -1,
              z = 0,
              H = 0,
              X = e,
              D = null;
            t: for (;;) {
              for (
                var B;
                X !== l || (i !== 0 && X.nodeType !== 3) || (h = f + i),
                  X !== s || (n !== 0 && X.nodeType !== 3) || (E = f + n),
                  X.nodeType === 3 && (f += X.nodeValue.length),
                  (B = X.firstChild) !== null;
              )
                ((D = X), (X = B));
              for (;;) {
                if (X === e) break t;
                if (
                  (D === l && ++z === i && (h = f),
                  D === s && ++H === n && (E = f),
                  (B = X.nextSibling) !== null)
                )
                  break;
                ((X = D), (D = X.parentNode));
              }
              X = B;
            }
            l = h === -1 || E === -1 ? null : { start: h, end: E };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (So = { focusedElem: e, selectionRange: l }, Vu = !1, ut = t; ut !== null; )
      if (((t = ut), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (ut = e));
      else
        for (; ut !== null; ) {
          switch (((t = ut), (s = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              if (
                (e & 4) !== 0 &&
                ((e = t.updateQueue), (e = e !== null ? e.events : null), e !== null)
              )
                for (l = 0; l < e.length; l++) ((i = e[l]), (i.ref.impl = i.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && s !== null) {
                ((e = void 0),
                  (l = t),
                  (i = s.memoizedProps),
                  (s = s.memoizedState),
                  (n = l.stateNode));
                try {
                  var ne = Tn(l.type, i);
                  ((e = n.getSnapshotBeforeUpdate(ne, s)),
                    (n.__reactInternalSnapshotBeforeUpdate = e));
                } catch (re) {
                  De(l, l.return, re);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (((e = t.stateNode.containerInfo), (l = e.nodeType), l === 9)) To(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      To(e);
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
              if ((e & 1024) !== 0) throw Error(c(163));
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (ut = e));
            break;
          }
          ut = t.return;
        }
  }
  function vm(e, t, l) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (Sl(e, l), n & 4 && ti(5, l));
        break;
      case 1:
        if ((Sl(e, l), n & 4))
          if (((e = l.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (f) {
              De(l, l.return, f);
            }
          else {
            var i = Tn(l.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (f) {
              De(l, l.return, f);
            }
          }
        (n & 64 && mm(l), n & 512 && li(l, l.return));
        break;
      case 3:
        if ((Sl(e, l), n & 64 && ((e = l.updateQueue), e !== null))) {
          if (((t = null), l.child !== null))
            switch (l.child.tag) {
              case 27:
              case 5:
                t = l.child.stateNode;
                break;
              case 1:
                t = l.child.stateNode;
            }
          try {
            nd(e, t);
          } catch (f) {
            De(l, l.return, f);
          }
        }
        break;
      case 27:
        t === null && n & 4 && gm(l);
      case 26:
      case 5:
        (Sl(e, l), t === null && n & 4 && pm(l), n & 512 && li(l, l.return));
        break;
      case 12:
        Sl(e, l);
        break;
      case 31:
        (Sl(e, l), n & 4 && xm(e, l));
        break;
      case 13:
        (Sl(e, l),
          n & 4 && Em(e, l),
          n & 64 &&
            ((e = l.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((l = d0.bind(null, l)), O0(e, l)))));
        break;
      case 22:
        if (((n = l.memoizedState !== null || vl), !n)) {
          ((t = (t !== null && t.memoizedState !== null) || tt), (i = vl));
          var s = tt;
          ((vl = n),
            (tt = t) && !s ? xl(e, l, (l.subtreeFlags & 8772) !== 0) : Sl(e, l),
            (vl = i),
            (tt = s));
        }
        break;
      case 30:
        break;
      default:
        Sl(e, l);
    }
  }
  function bm(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), bm(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Cs(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var $e = null,
    vt = !1;
  function bl(e, t, l) {
    for (l = l.child; l !== null; ) (Sm(e, t, l), (l = l.sibling));
  }
  function Sm(e, t, l) {
    if (Nt && typeof Nt.onCommitFiberUnmount == 'function')
      try {
        Nt.onCommitFiberUnmount(ka, l);
      } catch {}
    switch (l.tag) {
      case 26:
        (tt || nl(l, t),
          bl(e, t, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
        break;
      case 27:
        tt || nl(l, t);
        var n = $e,
          i = vt;
        (Fl(l.type) && (($e = l.stateNode), (vt = !1)),
          bl(e, t, l),
          fi(l.stateNode),
          ($e = n),
          (vt = i));
        break;
      case 5:
        tt || nl(l, t);
      case 6:
        if (((n = $e), (i = vt), ($e = null), bl(e, t, l), ($e = n), (vt = i), $e !== null))
          if (vt)
            try {
              ($e.nodeType === 9
                ? $e.body
                : $e.nodeName === 'HTML'
                  ? $e.ownerDocument.body
                  : $e
              ).removeChild(l.stateNode);
            } catch (s) {
              De(l, t, s);
            }
          else
            try {
              $e.removeChild(l.stateNode);
            } catch (s) {
              De(l, t, s);
            }
        break;
      case 18:
        $e !== null &&
          (vt
            ? ((e = $e),
              mh(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                l.stateNode
              ),
              pa(e))
            : mh($e, l.stateNode));
        break;
      case 4:
        ((n = $e),
          (i = vt),
          ($e = l.stateNode.containerInfo),
          (vt = !0),
          bl(e, t, l),
          ($e = n),
          (vt = i));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Vl(2, l, t), tt || Vl(4, l, t), bl(e, t, l));
        break;
      case 1:
        (tt ||
          (nl(l, t), (n = l.stateNode), typeof n.componentWillUnmount == 'function' && hm(l, t, n)),
          bl(e, t, l));
        break;
      case 21:
        bl(e, t, l);
        break;
      case 22:
        ((tt = (n = tt) || l.memoizedState !== null), bl(e, t, l), (tt = n));
        break;
      default:
        bl(e, t, l);
    }
  }
  function xm(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        pa(e);
      } catch (l) {
        De(t, t.return, l);
      }
    }
  }
  function Em(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        pa(e);
      } catch (l) {
        De(t, t.return, l);
      }
  }
  function a0(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new _m()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new _m()),
          t
        );
      default:
        throw Error(c(435, e.tag));
    }
  }
  function Nu(e, t) {
    var l = a0(e);
    t.forEach(function (n) {
      if (!l.has(n)) {
        l.add(n);
        var i = m0.bind(null, e, n);
        n.then(i, i);
      }
    });
  }
  function bt(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var n = 0; n < l.length; n++) {
        var i = l[n],
          s = e,
          f = t,
          h = f;
        e: for (; h !== null; ) {
          switch (h.tag) {
            case 27:
              if (Fl(h.type)) {
                (($e = h.stateNode), (vt = !1));
                break e;
              }
              break;
            case 5:
              (($e = h.stateNode), (vt = !1));
              break e;
            case 3:
            case 4:
              (($e = h.stateNode.containerInfo), (vt = !0));
              break e;
          }
          h = h.return;
        }
        if ($e === null) throw Error(c(160));
        (Sm(s, f, i),
          ($e = null),
          (vt = !1),
          (s = i.alternate),
          s !== null && (s.return = null),
          (i.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (Tm(t, e), (t = t.sibling));
  }
  var Jt = null;
  function Tm(e, t) {
    var l = e.alternate,
      n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (bt(t, e), St(e), n & 4 && (Vl(3, e, e.return), ti(3, e), Vl(5, e, e.return)));
        break;
      case 1:
        (bt(t, e),
          St(e),
          n & 512 && (tt || l === null || nl(l, l.return)),
          n & 64 &&
            vl &&
            ((e = e.updateQueue),
            e !== null &&
              ((n = e.callbacks),
              n !== null &&
                ((l = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = l === null ? n : l.concat(n))))));
        break;
      case 26:
        var i = Jt;
        if ((bt(t, e), St(e), n & 512 && (tt || l === null || nl(l, l.return)), n & 4)) {
          var s = l !== null ? l.memoizedState : null;
          if (((n = e.memoizedState), l === null))
            if (n === null)
              if (e.stateNode === null) {
                e: {
                  ((n = e.type), (l = e.memoizedProps), (i = i.ownerDocument || i));
                  t: switch (n) {
                    case 'title':
                      ((s = i.getElementsByTagName('title')[0]),
                        (!s ||
                          s[Ma] ||
                          s[st] ||
                          s.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          s.hasAttribute('itemprop')) &&
                          ((s = i.createElement(n)),
                          i.head.insertBefore(s, i.querySelector('head > title'))),
                        ft(s, n, l),
                        (s[st] = e),
                        it(s),
                        (n = s));
                      break e;
                    case 'link':
                      var f = Th('link', 'href', i).get(n + (l.href || ''));
                      if (f) {
                        for (var h = 0; h < f.length; h++)
                          if (
                            ((s = f[h]),
                            s.getAttribute('href') ===
                              (l.href == null || l.href === '' ? null : l.href) &&
                              s.getAttribute('rel') === (l.rel == null ? null : l.rel) &&
                              s.getAttribute('title') === (l.title == null ? null : l.title) &&
                              s.getAttribute('crossorigin') ===
                                (l.crossOrigin == null ? null : l.crossOrigin))
                          ) {
                            f.splice(h, 1);
                            break t;
                          }
                      }
                      ((s = i.createElement(n)), ft(s, n, l), i.head.appendChild(s));
                      break;
                    case 'meta':
                      if ((f = Th('meta', 'content', i).get(n + (l.content || '')))) {
                        for (h = 0; h < f.length; h++)
                          if (
                            ((s = f[h]),
                            s.getAttribute('content') ===
                              (l.content == null ? null : '' + l.content) &&
                              s.getAttribute('name') === (l.name == null ? null : l.name) &&
                              s.getAttribute('property') ===
                                (l.property == null ? null : l.property) &&
                              s.getAttribute('http-equiv') ===
                                (l.httpEquiv == null ? null : l.httpEquiv) &&
                              s.getAttribute('charset') === (l.charSet == null ? null : l.charSet))
                          ) {
                            f.splice(h, 1);
                            break t;
                          }
                      }
                      ((s = i.createElement(n)), ft(s, n, l), i.head.appendChild(s));
                      break;
                    default:
                      throw Error(c(468, n));
                  }
                  ((s[st] = e), it(s), (n = s));
                }
                e.stateNode = n;
              } else Nh(i, e.type, e.stateNode);
            else e.stateNode = Eh(i, n, e.memoizedProps);
          else
            s !== n
              ? (s === null
                  ? l.stateNode !== null && ((l = l.stateNode), l.parentNode.removeChild(l))
                  : s.count--,
                n === null ? Nh(i, e.type, e.stateNode) : Eh(i, n, e.memoizedProps))
              : n === null && e.stateNode !== null && Ic(e, e.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        (bt(t, e),
          St(e),
          n & 512 && (tt || l === null || nl(l, l.return)),
          l !== null && n & 4 && Ic(e, e.memoizedProps, l.memoizedProps));
        break;
      case 5:
        if ((bt(t, e), St(e), n & 512 && (tt || l === null || nl(l, l.return)), e.flags & 32)) {
          i = e.stateNode;
          try {
            Ln(i, '');
          } catch (ne) {
            De(e, e.return, ne);
          }
        }
        (n & 4 &&
          e.stateNode != null &&
          ((i = e.memoizedProps), Ic(e, i, l !== null ? l.memoizedProps : i)),
          n & 1024 && (Fc = !0));
        break;
      case 6:
        if ((bt(t, e), St(e), n & 4)) {
          if (e.stateNode === null) throw Error(c(162));
          ((n = e.memoizedProps), (l = e.stateNode));
          try {
            l.nodeValue = n;
          } catch (ne) {
            De(e, e.return, ne);
          }
        }
        break;
      case 3:
        if (
          ((Gu = null),
          (i = Jt),
          (Jt = Hu(t.containerInfo)),
          bt(t, e),
          (Jt = i),
          St(e),
          n & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            pa(t.containerInfo);
          } catch (ne) {
            De(e, e.return, ne);
          }
        Fc && ((Fc = !1), Nm(e));
        break;
      case 4:
        ((n = Jt), (Jt = Hu(e.stateNode.containerInfo)), bt(t, e), St(e), (Jt = n));
        break;
      case 12:
        (bt(t, e), St(e));
        break;
      case 31:
        (bt(t, e),
          St(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Nu(e, n))));
        break;
      case 13:
        (bt(t, e),
          St(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (l !== null && l.memoizedState !== null) &&
            (Au = Tt()),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Nu(e, n))));
        break;
      case 22:
        i = e.memoizedState !== null;
        var E = l !== null && l.memoizedState !== null,
          z = vl,
          H = tt;
        if (((vl = z || i), (tt = H || E), bt(t, e), (tt = H), (vl = z), St(e), n & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = i ? t._visibility & -2 : t._visibility | 1,
              i && (l === null || E || vl || tt || Nn(e)),
              l = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                E = l = t;
                try {
                  if (((s = E.stateNode), i))
                    ((f = s.style),
                      typeof f.setProperty == 'function'
                        ? f.setProperty('display', 'none', 'important')
                        : (f.display = 'none'));
                  else {
                    h = E.stateNode;
                    var X = E.memoizedProps.style,
                      D = X != null && X.hasOwnProperty('display') ? X.display : null;
                    h.style.display = D == null || typeof D == 'boolean' ? '' : ('' + D).trim();
                  }
                } catch (ne) {
                  De(E, E.return, ne);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                E = t;
                try {
                  E.stateNode.nodeValue = i ? '' : E.memoizedProps;
                } catch (ne) {
                  De(E, E.return, ne);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                E = t;
                try {
                  var B = E.stateNode;
                  i ? hh(B, !0) : hh(E.stateNode, !1);
                } catch (ne) {
                  De(E, E.return, ne);
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
              (l === t && (l = null), (t = t.return));
            }
            (l === t && (l = null), (t.sibling.return = t.return), (t = t.sibling));
          }
        n & 4 &&
          ((n = e.updateQueue),
          n !== null && ((l = n.retryQueue), l !== null && ((n.retryQueue = null), Nu(e, l))));
        break;
      case 19:
        (bt(t, e),
          St(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Nu(e, n))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (bt(t, e), St(e));
    }
  }
  function St(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, n = e.return; n !== null; ) {
          if (ym(n)) {
            l = n;
            break;
          }
          n = n.return;
        }
        if (l == null) throw Error(c(160));
        switch (l.tag) {
          case 27:
            var i = l.stateNode,
              s = Jc(e);
            Tu(e, s, i);
            break;
          case 5:
            var f = l.stateNode;
            l.flags & 32 && (Ln(f, ''), (l.flags &= -33));
            var h = Jc(e);
            Tu(e, h, f);
            break;
          case 3:
          case 4:
            var E = l.stateNode.containerInfo,
              z = Jc(e);
            Wc(e, z, E);
            break;
          default:
            throw Error(c(161));
        }
      } catch (H) {
        De(e, e.return, H);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Nm(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (Nm(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling));
      }
  }
  function Sl(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (vm(e, t.alternate, t), (t = t.sibling));
  }
  function Nn(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Vl(4, t, t.return), Nn(t));
          break;
        case 1:
          nl(t, t.return);
          var l = t.stateNode;
          (typeof l.componentWillUnmount == 'function' && hm(t, t.return, l), Nn(t));
          break;
        case 27:
          fi(t.stateNode);
        case 26:
        case 5:
          (nl(t, t.return), Nn(t));
          break;
        case 22:
          t.memoizedState === null && Nn(t);
          break;
        case 30:
          Nn(t);
          break;
        default:
          Nn(t);
      }
      e = e.sibling;
    }
  }
  function xl(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var n = t.alternate,
        i = e,
        s = t,
        f = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          (xl(i, s, l), ti(4, s));
          break;
        case 1:
          if ((xl(i, s, l), (n = s), (i = n.stateNode), typeof i.componentDidMount == 'function'))
            try {
              i.componentDidMount();
            } catch (z) {
              De(n, n.return, z);
            }
          if (((n = s), (i = n.updateQueue), i !== null)) {
            var h = n.stateNode;
            try {
              var E = i.shared.hiddenCallbacks;
              if (E !== null)
                for (i.shared.hiddenCallbacks = null, i = 0; i < E.length; i++) ld(E[i], h);
            } catch (z) {
              De(n, n.return, z);
            }
          }
          (l && f & 64 && mm(s), li(s, s.return));
          break;
        case 27:
          gm(s);
        case 26:
        case 5:
          (xl(i, s, l), l && n === null && f & 4 && pm(s), li(s, s.return));
          break;
        case 12:
          xl(i, s, l);
          break;
        case 31:
          (xl(i, s, l), l && f & 4 && xm(i, s));
          break;
        case 13:
          (xl(i, s, l), l && f & 4 && Em(i, s));
          break;
        case 22:
          (s.memoizedState === null && xl(i, s, l), li(s, s.return));
          break;
        case 30:
          break;
        default:
          xl(i, s, l);
      }
      t = t.sibling;
    }
  }
  function Pc(e, t) {
    var l = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (l = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== l && (e != null && e.refCount++, l != null && Ya(l)));
  }
  function eo(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && Ya(e)));
  }
  function Wt(e, t, l, n) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (km(e, t, l, n), (t = t.sibling));
  }
  function km(e, t, l, n) {
    var i = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Wt(e, t, l, n), i & 2048 && ti(9, t));
        break;
      case 1:
        Wt(e, t, l, n);
        break;
      case 3:
        (Wt(e, t, l, n),
          i & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && Ya(e))));
        break;
      case 12:
        if (i & 2048) {
          (Wt(e, t, l, n), (e = t.stateNode));
          try {
            var s = t.memoizedProps,
              f = s.id,
              h = s.onPostCommit;
            typeof h == 'function' &&
              h(f, t.alternate === null ? 'mount' : 'update', e.passiveEffectDuration, -0);
          } catch (E) {
            De(t, t.return, E);
          }
        } else Wt(e, t, l, n);
        break;
      case 31:
        Wt(e, t, l, n);
        break;
      case 13:
        Wt(e, t, l, n);
        break;
      case 23:
        break;
      case 22:
        ((s = t.stateNode),
          (f = t.alternate),
          t.memoizedState !== null
            ? s._visibility & 2
              ? Wt(e, t, l, n)
              : ni(e, t)
            : s._visibility & 2
              ? Wt(e, t, l, n)
              : ((s._visibility |= 2), aa(e, t, l, n, (t.subtreeFlags & 10256) !== 0 || !1)),
          i & 2048 && Pc(f, t));
        break;
      case 24:
        (Wt(e, t, l, n), i & 2048 && eo(t.alternate, t));
        break;
      default:
        Wt(e, t, l, n);
    }
  }
  function aa(e, t, l, n, i) {
    for (i = i && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var s = e,
        f = t,
        h = l,
        E = n,
        z = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          (aa(s, f, h, E, i), ti(8, f));
          break;
        case 23:
          break;
        case 22:
          var H = f.stateNode;
          (f.memoizedState !== null
            ? H._visibility & 2
              ? aa(s, f, h, E, i)
              : ni(s, f)
            : ((H._visibility |= 2), aa(s, f, h, E, i)),
            i && z & 2048 && Pc(f.alternate, f));
          break;
        case 24:
          (aa(s, f, h, E, i), i && z & 2048 && eo(f.alternate, f));
          break;
        default:
          aa(s, f, h, E, i);
      }
      t = t.sibling;
    }
  }
  function ni(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e,
          n = t,
          i = n.flags;
        switch (n.tag) {
          case 22:
            (ni(l, n), i & 2048 && Pc(n.alternate, n));
            break;
          case 24:
            (ni(l, n), i & 2048 && eo(n.alternate, n));
            break;
          default:
            ni(l, n);
        }
        t = t.sibling;
      }
  }
  var ai = 8192;
  function ia(e, t, l) {
    if (e.subtreeFlags & ai) for (e = e.child; e !== null; ) (Am(e, t, l), (e = e.sibling));
  }
  function Am(e, t, l) {
    switch (e.tag) {
      case 26:
        (ia(e, t, l),
          e.flags & ai && e.memoizedState !== null && $0(l, Jt, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        ia(e, t, l);
        break;
      case 3:
      case 4:
        var n = Jt;
        ((Jt = Hu(e.stateNode.containerInfo)), ia(e, t, l), (Jt = n));
        break;
      case 22:
        e.memoizedState === null &&
          ((n = e.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = ai), (ai = 16777216), ia(e, t, l), (ai = n))
            : ia(e, t, l));
        break;
      default:
        ia(e, t, l);
    }
  }
  function Cm(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function ii(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var n = t[l];
          ((ut = n), Rm(n, e));
        }
      Cm(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (Mm(e), (e = e.sibling));
  }
  function Mm(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (ii(e), e.flags & 2048 && Vl(9, e, e.return));
        break;
      case 3:
        ii(e);
        break;
      case 12:
        ii(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), ku(e))
          : ii(e);
        break;
      default:
        ii(e);
    }
  }
  function ku(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var n = t[l];
          ((ut = n), Rm(n, e));
        }
      Cm(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (Vl(8, t, t.return), ku(t));
          break;
        case 22:
          ((l = t.stateNode), l._visibility & 2 && ((l._visibility &= -3), ku(t)));
          break;
        default:
          ku(t);
      }
      e = e.sibling;
    }
  }
  function Rm(e, t) {
    for (; ut !== null; ) {
      var l = ut;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Vl(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var n = l.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          Ya(l.memoizedState.cache);
      }
      if (((n = l.child), n !== null)) ((n.return = l), (ut = n));
      else
        e: for (l = e; ut !== null; ) {
          n = ut;
          var i = n.sibling,
            s = n.return;
          if ((bm(n), n === l)) {
            ut = null;
            break e;
          }
          if (i !== null) {
            ((i.return = s), (ut = i));
            break e;
          }
          ut = s;
        }
    }
  }
  var i0 = {
      getCacheForType: function (e) {
        var t = ot(Fe),
          l = t.data.get(e);
        return (l === void 0 && ((l = e()), t.data.set(e, l)), l);
      },
      cacheSignal: function () {
        return ot(Fe).controller.signal;
      },
    },
    u0 = typeof WeakMap == 'function' ? WeakMap : Map,
    Oe = 0,
    qe = null,
    Se = null,
    Te = 0,
    we = 0,
    jt = null,
    Ql = !1,
    ua = !1,
    to = !1,
    El = 0,
    Ie = 0,
    Kl = 0,
    kn = 0,
    lo = 0,
    Ot = 0,
    sa = 0,
    ui = null,
    xt = null,
    no = !1,
    Au = 0,
    jm = 0,
    Cu = 1 / 0,
    Mu = null,
    Zl = null,
    nt = 0,
    Il = null,
    ca = null,
    Tl = 0,
    ao = 0,
    io = null,
    Om = null,
    si = 0,
    uo = null;
  function zt() {
    return (Oe & 2) !== 0 && Te !== 0 ? Te & -Te : U.T !== null ? mo() : Kr();
  }
  function zm() {
    if (Ot === 0)
      if ((Te & 536870912) === 0 || ke) {
        var e = Ui;
        ((Ui <<= 1), (Ui & 3932160) === 0 && (Ui = 262144), (Ot = e));
      } else Ot = 536870912;
    return ((e = Mt.current), e !== null && (e.flags |= 32), Ot);
  }
  function Et(e, t, l) {
    (((e === qe && (we === 2 || we === 9)) || e.cancelPendingCommit !== null) &&
      (oa(e, 0), Jl(e, Te, Ot, !1)),
      Ca(e, l),
      ((Oe & 2) === 0 || e !== qe) &&
        (e === qe && ((Oe & 2) === 0 && (kn |= l), Ie === 4 && Jl(e, Te, Ot, !1)), al(e)));
  }
  function wm(e, t, l) {
    if ((Oe & 6) !== 0) throw Error(c(327));
    var n = (!l && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Aa(e, t),
      i = n ? o0(e, t) : co(e, t, !0),
      s = n;
    do {
      if (i === 0) {
        ua && !n && Jl(e, t, 0, !1);
        break;
      } else {
        if (((l = e.current.alternate), s && !s0(l))) {
          ((i = co(e, t, !1)), (s = !1));
          continue;
        }
        if (i === 2) {
          if (((s = t), e.errorRecoveryDisabledLanes & s)) var f = 0;
          else
            ((f = e.pendingLanes & -536870913), (f = f !== 0 ? f : f & 536870912 ? 536870912 : 0));
          if (f !== 0) {
            t = f;
            e: {
              var h = e;
              i = ui;
              var E = h.current.memoizedState.isDehydrated;
              if ((E && (oa(h, f).flags |= 256), (f = co(h, f, !1)), f !== 2)) {
                if (to && !E) {
                  ((h.errorRecoveryDisabledLanes |= s), (kn |= s), (i = 4));
                  break e;
                }
                ((s = xt), (xt = i), s !== null && (xt === null ? (xt = s) : xt.push.apply(xt, s)));
              }
              i = f;
            }
            if (((s = !1), i !== 2)) continue;
          }
        }
        if (i === 1) {
          (oa(e, 0), Jl(e, t, 0, !0));
          break;
        }
        e: {
          switch (((n = e), (s = i), s)) {
            case 0:
            case 1:
              throw Error(c(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Jl(n, t, Ot, !Ql);
              break e;
            case 2:
              xt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(c(329));
          }
          if ((t & 62914560) === t && ((i = Au + 300 - Tt()), 10 < i)) {
            if ((Jl(n, t, Ot, !Ql), Hi(n, 0, !0) !== 0)) break e;
            ((Tl = t),
              (n.timeoutHandle = fh(
                Dm.bind(null, n, l, xt, Mu, no, t, Ot, kn, sa, Ql, s, 'Throttled', -0, 0),
                i
              )));
            break e;
          }
          Dm(n, l, xt, Mu, no, t, Ot, kn, sa, Ql, s, null, -0, 0);
        }
      }
      break;
    } while (!0);
    al(e);
  }
  function Dm(e, t, l, n, i, s, f, h, E, z, H, X, D, B) {
    if (((e.timeoutHandle = -1), (X = t.subtreeFlags), X & 8192 || (X & 16785408) === 16785408)) {
      ((X = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: ol,
      }),
        Am(t, s, X));
      var ne = (s & 62914560) === s ? Au - Tt() : (s & 4194048) === s ? jm - Tt() : 0;
      if (((ne = V0(X, ne)), ne !== null)) {
        ((Tl = s),
          (e.cancelPendingCommit = ne(Xm.bind(null, e, t, s, l, n, i, f, h, E, H, X, null, D, B))),
          Jl(e, s, f, !z));
        return;
      }
    }
    Xm(e, t, s, l, n, i, f, h, E);
  }
  function s0(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if (
        (l === 0 || l === 11 || l === 15) &&
        t.flags & 16384 &&
        ((l = t.updateQueue), l !== null && ((l = l.stores), l !== null))
      )
        for (var n = 0; n < l.length; n++) {
          var i = l[n],
            s = i.getSnapshot;
          i = i.value;
          try {
            if (!At(s(), i)) return !1;
          } catch {
            return !1;
          }
        }
      if (((l = t.child), t.subtreeFlags & 16384 && l !== null)) ((l.return = t), (t = l));
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
  function Jl(e, t, l, n) {
    ((t &= ~lo),
      (t &= ~kn),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      n && (e.warmLanes |= t),
      (n = e.expirationTimes));
    for (var i = t; 0 < i; ) {
      var s = 31 - kt(i),
        f = 1 << s;
      ((n[s] = -1), (i &= ~f));
    }
    l !== 0 && $r(e, l, t);
  }
  function Ru() {
    return (Oe & 6) === 0 ? (ci(0), !1) : !0;
  }
  function so() {
    if (Se !== null) {
      if (we === 0) var e = Se.return;
      else ((e = Se), (ml = gn = null), Ec(e), (Pn = null), ($a = 0), (e = Se));
      for (; e !== null; ) (dm(e.alternate, e), (e = e.return));
      Se = null;
    }
  }
  function oa(e, t) {
    var l = e.timeoutHandle;
    (l !== -1 && ((e.timeoutHandle = -1), A0(l)),
      (l = e.cancelPendingCommit),
      l !== null && ((e.cancelPendingCommit = null), l()),
      (Tl = 0),
      so(),
      (qe = e),
      (Se = l = fl(e.current, null)),
      (Te = t),
      (we = 0),
      (jt = null),
      (Ql = !1),
      (ua = Aa(e, t)),
      (to = !1),
      (sa = Ot = lo = kn = Kl = Ie = 0),
      (xt = ui = null),
      (no = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var i = 31 - kt(n),
          s = 1 << i;
        ((t |= e[i]), (n &= ~s));
      }
    return ((El = t), Wi(), l);
  }
  function Bm(e, t) {
    ((_e = null),
      (U.H = Fa),
      t === Fn || t === iu
        ? ((t = Ff()), (we = 3))
        : t === fc
          ? ((t = Ff()), (we = 4))
          : (we =
              t === Hc
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (jt = t),
      Se === null && ((Ie = 1), vu(e, Ht(t, e.current))));
  }
  function Um() {
    var e = Mt.current;
    return e === null
      ? !0
      : (Te & 4194048) === Te
        ? Xt === null
        : (Te & 62914560) === Te || (Te & 536870912) !== 0
          ? e === Xt
          : !1;
  }
  function Lm() {
    var e = U.H;
    return ((U.H = Fa), e === null ? Fa : e);
  }
  function Hm() {
    var e = U.A;
    return ((U.A = i0), e);
  }
  function ju() {
    ((Ie = 4),
      Ql || ((Te & 4194048) !== Te && Mt.current !== null) || (ua = !0),
      ((Kl & 134217727) === 0 && (kn & 134217727) === 0) || qe === null || Jl(qe, Te, Ot, !1));
  }
  function co(e, t, l) {
    var n = Oe;
    Oe |= 2;
    var i = Lm(),
      s = Hm();
    ((qe !== e || Te !== t) && ((Mu = null), oa(e, t)), (t = !1));
    var f = Ie;
    e: do
      try {
        if (we !== 0 && Se !== null) {
          var h = Se,
            E = jt;
          switch (we) {
            case 8:
              (so(), (f = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Mt.current === null && (t = !0);
              var z = we;
              if (((we = 0), (jt = null), ra(e, h, E, z), l && ua)) {
                f = 0;
                break e;
              }
              break;
            default:
              ((z = we), (we = 0), (jt = null), ra(e, h, E, z));
          }
        }
        (c0(), (f = Ie));
        break;
      } catch (H) {
        Bm(e, H);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (ml = gn = null),
      (Oe = n),
      (U.H = i),
      (U.A = s),
      Se === null && ((qe = null), (Te = 0), Wi()),
      f
    );
  }
  function c0() {
    for (; Se !== null; ) qm(Se);
  }
  function o0(e, t) {
    var l = Oe;
    Oe |= 2;
    var n = Lm(),
      i = Hm();
    qe !== e || Te !== t ? ((Mu = null), (Cu = Tt() + 500), oa(e, t)) : (ua = Aa(e, t));
    e: do
      try {
        if (we !== 0 && Se !== null) {
          t = Se;
          var s = jt;
          t: switch (we) {
            case 1:
              ((we = 0), (jt = null), ra(e, t, s, 1));
              break;
            case 2:
            case 9:
              if (Jf(s)) {
                ((we = 0), (jt = null), Gm(t));
                break;
              }
              ((t = function () {
                ((we !== 2 && we !== 9) || qe !== e || (we = 7), al(e));
              }),
                s.then(t, t));
              break e;
            case 3:
              we = 7;
              break e;
            case 4:
              we = 5;
              break e;
            case 7:
              Jf(s) ? ((we = 0), (jt = null), Gm(t)) : ((we = 0), (jt = null), ra(e, t, s, 7));
              break;
            case 5:
              var f = null;
              switch (Se.tag) {
                case 26:
                  f = Se.memoizedState;
                case 5:
                case 27:
                  var h = Se;
                  if (f ? kh(f) : h.stateNode.complete) {
                    ((we = 0), (jt = null));
                    var E = h.sibling;
                    if (E !== null) Se = E;
                    else {
                      var z = h.return;
                      z !== null ? ((Se = z), Ou(z)) : (Se = null);
                    }
                    break t;
                  }
              }
              ((we = 0), (jt = null), ra(e, t, s, 5));
              break;
            case 6:
              ((we = 0), (jt = null), ra(e, t, s, 6));
              break;
            case 8:
              (so(), (Ie = 6));
              break e;
            default:
              throw Error(c(462));
          }
        }
        r0();
        break;
      } catch (H) {
        Bm(e, H);
      }
    while (!0);
    return (
      (ml = gn = null),
      (U.H = n),
      (U.A = i),
      (Oe = l),
      Se !== null ? 0 : ((qe = null), (Te = 0), Wi(), Ie)
    );
  }
  function r0() {
    for (; Se !== null && !zy(); ) qm(Se);
  }
  function qm(e) {
    var t = rm(e.alternate, e, El);
    ((e.memoizedProps = e.pendingProps), t === null ? Ou(e) : (Se = t));
  }
  function Gm(e) {
    var t = e,
      l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = am(l, t, t.pendingProps, t.type, void 0, Te);
        break;
      case 11:
        t = am(l, t, t.pendingProps, t.type.render, t.ref, Te);
        break;
      case 5:
        Ec(t);
      default:
        (dm(l, t), (t = Se = Hf(t, El)), (t = rm(l, t, El)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? Ou(e) : (Se = t));
  }
  function ra(e, t, l, n) {
    ((ml = gn = null), Ec(t), (Pn = null), ($a = 0));
    var i = t.return;
    try {
      if (Fg(e, i, t, l, Te)) {
        ((Ie = 1), vu(e, Ht(l, e.current)), (Se = null));
        return;
      }
    } catch (s) {
      if (i !== null) throw ((Se = i), s);
      ((Ie = 1), vu(e, Ht(l, e.current)), (Se = null));
      return;
    }
    t.flags & 32768
      ? (ke || n === 1
          ? (e = !0)
          : ua || (Te & 536870912) !== 0
            ? (e = !1)
            : ((Ql = e = !0),
              (n === 2 || n === 9 || n === 3 || n === 6) &&
                ((n = Mt.current), n !== null && n.tag === 13 && (n.flags |= 16384))),
        Ym(t, e))
      : Ou(t);
  }
  function Ou(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Ym(t, Ql);
        return;
      }
      e = t.return;
      var l = t0(t.alternate, t, El);
      if (l !== null) {
        Se = l;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        Se = t;
        return;
      }
      Se = t = e;
    } while (t !== null);
    Ie === 0 && (Ie = 5);
  }
  function Ym(e, t) {
    do {
      var l = l0(e.alternate, e);
      if (l !== null) {
        ((l.flags &= 32767), (Se = l));
        return;
      }
      if (
        ((l = e.return),
        l !== null && ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        Se = e;
        return;
      }
      Se = e = l;
    } while (e !== null);
    ((Ie = 6), (Se = null));
  }
  function Xm(e, t, l, n, i, s, f, h, E) {
    e.cancelPendingCommit = null;
    do zu();
    while (nt !== 0);
    if ((Oe & 6) !== 0) throw Error(c(327));
    if (t !== null) {
      if (t === e.current) throw Error(c(177));
      if (
        ((s = t.lanes | t.childLanes),
        (s |= Js),
        Xy(e, l, s, f, h, E),
        e === qe && ((Se = qe = null), (Te = 0)),
        (ca = t),
        (Il = e),
        (Tl = l),
        (ao = s),
        (io = i),
        (Om = n),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            h0(Di, function () {
              return (Zm(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (n = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || n)
      ) {
        ((n = U.T), (U.T = null), (i = J.p), (J.p = 2), (f = Oe), (Oe |= 4));
        try {
          n0(e, t, l);
        } finally {
          ((Oe = f), (J.p = i), (U.T = n));
        }
      }
      ((nt = 1), $m(), Vm(), Qm());
    }
  }
  function $m() {
    if (nt === 1) {
      nt = 0;
      var e = Il,
        t = ca,
        l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        ((l = U.T), (U.T = null));
        var n = J.p;
        J.p = 2;
        var i = Oe;
        Oe |= 4;
        try {
          Tm(t, e);
          var s = So,
            f = Rf(e.containerInfo),
            h = s.focusedElem,
            E = s.selectionRange;
          if (f !== h && h && h.ownerDocument && Mf(h.ownerDocument.documentElement, h)) {
            if (E !== null && Vs(h)) {
              var z = E.start,
                H = E.end;
              if ((H === void 0 && (H = z), 'selectionStart' in h))
                ((h.selectionStart = z), (h.selectionEnd = Math.min(H, h.value.length)));
              else {
                var X = h.ownerDocument || document,
                  D = (X && X.defaultView) || window;
                if (D.getSelection) {
                  var B = D.getSelection(),
                    ne = h.textContent.length,
                    re = Math.min(E.start, ne),
                    He = E.end === void 0 ? re : Math.min(E.end, ne);
                  !B.extend && re > He && ((f = He), (He = re), (re = f));
                  var M = Cf(h, re),
                    T = Cf(h, He);
                  if (
                    M &&
                    T &&
                    (B.rangeCount !== 1 ||
                      B.anchorNode !== M.node ||
                      B.anchorOffset !== M.offset ||
                      B.focusNode !== T.node ||
                      B.focusOffset !== T.offset)
                  ) {
                    var O = X.createRange();
                    (O.setStart(M.node, M.offset),
                      B.removeAllRanges(),
                      re > He
                        ? (B.addRange(O), B.extend(T.node, T.offset))
                        : (O.setEnd(T.node, T.offset), B.addRange(O)));
                  }
                }
              }
            }
            for (X = [], B = h; (B = B.parentNode); )
              B.nodeType === 1 && X.push({ element: B, left: B.scrollLeft, top: B.scrollTop });
            for (typeof h.focus == 'function' && h.focus(), h = 0; h < X.length; h++) {
              var Y = X[h];
              ((Y.element.scrollLeft = Y.left), (Y.element.scrollTop = Y.top));
            }
          }
          ((Vu = !!bo), (So = bo = null));
        } finally {
          ((Oe = i), (J.p = n), (U.T = l));
        }
      }
      ((e.current = t), (nt = 2));
    }
  }
  function Vm() {
    if (nt === 2) {
      nt = 0;
      var e = Il,
        t = ca,
        l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        ((l = U.T), (U.T = null));
        var n = J.p;
        J.p = 2;
        var i = Oe;
        Oe |= 4;
        try {
          vm(e, t.alternate, t);
        } finally {
          ((Oe = i), (J.p = n), (U.T = l));
        }
      }
      nt = 3;
    }
  }
  function Qm() {
    if (nt === 4 || nt === 3) {
      ((nt = 0), wy());
      var e = Il,
        t = ca,
        l = Tl,
        n = Om;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (nt = 5)
        : ((nt = 0), (ca = Il = null), Km(e, e.pendingLanes));
      var i = e.pendingLanes;
      if (
        (i === 0 && (Zl = null),
        ks(l),
        (t = t.stateNode),
        Nt && typeof Nt.onCommitFiberRoot == 'function')
      )
        try {
          Nt.onCommitFiberRoot(ka, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        ((t = U.T), (i = J.p), (J.p = 2), (U.T = null));
        try {
          for (var s = e.onRecoverableError, f = 0; f < n.length; f++) {
            var h = n[f];
            s(h.value, { componentStack: h.stack });
          }
        } finally {
          ((U.T = t), (J.p = i));
        }
      }
      ((Tl & 3) !== 0 && zu(),
        al(e),
        (i = e.pendingLanes),
        (l & 261930) !== 0 && (i & 42) !== 0 ? (e === uo ? si++ : ((si = 0), (uo = e))) : (si = 0),
        ci(0));
    }
  }
  function Km(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), Ya(t)));
  }
  function zu() {
    return ($m(), Vm(), Qm(), Zm());
  }
  function Zm() {
    if (nt !== 5) return !1;
    var e = Il,
      t = ao;
    ao = 0;
    var l = ks(Tl),
      n = U.T,
      i = J.p;
    try {
      ((J.p = 32 > l ? 32 : l), (U.T = null), (l = io), (io = null));
      var s = Il,
        f = Tl;
      if (((nt = 0), (ca = Il = null), (Tl = 0), (Oe & 6) !== 0)) throw Error(c(331));
      var h = Oe;
      if (
        ((Oe |= 4),
        Mm(s.current),
        km(s, s.current, f, l),
        (Oe = h),
        ci(0, !1),
        Nt && typeof Nt.onPostCommitFiberRoot == 'function')
      )
        try {
          Nt.onPostCommitFiberRoot(ka, s);
        } catch {}
      return !0;
    } finally {
      ((J.p = i), (U.T = n), Km(e, t));
    }
  }
  function Im(e, t, l) {
    ((t = Ht(l, t)),
      (t = Lc(e.stateNode, t, 2)),
      (e = Yl(e, t, 2)),
      e !== null && (Ca(e, 2), al(e)));
  }
  function De(e, t, l) {
    if (e.tag === 3) Im(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Im(t, e, l);
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof n.componentDidCatch == 'function' && (Zl === null || !Zl.has(n)))
          ) {
            ((e = Ht(l, e)),
              (l = Jd(2)),
              (n = Yl(t, l, 2)),
              n !== null && (Wd(l, n, t, e), Ca(n, 2), al(n)));
            break;
          }
        }
        t = t.return;
      }
  }
  function oo(e, t, l) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new u0();
      var i = new Set();
      n.set(t, i);
    } else ((i = n.get(t)), i === void 0 && ((i = new Set()), n.set(t, i)));
    i.has(l) || ((to = !0), i.add(l), (e = f0.bind(null, e, t, l)), t.then(e, e));
  }
  function f0(e, t, l) {
    var n = e.pingCache;
    (n !== null && n.delete(t),
      (e.pingedLanes |= e.suspendedLanes & l),
      (e.warmLanes &= ~l),
      qe === e &&
        (Te & l) === l &&
        (Ie === 4 || (Ie === 3 && (Te & 62914560) === Te && 300 > Tt() - Au)
          ? (Oe & 2) === 0 && oa(e, 0)
          : (lo |= l),
        sa === Te && (sa = 0)),
      al(e));
  }
  function Jm(e, t) {
    (t === 0 && (t = Xr()), (e = hn(e, t)), e !== null && (Ca(e, t), al(e)));
  }
  function d0(e) {
    var t = e.memoizedState,
      l = 0;
    (t !== null && (l = t.retryLane), Jm(e, l));
  }
  function m0(e, t) {
    var l = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var n = e.stateNode,
          i = e.memoizedState;
        i !== null && (l = i.retryLane);
        break;
      case 19:
        n = e.stateNode;
        break;
      case 22:
        n = e.stateNode._retryCache;
        break;
      default:
        throw Error(c(314));
    }
    (n !== null && n.delete(t), Jm(e, l));
  }
  function h0(e, t) {
    return xs(e, t);
  }
  var wu = null,
    fa = null,
    ro = !1,
    Du = !1,
    fo = !1,
    Wl = 0;
  function al(e) {
    (e !== fa && e.next === null && (fa === null ? (wu = fa = e) : (fa = fa.next = e)),
      (Du = !0),
      ro || ((ro = !0), y0()));
  }
  function ci(e, t) {
    if (!fo && Du) {
      fo = !0;
      do
        for (var l = !1, n = wu; n !== null; ) {
          if (e !== 0) {
            var i = n.pendingLanes;
            if (i === 0) var s = 0;
            else {
              var f = n.suspendedLanes,
                h = n.pingedLanes;
              ((s = (1 << (31 - kt(42 | e) + 1)) - 1),
                (s &= i & ~(f & ~h)),
                (s = s & 201326741 ? (s & 201326741) | 1 : s ? s | 2 : 0));
            }
            s !== 0 && ((l = !0), eh(n, s));
          } else
            ((s = Te),
              (s = Hi(
                n,
                n === qe ? s : 0,
                n.cancelPendingCommit !== null || n.timeoutHandle !== -1
              )),
              (s & 3) === 0 || Aa(n, s) || ((l = !0), eh(n, s)));
          n = n.next;
        }
      while (l);
      fo = !1;
    }
  }
  function p0() {
    Wm();
  }
  function Wm() {
    Du = ro = !1;
    var e = 0;
    Wl !== 0 && k0() && (e = Wl);
    for (var t = Tt(), l = null, n = wu; n !== null; ) {
      var i = n.next,
        s = Fm(n, t);
      (s === 0
        ? ((n.next = null), l === null ? (wu = i) : (l.next = i), i === null && (fa = l))
        : ((l = n), (e !== 0 || (s & 3) !== 0) && (Du = !0)),
        (n = i));
    }
    ((nt !== 0 && nt !== 5) || ci(e), Wl !== 0 && (Wl = 0));
  }
  function Fm(e, t) {
    for (
      var l = e.suspendedLanes,
        n = e.pingedLanes,
        i = e.expirationTimes,
        s = e.pendingLanes & -62914561;
      0 < s;
    ) {
      var f = 31 - kt(s),
        h = 1 << f,
        E = i[f];
      (E === -1
        ? ((h & l) === 0 || (h & n) !== 0) && (i[f] = Yy(h, t))
        : E <= t && (e.expiredLanes |= h),
        (s &= ~h));
    }
    if (
      ((t = qe),
      (l = Te),
      (l = Hi(e, e === t ? l : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (n = e.callbackNode),
      l === 0 || (e === t && (we === 2 || we === 9)) || e.cancelPendingCommit !== null)
    )
      return (n !== null && n !== null && Es(n), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((l & 3) === 0 || Aa(e, l)) {
      if (((t = l & -l), t === e.callbackPriority)) return t;
      switch ((n !== null && Es(n), ks(l))) {
        case 2:
        case 8:
          l = Gr;
          break;
        case 32:
          l = Di;
          break;
        case 268435456:
          l = Yr;
          break;
        default:
          l = Di;
      }
      return (
        (n = Pm.bind(null, e)),
        (l = xs(l, n)),
        (e.callbackPriority = t),
        (e.callbackNode = l),
        t
      );
    }
    return (
      n !== null && n !== null && Es(n),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function Pm(e, t) {
    if (nt !== 0 && nt !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var l = e.callbackNode;
    if (zu() && e.callbackNode !== l) return null;
    var n = Te;
    return (
      (n = Hi(e, e === qe ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      n === 0
        ? null
        : (wm(e, n, t),
          Fm(e, Tt()),
          e.callbackNode != null && e.callbackNode === l ? Pm.bind(null, e) : null)
    );
  }
  function eh(e, t) {
    if (zu()) return null;
    wm(e, t, !0);
  }
  function y0() {
    C0(function () {
      (Oe & 6) !== 0 ? xs(qr, p0) : Wm();
    });
  }
  function mo() {
    if (Wl === 0) {
      var e = Jn;
      (e === 0 && ((e = Bi), (Bi <<= 1), (Bi & 261888) === 0 && (Bi = 256)), (Wl = e));
    }
    return Wl;
  }
  function th(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : Xi('' + e);
  }
  function lh(e, t) {
    var l = t.ownerDocument.createElement('input');
    return (
      (l.name = t.name),
      (l.value = t.value),
      e.id && l.setAttribute('form', e.id),
      t.parentNode.insertBefore(l, t),
      (e = new FormData(e)),
      l.parentNode.removeChild(l),
      e
    );
  }
  function g0(e, t, l, n, i) {
    if (t === 'submit' && l && l.stateNode === i) {
      var s = th((i[gt] || null).action),
        f = n.submitter;
      f &&
        ((t = (t = f[gt] || null) ? th(t.formAction) : f.getAttribute('formAction')),
        t !== null && ((s = t), (f = null)));
      var h = new Ki('action', 'action', null, n, i);
      e.push({
        event: h,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (n.defaultPrevented) {
                if (Wl !== 0) {
                  var E = f ? lh(i, f) : new FormData(i);
                  Oc(l, { pending: !0, data: E, method: i.method, action: s }, null, E);
                }
              } else
                typeof s == 'function' &&
                  (h.preventDefault(),
                  (E = f ? lh(i, f) : new FormData(i)),
                  Oc(l, { pending: !0, data: E, method: i.method, action: s }, s, E));
            },
            currentTarget: i,
          },
        ],
      });
    }
  }
  for (var ho = 0; ho < Is.length; ho++) {
    var po = Is[ho],
      _0 = po.toLowerCase(),
      v0 = po[0].toUpperCase() + po.slice(1);
    It(_0, 'on' + v0);
  }
  (It(zf, 'onAnimationEnd'),
    It(wf, 'onAnimationIteration'),
    It(Df, 'onAnimationStart'),
    It('dblclick', 'onDoubleClick'),
    It('focusin', 'onFocus'),
    It('focusout', 'onBlur'),
    It(Dg, 'onTransitionRun'),
    It(Bg, 'onTransitionStart'),
    It(Ug, 'onTransitionCancel'),
    It(Bf, 'onTransitionEnd'),
    Bn('onMouseEnter', ['mouseout', 'mouseover']),
    Bn('onMouseLeave', ['mouseout', 'mouseover']),
    Bn('onPointerEnter', ['pointerout', 'pointerover']),
    Bn('onPointerLeave', ['pointerout', 'pointerover']),
    rn('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    rn(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    rn('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    rn('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    rn(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    rn(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var oi =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    b0 = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(oi)
    );
  function nh(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var n = e[l],
        i = n.event;
      n = n.listeners;
      e: {
        var s = void 0;
        if (t)
          for (var f = n.length - 1; 0 <= f; f--) {
            var h = n[f],
              E = h.instance,
              z = h.currentTarget;
            if (((h = h.listener), E !== s && i.isPropagationStopped())) break e;
            ((s = h), (i.currentTarget = z));
            try {
              s(i);
            } catch (H) {
              Ji(H);
            }
            ((i.currentTarget = null), (s = E));
          }
        else
          for (f = 0; f < n.length; f++) {
            if (
              ((h = n[f]),
              (E = h.instance),
              (z = h.currentTarget),
              (h = h.listener),
              E !== s && i.isPropagationStopped())
            )
              break e;
            ((s = h), (i.currentTarget = z));
            try {
              s(i);
            } catch (H) {
              Ji(H);
            }
            ((i.currentTarget = null), (s = E));
          }
      }
    }
  }
  function xe(e, t) {
    var l = t[As];
    l === void 0 && (l = t[As] = new Set());
    var n = e + '__bubble';
    l.has(n) || (ah(t, e, 2, !1), l.add(n));
  }
  function yo(e, t, l) {
    var n = 0;
    (t && (n |= 4), ah(l, e, n, t));
  }
  var Bu = '_reactListening' + Math.random().toString(36).slice(2);
  function go(e) {
    if (!e[Bu]) {
      ((e[Bu] = !0),
        Jr.forEach(function (l) {
          l !== 'selectionchange' && (b0.has(l) || yo(l, !1, e), yo(l, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Bu] || ((t[Bu] = !0), yo('selectionchange', !1, t));
    }
  }
  function ah(e, t, l, n) {
    switch (zh(t)) {
      case 2:
        var i = Z0;
        break;
      case 8:
        i = I0;
        break;
      default:
        i = Oo;
    }
    ((l = i.bind(null, t, l, e)),
      (i = void 0),
      !Bs || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (i = !0),
      n
        ? i !== void 0
          ? e.addEventListener(t, l, { capture: !0, passive: i })
          : e.addEventListener(t, l, !0)
        : i !== void 0
          ? e.addEventListener(t, l, { passive: i })
          : e.addEventListener(t, l, !1));
  }
  function _o(e, t, l, n, i) {
    var s = n;
    if ((t & 1) === 0 && (t & 2) === 0 && n !== null)
      e: for (;;) {
        if (n === null) return;
        var f = n.tag;
        if (f === 3 || f === 4) {
          var h = n.stateNode.containerInfo;
          if (h === i) break;
          if (f === 4)
            for (f = n.return; f !== null; ) {
              var E = f.tag;
              if ((E === 3 || E === 4) && f.stateNode.containerInfo === i) return;
              f = f.return;
            }
          for (; h !== null; ) {
            if (((f = zn(h)), f === null)) return;
            if (((E = f.tag), E === 5 || E === 6 || E === 26 || E === 27)) {
              n = s = f;
              continue e;
            }
            h = h.parentNode;
          }
        }
        n = n.return;
      }
    of(function () {
      var z = s,
        H = ws(l),
        X = [];
      e: {
        var D = Uf.get(e);
        if (D !== void 0) {
          var B = Ki,
            ne = e;
          switch (e) {
            case 'keypress':
              if (Vi(l) === 0) break e;
            case 'keydown':
            case 'keyup':
              B = mg;
              break;
            case 'focusin':
              ((ne = 'focus'), (B = qs));
              break;
            case 'focusout':
              ((ne = 'blur'), (B = qs));
              break;
            case 'beforeblur':
            case 'afterblur':
              B = qs;
              break;
            case 'click':
              if (l.button === 2) break e;
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              B = df;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              B = tg;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              B = yg;
              break;
            case zf:
            case wf:
            case Df:
              B = ag;
              break;
            case Bf:
              B = _g;
              break;
            case 'scroll':
            case 'scrollend':
              B = Py;
              break;
            case 'wheel':
              B = bg;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              B = ug;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              B = hf;
              break;
            case 'toggle':
            case 'beforetoggle':
              B = xg;
          }
          var re = (t & 4) !== 0,
            He = !re && (e === 'scroll' || e === 'scrollend'),
            M = re ? (D !== null ? D + 'Capture' : null) : D;
          re = [];
          for (var T = z, O; T !== null; ) {
            var Y = T;
            if (
              ((O = Y.stateNode),
              (Y = Y.tag),
              (Y !== 5 && Y !== 26 && Y !== 27) ||
                O === null ||
                M === null ||
                ((Y = ja(T, M)), Y != null && re.push(ri(T, Y, O))),
              He)
            )
              break;
            T = T.return;
          }
          0 < re.length && ((D = new B(D, ne, null, l, H)), X.push({ event: D, listeners: re }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((D = e === 'mouseover' || e === 'pointerover'),
            (B = e === 'mouseout' || e === 'pointerout'),
            D && l !== zs && (ne = l.relatedTarget || l.fromElement) && (zn(ne) || ne[On]))
          )
            break e;
          if (
            (B || D) &&
            ((D =
              H.window === H
                ? H
                : (D = H.ownerDocument)
                  ? D.defaultView || D.parentWindow
                  : window),
            B
              ? ((ne = l.relatedTarget || l.toElement),
                (B = z),
                (ne = ne ? zn(ne) : null),
                ne !== null &&
                  ((He = d(ne)), (re = ne.tag), ne !== He || (re !== 5 && re !== 27 && re !== 6)) &&
                  (ne = null))
              : ((B = null), (ne = z)),
            B !== ne)
          ) {
            if (
              ((re = df),
              (Y = 'onMouseLeave'),
              (M = 'onMouseEnter'),
              (T = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((re = hf), (Y = 'onPointerLeave'), (M = 'onPointerEnter'), (T = 'pointer')),
              (He = B == null ? D : Ra(B)),
              (O = ne == null ? D : Ra(ne)),
              (D = new re(Y, T + 'leave', B, l, H)),
              (D.target = He),
              (D.relatedTarget = O),
              (Y = null),
              zn(H) === z &&
                ((re = new re(M, T + 'enter', ne, l, H)),
                (re.target = O),
                (re.relatedTarget = He),
                (Y = re)),
              (He = Y),
              B && ne)
            )
              t: {
                for (re = S0, M = B, T = ne, O = 0, Y = M; Y; Y = re(Y)) O++;
                Y = 0;
                for (var se = T; se; se = re(se)) Y++;
                for (; 0 < O - Y; ) ((M = re(M)), O--);
                for (; 0 < Y - O; ) ((T = re(T)), Y--);
                for (; O--; ) {
                  if (M === T || (T !== null && M === T.alternate)) {
                    re = M;
                    break t;
                  }
                  ((M = re(M)), (T = re(T)));
                }
                re = null;
              }
            else re = null;
            (B !== null && ih(X, D, B, re, !1),
              ne !== null && He !== null && ih(X, He, ne, re, !0));
          }
        }
        e: {
          if (
            ((D = z ? Ra(z) : window),
            (B = D.nodeName && D.nodeName.toLowerCase()),
            B === 'select' || (B === 'input' && D.type === 'file'))
          )
            var Me = xf;
          else if (bf(D))
            if (Ef) Me = Og;
            else {
              Me = Rg;
              var ie = Mg;
            }
          else
            ((B = D.nodeName),
              !B || B.toLowerCase() !== 'input' || (D.type !== 'checkbox' && D.type !== 'radio')
                ? z && Os(z.elementType) && (Me = xf)
                : (Me = jg));
          if (Me && (Me = Me(e, z))) {
            Sf(X, Me, l, H);
            break e;
          }
          (ie && ie(e, D, z),
            e === 'focusout' &&
              z &&
              D.type === 'number' &&
              z.memoizedProps.value != null &&
              js(D, 'number', D.value));
        }
        switch (((ie = z ? Ra(z) : window), e)) {
          case 'focusin':
            (bf(ie) || ie.contentEditable === 'true') && ((Yn = ie), (Qs = z), (Ha = null));
            break;
          case 'focusout':
            Ha = Qs = Yn = null;
            break;
          case 'mousedown':
            Ks = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((Ks = !1), jf(X, l, H));
            break;
          case 'selectionchange':
            if (wg) break;
          case 'keydown':
          case 'keyup':
            jf(X, l, H);
        }
        var ve;
        if (Ys)
          e: {
            switch (e) {
              case 'compositionstart':
                var Ne = 'onCompositionStart';
                break e;
              case 'compositionend':
                Ne = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                Ne = 'onCompositionUpdate';
                break e;
            }
            Ne = void 0;
          }
        else
          Gn
            ? _f(e, l) && (Ne = 'onCompositionEnd')
            : e === 'keydown' && l.keyCode === 229 && (Ne = 'onCompositionStart');
        (Ne &&
          (pf &&
            l.locale !== 'ko' &&
            (Gn || Ne !== 'onCompositionStart'
              ? Ne === 'onCompositionEnd' && Gn && (ve = rf())
              : ((Dl = H), (Us = 'value' in Dl ? Dl.value : Dl.textContent), (Gn = !0))),
          (ie = Uu(z, Ne)),
          0 < ie.length &&
            ((Ne = new mf(Ne, e, null, l, H)),
            X.push({ event: Ne, listeners: ie }),
            ve ? (Ne.data = ve) : ((ve = vf(l)), ve !== null && (Ne.data = ve)))),
          (ve = Tg ? Ng(e, l) : kg(e, l)) &&
            ((Ne = Uu(z, 'onBeforeInput')),
            0 < Ne.length &&
              ((ie = new mf('onBeforeInput', 'beforeinput', null, l, H)),
              X.push({ event: ie, listeners: Ne }),
              (ie.data = ve))),
          g0(X, e, z, l, H));
      }
      nh(X, t);
    });
  }
  function ri(e, t, l) {
    return { instance: e, listener: t, currentTarget: l };
  }
  function Uu(e, t) {
    for (var l = t + 'Capture', n = []; e !== null; ) {
      var i = e,
        s = i.stateNode;
      if (
        ((i = i.tag),
        (i !== 5 && i !== 26 && i !== 27) ||
          s === null ||
          ((i = ja(e, l)),
          i != null && n.unshift(ri(e, i, s)),
          (i = ja(e, t)),
          i != null && n.push(ri(e, i, s))),
        e.tag === 3)
      )
        return n;
      e = e.return;
    }
    return [];
  }
  function S0(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function ih(e, t, l, n, i) {
    for (var s = t._reactName, f = []; l !== null && l !== n; ) {
      var h = l,
        E = h.alternate,
        z = h.stateNode;
      if (((h = h.tag), E !== null && E === n)) break;
      ((h !== 5 && h !== 26 && h !== 27) ||
        z === null ||
        ((E = z),
        i
          ? ((z = ja(l, s)), z != null && f.unshift(ri(l, z, E)))
          : i || ((z = ja(l, s)), z != null && f.push(ri(l, z, E)))),
        (l = l.return));
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var x0 = /\r\n?/g,
    E0 = /\u0000|\uFFFD/g;
  function uh(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        x0,
        `
`
      )
      .replace(E0, '');
  }
  function sh(e, t) {
    return ((t = uh(t)), uh(e) === t);
  }
  function Le(e, t, l, n, i, s) {
    switch (l) {
      case 'children':
        typeof n == 'string'
          ? t === 'body' || (t === 'textarea' && n === '') || Ln(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && t !== 'body' && Ln(e, '' + n);
        break;
      case 'className':
        Gi(e, 'class', n);
        break;
      case 'tabIndex':
        Gi(e, 'tabindex', n);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Gi(e, l, n);
        break;
      case 'style':
        sf(e, n, s);
        break;
      case 'data':
        if (t !== 'object') {
          Gi(e, 'data', n);
          break;
        }
      case 'src':
      case 'href':
        if (n === '' && (t !== 'a' || l !== 'href')) {
          e.removeAttribute(l);
          break;
        }
        if (n == null || typeof n == 'function' || typeof n == 'symbol' || typeof n == 'boolean') {
          e.removeAttribute(l);
          break;
        }
        ((n = Xi('' + n)), e.setAttribute(l, n));
        break;
      case 'action':
      case 'formAction':
        if (typeof n == 'function') {
          e.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof s == 'function' &&
            (l === 'formAction'
              ? (t !== 'input' && Le(e, t, 'name', i.name, i, null),
                Le(e, t, 'formEncType', i.formEncType, i, null),
                Le(e, t, 'formMethod', i.formMethod, i, null),
                Le(e, t, 'formTarget', i.formTarget, i, null))
              : (Le(e, t, 'encType', i.encType, i, null),
                Le(e, t, 'method', i.method, i, null),
                Le(e, t, 'target', i.target, i, null)));
        if (n == null || typeof n == 'symbol' || typeof n == 'boolean') {
          e.removeAttribute(l);
          break;
        }
        ((n = Xi('' + n)), e.setAttribute(l, n));
        break;
      case 'onClick':
        n != null && (e.onclick = ol);
        break;
      case 'onScroll':
        n != null && xe('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && xe('scrollend', e);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(c(61));
          if (((l = n.__html), l != null)) {
            if (i.children != null) throw Error(c(60));
            e.innerHTML = l;
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
        ((l = Xi('' + n)), e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', l));
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
          ? e.setAttribute(l, '' + n)
          : e.removeAttribute(l);
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
          ? e.setAttribute(l, '')
          : e.removeAttribute(l);
        break;
      case 'capture':
      case 'download':
        n === !0
          ? e.setAttribute(l, '')
          : n !== !1 && n != null && typeof n != 'function' && typeof n != 'symbol'
            ? e.setAttribute(l, n)
            : e.removeAttribute(l);
        break;
      case 'cols':
      case 'rows':
      case 'size':
      case 'span':
        n != null && typeof n != 'function' && typeof n != 'symbol' && !isNaN(n) && 1 <= n
          ? e.setAttribute(l, n)
          : e.removeAttribute(l);
        break;
      case 'rowSpan':
      case 'start':
        n == null || typeof n == 'function' || typeof n == 'symbol' || isNaN(n)
          ? e.removeAttribute(l)
          : e.setAttribute(l, n);
        break;
      case 'popover':
        (xe('beforetoggle', e), xe('toggle', e), qi(e, 'popover', n));
        break;
      case 'xlinkActuate':
        cl(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', n);
        break;
      case 'xlinkArcrole':
        cl(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', n);
        break;
      case 'xlinkRole':
        cl(e, 'http://www.w3.org/1999/xlink', 'xlink:role', n);
        break;
      case 'xlinkShow':
        cl(e, 'http://www.w3.org/1999/xlink', 'xlink:show', n);
        break;
      case 'xlinkTitle':
        cl(e, 'http://www.w3.org/1999/xlink', 'xlink:title', n);
        break;
      case 'xlinkType':
        cl(e, 'http://www.w3.org/1999/xlink', 'xlink:type', n);
        break;
      case 'xmlBase':
        cl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', n);
        break;
      case 'xmlLang':
        cl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', n);
        break;
      case 'xmlSpace':
        cl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', n);
        break;
      case 'is':
        qi(e, 'is', n);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < l.length) || (l[0] !== 'o' && l[0] !== 'O') || (l[1] !== 'n' && l[1] !== 'N')) &&
          ((l = Wy.get(l) || l), qi(e, l, n));
    }
  }
  function vo(e, t, l, n, i, s) {
    switch (l) {
      case 'style':
        sf(e, n, s);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(c(61));
          if (((l = n.__html), l != null)) {
            if (i.children != null) throw Error(c(60));
            e.innerHTML = l;
          }
        }
        break;
      case 'children':
        typeof n == 'string'
          ? Ln(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && Ln(e, '' + n);
        break;
      case 'onScroll':
        n != null && xe('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && xe('scrollend', e);
        break;
      case 'onClick':
        n != null && (e.onclick = ol);
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
        if (!Wr.hasOwnProperty(l))
          e: {
            if (
              l[0] === 'o' &&
              l[1] === 'n' &&
              ((i = l.endsWith('Capture')),
              (t = l.slice(2, i ? l.length - 7 : void 0)),
              (s = e[gt] || null),
              (s = s != null ? s[l] : null),
              typeof s == 'function' && e.removeEventListener(t, s, i),
              typeof n == 'function')
            ) {
              (typeof s != 'function' &&
                s !== null &&
                (l in e ? (e[l] = null) : e.hasAttribute(l) && e.removeAttribute(l)),
                e.addEventListener(t, n, i));
              break e;
            }
            l in e ? (e[l] = n) : n === !0 ? e.setAttribute(l, '') : qi(e, l, n);
          }
    }
  }
  function ft(e, t, l) {
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
        (xe('error', e), xe('load', e));
        var n = !1,
          i = !1,
          s;
        for (s in l)
          if (l.hasOwnProperty(s)) {
            var f = l[s];
            if (f != null)
              switch (s) {
                case 'src':
                  n = !0;
                  break;
                case 'srcSet':
                  i = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(c(137, t));
                default:
                  Le(e, t, s, f, l, null);
              }
          }
        (i && Le(e, t, 'srcSet', l.srcSet, l, null), n && Le(e, t, 'src', l.src, l, null));
        return;
      case 'input':
        xe('invalid', e);
        var h = (s = f = i = null),
          E = null,
          z = null;
        for (n in l)
          if (l.hasOwnProperty(n)) {
            var H = l[n];
            if (H != null)
              switch (n) {
                case 'name':
                  i = H;
                  break;
                case 'type':
                  f = H;
                  break;
                case 'checked':
                  E = H;
                  break;
                case 'defaultChecked':
                  z = H;
                  break;
                case 'value':
                  s = H;
                  break;
                case 'defaultValue':
                  h = H;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (H != null) throw Error(c(137, t));
                  break;
                default:
                  Le(e, t, n, H, l, null);
              }
          }
        lf(e, s, h, E, z, f, i, !1);
        return;
      case 'select':
        (xe('invalid', e), (n = f = s = null));
        for (i in l)
          if (l.hasOwnProperty(i) && ((h = l[i]), h != null))
            switch (i) {
              case 'value':
                s = h;
                break;
              case 'defaultValue':
                f = h;
                break;
              case 'multiple':
                n = h;
              default:
                Le(e, t, i, h, l, null);
            }
        ((t = s),
          (l = f),
          (e.multiple = !!n),
          t != null ? Un(e, !!n, t, !1) : l != null && Un(e, !!n, l, !0));
        return;
      case 'textarea':
        (xe('invalid', e), (s = i = n = null));
        for (f in l)
          if (l.hasOwnProperty(f) && ((h = l[f]), h != null))
            switch (f) {
              case 'value':
                n = h;
                break;
              case 'defaultValue':
                i = h;
                break;
              case 'children':
                s = h;
                break;
              case 'dangerouslySetInnerHTML':
                if (h != null) throw Error(c(91));
                break;
              default:
                Le(e, t, f, h, l, null);
            }
        af(e, n, i, s);
        return;
      case 'option':
        for (E in l)
          if (l.hasOwnProperty(E) && ((n = l[E]), n != null))
            switch (E) {
              case 'selected':
                e.selected = n && typeof n != 'function' && typeof n != 'symbol';
                break;
              default:
                Le(e, t, E, n, l, null);
            }
        return;
      case 'dialog':
        (xe('beforetoggle', e), xe('toggle', e), xe('cancel', e), xe('close', e));
        break;
      case 'iframe':
      case 'object':
        xe('load', e);
        break;
      case 'video':
      case 'audio':
        for (n = 0; n < oi.length; n++) xe(oi[n], e);
        break;
      case 'image':
        (xe('error', e), xe('load', e));
        break;
      case 'details':
        xe('toggle', e);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (xe('error', e), xe('load', e));
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
        for (z in l)
          if (l.hasOwnProperty(z) && ((n = l[z]), n != null))
            switch (z) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(c(137, t));
              default:
                Le(e, t, z, n, l, null);
            }
        return;
      default:
        if (Os(t)) {
          for (H in l)
            l.hasOwnProperty(H) && ((n = l[H]), n !== void 0 && vo(e, t, H, n, l, void 0));
          return;
        }
    }
    for (h in l) l.hasOwnProperty(h) && ((n = l[h]), n != null && Le(e, t, h, n, l, null));
  }
  function T0(e, t, l, n) {
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
        var i = null,
          s = null,
          f = null,
          h = null,
          E = null,
          z = null,
          H = null;
        for (B in l) {
          var X = l[B];
          if (l.hasOwnProperty(B) && X != null)
            switch (B) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                E = X;
              default:
                n.hasOwnProperty(B) || Le(e, t, B, null, n, X);
            }
        }
        for (var D in n) {
          var B = n[D];
          if (((X = l[D]), n.hasOwnProperty(D) && (B != null || X != null)))
            switch (D) {
              case 'type':
                s = B;
                break;
              case 'name':
                i = B;
                break;
              case 'checked':
                z = B;
                break;
              case 'defaultChecked':
                H = B;
                break;
              case 'value':
                f = B;
                break;
              case 'defaultValue':
                h = B;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (B != null) throw Error(c(137, t));
                break;
              default:
                B !== X && Le(e, t, D, B, n, X);
            }
        }
        Rs(e, f, h, E, z, H, s, i);
        return;
      case 'select':
        B = f = h = D = null;
        for (s in l)
          if (((E = l[s]), l.hasOwnProperty(s) && E != null))
            switch (s) {
              case 'value':
                break;
              case 'multiple':
                B = E;
              default:
                n.hasOwnProperty(s) || Le(e, t, s, null, n, E);
            }
        for (i in n)
          if (((s = n[i]), (E = l[i]), n.hasOwnProperty(i) && (s != null || E != null)))
            switch (i) {
              case 'value':
                D = s;
                break;
              case 'defaultValue':
                h = s;
                break;
              case 'multiple':
                f = s;
              default:
                s !== E && Le(e, t, i, s, n, E);
            }
        ((t = h),
          (l = f),
          (n = B),
          D != null
            ? Un(e, !!l, D, !1)
            : !!n != !!l && (t != null ? Un(e, !!l, t, !0) : Un(e, !!l, l ? [] : '', !1)));
        return;
      case 'textarea':
        B = D = null;
        for (h in l)
          if (((i = l[h]), l.hasOwnProperty(h) && i != null && !n.hasOwnProperty(h)))
            switch (h) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                Le(e, t, h, null, n, i);
            }
        for (f in n)
          if (((i = n[f]), (s = l[f]), n.hasOwnProperty(f) && (i != null || s != null)))
            switch (f) {
              case 'value':
                D = i;
                break;
              case 'defaultValue':
                B = i;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (i != null) throw Error(c(91));
                break;
              default:
                i !== s && Le(e, t, f, i, n, s);
            }
        nf(e, D, B);
        return;
      case 'option':
        for (var ne in l)
          if (((D = l[ne]), l.hasOwnProperty(ne) && D != null && !n.hasOwnProperty(ne)))
            switch (ne) {
              case 'selected':
                e.selected = !1;
                break;
              default:
                Le(e, t, ne, null, n, D);
            }
        for (E in n)
          if (((D = n[E]), (B = l[E]), n.hasOwnProperty(E) && D !== B && (D != null || B != null)))
            switch (E) {
              case 'selected':
                e.selected = D && typeof D != 'function' && typeof D != 'symbol';
                break;
              default:
                Le(e, t, E, D, n, B);
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
        for (var re in l)
          ((D = l[re]),
            l.hasOwnProperty(re) && D != null && !n.hasOwnProperty(re) && Le(e, t, re, null, n, D));
        for (z in n)
          if (((D = n[z]), (B = l[z]), n.hasOwnProperty(z) && D !== B && (D != null || B != null)))
            switch (z) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (D != null) throw Error(c(137, t));
                break;
              default:
                Le(e, t, z, D, n, B);
            }
        return;
      default:
        if (Os(t)) {
          for (var He in l)
            ((D = l[He]),
              l.hasOwnProperty(He) &&
                D !== void 0 &&
                !n.hasOwnProperty(He) &&
                vo(e, t, He, void 0, n, D));
          for (H in n)
            ((D = n[H]),
              (B = l[H]),
              !n.hasOwnProperty(H) ||
                D === B ||
                (D === void 0 && B === void 0) ||
                vo(e, t, H, D, n, B));
          return;
        }
    }
    for (var M in l)
      ((D = l[M]),
        l.hasOwnProperty(M) && D != null && !n.hasOwnProperty(M) && Le(e, t, M, null, n, D));
    for (X in n)
      ((D = n[X]),
        (B = l[X]),
        !n.hasOwnProperty(X) || D === B || (D == null && B == null) || Le(e, t, X, D, n, B));
  }
  function ch(e) {
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
  function N0() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var e = 0, t = 0, l = performance.getEntriesByType('resource'), n = 0;
        n < l.length;
        n++
      ) {
        var i = l[n],
          s = i.transferSize,
          f = i.initiatorType,
          h = i.duration;
        if (s && h && ch(f)) {
          for (f = 0, h = i.responseEnd, n += 1; n < l.length; n++) {
            var E = l[n],
              z = E.startTime;
            if (z > h) break;
            var H = E.transferSize,
              X = E.initiatorType;
            H && ch(X) && ((E = E.responseEnd), (f += H * (E < h ? 1 : (h - z) / (E - z))));
          }
          if ((--n, (t += (8 * (s + f)) / (i.duration / 1e3)), e++, 10 < e)) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && ((e = navigator.connection.downlink), typeof e == 'number')
      ? e
      : 5;
  }
  var bo = null,
    So = null;
  function Lu(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function oh(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function rh(e, t) {
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
  function xo(e, t) {
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
  var Eo = null;
  function k0() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === Eo ? !1 : ((Eo = e), !0)) : ((Eo = null), !1);
  }
  var fh = typeof setTimeout == 'function' ? setTimeout : void 0,
    A0 = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    dh = typeof Promise == 'function' ? Promise : void 0,
    C0 =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof dh < 'u'
          ? function (e) {
              return dh.resolve(null).then(e).catch(M0);
            }
          : fh;
  function M0(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Fl(e) {
    return e === 'head';
  }
  function mh(e, t) {
    var l = t,
      n = 0;
    do {
      var i = l.nextSibling;
      if ((e.removeChild(l), i && i.nodeType === 8))
        if (((l = i.data), l === '/$' || l === '/&')) {
          if (n === 0) {
            (e.removeChild(i), pa(t));
            return;
          }
          n--;
        } else if (l === '$' || l === '$?' || l === '$~' || l === '$!' || l === '&') n++;
        else if (l === 'html') fi(e.ownerDocument.documentElement);
        else if (l === 'head') {
          ((l = e.ownerDocument.head), fi(l));
          for (var s = l.firstChild; s; ) {
            var f = s.nextSibling,
              h = s.nodeName;
            (s[Ma] ||
              h === 'SCRIPT' ||
              h === 'STYLE' ||
              (h === 'LINK' && s.rel.toLowerCase() === 'stylesheet') ||
              l.removeChild(s),
              (s = f));
          }
        } else l === 'body' && fi(e.ownerDocument.body);
      l = i;
    } while (l);
    pa(t);
  }
  function hh(e, t) {
    var l = e;
    e = 0;
    do {
      var n = l.nextSibling;
      if (
        (l.nodeType === 1
          ? t
            ? ((l._stashedDisplay = l.style.display), (l.style.display = 'none'))
            : ((l.style.display = l._stashedDisplay || ''),
              l.getAttribute('style') === '' && l.removeAttribute('style'))
          : l.nodeType === 3 &&
            (t
              ? ((l._stashedText = l.nodeValue), (l.nodeValue = ''))
              : (l.nodeValue = l._stashedText || '')),
        n && n.nodeType === 8)
      )
        if (((l = n.data), l === '/$')) {
          if (e === 0) break;
          e--;
        } else (l !== '$' && l !== '$?' && l !== '$~' && l !== '$!') || e++;
      l = n;
    } while (l);
  }
  function To(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (((t = t.nextSibling), l.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (To(l), Cs(l));
          continue;
        case 'SCRIPT':
        case 'STYLE':
          continue;
        case 'LINK':
          if (l.rel.toLowerCase() === 'stylesheet') continue;
      }
      e.removeChild(l);
    }
  }
  function R0(e, t, l, n) {
    for (; e.nodeType === 1; ) {
      var i = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!n && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (n) {
        if (!e[Ma])
          switch (t) {
            case 'meta':
              if (!e.hasAttribute('itemprop')) break;
              return e;
            case 'link':
              if (
                ((s = e.getAttribute('rel')),
                s === 'stylesheet' && e.hasAttribute('data-precedence'))
              )
                break;
              if (
                s !== i.rel ||
                e.getAttribute('href') !== (i.href == null || i.href === '' ? null : i.href) ||
                e.getAttribute('crossorigin') !== (i.crossOrigin == null ? null : i.crossOrigin) ||
                e.getAttribute('title') !== (i.title == null ? null : i.title)
              )
                break;
              return e;
            case 'style':
              if (e.hasAttribute('data-precedence')) break;
              return e;
            case 'script':
              if (
                ((s = e.getAttribute('src')),
                (s !== (i.src == null ? null : i.src) ||
                  e.getAttribute('type') !== (i.type == null ? null : i.type) ||
                  e.getAttribute('crossorigin') !==
                    (i.crossOrigin == null ? null : i.crossOrigin)) &&
                  s &&
                  e.hasAttribute('async') &&
                  !e.hasAttribute('itemprop'))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === 'input' && e.type === 'hidden') {
        var s = i.name == null ? null : '' + i.name;
        if (i.type === 'hidden' && e.getAttribute('name') === s) return e;
      } else return e;
      if (((e = $t(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function j0(e, t, l) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !l) ||
        ((e = $t(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function ph(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = $t(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function No(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function ko(e) {
    return e.data === '$!' || (e.data === '$?' && e.ownerDocument.readyState !== 'loading');
  }
  function O0(e, t) {
    var l = e.ownerDocument;
    if (e.data === '$~') e._reactRetry = t;
    else if (e.data !== '$?' || l.readyState !== 'loading') t();
    else {
      var n = function () {
        (t(), l.removeEventListener('DOMContentLoaded', n));
      };
      (l.addEventListener('DOMContentLoaded', n), (e._reactRetry = n));
    }
  }
  function $t(e) {
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
  var Ao = null;
  function yh(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === '/$' || l === '/&') {
          if (t === 0) return $t(e.nextSibling);
          t--;
        } else (l !== '$' && l !== '$!' && l !== '$?' && l !== '$~' && l !== '&') || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function gh(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === '$' || l === '$!' || l === '$?' || l === '$~' || l === '&') {
          if (t === 0) return e;
          t--;
        } else (l !== '/$' && l !== '/&') || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function _h(e, t, l) {
    switch (((t = Lu(l)), e)) {
      case 'html':
        if (((e = t.documentElement), !e)) throw Error(c(452));
        return e;
      case 'head':
        if (((e = t.head), !e)) throw Error(c(453));
        return e;
      case 'body':
        if (((e = t.body), !e)) throw Error(c(454));
        return e;
      default:
        throw Error(c(451));
    }
  }
  function fi(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    Cs(e);
  }
  var Vt = new Map(),
    vh = new Set();
  function Hu(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var Nl = J.d;
  J.d = { f: z0, r: w0, D: D0, C: B0, L: U0, m: L0, X: q0, S: H0, M: G0 };
  function z0() {
    var e = Nl.f(),
      t = Ru();
    return e || t;
  }
  function w0(e) {
    var t = wn(e);
    t !== null && t.tag === 5 && t.type === 'form' ? Bd(t) : Nl.r(e);
  }
  var da = typeof document > 'u' ? null : document;
  function bh(e, t, l) {
    var n = da;
    if (n && typeof t == 'string' && t) {
      var i = Ut(t);
      ((i = 'link[rel="' + e + '"][href="' + i + '"]'),
        typeof l == 'string' && (i += '[crossorigin="' + l + '"]'),
        vh.has(i) ||
          (vh.add(i),
          (e = { rel: e, crossOrigin: l, href: t }),
          n.querySelector(i) === null &&
            ((t = n.createElement('link')), ft(t, 'link', e), it(t), n.head.appendChild(t))));
    }
  }
  function D0(e) {
    (Nl.D(e), bh('dns-prefetch', e, null));
  }
  function B0(e, t) {
    (Nl.C(e, t), bh('preconnect', e, t));
  }
  function U0(e, t, l) {
    Nl.L(e, t, l);
    var n = da;
    if (n && e && t) {
      var i = 'link[rel="preload"][as="' + Ut(t) + '"]';
      t === 'image' && l && l.imageSrcSet
        ? ((i += '[imagesrcset="' + Ut(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == 'string' && (i += '[imagesizes="' + Ut(l.imageSizes) + '"]'))
        : (i += '[href="' + Ut(e) + '"]');
      var s = i;
      switch (t) {
        case 'style':
          s = ma(e);
          break;
        case 'script':
          s = ha(e);
      }
      Vt.has(s) ||
        ((e = S(
          { rel: 'preload', href: t === 'image' && l && l.imageSrcSet ? void 0 : e, as: t },
          l
        )),
        Vt.set(s, e),
        n.querySelector(i) !== null ||
          (t === 'style' && n.querySelector(di(s))) ||
          (t === 'script' && n.querySelector(mi(s))) ||
          ((t = n.createElement('link')), ft(t, 'link', e), it(t), n.head.appendChild(t)));
    }
  }
  function L0(e, t) {
    Nl.m(e, t);
    var l = da;
    if (l && e) {
      var n = t && typeof t.as == 'string' ? t.as : 'script',
        i = 'link[rel="modulepreload"][as="' + Ut(n) + '"][href="' + Ut(e) + '"]',
        s = i;
      switch (n) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          s = ha(e);
      }
      if (
        !Vt.has(s) &&
        ((e = S({ rel: 'modulepreload', href: e }, t)), Vt.set(s, e), l.querySelector(i) === null)
      ) {
        switch (n) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (l.querySelector(mi(s))) return;
        }
        ((n = l.createElement('link')), ft(n, 'link', e), it(n), l.head.appendChild(n));
      }
    }
  }
  function H0(e, t, l) {
    Nl.S(e, t, l);
    var n = da;
    if (n && e) {
      var i = Dn(n).hoistableStyles,
        s = ma(e);
      t = t || 'default';
      var f = i.get(s);
      if (!f) {
        var h = { loading: 0, preload: null };
        if ((f = n.querySelector(di(s)))) h.loading = 5;
        else {
          ((e = S({ rel: 'stylesheet', href: e, 'data-precedence': t }, l)),
            (l = Vt.get(s)) && Co(e, l));
          var E = (f = n.createElement('link'));
          (it(E),
            ft(E, 'link', e),
            (E._p = new Promise(function (z, H) {
              ((E.onload = z), (E.onerror = H));
            })),
            E.addEventListener('load', function () {
              h.loading |= 1;
            }),
            E.addEventListener('error', function () {
              h.loading |= 2;
            }),
            (h.loading |= 4),
            qu(f, t, n));
        }
        ((f = { type: 'stylesheet', instance: f, count: 1, state: h }), i.set(s, f));
      }
    }
  }
  function q0(e, t) {
    Nl.X(e, t);
    var l = da;
    if (l && e) {
      var n = Dn(l).hoistableScripts,
        i = ha(e),
        s = n.get(i);
      s ||
        ((s = l.querySelector(mi(i))),
        s ||
          ((e = S({ src: e, async: !0 }, t)),
          (t = Vt.get(i)) && Mo(e, t),
          (s = l.createElement('script')),
          it(s),
          ft(s, 'link', e),
          l.head.appendChild(s)),
        (s = { type: 'script', instance: s, count: 1, state: null }),
        n.set(i, s));
    }
  }
  function G0(e, t) {
    Nl.M(e, t);
    var l = da;
    if (l && e) {
      var n = Dn(l).hoistableScripts,
        i = ha(e),
        s = n.get(i);
      s ||
        ((s = l.querySelector(mi(i))),
        s ||
          ((e = S({ src: e, async: !0, type: 'module' }, t)),
          (t = Vt.get(i)) && Mo(e, t),
          (s = l.createElement('script')),
          it(s),
          ft(s, 'link', e),
          l.head.appendChild(s)),
        (s = { type: 'script', instance: s, count: 1, state: null }),
        n.set(i, s));
    }
  }
  function Sh(e, t, l, n) {
    var i = (i = be.current) ? Hu(i) : null;
    if (!i) throw Error(c(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof l.precedence == 'string' && typeof l.href == 'string'
          ? ((t = ma(l.href)),
            (l = Dn(i).hoistableStyles),
            (n = l.get(t)),
            n || ((n = { type: 'style', instance: null, count: 0, state: null }), l.set(t, n)),
            n)
          : { type: 'void', instance: null, count: 0, state: null };
      case 'link':
        if (
          l.rel === 'stylesheet' &&
          typeof l.href == 'string' &&
          typeof l.precedence == 'string'
        ) {
          e = ma(l.href);
          var s = Dn(i).hoistableStyles,
            f = s.get(e);
          if (
            (f ||
              ((i = i.ownerDocument || i),
              (f = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              s.set(e, f),
              (s = i.querySelector(di(e))) && !s._p && ((f.instance = s), (f.state.loading = 5)),
              Vt.has(e) ||
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
                Vt.set(e, l),
                s || Y0(i, e, l, f.state))),
            t && n === null)
          )
            throw Error(c(528, ''));
          return f;
        }
        if (t && n !== null) throw Error(c(529, ''));
        return null;
      case 'script':
        return (
          (t = l.async),
          (l = l.src),
          typeof l == 'string' && t && typeof t != 'function' && typeof t != 'symbol'
            ? ((t = ha(l)),
              (l = Dn(i).hoistableScripts),
              (n = l.get(t)),
              n || ((n = { type: 'script', instance: null, count: 0, state: null }), l.set(t, n)),
              n)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(c(444, e));
    }
  }
  function ma(e) {
    return 'href="' + Ut(e) + '"';
  }
  function di(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function xh(e) {
    return S({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function Y0(e, t, l, n) {
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
        ft(t, 'link', l),
        it(t),
        e.head.appendChild(t));
  }
  function ha(e) {
    return '[src="' + Ut(e) + '"]';
  }
  function mi(e) {
    return 'script[async]' + e;
  }
  function Eh(e, t, l) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var n = e.querySelector('style[data-href~="' + Ut(l.href) + '"]');
          if (n) return ((t.instance = n), it(n), n);
          var i = S({}, l, {
            'data-href': l.href,
            'data-precedence': l.precedence,
            href: null,
            precedence: null,
          });
          return (
            (n = (e.ownerDocument || e).createElement('style')),
            it(n),
            ft(n, 'style', i),
            qu(n, l.precedence, e),
            (t.instance = n)
          );
        case 'stylesheet':
          i = ma(l.href);
          var s = e.querySelector(di(i));
          if (s) return ((t.state.loading |= 4), (t.instance = s), it(s), s);
          ((n = xh(l)),
            (i = Vt.get(i)) && Co(n, i),
            (s = (e.ownerDocument || e).createElement('link')),
            it(s));
          var f = s;
          return (
            (f._p = new Promise(function (h, E) {
              ((f.onload = h), (f.onerror = E));
            })),
            ft(s, 'link', n),
            (t.state.loading |= 4),
            qu(s, l.precedence, e),
            (t.instance = s)
          );
        case 'script':
          return (
            (s = ha(l.src)),
            (i = e.querySelector(mi(s)))
              ? ((t.instance = i), it(i), i)
              : ((n = l),
                (i = Vt.get(s)) && ((n = S({}, l)), Mo(n, i)),
                (e = e.ownerDocument || e),
                (i = e.createElement('script')),
                it(i),
                ft(i, 'link', n),
                e.head.appendChild(i),
                (t.instance = i))
          );
        case 'void':
          return null;
        default:
          throw Error(c(443, t.type));
      }
    else
      t.type === 'stylesheet' &&
        (t.state.loading & 4) === 0 &&
        ((n = t.instance), (t.state.loading |= 4), qu(n, l.precedence, e));
    return t.instance;
  }
  function qu(e, t, l) {
    for (
      var n = l.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        i = n.length ? n[n.length - 1] : null,
        s = i,
        f = 0;
      f < n.length;
      f++
    ) {
      var h = n[f];
      if (h.dataset.precedence === t) s = h;
      else if (s !== i) break;
    }
    s
      ? s.parentNode.insertBefore(e, s.nextSibling)
      : ((t = l.nodeType === 9 ? l.head : l), t.insertBefore(e, t.firstChild));
  }
  function Co(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function Mo(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var Gu = null;
  function Th(e, t, l) {
    if (Gu === null) {
      var n = new Map(),
        i = (Gu = new Map());
      i.set(l, n);
    } else ((i = Gu), (n = i.get(l)), n || ((n = new Map()), i.set(l, n)));
    if (n.has(e)) return n;
    for (n.set(e, null), l = l.getElementsByTagName(e), i = 0; i < l.length; i++) {
      var s = l[i];
      if (
        !(s[Ma] || s[st] || (e === 'link' && s.getAttribute('rel') === 'stylesheet')) &&
        s.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var f = s.getAttribute(t) || '';
        f = e + f;
        var h = n.get(f);
        h ? h.push(s) : n.set(f, [s]);
      }
    }
    return n;
  }
  function Nh(e, t, l) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(l, t === 'title' ? e.querySelector('head > title') : null));
  }
  function X0(e, t, l) {
    if (l === 1 || t.itemProp != null) return !1;
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
  function kh(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  function $0(e, t, l, n) {
    if (
      l.type === 'stylesheet' &&
      (typeof n.media != 'string' || matchMedia(n.media).matches !== !1) &&
      (l.state.loading & 4) === 0
    ) {
      if (l.instance === null) {
        var i = ma(n.href),
          s = t.querySelector(di(i));
        if (s) {
          ((t = s._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = Yu.bind(e)), t.then(e, e)),
            (l.state.loading |= 4),
            (l.instance = s),
            it(s));
          return;
        }
        ((s = t.ownerDocument || t),
          (n = xh(n)),
          (i = Vt.get(i)) && Co(n, i),
          (s = s.createElement('link')),
          it(s));
        var f = s;
        ((f._p = new Promise(function (h, E) {
          ((f.onload = h), (f.onerror = E));
        })),
          ft(s, 'link', n),
          (l.instance = s));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(l, t),
        (t = l.state.preload) &&
          (l.state.loading & 3) === 0 &&
          (e.count++,
          (l = Yu.bind(e)),
          t.addEventListener('load', l),
          t.addEventListener('error', l)));
    }
  }
  var Ro = 0;
  function V0(e, t) {
    return (
      e.stylesheets && e.count === 0 && $u(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (l) {
            var n = setTimeout(function () {
              if ((e.stylesheets && $u(e, e.stylesheets), e.unsuspend)) {
                var s = e.unsuspend;
                ((e.unsuspend = null), s());
              }
            }, 6e4 + t);
            0 < e.imgBytes && Ro === 0 && (Ro = 62500 * N0());
            var i = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 && (e.stylesheets && $u(e, e.stylesheets), e.unsuspend))
                ) {
                  var s = e.unsuspend;
                  ((e.unsuspend = null), s());
                }
              },
              (e.imgBytes > Ro ? 50 : 800) + t
            );
            return (
              (e.unsuspend = l),
              function () {
                ((e.unsuspend = null), clearTimeout(n), clearTimeout(i));
              }
            );
          }
        : null
    );
  }
  function Yu() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) $u(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var Xu = null;
  function $u(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++, (Xu = new Map()), t.forEach(Q0, e), (Xu = null), Yu.call(e)));
  }
  function Q0(e, t) {
    if (!(t.state.loading & 4)) {
      var l = Xu.get(e);
      if (l) var n = l.get(null);
      else {
        ((l = new Map()), Xu.set(e, l));
        for (
          var i = e.querySelectorAll('link[data-precedence],style[data-precedence]'), s = 0;
          s < i.length;
          s++
        ) {
          var f = i[s];
          (f.nodeName === 'LINK' || f.getAttribute('media') !== 'not all') &&
            (l.set(f.dataset.precedence, f), (n = f));
        }
        n && l.set(null, n);
      }
      ((i = t.instance),
        (f = i.getAttribute('data-precedence')),
        (s = l.get(f) || n),
        s === n && l.set(null, i),
        l.set(f, i),
        this.count++,
        (n = Yu.bind(this)),
        i.addEventListener('load', n),
        i.addEventListener('error', n),
        s
          ? s.parentNode.insertBefore(i, s.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(i, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var hi = {
    $$typeof: $,
    Provider: null,
    Consumer: null,
    _currentValue: te,
    _currentValue2: te,
    _threadCount: 0,
  };
  function K0(e, t, l, n, i, s, f, h, E) {
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
      (this.expirationTimes = Ts(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Ts(0)),
      (this.hiddenUpdates = Ts(null)),
      (this.identifierPrefix = n),
      (this.onUncaughtError = i),
      (this.onCaughtError = s),
      (this.onRecoverableError = f),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = E),
      (this.incompleteTransitions = new Map()));
  }
  function Ah(e, t, l, n, i, s, f, h, E, z, H, X) {
    return (
      (e = new K0(e, t, l, f, E, z, H, X, h)),
      (t = 1),
      s === !0 && (t |= 24),
      (s = Ct(3, null, null, t)),
      (e.current = s),
      (s.stateNode = e),
      (t = cc()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (s.memoizedState = { element: n, isDehydrated: l, cache: t }),
      dc(s),
      e
    );
  }
  function Ch(e) {
    return e ? ((e = Vn), e) : Vn;
  }
  function Mh(e, t, l, n, i, s) {
    ((i = Ch(i)),
      n.context === null ? (n.context = i) : (n.pendingContext = i),
      (n = Gl(t)),
      (n.payload = { element: l }),
      (s = s === void 0 ? null : s),
      s !== null && (n.callback = s),
      (l = Yl(e, n, t)),
      l !== null && (Et(l, e, t), Qa(l, e, t)));
  }
  function Rh(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function jo(e, t) {
    (Rh(e, t), (e = e.alternate) && Rh(e, t));
  }
  function jh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = hn(e, 67108864);
      (t !== null && Et(t, e, 67108864), jo(e, 67108864));
    }
  }
  function Oh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = zt();
      t = Ns(t);
      var l = hn(e, t);
      (l !== null && Et(l, e, t), jo(e, t));
    }
  }
  var Vu = !0;
  function Z0(e, t, l, n) {
    var i = U.T;
    U.T = null;
    var s = J.p;
    try {
      ((J.p = 2), Oo(e, t, l, n));
    } finally {
      ((J.p = s), (U.T = i));
    }
  }
  function I0(e, t, l, n) {
    var i = U.T;
    U.T = null;
    var s = J.p;
    try {
      ((J.p = 8), Oo(e, t, l, n));
    } finally {
      ((J.p = s), (U.T = i));
    }
  }
  function Oo(e, t, l, n) {
    if (Vu) {
      var i = zo(n);
      if (i === null) (_o(e, t, n, Qu, l), wh(e, n));
      else if (W0(i, e, t, l, n)) n.stopPropagation();
      else if ((wh(e, n), t & 4 && -1 < J0.indexOf(e))) {
        for (; i !== null; ) {
          var s = wn(i);
          if (s !== null)
            switch (s.tag) {
              case 3:
                if (((s = s.stateNode), s.current.memoizedState.isDehydrated)) {
                  var f = on(s.pendingLanes);
                  if (f !== 0) {
                    var h = s;
                    for (h.pendingLanes |= 2, h.entangledLanes |= 2; f; ) {
                      var E = 1 << (31 - kt(f));
                      ((h.entanglements[1] |= E), (f &= ~E));
                    }
                    (al(s), (Oe & 6) === 0 && ((Cu = Tt() + 500), ci(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((h = hn(s, 2)), h !== null && Et(h, s, 2), Ru(), jo(s, 2));
            }
          if (((s = zo(n)), s === null && _o(e, t, n, Qu, l), s === i)) break;
          i = s;
        }
        i !== null && n.stopPropagation();
      } else _o(e, t, n, null, l);
    }
  }
  function zo(e) {
    return ((e = ws(e)), wo(e));
  }
  var Qu = null;
  function wo(e) {
    if (((Qu = null), (e = zn(e)), e !== null)) {
      var t = d(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (((e = m(t)), e !== null)) return e;
          e = null;
        } else if (l === 31) {
          if (((e = v(t)), e !== null)) return e;
          e = null;
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ((Qu = e), null);
  }
  function zh(e) {
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
        switch (Dy()) {
          case qr:
            return 2;
          case Gr:
            return 8;
          case Di:
          case By:
            return 32;
          case Yr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Do = !1,
    Pl = null,
    en = null,
    tn = null,
    pi = new Map(),
    yi = new Map(),
    ln = [],
    J0 =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function wh(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        Pl = null;
        break;
      case 'dragenter':
      case 'dragleave':
        en = null;
        break;
      case 'mouseover':
      case 'mouseout':
        tn = null;
        break;
      case 'pointerover':
      case 'pointerout':
        pi.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        yi.delete(t.pointerId);
    }
  }
  function gi(e, t, l, n, i, s) {
    return e === null || e.nativeEvent !== s
      ? ((e = {
          blockedOn: t,
          domEventName: l,
          eventSystemFlags: n,
          nativeEvent: s,
          targetContainers: [i],
        }),
        t !== null && ((t = wn(t)), t !== null && jh(t)),
        e)
      : ((e.eventSystemFlags |= n),
        (t = e.targetContainers),
        i !== null && t.indexOf(i) === -1 && t.push(i),
        e);
  }
  function W0(e, t, l, n, i) {
    switch (t) {
      case 'focusin':
        return ((Pl = gi(Pl, e, t, l, n, i)), !0);
      case 'dragenter':
        return ((en = gi(en, e, t, l, n, i)), !0);
      case 'mouseover':
        return ((tn = gi(tn, e, t, l, n, i)), !0);
      case 'pointerover':
        var s = i.pointerId;
        return (pi.set(s, gi(pi.get(s) || null, e, t, l, n, i)), !0);
      case 'gotpointercapture':
        return ((s = i.pointerId), yi.set(s, gi(yi.get(s) || null, e, t, l, n, i)), !0);
    }
    return !1;
  }
  function Dh(e) {
    var t = zn(e.target);
    if (t !== null) {
      var l = d(t);
      if (l !== null) {
        if (((t = l.tag), t === 13)) {
          if (((t = m(l)), t !== null)) {
            ((e.blockedOn = t),
              Zr(e.priority, function () {
                Oh(l);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = v(l)), t !== null)) {
            ((e.blockedOn = t),
              Zr(e.priority, function () {
                Oh(l);
              }));
            return;
          }
        } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Ku(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = zo(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var n = new l.constructor(l.type, l);
        ((zs = n), l.target.dispatchEvent(n), (zs = null));
      } else return ((t = wn(l)), t !== null && jh(t), (e.blockedOn = l), !1);
      t.shift();
    }
    return !0;
  }
  function Bh(e, t, l) {
    Ku(e) && l.delete(t);
  }
  function F0() {
    ((Do = !1),
      Pl !== null && Ku(Pl) && (Pl = null),
      en !== null && Ku(en) && (en = null),
      tn !== null && Ku(tn) && (tn = null),
      pi.forEach(Bh),
      yi.forEach(Bh));
  }
  function Zu(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Do || ((Do = !0), a.unstable_scheduleCallback(a.unstable_NormalPriority, F0)));
  }
  var Iu = null;
  function Uh(e) {
    Iu !== e &&
      ((Iu = e),
      a.unstable_scheduleCallback(a.unstable_NormalPriority, function () {
        Iu === e && (Iu = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t],
            n = e[t + 1],
            i = e[t + 2];
          if (typeof n != 'function') {
            if (wo(n || l) === null) continue;
            break;
          }
          var s = wn(l);
          s !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Oc(s, { pending: !0, data: i, method: l.method, action: n }, n, i));
        }
      }));
  }
  function pa(e) {
    function t(E) {
      return Zu(E, e);
    }
    (Pl !== null && Zu(Pl, e),
      en !== null && Zu(en, e),
      tn !== null && Zu(tn, e),
      pi.forEach(t),
      yi.forEach(t));
    for (var l = 0; l < ln.length; l++) {
      var n = ln[l];
      n.blockedOn === e && (n.blockedOn = null);
    }
    for (; 0 < ln.length && ((l = ln[0]), l.blockedOn === null); )
      (Dh(l), l.blockedOn === null && ln.shift());
    if (((l = (e.ownerDocument || e).$$reactFormReplay), l != null))
      for (n = 0; n < l.length; n += 3) {
        var i = l[n],
          s = l[n + 1],
          f = i[gt] || null;
        if (typeof s == 'function') f || Uh(l);
        else if (f) {
          var h = null;
          if (s && s.hasAttribute('formAction')) {
            if (((i = s), (f = s[gt] || null))) h = f.formAction;
            else if (wo(i) !== null) continue;
          } else h = f.action;
          (typeof h == 'function' ? (l[n + 1] = h) : (l.splice(n, 3), (n -= 3)), Uh(l));
        }
      }
  }
  function Lh() {
    function e(s) {
      s.canIntercept &&
        s.info === 'react-transition' &&
        s.intercept({
          handler: function () {
            return new Promise(function (f) {
              return (i = f);
            });
          },
          focusReset: 'manual',
          scroll: 'manual',
        });
    }
    function t() {
      (i !== null && (i(), (i = null)), n || setTimeout(l, 20));
    }
    function l() {
      if (!n && !navigation.transition) {
        var s = navigation.currentEntry;
        s &&
          s.url != null &&
          navigation.navigate(s.url, {
            state: s.getState(),
            info: 'react-transition',
            history: 'replace',
          });
      }
    }
    if (typeof navigation == 'object') {
      var n = !1,
        i = null;
      return (
        navigation.addEventListener('navigate', e),
        navigation.addEventListener('navigatesuccess', t),
        navigation.addEventListener('navigateerror', t),
        setTimeout(l, 100),
        function () {
          ((n = !0),
            navigation.removeEventListener('navigate', e),
            navigation.removeEventListener('navigatesuccess', t),
            navigation.removeEventListener('navigateerror', t),
            i !== null && (i(), (i = null)));
        }
      );
    }
  }
  function Bo(e) {
    this._internalRoot = e;
  }
  ((Ju.prototype.render = Bo.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(c(409));
      var l = t.current,
        n = zt();
      Mh(l, n, e, t, null, null);
    }),
    (Ju.prototype.unmount = Bo.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (Mh(e.current, 2, null, e, null, null), Ru(), (t[On] = null));
        }
      }));
  function Ju(e) {
    this._internalRoot = e;
  }
  Ju.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Kr();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < ln.length && t !== 0 && t < ln[l].priority; l++);
      (ln.splice(l, 0, e), l === 0 && Dh(e));
    }
  };
  var Hh = u.version;
  if (Hh !== '19.2.5') throw Error(c(527, Hh, '19.2.5'));
  J.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(c(188))
        : ((e = Object.keys(e).join(',')), Error(c(268, e)));
    return ((e = g(t)), (e = e !== null ? y(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var P0 = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: U,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Wu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Wu.isDisabled && Wu.supportsFiber)
      try {
        ((ka = Wu.inject(P0)), (Nt = Wu));
      } catch {}
  }
  return (
    (vi.createRoot = function (e, t) {
      if (!r(e)) throw Error(c(299));
      var l = !1,
        n = '',
        i = Qd,
        s = Kd,
        f = Zd;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (l = !0),
          t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (i = t.onUncaughtError),
          t.onCaughtError !== void 0 && (s = t.onCaughtError),
          t.onRecoverableError !== void 0 && (f = t.onRecoverableError)),
        (t = Ah(e, 1, !1, null, null, l, n, null, i, s, f, Lh)),
        (e[On] = t.current),
        go(e),
        new Bo(t)
      );
    }),
    (vi.hydrateRoot = function (e, t, l) {
      if (!r(e)) throw Error(c(299));
      var n = !1,
        i = '',
        s = Qd,
        f = Kd,
        h = Zd,
        E = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (n = !0),
          l.identifierPrefix !== void 0 && (i = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (s = l.onUncaughtError),
          l.onCaughtError !== void 0 && (f = l.onCaughtError),
          l.onRecoverableError !== void 0 && (h = l.onRecoverableError),
          l.formState !== void 0 && (E = l.formState)),
        (t = Ah(e, 1, !0, t, l ?? null, n, i, E, s, f, h, Lh)),
        (t.context = Ch(null)),
        (l = t.current),
        (n = zt()),
        (n = Ns(n)),
        (i = Gl(n)),
        (i.callback = null),
        Yl(l, i, n),
        (l = n),
        (t.current.lanes = l),
        Ca(t, l),
        al(t),
        (e[On] = t.current),
        go(e),
        new Ju(t)
      );
    }),
    (vi.version = '19.2.5'),
    vi
  );
}
var Ih;
function f_() {
  if (Ih) return Ho.exports;
  Ih = 1;
  function a() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (u) {
        console.error(u);
      }
  }
  return (a(), (Ho.exports = r_()), Ho.exports);
}
var d_ = f_(),
  N = yr();
/**
 * react-router v7.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var Jh = 'popstate';
function Wh(a) {
  return (
    typeof a == 'object' &&
    a != null &&
    'pathname' in a &&
    'search' in a &&
    'hash' in a &&
    'state' in a &&
    'key' in a
  );
}
function m_(a = {}) {
  function u(c, r) {
    var g;
    let d = (g = r.state) == null ? void 0 : g.masked,
      { pathname: m, search: v, hash: _ } = d || c.location;
    return nr(
      '',
      { pathname: m, search: v, hash: _ },
      (r.state && r.state.usr) || null,
      (r.state && r.state.key) || 'default',
      d
        ? { pathname: c.location.pathname, search: c.location.search, hash: c.location.hash }
        : void 0
    );
  }
  function o(c, r) {
    return typeof r == 'string' ? r : Ci(r);
  }
  return p_(u, o, null, a);
}
function Ve(a, u) {
  if (a === !1 || a === null || typeof a > 'u') throw new Error(u);
}
function Pt(a, u) {
  if (!a) {
    typeof console < 'u' && console.warn(u);
    try {
      throw new Error(u);
    } catch {}
  }
}
function h_() {
  return Math.random().toString(36).substring(2, 10);
}
function Fh(a, u) {
  return {
    usr: a.state,
    key: a.key,
    idx: u,
    masked: a.unstable_mask ? { pathname: a.pathname, search: a.search, hash: a.hash } : void 0,
  };
}
function nr(a, u, o = null, c, r) {
  return {
    pathname: typeof a == 'string' ? a : a.pathname,
    search: '',
    hash: '',
    ...(typeof u == 'string' ? Sa(u) : u),
    state: o,
    key: (u && u.key) || c || h_(),
    unstable_mask: r,
  };
}
function Ci({ pathname: a = '/', search: u = '', hash: o = '' }) {
  return (
    u && u !== '?' && (a += u.charAt(0) === '?' ? u : '?' + u),
    o && o !== '#' && (a += o.charAt(0) === '#' ? o : '#' + o),
    a
  );
}
function Sa(a) {
  let u = {};
  if (a) {
    let o = a.indexOf('#');
    o >= 0 && ((u.hash = a.substring(o)), (a = a.substring(0, o)));
    let c = a.indexOf('?');
    (c >= 0 && ((u.search = a.substring(c)), (a = a.substring(0, c))), a && (u.pathname = a));
  }
  return u;
}
function p_(a, u, o, c = {}) {
  let { window: r = document.defaultView, v5Compat: d = !1 } = c,
    m = r.history,
    v = 'POP',
    _ = null,
    g = y();
  g == null && ((g = 0), m.replaceState({ ...m.state, idx: g }, ''));
  function y() {
    return (m.state || { idx: null }).idx;
  }
  function S() {
    v = 'POP';
    let b = y(),
      A = b == null ? null : b - g;
    ((g = b), _ && _({ action: v, location: j.location, delta: A }));
  }
  function C(b, A) {
    v = 'PUSH';
    let w = Wh(b) ? b : nr(j.location, b, A);
    g = y() + 1;
    let $ = Fh(w, g),
      V = j.createHref(w.unstable_mask || w);
    try {
      m.pushState($, '', V);
    } catch (K) {
      if (K instanceof DOMException && K.name === 'DataCloneError') throw K;
      r.location.assign(V);
    }
    d && _ && _({ action: v, location: j.location, delta: 1 });
  }
  function R(b, A) {
    v = 'REPLACE';
    let w = Wh(b) ? b : nr(j.location, b, A);
    g = y();
    let $ = Fh(w, g),
      V = j.createHref(w.unstable_mask || w);
    (m.replaceState($, '', V), d && _ && _({ action: v, location: j.location, delta: 0 }));
  }
  function x(b) {
    return y_(b);
  }
  let j = {
    get action() {
      return v;
    },
    get location() {
      return a(r, m);
    },
    listen(b) {
      if (_) throw new Error('A history only accepts one active listener');
      return (
        r.addEventListener(Jh, S),
        (_ = b),
        () => {
          (r.removeEventListener(Jh, S), (_ = null));
        }
      );
    },
    createHref(b) {
      return u(r, b);
    },
    createURL: x,
    encodeLocation(b) {
      let A = x(b);
      return { pathname: A.pathname, search: A.search, hash: A.hash };
    },
    push: C,
    replace: R,
    go(b) {
      return m.go(b);
    },
  };
  return j;
}
function y_(a, u = !1) {
  let o = 'http://localhost';
  (typeof window < 'u' &&
    (o = window.location.origin !== 'null' ? window.location.origin : window.location.href),
    Ve(o, 'No window.location.(origin|href) available to create URL'));
  let c = typeof a == 'string' ? a : Ci(a);
  return ((c = c.replace(/ $/, '%20')), !u && c.startsWith('//') && (c = o + c), new URL(c, o));
}
function Tp(a, u, o = '/') {
  return g_(a, u, o, !1);
}
function g_(a, u, o, c) {
  let r = typeof u == 'string' ? Sa(u) : u,
    d = Rl(r.pathname || '/', o);
  if (d == null) return null;
  let m = Np(a);
  __(m);
  let v = null;
  for (let _ = 0; v == null && _ < m.length; ++_) {
    let g = M_(d);
    v = A_(m[_], g, c);
  }
  return v;
}
function Np(a, u = [], o = [], c = '', r = !1) {
  let d = (m, v, _ = r, g) => {
    let y = {
      relativePath: g === void 0 ? m.path || '' : g,
      caseSensitive: m.caseSensitive === !0,
      childrenIndex: v,
      route: m,
    };
    if (y.relativePath.startsWith('/')) {
      if (!y.relativePath.startsWith(c) && _) return;
      (Ve(
        y.relativePath.startsWith(c),
        `Absolute route path "${y.relativePath}" nested under path "${c}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (y.relativePath = y.relativePath.slice(c.length)));
    }
    let S = Ft([c, y.relativePath]),
      C = o.concat(y);
    (m.children &&
      m.children.length > 0 &&
      (Ve(
        m.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${S}".`
      ),
      Np(m.children, u, C, S, _)),
      !(m.path == null && !m.index) && u.push({ path: S, score: N_(S, m.index), routesMeta: C }));
  };
  return (
    a.forEach((m, v) => {
      var _;
      if (m.path === '' || !((_ = m.path) != null && _.includes('?'))) d(m, v);
      else for (let g of kp(m.path)) d(m, v, !0, g);
    }),
    u
  );
}
function kp(a) {
  let u = a.split('/');
  if (u.length === 0) return [];
  let [o, ...c] = u,
    r = o.endsWith('?'),
    d = o.replace(/\?$/, '');
  if (c.length === 0) return r ? [d, ''] : [d];
  let m = kp(c.join('/')),
    v = [];
  return (
    v.push(...m.map((_) => (_ === '' ? d : [d, _].join('/')))),
    r && v.push(...m),
    v.map((_) => (a.startsWith('/') && _ === '' ? '/' : _))
  );
}
function __(a) {
  a.sort((u, o) =>
    u.score !== o.score
      ? o.score - u.score
      : k_(
          u.routesMeta.map((c) => c.childrenIndex),
          o.routesMeta.map((c) => c.childrenIndex)
        )
  );
}
var v_ = /^:[\w-]+$/,
  b_ = 3,
  S_ = 2,
  x_ = 1,
  E_ = 10,
  T_ = -2,
  Ph = (a) => a === '*';
function N_(a, u) {
  let o = a.split('/'),
    c = o.length;
  return (
    o.some(Ph) && (c += T_),
    u && (c += S_),
    o.filter((r) => !Ph(r)).reduce((r, d) => r + (v_.test(d) ? b_ : d === '' ? x_ : E_), c)
  );
}
function k_(a, u) {
  return a.length === u.length && a.slice(0, -1).every((c, r) => c === u[r])
    ? a[a.length - 1] - u[u.length - 1]
    : 0;
}
function A_(a, u, o = !1) {
  let { routesMeta: c } = a,
    r = {},
    d = '/',
    m = [];
  for (let v = 0; v < c.length; ++v) {
    let _ = c[v],
      g = v === c.length - 1,
      y = d === '/' ? u : u.slice(d.length) || '/',
      S = is({ path: _.relativePath, caseSensitive: _.caseSensitive, end: g }, y),
      C = _.route;
    if (
      (!S &&
        g &&
        o &&
        !c[c.length - 1].route.index &&
        (S = is({ path: _.relativePath, caseSensitive: _.caseSensitive, end: !1 }, y)),
      !S)
    )
      return null;
    (Object.assign(r, S.params),
      m.push({
        params: r,
        pathname: Ft([d, S.pathname]),
        pathnameBase: z_(Ft([d, S.pathnameBase])),
        route: C,
      }),
      S.pathnameBase !== '/' && (d = Ft([d, S.pathnameBase])));
  }
  return m;
}
function is(a, u) {
  typeof a == 'string' && (a = { path: a, caseSensitive: !1, end: !0 });
  let [o, c] = C_(a.path, a.caseSensitive, a.end),
    r = u.match(o);
  if (!r) return null;
  let d = r[0],
    m = d.replace(/(.)\/+$/, '$1'),
    v = r.slice(1);
  return {
    params: c.reduce((g, { paramName: y, isOptional: S }, C) => {
      if (y === '*') {
        let x = v[C] || '';
        m = d.slice(0, d.length - x.length).replace(/(.)\/+$/, '$1');
      }
      const R = v[C];
      return (S && !R ? (g[y] = void 0) : (g[y] = (R || '').replace(/%2F/g, '/')), g);
    }, {}),
    pathname: d,
    pathnameBase: m,
    pattern: a,
  };
}
function C_(a, u = !1, o = !0) {
  Pt(
    a === '*' || !a.endsWith('*') || a.endsWith('/*'),
    `Route path "${a}" will be treated as if it were "${a.replace(/\*$/, '/*')}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${a.replace(/\*$/, '/*')}".`
  );
  let c = [],
    r =
      '^' +
      a
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(/\/:([\w-]+)(\?)?/g, (m, v, _, g, y) => {
          if ((c.push({ paramName: v, isOptional: _ != null }), _)) {
            let S = y.charAt(g + m.length);
            return S && S !== '/' ? '/([^\\/]*)' : '(?:/([^\\/]*))?';
          }
          return '/([^\\/]+)';
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, '(/$1)?$2');
  return (
    a.endsWith('*')
      ? (c.push({ paramName: '*' }), (r += a === '*' || a === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : o
        ? (r += '\\/*$')
        : a !== '' && a !== '/' && (r += '(?:(?=\\/|$))'),
    [new RegExp(r, u ? void 0 : 'i'), c]
  );
}
function M_(a) {
  try {
    return a
      .split('/')
      .map((u) => decodeURIComponent(u).replace(/\//g, '%2F'))
      .join('/');
  } catch (u) {
    return (
      Pt(
        !1,
        `The URL path "${a}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${u}).`
      ),
      a
    );
  }
}
function Rl(a, u) {
  if (u === '/') return a;
  if (!a.toLowerCase().startsWith(u.toLowerCase())) return null;
  let o = u.endsWith('/') ? u.length - 1 : u.length,
    c = a.charAt(o);
  return c && c !== '/' ? null : a.slice(o) || '/';
}
var R_ = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function j_(a, u = '/') {
  let { pathname: o, search: c = '', hash: r = '' } = typeof a == 'string' ? Sa(a) : a,
    d;
  return (
    o ? ((o = Ap(o)), o.startsWith('/') ? (d = ep(o.substring(1), '/')) : (d = ep(o, u))) : (d = u),
    { pathname: d, search: w_(c), hash: D_(r) }
  );
}
function ep(a, u) {
  let o = us(u).split('/');
  return (
    a.split('/').forEach((r) => {
      r === '..' ? o.length > 1 && o.pop() : r !== '.' && o.push(r);
    }),
    o.length > 1 ? o.join('/') : '/'
  );
}
function $o(a, u, o, c) {
  return `Cannot include a '${a}' character in a manually specified \`to.${u}\` field [${JSON.stringify(c)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function O_(a) {
  return a.filter((u, o) => o === 0 || (u.route.path && u.route.path.length > 0));
}
function gr(a) {
  let u = O_(a);
  return u.map((o, c) => (c === u.length - 1 ? o.pathname : o.pathnameBase));
}
function fs(a, u, o, c = !1) {
  let r;
  typeof a == 'string'
    ? (r = Sa(a))
    : ((r = { ...a }),
      Ve(!r.pathname || !r.pathname.includes('?'), $o('?', 'pathname', 'search', r)),
      Ve(!r.pathname || !r.pathname.includes('#'), $o('#', 'pathname', 'hash', r)),
      Ve(!r.search || !r.search.includes('#'), $o('#', 'search', 'hash', r)));
  let d = a === '' || r.pathname === '',
    m = d ? '/' : r.pathname,
    v;
  if (m == null) v = o;
  else {
    let S = u.length - 1;
    if (!c && m.startsWith('..')) {
      let C = m.split('/');
      for (; C[0] === '..'; ) (C.shift(), (S -= 1));
      r.pathname = C.join('/');
    }
    v = S >= 0 ? u[S] : '/';
  }
  let _ = j_(r, v),
    g = m && m !== '/' && m.endsWith('/'),
    y = (d || m === '.') && o.endsWith('/');
  return (!_.pathname.endsWith('/') && (g || y) && (_.pathname += '/'), _);
}
var Ap = (a) => a.replace(/\/\/+/g, '/'),
  Ft = (a) => Ap(a.join('/')),
  us = (a) => a.replace(/\/+$/, ''),
  z_ = (a) => us(a).replace(/^\/*/, '/'),
  w_ = (a) => (!a || a === '?' ? '' : a.startsWith('?') ? a : '?' + a),
  D_ = (a) => (!a || a === '#' ? '' : a.startsWith('#') ? a : '#' + a),
  B_ = class {
    constructor(a, u, o, c = !1) {
      ((this.status = a),
        (this.statusText = u || ''),
        (this.internal = c),
        o instanceof Error ? ((this.data = o.toString()), (this.error = o)) : (this.data = o));
    }
  };
function U_(a) {
  return (
    a != null &&
    typeof a.status == 'number' &&
    typeof a.statusText == 'string' &&
    typeof a.internal == 'boolean' &&
    'data' in a
  );
}
function L_(a) {
  let u = a.map((o) => o.route.path).filter(Boolean);
  return Ft(u) || '/';
}
var Cp =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
function Mp(a, u) {
  let o = a;
  if (typeof o != 'string' || !R_.test(o)) return { absoluteURL: void 0, isExternal: !1, to: o };
  let c = o,
    r = !1;
  if (Cp)
    try {
      let d = new URL(window.location.href),
        m = o.startsWith('//') ? new URL(d.protocol + o) : new URL(o),
        v = Rl(m.pathname, u);
      m.origin === d.origin && v != null ? (o = v + m.search + m.hash) : (r = !0);
    } catch {
      Pt(
        !1,
        `<Link to="${o}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: c, isExternal: r, to: o };
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
var Rp = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(Rp);
var H_ = ['GET', ...Rp];
new Set(H_);
var xa = N.createContext(null);
xa.displayName = 'DataRouter';
var ds = N.createContext(null);
ds.displayName = 'DataRouterState';
var jp = N.createContext(!1);
function q_() {
  return N.useContext(jp);
}
var Op = N.createContext({ isTransitioning: !1 });
Op.displayName = 'ViewTransition';
var G_ = N.createContext(new Map());
G_.displayName = 'Fetchers';
var Y_ = N.createContext(null);
Y_.displayName = 'Await';
var Dt = N.createContext(null);
Dt.displayName = 'Navigation';
var ji = N.createContext(null);
ji.displayName = 'Location';
var el = N.createContext({ outlet: null, matches: [], isDataRoute: !1 });
el.displayName = 'Route';
var _r = N.createContext(null);
_r.displayName = 'RouteError';
var zp = 'REACT_ROUTER_ERROR',
  X_ = 'REDIRECT',
  $_ = 'ROUTE_ERROR_RESPONSE';
function V_(a) {
  if (a.startsWith(`${zp}:${X_}:{`))
    try {
      let u = JSON.parse(a.slice(28));
      if (
        typeof u == 'object' &&
        u &&
        typeof u.status == 'number' &&
        typeof u.statusText == 'string' &&
        typeof u.location == 'string' &&
        typeof u.reloadDocument == 'boolean' &&
        typeof u.replace == 'boolean'
      )
        return u;
    } catch {}
}
function Q_(a) {
  if (a.startsWith(`${zp}:${$_}:{`))
    try {
      let u = JSON.parse(a.slice(40));
      if (
        typeof u == 'object' &&
        u &&
        typeof u.status == 'number' &&
        typeof u.statusText == 'string'
      )
        return new B_(u.status, u.statusText, u.data);
    } catch {}
}
function K_(a, { relative: u } = {}) {
  Ve(Ea(), 'useHref() may be used only in the context of a <Router> component.');
  let { basename: o, navigator: c } = N.useContext(Dt),
    { hash: r, pathname: d, search: m } = Oi(a, { relative: u }),
    v = d;
  return (
    o !== '/' && (v = d === '/' ? o : Ft([o, d])),
    c.createHref({ pathname: v, search: m, hash: r })
  );
}
function Ea() {
  return N.useContext(ji) != null;
}
function sl() {
  return (
    Ve(Ea(), 'useLocation() may be used only in the context of a <Router> component.'),
    N.useContext(ji).location
  );
}
var wp =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function Dp(a) {
  N.useContext(Dt).static || N.useLayoutEffect(a);
}
function Ol() {
  let { isDataRoute: a } = N.useContext(el);
  return a ? sv() : Z_();
}
function Z_() {
  Ve(Ea(), 'useNavigate() may be used only in the context of a <Router> component.');
  let a = N.useContext(xa),
    { basename: u, navigator: o } = N.useContext(Dt),
    { matches: c } = N.useContext(el),
    { pathname: r } = sl(),
    d = JSON.stringify(gr(c)),
    m = N.useRef(!1);
  return (
    Dp(() => {
      m.current = !0;
    }),
    N.useCallback(
      (_, g = {}) => {
        if ((Pt(m.current, wp), !m.current)) return;
        if (typeof _ == 'number') {
          o.go(_);
          return;
        }
        let y = fs(_, JSON.parse(d), r, g.relative === 'path');
        (a == null && u !== '/' && (y.pathname = y.pathname === '/' ? u : Ft([u, y.pathname])),
          (g.replace ? o.replace : o.push)(y, g.state, g));
      },
      [u, o, d, r, a]
    )
  );
}
N.createContext(null);
function I_() {
  let { matches: a } = N.useContext(el),
    u = a[a.length - 1];
  return (u == null ? void 0 : u.params) ?? {};
}
function Oi(a, { relative: u } = {}) {
  let { matches: o } = N.useContext(el),
    { pathname: c } = sl(),
    r = JSON.stringify(gr(o));
  return N.useMemo(() => fs(a, JSON.parse(r), c, u === 'path'), [a, r, c, u]);
}
function J_(a, u) {
  return Bp(a, u);
}
function Bp(a, u, o) {
  var b;
  Ve(Ea(), 'useRoutes() may be used only in the context of a <Router> component.');
  let { navigator: c } = N.useContext(Dt),
    { matches: r } = N.useContext(el),
    d = r[r.length - 1],
    m = d ? d.params : {},
    v = d ? d.pathname : '/',
    _ = d ? d.pathnameBase : '/',
    g = d && d.route;
  {
    let A = (g && g.path) || '';
    Lp(
      v,
      !g || A.endsWith('*') || A.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${v}" (under <Route path="${A}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${A}"> to <Route path="${A === '/' ? '*' : `${A}/*`}">.`
    );
  }
  let y = sl(),
    S;
  if (u) {
    let A = typeof u == 'string' ? Sa(u) : u;
    (Ve(
      _ === '/' || ((b = A.pathname) == null ? void 0 : b.startsWith(_)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${_}" but pathname "${A.pathname}" was given in the \`location\` prop.`
    ),
      (S = A));
  } else S = y;
  let C = S.pathname || '/',
    R = C;
  if (_ !== '/') {
    let A = _.replace(/^\//, '').split('/');
    R = '/' + C.replace(/^\//, '').split('/').slice(A.length).join('/');
  }
  let x = Tp(a, { pathname: R });
  (Pt(g || x != null, `No routes matched location "${S.pathname}${S.search}${S.hash}" `),
    Pt(
      x == null ||
        x[x.length - 1].route.element !== void 0 ||
        x[x.length - 1].route.Component !== void 0 ||
        x[x.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${S.pathname}${S.search}${S.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let j = tv(
    x &&
      x.map((A) =>
        Object.assign({}, A, {
          params: Object.assign({}, m, A.params),
          pathname: Ft([
            _,
            c.encodeLocation
              ? c.encodeLocation(
                  A.pathname.replace(/%/g, '%25').replace(/\?/g, '%3F').replace(/#/g, '%23')
                ).pathname
              : A.pathname,
          ]),
          pathnameBase:
            A.pathnameBase === '/'
              ? _
              : Ft([
                  _,
                  c.encodeLocation
                    ? c.encodeLocation(
                        A.pathnameBase
                          .replace(/%/g, '%25')
                          .replace(/\?/g, '%3F')
                          .replace(/#/g, '%23')
                      ).pathname
                    : A.pathnameBase,
                ]),
        })
      ),
    r,
    o
  );
  return u && j
    ? N.createElement(
        ji.Provider,
        {
          value: {
            location: {
              pathname: '/',
              search: '',
              hash: '',
              state: null,
              key: 'default',
              unstable_mask: void 0,
              ...S,
            },
            navigationType: 'POP',
          },
        },
        j
      )
    : j;
}
function W_() {
  let a = uv(),
    u = U_(a) ? `${a.status} ${a.statusText}` : a instanceof Error ? a.message : JSON.stringify(a),
    o = a instanceof Error ? a.stack : null,
    c = 'rgba(200,200,200, 0.5)',
    r = { padding: '0.5rem', backgroundColor: c },
    d = { padding: '2px 4px', backgroundColor: c },
    m = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', a),
    (m = N.createElement(
      N.Fragment,
      null,
      N.createElement('p', null, '💿 Hey developer 👋'),
      N.createElement(
        'p',
        null,
        'You can provide a way better UX than this when your app throws errors by providing your own ',
        N.createElement('code', { style: d }, 'ErrorBoundary'),
        ' or',
        ' ',
        N.createElement('code', { style: d }, 'errorElement'),
        ' prop on your route.'
      )
    )),
    N.createElement(
      N.Fragment,
      null,
      N.createElement('h2', null, 'Unexpected Application Error!'),
      N.createElement('h3', { style: { fontStyle: 'italic' } }, u),
      o ? N.createElement('pre', { style: r }, o) : null,
      m
    )
  );
}
var F_ = N.createElement(W_, null),
  Up = class extends N.Component {
    constructor(a) {
      (super(a),
        (this.state = { location: a.location, revalidation: a.revalidation, error: a.error }));
    }
    static getDerivedStateFromError(a) {
      return { error: a };
    }
    static getDerivedStateFromProps(a, u) {
      return u.location !== a.location || (u.revalidation !== 'idle' && a.revalidation === 'idle')
        ? { error: a.error, location: a.location, revalidation: a.revalidation }
        : {
            error: a.error !== void 0 ? a.error : u.error,
            location: u.location,
            revalidation: a.revalidation || u.revalidation,
          };
    }
    componentDidCatch(a, u) {
      this.props.onError
        ? this.props.onError(a, u)
        : console.error('React Router caught the following error during render', a);
    }
    render() {
      let a = this.state.error;
      if (
        this.context &&
        typeof a == 'object' &&
        a &&
        'digest' in a &&
        typeof a.digest == 'string'
      ) {
        const o = Q_(a.digest);
        o && (a = o);
      }
      let u =
        a !== void 0
          ? N.createElement(
              el.Provider,
              { value: this.props.routeContext },
              N.createElement(_r.Provider, { value: a, children: this.props.component })
            )
          : this.props.children;
      return this.context ? N.createElement(P_, { error: a }, u) : u;
    }
  };
Up.contextType = jp;
var Vo = new WeakMap();
function P_({ children: a, error: u }) {
  let { basename: o } = N.useContext(Dt);
  if (typeof u == 'object' && u && 'digest' in u && typeof u.digest == 'string') {
    let c = V_(u.digest);
    if (c) {
      let r = Vo.get(u);
      if (r) throw r;
      let d = Mp(c.location, o);
      if (Cp && !Vo.get(u))
        if (d.isExternal || c.reloadDocument) window.location.href = d.absoluteURL || d.to;
        else {
          const m = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(d.to, { replace: c.replace })
          );
          throw (Vo.set(u, m), m);
        }
      return N.createElement('meta', {
        httpEquiv: 'refresh',
        content: `0;url=${d.absoluteURL || d.to}`,
      });
    }
  }
  return a;
}
function ev({ routeContext: a, match: u, children: o }) {
  let c = N.useContext(xa);
  return (
    c &&
      c.static &&
      c.staticContext &&
      (u.route.errorElement || u.route.ErrorBoundary) &&
      (c.staticContext._deepestRenderedBoundaryId = u.route.id),
    N.createElement(el.Provider, { value: a }, o)
  );
}
function tv(a, u = [], o) {
  let c = o == null ? void 0 : o.state;
  if (a == null) {
    if (!c) return null;
    if (c.errors) a = c.matches;
    else if (u.length === 0 && !c.initialized && c.matches.length > 0) a = c.matches;
    else return null;
  }
  let r = a,
    d = c == null ? void 0 : c.errors;
  if (d != null) {
    let y = r.findIndex((S) => S.route.id && (d == null ? void 0 : d[S.route.id]) !== void 0);
    (Ve(
      y >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(d).join(',')}`
    ),
      (r = r.slice(0, Math.min(r.length, y + 1))));
  }
  let m = !1,
    v = -1;
  if (o && c) {
    m = c.renderFallback;
    for (let y = 0; y < r.length; y++) {
      let S = r[y];
      if (((S.route.HydrateFallback || S.route.hydrateFallbackElement) && (v = y), S.route.id)) {
        let { loaderData: C, errors: R } = c,
          x = S.route.loader && !C.hasOwnProperty(S.route.id) && (!R || R[S.route.id] === void 0);
        if (S.route.lazy || x) {
          (o.isStatic && (m = !0), v >= 0 ? (r = r.slice(0, v + 1)) : (r = [r[0]]));
          break;
        }
      }
    }
  }
  let _ = o == null ? void 0 : o.onError,
    g =
      c && _
        ? (y, S) => {
            var C, R;
            _(y, {
              location: c.location,
              params:
                ((R = (C = c.matches) == null ? void 0 : C[0]) == null ? void 0 : R.params) ?? {},
              unstable_pattern: L_(c.matches),
              errorInfo: S,
            });
          }
        : void 0;
  return r.reduceRight((y, S, C) => {
    let R,
      x = !1,
      j = null,
      b = null;
    c &&
      ((R = d && S.route.id ? d[S.route.id] : void 0),
      (j = S.route.errorElement || F_),
      m &&
        (v < 0 && C === 0
          ? (Lp(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration'
            ),
            (x = !0),
            (b = null))
          : v === C && ((x = !0), (b = S.route.hydrateFallbackElement || null))));
    let A = u.concat(r.slice(0, C + 1)),
      w = () => {
        let $;
        return (
          R
            ? ($ = j)
            : x
              ? ($ = b)
              : S.route.Component
                ? ($ = N.createElement(S.route.Component, null))
                : S.route.element
                  ? ($ = S.route.element)
                  : ($ = y),
          N.createElement(ev, {
            match: S,
            routeContext: { outlet: y, matches: A, isDataRoute: c != null },
            children: $,
          })
        );
      };
    return c && (S.route.ErrorBoundary || S.route.errorElement || C === 0)
      ? N.createElement(Up, {
          location: c.location,
          revalidation: c.revalidation,
          component: j,
          error: R,
          children: w(),
          routeContext: { outlet: null, matches: A, isDataRoute: !0 },
          onError: g,
        })
      : w();
  }, null);
}
function vr(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function lv(a) {
  let u = N.useContext(xa);
  return (Ve(u, vr(a)), u);
}
function nv(a) {
  let u = N.useContext(ds);
  return (Ve(u, vr(a)), u);
}
function av(a) {
  let u = N.useContext(el);
  return (Ve(u, vr(a)), u);
}
function br(a) {
  let u = av(a),
    o = u.matches[u.matches.length - 1];
  return (Ve(o.route.id, `${a} can only be used on routes that contain a unique "id"`), o.route.id);
}
function iv() {
  return br('useRouteId');
}
function uv() {
  var c;
  let a = N.useContext(_r),
    u = nv('useRouteError'),
    o = br('useRouteError');
  return a !== void 0 ? a : (c = u.errors) == null ? void 0 : c[o];
}
function sv() {
  let { router: a } = lv('useNavigate'),
    u = br('useNavigate'),
    o = N.useRef(!1);
  return (
    Dp(() => {
      o.current = !0;
    }),
    N.useCallback(
      async (r, d = {}) => {
        (Pt(o.current, wp),
          o.current &&
            (typeof r == 'number'
              ? await a.navigate(r)
              : await a.navigate(r, { fromRouteId: u, ...d })));
      },
      [a, u]
    )
  );
}
var tp = {};
function Lp(a, u, o) {
  !u && !tp[a] && ((tp[a] = !0), Pt(!1, o));
}
N.memo(cv);
function cv({ routes: a, future: u, state: o, isStatic: c, onError: r }) {
  return Bp(a, void 0, { state: o, isStatic: c, onError: r });
}
function jl({ to: a, replace: u, state: o, relative: c }) {
  Ve(Ea(), '<Navigate> may be used only in the context of a <Router> component.');
  let { static: r } = N.useContext(Dt);
  Pt(
    !r,
    '<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.'
  );
  let { matches: d } = N.useContext(el),
    { pathname: m } = sl(),
    v = Ol(),
    _ = fs(a, gr(d), m, c === 'path'),
    g = JSON.stringify(_);
  return (
    N.useEffect(() => {
      v(JSON.parse(g), { replace: u, state: o, relative: c });
    }, [v, g, c, u, o]),
    null
  );
}
function ul(a) {
  Ve(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  );
}
function ov({
  basename: a = '/',
  children: u = null,
  location: o,
  navigationType: c = 'POP',
  navigator: r,
  static: d = !1,
  unstable_useTransitions: m,
}) {
  Ve(
    !Ea(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  let v = a.replace(/^\/*/, '/'),
    _ = N.useMemo(
      () => ({ basename: v, navigator: r, static: d, unstable_useTransitions: m, future: {} }),
      [v, r, d, m]
    );
  typeof o == 'string' && (o = Sa(o));
  let {
      pathname: g = '/',
      search: y = '',
      hash: S = '',
      state: C = null,
      key: R = 'default',
      unstable_mask: x,
    } = o,
    j = N.useMemo(() => {
      let b = Rl(g, v);
      return b == null
        ? null
        : {
            location: { pathname: b, search: y, hash: S, state: C, key: R, unstable_mask: x },
            navigationType: c,
          };
    }, [v, g, y, S, C, R, c, x]);
  return (
    Pt(
      j != null,
      `<Router basename="${v}"> is not able to match the URL "${g}${y}${S}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    j == null
      ? null
      : N.createElement(
          Dt.Provider,
          { value: _ },
          N.createElement(ji.Provider, { children: u, value: j })
        )
  );
}
function rv({ children: a, location: u }) {
  return J_(ar(a), u);
}
function ar(a, u = []) {
  let o = [];
  return (
    N.Children.forEach(a, (c, r) => {
      if (!N.isValidElement(c)) return;
      let d = [...u, r];
      if (c.type === N.Fragment) {
        o.push.apply(o, ar(c.props.children, d));
        return;
      }
      (Ve(
        c.type === ul,
        `[${typeof c.type == 'string' ? c.type : c.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Ve(!c.props.index || !c.props.children, 'An index route cannot have child routes.'));
      let m = {
        id: c.props.id || d.join('-'),
        caseSensitive: c.props.caseSensitive,
        element: c.props.element,
        Component: c.props.Component,
        index: c.props.index,
        path: c.props.path,
        middleware: c.props.middleware,
        loader: c.props.loader,
        action: c.props.action,
        hydrateFallbackElement: c.props.hydrateFallbackElement,
        HydrateFallback: c.props.HydrateFallback,
        errorElement: c.props.errorElement,
        ErrorBoundary: c.props.ErrorBoundary,
        hasErrorBoundary:
          c.props.hasErrorBoundary === !0 ||
          c.props.ErrorBoundary != null ||
          c.props.errorElement != null,
        shouldRevalidate: c.props.shouldRevalidate,
        handle: c.props.handle,
        lazy: c.props.lazy,
      };
      (c.props.children && (m.children = ar(c.props.children, d)), o.push(m));
    }),
    o
  );
}
var ls = 'get',
  ns = 'application/x-www-form-urlencoded';
function ms(a) {
  return typeof HTMLElement < 'u' && a instanceof HTMLElement;
}
function fv(a) {
  return ms(a) && a.tagName.toLowerCase() === 'button';
}
function dv(a) {
  return ms(a) && a.tagName.toLowerCase() === 'form';
}
function mv(a) {
  return ms(a) && a.tagName.toLowerCase() === 'input';
}
function hv(a) {
  return !!(a.metaKey || a.altKey || a.ctrlKey || a.shiftKey);
}
function pv(a, u) {
  return a.button === 0 && (!u || u === '_self') && !hv(a);
}
var Fu = null;
function yv() {
  if (Fu === null)
    try {
      (new FormData(document.createElement('form'), 0), (Fu = !1));
    } catch {
      Fu = !0;
    }
  return Fu;
}
var gv = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
function Qo(a) {
  return a != null && !gv.has(a)
    ? (Pt(
        !1,
        `"${a}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ns}"`
      ),
      null)
    : a;
}
function _v(a, u) {
  let o, c, r, d, m;
  if (dv(a)) {
    let v = a.getAttribute('action');
    ((c = v ? Rl(v, u) : null),
      (o = a.getAttribute('method') || ls),
      (r = Qo(a.getAttribute('enctype')) || ns),
      (d = new FormData(a)));
  } else if (fv(a) || (mv(a) && (a.type === 'submit' || a.type === 'image'))) {
    let v = a.form;
    if (v == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let _ = a.getAttribute('formaction') || v.getAttribute('action');
    if (
      ((c = _ ? Rl(_, u) : null),
      (o = a.getAttribute('formmethod') || v.getAttribute('method') || ls),
      (r = Qo(a.getAttribute('formenctype')) || Qo(v.getAttribute('enctype')) || ns),
      (d = new FormData(v, a)),
      !yv())
    ) {
      let { name: g, type: y, value: S } = a;
      if (y === 'image') {
        let C = g ? `${g}.` : '';
        (d.append(`${C}x`, '0'), d.append(`${C}y`, '0'));
      } else g && d.append(g, S);
    }
  } else {
    if (ms(a))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((o = ls), (c = null), (r = ns), (m = a));
  }
  return (
    d && r === 'text/plain' && ((m = d), (d = void 0)),
    { action: c, method: o.toLowerCase(), encType: r, formData: d, body: m }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function Sr(a, u) {
  if (a === !1 || a === null || typeof a > 'u') throw new Error(u);
}
function Hp(a, u, o, c) {
  let r =
    typeof a == 'string'
      ? new URL(a, typeof window > 'u' ? 'server://singlefetch/' : window.location.origin)
      : a;
  return (
    o
      ? r.pathname.endsWith('/')
        ? (r.pathname = `${r.pathname}_.${c}`)
        : (r.pathname = `${r.pathname}.${c}`)
      : r.pathname === '/'
        ? (r.pathname = `_root.${c}`)
        : u && Rl(r.pathname, u) === '/'
          ? (r.pathname = `${us(u)}/_root.${c}`)
          : (r.pathname = `${us(r.pathname)}.${c}`),
    r
  );
}
async function vv(a, u) {
  if (a.id in u) return u[a.id];
  try {
    let o = await import(a.module);
    return ((u[a.id] = o), o);
  } catch (o) {
    return (
      console.error(`Error loading route module \`${a.module}\`, reloading page...`),
      console.error(o),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function bv(a) {
  return a == null
    ? !1
    : a.href == null
      ? a.rel === 'preload' && typeof a.imageSrcSet == 'string' && typeof a.imageSizes == 'string'
      : typeof a.rel == 'string' && typeof a.href == 'string';
}
async function Sv(a, u, o) {
  let c = await Promise.all(
    a.map(async (r) => {
      let d = u.routes[r.route.id];
      if (d) {
        let m = await vv(d, o);
        return m.links ? m.links() : [];
      }
      return [];
    })
  );
  return Nv(
    c
      .flat(1)
      .filter(bv)
      .filter((r) => r.rel === 'stylesheet' || r.rel === 'preload')
      .map((r) =>
        r.rel === 'stylesheet' ? { ...r, rel: 'prefetch', as: 'style' } : { ...r, rel: 'prefetch' }
      )
  );
}
function lp(a, u, o, c, r, d) {
  let m = (_, g) => (o[g] ? _.route.id !== o[g].route.id : !0),
    v = (_, g) => {
      var y;
      return (
        o[g].pathname !== _.pathname ||
        (((y = o[g].route.path) == null ? void 0 : y.endsWith('*')) &&
          o[g].params['*'] !== _.params['*'])
      );
    };
  return d === 'assets'
    ? u.filter((_, g) => m(_, g) || v(_, g))
    : d === 'data'
      ? u.filter((_, g) => {
          var S;
          let y = c.routes[_.route.id];
          if (!y || !y.hasLoader) return !1;
          if (m(_, g) || v(_, g)) return !0;
          if (_.route.shouldRevalidate) {
            let C = _.route.shouldRevalidate({
              currentUrl: new URL(r.pathname + r.search + r.hash, window.origin),
              currentParams: ((S = o[0]) == null ? void 0 : S.params) || {},
              nextUrl: new URL(a, window.origin),
              nextParams: _.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof C == 'boolean') return C;
          }
          return !0;
        })
      : [];
}
function xv(a, u, { includeHydrateFallback: o } = {}) {
  return Ev(
    a
      .map((c) => {
        let r = u.routes[c.route.id];
        if (!r) return [];
        let d = [r.module];
        return (
          r.clientActionModule && (d = d.concat(r.clientActionModule)),
          r.clientLoaderModule && (d = d.concat(r.clientLoaderModule)),
          o && r.hydrateFallbackModule && (d = d.concat(r.hydrateFallbackModule)),
          r.imports && (d = d.concat(r.imports)),
          d
        );
      })
      .flat(1)
  );
}
function Ev(a) {
  return [...new Set(a)];
}
function Tv(a) {
  let u = {},
    o = Object.keys(a).sort();
  for (let c of o) u[c] = a[c];
  return u;
}
function Nv(a, u) {
  let o = new Set();
  return (
    new Set(u),
    a.reduce((c, r) => {
      let d = JSON.stringify(Tv(r));
      return (o.has(d) || (o.add(d), c.push({ key: d, link: r })), c);
    }, [])
  );
}
function xr() {
  let a = N.useContext(xa);
  return (Sr(a, 'You must render this element inside a <DataRouterContext.Provider> element'), a);
}
function kv() {
  let a = N.useContext(ds);
  return (
    Sr(a, 'You must render this element inside a <DataRouterStateContext.Provider> element'),
    a
  );
}
var Er = N.createContext(void 0);
Er.displayName = 'FrameworkContext';
function Tr() {
  let a = N.useContext(Er);
  return (Sr(a, 'You must render this element inside a <HydratedRouter> element'), a);
}
function Av(a, u) {
  let o = N.useContext(Er),
    [c, r] = N.useState(!1),
    [d, m] = N.useState(!1),
    { onFocus: v, onBlur: _, onMouseEnter: g, onMouseLeave: y, onTouchStart: S } = u,
    C = N.useRef(null);
  (N.useEffect(() => {
    if ((a === 'render' && m(!0), a === 'viewport')) {
      let j = (A) => {
          A.forEach((w) => {
            m(w.isIntersecting);
          });
        },
        b = new IntersectionObserver(j, { threshold: 0.5 });
      return (
        C.current && b.observe(C.current),
        () => {
          b.disconnect();
        }
      );
    }
  }, [a]),
    N.useEffect(() => {
      if (c) {
        let j = setTimeout(() => {
          m(!0);
        }, 100);
        return () => {
          clearTimeout(j);
        };
      }
    }, [c]));
  let R = () => {
      r(!0);
    },
    x = () => {
      (r(!1), m(!1));
    };
  return o
    ? a !== 'intent'
      ? [d, C, {}]
      : [
          d,
          C,
          {
            onFocus: bi(v, R),
            onBlur: bi(_, x),
            onMouseEnter: bi(g, R),
            onMouseLeave: bi(y, x),
            onTouchStart: bi(S, R),
          },
        ]
    : [!1, C, {}];
}
function bi(a, u) {
  return (o) => {
    (a && a(o), o.defaultPrevented || u(o));
  };
}
function Cv({ page: a, ...u }) {
  let o = q_(),
    { router: c } = xr(),
    r = N.useMemo(() => Tp(c.routes, a, c.basename), [c.routes, a, c.basename]);
  return r
    ? o
      ? N.createElement(Rv, { page: a, matches: r, ...u })
      : N.createElement(jv, { page: a, matches: r, ...u })
    : null;
}
function Mv(a) {
  let { manifest: u, routeModules: o } = Tr(),
    [c, r] = N.useState([]);
  return (
    N.useEffect(() => {
      let d = !1;
      return (
        Sv(a, u, o).then((m) => {
          d || r(m);
        }),
        () => {
          d = !0;
        }
      );
    }, [a, u, o]),
    c
  );
}
function Rv({ page: a, matches: u, ...o }) {
  let c = sl(),
    { future: r } = Tr(),
    { basename: d } = xr(),
    m = N.useMemo(() => {
      if (a === c.pathname + c.search + c.hash) return [];
      let v = Hp(a, d, r.unstable_trailingSlashAwareDataRequests, 'rsc'),
        _ = !1,
        g = [];
      for (let y of u)
        typeof y.route.shouldRevalidate == 'function' ? (_ = !0) : g.push(y.route.id);
      return (
        _ && g.length > 0 && v.searchParams.set('_routes', g.join(',')),
        [v.pathname + v.search]
      );
    }, [d, r.unstable_trailingSlashAwareDataRequests, a, c, u]);
  return N.createElement(
    N.Fragment,
    null,
    m.map((v) => N.createElement('link', { key: v, rel: 'prefetch', as: 'fetch', href: v, ...o }))
  );
}
function jv({ page: a, matches: u, ...o }) {
  let c = sl(),
    { future: r, manifest: d, routeModules: m } = Tr(),
    { basename: v } = xr(),
    { loaderData: _, matches: g } = kv(),
    y = N.useMemo(() => lp(a, u, g, d, c, 'data'), [a, u, g, d, c]),
    S = N.useMemo(() => lp(a, u, g, d, c, 'assets'), [a, u, g, d, c]),
    C = N.useMemo(() => {
      if (a === c.pathname + c.search + c.hash) return [];
      let j = new Set(),
        b = !1;
      if (
        (u.forEach((w) => {
          var V;
          let $ = d.routes[w.route.id];
          !$ ||
            !$.hasLoader ||
            ((!y.some((K) => K.route.id === w.route.id) &&
              w.route.id in _ &&
              (V = m[w.route.id]) != null &&
              V.shouldRevalidate) ||
            $.hasClientLoader
              ? (b = !0)
              : j.add(w.route.id));
        }),
        j.size === 0)
      )
        return [];
      let A = Hp(a, v, r.unstable_trailingSlashAwareDataRequests, 'data');
      return (
        b &&
          j.size > 0 &&
          A.searchParams.set(
            '_routes',
            u
              .filter((w) => j.has(w.route.id))
              .map((w) => w.route.id)
              .join(',')
          ),
        [A.pathname + A.search]
      );
    }, [v, r.unstable_trailingSlashAwareDataRequests, _, c, d, y, u, a, m]),
    R = N.useMemo(() => xv(S, d), [S, d]),
    x = Mv(S);
  return N.createElement(
    N.Fragment,
    null,
    C.map((j) => N.createElement('link', { key: j, rel: 'prefetch', as: 'fetch', href: j, ...o })),
    R.map((j) => N.createElement('link', { key: j, rel: 'modulepreload', href: j, ...o })),
    x.map(({ key: j, link: b }) =>
      N.createElement('link', {
        key: j,
        nonce: o.nonce,
        ...b,
        crossOrigin: b.crossOrigin ?? o.crossOrigin,
      })
    )
  );
}
function Ov(...a) {
  return (u) => {
    a.forEach((o) => {
      typeof o == 'function' ? o(u) : o != null && (o.current = u);
    });
  };
}
var zv =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
try {
  zv && (window.__reactRouterVersion = '7.14.2');
} catch {}
function wv({ basename: a, children: u, unstable_useTransitions: o, window: c }) {
  let r = N.useRef();
  r.current == null && (r.current = m_({ window: c, v5Compat: !0 }));
  let d = r.current,
    [m, v] = N.useState({ action: d.action, location: d.location }),
    _ = N.useCallback(
      (g) => {
        o === !1 ? v(g) : N.startTransition(() => v(g));
      },
      [o]
    );
  return (
    N.useLayoutEffect(() => d.listen(_), [d, _]),
    N.createElement(ov, {
      basename: a,
      children: u,
      location: m.location,
      navigationType: m.action,
      navigator: d,
      unstable_useTransitions: o,
    })
  );
}
var qp = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Gp = N.forwardRef(function (
    {
      onClick: u,
      discover: o = 'render',
      prefetch: c = 'none',
      relative: r,
      reloadDocument: d,
      replace: m,
      unstable_mask: v,
      state: _,
      target: g,
      to: y,
      preventScrollReset: S,
      viewTransition: C,
      unstable_defaultShouldRevalidate: R,
      ...x
    },
    j
  ) {
    let { basename: b, navigator: A, unstable_useTransitions: w } = N.useContext(Dt),
      $ = typeof y == 'string' && qp.test(y),
      V = Mp(y, b);
    y = V.to;
    let K = K_(y, { relative: r }),
      I = sl(),
      Q = null;
    if (v) {
      let he = fs(v, [], I.unstable_mask ? I.unstable_mask.pathname : '/', !0);
      (b !== '/' && (he.pathname = he.pathname === '/' ? b : Ft([b, he.pathname])),
        (Q = A.createHref(he)));
    }
    let [L, Z, ae] = Av(c, x),
      ce = Lv(y, {
        replace: m,
        unstable_mask: v,
        state: _,
        target: g,
        preventScrollReset: S,
        relative: r,
        viewTransition: C,
        unstable_defaultShouldRevalidate: R,
        unstable_useTransitions: w,
      });
    function ue(he) {
      (u && u(he), he.defaultPrevented || ce(he));
    }
    let W = !(V.isExternal || d),
      F = N.createElement('a', {
        ...x,
        ...ae,
        href: (W ? Q : void 0) || V.absoluteURL || K,
        onClick: W ? ue : u,
        ref: Ov(j, Z),
        target: g,
        'data-discover': !$ && o === 'render' ? 'true' : void 0,
      });
    return L && !$ ? N.createElement(N.Fragment, null, F, N.createElement(Cv, { page: K })) : F;
  });
Gp.displayName = 'Link';
var Dv = N.forwardRef(function (
  {
    'aria-current': u = 'page',
    caseSensitive: o = !1,
    className: c = '',
    end: r = !1,
    style: d,
    to: m,
    viewTransition: v,
    children: _,
    ...g
  },
  y
) {
  let S = Oi(m, { relative: g.relative }),
    C = sl(),
    R = N.useContext(ds),
    { navigator: x, basename: j } = N.useContext(Dt),
    b = R != null && Xv(S) && v === !0,
    A = x.encodeLocation ? x.encodeLocation(S).pathname : S.pathname,
    w = C.pathname,
    $ = R && R.navigation && R.navigation.location ? R.navigation.location.pathname : null;
  (o || ((w = w.toLowerCase()), ($ = $ ? $.toLowerCase() : null), (A = A.toLowerCase())),
    $ && j && ($ = Rl($, j) || $));
  const V = A !== '/' && A.endsWith('/') ? A.length - 1 : A.length;
  let K = w === A || (!r && w.startsWith(A) && w.charAt(V) === '/'),
    I = $ != null && ($ === A || (!r && $.startsWith(A) && $.charAt(A.length) === '/')),
    Q = { isActive: K, isPending: I, isTransitioning: b },
    L = K ? u : void 0,
    Z;
  typeof c == 'function'
    ? (Z = c(Q))
    : (Z = [c, K ? 'active' : null, I ? 'pending' : null, b ? 'transitioning' : null]
        .filter(Boolean)
        .join(' '));
  let ae = typeof d == 'function' ? d(Q) : d;
  return N.createElement(
    Gp,
    { ...g, 'aria-current': L, className: Z, ref: y, style: ae, to: m, viewTransition: v },
    typeof _ == 'function' ? _(Q) : _
  );
});
Dv.displayName = 'NavLink';
var Bv = N.forwardRef(
  (
    {
      discover: a = 'render',
      fetcherKey: u,
      navigate: o,
      reloadDocument: c,
      replace: r,
      state: d,
      method: m = ls,
      action: v,
      onSubmit: _,
      relative: g,
      preventScrollReset: y,
      viewTransition: S,
      unstable_defaultShouldRevalidate: C,
      ...R
    },
    x
  ) => {
    let { unstable_useTransitions: j } = N.useContext(Dt),
      b = Gv(),
      A = Yv(v, { relative: g }),
      w = m.toLowerCase() === 'get' ? 'get' : 'post',
      $ = typeof v == 'string' && qp.test(v),
      V = (K) => {
        if ((_ && _(K), K.defaultPrevented)) return;
        K.preventDefault();
        let I = K.nativeEvent.submitter,
          Q = (I == null ? void 0 : I.getAttribute('formmethod')) || m,
          L = () =>
            b(I || K.currentTarget, {
              fetcherKey: u,
              method: Q,
              navigate: o,
              replace: r,
              state: d,
              relative: g,
              preventScrollReset: y,
              viewTransition: S,
              unstable_defaultShouldRevalidate: C,
            });
        j && o !== !1 ? N.startTransition(() => L()) : L();
      };
    return N.createElement('form', {
      ref: x,
      method: w,
      action: A,
      onSubmit: c ? _ : V,
      ...R,
      'data-discover': !$ && a === 'render' ? 'true' : void 0,
    });
  }
);
Bv.displayName = 'Form';
function Uv(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Yp(a) {
  let u = N.useContext(xa);
  return (Ve(u, Uv(a)), u);
}
function Lv(
  a,
  {
    target: u,
    replace: o,
    unstable_mask: c,
    state: r,
    preventScrollReset: d,
    relative: m,
    viewTransition: v,
    unstable_defaultShouldRevalidate: _,
    unstable_useTransitions: g,
  } = {}
) {
  let y = Ol(),
    S = sl(),
    C = Oi(a, { relative: m });
  return N.useCallback(
    (R) => {
      if (pv(R, u)) {
        R.preventDefault();
        let x = o !== void 0 ? o : Ci(S) === Ci(C),
          j = () =>
            y(a, {
              replace: x,
              unstable_mask: c,
              state: r,
              preventScrollReset: d,
              relative: m,
              viewTransition: v,
              unstable_defaultShouldRevalidate: _,
            });
        g ? N.startTransition(() => j()) : j();
      }
    },
    [S, y, C, o, c, r, u, a, d, m, v, _, g]
  );
}
var Hv = 0,
  qv = () => `__${String(++Hv)}__`;
function Gv() {
  let { router: a } = Yp('useSubmit'),
    { basename: u } = N.useContext(Dt),
    o = iv(),
    c = a.fetch,
    r = a.navigate;
  return N.useCallback(
    async (d, m = {}) => {
      let { action: v, method: _, encType: g, formData: y, body: S } = _v(d, u);
      if (m.navigate === !1) {
        let C = m.fetcherKey || qv();
        await c(C, o, m.action || v, {
          unstable_defaultShouldRevalidate: m.unstable_defaultShouldRevalidate,
          preventScrollReset: m.preventScrollReset,
          formData: y,
          body: S,
          formMethod: m.method || _,
          formEncType: m.encType || g,
          flushSync: m.flushSync,
        });
      } else
        await r(m.action || v, {
          unstable_defaultShouldRevalidate: m.unstable_defaultShouldRevalidate,
          preventScrollReset: m.preventScrollReset,
          formData: y,
          body: S,
          formMethod: m.method || _,
          formEncType: m.encType || g,
          replace: m.replace,
          state: m.state,
          fromRouteId: o,
          flushSync: m.flushSync,
          viewTransition: m.viewTransition,
        });
    },
    [c, r, u, o]
  );
}
function Yv(a, { relative: u } = {}) {
  let { basename: o } = N.useContext(Dt),
    c = N.useContext(el);
  Ve(c, 'useFormAction must be used inside a RouteContext');
  let [r] = c.matches.slice(-1),
    d = { ...Oi(a || '.', { relative: u }) },
    m = sl();
  if (a == null) {
    d.search = m.search;
    let v = new URLSearchParams(d.search),
      _ = v.getAll('index');
    if (_.some((y) => y === '')) {
      (v.delete('index'), _.filter((S) => S).forEach((S) => v.append('index', S)));
      let y = v.toString();
      d.search = y ? `?${y}` : '';
    }
  }
  return (
    (!a || a === '.') &&
      r.route.index &&
      (d.search = d.search ? d.search.replace(/^\?/, '?index&') : '?index'),
    o !== '/' && (d.pathname = d.pathname === '/' ? o : Ft([o, d.pathname])),
    Ci(d)
  );
}
function Xv(a, { relative: u } = {}) {
  let o = N.useContext(Op);
  Ve(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: c } = Yp('useViewTransitionState'),
    r = Oi(a, { relative: u });
  if (!o.isTransitioning) return !1;
  let d = Rl(o.currentLocation.pathname, c) || o.currentLocation.pathname,
    m = Rl(o.nextLocation.pathname, c) || o.nextLocation.pathname;
  return is(r.pathname, m) != null || is(r.pathname, d) != null;
}
const $v = '_layout_mn6ug_1',
  Vv = '_enemies_mn6ug_12',
  Qv = '_enemy_mn6ug_20',
  Kv = '_targeted_mn6ug_35',
  Zv = '_enemyName_mn6ug_39',
  Iv = '_down_mn6ug_44',
  Jv = '_log_mn6ug_48',
  Wv = '_logLine_mn6ug_60',
  Fv = '_party_mn6ug_64',
  Pv = '_rowTag_mn6ug_71',
  e1 = '_cardRow_mn6ug_77',
  t1 = '_card_mn6ug_77',
  l1 = '_cardActive_mn6ug_99',
  n1 = '_cardDecided_mn6ug_104',
  a1 = '_cardName_mn6ug_108',
  i1 = '_uni_mn6ug_116',
  u1 = '_summons_mn6ug_120',
  s1 = '_summon_mn6ug_120',
  c1 = '_summonName_mn6ug_138',
  o1 = '_summonHp_mn6ug_147',
  r1 = '_cardNums_mn6ug_153',
  f1 = '_cardCmd_mn6ug_159',
  d1 = '_empty_mn6ug_165',
  m1 = '_command_mn6ug_170',
  h1 = '_skillList_mn6ug_176',
  p1 = '_skillBtn_mn6ug_182',
  y1 = '_skillTop_mn6ug_194',
  g1 = '_skillName_mn6ug_201',
  _1 = '_skillDesc_mn6ug_206',
  v1 = '_target_mn6ug_35',
  b1 = '_unionBanner_mn6ug_217',
  S1 = '_unionCancel_mn6ug_231',
  x1 = '_unionHint_mn6ug_240',
  E1 = '_unionBtn_mn6ug_246',
  T1 = '_cmdHead_mn6ug_252',
  N1 = '_menu_mn6ug_257',
  k1 = '_menuBtn_mn6ug_263',
  A1 = '_tp_mn6ug_280',
  C1 = '_menuBack_mn6ug_286',
  M1 = '_execRow_mn6ug_296',
  R1 = '_redo_mn6ug_301',
  j1 = '_primary_mn6ug_311',
  O1 = '_result_mn6ug_326',
  z1 = '_resultTitle_mn6ug_337',
  w1 = '_resultBody_mn6ug_342',
  ee = {
    layout: $v,
    enemies: Vv,
    enemy: Qv,
    targeted: Kv,
    enemyName: Zv,
    down: Iv,
    log: Jv,
    logLine: Wv,
    party: Fv,
    rowTag: Pv,
    cardRow: e1,
    card: t1,
    cardActive: l1,
    cardDecided: n1,
    cardName: a1,
    uni: i1,
    summons: u1,
    summon: s1,
    summonName: c1,
    summonHp: o1,
    cardNums: r1,
    cardCmd: f1,
    empty: d1,
    command: m1,
    skillList: h1,
    skillBtn: p1,
    skillTop: y1,
    skillName: g1,
    skillDesc: _1,
    target: v1,
    unionBanner: b1,
    unionCancel: S1,
    unionHint: x1,
    unionBtn: E1,
    cmdHead: T1,
    menu: N1,
    menuBtn: k1,
    tp: A1,
    menuBack: C1,
    execRow: M1,
    redo: R1,
    primary: j1,
    result: O1,
    resultTitle: z1,
    resultBody: w1,
  },
  D1 = '_row_1t6j7_1',
  B1 = '_label_1t6j7_8',
  U1 = '_track_1t6j7_16',
  L1 = '_fill_1t6j7_24',
  H1 = '_value_1t6j7_30',
  Si = { row: D1, label: B1, track: U1, fill: L1, value: H1 },
  Pu = ({ value: a, max: u, color: o = '#4caf50', label: c, showValue: r = !0 }) => {
    const d = u > 0 ? Math.max(0, Math.min(100, (a / u) * 100)) : 0;
    return p.jsxs('div', {
      className: Si.row,
      children: [
        c ? p.jsx('span', { className: Si.label, children: c }) : null,
        p.jsx('div', {
          className: Si.track,
          children: p.jsx('div', {
            className: Si.fill,
            style: { width: `${d}%`, backgroundColor: o },
          }),
        }),
        r
          ? p.jsxs('span', {
              className: Si.value,
              children: [Math.max(0, Math.round(a)), '/', Math.round(u)],
            })
          : null,
      ],
    });
  },
  cn = {
    skill_power_slash: {
      id: 'skill_power_slash',
      name: 'パワースラッシュ',
      tree: 'base',
      tpCost: (a) => 3 + a,
      element: 'slash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (a) => 1.4 + 0.2 * a }],
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
          modifier: (a) => 1.2 + 0.05 * a,
          turns: 3,
          stackGroup: 'defBuff',
        },
      ],
    },
    skill_shield_bash: {
      id: 'skill_shield_bash',
      name: 'シールドバッシュ',
      tree: 'base',
      tpCost: (a) => 3 + a,
      element: 'bash',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (a) => 1 + 0.15 * a },
        { kind: 'ailment', ailment: 'paralysis', chance: (a) => 0.2 + 0.05 * a, turns: 2 },
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
      tpCost: (a) => 4 + a,
      element: 'fire',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (a) => 1.5 + 0.25 * a }],
    },
    skill_ice_bolt: {
      id: 'skill_ice_bolt',
      name: 'アイスボルト',
      tree: 'base',
      tpCost: (a) => 4 + a,
      element: 'ice',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (a) => 1.5 + 0.25 * a }],
    },
    skill_aimed_shot: {
      id: 'skill_aimed_shot',
      name: '狙撃',
      tree: 'base',
      tpCost: (a) => 3 + a,
      element: 'pierce',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (a) => 1.3 + 0.2 * a }],
    },
    skill_spread_shot: {
      id: 'skill_spread_shot',
      name: '拡散射撃',
      tree: 'base',
      tpCost: (a) => 5 + a,
      element: 'pierce',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (a) => 0.8 + 0.12 * a }],
    },
    skill_leg_snipe: {
      id: 'skill_leg_snipe',
      name: '脚封じの矢',
      tree: 'base',
      tpCost: (a) => 4 + a,
      element: 'pierce',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (a) => 1 + 0.15 * a },
        { kind: 'ailment', ailment: 'legBind', chance: (a) => 0.35 + 0.05 * a, turns: 3 },
      ],
    },
    skill_arm_snipe: {
      id: 'skill_arm_snipe',
      name: '腕封じの矢',
      tree: 'base',
      tpCost: (a) => 4 + a,
      element: 'pierce',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (a) => 1 + 0.15 * a },
        { kind: 'ailment', ailment: 'armBind', chance: (a) => 0.35 + 0.05 * a, turns: 3 },
      ],
    },
    skill_head_snipe: {
      id: 'skill_head_snipe',
      name: '頭封じの矢',
      tree: 'base',
      tpCost: (a) => 4 + a,
      element: 'pierce',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (a) => 1 + 0.15 * a },
        { kind: 'ailment', ailment: 'headBind', chance: (a) => 0.35 + 0.05 * a, turns: 3 },
      ],
    },
    skill_summon_wolf: {
      id: 'skill_summon_wolf',
      name: '狼を召喚',
      tree: 'base',
      tpCost: (a) => 6 + a,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_wolf' }],
    },
    skill_summon_bulwark: {
      id: 'skill_summon_bulwark',
      name: '石像を召喚',
      tree: 'base',
      tpCost: (a) => 6 + a,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_bulwark' }],
    },
    skill_summon_familiar: {
      id: 'skill_summon_familiar',
      name: '使い魔を召喚',
      tree: 'base',
      tpCost: (a) => 7 + a,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_familiar' }],
    },
  },
  lt = {
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
  };
function q1(a) {
  return a.category === 'food' ? 0 : a.category === 'material' ? 8 : Math.floor(a.buyPrice / 2);
}
function G1(a) {
  var u;
  return ((u = lt[a]) == null ? void 0 : u.category) === 'food';
}
const Zt = {
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
      unionSkillTree: { skills: [{ skillId: 'skill_union_smash', maxLevel: 3 }] },
      defaultClassId: 'class_guardian',
    },
    race_pix: {
      id: 'race_pix',
      name: 'ピクス',
      baseStatsAtLv1: { hp: 28, tp: 32, str: 4, vit: 5, agi: 9, int: 12, mnd: 11, luc: 7 },
      statGrowth: { hp: 5, tp: 7, str: 1, vit: 1, agi: 2, int: 3, mnd: 3, luc: 2 },
      unionSkillTree: { skills: [{ skillId: 'skill_union_nova', maxLevel: 3 }] },
      defaultClassId: 'class_mage',
    },
    race_therian: {
      id: 'race_therian',
      name: 'テリアン',
      baseStatsAtLv1: { hp: 38, tp: 18, str: 9, vit: 7, agi: 11, int: 6, mnd: 6, luc: 9 },
      statGrowth: { hp: 7, tp: 3, str: 2, vit: 2, agi: 3, int: 1, mnd: 1, luc: 3 },
      unionSkillTree: { skills: [{ skillId: 'skill_union_fang', maxLevel: 3 }] },
      defaultClassId: 'class_ranger',
    },
  },
  Nr = {
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
  },
  Ti = {
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
        { kind: 'heal', amount: (a) => 60 + 25 * a },
        {
          kind: 'buff',
          stat: 'patk',
          modifier: (a) => 1.2 + 0.05 * a,
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
      effects: [{ kind: 'damage', statBase: 'str', power: (a) => 2.2 + 0.4 * a }],
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
      effects: [{ kind: 'damage', statBase: 'int', power: (a) => 2.4 + 0.5 * a }],
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
      effects: [{ kind: 'damage', statBase: 'str', power: (a) => 1.4 + 0.3 * a, hits: 3 }],
    },
  },
  Be = {
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
  Y1 = 500,
  ir = 30,
  hs = 3,
  ps = 2,
  X1 = hs + ps,
  Ni = { TITLE_DEPTH: 20, REBIRTH_MIN_LEVEL: 30 },
  Xp = 5,
  $1 = 5,
  ki = (a) => a > 0 && a % Be.BOSS_INTERVAL === 0,
  np = (a) => Math.round(Be.EXP_CURVE_BASE * Math.pow(a, Be.EXP_CURVE_POW)),
  Ko = (a) => a < Be.LEVEL_CAP,
  kr = (a, u) => 1 + Be.ENEMY_SCALE_K * (a - u),
  Rn = {
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
    },
  },
  wt = {
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
  },
  Ta = {
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
  },
  V1 = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'],
  Q1 = ['slash', 'pierce', 'bash'],
  ss = (a, u, o) => Math.max(u, Math.min(o, a));
function $p(a, u) {
  const o = {};
  for (const c of V1) o[c] = Math.round(a[c] * u);
  return o;
}
function K1(a, u) {
  return $p(a.baseStats, kr(u, a.refDepth));
}
function ya(a, u) {
  const o = new Map();
  for (const r of a) {
    if (r.stat !== u) continue;
    const d = ss(r.modifier, 0.5, 1.5),
      m = o.get(r.stackGroup);
    (m === void 0 || Math.abs(d - 1) > Math.abs(m - 1)) && o.set(r.stackGroup, d);
  }
  let c = 1;
  for (const r of o.values()) c *= r;
  return ss(c, 0.25, 2);
}
function ap(a, u, o) {
  const c = (a.str * 2 + (u.atk ?? 0)) * ya(o, 'patk'),
    r = (a.vit * 2 + (u.def ?? 0)) * ya(o, 'pdef'),
    d = (a.int * 2 + (u.mat ?? 0)) * ya(o, 'matk'),
    m = (a.mnd * 2 + (u.mdf ?? 0)) * ya(o, 'mdef');
  return {
    patk: c,
    pdef: r,
    matk: d,
    mdef: m,
    hit: a.agi,
    acc: a.agi * ya(o, 'acc'),
    eva: a.agi * ya(o, 'eva'),
    crit: a.luc,
  };
}
const Z1 = (a) => a.ailments.some((u) => u.type === 'blind'),
  I1 = (a) => a.ailments.some((u) => u.type === 'legBind');
function Vp(a, u, o, c) {
  const r = o.statBase === 'str',
    d = ap(a.stats, a.equip, a.buffs),
    m = ap(u.stats, u.equip, u.buffs),
    v = r ? d.patk : d.matk,
    _ = r ? m.pdef : m.mdef;
  let g = !0;
  if (r) {
    const Q = Z1(a) ? Be.BLIND_ACC_PENALTY : 0,
      L = I1(u) ? 0 : m.eva,
      Z = ss(Be.BASE_HIT + (d.acc - L) * Be.HIT_AGI_K - Q, Be.HIT_MIN, 1);
    g = c.next() < Z;
  }
  if (!g) return { damage: 0, hit: !1, critical: !1 };
  const S = (v * o.power * Be.DAMAGE_DEF_K) / (Be.DAMAGE_DEF_K + Math.max(0, _)),
    C = r && Q1.includes(o.element),
    R = C && a.row === 'back' ? Be.BACK_ROW_MELEE_MULT : 1,
    x = C && u.row === 'back' ? Be.BACK_ROW_MELEE_MULT : 1,
    j = R * x,
    [b, A] = Be.DMG_VARIANCE,
    w = b + c.next() * (A - b);
  let $ = S * o.elementMultiplier * j * w;
  const V = ss(
      Be.CRIT_BASE + (a.stats.luc - u.stats.luc) * Be.CRIT_LUC_K,
      Be.CRIT_MIN,
      Be.CRIT_MAX
    ),
    K = c.next() < V;
  return (
    K && ($ *= Be.CRIT_MULT),
    { damage: o.elementMultiplier === 0 ? 0 : Math.max(1, Math.floor($)), hit: !0, critical: K }
  );
}
const ht = {
  class_warrior: {
    id: 'class_warrior',
    name: '戦士',
    skillTree: {
      skills: [
        { skillId: 'skill_power_slash', maxLevel: 5 },
        { skillId: 'skill_guard_stance', maxLevel: 3 },
        { skillId: 'skill_mining', maxLevel: 1 },
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
        { skillId: 'skill_summon_bulwark', maxLevel: 3 },
        { skillId: 'skill_logging', maxLevel: 1 },
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
        { skillId: 'skill_summon_familiar', maxLevel: 2 },
        { skillId: 'skill_harvest', maxLevel: 1 },
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
        {
          skillId: 'skill_head_snipe',
          maxLevel: 3,
          requires: [{ skillId: 'skill_aimed_shot', level: 1 }],
        },
        { skillId: 'skill_summon_wolf', maxLevel: 3 },
        { skillId: 'skill_gathering', maxLevel: 1 },
        { skillId: 'skill_fishing', maxLevel: 1 },
        { skillId: 'skill_hunting', maxLevel: 1 },
      ],
    },
    equipableWeaponTypes: ['bow', 'fist'],
    equipableArmorTypes: ['light', 'clothes'],
    titleOptions: ['title_sniper', 'title_tracker'],
  },
};
function Ar(a, u) {
  var o;
  return ((o = a.guild.storage.find((c) => c.itemId === u)) == null ? void 0 : o.qty) ?? 0;
}
function zi(a, u, o = 1) {
  if (o <= 0) return a;
  const c = [...a.guild.storage],
    r = c.findIndex((d) => d.itemId === u);
  return (
    r >= 0 ? (c[r] = { ...c[r], qty: c[r].qty + o }) : c.push({ itemId: u, qty: o }),
    { ...a, guild: { ...a.guild, storage: c } }
  );
}
function ys(a, u, o = 1) {
  if (o <= 0) return a;
  const c = a.guild.storage.findIndex((m) => m.itemId === u);
  if (c < 0 || a.guild.storage[c].qty < o) return a;
  const r = [...a.guild.storage],
    d = r[c].qty - o;
  return (
    d <= 0 ? r.splice(c, 1) : (r[c] = { ...r[c], qty: d }),
    { ...a, guild: { ...a.guild, storage: r } }
  );
}
const Qp = 60,
  gs = (a) => a.guild.foodStorage ?? [];
function Kp(a) {
  return gs(a).reduce((u, o) => u + o.qty, 0);
}
function Cr(a, u) {
  var o;
  return ((o = gs(a).find((c) => c.itemId === u)) == null ? void 0 : o.qty) ?? 0;
}
function Zp(a, u, o = 1) {
  if (o <= 0) return a;
  const c = Qp - Kp(a),
    r = Math.min(o, Math.max(0, c));
  if (r <= 0) return a;
  const d = [...gs(a)],
    m = d.findIndex((v) => v.itemId === u);
  return (
    m >= 0 ? (d[m] = { ...d[m], qty: d[m].qty + r }) : d.push({ itemId: u, qty: r }),
    { ...a, guild: { ...a.guild, foodStorage: d } }
  );
}
function Ip(a, u, o = 1) {
  if (o <= 0) return a;
  const c = [...gs(a)],
    r = c.findIndex((m) => m.itemId === u);
  if (r < 0 || c[r].qty < o) return a;
  const d = c[r].qty - o;
  return (
    d <= 0 ? c.splice(r, 1) : (c[r] = { ...c[r], qty: d }),
    { ...a, guild: { ...a.guild, foodStorage: c } }
  );
}
function Jp(a, u, o) {
  return {
    ...a,
    guild: { ...a.guild, members: a.guild.members.map((c) => (c.id === u ? o(c) : c)) },
  };
}
function Mr(a, u) {
  const o = wt[u];
  if (!o) return !1;
  const c = ht[a.classId];
  return c
    ? o.slot === 'weapon'
      ? !!o.weaponType && c.equipableWeaponTypes.includes(o.weaponType)
      : o.slot === 'armor'
        ? !!o.armorType && c.equipableArmorTypes.includes(o.armorType)
        : !0
    : !1;
}
function J1(a, u, o) {
  const c = wt[o],
    r = a.guild.members.find((v) => v.id === u);
  if (!c || !r || !Mr(r, o) || Ar(a, o) <= 0) return a;
  let d = ys(a, o, 1);
  const m = r.equipment[c.slot];
  return (
    m && (d = zi(d, m, 1)),
    Jp(d, u, (v) => ({ ...v, equipment: { ...v.equipment, [c.slot]: o } }))
  );
}
function Rr(a, u, o) {
  const c = a.guild.members.find((m) => m.id === u);
  if (!c) return a;
  const r = c.equipment[o];
  if (!r) return a;
  const d = zi(a, r, 1);
  return Jp(d, u, (m) => ({ ...m, equipment: { ...m.equipment, [o]: null } }));
}
const an = (a) => ({ hp: 0, tp: 0, str: 0, vit: 0, agi: 0, int: 0, mnd: 0, luc: 0, ...a }),
  va = {
    title_berserker: {
      id: 'title_berserker',
      name: '狂戦士',
      parentClassId: 'class_warrior',
      skillTree: { skills: [] },
      growthModifier: an({ str: 1 }),
    },
    title_sentinel: {
      id: 'title_sentinel',
      name: '哨戒兵',
      parentClassId: 'class_warrior',
      skillTree: { skills: [] },
      growthModifier: an({ vit: 1 }),
    },
    title_bulwark: {
      id: 'title_bulwark',
      name: '城壁',
      parentClassId: 'class_guardian',
      skillTree: { skills: [] },
      growthModifier: an({ vit: 1, hp: 2 }),
    },
    title_vanguard: {
      id: 'title_vanguard',
      name: '先鋒',
      parentClassId: 'class_guardian',
      skillTree: { skills: [] },
      growthModifier: an({ str: 1 }),
    },
    title_pyromancer: {
      id: 'title_pyromancer',
      name: '紅蓮術士',
      parentClassId: 'class_mage',
      skillTree: { skills: [] },
      growthModifier: an({ int: 1 }),
    },
    title_sage: {
      id: 'title_sage',
      name: '賢者',
      parentClassId: 'class_mage',
      skillTree: { skills: [] },
      growthModifier: an({ tp: 2, mnd: 1 }),
    },
    title_sniper: {
      id: 'title_sniper',
      name: '狙撃手',
      parentClassId: 'class_ranger',
      skillTree: { skills: [] },
      growthModifier: an({ agi: 1, luc: 1 }),
    },
    title_tracker: {
      id: 'title_tracker',
      name: '追跡者',
      parentClassId: 'class_ranger',
      skillTree: { skills: [] },
      growthModifier: an({ agi: 1 }),
    },
  },
  W1 = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];
function wi(a) {
  var v, _;
  const u = Zt[a.raceId];
  if (!u) throw new Error(`computeBaseStats: 未定義の種族 "${a.raceId}"`);
  const c = Math.max(1, Math.min(a.level, Be.LEVEL_CAP)) - 1,
    r = a.titleId ? ((v = va[a.titleId]) == null ? void 0 : v.growthModifier) : void 0,
    d = ((_ = a.rebirthBonus) == null ? void 0 : _.allStats) ?? 0,
    m = {};
  for (const g of W1) {
    const y = u.statGrowth[g] + ((r == null ? void 0 : r[g]) ?? 0);
    m[g] = u.baseStatsAtLv1[g] + y * c + d;
  }
  return m;
}
const F1 = 3,
  Ml = (a, u, o) => Math.max(u, Math.min(o, a)),
  P1 = {
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
function eb(a) {
  const u = { atk: 0, mat: 0, def: 0, mdf: 0 };
  for (const o of Object.values(a.equipment)) {
    if (!o) continue;
    const c = wt[o];
    c &&
      ((u.atk += c.bonuses.atk ?? 0),
      (u.mat += c.bonuses.mat ?? 0),
      (u.def += c.bonuses.def ?? 0),
      (u.mdf += c.bonuses.mdf ?? 0));
  }
  return u;
}
function tb(a, u) {
  var m;
  const o = a.guild.members.find((v) => v.id === u);
  if (!o) return null;
  const c = (m = a.diveState) == null ? void 0 : m.party.find((v) => v.charId === u),
    r = wi(o),
    d = a.guild.party.front.includes(u);
  return {
    id: u,
    name: o.name,
    side: 'ally',
    row: d ? 'front' : 'back',
    stats: r,
    equip: eb(o),
    hp: c ? c.hp : r.hp,
    maxHp: r.hp,
    tp: c ? c.tp : r.tp,
    maxTp: r.tp,
    buffs: [],
    ailments: c ? [...c.ailments] : [],
    unionGauge: (c == null ? void 0 : c.unionGauge) ?? 0,
    isDown: c ? c.hp <= 0 : !1,
  };
}
function lb(a, u, o) {
  const c = Rn[a],
    r = K1(c, o);
  return {
    id: `enemy_${u}`,
    name: c.name,
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
    enemyId: a,
    resist: c.resist,
  };
}
function Wp(a, u, o, c, r) {
  const d = Ta[a],
    m = $p(d.baseStats, kr(u, d.refDepth)),
    v = r ?? m.hp;
  return {
    id: c,
    name: d.name,
    side: 'ally',
    row: 'front',
    stats: m,
    equip: {},
    hp: v,
    maxHp: m.hp,
    tp: 0,
    maxTp: 0,
    buffs: [],
    ailments: [],
    unionGauge: 0,
    isDown: v <= 0,
    isSummon: !0,
    summonKind: a,
    ownerId: o,
  };
}
function ip(a, u, o = 'none') {
  var _, g;
  const c = ((_ = a.diveState) == null ? void 0 : _.depth) ?? 1,
    d = [...a.guild.party.front, ...a.guild.party.back]
      .filter((y) => y !== null)
      .map((y) => tb(a, y))
      .filter((y) => y !== null),
    m = u.map((y, S) => lb(y, S, c)),
    v = (((g = a.diveState) == null ? void 0 : g.persistentSummons) ?? [])
      .map((y, S) => Wp(y.summonKind, c, y.ownerId, `summon_persist_${S}`, y.hp))
      .filter((y) => !y.isDown);
  return {
    turn: 1,
    depth: c,
    allies: d,
    enemies: m,
    summons: v,
    log: [],
    outcome: 'ongoing',
    firstStrike: o,
    drops: [],
    consumedItems: [],
  };
}
const mt = (a, u) => (u === 'ally' ? a.allies : a.enemies).filter((o) => !o.isDown),
  jr = (a) => a.summons.filter((u) => !u.isDown);
function Cl(a, u) {
  return (
    a.allies.find((o) => o.id === u) ??
    a.enemies.find((o) => o.id === u) ??
    a.summons.find((o) => o.id === u)
  );
}
const Fp = (a) => {
    var u;
    return (
      !!a.isSummon && !!a.summonKind && ((u = Ta[a.summonKind]) == null ? void 0 : u.buffImmune)
    );
  },
  Pp = (a, u) => {
    var o;
    return ((o = a.resist) == null ? void 0 : o[u]) ?? 1;
  };
function Or(a, u, o) {
  ((a.hp = Ml(a.hp - u, 0, a.maxHp)),
    a.hp === 0 &&
      !a.isDown &&
      ((a.isDown = !0),
      (a.unionGauge = Math.floor(a.unionGauge / 2)),
      o.push({ text: `${a.name} は倒れた！` })));
}
function cs(a, u) {
  a.isDown || (a.unionGauge = Ml(a.unionGauge + u, 0, 100));
}
function ur(a, u) {
  Fp(a) ||
    ((a.buffs = a.buffs.filter((o) => !(o.stat === u.stat && o.stackGroup === u.stackGroup))),
    a.buffs.push(u));
}
function nb(a, u) {
  if (Fp(a)) return;
  const o = a.ailments.find((c) => c.type === u.type);
  if (o) {
    o.remainingTurns = Math.max(o.remainingTurns, u.remainingTurns);
    return;
  }
  a.ailments.push(u);
}
function ab(a, u, o) {
  return Ml(a * (1 + (u.stats.luc - o.stats.luc) * Be.AILMENT_LUC_K), 0, Be.AILMENT_MAX);
}
function ey(a, u, o, c) {
  const r = u.side === 'ally' ? 'enemy' : 'ally';
  switch (o) {
    case 'self':
      return [u];
    case 'allyAll':
      return u.side === 'ally' ? [...mt(a, 'ally'), ...jr(a)] : mt(a, 'enemy');
    case 'allyOne': {
      const d = Cl(a, c);
      return d && d.side === u.side ? [d] : [u];
    }
    case 'enemyAll':
      return mt(a, r);
    case 'enemyRow':
    case 'enemyOne':
    default: {
      const d = Cl(a, c);
      return d && d.side === r && !d.isDown ? [d] : mt(a, r).slice(0, 1);
    }
  }
}
function ib(a, u, o, c) {
  return ey(a, u, o.target, c);
}
function ty(a, u, o, c, r, d, m) {
  switch (o.kind) {
    case 'damage': {
      const v = o.hits ?? 1;
      for (const _ of d)
        if (!_.isDown)
          for (let g = 0; g < v; g++) {
            const y = Vp(
              u,
              _,
              { statBase: o.statBase, power: o.power(r), element: c, elementMultiplier: Pp(_, c) },
              m
            );
            y.hit
              ? (Or(_, y.damage, a.log),
                cs(_, 5),
                a.log.push({
                  text: `${u.name} の攻撃！ ${_.name} に ${y.damage} ダメージ${y.critical ? '（会心）' : ''}`,
                }))
              : a.log.push({ text: `${u.name} の攻撃は外れた` });
          }
      break;
    }
    case 'heal': {
      const v = o.amount(r);
      for (const _ of d) _.isDown || (_.hp = Ml(_.hp + v, 0, _.maxHp));
      a.log.push({ text: `${u.name} は回復魔法を使った（+${v}）` });
      break;
    }
    case 'buff': {
      for (const v of d)
        ur(v, {
          stat: o.stat,
          modifier: o.modifier(r),
          remainingTurns: o.turns,
          stackGroup: o.stackGroup,
        });
      a.log.push({ text: `${u.name} は態勢を整えた` });
      break;
    }
    case 'ailment': {
      for (const v of d) {
        if (v.isDown) continue;
        const _ = ab(o.chance(r), u, v);
        m.next() < _ &&
          (nb(v, { type: o.ailment, remainingTurns: o.turns, magnitude: o.magnitude }),
          a.log.push({ text: `${v.name} は${P1[o.ailment]}になった` }));
      }
      break;
    }
    case 'summon': {
      if (u.side !== 'ally') break;
      if (jr(a).length >= F1) {
        a.log.push({ text: 'これ以上は召喚できない' });
        break;
      }
      const v = `summon_${a.turn}_${a.summons.length}`,
        _ = Wp(o.summonKind, a.depth, u.id, v);
      (a.summons.push(_), a.log.push({ text: `${u.name} は ${_.name} を召喚した！` }));
      break;
    }
  }
}
function Zo(a, u, o, c) {
  var m;
  if (o.isDown) return;
  const r = u.enemyId
      ? (Rn[u.enemyId].attackElement ?? 'bash')
      : u.isSummon && u.summonKind
        ? (((m = Ta[u.summonKind]) == null ? void 0 : m.attackElement) ?? 'bash')
        : 'bash',
    d = Vp(u, o, { statBase: 'str', power: 1, element: r, elementMultiplier: Pp(o, r) }, c);
  d.hit
    ? (Or(o, d.damage, a.log),
      cs(u, 5),
      cs(o, 5),
      a.log.push({
        text: `${u.name} の攻撃！ ${o.name} に ${d.damage} ダメージ${d.critical ? '（会心）' : ''}`,
      }))
    : a.log.push({ text: `${u.name} の攻撃は外れた` });
}
const up = (a) => (a.length === 0 ? 0 : a.reduce((u, o) => u + o.stats.agi, 0) / a.length),
  ub = (a) => a.ailments.some((u) => u.type === 'paralysis'),
  zr = (a, u) => a.ailments.some((o) => o.type === u),
  Io = (a) => zr(a, 'armBind'),
  sb = (a) => zr(a, 'headBind'),
  cb = (a) => zr(a, 'legBind');
function sp(a) {
  return a.effects.some((u) => u.kind === 'damage' && u.statBase === 'str');
}
function ob(a, u, o) {
  const c = Ti[u.unionSkillId];
  if (!c) return;
  const r = Cl(a, u.actorId);
  if (!r || r.isDown || r.side !== 'ally') return;
  if (r.unionGauge < 100) {
    a.log.push({ text: `${r.name} はユニオンゲージが足りない` });
    return;
  }
  const d = new Set(u.participantIds);
  d.add(r.id);
  const m = [...d].map((y) => Cl(a, y)).filter((y) => !!y && !y.isDown && y.side === 'ally');
  if (m.length < c.requiredParticipants) {
    a.log.push({ text: `${r.name} の${c.name}は参加人数が足りない` });
    return;
  }
  const v = [r, ...m.filter((y) => y.id !== r.id)].slice(0, c.requiredParticipants);
  for (const y of v) y.unionGauge = Ml(y.unionGauge - c.gaugeCostPerParticipant, 0, 100);
  a.log.push({ text: `ユニオン！ ${r.name} の${c.name}！` });
  const _ = 1,
    g = ey(a, r, c.target, u.targetId);
  for (const y of c.effects) ty(a, r, y, c.element, _, g, o);
}
function Jo(a, u, o) {
  var S, C, R;
  if (a.outcome !== 'ongoing') return a;
  const c = structuredClone({ ...a, log: [] }),
    r = new Map(u.filter((x) => x.kind !== 'union').map((x) => [x.actorId, x])),
    d = c.turn === 1 && c.firstStrike !== 'none',
    m = d && c.firstStrike === 'preemptive',
    v = d && c.firstStrike === 'ambush';
  if (
    (m && c.log.push({ text: '先制攻撃！ 味方が先手を取った' }),
    v && c.log.push({ text: '不意打ち！ 敵に先手を取られた' }),
    !v)
  )
    for (const x of u) x.kind === 'union' && ob(c, x, o);
  const _ = u.find((x) => x.kind === 'flee');
  if (!v && _ && c.outcome === 'ongoing') {
    const x = Cl(c, _.actorId);
    if (x && cb(x)) c.log.push({ text: `${x.name} は脚を封じられて逃げられない` });
    else {
      const j = Ml(0.5 + (up(mt(c, 'ally')) - up(mt(c, 'enemy'))) * 0.02, 0.1, 0.95);
      if (o.next() < j)
        return (c.log.push({ text: 'うまく逃げ切れた！' }), (c.outcome = 'fled'), c);
      c.log.push({ text: '逃げられなかった！' });
    }
  }
  if (!v)
    for (const x of u) {
      if (x.kind !== 'guard') continue;
      const j = Cl(c, x.actorId);
      !j ||
        j.isDown ||
        (ur(j, { stat: 'pdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }),
        ur(j, { stat: 'mdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }));
    }
  const g = new Map();
  if (!m)
    for (const x of mt(c, 'enemy')) {
      const j = [...jr(c), ...mt(c, 'ally')];
      j.length > 0 && g.set(x.id, o.pick(j).id);
    }
  const y = [...c.allies, ...c.enemies, ...c.summons]
    .filter((x) => !x.isDown)
    .filter((x) => !(m && x.side === 'enemy') && !(v && x.side === 'ally'))
    .map((x) => ({ c: x, agi: x.stats.agi, tie: o.next() }))
    .sort((x, j) => j.agi - x.agi || j.tie - x.tie)
    .map((x) => x.c);
  for (const x of y)
    if (!x.isDown) {
      if (c.outcome !== 'ongoing') break;
      if (ub(x) && o.next() < Be.PARALYSIS_SKIP) {
        c.log.push({ text: `${x.name} は麻痺で動けない` });
        continue;
      }
      if (x.isSummon) {
        const j = x.summonKind ? Ta[x.summonKind] : void 0;
        if (j != null && j.actsOnTurn) {
          const b = mt(c, 'enemy');
          b.length > 0 && Zo(c, x, o.pick(b), o);
        }
        if (mt(c, 'enemy').length === 0) break;
        continue;
      }
      if (x.side === 'enemy') {
        if (Io(x)) {
          c.log.push({ text: `${x.name} は腕を封じられて攻撃できない` });
          continue;
        }
        const j = g.get(x.id),
          b = j ? Cl(c, j) : void 0,
          A = b && !b.isDown ? b : mt(c, 'ally')[0];
        A && Zo(c, x, A, o);
      } else {
        const j = r.get(x.id);
        if (!j || j.kind === 'guard' || j.kind === 'flee') continue;
        if (j.kind === 'attack') {
          if (Io(x)) {
            c.log.push({ text: `${x.name} は腕を封じられて攻撃できない` });
            continue;
          }
          const b = Cl(c, j.targetId),
            A = b && !b.isDown ? b : mt(c, 'enemy')[0];
          A && Zo(c, x, A, o);
        } else if (j.kind === 'skill') {
          const b = cn[j.skillId];
          if (!b) continue;
          if (sp(b) && Io(x)) {
            c.log.push({ text: `${x.name} は腕を封じられてスキルを使えない` });
            continue;
          }
          if (!sp(b) && sb(x)) {
            c.log.push({ text: `${x.name} は頭を封じられてスキルを使えない` });
            continue;
          }
          const A = 1,
            w = b.tpCost(A);
          if (x.tp < w) {
            c.log.push({ text: `${x.name} は TP が足りない` });
            continue;
          }
          ((x.tp -= w), cs(x, 10));
          const $ = ib(c, x, b, j.targetId);
          for (const V of b.effects) ty(c, x, V, b.element, A, $, o);
        } else if (j.kind === 'item') {
          const b = lt[j.itemId];
          if (!b || !((S = b.useContext) != null && S.includes('battle'))) continue;
          const A = Cl(c, j.targetId) ?? x;
          for (const w of b.effects ?? [])
            w.kind === 'heal'
              ? (A.hp = Ml(A.hp + w.amount(1), 0, A.maxHp))
              : w.kind === 'restoreTp' && (A.tp = Ml(A.tp + w.amount(1), 0, A.maxTp));
          (c.consumedItems.push(j.itemId), c.log.push({ text: `${x.name} は ${b.name} を使った` }));
        }
      }
      if (mt(c, 'enemy').length === 0 || mt(c, 'ally').length === 0) break;
    }
  for (const x of [...c.allies, ...c.enemies, ...c.summons]) {
    if (x.isDown) continue;
    const j = x.ailments.find((b) => b.type === 'poison');
    if (j) {
      const b = j.magnitude ?? Math.max(1, Math.floor(x.maxHp * Be.POISON_HP_RATIO));
      (Or(x, b, c.log), c.log.push({ text: `${x.name} は毒で ${b} のダメージ` }));
    }
  }
  for (const x of [...c.allies, ...c.enemies, ...c.summons])
    (!x.isDown &&
      x.maxTp > 0 &&
      (x.tp = Math.min(x.maxTp, x.tp + Math.ceil(x.maxTp * Be.TP_REGEN_RATIO))),
      (x.buffs = x.buffs
        .map((j) => ({ ...j, remainingTurns: j.remainingTurns - 1 }))
        .filter((j) => j.remainingTurns > 0)),
      (x.ailments = x.ailments
        .map((j) => ({ ...j, remainingTurns: j.remainingTurns - 1 }))
        .filter((j) => j.remainingTurns > 0)));
  for (const x of c.enemies)
    if (
      !(
        !x.isDown ||
        !x.enemyId ||
        (((C = a.enemies.find((b) => b.id === x.id)) == null ? void 0 : C.isDown) ?? !1)
      )
    )
      for (const b of Rn[x.enemyId].drops ?? [])
        o.next() < b.rate &&
          (c.drops.push({ enemyId: x.enemyId, itemId: b.itemId }),
          c.log.push({
            text: `${x.name} は ${((R = lt[b.itemId]) == null ? void 0 : R.name) ?? b.itemId} を落とした`,
          }));
  return (
    (c.summons = c.summons.filter((x) => !x.isDown)),
    (c.turn += 1),
    mt(c, 'enemy').length === 0
      ? (c.outcome = 'win')
      : mt(c, 'ally').length === 0 && (c.outcome = 'lose'),
    c
  );
}
function ly(a) {
  let u = 0,
    o = 0;
  for (const c of a.enemies) {
    if (!c.enemyId) continue;
    const r = Rn[c.enemyId],
      d = kr(a.depth, r.refDepth);
    ((u += Math.round(r.exp * d)), (o += Math.round(r.gold * d)));
  }
  return { exp: u, gold: o };
}
function rb(a, u) {
  let o = a.level,
    c = a.exp + (Ko(o) ? u : 0),
    r = a.skillPoints.total;
  for (; Ko(o) && c >= np(o); ) ((c -= np(o)), (o += 1), (r += Be.SP_PER_LEVEL));
  return {
    ...a,
    level: o,
    exp: Ko(a.level) ? c : a.exp,
    skillPoints: { ...a.skillPoints, total: r },
  };
}
function cp(a, u) {
  if (!a.diveState) return a;
  const o = u.outcome === 'win',
    c = u.outcome === 'win' || u.outcome === 'fled',
    r = new Map(u.allies.map((C) => [C.id, C])),
    d = a.diveState.party.map((C) => {
      const R = r.get(C.charId);
      if (!R) return C;
      let x = R.unionGauge;
      return (
        c && !R.isDown && (x = Ml(x + Be.UNION_GAIN_ON_WIN, 0, 100)),
        { ...C, hp: R.hp, tp: R.tp, unionGauge: x, ailments: R.ailments }
      );
    });
  let m = a.guild.members,
    v = a.guild.gold;
  const _ = { ...a.bestiary.monsters };
  for (const C of u.enemies) {
    if (!C.enemyId) continue;
    const R = _[C.enemyId] ?? { seen: !1, defeated: !1, dropsFound: [] };
    _[C.enemyId] = { ...R, seen: !0, defeated: R.defeated || C.isDown };
  }
  if (o)
    for (const C of u.drops) {
      const R = _[C.enemyId];
      R &&
        !R.dropsFound.includes(C.itemId) &&
        (_[C.enemyId] = { ...R, dropsFound: [...R.dropsFound, C.itemId] });
    }
  const g = { ...a.bestiary, monsters: _ };
  if (o) {
    const { exp: C, gold: R } = ly(u);
    v += R;
    const x = new Set(d.map((b) => b.charId)),
      j = x.size > 0 ? Math.floor(C / x.size) : 0;
    m = m.map((b) => (x.has(b.id) ? rb(b, j) : b));
  }
  const y = u.summons
    .filter((C) => {
      var R;
      return (
        !C.isDown &&
        C.summonKind &&
        ((R = Ta[C.summonKind]) == null ? void 0 : R.persistsAfterBattle)
      );
    })
    .map((C) => ({ summonKind: C.summonKind, ownerId: C.ownerId ?? '', hp: C.hp }));
  let S = {
    ...a,
    guild: { ...a.guild, members: m, gold: v, bestiary: g },
    bestiary: g,
    diveState: { ...a.diveState, party: d, persistentSummons: y },
  };
  for (const C of u.consumedItems) S = ys(S, C, 1);
  if (o) for (const C of u.drops) S = zi(S, C.itemId, 1);
  return S;
}
const fb = 8,
  sr = 16,
  Ai = 5;
function wr(a) {
  return a.range(fb, sr);
}
function db(a, u) {
  const o = a - 1;
  return o <= 0
    ? { stepsUntilEncounter: wr(u), triggered: !0 }
    : { stepsUntilEncounter: o, triggered: !1 };
}
function mb(a) {
  const u = Math.max(0, sr - a),
    o = Math.round((u / sr) * Ai);
  return Math.min(Ai, Math.max(0, o));
}
const Kt = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  ba = ['N', 'E', 'S', 'W'];
function ny(a) {
  return ba[(ba.indexOf(a) + 1) % 4];
}
function ay(a) {
  return ba[(ba.indexOf(a) + 3) % 4];
}
function hb(a) {
  return ba[(ba.indexOf(a) + 2) % 4];
}
const pb = (a, u, o) => a >= 0 && u >= 0 && a < o.width && u < o.height;
function _a(a, u, o, c) {
  if (a.cells[o][u].walls[c]) return !1;
  const r = u + Kt[c].dx,
    d = o + Kt[c].dy;
  return pb(r, d, a) ? a.cells[d][r].passable : !1;
}
function yb(a, u, o) {
  return _a(a, u.x, u.y, o) ? { x: u.x + Kt[o].dx, y: u.y + Kt[o].dy } : null;
}
function Dr(a, u, o) {
  return ['N', 'E', 'S', 'W'].filter((c) => !a.cells[o][u].walls[c]);
}
const op = ['N', 'E', 'S', 'W'],
  Wo = (a, u) => Math.abs(a.x - u.x) + Math.abs(a.y - u.y);
function gb(a, u, o, c, r) {
  const d = u.map((y) => ({ ...y, cell: { ...y.cell } })),
    m = new Map(a.foeSpawns.map((y) => [y.id, y])),
    v = new Set(d.filter((y) => !y.defeated).map((y) => `${y.cell.x},${y.cell.y}`));
  let _ = null;
  const g = [...d].sort((y, S) => y.spawnId.localeCompare(S.spawnId, void 0, { numeric: !0 }));
  for (const y of g) {
    if (_) break;
    if (y.defeated) continue;
    const S = m.get(y.spawnId);
    if (!S) continue;
    !y.alerted && Wo(y.cell, o) <= S.sightRange && (y.alerted = !0);
    const C = (R) => {
      if (!_a(a, y.cell.x, y.cell.y, R)) return 'blocked';
      const x = y.cell.x + Kt[R].dx,
        j = y.cell.y + Kt[R].dy;
      if (x === o.x && j === o.y) {
        const b = R === c;
        return (
          (_ = { spawnId: y.spawnId, enemyId: S.enemyId, firstStrike: b ? 'ambush' : 'none' }),
          'contact'
        );
      }
      return v.has(`${x},${j}`)
        ? 'blocked'
        : (v.delete(`${y.cell.x},${y.cell.y}`),
          (y.cell = { x, y: j }),
          v.add(`${x},${j}`),
          'moved');
    };
    if (y.alerted)
      for (let R = 0; R < S.moveSpeed; R++) {
        let x = null,
          j = Wo(y.cell, o),
          b = !1;
        for (const w of op) {
          const $ = y.cell.x + Kt[w].dx,
            V = y.cell.y + Kt[w].dy;
          if ($ === o.x && V === o.y && _a(a, y.cell.x, y.cell.y, w)) {
            ((x = w), (b = !0));
            break;
          }
          if (!_a(a, y.cell.x, y.cell.y, w) || v.has(`${$},${V}`)) continue;
          const K = Wo({ x: $, y: V }, o);
          K < j && ((j = K), (x = w));
        }
        if (!x) break;
        const A = C(x);
        if (A === 'contact' || A === 'blocked' || b) break;
      }
    else {
      const R = S.patrol;
      if (R.kind === 'wander') {
        const x = op.filter(
          (j) =>
            _a(a, y.cell.x, y.cell.y, j) && !v.has(`${y.cell.x + Kt[j].dx},${y.cell.y + Kt[j].dy}`)
        );
        x.length > 0 && C(r.pick(x));
      } else R.kind === 'charge' && C(R.dir);
    }
  }
  return { foes: d, contact: _ };
}
const An = {
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
  _b = Object.keys(An);
function vb(a) {
  return Object.values(Rn)
    .filter((u) => u.tierBand === a && !u.id.startsWith('enemy_boss'))
    .map((u) => u.id);
}
const Al = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  bb = { N: 'S', E: 'W', S: 'N', W: 'E' };
function Sb(a) {
  return Math.min(25, 15 + Math.floor(a / 5));
}
function xb() {
  return { walls: { N: !0, E: !0, S: !0, W: !0 }, floorType: 'normal', passable: !0 };
}
const cr = (a, u, o, c) => a >= 0 && u >= 0 && a < o && u < c;
function rp(a, u, o, c) {
  const { dx: r, dy: d } = Al[c];
  ((a[o][u].walls[c] = !1), (a[o + d][u + r].walls[bb[c]] = !1));
}
function Eb(a, u, o) {
  const c = a.length,
    r = a[0].length,
    d = Array.from({ length: c }, () => Array(r).fill(-1)),
    m = [{ x: u, y: o }];
  d[o][u] = 0;
  for (let v = 0; v < m.length; v++) {
    const { x: _, y: g } = m[v];
    for (const y of ['N', 'E', 'S', 'W']) {
      if (a[g][_].walls[y]) continue;
      const S = _ + Al[y].dx,
        C = g + Al[y].dy;
      !cr(S, C, r, c) || d[C][S] !== -1 || ((d[C][S] = d[g][_] + 1), m.push({ x: S, y: C }));
    }
  }
  return d;
}
function Tb(a, u) {
  const o = Sb(a),
    c = o,
    r = o,
    d = Array.from({ length: r }, () => Array.from({ length: c }, () => xb())),
    m = Array.from({ length: r }, () => Array(c).fill(!1)),
    v = u.int(c),
    _ = u.int(r),
    g = [{ x: v, y: _ }];
  for (m[_][v] = !0; g.length > 0; ) {
    const I = g[g.length - 1],
      Q = [];
    for (const ce of ['N', 'E', 'S', 'W']) {
      const ue = I.x + Al[ce].dx,
        W = I.y + Al[ce].dy;
      cr(ue, W, c, r) && !m[W][ue] && Q.push(ce);
    }
    if (Q.length === 0) {
      g.pop();
      continue;
    }
    const L = u.pick(Q);
    rp(d, I.x, I.y, L);
    const Z = I.x + Al[L].dx,
      ae = I.y + Al[L].dy;
    ((m[ae][Z] = !0), g.push({ x: Z, y: ae }));
  }
  const y = Math.floor((c * r) / 25);
  for (let I = 0; I < y; I++) {
    const Q = u.int(c),
      L = u.int(r),
      Z = u.pick(['N', 'E', 'S', 'W']),
      ae = Q + Al[Z].dx,
      ce = L + Al[Z].dy;
    cr(ae, ce, c, r) && d[L][Q].walls[Z] && rp(d, Q, L, Z);
  }
  const S = u.int(c),
    C = u.int(r),
    R = Eb(d, S, C);
  let x = S,
    j = C,
    b = -1;
  for (let I = 0; I < r; I++)
    for (let Q = 0; Q < c; Q++) R[I][Q] > b && ((b = R[I][Q]), (x = Q), (j = I));
  ((d[C][S].event = { kind: 'stairsDown' }), (d[j][x].event = { kind: 'stairsUp' }));
  const A = Math.floor((a - 1) / 10),
    w = [];
  if (!ki(a)) {
    const I = vb(A),
      Q = 1 + Math.floor(a / 8);
    for (let L = 0; L < Q && I.length > 0; L++) {
      let Z = u.int(c),
        ae = u.int(r);
      for (let ce = 0; ce < 20; ce++) {
        ((Z = u.int(c)), (ae = u.int(r)));
        const ue = d[ae][Z].event,
          W = Math.abs(Z - S) + Math.abs(ae - C) >= 3;
        if (!ue && W) break;
      }
      w.push({
        id: `foe_${L}`,
        enemyId: u.pick(I),
        startCell: { x: Z, y: ae },
        patrol: { kind: 'wander' },
        moveSpeed: 1,
        sightRange: 3,
        respawn: !1,
      });
    }
  }
  const $ = [],
    V = () => {
      for (let I = 0; I < 25; I++) {
        const Q = u.int(c),
          L = u.int(r),
          Z = Math.abs(Q - S) + Math.abs(L - C) >= 2;
        if (!d[L][Q].event && Z) return { x: Q, y: L };
      }
      return null;
    },
    K = 2 + Math.floor(a / 10);
  for (let I = 0; I < K; I++) {
    const Q = V();
    if (!Q) break;
    const L = u.pick(_b),
      Z = `gather_${I}`;
    ((d[Q.y][Q.x].event = { kind: 'gather', gatherId: Z }), $.push({ id: Z, cell: Q, type: L }));
  }
  if (!ki(a)) {
    const I = V();
    I && (d[I.y][I.x].event = { kind: 'cookingSpot', spotId: 'cook_0' });
  }
  return {
    depth: a,
    width: c,
    height: r,
    cells: d,
    encounterTable: `band_${A}`,
    foeSpawns: w,
    gatheringPoints: $,
    bgmId: ki(a) ? 'bgm_boss' : 'bgm_dungeon',
  };
}
function iy(a, u) {
  var o;
  for (let c = 0; c < a.height; c++)
    for (let r = 0; r < a.width; r++)
      if (((o = a.cells[c][r].event) == null ? void 0 : o.kind) === u) return { x: r, y: c };
  return null;
}
const Nb = 4294967296;
function kb(a, u) {
  let o = 3735928559 ^ a,
    c = 1103547991 ^ a;
  for (let r = 0; r < u.length; r++) {
    const d = u.charCodeAt(r);
    ((o = Math.imul(o ^ d, 2654435761)), (c = Math.imul(c ^ d, 1597334677)));
  }
  return (
    (o = Math.imul(o ^ (o >>> 16), 2246822507) ^ Math.imul(c ^ (c >>> 13), 3266489909)),
    (c = Math.imul(c ^ (c >>> 16), 2246822507) ^ Math.imul(o ^ (o >>> 13), 3266489909)),
    (c >>> 0) ^ (o >>> 0)
  );
}
class Br {
  constructor(u, o) {
    Uo(this, 'baseSeed');
    Uo(this, '_state');
    ((this._state = u >>> 0), (this.baseSeed = (o ?? u) >>> 0));
  }
  get state() {
    return this._state;
  }
  next() {
    this._state = (this._state + 1831565813) >>> 0;
    let u = this._state;
    return (
      (u = Math.imul(u ^ (u >>> 15), u | 1)),
      (u ^= u + Math.imul(u ^ (u >>> 7), u | 61)),
      ((u ^ (u >>> 14)) >>> 0) / Nb
    );
  }
  int(u) {
    return u <= 0 ? 0 : Math.floor(this.next() * u);
  }
  range(u, o) {
    o < u && ([u, o] = [o, u]);
    const c = o - u + 1;
    return u + this.int(c);
  }
  pick(u) {
    if (u.length === 0) throw new Error('Rng.pick: 空配列は選択できません');
    return u[this.int(u.length)];
  }
  fork(u) {
    const o = kb(this.baseSeed, u);
    return new Br(o, o);
  }
}
function Mn(a) {
  return new Br(a, a);
}
function Ab() {
  return Math.floor(Math.random() * 4294967296) >>> 0;
}
const os = (a, u) => `${a},${u}`;
function Cb(a, u) {
  return Mn(a).fork(`floor:${u}`);
}
function uy(a, u) {
  const o = a.towerState.floors[u];
  if (o) return { save: a, floor: o };
  const c = Tb(u, Cb(a.masterSeed, u)),
    r = c.foeSpawns.map((v) => ({
      spawnId: v.id,
      cell: { ...v.startCell },
      defeated: !1,
      alerted: !1,
    })),
    d = {
      depth: u,
      seed: a.masterSeed,
      generated: c,
      isBossFloor: ki(u),
      encounterTier: Math.floor((u - 1) / 10),
      foeRuntime: r,
      openedChests: [],
      depletedGathers: [],
      consumedEvents: [],
    };
  return {
    save: { ...a, towerState: { ...a.towerState, floors: { ...a.towerState.floors, [u]: d } } },
    floor: d,
  };
}
function Mb(a) {
  const u = [...a.guild.party.front, ...a.guild.party.back].filter((c) => c !== null),
    o = [];
  for (const c of u) {
    const r = a.guild.members.find((m) => m.id === c);
    if (!r) continue;
    const d = wi(r);
    o.push({ charId: c, hp: d.hp, tp: d.tp, unionGauge: 0, ailments: [] });
  }
  return o;
}
function rs(a, u, o, c) {
  const r = a.towerState.floors[u].generated,
    d = new Set(a.exploredCells[u] ?? []);
  d.add(os(o, c));
  for (const m of Dr(r, o, c)) {
    const v = o + (m === 'E' ? 1 : m === 'W' ? -1 : 0),
      _ = c + (m === 'S' ? 1 : m === 'N' ? -1 : 0);
    d.add(os(v, _));
  }
  return { ...a, exploredCells: { ...a.exploredCells, [u]: [...d] } };
}
function sy(a, u, o) {
  var _, g;
  const c = uy(a, u);
  let r = c.save;
  const d = c.floor.generated,
    m = iy(d, 'stairsDown') ?? { x: 0, y: 0 },
    v = Dr(d, m.x, m.y)[0] ?? 'N';
  return (
    u > r.towerState.record.deepestReached &&
      (r = {
        ...r,
        towerState: { ...r.towerState, record: { ...r.towerState.record, deepestReached: u } },
      }),
    (r = {
      ...r,
      diveState: {
        depth: u,
        pos: { x: m.x, y: m.y },
        dir: v,
        party: ((_ = r.diveState) == null ? void 0 : _.party) ?? Mb(r),
        persistentSummons: ((g = r.diveState) == null ? void 0 : g.persistentSummons) ?? [],
        encounter: { stepsUntilEncounter: wr(o) },
        pendingFoeBattle: null,
      },
    }),
    rs(r, u, m.x, m.y)
  );
}
function Rb(a, u = 1) {
  const o = Mn(a.masterSeed).fork(`dive:${a.towerState.record.totalDives}`),
    c = {
      ...a,
      diveState: null,
      towerState: {
        ...a.towerState,
        record: { ...a.towerState.record, totalDives: a.towerState.record.totalDives + 1 },
      },
    };
  return sy(c, u, o);
}
function cy(a, u) {
  return a.diveState ? { ...a, diveState: { ...a.diveState, dir: u } } : a;
}
function oy(a, u, o) {
  const c = a.towerState.floors[u];
  return {
    ...a,
    towerState: {
      ...a.towerState,
      floors: { ...a.towerState.floors, [u]: { ...c, foeRuntime: o } },
    },
  };
}
function jb(a, u, o) {
  const c = a.diveState;
  if (!c) return { save: a, moved: !1, triggered: !1 };
  const r = a.towerState.floors[c.depth],
    d = r.generated,
    m = yb(d, c.pos, u);
  if (!m) return { save: cy(a, u), moved: !1, triggered: !1 };
  const v = r.foeRuntime.find((S) => !S.defeated && S.cell.x === m.x && S.cell.y === m.y);
  if (v) {
    const S = d.foeSpawns.find((x) => x.id === v.spawnId),
      C = S ? { spawnId: v.spawnId, enemyId: S.enemyId, firstStrike: 'preemptive' } : null;
    let R = { ...a, diveState: { ...c, pos: m, dir: u, pendingFoeBattle: C } };
    return ((R = rs(R, c.depth, m.x, m.y)), { save: R, moved: !0, triggered: C !== null });
  }
  const _ = db(c.encounter.stepsUntilEncounter, o);
  let g = {
    ...a,
    diveState: {
      ...c,
      pos: m,
      dir: u,
      encounter: { stepsUntilEncounter: _.stepsUntilEncounter },
      pendingFoeBattle: null,
    },
  };
  g = rs(g, c.depth, m.x, m.y);
  const y = gb(d, r.foeRuntime, m, u, o);
  return (
    (g = oy(g, c.depth, y.foes)),
    y.contact
      ? ((g = {
          ...g,
          diveState: {
            ...g.diveState,
            pendingFoeBattle: {
              spawnId: y.contact.spawnId,
              enemyId: y.contact.enemyId,
              firstStrike: y.contact.firstStrike,
            },
          },
        }),
        { save: g, moved: !0, triggered: !0 })
      : { save: g, moved: !0, triggered: _.triggered }
  );
}
function Ob(a, u) {
  const o = a.diveState;
  if (!o) return a;
  const c = o.pendingFoeBattle;
  let r = { ...a, diveState: { ...o, pendingFoeBattle: null } };
  if (c && u) {
    const m = r.towerState.floors[o.depth].foeRuntime.map((v) =>
      v.spawnId === c.spawnId ? { ...v, defeated: !0 } : v
    );
    r = oy(r, o.depth, m);
  }
  return r;
}
function fp(a) {
  const u = a.diveState;
  if (!u) return null;
  const o = a.towerState.floors[u.depth].generated.cells[u.pos.y][u.pos.x].event;
  return (o == null ? void 0 : o.kind) === 'stairsUp' ||
    (o == null ? void 0 : o.kind) === 'stairsDown'
    ? o.kind
    : null;
}
function zb(a) {
  if (!a.diveState) return a;
  const u = a.diveState.depth + 1,
    o = Mn(a.masterSeed).fork(`enc:${u}:${a.towerState.record.totalDives}`);
  return sy(a, u, o);
}
function wb(a) {
  if (!a.diveState) return a;
  const u = a.diveState.depth;
  if (u <= 1) return Mi(a);
  const o = u - 1,
    c = uy(a, o),
    r = iy(c.floor.generated, 'stairsUp') ?? { x: 0, y: 0 },
    d = Mn(a.masterSeed).fork(`enc:${o}:${a.towerState.record.totalDives}`);
  let m = c.save;
  const v = c.floor.generated,
    _ = Dr(v, r.x, r.y)[0] ?? 'N';
  return (
    (m = {
      ...m,
      diveState: {
        ...m.diveState,
        depth: o,
        pos: { x: r.x, y: r.y },
        dir: _,
        encounter: { stepsUntilEncounter: wr(d) },
        pendingFoeBattle: null,
      },
    }),
    rs(m, o, r.x, r.y)
  );
}
function Mi(a) {
  return { ...a, diveState: null };
}
const Db = { 10: 'enemy_boss_gatekeeper' };
function Bb(a) {
  const u = Math.floor((a - 1) / 10);
  return Object.values(Rn)
    .filter((o) => o.tierBand === u && !o.id.startsWith('enemy_boss'))
    .map((o) => o.id);
}
function Ub(a, u) {
  if (ki(a)) {
    const r = Db[a];
    if (r) return [r];
  }
  const o = Bb(a);
  if (o.length === 0) return [];
  const c = u.range(1, 3);
  return Array.from({ length: c }, () => u.pick(o));
}
const Na = {
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
function Lb() {
  return Object.values(Na)
    .filter((a) => a.unlockedByDefault)
    .map((a) => a.id);
}
const as = 1,
  Hb = { autoMap: 'on', bgmVolume: 0.6, seVolume: 0.6 };
function dp() {
  return { monsters: {}, items: {} };
}
function qb() {
  return { deepestReached: 0, highestBossDefeated: 0, totalDives: 0, bossDefeatLog: [] };
}
const Gb = () => ({ weapon: null, armor: null, accessory: null });
function Yb() {
  return `char_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function ry(a) {
  var v;
  const { raceId: u, classId: o, name: c, id: r } = a;
  if (!Zt[u]) throw new Error(`createCharacter: 未定義の種族 "${u}"`);
  if (!ht[o]) throw new Error(`createCharacter: 未定義の職業 "${o}"`);
  const d = (v = ht[o].skillTree.skills[0]) == null ? void 0 : v.skillId,
    m = d ? { [d]: 1 } : {};
  return {
    id: r ?? Yb(),
    name: c,
    raceId: u,
    classId: o,
    titleId: null,
    level: 1,
    exp: 0,
    skillPoints: { total: 0, spent: 0 },
    learnedSkills: m,
    equipment: Gb(),
  };
}
function Xb() {
  return { front: Array(hs).fill(null), back: Array(ps).fill(null) };
}
function $b(a, u) {
  const o = a.front.indexOf(null);
  if (o !== -1) {
    const r = [...a.front];
    return ((r[o] = u), { ...a, front: r });
  }
  const c = a.back.indexOf(null);
  if (c !== -1) {
    const r = [...a.back];
    return ((r[c] = u), { ...a, back: r });
  }
  return a;
}
function Vb(a, u) {
  return a.guild.members.length >= ir
    ? a
    : {
        ...a,
        guild: { ...a.guild, members: [...a.guild.members, u], party: $b(a.guild.party, u.id) },
      };
}
function Qb(a) {
  return {
    schemaVersion: as,
    savedAt: 0,
    masterSeed: Ab(),
    settings: { ...Hb },
    guild: {
      name: a,
      gold: Y1,
      members: [],
      party: Xb(),
      storage: [],
      foodStorage: [],
      bestiary: dp(),
    },
    towerState: { floors: {}, bossGates: {}, warp: { unlockedCheckpoints: [] }, record: qb() },
    diveState: null,
    bestiary: dp(),
    playerMaps: {},
    exploredCells: {},
    forgeInventory: { fragments: {}, ingots: { copper: 0, silver: 0, gold: 0 } },
    shopStock: { unlockedTier: 0, unlockedItemIds: [] },
    unlockedRecipeIds: Lb(),
    flags: {},
  };
}
const or = (a, u) => u.some((o) => a instanceof o);
let mp, hp;
function Kb() {
  return mp || (mp = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function Zb() {
  return (
    hp ||
    (hp = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const rr = new WeakMap(),
  Fo = new WeakMap(),
  _s = new WeakMap();
function Ib(a) {
  const u = new Promise((o, c) => {
    const r = () => {
        (a.removeEventListener('success', d), a.removeEventListener('error', m));
      },
      d = () => {
        (o(Cn(a.result)), r());
      },
      m = () => {
        (c(a.error), r());
      };
    (a.addEventListener('success', d), a.addEventListener('error', m));
  });
  return (_s.set(u, a), u);
}
function Jb(a) {
  if (rr.has(a)) return;
  const u = new Promise((o, c) => {
    const r = () => {
        (a.removeEventListener('complete', d),
          a.removeEventListener('error', m),
          a.removeEventListener('abort', m));
      },
      d = () => {
        (o(), r());
      },
      m = () => {
        (c(a.error || new DOMException('AbortError', 'AbortError')), r());
      };
    (a.addEventListener('complete', d),
      a.addEventListener('error', m),
      a.addEventListener('abort', m));
  });
  rr.set(a, u);
}
let fr = {
  get(a, u, o) {
    if (a instanceof IDBTransaction) {
      if (u === 'done') return rr.get(a);
      if (u === 'store')
        return o.objectStoreNames[1] ? void 0 : o.objectStore(o.objectStoreNames[0]);
    }
    return Cn(a[u]);
  },
  set(a, u, o) {
    return ((a[u] = o), !0);
  },
  has(a, u) {
    return a instanceof IDBTransaction && (u === 'done' || u === 'store') ? !0 : u in a;
  },
};
function fy(a) {
  fr = a(fr);
}
function Wb(a) {
  return Zb().includes(a)
    ? function (...u) {
        return (a.apply(dr(this), u), Cn(this.request));
      }
    : function (...u) {
        return Cn(a.apply(dr(this), u));
      };
}
function Fb(a) {
  return typeof a == 'function'
    ? Wb(a)
    : (a instanceof IDBTransaction && Jb(a), or(a, Kb()) ? new Proxy(a, fr) : a);
}
function Cn(a) {
  if (a instanceof IDBRequest) return Ib(a);
  if (Fo.has(a)) return Fo.get(a);
  const u = Fb(a);
  return (u !== a && (Fo.set(a, u), _s.set(u, a)), u);
}
const dr = (a) => _s.get(a);
function Pb(a, u, { blocked: o, upgrade: c, blocking: r, terminated: d } = {}) {
  const m = indexedDB.open(a, u),
    v = Cn(m);
  return (
    c &&
      m.addEventListener('upgradeneeded', (_) => {
        c(Cn(m.result), _.oldVersion, _.newVersion, Cn(m.transaction), _);
      }),
    o && m.addEventListener('blocked', (_) => o(_.oldVersion, _.newVersion, _)),
    v
      .then((_) => {
        (d && _.addEventListener('close', () => d()),
          r && _.addEventListener('versionchange', (g) => r(g.oldVersion, g.newVersion, g)));
      })
      .catch(() => {}),
    v
  );
}
const eS = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  tS = ['put', 'add', 'delete', 'clear'],
  Po = new Map();
function pp(a, u) {
  if (!(a instanceof IDBDatabase && !(u in a) && typeof u == 'string')) return;
  if (Po.get(u)) return Po.get(u);
  const o = u.replace(/FromIndex$/, ''),
    c = u !== o,
    r = tS.includes(o);
  if (!(o in (c ? IDBIndex : IDBObjectStore).prototype) || !(r || eS.includes(o))) return;
  const d = async function (m, ...v) {
    const _ = this.transaction(m, r ? 'readwrite' : 'readonly');
    let g = _.store;
    return (c && (g = g.index(v.shift())), (await Promise.all([g[o](...v), r && _.done]))[0]);
  };
  return (Po.set(u, d), d);
}
fy((a) => ({
  ...a,
  get: (u, o, c) => pp(u, o) || a.get(u, o, c),
  has: (u, o) => !!pp(u, o) || a.has(u, o),
}));
const lS = ['continue', 'continuePrimaryKey', 'advance'],
  yp = {},
  mr = new WeakMap(),
  dy = new WeakMap(),
  nS = {
    get(a, u) {
      if (!lS.includes(u)) return a[u];
      let o = yp[u];
      return (
        o ||
          (o = yp[u] =
            function (...c) {
              mr.set(this, dy.get(this)[u](...c));
            }),
        o
      );
    },
  };
async function* aS(...a) {
  let u = this;
  if ((u instanceof IDBCursor || (u = await u.openCursor(...a)), !u)) return;
  u = u;
  const o = new Proxy(u, nS);
  for (dy.set(o, u), _s.set(o, dr(u)); u; )
    (yield o, (u = await (mr.get(o) || u.continue())), mr.delete(o));
}
function gp(a, u) {
  return (
    (u === Symbol.asyncIterator && or(a, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (u === 'iterate' && or(a, [IDBIndex, IDBObjectStore]))
  );
}
fy((a) => ({
  ...a,
  get(u, o, c) {
    return gp(u, o) ? aS : a.get(u, o, c);
  },
  has(u, o) {
    return gp(u, o) || a.has(u, o);
  },
}));
const iS = {};
function uS(a) {
  return structuredClone(a);
}
function Ei(a) {
  return typeof a == 'object' && a !== null && !Array.isArray(a);
}
function sS(a) {
  if (
    !Ei(a) ||
    typeof a.schemaVersion != 'number' ||
    typeof a.masterSeed != 'number' ||
    !Ei(a.guild)
  )
    return !1;
  const u = a.guild;
  return !(
    typeof u.name != 'string' ||
    !Array.isArray(u.members) ||
    !Ei(a.towerState) ||
    !Ei(a.towerState.record) ||
    typeof a.towerState.record.deepestReached != 'number'
  );
}
function my(a) {
  if (!Ei(a) || typeof a.schemaVersion != 'number')
    return { ok: !1, reason: 'セーブデータの構造が不正です' };
  let u = a.schemaVersion;
  if (u > as) return { ok: !1, reason: `未知のバージョン (${u} > ${as}) のセーブデータです` };
  let o = { ...a };
  for (; u < as; ) {
    const c = iS[u];
    if (!c) return { ok: !1, reason: `バージョン ${u} の migration が未定義です` };
    ((o = c(o)), (u = typeof o.schemaVersion == 'number' ? o.schemaVersion : u + 1));
  }
  return sS(o)
    ? { ok: !0, data: o }
    : { ok: !1, reason: 'migration 後のデータが SaveData の形をしていません' };
}
function cS(a) {
  return {
    guildName: a.guild.name,
    deepestReached: a.towerState.record.deepestReached,
    memberCount: a.guild.members.length,
    savedAt: a.savedAt,
  };
}
function _p() {
  return {
    guildName: '(破損データ)',
    deepestReached: 0,
    memberCount: 0,
    savedAt: 0,
    corrupted: !0,
  };
}
const oS = 'sekaiju-like-game',
  rS = 1,
  Ri = 'saves',
  Ur = 'main';
let er = null;
function Lr() {
  return (
    er ||
      (er = Pb(oS, rS, {
        upgrade(a) {
          a.objectStoreNames.contains(Ri) || a.createObjectStore(Ri);
        },
      })),
    er
  );
}
async function tr(a) {
  const u = { ...a, savedAt: Date.now() };
  return (await (await Lr()).put(Ri, uS(u), Ur), u);
}
async function fS() {
  const u = await (await Lr()).get(Ri, Ur);
  return u === void 0 ? { ok: !1, reason: 'empty' } : my(u);
}
async function dS() {
  const u = await (await Lr()).get(Ri, Ur);
  if (u === void 0) return null;
  const o = my(u);
  if (!o.ok) return _p();
  try {
    return cS(o.data);
  } catch {
    return _p();
  }
}
const hy = { save: null, saving: !1 };
function mS(a, u) {
  switch (u.type) {
    case 'load':
      return { ...a, save: u.save };
    case 'updateSave':
      return a.save ? { ...a, save: u.updater(a.save) } : a;
    case 'setSave':
      return { ...a, save: u.save };
    case 'saving':
      return { ...a, saving: u.saving };
    case 'clear':
      return { ...hy };
  }
}
const py = N.createContext(null);
function hS(a) {
  const u = N.useRef(a);
  return ((u.current = a), u);
}
function pS({ children: a }) {
  const [u, o] = N.useReducer(mS, hy),
    c = hS(u),
    r = N.useCallback(async (S) => {
      const C = Qb(S),
        R = await tr(C);
      o({ type: 'load', save: R });
    }, []),
    d = N.useCallback(async () => {
      const S = await fS();
      return S.ok ? (o({ type: 'load', save: S.data }), { ok: !0 }) : { ok: !1, reason: S.reason };
    }, []),
    m = N.useCallback((S) => {
      o({ type: 'updateSave', updater: S });
    }, []),
    v = N.useCallback(
      async (S) => {
        const C = c.current.save;
        if (!C) return;
        const R = S(C);
        (o({ type: 'setSave', save: R }), o({ type: 'saving', saving: !0 }));
        try {
          const x = await tr(R);
          o({ type: 'setSave', save: x });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      },
      [c]
    ),
    _ = N.useCallback(async () => {
      const { save: S } = c.current;
      if (S) {
        o({ type: 'saving', saving: !0 });
        try {
          const C = await tr(S);
          o({ type: 'setSave', save: C });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      }
    }, [c]),
    g = N.useCallback(() => {
      o({ type: 'clear' });
    }, []),
    y = N.useMemo(
      () => ({
        ...u,
        startNewGame: r,
        continueGame: d,
        applySave: m,
        applyAndPersist: v,
        persist: _,
        exitToTitle: g,
      }),
      [u, r, d, m, v, _, g]
    );
  return p.jsx(py.Provider, { value: y, children: a });
}
function jn() {
  const a = N.useContext(py);
  if (!a) throw new Error('useGameState は GameStateProvider の内側で使ってください');
  return a;
}
const yS = () => {
    var at, Xe;
    const a = Ol(),
      { save: u, applyAndPersist: o } = jn(),
      c = N.useRef(null),
      [r, d] = N.useState(null),
      [m, v] = N.useState({}),
      [_, g] = N.useState(null),
      [y, S] = N.useState(!1),
      [C, R] = N.useState(!1),
      [x, j] = N.useState(null),
      [b, A] = N.useState(!1),
      [w, $] = N.useState(null),
      [V, K] = N.useState(null);
    N.useEffect(() => {
      if (r || !(u != null && u.diveState)) return;
      const G = u.diveState.depth,
        oe = (u.masterSeed ^ (G * 2654435761) ^ (u.towerState.record.totalDives * 40503)) >>> 0;
      c.current = Mn(oe);
      const de = u.diveState.pendingFoeBattle;
      d(de ? ip(u, [de.enemyId], de.firstStrike) : ip(u, Ub(G, c.current)));
    }, [u, r]);
    const I = N.useRef(!1);
    N.useEffect(() => {
      !r ||
        !c.current ||
        I.current ||
        (r.turn === 1 &&
          r.firstStrike === 'ambush' &&
          r.outcome === 'ongoing' &&
          ((I.current = !0), d(Jo(r, [], c.current))));
    }, [r]);
    const Q = N.useMemo(() => (r == null ? void 0 : r.enemies.filter((G) => !G.isDown)) ?? [], [r]),
      L = N.useMemo(() => (r == null ? void 0 : r.allies.filter((G) => !G.isDown)) ?? [], [r]);
    (N.useEffect(() => {
      Q.length > 0 && !Q.some((G) => G.id === x) && j(Q[0].id);
    }, [Q, x]),
      N.useEffect(() => {
        if ((r == null ? void 0 : r.outcome) !== 'ongoing' || (_ && L.some((oe) => oe.id === _)))
          return;
        const G = L.find((oe) => !m[oe.id]) ?? null;
        g(G ? G.id : null);
      }, [r, L, _, m]));
    const Z = L.length > 0 && L.every((G) => m[G.id] !== void 0),
      ae = N.useCallback(
        (G, oe) => {
          const de = { ...m, [G]: oe };
          (v(de), S(!1), R(!1));
          const je = L.find((Ae) => Ae.id !== G && !de[Ae.id]);
          g(je ? je.id : null);
        },
        [m, L]
      ),
      ce = N.useCallback(
        async (G) => {
          A(!0);
          const oe = G.outcome === 'win';
          G.outcome === 'lose'
            ? (await o((de) => Mi(cp(de, G))), a('/town'))
            : (await o((de) => Ob(cp(de, G), oe)), a('/dungeon'));
        },
        [o, a]
      ),
      ue = N.useCallback(() => {
        var G;
        (v({}), S(!1), R(!1), $(null), K(null), g(((G = L[0]) == null ? void 0 : G.id) ?? null));
      }, [L]),
      W = N.useCallback(() => {
        var je;
        if (!r || !c.current || r.outcome !== 'ongoing') return;
        const G = x ?? ((je = Q[0]) == null ? void 0 : je.id) ?? '',
          oe = L.map((Ae) => {
            const yt = m[Ae.id] ?? { kind: 'attack' };
            return yt.kind === 'guard'
              ? { kind: 'guard', actorId: Ae.id }
              : yt.kind === 'skill'
                ? { kind: 'skill', actorId: Ae.id, skillId: yt.skillId, targetId: G }
                : yt.kind === 'item'
                  ? { kind: 'item', actorId: Ae.id, itemId: yt.itemId, targetId: Ae.id }
                  : { kind: 'attack', actorId: Ae.id, targetId: G };
          });
        if (w) {
          const Ae = Ti[w.unionSkillId],
            yt =
              (Ae == null ? void 0 : Ae.target) === 'enemyOne' ||
              (Ae == null ? void 0 : Ae.target) === 'enemyRow' ||
              (Ae == null ? void 0 : Ae.target) === 'enemyAll';
          oe.unshift({ kind: 'union', ...w, targetId: yt ? G : w.targetId });
        }
        const de = Jo(r, oe, c.current);
        (d(de), v({}), S(!1), R(!1), $(null), K(null), g(null));
      }, [r, m, x, L, Q, w]),
      F = N.useCallback(() => {
        if (!r || !c.current || r.outcome !== 'ongoing') return;
        const G = L[0];
        G && (d(Jo(r, [{ kind: 'flee', actorId: G.id }], c.current)), v({}), g(null));
      }, [r, L]);
    if (!u || !u.diveState) return p.jsx(jl, { to: '/town', replace: !0 });
    if (!r) return p.jsx('div', { className: ee.layout, children: '戦闘準備中...' });
    const he = (G) => {
        const oe = u.guild.members.find((de) => de.id === G.id);
        return oe
          ? Object.keys(oe.learnedSkills).filter((de) => de in cn && G.tp >= cn[de].tpCost(1))
          : [];
      },
      U = () => {
        const G = (de) =>
            Object.values(m).filter((je) => je.kind === 'item' && je.itemId === de).length,
          oe = (de) => r.consumedItems.filter((je) => je === de).length;
        return u.guild.storage
          .filter((de) => {
            var je, Ae;
            return (Ae = (je = lt[de.itemId]) == null ? void 0 : je.useContext) == null
              ? void 0
              : Ae.includes('battle');
          })
          .map((de) => ({
            id: de.itemId,
            remaining: Ar(u, de.itemId) - oe(de.itemId) - G(de.itemId),
          }))
          .filter((de) => de.remaining > 0);
      },
      J = (G) => {
        var de, je;
        const oe = m[G.id];
        return oe
          ? oe.kind === 'attack'
            ? '攻撃'
            : oe.kind === 'guard'
              ? '防御'
              : oe.kind === 'item'
                ? (((de = lt[oe.itemId]) == null ? void 0 : de.name) ?? 'どうぐ')
                : (((je = cn[oe.skillId]) == null ? void 0 : je.name) ?? 'スキル')
          : '';
      },
      te = (G) => {
        const oe = (je) => je === 'headBind' || je === 'armBind' || je === 'legBind';
        let de = '';
        return (
          G.ailments.some((je) => oe(je.type)) && (de += ' 🔒'),
          G.ailments.some((je) => !oe(je.type)) && (de += ' 🌀'),
          de
        );
      },
      ge = (G) => {
        var je;
        const oe = u.guild.members.find((Ae) => Ae.id === G.id);
        if (!oe) return null;
        const de = (je = Zt[oe.raceId]) == null ? void 0 : je.unionSkillTree.skills[0];
        return !de || !(de.skillId in oe.learnedSkills) ? null : (Ti[de.skillId] ?? null);
      },
      Ee = (G, oe, de) => {
        var yt;
        const Ae =
          oe.target === 'enemyOne' || oe.target === 'enemyRow' || oe.target === 'enemyAll'
            ? (x ?? ((yt = Q[0]) == null ? void 0 : yt.id) ?? '')
            : G;
        ($({ actorId: G, unionSkillId: oe.id, participantIds: de, targetId: Ae }), K(null));
      },
      k = (G, oe) => {
        oe.requiredParticipants <= 1 ? Ee(G.id, oe, [G.id]) : K({ actorId: G.id, def: oe });
      },
      q = _ ? L.find((G) => G.id === _) : void 0,
      P = ((at = r.enemies.find((G) => G.id === x)) == null ? void 0 : at.name) ?? '-',
      le = ly(r),
      pe = (G) =>
        p.jsxs(
          'button',
          {
            type: 'button',
            className: [
              ee.card,
              G.isDown ? ee.down : '',
              _ === G.id ? ee.cardActive : '',
              m[G.id] ? ee.cardDecided : '',
            ].join(' '),
            disabled: G.isDown || r.outcome !== 'ongoing',
            onClick: () => {
              (g(G.id), S(!1), R(!1));
            },
            children: [
              p.jsxs('div', {
                className: ee.cardName,
                children: [
                  G.name,
                  G.unionGauge >= 100 ? p.jsx('span', { className: ee.uni, children: '★' }) : null,
                  te(G),
                ],
              }),
              p.jsx(Pu, { value: G.hp, max: G.maxHp, color: '#4caf50', showValue: !1 }),
              p.jsx(Pu, { value: G.tp, max: G.maxTp, color: '#2196f3', showValue: !1 }),
              p.jsxs('div', {
                className: ee.cardNums,
                children: ['HP ', Math.max(0, G.hp), ' · TP ', G.tp],
              }),
              m[G.id] ? p.jsxs('div', { className: ee.cardCmd, children: ['▶ ', J(G)] }) : null,
            ],
          },
          G.id
        ),
      be = r.allies.filter((G) => G.row === 'front'),
      Ce = r.allies.filter((G) => G.row === 'back');
    return p.jsxs('div', {
      className: ee.layout,
      children: [
        p.jsx('div', {
          className: ee.enemies,
          children: r.enemies.map((G) =>
            p.jsxs(
              'button',
              {
                type: 'button',
                className: `${ee.enemy} ${G.isDown ? ee.down : ''} ${x === G.id ? ee.targeted : ''}`,
                disabled: G.isDown,
                onClick: () => j(G.id),
                children: [
                  p.jsxs('span', { className: ee.enemyName, children: [G.name, te(G)] }),
                  p.jsx(Pu, { value: G.hp, max: G.maxHp, color: '#e57373', showValue: !1 }),
                ],
              },
              G.id
            )
          ),
        }),
        r.summons.length > 0
          ? p.jsx('div', {
              className: ee.summons,
              children: r.summons.map((G) =>
                p.jsxs(
                  'div',
                  {
                    className: `${ee.summon} ${G.isDown ? ee.down : ''}`,
                    children: [
                      p.jsxs('span', { className: ee.summonName, children: ['🐾 ', G.name] }),
                      p.jsx(Pu, { value: G.hp, max: G.maxHp, color: '#8d6e63', showValue: !1 }),
                      p.jsxs('span', {
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
        p.jsxs('div', {
          className: ee.party,
          children: [
            p.jsx('div', { className: ee.rowTag, children: '前衛' }),
            p.jsx('div', { className: ee.cardRow, children: be.map(pe) }),
            p.jsx('div', { className: ee.rowTag, children: '後衛（近接ダメージ -30%）' }),
            p.jsx('div', {
              className: ee.cardRow,
              children:
                Ce.length > 0
                  ? Ce.map(pe)
                  : p.jsx('div', { className: ee.empty, children: '（なし）' }),
            }),
          ],
        }),
        r.outcome !== 'ongoing'
          ? p.jsxs('div', {
              className: ee.result,
              children: [
                p.jsx('div', {
                  className: ee.resultTitle,
                  children:
                    r.outcome === 'win' ? '勝利！' : r.outcome === 'fled' ? '逃走した' : '全滅...',
                }),
                r.outcome === 'win'
                  ? p.jsxs('div', {
                      className: ee.resultBody,
                      children: ['経験値 ', le.exp, ' ／ ', le.gold, ' G を獲得'],
                    })
                  : r.outcome === 'lose'
                    ? p.jsx('div', { className: ee.resultBody, children: '拠点へ帰還する' })
                    : null,
                p.jsx('button', {
                  type: 'button',
                  className: ee.primary,
                  disabled: b,
                  onClick: () => void ce(r),
                  children: 'つづける',
                }),
              ],
            })
          : p.jsxs('div', {
              className: ee.command,
              children: [
                p.jsxs('div', {
                  className: ee.target,
                  children: ['対象: ', P, '（敵をタップで変更）'],
                }),
                w
                  ? p.jsxs('div', {
                      className: ee.unionBanner,
                      children: [
                        '⚡ ユニオン予約: ',
                        (Xe = Ti[w.unionSkillId]) == null ? void 0 : Xe.name,
                        p.jsx('button', {
                          type: 'button',
                          className: ee.unionCancel,
                          onClick: () => $(null),
                          children: '取消',
                        }),
                      ],
                    })
                  : null,
                q
                  ? p.jsxs(p.Fragment, {
                      children: [
                        p.jsxs('div', { className: ee.cmdHead, children: [q.name, ' のコマンド'] }),
                        y
                          ? p.jsxs('div', {
                              className: ee.skillList,
                              children: [
                                he(q).map((G) => {
                                  var oe;
                                  return p.jsxs(
                                    'button',
                                    {
                                      type: 'button',
                                      className: ee.skillBtn,
                                      onClick: () => ae(q.id, { kind: 'skill', skillId: G }),
                                      children: [
                                        p.jsxs('span', {
                                          className: ee.skillTop,
                                          children: [
                                            p.jsx('span', {
                                              className: ee.skillName,
                                              children: cn[G].name,
                                            }),
                                            p.jsxs('span', {
                                              className: ee.tp,
                                              children: ['TP ', cn[G].tpCost(1)],
                                            }),
                                          ],
                                        }),
                                        p.jsx('span', {
                                          className: ee.skillDesc,
                                          children:
                                            ((oe = Nr[G]) == null ? void 0 : oe.description) ?? '',
                                        }),
                                      ],
                                    },
                                    G
                                  );
                                }),
                                he(q).length === 0
                                  ? p.jsx('div', {
                                      className: ee.empty,
                                      children: '使えるスキルがない',
                                    })
                                  : null,
                                p.jsx('button', {
                                  type: 'button',
                                  className: ee.menuBack,
                                  onClick: () => S(!1),
                                  children: 'もどる',
                                }),
                              ],
                            })
                          : C
                            ? p.jsxs('div', {
                                className: ee.skillList,
                                children: [
                                  U().map(({ id: G, remaining: oe }) =>
                                    p.jsxs(
                                      'button',
                                      {
                                        type: 'button',
                                        className: ee.skillBtn,
                                        onClick: () => ae(q.id, { kind: 'item', itemId: G }),
                                        children: [
                                          p.jsx('span', {
                                            className: ee.skillTop,
                                            children: p.jsxs('span', {
                                              className: ee.skillName,
                                              children: [lt[G].name, ' ×', oe],
                                            }),
                                          }),
                                          p.jsx('span', {
                                            className: ee.skillDesc,
                                            children: lt[G].description,
                                          }),
                                        ],
                                      },
                                      G
                                    )
                                  ),
                                  U().length === 0
                                    ? p.jsx('div', {
                                        className: ee.empty,
                                        children: '使える道具がない',
                                      })
                                    : null,
                                  p.jsx('button', {
                                    type: 'button',
                                    className: ee.menuBack,
                                    onClick: () => R(!1),
                                    children: 'もどる',
                                  }),
                                ],
                              })
                            : V
                              ? p.jsxs('div', {
                                  className: ee.skillList,
                                  children: [
                                    p.jsxs('div', {
                                      className: ee.unionHint,
                                      children: [
                                        V.def.name,
                                        '：協力者を選択（あと',
                                        V.def.requiredParticipants - 1,
                                        '人。各自ゲージ',
                                        V.def.gaugeCostPerParticipant,
                                        '消費）',
                                      ],
                                    }),
                                    L.filter((G) => G.id !== V.actorId).map((G) =>
                                      p.jsx(
                                        'button',
                                        {
                                          type: 'button',
                                          className: ee.skillBtn,
                                          onClick: () => Ee(V.actorId, V.def, [V.actorId, G.id]),
                                          children: p.jsxs('span', {
                                            className: ee.skillTop,
                                            children: [
                                              p.jsx('span', {
                                                className: ee.skillName,
                                                children: G.name,
                                              }),
                                              p.jsxs('span', {
                                                className: ee.tp,
                                                children: ['ゲージ ', G.unionGauge],
                                              }),
                                            ],
                                          }),
                                        },
                                        G.id
                                      )
                                    ),
                                    L.filter((G) => G.id !== V.actorId).length === 0
                                      ? p.jsx('div', {
                                          className: ee.empty,
                                          children: '協力できる味方がいない',
                                        })
                                      : null,
                                    p.jsx('button', {
                                      type: 'button',
                                      className: ee.menuBack,
                                      onClick: () => K(null),
                                      children: 'もどる',
                                    }),
                                  ],
                                })
                              : p.jsxs('div', {
                                  className: ee.menu,
                                  children: [
                                    p.jsx('button', {
                                      type: 'button',
                                      className: ee.menuBtn,
                                      onClick: () => ae(q.id, { kind: 'attack' }),
                                      children: '攻撃',
                                    }),
                                    p.jsx('button', {
                                      type: 'button',
                                      className: ee.menuBtn,
                                      onClick: () => ae(q.id, { kind: 'guard' }),
                                      children: '防御',
                                    }),
                                    p.jsx('button', {
                                      type: 'button',
                                      className: ee.menuBtn,
                                      disabled: he(q).length === 0,
                                      onClick: () => S(!0),
                                      children: 'スキル',
                                    }),
                                    p.jsx('button', {
                                      type: 'button',
                                      className: ee.menuBtn,
                                      disabled: U().length === 0,
                                      onClick: () => R(!0),
                                      children: 'どうぐ',
                                    }),
                                    (() => {
                                      const G = ge(q);
                                      return !G || q.unionGauge < 100 || w
                                        ? null
                                        : p.jsx('button', {
                                            type: 'button',
                                            className: `${ee.menuBtn} ${ee.unionBtn}`,
                                            onClick: () => k(q, G),
                                            children: '⚡ユニオン',
                                          });
                                    })(),
                                    p.jsx('button', {
                                      type: 'button',
                                      className: ee.menuBtn,
                                      onClick: F,
                                      children: '逃走',
                                    }),
                                  ],
                                }),
                      ],
                    })
                  : p.jsxs('div', {
                      className: ee.execRow,
                      children: [
                        p.jsx('button', {
                          type: 'button',
                          className: ee.redo,
                          onClick: ue,
                          children: 'やり直す',
                        }),
                        p.jsx('button', {
                          type: 'button',
                          className: ee.primary,
                          disabled: !Z,
                          onClick: W,
                          children: '実行',
                        }),
                      ],
                    }),
              ],
            }),
        p.jsx('div', {
          className: ee.log,
          children:
            r.log.length === 0
              ? p.jsxs('div', {
                  className: ee.logLine,
                  children: ['てきが あらわれた！（', r.turn, ' ターン目）'],
                })
              : r.log.map((G, oe) => p.jsx('div', { className: ee.logLine, children: G.text }, oe)),
        }),
      ],
    });
  },
  gS = '_layout_1pzx1_1',
  _S = '_head_1pzx1_13',
  vS = '_depth_1pzx1_22',
  bS = '_fpvWrap_1pzx1_39',
  SS = '_mapWrap_1pzx1_45',
  xS = '_palette_1pzx1_52',
  ES = '_tool_1pzx1_62',
  TS = '_toolActive_1pzx1_73',
  NS = '_paletteHint_1pzx1_79',
  kS = '_stairs_1pzx1_88',
  AS = '_action_1pzx1_102',
  CS = '_notice_1pzx1_119',
  MS = '_controls_1pzx1_127',
  RS = '_row_1pzx1_137',
  jS = '_forward_1pzx1_143',
  OS = '_turn_1pzx1_158',
  zS = '_back_1pzx1_172',
  wS = '_itemOverlay_1pzx1_183',
  DS = '_itemPanel_1pzx1_193',
  BS = '_itemTitle_1pzx1_206',
  US = '_itemEmpty_1pzx1_211',
  LS = '_itemRow_1pzx1_217',
  HS = '_itemName_1pzx1_225',
  qS = '_itemDesc_1pzx1_233',
  GS = '_itemTargets_1pzx1_239',
  YS = '_itemTarget_1pzx1_239',
  XS = '_itemHp_1pzx1_259',
  $S = '_itemUse_1pzx1_265',
  VS = '_itemClose_1pzx1_282',
  me = {
    layout: gS,
    head: _S,
    depth: vS,
    return: '_return_1pzx1_28',
    fpvWrap: bS,
    mapWrap: SS,
    palette: xS,
    tool: ES,
    toolActive: TS,
    paletteHint: NS,
    stairs: kS,
    action: AS,
    notice: CS,
    controls: MS,
    row: RS,
    forward: jS,
    turn: OS,
    back: zS,
    itemOverlay: wS,
    itemPanel: DS,
    itemTitle: BS,
    itemEmpty: US,
    itemRow: LS,
    itemName: HS,
    itemDesc: qS,
    itemTargets: GS,
    itemTarget: YS,
    itemHp: XS,
    itemUse: $S,
    itemClose: VS,
  },
  QS = '_canvas_1keax_1',
  KS = { canvas: QS },
  yy = [
    { id: 'icon_chest', symbol: '📦', label: '宝箱' },
    { id: 'icon_foe', symbol: '👹', label: '強敵(FOE)' },
    { id: 'icon_warning', symbol: '⚠️', label: '注意' },
    { id: 'icon_door', symbol: '🚪', label: '扉/近道' },
    { id: 'icon_gather', symbol: '⛏️', label: '採集' },
    { id: 'icon_event', symbol: '❗', label: 'イベント' },
    { id: 'icon_note', symbol: '📝', label: 'メモ' },
    { id: 'icon_star', symbol: '⭐', label: '任意' },
  ],
  ZS = new Map(yy.map((a) => [a.id, a]));
function IS(a) {
  var u;
  return ((u = ZS.get(a)) == null ? void 0 : u.symbol) ?? '•';
}
const Qt = {
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
  JS = ({
    floor: a,
    explored: u,
    pos: o,
    dir: c,
    icons: r = [],
    foes: d = [],
    depletedGathers: m = [],
    maxCell: v = 26,
    onCellClick: _,
  }) => {
    const g = N.useRef(null),
      y = Math.max(10, Math.min(v, Math.floor(360 / a.width))),
      S = a.width * y,
      C = a.height * y;
    N.useEffect(() => {
      const x = g.current;
      if (!x) return;
      const j = new Set(u),
        b = new Set(m),
        A = window.devicePixelRatio || 1;
      ((x.width = S * A), (x.height = C * A));
      const w = x.getContext('2d');
      if (!w) return;
      (w.scale(A, A), w.clearRect(0, 0, S, C));
      for (let Z = 0; Z < a.height; Z++)
        for (let ae = 0; ae < a.width; ae++) {
          const ce = j.has(`${ae},${Z}`);
          ((w.fillStyle = ce ? Qt.floor : Qt.fog),
            w.fillRect(ae * y, Z * y, y, y),
            ce &&
              ((w.strokeStyle = Qt.grid),
              (w.lineWidth = 1),
              w.strokeRect(ae * y + 0.5, Z * y + 0.5, y - 1, y - 1)));
        }
      ((w.strokeStyle = Qt.wall), (w.lineWidth = 2), (w.lineCap = 'round'));
      const $ = (Z, ae, ce, ue) => {
        (w.beginPath(), w.moveTo(Z, ae), w.lineTo(ce, ue), w.stroke());
      };
      for (let Z = 0; Z < a.height; Z++)
        for (let ae = 0; ae < a.width; ae++) {
          if (!j.has(`${ae},${Z}`)) continue;
          const ce = a.cells[Z][ae],
            ue = ae * y,
            W = Z * y;
          (ce.walls.N && $(ue, W, ue + y, W),
            ce.walls.S && $(ue, W + y, ue + y, W + y),
            ce.walls.W && $(ue, W, ue, W + y),
            ce.walls.E && $(ue + y, W, ue + y, W + y));
          const F = ce.event;
          if (
            (F == null ? void 0 : F.kind) === 'stairsUp' ||
            (F == null ? void 0 : F.kind) === 'stairsDown'
          )
            ((w.fillStyle = F.kind === 'stairsUp' ? Qt.stairsUp : Qt.stairsDown),
              w.beginPath(),
              w.arc(ue + y / 2, W + y / 2, y * 0.28, 0, Math.PI * 2),
              w.fill(),
              (w.fillStyle = '#ffffff'),
              (w.font = `bold ${Math.floor(y * 0.5)}px sans-serif`),
              (w.textAlign = 'center'),
              (w.textBaseline = 'middle'),
              w.fillText(F.kind === 'stairsUp' ? '▲' : '▼', ue + y / 2, W + y / 2 + 1));
          else if ((F == null ? void 0 : F.kind) === 'gather') {
            const he = b.has(`${ae},${Z}`);
            ((w.fillStyle = he ? Qt.gatherDone : Qt.gather),
              w.beginPath(),
              w.arc(ue + y / 2, W + y / 2, y * 0.24, 0, Math.PI * 2),
              w.fill());
          } else
            (F == null ? void 0 : F.kind) === 'cookingSpot' &&
              ((w.fillStyle = Qt.cooking),
              w.fillRect(ue + y * 0.28, W + y * 0.28, y * 0.44, y * 0.44));
        }
      ((w.font = `${Math.floor(y * 0.66)}px sans-serif`),
        (w.textAlign = 'center'),
        (w.textBaseline = 'middle'));
      for (const Z of r)
        j.has(`${Z.x},${Z.y}`) && w.fillText(IS(Z.iconId), Z.x * y + y / 2, Z.y * y + y / 2 + 1);
      for (const Z of d) {
        if (!j.has(`${Z.x},${Z.y}`)) continue;
        const ae = Z.x * y + y / 2,
          ce = Z.y * y + y / 2;
        ((w.fillStyle = Z.alerted ? Qt.foeAlert : Qt.foe),
          w.beginPath(),
          w.arc(ae, ce, y * 0.3, 0, Math.PI * 2),
          w.fill(),
          (w.fillStyle = '#ffffff'),
          (w.font = `bold ${Math.floor(y * 0.5)}px sans-serif`),
          (w.textAlign = 'center'),
          (w.textBaseline = 'middle'),
          w.fillText('!', ae, ce + 1));
      }
      const V = o.x * y + y / 2,
        K = o.y * y + y / 2,
        I = y * 0.34,
        L = { N: -Math.PI / 2, E: 0, S: Math.PI / 2, W: Math.PI }[c];
      ((w.fillStyle = Qt.player),
        w.beginPath(),
        w.moveTo(V + Math.cos(L) * I, K + Math.sin(L) * I),
        w.lineTo(V + Math.cos(L + 2.5) * I, K + Math.sin(L + 2.5) * I),
        w.lineTo(V + Math.cos(L - 2.5) * I, K + Math.sin(L - 2.5) * I),
        w.closePath(),
        w.fill());
    }, [a, u, o, c, r, d, m, y, S, C]);
    const R = (x) => {
      if (!_) return;
      const j = x.currentTarget.getBoundingClientRect(),
        b = Math.floor(((x.clientX - j.left) / j.width) * a.width),
        A = Math.floor(((x.clientY - j.top) / j.height) * a.height);
      b >= 0 && A >= 0 && b < a.width && A < a.height && _(b, A);
    };
    return p.jsx('canvas', {
      ref: g,
      className: KS.canvas,
      style: { width: S, height: C },
      onClick: R,
    });
  },
  WS = '_gauge_1o2hx_1',
  FS = '_icon_1o2hx_11',
  PS = '_segments_1o2hx_16',
  e2 = '_seg_1o2hx_16',
  t2 = '_filled_1o2hx_28',
  l2 = '_danger_1o2hx_32',
  ga = { gauge: WS, icon: FS, segments: PS, seg: e2, filled: t2, danger: l2 },
  n2 = ({ level: a }) => {
    const u = a >= Ai;
    return p.jsxs('div', {
      className: ga.gauge,
      role: 'img',
      'aria-label': `エンカウントゲージ ${a}/${Ai}`,
      children: [
        p.jsx('span', { className: ga.icon, children: u ? '⚠' : '👣' }),
        p.jsx('div', {
          className: ga.segments,
          children: Array.from({ length: Ai }, (o, c) =>
            p.jsx(
              'span',
              { className: [ga.seg, c < a ? ga.filled : '', u ? ga.danger : ''].join(' ') },
              c
            )
          ),
        }),
      ],
    });
  },
  a2 = '_view_tw2v9_1',
  i2 = { view: a2 },
  vp = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } };
function u2(a, u, o, c = 4) {
  const r = ay(o),
    d = ny(o),
    m = [];
  let { x: v, y: _ } = u;
  for (let g = 0; g < c; g++) {
    const y = _a(a, v, _, o);
    if (
      (m.push({
        x: v,
        y: _,
        leftOpen: !a.cells[_][v].walls[r],
        rightOpen: !a.cells[_][v].walls[d],
        frontOpen: y,
        event: a.cells[_][v].event,
      }),
      !y)
    )
      break;
    ((v += vp[o].dx), (_ += vp[o].dy));
  }
  return m;
}
const kl = {
    sky: '#26301c',
    ceiling: '#3a4a2c',
    floor: '#5d6b46',
    wall: '#8b9a6b',
    frontWall: '#7a8a5c',
    outline: '#2c3720',
  },
  s2 = 0.56,
  c2 = ({
    floor: a,
    pos: u,
    dir: o,
    foes: c = [],
    maxDepth: r = 4,
    width: d = 358,
    height: m = 200,
  }) => {
    const v = N.useRef(null);
    return (
      N.useEffect(() => {
        const _ = v.current;
        if (!_) return;
        const g = window.devicePixelRatio || 1;
        ((_.width = d * g), (_.height = m * g));
        const y = _.getContext('2d');
        if (!y) return;
        y.scale(g, g);
        const S = d,
          C = m,
          R = S / 2,
          x = C / 2,
          j = u2(a, u, o, r),
          b = ($) => {
            const V = Math.pow(s2, $);
            return {
              l: R - (S / 2) * V,
              r: R + (S / 2) * V,
              t: x - (C / 2) * V,
              b: x + (C / 2) * V,
            };
          },
          A = ($, V, K = !1) => {
            (y.beginPath(), y.moveTo($[0][0], $[0][1]));
            for (let I = 1; I < $.length; I++) y.lineTo($[I][0], $[I][1]);
            (y.closePath(),
              (y.fillStyle = V),
              y.fill(),
              K && ((y.strokeStyle = kl.outline), (y.lineWidth = 1), y.stroke()));
          },
          w = ($) => `rgba(0,0,0,${Math.min(0.5, $ * 0.13)})`;
        ((y.fillStyle = kl.sky), y.fillRect(0, 0, S, C));
        for (let $ = j.length - 1; $ >= 0; $--) {
          const V = b($),
            K = b($ + 1),
            I = j[$];
          (A(
            [
              [V.l, V.t],
              [V.r, V.t],
              [K.r, K.t],
              [K.l, K.t],
            ],
            kl.ceiling
          ),
            A(
              [
                [V.l, V.b],
                [V.r, V.b],
                [K.r, K.b],
                [K.l, K.b],
              ],
              kl.floor
            ),
            A(
              [
                [V.l, V.t],
                [K.l, K.t],
                [K.l, K.b],
                [V.l, V.b],
              ],
              I.leftOpen ? kl.sky : kl.wall,
              !0
            ),
            A(
              [
                [V.r, V.t],
                [K.r, K.t],
                [K.r, K.b],
                [V.r, V.b],
              ],
              I.rightOpen ? kl.sky : kl.wall,
              !0
            ),
            I.frontOpen ||
              A(
                [
                  [K.l, K.t],
                  [K.r, K.t],
                  [K.r, K.b],
                  [K.l, K.b],
                ],
                kl.frontWall,
                !0
              ),
            (y.fillStyle = w($)),
            y.fillRect(K.l, K.t, K.r - K.l, K.b - K.t));
          const Q = I.event;
          if (
            (Q == null ? void 0 : Q.kind) === 'stairsUp' ||
            (Q == null ? void 0 : Q.kind) === 'stairsDown'
          ) {
            const L = R,
              Z = (V.b + K.b) / 2 - (V.b - K.b) * 0.15,
              ae = Math.max(12, (V.b - V.t) * 0.18);
            ((y.fillStyle = Q.kind === 'stairsUp' ? '#e8923a' : '#7aa2d6'),
              y.beginPath(),
              y.arc(L, Z, ae, 0, Math.PI * 2),
              y.fill(),
              (y.fillStyle = '#fff'),
              (y.font = `bold ${Math.floor(ae * 1.2)}px sans-serif`),
              (y.textAlign = 'center'),
              (y.textBaseline = 'middle'),
              y.fillText(Q.kind === 'stairsUp' ? '▲' : '▼', L, Z + 1));
          }
          if ($ > 0 && c.some((L) => L.x === I.x && L.y === I.y)) {
            const L = c.some((ue) => ue.x === I.x && ue.y === I.y && ue.alerted),
              Z = R,
              ae = (V.b + K.b) / 2 - (V.b - K.b) * 0.1,
              ce = Math.max(14, (V.b - V.t) * 0.22);
            ((y.fillStyle = L ? '#d32f2f' : '#b0533a'),
              y.beginPath(),
              y.arc(Z, ae, ce, 0, Math.PI * 2),
              y.fill(),
              (y.fillStyle = '#fff'),
              (y.font = `bold ${Math.floor(ce * 1.3)}px sans-serif`),
              (y.textAlign = 'center'),
              (y.textBaseline = 'middle'),
              y.fillText('!', Z, ae + 1));
          }
        }
      }, [a, u, o, c, r, d, m]),
      p.jsx('canvas', { ref: v, className: i2.view, style: { width: d, height: m } })
    );
  };
function o2(a) {
  var c, r, d;
  const u = a.diveState;
  if (!u) return !1;
  const o =
    (r = (c = a.towerState.floors[u.depth]) == null ? void 0 : c.generated.cells[u.pos.y]) == null
      ? void 0
      : r[u.pos.x];
  return ((d = o == null ? void 0 : o.event) == null ? void 0 : d.kind) === 'cookingSpot';
}
function r2(a) {
  const u = new Set(a.unlockedRecipeIds ?? []);
  return Object.values(Na).filter((o) => u.has(o.id));
}
function gy(a, u) {
  const o = Na[u];
  return !o || !(a.unlockedRecipeIds ?? []).includes(u)
    ? !1
    : o.ingredients.every((c) => Cr(a, c.itemId) >= c.qty);
}
function f2(a, u) {
  if (!gy(a, u)) return { ok: !1, save: a };
  const o = Na[u];
  let c = a;
  for (const r of o.ingredients) c = Ip(c, r.itemId, r.qty);
  return ((c = Zp(c, o.result.itemId, o.result.count)), { ok: !0, save: c });
}
function _y(a, u) {
  const o = new Set([...a.guild.party.front, ...a.guild.party.back].filter((c) => c !== null));
  return a.guild.members.some((c) => o.has(c.id) && (c.learnedSkills[u] ?? 0) > 0);
}
function vy(a) {
  var d, m, v;
  const u = a.diveState;
  if (!u) return null;
  const o = (d = a.towerState.floors[u.depth]) == null ? void 0 : d.generated,
    c = (m = o == null ? void 0 : o.cells[u.pos.y]) == null ? void 0 : m[u.pos.x];
  if (!o || ((v = c == null ? void 0 : c.event) == null ? void 0 : v.kind) !== 'gather')
    return null;
  const r = c.event.gatherId;
  return o.gatheringPoints.find((_) => _.id === r) ?? null;
}
function hr(a, u) {
  var r;
  const o = a.diveState;
  return o
    ? (((r = a.towerState.floors[o.depth]) == null ? void 0 : r.depletedGathers) ?? []).includes(
        os(u.cell.x, u.cell.y)
      )
    : !0;
}
function bp(a, u) {
  return _y(a, An[u.type].requiredSkillId);
}
function d2(a, u) {
  const o = a.reduce((r, d) => r + d.weight, 0);
  let c = u.next() * o;
  for (const r of a) if (((c -= r.weight), c < 0)) return r.itemId;
  return a[a.length - 1].itemId;
}
function m2(a, u) {
  const o = a.diveState;
  if (!o) return { ok: !1, save: a, reason: 'noDive' };
  const c = vy(a);
  if (!c) return { ok: !1, save: a, reason: 'noPoint' };
  if (hr(a, c)) return { ok: !1, save: a, reason: 'depleted' };
  const r = An[c.type];
  if (!_y(a, r.requiredSkillId)) return { ok: !1, save: a, reason: 'noSkill' };
  if (r.food && Kp(a) >= Qp) return { ok: !1, save: a, reason: 'foodFull' };
  const d = d2(r.drops, u);
  let m = r.food ? Zp(a, d, 1) : zi(a, d, 1);
  const v = os(c.cell.x, c.cell.y),
    _ = m.towerState.floors[o.depth],
    g = _.depletedGathers.includes(v) ? _.depletedGathers : [..._.depletedGathers, v];
  return (
    (m = {
      ...m,
      towerState: {
        ...m.towerState,
        floors: { ...m.towerState.floors, [o.depth]: { ..._, depletedGathers: g } },
      },
    }),
    { ok: !0, save: m, itemId: d, reason: void 0 }
  );
}
function h2(a, u, o) {
  var j;
  const c = lt[u];
  if (!c) return { save: a, ok: !1, message: 'そのアイテムは無い' };
  if (!((j = c.useContext) != null && j.includes('field')))
    return { save: a, ok: !1, message: 'ここでは使えない' };
  const r = G1(u);
  if ((r ? Cr(a, u) : Ar(a, u)) <= 0) return { save: a, ok: !1, message: '所持していない' };
  const m = (b) => (r ? Ip(b, u, 1) : ys(b, u, 1));
  if (u === 'item_return_thread')
    return a.diveState
      ? { save: Mi(m(a)), ok: !0, message: '拠点へ帰還した' }
      : { save: a, ok: !1, message: '探索中のみ使える' };
  if (!a.diveState) return { save: a, ok: !1, message: '探索中のみ使える' };
  const v = a.diveState.party.find((b) => b.charId === o),
    _ = a.guild.members.find((b) => b.id === o);
  if (!v || !_) return { save: a, ok: !1, message: '対象がいない' };
  const g = wi(_);
  let y = v.hp,
    S = v.tp,
    C = !1;
  for (const b of c.effects ?? [])
    b.kind === 'heal'
      ? ((y = Math.min(g.hp, y + b.amount(1))), (C = !0))
      : b.kind === 'restoreTp' && ((S = Math.min(g.tp, S + b.amount(1))), (C = !0));
  if (!C) return { save: a, ok: !1, message: 'いま使う効果がない' };
  const R = a.diveState.party.map((b) => (b.charId === o ? { ...b, hp: y, tp: S } : b));
  return {
    save: m({ ...a, diveState: { ...a.diveState, party: R } }),
    ok: !0,
    message: `${_.name} に ${c.name} を使った`,
  };
}
function p2(a) {
  return { depth: a, floorPaint: [], wallDraw: [], icons: [], notes: [], autopilotRoutes: [] };
}
function y2(a, u) {
  return a.playerMaps[u] ?? p2(u);
}
function by(a, u, o) {
  return { ...a, playerMaps: { ...a.playerMaps, [u]: o } };
}
function g2(a, u, o, c, r) {
  const d = y2(a, u),
    m = d.icons.find((g) => g.x === o && g.y === c),
    v = d.icons.filter((g) => !(g.x === o && g.y === c)),
    _ = (m == null ? void 0 : m.iconId) === r ? v : [...v, { x: o, y: c, iconId: r }];
  return by(a, u, { ...d, icons: _ });
}
function _2(a, u, o, c) {
  const r = a.playerMaps[u];
  return r ? by(a, u, { ...r, icons: r.icons.filter((d) => !(d.x === o && d.y === c)) }) : a;
}
const v2 = () => {
    var ue;
    const a = Ol(),
      { save: u, applySave: o, applyAndPersist: c } = jn(),
      r = N.useRef(null),
      [d, m] = N.useState(null),
      [v, _] = N.useState(!1),
      [g, y] = N.useState(!1),
      [S, C] = N.useState(null),
      R = (u == null ? void 0 : u.diveState) ?? null,
      x = N.useMemo(() => {
        var W;
        return u && R ? ((W = u.towerState.floors[R.depth]) == null ? void 0 : W.generated) : null;
      }, [u, R]),
      j = N.useMemo(() => {
        var W;
        return u && R
          ? (((W = u.towerState.floors[R.depth]) == null ? void 0 : W.foeRuntime) ?? [])
              .filter((F) => !F.defeated)
              .map((F) => ({ x: F.cell.x, y: F.cell.y, alerted: F.alerted }))
          : [];
      }, [u, R]),
      b = N.useMemo(() => (u ? vy(u) : null), [u]),
      A = N.useMemo(() => (u ? o2(u) : !1), [u]),
      w = N.useMemo(() => {
        var W;
        return u && R
          ? (((W = u.towerState.floors[R.depth]) == null ? void 0 : W.depletedGathers) ?? [])
          : [];
      }, [u, R]),
      $ = N.useCallback(() => {
        var F;
        if (!u) return;
        r.current || (r.current = Mn((u.masterSeed ^ 2654435769) >>> 0));
        const W = m2(u, r.current);
        if (!W.ok) {
          C(
            W.reason === 'noSkill'
              ? '対応する採集スキルを持つ仲間がいない'
              : W.reason === 'foodFull'
                ? '食料がいっぱいで採れない'
                : '採集できない'
          );
          return;
        }
        (c(() => W.save),
          C(
            `${W.itemId ? (((F = lt[W.itemId]) == null ? void 0 : F.name) ?? '素材') : '素材'} を手に入れた`
          ));
      }, [u, c]),
      V = N.useCallback(
        (W) => {
          var he;
          if (!u) return;
          const F = f2(u, W);
          F.ok &&
            (c(() => F.save), C(`${((he = Na[W]) == null ? void 0 : he.name) ?? '料理'} を作った`));
        },
        [u, c]
      ),
      K = N.useCallback(
        (W) => {
          if (!u) return;
          (C(null), r.current || (r.current = Mn((u.masterSeed ^ 2654435769) >>> 0)));
          const F = jb(u, W, r.current);
          (c(() => F.save), F.triggered && a('/battle'));
        },
        [u, c, a]
      ),
      I = N.useCallback(
        (W) => {
          o((F) => cy(F, W));
        },
        [o]
      ),
      Q = N.useCallback(async () => {
        if (!u) return;
        const W = fp(u);
        W === 'stairsUp'
          ? await c((F) => zb(F))
          : W === 'stairsDown' &&
            (u.diveState.depth <= 1 ? (await c((F) => Mi(F)), a('/town')) : await c((F) => wb(F)));
      }, [u, c, a]),
      L = N.useCallback(async () => {
        (await c((W) => Mi(W)), a('/town'));
      }, [c, a]),
      Z = N.useCallback(
        (W, F) => {
          if (!u) return;
          const he = h2(u, W, F);
          he.ok && (c(() => he.save), he.save.diveState || (_(!1), a('/town')));
        },
        [u, c, a]
      ),
      ae = N.useCallback(
        (W, F) => {
          if (!R) return;
          const he = R.depth;
          if (d !== null) {
            if (!((u == null ? void 0 : u.exploredCells[he]) ?? []).includes(`${W},${F}`)) return;
            c(d === 'erase' ? (Ee) => _2(Ee, he, W, F) : (Ee) => g2(Ee, he, W, F, d));
            return;
          }
          const U = W - R.pos.x,
            J = F - R.pos.y,
            te = ['N', 'E', 'S', 'W'].find((ge) => Kt[ge].dx === U && Kt[ge].dy === J);
          te && K(te);
        },
        [R, K, d, u, c]
      );
    if (!u) return p.jsx(jl, { to: '/title', replace: !0 });
    if (!R || !x) return p.jsx(jl, { to: '/town', replace: !0 });
    const ce = fp(u);
    return p.jsxs('div', {
      className: me.layout,
      children: [
        p.jsxs('header', {
          className: me.head,
          children: [
            p.jsxs('div', { className: me.depth, children: [R.depth, 'F'] }),
            p.jsx(n2, { level: mb(R.encounter.stepsUntilEncounter) }),
            p.jsx('button', {
              type: 'button',
              className: me.return,
              onClick: () => _(!0),
              children: '道具',
            }),
            p.jsx('button', {
              type: 'button',
              className: me.return,
              onClick: () => void L(),
              children: '帰還',
            }),
          ],
        }),
        p.jsx('div', {
          className: me.fpvWrap,
          children: p.jsx(c2, { floor: x, pos: R.pos, dir: R.dir, foes: j }),
        }),
        p.jsx('div', {
          className: me.mapWrap,
          children: p.jsx(JS, {
            floor: x,
            explored: u.exploredCells[R.depth] ?? [],
            pos: R.pos,
            dir: R.dir,
            icons: ((ue = u.playerMaps[R.depth]) == null ? void 0 : ue.icons) ?? [],
            foes: j,
            depletedGathers: w,
            onCellClick: ae,
          }),
        }),
        p.jsxs('div', {
          className: me.palette,
          children: [
            p.jsx('button', {
              type: 'button',
              className: `${me.tool} ${d === null ? me.toolActive : ''}`,
              onClick: () => m(null),
              'aria-label': '移動モード',
              children: '🚶',
            }),
            yy.map((W) =>
              p.jsx(
                'button',
                {
                  type: 'button',
                  className: `${me.tool} ${d === W.id ? me.toolActive : ''}`,
                  onClick: () => m(W.id),
                  'aria-label': W.label,
                  children: W.symbol,
                },
                W.id
              )
            ),
            p.jsx('button', {
              type: 'button',
              className: `${me.tool} ${d === 'erase' ? me.toolActive : ''}`,
              onClick: () => m('erase'),
              'aria-label': '消しゴム',
              children: '🧽',
            }),
          ],
        }),
        p.jsx('p', {
          className: me.paletteHint,
          children:
            d === null
              ? '隣接マスをタップで移動。アイコンを選ぶとマップに書き込めます。'
              : d === 'erase'
                ? 'マップ上のマスをタップでアイコンを消去。'
                : 'マップ上の探索済みマスをタップでアイコンを配置（再タップで消去）。',
        }),
        ce &&
          p.jsx('button', {
            type: 'button',
            className: me.stairs,
            onClick: () => void Q(),
            children:
              ce === 'stairsUp'
                ? '▲ 次の階へ進む'
                : R.depth <= 1
                  ? '▼ 拠点へ戻る'
                  : '▼ 前の階へ戻る',
          }),
        b &&
          p.jsx('button', {
            type: 'button',
            className: me.action,
            disabled: hr(u, b) || !bp(u, b),
            onClick: $,
            children: hr(u, b)
              ? `🌿 ${An[b.type].name}（採集済み）`
              : bp(u, b)
                ? `🌿 ${An[b.type].name}する`
                : `🌿 ${An[b.type].name}（スキル要）`,
          }),
        A &&
          p.jsx('button', {
            type: 'button',
            className: me.action,
            onClick: () => y(!0),
            children: '🍳 調理する',
          }),
        S && p.jsx('p', { className: me.notice, children: S }),
        p.jsxs('div', {
          className: me.controls,
          children: [
            p.jsxs('div', {
              className: me.row,
              children: [
                p.jsx('button', {
                  type: 'button',
                  className: me.turn,
                  onClick: () => I(ay(R.dir)),
                  'aria-label': '左を向く',
                  children: '↰',
                }),
                p.jsx('button', {
                  type: 'button',
                  className: me.forward,
                  onClick: () => K(R.dir),
                  children: '前進',
                }),
                p.jsx('button', {
                  type: 'button',
                  className: me.turn,
                  onClick: () => I(ny(R.dir)),
                  'aria-label': '右を向く',
                  children: '↱',
                }),
              ],
            }),
            p.jsx('button', {
              type: 'button',
              className: me.back,
              onClick: () => I(hb(R.dir)),
              'aria-label': '振り向く',
              children: '↻ 振り向く',
            }),
          ],
        }),
        v
          ? p.jsx('div', {
              className: me.itemOverlay,
              onClick: () => _(!1),
              children: p.jsxs('div', {
                className: me.itemPanel,
                onClick: (W) => W.stopPropagation(),
                children: [
                  p.jsx('div', { className: me.itemTitle, children: 'どうぐ・食料' }),
                  (() => {
                    const W = [...u.guild.storage, ...(u.guild.foodStorage ?? [])].filter((F) => {
                      var he, U;
                      return (
                        ((U = (he = lt[F.itemId]) == null ? void 0 : he.useContext) == null
                          ? void 0
                          : U.includes('field')) && F.qty > 0
                      );
                    });
                    return W.length === 0
                      ? p.jsx('p', {
                          className: me.itemEmpty,
                          children: '使える道具がありません。',
                        })
                      : W.map((F) => {
                          const he = lt[F.itemId],
                            U = F.itemId === 'item_return_thread';
                          return p.jsxs(
                            'div',
                            {
                              className: me.itemRow,
                              children: [
                                p.jsxs('div', {
                                  className: me.itemName,
                                  children: [
                                    he.name,
                                    ' ×',
                                    F.qty,
                                    p.jsx('span', {
                                      className: me.itemDesc,
                                      children: he.description,
                                    }),
                                  ],
                                }),
                                U
                                  ? p.jsx('button', {
                                      type: 'button',
                                      className: me.itemUse,
                                      onClick: () => Z(F.itemId),
                                      children: '使う',
                                    })
                                  : p.jsx('div', {
                                      className: me.itemTargets,
                                      children: R.party.map((J) => {
                                        const te = u.guild.members.find((Ee) => Ee.id === J.charId);
                                        if (!te) return null;
                                        const ge = wi(te);
                                        return p.jsxs(
                                          'button',
                                          {
                                            type: 'button',
                                            className: me.itemTarget,
                                            onClick: () => Z(F.itemId, J.charId),
                                            children: [
                                              te.name,
                                              p.jsxs('span', {
                                                className: me.itemHp,
                                                children: [
                                                  'HP ',
                                                  J.hp,
                                                  '/',
                                                  ge.hp,
                                                  '・TP ',
                                                  J.tp,
                                                  '/',
                                                  ge.tp,
                                                ],
                                              }),
                                            ],
                                          },
                                          J.charId
                                        );
                                      }),
                                    }),
                              ],
                            },
                            F.itemId
                          );
                        });
                  })(),
                  p.jsx('button', {
                    type: 'button',
                    className: me.itemClose,
                    onClick: () => _(!1),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
        g
          ? p.jsx('div', {
              className: me.itemOverlay,
              onClick: () => y(!1),
              children: p.jsxs('div', {
                className: me.itemPanel,
                onClick: (W) => W.stopPropagation(),
                children: [
                  p.jsx('div', { className: me.itemTitle, children: '調理' }),
                  (() => {
                    const W = r2(u);
                    return W.length === 0
                      ? p.jsx('p', {
                          className: me.itemEmpty,
                          children: '作れるレシピがありません。',
                        })
                      : W.map((F) => {
                          var J;
                          const he = gy(u, F.id),
                            U = F.ingredients
                              .map((te) => {
                                var ge;
                                return `${((ge = lt[te.itemId]) == null ? void 0 : ge.name) ?? te.itemId}×${te.qty}`;
                              })
                              .join(' ＋ ');
                          return p.jsxs(
                            'div',
                            {
                              className: me.itemRow,
                              children: [
                                p.jsxs('div', {
                                  className: me.itemName,
                                  children: [
                                    F.name,
                                    p.jsxs('span', {
                                      className: me.itemDesc,
                                      children: [
                                        U,
                                        ' → ',
                                        ((J = lt[F.result.itemId]) == null ? void 0 : J.name) ??
                                          F.result.itemId,
                                        '（所持',
                                        F.ingredients
                                          .map((te) => {
                                            var ge;
                                            return `${((ge = lt[te.itemId]) == null ? void 0 : ge.name) ?? ''}${Cr(u, te.itemId)}`;
                                          })
                                          .join('・'),
                                        '）',
                                      ],
                                    }),
                                  ],
                                }),
                                p.jsx('button', {
                                  type: 'button',
                                  className: me.itemUse,
                                  disabled: !he,
                                  onClick: () => V(F.id),
                                  children: '作る',
                                }),
                              ],
                            },
                            F.id
                          );
                        });
                  })(),
                  p.jsx('button', {
                    type: 'button',
                    className: me.itemClose,
                    onClick: () => y(!1),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
      ],
    });
  },
  b2 = '_layout_16au8_2',
  S2 = '_head_16au8_13',
  x2 = '_title_16au8_20',
  E2 = '_count_16au8_26',
  T2 = '_create_16au8_31',
  N2 = '_sectionTitle_16au8_42',
  k2 = '_field_16au8_48',
  A2 = '_primary_16au8_64',
  C2 = '_list_16au8_79',
  M2 = '_empty_16au8_83',
  R2 = '_members_16au8_88',
  j2 = '_member_16au8_88',
  O2 = '_memberMain_16au8_107',
  z2 = '_memberName_16au8_119',
  w2 = '_pos_16au8_127',
  D2 = '_memberSub_16au8_144',
  B2 = '_posBtns_16au8_149',
  U2 = '_posBtn_16au8_149',
  L2 = '_posBtnActive_16au8_164',
  H2 = '_foot_16au8_170',
  q2 = '_sub_16au8_174',
  ze = {
    layout: b2,
    head: S2,
    title: x2,
    count: E2,
    create: T2,
    sectionTitle: N2,
    field: k2,
    primary: A2,
    list: C2,
    empty: M2,
    members: R2,
    member: j2,
    memberMain: O2,
    memberName: z2,
    pos: w2,
    pos_前衛: '_pos_前衛_16au8_136',
    pos_後衛: '_pos_後衛_16au8_140',
    memberSub: D2,
    posBtns: B2,
    posBtn: U2,
    posBtnActive: L2,
    foot: H2,
    sub: q2,
  };
function G2(a) {
  return [...a.guild.party.front, ...a.guild.party.back].filter((u) => u !== null).length;
}
const Sy = (a) => (a === 'front' ? hs : ps);
function Y2(a, u, o, c) {
  if (o < 0 || o >= Sy(u) || (c !== null && !a.guild.members.some((m) => m.id === c))) return a;
  const r = a.guild.party.front.map((m) => (m === c ? null : m)),
    d = a.guild.party.back.map((m) => (m === c ? null : m));
  for (; r.length < hs; ) r.push(null);
  for (; d.length < ps; ) d.push(null);
  return (
    u === 'front' ? (r[o] = c) : (d[o] = c),
    { ...a, guild: { ...a.guild, party: { front: r, back: d } } }
  );
}
function xy(a, u) {
  const o = a.guild.party.front.map((r) => (r === u ? null : r)),
    c = a.guild.party.back.map((r) => (r === u ? null : r));
  return { ...a, guild: { ...a.guild, party: { front: o, back: c } } };
}
function Sp(a, u, o) {
  if (
    !a.guild.members.some((v) => v.id === u) ||
    (o === 'front' ? a.guild.party.front : a.guild.party.back).includes(u)
  )
    return a;
  const r = xy(a, u),
    d = o === 'front' ? r.guild.party.front : r.guild.party.back;
  let m = d.indexOf(null);
  if (m < 0)
    if (d.length < Sy(o)) m = d.length;
    else return a;
  return Y2(r, o, m, u);
}
function X2(a, u) {
  return a.guild.party.front.includes(u)
    ? '前衛'
    : a.guild.party.back.includes(u)
      ? '後衛'
      : '控え';
}
const $2 = () => {
    const a = Ol(),
      { save: u, applyAndPersist: o } = jn(),
      c = Object.keys(Zt),
      r = Object.keys(ht),
      [d, m] = N.useState(''),
      [v, _] = N.useState(c[0]),
      [g, y] = N.useState(r[0]),
      [S, C] = N.useState(!1),
      R = N.useCallback(async () => {
        const b = d.trim() || '名もなき冒険者',
          A = ry({ raceId: v, classId: g, name: b });
        (C(!0), await o((w) => Vb(w, A)), m(''), C(!1));
      }, [d, v, g, o]);
    if (!u) return p.jsx(jl, { to: '/title', replace: !0 });
    const { members: x } = u.guild,
      j = x.length >= ir;
    return p.jsxs('div', {
      className: ze.layout,
      children: [
        p.jsxs('header', {
          className: ze.head,
          children: [
            p.jsx('h1', { className: ze.title, children: 'ギルド管理' }),
            p.jsxs('span', { className: ze.count, children: ['団員 ', x.length, ' / ', ir] }),
          ],
        }),
        p.jsxs('section', {
          className: ze.create,
          children: [
            p.jsx('h2', { className: ze.sectionTitle, children: '冒険者を作成' }),
            p.jsxs('label', {
              className: ze.field,
              children: [
                p.jsx('span', { children: '名前' }),
                p.jsx('input', {
                  type: 'text',
                  value: d,
                  maxLength: 16,
                  placeholder: '名もなき冒険者',
                  onChange: (b) => m(b.target.value),
                }),
              ],
            }),
            p.jsxs('label', {
              className: ze.field,
              children: [
                p.jsx('span', { children: '種族' }),
                p.jsx('select', {
                  value: v,
                  onChange: (b) => _(b.target.value),
                  children: c.map((b) => p.jsx('option', { value: b, children: Zt[b].name }, b)),
                }),
              ],
            }),
            p.jsxs('label', {
              className: ze.field,
              children: [
                p.jsx('span', { children: '職業' }),
                p.jsx('select', {
                  value: g,
                  onChange: (b) => y(b.target.value),
                  children: r.map((b) => p.jsx('option', { value: b, children: ht[b].name }, b)),
                }),
              ],
            }),
            p.jsx('button', {
              type: 'button',
              className: ze.primary,
              disabled: S || j,
              onClick: () => void R(),
              children: j ? '団員が上限です' : '作成する',
            }),
          ],
        }),
        p.jsxs('section', {
          className: ze.list,
          children: [
            p.jsxs('h2', {
              className: ze.sectionTitle,
              children: [
                '団員一覧',
                ' ',
                p.jsxs('span', {
                  className: ze.count,
                  children: ['（出撃 ', G2(u), ' / ', X1, '）'],
                }),
              ],
            }),
            x.length === 0
              ? p.jsx('p', { className: ze.empty, children: 'まだ冒険者がいません。' })
              : p.jsx('ul', {
                  className: ze.members,
                  children: x.map((b) => {
                    var w, $;
                    const A = X2(u, b.id);
                    return p.jsxs(
                      'li',
                      {
                        className: ze.member,
                        children: [
                          p.jsxs('button', {
                            type: 'button',
                            className: ze.memberMain,
                            onClick: () => a(`/guild/char/${b.id}`),
                            children: [
                              p.jsxs('span', {
                                className: ze.memberName,
                                children: [
                                  b.name,
                                  p.jsx('span', {
                                    className: `${ze.pos} ${ze[`pos_${A}`] ?? ''}`,
                                    children: A,
                                  }),
                                ],
                              }),
                              p.jsxs('span', {
                                className: ze.memberSub,
                                children: [
                                  (w = Zt[b.raceId]) == null ? void 0 : w.name,
                                  ' / ',
                                  ($ = ht[b.classId]) == null ? void 0 : $.name,
                                  ' / Lv',
                                  b.level,
                                  ' ›',
                                ],
                              }),
                            ],
                          }),
                          p.jsxs('div', {
                            className: ze.posBtns,
                            children: [
                              p.jsx('button', {
                                type: 'button',
                                className: `${ze.posBtn} ${A === '前衛' ? ze.posBtnActive : ''}`,
                                onClick: () => void o((V) => Sp(V, b.id, 'front')),
                                children: '前',
                              }),
                              p.jsx('button', {
                                type: 'button',
                                className: `${ze.posBtn} ${A === '後衛' ? ze.posBtnActive : ''}`,
                                onClick: () => void o((V) => Sp(V, b.id, 'back')),
                                children: '後',
                              }),
                              p.jsx('button', {
                                type: 'button',
                                className: `${ze.posBtn} ${A === '控え' ? ze.posBtnActive : ''}`,
                                onClick: () => void o((V) => xy(V, b.id)),
                                children: '控',
                              }),
                            ],
                          }),
                        ],
                      },
                      b.id
                    );
                  }),
                }),
          ],
        }),
        p.jsx('footer', {
          className: ze.foot,
          children: p.jsx('button', {
            type: 'button',
            className: ze.sub,
            onClick: () => a('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  V2 = '_layout_tw23z_1',
  Q2 = '_head_tw23z_12',
  K2 = '_title_tw23z_16',
  Z2 = '_sub_tw23z_22',
  I2 = '_card_tw23z_27',
  J2 = '_h2_tw23z_35',
  W2 = '_sp_tw23z_44',
  F2 = '_stats_tw23z_50',
  P2 = '_equipSlot_tw23z_74',
  ex = '_equipHead_tw23z_82',
  tx = '_slotLabel_tw23z_88',
  lx = '_equipName_tw23z_95',
  nx = '_smallBtn_tw23z_100',
  ax = '_equipPick_tw23z_110',
  ix = '_pickBtn_tw23z_118',
  ux = '_skills_tw23z_128',
  sx = '_skill_tw23z_128',
  cx = '_skillInfo_tw23z_143',
  ox = '_skillName_tw23z_150',
  rx = '_skillLv_tw23z_158',
  fx = '_skillDesc_tw23z_164',
  dx = '_learnBtn_tw23z_169',
  mx = '_jobRow_tw23z_185',
  hx = '_select_tw23z_192',
  px = '_input_tw23z_193',
  yx = '_actBtn_tw23z_203',
  gx = '_warn_tw23z_220',
  _x = '_titleHave_tw23z_227',
  vx = '_titleOpts_tw23z_233',
  bx = '_titleBtn_tw23z_240',
  Sx = '_rbForm_tw23z_252',
  xx = '_danger_tw23z_258',
  Ex = '_foot_tw23z_270',
  Tx = '_back_tw23z_274',
  fe = {
    layout: V2,
    head: Q2,
    title: K2,
    sub: Z2,
    card: I2,
    h2: J2,
    sp: W2,
    stats: F2,
    equipSlot: P2,
    equipHead: ex,
    slotLabel: tx,
    equipName: lx,
    smallBtn: nx,
    equipPick: ax,
    pickBtn: ix,
    skills: ux,
    skill: sx,
    skillInfo: cx,
    skillName: ox,
    skillLv: rx,
    skillDesc: fx,
    learnBtn: dx,
    jobRow: mx,
    select: hx,
    input: px,
    actBtn: yx,
    warn: gx,
    titleHave: _x,
    titleOpts: vx,
    titleBtn: bx,
    rbForm: Sx,
    danger: xx,
    foot: Ex,
    back: Tx,
  },
  Ey = ['weapon', 'armor', 'accessory'];
function Ty(a, u, o) {
  return { ...a, guild: { ...a.guild, members: a.guild.members.map((c) => (c.id === u ? o : c)) } };
}
function Nx(a) {
  var u, o;
  return (o = (u = ht[a]) == null ? void 0 : u.skillTree.skills[0]) == null ? void 0 : o.skillId;
}
function kx(a) {
  var u;
  return new Set(
    (((u = Zt[a]) == null ? void 0 : u.unionSkillTree.skills) ?? []).map((o) => o.skillId)
  );
}
const Ax = (a) => Object.values(a).reduce((u, o) => u + o, 0);
function Cx(a, u) {
  if (!ht[u]) return a;
  const o = kx(a.raceId);
  let c = {};
  for (const [_, g] of Object.entries(a.learnedSkills)) o.has(_) && (c[_] = g);
  const r = Nx(u);
  r && !c[r] && (c[r] = 1);
  const d = Math.max(1, a.level - Xp),
    m = Be.SP_PER_LEVEL * Math.max(0, d - 1);
  let v = Ax(c) - (r && c[r] ? 1 : 0);
  return (
    v > m && ((c = r ? { [r]: 1 } : {}), (v = 0)),
    {
      ...a,
      classId: u,
      titleId: null,
      level: d,
      exp: 0,
      learnedSkills: c,
      skillPoints: { total: m, spent: v },
    }
  );
}
function Mx(a, u, o) {
  const c = a.guild.members.find((m) => m.id === u);
  if (!c) return a;
  let r = Ty(a, u, Cx(c, o));
  const d = r.guild.members.find((m) => m.id === u);
  for (const m of Ey) {
    const v = d.equipment[m];
    v && !Mr(d, v) && (r = Rr(r, u, m));
  }
  return r;
}
const Rx = [
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
function jx(a) {
  const u = Rx.find((o) => a >= o.min && a <= o.max);
  return u ? { allStats: u.allStats, bonusSp: u.bonusSp } : null;
}
function Ny(a) {
  return a.level >= Ni.REBIRTH_MIN_LEVEL;
}
function Ox(a, u) {
  const o = jx(a.level);
  if (!o) return a;
  const c = Math.min(30, Math.floor(a.level / 2)),
    r = ry({ ...u, id: a.id }),
    d = Be.SP_PER_LEVEL * Math.max(0, c - 1) + o.bonusSp;
  return {
    ...r,
    level: Math.max(1, c),
    exp: 0,
    rebirthBonus: o,
    skillPoints: { total: d, spent: r.skillPoints.spent },
  };
}
function zx(a, u, o) {
  const c = a.guild.members.find((m) => m.id === u);
  if (!c || !Ny(c)) return a;
  let r = a;
  for (const m of Ey) c.equipment[m] && (r = Rr(r, u, m));
  const d = r.guild.members.find((m) => m.id === u);
  return Ty(r, u, Ox(d, o));
}
function ky(a, u, o) {
  var r;
  return o < Ni.TITLE_DEPTH || a.titleId
    ? !1
    : (((r = ht[a.classId]) == null ? void 0 : r.titleOptions) ?? []).includes(u);
}
function wx(a, u, o) {
  return ky(a, u, o)
    ? { ...a, titleId: u, skillPoints: { ...a.skillPoints, total: a.skillPoints.total + $1 } }
    : a;
}
function Ay(a) {
  var o, c;
  const u = [
    ...(((o = ht[a.classId]) == null ? void 0 : o.skillTree.skills) ?? []),
    ...(((c = Zt[a.raceId]) == null ? void 0 : c.unionSkillTree.skills) ?? []),
  ];
  return (a.titleId && va[a.titleId] && u.push(...va[a.titleId].skillTree.skills), u);
}
function vs(a, u) {
  return a.learnedSkills[u] ?? 0;
}
function Cy(a) {
  return a.skillPoints.total - a.skillPoints.spent;
}
function Dx(a, u) {
  return (u.requires ?? []).every((o) => vs(a, o.skillId) >= o.level);
}
function My(a, u) {
  const o = Ay(a).find((c) => c.skillId === u);
  return !o || vs(a, u) >= o.maxLevel || Cy(a) <= 0 ? !1 : Dx(a, o);
}
function Bx(a, u) {
  return My(a, u)
    ? {
        ...a,
        learnedSkills: { ...a.learnedSkills, [u]: vs(a, u) + 1 },
        skillPoints: { ...a.skillPoints, spent: a.skillPoints.spent + 1 },
      }
    : a;
}
const xp = Object.keys(Zt),
  es = Object.keys(ht),
  Ux = ['weapon', 'armor', 'accessory'],
  Lx = { weapon: '武器', armor: '防具', accessory: '装飾' },
  Hx = [
    { key: 'hp', label: 'HP' },
    { key: 'tp', label: 'TP' },
    { key: 'str', label: 'STR' },
    { key: 'vit', label: 'VIT' },
    { key: 'agi', label: 'AGI' },
    { key: 'int', label: 'INT' },
    { key: 'mnd', label: 'MND' },
    { key: 'luc', label: 'LUC' },
  ],
  qx = () => {
    var V, K, I, Q;
    const a = Ol(),
      { id: u } = I_(),
      { save: o, applyAndPersist: c } = jn(),
      [r, d] = N.useState(es[0]),
      [m, v] = N.useState(''),
      [_, g] = N.useState(xp[0]),
      [y, S] = N.useState(es[0]),
      [C, R] = N.useState(!1);
    if (!o) return p.jsx(jl, { to: '/title', replace: !0 });
    const x = o.guild.members.find((L) => L.id === u);
    if (!x || !u) return p.jsx(jl, { to: '/guild', replace: !0 });
    const j = wi(x),
      b = Cy(x),
      A = o.towerState.record.deepestReached,
      w = (L) =>
        c((Z) => ({
          ...Z,
          guild: { ...Z.guild, members: Z.guild.members.map((ae) => (ae.id === u ? L(ae) : ae)) },
        }));
    return p.jsxs('div', {
      className: fe.layout,
      children: [
        p.jsxs('header', {
          className: fe.head,
          children: [
            p.jsx('h1', { className: fe.title, children: x.name }),
            p.jsxs('span', {
              className: fe.sub,
              children: [
                (V = Zt[x.raceId]) == null ? void 0 : V.name,
                ' / ',
                (K = ht[x.classId]) == null ? void 0 : K.name,
                ' / Lv',
                x.level,
              ],
            }),
          ],
        }),
        p.jsxs('section', {
          className: fe.card,
          children: [
            p.jsx('h2', { className: fe.h2, children: 'ステータス' }),
            p.jsx('dl', {
              className: fe.stats,
              children: Hx.map((L) =>
                p.jsxs(
                  'div',
                  {
                    children: [
                      p.jsx('dt', { children: L.label }),
                      p.jsx('dd', { children: j[L.key] }),
                    ],
                  },
                  L.key
                )
              ),
            }),
          ],
        }),
        p.jsxs('section', {
          className: fe.card,
          children: [
            p.jsx('h2', { className: fe.h2, children: '装備' }),
            Ux.map((L) => {
              const Z = x.equipment[L],
                ae = Z ? wt[Z] : null,
                ce = o.guild.storage.filter((ue) => {
                  var W;
                  return ((W = wt[ue.itemId]) == null ? void 0 : W.slot) === L && Mr(x, ue.itemId);
                });
              return p.jsxs(
                'div',
                {
                  className: fe.equipSlot,
                  children: [
                    p.jsxs('div', {
                      className: fe.equipHead,
                      children: [
                        p.jsx('span', { className: fe.slotLabel, children: Lx[L] }),
                        p.jsx('span', {
                          className: fe.equipName,
                          children: ae ? ae.name : '（なし）',
                        }),
                        ae
                          ? p.jsx('button', {
                              type: 'button',
                              className: fe.smallBtn,
                              onClick: () => void $(L),
                              children: '外す',
                            })
                          : null,
                      ],
                    }),
                    ce.length > 0
                      ? p.jsx('div', {
                          className: fe.equipPick,
                          children: ce.map((ue) =>
                            p.jsxs(
                              'button',
                              {
                                type: 'button',
                                className: fe.pickBtn,
                                onClick: () => void c((W) => J1(W, u, ue.itemId)),
                                children: [
                                  wt[ue.itemId].name,
                                  ' 装備',
                                  ue.qty > 1 ? `(${ue.qty})` : '',
                                ],
                              },
                              ue.itemId
                            )
                          ),
                        })
                      : null,
                  ],
                },
                L
              );
            }),
          ],
        }),
        p.jsxs('section', {
          className: fe.card,
          children: [
            p.jsxs('h2', {
              className: fe.h2,
              children: ['スキル ', p.jsxs('span', { className: fe.sp, children: ['SP ', b] })],
            }),
            p.jsx('ul', {
              className: fe.skills,
              children: Ay(x).map((L) => {
                const Z = vs(x, L.skillId),
                  ae = My(x, L.skillId),
                  ce = Nr[L.skillId];
                return p.jsxs(
                  'li',
                  {
                    className: fe.skill,
                    children: [
                      p.jsxs('div', {
                        className: fe.skillInfo,
                        children: [
                          p.jsxs('span', {
                            className: fe.skillName,
                            children: [
                              (ce == null ? void 0 : ce.name) ?? L.skillId,
                              p.jsxs('span', {
                                className: fe.skillLv,
                                children: ['Lv ', Z, '/', L.maxLevel],
                              }),
                            ],
                          }),
                          p.jsx('span', {
                            className: fe.skillDesc,
                            children: (ce == null ? void 0 : ce.description) ?? '',
                          }),
                        ],
                      }),
                      p.jsx('button', {
                        type: 'button',
                        className: fe.learnBtn,
                        disabled: !ae,
                        onClick: () => void w((ue) => Bx(ue, L.skillId)),
                        children: '＋',
                      }),
                    ],
                  },
                  L.skillId
                );
              }),
            }),
          ],
        }),
        p.jsxs('section', {
          className: fe.card,
          children: [
            p.jsx('h2', { className: fe.h2, children: '転職' }),
            p.jsxs('div', {
              className: fe.jobRow,
              children: [
                p.jsx('select', {
                  className: fe.select,
                  value: r,
                  onChange: (L) => d(L.target.value),
                  children: es.map((L) => p.jsx('option', { value: L, children: ht[L].name }, L)),
                }),
                p.jsx('button', {
                  type: 'button',
                  className: fe.actBtn,
                  disabled: r === x.classId,
                  onClick: () => void c((L) => Mx(L, u, r)),
                  children: '転職する',
                }),
              ],
            }),
            p.jsxs('p', {
              className: fe.warn,
              children: [
                '※ レベルが ',
                Xp,
                ' ',
                '下がり、職業/称号スキルは振り直しになります（種族スキルは保持）。',
              ],
            }),
            p.jsx('h2', { className: fe.h2, children: '称号' }),
            x.titleId
              ? p.jsxs('p', {
                  className: fe.titleHave,
                  children: ['習得済み: ', (I = va[x.titleId]) == null ? void 0 : I.name],
                })
              : A < Ni.TITLE_DEPTH
                ? p.jsxs('p', {
                    className: fe.warn,
                    children: ['第 ', Ni.TITLE_DEPTH, ' 階到達で習得できます（現在 ', A, 'F）。'],
                  })
                : p.jsx('div', {
                    className: fe.titleOpts,
                    children: (((Q = ht[x.classId]) == null ? void 0 : Q.titleOptions) ?? []).map(
                      (L) => {
                        var Z;
                        return p.jsxs(
                          'button',
                          {
                            type: 'button',
                            className: fe.titleBtn,
                            disabled: !ky(x, L, A),
                            onClick: () => void w((ae) => wx(ae, L, A)),
                            children: [(Z = va[L]) == null ? void 0 : Z.name, '（SP+5）'],
                          },
                          L
                        );
                      }
                    ),
                  }),
            p.jsx('h2', { className: fe.h2, children: '転生' }),
            Ny(x)
              ? C
                ? p.jsxs('div', {
                    className: fe.rbForm,
                    children: [
                      p.jsxs('p', {
                        className: fe.warn,
                        children: [
                          '※ 作り直して強い新人になります（開始Lv ',
                          Math.min(30, Math.floor(x.level / 2)),
                          '・ボーナス付き）。',
                        ],
                      }),
                      p.jsx('input', {
                        className: fe.input,
                        type: 'text',
                        maxLength: 16,
                        placeholder: x.name,
                        value: m,
                        onChange: (L) => v(L.target.value),
                      }),
                      p.jsxs('div', {
                        className: fe.jobRow,
                        children: [
                          p.jsx('select', {
                            className: fe.select,
                            value: _,
                            onChange: (L) => g(L.target.value),
                            children: xp.map((L) =>
                              p.jsx('option', { value: L, children: Zt[L].name }, L)
                            ),
                          }),
                          p.jsx('select', {
                            className: fe.select,
                            value: y,
                            onChange: (L) => S(L.target.value),
                            children: es.map((L) =>
                              p.jsx('option', { value: L, children: ht[L].name }, L)
                            ),
                          }),
                        ],
                      }),
                      p.jsxs('div', {
                        className: fe.jobRow,
                        children: [
                          p.jsx('button', {
                            type: 'button',
                            className: fe.danger,
                            onClick: () => {
                              (c((L) =>
                                zx(L, u, { raceId: _, classId: y, name: m.trim() || x.name })
                              ),
                                R(!1));
                            },
                            children: '転生を実行',
                          }),
                          p.jsx('button', {
                            type: 'button',
                            className: fe.actBtn,
                            onClick: () => R(!1),
                            children: 'やめる',
                          }),
                        ],
                      }),
                    ],
                  })
                : p.jsx('button', {
                    type: 'button',
                    className: fe.actBtn,
                    onClick: () => R(!0),
                    children: '転生する…',
                  })
              : p.jsxs('p', {
                  className: fe.warn,
                  children: [
                    'Lv',
                    Ni.REBIRTH_MIN_LEVEL,
                    ' 以上で転生できます（現在 Lv',
                    x.level,
                    '）。',
                  ],
                }),
          ],
        }),
        p.jsx('footer', {
          className: fe.foot,
          children: p.jsx('button', {
            type: 'button',
            className: fe.back,
            onClick: () => a('/guild'),
            children: 'もどる',
          }),
        }),
      ],
    });
    function $(L) {
      return c((Z) => Rr(Z, u, L));
    }
  },
  Gx = () => p.jsx('div', { children: p.jsx('h1', { children: 'Not Found' }) }),
  Yx = '_layout_1u0ua_1',
  Xx = '_head_1u0ua_11',
  $x = '_title_1u0ua_18',
  Vx = '_gold_1u0ua_24',
  Qx = '_tabs_1u0ua_29',
  Kx = '_tab_1u0ua_29',
  Zx = '_tabActive_1u0ua_46',
  Ix = '_list_1u0ua_51',
  Jx = '_row_1u0ua_59',
  Wx = '_info_1u0ua_70',
  Fx = '_name_1u0ua_76',
  Px = '_note_1u0ua_81',
  eE = '_action_1u0ua_86',
  tE = '_empty_1u0ua_103',
  lE = '_foot_1u0ua_108',
  nE = '_back_1u0ua_112',
  Qe = {
    layout: Yx,
    head: Xx,
    title: $x,
    gold: Vx,
    tabs: Qx,
    tab: Kx,
    tabActive: Zx,
    list: Ix,
    row: Jx,
    info: Wx,
    name: Fx,
    note: Px,
    action: eE,
    empty: tE,
    foot: lE,
    back: nE,
  };
function aE(a) {
  return Math.max(0, Math.floor(a.towerState.record.deepestReached / 10));
}
const Ry = {
    item_slime_jelly: ['equip_slime_shield'],
    item_rat_tail: ['equip_rat_dagger'],
    item_bat_wing: ['equip_bat_cloak'],
    item_golem_core: ['equip_golem_blade'],
  },
  iE = (a) => {
    const u = wt[a].bonuses,
      o = [];
    return (
      u.atk && o.push(`ATK+${u.atk}`),
      u.mat && o.push(`MAT+${u.mat}`),
      u.def && o.push(`DEF+${u.def}`),
      u.mdf && o.push(`MDF+${u.mdf}`),
      o.join(' ')
    );
  };
function uE(a) {
  const u = aE(a),
    o = new Set(a.shopStock.unlockedItemIds),
    c = Object.values(lt)
      .filter((d) => d.buyPrice > 0)
      .map((d) => ({ id: d.id, name: d.name, price: d.buyPrice, kind: 'item' }));
  return [
    ...Object.values(wt)
      .filter((d) => d.tier <= u || o.has(d.id))
      .map((d) => ({ id: d.id, name: d.name, price: d.buyPrice, kind: 'equip', note: iE(d.id) })),
    ...c,
  ];
}
function sE(a) {
  return Ry[a] ?? [];
}
function cE(a) {
  var u, o;
  return (
    ((u = lt[a]) == null ? void 0 : u.buyPrice) ??
    ((o = wt[a]) == null ? void 0 : o.buyPrice) ??
    null
  );
}
function pr(a) {
  return lt[a] ? q1(lt[a]) : wt[a] ? Math.floor(wt[a].buyPrice / 2) : 0;
}
function oE(a, u) {
  const o = cE(u);
  if (o === null || o <= 0 || a.guild.gold < o) return a;
  const c = zi(a, u, 1);
  return { ...c, guild: { ...c.guild, gold: c.guild.gold - o } };
}
function rE(a, u, o = 1) {
  var _;
  if ((((_ = a.guild.storage.find((g) => g.itemId === u)) == null ? void 0 : _.qty) ?? 0) < o)
    return a;
  const r = pr(u) * o,
    d = ys(a, u, o),
    m = sE(u).filter((g) => !d.shopStock.unlockedItemIds.includes(g)),
    v = [...d.shopStock.unlockedItemIds, ...m];
  return {
    ...d,
    guild: { ...d.guild, gold: d.guild.gold + r },
    shopStock: { ...d.shopStock, unlockedItemIds: v },
  };
}
const fE = () => {
    const a = Ol(),
      { save: u, applyAndPersist: o } = jn(),
      [c, r] = N.useState('buy');
    if (!u) return p.jsx(jl, { to: '/title', replace: !0 });
    const d = u.guild.gold,
      m = uE(u),
      v = u.guild.storage.filter((g) => pr(g.itemId) > 0),
      _ = (g) => {
        var y, S;
        return (
          ((y = lt[g]) == null ? void 0 : y.name) ?? ((S = wt[g]) == null ? void 0 : S.name) ?? g
        );
      };
    return p.jsxs('div', {
      className: Qe.layout,
      children: [
        p.jsxs('header', {
          className: Qe.head,
          children: [
            p.jsx('h1', { className: Qe.title, children: 'ショップ' }),
            p.jsxs('span', { className: Qe.gold, children: [d, ' G'] }),
          ],
        }),
        p.jsxs('div', {
          className: Qe.tabs,
          children: [
            p.jsx('button', {
              type: 'button',
              className: `${Qe.tab} ${c === 'buy' ? Qe.tabActive : ''}`,
              onClick: () => r('buy'),
              children: '買う',
            }),
            p.jsx('button', {
              type: 'button',
              className: `${Qe.tab} ${c === 'sell' ? Qe.tabActive : ''}`,
              onClick: () => r('sell'),
              children: '売る',
            }),
          ],
        }),
        p.jsx('div', {
          className: Qe.list,
          children:
            c === 'buy'
              ? m.map((g) =>
                  p.jsxs(
                    'div',
                    {
                      className: Qe.row,
                      children: [
                        p.jsxs('div', {
                          className: Qe.info,
                          children: [
                            p.jsx('span', { className: Qe.name, children: g.name }),
                            g.note ? p.jsx('span', { className: Qe.note, children: g.note }) : null,
                          ],
                        }),
                        p.jsxs('button', {
                          type: 'button',
                          className: Qe.action,
                          disabled: d < g.price,
                          onClick: () => void o((y) => oE(y, g.id)),
                          children: [g.price, ' G'],
                        }),
                      ],
                    },
                    g.id
                  )
                )
              : v.length === 0
                ? p.jsx('p', { className: Qe.empty, children: '売れる物がありません。' })
                : v.map((g) =>
                    p.jsxs(
                      'div',
                      {
                        className: Qe.row,
                        children: [
                          p.jsxs('div', {
                            className: Qe.info,
                            children: [
                              p.jsx('span', { className: Qe.name, children: _(g.itemId) }),
                              p.jsxs('span', { className: Qe.note, children: ['所持 ', g.qty] }),
                            ],
                          }),
                          p.jsxs('button', {
                            type: 'button',
                            className: Qe.action,
                            onClick: () => void o((y) => rE(y, g.itemId, 1)),
                            children: ['売却 ', pr(g.itemId), ' G'],
                          }),
                        ],
                      },
                      g.itemId
                    )
                  ),
        }),
        p.jsx('footer', {
          className: Qe.foot,
          children: p.jsx('button', {
            type: 'button',
            className: Qe.back,
            onClick: () => a('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  dE = '_layout_1xkiw_1',
  mE = '_head_1xkiw_12',
  hE = '_title_1xkiw_17',
  pE = '_subtitle_1xkiw_24',
  yE = '_body_1xkiw_30',
  gE = '_menu_1xkiw_34',
  _E = '_loading_1xkiw_40',
  vE = '_warn_1xkiw_45',
  bE = '_danger_1xkiw_52',
  SE = '_dialog_1xkiw_67',
  xE = '_dialogTitle_1xkiw_77',
  EE = '_field_1xkiw_82',
  TE = '_note_1xkiw_96',
  NE = '_dialogActions_1xkiw_102',
  kE = '_primary_1xkiw_107',
  AE = '_sub_1xkiw_24',
  CE = '_foot_1xkiw_132',
  Ke = {
    layout: dE,
    head: mE,
    title: hE,
    subtitle: pE,
    body: yE,
    menu: gE,
    loading: _E,
    warn: vE,
    danger: bE,
    dialog: SE,
    dialogTitle: xE,
    field: EE,
    note: TE,
    dialogActions: NE,
    primary: kE,
    sub: AE,
    foot: CE,
  },
  ME = '_card_3vsn6_1',
  RE = '_corrupted_3vsn6_14',
  jE = '_corruptedText_3vsn6_19',
  OE = '_corruptedNote_3vsn6_25',
  zE = '_guildName_3vsn6_31',
  wE = '_meta_3vsn6_36',
  un = {
    card: ME,
    corrupted: RE,
    corruptedText: jE,
    corruptedNote: OE,
    guildName: zE,
    meta: wE,
    continue: '_continue_3vsn6_56',
  },
  DE = (a) => {
    if (!a) return '-';
    const u = new Date(a),
      o = (c) => String(c).padStart(2, '0');
    return `${u.getFullYear()}/${o(u.getMonth() + 1)}/${o(u.getDate())} ${o(u.getHours())}:${o(u.getMinutes())}`;
  },
  BE = ({ meta: a, onContinue: u }) =>
    a.corrupted
      ? p.jsxs('div', {
          className: `${un.card} ${un.corrupted}`,
          children: [
            p.jsx('div', { className: un.corruptedText, children: 'セーブデータが破損しています' }),
            p.jsx('p', {
              className: un.corruptedNote,
              children: '「最初から」で新しく始められます。',
            }),
          ],
        })
      : p.jsxs('div', {
          className: un.card,
          children: [
            p.jsx('div', { className: un.guildName, children: a.guildName }),
            p.jsxs('dl', {
              className: un.meta,
              children: [
                p.jsxs('div', {
                  children: [
                    p.jsx('dt', { children: '最高到達階' }),
                    p.jsx('dd', {
                      children: a.deepestReached > 0 ? `${a.deepestReached}F` : '未踏破',
                    }),
                  ],
                }),
                p.jsxs('div', {
                  children: [
                    p.jsx('dt', { children: '団員' }),
                    p.jsxs('dd', { children: [a.memberCount, '人'] }),
                  ],
                }),
                p.jsxs('div', {
                  children: [
                    p.jsx('dt', { children: '最終セーブ' }),
                    p.jsx('dd', { children: DE(a.savedAt) }),
                  ],
                }),
              ],
            }),
            p.jsx('button', {
              type: 'button',
              className: un.continue,
              onClick: u,
              children: 'つづきから',
            }),
          ],
        }),
  UE = () => {
    const a = Ol(),
      { startNewGame: u, continueGame: o } = jn(),
      [c, r] = N.useState(null),
      [d, m] = N.useState(!0),
      [v, _] = N.useState('menu'),
      [g, y] = N.useState(''),
      [S, C] = N.useState(!1);
    N.useEffect(() => {
      (async () => (r(await dS()), m(!1)))();
    }, []);
    const R = c !== null && !c.corrupted,
      x = N.useCallback(async () => {
        C(!0);
        const A = await o();
        (C(!1), A.ok && a('/town'));
      }, [o, a]),
      j = N.useCallback(() => {
        (y(''), _(R ? 'confirm' : 'guildName'));
      }, [R]),
      b = N.useCallback(async () => {
        const A = g.trim() || 'ななしのギルド';
        (C(!0), await u(A), C(!1), a('/town'));
      }, [g, u, a]);
    return p.jsxs('div', {
      className: Ke.layout,
      children: [
        p.jsxs('header', {
          className: Ke.head,
          children: [
            p.jsx('h1', { className: Ke.title, children: '世界樹ライク' }),
            p.jsx('p', { className: Ke.subtitle, children: '無限タワー探索 RPG' }),
          ],
        }),
        p.jsx('main', {
          className: Ke.body,
          children: d
            ? p.jsx('p', { className: Ke.loading, children: '読み込み中...' })
            : v === 'guildName'
              ? p.jsxs('div', {
                  className: Ke.dialog,
                  children: [
                    p.jsx('h2', { className: Ke.dialogTitle, children: '新しいギルド' }),
                    p.jsxs('label', {
                      className: Ke.field,
                      children: [
                        p.jsx('span', { children: 'ギルド名' }),
                        p.jsx('input', {
                          type: 'text',
                          value: g,
                          maxLength: 16,
                          placeholder: 'ななしのギルド',
                          onChange: (A) => y(A.target.value),
                          autoFocus: !0,
                        }),
                      ],
                    }),
                    p.jsx('p', {
                      className: Ke.note,
                      children:
                        '冒険者はまだいません。開始後、ギルドメニューで仲間を作成してください。',
                    }),
                    p.jsxs('div', {
                      className: Ke.dialogActions,
                      children: [
                        p.jsx('button', {
                          type: 'button',
                          className: Ke.primary,
                          disabled: S,
                          onClick: b,
                          children: 'はじめる',
                        }),
                        p.jsx('button', {
                          type: 'button',
                          className: Ke.sub,
                          disabled: S,
                          onClick: () => _('menu'),
                          children: 'もどる',
                        }),
                      ],
                    }),
                  ],
                })
              : v === 'confirm'
                ? p.jsxs('div', {
                    className: Ke.dialog,
                    children: [
                      p.jsx('h2', { className: Ke.dialogTitle, children: '最初から始めますか？' }),
                      p.jsxs('p', {
                        className: Ke.warn,
                        children: [
                          '現在のセーブデータ「',
                          c == null ? void 0 : c.guildName,
                          '」は上書きされ、元に戻せません。',
                        ],
                      }),
                      p.jsxs('div', {
                        className: Ke.dialogActions,
                        children: [
                          p.jsx('button', {
                            type: 'button',
                            className: Ke.danger,
                            disabled: S,
                            onClick: () => _('guildName'),
                            children: 'データを消して始める',
                          }),
                          p.jsx('button', {
                            type: 'button',
                            className: Ke.sub,
                            disabled: S,
                            onClick: () => _('menu'),
                            children: 'もどる',
                          }),
                        ],
                      }),
                    ],
                  })
                : p.jsxs('div', {
                    className: Ke.menu,
                    children: [
                      c !== null && p.jsx(BE, { meta: c, onContinue: () => void x() }),
                      p.jsx('button', {
                        type: 'button',
                        className: R ? Ke.sub : Ke.primary,
                        onClick: j,
                        children: '最初から',
                      }),
                    ],
                  }),
        }),
        p.jsxs('footer', { className: Ke.foot, children: ['v', '0.1.17'] }),
      ],
    });
  },
  LE = '_layout_1wdo2_1',
  HE = '_head_1wdo2_12',
  qE = '_guildName_1wdo2_16',
  GE = '_stats_1wdo2_21',
  YE = '_hint_1wdo2_40',
  XE = '_menu_1wdo2_50',
  $E = '_foot_1wdo2_57',
  VE = '_exit_1wdo2_61',
  sn = { layout: LE, head: HE, guildName: qE, stats: GE, hint: YE, menu: XE, foot: $E, exit: VE },
  QE = '_button_1tp4a_1',
  KE = '_primary_1tp4a_26',
  ZE = '_label_1tp4a_32',
  IE = '_description_1tp4a_37',
  ts = { button: QE, primary: KE, label: ZE, description: IE },
  xi = ({ label: a, description: u, variant: o = 'default', disabled: c = !1, onClick: r }) =>
    p.jsxs('button', {
      type: 'button',
      className: `${ts.button} ${o === 'primary' ? ts.primary : ''}`,
      disabled: c,
      onClick: r,
      children: [
        p.jsx('span', { className: ts.label, children: a }),
        u ? p.jsx('span', { className: ts.description, children: u }) : null,
      ],
    }),
  JE = () => {
    const a = Ol(),
      { save: u, exitToTitle: o, applyAndPersist: c } = jn();
    if (!u) return p.jsx(jl, { to: '/title', replace: !0 });
    const { guild: r, towerState: d, diveState: m } = u,
      v = r.members.length > 0,
      _ = () => {
        (o(), a('/title'));
      },
      g = async () => {
        (m || (await c((y) => Rb(y, 1))), a('/dungeon'));
      };
    return p.jsxs('div', {
      className: sn.layout,
      children: [
        p.jsxs('header', {
          className: sn.head,
          children: [
            p.jsx('div', { className: sn.guildName, children: r.name }),
            p.jsxs('dl', {
              className: sn.stats,
              children: [
                p.jsxs('div', {
                  children: [
                    p.jsx('dt', { children: '所持金' }),
                    p.jsxs('dd', { children: [r.gold, ' G'] }),
                  ],
                }),
                p.jsxs('div', {
                  children: [
                    p.jsx('dt', { children: '最高到達' }),
                    p.jsx('dd', {
                      children: d.record.deepestReached > 0 ? `${d.record.deepestReached}F` : '-',
                    }),
                  ],
                }),
                p.jsxs('div', {
                  children: [
                    p.jsx('dt', { children: '団員' }),
                    p.jsxs('dd', { children: [r.members.length, '人'] }),
                  ],
                }),
              ],
            }),
          ],
        }),
        !v &&
          p.jsx('p', {
            className: sn.hint,
            children:
              'まずは「ギルド管理」で冒険者を作成してください。団員がいないとダイブできません。',
          }),
        p.jsxs('main', {
          className: sn.menu,
          children: [
            p.jsx(xi, {
              label: m ? '潜行を再開' : 'ダイブ開始',
              description: v
                ? m
                  ? `${m.depth}F から再開`
                  : '第1階からタワーへ潜る'
                : '団員が必要です',
              variant: 'primary',
              disabled: !v,
              onClick: () => void g(),
            }),
            p.jsx(xi, {
              label: 'ギルド管理',
              description: '編成・キャラ作成',
              onClick: () => a('/guild'),
            }),
            p.jsx(xi, {
              label: 'ショップ',
              description: '装備・アイテム売買',
              onClick: () => a('/shop'),
            }),
            p.jsx(xi, { label: '鍛冶屋', description: '武器強化（Phase 4）', disabled: !0 }),
            p.jsx(xi, {
              label: '図鑑 / 記録',
              description: '到達記録・図鑑（Phase 4-5）',
              disabled: !0,
            }),
          ],
        }),
        p.jsx('footer', {
          className: sn.foot,
          children: p.jsx('button', {
            type: 'button',
            className: sn.exit,
            onClick: _,
            children: 'タイトルへ戻る',
          }),
        }),
      ],
    });
  };
function WE() {
  return p.jsxs(rv, {
    children: [
      p.jsx(ul, { path: '/', element: p.jsx(jl, { to: '/title', replace: !0 }) }),
      p.jsx(ul, { path: '/title', element: p.jsx(UE, {}) }),
      p.jsx(ul, { path: '/town', element: p.jsx(JE, {}) }),
      p.jsx(ul, { path: '/guild', element: p.jsx($2, {}) }),
      p.jsx(ul, { path: '/guild/char/:id', element: p.jsx(qx, {}) }),
      p.jsx(ul, { path: '/shop', element: p.jsx(fE, {}) }),
      p.jsx(ul, { path: '/dungeon', element: p.jsx(v2, {}) }),
      p.jsx(ul, { path: '/battle', element: p.jsx(yS, {}) }),
      p.jsx(ul, { path: '*', element: p.jsx(Gx, {}) }),
    ],
  });
}
const FE = {
    races: Zt,
    classes: ht,
    titles: va,
    skills: Nr,
    unionSkills: Ti,
    summons: Ta,
    gatherTypes: An,
    recipes: Na,
    enemies: Rn,
    items: lt,
    equipment: wt,
  },
  PE = /^[a-z]+_[a-z0-9_]+$/;
function il(a, u, o) {
  for (const c of u)
    PE.test(c) || o.push(`[${a}] ID 命名規約違反: "${c}"（期待: <domain>_<name>）`);
}
function lr(a, u, o, c) {
  const r = new Set(u.skills.map((d) => d.skillId));
  for (const d of u.skills) {
    o.has(d.skillId) || c.push(`[${a}] 未定義スキルを参照: "${d.skillId}"`);
    for (const m of d.requires ?? [])
      r.has(m.skillId) ||
        c.push(`[${a}] スキル "${d.skillId}" の前提 "${m.skillId}" が同ツリーに存在しない`);
  }
}
function eT() {
  const a = [],
    {
      races: u,
      classes: o,
      titles: c,
      skills: r,
      unionSkills: d,
      summons: m,
      gatherTypes: v,
      recipes: _,
      enemies: g,
      items: y,
      equipment: S,
    } = FE;
  (il('races', Object.keys(u), a),
    il('classes', Object.keys(o), a),
    il('titles', Object.keys(c), a),
    il('skills', Object.keys(r), a),
    il('enemies', Object.keys(g), a),
    il('items', Object.keys(y), a),
    il('equipment', Object.keys(S), a));
  const C = (b, A) => {
    for (const [w, $] of Object.entries(A))
      w !== $.id && a.push(`[${b}] キー "${w}" と id "${$.id}" が不一致`);
  };
  (C('races', u),
    C('classes', o),
    C('titles', c),
    C('skills', r),
    C('enemies', g),
    C('items', y),
    C('equipment', S));
  const R = new Set(Object.keys(r)),
    x = new Set(Object.keys(o)),
    j = new Set(Object.keys(c));
  for (const b of Object.values(u)) {
    (x.has(b.defaultClassId) ||
      a.push(`[races] "${b.id}" の defaultClassId "${b.defaultClassId}" が未定義`),
      lr(`races/${b.id}`, b.unionSkillTree, R, a));
    for (const A of b.unionSkillTree.skills) {
      const w = d[A.skillId];
      w
        ? w.raceId !== b.id &&
          a.push(`[races/${b.id}] ユニオンスキル "${A.skillId}" の raceId "${w.raceId}" が不一致`)
        : a.push(`[races/${b.id}] ユニオンスキル "${A.skillId}" の効果定義が UNION_SKILLS に無い`);
    }
  }
  il('unionSkills', Object.keys(d), a);
  for (const [b, A] of Object.entries(d))
    (b !== A.id && a.push(`[unionSkills] キー "${b}" と id "${A.id}" が不一致`),
      A.id in r || a.push(`[unionSkills] "${A.id}" が skills に未定義`),
      A.requiredParticipants < 1 &&
        a.push(`[unionSkills] "${A.id}" の requiredParticipants が 1 未満`),
      (A.gaugeCostPerParticipant < 0 || A.gaugeCostPerParticipant > 100) &&
        a.push(`[unionSkills] "${A.id}" の gaugeCostPerParticipant が 0..100 外`),
      A.id in cn &&
        a.push(
          `[unionSkills] "${A.id}" が BATTLE_SKILLS にも存在（通常スキルとして撃ててしまう）`
        ));
  il('summons', Object.keys(m), a);
  for (const [b, A] of Object.entries(m))
    b !== A.id && a.push(`[summons] キー "${b}" と id "${A.id}" が不一致`);
  for (const b of Object.values(cn))
    for (const A of b.effects)
      A.kind === 'summon' &&
        !(A.summonKind in m) &&
        a.push(`[battleSkills] "${b.id}" の召喚 "${A.summonKind}" が未定義`);
  for (const [b, A] of Object.entries(v)) {
    (b !== A.type && a.push(`[gatherTypes] キー "${b}" と type "${A.type}" が不一致`),
      R.has(A.requiredSkillId) ||
        a.push(`[gatherTypes] "${A.type}" の requiredSkillId "${A.requiredSkillId}" が未定義`));
    for (const w of A.drops) {
      if (!(w.itemId in y))
        a.push(`[gatherTypes] "${A.type}" のドロップ "${w.itemId}" が未定義アイテム`);
      else {
        const $ = y[w.itemId].category === 'food';
        (A.food &&
          !$ &&
          a.push(`[gatherTypes] 食材系統 "${A.type}" のドロップ "${w.itemId}" が food でない`),
          !A.food &&
            $ &&
            a.push(`[gatherTypes] 素材系統 "${A.type}" のドロップ "${w.itemId}" が food`));
      }
      w.weight <= 0 && a.push(`[gatherTypes] "${A.type}" のドロップ重みが正でない`);
    }
  }
  il('recipes', Object.keys(_), a);
  for (const [b, A] of Object.entries(_)) {
    b !== A.id && a.push(`[recipes] キー "${b}" と id "${A.id}" が不一致`);
    for (const w of A.ingredients)
      w.itemId in y
        ? y[w.itemId].category !== 'food' &&
          a.push(`[recipes] "${A.id}" の材料 "${w.itemId}" が food カテゴリでない`)
        : a.push(`[recipes] "${A.id}" の材料 "${w.itemId}" が未定義`);
    A.result.itemId in y
      ? y[A.result.itemId].category !== 'food' &&
        a.push(`[recipes] "${A.id}" の結果 "${A.result.itemId}" が food カテゴリでない`)
      : a.push(`[recipes] "${A.id}" の結果 "${A.result.itemId}" が未定義`);
  }
  for (const b of Object.values(o)) {
    lr(`classes/${b.id}`, b.skillTree, R, a);
    for (const A of b.titleOptions) {
      if (!j.has(A)) {
        a.push(`[classes] "${b.id}" の称号 "${A}" が未定義`);
        continue;
      }
      c[A].parentClassId !== b.id &&
        a.push(`[classes] 称号 "${A}" の parentClassId が "${b.id}" と不一致`);
    }
  }
  for (const b of Object.values(c))
    (x.has(b.parentClassId) ||
      a.push(`[titles] "${b.id}" の parentClassId "${b.parentClassId}" が未定義`),
      lr(`titles/${b.id}`, b.skillTree, R, a));
  for (const b of Object.values(S))
    (b.slot === 'weapon' &&
      !b.weaponType &&
      a.push(`[equipment] "${b.id}" は weapon だが weaponType が未設定`),
      b.slot === 'armor' &&
        !b.armorType &&
        a.push(`[equipment] "${b.id}" は armor だが armorType が未設定`),
      (b.buyPrice < 0 || b.tier < 0) && a.push(`[equipment] "${b.id}" の buyPrice/tier が負`));
  for (const b of Object.values(y))
    (b.buyPrice < 0 && a.push(`[items] "${b.id}" の buyPrice が負`),
      b.category === 'consumable' &&
        !b.useContext &&
        !b.effects &&
        a.push(`[items] 消費アイテム "${b.id}" に useContext も effects も無い（使用不能）`));
  for (const b of Object.values(g))
    for (const A of b.drops ?? [])
      (A.itemId in y || a.push(`[enemies] "${b.id}" のドロップ "${A.itemId}" が未定義アイテム`),
        (A.rate < 0 || A.rate > 1) &&
          a.push(`[enemies] "${b.id}" のドロップ "${A.itemId}" の rate が 0..1 外`));
  for (const [b, A] of Object.entries(Ry)) {
    b in y || a.push(`[SELL_UNLOCKS] キー素材 "${b}" が未定義`);
    for (const w of A) w in S || a.push(`[SELL_UNLOCKS] 解放先装備 "${w}" が未定義`);
  }
  return { ok: a.length === 0, errors: a };
}
const Ep = eT();
Ep.ok || console.error('マスターデータ検証エラー:', Ep.errors);
const jy = document.getElementById('root');
if (!jy) throw new Error('Failed to find #root element');
d_.createRoot(jy).render(
  p.jsx(wv, { basename: '/sekaiju-like-game', children: p.jsx(pS, { children: p.jsx(WE, {}) }) })
);
