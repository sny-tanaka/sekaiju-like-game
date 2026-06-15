var pv = Object.defineProperty;
var hv = (n, i, c) =>
  i in n ? pv(n, i, { enumerable: !0, configurable: !0, writable: !0, value: c }) : (n[i] = c);
var Io = (n, i, c) => hv(n, typeof i != 'symbol' ? i + '' : i, c);
(function () {
  const i = document.createElement('link').relList;
  if (i && i.supports && i.supports('modulepreload')) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) u(r);
  new MutationObserver((r) => {
    for (const f of r)
      if (f.type === 'childList')
        for (const m of f.addedNodes) m.tagName === 'LINK' && m.rel === 'modulepreload' && u(m);
  }).observe(document, { childList: !0, subtree: !0 });
  function c(r) {
    const f = {};
    return (
      r.integrity && (f.integrity = r.integrity),
      r.referrerPolicy && (f.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === 'use-credentials'
        ? (f.credentials = 'include')
        : r.crossOrigin === 'anonymous'
          ? (f.credentials = 'omit')
          : (f.credentials = 'same-origin'),
      f
    );
  }
  function u(r) {
    if (r.ep) return;
    r.ep = !0;
    const f = c(r);
    fetch(r.href, f);
  }
})();
var $o = { exports: {} },
  xi = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Qp;
function _v() {
  if (Qp) return xi;
  Qp = 1;
  var n = Symbol.for('react.transitional.element'),
    i = Symbol.for('react.fragment');
  function c(u, r, f) {
    var m = null;
    if ((f !== void 0 && (m = '' + f), r.key !== void 0 && (m = '' + r.key), 'key' in r)) {
      f = {};
      for (var h in r) h !== 'key' && (f[h] = r[h]);
    } else f = r;
    return ((r = f.ref), { $$typeof: n, type: u, key: m, ref: r !== void 0 ? r : null, props: f });
  }
  return ((xi.Fragment = i), (xi.jsx = c), (xi.jsxs = c), xi);
}
var Kp;
function gv() {
  return (Kp || ((Kp = 1), ($o.exports = _v())), $o.exports);
}
var p = gv(),
  Yo = { exports: {} },
  Ti = {},
  Xo = { exports: {} },
  Vo = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Zp;
function yv() {
  return (
    Zp ||
      ((Zp = 1),
      (function (n) {
        function i(L, K) {
          var le = L.length;
          L.push(K);
          e: for (; 0 < le; ) {
            var ge = (le - 1) >>> 1,
              xe = L[ge];
            if (0 < r(xe, K)) ((L[ge] = K), (L[le] = xe), (le = ge));
            else break e;
          }
        }
        function c(L) {
          return L.length === 0 ? null : L[0];
        }
        function u(L) {
          if (L.length === 0) return null;
          var K = L[0],
            le = L.pop();
          if (le !== K) {
            L[0] = le;
            e: for (var ge = 0, xe = L.length, C = xe >>> 1; ge < C; ) {
              var G = 2 * (ge + 1) - 1,
                W = L[G],
                ne = G + 1,
                he = L[ne];
              if (0 > r(W, le))
                ne < xe && 0 > r(he, W)
                  ? ((L[ge] = he), (L[ne] = le), (ge = ne))
                  : ((L[ge] = W), (L[G] = le), (ge = G));
              else if (ne < xe && 0 > r(he, le)) ((L[ge] = he), (L[ne] = le), (ge = ne));
              else break e;
            }
          }
          return K;
        }
        function r(L, K) {
          var le = L.sortIndex - K.sortIndex;
          return le !== 0 ? le : L.id - K.id;
        }
        if (
          ((n.unstable_now = void 0),
          typeof performance == 'object' && typeof performance.now == 'function')
        ) {
          var f = performance;
          n.unstable_now = function () {
            return f.now();
          };
        } else {
          var m = Date,
            h = m.now();
          n.unstable_now = function () {
            return m.now() - h;
          };
        }
        var y = [],
          g = [],
          v = 1,
          b = null,
          k = 3,
          j = !1,
          S = !1,
          R = !1,
          A = !1,
          w = typeof setTimeout == 'function' ? setTimeout : null,
          T = typeof clearTimeout == 'function' ? clearTimeout : null,
          V = typeof setImmediate < 'u' ? setImmediate : null;
        function P(L) {
          for (var K = c(g); K !== null; ) {
            if (K.callback === null) u(g);
            else if (K.startTime <= L) (u(g), (K.sortIndex = K.expirationTime), i(y, K));
            else break;
            K = c(g);
          }
        }
        function ee(L) {
          if (((R = !1), P(L), !S))
            if (c(y) !== null) ((S = !0), X || ((X = !0), ce()));
            else {
              var K = c(g);
              K !== null && pe(ee, K.startTime - L);
            }
        }
        var X = !1,
          H = -1,
          q = 5,
          Q = -1;
        function te() {
          return A ? !0 : !(n.unstable_now() - Q < q);
        }
        function se() {
          if (((A = !1), X)) {
            var L = n.unstable_now();
            Q = L;
            var K = !0;
            try {
              e: {
                ((S = !1), R && ((R = !1), T(H), (H = -1)), (j = !0));
                var le = k;
                try {
                  t: {
                    for (P(L), b = c(y); b !== null && !(b.expirationTime > L && te()); ) {
                      var ge = b.callback;
                      if (typeof ge == 'function') {
                        ((b.callback = null), (k = b.priorityLevel));
                        var xe = ge(b.expirationTime <= L);
                        if (((L = n.unstable_now()), typeof xe == 'function')) {
                          ((b.callback = xe), P(L), (K = !0));
                          break t;
                        }
                        (b === c(y) && u(y), P(L));
                      } else u(y);
                      b = c(y);
                    }
                    if (b !== null) K = !0;
                    else {
                      var C = c(g);
                      (C !== null && pe(ee, C.startTime - L), (K = !1));
                    }
                  }
                  break e;
                } finally {
                  ((b = null), (k = le), (j = !1));
                }
                K = void 0;
              }
            } finally {
              K ? ce() : (X = !1);
            }
          }
        }
        var ce;
        if (typeof V == 'function')
          ce = function () {
            V(se);
          };
        else if (typeof MessageChannel < 'u') {
          var Z = new MessageChannel(),
            J = Z.port2;
          ((Z.port1.onmessage = se),
            (ce = function () {
              J.postMessage(null);
            }));
        } else
          ce = function () {
            w(se, 0);
          };
        function pe(L, K) {
          H = w(function () {
            L(n.unstable_now());
          }, K);
        }
        ((n.unstable_IdlePriority = 5),
          (n.unstable_ImmediatePriority = 1),
          (n.unstable_LowPriority = 4),
          (n.unstable_NormalPriority = 3),
          (n.unstable_Profiling = null),
          (n.unstable_UserBlockingPriority = 2),
          (n.unstable_cancelCallback = function (L) {
            L.callback = null;
          }),
          (n.unstable_forceFrameRate = function (L) {
            0 > L || 125 < L
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (q = 0 < L ? Math.floor(1e3 / L) : 5);
          }),
          (n.unstable_getCurrentPriorityLevel = function () {
            return k;
          }),
          (n.unstable_next = function (L) {
            switch (k) {
              case 1:
              case 2:
              case 3:
                var K = 3;
                break;
              default:
                K = k;
            }
            var le = k;
            k = K;
            try {
              return L();
            } finally {
              k = le;
            }
          }),
          (n.unstable_requestPaint = function () {
            A = !0;
          }),
          (n.unstable_runWithPriority = function (L, K) {
            switch (L) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                L = 3;
            }
            var le = k;
            k = L;
            try {
              return K();
            } finally {
              k = le;
            }
          }),
          (n.unstable_scheduleCallback = function (L, K, le) {
            var ge = n.unstable_now();
            switch (
              (typeof le == 'object' && le !== null
                ? ((le = le.delay), (le = typeof le == 'number' && 0 < le ? ge + le : ge))
                : (le = ge),
              L)
            ) {
              case 1:
                var xe = -1;
                break;
              case 2:
                xe = 250;
                break;
              case 5:
                xe = 1073741823;
                break;
              case 4:
                xe = 1e4;
                break;
              default:
                xe = 5e3;
            }
            return (
              (xe = le + xe),
              (L = {
                id: v++,
                callback: K,
                priorityLevel: L,
                startTime: le,
                expirationTime: xe,
                sortIndex: -1,
              }),
              le > ge
                ? ((L.sortIndex = le),
                  i(g, L),
                  c(y) === null && L === c(g) && (R ? (T(H), (H = -1)) : (R = !0), pe(ee, le - ge)))
                : ((L.sortIndex = xe), i(y, L), S || j || ((S = !0), X || ((X = !0), ce()))),
              L
            );
          }),
          (n.unstable_shouldYield = te),
          (n.unstable_wrapCallback = function (L) {
            var K = k;
            return function () {
              var le = k;
              k = K;
              try {
                return L.apply(this, arguments);
              } finally {
                k = le;
              }
            };
          }));
      })(Vo)),
    Vo
  );
}
var Jp;
function vv() {
  return (Jp || ((Jp = 1), (Xo.exports = yv())), Xo.exports);
}
var Qo = { exports: {} },
  _e = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Wp;
function bv() {
  if (Wp) return _e;
  Wp = 1;
  var n = Symbol.for('react.transitional.element'),
    i = Symbol.for('react.portal'),
    c = Symbol.for('react.fragment'),
    u = Symbol.for('react.strict_mode'),
    r = Symbol.for('react.profiler'),
    f = Symbol.for('react.consumer'),
    m = Symbol.for('react.context'),
    h = Symbol.for('react.forward_ref'),
    y = Symbol.for('react.suspense'),
    g = Symbol.for('react.memo'),
    v = Symbol.for('react.lazy'),
    b = Symbol.for('react.activity'),
    k = Symbol.iterator;
  function j(C) {
    return C === null || typeof C != 'object'
      ? null
      : ((C = (k && C[k]) || C['@@iterator']), typeof C == 'function' ? C : null);
  }
  var S = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    R = Object.assign,
    A = {};
  function w(C, G, W) {
    ((this.props = C), (this.context = G), (this.refs = A), (this.updater = W || S));
  }
  ((w.prototype.isReactComponent = {}),
    (w.prototype.setState = function (C, G) {
      if (typeof C != 'object' && typeof C != 'function' && C != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, C, G, 'setState');
    }),
    (w.prototype.forceUpdate = function (C) {
      this.updater.enqueueForceUpdate(this, C, 'forceUpdate');
    }));
  function T() {}
  T.prototype = w.prototype;
  function V(C, G, W) {
    ((this.props = C), (this.context = G), (this.refs = A), (this.updater = W || S));
  }
  var P = (V.prototype = new T());
  ((P.constructor = V), R(P, w.prototype), (P.isPureReactComponent = !0));
  var ee = Array.isArray;
  function X() {}
  var H = { H: null, A: null, T: null, S: null },
    q = Object.prototype.hasOwnProperty;
  function Q(C, G, W) {
    var ne = W.ref;
    return { $$typeof: n, type: C, key: G, ref: ne !== void 0 ? ne : null, props: W };
  }
  function te(C, G) {
    return Q(C.type, G, C.props);
  }
  function se(C) {
    return typeof C == 'object' && C !== null && C.$$typeof === n;
  }
  function ce(C) {
    var G = { '=': '=0', ':': '=2' };
    return (
      '$' +
      C.replace(/[=:]/g, function (W) {
        return G[W];
      })
    );
  }
  var Z = /\/+/g;
  function J(C, G) {
    return typeof C == 'object' && C !== null && C.key != null ? ce('' + C.key) : G.toString(36);
  }
  function pe(C) {
    switch (C.status) {
      case 'fulfilled':
        return C.value;
      case 'rejected':
        throw C.reason;
      default:
        switch (
          (typeof C.status == 'string'
            ? C.then(X, X)
            : ((C.status = 'pending'),
              C.then(
                function (G) {
                  C.status === 'pending' && ((C.status = 'fulfilled'), (C.value = G));
                },
                function (G) {
                  C.status === 'pending' && ((C.status = 'rejected'), (C.reason = G));
                }
              )),
          C.status)
        ) {
          case 'fulfilled':
            return C.value;
          case 'rejected':
            throw C.reason;
        }
    }
    throw C;
  }
  function L(C, G, W, ne, he) {
    var be = typeof C;
    (be === 'undefined' || be === 'boolean') && (C = null);
    var Ce = !1;
    if (C === null) Ce = !0;
    else
      switch (be) {
        case 'bigint':
        case 'string':
        case 'number':
          Ce = !0;
          break;
        case 'object':
          switch (C.$$typeof) {
            case n:
            case i:
              Ce = !0;
              break;
            case v:
              return ((Ce = C._init), L(Ce(C._payload), G, W, ne, he));
          }
      }
    if (Ce)
      return (
        (he = he(C)),
        (Ce = ne === '' ? '.' + J(C, 0) : ne),
        ee(he)
          ? ((W = ''),
            Ce != null && (W = Ce.replace(Z, '$&/') + '/'),
            L(he, G, W, '', function (I) {
              return I;
            }))
          : he != null &&
            (se(he) &&
              (he = te(
                he,
                W +
                  (he.key == null || (C && C.key === he.key)
                    ? ''
                    : ('' + he.key).replace(Z, '$&/') + '/') +
                  Ce
              )),
            G.push(he)),
        1
      );
    Ce = 0;
    var st = ne === '' ? '.' : ne + ':';
    if (ee(C))
      for (var Xe = 0; Xe < C.length; Xe++)
        ((ne = C[Xe]), (be = st + J(ne, Xe)), (Ce += L(ne, G, W, be, he)));
    else if (((Xe = j(C)), typeof Xe == 'function'))
      for (C = Xe.call(C), Xe = 0; !(ne = C.next()).done; )
        ((ne = ne.value), (be = st + J(ne, Xe++)), (Ce += L(ne, G, W, be, he)));
    else if (be === 'object') {
      if (typeof C.then == 'function') return L(pe(C), G, W, ne, he);
      throw (
        (G = String(C)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (G === '[object Object]' ? 'object with keys {' + Object.keys(C).join(', ') + '}' : G) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return Ce;
  }
  function K(C, G, W) {
    if (C == null) return C;
    var ne = [],
      he = 0;
    return (
      L(C, ne, '', '', function (be) {
        return G.call(W, be, he++);
      }),
      ne
    );
  }
  function le(C) {
    if (C._status === -1) {
      var G = C._result;
      ((G = G()),
        G.then(
          function (W) {
            (C._status === 0 || C._status === -1) && ((C._status = 1), (C._result = W));
          },
          function (W) {
            (C._status === 0 || C._status === -1) && ((C._status = 2), (C._result = W));
          }
        ),
        C._status === -1 && ((C._status = 0), (C._result = G)));
    }
    if (C._status === 1) return C._result.default;
    throw C._result;
  }
  var ge =
      typeof reportError == 'function'
        ? reportError
        : function (C) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var G = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof C == 'object' && C !== null && typeof C.message == 'string'
                    ? String(C.message)
                    : String(C),
                error: C,
              });
              if (!window.dispatchEvent(G)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', C);
              return;
            }
            console.error(C);
          },
    xe = {
      map: K,
      forEach: function (C, G, W) {
        K(
          C,
          function () {
            G.apply(this, arguments);
          },
          W
        );
      },
      count: function (C) {
        var G = 0;
        return (
          K(C, function () {
            G++;
          }),
          G
        );
      },
      toArray: function (C) {
        return (
          K(C, function (G) {
            return G;
          }) || []
        );
      },
      only: function (C) {
        if (!se(C))
          throw Error('React.Children.only expected to receive a single React element child.');
        return C;
      },
    };
  return (
    (_e.Activity = b),
    (_e.Children = xe),
    (_e.Component = w),
    (_e.Fragment = c),
    (_e.Profiler = r),
    (_e.PureComponent = V),
    (_e.StrictMode = u),
    (_e.Suspense = y),
    (_e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = H),
    (_e.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (C) {
        return H.H.useMemoCache(C);
      },
    }),
    (_e.cache = function (C) {
      return function () {
        return C.apply(null, arguments);
      };
    }),
    (_e.cacheSignal = function () {
      return null;
    }),
    (_e.cloneElement = function (C, G, W) {
      if (C == null) throw Error('The argument must be a React element, but you passed ' + C + '.');
      var ne = R({}, C.props),
        he = C.key;
      if (G != null)
        for (be in (G.key !== void 0 && (he = '' + G.key), G))
          !q.call(G, be) ||
            be === 'key' ||
            be === '__self' ||
            be === '__source' ||
            (be === 'ref' && G.ref === void 0) ||
            (ne[be] = G[be]);
      var be = arguments.length - 2;
      if (be === 1) ne.children = W;
      else if (1 < be) {
        for (var Ce = Array(be), st = 0; st < be; st++) Ce[st] = arguments[st + 2];
        ne.children = Ce;
      }
      return Q(C.type, he, ne);
    }),
    (_e.createContext = function (C) {
      return (
        (C = {
          $$typeof: m,
          _currentValue: C,
          _currentValue2: C,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (C.Provider = C),
        (C.Consumer = { $$typeof: f, _context: C }),
        C
      );
    }),
    (_e.createElement = function (C, G, W) {
      var ne,
        he = {},
        be = null;
      if (G != null)
        for (ne in (G.key !== void 0 && (be = '' + G.key), G))
          q.call(G, ne) && ne !== 'key' && ne !== '__self' && ne !== '__source' && (he[ne] = G[ne]);
      var Ce = arguments.length - 2;
      if (Ce === 1) he.children = W;
      else if (1 < Ce) {
        for (var st = Array(Ce), Xe = 0; Xe < Ce; Xe++) st[Xe] = arguments[Xe + 2];
        he.children = st;
      }
      if (C && C.defaultProps)
        for (ne in ((Ce = C.defaultProps), Ce)) he[ne] === void 0 && (he[ne] = Ce[ne]);
      return Q(C, be, he);
    }),
    (_e.createRef = function () {
      return { current: null };
    }),
    (_e.forwardRef = function (C) {
      return { $$typeof: h, render: C };
    }),
    (_e.isValidElement = se),
    (_e.lazy = function (C) {
      return { $$typeof: v, _payload: { _status: -1, _result: C }, _init: le };
    }),
    (_e.memo = function (C, G) {
      return { $$typeof: g, type: C, compare: G === void 0 ? null : G };
    }),
    (_e.startTransition = function (C) {
      var G = H.T,
        W = {};
      H.T = W;
      try {
        var ne = C(),
          he = H.S;
        (he !== null && he(W, ne),
          typeof ne == 'object' && ne !== null && typeof ne.then == 'function' && ne.then(X, ge));
      } catch (be) {
        ge(be);
      } finally {
        (G !== null && W.types !== null && (G.types = W.types), (H.T = G));
      }
    }),
    (_e.unstable_useCacheRefresh = function () {
      return H.H.useCacheRefresh();
    }),
    (_e.use = function (C) {
      return H.H.use(C);
    }),
    (_e.useActionState = function (C, G, W) {
      return H.H.useActionState(C, G, W);
    }),
    (_e.useCallback = function (C, G) {
      return H.H.useCallback(C, G);
    }),
    (_e.useContext = function (C) {
      return H.H.useContext(C);
    }),
    (_e.useDebugValue = function () {}),
    (_e.useDeferredValue = function (C, G) {
      return H.H.useDeferredValue(C, G);
    }),
    (_e.useEffect = function (C, G) {
      return H.H.useEffect(C, G);
    }),
    (_e.useEffectEvent = function (C) {
      return H.H.useEffectEvent(C);
    }),
    (_e.useId = function () {
      return H.H.useId();
    }),
    (_e.useImperativeHandle = function (C, G, W) {
      return H.H.useImperativeHandle(C, G, W);
    }),
    (_e.useInsertionEffect = function (C, G) {
      return H.H.useInsertionEffect(C, G);
    }),
    (_e.useLayoutEffect = function (C, G) {
      return H.H.useLayoutEffect(C, G);
    }),
    (_e.useMemo = function (C, G) {
      return H.H.useMemo(C, G);
    }),
    (_e.useOptimistic = function (C, G) {
      return H.H.useOptimistic(C, G);
    }),
    (_e.useReducer = function (C, G, W) {
      return H.H.useReducer(C, G, W);
    }),
    (_e.useRef = function (C) {
      return H.H.useRef(C);
    }),
    (_e.useState = function (C) {
      return H.H.useState(C);
    }),
    (_e.useSyncExternalStore = function (C, G, W) {
      return H.H.useSyncExternalStore(C, G, W);
    }),
    (_e.useTransition = function () {
      return H.H.useTransition();
    }),
    (_e.version = '19.2.5'),
    _e
  );
}
var Fp;
function xr() {
  return (Fp || ((Fp = 1), (Qo.exports = bv())), Qo.exports);
}
var Ko = { exports: {} },
  gt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Pp;
function Sv() {
  if (Pp) return gt;
  Pp = 1;
  var n = xr();
  function i(y) {
    var g = 'https://react.dev/errors/' + y;
    if (1 < arguments.length) {
      g += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var v = 2; v < arguments.length; v++) g += '&args[]=' + encodeURIComponent(arguments[v]);
    }
    return (
      'Minified React error #' +
      y +
      '; visit ' +
      g +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function c() {}
  var u = {
      d: {
        f: c,
        r: function () {
          throw Error(i(522));
        },
        D: c,
        C: c,
        L: c,
        m: c,
        X: c,
        S: c,
        M: c,
      },
      p: 0,
      findDOMNode: null,
    },
    r = Symbol.for('react.portal');
  function f(y, g, v) {
    var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: b == null ? null : '' + b,
      children: y,
      containerInfo: g,
      implementation: v,
    };
  }
  var m = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(y, g) {
    if (y === 'font') return '';
    if (typeof g == 'string') return g === 'use-credentials' ? g : '';
  }
  return (
    (gt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u),
    (gt.createPortal = function (y, g) {
      var v = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!g || (g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)) throw Error(i(299));
      return f(y, g, null, v);
    }),
    (gt.flushSync = function (y) {
      var g = m.T,
        v = u.p;
      try {
        if (((m.T = null), (u.p = 2), y)) return y();
      } finally {
        ((m.T = g), (u.p = v), u.d.f());
      }
    }),
    (gt.preconnect = function (y, g) {
      typeof y == 'string' &&
        (g
          ? ((g = g.crossOrigin),
            (g = typeof g == 'string' ? (g === 'use-credentials' ? g : '') : void 0))
          : (g = null),
        u.d.C(y, g));
    }),
    (gt.prefetchDNS = function (y) {
      typeof y == 'string' && u.d.D(y);
    }),
    (gt.preinit = function (y, g) {
      if (typeof y == 'string' && g && typeof g.as == 'string') {
        var v = g.as,
          b = h(v, g.crossOrigin),
          k = typeof g.integrity == 'string' ? g.integrity : void 0,
          j = typeof g.fetchPriority == 'string' ? g.fetchPriority : void 0;
        v === 'style'
          ? u.d.S(y, typeof g.precedence == 'string' ? g.precedence : void 0, {
              crossOrigin: b,
              integrity: k,
              fetchPriority: j,
            })
          : v === 'script' &&
            u.d.X(y, {
              crossOrigin: b,
              integrity: k,
              fetchPriority: j,
              nonce: typeof g.nonce == 'string' ? g.nonce : void 0,
            });
      }
    }),
    (gt.preinitModule = function (y, g) {
      if (typeof y == 'string')
        if (typeof g == 'object' && g !== null) {
          if (g.as == null || g.as === 'script') {
            var v = h(g.as, g.crossOrigin);
            u.d.M(y, {
              crossOrigin: v,
              integrity: typeof g.integrity == 'string' ? g.integrity : void 0,
              nonce: typeof g.nonce == 'string' ? g.nonce : void 0,
            });
          }
        } else g == null && u.d.M(y);
    }),
    (gt.preload = function (y, g) {
      if (typeof y == 'string' && typeof g == 'object' && g !== null && typeof g.as == 'string') {
        var v = g.as,
          b = h(v, g.crossOrigin);
        u.d.L(y, v, {
          crossOrigin: b,
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
    (gt.preloadModule = function (y, g) {
      if (typeof y == 'string')
        if (g) {
          var v = h(g.as, g.crossOrigin);
          u.d.m(y, {
            as: typeof g.as == 'string' && g.as !== 'script' ? g.as : void 0,
            crossOrigin: v,
            integrity: typeof g.integrity == 'string' ? g.integrity : void 0,
          });
        } else u.d.m(y);
    }),
    (gt.requestFormReset = function (y) {
      u.d.r(y);
    }),
    (gt.unstable_batchedUpdates = function (y, g) {
      return y(g);
    }),
    (gt.useFormState = function (y, g, v) {
      return m.H.useFormState(y, g, v);
    }),
    (gt.useFormStatus = function () {
      return m.H.useHostTransitionStatus();
    }),
    (gt.version = '19.2.5'),
    gt
  );
}
var eh;
function kv() {
  if (eh) return Ko.exports;
  eh = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (i) {
        console.error(i);
      }
  }
  return (n(), (Ko.exports = Sv()), Ko.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var th;
function xv() {
  if (th) return Ti;
  th = 1;
  var n = vv(),
    i = xr(),
    c = kv();
  function u(e) {
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
  function f(e) {
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
  function h(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function y(e) {
    if (f(e) !== e) throw Error(u(188));
  }
  function g(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = f(e)), t === null)) throw Error(u(188));
      return t !== e ? null : e;
    }
    for (var l = e, a = t; ; ) {
      var s = l.return;
      if (s === null) break;
      var o = s.alternate;
      if (o === null) {
        if (((a = s.return), a !== null)) {
          l = a;
          continue;
        }
        break;
      }
      if (s.child === o.child) {
        for (o = s.child; o; ) {
          if (o === l) return (y(s), e);
          if (o === a) return (y(s), t);
          o = o.sibling;
        }
        throw Error(u(188));
      }
      if (l.return !== a.return) ((l = s), (a = o));
      else {
        for (var d = !1, _ = s.child; _; ) {
          if (_ === l) {
            ((d = !0), (l = s), (a = o));
            break;
          }
          if (_ === a) {
            ((d = !0), (a = s), (l = o));
            break;
          }
          _ = _.sibling;
        }
        if (!d) {
          for (_ = o.child; _; ) {
            if (_ === l) {
              ((d = !0), (l = o), (a = s));
              break;
            }
            if (_ === a) {
              ((d = !0), (a = o), (l = s));
              break;
            }
            _ = _.sibling;
          }
          if (!d) throw Error(u(189));
        }
      }
      if (l.alternate !== a) throw Error(u(190));
    }
    if (l.tag !== 3) throw Error(u(188));
    return l.stateNode.current === l ? e : t;
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
  var b = Object.assign,
    k = Symbol.for('react.element'),
    j = Symbol.for('react.transitional.element'),
    S = Symbol.for('react.portal'),
    R = Symbol.for('react.fragment'),
    A = Symbol.for('react.strict_mode'),
    w = Symbol.for('react.profiler'),
    T = Symbol.for('react.consumer'),
    V = Symbol.for('react.context'),
    P = Symbol.for('react.forward_ref'),
    ee = Symbol.for('react.suspense'),
    X = Symbol.for('react.suspense_list'),
    H = Symbol.for('react.memo'),
    q = Symbol.for('react.lazy'),
    Q = Symbol.for('react.activity'),
    te = Symbol.for('react.memo_cache_sentinel'),
    se = Symbol.iterator;
  function ce(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (se && e[se]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var Z = Symbol.for('react.client.reference');
  function J(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === Z ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case R:
        return 'Fragment';
      case w:
        return 'Profiler';
      case A:
        return 'StrictMode';
      case ee:
        return 'Suspense';
      case X:
        return 'SuspenseList';
      case Q:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case S:
          return 'Portal';
        case V:
          return e.displayName || 'Context';
        case T:
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
          return ((t = e.displayName || null), t !== null ? t : J(e.type) || 'Memo');
        case q:
          ((t = e._payload), (e = e._init));
          try {
            return J(e(t));
          } catch {}
      }
    return null;
  }
  var pe = Array.isArray,
    L = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    K = c.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    le = { pending: !1, data: null, method: null, action: null },
    ge = [],
    xe = -1;
  function C(e) {
    return { current: e };
  }
  function G(e) {
    0 > xe || ((e.current = ge[xe]), (ge[xe] = null), xe--);
  }
  function W(e, t) {
    (xe++, (ge[xe] = e.current), (e.current = t));
  }
  var ne = C(null),
    he = C(null),
    be = C(null),
    Ce = C(null);
  function st(e, t) {
    switch ((W(be, t), W(he, e), W(ne, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? _p(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) ((t = _p(t)), (e = gp(t, e)));
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
    (G(ne), W(ne, e));
  }
  function Xe() {
    (G(ne), G(he), G(be));
  }
  function I(e) {
    e.memoizedState !== null && W(Ce, e);
    var t = ne.current,
      l = gp(t, e.type);
    t !== l && (W(he, e), W(ne, l));
  }
  function oe(e) {
    (he.current === e && (G(ne), G(he)), Ce.current === e && (G(Ce), (vi._currentValue = le)));
  }
  var de, Me;
  function Te(e) {
    if (de === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        ((de = (t && t[1]) || ''),
          (Me =
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
      Me
    );
  }
  var bt = !1;
  function Eu(e, t) {
    if (!e || bt) return '';
    bt = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var Y = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(Y.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(Y, []);
                } catch (B) {
                  var z = B;
                }
                Reflect.construct(e, [], Y);
              } else {
                try {
                  Y.call();
                } catch (B) {
                  z = B;
                }
                e.call(Y.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (B) {
                z = B;
              }
              (Y = e()) && typeof Y.catch == 'function' && Y.catch(function () {});
            }
          } catch (B) {
            if (B && z && typeof B.stack == 'string') return [B.stack, z.stack];
          }
          return [null, null];
        },
      };
      a.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
      var s = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, 'name');
      s &&
        s.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, 'name', {
          value: 'DetermineComponentFrameRoot',
        });
      var o = a.DetermineComponentFrameRoot(),
        d = o[0],
        _ = o[1];
      if (d && _) {
        var x = d.split(`
`),
          D = _.split(`
`);
        for (s = a = 0; a < x.length && !x[a].includes('DetermineComponentFrameRoot'); ) a++;
        for (; s < D.length && !D[s].includes('DetermineComponentFrameRoot'); ) s++;
        if (a === x.length || s === D.length)
          for (a = x.length - 1, s = D.length - 1; 1 <= a && 0 <= s && x[a] !== D[s]; ) s--;
        for (; 1 <= a && 0 <= s; a--, s--)
          if (x[a] !== D[s]) {
            if (a !== 1 || s !== 1)
              do
                if ((a--, s--, 0 > s || x[a] !== D[s])) {
                  var U =
                    `
` + x[a].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      U.includes('<anonymous>') &&
                      (U = U.replace('<anonymous>', e.displayName)),
                    U
                  );
                }
              while (1 <= a && 0 <= s);
            break;
          }
      }
    } finally {
      ((bt = !1), (Error.prepareStackTrace = l));
    }
    return (l = e ? e.displayName || e.name : '') ? Te(l) : '';
  }
  function X_(e, t) {
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
        return Eu(e.type, !1);
      case 11:
        return Eu(e.type.render, !1);
      case 1:
        return Eu(e.type, !0);
      case 31:
        return Te('Activity');
      default:
        return '';
    }
  }
  function Vr(e) {
    try {
      var t = '',
        l = null;
      do ((t += X_(e, l)), (l = e), (e = e.return));
      while (e);
      return t;
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
  var Nu = Object.prototype.hasOwnProperty,
    wu = n.unstable_scheduleCallback,
    Cu = n.unstable_cancelCallback,
    V_ = n.unstable_shouldYield,
    Q_ = n.unstable_requestPaint,
    Ct = n.unstable_now,
    K_ = n.unstable_getCurrentPriorityLevel,
    Qr = n.unstable_ImmediatePriority,
    Kr = n.unstable_UserBlockingPriority,
    Bi = n.unstable_NormalPriority,
    Z_ = n.unstable_LowPriority,
    Zr = n.unstable_IdlePriority,
    J_ = n.log,
    W_ = n.unstable_setDisableYieldValue,
    Ma = null,
    At = null;
  function Hl(e) {
    if ((typeof J_ == 'function' && W_(e), At && typeof At.setStrictMode == 'function'))
      try {
        At.setStrictMode(Ma, e);
      } catch {}
  }
  var jt = Math.clz32 ? Math.clz32 : eg,
    F_ = Math.log,
    P_ = Math.LN2;
  function eg(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((F_(e) / P_) | 0)) | 0);
  }
  var Li = 256,
    qi = 262144,
    Ui = 4194304;
  function mn(e) {
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
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var s = 0,
      o = e.suspendedLanes,
      d = e.pingedLanes;
    e = e.warmLanes;
    var _ = a & 134217727;
    return (
      _ !== 0
        ? ((a = _ & ~o),
          a !== 0
            ? (s = mn(a))
            : ((d &= _), d !== 0 ? (s = mn(d)) : l || ((l = _ & ~e), l !== 0 && (s = mn(l)))))
        : ((_ = a & ~o),
          _ !== 0
            ? (s = mn(_))
            : d !== 0
              ? (s = mn(d))
              : l || ((l = a & ~e), l !== 0 && (s = mn(l)))),
      s === 0
        ? 0
        : t !== 0 &&
            t !== s &&
            (t & o) === 0 &&
            ((o = s & -s), (l = t & -t), o >= l || (o === 32 && (l & 4194048) !== 0))
          ? t
          : s
    );
  }
  function Ra(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function tg(e, t) {
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
  function Jr() {
    var e = Ui;
    return ((Ui <<= 1), (Ui & 62914560) === 0 && (Ui = 4194304), e);
  }
  function Au(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function Oa(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function lg(e, t, l, a, s, o) {
    var d = e.pendingLanes;
    ((e.pendingLanes = l),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= l),
      (e.entangledLanes &= l),
      (e.errorRecoveryDisabledLanes &= l),
      (e.shellSuspendCounter = 0));
    var _ = e.entanglements,
      x = e.expirationTimes,
      D = e.hiddenUpdates;
    for (l = d & ~l; 0 < l; ) {
      var U = 31 - jt(l),
        Y = 1 << U;
      ((_[U] = 0), (x[U] = -1));
      var z = D[U];
      if (z !== null)
        for (D[U] = null, U = 0; U < z.length; U++) {
          var B = z[U];
          B !== null && (B.lane &= -536870913);
        }
      l &= ~Y;
    }
    (a !== 0 && Wr(e, a, 0),
      o !== 0 && s === 0 && e.tag !== 0 && (e.suspendedLanes |= o & ~(d & ~t)));
  }
  function Wr(e, t, l) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var a = 31 - jt(t);
    ((e.entangledLanes |= t),
      (e.entanglements[a] = e.entanglements[a] | 1073741824 | (l & 261930)));
  }
  function Fr(e, t) {
    var l = (e.entangledLanes |= t);
    for (e = e.entanglements; l; ) {
      var a = 31 - jt(l),
        s = 1 << a;
      ((s & t) | (e[a] & t) && (e[a] |= t), (l &= ~s));
    }
  }
  function Pr(e, t) {
    var l = t & -t;
    return ((l = (l & 42) !== 0 ? 1 : ju(l)), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l);
  }
  function ju(e) {
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
  function Mu(e) {
    return ((e &= -e), 2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function ef() {
    var e = K.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Hp(e.type));
  }
  function tf(e, t) {
    var l = K.p;
    try {
      return ((K.p = e), t());
    } finally {
      K.p = l;
    }
  }
  var Gl = Math.random().toString(36).slice(2),
    dt = '__reactFiber$' + Gl,
    St = '__reactProps$' + Gl,
    Dn = '__reactContainer$' + Gl,
    Ru = '__reactEvents$' + Gl,
    ng = '__reactListeners$' + Gl,
    ag = '__reactHandles$' + Gl,
    lf = '__reactResources$' + Gl,
    Da = '__reactMarker$' + Gl;
  function Ou(e) {
    (delete e[dt], delete e[St], delete e[Ru], delete e[ng], delete e[ag]);
  }
  function zn(e) {
    var t = e[dt];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if ((t = l[Dn] || l[dt])) {
        if (((l = t.alternate), t.child !== null || (l !== null && l.child !== null)))
          for (e = Tp(e); e !== null; ) {
            if ((l = e[dt])) return l;
            e = Tp(e);
          }
        return t;
      }
      ((e = l), (l = e.parentNode));
    }
    return null;
  }
  function Bn(e) {
    if ((e = e[dt] || e[Dn])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function za(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(u(33));
  }
  function Ln(e) {
    var t = e[lf];
    return (t || (t = e[lf] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function ut(e) {
    e[Da] = !0;
  }
  var nf = new Set(),
    af = {};
  function pn(e, t) {
    (qn(e, t), qn(e + 'Capture', t));
  }
  function qn(e, t) {
    for (af[e] = t, e = 0; e < t.length; e++) nf.add(t[e]);
  }
  var ig = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    sf = {},
    uf = {};
  function sg(e) {
    return Nu.call(uf, e)
      ? !0
      : Nu.call(sf, e)
        ? !1
        : ig.test(e)
          ? (uf[e] = !0)
          : ((sf[e] = !0), !1);
  }
  function Gi(e, t, l) {
    if (sg(t))
      if (l === null) e.removeAttribute(t);
      else {
        switch (typeof l) {
          case 'undefined':
          case 'function':
          case 'symbol':
            e.removeAttribute(t);
            return;
          case 'boolean':
            var a = t.toLowerCase().slice(0, 5);
            if (a !== 'data-' && a !== 'aria-') {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, '' + l);
      }
  }
  function Ii(e, t, l) {
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
  function _l(e, t, l, a) {
    if (a === null) e.removeAttribute(l);
    else {
      switch (typeof a) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          e.removeAttribute(l);
          return;
      }
      e.setAttributeNS(t, l, '' + a);
    }
  }
  function Ht(e) {
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
  function cf(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function ug(e, t, l) {
    var a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (
      !e.hasOwnProperty(t) &&
      typeof a < 'u' &&
      typeof a.get == 'function' &&
      typeof a.set == 'function'
    ) {
      var s = a.get,
        o = a.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return s.call(this);
          },
          set: function (d) {
            ((l = '' + d), o.call(this, d));
          },
        }),
        Object.defineProperty(e, t, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return l;
          },
          setValue: function (d) {
            l = '' + d;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function Du(e) {
    if (!e._valueTracker) {
      var t = cf(e) ? 'checked' : 'value';
      e._valueTracker = ug(e, t, '' + e[t]);
    }
  }
  function of(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(),
      a = '';
    return (
      e && (a = cf(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = a),
      e !== l ? (t.setValue(e), !0) : !1
    );
  }
  function $i(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var cg = /[\n"\\]/g;
  function Gt(e) {
    return e.replace(cg, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function zu(e, t, l, a, s, o, d, _) {
    ((e.name = ''),
      d != null && typeof d != 'function' && typeof d != 'symbol' && typeof d != 'boolean'
        ? (e.type = d)
        : e.removeAttribute('type'),
      t != null
        ? d === 'number'
          ? ((t === 0 && e.value === '') || e.value != t) && (e.value = '' + Ht(t))
          : e.value !== '' + Ht(t) && (e.value = '' + Ht(t))
        : (d !== 'submit' && d !== 'reset') || e.removeAttribute('value'),
      t != null
        ? Bu(e, d, Ht(t))
        : l != null
          ? Bu(e, d, Ht(l))
          : a != null && e.removeAttribute('value'),
      s == null && o != null && (e.defaultChecked = !!o),
      s != null && (e.checked = s && typeof s != 'function' && typeof s != 'symbol'),
      _ != null && typeof _ != 'function' && typeof _ != 'symbol' && typeof _ != 'boolean'
        ? (e.name = '' + Ht(_))
        : e.removeAttribute('name'));
  }
  function rf(e, t, l, a, s, o, d, _) {
    if (
      (o != null &&
        typeof o != 'function' &&
        typeof o != 'symbol' &&
        typeof o != 'boolean' &&
        (e.type = o),
      t != null || l != null)
    ) {
      if (!((o !== 'submit' && o !== 'reset') || t != null)) {
        Du(e);
        return;
      }
      ((l = l != null ? '' + Ht(l) : ''),
        (t = t != null ? '' + Ht(t) : l),
        _ || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((a = a ?? s),
      (a = typeof a != 'function' && typeof a != 'symbol' && !!a),
      (e.checked = _ ? e.checked : !!a),
      (e.defaultChecked = !!a),
      d != null &&
        typeof d != 'function' &&
        typeof d != 'symbol' &&
        typeof d != 'boolean' &&
        (e.name = d),
      Du(e));
  }
  function Bu(e, t, l) {
    (t === 'number' && $i(e.ownerDocument) === e) ||
      e.defaultValue === '' + l ||
      (e.defaultValue = '' + l);
  }
  function Un(e, t, l, a) {
    if (((e = e.options), t)) {
      t = {};
      for (var s = 0; s < l.length; s++) t['$' + l[s]] = !0;
      for (l = 0; l < e.length; l++)
        ((s = t.hasOwnProperty('$' + e[l].value)),
          e[l].selected !== s && (e[l].selected = s),
          s && a && (e[l].defaultSelected = !0));
    } else {
      for (l = '' + Ht(l), t = null, s = 0; s < e.length; s++) {
        if (e[s].value === l) {
          ((e[s].selected = !0), a && (e[s].defaultSelected = !0));
          return;
        }
        t !== null || e[s].disabled || (t = e[s]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function ff(e, t, l) {
    if (t != null && ((t = '' + Ht(t)), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? '' + Ht(l) : '';
  }
  function df(e, t, l, a) {
    if (t == null) {
      if (a != null) {
        if (l != null) throw Error(u(92));
        if (pe(a)) {
          if (1 < a.length) throw Error(u(93));
          a = a[0];
        }
        l = a;
      }
      (l == null && (l = ''), (t = l));
    }
    ((l = Ht(t)),
      (e.defaultValue = l),
      (a = e.textContent),
      a === l && a !== '' && a !== null && (e.value = a),
      Du(e));
  }
  function Hn(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var og = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function mf(e, t, l) {
    var a = t.indexOf('--') === 0;
    l == null || typeof l == 'boolean' || l === ''
      ? a
        ? e.setProperty(t, '')
        : t === 'float'
          ? (e.cssFloat = '')
          : (e[t] = '')
      : a
        ? e.setProperty(t, l)
        : typeof l != 'number' || l === 0 || og.has(t)
          ? t === 'float'
            ? (e.cssFloat = l)
            : (e[t] = ('' + l).trim())
          : (e[t] = l + 'px');
  }
  function pf(e, t, l) {
    if (t != null && typeof t != 'object') throw Error(u(62));
    if (((e = e.style), l != null)) {
      for (var a in l)
        !l.hasOwnProperty(a) ||
          (t != null && t.hasOwnProperty(a)) ||
          (a.indexOf('--') === 0
            ? e.setProperty(a, '')
            : a === 'float'
              ? (e.cssFloat = '')
              : (e[a] = ''));
      for (var s in t) ((a = t[s]), t.hasOwnProperty(s) && l[s] !== a && mf(e, s, a));
    } else for (var o in t) t.hasOwnProperty(o) && mf(e, o, t[o]);
  }
  function Lu(e) {
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
  var rg = new Map([
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
    fg =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Yi(e) {
    return fg.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function gl() {}
  var qu = null;
  function Uu(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Gn = null,
    In = null;
  function hf(e) {
    var t = Bn(e);
    if (t && (e = t.stateNode)) {
      var l = e[St] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (zu(
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
              l = l.querySelectorAll('input[name="' + Gt('' + t) + '"][type="radio"]'), t = 0;
              t < l.length;
              t++
            ) {
              var a = l[t];
              if (a !== e && a.form === e.form) {
                var s = a[St] || null;
                if (!s) throw Error(u(90));
                zu(
                  a,
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
            for (t = 0; t < l.length; t++) ((a = l[t]), a.form === e.form && of(a));
          }
          break e;
        case 'textarea':
          ff(e, l.value, l.defaultValue);
          break e;
        case 'select':
          ((t = l.value), t != null && Un(e, !!l.multiple, t, !1));
      }
    }
  }
  var Hu = !1;
  function _f(e, t, l) {
    if (Hu) return e(t, l);
    Hu = !0;
    try {
      var a = e(t);
      return a;
    } finally {
      if (
        ((Hu = !1),
        (Gn !== null || In !== null) &&
          (Ms(), Gn && ((t = Gn), (e = In), (In = Gn = null), hf(t), e)))
      )
        for (t = 0; t < e.length; t++) hf(e[t]);
    }
  }
  function Ba(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var a = l[St] || null;
    if (a === null) return null;
    l = a[t];
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
        ((a = !a.disabled) ||
          ((e = e.type),
          (a = !(e === 'button' || e === 'input' || e === 'select' || e === 'textarea'))),
          (e = !a));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (l && typeof l != 'function') throw Error(u(231, t, typeof l));
    return l;
  }
  var yl = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Gu = !1;
  if (yl)
    try {
      var La = {};
      (Object.defineProperty(La, 'passive', {
        get: function () {
          Gu = !0;
        },
      }),
        window.addEventListener('test', La, La),
        window.removeEventListener('test', La, La));
    } catch {
      Gu = !1;
    }
  var Il = null,
    Iu = null,
    Xi = null;
  function gf() {
    if (Xi) return Xi;
    var e,
      t = Iu,
      l = t.length,
      a,
      s = 'value' in Il ? Il.value : Il.textContent,
      o = s.length;
    for (e = 0; e < l && t[e] === s[e]; e++);
    var d = l - e;
    for (a = 1; a <= d && t[l - a] === s[o - a]; a++);
    return (Xi = s.slice(e, 1 < a ? 1 - a : void 0));
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
  function yf() {
    return !1;
  }
  function kt(e) {
    function t(l, a, s, o, d) {
      ((this._reactName = l),
        (this._targetInst = s),
        (this.type = a),
        (this.nativeEvent = o),
        (this.target = d),
        (this.currentTarget = null));
      for (var _ in e) e.hasOwnProperty(_) && ((l = e[_]), (this[_] = l ? l(o) : o[_]));
      return (
        (this.isDefaultPrevented = (
          o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
        )
          ? Qi
          : yf),
        (this.isPropagationStopped = yf),
        this
      );
    }
    return (
      b(t.prototype, {
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
  var hn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Ki = kt(hn),
    qa = b({}, hn, { view: 0, detail: 0 }),
    dg = kt(qa),
    $u,
    Yu,
    Ua,
    Zi = b({}, qa, {
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
      getModifierState: Vu,
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
          : (e !== Ua &&
              (Ua && e.type === 'mousemove'
                ? (($u = e.screenX - Ua.screenX), (Yu = e.screenY - Ua.screenY))
                : (Yu = $u = 0),
              (Ua = e)),
            $u);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : Yu;
      },
    }),
    vf = kt(Zi),
    mg = b({}, Zi, { dataTransfer: 0 }),
    pg = kt(mg),
    hg = b({}, qa, { relatedTarget: 0 }),
    Xu = kt(hg),
    _g = b({}, hn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    gg = kt(_g),
    yg = b({}, hn, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    vg = kt(yg),
    bg = b({}, hn, { data: 0 }),
    bf = kt(bg),
    Sg = {
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
    kg = {
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
    xg = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function Tg(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = xg[e]) ? !!t[e] : !1;
  }
  function Vu() {
    return Tg;
  }
  var Eg = b({}, qa, {
      key: function (e) {
        if (e.key) {
          var t = Sg[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = Vi(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? kg[e.keyCode] || 'Unidentified'
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
      getModifierState: Vu,
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
    Ng = kt(Eg),
    wg = b({}, Zi, {
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
    Sf = kt(wg),
    Cg = b({}, qa, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Vu,
    }),
    Ag = kt(Cg),
    jg = b({}, hn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Mg = kt(jg),
    Rg = b({}, Zi, {
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
    Og = kt(Rg),
    Dg = b({}, hn, { newState: 0, oldState: 0 }),
    zg = kt(Dg),
    Bg = [9, 13, 27, 32],
    Qu = yl && 'CompositionEvent' in window,
    Ha = null;
  yl && 'documentMode' in document && (Ha = document.documentMode);
  var Lg = yl && 'TextEvent' in window && !Ha,
    kf = yl && (!Qu || (Ha && 8 < Ha && 11 >= Ha)),
    xf = ' ',
    Tf = !1;
  function Ef(e, t) {
    switch (e) {
      case 'keyup':
        return Bg.indexOf(t.keyCode) !== -1;
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
  function Nf(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var $n = !1;
  function qg(e, t) {
    switch (e) {
      case 'compositionend':
        return Nf(t);
      case 'keypress':
        return t.which !== 32 ? null : ((Tf = !0), xf);
      case 'textInput':
        return ((e = t.data), e === xf && Tf ? null : e);
      default:
        return null;
    }
  }
  function Ug(e, t) {
    if ($n)
      return e === 'compositionend' || (!Qu && Ef(e, t))
        ? ((e = gf()), (Xi = Iu = Il = null), ($n = !1), e)
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
        return kf && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var Hg = {
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
  function wf(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!Hg[e.type] : t === 'textarea';
  }
  function Cf(e, t, l, a) {
    (Gn ? (In ? In.push(a) : (In = [a])) : (Gn = a),
      (t = qs(t, 'onChange')),
      0 < t.length &&
        ((l = new Ki('onChange', 'change', null, l, a)), e.push({ event: l, listeners: t })));
  }
  var Ga = null,
    Ia = null;
  function Gg(e) {
    rp(e, 0);
  }
  function Ji(e) {
    var t = za(e);
    if (of(t)) return e;
  }
  function Af(e, t) {
    if (e === 'change') return t;
  }
  var jf = !1;
  if (yl) {
    var Ku;
    if (yl) {
      var Zu = 'oninput' in document;
      if (!Zu) {
        var Mf = document.createElement('div');
        (Mf.setAttribute('oninput', 'return;'), (Zu = typeof Mf.oninput == 'function'));
      }
      Ku = Zu;
    } else Ku = !1;
    jf = Ku && (!document.documentMode || 9 < document.documentMode);
  }
  function Rf() {
    Ga && (Ga.detachEvent('onpropertychange', Of), (Ia = Ga = null));
  }
  function Of(e) {
    if (e.propertyName === 'value' && Ji(Ia)) {
      var t = [];
      (Cf(t, Ia, e, Uu(e)), _f(Gg, t));
    }
  }
  function Ig(e, t, l) {
    e === 'focusin'
      ? (Rf(), (Ga = t), (Ia = l), Ga.attachEvent('onpropertychange', Of))
      : e === 'focusout' && Rf();
  }
  function $g(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return Ji(Ia);
  }
  function Yg(e, t) {
    if (e === 'click') return Ji(t);
  }
  function Xg(e, t) {
    if (e === 'input' || e === 'change') return Ji(t);
  }
  function Vg(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Mt = typeof Object.is == 'function' ? Object.is : Vg;
  function $a(e, t) {
    if (Mt(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var l = Object.keys(e),
      a = Object.keys(t);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var s = l[a];
      if (!Nu.call(t, s) || !Mt(e[s], t[s])) return !1;
    }
    return !0;
  }
  function Df(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function zf(e, t) {
    var l = Df(e);
    e = 0;
    for (var a; l; ) {
      if (l.nodeType === 3) {
        if (((a = e + l.textContent.length), e <= t && a >= t)) return { node: l, offset: t - e };
        e = a;
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
      l = Df(l);
    }
  }
  function Bf(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Bf(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Lf(e) {
    e =
      e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = $i(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == 'string';
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = $i(e.document);
    }
    return t;
  }
  function Ju(e) {
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
  var Qg = yl && 'documentMode' in document && 11 >= document.documentMode,
    Yn = null,
    Wu = null,
    Ya = null,
    Fu = !1;
  function qf(e, t, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Fu ||
      Yn == null ||
      Yn !== $i(a) ||
      ((a = Yn),
      'selectionStart' in a && Ju(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = ((a.ownerDocument && a.ownerDocument.defaultView) || window).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (Ya && $a(Ya, a)) ||
        ((Ya = a),
        (a = qs(Wu, 'onSelect')),
        0 < a.length &&
          ((t = new Ki('onSelect', 'select', null, t, l)),
          e.push({ event: t, listeners: a }),
          (t.target = Yn))));
  }
  function _n(e, t) {
    var l = {};
    return (
      (l[e.toLowerCase()] = t.toLowerCase()),
      (l['Webkit' + e] = 'webkit' + t),
      (l['Moz' + e] = 'moz' + t),
      l
    );
  }
  var Xn = {
      animationend: _n('Animation', 'AnimationEnd'),
      animationiteration: _n('Animation', 'AnimationIteration'),
      animationstart: _n('Animation', 'AnimationStart'),
      transitionrun: _n('Transition', 'TransitionRun'),
      transitionstart: _n('Transition', 'TransitionStart'),
      transitioncancel: _n('Transition', 'TransitionCancel'),
      transitionend: _n('Transition', 'TransitionEnd'),
    },
    Pu = {},
    Uf = {};
  yl &&
    ((Uf = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Xn.animationend.animation,
      delete Xn.animationiteration.animation,
      delete Xn.animationstart.animation),
    'TransitionEvent' in window || delete Xn.transitionend.transition);
  function gn(e) {
    if (Pu[e]) return Pu[e];
    if (!Xn[e]) return e;
    var t = Xn[e],
      l;
    for (l in t) if (t.hasOwnProperty(l) && l in Uf) return (Pu[e] = t[l]);
    return e;
  }
  var Hf = gn('animationend'),
    Gf = gn('animationiteration'),
    If = gn('animationstart'),
    Kg = gn('transitionrun'),
    Zg = gn('transitionstart'),
    Jg = gn('transitioncancel'),
    $f = gn('transitionend'),
    Yf = new Map(),
    ec =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  ec.push('scrollEnd');
  function el(e, t) {
    (Yf.set(e, t), pn(t, [e]));
  }
  var Wi =
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
    It = [],
    Vn = 0,
    tc = 0;
  function Fi() {
    for (var e = Vn, t = (tc = Vn = 0); t < e; ) {
      var l = It[t];
      It[t++] = null;
      var a = It[t];
      It[t++] = null;
      var s = It[t];
      It[t++] = null;
      var o = It[t];
      if (((It[t++] = null), a !== null && s !== null)) {
        var d = a.pending;
        (d === null ? (s.next = s) : ((s.next = d.next), (d.next = s)), (a.pending = s));
      }
      o !== 0 && Xf(l, s, o);
    }
  }
  function Pi(e, t, l, a) {
    ((It[Vn++] = e),
      (It[Vn++] = t),
      (It[Vn++] = l),
      (It[Vn++] = a),
      (tc |= a),
      (e.lanes |= a),
      (e = e.alternate),
      e !== null && (e.lanes |= a));
  }
  function lc(e, t, l, a) {
    return (Pi(e, t, l, a), es(e));
  }
  function yn(e, t) {
    return (Pi(e, null, null, t), es(e));
  }
  function Xf(e, t, l) {
    e.lanes |= l;
    var a = e.alternate;
    a !== null && (a.lanes |= l);
    for (var s = !1, o = e.return; o !== null; )
      ((o.childLanes |= l),
        (a = o.alternate),
        a !== null && (a.childLanes |= l),
        o.tag === 22 && ((e = o.stateNode), e === null || e._visibility & 1 || (s = !0)),
        (e = o),
        (o = o.return));
    return e.tag === 3
      ? ((o = e.stateNode),
        s &&
          t !== null &&
          ((s = 31 - jt(l)),
          (e = o.hiddenUpdates),
          (a = e[s]),
          a === null ? (e[s] = [t]) : a.push(t),
          (t.lane = l | 536870912)),
        o)
      : null;
  }
  function es(e) {
    if (50 < di) throw ((di = 0), (fo = null), Error(u(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var Qn = {};
  function Wg(e, t, l, a) {
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
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function Rt(e, t, l, a) {
    return new Wg(e, t, l, a);
  }
  function nc(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function vl(e, t) {
    var l = e.alternate;
    return (
      l === null
        ? ((l = Rt(e.tag, t, e.key, e.mode)),
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
  function Vf(e, t) {
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
  function ts(e, t, l, a, s, o) {
    var d = 0;
    if (((a = e), typeof e == 'function')) nc(e) && (d = 1);
    else if (typeof e == 'string')
      d = lv(e, l, ne.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case Q:
          return ((e = Rt(31, l, t, s)), (e.elementType = Q), (e.lanes = o), e);
        case R:
          return vn(l.children, s, o, t);
        case A:
          ((d = 8), (s |= 24));
          break;
        case w:
          return ((e = Rt(12, l, t, s | 2)), (e.elementType = w), (e.lanes = o), e);
        case ee:
          return ((e = Rt(13, l, t, s)), (e.elementType = ee), (e.lanes = o), e);
        case X:
          return ((e = Rt(19, l, t, s)), (e.elementType = X), (e.lanes = o), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case V:
                d = 10;
                break e;
              case T:
                d = 9;
                break e;
              case P:
                d = 11;
                break e;
              case H:
                d = 14;
                break e;
              case q:
                ((d = 16), (a = null));
                break e;
            }
          ((d = 29), (l = Error(u(130, e === null ? 'null' : typeof e, ''))), (a = null));
      }
    return ((t = Rt(d, l, t, s)), (t.elementType = e), (t.type = a), (t.lanes = o), t);
  }
  function vn(e, t, l, a) {
    return ((e = Rt(7, e, a, t)), (e.lanes = l), e);
  }
  function ac(e, t, l) {
    return ((e = Rt(6, e, null, t)), (e.lanes = l), e);
  }
  function Qf(e) {
    var t = Rt(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function ic(e, t, l) {
    return (
      (t = Rt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = l),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var Kf = new WeakMap();
  function $t(e, t) {
    if (typeof e == 'object' && e !== null) {
      var l = Kf.get(e);
      return l !== void 0 ? l : ((t = { value: e, source: t, stack: Vr(t) }), Kf.set(e, t), t);
    }
    return { value: e, source: t, stack: Vr(t) };
  }
  var Kn = [],
    Zn = 0,
    ls = null,
    Xa = 0,
    Yt = [],
    Xt = 0,
    $l = null,
    rl = 1,
    fl = '';
  function bl(e, t) {
    ((Kn[Zn++] = Xa), (Kn[Zn++] = ls), (ls = e), (Xa = t));
  }
  function Zf(e, t, l) {
    ((Yt[Xt++] = rl), (Yt[Xt++] = fl), (Yt[Xt++] = $l), ($l = e));
    var a = rl;
    e = fl;
    var s = 32 - jt(a) - 1;
    ((a &= ~(1 << s)), (l += 1));
    var o = 32 - jt(t) + s;
    if (30 < o) {
      var d = s - (s % 5);
      ((o = (a & ((1 << d) - 1)).toString(32)),
        (a >>= d),
        (s -= d),
        (rl = (1 << (32 - jt(t) + s)) | (l << s) | a),
        (fl = o + e));
    } else ((rl = (1 << o) | (l << s) | a), (fl = e));
  }
  function sc(e) {
    e.return !== null && (bl(e, 1), Zf(e, 1, 0));
  }
  function uc(e) {
    for (; e === ls; ) ((ls = Kn[--Zn]), (Kn[Zn] = null), (Xa = Kn[--Zn]), (Kn[Zn] = null));
    for (; e === $l; )
      (($l = Yt[--Xt]),
        (Yt[Xt] = null),
        (fl = Yt[--Xt]),
        (Yt[Xt] = null),
        (rl = Yt[--Xt]),
        (Yt[Xt] = null));
  }
  function Jf(e, t) {
    ((Yt[Xt++] = rl), (Yt[Xt++] = fl), (Yt[Xt++] = $l), (rl = t.id), (fl = t.overflow), ($l = e));
  }
  var mt = null,
    $e = null,
    we = !1,
    Yl = null,
    Vt = !1,
    cc = Error(u(519));
  function Xl(e) {
    var t = Error(
      u(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (Va($t(t, e)), cc);
  }
  function Wf(e) {
    var t = e.stateNode,
      l = e.type,
      a = e.memoizedProps;
    switch (((t[dt] = e), (t[St] = a), l)) {
      case 'dialog':
        (ke('cancel', t), ke('close', t));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        ke('load', t);
        break;
      case 'video':
      case 'audio':
        for (l = 0; l < pi.length; l++) ke(pi[l], t);
        break;
      case 'source':
        ke('error', t);
        break;
      case 'img':
      case 'image':
      case 'link':
        (ke('error', t), ke('load', t));
        break;
      case 'details':
        ke('toggle', t);
        break;
      case 'input':
        (ke('invalid', t),
          rf(t, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, !0));
        break;
      case 'select':
        ke('invalid', t);
        break;
      case 'textarea':
        (ke('invalid', t), df(t, a.value, a.defaultValue, a.children));
    }
    ((l = a.children),
      (typeof l != 'string' && typeof l != 'number' && typeof l != 'bigint') ||
      t.textContent === '' + l ||
      a.suppressHydrationWarning === !0 ||
      pp(t.textContent, l)
        ? (a.popover != null && (ke('beforetoggle', t), ke('toggle', t)),
          a.onScroll != null && ke('scroll', t),
          a.onScrollEnd != null && ke('scrollend', t),
          a.onClick != null && (t.onclick = gl),
          (t = !0))
        : (t = !1),
      t || Xl(e, !0));
  }
  function Ff(e) {
    for (mt = e.return; mt; )
      switch (mt.tag) {
        case 5:
        case 31:
        case 13:
          Vt = !1;
          return;
        case 27:
        case 3:
          Vt = !0;
          return;
        default:
          mt = mt.return;
      }
  }
  function Jn(e) {
    if (e !== mt) return !1;
    if (!we) return (Ff(e), (we = !0), !1);
    var t = e.tag,
      l;
    if (
      ((l = t !== 3 && t !== 27) &&
        ((l = t === 5) &&
          ((l = e.type), (l = !(l !== 'form' && l !== 'button') || wo(e.type, e.memoizedProps))),
        (l = !l)),
      l && $e && Xl(e),
      Ff(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(u(317));
      $e = xp(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(u(317));
      $e = xp(e);
    } else
      t === 27
        ? ((t = $e), sn(e.type) ? ((e = Ro), (Ro = null), ($e = e)) : ($e = t))
        : ($e = mt ? Kt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function bn() {
    (($e = mt = null), (we = !1));
  }
  function oc() {
    var e = Yl;
    return (e !== null && (Nt === null ? (Nt = e) : Nt.push.apply(Nt, e), (Yl = null)), e);
  }
  function Va(e) {
    Yl === null ? (Yl = [e]) : Yl.push(e);
  }
  var rc = C(null),
    Sn = null,
    Sl = null;
  function Vl(e, t, l) {
    (W(rc, t._currentValue), (t._currentValue = l));
  }
  function kl(e) {
    ((e._currentValue = rc.current), G(rc));
  }
  function fc(e, t, l) {
    for (; e !== null; ) {
      var a = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), a !== null && (a.childLanes |= t))
          : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
        e === l)
      )
        break;
      e = e.return;
    }
  }
  function dc(e, t, l, a) {
    var s = e.child;
    for (s !== null && (s.return = e); s !== null; ) {
      var o = s.dependencies;
      if (o !== null) {
        var d = s.child;
        o = o.firstContext;
        e: for (; o !== null; ) {
          var _ = o;
          o = s;
          for (var x = 0; x < t.length; x++)
            if (_.context === t[x]) {
              ((o.lanes |= l),
                (_ = o.alternate),
                _ !== null && (_.lanes |= l),
                fc(o.return, l, e),
                a || (d = null));
              break e;
            }
          o = _.next;
        }
      } else if (s.tag === 18) {
        if (((d = s.return), d === null)) throw Error(u(341));
        ((d.lanes |= l), (o = d.alternate), o !== null && (o.lanes |= l), fc(d, l, e), (d = null));
      } else d = s.child;
      if (d !== null) d.return = s;
      else
        for (d = s; d !== null; ) {
          if (d === e) {
            d = null;
            break;
          }
          if (((s = d.sibling), s !== null)) {
            ((s.return = d.return), (d = s));
            break;
          }
          d = d.return;
        }
      s = d;
    }
  }
  function Wn(e, t, l, a) {
    e = null;
    for (var s = t, o = !1; s !== null; ) {
      if (!o) {
        if ((s.flags & 524288) !== 0) o = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var d = s.alternate;
        if (d === null) throw Error(u(387));
        if (((d = d.memoizedProps), d !== null)) {
          var _ = s.type;
          Mt(s.pendingProps.value, d.value) || (e !== null ? e.push(_) : (e = [_]));
        }
      } else if (s === Ce.current) {
        if (((d = s.alternate), d === null)) throw Error(u(387));
        d.memoizedState.memoizedState !== s.memoizedState.memoizedState &&
          (e !== null ? e.push(vi) : (e = [vi]));
      }
      s = s.return;
    }
    (e !== null && dc(t, e, l, a), (t.flags |= 262144));
  }
  function ns(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Mt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function kn(e) {
    ((Sn = e), (Sl = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function pt(e) {
    return Pf(Sn, e);
  }
  function as(e, t) {
    return (Sn === null && kn(e), Pf(e, t));
  }
  function Pf(e, t) {
    var l = t._currentValue;
    if (((t = { context: t, memoizedValue: l, next: null }), Sl === null)) {
      if (e === null) throw Error(u(308));
      ((Sl = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else Sl = Sl.next = t;
    return l;
  }
  var Fg =
      typeof AbortController < 'u'
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (l, a) {
                  e.push(a);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                e.forEach(function (l) {
                  return l();
                }));
            };
          },
    Pg = n.unstable_scheduleCallback,
    ey = n.unstable_NormalPriority,
    tt = {
      $$typeof: V,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function mc() {
    return { controller: new Fg(), data: new Map(), refCount: 0 };
  }
  function Qa(e) {
    (e.refCount--,
      e.refCount === 0 &&
        Pg(ey, function () {
          e.controller.abort();
        }));
  }
  var Ka = null,
    pc = 0,
    Fn = 0,
    Pn = null;
  function ty(e, t) {
    if (Ka === null) {
      var l = (Ka = []);
      ((pc = 0),
        (Fn = yo()),
        (Pn = {
          status: 'pending',
          value: void 0,
          then: function (a) {
            l.push(a);
          },
        }));
    }
    return (pc++, t.then(ed, ed), t);
  }
  function ed() {
    if (--pc === 0 && Ka !== null) {
      Pn !== null && (Pn.status = 'fulfilled');
      var e = Ka;
      ((Ka = null), (Fn = 0), (Pn = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function ly(e, t) {
    var l = [],
      a = {
        status: 'pending',
        value: null,
        reason: null,
        then: function (s) {
          l.push(s);
        },
      };
    return (
      e.then(
        function () {
          ((a.status = 'fulfilled'), (a.value = t));
          for (var s = 0; s < l.length; s++) (0, l[s])(t);
        },
        function (s) {
          for (a.status = 'rejected', a.reason = s, s = 0; s < l.length; s++) (0, l[s])(void 0);
        }
      ),
      a
    );
  }
  var td = L.S;
  L.S = function (e, t) {
    ((qm = Ct()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && ty(e, t),
      td !== null && td(e, t));
  };
  var xn = C(null);
  function hc() {
    var e = xn.current;
    return e !== null ? e : Ie.pooledCache;
  }
  function is(e, t) {
    t === null ? W(xn, xn.current) : W(xn, t.pool);
  }
  function ld() {
    var e = hc();
    return e === null ? null : { parent: tt._currentValue, pool: e };
  }
  var ea = Error(u(460)),
    _c = Error(u(474)),
    ss = Error(u(542)),
    us = { then: function () {} };
  function nd(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function ad(e, t, l) {
    switch (
      ((l = e[l]), l === void 0 ? e.push(t) : l !== t && (t.then(gl, gl), (t = l)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), sd(e), e);
      default:
        if (typeof t.status == 'string') t.then(gl, gl);
        else {
          if (((e = Ie), e !== null && 100 < e.shellSuspendCounter)) throw Error(u(482));
          ((e = t),
            (e.status = 'pending'),
            e.then(
              function (a) {
                if (t.status === 'pending') {
                  var s = t;
                  ((s.status = 'fulfilled'), (s.value = a));
                }
              },
              function (a) {
                if (t.status === 'pending') {
                  var s = t;
                  ((s.status = 'rejected'), (s.reason = a));
                }
              }
            ));
        }
        switch (t.status) {
          case 'fulfilled':
            return t.value;
          case 'rejected':
            throw ((e = t.reason), sd(e), e);
        }
        throw ((En = t), ea);
    }
  }
  function Tn(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == 'object' && typeof l.then == 'function' ? ((En = l), ea) : l;
    }
  }
  var En = null;
  function id() {
    if (En === null) throw Error(u(459));
    var e = En;
    return ((En = null), e);
  }
  function sd(e) {
    if (e === ea || e === ss) throw Error(u(483));
  }
  var ta = null,
    Za = 0;
  function cs(e) {
    var t = Za;
    return ((Za += 1), ta === null && (ta = []), ad(ta, e, t));
  }
  function Ja(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function os(e, t) {
    throw t.$$typeof === k
      ? Error(u(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          u(
            31,
            e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e
          )
        ));
  }
  function ud(e) {
    function t(M, N) {
      if (e) {
        var O = M.deletions;
        O === null ? ((M.deletions = [N]), (M.flags |= 16)) : O.push(N);
      }
    }
    function l(M, N) {
      if (!e) return null;
      for (; N !== null; ) (t(M, N), (N = N.sibling));
      return null;
    }
    function a(M) {
      for (var N = new Map(); M !== null; )
        (M.key !== null ? N.set(M.key, M) : N.set(M.index, M), (M = M.sibling));
      return N;
    }
    function s(M, N) {
      return ((M = vl(M, N)), (M.index = 0), (M.sibling = null), M);
    }
    function o(M, N, O) {
      return (
        (M.index = O),
        e
          ? ((O = M.alternate),
            O !== null
              ? ((O = O.index), O < N ? ((M.flags |= 67108866), N) : O)
              : ((M.flags |= 67108866), N))
          : ((M.flags |= 1048576), N)
      );
    }
    function d(M) {
      return (e && M.alternate === null && (M.flags |= 67108866), M);
    }
    function _(M, N, O, $) {
      return N === null || N.tag !== 6
        ? ((N = ac(O, M.mode, $)), (N.return = M), N)
        : ((N = s(N, O)), (N.return = M), N);
    }
    function x(M, N, O, $) {
      var ue = O.type;
      return ue === R
        ? U(M, N, O.props.children, $, O.key)
        : N !== null &&
            (N.elementType === ue ||
              (typeof ue == 'object' && ue !== null && ue.$$typeof === q && Tn(ue) === N.type))
          ? ((N = s(N, O.props)), Ja(N, O), (N.return = M), N)
          : ((N = ts(O.type, O.key, O.props, null, M.mode, $)), Ja(N, O), (N.return = M), N);
    }
    function D(M, N, O, $) {
      return N === null ||
        N.tag !== 4 ||
        N.stateNode.containerInfo !== O.containerInfo ||
        N.stateNode.implementation !== O.implementation
        ? ((N = ic(O, M.mode, $)), (N.return = M), N)
        : ((N = s(N, O.children || [])), (N.return = M), N);
    }
    function U(M, N, O, $, ue) {
      return N === null || N.tag !== 7
        ? ((N = vn(O, M.mode, $, ue)), (N.return = M), N)
        : ((N = s(N, O)), (N.return = M), N);
    }
    function Y(M, N, O) {
      if ((typeof N == 'string' && N !== '') || typeof N == 'number' || typeof N == 'bigint')
        return ((N = ac('' + N, M.mode, O)), (N.return = M), N);
      if (typeof N == 'object' && N !== null) {
        switch (N.$$typeof) {
          case j:
            return ((O = ts(N.type, N.key, N.props, null, M.mode, O)), Ja(O, N), (O.return = M), O);
          case S:
            return ((N = ic(N, M.mode, O)), (N.return = M), N);
          case q:
            return ((N = Tn(N)), Y(M, N, O));
        }
        if (pe(N) || ce(N)) return ((N = vn(N, M.mode, O, null)), (N.return = M), N);
        if (typeof N.then == 'function') return Y(M, cs(N), O);
        if (N.$$typeof === V) return Y(M, as(M, N), O);
        os(M, N);
      }
      return null;
    }
    function z(M, N, O, $) {
      var ue = N !== null ? N.key : null;
      if ((typeof O == 'string' && O !== '') || typeof O == 'number' || typeof O == 'bigint')
        return ue !== null ? null : _(M, N, '' + O, $);
      if (typeof O == 'object' && O !== null) {
        switch (O.$$typeof) {
          case j:
            return O.key === ue ? x(M, N, O, $) : null;
          case S:
            return O.key === ue ? D(M, N, O, $) : null;
          case q:
            return ((O = Tn(O)), z(M, N, O, $));
        }
        if (pe(O) || ce(O)) return ue !== null ? null : U(M, N, O, $, null);
        if (typeof O.then == 'function') return z(M, N, cs(O), $);
        if (O.$$typeof === V) return z(M, N, as(M, O), $);
        os(M, O);
      }
      return null;
    }
    function B(M, N, O, $, ue) {
      if ((typeof $ == 'string' && $ !== '') || typeof $ == 'number' || typeof $ == 'bigint')
        return ((M = M.get(O) || null), _(N, M, '' + $, ue));
      if (typeof $ == 'object' && $ !== null) {
        switch ($.$$typeof) {
          case j:
            return ((M = M.get($.key === null ? O : $.key) || null), x(N, M, $, ue));
          case S:
            return ((M = M.get($.key === null ? O : $.key) || null), D(N, M, $, ue));
          case q:
            return (($ = Tn($)), B(M, N, O, $, ue));
        }
        if (pe($) || ce($)) return ((M = M.get(O) || null), U(N, M, $, ue, null));
        if (typeof $.then == 'function') return B(M, N, O, cs($), ue);
        if ($.$$typeof === V) return B(M, N, O, as(N, $), ue);
        os(N, $);
      }
      return null;
    }
    function ae(M, N, O, $) {
      for (
        var ue = null, Ae = null, ie = N, ve = (N = 0), Ne = null;
        ie !== null && ve < O.length;
        ve++
      ) {
        ie.index > ve ? ((Ne = ie), (ie = null)) : (Ne = ie.sibling);
        var je = z(M, ie, O[ve], $);
        if (je === null) {
          ie === null && (ie = Ne);
          break;
        }
        (e && ie && je.alternate === null && t(M, ie),
          (N = o(je, N, ve)),
          Ae === null ? (ue = je) : (Ae.sibling = je),
          (Ae = je),
          (ie = Ne));
      }
      if (ve === O.length) return (l(M, ie), we && bl(M, ve), ue);
      if (ie === null) {
        for (; ve < O.length; ve++)
          ((ie = Y(M, O[ve], $)),
            ie !== null &&
              ((N = o(ie, N, ve)), Ae === null ? (ue = ie) : (Ae.sibling = ie), (Ae = ie)));
        return (we && bl(M, ve), ue);
      }
      for (ie = a(ie); ve < O.length; ve++)
        ((Ne = B(ie, M, ve, O[ve], $)),
          Ne !== null &&
            (e && Ne.alternate !== null && ie.delete(Ne.key === null ? ve : Ne.key),
            (N = o(Ne, N, ve)),
            Ae === null ? (ue = Ne) : (Ae.sibling = Ne),
            (Ae = Ne)));
      return (
        e &&
          ie.forEach(function (fn) {
            return t(M, fn);
          }),
        we && bl(M, ve),
        ue
      );
    }
    function re(M, N, O, $) {
      if (O == null) throw Error(u(151));
      for (
        var ue = null, Ae = null, ie = N, ve = (N = 0), Ne = null, je = O.next();
        ie !== null && !je.done;
        ve++, je = O.next()
      ) {
        ie.index > ve ? ((Ne = ie), (ie = null)) : (Ne = ie.sibling);
        var fn = z(M, ie, je.value, $);
        if (fn === null) {
          ie === null && (ie = Ne);
          break;
        }
        (e && ie && fn.alternate === null && t(M, ie),
          (N = o(fn, N, ve)),
          Ae === null ? (ue = fn) : (Ae.sibling = fn),
          (Ae = fn),
          (ie = Ne));
      }
      if (je.done) return (l(M, ie), we && bl(M, ve), ue);
      if (ie === null) {
        for (; !je.done; ve++, je = O.next())
          ((je = Y(M, je.value, $)),
            je !== null &&
              ((N = o(je, N, ve)), Ae === null ? (ue = je) : (Ae.sibling = je), (Ae = je)));
        return (we && bl(M, ve), ue);
      }
      for (ie = a(ie); !je.done; ve++, je = O.next())
        ((je = B(ie, M, ve, je.value, $)),
          je !== null &&
            (e && je.alternate !== null && ie.delete(je.key === null ? ve : je.key),
            (N = o(je, N, ve)),
            Ae === null ? (ue = je) : (Ae.sibling = je),
            (Ae = je)));
      return (
        e &&
          ie.forEach(function (mv) {
            return t(M, mv);
          }),
        we && bl(M, ve),
        ue
      );
    }
    function He(M, N, O, $) {
      if (
        (typeof O == 'object' &&
          O !== null &&
          O.type === R &&
          O.key === null &&
          (O = O.props.children),
        typeof O == 'object' && O !== null)
      ) {
        switch (O.$$typeof) {
          case j:
            e: {
              for (var ue = O.key; N !== null; ) {
                if (N.key === ue) {
                  if (((ue = O.type), ue === R)) {
                    if (N.tag === 7) {
                      (l(M, N.sibling), ($ = s(N, O.props.children)), ($.return = M), (M = $));
                      break e;
                    }
                  } else if (
                    N.elementType === ue ||
                    (typeof ue == 'object' && ue !== null && ue.$$typeof === q && Tn(ue) === N.type)
                  ) {
                    (l(M, N.sibling), ($ = s(N, O.props)), Ja($, O), ($.return = M), (M = $));
                    break e;
                  }
                  l(M, N);
                  break;
                } else t(M, N);
                N = N.sibling;
              }
              O.type === R
                ? (($ = vn(O.props.children, M.mode, $, O.key)), ($.return = M), (M = $))
                : (($ = ts(O.type, O.key, O.props, null, M.mode, $)),
                  Ja($, O),
                  ($.return = M),
                  (M = $));
            }
            return d(M);
          case S:
            e: {
              for (ue = O.key; N !== null; ) {
                if (N.key === ue)
                  if (
                    N.tag === 4 &&
                    N.stateNode.containerInfo === O.containerInfo &&
                    N.stateNode.implementation === O.implementation
                  ) {
                    (l(M, N.sibling), ($ = s(N, O.children || [])), ($.return = M), (M = $));
                    break e;
                  } else {
                    l(M, N);
                    break;
                  }
                else t(M, N);
                N = N.sibling;
              }
              (($ = ic(O, M.mode, $)), ($.return = M), (M = $));
            }
            return d(M);
          case q:
            return ((O = Tn(O)), He(M, N, O, $));
        }
        if (pe(O)) return ae(M, N, O, $);
        if (ce(O)) {
          if (((ue = ce(O)), typeof ue != 'function')) throw Error(u(150));
          return ((O = ue.call(O)), re(M, N, O, $));
        }
        if (typeof O.then == 'function') return He(M, N, cs(O), $);
        if (O.$$typeof === V) return He(M, N, as(M, O), $);
        os(M, O);
      }
      return (typeof O == 'string' && O !== '') || typeof O == 'number' || typeof O == 'bigint'
        ? ((O = '' + O),
          N !== null && N.tag === 6
            ? (l(M, N.sibling), ($ = s(N, O)), ($.return = M), (M = $))
            : (l(M, N), ($ = ac(O, M.mode, $)), ($.return = M), (M = $)),
          d(M))
        : l(M, N);
    }
    return function (M, N, O, $) {
      try {
        Za = 0;
        var ue = He(M, N, O, $);
        return ((ta = null), ue);
      } catch (ie) {
        if (ie === ea || ie === ss) throw ie;
        var Ae = Rt(29, ie, null, M.mode);
        return ((Ae.lanes = $), (Ae.return = M), Ae);
      } finally {
      }
    };
  }
  var Nn = ud(!0),
    cd = ud(!1),
    Ql = !1;
  function gc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function yc(e, t) {
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
  function Kl(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Zl(e, t, l) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (Re & 2) !== 0)) {
      var s = a.pending;
      return (
        s === null ? (t.next = t) : ((t.next = s.next), (s.next = t)),
        (a.pending = t),
        (t = es(e)),
        Xf(e, null, l),
        t
      );
    }
    return (Pi(e, a, t, l), es(e));
  }
  function Wa(e, t, l) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (l & 4194048) !== 0))) {
      var a = t.lanes;
      ((a &= e.pendingLanes), (l |= a), (t.lanes = l), Fr(e, l));
    }
  }
  function vc(e, t) {
    var l = e.updateQueue,
      a = e.alternate;
    if (a !== null && ((a = a.updateQueue), l === a)) {
      var s = null,
        o = null;
      if (((l = l.firstBaseUpdate), l !== null)) {
        do {
          var d = { lane: l.lane, tag: l.tag, payload: l.payload, callback: null, next: null };
          (o === null ? (s = o = d) : (o = o.next = d), (l = l.next));
        } while (l !== null);
        o === null ? (s = o = t) : (o = o.next = t);
      } else s = o = t;
      ((l = {
        baseState: a.baseState,
        firstBaseUpdate: s,
        lastBaseUpdate: o,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (e.updateQueue = l));
      return;
    }
    ((e = l.lastBaseUpdate),
      e === null ? (l.firstBaseUpdate = t) : (e.next = t),
      (l.lastBaseUpdate = t));
  }
  var bc = !1;
  function Fa() {
    if (bc) {
      var e = Pn;
      if (e !== null) throw e;
    }
  }
  function Pa(e, t, l, a) {
    bc = !1;
    var s = e.updateQueue;
    Ql = !1;
    var o = s.firstBaseUpdate,
      d = s.lastBaseUpdate,
      _ = s.shared.pending;
    if (_ !== null) {
      s.shared.pending = null;
      var x = _,
        D = x.next;
      ((x.next = null), d === null ? (o = D) : (d.next = D), (d = x));
      var U = e.alternate;
      U !== null &&
        ((U = U.updateQueue),
        (_ = U.lastBaseUpdate),
        _ !== d && (_ === null ? (U.firstBaseUpdate = D) : (_.next = D), (U.lastBaseUpdate = x)));
    }
    if (o !== null) {
      var Y = s.baseState;
      ((d = 0), (U = D = x = null), (_ = o));
      do {
        var z = _.lane & -536870913,
          B = z !== _.lane;
        if (B ? (Ee & z) === z : (a & z) === z) {
          (z !== 0 && z === Fn && (bc = !0),
            U !== null &&
              (U = U.next =
                { lane: 0, tag: _.tag, payload: _.payload, callback: null, next: null }));
          e: {
            var ae = e,
              re = _;
            z = t;
            var He = l;
            switch (re.tag) {
              case 1:
                if (((ae = re.payload), typeof ae == 'function')) {
                  Y = ae.call(He, Y, z);
                  break e;
                }
                Y = ae;
                break e;
              case 3:
                ae.flags = (ae.flags & -65537) | 128;
              case 0:
                if (
                  ((ae = re.payload),
                  (z = typeof ae == 'function' ? ae.call(He, Y, z) : ae),
                  z == null)
                )
                  break e;
                Y = b({}, Y, z);
                break e;
              case 2:
                Ql = !0;
            }
          }
          ((z = _.callback),
            z !== null &&
              ((e.flags |= 64),
              B && (e.flags |= 8192),
              (B = s.callbacks),
              B === null ? (s.callbacks = [z]) : B.push(z)));
        } else
          ((B = { lane: z, tag: _.tag, payload: _.payload, callback: _.callback, next: null }),
            U === null ? ((D = U = B), (x = Y)) : (U = U.next = B),
            (d |= z));
        if (((_ = _.next), _ === null)) {
          if (((_ = s.shared.pending), _ === null)) break;
          ((B = _),
            (_ = B.next),
            (B.next = null),
            (s.lastBaseUpdate = B),
            (s.shared.pending = null));
        }
      } while (!0);
      (U === null && (x = Y),
        (s.baseState = x),
        (s.firstBaseUpdate = D),
        (s.lastBaseUpdate = U),
        o === null && (s.shared.lanes = 0),
        (en |= d),
        (e.lanes = d),
        (e.memoizedState = Y));
    }
  }
  function od(e, t) {
    if (typeof e != 'function') throw Error(u(191, e));
    e.call(t);
  }
  function rd(e, t) {
    var l = e.callbacks;
    if (l !== null) for (e.callbacks = null, e = 0; e < l.length; e++) od(l[e], t);
  }
  var la = C(null),
    rs = C(0);
  function fd(e, t) {
    ((e = Ml), W(rs, e), W(la, t), (Ml = e | t.baseLanes));
  }
  function Sc() {
    (W(rs, Ml), W(la, la.current));
  }
  function kc() {
    ((Ml = rs.current), G(la), G(rs));
  }
  var Ot = C(null),
    Qt = null;
  function Jl(e) {
    var t = e.alternate;
    (W(Fe, Fe.current & 1),
      W(Ot, e),
      Qt === null && (t === null || la.current !== null || t.memoizedState !== null) && (Qt = e));
  }
  function xc(e) {
    (W(Fe, Fe.current), W(Ot, e), Qt === null && (Qt = e));
  }
  function dd(e) {
    e.tag === 22 ? (W(Fe, Fe.current), W(Ot, e), Qt === null && (Qt = e)) : Wl();
  }
  function Wl() {
    (W(Fe, Fe.current), W(Ot, Ot.current));
  }
  function Dt(e) {
    (G(Ot), Qt === e && (Qt = null), G(Fe));
  }
  var Fe = C(0);
  function fs(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && ((l = l.dehydrated), l === null || jo(l) || Mo(l))) return t;
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
  var xl = 0,
    ye = null,
    qe = null,
    lt = null,
    ds = !1,
    na = !1,
    wn = !1,
    ms = 0,
    ei = 0,
    aa = null,
    ny = 0;
  function Ze() {
    throw Error(u(321));
  }
  function Tc(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++) if (!Mt(e[l], t[l])) return !1;
    return !0;
  }
  function Ec(e, t, l, a, s, o) {
    return (
      (xl = o),
      (ye = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (L.H = e === null || e.memoizedState === null ? Zd : Hc),
      (wn = !1),
      (o = l(a, s)),
      (wn = !1),
      na && (o = pd(t, l, a, s)),
      md(e),
      o
    );
  }
  function md(e) {
    L.H = ni;
    var t = qe !== null && qe.next !== null;
    if (((xl = 0), (lt = qe = ye = null), (ds = !1), (ei = 0), (aa = null), t)) throw Error(u(300));
    e === null || nt || ((e = e.dependencies), e !== null && ns(e) && (nt = !0));
  }
  function pd(e, t, l, a) {
    ye = e;
    var s = 0;
    do {
      if ((na && (aa = null), (ei = 0), (na = !1), 25 <= s)) throw Error(u(301));
      if (((s += 1), (lt = qe = null), e.updateQueue != null)) {
        var o = e.updateQueue;
        ((o.lastEffect = null),
          (o.events = null),
          (o.stores = null),
          o.memoCache != null && (o.memoCache.index = 0));
      }
      ((L.H = Jd), (o = t(l, a)));
    } while (na);
    return o;
  }
  function ay() {
    var e = L.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? ti(t) : t),
      (e = e.useState()[0]),
      (qe !== null ? qe.memoizedState : null) !== e && (ye.flags |= 1024),
      t
    );
  }
  function Nc() {
    var e = ms !== 0;
    return ((ms = 0), e);
  }
  function wc(e, t, l) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l));
  }
  function Cc(e) {
    if (ds) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      ds = !1;
    }
    ((xl = 0), (lt = qe = ye = null), (na = !1), (ei = ms = 0), (aa = null));
  }
  function vt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (lt === null ? (ye.memoizedState = lt = e) : (lt = lt.next = e), lt);
  }
  function Pe() {
    if (qe === null) {
      var e = ye.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = qe.next;
    var t = lt === null ? ye.memoizedState : lt.next;
    if (t !== null) ((lt = t), (qe = e));
    else {
      if (e === null) throw ye.alternate === null ? Error(u(467)) : Error(u(310));
      ((qe = e),
        (e = {
          memoizedState: qe.memoizedState,
          baseState: qe.baseState,
          baseQueue: qe.baseQueue,
          queue: qe.queue,
          next: null,
        }),
        lt === null ? (ye.memoizedState = lt = e) : (lt = lt.next = e));
    }
    return lt;
  }
  function ps() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ti(e) {
    var t = ei;
    return (
      (ei += 1),
      aa === null && (aa = []),
      (e = ad(aa, e, t)),
      (t = ye),
      (lt === null ? t.memoizedState : lt.next) === null &&
        ((t = t.alternate), (L.H = t === null || t.memoizedState === null ? Zd : Hc)),
      e
    );
  }
  function hs(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return ti(e);
      if (e.$$typeof === V) return pt(e);
    }
    throw Error(u(438, String(e)));
  }
  function Ac(e) {
    var t = null,
      l = ye.updateQueue;
    if ((l !== null && (t = l.memoCache), t == null)) {
      var a = ye.alternate;
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (t = {
              data: a.data.map(function (s) {
                return s.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      l === null && ((l = ps()), (ye.updateQueue = l)),
      (l.memoCache = t),
      (l = t.data[t.index]),
      l === void 0)
    )
      for (l = t.data[t.index] = Array(e), a = 0; a < e; a++) l[a] = te;
    return (t.index++, l);
  }
  function Tl(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function _s(e) {
    var t = Pe();
    return jc(t, qe, e);
  }
  function jc(e, t, l) {
    var a = e.queue;
    if (a === null) throw Error(u(311));
    a.lastRenderedReducer = l;
    var s = e.baseQueue,
      o = a.pending;
    if (o !== null) {
      if (s !== null) {
        var d = s.next;
        ((s.next = o.next), (o.next = d));
      }
      ((t.baseQueue = s = o), (a.pending = null));
    }
    if (((o = e.baseState), s === null)) e.memoizedState = o;
    else {
      t = s.next;
      var _ = (d = null),
        x = null,
        D = t,
        U = !1;
      do {
        var Y = D.lane & -536870913;
        if (Y !== D.lane ? (Ee & Y) === Y : (xl & Y) === Y) {
          var z = D.revertLane;
          if (z === 0)
            (x !== null &&
              (x = x.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: D.action,
                  hasEagerState: D.hasEagerState,
                  eagerState: D.eagerState,
                  next: null,
                }),
              Y === Fn && (U = !0));
          else if ((xl & z) === z) {
            ((D = D.next), z === Fn && (U = !0));
            continue;
          } else
            ((Y = {
              lane: 0,
              revertLane: D.revertLane,
              gesture: null,
              action: D.action,
              hasEagerState: D.hasEagerState,
              eagerState: D.eagerState,
              next: null,
            }),
              x === null ? ((_ = x = Y), (d = o)) : (x = x.next = Y),
              (ye.lanes |= z),
              (en |= z));
          ((Y = D.action), wn && l(o, Y), (o = D.hasEagerState ? D.eagerState : l(o, Y)));
        } else
          ((z = {
            lane: Y,
            revertLane: D.revertLane,
            gesture: D.gesture,
            action: D.action,
            hasEagerState: D.hasEagerState,
            eagerState: D.eagerState,
            next: null,
          }),
            x === null ? ((_ = x = z), (d = o)) : (x = x.next = z),
            (ye.lanes |= Y),
            (en |= Y));
        D = D.next;
      } while (D !== null && D !== t);
      if (
        (x === null ? (d = o) : (x.next = _),
        !Mt(o, e.memoizedState) && ((nt = !0), U && ((l = Pn), l !== null)))
      )
        throw l;
      ((e.memoizedState = o), (e.baseState = d), (e.baseQueue = x), (a.lastRenderedState = o));
    }
    return (s === null && (a.lanes = 0), [e.memoizedState, a.dispatch]);
  }
  function Mc(e) {
    var t = Pe(),
      l = t.queue;
    if (l === null) throw Error(u(311));
    l.lastRenderedReducer = e;
    var a = l.dispatch,
      s = l.pending,
      o = t.memoizedState;
    if (s !== null) {
      l.pending = null;
      var d = (s = s.next);
      do ((o = e(o, d.action)), (d = d.next));
      while (d !== s);
      (Mt(o, t.memoizedState) || (nt = !0),
        (t.memoizedState = o),
        t.baseQueue === null && (t.baseState = o),
        (l.lastRenderedState = o));
    }
    return [o, a];
  }
  function hd(e, t, l) {
    var a = ye,
      s = Pe(),
      o = we;
    if (o) {
      if (l === void 0) throw Error(u(407));
      l = l();
    } else l = t();
    var d = !Mt((qe || s).memoizedState, l);
    if (
      (d && ((s.memoizedState = l), (nt = !0)),
      (s = s.queue),
      Dc(yd.bind(null, a, s, e), [e]),
      s.getSnapshot !== t || d || (lt !== null && lt.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        ia(9, { destroy: void 0 }, gd.bind(null, a, s, l, t), null),
        Ie === null)
      )
        throw Error(u(349));
      o || (xl & 127) !== 0 || _d(a, t, l);
    }
    return l;
  }
  function _d(e, t, l) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: l }),
      (t = ye.updateQueue),
      t === null
        ? ((t = ps()), (ye.updateQueue = t), (t.stores = [e]))
        : ((l = t.stores), l === null ? (t.stores = [e]) : l.push(e)));
  }
  function gd(e, t, l, a) {
    ((t.value = l), (t.getSnapshot = a), vd(t) && bd(e));
  }
  function yd(e, t, l) {
    return l(function () {
      vd(t) && bd(e);
    });
  }
  function vd(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !Mt(e, l);
    } catch {
      return !0;
    }
  }
  function bd(e) {
    var t = yn(e, 2);
    t !== null && wt(t, e, 2);
  }
  function Rc(e) {
    var t = vt();
    if (typeof e == 'function') {
      var l = e;
      if (((e = l()), wn)) {
        Hl(!0);
        try {
          l();
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
        lastRenderedReducer: Tl,
        lastRenderedState: e,
      }),
      t
    );
  }
  function Sd(e, t, l, a) {
    return ((e.baseState = l), jc(e, qe, typeof a == 'function' ? a : Tl));
  }
  function iy(e, t, l, a, s) {
    if (vs(e)) throw Error(u(485));
    if (((e = t.action), e !== null)) {
      var o = {
        payload: s,
        action: e,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (d) {
          o.listeners.push(d);
        },
      };
      (L.T !== null ? l(!0) : (o.isTransition = !1),
        a(o),
        (l = t.pending),
        l === null
          ? ((o.next = t.pending = o), kd(t, o))
          : ((o.next = l.next), (t.pending = l.next = o)));
    }
  }
  function kd(e, t) {
    var l = t.action,
      a = t.payload,
      s = e.state;
    if (t.isTransition) {
      var o = L.T,
        d = {};
      L.T = d;
      try {
        var _ = l(s, a),
          x = L.S;
        (x !== null && x(d, _), xd(e, t, _));
      } catch (D) {
        Oc(e, t, D);
      } finally {
        (o !== null && d.types !== null && (o.types = d.types), (L.T = o));
      }
    } else
      try {
        ((o = l(s, a)), xd(e, t, o));
      } catch (D) {
        Oc(e, t, D);
      }
  }
  function xd(e, t, l) {
    l !== null && typeof l == 'object' && typeof l.then == 'function'
      ? l.then(
          function (a) {
            Td(e, t, a);
          },
          function (a) {
            return Oc(e, t, a);
          }
        )
      : Td(e, t, l);
  }
  function Td(e, t, l) {
    ((t.status = 'fulfilled'),
      (t.value = l),
      Ed(t),
      (e.state = l),
      (t = e.pending),
      t !== null &&
        ((l = t.next), l === t ? (e.pending = null) : ((l = l.next), (t.next = l), kd(e, l))));
  }
  function Oc(e, t, l) {
    var a = e.pending;
    if (((e.pending = null), a !== null)) {
      a = a.next;
      do ((t.status = 'rejected'), (t.reason = l), Ed(t), (t = t.next));
      while (t !== a);
    }
    e.action = null;
  }
  function Ed(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Nd(e, t) {
    return t;
  }
  function wd(e, t) {
    if (we) {
      var l = Ie.formState;
      if (l !== null) {
        e: {
          var a = ye;
          if (we) {
            if ($e) {
              t: {
                for (var s = $e, o = Vt; s.nodeType !== 8; ) {
                  if (!o) {
                    s = null;
                    break t;
                  }
                  if (((s = Kt(s.nextSibling)), s === null)) {
                    s = null;
                    break t;
                  }
                }
                ((o = s.data), (s = o === 'F!' || o === 'F' ? s : null));
              }
              if (s) {
                (($e = Kt(s.nextSibling)), (a = s.data === 'F!'));
                break e;
              }
            }
            Xl(a);
          }
          a = !1;
        }
        a && (t = l[0]);
      }
    }
    return (
      (l = vt()),
      (l.memoizedState = l.baseState = t),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Nd,
        lastRenderedState: t,
      }),
      (l.queue = a),
      (l = Vd.bind(null, ye, a)),
      (a.dispatch = l),
      (a = Rc(!1)),
      (o = Uc.bind(null, ye, !1, a.queue)),
      (a = vt()),
      (s = { state: t, dispatch: null, action: e, pending: null }),
      (a.queue = s),
      (l = iy.bind(null, ye, s, o, l)),
      (s.dispatch = l),
      (a.memoizedState = e),
      [t, l, !1]
    );
  }
  function Cd(e) {
    var t = Pe();
    return Ad(t, qe, e);
  }
  function Ad(e, t, l) {
    if (
      ((t = jc(e, t, Nd)[0]),
      (e = _s(Tl)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var a = ti(t);
      } catch (d) {
        throw d === ea ? ss : d;
      }
    else a = t;
    t = Pe();
    var s = t.queue,
      o = s.dispatch;
    return (
      l !== t.memoizedState &&
        ((ye.flags |= 2048), ia(9, { destroy: void 0 }, sy.bind(null, s, l), null)),
      [a, o, e]
    );
  }
  function sy(e, t) {
    e.action = t;
  }
  function jd(e) {
    var t = Pe(),
      l = qe;
    if (l !== null) return Ad(t, l, e);
    (Pe(), (t = t.memoizedState), (l = Pe()));
    var a = l.queue.dispatch;
    return ((l.memoizedState = e), [t, a, !1]);
  }
  function ia(e, t, l, a) {
    return (
      (e = { tag: e, create: l, deps: a, inst: t, next: null }),
      (t = ye.updateQueue),
      t === null && ((t = ps()), (ye.updateQueue = t)),
      (l = t.lastEffect),
      l === null
        ? (t.lastEffect = e.next = e)
        : ((a = l.next), (l.next = e), (e.next = a), (t.lastEffect = e)),
      e
    );
  }
  function Md() {
    return Pe().memoizedState;
  }
  function gs(e, t, l, a) {
    var s = vt();
    ((ye.flags |= e),
      (s.memoizedState = ia(1 | t, { destroy: void 0 }, l, a === void 0 ? null : a)));
  }
  function ys(e, t, l, a) {
    var s = Pe();
    a = a === void 0 ? null : a;
    var o = s.memoizedState.inst;
    qe !== null && a !== null && Tc(a, qe.memoizedState.deps)
      ? (s.memoizedState = ia(t, o, l, a))
      : ((ye.flags |= e), (s.memoizedState = ia(1 | t, o, l, a)));
  }
  function Rd(e, t) {
    gs(8390656, 8, e, t);
  }
  function Dc(e, t) {
    ys(2048, 8, e, t);
  }
  function uy(e) {
    ye.flags |= 4;
    var t = ye.updateQueue;
    if (t === null) ((t = ps()), (ye.updateQueue = t), (t.events = [e]));
    else {
      var l = t.events;
      l === null ? (t.events = [e]) : l.push(e);
    }
  }
  function Od(e) {
    var t = Pe().memoizedState;
    return (
      uy({ ref: t, nextImpl: e }),
      function () {
        if ((Re & 2) !== 0) throw Error(u(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function Dd(e, t) {
    return ys(4, 2, e, t);
  }
  function zd(e, t) {
    return ys(4, 4, e, t);
  }
  function Bd(e, t) {
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
  function Ld(e, t, l) {
    ((l = l != null ? l.concat([e]) : null), ys(4, 4, Bd.bind(null, t, e), l));
  }
  function zc() {}
  function qd(e, t) {
    var l = Pe();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    return t !== null && Tc(t, a[1]) ? a[0] : ((l.memoizedState = [e, t]), e);
  }
  function Ud(e, t) {
    var l = Pe();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    if (t !== null && Tc(t, a[1])) return a[0];
    if (((a = e()), wn)) {
      Hl(!0);
      try {
        e();
      } finally {
        Hl(!1);
      }
    }
    return ((l.memoizedState = [a, t]), a);
  }
  function Bc(e, t, l) {
    return l === void 0 || ((xl & 1073741824) !== 0 && (Ee & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = l), (e = Hm()), (ye.lanes |= e), (en |= e), l);
  }
  function Hd(e, t, l, a) {
    return Mt(l, t)
      ? l
      : la.current !== null
        ? ((e = Bc(e, l, a)), Mt(e, t) || (nt = !0), e)
        : (xl & 42) === 0 || ((xl & 1073741824) !== 0 && (Ee & 261930) === 0)
          ? ((nt = !0), (e.memoizedState = l))
          : ((e = Hm()), (ye.lanes |= e), (en |= e), t);
  }
  function Gd(e, t, l, a, s) {
    var o = K.p;
    K.p = o !== 0 && 8 > o ? o : 8;
    var d = L.T,
      _ = {};
    ((L.T = _), Uc(e, !1, t, l));
    try {
      var x = s(),
        D = L.S;
      if (
        (D !== null && D(_, x), x !== null && typeof x == 'object' && typeof x.then == 'function')
      ) {
        var U = ly(x, a);
        li(e, t, U, Lt(e));
      } else li(e, t, a, Lt(e));
    } catch (Y) {
      li(e, t, { then: function () {}, status: 'rejected', reason: Y }, Lt());
    } finally {
      ((K.p = o), d !== null && _.types !== null && (d.types = _.types), (L.T = d));
    }
  }
  function cy() {}
  function Lc(e, t, l, a) {
    if (e.tag !== 5) throw Error(u(476));
    var s = Id(e).queue;
    Gd(
      e,
      s,
      t,
      le,
      l === null
        ? cy
        : function () {
            return ($d(e), l(a));
          }
    );
  }
  function Id(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: le,
      baseState: le,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Tl,
        lastRenderedState: le,
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
          lastRenderedReducer: Tl,
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
  function $d(e) {
    var t = Id(e);
    (t.next === null && (t = e.alternate.memoizedState), li(e, t.next.queue, {}, Lt()));
  }
  function qc() {
    return pt(vi);
  }
  function Yd() {
    return Pe().memoizedState;
  }
  function Xd() {
    return Pe().memoizedState;
  }
  function oy(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = Lt();
          e = Kl(l);
          var a = Zl(t, e, l);
          (a !== null && (wt(a, t, l), Wa(a, t, l)), (t = { cache: mc() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function ry(e, t, l) {
    var a = Lt();
    ((l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      vs(e) ? Qd(t, l) : ((l = lc(e, t, l, a)), l !== null && (wt(l, e, a), Kd(l, t, a))));
  }
  function Vd(e, t, l) {
    var a = Lt();
    li(e, t, l, a);
  }
  function li(e, t, l, a) {
    var s = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (vs(e)) Qd(t, s);
    else {
      var o = e.alternate;
      if (
        e.lanes === 0 &&
        (o === null || o.lanes === 0) &&
        ((o = t.lastRenderedReducer), o !== null)
      )
        try {
          var d = t.lastRenderedState,
            _ = o(d, l);
          if (((s.hasEagerState = !0), (s.eagerState = _), Mt(_, d)))
            return (Pi(e, t, s, 0), Ie === null && Fi(), !1);
        } catch {
        } finally {
        }
      if (((l = lc(e, t, s, a)), l !== null)) return (wt(l, e, a), Kd(l, t, a), !0);
    }
    return !1;
  }
  function Uc(e, t, l, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: yo(),
        gesture: null,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      vs(e))
    ) {
      if (t) throw Error(u(479));
    } else ((t = lc(e, l, a, 2)), t !== null && wt(t, e, 2));
  }
  function vs(e) {
    var t = e.alternate;
    return e === ye || (t !== null && t === ye);
  }
  function Qd(e, t) {
    na = ds = !0;
    var l = e.pending;
    (l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)), (e.pending = t));
  }
  function Kd(e, t, l) {
    if ((l & 4194048) !== 0) {
      var a = t.lanes;
      ((a &= e.pendingLanes), (l |= a), (t.lanes = l), Fr(e, l));
    }
  }
  var ni = {
    readContext: pt,
    use: hs,
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
  ni.useEffectEvent = Ze;
  var Zd = {
      readContext: pt,
      use: hs,
      useCallback: function (e, t) {
        return ((vt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: pt,
      useEffect: Rd,
      useImperativeHandle: function (e, t, l) {
        ((l = l != null ? l.concat([e]) : null), gs(4194308, 4, Bd.bind(null, t, e), l));
      },
      useLayoutEffect: function (e, t) {
        return gs(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        gs(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var l = vt();
        t = t === void 0 ? null : t;
        var a = e();
        if (wn) {
          Hl(!0);
          try {
            e();
          } finally {
            Hl(!1);
          }
        }
        return ((l.memoizedState = [a, t]), a);
      },
      useReducer: function (e, t, l) {
        var a = vt();
        if (l !== void 0) {
          var s = l(t);
          if (wn) {
            Hl(!0);
            try {
              l(t);
            } finally {
              Hl(!1);
            }
          }
        } else s = t;
        return (
          (a.memoizedState = a.baseState = s),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: s,
          }),
          (a.queue = e),
          (e = e.dispatch = ry.bind(null, ye, e)),
          [a.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = vt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = Rc(e);
        var t = e.queue,
          l = Vd.bind(null, ye, t);
        return ((t.dispatch = l), [e.memoizedState, l]);
      },
      useDebugValue: zc,
      useDeferredValue: function (e, t) {
        var l = vt();
        return Bc(l, e, t);
      },
      useTransition: function () {
        var e = Rc(!1);
        return ((e = Gd.bind(null, ye, e.queue, !0, !1)), (vt().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, l) {
        var a = ye,
          s = vt();
        if (we) {
          if (l === void 0) throw Error(u(407));
          l = l();
        } else {
          if (((l = t()), Ie === null)) throw Error(u(349));
          (Ee & 127) !== 0 || _d(a, t, l);
        }
        s.memoizedState = l;
        var o = { value: l, getSnapshot: t };
        return (
          (s.queue = o),
          Rd(yd.bind(null, a, o, e), [e]),
          (a.flags |= 2048),
          ia(9, { destroy: void 0 }, gd.bind(null, a, o, l, t), null),
          l
        );
      },
      useId: function () {
        var e = vt(),
          t = Ie.identifierPrefix;
        if (we) {
          var l = fl,
            a = rl;
          ((l = (a & ~(1 << (32 - jt(a) - 1))).toString(32) + l),
            (t = '_' + t + 'R_' + l),
            (l = ms++),
            0 < l && (t += 'H' + l.toString(32)),
            (t += '_'));
        } else ((l = ny++), (t = '_' + t + 'r_' + l.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: qc,
      useFormState: wd,
      useActionState: wd,
      useOptimistic: function (e) {
        var t = vt();
        t.memoizedState = t.baseState = e;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((t.queue = l), (t = Uc.bind(null, ye, !0, l)), (l.dispatch = t), [e, t]);
      },
      useMemoCache: Ac,
      useCacheRefresh: function () {
        return (vt().memoizedState = oy.bind(null, ye));
      },
      useEffectEvent: function (e) {
        var t = vt(),
          l = { impl: e };
        return (
          (t.memoizedState = l),
          function () {
            if ((Re & 2) !== 0) throw Error(u(440));
            return l.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Hc = {
      readContext: pt,
      use: hs,
      useCallback: qd,
      useContext: pt,
      useEffect: Dc,
      useImperativeHandle: Ld,
      useInsertionEffect: Dd,
      useLayoutEffect: zd,
      useMemo: Ud,
      useReducer: _s,
      useRef: Md,
      useState: function () {
        return _s(Tl);
      },
      useDebugValue: zc,
      useDeferredValue: function (e, t) {
        var l = Pe();
        return Hd(l, qe.memoizedState, e, t);
      },
      useTransition: function () {
        var e = _s(Tl)[0],
          t = Pe().memoizedState;
        return [typeof e == 'boolean' ? e : ti(e), t];
      },
      useSyncExternalStore: hd,
      useId: Yd,
      useHostTransitionStatus: qc,
      useFormState: Cd,
      useActionState: Cd,
      useOptimistic: function (e, t) {
        var l = Pe();
        return Sd(l, qe, e, t);
      },
      useMemoCache: Ac,
      useCacheRefresh: Xd,
    };
  Hc.useEffectEvent = Od;
  var Jd = {
    readContext: pt,
    use: hs,
    useCallback: qd,
    useContext: pt,
    useEffect: Dc,
    useImperativeHandle: Ld,
    useInsertionEffect: Dd,
    useLayoutEffect: zd,
    useMemo: Ud,
    useReducer: Mc,
    useRef: Md,
    useState: function () {
      return Mc(Tl);
    },
    useDebugValue: zc,
    useDeferredValue: function (e, t) {
      var l = Pe();
      return qe === null ? Bc(l, e, t) : Hd(l, qe.memoizedState, e, t);
    },
    useTransition: function () {
      var e = Mc(Tl)[0],
        t = Pe().memoizedState;
      return [typeof e == 'boolean' ? e : ti(e), t];
    },
    useSyncExternalStore: hd,
    useId: Yd,
    useHostTransitionStatus: qc,
    useFormState: jd,
    useActionState: jd,
    useOptimistic: function (e, t) {
      var l = Pe();
      return qe !== null ? Sd(l, qe, e, t) : ((l.baseState = e), [e, l.queue.dispatch]);
    },
    useMemoCache: Ac,
    useCacheRefresh: Xd,
  };
  Jd.useEffectEvent = Od;
  function Gc(e, t, l, a) {
    ((t = e.memoizedState),
      (l = l(a, t)),
      (l = l == null ? t : b({}, t, l)),
      (e.memoizedState = l),
      e.lanes === 0 && (e.updateQueue.baseState = l));
  }
  var Ic = {
    enqueueSetState: function (e, t, l) {
      e = e._reactInternals;
      var a = Lt(),
        s = Kl(a);
      ((s.payload = t),
        l != null && (s.callback = l),
        (t = Zl(e, s, a)),
        t !== null && (wt(t, e, a), Wa(t, e, a)));
    },
    enqueueReplaceState: function (e, t, l) {
      e = e._reactInternals;
      var a = Lt(),
        s = Kl(a);
      ((s.tag = 1),
        (s.payload = t),
        l != null && (s.callback = l),
        (t = Zl(e, s, a)),
        t !== null && (wt(t, e, a), Wa(t, e, a)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var l = Lt(),
        a = Kl(l);
      ((a.tag = 2),
        t != null && (a.callback = t),
        (t = Zl(e, a, l)),
        t !== null && (wt(t, e, l), Wa(t, e, l)));
    },
  };
  function Wd(e, t, l, a, s, o, d) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(a, o, d)
        : t.prototype && t.prototype.isPureReactComponent
          ? !$a(l, a) || !$a(s, o)
          : !0
    );
  }
  function Fd(e, t, l, a) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(l, a),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(l, a),
      t.state !== e && Ic.enqueueReplaceState(t, t.state, null));
  }
  function Cn(e, t) {
    var l = t;
    if ('ref' in t) {
      l = {};
      for (var a in t) a !== 'ref' && (l[a] = t[a]);
    }
    if ((e = e.defaultProps)) {
      l === t && (l = b({}, l));
      for (var s in e) l[s] === void 0 && (l[s] = e[s]);
    }
    return l;
  }
  function Pd(e) {
    Wi(e);
  }
  function em(e) {
    console.error(e);
  }
  function tm(e) {
    Wi(e);
  }
  function bs(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function lm(e, t, l) {
    try {
      var a = e.onCaughtError;
      a(l.value, { componentStack: l.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (s) {
      setTimeout(function () {
        throw s;
      });
    }
  }
  function $c(e, t, l) {
    return (
      (l = Kl(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        bs(e, t);
      }),
      l
    );
  }
  function nm(e) {
    return ((e = Kl(e)), (e.tag = 3), e);
  }
  function am(e, t, l, a) {
    var s = l.type.getDerivedStateFromError;
    if (typeof s == 'function') {
      var o = a.value;
      ((e.payload = function () {
        return s(o);
      }),
        (e.callback = function () {
          lm(t, l, a);
        }));
    }
    var d = l.stateNode;
    d !== null &&
      typeof d.componentDidCatch == 'function' &&
      (e.callback = function () {
        (lm(t, l, a),
          typeof s != 'function' && (tn === null ? (tn = new Set([this])) : tn.add(this)));
        var _ = a.stack;
        this.componentDidCatch(a.value, { componentStack: _ !== null ? _ : '' });
      });
  }
  function fy(e, t, l, a, s) {
    if (((l.flags |= 32768), a !== null && typeof a == 'object' && typeof a.then == 'function')) {
      if (((t = l.alternate), t !== null && Wn(t, l, s, !0), (l = Ot.current), l !== null)) {
        switch (l.tag) {
          case 31:
          case 13:
            return (
              Qt === null ? Rs() : l.alternate === null && Je === 0 && (Je = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = s),
              a === us
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null ? (l.updateQueue = new Set([a])) : t.add(a),
                  ho(e, a, s)),
              !1
            );
          case 22:
            return (
              (l.flags |= 65536),
              a === us
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([a]) }),
                      (l.updateQueue = t))
                    : ((l = t.retryQueue), l === null ? (t.retryQueue = new Set([a])) : l.add(a)),
                  ho(e, a, s)),
              !1
            );
        }
        throw Error(u(435, l.tag));
      }
      return (ho(e, a, s), Rs(), !1);
    }
    if (we)
      return (
        (t = Ot.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = s),
            a !== cc && ((e = Error(u(422), { cause: a })), Va($t(e, l))))
          : (a !== cc && ((t = Error(u(423), { cause: a })), Va($t(t, l))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (s &= -s),
            (e.lanes |= s),
            (a = $t(a, l)),
            (s = $c(e.stateNode, a, s)),
            vc(e, s),
            Je !== 4 && (Je = 2)),
        !1
      );
    var o = Error(u(520), { cause: a });
    if (((o = $t(o, l)), fi === null ? (fi = [o]) : fi.push(o), Je !== 4 && (Je = 2), t === null))
      return !0;
    ((a = $t(a, l)), (l = t));
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (e = s & -s),
            (l.lanes |= e),
            (e = $c(l.stateNode, a, e)),
            vc(l, e),
            !1
          );
        case 1:
          if (
            ((t = l.type),
            (o = l.stateNode),
            (l.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == 'function' ||
                (o !== null &&
                  typeof o.componentDidCatch == 'function' &&
                  (tn === null || !tn.has(o)))))
          )
            return (
              (l.flags |= 65536),
              (s &= -s),
              (l.lanes |= s),
              (s = nm(s)),
              am(s, e, l, a),
              vc(l, s),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Yc = Error(u(461)),
    nt = !1;
  function ht(e, t, l, a) {
    t.child = e === null ? cd(t, null, l, a) : Nn(t, e.child, l, a);
  }
  function im(e, t, l, a, s) {
    l = l.render;
    var o = t.ref;
    if ('ref' in a) {
      var d = {};
      for (var _ in a) _ !== 'ref' && (d[_] = a[_]);
    } else d = a;
    return (
      kn(t),
      (a = Ec(e, t, l, d, o, s)),
      (_ = Nc()),
      e !== null && !nt
        ? (wc(e, t, s), El(e, t, s))
        : (we && _ && sc(t), (t.flags |= 1), ht(e, t, a, s), t.child)
    );
  }
  function sm(e, t, l, a, s) {
    if (e === null) {
      var o = l.type;
      return typeof o == 'function' && !nc(o) && o.defaultProps === void 0 && l.compare === null
        ? ((t.tag = 15), (t.type = o), um(e, t, o, a, s))
        : ((e = ts(l.type, null, a, t, t.mode, s)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((o = e.child), !Fc(e, s))) {
      var d = o.memoizedProps;
      if (((l = l.compare), (l = l !== null ? l : $a), l(d, a) && e.ref === t.ref))
        return El(e, t, s);
    }
    return ((t.flags |= 1), (e = vl(o, a)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function um(e, t, l, a, s) {
    if (e !== null) {
      var o = e.memoizedProps;
      if ($a(o, a) && e.ref === t.ref)
        if (((nt = !1), (t.pendingProps = a = o), Fc(e, s))) (e.flags & 131072) !== 0 && (nt = !0);
        else return ((t.lanes = e.lanes), El(e, t, s));
    }
    return Xc(e, t, l, a, s);
  }
  function cm(e, t, l, a) {
    var s = a.children,
      o = e !== null ? e.memoizedState : null;
    if (
      (e === null &&
        t.stateNode === null &&
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      a.mode === 'hidden')
    ) {
      if ((t.flags & 128) !== 0) {
        if (((o = o !== null ? o.baseLanes | l : l), e !== null)) {
          for (a = t.child = e.child, s = 0; a !== null; )
            ((s = s | a.lanes | a.childLanes), (a = a.sibling));
          a = s & ~o;
        } else ((a = 0), (t.child = null));
        return om(e, t, o, l, a);
      }
      if ((l & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && is(t, o !== null ? o.cachePool : null),
          o !== null ? fd(t, o) : Sc(),
          dd(t));
      else return ((a = t.lanes = 536870912), om(e, t, o !== null ? o.baseLanes | l : l, l, a));
    } else
      o !== null
        ? (is(t, o.cachePool), fd(t, o), Wl(), (t.memoizedState = null))
        : (e !== null && is(t, null), Sc(), Wl());
    return (ht(e, t, s, l), t.child);
  }
  function ai(e, t) {
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
  function om(e, t, l, a, s) {
    var o = hc();
    return (
      (o = o === null ? null : { parent: tt._currentValue, pool: o }),
      (t.memoizedState = { baseLanes: l, cachePool: o }),
      e !== null && is(t, null),
      Sc(),
      dd(t),
      e !== null && Wn(e, t, a, !0),
      (t.childLanes = s),
      null
    );
  }
  function Ss(e, t) {
    return (
      (t = xs({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function rm(e, t, l) {
    return (
      Nn(t, e.child, null, l),
      (e = Ss(t, t.pendingProps)),
      (e.flags |= 2),
      Dt(t),
      (t.memoizedState = null),
      e
    );
  }
  function dy(e, t, l) {
    var a = t.pendingProps,
      s = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (we) {
        if (a.mode === 'hidden') return ((e = Ss(t, a)), (t.lanes = 536870912), ai(null, e));
        if (
          (xc(t),
          (e = $e)
            ? ((e = kp(e, Vt)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: $l !== null ? { id: rl, overflow: fl } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Qf(e)),
                (l.return = t),
                (t.child = l),
                (mt = t),
                ($e = null)))
            : (e = null),
          e === null)
        )
          throw Xl(t);
        return ((t.lanes = 536870912), null);
      }
      return Ss(t, a);
    }
    var o = e.memoizedState;
    if (o !== null) {
      var d = o.dehydrated;
      if ((xc(t), s))
        if (t.flags & 256) ((t.flags &= -257), (t = rm(e, t, l)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(u(558));
      else if ((nt || Wn(e, t, l, !1), (s = (l & e.childLanes) !== 0), nt || s)) {
        if (((a = Ie), a !== null && ((d = Pr(a, l)), d !== 0 && d !== o.retryLane)))
          throw ((o.retryLane = d), yn(e, d), wt(a, e, d), Yc);
        (Rs(), (t = rm(e, t, l)));
      } else
        ((e = o.treeContext),
          ($e = Kt(d.nextSibling)),
          (mt = t),
          (we = !0),
          (Yl = null),
          (Vt = !1),
          e !== null && Jf(t, e),
          (t = Ss(t, a)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = vl(e.child, { mode: a.mode, children: a.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function ks(e, t) {
    var l = t.ref;
    if (l === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != 'function' && typeof l != 'object') throw Error(u(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function Xc(e, t, l, a, s) {
    return (
      kn(t),
      (l = Ec(e, t, l, a, void 0, s)),
      (a = Nc()),
      e !== null && !nt
        ? (wc(e, t, s), El(e, t, s))
        : (we && a && sc(t), (t.flags |= 1), ht(e, t, l, s), t.child)
    );
  }
  function fm(e, t, l, a, s, o) {
    return (
      kn(t),
      (t.updateQueue = null),
      (l = pd(t, a, l, s)),
      md(e),
      (a = Nc()),
      e !== null && !nt
        ? (wc(e, t, o), El(e, t, o))
        : (we && a && sc(t), (t.flags |= 1), ht(e, t, l, o), t.child)
    );
  }
  function dm(e, t, l, a, s) {
    if ((kn(t), t.stateNode === null)) {
      var o = Qn,
        d = l.contextType;
      (typeof d == 'object' && d !== null && (o = pt(d)),
        (o = new l(a, o)),
        (t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null),
        (o.updater = Ic),
        (t.stateNode = o),
        (o._reactInternals = t),
        (o = t.stateNode),
        (o.props = a),
        (o.state = t.memoizedState),
        (o.refs = {}),
        gc(t),
        (d = l.contextType),
        (o.context = typeof d == 'object' && d !== null ? pt(d) : Qn),
        (o.state = t.memoizedState),
        (d = l.getDerivedStateFromProps),
        typeof d == 'function' && (Gc(t, l, d, a), (o.state = t.memoizedState)),
        typeof l.getDerivedStateFromProps == 'function' ||
          typeof o.getSnapshotBeforeUpdate == 'function' ||
          (typeof o.UNSAFE_componentWillMount != 'function' &&
            typeof o.componentWillMount != 'function') ||
          ((d = o.state),
          typeof o.componentWillMount == 'function' && o.componentWillMount(),
          typeof o.UNSAFE_componentWillMount == 'function' && o.UNSAFE_componentWillMount(),
          d !== o.state && Ic.enqueueReplaceState(o, o.state, null),
          Pa(t, a, o, s),
          Fa(),
          (o.state = t.memoizedState)),
        typeof o.componentDidMount == 'function' && (t.flags |= 4194308),
        (a = !0));
    } else if (e === null) {
      o = t.stateNode;
      var _ = t.memoizedProps,
        x = Cn(l, _);
      o.props = x;
      var D = o.context,
        U = l.contextType;
      ((d = Qn), typeof U == 'object' && U !== null && (d = pt(U)));
      var Y = l.getDerivedStateFromProps;
      ((U = typeof Y == 'function' || typeof o.getSnapshotBeforeUpdate == 'function'),
        (_ = t.pendingProps !== _),
        U ||
          (typeof o.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof o.componentWillReceiveProps != 'function') ||
          ((_ || D !== d) && Fd(t, o, a, d)),
        (Ql = !1));
      var z = t.memoizedState;
      ((o.state = z),
        Pa(t, a, o, s),
        Fa(),
        (D = t.memoizedState),
        _ || z !== D || Ql
          ? (typeof Y == 'function' && (Gc(t, l, Y, a), (D = t.memoizedState)),
            (x = Ql || Wd(t, l, x, a, z, D, d))
              ? (U ||
                  (typeof o.UNSAFE_componentWillMount != 'function' &&
                    typeof o.componentWillMount != 'function') ||
                  (typeof o.componentWillMount == 'function' && o.componentWillMount(),
                  typeof o.UNSAFE_componentWillMount == 'function' &&
                    o.UNSAFE_componentWillMount()),
                typeof o.componentDidMount == 'function' && (t.flags |= 4194308))
              : (typeof o.componentDidMount == 'function' && (t.flags |= 4194308),
                (t.memoizedProps = a),
                (t.memoizedState = D)),
            (o.props = a),
            (o.state = D),
            (o.context = d),
            (a = x))
          : (typeof o.componentDidMount == 'function' && (t.flags |= 4194308), (a = !1)));
    } else {
      ((o = t.stateNode),
        yc(e, t),
        (d = t.memoizedProps),
        (U = Cn(l, d)),
        (o.props = U),
        (Y = t.pendingProps),
        (z = o.context),
        (D = l.contextType),
        (x = Qn),
        typeof D == 'object' && D !== null && (x = pt(D)),
        (_ = l.getDerivedStateFromProps),
        (D = typeof _ == 'function' || typeof o.getSnapshotBeforeUpdate == 'function') ||
          (typeof o.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof o.componentWillReceiveProps != 'function') ||
          ((d !== Y || z !== x) && Fd(t, o, a, x)),
        (Ql = !1),
        (z = t.memoizedState),
        (o.state = z),
        Pa(t, a, o, s),
        Fa());
      var B = t.memoizedState;
      d !== Y || z !== B || Ql || (e !== null && e.dependencies !== null && ns(e.dependencies))
        ? (typeof _ == 'function' && (Gc(t, l, _, a), (B = t.memoizedState)),
          (U =
            Ql ||
            Wd(t, l, U, a, z, B, x) ||
            (e !== null && e.dependencies !== null && ns(e.dependencies)))
            ? (D ||
                (typeof o.UNSAFE_componentWillUpdate != 'function' &&
                  typeof o.componentWillUpdate != 'function') ||
                (typeof o.componentWillUpdate == 'function' && o.componentWillUpdate(a, B, x),
                typeof o.UNSAFE_componentWillUpdate == 'function' &&
                  o.UNSAFE_componentWillUpdate(a, B, x)),
              typeof o.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof o.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof o.componentDidUpdate != 'function' ||
                (d === e.memoizedProps && z === e.memoizedState) ||
                (t.flags |= 4),
              typeof o.getSnapshotBeforeUpdate != 'function' ||
                (d === e.memoizedProps && z === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = a),
              (t.memoizedState = B)),
          (o.props = a),
          (o.state = B),
          (o.context = x),
          (a = U))
        : (typeof o.componentDidUpdate != 'function' ||
            (d === e.memoizedProps && z === e.memoizedState) ||
            (t.flags |= 4),
          typeof o.getSnapshotBeforeUpdate != 'function' ||
            (d === e.memoizedProps && z === e.memoizedState) ||
            (t.flags |= 1024),
          (a = !1));
    }
    return (
      (o = a),
      ks(e, t),
      (a = (t.flags & 128) !== 0),
      o || a
        ? ((o = t.stateNode),
          (l = a && typeof l.getDerivedStateFromError != 'function' ? null : o.render()),
          (t.flags |= 1),
          e !== null && a
            ? ((t.child = Nn(t, e.child, null, s)), (t.child = Nn(t, null, l, s)))
            : ht(e, t, l, s),
          (t.memoizedState = o.state),
          (e = t.child))
        : (e = El(e, t, s)),
      e
    );
  }
  function mm(e, t, l, a) {
    return (bn(), (t.flags |= 256), ht(e, t, l, a), t.child);
  }
  var Vc = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Qc(e) {
    return { baseLanes: e, cachePool: ld() };
  }
  function Kc(e, t, l) {
    return ((e = e !== null ? e.childLanes & ~l : 0), t && (e |= Bt), e);
  }
  function pm(e, t, l) {
    var a = t.pendingProps,
      s = !1,
      o = (t.flags & 128) !== 0,
      d;
    if (
      ((d = o) || (d = e !== null && e.memoizedState === null ? !1 : (Fe.current & 2) !== 0),
      d && ((s = !0), (t.flags &= -129)),
      (d = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (we) {
        if (
          (s ? Jl(t) : Wl(),
          (e = $e)
            ? ((e = kp(e, Vt)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: $l !== null ? { id: rl, overflow: fl } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Qf(e)),
                (l.return = t),
                (t.child = l),
                (mt = t),
                ($e = null)))
            : (e = null),
          e === null)
        )
          throw Xl(t);
        return (Mo(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var _ = a.children;
      return (
        (a = a.fallback),
        s
          ? (Wl(),
            (s = t.mode),
            (_ = xs({ mode: 'hidden', children: _ }, s)),
            (a = vn(a, s, l, null)),
            (_.return = t),
            (a.return = t),
            (_.sibling = a),
            (t.child = _),
            (a = t.child),
            (a.memoizedState = Qc(l)),
            (a.childLanes = Kc(e, d, l)),
            (t.memoizedState = Vc),
            ai(null, a))
          : (Jl(t), Zc(t, _))
      );
    }
    var x = e.memoizedState;
    if (x !== null && ((_ = x.dehydrated), _ !== null)) {
      if (o)
        t.flags & 256
          ? (Jl(t), (t.flags &= -257), (t = Jc(e, t, l)))
          : t.memoizedState !== null
            ? (Wl(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (Wl(),
              (_ = a.fallback),
              (s = t.mode),
              (a = xs({ mode: 'visible', children: a.children }, s)),
              (_ = vn(_, s, l, null)),
              (_.flags |= 2),
              (a.return = t),
              (_.return = t),
              (a.sibling = _),
              (t.child = a),
              Nn(t, e.child, null, l),
              (a = t.child),
              (a.memoizedState = Qc(l)),
              (a.childLanes = Kc(e, d, l)),
              (t.memoizedState = Vc),
              (t = ai(null, a)));
      else if ((Jl(t), Mo(_))) {
        if (((d = _.nextSibling && _.nextSibling.dataset), d)) var D = d.dgst;
        ((d = D),
          (a = Error(u(419))),
          (a.stack = ''),
          (a.digest = d),
          Va({ value: a, source: null, stack: null }),
          (t = Jc(e, t, l)));
      } else if ((nt || Wn(e, t, l, !1), (d = (l & e.childLanes) !== 0), nt || d)) {
        if (((d = Ie), d !== null && ((a = Pr(d, l)), a !== 0 && a !== x.retryLane)))
          throw ((x.retryLane = a), yn(e, a), wt(d, e, a), Yc);
        (jo(_) || Rs(), (t = Jc(e, t, l)));
      } else
        jo(_)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = x.treeContext),
            ($e = Kt(_.nextSibling)),
            (mt = t),
            (we = !0),
            (Yl = null),
            (Vt = !1),
            e !== null && Jf(t, e),
            (t = Zc(t, a.children)),
            (t.flags |= 4096));
      return t;
    }
    return s
      ? (Wl(),
        (_ = a.fallback),
        (s = t.mode),
        (x = e.child),
        (D = x.sibling),
        (a = vl(x, { mode: 'hidden', children: a.children })),
        (a.subtreeFlags = x.subtreeFlags & 65011712),
        D !== null ? (_ = vl(D, _)) : ((_ = vn(_, s, l, null)), (_.flags |= 2)),
        (_.return = t),
        (a.return = t),
        (a.sibling = _),
        (t.child = a),
        ai(null, a),
        (a = t.child),
        (_ = e.child.memoizedState),
        _ === null
          ? (_ = Qc(l))
          : ((s = _.cachePool),
            s !== null
              ? ((x = tt._currentValue), (s = s.parent !== x ? { parent: x, pool: x } : s))
              : (s = ld()),
            (_ = { baseLanes: _.baseLanes | l, cachePool: s })),
        (a.memoizedState = _),
        (a.childLanes = Kc(e, d, l)),
        (t.memoizedState = Vc),
        ai(e.child, a))
      : (Jl(t),
        (l = e.child),
        (e = l.sibling),
        (l = vl(l, { mode: 'visible', children: a.children })),
        (l.return = t),
        (l.sibling = null),
        e !== null &&
          ((d = t.deletions), d === null ? ((t.deletions = [e]), (t.flags |= 16)) : d.push(e)),
        (t.child = l),
        (t.memoizedState = null),
        l);
  }
  function Zc(e, t) {
    return ((t = xs({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function xs(e, t) {
    return ((e = Rt(22, e, null, t)), (e.lanes = 0), e);
  }
  function Jc(e, t, l) {
    return (
      Nn(t, e.child, null, l),
      (e = Zc(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function hm(e, t, l) {
    e.lanes |= t;
    var a = e.alternate;
    (a !== null && (a.lanes |= t), fc(e.return, t, l));
  }
  function Wc(e, t, l, a, s, o) {
    var d = e.memoizedState;
    d === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: l,
          tailMode: s,
          treeForkCount: o,
        })
      : ((d.isBackwards = t),
        (d.rendering = null),
        (d.renderingStartTime = 0),
        (d.last = a),
        (d.tail = l),
        (d.tailMode = s),
        (d.treeForkCount = o));
  }
  function _m(e, t, l) {
    var a = t.pendingProps,
      s = a.revealOrder,
      o = a.tail;
    a = a.children;
    var d = Fe.current,
      _ = (d & 2) !== 0;
    if (
      (_ ? ((d = (d & 1) | 2), (t.flags |= 128)) : (d &= 1),
      W(Fe, d),
      ht(e, t, a, l),
      (a = we ? Xa : 0),
      !_ && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && hm(e, l, t);
        else if (e.tag === 19) hm(e, l, t);
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
        for (l = t.child, s = null; l !== null; )
          ((e = l.alternate), e !== null && fs(e) === null && (s = l), (l = l.sibling));
        ((l = s),
          l === null ? ((s = t.child), (t.child = null)) : ((s = l.sibling), (l.sibling = null)),
          Wc(t, !1, s, l, o, a));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (l = null, s = t.child, t.child = null; s !== null; ) {
          if (((e = s.alternate), e !== null && fs(e) === null)) {
            t.child = s;
            break;
          }
          ((e = s.sibling), (s.sibling = l), (l = s), (s = e));
        }
        Wc(t, !0, l, null, o, a);
        break;
      case 'together':
        Wc(t, !1, null, null, void 0, a);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function El(e, t, l) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (en |= t.lanes), (l & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((Wn(e, t, l, !1), (l & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(u(153));
    if (t.child !== null) {
      for (e = t.child, l = vl(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        ((e = e.sibling), (l = l.sibling = vl(e, e.pendingProps)), (l.return = t));
      l.sibling = null;
    }
    return t.child;
  }
  function Fc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && ns(e)));
  }
  function my(e, t, l) {
    switch (t.tag) {
      case 3:
        (st(t, t.stateNode.containerInfo), Vl(t, tt, e.memoizedState.cache), bn());
        break;
      case 27:
      case 5:
        I(t);
        break;
      case 4:
        st(t, t.stateNode.containerInfo);
        break;
      case 10:
        Vl(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), xc(t), null);
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null
            ? (Jl(t), (t.flags |= 128), null)
            : (l & t.child.childLanes) !== 0
              ? pm(e, t, l)
              : (Jl(t), (e = El(e, t, l)), e !== null ? e.sibling : null);
        Jl(t);
        break;
      case 19:
        var s = (e.flags & 128) !== 0;
        if (
          ((a = (l & t.childLanes) !== 0),
          a || (Wn(e, t, l, !1), (a = (l & t.childLanes) !== 0)),
          s)
        ) {
          if (a) return _m(e, t, l);
          t.flags |= 128;
        }
        if (
          ((s = t.memoizedState),
          s !== null && ((s.rendering = null), (s.tail = null), (s.lastEffect = null)),
          W(Fe, Fe.current),
          a)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), cm(e, t, l, t.pendingProps));
      case 24:
        Vl(t, tt, e.memoizedState.cache);
    }
    return El(e, t, l);
  }
  function gm(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) nt = !0;
      else {
        if (!Fc(e, l) && (t.flags & 128) === 0) return ((nt = !1), my(e, t, l));
        nt = (e.flags & 131072) !== 0;
      }
    else ((nt = !1), we && (t.flags & 1048576) !== 0 && Zf(t, Xa, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var a = t.pendingProps;
          if (((e = Tn(t.elementType)), (t.type = e), typeof e == 'function'))
            nc(e)
              ? ((a = Cn(e, a)), (t.tag = 1), (t = dm(null, t, e, a, l)))
              : ((t.tag = 0), (t = Xc(null, t, e, a, l)));
          else {
            if (e != null) {
              var s = e.$$typeof;
              if (s === P) {
                ((t.tag = 11), (t = im(null, t, e, a, l)));
                break e;
              } else if (s === H) {
                ((t.tag = 14), (t = sm(null, t, e, a, l)));
                break e;
              }
            }
            throw ((t = J(e) || e), Error(u(306, t, '')));
          }
        }
        return t;
      case 0:
        return Xc(e, t, t.type, t.pendingProps, l);
      case 1:
        return ((a = t.type), (s = Cn(a, t.pendingProps)), dm(e, t, a, s, l));
      case 3:
        e: {
          if ((st(t, t.stateNode.containerInfo), e === null)) throw Error(u(387));
          a = t.pendingProps;
          var o = t.memoizedState;
          ((s = o.element), yc(e, t), Pa(t, a, null, l));
          var d = t.memoizedState;
          if (
            ((a = d.cache),
            Vl(t, tt, a),
            a !== o.cache && dc(t, [tt], l, !0),
            Fa(),
            (a = d.element),
            o.isDehydrated)
          )
            if (
              ((o = { element: a, isDehydrated: !1, cache: d.cache }),
              (t.updateQueue.baseState = o),
              (t.memoizedState = o),
              t.flags & 256)
            ) {
              t = mm(e, t, a, l);
              break e;
            } else if (a !== s) {
              ((s = $t(Error(u(424)), t)), Va(s), (t = mm(e, t, a, l)));
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
                $e = Kt(e.firstChild),
                  mt = t,
                  we = !0,
                  Yl = null,
                  Vt = !0,
                  l = cd(t, null, a, l),
                  t.child = l;
                l;
              )
                ((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
            }
          else {
            if ((bn(), a === s)) {
              t = El(e, t, l);
              break e;
            }
            ht(e, t, a, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          ks(e, t),
          e === null
            ? (l = Cp(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = l)
              : we ||
                ((l = t.type),
                (e = t.pendingProps),
                (a = Us(be.current).createElement(l)),
                (a[dt] = t),
                (a[St] = e),
                _t(a, l, e),
                ut(a),
                (t.stateNode = a))
            : (t.memoizedState = Cp(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          I(t),
          e === null &&
            we &&
            ((a = t.stateNode = Ep(t.type, t.pendingProps, be.current)),
            (mt = t),
            (Vt = !0),
            (s = $e),
            sn(t.type) ? ((Ro = s), ($e = Kt(a.firstChild))) : ($e = s)),
          ht(e, t, t.pendingProps.children, l),
          ks(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            we &&
            ((s = a = $e) &&
              ((a = $y(a, t.type, t.pendingProps, Vt)),
              a !== null
                ? ((t.stateNode = a), (mt = t), ($e = Kt(a.firstChild)), (Vt = !1), (s = !0))
                : (s = !1)),
            s || Xl(t)),
          I(t),
          (s = t.type),
          (o = t.pendingProps),
          (d = e !== null ? e.memoizedProps : null),
          (a = o.children),
          wo(s, o) ? (a = null) : d !== null && wo(s, d) && (t.flags |= 32),
          t.memoizedState !== null && ((s = Ec(e, t, ay, null, null, l)), (vi._currentValue = s)),
          ks(e, t),
          ht(e, t, a, l),
          t.child
        );
      case 6:
        return (
          e === null &&
            we &&
            ((e = l = $e) &&
              ((l = Yy(l, t.pendingProps, Vt)),
              l !== null ? ((t.stateNode = l), (mt = t), ($e = null), (e = !0)) : (e = !1)),
            e || Xl(t)),
          null
        );
      case 13:
        return pm(e, t, l);
      case 4:
        return (
          st(t, t.stateNode.containerInfo),
          (a = t.pendingProps),
          e === null ? (t.child = Nn(t, null, a, l)) : ht(e, t, a, l),
          t.child
        );
      case 11:
        return im(e, t, t.type, t.pendingProps, l);
      case 7:
        return (ht(e, t, t.pendingProps, l), t.child);
      case 8:
        return (ht(e, t, t.pendingProps.children, l), t.child);
      case 12:
        return (ht(e, t, t.pendingProps.children, l), t.child);
      case 10:
        return ((a = t.pendingProps), Vl(t, t.type, a.value), ht(e, t, a.children, l), t.child);
      case 9:
        return (
          (s = t.type._context),
          (a = t.pendingProps.children),
          kn(t),
          (s = pt(s)),
          (a = a(s)),
          (t.flags |= 1),
          ht(e, t, a, l),
          t.child
        );
      case 14:
        return sm(e, t, t.type, t.pendingProps, l);
      case 15:
        return um(e, t, t.type, t.pendingProps, l);
      case 19:
        return _m(e, t, l);
      case 31:
        return dy(e, t, l);
      case 22:
        return cm(e, t, l, t.pendingProps);
      case 24:
        return (
          kn(t),
          (a = pt(tt)),
          e === null
            ? ((s = hc()),
              s === null &&
                ((s = Ie),
                (o = mc()),
                (s.pooledCache = o),
                o.refCount++,
                o !== null && (s.pooledCacheLanes |= l),
                (s = o)),
              (t.memoizedState = { parent: a, cache: s }),
              gc(t),
              Vl(t, tt, s))
            : ((e.lanes & l) !== 0 && (yc(e, t), Pa(t, null, null, l), Fa()),
              (s = e.memoizedState),
              (o = t.memoizedState),
              s.parent !== a
                ? ((s = { parent: a, cache: a }),
                  (t.memoizedState = s),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = s),
                  Vl(t, tt, a))
                : ((a = o.cache), Vl(t, tt, a), a !== s.cache && dc(t, [tt], l, !0))),
          ht(e, t, t.pendingProps.children, l),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(u(156, t.tag));
  }
  function Nl(e) {
    e.flags |= 4;
  }
  function Pc(e, t, l, a, s) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (s & 335544128) === s))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Ym()) e.flags |= 8192;
        else throw ((En = us), _c);
    } else e.flags &= -16777217;
  }
  function ym(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !Op(t)))
      if (Ym()) e.flags |= 8192;
      else throw ((En = us), _c);
  }
  function Ts(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? Jr() : 536870912), (e.lanes |= t), (oa |= t)));
  }
  function ii(e, t) {
    if (!we)
      switch (e.tailMode) {
        case 'hidden':
          t = e.tail;
          for (var l = null; t !== null; ) (t.alternate !== null && (l = t), (t = t.sibling));
          l === null ? (e.tail = null) : (l.sibling = null);
          break;
        case 'collapsed':
          l = e.tail;
          for (var a = null; l !== null; ) (l.alternate !== null && (a = l), (l = l.sibling));
          a === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (a.sibling = null);
      }
  }
  function Ye(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      l = 0,
      a = 0;
    if (t)
      for (var s = e.child; s !== null; )
        ((l |= s.lanes | s.childLanes),
          (a |= s.subtreeFlags & 65011712),
          (a |= s.flags & 65011712),
          (s.return = e),
          (s = s.sibling));
    else
      for (s = e.child; s !== null; )
        ((l |= s.lanes | s.childLanes),
          (a |= s.subtreeFlags),
          (a |= s.flags),
          (s.return = e),
          (s = s.sibling));
    return ((e.subtreeFlags |= a), (e.childLanes = l), t);
  }
  function py(e, t, l) {
    var a = t.pendingProps;
    switch ((uc(t), t.tag)) {
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
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          kl(tt),
          Xe(),
          l.pendingContext && ((l.context = l.pendingContext), (l.pendingContext = null)),
          (e === null || e.child === null) &&
            (Jn(t)
              ? Nl(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), oc())),
          Ye(t),
          null
        );
      case 26:
        var s = t.type,
          o = t.memoizedState;
        return (
          e === null
            ? (Nl(t), o !== null ? (Ye(t), ym(t, o)) : (Ye(t), Pc(t, s, null, a, l)))
            : o
              ? o !== e.memoizedState
                ? (Nl(t), Ye(t), ym(t, o))
                : (Ye(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== a && Nl(t), Ye(t), Pc(t, s, e, a, l)),
          null
        );
      case 27:
        if ((oe(t), (l = be.current), (s = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== a && Nl(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(u(166));
            return (Ye(t), null);
          }
          ((e = ne.current), Jn(t) ? Wf(t) : ((e = Ep(s, a, l)), (t.stateNode = e), Nl(t)));
        }
        return (Ye(t), null);
      case 5:
        if ((oe(t), (s = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== a && Nl(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(u(166));
            return (Ye(t), null);
          }
          if (((o = ne.current), Jn(t))) Wf(t);
          else {
            var d = Us(be.current);
            switch (o) {
              case 1:
                o = d.createElementNS('http://www.w3.org/2000/svg', s);
                break;
              case 2:
                o = d.createElementNS('http://www.w3.org/1998/Math/MathML', s);
                break;
              default:
                switch (s) {
                  case 'svg':
                    o = d.createElementNS('http://www.w3.org/2000/svg', s);
                    break;
                  case 'math':
                    o = d.createElementNS('http://www.w3.org/1998/Math/MathML', s);
                    break;
                  case 'script':
                    ((o = d.createElement('div')),
                      (o.innerHTML = '<script><\/script>'),
                      (o = o.removeChild(o.firstChild)));
                    break;
                  case 'select':
                    ((o =
                      typeof a.is == 'string'
                        ? d.createElement('select', { is: a.is })
                        : d.createElement('select')),
                      a.multiple ? (o.multiple = !0) : a.size && (o.size = a.size));
                    break;
                  default:
                    o =
                      typeof a.is == 'string'
                        ? d.createElement(s, { is: a.is })
                        : d.createElement(s);
                }
            }
            ((o[dt] = t), (o[St] = a));
            e: for (d = t.child; d !== null; ) {
              if (d.tag === 5 || d.tag === 6) o.appendChild(d.stateNode);
              else if (d.tag !== 4 && d.tag !== 27 && d.child !== null) {
                ((d.child.return = d), (d = d.child));
                continue;
              }
              if (d === t) break e;
              for (; d.sibling === null; ) {
                if (d.return === null || d.return === t) break e;
                d = d.return;
              }
              ((d.sibling.return = d.return), (d = d.sibling));
            }
            t.stateNode = o;
            e: switch ((_t(o, s, a), s)) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                a = !!a.autoFocus;
                break e;
              case 'img':
                a = !0;
                break e;
              default:
                a = !1;
            }
            a && Nl(t);
          }
        }
        return (Ye(t), Pc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, l), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== a && Nl(t);
        else {
          if (typeof a != 'string' && t.stateNode === null) throw Error(u(166));
          if (((e = be.current), Jn(t))) {
            if (((e = t.stateNode), (l = t.memoizedProps), (a = null), (s = mt), s !== null))
              switch (s.tag) {
                case 27:
                case 5:
                  a = s.memoizedProps;
              }
            ((e[dt] = t),
              (e = !!(
                e.nodeValue === l ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                pp(e.nodeValue, l)
              )),
              e || Xl(t, !0));
          } else ((e = Us(e).createTextNode(a)), (e[dt] = t), (t.stateNode = e));
        }
        return (Ye(t), null);
      case 31:
        if (((l = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((a = Jn(t)), l !== null)) {
            if (e === null) {
              if (!a) throw Error(u(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(u(557));
              e[dt] = t;
            } else (bn(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Ye(t), (e = !1));
          } else
            ((l = oc()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l),
              (e = !0));
          if (!e) return t.flags & 256 ? (Dt(t), t) : (Dt(t), null);
          if ((t.flags & 128) !== 0) throw Error(u(558));
        }
        return (Ye(t), null);
      case 13:
        if (
          ((a = t.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((s = Jn(t)), a !== null && a.dehydrated !== null)) {
            if (e === null) {
              if (!s) throw Error(u(318));
              if (((s = t.memoizedState), (s = s !== null ? s.dehydrated : null), !s))
                throw Error(u(317));
              s[dt] = t;
            } else (bn(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Ye(t), (s = !1));
          } else
            ((s = oc()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = s),
              (s = !0));
          if (!s) return t.flags & 256 ? (Dt(t), t) : (Dt(t), null);
        }
        return (
          Dt(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = l), t)
            : ((l = a !== null),
              (e = e !== null && e.memoizedState !== null),
              l &&
                ((a = t.child),
                (s = null),
                a.alternate !== null &&
                  a.alternate.memoizedState !== null &&
                  a.alternate.memoizedState.cachePool !== null &&
                  (s = a.alternate.memoizedState.cachePool.pool),
                (o = null),
                a.memoizedState !== null &&
                  a.memoizedState.cachePool !== null &&
                  (o = a.memoizedState.cachePool.pool),
                o !== s && (a.flags |= 2048)),
              l !== e && l && (t.child.flags |= 8192),
              Ts(t, t.updateQueue),
              Ye(t),
              null)
        );
      case 4:
        return (Xe(), e === null && ko(t.stateNode.containerInfo), Ye(t), null);
      case 10:
        return (kl(t.type), Ye(t), null);
      case 19:
        if ((G(Fe), (a = t.memoizedState), a === null)) return (Ye(t), null);
        if (((s = (t.flags & 128) !== 0), (o = a.rendering), o === null))
          if (s) ii(a, !1);
          else {
            if (Je !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((o = fs(e)), o !== null)) {
                  for (
                    t.flags |= 128,
                      ii(a, !1),
                      e = o.updateQueue,
                      t.updateQueue = e,
                      Ts(t, e),
                      t.subtreeFlags = 0,
                      e = l,
                      l = t.child;
                    l !== null;
                  )
                    (Vf(l, e), (l = l.sibling));
                  return (W(Fe, (Fe.current & 1) | 2), we && bl(t, a.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            a.tail !== null &&
              Ct() > As &&
              ((t.flags |= 128), (s = !0), ii(a, !1), (t.lanes = 4194304));
          }
        else {
          if (!s)
            if (((e = fs(o)), e !== null)) {
              if (
                ((t.flags |= 128),
                (s = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Ts(t, e),
                ii(a, !0),
                a.tail === null && a.tailMode === 'hidden' && !o.alternate && !we)
              )
                return (Ye(t), null);
            } else
              2 * Ct() - a.renderingStartTime > As &&
                l !== 536870912 &&
                ((t.flags |= 128), (s = !0), ii(a, !1), (t.lanes = 4194304));
          a.isBackwards
            ? ((o.sibling = t.child), (t.child = o))
            : ((e = a.last), e !== null ? (e.sibling = o) : (t.child = o), (a.last = o));
        }
        return a.tail !== null
          ? ((e = a.tail),
            (a.rendering = e),
            (a.tail = e.sibling),
            (a.renderingStartTime = Ct()),
            (e.sibling = null),
            (l = Fe.current),
            W(Fe, s ? (l & 1) | 2 : l & 1),
            we && bl(t, a.treeForkCount),
            e)
          : (Ye(t), null);
      case 22:
      case 23:
        return (
          Dt(t),
          kc(),
          (a = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== a && (t.flags |= 8192)
            : a && (t.flags |= 8192),
          a
            ? (l & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Ye(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Ye(t),
          (l = t.updateQueue),
          l !== null && Ts(t, l.retryQueue),
          (l = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (l = e.memoizedState.cachePool.pool),
          (a = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          a !== l && (t.flags |= 2048),
          e !== null && G(xn),
          null
        );
      case 24:
        return (
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          t.memoizedState.cache !== l && (t.flags |= 2048),
          kl(tt),
          Ye(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(u(156, t.tag));
  }
  function hy(e, t) {
    switch ((uc(t), t.tag)) {
      case 1:
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 3:
        return (
          kl(tt),
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
          if ((Dt(t), t.alternate === null)) throw Error(u(340));
          bn();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((Dt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(u(340));
          bn();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (G(Fe), null);
      case 4:
        return (Xe(), null);
      case 10:
        return (kl(t.type), null);
      case 22:
      case 23:
        return (
          Dt(t),
          kc(),
          e !== null && G(xn),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (kl(tt), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function vm(e, t) {
    switch ((uc(t), t.tag)) {
      case 3:
        (kl(tt), Xe());
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
        t.memoizedState !== null && Dt(t);
        break;
      case 13:
        Dt(t);
        break;
      case 19:
        G(Fe);
        break;
      case 10:
        kl(t.type);
        break;
      case 22:
      case 23:
        (Dt(t), kc(), e !== null && G(xn));
        break;
      case 24:
        kl(tt);
    }
  }
  function si(e, t) {
    try {
      var l = t.updateQueue,
        a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var s = a.next;
        l = s;
        do {
          if ((l.tag & e) === e) {
            a = void 0;
            var o = l.create,
              d = l.inst;
            ((a = o()), (d.destroy = a));
          }
          l = l.next;
        } while (l !== s);
      }
    } catch (_) {
      Be(t, t.return, _);
    }
  }
  function Fl(e, t, l) {
    try {
      var a = t.updateQueue,
        s = a !== null ? a.lastEffect : null;
      if (s !== null) {
        var o = s.next;
        a = o;
        do {
          if ((a.tag & e) === e) {
            var d = a.inst,
              _ = d.destroy;
            if (_ !== void 0) {
              ((d.destroy = void 0), (s = t));
              var x = l,
                D = _;
              try {
                D();
              } catch (U) {
                Be(s, x, U);
              }
            }
          }
          a = a.next;
        } while (a !== o);
      }
    } catch (U) {
      Be(t, t.return, U);
    }
  }
  function bm(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        rd(t, l);
      } catch (a) {
        Be(e, e.return, a);
      }
    }
  }
  function Sm(e, t, l) {
    ((l.props = Cn(e.type, e.memoizedProps)), (l.state = e.memoizedState));
    try {
      l.componentWillUnmount();
    } catch (a) {
      Be(e, t, a);
    }
  }
  function ui(e, t) {
    try {
      var l = e.ref;
      if (l !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode;
            break;
          case 30:
            a = e.stateNode;
            break;
          default:
            a = e.stateNode;
        }
        typeof l == 'function' ? (e.refCleanup = l(a)) : (l.current = a);
      }
    } catch (s) {
      Be(e, t, s);
    }
  }
  function dl(e, t) {
    var l = e.ref,
      a = e.refCleanup;
    if (l !== null)
      if (typeof a == 'function')
        try {
          a();
        } catch (s) {
          Be(e, t, s);
        } finally {
          ((e.refCleanup = null), (e = e.alternate), e != null && (e.refCleanup = null));
        }
      else if (typeof l == 'function')
        try {
          l(null);
        } catch (s) {
          Be(e, t, s);
        }
      else l.current = null;
  }
  function km(e) {
    var t = e.type,
      l = e.memoizedProps,
      a = e.stateNode;
    try {
      e: switch (t) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          l.autoFocus && a.focus();
          break e;
        case 'img':
          l.src ? (a.src = l.src) : l.srcSet && (a.srcset = l.srcSet);
      }
    } catch (s) {
      Be(e, e.return, s);
    }
  }
  function eo(e, t, l) {
    try {
      var a = e.stateNode;
      (Ly(a, e.type, l, t), (a[St] = t));
    } catch (s) {
      Be(e, e.return, s);
    }
  }
  function xm(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && sn(e.type)) || e.tag === 4
    );
  }
  function to(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || xm(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if ((e.tag === 27 && sn(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function lo(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
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
            l != null || t.onclick !== null || (t.onclick = gl)));
    else if (
      a !== 4 &&
      (a === 27 && sn(e.type) && ((l = e.stateNode), (t = null)), (e = e.child), e !== null)
    )
      for (lo(e, t, l), e = e.sibling; e !== null; ) (lo(e, t, l), (e = e.sibling));
  }
  function Es(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6) ((e = e.stateNode), t ? l.insertBefore(e, t) : l.appendChild(e));
    else if (a !== 4 && (a === 27 && sn(e.type) && (l = e.stateNode), (e = e.child), e !== null))
      for (Es(e, t, l), e = e.sibling; e !== null; ) (Es(e, t, l), (e = e.sibling));
  }
  function Tm(e) {
    var t = e.stateNode,
      l = e.memoizedProps;
    try {
      for (var a = e.type, s = t.attributes; s.length; ) t.removeAttributeNode(s[0]);
      (_t(t, a, l), (t[dt] = e), (t[St] = l));
    } catch (o) {
      Be(e, e.return, o);
    }
  }
  var wl = !1,
    at = !1,
    no = !1,
    Em = typeof WeakSet == 'function' ? WeakSet : Set,
    ct = null;
  function _y(e, t) {
    if (((e = e.containerInfo), (Eo = Vs), (e = Lf(e)), Ju(e))) {
      if ('selectionStart' in e) var l = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          l = ((l = e.ownerDocument) && l.defaultView) || window;
          var a = l.getSelection && l.getSelection();
          if (a && a.rangeCount !== 0) {
            l = a.anchorNode;
            var s = a.anchorOffset,
              o = a.focusNode;
            a = a.focusOffset;
            try {
              (l.nodeType, o.nodeType);
            } catch {
              l = null;
              break e;
            }
            var d = 0,
              _ = -1,
              x = -1,
              D = 0,
              U = 0,
              Y = e,
              z = null;
            t: for (;;) {
              for (
                var B;
                Y !== l || (s !== 0 && Y.nodeType !== 3) || (_ = d + s),
                  Y !== o || (a !== 0 && Y.nodeType !== 3) || (x = d + a),
                  Y.nodeType === 3 && (d += Y.nodeValue.length),
                  (B = Y.firstChild) !== null;
              )
                ((z = Y), (Y = B));
              for (;;) {
                if (Y === e) break t;
                if (
                  (z === l && ++D === s && (_ = d),
                  z === o && ++U === a && (x = d),
                  (B = Y.nextSibling) !== null)
                )
                  break;
                ((Y = z), (z = Y.parentNode));
              }
              Y = B;
            }
            l = _ === -1 || x === -1 ? null : { start: _, end: x };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (No = { focusedElem: e, selectionRange: l }, Vs = !1, ct = t; ct !== null; )
      if (((t = ct), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (ct = e));
      else
        for (; ct !== null; ) {
          switch (((t = ct), (o = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              if (
                (e & 4) !== 0 &&
                ((e = t.updateQueue), (e = e !== null ? e.events : null), e !== null)
              )
                for (l = 0; l < e.length; l++) ((s = e[l]), (s.ref.impl = s.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && o !== null) {
                ((e = void 0),
                  (l = t),
                  (s = o.memoizedProps),
                  (o = o.memoizedState),
                  (a = l.stateNode));
                try {
                  var ae = Cn(l.type, s);
                  ((e = a.getSnapshotBeforeUpdate(ae, o)),
                    (a.__reactInternalSnapshotBeforeUpdate = e));
                } catch (re) {
                  Be(l, l.return, re);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (((e = t.stateNode.containerInfo), (l = e.nodeType), l === 9)) Ao(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      Ao(e);
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
              if ((e & 1024) !== 0) throw Error(u(163));
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (ct = e));
            break;
          }
          ct = t.return;
        }
  }
  function Nm(e, t, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (Al(e, l), a & 4 && si(5, l));
        break;
      case 1:
        if ((Al(e, l), a & 4))
          if (((e = l.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (d) {
              Be(l, l.return, d);
            }
          else {
            var s = Cn(l.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(s, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (d) {
              Be(l, l.return, d);
            }
          }
        (a & 64 && bm(l), a & 512 && ui(l, l.return));
        break;
      case 3:
        if ((Al(e, l), a & 64 && ((e = l.updateQueue), e !== null))) {
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
            rd(e, t);
          } catch (d) {
            Be(l, l.return, d);
          }
        }
        break;
      case 27:
        t === null && a & 4 && Tm(l);
      case 26:
      case 5:
        (Al(e, l), t === null && a & 4 && km(l), a & 512 && ui(l, l.return));
        break;
      case 12:
        Al(e, l);
        break;
      case 31:
        (Al(e, l), a & 4 && Am(e, l));
        break;
      case 13:
        (Al(e, l),
          a & 4 && jm(e, l),
          a & 64 &&
            ((e = l.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((l = Ey.bind(null, l)), Xy(e, l)))));
        break;
      case 22:
        if (((a = l.memoizedState !== null || wl), !a)) {
          ((t = (t !== null && t.memoizedState !== null) || at), (s = wl));
          var o = at;
          ((wl = a),
            (at = t) && !o ? jl(e, l, (l.subtreeFlags & 8772) !== 0) : Al(e, l),
            (wl = s),
            (at = o));
        }
        break;
      case 30:
        break;
      default:
        Al(e, l);
    }
  }
  function wm(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), wm(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Ou(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var Ve = null,
    xt = !1;
  function Cl(e, t, l) {
    for (l = l.child; l !== null; ) (Cm(e, t, l), (l = l.sibling));
  }
  function Cm(e, t, l) {
    if (At && typeof At.onCommitFiberUnmount == 'function')
      try {
        At.onCommitFiberUnmount(Ma, l);
      } catch {}
    switch (l.tag) {
      case 26:
        (at || dl(l, t),
          Cl(e, t, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
        break;
      case 27:
        at || dl(l, t);
        var a = Ve,
          s = xt;
        (sn(l.type) && ((Ve = l.stateNode), (xt = !1)),
          Cl(e, t, l),
          _i(l.stateNode),
          (Ve = a),
          (xt = s));
        break;
      case 5:
        at || dl(l, t);
      case 6:
        if (((a = Ve), (s = xt), (Ve = null), Cl(e, t, l), (Ve = a), (xt = s), Ve !== null))
          if (xt)
            try {
              (Ve.nodeType === 9
                ? Ve.body
                : Ve.nodeName === 'HTML'
                  ? Ve.ownerDocument.body
                  : Ve
              ).removeChild(l.stateNode);
            } catch (o) {
              Be(l, t, o);
            }
          else
            try {
              Ve.removeChild(l.stateNode);
            } catch (o) {
              Be(l, t, o);
            }
        break;
      case 18:
        Ve !== null &&
          (xt
            ? ((e = Ve),
              bp(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                l.stateNode
              ),
              ga(e))
            : bp(Ve, l.stateNode));
        break;
      case 4:
        ((a = Ve),
          (s = xt),
          (Ve = l.stateNode.containerInfo),
          (xt = !0),
          Cl(e, t, l),
          (Ve = a),
          (xt = s));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Fl(2, l, t), at || Fl(4, l, t), Cl(e, t, l));
        break;
      case 1:
        (at ||
          (dl(l, t), (a = l.stateNode), typeof a.componentWillUnmount == 'function' && Sm(l, t, a)),
          Cl(e, t, l));
        break;
      case 21:
        Cl(e, t, l);
        break;
      case 22:
        ((at = (a = at) || l.memoizedState !== null), Cl(e, t, l), (at = a));
        break;
      default:
        Cl(e, t, l);
    }
  }
  function Am(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        ga(e);
      } catch (l) {
        Be(t, t.return, l);
      }
    }
  }
  function jm(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        ga(e);
      } catch (l) {
        Be(t, t.return, l);
      }
  }
  function gy(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new Em()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new Em()),
          t
        );
      default:
        throw Error(u(435, e.tag));
    }
  }
  function Ns(e, t) {
    var l = gy(e);
    t.forEach(function (a) {
      if (!l.has(a)) {
        l.add(a);
        var s = Ny.bind(null, e, a);
        a.then(s, s);
      }
    });
  }
  function Tt(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var s = l[a],
          o = e,
          d = t,
          _ = d;
        e: for (; _ !== null; ) {
          switch (_.tag) {
            case 27:
              if (sn(_.type)) {
                ((Ve = _.stateNode), (xt = !1));
                break e;
              }
              break;
            case 5:
              ((Ve = _.stateNode), (xt = !1));
              break e;
            case 3:
            case 4:
              ((Ve = _.stateNode.containerInfo), (xt = !0));
              break e;
          }
          _ = _.return;
        }
        if (Ve === null) throw Error(u(160));
        (Cm(o, d, s),
          (Ve = null),
          (xt = !1),
          (o = s.alternate),
          o !== null && (o.return = null),
          (s.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (Mm(t, e), (t = t.sibling));
  }
  var tl = null;
  function Mm(e, t) {
    var l = e.alternate,
      a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Tt(t, e), Et(e), a & 4 && (Fl(3, e, e.return), si(3, e), Fl(5, e, e.return)));
        break;
      case 1:
        (Tt(t, e),
          Et(e),
          a & 512 && (at || l === null || dl(l, l.return)),
          a & 64 &&
            wl &&
            ((e = e.updateQueue),
            e !== null &&
              ((a = e.callbacks),
              a !== null &&
                ((l = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = l === null ? a : l.concat(a))))));
        break;
      case 26:
        var s = tl;
        if ((Tt(t, e), Et(e), a & 512 && (at || l === null || dl(l, l.return)), a & 4)) {
          var o = l !== null ? l.memoizedState : null;
          if (((a = e.memoizedState), l === null))
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  ((a = e.type), (l = e.memoizedProps), (s = s.ownerDocument || s));
                  t: switch (a) {
                    case 'title':
                      ((o = s.getElementsByTagName('title')[0]),
                        (!o ||
                          o[Da] ||
                          o[dt] ||
                          o.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          o.hasAttribute('itemprop')) &&
                          ((o = s.createElement(a)),
                          s.head.insertBefore(o, s.querySelector('head > title'))),
                        _t(o, a, l),
                        (o[dt] = e),
                        ut(o),
                        (a = o));
                      break e;
                    case 'link':
                      var d = Mp('link', 'href', s).get(a + (l.href || ''));
                      if (d) {
                        for (var _ = 0; _ < d.length; _++)
                          if (
                            ((o = d[_]),
                            o.getAttribute('href') ===
                              (l.href == null || l.href === '' ? null : l.href) &&
                              o.getAttribute('rel') === (l.rel == null ? null : l.rel) &&
                              o.getAttribute('title') === (l.title == null ? null : l.title) &&
                              o.getAttribute('crossorigin') ===
                                (l.crossOrigin == null ? null : l.crossOrigin))
                          ) {
                            d.splice(_, 1);
                            break t;
                          }
                      }
                      ((o = s.createElement(a)), _t(o, a, l), s.head.appendChild(o));
                      break;
                    case 'meta':
                      if ((d = Mp('meta', 'content', s).get(a + (l.content || '')))) {
                        for (_ = 0; _ < d.length; _++)
                          if (
                            ((o = d[_]),
                            o.getAttribute('content') ===
                              (l.content == null ? null : '' + l.content) &&
                              o.getAttribute('name') === (l.name == null ? null : l.name) &&
                              o.getAttribute('property') ===
                                (l.property == null ? null : l.property) &&
                              o.getAttribute('http-equiv') ===
                                (l.httpEquiv == null ? null : l.httpEquiv) &&
                              o.getAttribute('charset') === (l.charSet == null ? null : l.charSet))
                          ) {
                            d.splice(_, 1);
                            break t;
                          }
                      }
                      ((o = s.createElement(a)), _t(o, a, l), s.head.appendChild(o));
                      break;
                    default:
                      throw Error(u(468, a));
                  }
                  ((o[dt] = e), ut(o), (a = o));
                }
                e.stateNode = a;
              } else Rp(s, e.type, e.stateNode);
            else e.stateNode = jp(s, a, e.memoizedProps);
          else
            o !== a
              ? (o === null
                  ? l.stateNode !== null && ((l = l.stateNode), l.parentNode.removeChild(l))
                  : o.count--,
                a === null ? Rp(s, e.type, e.stateNode) : jp(s, a, e.memoizedProps))
              : a === null && e.stateNode !== null && eo(e, e.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        (Tt(t, e),
          Et(e),
          a & 512 && (at || l === null || dl(l, l.return)),
          l !== null && a & 4 && eo(e, e.memoizedProps, l.memoizedProps));
        break;
      case 5:
        if ((Tt(t, e), Et(e), a & 512 && (at || l === null || dl(l, l.return)), e.flags & 32)) {
          s = e.stateNode;
          try {
            Hn(s, '');
          } catch (ae) {
            Be(e, e.return, ae);
          }
        }
        (a & 4 &&
          e.stateNode != null &&
          ((s = e.memoizedProps), eo(e, s, l !== null ? l.memoizedProps : s)),
          a & 1024 && (no = !0));
        break;
      case 6:
        if ((Tt(t, e), Et(e), a & 4)) {
          if (e.stateNode === null) throw Error(u(162));
          ((a = e.memoizedProps), (l = e.stateNode));
          try {
            l.nodeValue = a;
          } catch (ae) {
            Be(e, e.return, ae);
          }
        }
        break;
      case 3:
        if (
          ((Is = null),
          (s = tl),
          (tl = Hs(t.containerInfo)),
          Tt(t, e),
          (tl = s),
          Et(e),
          a & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            ga(t.containerInfo);
          } catch (ae) {
            Be(e, e.return, ae);
          }
        no && ((no = !1), Rm(e));
        break;
      case 4:
        ((a = tl), (tl = Hs(e.stateNode.containerInfo)), Tt(t, e), Et(e), (tl = a));
        break;
      case 12:
        (Tt(t, e), Et(e));
        break;
      case 31:
        (Tt(t, e),
          Et(e),
          a & 4 && ((a = e.updateQueue), a !== null && ((e.updateQueue = null), Ns(e, a))));
        break;
      case 13:
        (Tt(t, e),
          Et(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (l !== null && l.memoizedState !== null) &&
            (Cs = Ct()),
          a & 4 && ((a = e.updateQueue), a !== null && ((e.updateQueue = null), Ns(e, a))));
        break;
      case 22:
        s = e.memoizedState !== null;
        var x = l !== null && l.memoizedState !== null,
          D = wl,
          U = at;
        if (((wl = D || s), (at = U || x), Tt(t, e), (at = U), (wl = D), Et(e), a & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = s ? t._visibility & -2 : t._visibility | 1,
              s && (l === null || x || wl || at || An(e)),
              l = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                x = l = t;
                try {
                  if (((o = x.stateNode), s))
                    ((d = o.style),
                      typeof d.setProperty == 'function'
                        ? d.setProperty('display', 'none', 'important')
                        : (d.display = 'none'));
                  else {
                    _ = x.stateNode;
                    var Y = x.memoizedProps.style,
                      z = Y != null && Y.hasOwnProperty('display') ? Y.display : null;
                    _.style.display = z == null || typeof z == 'boolean' ? '' : ('' + z).trim();
                  }
                } catch (ae) {
                  Be(x, x.return, ae);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                x = t;
                try {
                  x.stateNode.nodeValue = s ? '' : x.memoizedProps;
                } catch (ae) {
                  Be(x, x.return, ae);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                x = t;
                try {
                  var B = x.stateNode;
                  s ? Sp(B, !0) : Sp(x.stateNode, !1);
                } catch (ae) {
                  Be(x, x.return, ae);
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
        a & 4 &&
          ((a = e.updateQueue),
          a !== null && ((l = a.retryQueue), l !== null && ((a.retryQueue = null), Ns(e, l))));
        break;
      case 19:
        (Tt(t, e),
          Et(e),
          a & 4 && ((a = e.updateQueue), a !== null && ((e.updateQueue = null), Ns(e, a))));
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
        for (var l, a = e.return; a !== null; ) {
          if (xm(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        if (l == null) throw Error(u(160));
        switch (l.tag) {
          case 27:
            var s = l.stateNode,
              o = to(e);
            Es(e, o, s);
            break;
          case 5:
            var d = l.stateNode;
            l.flags & 32 && (Hn(d, ''), (l.flags &= -33));
            var _ = to(e);
            Es(e, _, d);
            break;
          case 3:
          case 4:
            var x = l.stateNode.containerInfo,
              D = to(e);
            lo(e, D, x);
            break;
          default:
            throw Error(u(161));
        }
      } catch (U) {
        Be(e, e.return, U);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Rm(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (Rm(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling));
      }
  }
  function Al(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (Nm(e, t.alternate, t), (t = t.sibling));
  }
  function An(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Fl(4, t, t.return), An(t));
          break;
        case 1:
          dl(t, t.return);
          var l = t.stateNode;
          (typeof l.componentWillUnmount == 'function' && Sm(t, t.return, l), An(t));
          break;
        case 27:
          _i(t.stateNode);
        case 26:
        case 5:
          (dl(t, t.return), An(t));
          break;
        case 22:
          t.memoizedState === null && An(t);
          break;
        case 30:
          An(t);
          break;
        default:
          An(t);
      }
      e = e.sibling;
    }
  }
  function jl(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate,
        s = e,
        o = t,
        d = o.flags;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          (jl(s, o, l), si(4, o));
          break;
        case 1:
          if ((jl(s, o, l), (a = o), (s = a.stateNode), typeof s.componentDidMount == 'function'))
            try {
              s.componentDidMount();
            } catch (D) {
              Be(a, a.return, D);
            }
          if (((a = o), (s = a.updateQueue), s !== null)) {
            var _ = a.stateNode;
            try {
              var x = s.shared.hiddenCallbacks;
              if (x !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < x.length; s++) od(x[s], _);
            } catch (D) {
              Be(a, a.return, D);
            }
          }
          (l && d & 64 && bm(o), ui(o, o.return));
          break;
        case 27:
          Tm(o);
        case 26:
        case 5:
          (jl(s, o, l), l && a === null && d & 4 && km(o), ui(o, o.return));
          break;
        case 12:
          jl(s, o, l);
          break;
        case 31:
          (jl(s, o, l), l && d & 4 && Am(s, o));
          break;
        case 13:
          (jl(s, o, l), l && d & 4 && jm(s, o));
          break;
        case 22:
          (o.memoizedState === null && jl(s, o, l), ui(o, o.return));
          break;
        case 30:
          break;
        default:
          jl(s, o, l);
      }
      t = t.sibling;
    }
  }
  function ao(e, t) {
    var l = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (l = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== l && (e != null && e.refCount++, l != null && Qa(l)));
  }
  function io(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && Qa(e)));
  }
  function ll(e, t, l, a) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (Om(e, t, l, a), (t = t.sibling));
  }
  function Om(e, t, l, a) {
    var s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (ll(e, t, l, a), s & 2048 && si(9, t));
        break;
      case 1:
        ll(e, t, l, a);
        break;
      case 3:
        (ll(e, t, l, a),
          s & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && Qa(e))));
        break;
      case 12:
        if (s & 2048) {
          (ll(e, t, l, a), (e = t.stateNode));
          try {
            var o = t.memoizedProps,
              d = o.id,
              _ = o.onPostCommit;
            typeof _ == 'function' &&
              _(d, t.alternate === null ? 'mount' : 'update', e.passiveEffectDuration, -0);
          } catch (x) {
            Be(t, t.return, x);
          }
        } else ll(e, t, l, a);
        break;
      case 31:
        ll(e, t, l, a);
        break;
      case 13:
        ll(e, t, l, a);
        break;
      case 23:
        break;
      case 22:
        ((o = t.stateNode),
          (d = t.alternate),
          t.memoizedState !== null
            ? o._visibility & 2
              ? ll(e, t, l, a)
              : ci(e, t)
            : o._visibility & 2
              ? ll(e, t, l, a)
              : ((o._visibility |= 2), sa(e, t, l, a, (t.subtreeFlags & 10256) !== 0 || !1)),
          s & 2048 && ao(d, t));
        break;
      case 24:
        (ll(e, t, l, a), s & 2048 && io(t.alternate, t));
        break;
      default:
        ll(e, t, l, a);
    }
  }
  function sa(e, t, l, a, s) {
    for (s = s && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var o = e,
        d = t,
        _ = l,
        x = a,
        D = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          (sa(o, d, _, x, s), si(8, d));
          break;
        case 23:
          break;
        case 22:
          var U = d.stateNode;
          (d.memoizedState !== null
            ? U._visibility & 2
              ? sa(o, d, _, x, s)
              : ci(o, d)
            : ((U._visibility |= 2), sa(o, d, _, x, s)),
            s && D & 2048 && ao(d.alternate, d));
          break;
        case 24:
          (sa(o, d, _, x, s), s && D & 2048 && io(d.alternate, d));
          break;
        default:
          sa(o, d, _, x, s);
      }
      t = t.sibling;
    }
  }
  function ci(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e,
          a = t,
          s = a.flags;
        switch (a.tag) {
          case 22:
            (ci(l, a), s & 2048 && ao(a.alternate, a));
            break;
          case 24:
            (ci(l, a), s & 2048 && io(a.alternate, a));
            break;
          default:
            ci(l, a);
        }
        t = t.sibling;
      }
  }
  var oi = 8192;
  function ua(e, t, l) {
    if (e.subtreeFlags & oi) for (e = e.child; e !== null; ) (Dm(e, t, l), (e = e.sibling));
  }
  function Dm(e, t, l) {
    switch (e.tag) {
      case 26:
        (ua(e, t, l),
          e.flags & oi && e.memoizedState !== null && nv(l, tl, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        ua(e, t, l);
        break;
      case 3:
      case 4:
        var a = tl;
        ((tl = Hs(e.stateNode.containerInfo)), ua(e, t, l), (tl = a));
        break;
      case 22:
        e.memoizedState === null &&
          ((a = e.alternate),
          a !== null && a.memoizedState !== null
            ? ((a = oi), (oi = 16777216), ua(e, t, l), (oi = a))
            : ua(e, t, l));
        break;
      default:
        ua(e, t, l);
    }
  }
  function zm(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function ri(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          ((ct = a), Lm(a, e));
        }
      zm(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (Bm(e), (e = e.sibling));
  }
  function Bm(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (ri(e), e.flags & 2048 && Fl(9, e, e.return));
        break;
      case 3:
        ri(e);
        break;
      case 12:
        ri(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), ws(e))
          : ri(e);
        break;
      default:
        ri(e);
    }
  }
  function ws(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          ((ct = a), Lm(a, e));
        }
      zm(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (Fl(8, t, t.return), ws(t));
          break;
        case 22:
          ((l = t.stateNode), l._visibility & 2 && ((l._visibility &= -3), ws(t)));
          break;
        default:
          ws(t);
      }
      e = e.sibling;
    }
  }
  function Lm(e, t) {
    for (; ct !== null; ) {
      var l = ct;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Fl(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Qa(l.memoizedState.cache);
      }
      if (((a = l.child), a !== null)) ((a.return = l), (ct = a));
      else
        e: for (l = e; ct !== null; ) {
          a = ct;
          var s = a.sibling,
            o = a.return;
          if ((wm(a), a === l)) {
            ct = null;
            break e;
          }
          if (s !== null) {
            ((s.return = o), (ct = s));
            break e;
          }
          ct = o;
        }
    }
  }
  var yy = {
      getCacheForType: function (e) {
        var t = pt(tt),
          l = t.data.get(e);
        return (l === void 0 && ((l = e()), t.data.set(e, l)), l);
      },
      cacheSignal: function () {
        return pt(tt).controller.signal;
      },
    },
    vy = typeof WeakMap == 'function' ? WeakMap : Map,
    Re = 0,
    Ie = null,
    Se = null,
    Ee = 0,
    ze = 0,
    zt = null,
    Pl = !1,
    ca = !1,
    so = !1,
    Ml = 0,
    Je = 0,
    en = 0,
    jn = 0,
    uo = 0,
    Bt = 0,
    oa = 0,
    fi = null,
    Nt = null,
    co = !1,
    Cs = 0,
    qm = 0,
    As = 1 / 0,
    js = null,
    tn = null,
    it = 0,
    ln = null,
    ra = null,
    Rl = 0,
    oo = 0,
    ro = null,
    Um = null,
    di = 0,
    fo = null;
  function Lt() {
    return (Re & 2) !== 0 && Ee !== 0 ? Ee & -Ee : L.T !== null ? yo() : ef();
  }
  function Hm() {
    if (Bt === 0)
      if ((Ee & 536870912) === 0 || we) {
        var e = qi;
        ((qi <<= 1), (qi & 3932160) === 0 && (qi = 262144), (Bt = e));
      } else Bt = 536870912;
    return ((e = Ot.current), e !== null && (e.flags |= 32), Bt);
  }
  function wt(e, t, l) {
    (((e === Ie && (ze === 2 || ze === 9)) || e.cancelPendingCommit !== null) &&
      (fa(e, 0), nn(e, Ee, Bt, !1)),
      Oa(e, l),
      ((Re & 2) === 0 || e !== Ie) &&
        (e === Ie && ((Re & 2) === 0 && (jn |= l), Je === 4 && nn(e, Ee, Bt, !1)), ml(e)));
  }
  function Gm(e, t, l) {
    if ((Re & 6) !== 0) throw Error(u(327));
    var a = (!l && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Ra(e, t),
      s = a ? ky(e, t) : po(e, t, !0),
      o = a;
    do {
      if (s === 0) {
        ca && !a && nn(e, t, 0, !1);
        break;
      } else {
        if (((l = e.current.alternate), o && !by(l))) {
          ((s = po(e, t, !1)), (o = !1));
          continue;
        }
        if (s === 2) {
          if (((o = t), e.errorRecoveryDisabledLanes & o)) var d = 0;
          else
            ((d = e.pendingLanes & -536870913), (d = d !== 0 ? d : d & 536870912 ? 536870912 : 0));
          if (d !== 0) {
            t = d;
            e: {
              var _ = e;
              s = fi;
              var x = _.current.memoizedState.isDehydrated;
              if ((x && (fa(_, d).flags |= 256), (d = po(_, d, !1)), d !== 2)) {
                if (so && !x) {
                  ((_.errorRecoveryDisabledLanes |= o), (jn |= o), (s = 4));
                  break e;
                }
                ((o = Nt), (Nt = s), o !== null && (Nt === null ? (Nt = o) : Nt.push.apply(Nt, o)));
              }
              s = d;
            }
            if (((o = !1), s !== 2)) continue;
          }
        }
        if (s === 1) {
          (fa(e, 0), nn(e, t, 0, !0));
          break;
        }
        e: {
          switch (((a = e), (o = s), o)) {
            case 0:
            case 1:
              throw Error(u(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              nn(a, t, Bt, !Pl);
              break e;
            case 2:
              Nt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(u(329));
          }
          if ((t & 62914560) === t && ((s = Cs + 300 - Ct()), 10 < s)) {
            if ((nn(a, t, Bt, !Pl), Hi(a, 0, !0) !== 0)) break e;
            ((Rl = t),
              (a.timeoutHandle = yp(
                Im.bind(null, a, l, Nt, js, co, t, Bt, jn, oa, Pl, o, 'Throttled', -0, 0),
                s
              )));
            break e;
          }
          Im(a, l, Nt, js, co, t, Bt, jn, oa, Pl, o, null, -0, 0);
        }
      }
      break;
    } while (!0);
    ml(e);
  }
  function Im(e, t, l, a, s, o, d, _, x, D, U, Y, z, B) {
    if (((e.timeoutHandle = -1), (Y = t.subtreeFlags), Y & 8192 || (Y & 16785408) === 16785408)) {
      ((Y = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: gl,
      }),
        Dm(t, o, Y));
      var ae = (o & 62914560) === o ? Cs - Ct() : (o & 4194048) === o ? qm - Ct() : 0;
      if (((ae = av(Y, ae)), ae !== null)) {
        ((Rl = o),
          (e.cancelPendingCommit = ae(Jm.bind(null, e, t, o, l, a, s, d, _, x, U, Y, null, z, B))),
          nn(e, o, d, !D));
        return;
      }
    }
    Jm(e, t, o, l, a, s, d, _, x);
  }
  function by(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if (
        (l === 0 || l === 11 || l === 15) &&
        t.flags & 16384 &&
        ((l = t.updateQueue), l !== null && ((l = l.stores), l !== null))
      )
        for (var a = 0; a < l.length; a++) {
          var s = l[a],
            o = s.getSnapshot;
          s = s.value;
          try {
            if (!Mt(o(), s)) return !1;
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
  function nn(e, t, l, a) {
    ((t &= ~uo),
      (t &= ~jn),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      a && (e.warmLanes |= t),
      (a = e.expirationTimes));
    for (var s = t; 0 < s; ) {
      var o = 31 - jt(s),
        d = 1 << o;
      ((a[o] = -1), (s &= ~d));
    }
    l !== 0 && Wr(e, l, t);
  }
  function Ms() {
    return (Re & 6) === 0 ? (mi(0), !1) : !0;
  }
  function mo() {
    if (Se !== null) {
      if (ze === 0) var e = Se.return;
      else ((e = Se), (Sl = Sn = null), Cc(e), (ta = null), (Za = 0), (e = Se));
      for (; e !== null; ) (vm(e.alternate, e), (e = e.return));
      Se = null;
    }
  }
  function fa(e, t) {
    var l = e.timeoutHandle;
    (l !== -1 && ((e.timeoutHandle = -1), Hy(l)),
      (l = e.cancelPendingCommit),
      l !== null && ((e.cancelPendingCommit = null), l()),
      (Rl = 0),
      mo(),
      (Ie = e),
      (Se = l = vl(e.current, null)),
      (Ee = t),
      (ze = 0),
      (zt = null),
      (Pl = !1),
      (ca = Ra(e, t)),
      (so = !1),
      (oa = Bt = uo = jn = en = Je = 0),
      (Nt = fi = null),
      (co = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var s = 31 - jt(a),
          o = 1 << s;
        ((t |= e[s]), (a &= ~o));
      }
    return ((Ml = t), Fi(), l);
  }
  function $m(e, t) {
    ((ye = null),
      (L.H = ni),
      t === ea || t === ss
        ? ((t = id()), (ze = 3))
        : t === _c
          ? ((t = id()), (ze = 4))
          : (ze =
              t === Yc
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (zt = t),
      Se === null && ((Je = 1), bs(e, $t(t, e.current))));
  }
  function Ym() {
    var e = Ot.current;
    return e === null
      ? !0
      : (Ee & 4194048) === Ee
        ? Qt === null
        : (Ee & 62914560) === Ee || (Ee & 536870912) !== 0
          ? e === Qt
          : !1;
  }
  function Xm() {
    var e = L.H;
    return ((L.H = ni), e === null ? ni : e);
  }
  function Vm() {
    var e = L.A;
    return ((L.A = yy), e);
  }
  function Rs() {
    ((Je = 4),
      Pl || ((Ee & 4194048) !== Ee && Ot.current !== null) || (ca = !0),
      ((en & 134217727) === 0 && (jn & 134217727) === 0) || Ie === null || nn(Ie, Ee, Bt, !1));
  }
  function po(e, t, l) {
    var a = Re;
    Re |= 2;
    var s = Xm(),
      o = Vm();
    ((Ie !== e || Ee !== t) && ((js = null), fa(e, t)), (t = !1));
    var d = Je;
    e: do
      try {
        if (ze !== 0 && Se !== null) {
          var _ = Se,
            x = zt;
          switch (ze) {
            case 8:
              (mo(), (d = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Ot.current === null && (t = !0);
              var D = ze;
              if (((ze = 0), (zt = null), da(e, _, x, D), l && ca)) {
                d = 0;
                break e;
              }
              break;
            default:
              ((D = ze), (ze = 0), (zt = null), da(e, _, x, D));
          }
        }
        (Sy(), (d = Je));
        break;
      } catch (U) {
        $m(e, U);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (Sl = Sn = null),
      (Re = a),
      (L.H = s),
      (L.A = o),
      Se === null && ((Ie = null), (Ee = 0), Fi()),
      d
    );
  }
  function Sy() {
    for (; Se !== null; ) Qm(Se);
  }
  function ky(e, t) {
    var l = Re;
    Re |= 2;
    var a = Xm(),
      s = Vm();
    Ie !== e || Ee !== t ? ((js = null), (As = Ct() + 500), fa(e, t)) : (ca = Ra(e, t));
    e: do
      try {
        if (ze !== 0 && Se !== null) {
          t = Se;
          var o = zt;
          t: switch (ze) {
            case 1:
              ((ze = 0), (zt = null), da(e, t, o, 1));
              break;
            case 2:
            case 9:
              if (nd(o)) {
                ((ze = 0), (zt = null), Km(t));
                break;
              }
              ((t = function () {
                ((ze !== 2 && ze !== 9) || Ie !== e || (ze = 7), ml(e));
              }),
                o.then(t, t));
              break e;
            case 3:
              ze = 7;
              break e;
            case 4:
              ze = 5;
              break e;
            case 7:
              nd(o) ? ((ze = 0), (zt = null), Km(t)) : ((ze = 0), (zt = null), da(e, t, o, 7));
              break;
            case 5:
              var d = null;
              switch (Se.tag) {
                case 26:
                  d = Se.memoizedState;
                case 5:
                case 27:
                  var _ = Se;
                  if (d ? Op(d) : _.stateNode.complete) {
                    ((ze = 0), (zt = null));
                    var x = _.sibling;
                    if (x !== null) Se = x;
                    else {
                      var D = _.return;
                      D !== null ? ((Se = D), Os(D)) : (Se = null);
                    }
                    break t;
                  }
              }
              ((ze = 0), (zt = null), da(e, t, o, 5));
              break;
            case 6:
              ((ze = 0), (zt = null), da(e, t, o, 6));
              break;
            case 8:
              (mo(), (Je = 6));
              break e;
            default:
              throw Error(u(462));
          }
        }
        xy();
        break;
      } catch (U) {
        $m(e, U);
      }
    while (!0);
    return (
      (Sl = Sn = null),
      (L.H = a),
      (L.A = s),
      (Re = l),
      Se !== null ? 0 : ((Ie = null), (Ee = 0), Fi(), Je)
    );
  }
  function xy() {
    for (; Se !== null && !V_(); ) Qm(Se);
  }
  function Qm(e) {
    var t = gm(e.alternate, e, Ml);
    ((e.memoizedProps = e.pendingProps), t === null ? Os(e) : (Se = t));
  }
  function Km(e) {
    var t = e,
      l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = fm(l, t, t.pendingProps, t.type, void 0, Ee);
        break;
      case 11:
        t = fm(l, t, t.pendingProps, t.type.render, t.ref, Ee);
        break;
      case 5:
        Cc(t);
      default:
        (vm(l, t), (t = Se = Vf(t, Ml)), (t = gm(l, t, Ml)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? Os(e) : (Se = t));
  }
  function da(e, t, l, a) {
    ((Sl = Sn = null), Cc(t), (ta = null), (Za = 0));
    var s = t.return;
    try {
      if (fy(e, s, t, l, Ee)) {
        ((Je = 1), bs(e, $t(l, e.current)), (Se = null));
        return;
      }
    } catch (o) {
      if (s !== null) throw ((Se = s), o);
      ((Je = 1), bs(e, $t(l, e.current)), (Se = null));
      return;
    }
    t.flags & 32768
      ? (we || a === 1
          ? (e = !0)
          : ca || (Ee & 536870912) !== 0
            ? (e = !1)
            : ((Pl = e = !0),
              (a === 2 || a === 9 || a === 3 || a === 6) &&
                ((a = Ot.current), a !== null && a.tag === 13 && (a.flags |= 16384))),
        Zm(t, e))
      : Os(t);
  }
  function Os(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Zm(t, Pl);
        return;
      }
      e = t.return;
      var l = py(t.alternate, t, Ml);
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
    Je === 0 && (Je = 5);
  }
  function Zm(e, t) {
    do {
      var l = hy(e.alternate, e);
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
    ((Je = 6), (Se = null));
  }
  function Jm(e, t, l, a, s, o, d, _, x) {
    e.cancelPendingCommit = null;
    do Ds();
    while (it !== 0);
    if ((Re & 6) !== 0) throw Error(u(327));
    if (t !== null) {
      if (t === e.current) throw Error(u(177));
      if (
        ((o = t.lanes | t.childLanes),
        (o |= tc),
        lg(e, l, o, d, _, x),
        e === Ie && ((Se = Ie = null), (Ee = 0)),
        (ra = t),
        (ln = e),
        (Rl = l),
        (oo = o),
        (ro = s),
        (Um = a),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            wy(Bi, function () {
              return (tp(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (a = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || a)
      ) {
        ((a = L.T), (L.T = null), (s = K.p), (K.p = 2), (d = Re), (Re |= 4));
        try {
          _y(e, t, l);
        } finally {
          ((Re = d), (K.p = s), (L.T = a));
        }
      }
      ((it = 1), Wm(), Fm(), Pm());
    }
  }
  function Wm() {
    if (it === 1) {
      it = 0;
      var e = ln,
        t = ra,
        l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        ((l = L.T), (L.T = null));
        var a = K.p;
        K.p = 2;
        var s = Re;
        Re |= 4;
        try {
          Mm(t, e);
          var o = No,
            d = Lf(e.containerInfo),
            _ = o.focusedElem,
            x = o.selectionRange;
          if (d !== _ && _ && _.ownerDocument && Bf(_.ownerDocument.documentElement, _)) {
            if (x !== null && Ju(_)) {
              var D = x.start,
                U = x.end;
              if ((U === void 0 && (U = D), 'selectionStart' in _))
                ((_.selectionStart = D), (_.selectionEnd = Math.min(U, _.value.length)));
              else {
                var Y = _.ownerDocument || document,
                  z = (Y && Y.defaultView) || window;
                if (z.getSelection) {
                  var B = z.getSelection(),
                    ae = _.textContent.length,
                    re = Math.min(x.start, ae),
                    He = x.end === void 0 ? re : Math.min(x.end, ae);
                  !B.extend && re > He && ((d = He), (He = re), (re = d));
                  var M = zf(_, re),
                    N = zf(_, He);
                  if (
                    M &&
                    N &&
                    (B.rangeCount !== 1 ||
                      B.anchorNode !== M.node ||
                      B.anchorOffset !== M.offset ||
                      B.focusNode !== N.node ||
                      B.focusOffset !== N.offset)
                  ) {
                    var O = Y.createRange();
                    (O.setStart(M.node, M.offset),
                      B.removeAllRanges(),
                      re > He
                        ? (B.addRange(O), B.extend(N.node, N.offset))
                        : (O.setEnd(N.node, N.offset), B.addRange(O)));
                  }
                }
              }
            }
            for (Y = [], B = _; (B = B.parentNode); )
              B.nodeType === 1 && Y.push({ element: B, left: B.scrollLeft, top: B.scrollTop });
            for (typeof _.focus == 'function' && _.focus(), _ = 0; _ < Y.length; _++) {
              var $ = Y[_];
              (($.element.scrollLeft = $.left), ($.element.scrollTop = $.top));
            }
          }
          ((Vs = !!Eo), (No = Eo = null));
        } finally {
          ((Re = s), (K.p = a), (L.T = l));
        }
      }
      ((e.current = t), (it = 2));
    }
  }
  function Fm() {
    if (it === 2) {
      it = 0;
      var e = ln,
        t = ra,
        l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        ((l = L.T), (L.T = null));
        var a = K.p;
        K.p = 2;
        var s = Re;
        Re |= 4;
        try {
          Nm(e, t.alternate, t);
        } finally {
          ((Re = s), (K.p = a), (L.T = l));
        }
      }
      it = 3;
    }
  }
  function Pm() {
    if (it === 4 || it === 3) {
      ((it = 0), Q_());
      var e = ln,
        t = ra,
        l = Rl,
        a = Um;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (it = 5)
        : ((it = 0), (ra = ln = null), ep(e, e.pendingLanes));
      var s = e.pendingLanes;
      if (
        (s === 0 && (tn = null),
        Mu(l),
        (t = t.stateNode),
        At && typeof At.onCommitFiberRoot == 'function')
      )
        try {
          At.onCommitFiberRoot(Ma, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (a !== null) {
        ((t = L.T), (s = K.p), (K.p = 2), (L.T = null));
        try {
          for (var o = e.onRecoverableError, d = 0; d < a.length; d++) {
            var _ = a[d];
            o(_.value, { componentStack: _.stack });
          }
        } finally {
          ((L.T = t), (K.p = s));
        }
      }
      ((Rl & 3) !== 0 && Ds(),
        ml(e),
        (s = e.pendingLanes),
        (l & 261930) !== 0 && (s & 42) !== 0 ? (e === fo ? di++ : ((di = 0), (fo = e))) : (di = 0),
        mi(0));
    }
  }
  function ep(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), Qa(t)));
  }
  function Ds() {
    return (Wm(), Fm(), Pm(), tp());
  }
  function tp() {
    if (it !== 5) return !1;
    var e = ln,
      t = oo;
    oo = 0;
    var l = Mu(Rl),
      a = L.T,
      s = K.p;
    try {
      ((K.p = 32 > l ? 32 : l), (L.T = null), (l = ro), (ro = null));
      var o = ln,
        d = Rl;
      if (((it = 0), (ra = ln = null), (Rl = 0), (Re & 6) !== 0)) throw Error(u(331));
      var _ = Re;
      if (
        ((Re |= 4),
        Bm(o.current),
        Om(o, o.current, d, l),
        (Re = _),
        mi(0, !1),
        At && typeof At.onPostCommitFiberRoot == 'function')
      )
        try {
          At.onPostCommitFiberRoot(Ma, o);
        } catch {}
      return !0;
    } finally {
      ((K.p = s), (L.T = a), ep(e, t));
    }
  }
  function lp(e, t, l) {
    ((t = $t(l, t)),
      (t = $c(e.stateNode, t, 2)),
      (e = Zl(e, t, 2)),
      e !== null && (Oa(e, 2), ml(e)));
  }
  function Be(e, t, l) {
    if (e.tag === 3) lp(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          lp(t, e, l);
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof a.componentDidCatch == 'function' && (tn === null || !tn.has(a)))
          ) {
            ((e = $t(l, e)),
              (l = nm(2)),
              (a = Zl(t, l, 2)),
              a !== null && (am(l, a, t, e), Oa(a, 2), ml(a)));
            break;
          }
        }
        t = t.return;
      }
  }
  function ho(e, t, l) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new vy();
      var s = new Set();
      a.set(t, s);
    } else ((s = a.get(t)), s === void 0 && ((s = new Set()), a.set(t, s)));
    s.has(l) || ((so = !0), s.add(l), (e = Ty.bind(null, e, t, l)), t.then(e, e));
  }
  function Ty(e, t, l) {
    var a = e.pingCache;
    (a !== null && a.delete(t),
      (e.pingedLanes |= e.suspendedLanes & l),
      (e.warmLanes &= ~l),
      Ie === e &&
        (Ee & l) === l &&
        (Je === 4 || (Je === 3 && (Ee & 62914560) === Ee && 300 > Ct() - Cs)
          ? (Re & 2) === 0 && fa(e, 0)
          : (uo |= l),
        oa === Ee && (oa = 0)),
      ml(e));
  }
  function np(e, t) {
    (t === 0 && (t = Jr()), (e = yn(e, t)), e !== null && (Oa(e, t), ml(e)));
  }
  function Ey(e) {
    var t = e.memoizedState,
      l = 0;
    (t !== null && (l = t.retryLane), np(e, l));
  }
  function Ny(e, t) {
    var l = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var a = e.stateNode,
          s = e.memoizedState;
        s !== null && (l = s.retryLane);
        break;
      case 19:
        a = e.stateNode;
        break;
      case 22:
        a = e.stateNode._retryCache;
        break;
      default:
        throw Error(u(314));
    }
    (a !== null && a.delete(t), np(e, l));
  }
  function wy(e, t) {
    return wu(e, t);
  }
  var zs = null,
    ma = null,
    _o = !1,
    Bs = !1,
    go = !1,
    an = 0;
  function ml(e) {
    (e !== ma && e.next === null && (ma === null ? (zs = ma = e) : (ma = ma.next = e)),
      (Bs = !0),
      _o || ((_o = !0), Ay()));
  }
  function mi(e, t) {
    if (!go && Bs) {
      go = !0;
      do
        for (var l = !1, a = zs; a !== null; ) {
          if (e !== 0) {
            var s = a.pendingLanes;
            if (s === 0) var o = 0;
            else {
              var d = a.suspendedLanes,
                _ = a.pingedLanes;
              ((o = (1 << (31 - jt(42 | e) + 1)) - 1),
                (o &= s & ~(d & ~_)),
                (o = o & 201326741 ? (o & 201326741) | 1 : o ? o | 2 : 0));
            }
            o !== 0 && ((l = !0), up(a, o));
          } else
            ((o = Ee),
              (o = Hi(
                a,
                a === Ie ? o : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1
              )),
              (o & 3) === 0 || Ra(a, o) || ((l = !0), up(a, o)));
          a = a.next;
        }
      while (l);
      go = !1;
    }
  }
  function Cy() {
    ap();
  }
  function ap() {
    Bs = _o = !1;
    var e = 0;
    an !== 0 && Uy() && (e = an);
    for (var t = Ct(), l = null, a = zs; a !== null; ) {
      var s = a.next,
        o = ip(a, t);
      (o === 0
        ? ((a.next = null), l === null ? (zs = s) : (l.next = s), s === null && (ma = l))
        : ((l = a), (e !== 0 || (o & 3) !== 0) && (Bs = !0)),
        (a = s));
    }
    ((it !== 0 && it !== 5) || mi(e), an !== 0 && (an = 0));
  }
  function ip(e, t) {
    for (
      var l = e.suspendedLanes,
        a = e.pingedLanes,
        s = e.expirationTimes,
        o = e.pendingLanes & -62914561;
      0 < o;
    ) {
      var d = 31 - jt(o),
        _ = 1 << d,
        x = s[d];
      (x === -1
        ? ((_ & l) === 0 || (_ & a) !== 0) && (s[d] = tg(_, t))
        : x <= t && (e.expiredLanes |= _),
        (o &= ~_));
    }
    if (
      ((t = Ie),
      (l = Ee),
      (l = Hi(e, e === t ? l : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (a = e.callbackNode),
      l === 0 || (e === t && (ze === 2 || ze === 9)) || e.cancelPendingCommit !== null)
    )
      return (a !== null && a !== null && Cu(a), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((l & 3) === 0 || Ra(e, l)) {
      if (((t = l & -l), t === e.callbackPriority)) return t;
      switch ((a !== null && Cu(a), Mu(l))) {
        case 2:
        case 8:
          l = Kr;
          break;
        case 32:
          l = Bi;
          break;
        case 268435456:
          l = Zr;
          break;
        default:
          l = Bi;
      }
      return (
        (a = sp.bind(null, e)),
        (l = wu(l, a)),
        (e.callbackPriority = t),
        (e.callbackNode = l),
        t
      );
    }
    return (
      a !== null && a !== null && Cu(a),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function sp(e, t) {
    if (it !== 0 && it !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var l = e.callbackNode;
    if (Ds() && e.callbackNode !== l) return null;
    var a = Ee;
    return (
      (a = Hi(e, e === Ie ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      a === 0
        ? null
        : (Gm(e, a, t),
          ip(e, Ct()),
          e.callbackNode != null && e.callbackNode === l ? sp.bind(null, e) : null)
    );
  }
  function up(e, t) {
    if (Ds()) return null;
    Gm(e, t, !0);
  }
  function Ay() {
    Gy(function () {
      (Re & 6) !== 0 ? wu(Qr, Cy) : ap();
    });
  }
  function yo() {
    if (an === 0) {
      var e = Fn;
      (e === 0 && ((e = Li), (Li <<= 1), (Li & 261888) === 0 && (Li = 256)), (an = e));
    }
    return an;
  }
  function cp(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : Yi('' + e);
  }
  function op(e, t) {
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
  function jy(e, t, l, a, s) {
    if (t === 'submit' && l && l.stateNode === s) {
      var o = cp((s[St] || null).action),
        d = a.submitter;
      d &&
        ((t = (t = d[St] || null) ? cp(t.formAction) : d.getAttribute('formAction')),
        t !== null && ((o = t), (d = null)));
      var _ = new Ki('action', 'action', null, a, s);
      e.push({
        event: _,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (an !== 0) {
                  var x = d ? op(s, d) : new FormData(s);
                  Lc(l, { pending: !0, data: x, method: s.method, action: o }, null, x);
                }
              } else
                typeof o == 'function' &&
                  (_.preventDefault(),
                  (x = d ? op(s, d) : new FormData(s)),
                  Lc(l, { pending: !0, data: x, method: s.method, action: o }, o, x));
            },
            currentTarget: s,
          },
        ],
      });
    }
  }
  for (var vo = 0; vo < ec.length; vo++) {
    var bo = ec[vo],
      My = bo.toLowerCase(),
      Ry = bo[0].toUpperCase() + bo.slice(1);
    el(My, 'on' + Ry);
  }
  (el(Hf, 'onAnimationEnd'),
    el(Gf, 'onAnimationIteration'),
    el(If, 'onAnimationStart'),
    el('dblclick', 'onDoubleClick'),
    el('focusin', 'onFocus'),
    el('focusout', 'onBlur'),
    el(Kg, 'onTransitionRun'),
    el(Zg, 'onTransitionStart'),
    el(Jg, 'onTransitionCancel'),
    el($f, 'onTransitionEnd'),
    qn('onMouseEnter', ['mouseout', 'mouseover']),
    qn('onMouseLeave', ['mouseout', 'mouseover']),
    qn('onPointerEnter', ['pointerout', 'pointerover']),
    qn('onPointerLeave', ['pointerout', 'pointerover']),
    pn('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    pn(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    pn('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    pn('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    pn(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    pn(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var pi =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    Oy = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(pi)
    );
  function rp(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var a = e[l],
        s = a.event;
      a = a.listeners;
      e: {
        var o = void 0;
        if (t)
          for (var d = a.length - 1; 0 <= d; d--) {
            var _ = a[d],
              x = _.instance,
              D = _.currentTarget;
            if (((_ = _.listener), x !== o && s.isPropagationStopped())) break e;
            ((o = _), (s.currentTarget = D));
            try {
              o(s);
            } catch (U) {
              Wi(U);
            }
            ((s.currentTarget = null), (o = x));
          }
        else
          for (d = 0; d < a.length; d++) {
            if (
              ((_ = a[d]),
              (x = _.instance),
              (D = _.currentTarget),
              (_ = _.listener),
              x !== o && s.isPropagationStopped())
            )
              break e;
            ((o = _), (s.currentTarget = D));
            try {
              o(s);
            } catch (U) {
              Wi(U);
            }
            ((s.currentTarget = null), (o = x));
          }
      }
    }
  }
  function ke(e, t) {
    var l = t[Ru];
    l === void 0 && (l = t[Ru] = new Set());
    var a = e + '__bubble';
    l.has(a) || (fp(t, e, 2, !1), l.add(a));
  }
  function So(e, t, l) {
    var a = 0;
    (t && (a |= 4), fp(l, e, a, t));
  }
  var Ls = '_reactListening' + Math.random().toString(36).slice(2);
  function ko(e) {
    if (!e[Ls]) {
      ((e[Ls] = !0),
        nf.forEach(function (l) {
          l !== 'selectionchange' && (Oy.has(l) || So(l, !1, e), So(l, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Ls] || ((t[Ls] = !0), So('selectionchange', !1, t));
    }
  }
  function fp(e, t, l, a) {
    switch (Hp(t)) {
      case 2:
        var s = uv;
        break;
      case 8:
        s = cv;
        break;
      default:
        s = Lo;
    }
    ((l = s.bind(null, t, l, e)),
      (s = void 0),
      !Gu || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (s = !0),
      a
        ? s !== void 0
          ? e.addEventListener(t, l, { capture: !0, passive: s })
          : e.addEventListener(t, l, !0)
        : s !== void 0
          ? e.addEventListener(t, l, { passive: s })
          : e.addEventListener(t, l, !1));
  }
  function xo(e, t, l, a, s) {
    var o = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (;;) {
        if (a === null) return;
        var d = a.tag;
        if (d === 3 || d === 4) {
          var _ = a.stateNode.containerInfo;
          if (_ === s) break;
          if (d === 4)
            for (d = a.return; d !== null; ) {
              var x = d.tag;
              if ((x === 3 || x === 4) && d.stateNode.containerInfo === s) return;
              d = d.return;
            }
          for (; _ !== null; ) {
            if (((d = zn(_)), d === null)) return;
            if (((x = d.tag), x === 5 || x === 6 || x === 26 || x === 27)) {
              a = o = d;
              continue e;
            }
            _ = _.parentNode;
          }
        }
        a = a.return;
      }
    _f(function () {
      var D = o,
        U = Uu(l),
        Y = [];
      e: {
        var z = Yf.get(e);
        if (z !== void 0) {
          var B = Ki,
            ae = e;
          switch (e) {
            case 'keypress':
              if (Vi(l) === 0) break e;
            case 'keydown':
            case 'keyup':
              B = Ng;
              break;
            case 'focusin':
              ((ae = 'focus'), (B = Xu));
              break;
            case 'focusout':
              ((ae = 'blur'), (B = Xu));
              break;
            case 'beforeblur':
            case 'afterblur':
              B = Xu;
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
              B = vf;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              B = pg;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              B = Ag;
              break;
            case Hf:
            case Gf:
            case If:
              B = gg;
              break;
            case $f:
              B = Mg;
              break;
            case 'scroll':
            case 'scrollend':
              B = dg;
              break;
            case 'wheel':
              B = Og;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              B = vg;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              B = Sf;
              break;
            case 'toggle':
            case 'beforetoggle':
              B = zg;
          }
          var re = (t & 4) !== 0,
            He = !re && (e === 'scroll' || e === 'scrollend'),
            M = re ? (z !== null ? z + 'Capture' : null) : z;
          re = [];
          for (var N = D, O; N !== null; ) {
            var $ = N;
            if (
              ((O = $.stateNode),
              ($ = $.tag),
              ($ !== 5 && $ !== 26 && $ !== 27) ||
                O === null ||
                M === null ||
                (($ = Ba(N, M)), $ != null && re.push(hi(N, $, O))),
              He)
            )
              break;
            N = N.return;
          }
          0 < re.length && ((z = new B(z, ae, null, l, U)), Y.push({ event: z, listeners: re }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((z = e === 'mouseover' || e === 'pointerover'),
            (B = e === 'mouseout' || e === 'pointerout'),
            z && l !== qu && (ae = l.relatedTarget || l.fromElement) && (zn(ae) || ae[Dn]))
          )
            break e;
          if (
            (B || z) &&
            ((z =
              U.window === U
                ? U
                : (z = U.ownerDocument)
                  ? z.defaultView || z.parentWindow
                  : window),
            B
              ? ((ae = l.relatedTarget || l.toElement),
                (B = D),
                (ae = ae ? zn(ae) : null),
                ae !== null &&
                  ((He = f(ae)), (re = ae.tag), ae !== He || (re !== 5 && re !== 27 && re !== 6)) &&
                  (ae = null))
              : ((B = null), (ae = D)),
            B !== ae)
          ) {
            if (
              ((re = vf),
              ($ = 'onMouseLeave'),
              (M = 'onMouseEnter'),
              (N = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((re = Sf), ($ = 'onPointerLeave'), (M = 'onPointerEnter'), (N = 'pointer')),
              (He = B == null ? z : za(B)),
              (O = ae == null ? z : za(ae)),
              (z = new re($, N + 'leave', B, l, U)),
              (z.target = He),
              (z.relatedTarget = O),
              ($ = null),
              zn(U) === D &&
                ((re = new re(M, N + 'enter', ae, l, U)),
                (re.target = O),
                (re.relatedTarget = He),
                ($ = re)),
              (He = $),
              B && ae)
            )
              t: {
                for (re = Dy, M = B, N = ae, O = 0, $ = M; $; $ = re($)) O++;
                $ = 0;
                for (var ue = N; ue; ue = re(ue)) $++;
                for (; 0 < O - $; ) ((M = re(M)), O--);
                for (; 0 < $ - O; ) ((N = re(N)), $--);
                for (; O--; ) {
                  if (M === N || (N !== null && M === N.alternate)) {
                    re = M;
                    break t;
                  }
                  ((M = re(M)), (N = re(N)));
                }
                re = null;
              }
            else re = null;
            (B !== null && dp(Y, z, B, re, !1),
              ae !== null && He !== null && dp(Y, He, ae, re, !0));
          }
        }
        e: {
          if (
            ((z = D ? za(D) : window),
            (B = z.nodeName && z.nodeName.toLowerCase()),
            B === 'select' || (B === 'input' && z.type === 'file'))
          )
            var Ae = Af;
          else if (wf(z))
            if (jf) Ae = Xg;
            else {
              Ae = $g;
              var ie = Ig;
            }
          else
            ((B = z.nodeName),
              !B || B.toLowerCase() !== 'input' || (z.type !== 'checkbox' && z.type !== 'radio')
                ? D && Lu(D.elementType) && (Ae = Af)
                : (Ae = Yg));
          if (Ae && (Ae = Ae(e, D))) {
            Cf(Y, Ae, l, U);
            break e;
          }
          (ie && ie(e, z, D),
            e === 'focusout' &&
              D &&
              z.type === 'number' &&
              D.memoizedProps.value != null &&
              Bu(z, 'number', z.value));
        }
        switch (((ie = D ? za(D) : window), e)) {
          case 'focusin':
            (wf(ie) || ie.contentEditable === 'true') && ((Yn = ie), (Wu = D), (Ya = null));
            break;
          case 'focusout':
            Ya = Wu = Yn = null;
            break;
          case 'mousedown':
            Fu = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((Fu = !1), qf(Y, l, U));
            break;
          case 'selectionchange':
            if (Qg) break;
          case 'keydown':
          case 'keyup':
            qf(Y, l, U);
        }
        var ve;
        if (Qu)
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
          $n
            ? Ef(e, l) && (Ne = 'onCompositionEnd')
            : e === 'keydown' && l.keyCode === 229 && (Ne = 'onCompositionStart');
        (Ne &&
          (kf &&
            l.locale !== 'ko' &&
            ($n || Ne !== 'onCompositionStart'
              ? Ne === 'onCompositionEnd' && $n && (ve = gf())
              : ((Il = U), (Iu = 'value' in Il ? Il.value : Il.textContent), ($n = !0))),
          (ie = qs(D, Ne)),
          0 < ie.length &&
            ((Ne = new bf(Ne, e, null, l, U)),
            Y.push({ event: Ne, listeners: ie }),
            ve ? (Ne.data = ve) : ((ve = Nf(l)), ve !== null && (Ne.data = ve)))),
          (ve = Lg ? qg(e, l) : Ug(e, l)) &&
            ((Ne = qs(D, 'onBeforeInput')),
            0 < Ne.length &&
              ((ie = new bf('onBeforeInput', 'beforeinput', null, l, U)),
              Y.push({ event: ie, listeners: Ne }),
              (ie.data = ve))),
          jy(Y, e, D, l, U));
      }
      rp(Y, t);
    });
  }
  function hi(e, t, l) {
    return { instance: e, listener: t, currentTarget: l };
  }
  function qs(e, t) {
    for (var l = t + 'Capture', a = []; e !== null; ) {
      var s = e,
        o = s.stateNode;
      if (
        ((s = s.tag),
        (s !== 5 && s !== 26 && s !== 27) ||
          o === null ||
          ((s = Ba(e, l)),
          s != null && a.unshift(hi(e, s, o)),
          (s = Ba(e, t)),
          s != null && a.push(hi(e, s, o))),
        e.tag === 3)
      )
        return a;
      e = e.return;
    }
    return [];
  }
  function Dy(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function dp(e, t, l, a, s) {
    for (var o = t._reactName, d = []; l !== null && l !== a; ) {
      var _ = l,
        x = _.alternate,
        D = _.stateNode;
      if (((_ = _.tag), x !== null && x === a)) break;
      ((_ !== 5 && _ !== 26 && _ !== 27) ||
        D === null ||
        ((x = D),
        s
          ? ((D = Ba(l, o)), D != null && d.unshift(hi(l, D, x)))
          : s || ((D = Ba(l, o)), D != null && d.push(hi(l, D, x)))),
        (l = l.return));
    }
    d.length !== 0 && e.push({ event: t, listeners: d });
  }
  var zy = /\r\n?/g,
    By = /\u0000|\uFFFD/g;
  function mp(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        zy,
        `
`
      )
      .replace(By, '');
  }
  function pp(e, t) {
    return ((t = mp(t)), mp(e) === t);
  }
  function Ue(e, t, l, a, s, o) {
    switch (l) {
      case 'children':
        typeof a == 'string'
          ? t === 'body' || (t === 'textarea' && a === '') || Hn(e, a)
          : (typeof a == 'number' || typeof a == 'bigint') && t !== 'body' && Hn(e, '' + a);
        break;
      case 'className':
        Ii(e, 'class', a);
        break;
      case 'tabIndex':
        Ii(e, 'tabindex', a);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Ii(e, l, a);
        break;
      case 'style':
        pf(e, a, o);
        break;
      case 'data':
        if (t !== 'object') {
          Ii(e, 'data', a);
          break;
        }
      case 'src':
      case 'href':
        if (a === '' && (t !== 'a' || l !== 'href')) {
          e.removeAttribute(l);
          break;
        }
        if (a == null || typeof a == 'function' || typeof a == 'symbol' || typeof a == 'boolean') {
          e.removeAttribute(l);
          break;
        }
        ((a = Yi('' + a)), e.setAttribute(l, a));
        break;
      case 'action':
      case 'formAction':
        if (typeof a == 'function') {
          e.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof o == 'function' &&
            (l === 'formAction'
              ? (t !== 'input' && Ue(e, t, 'name', s.name, s, null),
                Ue(e, t, 'formEncType', s.formEncType, s, null),
                Ue(e, t, 'formMethod', s.formMethod, s, null),
                Ue(e, t, 'formTarget', s.formTarget, s, null))
              : (Ue(e, t, 'encType', s.encType, s, null),
                Ue(e, t, 'method', s.method, s, null),
                Ue(e, t, 'target', s.target, s, null)));
        if (a == null || typeof a == 'symbol' || typeof a == 'boolean') {
          e.removeAttribute(l);
          break;
        }
        ((a = Yi('' + a)), e.setAttribute(l, a));
        break;
      case 'onClick':
        a != null && (e.onclick = gl);
        break;
      case 'onScroll':
        a != null && ke('scroll', e);
        break;
      case 'onScrollEnd':
        a != null && ke('scrollend', e);
        break;
      case 'dangerouslySetInnerHTML':
        if (a != null) {
          if (typeof a != 'object' || !('__html' in a)) throw Error(u(61));
          if (((l = a.__html), l != null)) {
            if (s.children != null) throw Error(u(60));
            e.innerHTML = l;
          }
        }
        break;
      case 'multiple':
        e.multiple = a && typeof a != 'function' && typeof a != 'symbol';
        break;
      case 'muted':
        e.muted = a && typeof a != 'function' && typeof a != 'symbol';
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
          e.removeAttribute('xlink:href');
          break;
        }
        ((l = Yi('' + a)), e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', l));
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
          ? e.setAttribute(l, '' + a)
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
        a && typeof a != 'function' && typeof a != 'symbol'
          ? e.setAttribute(l, '')
          : e.removeAttribute(l);
        break;
      case 'capture':
      case 'download':
        a === !0
          ? e.setAttribute(l, '')
          : a !== !1 && a != null && typeof a != 'function' && typeof a != 'symbol'
            ? e.setAttribute(l, a)
            : e.removeAttribute(l);
        break;
      case 'cols':
      case 'rows':
      case 'size':
      case 'span':
        a != null && typeof a != 'function' && typeof a != 'symbol' && !isNaN(a) && 1 <= a
          ? e.setAttribute(l, a)
          : e.removeAttribute(l);
        break;
      case 'rowSpan':
      case 'start':
        a == null || typeof a == 'function' || typeof a == 'symbol' || isNaN(a)
          ? e.removeAttribute(l)
          : e.setAttribute(l, a);
        break;
      case 'popover':
        (ke('beforetoggle', e), ke('toggle', e), Gi(e, 'popover', a));
        break;
      case 'xlinkActuate':
        _l(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', a);
        break;
      case 'xlinkArcrole':
        _l(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', a);
        break;
      case 'xlinkRole':
        _l(e, 'http://www.w3.org/1999/xlink', 'xlink:role', a);
        break;
      case 'xlinkShow':
        _l(e, 'http://www.w3.org/1999/xlink', 'xlink:show', a);
        break;
      case 'xlinkTitle':
        _l(e, 'http://www.w3.org/1999/xlink', 'xlink:title', a);
        break;
      case 'xlinkType':
        _l(e, 'http://www.w3.org/1999/xlink', 'xlink:type', a);
        break;
      case 'xmlBase':
        _l(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', a);
        break;
      case 'xmlLang':
        _l(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', a);
        break;
      case 'xmlSpace':
        _l(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', a);
        break;
      case 'is':
        Gi(e, 'is', a);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < l.length) || (l[0] !== 'o' && l[0] !== 'O') || (l[1] !== 'n' && l[1] !== 'N')) &&
          ((l = rg.get(l) || l), Gi(e, l, a));
    }
  }
  function To(e, t, l, a, s, o) {
    switch (l) {
      case 'style':
        pf(e, a, o);
        break;
      case 'dangerouslySetInnerHTML':
        if (a != null) {
          if (typeof a != 'object' || !('__html' in a)) throw Error(u(61));
          if (((l = a.__html), l != null)) {
            if (s.children != null) throw Error(u(60));
            e.innerHTML = l;
          }
        }
        break;
      case 'children':
        typeof a == 'string'
          ? Hn(e, a)
          : (typeof a == 'number' || typeof a == 'bigint') && Hn(e, '' + a);
        break;
      case 'onScroll':
        a != null && ke('scroll', e);
        break;
      case 'onScrollEnd':
        a != null && ke('scrollend', e);
        break;
      case 'onClick':
        a != null && (e.onclick = gl);
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
        if (!af.hasOwnProperty(l))
          e: {
            if (
              l[0] === 'o' &&
              l[1] === 'n' &&
              ((s = l.endsWith('Capture')),
              (t = l.slice(2, s ? l.length - 7 : void 0)),
              (o = e[St] || null),
              (o = o != null ? o[l] : null),
              typeof o == 'function' && e.removeEventListener(t, o, s),
              typeof a == 'function')
            ) {
              (typeof o != 'function' &&
                o !== null &&
                (l in e ? (e[l] = null) : e.hasAttribute(l) && e.removeAttribute(l)),
                e.addEventListener(t, a, s));
              break e;
            }
            l in e ? (e[l] = a) : a === !0 ? e.setAttribute(l, '') : Gi(e, l, a);
          }
    }
  }
  function _t(e, t, l) {
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
        (ke('error', e), ke('load', e));
        var a = !1,
          s = !1,
          o;
        for (o in l)
          if (l.hasOwnProperty(o)) {
            var d = l[o];
            if (d != null)
              switch (o) {
                case 'src':
                  a = !0;
                  break;
                case 'srcSet':
                  s = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(u(137, t));
                default:
                  Ue(e, t, o, d, l, null);
              }
          }
        (s && Ue(e, t, 'srcSet', l.srcSet, l, null), a && Ue(e, t, 'src', l.src, l, null));
        return;
      case 'input':
        ke('invalid', e);
        var _ = (o = d = s = null),
          x = null,
          D = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var U = l[a];
            if (U != null)
              switch (a) {
                case 'name':
                  s = U;
                  break;
                case 'type':
                  d = U;
                  break;
                case 'checked':
                  x = U;
                  break;
                case 'defaultChecked':
                  D = U;
                  break;
                case 'value':
                  o = U;
                  break;
                case 'defaultValue':
                  _ = U;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (U != null) throw Error(u(137, t));
                  break;
                default:
                  Ue(e, t, a, U, l, null);
              }
          }
        rf(e, o, _, x, D, d, s, !1);
        return;
      case 'select':
        (ke('invalid', e), (a = d = o = null));
        for (s in l)
          if (l.hasOwnProperty(s) && ((_ = l[s]), _ != null))
            switch (s) {
              case 'value':
                o = _;
                break;
              case 'defaultValue':
                d = _;
                break;
              case 'multiple':
                a = _;
              default:
                Ue(e, t, s, _, l, null);
            }
        ((t = o),
          (l = d),
          (e.multiple = !!a),
          t != null ? Un(e, !!a, t, !1) : l != null && Un(e, !!a, l, !0));
        return;
      case 'textarea':
        (ke('invalid', e), (o = s = a = null));
        for (d in l)
          if (l.hasOwnProperty(d) && ((_ = l[d]), _ != null))
            switch (d) {
              case 'value':
                a = _;
                break;
              case 'defaultValue':
                s = _;
                break;
              case 'children':
                o = _;
                break;
              case 'dangerouslySetInnerHTML':
                if (_ != null) throw Error(u(91));
                break;
              default:
                Ue(e, t, d, _, l, null);
            }
        df(e, a, s, o);
        return;
      case 'option':
        for (x in l)
          if (l.hasOwnProperty(x) && ((a = l[x]), a != null))
            switch (x) {
              case 'selected':
                e.selected = a && typeof a != 'function' && typeof a != 'symbol';
                break;
              default:
                Ue(e, t, x, a, l, null);
            }
        return;
      case 'dialog':
        (ke('beforetoggle', e), ke('toggle', e), ke('cancel', e), ke('close', e));
        break;
      case 'iframe':
      case 'object':
        ke('load', e);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < pi.length; a++) ke(pi[a], e);
        break;
      case 'image':
        (ke('error', e), ke('load', e));
        break;
      case 'details':
        ke('toggle', e);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (ke('error', e), ke('load', e));
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
        for (D in l)
          if (l.hasOwnProperty(D) && ((a = l[D]), a != null))
            switch (D) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(u(137, t));
              default:
                Ue(e, t, D, a, l, null);
            }
        return;
      default:
        if (Lu(t)) {
          for (U in l)
            l.hasOwnProperty(U) && ((a = l[U]), a !== void 0 && To(e, t, U, a, l, void 0));
          return;
        }
    }
    for (_ in l) l.hasOwnProperty(_) && ((a = l[_]), a != null && Ue(e, t, _, a, l, null));
  }
  function Ly(e, t, l, a) {
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
          o = null,
          d = null,
          _ = null,
          x = null,
          D = null,
          U = null;
        for (B in l) {
          var Y = l[B];
          if (l.hasOwnProperty(B) && Y != null)
            switch (B) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                x = Y;
              default:
                a.hasOwnProperty(B) || Ue(e, t, B, null, a, Y);
            }
        }
        for (var z in a) {
          var B = a[z];
          if (((Y = l[z]), a.hasOwnProperty(z) && (B != null || Y != null)))
            switch (z) {
              case 'type':
                o = B;
                break;
              case 'name':
                s = B;
                break;
              case 'checked':
                D = B;
                break;
              case 'defaultChecked':
                U = B;
                break;
              case 'value':
                d = B;
                break;
              case 'defaultValue':
                _ = B;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (B != null) throw Error(u(137, t));
                break;
              default:
                B !== Y && Ue(e, t, z, B, a, Y);
            }
        }
        zu(e, d, _, x, D, U, o, s);
        return;
      case 'select':
        B = d = _ = z = null;
        for (o in l)
          if (((x = l[o]), l.hasOwnProperty(o) && x != null))
            switch (o) {
              case 'value':
                break;
              case 'multiple':
                B = x;
              default:
                a.hasOwnProperty(o) || Ue(e, t, o, null, a, x);
            }
        for (s in a)
          if (((o = a[s]), (x = l[s]), a.hasOwnProperty(s) && (o != null || x != null)))
            switch (s) {
              case 'value':
                z = o;
                break;
              case 'defaultValue':
                _ = o;
                break;
              case 'multiple':
                d = o;
              default:
                o !== x && Ue(e, t, s, o, a, x);
            }
        ((t = _),
          (l = d),
          (a = B),
          z != null
            ? Un(e, !!l, z, !1)
            : !!a != !!l && (t != null ? Un(e, !!l, t, !0) : Un(e, !!l, l ? [] : '', !1)));
        return;
      case 'textarea':
        B = z = null;
        for (_ in l)
          if (((s = l[_]), l.hasOwnProperty(_) && s != null && !a.hasOwnProperty(_)))
            switch (_) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                Ue(e, t, _, null, a, s);
            }
        for (d in a)
          if (((s = a[d]), (o = l[d]), a.hasOwnProperty(d) && (s != null || o != null)))
            switch (d) {
              case 'value':
                z = s;
                break;
              case 'defaultValue':
                B = s;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (s != null) throw Error(u(91));
                break;
              default:
                s !== o && Ue(e, t, d, s, a, o);
            }
        ff(e, z, B);
        return;
      case 'option':
        for (var ae in l)
          if (((z = l[ae]), l.hasOwnProperty(ae) && z != null && !a.hasOwnProperty(ae)))
            switch (ae) {
              case 'selected':
                e.selected = !1;
                break;
              default:
                Ue(e, t, ae, null, a, z);
            }
        for (x in a)
          if (((z = a[x]), (B = l[x]), a.hasOwnProperty(x) && z !== B && (z != null || B != null)))
            switch (x) {
              case 'selected':
                e.selected = z && typeof z != 'function' && typeof z != 'symbol';
                break;
              default:
                Ue(e, t, x, z, a, B);
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
          ((z = l[re]),
            l.hasOwnProperty(re) && z != null && !a.hasOwnProperty(re) && Ue(e, t, re, null, a, z));
        for (D in a)
          if (((z = a[D]), (B = l[D]), a.hasOwnProperty(D) && z !== B && (z != null || B != null)))
            switch (D) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (z != null) throw Error(u(137, t));
                break;
              default:
                Ue(e, t, D, z, a, B);
            }
        return;
      default:
        if (Lu(t)) {
          for (var He in l)
            ((z = l[He]),
              l.hasOwnProperty(He) &&
                z !== void 0 &&
                !a.hasOwnProperty(He) &&
                To(e, t, He, void 0, a, z));
          for (U in a)
            ((z = a[U]),
              (B = l[U]),
              !a.hasOwnProperty(U) ||
                z === B ||
                (z === void 0 && B === void 0) ||
                To(e, t, U, z, a, B));
          return;
        }
    }
    for (var M in l)
      ((z = l[M]),
        l.hasOwnProperty(M) && z != null && !a.hasOwnProperty(M) && Ue(e, t, M, null, a, z));
    for (Y in a)
      ((z = a[Y]),
        (B = l[Y]),
        !a.hasOwnProperty(Y) || z === B || (z == null && B == null) || Ue(e, t, Y, z, a, B));
  }
  function hp(e) {
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
  function qy() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var e = 0, t = 0, l = performance.getEntriesByType('resource'), a = 0;
        a < l.length;
        a++
      ) {
        var s = l[a],
          o = s.transferSize,
          d = s.initiatorType,
          _ = s.duration;
        if (o && _ && hp(d)) {
          for (d = 0, _ = s.responseEnd, a += 1; a < l.length; a++) {
            var x = l[a],
              D = x.startTime;
            if (D > _) break;
            var U = x.transferSize,
              Y = x.initiatorType;
            U && hp(Y) && ((x = x.responseEnd), (d += U * (x < _ ? 1 : (_ - D) / (x - D))));
          }
          if ((--a, (t += (8 * (o + d)) / (s.duration / 1e3)), e++, 10 < e)) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && ((e = navigator.connection.downlink), typeof e == 'number')
      ? e
      : 5;
  }
  var Eo = null,
    No = null;
  function Us(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function _p(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function gp(e, t) {
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
  function wo(e, t) {
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
  var Co = null;
  function Uy() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === Co ? !1 : ((Co = e), !0)) : ((Co = null), !1);
  }
  var yp = typeof setTimeout == 'function' ? setTimeout : void 0,
    Hy = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    vp = typeof Promise == 'function' ? Promise : void 0,
    Gy =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof vp < 'u'
          ? function (e) {
              return vp.resolve(null).then(e).catch(Iy);
            }
          : yp;
  function Iy(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function sn(e) {
    return e === 'head';
  }
  function bp(e, t) {
    var l = t,
      a = 0;
    do {
      var s = l.nextSibling;
      if ((e.removeChild(l), s && s.nodeType === 8))
        if (((l = s.data), l === '/$' || l === '/&')) {
          if (a === 0) {
            (e.removeChild(s), ga(t));
            return;
          }
          a--;
        } else if (l === '$' || l === '$?' || l === '$~' || l === '$!' || l === '&') a++;
        else if (l === 'html') _i(e.ownerDocument.documentElement);
        else if (l === 'head') {
          ((l = e.ownerDocument.head), _i(l));
          for (var o = l.firstChild; o; ) {
            var d = o.nextSibling,
              _ = o.nodeName;
            (o[Da] ||
              _ === 'SCRIPT' ||
              _ === 'STYLE' ||
              (_ === 'LINK' && o.rel.toLowerCase() === 'stylesheet') ||
              l.removeChild(o),
              (o = d));
          }
        } else l === 'body' && _i(e.ownerDocument.body);
      l = s;
    } while (l);
    ga(t);
  }
  function Sp(e, t) {
    var l = e;
    e = 0;
    do {
      var a = l.nextSibling;
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
        a && a.nodeType === 8)
      )
        if (((l = a.data), l === '/$')) {
          if (e === 0) break;
          e--;
        } else (l !== '$' && l !== '$?' && l !== '$~' && l !== '$!') || e++;
      l = a;
    } while (l);
  }
  function Ao(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (((t = t.nextSibling), l.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (Ao(l), Ou(l));
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
  function $y(e, t, l, a) {
    for (; e.nodeType === 1; ) {
      var s = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (a) {
        if (!e[Da])
          switch (t) {
            case 'meta':
              if (!e.hasAttribute('itemprop')) break;
              return e;
            case 'link':
              if (
                ((o = e.getAttribute('rel')),
                o === 'stylesheet' && e.hasAttribute('data-precedence'))
              )
                break;
              if (
                o !== s.rel ||
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
                ((o = e.getAttribute('src')),
                (o !== (s.src == null ? null : s.src) ||
                  e.getAttribute('type') !== (s.type == null ? null : s.type) ||
                  e.getAttribute('crossorigin') !==
                    (s.crossOrigin == null ? null : s.crossOrigin)) &&
                  o &&
                  e.hasAttribute('async') &&
                  !e.hasAttribute('itemprop'))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === 'input' && e.type === 'hidden') {
        var o = s.name == null ? null : '' + s.name;
        if (s.type === 'hidden' && e.getAttribute('name') === o) return e;
      } else return e;
      if (((e = Kt(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function Yy(e, t, l) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !l) ||
        ((e = Kt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function kp(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = Kt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function jo(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function Mo(e) {
    return e.data === '$!' || (e.data === '$?' && e.ownerDocument.readyState !== 'loading');
  }
  function Xy(e, t) {
    var l = e.ownerDocument;
    if (e.data === '$~') e._reactRetry = t;
    else if (e.data !== '$?' || l.readyState !== 'loading') t();
    else {
      var a = function () {
        (t(), l.removeEventListener('DOMContentLoaded', a));
      };
      (l.addEventListener('DOMContentLoaded', a), (e._reactRetry = a));
    }
  }
  function Kt(e) {
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
  var Ro = null;
  function xp(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === '/$' || l === '/&') {
          if (t === 0) return Kt(e.nextSibling);
          t--;
        } else (l !== '$' && l !== '$!' && l !== '$?' && l !== '$~' && l !== '&') || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Tp(e) {
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
  function Ep(e, t, l) {
    switch (((t = Us(l)), e)) {
      case 'html':
        if (((e = t.documentElement), !e)) throw Error(u(452));
        return e;
      case 'head':
        if (((e = t.head), !e)) throw Error(u(453));
        return e;
      case 'body':
        if (((e = t.body), !e)) throw Error(u(454));
        return e;
      default:
        throw Error(u(451));
    }
  }
  function _i(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    Ou(e);
  }
  var Zt = new Map(),
    Np = new Set();
  function Hs(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var Ol = K.d;
  K.d = { f: Vy, r: Qy, D: Ky, C: Zy, L: Jy, m: Wy, X: Py, S: Fy, M: ev };
  function Vy() {
    var e = Ol.f(),
      t = Ms();
    return e || t;
  }
  function Qy(e) {
    var t = Bn(e);
    t !== null && t.tag === 5 && t.type === 'form' ? $d(t) : Ol.r(e);
  }
  var pa = typeof document > 'u' ? null : document;
  function wp(e, t, l) {
    var a = pa;
    if (a && typeof t == 'string' && t) {
      var s = Gt(t);
      ((s = 'link[rel="' + e + '"][href="' + s + '"]'),
        typeof l == 'string' && (s += '[crossorigin="' + l + '"]'),
        Np.has(s) ||
          (Np.add(s),
          (e = { rel: e, crossOrigin: l, href: t }),
          a.querySelector(s) === null &&
            ((t = a.createElement('link')), _t(t, 'link', e), ut(t), a.head.appendChild(t))));
    }
  }
  function Ky(e) {
    (Ol.D(e), wp('dns-prefetch', e, null));
  }
  function Zy(e, t) {
    (Ol.C(e, t), wp('preconnect', e, t));
  }
  function Jy(e, t, l) {
    Ol.L(e, t, l);
    var a = pa;
    if (a && e && t) {
      var s = 'link[rel="preload"][as="' + Gt(t) + '"]';
      t === 'image' && l && l.imageSrcSet
        ? ((s += '[imagesrcset="' + Gt(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == 'string' && (s += '[imagesizes="' + Gt(l.imageSizes) + '"]'))
        : (s += '[href="' + Gt(e) + '"]');
      var o = s;
      switch (t) {
        case 'style':
          o = ha(e);
          break;
        case 'script':
          o = _a(e);
      }
      Zt.has(o) ||
        ((e = b(
          { rel: 'preload', href: t === 'image' && l && l.imageSrcSet ? void 0 : e, as: t },
          l
        )),
        Zt.set(o, e),
        a.querySelector(s) !== null ||
          (t === 'style' && a.querySelector(gi(o))) ||
          (t === 'script' && a.querySelector(yi(o))) ||
          ((t = a.createElement('link')), _t(t, 'link', e), ut(t), a.head.appendChild(t)));
    }
  }
  function Wy(e, t) {
    Ol.m(e, t);
    var l = pa;
    if (l && e) {
      var a = t && typeof t.as == 'string' ? t.as : 'script',
        s = 'link[rel="modulepreload"][as="' + Gt(a) + '"][href="' + Gt(e) + '"]',
        o = s;
      switch (a) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          o = _a(e);
      }
      if (
        !Zt.has(o) &&
        ((e = b({ rel: 'modulepreload', href: e }, t)), Zt.set(o, e), l.querySelector(s) === null)
      ) {
        switch (a) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (l.querySelector(yi(o))) return;
        }
        ((a = l.createElement('link')), _t(a, 'link', e), ut(a), l.head.appendChild(a));
      }
    }
  }
  function Fy(e, t, l) {
    Ol.S(e, t, l);
    var a = pa;
    if (a && e) {
      var s = Ln(a).hoistableStyles,
        o = ha(e);
      t = t || 'default';
      var d = s.get(o);
      if (!d) {
        var _ = { loading: 0, preload: null };
        if ((d = a.querySelector(gi(o)))) _.loading = 5;
        else {
          ((e = b({ rel: 'stylesheet', href: e, 'data-precedence': t }, l)),
            (l = Zt.get(o)) && Oo(e, l));
          var x = (d = a.createElement('link'));
          (ut(x),
            _t(x, 'link', e),
            (x._p = new Promise(function (D, U) {
              ((x.onload = D), (x.onerror = U));
            })),
            x.addEventListener('load', function () {
              _.loading |= 1;
            }),
            x.addEventListener('error', function () {
              _.loading |= 2;
            }),
            (_.loading |= 4),
            Gs(d, t, a));
        }
        ((d = { type: 'stylesheet', instance: d, count: 1, state: _ }), s.set(o, d));
      }
    }
  }
  function Py(e, t) {
    Ol.X(e, t);
    var l = pa;
    if (l && e) {
      var a = Ln(l).hoistableScripts,
        s = _a(e),
        o = a.get(s);
      o ||
        ((o = l.querySelector(yi(s))),
        o ||
          ((e = b({ src: e, async: !0 }, t)),
          (t = Zt.get(s)) && Do(e, t),
          (o = l.createElement('script')),
          ut(o),
          _t(o, 'link', e),
          l.head.appendChild(o)),
        (o = { type: 'script', instance: o, count: 1, state: null }),
        a.set(s, o));
    }
  }
  function ev(e, t) {
    Ol.M(e, t);
    var l = pa;
    if (l && e) {
      var a = Ln(l).hoistableScripts,
        s = _a(e),
        o = a.get(s);
      o ||
        ((o = l.querySelector(yi(s))),
        o ||
          ((e = b({ src: e, async: !0, type: 'module' }, t)),
          (t = Zt.get(s)) && Do(e, t),
          (o = l.createElement('script')),
          ut(o),
          _t(o, 'link', e),
          l.head.appendChild(o)),
        (o = { type: 'script', instance: o, count: 1, state: null }),
        a.set(s, o));
    }
  }
  function Cp(e, t, l, a) {
    var s = (s = be.current) ? Hs(s) : null;
    if (!s) throw Error(u(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof l.precedence == 'string' && typeof l.href == 'string'
          ? ((t = ha(l.href)),
            (l = Ln(s).hoistableStyles),
            (a = l.get(t)),
            a || ((a = { type: 'style', instance: null, count: 0, state: null }), l.set(t, a)),
            a)
          : { type: 'void', instance: null, count: 0, state: null };
      case 'link':
        if (
          l.rel === 'stylesheet' &&
          typeof l.href == 'string' &&
          typeof l.precedence == 'string'
        ) {
          e = ha(l.href);
          var o = Ln(s).hoistableStyles,
            d = o.get(e);
          if (
            (d ||
              ((s = s.ownerDocument || s),
              (d = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              o.set(e, d),
              (o = s.querySelector(gi(e))) && !o._p && ((d.instance = o), (d.state.loading = 5)),
              Zt.has(e) ||
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
                Zt.set(e, l),
                o || tv(s, e, l, d.state))),
            t && a === null)
          )
            throw Error(u(528, ''));
          return d;
        }
        if (t && a !== null) throw Error(u(529, ''));
        return null;
      case 'script':
        return (
          (t = l.async),
          (l = l.src),
          typeof l == 'string' && t && typeof t != 'function' && typeof t != 'symbol'
            ? ((t = _a(l)),
              (l = Ln(s).hoistableScripts),
              (a = l.get(t)),
              a || ((a = { type: 'script', instance: null, count: 0, state: null }), l.set(t, a)),
              a)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(u(444, e));
    }
  }
  function ha(e) {
    return 'href="' + Gt(e) + '"';
  }
  function gi(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function Ap(e) {
    return b({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function tv(e, t, l, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + ']')
      ? (a.loading = 1)
      : ((t = e.createElement('link')),
        (a.preload = t),
        t.addEventListener('load', function () {
          return (a.loading |= 1);
        }),
        t.addEventListener('error', function () {
          return (a.loading |= 2);
        }),
        _t(t, 'link', l),
        ut(t),
        e.head.appendChild(t));
  }
  function _a(e) {
    return '[src="' + Gt(e) + '"]';
  }
  function yi(e) {
    return 'script[async]' + e;
  }
  function jp(e, t, l) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var a = e.querySelector('style[data-href~="' + Gt(l.href) + '"]');
          if (a) return ((t.instance = a), ut(a), a);
          var s = b({}, l, {
            'data-href': l.href,
            'data-precedence': l.precedence,
            href: null,
            precedence: null,
          });
          return (
            (a = (e.ownerDocument || e).createElement('style')),
            ut(a),
            _t(a, 'style', s),
            Gs(a, l.precedence, e),
            (t.instance = a)
          );
        case 'stylesheet':
          s = ha(l.href);
          var o = e.querySelector(gi(s));
          if (o) return ((t.state.loading |= 4), (t.instance = o), ut(o), o);
          ((a = Ap(l)),
            (s = Zt.get(s)) && Oo(a, s),
            (o = (e.ownerDocument || e).createElement('link')),
            ut(o));
          var d = o;
          return (
            (d._p = new Promise(function (_, x) {
              ((d.onload = _), (d.onerror = x));
            })),
            _t(o, 'link', a),
            (t.state.loading |= 4),
            Gs(o, l.precedence, e),
            (t.instance = o)
          );
        case 'script':
          return (
            (o = _a(l.src)),
            (s = e.querySelector(yi(o)))
              ? ((t.instance = s), ut(s), s)
              : ((a = l),
                (s = Zt.get(o)) && ((a = b({}, l)), Do(a, s)),
                (e = e.ownerDocument || e),
                (s = e.createElement('script')),
                ut(s),
                _t(s, 'link', a),
                e.head.appendChild(s),
                (t.instance = s))
          );
        case 'void':
          return null;
        default:
          throw Error(u(443, t.type));
      }
    else
      t.type === 'stylesheet' &&
        (t.state.loading & 4) === 0 &&
        ((a = t.instance), (t.state.loading |= 4), Gs(a, l.precedence, e));
    return t.instance;
  }
  function Gs(e, t, l) {
    for (
      var a = l.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        s = a.length ? a[a.length - 1] : null,
        o = s,
        d = 0;
      d < a.length;
      d++
    ) {
      var _ = a[d];
      if (_.dataset.precedence === t) o = _;
      else if (o !== s) break;
    }
    o
      ? o.parentNode.insertBefore(e, o.nextSibling)
      : ((t = l.nodeType === 9 ? l.head : l), t.insertBefore(e, t.firstChild));
  }
  function Oo(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function Do(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var Is = null;
  function Mp(e, t, l) {
    if (Is === null) {
      var a = new Map(),
        s = (Is = new Map());
      s.set(l, a);
    } else ((s = Is), (a = s.get(l)), a || ((a = new Map()), s.set(l, a)));
    if (a.has(e)) return a;
    for (a.set(e, null), l = l.getElementsByTagName(e), s = 0; s < l.length; s++) {
      var o = l[s];
      if (
        !(o[Da] || o[dt] || (e === 'link' && o.getAttribute('rel') === 'stylesheet')) &&
        o.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var d = o.getAttribute(t) || '';
        d = e + d;
        var _ = a.get(d);
        _ ? _.push(o) : a.set(d, [o]);
      }
    }
    return a;
  }
  function Rp(e, t, l) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(l, t === 'title' ? e.querySelector('head > title') : null));
  }
  function lv(e, t, l) {
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
  function Op(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  function nv(e, t, l, a) {
    if (
      l.type === 'stylesheet' &&
      (typeof a.media != 'string' || matchMedia(a.media).matches !== !1) &&
      (l.state.loading & 4) === 0
    ) {
      if (l.instance === null) {
        var s = ha(a.href),
          o = t.querySelector(gi(s));
        if (o) {
          ((t = o._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = $s.bind(e)), t.then(e, e)),
            (l.state.loading |= 4),
            (l.instance = o),
            ut(o));
          return;
        }
        ((o = t.ownerDocument || t),
          (a = Ap(a)),
          (s = Zt.get(s)) && Oo(a, s),
          (o = o.createElement('link')),
          ut(o));
        var d = o;
        ((d._p = new Promise(function (_, x) {
          ((d.onload = _), (d.onerror = x));
        })),
          _t(o, 'link', a),
          (l.instance = o));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(l, t),
        (t = l.state.preload) &&
          (l.state.loading & 3) === 0 &&
          (e.count++,
          (l = $s.bind(e)),
          t.addEventListener('load', l),
          t.addEventListener('error', l)));
    }
  }
  var zo = 0;
  function av(e, t) {
    return (
      e.stylesheets && e.count === 0 && Xs(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (l) {
            var a = setTimeout(function () {
              if ((e.stylesheets && Xs(e, e.stylesheets), e.unsuspend)) {
                var o = e.unsuspend;
                ((e.unsuspend = null), o());
              }
            }, 6e4 + t);
            0 < e.imgBytes && zo === 0 && (zo = 62500 * qy());
            var s = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 && (e.stylesheets && Xs(e, e.stylesheets), e.unsuspend))
                ) {
                  var o = e.unsuspend;
                  ((e.unsuspend = null), o());
                }
              },
              (e.imgBytes > zo ? 50 : 800) + t
            );
            return (
              (e.unsuspend = l),
              function () {
                ((e.unsuspend = null), clearTimeout(a), clearTimeout(s));
              }
            );
          }
        : null
    );
  }
  function $s() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) Xs(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var Ys = null;
  function Xs(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++, (Ys = new Map()), t.forEach(iv, e), (Ys = null), $s.call(e)));
  }
  function iv(e, t) {
    if (!(t.state.loading & 4)) {
      var l = Ys.get(e);
      if (l) var a = l.get(null);
      else {
        ((l = new Map()), Ys.set(e, l));
        for (
          var s = e.querySelectorAll('link[data-precedence],style[data-precedence]'), o = 0;
          o < s.length;
          o++
        ) {
          var d = s[o];
          (d.nodeName === 'LINK' || d.getAttribute('media') !== 'not all') &&
            (l.set(d.dataset.precedence, d), (a = d));
        }
        a && l.set(null, a);
      }
      ((s = t.instance),
        (d = s.getAttribute('data-precedence')),
        (o = l.get(d) || a),
        o === a && l.set(null, s),
        l.set(d, s),
        this.count++,
        (a = $s.bind(this)),
        s.addEventListener('load', a),
        s.addEventListener('error', a),
        o
          ? o.parentNode.insertBefore(s, o.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(s, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var vi = {
    $$typeof: V,
    Provider: null,
    Consumer: null,
    _currentValue: le,
    _currentValue2: le,
    _threadCount: 0,
  };
  function sv(e, t, l, a, s, o, d, _, x) {
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
      (this.expirationTimes = Au(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Au(0)),
      (this.hiddenUpdates = Au(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = s),
      (this.onCaughtError = o),
      (this.onRecoverableError = d),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = x),
      (this.incompleteTransitions = new Map()));
  }
  function Dp(e, t, l, a, s, o, d, _, x, D, U, Y) {
    return (
      (e = new sv(e, t, l, d, x, D, U, Y, _)),
      (t = 1),
      o === !0 && (t |= 24),
      (o = Rt(3, null, null, t)),
      (e.current = o),
      (o.stateNode = e),
      (t = mc()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (o.memoizedState = { element: a, isDehydrated: l, cache: t }),
      gc(o),
      e
    );
  }
  function zp(e) {
    return e ? ((e = Qn), e) : Qn;
  }
  function Bp(e, t, l, a, s, o) {
    ((s = zp(s)),
      a.context === null ? (a.context = s) : (a.pendingContext = s),
      (a = Kl(t)),
      (a.payload = { element: l }),
      (o = o === void 0 ? null : o),
      o !== null && (a.callback = o),
      (l = Zl(e, a, t)),
      l !== null && (wt(l, e, t), Wa(l, e, t)));
  }
  function Lp(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function Bo(e, t) {
    (Lp(e, t), (e = e.alternate) && Lp(e, t));
  }
  function qp(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = yn(e, 67108864);
      (t !== null && wt(t, e, 67108864), Bo(e, 67108864));
    }
  }
  function Up(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Lt();
      t = ju(t);
      var l = yn(e, t);
      (l !== null && wt(l, e, t), Bo(e, t));
    }
  }
  var Vs = !0;
  function uv(e, t, l, a) {
    var s = L.T;
    L.T = null;
    var o = K.p;
    try {
      ((K.p = 2), Lo(e, t, l, a));
    } finally {
      ((K.p = o), (L.T = s));
    }
  }
  function cv(e, t, l, a) {
    var s = L.T;
    L.T = null;
    var o = K.p;
    try {
      ((K.p = 8), Lo(e, t, l, a));
    } finally {
      ((K.p = o), (L.T = s));
    }
  }
  function Lo(e, t, l, a) {
    if (Vs) {
      var s = qo(a);
      if (s === null) (xo(e, t, a, Qs, l), Gp(e, a));
      else if (rv(s, e, t, l, a)) a.stopPropagation();
      else if ((Gp(e, a), t & 4 && -1 < ov.indexOf(e))) {
        for (; s !== null; ) {
          var o = Bn(s);
          if (o !== null)
            switch (o.tag) {
              case 3:
                if (((o = o.stateNode), o.current.memoizedState.isDehydrated)) {
                  var d = mn(o.pendingLanes);
                  if (d !== 0) {
                    var _ = o;
                    for (_.pendingLanes |= 2, _.entangledLanes |= 2; d; ) {
                      var x = 1 << (31 - jt(d));
                      ((_.entanglements[1] |= x), (d &= ~x));
                    }
                    (ml(o), (Re & 6) === 0 && ((As = Ct() + 500), mi(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((_ = yn(o, 2)), _ !== null && wt(_, o, 2), Ms(), Bo(o, 2));
            }
          if (((o = qo(a)), o === null && xo(e, t, a, Qs, l), o === s)) break;
          s = o;
        }
        s !== null && a.stopPropagation();
      } else xo(e, t, a, null, l);
    }
  }
  function qo(e) {
    return ((e = Uu(e)), Uo(e));
  }
  var Qs = null;
  function Uo(e) {
    if (((Qs = null), (e = zn(e)), e !== null)) {
      var t = f(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (((e = m(t)), e !== null)) return e;
          e = null;
        } else if (l === 31) {
          if (((e = h(t)), e !== null)) return e;
          e = null;
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ((Qs = e), null);
  }
  function Hp(e) {
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
        switch (K_()) {
          case Qr:
            return 2;
          case Kr:
            return 8;
          case Bi:
          case Z_:
            return 32;
          case Zr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Ho = !1,
    un = null,
    cn = null,
    on = null,
    bi = new Map(),
    Si = new Map(),
    rn = [],
    ov =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function Gp(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        un = null;
        break;
      case 'dragenter':
      case 'dragleave':
        cn = null;
        break;
      case 'mouseover':
      case 'mouseout':
        on = null;
        break;
      case 'pointerover':
      case 'pointerout':
        bi.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        Si.delete(t.pointerId);
    }
  }
  function ki(e, t, l, a, s, o) {
    return e === null || e.nativeEvent !== o
      ? ((e = {
          blockedOn: t,
          domEventName: l,
          eventSystemFlags: a,
          nativeEvent: o,
          targetContainers: [s],
        }),
        t !== null && ((t = Bn(t)), t !== null && qp(t)),
        e)
      : ((e.eventSystemFlags |= a),
        (t = e.targetContainers),
        s !== null && t.indexOf(s) === -1 && t.push(s),
        e);
  }
  function rv(e, t, l, a, s) {
    switch (t) {
      case 'focusin':
        return ((un = ki(un, e, t, l, a, s)), !0);
      case 'dragenter':
        return ((cn = ki(cn, e, t, l, a, s)), !0);
      case 'mouseover':
        return ((on = ki(on, e, t, l, a, s)), !0);
      case 'pointerover':
        var o = s.pointerId;
        return (bi.set(o, ki(bi.get(o) || null, e, t, l, a, s)), !0);
      case 'gotpointercapture':
        return ((o = s.pointerId), Si.set(o, ki(Si.get(o) || null, e, t, l, a, s)), !0);
    }
    return !1;
  }
  function Ip(e) {
    var t = zn(e.target);
    if (t !== null) {
      var l = f(t);
      if (l !== null) {
        if (((t = l.tag), t === 13)) {
          if (((t = m(l)), t !== null)) {
            ((e.blockedOn = t),
              tf(e.priority, function () {
                Up(l);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = h(l)), t !== null)) {
            ((e.blockedOn = t),
              tf(e.priority, function () {
                Up(l);
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
  function Ks(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = qo(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var a = new l.constructor(l.type, l);
        ((qu = a), l.target.dispatchEvent(a), (qu = null));
      } else return ((t = Bn(l)), t !== null && qp(t), (e.blockedOn = l), !1);
      t.shift();
    }
    return !0;
  }
  function $p(e, t, l) {
    Ks(e) && l.delete(t);
  }
  function fv() {
    ((Ho = !1),
      un !== null && Ks(un) && (un = null),
      cn !== null && Ks(cn) && (cn = null),
      on !== null && Ks(on) && (on = null),
      bi.forEach($p),
      Si.forEach($p));
  }
  function Zs(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Ho || ((Ho = !0), n.unstable_scheduleCallback(n.unstable_NormalPriority, fv)));
  }
  var Js = null;
  function Yp(e) {
    Js !== e &&
      ((Js = e),
      n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
        Js === e && (Js = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t],
            a = e[t + 1],
            s = e[t + 2];
          if (typeof a != 'function') {
            if (Uo(a || l) === null) continue;
            break;
          }
          var o = Bn(l);
          o !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Lc(o, { pending: !0, data: s, method: l.method, action: a }, a, s));
        }
      }));
  }
  function ga(e) {
    function t(x) {
      return Zs(x, e);
    }
    (un !== null && Zs(un, e),
      cn !== null && Zs(cn, e),
      on !== null && Zs(on, e),
      bi.forEach(t),
      Si.forEach(t));
    for (var l = 0; l < rn.length; l++) {
      var a = rn[l];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < rn.length && ((l = rn[0]), l.blockedOn === null); )
      (Ip(l), l.blockedOn === null && rn.shift());
    if (((l = (e.ownerDocument || e).$$reactFormReplay), l != null))
      for (a = 0; a < l.length; a += 3) {
        var s = l[a],
          o = l[a + 1],
          d = s[St] || null;
        if (typeof o == 'function') d || Yp(l);
        else if (d) {
          var _ = null;
          if (o && o.hasAttribute('formAction')) {
            if (((s = o), (d = o[St] || null))) _ = d.formAction;
            else if (Uo(s) !== null) continue;
          } else _ = d.action;
          (typeof _ == 'function' ? (l[a + 1] = _) : (l.splice(a, 3), (a -= 3)), Yp(l));
        }
      }
  }
  function Xp() {
    function e(o) {
      o.canIntercept &&
        o.info === 'react-transition' &&
        o.intercept({
          handler: function () {
            return new Promise(function (d) {
              return (s = d);
            });
          },
          focusReset: 'manual',
          scroll: 'manual',
        });
    }
    function t() {
      (s !== null && (s(), (s = null)), a || setTimeout(l, 20));
    }
    function l() {
      if (!a && !navigation.transition) {
        var o = navigation.currentEntry;
        o &&
          o.url != null &&
          navigation.navigate(o.url, {
            state: o.getState(),
            info: 'react-transition',
            history: 'replace',
          });
      }
    }
    if (typeof navigation == 'object') {
      var a = !1,
        s = null;
      return (
        navigation.addEventListener('navigate', e),
        navigation.addEventListener('navigatesuccess', t),
        navigation.addEventListener('navigateerror', t),
        setTimeout(l, 100),
        function () {
          ((a = !0),
            navigation.removeEventListener('navigate', e),
            navigation.removeEventListener('navigatesuccess', t),
            navigation.removeEventListener('navigateerror', t),
            s !== null && (s(), (s = null)));
        }
      );
    }
  }
  function Go(e) {
    this._internalRoot = e;
  }
  ((Ws.prototype.render = Go.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(u(409));
      var l = t.current,
        a = Lt();
      Bp(l, a, e, t, null, null);
    }),
    (Ws.prototype.unmount = Go.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (Bp(e.current, 2, null, e, null, null), Ms(), (t[Dn] = null));
        }
      }));
  function Ws(e) {
    this._internalRoot = e;
  }
  Ws.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = ef();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < rn.length && t !== 0 && t < rn[l].priority; l++);
      (rn.splice(l, 0, e), l === 0 && Ip(e));
    }
  };
  var Vp = i.version;
  if (Vp !== '19.2.5') throw Error(u(527, Vp, '19.2.5'));
  K.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(u(188))
        : ((e = Object.keys(e).join(',')), Error(u(268, e)));
    return ((e = g(t)), (e = e !== null ? v(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var dv = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: L,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Fs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Fs.isDisabled && Fs.supportsFiber)
      try {
        ((Ma = Fs.inject(dv)), (At = Fs));
      } catch {}
  }
  return (
    (Ti.createRoot = function (e, t) {
      if (!r(e)) throw Error(u(299));
      var l = !1,
        a = '',
        s = Pd,
        o = em,
        d = tm;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (l = !0),
          t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (s = t.onUncaughtError),
          t.onCaughtError !== void 0 && (o = t.onCaughtError),
          t.onRecoverableError !== void 0 && (d = t.onRecoverableError)),
        (t = Dp(e, 1, !1, null, null, l, a, null, s, o, d, Xp)),
        (e[Dn] = t.current),
        ko(e),
        new Go(t)
      );
    }),
    (Ti.hydrateRoot = function (e, t, l) {
      if (!r(e)) throw Error(u(299));
      var a = !1,
        s = '',
        o = Pd,
        d = em,
        _ = tm,
        x = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (a = !0),
          l.identifierPrefix !== void 0 && (s = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (o = l.onUncaughtError),
          l.onCaughtError !== void 0 && (d = l.onCaughtError),
          l.onRecoverableError !== void 0 && (_ = l.onRecoverableError),
          l.formState !== void 0 && (x = l.formState)),
        (t = Dp(e, 1, !0, t, l ?? null, a, s, x, o, d, _, Xp)),
        (t.context = zp(null)),
        (l = t.current),
        (a = Lt()),
        (a = ju(a)),
        (s = Kl(a)),
        (s.callback = null),
        Zl(l, s, a),
        (l = a),
        (t.current.lanes = l),
        Oa(t, l),
        ml(t),
        (e[Dn] = t.current),
        ko(e),
        new Ws(t)
      );
    }),
    (Ti.version = '19.2.5'),
    Ti
  );
}
var lh;
function Tv() {
  if (lh) return Yo.exports;
  lh = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (i) {
        console.error(i);
      }
  }
  return (n(), (Yo.exports = xv()), Yo.exports);
}
var Ev = Tv(),
  E = xr();
/**
 * react-router v7.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var nh = 'popstate';
function ah(n) {
  return (
    typeof n == 'object' &&
    n != null &&
    'pathname' in n &&
    'search' in n &&
    'hash' in n &&
    'state' in n &&
    'key' in n
  );
}
function Nv(n = {}) {
  function i(u, r) {
    var g;
    let f = (g = r.state) == null ? void 0 : g.masked,
      { pathname: m, search: h, hash: y } = f || u.location;
    return or(
      '',
      { pathname: m, search: h, hash: y },
      (r.state && r.state.usr) || null,
      (r.state && r.state.key) || 'default',
      f
        ? { pathname: u.location.pathname, search: u.location.search, hash: u.location.hash }
        : void 0
    );
  }
  function c(u, r) {
    return typeof r == 'string' ? r : ji(r);
  }
  return Cv(i, c, null, n);
}
function Qe(n, i) {
  if (n === !1 || n === null || typeof n > 'u') throw new Error(i);
}
function sl(n, i) {
  if (!n) {
    typeof console < 'u' && console.warn(i);
    try {
      throw new Error(i);
    } catch {}
  }
}
function wv() {
  return Math.random().toString(36).substring(2, 10);
}
function ih(n, i) {
  return {
    usr: n.state,
    key: n.key,
    idx: i,
    masked: n.unstable_mask ? { pathname: n.pathname, search: n.search, hash: n.hash } : void 0,
  };
}
function or(n, i, c = null, u, r) {
  return {
    pathname: typeof n == 'string' ? n : n.pathname,
    search: '',
    hash: '',
    ...(typeof i == 'string' ? Na(i) : i),
    state: c,
    key: (i && i.key) || u || wv(),
    unstable_mask: r,
  };
}
function ji({ pathname: n = '/', search: i = '', hash: c = '' }) {
  return (
    i && i !== '?' && (n += i.charAt(0) === '?' ? i : '?' + i),
    c && c !== '#' && (n += c.charAt(0) === '#' ? c : '#' + c),
    n
  );
}
function Na(n) {
  let i = {};
  if (n) {
    let c = n.indexOf('#');
    c >= 0 && ((i.hash = n.substring(c)), (n = n.substring(0, c)));
    let u = n.indexOf('?');
    (u >= 0 && ((i.search = n.substring(u)), (n = n.substring(0, u))), n && (i.pathname = n));
  }
  return i;
}
function Cv(n, i, c, u = {}) {
  let { window: r = document.defaultView, v5Compat: f = !1 } = u,
    m = r.history,
    h = 'POP',
    y = null,
    g = v();
  g == null && ((g = 0), m.replaceState({ ...m.state, idx: g }, ''));
  function v() {
    return (m.state || { idx: null }).idx;
  }
  function b() {
    h = 'POP';
    let A = v(),
      w = A == null ? null : A - g;
    ((g = A), y && y({ action: h, location: R.location, delta: w }));
  }
  function k(A, w) {
    h = 'PUSH';
    let T = ah(A) ? A : or(R.location, A, w);
    g = v() + 1;
    let V = ih(T, g),
      P = R.createHref(T.unstable_mask || T);
    try {
      m.pushState(V, '', P);
    } catch (ee) {
      if (ee instanceof DOMException && ee.name === 'DataCloneError') throw ee;
      r.location.assign(P);
    }
    f && y && y({ action: h, location: R.location, delta: 1 });
  }
  function j(A, w) {
    h = 'REPLACE';
    let T = ah(A) ? A : or(R.location, A, w);
    g = v();
    let V = ih(T, g),
      P = R.createHref(T.unstable_mask || T);
    (m.replaceState(V, '', P), f && y && y({ action: h, location: R.location, delta: 0 }));
  }
  function S(A) {
    return Av(A);
  }
  let R = {
    get action() {
      return h;
    },
    get location() {
      return n(r, m);
    },
    listen(A) {
      if (y) throw new Error('A history only accepts one active listener');
      return (
        r.addEventListener(nh, b),
        (y = A),
        () => {
          (r.removeEventListener(nh, b), (y = null));
        }
      );
    },
    createHref(A) {
      return i(r, A);
    },
    createURL: S,
    encodeLocation(A) {
      let w = S(A);
      return { pathname: w.pathname, search: w.search, hash: w.hash };
    },
    push: k,
    replace: j,
    go(A) {
      return m.go(A);
    },
  };
  return R;
}
function Av(n, i = !1) {
  let c = 'http://localhost';
  (typeof window < 'u' &&
    (c = window.location.origin !== 'null' ? window.location.origin : window.location.href),
    Qe(c, 'No window.location.(origin|href) available to create URL'));
  let u = typeof n == 'string' ? n : ji(n);
  return ((u = u.replace(/ $/, '%20')), !i && u.startsWith('//') && (u = c + u), new URL(u, c));
}
function Oh(n, i, c = '/') {
  return jv(n, i, c, !1);
}
function jv(n, i, c, u) {
  let r = typeof i == 'string' ? Na(i) : i,
    f = Ll(r.pathname || '/', c);
  if (f == null) return null;
  let m = Dh(n);
  Mv(m);
  let h = null;
  for (let y = 0; h == null && y < m.length; ++y) {
    let g = Iv(f);
    h = Hv(m[y], g, u);
  }
  return h;
}
function Dh(n, i = [], c = [], u = '', r = !1) {
  let f = (m, h, y = r, g) => {
    let v = {
      relativePath: g === void 0 ? m.path || '' : g,
      caseSensitive: m.caseSensitive === !0,
      childrenIndex: h,
      route: m,
    };
    if (v.relativePath.startsWith('/')) {
      if (!v.relativePath.startsWith(u) && y) return;
      (Qe(
        v.relativePath.startsWith(u),
        `Absolute route path "${v.relativePath}" nested under path "${u}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (v.relativePath = v.relativePath.slice(u.length)));
    }
    let b = il([u, v.relativePath]),
      k = c.concat(v);
    (m.children &&
      m.children.length > 0 &&
      (Qe(
        m.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${b}".`
      ),
      Dh(m.children, i, k, b, y)),
      !(m.path == null && !m.index) && i.push({ path: b, score: qv(b, m.index), routesMeta: k }));
  };
  return (
    n.forEach((m, h) => {
      var y;
      if (m.path === '' || !((y = m.path) != null && y.includes('?'))) f(m, h);
      else for (let g of zh(m.path)) f(m, h, !0, g);
    }),
    i
  );
}
function zh(n) {
  let i = n.split('/');
  if (i.length === 0) return [];
  let [c, ...u] = i,
    r = c.endsWith('?'),
    f = c.replace(/\?$/, '');
  if (u.length === 0) return r ? [f, ''] : [f];
  let m = zh(u.join('/')),
    h = [];
  return (
    h.push(...m.map((y) => (y === '' ? f : [f, y].join('/')))),
    r && h.push(...m),
    h.map((y) => (n.startsWith('/') && y === '' ? '/' : y))
  );
}
function Mv(n) {
  n.sort((i, c) =>
    i.score !== c.score
      ? c.score - i.score
      : Uv(
          i.routesMeta.map((u) => u.childrenIndex),
          c.routesMeta.map((u) => u.childrenIndex)
        )
  );
}
var Rv = /^:[\w-]+$/,
  Ov = 3,
  Dv = 2,
  zv = 1,
  Bv = 10,
  Lv = -2,
  sh = (n) => n === '*';
function qv(n, i) {
  let c = n.split('/'),
    u = c.length;
  return (
    c.some(sh) && (u += Lv),
    i && (u += Dv),
    c.filter((r) => !sh(r)).reduce((r, f) => r + (Rv.test(f) ? Ov : f === '' ? zv : Bv), u)
  );
}
function Uv(n, i) {
  return n.length === i.length && n.slice(0, -1).every((u, r) => u === i[r])
    ? n[n.length - 1] - i[i.length - 1]
    : 0;
}
function Hv(n, i, c = !1) {
  let { routesMeta: u } = n,
    r = {},
    f = '/',
    m = [];
  for (let h = 0; h < u.length; ++h) {
    let y = u[h],
      g = h === u.length - 1,
      v = f === '/' ? i : i.slice(f.length) || '/',
      b = cu({ path: y.relativePath, caseSensitive: y.caseSensitive, end: g }, v),
      k = y.route;
    if (
      (!b &&
        g &&
        c &&
        !u[u.length - 1].route.index &&
        (b = cu({ path: y.relativePath, caseSensitive: y.caseSensitive, end: !1 }, v)),
      !b)
    )
      return null;
    (Object.assign(r, b.params),
      m.push({
        params: r,
        pathname: il([f, b.pathname]),
        pathnameBase: Vv(il([f, b.pathnameBase])),
        route: k,
      }),
      b.pathnameBase !== '/' && (f = il([f, b.pathnameBase])));
  }
  return m;
}
function cu(n, i) {
  typeof n == 'string' && (n = { path: n, caseSensitive: !1, end: !0 });
  let [c, u] = Gv(n.path, n.caseSensitive, n.end),
    r = i.match(c);
  if (!r) return null;
  let f = r[0],
    m = f.replace(/(.)\/+$/, '$1'),
    h = r.slice(1);
  return {
    params: u.reduce((g, { paramName: v, isOptional: b }, k) => {
      if (v === '*') {
        let S = h[k] || '';
        m = f.slice(0, f.length - S.length).replace(/(.)\/+$/, '$1');
      }
      const j = h[k];
      return (b && !j ? (g[v] = void 0) : (g[v] = (j || '').replace(/%2F/g, '/')), g);
    }, {}),
    pathname: f,
    pathnameBase: m,
    pattern: n,
  };
}
function Gv(n, i = !1, c = !0) {
  sl(
    n === '*' || !n.endsWith('*') || n.endsWith('/*'),
    `Route path "${n}" will be treated as if it were "${n.replace(/\*$/, '/*')}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/, '/*')}".`
  );
  let u = [],
    r =
      '^' +
      n
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(/\/:([\w-]+)(\?)?/g, (m, h, y, g, v) => {
          if ((u.push({ paramName: h, isOptional: y != null }), y)) {
            let b = v.charAt(g + m.length);
            return b && b !== '/' ? '/([^\\/]*)' : '(?:/([^\\/]*))?';
          }
          return '/([^\\/]+)';
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, '(/$1)?$2');
  return (
    n.endsWith('*')
      ? (u.push({ paramName: '*' }), (r += n === '*' || n === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : c
        ? (r += '\\/*$')
        : n !== '' && n !== '/' && (r += '(?:(?=\\/|$))'),
    [new RegExp(r, i ? void 0 : 'i'), u]
  );
}
function Iv(n) {
  try {
    return n
      .split('/')
      .map((i) => decodeURIComponent(i).replace(/\//g, '%2F'))
      .join('/');
  } catch (i) {
    return (
      sl(
        !1,
        `The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${i}).`
      ),
      n
    );
  }
}
function Ll(n, i) {
  if (i === '/') return n;
  if (!n.toLowerCase().startsWith(i.toLowerCase())) return null;
  let c = i.endsWith('/') ? i.length - 1 : i.length,
    u = n.charAt(c);
  return u && u !== '/' ? null : n.slice(c) || '/';
}
var $v = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function Yv(n, i = '/') {
  let { pathname: c, search: u = '', hash: r = '' } = typeof n == 'string' ? Na(n) : n,
    f;
  return (
    c ? ((c = Bh(c)), c.startsWith('/') ? (f = uh(c.substring(1), '/')) : (f = uh(c, i))) : (f = i),
    { pathname: f, search: Qv(u), hash: Kv(r) }
  );
}
function uh(n, i) {
  let c = ou(i).split('/');
  return (
    n.split('/').forEach((r) => {
      r === '..' ? c.length > 1 && c.pop() : r !== '.' && c.push(r);
    }),
    c.length > 1 ? c.join('/') : '/'
  );
}
function Zo(n, i, c, u) {
  return `Cannot include a '${n}' character in a manually specified \`to.${i}\` field [${JSON.stringify(u)}].  Please separate it out to the \`to.${c}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Xv(n) {
  return n.filter((i, c) => c === 0 || (i.route.path && i.route.path.length > 0));
}
function Tr(n) {
  let i = Xv(n);
  return i.map((c, u) => (u === i.length - 1 ? c.pathname : c.pathnameBase));
}
function _u(n, i, c, u = !1) {
  let r;
  typeof n == 'string'
    ? (r = Na(n))
    : ((r = { ...n }),
      Qe(!r.pathname || !r.pathname.includes('?'), Zo('?', 'pathname', 'search', r)),
      Qe(!r.pathname || !r.pathname.includes('#'), Zo('#', 'pathname', 'hash', r)),
      Qe(!r.search || !r.search.includes('#'), Zo('#', 'search', 'hash', r)));
  let f = n === '' || r.pathname === '',
    m = f ? '/' : r.pathname,
    h;
  if (m == null) h = c;
  else {
    let b = i.length - 1;
    if (!u && m.startsWith('..')) {
      let k = m.split('/');
      for (; k[0] === '..'; ) (k.shift(), (b -= 1));
      r.pathname = k.join('/');
    }
    h = b >= 0 ? i[b] : '/';
  }
  let y = Yv(r, h),
    g = m && m !== '/' && m.endsWith('/'),
    v = (f || m === '.') && c.endsWith('/');
  return (!y.pathname.endsWith('/') && (g || v) && (y.pathname += '/'), y);
}
var Bh = (n) => n.replace(/\/\/+/g, '/'),
  il = (n) => Bh(n.join('/')),
  ou = (n) => n.replace(/\/+$/, ''),
  Vv = (n) => ou(n).replace(/^\/*/, '/'),
  Qv = (n) => (!n || n === '?' ? '' : n.startsWith('?') ? n : '?' + n),
  Kv = (n) => (!n || n === '#' ? '' : n.startsWith('#') ? n : '#' + n),
  Zv = class {
    constructor(n, i, c, u = !1) {
      ((this.status = n),
        (this.statusText = i || ''),
        (this.internal = u),
        c instanceof Error ? ((this.data = c.toString()), (this.error = c)) : (this.data = c));
    }
  };
function Jv(n) {
  return (
    n != null &&
    typeof n.status == 'number' &&
    typeof n.statusText == 'string' &&
    typeof n.internal == 'boolean' &&
    'data' in n
  );
}
function Wv(n) {
  let i = n.map((c) => c.route.path).filter(Boolean);
  return il(i) || '/';
}
var Lh =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
function qh(n, i) {
  let c = n;
  if (typeof c != 'string' || !$v.test(c)) return { absoluteURL: void 0, isExternal: !1, to: c };
  let u = c,
    r = !1;
  if (Lh)
    try {
      let f = new URL(window.location.href),
        m = c.startsWith('//') ? new URL(f.protocol + c) : new URL(c),
        h = Ll(m.pathname, i);
      m.origin === f.origin && h != null ? (c = h + m.search + m.hash) : (r = !0);
    } catch {
      sl(
        !1,
        `<Link to="${c}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: u, isExternal: r, to: c };
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
var Uh = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(Uh);
var Fv = ['GET', ...Uh];
new Set(Fv);
var wa = E.createContext(null);
wa.displayName = 'DataRouter';
var gu = E.createContext(null);
gu.displayName = 'DataRouterState';
var Hh = E.createContext(!1);
function Pv() {
  return E.useContext(Hh);
}
var Gh = E.createContext({ isTransitioning: !1 });
Gh.displayName = 'ViewTransition';
var e0 = E.createContext(new Map());
e0.displayName = 'Fetchers';
var t0 = E.createContext(null);
t0.displayName = 'Await';
var Ut = E.createContext(null);
Ut.displayName = 'Navigation';
var Oi = E.createContext(null);
Oi.displayName = 'Location';
var cl = E.createContext({ outlet: null, matches: [], isDataRoute: !1 });
cl.displayName = 'Route';
var Er = E.createContext(null);
Er.displayName = 'RouteError';
var Ih = 'REACT_ROUTER_ERROR',
  l0 = 'REDIRECT',
  n0 = 'ROUTE_ERROR_RESPONSE';
function a0(n) {
  if (n.startsWith(`${Ih}:${l0}:{`))
    try {
      let i = JSON.parse(n.slice(28));
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
function i0(n) {
  if (n.startsWith(`${Ih}:${n0}:{`))
    try {
      let i = JSON.parse(n.slice(40));
      if (
        typeof i == 'object' &&
        i &&
        typeof i.status == 'number' &&
        typeof i.statusText == 'string'
      )
        return new Zv(i.status, i.statusText, i.data);
    } catch {}
}
function s0(n, { relative: i } = {}) {
  Qe(Ca(), 'useHref() may be used only in the context of a <Router> component.');
  let { basename: c, navigator: u } = E.useContext(Ut),
    { hash: r, pathname: f, search: m } = Di(n, { relative: i }),
    h = f;
  return (
    c !== '/' && (h = f === '/' ? c : il([c, f])),
    u.createHref({ pathname: h, search: m, hash: r })
  );
}
function Ca() {
  return E.useContext(Oi) != null;
}
function hl() {
  return (
    Qe(Ca(), 'useLocation() may be used only in the context of a <Router> component.'),
    E.useContext(Oi).location
  );
}
var $h =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function Yh(n) {
  E.useContext(Ut).static || E.useLayoutEffect(n);
}
function ol() {
  let { isDataRoute: n } = E.useContext(cl);
  return n ? b0() : u0();
}
function u0() {
  Qe(Ca(), 'useNavigate() may be used only in the context of a <Router> component.');
  let n = E.useContext(wa),
    { basename: i, navigator: c } = E.useContext(Ut),
    { matches: u } = E.useContext(cl),
    { pathname: r } = hl(),
    f = JSON.stringify(Tr(u)),
    m = E.useRef(!1);
  return (
    Yh(() => {
      m.current = !0;
    }),
    E.useCallback(
      (y, g = {}) => {
        if ((sl(m.current, $h), !m.current)) return;
        if (typeof y == 'number') {
          c.go(y);
          return;
        }
        let v = _u(y, JSON.parse(f), r, g.relative === 'path');
        (n == null && i !== '/' && (v.pathname = v.pathname === '/' ? i : il([i, v.pathname])),
          (g.replace ? c.replace : c.push)(v, g.state, g));
      },
      [i, c, f, r, n]
    )
  );
}
E.createContext(null);
function c0() {
  let { matches: n } = E.useContext(cl),
    i = n[n.length - 1];
  return (i == null ? void 0 : i.params) ?? {};
}
function Di(n, { relative: i } = {}) {
  let { matches: c } = E.useContext(cl),
    { pathname: u } = hl(),
    r = JSON.stringify(Tr(c));
  return E.useMemo(() => _u(n, JSON.parse(r), u, i === 'path'), [n, r, u, i]);
}
function o0(n, i) {
  return Xh(n, i);
}
function Xh(n, i, c) {
  var A;
  Qe(Ca(), 'useRoutes() may be used only in the context of a <Router> component.');
  let { navigator: u } = E.useContext(Ut),
    { matches: r } = E.useContext(cl),
    f = r[r.length - 1],
    m = f ? f.params : {},
    h = f ? f.pathname : '/',
    y = f ? f.pathnameBase : '/',
    g = f && f.route;
  {
    let w = (g && g.path) || '';
    Qh(
      h,
      !g || w.endsWith('*') || w.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${w}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${w}"> to <Route path="${w === '/' ? '*' : `${w}/*`}">.`
    );
  }
  let v = hl(),
    b;
  if (i) {
    let w = typeof i == 'string' ? Na(i) : i;
    (Qe(
      y === '/' || ((A = w.pathname) == null ? void 0 : A.startsWith(y)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${y}" but pathname "${w.pathname}" was given in the \`location\` prop.`
    ),
      (b = w));
  } else b = v;
  let k = b.pathname || '/',
    j = k;
  if (y !== '/') {
    let w = y.replace(/^\//, '').split('/');
    j = '/' + k.replace(/^\//, '').split('/').slice(w.length).join('/');
  }
  let S = Oh(n, { pathname: j });
  (sl(g || S != null, `No routes matched location "${b.pathname}${b.search}${b.hash}" `),
    sl(
      S == null ||
        S[S.length - 1].route.element !== void 0 ||
        S[S.length - 1].route.Component !== void 0 ||
        S[S.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${b.pathname}${b.search}${b.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let R = p0(
    S &&
      S.map((w) =>
        Object.assign({}, w, {
          params: Object.assign({}, m, w.params),
          pathname: il([
            y,
            u.encodeLocation
              ? u.encodeLocation(
                  w.pathname.replace(/%/g, '%25').replace(/\?/g, '%3F').replace(/#/g, '%23')
                ).pathname
              : w.pathname,
          ]),
          pathnameBase:
            w.pathnameBase === '/'
              ? y
              : il([
                  y,
                  u.encodeLocation
                    ? u.encodeLocation(
                        w.pathnameBase
                          .replace(/%/g, '%25')
                          .replace(/\?/g, '%3F')
                          .replace(/#/g, '%23')
                      ).pathname
                    : w.pathnameBase,
                ]),
        })
      ),
    r,
    c
  );
  return i && R
    ? E.createElement(
        Oi.Provider,
        {
          value: {
            location: {
              pathname: '/',
              search: '',
              hash: '',
              state: null,
              key: 'default',
              unstable_mask: void 0,
              ...b,
            },
            navigationType: 'POP',
          },
        },
        R
      )
    : R;
}
function r0() {
  let n = v0(),
    i = Jv(n) ? `${n.status} ${n.statusText}` : n instanceof Error ? n.message : JSON.stringify(n),
    c = n instanceof Error ? n.stack : null,
    u = 'rgba(200,200,200, 0.5)',
    r = { padding: '0.5rem', backgroundColor: u },
    f = { padding: '2px 4px', backgroundColor: u },
    m = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', n),
    (m = E.createElement(
      E.Fragment,
      null,
      E.createElement('p', null, '💿 Hey developer 👋'),
      E.createElement(
        'p',
        null,
        'You can provide a way better UX than this when your app throws errors by providing your own ',
        E.createElement('code', { style: f }, 'ErrorBoundary'),
        ' or',
        ' ',
        E.createElement('code', { style: f }, 'errorElement'),
        ' prop on your route.'
      )
    )),
    E.createElement(
      E.Fragment,
      null,
      E.createElement('h2', null, 'Unexpected Application Error!'),
      E.createElement('h3', { style: { fontStyle: 'italic' } }, i),
      c ? E.createElement('pre', { style: r }, c) : null,
      m
    )
  );
}
var f0 = E.createElement(r0, null),
  Vh = class extends E.Component {
    constructor(n) {
      (super(n),
        (this.state = { location: n.location, revalidation: n.revalidation, error: n.error }));
    }
    static getDerivedStateFromError(n) {
      return { error: n };
    }
    static getDerivedStateFromProps(n, i) {
      return i.location !== n.location || (i.revalidation !== 'idle' && n.revalidation === 'idle')
        ? { error: n.error, location: n.location, revalidation: n.revalidation }
        : {
            error: n.error !== void 0 ? n.error : i.error,
            location: i.location,
            revalidation: n.revalidation || i.revalidation,
          };
    }
    componentDidCatch(n, i) {
      this.props.onError
        ? this.props.onError(n, i)
        : console.error('React Router caught the following error during render', n);
    }
    render() {
      let n = this.state.error;
      if (
        this.context &&
        typeof n == 'object' &&
        n &&
        'digest' in n &&
        typeof n.digest == 'string'
      ) {
        const c = i0(n.digest);
        c && (n = c);
      }
      let i =
        n !== void 0
          ? E.createElement(
              cl.Provider,
              { value: this.props.routeContext },
              E.createElement(Er.Provider, { value: n, children: this.props.component })
            )
          : this.props.children;
      return this.context ? E.createElement(d0, { error: n }, i) : i;
    }
  };
Vh.contextType = Hh;
var Jo = new WeakMap();
function d0({ children: n, error: i }) {
  let { basename: c } = E.useContext(Ut);
  if (typeof i == 'object' && i && 'digest' in i && typeof i.digest == 'string') {
    let u = a0(i.digest);
    if (u) {
      let r = Jo.get(i);
      if (r) throw r;
      let f = qh(u.location, c);
      if (Lh && !Jo.get(i))
        if (f.isExternal || u.reloadDocument) window.location.href = f.absoluteURL || f.to;
        else {
          const m = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(f.to, { replace: u.replace })
          );
          throw (Jo.set(i, m), m);
        }
      return E.createElement('meta', {
        httpEquiv: 'refresh',
        content: `0;url=${f.absoluteURL || f.to}`,
      });
    }
  }
  return n;
}
function m0({ routeContext: n, match: i, children: c }) {
  let u = E.useContext(wa);
  return (
    u &&
      u.static &&
      u.staticContext &&
      (i.route.errorElement || i.route.ErrorBoundary) &&
      (u.staticContext._deepestRenderedBoundaryId = i.route.id),
    E.createElement(cl.Provider, { value: n }, c)
  );
}
function p0(n, i = [], c) {
  let u = c == null ? void 0 : c.state;
  if (n == null) {
    if (!u) return null;
    if (u.errors) n = u.matches;
    else if (i.length === 0 && !u.initialized && u.matches.length > 0) n = u.matches;
    else return null;
  }
  let r = n,
    f = u == null ? void 0 : u.errors;
  if (f != null) {
    let v = r.findIndex((b) => b.route.id && (f == null ? void 0 : f[b.route.id]) !== void 0);
    (Qe(
      v >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(f).join(',')}`
    ),
      (r = r.slice(0, Math.min(r.length, v + 1))));
  }
  let m = !1,
    h = -1;
  if (c && u) {
    m = u.renderFallback;
    for (let v = 0; v < r.length; v++) {
      let b = r[v];
      if (((b.route.HydrateFallback || b.route.hydrateFallbackElement) && (h = v), b.route.id)) {
        let { loaderData: k, errors: j } = u,
          S = b.route.loader && !k.hasOwnProperty(b.route.id) && (!j || j[b.route.id] === void 0);
        if (b.route.lazy || S) {
          (c.isStatic && (m = !0), h >= 0 ? (r = r.slice(0, h + 1)) : (r = [r[0]]));
          break;
        }
      }
    }
  }
  let y = c == null ? void 0 : c.onError,
    g =
      u && y
        ? (v, b) => {
            var k, j;
            y(v, {
              location: u.location,
              params:
                ((j = (k = u.matches) == null ? void 0 : k[0]) == null ? void 0 : j.params) ?? {},
              unstable_pattern: Wv(u.matches),
              errorInfo: b,
            });
          }
        : void 0;
  return r.reduceRight((v, b, k) => {
    let j,
      S = !1,
      R = null,
      A = null;
    u &&
      ((j = f && b.route.id ? f[b.route.id] : void 0),
      (R = b.route.errorElement || f0),
      m &&
        (h < 0 && k === 0
          ? (Qh(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration'
            ),
            (S = !0),
            (A = null))
          : h === k && ((S = !0), (A = b.route.hydrateFallbackElement || null))));
    let w = i.concat(r.slice(0, k + 1)),
      T = () => {
        let V;
        return (
          j
            ? (V = R)
            : S
              ? (V = A)
              : b.route.Component
                ? (V = E.createElement(b.route.Component, null))
                : b.route.element
                  ? (V = b.route.element)
                  : (V = v),
          E.createElement(m0, {
            match: b,
            routeContext: { outlet: v, matches: w, isDataRoute: u != null },
            children: V,
          })
        );
      };
    return u && (b.route.ErrorBoundary || b.route.errorElement || k === 0)
      ? E.createElement(Vh, {
          location: u.location,
          revalidation: u.revalidation,
          component: R,
          error: j,
          children: T(),
          routeContext: { outlet: null, matches: w, isDataRoute: !0 },
          onError: g,
        })
      : T();
  }, null);
}
function Nr(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function h0(n) {
  let i = E.useContext(wa);
  return (Qe(i, Nr(n)), i);
}
function _0(n) {
  let i = E.useContext(gu);
  return (Qe(i, Nr(n)), i);
}
function g0(n) {
  let i = E.useContext(cl);
  return (Qe(i, Nr(n)), i);
}
function wr(n) {
  let i = g0(n),
    c = i.matches[i.matches.length - 1];
  return (Qe(c.route.id, `${n} can only be used on routes that contain a unique "id"`), c.route.id);
}
function y0() {
  return wr('useRouteId');
}
function v0() {
  var u;
  let n = E.useContext(Er),
    i = _0('useRouteError'),
    c = wr('useRouteError');
  return n !== void 0 ? n : (u = i.errors) == null ? void 0 : u[c];
}
function b0() {
  let { router: n } = h0('useNavigate'),
    i = wr('useNavigate'),
    c = E.useRef(!1);
  return (
    Yh(() => {
      c.current = !0;
    }),
    E.useCallback(
      async (r, f = {}) => {
        (sl(c.current, $h),
          c.current &&
            (typeof r == 'number'
              ? await n.navigate(r)
              : await n.navigate(r, { fromRouteId: i, ...f })));
      },
      [n, i]
    )
  );
}
var ch = {};
function Qh(n, i, c) {
  !i && !ch[n] && ((ch[n] = !0), sl(!1, c));
}
E.memo(S0);
function S0({ routes: n, future: i, state: c, isStatic: u, onError: r }) {
  return Xh(n, void 0, { state: c, isStatic: u, onError: r });
}
function ul({ to: n, replace: i, state: c, relative: u }) {
  Qe(Ca(), '<Navigate> may be used only in the context of a <Router> component.');
  let { static: r } = E.useContext(Ut);
  sl(
    !r,
    '<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.'
  );
  let { matches: f } = E.useContext(cl),
    { pathname: m } = hl(),
    h = ol(),
    y = _u(n, Tr(f), m, u === 'path'),
    g = JSON.stringify(y);
  return (
    E.useEffect(() => {
      h(JSON.parse(g), { replace: i, state: c, relative: u });
    }, [h, g, u, i, c]),
    null
  );
}
function Wt(n) {
  Qe(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  );
}
function k0({
  basename: n = '/',
  children: i = null,
  location: c,
  navigationType: u = 'POP',
  navigator: r,
  static: f = !1,
  unstable_useTransitions: m,
}) {
  Qe(
    !Ca(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  let h = n.replace(/^\/*/, '/'),
    y = E.useMemo(
      () => ({ basename: h, navigator: r, static: f, unstable_useTransitions: m, future: {} }),
      [h, r, f, m]
    );
  typeof c == 'string' && (c = Na(c));
  let {
      pathname: g = '/',
      search: v = '',
      hash: b = '',
      state: k = null,
      key: j = 'default',
      unstable_mask: S,
    } = c,
    R = E.useMemo(() => {
      let A = Ll(g, h);
      return A == null
        ? null
        : {
            location: { pathname: A, search: v, hash: b, state: k, key: j, unstable_mask: S },
            navigationType: u,
          };
    }, [h, g, v, b, k, j, u, S]);
  return (
    sl(
      R != null,
      `<Router basename="${h}"> is not able to match the URL "${g}${v}${b}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    R == null
      ? null
      : E.createElement(
          Ut.Provider,
          { value: y },
          E.createElement(Oi.Provider, { children: i, value: R })
        )
  );
}
function x0({ children: n, location: i }) {
  return o0(rr(n), i);
}
function rr(n, i = []) {
  let c = [];
  return (
    E.Children.forEach(n, (u, r) => {
      if (!E.isValidElement(u)) return;
      let f = [...i, r];
      if (u.type === E.Fragment) {
        c.push.apply(c, rr(u.props.children, f));
        return;
      }
      (Qe(
        u.type === Wt,
        `[${typeof u.type == 'string' ? u.type : u.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Qe(!u.props.index || !u.props.children, 'An index route cannot have child routes.'));
      let m = {
        id: u.props.id || f.join('-'),
        caseSensitive: u.props.caseSensitive,
        element: u.props.element,
        Component: u.props.Component,
        index: u.props.index,
        path: u.props.path,
        middleware: u.props.middleware,
        loader: u.props.loader,
        action: u.props.action,
        hydrateFallbackElement: u.props.hydrateFallbackElement,
        HydrateFallback: u.props.HydrateFallback,
        errorElement: u.props.errorElement,
        ErrorBoundary: u.props.ErrorBoundary,
        hasErrorBoundary:
          u.props.hasErrorBoundary === !0 ||
          u.props.ErrorBoundary != null ||
          u.props.errorElement != null,
        shouldRevalidate: u.props.shouldRevalidate,
        handle: u.props.handle,
        lazy: u.props.lazy,
      };
      (u.props.children && (m.children = rr(u.props.children, f)), c.push(m));
    }),
    c
  );
}
var iu = 'get',
  su = 'application/x-www-form-urlencoded';
function yu(n) {
  return typeof HTMLElement < 'u' && n instanceof HTMLElement;
}
function T0(n) {
  return yu(n) && n.tagName.toLowerCase() === 'button';
}
function E0(n) {
  return yu(n) && n.tagName.toLowerCase() === 'form';
}
function N0(n) {
  return yu(n) && n.tagName.toLowerCase() === 'input';
}
function w0(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function C0(n, i) {
  return n.button === 0 && (!i || i === '_self') && !w0(n);
}
var Ps = null;
function A0() {
  if (Ps === null)
    try {
      (new FormData(document.createElement('form'), 0), (Ps = !1));
    } catch {
      Ps = !0;
    }
  return Ps;
}
var j0 = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
function Wo(n) {
  return n != null && !j0.has(n)
    ? (sl(
        !1,
        `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${su}"`
      ),
      null)
    : n;
}
function M0(n, i) {
  let c, u, r, f, m;
  if (E0(n)) {
    let h = n.getAttribute('action');
    ((u = h ? Ll(h, i) : null),
      (c = n.getAttribute('method') || iu),
      (r = Wo(n.getAttribute('enctype')) || su),
      (f = new FormData(n)));
  } else if (T0(n) || (N0(n) && (n.type === 'submit' || n.type === 'image'))) {
    let h = n.form;
    if (h == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let y = n.getAttribute('formaction') || h.getAttribute('action');
    if (
      ((u = y ? Ll(y, i) : null),
      (c = n.getAttribute('formmethod') || h.getAttribute('method') || iu),
      (r = Wo(n.getAttribute('formenctype')) || Wo(h.getAttribute('enctype')) || su),
      (f = new FormData(h, n)),
      !A0())
    ) {
      let { name: g, type: v, value: b } = n;
      if (v === 'image') {
        let k = g ? `${g}.` : '';
        (f.append(`${k}x`, '0'), f.append(`${k}y`, '0'));
      } else g && f.append(g, b);
    }
  } else {
    if (yu(n))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((c = iu), (u = null), (r = su), (m = n));
  }
  return (
    f && r === 'text/plain' && ((m = f), (f = void 0)),
    { action: u, method: c.toLowerCase(), encType: r, formData: f, body: m }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function Cr(n, i) {
  if (n === !1 || n === null || typeof n > 'u') throw new Error(i);
}
function Kh(n, i, c, u) {
  let r =
    typeof n == 'string'
      ? new URL(n, typeof window > 'u' ? 'server://singlefetch/' : window.location.origin)
      : n;
  return (
    c
      ? r.pathname.endsWith('/')
        ? (r.pathname = `${r.pathname}_.${u}`)
        : (r.pathname = `${r.pathname}.${u}`)
      : r.pathname === '/'
        ? (r.pathname = `_root.${u}`)
        : i && Ll(r.pathname, i) === '/'
          ? (r.pathname = `${ou(i)}/_root.${u}`)
          : (r.pathname = `${ou(r.pathname)}.${u}`),
    r
  );
}
async function R0(n, i) {
  if (n.id in i) return i[n.id];
  try {
    let c = await import(n.module);
    return ((i[n.id] = c), c);
  } catch (c) {
    return (
      console.error(`Error loading route module \`${n.module}\`, reloading page...`),
      console.error(c),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function O0(n) {
  return n == null
    ? !1
    : n.href == null
      ? n.rel === 'preload' && typeof n.imageSrcSet == 'string' && typeof n.imageSizes == 'string'
      : typeof n.rel == 'string' && typeof n.href == 'string';
}
async function D0(n, i, c) {
  let u = await Promise.all(
    n.map(async (r) => {
      let f = i.routes[r.route.id];
      if (f) {
        let m = await R0(f, c);
        return m.links ? m.links() : [];
      }
      return [];
    })
  );
  return q0(
    u
      .flat(1)
      .filter(O0)
      .filter((r) => r.rel === 'stylesheet' || r.rel === 'preload')
      .map((r) =>
        r.rel === 'stylesheet' ? { ...r, rel: 'prefetch', as: 'style' } : { ...r, rel: 'prefetch' }
      )
  );
}
function oh(n, i, c, u, r, f) {
  let m = (y, g) => (c[g] ? y.route.id !== c[g].route.id : !0),
    h = (y, g) => {
      var v;
      return (
        c[g].pathname !== y.pathname ||
        (((v = c[g].route.path) == null ? void 0 : v.endsWith('*')) &&
          c[g].params['*'] !== y.params['*'])
      );
    };
  return f === 'assets'
    ? i.filter((y, g) => m(y, g) || h(y, g))
    : f === 'data'
      ? i.filter((y, g) => {
          var b;
          let v = u.routes[y.route.id];
          if (!v || !v.hasLoader) return !1;
          if (m(y, g) || h(y, g)) return !0;
          if (y.route.shouldRevalidate) {
            let k = y.route.shouldRevalidate({
              currentUrl: new URL(r.pathname + r.search + r.hash, window.origin),
              currentParams: ((b = c[0]) == null ? void 0 : b.params) || {},
              nextUrl: new URL(n, window.origin),
              nextParams: y.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof k == 'boolean') return k;
          }
          return !0;
        })
      : [];
}
function z0(n, i, { includeHydrateFallback: c } = {}) {
  return B0(
    n
      .map((u) => {
        let r = i.routes[u.route.id];
        if (!r) return [];
        let f = [r.module];
        return (
          r.clientActionModule && (f = f.concat(r.clientActionModule)),
          r.clientLoaderModule && (f = f.concat(r.clientLoaderModule)),
          c && r.hydrateFallbackModule && (f = f.concat(r.hydrateFallbackModule)),
          r.imports && (f = f.concat(r.imports)),
          f
        );
      })
      .flat(1)
  );
}
function B0(n) {
  return [...new Set(n)];
}
function L0(n) {
  let i = {},
    c = Object.keys(n).sort();
  for (let u of c) i[u] = n[u];
  return i;
}
function q0(n, i) {
  let c = new Set();
  return (
    new Set(i),
    n.reduce((u, r) => {
      let f = JSON.stringify(L0(r));
      return (c.has(f) || (c.add(f), u.push({ key: f, link: r })), u);
    }, [])
  );
}
function Ar() {
  let n = E.useContext(wa);
  return (Cr(n, 'You must render this element inside a <DataRouterContext.Provider> element'), n);
}
function U0() {
  let n = E.useContext(gu);
  return (
    Cr(n, 'You must render this element inside a <DataRouterStateContext.Provider> element'),
    n
  );
}
var jr = E.createContext(void 0);
jr.displayName = 'FrameworkContext';
function Mr() {
  let n = E.useContext(jr);
  return (Cr(n, 'You must render this element inside a <HydratedRouter> element'), n);
}
function H0(n, i) {
  let c = E.useContext(jr),
    [u, r] = E.useState(!1),
    [f, m] = E.useState(!1),
    { onFocus: h, onBlur: y, onMouseEnter: g, onMouseLeave: v, onTouchStart: b } = i,
    k = E.useRef(null);
  (E.useEffect(() => {
    if ((n === 'render' && m(!0), n === 'viewport')) {
      let R = (w) => {
          w.forEach((T) => {
            m(T.isIntersecting);
          });
        },
        A = new IntersectionObserver(R, { threshold: 0.5 });
      return (
        k.current && A.observe(k.current),
        () => {
          A.disconnect();
        }
      );
    }
  }, [n]),
    E.useEffect(() => {
      if (u) {
        let R = setTimeout(() => {
          m(!0);
        }, 100);
        return () => {
          clearTimeout(R);
        };
      }
    }, [u]));
  let j = () => {
      r(!0);
    },
    S = () => {
      (r(!1), m(!1));
    };
  return c
    ? n !== 'intent'
      ? [f, k, {}]
      : [
          f,
          k,
          {
            onFocus: Ei(h, j),
            onBlur: Ei(y, S),
            onMouseEnter: Ei(g, j),
            onMouseLeave: Ei(v, S),
            onTouchStart: Ei(b, j),
          },
        ]
    : [!1, k, {}];
}
function Ei(n, i) {
  return (c) => {
    (n && n(c), c.defaultPrevented || i(c));
  };
}
function G0({ page: n, ...i }) {
  let c = Pv(),
    { router: u } = Ar(),
    r = E.useMemo(() => Oh(u.routes, n, u.basename), [u.routes, n, u.basename]);
  return r
    ? c
      ? E.createElement($0, { page: n, matches: r, ...i })
      : E.createElement(Y0, { page: n, matches: r, ...i })
    : null;
}
function I0(n) {
  let { manifest: i, routeModules: c } = Mr(),
    [u, r] = E.useState([]);
  return (
    E.useEffect(() => {
      let f = !1;
      return (
        D0(n, i, c).then((m) => {
          f || r(m);
        }),
        () => {
          f = !0;
        }
      );
    }, [n, i, c]),
    u
  );
}
function $0({ page: n, matches: i, ...c }) {
  let u = hl(),
    { future: r } = Mr(),
    { basename: f } = Ar(),
    m = E.useMemo(() => {
      if (n === u.pathname + u.search + u.hash) return [];
      let h = Kh(n, f, r.unstable_trailingSlashAwareDataRequests, 'rsc'),
        y = !1,
        g = [];
      for (let v of i)
        typeof v.route.shouldRevalidate == 'function' ? (y = !0) : g.push(v.route.id);
      return (
        y && g.length > 0 && h.searchParams.set('_routes', g.join(',')),
        [h.pathname + h.search]
      );
    }, [f, r.unstable_trailingSlashAwareDataRequests, n, u, i]);
  return E.createElement(
    E.Fragment,
    null,
    m.map((h) => E.createElement('link', { key: h, rel: 'prefetch', as: 'fetch', href: h, ...c }))
  );
}
function Y0({ page: n, matches: i, ...c }) {
  let u = hl(),
    { future: r, manifest: f, routeModules: m } = Mr(),
    { basename: h } = Ar(),
    { loaderData: y, matches: g } = U0(),
    v = E.useMemo(() => oh(n, i, g, f, u, 'data'), [n, i, g, f, u]),
    b = E.useMemo(() => oh(n, i, g, f, u, 'assets'), [n, i, g, f, u]),
    k = E.useMemo(() => {
      if (n === u.pathname + u.search + u.hash) return [];
      let R = new Set(),
        A = !1;
      if (
        (i.forEach((T) => {
          var P;
          let V = f.routes[T.route.id];
          !V ||
            !V.hasLoader ||
            ((!v.some((ee) => ee.route.id === T.route.id) &&
              T.route.id in y &&
              (P = m[T.route.id]) != null &&
              P.shouldRevalidate) ||
            V.hasClientLoader
              ? (A = !0)
              : R.add(T.route.id));
        }),
        R.size === 0)
      )
        return [];
      let w = Kh(n, h, r.unstable_trailingSlashAwareDataRequests, 'data');
      return (
        A &&
          R.size > 0 &&
          w.searchParams.set(
            '_routes',
            i
              .filter((T) => R.has(T.route.id))
              .map((T) => T.route.id)
              .join(',')
          ),
        [w.pathname + w.search]
      );
    }, [h, r.unstable_trailingSlashAwareDataRequests, y, u, f, v, i, n, m]),
    j = E.useMemo(() => z0(b, f), [b, f]),
    S = I0(b);
  return E.createElement(
    E.Fragment,
    null,
    k.map((R) => E.createElement('link', { key: R, rel: 'prefetch', as: 'fetch', href: R, ...c })),
    j.map((R) => E.createElement('link', { key: R, rel: 'modulepreload', href: R, ...c })),
    S.map(({ key: R, link: A }) =>
      E.createElement('link', {
        key: R,
        nonce: c.nonce,
        ...A,
        crossOrigin: A.crossOrigin ?? c.crossOrigin,
      })
    )
  );
}
function X0(...n) {
  return (i) => {
    n.forEach((c) => {
      typeof c == 'function' ? c(i) : c != null && (c.current = i);
    });
  };
}
var V0 =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
try {
  V0 && (window.__reactRouterVersion = '7.14.2');
} catch {}
function Q0({ basename: n, children: i, unstable_useTransitions: c, window: u }) {
  let r = E.useRef();
  r.current == null && (r.current = Nv({ window: u, v5Compat: !0 }));
  let f = r.current,
    [m, h] = E.useState({ action: f.action, location: f.location }),
    y = E.useCallback(
      (g) => {
        c === !1 ? h(g) : E.startTransition(() => h(g));
      },
      [c]
    );
  return (
    E.useLayoutEffect(() => f.listen(y), [f, y]),
    E.createElement(k0, {
      basename: n,
      children: i,
      location: m.location,
      navigationType: m.action,
      navigator: f,
      unstable_useTransitions: c,
    })
  );
}
var Zh = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Jh = E.forwardRef(function (
    {
      onClick: i,
      discover: c = 'render',
      prefetch: u = 'none',
      relative: r,
      reloadDocument: f,
      replace: m,
      unstable_mask: h,
      state: y,
      target: g,
      to: v,
      preventScrollReset: b,
      viewTransition: k,
      unstable_defaultShouldRevalidate: j,
      ...S
    },
    R
  ) {
    let { basename: A, navigator: w, unstable_useTransitions: T } = E.useContext(Ut),
      V = typeof v == 'string' && Zh.test(v),
      P = qh(v, A);
    v = P.to;
    let ee = s0(v, { relative: r }),
      X = hl(),
      H = null;
    if (h) {
      let pe = _u(h, [], X.unstable_mask ? X.unstable_mask.pathname : '/', !0);
      (A !== '/' && (pe.pathname = pe.pathname === '/' ? A : il([A, pe.pathname])),
        (H = w.createHref(pe)));
    }
    let [q, Q, te] = H0(u, S),
      se = W0(v, {
        replace: m,
        unstable_mask: h,
        state: y,
        target: g,
        preventScrollReset: b,
        relative: r,
        viewTransition: k,
        unstable_defaultShouldRevalidate: j,
        unstable_useTransitions: T,
      });
    function ce(pe) {
      (i && i(pe), pe.defaultPrevented || se(pe));
    }
    let Z = !(P.isExternal || f),
      J = E.createElement('a', {
        ...S,
        ...te,
        href: (Z ? H : void 0) || P.absoluteURL || ee,
        onClick: Z ? ce : i,
        ref: X0(R, Q),
        target: g,
        'data-discover': !V && c === 'render' ? 'true' : void 0,
      });
    return q && !V ? E.createElement(E.Fragment, null, J, E.createElement(G0, { page: ee })) : J;
  });
Jh.displayName = 'Link';
var K0 = E.forwardRef(function (
  {
    'aria-current': i = 'page',
    caseSensitive: c = !1,
    className: u = '',
    end: r = !1,
    style: f,
    to: m,
    viewTransition: h,
    children: y,
    ...g
  },
  v
) {
  let b = Di(m, { relative: g.relative }),
    k = hl(),
    j = E.useContext(gu),
    { navigator: S, basename: R } = E.useContext(Ut),
    A = j != null && lb(b) && h === !0,
    w = S.encodeLocation ? S.encodeLocation(b).pathname : b.pathname,
    T = k.pathname,
    V = j && j.navigation && j.navigation.location ? j.navigation.location.pathname : null;
  (c || ((T = T.toLowerCase()), (V = V ? V.toLowerCase() : null), (w = w.toLowerCase())),
    V && R && (V = Ll(V, R) || V));
  const P = w !== '/' && w.endsWith('/') ? w.length - 1 : w.length;
  let ee = T === w || (!r && T.startsWith(w) && T.charAt(P) === '/'),
    X = V != null && (V === w || (!r && V.startsWith(w) && V.charAt(w.length) === '/')),
    H = { isActive: ee, isPending: X, isTransitioning: A },
    q = ee ? i : void 0,
    Q;
  typeof u == 'function'
    ? (Q = u(H))
    : (Q = [u, ee ? 'active' : null, X ? 'pending' : null, A ? 'transitioning' : null]
        .filter(Boolean)
        .join(' '));
  let te = typeof f == 'function' ? f(H) : f;
  return E.createElement(
    Jh,
    { ...g, 'aria-current': q, className: Q, ref: v, style: te, to: m, viewTransition: h },
    typeof y == 'function' ? y(H) : y
  );
});
K0.displayName = 'NavLink';
var Z0 = E.forwardRef(
  (
    {
      discover: n = 'render',
      fetcherKey: i,
      navigate: c,
      reloadDocument: u,
      replace: r,
      state: f,
      method: m = iu,
      action: h,
      onSubmit: y,
      relative: g,
      preventScrollReset: v,
      viewTransition: b,
      unstable_defaultShouldRevalidate: k,
      ...j
    },
    S
  ) => {
    let { unstable_useTransitions: R } = E.useContext(Ut),
      A = eb(),
      w = tb(h, { relative: g }),
      T = m.toLowerCase() === 'get' ? 'get' : 'post',
      V = typeof h == 'string' && Zh.test(h),
      P = (ee) => {
        if ((y && y(ee), ee.defaultPrevented)) return;
        ee.preventDefault();
        let X = ee.nativeEvent.submitter,
          H = (X == null ? void 0 : X.getAttribute('formmethod')) || m,
          q = () =>
            A(X || ee.currentTarget, {
              fetcherKey: i,
              method: H,
              navigate: c,
              replace: r,
              state: f,
              relative: g,
              preventScrollReset: v,
              viewTransition: b,
              unstable_defaultShouldRevalidate: k,
            });
        R && c !== !1 ? E.startTransition(() => q()) : q();
      };
    return E.createElement('form', {
      ref: S,
      method: T,
      action: w,
      onSubmit: u ? y : P,
      ...j,
      'data-discover': !V && n === 'render' ? 'true' : void 0,
    });
  }
);
Z0.displayName = 'Form';
function J0(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Wh(n) {
  let i = E.useContext(wa);
  return (Qe(i, J0(n)), i);
}
function W0(
  n,
  {
    target: i,
    replace: c,
    unstable_mask: u,
    state: r,
    preventScrollReset: f,
    relative: m,
    viewTransition: h,
    unstable_defaultShouldRevalidate: y,
    unstable_useTransitions: g,
  } = {}
) {
  let v = ol(),
    b = hl(),
    k = Di(n, { relative: m });
  return E.useCallback(
    (j) => {
      if (C0(j, i)) {
        j.preventDefault();
        let S = c !== void 0 ? c : ji(b) === ji(k),
          R = () =>
            v(n, {
              replace: S,
              unstable_mask: u,
              state: r,
              preventScrollReset: f,
              relative: m,
              viewTransition: h,
              unstable_defaultShouldRevalidate: y,
            });
        g ? E.startTransition(() => R()) : R();
      }
    },
    [b, v, k, c, u, r, i, n, f, m, h, y, g]
  );
}
var F0 = 0,
  P0 = () => `__${String(++F0)}__`;
function eb() {
  let { router: n } = Wh('useSubmit'),
    { basename: i } = E.useContext(Ut),
    c = y0(),
    u = n.fetch,
    r = n.navigate;
  return E.useCallback(
    async (f, m = {}) => {
      let { action: h, method: y, encType: g, formData: v, body: b } = M0(f, i);
      if (m.navigate === !1) {
        let k = m.fetcherKey || P0();
        await u(k, c, m.action || h, {
          unstable_defaultShouldRevalidate: m.unstable_defaultShouldRevalidate,
          preventScrollReset: m.preventScrollReset,
          formData: v,
          body: b,
          formMethod: m.method || y,
          formEncType: m.encType || g,
          flushSync: m.flushSync,
        });
      } else
        await r(m.action || h, {
          unstable_defaultShouldRevalidate: m.unstable_defaultShouldRevalidate,
          preventScrollReset: m.preventScrollReset,
          formData: v,
          body: b,
          formMethod: m.method || y,
          formEncType: m.encType || g,
          replace: m.replace,
          state: m.state,
          fromRouteId: c,
          flushSync: m.flushSync,
          viewTransition: m.viewTransition,
        });
    },
    [u, r, i, c]
  );
}
function tb(n, { relative: i } = {}) {
  let { basename: c } = E.useContext(Ut),
    u = E.useContext(cl);
  Qe(u, 'useFormAction must be used inside a RouteContext');
  let [r] = u.matches.slice(-1),
    f = { ...Di(n || '.', { relative: i }) },
    m = hl();
  if (n == null) {
    f.search = m.search;
    let h = new URLSearchParams(f.search),
      y = h.getAll('index');
    if (y.some((v) => v === '')) {
      (h.delete('index'), y.filter((b) => b).forEach((b) => h.append('index', b)));
      let v = h.toString();
      f.search = v ? `?${v}` : '';
    }
  }
  return (
    (!n || n === '.') &&
      r.route.index &&
      (f.search = f.search ? f.search.replace(/^\?/, '?index&') : '?index'),
    c !== '/' && (f.pathname = f.pathname === '/' ? c : il([c, f.pathname])),
    ji(f)
  );
}
function lb(n, { relative: i } = {}) {
  let c = E.useContext(Gh);
  Qe(
    c != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: u } = Wh('useViewTransitionState'),
    r = Di(n, { relative: i });
  if (!c.isTransitioning) return !1;
  let f = Ll(c.currentLocation.pathname, u) || c.currentLocation.pathname,
    m = Ll(c.nextLocation.pathname, u) || c.nextLocation.pathname;
  return cu(r.pathname, m) != null || cu(r.pathname, f) != null;
}
const nb = '_layout_mn6ug_1',
  ab = '_enemies_mn6ug_12',
  ib = '_enemy_mn6ug_20',
  sb = '_targeted_mn6ug_35',
  ub = '_enemyName_mn6ug_39',
  cb = '_down_mn6ug_44',
  ob = '_log_mn6ug_48',
  rb = '_logLine_mn6ug_60',
  fb = '_party_mn6ug_64',
  db = '_rowTag_mn6ug_71',
  mb = '_cardRow_mn6ug_77',
  pb = '_card_mn6ug_77',
  hb = '_cardActive_mn6ug_99',
  _b = '_cardDecided_mn6ug_104',
  gb = '_cardName_mn6ug_108',
  yb = '_uni_mn6ug_116',
  vb = '_summons_mn6ug_120',
  bb = '_summon_mn6ug_120',
  Sb = '_summonName_mn6ug_138',
  kb = '_summonHp_mn6ug_147',
  xb = '_cardNums_mn6ug_153',
  Tb = '_cardCmd_mn6ug_159',
  Eb = '_empty_mn6ug_165',
  Nb = '_command_mn6ug_170',
  wb = '_skillList_mn6ug_176',
  Cb = '_skillBtn_mn6ug_182',
  Ab = '_skillTop_mn6ug_194',
  jb = '_skillName_mn6ug_201',
  Mb = '_skillDesc_mn6ug_206',
  Rb = '_target_mn6ug_35',
  Ob = '_unionBanner_mn6ug_217',
  Db = '_unionCancel_mn6ug_231',
  zb = '_unionHint_mn6ug_240',
  Bb = '_unionBtn_mn6ug_246',
  Lb = '_cmdHead_mn6ug_252',
  qb = '_menu_mn6ug_257',
  Ub = '_menuBtn_mn6ug_263',
  Hb = '_tp_mn6ug_280',
  Gb = '_menuBack_mn6ug_286',
  Ib = '_execRow_mn6ug_296',
  $b = '_redo_mn6ug_301',
  Yb = '_primary_mn6ug_311',
  Xb = '_result_mn6ug_326',
  Vb = '_resultTitle_mn6ug_337',
  Qb = '_resultBody_mn6ug_342',
  F = {
    layout: nb,
    enemies: ab,
    enemy: ib,
    targeted: sb,
    enemyName: ub,
    down: cb,
    log: ob,
    logLine: rb,
    party: fb,
    rowTag: db,
    cardRow: mb,
    card: pb,
    cardActive: hb,
    cardDecided: _b,
    cardName: gb,
    uni: yb,
    summons: vb,
    summon: bb,
    summonName: Sb,
    summonHp: kb,
    cardNums: xb,
    cardCmd: Tb,
    empty: Eb,
    command: Nb,
    skillList: wb,
    skillBtn: Cb,
    skillTop: Ab,
    skillName: jb,
    skillDesc: Mb,
    target: Rb,
    unionBanner: Ob,
    unionCancel: Db,
    unionHint: zb,
    unionBtn: Bb,
    cmdHead: Lb,
    menu: qb,
    menuBtn: Ub,
    tp: Hb,
    menuBack: Gb,
    execRow: Ib,
    redo: $b,
    primary: Yb,
    result: Xb,
    resultTitle: Vb,
    resultBody: Qb,
  },
  Kb = '_row_1t6j7_1',
  Zb = '_label_1t6j7_8',
  Jb = '_track_1t6j7_16',
  Wb = '_fill_1t6j7_24',
  Fb = '_value_1t6j7_30',
  Ni = { row: Kb, label: Zb, track: Jb, fill: Wb, value: Fb },
  eu = ({ value: n, max: i, color: c = '#4caf50', label: u, showValue: r = !0 }) => {
    const f = i > 0 ? Math.max(0, Math.min(100, (n / i) * 100)) : 0;
    return p.jsxs('div', {
      className: Ni.row,
      children: [
        u ? p.jsx('span', { className: Ni.label, children: u }) : null,
        p.jsx('div', {
          className: Ni.track,
          children: p.jsx('div', {
            className: Ni.fill,
            style: { width: `${f}%`, backgroundColor: c },
          }),
        }),
        r
          ? p.jsxs('span', {
              className: Ni.value,
              children: [Math.max(0, Math.round(n)), '/', Math.round(i)],
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
      tpCost: (n) => 3 + n,
      element: 'slash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (n) => 1.4 + 0.2 * n }],
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
          modifier: (n) => 1.2 + 0.05 * n,
          turns: 3,
          stackGroup: 'defBuff',
        },
      ],
    },
    skill_shield_bash: {
      id: 'skill_shield_bash',
      name: 'シールドバッシュ',
      tree: 'base',
      tpCost: (n) => 3 + n,
      element: 'bash',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (n) => 1 + 0.15 * n },
        { kind: 'ailment', ailment: 'paralysis', chance: (n) => 0.2 + 0.05 * n, turns: 2 },
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
        { kind: 'decoy', weight: (n) => 2 + n, turns: 2 },
      ],
    },
    skill_fire_bolt: {
      id: 'skill_fire_bolt',
      name: 'ファイアボルト',
      tree: 'base',
      tpCost: (n) => 4 + n,
      element: 'fire',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (n) => 1.5 + 0.25 * n }],
    },
    skill_ice_bolt: {
      id: 'skill_ice_bolt',
      name: 'アイスボルト',
      tree: 'base',
      tpCost: (n) => 4 + n,
      element: 'ice',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (n) => 1.5 + 0.25 * n }],
    },
    skill_aimed_shot: {
      id: 'skill_aimed_shot',
      name: '狙撃',
      tree: 'base',
      tpCost: (n) => 3 + n,
      element: 'pierce',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (n) => 1.3 + 0.2 * n }],
    },
    skill_spread_shot: {
      id: 'skill_spread_shot',
      name: '拡散射撃',
      tree: 'base',
      tpCost: (n) => 5 + n,
      element: 'pierce',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (n) => 0.8 + 0.12 * n }],
    },
    skill_leg_snipe: {
      id: 'skill_leg_snipe',
      name: '脚封じの矢',
      tree: 'base',
      tpCost: (n) => 4 + n,
      element: 'pierce',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (n) => 1 + 0.15 * n },
        { kind: 'ailment', ailment: 'legBind', chance: (n) => 0.35 + 0.05 * n, turns: 3 },
      ],
    },
    skill_arm_snipe: {
      id: 'skill_arm_snipe',
      name: '腕封じの矢',
      tree: 'base',
      tpCost: (n) => 4 + n,
      element: 'pierce',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (n) => 1 + 0.15 * n },
        { kind: 'ailment', ailment: 'armBind', chance: (n) => 0.35 + 0.05 * n, turns: 3 },
      ],
    },
    skill_head_snipe: {
      id: 'skill_head_snipe',
      name: '頭封じの矢',
      tree: 'base',
      tpCost: (n) => 4 + n,
      element: 'pierce',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (n) => 1 + 0.15 * n },
        { kind: 'ailment', ailment: 'headBind', chance: (n) => 0.35 + 0.05 * n, turns: 3 },
      ],
    },
    skill_summon_wolf: {
      id: 'skill_summon_wolf',
      name: '狼を召喚',
      tree: 'base',
      tpCost: (n) => 6 + n,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_wolf' }],
    },
    skill_summon_bulwark: {
      id: 'skill_summon_bulwark',
      name: '石像を召喚',
      tree: 'base',
      tpCost: (n) => 6 + n,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_bulwark' }],
    },
    skill_summon_familiar: {
      id: 'skill_summon_familiar',
      name: '使い魔を召喚',
      tree: 'base',
      tpCost: (n) => 7 + n,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_familiar' }],
    },
    skill_cleave: {
      id: 'skill_cleave',
      name: 'なぎ払い',
      tree: 'master',
      tpCost: (n) => 5 + n,
      element: 'slash',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (n) => 0.7 + 0.12 * n }],
    },
    skill_volt_bolt: {
      id: 'skill_volt_bolt',
      name: 'ボルトショック',
      tree: 'master',
      tpCost: (n) => 4 + n,
      element: 'volt',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (n) => 1.5 + 0.25 * n }],
    },
    skill_heal: {
      id: 'skill_heal',
      name: 'ヒール',
      tree: 'base',
      tpCost: (n) => 4 + n,
      element: 'almighty',
      target: 'allyOne',
      effects: [{ kind: 'heal', amount: (n) => 40 + 20 * n }],
    },
    skill_mass_heal: {
      id: 'skill_mass_heal',
      name: 'マスヒール',
      tree: 'base',
      tpCost: (n) => 8 + n,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'heal', amount: (n) => 25 + 15 * n }],
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
          modifier: (n) => 1.2 + 0.05 * n,
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
          modifier: (n) => 1.2 + 0.05 * n,
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
          modifier: (n) => 1.2 + 0.05 * n,
          turns: 3,
          stackGroup: 'evaBuff',
        },
      ],
    },
    skill_weaken_song: {
      id: 'skill_weaken_song',
      name: '弱体の歌',
      tree: 'base',
      tpCost: (n) => 6 + n,
      element: 'almighty',
      target: 'enemyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'patk',
          modifier: (n) => 0.85 - 0.03 * n,
          turns: 3,
          stackGroup: 'atkDebuff',
        },
      ],
    },
    skill_triple_strike: {
      id: 'skill_triple_strike',
      name: '三段突き',
      tree: 'base',
      tpCost: (n) => 4 + n,
      element: 'bash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (n) => 0.7 + 0.1 * n, hits: 3 }],
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
          modifier: (n) => 1.3 + 0.05 * n,
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
          modifier: (n) => 1.4 + 0.05 * n,
          turns: 3,
          stackGroup: 'defBuff',
        },
      ],
    },
    skill_venom_hex: {
      id: 'skill_venom_hex',
      name: '毒の呪',
      tree: 'base',
      tpCost: (n) => 5 + n,
      element: 'almighty',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'int', power: (n) => 0.8 + 0.1 * n },
        { kind: 'ailment', ailment: 'poison', chance: (n) => 0.5 + 0.05 * n, turns: 3 },
      ],
    },
    skill_sleep_hex: {
      id: 'skill_sleep_hex',
      name: '眠りの呪',
      tree: 'base',
      tpCost: (n) => 7 + n,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'ailment', ailment: 'sleep', chance: (n) => 0.35 + 0.03 * n, turns: 2 }],
    },
    skill_weaken_hex: {
      id: 'skill_weaken_hex',
      name: '魔弱の呪',
      tree: 'base',
      tpCost: (n) => 5 + n,
      element: 'almighty',
      target: 'enemyOne',
      effects: [
        {
          kind: 'buff',
          stat: 'matk',
          modifier: (n) => 0.8 - 0.03 * n,
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
      effects: [{ kind: 'chase', statBase: 'str', power: (n) => 0.6 + 0.1 * n, turns: 3 }],
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
          chance: (n) => 0.4 + 0.05 * n,
          power: (n) => 1 + 0.1 * n,
          statBase: 'str',
          turns: 3,
        },
      ],
    },
    skill_line_guard: {
      id: 'skill_line_guard',
      name: 'ラインガード',
      tree: 'master',
      tpCost: (n) => 6 + n,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'barrier', absorb: (n) => 30 + 15 * n, turns: 2 }],
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
          chance: (n) => 0.5 + 0.04 * n,
          power: (n) => 1.1 + 0.1 * n,
          statBase: 'str',
          turns: 3,
        },
      ],
    },
    skill_fire_storm: {
      id: 'skill_fire_storm',
      name: 'ファイアストーム',
      tree: 'master',
      tpCost: (n) => 6 + n,
      element: 'fire',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'int', power: (n) => 0.9 + 0.15 * n }],
    },
    skill_first_aid: {
      id: 'skill_first_aid',
      name: '救護指示',
      tree: 'master',
      tpCost: (n) => 4 + n,
      element: 'almighty',
      target: 'allyOne',
      effects: [{ kind: 'heal', amount: (n) => 30 + 15 * n }],
    },
    skill_refresh_herb: {
      id: 'skill_refresh_herb',
      name: 'リフレシュハーブ',
      tree: 'master',
      tpCost: (n) => 5 + n,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'cleanse' }],
    },
    skill_poison_smoke: {
      id: 'skill_poison_smoke',
      name: 'ポイズンスモーク',
      tree: 'master',
      tpCost: (n) => 5 + n,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'ailment', ailment: 'poison', chance: (n) => 0.4 + 0.04 * n, turns: 3 }],
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
          modifier: (n) => 1.2 + 0.05 * n,
          turns: 3,
          stackGroup: 'defBuff',
        },
      ],
    },
    skill_healing_song: {
      id: 'skill_healing_song',
      name: '癒しの歌',
      tree: 'master',
      tpCost: (n) => 6 + n,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'heal', amount: (n) => 18 + 10 * n }],
    },
    skill_arm_break: {
      id: 'skill_arm_break',
      name: 'アームブレイク',
      tree: 'master',
      tpCost: (n) => 4 + n,
      element: 'bash',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (n) => 1 + 0.15 * n },
        { kind: 'ailment', ailment: 'armBind', chance: (n) => 0.4 + 0.05 * n, turns: 3 },
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
          chance: (n) => 0.5 + 0.04 * n,
          power: (n) => 1.3 + 0.1 * n,
          statBase: 'str',
          turns: 3,
        },
      ],
    },
    skill_blind_hex: {
      id: 'skill_blind_hex',
      name: '盲目の呪',
      tree: 'master',
      tpCost: (n) => 6 + n,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'ailment', ailment: 'blind', chance: (n) => 0.35 + 0.03 * n, turns: 3 }],
    },
    skill_armor_hex: {
      id: 'skill_armor_hex',
      name: '鎧弱の呪',
      tree: 'master',
      tpCost: (n) => 5 + n,
      element: 'almighty',
      target: 'enemyOne',
      effects: [
        {
          kind: 'buff',
          stat: 'pdef',
          modifier: (n) => 0.8 - 0.03 * n,
          turns: 3,
          stackGroup: 'pdefDebuff',
        },
      ],
    },
    skill_call_wraith: {
      id: 'skill_call_wraith',
      name: '死霊召喚',
      tree: 'base',
      tpCost: (n) => 6 + n,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_wraith' }],
    },
    skill_soul_barrier: {
      id: 'skill_soul_barrier',
      name: '無慈悲な盾',
      tree: 'base',
      tpCost: (n) => 5 + n,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'barrier', absorb: (n) => 25 + 12 * n, turns: 2 }],
    },
    skill_call_sentinel: {
      id: 'skill_call_sentinel',
      name: '亡者の壁',
      tree: 'master',
      tpCost: (n) => 6 + n,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_revenant' }],
    },
    skill_soul_burst: {
      id: 'skill_soul_burst',
      name: '死霊爆裂',
      tree: 'master',
      tpCost: (n) => 7 + n,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'int', power: (n) => 0.9 + 0.15 * n }],
    },
    skill_cleanse_draft: {
      id: 'skill_cleanse_draft',
      name: '解毒の秘薬',
      tree: 'title',
      tpCost: (n) => 4 + n,
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
          chance: (n) => 0.45 + 0.05 * n,
          power: (n) => 1.2 + 0.1 * n,
          statBase: 'str',
          turns: 3,
        },
      ],
    },
  },
  et = {
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
function Pb(n) {
  return n.category === 'food' ? 0 : n.category === 'material' ? 8 : Math.floor(n.buyPrice / 2);
}
function e1(n) {
  var i;
  return ((i = et[n]) == null ? void 0 : i.category) === 'food';
}
const Pt = {
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
  Rr = {
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
  },
  ka = {
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
        { kind: 'heal', amount: (n) => 60 + 25 * n },
        {
          kind: 'buff',
          stat: 'patk',
          modifier: (n) => 1.2 + 0.05 * n,
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
      effects: [{ kind: 'damage', statBase: 'str', power: (n) => 2.2 + 0.4 * n }],
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
      effects: [{ kind: 'damage', statBase: 'int', power: (n) => 2.4 + 0.5 * n }],
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
      effects: [{ kind: 'damage', statBase: 'str', power: (n) => 1.4 + 0.3 * n, hits: 3 }],
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
        { kind: 'heal', amount: (n) => 55 + 22 * n },
        {
          kind: 'buff',
          stat: 'mdef',
          modifier: (n) => 1.2 + 0.05 * n,
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
      effects: [{ kind: 'damage', statBase: 'str', power: (n) => 2.3 + 0.4 * n }],
    },
  },
  Le = {
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
  t1 = 500,
  fr = 30,
  vu = 3,
  bu = 2,
  l1 = vu + bu,
  wi = { TITLE_DEPTH: 20, REBIRTH_MIN_LEVEL: 30 },
  Fh = 5,
  n1 = 5,
  pl = {
    MAX_LEVEL: 5,
    STAT_PER_LEVEL: 2,
    INGOT_INC: { copper: 1, silver: 3, gold: 5 },
    FRAGMENTS_PER_INGOT: 10,
    RECYCLE_FRAGMENTS: 3,
  },
  Ci = (n) => n > 0 && n % Le.BOSS_INTERVAL === 0,
  rh = (n) => Math.round(Le.EXP_CURVE_BASE * Math.pow(n, Le.EXP_CURVE_POW)),
  Fo = (n) => n < Le.LEVEL_CAP,
  Or = (n, i) => 1 + Le.ENEMY_SCALE_K * (n - i),
  ql = {
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
    },
  },
  ft = {
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
  },
  Aa = {
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
  a1 = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'],
  i1 = ['slash', 'pierce', 'bash'],
  ru = (n, i, c) => Math.max(i, Math.min(c, n));
function Ph(n, i) {
  const c = {};
  for (const u of a1) c[u] = Math.round(n[u] * i);
  return c;
}
function s1(n, i) {
  return Ph(n.baseStats, Or(i, n.refDepth));
}
function ya(n, i) {
  const c = new Map();
  for (const r of n) {
    if (r.stat !== i) continue;
    const f = ru(r.modifier, 0.5, 1.5),
      m = c.get(r.stackGroup);
    (m === void 0 || Math.abs(f - 1) > Math.abs(m - 1)) && c.set(r.stackGroup, f);
  }
  let u = 1;
  for (const r of c.values()) u *= r;
  return ru(u, 0.25, 2);
}
function fh(n, i, c, u) {
  const r = (g) => (u == null ? void 0 : u[g]) ?? 1,
    f = (n.str * 2 + (i.atk ?? 0)) * ya(c, 'patk') * r('patk'),
    m = (n.vit * 2 + (i.def ?? 0)) * ya(c, 'pdef') * r('pdef'),
    h = (n.int * 2 + (i.mat ?? 0)) * ya(c, 'matk') * r('matk'),
    y = (n.mnd * 2 + (i.mdf ?? 0)) * ya(c, 'mdef') * r('mdef');
  return {
    patk: f,
    pdef: m,
    matk: h,
    mdef: y,
    hit: n.agi,
    acc: n.agi * ya(c, 'acc') * r('acc'),
    eva: n.agi * ya(c, 'eva') * r('eva'),
    crit: n.luc,
  };
}
const u1 = (n) => n.ailments.some((i) => i.type === 'blind'),
  c1 = (n) => n.ailments.some((i) => i.type === 'legBind');
function o1(n, i, c, u) {
  var H;
  const r = c.statBase === 'str',
    f = fh(n.stats, n.equip, n.buffs, n.passive),
    m = fh(i.stats, i.equip, i.buffs, i.passive),
    h = r ? f.patk : f.matk,
    y = r ? m.pdef : m.mdef;
  let g = !0;
  if (r) {
    const q = u1(n) ? Le.BLIND_ACC_PENALTY : 0,
      Q = c1(i) ? 0 : m.eva,
      te = ru(Le.BASE_HIT + (f.acc - Q) * Le.HIT_AGI_K - q, Le.HIT_MIN, 1);
    g = u.next() < te;
  }
  if (!g) return { damage: 0, hit: !1, critical: !1 };
  const b = (h * c.power * Le.DAMAGE_DEF_K) / (Le.DAMAGE_DEF_K + Math.max(0, y)),
    k = r && i1.includes(c.element),
    j = k && n.row === 'back' ? Le.BACK_ROW_MELEE_MULT : 1,
    S = k && i.row === 'back' ? Le.BACK_ROW_MELEE_MULT : 1,
    R = j * S,
    [A, w] = Le.DMG_VARIANCE,
    T = A + u.next() * (w - A);
  let V = b * c.elementMultiplier * R * T;
  const P = ru(
      Le.CRIT_BASE +
        (n.stats.luc - i.stats.luc) * Le.CRIT_LUC_K +
        (((H = n.passive) == null ? void 0 : H.crit) ?? 0),
      Le.CRIT_MIN,
      Le.CRIT_MAX
    ),
    ee = u.next() < P;
  return (
    ee && (V *= Le.CRIT_MULT),
    { damage: c.elementMultiplier === 0 ? 0 : Math.max(1, Math.floor(V)), hit: !0, critical: ee }
  );
}
function r1(n, i) {
  const c = ft[n];
  if (!c || i <= 0) return {};
  const u = i * pl.STAT_PER_LEVEL;
  return c.slot === 'weapon' ? { atk: u, mat: u } : c.slot === 'armor' ? { def: u, mdf: u } : {};
}
const e_ = ['weapon', 'armor', 'accessory'];
function f1(n, i, c) {
  const u = n.guild.equipment.map((f) => (f.id === i ? c(f) : f)),
    r = n.guild.members.map((f) => {
      let m = !1;
      const h = { ...f.equipment };
      for (const y of e_) {
        const g = h[y];
        g && g.id === i && ((h[y] = c(g)), (m = !0));
      }
      return m ? { ...f, equipment: h } : f;
    });
  return { ...n, guild: { ...n.guild, equipment: u, members: r } };
}
function d1(n, i, c) {
  let u = n.guild.equipment.find((m) => m.id === i);
  if (!u)
    for (const m of n.guild.members)
      for (const h of e_) {
        const y = m.equipment[h];
        (y == null ? void 0 : y.id) === i && (u = y);
      }
  if (!u) return { ok: !1, save: n, reason: 'notFound' };
  if (u.forgeLevel >= pl.MAX_LEVEL) return { ok: !1, save: n, reason: 'maxLevel' };
  if ((n.forgeInventory.ingots[c] ?? 0) <= 0) return { ok: !1, save: n, reason: 'noIngot' };
  const r = Math.min(pl.MAX_LEVEL, u.forgeLevel + pl.INGOT_INC[c]);
  let f = {
    ...n,
    forgeInventory: {
      ...n.forgeInventory,
      ingots: { ...n.forgeInventory.ingots, [c]: n.forgeInventory.ingots[c] - 1 },
    },
  };
  return ((f = f1(f, i, (m) => ({ ...m, forgeLevel: r }))), { ok: !0, save: f });
}
function m1(n, i) {
  if (!n.guild.equipment.find((m) => m.id === i)) return { ok: !1, save: n, reason: 'notFound' };
  const u = n.guild.equipment.filter((m) => m.id !== i),
    r = { ...n.forgeInventory.fragments };
  r.common = (r.common ?? 0) + pl.RECYCLE_FRAGMENTS;
  let f = n.forgeInventory.ingots.copper;
  for (; r.common >= pl.FRAGMENTS_PER_INGOT; ) ((r.common -= pl.FRAGMENTS_PER_INGOT), (f += 1));
  return {
    ok: !0,
    save: {
      ...n,
      guild: { ...n.guild, equipment: u },
      forgeInventory: {
        ...n.forgeInventory,
        fragments: r,
        ingots: { ...n.forgeInventory.ingots, copper: f },
      },
    },
  };
}
function fu(n) {
  var c;
  const i = ((c = ft[n.masterId]) == null ? void 0 : c.name) ?? n.masterId;
  return n.forgeLevel > 0 ? `${i} +${n.forgeLevel}` : i;
}
const yt = {
  class_warrior: {
    id: 'class_warrior',
    name: '戦士',
    skillTree: {
      skills: [
        { skillId: 'skill_power_slash', maxLevel: 5 },
        { skillId: 'passive_warrior_blade_mastery', maxLevel: 3 },
        { skillId: 'passive_warrior_phys_boost', maxLevel: 3 },
        { skillId: 'skill_guard_stance', maxLevel: 3 },
        {
          skillId: 'skill_cleave',
          maxLevel: 5,
          requires: [{ skillId: 'skill_power_slash', level: 2 }],
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
        {
          skillId: 'skill_fire_storm',
          maxLevel: 5,
          requires: [{ skillId: 'skill_fire_bolt', level: 3 }],
        },
        { skillId: 'skill_summon_familiar', maxLevel: 2 },
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
        { skillId: 'passive_ranger_bow_mastery', maxLevel: 3 },
        { skillId: 'passive_ranger_agi_boost', maxLevel: 3 },
        { skillId: 'skill_spread_shot', maxLevel: 5 },
        { skillId: 'skill_leg_snipe', maxLevel: 3 },
        { skillId: 'skill_arm_snipe', maxLevel: 3 },
        {
          skillId: 'skill_head_snipe',
          maxLevel: 3,
          requires: [{ skillId: 'skill_aimed_shot', level: 1 }],
        },
        { skillId: 'skill_first_aid', maxLevel: 3 },
        { skillId: 'skill_summon_wolf', maxLevel: 3 },
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
        {
          skillId: 'skill_mass_heal',
          maxLevel: 5,
          requires: [{ skillId: 'skill_heal', level: 2 }],
        },
        { skillId: 'skill_protect_hymn', maxLevel: 3 },
        { skillId: 'passive_medic_tp_boost', maxLevel: 3 },
        { skillId: 'passive_medic_mdef_boost', maxLevel: 3 },
        { skillId: 'skill_refresh_herb', maxLevel: 3 },
        { skillId: 'skill_poison_smoke', maxLevel: 3 },
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
        { skillId: 'skill_weaken_song', maxLevel: 3 },
        { skillId: 'passive_dancer_agi_boost', maxLevel: 3 },
        { skillId: 'passive_dancer_tp_boost', maxLevel: 3 },
        { skillId: 'skill_guard_dance', maxLevel: 3 },
        {
          skillId: 'skill_healing_song',
          maxLevel: 3,
          requires: [{ skillId: 'skill_war_dance', level: 1 }],
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
        { skillId: 'passive_monk_fist_mastery', maxLevel: 3 },
        { skillId: 'passive_monk_crit_boost', maxLevel: 3 },
        { skillId: 'skill_focus_ki', maxLevel: 3 },
        { skillId: 'skill_iron_body', maxLevel: 3 },
        {
          skillId: 'skill_arm_break',
          maxLevel: 5,
          requires: [{ skillId: 'skill_triple_strike', level: 2 }],
        },
        {
          skillId: 'skill_cross_counter',
          maxLevel: 3,
          requires: [{ skillId: 'skill_focus_ki', level: 1 }],
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
        { skillId: 'skill_blind_hex', maxLevel: 3 },
        { skillId: 'skill_armor_hex', maxLevel: 3 },
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
        { skillId: 'passive_summoner_staff_mastery', maxLevel: 3 },
        { skillId: 'passive_summoner_tp_boost', maxLevel: 3 },
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
      ],
    },
    equipableWeaponTypes: ['staff'],
    equipableArmorTypes: ['clothes', 'light'],
    titleOptions: ['title_necromancer', 'title_puppeteer'],
  },
};
function t_(n, i) {
  var c;
  return ((c = n.guild.storage.find((u) => u.itemId === i)) == null ? void 0 : c.qty) ?? 0;
}
function Dr(n, i, c = 1) {
  if (c <= 0) return n;
  const u = [...n.guild.storage],
    r = u.findIndex((f) => f.itemId === i);
  return (
    r >= 0 ? (u[r] = { ...u[r], qty: u[r].qty + c }) : u.push({ itemId: i, qty: c }),
    { ...n, guild: { ...n.guild, storage: u } }
  );
}
function zr(n, i, c = 1) {
  if (c <= 0) return n;
  const u = n.guild.storage.findIndex((m) => m.itemId === i);
  if (u < 0 || n.guild.storage[u].qty < c) return n;
  const r = [...n.guild.storage],
    f = r[u].qty - c;
  return (
    f <= 0 ? r.splice(u, 1) : (r[u] = { ...r[u], qty: f }),
    { ...n, guild: { ...n.guild, storage: r } }
  );
}
const l_ = 60,
  Su = (n) => n.guild.foodStorage ?? [];
function n_(n) {
  return Su(n).reduce((i, c) => i + c.qty, 0);
}
function Br(n, i) {
  var c;
  return ((c = Su(n).find((u) => u.itemId === i)) == null ? void 0 : c.qty) ?? 0;
}
function a_(n, i, c = 1) {
  if (c <= 0) return n;
  const u = l_ - n_(n),
    r = Math.min(c, Math.max(0, u));
  if (r <= 0) return n;
  const f = [...Su(n)],
    m = f.findIndex((h) => h.itemId === i);
  return (
    m >= 0 ? (f[m] = { ...f[m], qty: f[m].qty + r }) : f.push({ itemId: i, qty: r }),
    { ...n, guild: { ...n.guild, foodStorage: f } }
  );
}
function i_(n, i, c = 1) {
  if (c <= 0) return n;
  const u = [...Su(n)],
    r = u.findIndex((m) => m.itemId === i);
  if (r < 0 || u[r].qty < c) return n;
  const f = u[r].qty - c;
  return (
    f <= 0 ? u.splice(r, 1) : (u[r] = { ...u[r], qty: f }),
    { ...n, guild: { ...n.guild, foodStorage: u } }
  );
}
function s_(n, i, c) {
  return {
    ...n,
    guild: { ...n.guild, members: n.guild.members.map((u) => (u.id === i ? c(u) : u)) },
  };
}
function p1() {
  return `eq_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function h1(n, i, c = 0) {
  if (!ft[i]) return n;
  const u = { id: p1(), masterId: i, forgeLevel: c };
  return { ...n, guild: { ...n.guild, equipment: [...n.guild.equipment, u] } };
}
function Lr(n, i) {
  const c = ft[i];
  if (!c) return !1;
  const u = yt[n.classId];
  return u
    ? c.slot === 'weapon'
      ? !!c.weaponType && u.equipableWeaponTypes.includes(c.weaponType)
      : c.slot === 'armor'
        ? !!c.armorType && u.equipableArmorTypes.includes(c.armorType)
        : !0
    : !1;
}
function _1(n, i, c) {
  const u = n.guild.equipment.find((g) => g.id === c),
    r = n.guild.members.find((g) => g.id === i);
  if (!u || !r || !Lr(r, u.masterId)) return n;
  const f = ft[u.masterId];
  let m = n.guild.equipment.filter((g) => g.id !== c);
  const h = r.equipment[f.slot];
  h && (m = [...m, h]);
  const y = { ...n, guild: { ...n.guild, equipment: m } };
  return s_(y, i, (g) => ({ ...g, equipment: { ...g.equipment, [f.slot]: u } }));
}
function qr(n, i, c) {
  const u = n.guild.members.find((m) => m.id === i);
  if (!u) return n;
  const r = u.equipment[c];
  if (!r) return n;
  const f = { ...n, guild: { ...n.guild, equipment: [...n.guild.equipment, r] } };
  return s_(f, i, (m) => ({ ...m, equipment: { ...m.equipment, [c]: null } }));
}
const dr = {
    passive_race_human_adapt: {
      id: 'passive_race_human_adapt',
      name: '適応力',
      tree: 'race',
      mods: (n) => ({ maxHp: 1 + 0.02 * n, acc: 1 + 0.02 * n }),
    },
    passive_race_garon_might: {
      id: 'passive_race_garon_might',
      name: '剛力',
      tree: 'race',
      mods: (n) => ({ patk: 1 + 0.03 * n, maxHp: 1 + 0.02 * n }),
    },
    passive_race_pix_focus: {
      id: 'passive_race_pix_focus',
      name: '魔力集中',
      tree: 'race',
      mods: (n) => ({ matk: 1 + 0.03 * n, maxTp: 1 + 0.03 * n }),
    },
    passive_race_therian_swift: {
      id: 'passive_race_therian_swift',
      name: '俊足',
      tree: 'race',
      mods: (n) => ({ acc: 1 + 0.03 * n, eva: 1 + 0.03 * n }),
    },
    passive_race_lunar_grace: {
      id: 'passive_race_lunar_grace',
      name: '月の加護',
      tree: 'race',
      mods: (n) => ({ mdef: 1 + 0.03 * n, maxTp: 1 + 0.02 * n }),
    },
    passive_race_golan_fortitude: {
      id: 'passive_race_golan_fortitude',
      name: '頑健',
      tree: 'race',
      mods: (n) => ({ pdef: 1 + 0.03 * n, maxHp: 1 + 0.03 * n }),
    },
    passive_warrior_blade_mastery: {
      id: 'passive_warrior_blade_mastery',
      name: '剣の心得',
      tree: 'base',
      weaponType: 'sword',
      mods: (n) => ({ patk: 1 + 0.04 * n }),
    },
    passive_warrior_phys_boost: {
      id: 'passive_warrior_phys_boost',
      name: '剛腕',
      tree: 'base',
      mods: (n) => ({ patk: 1 + 0.03 * n }),
    },
    passive_guardian_shield_mastery: {
      id: 'passive_guardian_shield_mastery',
      name: '盾の心得',
      tree: 'base',
      mods: (n) => ({ pdef: 1 + 0.04 * n }),
    },
    passive_guardian_hp_boost: {
      id: 'passive_guardian_hp_boost',
      name: '頑強',
      tree: 'base',
      mods: (n) => ({ maxHp: 1 + 0.04 * n }),
    },
    passive_mage_staff_mastery: {
      id: 'passive_mage_staff_mastery',
      name: '杖の心得',
      tree: 'base',
      weaponType: 'staff',
      mods: (n) => ({ matk: 1 + 0.04 * n }),
    },
    passive_mage_tp_boost: {
      id: 'passive_mage_tp_boost',
      name: '精神統一',
      tree: 'base',
      mods: (n) => ({ maxTp: 1 + 0.04 * n }),
    },
    passive_ranger_bow_mastery: {
      id: 'passive_ranger_bow_mastery',
      name: '弓の心得',
      tree: 'base',
      weaponType: 'bow',
      mods: (n) => ({ patk: 1 + 0.04 * n }),
    },
    passive_ranger_agi_boost: {
      id: 'passive_ranger_agi_boost',
      name: '機敏',
      tree: 'base',
      mods: (n) => ({ acc: 1 + 0.03 * n, eva: 1 + 0.02 * n }),
    },
    passive_medic_tp_boost: {
      id: 'passive_medic_tp_boost',
      name: '薬学の知識',
      tree: 'base',
      mods: (n) => ({ maxTp: 1 + 0.04 * n }),
    },
    passive_medic_mdef_boost: {
      id: 'passive_medic_mdef_boost',
      name: '抗体',
      tree: 'base',
      mods: (n) => ({ mdef: 1 + 0.03 * n }),
    },
    passive_dancer_agi_boost: {
      id: 'passive_dancer_agi_boost',
      name: '舞踏の足捌き',
      tree: 'base',
      mods: (n) => ({ eva: 1 + 0.03 * n, acc: 1 + 0.02 * n }),
    },
    passive_dancer_tp_boost: {
      id: 'passive_dancer_tp_boost',
      name: '高揚',
      tree: 'base',
      mods: (n) => ({ maxTp: 1 + 0.03 * n }),
    },
    passive_monk_fist_mastery: {
      id: 'passive_monk_fist_mastery',
      name: '拳の心得',
      tree: 'base',
      weaponType: 'fist',
      mods: (n) => ({ patk: 1 + 0.04 * n }),
    },
    passive_monk_crit_boost: {
      id: 'passive_monk_crit_boost',
      name: '練達',
      tree: 'base',
      mods: (n) => ({ crit: 0.015 * n }),
    },
    passive_hexer_matk_boost: {
      id: 'passive_hexer_matk_boost',
      name: '呪詛',
      tree: 'base',
      mods: (n) => ({ matk: 1 + 0.03 * n }),
    },
    passive_hexer_mdef_boost: {
      id: 'passive_hexer_mdef_boost',
      name: '瘴気の衣',
      tree: 'base',
      mods: (n) => ({ mdef: 1 + 0.03 * n }),
    },
    passive_summoner_staff_mastery: {
      id: 'passive_summoner_staff_mastery',
      name: '霊媒の心得',
      tree: 'base',
      weaponType: 'staff',
      mods: (n) => ({ matk: 1 + 0.04 * n }),
    },
    passive_summoner_tp_boost: {
      id: 'passive_summoner_tp_boost',
      name: '死霊術の知識',
      tree: 'base',
      mods: (n) => ({ maxTp: 1 + 0.04 * n }),
    },
    passive_title_berserker: {
      id: 'passive_title_berserker',
      name: '狂気の力',
      tree: 'title',
      mods: (n) => ({ patk: 1 + 0.03 * n, crit: 0.01 * n }),
    },
    passive_title_sentinel: {
      id: 'passive_title_sentinel',
      name: '警戒',
      tree: 'title',
      mods: (n) => ({ pdef: 1 + 0.03 * n, acc: 1 + 0.02 * n }),
    },
    passive_title_bulwark: {
      id: 'passive_title_bulwark',
      name: '鉄壁',
      tree: 'title',
      mods: (n) => ({ pdef: 1 + 0.03 * n, maxHp: 1 + 0.03 * n }),
    },
    passive_title_vanguard: {
      id: 'passive_title_vanguard',
      name: '突撃',
      tree: 'title',
      mods: (n) => ({ patk: 1 + 0.04 * n }),
    },
    passive_title_pyromancer: {
      id: 'passive_title_pyromancer',
      name: '業火',
      tree: 'title',
      mods: (n) => ({ matk: 1 + 0.04 * n }),
    },
    passive_title_sage: {
      id: 'passive_title_sage',
      name: '英知',
      tree: 'title',
      mods: (n) => ({ maxTp: 1 + 0.04 * n, mdef: 1 + 0.02 * n }),
    },
    passive_title_sniper: {
      id: 'passive_title_sniper',
      name: '精密射撃',
      tree: 'title',
      mods: (n) => ({ crit: 0.015 * n, acc: 1 + 0.02 * n }),
    },
    passive_title_tracker: {
      id: 'passive_title_tracker',
      name: '隠密',
      tree: 'title',
      mods: (n) => ({ eva: 1 + 0.04 * n }),
    },
    passive_title_saint: {
      id: 'passive_title_saint',
      name: '慈愛',
      tree: 'title',
      mods: (n) => ({ maxTp: 1 + 0.03 * n, mdef: 1 + 0.03 * n }),
    },
    passive_title_blade_dancer: {
      id: 'passive_title_blade_dancer',
      name: '剣の舞',
      tree: 'title',
      mods: (n) => ({ patk: 1 + 0.03 * n, eva: 1 + 0.02 * n }),
    },
    passive_title_muse: {
      id: 'passive_title_muse',
      name: '詩心',
      tree: 'title',
      mods: (n) => ({ maxTp: 1 + 0.04 * n }),
    },
    passive_title_zen: {
      id: 'passive_title_zen',
      name: '不動',
      tree: 'title',
      mods: (n) => ({ pdef: 1 + 0.03 * n, maxHp: 1 + 0.03 * n }),
    },
    passive_title_plague: {
      id: 'passive_title_plague',
      name: '疫病',
      tree: 'title',
      mods: (n) => ({ matk: 1 + 0.04 * n }),
    },
    passive_title_warlock: {
      id: 'passive_title_warlock',
      name: '魔道の極み',
      tree: 'title',
      mods: (n) => ({ matk: 1 + 0.03 * n, crit: 0.01 * n }),
    },
    passive_title_necromancer: {
      id: 'passive_title_necromancer',
      name: '降霊',
      tree: 'title',
      mods: (n) => ({ matk: 1 + 0.03 * n, maxTp: 1 + 0.03 * n }),
    },
    passive_title_puppeteer: {
      id: 'passive_title_puppeteer',
      name: '傀儡操糸',
      tree: 'title',
      mods: (n) => ({ maxHp: 1 + 0.03 * n, maxTp: 1 + 0.02 * n }),
    },
  },
  g1 = ['patk', 'matk', 'pdef', 'mdef', 'acc', 'eva', 'maxHp', 'maxTp'];
function y1(n) {
  var c;
  const i = n.equipment.weapon;
  if (i) return (c = ft[i.masterId]) == null ? void 0 : c.weaponType;
}
function v1(n) {
  const i = y1(n),
    c = {};
  let u = 0;
  for (const [r, f] of Object.entries(n.learnedSkills)) {
    if (f <= 0) continue;
    const m = dr[r];
    if (!m || (m.weaponType && m.weaponType !== i)) continue;
    const h = m.mods(f);
    for (const y of g1) h[y] !== void 0 && (c[y] = (c[y] ?? 1) * h[y]);
    h.crit !== void 0 && (u += h.crit);
  }
  return (u !== 0 && (c.crit = u), c);
}
const ot = (n) => ({ hp: 0, tp: 0, str: 0, vit: 0, agi: 0, int: 0, mnd: 0, luc: 0, ...n }),
  Ta = {
    title_berserker: {
      id: 'title_berserker',
      name: '狂戦士',
      parentClassId: 'class_warrior',
      skillTree: { skills: [{ skillId: 'passive_title_berserker', maxLevel: 3 }] },
      growthModifier: ot({ str: 1 }),
    },
    title_sentinel: {
      id: 'title_sentinel',
      name: '哨戒兵',
      parentClassId: 'class_warrior',
      skillTree: { skills: [{ skillId: 'passive_title_sentinel', maxLevel: 3 }] },
      growthModifier: ot({ vit: 1 }),
    },
    title_bulwark: {
      id: 'title_bulwark',
      name: '城壁',
      parentClassId: 'class_guardian',
      skillTree: { skills: [{ skillId: 'passive_title_bulwark', maxLevel: 3 }] },
      growthModifier: ot({ vit: 1, hp: 2 }),
    },
    title_vanguard: {
      id: 'title_vanguard',
      name: '先鋒',
      parentClassId: 'class_guardian',
      skillTree: { skills: [{ skillId: 'passive_title_vanguard', maxLevel: 3 }] },
      growthModifier: ot({ str: 1 }),
    },
    title_pyromancer: {
      id: 'title_pyromancer',
      name: '紅蓮術士',
      parentClassId: 'class_mage',
      skillTree: { skills: [{ skillId: 'passive_title_pyromancer', maxLevel: 3 }] },
      growthModifier: ot({ int: 1 }),
    },
    title_sage: {
      id: 'title_sage',
      name: '賢者',
      parentClassId: 'class_mage',
      skillTree: { skills: [{ skillId: 'passive_title_sage', maxLevel: 3 }] },
      growthModifier: ot({ tp: 2, mnd: 1 }),
    },
    title_sniper: {
      id: 'title_sniper',
      name: '狙撃手',
      parentClassId: 'class_ranger',
      skillTree: { skills: [{ skillId: 'passive_title_sniper', maxLevel: 3 }] },
      growthModifier: ot({ agi: 1, luc: 1 }),
    },
    title_tracker: {
      id: 'title_tracker',
      name: '追跡者',
      parentClassId: 'class_ranger',
      skillTree: { skills: [{ skillId: 'passive_title_tracker', maxLevel: 3 }] },
      growthModifier: ot({ agi: 1 }),
    },
    title_saint: {
      id: 'title_saint',
      name: '聖者',
      parentClassId: 'class_medic',
      skillTree: { skills: [{ skillId: 'passive_title_saint', maxLevel: 3 }] },
      growthModifier: ot({ mnd: 1, tp: 2 }),
    },
    title_apothecary: {
      id: 'title_apothecary',
      name: '調薬師',
      parentClassId: 'class_medic',
      skillTree: { skills: [{ skillId: 'skill_cleanse_draft', maxLevel: 3 }] },
      growthModifier: ot({ luc: 1, tp: 1 }),
    },
    title_blade_dancer: {
      id: 'title_blade_dancer',
      name: '剣の舞手',
      parentClassId: 'class_dancer',
      skillTree: { skills: [{ skillId: 'passive_title_blade_dancer', maxLevel: 3 }] },
      growthModifier: ot({ agi: 1, str: 1 }),
    },
    title_muse: {
      id: 'title_muse',
      name: '舞姫',
      parentClassId: 'class_dancer',
      skillTree: { skills: [{ skillId: 'passive_title_muse', maxLevel: 3 }] },
      growthModifier: ot({ mnd: 1, tp: 1 }),
    },
    title_grappler: {
      id: 'title_grappler',
      name: '組手家',
      parentClassId: 'class_monk',
      skillTree: { skills: [{ skillId: 'skill_counter_throw', maxLevel: 3 }] },
      growthModifier: ot({ str: 1, agi: 1 }),
    },
    title_zen: {
      id: 'title_zen',
      name: '禅僧',
      parentClassId: 'class_monk',
      skillTree: { skills: [{ skillId: 'passive_title_zen', maxLevel: 3 }] },
      growthModifier: ot({ vit: 1, tp: 1 }),
    },
    title_plague: {
      id: 'title_plague',
      name: '疫病使い',
      parentClassId: 'class_hexer',
      skillTree: { skills: [{ skillId: 'passive_title_plague', maxLevel: 3 }] },
      growthModifier: ot({ int: 1 }),
    },
    title_warlock: {
      id: 'title_warlock',
      name: '魔道師',
      parentClassId: 'class_hexer',
      skillTree: { skills: [{ skillId: 'passive_title_warlock', maxLevel: 3 }] },
      growthModifier: ot({ int: 1, luc: 1 }),
    },
    title_necromancer: {
      id: 'title_necromancer',
      name: '降霊師',
      parentClassId: 'class_summoner',
      skillTree: { skills: [{ skillId: 'passive_title_necromancer', maxLevel: 3 }] },
      growthModifier: ot({ int: 1, tp: 1 }),
    },
    title_puppeteer: {
      id: 'title_puppeteer',
      name: '傀儡師',
      parentClassId: 'class_summoner',
      skillTree: { skills: [{ skillId: 'passive_title_puppeteer', maxLevel: 3 }] },
      growthModifier: ot({ mnd: 1, vit: 1 }),
    },
  },
  b1 = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];
function zi(n) {
  var h, y;
  const i = Pt[n.raceId];
  if (!i) throw new Error(`computeBaseStats: 未定義の種族 "${n.raceId}"`);
  const u = Math.max(1, Math.min(n.level, Le.LEVEL_CAP)) - 1,
    r = n.titleId ? ((h = Ta[n.titleId]) == null ? void 0 : h.growthModifier) : void 0,
    f = ((y = n.rebirthBonus) == null ? void 0 : y.allStats) ?? 0,
    m = {};
  for (const g of b1) {
    const v = i.statGrowth[g] + ((r == null ? void 0 : r[g]) ?? 0);
    m[g] = i.baseStatsAtLv1[g] + v * u + f;
  }
  return m;
}
const S1 = 3,
  Bl = (n, i, c) => Math.max(i, Math.min(c, n)),
  k1 = {
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
function x1(n) {
  const i = { atk: 0, mat: 0, def: 0, mdf: 0 };
  for (const c of Object.values(n.equipment)) {
    if (!c) continue;
    const u = ft[c.masterId];
    if (!u) continue;
    const r = r1(c.masterId, c.forgeLevel);
    ((i.atk += (u.bonuses.atk ?? 0) + (r.atk ?? 0)),
      (i.mat += (u.bonuses.mat ?? 0) + (r.mat ?? 0)),
      (i.def += (u.bonuses.def ?? 0) + (r.def ?? 0)),
      (i.mdf += (u.bonuses.mdf ?? 0) + (r.mdf ?? 0)));
  }
  return i;
}
function T1(n, i) {
  var g;
  const c = n.guild.members.find((v) => v.id === i);
  if (!c) return null;
  const u = (g = n.diveState) == null ? void 0 : g.party.find((v) => v.charId === i),
    r = zi(c),
    f = v1(c),
    m = Math.round(r.hp * (f.maxHp ?? 1)),
    h = Math.round(r.tp * (f.maxTp ?? 1)),
    y = n.guild.party.front.includes(i);
  return {
    id: i,
    name: c.name,
    side: 'ally',
    row: y ? 'front' : 'back',
    stats: r,
    equip: x1(c),
    hp: u ? Math.min(u.hp, m) : m,
    maxHp: m,
    tp: u ? Math.min(u.tp, h) : h,
    maxTp: h,
    buffs: [],
    ailments: u ? [...u.ailments] : [],
    states: [],
    passive: f,
    unionGauge: (u == null ? void 0 : u.unionGauge) ?? 0,
    isDown: u ? u.hp <= 0 : !1,
  };
}
function E1(n, i, c) {
  const u = ql[n],
    r = s1(u, c);
  return {
    id: `enemy_${i}`,
    name: u.name,
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
    enemyId: n,
    resist: u.resist,
  };
}
function u_(n, i, c, u, r) {
  const f = Aa[n],
    m = Ph(f.baseStats, Or(i, f.refDepth)),
    h = r ?? m.hp;
  return {
    id: u,
    name: f.name,
    side: 'ally',
    row: 'front',
    stats: m,
    equip: {},
    hp: h,
    maxHp: m.hp,
    tp: 0,
    maxTp: 0,
    buffs: [],
    ailments: [],
    unionGauge: 0,
    isDown: h <= 0,
    isSummon: !0,
    summonKind: n,
    ownerId: c,
  };
}
function dh(n, i, c = 'none') {
  var y, g;
  const u = ((y = n.diveState) == null ? void 0 : y.depth) ?? 1,
    f = [...n.guild.party.front, ...n.guild.party.back]
      .filter((v) => v !== null)
      .map((v) => T1(n, v))
      .filter((v) => v !== null),
    m = i.map((v, b) => E1(v, b, u)),
    h = (((g = n.diveState) == null ? void 0 : g.persistentSummons) ?? [])
      .map((v, b) => u_(v.summonKind, u, v.ownerId, `summon_persist_${b}`, v.hp))
      .filter((v) => !v.isDown);
  return {
    turn: 1,
    depth: u,
    allies: f,
    enemies: m,
    summons: h,
    log: [],
    outcome: 'ongoing',
    firstStrike: c,
    drops: [],
    consumedItems: [],
  };
}
const rt = (n, i) => (i === 'ally' ? n.allies : n.enemies).filter((c) => !c.isDown),
  ku = (n) => n.summons.filter((i) => !i.isDown);
function zl(n, i) {
  return (
    n.allies.find((c) => c.id === i) ??
    n.enemies.find((c) => c.id === i) ??
    n.summons.find((c) => c.id === i)
  );
}
const Ur = (n) => {
    var i;
    return (
      !!n.isSummon && !!n.summonKind && ((i = Aa[n.summonKind]) == null ? void 0 : i.buffImmune)
    );
  },
  N1 = (n, i) => {
    var c;
    return ((c = n.resist) == null ? void 0 : c[i]) ?? 1;
  };
function c_(n, i, c) {
  ((n.hp = Bl(n.hp - i, 0, n.maxHp)),
    i > 0 &&
      n.ailments.some((u) => u.type === 'sleep') &&
      ((n.ailments = n.ailments.filter((u) => u.type !== 'sleep')),
      c.push({ text: `${n.name} は目を覚ました` })),
    n.hp === 0 &&
      !n.isDown &&
      ((n.isDown = !0),
      (n.unionGauge = Math.floor(n.unionGauge / 2)),
      c.push({ text: `${n.name} は倒れた！` })));
}
function mr(n, i) {
  n.isDown || (n.unionGauge = Bl(n.unionGauge + i, 0, 100));
}
function pr(n, i) {
  Ur(n) ||
    ((n.buffs = n.buffs.filter((c) => !(c.stat === i.stat && c.stackGroup === i.stackGroup))),
    n.buffs.push(i));
}
function w1(n, i) {
  if (Ur(n)) return;
  const c = n.ailments.find((u) => u.type === i.type);
  if (c) {
    c.remainingTurns = Math.max(c.remainingTurns, i.remainingTurns);
    return;
  }
  n.ailments.push(i);
}
function tu(n, i) {
  Ur(n) || (n.states = [...(n.states ?? []).filter((c) => c.kind !== i.kind), i]);
}
function C1(n, i) {
  return i.side === 'ally' ? [...rt(n, 'ally'), ...ku(n)] : rt(n, 'enemy');
}
function A1(n, i, c) {
  const u = (n.states ?? []).find((f) => f.kind === 'barrier' && f.absorb > 0);
  if (!u || u.kind !== 'barrier') return i;
  const r = Math.min(u.absorb, i);
  return (
    (u.absorb -= r),
    r > 0 && c.push({ text: `${n.name} は障壁で ${r} のダメージを防いだ` }),
    u.absorb <= 0 && (n.states = (n.states ?? []).filter((f) => f !== u)),
    i - r
  );
}
function du(n, i, c, u, r, f = {}) {
  if (c.isDown) return { hit: !1, dealt: 0 };
  const m = o1(
    i,
    c,
    {
      statBase: u.statBase,
      power: u.power,
      element: u.element,
      elementMultiplier: N1(c, u.element),
    },
    r
  );
  if (!m.hit) return (n.log.push({ text: `${i.name} の攻撃は外れた` }), { hit: !1, dealt: 0 });
  const h = A1(c, m.damage, n.log);
  return (
    c_(c, h, n.log),
    f.actorUnion && mr(i, f.actorUnion),
    mr(c, 5),
    h > 0 &&
      n.log.push({
        text: `${i.name} の攻撃！ ${c.name} に ${h} ダメージ${m.critical ? '（会心）' : ''}`,
      }),
    { hit: !0, dealt: h }
  );
}
function o_(n, i, c, u, r, f) {
  if (!c.isDown && !i.isDown && c.side !== i.side)
    for (const m of c.states ?? []) {
      if (m.kind !== 'counter' || f.next() >= m.chance) continue;
      n.log.push({ text: `${c.name} の反撃！` });
      const h = m.statBase === 'str' ? 'bash' : 'almighty';
      if ((du(n, c, i, { statBase: m.statBase, power: m.power, element: h }, f), i.isDown)) break;
    }
  if (r > 0 && c.side !== i.side) {
    for (const m of C1(n, i))
      if (!(m.id === i.id || m.isDown || c.isDown))
        for (const h of m.states ?? [])
          h.kind === 'chase' &&
            ((h.element !== u && h.element !== 'almighty' && u !== 'almighty') ||
              (n.log.push({ text: `${m.name} の連携追撃！` }),
              du(n, m, c, { statBase: h.statBase, power: h.power, element: h.element }, f)));
  }
}
function j1(n, i, c) {
  return Bl(n * (1 + (i.stats.luc - c.stats.luc) * Le.AILMENT_LUC_K), 0, Le.AILMENT_MAX);
}
function r_(n, i, c, u) {
  const r = i.side === 'ally' ? 'enemy' : 'ally';
  switch (c) {
    case 'self':
      return [i];
    case 'allyAll':
      return i.side === 'ally' ? [...rt(n, 'ally'), ...ku(n)] : rt(n, 'enemy');
    case 'allyOne': {
      const f = zl(n, u);
      return f && f.side === i.side ? [f] : [i];
    }
    case 'enemyAll':
      return rt(n, r);
    case 'enemyRow':
    case 'enemyOne':
    default: {
      const f = zl(n, u);
      return f && f.side === r && !f.isDown ? [f] : rt(n, r).slice(0, 1);
    }
  }
}
function M1(n, i, c, u) {
  return r_(n, i, c.target, u);
}
function f_(n, i, c, u, r, f, m) {
  switch (c.kind) {
    case 'damage': {
      const h = c.hits ?? 1,
        y = c.power(r);
      for (const g of f) {
        if (g.isDown) continue;
        let v = !1,
          b = 0;
        for (let k = 0; k < h && !g.isDown; k++) {
          const j = du(n, i, g, { statBase: c.statBase, power: y, element: u }, m);
          j.hit && ((v = !0), (b += j.dealt));
        }
        v && o_(n, i, g, u, b, m);
      }
      break;
    }
    case 'heal': {
      const h = c.amount(r);
      for (const y of f) y.isDown || (y.hp = Bl(y.hp + h, 0, y.maxHp));
      n.log.push({ text: `${i.name} は回復魔法を使った（+${h}）` });
      break;
    }
    case 'buff': {
      for (const h of f)
        pr(h, {
          stat: c.stat,
          modifier: c.modifier(r),
          remainingTurns: c.turns,
          stackGroup: c.stackGroup,
        });
      n.log.push({ text: `${i.name} は態勢を整えた` });
      break;
    }
    case 'ailment': {
      for (const h of f) {
        if (h.isDown) continue;
        const y = j1(c.chance(r), i, h);
        m.next() < y &&
          (w1(h, { type: c.ailment, remainingTurns: c.turns, magnitude: c.magnitude }),
          n.log.push({ text: `${h.name} は${k1[c.ailment]}になった` }));
      }
      break;
    }
    case 'summon': {
      if (i.side !== 'ally') break;
      if (ku(n).length >= S1) {
        n.log.push({ text: 'これ以上は召喚できない' });
        break;
      }
      const h = `summon_${n.turn}_${n.summons.length}`,
        y = u_(c.summonKind, n.depth, i.id, h);
      (n.summons.push(y), n.log.push({ text: `${i.name} は ${y.name} を召喚した！` }));
      break;
    }
    case 'counter': {
      for (const h of f)
        h.isDown ||
          tu(h, {
            kind: 'counter',
            chance: c.chance(r),
            power: c.power(r),
            statBase: c.statBase,
            remainingTurns: c.turns,
          });
      n.log.push({ text: `${i.name} は反撃の構えを取った` });
      break;
    }
    case 'chase': {
      for (const h of f)
        h.isDown ||
          tu(h, {
            kind: 'chase',
            element: u,
            power: c.power(r),
            statBase: c.statBase,
            remainingTurns: c.turns,
          });
      n.log.push({ text: `${i.name} は連携の構えを取った` });
      break;
    }
    case 'decoy': {
      for (const h of f)
        h.isDown || tu(h, { kind: 'decoy', weight: c.weight(r), remainingTurns: c.turns });
      n.log.push({ text: `${i.name} は敵の注意を引きつけた` });
      break;
    }
    case 'barrier': {
      for (const h of f)
        h.isDown || tu(h, { kind: 'barrier', absorb: c.absorb(r), remainingTurns: c.turns });
      n.log.push({ text: `${i.name} は守りの障壁を張った` });
      break;
    }
    case 'cleanse': {
      for (const h of f)
        h.isDown ||
          h.ailments.length === 0 ||
          ((h.ailments = []), n.log.push({ text: `${h.name} の状態異常が治療された` }));
      break;
    }
  }
}
function Po(n, i, c, u) {
  var m;
  if (c.isDown) return;
  const r = i.enemyId
      ? (ql[i.enemyId].attackElement ?? 'bash')
      : i.isSummon && i.summonKind
        ? (((m = Aa[i.summonKind]) == null ? void 0 : m.attackElement) ?? 'bash')
        : 'bash',
    f = du(n, i, c, { statBase: 'str', power: 1, element: r }, u, { actorUnion: 5 });
  f.hit && o_(n, i, c, r, f.dealt, u);
}
const mh = (n) => (n.length === 0 ? 0 : n.reduce((i, c) => i + c.stats.agi, 0) / n.length);
function R1(n, i) {
  const c = n.map(
      (f) => 1 + (f.states ?? []).reduce((m, h) => m + (h.kind === 'decoy' ? h.weight : 0), 0)
    ),
    u = c.reduce((f, m) => f + m, 0);
  let r = i.next() * u;
  for (let f = 0; f < n.length; f++) if (((r -= c[f]), r < 0)) return n[f];
  return n[n.length - 1];
}
const O1 = (n) => n.ailments.some((i) => i.type === 'paralysis'),
  D1 = (n) => n.ailments.some((i) => i.type === 'sleep'),
  Hr = (n, i) => n.ailments.some((c) => c.type === i),
  er = (n) => Hr(n, 'armBind'),
  z1 = (n) => Hr(n, 'headBind'),
  B1 = (n) => Hr(n, 'legBind');
function ph(n) {
  return n.effects.some((i) => i.kind === 'damage' && i.statBase === 'str');
}
function L1(n, i, c) {
  const u = ka[i.unionSkillId];
  if (!u) return;
  const r = zl(n, i.actorId);
  if (!r || r.isDown || r.side !== 'ally') return;
  if (r.unionGauge < 100) {
    n.log.push({ text: `${r.name} はユニオンゲージが足りない` });
    return;
  }
  const f = new Set(i.participantIds);
  f.add(r.id);
  const m = [...f].map((v) => zl(n, v)).filter((v) => !!v && !v.isDown && v.side === 'ally');
  if (m.length < u.requiredParticipants) {
    n.log.push({ text: `${r.name} の${u.name}は参加人数が足りない` });
    return;
  }
  const h = [r, ...m.filter((v) => v.id !== r.id)].slice(0, u.requiredParticipants);
  for (const v of h) v.unionGauge = Bl(v.unionGauge - u.gaugeCostPerParticipant, 0, 100);
  n.log.push({ text: `ユニオン！ ${r.name} の${u.name}！` });
  const y = 1,
    g = r_(n, r, u.target, i.targetId);
  for (const v of u.effects) f_(n, r, v, u.element, y, g, c);
}
function tr(n, i, c) {
  var b, k, j;
  if (n.outcome !== 'ongoing') return n;
  const u = structuredClone({ ...n, log: [] }),
    r = new Map(i.filter((S) => S.kind !== 'union').map((S) => [S.actorId, S])),
    f = u.turn === 1 && u.firstStrike !== 'none',
    m = f && u.firstStrike === 'preemptive',
    h = f && u.firstStrike === 'ambush';
  if (
    (m && u.log.push({ text: '先制攻撃！ 味方が先手を取った' }),
    h && u.log.push({ text: '不意打ち！ 敵に先手を取られた' }),
    !h)
  )
    for (const S of i) S.kind === 'union' && L1(u, S, c);
  const y = i.find((S) => S.kind === 'flee');
  if (!h && y && u.outcome === 'ongoing') {
    const S = zl(u, y.actorId);
    if (S && B1(S)) u.log.push({ text: `${S.name} は脚を封じられて逃げられない` });
    else {
      const R = Bl(0.5 + (mh(rt(u, 'ally')) - mh(rt(u, 'enemy'))) * 0.02, 0.1, 0.95);
      if (c.next() < R)
        return (u.log.push({ text: 'うまく逃げ切れた！' }), (u.outcome = 'fled'), u);
      u.log.push({ text: '逃げられなかった！' });
    }
  }
  if (!h)
    for (const S of i) {
      if (S.kind !== 'guard') continue;
      const R = zl(u, S.actorId);
      !R ||
        R.isDown ||
        (pr(R, { stat: 'pdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }),
        pr(R, { stat: 'mdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }));
    }
  const g = new Map();
  if (!m)
    for (const S of rt(u, 'enemy')) {
      const R = [...ku(u), ...rt(u, 'ally')];
      R.length > 0 && g.set(S.id, R1(R, c).id);
    }
  const v = [...u.allies, ...u.enemies, ...u.summons]
    .filter((S) => !S.isDown)
    .filter((S) => !(m && S.side === 'enemy') && !(h && S.side === 'ally'))
    .map((S) => ({ c: S, agi: S.stats.agi, tie: c.next() }))
    .sort((S, R) => R.agi - S.agi || R.tie - S.tie)
    .map((S) => S.c);
  for (const S of v)
    if (!S.isDown) {
      if (u.outcome !== 'ongoing') break;
      if (D1(S)) {
        u.log.push({ text: `${S.name} は眠っている` });
        continue;
      }
      if (O1(S) && c.next() < Le.PARALYSIS_SKIP) {
        u.log.push({ text: `${S.name} は麻痺で動けない` });
        continue;
      }
      if (S.isSummon) {
        const R = S.summonKind ? Aa[S.summonKind] : void 0;
        if (R != null && R.actsOnTurn) {
          const A = rt(u, 'enemy');
          A.length > 0 && Po(u, S, c.pick(A), c);
        }
        if (rt(u, 'enemy').length === 0) break;
        continue;
      }
      if (S.side === 'enemy') {
        if (er(S)) {
          u.log.push({ text: `${S.name} は腕を封じられて攻撃できない` });
          continue;
        }
        const R = g.get(S.id),
          A = R ? zl(u, R) : void 0,
          w = A && !A.isDown ? A : rt(u, 'ally')[0];
        w && Po(u, S, w, c);
      } else {
        const R = r.get(S.id);
        if (!R || R.kind === 'guard' || R.kind === 'flee') continue;
        if (R.kind === 'attack') {
          if (er(S)) {
            u.log.push({ text: `${S.name} は腕を封じられて攻撃できない` });
            continue;
          }
          const A = zl(u, R.targetId),
            w = A && !A.isDown ? A : rt(u, 'enemy')[0];
          w && Po(u, S, w, c);
        } else if (R.kind === 'skill') {
          const A = Dl[R.skillId];
          if (!A) continue;
          if (ph(A) && er(S)) {
            u.log.push({ text: `${S.name} は腕を封じられてスキルを使えない` });
            continue;
          }
          if (!ph(A) && z1(S)) {
            u.log.push({ text: `${S.name} は頭を封じられてスキルを使えない` });
            continue;
          }
          const w = 1,
            T = A.tpCost(w);
          if (S.tp < T) {
            u.log.push({ text: `${S.name} は TP が足りない` });
            continue;
          }
          ((S.tp -= T), mr(S, 10));
          const V = M1(u, S, A, R.targetId);
          for (const P of A.effects) f_(u, S, P, A.element, w, V, c);
        } else if (R.kind === 'item') {
          const A = et[R.itemId];
          if (!A || !((b = A.useContext) != null && b.includes('battle'))) continue;
          const w = zl(u, R.targetId) ?? S;
          for (const T of A.effects ?? [])
            T.kind === 'heal'
              ? (w.hp = Bl(w.hp + T.amount(1), 0, w.maxHp))
              : T.kind === 'restoreTp' && (w.tp = Bl(w.tp + T.amount(1), 0, w.maxTp));
          (u.consumedItems.push(R.itemId), u.log.push({ text: `${S.name} は ${A.name} を使った` }));
        }
      }
      if (rt(u, 'enemy').length === 0 || rt(u, 'ally').length === 0) break;
    }
  for (const S of [...u.allies, ...u.enemies, ...u.summons]) {
    if (S.isDown) continue;
    const R = S.ailments.find((A) => A.type === 'poison');
    if (R) {
      const A = R.magnitude ?? Math.max(1, Math.floor(S.maxHp * Le.POISON_HP_RATIO));
      (c_(S, A, u.log), u.log.push({ text: `${S.name} は毒で ${A} のダメージ` }));
    }
  }
  for (const S of [...u.allies, ...u.enemies, ...u.summons])
    (!S.isDown &&
      S.maxTp > 0 &&
      (S.tp = Math.min(S.maxTp, S.tp + Math.ceil(S.maxTp * Le.TP_REGEN_RATIO))),
      (S.buffs = S.buffs
        .map((R) => ({ ...R, remainingTurns: R.remainingTurns - 1 }))
        .filter((R) => R.remainingTurns > 0)),
      (S.ailments = S.ailments
        .map((R) => ({ ...R, remainingTurns: R.remainingTurns - 1 }))
        .filter((R) => R.remainingTurns > 0)),
      S.states &&
        S.states.length > 0 &&
        (S.states = S.states
          .map((R) => ({ ...R, remainingTurns: R.remainingTurns - 1 }))
          .filter((R) => R.remainingTurns > 0)));
  for (const S of u.enemies)
    if (
      !(
        !S.isDown ||
        !S.enemyId ||
        (((k = n.enemies.find((A) => A.id === S.id)) == null ? void 0 : k.isDown) ?? !1)
      )
    )
      for (const A of ql[S.enemyId].drops ?? [])
        c.next() < A.rate &&
          (u.drops.push({ enemyId: S.enemyId, itemId: A.itemId }),
          u.log.push({
            text: `${S.name} は ${((j = et[A.itemId]) == null ? void 0 : j.name) ?? A.itemId} を落とした`,
          }));
  return (
    (u.summons = u.summons.filter((S) => !S.isDown)),
    (u.turn += 1),
    rt(u, 'enemy').length === 0
      ? (u.outcome = 'win')
      : rt(u, 'ally').length === 0 && (u.outcome = 'lose'),
    u
  );
}
function d_(n) {
  let i = 0,
    c = 0;
  for (const u of n.enemies) {
    if (!u.enemyId) continue;
    const r = ql[u.enemyId],
      f = Or(n.depth, r.refDepth);
    ((i += Math.round(r.exp * f)), (c += Math.round(r.gold * f)));
  }
  return { exp: i, gold: c };
}
function q1(n, i) {
  let c = n.level,
    u = n.exp + (Fo(c) ? i : 0),
    r = n.skillPoints.total;
  for (; Fo(c) && u >= rh(c); ) ((u -= rh(c)), (c += 1), (r += Le.SP_PER_LEVEL));
  return {
    ...n,
    level: c,
    exp: Fo(n.level) ? u : n.exp,
    skillPoints: { ...n.skillPoints, total: r },
  };
}
function hh(n, i) {
  if (!n.diveState) return n;
  const c = i.outcome === 'win',
    u = i.outcome === 'win' || i.outcome === 'fled',
    r = new Map(i.allies.map((k) => [k.id, k])),
    f = n.diveState.party.map((k) => {
      const j = r.get(k.charId);
      if (!j) return k;
      let S = j.unionGauge;
      return (
        u && !j.isDown && (S = Bl(S + Le.UNION_GAIN_ON_WIN, 0, 100)),
        { ...k, hp: j.hp, tp: j.tp, unionGauge: S, ailments: j.ailments }
      );
    });
  let m = n.guild.members,
    h = n.guild.gold;
  const y = { ...n.bestiary.monsters };
  for (const k of i.enemies) {
    if (!k.enemyId) continue;
    const j = y[k.enemyId] ?? { seen: !1, defeated: !1, dropsFound: [] };
    y[k.enemyId] = { ...j, seen: !0, defeated: j.defeated || k.isDown };
  }
  if (c)
    for (const k of i.drops) {
      const j = y[k.enemyId];
      j &&
        !j.dropsFound.includes(k.itemId) &&
        (y[k.enemyId] = { ...j, dropsFound: [...j.dropsFound, k.itemId] });
    }
  const g = { ...n.bestiary, monsters: y };
  if (c) {
    const { exp: k, gold: j } = d_(i);
    h += j;
    const S = new Set(f.map((A) => A.charId)),
      R = S.size > 0 ? Math.floor(k / S.size) : 0;
    m = m.map((A) => (S.has(A.id) ? q1(A, R) : A));
  }
  const v = i.summons
    .filter((k) => {
      var j;
      return (
        !k.isDown &&
        k.summonKind &&
        ((j = Aa[k.summonKind]) == null ? void 0 : j.persistsAfterBattle)
      );
    })
    .map((k) => ({ summonKind: k.summonKind, ownerId: k.ownerId ?? '', hp: k.hp }));
  let b = {
    ...n,
    guild: { ...n.guild, members: m, gold: h, bestiary: g },
    bestiary: g,
    diveState: { ...n.diveState, party: f, persistentSummons: v },
  };
  for (const k of i.consumedItems) b = zr(b, k, 1);
  if (c) for (const k of i.drops) b = Dr(b, k.itemId, 1);
  return b;
}
const U1 = 8,
  hr = 16,
  Ai = 5;
function Gr(n) {
  return n.range(U1, hr);
}
function H1(n, i) {
  const c = n - 1;
  return c <= 0
    ? { stepsUntilEncounter: Gr(i), triggered: !0 }
    : { stepsUntilEncounter: c, triggered: !1 };
}
function G1(n) {
  const i = Math.max(0, hr - n),
    c = Math.round((i / hr) * Ai);
  return Math.min(Ai, Math.max(0, c));
}
const Ft = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  Ea = ['N', 'E', 'S', 'W'];
function m_(n) {
  return Ea[(Ea.indexOf(n) + 1) % 4];
}
function p_(n) {
  return Ea[(Ea.indexOf(n) + 3) % 4];
}
function I1(n) {
  return Ea[(Ea.indexOf(n) + 2) % 4];
}
const $1 = (n, i, c) => n >= 0 && i >= 0 && n < c.width && i < c.height;
function xa(n, i, c, u) {
  if (n.cells[c][i].walls[u]) return !1;
  const r = i + Ft[u].dx,
    f = c + Ft[u].dy;
  return $1(r, f, n) ? n.cells[f][r].passable : !1;
}
function Y1(n, i, c) {
  return xa(n, i.x, i.y, c) ? { x: i.x + Ft[c].dx, y: i.y + Ft[c].dy } : null;
}
function Ir(n, i, c) {
  return ['N', 'E', 'S', 'W'].filter((u) => !n.cells[c][i].walls[u]);
}
const _h = ['N', 'E', 'S', 'W'],
  lr = (n, i) => Math.abs(n.x - i.x) + Math.abs(n.y - i.y);
function X1(n, i, c, u, r) {
  const f = i.map((v) => ({ ...v, cell: { ...v.cell } })),
    m = new Map(n.foeSpawns.map((v) => [v.id, v])),
    h = new Set(f.filter((v) => !v.defeated).map((v) => `${v.cell.x},${v.cell.y}`));
  let y = null;
  const g = [...f].sort((v, b) => v.spawnId.localeCompare(b.spawnId, void 0, { numeric: !0 }));
  for (const v of g) {
    if (y) break;
    if (v.defeated) continue;
    const b = m.get(v.spawnId);
    if (!b) continue;
    !v.alerted && lr(v.cell, c) <= b.sightRange && (v.alerted = !0);
    const k = (j) => {
      if (!xa(n, v.cell.x, v.cell.y, j)) return 'blocked';
      const S = v.cell.x + Ft[j].dx,
        R = v.cell.y + Ft[j].dy;
      if (S === c.x && R === c.y) {
        const A = j === u;
        return (
          (y = { spawnId: v.spawnId, enemyId: b.enemyId, firstStrike: A ? 'ambush' : 'none' }),
          'contact'
        );
      }
      return h.has(`${S},${R}`)
        ? 'blocked'
        : (h.delete(`${v.cell.x},${v.cell.y}`),
          (v.cell = { x: S, y: R }),
          h.add(`${S},${R}`),
          'moved');
    };
    if (v.alerted)
      for (let j = 0; j < b.moveSpeed; j++) {
        let S = null,
          R = lr(v.cell, c),
          A = !1;
        for (const T of _h) {
          const V = v.cell.x + Ft[T].dx,
            P = v.cell.y + Ft[T].dy;
          if (V === c.x && P === c.y && xa(n, v.cell.x, v.cell.y, T)) {
            ((S = T), (A = !0));
            break;
          }
          if (!xa(n, v.cell.x, v.cell.y, T) || h.has(`${V},${P}`)) continue;
          const ee = lr({ x: V, y: P }, c);
          ee < R && ((R = ee), (S = T));
        }
        if (!S) break;
        const w = k(S);
        if (w === 'contact' || w === 'blocked' || A) break;
      }
    else {
      const j = b.patrol;
      if (j.kind === 'wander') {
        const S = _h.filter(
          (R) =>
            xa(n, v.cell.x, v.cell.y, R) && !h.has(`${v.cell.x + Ft[R].dx},${v.cell.y + Ft[R].dy}`)
        );
        S.length > 0 && k(r.pick(S));
      } else j.kind === 'charge' && k(j.dir);
    }
  }
  return { foes: f, contact: y };
}
const Mn = {
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
  V1 = Object.keys(Mn);
function Q1(n) {
  return Object.values(ql)
    .filter((i) => i.tierBand === n && !i.isBoss)
    .map((i) => i.id);
}
function K1(n) {
  const i = Object.values(ql).filter((u) => u.isBoss);
  if (i.length === 0) return null;
  const c = i.filter((u) => u.tierBand === n);
  return c.length > 0 ? c[0].id : i.sort((u, r) => r.tierBand - u.tierBand)[0].id;
}
function Z1(n, i, c, u, r) {
  for (const f of ['N', 'E', 'S', 'W']) {
    if (n[c][i].walls[f]) continue;
    const m = i + al[f].dx,
      h = c + al[f].dy;
    if (mu(m, h, u, r) && !n[h][m].event) return { x: m, y: h };
  }
  return null;
}
const al = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  J1 = { N: 'S', E: 'W', S: 'N', W: 'E' };
function W1(n) {
  return Math.min(25, 15 + Math.floor(n / 5));
}
function F1() {
  return { walls: { N: !0, E: !0, S: !0, W: !0 }, floorType: 'normal', passable: !0 };
}
const mu = (n, i, c, u) => n >= 0 && i >= 0 && n < c && i < u;
function gh(n, i, c, u) {
  const { dx: r, dy: f } = al[u];
  ((n[c][i].walls[u] = !1), (n[c + f][i + r].walls[J1[u]] = !1));
}
function P1(n, i, c) {
  const u = n.length,
    r = n[0].length,
    f = Array.from({ length: u }, () => Array(r).fill(-1)),
    m = [{ x: i, y: c }];
  f[c][i] = 0;
  for (let h = 0; h < m.length; h++) {
    const { x: y, y: g } = m[h];
    for (const v of ['N', 'E', 'S', 'W']) {
      if (n[g][y].walls[v]) continue;
      const b = y + al[v].dx,
        k = g + al[v].dy;
      !mu(b, k, r, u) || f[k][b] !== -1 || ((f[k][b] = f[g][y] + 1), m.push({ x: b, y: k }));
    }
  }
  return f;
}
function eS(n, i) {
  const c = W1(n),
    u = c,
    r = c,
    f = Array.from({ length: r }, () => Array.from({ length: u }, () => F1())),
    m = Array.from({ length: r }, () => Array(u).fill(!1)),
    h = i.int(u),
    y = i.int(r),
    g = [{ x: h, y }];
  for (m[y][h] = !0; g.length > 0; ) {
    const X = g[g.length - 1],
      H = [];
    for (const se of ['N', 'E', 'S', 'W']) {
      const ce = X.x + al[se].dx,
        Z = X.y + al[se].dy;
      mu(ce, Z, u, r) && !m[Z][ce] && H.push(se);
    }
    if (H.length === 0) {
      g.pop();
      continue;
    }
    const q = i.pick(H);
    gh(f, X.x, X.y, q);
    const Q = X.x + al[q].dx,
      te = X.y + al[q].dy;
    ((m[te][Q] = !0), g.push({ x: Q, y: te }));
  }
  const v = Math.floor((u * r) / 25);
  for (let X = 0; X < v; X++) {
    const H = i.int(u),
      q = i.int(r),
      Q = i.pick(['N', 'E', 'S', 'W']),
      te = H + al[Q].dx,
      se = q + al[Q].dy;
    mu(te, se, u, r) && f[q][H].walls[Q] && gh(f, H, q, Q);
  }
  const b = i.int(u),
    k = i.int(r),
    j = P1(f, b, k);
  let S = b,
    R = k,
    A = -1;
  for (let X = 0; X < r; X++)
    for (let H = 0; H < u; H++) j[X][H] > A && ((A = j[X][H]), (S = H), (R = X));
  ((f[k][b].event = { kind: 'stairsDown' }), (f[R][S].event = { kind: 'stairsUp' }));
  const w = Math.floor((n - 1) / 10),
    T = [];
  if (Ci(n)) {
    const X = K1(w);
    if (X) {
      const H = Z1(f, S, R, u, r) ?? { x: S, y: R };
      T.push({
        id: 'boss',
        enemyId: X,
        startCell: H,
        patrol: { kind: 'static' },
        moveSpeed: 0,
        sightRange: 0,
        respawn: !1,
        isBoss: !0,
      });
    }
  } else {
    const X = Q1(w),
      H = 1 + Math.floor(n / 8);
    for (let q = 0; q < H && X.length > 0; q++) {
      let Q = i.int(u),
        te = i.int(r);
      for (let se = 0; se < 20; se++) {
        ((Q = i.int(u)), (te = i.int(r)));
        const ce = f[te][Q].event,
          Z = Math.abs(Q - b) + Math.abs(te - k) >= 3;
        if (!ce && Z) break;
      }
      T.push({
        id: `foe_${q}`,
        enemyId: i.pick(X),
        startCell: { x: Q, y: te },
        patrol: { kind: 'wander' },
        moveSpeed: 1,
        sightRange: 3,
        respawn: !1,
      });
    }
  }
  const V = [],
    P = () => {
      for (let X = 0; X < 25; X++) {
        const H = i.int(u),
          q = i.int(r),
          Q = Math.abs(H - b) + Math.abs(q - k) >= 2;
        if (!f[q][H].event && Q) return { x: H, y: q };
      }
      return null;
    },
    ee = 2 + Math.floor(n / 10);
  for (let X = 0; X < ee; X++) {
    const H = P();
    if (!H) break;
    const q = i.pick(V1),
      Q = `gather_${X}`;
    ((f[H.y][H.x].event = { kind: 'gather', gatherId: Q }), V.push({ id: Q, cell: H, type: q }));
  }
  if (!Ci(n)) {
    const X = P();
    X && (f[X.y][X.x].event = { kind: 'cookingSpot', spotId: 'cook_0' });
  }
  return {
    depth: n,
    width: u,
    height: r,
    cells: f,
    encounterTable: `band_${w}`,
    foeSpawns: T,
    gatheringPoints: V,
    bgmId: Ci(n) ? 'bgm_boss' : 'bgm_dungeon',
  };
}
function h_(n, i) {
  var c;
  for (let u = 0; u < n.height; u++)
    for (let r = 0; r < n.width; r++)
      if (((c = n.cells[u][r].event) == null ? void 0 : c.kind) === i) return { x: r, y: u };
  return null;
}
const tS = 4294967296;
function lS(n, i) {
  let c = 3735928559 ^ n,
    u = 1103547991 ^ n;
  for (let r = 0; r < i.length; r++) {
    const f = i.charCodeAt(r);
    ((c = Math.imul(c ^ f, 2654435761)), (u = Math.imul(u ^ f, 1597334677)));
  }
  return (
    (c = Math.imul(c ^ (c >>> 16), 2246822507) ^ Math.imul(u ^ (u >>> 13), 3266489909)),
    (u = Math.imul(u ^ (u >>> 16), 2246822507) ^ Math.imul(c ^ (c >>> 13), 3266489909)),
    (u >>> 0) ^ (c >>> 0)
  );
}
class $r {
  constructor(i, c) {
    Io(this, 'baseSeed');
    Io(this, '_state');
    ((this._state = i >>> 0), (this.baseSeed = (c ?? i) >>> 0));
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
      ((i ^ (i >>> 14)) >>> 0) / tS
    );
  }
  int(i) {
    return i <= 0 ? 0 : Math.floor(this.next() * i);
  }
  range(i, c) {
    c < i && ([i, c] = [c, i]);
    const u = c - i + 1;
    return i + this.int(u);
  }
  pick(i) {
    if (i.length === 0) throw new Error('Rng.pick: 空配列は選択できません');
    return i[this.int(i.length)];
  }
  fork(i) {
    const c = lS(this.baseSeed, i);
    return new $r(c, c);
  }
}
function On(n) {
  return new $r(n, n);
}
function nS() {
  return Math.floor(Math.random() * 4294967296) >>> 0;
}
const pu = (n, i) => `${n},${i}`;
function aS(n, i) {
  return On(n).fork(`floor:${i}`);
}
function __(n, i) {
  const c = n.towerState.floors[i];
  if (c) return { save: n, floor: c };
  const u = eS(i, aS(n.masterSeed, i)),
    r = u.foeSpawns.map((h) => ({
      spawnId: h.id,
      cell: { ...h.startCell },
      defeated: !1,
      alerted: !1,
    })),
    f = {
      depth: i,
      seed: n.masterSeed,
      generated: u,
      isBossFloor: Ci(i),
      encounterTier: Math.floor((i - 1) / 10),
      foeRuntime: r,
      openedChests: [],
      depletedGathers: [],
      consumedEvents: [],
    };
  return {
    save: { ...n, towerState: { ...n.towerState, floors: { ...n.towerState.floors, [i]: f } } },
    floor: f,
  };
}
function iS(n) {
  const i = [...n.guild.party.front, ...n.guild.party.back].filter((u) => u !== null),
    c = [];
  for (const u of i) {
    const r = n.guild.members.find((m) => m.id === u);
    if (!r) continue;
    const f = zi(r);
    c.push({ charId: u, hp: f.hp, tp: f.tp, unionGauge: 0, ailments: [] });
  }
  return c;
}
function hu(n, i, c, u) {
  const r = n.towerState.floors[i].generated,
    f = new Set(n.exploredCells[i] ?? []);
  f.add(pu(c, u));
  for (const m of Ir(r, c, u)) {
    const h = c + (m === 'E' ? 1 : m === 'W' ? -1 : 0),
      y = u + (m === 'S' ? 1 : m === 'N' ? -1 : 0);
    f.add(pu(h, y));
  }
  return { ...n, exploredCells: { ...n.exploredCells, [i]: [...f] } };
}
function g_(n, i, c) {
  var y, g;
  const u = __(n, i);
  let r = u.save;
  const f = u.floor.generated,
    m = h_(f, 'stairsDown') ?? { x: 0, y: 0 },
    h = Ir(f, m.x, m.y)[0] ?? 'N';
  return (
    i > r.towerState.record.deepestReached &&
      (r = {
        ...r,
        towerState: { ...r.towerState, record: { ...r.towerState.record, deepestReached: i } },
      }),
    (r = {
      ...r,
      diveState: {
        depth: i,
        pos: { x: m.x, y: m.y },
        dir: h,
        party: ((y = r.diveState) == null ? void 0 : y.party) ?? iS(r),
        persistentSummons: ((g = r.diveState) == null ? void 0 : g.persistentSummons) ?? [],
        encounter: { stepsUntilEncounter: Gr(c) },
        pendingFoeBattle: null,
      },
    }),
    hu(r, i, m.x, m.y)
  );
}
function yh(n, i = 1) {
  const c = On(n.masterSeed).fork(`dive:${n.towerState.record.totalDives}`),
    u = {
      ...n,
      diveState: null,
      towerState: {
        ...n.towerState,
        record: { ...n.towerState.record, totalDives: n.towerState.record.totalDives + 1 },
      },
    };
  return g_(u, i, c);
}
function y_(n, i) {
  return n.diveState ? { ...n, diveState: { ...n.diveState, dir: i } } : n;
}
function v_(n, i, c) {
  const u = n.towerState.floors[i];
  return {
    ...n,
    towerState: {
      ...n.towerState,
      floors: { ...n.towerState.floors, [i]: { ...u, foeRuntime: c } },
    },
  };
}
function sS(n, i, c) {
  const u = n.diveState;
  if (!u) return { save: n, moved: !1, triggered: !1 };
  const r = n.towerState.floors[u.depth],
    f = r.generated,
    m = Y1(f, u.pos, i);
  if (!m) return { save: y_(n, i), moved: !1, triggered: !1 };
  const h = r.foeRuntime.find((b) => !b.defeated && b.cell.x === m.x && b.cell.y === m.y);
  if (h) {
    const b = f.foeSpawns.find((S) => S.id === h.spawnId),
      k = b
        ? {
            spawnId: h.spawnId,
            enemyId: b.enemyId,
            firstStrike: b.isBoss ? 'none' : 'preemptive',
            isBoss: b.isBoss,
          }
        : null;
    let j = { ...n, diveState: { ...u, pos: m, dir: i, pendingFoeBattle: k } };
    return ((j = hu(j, u.depth, m.x, m.y)), { save: j, moved: !0, triggered: k !== null });
  }
  const y = H1(u.encounter.stepsUntilEncounter, c);
  let g = {
    ...n,
    diveState: {
      ...u,
      pos: m,
      dir: i,
      encounter: { stepsUntilEncounter: y.stepsUntilEncounter },
      pendingFoeBattle: null,
    },
  };
  g = hu(g, u.depth, m.x, m.y);
  const v = X1(f, r.foeRuntime, m, i, c);
  return (
    (g = v_(g, u.depth, v.foes)),
    v.contact
      ? ((g = {
          ...g,
          diveState: {
            ...g.diveState,
            pendingFoeBattle: {
              spawnId: v.contact.spawnId,
              enemyId: v.contact.enemyId,
              firstStrike: v.contact.firstStrike,
            },
          },
        }),
        { save: g, moved: !0, triggered: !0 })
      : { save: g, moved: !0, triggered: y.triggered }
  );
}
function uS(n, i) {
  const c = n.diveState;
  if (!c) return n;
  const u = c.pendingFoeBattle;
  let r = { ...n, diveState: { ...c, pendingFoeBattle: null } };
  if (u && i) {
    const m = r.towerState.floors[c.depth].foeRuntime.map((h) =>
      h.spawnId === u.spawnId ? { ...h, defeated: !0 } : h
    );
    ((r = v_(r, c.depth, m)), u.isBoss && (r = cS(r, c.depth)));
  }
  return r;
}
function cS(n, i, c = Date.now()) {
  const u = n.towerState,
    r = { ...u.bossGates, [i]: { depth: i, defeated: !0 } },
    f = u.warp.unlockedCheckpoints.includes(i)
      ? u.warp.unlockedCheckpoints
      : [...u.warp.unlockedCheckpoints, i].sort((y, g) => y - g),
    m = u.record.bossDefeatLog.some((y) => y.depth === i),
    h = {
      ...u.record,
      highestBossDefeated: Math.max(u.record.highestBossDefeated, i),
      bossDefeatLog: m ? u.record.bossDefeatLog : [...u.record.bossDefeatLog, { depth: i, at: c }],
    };
  return {
    ...n,
    towerState: { ...u, bossGates: r, warp: { ...u.warp, unlockedCheckpoints: f }, record: h },
  };
}
function b_(n, i) {
  var c;
  return Ci(i) ? ((c = n.towerState.bossGates[i]) == null ? void 0 : c.defeated) === !0 : !0;
}
function vh(n) {
  const i = n.diveState;
  if (!i) return null;
  const c = n.towerState.floors[i.depth].generated.cells[i.pos.y][i.pos.x].event;
  return (c == null ? void 0 : c.kind) === 'stairsUp' ||
    (c == null ? void 0 : c.kind) === 'stairsDown'
    ? c.kind
    : null;
}
function oS(n) {
  if (!n.diveState || !b_(n, n.diveState.depth)) return n;
  const i = n.diveState.depth + 1,
    c = On(n.masterSeed).fork(`enc:${i}:${n.towerState.record.totalDives}`);
  return g_(n, i, c);
}
function rS(n) {
  if (!n.diveState) return n;
  const i = n.diveState.depth;
  if (i <= 1) return Mi(n);
  const c = i - 1,
    u = __(n, c),
    r = h_(u.floor.generated, 'stairsUp') ?? { x: 0, y: 0 },
    f = On(n.masterSeed).fork(`enc:${c}:${n.towerState.record.totalDives}`);
  let m = u.save;
  const h = u.floor.generated,
    y = Ir(h, r.x, r.y)[0] ?? 'N';
  return (
    (m = {
      ...m,
      diveState: {
        ...m.diveState,
        depth: c,
        pos: { x: r.x, y: r.y },
        dir: y,
        encounter: { stepsUntilEncounter: Gr(f) },
        pendingFoeBattle: null,
      },
    }),
    hu(m, c, r.x, r.y)
  );
}
function Mi(n) {
  return { ...n, diveState: null };
}
function fS(n) {
  const i = Math.floor((n - 1) / 10);
  return Object.values(ql)
    .filter((c) => c.tierBand === i && !c.isBoss)
    .map((c) => c.id);
}
function dS(n, i) {
  const c = fS(n);
  if (c.length === 0) return [];
  const u = i.range(1, 3);
  return Array.from({ length: u }, () => i.pick(c));
}
const ja = {
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
function mS() {
  return Object.values(ja)
    .filter((n) => n.unlockedByDefault)
    .map((n) => n.id);
}
const uu = 2,
  pS = { autoMap: 'on', bgmVolume: 0.6, seVolume: 0.6 };
function bh() {
  return { monsters: {}, items: {} };
}
function hS() {
  return { deepestReached: 0, highestBossDefeated: 0, totalDives: 0, bossDefeatLog: [] };
}
const _S = () => ({ weapon: null, armor: null, accessory: null });
function gS() {
  return `char_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function S_(n) {
  var h;
  const { raceId: i, classId: c, name: u, id: r } = n;
  if (!Pt[i]) throw new Error(`createCharacter: 未定義の種族 "${i}"`);
  if (!yt[c]) throw new Error(`createCharacter: 未定義の職業 "${c}"`);
  const f = (h = yt[c].skillTree.skills[0]) == null ? void 0 : h.skillId,
    m = f ? { [f]: 1 } : {};
  return {
    id: r ?? gS(),
    name: u,
    raceId: i,
    classId: c,
    titleId: null,
    level: 1,
    exp: 0,
    skillPoints: { total: 0, spent: 0 },
    learnedSkills: m,
    equipment: _S(),
  };
}
function yS() {
  return { front: Array(vu).fill(null), back: Array(bu).fill(null) };
}
function vS(n, i) {
  const c = n.front.indexOf(null);
  if (c !== -1) {
    const r = [...n.front];
    return ((r[c] = i), { ...n, front: r });
  }
  const u = n.back.indexOf(null);
  if (u !== -1) {
    const r = [...n.back];
    return ((r[u] = i), { ...n, back: r });
  }
  return n;
}
function bS(n, i) {
  return n.guild.members.length >= fr
    ? n
    : {
        ...n,
        guild: { ...n.guild, members: [...n.guild.members, i], party: vS(n.guild.party, i.id) },
      };
}
function SS(n) {
  return {
    schemaVersion: uu,
    savedAt: 0,
    masterSeed: nS(),
    settings: { ...pS },
    guild: {
      name: n,
      gold: t1,
      members: [],
      party: yS(),
      storage: [],
      equipment: [],
      foodStorage: [],
      bestiary: bh(),
    },
    towerState: { floors: {}, bossGates: {}, warp: { unlockedCheckpoints: [] }, record: hS() },
    diveState: null,
    bestiary: bh(),
    playerMaps: {},
    exploredCells: {},
    forgeInventory: { fragments: {}, ingots: { copper: 0, silver: 0, gold: 0 } },
    shopStock: { unlockedTier: 0, unlockedItemIds: [] },
    unlockedRecipeIds: mS(),
    flags: {},
  };
}
const _r = (n, i) => i.some((c) => n instanceof c);
let Sh, kh;
function kS() {
  return Sh || (Sh = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function xS() {
  return (
    kh ||
    (kh = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const gr = new WeakMap(),
  nr = new WeakMap(),
  xu = new WeakMap();
function TS(n) {
  const i = new Promise((c, u) => {
    const r = () => {
        (n.removeEventListener('success', f), n.removeEventListener('error', m));
      },
      f = () => {
        (c(Rn(n.result)), r());
      },
      m = () => {
        (u(n.error), r());
      };
    (n.addEventListener('success', f), n.addEventListener('error', m));
  });
  return (xu.set(i, n), i);
}
function ES(n) {
  if (gr.has(n)) return;
  const i = new Promise((c, u) => {
    const r = () => {
        (n.removeEventListener('complete', f),
          n.removeEventListener('error', m),
          n.removeEventListener('abort', m));
      },
      f = () => {
        (c(), r());
      },
      m = () => {
        (u(n.error || new DOMException('AbortError', 'AbortError')), r());
      };
    (n.addEventListener('complete', f),
      n.addEventListener('error', m),
      n.addEventListener('abort', m));
  });
  gr.set(n, i);
}
let yr = {
  get(n, i, c) {
    if (n instanceof IDBTransaction) {
      if (i === 'done') return gr.get(n);
      if (i === 'store')
        return c.objectStoreNames[1] ? void 0 : c.objectStore(c.objectStoreNames[0]);
    }
    return Rn(n[i]);
  },
  set(n, i, c) {
    return ((n[i] = c), !0);
  },
  has(n, i) {
    return n instanceof IDBTransaction && (i === 'done' || i === 'store') ? !0 : i in n;
  },
};
function k_(n) {
  yr = n(yr);
}
function NS(n) {
  return xS().includes(n)
    ? function (...i) {
        return (n.apply(vr(this), i), Rn(this.request));
      }
    : function (...i) {
        return Rn(n.apply(vr(this), i));
      };
}
function wS(n) {
  return typeof n == 'function'
    ? NS(n)
    : (n instanceof IDBTransaction && ES(n), _r(n, kS()) ? new Proxy(n, yr) : n);
}
function Rn(n) {
  if (n instanceof IDBRequest) return TS(n);
  if (nr.has(n)) return nr.get(n);
  const i = wS(n);
  return (i !== n && (nr.set(n, i), xu.set(i, n)), i);
}
const vr = (n) => xu.get(n);
function CS(n, i, { blocked: c, upgrade: u, blocking: r, terminated: f } = {}) {
  const m = indexedDB.open(n, i),
    h = Rn(m);
  return (
    u &&
      m.addEventListener('upgradeneeded', (y) => {
        u(Rn(m.result), y.oldVersion, y.newVersion, Rn(m.transaction), y);
      }),
    c && m.addEventListener('blocked', (y) => c(y.oldVersion, y.newVersion, y)),
    h
      .then((y) => {
        (f && y.addEventListener('close', () => f()),
          r && y.addEventListener('versionchange', (g) => r(g.oldVersion, g.newVersion, g)));
      })
      .catch(() => {}),
    h
  );
}
const AS = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  jS = ['put', 'add', 'delete', 'clear'],
  ar = new Map();
function xh(n, i) {
  if (!(n instanceof IDBDatabase && !(i in n) && typeof i == 'string')) return;
  if (ar.get(i)) return ar.get(i);
  const c = i.replace(/FromIndex$/, ''),
    u = i !== c,
    r = jS.includes(c);
  if (!(c in (u ? IDBIndex : IDBObjectStore).prototype) || !(r || AS.includes(c))) return;
  const f = async function (m, ...h) {
    const y = this.transaction(m, r ? 'readwrite' : 'readonly');
    let g = y.store;
    return (u && (g = g.index(h.shift())), (await Promise.all([g[c](...h), r && y.done]))[0]);
  };
  return (ar.set(i, f), f);
}
k_((n) => ({
  ...n,
  get: (i, c, u) => xh(i, c) || n.get(i, c, u),
  has: (i, c) => !!xh(i, c) || n.has(i, c),
}));
const MS = ['continue', 'continuePrimaryKey', 'advance'],
  Th = {},
  br = new WeakMap(),
  x_ = new WeakMap(),
  RS = {
    get(n, i) {
      if (!MS.includes(i)) return n[i];
      let c = Th[i];
      return (
        c ||
          (c = Th[i] =
            function (...u) {
              br.set(this, x_.get(this)[i](...u));
            }),
        c
      );
    },
  };
async function* OS(...n) {
  let i = this;
  if ((i instanceof IDBCursor || (i = await i.openCursor(...n)), !i)) return;
  i = i;
  const c = new Proxy(i, RS);
  for (x_.set(c, i), xu.set(c, vr(i)); i; )
    (yield c, (i = await (br.get(c) || i.continue())), br.delete(c));
}
function Eh(n, i) {
  return (
    (i === Symbol.asyncIterator && _r(n, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (i === 'iterate' && _r(n, [IDBIndex, IDBObjectStore]))
  );
}
k_((n) => ({
  ...n,
  get(i, c, u) {
    return Eh(i, c) ? OS : n.get(i, c, u);
  },
  has(i, c) {
    return Eh(i, c) || n.has(i, c);
  },
}));
const DS = { 1: (n) => zS(n) },
  ir = (n) => typeof n == 'object' && n !== null && !Array.isArray(n);
function zS(n) {
  const i = { ...n, schemaVersion: 2 };
  let c = 0;
  const u = (f) => ({ id: `eq_mig_${Date.now().toString(36)}_${c++}`, masterId: f, forgeLevel: 0 }),
    r = ir(i.guild) ? { ...i.guild } : {};
  return (
    Array.isArray(r.equipment) || (r.equipment = []),
    Array.isArray(r.foodStorage) || (r.foodStorage = []),
    Array.isArray(r.members) &&
      (r.members = r.members.map((f) => {
        if (!ir(f)) return f;
        const m = ir(f.equipment) ? { ...f.equipment } : {};
        for (const h of ['weapon', 'armor', 'accessory']) {
          const y = m[h];
          m[h] = typeof y == 'string' ? u(y) : (y ?? null);
        }
        return { ...f, equipment: m };
      })),
    (i.guild = r),
    Array.isArray(i.unlockedRecipeIds) || (i.unlockedRecipeIds = []),
    i
  );
}
function BS(n) {
  return structuredClone(n);
}
function Sa(n) {
  return typeof n == 'object' && n !== null && !Array.isArray(n);
}
function LS(n) {
  if (
    !Sa(n) ||
    typeof n.schemaVersion != 'number' ||
    typeof n.masterSeed != 'number' ||
    !Sa(n.guild)
  )
    return !1;
  const i = n.guild;
  return !(
    typeof i.name != 'string' ||
    !Array.isArray(i.members) ||
    !Array.isArray(i.equipment) ||
    !Sa(n.forgeInventory) ||
    !Sa(n.towerState) ||
    !Sa(n.towerState.record) ||
    typeof n.towerState.record.deepestReached != 'number'
  );
}
function T_(n) {
  if (!Sa(n) || typeof n.schemaVersion != 'number')
    return { ok: !1, reason: 'セーブデータの構造が不正です' };
  let i = n.schemaVersion;
  if (i > uu) return { ok: !1, reason: `未知のバージョン (${i} > ${uu}) のセーブデータです` };
  let c = { ...n };
  for (; i < uu; ) {
    const u = DS[i];
    if (!u) return { ok: !1, reason: `バージョン ${i} の migration が未定義です` };
    ((c = u(c)), (i = typeof c.schemaVersion == 'number' ? c.schemaVersion : i + 1));
  }
  return LS(c)
    ? { ok: !0, data: c }
    : { ok: !1, reason: 'migration 後のデータが SaveData の形をしていません' };
}
function qS(n) {
  return {
    guildName: n.guild.name,
    deepestReached: n.towerState.record.deepestReached,
    memberCount: n.guild.members.length,
    savedAt: n.savedAt,
  };
}
function Nh() {
  return {
    guildName: '(破損データ)',
    deepestReached: 0,
    memberCount: 0,
    savedAt: 0,
    corrupted: !0,
  };
}
const US = 'sekaiju-like-game',
  HS = 1,
  Ri = 'saves',
  Yr = 'main';
let sr = null;
function Xr() {
  return (
    sr ||
      (sr = CS(US, HS, {
        upgrade(n) {
          n.objectStoreNames.contains(Ri) || n.createObjectStore(Ri);
        },
      })),
    sr
  );
}
async function ur(n) {
  const i = { ...n, savedAt: Date.now() };
  return (await (await Xr()).put(Ri, BS(i), Yr), i);
}
async function GS() {
  const i = await (await Xr()).get(Ri, Yr);
  return i === void 0 ? { ok: !1, reason: 'empty' } : T_(i);
}
async function IS() {
  const i = await (await Xr()).get(Ri, Yr);
  if (i === void 0) return null;
  const c = T_(i);
  if (!c.ok) return Nh();
  try {
    return qS(c.data);
  } catch {
    return Nh();
  }
}
const E_ = { save: null, saving: !1 };
function $S(n, i) {
  switch (i.type) {
    case 'load':
      return { ...n, save: i.save };
    case 'updateSave':
      return n.save ? { ...n, save: i.updater(n.save) } : n;
    case 'setSave':
      return { ...n, save: i.save };
    case 'saving':
      return { ...n, saving: i.saving };
    case 'clear':
      return { ...E_ };
  }
}
const N_ = E.createContext(null);
function YS(n) {
  const i = E.useRef(n);
  return ((i.current = n), i);
}
function XS({ children: n }) {
  const [i, c] = E.useReducer($S, E_),
    u = YS(i),
    r = E.useCallback(async (b) => {
      const k = SS(b),
        j = await ur(k);
      c({ type: 'load', save: j });
    }, []),
    f = E.useCallback(async () => {
      const b = await GS();
      return b.ok ? (c({ type: 'load', save: b.data }), { ok: !0 }) : { ok: !1, reason: b.reason };
    }, []),
    m = E.useCallback((b) => {
      c({ type: 'updateSave', updater: b });
    }, []),
    h = E.useCallback(
      async (b) => {
        const k = u.current.save;
        if (!k) return;
        const j = b(k);
        (c({ type: 'setSave', save: j }), c({ type: 'saving', saving: !0 }));
        try {
          const S = await ur(j);
          c({ type: 'setSave', save: S });
        } finally {
          c({ type: 'saving', saving: !1 });
        }
      },
      [u]
    ),
    y = E.useCallback(async () => {
      const { save: b } = u.current;
      if (b) {
        c({ type: 'saving', saving: !0 });
        try {
          const k = await ur(b);
          c({ type: 'setSave', save: k });
        } finally {
          c({ type: 'saving', saving: !1 });
        }
      }
    }, [u]),
    g = E.useCallback(() => {
      c({ type: 'clear' });
    }, []),
    v = E.useMemo(
      () => ({
        ...i,
        startNewGame: r,
        continueGame: f,
        applySave: m,
        applyAndPersist: h,
        persist: y,
        exitToTitle: g,
      }),
      [i, r, f, m, h, y, g]
    );
  return p.jsx(N_.Provider, { value: v, children: n });
}
function Ul() {
  const n = E.useContext(N_);
  if (!n) throw new Error('useGameState は GameStateProvider の内側で使ってください');
  return n;
}
const VS = () => {
    var st, Xe;
    const n = ol(),
      { save: i, applyAndPersist: c } = Ul(),
      u = E.useRef(null),
      [r, f] = E.useState(null),
      [m, h] = E.useState({}),
      [y, g] = E.useState(null),
      [v, b] = E.useState(!1),
      [k, j] = E.useState(!1),
      [S, R] = E.useState(null),
      [A, w] = E.useState(!1),
      [T, V] = E.useState(null),
      [P, ee] = E.useState(null);
    E.useEffect(() => {
      if (r || !(i != null && i.diveState)) return;
      const I = i.diveState.depth,
        oe = (i.masterSeed ^ (I * 2654435761) ^ (i.towerState.record.totalDives * 40503)) >>> 0;
      u.current = On(oe);
      const de = i.diveState.pendingFoeBattle;
      f(de ? dh(i, [de.enemyId], de.firstStrike) : dh(i, dS(I, u.current)));
    }, [i, r]);
    const X = E.useRef(!1);
    E.useEffect(() => {
      !r ||
        !u.current ||
        X.current ||
        (r.turn === 1 &&
          r.firstStrike === 'ambush' &&
          r.outcome === 'ongoing' &&
          ((X.current = !0), f(tr(r, [], u.current))));
    }, [r]);
    const H = E.useMemo(() => (r == null ? void 0 : r.enemies.filter((I) => !I.isDown)) ?? [], [r]),
      q = E.useMemo(() => (r == null ? void 0 : r.allies.filter((I) => !I.isDown)) ?? [], [r]);
    (E.useEffect(() => {
      H.length > 0 && !H.some((I) => I.id === S) && R(H[0].id);
    }, [H, S]),
      E.useEffect(() => {
        if ((r == null ? void 0 : r.outcome) !== 'ongoing' || (y && q.some((oe) => oe.id === y)))
          return;
        const I = q.find((oe) => !m[oe.id]) ?? null;
        g(I ? I.id : null);
      }, [r, q, y, m]));
    const Q = q.length > 0 && q.every((I) => m[I.id] !== void 0),
      te = E.useCallback(
        (I, oe) => {
          const de = { ...m, [I]: oe };
          (h(de), b(!1), j(!1));
          const Me = q.find((Te) => Te.id !== I && !de[Te.id]);
          g(Me ? Me.id : null);
        },
        [m, q]
      ),
      se = E.useCallback(
        async (I) => {
          w(!0);
          const oe = I.outcome === 'win';
          I.outcome === 'lose'
            ? (await c((de) => Mi(hh(de, I))), n('/town'))
            : (await c((de) => uS(hh(de, I), oe)), n('/dungeon'));
        },
        [c, n]
      ),
      ce = E.useCallback(() => {
        var I;
        (h({}), b(!1), j(!1), V(null), ee(null), g(((I = q[0]) == null ? void 0 : I.id) ?? null));
      }, [q]),
      Z = E.useCallback(() => {
        var Me;
        if (!r || !u.current || r.outcome !== 'ongoing') return;
        const I = S ?? ((Me = H[0]) == null ? void 0 : Me.id) ?? '',
          oe = q.map((Te) => {
            const bt = m[Te.id] ?? { kind: 'attack' };
            return bt.kind === 'guard'
              ? { kind: 'guard', actorId: Te.id }
              : bt.kind === 'skill'
                ? { kind: 'skill', actorId: Te.id, skillId: bt.skillId, targetId: I }
                : bt.kind === 'item'
                  ? { kind: 'item', actorId: Te.id, itemId: bt.itemId, targetId: Te.id }
                  : { kind: 'attack', actorId: Te.id, targetId: I };
          });
        if (T) {
          const Te = ka[T.unionSkillId],
            bt =
              (Te == null ? void 0 : Te.target) === 'enemyOne' ||
              (Te == null ? void 0 : Te.target) === 'enemyRow' ||
              (Te == null ? void 0 : Te.target) === 'enemyAll';
          oe.unshift({ kind: 'union', ...T, targetId: bt ? I : T.targetId });
        }
        const de = tr(r, oe, u.current);
        (f(de), h({}), b(!1), j(!1), V(null), ee(null), g(null));
      }, [r, m, S, q, H, T]),
      J = E.useCallback(() => {
        if (!r || !u.current || r.outcome !== 'ongoing') return;
        const I = q[0];
        I && (f(tr(r, [{ kind: 'flee', actorId: I.id }], u.current)), h({}), g(null));
      }, [r, q]);
    if (!i || !i.diveState) return p.jsx(ul, { to: '/town', replace: !0 });
    if (!r) return p.jsx('div', { className: F.layout, children: '戦闘準備中...' });
    const pe = (I) => {
        const oe = i.guild.members.find((de) => de.id === I.id);
        return oe
          ? Object.keys(oe.learnedSkills).filter((de) => de in Dl && I.tp >= Dl[de].tpCost(1))
          : [];
      },
      L = () => {
        const I = (de) =>
            Object.values(m).filter((Me) => Me.kind === 'item' && Me.itemId === de).length,
          oe = (de) => r.consumedItems.filter((Me) => Me === de).length;
        return i.guild.storage
          .filter((de) => {
            var Me, Te;
            return (Te = (Me = et[de.itemId]) == null ? void 0 : Me.useContext) == null
              ? void 0
              : Te.includes('battle');
          })
          .map((de) => ({
            id: de.itemId,
            remaining: t_(i, de.itemId) - oe(de.itemId) - I(de.itemId),
          }))
          .filter((de) => de.remaining > 0);
      },
      K = (I) => {
        var de, Me;
        const oe = m[I.id];
        return oe
          ? oe.kind === 'attack'
            ? '攻撃'
            : oe.kind === 'guard'
              ? '防御'
              : oe.kind === 'item'
                ? (((de = et[oe.itemId]) == null ? void 0 : de.name) ?? 'どうぐ')
                : (((Me = Dl[oe.skillId]) == null ? void 0 : Me.name) ?? 'スキル')
          : '';
      },
      le = (I) => {
        const oe = (Me) => Me === 'headBind' || Me === 'armBind' || Me === 'legBind';
        let de = '';
        return (
          I.ailments.some((Me) => oe(Me.type)) && (de += ' 🔒'),
          I.ailments.some((Me) => !oe(Me.type)) && (de += ' 🌀'),
          de
        );
      },
      ge = (I) => {
        var Me;
        const oe = i.guild.members.find((Te) => Te.id === I.id);
        if (!oe) return null;
        const de =
          (Me = Pt[oe.raceId]) == null
            ? void 0
            : Me.raceSkillTree.skills.find((Te) => Te.skillId in ka);
        return !de || !(de.skillId in oe.learnedSkills) ? null : (ka[de.skillId] ?? null);
      },
      xe = (I, oe, de) => {
        var bt;
        const Te =
          oe.target === 'enemyOne' || oe.target === 'enemyRow' || oe.target === 'enemyAll'
            ? (S ?? ((bt = H[0]) == null ? void 0 : bt.id) ?? '')
            : I;
        (V({ actorId: I, unionSkillId: oe.id, participantIds: de, targetId: Te }), ee(null));
      },
      C = (I, oe) => {
        oe.requiredParticipants <= 1 ? xe(I.id, oe, [I.id]) : ee({ actorId: I.id, def: oe });
      },
      G = y ? q.find((I) => I.id === y) : void 0,
      W = ((st = r.enemies.find((I) => I.id === S)) == null ? void 0 : st.name) ?? '-',
      ne = d_(r),
      he = (I) =>
        p.jsxs(
          'button',
          {
            type: 'button',
            className: [
              F.card,
              I.isDown ? F.down : '',
              y === I.id ? F.cardActive : '',
              m[I.id] ? F.cardDecided : '',
            ].join(' '),
            disabled: I.isDown || r.outcome !== 'ongoing',
            onClick: () => {
              (g(I.id), b(!1), j(!1));
            },
            children: [
              p.jsxs('div', {
                className: F.cardName,
                children: [
                  I.name,
                  I.unionGauge >= 100 ? p.jsx('span', { className: F.uni, children: '★' }) : null,
                  le(I),
                ],
              }),
              p.jsx(eu, { value: I.hp, max: I.maxHp, color: '#4caf50', showValue: !1 }),
              p.jsx(eu, { value: I.tp, max: I.maxTp, color: '#2196f3', showValue: !1 }),
              p.jsxs('div', {
                className: F.cardNums,
                children: ['HP ', Math.max(0, I.hp), ' · TP ', I.tp],
              }),
              m[I.id] ? p.jsxs('div', { className: F.cardCmd, children: ['▶ ', K(I)] }) : null,
            ],
          },
          I.id
        ),
      be = r.allies.filter((I) => I.row === 'front'),
      Ce = r.allies.filter((I) => I.row === 'back');
    return p.jsxs('div', {
      className: F.layout,
      children: [
        p.jsx('div', {
          className: F.enemies,
          children: r.enemies.map((I) =>
            p.jsxs(
              'button',
              {
                type: 'button',
                className: `${F.enemy} ${I.isDown ? F.down : ''} ${S === I.id ? F.targeted : ''}`,
                disabled: I.isDown,
                onClick: () => R(I.id),
                children: [
                  p.jsxs('span', { className: F.enemyName, children: [I.name, le(I)] }),
                  p.jsx(eu, { value: I.hp, max: I.maxHp, color: '#e57373', showValue: !1 }),
                ],
              },
              I.id
            )
          ),
        }),
        r.summons.length > 0
          ? p.jsx('div', {
              className: F.summons,
              children: r.summons.map((I) =>
                p.jsxs(
                  'div',
                  {
                    className: `${F.summon} ${I.isDown ? F.down : ''}`,
                    children: [
                      p.jsxs('span', { className: F.summonName, children: ['🐾 ', I.name] }),
                      p.jsx(eu, { value: I.hp, max: I.maxHp, color: '#8d6e63', showValue: !1 }),
                      p.jsxs('span', {
                        className: F.summonHp,
                        children: ['HP ', Math.max(0, I.hp)],
                      }),
                    ],
                  },
                  I.id
                )
              ),
            })
          : null,
        p.jsxs('div', {
          className: F.party,
          children: [
            p.jsx('div', { className: F.rowTag, children: '前衛' }),
            p.jsx('div', { className: F.cardRow, children: be.map(he) }),
            p.jsx('div', { className: F.rowTag, children: '後衛（近接ダメージ -30%）' }),
            p.jsx('div', {
              className: F.cardRow,
              children:
                Ce.length > 0
                  ? Ce.map(he)
                  : p.jsx('div', { className: F.empty, children: '（なし）' }),
            }),
          ],
        }),
        r.outcome !== 'ongoing'
          ? p.jsxs('div', {
              className: F.result,
              children: [
                p.jsx('div', {
                  className: F.resultTitle,
                  children:
                    r.outcome === 'win' ? '勝利！' : r.outcome === 'fled' ? '逃走した' : '全滅...',
                }),
                r.outcome === 'win'
                  ? p.jsxs('div', {
                      className: F.resultBody,
                      children: ['経験値 ', ne.exp, ' ／ ', ne.gold, ' G を獲得'],
                    })
                  : r.outcome === 'lose'
                    ? p.jsx('div', { className: F.resultBody, children: '拠点へ帰還する' })
                    : null,
                p.jsx('button', {
                  type: 'button',
                  className: F.primary,
                  disabled: A,
                  onClick: () => void se(r),
                  children: 'つづける',
                }),
              ],
            })
          : p.jsxs('div', {
              className: F.command,
              children: [
                p.jsxs('div', {
                  className: F.target,
                  children: ['対象: ', W, '（敵をタップで変更）'],
                }),
                T
                  ? p.jsxs('div', {
                      className: F.unionBanner,
                      children: [
                        '⚡ ユニオン予約: ',
                        (Xe = ka[T.unionSkillId]) == null ? void 0 : Xe.name,
                        p.jsx('button', {
                          type: 'button',
                          className: F.unionCancel,
                          onClick: () => V(null),
                          children: '取消',
                        }),
                      ],
                    })
                  : null,
                G
                  ? p.jsxs(p.Fragment, {
                      children: [
                        p.jsxs('div', { className: F.cmdHead, children: [G.name, ' のコマンド'] }),
                        v
                          ? p.jsxs('div', {
                              className: F.skillList,
                              children: [
                                pe(G).map((I) => {
                                  var oe;
                                  return p.jsxs(
                                    'button',
                                    {
                                      type: 'button',
                                      className: F.skillBtn,
                                      onClick: () => te(G.id, { kind: 'skill', skillId: I }),
                                      children: [
                                        p.jsxs('span', {
                                          className: F.skillTop,
                                          children: [
                                            p.jsx('span', {
                                              className: F.skillName,
                                              children: Dl[I].name,
                                            }),
                                            p.jsxs('span', {
                                              className: F.tp,
                                              children: ['TP ', Dl[I].tpCost(1)],
                                            }),
                                          ],
                                        }),
                                        p.jsx('span', {
                                          className: F.skillDesc,
                                          children:
                                            ((oe = Rr[I]) == null ? void 0 : oe.description) ?? '',
                                        }),
                                      ],
                                    },
                                    I
                                  );
                                }),
                                pe(G).length === 0
                                  ? p.jsx('div', {
                                      className: F.empty,
                                      children: '使えるスキルがない',
                                    })
                                  : null,
                                p.jsx('button', {
                                  type: 'button',
                                  className: F.menuBack,
                                  onClick: () => b(!1),
                                  children: 'もどる',
                                }),
                              ],
                            })
                          : k
                            ? p.jsxs('div', {
                                className: F.skillList,
                                children: [
                                  L().map(({ id: I, remaining: oe }) =>
                                    p.jsxs(
                                      'button',
                                      {
                                        type: 'button',
                                        className: F.skillBtn,
                                        onClick: () => te(G.id, { kind: 'item', itemId: I }),
                                        children: [
                                          p.jsx('span', {
                                            className: F.skillTop,
                                            children: p.jsxs('span', {
                                              className: F.skillName,
                                              children: [et[I].name, ' ×', oe],
                                            }),
                                          }),
                                          p.jsx('span', {
                                            className: F.skillDesc,
                                            children: et[I].description,
                                          }),
                                        ],
                                      },
                                      I
                                    )
                                  ),
                                  L().length === 0
                                    ? p.jsx('div', {
                                        className: F.empty,
                                        children: '使える道具がない',
                                      })
                                    : null,
                                  p.jsx('button', {
                                    type: 'button',
                                    className: F.menuBack,
                                    onClick: () => j(!1),
                                    children: 'もどる',
                                  }),
                                ],
                              })
                            : P
                              ? p.jsxs('div', {
                                  className: F.skillList,
                                  children: [
                                    p.jsxs('div', {
                                      className: F.unionHint,
                                      children: [
                                        P.def.name,
                                        '：協力者を選択（あと',
                                        P.def.requiredParticipants - 1,
                                        '人。各自ゲージ',
                                        P.def.gaugeCostPerParticipant,
                                        '消費）',
                                      ],
                                    }),
                                    q
                                      .filter((I) => I.id !== P.actorId)
                                      .map((I) =>
                                        p.jsx(
                                          'button',
                                          {
                                            type: 'button',
                                            className: F.skillBtn,
                                            onClick: () => xe(P.actorId, P.def, [P.actorId, I.id]),
                                            children: p.jsxs('span', {
                                              className: F.skillTop,
                                              children: [
                                                p.jsx('span', {
                                                  className: F.skillName,
                                                  children: I.name,
                                                }),
                                                p.jsxs('span', {
                                                  className: F.tp,
                                                  children: ['ゲージ ', I.unionGauge],
                                                }),
                                              ],
                                            }),
                                          },
                                          I.id
                                        )
                                      ),
                                    q.filter((I) => I.id !== P.actorId).length === 0
                                      ? p.jsx('div', {
                                          className: F.empty,
                                          children: '協力できる味方がいない',
                                        })
                                      : null,
                                    p.jsx('button', {
                                      type: 'button',
                                      className: F.menuBack,
                                      onClick: () => ee(null),
                                      children: 'もどる',
                                    }),
                                  ],
                                })
                              : p.jsxs('div', {
                                  className: F.menu,
                                  children: [
                                    p.jsx('button', {
                                      type: 'button',
                                      className: F.menuBtn,
                                      onClick: () => te(G.id, { kind: 'attack' }),
                                      children: '攻撃',
                                    }),
                                    p.jsx('button', {
                                      type: 'button',
                                      className: F.menuBtn,
                                      onClick: () => te(G.id, { kind: 'guard' }),
                                      children: '防御',
                                    }),
                                    p.jsx('button', {
                                      type: 'button',
                                      className: F.menuBtn,
                                      disabled: pe(G).length === 0,
                                      onClick: () => b(!0),
                                      children: 'スキル',
                                    }),
                                    p.jsx('button', {
                                      type: 'button',
                                      className: F.menuBtn,
                                      disabled: L().length === 0,
                                      onClick: () => j(!0),
                                      children: 'どうぐ',
                                    }),
                                    (() => {
                                      const I = ge(G);
                                      return !I || G.unionGauge < 100 || T
                                        ? null
                                        : p.jsx('button', {
                                            type: 'button',
                                            className: `${F.menuBtn} ${F.unionBtn}`,
                                            onClick: () => C(G, I),
                                            children: '⚡ユニオン',
                                          });
                                    })(),
                                    p.jsx('button', {
                                      type: 'button',
                                      className: F.menuBtn,
                                      onClick: J,
                                      children: '逃走',
                                    }),
                                  ],
                                }),
                      ],
                    })
                  : p.jsxs('div', {
                      className: F.execRow,
                      children: [
                        p.jsx('button', {
                          type: 'button',
                          className: F.redo,
                          onClick: ce,
                          children: 'やり直す',
                        }),
                        p.jsx('button', {
                          type: 'button',
                          className: F.primary,
                          disabled: !Q,
                          onClick: Z,
                          children: '実行',
                        }),
                      ],
                    }),
              ],
            }),
        p.jsx('div', {
          className: F.log,
          children:
            r.log.length === 0
              ? p.jsxs('div', {
                  className: F.logLine,
                  children: ['てきが あらわれた！（', r.turn, ' ターン目）'],
                })
              : r.log.map((I, oe) => p.jsx('div', { className: F.logLine, children: I.text }, oe)),
        }),
      ],
    });
  },
  QS = '_layout_iunlg_1',
  KS = '_head_iunlg_11',
  ZS = '_title_iunlg_15',
  JS = '_tabs_iunlg_21',
  WS = '_tab_iunlg_21',
  FS = '_tabActive_iunlg_38',
  PS = '_records_iunlg_43',
  ek = '_statBig_iunlg_48',
  tk = '_statNum_iunlg_60',
  lk = '_statLabel_iunlg_67',
  nk = '_statList_iunlg_72',
  ak = '_statRow_iunlg_76',
  ik = '_h2_iunlg_91',
  sk = '_bossLog_iunlg_97',
  uk = '_bossRow_iunlg_106',
  ck = '_codex_iunlg_114',
  ok = '_codexSummary_iunlg_121',
  rk = '_list_iunlg_127',
  fk = '_row_iunlg_133',
  dk = '_unseen_iunlg_140',
  mk = '_info_iunlg_144',
  pk = '_name_iunlg_150',
  hk = '_badge_iunlg_158',
  _k = '_sub_iunlg_167',
  gk = '_empty_iunlg_172',
  yk = '_foot_iunlg_177',
  vk = '_back_iunlg_181',
  Oe = {
    layout: QS,
    head: KS,
    title: ZS,
    tabs: JS,
    tab: WS,
    tabActive: FS,
    records: PS,
    statBig: ek,
    statNum: tk,
    statLabel: lk,
    statList: nk,
    statRow: ak,
    h2: ik,
    bossLog: sk,
    bossRow: uk,
    codex: ck,
    codexSummary: ok,
    list: rk,
    row: fk,
    unseen: dk,
    info: mk,
    name: pk,
    badge: hk,
    sub: _k,
    empty: gk,
    foot: yk,
    back: vk,
  };
function w_(n) {
  const i = n.bestiary.monsters;
  return Object.values(ql)
    .slice()
    .sort((c, u) => c.tierBand - u.tierBand || c.id.localeCompare(u.id))
    .map((c) => {
      const u = i[c.id],
        r = new Set((u == null ? void 0 : u.dropsFound) ?? []);
      return {
        id: c.id,
        name: c.name,
        tierBand: c.tierBand,
        seen: (u == null ? void 0 : u.seen) ?? !1,
        defeated: (u == null ? void 0 : u.defeated) ?? !1,
        drops: (c.drops ?? []).map((f) => {
          var m;
          return {
            itemId: f.itemId,
            name: ((m = et[f.itemId]) == null ? void 0 : m.name) ?? f.itemId,
            found: r.has(f.itemId),
          };
        }),
      };
    });
}
function bk(n) {
  const i = w_(n),
    c = i.length,
    u = i.filter((v) => v.seen).length,
    r = i.filter((v) => v.defeated).length;
  let f = 0,
    m = 0;
  for (const v of i) for (const b of v.drops) ((f += 1), b.found && (m += 1));
  const h = c + f,
    y = r + m,
    g = h === 0 ? 0 : Math.round((y / h) * 100);
  return {
    monstersTotal: c,
    monstersSeen: u,
    monstersDefeated: r,
    dropsTotal: f,
    dropsFound: m,
    completionPct: g,
  };
}
const Sk = () => {
    const n = ol(),
      { save: i } = Ul(),
      [c, u] = E.useState('record');
    if (!i) return p.jsx(ul, { to: '/title', replace: !0 });
    const r = i.towerState.record,
      f = bk(i),
      m = w_(i);
    return p.jsxs('div', {
      className: Oe.layout,
      children: [
        p.jsx('header', {
          className: Oe.head,
          children: p.jsx('h1', { className: Oe.title, children: '図鑑 / 記録' }),
        }),
        p.jsxs('div', {
          className: Oe.tabs,
          children: [
            p.jsx('button', {
              type: 'button',
              className: `${Oe.tab} ${c === 'record' ? Oe.tabActive : ''}`,
              onClick: () => u('record'),
              children: '到達記録',
            }),
            p.jsx('button', {
              type: 'button',
              className: `${Oe.tab} ${c === 'codex' ? Oe.tabActive : ''}`,
              onClick: () => u('codex'),
              children: '図鑑',
            }),
          ],
        }),
        c === 'record'
          ? p.jsxs('div', {
              className: Oe.records,
              children: [
                p.jsxs('div', {
                  className: Oe.statBig,
                  children: [
                    p.jsx('span', { className: Oe.statNum, children: r.deepestReached }),
                    p.jsx('span', { className: Oe.statLabel, children: '最深到達階' }),
                  ],
                }),
                p.jsxs('dl', {
                  className: Oe.statList,
                  children: [
                    p.jsxs('div', {
                      className: Oe.statRow,
                      children: [
                        p.jsx('dt', { children: '最高撃破ボス階' }),
                        p.jsx('dd', {
                          children: r.highestBossDefeated > 0 ? `${r.highestBossDefeated}F` : '—',
                        }),
                      ],
                    }),
                    p.jsxs('div', {
                      className: Oe.statRow,
                      children: [
                        p.jsx('dt', { children: '挑戦回数' }),
                        p.jsx('dd', { children: r.totalDives }),
                      ],
                    }),
                    p.jsxs('div', {
                      className: Oe.statRow,
                      children: [
                        p.jsx('dt', { children: '図鑑達成率' }),
                        p.jsxs('dd', { children: [f.completionPct, '%'] }),
                      ],
                    }),
                  ],
                }),
                p.jsx('h2', { className: Oe.h2, children: 'ボス撃破履歴' }),
                r.bossDefeatLog.length === 0
                  ? p.jsx('p', { className: Oe.empty, children: 'まだボスを倒していません。' })
                  : p.jsx('ul', {
                      className: Oe.bossLog,
                      children: r.bossDefeatLog
                        .slice()
                        .reverse()
                        .map((h, y) =>
                          p.jsx(
                            'li',
                            {
                              className: Oe.bossRow,
                              children: p.jsxs('span', { children: [h.depth, 'F のボス撃破'] }),
                            },
                            y
                          )
                        ),
                    }),
              ],
            })
          : p.jsxs('div', {
              className: Oe.codex,
              children: [
                p.jsxs('div', {
                  className: Oe.codexSummary,
                  children: [
                    '撃破 ',
                    f.monstersDefeated,
                    '/',
                    f.monstersTotal,
                    '・ドロップ ',
                    f.dropsFound,
                    '/',
                    f.dropsTotal,
                  ],
                }),
                p.jsx('div', {
                  className: Oe.list,
                  children: m.map((h) =>
                    p.jsx(
                      'div',
                      {
                        className: `${Oe.row} ${h.seen ? '' : Oe.unseen}`,
                        children: p.jsxs('div', {
                          className: Oe.info,
                          children: [
                            p.jsxs('span', {
                              className: Oe.name,
                              children: [
                                h.seen ? h.name : '？？？',
                                h.defeated
                                  ? p.jsx('span', { className: Oe.badge, children: '撃破' })
                                  : null,
                              ],
                            }),
                            p.jsxs('span', {
                              className: Oe.sub,
                              children: [
                                '第',
                                h.tierBand + 1,
                                '帯',
                                h.seen && h.drops.length > 0
                                  ? '・' + h.drops.map((y) => (y.found ? y.name : '？')).join(' / ')
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
        p.jsx('footer', {
          className: Oe.foot,
          children: p.jsx('button', {
            type: 'button',
            className: Oe.back,
            onClick: () => n('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  kk = '_layout_1395s_1',
  xk = '_head_1395s_13',
  Tk = '_depth_1395s_22',
  Ek = '_theme_1395s_28',
  Nk = '_fpvWrap_1395s_45',
  wk = '_mapWrap_1395s_51',
  Ck = '_palette_1395s_58',
  Ak = '_tool_1395s_68',
  jk = '_toolActive_1395s_79',
  Mk = '_paletteHint_1395s_85',
  Rk = '_stairs_1395s_94',
  Ok = '_action_1395s_108',
  Dk = '_notice_1395s_125',
  zk = '_controls_1395s_133',
  Bk = '_row_1395s_143',
  Lk = '_forward_1395s_149',
  qk = '_turn_1395s_164',
  Uk = '_back_1395s_178',
  Hk = '_itemOverlay_1395s_189',
  Gk = '_itemPanel_1395s_199',
  Ik = '_itemTitle_1395s_212',
  $k = '_itemEmpty_1395s_217',
  Yk = '_itemRow_1395s_223',
  Xk = '_itemName_1395s_231',
  Vk = '_itemDesc_1395s_239',
  Qk = '_itemTargets_1395s_245',
  Kk = '_itemTarget_1395s_245',
  Zk = '_itemHp_1395s_265',
  Jk = '_itemUse_1395s_271',
  Wk = '_itemClose_1395s_288',
  me = {
    layout: kk,
    head: xk,
    depth: Tk,
    theme: Ek,
    return: '_return_1395s_34',
    fpvWrap: Nk,
    mapWrap: wk,
    palette: Ck,
    tool: Ak,
    toolActive: jk,
    paletteHint: Mk,
    stairs: Rk,
    action: Ok,
    notice: Dk,
    controls: zk,
    row: Bk,
    forward: Lk,
    turn: qk,
    back: Uk,
    itemOverlay: Hk,
    itemPanel: Gk,
    itemTitle: Ik,
    itemEmpty: $k,
    itemRow: Yk,
    itemName: Xk,
    itemDesc: Vk,
    itemTargets: Qk,
    itemTarget: Kk,
    itemHp: Zk,
    itemUse: Jk,
    itemClose: Wk,
  },
  Fk = '_canvas_1keax_1',
  Pk = { canvas: Fk },
  C_ = [
    { id: 'icon_chest', symbol: '📦', label: '宝箱' },
    { id: 'icon_foe', symbol: '👹', label: '強敵(FOE)' },
    { id: 'icon_warning', symbol: '⚠️', label: '注意' },
    { id: 'icon_door', symbol: '🚪', label: '扉/近道' },
    { id: 'icon_gather', symbol: '⛏️', label: '採集' },
    { id: 'icon_event', symbol: '❗', label: 'イベント' },
    { id: 'icon_note', symbol: '📝', label: 'メモ' },
    { id: 'icon_star', symbol: '⭐', label: '任意' },
  ],
  ex = new Map(C_.map((n) => [n.id, n]));
function tx(n) {
  var i;
  return ((i = ex.get(n)) == null ? void 0 : i.symbol) ?? '•';
}
const Jt = {
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
  lx = ({
    floor: n,
    explored: i,
    pos: c,
    dir: u,
    icons: r = [],
    foes: f = [],
    depletedGathers: m = [],
    maxCell: h = 26,
    onCellClick: y,
  }) => {
    const g = E.useRef(null),
      v = Math.max(10, Math.min(h, Math.floor(360 / n.width))),
      b = n.width * v,
      k = n.height * v;
    E.useEffect(() => {
      const S = g.current;
      if (!S) return;
      const R = new Set(i),
        A = new Set(m),
        w = window.devicePixelRatio || 1;
      ((S.width = b * w), (S.height = k * w));
      const T = S.getContext('2d');
      if (!T) return;
      (T.scale(w, w), T.clearRect(0, 0, b, k));
      for (let Q = 0; Q < n.height; Q++)
        for (let te = 0; te < n.width; te++) {
          const se = R.has(`${te},${Q}`);
          ((T.fillStyle = se ? Jt.floor : Jt.fog),
            T.fillRect(te * v, Q * v, v, v),
            se &&
              ((T.strokeStyle = Jt.grid),
              (T.lineWidth = 1),
              T.strokeRect(te * v + 0.5, Q * v + 0.5, v - 1, v - 1)));
        }
      ((T.strokeStyle = Jt.wall), (T.lineWidth = 2), (T.lineCap = 'round'));
      const V = (Q, te, se, ce) => {
        (T.beginPath(), T.moveTo(Q, te), T.lineTo(se, ce), T.stroke());
      };
      for (let Q = 0; Q < n.height; Q++)
        for (let te = 0; te < n.width; te++) {
          if (!R.has(`${te},${Q}`)) continue;
          const se = n.cells[Q][te],
            ce = te * v,
            Z = Q * v;
          (se.walls.N && V(ce, Z, ce + v, Z),
            se.walls.S && V(ce, Z + v, ce + v, Z + v),
            se.walls.W && V(ce, Z, ce, Z + v),
            se.walls.E && V(ce + v, Z, ce + v, Z + v));
          const J = se.event;
          if (
            (J == null ? void 0 : J.kind) === 'stairsUp' ||
            (J == null ? void 0 : J.kind) === 'stairsDown'
          )
            ((T.fillStyle = J.kind === 'stairsUp' ? Jt.stairsUp : Jt.stairsDown),
              T.beginPath(),
              T.arc(ce + v / 2, Z + v / 2, v * 0.28, 0, Math.PI * 2),
              T.fill(),
              (T.fillStyle = '#ffffff'),
              (T.font = `bold ${Math.floor(v * 0.5)}px sans-serif`),
              (T.textAlign = 'center'),
              (T.textBaseline = 'middle'),
              T.fillText(J.kind === 'stairsUp' ? '▲' : '▼', ce + v / 2, Z + v / 2 + 1));
          else if ((J == null ? void 0 : J.kind) === 'gather') {
            const pe = A.has(`${te},${Q}`);
            ((T.fillStyle = pe ? Jt.gatherDone : Jt.gather),
              T.beginPath(),
              T.arc(ce + v / 2, Z + v / 2, v * 0.24, 0, Math.PI * 2),
              T.fill());
          } else
            (J == null ? void 0 : J.kind) === 'cookingSpot' &&
              ((T.fillStyle = Jt.cooking),
              T.fillRect(ce + v * 0.28, Z + v * 0.28, v * 0.44, v * 0.44));
        }
      ((T.font = `${Math.floor(v * 0.66)}px sans-serif`),
        (T.textAlign = 'center'),
        (T.textBaseline = 'middle'));
      for (const Q of r)
        R.has(`${Q.x},${Q.y}`) && T.fillText(tx(Q.iconId), Q.x * v + v / 2, Q.y * v + v / 2 + 1);
      for (const Q of f) {
        if (!R.has(`${Q.x},${Q.y}`)) continue;
        const te = Q.x * v + v / 2,
          se = Q.y * v + v / 2;
        ((T.fillStyle = Q.alerted ? Jt.foeAlert : Jt.foe),
          T.beginPath(),
          T.arc(te, se, v * 0.3, 0, Math.PI * 2),
          T.fill(),
          (T.fillStyle = '#ffffff'),
          (T.font = `bold ${Math.floor(v * 0.5)}px sans-serif`),
          (T.textAlign = 'center'),
          (T.textBaseline = 'middle'),
          T.fillText('!', te, se + 1));
      }
      const P = c.x * v + v / 2,
        ee = c.y * v + v / 2,
        X = v * 0.34,
        q = { N: -Math.PI / 2, E: 0, S: Math.PI / 2, W: Math.PI }[u];
      ((T.fillStyle = Jt.player),
        T.beginPath(),
        T.moveTo(P + Math.cos(q) * X, ee + Math.sin(q) * X),
        T.lineTo(P + Math.cos(q + 2.5) * X, ee + Math.sin(q + 2.5) * X),
        T.lineTo(P + Math.cos(q - 2.5) * X, ee + Math.sin(q - 2.5) * X),
        T.closePath(),
        T.fill());
    }, [n, i, c, u, r, f, m, v, b, k]);
    const j = (S) => {
      if (!y) return;
      const R = S.currentTarget.getBoundingClientRect(),
        A = Math.floor(((S.clientX - R.left) / R.width) * n.width),
        w = Math.floor(((S.clientY - R.top) / R.height) * n.height);
      A >= 0 && w >= 0 && A < n.width && w < n.height && y(A, w);
    };
    return p.jsx('canvas', {
      ref: g,
      className: Pk.canvas,
      style: { width: b, height: k },
      onClick: j,
    });
  },
  nx = '_gauge_1o2hx_1',
  ax = '_icon_1o2hx_11',
  ix = '_segments_1o2hx_16',
  sx = '_seg_1o2hx_16',
  ux = '_filled_1o2hx_28',
  cx = '_danger_1o2hx_32',
  va = { gauge: nx, icon: ax, segments: ix, seg: sx, filled: ux, danger: cx },
  ox = ({ level: n }) => {
    const i = n >= Ai;
    return p.jsxs('div', {
      className: va.gauge,
      role: 'img',
      'aria-label': `エンカウントゲージ ${n}/${Ai}`,
      children: [
        p.jsx('span', { className: va.icon, children: i ? '⚠' : '👣' }),
        p.jsx('div', {
          className: va.segments,
          children: Array.from({ length: Ai }, (c, u) =>
            p.jsx(
              'span',
              { className: [va.seg, u < n ? va.filled : '', i ? va.danger : ''].join(' ') },
              u
            )
          ),
        }),
      ],
    });
  },
  rx = '_view_tw2v9_1',
  fx = { view: rx },
  wh = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } };
function dx(n, i, c, u = 4) {
  const r = p_(c),
    f = m_(c),
    m = [];
  let { x: h, y } = i;
  for (let g = 0; g < u; g++) {
    const v = xa(n, h, y, c);
    if (
      (m.push({
        x: h,
        y,
        leftOpen: !n.cells[y][h].walls[r],
        rightOpen: !n.cells[y][h].walls[f],
        frontOpen: v,
        event: n.cells[y][h].event,
      }),
      !v)
    )
      break;
    ((h += wh[c].dx), (y += wh[c].dy));
  }
  return m;
}
const mx = {
    sky: '#26301c',
    ceiling: '#3a4a2c',
    floor: '#5d6b46',
    wall: '#8b9a6b',
    frontWall: '#7a8a5c',
    outline: '#2c3720',
  },
  px = 0.56,
  hx = ({
    floor: n,
    pos: i,
    dir: c,
    foes: u = [],
    theme: r,
    maxDepth: f = 4,
    width: m = 358,
    height: h = 200,
  }) => {
    const y = E.useRef(null);
    return (
      E.useEffect(() => {
        const g = { ...mx, ...(r ?? {}) },
          v = y.current;
        if (!v) return;
        const b = window.devicePixelRatio || 1;
        ((v.width = m * b), (v.height = h * b));
        const k = v.getContext('2d');
        if (!k) return;
        k.scale(b, b);
        const j = m,
          S = h,
          R = j / 2,
          A = S / 2,
          w = dx(n, i, c, f),
          T = (ee) => {
            const X = Math.pow(px, ee);
            return {
              l: R - (j / 2) * X,
              r: R + (j / 2) * X,
              t: A - (S / 2) * X,
              b: A + (S / 2) * X,
            };
          },
          V = (ee, X, H = !1) => {
            (k.beginPath(), k.moveTo(ee[0][0], ee[0][1]));
            for (let q = 1; q < ee.length; q++) k.lineTo(ee[q][0], ee[q][1]);
            (k.closePath(),
              (k.fillStyle = X),
              k.fill(),
              H && ((k.strokeStyle = g.outline), (k.lineWidth = 1), k.stroke()));
          },
          P = (ee) => `rgba(0,0,0,${Math.min(0.5, ee * 0.13)})`;
        ((k.fillStyle = g.sky), k.fillRect(0, 0, j, S));
        for (let ee = w.length - 1; ee >= 0; ee--) {
          const X = T(ee),
            H = T(ee + 1),
            q = w[ee];
          (V(
            [
              [X.l, X.t],
              [X.r, X.t],
              [H.r, H.t],
              [H.l, H.t],
            ],
            g.ceiling
          ),
            V(
              [
                [X.l, X.b],
                [X.r, X.b],
                [H.r, H.b],
                [H.l, H.b],
              ],
              g.floor
            ),
            V(
              [
                [X.l, X.t],
                [H.l, H.t],
                [H.l, H.b],
                [X.l, X.b],
              ],
              q.leftOpen ? g.sky : g.wall,
              !0
            ),
            V(
              [
                [X.r, X.t],
                [H.r, H.t],
                [H.r, H.b],
                [X.r, X.b],
              ],
              q.rightOpen ? g.sky : g.wall,
              !0
            ),
            q.frontOpen ||
              V(
                [
                  [H.l, H.t],
                  [H.r, H.t],
                  [H.r, H.b],
                  [H.l, H.b],
                ],
                g.frontWall,
                !0
              ),
            (k.fillStyle = P(ee)),
            k.fillRect(H.l, H.t, H.r - H.l, H.b - H.t));
          const Q = q.event;
          if (
            (Q == null ? void 0 : Q.kind) === 'stairsUp' ||
            (Q == null ? void 0 : Q.kind) === 'stairsDown'
          ) {
            const te = R,
              se = (X.b + H.b) / 2 - (X.b - H.b) * 0.15,
              ce = Math.max(12, (X.b - X.t) * 0.18);
            ((k.fillStyle = Q.kind === 'stairsUp' ? '#e8923a' : '#7aa2d6'),
              k.beginPath(),
              k.arc(te, se, ce, 0, Math.PI * 2),
              k.fill(),
              (k.fillStyle = '#fff'),
              (k.font = `bold ${Math.floor(ce * 1.2)}px sans-serif`),
              (k.textAlign = 'center'),
              (k.textBaseline = 'middle'),
              k.fillText(Q.kind === 'stairsUp' ? '▲' : '▼', te, se + 1));
          }
          if (ee > 0 && u.some((te) => te.x === q.x && te.y === q.y)) {
            const te = u.some((J) => J.x === q.x && J.y === q.y && J.alerted),
              se = R,
              ce = (X.b + H.b) / 2 - (X.b - H.b) * 0.1,
              Z = Math.max(14, (X.b - X.t) * 0.22);
            ((k.fillStyle = te ? '#d32f2f' : '#b0533a'),
              k.beginPath(),
              k.arc(se, ce, Z, 0, Math.PI * 2),
              k.fill(),
              (k.fillStyle = '#fff'),
              (k.font = `bold ${Math.floor(Z * 1.3)}px sans-serif`),
              (k.textAlign = 'center'),
              (k.textBaseline = 'middle'),
              k.fillText('!', se, ce + 1));
          }
        }
      }, [n, i, c, u, r, f, m, h]),
      p.jsx('canvas', { ref: y, className: fx.view, style: { width: m, height: h } })
    );
  },
  lu = [
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
function Ch(n) {
  const i = Math.floor((n - 1) / 10);
  return lu[((i % lu.length) + lu.length) % lu.length];
}
function _x(n) {
  var u, r, f;
  const i = n.diveState;
  if (!i) return !1;
  const c =
    (r = (u = n.towerState.floors[i.depth]) == null ? void 0 : u.generated.cells[i.pos.y]) == null
      ? void 0
      : r[i.pos.x];
  return ((f = c == null ? void 0 : c.event) == null ? void 0 : f.kind) === 'cookingSpot';
}
function gx(n) {
  const i = new Set(n.unlockedRecipeIds ?? []);
  return Object.values(ja).filter((c) => i.has(c.id));
}
function A_(n, i) {
  const c = ja[i];
  return !c || !(n.unlockedRecipeIds ?? []).includes(i)
    ? !1
    : c.ingredients.every((u) => Br(n, u.itemId) >= u.qty);
}
function yx(n, i) {
  if (!A_(n, i)) return { ok: !1, save: n };
  const c = ja[i];
  let u = n;
  for (const r of c.ingredients) u = i_(u, r.itemId, r.qty);
  return ((u = a_(u, c.result.itemId, c.result.count)), { ok: !0, save: u });
}
function j_(n, i) {
  const c = new Set([...n.guild.party.front, ...n.guild.party.back].filter((u) => u !== null));
  return n.guild.members.some((u) => c.has(u.id) && (u.learnedSkills[i] ?? 0) > 0);
}
function M_(n) {
  var f, m, h;
  const i = n.diveState;
  if (!i) return null;
  const c = (f = n.towerState.floors[i.depth]) == null ? void 0 : f.generated,
    u = (m = c == null ? void 0 : c.cells[i.pos.y]) == null ? void 0 : m[i.pos.x];
  if (!c || ((h = u == null ? void 0 : u.event) == null ? void 0 : h.kind) !== 'gather')
    return null;
  const r = u.event.gatherId;
  return c.gatheringPoints.find((y) => y.id === r) ?? null;
}
function Sr(n, i) {
  var r;
  const c = n.diveState;
  return c
    ? (((r = n.towerState.floors[c.depth]) == null ? void 0 : r.depletedGathers) ?? []).includes(
        pu(i.cell.x, i.cell.y)
      )
    : !0;
}
function Ah(n, i) {
  return j_(n, Mn[i.type].requiredSkillId);
}
function vx(n, i) {
  const c = n.reduce((r, f) => r + f.weight, 0);
  let u = i.next() * c;
  for (const r of n) if (((u -= r.weight), u < 0)) return r.itemId;
  return n[n.length - 1].itemId;
}
function bx(n, i) {
  const c = n.diveState;
  if (!c) return { ok: !1, save: n, reason: 'noDive' };
  const u = M_(n);
  if (!u) return { ok: !1, save: n, reason: 'noPoint' };
  if (Sr(n, u)) return { ok: !1, save: n, reason: 'depleted' };
  const r = Mn[u.type];
  if (!j_(n, r.requiredSkillId)) return { ok: !1, save: n, reason: 'noSkill' };
  if (r.food && n_(n) >= l_) return { ok: !1, save: n, reason: 'foodFull' };
  const f = vx(r.drops, i);
  let m = r.food ? a_(n, f, 1) : Dr(n, f, 1);
  const h = pu(u.cell.x, u.cell.y),
    y = m.towerState.floors[c.depth],
    g = y.depletedGathers.includes(h) ? y.depletedGathers : [...y.depletedGathers, h];
  return (
    (m = {
      ...m,
      towerState: {
        ...m.towerState,
        floors: { ...m.towerState.floors, [c.depth]: { ...y, depletedGathers: g } },
      },
    }),
    { ok: !0, save: m, itemId: f, reason: void 0 }
  );
}
function Sx(n, i, c) {
  var R;
  const u = et[i];
  if (!u) return { save: n, ok: !1, message: 'そのアイテムは無い' };
  if (!((R = u.useContext) != null && R.includes('field')))
    return { save: n, ok: !1, message: 'ここでは使えない' };
  const r = e1(i);
  if ((r ? Br(n, i) : t_(n, i)) <= 0) return { save: n, ok: !1, message: '所持していない' };
  const m = (A) => (r ? i_(A, i, 1) : zr(A, i, 1));
  if (i === 'item_return_thread')
    return n.diveState
      ? { save: Mi(m(n)), ok: !0, message: '拠点へ帰還した' }
      : { save: n, ok: !1, message: '探索中のみ使える' };
  if (!n.diveState) return { save: n, ok: !1, message: '探索中のみ使える' };
  const h = n.diveState.party.find((A) => A.charId === c),
    y = n.guild.members.find((A) => A.id === c);
  if (!h || !y) return { save: n, ok: !1, message: '対象がいない' };
  const g = zi(y);
  let v = h.hp,
    b = h.tp,
    k = !1;
  for (const A of u.effects ?? [])
    A.kind === 'heal'
      ? ((v = Math.min(g.hp, v + A.amount(1))), (k = !0))
      : A.kind === 'restoreTp' && ((b = Math.min(g.tp, b + A.amount(1))), (k = !0));
  if (!k) return { save: n, ok: !1, message: 'いま使う効果がない' };
  const j = n.diveState.party.map((A) => (A.charId === c ? { ...A, hp: v, tp: b } : A));
  return {
    save: m({ ...n, diveState: { ...n.diveState, party: j } }),
    ok: !0,
    message: `${y.name} に ${u.name} を使った`,
  };
}
function kx(n) {
  return { depth: n, floorPaint: [], wallDraw: [], icons: [], notes: [], autopilotRoutes: [] };
}
function xx(n, i) {
  return n.playerMaps[i] ?? kx(i);
}
function R_(n, i, c) {
  return { ...n, playerMaps: { ...n.playerMaps, [i]: c } };
}
function Tx(n, i, c, u, r) {
  const f = xx(n, i),
    m = f.icons.find((g) => g.x === c && g.y === u),
    h = f.icons.filter((g) => !(g.x === c && g.y === u)),
    y = (m == null ? void 0 : m.iconId) === r ? h : [...h, { x: c, y: u, iconId: r }];
  return R_(n, i, { ...f, icons: y });
}
function Ex(n, i, c, u) {
  const r = n.playerMaps[i];
  return r ? R_(n, i, { ...r, icons: r.icons.filter((f) => !(f.x === c && f.y === u)) }) : n;
}
const Nx = () => {
    var ce;
    const n = ol(),
      { save: i, applySave: c, applyAndPersist: u } = Ul(),
      r = E.useRef(null),
      [f, m] = E.useState(null),
      [h, y] = E.useState(!1),
      [g, v] = E.useState(!1),
      [b, k] = E.useState(null),
      j = (i == null ? void 0 : i.diveState) ?? null,
      S = E.useMemo(() => {
        var Z;
        return i && j ? ((Z = i.towerState.floors[j.depth]) == null ? void 0 : Z.generated) : null;
      }, [i, j]),
      R = E.useMemo(() => {
        var Z;
        return i && j
          ? (((Z = i.towerState.floors[j.depth]) == null ? void 0 : Z.foeRuntime) ?? [])
              .filter((J) => !J.defeated)
              .map((J) => ({ x: J.cell.x, y: J.cell.y, alerted: J.alerted }))
          : [];
      }, [i, j]),
      A = E.useMemo(() => (i ? M_(i) : null), [i]),
      w = E.useMemo(() => (i ? _x(i) : !1), [i]),
      T = E.useMemo(() => {
        var Z;
        return i && j
          ? (((Z = i.towerState.floors[j.depth]) == null ? void 0 : Z.depletedGathers) ?? [])
          : [];
      }, [i, j]),
      V = E.useCallback(() => {
        var J;
        if (!i) return;
        r.current || (r.current = On((i.masterSeed ^ 2654435769) >>> 0));
        const Z = bx(i, r.current);
        if (!Z.ok) {
          k(
            Z.reason === 'noSkill'
              ? '対応する採集スキルを持つ仲間がいない'
              : Z.reason === 'foodFull'
                ? '食料がいっぱいで採れない'
                : '採集できない'
          );
          return;
        }
        (u(() => Z.save),
          k(
            `${Z.itemId ? (((J = et[Z.itemId]) == null ? void 0 : J.name) ?? '素材') : '素材'} を手に入れた`
          ));
      }, [i, u]),
      P = E.useCallback(
        (Z) => {
          var pe;
          if (!i) return;
          const J = yx(i, Z);
          J.ok &&
            (u(() => J.save), k(`${((pe = ja[Z]) == null ? void 0 : pe.name) ?? '料理'} を作った`));
        },
        [i, u]
      ),
      ee = E.useCallback(
        (Z) => {
          if (!i) return;
          (k(null), r.current || (r.current = On((i.masterSeed ^ 2654435769) >>> 0)));
          const J = sS(i, Z, r.current);
          (u(() => J.save), J.triggered && n('/battle'));
        },
        [i, u, n]
      ),
      X = E.useCallback(
        (Z) => {
          c((J) => y_(J, Z));
        },
        [c]
      ),
      H = E.useCallback(async () => {
        if (!i) return;
        const Z = vh(i);
        if (Z === 'stairsUp') {
          if (!b_(i, i.diveState.depth)) {
            k('強大な力に阻まれている。階層ボスを倒さねば先へ進めない。');
            return;
          }
          await u((J) => oS(J));
        } else
          Z === 'stairsDown' &&
            (i.diveState.depth <= 1 ? (await u((J) => Mi(J)), n('/town')) : await u((J) => rS(J)));
      }, [i, u, n]),
      q = E.useCallback(async () => {
        (await u((Z) => Mi(Z)), n('/town'));
      }, [u, n]),
      Q = E.useCallback(
        (Z, J) => {
          if (!i) return;
          const pe = Sx(i, Z, J);
          pe.ok && (u(() => pe.save), pe.save.diveState || (y(!1), n('/town')));
        },
        [i, u, n]
      ),
      te = E.useCallback(
        (Z, J) => {
          if (!j) return;
          const pe = j.depth;
          if (f !== null) {
            if (!((i == null ? void 0 : i.exploredCells[pe]) ?? []).includes(`${Z},${J}`)) return;
            u(f === 'erase' ? (xe) => Ex(xe, pe, Z, J) : (xe) => Tx(xe, pe, Z, J, f));
            return;
          }
          const L = Z - j.pos.x,
            K = J - j.pos.y,
            le = ['N', 'E', 'S', 'W'].find((ge) => Ft[ge].dx === L && Ft[ge].dy === K);
          le && ee(le);
        },
        [j, ee, f, i, u]
      );
    if (!i) return p.jsx(ul, { to: '/title', replace: !0 });
    if (!j || !S) return p.jsx(ul, { to: '/town', replace: !0 });
    const se = vh(i);
    return p.jsxs('div', {
      className: me.layout,
      children: [
        p.jsxs('header', {
          className: me.head,
          children: [
            p.jsxs('div', {
              className: me.depth,
              children: [
                j.depth,
                'F ',
                p.jsx('span', { className: me.theme, children: Ch(j.depth).name }),
              ],
            }),
            p.jsx(ox, { level: G1(j.encounter.stepsUntilEncounter) }),
            p.jsx('button', {
              type: 'button',
              className: me.return,
              onClick: () => y(!0),
              children: '道具',
            }),
            p.jsx('button', {
              type: 'button',
              className: me.return,
              onClick: () => void q(),
              children: '帰還',
            }),
          ],
        }),
        p.jsx('div', {
          className: me.fpvWrap,
          children: p.jsx(hx, { floor: S, pos: j.pos, dir: j.dir, foes: R, theme: Ch(j.depth) }),
        }),
        p.jsx('div', {
          className: me.mapWrap,
          children: p.jsx(lx, {
            floor: S,
            explored: i.exploredCells[j.depth] ?? [],
            pos: j.pos,
            dir: j.dir,
            icons: ((ce = i.playerMaps[j.depth]) == null ? void 0 : ce.icons) ?? [],
            foes: R,
            depletedGathers: T,
            onCellClick: te,
          }),
        }),
        p.jsxs('div', {
          className: me.palette,
          children: [
            p.jsx('button', {
              type: 'button',
              className: `${me.tool} ${f === null ? me.toolActive : ''}`,
              onClick: () => m(null),
              'aria-label': '移動モード',
              children: '🚶',
            }),
            C_.map((Z) =>
              p.jsx(
                'button',
                {
                  type: 'button',
                  className: `${me.tool} ${f === Z.id ? me.toolActive : ''}`,
                  onClick: () => m(Z.id),
                  'aria-label': Z.label,
                  children: Z.symbol,
                },
                Z.id
              )
            ),
            p.jsx('button', {
              type: 'button',
              className: `${me.tool} ${f === 'erase' ? me.toolActive : ''}`,
              onClick: () => m('erase'),
              'aria-label': '消しゴム',
              children: '🧽',
            }),
          ],
        }),
        p.jsx('p', {
          className: me.paletteHint,
          children:
            f === null
              ? '隣接マスをタップで移動。アイコンを選ぶとマップに書き込めます。'
              : f === 'erase'
                ? 'マップ上のマスをタップでアイコンを消去。'
                : 'マップ上の探索済みマスをタップでアイコンを配置（再タップで消去）。',
        }),
        se &&
          p.jsx('button', {
            type: 'button',
            className: me.stairs,
            onClick: () => void H(),
            children:
              se === 'stairsUp'
                ? '▲ 次の階へ進む'
                : j.depth <= 1
                  ? '▼ 拠点へ戻る'
                  : '▼ 前の階へ戻る',
          }),
        A &&
          p.jsx('button', {
            type: 'button',
            className: me.action,
            disabled: Sr(i, A) || !Ah(i, A),
            onClick: V,
            children: Sr(i, A)
              ? `🌿 ${Mn[A.type].name}（採集済み）`
              : Ah(i, A)
                ? `🌿 ${Mn[A.type].name}する`
                : `🌿 ${Mn[A.type].name}（スキル要）`,
          }),
        w &&
          p.jsx('button', {
            type: 'button',
            className: me.action,
            onClick: () => v(!0),
            children: '🍳 調理する',
          }),
        b && p.jsx('p', { className: me.notice, children: b }),
        p.jsxs('div', {
          className: me.controls,
          children: [
            p.jsxs('div', {
              className: me.row,
              children: [
                p.jsx('button', {
                  type: 'button',
                  className: me.turn,
                  onClick: () => X(p_(j.dir)),
                  'aria-label': '左を向く',
                  children: '↰',
                }),
                p.jsx('button', {
                  type: 'button',
                  className: me.forward,
                  onClick: () => ee(j.dir),
                  children: '前進',
                }),
                p.jsx('button', {
                  type: 'button',
                  className: me.turn,
                  onClick: () => X(m_(j.dir)),
                  'aria-label': '右を向く',
                  children: '↱',
                }),
              ],
            }),
            p.jsx('button', {
              type: 'button',
              className: me.back,
              onClick: () => X(I1(j.dir)),
              'aria-label': '振り向く',
              children: '↻ 振り向く',
            }),
          ],
        }),
        h
          ? p.jsx('div', {
              className: me.itemOverlay,
              onClick: () => y(!1),
              children: p.jsxs('div', {
                className: me.itemPanel,
                onClick: (Z) => Z.stopPropagation(),
                children: [
                  p.jsx('div', { className: me.itemTitle, children: 'どうぐ・食料' }),
                  (() => {
                    const Z = [...i.guild.storage, ...(i.guild.foodStorage ?? [])].filter((J) => {
                      var pe, L;
                      return (
                        ((L = (pe = et[J.itemId]) == null ? void 0 : pe.useContext) == null
                          ? void 0
                          : L.includes('field')) && J.qty > 0
                      );
                    });
                    return Z.length === 0
                      ? p.jsx('p', {
                          className: me.itemEmpty,
                          children: '使える道具がありません。',
                        })
                      : Z.map((J) => {
                          const pe = et[J.itemId],
                            L = J.itemId === 'item_return_thread';
                          return p.jsxs(
                            'div',
                            {
                              className: me.itemRow,
                              children: [
                                p.jsxs('div', {
                                  className: me.itemName,
                                  children: [
                                    pe.name,
                                    ' ×',
                                    J.qty,
                                    p.jsx('span', {
                                      className: me.itemDesc,
                                      children: pe.description,
                                    }),
                                  ],
                                }),
                                L
                                  ? p.jsx('button', {
                                      type: 'button',
                                      className: me.itemUse,
                                      onClick: () => Q(J.itemId),
                                      children: '使う',
                                    })
                                  : p.jsx('div', {
                                      className: me.itemTargets,
                                      children: j.party.map((K) => {
                                        const le = i.guild.members.find((xe) => xe.id === K.charId);
                                        if (!le) return null;
                                        const ge = zi(le);
                                        return p.jsxs(
                                          'button',
                                          {
                                            type: 'button',
                                            className: me.itemTarget,
                                            onClick: () => Q(J.itemId, K.charId),
                                            children: [
                                              le.name,
                                              p.jsxs('span', {
                                                className: me.itemHp,
                                                children: [
                                                  'HP ',
                                                  K.hp,
                                                  '/',
                                                  ge.hp,
                                                  '・TP ',
                                                  K.tp,
                                                  '/',
                                                  ge.tp,
                                                ],
                                              }),
                                            ],
                                          },
                                          K.charId
                                        );
                                      }),
                                    }),
                              ],
                            },
                            J.itemId
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
        g
          ? p.jsx('div', {
              className: me.itemOverlay,
              onClick: () => v(!1),
              children: p.jsxs('div', {
                className: me.itemPanel,
                onClick: (Z) => Z.stopPropagation(),
                children: [
                  p.jsx('div', { className: me.itemTitle, children: '調理' }),
                  (() => {
                    const Z = gx(i);
                    return Z.length === 0
                      ? p.jsx('p', {
                          className: me.itemEmpty,
                          children: '作れるレシピがありません。',
                        })
                      : Z.map((J) => {
                          var K;
                          const pe = A_(i, J.id),
                            L = J.ingredients
                              .map((le) => {
                                var ge;
                                return `${((ge = et[le.itemId]) == null ? void 0 : ge.name) ?? le.itemId}×${le.qty}`;
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
                                    J.name,
                                    p.jsxs('span', {
                                      className: me.itemDesc,
                                      children: [
                                        L,
                                        ' → ',
                                        ((K = et[J.result.itemId]) == null ? void 0 : K.name) ??
                                          J.result.itemId,
                                        '（所持',
                                        J.ingredients
                                          .map((le) => {
                                            var ge;
                                            return `${((ge = et[le.itemId]) == null ? void 0 : ge.name) ?? ''}${Br(i, le.itemId)}`;
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
                                  disabled: !pe,
                                  onClick: () => P(J.id),
                                  children: '作る',
                                }),
                              ],
                            },
                            J.id
                          );
                        });
                  })(),
                  p.jsx('button', {
                    type: 'button',
                    className: me.itemClose,
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
  wx = '_layout_34t9v_1',
  Cx = '_head_34t9v_11',
  Ax = '_title_34t9v_18',
  jx = '_stock_34t9v_24',
  Mx = '_tabs_34t9v_29',
  Rx = '_tab_34t9v_29',
  Ox = '_tabActive_34t9v_46',
  Dx = '_hint_34t9v_51',
  zx = '_list_34t9v_57',
  Bx = '_row_34t9v_65',
  Lx = '_info_34t9v_76',
  qx = '_name_34t9v_82',
  Ux = '_note_34t9v_87',
  Hx = '_actions_34t9v_92',
  Gx = '_ingot_34t9v_97',
  Ix = '_recycle_34t9v_114',
  $x = '_maxed_34t9v_126',
  Yx = '_empty_34t9v_132',
  Xx = '_foot_34t9v_137',
  Vx = '_back_34t9v_141',
  We = {
    layout: wx,
    head: Cx,
    title: Ax,
    stock: jx,
    tabs: Mx,
    tab: Rx,
    tabActive: Ox,
    hint: Dx,
    list: zx,
    row: Bx,
    info: Lx,
    name: qx,
    note: Ux,
    actions: Hx,
    ingot: Gx,
    recycle: Ix,
    maxed: $x,
    empty: Yx,
    foot: Xx,
    back: Vx,
  },
  Qx = () => {
    const n = ol(),
      { save: i, applyAndPersist: c } = Ul(),
      [u, r] = E.useState('forge');
    if (!i) return p.jsx(ul, { to: '/title', replace: !0 });
    const { copper: f, silver: m, gold: h } = i.forgeInventory.ingots,
      y = i.forgeInventory.fragments.common ?? 0,
      g = i.guild.equipment,
      v = (b, k, j, S) =>
        p.jsxs('button', {
          type: 'button',
          className: We.ingot,
          disabled: S <= 0,
          onClick: () => void c((R) => d1(R, b, k).save),
          children: [j, '+', pl.INGOT_INC[k], '（', S, '）'],
        });
    return p.jsxs('div', {
      className: We.layout,
      children: [
        p.jsxs('header', {
          className: We.head,
          children: [
            p.jsx('h1', { className: We.title, children: '鍛冶屋' }),
            p.jsxs('span', {
              className: We.stock,
              children: ['銅', f, '・銀', m, '・金', h, '／断片', y],
            }),
          ],
        }),
        p.jsxs('div', {
          className: We.tabs,
          children: [
            p.jsx('button', {
              type: 'button',
              className: `${We.tab} ${u === 'forge' ? We.tabActive : ''}`,
              onClick: () => r('forge'),
              children: '強化',
            }),
            p.jsx('button', {
              type: 'button',
              className: `${We.tab} ${u === 'recycle' ? We.tabActive : ''}`,
              onClick: () => r('recycle'),
              children: 'リサイクル',
            }),
          ],
        }),
        p.jsx('p', {
          className: We.hint,
          children:
            u === 'forge'
              ? 'インゴットで装備を強化（最大 +5）。銅+1・銀+3・金+5。'
              : '不要な装備を断片に変換。断片10個で銅インゴット1個になる。',
        }),
        p.jsx('div', {
          className: We.list,
          children:
            g.length === 0
              ? p.jsx('p', { className: We.empty, children: '所有している装備がありません。' })
              : g.map((b) => {
                  const k = ft[b.masterId],
                    j = b.forgeLevel >= pl.MAX_LEVEL;
                  return p.jsxs(
                    'div',
                    {
                      className: We.row,
                      children: [
                        p.jsxs('div', {
                          className: We.info,
                          children: [
                            p.jsx('span', { className: We.name, children: fu(b) }),
                            p.jsx('span', {
                              className: We.note,
                              children: k == null ? void 0 : k.slot,
                            }),
                          ],
                        }),
                        u === 'forge'
                          ? p.jsx('div', {
                              className: We.actions,
                              children: j
                                ? p.jsx('span', { className: We.maxed, children: '最大強化' })
                                : p.jsxs(p.Fragment, {
                                    children: [
                                      v(b.id, 'copper', '銅', f),
                                      v(b.id, 'silver', '銀', m),
                                      v(b.id, 'gold', '金', h),
                                    ],
                                  }),
                            })
                          : p.jsxs('button', {
                              type: 'button',
                              className: We.recycle,
                              onClick: () => void c((S) => m1(S, b.id).save),
                              children: ['分解（断片+', pl.RECYCLE_FRAGMENTS, '）'],
                            }),
                      ],
                    },
                    b.id
                  );
                }),
        }),
        p.jsx('footer', {
          className: We.foot,
          children: p.jsx('button', {
            type: 'button',
            className: We.back,
            onClick: () => n('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  Kx = '_layout_16au8_2',
  Zx = '_head_16au8_13',
  Jx = '_title_16au8_20',
  Wx = '_count_16au8_26',
  Fx = '_create_16au8_31',
  Px = '_sectionTitle_16au8_42',
  e2 = '_field_16au8_48',
  t2 = '_primary_16au8_64',
  l2 = '_list_16au8_79',
  n2 = '_empty_16au8_83',
  a2 = '_members_16au8_88',
  i2 = '_member_16au8_88',
  s2 = '_memberMain_16au8_107',
  u2 = '_memberName_16au8_119',
  c2 = '_pos_16au8_127',
  o2 = '_memberSub_16au8_144',
  r2 = '_posBtns_16au8_149',
  f2 = '_posBtn_16au8_149',
  d2 = '_posBtnActive_16au8_164',
  m2 = '_foot_16au8_170',
  p2 = '_sub_16au8_174',
  De = {
    layout: Kx,
    head: Zx,
    title: Jx,
    count: Wx,
    create: Fx,
    sectionTitle: Px,
    field: e2,
    primary: t2,
    list: l2,
    empty: n2,
    members: a2,
    member: i2,
    memberMain: s2,
    memberName: u2,
    pos: c2,
    pos_前衛: '_pos_前衛_16au8_136',
    pos_後衛: '_pos_後衛_16au8_140',
    memberSub: o2,
    posBtns: r2,
    posBtn: f2,
    posBtnActive: d2,
    foot: m2,
    sub: p2,
  };
function h2(n) {
  return [...n.guild.party.front, ...n.guild.party.back].filter((i) => i !== null).length;
}
const O_ = (n) => (n === 'front' ? vu : bu);
function _2(n, i, c, u) {
  if (c < 0 || c >= O_(i) || (u !== null && !n.guild.members.some((m) => m.id === u))) return n;
  const r = n.guild.party.front.map((m) => (m === u ? null : m)),
    f = n.guild.party.back.map((m) => (m === u ? null : m));
  for (; r.length < vu; ) r.push(null);
  for (; f.length < bu; ) f.push(null);
  return (
    i === 'front' ? (r[c] = u) : (f[c] = u),
    { ...n, guild: { ...n.guild, party: { front: r, back: f } } }
  );
}
function D_(n, i) {
  const c = n.guild.party.front.map((r) => (r === i ? null : r)),
    u = n.guild.party.back.map((r) => (r === i ? null : r));
  return { ...n, guild: { ...n.guild, party: { front: c, back: u } } };
}
function jh(n, i, c) {
  if (
    !n.guild.members.some((h) => h.id === i) ||
    (c === 'front' ? n.guild.party.front : n.guild.party.back).includes(i)
  )
    return n;
  const r = D_(n, i),
    f = c === 'front' ? r.guild.party.front : r.guild.party.back;
  let m = f.indexOf(null);
  if (m < 0)
    if (f.length < O_(c)) m = f.length;
    else return n;
  return _2(r, c, m, i);
}
function g2(n, i) {
  return n.guild.party.front.includes(i)
    ? '前衛'
    : n.guild.party.back.includes(i)
      ? '後衛'
      : '控え';
}
const y2 = () => {
    const n = ol(),
      { save: i, applyAndPersist: c } = Ul(),
      u = Object.keys(Pt),
      r = Object.keys(yt),
      [f, m] = E.useState(''),
      [h, y] = E.useState(u[0]),
      [g, v] = E.useState(r[0]),
      [b, k] = E.useState(!1),
      j = E.useCallback(async () => {
        const A = f.trim() || '名もなき冒険者',
          w = S_({ raceId: h, classId: g, name: A });
        (k(!0), await c((T) => bS(T, w)), m(''), k(!1));
      }, [f, h, g, c]);
    if (!i) return p.jsx(ul, { to: '/title', replace: !0 });
    const { members: S } = i.guild,
      R = S.length >= fr;
    return p.jsxs('div', {
      className: De.layout,
      children: [
        p.jsxs('header', {
          className: De.head,
          children: [
            p.jsx('h1', { className: De.title, children: 'ギルド管理' }),
            p.jsxs('span', { className: De.count, children: ['団員 ', S.length, ' / ', fr] }),
          ],
        }),
        p.jsxs('section', {
          className: De.create,
          children: [
            p.jsx('h2', { className: De.sectionTitle, children: '冒険者を作成' }),
            p.jsxs('label', {
              className: De.field,
              children: [
                p.jsx('span', { children: '名前' }),
                p.jsx('input', {
                  type: 'text',
                  value: f,
                  maxLength: 16,
                  placeholder: '名もなき冒険者',
                  onChange: (A) => m(A.target.value),
                }),
              ],
            }),
            p.jsxs('label', {
              className: De.field,
              children: [
                p.jsx('span', { children: '種族' }),
                p.jsx('select', {
                  value: h,
                  onChange: (A) => y(A.target.value),
                  children: u.map((A) => p.jsx('option', { value: A, children: Pt[A].name }, A)),
                }),
              ],
            }),
            p.jsxs('label', {
              className: De.field,
              children: [
                p.jsx('span', { children: '職業' }),
                p.jsx('select', {
                  value: g,
                  onChange: (A) => v(A.target.value),
                  children: r.map((A) => p.jsx('option', { value: A, children: yt[A].name }, A)),
                }),
              ],
            }),
            p.jsx('button', {
              type: 'button',
              className: De.primary,
              disabled: b || R,
              onClick: () => void j(),
              children: R ? '団員が上限です' : '作成する',
            }),
          ],
        }),
        p.jsxs('section', {
          className: De.list,
          children: [
            p.jsxs('h2', {
              className: De.sectionTitle,
              children: [
                '団員一覧',
                ' ',
                p.jsxs('span', {
                  className: De.count,
                  children: ['（出撃 ', h2(i), ' / ', l1, '）'],
                }),
              ],
            }),
            S.length === 0
              ? p.jsx('p', { className: De.empty, children: 'まだ冒険者がいません。' })
              : p.jsx('ul', {
                  className: De.members,
                  children: S.map((A) => {
                    var T, V;
                    const w = g2(i, A.id);
                    return p.jsxs(
                      'li',
                      {
                        className: De.member,
                        children: [
                          p.jsxs('button', {
                            type: 'button',
                            className: De.memberMain,
                            onClick: () => n(`/guild/char/${A.id}`),
                            children: [
                              p.jsxs('span', {
                                className: De.memberName,
                                children: [
                                  A.name,
                                  p.jsx('span', {
                                    className: `${De.pos} ${De[`pos_${w}`] ?? ''}`,
                                    children: w,
                                  }),
                                ],
                              }),
                              p.jsxs('span', {
                                className: De.memberSub,
                                children: [
                                  (T = Pt[A.raceId]) == null ? void 0 : T.name,
                                  ' / ',
                                  (V = yt[A.classId]) == null ? void 0 : V.name,
                                  ' / Lv',
                                  A.level,
                                  ' ›',
                                ],
                              }),
                            ],
                          }),
                          p.jsxs('div', {
                            className: De.posBtns,
                            children: [
                              p.jsx('button', {
                                type: 'button',
                                className: `${De.posBtn} ${w === '前衛' ? De.posBtnActive : ''}`,
                                onClick: () => void c((P) => jh(P, A.id, 'front')),
                                children: '前',
                              }),
                              p.jsx('button', {
                                type: 'button',
                                className: `${De.posBtn} ${w === '後衛' ? De.posBtnActive : ''}`,
                                onClick: () => void c((P) => jh(P, A.id, 'back')),
                                children: '後',
                              }),
                              p.jsx('button', {
                                type: 'button',
                                className: `${De.posBtn} ${w === '控え' ? De.posBtnActive : ''}`,
                                onClick: () => void c((P) => D_(P, A.id)),
                                children: '控',
                              }),
                            ],
                          }),
                        ],
                      },
                      A.id
                    );
                  }),
                }),
          ],
        }),
        p.jsx('footer', {
          className: De.foot,
          children: p.jsx('button', {
            type: 'button',
            className: De.sub,
            onClick: () => n('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  v2 = '_layout_tw23z_1',
  b2 = '_head_tw23z_12',
  S2 = '_title_tw23z_16',
  k2 = '_sub_tw23z_22',
  x2 = '_card_tw23z_27',
  T2 = '_h2_tw23z_35',
  E2 = '_sp_tw23z_44',
  N2 = '_stats_tw23z_50',
  w2 = '_equipSlot_tw23z_74',
  C2 = '_equipHead_tw23z_82',
  A2 = '_slotLabel_tw23z_88',
  j2 = '_equipName_tw23z_95',
  M2 = '_smallBtn_tw23z_100',
  R2 = '_equipPick_tw23z_110',
  O2 = '_pickBtn_tw23z_118',
  D2 = '_skills_tw23z_128',
  z2 = '_skill_tw23z_128',
  B2 = '_skillInfo_tw23z_143',
  L2 = '_skillName_tw23z_150',
  q2 = '_skillLv_tw23z_158',
  U2 = '_skillDesc_tw23z_164',
  H2 = '_learnBtn_tw23z_169',
  G2 = '_jobRow_tw23z_185',
  I2 = '_select_tw23z_192',
  $2 = '_input_tw23z_193',
  Y2 = '_actBtn_tw23z_203',
  X2 = '_warn_tw23z_220',
  V2 = '_titleHave_tw23z_227',
  Q2 = '_titleOpts_tw23z_233',
  K2 = '_titleBtn_tw23z_240',
  Z2 = '_rbForm_tw23z_252',
  J2 = '_danger_tw23z_258',
  W2 = '_foot_tw23z_270',
  F2 = '_back_tw23z_274',
  fe = {
    layout: v2,
    head: b2,
    title: S2,
    sub: k2,
    card: x2,
    h2: T2,
    sp: E2,
    stats: N2,
    equipSlot: w2,
    equipHead: C2,
    slotLabel: A2,
    equipName: j2,
    smallBtn: M2,
    equipPick: R2,
    pickBtn: O2,
    skills: D2,
    skill: z2,
    skillInfo: B2,
    skillName: L2,
    skillLv: q2,
    skillDesc: U2,
    learnBtn: H2,
    jobRow: G2,
    select: I2,
    input: $2,
    actBtn: Y2,
    warn: X2,
    titleHave: V2,
    titleOpts: Q2,
    titleBtn: K2,
    rbForm: Z2,
    danger: J2,
    foot: W2,
    back: F2,
  },
  z_ = ['weapon', 'armor', 'accessory'];
function B_(n, i, c) {
  return { ...n, guild: { ...n.guild, members: n.guild.members.map((u) => (u.id === i ? c : u)) } };
}
function P2(n) {
  var i, c;
  return (c = (i = yt[n]) == null ? void 0 : i.skillTree.skills[0]) == null ? void 0 : c.skillId;
}
function e3(n) {
  var i;
  return new Set(
    (((i = Pt[n]) == null ? void 0 : i.raceSkillTree.skills) ?? []).map((c) => c.skillId)
  );
}
const t3 = (n) => Object.values(n).reduce((i, c) => i + c, 0);
function l3(n, i) {
  if (!yt[i]) return n;
  const c = e3(n.raceId);
  let u = {};
  for (const [y, g] of Object.entries(n.learnedSkills)) c.has(y) && (u[y] = g);
  const r = P2(i);
  r && !u[r] && (u[r] = 1);
  const f = Math.max(1, n.level - Fh),
    m = Le.SP_PER_LEVEL * Math.max(0, f - 1);
  let h = t3(u) - (r && u[r] ? 1 : 0);
  return (
    h > m && ((u = r ? { [r]: 1 } : {}), (h = 0)),
    {
      ...n,
      classId: i,
      titleId: null,
      level: f,
      exp: 0,
      learnedSkills: u,
      skillPoints: { total: m, spent: h },
    }
  );
}
function n3(n, i, c) {
  const u = n.guild.members.find((m) => m.id === i);
  if (!u) return n;
  let r = B_(n, i, l3(u, c));
  const f = r.guild.members.find((m) => m.id === i);
  for (const m of z_) {
    const h = f.equipment[m];
    h && !Lr(f, h.masterId) && (r = qr(r, i, m));
  }
  return r;
}
const a3 = [
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
function i3(n) {
  const i = a3.find((c) => n >= c.min && n <= c.max);
  return i ? { allStats: i.allStats, bonusSp: i.bonusSp } : null;
}
function L_(n) {
  return n.level >= wi.REBIRTH_MIN_LEVEL;
}
function s3(n, i) {
  const c = i3(n.level);
  if (!c) return n;
  const u = Math.min(30, Math.floor(n.level / 2)),
    r = S_({ ...i, id: n.id }),
    f = Le.SP_PER_LEVEL * Math.max(0, u - 1) + c.bonusSp;
  return {
    ...r,
    level: Math.max(1, u),
    exp: 0,
    rebirthBonus: c,
    skillPoints: { total: f, spent: r.skillPoints.spent },
  };
}
function u3(n, i, c) {
  const u = n.guild.members.find((m) => m.id === i);
  if (!u || !L_(u)) return n;
  let r = n;
  for (const m of z_) u.equipment[m] && (r = qr(r, i, m));
  const f = r.guild.members.find((m) => m.id === i);
  return B_(r, i, s3(f, c));
}
function q_(n, i, c) {
  var r;
  return c < wi.TITLE_DEPTH || n.titleId
    ? !1
    : (((r = yt[n.classId]) == null ? void 0 : r.titleOptions) ?? []).includes(i);
}
function c3(n, i, c) {
  return q_(n, i, c)
    ? { ...n, titleId: i, skillPoints: { ...n.skillPoints, total: n.skillPoints.total + n1 } }
    : n;
}
function U_(n) {
  var c, u;
  const i = [
    ...(((c = yt[n.classId]) == null ? void 0 : c.skillTree.skills) ?? []),
    ...(((u = Pt[n.raceId]) == null ? void 0 : u.raceSkillTree.skills) ?? []),
  ];
  return (n.titleId && Ta[n.titleId] && i.push(...Ta[n.titleId].skillTree.skills), i);
}
function Tu(n, i) {
  return n.learnedSkills[i] ?? 0;
}
function H_(n) {
  return n.skillPoints.total - n.skillPoints.spent;
}
function o3(n, i) {
  return (i.requires ?? []).every((c) => Tu(n, c.skillId) >= c.level);
}
function G_(n, i) {
  const c = U_(n).find((u) => u.skillId === i);
  return !c || Tu(n, i) >= c.maxLevel || H_(n) <= 0 ? !1 : o3(n, c);
}
function r3(n, i) {
  return G_(n, i)
    ? {
        ...n,
        learnedSkills: { ...n.learnedSkills, [i]: Tu(n, i) + 1 },
        skillPoints: { ...n.skillPoints, spent: n.skillPoints.spent + 1 },
      }
    : n;
}
const Mh = Object.keys(Pt),
  nu = Object.keys(yt),
  f3 = ['weapon', 'armor', 'accessory'],
  d3 = { weapon: '武器', armor: '防具', accessory: '装飾' },
  m3 = [
    { key: 'hp', label: 'HP' },
    { key: 'tp', label: 'TP' },
    { key: 'str', label: 'STR' },
    { key: 'vit', label: 'VIT' },
    { key: 'agi', label: 'AGI' },
    { key: 'int', label: 'INT' },
    { key: 'mnd', label: 'MND' },
    { key: 'luc', label: 'LUC' },
  ],
  p3 = () => {
    var P, ee, X, H;
    const n = ol(),
      { id: i } = c0(),
      { save: c, applyAndPersist: u } = Ul(),
      [r, f] = E.useState(nu[0]),
      [m, h] = E.useState(''),
      [y, g] = E.useState(Mh[0]),
      [v, b] = E.useState(nu[0]),
      [k, j] = E.useState(!1);
    if (!c) return p.jsx(ul, { to: '/title', replace: !0 });
    const S = c.guild.members.find((q) => q.id === i);
    if (!S || !i) return p.jsx(ul, { to: '/guild', replace: !0 });
    const R = zi(S),
      A = H_(S),
      w = c.towerState.record.deepestReached,
      T = (q) =>
        u((Q) => ({
          ...Q,
          guild: { ...Q.guild, members: Q.guild.members.map((te) => (te.id === i ? q(te) : te)) },
        }));
    return p.jsxs('div', {
      className: fe.layout,
      children: [
        p.jsxs('header', {
          className: fe.head,
          children: [
            p.jsx('h1', { className: fe.title, children: S.name }),
            p.jsxs('span', {
              className: fe.sub,
              children: [
                (P = Pt[S.raceId]) == null ? void 0 : P.name,
                ' / ',
                (ee = yt[S.classId]) == null ? void 0 : ee.name,
                ' / Lv',
                S.level,
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
              children: m3.map((q) =>
                p.jsxs(
                  'div',
                  {
                    children: [
                      p.jsx('dt', { children: q.label }),
                      p.jsx('dd', { children: R[q.key] }),
                    ],
                  },
                  q.key
                )
              ),
            }),
          ],
        }),
        p.jsxs('section', {
          className: fe.card,
          children: [
            p.jsx('h2', { className: fe.h2, children: '装備' }),
            f3.map((q) => {
              const Q = S.equipment[q],
                te = c.guild.equipment.filter((se) => {
                  var ce;
                  return (
                    ((ce = ft[se.masterId]) == null ? void 0 : ce.slot) === q && Lr(S, se.masterId)
                  );
                });
              return p.jsxs(
                'div',
                {
                  className: fe.equipSlot,
                  children: [
                    p.jsxs('div', {
                      className: fe.equipHead,
                      children: [
                        p.jsx('span', { className: fe.slotLabel, children: d3[q] }),
                        p.jsx('span', {
                          className: fe.equipName,
                          children: Q ? fu(Q) : '（なし）',
                        }),
                        Q
                          ? p.jsx('button', {
                              type: 'button',
                              className: fe.smallBtn,
                              onClick: () => void V(q),
                              children: '外す',
                            })
                          : null,
                      ],
                    }),
                    te.length > 0
                      ? p.jsx('div', {
                          className: fe.equipPick,
                          children: te.map((se) =>
                            p.jsxs(
                              'button',
                              {
                                type: 'button',
                                className: fe.pickBtn,
                                onClick: () => void u((ce) => _1(ce, i, se.id)),
                                children: [fu(se), ' 装備'],
                              },
                              se.id
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
        p.jsxs('section', {
          className: fe.card,
          children: [
            p.jsxs('h2', {
              className: fe.h2,
              children: ['スキル ', p.jsxs('span', { className: fe.sp, children: ['SP ', A] })],
            }),
            p.jsx('ul', {
              className: fe.skills,
              children: U_(S).map((q) => {
                const Q = Tu(S, q.skillId),
                  te = G_(S, q.skillId),
                  se = Rr[q.skillId];
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
                              (se == null ? void 0 : se.name) ?? q.skillId,
                              p.jsxs('span', {
                                className: fe.skillLv,
                                children: ['Lv ', Q, '/', q.maxLevel],
                              }),
                            ],
                          }),
                          p.jsx('span', {
                            className: fe.skillDesc,
                            children: (se == null ? void 0 : se.description) ?? '',
                          }),
                        ],
                      }),
                      p.jsx('button', {
                        type: 'button',
                        className: fe.learnBtn,
                        disabled: !te,
                        onClick: () => void T((ce) => r3(ce, q.skillId)),
                        children: '＋',
                      }),
                    ],
                  },
                  q.skillId
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
                  onChange: (q) => f(q.target.value),
                  children: nu.map((q) => p.jsx('option', { value: q, children: yt[q].name }, q)),
                }),
                p.jsx('button', {
                  type: 'button',
                  className: fe.actBtn,
                  disabled: r === S.classId,
                  onClick: () => void u((q) => n3(q, i, r)),
                  children: '転職する',
                }),
              ],
            }),
            p.jsxs('p', {
              className: fe.warn,
              children: [
                '※ レベルが ',
                Fh,
                ' ',
                '下がり、職業/称号スキルは振り直しになります（種族スキルは保持）。',
              ],
            }),
            p.jsx('h2', { className: fe.h2, children: '称号' }),
            S.titleId
              ? p.jsxs('p', {
                  className: fe.titleHave,
                  children: ['習得済み: ', (X = Ta[S.titleId]) == null ? void 0 : X.name],
                })
              : w < wi.TITLE_DEPTH
                ? p.jsxs('p', {
                    className: fe.warn,
                    children: ['第 ', wi.TITLE_DEPTH, ' 階到達で習得できます（現在 ', w, 'F）。'],
                  })
                : p.jsx('div', {
                    className: fe.titleOpts,
                    children: (((H = yt[S.classId]) == null ? void 0 : H.titleOptions) ?? []).map(
                      (q) => {
                        var Q;
                        return p.jsxs(
                          'button',
                          {
                            type: 'button',
                            className: fe.titleBtn,
                            disabled: !q_(S, q, w),
                            onClick: () => void T((te) => c3(te, q, w)),
                            children: [(Q = Ta[q]) == null ? void 0 : Q.name, '（SP+5）'],
                          },
                          q
                        );
                      }
                    ),
                  }),
            p.jsx('h2', { className: fe.h2, children: '転生' }),
            L_(S)
              ? k
                ? p.jsxs('div', {
                    className: fe.rbForm,
                    children: [
                      p.jsxs('p', {
                        className: fe.warn,
                        children: [
                          '※ 作り直して強い新人になります（開始Lv ',
                          Math.min(30, Math.floor(S.level / 2)),
                          '・ボーナス付き）。',
                        ],
                      }),
                      p.jsx('input', {
                        className: fe.input,
                        type: 'text',
                        maxLength: 16,
                        placeholder: S.name,
                        value: m,
                        onChange: (q) => h(q.target.value),
                      }),
                      p.jsxs('div', {
                        className: fe.jobRow,
                        children: [
                          p.jsx('select', {
                            className: fe.select,
                            value: y,
                            onChange: (q) => g(q.target.value),
                            children: Mh.map((q) =>
                              p.jsx('option', { value: q, children: Pt[q].name }, q)
                            ),
                          }),
                          p.jsx('select', {
                            className: fe.select,
                            value: v,
                            onChange: (q) => b(q.target.value),
                            children: nu.map((q) =>
                              p.jsx('option', { value: q, children: yt[q].name }, q)
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
                              (u((q) =>
                                u3(q, i, { raceId: y, classId: v, name: m.trim() || S.name })
                              ),
                                j(!1));
                            },
                            children: '転生を実行',
                          }),
                          p.jsx('button', {
                            type: 'button',
                            className: fe.actBtn,
                            onClick: () => j(!1),
                            children: 'やめる',
                          }),
                        ],
                      }),
                    ],
                  })
                : p.jsx('button', {
                    type: 'button',
                    className: fe.actBtn,
                    onClick: () => j(!0),
                    children: '転生する…',
                  })
              : p.jsxs('p', {
                  className: fe.warn,
                  children: [
                    'Lv',
                    wi.REBIRTH_MIN_LEVEL,
                    ' 以上で転生できます（現在 Lv',
                    S.level,
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
            onClick: () => n('/guild'),
            children: 'もどる',
          }),
        }),
      ],
    });
    function V(q) {
      return u((Q) => qr(Q, i, q));
    }
  },
  h3 = () => p.jsx('div', { children: p.jsx('h1', { children: 'Not Found' }) }),
  _3 = '_layout_1u0ua_1',
  g3 = '_head_1u0ua_11',
  y3 = '_title_1u0ua_18',
  v3 = '_gold_1u0ua_24',
  b3 = '_tabs_1u0ua_29',
  S3 = '_tab_1u0ua_29',
  k3 = '_tabActive_1u0ua_46',
  x3 = '_list_1u0ua_51',
  T3 = '_row_1u0ua_59',
  E3 = '_info_1u0ua_70',
  N3 = '_name_1u0ua_76',
  w3 = '_note_1u0ua_81',
  C3 = '_action_1u0ua_86',
  A3 = '_empty_1u0ua_103',
  j3 = '_foot_1u0ua_108',
  M3 = '_back_1u0ua_112',
  Ge = {
    layout: _3,
    head: g3,
    title: y3,
    gold: v3,
    tabs: b3,
    tab: S3,
    tabActive: k3,
    list: x3,
    row: T3,
    info: E3,
    name: N3,
    note: w3,
    action: C3,
    empty: A3,
    foot: j3,
    back: M3,
  };
function R3(n) {
  return Math.max(0, Math.floor(n.towerState.record.deepestReached / 10));
}
const I_ = {
    item_slime_jelly: ['equip_slime_shield'],
    item_rat_tail: ['equip_rat_dagger'],
    item_bat_wing: ['equip_bat_cloak'],
    item_golem_core: ['equip_golem_blade'],
  },
  O3 = (n) => {
    const i = ft[n].bonuses,
      c = [];
    return (
      i.atk && c.push(`ATK+${i.atk}`),
      i.mat && c.push(`MAT+${i.mat}`),
      i.def && c.push(`DEF+${i.def}`),
      i.mdf && c.push(`MDF+${i.mdf}`),
      c.join(' ')
    );
  };
function D3(n) {
  const i = R3(n),
    c = new Set(n.shopStock.unlockedItemIds),
    u = Object.values(et)
      .filter((f) => f.buyPrice > 0)
      .map((f) => ({ id: f.id, name: f.name, price: f.buyPrice, kind: 'item' }));
  return [
    ...Object.values(ft)
      .filter((f) => f.tier <= i || c.has(f.id))
      .map((f) => ({ id: f.id, name: f.name, price: f.buyPrice, kind: 'equip', note: O3(f.id) })),
    ...u,
  ];
}
function z3(n) {
  return I_[n] ?? [];
}
function B3(n) {
  var i, c;
  return (
    ((i = et[n]) == null ? void 0 : i.buyPrice) ??
    ((c = ft[n]) == null ? void 0 : c.buyPrice) ??
    null
  );
}
function kr(n) {
  return et[n] ? Pb(et[n]) : ft[n] ? Math.floor(ft[n].buyPrice / 2) : 0;
}
function L3(n, i) {
  const c = B3(i);
  if (c === null || c <= 0 || n.guild.gold < c) return n;
  const u = ft[i] ? h1(n, i) : Dr(n, i, 1);
  return { ...u, guild: { ...u.guild, gold: u.guild.gold - c } };
}
function $_(n) {
  var c;
  return (
    Math.floor((((c = ft[n.masterId]) == null ? void 0 : c.buyPrice) ?? 0) / 2) + n.forgeLevel * 10
  );
}
function q3(n, i) {
  const c = n.guild.equipment.find((f) => f.id === i);
  if (!c) return n;
  const u = $_(c),
    r = n.guild.equipment.filter((f) => f.id !== i);
  return { ...n, guild: { ...n.guild, equipment: r, gold: n.guild.gold + u } };
}
function U3(n, i, c = 1) {
  var y;
  if ((((y = n.guild.storage.find((g) => g.itemId === i)) == null ? void 0 : y.qty) ?? 0) < c)
    return n;
  const r = kr(i) * c,
    f = zr(n, i, c),
    m = z3(i).filter((g) => !f.shopStock.unlockedItemIds.includes(g)),
    h = [...f.shopStock.unlockedItemIds, ...m];
  return {
    ...f,
    guild: { ...f.guild, gold: f.guild.gold + r },
    shopStock: { ...f.shopStock, unlockedItemIds: h },
  };
}
const H3 = () => {
    const n = ol(),
      { save: i, applyAndPersist: c } = Ul(),
      [u, r] = E.useState('buy');
    if (!i) return p.jsx(ul, { to: '/title', replace: !0 });
    const f = i.guild.gold,
      m = D3(i),
      h = i.guild.storage.filter((b) => kr(b.itemId) > 0),
      y = i.guild.equipment,
      g = h.length === 0 && y.length === 0,
      v = (b) => {
        var k, j;
        return (
          ((k = et[b]) == null ? void 0 : k.name) ?? ((j = ft[b]) == null ? void 0 : j.name) ?? b
        );
      };
    return p.jsxs('div', {
      className: Ge.layout,
      children: [
        p.jsxs('header', {
          className: Ge.head,
          children: [
            p.jsx('h1', { className: Ge.title, children: 'ショップ' }),
            p.jsxs('span', { className: Ge.gold, children: [f, ' G'] }),
          ],
        }),
        p.jsxs('div', {
          className: Ge.tabs,
          children: [
            p.jsx('button', {
              type: 'button',
              className: `${Ge.tab} ${u === 'buy' ? Ge.tabActive : ''}`,
              onClick: () => r('buy'),
              children: '買う',
            }),
            p.jsx('button', {
              type: 'button',
              className: `${Ge.tab} ${u === 'sell' ? Ge.tabActive : ''}`,
              onClick: () => r('sell'),
              children: '売る',
            }),
          ],
        }),
        p.jsx('div', {
          className: Ge.list,
          children:
            u === 'buy'
              ? m.map((b) =>
                  p.jsxs(
                    'div',
                    {
                      className: Ge.row,
                      children: [
                        p.jsxs('div', {
                          className: Ge.info,
                          children: [
                            p.jsx('span', { className: Ge.name, children: b.name }),
                            b.note ? p.jsx('span', { className: Ge.note, children: b.note }) : null,
                          ],
                        }),
                        p.jsxs('button', {
                          type: 'button',
                          className: Ge.action,
                          disabled: f < b.price,
                          onClick: () => void c((k) => L3(k, b.id)),
                          children: [b.price, ' G'],
                        }),
                      ],
                    },
                    b.id
                  )
                )
              : g
                ? p.jsx('p', { className: Ge.empty, children: '売れる物がありません。' })
                : p.jsxs(p.Fragment, {
                    children: [
                      y.map((b) =>
                        p.jsxs(
                          'div',
                          {
                            className: Ge.row,
                            children: [
                              p.jsxs('div', {
                                className: Ge.info,
                                children: [
                                  p.jsx('span', { className: Ge.name, children: fu(b) }),
                                  p.jsx('span', { className: Ge.note, children: '装備' }),
                                ],
                              }),
                              p.jsxs('button', {
                                type: 'button',
                                className: Ge.action,
                                onClick: () => void c((k) => q3(k, b.id)),
                                children: ['売却 ', $_(b), ' G'],
                              }),
                            ],
                          },
                          b.id
                        )
                      ),
                      h.map((b) =>
                        p.jsxs(
                          'div',
                          {
                            className: Ge.row,
                            children: [
                              p.jsxs('div', {
                                className: Ge.info,
                                children: [
                                  p.jsx('span', { className: Ge.name, children: v(b.itemId) }),
                                  p.jsxs('span', {
                                    className: Ge.note,
                                    children: ['所持 ', b.qty],
                                  }),
                                ],
                              }),
                              p.jsxs('button', {
                                type: 'button',
                                className: Ge.action,
                                onClick: () => void c((k) => U3(k, b.itemId, 1)),
                                children: ['売却 ', kr(b.itemId), ' G'],
                              }),
                            ],
                          },
                          b.itemId
                        )
                      ),
                    ],
                  }),
        }),
        p.jsx('footer', {
          className: Ge.foot,
          children: p.jsx('button', {
            type: 'button',
            className: Ge.back,
            onClick: () => n('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  G3 = '_layout_1xkiw_1',
  I3 = '_head_1xkiw_12',
  $3 = '_title_1xkiw_17',
  Y3 = '_subtitle_1xkiw_24',
  X3 = '_body_1xkiw_30',
  V3 = '_menu_1xkiw_34',
  Q3 = '_loading_1xkiw_40',
  K3 = '_warn_1xkiw_45',
  Z3 = '_danger_1xkiw_52',
  J3 = '_dialog_1xkiw_67',
  W3 = '_dialogTitle_1xkiw_77',
  F3 = '_field_1xkiw_82',
  P3 = '_note_1xkiw_96',
  eT = '_dialogActions_1xkiw_102',
  tT = '_primary_1xkiw_107',
  lT = '_sub_1xkiw_24',
  nT = '_foot_1xkiw_132',
  Ke = {
    layout: G3,
    head: I3,
    title: $3,
    subtitle: Y3,
    body: X3,
    menu: V3,
    loading: Q3,
    warn: K3,
    danger: Z3,
    dialog: J3,
    dialogTitle: W3,
    field: F3,
    note: P3,
    dialogActions: eT,
    primary: tT,
    sub: lT,
    foot: nT,
  },
  aT = '_card_3vsn6_1',
  iT = '_corrupted_3vsn6_14',
  sT = '_corruptedText_3vsn6_19',
  uT = '_corruptedNote_3vsn6_25',
  cT = '_guildName_3vsn6_31',
  oT = '_meta_3vsn6_36',
  dn = {
    card: aT,
    corrupted: iT,
    corruptedText: sT,
    corruptedNote: uT,
    guildName: cT,
    meta: oT,
    continue: '_continue_3vsn6_56',
  },
  rT = (n) => {
    if (!n) return '-';
    const i = new Date(n),
      c = (u) => String(u).padStart(2, '0');
    return `${i.getFullYear()}/${c(i.getMonth() + 1)}/${c(i.getDate())} ${c(i.getHours())}:${c(i.getMinutes())}`;
  },
  fT = ({ meta: n, onContinue: i }) =>
    n.corrupted
      ? p.jsxs('div', {
          className: `${dn.card} ${dn.corrupted}`,
          children: [
            p.jsx('div', { className: dn.corruptedText, children: 'セーブデータが破損しています' }),
            p.jsx('p', {
              className: dn.corruptedNote,
              children: '「最初から」で新しく始められます。',
            }),
          ],
        })
      : p.jsxs('div', {
          className: dn.card,
          children: [
            p.jsx('div', { className: dn.guildName, children: n.guildName }),
            p.jsxs('dl', {
              className: dn.meta,
              children: [
                p.jsxs('div', {
                  children: [
                    p.jsx('dt', { children: '最高到達階' }),
                    p.jsx('dd', {
                      children: n.deepestReached > 0 ? `${n.deepestReached}F` : '未踏破',
                    }),
                  ],
                }),
                p.jsxs('div', {
                  children: [
                    p.jsx('dt', { children: '団員' }),
                    p.jsxs('dd', { children: [n.memberCount, '人'] }),
                  ],
                }),
                p.jsxs('div', {
                  children: [
                    p.jsx('dt', { children: '最終セーブ' }),
                    p.jsx('dd', { children: rT(n.savedAt) }),
                  ],
                }),
              ],
            }),
            p.jsx('button', {
              type: 'button',
              className: dn.continue,
              onClick: i,
              children: 'つづきから',
            }),
          ],
        }),
  dT = () => {
    const n = ol(),
      { startNewGame: i, continueGame: c } = Ul(),
      [u, r] = E.useState(null),
      [f, m] = E.useState(!0),
      [h, y] = E.useState('menu'),
      [g, v] = E.useState(''),
      [b, k] = E.useState(!1);
    E.useEffect(() => {
      (async () => (r(await IS()), m(!1)))();
    }, []);
    const j = u !== null && !u.corrupted,
      S = E.useCallback(async () => {
        k(!0);
        const w = await c();
        (k(!1), w.ok && n('/town'));
      }, [c, n]),
      R = E.useCallback(() => {
        (v(''), y(j ? 'confirm' : 'guildName'));
      }, [j]),
      A = E.useCallback(async () => {
        const w = g.trim() || 'ななしのギルド';
        (k(!0), await i(w), k(!1), n('/town'));
      }, [g, i, n]);
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
          children: f
            ? p.jsx('p', { className: Ke.loading, children: '読み込み中...' })
            : h === 'guildName'
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
                          onChange: (w) => v(w.target.value),
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
                          disabled: b,
                          onClick: A,
                          children: 'はじめる',
                        }),
                        p.jsx('button', {
                          type: 'button',
                          className: Ke.sub,
                          disabled: b,
                          onClick: () => y('menu'),
                          children: 'もどる',
                        }),
                      ],
                    }),
                  ],
                })
              : h === 'confirm'
                ? p.jsxs('div', {
                    className: Ke.dialog,
                    children: [
                      p.jsx('h2', { className: Ke.dialogTitle, children: '最初から始めますか？' }),
                      p.jsxs('p', {
                        className: Ke.warn,
                        children: [
                          '現在のセーブデータ「',
                          u == null ? void 0 : u.guildName,
                          '」は上書きされ、元に戻せません。',
                        ],
                      }),
                      p.jsxs('div', {
                        className: Ke.dialogActions,
                        children: [
                          p.jsx('button', {
                            type: 'button',
                            className: Ke.danger,
                            disabled: b,
                            onClick: () => y('guildName'),
                            children: 'データを消して始める',
                          }),
                          p.jsx('button', {
                            type: 'button',
                            className: Ke.sub,
                            disabled: b,
                            onClick: () => y('menu'),
                            children: 'もどる',
                          }),
                        ],
                      }),
                    ],
                  })
                : p.jsxs('div', {
                    className: Ke.menu,
                    children: [
                      u !== null && p.jsx(fT, { meta: u, onContinue: () => void S() }),
                      p.jsx('button', {
                        type: 'button',
                        className: j ? Ke.sub : Ke.primary,
                        onClick: R,
                        children: '最初から',
                      }),
                    ],
                  }),
        }),
        p.jsxs('footer', { className: Ke.foot, children: ['v', '0.1.27'] }),
      ],
    });
  },
  mT = '_layout_uxqv8_1',
  pT = '_head_uxqv8_12',
  hT = '_guildName_uxqv8_16',
  _T = '_stats_uxqv8_21',
  gT = '_hint_uxqv8_40',
  yT = '_menu_uxqv8_50',
  vT = '_foot_uxqv8_57',
  bT = '_exit_uxqv8_61',
  ST = '_warpOverlay_uxqv8_72',
  kT = '_warpPanel_uxqv8_83',
  xT = '_warpTitle_uxqv8_94',
  TT = '_warpBtn_uxqv8_99',
  ET = '_warpClose_uxqv8_110',
  qt = {
    layout: mT,
    head: pT,
    guildName: hT,
    stats: _T,
    hint: gT,
    menu: yT,
    foot: vT,
    exit: bT,
    warpOverlay: ST,
    warpPanel: kT,
    warpTitle: xT,
    warpBtn: TT,
    warpClose: ET,
  },
  NT = '_button_1tp4a_1',
  wT = '_primary_1tp4a_26',
  CT = '_label_1tp4a_32',
  AT = '_description_1tp4a_37',
  au = { button: NT, primary: wT, label: CT, description: AT },
  ba = ({ label: n, description: i, variant: c = 'default', disabled: u = !1, onClick: r }) =>
    p.jsxs('button', {
      type: 'button',
      className: `${au.button} ${c === 'primary' ? au.primary : ''}`,
      disabled: u,
      onClick: r,
      children: [
        p.jsx('span', { className: au.label, children: n }),
        i ? p.jsx('span', { className: au.description, children: i }) : null,
      ],
    }),
  jT = () => {
    const n = ol(),
      { save: i, exitToTitle: c, applyAndPersist: u } = Ul(),
      [r, f] = E.useState(!1);
    if (!i) return p.jsx(ul, { to: '/title', replace: !0 });
    const { guild: m, towerState: h, diveState: y } = i,
      g = m.members.length > 0,
      v = () => {
        (c(), n('/title'));
      },
      b = async () => {
        (y || (await u((S) => yh(S, 1))), n('/dungeon'));
      },
      k = h.warp.unlockedCheckpoints,
      j = async (S) => {
        (f(!1), await u((R) => yh(R, S)), n('/dungeon'));
      };
    return p.jsxs('div', {
      className: qt.layout,
      children: [
        p.jsxs('header', {
          className: qt.head,
          children: [
            p.jsx('div', { className: qt.guildName, children: m.name }),
            p.jsxs('dl', {
              className: qt.stats,
              children: [
                p.jsxs('div', {
                  children: [
                    p.jsx('dt', { children: '所持金' }),
                    p.jsxs('dd', { children: [m.gold, ' G'] }),
                  ],
                }),
                p.jsxs('div', {
                  children: [
                    p.jsx('dt', { children: '最高到達' }),
                    p.jsx('dd', {
                      children: h.record.deepestReached > 0 ? `${h.record.deepestReached}F` : '-',
                    }),
                  ],
                }),
                p.jsxs('div', {
                  children: [
                    p.jsx('dt', { children: '団員' }),
                    p.jsxs('dd', { children: [m.members.length, '人'] }),
                  ],
                }),
              ],
            }),
          ],
        }),
        !g &&
          p.jsx('p', {
            className: qt.hint,
            children:
              'まずは「ギルド管理」で冒険者を作成してください。団員がいないとダイブできません。',
          }),
        p.jsxs('main', {
          className: qt.menu,
          children: [
            p.jsx(ba, {
              label: y ? '潜行を再開' : 'ダイブ開始',
              description: g
                ? y
                  ? `${y.depth}F から再開`
                  : '第1階からタワーへ潜る'
                : '団員が必要です',
              variant: 'primary',
              disabled: !g,
              onClick: () => void b(),
            }),
            p.jsx(ba, {
              label: 'ワープ',
              description:
                k.length === 0
                  ? 'ボス撃破で解放'
                  : y
                    ? '潜行中は使えません'
                    : `解放済み: ${k.map((S) => `${S}F`).join('・')}`,
              disabled: !g || k.length === 0 || !!y,
              onClick: () => f(!0),
            }),
            p.jsx(ba, {
              label: 'ギルド管理',
              description: '編成・キャラ作成',
              onClick: () => n('/guild'),
            }),
            p.jsx(ba, {
              label: 'ショップ',
              description: '装備・アイテム売買',
              onClick: () => n('/shop'),
            }),
            p.jsx(ba, {
              label: '鍛冶屋',
              description: '装備の強化・リサイクル',
              onClick: () => n('/forge'),
            }),
            p.jsx(ba, {
              label: '図鑑 / 記録',
              description: '到達記録・モンスター図鑑',
              onClick: () => n('/codex'),
            }),
          ],
        }),
        p.jsx('footer', {
          className: qt.foot,
          children: p.jsx('button', {
            type: 'button',
            className: qt.exit,
            onClick: v,
            children: 'タイトルへ戻る',
          }),
        }),
        r
          ? p.jsx('div', {
              className: qt.warpOverlay,
              onClick: () => f(!1),
              children: p.jsxs('div', {
                className: qt.warpPanel,
                onClick: (S) => S.stopPropagation(),
                children: [
                  p.jsx('div', { className: qt.warpTitle, children: 'ワープ先を選択' }),
                  k.map((S) =>
                    p.jsxs(
                      'button',
                      {
                        type: 'button',
                        className: qt.warpBtn,
                        onClick: () => void j(S),
                        children: ['第 ', S, ' 階へ'],
                      },
                      S
                    )
                  ),
                  p.jsx('button', {
                    type: 'button',
                    className: qt.warpClose,
                    onClick: () => f(!1),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
      ],
    });
  };
function MT() {
  return p.jsxs(x0, {
    children: [
      p.jsx(Wt, { path: '/', element: p.jsx(ul, { to: '/title', replace: !0 }) }),
      p.jsx(Wt, { path: '/title', element: p.jsx(dT, {}) }),
      p.jsx(Wt, { path: '/town', element: p.jsx(jT, {}) }),
      p.jsx(Wt, { path: '/guild', element: p.jsx(y2, {}) }),
      p.jsx(Wt, { path: '/guild/char/:id', element: p.jsx(p3, {}) }),
      p.jsx(Wt, { path: '/shop', element: p.jsx(H3, {}) }),
      p.jsx(Wt, { path: '/forge', element: p.jsx(Qx, {}) }),
      p.jsx(Wt, { path: '/codex', element: p.jsx(Sk, {}) }),
      p.jsx(Wt, { path: '/dungeon', element: p.jsx(Nx, {}) }),
      p.jsx(Wt, { path: '/battle', element: p.jsx(VS, {}) }),
      p.jsx(Wt, { path: '*', element: p.jsx(h3, {}) }),
    ],
  });
}
const RT = {
    races: Pt,
    classes: yt,
    titles: Ta,
    skills: Rr,
    unionSkills: ka,
    summons: Aa,
    gatherTypes: Mn,
    recipes: ja,
    enemies: ql,
    items: et,
    equipment: ft,
  },
  OT = /^[a-z]+_[a-z0-9_]+$/;
function nl(n, i, c) {
  for (const u of i)
    OT.test(u) || c.push(`[${n}] ID 命名規約違反: "${u}"（期待: <domain>_<name>）`);
}
function cr(n, i, c, u) {
  const r = new Set(i.skills.map((f) => f.skillId));
  for (const f of i.skills) {
    c.has(f.skillId) || u.push(`[${n}] 未定義スキルを参照: "${f.skillId}"`);
    for (const m of f.requires ?? [])
      r.has(m.skillId) ||
        u.push(`[${n}] スキル "${f.skillId}" の前提 "${m.skillId}" が同ツリーに存在しない`);
  }
}
function DT() {
  var A;
  const n = [],
    {
      races: i,
      classes: c,
      titles: u,
      skills: r,
      unionSkills: f,
      summons: m,
      gatherTypes: h,
      recipes: y,
      enemies: g,
      items: v,
      equipment: b,
    } = RT;
  (nl('races', Object.keys(i), n),
    nl('classes', Object.keys(c), n),
    nl('titles', Object.keys(u), n),
    nl('skills', Object.keys(r), n),
    nl('enemies', Object.keys(g), n),
    nl('items', Object.keys(v), n),
    nl('equipment', Object.keys(b), n));
  const k = (w, T) => {
    for (const [V, P] of Object.entries(T))
      V !== P.id && n.push(`[${w}] キー "${V}" と id "${P.id}" が不一致`);
  };
  (k('races', i),
    k('classes', c),
    k('titles', u),
    k('skills', r),
    k('enemies', g),
    k('items', v),
    k('equipment', b));
  const j = new Set(Object.keys(r)),
    S = new Set(Object.keys(c)),
    R = new Set(Object.keys(u));
  for (const w of Object.values(i)) {
    (S.has(w.defaultClassId) ||
      n.push(`[races] "${w.id}" の defaultClassId "${w.defaultClassId}" が未定義`),
      cr(`races/${w.id}`, w.raceSkillTree, j, n));
    for (const T of w.raceSkillTree.skills) {
      const V = f[T.skillId];
      V &&
        V.raceId !== w.id &&
        n.push(`[races/${w.id}] ユニオンスキル "${T.skillId}" の raceId "${V.raceId}" が不一致`);
    }
  }
  for (const w of Object.values(f)) {
    const T = (A = i[w.raceId]) == null ? void 0 : A.raceSkillTree;
    (!T || !T.skills.some((V) => V.skillId === w.id)) &&
      n.push(`[unionSkills] "${w.id}" が種族 "${w.raceId}" のスキルツリーに無い`);
  }
  nl('unionSkills', Object.keys(f), n);
  for (const [w, T] of Object.entries(f))
    (w !== T.id && n.push(`[unionSkills] キー "${w}" と id "${T.id}" が不一致`),
      T.id in r || n.push(`[unionSkills] "${T.id}" が skills に未定義`),
      T.requiredParticipants < 1 &&
        n.push(`[unionSkills] "${T.id}" の requiredParticipants が 1 未満`),
      (T.gaugeCostPerParticipant < 0 || T.gaugeCostPerParticipant > 100) &&
        n.push(`[unionSkills] "${T.id}" の gaugeCostPerParticipant が 0..100 外`),
      T.id in Dl &&
        n.push(
          `[unionSkills] "${T.id}" が BATTLE_SKILLS にも存在（通常スキルとして撃ててしまう）`
        ));
  nl('passiveSkills', Object.keys(dr), n);
  for (const [w, T] of Object.entries(dr))
    (w !== T.id && n.push(`[passiveSkills] キー "${w}" と id "${T.id}" が不一致`),
      j.has(T.id) || n.push(`[passiveSkills] "${T.id}" が skills に未定義`),
      T.id in Dl &&
        n.push(`[passiveSkills] "${T.id}" が BATTLE_SKILLS にも存在（戦闘で撃ててしまう）`),
      T.id in f && n.push(`[passiveSkills] "${T.id}" が UNION_SKILLS にも存在`));
  nl('summons', Object.keys(m), n);
  for (const [w, T] of Object.entries(m))
    w !== T.id && n.push(`[summons] キー "${w}" と id "${T.id}" が不一致`);
  for (const w of Object.values(Dl))
    for (const T of w.effects)
      T.kind === 'summon' &&
        !(T.summonKind in m) &&
        n.push(`[battleSkills] "${w.id}" の召喚 "${T.summonKind}" が未定義`);
  for (const [w, T] of Object.entries(h)) {
    (w !== T.type && n.push(`[gatherTypes] キー "${w}" と type "${T.type}" が不一致`),
      j.has(T.requiredSkillId) ||
        n.push(`[gatherTypes] "${T.type}" の requiredSkillId "${T.requiredSkillId}" が未定義`));
    for (const V of T.drops) {
      if (!(V.itemId in v))
        n.push(`[gatherTypes] "${T.type}" のドロップ "${V.itemId}" が未定義アイテム`);
      else {
        const P = v[V.itemId].category === 'food';
        (T.food &&
          !P &&
          n.push(`[gatherTypes] 食材系統 "${T.type}" のドロップ "${V.itemId}" が food でない`),
          !T.food &&
            P &&
            n.push(`[gatherTypes] 素材系統 "${T.type}" のドロップ "${V.itemId}" が food`));
      }
      V.weight <= 0 && n.push(`[gatherTypes] "${T.type}" のドロップ重みが正でない`);
    }
  }
  nl('recipes', Object.keys(y), n);
  for (const [w, T] of Object.entries(y)) {
    w !== T.id && n.push(`[recipes] キー "${w}" と id "${T.id}" が不一致`);
    for (const V of T.ingredients)
      V.itemId in v
        ? v[V.itemId].category !== 'food' &&
          n.push(`[recipes] "${T.id}" の材料 "${V.itemId}" が food カテゴリでない`)
        : n.push(`[recipes] "${T.id}" の材料 "${V.itemId}" が未定義`);
    T.result.itemId in v
      ? v[T.result.itemId].category !== 'food' &&
        n.push(`[recipes] "${T.id}" の結果 "${T.result.itemId}" が food カテゴリでない`)
      : n.push(`[recipes] "${T.id}" の結果 "${T.result.itemId}" が未定義`);
  }
  for (const w of Object.values(c)) {
    cr(`classes/${w.id}`, w.skillTree, j, n);
    for (const T of w.titleOptions) {
      if (!R.has(T)) {
        n.push(`[classes] "${w.id}" の称号 "${T}" が未定義`);
        continue;
      }
      u[T].parentClassId !== w.id &&
        n.push(`[classes] 称号 "${T}" の parentClassId が "${w.id}" と不一致`);
    }
  }
  for (const w of Object.values(u))
    (S.has(w.parentClassId) ||
      n.push(`[titles] "${w.id}" の parentClassId "${w.parentClassId}" が未定義`),
      cr(`titles/${w.id}`, w.skillTree, j, n));
  for (const w of Object.values(b))
    (w.slot === 'weapon' &&
      !w.weaponType &&
      n.push(`[equipment] "${w.id}" は weapon だが weaponType が未設定`),
      w.slot === 'armor' &&
        !w.armorType &&
        n.push(`[equipment] "${w.id}" は armor だが armorType が未設定`),
      (w.buyPrice < 0 || w.tier < 0) && n.push(`[equipment] "${w.id}" の buyPrice/tier が負`));
  for (const w of Object.values(v))
    (w.buyPrice < 0 && n.push(`[items] "${w.id}" の buyPrice が負`),
      w.category === 'consumable' &&
        !w.useContext &&
        !w.effects &&
        n.push(`[items] 消費アイテム "${w.id}" に useContext も effects も無い（使用不能）`));
  for (const w of Object.values(g))
    for (const T of w.drops ?? [])
      (T.itemId in v || n.push(`[enemies] "${w.id}" のドロップ "${T.itemId}" が未定義アイテム`),
        (T.rate < 0 || T.rate > 1) &&
          n.push(`[enemies] "${w.id}" のドロップ "${T.itemId}" の rate が 0..1 外`));
  for (const [w, T] of Object.entries(I_)) {
    w in v || n.push(`[SELL_UNLOCKS] キー素材 "${w}" が未定義`);
    for (const V of T) V in b || n.push(`[SELL_UNLOCKS] 解放先装備 "${V}" が未定義`);
  }
  return { ok: n.length === 0, errors: n };
}
const Rh = DT();
Rh.ok || console.error('マスターデータ検証エラー:', Rh.errors);
const Y_ = document.getElementById('root');
if (!Y_) throw new Error('Failed to find #root element');
Ev.createRoot(Y_).render(
  p.jsx(Q0, { basename: '/sekaiju-like-game', children: p.jsx(XS, { children: p.jsx(MT, {}) }) })
);
