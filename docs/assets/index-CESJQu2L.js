var d0 = Object.defineProperty;
var m0 = (a, i, o) =>
  i in a ? d0(a, i, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (a[i] = o);
var Ho = (a, i, o) => m0(a, typeof i != 'symbol' ? i + '' : i, o);
(function () {
  const i = document.createElement('link').relList;
  if (i && i.supports && i.supports('modulepreload')) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
  new MutationObserver((r) => {
    for (const d of r)
      if (d.type === 'childList')
        for (const h of d.addedNodes) h.tagName === 'LINK' && h.rel === 'modulepreload' && s(h);
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
  function s(r) {
    if (r.ep) return;
    r.ep = !0;
    const d = o(r);
    fetch(r.href, d);
  }
})();
var Go = { exports: {} },
  Ei = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Xh;
function h0() {
  if (Xh) return Ei;
  Xh = 1;
  var a = Symbol.for('react.transitional.element'),
    i = Symbol.for('react.fragment');
  function o(s, r, d) {
    var h = null;
    if ((d !== void 0 && (h = '' + d), r.key !== void 0 && (h = '' + r.key), 'key' in r)) {
      d = {};
      for (var v in r) v !== 'key' && (d[v] = r[v]);
    } else d = r;
    return ((r = d.ref), { $$typeof: a, type: s, key: h, ref: r !== void 0 ? r : null, props: d });
  }
  return ((Ei.Fragment = i), (Ei.jsx = o), (Ei.jsxs = o), Ei);
}
var Vh;
function p0() {
  return (Vh || ((Vh = 1), (Go.exports = h0())), Go.exports);
}
var m = p0(),
  Yo = { exports: {} },
  Ti = {},
  $o = { exports: {} },
  Xo = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Qh;
function y0() {
  return (
    Qh ||
      ((Qh = 1),
      (function (a) {
        function i(L, K) {
          var te = L.length;
          L.push(K);
          e: for (; 0 < te; ) {
            var ge = (te - 1) >>> 1,
              Ee = L[ge];
            if (0 < r(Ee, K)) ((L[ge] = K), (L[te] = Ee), (te = ge));
            else break e;
          }
        }
        function o(L) {
          return L.length === 0 ? null : L[0];
        }
        function s(L) {
          if (L.length === 0) return null;
          var K = L[0],
            te = L.pop();
          if (te !== K) {
            L[0] = te;
            e: for (var ge = 0, Ee = L.length, C = Ee >>> 1; ge < C; ) {
              var G = 2 * (ge + 1) - 1,
                W = L[G],
                le = G + 1,
                pe = L[le];
              if (0 > r(W, te))
                le < Ee && 0 > r(pe, W)
                  ? ((L[ge] = pe), (L[le] = te), (ge = le))
                  : ((L[ge] = W), (L[G] = te), (ge = G));
              else if (le < Ee && 0 > r(pe, te)) ((L[ge] = pe), (L[le] = te), (ge = le));
              else break e;
            }
          }
          return K;
        }
        function r(L, K) {
          var te = L.sortIndex - K.sortIndex;
          return te !== 0 ? te : L.id - K.id;
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
          var h = Date,
            v = h.now();
          a.unstable_now = function () {
            return h.now() - v;
          };
        }
        var g = [],
          y = [],
          _ = 1,
          b = null,
          x = 3,
          R = !1,
          S = !1,
          w = !1,
          j = !1,
          A = typeof setTimeout == 'function' ? setTimeout : null,
          k = typeof clearTimeout == 'function' ? clearTimeout : null,
          Q = typeof setImmediate < 'u' ? setImmediate : null;
        function P(L) {
          for (var K = o(y); K !== null; ) {
            if (K.callback === null) s(y);
            else if (K.startTime <= L) (s(y), (K.sortIndex = K.expirationTime), i(g, K));
            else break;
            K = o(y);
          }
        }
        function ee(L) {
          if (((w = !1), P(L), !S))
            if (o(g) !== null) ((S = !0), V || ((V = !0), ce()));
            else {
              var K = o(y);
              K !== null && he(ee, K.startTime - L);
            }
        }
        var V = !1,
          H = -1,
          U = 5,
          Z = -1;
        function ae() {
          return j ? !0 : !(a.unstable_now() - Z < U);
        }
        function ue() {
          if (((j = !1), V)) {
            var L = a.unstable_now();
            Z = L;
            var K = !0;
            try {
              e: {
                ((S = !1), w && ((w = !1), k(H), (H = -1)), (R = !0));
                var te = x;
                try {
                  t: {
                    for (P(L), b = o(g); b !== null && !(b.expirationTime > L && ae()); ) {
                      var ge = b.callback;
                      if (typeof ge == 'function') {
                        ((b.callback = null), (x = b.priorityLevel));
                        var Ee = ge(b.expirationTime <= L);
                        if (((L = a.unstable_now()), typeof Ee == 'function')) {
                          ((b.callback = Ee), P(L), (K = !0));
                          break t;
                        }
                        (b === o(g) && s(g), P(L));
                      } else s(g);
                      b = o(g);
                    }
                    if (b !== null) K = !0;
                    else {
                      var C = o(y);
                      (C !== null && he(ee, C.startTime - L), (K = !1));
                    }
                  }
                  break e;
                } finally {
                  ((b = null), (x = te), (R = !1));
                }
                K = void 0;
              }
            } finally {
              K ? ce() : (V = !1);
            }
          }
        }
        var ce;
        if (typeof Q == 'function')
          ce = function () {
            Q(ue);
          };
        else if (typeof MessageChannel < 'u') {
          var I = new MessageChannel(),
            J = I.port2;
          ((I.port1.onmessage = ue),
            (ce = function () {
              J.postMessage(null);
            }));
        } else
          ce = function () {
            A(ue, 0);
          };
        function he(L, K) {
          H = A(function () {
            L(a.unstable_now());
          }, K);
        }
        ((a.unstable_IdlePriority = 5),
          (a.unstable_ImmediatePriority = 1),
          (a.unstable_LowPriority = 4),
          (a.unstable_NormalPriority = 3),
          (a.unstable_Profiling = null),
          (a.unstable_UserBlockingPriority = 2),
          (a.unstable_cancelCallback = function (L) {
            L.callback = null;
          }),
          (a.unstable_forceFrameRate = function (L) {
            0 > L || 125 < L
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (U = 0 < L ? Math.floor(1e3 / L) : 5);
          }),
          (a.unstable_getCurrentPriorityLevel = function () {
            return x;
          }),
          (a.unstable_next = function (L) {
            switch (x) {
              case 1:
              case 2:
              case 3:
                var K = 3;
                break;
              default:
                K = x;
            }
            var te = x;
            x = K;
            try {
              return L();
            } finally {
              x = te;
            }
          }),
          (a.unstable_requestPaint = function () {
            j = !0;
          }),
          (a.unstable_runWithPriority = function (L, K) {
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
            var te = x;
            x = L;
            try {
              return K();
            } finally {
              x = te;
            }
          }),
          (a.unstable_scheduleCallback = function (L, K, te) {
            var ge = a.unstable_now();
            switch (
              (typeof te == 'object' && te !== null
                ? ((te = te.delay), (te = typeof te == 'number' && 0 < te ? ge + te : ge))
                : (te = ge),
              L)
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
              (L = {
                id: _++,
                callback: K,
                priorityLevel: L,
                startTime: te,
                expirationTime: Ee,
                sortIndex: -1,
              }),
              te > ge
                ? ((L.sortIndex = te),
                  i(y, L),
                  o(g) === null && L === o(y) && (w ? (k(H), (H = -1)) : (w = !0), he(ee, te - ge)))
                : ((L.sortIndex = Ee), i(g, L), S || R || ((S = !0), V || ((V = !0), ce()))),
              L
            );
          }),
          (a.unstable_shouldYield = ae),
          (a.unstable_wrapCallback = function (L) {
            var K = x;
            return function () {
              var te = x;
              x = K;
              try {
                return L.apply(this, arguments);
              } finally {
                x = te;
              }
            };
          }));
      })(Xo)),
    Xo
  );
}
var Zh;
function g0() {
  return (Zh || ((Zh = 1), ($o.exports = y0())), $o.exports);
}
var Vo = { exports: {} },
  ye = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Kh;
function _0() {
  if (Kh) return ye;
  Kh = 1;
  var a = Symbol.for('react.transitional.element'),
    i = Symbol.for('react.portal'),
    o = Symbol.for('react.fragment'),
    s = Symbol.for('react.strict_mode'),
    r = Symbol.for('react.profiler'),
    d = Symbol.for('react.consumer'),
    h = Symbol.for('react.context'),
    v = Symbol.for('react.forward_ref'),
    g = Symbol.for('react.suspense'),
    y = Symbol.for('react.memo'),
    _ = Symbol.for('react.lazy'),
    b = Symbol.for('react.activity'),
    x = Symbol.iterator;
  function R(C) {
    return C === null || typeof C != 'object'
      ? null
      : ((C = (x && C[x]) || C['@@iterator']), typeof C == 'function' ? C : null);
  }
  var S = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    w = Object.assign,
    j = {};
  function A(C, G, W) {
    ((this.props = C), (this.context = G), (this.refs = j), (this.updater = W || S));
  }
  ((A.prototype.isReactComponent = {}),
    (A.prototype.setState = function (C, G) {
      if (typeof C != 'object' && typeof C != 'function' && C != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, C, G, 'setState');
    }),
    (A.prototype.forceUpdate = function (C) {
      this.updater.enqueueForceUpdate(this, C, 'forceUpdate');
    }));
  function k() {}
  k.prototype = A.prototype;
  function Q(C, G, W) {
    ((this.props = C), (this.context = G), (this.refs = j), (this.updater = W || S));
  }
  var P = (Q.prototype = new k());
  ((P.constructor = Q), w(P, A.prototype), (P.isPureReactComponent = !0));
  var ee = Array.isArray;
  function V() {}
  var H = { H: null, A: null, T: null, S: null },
    U = Object.prototype.hasOwnProperty;
  function Z(C, G, W) {
    var le = W.ref;
    return { $$typeof: a, type: C, key: G, ref: le !== void 0 ? le : null, props: W };
  }
  function ae(C, G) {
    return Z(C.type, G, C.props);
  }
  function ue(C) {
    return typeof C == 'object' && C !== null && C.$$typeof === a;
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
  var I = /\/+/g;
  function J(C, G) {
    return typeof C == 'object' && C !== null && C.key != null ? ce('' + C.key) : G.toString(36);
  }
  function he(C) {
    switch (C.status) {
      case 'fulfilled':
        return C.value;
      case 'rejected':
        throw C.reason;
      default:
        switch (
          (typeof C.status == 'string'
            ? C.then(V, V)
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
  function L(C, G, W, le, pe) {
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
            case a:
            case i:
              Ce = !0;
              break;
            case _:
              return ((Ce = C._init), L(Ce(C._payload), G, W, le, pe));
          }
      }
    if (Ce)
      return (
        (pe = pe(C)),
        (Ce = le === '' ? '.' + J(C, 0) : le),
        ee(pe)
          ? ((W = ''),
            Ce != null && (W = Ce.replace(I, '$&/') + '/'),
            L(pe, G, W, '', function (Y) {
              return Y;
            }))
          : pe != null &&
            (ue(pe) &&
              (pe = ae(
                pe,
                W +
                  (pe.key == null || (C && C.key === pe.key)
                    ? ''
                    : ('' + pe.key).replace(I, '$&/') + '/') +
                  Ce
              )),
            G.push(pe)),
        1
      );
    Ce = 0;
    var ut = le === '' ? '.' : le + ':';
    if (ee(C))
      for (var Ve = 0; Ve < C.length; Ve++)
        ((le = C[Ve]), (be = ut + J(le, Ve)), (Ce += L(le, G, W, be, pe)));
    else if (((Ve = R(C)), typeof Ve == 'function'))
      for (C = Ve.call(C), Ve = 0; !(le = C.next()).done; )
        ((le = le.value), (be = ut + J(le, Ve++)), (Ce += L(le, G, W, be, pe)));
    else if (be === 'object') {
      if (typeof C.then == 'function') return L(he(C), G, W, le, pe);
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
    var le = [],
      pe = 0;
    return (
      L(C, le, '', '', function (be) {
        return G.call(W, be, pe++);
      }),
      le
    );
  }
  function te(C) {
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
    Ee = {
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
        if (!ue(C))
          throw Error('React.Children.only expected to receive a single React element child.');
        return C;
      },
    };
  return (
    (ye.Activity = b),
    (ye.Children = Ee),
    (ye.Component = A),
    (ye.Fragment = o),
    (ye.Profiler = r),
    (ye.PureComponent = Q),
    (ye.StrictMode = s),
    (ye.Suspense = g),
    (ye.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = H),
    (ye.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (C) {
        return H.H.useMemoCache(C);
      },
    }),
    (ye.cache = function (C) {
      return function () {
        return C.apply(null, arguments);
      };
    }),
    (ye.cacheSignal = function () {
      return null;
    }),
    (ye.cloneElement = function (C, G, W) {
      if (C == null) throw Error('The argument must be a React element, but you passed ' + C + '.');
      var le = w({}, C.props),
        pe = C.key;
      if (G != null)
        for (be in (G.key !== void 0 && (pe = '' + G.key), G))
          !U.call(G, be) ||
            be === 'key' ||
            be === '__self' ||
            be === '__source' ||
            (be === 'ref' && G.ref === void 0) ||
            (le[be] = G[be]);
      var be = arguments.length - 2;
      if (be === 1) le.children = W;
      else if (1 < be) {
        for (var Ce = Array(be), ut = 0; ut < be; ut++) Ce[ut] = arguments[ut + 2];
        le.children = Ce;
      }
      return Z(C.type, pe, le);
    }),
    (ye.createContext = function (C) {
      return (
        (C = {
          $$typeof: h,
          _currentValue: C,
          _currentValue2: C,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (C.Provider = C),
        (C.Consumer = { $$typeof: d, _context: C }),
        C
      );
    }),
    (ye.createElement = function (C, G, W) {
      var le,
        pe = {},
        be = null;
      if (G != null)
        for (le in (G.key !== void 0 && (be = '' + G.key), G))
          U.call(G, le) && le !== 'key' && le !== '__self' && le !== '__source' && (pe[le] = G[le]);
      var Ce = arguments.length - 2;
      if (Ce === 1) pe.children = W;
      else if (1 < Ce) {
        for (var ut = Array(Ce), Ve = 0; Ve < Ce; Ve++) ut[Ve] = arguments[Ve + 2];
        pe.children = ut;
      }
      if (C && C.defaultProps)
        for (le in ((Ce = C.defaultProps), Ce)) pe[le] === void 0 && (pe[le] = Ce[le]);
      return Z(C, be, pe);
    }),
    (ye.createRef = function () {
      return { current: null };
    }),
    (ye.forwardRef = function (C) {
      return { $$typeof: v, render: C };
    }),
    (ye.isValidElement = ue),
    (ye.lazy = function (C) {
      return { $$typeof: _, _payload: { _status: -1, _result: C }, _init: te };
    }),
    (ye.memo = function (C, G) {
      return { $$typeof: y, type: C, compare: G === void 0 ? null : G };
    }),
    (ye.startTransition = function (C) {
      var G = H.T,
        W = {};
      H.T = W;
      try {
        var le = C(),
          pe = H.S;
        (pe !== null && pe(W, le),
          typeof le == 'object' && le !== null && typeof le.then == 'function' && le.then(V, ge));
      } catch (be) {
        ge(be);
      } finally {
        (G !== null && W.types !== null && (G.types = W.types), (H.T = G));
      }
    }),
    (ye.unstable_useCacheRefresh = function () {
      return H.H.useCacheRefresh();
    }),
    (ye.use = function (C) {
      return H.H.use(C);
    }),
    (ye.useActionState = function (C, G, W) {
      return H.H.useActionState(C, G, W);
    }),
    (ye.useCallback = function (C, G) {
      return H.H.useCallback(C, G);
    }),
    (ye.useContext = function (C) {
      return H.H.useContext(C);
    }),
    (ye.useDebugValue = function () {}),
    (ye.useDeferredValue = function (C, G) {
      return H.H.useDeferredValue(C, G);
    }),
    (ye.useEffect = function (C, G) {
      return H.H.useEffect(C, G);
    }),
    (ye.useEffectEvent = function (C) {
      return H.H.useEffectEvent(C);
    }),
    (ye.useId = function () {
      return H.H.useId();
    }),
    (ye.useImperativeHandle = function (C, G, W) {
      return H.H.useImperativeHandle(C, G, W);
    }),
    (ye.useInsertionEffect = function (C, G) {
      return H.H.useInsertionEffect(C, G);
    }),
    (ye.useLayoutEffect = function (C, G) {
      return H.H.useLayoutEffect(C, G);
    }),
    (ye.useMemo = function (C, G) {
      return H.H.useMemo(C, G);
    }),
    (ye.useOptimistic = function (C, G) {
      return H.H.useOptimistic(C, G);
    }),
    (ye.useReducer = function (C, G, W) {
      return H.H.useReducer(C, G, W);
    }),
    (ye.useRef = function (C) {
      return H.H.useRef(C);
    }),
    (ye.useState = function (C) {
      return H.H.useState(C);
    }),
    (ye.useSyncExternalStore = function (C, G, W) {
      return H.H.useSyncExternalStore(C, G, W);
    }),
    (ye.useTransition = function () {
      return H.H.useTransition();
    }),
    (ye.version = '19.2.5'),
    ye
  );
}
var Ih;
function vr() {
  return (Ih || ((Ih = 1), (Vo.exports = _0())), Vo.exports);
}
var Qo = { exports: {} },
  pt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Jh;
function v0() {
  if (Jh) return pt;
  Jh = 1;
  var a = vr();
  function i(g) {
    var y = 'https://react.dev/errors/' + g;
    if (1 < arguments.length) {
      y += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var _ = 2; _ < arguments.length; _++) y += '&args[]=' + encodeURIComponent(arguments[_]);
    }
    return (
      'Minified React error #' +
      g +
      '; visit ' +
      y +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function o() {}
  var s = {
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
    r = Symbol.for('react.portal');
  function d(g, y, _) {
    var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: b == null ? null : '' + b,
      children: g,
      containerInfo: y,
      implementation: _,
    };
  }
  var h = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function v(g, y) {
    if (g === 'font') return '';
    if (typeof y == 'string') return y === 'use-credentials' ? y : '';
  }
  return (
    (pt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s),
    (pt.createPortal = function (g, y) {
      var _ = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!y || (y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)) throw Error(i(299));
      return d(g, y, null, _);
    }),
    (pt.flushSync = function (g) {
      var y = h.T,
        _ = s.p;
      try {
        if (((h.T = null), (s.p = 2), g)) return g();
      } finally {
        ((h.T = y), (s.p = _), s.d.f());
      }
    }),
    (pt.preconnect = function (g, y) {
      typeof g == 'string' &&
        (y
          ? ((y = y.crossOrigin),
            (y = typeof y == 'string' ? (y === 'use-credentials' ? y : '') : void 0))
          : (y = null),
        s.d.C(g, y));
    }),
    (pt.prefetchDNS = function (g) {
      typeof g == 'string' && s.d.D(g);
    }),
    (pt.preinit = function (g, y) {
      if (typeof g == 'string' && y && typeof y.as == 'string') {
        var _ = y.as,
          b = v(_, y.crossOrigin),
          x = typeof y.integrity == 'string' ? y.integrity : void 0,
          R = typeof y.fetchPriority == 'string' ? y.fetchPriority : void 0;
        _ === 'style'
          ? s.d.S(g, typeof y.precedence == 'string' ? y.precedence : void 0, {
              crossOrigin: b,
              integrity: x,
              fetchPriority: R,
            })
          : _ === 'script' &&
            s.d.X(g, {
              crossOrigin: b,
              integrity: x,
              fetchPriority: R,
              nonce: typeof y.nonce == 'string' ? y.nonce : void 0,
            });
      }
    }),
    (pt.preinitModule = function (g, y) {
      if (typeof g == 'string')
        if (typeof y == 'object' && y !== null) {
          if (y.as == null || y.as === 'script') {
            var _ = v(y.as, y.crossOrigin);
            s.d.M(g, {
              crossOrigin: _,
              integrity: typeof y.integrity == 'string' ? y.integrity : void 0,
              nonce: typeof y.nonce == 'string' ? y.nonce : void 0,
            });
          }
        } else y == null && s.d.M(g);
    }),
    (pt.preload = function (g, y) {
      if (typeof g == 'string' && typeof y == 'object' && y !== null && typeof y.as == 'string') {
        var _ = y.as,
          b = v(_, y.crossOrigin);
        s.d.L(g, _, {
          crossOrigin: b,
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
    (pt.preloadModule = function (g, y) {
      if (typeof g == 'string')
        if (y) {
          var _ = v(y.as, y.crossOrigin);
          s.d.m(g, {
            as: typeof y.as == 'string' && y.as !== 'script' ? y.as : void 0,
            crossOrigin: _,
            integrity: typeof y.integrity == 'string' ? y.integrity : void 0,
          });
        } else s.d.m(g);
    }),
    (pt.requestFormReset = function (g) {
      s.d.r(g);
    }),
    (pt.unstable_batchedUpdates = function (g, y) {
      return g(y);
    }),
    (pt.useFormState = function (g, y, _) {
      return h.H.useFormState(g, y, _);
    }),
    (pt.useFormStatus = function () {
      return h.H.useHostTransitionStatus();
    }),
    (pt.version = '19.2.5'),
    pt
  );
}
var Wh;
function b0() {
  if (Wh) return Qo.exports;
  Wh = 1;
  function a() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (i) {
        console.error(i);
      }
  }
  return (a(), (Qo.exports = v0()), Qo.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Fh;
function S0() {
  if (Fh) return Ti;
  Fh = 1;
  var a = g0(),
    i = vr(),
    o = b0();
  function s(e) {
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
  function h(e) {
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
  function g(e) {
    if (d(e) !== e) throw Error(s(188));
  }
  function y(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = d(e)), t === null)) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var l = e, n = t; ; ) {
      var u = l.return;
      if (u === null) break;
      var c = u.alternate;
      if (c === null) {
        if (((n = u.return), n !== null)) {
          l = n;
          continue;
        }
        break;
      }
      if (u.child === c.child) {
        for (c = u.child; c; ) {
          if (c === l) return (g(u), e);
          if (c === n) return (g(u), t);
          c = c.sibling;
        }
        throw Error(s(188));
      }
      if (l.return !== n.return) ((l = u), (n = c));
      else {
        for (var f = !1, p = u.child; p; ) {
          if (p === l) {
            ((f = !0), (l = u), (n = c));
            break;
          }
          if (p === n) {
            ((f = !0), (n = u), (l = c));
            break;
          }
          p = p.sibling;
        }
        if (!f) {
          for (p = c.child; p; ) {
            if (p === l) {
              ((f = !0), (l = c), (n = u));
              break;
            }
            if (p === n) {
              ((f = !0), (n = c), (l = u));
              break;
            }
            p = p.sibling;
          }
          if (!f) throw Error(s(189));
        }
      }
      if (l.alternate !== n) throw Error(s(190));
    }
    if (l.tag !== 3) throw Error(s(188));
    return l.stateNode.current === l ? e : t;
  }
  function _(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = _(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var b = Object.assign,
    x = Symbol.for('react.element'),
    R = Symbol.for('react.transitional.element'),
    S = Symbol.for('react.portal'),
    w = Symbol.for('react.fragment'),
    j = Symbol.for('react.strict_mode'),
    A = Symbol.for('react.profiler'),
    k = Symbol.for('react.consumer'),
    Q = Symbol.for('react.context'),
    P = Symbol.for('react.forward_ref'),
    ee = Symbol.for('react.suspense'),
    V = Symbol.for('react.suspense_list'),
    H = Symbol.for('react.memo'),
    U = Symbol.for('react.lazy'),
    Z = Symbol.for('react.activity'),
    ae = Symbol.for('react.memo_cache_sentinel'),
    ue = Symbol.iterator;
  function ce(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (ue && e[ue]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var I = Symbol.for('react.client.reference');
  function J(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === I ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case w:
        return 'Fragment';
      case A:
        return 'Profiler';
      case j:
        return 'StrictMode';
      case ee:
        return 'Suspense';
      case V:
        return 'SuspenseList';
      case Z:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case S:
          return 'Portal';
        case Q:
          return e.displayName || 'Context';
        case k:
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
        case U:
          ((t = e._payload), (e = e._init));
          try {
            return J(e(t));
          } catch {}
      }
    return null;
  }
  var he = Array.isArray,
    L = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    K = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    te = { pending: !1, data: null, method: null, action: null },
    ge = [],
    Ee = -1;
  function C(e) {
    return { current: e };
  }
  function G(e) {
    0 > Ee || ((e.current = ge[Ee]), (ge[Ee] = null), Ee--);
  }
  function W(e, t) {
    (Ee++, (ge[Ee] = e.current), (e.current = t));
  }
  var le = C(null),
    pe = C(null),
    be = C(null),
    Ce = C(null);
  function ut(e, t) {
    switch ((W(be, t), W(pe, e), W(le, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? mh(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) ((t = mh(t)), (e = hh(t, e)));
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
    (G(le), W(le, e));
  }
  function Ve() {
    (G(le), G(pe), G(be));
  }
  function Y(e) {
    e.memoizedState !== null && W(Ce, e);
    var t = le.current,
      l = hh(t, e.type);
    t !== l && (W(pe, e), W(le, l));
  }
  function oe(e) {
    (pe.current === e && (G(le), G(pe)), Ce.current === e && (G(Ce), (vi._currentValue = te)));
  }
  var de, Re;
  function Te(e) {
    if (de === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        ((de = (t && t[1]) || ''),
          (Re =
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
      Re
    );
  }
  var vt = !1;
  function Es(e, t) {
    if (!e || vt) return '';
    vt = !0;
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
                  var z = B;
                }
                Reflect.construct(e, [], X);
              } else {
                try {
                  X.call();
                } catch (B) {
                  z = B;
                }
                e.call(X.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (B) {
                z = B;
              }
              (X = e()) && typeof X.catch == 'function' && X.catch(function () {});
            }
          } catch (B) {
            if (B && z && typeof B.stack == 'string') return [B.stack, z.stack];
          }
          return [null, null];
        },
      };
      n.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
      var u = Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot, 'name');
      u &&
        u.configurable &&
        Object.defineProperty(n.DetermineComponentFrameRoot, 'name', {
          value: 'DetermineComponentFrameRoot',
        });
      var c = n.DetermineComponentFrameRoot(),
        f = c[0],
        p = c[1];
      if (f && p) {
        var E = f.split(`
`),
          D = p.split(`
`);
        for (u = n = 0; n < E.length && !E[n].includes('DetermineComponentFrameRoot'); ) n++;
        for (; u < D.length && !D[u].includes('DetermineComponentFrameRoot'); ) u++;
        if (n === E.length || u === D.length)
          for (n = E.length - 1, u = D.length - 1; 1 <= n && 0 <= u && E[n] !== D[u]; ) u--;
        for (; 1 <= n && 0 <= u; n--, u--)
          if (E[n] !== D[u]) {
            if (n !== 1 || u !== 1)
              do
                if ((n--, u--, 0 > u || E[n] !== D[u])) {
                  var q =
                    `
` + E[n].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      q.includes('<anonymous>') &&
                      (q = q.replace('<anonymous>', e.displayName)),
                    q
                  );
                }
              while (1 <= n && 0 <= u);
            break;
          }
      }
    } finally {
      ((vt = !1), (Error.prepareStackTrace = l));
    }
    return (l = e ? e.displayName || e.name : '') ? Te(l) : '';
  }
  function $y(e, t) {
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
        return Es(e.type, !1);
      case 11:
        return Es(e.type.render, !1);
      case 1:
        return Es(e.type, !0);
      case 31:
        return Te('Activity');
      default:
        return '';
    }
  }
  function $r(e) {
    try {
      var t = '',
        l = null;
      do ((t += $y(e, l)), (l = e), (e = e.return));
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
  var Ts = Object.prototype.hasOwnProperty,
    Ns = a.unstable_scheduleCallback,
    ks = a.unstable_cancelCallback,
    Xy = a.unstable_shouldYield,
    Vy = a.unstable_requestPaint,
    At = a.unstable_now,
    Qy = a.unstable_getCurrentPriorityLevel,
    Xr = a.unstable_ImmediatePriority,
    Vr = a.unstable_UserBlockingPriority,
    Bi = a.unstable_NormalPriority,
    Zy = a.unstable_LowPriority,
    Qr = a.unstable_IdlePriority,
    Ky = a.log,
    Iy = a.unstable_setDisableYieldValue,
    Ra = null,
    Ct = null;
  function Ul(e) {
    if ((typeof Ky == 'function' && Iy(e), Ct && typeof Ct.setStrictMode == 'function'))
      try {
        Ct.setStrictMode(Ra, e);
      } catch {}
  }
  var jt = Math.clz32 ? Math.clz32 : Fy,
    Jy = Math.log,
    Wy = Math.LN2;
  function Fy(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Jy(e) / Wy) | 0)) | 0);
  }
  var Li = 256,
    Ui = 262144,
    qi = 4194304;
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
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var u = 0,
      c = e.suspendedLanes,
      f = e.pingedLanes;
    e = e.warmLanes;
    var p = n & 134217727;
    return (
      p !== 0
        ? ((n = p & ~c),
          n !== 0
            ? (u = mn(n))
            : ((f &= p), f !== 0 ? (u = mn(f)) : l || ((l = p & ~e), l !== 0 && (u = mn(l)))))
        : ((p = n & ~c),
          p !== 0
            ? (u = mn(p))
            : f !== 0
              ? (u = mn(f))
              : l || ((l = n & ~e), l !== 0 && (u = mn(l)))),
      u === 0
        ? 0
        : t !== 0 &&
            t !== u &&
            (t & c) === 0 &&
            ((c = u & -u), (l = t & -t), c >= l || (c === 32 && (l & 4194048) !== 0))
          ? t
          : u
    );
  }
  function wa(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Py(e, t) {
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
  function Zr() {
    var e = qi;
    return ((qi <<= 1), (qi & 62914560) === 0 && (qi = 4194304), e);
  }
  function As(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function Oa(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function eg(e, t, l, n, u, c) {
    var f = e.pendingLanes;
    ((e.pendingLanes = l),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= l),
      (e.entangledLanes &= l),
      (e.errorRecoveryDisabledLanes &= l),
      (e.shellSuspendCounter = 0));
    var p = e.entanglements,
      E = e.expirationTimes,
      D = e.hiddenUpdates;
    for (l = f & ~l; 0 < l; ) {
      var q = 31 - jt(l),
        X = 1 << q;
      ((p[q] = 0), (E[q] = -1));
      var z = D[q];
      if (z !== null)
        for (D[q] = null, q = 0; q < z.length; q++) {
          var B = z[q];
          B !== null && (B.lane &= -536870913);
        }
      l &= ~X;
    }
    (n !== 0 && Kr(e, n, 0),
      c !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(f & ~t)));
  }
  function Kr(e, t, l) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var n = 31 - jt(t);
    ((e.entangledLanes |= t),
      (e.entanglements[n] = e.entanglements[n] | 1073741824 | (l & 261930)));
  }
  function Ir(e, t) {
    var l = (e.entangledLanes |= t);
    for (e = e.entanglements; l; ) {
      var n = 31 - jt(l),
        u = 1 << n;
      ((u & t) | (e[n] & t) && (e[n] |= t), (l &= ~u));
    }
  }
  function Jr(e, t) {
    var l = t & -t;
    return ((l = (l & 42) !== 0 ? 1 : Cs(l)), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l);
  }
  function Cs(e) {
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
  function js(e) {
    return ((e &= -e), 2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function Wr() {
    var e = K.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Lh(e.type));
  }
  function Fr(e, t) {
    var l = K.p;
    try {
      return ((K.p = e), t());
    } finally {
      K.p = l;
    }
  }
  var ql = Math.random().toString(36).slice(2),
    ot = '__reactFiber$' + ql,
    bt = '__reactProps$' + ql,
    Dn = '__reactContainer$' + ql,
    Ms = '__reactEvents$' + ql,
    tg = '__reactListeners$' + ql,
    lg = '__reactHandles$' + ql,
    Pr = '__reactResources$' + ql,
    Da = '__reactMarker$' + ql;
  function Rs(e) {
    (delete e[ot], delete e[bt], delete e[Ms], delete e[tg], delete e[lg]);
  }
  function zn(e) {
    var t = e[ot];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if ((t = l[Dn] || l[ot])) {
        if (((l = t.alternate), t.child !== null || (l !== null && l.child !== null)))
          for (e = Sh(e); e !== null; ) {
            if ((l = e[ot])) return l;
            e = Sh(e);
          }
        return t;
      }
      ((e = l), (l = e.parentNode));
    }
    return null;
  }
  function Bn(e) {
    if ((e = e[ot] || e[Dn])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function za(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(s(33));
  }
  function Ln(e) {
    var t = e[Pr];
    return (t || (t = e[Pr] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function st(e) {
    e[Da] = !0;
  }
  var ef = new Set(),
    tf = {};
  function hn(e, t) {
    (Un(e, t), Un(e + 'Capture', t));
  }
  function Un(e, t) {
    for (tf[e] = t, e = 0; e < t.length; e++) ef.add(t[e]);
  }
  var ng = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    lf = {},
    nf = {};
  function ag(e) {
    return Ts.call(nf, e)
      ? !0
      : Ts.call(lf, e)
        ? !1
        : ng.test(e)
          ? (nf[e] = !0)
          : ((lf[e] = !0), !1);
  }
  function Gi(e, t, l) {
    if (ag(t))
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
  function Yi(e, t, l) {
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
  function pl(e, t, l, n) {
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
  function qt(e) {
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
  function af(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function ig(e, t, l) {
    var n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (
      !e.hasOwnProperty(t) &&
      typeof n < 'u' &&
      typeof n.get == 'function' &&
      typeof n.set == 'function'
    ) {
      var u = n.get,
        c = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (f) {
            ((l = '' + f), c.call(this, f));
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
  function ws(e) {
    if (!e._valueTracker) {
      var t = af(e) ? 'checked' : 'value';
      e._valueTracker = ig(e, t, '' + e[t]);
    }
  }
  function uf(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(),
      n = '';
    return (
      e && (n = af(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = n),
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
  var ug = /[\n"\\]/g;
  function Ht(e) {
    return e.replace(ug, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function Os(e, t, l, n, u, c, f, p) {
    ((e.name = ''),
      f != null && typeof f != 'function' && typeof f != 'symbol' && typeof f != 'boolean'
        ? (e.type = f)
        : e.removeAttribute('type'),
      t != null
        ? f === 'number'
          ? ((t === 0 && e.value === '') || e.value != t) && (e.value = '' + qt(t))
          : e.value !== '' + qt(t) && (e.value = '' + qt(t))
        : (f !== 'submit' && f !== 'reset') || e.removeAttribute('value'),
      t != null
        ? Ds(e, f, qt(t))
        : l != null
          ? Ds(e, f, qt(l))
          : n != null && e.removeAttribute('value'),
      u == null && c != null && (e.defaultChecked = !!c),
      u != null && (e.checked = u && typeof u != 'function' && typeof u != 'symbol'),
      p != null && typeof p != 'function' && typeof p != 'symbol' && typeof p != 'boolean'
        ? (e.name = '' + qt(p))
        : e.removeAttribute('name'));
  }
  function sf(e, t, l, n, u, c, f, p) {
    if (
      (c != null &&
        typeof c != 'function' &&
        typeof c != 'symbol' &&
        typeof c != 'boolean' &&
        (e.type = c),
      t != null || l != null)
    ) {
      if (!((c !== 'submit' && c !== 'reset') || t != null)) {
        ws(e);
        return;
      }
      ((l = l != null ? '' + qt(l) : ''),
        (t = t != null ? '' + qt(t) : l),
        p || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((n = n ?? u),
      (n = typeof n != 'function' && typeof n != 'symbol' && !!n),
      (e.checked = p ? e.checked : !!n),
      (e.defaultChecked = !!n),
      f != null &&
        typeof f != 'function' &&
        typeof f != 'symbol' &&
        typeof f != 'boolean' &&
        (e.name = f),
      ws(e));
  }
  function Ds(e, t, l) {
    (t === 'number' && $i(e.ownerDocument) === e) ||
      e.defaultValue === '' + l ||
      (e.defaultValue = '' + l);
  }
  function qn(e, t, l, n) {
    if (((e = e.options), t)) {
      t = {};
      for (var u = 0; u < l.length; u++) t['$' + l[u]] = !0;
      for (l = 0; l < e.length; l++)
        ((u = t.hasOwnProperty('$' + e[l].value)),
          e[l].selected !== u && (e[l].selected = u),
          u && n && (e[l].defaultSelected = !0));
    } else {
      for (l = '' + qt(l), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === l) {
          ((e[u].selected = !0), n && (e[u].defaultSelected = !0));
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function cf(e, t, l) {
    if (t != null && ((t = '' + qt(t)), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? '' + qt(l) : '';
  }
  function of(e, t, l, n) {
    if (t == null) {
      if (n != null) {
        if (l != null) throw Error(s(92));
        if (he(n)) {
          if (1 < n.length) throw Error(s(93));
          n = n[0];
        }
        l = n;
      }
      (l == null && (l = ''), (t = l));
    }
    ((l = qt(t)),
      (e.defaultValue = l),
      (n = e.textContent),
      n === l && n !== '' && n !== null && (e.value = n),
      ws(e));
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
  var sg = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function rf(e, t, l) {
    var n = t.indexOf('--') === 0;
    l == null || typeof l == 'boolean' || l === ''
      ? n
        ? e.setProperty(t, '')
        : t === 'float'
          ? (e.cssFloat = '')
          : (e[t] = '')
      : n
        ? e.setProperty(t, l)
        : typeof l != 'number' || l === 0 || sg.has(t)
          ? t === 'float'
            ? (e.cssFloat = l)
            : (e[t] = ('' + l).trim())
          : (e[t] = l + 'px');
  }
  function ff(e, t, l) {
    if (t != null && typeof t != 'object') throw Error(s(62));
    if (((e = e.style), l != null)) {
      for (var n in l)
        !l.hasOwnProperty(n) ||
          (t != null && t.hasOwnProperty(n)) ||
          (n.indexOf('--') === 0
            ? e.setProperty(n, '')
            : n === 'float'
              ? (e.cssFloat = '')
              : (e[n] = ''));
      for (var u in t) ((n = t[u]), t.hasOwnProperty(u) && l[u] !== n && rf(e, u, n));
    } else for (var c in t) t.hasOwnProperty(c) && rf(e, c, t[c]);
  }
  function zs(e) {
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
  var cg = new Map([
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
    og =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Xi(e) {
    return og.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function yl() {}
  var Bs = null;
  function Ls(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Gn = null,
    Yn = null;
  function df(e) {
    var t = Bn(e);
    if (t && (e = t.stateNode)) {
      var l = e[bt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (Os(
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
              l = l.querySelectorAll('input[name="' + Ht('' + t) + '"][type="radio"]'), t = 0;
              t < l.length;
              t++
            ) {
              var n = l[t];
              if (n !== e && n.form === e.form) {
                var u = n[bt] || null;
                if (!u) throw Error(s(90));
                Os(
                  n,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (t = 0; t < l.length; t++) ((n = l[t]), n.form === e.form && uf(n));
          }
          break e;
        case 'textarea':
          cf(e, l.value, l.defaultValue);
          break e;
        case 'select':
          ((t = l.value), t != null && qn(e, !!l.multiple, t, !1));
      }
    }
  }
  var Us = !1;
  function mf(e, t, l) {
    if (Us) return e(t, l);
    Us = !0;
    try {
      var n = e(t);
      return n;
    } finally {
      if (
        ((Us = !1),
        (Gn !== null || Yn !== null) &&
          (Ru(), Gn && ((t = Gn), (e = Yn), (Yn = Gn = null), df(t), e)))
      )
        for (t = 0; t < e.length; t++) df(e[t]);
    }
  }
  function Ba(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var n = l[bt] || null;
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
    if (l && typeof l != 'function') throw Error(s(231, t, typeof l));
    return l;
  }
  var gl = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    qs = !1;
  if (gl)
    try {
      var La = {};
      (Object.defineProperty(La, 'passive', {
        get: function () {
          qs = !0;
        },
      }),
        window.addEventListener('test', La, La),
        window.removeEventListener('test', La, La));
    } catch {
      qs = !1;
    }
  var Hl = null,
    Hs = null,
    Vi = null;
  function hf() {
    if (Vi) return Vi;
    var e,
      t = Hs,
      l = t.length,
      n,
      u = 'value' in Hl ? Hl.value : Hl.textContent,
      c = u.length;
    for (e = 0; e < l && t[e] === u[e]; e++);
    var f = l - e;
    for (n = 1; n <= f && t[l - n] === u[c - n]; n++);
    return (Vi = u.slice(e, 1 < n ? 1 - n : void 0));
  }
  function Qi(e) {
    var t = e.keyCode;
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Zi() {
    return !0;
  }
  function pf() {
    return !1;
  }
  function St(e) {
    function t(l, n, u, c, f) {
      ((this._reactName = l),
        (this._targetInst = u),
        (this.type = n),
        (this.nativeEvent = c),
        (this.target = f),
        (this.currentTarget = null));
      for (var p in e) e.hasOwnProperty(p) && ((l = e[p]), (this[p] = l ? l(c) : c[p]));
      return (
        (this.isDefaultPrevented = (
          c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1
        )
          ? Zi
          : pf),
        (this.isPropagationStopped = pf),
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
            (this.isDefaultPrevented = Zi));
        },
        stopPropagation: function () {
          var l = this.nativeEvent;
          l &&
            (l.stopPropagation
              ? l.stopPropagation()
              : typeof l.cancelBubble != 'unknown' && (l.cancelBubble = !0),
            (this.isPropagationStopped = Zi));
        },
        persist: function () {},
        isPersistent: Zi,
      }),
      t
    );
  }
  var pn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Ki = St(pn),
    Ua = b({}, pn, { view: 0, detail: 0 }),
    rg = St(Ua),
    Gs,
    Ys,
    qa,
    Ii = b({}, Ua, {
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
      getModifierState: Xs,
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
          : (e !== qa &&
              (qa && e.type === 'mousemove'
                ? ((Gs = e.screenX - qa.screenX), (Ys = e.screenY - qa.screenY))
                : (Ys = Gs = 0),
              (qa = e)),
            Gs);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : Ys;
      },
    }),
    yf = St(Ii),
    fg = b({}, Ii, { dataTransfer: 0 }),
    dg = St(fg),
    mg = b({}, Ua, { relatedTarget: 0 }),
    $s = St(mg),
    hg = b({}, pn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    pg = St(hg),
    yg = b({}, pn, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    gg = St(yg),
    _g = b({}, pn, { data: 0 }),
    gf = St(_g),
    vg = {
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
    bg = {
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
    Sg = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function xg(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Sg[e]) ? !!t[e] : !1;
  }
  function Xs() {
    return xg;
  }
  var Eg = b({}, Ua, {
      key: function (e) {
        if (e.key) {
          var t = vg[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = Qi(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? bg[e.keyCode] || 'Unidentified'
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
      getModifierState: Xs,
      charCode: function (e) {
        return e.type === 'keypress' ? Qi(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? Qi(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    Tg = St(Eg),
    Ng = b({}, Ii, {
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
    _f = St(Ng),
    kg = b({}, Ua, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Xs,
    }),
    Ag = St(kg),
    Cg = b({}, pn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    jg = St(Cg),
    Mg = b({}, Ii, {
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
    Rg = St(Mg),
    wg = b({}, pn, { newState: 0, oldState: 0 }),
    Og = St(wg),
    Dg = [9, 13, 27, 32],
    Vs = gl && 'CompositionEvent' in window,
    Ha = null;
  gl && 'documentMode' in document && (Ha = document.documentMode);
  var zg = gl && 'TextEvent' in window && !Ha,
    vf = gl && (!Vs || (Ha && 8 < Ha && 11 >= Ha)),
    bf = ' ',
    Sf = !1;
  function xf(e, t) {
    switch (e) {
      case 'keyup':
        return Dg.indexOf(t.keyCode) !== -1;
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
  function Ef(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var $n = !1;
  function Bg(e, t) {
    switch (e) {
      case 'compositionend':
        return Ef(t);
      case 'keypress':
        return t.which !== 32 ? null : ((Sf = !0), bf);
      case 'textInput':
        return ((e = t.data), e === bf && Sf ? null : e);
      default:
        return null;
    }
  }
  function Lg(e, t) {
    if ($n)
      return e === 'compositionend' || (!Vs && xf(e, t))
        ? ((e = hf()), (Vi = Hs = Hl = null), ($n = !1), e)
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
        return vf && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var Ug = {
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
  function Tf(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!Ug[e.type] : t === 'textarea';
  }
  function Nf(e, t, l, n) {
    (Gn ? (Yn ? Yn.push(n) : (Yn = [n])) : (Gn = n),
      (t = Uu(t, 'onChange')),
      0 < t.length &&
        ((l = new Ki('onChange', 'change', null, l, n)), e.push({ event: l, listeners: t })));
  }
  var Ga = null,
    Ya = null;
  function qg(e) {
    sh(e, 0);
  }
  function Ji(e) {
    var t = za(e);
    if (uf(t)) return e;
  }
  function kf(e, t) {
    if (e === 'change') return t;
  }
  var Af = !1;
  if (gl) {
    var Qs;
    if (gl) {
      var Zs = 'oninput' in document;
      if (!Zs) {
        var Cf = document.createElement('div');
        (Cf.setAttribute('oninput', 'return;'), (Zs = typeof Cf.oninput == 'function'));
      }
      Qs = Zs;
    } else Qs = !1;
    Af = Qs && (!document.documentMode || 9 < document.documentMode);
  }
  function jf() {
    Ga && (Ga.detachEvent('onpropertychange', Mf), (Ya = Ga = null));
  }
  function Mf(e) {
    if (e.propertyName === 'value' && Ji(Ya)) {
      var t = [];
      (Nf(t, Ya, e, Ls(e)), mf(qg, t));
    }
  }
  function Hg(e, t, l) {
    e === 'focusin'
      ? (jf(), (Ga = t), (Ya = l), Ga.attachEvent('onpropertychange', Mf))
      : e === 'focusout' && jf();
  }
  function Gg(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return Ji(Ya);
  }
  function Yg(e, t) {
    if (e === 'click') return Ji(t);
  }
  function $g(e, t) {
    if (e === 'input' || e === 'change') return Ji(t);
  }
  function Xg(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Mt = typeof Object.is == 'function' ? Object.is : Xg;
  function $a(e, t) {
    if (Mt(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var l = Object.keys(e),
      n = Object.keys(t);
    if (l.length !== n.length) return !1;
    for (n = 0; n < l.length; n++) {
      var u = l[n];
      if (!Ts.call(t, u) || !Mt(e[u], t[u])) return !1;
    }
    return !0;
  }
  function Rf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function wf(e, t) {
    var l = Rf(e);
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
      l = Rf(l);
    }
  }
  function Of(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Of(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Df(e) {
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
  function Ks(e) {
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
  var Vg = gl && 'documentMode' in document && 11 >= document.documentMode,
    Xn = null,
    Is = null,
    Xa = null,
    Js = !1;
  function zf(e, t, l) {
    var n = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Js ||
      Xn == null ||
      Xn !== $i(n) ||
      ((n = Xn),
      'selectionStart' in n && Ks(n)
        ? (n = { start: n.selectionStart, end: n.selectionEnd })
        : ((n = ((n.ownerDocument && n.ownerDocument.defaultView) || window).getSelection()),
          (n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset,
          })),
      (Xa && $a(Xa, n)) ||
        ((Xa = n),
        (n = Uu(Is, 'onSelect')),
        0 < n.length &&
          ((t = new Ki('onSelect', 'select', null, t, l)),
          e.push({ event: t, listeners: n }),
          (t.target = Xn))));
  }
  function yn(e, t) {
    var l = {};
    return (
      (l[e.toLowerCase()] = t.toLowerCase()),
      (l['Webkit' + e] = 'webkit' + t),
      (l['Moz' + e] = 'moz' + t),
      l
    );
  }
  var Vn = {
      animationend: yn('Animation', 'AnimationEnd'),
      animationiteration: yn('Animation', 'AnimationIteration'),
      animationstart: yn('Animation', 'AnimationStart'),
      transitionrun: yn('Transition', 'TransitionRun'),
      transitionstart: yn('Transition', 'TransitionStart'),
      transitioncancel: yn('Transition', 'TransitionCancel'),
      transitionend: yn('Transition', 'TransitionEnd'),
    },
    Ws = {},
    Bf = {};
  gl &&
    ((Bf = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Vn.animationend.animation,
      delete Vn.animationiteration.animation,
      delete Vn.animationstart.animation),
    'TransitionEvent' in window || delete Vn.transitionend.transition);
  function gn(e) {
    if (Ws[e]) return Ws[e];
    if (!Vn[e]) return e;
    var t = Vn[e],
      l;
    for (l in t) if (t.hasOwnProperty(l) && l in Bf) return (Ws[e] = t[l]);
    return e;
  }
  var Lf = gn('animationend'),
    Uf = gn('animationiteration'),
    qf = gn('animationstart'),
    Qg = gn('transitionrun'),
    Zg = gn('transitionstart'),
    Kg = gn('transitioncancel'),
    Hf = gn('transitionend'),
    Gf = new Map(),
    Fs =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  Fs.push('scrollEnd');
  function Pt(e, t) {
    (Gf.set(e, t), hn(t, [e]));
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
    Gt = [],
    Qn = 0,
    Ps = 0;
  function Fi() {
    for (var e = Qn, t = (Ps = Qn = 0); t < e; ) {
      var l = Gt[t];
      Gt[t++] = null;
      var n = Gt[t];
      Gt[t++] = null;
      var u = Gt[t];
      Gt[t++] = null;
      var c = Gt[t];
      if (((Gt[t++] = null), n !== null && u !== null)) {
        var f = n.pending;
        (f === null ? (u.next = u) : ((u.next = f.next), (f.next = u)), (n.pending = u));
      }
      c !== 0 && Yf(l, u, c);
    }
  }
  function Pi(e, t, l, n) {
    ((Gt[Qn++] = e),
      (Gt[Qn++] = t),
      (Gt[Qn++] = l),
      (Gt[Qn++] = n),
      (Ps |= n),
      (e.lanes |= n),
      (e = e.alternate),
      e !== null && (e.lanes |= n));
  }
  function ec(e, t, l, n) {
    return (Pi(e, t, l, n), eu(e));
  }
  function _n(e, t) {
    return (Pi(e, null, null, t), eu(e));
  }
  function Yf(e, t, l) {
    e.lanes |= l;
    var n = e.alternate;
    n !== null && (n.lanes |= l);
    for (var u = !1, c = e.return; c !== null; )
      ((c.childLanes |= l),
        (n = c.alternate),
        n !== null && (n.childLanes |= l),
        c.tag === 22 && ((e = c.stateNode), e === null || e._visibility & 1 || (u = !0)),
        (e = c),
        (c = c.return));
    return e.tag === 3
      ? ((c = e.stateNode),
        u &&
          t !== null &&
          ((u = 31 - jt(l)),
          (e = c.hiddenUpdates),
          (n = e[u]),
          n === null ? (e[u] = [t]) : n.push(t),
          (t.lane = l | 536870912)),
        c)
      : null;
  }
  function eu(e) {
    if (50 < di) throw ((di = 0), (oo = null), Error(s(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var Zn = {};
  function Ig(e, t, l, n) {
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
  function Rt(e, t, l, n) {
    return new Ig(e, t, l, n);
  }
  function tc(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function _l(e, t) {
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
  function $f(e, t) {
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
  function tu(e, t, l, n, u, c) {
    var f = 0;
    if (((n = e), typeof e == 'function')) tc(e) && (f = 1);
    else if (typeof e == 'string')
      f = e0(e, l, le.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case Z:
          return ((e = Rt(31, l, t, u)), (e.elementType = Z), (e.lanes = c), e);
        case w:
          return vn(l.children, u, c, t);
        case j:
          ((f = 8), (u |= 24));
          break;
        case A:
          return ((e = Rt(12, l, t, u | 2)), (e.elementType = A), (e.lanes = c), e);
        case ee:
          return ((e = Rt(13, l, t, u)), (e.elementType = ee), (e.lanes = c), e);
        case V:
          return ((e = Rt(19, l, t, u)), (e.elementType = V), (e.lanes = c), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case Q:
                f = 10;
                break e;
              case k:
                f = 9;
                break e;
              case P:
                f = 11;
                break e;
              case H:
                f = 14;
                break e;
              case U:
                ((f = 16), (n = null));
                break e;
            }
          ((f = 29), (l = Error(s(130, e === null ? 'null' : typeof e, ''))), (n = null));
      }
    return ((t = Rt(f, l, t, u)), (t.elementType = e), (t.type = n), (t.lanes = c), t);
  }
  function vn(e, t, l, n) {
    return ((e = Rt(7, e, n, t)), (e.lanes = l), e);
  }
  function lc(e, t, l) {
    return ((e = Rt(6, e, null, t)), (e.lanes = l), e);
  }
  function Xf(e) {
    var t = Rt(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function nc(e, t, l) {
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
  var Vf = new WeakMap();
  function Yt(e, t) {
    if (typeof e == 'object' && e !== null) {
      var l = Vf.get(e);
      return l !== void 0 ? l : ((t = { value: e, source: t, stack: $r(t) }), Vf.set(e, t), t);
    }
    return { value: e, source: t, stack: $r(t) };
  }
  var Kn = [],
    In = 0,
    lu = null,
    Va = 0,
    $t = [],
    Xt = 0,
    Gl = null,
    cl = 1,
    ol = '';
  function vl(e, t) {
    ((Kn[In++] = Va), (Kn[In++] = lu), (lu = e), (Va = t));
  }
  function Qf(e, t, l) {
    (($t[Xt++] = cl), ($t[Xt++] = ol), ($t[Xt++] = Gl), (Gl = e));
    var n = cl;
    e = ol;
    var u = 32 - jt(n) - 1;
    ((n &= ~(1 << u)), (l += 1));
    var c = 32 - jt(t) + u;
    if (30 < c) {
      var f = u - (u % 5);
      ((c = (n & ((1 << f) - 1)).toString(32)),
        (n >>= f),
        (u -= f),
        (cl = (1 << (32 - jt(t) + u)) | (l << u) | n),
        (ol = c + e));
    } else ((cl = (1 << c) | (l << u) | n), (ol = e));
  }
  function ac(e) {
    e.return !== null && (vl(e, 1), Qf(e, 1, 0));
  }
  function ic(e) {
    for (; e === lu; ) ((lu = Kn[--In]), (Kn[In] = null), (Va = Kn[--In]), (Kn[In] = null));
    for (; e === Gl; )
      ((Gl = $t[--Xt]),
        ($t[Xt] = null),
        (ol = $t[--Xt]),
        ($t[Xt] = null),
        (cl = $t[--Xt]),
        ($t[Xt] = null));
  }
  function Zf(e, t) {
    (($t[Xt++] = cl), ($t[Xt++] = ol), ($t[Xt++] = Gl), (cl = t.id), (ol = t.overflow), (Gl = e));
  }
  var rt = null,
    $e = null,
    Ae = !1,
    Yl = null,
    Vt = !1,
    uc = Error(s(519));
  function $l(e) {
    var t = Error(
      s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (Qa(Yt(t, e)), uc);
  }
  function Kf(e) {
    var t = e.stateNode,
      l = e.type,
      n = e.memoizedProps;
    switch (((t[ot] = e), (t[bt] = n), l)) {
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
        for (l = 0; l < hi.length; l++) xe(hi[l], t);
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
          sf(t, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, !0));
        break;
      case 'select':
        xe('invalid', t);
        break;
      case 'textarea':
        (xe('invalid', t), of(t, n.value, n.defaultValue, n.children));
    }
    ((l = n.children),
      (typeof l != 'string' && typeof l != 'number' && typeof l != 'bigint') ||
      t.textContent === '' + l ||
      n.suppressHydrationWarning === !0 ||
      fh(t.textContent, l)
        ? (n.popover != null && (xe('beforetoggle', t), xe('toggle', t)),
          n.onScroll != null && xe('scroll', t),
          n.onScrollEnd != null && xe('scrollend', t),
          n.onClick != null && (t.onclick = yl),
          (t = !0))
        : (t = !1),
      t || $l(e, !0));
  }
  function If(e) {
    for (rt = e.return; rt; )
      switch (rt.tag) {
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
          rt = rt.return;
      }
  }
  function Jn(e) {
    if (e !== rt) return !1;
    if (!Ae) return (If(e), (Ae = !0), !1);
    var t = e.tag,
      l;
    if (
      ((l = t !== 3 && t !== 27) &&
        ((l = t === 5) &&
          ((l = e.type), (l = !(l !== 'form' && l !== 'button') || No(e.type, e.memoizedProps))),
        (l = !l)),
      l && $e && $l(e),
      If(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(s(317));
      $e = bh(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(s(317));
      $e = bh(e);
    } else
      t === 27
        ? ((t = $e), nn(e.type) ? ((e = Mo), (Mo = null), ($e = e)) : ($e = t))
        : ($e = rt ? Zt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function bn() {
    (($e = rt = null), (Ae = !1));
  }
  function sc() {
    var e = Yl;
    return (e !== null && (Nt === null ? (Nt = e) : Nt.push.apply(Nt, e), (Yl = null)), e);
  }
  function Qa(e) {
    Yl === null ? (Yl = [e]) : Yl.push(e);
  }
  var cc = C(null),
    Sn = null,
    bl = null;
  function Xl(e, t, l) {
    (W(cc, t._currentValue), (t._currentValue = l));
  }
  function Sl(e) {
    ((e._currentValue = cc.current), G(cc));
  }
  function oc(e, t, l) {
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
  function rc(e, t, l, n) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var c = u.dependencies;
      if (c !== null) {
        var f = u.child;
        c = c.firstContext;
        e: for (; c !== null; ) {
          var p = c;
          c = u;
          for (var E = 0; E < t.length; E++)
            if (p.context === t[E]) {
              ((c.lanes |= l),
                (p = c.alternate),
                p !== null && (p.lanes |= l),
                oc(c.return, l, e),
                n || (f = null));
              break e;
            }
          c = p.next;
        }
      } else if (u.tag === 18) {
        if (((f = u.return), f === null)) throw Error(s(341));
        ((f.lanes |= l), (c = f.alternate), c !== null && (c.lanes |= l), oc(f, l, e), (f = null));
      } else f = u.child;
      if (f !== null) f.return = u;
      else
        for (f = u; f !== null; ) {
          if (f === e) {
            f = null;
            break;
          }
          if (((u = f.sibling), u !== null)) {
            ((u.return = f.return), (f = u));
            break;
          }
          f = f.return;
        }
      u = f;
    }
  }
  function Wn(e, t, l, n) {
    e = null;
    for (var u = t, c = !1; u !== null; ) {
      if (!c) {
        if ((u.flags & 524288) !== 0) c = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var f = u.alternate;
        if (f === null) throw Error(s(387));
        if (((f = f.memoizedProps), f !== null)) {
          var p = u.type;
          Mt(u.pendingProps.value, f.value) || (e !== null ? e.push(p) : (e = [p]));
        }
      } else if (u === Ce.current) {
        if (((f = u.alternate), f === null)) throw Error(s(387));
        f.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (e !== null ? e.push(vi) : (e = [vi]));
      }
      u = u.return;
    }
    (e !== null && rc(t, e, l, n), (t.flags |= 262144));
  }
  function nu(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Mt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function xn(e) {
    ((Sn = e), (bl = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function ft(e) {
    return Jf(Sn, e);
  }
  function au(e, t) {
    return (Sn === null && xn(e), Jf(e, t));
  }
  function Jf(e, t) {
    var l = t._currentValue;
    if (((t = { context: t, memoizedValue: l, next: null }), bl === null)) {
      if (e === null) throw Error(s(308));
      ((bl = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else bl = bl.next = t;
    return l;
  }
  var Jg =
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
    Wg = a.unstable_scheduleCallback,
    Fg = a.unstable_NormalPriority,
    tt = {
      $$typeof: Q,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function fc() {
    return { controller: new Jg(), data: new Map(), refCount: 0 };
  }
  function Za(e) {
    (e.refCount--,
      e.refCount === 0 &&
        Wg(Fg, function () {
          e.controller.abort();
        }));
  }
  var Ka = null,
    dc = 0,
    Fn = 0,
    Pn = null;
  function Pg(e, t) {
    if (Ka === null) {
      var l = (Ka = []);
      ((dc = 0),
        (Fn = yo()),
        (Pn = {
          status: 'pending',
          value: void 0,
          then: function (n) {
            l.push(n);
          },
        }));
    }
    return (dc++, t.then(Wf, Wf), t);
  }
  function Wf() {
    if (--dc === 0 && Ka !== null) {
      Pn !== null && (Pn.status = 'fulfilled');
      var e = Ka;
      ((Ka = null), (Fn = 0), (Pn = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function e_(e, t) {
    var l = [],
      n = {
        status: 'pending',
        value: null,
        reason: null,
        then: function (u) {
          l.push(u);
        },
      };
    return (
      e.then(
        function () {
          ((n.status = 'fulfilled'), (n.value = t));
          for (var u = 0; u < l.length; u++) (0, l[u])(t);
        },
        function (u) {
          for (n.status = 'rejected', n.reason = u, u = 0; u < l.length; u++) (0, l[u])(void 0);
        }
      ),
      n
    );
  }
  var Ff = L.S;
  L.S = function (e, t) {
    ((zm = At()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && Pg(e, t),
      Ff !== null && Ff(e, t));
  };
  var En = C(null);
  function mc() {
    var e = En.current;
    return e !== null ? e : Ye.pooledCache;
  }
  function iu(e, t) {
    t === null ? W(En, En.current) : W(En, t.pool);
  }
  function Pf() {
    var e = mc();
    return e === null ? null : { parent: tt._currentValue, pool: e };
  }
  var ea = Error(s(460)),
    hc = Error(s(474)),
    uu = Error(s(542)),
    su = { then: function () {} };
  function ed(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function td(e, t, l) {
    switch (
      ((l = e[l]), l === void 0 ? e.push(t) : l !== t && (t.then(yl, yl), (t = l)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), nd(e), e);
      default:
        if (typeof t.status == 'string') t.then(yl, yl);
        else {
          if (((e = Ye), e !== null && 100 < e.shellSuspendCounter)) throw Error(s(482));
          ((e = t),
            (e.status = 'pending'),
            e.then(
              function (n) {
                if (t.status === 'pending') {
                  var u = t;
                  ((u.status = 'fulfilled'), (u.value = n));
                }
              },
              function (n) {
                if (t.status === 'pending') {
                  var u = t;
                  ((u.status = 'rejected'), (u.reason = n));
                }
              }
            ));
        }
        switch (t.status) {
          case 'fulfilled':
            return t.value;
          case 'rejected':
            throw ((e = t.reason), nd(e), e);
        }
        throw ((Nn = t), ea);
    }
  }
  function Tn(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == 'object' && typeof l.then == 'function' ? ((Nn = l), ea) : l;
    }
  }
  var Nn = null;
  function ld() {
    if (Nn === null) throw Error(s(459));
    var e = Nn;
    return ((Nn = null), e);
  }
  function nd(e) {
    if (e === ea || e === uu) throw Error(s(483));
  }
  var ta = null,
    Ia = 0;
  function cu(e) {
    var t = Ia;
    return ((Ia += 1), ta === null && (ta = []), td(ta, e, t));
  }
  function Ja(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function ou(e, t) {
    throw t.$$typeof === x
      ? Error(s(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          s(
            31,
            e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e
          )
        ));
  }
  function ad(e) {
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
    function n(M) {
      for (var N = new Map(); M !== null; )
        (M.key !== null ? N.set(M.key, M) : N.set(M.index, M), (M = M.sibling));
      return N;
    }
    function u(M, N) {
      return ((M = _l(M, N)), (M.index = 0), (M.sibling = null), M);
    }
    function c(M, N, O) {
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
    function f(M) {
      return (e && M.alternate === null && (M.flags |= 67108866), M);
    }
    function p(M, N, O, $) {
      return N === null || N.tag !== 6
        ? ((N = lc(O, M.mode, $)), (N.return = M), N)
        : ((N = u(N, O)), (N.return = M), N);
    }
    function E(M, N, O, $) {
      var se = O.type;
      return se === w
        ? q(M, N, O.props.children, $, O.key)
        : N !== null &&
            (N.elementType === se ||
              (typeof se == 'object' && se !== null && se.$$typeof === U && Tn(se) === N.type))
          ? ((N = u(N, O.props)), Ja(N, O), (N.return = M), N)
          : ((N = tu(O.type, O.key, O.props, null, M.mode, $)), Ja(N, O), (N.return = M), N);
    }
    function D(M, N, O, $) {
      return N === null ||
        N.tag !== 4 ||
        N.stateNode.containerInfo !== O.containerInfo ||
        N.stateNode.implementation !== O.implementation
        ? ((N = nc(O, M.mode, $)), (N.return = M), N)
        : ((N = u(N, O.children || [])), (N.return = M), N);
    }
    function q(M, N, O, $, se) {
      return N === null || N.tag !== 7
        ? ((N = vn(O, M.mode, $, se)), (N.return = M), N)
        : ((N = u(N, O)), (N.return = M), N);
    }
    function X(M, N, O) {
      if ((typeof N == 'string' && N !== '') || typeof N == 'number' || typeof N == 'bigint')
        return ((N = lc('' + N, M.mode, O)), (N.return = M), N);
      if (typeof N == 'object' && N !== null) {
        switch (N.$$typeof) {
          case R:
            return ((O = tu(N.type, N.key, N.props, null, M.mode, O)), Ja(O, N), (O.return = M), O);
          case S:
            return ((N = nc(N, M.mode, O)), (N.return = M), N);
          case U:
            return ((N = Tn(N)), X(M, N, O));
        }
        if (he(N) || ce(N)) return ((N = vn(N, M.mode, O, null)), (N.return = M), N);
        if (typeof N.then == 'function') return X(M, cu(N), O);
        if (N.$$typeof === Q) return X(M, au(M, N), O);
        ou(M, N);
      }
      return null;
    }
    function z(M, N, O, $) {
      var se = N !== null ? N.key : null;
      if ((typeof O == 'string' && O !== '') || typeof O == 'number' || typeof O == 'bigint')
        return se !== null ? null : p(M, N, '' + O, $);
      if (typeof O == 'object' && O !== null) {
        switch (O.$$typeof) {
          case R:
            return O.key === se ? E(M, N, O, $) : null;
          case S:
            return O.key === se ? D(M, N, O, $) : null;
          case U:
            return ((O = Tn(O)), z(M, N, O, $));
        }
        if (he(O) || ce(O)) return se !== null ? null : q(M, N, O, $, null);
        if (typeof O.then == 'function') return z(M, N, cu(O), $);
        if (O.$$typeof === Q) return z(M, N, au(M, O), $);
        ou(M, O);
      }
      return null;
    }
    function B(M, N, O, $, se) {
      if ((typeof $ == 'string' && $ !== '') || typeof $ == 'number' || typeof $ == 'bigint')
        return ((M = M.get(O) || null), p(N, M, '' + $, se));
      if (typeof $ == 'object' && $ !== null) {
        switch ($.$$typeof) {
          case R:
            return ((M = M.get($.key === null ? O : $.key) || null), E(N, M, $, se));
          case S:
            return ((M = M.get($.key === null ? O : $.key) || null), D(N, M, $, se));
          case U:
            return (($ = Tn($)), B(M, N, O, $, se));
        }
        if (he($) || ce($)) return ((M = M.get(O) || null), q(N, M, $, se, null));
        if (typeof $.then == 'function') return B(M, N, O, cu($), se);
        if ($.$$typeof === Q) return B(M, N, O, au(N, $), se);
        ou(N, $);
      }
      return null;
    }
    function ne(M, N, O, $) {
      for (
        var se = null, je = null, ie = N, ve = (N = 0), ke = null;
        ie !== null && ve < O.length;
        ve++
      ) {
        ie.index > ve ? ((ke = ie), (ie = null)) : (ke = ie.sibling);
        var Me = z(M, ie, O[ve], $);
        if (Me === null) {
          ie === null && (ie = ke);
          break;
        }
        (e && ie && Me.alternate === null && t(M, ie),
          (N = c(Me, N, ve)),
          je === null ? (se = Me) : (je.sibling = Me),
          (je = Me),
          (ie = ke));
      }
      if (ve === O.length) return (l(M, ie), Ae && vl(M, ve), se);
      if (ie === null) {
        for (; ve < O.length; ve++)
          ((ie = X(M, O[ve], $)),
            ie !== null &&
              ((N = c(ie, N, ve)), je === null ? (se = ie) : (je.sibling = ie), (je = ie)));
        return (Ae && vl(M, ve), se);
      }
      for (ie = n(ie); ve < O.length; ve++)
        ((ke = B(ie, M, ve, O[ve], $)),
          ke !== null &&
            (e && ke.alternate !== null && ie.delete(ke.key === null ? ve : ke.key),
            (N = c(ke, N, ve)),
            je === null ? (se = ke) : (je.sibling = ke),
            (je = ke)));
      return (
        e &&
          ie.forEach(function (on) {
            return t(M, on);
          }),
        Ae && vl(M, ve),
        se
      );
    }
    function re(M, N, O, $) {
      if (O == null) throw Error(s(151));
      for (
        var se = null, je = null, ie = N, ve = (N = 0), ke = null, Me = O.next();
        ie !== null && !Me.done;
        ve++, Me = O.next()
      ) {
        ie.index > ve ? ((ke = ie), (ie = null)) : (ke = ie.sibling);
        var on = z(M, ie, Me.value, $);
        if (on === null) {
          ie === null && (ie = ke);
          break;
        }
        (e && ie && on.alternate === null && t(M, ie),
          (N = c(on, N, ve)),
          je === null ? (se = on) : (je.sibling = on),
          (je = on),
          (ie = ke));
      }
      if (Me.done) return (l(M, ie), Ae && vl(M, ve), se);
      if (ie === null) {
        for (; !Me.done; ve++, Me = O.next())
          ((Me = X(M, Me.value, $)),
            Me !== null &&
              ((N = c(Me, N, ve)), je === null ? (se = Me) : (je.sibling = Me), (je = Me)));
        return (Ae && vl(M, ve), se);
      }
      for (ie = n(ie); !Me.done; ve++, Me = O.next())
        ((Me = B(ie, M, ve, Me.value, $)),
          Me !== null &&
            (e && Me.alternate !== null && ie.delete(Me.key === null ? ve : Me.key),
            (N = c(Me, N, ve)),
            je === null ? (se = Me) : (je.sibling = Me),
            (je = Me)));
      return (
        e &&
          ie.forEach(function (f0) {
            return t(M, f0);
          }),
        Ae && vl(M, ve),
        se
      );
    }
    function He(M, N, O, $) {
      if (
        (typeof O == 'object' &&
          O !== null &&
          O.type === w &&
          O.key === null &&
          (O = O.props.children),
        typeof O == 'object' && O !== null)
      ) {
        switch (O.$$typeof) {
          case R:
            e: {
              for (var se = O.key; N !== null; ) {
                if (N.key === se) {
                  if (((se = O.type), se === w)) {
                    if (N.tag === 7) {
                      (l(M, N.sibling), ($ = u(N, O.props.children)), ($.return = M), (M = $));
                      break e;
                    }
                  } else if (
                    N.elementType === se ||
                    (typeof se == 'object' && se !== null && se.$$typeof === U && Tn(se) === N.type)
                  ) {
                    (l(M, N.sibling), ($ = u(N, O.props)), Ja($, O), ($.return = M), (M = $));
                    break e;
                  }
                  l(M, N);
                  break;
                } else t(M, N);
                N = N.sibling;
              }
              O.type === w
                ? (($ = vn(O.props.children, M.mode, $, O.key)), ($.return = M), (M = $))
                : (($ = tu(O.type, O.key, O.props, null, M.mode, $)),
                  Ja($, O),
                  ($.return = M),
                  (M = $));
            }
            return f(M);
          case S:
            e: {
              for (se = O.key; N !== null; ) {
                if (N.key === se)
                  if (
                    N.tag === 4 &&
                    N.stateNode.containerInfo === O.containerInfo &&
                    N.stateNode.implementation === O.implementation
                  ) {
                    (l(M, N.sibling), ($ = u(N, O.children || [])), ($.return = M), (M = $));
                    break e;
                  } else {
                    l(M, N);
                    break;
                  }
                else t(M, N);
                N = N.sibling;
              }
              (($ = nc(O, M.mode, $)), ($.return = M), (M = $));
            }
            return f(M);
          case U:
            return ((O = Tn(O)), He(M, N, O, $));
        }
        if (he(O)) return ne(M, N, O, $);
        if (ce(O)) {
          if (((se = ce(O)), typeof se != 'function')) throw Error(s(150));
          return ((O = se.call(O)), re(M, N, O, $));
        }
        if (typeof O.then == 'function') return He(M, N, cu(O), $);
        if (O.$$typeof === Q) return He(M, N, au(M, O), $);
        ou(M, O);
      }
      return (typeof O == 'string' && O !== '') || typeof O == 'number' || typeof O == 'bigint'
        ? ((O = '' + O),
          N !== null && N.tag === 6
            ? (l(M, N.sibling), ($ = u(N, O)), ($.return = M), (M = $))
            : (l(M, N), ($ = lc(O, M.mode, $)), ($.return = M), (M = $)),
          f(M))
        : l(M, N);
    }
    return function (M, N, O, $) {
      try {
        Ia = 0;
        var se = He(M, N, O, $);
        return ((ta = null), se);
      } catch (ie) {
        if (ie === ea || ie === uu) throw ie;
        var je = Rt(29, ie, null, M.mode);
        return ((je.lanes = $), (je.return = M), je);
      } finally {
      }
    };
  }
  var kn = ad(!0),
    id = ad(!1),
    Vl = !1;
  function pc(e) {
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
  function Ql(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Zl(e, t, l) {
    var n = e.updateQueue;
    if (n === null) return null;
    if (((n = n.shared), (we & 2) !== 0)) {
      var u = n.pending;
      return (
        u === null ? (t.next = t) : ((t.next = u.next), (u.next = t)),
        (n.pending = t),
        (t = eu(e)),
        Yf(e, null, l),
        t
      );
    }
    return (Pi(e, n, t, l), eu(e));
  }
  function Wa(e, t, l) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (l & 4194048) !== 0))) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (l |= n), (t.lanes = l), Ir(e, l));
    }
  }
  function gc(e, t) {
    var l = e.updateQueue,
      n = e.alternate;
    if (n !== null && ((n = n.updateQueue), l === n)) {
      var u = null,
        c = null;
      if (((l = l.firstBaseUpdate), l !== null)) {
        do {
          var f = { lane: l.lane, tag: l.tag, payload: l.payload, callback: null, next: null };
          (c === null ? (u = c = f) : (c = c.next = f), (l = l.next));
        } while (l !== null);
        c === null ? (u = c = t) : (c = c.next = t);
      } else u = c = t;
      ((l = {
        baseState: n.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: c,
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
  var _c = !1;
  function Fa() {
    if (_c) {
      var e = Pn;
      if (e !== null) throw e;
    }
  }
  function Pa(e, t, l, n) {
    _c = !1;
    var u = e.updateQueue;
    Vl = !1;
    var c = u.firstBaseUpdate,
      f = u.lastBaseUpdate,
      p = u.shared.pending;
    if (p !== null) {
      u.shared.pending = null;
      var E = p,
        D = E.next;
      ((E.next = null), f === null ? (c = D) : (f.next = D), (f = E));
      var q = e.alternate;
      q !== null &&
        ((q = q.updateQueue),
        (p = q.lastBaseUpdate),
        p !== f && (p === null ? (q.firstBaseUpdate = D) : (p.next = D), (q.lastBaseUpdate = E)));
    }
    if (c !== null) {
      var X = u.baseState;
      ((f = 0), (q = D = E = null), (p = c));
      do {
        var z = p.lane & -536870913,
          B = z !== p.lane;
        if (B ? (Ne & z) === z : (n & z) === z) {
          (z !== 0 && z === Fn && (_c = !0),
            q !== null &&
              (q = q.next =
                { lane: 0, tag: p.tag, payload: p.payload, callback: null, next: null }));
          e: {
            var ne = e,
              re = p;
            z = t;
            var He = l;
            switch (re.tag) {
              case 1:
                if (((ne = re.payload), typeof ne == 'function')) {
                  X = ne.call(He, X, z);
                  break e;
                }
                X = ne;
                break e;
              case 3:
                ne.flags = (ne.flags & -65537) | 128;
              case 0:
                if (
                  ((ne = re.payload),
                  (z = typeof ne == 'function' ? ne.call(He, X, z) : ne),
                  z == null)
                )
                  break e;
                X = b({}, X, z);
                break e;
              case 2:
                Vl = !0;
            }
          }
          ((z = p.callback),
            z !== null &&
              ((e.flags |= 64),
              B && (e.flags |= 8192),
              (B = u.callbacks),
              B === null ? (u.callbacks = [z]) : B.push(z)));
        } else
          ((B = { lane: z, tag: p.tag, payload: p.payload, callback: p.callback, next: null }),
            q === null ? ((D = q = B), (E = X)) : (q = q.next = B),
            (f |= z));
        if (((p = p.next), p === null)) {
          if (((p = u.shared.pending), p === null)) break;
          ((B = p),
            (p = B.next),
            (B.next = null),
            (u.lastBaseUpdate = B),
            (u.shared.pending = null));
        }
      } while (!0);
      (q === null && (E = X),
        (u.baseState = E),
        (u.firstBaseUpdate = D),
        (u.lastBaseUpdate = q),
        c === null && (u.shared.lanes = 0),
        (Fl |= f),
        (e.lanes = f),
        (e.memoizedState = X));
    }
  }
  function ud(e, t) {
    if (typeof e != 'function') throw Error(s(191, e));
    e.call(t);
  }
  function sd(e, t) {
    var l = e.callbacks;
    if (l !== null) for (e.callbacks = null, e = 0; e < l.length; e++) ud(l[e], t);
  }
  var la = C(null),
    ru = C(0);
  function cd(e, t) {
    ((e = Ml), W(ru, e), W(la, t), (Ml = e | t.baseLanes));
  }
  function vc() {
    (W(ru, Ml), W(la, la.current));
  }
  function bc() {
    ((Ml = ru.current), G(la), G(ru));
  }
  var wt = C(null),
    Qt = null;
  function Kl(e) {
    var t = e.alternate;
    (W(Fe, Fe.current & 1),
      W(wt, e),
      Qt === null && (t === null || la.current !== null || t.memoizedState !== null) && (Qt = e));
  }
  function Sc(e) {
    (W(Fe, Fe.current), W(wt, e), Qt === null && (Qt = e));
  }
  function od(e) {
    e.tag === 22 ? (W(Fe, Fe.current), W(wt, e), Qt === null && (Qt = e)) : Il();
  }
  function Il() {
    (W(Fe, Fe.current), W(wt, wt.current));
  }
  function Ot(e) {
    (G(wt), Qt === e && (Qt = null), G(Fe));
  }
  var Fe = C(0);
  function fu(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && ((l = l.dehydrated), l === null || Co(l) || jo(l))) return t;
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
    _e = null,
    Ue = null,
    lt = null,
    du = !1,
    na = !1,
    An = !1,
    mu = 0,
    ei = 0,
    aa = null,
    t_ = 0;
  function Ie() {
    throw Error(s(321));
  }
  function xc(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++) if (!Mt(e[l], t[l])) return !1;
    return !0;
  }
  function Ec(e, t, l, n, u, c) {
    return (
      (xl = c),
      (_e = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (L.H = e === null || e.memoizedState === null ? Qd : Uc),
      (An = !1),
      (c = l(n, u)),
      (An = !1),
      na && (c = fd(t, l, n, u)),
      rd(e),
      c
    );
  }
  function rd(e) {
    L.H = ni;
    var t = Ue !== null && Ue.next !== null;
    if (((xl = 0), (lt = Ue = _e = null), (du = !1), (ei = 0), (aa = null), t)) throw Error(s(300));
    e === null || nt || ((e = e.dependencies), e !== null && nu(e) && (nt = !0));
  }
  function fd(e, t, l, n) {
    _e = e;
    var u = 0;
    do {
      if ((na && (aa = null), (ei = 0), (na = !1), 25 <= u)) throw Error(s(301));
      if (((u += 1), (lt = Ue = null), e.updateQueue != null)) {
        var c = e.updateQueue;
        ((c.lastEffect = null),
          (c.events = null),
          (c.stores = null),
          c.memoCache != null && (c.memoCache.index = 0));
      }
      ((L.H = Zd), (c = t(l, n)));
    } while (na);
    return c;
  }
  function l_() {
    var e = L.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? ti(t) : t),
      (e = e.useState()[0]),
      (Ue !== null ? Ue.memoizedState : null) !== e && (_e.flags |= 1024),
      t
    );
  }
  function Tc() {
    var e = mu !== 0;
    return ((mu = 0), e);
  }
  function Nc(e, t, l) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l));
  }
  function kc(e) {
    if (du) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      du = !1;
    }
    ((xl = 0), (lt = Ue = _e = null), (na = !1), (ei = mu = 0), (aa = null));
  }
  function _t() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (lt === null ? (_e.memoizedState = lt = e) : (lt = lt.next = e), lt);
  }
  function Pe() {
    if (Ue === null) {
      var e = _e.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ue.next;
    var t = lt === null ? _e.memoizedState : lt.next;
    if (t !== null) ((lt = t), (Ue = e));
    else {
      if (e === null) throw _e.alternate === null ? Error(s(467)) : Error(s(310));
      ((Ue = e),
        (e = {
          memoizedState: Ue.memoizedState,
          baseState: Ue.baseState,
          baseQueue: Ue.baseQueue,
          queue: Ue.queue,
          next: null,
        }),
        lt === null ? (_e.memoizedState = lt = e) : (lt = lt.next = e));
    }
    return lt;
  }
  function hu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ti(e) {
    var t = ei;
    return (
      (ei += 1),
      aa === null && (aa = []),
      (e = td(aa, e, t)),
      (t = _e),
      (lt === null ? t.memoizedState : lt.next) === null &&
        ((t = t.alternate), (L.H = t === null || t.memoizedState === null ? Qd : Uc)),
      e
    );
  }
  function pu(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return ti(e);
      if (e.$$typeof === Q) return ft(e);
    }
    throw Error(s(438, String(e)));
  }
  function Ac(e) {
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
              data: n.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      l === null && ((l = hu()), (_e.updateQueue = l)),
      (l.memoCache = t),
      (l = t.data[t.index]),
      l === void 0)
    )
      for (l = t.data[t.index] = Array(e), n = 0; n < e; n++) l[n] = ae;
    return (t.index++, l);
  }
  function El(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function yu(e) {
    var t = Pe();
    return Cc(t, Ue, e);
  }
  function Cc(e, t, l) {
    var n = e.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = l;
    var u = e.baseQueue,
      c = n.pending;
    if (c !== null) {
      if (u !== null) {
        var f = u.next;
        ((u.next = c.next), (c.next = f));
      }
      ((t.baseQueue = u = c), (n.pending = null));
    }
    if (((c = e.baseState), u === null)) e.memoizedState = c;
    else {
      t = u.next;
      var p = (f = null),
        E = null,
        D = t,
        q = !1;
      do {
        var X = D.lane & -536870913;
        if (X !== D.lane ? (Ne & X) === X : (xl & X) === X) {
          var z = D.revertLane;
          if (z === 0)
            (E !== null &&
              (E = E.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: D.action,
                  hasEagerState: D.hasEagerState,
                  eagerState: D.eagerState,
                  next: null,
                }),
              X === Fn && (q = !0));
          else if ((xl & z) === z) {
            ((D = D.next), z === Fn && (q = !0));
            continue;
          } else
            ((X = {
              lane: 0,
              revertLane: D.revertLane,
              gesture: null,
              action: D.action,
              hasEagerState: D.hasEagerState,
              eagerState: D.eagerState,
              next: null,
            }),
              E === null ? ((p = E = X), (f = c)) : (E = E.next = X),
              (_e.lanes |= z),
              (Fl |= z));
          ((X = D.action), An && l(c, X), (c = D.hasEagerState ? D.eagerState : l(c, X)));
        } else
          ((z = {
            lane: X,
            revertLane: D.revertLane,
            gesture: D.gesture,
            action: D.action,
            hasEagerState: D.hasEagerState,
            eagerState: D.eagerState,
            next: null,
          }),
            E === null ? ((p = E = z), (f = c)) : (E = E.next = z),
            (_e.lanes |= X),
            (Fl |= X));
        D = D.next;
      } while (D !== null && D !== t);
      if (
        (E === null ? (f = c) : (E.next = p),
        !Mt(c, e.memoizedState) && ((nt = !0), q && ((l = Pn), l !== null)))
      )
        throw l;
      ((e.memoizedState = c), (e.baseState = f), (e.baseQueue = E), (n.lastRenderedState = c));
    }
    return (u === null && (n.lanes = 0), [e.memoizedState, n.dispatch]);
  }
  function jc(e) {
    var t = Pe(),
      l = t.queue;
    if (l === null) throw Error(s(311));
    l.lastRenderedReducer = e;
    var n = l.dispatch,
      u = l.pending,
      c = t.memoizedState;
    if (u !== null) {
      l.pending = null;
      var f = (u = u.next);
      do ((c = e(c, f.action)), (f = f.next));
      while (f !== u);
      (Mt(c, t.memoizedState) || (nt = !0),
        (t.memoizedState = c),
        t.baseQueue === null && (t.baseState = c),
        (l.lastRenderedState = c));
    }
    return [c, n];
  }
  function dd(e, t, l) {
    var n = _e,
      u = Pe(),
      c = Ae;
    if (c) {
      if (l === void 0) throw Error(s(407));
      l = l();
    } else l = t();
    var f = !Mt((Ue || u).memoizedState, l);
    if (
      (f && ((u.memoizedState = l), (nt = !0)),
      (u = u.queue),
      wc(pd.bind(null, n, u, e), [e]),
      u.getSnapshot !== t || f || (lt !== null && lt.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        ia(9, { destroy: void 0 }, hd.bind(null, n, u, l, t), null),
        Ye === null)
      )
        throw Error(s(349));
      c || (xl & 127) !== 0 || md(n, t, l);
    }
    return l;
  }
  function md(e, t, l) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: l }),
      (t = _e.updateQueue),
      t === null
        ? ((t = hu()), (_e.updateQueue = t), (t.stores = [e]))
        : ((l = t.stores), l === null ? (t.stores = [e]) : l.push(e)));
  }
  function hd(e, t, l, n) {
    ((t.value = l), (t.getSnapshot = n), yd(t) && gd(e));
  }
  function pd(e, t, l) {
    return l(function () {
      yd(t) && gd(e);
    });
  }
  function yd(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !Mt(e, l);
    } catch {
      return !0;
    }
  }
  function gd(e) {
    var t = _n(e, 2);
    t !== null && kt(t, e, 2);
  }
  function Mc(e) {
    var t = _t();
    if (typeof e == 'function') {
      var l = e;
      if (((e = l()), An)) {
        Ul(!0);
        try {
          l();
        } finally {
          Ul(!1);
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
  function _d(e, t, l, n) {
    return ((e.baseState = l), Cc(e, Ue, typeof n == 'function' ? n : El));
  }
  function n_(e, t, l, n, u) {
    if (vu(e)) throw Error(s(485));
    if (((e = t.action), e !== null)) {
      var c = {
        payload: u,
        action: e,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (f) {
          c.listeners.push(f);
        },
      };
      (L.T !== null ? l(!0) : (c.isTransition = !1),
        n(c),
        (l = t.pending),
        l === null
          ? ((c.next = t.pending = c), vd(t, c))
          : ((c.next = l.next), (t.pending = l.next = c)));
    }
  }
  function vd(e, t) {
    var l = t.action,
      n = t.payload,
      u = e.state;
    if (t.isTransition) {
      var c = L.T,
        f = {};
      L.T = f;
      try {
        var p = l(u, n),
          E = L.S;
        (E !== null && E(f, p), bd(e, t, p));
      } catch (D) {
        Rc(e, t, D);
      } finally {
        (c !== null && f.types !== null && (c.types = f.types), (L.T = c));
      }
    } else
      try {
        ((c = l(u, n)), bd(e, t, c));
      } catch (D) {
        Rc(e, t, D);
      }
  }
  function bd(e, t, l) {
    l !== null && typeof l == 'object' && typeof l.then == 'function'
      ? l.then(
          function (n) {
            Sd(e, t, n);
          },
          function (n) {
            return Rc(e, t, n);
          }
        )
      : Sd(e, t, l);
  }
  function Sd(e, t, l) {
    ((t.status = 'fulfilled'),
      (t.value = l),
      xd(t),
      (e.state = l),
      (t = e.pending),
      t !== null &&
        ((l = t.next), l === t ? (e.pending = null) : ((l = l.next), (t.next = l), vd(e, l))));
  }
  function Rc(e, t, l) {
    var n = e.pending;
    if (((e.pending = null), n !== null)) {
      n = n.next;
      do ((t.status = 'rejected'), (t.reason = l), xd(t), (t = t.next));
      while (t !== n);
    }
    e.action = null;
  }
  function xd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Ed(e, t) {
    return t;
  }
  function Td(e, t) {
    if (Ae) {
      var l = Ye.formState;
      if (l !== null) {
        e: {
          var n = _e;
          if (Ae) {
            if ($e) {
              t: {
                for (var u = $e, c = Vt; u.nodeType !== 8; ) {
                  if (!c) {
                    u = null;
                    break t;
                  }
                  if (((u = Zt(u.nextSibling)), u === null)) {
                    u = null;
                    break t;
                  }
                }
                ((c = u.data), (u = c === 'F!' || c === 'F' ? u : null));
              }
              if (u) {
                (($e = Zt(u.nextSibling)), (n = u.data === 'F!'));
                break e;
              }
            }
            $l(n);
          }
          n = !1;
        }
        n && (t = l[0]);
      }
    }
    return (
      (l = _t()),
      (l.memoizedState = l.baseState = t),
      (n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ed,
        lastRenderedState: t,
      }),
      (l.queue = n),
      (l = $d.bind(null, _e, n)),
      (n.dispatch = l),
      (n = Mc(!1)),
      (c = Lc.bind(null, _e, !1, n.queue)),
      (n = _t()),
      (u = { state: t, dispatch: null, action: e, pending: null }),
      (n.queue = u),
      (l = n_.bind(null, _e, u, c, l)),
      (u.dispatch = l),
      (n.memoizedState = e),
      [t, l, !1]
    );
  }
  function Nd(e) {
    var t = Pe();
    return kd(t, Ue, e);
  }
  function kd(e, t, l) {
    if (
      ((t = Cc(e, t, Ed)[0]),
      (e = yu(El)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var n = ti(t);
      } catch (f) {
        throw f === ea ? uu : f;
      }
    else n = t;
    t = Pe();
    var u = t.queue,
      c = u.dispatch;
    return (
      l !== t.memoizedState &&
        ((_e.flags |= 2048), ia(9, { destroy: void 0 }, a_.bind(null, u, l), null)),
      [n, c, e]
    );
  }
  function a_(e, t) {
    e.action = t;
  }
  function Ad(e) {
    var t = Pe(),
      l = Ue;
    if (l !== null) return kd(t, l, e);
    (Pe(), (t = t.memoizedState), (l = Pe()));
    var n = l.queue.dispatch;
    return ((l.memoizedState = e), [t, n, !1]);
  }
  function ia(e, t, l, n) {
    return (
      (e = { tag: e, create: l, deps: n, inst: t, next: null }),
      (t = _e.updateQueue),
      t === null && ((t = hu()), (_e.updateQueue = t)),
      (l = t.lastEffect),
      l === null
        ? (t.lastEffect = e.next = e)
        : ((n = l.next), (l.next = e), (e.next = n), (t.lastEffect = e)),
      e
    );
  }
  function Cd() {
    return Pe().memoizedState;
  }
  function gu(e, t, l, n) {
    var u = _t();
    ((_e.flags |= e),
      (u.memoizedState = ia(1 | t, { destroy: void 0 }, l, n === void 0 ? null : n)));
  }
  function _u(e, t, l, n) {
    var u = Pe();
    n = n === void 0 ? null : n;
    var c = u.memoizedState.inst;
    Ue !== null && n !== null && xc(n, Ue.memoizedState.deps)
      ? (u.memoizedState = ia(t, c, l, n))
      : ((_e.flags |= e), (u.memoizedState = ia(1 | t, c, l, n)));
  }
  function jd(e, t) {
    gu(8390656, 8, e, t);
  }
  function wc(e, t) {
    _u(2048, 8, e, t);
  }
  function i_(e) {
    _e.flags |= 4;
    var t = _e.updateQueue;
    if (t === null) ((t = hu()), (_e.updateQueue = t), (t.events = [e]));
    else {
      var l = t.events;
      l === null ? (t.events = [e]) : l.push(e);
    }
  }
  function Md(e) {
    var t = Pe().memoizedState;
    return (
      i_({ ref: t, nextImpl: e }),
      function () {
        if ((we & 2) !== 0) throw Error(s(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function Rd(e, t) {
    return _u(4, 2, e, t);
  }
  function wd(e, t) {
    return _u(4, 4, e, t);
  }
  function Od(e, t) {
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
  function Dd(e, t, l) {
    ((l = l != null ? l.concat([e]) : null), _u(4, 4, Od.bind(null, t, e), l));
  }
  function Oc() {}
  function zd(e, t) {
    var l = Pe();
    t = t === void 0 ? null : t;
    var n = l.memoizedState;
    return t !== null && xc(t, n[1]) ? n[0] : ((l.memoizedState = [e, t]), e);
  }
  function Bd(e, t) {
    var l = Pe();
    t = t === void 0 ? null : t;
    var n = l.memoizedState;
    if (t !== null && xc(t, n[1])) return n[0];
    if (((n = e()), An)) {
      Ul(!0);
      try {
        e();
      } finally {
        Ul(!1);
      }
    }
    return ((l.memoizedState = [n, t]), n);
  }
  function Dc(e, t, l) {
    return l === void 0 || ((xl & 1073741824) !== 0 && (Ne & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = l), (e = Lm()), (_e.lanes |= e), (Fl |= e), l);
  }
  function Ld(e, t, l, n) {
    return Mt(l, t)
      ? l
      : la.current !== null
        ? ((e = Dc(e, l, n)), Mt(e, t) || (nt = !0), e)
        : (xl & 42) === 0 || ((xl & 1073741824) !== 0 && (Ne & 261930) === 0)
          ? ((nt = !0), (e.memoizedState = l))
          : ((e = Lm()), (_e.lanes |= e), (Fl |= e), t);
  }
  function Ud(e, t, l, n, u) {
    var c = K.p;
    K.p = c !== 0 && 8 > c ? c : 8;
    var f = L.T,
      p = {};
    ((L.T = p), Lc(e, !1, t, l));
    try {
      var E = u(),
        D = L.S;
      if (
        (D !== null && D(p, E), E !== null && typeof E == 'object' && typeof E.then == 'function')
      ) {
        var q = e_(E, n);
        li(e, t, q, Bt(e));
      } else li(e, t, n, Bt(e));
    } catch (X) {
      li(e, t, { then: function () {}, status: 'rejected', reason: X }, Bt());
    } finally {
      ((K.p = c), f !== null && p.types !== null && (f.types = p.types), (L.T = f));
    }
  }
  function u_() {}
  function zc(e, t, l, n) {
    if (e.tag !== 5) throw Error(s(476));
    var u = qd(e).queue;
    Ud(
      e,
      u,
      t,
      te,
      l === null
        ? u_
        : function () {
            return (Hd(e), l(n));
          }
    );
  }
  function qd(e) {
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
        lastRenderedReducer: El,
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
          lastRenderedReducer: El,
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
  function Hd(e) {
    var t = qd(e);
    (t.next === null && (t = e.alternate.memoizedState), li(e, t.next.queue, {}, Bt()));
  }
  function Bc() {
    return ft(vi);
  }
  function Gd() {
    return Pe().memoizedState;
  }
  function Yd() {
    return Pe().memoizedState;
  }
  function s_(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = Bt();
          e = Ql(l);
          var n = Zl(t, e, l);
          (n !== null && (kt(n, t, l), Wa(n, t, l)), (t = { cache: fc() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function c_(e, t, l) {
    var n = Bt();
    ((l = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      vu(e) ? Xd(t, l) : ((l = ec(e, t, l, n)), l !== null && (kt(l, e, n), Vd(l, t, n))));
  }
  function $d(e, t, l) {
    var n = Bt();
    li(e, t, l, n);
  }
  function li(e, t, l, n) {
    var u = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (vu(e)) Xd(t, u);
    else {
      var c = e.alternate;
      if (
        e.lanes === 0 &&
        (c === null || c.lanes === 0) &&
        ((c = t.lastRenderedReducer), c !== null)
      )
        try {
          var f = t.lastRenderedState,
            p = c(f, l);
          if (((u.hasEagerState = !0), (u.eagerState = p), Mt(p, f)))
            return (Pi(e, t, u, 0), Ye === null && Fi(), !1);
        } catch {
        } finally {
        }
      if (((l = ec(e, t, u, n)), l !== null)) return (kt(l, e, n), Vd(l, t, n), !0);
    }
    return !1;
  }
  function Lc(e, t, l, n) {
    if (
      ((n = {
        lane: 2,
        revertLane: yo(),
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      vu(e))
    ) {
      if (t) throw Error(s(479));
    } else ((t = ec(e, l, n, 2)), t !== null && kt(t, e, 2));
  }
  function vu(e) {
    var t = e.alternate;
    return e === _e || (t !== null && t === _e);
  }
  function Xd(e, t) {
    na = du = !0;
    var l = e.pending;
    (l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)), (e.pending = t));
  }
  function Vd(e, t, l) {
    if ((l & 4194048) !== 0) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (l |= n), (t.lanes = l), Ir(e, l));
    }
  }
  var ni = {
    readContext: ft,
    use: pu,
    useCallback: Ie,
    useContext: Ie,
    useEffect: Ie,
    useImperativeHandle: Ie,
    useLayoutEffect: Ie,
    useInsertionEffect: Ie,
    useMemo: Ie,
    useReducer: Ie,
    useRef: Ie,
    useState: Ie,
    useDebugValue: Ie,
    useDeferredValue: Ie,
    useTransition: Ie,
    useSyncExternalStore: Ie,
    useId: Ie,
    useHostTransitionStatus: Ie,
    useFormState: Ie,
    useActionState: Ie,
    useOptimistic: Ie,
    useMemoCache: Ie,
    useCacheRefresh: Ie,
  };
  ni.useEffectEvent = Ie;
  var Qd = {
      readContext: ft,
      use: pu,
      useCallback: function (e, t) {
        return ((_t().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: ft,
      useEffect: jd,
      useImperativeHandle: function (e, t, l) {
        ((l = l != null ? l.concat([e]) : null), gu(4194308, 4, Od.bind(null, t, e), l));
      },
      useLayoutEffect: function (e, t) {
        return gu(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        gu(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var l = _t();
        t = t === void 0 ? null : t;
        var n = e();
        if (An) {
          Ul(!0);
          try {
            e();
          } finally {
            Ul(!1);
          }
        }
        return ((l.memoizedState = [n, t]), n);
      },
      useReducer: function (e, t, l) {
        var n = _t();
        if (l !== void 0) {
          var u = l(t);
          if (An) {
            Ul(!0);
            try {
              l(t);
            } finally {
              Ul(!1);
            }
          }
        } else u = t;
        return (
          (n.memoizedState = n.baseState = u),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: u,
          }),
          (n.queue = e),
          (e = e.dispatch = c_.bind(null, _e, e)),
          [n.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = _t();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = Mc(e);
        var t = e.queue,
          l = $d.bind(null, _e, t);
        return ((t.dispatch = l), [e.memoizedState, l]);
      },
      useDebugValue: Oc,
      useDeferredValue: function (e, t) {
        var l = _t();
        return Dc(l, e, t);
      },
      useTransition: function () {
        var e = Mc(!1);
        return ((e = Ud.bind(null, _e, e.queue, !0, !1)), (_t().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, l) {
        var n = _e,
          u = _t();
        if (Ae) {
          if (l === void 0) throw Error(s(407));
          l = l();
        } else {
          if (((l = t()), Ye === null)) throw Error(s(349));
          (Ne & 127) !== 0 || md(n, t, l);
        }
        u.memoizedState = l;
        var c = { value: l, getSnapshot: t };
        return (
          (u.queue = c),
          jd(pd.bind(null, n, c, e), [e]),
          (n.flags |= 2048),
          ia(9, { destroy: void 0 }, hd.bind(null, n, c, l, t), null),
          l
        );
      },
      useId: function () {
        var e = _t(),
          t = Ye.identifierPrefix;
        if (Ae) {
          var l = ol,
            n = cl;
          ((l = (n & ~(1 << (32 - jt(n) - 1))).toString(32) + l),
            (t = '_' + t + 'R_' + l),
            (l = mu++),
            0 < l && (t += 'H' + l.toString(32)),
            (t += '_'));
        } else ((l = t_++), (t = '_' + t + 'r_' + l.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: Bc,
      useFormState: Td,
      useActionState: Td,
      useOptimistic: function (e) {
        var t = _t();
        t.memoizedState = t.baseState = e;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((t.queue = l), (t = Lc.bind(null, _e, !0, l)), (l.dispatch = t), [e, t]);
      },
      useMemoCache: Ac,
      useCacheRefresh: function () {
        return (_t().memoizedState = s_.bind(null, _e));
      },
      useEffectEvent: function (e) {
        var t = _t(),
          l = { impl: e };
        return (
          (t.memoizedState = l),
          function () {
            if ((we & 2) !== 0) throw Error(s(440));
            return l.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Uc = {
      readContext: ft,
      use: pu,
      useCallback: zd,
      useContext: ft,
      useEffect: wc,
      useImperativeHandle: Dd,
      useInsertionEffect: Rd,
      useLayoutEffect: wd,
      useMemo: Bd,
      useReducer: yu,
      useRef: Cd,
      useState: function () {
        return yu(El);
      },
      useDebugValue: Oc,
      useDeferredValue: function (e, t) {
        var l = Pe();
        return Ld(l, Ue.memoizedState, e, t);
      },
      useTransition: function () {
        var e = yu(El)[0],
          t = Pe().memoizedState;
        return [typeof e == 'boolean' ? e : ti(e), t];
      },
      useSyncExternalStore: dd,
      useId: Gd,
      useHostTransitionStatus: Bc,
      useFormState: Nd,
      useActionState: Nd,
      useOptimistic: function (e, t) {
        var l = Pe();
        return _d(l, Ue, e, t);
      },
      useMemoCache: Ac,
      useCacheRefresh: Yd,
    };
  Uc.useEffectEvent = Md;
  var Zd = {
    readContext: ft,
    use: pu,
    useCallback: zd,
    useContext: ft,
    useEffect: wc,
    useImperativeHandle: Dd,
    useInsertionEffect: Rd,
    useLayoutEffect: wd,
    useMemo: Bd,
    useReducer: jc,
    useRef: Cd,
    useState: function () {
      return jc(El);
    },
    useDebugValue: Oc,
    useDeferredValue: function (e, t) {
      var l = Pe();
      return Ue === null ? Dc(l, e, t) : Ld(l, Ue.memoizedState, e, t);
    },
    useTransition: function () {
      var e = jc(El)[0],
        t = Pe().memoizedState;
      return [typeof e == 'boolean' ? e : ti(e), t];
    },
    useSyncExternalStore: dd,
    useId: Gd,
    useHostTransitionStatus: Bc,
    useFormState: Ad,
    useActionState: Ad,
    useOptimistic: function (e, t) {
      var l = Pe();
      return Ue !== null ? _d(l, Ue, e, t) : ((l.baseState = e), [e, l.queue.dispatch]);
    },
    useMemoCache: Ac,
    useCacheRefresh: Yd,
  };
  Zd.useEffectEvent = Md;
  function qc(e, t, l, n) {
    ((t = e.memoizedState),
      (l = l(n, t)),
      (l = l == null ? t : b({}, t, l)),
      (e.memoizedState = l),
      e.lanes === 0 && (e.updateQueue.baseState = l));
  }
  var Hc = {
    enqueueSetState: function (e, t, l) {
      e = e._reactInternals;
      var n = Bt(),
        u = Ql(n);
      ((u.payload = t),
        l != null && (u.callback = l),
        (t = Zl(e, u, n)),
        t !== null && (kt(t, e, n), Wa(t, e, n)));
    },
    enqueueReplaceState: function (e, t, l) {
      e = e._reactInternals;
      var n = Bt(),
        u = Ql(n);
      ((u.tag = 1),
        (u.payload = t),
        l != null && (u.callback = l),
        (t = Zl(e, u, n)),
        t !== null && (kt(t, e, n), Wa(t, e, n)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var l = Bt(),
        n = Ql(l);
      ((n.tag = 2),
        t != null && (n.callback = t),
        (t = Zl(e, n, l)),
        t !== null && (kt(t, e, l), Wa(t, e, l)));
    },
  };
  function Kd(e, t, l, n, u, c, f) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(n, c, f)
        : t.prototype && t.prototype.isPureReactComponent
          ? !$a(l, n) || !$a(u, c)
          : !0
    );
  }
  function Id(e, t, l, n) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(l, n),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(l, n),
      t.state !== e && Hc.enqueueReplaceState(t, t.state, null));
  }
  function Cn(e, t) {
    var l = t;
    if ('ref' in t) {
      l = {};
      for (var n in t) n !== 'ref' && (l[n] = t[n]);
    }
    if ((e = e.defaultProps)) {
      l === t && (l = b({}, l));
      for (var u in e) l[u] === void 0 && (l[u] = e[u]);
    }
    return l;
  }
  function Jd(e) {
    Wi(e);
  }
  function Wd(e) {
    console.error(e);
  }
  function Fd(e) {
    Wi(e);
  }
  function bu(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function Pd(e, t, l) {
    try {
      var n = e.onCaughtError;
      n(l.value, { componentStack: l.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function Gc(e, t, l) {
    return (
      (l = Ql(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        bu(e, t);
      }),
      l
    );
  }
  function em(e) {
    return ((e = Ql(e)), (e.tag = 3), e);
  }
  function tm(e, t, l, n) {
    var u = l.type.getDerivedStateFromError;
    if (typeof u == 'function') {
      var c = n.value;
      ((e.payload = function () {
        return u(c);
      }),
        (e.callback = function () {
          Pd(t, l, n);
        }));
    }
    var f = l.stateNode;
    f !== null &&
      typeof f.componentDidCatch == 'function' &&
      (e.callback = function () {
        (Pd(t, l, n),
          typeof u != 'function' && (Pl === null ? (Pl = new Set([this])) : Pl.add(this)));
        var p = n.stack;
        this.componentDidCatch(n.value, { componentStack: p !== null ? p : '' });
      });
  }
  function o_(e, t, l, n, u) {
    if (((l.flags |= 32768), n !== null && typeof n == 'object' && typeof n.then == 'function')) {
      if (((t = l.alternate), t !== null && Wn(t, l, u, !0), (l = wt.current), l !== null)) {
        switch (l.tag) {
          case 31:
          case 13:
            return (
              Qt === null ? wu() : l.alternate === null && Je === 0 && (Je = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = u),
              n === su
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null ? (l.updateQueue = new Set([n])) : t.add(n),
                  mo(e, n, u)),
              !1
            );
          case 22:
            return (
              (l.flags |= 65536),
              n === su
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([n]) }),
                      (l.updateQueue = t))
                    : ((l = t.retryQueue), l === null ? (t.retryQueue = new Set([n])) : l.add(n)),
                  mo(e, n, u)),
              !1
            );
        }
        throw Error(s(435, l.tag));
      }
      return (mo(e, n, u), wu(), !1);
    }
    if (Ae)
      return (
        (t = wt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = u),
            n !== uc && ((e = Error(s(422), { cause: n })), Qa(Yt(e, l))))
          : (n !== uc && ((t = Error(s(423), { cause: n })), Qa(Yt(t, l))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (u &= -u),
            (e.lanes |= u),
            (n = Yt(n, l)),
            (u = Gc(e.stateNode, n, u)),
            gc(e, u),
            Je !== 4 && (Je = 2)),
        !1
      );
    var c = Error(s(520), { cause: n });
    if (((c = Yt(c, l)), fi === null ? (fi = [c]) : fi.push(c), Je !== 4 && (Je = 2), t === null))
      return !0;
    ((n = Yt(n, l)), (l = t));
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (e = u & -u),
            (l.lanes |= e),
            (e = Gc(l.stateNode, n, e)),
            gc(l, e),
            !1
          );
        case 1:
          if (
            ((t = l.type),
            (c = l.stateNode),
            (l.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == 'function' ||
                (c !== null &&
                  typeof c.componentDidCatch == 'function' &&
                  (Pl === null || !Pl.has(c)))))
          )
            return (
              (l.flags |= 65536),
              (u &= -u),
              (l.lanes |= u),
              (u = em(u)),
              tm(u, e, l, n),
              gc(l, u),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Yc = Error(s(461)),
    nt = !1;
  function dt(e, t, l, n) {
    t.child = e === null ? id(t, null, l, n) : kn(t, e.child, l, n);
  }
  function lm(e, t, l, n, u) {
    l = l.render;
    var c = t.ref;
    if ('ref' in n) {
      var f = {};
      for (var p in n) p !== 'ref' && (f[p] = n[p]);
    } else f = n;
    return (
      xn(t),
      (n = Ec(e, t, l, f, c, u)),
      (p = Tc()),
      e !== null && !nt
        ? (Nc(e, t, u), Tl(e, t, u))
        : (Ae && p && ac(t), (t.flags |= 1), dt(e, t, n, u), t.child)
    );
  }
  function nm(e, t, l, n, u) {
    if (e === null) {
      var c = l.type;
      return typeof c == 'function' && !tc(c) && c.defaultProps === void 0 && l.compare === null
        ? ((t.tag = 15), (t.type = c), am(e, t, c, n, u))
        : ((e = tu(l.type, null, n, t, t.mode, u)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((c = e.child), !Jc(e, u))) {
      var f = c.memoizedProps;
      if (((l = l.compare), (l = l !== null ? l : $a), l(f, n) && e.ref === t.ref))
        return Tl(e, t, u);
    }
    return ((t.flags |= 1), (e = _l(c, n)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function am(e, t, l, n, u) {
    if (e !== null) {
      var c = e.memoizedProps;
      if ($a(c, n) && e.ref === t.ref)
        if (((nt = !1), (t.pendingProps = n = c), Jc(e, u))) (e.flags & 131072) !== 0 && (nt = !0);
        else return ((t.lanes = e.lanes), Tl(e, t, u));
    }
    return $c(e, t, l, n, u);
  }
  function im(e, t, l, n) {
    var u = n.children,
      c = e !== null ? e.memoizedState : null;
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
        if (((c = c !== null ? c.baseLanes | l : l), e !== null)) {
          for (n = t.child = e.child, u = 0; n !== null; )
            ((u = u | n.lanes | n.childLanes), (n = n.sibling));
          n = u & ~c;
        } else ((n = 0), (t.child = null));
        return um(e, t, c, l, n);
      }
      if ((l & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && iu(t, c !== null ? c.cachePool : null),
          c !== null ? cd(t, c) : vc(),
          od(t));
      else return ((n = t.lanes = 536870912), um(e, t, c !== null ? c.baseLanes | l : l, l, n));
    } else
      c !== null
        ? (iu(t, c.cachePool), cd(t, c), Il(), (t.memoizedState = null))
        : (e !== null && iu(t, null), vc(), Il());
    return (dt(e, t, u, l), t.child);
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
  function um(e, t, l, n, u) {
    var c = mc();
    return (
      (c = c === null ? null : { parent: tt._currentValue, pool: c }),
      (t.memoizedState = { baseLanes: l, cachePool: c }),
      e !== null && iu(t, null),
      vc(),
      od(t),
      e !== null && Wn(e, t, n, !0),
      (t.childLanes = u),
      null
    );
  }
  function Su(e, t) {
    return (
      (t = Eu({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function sm(e, t, l) {
    return (
      kn(t, e.child, null, l),
      (e = Su(t, t.pendingProps)),
      (e.flags |= 2),
      Ot(t),
      (t.memoizedState = null),
      e
    );
  }
  function r_(e, t, l) {
    var n = t.pendingProps,
      u = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (Ae) {
        if (n.mode === 'hidden') return ((e = Su(t, n)), (t.lanes = 536870912), ai(null, e));
        if (
          (Sc(t),
          (e = $e)
            ? ((e = vh(e, Vt)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Gl !== null ? { id: cl, overflow: ol } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Xf(e)),
                (l.return = t),
                (t.child = l),
                (rt = t),
                ($e = null)))
            : (e = null),
          e === null)
        )
          throw $l(t);
        return ((t.lanes = 536870912), null);
      }
      return Su(t, n);
    }
    var c = e.memoizedState;
    if (c !== null) {
      var f = c.dehydrated;
      if ((Sc(t), u))
        if (t.flags & 256) ((t.flags &= -257), (t = sm(e, t, l)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(s(558));
      else if ((nt || Wn(e, t, l, !1), (u = (l & e.childLanes) !== 0), nt || u)) {
        if (((n = Ye), n !== null && ((f = Jr(n, l)), f !== 0 && f !== c.retryLane)))
          throw ((c.retryLane = f), _n(e, f), kt(n, e, f), Yc);
        (wu(), (t = sm(e, t, l)));
      } else
        ((e = c.treeContext),
          ($e = Zt(f.nextSibling)),
          (rt = t),
          (Ae = !0),
          (Yl = null),
          (Vt = !1),
          e !== null && Zf(t, e),
          (t = Su(t, n)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = _l(e.child, { mode: n.mode, children: n.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function xu(e, t) {
    var l = t.ref;
    if (l === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != 'function' && typeof l != 'object') throw Error(s(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function $c(e, t, l, n, u) {
    return (
      xn(t),
      (l = Ec(e, t, l, n, void 0, u)),
      (n = Tc()),
      e !== null && !nt
        ? (Nc(e, t, u), Tl(e, t, u))
        : (Ae && n && ac(t), (t.flags |= 1), dt(e, t, l, u), t.child)
    );
  }
  function cm(e, t, l, n, u, c) {
    return (
      xn(t),
      (t.updateQueue = null),
      (l = fd(t, n, l, u)),
      rd(e),
      (n = Tc()),
      e !== null && !nt
        ? (Nc(e, t, c), Tl(e, t, c))
        : (Ae && n && ac(t), (t.flags |= 1), dt(e, t, l, c), t.child)
    );
  }
  function om(e, t, l, n, u) {
    if ((xn(t), t.stateNode === null)) {
      var c = Zn,
        f = l.contextType;
      (typeof f == 'object' && f !== null && (c = ft(f)),
        (c = new l(n, c)),
        (t.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null),
        (c.updater = Hc),
        (t.stateNode = c),
        (c._reactInternals = t),
        (c = t.stateNode),
        (c.props = n),
        (c.state = t.memoizedState),
        (c.refs = {}),
        pc(t),
        (f = l.contextType),
        (c.context = typeof f == 'object' && f !== null ? ft(f) : Zn),
        (c.state = t.memoizedState),
        (f = l.getDerivedStateFromProps),
        typeof f == 'function' && (qc(t, l, f, n), (c.state = t.memoizedState)),
        typeof l.getDerivedStateFromProps == 'function' ||
          typeof c.getSnapshotBeforeUpdate == 'function' ||
          (typeof c.UNSAFE_componentWillMount != 'function' &&
            typeof c.componentWillMount != 'function') ||
          ((f = c.state),
          typeof c.componentWillMount == 'function' && c.componentWillMount(),
          typeof c.UNSAFE_componentWillMount == 'function' && c.UNSAFE_componentWillMount(),
          f !== c.state && Hc.enqueueReplaceState(c, c.state, null),
          Pa(t, n, c, u),
          Fa(),
          (c.state = t.memoizedState)),
        typeof c.componentDidMount == 'function' && (t.flags |= 4194308),
        (n = !0));
    } else if (e === null) {
      c = t.stateNode;
      var p = t.memoizedProps,
        E = Cn(l, p);
      c.props = E;
      var D = c.context,
        q = l.contextType;
      ((f = Zn), typeof q == 'object' && q !== null && (f = ft(q)));
      var X = l.getDerivedStateFromProps;
      ((q = typeof X == 'function' || typeof c.getSnapshotBeforeUpdate == 'function'),
        (p = t.pendingProps !== p),
        q ||
          (typeof c.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof c.componentWillReceiveProps != 'function') ||
          ((p || D !== f) && Id(t, c, n, f)),
        (Vl = !1));
      var z = t.memoizedState;
      ((c.state = z),
        Pa(t, n, c, u),
        Fa(),
        (D = t.memoizedState),
        p || z !== D || Vl
          ? (typeof X == 'function' && (qc(t, l, X, n), (D = t.memoizedState)),
            (E = Vl || Kd(t, l, E, n, z, D, f))
              ? (q ||
                  (typeof c.UNSAFE_componentWillMount != 'function' &&
                    typeof c.componentWillMount != 'function') ||
                  (typeof c.componentWillMount == 'function' && c.componentWillMount(),
                  typeof c.UNSAFE_componentWillMount == 'function' &&
                    c.UNSAFE_componentWillMount()),
                typeof c.componentDidMount == 'function' && (t.flags |= 4194308))
              : (typeof c.componentDidMount == 'function' && (t.flags |= 4194308),
                (t.memoizedProps = n),
                (t.memoizedState = D)),
            (c.props = n),
            (c.state = D),
            (c.context = f),
            (n = E))
          : (typeof c.componentDidMount == 'function' && (t.flags |= 4194308), (n = !1)));
    } else {
      ((c = t.stateNode),
        yc(e, t),
        (f = t.memoizedProps),
        (q = Cn(l, f)),
        (c.props = q),
        (X = t.pendingProps),
        (z = c.context),
        (D = l.contextType),
        (E = Zn),
        typeof D == 'object' && D !== null && (E = ft(D)),
        (p = l.getDerivedStateFromProps),
        (D = typeof p == 'function' || typeof c.getSnapshotBeforeUpdate == 'function') ||
          (typeof c.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof c.componentWillReceiveProps != 'function') ||
          ((f !== X || z !== E) && Id(t, c, n, E)),
        (Vl = !1),
        (z = t.memoizedState),
        (c.state = z),
        Pa(t, n, c, u),
        Fa());
      var B = t.memoizedState;
      f !== X || z !== B || Vl || (e !== null && e.dependencies !== null && nu(e.dependencies))
        ? (typeof p == 'function' && (qc(t, l, p, n), (B = t.memoizedState)),
          (q =
            Vl ||
            Kd(t, l, q, n, z, B, E) ||
            (e !== null && e.dependencies !== null && nu(e.dependencies)))
            ? (D ||
                (typeof c.UNSAFE_componentWillUpdate != 'function' &&
                  typeof c.componentWillUpdate != 'function') ||
                (typeof c.componentWillUpdate == 'function' && c.componentWillUpdate(n, B, E),
                typeof c.UNSAFE_componentWillUpdate == 'function' &&
                  c.UNSAFE_componentWillUpdate(n, B, E)),
              typeof c.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof c.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof c.componentDidUpdate != 'function' ||
                (f === e.memoizedProps && z === e.memoizedState) ||
                (t.flags |= 4),
              typeof c.getSnapshotBeforeUpdate != 'function' ||
                (f === e.memoizedProps && z === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = n),
              (t.memoizedState = B)),
          (c.props = n),
          (c.state = B),
          (c.context = E),
          (n = q))
        : (typeof c.componentDidUpdate != 'function' ||
            (f === e.memoizedProps && z === e.memoizedState) ||
            (t.flags |= 4),
          typeof c.getSnapshotBeforeUpdate != 'function' ||
            (f === e.memoizedProps && z === e.memoizedState) ||
            (t.flags |= 1024),
          (n = !1));
    }
    return (
      (c = n),
      xu(e, t),
      (n = (t.flags & 128) !== 0),
      c || n
        ? ((c = t.stateNode),
          (l = n && typeof l.getDerivedStateFromError != 'function' ? null : c.render()),
          (t.flags |= 1),
          e !== null && n
            ? ((t.child = kn(t, e.child, null, u)), (t.child = kn(t, null, l, u)))
            : dt(e, t, l, u),
          (t.memoizedState = c.state),
          (e = t.child))
        : (e = Tl(e, t, u)),
      e
    );
  }
  function rm(e, t, l, n) {
    return (bn(), (t.flags |= 256), dt(e, t, l, n), t.child);
  }
  var Xc = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Vc(e) {
    return { baseLanes: e, cachePool: Pf() };
  }
  function Qc(e, t, l) {
    return ((e = e !== null ? e.childLanes & ~l : 0), t && (e |= zt), e);
  }
  function fm(e, t, l) {
    var n = t.pendingProps,
      u = !1,
      c = (t.flags & 128) !== 0,
      f;
    if (
      ((f = c) || (f = e !== null && e.memoizedState === null ? !1 : (Fe.current & 2) !== 0),
      f && ((u = !0), (t.flags &= -129)),
      (f = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (Ae) {
        if (
          (u ? Kl(t) : Il(),
          (e = $e)
            ? ((e = vh(e, Vt)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Gl !== null ? { id: cl, overflow: ol } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Xf(e)),
                (l.return = t),
                (t.child = l),
                (rt = t),
                ($e = null)))
            : (e = null),
          e === null)
        )
          throw $l(t);
        return (jo(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var p = n.children;
      return (
        (n = n.fallback),
        u
          ? (Il(),
            (u = t.mode),
            (p = Eu({ mode: 'hidden', children: p }, u)),
            (n = vn(n, u, l, null)),
            (p.return = t),
            (n.return = t),
            (p.sibling = n),
            (t.child = p),
            (n = t.child),
            (n.memoizedState = Vc(l)),
            (n.childLanes = Qc(e, f, l)),
            (t.memoizedState = Xc),
            ai(null, n))
          : (Kl(t), Zc(t, p))
      );
    }
    var E = e.memoizedState;
    if (E !== null && ((p = E.dehydrated), p !== null)) {
      if (c)
        t.flags & 256
          ? (Kl(t), (t.flags &= -257), (t = Kc(e, t, l)))
          : t.memoizedState !== null
            ? (Il(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (Il(),
              (p = n.fallback),
              (u = t.mode),
              (n = Eu({ mode: 'visible', children: n.children }, u)),
              (p = vn(p, u, l, null)),
              (p.flags |= 2),
              (n.return = t),
              (p.return = t),
              (n.sibling = p),
              (t.child = n),
              kn(t, e.child, null, l),
              (n = t.child),
              (n.memoizedState = Vc(l)),
              (n.childLanes = Qc(e, f, l)),
              (t.memoizedState = Xc),
              (t = ai(null, n)));
      else if ((Kl(t), jo(p))) {
        if (((f = p.nextSibling && p.nextSibling.dataset), f)) var D = f.dgst;
        ((f = D),
          (n = Error(s(419))),
          (n.stack = ''),
          (n.digest = f),
          Qa({ value: n, source: null, stack: null }),
          (t = Kc(e, t, l)));
      } else if ((nt || Wn(e, t, l, !1), (f = (l & e.childLanes) !== 0), nt || f)) {
        if (((f = Ye), f !== null && ((n = Jr(f, l)), n !== 0 && n !== E.retryLane)))
          throw ((E.retryLane = n), _n(e, n), kt(f, e, n), Yc);
        (Co(p) || wu(), (t = Kc(e, t, l)));
      } else
        Co(p)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = E.treeContext),
            ($e = Zt(p.nextSibling)),
            (rt = t),
            (Ae = !0),
            (Yl = null),
            (Vt = !1),
            e !== null && Zf(t, e),
            (t = Zc(t, n.children)),
            (t.flags |= 4096));
      return t;
    }
    return u
      ? (Il(),
        (p = n.fallback),
        (u = t.mode),
        (E = e.child),
        (D = E.sibling),
        (n = _l(E, { mode: 'hidden', children: n.children })),
        (n.subtreeFlags = E.subtreeFlags & 65011712),
        D !== null ? (p = _l(D, p)) : ((p = vn(p, u, l, null)), (p.flags |= 2)),
        (p.return = t),
        (n.return = t),
        (n.sibling = p),
        (t.child = n),
        ai(null, n),
        (n = t.child),
        (p = e.child.memoizedState),
        p === null
          ? (p = Vc(l))
          : ((u = p.cachePool),
            u !== null
              ? ((E = tt._currentValue), (u = u.parent !== E ? { parent: E, pool: E } : u))
              : (u = Pf()),
            (p = { baseLanes: p.baseLanes | l, cachePool: u })),
        (n.memoizedState = p),
        (n.childLanes = Qc(e, f, l)),
        (t.memoizedState = Xc),
        ai(e.child, n))
      : (Kl(t),
        (l = e.child),
        (e = l.sibling),
        (l = _l(l, { mode: 'visible', children: n.children })),
        (l.return = t),
        (l.sibling = null),
        e !== null &&
          ((f = t.deletions), f === null ? ((t.deletions = [e]), (t.flags |= 16)) : f.push(e)),
        (t.child = l),
        (t.memoizedState = null),
        l);
  }
  function Zc(e, t) {
    return ((t = Eu({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function Eu(e, t) {
    return ((e = Rt(22, e, null, t)), (e.lanes = 0), e);
  }
  function Kc(e, t, l) {
    return (
      kn(t, e.child, null, l),
      (e = Zc(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function dm(e, t, l) {
    e.lanes |= t;
    var n = e.alternate;
    (n !== null && (n.lanes |= t), oc(e.return, t, l));
  }
  function Ic(e, t, l, n, u, c) {
    var f = e.memoizedState;
    f === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: n,
          tail: l,
          tailMode: u,
          treeForkCount: c,
        })
      : ((f.isBackwards = t),
        (f.rendering = null),
        (f.renderingStartTime = 0),
        (f.last = n),
        (f.tail = l),
        (f.tailMode = u),
        (f.treeForkCount = c));
  }
  function mm(e, t, l) {
    var n = t.pendingProps,
      u = n.revealOrder,
      c = n.tail;
    n = n.children;
    var f = Fe.current,
      p = (f & 2) !== 0;
    if (
      (p ? ((f = (f & 1) | 2), (t.flags |= 128)) : (f &= 1),
      W(Fe, f),
      dt(e, t, n, l),
      (n = Ae ? Va : 0),
      !p && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && dm(e, l, t);
        else if (e.tag === 19) dm(e, l, t);
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
    switch (u) {
      case 'forwards':
        for (l = t.child, u = null; l !== null; )
          ((e = l.alternate), e !== null && fu(e) === null && (u = l), (l = l.sibling));
        ((l = u),
          l === null ? ((u = t.child), (t.child = null)) : ((u = l.sibling), (l.sibling = null)),
          Ic(t, !1, u, l, c, n));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (l = null, u = t.child, t.child = null; u !== null; ) {
          if (((e = u.alternate), e !== null && fu(e) === null)) {
            t.child = u;
            break;
          }
          ((e = u.sibling), (u.sibling = l), (l = u), (u = e));
        }
        Ic(t, !0, l, null, c, n);
        break;
      case 'together':
        Ic(t, !1, null, null, void 0, n);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Tl(e, t, l) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (Fl |= t.lanes), (l & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((Wn(e, t, l, !1), (l & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(s(153));
    if (t.child !== null) {
      for (e = t.child, l = _l(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        ((e = e.sibling), (l = l.sibling = _l(e, e.pendingProps)), (l.return = t));
      l.sibling = null;
    }
    return t.child;
  }
  function Jc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && nu(e)));
  }
  function f_(e, t, l) {
    switch (t.tag) {
      case 3:
        (ut(t, t.stateNode.containerInfo), Xl(t, tt, e.memoizedState.cache), bn());
        break;
      case 27:
      case 5:
        Y(t);
        break;
      case 4:
        ut(t, t.stateNode.containerInfo);
        break;
      case 10:
        Xl(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), Sc(t), null);
        break;
      case 13:
        var n = t.memoizedState;
        if (n !== null)
          return n.dehydrated !== null
            ? (Kl(t), (t.flags |= 128), null)
            : (l & t.child.childLanes) !== 0
              ? fm(e, t, l)
              : (Kl(t), (e = Tl(e, t, l)), e !== null ? e.sibling : null);
        Kl(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (
          ((n = (l & t.childLanes) !== 0),
          n || (Wn(e, t, l, !1), (n = (l & t.childLanes) !== 0)),
          u)
        ) {
          if (n) return mm(e, t, l);
          t.flags |= 128;
        }
        if (
          ((u = t.memoizedState),
          u !== null && ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          W(Fe, Fe.current),
          n)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), im(e, t, l, t.pendingProps));
      case 24:
        Xl(t, tt, e.memoizedState.cache);
    }
    return Tl(e, t, l);
  }
  function hm(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) nt = !0;
      else {
        if (!Jc(e, l) && (t.flags & 128) === 0) return ((nt = !1), f_(e, t, l));
        nt = (e.flags & 131072) !== 0;
      }
    else ((nt = !1), Ae && (t.flags & 1048576) !== 0 && Qf(t, Va, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var n = t.pendingProps;
          if (((e = Tn(t.elementType)), (t.type = e), typeof e == 'function'))
            tc(e)
              ? ((n = Cn(e, n)), (t.tag = 1), (t = om(null, t, e, n, l)))
              : ((t.tag = 0), (t = $c(null, t, e, n, l)));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === P) {
                ((t.tag = 11), (t = lm(null, t, e, n, l)));
                break e;
              } else if (u === H) {
                ((t.tag = 14), (t = nm(null, t, e, n, l)));
                break e;
              }
            }
            throw ((t = J(e) || e), Error(s(306, t, '')));
          }
        }
        return t;
      case 0:
        return $c(e, t, t.type, t.pendingProps, l);
      case 1:
        return ((n = t.type), (u = Cn(n, t.pendingProps)), om(e, t, n, u, l));
      case 3:
        e: {
          if ((ut(t, t.stateNode.containerInfo), e === null)) throw Error(s(387));
          n = t.pendingProps;
          var c = t.memoizedState;
          ((u = c.element), yc(e, t), Pa(t, n, null, l));
          var f = t.memoizedState;
          if (
            ((n = f.cache),
            Xl(t, tt, n),
            n !== c.cache && rc(t, [tt], l, !0),
            Fa(),
            (n = f.element),
            c.isDehydrated)
          )
            if (
              ((c = { element: n, isDehydrated: !1, cache: f.cache }),
              (t.updateQueue.baseState = c),
              (t.memoizedState = c),
              t.flags & 256)
            ) {
              t = rm(e, t, n, l);
              break e;
            } else if (n !== u) {
              ((u = Yt(Error(s(424)), t)), Qa(u), (t = rm(e, t, n, l)));
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
                $e = Zt(e.firstChild),
                  rt = t,
                  Ae = !0,
                  Yl = null,
                  Vt = !0,
                  l = id(t, null, n, l),
                  t.child = l;
                l;
              )
                ((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
            }
          else {
            if ((bn(), n === u)) {
              t = Tl(e, t, l);
              break e;
            }
            dt(e, t, n, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          xu(e, t),
          e === null
            ? (l = Nh(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = l)
              : Ae ||
                ((l = t.type),
                (e = t.pendingProps),
                (n = qu(be.current).createElement(l)),
                (n[ot] = t),
                (n[bt] = e),
                mt(n, l, e),
                st(n),
                (t.stateNode = n))
            : (t.memoizedState = Nh(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          Y(t),
          e === null &&
            Ae &&
            ((n = t.stateNode = xh(t.type, t.pendingProps, be.current)),
            (rt = t),
            (Vt = !0),
            (u = $e),
            nn(t.type) ? ((Mo = u), ($e = Zt(n.firstChild))) : ($e = u)),
          dt(e, t, t.pendingProps.children, l),
          xu(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            Ae &&
            ((u = n = $e) &&
              ((n = G_(n, t.type, t.pendingProps, Vt)),
              n !== null
                ? ((t.stateNode = n), (rt = t), ($e = Zt(n.firstChild)), (Vt = !1), (u = !0))
                : (u = !1)),
            u || $l(t)),
          Y(t),
          (u = t.type),
          (c = t.pendingProps),
          (f = e !== null ? e.memoizedProps : null),
          (n = c.children),
          No(u, c) ? (n = null) : f !== null && No(u, f) && (t.flags |= 32),
          t.memoizedState !== null && ((u = Ec(e, t, l_, null, null, l)), (vi._currentValue = u)),
          xu(e, t),
          dt(e, t, n, l),
          t.child
        );
      case 6:
        return (
          e === null &&
            Ae &&
            ((e = l = $e) &&
              ((l = Y_(l, t.pendingProps, Vt)),
              l !== null ? ((t.stateNode = l), (rt = t), ($e = null), (e = !0)) : (e = !1)),
            e || $l(t)),
          null
        );
      case 13:
        return fm(e, t, l);
      case 4:
        return (
          ut(t, t.stateNode.containerInfo),
          (n = t.pendingProps),
          e === null ? (t.child = kn(t, null, n, l)) : dt(e, t, n, l),
          t.child
        );
      case 11:
        return lm(e, t, t.type, t.pendingProps, l);
      case 7:
        return (dt(e, t, t.pendingProps, l), t.child);
      case 8:
        return (dt(e, t, t.pendingProps.children, l), t.child);
      case 12:
        return (dt(e, t, t.pendingProps.children, l), t.child);
      case 10:
        return ((n = t.pendingProps), Xl(t, t.type, n.value), dt(e, t, n.children, l), t.child);
      case 9:
        return (
          (u = t.type._context),
          (n = t.pendingProps.children),
          xn(t),
          (u = ft(u)),
          (n = n(u)),
          (t.flags |= 1),
          dt(e, t, n, l),
          t.child
        );
      case 14:
        return nm(e, t, t.type, t.pendingProps, l);
      case 15:
        return am(e, t, t.type, t.pendingProps, l);
      case 19:
        return mm(e, t, l);
      case 31:
        return r_(e, t, l);
      case 22:
        return im(e, t, l, t.pendingProps);
      case 24:
        return (
          xn(t),
          (n = ft(tt)),
          e === null
            ? ((u = mc()),
              u === null &&
                ((u = Ye),
                (c = fc()),
                (u.pooledCache = c),
                c.refCount++,
                c !== null && (u.pooledCacheLanes |= l),
                (u = c)),
              (t.memoizedState = { parent: n, cache: u }),
              pc(t),
              Xl(t, tt, u))
            : ((e.lanes & l) !== 0 && (yc(e, t), Pa(t, null, null, l), Fa()),
              (u = e.memoizedState),
              (c = t.memoizedState),
              u.parent !== n
                ? ((u = { parent: n, cache: n }),
                  (t.memoizedState = u),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u),
                  Xl(t, tt, n))
                : ((n = c.cache), Xl(t, tt, n), n !== u.cache && rc(t, [tt], l, !0))),
          dt(e, t, t.pendingProps.children, l),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(s(156, t.tag));
  }
  function Nl(e) {
    e.flags |= 4;
  }
  function Wc(e, t, l, n, u) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (u & 335544128) === u))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Gm()) e.flags |= 8192;
        else throw ((Nn = su), hc);
    } else e.flags &= -16777217;
  }
  function pm(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !Mh(t)))
      if (Gm()) e.flags |= 8192;
      else throw ((Nn = su), hc);
  }
  function Tu(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? Zr() : 536870912), (e.lanes |= t), (oa |= t)));
  }
  function ii(e, t) {
    if (!Ae)
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
  function Xe(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      l = 0,
      n = 0;
    if (t)
      for (var u = e.child; u !== null; )
        ((l |= u.lanes | u.childLanes),
          (n |= u.subtreeFlags & 65011712),
          (n |= u.flags & 65011712),
          (u.return = e),
          (u = u.sibling));
    else
      for (u = e.child; u !== null; )
        ((l |= u.lanes | u.childLanes),
          (n |= u.subtreeFlags),
          (n |= u.flags),
          (u.return = e),
          (u = u.sibling));
    return ((e.subtreeFlags |= n), (e.childLanes = l), t);
  }
  function d_(e, t, l) {
    var n = t.pendingProps;
    switch ((ic(t), t.tag)) {
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
          (l = t.stateNode),
          (n = null),
          e !== null && (n = e.memoizedState.cache),
          t.memoizedState.cache !== n && (t.flags |= 2048),
          Sl(tt),
          Ve(),
          l.pendingContext && ((l.context = l.pendingContext), (l.pendingContext = null)),
          (e === null || e.child === null) &&
            (Jn(t)
              ? Nl(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), sc())),
          Xe(t),
          null
        );
      case 26:
        var u = t.type,
          c = t.memoizedState;
        return (
          e === null
            ? (Nl(t), c !== null ? (Xe(t), pm(t, c)) : (Xe(t), Wc(t, u, null, n, l)))
            : c
              ? c !== e.memoizedState
                ? (Nl(t), Xe(t), pm(t, c))
                : (Xe(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== n && Nl(t), Xe(t), Wc(t, u, e, n, l)),
          null
        );
      case 27:
        if ((oe(t), (l = be.current), (u = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && Nl(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(s(166));
            return (Xe(t), null);
          }
          ((e = le.current), Jn(t) ? Kf(t) : ((e = xh(u, n, l)), (t.stateNode = e), Nl(t)));
        }
        return (Xe(t), null);
      case 5:
        if ((oe(t), (u = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && Nl(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(s(166));
            return (Xe(t), null);
          }
          if (((c = le.current), Jn(t))) Kf(t);
          else {
            var f = qu(be.current);
            switch (c) {
              case 1:
                c = f.createElementNS('http://www.w3.org/2000/svg', u);
                break;
              case 2:
                c = f.createElementNS('http://www.w3.org/1998/Math/MathML', u);
                break;
              default:
                switch (u) {
                  case 'svg':
                    c = f.createElementNS('http://www.w3.org/2000/svg', u);
                    break;
                  case 'math':
                    c = f.createElementNS('http://www.w3.org/1998/Math/MathML', u);
                    break;
                  case 'script':
                    ((c = f.createElement('div')),
                      (c.innerHTML = '<script><\/script>'),
                      (c = c.removeChild(c.firstChild)));
                    break;
                  case 'select':
                    ((c =
                      typeof n.is == 'string'
                        ? f.createElement('select', { is: n.is })
                        : f.createElement('select')),
                      n.multiple ? (c.multiple = !0) : n.size && (c.size = n.size));
                    break;
                  default:
                    c =
                      typeof n.is == 'string'
                        ? f.createElement(u, { is: n.is })
                        : f.createElement(u);
                }
            }
            ((c[ot] = t), (c[bt] = n));
            e: for (f = t.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6) c.appendChild(f.stateNode);
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
            t.stateNode = c;
            e: switch ((mt(c, u, n), u)) {
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
            n && Nl(t);
          }
        }
        return (Xe(t), Wc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, l), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== n && Nl(t);
        else {
          if (typeof n != 'string' && t.stateNode === null) throw Error(s(166));
          if (((e = be.current), Jn(t))) {
            if (((e = t.stateNode), (l = t.memoizedProps), (n = null), (u = rt), u !== null))
              switch (u.tag) {
                case 27:
                case 5:
                  n = u.memoizedProps;
              }
            ((e[ot] = t),
              (e = !!(
                e.nodeValue === l ||
                (n !== null && n.suppressHydrationWarning === !0) ||
                fh(e.nodeValue, l)
              )),
              e || $l(t, !0));
          } else ((e = qu(e).createTextNode(n)), (e[ot] = t), (t.stateNode = e));
        }
        return (Xe(t), null);
      case 31:
        if (((l = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((n = Jn(t)), l !== null)) {
            if (e === null) {
              if (!n) throw Error(s(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(s(557));
              e[ot] = t;
            } else (bn(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Xe(t), (e = !1));
          } else
            ((l = sc()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l),
              (e = !0));
          if (!e) return t.flags & 256 ? (Ot(t), t) : (Ot(t), null);
          if ((t.flags & 128) !== 0) throw Error(s(558));
        }
        return (Xe(t), null);
      case 13:
        if (
          ((n = t.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((u = Jn(t)), n !== null && n.dehydrated !== null)) {
            if (e === null) {
              if (!u) throw Error(s(318));
              if (((u = t.memoizedState), (u = u !== null ? u.dehydrated : null), !u))
                throw Error(s(317));
              u[ot] = t;
            } else (bn(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Xe(t), (u = !1));
          } else
            ((u = sc()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u),
              (u = !0));
          if (!u) return t.flags & 256 ? (Ot(t), t) : (Ot(t), null);
        }
        return (
          Ot(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = l), t)
            : ((l = n !== null),
              (e = e !== null && e.memoizedState !== null),
              l &&
                ((n = t.child),
                (u = null),
                n.alternate !== null &&
                  n.alternate.memoizedState !== null &&
                  n.alternate.memoizedState.cachePool !== null &&
                  (u = n.alternate.memoizedState.cachePool.pool),
                (c = null),
                n.memoizedState !== null &&
                  n.memoizedState.cachePool !== null &&
                  (c = n.memoizedState.cachePool.pool),
                c !== u && (n.flags |= 2048)),
              l !== e && l && (t.child.flags |= 8192),
              Tu(t, t.updateQueue),
              Xe(t),
              null)
        );
      case 4:
        return (Ve(), e === null && bo(t.stateNode.containerInfo), Xe(t), null);
      case 10:
        return (Sl(t.type), Xe(t), null);
      case 19:
        if ((G(Fe), (n = t.memoizedState), n === null)) return (Xe(t), null);
        if (((u = (t.flags & 128) !== 0), (c = n.rendering), c === null))
          if (u) ii(n, !1);
          else {
            if (Je !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((c = fu(e)), c !== null)) {
                  for (
                    t.flags |= 128,
                      ii(n, !1),
                      e = c.updateQueue,
                      t.updateQueue = e,
                      Tu(t, e),
                      t.subtreeFlags = 0,
                      e = l,
                      l = t.child;
                    l !== null;
                  )
                    ($f(l, e), (l = l.sibling));
                  return (W(Fe, (Fe.current & 1) | 2), Ae && vl(t, n.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            n.tail !== null &&
              At() > ju &&
              ((t.flags |= 128), (u = !0), ii(n, !1), (t.lanes = 4194304));
          }
        else {
          if (!u)
            if (((e = fu(c)), e !== null)) {
              if (
                ((t.flags |= 128),
                (u = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Tu(t, e),
                ii(n, !0),
                n.tail === null && n.tailMode === 'hidden' && !c.alternate && !Ae)
              )
                return (Xe(t), null);
            } else
              2 * At() - n.renderingStartTime > ju &&
                l !== 536870912 &&
                ((t.flags |= 128), (u = !0), ii(n, !1), (t.lanes = 4194304));
          n.isBackwards
            ? ((c.sibling = t.child), (t.child = c))
            : ((e = n.last), e !== null ? (e.sibling = c) : (t.child = c), (n.last = c));
        }
        return n.tail !== null
          ? ((e = n.tail),
            (n.rendering = e),
            (n.tail = e.sibling),
            (n.renderingStartTime = At()),
            (e.sibling = null),
            (l = Fe.current),
            W(Fe, u ? (l & 1) | 2 : l & 1),
            Ae && vl(t, n.treeForkCount),
            e)
          : (Xe(t), null);
      case 22:
      case 23:
        return (
          Ot(t),
          bc(),
          (n = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== n && (t.flags |= 8192)
            : n && (t.flags |= 8192),
          n
            ? (l & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Xe(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Xe(t),
          (l = t.updateQueue),
          l !== null && Tu(t, l.retryQueue),
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
          e !== null && G(En),
          null
        );
      case 24:
        return (
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          t.memoizedState.cache !== l && (t.flags |= 2048),
          Sl(tt),
          Xe(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function m_(e, t) {
    switch ((ic(t), t.tag)) {
      case 1:
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 3:
        return (
          Sl(tt),
          Ve(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 26:
      case 27:
      case 5:
        return (oe(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((Ot(t), t.alternate === null)) throw Error(s(340));
          bn();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((Ot(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(s(340));
          bn();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (G(Fe), null);
      case 4:
        return (Ve(), null);
      case 10:
        return (Sl(t.type), null);
      case 22:
      case 23:
        return (
          Ot(t),
          bc(),
          e !== null && G(En),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (Sl(tt), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function ym(e, t) {
    switch ((ic(t), t.tag)) {
      case 3:
        (Sl(tt), Ve());
        break;
      case 26:
      case 27:
      case 5:
        oe(t);
        break;
      case 4:
        Ve();
        break;
      case 31:
        t.memoizedState !== null && Ot(t);
        break;
      case 13:
        Ot(t);
        break;
      case 19:
        G(Fe);
        break;
      case 10:
        Sl(t.type);
        break;
      case 22:
      case 23:
        (Ot(t), bc(), e !== null && G(En));
        break;
      case 24:
        Sl(tt);
    }
  }
  function ui(e, t) {
    try {
      var l = t.updateQueue,
        n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        l = u;
        do {
          if ((l.tag & e) === e) {
            n = void 0;
            var c = l.create,
              f = l.inst;
            ((n = c()), (f.destroy = n));
          }
          l = l.next;
        } while (l !== u);
      }
    } catch (p) {
      Be(t, t.return, p);
    }
  }
  function Jl(e, t, l) {
    try {
      var n = t.updateQueue,
        u = n !== null ? n.lastEffect : null;
      if (u !== null) {
        var c = u.next;
        n = c;
        do {
          if ((n.tag & e) === e) {
            var f = n.inst,
              p = f.destroy;
            if (p !== void 0) {
              ((f.destroy = void 0), (u = t));
              var E = l,
                D = p;
              try {
                D();
              } catch (q) {
                Be(u, E, q);
              }
            }
          }
          n = n.next;
        } while (n !== c);
      }
    } catch (q) {
      Be(t, t.return, q);
    }
  }
  function gm(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        sd(t, l);
      } catch (n) {
        Be(e, e.return, n);
      }
    }
  }
  function _m(e, t, l) {
    ((l.props = Cn(e.type, e.memoizedProps)), (l.state = e.memoizedState));
    try {
      l.componentWillUnmount();
    } catch (n) {
      Be(e, t, n);
    }
  }
  function si(e, t) {
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
    } catch (u) {
      Be(e, t, u);
    }
  }
  function rl(e, t) {
    var l = e.ref,
      n = e.refCleanup;
    if (l !== null)
      if (typeof n == 'function')
        try {
          n();
        } catch (u) {
          Be(e, t, u);
        } finally {
          ((e.refCleanup = null), (e = e.alternate), e != null && (e.refCleanup = null));
        }
      else if (typeof l == 'function')
        try {
          l(null);
        } catch (u) {
          Be(e, t, u);
        }
      else l.current = null;
  }
  function vm(e) {
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
    } catch (u) {
      Be(e, e.return, u);
    }
  }
  function Fc(e, t, l) {
    try {
      var n = e.stateNode;
      (z_(n, e.type, l, t), (n[bt] = t));
    } catch (u) {
      Be(e, e.return, u);
    }
  }
  function bm(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && nn(e.type)) || e.tag === 4
    );
  }
  function Pc(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || bm(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if ((e.tag === 27 && nn(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function eo(e, t, l) {
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
            l != null || t.onclick !== null || (t.onclick = yl)));
    else if (
      n !== 4 &&
      (n === 27 && nn(e.type) && ((l = e.stateNode), (t = null)), (e = e.child), e !== null)
    )
      for (eo(e, t, l), e = e.sibling; e !== null; ) (eo(e, t, l), (e = e.sibling));
  }
  function Nu(e, t, l) {
    var n = e.tag;
    if (n === 5 || n === 6) ((e = e.stateNode), t ? l.insertBefore(e, t) : l.appendChild(e));
    else if (n !== 4 && (n === 27 && nn(e.type) && (l = e.stateNode), (e = e.child), e !== null))
      for (Nu(e, t, l), e = e.sibling; e !== null; ) (Nu(e, t, l), (e = e.sibling));
  }
  function Sm(e) {
    var t = e.stateNode,
      l = e.memoizedProps;
    try {
      for (var n = e.type, u = t.attributes; u.length; ) t.removeAttributeNode(u[0]);
      (mt(t, n, l), (t[ot] = e), (t[bt] = l));
    } catch (c) {
      Be(e, e.return, c);
    }
  }
  var kl = !1,
    at = !1,
    to = !1,
    xm = typeof WeakSet == 'function' ? WeakSet : Set,
    ct = null;
  function h_(e, t) {
    if (((e = e.containerInfo), (Eo = Qu), (e = Df(e)), Ks(e))) {
      if ('selectionStart' in e) var l = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          l = ((l = e.ownerDocument) && l.defaultView) || window;
          var n = l.getSelection && l.getSelection();
          if (n && n.rangeCount !== 0) {
            l = n.anchorNode;
            var u = n.anchorOffset,
              c = n.focusNode;
            n = n.focusOffset;
            try {
              (l.nodeType, c.nodeType);
            } catch {
              l = null;
              break e;
            }
            var f = 0,
              p = -1,
              E = -1,
              D = 0,
              q = 0,
              X = e,
              z = null;
            t: for (;;) {
              for (
                var B;
                X !== l || (u !== 0 && X.nodeType !== 3) || (p = f + u),
                  X !== c || (n !== 0 && X.nodeType !== 3) || (E = f + n),
                  X.nodeType === 3 && (f += X.nodeValue.length),
                  (B = X.firstChild) !== null;
              )
                ((z = X), (X = B));
              for (;;) {
                if (X === e) break t;
                if (
                  (z === l && ++D === u && (p = f),
                  z === c && ++q === n && (E = f),
                  (B = X.nextSibling) !== null)
                )
                  break;
                ((X = z), (z = X.parentNode));
              }
              X = B;
            }
            l = p === -1 || E === -1 ? null : { start: p, end: E };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (To = { focusedElem: e, selectionRange: l }, Qu = !1, ct = t; ct !== null; )
      if (((t = ct), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (ct = e));
      else
        for (; ct !== null; ) {
          switch (((t = ct), (c = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              if (
                (e & 4) !== 0 &&
                ((e = t.updateQueue), (e = e !== null ? e.events : null), e !== null)
              )
                for (l = 0; l < e.length; l++) ((u = e[l]), (u.ref.impl = u.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && c !== null) {
                ((e = void 0),
                  (l = t),
                  (u = c.memoizedProps),
                  (c = c.memoizedState),
                  (n = l.stateNode));
                try {
                  var ne = Cn(l.type, u);
                  ((e = n.getSnapshotBeforeUpdate(ne, c)),
                    (n.__reactInternalSnapshotBeforeUpdate = e));
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
              if ((e & 1024) !== 0) throw Error(s(163));
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (ct = e));
            break;
          }
          ct = t.return;
        }
  }
  function Em(e, t, l) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (Cl(e, l), n & 4 && ui(5, l));
        break;
      case 1:
        if ((Cl(e, l), n & 4))
          if (((e = l.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (f) {
              Be(l, l.return, f);
            }
          else {
            var u = Cn(l.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(u, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (f) {
              Be(l, l.return, f);
            }
          }
        (n & 64 && gm(l), n & 512 && si(l, l.return));
        break;
      case 3:
        if ((Cl(e, l), n & 64 && ((e = l.updateQueue), e !== null))) {
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
            sd(e, t);
          } catch (f) {
            Be(l, l.return, f);
          }
        }
        break;
      case 27:
        t === null && n & 4 && Sm(l);
      case 26:
      case 5:
        (Cl(e, l), t === null && n & 4 && vm(l), n & 512 && si(l, l.return));
        break;
      case 12:
        Cl(e, l);
        break;
      case 31:
        (Cl(e, l), n & 4 && km(e, l));
        break;
      case 13:
        (Cl(e, l),
          n & 4 && Am(e, l),
          n & 64 &&
            ((e = l.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((l = E_.bind(null, l)), $_(e, l)))));
        break;
      case 22:
        if (((n = l.memoizedState !== null || kl), !n)) {
          ((t = (t !== null && t.memoizedState !== null) || at), (u = kl));
          var c = at;
          ((kl = n),
            (at = t) && !c ? jl(e, l, (l.subtreeFlags & 8772) !== 0) : Cl(e, l),
            (kl = u),
            (at = c));
        }
        break;
      case 30:
        break;
      default:
        Cl(e, l);
    }
  }
  function Tm(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), Tm(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Rs(t)),
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
    xt = !1;
  function Al(e, t, l) {
    for (l = l.child; l !== null; ) (Nm(e, t, l), (l = l.sibling));
  }
  function Nm(e, t, l) {
    if (Ct && typeof Ct.onCommitFiberUnmount == 'function')
      try {
        Ct.onCommitFiberUnmount(Ra, l);
      } catch {}
    switch (l.tag) {
      case 26:
        (at || rl(l, t),
          Al(e, t, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
        break;
      case 27:
        at || rl(l, t);
        var n = Qe,
          u = xt;
        (nn(l.type) && ((Qe = l.stateNode), (xt = !1)),
          Al(e, t, l),
          yi(l.stateNode),
          (Qe = n),
          (xt = u));
        break;
      case 5:
        at || rl(l, t);
      case 6:
        if (((n = Qe), (u = xt), (Qe = null), Al(e, t, l), (Qe = n), (xt = u), Qe !== null))
          if (xt)
            try {
              (Qe.nodeType === 9
                ? Qe.body
                : Qe.nodeName === 'HTML'
                  ? Qe.ownerDocument.body
                  : Qe
              ).removeChild(l.stateNode);
            } catch (c) {
              Be(l, t, c);
            }
          else
            try {
              Qe.removeChild(l.stateNode);
            } catch (c) {
              Be(l, t, c);
            }
        break;
      case 18:
        Qe !== null &&
          (xt
            ? ((e = Qe),
              gh(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                l.stateNode
              ),
              ga(e))
            : gh(Qe, l.stateNode));
        break;
      case 4:
        ((n = Qe),
          (u = xt),
          (Qe = l.stateNode.containerInfo),
          (xt = !0),
          Al(e, t, l),
          (Qe = n),
          (xt = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Jl(2, l, t), at || Jl(4, l, t), Al(e, t, l));
        break;
      case 1:
        (at ||
          (rl(l, t), (n = l.stateNode), typeof n.componentWillUnmount == 'function' && _m(l, t, n)),
          Al(e, t, l));
        break;
      case 21:
        Al(e, t, l);
        break;
      case 22:
        ((at = (n = at) || l.memoizedState !== null), Al(e, t, l), (at = n));
        break;
      default:
        Al(e, t, l);
    }
  }
  function km(e, t) {
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
  function Am(e, t) {
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
  function p_(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new xm()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new xm()),
          t
        );
      default:
        throw Error(s(435, e.tag));
    }
  }
  function ku(e, t) {
    var l = p_(e);
    t.forEach(function (n) {
      if (!l.has(n)) {
        l.add(n);
        var u = T_.bind(null, e, n);
        n.then(u, u);
      }
    });
  }
  function Et(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var n = 0; n < l.length; n++) {
        var u = l[n],
          c = e,
          f = t,
          p = f;
        e: for (; p !== null; ) {
          switch (p.tag) {
            case 27:
              if (nn(p.type)) {
                ((Qe = p.stateNode), (xt = !1));
                break e;
              }
              break;
            case 5:
              ((Qe = p.stateNode), (xt = !1));
              break e;
            case 3:
            case 4:
              ((Qe = p.stateNode.containerInfo), (xt = !0));
              break e;
          }
          p = p.return;
        }
        if (Qe === null) throw Error(s(160));
        (Nm(c, f, u),
          (Qe = null),
          (xt = !1),
          (c = u.alternate),
          c !== null && (c.return = null),
          (u.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (Cm(t, e), (t = t.sibling));
  }
  var el = null;
  function Cm(e, t) {
    var l = e.alternate,
      n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Et(t, e), Tt(e), n & 4 && (Jl(3, e, e.return), ui(3, e), Jl(5, e, e.return)));
        break;
      case 1:
        (Et(t, e),
          Tt(e),
          n & 512 && (at || l === null || rl(l, l.return)),
          n & 64 &&
            kl &&
            ((e = e.updateQueue),
            e !== null &&
              ((n = e.callbacks),
              n !== null &&
                ((l = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = l === null ? n : l.concat(n))))));
        break;
      case 26:
        var u = el;
        if ((Et(t, e), Tt(e), n & 512 && (at || l === null || rl(l, l.return)), n & 4)) {
          var c = l !== null ? l.memoizedState : null;
          if (((n = e.memoizedState), l === null))
            if (n === null)
              if (e.stateNode === null) {
                e: {
                  ((n = e.type), (l = e.memoizedProps), (u = u.ownerDocument || u));
                  t: switch (n) {
                    case 'title':
                      ((c = u.getElementsByTagName('title')[0]),
                        (!c ||
                          c[Da] ||
                          c[ot] ||
                          c.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          c.hasAttribute('itemprop')) &&
                          ((c = u.createElement(n)),
                          u.head.insertBefore(c, u.querySelector('head > title'))),
                        mt(c, n, l),
                        (c[ot] = e),
                        st(c),
                        (n = c));
                      break e;
                    case 'link':
                      var f = Ch('link', 'href', u).get(n + (l.href || ''));
                      if (f) {
                        for (var p = 0; p < f.length; p++)
                          if (
                            ((c = f[p]),
                            c.getAttribute('href') ===
                              (l.href == null || l.href === '' ? null : l.href) &&
                              c.getAttribute('rel') === (l.rel == null ? null : l.rel) &&
                              c.getAttribute('title') === (l.title == null ? null : l.title) &&
                              c.getAttribute('crossorigin') ===
                                (l.crossOrigin == null ? null : l.crossOrigin))
                          ) {
                            f.splice(p, 1);
                            break t;
                          }
                      }
                      ((c = u.createElement(n)), mt(c, n, l), u.head.appendChild(c));
                      break;
                    case 'meta':
                      if ((f = Ch('meta', 'content', u).get(n + (l.content || '')))) {
                        for (p = 0; p < f.length; p++)
                          if (
                            ((c = f[p]),
                            c.getAttribute('content') ===
                              (l.content == null ? null : '' + l.content) &&
                              c.getAttribute('name') === (l.name == null ? null : l.name) &&
                              c.getAttribute('property') ===
                                (l.property == null ? null : l.property) &&
                              c.getAttribute('http-equiv') ===
                                (l.httpEquiv == null ? null : l.httpEquiv) &&
                              c.getAttribute('charset') === (l.charSet == null ? null : l.charSet))
                          ) {
                            f.splice(p, 1);
                            break t;
                          }
                      }
                      ((c = u.createElement(n)), mt(c, n, l), u.head.appendChild(c));
                      break;
                    default:
                      throw Error(s(468, n));
                  }
                  ((c[ot] = e), st(c), (n = c));
                }
                e.stateNode = n;
              } else jh(u, e.type, e.stateNode);
            else e.stateNode = Ah(u, n, e.memoizedProps);
          else
            c !== n
              ? (c === null
                  ? l.stateNode !== null && ((l = l.stateNode), l.parentNode.removeChild(l))
                  : c.count--,
                n === null ? jh(u, e.type, e.stateNode) : Ah(u, n, e.memoizedProps))
              : n === null && e.stateNode !== null && Fc(e, e.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        (Et(t, e),
          Tt(e),
          n & 512 && (at || l === null || rl(l, l.return)),
          l !== null && n & 4 && Fc(e, e.memoizedProps, l.memoizedProps));
        break;
      case 5:
        if ((Et(t, e), Tt(e), n & 512 && (at || l === null || rl(l, l.return)), e.flags & 32)) {
          u = e.stateNode;
          try {
            Hn(u, '');
          } catch (ne) {
            Be(e, e.return, ne);
          }
        }
        (n & 4 &&
          e.stateNode != null &&
          ((u = e.memoizedProps), Fc(e, u, l !== null ? l.memoizedProps : u)),
          n & 1024 && (to = !0));
        break;
      case 6:
        if ((Et(t, e), Tt(e), n & 4)) {
          if (e.stateNode === null) throw Error(s(162));
          ((n = e.memoizedProps), (l = e.stateNode));
          try {
            l.nodeValue = n;
          } catch (ne) {
            Be(e, e.return, ne);
          }
        }
        break;
      case 3:
        if (
          ((Yu = null),
          (u = el),
          (el = Hu(t.containerInfo)),
          Et(t, e),
          (el = u),
          Tt(e),
          n & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            ga(t.containerInfo);
          } catch (ne) {
            Be(e, e.return, ne);
          }
        to && ((to = !1), jm(e));
        break;
      case 4:
        ((n = el), (el = Hu(e.stateNode.containerInfo)), Et(t, e), Tt(e), (el = n));
        break;
      case 12:
        (Et(t, e), Tt(e));
        break;
      case 31:
        (Et(t, e),
          Tt(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), ku(e, n))));
        break;
      case 13:
        (Et(t, e),
          Tt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (l !== null && l.memoizedState !== null) &&
            (Cu = At()),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), ku(e, n))));
        break;
      case 22:
        u = e.memoizedState !== null;
        var E = l !== null && l.memoizedState !== null,
          D = kl,
          q = at;
        if (((kl = D || u), (at = q || E), Et(t, e), (at = q), (kl = D), Tt(e), n & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = u ? t._visibility & -2 : t._visibility | 1,
              u && (l === null || E || kl || at || jn(e)),
              l = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                E = l = t;
                try {
                  if (((c = E.stateNode), u))
                    ((f = c.style),
                      typeof f.setProperty == 'function'
                        ? f.setProperty('display', 'none', 'important')
                        : (f.display = 'none'));
                  else {
                    p = E.stateNode;
                    var X = E.memoizedProps.style,
                      z = X != null && X.hasOwnProperty('display') ? X.display : null;
                    p.style.display = z == null || typeof z == 'boolean' ? '' : ('' + z).trim();
                  }
                } catch (ne) {
                  Be(E, E.return, ne);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                E = t;
                try {
                  E.stateNode.nodeValue = u ? '' : E.memoizedProps;
                } catch (ne) {
                  Be(E, E.return, ne);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                E = t;
                try {
                  var B = E.stateNode;
                  u ? _h(B, !0) : _h(E.stateNode, !1);
                } catch (ne) {
                  Be(E, E.return, ne);
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
          n !== null && ((l = n.retryQueue), l !== null && ((n.retryQueue = null), ku(e, l))));
        break;
      case 19:
        (Et(t, e),
          Tt(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), ku(e, n))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Et(t, e), Tt(e));
    }
  }
  function Tt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, n = e.return; n !== null; ) {
          if (bm(n)) {
            l = n;
            break;
          }
          n = n.return;
        }
        if (l == null) throw Error(s(160));
        switch (l.tag) {
          case 27:
            var u = l.stateNode,
              c = Pc(e);
            Nu(e, c, u);
            break;
          case 5:
            var f = l.stateNode;
            l.flags & 32 && (Hn(f, ''), (l.flags &= -33));
            var p = Pc(e);
            Nu(e, p, f);
            break;
          case 3:
          case 4:
            var E = l.stateNode.containerInfo,
              D = Pc(e);
            eo(e, D, E);
            break;
          default:
            throw Error(s(161));
        }
      } catch (q) {
        Be(e, e.return, q);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function jm(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (jm(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling));
      }
  }
  function Cl(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (Em(e, t.alternate, t), (t = t.sibling));
  }
  function jn(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Jl(4, t, t.return), jn(t));
          break;
        case 1:
          rl(t, t.return);
          var l = t.stateNode;
          (typeof l.componentWillUnmount == 'function' && _m(t, t.return, l), jn(t));
          break;
        case 27:
          yi(t.stateNode);
        case 26:
        case 5:
          (rl(t, t.return), jn(t));
          break;
        case 22:
          t.memoizedState === null && jn(t);
          break;
        case 30:
          jn(t);
          break;
        default:
          jn(t);
      }
      e = e.sibling;
    }
  }
  function jl(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var n = t.alternate,
        u = e,
        c = t,
        f = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          (jl(u, c, l), ui(4, c));
          break;
        case 1:
          if ((jl(u, c, l), (n = c), (u = n.stateNode), typeof u.componentDidMount == 'function'))
            try {
              u.componentDidMount();
            } catch (D) {
              Be(n, n.return, D);
            }
          if (((n = c), (u = n.updateQueue), u !== null)) {
            var p = n.stateNode;
            try {
              var E = u.shared.hiddenCallbacks;
              if (E !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < E.length; u++) ud(E[u], p);
            } catch (D) {
              Be(n, n.return, D);
            }
          }
          (l && f & 64 && gm(c), si(c, c.return));
          break;
        case 27:
          Sm(c);
        case 26:
        case 5:
          (jl(u, c, l), l && n === null && f & 4 && vm(c), si(c, c.return));
          break;
        case 12:
          jl(u, c, l);
          break;
        case 31:
          (jl(u, c, l), l && f & 4 && km(u, c));
          break;
        case 13:
          (jl(u, c, l), l && f & 4 && Am(u, c));
          break;
        case 22:
          (c.memoizedState === null && jl(u, c, l), si(c, c.return));
          break;
        case 30:
          break;
        default:
          jl(u, c, l);
      }
      t = t.sibling;
    }
  }
  function lo(e, t) {
    var l = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (l = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== l && (e != null && e.refCount++, l != null && Za(l)));
  }
  function no(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && Za(e)));
  }
  function tl(e, t, l, n) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (Mm(e, t, l, n), (t = t.sibling));
  }
  function Mm(e, t, l, n) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (tl(e, t, l, n), u & 2048 && ui(9, t));
        break;
      case 1:
        tl(e, t, l, n);
        break;
      case 3:
        (tl(e, t, l, n),
          u & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && Za(e))));
        break;
      case 12:
        if (u & 2048) {
          (tl(e, t, l, n), (e = t.stateNode));
          try {
            var c = t.memoizedProps,
              f = c.id,
              p = c.onPostCommit;
            typeof p == 'function' &&
              p(f, t.alternate === null ? 'mount' : 'update', e.passiveEffectDuration, -0);
          } catch (E) {
            Be(t, t.return, E);
          }
        } else tl(e, t, l, n);
        break;
      case 31:
        tl(e, t, l, n);
        break;
      case 13:
        tl(e, t, l, n);
        break;
      case 23:
        break;
      case 22:
        ((c = t.stateNode),
          (f = t.alternate),
          t.memoizedState !== null
            ? c._visibility & 2
              ? tl(e, t, l, n)
              : ci(e, t)
            : c._visibility & 2
              ? tl(e, t, l, n)
              : ((c._visibility |= 2), ua(e, t, l, n, (t.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && lo(f, t));
        break;
      case 24:
        (tl(e, t, l, n), u & 2048 && no(t.alternate, t));
        break;
      default:
        tl(e, t, l, n);
    }
  }
  function ua(e, t, l, n, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var c = e,
        f = t,
        p = l,
        E = n,
        D = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          (ua(c, f, p, E, u), ui(8, f));
          break;
        case 23:
          break;
        case 22:
          var q = f.stateNode;
          (f.memoizedState !== null
            ? q._visibility & 2
              ? ua(c, f, p, E, u)
              : ci(c, f)
            : ((q._visibility |= 2), ua(c, f, p, E, u)),
            u && D & 2048 && lo(f.alternate, f));
          break;
        case 24:
          (ua(c, f, p, E, u), u && D & 2048 && no(f.alternate, f));
          break;
        default:
          ua(c, f, p, E, u);
      }
      t = t.sibling;
    }
  }
  function ci(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e,
          n = t,
          u = n.flags;
        switch (n.tag) {
          case 22:
            (ci(l, n), u & 2048 && lo(n.alternate, n));
            break;
          case 24:
            (ci(l, n), u & 2048 && no(n.alternate, n));
            break;
          default:
            ci(l, n);
        }
        t = t.sibling;
      }
  }
  var oi = 8192;
  function sa(e, t, l) {
    if (e.subtreeFlags & oi) for (e = e.child; e !== null; ) (Rm(e, t, l), (e = e.sibling));
  }
  function Rm(e, t, l) {
    switch (e.tag) {
      case 26:
        (sa(e, t, l),
          e.flags & oi && e.memoizedState !== null && t0(l, el, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        sa(e, t, l);
        break;
      case 3:
      case 4:
        var n = el;
        ((el = Hu(e.stateNode.containerInfo)), sa(e, t, l), (el = n));
        break;
      case 22:
        e.memoizedState === null &&
          ((n = e.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = oi), (oi = 16777216), sa(e, t, l), (oi = n))
            : sa(e, t, l));
        break;
      default:
        sa(e, t, l);
    }
  }
  function wm(e) {
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
          var n = t[l];
          ((ct = n), Dm(n, e));
        }
      wm(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (Om(e), (e = e.sibling));
  }
  function Om(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (ri(e), e.flags & 2048 && Jl(9, e, e.return));
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
          ? ((t._visibility &= -3), Au(e))
          : ri(e);
        break;
      default:
        ri(e);
    }
  }
  function Au(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var n = t[l];
          ((ct = n), Dm(n, e));
        }
      wm(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (Jl(8, t, t.return), Au(t));
          break;
        case 22:
          ((l = t.stateNode), l._visibility & 2 && ((l._visibility &= -3), Au(t)));
          break;
        default:
          Au(t);
      }
      e = e.sibling;
    }
  }
  function Dm(e, t) {
    for (; ct !== null; ) {
      var l = ct;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Jl(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var n = l.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          Za(l.memoizedState.cache);
      }
      if (((n = l.child), n !== null)) ((n.return = l), (ct = n));
      else
        e: for (l = e; ct !== null; ) {
          n = ct;
          var u = n.sibling,
            c = n.return;
          if ((Tm(n), n === l)) {
            ct = null;
            break e;
          }
          if (u !== null) {
            ((u.return = c), (ct = u));
            break e;
          }
          ct = c;
        }
    }
  }
  var y_ = {
      getCacheForType: function (e) {
        var t = ft(tt),
          l = t.data.get(e);
        return (l === void 0 && ((l = e()), t.data.set(e, l)), l);
      },
      cacheSignal: function () {
        return ft(tt).controller.signal;
      },
    },
    g_ = typeof WeakMap == 'function' ? WeakMap : Map,
    we = 0,
    Ye = null,
    Se = null,
    Ne = 0,
    ze = 0,
    Dt = null,
    Wl = !1,
    ca = !1,
    ao = !1,
    Ml = 0,
    Je = 0,
    Fl = 0,
    Mn = 0,
    io = 0,
    zt = 0,
    oa = 0,
    fi = null,
    Nt = null,
    uo = !1,
    Cu = 0,
    zm = 0,
    ju = 1 / 0,
    Mu = null,
    Pl = null,
    it = 0,
    en = null,
    ra = null,
    Rl = 0,
    so = 0,
    co = null,
    Bm = null,
    di = 0,
    oo = null;
  function Bt() {
    return (we & 2) !== 0 && Ne !== 0 ? Ne & -Ne : L.T !== null ? yo() : Wr();
  }
  function Lm() {
    if (zt === 0)
      if ((Ne & 536870912) === 0 || Ae) {
        var e = Ui;
        ((Ui <<= 1), (Ui & 3932160) === 0 && (Ui = 262144), (zt = e));
      } else zt = 536870912;
    return ((e = wt.current), e !== null && (e.flags |= 32), zt);
  }
  function kt(e, t, l) {
    (((e === Ye && (ze === 2 || ze === 9)) || e.cancelPendingCommit !== null) &&
      (fa(e, 0), tn(e, Ne, zt, !1)),
      Oa(e, l),
      ((we & 2) === 0 || e !== Ye) &&
        (e === Ye && ((we & 2) === 0 && (Mn |= l), Je === 4 && tn(e, Ne, zt, !1)), fl(e)));
  }
  function Um(e, t, l) {
    if ((we & 6) !== 0) throw Error(s(327));
    var n = (!l && (t & 127) === 0 && (t & e.expiredLanes) === 0) || wa(e, t),
      u = n ? b_(e, t) : fo(e, t, !0),
      c = n;
    do {
      if (u === 0) {
        ca && !n && tn(e, t, 0, !1);
        break;
      } else {
        if (((l = e.current.alternate), c && !__(l))) {
          ((u = fo(e, t, !1)), (c = !1));
          continue;
        }
        if (u === 2) {
          if (((c = t), e.errorRecoveryDisabledLanes & c)) var f = 0;
          else
            ((f = e.pendingLanes & -536870913), (f = f !== 0 ? f : f & 536870912 ? 536870912 : 0));
          if (f !== 0) {
            t = f;
            e: {
              var p = e;
              u = fi;
              var E = p.current.memoizedState.isDehydrated;
              if ((E && (fa(p, f).flags |= 256), (f = fo(p, f, !1)), f !== 2)) {
                if (ao && !E) {
                  ((p.errorRecoveryDisabledLanes |= c), (Mn |= c), (u = 4));
                  break e;
                }
                ((c = Nt), (Nt = u), c !== null && (Nt === null ? (Nt = c) : Nt.push.apply(Nt, c)));
              }
              u = f;
            }
            if (((c = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          (fa(e, 0), tn(e, t, 0, !0));
          break;
        }
        e: {
          switch (((n = e), (c = u), c)) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              tn(n, t, zt, !Wl);
              break e;
            case 2:
              Nt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && ((u = Cu + 300 - At()), 10 < u)) {
            if ((tn(n, t, zt, !Wl), Hi(n, 0, !0) !== 0)) break e;
            ((Rl = t),
              (n.timeoutHandle = ph(
                qm.bind(null, n, l, Nt, Mu, uo, t, zt, Mn, oa, Wl, c, 'Throttled', -0, 0),
                u
              )));
            break e;
          }
          qm(n, l, Nt, Mu, uo, t, zt, Mn, oa, Wl, c, null, -0, 0);
        }
      }
      break;
    } while (!0);
    fl(e);
  }
  function qm(e, t, l, n, u, c, f, p, E, D, q, X, z, B) {
    if (((e.timeoutHandle = -1), (X = t.subtreeFlags), X & 8192 || (X & 16785408) === 16785408)) {
      ((X = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: yl,
      }),
        Rm(t, c, X));
      var ne = (c & 62914560) === c ? Cu - At() : (c & 4194048) === c ? zm - At() : 0;
      if (((ne = l0(X, ne)), ne !== null)) {
        ((Rl = c),
          (e.cancelPendingCommit = ne(Zm.bind(null, e, t, c, l, n, u, f, p, E, q, X, null, z, B))),
          tn(e, c, f, !D));
        return;
      }
    }
    Zm(e, t, c, l, n, u, f, p, E);
  }
  function __(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if (
        (l === 0 || l === 11 || l === 15) &&
        t.flags & 16384 &&
        ((l = t.updateQueue), l !== null && ((l = l.stores), l !== null))
      )
        for (var n = 0; n < l.length; n++) {
          var u = l[n],
            c = u.getSnapshot;
          u = u.value;
          try {
            if (!Mt(c(), u)) return !1;
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
  function tn(e, t, l, n) {
    ((t &= ~io),
      (t &= ~Mn),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      n && (e.warmLanes |= t),
      (n = e.expirationTimes));
    for (var u = t; 0 < u; ) {
      var c = 31 - jt(u),
        f = 1 << c;
      ((n[c] = -1), (u &= ~f));
    }
    l !== 0 && Kr(e, l, t);
  }
  function Ru() {
    return (we & 6) === 0 ? (mi(0), !1) : !0;
  }
  function ro() {
    if (Se !== null) {
      if (ze === 0) var e = Se.return;
      else ((e = Se), (bl = Sn = null), kc(e), (ta = null), (Ia = 0), (e = Se));
      for (; e !== null; ) (ym(e.alternate, e), (e = e.return));
      Se = null;
    }
  }
  function fa(e, t) {
    var l = e.timeoutHandle;
    (l !== -1 && ((e.timeoutHandle = -1), U_(l)),
      (l = e.cancelPendingCommit),
      l !== null && ((e.cancelPendingCommit = null), l()),
      (Rl = 0),
      ro(),
      (Ye = e),
      (Se = l = _l(e.current, null)),
      (Ne = t),
      (ze = 0),
      (Dt = null),
      (Wl = !1),
      (ca = wa(e, t)),
      (ao = !1),
      (oa = zt = io = Mn = Fl = Je = 0),
      (Nt = fi = null),
      (uo = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var u = 31 - jt(n),
          c = 1 << u;
        ((t |= e[u]), (n &= ~c));
      }
    return ((Ml = t), Fi(), l);
  }
  function Hm(e, t) {
    ((_e = null),
      (L.H = ni),
      t === ea || t === uu
        ? ((t = ld()), (ze = 3))
        : t === hc
          ? ((t = ld()), (ze = 4))
          : (ze =
              t === Yc
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (Dt = t),
      Se === null && ((Je = 1), bu(e, Yt(t, e.current))));
  }
  function Gm() {
    var e = wt.current;
    return e === null
      ? !0
      : (Ne & 4194048) === Ne
        ? Qt === null
        : (Ne & 62914560) === Ne || (Ne & 536870912) !== 0
          ? e === Qt
          : !1;
  }
  function Ym() {
    var e = L.H;
    return ((L.H = ni), e === null ? ni : e);
  }
  function $m() {
    var e = L.A;
    return ((L.A = y_), e);
  }
  function wu() {
    ((Je = 4),
      Wl || ((Ne & 4194048) !== Ne && wt.current !== null) || (ca = !0),
      ((Fl & 134217727) === 0 && (Mn & 134217727) === 0) || Ye === null || tn(Ye, Ne, zt, !1));
  }
  function fo(e, t, l) {
    var n = we;
    we |= 2;
    var u = Ym(),
      c = $m();
    ((Ye !== e || Ne !== t) && ((Mu = null), fa(e, t)), (t = !1));
    var f = Je;
    e: do
      try {
        if (ze !== 0 && Se !== null) {
          var p = Se,
            E = Dt;
          switch (ze) {
            case 8:
              (ro(), (f = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              wt.current === null && (t = !0);
              var D = ze;
              if (((ze = 0), (Dt = null), da(e, p, E, D), l && ca)) {
                f = 0;
                break e;
              }
              break;
            default:
              ((D = ze), (ze = 0), (Dt = null), da(e, p, E, D));
          }
        }
        (v_(), (f = Je));
        break;
      } catch (q) {
        Hm(e, q);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (bl = Sn = null),
      (we = n),
      (L.H = u),
      (L.A = c),
      Se === null && ((Ye = null), (Ne = 0), Fi()),
      f
    );
  }
  function v_() {
    for (; Se !== null; ) Xm(Se);
  }
  function b_(e, t) {
    var l = we;
    we |= 2;
    var n = Ym(),
      u = $m();
    Ye !== e || Ne !== t ? ((Mu = null), (ju = At() + 500), fa(e, t)) : (ca = wa(e, t));
    e: do
      try {
        if (ze !== 0 && Se !== null) {
          t = Se;
          var c = Dt;
          t: switch (ze) {
            case 1:
              ((ze = 0), (Dt = null), da(e, t, c, 1));
              break;
            case 2:
            case 9:
              if (ed(c)) {
                ((ze = 0), (Dt = null), Vm(t));
                break;
              }
              ((t = function () {
                ((ze !== 2 && ze !== 9) || Ye !== e || (ze = 7), fl(e));
              }),
                c.then(t, t));
              break e;
            case 3:
              ze = 7;
              break e;
            case 4:
              ze = 5;
              break e;
            case 7:
              ed(c) ? ((ze = 0), (Dt = null), Vm(t)) : ((ze = 0), (Dt = null), da(e, t, c, 7));
              break;
            case 5:
              var f = null;
              switch (Se.tag) {
                case 26:
                  f = Se.memoizedState;
                case 5:
                case 27:
                  var p = Se;
                  if (f ? Mh(f) : p.stateNode.complete) {
                    ((ze = 0), (Dt = null));
                    var E = p.sibling;
                    if (E !== null) Se = E;
                    else {
                      var D = p.return;
                      D !== null ? ((Se = D), Ou(D)) : (Se = null);
                    }
                    break t;
                  }
              }
              ((ze = 0), (Dt = null), da(e, t, c, 5));
              break;
            case 6:
              ((ze = 0), (Dt = null), da(e, t, c, 6));
              break;
            case 8:
              (ro(), (Je = 6));
              break e;
            default:
              throw Error(s(462));
          }
        }
        S_();
        break;
      } catch (q) {
        Hm(e, q);
      }
    while (!0);
    return (
      (bl = Sn = null),
      (L.H = n),
      (L.A = u),
      (we = l),
      Se !== null ? 0 : ((Ye = null), (Ne = 0), Fi(), Je)
    );
  }
  function S_() {
    for (; Se !== null && !Xy(); ) Xm(Se);
  }
  function Xm(e) {
    var t = hm(e.alternate, e, Ml);
    ((e.memoizedProps = e.pendingProps), t === null ? Ou(e) : (Se = t));
  }
  function Vm(e) {
    var t = e,
      l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = cm(l, t, t.pendingProps, t.type, void 0, Ne);
        break;
      case 11:
        t = cm(l, t, t.pendingProps, t.type.render, t.ref, Ne);
        break;
      case 5:
        kc(t);
      default:
        (ym(l, t), (t = Se = $f(t, Ml)), (t = hm(l, t, Ml)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? Ou(e) : (Se = t));
  }
  function da(e, t, l, n) {
    ((bl = Sn = null), kc(t), (ta = null), (Ia = 0));
    var u = t.return;
    try {
      if (o_(e, u, t, l, Ne)) {
        ((Je = 1), bu(e, Yt(l, e.current)), (Se = null));
        return;
      }
    } catch (c) {
      if (u !== null) throw ((Se = u), c);
      ((Je = 1), bu(e, Yt(l, e.current)), (Se = null));
      return;
    }
    t.flags & 32768
      ? (Ae || n === 1
          ? (e = !0)
          : ca || (Ne & 536870912) !== 0
            ? (e = !1)
            : ((Wl = e = !0),
              (n === 2 || n === 9 || n === 3 || n === 6) &&
                ((n = wt.current), n !== null && n.tag === 13 && (n.flags |= 16384))),
        Qm(t, e))
      : Ou(t);
  }
  function Ou(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Qm(t, Wl);
        return;
      }
      e = t.return;
      var l = d_(t.alternate, t, Ml);
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
  function Qm(e, t) {
    do {
      var l = m_(e.alternate, e);
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
  function Zm(e, t, l, n, u, c, f, p, E) {
    e.cancelPendingCommit = null;
    do Du();
    while (it !== 0);
    if ((we & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (
        ((c = t.lanes | t.childLanes),
        (c |= Ps),
        eg(e, l, c, f, p, E),
        e === Ye && ((Se = Ye = null), (Ne = 0)),
        (ra = t),
        (en = e),
        (Rl = l),
        (so = c),
        (co = u),
        (Bm = n),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            N_(Bi, function () {
              return (Fm(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (n = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || n)
      ) {
        ((n = L.T), (L.T = null), (u = K.p), (K.p = 2), (f = we), (we |= 4));
        try {
          h_(e, t, l);
        } finally {
          ((we = f), (K.p = u), (L.T = n));
        }
      }
      ((it = 1), Km(), Im(), Jm());
    }
  }
  function Km() {
    if (it === 1) {
      it = 0;
      var e = en,
        t = ra,
        l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        ((l = L.T), (L.T = null));
        var n = K.p;
        K.p = 2;
        var u = we;
        we |= 4;
        try {
          Cm(t, e);
          var c = To,
            f = Df(e.containerInfo),
            p = c.focusedElem,
            E = c.selectionRange;
          if (f !== p && p && p.ownerDocument && Of(p.ownerDocument.documentElement, p)) {
            if (E !== null && Ks(p)) {
              var D = E.start,
                q = E.end;
              if ((q === void 0 && (q = D), 'selectionStart' in p))
                ((p.selectionStart = D), (p.selectionEnd = Math.min(q, p.value.length)));
              else {
                var X = p.ownerDocument || document,
                  z = (X && X.defaultView) || window;
                if (z.getSelection) {
                  var B = z.getSelection(),
                    ne = p.textContent.length,
                    re = Math.min(E.start, ne),
                    He = E.end === void 0 ? re : Math.min(E.end, ne);
                  !B.extend && re > He && ((f = He), (He = re), (re = f));
                  var M = wf(p, re),
                    N = wf(p, He);
                  if (
                    M &&
                    N &&
                    (B.rangeCount !== 1 ||
                      B.anchorNode !== M.node ||
                      B.anchorOffset !== M.offset ||
                      B.focusNode !== N.node ||
                      B.focusOffset !== N.offset)
                  ) {
                    var O = X.createRange();
                    (O.setStart(M.node, M.offset),
                      B.removeAllRanges(),
                      re > He
                        ? (B.addRange(O), B.extend(N.node, N.offset))
                        : (O.setEnd(N.node, N.offset), B.addRange(O)));
                  }
                }
              }
            }
            for (X = [], B = p; (B = B.parentNode); )
              B.nodeType === 1 && X.push({ element: B, left: B.scrollLeft, top: B.scrollTop });
            for (typeof p.focus == 'function' && p.focus(), p = 0; p < X.length; p++) {
              var $ = X[p];
              (($.element.scrollLeft = $.left), ($.element.scrollTop = $.top));
            }
          }
          ((Qu = !!Eo), (To = Eo = null));
        } finally {
          ((we = u), (K.p = n), (L.T = l));
        }
      }
      ((e.current = t), (it = 2));
    }
  }
  function Im() {
    if (it === 2) {
      it = 0;
      var e = en,
        t = ra,
        l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        ((l = L.T), (L.T = null));
        var n = K.p;
        K.p = 2;
        var u = we;
        we |= 4;
        try {
          Em(e, t.alternate, t);
        } finally {
          ((we = u), (K.p = n), (L.T = l));
        }
      }
      it = 3;
    }
  }
  function Jm() {
    if (it === 4 || it === 3) {
      ((it = 0), Vy());
      var e = en,
        t = ra,
        l = Rl,
        n = Bm;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (it = 5)
        : ((it = 0), (ra = en = null), Wm(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (
        (u === 0 && (Pl = null),
        js(l),
        (t = t.stateNode),
        Ct && typeof Ct.onCommitFiberRoot == 'function')
      )
        try {
          Ct.onCommitFiberRoot(Ra, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        ((t = L.T), (u = K.p), (K.p = 2), (L.T = null));
        try {
          for (var c = e.onRecoverableError, f = 0; f < n.length; f++) {
            var p = n[f];
            c(p.value, { componentStack: p.stack });
          }
        } finally {
          ((L.T = t), (K.p = u));
        }
      }
      ((Rl & 3) !== 0 && Du(),
        fl(e),
        (u = e.pendingLanes),
        (l & 261930) !== 0 && (u & 42) !== 0 ? (e === oo ? di++ : ((di = 0), (oo = e))) : (di = 0),
        mi(0));
    }
  }
  function Wm(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), Za(t)));
  }
  function Du() {
    return (Km(), Im(), Jm(), Fm());
  }
  function Fm() {
    if (it !== 5) return !1;
    var e = en,
      t = so;
    so = 0;
    var l = js(Rl),
      n = L.T,
      u = K.p;
    try {
      ((K.p = 32 > l ? 32 : l), (L.T = null), (l = co), (co = null));
      var c = en,
        f = Rl;
      if (((it = 0), (ra = en = null), (Rl = 0), (we & 6) !== 0)) throw Error(s(331));
      var p = we;
      if (
        ((we |= 4),
        Om(c.current),
        Mm(c, c.current, f, l),
        (we = p),
        mi(0, !1),
        Ct && typeof Ct.onPostCommitFiberRoot == 'function')
      )
        try {
          Ct.onPostCommitFiberRoot(Ra, c);
        } catch {}
      return !0;
    } finally {
      ((K.p = u), (L.T = n), Wm(e, t));
    }
  }
  function Pm(e, t, l) {
    ((t = Yt(l, t)),
      (t = Gc(e.stateNode, t, 2)),
      (e = Zl(e, t, 2)),
      e !== null && (Oa(e, 2), fl(e)));
  }
  function Be(e, t, l) {
    if (e.tag === 3) Pm(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Pm(t, e, l);
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof n.componentDidCatch == 'function' && (Pl === null || !Pl.has(n)))
          ) {
            ((e = Yt(l, e)),
              (l = em(2)),
              (n = Zl(t, l, 2)),
              n !== null && (tm(l, n, t, e), Oa(n, 2), fl(n)));
            break;
          }
        }
        t = t.return;
      }
  }
  function mo(e, t, l) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new g_();
      var u = new Set();
      n.set(t, u);
    } else ((u = n.get(t)), u === void 0 && ((u = new Set()), n.set(t, u)));
    u.has(l) || ((ao = !0), u.add(l), (e = x_.bind(null, e, t, l)), t.then(e, e));
  }
  function x_(e, t, l) {
    var n = e.pingCache;
    (n !== null && n.delete(t),
      (e.pingedLanes |= e.suspendedLanes & l),
      (e.warmLanes &= ~l),
      Ye === e &&
        (Ne & l) === l &&
        (Je === 4 || (Je === 3 && (Ne & 62914560) === Ne && 300 > At() - Cu)
          ? (we & 2) === 0 && fa(e, 0)
          : (io |= l),
        oa === Ne && (oa = 0)),
      fl(e));
  }
  function eh(e, t) {
    (t === 0 && (t = Zr()), (e = _n(e, t)), e !== null && (Oa(e, t), fl(e)));
  }
  function E_(e) {
    var t = e.memoizedState,
      l = 0;
    (t !== null && (l = t.retryLane), eh(e, l));
  }
  function T_(e, t) {
    var l = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var n = e.stateNode,
          u = e.memoizedState;
        u !== null && (l = u.retryLane);
        break;
      case 19:
        n = e.stateNode;
        break;
      case 22:
        n = e.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    (n !== null && n.delete(t), eh(e, l));
  }
  function N_(e, t) {
    return Ns(e, t);
  }
  var zu = null,
    ma = null,
    ho = !1,
    Bu = !1,
    po = !1,
    ln = 0;
  function fl(e) {
    (e !== ma && e.next === null && (ma === null ? (zu = ma = e) : (ma = ma.next = e)),
      (Bu = !0),
      ho || ((ho = !0), A_()));
  }
  function mi(e, t) {
    if (!po && Bu) {
      po = !0;
      do
        for (var l = !1, n = zu; n !== null; ) {
          if (e !== 0) {
            var u = n.pendingLanes;
            if (u === 0) var c = 0;
            else {
              var f = n.suspendedLanes,
                p = n.pingedLanes;
              ((c = (1 << (31 - jt(42 | e) + 1)) - 1),
                (c &= u & ~(f & ~p)),
                (c = c & 201326741 ? (c & 201326741) | 1 : c ? c | 2 : 0));
            }
            c !== 0 && ((l = !0), ah(n, c));
          } else
            ((c = Ne),
              (c = Hi(
                n,
                n === Ye ? c : 0,
                n.cancelPendingCommit !== null || n.timeoutHandle !== -1
              )),
              (c & 3) === 0 || wa(n, c) || ((l = !0), ah(n, c)));
          n = n.next;
        }
      while (l);
      po = !1;
    }
  }
  function k_() {
    th();
  }
  function th() {
    Bu = ho = !1;
    var e = 0;
    ln !== 0 && L_() && (e = ln);
    for (var t = At(), l = null, n = zu; n !== null; ) {
      var u = n.next,
        c = lh(n, t);
      (c === 0
        ? ((n.next = null), l === null ? (zu = u) : (l.next = u), u === null && (ma = l))
        : ((l = n), (e !== 0 || (c & 3) !== 0) && (Bu = !0)),
        (n = u));
    }
    ((it !== 0 && it !== 5) || mi(e), ln !== 0 && (ln = 0));
  }
  function lh(e, t) {
    for (
      var l = e.suspendedLanes,
        n = e.pingedLanes,
        u = e.expirationTimes,
        c = e.pendingLanes & -62914561;
      0 < c;
    ) {
      var f = 31 - jt(c),
        p = 1 << f,
        E = u[f];
      (E === -1
        ? ((p & l) === 0 || (p & n) !== 0) && (u[f] = Py(p, t))
        : E <= t && (e.expiredLanes |= p),
        (c &= ~p));
    }
    if (
      ((t = Ye),
      (l = Ne),
      (l = Hi(e, e === t ? l : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (n = e.callbackNode),
      l === 0 || (e === t && (ze === 2 || ze === 9)) || e.cancelPendingCommit !== null)
    )
      return (n !== null && n !== null && ks(n), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((l & 3) === 0 || wa(e, l)) {
      if (((t = l & -l), t === e.callbackPriority)) return t;
      switch ((n !== null && ks(n), js(l))) {
        case 2:
        case 8:
          l = Vr;
          break;
        case 32:
          l = Bi;
          break;
        case 268435456:
          l = Qr;
          break;
        default:
          l = Bi;
      }
      return (
        (n = nh.bind(null, e)),
        (l = Ns(l, n)),
        (e.callbackPriority = t),
        (e.callbackNode = l),
        t
      );
    }
    return (
      n !== null && n !== null && ks(n),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function nh(e, t) {
    if (it !== 0 && it !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var l = e.callbackNode;
    if (Du() && e.callbackNode !== l) return null;
    var n = Ne;
    return (
      (n = Hi(e, e === Ye ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      n === 0
        ? null
        : (Um(e, n, t),
          lh(e, At()),
          e.callbackNode != null && e.callbackNode === l ? nh.bind(null, e) : null)
    );
  }
  function ah(e, t) {
    if (Du()) return null;
    Um(e, t, !0);
  }
  function A_() {
    q_(function () {
      (we & 6) !== 0 ? Ns(Xr, k_) : th();
    });
  }
  function yo() {
    if (ln === 0) {
      var e = Fn;
      (e === 0 && ((e = Li), (Li <<= 1), (Li & 261888) === 0 && (Li = 256)), (ln = e));
    }
    return ln;
  }
  function ih(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : Xi('' + e);
  }
  function uh(e, t) {
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
  function C_(e, t, l, n, u) {
    if (t === 'submit' && l && l.stateNode === u) {
      var c = ih((u[bt] || null).action),
        f = n.submitter;
      f &&
        ((t = (t = f[bt] || null) ? ih(t.formAction) : f.getAttribute('formAction')),
        t !== null && ((c = t), (f = null)));
      var p = new Ki('action', 'action', null, n, u);
      e.push({
        event: p,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (n.defaultPrevented) {
                if (ln !== 0) {
                  var E = f ? uh(u, f) : new FormData(u);
                  zc(l, { pending: !0, data: E, method: u.method, action: c }, null, E);
                }
              } else
                typeof c == 'function' &&
                  (p.preventDefault(),
                  (E = f ? uh(u, f) : new FormData(u)),
                  zc(l, { pending: !0, data: E, method: u.method, action: c }, c, E));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var go = 0; go < Fs.length; go++) {
    var _o = Fs[go],
      j_ = _o.toLowerCase(),
      M_ = _o[0].toUpperCase() + _o.slice(1);
    Pt(j_, 'on' + M_);
  }
  (Pt(Lf, 'onAnimationEnd'),
    Pt(Uf, 'onAnimationIteration'),
    Pt(qf, 'onAnimationStart'),
    Pt('dblclick', 'onDoubleClick'),
    Pt('focusin', 'onFocus'),
    Pt('focusout', 'onBlur'),
    Pt(Qg, 'onTransitionRun'),
    Pt(Zg, 'onTransitionStart'),
    Pt(Kg, 'onTransitionCancel'),
    Pt(Hf, 'onTransitionEnd'),
    Un('onMouseEnter', ['mouseout', 'mouseover']),
    Un('onMouseLeave', ['mouseout', 'mouseover']),
    Un('onPointerEnter', ['pointerout', 'pointerover']),
    Un('onPointerLeave', ['pointerout', 'pointerover']),
    hn('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    hn(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    hn('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    hn('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    hn(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    hn(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var hi =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    R_ = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(hi)
    );
  function sh(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var n = e[l],
        u = n.event;
      n = n.listeners;
      e: {
        var c = void 0;
        if (t)
          for (var f = n.length - 1; 0 <= f; f--) {
            var p = n[f],
              E = p.instance,
              D = p.currentTarget;
            if (((p = p.listener), E !== c && u.isPropagationStopped())) break e;
            ((c = p), (u.currentTarget = D));
            try {
              c(u);
            } catch (q) {
              Wi(q);
            }
            ((u.currentTarget = null), (c = E));
          }
        else
          for (f = 0; f < n.length; f++) {
            if (
              ((p = n[f]),
              (E = p.instance),
              (D = p.currentTarget),
              (p = p.listener),
              E !== c && u.isPropagationStopped())
            )
              break e;
            ((c = p), (u.currentTarget = D));
            try {
              c(u);
            } catch (q) {
              Wi(q);
            }
            ((u.currentTarget = null), (c = E));
          }
      }
    }
  }
  function xe(e, t) {
    var l = t[Ms];
    l === void 0 && (l = t[Ms] = new Set());
    var n = e + '__bubble';
    l.has(n) || (ch(t, e, 2, !1), l.add(n));
  }
  function vo(e, t, l) {
    var n = 0;
    (t && (n |= 4), ch(l, e, n, t));
  }
  var Lu = '_reactListening' + Math.random().toString(36).slice(2);
  function bo(e) {
    if (!e[Lu]) {
      ((e[Lu] = !0),
        ef.forEach(function (l) {
          l !== 'selectionchange' && (R_.has(l) || vo(l, !1, e), vo(l, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Lu] || ((t[Lu] = !0), vo('selectionchange', !1, t));
    }
  }
  function ch(e, t, l, n) {
    switch (Lh(t)) {
      case 2:
        var u = i0;
        break;
      case 8:
        u = u0;
        break;
      default:
        u = zo;
    }
    ((l = u.bind(null, t, l, e)),
      (u = void 0),
      !qs || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (u = !0),
      n
        ? u !== void 0
          ? e.addEventListener(t, l, { capture: !0, passive: u })
          : e.addEventListener(t, l, !0)
        : u !== void 0
          ? e.addEventListener(t, l, { passive: u })
          : e.addEventListener(t, l, !1));
  }
  function So(e, t, l, n, u) {
    var c = n;
    if ((t & 1) === 0 && (t & 2) === 0 && n !== null)
      e: for (;;) {
        if (n === null) return;
        var f = n.tag;
        if (f === 3 || f === 4) {
          var p = n.stateNode.containerInfo;
          if (p === u) break;
          if (f === 4)
            for (f = n.return; f !== null; ) {
              var E = f.tag;
              if ((E === 3 || E === 4) && f.stateNode.containerInfo === u) return;
              f = f.return;
            }
          for (; p !== null; ) {
            if (((f = zn(p)), f === null)) return;
            if (((E = f.tag), E === 5 || E === 6 || E === 26 || E === 27)) {
              n = c = f;
              continue e;
            }
            p = p.parentNode;
          }
        }
        n = n.return;
      }
    mf(function () {
      var D = c,
        q = Ls(l),
        X = [];
      e: {
        var z = Gf.get(e);
        if (z !== void 0) {
          var B = Ki,
            ne = e;
          switch (e) {
            case 'keypress':
              if (Qi(l) === 0) break e;
            case 'keydown':
            case 'keyup':
              B = Tg;
              break;
            case 'focusin':
              ((ne = 'focus'), (B = $s));
              break;
            case 'focusout':
              ((ne = 'blur'), (B = $s));
              break;
            case 'beforeblur':
            case 'afterblur':
              B = $s;
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
              B = yf;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              B = dg;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              B = Ag;
              break;
            case Lf:
            case Uf:
            case qf:
              B = pg;
              break;
            case Hf:
              B = jg;
              break;
            case 'scroll':
            case 'scrollend':
              B = rg;
              break;
            case 'wheel':
              B = Rg;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              B = gg;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              B = _f;
              break;
            case 'toggle':
            case 'beforetoggle':
              B = Og;
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
                (($ = Ba(N, M)), $ != null && re.push(pi(N, $, O))),
              He)
            )
              break;
            N = N.return;
          }
          0 < re.length && ((z = new B(z, ne, null, l, q)), X.push({ event: z, listeners: re }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((z = e === 'mouseover' || e === 'pointerover'),
            (B = e === 'mouseout' || e === 'pointerout'),
            z && l !== Bs && (ne = l.relatedTarget || l.fromElement) && (zn(ne) || ne[Dn]))
          )
            break e;
          if (
            (B || z) &&
            ((z =
              q.window === q
                ? q
                : (z = q.ownerDocument)
                  ? z.defaultView || z.parentWindow
                  : window),
            B
              ? ((ne = l.relatedTarget || l.toElement),
                (B = D),
                (ne = ne ? zn(ne) : null),
                ne !== null &&
                  ((He = d(ne)), (re = ne.tag), ne !== He || (re !== 5 && re !== 27 && re !== 6)) &&
                  (ne = null))
              : ((B = null), (ne = D)),
            B !== ne)
          ) {
            if (
              ((re = yf),
              ($ = 'onMouseLeave'),
              (M = 'onMouseEnter'),
              (N = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((re = _f), ($ = 'onPointerLeave'), (M = 'onPointerEnter'), (N = 'pointer')),
              (He = B == null ? z : za(B)),
              (O = ne == null ? z : za(ne)),
              (z = new re($, N + 'leave', B, l, q)),
              (z.target = He),
              (z.relatedTarget = O),
              ($ = null),
              zn(q) === D &&
                ((re = new re(M, N + 'enter', ne, l, q)),
                (re.target = O),
                (re.relatedTarget = He),
                ($ = re)),
              (He = $),
              B && ne)
            )
              t: {
                for (re = w_, M = B, N = ne, O = 0, $ = M; $; $ = re($)) O++;
                $ = 0;
                for (var se = N; se; se = re(se)) $++;
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
            (B !== null && oh(X, z, B, re, !1),
              ne !== null && He !== null && oh(X, He, ne, re, !0));
          }
        }
        e: {
          if (
            ((z = D ? za(D) : window),
            (B = z.nodeName && z.nodeName.toLowerCase()),
            B === 'select' || (B === 'input' && z.type === 'file'))
          )
            var je = kf;
          else if (Tf(z))
            if (Af) je = $g;
            else {
              je = Gg;
              var ie = Hg;
            }
          else
            ((B = z.nodeName),
              !B || B.toLowerCase() !== 'input' || (z.type !== 'checkbox' && z.type !== 'radio')
                ? D && zs(D.elementType) && (je = kf)
                : (je = Yg));
          if (je && (je = je(e, D))) {
            Nf(X, je, l, q);
            break e;
          }
          (ie && ie(e, z, D),
            e === 'focusout' &&
              D &&
              z.type === 'number' &&
              D.memoizedProps.value != null &&
              Ds(z, 'number', z.value));
        }
        switch (((ie = D ? za(D) : window), e)) {
          case 'focusin':
            (Tf(ie) || ie.contentEditable === 'true') && ((Xn = ie), (Is = D), (Xa = null));
            break;
          case 'focusout':
            Xa = Is = Xn = null;
            break;
          case 'mousedown':
            Js = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((Js = !1), zf(X, l, q));
            break;
          case 'selectionchange':
            if (Vg) break;
          case 'keydown':
          case 'keyup':
            zf(X, l, q);
        }
        var ve;
        if (Vs)
          e: {
            switch (e) {
              case 'compositionstart':
                var ke = 'onCompositionStart';
                break e;
              case 'compositionend':
                ke = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                ke = 'onCompositionUpdate';
                break e;
            }
            ke = void 0;
          }
        else
          $n
            ? xf(e, l) && (ke = 'onCompositionEnd')
            : e === 'keydown' && l.keyCode === 229 && (ke = 'onCompositionStart');
        (ke &&
          (vf &&
            l.locale !== 'ko' &&
            ($n || ke !== 'onCompositionStart'
              ? ke === 'onCompositionEnd' && $n && (ve = hf())
              : ((Hl = q), (Hs = 'value' in Hl ? Hl.value : Hl.textContent), ($n = !0))),
          (ie = Uu(D, ke)),
          0 < ie.length &&
            ((ke = new gf(ke, e, null, l, q)),
            X.push({ event: ke, listeners: ie }),
            ve ? (ke.data = ve) : ((ve = Ef(l)), ve !== null && (ke.data = ve)))),
          (ve = zg ? Bg(e, l) : Lg(e, l)) &&
            ((ke = Uu(D, 'onBeforeInput')),
            0 < ke.length &&
              ((ie = new gf('onBeforeInput', 'beforeinput', null, l, q)),
              X.push({ event: ie, listeners: ke }),
              (ie.data = ve))),
          C_(X, e, D, l, q));
      }
      sh(X, t);
    });
  }
  function pi(e, t, l) {
    return { instance: e, listener: t, currentTarget: l };
  }
  function Uu(e, t) {
    for (var l = t + 'Capture', n = []; e !== null; ) {
      var u = e,
        c = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          c === null ||
          ((u = Ba(e, l)),
          u != null && n.unshift(pi(e, u, c)),
          (u = Ba(e, t)),
          u != null && n.push(pi(e, u, c))),
        e.tag === 3)
      )
        return n;
      e = e.return;
    }
    return [];
  }
  function w_(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function oh(e, t, l, n, u) {
    for (var c = t._reactName, f = []; l !== null && l !== n; ) {
      var p = l,
        E = p.alternate,
        D = p.stateNode;
      if (((p = p.tag), E !== null && E === n)) break;
      ((p !== 5 && p !== 26 && p !== 27) ||
        D === null ||
        ((E = D),
        u
          ? ((D = Ba(l, c)), D != null && f.unshift(pi(l, D, E)))
          : u || ((D = Ba(l, c)), D != null && f.push(pi(l, D, E)))),
        (l = l.return));
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var O_ = /\r\n?/g,
    D_ = /\u0000|\uFFFD/g;
  function rh(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        O_,
        `
`
      )
      .replace(D_, '');
  }
  function fh(e, t) {
    return ((t = rh(t)), rh(e) === t);
  }
  function qe(e, t, l, n, u, c) {
    switch (l) {
      case 'children':
        typeof n == 'string'
          ? t === 'body' || (t === 'textarea' && n === '') || Hn(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && t !== 'body' && Hn(e, '' + n);
        break;
      case 'className':
        Yi(e, 'class', n);
        break;
      case 'tabIndex':
        Yi(e, 'tabindex', n);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Yi(e, l, n);
        break;
      case 'style':
        ff(e, n, c);
        break;
      case 'data':
        if (t !== 'object') {
          Yi(e, 'data', n);
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
          typeof c == 'function' &&
            (l === 'formAction'
              ? (t !== 'input' && qe(e, t, 'name', u.name, u, null),
                qe(e, t, 'formEncType', u.formEncType, u, null),
                qe(e, t, 'formMethod', u.formMethod, u, null),
                qe(e, t, 'formTarget', u.formTarget, u, null))
              : (qe(e, t, 'encType', u.encType, u, null),
                qe(e, t, 'method', u.method, u, null),
                qe(e, t, 'target', u.target, u, null)));
        if (n == null || typeof n == 'symbol' || typeof n == 'boolean') {
          e.removeAttribute(l);
          break;
        }
        ((n = Xi('' + n)), e.setAttribute(l, n));
        break;
      case 'onClick':
        n != null && (e.onclick = yl);
        break;
      case 'onScroll':
        n != null && xe('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && xe('scrollend', e);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(s(61));
          if (((l = n.__html), l != null)) {
            if (u.children != null) throw Error(s(60));
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
        (xe('beforetoggle', e), xe('toggle', e), Gi(e, 'popover', n));
        break;
      case 'xlinkActuate':
        pl(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', n);
        break;
      case 'xlinkArcrole':
        pl(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', n);
        break;
      case 'xlinkRole':
        pl(e, 'http://www.w3.org/1999/xlink', 'xlink:role', n);
        break;
      case 'xlinkShow':
        pl(e, 'http://www.w3.org/1999/xlink', 'xlink:show', n);
        break;
      case 'xlinkTitle':
        pl(e, 'http://www.w3.org/1999/xlink', 'xlink:title', n);
        break;
      case 'xlinkType':
        pl(e, 'http://www.w3.org/1999/xlink', 'xlink:type', n);
        break;
      case 'xmlBase':
        pl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', n);
        break;
      case 'xmlLang':
        pl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', n);
        break;
      case 'xmlSpace':
        pl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', n);
        break;
      case 'is':
        Gi(e, 'is', n);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < l.length) || (l[0] !== 'o' && l[0] !== 'O') || (l[1] !== 'n' && l[1] !== 'N')) &&
          ((l = cg.get(l) || l), Gi(e, l, n));
    }
  }
  function xo(e, t, l, n, u, c) {
    switch (l) {
      case 'style':
        ff(e, n, c);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(s(61));
          if (((l = n.__html), l != null)) {
            if (u.children != null) throw Error(s(60));
            e.innerHTML = l;
          }
        }
        break;
      case 'children':
        typeof n == 'string'
          ? Hn(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && Hn(e, '' + n);
        break;
      case 'onScroll':
        n != null && xe('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && xe('scrollend', e);
        break;
      case 'onClick':
        n != null && (e.onclick = yl);
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
        if (!tf.hasOwnProperty(l))
          e: {
            if (
              l[0] === 'o' &&
              l[1] === 'n' &&
              ((u = l.endsWith('Capture')),
              (t = l.slice(2, u ? l.length - 7 : void 0)),
              (c = e[bt] || null),
              (c = c != null ? c[l] : null),
              typeof c == 'function' && e.removeEventListener(t, c, u),
              typeof n == 'function')
            ) {
              (typeof c != 'function' &&
                c !== null &&
                (l in e ? (e[l] = null) : e.hasAttribute(l) && e.removeAttribute(l)),
                e.addEventListener(t, n, u));
              break e;
            }
            l in e ? (e[l] = n) : n === !0 ? e.setAttribute(l, '') : Gi(e, l, n);
          }
    }
  }
  function mt(e, t, l) {
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
          u = !1,
          c;
        for (c in l)
          if (l.hasOwnProperty(c)) {
            var f = l[c];
            if (f != null)
              switch (c) {
                case 'src':
                  n = !0;
                  break;
                case 'srcSet':
                  u = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(s(137, t));
                default:
                  qe(e, t, c, f, l, null);
              }
          }
        (u && qe(e, t, 'srcSet', l.srcSet, l, null), n && qe(e, t, 'src', l.src, l, null));
        return;
      case 'input':
        xe('invalid', e);
        var p = (c = f = u = null),
          E = null,
          D = null;
        for (n in l)
          if (l.hasOwnProperty(n)) {
            var q = l[n];
            if (q != null)
              switch (n) {
                case 'name':
                  u = q;
                  break;
                case 'type':
                  f = q;
                  break;
                case 'checked':
                  E = q;
                  break;
                case 'defaultChecked':
                  D = q;
                  break;
                case 'value':
                  c = q;
                  break;
                case 'defaultValue':
                  p = q;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (q != null) throw Error(s(137, t));
                  break;
                default:
                  qe(e, t, n, q, l, null);
              }
          }
        sf(e, c, p, E, D, f, u, !1);
        return;
      case 'select':
        (xe('invalid', e), (n = f = c = null));
        for (u in l)
          if (l.hasOwnProperty(u) && ((p = l[u]), p != null))
            switch (u) {
              case 'value':
                c = p;
                break;
              case 'defaultValue':
                f = p;
                break;
              case 'multiple':
                n = p;
              default:
                qe(e, t, u, p, l, null);
            }
        ((t = c),
          (l = f),
          (e.multiple = !!n),
          t != null ? qn(e, !!n, t, !1) : l != null && qn(e, !!n, l, !0));
        return;
      case 'textarea':
        (xe('invalid', e), (c = u = n = null));
        for (f in l)
          if (l.hasOwnProperty(f) && ((p = l[f]), p != null))
            switch (f) {
              case 'value':
                n = p;
                break;
              case 'defaultValue':
                u = p;
                break;
              case 'children':
                c = p;
                break;
              case 'dangerouslySetInnerHTML':
                if (p != null) throw Error(s(91));
                break;
              default:
                qe(e, t, f, p, l, null);
            }
        of(e, n, u, c);
        return;
      case 'option':
        for (E in l)
          if (l.hasOwnProperty(E) && ((n = l[E]), n != null))
            switch (E) {
              case 'selected':
                e.selected = n && typeof n != 'function' && typeof n != 'symbol';
                break;
              default:
                qe(e, t, E, n, l, null);
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
        for (n = 0; n < hi.length; n++) xe(hi[n], e);
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
        for (D in l)
          if (l.hasOwnProperty(D) && ((n = l[D]), n != null))
            switch (D) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(s(137, t));
              default:
                qe(e, t, D, n, l, null);
            }
        return;
      default:
        if (zs(t)) {
          for (q in l)
            l.hasOwnProperty(q) && ((n = l[q]), n !== void 0 && xo(e, t, q, n, l, void 0));
          return;
        }
    }
    for (p in l) l.hasOwnProperty(p) && ((n = l[p]), n != null && qe(e, t, p, n, l, null));
  }
  function z_(e, t, l, n) {
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
        var u = null,
          c = null,
          f = null,
          p = null,
          E = null,
          D = null,
          q = null;
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
                n.hasOwnProperty(B) || qe(e, t, B, null, n, X);
            }
        }
        for (var z in n) {
          var B = n[z];
          if (((X = l[z]), n.hasOwnProperty(z) && (B != null || X != null)))
            switch (z) {
              case 'type':
                c = B;
                break;
              case 'name':
                u = B;
                break;
              case 'checked':
                D = B;
                break;
              case 'defaultChecked':
                q = B;
                break;
              case 'value':
                f = B;
                break;
              case 'defaultValue':
                p = B;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (B != null) throw Error(s(137, t));
                break;
              default:
                B !== X && qe(e, t, z, B, n, X);
            }
        }
        Os(e, f, p, E, D, q, c, u);
        return;
      case 'select':
        B = f = p = z = null;
        for (c in l)
          if (((E = l[c]), l.hasOwnProperty(c) && E != null))
            switch (c) {
              case 'value':
                break;
              case 'multiple':
                B = E;
              default:
                n.hasOwnProperty(c) || qe(e, t, c, null, n, E);
            }
        for (u in n)
          if (((c = n[u]), (E = l[u]), n.hasOwnProperty(u) && (c != null || E != null)))
            switch (u) {
              case 'value':
                z = c;
                break;
              case 'defaultValue':
                p = c;
                break;
              case 'multiple':
                f = c;
              default:
                c !== E && qe(e, t, u, c, n, E);
            }
        ((t = p),
          (l = f),
          (n = B),
          z != null
            ? qn(e, !!l, z, !1)
            : !!n != !!l && (t != null ? qn(e, !!l, t, !0) : qn(e, !!l, l ? [] : '', !1)));
        return;
      case 'textarea':
        B = z = null;
        for (p in l)
          if (((u = l[p]), l.hasOwnProperty(p) && u != null && !n.hasOwnProperty(p)))
            switch (p) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                qe(e, t, p, null, n, u);
            }
        for (f in n)
          if (((u = n[f]), (c = l[f]), n.hasOwnProperty(f) && (u != null || c != null)))
            switch (f) {
              case 'value':
                z = u;
                break;
              case 'defaultValue':
                B = u;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== c && qe(e, t, f, u, n, c);
            }
        cf(e, z, B);
        return;
      case 'option':
        for (var ne in l)
          if (((z = l[ne]), l.hasOwnProperty(ne) && z != null && !n.hasOwnProperty(ne)))
            switch (ne) {
              case 'selected':
                e.selected = !1;
                break;
              default:
                qe(e, t, ne, null, n, z);
            }
        for (E in n)
          if (((z = n[E]), (B = l[E]), n.hasOwnProperty(E) && z !== B && (z != null || B != null)))
            switch (E) {
              case 'selected':
                e.selected = z && typeof z != 'function' && typeof z != 'symbol';
                break;
              default:
                qe(e, t, E, z, n, B);
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
            l.hasOwnProperty(re) && z != null && !n.hasOwnProperty(re) && qe(e, t, re, null, n, z));
        for (D in n)
          if (((z = n[D]), (B = l[D]), n.hasOwnProperty(D) && z !== B && (z != null || B != null)))
            switch (D) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (z != null) throw Error(s(137, t));
                break;
              default:
                qe(e, t, D, z, n, B);
            }
        return;
      default:
        if (zs(t)) {
          for (var He in l)
            ((z = l[He]),
              l.hasOwnProperty(He) &&
                z !== void 0 &&
                !n.hasOwnProperty(He) &&
                xo(e, t, He, void 0, n, z));
          for (q in n)
            ((z = n[q]),
              (B = l[q]),
              !n.hasOwnProperty(q) ||
                z === B ||
                (z === void 0 && B === void 0) ||
                xo(e, t, q, z, n, B));
          return;
        }
    }
    for (var M in l)
      ((z = l[M]),
        l.hasOwnProperty(M) && z != null && !n.hasOwnProperty(M) && qe(e, t, M, null, n, z));
    for (X in n)
      ((z = n[X]),
        (B = l[X]),
        !n.hasOwnProperty(X) || z === B || (z == null && B == null) || qe(e, t, X, z, n, B));
  }
  function dh(e) {
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
  function B_() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var e = 0, t = 0, l = performance.getEntriesByType('resource'), n = 0;
        n < l.length;
        n++
      ) {
        var u = l[n],
          c = u.transferSize,
          f = u.initiatorType,
          p = u.duration;
        if (c && p && dh(f)) {
          for (f = 0, p = u.responseEnd, n += 1; n < l.length; n++) {
            var E = l[n],
              D = E.startTime;
            if (D > p) break;
            var q = E.transferSize,
              X = E.initiatorType;
            q && dh(X) && ((E = E.responseEnd), (f += q * (E < p ? 1 : (p - D) / (E - D))));
          }
          if ((--n, (t += (8 * (c + f)) / (u.duration / 1e3)), e++, 10 < e)) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && ((e = navigator.connection.downlink), typeof e == 'number')
      ? e
      : 5;
  }
  var Eo = null,
    To = null;
  function qu(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function mh(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function hh(e, t) {
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
  function No(e, t) {
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
  var ko = null;
  function L_() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === ko ? !1 : ((ko = e), !0)) : ((ko = null), !1);
  }
  var ph = typeof setTimeout == 'function' ? setTimeout : void 0,
    U_ = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    yh = typeof Promise == 'function' ? Promise : void 0,
    q_ =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof yh < 'u'
          ? function (e) {
              return yh.resolve(null).then(e).catch(H_);
            }
          : ph;
  function H_(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function nn(e) {
    return e === 'head';
  }
  function gh(e, t) {
    var l = t,
      n = 0;
    do {
      var u = l.nextSibling;
      if ((e.removeChild(l), u && u.nodeType === 8))
        if (((l = u.data), l === '/$' || l === '/&')) {
          if (n === 0) {
            (e.removeChild(u), ga(t));
            return;
          }
          n--;
        } else if (l === '$' || l === '$?' || l === '$~' || l === '$!' || l === '&') n++;
        else if (l === 'html') yi(e.ownerDocument.documentElement);
        else if (l === 'head') {
          ((l = e.ownerDocument.head), yi(l));
          for (var c = l.firstChild; c; ) {
            var f = c.nextSibling,
              p = c.nodeName;
            (c[Da] ||
              p === 'SCRIPT' ||
              p === 'STYLE' ||
              (p === 'LINK' && c.rel.toLowerCase() === 'stylesheet') ||
              l.removeChild(c),
              (c = f));
          }
        } else l === 'body' && yi(e.ownerDocument.body);
      l = u;
    } while (l);
    ga(t);
  }
  function _h(e, t) {
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
  function Ao(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (((t = t.nextSibling), l.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (Ao(l), Rs(l));
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
  function G_(e, t, l, n) {
    for (; e.nodeType === 1; ) {
      var u = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!n && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (n) {
        if (!e[Da])
          switch (t) {
            case 'meta':
              if (!e.hasAttribute('itemprop')) break;
              return e;
            case 'link':
              if (
                ((c = e.getAttribute('rel')),
                c === 'stylesheet' && e.hasAttribute('data-precedence'))
              )
                break;
              if (
                c !== u.rel ||
                e.getAttribute('href') !== (u.href == null || u.href === '' ? null : u.href) ||
                e.getAttribute('crossorigin') !== (u.crossOrigin == null ? null : u.crossOrigin) ||
                e.getAttribute('title') !== (u.title == null ? null : u.title)
              )
                break;
              return e;
            case 'style':
              if (e.hasAttribute('data-precedence')) break;
              return e;
            case 'script':
              if (
                ((c = e.getAttribute('src')),
                (c !== (u.src == null ? null : u.src) ||
                  e.getAttribute('type') !== (u.type == null ? null : u.type) ||
                  e.getAttribute('crossorigin') !==
                    (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  c &&
                  e.hasAttribute('async') &&
                  !e.hasAttribute('itemprop'))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === 'input' && e.type === 'hidden') {
        var c = u.name == null ? null : '' + u.name;
        if (u.type === 'hidden' && e.getAttribute('name') === c) return e;
      } else return e;
      if (((e = Zt(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function Y_(e, t, l) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !l) ||
        ((e = Zt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function vh(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = Zt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Co(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function jo(e) {
    return e.data === '$!' || (e.data === '$?' && e.ownerDocument.readyState !== 'loading');
  }
  function $_(e, t) {
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
  function Zt(e) {
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
  var Mo = null;
  function bh(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === '/$' || l === '/&') {
          if (t === 0) return Zt(e.nextSibling);
          t--;
        } else (l !== '$' && l !== '$!' && l !== '$?' && l !== '$~' && l !== '&') || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Sh(e) {
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
  function xh(e, t, l) {
    switch (((t = qu(l)), e)) {
      case 'html':
        if (((e = t.documentElement), !e)) throw Error(s(452));
        return e;
      case 'head':
        if (((e = t.head), !e)) throw Error(s(453));
        return e;
      case 'body':
        if (((e = t.body), !e)) throw Error(s(454));
        return e;
      default:
        throw Error(s(451));
    }
  }
  function yi(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    Rs(e);
  }
  var Kt = new Map(),
    Eh = new Set();
  function Hu(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var wl = K.d;
  K.d = { f: X_, r: V_, D: Q_, C: Z_, L: K_, m: I_, X: W_, S: J_, M: F_ };
  function X_() {
    var e = wl.f(),
      t = Ru();
    return e || t;
  }
  function V_(e) {
    var t = Bn(e);
    t !== null && t.tag === 5 && t.type === 'form' ? Hd(t) : wl.r(e);
  }
  var ha = typeof document > 'u' ? null : document;
  function Th(e, t, l) {
    var n = ha;
    if (n && typeof t == 'string' && t) {
      var u = Ht(t);
      ((u = 'link[rel="' + e + '"][href="' + u + '"]'),
        typeof l == 'string' && (u += '[crossorigin="' + l + '"]'),
        Eh.has(u) ||
          (Eh.add(u),
          (e = { rel: e, crossOrigin: l, href: t }),
          n.querySelector(u) === null &&
            ((t = n.createElement('link')), mt(t, 'link', e), st(t), n.head.appendChild(t))));
    }
  }
  function Q_(e) {
    (wl.D(e), Th('dns-prefetch', e, null));
  }
  function Z_(e, t) {
    (wl.C(e, t), Th('preconnect', e, t));
  }
  function K_(e, t, l) {
    wl.L(e, t, l);
    var n = ha;
    if (n && e && t) {
      var u = 'link[rel="preload"][as="' + Ht(t) + '"]';
      t === 'image' && l && l.imageSrcSet
        ? ((u += '[imagesrcset="' + Ht(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == 'string' && (u += '[imagesizes="' + Ht(l.imageSizes) + '"]'))
        : (u += '[href="' + Ht(e) + '"]');
      var c = u;
      switch (t) {
        case 'style':
          c = pa(e);
          break;
        case 'script':
          c = ya(e);
      }
      Kt.has(c) ||
        ((e = b(
          { rel: 'preload', href: t === 'image' && l && l.imageSrcSet ? void 0 : e, as: t },
          l
        )),
        Kt.set(c, e),
        n.querySelector(u) !== null ||
          (t === 'style' && n.querySelector(gi(c))) ||
          (t === 'script' && n.querySelector(_i(c))) ||
          ((t = n.createElement('link')), mt(t, 'link', e), st(t), n.head.appendChild(t)));
    }
  }
  function I_(e, t) {
    wl.m(e, t);
    var l = ha;
    if (l && e) {
      var n = t && typeof t.as == 'string' ? t.as : 'script',
        u = 'link[rel="modulepreload"][as="' + Ht(n) + '"][href="' + Ht(e) + '"]',
        c = u;
      switch (n) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          c = ya(e);
      }
      if (
        !Kt.has(c) &&
        ((e = b({ rel: 'modulepreload', href: e }, t)), Kt.set(c, e), l.querySelector(u) === null)
      ) {
        switch (n) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (l.querySelector(_i(c))) return;
        }
        ((n = l.createElement('link')), mt(n, 'link', e), st(n), l.head.appendChild(n));
      }
    }
  }
  function J_(e, t, l) {
    wl.S(e, t, l);
    var n = ha;
    if (n && e) {
      var u = Ln(n).hoistableStyles,
        c = pa(e);
      t = t || 'default';
      var f = u.get(c);
      if (!f) {
        var p = { loading: 0, preload: null };
        if ((f = n.querySelector(gi(c)))) p.loading = 5;
        else {
          ((e = b({ rel: 'stylesheet', href: e, 'data-precedence': t }, l)),
            (l = Kt.get(c)) && Ro(e, l));
          var E = (f = n.createElement('link'));
          (st(E),
            mt(E, 'link', e),
            (E._p = new Promise(function (D, q) {
              ((E.onload = D), (E.onerror = q));
            })),
            E.addEventListener('load', function () {
              p.loading |= 1;
            }),
            E.addEventListener('error', function () {
              p.loading |= 2;
            }),
            (p.loading |= 4),
            Gu(f, t, n));
        }
        ((f = { type: 'stylesheet', instance: f, count: 1, state: p }), u.set(c, f));
      }
    }
  }
  function W_(e, t) {
    wl.X(e, t);
    var l = ha;
    if (l && e) {
      var n = Ln(l).hoistableScripts,
        u = ya(e),
        c = n.get(u);
      c ||
        ((c = l.querySelector(_i(u))),
        c ||
          ((e = b({ src: e, async: !0 }, t)),
          (t = Kt.get(u)) && wo(e, t),
          (c = l.createElement('script')),
          st(c),
          mt(c, 'link', e),
          l.head.appendChild(c)),
        (c = { type: 'script', instance: c, count: 1, state: null }),
        n.set(u, c));
    }
  }
  function F_(e, t) {
    wl.M(e, t);
    var l = ha;
    if (l && e) {
      var n = Ln(l).hoistableScripts,
        u = ya(e),
        c = n.get(u);
      c ||
        ((c = l.querySelector(_i(u))),
        c ||
          ((e = b({ src: e, async: !0, type: 'module' }, t)),
          (t = Kt.get(u)) && wo(e, t),
          (c = l.createElement('script')),
          st(c),
          mt(c, 'link', e),
          l.head.appendChild(c)),
        (c = { type: 'script', instance: c, count: 1, state: null }),
        n.set(u, c));
    }
  }
  function Nh(e, t, l, n) {
    var u = (u = be.current) ? Hu(u) : null;
    if (!u) throw Error(s(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof l.precedence == 'string' && typeof l.href == 'string'
          ? ((t = pa(l.href)),
            (l = Ln(u).hoistableStyles),
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
          e = pa(l.href);
          var c = Ln(u).hoistableStyles,
            f = c.get(e);
          if (
            (f ||
              ((u = u.ownerDocument || u),
              (f = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              c.set(e, f),
              (c = u.querySelector(gi(e))) && !c._p && ((f.instance = c), (f.state.loading = 5)),
              Kt.has(e) ||
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
                Kt.set(e, l),
                c || P_(u, e, l, f.state))),
            t && n === null)
          )
            throw Error(s(528, ''));
          return f;
        }
        if (t && n !== null) throw Error(s(529, ''));
        return null;
      case 'script':
        return (
          (t = l.async),
          (l = l.src),
          typeof l == 'string' && t && typeof t != 'function' && typeof t != 'symbol'
            ? ((t = ya(l)),
              (l = Ln(u).hoistableScripts),
              (n = l.get(t)),
              n || ((n = { type: 'script', instance: null, count: 0, state: null }), l.set(t, n)),
              n)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(s(444, e));
    }
  }
  function pa(e) {
    return 'href="' + Ht(e) + '"';
  }
  function gi(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function kh(e) {
    return b({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function P_(e, t, l, n) {
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
        mt(t, 'link', l),
        st(t),
        e.head.appendChild(t));
  }
  function ya(e) {
    return '[src="' + Ht(e) + '"]';
  }
  function _i(e) {
    return 'script[async]' + e;
  }
  function Ah(e, t, l) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var n = e.querySelector('style[data-href~="' + Ht(l.href) + '"]');
          if (n) return ((t.instance = n), st(n), n);
          var u = b({}, l, {
            'data-href': l.href,
            'data-precedence': l.precedence,
            href: null,
            precedence: null,
          });
          return (
            (n = (e.ownerDocument || e).createElement('style')),
            st(n),
            mt(n, 'style', u),
            Gu(n, l.precedence, e),
            (t.instance = n)
          );
        case 'stylesheet':
          u = pa(l.href);
          var c = e.querySelector(gi(u));
          if (c) return ((t.state.loading |= 4), (t.instance = c), st(c), c);
          ((n = kh(l)),
            (u = Kt.get(u)) && Ro(n, u),
            (c = (e.ownerDocument || e).createElement('link')),
            st(c));
          var f = c;
          return (
            (f._p = new Promise(function (p, E) {
              ((f.onload = p), (f.onerror = E));
            })),
            mt(c, 'link', n),
            (t.state.loading |= 4),
            Gu(c, l.precedence, e),
            (t.instance = c)
          );
        case 'script':
          return (
            (c = ya(l.src)),
            (u = e.querySelector(_i(c)))
              ? ((t.instance = u), st(u), u)
              : ((n = l),
                (u = Kt.get(c)) && ((n = b({}, l)), wo(n, u)),
                (e = e.ownerDocument || e),
                (u = e.createElement('script')),
                st(u),
                mt(u, 'link', n),
                e.head.appendChild(u),
                (t.instance = u))
          );
        case 'void':
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === 'stylesheet' &&
        (t.state.loading & 4) === 0 &&
        ((n = t.instance), (t.state.loading |= 4), Gu(n, l.precedence, e));
    return t.instance;
  }
  function Gu(e, t, l) {
    for (
      var n = l.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        u = n.length ? n[n.length - 1] : null,
        c = u,
        f = 0;
      f < n.length;
      f++
    ) {
      var p = n[f];
      if (p.dataset.precedence === t) c = p;
      else if (c !== u) break;
    }
    c
      ? c.parentNode.insertBefore(e, c.nextSibling)
      : ((t = l.nodeType === 9 ? l.head : l), t.insertBefore(e, t.firstChild));
  }
  function Ro(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function wo(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var Yu = null;
  function Ch(e, t, l) {
    if (Yu === null) {
      var n = new Map(),
        u = (Yu = new Map());
      u.set(l, n);
    } else ((u = Yu), (n = u.get(l)), n || ((n = new Map()), u.set(l, n)));
    if (n.has(e)) return n;
    for (n.set(e, null), l = l.getElementsByTagName(e), u = 0; u < l.length; u++) {
      var c = l[u];
      if (
        !(c[Da] || c[ot] || (e === 'link' && c.getAttribute('rel') === 'stylesheet')) &&
        c.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var f = c.getAttribute(t) || '';
        f = e + f;
        var p = n.get(f);
        p ? p.push(c) : n.set(f, [c]);
      }
    }
    return n;
  }
  function jh(e, t, l) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(l, t === 'title' ? e.querySelector('head > title') : null));
  }
  function e0(e, t, l) {
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
  function Mh(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  function t0(e, t, l, n) {
    if (
      l.type === 'stylesheet' &&
      (typeof n.media != 'string' || matchMedia(n.media).matches !== !1) &&
      (l.state.loading & 4) === 0
    ) {
      if (l.instance === null) {
        var u = pa(n.href),
          c = t.querySelector(gi(u));
        if (c) {
          ((t = c._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = $u.bind(e)), t.then(e, e)),
            (l.state.loading |= 4),
            (l.instance = c),
            st(c));
          return;
        }
        ((c = t.ownerDocument || t),
          (n = kh(n)),
          (u = Kt.get(u)) && Ro(n, u),
          (c = c.createElement('link')),
          st(c));
        var f = c;
        ((f._p = new Promise(function (p, E) {
          ((f.onload = p), (f.onerror = E));
        })),
          mt(c, 'link', n),
          (l.instance = c));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(l, t),
        (t = l.state.preload) &&
          (l.state.loading & 3) === 0 &&
          (e.count++,
          (l = $u.bind(e)),
          t.addEventListener('load', l),
          t.addEventListener('error', l)));
    }
  }
  var Oo = 0;
  function l0(e, t) {
    return (
      e.stylesheets && e.count === 0 && Vu(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (l) {
            var n = setTimeout(function () {
              if ((e.stylesheets && Vu(e, e.stylesheets), e.unsuspend)) {
                var c = e.unsuspend;
                ((e.unsuspend = null), c());
              }
            }, 6e4 + t);
            0 < e.imgBytes && Oo === 0 && (Oo = 62500 * B_());
            var u = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 && (e.stylesheets && Vu(e, e.stylesheets), e.unsuspend))
                ) {
                  var c = e.unsuspend;
                  ((e.unsuspend = null), c());
                }
              },
              (e.imgBytes > Oo ? 50 : 800) + t
            );
            return (
              (e.unsuspend = l),
              function () {
                ((e.unsuspend = null), clearTimeout(n), clearTimeout(u));
              }
            );
          }
        : null
    );
  }
  function $u() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) Vu(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var Xu = null;
  function Vu(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++, (Xu = new Map()), t.forEach(n0, e), (Xu = null), $u.call(e)));
  }
  function n0(e, t) {
    if (!(t.state.loading & 4)) {
      var l = Xu.get(e);
      if (l) var n = l.get(null);
      else {
        ((l = new Map()), Xu.set(e, l));
        for (
          var u = e.querySelectorAll('link[data-precedence],style[data-precedence]'), c = 0;
          c < u.length;
          c++
        ) {
          var f = u[c];
          (f.nodeName === 'LINK' || f.getAttribute('media') !== 'not all') &&
            (l.set(f.dataset.precedence, f), (n = f));
        }
        n && l.set(null, n);
      }
      ((u = t.instance),
        (f = u.getAttribute('data-precedence')),
        (c = l.get(f) || n),
        c === n && l.set(null, u),
        l.set(f, u),
        this.count++,
        (n = $u.bind(this)),
        u.addEventListener('load', n),
        u.addEventListener('error', n),
        c
          ? c.parentNode.insertBefore(u, c.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(u, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var vi = {
    $$typeof: Q,
    Provider: null,
    Consumer: null,
    _currentValue: te,
    _currentValue2: te,
    _threadCount: 0,
  };
  function a0(e, t, l, n, u, c, f, p, E) {
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
      (this.expirationTimes = As(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = As(0)),
      (this.hiddenUpdates = As(null)),
      (this.identifierPrefix = n),
      (this.onUncaughtError = u),
      (this.onCaughtError = c),
      (this.onRecoverableError = f),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = E),
      (this.incompleteTransitions = new Map()));
  }
  function Rh(e, t, l, n, u, c, f, p, E, D, q, X) {
    return (
      (e = new a0(e, t, l, f, E, D, q, X, p)),
      (t = 1),
      c === !0 && (t |= 24),
      (c = Rt(3, null, null, t)),
      (e.current = c),
      (c.stateNode = e),
      (t = fc()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (c.memoizedState = { element: n, isDehydrated: l, cache: t }),
      pc(c),
      e
    );
  }
  function wh(e) {
    return e ? ((e = Zn), e) : Zn;
  }
  function Oh(e, t, l, n, u, c) {
    ((u = wh(u)),
      n.context === null ? (n.context = u) : (n.pendingContext = u),
      (n = Ql(t)),
      (n.payload = { element: l }),
      (c = c === void 0 ? null : c),
      c !== null && (n.callback = c),
      (l = Zl(e, n, t)),
      l !== null && (kt(l, e, t), Wa(l, e, t)));
  }
  function Dh(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function Do(e, t) {
    (Dh(e, t), (e = e.alternate) && Dh(e, t));
  }
  function zh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = _n(e, 67108864);
      (t !== null && kt(t, e, 67108864), Do(e, 67108864));
    }
  }
  function Bh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Bt();
      t = Cs(t);
      var l = _n(e, t);
      (l !== null && kt(l, e, t), Do(e, t));
    }
  }
  var Qu = !0;
  function i0(e, t, l, n) {
    var u = L.T;
    L.T = null;
    var c = K.p;
    try {
      ((K.p = 2), zo(e, t, l, n));
    } finally {
      ((K.p = c), (L.T = u));
    }
  }
  function u0(e, t, l, n) {
    var u = L.T;
    L.T = null;
    var c = K.p;
    try {
      ((K.p = 8), zo(e, t, l, n));
    } finally {
      ((K.p = c), (L.T = u));
    }
  }
  function zo(e, t, l, n) {
    if (Qu) {
      var u = Bo(n);
      if (u === null) (So(e, t, n, Zu, l), Uh(e, n));
      else if (c0(u, e, t, l, n)) n.stopPropagation();
      else if ((Uh(e, n), t & 4 && -1 < s0.indexOf(e))) {
        for (; u !== null; ) {
          var c = Bn(u);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (((c = c.stateNode), c.current.memoizedState.isDehydrated)) {
                  var f = mn(c.pendingLanes);
                  if (f !== 0) {
                    var p = c;
                    for (p.pendingLanes |= 2, p.entangledLanes |= 2; f; ) {
                      var E = 1 << (31 - jt(f));
                      ((p.entanglements[1] |= E), (f &= ~E));
                    }
                    (fl(c), (we & 6) === 0 && ((ju = At() + 500), mi(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((p = _n(c, 2)), p !== null && kt(p, c, 2), Ru(), Do(c, 2));
            }
          if (((c = Bo(n)), c === null && So(e, t, n, Zu, l), c === u)) break;
          u = c;
        }
        u !== null && n.stopPropagation();
      } else So(e, t, n, null, l);
    }
  }
  function Bo(e) {
    return ((e = Ls(e)), Lo(e));
  }
  var Zu = null;
  function Lo(e) {
    if (((Zu = null), (e = zn(e)), e !== null)) {
      var t = d(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (((e = h(t)), e !== null)) return e;
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
    return ((Zu = e), null);
  }
  function Lh(e) {
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
        switch (Qy()) {
          case Xr:
            return 2;
          case Vr:
            return 8;
          case Bi:
          case Zy:
            return 32;
          case Qr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Uo = !1,
    an = null,
    un = null,
    sn = null,
    bi = new Map(),
    Si = new Map(),
    cn = [],
    s0 =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function Uh(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        an = null;
        break;
      case 'dragenter':
      case 'dragleave':
        un = null;
        break;
      case 'mouseover':
      case 'mouseout':
        sn = null;
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
  function xi(e, t, l, n, u, c) {
    return e === null || e.nativeEvent !== c
      ? ((e = {
          blockedOn: t,
          domEventName: l,
          eventSystemFlags: n,
          nativeEvent: c,
          targetContainers: [u],
        }),
        t !== null && ((t = Bn(t)), t !== null && zh(t)),
        e)
      : ((e.eventSystemFlags |= n),
        (t = e.targetContainers),
        u !== null && t.indexOf(u) === -1 && t.push(u),
        e);
  }
  function c0(e, t, l, n, u) {
    switch (t) {
      case 'focusin':
        return ((an = xi(an, e, t, l, n, u)), !0);
      case 'dragenter':
        return ((un = xi(un, e, t, l, n, u)), !0);
      case 'mouseover':
        return ((sn = xi(sn, e, t, l, n, u)), !0);
      case 'pointerover':
        var c = u.pointerId;
        return (bi.set(c, xi(bi.get(c) || null, e, t, l, n, u)), !0);
      case 'gotpointercapture':
        return ((c = u.pointerId), Si.set(c, xi(Si.get(c) || null, e, t, l, n, u)), !0);
    }
    return !1;
  }
  function qh(e) {
    var t = zn(e.target);
    if (t !== null) {
      var l = d(t);
      if (l !== null) {
        if (((t = l.tag), t === 13)) {
          if (((t = h(l)), t !== null)) {
            ((e.blockedOn = t),
              Fr(e.priority, function () {
                Bh(l);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = v(l)), t !== null)) {
            ((e.blockedOn = t),
              Fr(e.priority, function () {
                Bh(l);
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
      var l = Bo(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var n = new l.constructor(l.type, l);
        ((Bs = n), l.target.dispatchEvent(n), (Bs = null));
      } else return ((t = Bn(l)), t !== null && zh(t), (e.blockedOn = l), !1);
      t.shift();
    }
    return !0;
  }
  function Hh(e, t, l) {
    Ku(e) && l.delete(t);
  }
  function o0() {
    ((Uo = !1),
      an !== null && Ku(an) && (an = null),
      un !== null && Ku(un) && (un = null),
      sn !== null && Ku(sn) && (sn = null),
      bi.forEach(Hh),
      Si.forEach(Hh));
  }
  function Iu(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Uo || ((Uo = !0), a.unstable_scheduleCallback(a.unstable_NormalPriority, o0)));
  }
  var Ju = null;
  function Gh(e) {
    Ju !== e &&
      ((Ju = e),
      a.unstable_scheduleCallback(a.unstable_NormalPriority, function () {
        Ju === e && (Ju = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t],
            n = e[t + 1],
            u = e[t + 2];
          if (typeof n != 'function') {
            if (Lo(n || l) === null) continue;
            break;
          }
          var c = Bn(l);
          c !== null &&
            (e.splice(t, 3),
            (t -= 3),
            zc(c, { pending: !0, data: u, method: l.method, action: n }, n, u));
        }
      }));
  }
  function ga(e) {
    function t(E) {
      return Iu(E, e);
    }
    (an !== null && Iu(an, e),
      un !== null && Iu(un, e),
      sn !== null && Iu(sn, e),
      bi.forEach(t),
      Si.forEach(t));
    for (var l = 0; l < cn.length; l++) {
      var n = cn[l];
      n.blockedOn === e && (n.blockedOn = null);
    }
    for (; 0 < cn.length && ((l = cn[0]), l.blockedOn === null); )
      (qh(l), l.blockedOn === null && cn.shift());
    if (((l = (e.ownerDocument || e).$$reactFormReplay), l != null))
      for (n = 0; n < l.length; n += 3) {
        var u = l[n],
          c = l[n + 1],
          f = u[bt] || null;
        if (typeof c == 'function') f || Gh(l);
        else if (f) {
          var p = null;
          if (c && c.hasAttribute('formAction')) {
            if (((u = c), (f = c[bt] || null))) p = f.formAction;
            else if (Lo(u) !== null) continue;
          } else p = f.action;
          (typeof p == 'function' ? (l[n + 1] = p) : (l.splice(n, 3), (n -= 3)), Gh(l));
        }
      }
  }
  function Yh() {
    function e(c) {
      c.canIntercept &&
        c.info === 'react-transition' &&
        c.intercept({
          handler: function () {
            return new Promise(function (f) {
              return (u = f);
            });
          },
          focusReset: 'manual',
          scroll: 'manual',
        });
    }
    function t() {
      (u !== null && (u(), (u = null)), n || setTimeout(l, 20));
    }
    function l() {
      if (!n && !navigation.transition) {
        var c = navigation.currentEntry;
        c &&
          c.url != null &&
          navigation.navigate(c.url, {
            state: c.getState(),
            info: 'react-transition',
            history: 'replace',
          });
      }
    }
    if (typeof navigation == 'object') {
      var n = !1,
        u = null;
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
            u !== null && (u(), (u = null)));
        }
      );
    }
  }
  function qo(e) {
    this._internalRoot = e;
  }
  ((Wu.prototype.render = qo.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(s(409));
      var l = t.current,
        n = Bt();
      Oh(l, n, e, t, null, null);
    }),
    (Wu.prototype.unmount = qo.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (Oh(e.current, 2, null, e, null, null), Ru(), (t[Dn] = null));
        }
      }));
  function Wu(e) {
    this._internalRoot = e;
  }
  Wu.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Wr();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < cn.length && t !== 0 && t < cn[l].priority; l++);
      (cn.splice(l, 0, e), l === 0 && qh(e));
    }
  };
  var $h = i.version;
  if ($h !== '19.2.5') throw Error(s(527, $h, '19.2.5'));
  K.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(s(188))
        : ((e = Object.keys(e).join(',')), Error(s(268, e)));
    return ((e = y(t)), (e = e !== null ? _(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var r0 = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: L,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Fu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Fu.isDisabled && Fu.supportsFiber)
      try {
        ((Ra = Fu.inject(r0)), (Ct = Fu));
      } catch {}
  }
  return (
    (Ti.createRoot = function (e, t) {
      if (!r(e)) throw Error(s(299));
      var l = !1,
        n = '',
        u = Jd,
        c = Wd,
        f = Fd;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (l = !0),
          t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (u = t.onUncaughtError),
          t.onCaughtError !== void 0 && (c = t.onCaughtError),
          t.onRecoverableError !== void 0 && (f = t.onRecoverableError)),
        (t = Rh(e, 1, !1, null, null, l, n, null, u, c, f, Yh)),
        (e[Dn] = t.current),
        bo(e),
        new qo(t)
      );
    }),
    (Ti.hydrateRoot = function (e, t, l) {
      if (!r(e)) throw Error(s(299));
      var n = !1,
        u = '',
        c = Jd,
        f = Wd,
        p = Fd,
        E = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (n = !0),
          l.identifierPrefix !== void 0 && (u = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (c = l.onUncaughtError),
          l.onCaughtError !== void 0 && (f = l.onCaughtError),
          l.onRecoverableError !== void 0 && (p = l.onRecoverableError),
          l.formState !== void 0 && (E = l.formState)),
        (t = Rh(e, 1, !0, t, l ?? null, n, u, E, c, f, p, Yh)),
        (t.context = wh(null)),
        (l = t.current),
        (n = Bt()),
        (n = Cs(n)),
        (u = Ql(n)),
        (u.callback = null),
        Zl(l, u, n),
        (l = n),
        (t.current.lanes = l),
        Oa(t, l),
        fl(t),
        (e[Dn] = t.current),
        bo(e),
        new Wu(t)
      );
    }),
    (Ti.version = '19.2.5'),
    Ti
  );
}
var Ph;
function x0() {
  if (Ph) return Yo.exports;
  Ph = 1;
  function a() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (i) {
        console.error(i);
      }
  }
  return (a(), (Yo.exports = S0()), Yo.exports);
}
var E0 = x0(),
  T = vr();
/**
 * react-router v7.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var ep = 'popstate';
function tp(a) {
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
function T0(a = {}) {
  function i(s, r) {
    var y;
    let d = (y = r.state) == null ? void 0 : y.masked,
      { pathname: h, search: v, hash: g } = d || s.location;
    return sr(
      '',
      { pathname: h, search: v, hash: g },
      (r.state && r.state.usr) || null,
      (r.state && r.state.key) || 'default',
      d
        ? { pathname: s.location.pathname, search: s.location.search, hash: s.location.hash }
        : void 0
    );
  }
  function o(s, r) {
    return typeof r == 'string' ? r : Mi(r);
  }
  return k0(i, o, null, a);
}
function Ze(a, i) {
  if (a === !1 || a === null || typeof a > 'u') throw new Error(i);
}
function al(a, i) {
  if (!a) {
    typeof console < 'u' && console.warn(i);
    try {
      throw new Error(i);
    } catch {}
  }
}
function N0() {
  return Math.random().toString(36).substring(2, 10);
}
function lp(a, i) {
  return {
    usr: a.state,
    key: a.key,
    idx: i,
    masked: a.unstable_mask ? { pathname: a.pathname, search: a.search, hash: a.hash } : void 0,
  };
}
function sr(a, i, o = null, s, r) {
  return {
    pathname: typeof a == 'string' ? a : a.pathname,
    search: '',
    hash: '',
    ...(typeof i == 'string' ? ka(i) : i),
    state: o,
    key: (i && i.key) || s || N0(),
    unstable_mask: r,
  };
}
function Mi({ pathname: a = '/', search: i = '', hash: o = '' }) {
  return (
    i && i !== '?' && (a += i.charAt(0) === '?' ? i : '?' + i),
    o && o !== '#' && (a += o.charAt(0) === '#' ? o : '#' + o),
    a
  );
}
function ka(a) {
  let i = {};
  if (a) {
    let o = a.indexOf('#');
    o >= 0 && ((i.hash = a.substring(o)), (a = a.substring(0, o)));
    let s = a.indexOf('?');
    (s >= 0 && ((i.search = a.substring(s)), (a = a.substring(0, s))), a && (i.pathname = a));
  }
  return i;
}
function k0(a, i, o, s = {}) {
  let { window: r = document.defaultView, v5Compat: d = !1 } = s,
    h = r.history,
    v = 'POP',
    g = null,
    y = _();
  y == null && ((y = 0), h.replaceState({ ...h.state, idx: y }, ''));
  function _() {
    return (h.state || { idx: null }).idx;
  }
  function b() {
    v = 'POP';
    let j = _(),
      A = j == null ? null : j - y;
    ((y = j), g && g({ action: v, location: w.location, delta: A }));
  }
  function x(j, A) {
    v = 'PUSH';
    let k = tp(j) ? j : sr(w.location, j, A);
    y = _() + 1;
    let Q = lp(k, y),
      P = w.createHref(k.unstable_mask || k);
    try {
      h.pushState(Q, '', P);
    } catch (ee) {
      if (ee instanceof DOMException && ee.name === 'DataCloneError') throw ee;
      r.location.assign(P);
    }
    d && g && g({ action: v, location: w.location, delta: 1 });
  }
  function R(j, A) {
    v = 'REPLACE';
    let k = tp(j) ? j : sr(w.location, j, A);
    y = _();
    let Q = lp(k, y),
      P = w.createHref(k.unstable_mask || k);
    (h.replaceState(Q, '', P), d && g && g({ action: v, location: w.location, delta: 0 }));
  }
  function S(j) {
    return A0(j);
  }
  let w = {
    get action() {
      return v;
    },
    get location() {
      return a(r, h);
    },
    listen(j) {
      if (g) throw new Error('A history only accepts one active listener');
      return (
        r.addEventListener(ep, b),
        (g = j),
        () => {
          (r.removeEventListener(ep, b), (g = null));
        }
      );
    },
    createHref(j) {
      return i(r, j);
    },
    createURL: S,
    encodeLocation(j) {
      let A = S(j);
      return { pathname: A.pathname, search: A.search, hash: A.hash };
    },
    push: x,
    replace: R,
    go(j) {
      return h.go(j);
    },
  };
  return w;
}
function A0(a, i = !1) {
  let o = 'http://localhost';
  (typeof window < 'u' &&
    (o = window.location.origin !== 'null' ? window.location.origin : window.location.href),
    Ze(o, 'No window.location.(origin|href) available to create URL'));
  let s = typeof a == 'string' ? a : Mi(a);
  return ((s = s.replace(/ $/, '%20')), !i && s.startsWith('//') && (s = o + s), new URL(s, o));
}
function Mp(a, i, o = '/') {
  return C0(a, i, o, !1);
}
function C0(a, i, o, s) {
  let r = typeof i == 'string' ? ka(i) : i,
    d = zl(r.pathname || '/', o);
  if (d == null) return null;
  let h = Rp(a);
  j0(h);
  let v = null;
  for (let g = 0; v == null && g < h.length; ++g) {
    let y = H0(d);
    v = U0(h[g], y, s);
  }
  return v;
}
function Rp(a, i = [], o = [], s = '', r = !1) {
  let d = (h, v, g = r, y) => {
    let _ = {
      relativePath: y === void 0 ? h.path || '' : y,
      caseSensitive: h.caseSensitive === !0,
      childrenIndex: v,
      route: h,
    };
    if (_.relativePath.startsWith('/')) {
      if (!_.relativePath.startsWith(s) && g) return;
      (Ze(
        _.relativePath.startsWith(s),
        `Absolute route path "${_.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (_.relativePath = _.relativePath.slice(s.length)));
    }
    let b = nl([s, _.relativePath]),
      x = o.concat(_);
    (h.children &&
      h.children.length > 0 &&
      (Ze(
        h.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${b}".`
      ),
      Rp(h.children, i, x, b, g)),
      !(h.path == null && !h.index) && i.push({ path: b, score: B0(b, h.index), routesMeta: x }));
  };
  return (
    a.forEach((h, v) => {
      var g;
      if (h.path === '' || !((g = h.path) != null && g.includes('?'))) d(h, v);
      else for (let y of wp(h.path)) d(h, v, !0, y);
    }),
    i
  );
}
function wp(a) {
  let i = a.split('/');
  if (i.length === 0) return [];
  let [o, ...s] = i,
    r = o.endsWith('?'),
    d = o.replace(/\?$/, '');
  if (s.length === 0) return r ? [d, ''] : [d];
  let h = wp(s.join('/')),
    v = [];
  return (
    v.push(...h.map((g) => (g === '' ? d : [d, g].join('/')))),
    r && v.push(...h),
    v.map((g) => (a.startsWith('/') && g === '' ? '/' : g))
  );
}
function j0(a) {
  a.sort((i, o) =>
    i.score !== o.score
      ? o.score - i.score
      : L0(
          i.routesMeta.map((s) => s.childrenIndex),
          o.routesMeta.map((s) => s.childrenIndex)
        )
  );
}
var M0 = /^:[\w-]+$/,
  R0 = 3,
  w0 = 2,
  O0 = 1,
  D0 = 10,
  z0 = -2,
  np = (a) => a === '*';
function B0(a, i) {
  let o = a.split('/'),
    s = o.length;
  return (
    o.some(np) && (s += z0),
    i && (s += w0),
    o.filter((r) => !np(r)).reduce((r, d) => r + (M0.test(d) ? R0 : d === '' ? O0 : D0), s)
  );
}
function L0(a, i) {
  return a.length === i.length && a.slice(0, -1).every((s, r) => s === i[r])
    ? a[a.length - 1] - i[i.length - 1]
    : 0;
}
function U0(a, i, o = !1) {
  let { routesMeta: s } = a,
    r = {},
    d = '/',
    h = [];
  for (let v = 0; v < s.length; ++v) {
    let g = s[v],
      y = v === s.length - 1,
      _ = d === '/' ? i : i.slice(d.length) || '/',
      b = ss({ path: g.relativePath, caseSensitive: g.caseSensitive, end: y }, _),
      x = g.route;
    if (
      (!b &&
        y &&
        o &&
        !s[s.length - 1].route.index &&
        (b = ss({ path: g.relativePath, caseSensitive: g.caseSensitive, end: !1 }, _)),
      !b)
    )
      return null;
    (Object.assign(r, b.params),
      h.push({
        params: r,
        pathname: nl([d, b.pathname]),
        pathnameBase: X0(nl([d, b.pathnameBase])),
        route: x,
      }),
      b.pathnameBase !== '/' && (d = nl([d, b.pathnameBase])));
  }
  return h;
}
function ss(a, i) {
  typeof a == 'string' && (a = { path: a, caseSensitive: !1, end: !0 });
  let [o, s] = q0(a.path, a.caseSensitive, a.end),
    r = i.match(o);
  if (!r) return null;
  let d = r[0],
    h = d.replace(/(.)\/+$/, '$1'),
    v = r.slice(1);
  return {
    params: s.reduce((y, { paramName: _, isOptional: b }, x) => {
      if (_ === '*') {
        let S = v[x] || '';
        h = d.slice(0, d.length - S.length).replace(/(.)\/+$/, '$1');
      }
      const R = v[x];
      return (b && !R ? (y[_] = void 0) : (y[_] = (R || '').replace(/%2F/g, '/')), y);
    }, {}),
    pathname: d,
    pathnameBase: h,
    pattern: a,
  };
}
function q0(a, i = !1, o = !0) {
  al(
    a === '*' || !a.endsWith('*') || a.endsWith('/*'),
    `Route path "${a}" will be treated as if it were "${a.replace(/\*$/, '/*')}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${a.replace(/\*$/, '/*')}".`
  );
  let s = [],
    r =
      '^' +
      a
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(/\/:([\w-]+)(\?)?/g, (h, v, g, y, _) => {
          if ((s.push({ paramName: v, isOptional: g != null }), g)) {
            let b = _.charAt(y + h.length);
            return b && b !== '/' ? '/([^\\/]*)' : '(?:/([^\\/]*))?';
          }
          return '/([^\\/]+)';
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, '(/$1)?$2');
  return (
    a.endsWith('*')
      ? (s.push({ paramName: '*' }), (r += a === '*' || a === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : o
        ? (r += '\\/*$')
        : a !== '' && a !== '/' && (r += '(?:(?=\\/|$))'),
    [new RegExp(r, i ? void 0 : 'i'), s]
  );
}
function H0(a) {
  try {
    return a
      .split('/')
      .map((i) => decodeURIComponent(i).replace(/\//g, '%2F'))
      .join('/');
  } catch (i) {
    return (
      al(
        !1,
        `The URL path "${a}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${i}).`
      ),
      a
    );
  }
}
function zl(a, i) {
  if (i === '/') return a;
  if (!a.toLowerCase().startsWith(i.toLowerCase())) return null;
  let o = i.endsWith('/') ? i.length - 1 : i.length,
    s = a.charAt(o);
  return s && s !== '/' ? null : a.slice(o) || '/';
}
var G0 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function Y0(a, i = '/') {
  let { pathname: o, search: s = '', hash: r = '' } = typeof a == 'string' ? ka(a) : a,
    d;
  return (
    o ? ((o = Op(o)), o.startsWith('/') ? (d = ap(o.substring(1), '/')) : (d = ap(o, i))) : (d = i),
    { pathname: d, search: V0(s), hash: Q0(r) }
  );
}
function ap(a, i) {
  let o = cs(i).split('/');
  return (
    a.split('/').forEach((r) => {
      r === '..' ? o.length > 1 && o.pop() : r !== '.' && o.push(r);
    }),
    o.length > 1 ? o.join('/') : '/'
  );
}
function Zo(a, i, o, s) {
  return `Cannot include a '${a}' character in a manually specified \`to.${i}\` field [${JSON.stringify(s)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function $0(a) {
  return a.filter((i, o) => o === 0 || (i.route.path && i.route.path.length > 0));
}
function br(a) {
  let i = $0(a);
  return i.map((o, s) => (s === i.length - 1 ? o.pathname : o.pathnameBase));
}
function ps(a, i, o, s = !1) {
  let r;
  typeof a == 'string'
    ? (r = ka(a))
    : ((r = { ...a }),
      Ze(!r.pathname || !r.pathname.includes('?'), Zo('?', 'pathname', 'search', r)),
      Ze(!r.pathname || !r.pathname.includes('#'), Zo('#', 'pathname', 'hash', r)),
      Ze(!r.search || !r.search.includes('#'), Zo('#', 'search', 'hash', r)));
  let d = a === '' || r.pathname === '',
    h = d ? '/' : r.pathname,
    v;
  if (h == null) v = o;
  else {
    let b = i.length - 1;
    if (!s && h.startsWith('..')) {
      let x = h.split('/');
      for (; x[0] === '..'; ) (x.shift(), (b -= 1));
      r.pathname = x.join('/');
    }
    v = b >= 0 ? i[b] : '/';
  }
  let g = Y0(r, v),
    y = h && h !== '/' && h.endsWith('/'),
    _ = (d || h === '.') && o.endsWith('/');
  return (!g.pathname.endsWith('/') && (y || _) && (g.pathname += '/'), g);
}
var Op = (a) => a.replace(/\/\/+/g, '/'),
  nl = (a) => Op(a.join('/')),
  cs = (a) => a.replace(/\/+$/, ''),
  X0 = (a) => cs(a).replace(/^\/*/, '/'),
  V0 = (a) => (!a || a === '?' ? '' : a.startsWith('?') ? a : '?' + a),
  Q0 = (a) => (!a || a === '#' ? '' : a.startsWith('#') ? a : '#' + a),
  Z0 = class {
    constructor(a, i, o, s = !1) {
      ((this.status = a),
        (this.statusText = i || ''),
        (this.internal = s),
        o instanceof Error ? ((this.data = o.toString()), (this.error = o)) : (this.data = o));
    }
  };
function K0(a) {
  return (
    a != null &&
    typeof a.status == 'number' &&
    typeof a.statusText == 'string' &&
    typeof a.internal == 'boolean' &&
    'data' in a
  );
}
function I0(a) {
  let i = a.map((o) => o.route.path).filter(Boolean);
  return nl(i) || '/';
}
var Dp =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
function zp(a, i) {
  let o = a;
  if (typeof o != 'string' || !G0.test(o)) return { absoluteURL: void 0, isExternal: !1, to: o };
  let s = o,
    r = !1;
  if (Dp)
    try {
      let d = new URL(window.location.href),
        h = o.startsWith('//') ? new URL(d.protocol + o) : new URL(o),
        v = zl(h.pathname, i);
      h.origin === d.origin && v != null ? (o = v + h.search + h.hash) : (r = !0);
    } catch {
      al(
        !1,
        `<Link to="${o}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: s, isExternal: r, to: o };
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
var Bp = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(Bp);
var J0 = ['GET', ...Bp];
new Set(J0);
var Aa = T.createContext(null);
Aa.displayName = 'DataRouter';
var ys = T.createContext(null);
ys.displayName = 'DataRouterState';
var Lp = T.createContext(!1);
function W0() {
  return T.useContext(Lp);
}
var Up = T.createContext({ isTransitioning: !1 });
Up.displayName = 'ViewTransition';
var F0 = T.createContext(new Map());
F0.displayName = 'Fetchers';
var P0 = T.createContext(null);
P0.displayName = 'Await';
var Ut = T.createContext(null);
Ut.displayName = 'Navigation';
var Oi = T.createContext(null);
Oi.displayName = 'Location';
var ul = T.createContext({ outlet: null, matches: [], isDataRoute: !1 });
ul.displayName = 'Route';
var Sr = T.createContext(null);
Sr.displayName = 'RouteError';
var qp = 'REACT_ROUTER_ERROR',
  ev = 'REDIRECT',
  tv = 'ROUTE_ERROR_RESPONSE';
function lv(a) {
  if (a.startsWith(`${qp}:${ev}:{`))
    try {
      let i = JSON.parse(a.slice(28));
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
function nv(a) {
  if (a.startsWith(`${qp}:${tv}:{`))
    try {
      let i = JSON.parse(a.slice(40));
      if (
        typeof i == 'object' &&
        i &&
        typeof i.status == 'number' &&
        typeof i.statusText == 'string'
      )
        return new Z0(i.status, i.statusText, i.data);
    } catch {}
}
function av(a, { relative: i } = {}) {
  Ze(Ca(), 'useHref() may be used only in the context of a <Router> component.');
  let { basename: o, navigator: s } = T.useContext(Ut),
    { hash: r, pathname: d, search: h } = Di(a, { relative: i }),
    v = d;
  return (
    o !== '/' && (v = d === '/' ? o : nl([o, d])),
    s.createHref({ pathname: v, search: h, hash: r })
  );
}
function Ca() {
  return T.useContext(Oi) != null;
}
function hl() {
  return (
    Ze(Ca(), 'useLocation() may be used only in the context of a <Router> component.'),
    T.useContext(Oi).location
  );
}
var Hp =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function Gp(a) {
  T.useContext(Ut).static || T.useLayoutEffect(a);
}
function sl() {
  let { isDataRoute: a } = T.useContext(ul);
  return a ? _v() : iv();
}
function iv() {
  Ze(Ca(), 'useNavigate() may be used only in the context of a <Router> component.');
  let a = T.useContext(Aa),
    { basename: i, navigator: o } = T.useContext(Ut),
    { matches: s } = T.useContext(ul),
    { pathname: r } = hl(),
    d = JSON.stringify(br(s)),
    h = T.useRef(!1);
  return (
    Gp(() => {
      h.current = !0;
    }),
    T.useCallback(
      (g, y = {}) => {
        if ((al(h.current, Hp), !h.current)) return;
        if (typeof g == 'number') {
          o.go(g);
          return;
        }
        let _ = ps(g, JSON.parse(d), r, y.relative === 'path');
        (a == null && i !== '/' && (_.pathname = _.pathname === '/' ? i : nl([i, _.pathname])),
          (y.replace ? o.replace : o.push)(_, y.state, y));
      },
      [i, o, d, r, a]
    )
  );
}
T.createContext(null);
function uv() {
  let { matches: a } = T.useContext(ul),
    i = a[a.length - 1];
  return (i == null ? void 0 : i.params) ?? {};
}
function Di(a, { relative: i } = {}) {
  let { matches: o } = T.useContext(ul),
    { pathname: s } = hl(),
    r = JSON.stringify(br(o));
  return T.useMemo(() => ps(a, JSON.parse(r), s, i === 'path'), [a, r, s, i]);
}
function sv(a, i) {
  return Yp(a, i);
}
function Yp(a, i, o) {
  var j;
  Ze(Ca(), 'useRoutes() may be used only in the context of a <Router> component.');
  let { navigator: s } = T.useContext(Ut),
    { matches: r } = T.useContext(ul),
    d = r[r.length - 1],
    h = d ? d.params : {},
    v = d ? d.pathname : '/',
    g = d ? d.pathnameBase : '/',
    y = d && d.route;
  {
    let A = (y && y.path) || '';
    Xp(
      v,
      !y || A.endsWith('*') || A.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${v}" (under <Route path="${A}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${A}"> to <Route path="${A === '/' ? '*' : `${A}/*`}">.`
    );
  }
  let _ = hl(),
    b;
  if (i) {
    let A = typeof i == 'string' ? ka(i) : i;
    (Ze(
      g === '/' || ((j = A.pathname) == null ? void 0 : j.startsWith(g)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${g}" but pathname "${A.pathname}" was given in the \`location\` prop.`
    ),
      (b = A));
  } else b = _;
  let x = b.pathname || '/',
    R = x;
  if (g !== '/') {
    let A = g.replace(/^\//, '').split('/');
    R = '/' + x.replace(/^\//, '').split('/').slice(A.length).join('/');
  }
  let S = Mp(a, { pathname: R });
  (al(y || S != null, `No routes matched location "${b.pathname}${b.search}${b.hash}" `),
    al(
      S == null ||
        S[S.length - 1].route.element !== void 0 ||
        S[S.length - 1].route.Component !== void 0 ||
        S[S.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${b.pathname}${b.search}${b.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let w = dv(
    S &&
      S.map((A) =>
        Object.assign({}, A, {
          params: Object.assign({}, h, A.params),
          pathname: nl([
            g,
            s.encodeLocation
              ? s.encodeLocation(
                  A.pathname.replace(/%/g, '%25').replace(/\?/g, '%3F').replace(/#/g, '%23')
                ).pathname
              : A.pathname,
          ]),
          pathnameBase:
            A.pathnameBase === '/'
              ? g
              : nl([
                  g,
                  s.encodeLocation
                    ? s.encodeLocation(
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
  return i && w
    ? T.createElement(
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
        w
      )
    : w;
}
function cv() {
  let a = gv(),
    i = K0(a) ? `${a.status} ${a.statusText}` : a instanceof Error ? a.message : JSON.stringify(a),
    o = a instanceof Error ? a.stack : null,
    s = 'rgba(200,200,200, 0.5)',
    r = { padding: '0.5rem', backgroundColor: s },
    d = { padding: '2px 4px', backgroundColor: s },
    h = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', a),
    (h = T.createElement(
      T.Fragment,
      null,
      T.createElement('p', null, '💿 Hey developer 👋'),
      T.createElement(
        'p',
        null,
        'You can provide a way better UX than this when your app throws errors by providing your own ',
        T.createElement('code', { style: d }, 'ErrorBoundary'),
        ' or',
        ' ',
        T.createElement('code', { style: d }, 'errorElement'),
        ' prop on your route.'
      )
    )),
    T.createElement(
      T.Fragment,
      null,
      T.createElement('h2', null, 'Unexpected Application Error!'),
      T.createElement('h3', { style: { fontStyle: 'italic' } }, i),
      o ? T.createElement('pre', { style: r }, o) : null,
      h
    )
  );
}
var ov = T.createElement(cv, null),
  $p = class extends T.Component {
    constructor(a) {
      (super(a),
        (this.state = { location: a.location, revalidation: a.revalidation, error: a.error }));
    }
    static getDerivedStateFromError(a) {
      return { error: a };
    }
    static getDerivedStateFromProps(a, i) {
      return i.location !== a.location || (i.revalidation !== 'idle' && a.revalidation === 'idle')
        ? { error: a.error, location: a.location, revalidation: a.revalidation }
        : {
            error: a.error !== void 0 ? a.error : i.error,
            location: i.location,
            revalidation: a.revalidation || i.revalidation,
          };
    }
    componentDidCatch(a, i) {
      this.props.onError
        ? this.props.onError(a, i)
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
        const o = nv(a.digest);
        o && (a = o);
      }
      let i =
        a !== void 0
          ? T.createElement(
              ul.Provider,
              { value: this.props.routeContext },
              T.createElement(Sr.Provider, { value: a, children: this.props.component })
            )
          : this.props.children;
      return this.context ? T.createElement(rv, { error: a }, i) : i;
    }
  };
$p.contextType = Lp;
var Ko = new WeakMap();
function rv({ children: a, error: i }) {
  let { basename: o } = T.useContext(Ut);
  if (typeof i == 'object' && i && 'digest' in i && typeof i.digest == 'string') {
    let s = lv(i.digest);
    if (s) {
      let r = Ko.get(i);
      if (r) throw r;
      let d = zp(s.location, o);
      if (Dp && !Ko.get(i))
        if (d.isExternal || s.reloadDocument) window.location.href = d.absoluteURL || d.to;
        else {
          const h = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(d.to, { replace: s.replace })
          );
          throw (Ko.set(i, h), h);
        }
      return T.createElement('meta', {
        httpEquiv: 'refresh',
        content: `0;url=${d.absoluteURL || d.to}`,
      });
    }
  }
  return a;
}
function fv({ routeContext: a, match: i, children: o }) {
  let s = T.useContext(Aa);
  return (
    s &&
      s.static &&
      s.staticContext &&
      (i.route.errorElement || i.route.ErrorBoundary) &&
      (s.staticContext._deepestRenderedBoundaryId = i.route.id),
    T.createElement(ul.Provider, { value: a }, o)
  );
}
function dv(a, i = [], o) {
  let s = o == null ? void 0 : o.state;
  if (a == null) {
    if (!s) return null;
    if (s.errors) a = s.matches;
    else if (i.length === 0 && !s.initialized && s.matches.length > 0) a = s.matches;
    else return null;
  }
  let r = a,
    d = s == null ? void 0 : s.errors;
  if (d != null) {
    let _ = r.findIndex((b) => b.route.id && (d == null ? void 0 : d[b.route.id]) !== void 0);
    (Ze(
      _ >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(d).join(',')}`
    ),
      (r = r.slice(0, Math.min(r.length, _ + 1))));
  }
  let h = !1,
    v = -1;
  if (o && s) {
    h = s.renderFallback;
    for (let _ = 0; _ < r.length; _++) {
      let b = r[_];
      if (((b.route.HydrateFallback || b.route.hydrateFallbackElement) && (v = _), b.route.id)) {
        let { loaderData: x, errors: R } = s,
          S = b.route.loader && !x.hasOwnProperty(b.route.id) && (!R || R[b.route.id] === void 0);
        if (b.route.lazy || S) {
          (o.isStatic && (h = !0), v >= 0 ? (r = r.slice(0, v + 1)) : (r = [r[0]]));
          break;
        }
      }
    }
  }
  let g = o == null ? void 0 : o.onError,
    y =
      s && g
        ? (_, b) => {
            var x, R;
            g(_, {
              location: s.location,
              params:
                ((R = (x = s.matches) == null ? void 0 : x[0]) == null ? void 0 : R.params) ?? {},
              unstable_pattern: I0(s.matches),
              errorInfo: b,
            });
          }
        : void 0;
  return r.reduceRight((_, b, x) => {
    let R,
      S = !1,
      w = null,
      j = null;
    s &&
      ((R = d && b.route.id ? d[b.route.id] : void 0),
      (w = b.route.errorElement || ov),
      h &&
        (v < 0 && x === 0
          ? (Xp(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration'
            ),
            (S = !0),
            (j = null))
          : v === x && ((S = !0), (j = b.route.hydrateFallbackElement || null))));
    let A = i.concat(r.slice(0, x + 1)),
      k = () => {
        let Q;
        return (
          R
            ? (Q = w)
            : S
              ? (Q = j)
              : b.route.Component
                ? (Q = T.createElement(b.route.Component, null))
                : b.route.element
                  ? (Q = b.route.element)
                  : (Q = _),
          T.createElement(fv, {
            match: b,
            routeContext: { outlet: _, matches: A, isDataRoute: s != null },
            children: Q,
          })
        );
      };
    return s && (b.route.ErrorBoundary || b.route.errorElement || x === 0)
      ? T.createElement($p, {
          location: s.location,
          revalidation: s.revalidation,
          component: w,
          error: R,
          children: k(),
          routeContext: { outlet: null, matches: A, isDataRoute: !0 },
          onError: y,
        })
      : k();
  }, null);
}
function xr(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function mv(a) {
  let i = T.useContext(Aa);
  return (Ze(i, xr(a)), i);
}
function hv(a) {
  let i = T.useContext(ys);
  return (Ze(i, xr(a)), i);
}
function pv(a) {
  let i = T.useContext(ul);
  return (Ze(i, xr(a)), i);
}
function Er(a) {
  let i = pv(a),
    o = i.matches[i.matches.length - 1];
  return (Ze(o.route.id, `${a} can only be used on routes that contain a unique "id"`), o.route.id);
}
function yv() {
  return Er('useRouteId');
}
function gv() {
  var s;
  let a = T.useContext(Sr),
    i = hv('useRouteError'),
    o = Er('useRouteError');
  return a !== void 0 ? a : (s = i.errors) == null ? void 0 : s[o];
}
function _v() {
  let { router: a } = mv('useNavigate'),
    i = Er('useNavigate'),
    o = T.useRef(!1);
  return (
    Gp(() => {
      o.current = !0;
    }),
    T.useCallback(
      async (r, d = {}) => {
        (al(o.current, Hp),
          o.current &&
            (typeof r == 'number'
              ? await a.navigate(r)
              : await a.navigate(r, { fromRouteId: i, ...d })));
      },
      [a, i]
    )
  );
}
var ip = {};
function Xp(a, i, o) {
  !i && !ip[a] && ((ip[a] = !0), al(!1, o));
}
T.memo(vv);
function vv({ routes: a, future: i, state: o, isStatic: s, onError: r }) {
  return Yp(a, void 0, { state: o, isStatic: s, onError: r });
}
function il({ to: a, replace: i, state: o, relative: s }) {
  Ze(Ca(), '<Navigate> may be used only in the context of a <Router> component.');
  let { static: r } = T.useContext(Ut);
  al(
    !r,
    '<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.'
  );
  let { matches: d } = T.useContext(ul),
    { pathname: h } = hl(),
    v = sl(),
    g = ps(a, br(d), h, s === 'path'),
    y = JSON.stringify(g);
  return (
    T.useEffect(() => {
      v(JSON.parse(y), { replace: i, state: o, relative: s });
    }, [v, y, s, i, o]),
    null
  );
}
function Jt(a) {
  Ze(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  );
}
function bv({
  basename: a = '/',
  children: i = null,
  location: o,
  navigationType: s = 'POP',
  navigator: r,
  static: d = !1,
  unstable_useTransitions: h,
}) {
  Ze(
    !Ca(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  let v = a.replace(/^\/*/, '/'),
    g = T.useMemo(
      () => ({ basename: v, navigator: r, static: d, unstable_useTransitions: h, future: {} }),
      [v, r, d, h]
    );
  typeof o == 'string' && (o = ka(o));
  let {
      pathname: y = '/',
      search: _ = '',
      hash: b = '',
      state: x = null,
      key: R = 'default',
      unstable_mask: S,
    } = o,
    w = T.useMemo(() => {
      let j = zl(y, v);
      return j == null
        ? null
        : {
            location: { pathname: j, search: _, hash: b, state: x, key: R, unstable_mask: S },
            navigationType: s,
          };
    }, [v, y, _, b, x, R, s, S]);
  return (
    al(
      w != null,
      `<Router basename="${v}"> is not able to match the URL "${y}${_}${b}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    w == null
      ? null
      : T.createElement(
          Ut.Provider,
          { value: g },
          T.createElement(Oi.Provider, { children: i, value: w })
        )
  );
}
function Sv({ children: a, location: i }) {
  return sv(cr(a), i);
}
function cr(a, i = []) {
  let o = [];
  return (
    T.Children.forEach(a, (s, r) => {
      if (!T.isValidElement(s)) return;
      let d = [...i, r];
      if (s.type === T.Fragment) {
        o.push.apply(o, cr(s.props.children, d));
        return;
      }
      (Ze(
        s.type === Jt,
        `[${typeof s.type == 'string' ? s.type : s.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Ze(!s.props.index || !s.props.children, 'An index route cannot have child routes.'));
      let h = {
        id: s.props.id || d.join('-'),
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
      (s.props.children && (h.children = cr(s.props.children, d)), o.push(h));
    }),
    o
  );
}
var as = 'get',
  is = 'application/x-www-form-urlencoded';
function gs(a) {
  return typeof HTMLElement < 'u' && a instanceof HTMLElement;
}
function xv(a) {
  return gs(a) && a.tagName.toLowerCase() === 'button';
}
function Ev(a) {
  return gs(a) && a.tagName.toLowerCase() === 'form';
}
function Tv(a) {
  return gs(a) && a.tagName.toLowerCase() === 'input';
}
function Nv(a) {
  return !!(a.metaKey || a.altKey || a.ctrlKey || a.shiftKey);
}
function kv(a, i) {
  return a.button === 0 && (!i || i === '_self') && !Nv(a);
}
var Pu = null;
function Av() {
  if (Pu === null)
    try {
      (new FormData(document.createElement('form'), 0), (Pu = !1));
    } catch {
      Pu = !0;
    }
  return Pu;
}
var Cv = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
function Io(a) {
  return a != null && !Cv.has(a)
    ? (al(
        !1,
        `"${a}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${is}"`
      ),
      null)
    : a;
}
function jv(a, i) {
  let o, s, r, d, h;
  if (Ev(a)) {
    let v = a.getAttribute('action');
    ((s = v ? zl(v, i) : null),
      (o = a.getAttribute('method') || as),
      (r = Io(a.getAttribute('enctype')) || is),
      (d = new FormData(a)));
  } else if (xv(a) || (Tv(a) && (a.type === 'submit' || a.type === 'image'))) {
    let v = a.form;
    if (v == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let g = a.getAttribute('formaction') || v.getAttribute('action');
    if (
      ((s = g ? zl(g, i) : null),
      (o = a.getAttribute('formmethod') || v.getAttribute('method') || as),
      (r = Io(a.getAttribute('formenctype')) || Io(v.getAttribute('enctype')) || is),
      (d = new FormData(v, a)),
      !Av())
    ) {
      let { name: y, type: _, value: b } = a;
      if (_ === 'image') {
        let x = y ? `${y}.` : '';
        (d.append(`${x}x`, '0'), d.append(`${x}y`, '0'));
      } else y && d.append(y, b);
    }
  } else {
    if (gs(a))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((o = as), (s = null), (r = is), (h = a));
  }
  return (
    d && r === 'text/plain' && ((h = d), (d = void 0)),
    { action: s, method: o.toLowerCase(), encType: r, formData: d, body: h }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function Tr(a, i) {
  if (a === !1 || a === null || typeof a > 'u') throw new Error(i);
}
function Vp(a, i, o, s) {
  let r =
    typeof a == 'string'
      ? new URL(a, typeof window > 'u' ? 'server://singlefetch/' : window.location.origin)
      : a;
  return (
    o
      ? r.pathname.endsWith('/')
        ? (r.pathname = `${r.pathname}_.${s}`)
        : (r.pathname = `${r.pathname}.${s}`)
      : r.pathname === '/'
        ? (r.pathname = `_root.${s}`)
        : i && zl(r.pathname, i) === '/'
          ? (r.pathname = `${cs(i)}/_root.${s}`)
          : (r.pathname = `${cs(r.pathname)}.${s}`),
    r
  );
}
async function Mv(a, i) {
  if (a.id in i) return i[a.id];
  try {
    let o = await import(a.module);
    return ((i[a.id] = o), o);
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
function Rv(a) {
  return a == null
    ? !1
    : a.href == null
      ? a.rel === 'preload' && typeof a.imageSrcSet == 'string' && typeof a.imageSizes == 'string'
      : typeof a.rel == 'string' && typeof a.href == 'string';
}
async function wv(a, i, o) {
  let s = await Promise.all(
    a.map(async (r) => {
      let d = i.routes[r.route.id];
      if (d) {
        let h = await Mv(d, o);
        return h.links ? h.links() : [];
      }
      return [];
    })
  );
  return Bv(
    s
      .flat(1)
      .filter(Rv)
      .filter((r) => r.rel === 'stylesheet' || r.rel === 'preload')
      .map((r) =>
        r.rel === 'stylesheet' ? { ...r, rel: 'prefetch', as: 'style' } : { ...r, rel: 'prefetch' }
      )
  );
}
function up(a, i, o, s, r, d) {
  let h = (g, y) => (o[y] ? g.route.id !== o[y].route.id : !0),
    v = (g, y) => {
      var _;
      return (
        o[y].pathname !== g.pathname ||
        (((_ = o[y].route.path) == null ? void 0 : _.endsWith('*')) &&
          o[y].params['*'] !== g.params['*'])
      );
    };
  return d === 'assets'
    ? i.filter((g, y) => h(g, y) || v(g, y))
    : d === 'data'
      ? i.filter((g, y) => {
          var b;
          let _ = s.routes[g.route.id];
          if (!_ || !_.hasLoader) return !1;
          if (h(g, y) || v(g, y)) return !0;
          if (g.route.shouldRevalidate) {
            let x = g.route.shouldRevalidate({
              currentUrl: new URL(r.pathname + r.search + r.hash, window.origin),
              currentParams: ((b = o[0]) == null ? void 0 : b.params) || {},
              nextUrl: new URL(a, window.origin),
              nextParams: g.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof x == 'boolean') return x;
          }
          return !0;
        })
      : [];
}
function Ov(a, i, { includeHydrateFallback: o } = {}) {
  return Dv(
    a
      .map((s) => {
        let r = i.routes[s.route.id];
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
function Dv(a) {
  return [...new Set(a)];
}
function zv(a) {
  let i = {},
    o = Object.keys(a).sort();
  for (let s of o) i[s] = a[s];
  return i;
}
function Bv(a, i) {
  let o = new Set();
  return (
    new Set(i),
    a.reduce((s, r) => {
      let d = JSON.stringify(zv(r));
      return (o.has(d) || (o.add(d), s.push({ key: d, link: r })), s);
    }, [])
  );
}
function Nr() {
  let a = T.useContext(Aa);
  return (Tr(a, 'You must render this element inside a <DataRouterContext.Provider> element'), a);
}
function Lv() {
  let a = T.useContext(ys);
  return (
    Tr(a, 'You must render this element inside a <DataRouterStateContext.Provider> element'),
    a
  );
}
var kr = T.createContext(void 0);
kr.displayName = 'FrameworkContext';
function Ar() {
  let a = T.useContext(kr);
  return (Tr(a, 'You must render this element inside a <HydratedRouter> element'), a);
}
function Uv(a, i) {
  let o = T.useContext(kr),
    [s, r] = T.useState(!1),
    [d, h] = T.useState(!1),
    { onFocus: v, onBlur: g, onMouseEnter: y, onMouseLeave: _, onTouchStart: b } = i,
    x = T.useRef(null);
  (T.useEffect(() => {
    if ((a === 'render' && h(!0), a === 'viewport')) {
      let w = (A) => {
          A.forEach((k) => {
            h(k.isIntersecting);
          });
        },
        j = new IntersectionObserver(w, { threshold: 0.5 });
      return (
        x.current && j.observe(x.current),
        () => {
          j.disconnect();
        }
      );
    }
  }, [a]),
    T.useEffect(() => {
      if (s) {
        let w = setTimeout(() => {
          h(!0);
        }, 100);
        return () => {
          clearTimeout(w);
        };
      }
    }, [s]));
  let R = () => {
      r(!0);
    },
    S = () => {
      (r(!1), h(!1));
    };
  return o
    ? a !== 'intent'
      ? [d, x, {}]
      : [
          d,
          x,
          {
            onFocus: Ni(v, R),
            onBlur: Ni(g, S),
            onMouseEnter: Ni(y, R),
            onMouseLeave: Ni(_, S),
            onTouchStart: Ni(b, R),
          },
        ]
    : [!1, x, {}];
}
function Ni(a, i) {
  return (o) => {
    (a && a(o), o.defaultPrevented || i(o));
  };
}
function qv({ page: a, ...i }) {
  let o = W0(),
    { router: s } = Nr(),
    r = T.useMemo(() => Mp(s.routes, a, s.basename), [s.routes, a, s.basename]);
  return r
    ? o
      ? T.createElement(Gv, { page: a, matches: r, ...i })
      : T.createElement(Yv, { page: a, matches: r, ...i })
    : null;
}
function Hv(a) {
  let { manifest: i, routeModules: o } = Ar(),
    [s, r] = T.useState([]);
  return (
    T.useEffect(() => {
      let d = !1;
      return (
        wv(a, i, o).then((h) => {
          d || r(h);
        }),
        () => {
          d = !0;
        }
      );
    }, [a, i, o]),
    s
  );
}
function Gv({ page: a, matches: i, ...o }) {
  let s = hl(),
    { future: r } = Ar(),
    { basename: d } = Nr(),
    h = T.useMemo(() => {
      if (a === s.pathname + s.search + s.hash) return [];
      let v = Vp(a, d, r.unstable_trailingSlashAwareDataRequests, 'rsc'),
        g = !1,
        y = [];
      for (let _ of i)
        typeof _.route.shouldRevalidate == 'function' ? (g = !0) : y.push(_.route.id);
      return (
        g && y.length > 0 && v.searchParams.set('_routes', y.join(',')),
        [v.pathname + v.search]
      );
    }, [d, r.unstable_trailingSlashAwareDataRequests, a, s, i]);
  return T.createElement(
    T.Fragment,
    null,
    h.map((v) => T.createElement('link', { key: v, rel: 'prefetch', as: 'fetch', href: v, ...o }))
  );
}
function Yv({ page: a, matches: i, ...o }) {
  let s = hl(),
    { future: r, manifest: d, routeModules: h } = Ar(),
    { basename: v } = Nr(),
    { loaderData: g, matches: y } = Lv(),
    _ = T.useMemo(() => up(a, i, y, d, s, 'data'), [a, i, y, d, s]),
    b = T.useMemo(() => up(a, i, y, d, s, 'assets'), [a, i, y, d, s]),
    x = T.useMemo(() => {
      if (a === s.pathname + s.search + s.hash) return [];
      let w = new Set(),
        j = !1;
      if (
        (i.forEach((k) => {
          var P;
          let Q = d.routes[k.route.id];
          !Q ||
            !Q.hasLoader ||
            ((!_.some((ee) => ee.route.id === k.route.id) &&
              k.route.id in g &&
              (P = h[k.route.id]) != null &&
              P.shouldRevalidate) ||
            Q.hasClientLoader
              ? (j = !0)
              : w.add(k.route.id));
        }),
        w.size === 0)
      )
        return [];
      let A = Vp(a, v, r.unstable_trailingSlashAwareDataRequests, 'data');
      return (
        j &&
          w.size > 0 &&
          A.searchParams.set(
            '_routes',
            i
              .filter((k) => w.has(k.route.id))
              .map((k) => k.route.id)
              .join(',')
          ),
        [A.pathname + A.search]
      );
    }, [v, r.unstable_trailingSlashAwareDataRequests, g, s, d, _, i, a, h]),
    R = T.useMemo(() => Ov(b, d), [b, d]),
    S = Hv(b);
  return T.createElement(
    T.Fragment,
    null,
    x.map((w) => T.createElement('link', { key: w, rel: 'prefetch', as: 'fetch', href: w, ...o })),
    R.map((w) => T.createElement('link', { key: w, rel: 'modulepreload', href: w, ...o })),
    S.map(({ key: w, link: j }) =>
      T.createElement('link', {
        key: w,
        nonce: o.nonce,
        ...j,
        crossOrigin: j.crossOrigin ?? o.crossOrigin,
      })
    )
  );
}
function $v(...a) {
  return (i) => {
    a.forEach((o) => {
      typeof o == 'function' ? o(i) : o != null && (o.current = i);
    });
  };
}
var Xv =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
try {
  Xv && (window.__reactRouterVersion = '7.14.2');
} catch {}
function Vv({ basename: a, children: i, unstable_useTransitions: o, window: s }) {
  let r = T.useRef();
  r.current == null && (r.current = T0({ window: s, v5Compat: !0 }));
  let d = r.current,
    [h, v] = T.useState({ action: d.action, location: d.location }),
    g = T.useCallback(
      (y) => {
        o === !1 ? v(y) : T.startTransition(() => v(y));
      },
      [o]
    );
  return (
    T.useLayoutEffect(() => d.listen(g), [d, g]),
    T.createElement(bv, {
      basename: a,
      children: i,
      location: h.location,
      navigationType: h.action,
      navigator: d,
      unstable_useTransitions: o,
    })
  );
}
var Qp = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Zp = T.forwardRef(function (
    {
      onClick: i,
      discover: o = 'render',
      prefetch: s = 'none',
      relative: r,
      reloadDocument: d,
      replace: h,
      unstable_mask: v,
      state: g,
      target: y,
      to: _,
      preventScrollReset: b,
      viewTransition: x,
      unstable_defaultShouldRevalidate: R,
      ...S
    },
    w
  ) {
    let { basename: j, navigator: A, unstable_useTransitions: k } = T.useContext(Ut),
      Q = typeof _ == 'string' && Qp.test(_),
      P = zp(_, j);
    _ = P.to;
    let ee = av(_, { relative: r }),
      V = hl(),
      H = null;
    if (v) {
      let he = ps(v, [], V.unstable_mask ? V.unstable_mask.pathname : '/', !0);
      (j !== '/' && (he.pathname = he.pathname === '/' ? j : nl([j, he.pathname])),
        (H = A.createHref(he)));
    }
    let [U, Z, ae] = Uv(s, S),
      ue = Iv(_, {
        replace: h,
        unstable_mask: v,
        state: g,
        target: y,
        preventScrollReset: b,
        relative: r,
        viewTransition: x,
        unstable_defaultShouldRevalidate: R,
        unstable_useTransitions: k,
      });
    function ce(he) {
      (i && i(he), he.defaultPrevented || ue(he));
    }
    let I = !(P.isExternal || d),
      J = T.createElement('a', {
        ...S,
        ...ae,
        href: (I ? H : void 0) || P.absoluteURL || ee,
        onClick: I ? ce : i,
        ref: $v(w, Z),
        target: y,
        'data-discover': !Q && o === 'render' ? 'true' : void 0,
      });
    return U && !Q ? T.createElement(T.Fragment, null, J, T.createElement(qv, { page: ee })) : J;
  });
Zp.displayName = 'Link';
var Qv = T.forwardRef(function (
  {
    'aria-current': i = 'page',
    caseSensitive: o = !1,
    className: s = '',
    end: r = !1,
    style: d,
    to: h,
    viewTransition: v,
    children: g,
    ...y
  },
  _
) {
  let b = Di(h, { relative: y.relative }),
    x = hl(),
    R = T.useContext(ys),
    { navigator: S, basename: w } = T.useContext(Ut),
    j = R != null && eb(b) && v === !0,
    A = S.encodeLocation ? S.encodeLocation(b).pathname : b.pathname,
    k = x.pathname,
    Q = R && R.navigation && R.navigation.location ? R.navigation.location.pathname : null;
  (o || ((k = k.toLowerCase()), (Q = Q ? Q.toLowerCase() : null), (A = A.toLowerCase())),
    Q && w && (Q = zl(Q, w) || Q));
  const P = A !== '/' && A.endsWith('/') ? A.length - 1 : A.length;
  let ee = k === A || (!r && k.startsWith(A) && k.charAt(P) === '/'),
    V = Q != null && (Q === A || (!r && Q.startsWith(A) && Q.charAt(A.length) === '/')),
    H = { isActive: ee, isPending: V, isTransitioning: j },
    U = ee ? i : void 0,
    Z;
  typeof s == 'function'
    ? (Z = s(H))
    : (Z = [s, ee ? 'active' : null, V ? 'pending' : null, j ? 'transitioning' : null]
        .filter(Boolean)
        .join(' '));
  let ae = typeof d == 'function' ? d(H) : d;
  return T.createElement(
    Zp,
    { ...y, 'aria-current': U, className: Z, ref: _, style: ae, to: h, viewTransition: v },
    typeof g == 'function' ? g(H) : g
  );
});
Qv.displayName = 'NavLink';
var Zv = T.forwardRef(
  (
    {
      discover: a = 'render',
      fetcherKey: i,
      navigate: o,
      reloadDocument: s,
      replace: r,
      state: d,
      method: h = as,
      action: v,
      onSubmit: g,
      relative: y,
      preventScrollReset: _,
      viewTransition: b,
      unstable_defaultShouldRevalidate: x,
      ...R
    },
    S
  ) => {
    let { unstable_useTransitions: w } = T.useContext(Ut),
      j = Fv(),
      A = Pv(v, { relative: y }),
      k = h.toLowerCase() === 'get' ? 'get' : 'post',
      Q = typeof v == 'string' && Qp.test(v),
      P = (ee) => {
        if ((g && g(ee), ee.defaultPrevented)) return;
        ee.preventDefault();
        let V = ee.nativeEvent.submitter,
          H = (V == null ? void 0 : V.getAttribute('formmethod')) || h,
          U = () =>
            j(V || ee.currentTarget, {
              fetcherKey: i,
              method: H,
              navigate: o,
              replace: r,
              state: d,
              relative: y,
              preventScrollReset: _,
              viewTransition: b,
              unstable_defaultShouldRevalidate: x,
            });
        w && o !== !1 ? T.startTransition(() => U()) : U();
      };
    return T.createElement('form', {
      ref: S,
      method: k,
      action: A,
      onSubmit: s ? g : P,
      ...R,
      'data-discover': !Q && a === 'render' ? 'true' : void 0,
    });
  }
);
Zv.displayName = 'Form';
function Kv(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Kp(a) {
  let i = T.useContext(Aa);
  return (Ze(i, Kv(a)), i);
}
function Iv(
  a,
  {
    target: i,
    replace: o,
    unstable_mask: s,
    state: r,
    preventScrollReset: d,
    relative: h,
    viewTransition: v,
    unstable_defaultShouldRevalidate: g,
    unstable_useTransitions: y,
  } = {}
) {
  let _ = sl(),
    b = hl(),
    x = Di(a, { relative: h });
  return T.useCallback(
    (R) => {
      if (kv(R, i)) {
        R.preventDefault();
        let S = o !== void 0 ? o : Mi(b) === Mi(x),
          w = () =>
            _(a, {
              replace: S,
              unstable_mask: s,
              state: r,
              preventScrollReset: d,
              relative: h,
              viewTransition: v,
              unstable_defaultShouldRevalidate: g,
            });
        y ? T.startTransition(() => w()) : w();
      }
    },
    [b, _, x, o, s, r, i, a, d, h, v, g, y]
  );
}
var Jv = 0,
  Wv = () => `__${String(++Jv)}__`;
function Fv() {
  let { router: a } = Kp('useSubmit'),
    { basename: i } = T.useContext(Ut),
    o = yv(),
    s = a.fetch,
    r = a.navigate;
  return T.useCallback(
    async (d, h = {}) => {
      let { action: v, method: g, encType: y, formData: _, body: b } = jv(d, i);
      if (h.navigate === !1) {
        let x = h.fetcherKey || Wv();
        await s(x, o, h.action || v, {
          unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: _,
          body: b,
          formMethod: h.method || g,
          formEncType: h.encType || y,
          flushSync: h.flushSync,
        });
      } else
        await r(h.action || v, {
          unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: _,
          body: b,
          formMethod: h.method || g,
          formEncType: h.encType || y,
          replace: h.replace,
          state: h.state,
          fromRouteId: o,
          flushSync: h.flushSync,
          viewTransition: h.viewTransition,
        });
    },
    [s, r, i, o]
  );
}
function Pv(a, { relative: i } = {}) {
  let { basename: o } = T.useContext(Ut),
    s = T.useContext(ul);
  Ze(s, 'useFormAction must be used inside a RouteContext');
  let [r] = s.matches.slice(-1),
    d = { ...Di(a || '.', { relative: i }) },
    h = hl();
  if (a == null) {
    d.search = h.search;
    let v = new URLSearchParams(d.search),
      g = v.getAll('index');
    if (g.some((_) => _ === '')) {
      (v.delete('index'), g.filter((b) => b).forEach((b) => v.append('index', b)));
      let _ = v.toString();
      d.search = _ ? `?${_}` : '';
    }
  }
  return (
    (!a || a === '.') &&
      r.route.index &&
      (d.search = d.search ? d.search.replace(/^\?/, '?index&') : '?index'),
    o !== '/' && (d.pathname = d.pathname === '/' ? o : nl([o, d.pathname])),
    Mi(d)
  );
}
function eb(a, { relative: i } = {}) {
  let o = T.useContext(Up);
  Ze(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = Kp('useViewTransitionState'),
    r = Di(a, { relative: i });
  if (!o.isTransitioning) return !1;
  let d = zl(o.currentLocation.pathname, s) || o.currentLocation.pathname,
    h = zl(o.nextLocation.pathname, s) || o.nextLocation.pathname;
  return ss(r.pathname, h) != null || ss(r.pathname, d) != null;
}
const tb = '_layout_mn6ug_1',
  lb = '_enemies_mn6ug_12',
  nb = '_enemy_mn6ug_20',
  ab = '_targeted_mn6ug_35',
  ib = '_enemyName_mn6ug_39',
  ub = '_down_mn6ug_44',
  sb = '_log_mn6ug_48',
  cb = '_logLine_mn6ug_60',
  ob = '_party_mn6ug_64',
  rb = '_rowTag_mn6ug_71',
  fb = '_cardRow_mn6ug_77',
  db = '_card_mn6ug_77',
  mb = '_cardActive_mn6ug_99',
  hb = '_cardDecided_mn6ug_104',
  pb = '_cardName_mn6ug_108',
  yb = '_uni_mn6ug_116',
  gb = '_summons_mn6ug_120',
  _b = '_summon_mn6ug_120',
  vb = '_summonName_mn6ug_138',
  bb = '_summonHp_mn6ug_147',
  Sb = '_cardNums_mn6ug_153',
  xb = '_cardCmd_mn6ug_159',
  Eb = '_empty_mn6ug_165',
  Tb = '_command_mn6ug_170',
  Nb = '_skillList_mn6ug_176',
  kb = '_skillBtn_mn6ug_182',
  Ab = '_skillTop_mn6ug_194',
  Cb = '_skillName_mn6ug_201',
  jb = '_skillDesc_mn6ug_206',
  Mb = '_target_mn6ug_35',
  Rb = '_unionBanner_mn6ug_217',
  wb = '_unionCancel_mn6ug_231',
  Ob = '_unionHint_mn6ug_240',
  Db = '_unionBtn_mn6ug_246',
  zb = '_cmdHead_mn6ug_252',
  Bb = '_menu_mn6ug_257',
  Lb = '_menuBtn_mn6ug_263',
  Ub = '_tp_mn6ug_280',
  qb = '_menuBack_mn6ug_286',
  Hb = '_execRow_mn6ug_296',
  Gb = '_redo_mn6ug_301',
  Yb = '_primary_mn6ug_311',
  $b = '_result_mn6ug_326',
  Xb = '_resultTitle_mn6ug_337',
  Vb = '_resultBody_mn6ug_342',
  F = {
    layout: tb,
    enemies: lb,
    enemy: nb,
    targeted: ab,
    enemyName: ib,
    down: ub,
    log: sb,
    logLine: cb,
    party: ob,
    rowTag: rb,
    cardRow: fb,
    card: db,
    cardActive: mb,
    cardDecided: hb,
    cardName: pb,
    uni: yb,
    summons: gb,
    summon: _b,
    summonName: vb,
    summonHp: bb,
    cardNums: Sb,
    cardCmd: xb,
    empty: Eb,
    command: Tb,
    skillList: Nb,
    skillBtn: kb,
    skillTop: Ab,
    skillName: Cb,
    skillDesc: jb,
    target: Mb,
    unionBanner: Rb,
    unionCancel: wb,
    unionHint: Ob,
    unionBtn: Db,
    cmdHead: zb,
    menu: Bb,
    menuBtn: Lb,
    tp: Ub,
    menuBack: qb,
    execRow: Hb,
    redo: Gb,
    primary: Yb,
    result: $b,
    resultTitle: Xb,
    resultBody: Vb,
  },
  Qb = '_row_1t6j7_1',
  Zb = '_label_1t6j7_8',
  Kb = '_track_1t6j7_16',
  Ib = '_fill_1t6j7_24',
  Jb = '_value_1t6j7_30',
  ki = { row: Qb, label: Zb, track: Kb, fill: Ib, value: Jb },
  es = ({ value: a, max: i, color: o = '#4caf50', label: s, showValue: r = !0 }) => {
    const d = i > 0 ? Math.max(0, Math.min(100, (a / i) * 100)) : 0;
    return m.jsxs('div', {
      className: ki.row,
      children: [
        s ? m.jsx('span', { className: ki.label, children: s }) : null,
        m.jsx('div', {
          className: ki.track,
          children: m.jsx('div', {
            className: ki.fill,
            style: { width: `${d}%`, backgroundColor: o },
          }),
        }),
        r
          ? m.jsxs('span', {
              className: ki.value,
              children: [Math.max(0, Math.round(a)), '/', Math.round(i)],
            })
          : null,
      ],
    });
  },
  dn = {
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
function Wb(a) {
  return a.category === 'food' ? 0 : a.category === 'material' ? 8 : Math.floor(a.buyPrice / 2);
}
function Fb(a) {
  var i;
  return ((i = et[a]) == null ? void 0 : i.category) === 'food';
}
const Ft = {
    race_human: {
      id: 'race_human',
      name: 'ヒト',
      baseStatsAtLv1: { hp: 40, tp: 20, str: 8, vit: 8, agi: 8, int: 8, mnd: 8, luc: 8 },
      statGrowth: { hp: 8, tp: 4, str: 2, vit: 2, agi: 2, int: 2, mnd: 2, luc: 2 },
      raceSkillTree: {
        skills: [
          { skillId: 'skill_union_rally', maxLevel: 3 },
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
          { skillId: 'skill_fishing', maxLevel: 1 },
          { skillId: 'skill_hunting', maxLevel: 1 },
          { skillId: 'skill_harvest', maxLevel: 1 },
        ],
      },
      defaultClassId: 'class_ranger',
    },
  },
  Cr = {
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
  xa = {
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
  Pb = 500,
  or = 30,
  _s = 3,
  vs = 2,
  e1 = _s + vs,
  Ai = { TITLE_DEPTH: 20, REBIRTH_MIN_LEVEL: 30 },
  Ip = 5,
  t1 = 5,
  ml = {
    MAX_LEVEL: 5,
    STAT_PER_LEVEL: 2,
    INGOT_INC: { copper: 1, silver: 3, gold: 5 },
    FRAGMENTS_PER_INGOT: 10,
    RECYCLE_FRAGMENTS: 3,
  },
  Ci = (a) => a > 0 && a % Le.BOSS_INTERVAL === 0,
  sp = (a) => Math.round(Le.EXP_CURVE_BASE * Math.pow(a, Le.EXP_CURVE_POW)),
  Jo = (a) => a < Le.LEVEL_CAP,
  jr = (a, i) => 1 + Le.ENEMY_SCALE_K * (a - i),
  Bl = {
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
  ht = {
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
  ja = {
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
  l1 = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'],
  n1 = ['slash', 'pierce', 'bash'],
  os = (a, i, o) => Math.max(i, Math.min(o, a));
function Jp(a, i) {
  const o = {};
  for (const s of l1) o[s] = Math.round(a[s] * i);
  return o;
}
function a1(a, i) {
  return Jp(a.baseStats, jr(i, a.refDepth));
}
function _a(a, i) {
  const o = new Map();
  for (const r of a) {
    if (r.stat !== i) continue;
    const d = os(r.modifier, 0.5, 1.5),
      h = o.get(r.stackGroup);
    (h === void 0 || Math.abs(d - 1) > Math.abs(h - 1)) && o.set(r.stackGroup, d);
  }
  let s = 1;
  for (const r of o.values()) s *= r;
  return os(s, 0.25, 2);
}
function cp(a, i, o) {
  const s = (a.str * 2 + (i.atk ?? 0)) * _a(o, 'patk'),
    r = (a.vit * 2 + (i.def ?? 0)) * _a(o, 'pdef'),
    d = (a.int * 2 + (i.mat ?? 0)) * _a(o, 'matk'),
    h = (a.mnd * 2 + (i.mdf ?? 0)) * _a(o, 'mdef');
  return {
    patk: s,
    pdef: r,
    matk: d,
    mdef: h,
    hit: a.agi,
    acc: a.agi * _a(o, 'acc'),
    eva: a.agi * _a(o, 'eva'),
    crit: a.luc,
  };
}
const i1 = (a) => a.ailments.some((i) => i.type === 'blind'),
  u1 = (a) => a.ailments.some((i) => i.type === 'legBind');
function Wp(a, i, o, s) {
  const r = o.statBase === 'str',
    d = cp(a.stats, a.equip, a.buffs),
    h = cp(i.stats, i.equip, i.buffs),
    v = r ? d.patk : d.matk,
    g = r ? h.pdef : h.mdef;
  let y = !0;
  if (r) {
    const H = i1(a) ? Le.BLIND_ACC_PENALTY : 0,
      U = u1(i) ? 0 : h.eva,
      Z = os(Le.BASE_HIT + (d.acc - U) * Le.HIT_AGI_K - H, Le.HIT_MIN, 1);
    y = s.next() < Z;
  }
  if (!y) return { damage: 0, hit: !1, critical: !1 };
  const b = (v * o.power * Le.DAMAGE_DEF_K) / (Le.DAMAGE_DEF_K + Math.max(0, g)),
    x = r && n1.includes(o.element),
    R = x && a.row === 'back' ? Le.BACK_ROW_MELEE_MULT : 1,
    S = x && i.row === 'back' ? Le.BACK_ROW_MELEE_MULT : 1,
    w = R * S,
    [j, A] = Le.DMG_VARIANCE,
    k = j + s.next() * (A - j);
  let Q = b * o.elementMultiplier * w * k;
  const P = os(
      Le.CRIT_BASE + (a.stats.luc - i.stats.luc) * Le.CRIT_LUC_K,
      Le.CRIT_MIN,
      Le.CRIT_MAX
    ),
    ee = s.next() < P;
  return (
    ee && (Q *= Le.CRIT_MULT),
    { damage: o.elementMultiplier === 0 ? 0 : Math.max(1, Math.floor(Q)), hit: !0, critical: ee }
  );
}
function s1(a, i) {
  const o = ht[a];
  if (!o || i <= 0) return {};
  const s = i * ml.STAT_PER_LEVEL;
  return o.slot === 'weapon' ? { atk: s, mat: s } : o.slot === 'armor' ? { def: s, mdf: s } : {};
}
const Fp = ['weapon', 'armor', 'accessory'];
function c1(a, i, o) {
  const s = a.guild.equipment.map((d) => (d.id === i ? o(d) : d)),
    r = a.guild.members.map((d) => {
      let h = !1;
      const v = { ...d.equipment };
      for (const g of Fp) {
        const y = v[g];
        y && y.id === i && ((v[g] = o(y)), (h = !0));
      }
      return h ? { ...d, equipment: v } : d;
    });
  return { ...a, guild: { ...a.guild, equipment: s, members: r } };
}
function o1(a, i, o) {
  let s = a.guild.equipment.find((h) => h.id === i);
  if (!s)
    for (const h of a.guild.members)
      for (const v of Fp) {
        const g = h.equipment[v];
        (g == null ? void 0 : g.id) === i && (s = g);
      }
  if (!s) return { ok: !1, save: a, reason: 'notFound' };
  if (s.forgeLevel >= ml.MAX_LEVEL) return { ok: !1, save: a, reason: 'maxLevel' };
  if ((a.forgeInventory.ingots[o] ?? 0) <= 0) return { ok: !1, save: a, reason: 'noIngot' };
  const r = Math.min(ml.MAX_LEVEL, s.forgeLevel + ml.INGOT_INC[o]);
  let d = {
    ...a,
    forgeInventory: {
      ...a.forgeInventory,
      ingots: { ...a.forgeInventory.ingots, [o]: a.forgeInventory.ingots[o] - 1 },
    },
  };
  return ((d = c1(d, i, (h) => ({ ...h, forgeLevel: r }))), { ok: !0, save: d });
}
function r1(a, i) {
  if (!a.guild.equipment.find((h) => h.id === i)) return { ok: !1, save: a, reason: 'notFound' };
  const s = a.guild.equipment.filter((h) => h.id !== i),
    r = { ...a.forgeInventory.fragments };
  r.common = (r.common ?? 0) + ml.RECYCLE_FRAGMENTS;
  let d = a.forgeInventory.ingots.copper;
  for (; r.common >= ml.FRAGMENTS_PER_INGOT; ) ((r.common -= ml.FRAGMENTS_PER_INGOT), (d += 1));
  return {
    ok: !0,
    save: {
      ...a,
      guild: { ...a.guild, equipment: s },
      forgeInventory: {
        ...a.forgeInventory,
        fragments: r,
        ingots: { ...a.forgeInventory.ingots, copper: d },
      },
    },
  };
}
function rs(a) {
  var o;
  const i = ((o = ht[a.masterId]) == null ? void 0 : o.name) ?? a.masterId;
  return a.forgeLevel > 0 ? `${i} +${a.forgeLevel}` : i;
}
const gt = {
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
        { skillId: 'skill_summon_bulwark', maxLevel: 3 },
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
      ],
    },
    equipableWeaponTypes: ['bow', 'fist'],
    equipableArmorTypes: ['light', 'clothes'],
    titleOptions: ['title_sniper', 'title_tracker'],
  },
};
function Pp(a, i) {
  var o;
  return ((o = a.guild.storage.find((s) => s.itemId === i)) == null ? void 0 : o.qty) ?? 0;
}
function Mr(a, i, o = 1) {
  if (o <= 0) return a;
  const s = [...a.guild.storage],
    r = s.findIndex((d) => d.itemId === i);
  return (
    r >= 0 ? (s[r] = { ...s[r], qty: s[r].qty + o }) : s.push({ itemId: i, qty: o }),
    { ...a, guild: { ...a.guild, storage: s } }
  );
}
function Rr(a, i, o = 1) {
  if (o <= 0) return a;
  const s = a.guild.storage.findIndex((h) => h.itemId === i);
  if (s < 0 || a.guild.storage[s].qty < o) return a;
  const r = [...a.guild.storage],
    d = r[s].qty - o;
  return (
    d <= 0 ? r.splice(s, 1) : (r[s] = { ...r[s], qty: d }),
    { ...a, guild: { ...a.guild, storage: r } }
  );
}
const ey = 60,
  bs = (a) => a.guild.foodStorage ?? [];
function ty(a) {
  return bs(a).reduce((i, o) => i + o.qty, 0);
}
function wr(a, i) {
  var o;
  return ((o = bs(a).find((s) => s.itemId === i)) == null ? void 0 : o.qty) ?? 0;
}
function ly(a, i, o = 1) {
  if (o <= 0) return a;
  const s = ey - ty(a),
    r = Math.min(o, Math.max(0, s));
  if (r <= 0) return a;
  const d = [...bs(a)],
    h = d.findIndex((v) => v.itemId === i);
  return (
    h >= 0 ? (d[h] = { ...d[h], qty: d[h].qty + r }) : d.push({ itemId: i, qty: r }),
    { ...a, guild: { ...a.guild, foodStorage: d } }
  );
}
function ny(a, i, o = 1) {
  if (o <= 0) return a;
  const s = [...bs(a)],
    r = s.findIndex((h) => h.itemId === i);
  if (r < 0 || s[r].qty < o) return a;
  const d = s[r].qty - o;
  return (
    d <= 0 ? s.splice(r, 1) : (s[r] = { ...s[r], qty: d }),
    { ...a, guild: { ...a.guild, foodStorage: s } }
  );
}
function ay(a, i, o) {
  return {
    ...a,
    guild: { ...a.guild, members: a.guild.members.map((s) => (s.id === i ? o(s) : s)) },
  };
}
function f1() {
  return `eq_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function d1(a, i, o = 0) {
  if (!ht[i]) return a;
  const s = { id: f1(), masterId: i, forgeLevel: o };
  return { ...a, guild: { ...a.guild, equipment: [...a.guild.equipment, s] } };
}
function Or(a, i) {
  const o = ht[i];
  if (!o) return !1;
  const s = gt[a.classId];
  return s
    ? o.slot === 'weapon'
      ? !!o.weaponType && s.equipableWeaponTypes.includes(o.weaponType)
      : o.slot === 'armor'
        ? !!o.armorType && s.equipableArmorTypes.includes(o.armorType)
        : !0
    : !1;
}
function m1(a, i, o) {
  const s = a.guild.equipment.find((y) => y.id === o),
    r = a.guild.members.find((y) => y.id === i);
  if (!s || !r || !Or(r, s.masterId)) return a;
  const d = ht[s.masterId];
  let h = a.guild.equipment.filter((y) => y.id !== o);
  const v = r.equipment[d.slot];
  v && (h = [...h, v]);
  const g = { ...a, guild: { ...a.guild, equipment: h } };
  return ay(g, i, (y) => ({ ...y, equipment: { ...y.equipment, [d.slot]: s } }));
}
function Dr(a, i, o) {
  const s = a.guild.members.find((h) => h.id === i);
  if (!s) return a;
  const r = s.equipment[o];
  if (!r) return a;
  const d = { ...a, guild: { ...a.guild, equipment: [...a.guild.equipment, r] } };
  return ay(d, i, (h) => ({ ...h, equipment: { ...h.equipment, [o]: null } }));
}
const rn = (a) => ({ hp: 0, tp: 0, str: 0, vit: 0, agi: 0, int: 0, mnd: 0, luc: 0, ...a }),
  Ta = {
    title_berserker: {
      id: 'title_berserker',
      name: '狂戦士',
      parentClassId: 'class_warrior',
      skillTree: { skills: [] },
      growthModifier: rn({ str: 1 }),
    },
    title_sentinel: {
      id: 'title_sentinel',
      name: '哨戒兵',
      parentClassId: 'class_warrior',
      skillTree: { skills: [] },
      growthModifier: rn({ vit: 1 }),
    },
    title_bulwark: {
      id: 'title_bulwark',
      name: '城壁',
      parentClassId: 'class_guardian',
      skillTree: { skills: [] },
      growthModifier: rn({ vit: 1, hp: 2 }),
    },
    title_vanguard: {
      id: 'title_vanguard',
      name: '先鋒',
      parentClassId: 'class_guardian',
      skillTree: { skills: [] },
      growthModifier: rn({ str: 1 }),
    },
    title_pyromancer: {
      id: 'title_pyromancer',
      name: '紅蓮術士',
      parentClassId: 'class_mage',
      skillTree: { skills: [] },
      growthModifier: rn({ int: 1 }),
    },
    title_sage: {
      id: 'title_sage',
      name: '賢者',
      parentClassId: 'class_mage',
      skillTree: { skills: [] },
      growthModifier: rn({ tp: 2, mnd: 1 }),
    },
    title_sniper: {
      id: 'title_sniper',
      name: '狙撃手',
      parentClassId: 'class_ranger',
      skillTree: { skills: [] },
      growthModifier: rn({ agi: 1, luc: 1 }),
    },
    title_tracker: {
      id: 'title_tracker',
      name: '追跡者',
      parentClassId: 'class_ranger',
      skillTree: { skills: [] },
      growthModifier: rn({ agi: 1 }),
    },
  },
  h1 = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];
function zi(a) {
  var v, g;
  const i = Ft[a.raceId];
  if (!i) throw new Error(`computeBaseStats: 未定義の種族 "${a.raceId}"`);
  const s = Math.max(1, Math.min(a.level, Le.LEVEL_CAP)) - 1,
    r = a.titleId ? ((v = Ta[a.titleId]) == null ? void 0 : v.growthModifier) : void 0,
    d = ((g = a.rebirthBonus) == null ? void 0 : g.allStats) ?? 0,
    h = {};
  for (const y of h1) {
    const _ = i.statGrowth[y] + ((r == null ? void 0 : r[y]) ?? 0);
    h[y] = i.baseStatsAtLv1[y] + _ * s + d;
  }
  return h;
}
const p1 = 3,
  Dl = (a, i, o) => Math.max(i, Math.min(o, a)),
  y1 = {
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
function g1(a) {
  const i = { atk: 0, mat: 0, def: 0, mdf: 0 };
  for (const o of Object.values(a.equipment)) {
    if (!o) continue;
    const s = ht[o.masterId];
    if (!s) continue;
    const r = s1(o.masterId, o.forgeLevel);
    ((i.atk += (s.bonuses.atk ?? 0) + (r.atk ?? 0)),
      (i.mat += (s.bonuses.mat ?? 0) + (r.mat ?? 0)),
      (i.def += (s.bonuses.def ?? 0) + (r.def ?? 0)),
      (i.mdf += (s.bonuses.mdf ?? 0) + (r.mdf ?? 0)));
  }
  return i;
}
function _1(a, i) {
  var h;
  const o = a.guild.members.find((v) => v.id === i);
  if (!o) return null;
  const s = (h = a.diveState) == null ? void 0 : h.party.find((v) => v.charId === i),
    r = zi(o),
    d = a.guild.party.front.includes(i);
  return {
    id: i,
    name: o.name,
    side: 'ally',
    row: d ? 'front' : 'back',
    stats: r,
    equip: g1(o),
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
function v1(a, i, o) {
  const s = Bl[a],
    r = a1(s, o);
  return {
    id: `enemy_${i}`,
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
    enemyId: a,
    resist: s.resist,
  };
}
function iy(a, i, o, s, r) {
  const d = ja[a],
    h = Jp(d.baseStats, jr(i, d.refDepth)),
    v = r ?? h.hp;
  return {
    id: s,
    name: d.name,
    side: 'ally',
    row: 'front',
    stats: h,
    equip: {},
    hp: v,
    maxHp: h.hp,
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
function op(a, i, o = 'none') {
  var g, y;
  const s = ((g = a.diveState) == null ? void 0 : g.depth) ?? 1,
    d = [...a.guild.party.front, ...a.guild.party.back]
      .filter((_) => _ !== null)
      .map((_) => _1(a, _))
      .filter((_) => _ !== null),
    h = i.map((_, b) => v1(_, b, s)),
    v = (((y = a.diveState) == null ? void 0 : y.persistentSummons) ?? [])
      .map((_, b) => iy(_.summonKind, s, _.ownerId, `summon_persist_${b}`, _.hp))
      .filter((_) => !_.isDown);
  return {
    turn: 1,
    depth: s,
    allies: d,
    enemies: h,
    summons: v,
    log: [],
    outcome: 'ongoing',
    firstStrike: o,
    drops: [],
    consumedItems: [],
  };
}
const yt = (a, i) => (i === 'ally' ? a.allies : a.enemies).filter((o) => !o.isDown),
  zr = (a) => a.summons.filter((i) => !i.isDown);
function Ol(a, i) {
  return (
    a.allies.find((o) => o.id === i) ??
    a.enemies.find((o) => o.id === i) ??
    a.summons.find((o) => o.id === i)
  );
}
const uy = (a) => {
    var i;
    return (
      !!a.isSummon && !!a.summonKind && ((i = ja[a.summonKind]) == null ? void 0 : i.buffImmune)
    );
  },
  sy = (a, i) => {
    var o;
    return ((o = a.resist) == null ? void 0 : o[i]) ?? 1;
  };
function Br(a, i, o) {
  ((a.hp = Dl(a.hp - i, 0, a.maxHp)),
    a.hp === 0 &&
      !a.isDown &&
      ((a.isDown = !0),
      (a.unionGauge = Math.floor(a.unionGauge / 2)),
      o.push({ text: `${a.name} は倒れた！` })));
}
function fs(a, i) {
  a.isDown || (a.unionGauge = Dl(a.unionGauge + i, 0, 100));
}
function rr(a, i) {
  uy(a) ||
    ((a.buffs = a.buffs.filter((o) => !(o.stat === i.stat && o.stackGroup === i.stackGroup))),
    a.buffs.push(i));
}
function b1(a, i) {
  if (uy(a)) return;
  const o = a.ailments.find((s) => s.type === i.type);
  if (o) {
    o.remainingTurns = Math.max(o.remainingTurns, i.remainingTurns);
    return;
  }
  a.ailments.push(i);
}
function S1(a, i, o) {
  return Dl(a * (1 + (i.stats.luc - o.stats.luc) * Le.AILMENT_LUC_K), 0, Le.AILMENT_MAX);
}
function cy(a, i, o, s) {
  const r = i.side === 'ally' ? 'enemy' : 'ally';
  switch (o) {
    case 'self':
      return [i];
    case 'allyAll':
      return i.side === 'ally' ? [...yt(a, 'ally'), ...zr(a)] : yt(a, 'enemy');
    case 'allyOne': {
      const d = Ol(a, s);
      return d && d.side === i.side ? [d] : [i];
    }
    case 'enemyAll':
      return yt(a, r);
    case 'enemyRow':
    case 'enemyOne':
    default: {
      const d = Ol(a, s);
      return d && d.side === r && !d.isDown ? [d] : yt(a, r).slice(0, 1);
    }
  }
}
function x1(a, i, o, s) {
  return cy(a, i, o.target, s);
}
function oy(a, i, o, s, r, d, h) {
  switch (o.kind) {
    case 'damage': {
      const v = o.hits ?? 1;
      for (const g of d)
        if (!g.isDown)
          for (let y = 0; y < v; y++) {
            const _ = Wp(
              i,
              g,
              { statBase: o.statBase, power: o.power(r), element: s, elementMultiplier: sy(g, s) },
              h
            );
            _.hit
              ? (Br(g, _.damage, a.log),
                fs(g, 5),
                a.log.push({
                  text: `${i.name} の攻撃！ ${g.name} に ${_.damage} ダメージ${_.critical ? '（会心）' : ''}`,
                }))
              : a.log.push({ text: `${i.name} の攻撃は外れた` });
          }
      break;
    }
    case 'heal': {
      const v = o.amount(r);
      for (const g of d) g.isDown || (g.hp = Dl(g.hp + v, 0, g.maxHp));
      a.log.push({ text: `${i.name} は回復魔法を使った（+${v}）` });
      break;
    }
    case 'buff': {
      for (const v of d)
        rr(v, {
          stat: o.stat,
          modifier: o.modifier(r),
          remainingTurns: o.turns,
          stackGroup: o.stackGroup,
        });
      a.log.push({ text: `${i.name} は態勢を整えた` });
      break;
    }
    case 'ailment': {
      for (const v of d) {
        if (v.isDown) continue;
        const g = S1(o.chance(r), i, v);
        h.next() < g &&
          (b1(v, { type: o.ailment, remainingTurns: o.turns, magnitude: o.magnitude }),
          a.log.push({ text: `${v.name} は${y1[o.ailment]}になった` }));
      }
      break;
    }
    case 'summon': {
      if (i.side !== 'ally') break;
      if (zr(a).length >= p1) {
        a.log.push({ text: 'これ以上は召喚できない' });
        break;
      }
      const v = `summon_${a.turn}_${a.summons.length}`,
        g = iy(o.summonKind, a.depth, i.id, v);
      (a.summons.push(g), a.log.push({ text: `${i.name} は ${g.name} を召喚した！` }));
      break;
    }
  }
}
function Wo(a, i, o, s) {
  var h;
  if (o.isDown) return;
  const r = i.enemyId
      ? (Bl[i.enemyId].attackElement ?? 'bash')
      : i.isSummon && i.summonKind
        ? (((h = ja[i.summonKind]) == null ? void 0 : h.attackElement) ?? 'bash')
        : 'bash',
    d = Wp(i, o, { statBase: 'str', power: 1, element: r, elementMultiplier: sy(o, r) }, s);
  d.hit
    ? (Br(o, d.damage, a.log),
      fs(i, 5),
      fs(o, 5),
      a.log.push({
        text: `${i.name} の攻撃！ ${o.name} に ${d.damage} ダメージ${d.critical ? '（会心）' : ''}`,
      }))
    : a.log.push({ text: `${i.name} の攻撃は外れた` });
}
const rp = (a) => (a.length === 0 ? 0 : a.reduce((i, o) => i + o.stats.agi, 0) / a.length),
  E1 = (a) => a.ailments.some((i) => i.type === 'paralysis'),
  Lr = (a, i) => a.ailments.some((o) => o.type === i),
  Fo = (a) => Lr(a, 'armBind'),
  T1 = (a) => Lr(a, 'headBind'),
  N1 = (a) => Lr(a, 'legBind');
function fp(a) {
  return a.effects.some((i) => i.kind === 'damage' && i.statBase === 'str');
}
function k1(a, i, o) {
  const s = xa[i.unionSkillId];
  if (!s) return;
  const r = Ol(a, i.actorId);
  if (!r || r.isDown || r.side !== 'ally') return;
  if (r.unionGauge < 100) {
    a.log.push({ text: `${r.name} はユニオンゲージが足りない` });
    return;
  }
  const d = new Set(i.participantIds);
  d.add(r.id);
  const h = [...d].map((_) => Ol(a, _)).filter((_) => !!_ && !_.isDown && _.side === 'ally');
  if (h.length < s.requiredParticipants) {
    a.log.push({ text: `${r.name} の${s.name}は参加人数が足りない` });
    return;
  }
  const v = [r, ...h.filter((_) => _.id !== r.id)].slice(0, s.requiredParticipants);
  for (const _ of v) _.unionGauge = Dl(_.unionGauge - s.gaugeCostPerParticipant, 0, 100);
  a.log.push({ text: `ユニオン！ ${r.name} の${s.name}！` });
  const g = 1,
    y = cy(a, r, s.target, i.targetId);
  for (const _ of s.effects) oy(a, r, _, s.element, g, y, o);
}
function Po(a, i, o) {
  var b, x, R;
  if (a.outcome !== 'ongoing') return a;
  const s = structuredClone({ ...a, log: [] }),
    r = new Map(i.filter((S) => S.kind !== 'union').map((S) => [S.actorId, S])),
    d = s.turn === 1 && s.firstStrike !== 'none',
    h = d && s.firstStrike === 'preemptive',
    v = d && s.firstStrike === 'ambush';
  if (
    (h && s.log.push({ text: '先制攻撃！ 味方が先手を取った' }),
    v && s.log.push({ text: '不意打ち！ 敵に先手を取られた' }),
    !v)
  )
    for (const S of i) S.kind === 'union' && k1(s, S, o);
  const g = i.find((S) => S.kind === 'flee');
  if (!v && g && s.outcome === 'ongoing') {
    const S = Ol(s, g.actorId);
    if (S && N1(S)) s.log.push({ text: `${S.name} は脚を封じられて逃げられない` });
    else {
      const w = Dl(0.5 + (rp(yt(s, 'ally')) - rp(yt(s, 'enemy'))) * 0.02, 0.1, 0.95);
      if (o.next() < w)
        return (s.log.push({ text: 'うまく逃げ切れた！' }), (s.outcome = 'fled'), s);
      s.log.push({ text: '逃げられなかった！' });
    }
  }
  if (!v)
    for (const S of i) {
      if (S.kind !== 'guard') continue;
      const w = Ol(s, S.actorId);
      !w ||
        w.isDown ||
        (rr(w, { stat: 'pdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }),
        rr(w, { stat: 'mdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }));
    }
  const y = new Map();
  if (!h)
    for (const S of yt(s, 'enemy')) {
      const w = [...zr(s), ...yt(s, 'ally')];
      w.length > 0 && y.set(S.id, o.pick(w).id);
    }
  const _ = [...s.allies, ...s.enemies, ...s.summons]
    .filter((S) => !S.isDown)
    .filter((S) => !(h && S.side === 'enemy') && !(v && S.side === 'ally'))
    .map((S) => ({ c: S, agi: S.stats.agi, tie: o.next() }))
    .sort((S, w) => w.agi - S.agi || w.tie - S.tie)
    .map((S) => S.c);
  for (const S of _)
    if (!S.isDown) {
      if (s.outcome !== 'ongoing') break;
      if (E1(S) && o.next() < Le.PARALYSIS_SKIP) {
        s.log.push({ text: `${S.name} は麻痺で動けない` });
        continue;
      }
      if (S.isSummon) {
        const w = S.summonKind ? ja[S.summonKind] : void 0;
        if (w != null && w.actsOnTurn) {
          const j = yt(s, 'enemy');
          j.length > 0 && Wo(s, S, o.pick(j), o);
        }
        if (yt(s, 'enemy').length === 0) break;
        continue;
      }
      if (S.side === 'enemy') {
        if (Fo(S)) {
          s.log.push({ text: `${S.name} は腕を封じられて攻撃できない` });
          continue;
        }
        const w = y.get(S.id),
          j = w ? Ol(s, w) : void 0,
          A = j && !j.isDown ? j : yt(s, 'ally')[0];
        A && Wo(s, S, A, o);
      } else {
        const w = r.get(S.id);
        if (!w || w.kind === 'guard' || w.kind === 'flee') continue;
        if (w.kind === 'attack') {
          if (Fo(S)) {
            s.log.push({ text: `${S.name} は腕を封じられて攻撃できない` });
            continue;
          }
          const j = Ol(s, w.targetId),
            A = j && !j.isDown ? j : yt(s, 'enemy')[0];
          A && Wo(s, S, A, o);
        } else if (w.kind === 'skill') {
          const j = dn[w.skillId];
          if (!j) continue;
          if (fp(j) && Fo(S)) {
            s.log.push({ text: `${S.name} は腕を封じられてスキルを使えない` });
            continue;
          }
          if (!fp(j) && T1(S)) {
            s.log.push({ text: `${S.name} は頭を封じられてスキルを使えない` });
            continue;
          }
          const A = 1,
            k = j.tpCost(A);
          if (S.tp < k) {
            s.log.push({ text: `${S.name} は TP が足りない` });
            continue;
          }
          ((S.tp -= k), fs(S, 10));
          const Q = x1(s, S, j, w.targetId);
          for (const P of j.effects) oy(s, S, P, j.element, A, Q, o);
        } else if (w.kind === 'item') {
          const j = et[w.itemId];
          if (!j || !((b = j.useContext) != null && b.includes('battle'))) continue;
          const A = Ol(s, w.targetId) ?? S;
          for (const k of j.effects ?? [])
            k.kind === 'heal'
              ? (A.hp = Dl(A.hp + k.amount(1), 0, A.maxHp))
              : k.kind === 'restoreTp' && (A.tp = Dl(A.tp + k.amount(1), 0, A.maxTp));
          (s.consumedItems.push(w.itemId), s.log.push({ text: `${S.name} は ${j.name} を使った` }));
        }
      }
      if (yt(s, 'enemy').length === 0 || yt(s, 'ally').length === 0) break;
    }
  for (const S of [...s.allies, ...s.enemies, ...s.summons]) {
    if (S.isDown) continue;
    const w = S.ailments.find((j) => j.type === 'poison');
    if (w) {
      const j = w.magnitude ?? Math.max(1, Math.floor(S.maxHp * Le.POISON_HP_RATIO));
      (Br(S, j, s.log), s.log.push({ text: `${S.name} は毒で ${j} のダメージ` }));
    }
  }
  for (const S of [...s.allies, ...s.enemies, ...s.summons])
    (!S.isDown &&
      S.maxTp > 0 &&
      (S.tp = Math.min(S.maxTp, S.tp + Math.ceil(S.maxTp * Le.TP_REGEN_RATIO))),
      (S.buffs = S.buffs
        .map((w) => ({ ...w, remainingTurns: w.remainingTurns - 1 }))
        .filter((w) => w.remainingTurns > 0)),
      (S.ailments = S.ailments
        .map((w) => ({ ...w, remainingTurns: w.remainingTurns - 1 }))
        .filter((w) => w.remainingTurns > 0)));
  for (const S of s.enemies)
    if (
      !(
        !S.isDown ||
        !S.enemyId ||
        (((x = a.enemies.find((j) => j.id === S.id)) == null ? void 0 : x.isDown) ?? !1)
      )
    )
      for (const j of Bl[S.enemyId].drops ?? [])
        o.next() < j.rate &&
          (s.drops.push({ enemyId: S.enemyId, itemId: j.itemId }),
          s.log.push({
            text: `${S.name} は ${((R = et[j.itemId]) == null ? void 0 : R.name) ?? j.itemId} を落とした`,
          }));
  return (
    (s.summons = s.summons.filter((S) => !S.isDown)),
    (s.turn += 1),
    yt(s, 'enemy').length === 0
      ? (s.outcome = 'win')
      : yt(s, 'ally').length === 0 && (s.outcome = 'lose'),
    s
  );
}
function ry(a) {
  let i = 0,
    o = 0;
  for (const s of a.enemies) {
    if (!s.enemyId) continue;
    const r = Bl[s.enemyId],
      d = jr(a.depth, r.refDepth);
    ((i += Math.round(r.exp * d)), (o += Math.round(r.gold * d)));
  }
  return { exp: i, gold: o };
}
function A1(a, i) {
  let o = a.level,
    s = a.exp + (Jo(o) ? i : 0),
    r = a.skillPoints.total;
  for (; Jo(o) && s >= sp(o); ) ((s -= sp(o)), (o += 1), (r += Le.SP_PER_LEVEL));
  return {
    ...a,
    level: o,
    exp: Jo(a.level) ? s : a.exp,
    skillPoints: { ...a.skillPoints, total: r },
  };
}
function dp(a, i) {
  if (!a.diveState) return a;
  const o = i.outcome === 'win',
    s = i.outcome === 'win' || i.outcome === 'fled',
    r = new Map(i.allies.map((x) => [x.id, x])),
    d = a.diveState.party.map((x) => {
      const R = r.get(x.charId);
      if (!R) return x;
      let S = R.unionGauge;
      return (
        s && !R.isDown && (S = Dl(S + Le.UNION_GAIN_ON_WIN, 0, 100)),
        { ...x, hp: R.hp, tp: R.tp, unionGauge: S, ailments: R.ailments }
      );
    });
  let h = a.guild.members,
    v = a.guild.gold;
  const g = { ...a.bestiary.monsters };
  for (const x of i.enemies) {
    if (!x.enemyId) continue;
    const R = g[x.enemyId] ?? { seen: !1, defeated: !1, dropsFound: [] };
    g[x.enemyId] = { ...R, seen: !0, defeated: R.defeated || x.isDown };
  }
  if (o)
    for (const x of i.drops) {
      const R = g[x.enemyId];
      R &&
        !R.dropsFound.includes(x.itemId) &&
        (g[x.enemyId] = { ...R, dropsFound: [...R.dropsFound, x.itemId] });
    }
  const y = { ...a.bestiary, monsters: g };
  if (o) {
    const { exp: x, gold: R } = ry(i);
    v += R;
    const S = new Set(d.map((j) => j.charId)),
      w = S.size > 0 ? Math.floor(x / S.size) : 0;
    h = h.map((j) => (S.has(j.id) ? A1(j, w) : j));
  }
  const _ = i.summons
    .filter((x) => {
      var R;
      return (
        !x.isDown &&
        x.summonKind &&
        ((R = ja[x.summonKind]) == null ? void 0 : R.persistsAfterBattle)
      );
    })
    .map((x) => ({ summonKind: x.summonKind, ownerId: x.ownerId ?? '', hp: x.hp }));
  let b = {
    ...a,
    guild: { ...a.guild, members: h, gold: v, bestiary: y },
    bestiary: y,
    diveState: { ...a.diveState, party: d, persistentSummons: _ },
  };
  for (const x of i.consumedItems) b = Rr(b, x, 1);
  if (o) for (const x of i.drops) b = Mr(b, x.itemId, 1);
  return b;
}
const C1 = 8,
  fr = 16,
  ji = 5;
function Ur(a) {
  return a.range(C1, fr);
}
function j1(a, i) {
  const o = a - 1;
  return o <= 0
    ? { stepsUntilEncounter: Ur(i), triggered: !0 }
    : { stepsUntilEncounter: o, triggered: !1 };
}
function M1(a) {
  const i = Math.max(0, fr - a),
    o = Math.round((i / fr) * ji);
  return Math.min(ji, Math.max(0, o));
}
const Wt = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  Na = ['N', 'E', 'S', 'W'];
function fy(a) {
  return Na[(Na.indexOf(a) + 1) % 4];
}
function dy(a) {
  return Na[(Na.indexOf(a) + 3) % 4];
}
function R1(a) {
  return Na[(Na.indexOf(a) + 2) % 4];
}
const w1 = (a, i, o) => a >= 0 && i >= 0 && a < o.width && i < o.height;
function Ea(a, i, o, s) {
  if (a.cells[o][i].walls[s]) return !1;
  const r = i + Wt[s].dx,
    d = o + Wt[s].dy;
  return w1(r, d, a) ? a.cells[d][r].passable : !1;
}
function O1(a, i, o) {
  return Ea(a, i.x, i.y, o) ? { x: i.x + Wt[o].dx, y: i.y + Wt[o].dy } : null;
}
function qr(a, i, o) {
  return ['N', 'E', 'S', 'W'].filter((s) => !a.cells[o][i].walls[s]);
}
const mp = ['N', 'E', 'S', 'W'],
  er = (a, i) => Math.abs(a.x - i.x) + Math.abs(a.y - i.y);
function D1(a, i, o, s, r) {
  const d = i.map((_) => ({ ..._, cell: { ..._.cell } })),
    h = new Map(a.foeSpawns.map((_) => [_.id, _])),
    v = new Set(d.filter((_) => !_.defeated).map((_) => `${_.cell.x},${_.cell.y}`));
  let g = null;
  const y = [...d].sort((_, b) => _.spawnId.localeCompare(b.spawnId, void 0, { numeric: !0 }));
  for (const _ of y) {
    if (g) break;
    if (_.defeated) continue;
    const b = h.get(_.spawnId);
    if (!b) continue;
    !_.alerted && er(_.cell, o) <= b.sightRange && (_.alerted = !0);
    const x = (R) => {
      if (!Ea(a, _.cell.x, _.cell.y, R)) return 'blocked';
      const S = _.cell.x + Wt[R].dx,
        w = _.cell.y + Wt[R].dy;
      if (S === o.x && w === o.y) {
        const j = R === s;
        return (
          (g = { spawnId: _.spawnId, enemyId: b.enemyId, firstStrike: j ? 'ambush' : 'none' }),
          'contact'
        );
      }
      return v.has(`${S},${w}`)
        ? 'blocked'
        : (v.delete(`${_.cell.x},${_.cell.y}`),
          (_.cell = { x: S, y: w }),
          v.add(`${S},${w}`),
          'moved');
    };
    if (_.alerted)
      for (let R = 0; R < b.moveSpeed; R++) {
        let S = null,
          w = er(_.cell, o),
          j = !1;
        for (const k of mp) {
          const Q = _.cell.x + Wt[k].dx,
            P = _.cell.y + Wt[k].dy;
          if (Q === o.x && P === o.y && Ea(a, _.cell.x, _.cell.y, k)) {
            ((S = k), (j = !0));
            break;
          }
          if (!Ea(a, _.cell.x, _.cell.y, k) || v.has(`${Q},${P}`)) continue;
          const ee = er({ x: Q, y: P }, o);
          ee < w && ((w = ee), (S = k));
        }
        if (!S) break;
        const A = x(S);
        if (A === 'contact' || A === 'blocked' || j) break;
      }
    else {
      const R = b.patrol;
      if (R.kind === 'wander') {
        const S = mp.filter(
          (w) =>
            Ea(a, _.cell.x, _.cell.y, w) && !v.has(`${_.cell.x + Wt[w].dx},${_.cell.y + Wt[w].dy}`)
        );
        S.length > 0 && x(r.pick(S));
      } else R.kind === 'charge' && x(R.dir);
    }
  }
  return { foes: d, contact: g };
}
const Rn = {
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
  z1 = Object.keys(Rn);
function B1(a) {
  return Object.values(Bl)
    .filter((i) => i.tierBand === a && !i.isBoss)
    .map((i) => i.id);
}
function L1(a) {
  const i = Object.values(Bl).filter((s) => s.isBoss);
  if (i.length === 0) return null;
  const o = i.filter((s) => s.tierBand === a);
  return o.length > 0 ? o[0].id : i.sort((s, r) => r.tierBand - s.tierBand)[0].id;
}
function U1(a, i, o, s, r) {
  for (const d of ['N', 'E', 'S', 'W']) {
    if (a[o][i].walls[d]) continue;
    const h = i + ll[d].dx,
      v = o + ll[d].dy;
    if (ds(h, v, s, r) && !a[v][h].event) return { x: h, y: v };
  }
  return null;
}
const ll = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  q1 = { N: 'S', E: 'W', S: 'N', W: 'E' };
function H1(a) {
  return Math.min(25, 15 + Math.floor(a / 5));
}
function G1() {
  return { walls: { N: !0, E: !0, S: !0, W: !0 }, floorType: 'normal', passable: !0 };
}
const ds = (a, i, o, s) => a >= 0 && i >= 0 && a < o && i < s;
function hp(a, i, o, s) {
  const { dx: r, dy: d } = ll[s];
  ((a[o][i].walls[s] = !1), (a[o + d][i + r].walls[q1[s]] = !1));
}
function Y1(a, i, o) {
  const s = a.length,
    r = a[0].length,
    d = Array.from({ length: s }, () => Array(r).fill(-1)),
    h = [{ x: i, y: o }];
  d[o][i] = 0;
  for (let v = 0; v < h.length; v++) {
    const { x: g, y } = h[v];
    for (const _ of ['N', 'E', 'S', 'W']) {
      if (a[y][g].walls[_]) continue;
      const b = g + ll[_].dx,
        x = y + ll[_].dy;
      !ds(b, x, r, s) || d[x][b] !== -1 || ((d[x][b] = d[y][g] + 1), h.push({ x: b, y: x }));
    }
  }
  return d;
}
function $1(a, i) {
  const o = H1(a),
    s = o,
    r = o,
    d = Array.from({ length: r }, () => Array.from({ length: s }, () => G1())),
    h = Array.from({ length: r }, () => Array(s).fill(!1)),
    v = i.int(s),
    g = i.int(r),
    y = [{ x: v, y: g }];
  for (h[g][v] = !0; y.length > 0; ) {
    const V = y[y.length - 1],
      H = [];
    for (const ue of ['N', 'E', 'S', 'W']) {
      const ce = V.x + ll[ue].dx,
        I = V.y + ll[ue].dy;
      ds(ce, I, s, r) && !h[I][ce] && H.push(ue);
    }
    if (H.length === 0) {
      y.pop();
      continue;
    }
    const U = i.pick(H);
    hp(d, V.x, V.y, U);
    const Z = V.x + ll[U].dx,
      ae = V.y + ll[U].dy;
    ((h[ae][Z] = !0), y.push({ x: Z, y: ae }));
  }
  const _ = Math.floor((s * r) / 25);
  for (let V = 0; V < _; V++) {
    const H = i.int(s),
      U = i.int(r),
      Z = i.pick(['N', 'E', 'S', 'W']),
      ae = H + ll[Z].dx,
      ue = U + ll[Z].dy;
    ds(ae, ue, s, r) && d[U][H].walls[Z] && hp(d, H, U, Z);
  }
  const b = i.int(s),
    x = i.int(r),
    R = Y1(d, b, x);
  let S = b,
    w = x,
    j = -1;
  for (let V = 0; V < r; V++)
    for (let H = 0; H < s; H++) R[V][H] > j && ((j = R[V][H]), (S = H), (w = V));
  ((d[x][b].event = { kind: 'stairsDown' }), (d[w][S].event = { kind: 'stairsUp' }));
  const A = Math.floor((a - 1) / 10),
    k = [];
  if (Ci(a)) {
    const V = L1(A);
    if (V) {
      const H = U1(d, S, w, s, r) ?? { x: S, y: w };
      k.push({
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
    const V = B1(A),
      H = 1 + Math.floor(a / 8);
    for (let U = 0; U < H && V.length > 0; U++) {
      let Z = i.int(s),
        ae = i.int(r);
      for (let ue = 0; ue < 20; ue++) {
        ((Z = i.int(s)), (ae = i.int(r)));
        const ce = d[ae][Z].event,
          I = Math.abs(Z - b) + Math.abs(ae - x) >= 3;
        if (!ce && I) break;
      }
      k.push({
        id: `foe_${U}`,
        enemyId: i.pick(V),
        startCell: { x: Z, y: ae },
        patrol: { kind: 'wander' },
        moveSpeed: 1,
        sightRange: 3,
        respawn: !1,
      });
    }
  }
  const Q = [],
    P = () => {
      for (let V = 0; V < 25; V++) {
        const H = i.int(s),
          U = i.int(r),
          Z = Math.abs(H - b) + Math.abs(U - x) >= 2;
        if (!d[U][H].event && Z) return { x: H, y: U };
      }
      return null;
    },
    ee = 2 + Math.floor(a / 10);
  for (let V = 0; V < ee; V++) {
    const H = P();
    if (!H) break;
    const U = i.pick(z1),
      Z = `gather_${V}`;
    ((d[H.y][H.x].event = { kind: 'gather', gatherId: Z }), Q.push({ id: Z, cell: H, type: U }));
  }
  if (!Ci(a)) {
    const V = P();
    V && (d[V.y][V.x].event = { kind: 'cookingSpot', spotId: 'cook_0' });
  }
  return {
    depth: a,
    width: s,
    height: r,
    cells: d,
    encounterTable: `band_${A}`,
    foeSpawns: k,
    gatheringPoints: Q,
    bgmId: Ci(a) ? 'bgm_boss' : 'bgm_dungeon',
  };
}
function my(a, i) {
  var o;
  for (let s = 0; s < a.height; s++)
    for (let r = 0; r < a.width; r++)
      if (((o = a.cells[s][r].event) == null ? void 0 : o.kind) === i) return { x: r, y: s };
  return null;
}
const X1 = 4294967296;
function V1(a, i) {
  let o = 3735928559 ^ a,
    s = 1103547991 ^ a;
  for (let r = 0; r < i.length; r++) {
    const d = i.charCodeAt(r);
    ((o = Math.imul(o ^ d, 2654435761)), (s = Math.imul(s ^ d, 1597334677)));
  }
  return (
    (o = Math.imul(o ^ (o >>> 16), 2246822507) ^ Math.imul(s ^ (s >>> 13), 3266489909)),
    (s = Math.imul(s ^ (s >>> 16), 2246822507) ^ Math.imul(o ^ (o >>> 13), 3266489909)),
    (s >>> 0) ^ (o >>> 0)
  );
}
class Hr {
  constructor(i, o) {
    Ho(this, 'baseSeed');
    Ho(this, '_state');
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
      ((i ^ (i >>> 14)) >>> 0) / X1
    );
  }
  int(i) {
    return i <= 0 ? 0 : Math.floor(this.next() * i);
  }
  range(i, o) {
    o < i && ([i, o] = [o, i]);
    const s = o - i + 1;
    return i + this.int(s);
  }
  pick(i) {
    if (i.length === 0) throw new Error('Rng.pick: 空配列は選択できません');
    return i[this.int(i.length)];
  }
  fork(i) {
    const o = V1(this.baseSeed, i);
    return new Hr(o, o);
  }
}
function On(a) {
  return new Hr(a, a);
}
function Q1() {
  return Math.floor(Math.random() * 4294967296) >>> 0;
}
const ms = (a, i) => `${a},${i}`;
function Z1(a, i) {
  return On(a).fork(`floor:${i}`);
}
function hy(a, i) {
  const o = a.towerState.floors[i];
  if (o) return { save: a, floor: o };
  const s = $1(i, Z1(a.masterSeed, i)),
    r = s.foeSpawns.map((v) => ({
      spawnId: v.id,
      cell: { ...v.startCell },
      defeated: !1,
      alerted: !1,
    })),
    d = {
      depth: i,
      seed: a.masterSeed,
      generated: s,
      isBossFloor: Ci(i),
      encounterTier: Math.floor((i - 1) / 10),
      foeRuntime: r,
      openedChests: [],
      depletedGathers: [],
      consumedEvents: [],
    };
  return {
    save: { ...a, towerState: { ...a.towerState, floors: { ...a.towerState.floors, [i]: d } } },
    floor: d,
  };
}
function K1(a) {
  const i = [...a.guild.party.front, ...a.guild.party.back].filter((s) => s !== null),
    o = [];
  for (const s of i) {
    const r = a.guild.members.find((h) => h.id === s);
    if (!r) continue;
    const d = zi(r);
    o.push({ charId: s, hp: d.hp, tp: d.tp, unionGauge: 0, ailments: [] });
  }
  return o;
}
function hs(a, i, o, s) {
  const r = a.towerState.floors[i].generated,
    d = new Set(a.exploredCells[i] ?? []);
  d.add(ms(o, s));
  for (const h of qr(r, o, s)) {
    const v = o + (h === 'E' ? 1 : h === 'W' ? -1 : 0),
      g = s + (h === 'S' ? 1 : h === 'N' ? -1 : 0);
    d.add(ms(v, g));
  }
  return { ...a, exploredCells: { ...a.exploredCells, [i]: [...d] } };
}
function py(a, i, o) {
  var g, y;
  const s = hy(a, i);
  let r = s.save;
  const d = s.floor.generated,
    h = my(d, 'stairsDown') ?? { x: 0, y: 0 },
    v = qr(d, h.x, h.y)[0] ?? 'N';
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
        pos: { x: h.x, y: h.y },
        dir: v,
        party: ((g = r.diveState) == null ? void 0 : g.party) ?? K1(r),
        persistentSummons: ((y = r.diveState) == null ? void 0 : y.persistentSummons) ?? [],
        encounter: { stepsUntilEncounter: Ur(o) },
        pendingFoeBattle: null,
      },
    }),
    hs(r, i, h.x, h.y)
  );
}
function pp(a, i = 1) {
  const o = On(a.masterSeed).fork(`dive:${a.towerState.record.totalDives}`),
    s = {
      ...a,
      diveState: null,
      towerState: {
        ...a.towerState,
        record: { ...a.towerState.record, totalDives: a.towerState.record.totalDives + 1 },
      },
    };
  return py(s, i, o);
}
function yy(a, i) {
  return a.diveState ? { ...a, diveState: { ...a.diveState, dir: i } } : a;
}
function gy(a, i, o) {
  const s = a.towerState.floors[i];
  return {
    ...a,
    towerState: {
      ...a.towerState,
      floors: { ...a.towerState.floors, [i]: { ...s, foeRuntime: o } },
    },
  };
}
function I1(a, i, o) {
  const s = a.diveState;
  if (!s) return { save: a, moved: !1, triggered: !1 };
  const r = a.towerState.floors[s.depth],
    d = r.generated,
    h = O1(d, s.pos, i);
  if (!h) return { save: yy(a, i), moved: !1, triggered: !1 };
  const v = r.foeRuntime.find((b) => !b.defeated && b.cell.x === h.x && b.cell.y === h.y);
  if (v) {
    const b = d.foeSpawns.find((S) => S.id === v.spawnId),
      x = b
        ? {
            spawnId: v.spawnId,
            enemyId: b.enemyId,
            firstStrike: b.isBoss ? 'none' : 'preemptive',
            isBoss: b.isBoss,
          }
        : null;
    let R = { ...a, diveState: { ...s, pos: h, dir: i, pendingFoeBattle: x } };
    return ((R = hs(R, s.depth, h.x, h.y)), { save: R, moved: !0, triggered: x !== null });
  }
  const g = j1(s.encounter.stepsUntilEncounter, o);
  let y = {
    ...a,
    diveState: {
      ...s,
      pos: h,
      dir: i,
      encounter: { stepsUntilEncounter: g.stepsUntilEncounter },
      pendingFoeBattle: null,
    },
  };
  y = hs(y, s.depth, h.x, h.y);
  const _ = D1(d, r.foeRuntime, h, i, o);
  return (
    (y = gy(y, s.depth, _.foes)),
    _.contact
      ? ((y = {
          ...y,
          diveState: {
            ...y.diveState,
            pendingFoeBattle: {
              spawnId: _.contact.spawnId,
              enemyId: _.contact.enemyId,
              firstStrike: _.contact.firstStrike,
            },
          },
        }),
        { save: y, moved: !0, triggered: !0 })
      : { save: y, moved: !0, triggered: g.triggered }
  );
}
function J1(a, i) {
  const o = a.diveState;
  if (!o) return a;
  const s = o.pendingFoeBattle;
  let r = { ...a, diveState: { ...o, pendingFoeBattle: null } };
  if (s && i) {
    const h = r.towerState.floors[o.depth].foeRuntime.map((v) =>
      v.spawnId === s.spawnId ? { ...v, defeated: !0 } : v
    );
    ((r = gy(r, o.depth, h)), s.isBoss && (r = W1(r, o.depth)));
  }
  return r;
}
function W1(a, i, o = Date.now()) {
  const s = a.towerState,
    r = { ...s.bossGates, [i]: { depth: i, defeated: !0 } },
    d = s.warp.unlockedCheckpoints.includes(i)
      ? s.warp.unlockedCheckpoints
      : [...s.warp.unlockedCheckpoints, i].sort((g, y) => g - y),
    h = s.record.bossDefeatLog.some((g) => g.depth === i),
    v = {
      ...s.record,
      highestBossDefeated: Math.max(s.record.highestBossDefeated, i),
      bossDefeatLog: h ? s.record.bossDefeatLog : [...s.record.bossDefeatLog, { depth: i, at: o }],
    };
  return {
    ...a,
    towerState: { ...s, bossGates: r, warp: { ...s.warp, unlockedCheckpoints: d }, record: v },
  };
}
function _y(a, i) {
  var o;
  return Ci(i) ? ((o = a.towerState.bossGates[i]) == null ? void 0 : o.defeated) === !0 : !0;
}
function yp(a) {
  const i = a.diveState;
  if (!i) return null;
  const o = a.towerState.floors[i.depth].generated.cells[i.pos.y][i.pos.x].event;
  return (o == null ? void 0 : o.kind) === 'stairsUp' ||
    (o == null ? void 0 : o.kind) === 'stairsDown'
    ? o.kind
    : null;
}
function F1(a) {
  if (!a.diveState || !_y(a, a.diveState.depth)) return a;
  const i = a.diveState.depth + 1,
    o = On(a.masterSeed).fork(`enc:${i}:${a.towerState.record.totalDives}`);
  return py(a, i, o);
}
function P1(a) {
  if (!a.diveState) return a;
  const i = a.diveState.depth;
  if (i <= 1) return Ri(a);
  const o = i - 1,
    s = hy(a, o),
    r = my(s.floor.generated, 'stairsUp') ?? { x: 0, y: 0 },
    d = On(a.masterSeed).fork(`enc:${o}:${a.towerState.record.totalDives}`);
  let h = s.save;
  const v = s.floor.generated,
    g = qr(v, r.x, r.y)[0] ?? 'N';
  return (
    (h = {
      ...h,
      diveState: {
        ...h.diveState,
        depth: o,
        pos: { x: r.x, y: r.y },
        dir: g,
        encounter: { stepsUntilEncounter: Ur(d) },
        pendingFoeBattle: null,
      },
    }),
    hs(h, o, r.x, r.y)
  );
}
function Ri(a) {
  return { ...a, diveState: null };
}
function eS(a) {
  const i = Math.floor((a - 1) / 10);
  return Object.values(Bl)
    .filter((o) => o.tierBand === i && !o.isBoss)
    .map((o) => o.id);
}
function tS(a, i) {
  const o = eS(a);
  if (o.length === 0) return [];
  const s = i.range(1, 3);
  return Array.from({ length: s }, () => i.pick(o));
}
const Ma = {
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
function lS() {
  return Object.values(Ma)
    .filter((a) => a.unlockedByDefault)
    .map((a) => a.id);
}
const us = 2,
  nS = { autoMap: 'on', bgmVolume: 0.6, seVolume: 0.6 };
function gp() {
  return { monsters: {}, items: {} };
}
function aS() {
  return { deepestReached: 0, highestBossDefeated: 0, totalDives: 0, bossDefeatLog: [] };
}
const iS = () => ({ weapon: null, armor: null, accessory: null });
function uS() {
  return `char_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function vy(a) {
  var v;
  const { raceId: i, classId: o, name: s, id: r } = a;
  if (!Ft[i]) throw new Error(`createCharacter: 未定義の種族 "${i}"`);
  if (!gt[o]) throw new Error(`createCharacter: 未定義の職業 "${o}"`);
  const d = (v = gt[o].skillTree.skills[0]) == null ? void 0 : v.skillId,
    h = d ? { [d]: 1 } : {};
  return {
    id: r ?? uS(),
    name: s,
    raceId: i,
    classId: o,
    titleId: null,
    level: 1,
    exp: 0,
    skillPoints: { total: 0, spent: 0 },
    learnedSkills: h,
    equipment: iS(),
  };
}
function sS() {
  return { front: Array(_s).fill(null), back: Array(vs).fill(null) };
}
function cS(a, i) {
  const o = a.front.indexOf(null);
  if (o !== -1) {
    const r = [...a.front];
    return ((r[o] = i), { ...a, front: r });
  }
  const s = a.back.indexOf(null);
  if (s !== -1) {
    const r = [...a.back];
    return ((r[s] = i), { ...a, back: r });
  }
  return a;
}
function oS(a, i) {
  return a.guild.members.length >= or
    ? a
    : {
        ...a,
        guild: { ...a.guild, members: [...a.guild.members, i], party: cS(a.guild.party, i.id) },
      };
}
function rS(a) {
  return {
    schemaVersion: us,
    savedAt: 0,
    masterSeed: Q1(),
    settings: { ...nS },
    guild: {
      name: a,
      gold: Pb,
      members: [],
      party: sS(),
      storage: [],
      equipment: [],
      foodStorage: [],
      bestiary: gp(),
    },
    towerState: { floors: {}, bossGates: {}, warp: { unlockedCheckpoints: [] }, record: aS() },
    diveState: null,
    bestiary: gp(),
    playerMaps: {},
    exploredCells: {},
    forgeInventory: { fragments: {}, ingots: { copper: 0, silver: 0, gold: 0 } },
    shopStock: { unlockedTier: 0, unlockedItemIds: [] },
    unlockedRecipeIds: lS(),
    flags: {},
  };
}
const dr = (a, i) => i.some((o) => a instanceof o);
let _p, vp;
function fS() {
  return _p || (_p = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function dS() {
  return (
    vp ||
    (vp = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const mr = new WeakMap(),
  tr = new WeakMap(),
  Ss = new WeakMap();
function mS(a) {
  const i = new Promise((o, s) => {
    const r = () => {
        (a.removeEventListener('success', d), a.removeEventListener('error', h));
      },
      d = () => {
        (o(wn(a.result)), r());
      },
      h = () => {
        (s(a.error), r());
      };
    (a.addEventListener('success', d), a.addEventListener('error', h));
  });
  return (Ss.set(i, a), i);
}
function hS(a) {
  if (mr.has(a)) return;
  const i = new Promise((o, s) => {
    const r = () => {
        (a.removeEventListener('complete', d),
          a.removeEventListener('error', h),
          a.removeEventListener('abort', h));
      },
      d = () => {
        (o(), r());
      },
      h = () => {
        (s(a.error || new DOMException('AbortError', 'AbortError')), r());
      };
    (a.addEventListener('complete', d),
      a.addEventListener('error', h),
      a.addEventListener('abort', h));
  });
  mr.set(a, i);
}
let hr = {
  get(a, i, o) {
    if (a instanceof IDBTransaction) {
      if (i === 'done') return mr.get(a);
      if (i === 'store')
        return o.objectStoreNames[1] ? void 0 : o.objectStore(o.objectStoreNames[0]);
    }
    return wn(a[i]);
  },
  set(a, i, o) {
    return ((a[i] = o), !0);
  },
  has(a, i) {
    return a instanceof IDBTransaction && (i === 'done' || i === 'store') ? !0 : i in a;
  },
};
function by(a) {
  hr = a(hr);
}
function pS(a) {
  return dS().includes(a)
    ? function (...i) {
        return (a.apply(pr(this), i), wn(this.request));
      }
    : function (...i) {
        return wn(a.apply(pr(this), i));
      };
}
function yS(a) {
  return typeof a == 'function'
    ? pS(a)
    : (a instanceof IDBTransaction && hS(a), dr(a, fS()) ? new Proxy(a, hr) : a);
}
function wn(a) {
  if (a instanceof IDBRequest) return mS(a);
  if (tr.has(a)) return tr.get(a);
  const i = yS(a);
  return (i !== a && (tr.set(a, i), Ss.set(i, a)), i);
}
const pr = (a) => Ss.get(a);
function gS(a, i, { blocked: o, upgrade: s, blocking: r, terminated: d } = {}) {
  const h = indexedDB.open(a, i),
    v = wn(h);
  return (
    s &&
      h.addEventListener('upgradeneeded', (g) => {
        s(wn(h.result), g.oldVersion, g.newVersion, wn(h.transaction), g);
      }),
    o && h.addEventListener('blocked', (g) => o(g.oldVersion, g.newVersion, g)),
    v
      .then((g) => {
        (d && g.addEventListener('close', () => d()),
          r && g.addEventListener('versionchange', (y) => r(y.oldVersion, y.newVersion, y)));
      })
      .catch(() => {}),
    v
  );
}
const _S = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  vS = ['put', 'add', 'delete', 'clear'],
  lr = new Map();
function bp(a, i) {
  if (!(a instanceof IDBDatabase && !(i in a) && typeof i == 'string')) return;
  if (lr.get(i)) return lr.get(i);
  const o = i.replace(/FromIndex$/, ''),
    s = i !== o,
    r = vS.includes(o);
  if (!(o in (s ? IDBIndex : IDBObjectStore).prototype) || !(r || _S.includes(o))) return;
  const d = async function (h, ...v) {
    const g = this.transaction(h, r ? 'readwrite' : 'readonly');
    let y = g.store;
    return (s && (y = y.index(v.shift())), (await Promise.all([y[o](...v), r && g.done]))[0]);
  };
  return (lr.set(i, d), d);
}
by((a) => ({
  ...a,
  get: (i, o, s) => bp(i, o) || a.get(i, o, s),
  has: (i, o) => !!bp(i, o) || a.has(i, o),
}));
const bS = ['continue', 'continuePrimaryKey', 'advance'],
  Sp = {},
  yr = new WeakMap(),
  Sy = new WeakMap(),
  SS = {
    get(a, i) {
      if (!bS.includes(i)) return a[i];
      let o = Sp[i];
      return (
        o ||
          (o = Sp[i] =
            function (...s) {
              yr.set(this, Sy.get(this)[i](...s));
            }),
        o
      );
    },
  };
async function* xS(...a) {
  let i = this;
  if ((i instanceof IDBCursor || (i = await i.openCursor(...a)), !i)) return;
  i = i;
  const o = new Proxy(i, SS);
  for (Sy.set(o, i), Ss.set(o, pr(i)); i; )
    (yield o, (i = await (yr.get(o) || i.continue())), yr.delete(o));
}
function xp(a, i) {
  return (
    (i === Symbol.asyncIterator && dr(a, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (i === 'iterate' && dr(a, [IDBIndex, IDBObjectStore]))
  );
}
by((a) => ({
  ...a,
  get(i, o, s) {
    return xp(i, o) ? xS : a.get(i, o, s);
  },
  has(i, o) {
    return xp(i, o) || a.has(i, o);
  },
}));
const ES = { 1: (a) => TS(a) },
  nr = (a) => typeof a == 'object' && a !== null && !Array.isArray(a);
function TS(a) {
  const i = { ...a, schemaVersion: 2 };
  let o = 0;
  const s = (d) => ({ id: `eq_mig_${Date.now().toString(36)}_${o++}`, masterId: d, forgeLevel: 0 }),
    r = nr(i.guild) ? { ...i.guild } : {};
  return (
    Array.isArray(r.equipment) || (r.equipment = []),
    Array.isArray(r.foodStorage) || (r.foodStorage = []),
    Array.isArray(r.members) &&
      (r.members = r.members.map((d) => {
        if (!nr(d)) return d;
        const h = nr(d.equipment) ? { ...d.equipment } : {};
        for (const v of ['weapon', 'armor', 'accessory']) {
          const g = h[v];
          h[v] = typeof g == 'string' ? s(g) : (g ?? null);
        }
        return { ...d, equipment: h };
      })),
    (i.guild = r),
    Array.isArray(i.unlockedRecipeIds) || (i.unlockedRecipeIds = []),
    i
  );
}
function NS(a) {
  return structuredClone(a);
}
function Sa(a) {
  return typeof a == 'object' && a !== null && !Array.isArray(a);
}
function kS(a) {
  if (
    !Sa(a) ||
    typeof a.schemaVersion != 'number' ||
    typeof a.masterSeed != 'number' ||
    !Sa(a.guild)
  )
    return !1;
  const i = a.guild;
  return !(
    typeof i.name != 'string' ||
    !Array.isArray(i.members) ||
    !Array.isArray(i.equipment) ||
    !Sa(a.forgeInventory) ||
    !Sa(a.towerState) ||
    !Sa(a.towerState.record) ||
    typeof a.towerState.record.deepestReached != 'number'
  );
}
function xy(a) {
  if (!Sa(a) || typeof a.schemaVersion != 'number')
    return { ok: !1, reason: 'セーブデータの構造が不正です' };
  let i = a.schemaVersion;
  if (i > us) return { ok: !1, reason: `未知のバージョン (${i} > ${us}) のセーブデータです` };
  let o = { ...a };
  for (; i < us; ) {
    const s = ES[i];
    if (!s) return { ok: !1, reason: `バージョン ${i} の migration が未定義です` };
    ((o = s(o)), (i = typeof o.schemaVersion == 'number' ? o.schemaVersion : i + 1));
  }
  return kS(o)
    ? { ok: !0, data: o }
    : { ok: !1, reason: 'migration 後のデータが SaveData の形をしていません' };
}
function AS(a) {
  return {
    guildName: a.guild.name,
    deepestReached: a.towerState.record.deepestReached,
    memberCount: a.guild.members.length,
    savedAt: a.savedAt,
  };
}
function Ep() {
  return {
    guildName: '(破損データ)',
    deepestReached: 0,
    memberCount: 0,
    savedAt: 0,
    corrupted: !0,
  };
}
const CS = 'sekaiju-like-game',
  jS = 1,
  wi = 'saves',
  Gr = 'main';
let ar = null;
function Yr() {
  return (
    ar ||
      (ar = gS(CS, jS, {
        upgrade(a) {
          a.objectStoreNames.contains(wi) || a.createObjectStore(wi);
        },
      })),
    ar
  );
}
async function ir(a) {
  const i = { ...a, savedAt: Date.now() };
  return (await (await Yr()).put(wi, NS(i), Gr), i);
}
async function MS() {
  const i = await (await Yr()).get(wi, Gr);
  return i === void 0 ? { ok: !1, reason: 'empty' } : xy(i);
}
async function RS() {
  const i = await (await Yr()).get(wi, Gr);
  if (i === void 0) return null;
  const o = xy(i);
  if (!o.ok) return Ep();
  try {
    return AS(o.data);
  } catch {
    return Ep();
  }
}
const Ey = { save: null, saving: !1 };
function wS(a, i) {
  switch (i.type) {
    case 'load':
      return { ...a, save: i.save };
    case 'updateSave':
      return a.save ? { ...a, save: i.updater(a.save) } : a;
    case 'setSave':
      return { ...a, save: i.save };
    case 'saving':
      return { ...a, saving: i.saving };
    case 'clear':
      return { ...Ey };
  }
}
const Ty = T.createContext(null);
function OS(a) {
  const i = T.useRef(a);
  return ((i.current = a), i);
}
function DS({ children: a }) {
  const [i, o] = T.useReducer(wS, Ey),
    s = OS(i),
    r = T.useCallback(async (b) => {
      const x = rS(b),
        R = await ir(x);
      o({ type: 'load', save: R });
    }, []),
    d = T.useCallback(async () => {
      const b = await MS();
      return b.ok ? (o({ type: 'load', save: b.data }), { ok: !0 }) : { ok: !1, reason: b.reason };
    }, []),
    h = T.useCallback((b) => {
      o({ type: 'updateSave', updater: b });
    }, []),
    v = T.useCallback(
      async (b) => {
        const x = s.current.save;
        if (!x) return;
        const R = b(x);
        (o({ type: 'setSave', save: R }), o({ type: 'saving', saving: !0 }));
        try {
          const S = await ir(R);
          o({ type: 'setSave', save: S });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      },
      [s]
    ),
    g = T.useCallback(async () => {
      const { save: b } = s.current;
      if (b) {
        o({ type: 'saving', saving: !0 });
        try {
          const x = await ir(b);
          o({ type: 'setSave', save: x });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      }
    }, [s]),
    y = T.useCallback(() => {
      o({ type: 'clear' });
    }, []),
    _ = T.useMemo(
      () => ({
        ...i,
        startNewGame: r,
        continueGame: d,
        applySave: h,
        applyAndPersist: v,
        persist: g,
        exitToTitle: y,
      }),
      [i, r, d, h, v, g, y]
    );
  return m.jsx(Ty.Provider, { value: _, children: a });
}
function Ll() {
  const a = T.useContext(Ty);
  if (!a) throw new Error('useGameState は GameStateProvider の内側で使ってください');
  return a;
}
const zS = () => {
    var ut, Ve;
    const a = sl(),
      { save: i, applyAndPersist: o } = Ll(),
      s = T.useRef(null),
      [r, d] = T.useState(null),
      [h, v] = T.useState({}),
      [g, y] = T.useState(null),
      [_, b] = T.useState(!1),
      [x, R] = T.useState(!1),
      [S, w] = T.useState(null),
      [j, A] = T.useState(!1),
      [k, Q] = T.useState(null),
      [P, ee] = T.useState(null);
    T.useEffect(() => {
      if (r || !(i != null && i.diveState)) return;
      const Y = i.diveState.depth,
        oe = (i.masterSeed ^ (Y * 2654435761) ^ (i.towerState.record.totalDives * 40503)) >>> 0;
      s.current = On(oe);
      const de = i.diveState.pendingFoeBattle;
      d(de ? op(i, [de.enemyId], de.firstStrike) : op(i, tS(Y, s.current)));
    }, [i, r]);
    const V = T.useRef(!1);
    T.useEffect(() => {
      !r ||
        !s.current ||
        V.current ||
        (r.turn === 1 &&
          r.firstStrike === 'ambush' &&
          r.outcome === 'ongoing' &&
          ((V.current = !0), d(Po(r, [], s.current))));
    }, [r]);
    const H = T.useMemo(() => (r == null ? void 0 : r.enemies.filter((Y) => !Y.isDown)) ?? [], [r]),
      U = T.useMemo(() => (r == null ? void 0 : r.allies.filter((Y) => !Y.isDown)) ?? [], [r]);
    (T.useEffect(() => {
      H.length > 0 && !H.some((Y) => Y.id === S) && w(H[0].id);
    }, [H, S]),
      T.useEffect(() => {
        if ((r == null ? void 0 : r.outcome) !== 'ongoing' || (g && U.some((oe) => oe.id === g)))
          return;
        const Y = U.find((oe) => !h[oe.id]) ?? null;
        y(Y ? Y.id : null);
      }, [r, U, g, h]));
    const Z = U.length > 0 && U.every((Y) => h[Y.id] !== void 0),
      ae = T.useCallback(
        (Y, oe) => {
          const de = { ...h, [Y]: oe };
          (v(de), b(!1), R(!1));
          const Re = U.find((Te) => Te.id !== Y && !de[Te.id]);
          y(Re ? Re.id : null);
        },
        [h, U]
      ),
      ue = T.useCallback(
        async (Y) => {
          A(!0);
          const oe = Y.outcome === 'win';
          Y.outcome === 'lose'
            ? (await o((de) => Ri(dp(de, Y))), a('/town'))
            : (await o((de) => J1(dp(de, Y), oe)), a('/dungeon'));
        },
        [o, a]
      ),
      ce = T.useCallback(() => {
        var Y;
        (v({}), b(!1), R(!1), Q(null), ee(null), y(((Y = U[0]) == null ? void 0 : Y.id) ?? null));
      }, [U]),
      I = T.useCallback(() => {
        var Re;
        if (!r || !s.current || r.outcome !== 'ongoing') return;
        const Y = S ?? ((Re = H[0]) == null ? void 0 : Re.id) ?? '',
          oe = U.map((Te) => {
            const vt = h[Te.id] ?? { kind: 'attack' };
            return vt.kind === 'guard'
              ? { kind: 'guard', actorId: Te.id }
              : vt.kind === 'skill'
                ? { kind: 'skill', actorId: Te.id, skillId: vt.skillId, targetId: Y }
                : vt.kind === 'item'
                  ? { kind: 'item', actorId: Te.id, itemId: vt.itemId, targetId: Te.id }
                  : { kind: 'attack', actorId: Te.id, targetId: Y };
          });
        if (k) {
          const Te = xa[k.unionSkillId],
            vt =
              (Te == null ? void 0 : Te.target) === 'enemyOne' ||
              (Te == null ? void 0 : Te.target) === 'enemyRow' ||
              (Te == null ? void 0 : Te.target) === 'enemyAll';
          oe.unshift({ kind: 'union', ...k, targetId: vt ? Y : k.targetId });
        }
        const de = Po(r, oe, s.current);
        (d(de), v({}), b(!1), R(!1), Q(null), ee(null), y(null));
      }, [r, h, S, U, H, k]),
      J = T.useCallback(() => {
        if (!r || !s.current || r.outcome !== 'ongoing') return;
        const Y = U[0];
        Y && (d(Po(r, [{ kind: 'flee', actorId: Y.id }], s.current)), v({}), y(null));
      }, [r, U]);
    if (!i || !i.diveState) return m.jsx(il, { to: '/town', replace: !0 });
    if (!r) return m.jsx('div', { className: F.layout, children: '戦闘準備中...' });
    const he = (Y) => {
        const oe = i.guild.members.find((de) => de.id === Y.id);
        return oe
          ? Object.keys(oe.learnedSkills).filter((de) => de in dn && Y.tp >= dn[de].tpCost(1))
          : [];
      },
      L = () => {
        const Y = (de) =>
            Object.values(h).filter((Re) => Re.kind === 'item' && Re.itemId === de).length,
          oe = (de) => r.consumedItems.filter((Re) => Re === de).length;
        return i.guild.storage
          .filter((de) => {
            var Re, Te;
            return (Te = (Re = et[de.itemId]) == null ? void 0 : Re.useContext) == null
              ? void 0
              : Te.includes('battle');
          })
          .map((de) => ({
            id: de.itemId,
            remaining: Pp(i, de.itemId) - oe(de.itemId) - Y(de.itemId),
          }))
          .filter((de) => de.remaining > 0);
      },
      K = (Y) => {
        var de, Re;
        const oe = h[Y.id];
        return oe
          ? oe.kind === 'attack'
            ? '攻撃'
            : oe.kind === 'guard'
              ? '防御'
              : oe.kind === 'item'
                ? (((de = et[oe.itemId]) == null ? void 0 : de.name) ?? 'どうぐ')
                : (((Re = dn[oe.skillId]) == null ? void 0 : Re.name) ?? 'スキル')
          : '';
      },
      te = (Y) => {
        const oe = (Re) => Re === 'headBind' || Re === 'armBind' || Re === 'legBind';
        let de = '';
        return (
          Y.ailments.some((Re) => oe(Re.type)) && (de += ' 🔒'),
          Y.ailments.some((Re) => !oe(Re.type)) && (de += ' 🌀'),
          de
        );
      },
      ge = (Y) => {
        var Re;
        const oe = i.guild.members.find((Te) => Te.id === Y.id);
        if (!oe) return null;
        const de =
          (Re = Ft[oe.raceId]) == null
            ? void 0
            : Re.raceSkillTree.skills.find((Te) => Te.skillId in xa);
        return !de || !(de.skillId in oe.learnedSkills) ? null : (xa[de.skillId] ?? null);
      },
      Ee = (Y, oe, de) => {
        var vt;
        const Te =
          oe.target === 'enemyOne' || oe.target === 'enemyRow' || oe.target === 'enemyAll'
            ? (S ?? ((vt = H[0]) == null ? void 0 : vt.id) ?? '')
            : Y;
        (Q({ actorId: Y, unionSkillId: oe.id, participantIds: de, targetId: Te }), ee(null));
      },
      C = (Y, oe) => {
        oe.requiredParticipants <= 1 ? Ee(Y.id, oe, [Y.id]) : ee({ actorId: Y.id, def: oe });
      },
      G = g ? U.find((Y) => Y.id === g) : void 0,
      W = ((ut = r.enemies.find((Y) => Y.id === S)) == null ? void 0 : ut.name) ?? '-',
      le = ry(r),
      pe = (Y) =>
        m.jsxs(
          'button',
          {
            type: 'button',
            className: [
              F.card,
              Y.isDown ? F.down : '',
              g === Y.id ? F.cardActive : '',
              h[Y.id] ? F.cardDecided : '',
            ].join(' '),
            disabled: Y.isDown || r.outcome !== 'ongoing',
            onClick: () => {
              (y(Y.id), b(!1), R(!1));
            },
            children: [
              m.jsxs('div', {
                className: F.cardName,
                children: [
                  Y.name,
                  Y.unionGauge >= 100 ? m.jsx('span', { className: F.uni, children: '★' }) : null,
                  te(Y),
                ],
              }),
              m.jsx(es, { value: Y.hp, max: Y.maxHp, color: '#4caf50', showValue: !1 }),
              m.jsx(es, { value: Y.tp, max: Y.maxTp, color: '#2196f3', showValue: !1 }),
              m.jsxs('div', {
                className: F.cardNums,
                children: ['HP ', Math.max(0, Y.hp), ' · TP ', Y.tp],
              }),
              h[Y.id] ? m.jsxs('div', { className: F.cardCmd, children: ['▶ ', K(Y)] }) : null,
            ],
          },
          Y.id
        ),
      be = r.allies.filter((Y) => Y.row === 'front'),
      Ce = r.allies.filter((Y) => Y.row === 'back');
    return m.jsxs('div', {
      className: F.layout,
      children: [
        m.jsx('div', {
          className: F.enemies,
          children: r.enemies.map((Y) =>
            m.jsxs(
              'button',
              {
                type: 'button',
                className: `${F.enemy} ${Y.isDown ? F.down : ''} ${S === Y.id ? F.targeted : ''}`,
                disabled: Y.isDown,
                onClick: () => w(Y.id),
                children: [
                  m.jsxs('span', { className: F.enemyName, children: [Y.name, te(Y)] }),
                  m.jsx(es, { value: Y.hp, max: Y.maxHp, color: '#e57373', showValue: !1 }),
                ],
              },
              Y.id
            )
          ),
        }),
        r.summons.length > 0
          ? m.jsx('div', {
              className: F.summons,
              children: r.summons.map((Y) =>
                m.jsxs(
                  'div',
                  {
                    className: `${F.summon} ${Y.isDown ? F.down : ''}`,
                    children: [
                      m.jsxs('span', { className: F.summonName, children: ['🐾 ', Y.name] }),
                      m.jsx(es, { value: Y.hp, max: Y.maxHp, color: '#8d6e63', showValue: !1 }),
                      m.jsxs('span', {
                        className: F.summonHp,
                        children: ['HP ', Math.max(0, Y.hp)],
                      }),
                    ],
                  },
                  Y.id
                )
              ),
            })
          : null,
        m.jsxs('div', {
          className: F.party,
          children: [
            m.jsx('div', { className: F.rowTag, children: '前衛' }),
            m.jsx('div', { className: F.cardRow, children: be.map(pe) }),
            m.jsx('div', { className: F.rowTag, children: '後衛（近接ダメージ -30%）' }),
            m.jsx('div', {
              className: F.cardRow,
              children:
                Ce.length > 0
                  ? Ce.map(pe)
                  : m.jsx('div', { className: F.empty, children: '（なし）' }),
            }),
          ],
        }),
        r.outcome !== 'ongoing'
          ? m.jsxs('div', {
              className: F.result,
              children: [
                m.jsx('div', {
                  className: F.resultTitle,
                  children:
                    r.outcome === 'win' ? '勝利！' : r.outcome === 'fled' ? '逃走した' : '全滅...',
                }),
                r.outcome === 'win'
                  ? m.jsxs('div', {
                      className: F.resultBody,
                      children: ['経験値 ', le.exp, ' ／ ', le.gold, ' G を獲得'],
                    })
                  : r.outcome === 'lose'
                    ? m.jsx('div', { className: F.resultBody, children: '拠点へ帰還する' })
                    : null,
                m.jsx('button', {
                  type: 'button',
                  className: F.primary,
                  disabled: j,
                  onClick: () => void ue(r),
                  children: 'つづける',
                }),
              ],
            })
          : m.jsxs('div', {
              className: F.command,
              children: [
                m.jsxs('div', {
                  className: F.target,
                  children: ['対象: ', W, '（敵をタップで変更）'],
                }),
                k
                  ? m.jsxs('div', {
                      className: F.unionBanner,
                      children: [
                        '⚡ ユニオン予約: ',
                        (Ve = xa[k.unionSkillId]) == null ? void 0 : Ve.name,
                        m.jsx('button', {
                          type: 'button',
                          className: F.unionCancel,
                          onClick: () => Q(null),
                          children: '取消',
                        }),
                      ],
                    })
                  : null,
                G
                  ? m.jsxs(m.Fragment, {
                      children: [
                        m.jsxs('div', { className: F.cmdHead, children: [G.name, ' のコマンド'] }),
                        _
                          ? m.jsxs('div', {
                              className: F.skillList,
                              children: [
                                he(G).map((Y) => {
                                  var oe;
                                  return m.jsxs(
                                    'button',
                                    {
                                      type: 'button',
                                      className: F.skillBtn,
                                      onClick: () => ae(G.id, { kind: 'skill', skillId: Y }),
                                      children: [
                                        m.jsxs('span', {
                                          className: F.skillTop,
                                          children: [
                                            m.jsx('span', {
                                              className: F.skillName,
                                              children: dn[Y].name,
                                            }),
                                            m.jsxs('span', {
                                              className: F.tp,
                                              children: ['TP ', dn[Y].tpCost(1)],
                                            }),
                                          ],
                                        }),
                                        m.jsx('span', {
                                          className: F.skillDesc,
                                          children:
                                            ((oe = Cr[Y]) == null ? void 0 : oe.description) ?? '',
                                        }),
                                      ],
                                    },
                                    Y
                                  );
                                }),
                                he(G).length === 0
                                  ? m.jsx('div', {
                                      className: F.empty,
                                      children: '使えるスキルがない',
                                    })
                                  : null,
                                m.jsx('button', {
                                  type: 'button',
                                  className: F.menuBack,
                                  onClick: () => b(!1),
                                  children: 'もどる',
                                }),
                              ],
                            })
                          : x
                            ? m.jsxs('div', {
                                className: F.skillList,
                                children: [
                                  L().map(({ id: Y, remaining: oe }) =>
                                    m.jsxs(
                                      'button',
                                      {
                                        type: 'button',
                                        className: F.skillBtn,
                                        onClick: () => ae(G.id, { kind: 'item', itemId: Y }),
                                        children: [
                                          m.jsx('span', {
                                            className: F.skillTop,
                                            children: m.jsxs('span', {
                                              className: F.skillName,
                                              children: [et[Y].name, ' ×', oe],
                                            }),
                                          }),
                                          m.jsx('span', {
                                            className: F.skillDesc,
                                            children: et[Y].description,
                                          }),
                                        ],
                                      },
                                      Y
                                    )
                                  ),
                                  L().length === 0
                                    ? m.jsx('div', {
                                        className: F.empty,
                                        children: '使える道具がない',
                                      })
                                    : null,
                                  m.jsx('button', {
                                    type: 'button',
                                    className: F.menuBack,
                                    onClick: () => R(!1),
                                    children: 'もどる',
                                  }),
                                ],
                              })
                            : P
                              ? m.jsxs('div', {
                                  className: F.skillList,
                                  children: [
                                    m.jsxs('div', {
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
                                    U.filter((Y) => Y.id !== P.actorId).map((Y) =>
                                      m.jsx(
                                        'button',
                                        {
                                          type: 'button',
                                          className: F.skillBtn,
                                          onClick: () => Ee(P.actorId, P.def, [P.actorId, Y.id]),
                                          children: m.jsxs('span', {
                                            className: F.skillTop,
                                            children: [
                                              m.jsx('span', {
                                                className: F.skillName,
                                                children: Y.name,
                                              }),
                                              m.jsxs('span', {
                                                className: F.tp,
                                                children: ['ゲージ ', Y.unionGauge],
                                              }),
                                            ],
                                          }),
                                        },
                                        Y.id
                                      )
                                    ),
                                    U.filter((Y) => Y.id !== P.actorId).length === 0
                                      ? m.jsx('div', {
                                          className: F.empty,
                                          children: '協力できる味方がいない',
                                        })
                                      : null,
                                    m.jsx('button', {
                                      type: 'button',
                                      className: F.menuBack,
                                      onClick: () => ee(null),
                                      children: 'もどる',
                                    }),
                                  ],
                                })
                              : m.jsxs('div', {
                                  className: F.menu,
                                  children: [
                                    m.jsx('button', {
                                      type: 'button',
                                      className: F.menuBtn,
                                      onClick: () => ae(G.id, { kind: 'attack' }),
                                      children: '攻撃',
                                    }),
                                    m.jsx('button', {
                                      type: 'button',
                                      className: F.menuBtn,
                                      onClick: () => ae(G.id, { kind: 'guard' }),
                                      children: '防御',
                                    }),
                                    m.jsx('button', {
                                      type: 'button',
                                      className: F.menuBtn,
                                      disabled: he(G).length === 0,
                                      onClick: () => b(!0),
                                      children: 'スキル',
                                    }),
                                    m.jsx('button', {
                                      type: 'button',
                                      className: F.menuBtn,
                                      disabled: L().length === 0,
                                      onClick: () => R(!0),
                                      children: 'どうぐ',
                                    }),
                                    (() => {
                                      const Y = ge(G);
                                      return !Y || G.unionGauge < 100 || k
                                        ? null
                                        : m.jsx('button', {
                                            type: 'button',
                                            className: `${F.menuBtn} ${F.unionBtn}`,
                                            onClick: () => C(G, Y),
                                            children: '⚡ユニオン',
                                          });
                                    })(),
                                    m.jsx('button', {
                                      type: 'button',
                                      className: F.menuBtn,
                                      onClick: J,
                                      children: '逃走',
                                    }),
                                  ],
                                }),
                      ],
                    })
                  : m.jsxs('div', {
                      className: F.execRow,
                      children: [
                        m.jsx('button', {
                          type: 'button',
                          className: F.redo,
                          onClick: ce,
                          children: 'やり直す',
                        }),
                        m.jsx('button', {
                          type: 'button',
                          className: F.primary,
                          disabled: !Z,
                          onClick: I,
                          children: '実行',
                        }),
                      ],
                    }),
              ],
            }),
        m.jsx('div', {
          className: F.log,
          children:
            r.log.length === 0
              ? m.jsxs('div', {
                  className: F.logLine,
                  children: ['てきが あらわれた！（', r.turn, ' ターン目）'],
                })
              : r.log.map((Y, oe) => m.jsx('div', { className: F.logLine, children: Y.text }, oe)),
        }),
      ],
    });
  },
  BS = '_layout_iunlg_1',
  LS = '_head_iunlg_11',
  US = '_title_iunlg_15',
  qS = '_tabs_iunlg_21',
  HS = '_tab_iunlg_21',
  GS = '_tabActive_iunlg_38',
  YS = '_records_iunlg_43',
  $S = '_statBig_iunlg_48',
  XS = '_statNum_iunlg_60',
  VS = '_statLabel_iunlg_67',
  QS = '_statList_iunlg_72',
  ZS = '_statRow_iunlg_76',
  KS = '_h2_iunlg_91',
  IS = '_bossLog_iunlg_97',
  JS = '_bossRow_iunlg_106',
  WS = '_codex_iunlg_114',
  FS = '_codexSummary_iunlg_121',
  PS = '_list_iunlg_127',
  ex = '_row_iunlg_133',
  tx = '_unseen_iunlg_140',
  lx = '_info_iunlg_144',
  nx = '_name_iunlg_150',
  ax = '_badge_iunlg_158',
  ix = '_sub_iunlg_167',
  ux = '_empty_iunlg_172',
  sx = '_foot_iunlg_177',
  cx = '_back_iunlg_181',
  Oe = {
    layout: BS,
    head: LS,
    title: US,
    tabs: qS,
    tab: HS,
    tabActive: GS,
    records: YS,
    statBig: $S,
    statNum: XS,
    statLabel: VS,
    statList: QS,
    statRow: ZS,
    h2: KS,
    bossLog: IS,
    bossRow: JS,
    codex: WS,
    codexSummary: FS,
    list: PS,
    row: ex,
    unseen: tx,
    info: lx,
    name: nx,
    badge: ax,
    sub: ix,
    empty: ux,
    foot: sx,
    back: cx,
  };
function Ny(a) {
  const i = a.bestiary.monsters;
  return Object.values(Bl)
    .slice()
    .sort((o, s) => o.tierBand - s.tierBand || o.id.localeCompare(s.id))
    .map((o) => {
      const s = i[o.id],
        r = new Set((s == null ? void 0 : s.dropsFound) ?? []);
      return {
        id: o.id,
        name: o.name,
        tierBand: o.tierBand,
        seen: (s == null ? void 0 : s.seen) ?? !1,
        defeated: (s == null ? void 0 : s.defeated) ?? !1,
        drops: (o.drops ?? []).map((d) => {
          var h;
          return {
            itemId: d.itemId,
            name: ((h = et[d.itemId]) == null ? void 0 : h.name) ?? d.itemId,
            found: r.has(d.itemId),
          };
        }),
      };
    });
}
function ox(a) {
  const i = Ny(a),
    o = i.length,
    s = i.filter((_) => _.seen).length,
    r = i.filter((_) => _.defeated).length;
  let d = 0,
    h = 0;
  for (const _ of i) for (const b of _.drops) ((d += 1), b.found && (h += 1));
  const v = o + d,
    g = r + h,
    y = v === 0 ? 0 : Math.round((g / v) * 100);
  return {
    monstersTotal: o,
    monstersSeen: s,
    monstersDefeated: r,
    dropsTotal: d,
    dropsFound: h,
    completionPct: y,
  };
}
const rx = () => {
    const a = sl(),
      { save: i } = Ll(),
      [o, s] = T.useState('record');
    if (!i) return m.jsx(il, { to: '/title', replace: !0 });
    const r = i.towerState.record,
      d = ox(i),
      h = Ny(i);
    return m.jsxs('div', {
      className: Oe.layout,
      children: [
        m.jsx('header', {
          className: Oe.head,
          children: m.jsx('h1', { className: Oe.title, children: '図鑑 / 記録' }),
        }),
        m.jsxs('div', {
          className: Oe.tabs,
          children: [
            m.jsx('button', {
              type: 'button',
              className: `${Oe.tab} ${o === 'record' ? Oe.tabActive : ''}`,
              onClick: () => s('record'),
              children: '到達記録',
            }),
            m.jsx('button', {
              type: 'button',
              className: `${Oe.tab} ${o === 'codex' ? Oe.tabActive : ''}`,
              onClick: () => s('codex'),
              children: '図鑑',
            }),
          ],
        }),
        o === 'record'
          ? m.jsxs('div', {
              className: Oe.records,
              children: [
                m.jsxs('div', {
                  className: Oe.statBig,
                  children: [
                    m.jsx('span', { className: Oe.statNum, children: r.deepestReached }),
                    m.jsx('span', { className: Oe.statLabel, children: '最深到達階' }),
                  ],
                }),
                m.jsxs('dl', {
                  className: Oe.statList,
                  children: [
                    m.jsxs('div', {
                      className: Oe.statRow,
                      children: [
                        m.jsx('dt', { children: '最高撃破ボス階' }),
                        m.jsx('dd', {
                          children: r.highestBossDefeated > 0 ? `${r.highestBossDefeated}F` : '—',
                        }),
                      ],
                    }),
                    m.jsxs('div', {
                      className: Oe.statRow,
                      children: [
                        m.jsx('dt', { children: '挑戦回数' }),
                        m.jsx('dd', { children: r.totalDives }),
                      ],
                    }),
                    m.jsxs('div', {
                      className: Oe.statRow,
                      children: [
                        m.jsx('dt', { children: '図鑑達成率' }),
                        m.jsxs('dd', { children: [d.completionPct, '%'] }),
                      ],
                    }),
                  ],
                }),
                m.jsx('h2', { className: Oe.h2, children: 'ボス撃破履歴' }),
                r.bossDefeatLog.length === 0
                  ? m.jsx('p', { className: Oe.empty, children: 'まだボスを倒していません。' })
                  : m.jsx('ul', {
                      className: Oe.bossLog,
                      children: r.bossDefeatLog
                        .slice()
                        .reverse()
                        .map((v, g) =>
                          m.jsx(
                            'li',
                            {
                              className: Oe.bossRow,
                              children: m.jsxs('span', { children: [v.depth, 'F のボス撃破'] }),
                            },
                            g
                          )
                        ),
                    }),
              ],
            })
          : m.jsxs('div', {
              className: Oe.codex,
              children: [
                m.jsxs('div', {
                  className: Oe.codexSummary,
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
                m.jsx('div', {
                  className: Oe.list,
                  children: h.map((v) =>
                    m.jsx(
                      'div',
                      {
                        className: `${Oe.row} ${v.seen ? '' : Oe.unseen}`,
                        children: m.jsxs('div', {
                          className: Oe.info,
                          children: [
                            m.jsxs('span', {
                              className: Oe.name,
                              children: [
                                v.seen ? v.name : '？？？',
                                v.defeated
                                  ? m.jsx('span', { className: Oe.badge, children: '撃破' })
                                  : null,
                              ],
                            }),
                            m.jsxs('span', {
                              className: Oe.sub,
                              children: [
                                '第',
                                v.tierBand + 1,
                                '帯',
                                v.seen && v.drops.length > 0
                                  ? '・' + v.drops.map((g) => (g.found ? g.name : '？')).join(' / ')
                                  : '',
                              ],
                            }),
                          ],
                        }),
                      },
                      v.id
                    )
                  ),
                }),
              ],
            }),
        m.jsx('footer', {
          className: Oe.foot,
          children: m.jsx('button', {
            type: 'button',
            className: Oe.back,
            onClick: () => a('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  fx = '_layout_1395s_1',
  dx = '_head_1395s_13',
  mx = '_depth_1395s_22',
  hx = '_theme_1395s_28',
  px = '_fpvWrap_1395s_45',
  yx = '_mapWrap_1395s_51',
  gx = '_palette_1395s_58',
  _x = '_tool_1395s_68',
  vx = '_toolActive_1395s_79',
  bx = '_paletteHint_1395s_85',
  Sx = '_stairs_1395s_94',
  xx = '_action_1395s_108',
  Ex = '_notice_1395s_125',
  Tx = '_controls_1395s_133',
  Nx = '_row_1395s_143',
  kx = '_forward_1395s_149',
  Ax = '_turn_1395s_164',
  Cx = '_back_1395s_178',
  jx = '_itemOverlay_1395s_189',
  Mx = '_itemPanel_1395s_199',
  Rx = '_itemTitle_1395s_212',
  wx = '_itemEmpty_1395s_217',
  Ox = '_itemRow_1395s_223',
  Dx = '_itemName_1395s_231',
  zx = '_itemDesc_1395s_239',
  Bx = '_itemTargets_1395s_245',
  Lx = '_itemTarget_1395s_245',
  Ux = '_itemHp_1395s_265',
  qx = '_itemUse_1395s_271',
  Hx = '_itemClose_1395s_288',
  me = {
    layout: fx,
    head: dx,
    depth: mx,
    theme: hx,
    return: '_return_1395s_34',
    fpvWrap: px,
    mapWrap: yx,
    palette: gx,
    tool: _x,
    toolActive: vx,
    paletteHint: bx,
    stairs: Sx,
    action: xx,
    notice: Ex,
    controls: Tx,
    row: Nx,
    forward: kx,
    turn: Ax,
    back: Cx,
    itemOverlay: jx,
    itemPanel: Mx,
    itemTitle: Rx,
    itemEmpty: wx,
    itemRow: Ox,
    itemName: Dx,
    itemDesc: zx,
    itemTargets: Bx,
    itemTarget: Lx,
    itemHp: Ux,
    itemUse: qx,
    itemClose: Hx,
  },
  Gx = '_canvas_1keax_1',
  Yx = { canvas: Gx },
  ky = [
    { id: 'icon_chest', symbol: '📦', label: '宝箱' },
    { id: 'icon_foe', symbol: '👹', label: '強敵(FOE)' },
    { id: 'icon_warning', symbol: '⚠️', label: '注意' },
    { id: 'icon_door', symbol: '🚪', label: '扉/近道' },
    { id: 'icon_gather', symbol: '⛏️', label: '採集' },
    { id: 'icon_event', symbol: '❗', label: 'イベント' },
    { id: 'icon_note', symbol: '📝', label: 'メモ' },
    { id: 'icon_star', symbol: '⭐', label: '任意' },
  ],
  $x = new Map(ky.map((a) => [a.id, a]));
function Xx(a) {
  var i;
  return ((i = $x.get(a)) == null ? void 0 : i.symbol) ?? '•';
}
const It = {
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
  Vx = ({
    floor: a,
    explored: i,
    pos: o,
    dir: s,
    icons: r = [],
    foes: d = [],
    depletedGathers: h = [],
    maxCell: v = 26,
    onCellClick: g,
  }) => {
    const y = T.useRef(null),
      _ = Math.max(10, Math.min(v, Math.floor(360 / a.width))),
      b = a.width * _,
      x = a.height * _;
    T.useEffect(() => {
      const S = y.current;
      if (!S) return;
      const w = new Set(i),
        j = new Set(h),
        A = window.devicePixelRatio || 1;
      ((S.width = b * A), (S.height = x * A));
      const k = S.getContext('2d');
      if (!k) return;
      (k.scale(A, A), k.clearRect(0, 0, b, x));
      for (let Z = 0; Z < a.height; Z++)
        for (let ae = 0; ae < a.width; ae++) {
          const ue = w.has(`${ae},${Z}`);
          ((k.fillStyle = ue ? It.floor : It.fog),
            k.fillRect(ae * _, Z * _, _, _),
            ue &&
              ((k.strokeStyle = It.grid),
              (k.lineWidth = 1),
              k.strokeRect(ae * _ + 0.5, Z * _ + 0.5, _ - 1, _ - 1)));
        }
      ((k.strokeStyle = It.wall), (k.lineWidth = 2), (k.lineCap = 'round'));
      const Q = (Z, ae, ue, ce) => {
        (k.beginPath(), k.moveTo(Z, ae), k.lineTo(ue, ce), k.stroke());
      };
      for (let Z = 0; Z < a.height; Z++)
        for (let ae = 0; ae < a.width; ae++) {
          if (!w.has(`${ae},${Z}`)) continue;
          const ue = a.cells[Z][ae],
            ce = ae * _,
            I = Z * _;
          (ue.walls.N && Q(ce, I, ce + _, I),
            ue.walls.S && Q(ce, I + _, ce + _, I + _),
            ue.walls.W && Q(ce, I, ce, I + _),
            ue.walls.E && Q(ce + _, I, ce + _, I + _));
          const J = ue.event;
          if (
            (J == null ? void 0 : J.kind) === 'stairsUp' ||
            (J == null ? void 0 : J.kind) === 'stairsDown'
          )
            ((k.fillStyle = J.kind === 'stairsUp' ? It.stairsUp : It.stairsDown),
              k.beginPath(),
              k.arc(ce + _ / 2, I + _ / 2, _ * 0.28, 0, Math.PI * 2),
              k.fill(),
              (k.fillStyle = '#ffffff'),
              (k.font = `bold ${Math.floor(_ * 0.5)}px sans-serif`),
              (k.textAlign = 'center'),
              (k.textBaseline = 'middle'),
              k.fillText(J.kind === 'stairsUp' ? '▲' : '▼', ce + _ / 2, I + _ / 2 + 1));
          else if ((J == null ? void 0 : J.kind) === 'gather') {
            const he = j.has(`${ae},${Z}`);
            ((k.fillStyle = he ? It.gatherDone : It.gather),
              k.beginPath(),
              k.arc(ce + _ / 2, I + _ / 2, _ * 0.24, 0, Math.PI * 2),
              k.fill());
          } else
            (J == null ? void 0 : J.kind) === 'cookingSpot' &&
              ((k.fillStyle = It.cooking),
              k.fillRect(ce + _ * 0.28, I + _ * 0.28, _ * 0.44, _ * 0.44));
        }
      ((k.font = `${Math.floor(_ * 0.66)}px sans-serif`),
        (k.textAlign = 'center'),
        (k.textBaseline = 'middle'));
      for (const Z of r)
        w.has(`${Z.x},${Z.y}`) && k.fillText(Xx(Z.iconId), Z.x * _ + _ / 2, Z.y * _ + _ / 2 + 1);
      for (const Z of d) {
        if (!w.has(`${Z.x},${Z.y}`)) continue;
        const ae = Z.x * _ + _ / 2,
          ue = Z.y * _ + _ / 2;
        ((k.fillStyle = Z.alerted ? It.foeAlert : It.foe),
          k.beginPath(),
          k.arc(ae, ue, _ * 0.3, 0, Math.PI * 2),
          k.fill(),
          (k.fillStyle = '#ffffff'),
          (k.font = `bold ${Math.floor(_ * 0.5)}px sans-serif`),
          (k.textAlign = 'center'),
          (k.textBaseline = 'middle'),
          k.fillText('!', ae, ue + 1));
      }
      const P = o.x * _ + _ / 2,
        ee = o.y * _ + _ / 2,
        V = _ * 0.34,
        U = { N: -Math.PI / 2, E: 0, S: Math.PI / 2, W: Math.PI }[s];
      ((k.fillStyle = It.player),
        k.beginPath(),
        k.moveTo(P + Math.cos(U) * V, ee + Math.sin(U) * V),
        k.lineTo(P + Math.cos(U + 2.5) * V, ee + Math.sin(U + 2.5) * V),
        k.lineTo(P + Math.cos(U - 2.5) * V, ee + Math.sin(U - 2.5) * V),
        k.closePath(),
        k.fill());
    }, [a, i, o, s, r, d, h, _, b, x]);
    const R = (S) => {
      if (!g) return;
      const w = S.currentTarget.getBoundingClientRect(),
        j = Math.floor(((S.clientX - w.left) / w.width) * a.width),
        A = Math.floor(((S.clientY - w.top) / w.height) * a.height);
      j >= 0 && A >= 0 && j < a.width && A < a.height && g(j, A);
    };
    return m.jsx('canvas', {
      ref: y,
      className: Yx.canvas,
      style: { width: b, height: x },
      onClick: R,
    });
  },
  Qx = '_gauge_1o2hx_1',
  Zx = '_icon_1o2hx_11',
  Kx = '_segments_1o2hx_16',
  Ix = '_seg_1o2hx_16',
  Jx = '_filled_1o2hx_28',
  Wx = '_danger_1o2hx_32',
  va = { gauge: Qx, icon: Zx, segments: Kx, seg: Ix, filled: Jx, danger: Wx },
  Fx = ({ level: a }) => {
    const i = a >= ji;
    return m.jsxs('div', {
      className: va.gauge,
      role: 'img',
      'aria-label': `エンカウントゲージ ${a}/${ji}`,
      children: [
        m.jsx('span', { className: va.icon, children: i ? '⚠' : '👣' }),
        m.jsx('div', {
          className: va.segments,
          children: Array.from({ length: ji }, (o, s) =>
            m.jsx(
              'span',
              { className: [va.seg, s < a ? va.filled : '', i ? va.danger : ''].join(' ') },
              s
            )
          ),
        }),
      ],
    });
  },
  Px = '_view_tw2v9_1',
  e2 = { view: Px },
  Tp = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } };
function t2(a, i, o, s = 4) {
  const r = dy(o),
    d = fy(o),
    h = [];
  let { x: v, y: g } = i;
  for (let y = 0; y < s; y++) {
    const _ = Ea(a, v, g, o);
    if (
      (h.push({
        x: v,
        y: g,
        leftOpen: !a.cells[g][v].walls[r],
        rightOpen: !a.cells[g][v].walls[d],
        frontOpen: _,
        event: a.cells[g][v].event,
      }),
      !_)
    )
      break;
    ((v += Tp[o].dx), (g += Tp[o].dy));
  }
  return h;
}
const l2 = {
    sky: '#26301c',
    ceiling: '#3a4a2c',
    floor: '#5d6b46',
    wall: '#8b9a6b',
    frontWall: '#7a8a5c',
    outline: '#2c3720',
  },
  n2 = 0.56,
  a2 = ({
    floor: a,
    pos: i,
    dir: o,
    foes: s = [],
    theme: r,
    maxDepth: d = 4,
    width: h = 358,
    height: v = 200,
  }) => {
    const g = T.useRef(null);
    return (
      T.useEffect(() => {
        const y = { ...l2, ...(r ?? {}) },
          _ = g.current;
        if (!_) return;
        const b = window.devicePixelRatio || 1;
        ((_.width = h * b), (_.height = v * b));
        const x = _.getContext('2d');
        if (!x) return;
        x.scale(b, b);
        const R = h,
          S = v,
          w = R / 2,
          j = S / 2,
          A = t2(a, i, o, d),
          k = (ee) => {
            const V = Math.pow(n2, ee);
            return {
              l: w - (R / 2) * V,
              r: w + (R / 2) * V,
              t: j - (S / 2) * V,
              b: j + (S / 2) * V,
            };
          },
          Q = (ee, V, H = !1) => {
            (x.beginPath(), x.moveTo(ee[0][0], ee[0][1]));
            for (let U = 1; U < ee.length; U++) x.lineTo(ee[U][0], ee[U][1]);
            (x.closePath(),
              (x.fillStyle = V),
              x.fill(),
              H && ((x.strokeStyle = y.outline), (x.lineWidth = 1), x.stroke()));
          },
          P = (ee) => `rgba(0,0,0,${Math.min(0.5, ee * 0.13)})`;
        ((x.fillStyle = y.sky), x.fillRect(0, 0, R, S));
        for (let ee = A.length - 1; ee >= 0; ee--) {
          const V = k(ee),
            H = k(ee + 1),
            U = A[ee];
          (Q(
            [
              [V.l, V.t],
              [V.r, V.t],
              [H.r, H.t],
              [H.l, H.t],
            ],
            y.ceiling
          ),
            Q(
              [
                [V.l, V.b],
                [V.r, V.b],
                [H.r, H.b],
                [H.l, H.b],
              ],
              y.floor
            ),
            Q(
              [
                [V.l, V.t],
                [H.l, H.t],
                [H.l, H.b],
                [V.l, V.b],
              ],
              U.leftOpen ? y.sky : y.wall,
              !0
            ),
            Q(
              [
                [V.r, V.t],
                [H.r, H.t],
                [H.r, H.b],
                [V.r, V.b],
              ],
              U.rightOpen ? y.sky : y.wall,
              !0
            ),
            U.frontOpen ||
              Q(
                [
                  [H.l, H.t],
                  [H.r, H.t],
                  [H.r, H.b],
                  [H.l, H.b],
                ],
                y.frontWall,
                !0
              ),
            (x.fillStyle = P(ee)),
            x.fillRect(H.l, H.t, H.r - H.l, H.b - H.t));
          const Z = U.event;
          if (
            (Z == null ? void 0 : Z.kind) === 'stairsUp' ||
            (Z == null ? void 0 : Z.kind) === 'stairsDown'
          ) {
            const ae = w,
              ue = (V.b + H.b) / 2 - (V.b - H.b) * 0.15,
              ce = Math.max(12, (V.b - V.t) * 0.18);
            ((x.fillStyle = Z.kind === 'stairsUp' ? '#e8923a' : '#7aa2d6'),
              x.beginPath(),
              x.arc(ae, ue, ce, 0, Math.PI * 2),
              x.fill(),
              (x.fillStyle = '#fff'),
              (x.font = `bold ${Math.floor(ce * 1.2)}px sans-serif`),
              (x.textAlign = 'center'),
              (x.textBaseline = 'middle'),
              x.fillText(Z.kind === 'stairsUp' ? '▲' : '▼', ae, ue + 1));
          }
          if (ee > 0 && s.some((ae) => ae.x === U.x && ae.y === U.y)) {
            const ae = s.some((J) => J.x === U.x && J.y === U.y && J.alerted),
              ue = w,
              ce = (V.b + H.b) / 2 - (V.b - H.b) * 0.1,
              I = Math.max(14, (V.b - V.t) * 0.22);
            ((x.fillStyle = ae ? '#d32f2f' : '#b0533a'),
              x.beginPath(),
              x.arc(ue, ce, I, 0, Math.PI * 2),
              x.fill(),
              (x.fillStyle = '#fff'),
              (x.font = `bold ${Math.floor(I * 1.3)}px sans-serif`),
              (x.textAlign = 'center'),
              (x.textBaseline = 'middle'),
              x.fillText('!', ue, ce + 1));
          }
        }
      }, [a, i, o, s, r, d, h, v]),
      m.jsx('canvas', { ref: g, className: e2.view, style: { width: h, height: v } })
    );
  },
  ts = [
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
function Np(a) {
  const i = Math.floor((a - 1) / 10);
  return ts[((i % ts.length) + ts.length) % ts.length];
}
function i2(a) {
  var s, r, d;
  const i = a.diveState;
  if (!i) return !1;
  const o =
    (r = (s = a.towerState.floors[i.depth]) == null ? void 0 : s.generated.cells[i.pos.y]) == null
      ? void 0
      : r[i.pos.x];
  return ((d = o == null ? void 0 : o.event) == null ? void 0 : d.kind) === 'cookingSpot';
}
function u2(a) {
  const i = new Set(a.unlockedRecipeIds ?? []);
  return Object.values(Ma).filter((o) => i.has(o.id));
}
function Ay(a, i) {
  const o = Ma[i];
  return !o || !(a.unlockedRecipeIds ?? []).includes(i)
    ? !1
    : o.ingredients.every((s) => wr(a, s.itemId) >= s.qty);
}
function s2(a, i) {
  if (!Ay(a, i)) return { ok: !1, save: a };
  const o = Ma[i];
  let s = a;
  for (const r of o.ingredients) s = ny(s, r.itemId, r.qty);
  return ((s = ly(s, o.result.itemId, o.result.count)), { ok: !0, save: s });
}
function Cy(a, i) {
  const o = new Set([...a.guild.party.front, ...a.guild.party.back].filter((s) => s !== null));
  return a.guild.members.some((s) => o.has(s.id) && (s.learnedSkills[i] ?? 0) > 0);
}
function jy(a) {
  var d, h, v;
  const i = a.diveState;
  if (!i) return null;
  const o = (d = a.towerState.floors[i.depth]) == null ? void 0 : d.generated,
    s = (h = o == null ? void 0 : o.cells[i.pos.y]) == null ? void 0 : h[i.pos.x];
  if (!o || ((v = s == null ? void 0 : s.event) == null ? void 0 : v.kind) !== 'gather')
    return null;
  const r = s.event.gatherId;
  return o.gatheringPoints.find((g) => g.id === r) ?? null;
}
function gr(a, i) {
  var r;
  const o = a.diveState;
  return o
    ? (((r = a.towerState.floors[o.depth]) == null ? void 0 : r.depletedGathers) ?? []).includes(
        ms(i.cell.x, i.cell.y)
      )
    : !0;
}
function kp(a, i) {
  return Cy(a, Rn[i.type].requiredSkillId);
}
function c2(a, i) {
  const o = a.reduce((r, d) => r + d.weight, 0);
  let s = i.next() * o;
  for (const r of a) if (((s -= r.weight), s < 0)) return r.itemId;
  return a[a.length - 1].itemId;
}
function o2(a, i) {
  const o = a.diveState;
  if (!o) return { ok: !1, save: a, reason: 'noDive' };
  const s = jy(a);
  if (!s) return { ok: !1, save: a, reason: 'noPoint' };
  if (gr(a, s)) return { ok: !1, save: a, reason: 'depleted' };
  const r = Rn[s.type];
  if (!Cy(a, r.requiredSkillId)) return { ok: !1, save: a, reason: 'noSkill' };
  if (r.food && ty(a) >= ey) return { ok: !1, save: a, reason: 'foodFull' };
  const d = c2(r.drops, i);
  let h = r.food ? ly(a, d, 1) : Mr(a, d, 1);
  const v = ms(s.cell.x, s.cell.y),
    g = h.towerState.floors[o.depth],
    y = g.depletedGathers.includes(v) ? g.depletedGathers : [...g.depletedGathers, v];
  return (
    (h = {
      ...h,
      towerState: {
        ...h.towerState,
        floors: { ...h.towerState.floors, [o.depth]: { ...g, depletedGathers: y } },
      },
    }),
    { ok: !0, save: h, itemId: d, reason: void 0 }
  );
}
function r2(a, i, o) {
  var w;
  const s = et[i];
  if (!s) return { save: a, ok: !1, message: 'そのアイテムは無い' };
  if (!((w = s.useContext) != null && w.includes('field')))
    return { save: a, ok: !1, message: 'ここでは使えない' };
  const r = Fb(i);
  if ((r ? wr(a, i) : Pp(a, i)) <= 0) return { save: a, ok: !1, message: '所持していない' };
  const h = (j) => (r ? ny(j, i, 1) : Rr(j, i, 1));
  if (i === 'item_return_thread')
    return a.diveState
      ? { save: Ri(h(a)), ok: !0, message: '拠点へ帰還した' }
      : { save: a, ok: !1, message: '探索中のみ使える' };
  if (!a.diveState) return { save: a, ok: !1, message: '探索中のみ使える' };
  const v = a.diveState.party.find((j) => j.charId === o),
    g = a.guild.members.find((j) => j.id === o);
  if (!v || !g) return { save: a, ok: !1, message: '対象がいない' };
  const y = zi(g);
  let _ = v.hp,
    b = v.tp,
    x = !1;
  for (const j of s.effects ?? [])
    j.kind === 'heal'
      ? ((_ = Math.min(y.hp, _ + j.amount(1))), (x = !0))
      : j.kind === 'restoreTp' && ((b = Math.min(y.tp, b + j.amount(1))), (x = !0));
  if (!x) return { save: a, ok: !1, message: 'いま使う効果がない' };
  const R = a.diveState.party.map((j) => (j.charId === o ? { ...j, hp: _, tp: b } : j));
  return {
    save: h({ ...a, diveState: { ...a.diveState, party: R } }),
    ok: !0,
    message: `${g.name} に ${s.name} を使った`,
  };
}
function f2(a) {
  return { depth: a, floorPaint: [], wallDraw: [], icons: [], notes: [], autopilotRoutes: [] };
}
function d2(a, i) {
  return a.playerMaps[i] ?? f2(i);
}
function My(a, i, o) {
  return { ...a, playerMaps: { ...a.playerMaps, [i]: o } };
}
function m2(a, i, o, s, r) {
  const d = d2(a, i),
    h = d.icons.find((y) => y.x === o && y.y === s),
    v = d.icons.filter((y) => !(y.x === o && y.y === s)),
    g = (h == null ? void 0 : h.iconId) === r ? v : [...v, { x: o, y: s, iconId: r }];
  return My(a, i, { ...d, icons: g });
}
function h2(a, i, o, s) {
  const r = a.playerMaps[i];
  return r ? My(a, i, { ...r, icons: r.icons.filter((d) => !(d.x === o && d.y === s)) }) : a;
}
const p2 = () => {
    var ce;
    const a = sl(),
      { save: i, applySave: o, applyAndPersist: s } = Ll(),
      r = T.useRef(null),
      [d, h] = T.useState(null),
      [v, g] = T.useState(!1),
      [y, _] = T.useState(!1),
      [b, x] = T.useState(null),
      R = (i == null ? void 0 : i.diveState) ?? null,
      S = T.useMemo(() => {
        var I;
        return i && R ? ((I = i.towerState.floors[R.depth]) == null ? void 0 : I.generated) : null;
      }, [i, R]),
      w = T.useMemo(() => {
        var I;
        return i && R
          ? (((I = i.towerState.floors[R.depth]) == null ? void 0 : I.foeRuntime) ?? [])
              .filter((J) => !J.defeated)
              .map((J) => ({ x: J.cell.x, y: J.cell.y, alerted: J.alerted }))
          : [];
      }, [i, R]),
      j = T.useMemo(() => (i ? jy(i) : null), [i]),
      A = T.useMemo(() => (i ? i2(i) : !1), [i]),
      k = T.useMemo(() => {
        var I;
        return i && R
          ? (((I = i.towerState.floors[R.depth]) == null ? void 0 : I.depletedGathers) ?? [])
          : [];
      }, [i, R]),
      Q = T.useCallback(() => {
        var J;
        if (!i) return;
        r.current || (r.current = On((i.masterSeed ^ 2654435769) >>> 0));
        const I = o2(i, r.current);
        if (!I.ok) {
          x(
            I.reason === 'noSkill'
              ? '対応する採集スキルを持つ仲間がいない'
              : I.reason === 'foodFull'
                ? '食料がいっぱいで採れない'
                : '採集できない'
          );
          return;
        }
        (s(() => I.save),
          x(
            `${I.itemId ? (((J = et[I.itemId]) == null ? void 0 : J.name) ?? '素材') : '素材'} を手に入れた`
          ));
      }, [i, s]),
      P = T.useCallback(
        (I) => {
          var he;
          if (!i) return;
          const J = s2(i, I);
          J.ok &&
            (s(() => J.save), x(`${((he = Ma[I]) == null ? void 0 : he.name) ?? '料理'} を作った`));
        },
        [i, s]
      ),
      ee = T.useCallback(
        (I) => {
          if (!i) return;
          (x(null), r.current || (r.current = On((i.masterSeed ^ 2654435769) >>> 0)));
          const J = I1(i, I, r.current);
          (s(() => J.save), J.triggered && a('/battle'));
        },
        [i, s, a]
      ),
      V = T.useCallback(
        (I) => {
          o((J) => yy(J, I));
        },
        [o]
      ),
      H = T.useCallback(async () => {
        if (!i) return;
        const I = yp(i);
        if (I === 'stairsUp') {
          if (!_y(i, i.diveState.depth)) {
            x('強大な力に阻まれている。階層ボスを倒さねば先へ進めない。');
            return;
          }
          await s((J) => F1(J));
        } else
          I === 'stairsDown' &&
            (i.diveState.depth <= 1 ? (await s((J) => Ri(J)), a('/town')) : await s((J) => P1(J)));
      }, [i, s, a]),
      U = T.useCallback(async () => {
        (await s((I) => Ri(I)), a('/town'));
      }, [s, a]),
      Z = T.useCallback(
        (I, J) => {
          if (!i) return;
          const he = r2(i, I, J);
          he.ok && (s(() => he.save), he.save.diveState || (g(!1), a('/town')));
        },
        [i, s, a]
      ),
      ae = T.useCallback(
        (I, J) => {
          if (!R) return;
          const he = R.depth;
          if (d !== null) {
            if (!((i == null ? void 0 : i.exploredCells[he]) ?? []).includes(`${I},${J}`)) return;
            s(d === 'erase' ? (Ee) => h2(Ee, he, I, J) : (Ee) => m2(Ee, he, I, J, d));
            return;
          }
          const L = I - R.pos.x,
            K = J - R.pos.y,
            te = ['N', 'E', 'S', 'W'].find((ge) => Wt[ge].dx === L && Wt[ge].dy === K);
          te && ee(te);
        },
        [R, ee, d, i, s]
      );
    if (!i) return m.jsx(il, { to: '/title', replace: !0 });
    if (!R || !S) return m.jsx(il, { to: '/town', replace: !0 });
    const ue = yp(i);
    return m.jsxs('div', {
      className: me.layout,
      children: [
        m.jsxs('header', {
          className: me.head,
          children: [
            m.jsxs('div', {
              className: me.depth,
              children: [
                R.depth,
                'F ',
                m.jsx('span', { className: me.theme, children: Np(R.depth).name }),
              ],
            }),
            m.jsx(Fx, { level: M1(R.encounter.stepsUntilEncounter) }),
            m.jsx('button', {
              type: 'button',
              className: me.return,
              onClick: () => g(!0),
              children: '道具',
            }),
            m.jsx('button', {
              type: 'button',
              className: me.return,
              onClick: () => void U(),
              children: '帰還',
            }),
          ],
        }),
        m.jsx('div', {
          className: me.fpvWrap,
          children: m.jsx(a2, { floor: S, pos: R.pos, dir: R.dir, foes: w, theme: Np(R.depth) }),
        }),
        m.jsx('div', {
          className: me.mapWrap,
          children: m.jsx(Vx, {
            floor: S,
            explored: i.exploredCells[R.depth] ?? [],
            pos: R.pos,
            dir: R.dir,
            icons: ((ce = i.playerMaps[R.depth]) == null ? void 0 : ce.icons) ?? [],
            foes: w,
            depletedGathers: k,
            onCellClick: ae,
          }),
        }),
        m.jsxs('div', {
          className: me.palette,
          children: [
            m.jsx('button', {
              type: 'button',
              className: `${me.tool} ${d === null ? me.toolActive : ''}`,
              onClick: () => h(null),
              'aria-label': '移動モード',
              children: '🚶',
            }),
            ky.map((I) =>
              m.jsx(
                'button',
                {
                  type: 'button',
                  className: `${me.tool} ${d === I.id ? me.toolActive : ''}`,
                  onClick: () => h(I.id),
                  'aria-label': I.label,
                  children: I.symbol,
                },
                I.id
              )
            ),
            m.jsx('button', {
              type: 'button',
              className: `${me.tool} ${d === 'erase' ? me.toolActive : ''}`,
              onClick: () => h('erase'),
              'aria-label': '消しゴム',
              children: '🧽',
            }),
          ],
        }),
        m.jsx('p', {
          className: me.paletteHint,
          children:
            d === null
              ? '隣接マスをタップで移動。アイコンを選ぶとマップに書き込めます。'
              : d === 'erase'
                ? 'マップ上のマスをタップでアイコンを消去。'
                : 'マップ上の探索済みマスをタップでアイコンを配置（再タップで消去）。',
        }),
        ue &&
          m.jsx('button', {
            type: 'button',
            className: me.stairs,
            onClick: () => void H(),
            children:
              ue === 'stairsUp'
                ? '▲ 次の階へ進む'
                : R.depth <= 1
                  ? '▼ 拠点へ戻る'
                  : '▼ 前の階へ戻る',
          }),
        j &&
          m.jsx('button', {
            type: 'button',
            className: me.action,
            disabled: gr(i, j) || !kp(i, j),
            onClick: Q,
            children: gr(i, j)
              ? `🌿 ${Rn[j.type].name}（採集済み）`
              : kp(i, j)
                ? `🌿 ${Rn[j.type].name}する`
                : `🌿 ${Rn[j.type].name}（スキル要）`,
          }),
        A &&
          m.jsx('button', {
            type: 'button',
            className: me.action,
            onClick: () => _(!0),
            children: '🍳 調理する',
          }),
        b && m.jsx('p', { className: me.notice, children: b }),
        m.jsxs('div', {
          className: me.controls,
          children: [
            m.jsxs('div', {
              className: me.row,
              children: [
                m.jsx('button', {
                  type: 'button',
                  className: me.turn,
                  onClick: () => V(dy(R.dir)),
                  'aria-label': '左を向く',
                  children: '↰',
                }),
                m.jsx('button', {
                  type: 'button',
                  className: me.forward,
                  onClick: () => ee(R.dir),
                  children: '前進',
                }),
                m.jsx('button', {
                  type: 'button',
                  className: me.turn,
                  onClick: () => V(fy(R.dir)),
                  'aria-label': '右を向く',
                  children: '↱',
                }),
              ],
            }),
            m.jsx('button', {
              type: 'button',
              className: me.back,
              onClick: () => V(R1(R.dir)),
              'aria-label': '振り向く',
              children: '↻ 振り向く',
            }),
          ],
        }),
        v
          ? m.jsx('div', {
              className: me.itemOverlay,
              onClick: () => g(!1),
              children: m.jsxs('div', {
                className: me.itemPanel,
                onClick: (I) => I.stopPropagation(),
                children: [
                  m.jsx('div', { className: me.itemTitle, children: 'どうぐ・食料' }),
                  (() => {
                    const I = [...i.guild.storage, ...(i.guild.foodStorage ?? [])].filter((J) => {
                      var he, L;
                      return (
                        ((L = (he = et[J.itemId]) == null ? void 0 : he.useContext) == null
                          ? void 0
                          : L.includes('field')) && J.qty > 0
                      );
                    });
                    return I.length === 0
                      ? m.jsx('p', {
                          className: me.itemEmpty,
                          children: '使える道具がありません。',
                        })
                      : I.map((J) => {
                          const he = et[J.itemId],
                            L = J.itemId === 'item_return_thread';
                          return m.jsxs(
                            'div',
                            {
                              className: me.itemRow,
                              children: [
                                m.jsxs('div', {
                                  className: me.itemName,
                                  children: [
                                    he.name,
                                    ' ×',
                                    J.qty,
                                    m.jsx('span', {
                                      className: me.itemDesc,
                                      children: he.description,
                                    }),
                                  ],
                                }),
                                L
                                  ? m.jsx('button', {
                                      type: 'button',
                                      className: me.itemUse,
                                      onClick: () => Z(J.itemId),
                                      children: '使う',
                                    })
                                  : m.jsx('div', {
                                      className: me.itemTargets,
                                      children: R.party.map((K) => {
                                        const te = i.guild.members.find((Ee) => Ee.id === K.charId);
                                        if (!te) return null;
                                        const ge = zi(te);
                                        return m.jsxs(
                                          'button',
                                          {
                                            type: 'button',
                                            className: me.itemTarget,
                                            onClick: () => Z(J.itemId, K.charId),
                                            children: [
                                              te.name,
                                              m.jsxs('span', {
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
                  m.jsx('button', {
                    type: 'button',
                    className: me.itemClose,
                    onClick: () => g(!1),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
        y
          ? m.jsx('div', {
              className: me.itemOverlay,
              onClick: () => _(!1),
              children: m.jsxs('div', {
                className: me.itemPanel,
                onClick: (I) => I.stopPropagation(),
                children: [
                  m.jsx('div', { className: me.itemTitle, children: '調理' }),
                  (() => {
                    const I = u2(i);
                    return I.length === 0
                      ? m.jsx('p', {
                          className: me.itemEmpty,
                          children: '作れるレシピがありません。',
                        })
                      : I.map((J) => {
                          var K;
                          const he = Ay(i, J.id),
                            L = J.ingredients
                              .map((te) => {
                                var ge;
                                return `${((ge = et[te.itemId]) == null ? void 0 : ge.name) ?? te.itemId}×${te.qty}`;
                              })
                              .join(' ＋ ');
                          return m.jsxs(
                            'div',
                            {
                              className: me.itemRow,
                              children: [
                                m.jsxs('div', {
                                  className: me.itemName,
                                  children: [
                                    J.name,
                                    m.jsxs('span', {
                                      className: me.itemDesc,
                                      children: [
                                        L,
                                        ' → ',
                                        ((K = et[J.result.itemId]) == null ? void 0 : K.name) ??
                                          J.result.itemId,
                                        '（所持',
                                        J.ingredients
                                          .map((te) => {
                                            var ge;
                                            return `${((ge = et[te.itemId]) == null ? void 0 : ge.name) ?? ''}${wr(i, te.itemId)}`;
                                          })
                                          .join('・'),
                                        '）',
                                      ],
                                    }),
                                  ],
                                }),
                                m.jsx('button', {
                                  type: 'button',
                                  className: me.itemUse,
                                  disabled: !he,
                                  onClick: () => P(J.id),
                                  children: '作る',
                                }),
                              ],
                            },
                            J.id
                          );
                        });
                  })(),
                  m.jsx('button', {
                    type: 'button',
                    className: me.itemClose,
                    onClick: () => _(!1),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
      ],
    });
  },
  y2 = '_layout_34t9v_1',
  g2 = '_head_34t9v_11',
  _2 = '_title_34t9v_18',
  v2 = '_stock_34t9v_24',
  b2 = '_tabs_34t9v_29',
  S2 = '_tab_34t9v_29',
  x2 = '_tabActive_34t9v_46',
  E2 = '_hint_34t9v_51',
  T2 = '_list_34t9v_57',
  N2 = '_row_34t9v_65',
  k2 = '_info_34t9v_76',
  A2 = '_name_34t9v_82',
  C2 = '_note_34t9v_87',
  j2 = '_actions_34t9v_92',
  M2 = '_ingot_34t9v_97',
  R2 = '_recycle_34t9v_114',
  w2 = '_maxed_34t9v_126',
  O2 = '_empty_34t9v_132',
  D2 = '_foot_34t9v_137',
  z2 = '_back_34t9v_141',
  We = {
    layout: y2,
    head: g2,
    title: _2,
    stock: v2,
    tabs: b2,
    tab: S2,
    tabActive: x2,
    hint: E2,
    list: T2,
    row: N2,
    info: k2,
    name: A2,
    note: C2,
    actions: j2,
    ingot: M2,
    recycle: R2,
    maxed: w2,
    empty: O2,
    foot: D2,
    back: z2,
  },
  B2 = () => {
    const a = sl(),
      { save: i, applyAndPersist: o } = Ll(),
      [s, r] = T.useState('forge');
    if (!i) return m.jsx(il, { to: '/title', replace: !0 });
    const { copper: d, silver: h, gold: v } = i.forgeInventory.ingots,
      g = i.forgeInventory.fragments.common ?? 0,
      y = i.guild.equipment,
      _ = (b, x, R, S) =>
        m.jsxs('button', {
          type: 'button',
          className: We.ingot,
          disabled: S <= 0,
          onClick: () => void o((w) => o1(w, b, x).save),
          children: [R, '+', ml.INGOT_INC[x], '（', S, '）'],
        });
    return m.jsxs('div', {
      className: We.layout,
      children: [
        m.jsxs('header', {
          className: We.head,
          children: [
            m.jsx('h1', { className: We.title, children: '鍛冶屋' }),
            m.jsxs('span', {
              className: We.stock,
              children: ['銅', d, '・銀', h, '・金', v, '／断片', g],
            }),
          ],
        }),
        m.jsxs('div', {
          className: We.tabs,
          children: [
            m.jsx('button', {
              type: 'button',
              className: `${We.tab} ${s === 'forge' ? We.tabActive : ''}`,
              onClick: () => r('forge'),
              children: '強化',
            }),
            m.jsx('button', {
              type: 'button',
              className: `${We.tab} ${s === 'recycle' ? We.tabActive : ''}`,
              onClick: () => r('recycle'),
              children: 'リサイクル',
            }),
          ],
        }),
        m.jsx('p', {
          className: We.hint,
          children:
            s === 'forge'
              ? 'インゴットで装備を強化（最大 +5）。銅+1・銀+3・金+5。'
              : '不要な装備を断片に変換。断片10個で銅インゴット1個になる。',
        }),
        m.jsx('div', {
          className: We.list,
          children:
            y.length === 0
              ? m.jsx('p', { className: We.empty, children: '所有している装備がありません。' })
              : y.map((b) => {
                  const x = ht[b.masterId],
                    R = b.forgeLevel >= ml.MAX_LEVEL;
                  return m.jsxs(
                    'div',
                    {
                      className: We.row,
                      children: [
                        m.jsxs('div', {
                          className: We.info,
                          children: [
                            m.jsx('span', { className: We.name, children: rs(b) }),
                            m.jsx('span', {
                              className: We.note,
                              children: x == null ? void 0 : x.slot,
                            }),
                          ],
                        }),
                        s === 'forge'
                          ? m.jsx('div', {
                              className: We.actions,
                              children: R
                                ? m.jsx('span', { className: We.maxed, children: '最大強化' })
                                : m.jsxs(m.Fragment, {
                                    children: [
                                      _(b.id, 'copper', '銅', d),
                                      _(b.id, 'silver', '銀', h),
                                      _(b.id, 'gold', '金', v),
                                    ],
                                  }),
                            })
                          : m.jsxs('button', {
                              type: 'button',
                              className: We.recycle,
                              onClick: () => void o((S) => r1(S, b.id).save),
                              children: ['分解（断片+', ml.RECYCLE_FRAGMENTS, '）'],
                            }),
                      ],
                    },
                    b.id
                  );
                }),
        }),
        m.jsx('footer', {
          className: We.foot,
          children: m.jsx('button', {
            type: 'button',
            className: We.back,
            onClick: () => a('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  L2 = '_layout_16au8_2',
  U2 = '_head_16au8_13',
  q2 = '_title_16au8_20',
  H2 = '_count_16au8_26',
  G2 = '_create_16au8_31',
  Y2 = '_sectionTitle_16au8_42',
  $2 = '_field_16au8_48',
  X2 = '_primary_16au8_64',
  V2 = '_list_16au8_79',
  Q2 = '_empty_16au8_83',
  Z2 = '_members_16au8_88',
  K2 = '_member_16au8_88',
  I2 = '_memberMain_16au8_107',
  J2 = '_memberName_16au8_119',
  W2 = '_pos_16au8_127',
  F2 = '_memberSub_16au8_144',
  P2 = '_posBtns_16au8_149',
  eE = '_posBtn_16au8_149',
  tE = '_posBtnActive_16au8_164',
  lE = '_foot_16au8_170',
  nE = '_sub_16au8_174',
  De = {
    layout: L2,
    head: U2,
    title: q2,
    count: H2,
    create: G2,
    sectionTitle: Y2,
    field: $2,
    primary: X2,
    list: V2,
    empty: Q2,
    members: Z2,
    member: K2,
    memberMain: I2,
    memberName: J2,
    pos: W2,
    pos_前衛: '_pos_前衛_16au8_136',
    pos_後衛: '_pos_後衛_16au8_140',
    memberSub: F2,
    posBtns: P2,
    posBtn: eE,
    posBtnActive: tE,
    foot: lE,
    sub: nE,
  };
function aE(a) {
  return [...a.guild.party.front, ...a.guild.party.back].filter((i) => i !== null).length;
}
const Ry = (a) => (a === 'front' ? _s : vs);
function iE(a, i, o, s) {
  if (o < 0 || o >= Ry(i) || (s !== null && !a.guild.members.some((h) => h.id === s))) return a;
  const r = a.guild.party.front.map((h) => (h === s ? null : h)),
    d = a.guild.party.back.map((h) => (h === s ? null : h));
  for (; r.length < _s; ) r.push(null);
  for (; d.length < vs; ) d.push(null);
  return (
    i === 'front' ? (r[o] = s) : (d[o] = s),
    { ...a, guild: { ...a.guild, party: { front: r, back: d } } }
  );
}
function wy(a, i) {
  const o = a.guild.party.front.map((r) => (r === i ? null : r)),
    s = a.guild.party.back.map((r) => (r === i ? null : r));
  return { ...a, guild: { ...a.guild, party: { front: o, back: s } } };
}
function Ap(a, i, o) {
  if (
    !a.guild.members.some((v) => v.id === i) ||
    (o === 'front' ? a.guild.party.front : a.guild.party.back).includes(i)
  )
    return a;
  const r = wy(a, i),
    d = o === 'front' ? r.guild.party.front : r.guild.party.back;
  let h = d.indexOf(null);
  if (h < 0)
    if (d.length < Ry(o)) h = d.length;
    else return a;
  return iE(r, o, h, i);
}
function uE(a, i) {
  return a.guild.party.front.includes(i)
    ? '前衛'
    : a.guild.party.back.includes(i)
      ? '後衛'
      : '控え';
}
const sE = () => {
    const a = sl(),
      { save: i, applyAndPersist: o } = Ll(),
      s = Object.keys(Ft),
      r = Object.keys(gt),
      [d, h] = T.useState(''),
      [v, g] = T.useState(s[0]),
      [y, _] = T.useState(r[0]),
      [b, x] = T.useState(!1),
      R = T.useCallback(async () => {
        const j = d.trim() || '名もなき冒険者',
          A = vy({ raceId: v, classId: y, name: j });
        (x(!0), await o((k) => oS(k, A)), h(''), x(!1));
      }, [d, v, y, o]);
    if (!i) return m.jsx(il, { to: '/title', replace: !0 });
    const { members: S } = i.guild,
      w = S.length >= or;
    return m.jsxs('div', {
      className: De.layout,
      children: [
        m.jsxs('header', {
          className: De.head,
          children: [
            m.jsx('h1', { className: De.title, children: 'ギルド管理' }),
            m.jsxs('span', { className: De.count, children: ['団員 ', S.length, ' / ', or] }),
          ],
        }),
        m.jsxs('section', {
          className: De.create,
          children: [
            m.jsx('h2', { className: De.sectionTitle, children: '冒険者を作成' }),
            m.jsxs('label', {
              className: De.field,
              children: [
                m.jsx('span', { children: '名前' }),
                m.jsx('input', {
                  type: 'text',
                  value: d,
                  maxLength: 16,
                  placeholder: '名もなき冒険者',
                  onChange: (j) => h(j.target.value),
                }),
              ],
            }),
            m.jsxs('label', {
              className: De.field,
              children: [
                m.jsx('span', { children: '種族' }),
                m.jsx('select', {
                  value: v,
                  onChange: (j) => g(j.target.value),
                  children: s.map((j) => m.jsx('option', { value: j, children: Ft[j].name }, j)),
                }),
              ],
            }),
            m.jsxs('label', {
              className: De.field,
              children: [
                m.jsx('span', { children: '職業' }),
                m.jsx('select', {
                  value: y,
                  onChange: (j) => _(j.target.value),
                  children: r.map((j) => m.jsx('option', { value: j, children: gt[j].name }, j)),
                }),
              ],
            }),
            m.jsx('button', {
              type: 'button',
              className: De.primary,
              disabled: b || w,
              onClick: () => void R(),
              children: w ? '団員が上限です' : '作成する',
            }),
          ],
        }),
        m.jsxs('section', {
          className: De.list,
          children: [
            m.jsxs('h2', {
              className: De.sectionTitle,
              children: [
                '団員一覧',
                ' ',
                m.jsxs('span', {
                  className: De.count,
                  children: ['（出撃 ', aE(i), ' / ', e1, '）'],
                }),
              ],
            }),
            S.length === 0
              ? m.jsx('p', { className: De.empty, children: 'まだ冒険者がいません。' })
              : m.jsx('ul', {
                  className: De.members,
                  children: S.map((j) => {
                    var k, Q;
                    const A = uE(i, j.id);
                    return m.jsxs(
                      'li',
                      {
                        className: De.member,
                        children: [
                          m.jsxs('button', {
                            type: 'button',
                            className: De.memberMain,
                            onClick: () => a(`/guild/char/${j.id}`),
                            children: [
                              m.jsxs('span', {
                                className: De.memberName,
                                children: [
                                  j.name,
                                  m.jsx('span', {
                                    className: `${De.pos} ${De[`pos_${A}`] ?? ''}`,
                                    children: A,
                                  }),
                                ],
                              }),
                              m.jsxs('span', {
                                className: De.memberSub,
                                children: [
                                  (k = Ft[j.raceId]) == null ? void 0 : k.name,
                                  ' / ',
                                  (Q = gt[j.classId]) == null ? void 0 : Q.name,
                                  ' / Lv',
                                  j.level,
                                  ' ›',
                                ],
                              }),
                            ],
                          }),
                          m.jsxs('div', {
                            className: De.posBtns,
                            children: [
                              m.jsx('button', {
                                type: 'button',
                                className: `${De.posBtn} ${A === '前衛' ? De.posBtnActive : ''}`,
                                onClick: () => void o((P) => Ap(P, j.id, 'front')),
                                children: '前',
                              }),
                              m.jsx('button', {
                                type: 'button',
                                className: `${De.posBtn} ${A === '後衛' ? De.posBtnActive : ''}`,
                                onClick: () => void o((P) => Ap(P, j.id, 'back')),
                                children: '後',
                              }),
                              m.jsx('button', {
                                type: 'button',
                                className: `${De.posBtn} ${A === '控え' ? De.posBtnActive : ''}`,
                                onClick: () => void o((P) => wy(P, j.id)),
                                children: '控',
                              }),
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
        m.jsx('footer', {
          className: De.foot,
          children: m.jsx('button', {
            type: 'button',
            className: De.sub,
            onClick: () => a('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  cE = '_layout_tw23z_1',
  oE = '_head_tw23z_12',
  rE = '_title_tw23z_16',
  fE = '_sub_tw23z_22',
  dE = '_card_tw23z_27',
  mE = '_h2_tw23z_35',
  hE = '_sp_tw23z_44',
  pE = '_stats_tw23z_50',
  yE = '_equipSlot_tw23z_74',
  gE = '_equipHead_tw23z_82',
  _E = '_slotLabel_tw23z_88',
  vE = '_equipName_tw23z_95',
  bE = '_smallBtn_tw23z_100',
  SE = '_equipPick_tw23z_110',
  xE = '_pickBtn_tw23z_118',
  EE = '_skills_tw23z_128',
  TE = '_skill_tw23z_128',
  NE = '_skillInfo_tw23z_143',
  kE = '_skillName_tw23z_150',
  AE = '_skillLv_tw23z_158',
  CE = '_skillDesc_tw23z_164',
  jE = '_learnBtn_tw23z_169',
  ME = '_jobRow_tw23z_185',
  RE = '_select_tw23z_192',
  wE = '_input_tw23z_193',
  OE = '_actBtn_tw23z_203',
  DE = '_warn_tw23z_220',
  zE = '_titleHave_tw23z_227',
  BE = '_titleOpts_tw23z_233',
  LE = '_titleBtn_tw23z_240',
  UE = '_rbForm_tw23z_252',
  qE = '_danger_tw23z_258',
  HE = '_foot_tw23z_270',
  GE = '_back_tw23z_274',
  fe = {
    layout: cE,
    head: oE,
    title: rE,
    sub: fE,
    card: dE,
    h2: mE,
    sp: hE,
    stats: pE,
    equipSlot: yE,
    equipHead: gE,
    slotLabel: _E,
    equipName: vE,
    smallBtn: bE,
    equipPick: SE,
    pickBtn: xE,
    skills: EE,
    skill: TE,
    skillInfo: NE,
    skillName: kE,
    skillLv: AE,
    skillDesc: CE,
    learnBtn: jE,
    jobRow: ME,
    select: RE,
    input: wE,
    actBtn: OE,
    warn: DE,
    titleHave: zE,
    titleOpts: BE,
    titleBtn: LE,
    rbForm: UE,
    danger: qE,
    foot: HE,
    back: GE,
  },
  Oy = ['weapon', 'armor', 'accessory'];
function Dy(a, i, o) {
  return { ...a, guild: { ...a.guild, members: a.guild.members.map((s) => (s.id === i ? o : s)) } };
}
function YE(a) {
  var i, o;
  return (o = (i = gt[a]) == null ? void 0 : i.skillTree.skills[0]) == null ? void 0 : o.skillId;
}
function $E(a) {
  var i;
  return new Set(
    (((i = Ft[a]) == null ? void 0 : i.raceSkillTree.skills) ?? []).map((o) => o.skillId)
  );
}
const XE = (a) => Object.values(a).reduce((i, o) => i + o, 0);
function VE(a, i) {
  if (!gt[i]) return a;
  const o = $E(a.raceId);
  let s = {};
  for (const [g, y] of Object.entries(a.learnedSkills)) o.has(g) && (s[g] = y);
  const r = YE(i);
  r && !s[r] && (s[r] = 1);
  const d = Math.max(1, a.level - Ip),
    h = Le.SP_PER_LEVEL * Math.max(0, d - 1);
  let v = XE(s) - (r && s[r] ? 1 : 0);
  return (
    v > h && ((s = r ? { [r]: 1 } : {}), (v = 0)),
    {
      ...a,
      classId: i,
      titleId: null,
      level: d,
      exp: 0,
      learnedSkills: s,
      skillPoints: { total: h, spent: v },
    }
  );
}
function QE(a, i, o) {
  const s = a.guild.members.find((h) => h.id === i);
  if (!s) return a;
  let r = Dy(a, i, VE(s, o));
  const d = r.guild.members.find((h) => h.id === i);
  for (const h of Oy) {
    const v = d.equipment[h];
    v && !Or(d, v.masterId) && (r = Dr(r, i, h));
  }
  return r;
}
const ZE = [
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
function KE(a) {
  const i = ZE.find((o) => a >= o.min && a <= o.max);
  return i ? { allStats: i.allStats, bonusSp: i.bonusSp } : null;
}
function zy(a) {
  return a.level >= Ai.REBIRTH_MIN_LEVEL;
}
function IE(a, i) {
  const o = KE(a.level);
  if (!o) return a;
  const s = Math.min(30, Math.floor(a.level / 2)),
    r = vy({ ...i, id: a.id }),
    d = Le.SP_PER_LEVEL * Math.max(0, s - 1) + o.bonusSp;
  return {
    ...r,
    level: Math.max(1, s),
    exp: 0,
    rebirthBonus: o,
    skillPoints: { total: d, spent: r.skillPoints.spent },
  };
}
function JE(a, i, o) {
  const s = a.guild.members.find((h) => h.id === i);
  if (!s || !zy(s)) return a;
  let r = a;
  for (const h of Oy) s.equipment[h] && (r = Dr(r, i, h));
  const d = r.guild.members.find((h) => h.id === i);
  return Dy(r, i, IE(d, o));
}
function By(a, i, o) {
  var r;
  return o < Ai.TITLE_DEPTH || a.titleId
    ? !1
    : (((r = gt[a.classId]) == null ? void 0 : r.titleOptions) ?? []).includes(i);
}
function WE(a, i, o) {
  return By(a, i, o)
    ? { ...a, titleId: i, skillPoints: { ...a.skillPoints, total: a.skillPoints.total + t1 } }
    : a;
}
function Ly(a) {
  var o, s;
  const i = [
    ...(((o = gt[a.classId]) == null ? void 0 : o.skillTree.skills) ?? []),
    ...(((s = Ft[a.raceId]) == null ? void 0 : s.raceSkillTree.skills) ?? []),
  ];
  return (a.titleId && Ta[a.titleId] && i.push(...Ta[a.titleId].skillTree.skills), i);
}
function xs(a, i) {
  return a.learnedSkills[i] ?? 0;
}
function Uy(a) {
  return a.skillPoints.total - a.skillPoints.spent;
}
function FE(a, i) {
  return (i.requires ?? []).every((o) => xs(a, o.skillId) >= o.level);
}
function qy(a, i) {
  const o = Ly(a).find((s) => s.skillId === i);
  return !o || xs(a, i) >= o.maxLevel || Uy(a) <= 0 ? !1 : FE(a, o);
}
function PE(a, i) {
  return qy(a, i)
    ? {
        ...a,
        learnedSkills: { ...a.learnedSkills, [i]: xs(a, i) + 1 },
        skillPoints: { ...a.skillPoints, spent: a.skillPoints.spent + 1 },
      }
    : a;
}
const Cp = Object.keys(Ft),
  ls = Object.keys(gt),
  e3 = ['weapon', 'armor', 'accessory'],
  t3 = { weapon: '武器', armor: '防具', accessory: '装飾' },
  l3 = [
    { key: 'hp', label: 'HP' },
    { key: 'tp', label: 'TP' },
    { key: 'str', label: 'STR' },
    { key: 'vit', label: 'VIT' },
    { key: 'agi', label: 'AGI' },
    { key: 'int', label: 'INT' },
    { key: 'mnd', label: 'MND' },
    { key: 'luc', label: 'LUC' },
  ],
  n3 = () => {
    var P, ee, V, H;
    const a = sl(),
      { id: i } = uv(),
      { save: o, applyAndPersist: s } = Ll(),
      [r, d] = T.useState(ls[0]),
      [h, v] = T.useState(''),
      [g, y] = T.useState(Cp[0]),
      [_, b] = T.useState(ls[0]),
      [x, R] = T.useState(!1);
    if (!o) return m.jsx(il, { to: '/title', replace: !0 });
    const S = o.guild.members.find((U) => U.id === i);
    if (!S || !i) return m.jsx(il, { to: '/guild', replace: !0 });
    const w = zi(S),
      j = Uy(S),
      A = o.towerState.record.deepestReached,
      k = (U) =>
        s((Z) => ({
          ...Z,
          guild: { ...Z.guild, members: Z.guild.members.map((ae) => (ae.id === i ? U(ae) : ae)) },
        }));
    return m.jsxs('div', {
      className: fe.layout,
      children: [
        m.jsxs('header', {
          className: fe.head,
          children: [
            m.jsx('h1', { className: fe.title, children: S.name }),
            m.jsxs('span', {
              className: fe.sub,
              children: [
                (P = Ft[S.raceId]) == null ? void 0 : P.name,
                ' / ',
                (ee = gt[S.classId]) == null ? void 0 : ee.name,
                ' / Lv',
                S.level,
              ],
            }),
          ],
        }),
        m.jsxs('section', {
          className: fe.card,
          children: [
            m.jsx('h2', { className: fe.h2, children: 'ステータス' }),
            m.jsx('dl', {
              className: fe.stats,
              children: l3.map((U) =>
                m.jsxs(
                  'div',
                  {
                    children: [
                      m.jsx('dt', { children: U.label }),
                      m.jsx('dd', { children: w[U.key] }),
                    ],
                  },
                  U.key
                )
              ),
            }),
          ],
        }),
        m.jsxs('section', {
          className: fe.card,
          children: [
            m.jsx('h2', { className: fe.h2, children: '装備' }),
            e3.map((U) => {
              const Z = S.equipment[U],
                ae = o.guild.equipment.filter((ue) => {
                  var ce;
                  return (
                    ((ce = ht[ue.masterId]) == null ? void 0 : ce.slot) === U && Or(S, ue.masterId)
                  );
                });
              return m.jsxs(
                'div',
                {
                  className: fe.equipSlot,
                  children: [
                    m.jsxs('div', {
                      className: fe.equipHead,
                      children: [
                        m.jsx('span', { className: fe.slotLabel, children: t3[U] }),
                        m.jsx('span', {
                          className: fe.equipName,
                          children: Z ? rs(Z) : '（なし）',
                        }),
                        Z
                          ? m.jsx('button', {
                              type: 'button',
                              className: fe.smallBtn,
                              onClick: () => void Q(U),
                              children: '外す',
                            })
                          : null,
                      ],
                    }),
                    ae.length > 0
                      ? m.jsx('div', {
                          className: fe.equipPick,
                          children: ae.map((ue) =>
                            m.jsxs(
                              'button',
                              {
                                type: 'button',
                                className: fe.pickBtn,
                                onClick: () => void s((ce) => m1(ce, i, ue.id)),
                                children: [rs(ue), ' 装備'],
                              },
                              ue.id
                            )
                          ),
                        })
                      : null,
                  ],
                },
                U
              );
            }),
          ],
        }),
        m.jsxs('section', {
          className: fe.card,
          children: [
            m.jsxs('h2', {
              className: fe.h2,
              children: ['スキル ', m.jsxs('span', { className: fe.sp, children: ['SP ', j] })],
            }),
            m.jsx('ul', {
              className: fe.skills,
              children: Ly(S).map((U) => {
                const Z = xs(S, U.skillId),
                  ae = qy(S, U.skillId),
                  ue = Cr[U.skillId];
                return m.jsxs(
                  'li',
                  {
                    className: fe.skill,
                    children: [
                      m.jsxs('div', {
                        className: fe.skillInfo,
                        children: [
                          m.jsxs('span', {
                            className: fe.skillName,
                            children: [
                              (ue == null ? void 0 : ue.name) ?? U.skillId,
                              m.jsxs('span', {
                                className: fe.skillLv,
                                children: ['Lv ', Z, '/', U.maxLevel],
                              }),
                            ],
                          }),
                          m.jsx('span', {
                            className: fe.skillDesc,
                            children: (ue == null ? void 0 : ue.description) ?? '',
                          }),
                        ],
                      }),
                      m.jsx('button', {
                        type: 'button',
                        className: fe.learnBtn,
                        disabled: !ae,
                        onClick: () => void k((ce) => PE(ce, U.skillId)),
                        children: '＋',
                      }),
                    ],
                  },
                  U.skillId
                );
              }),
            }),
          ],
        }),
        m.jsxs('section', {
          className: fe.card,
          children: [
            m.jsx('h2', { className: fe.h2, children: '転職' }),
            m.jsxs('div', {
              className: fe.jobRow,
              children: [
                m.jsx('select', {
                  className: fe.select,
                  value: r,
                  onChange: (U) => d(U.target.value),
                  children: ls.map((U) => m.jsx('option', { value: U, children: gt[U].name }, U)),
                }),
                m.jsx('button', {
                  type: 'button',
                  className: fe.actBtn,
                  disabled: r === S.classId,
                  onClick: () => void s((U) => QE(U, i, r)),
                  children: '転職する',
                }),
              ],
            }),
            m.jsxs('p', {
              className: fe.warn,
              children: [
                '※ レベルが ',
                Ip,
                ' ',
                '下がり、職業/称号スキルは振り直しになります（種族スキルは保持）。',
              ],
            }),
            m.jsx('h2', { className: fe.h2, children: '称号' }),
            S.titleId
              ? m.jsxs('p', {
                  className: fe.titleHave,
                  children: ['習得済み: ', (V = Ta[S.titleId]) == null ? void 0 : V.name],
                })
              : A < Ai.TITLE_DEPTH
                ? m.jsxs('p', {
                    className: fe.warn,
                    children: ['第 ', Ai.TITLE_DEPTH, ' 階到達で習得できます（現在 ', A, 'F）。'],
                  })
                : m.jsx('div', {
                    className: fe.titleOpts,
                    children: (((H = gt[S.classId]) == null ? void 0 : H.titleOptions) ?? []).map(
                      (U) => {
                        var Z;
                        return m.jsxs(
                          'button',
                          {
                            type: 'button',
                            className: fe.titleBtn,
                            disabled: !By(S, U, A),
                            onClick: () => void k((ae) => WE(ae, U, A)),
                            children: [(Z = Ta[U]) == null ? void 0 : Z.name, '（SP+5）'],
                          },
                          U
                        );
                      }
                    ),
                  }),
            m.jsx('h2', { className: fe.h2, children: '転生' }),
            zy(S)
              ? x
                ? m.jsxs('div', {
                    className: fe.rbForm,
                    children: [
                      m.jsxs('p', {
                        className: fe.warn,
                        children: [
                          '※ 作り直して強い新人になります（開始Lv ',
                          Math.min(30, Math.floor(S.level / 2)),
                          '・ボーナス付き）。',
                        ],
                      }),
                      m.jsx('input', {
                        className: fe.input,
                        type: 'text',
                        maxLength: 16,
                        placeholder: S.name,
                        value: h,
                        onChange: (U) => v(U.target.value),
                      }),
                      m.jsxs('div', {
                        className: fe.jobRow,
                        children: [
                          m.jsx('select', {
                            className: fe.select,
                            value: g,
                            onChange: (U) => y(U.target.value),
                            children: Cp.map((U) =>
                              m.jsx('option', { value: U, children: Ft[U].name }, U)
                            ),
                          }),
                          m.jsx('select', {
                            className: fe.select,
                            value: _,
                            onChange: (U) => b(U.target.value),
                            children: ls.map((U) =>
                              m.jsx('option', { value: U, children: gt[U].name }, U)
                            ),
                          }),
                        ],
                      }),
                      m.jsxs('div', {
                        className: fe.jobRow,
                        children: [
                          m.jsx('button', {
                            type: 'button',
                            className: fe.danger,
                            onClick: () => {
                              (s((U) =>
                                JE(U, i, { raceId: g, classId: _, name: h.trim() || S.name })
                              ),
                                R(!1));
                            },
                            children: '転生を実行',
                          }),
                          m.jsx('button', {
                            type: 'button',
                            className: fe.actBtn,
                            onClick: () => R(!1),
                            children: 'やめる',
                          }),
                        ],
                      }),
                    ],
                  })
                : m.jsx('button', {
                    type: 'button',
                    className: fe.actBtn,
                    onClick: () => R(!0),
                    children: '転生する…',
                  })
              : m.jsxs('p', {
                  className: fe.warn,
                  children: [
                    'Lv',
                    Ai.REBIRTH_MIN_LEVEL,
                    ' 以上で転生できます（現在 Lv',
                    S.level,
                    '）。',
                  ],
                }),
          ],
        }),
        m.jsx('footer', {
          className: fe.foot,
          children: m.jsx('button', {
            type: 'button',
            className: fe.back,
            onClick: () => a('/guild'),
            children: 'もどる',
          }),
        }),
      ],
    });
    function Q(U) {
      return s((Z) => Dr(Z, i, U));
    }
  },
  a3 = () => m.jsx('div', { children: m.jsx('h1', { children: 'Not Found' }) }),
  i3 = '_layout_1u0ua_1',
  u3 = '_head_1u0ua_11',
  s3 = '_title_1u0ua_18',
  c3 = '_gold_1u0ua_24',
  o3 = '_tabs_1u0ua_29',
  r3 = '_tab_1u0ua_29',
  f3 = '_tabActive_1u0ua_46',
  d3 = '_list_1u0ua_51',
  m3 = '_row_1u0ua_59',
  h3 = '_info_1u0ua_70',
  p3 = '_name_1u0ua_76',
  y3 = '_note_1u0ua_81',
  g3 = '_action_1u0ua_86',
  _3 = '_empty_1u0ua_103',
  v3 = '_foot_1u0ua_108',
  b3 = '_back_1u0ua_112',
  Ge = {
    layout: i3,
    head: u3,
    title: s3,
    gold: c3,
    tabs: o3,
    tab: r3,
    tabActive: f3,
    list: d3,
    row: m3,
    info: h3,
    name: p3,
    note: y3,
    action: g3,
    empty: _3,
    foot: v3,
    back: b3,
  };
function S3(a) {
  return Math.max(0, Math.floor(a.towerState.record.deepestReached / 10));
}
const Hy = {
    item_slime_jelly: ['equip_slime_shield'],
    item_rat_tail: ['equip_rat_dagger'],
    item_bat_wing: ['equip_bat_cloak'],
    item_golem_core: ['equip_golem_blade'],
  },
  x3 = (a) => {
    const i = ht[a].bonuses,
      o = [];
    return (
      i.atk && o.push(`ATK+${i.atk}`),
      i.mat && o.push(`MAT+${i.mat}`),
      i.def && o.push(`DEF+${i.def}`),
      i.mdf && o.push(`MDF+${i.mdf}`),
      o.join(' ')
    );
  };
function E3(a) {
  const i = S3(a),
    o = new Set(a.shopStock.unlockedItemIds),
    s = Object.values(et)
      .filter((d) => d.buyPrice > 0)
      .map((d) => ({ id: d.id, name: d.name, price: d.buyPrice, kind: 'item' }));
  return [
    ...Object.values(ht)
      .filter((d) => d.tier <= i || o.has(d.id))
      .map((d) => ({ id: d.id, name: d.name, price: d.buyPrice, kind: 'equip', note: x3(d.id) })),
    ...s,
  ];
}
function T3(a) {
  return Hy[a] ?? [];
}
function N3(a) {
  var i, o;
  return (
    ((i = et[a]) == null ? void 0 : i.buyPrice) ??
    ((o = ht[a]) == null ? void 0 : o.buyPrice) ??
    null
  );
}
function _r(a) {
  return et[a] ? Wb(et[a]) : ht[a] ? Math.floor(ht[a].buyPrice / 2) : 0;
}
function k3(a, i) {
  const o = N3(i);
  if (o === null || o <= 0 || a.guild.gold < o) return a;
  const s = ht[i] ? d1(a, i) : Mr(a, i, 1);
  return { ...s, guild: { ...s.guild, gold: s.guild.gold - o } };
}
function Gy(a) {
  var o;
  return (
    Math.floor((((o = ht[a.masterId]) == null ? void 0 : o.buyPrice) ?? 0) / 2) + a.forgeLevel * 10
  );
}
function A3(a, i) {
  const o = a.guild.equipment.find((d) => d.id === i);
  if (!o) return a;
  const s = Gy(o),
    r = a.guild.equipment.filter((d) => d.id !== i);
  return { ...a, guild: { ...a.guild, equipment: r, gold: a.guild.gold + s } };
}
function C3(a, i, o = 1) {
  var g;
  if ((((g = a.guild.storage.find((y) => y.itemId === i)) == null ? void 0 : g.qty) ?? 0) < o)
    return a;
  const r = _r(i) * o,
    d = Rr(a, i, o),
    h = T3(i).filter((y) => !d.shopStock.unlockedItemIds.includes(y)),
    v = [...d.shopStock.unlockedItemIds, ...h];
  return {
    ...d,
    guild: { ...d.guild, gold: d.guild.gold + r },
    shopStock: { ...d.shopStock, unlockedItemIds: v },
  };
}
const j3 = () => {
    const a = sl(),
      { save: i, applyAndPersist: o } = Ll(),
      [s, r] = T.useState('buy');
    if (!i) return m.jsx(il, { to: '/title', replace: !0 });
    const d = i.guild.gold,
      h = E3(i),
      v = i.guild.storage.filter((b) => _r(b.itemId) > 0),
      g = i.guild.equipment,
      y = v.length === 0 && g.length === 0,
      _ = (b) => {
        var x, R;
        return (
          ((x = et[b]) == null ? void 0 : x.name) ?? ((R = ht[b]) == null ? void 0 : R.name) ?? b
        );
      };
    return m.jsxs('div', {
      className: Ge.layout,
      children: [
        m.jsxs('header', {
          className: Ge.head,
          children: [
            m.jsx('h1', { className: Ge.title, children: 'ショップ' }),
            m.jsxs('span', { className: Ge.gold, children: [d, ' G'] }),
          ],
        }),
        m.jsxs('div', {
          className: Ge.tabs,
          children: [
            m.jsx('button', {
              type: 'button',
              className: `${Ge.tab} ${s === 'buy' ? Ge.tabActive : ''}`,
              onClick: () => r('buy'),
              children: '買う',
            }),
            m.jsx('button', {
              type: 'button',
              className: `${Ge.tab} ${s === 'sell' ? Ge.tabActive : ''}`,
              onClick: () => r('sell'),
              children: '売る',
            }),
          ],
        }),
        m.jsx('div', {
          className: Ge.list,
          children:
            s === 'buy'
              ? h.map((b) =>
                  m.jsxs(
                    'div',
                    {
                      className: Ge.row,
                      children: [
                        m.jsxs('div', {
                          className: Ge.info,
                          children: [
                            m.jsx('span', { className: Ge.name, children: b.name }),
                            b.note ? m.jsx('span', { className: Ge.note, children: b.note }) : null,
                          ],
                        }),
                        m.jsxs('button', {
                          type: 'button',
                          className: Ge.action,
                          disabled: d < b.price,
                          onClick: () => void o((x) => k3(x, b.id)),
                          children: [b.price, ' G'],
                        }),
                      ],
                    },
                    b.id
                  )
                )
              : y
                ? m.jsx('p', { className: Ge.empty, children: '売れる物がありません。' })
                : m.jsxs(m.Fragment, {
                    children: [
                      g.map((b) =>
                        m.jsxs(
                          'div',
                          {
                            className: Ge.row,
                            children: [
                              m.jsxs('div', {
                                className: Ge.info,
                                children: [
                                  m.jsx('span', { className: Ge.name, children: rs(b) }),
                                  m.jsx('span', { className: Ge.note, children: '装備' }),
                                ],
                              }),
                              m.jsxs('button', {
                                type: 'button',
                                className: Ge.action,
                                onClick: () => void o((x) => A3(x, b.id)),
                                children: ['売却 ', Gy(b), ' G'],
                              }),
                            ],
                          },
                          b.id
                        )
                      ),
                      v.map((b) =>
                        m.jsxs(
                          'div',
                          {
                            className: Ge.row,
                            children: [
                              m.jsxs('div', {
                                className: Ge.info,
                                children: [
                                  m.jsx('span', { className: Ge.name, children: _(b.itemId) }),
                                  m.jsxs('span', {
                                    className: Ge.note,
                                    children: ['所持 ', b.qty],
                                  }),
                                ],
                              }),
                              m.jsxs('button', {
                                type: 'button',
                                className: Ge.action,
                                onClick: () => void o((x) => C3(x, b.itemId, 1)),
                                children: ['売却 ', _r(b.itemId), ' G'],
                              }),
                            ],
                          },
                          b.itemId
                        )
                      ),
                    ],
                  }),
        }),
        m.jsx('footer', {
          className: Ge.foot,
          children: m.jsx('button', {
            type: 'button',
            className: Ge.back,
            onClick: () => a('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  M3 = '_layout_1xkiw_1',
  R3 = '_head_1xkiw_12',
  w3 = '_title_1xkiw_17',
  O3 = '_subtitle_1xkiw_24',
  D3 = '_body_1xkiw_30',
  z3 = '_menu_1xkiw_34',
  B3 = '_loading_1xkiw_40',
  L3 = '_warn_1xkiw_45',
  U3 = '_danger_1xkiw_52',
  q3 = '_dialog_1xkiw_67',
  H3 = '_dialogTitle_1xkiw_77',
  G3 = '_field_1xkiw_82',
  Y3 = '_note_1xkiw_96',
  $3 = '_dialogActions_1xkiw_102',
  X3 = '_primary_1xkiw_107',
  V3 = '_sub_1xkiw_24',
  Q3 = '_foot_1xkiw_132',
  Ke = {
    layout: M3,
    head: R3,
    title: w3,
    subtitle: O3,
    body: D3,
    menu: z3,
    loading: B3,
    warn: L3,
    danger: U3,
    dialog: q3,
    dialogTitle: H3,
    field: G3,
    note: Y3,
    dialogActions: $3,
    primary: X3,
    sub: V3,
    foot: Q3,
  },
  Z3 = '_card_3vsn6_1',
  K3 = '_corrupted_3vsn6_14',
  I3 = '_corruptedText_3vsn6_19',
  J3 = '_corruptedNote_3vsn6_25',
  W3 = '_guildName_3vsn6_31',
  F3 = '_meta_3vsn6_36',
  fn = {
    card: Z3,
    corrupted: K3,
    corruptedText: I3,
    corruptedNote: J3,
    guildName: W3,
    meta: F3,
    continue: '_continue_3vsn6_56',
  },
  P3 = (a) => {
    if (!a) return '-';
    const i = new Date(a),
      o = (s) => String(s).padStart(2, '0');
    return `${i.getFullYear()}/${o(i.getMonth() + 1)}/${o(i.getDate())} ${o(i.getHours())}:${o(i.getMinutes())}`;
  },
  eT = ({ meta: a, onContinue: i }) =>
    a.corrupted
      ? m.jsxs('div', {
          className: `${fn.card} ${fn.corrupted}`,
          children: [
            m.jsx('div', { className: fn.corruptedText, children: 'セーブデータが破損しています' }),
            m.jsx('p', {
              className: fn.corruptedNote,
              children: '「最初から」で新しく始められます。',
            }),
          ],
        })
      : m.jsxs('div', {
          className: fn.card,
          children: [
            m.jsx('div', { className: fn.guildName, children: a.guildName }),
            m.jsxs('dl', {
              className: fn.meta,
              children: [
                m.jsxs('div', {
                  children: [
                    m.jsx('dt', { children: '最高到達階' }),
                    m.jsx('dd', {
                      children: a.deepestReached > 0 ? `${a.deepestReached}F` : '未踏破',
                    }),
                  ],
                }),
                m.jsxs('div', {
                  children: [
                    m.jsx('dt', { children: '団員' }),
                    m.jsxs('dd', { children: [a.memberCount, '人'] }),
                  ],
                }),
                m.jsxs('div', {
                  children: [
                    m.jsx('dt', { children: '最終セーブ' }),
                    m.jsx('dd', { children: P3(a.savedAt) }),
                  ],
                }),
              ],
            }),
            m.jsx('button', {
              type: 'button',
              className: fn.continue,
              onClick: i,
              children: 'つづきから',
            }),
          ],
        }),
  tT = () => {
    const a = sl(),
      { startNewGame: i, continueGame: o } = Ll(),
      [s, r] = T.useState(null),
      [d, h] = T.useState(!0),
      [v, g] = T.useState('menu'),
      [y, _] = T.useState(''),
      [b, x] = T.useState(!1);
    T.useEffect(() => {
      (async () => (r(await RS()), h(!1)))();
    }, []);
    const R = s !== null && !s.corrupted,
      S = T.useCallback(async () => {
        x(!0);
        const A = await o();
        (x(!1), A.ok && a('/town'));
      }, [o, a]),
      w = T.useCallback(() => {
        (_(''), g(R ? 'confirm' : 'guildName'));
      }, [R]),
      j = T.useCallback(async () => {
        const A = y.trim() || 'ななしのギルド';
        (x(!0), await i(A), x(!1), a('/town'));
      }, [y, i, a]);
    return m.jsxs('div', {
      className: Ke.layout,
      children: [
        m.jsxs('header', {
          className: Ke.head,
          children: [
            m.jsx('h1', { className: Ke.title, children: '世界樹ライク' }),
            m.jsx('p', { className: Ke.subtitle, children: '無限タワー探索 RPG' }),
          ],
        }),
        m.jsx('main', {
          className: Ke.body,
          children: d
            ? m.jsx('p', { className: Ke.loading, children: '読み込み中...' })
            : v === 'guildName'
              ? m.jsxs('div', {
                  className: Ke.dialog,
                  children: [
                    m.jsx('h2', { className: Ke.dialogTitle, children: '新しいギルド' }),
                    m.jsxs('label', {
                      className: Ke.field,
                      children: [
                        m.jsx('span', { children: 'ギルド名' }),
                        m.jsx('input', {
                          type: 'text',
                          value: y,
                          maxLength: 16,
                          placeholder: 'ななしのギルド',
                          onChange: (A) => _(A.target.value),
                          autoFocus: !0,
                        }),
                      ],
                    }),
                    m.jsx('p', {
                      className: Ke.note,
                      children:
                        '冒険者はまだいません。開始後、ギルドメニューで仲間を作成してください。',
                    }),
                    m.jsxs('div', {
                      className: Ke.dialogActions,
                      children: [
                        m.jsx('button', {
                          type: 'button',
                          className: Ke.primary,
                          disabled: b,
                          onClick: j,
                          children: 'はじめる',
                        }),
                        m.jsx('button', {
                          type: 'button',
                          className: Ke.sub,
                          disabled: b,
                          onClick: () => g('menu'),
                          children: 'もどる',
                        }),
                      ],
                    }),
                  ],
                })
              : v === 'confirm'
                ? m.jsxs('div', {
                    className: Ke.dialog,
                    children: [
                      m.jsx('h2', { className: Ke.dialogTitle, children: '最初から始めますか？' }),
                      m.jsxs('p', {
                        className: Ke.warn,
                        children: [
                          '現在のセーブデータ「',
                          s == null ? void 0 : s.guildName,
                          '」は上書きされ、元に戻せません。',
                        ],
                      }),
                      m.jsxs('div', {
                        className: Ke.dialogActions,
                        children: [
                          m.jsx('button', {
                            type: 'button',
                            className: Ke.danger,
                            disabled: b,
                            onClick: () => g('guildName'),
                            children: 'データを消して始める',
                          }),
                          m.jsx('button', {
                            type: 'button',
                            className: Ke.sub,
                            disabled: b,
                            onClick: () => g('menu'),
                            children: 'もどる',
                          }),
                        ],
                      }),
                    ],
                  })
                : m.jsxs('div', {
                    className: Ke.menu,
                    children: [
                      s !== null && m.jsx(eT, { meta: s, onContinue: () => void S() }),
                      m.jsx('button', {
                        type: 'button',
                        className: R ? Ke.sub : Ke.primary,
                        onClick: w,
                        children: '最初から',
                      }),
                    ],
                  }),
        }),
        m.jsxs('footer', { className: Ke.foot, children: ['v', '0.1.24'] }),
      ],
    });
  },
  lT = '_layout_uxqv8_1',
  nT = '_head_uxqv8_12',
  aT = '_guildName_uxqv8_16',
  iT = '_stats_uxqv8_21',
  uT = '_hint_uxqv8_40',
  sT = '_menu_uxqv8_50',
  cT = '_foot_uxqv8_57',
  oT = '_exit_uxqv8_61',
  rT = '_warpOverlay_uxqv8_72',
  fT = '_warpPanel_uxqv8_83',
  dT = '_warpTitle_uxqv8_94',
  mT = '_warpBtn_uxqv8_99',
  hT = '_warpClose_uxqv8_110',
  Lt = {
    layout: lT,
    head: nT,
    guildName: aT,
    stats: iT,
    hint: uT,
    menu: sT,
    foot: cT,
    exit: oT,
    warpOverlay: rT,
    warpPanel: fT,
    warpTitle: dT,
    warpBtn: mT,
    warpClose: hT,
  },
  pT = '_button_1tp4a_1',
  yT = '_primary_1tp4a_26',
  gT = '_label_1tp4a_32',
  _T = '_description_1tp4a_37',
  ns = { button: pT, primary: yT, label: gT, description: _T },
  ba = ({ label: a, description: i, variant: o = 'default', disabled: s = !1, onClick: r }) =>
    m.jsxs('button', {
      type: 'button',
      className: `${ns.button} ${o === 'primary' ? ns.primary : ''}`,
      disabled: s,
      onClick: r,
      children: [
        m.jsx('span', { className: ns.label, children: a }),
        i ? m.jsx('span', { className: ns.description, children: i }) : null,
      ],
    }),
  vT = () => {
    const a = sl(),
      { save: i, exitToTitle: o, applyAndPersist: s } = Ll(),
      [r, d] = T.useState(!1);
    if (!i) return m.jsx(il, { to: '/title', replace: !0 });
    const { guild: h, towerState: v, diveState: g } = i,
      y = h.members.length > 0,
      _ = () => {
        (o(), a('/title'));
      },
      b = async () => {
        (g || (await s((S) => pp(S, 1))), a('/dungeon'));
      },
      x = v.warp.unlockedCheckpoints,
      R = async (S) => {
        (d(!1), await s((w) => pp(w, S)), a('/dungeon'));
      };
    return m.jsxs('div', {
      className: Lt.layout,
      children: [
        m.jsxs('header', {
          className: Lt.head,
          children: [
            m.jsx('div', { className: Lt.guildName, children: h.name }),
            m.jsxs('dl', {
              className: Lt.stats,
              children: [
                m.jsxs('div', {
                  children: [
                    m.jsx('dt', { children: '所持金' }),
                    m.jsxs('dd', { children: [h.gold, ' G'] }),
                  ],
                }),
                m.jsxs('div', {
                  children: [
                    m.jsx('dt', { children: '最高到達' }),
                    m.jsx('dd', {
                      children: v.record.deepestReached > 0 ? `${v.record.deepestReached}F` : '-',
                    }),
                  ],
                }),
                m.jsxs('div', {
                  children: [
                    m.jsx('dt', { children: '団員' }),
                    m.jsxs('dd', { children: [h.members.length, '人'] }),
                  ],
                }),
              ],
            }),
          ],
        }),
        !y &&
          m.jsx('p', {
            className: Lt.hint,
            children:
              'まずは「ギルド管理」で冒険者を作成してください。団員がいないとダイブできません。',
          }),
        m.jsxs('main', {
          className: Lt.menu,
          children: [
            m.jsx(ba, {
              label: g ? '潜行を再開' : 'ダイブ開始',
              description: y
                ? g
                  ? `${g.depth}F から再開`
                  : '第1階からタワーへ潜る'
                : '団員が必要です',
              variant: 'primary',
              disabled: !y,
              onClick: () => void b(),
            }),
            m.jsx(ba, {
              label: 'ワープ',
              description:
                x.length === 0
                  ? 'ボス撃破で解放'
                  : g
                    ? '潜行中は使えません'
                    : `解放済み: ${x.map((S) => `${S}F`).join('・')}`,
              disabled: !y || x.length === 0 || !!g,
              onClick: () => d(!0),
            }),
            m.jsx(ba, {
              label: 'ギルド管理',
              description: '編成・キャラ作成',
              onClick: () => a('/guild'),
            }),
            m.jsx(ba, {
              label: 'ショップ',
              description: '装備・アイテム売買',
              onClick: () => a('/shop'),
            }),
            m.jsx(ba, {
              label: '鍛冶屋',
              description: '装備の強化・リサイクル',
              onClick: () => a('/forge'),
            }),
            m.jsx(ba, {
              label: '図鑑 / 記録',
              description: '到達記録・モンスター図鑑',
              onClick: () => a('/codex'),
            }),
          ],
        }),
        m.jsx('footer', {
          className: Lt.foot,
          children: m.jsx('button', {
            type: 'button',
            className: Lt.exit,
            onClick: _,
            children: 'タイトルへ戻る',
          }),
        }),
        r
          ? m.jsx('div', {
              className: Lt.warpOverlay,
              onClick: () => d(!1),
              children: m.jsxs('div', {
                className: Lt.warpPanel,
                onClick: (S) => S.stopPropagation(),
                children: [
                  m.jsx('div', { className: Lt.warpTitle, children: 'ワープ先を選択' }),
                  x.map((S) =>
                    m.jsxs(
                      'button',
                      {
                        type: 'button',
                        className: Lt.warpBtn,
                        onClick: () => void R(S),
                        children: ['第 ', S, ' 階へ'],
                      },
                      S
                    )
                  ),
                  m.jsx('button', {
                    type: 'button',
                    className: Lt.warpClose,
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
function bT() {
  return m.jsxs(Sv, {
    children: [
      m.jsx(Jt, { path: '/', element: m.jsx(il, { to: '/title', replace: !0 }) }),
      m.jsx(Jt, { path: '/title', element: m.jsx(tT, {}) }),
      m.jsx(Jt, { path: '/town', element: m.jsx(vT, {}) }),
      m.jsx(Jt, { path: '/guild', element: m.jsx(sE, {}) }),
      m.jsx(Jt, { path: '/guild/char/:id', element: m.jsx(n3, {}) }),
      m.jsx(Jt, { path: '/shop', element: m.jsx(j3, {}) }),
      m.jsx(Jt, { path: '/forge', element: m.jsx(B2, {}) }),
      m.jsx(Jt, { path: '/codex', element: m.jsx(rx, {}) }),
      m.jsx(Jt, { path: '/dungeon', element: m.jsx(p2, {}) }),
      m.jsx(Jt, { path: '/battle', element: m.jsx(zS, {}) }),
      m.jsx(Jt, { path: '*', element: m.jsx(a3, {}) }),
    ],
  });
}
const ST = {
    races: Ft,
    classes: gt,
    titles: Ta,
    skills: Cr,
    unionSkills: xa,
    summons: ja,
    gatherTypes: Rn,
    recipes: Ma,
    enemies: Bl,
    items: et,
    equipment: ht,
  },
  xT = /^[a-z]+_[a-z0-9_]+$/;
function dl(a, i, o) {
  for (const s of i)
    xT.test(s) || o.push(`[${a}] ID 命名規約違反: "${s}"（期待: <domain>_<name>）`);
}
function ur(a, i, o, s) {
  const r = new Set(i.skills.map((d) => d.skillId));
  for (const d of i.skills) {
    o.has(d.skillId) || s.push(`[${a}] 未定義スキルを参照: "${d.skillId}"`);
    for (const h of d.requires ?? [])
      r.has(h.skillId) ||
        s.push(`[${a}] スキル "${d.skillId}" の前提 "${h.skillId}" が同ツリーに存在しない`);
  }
}
function ET() {
  var j;
  const a = [],
    {
      races: i,
      classes: o,
      titles: s,
      skills: r,
      unionSkills: d,
      summons: h,
      gatherTypes: v,
      recipes: g,
      enemies: y,
      items: _,
      equipment: b,
    } = ST;
  (dl('races', Object.keys(i), a),
    dl('classes', Object.keys(o), a),
    dl('titles', Object.keys(s), a),
    dl('skills', Object.keys(r), a),
    dl('enemies', Object.keys(y), a),
    dl('items', Object.keys(_), a),
    dl('equipment', Object.keys(b), a));
  const x = (A, k) => {
    for (const [Q, P] of Object.entries(k))
      Q !== P.id && a.push(`[${A}] キー "${Q}" と id "${P.id}" が不一致`);
  };
  (x('races', i),
    x('classes', o),
    x('titles', s),
    x('skills', r),
    x('enemies', y),
    x('items', _),
    x('equipment', b));
  const R = new Set(Object.keys(r)),
    S = new Set(Object.keys(o)),
    w = new Set(Object.keys(s));
  for (const A of Object.values(i)) {
    (S.has(A.defaultClassId) ||
      a.push(`[races] "${A.id}" の defaultClassId "${A.defaultClassId}" が未定義`),
      ur(`races/${A.id}`, A.raceSkillTree, R, a));
    for (const k of A.raceSkillTree.skills) {
      const Q = d[k.skillId];
      Q &&
        Q.raceId !== A.id &&
        a.push(`[races/${A.id}] ユニオンスキル "${k.skillId}" の raceId "${Q.raceId}" が不一致`);
    }
  }
  for (const A of Object.values(d)) {
    const k = (j = i[A.raceId]) == null ? void 0 : j.raceSkillTree;
    (!k || !k.skills.some((Q) => Q.skillId === A.id)) &&
      a.push(`[unionSkills] "${A.id}" が種族 "${A.raceId}" のスキルツリーに無い`);
  }
  dl('unionSkills', Object.keys(d), a);
  for (const [A, k] of Object.entries(d))
    (A !== k.id && a.push(`[unionSkills] キー "${A}" と id "${k.id}" が不一致`),
      k.id in r || a.push(`[unionSkills] "${k.id}" が skills に未定義`),
      k.requiredParticipants < 1 &&
        a.push(`[unionSkills] "${k.id}" の requiredParticipants が 1 未満`),
      (k.gaugeCostPerParticipant < 0 || k.gaugeCostPerParticipant > 100) &&
        a.push(`[unionSkills] "${k.id}" の gaugeCostPerParticipant が 0..100 外`),
      k.id in dn &&
        a.push(
          `[unionSkills] "${k.id}" が BATTLE_SKILLS にも存在（通常スキルとして撃ててしまう）`
        ));
  dl('summons', Object.keys(h), a);
  for (const [A, k] of Object.entries(h))
    A !== k.id && a.push(`[summons] キー "${A}" と id "${k.id}" が不一致`);
  for (const A of Object.values(dn))
    for (const k of A.effects)
      k.kind === 'summon' &&
        !(k.summonKind in h) &&
        a.push(`[battleSkills] "${A.id}" の召喚 "${k.summonKind}" が未定義`);
  for (const [A, k] of Object.entries(v)) {
    (A !== k.type && a.push(`[gatherTypes] キー "${A}" と type "${k.type}" が不一致`),
      R.has(k.requiredSkillId) ||
        a.push(`[gatherTypes] "${k.type}" の requiredSkillId "${k.requiredSkillId}" が未定義`));
    for (const Q of k.drops) {
      if (!(Q.itemId in _))
        a.push(`[gatherTypes] "${k.type}" のドロップ "${Q.itemId}" が未定義アイテム`);
      else {
        const P = _[Q.itemId].category === 'food';
        (k.food &&
          !P &&
          a.push(`[gatherTypes] 食材系統 "${k.type}" のドロップ "${Q.itemId}" が food でない`),
          !k.food &&
            P &&
            a.push(`[gatherTypes] 素材系統 "${k.type}" のドロップ "${Q.itemId}" が food`));
      }
      Q.weight <= 0 && a.push(`[gatherTypes] "${k.type}" のドロップ重みが正でない`);
    }
  }
  dl('recipes', Object.keys(g), a);
  for (const [A, k] of Object.entries(g)) {
    A !== k.id && a.push(`[recipes] キー "${A}" と id "${k.id}" が不一致`);
    for (const Q of k.ingredients)
      Q.itemId in _
        ? _[Q.itemId].category !== 'food' &&
          a.push(`[recipes] "${k.id}" の材料 "${Q.itemId}" が food カテゴリでない`)
        : a.push(`[recipes] "${k.id}" の材料 "${Q.itemId}" が未定義`);
    k.result.itemId in _
      ? _[k.result.itemId].category !== 'food' &&
        a.push(`[recipes] "${k.id}" の結果 "${k.result.itemId}" が food カテゴリでない`)
      : a.push(`[recipes] "${k.id}" の結果 "${k.result.itemId}" が未定義`);
  }
  for (const A of Object.values(o)) {
    ur(`classes/${A.id}`, A.skillTree, R, a);
    for (const k of A.titleOptions) {
      if (!w.has(k)) {
        a.push(`[classes] "${A.id}" の称号 "${k}" が未定義`);
        continue;
      }
      s[k].parentClassId !== A.id &&
        a.push(`[classes] 称号 "${k}" の parentClassId が "${A.id}" と不一致`);
    }
  }
  for (const A of Object.values(s))
    (S.has(A.parentClassId) ||
      a.push(`[titles] "${A.id}" の parentClassId "${A.parentClassId}" が未定義`),
      ur(`titles/${A.id}`, A.skillTree, R, a));
  for (const A of Object.values(b))
    (A.slot === 'weapon' &&
      !A.weaponType &&
      a.push(`[equipment] "${A.id}" は weapon だが weaponType が未設定`),
      A.slot === 'armor' &&
        !A.armorType &&
        a.push(`[equipment] "${A.id}" は armor だが armorType が未設定`),
      (A.buyPrice < 0 || A.tier < 0) && a.push(`[equipment] "${A.id}" の buyPrice/tier が負`));
  for (const A of Object.values(_))
    (A.buyPrice < 0 && a.push(`[items] "${A.id}" の buyPrice が負`),
      A.category === 'consumable' &&
        !A.useContext &&
        !A.effects &&
        a.push(`[items] 消費アイテム "${A.id}" に useContext も effects も無い（使用不能）`));
  for (const A of Object.values(y))
    for (const k of A.drops ?? [])
      (k.itemId in _ || a.push(`[enemies] "${A.id}" のドロップ "${k.itemId}" が未定義アイテム`),
        (k.rate < 0 || k.rate > 1) &&
          a.push(`[enemies] "${A.id}" のドロップ "${k.itemId}" の rate が 0..1 外`));
  for (const [A, k] of Object.entries(Hy)) {
    A in _ || a.push(`[SELL_UNLOCKS] キー素材 "${A}" が未定義`);
    for (const Q of k) Q in b || a.push(`[SELL_UNLOCKS] 解放先装備 "${Q}" が未定義`);
  }
  return { ok: a.length === 0, errors: a };
}
const jp = ET();
jp.ok || console.error('マスターデータ検証エラー:', jp.errors);
const Yy = document.getElementById('root');
if (!Yy) throw new Error('Failed to find #root element');
E0.createRoot(Yy).render(
  m.jsx(Vv, { basename: '/sekaiju-like-game', children: m.jsx(DS, { children: m.jsx(bT, {}) }) })
);
