var r0 = Object.defineProperty;
var f0 = (a, i, o) =>
  i in a ? r0(a, i, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (a[i] = o);
var qo = (a, i, o) => f0(a, typeof i != 'symbol' ? i + '' : i, o);
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
var Ho = { exports: {} },
  xi = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Xh;
function d0() {
  if (Xh) return xi;
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
  return ((xi.Fragment = i), (xi.jsx = o), (xi.jsxs = o), xi);
}
var Vh;
function m0() {
  return (Vh || ((Vh = 1), (Ho.exports = d0())), Ho.exports);
}
var m = m0(),
  Go = { exports: {} },
  Ei = {},
  Yo = { exports: {} },
  $o = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Qh;
function h0() {
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
              var H = 2 * (ge + 1) - 1,
                W = L[H],
                le = H + 1,
                pe = L[le];
              if (0 > r(W, te))
                le < Ee && 0 > r(pe, W)
                  ? ((L[ge] = pe), (L[le] = te), (ge = le))
                  : ((L[ge] = W), (L[H] = te), (ge = H));
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
          E = 3,
          R = !1,
          S = !1,
          w = !1,
          j = !1,
          A = typeof setTimeout == 'function' ? setTimeout : null,
          k = typeof clearTimeout == 'function' ? clearTimeout : null,
          V = typeof setImmediate < 'u' ? setImmediate : null;
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
            if (o(g) !== null) ((S = !0), Q || ((Q = !0), ce()));
            else {
              var K = o(y);
              K !== null && he(ee, K.startTime - L);
            }
        }
        var Q = !1,
          Y = -1,
          U = 5,
          Z = -1;
        function ae() {
          return j ? !0 : !(a.unstable_now() - Z < U);
        }
        function ue() {
          if (((j = !1), Q)) {
            var L = a.unstable_now();
            Z = L;
            var K = !0;
            try {
              e: {
                ((S = !1), w && ((w = !1), k(Y), (Y = -1)), (R = !0));
                var te = E;
                try {
                  t: {
                    for (P(L), b = o(g); b !== null && !(b.expirationTime > L && ae()); ) {
                      var ge = b.callback;
                      if (typeof ge == 'function') {
                        ((b.callback = null), (E = b.priorityLevel));
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
                  ((b = null), (E = te), (R = !1));
                }
                K = void 0;
              }
            } finally {
              K ? ce() : (Q = !1);
            }
          }
        }
        var ce;
        if (typeof V == 'function')
          ce = function () {
            V(ue);
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
          Y = A(function () {
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
            return E;
          }),
          (a.unstable_next = function (L) {
            switch (E) {
              case 1:
              case 2:
              case 3:
                var K = 3;
                break;
              default:
                K = E;
            }
            var te = E;
            E = K;
            try {
              return L();
            } finally {
              E = te;
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
            var te = E;
            E = L;
            try {
              return K();
            } finally {
              E = te;
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
                  o(g) === null && L === o(y) && (w ? (k(Y), (Y = -1)) : (w = !0), he(ee, te - ge)))
                : ((L.sortIndex = Ee), i(g, L), S || R || ((S = !0), Q || ((Q = !0), ce()))),
              L
            );
          }),
          (a.unstable_shouldYield = ae),
          (a.unstable_wrapCallback = function (L) {
            var K = E;
            return function () {
              var te = E;
              E = K;
              try {
                return L.apply(this, arguments);
              } finally {
                E = te;
              }
            };
          }));
      })($o)),
    $o
  );
}
var Zh;
function p0() {
  return (Zh || ((Zh = 1), (Yo.exports = h0())), Yo.exports);
}
var Xo = { exports: {} },
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
function y0() {
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
    E = Symbol.iterator;
  function R(C) {
    return C === null || typeof C != 'object'
      ? null
      : ((C = (E && C[E]) || C['@@iterator']), typeof C == 'function' ? C : null);
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
  function A(C, H, W) {
    ((this.props = C), (this.context = H), (this.refs = j), (this.updater = W || S));
  }
  ((A.prototype.isReactComponent = {}),
    (A.prototype.setState = function (C, H) {
      if (typeof C != 'object' && typeof C != 'function' && C != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, C, H, 'setState');
    }),
    (A.prototype.forceUpdate = function (C) {
      this.updater.enqueueForceUpdate(this, C, 'forceUpdate');
    }));
  function k() {}
  k.prototype = A.prototype;
  function V(C, H, W) {
    ((this.props = C), (this.context = H), (this.refs = j), (this.updater = W || S));
  }
  var P = (V.prototype = new k());
  ((P.constructor = V), w(P, A.prototype), (P.isPureReactComponent = !0));
  var ee = Array.isArray;
  function Q() {}
  var Y = { H: null, A: null, T: null, S: null },
    U = Object.prototype.hasOwnProperty;
  function Z(C, H, W) {
    var le = W.ref;
    return { $$typeof: a, type: C, key: H, ref: le !== void 0 ? le : null, props: W };
  }
  function ae(C, H) {
    return Z(C.type, H, C.props);
  }
  function ue(C) {
    return typeof C == 'object' && C !== null && C.$$typeof === a;
  }
  function ce(C) {
    var H = { '=': '=0', ':': '=2' };
    return (
      '$' +
      C.replace(/[=:]/g, function (W) {
        return H[W];
      })
    );
  }
  var I = /\/+/g;
  function J(C, H) {
    return typeof C == 'object' && C !== null && C.key != null ? ce('' + C.key) : H.toString(36);
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
            ? C.then(Q, Q)
            : ((C.status = 'pending'),
              C.then(
                function (H) {
                  C.status === 'pending' && ((C.status = 'fulfilled'), (C.value = H));
                },
                function (H) {
                  C.status === 'pending' && ((C.status = 'rejected'), (C.reason = H));
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
  function L(C, H, W, le, pe) {
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
              return ((Ce = C._init), L(Ce(C._payload), H, W, le, pe));
          }
      }
    if (Ce)
      return (
        (pe = pe(C)),
        (Ce = le === '' ? '.' + J(C, 0) : le),
        ee(pe)
          ? ((W = ''),
            Ce != null && (W = Ce.replace(I, '$&/') + '/'),
            L(pe, H, W, '', function (G) {
              return G;
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
            H.push(pe)),
        1
      );
    Ce = 0;
    var ut = le === '' ? '.' : le + ':';
    if (ee(C))
      for (var Ve = 0; Ve < C.length; Ve++)
        ((le = C[Ve]), (be = ut + J(le, Ve)), (Ce += L(le, H, W, be, pe)));
    else if (((Ve = R(C)), typeof Ve == 'function'))
      for (C = Ve.call(C), Ve = 0; !(le = C.next()).done; )
        ((le = le.value), (be = ut + J(le, Ve++)), (Ce += L(le, H, W, be, pe)));
    else if (be === 'object') {
      if (typeof C.then == 'function') return L(he(C), H, W, le, pe);
      throw (
        (H = String(C)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (H === '[object Object]' ? 'object with keys {' + Object.keys(C).join(', ') + '}' : H) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return Ce;
  }
  function K(C, H, W) {
    if (C == null) return C;
    var le = [],
      pe = 0;
    return (
      L(C, le, '', '', function (be) {
        return H.call(W, be, pe++);
      }),
      le
    );
  }
  function te(C) {
    if (C._status === -1) {
      var H = C._result;
      ((H = H()),
        H.then(
          function (W) {
            (C._status === 0 || C._status === -1) && ((C._status = 1), (C._result = W));
          },
          function (W) {
            (C._status === 0 || C._status === -1) && ((C._status = 2), (C._result = W));
          }
        ),
        C._status === -1 && ((C._status = 0), (C._result = H)));
    }
    if (C._status === 1) return C._result.default;
    throw C._result;
  }
  var ge =
      typeof reportError == 'function'
        ? reportError
        : function (C) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var H = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof C == 'object' && C !== null && typeof C.message == 'string'
                    ? String(C.message)
                    : String(C),
                error: C,
              });
              if (!window.dispatchEvent(H)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', C);
              return;
            }
            console.error(C);
          },
    Ee = {
      map: K,
      forEach: function (C, H, W) {
        K(
          C,
          function () {
            H.apply(this, arguments);
          },
          W
        );
      },
      count: function (C) {
        var H = 0;
        return (
          K(C, function () {
            H++;
          }),
          H
        );
      },
      toArray: function (C) {
        return (
          K(C, function (H) {
            return H;
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
    (ye.PureComponent = V),
    (ye.StrictMode = s),
    (ye.Suspense = g),
    (ye.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Y),
    (ye.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (C) {
        return Y.H.useMemoCache(C);
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
    (ye.cloneElement = function (C, H, W) {
      if (C == null) throw Error('The argument must be a React element, but you passed ' + C + '.');
      var le = w({}, C.props),
        pe = C.key;
      if (H != null)
        for (be in (H.key !== void 0 && (pe = '' + H.key), H))
          !U.call(H, be) ||
            be === 'key' ||
            be === '__self' ||
            be === '__source' ||
            (be === 'ref' && H.ref === void 0) ||
            (le[be] = H[be]);
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
    (ye.createElement = function (C, H, W) {
      var le,
        pe = {},
        be = null;
      if (H != null)
        for (le in (H.key !== void 0 && (be = '' + H.key), H))
          U.call(H, le) && le !== 'key' && le !== '__self' && le !== '__source' && (pe[le] = H[le]);
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
    (ye.memo = function (C, H) {
      return { $$typeof: y, type: C, compare: H === void 0 ? null : H };
    }),
    (ye.startTransition = function (C) {
      var H = Y.T,
        W = {};
      Y.T = W;
      try {
        var le = C(),
          pe = Y.S;
        (pe !== null && pe(W, le),
          typeof le == 'object' && le !== null && typeof le.then == 'function' && le.then(Q, ge));
      } catch (be) {
        ge(be);
      } finally {
        (H !== null && W.types !== null && (H.types = W.types), (Y.T = H));
      }
    }),
    (ye.unstable_useCacheRefresh = function () {
      return Y.H.useCacheRefresh();
    }),
    (ye.use = function (C) {
      return Y.H.use(C);
    }),
    (ye.useActionState = function (C, H, W) {
      return Y.H.useActionState(C, H, W);
    }),
    (ye.useCallback = function (C, H) {
      return Y.H.useCallback(C, H);
    }),
    (ye.useContext = function (C) {
      return Y.H.useContext(C);
    }),
    (ye.useDebugValue = function () {}),
    (ye.useDeferredValue = function (C, H) {
      return Y.H.useDeferredValue(C, H);
    }),
    (ye.useEffect = function (C, H) {
      return Y.H.useEffect(C, H);
    }),
    (ye.useEffectEvent = function (C) {
      return Y.H.useEffectEvent(C);
    }),
    (ye.useId = function () {
      return Y.H.useId();
    }),
    (ye.useImperativeHandle = function (C, H, W) {
      return Y.H.useImperativeHandle(C, H, W);
    }),
    (ye.useInsertionEffect = function (C, H) {
      return Y.H.useInsertionEffect(C, H);
    }),
    (ye.useLayoutEffect = function (C, H) {
      return Y.H.useLayoutEffect(C, H);
    }),
    (ye.useMemo = function (C, H) {
      return Y.H.useMemo(C, H);
    }),
    (ye.useOptimistic = function (C, H) {
      return Y.H.useOptimistic(C, H);
    }),
    (ye.useReducer = function (C, H, W) {
      return Y.H.useReducer(C, H, W);
    }),
    (ye.useRef = function (C) {
      return Y.H.useRef(C);
    }),
    (ye.useState = function (C) {
      return Y.H.useState(C);
    }),
    (ye.useSyncExternalStore = function (C, H, W) {
      return Y.H.useSyncExternalStore(C, H, W);
    }),
    (ye.useTransition = function () {
      return Y.H.useTransition();
    }),
    (ye.version = '19.2.5'),
    ye
  );
}
var Ih;
function vr() {
  return (Ih || ((Ih = 1), (Xo.exports = y0())), Xo.exports);
}
var Vo = { exports: {} },
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
function g0() {
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
          E = typeof y.integrity == 'string' ? y.integrity : void 0,
          R = typeof y.fetchPriority == 'string' ? y.fetchPriority : void 0;
        _ === 'style'
          ? s.d.S(g, typeof y.precedence == 'string' ? y.precedence : void 0, {
              crossOrigin: b,
              integrity: E,
              fetchPriority: R,
            })
          : _ === 'script' &&
            s.d.X(g, {
              crossOrigin: b,
              integrity: E,
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
function _0() {
  if (Wh) return Vo.exports;
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
  return (a(), (Vo.exports = g0()), Vo.exports);
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
function v0() {
  if (Fh) return Ei;
  Fh = 1;
  var a = p0(),
    i = vr(),
    o = _0();
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
    E = Symbol.for('react.element'),
    R = Symbol.for('react.transitional.element'),
    S = Symbol.for('react.portal'),
    w = Symbol.for('react.fragment'),
    j = Symbol.for('react.strict_mode'),
    A = Symbol.for('react.profiler'),
    k = Symbol.for('react.consumer'),
    V = Symbol.for('react.context'),
    P = Symbol.for('react.forward_ref'),
    ee = Symbol.for('react.suspense'),
    Q = Symbol.for('react.suspense_list'),
    Y = Symbol.for('react.memo'),
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
      case Q:
        return 'SuspenseList';
      case Z:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case S:
          return 'Portal';
        case V:
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
        case Y:
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
  function H(e) {
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
    (H(le), W(le, e));
  }
  function Ve() {
    (H(le), H(pe), H(be));
  }
  function G(e) {
    e.memoizedState !== null && W(Ce, e);
    var t = le.current,
      l = hh(t, e.type);
    t !== l && (W(pe, e), W(le, l));
  }
  function oe(e) {
    (pe.current === e && (H(le), H(pe)), Ce.current === e && (H(Ce), (_i._currentValue = te)));
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
  function xs(e, t) {
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
        var x = f.split(`
`),
          D = p.split(`
`);
        for (u = n = 0; n < x.length && !x[n].includes('DetermineComponentFrameRoot'); ) n++;
        for (; u < D.length && !D[u].includes('DetermineComponentFrameRoot'); ) u++;
        if (n === x.length || u === D.length)
          for (n = x.length - 1, u = D.length - 1; 1 <= n && 0 <= u && x[n] !== D[u]; ) u--;
        for (; 1 <= n && 0 <= u; n--, u--)
          if (x[n] !== D[u]) {
            if (n !== 1 || u !== 1)
              do
                if ((n--, u--, 0 > u || x[n] !== D[u])) {
                  var q =
                    `
` + x[n].replace(' at new ', ' at ');
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
  function Gy(e, t) {
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
        return xs(e.type, !1);
      case 11:
        return xs(e.type.render, !1);
      case 1:
        return xs(e.type, !0);
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
      do ((t += Gy(e, l)), (l = e), (e = e.return));
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
  var Es = Object.prototype.hasOwnProperty,
    Ts = a.unstable_scheduleCallback,
    Ns = a.unstable_cancelCallback,
    Yy = a.unstable_shouldYield,
    $y = a.unstable_requestPaint,
    At = a.unstable_now,
    Xy = a.unstable_getCurrentPriorityLevel,
    Xr = a.unstable_ImmediatePriority,
    Vr = a.unstable_UserBlockingPriority,
    Bi = a.unstable_NormalPriority,
    Vy = a.unstable_LowPriority,
    Qr = a.unstable_IdlePriority,
    Qy = a.log,
    Zy = a.unstable_setDisableYieldValue,
    Ma = null,
    Ct = null;
  function Bl(e) {
    if ((typeof Qy == 'function' && Zy(e), Ct && typeof Ct.setStrictMode == 'function'))
      try {
        Ct.setStrictMode(Ma, e);
      } catch {}
  }
  var jt = Math.clz32 ? Math.clz32 : Jy,
    Ky = Math.log,
    Iy = Math.LN2;
  function Jy(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Ky(e) / Iy) | 0)) | 0);
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
  function Ra(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Wy(e, t) {
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
  function ks(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function wa(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function Fy(e, t, l, n, u, c) {
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
      x = e.expirationTimes,
      D = e.hiddenUpdates;
    for (l = f & ~l; 0 < l; ) {
      var q = 31 - jt(l),
        X = 1 << q;
      ((p[q] = 0), (x[q] = -1));
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
    return ((l = (l & 42) !== 0 ? 1 : As(l)), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l);
  }
  function As(e) {
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
  function Cs(e) {
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
  var Ll = Math.random().toString(36).slice(2),
    ot = '__reactFiber$' + Ll,
    bt = '__reactProps$' + Ll,
    Dn = '__reactContainer$' + Ll,
    js = '__reactEvents$' + Ll,
    Py = '__reactListeners$' + Ll,
    eg = '__reactHandles$' + Ll,
    Pr = '__reactResources$' + Ll,
    Oa = '__reactMarker$' + Ll;
  function Ms(e) {
    (delete e[ot], delete e[bt], delete e[js], delete e[Py], delete e[eg]);
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
  function Da(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(s(33));
  }
  function Ln(e) {
    var t = e[Pr];
    return (t || (t = e[Pr] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function st(e) {
    e[Oa] = !0;
  }
  var ef = new Set(),
    tf = {};
  function hn(e, t) {
    (Un(e, t), Un(e + 'Capture', t));
  }
  function Un(e, t) {
    for (tf[e] = t, e = 0; e < t.length; e++) ef.add(t[e]);
  }
  var tg = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    lf = {},
    nf = {};
  function lg(e) {
    return Es.call(nf, e)
      ? !0
      : Es.call(lf, e)
        ? !1
        : tg.test(e)
          ? (nf[e] = !0)
          : ((lf[e] = !0), !1);
  }
  function Gi(e, t, l) {
    if (lg(t))
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
  function ml(e, t, l, n) {
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
  function Ut(e) {
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
  function ng(e, t, l) {
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
  function Rs(e) {
    if (!e._valueTracker) {
      var t = af(e) ? 'checked' : 'value';
      e._valueTracker = ng(e, t, '' + e[t]);
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
  var ag = /[\n"\\]/g;
  function qt(e) {
    return e.replace(ag, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function ws(e, t, l, n, u, c, f, p) {
    ((e.name = ''),
      f != null && typeof f != 'function' && typeof f != 'symbol' && typeof f != 'boolean'
        ? (e.type = f)
        : e.removeAttribute('type'),
      t != null
        ? f === 'number'
          ? ((t === 0 && e.value === '') || e.value != t) && (e.value = '' + Ut(t))
          : e.value !== '' + Ut(t) && (e.value = '' + Ut(t))
        : (f !== 'submit' && f !== 'reset') || e.removeAttribute('value'),
      t != null
        ? Os(e, f, Ut(t))
        : l != null
          ? Os(e, f, Ut(l))
          : n != null && e.removeAttribute('value'),
      u == null && c != null && (e.defaultChecked = !!c),
      u != null && (e.checked = u && typeof u != 'function' && typeof u != 'symbol'),
      p != null && typeof p != 'function' && typeof p != 'symbol' && typeof p != 'boolean'
        ? (e.name = '' + Ut(p))
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
        Rs(e);
        return;
      }
      ((l = l != null ? '' + Ut(l) : ''),
        (t = t != null ? '' + Ut(t) : l),
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
      Rs(e));
  }
  function Os(e, t, l) {
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
      for (l = '' + Ut(l), t = null, u = 0; u < e.length; u++) {
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
    if (t != null && ((t = '' + Ut(t)), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? '' + Ut(l) : '';
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
    ((l = Ut(t)),
      (e.defaultValue = l),
      (n = e.textContent),
      n === l && n !== '' && n !== null && (e.value = n),
      Rs(e));
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
  var ig = new Set(
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
        : typeof l != 'number' || l === 0 || ig.has(t)
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
  function Ds(e) {
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
  var ug = new Map([
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
    sg =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Xi(e) {
    return sg.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function hl() {}
  var zs = null;
  function Bs(e) {
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
            (ws(
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
              l = l.querySelectorAll('input[name="' + qt('' + t) + '"][type="radio"]'), t = 0;
              t < l.length;
              t++
            ) {
              var n = l[t];
              if (n !== e && n.form === e.form) {
                var u = n[bt] || null;
                if (!u) throw Error(s(90));
                ws(
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
  var Ls = !1;
  function mf(e, t, l) {
    if (Ls) return e(t, l);
    Ls = !0;
    try {
      var n = e(t);
      return n;
    } finally {
      if (
        ((Ls = !1),
        (Gn !== null || Yn !== null) &&
          (Ru(), Gn && ((t = Gn), (e = Yn), (Yn = Gn = null), df(t), e)))
      )
        for (t = 0; t < e.length; t++) df(e[t]);
    }
  }
  function za(e, t) {
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
  var pl = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Us = !1;
  if (pl)
    try {
      var Ba = {};
      (Object.defineProperty(Ba, 'passive', {
        get: function () {
          Us = !0;
        },
      }),
        window.addEventListener('test', Ba, Ba),
        window.removeEventListener('test', Ba, Ba));
    } catch {
      Us = !1;
    }
  var Ul = null,
    qs = null,
    Vi = null;
  function hf() {
    if (Vi) return Vi;
    var e,
      t = qs,
      l = t.length,
      n,
      u = 'value' in Ul ? Ul.value : Ul.textContent,
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
    La = b({}, pn, { view: 0, detail: 0 }),
    cg = St(La),
    Hs,
    Gs,
    Ua,
    Ii = b({}, La, {
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
      getModifierState: $s,
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
                ? ((Hs = e.screenX - Ua.screenX), (Gs = e.screenY - Ua.screenY))
                : (Gs = Hs = 0),
              (Ua = e)),
            Hs);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : Gs;
      },
    }),
    yf = St(Ii),
    og = b({}, Ii, { dataTransfer: 0 }),
    rg = St(og),
    fg = b({}, La, { relatedTarget: 0 }),
    Ys = St(fg),
    dg = b({}, pn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    mg = St(dg),
    hg = b({}, pn, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    pg = St(hg),
    yg = b({}, pn, { data: 0 }),
    gf = St(yg),
    gg = {
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
    _g = {
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
    vg = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function bg(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = vg[e]) ? !!t[e] : !1;
  }
  function $s() {
    return bg;
  }
  var Sg = b({}, La, {
      key: function (e) {
        if (e.key) {
          var t = gg[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = Qi(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? _g[e.keyCode] || 'Unidentified'
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
      getModifierState: $s,
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
    xg = St(Sg),
    Eg = b({}, Ii, {
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
    _f = St(Eg),
    Tg = b({}, La, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: $s,
    }),
    Ng = St(Tg),
    kg = b({}, pn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Ag = St(kg),
    Cg = b({}, Ii, {
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
    jg = St(Cg),
    Mg = b({}, pn, { newState: 0, oldState: 0 }),
    Rg = St(Mg),
    wg = [9, 13, 27, 32],
    Xs = pl && 'CompositionEvent' in window,
    qa = null;
  pl && 'documentMode' in document && (qa = document.documentMode);
  var Og = pl && 'TextEvent' in window && !qa,
    vf = pl && (!Xs || (qa && 8 < qa && 11 >= qa)),
    bf = ' ',
    Sf = !1;
  function xf(e, t) {
    switch (e) {
      case 'keyup':
        return wg.indexOf(t.keyCode) !== -1;
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
  function Dg(e, t) {
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
  function zg(e, t) {
    if ($n)
      return e === 'compositionend' || (!Xs && xf(e, t))
        ? ((e = hf()), (Vi = qs = Ul = null), ($n = !1), e)
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
  var Bg = {
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
    return t === 'input' ? !!Bg[e.type] : t === 'textarea';
  }
  function Nf(e, t, l, n) {
    (Gn ? (Yn ? Yn.push(n) : (Yn = [n])) : (Gn = n),
      (t = Uu(t, 'onChange')),
      0 < t.length &&
        ((l = new Ki('onChange', 'change', null, l, n)), e.push({ event: l, listeners: t })));
  }
  var Ha = null,
    Ga = null;
  function Lg(e) {
    sh(e, 0);
  }
  function Ji(e) {
    var t = Da(e);
    if (uf(t)) return e;
  }
  function kf(e, t) {
    if (e === 'change') return t;
  }
  var Af = !1;
  if (pl) {
    var Vs;
    if (pl) {
      var Qs = 'oninput' in document;
      if (!Qs) {
        var Cf = document.createElement('div');
        (Cf.setAttribute('oninput', 'return;'), (Qs = typeof Cf.oninput == 'function'));
      }
      Vs = Qs;
    } else Vs = !1;
    Af = Vs && (!document.documentMode || 9 < document.documentMode);
  }
  function jf() {
    Ha && (Ha.detachEvent('onpropertychange', Mf), (Ga = Ha = null));
  }
  function Mf(e) {
    if (e.propertyName === 'value' && Ji(Ga)) {
      var t = [];
      (Nf(t, Ga, e, Bs(e)), mf(Lg, t));
    }
  }
  function Ug(e, t, l) {
    e === 'focusin'
      ? (jf(), (Ha = t), (Ga = l), Ha.attachEvent('onpropertychange', Mf))
      : e === 'focusout' && jf();
  }
  function qg(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return Ji(Ga);
  }
  function Hg(e, t) {
    if (e === 'click') return Ji(t);
  }
  function Gg(e, t) {
    if (e === 'input' || e === 'change') return Ji(t);
  }
  function Yg(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Mt = typeof Object.is == 'function' ? Object.is : Yg;
  function Ya(e, t) {
    if (Mt(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var l = Object.keys(e),
      n = Object.keys(t);
    if (l.length !== n.length) return !1;
    for (n = 0; n < l.length; n++) {
      var u = l[n];
      if (!Es.call(t, u) || !Mt(e[u], t[u])) return !1;
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
  function Zs(e) {
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
  var $g = pl && 'documentMode' in document && 11 >= document.documentMode,
    Xn = null,
    Ks = null,
    $a = null,
    Is = !1;
  function zf(e, t, l) {
    var n = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Is ||
      Xn == null ||
      Xn !== $i(n) ||
      ((n = Xn),
      'selectionStart' in n && Zs(n)
        ? (n = { start: n.selectionStart, end: n.selectionEnd })
        : ((n = ((n.ownerDocument && n.ownerDocument.defaultView) || window).getSelection()),
          (n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset,
          })),
      ($a && Ya($a, n)) ||
        (($a = n),
        (n = Uu(Ks, 'onSelect')),
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
    Js = {},
    Bf = {};
  pl &&
    ((Bf = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Vn.animationend.animation,
      delete Vn.animationiteration.animation,
      delete Vn.animationstart.animation),
    'TransitionEvent' in window || delete Vn.transitionend.transition);
  function gn(e) {
    if (Js[e]) return Js[e];
    if (!Vn[e]) return e;
    var t = Vn[e],
      l;
    for (l in t) if (t.hasOwnProperty(l) && l in Bf) return (Js[e] = t[l]);
    return e;
  }
  var Lf = gn('animationend'),
    Uf = gn('animationiteration'),
    qf = gn('animationstart'),
    Xg = gn('transitionrun'),
    Vg = gn('transitionstart'),
    Qg = gn('transitioncancel'),
    Hf = gn('transitionend'),
    Gf = new Map(),
    Ws =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  Ws.push('scrollEnd');
  function Ft(e, t) {
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
    Ht = [],
    Qn = 0,
    Fs = 0;
  function Fi() {
    for (var e = Qn, t = (Fs = Qn = 0); t < e; ) {
      var l = Ht[t];
      Ht[t++] = null;
      var n = Ht[t];
      Ht[t++] = null;
      var u = Ht[t];
      Ht[t++] = null;
      var c = Ht[t];
      if (((Ht[t++] = null), n !== null && u !== null)) {
        var f = n.pending;
        (f === null ? (u.next = u) : ((u.next = f.next), (f.next = u)), (n.pending = u));
      }
      c !== 0 && Yf(l, u, c);
    }
  }
  function Pi(e, t, l, n) {
    ((Ht[Qn++] = e),
      (Ht[Qn++] = t),
      (Ht[Qn++] = l),
      (Ht[Qn++] = n),
      (Fs |= n),
      (e.lanes |= n),
      (e = e.alternate),
      e !== null && (e.lanes |= n));
  }
  function Ps(e, t, l, n) {
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
    if (50 < fi) throw ((fi = 0), (co = null), Error(s(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var Zn = {};
  function Zg(e, t, l, n) {
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
    return new Zg(e, t, l, n);
  }
  function ec(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function yl(e, t) {
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
    if (((n = e), typeof e == 'function')) ec(e) && (f = 1);
    else if (typeof e == 'string')
      f = F_(e, l, le.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
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
        case Q:
          return ((e = Rt(19, l, t, u)), (e.elementType = Q), (e.lanes = c), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case V:
                f = 10;
                break e;
              case k:
                f = 9;
                break e;
              case P:
                f = 11;
                break e;
              case Y:
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
  function tc(e, t, l) {
    return ((e = Rt(6, e, null, t)), (e.lanes = l), e);
  }
  function Xf(e) {
    var t = Rt(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function lc(e, t, l) {
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
  function Gt(e, t) {
    if (typeof e == 'object' && e !== null) {
      var l = Vf.get(e);
      return l !== void 0 ? l : ((t = { value: e, source: t, stack: $r(t) }), Vf.set(e, t), t);
    }
    return { value: e, source: t, stack: $r(t) };
  }
  var Kn = [],
    In = 0,
    lu = null,
    Xa = 0,
    Yt = [],
    $t = 0,
    ql = null,
    ul = 1,
    sl = '';
  function gl(e, t) {
    ((Kn[In++] = Xa), (Kn[In++] = lu), (lu = e), (Xa = t));
  }
  function Qf(e, t, l) {
    ((Yt[$t++] = ul), (Yt[$t++] = sl), (Yt[$t++] = ql), (ql = e));
    var n = ul;
    e = sl;
    var u = 32 - jt(n) - 1;
    ((n &= ~(1 << u)), (l += 1));
    var c = 32 - jt(t) + u;
    if (30 < c) {
      var f = u - (u % 5);
      ((c = (n & ((1 << f) - 1)).toString(32)),
        (n >>= f),
        (u -= f),
        (ul = (1 << (32 - jt(t) + u)) | (l << u) | n),
        (sl = c + e));
    } else ((ul = (1 << c) | (l << u) | n), (sl = e));
  }
  function nc(e) {
    e.return !== null && (gl(e, 1), Qf(e, 1, 0));
  }
  function ac(e) {
    for (; e === lu; ) ((lu = Kn[--In]), (Kn[In] = null), (Xa = Kn[--In]), (Kn[In] = null));
    for (; e === ql; )
      ((ql = Yt[--$t]),
        (Yt[$t] = null),
        (sl = Yt[--$t]),
        (Yt[$t] = null),
        (ul = Yt[--$t]),
        (Yt[$t] = null));
  }
  function Zf(e, t) {
    ((Yt[$t++] = ul), (Yt[$t++] = sl), (Yt[$t++] = ql), (ul = t.id), (sl = t.overflow), (ql = e));
  }
  var rt = null,
    $e = null,
    Ae = !1,
    Hl = null,
    Xt = !1,
    ic = Error(s(519));
  function Gl(e) {
    var t = Error(
      s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (Va(Gt(t, e)), ic);
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
        for (l = 0; l < mi.length; l++) xe(mi[l], t);
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
          n.onClick != null && (t.onclick = hl),
          (t = !0))
        : (t = !1),
      t || Gl(e, !0));
  }
  function If(e) {
    for (rt = e.return; rt; )
      switch (rt.tag) {
        case 5:
        case 31:
        case 13:
          Xt = !1;
          return;
        case 27:
        case 3:
          Xt = !0;
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
          ((l = e.type), (l = !(l !== 'form' && l !== 'button') || To(e.type, e.memoizedProps))),
        (l = !l)),
      l && $e && Gl(e),
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
        ? ((t = $e), tn(e.type) ? ((e = jo), (jo = null), ($e = e)) : ($e = t))
        : ($e = rt ? Qt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function bn() {
    (($e = rt = null), (Ae = !1));
  }
  function uc() {
    var e = Hl;
    return (e !== null && (Nt === null ? (Nt = e) : Nt.push.apply(Nt, e), (Hl = null)), e);
  }
  function Va(e) {
    Hl === null ? (Hl = [e]) : Hl.push(e);
  }
  var sc = C(null),
    Sn = null,
    _l = null;
  function Yl(e, t, l) {
    (W(sc, t._currentValue), (t._currentValue = l));
  }
  function vl(e) {
    ((e._currentValue = sc.current), H(sc));
  }
  function cc(e, t, l) {
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
  function oc(e, t, l, n) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var c = u.dependencies;
      if (c !== null) {
        var f = u.child;
        c = c.firstContext;
        e: for (; c !== null; ) {
          var p = c;
          c = u;
          for (var x = 0; x < t.length; x++)
            if (p.context === t[x]) {
              ((c.lanes |= l),
                (p = c.alternate),
                p !== null && (p.lanes |= l),
                cc(c.return, l, e),
                n || (f = null));
              break e;
            }
          c = p.next;
        }
      } else if (u.tag === 18) {
        if (((f = u.return), f === null)) throw Error(s(341));
        ((f.lanes |= l), (c = f.alternate), c !== null && (c.lanes |= l), cc(f, l, e), (f = null));
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
          (e !== null ? e.push(_i) : (e = [_i]));
      }
      u = u.return;
    }
    (e !== null && oc(t, e, l, n), (t.flags |= 262144));
  }
  function nu(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Mt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function xn(e) {
    ((Sn = e), (_l = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function ft(e) {
    return Jf(Sn, e);
  }
  function au(e, t) {
    return (Sn === null && xn(e), Jf(e, t));
  }
  function Jf(e, t) {
    var l = t._currentValue;
    if (((t = { context: t, memoizedValue: l, next: null }), _l === null)) {
      if (e === null) throw Error(s(308));
      ((_l = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else _l = _l.next = t;
    return l;
  }
  var Kg =
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
    Ig = a.unstable_scheduleCallback,
    Jg = a.unstable_NormalPriority,
    tt = {
      $$typeof: V,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function rc() {
    return { controller: new Kg(), data: new Map(), refCount: 0 };
  }
  function Qa(e) {
    (e.refCount--,
      e.refCount === 0 &&
        Ig(Jg, function () {
          e.controller.abort();
        }));
  }
  var Za = null,
    fc = 0,
    Fn = 0,
    Pn = null;
  function Wg(e, t) {
    if (Za === null) {
      var l = (Za = []);
      ((fc = 0),
        (Fn = po()),
        (Pn = {
          status: 'pending',
          value: void 0,
          then: function (n) {
            l.push(n);
          },
        }));
    }
    return (fc++, t.then(Wf, Wf), t);
  }
  function Wf() {
    if (--fc === 0 && Za !== null) {
      Pn !== null && (Pn.status = 'fulfilled');
      var e = Za;
      ((Za = null), (Fn = 0), (Pn = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Fg(e, t) {
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
      typeof t == 'object' && t !== null && typeof t.then == 'function' && Wg(e, t),
      Ff !== null && Ff(e, t));
  };
  var En = C(null);
  function dc() {
    var e = En.current;
    return e !== null ? e : Ye.pooledCache;
  }
  function iu(e, t) {
    t === null ? W(En, En.current) : W(En, t.pool);
  }
  function Pf() {
    var e = dc();
    return e === null ? null : { parent: tt._currentValue, pool: e };
  }
  var ea = Error(s(460)),
    mc = Error(s(474)),
    uu = Error(s(542)),
    su = { then: function () {} };
  function ed(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function td(e, t, l) {
    switch (
      ((l = e[l]), l === void 0 ? e.push(t) : l !== t && (t.then(hl, hl), (t = l)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), nd(e), e);
      default:
        if (typeof t.status == 'string') t.then(hl, hl);
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
    Ka = 0;
  function cu(e) {
    var t = Ka;
    return ((Ka += 1), ta === null && (ta = []), td(ta, e, t));
  }
  function Ia(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function ou(e, t) {
    throw t.$$typeof === E
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
    function u(M, T) {
      return ((M = yl(M, T)), (M.index = 0), (M.sibling = null), M);
    }
    function c(M, T, O) {
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
    function p(M, T, O, $) {
      return T === null || T.tag !== 6
        ? ((T = tc(O, M.mode, $)), (T.return = M), T)
        : ((T = u(T, O)), (T.return = M), T);
    }
    function x(M, T, O, $) {
      var se = O.type;
      return se === w
        ? q(M, T, O.props.children, $, O.key)
        : T !== null &&
            (T.elementType === se ||
              (typeof se == 'object' && se !== null && se.$$typeof === U && Tn(se) === T.type))
          ? ((T = u(T, O.props)), Ia(T, O), (T.return = M), T)
          : ((T = tu(O.type, O.key, O.props, null, M.mode, $)), Ia(T, O), (T.return = M), T);
    }
    function D(M, T, O, $) {
      return T === null ||
        T.tag !== 4 ||
        T.stateNode.containerInfo !== O.containerInfo ||
        T.stateNode.implementation !== O.implementation
        ? ((T = lc(O, M.mode, $)), (T.return = M), T)
        : ((T = u(T, O.children || [])), (T.return = M), T);
    }
    function q(M, T, O, $, se) {
      return T === null || T.tag !== 7
        ? ((T = vn(O, M.mode, $, se)), (T.return = M), T)
        : ((T = u(T, O)), (T.return = M), T);
    }
    function X(M, T, O) {
      if ((typeof T == 'string' && T !== '') || typeof T == 'number' || typeof T == 'bigint')
        return ((T = tc('' + T, M.mode, O)), (T.return = M), T);
      if (typeof T == 'object' && T !== null) {
        switch (T.$$typeof) {
          case R:
            return ((O = tu(T.type, T.key, T.props, null, M.mode, O)), Ia(O, T), (O.return = M), O);
          case S:
            return ((T = lc(T, M.mode, O)), (T.return = M), T);
          case U:
            return ((T = Tn(T)), X(M, T, O));
        }
        if (he(T) || ce(T)) return ((T = vn(T, M.mode, O, null)), (T.return = M), T);
        if (typeof T.then == 'function') return X(M, cu(T), O);
        if (T.$$typeof === V) return X(M, au(M, T), O);
        ou(M, T);
      }
      return null;
    }
    function z(M, T, O, $) {
      var se = T !== null ? T.key : null;
      if ((typeof O == 'string' && O !== '') || typeof O == 'number' || typeof O == 'bigint')
        return se !== null ? null : p(M, T, '' + O, $);
      if (typeof O == 'object' && O !== null) {
        switch (O.$$typeof) {
          case R:
            return O.key === se ? x(M, T, O, $) : null;
          case S:
            return O.key === se ? D(M, T, O, $) : null;
          case U:
            return ((O = Tn(O)), z(M, T, O, $));
        }
        if (he(O) || ce(O)) return se !== null ? null : q(M, T, O, $, null);
        if (typeof O.then == 'function') return z(M, T, cu(O), $);
        if (O.$$typeof === V) return z(M, T, au(M, O), $);
        ou(M, O);
      }
      return null;
    }
    function B(M, T, O, $, se) {
      if ((typeof $ == 'string' && $ !== '') || typeof $ == 'number' || typeof $ == 'bigint')
        return ((M = M.get(O) || null), p(T, M, '' + $, se));
      if (typeof $ == 'object' && $ !== null) {
        switch ($.$$typeof) {
          case R:
            return ((M = M.get($.key === null ? O : $.key) || null), x(T, M, $, se));
          case S:
            return ((M = M.get($.key === null ? O : $.key) || null), D(T, M, $, se));
          case U:
            return (($ = Tn($)), B(M, T, O, $, se));
        }
        if (he($) || ce($)) return ((M = M.get(O) || null), q(T, M, $, se, null));
        if (typeof $.then == 'function') return B(M, T, O, cu($), se);
        if ($.$$typeof === V) return B(M, T, O, au(T, $), se);
        ou(T, $);
      }
      return null;
    }
    function ne(M, T, O, $) {
      for (
        var se = null, je = null, ie = T, ve = (T = 0), ke = null;
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
          (T = c(Me, T, ve)),
          je === null ? (se = Me) : (je.sibling = Me),
          (je = Me),
          (ie = ke));
      }
      if (ve === O.length) return (l(M, ie), Ae && gl(M, ve), se);
      if (ie === null) {
        for (; ve < O.length; ve++)
          ((ie = X(M, O[ve], $)),
            ie !== null &&
              ((T = c(ie, T, ve)), je === null ? (se = ie) : (je.sibling = ie), (je = ie)));
        return (Ae && gl(M, ve), se);
      }
      for (ie = n(ie); ve < O.length; ve++)
        ((ke = B(ie, M, ve, O[ve], $)),
          ke !== null &&
            (e && ke.alternate !== null && ie.delete(ke.key === null ? ve : ke.key),
            (T = c(ke, T, ve)),
            je === null ? (se = ke) : (je.sibling = ke),
            (je = ke)));
      return (
        e &&
          ie.forEach(function (sn) {
            return t(M, sn);
          }),
        Ae && gl(M, ve),
        se
      );
    }
    function re(M, T, O, $) {
      if (O == null) throw Error(s(151));
      for (
        var se = null, je = null, ie = T, ve = (T = 0), ke = null, Me = O.next();
        ie !== null && !Me.done;
        ve++, Me = O.next()
      ) {
        ie.index > ve ? ((ke = ie), (ie = null)) : (ke = ie.sibling);
        var sn = z(M, ie, Me.value, $);
        if (sn === null) {
          ie === null && (ie = ke);
          break;
        }
        (e && ie && sn.alternate === null && t(M, ie),
          (T = c(sn, T, ve)),
          je === null ? (se = sn) : (je.sibling = sn),
          (je = sn),
          (ie = ke));
      }
      if (Me.done) return (l(M, ie), Ae && gl(M, ve), se);
      if (ie === null) {
        for (; !Me.done; ve++, Me = O.next())
          ((Me = X(M, Me.value, $)),
            Me !== null &&
              ((T = c(Me, T, ve)), je === null ? (se = Me) : (je.sibling = Me), (je = Me)));
        return (Ae && gl(M, ve), se);
      }
      for (ie = n(ie); !Me.done; ve++, Me = O.next())
        ((Me = B(ie, M, ve, Me.value, $)),
          Me !== null &&
            (e && Me.alternate !== null && ie.delete(Me.key === null ? ve : Me.key),
            (T = c(Me, T, ve)),
            je === null ? (se = Me) : (je.sibling = Me),
            (je = Me)));
      return (
        e &&
          ie.forEach(function (o0) {
            return t(M, o0);
          }),
        Ae && gl(M, ve),
        se
      );
    }
    function He(M, T, O, $) {
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
              for (var se = O.key; T !== null; ) {
                if (T.key === se) {
                  if (((se = O.type), se === w)) {
                    if (T.tag === 7) {
                      (l(M, T.sibling), ($ = u(T, O.props.children)), ($.return = M), (M = $));
                      break e;
                    }
                  } else if (
                    T.elementType === se ||
                    (typeof se == 'object' && se !== null && se.$$typeof === U && Tn(se) === T.type)
                  ) {
                    (l(M, T.sibling), ($ = u(T, O.props)), Ia($, O), ($.return = M), (M = $));
                    break e;
                  }
                  l(M, T);
                  break;
                } else t(M, T);
                T = T.sibling;
              }
              O.type === w
                ? (($ = vn(O.props.children, M.mode, $, O.key)), ($.return = M), (M = $))
                : (($ = tu(O.type, O.key, O.props, null, M.mode, $)),
                  Ia($, O),
                  ($.return = M),
                  (M = $));
            }
            return f(M);
          case S:
            e: {
              for (se = O.key; T !== null; ) {
                if (T.key === se)
                  if (
                    T.tag === 4 &&
                    T.stateNode.containerInfo === O.containerInfo &&
                    T.stateNode.implementation === O.implementation
                  ) {
                    (l(M, T.sibling), ($ = u(T, O.children || [])), ($.return = M), (M = $));
                    break e;
                  } else {
                    l(M, T);
                    break;
                  }
                else t(M, T);
                T = T.sibling;
              }
              (($ = lc(O, M.mode, $)), ($.return = M), (M = $));
            }
            return f(M);
          case U:
            return ((O = Tn(O)), He(M, T, O, $));
        }
        if (he(O)) return ne(M, T, O, $);
        if (ce(O)) {
          if (((se = ce(O)), typeof se != 'function')) throw Error(s(150));
          return ((O = se.call(O)), re(M, T, O, $));
        }
        if (typeof O.then == 'function') return He(M, T, cu(O), $);
        if (O.$$typeof === V) return He(M, T, au(M, O), $);
        ou(M, O);
      }
      return (typeof O == 'string' && O !== '') || typeof O == 'number' || typeof O == 'bigint'
        ? ((O = '' + O),
          T !== null && T.tag === 6
            ? (l(M, T.sibling), ($ = u(T, O)), ($.return = M), (M = $))
            : (l(M, T), ($ = tc(O, M.mode, $)), ($.return = M), (M = $)),
          f(M))
        : l(M, T);
    }
    return function (M, T, O, $) {
      try {
        Ka = 0;
        var se = He(M, T, O, $);
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
    $l = !1;
  function hc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function pc(e, t) {
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
  function Xl(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Vl(e, t, l) {
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
  function Ja(e, t, l) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (l & 4194048) !== 0))) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (l |= n), (t.lanes = l), Ir(e, l));
    }
  }
  function yc(e, t) {
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
  var gc = !1;
  function Wa() {
    if (gc) {
      var e = Pn;
      if (e !== null) throw e;
    }
  }
  function Fa(e, t, l, n) {
    gc = !1;
    var u = e.updateQueue;
    $l = !1;
    var c = u.firstBaseUpdate,
      f = u.lastBaseUpdate,
      p = u.shared.pending;
    if (p !== null) {
      u.shared.pending = null;
      var x = p,
        D = x.next;
      ((x.next = null), f === null ? (c = D) : (f.next = D), (f = x));
      var q = e.alternate;
      q !== null &&
        ((q = q.updateQueue),
        (p = q.lastBaseUpdate),
        p !== f && (p === null ? (q.firstBaseUpdate = D) : (p.next = D), (q.lastBaseUpdate = x)));
    }
    if (c !== null) {
      var X = u.baseState;
      ((f = 0), (q = D = x = null), (p = c));
      do {
        var z = p.lane & -536870913,
          B = z !== p.lane;
        if (B ? (Ne & z) === z : (n & z) === z) {
          (z !== 0 && z === Fn && (gc = !0),
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
                $l = !0;
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
            q === null ? ((D = q = B), (x = X)) : (q = q.next = B),
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
      (q === null && (x = X),
        (u.baseState = x),
        (u.firstBaseUpdate = D),
        (u.lastBaseUpdate = q),
        c === null && (u.shared.lanes = 0),
        (Jl |= f),
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
    ((e = Cl), W(ru, e), W(la, t), (Cl = e | t.baseLanes));
  }
  function _c() {
    (W(ru, Cl), W(la, la.current));
  }
  function vc() {
    ((Cl = ru.current), H(la), H(ru));
  }
  var wt = C(null),
    Vt = null;
  function Ql(e) {
    var t = e.alternate;
    (W(Fe, Fe.current & 1),
      W(wt, e),
      Vt === null && (t === null || la.current !== null || t.memoizedState !== null) && (Vt = e));
  }
  function bc(e) {
    (W(Fe, Fe.current), W(wt, e), Vt === null && (Vt = e));
  }
  function od(e) {
    e.tag === 22 ? (W(Fe, Fe.current), W(wt, e), Vt === null && (Vt = e)) : Zl();
  }
  function Zl() {
    (W(Fe, Fe.current), W(wt, wt.current));
  }
  function Ot(e) {
    (H(wt), Vt === e && (Vt = null), H(Fe));
  }
  var Fe = C(0);
  function fu(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && ((l = l.dehydrated), l === null || Ao(l) || Co(l))) return t;
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
  var bl = 0,
    _e = null,
    Ue = null,
    lt = null,
    du = !1,
    na = !1,
    An = !1,
    mu = 0,
    Pa = 0,
    aa = null,
    Pg = 0;
  function Ie() {
    throw Error(s(321));
  }
  function Sc(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++) if (!Mt(e[l], t[l])) return !1;
    return !0;
  }
  function xc(e, t, l, n, u, c) {
    return (
      (bl = c),
      (_e = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (L.H = e === null || e.memoizedState === null ? Qd : Lc),
      (An = !1),
      (c = l(n, u)),
      (An = !1),
      na && (c = fd(t, l, n, u)),
      rd(e),
      c
    );
  }
  function rd(e) {
    L.H = li;
    var t = Ue !== null && Ue.next !== null;
    if (((bl = 0), (lt = Ue = _e = null), (du = !1), (Pa = 0), (aa = null), t)) throw Error(s(300));
    e === null || nt || ((e = e.dependencies), e !== null && nu(e) && (nt = !0));
  }
  function fd(e, t, l, n) {
    _e = e;
    var u = 0;
    do {
      if ((na && (aa = null), (Pa = 0), (na = !1), 25 <= u)) throw Error(s(301));
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
  function e_() {
    var e = L.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? ei(t) : t),
      (e = e.useState()[0]),
      (Ue !== null ? Ue.memoizedState : null) !== e && (_e.flags |= 1024),
      t
    );
  }
  function Ec() {
    var e = mu !== 0;
    return ((mu = 0), e);
  }
  function Tc(e, t, l) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l));
  }
  function Nc(e) {
    if (du) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      du = !1;
    }
    ((bl = 0), (lt = Ue = _e = null), (na = !1), (Pa = mu = 0), (aa = null));
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
  function ei(e) {
    var t = Pa;
    return (
      (Pa += 1),
      aa === null && (aa = []),
      (e = td(aa, e, t)),
      (t = _e),
      (lt === null ? t.memoizedState : lt.next) === null &&
        ((t = t.alternate), (L.H = t === null || t.memoizedState === null ? Qd : Lc)),
      e
    );
  }
  function pu(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return ei(e);
      if (e.$$typeof === V) return ft(e);
    }
    throw Error(s(438, String(e)));
  }
  function kc(e) {
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
  function Sl(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function yu(e) {
    var t = Pe();
    return Ac(t, Ue, e);
  }
  function Ac(e, t, l) {
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
        x = null,
        D = t,
        q = !1;
      do {
        var X = D.lane & -536870913;
        if (X !== D.lane ? (Ne & X) === X : (bl & X) === X) {
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
              X === Fn && (q = !0));
          else if ((bl & z) === z) {
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
              x === null ? ((p = x = X), (f = c)) : (x = x.next = X),
              (_e.lanes |= z),
              (Jl |= z));
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
            x === null ? ((p = x = z), (f = c)) : (x = x.next = z),
            (_e.lanes |= X),
            (Jl |= X));
        D = D.next;
      } while (D !== null && D !== t);
      if (
        (x === null ? (f = c) : (x.next = p),
        !Mt(c, e.memoizedState) && ((nt = !0), q && ((l = Pn), l !== null)))
      )
        throw l;
      ((e.memoizedState = c), (e.baseState = f), (e.baseQueue = x), (n.lastRenderedState = c));
    }
    return (u === null && (n.lanes = 0), [e.memoizedState, n.dispatch]);
  }
  function Cc(e) {
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
      Rc(pd.bind(null, n, u, e), [e]),
      u.getSnapshot !== t || f || (lt !== null && lt.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        ia(9, { destroy: void 0 }, hd.bind(null, n, u, l, t), null),
        Ye === null)
      )
        throw Error(s(349));
      c || (bl & 127) !== 0 || md(n, t, l);
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
  function jc(e) {
    var t = _t();
    if (typeof e == 'function') {
      var l = e;
      if (((e = l()), An)) {
        Bl(!0);
        try {
          l();
        } finally {
          Bl(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Sl,
        lastRenderedState: e,
      }),
      t
    );
  }
  function _d(e, t, l, n) {
    return ((e.baseState = l), Ac(e, Ue, typeof n == 'function' ? n : Sl));
  }
  function t_(e, t, l, n, u) {
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
          x = L.S;
        (x !== null && x(f, p), bd(e, t, p));
      } catch (D) {
        Mc(e, t, D);
      } finally {
        (c !== null && f.types !== null && (c.types = f.types), (L.T = c));
      }
    } else
      try {
        ((c = l(u, n)), bd(e, t, c));
      } catch (D) {
        Mc(e, t, D);
      }
  }
  function bd(e, t, l) {
    l !== null && typeof l == 'object' && typeof l.then == 'function'
      ? l.then(
          function (n) {
            Sd(e, t, n);
          },
          function (n) {
            return Mc(e, t, n);
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
  function Mc(e, t, l) {
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
                for (var u = $e, c = Xt; u.nodeType !== 8; ) {
                  if (!c) {
                    u = null;
                    break t;
                  }
                  if (((u = Qt(u.nextSibling)), u === null)) {
                    u = null;
                    break t;
                  }
                }
                ((c = u.data), (u = c === 'F!' || c === 'F' ? u : null));
              }
              if (u) {
                (($e = Qt(u.nextSibling)), (n = u.data === 'F!'));
                break e;
              }
            }
            Gl(n);
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
      (n = jc(!1)),
      (c = Bc.bind(null, _e, !1, n.queue)),
      (n = _t()),
      (u = { state: t, dispatch: null, action: e, pending: null }),
      (n.queue = u),
      (l = t_.bind(null, _e, u, c, l)),
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
      ((t = Ac(e, t, Ed)[0]),
      (e = yu(Sl)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var n = ei(t);
      } catch (f) {
        throw f === ea ? uu : f;
      }
    else n = t;
    t = Pe();
    var u = t.queue,
      c = u.dispatch;
    return (
      l !== t.memoizedState &&
        ((_e.flags |= 2048), ia(9, { destroy: void 0 }, l_.bind(null, u, l), null)),
      [n, c, e]
    );
  }
  function l_(e, t) {
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
    Ue !== null && n !== null && Sc(n, Ue.memoizedState.deps)
      ? (u.memoizedState = ia(t, c, l, n))
      : ((_e.flags |= e), (u.memoizedState = ia(1 | t, c, l, n)));
  }
  function jd(e, t) {
    gu(8390656, 8, e, t);
  }
  function Rc(e, t) {
    _u(2048, 8, e, t);
  }
  function n_(e) {
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
      n_({ ref: t, nextImpl: e }),
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
  function wc() {}
  function zd(e, t) {
    var l = Pe();
    t = t === void 0 ? null : t;
    var n = l.memoizedState;
    return t !== null && Sc(t, n[1]) ? n[0] : ((l.memoizedState = [e, t]), e);
  }
  function Bd(e, t) {
    var l = Pe();
    t = t === void 0 ? null : t;
    var n = l.memoizedState;
    if (t !== null && Sc(t, n[1])) return n[0];
    if (((n = e()), An)) {
      Bl(!0);
      try {
        e();
      } finally {
        Bl(!1);
      }
    }
    return ((l.memoizedState = [n, t]), n);
  }
  function Oc(e, t, l) {
    return l === void 0 || ((bl & 1073741824) !== 0 && (Ne & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = l), (e = Lm()), (_e.lanes |= e), (Jl |= e), l);
  }
  function Ld(e, t, l, n) {
    return Mt(l, t)
      ? l
      : la.current !== null
        ? ((e = Oc(e, l, n)), Mt(e, t) || (nt = !0), e)
        : (bl & 42) === 0 || ((bl & 1073741824) !== 0 && (Ne & 261930) === 0)
          ? ((nt = !0), (e.memoizedState = l))
          : ((e = Lm()), (_e.lanes |= e), (Jl |= e), t);
  }
  function Ud(e, t, l, n, u) {
    var c = K.p;
    K.p = c !== 0 && 8 > c ? c : 8;
    var f = L.T,
      p = {};
    ((L.T = p), Bc(e, !1, t, l));
    try {
      var x = u(),
        D = L.S;
      if (
        (D !== null && D(p, x), x !== null && typeof x == 'object' && typeof x.then == 'function')
      ) {
        var q = Fg(x, n);
        ti(e, t, q, Bt(e));
      } else ti(e, t, n, Bt(e));
    } catch (X) {
      ti(e, t, { then: function () {}, status: 'rejected', reason: X }, Bt());
    } finally {
      ((K.p = c), f !== null && p.types !== null && (f.types = p.types), (L.T = f));
    }
  }
  function a_() {}
  function Dc(e, t, l, n) {
    if (e.tag !== 5) throw Error(s(476));
    var u = qd(e).queue;
    Ud(
      e,
      u,
      t,
      te,
      l === null
        ? a_
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
        lastRenderedReducer: Sl,
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
          lastRenderedReducer: Sl,
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
    (t.next === null && (t = e.alternate.memoizedState), ti(e, t.next.queue, {}, Bt()));
  }
  function zc() {
    return ft(_i);
  }
  function Gd() {
    return Pe().memoizedState;
  }
  function Yd() {
    return Pe().memoizedState;
  }
  function i_(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = Bt();
          e = Xl(l);
          var n = Vl(t, e, l);
          (n !== null && (kt(n, t, l), Ja(n, t, l)), (t = { cache: rc() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function u_(e, t, l) {
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
      vu(e) ? Xd(t, l) : ((l = Ps(e, t, l, n)), l !== null && (kt(l, e, n), Vd(l, t, n))));
  }
  function $d(e, t, l) {
    var n = Bt();
    ti(e, t, l, n);
  }
  function ti(e, t, l, n) {
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
      if (((l = Ps(e, t, u, n)), l !== null)) return (kt(l, e, n), Vd(l, t, n), !0);
    }
    return !1;
  }
  function Bc(e, t, l, n) {
    if (
      ((n = {
        lane: 2,
        revertLane: po(),
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      vu(e))
    ) {
      if (t) throw Error(s(479));
    } else ((t = Ps(e, l, n, 2)), t !== null && kt(t, e, 2));
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
  var li = {
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
  li.useEffectEvent = Ie;
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
          Bl(!0);
          try {
            e();
          } finally {
            Bl(!1);
          }
        }
        return ((l.memoizedState = [n, t]), n);
      },
      useReducer: function (e, t, l) {
        var n = _t();
        if (l !== void 0) {
          var u = l(t);
          if (An) {
            Bl(!0);
            try {
              l(t);
            } finally {
              Bl(!1);
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
          (e = e.dispatch = u_.bind(null, _e, e)),
          [n.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = _t();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = jc(e);
        var t = e.queue,
          l = $d.bind(null, _e, t);
        return ((t.dispatch = l), [e.memoizedState, l]);
      },
      useDebugValue: wc,
      useDeferredValue: function (e, t) {
        var l = _t();
        return Oc(l, e, t);
      },
      useTransition: function () {
        var e = jc(!1);
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
          var l = sl,
            n = ul;
          ((l = (n & ~(1 << (32 - jt(n) - 1))).toString(32) + l),
            (t = '_' + t + 'R_' + l),
            (l = mu++),
            0 < l && (t += 'H' + l.toString(32)),
            (t += '_'));
        } else ((l = Pg++), (t = '_' + t + 'r_' + l.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: zc,
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
        return ((t.queue = l), (t = Bc.bind(null, _e, !0, l)), (l.dispatch = t), [e, t]);
      },
      useMemoCache: kc,
      useCacheRefresh: function () {
        return (_t().memoizedState = i_.bind(null, _e));
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
    Lc = {
      readContext: ft,
      use: pu,
      useCallback: zd,
      useContext: ft,
      useEffect: Rc,
      useImperativeHandle: Dd,
      useInsertionEffect: Rd,
      useLayoutEffect: wd,
      useMemo: Bd,
      useReducer: yu,
      useRef: Cd,
      useState: function () {
        return yu(Sl);
      },
      useDebugValue: wc,
      useDeferredValue: function (e, t) {
        var l = Pe();
        return Ld(l, Ue.memoizedState, e, t);
      },
      useTransition: function () {
        var e = yu(Sl)[0],
          t = Pe().memoizedState;
        return [typeof e == 'boolean' ? e : ei(e), t];
      },
      useSyncExternalStore: dd,
      useId: Gd,
      useHostTransitionStatus: zc,
      useFormState: Nd,
      useActionState: Nd,
      useOptimistic: function (e, t) {
        var l = Pe();
        return _d(l, Ue, e, t);
      },
      useMemoCache: kc,
      useCacheRefresh: Yd,
    };
  Lc.useEffectEvent = Md;
  var Zd = {
    readContext: ft,
    use: pu,
    useCallback: zd,
    useContext: ft,
    useEffect: Rc,
    useImperativeHandle: Dd,
    useInsertionEffect: Rd,
    useLayoutEffect: wd,
    useMemo: Bd,
    useReducer: Cc,
    useRef: Cd,
    useState: function () {
      return Cc(Sl);
    },
    useDebugValue: wc,
    useDeferredValue: function (e, t) {
      var l = Pe();
      return Ue === null ? Oc(l, e, t) : Ld(l, Ue.memoizedState, e, t);
    },
    useTransition: function () {
      var e = Cc(Sl)[0],
        t = Pe().memoizedState;
      return [typeof e == 'boolean' ? e : ei(e), t];
    },
    useSyncExternalStore: dd,
    useId: Gd,
    useHostTransitionStatus: zc,
    useFormState: Ad,
    useActionState: Ad,
    useOptimistic: function (e, t) {
      var l = Pe();
      return Ue !== null ? _d(l, Ue, e, t) : ((l.baseState = e), [e, l.queue.dispatch]);
    },
    useMemoCache: kc,
    useCacheRefresh: Yd,
  };
  Zd.useEffectEvent = Md;
  function Uc(e, t, l, n) {
    ((t = e.memoizedState),
      (l = l(n, t)),
      (l = l == null ? t : b({}, t, l)),
      (e.memoizedState = l),
      e.lanes === 0 && (e.updateQueue.baseState = l));
  }
  var qc = {
    enqueueSetState: function (e, t, l) {
      e = e._reactInternals;
      var n = Bt(),
        u = Xl(n);
      ((u.payload = t),
        l != null && (u.callback = l),
        (t = Vl(e, u, n)),
        t !== null && (kt(t, e, n), Ja(t, e, n)));
    },
    enqueueReplaceState: function (e, t, l) {
      e = e._reactInternals;
      var n = Bt(),
        u = Xl(n);
      ((u.tag = 1),
        (u.payload = t),
        l != null && (u.callback = l),
        (t = Vl(e, u, n)),
        t !== null && (kt(t, e, n), Ja(t, e, n)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var l = Bt(),
        n = Xl(l);
      ((n.tag = 2),
        t != null && (n.callback = t),
        (t = Vl(e, n, l)),
        t !== null && (kt(t, e, l), Ja(t, e, l)));
    },
  };
  function Kd(e, t, l, n, u, c, f) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(n, c, f)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Ya(l, n) || !Ya(u, c)
          : !0
    );
  }
  function Id(e, t, l, n) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(l, n),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(l, n),
      t.state !== e && qc.enqueueReplaceState(t, t.state, null));
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
  function Hc(e, t, l) {
    return (
      (l = Xl(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        bu(e, t);
      }),
      l
    );
  }
  function em(e) {
    return ((e = Xl(e)), (e.tag = 3), e);
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
          typeof u != 'function' && (Wl === null ? (Wl = new Set([this])) : Wl.add(this)));
        var p = n.stack;
        this.componentDidCatch(n.value, { componentStack: p !== null ? p : '' });
      });
  }
  function s_(e, t, l, n, u) {
    if (((l.flags |= 32768), n !== null && typeof n == 'object' && typeof n.then == 'function')) {
      if (((t = l.alternate), t !== null && Wn(t, l, u, !0), (l = wt.current), l !== null)) {
        switch (l.tag) {
          case 31:
          case 13:
            return (
              Vt === null ? wu() : l.alternate === null && Je === 0 && (Je = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = u),
              n === su
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null ? (l.updateQueue = new Set([n])) : t.add(n),
                  fo(e, n, u)),
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
                  fo(e, n, u)),
              !1
            );
        }
        throw Error(s(435, l.tag));
      }
      return (fo(e, n, u), wu(), !1);
    }
    if (Ae)
      return (
        (t = wt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = u),
            n !== ic && ((e = Error(s(422), { cause: n })), Va(Gt(e, l))))
          : (n !== ic && ((t = Error(s(423), { cause: n })), Va(Gt(t, l))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (u &= -u),
            (e.lanes |= u),
            (n = Gt(n, l)),
            (u = Hc(e.stateNode, n, u)),
            yc(e, u),
            Je !== 4 && (Je = 2)),
        !1
      );
    var c = Error(s(520), { cause: n });
    if (((c = Gt(c, l)), ri === null ? (ri = [c]) : ri.push(c), Je !== 4 && (Je = 2), t === null))
      return !0;
    ((n = Gt(n, l)), (l = t));
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (e = u & -u),
            (l.lanes |= e),
            (e = Hc(l.stateNode, n, e)),
            yc(l, e),
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
                  (Wl === null || !Wl.has(c)))))
          )
            return (
              (l.flags |= 65536),
              (u &= -u),
              (l.lanes |= u),
              (u = em(u)),
              tm(u, e, l, n),
              yc(l, u),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Gc = Error(s(461)),
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
      (n = xc(e, t, l, f, c, u)),
      (p = Ec()),
      e !== null && !nt
        ? (Tc(e, t, u), xl(e, t, u))
        : (Ae && p && nc(t), (t.flags |= 1), dt(e, t, n, u), t.child)
    );
  }
  function nm(e, t, l, n, u) {
    if (e === null) {
      var c = l.type;
      return typeof c == 'function' && !ec(c) && c.defaultProps === void 0 && l.compare === null
        ? ((t.tag = 15), (t.type = c), am(e, t, c, n, u))
        : ((e = tu(l.type, null, n, t, t.mode, u)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((c = e.child), !Ic(e, u))) {
      var f = c.memoizedProps;
      if (((l = l.compare), (l = l !== null ? l : Ya), l(f, n) && e.ref === t.ref))
        return xl(e, t, u);
    }
    return ((t.flags |= 1), (e = yl(c, n)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function am(e, t, l, n, u) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (Ya(c, n) && e.ref === t.ref)
        if (((nt = !1), (t.pendingProps = n = c), Ic(e, u))) (e.flags & 131072) !== 0 && (nt = !0);
        else return ((t.lanes = e.lanes), xl(e, t, u));
    }
    return Yc(e, t, l, n, u);
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
          c !== null ? cd(t, c) : _c(),
          od(t));
      else return ((n = t.lanes = 536870912), um(e, t, c !== null ? c.baseLanes | l : l, l, n));
    } else
      c !== null
        ? (iu(t, c.cachePool), cd(t, c), Zl(), (t.memoizedState = null))
        : (e !== null && iu(t, null), _c(), Zl());
    return (dt(e, t, u, l), t.child);
  }
  function ni(e, t) {
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
    var c = dc();
    return (
      (c = c === null ? null : { parent: tt._currentValue, pool: c }),
      (t.memoizedState = { baseLanes: l, cachePool: c }),
      e !== null && iu(t, null),
      _c(),
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
  function c_(e, t, l) {
    var n = t.pendingProps,
      u = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (Ae) {
        if (n.mode === 'hidden') return ((e = Su(t, n)), (t.lanes = 536870912), ni(null, e));
        if (
          (bc(t),
          (e = $e)
            ? ((e = vh(e, Xt)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: ql !== null ? { id: ul, overflow: sl } : null,
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
          throw Gl(t);
        return ((t.lanes = 536870912), null);
      }
      return Su(t, n);
    }
    var c = e.memoizedState;
    if (c !== null) {
      var f = c.dehydrated;
      if ((bc(t), u))
        if (t.flags & 256) ((t.flags &= -257), (t = sm(e, t, l)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(s(558));
      else if ((nt || Wn(e, t, l, !1), (u = (l & e.childLanes) !== 0), nt || u)) {
        if (((n = Ye), n !== null && ((f = Jr(n, l)), f !== 0 && f !== c.retryLane)))
          throw ((c.retryLane = f), _n(e, f), kt(n, e, f), Gc);
        (wu(), (t = sm(e, t, l)));
      } else
        ((e = c.treeContext),
          ($e = Qt(f.nextSibling)),
          (rt = t),
          (Ae = !0),
          (Hl = null),
          (Xt = !1),
          e !== null && Zf(t, e),
          (t = Su(t, n)),
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
  function xu(e, t) {
    var l = t.ref;
    if (l === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != 'function' && typeof l != 'object') throw Error(s(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function Yc(e, t, l, n, u) {
    return (
      xn(t),
      (l = xc(e, t, l, n, void 0, u)),
      (n = Ec()),
      e !== null && !nt
        ? (Tc(e, t, u), xl(e, t, u))
        : (Ae && n && nc(t), (t.flags |= 1), dt(e, t, l, u), t.child)
    );
  }
  function cm(e, t, l, n, u, c) {
    return (
      xn(t),
      (t.updateQueue = null),
      (l = fd(t, n, l, u)),
      rd(e),
      (n = Ec()),
      e !== null && !nt
        ? (Tc(e, t, c), xl(e, t, c))
        : (Ae && n && nc(t), (t.flags |= 1), dt(e, t, l, c), t.child)
    );
  }
  function om(e, t, l, n, u) {
    if ((xn(t), t.stateNode === null)) {
      var c = Zn,
        f = l.contextType;
      (typeof f == 'object' && f !== null && (c = ft(f)),
        (c = new l(n, c)),
        (t.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null),
        (c.updater = qc),
        (t.stateNode = c),
        (c._reactInternals = t),
        (c = t.stateNode),
        (c.props = n),
        (c.state = t.memoizedState),
        (c.refs = {}),
        hc(t),
        (f = l.contextType),
        (c.context = typeof f == 'object' && f !== null ? ft(f) : Zn),
        (c.state = t.memoizedState),
        (f = l.getDerivedStateFromProps),
        typeof f == 'function' && (Uc(t, l, f, n), (c.state = t.memoizedState)),
        typeof l.getDerivedStateFromProps == 'function' ||
          typeof c.getSnapshotBeforeUpdate == 'function' ||
          (typeof c.UNSAFE_componentWillMount != 'function' &&
            typeof c.componentWillMount != 'function') ||
          ((f = c.state),
          typeof c.componentWillMount == 'function' && c.componentWillMount(),
          typeof c.UNSAFE_componentWillMount == 'function' && c.UNSAFE_componentWillMount(),
          f !== c.state && qc.enqueueReplaceState(c, c.state, null),
          Fa(t, n, c, u),
          Wa(),
          (c.state = t.memoizedState)),
        typeof c.componentDidMount == 'function' && (t.flags |= 4194308),
        (n = !0));
    } else if (e === null) {
      c = t.stateNode;
      var p = t.memoizedProps,
        x = Cn(l, p);
      c.props = x;
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
        ($l = !1));
      var z = t.memoizedState;
      ((c.state = z),
        Fa(t, n, c, u),
        Wa(),
        (D = t.memoizedState),
        p || z !== D || $l
          ? (typeof X == 'function' && (Uc(t, l, X, n), (D = t.memoizedState)),
            (x = $l || Kd(t, l, x, n, z, D, f))
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
            (n = x))
          : (typeof c.componentDidMount == 'function' && (t.flags |= 4194308), (n = !1)));
    } else {
      ((c = t.stateNode),
        pc(e, t),
        (f = t.memoizedProps),
        (q = Cn(l, f)),
        (c.props = q),
        (X = t.pendingProps),
        (z = c.context),
        (D = l.contextType),
        (x = Zn),
        typeof D == 'object' && D !== null && (x = ft(D)),
        (p = l.getDerivedStateFromProps),
        (D = typeof p == 'function' || typeof c.getSnapshotBeforeUpdate == 'function') ||
          (typeof c.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof c.componentWillReceiveProps != 'function') ||
          ((f !== X || z !== x) && Id(t, c, n, x)),
        ($l = !1),
        (z = t.memoizedState),
        (c.state = z),
        Fa(t, n, c, u),
        Wa());
      var B = t.memoizedState;
      f !== X || z !== B || $l || (e !== null && e.dependencies !== null && nu(e.dependencies))
        ? (typeof p == 'function' && (Uc(t, l, p, n), (B = t.memoizedState)),
          (q =
            $l ||
            Kd(t, l, q, n, z, B, x) ||
            (e !== null && e.dependencies !== null && nu(e.dependencies)))
            ? (D ||
                (typeof c.UNSAFE_componentWillUpdate != 'function' &&
                  typeof c.componentWillUpdate != 'function') ||
                (typeof c.componentWillUpdate == 'function' && c.componentWillUpdate(n, B, x),
                typeof c.UNSAFE_componentWillUpdate == 'function' &&
                  c.UNSAFE_componentWillUpdate(n, B, x)),
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
          (c.context = x),
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
        : (e = xl(e, t, u)),
      e
    );
  }
  function rm(e, t, l, n) {
    return (bn(), (t.flags |= 256), dt(e, t, l, n), t.child);
  }
  var $c = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Xc(e) {
    return { baseLanes: e, cachePool: Pf() };
  }
  function Vc(e, t, l) {
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
          (u ? Ql(t) : Zl(),
          (e = $e)
            ? ((e = vh(e, Xt)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: ql !== null ? { id: ul, overflow: sl } : null,
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
          throw Gl(t);
        return (Co(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var p = n.children;
      return (
        (n = n.fallback),
        u
          ? (Zl(),
            (u = t.mode),
            (p = Eu({ mode: 'hidden', children: p }, u)),
            (n = vn(n, u, l, null)),
            (p.return = t),
            (n.return = t),
            (p.sibling = n),
            (t.child = p),
            (n = t.child),
            (n.memoizedState = Xc(l)),
            (n.childLanes = Vc(e, f, l)),
            (t.memoizedState = $c),
            ni(null, n))
          : (Ql(t), Qc(t, p))
      );
    }
    var x = e.memoizedState;
    if (x !== null && ((p = x.dehydrated), p !== null)) {
      if (c)
        t.flags & 256
          ? (Ql(t), (t.flags &= -257), (t = Zc(e, t, l)))
          : t.memoizedState !== null
            ? (Zl(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (Zl(),
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
              (n.memoizedState = Xc(l)),
              (n.childLanes = Vc(e, f, l)),
              (t.memoizedState = $c),
              (t = ni(null, n)));
      else if ((Ql(t), Co(p))) {
        if (((f = p.nextSibling && p.nextSibling.dataset), f)) var D = f.dgst;
        ((f = D),
          (n = Error(s(419))),
          (n.stack = ''),
          (n.digest = f),
          Va({ value: n, source: null, stack: null }),
          (t = Zc(e, t, l)));
      } else if ((nt || Wn(e, t, l, !1), (f = (l & e.childLanes) !== 0), nt || f)) {
        if (((f = Ye), f !== null && ((n = Jr(f, l)), n !== 0 && n !== x.retryLane)))
          throw ((x.retryLane = n), _n(e, n), kt(f, e, n), Gc);
        (Ao(p) || wu(), (t = Zc(e, t, l)));
      } else
        Ao(p)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = x.treeContext),
            ($e = Qt(p.nextSibling)),
            (rt = t),
            (Ae = !0),
            (Hl = null),
            (Xt = !1),
            e !== null && Zf(t, e),
            (t = Qc(t, n.children)),
            (t.flags |= 4096));
      return t;
    }
    return u
      ? (Zl(),
        (p = n.fallback),
        (u = t.mode),
        (x = e.child),
        (D = x.sibling),
        (n = yl(x, { mode: 'hidden', children: n.children })),
        (n.subtreeFlags = x.subtreeFlags & 65011712),
        D !== null ? (p = yl(D, p)) : ((p = vn(p, u, l, null)), (p.flags |= 2)),
        (p.return = t),
        (n.return = t),
        (n.sibling = p),
        (t.child = n),
        ni(null, n),
        (n = t.child),
        (p = e.child.memoizedState),
        p === null
          ? (p = Xc(l))
          : ((u = p.cachePool),
            u !== null
              ? ((x = tt._currentValue), (u = u.parent !== x ? { parent: x, pool: x } : u))
              : (u = Pf()),
            (p = { baseLanes: p.baseLanes | l, cachePool: u })),
        (n.memoizedState = p),
        (n.childLanes = Vc(e, f, l)),
        (t.memoizedState = $c),
        ni(e.child, n))
      : (Ql(t),
        (l = e.child),
        (e = l.sibling),
        (l = yl(l, { mode: 'visible', children: n.children })),
        (l.return = t),
        (l.sibling = null),
        e !== null &&
          ((f = t.deletions), f === null ? ((t.deletions = [e]), (t.flags |= 16)) : f.push(e)),
        (t.child = l),
        (t.memoizedState = null),
        l);
  }
  function Qc(e, t) {
    return ((t = Eu({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function Eu(e, t) {
    return ((e = Rt(22, e, null, t)), (e.lanes = 0), e);
  }
  function Zc(e, t, l) {
    return (
      kn(t, e.child, null, l),
      (e = Qc(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function dm(e, t, l) {
    e.lanes |= t;
    var n = e.alternate;
    (n !== null && (n.lanes |= t), cc(e.return, t, l));
  }
  function Kc(e, t, l, n, u, c) {
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
      (n = Ae ? Xa : 0),
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
          Kc(t, !1, u, l, c, n));
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
        Kc(t, !0, l, null, c, n);
        break;
      case 'together':
        Kc(t, !1, null, null, void 0, n);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function xl(e, t, l) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (Jl |= t.lanes), (l & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((Wn(e, t, l, !1), (l & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(s(153));
    if (t.child !== null) {
      for (e = t.child, l = yl(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        ((e = e.sibling), (l = l.sibling = yl(e, e.pendingProps)), (l.return = t));
      l.sibling = null;
    }
    return t.child;
  }
  function Ic(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && nu(e)));
  }
  function o_(e, t, l) {
    switch (t.tag) {
      case 3:
        (ut(t, t.stateNode.containerInfo), Yl(t, tt, e.memoizedState.cache), bn());
        break;
      case 27:
      case 5:
        G(t);
        break;
      case 4:
        ut(t, t.stateNode.containerInfo);
        break;
      case 10:
        Yl(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), bc(t), null);
        break;
      case 13:
        var n = t.memoizedState;
        if (n !== null)
          return n.dehydrated !== null
            ? (Ql(t), (t.flags |= 128), null)
            : (l & t.child.childLanes) !== 0
              ? fm(e, t, l)
              : (Ql(t), (e = xl(e, t, l)), e !== null ? e.sibling : null);
        Ql(t);
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
        Yl(t, tt, e.memoizedState.cache);
    }
    return xl(e, t, l);
  }
  function hm(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) nt = !0;
      else {
        if (!Ic(e, l) && (t.flags & 128) === 0) return ((nt = !1), o_(e, t, l));
        nt = (e.flags & 131072) !== 0;
      }
    else ((nt = !1), Ae && (t.flags & 1048576) !== 0 && Qf(t, Xa, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var n = t.pendingProps;
          if (((e = Tn(t.elementType)), (t.type = e), typeof e == 'function'))
            ec(e)
              ? ((n = Cn(e, n)), (t.tag = 1), (t = om(null, t, e, n, l)))
              : ((t.tag = 0), (t = Yc(null, t, e, n, l)));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === P) {
                ((t.tag = 11), (t = lm(null, t, e, n, l)));
                break e;
              } else if (u === Y) {
                ((t.tag = 14), (t = nm(null, t, e, n, l)));
                break e;
              }
            }
            throw ((t = J(e) || e), Error(s(306, t, '')));
          }
        }
        return t;
      case 0:
        return Yc(e, t, t.type, t.pendingProps, l);
      case 1:
        return ((n = t.type), (u = Cn(n, t.pendingProps)), om(e, t, n, u, l));
      case 3:
        e: {
          if ((ut(t, t.stateNode.containerInfo), e === null)) throw Error(s(387));
          n = t.pendingProps;
          var c = t.memoizedState;
          ((u = c.element), pc(e, t), Fa(t, n, null, l));
          var f = t.memoizedState;
          if (
            ((n = f.cache),
            Yl(t, tt, n),
            n !== c.cache && oc(t, [tt], l, !0),
            Wa(),
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
              ((u = Gt(Error(s(424)), t)), Va(u), (t = rm(e, t, n, l)));
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
                $e = Qt(e.firstChild),
                  rt = t,
                  Ae = !0,
                  Hl = null,
                  Xt = !0,
                  l = id(t, null, n, l),
                  t.child = l;
                l;
              )
                ((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
            }
          else {
            if ((bn(), n === u)) {
              t = xl(e, t, l);
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
          G(t),
          e === null &&
            Ae &&
            ((n = t.stateNode = xh(t.type, t.pendingProps, be.current)),
            (rt = t),
            (Xt = !0),
            (u = $e),
            tn(t.type) ? ((jo = u), ($e = Qt(n.firstChild))) : ($e = u)),
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
              ((n = q_(n, t.type, t.pendingProps, Xt)),
              n !== null
                ? ((t.stateNode = n), (rt = t), ($e = Qt(n.firstChild)), (Xt = !1), (u = !0))
                : (u = !1)),
            u || Gl(t)),
          G(t),
          (u = t.type),
          (c = t.pendingProps),
          (f = e !== null ? e.memoizedProps : null),
          (n = c.children),
          To(u, c) ? (n = null) : f !== null && To(u, f) && (t.flags |= 32),
          t.memoizedState !== null && ((u = xc(e, t, e_, null, null, l)), (_i._currentValue = u)),
          xu(e, t),
          dt(e, t, n, l),
          t.child
        );
      case 6:
        return (
          e === null &&
            Ae &&
            ((e = l = $e) &&
              ((l = H_(l, t.pendingProps, Xt)),
              l !== null ? ((t.stateNode = l), (rt = t), ($e = null), (e = !0)) : (e = !1)),
            e || Gl(t)),
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
        return ((n = t.pendingProps), Yl(t, t.type, n.value), dt(e, t, n.children, l), t.child);
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
        return c_(e, t, l);
      case 22:
        return im(e, t, l, t.pendingProps);
      case 24:
        return (
          xn(t),
          (n = ft(tt)),
          e === null
            ? ((u = dc()),
              u === null &&
                ((u = Ye),
                (c = rc()),
                (u.pooledCache = c),
                c.refCount++,
                c !== null && (u.pooledCacheLanes |= l),
                (u = c)),
              (t.memoizedState = { parent: n, cache: u }),
              hc(t),
              Yl(t, tt, u))
            : ((e.lanes & l) !== 0 && (pc(e, t), Fa(t, null, null, l), Wa()),
              (u = e.memoizedState),
              (c = t.memoizedState),
              u.parent !== n
                ? ((u = { parent: n, cache: n }),
                  (t.memoizedState = u),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u),
                  Yl(t, tt, n))
                : ((n = c.cache), Yl(t, tt, n), n !== u.cache && oc(t, [tt], l, !0))),
          dt(e, t, t.pendingProps.children, l),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(s(156, t.tag));
  }
  function El(e) {
    e.flags |= 4;
  }
  function Jc(e, t, l, n, u) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (u & 335544128) === u))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Gm()) e.flags |= 8192;
        else throw ((Nn = su), mc);
    } else e.flags &= -16777217;
  }
  function pm(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !Mh(t)))
      if (Gm()) e.flags |= 8192;
      else throw ((Nn = su), mc);
  }
  function Tu(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? Zr() : 536870912), (e.lanes |= t), (oa |= t)));
  }
  function ai(e, t) {
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
  function r_(e, t, l) {
    var n = t.pendingProps;
    switch ((ac(t), t.tag)) {
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
          vl(tt),
          Ve(),
          l.pendingContext && ((l.context = l.pendingContext), (l.pendingContext = null)),
          (e === null || e.child === null) &&
            (Jn(t)
              ? El(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), uc())),
          Xe(t),
          null
        );
      case 26:
        var u = t.type,
          c = t.memoizedState;
        return (
          e === null
            ? (El(t), c !== null ? (Xe(t), pm(t, c)) : (Xe(t), Jc(t, u, null, n, l)))
            : c
              ? c !== e.memoizedState
                ? (El(t), Xe(t), pm(t, c))
                : (Xe(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== n && El(t), Xe(t), Jc(t, u, e, n, l)),
          null
        );
      case 27:
        if ((oe(t), (l = be.current), (u = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && El(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(s(166));
            return (Xe(t), null);
          }
          ((e = le.current), Jn(t) ? Kf(t) : ((e = xh(u, n, l)), (t.stateNode = e), El(t)));
        }
        return (Xe(t), null);
      case 5:
        if ((oe(t), (u = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && El(t);
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
            n && El(t);
          }
        }
        return (Xe(t), Jc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, l), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== n && El(t);
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
              e || Gl(t, !0));
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
            ((l = uc()),
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
            ((u = uc()),
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
        return (Ve(), e === null && vo(t.stateNode.containerInfo), Xe(t), null);
      case 10:
        return (vl(t.type), Xe(t), null);
      case 19:
        if ((H(Fe), (n = t.memoizedState), n === null)) return (Xe(t), null);
        if (((u = (t.flags & 128) !== 0), (c = n.rendering), c === null))
          if (u) ai(n, !1);
          else {
            if (Je !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((c = fu(e)), c !== null)) {
                  for (
                    t.flags |= 128,
                      ai(n, !1),
                      e = c.updateQueue,
                      t.updateQueue = e,
                      Tu(t, e),
                      t.subtreeFlags = 0,
                      e = l,
                      l = t.child;
                    l !== null;
                  )
                    ($f(l, e), (l = l.sibling));
                  return (W(Fe, (Fe.current & 1) | 2), Ae && gl(t, n.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            n.tail !== null &&
              At() > ju &&
              ((t.flags |= 128), (u = !0), ai(n, !1), (t.lanes = 4194304));
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
                ai(n, !0),
                n.tail === null && n.tailMode === 'hidden' && !c.alternate && !Ae)
              )
                return (Xe(t), null);
            } else
              2 * At() - n.renderingStartTime > ju &&
                l !== 536870912 &&
                ((t.flags |= 128), (u = !0), ai(n, !1), (t.lanes = 4194304));
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
            Ae && gl(t, n.treeForkCount),
            e)
          : (Xe(t), null);
      case 22:
      case 23:
        return (
          Ot(t),
          vc(),
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
          e !== null && H(En),
          null
        );
      case 24:
        return (
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          t.memoizedState.cache !== l && (t.flags |= 2048),
          vl(tt),
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
  function f_(e, t) {
    switch ((ac(t), t.tag)) {
      case 1:
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 3:
        return (
          vl(tt),
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
        return (H(Fe), null);
      case 4:
        return (Ve(), null);
      case 10:
        return (vl(t.type), null);
      case 22:
      case 23:
        return (
          Ot(t),
          vc(),
          e !== null && H(En),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (vl(tt), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function ym(e, t) {
    switch ((ac(t), t.tag)) {
      case 3:
        (vl(tt), Ve());
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
        H(Fe);
        break;
      case 10:
        vl(t.type);
        break;
      case 22:
      case 23:
        (Ot(t), vc(), e !== null && H(En));
        break;
      case 24:
        vl(tt);
    }
  }
  function ii(e, t) {
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
  function Kl(e, t, l) {
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
              var x = l,
                D = p;
              try {
                D();
              } catch (q) {
                Be(u, x, q);
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
  function ui(e, t) {
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
  function cl(e, t) {
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
  function Wc(e, t, l) {
    try {
      var n = e.stateNode;
      (O_(n, e.type, l, t), (n[bt] = t));
    } catch (u) {
      Be(e, e.return, u);
    }
  }
  function bm(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && tn(e.type)) || e.tag === 4
    );
  }
  function Fc(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || bm(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if ((e.tag === 27 && tn(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Pc(e, t, l) {
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
            l != null || t.onclick !== null || (t.onclick = hl)));
    else if (
      n !== 4 &&
      (n === 27 && tn(e.type) && ((l = e.stateNode), (t = null)), (e = e.child), e !== null)
    )
      for (Pc(e, t, l), e = e.sibling; e !== null; ) (Pc(e, t, l), (e = e.sibling));
  }
  function Nu(e, t, l) {
    var n = e.tag;
    if (n === 5 || n === 6) ((e = e.stateNode), t ? l.insertBefore(e, t) : l.appendChild(e));
    else if (n !== 4 && (n === 27 && tn(e.type) && (l = e.stateNode), (e = e.child), e !== null))
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
  var Tl = !1,
    at = !1,
    eo = !1,
    xm = typeof WeakSet == 'function' ? WeakSet : Set,
    ct = null;
  function d_(e, t) {
    if (((e = e.containerInfo), (xo = Qu), (e = Df(e)), Zs(e))) {
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
              x = -1,
              D = 0,
              q = 0,
              X = e,
              z = null;
            t: for (;;) {
              for (
                var B;
                X !== l || (u !== 0 && X.nodeType !== 3) || (p = f + u),
                  X !== c || (n !== 0 && X.nodeType !== 3) || (x = f + n),
                  X.nodeType === 3 && (f += X.nodeValue.length),
                  (B = X.firstChild) !== null;
              )
                ((z = X), (X = B));
              for (;;) {
                if (X === e) break t;
                if (
                  (z === l && ++D === u && (p = f),
                  z === c && ++q === n && (x = f),
                  (B = X.nextSibling) !== null)
                )
                  break;
                ((X = z), (z = X.parentNode));
              }
              X = B;
            }
            l = p === -1 || x === -1 ? null : { start: p, end: x };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Eo = { focusedElem: e, selectionRange: l }, Qu = !1, ct = t; ct !== null; )
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
                if (((e = t.stateNode.containerInfo), (l = e.nodeType), l === 9)) ko(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      ko(e);
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
        (kl(e, l), n & 4 && ii(5, l));
        break;
      case 1:
        if ((kl(e, l), n & 4))
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
        (n & 64 && gm(l), n & 512 && ui(l, l.return));
        break;
      case 3:
        if ((kl(e, l), n & 64 && ((e = l.updateQueue), e !== null))) {
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
        (kl(e, l), t === null && n & 4 && vm(l), n & 512 && ui(l, l.return));
        break;
      case 12:
        kl(e, l);
        break;
      case 31:
        (kl(e, l), n & 4 && km(e, l));
        break;
      case 13:
        (kl(e, l),
          n & 4 && Am(e, l),
          n & 64 &&
            ((e = l.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((l = S_.bind(null, l)), G_(e, l)))));
        break;
      case 22:
        if (((n = l.memoizedState !== null || Tl), !n)) {
          ((t = (t !== null && t.memoizedState !== null) || at), (u = Tl));
          var c = at;
          ((Tl = n),
            (at = t) && !c ? Al(e, l, (l.subtreeFlags & 8772) !== 0) : kl(e, l),
            (Tl = u),
            (at = c));
        }
        break;
      case 30:
        break;
      default:
        kl(e, l);
    }
  }
  function Tm(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), Tm(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Ms(t)),
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
  function Nl(e, t, l) {
    for (l = l.child; l !== null; ) (Nm(e, t, l), (l = l.sibling));
  }
  function Nm(e, t, l) {
    if (Ct && typeof Ct.onCommitFiberUnmount == 'function')
      try {
        Ct.onCommitFiberUnmount(Ma, l);
      } catch {}
    switch (l.tag) {
      case 26:
        (at || cl(l, t),
          Nl(e, t, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
        break;
      case 27:
        at || cl(l, t);
        var n = Qe,
          u = xt;
        (tn(l.type) && ((Qe = l.stateNode), (xt = !1)),
          Nl(e, t, l),
          pi(l.stateNode),
          (Qe = n),
          (xt = u));
        break;
      case 5:
        at || cl(l, t);
      case 6:
        if (((n = Qe), (u = xt), (Qe = null), Nl(e, t, l), (Qe = n), (xt = u), Qe !== null))
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
          Nl(e, t, l),
          (Qe = n),
          (xt = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Kl(2, l, t), at || Kl(4, l, t), Nl(e, t, l));
        break;
      case 1:
        (at ||
          (cl(l, t), (n = l.stateNode), typeof n.componentWillUnmount == 'function' && _m(l, t, n)),
          Nl(e, t, l));
        break;
      case 21:
        Nl(e, t, l);
        break;
      case 22:
        ((at = (n = at) || l.memoizedState !== null), Nl(e, t, l), (at = n));
        break;
      default:
        Nl(e, t, l);
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
  function m_(e) {
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
    var l = m_(e);
    t.forEach(function (n) {
      if (!l.has(n)) {
        l.add(n);
        var u = x_.bind(null, e, n);
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
              if (tn(p.type)) {
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
  var Pt = null;
  function Cm(e, t) {
    var l = e.alternate,
      n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Et(t, e), Tt(e), n & 4 && (Kl(3, e, e.return), ii(3, e), Kl(5, e, e.return)));
        break;
      case 1:
        (Et(t, e),
          Tt(e),
          n & 512 && (at || l === null || cl(l, l.return)),
          n & 64 &&
            Tl &&
            ((e = e.updateQueue),
            e !== null &&
              ((n = e.callbacks),
              n !== null &&
                ((l = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = l === null ? n : l.concat(n))))));
        break;
      case 26:
        var u = Pt;
        if ((Et(t, e), Tt(e), n & 512 && (at || l === null || cl(l, l.return)), n & 4)) {
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
                          c[Oa] ||
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
              : n === null && e.stateNode !== null && Wc(e, e.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        (Et(t, e),
          Tt(e),
          n & 512 && (at || l === null || cl(l, l.return)),
          l !== null && n & 4 && Wc(e, e.memoizedProps, l.memoizedProps));
        break;
      case 5:
        if ((Et(t, e), Tt(e), n & 512 && (at || l === null || cl(l, l.return)), e.flags & 32)) {
          u = e.stateNode;
          try {
            Hn(u, '');
          } catch (ne) {
            Be(e, e.return, ne);
          }
        }
        (n & 4 &&
          e.stateNode != null &&
          ((u = e.memoizedProps), Wc(e, u, l !== null ? l.memoizedProps : u)),
          n & 1024 && (eo = !0));
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
          (u = Pt),
          (Pt = Hu(t.containerInfo)),
          Et(t, e),
          (Pt = u),
          Tt(e),
          n & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            ga(t.containerInfo);
          } catch (ne) {
            Be(e, e.return, ne);
          }
        eo && ((eo = !1), jm(e));
        break;
      case 4:
        ((n = Pt), (Pt = Hu(e.stateNode.containerInfo)), Et(t, e), Tt(e), (Pt = n));
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
        var x = l !== null && l.memoizedState !== null,
          D = Tl,
          q = at;
        if (((Tl = D || u), (at = q || x), Et(t, e), (at = q), (Tl = D), Tt(e), n & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = u ? t._visibility & -2 : t._visibility | 1,
              u && (l === null || x || Tl || at || jn(e)),
              l = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                x = l = t;
                try {
                  if (((c = x.stateNode), u))
                    ((f = c.style),
                      typeof f.setProperty == 'function'
                        ? f.setProperty('display', 'none', 'important')
                        : (f.display = 'none'));
                  else {
                    p = x.stateNode;
                    var X = x.memoizedProps.style,
                      z = X != null && X.hasOwnProperty('display') ? X.display : null;
                    p.style.display = z == null || typeof z == 'boolean' ? '' : ('' + z).trim();
                  }
                } catch (ne) {
                  Be(x, x.return, ne);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                x = t;
                try {
                  x.stateNode.nodeValue = u ? '' : x.memoizedProps;
                } catch (ne) {
                  Be(x, x.return, ne);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                x = t;
                try {
                  var B = x.stateNode;
                  u ? _h(B, !0) : _h(x.stateNode, !1);
                } catch (ne) {
                  Be(x, x.return, ne);
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
              c = Fc(e);
            Nu(e, c, u);
            break;
          case 5:
            var f = l.stateNode;
            l.flags & 32 && (Hn(f, ''), (l.flags &= -33));
            var p = Fc(e);
            Nu(e, p, f);
            break;
          case 3:
          case 4:
            var x = l.stateNode.containerInfo,
              D = Fc(e);
            Pc(e, D, x);
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
  function kl(e, t) {
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
          (Kl(4, t, t.return), jn(t));
          break;
        case 1:
          cl(t, t.return);
          var l = t.stateNode;
          (typeof l.componentWillUnmount == 'function' && _m(t, t.return, l), jn(t));
          break;
        case 27:
          pi(t.stateNode);
        case 26:
        case 5:
          (cl(t, t.return), jn(t));
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
  function Al(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var n = t.alternate,
        u = e,
        c = t,
        f = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          (Al(u, c, l), ii(4, c));
          break;
        case 1:
          if ((Al(u, c, l), (n = c), (u = n.stateNode), typeof u.componentDidMount == 'function'))
            try {
              u.componentDidMount();
            } catch (D) {
              Be(n, n.return, D);
            }
          if (((n = c), (u = n.updateQueue), u !== null)) {
            var p = n.stateNode;
            try {
              var x = u.shared.hiddenCallbacks;
              if (x !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < x.length; u++) ud(x[u], p);
            } catch (D) {
              Be(n, n.return, D);
            }
          }
          (l && f & 64 && gm(c), ui(c, c.return));
          break;
        case 27:
          Sm(c);
        case 26:
        case 5:
          (Al(u, c, l), l && n === null && f & 4 && vm(c), ui(c, c.return));
          break;
        case 12:
          Al(u, c, l);
          break;
        case 31:
          (Al(u, c, l), l && f & 4 && km(u, c));
          break;
        case 13:
          (Al(u, c, l), l && f & 4 && Am(u, c));
          break;
        case 22:
          (c.memoizedState === null && Al(u, c, l), ui(c, c.return));
          break;
        case 30:
          break;
        default:
          Al(u, c, l);
      }
      t = t.sibling;
    }
  }
  function to(e, t) {
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
  function lo(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && Qa(e)));
  }
  function el(e, t, l, n) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (Mm(e, t, l, n), (t = t.sibling));
  }
  function Mm(e, t, l, n) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (el(e, t, l, n), u & 2048 && ii(9, t));
        break;
      case 1:
        el(e, t, l, n);
        break;
      case 3:
        (el(e, t, l, n),
          u & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && Qa(e))));
        break;
      case 12:
        if (u & 2048) {
          (el(e, t, l, n), (e = t.stateNode));
          try {
            var c = t.memoizedProps,
              f = c.id,
              p = c.onPostCommit;
            typeof p == 'function' &&
              p(f, t.alternate === null ? 'mount' : 'update', e.passiveEffectDuration, -0);
          } catch (x) {
            Be(t, t.return, x);
          }
        } else el(e, t, l, n);
        break;
      case 31:
        el(e, t, l, n);
        break;
      case 13:
        el(e, t, l, n);
        break;
      case 23:
        break;
      case 22:
        ((c = t.stateNode),
          (f = t.alternate),
          t.memoizedState !== null
            ? c._visibility & 2
              ? el(e, t, l, n)
              : si(e, t)
            : c._visibility & 2
              ? el(e, t, l, n)
              : ((c._visibility |= 2), ua(e, t, l, n, (t.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && to(f, t));
        break;
      case 24:
        (el(e, t, l, n), u & 2048 && lo(t.alternate, t));
        break;
      default:
        el(e, t, l, n);
    }
  }
  function ua(e, t, l, n, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var c = e,
        f = t,
        p = l,
        x = n,
        D = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          (ua(c, f, p, x, u), ii(8, f));
          break;
        case 23:
          break;
        case 22:
          var q = f.stateNode;
          (f.memoizedState !== null
            ? q._visibility & 2
              ? ua(c, f, p, x, u)
              : si(c, f)
            : ((q._visibility |= 2), ua(c, f, p, x, u)),
            u && D & 2048 && to(f.alternate, f));
          break;
        case 24:
          (ua(c, f, p, x, u), u && D & 2048 && lo(f.alternate, f));
          break;
        default:
          ua(c, f, p, x, u);
      }
      t = t.sibling;
    }
  }
  function si(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e,
          n = t,
          u = n.flags;
        switch (n.tag) {
          case 22:
            (si(l, n), u & 2048 && to(n.alternate, n));
            break;
          case 24:
            (si(l, n), u & 2048 && lo(n.alternate, n));
            break;
          default:
            si(l, n);
        }
        t = t.sibling;
      }
  }
  var ci = 8192;
  function sa(e, t, l) {
    if (e.subtreeFlags & ci) for (e = e.child; e !== null; ) (Rm(e, t, l), (e = e.sibling));
  }
  function Rm(e, t, l) {
    switch (e.tag) {
      case 26:
        (sa(e, t, l),
          e.flags & ci && e.memoizedState !== null && P_(l, Pt, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        sa(e, t, l);
        break;
      case 3:
      case 4:
        var n = Pt;
        ((Pt = Hu(e.stateNode.containerInfo)), sa(e, t, l), (Pt = n));
        break;
      case 22:
        e.memoizedState === null &&
          ((n = e.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = ci), (ci = 16777216), sa(e, t, l), (ci = n))
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
  function oi(e) {
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
        (oi(e), e.flags & 2048 && Kl(9, e, e.return));
        break;
      case 3:
        oi(e);
        break;
      case 12:
        oi(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Au(e))
          : oi(e);
        break;
      default:
        oi(e);
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
          (Kl(8, t, t.return), Au(t));
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
          Kl(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var n = l.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          Qa(l.memoizedState.cache);
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
  var h_ = {
      getCacheForType: function (e) {
        var t = ft(tt),
          l = t.data.get(e);
        return (l === void 0 && ((l = e()), t.data.set(e, l)), l);
      },
      cacheSignal: function () {
        return ft(tt).controller.signal;
      },
    },
    p_ = typeof WeakMap == 'function' ? WeakMap : Map,
    we = 0,
    Ye = null,
    Se = null,
    Ne = 0,
    ze = 0,
    Dt = null,
    Il = !1,
    ca = !1,
    no = !1,
    Cl = 0,
    Je = 0,
    Jl = 0,
    Mn = 0,
    ao = 0,
    zt = 0,
    oa = 0,
    ri = null,
    Nt = null,
    io = !1,
    Cu = 0,
    zm = 0,
    ju = 1 / 0,
    Mu = null,
    Wl = null,
    it = 0,
    Fl = null,
    ra = null,
    jl = 0,
    uo = 0,
    so = null,
    Bm = null,
    fi = 0,
    co = null;
  function Bt() {
    return (we & 2) !== 0 && Ne !== 0 ? Ne & -Ne : L.T !== null ? po() : Wr();
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
      (fa(e, 0), Pl(e, Ne, zt, !1)),
      wa(e, l),
      ((we & 2) === 0 || e !== Ye) &&
        (e === Ye && ((we & 2) === 0 && (Mn |= l), Je === 4 && Pl(e, Ne, zt, !1)), ol(e)));
  }
  function Um(e, t, l) {
    if ((we & 6) !== 0) throw Error(s(327));
    var n = (!l && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Ra(e, t),
      u = n ? __(e, t) : ro(e, t, !0),
      c = n;
    do {
      if (u === 0) {
        ca && !n && Pl(e, t, 0, !1);
        break;
      } else {
        if (((l = e.current.alternate), c && !y_(l))) {
          ((u = ro(e, t, !1)), (c = !1));
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
              u = ri;
              var x = p.current.memoizedState.isDehydrated;
              if ((x && (fa(p, f).flags |= 256), (f = ro(p, f, !1)), f !== 2)) {
                if (no && !x) {
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
          (fa(e, 0), Pl(e, t, 0, !0));
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
              Pl(n, t, zt, !Il);
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
            if ((Pl(n, t, zt, !Il), Hi(n, 0, !0) !== 0)) break e;
            ((jl = t),
              (n.timeoutHandle = ph(
                qm.bind(null, n, l, Nt, Mu, io, t, zt, Mn, oa, Il, c, 'Throttled', -0, 0),
                u
              )));
            break e;
          }
          qm(n, l, Nt, Mu, io, t, zt, Mn, oa, Il, c, null, -0, 0);
        }
      }
      break;
    } while (!0);
    ol(e);
  }
  function qm(e, t, l, n, u, c, f, p, x, D, q, X, z, B) {
    if (((e.timeoutHandle = -1), (X = t.subtreeFlags), X & 8192 || (X & 16785408) === 16785408)) {
      ((X = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: hl,
      }),
        Rm(t, c, X));
      var ne = (c & 62914560) === c ? Cu - At() : (c & 4194048) === c ? zm - At() : 0;
      if (((ne = e0(X, ne)), ne !== null)) {
        ((jl = c),
          (e.cancelPendingCommit = ne(Zm.bind(null, e, t, c, l, n, u, f, p, x, q, X, null, z, B))),
          Pl(e, c, f, !D));
        return;
      }
    }
    Zm(e, t, c, l, n, u, f, p, x);
  }
  function y_(e) {
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
  function Pl(e, t, l, n) {
    ((t &= ~ao),
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
    return (we & 6) === 0 ? (di(0), !1) : !0;
  }
  function oo() {
    if (Se !== null) {
      if (ze === 0) var e = Se.return;
      else ((e = Se), (_l = Sn = null), Nc(e), (ta = null), (Ka = 0), (e = Se));
      for (; e !== null; ) (ym(e.alternate, e), (e = e.return));
      Se = null;
    }
  }
  function fa(e, t) {
    var l = e.timeoutHandle;
    (l !== -1 && ((e.timeoutHandle = -1), B_(l)),
      (l = e.cancelPendingCommit),
      l !== null && ((e.cancelPendingCommit = null), l()),
      (jl = 0),
      oo(),
      (Ye = e),
      (Se = l = yl(e.current, null)),
      (Ne = t),
      (ze = 0),
      (Dt = null),
      (Il = !1),
      (ca = Ra(e, t)),
      (no = !1),
      (oa = zt = ao = Mn = Jl = Je = 0),
      (Nt = ri = null),
      (io = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var u = 31 - jt(n),
          c = 1 << u;
        ((t |= e[u]), (n &= ~c));
      }
    return ((Cl = t), Fi(), l);
  }
  function Hm(e, t) {
    ((_e = null),
      (L.H = li),
      t === ea || t === uu
        ? ((t = ld()), (ze = 3))
        : t === mc
          ? ((t = ld()), (ze = 4))
          : (ze =
              t === Gc
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (Dt = t),
      Se === null && ((Je = 1), bu(e, Gt(t, e.current))));
  }
  function Gm() {
    var e = wt.current;
    return e === null
      ? !0
      : (Ne & 4194048) === Ne
        ? Vt === null
        : (Ne & 62914560) === Ne || (Ne & 536870912) !== 0
          ? e === Vt
          : !1;
  }
  function Ym() {
    var e = L.H;
    return ((L.H = li), e === null ? li : e);
  }
  function $m() {
    var e = L.A;
    return ((L.A = h_), e);
  }
  function wu() {
    ((Je = 4),
      Il || ((Ne & 4194048) !== Ne && wt.current !== null) || (ca = !0),
      ((Jl & 134217727) === 0 && (Mn & 134217727) === 0) || Ye === null || Pl(Ye, Ne, zt, !1));
  }
  function ro(e, t, l) {
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
            x = Dt;
          switch (ze) {
            case 8:
              (oo(), (f = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              wt.current === null && (t = !0);
              var D = ze;
              if (((ze = 0), (Dt = null), da(e, p, x, D), l && ca)) {
                f = 0;
                break e;
              }
              break;
            default:
              ((D = ze), (ze = 0), (Dt = null), da(e, p, x, D));
          }
        }
        (g_(), (f = Je));
        break;
      } catch (q) {
        Hm(e, q);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (_l = Sn = null),
      (we = n),
      (L.H = u),
      (L.A = c),
      Se === null && ((Ye = null), (Ne = 0), Fi()),
      f
    );
  }
  function g_() {
    for (; Se !== null; ) Xm(Se);
  }
  function __(e, t) {
    var l = we;
    we |= 2;
    var n = Ym(),
      u = $m();
    Ye !== e || Ne !== t ? ((Mu = null), (ju = At() + 500), fa(e, t)) : (ca = Ra(e, t));
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
                ((ze !== 2 && ze !== 9) || Ye !== e || (ze = 7), ol(e));
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
                    var x = p.sibling;
                    if (x !== null) Se = x;
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
              (oo(), (Je = 6));
              break e;
            default:
              throw Error(s(462));
          }
        }
        v_();
        break;
      } catch (q) {
        Hm(e, q);
      }
    while (!0);
    return (
      (_l = Sn = null),
      (L.H = n),
      (L.A = u),
      (we = l),
      Se !== null ? 0 : ((Ye = null), (Ne = 0), Fi(), Je)
    );
  }
  function v_() {
    for (; Se !== null && !Yy(); ) Xm(Se);
  }
  function Xm(e) {
    var t = hm(e.alternate, e, Cl);
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
        Nc(t);
      default:
        (ym(l, t), (t = Se = $f(t, Cl)), (t = hm(l, t, Cl)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? Ou(e) : (Se = t));
  }
  function da(e, t, l, n) {
    ((_l = Sn = null), Nc(t), (ta = null), (Ka = 0));
    var u = t.return;
    try {
      if (s_(e, u, t, l, Ne)) {
        ((Je = 1), bu(e, Gt(l, e.current)), (Se = null));
        return;
      }
    } catch (c) {
      if (u !== null) throw ((Se = u), c);
      ((Je = 1), bu(e, Gt(l, e.current)), (Se = null));
      return;
    }
    t.flags & 32768
      ? (Ae || n === 1
          ? (e = !0)
          : ca || (Ne & 536870912) !== 0
            ? (e = !1)
            : ((Il = e = !0),
              (n === 2 || n === 9 || n === 3 || n === 6) &&
                ((n = wt.current), n !== null && n.tag === 13 && (n.flags |= 16384))),
        Qm(t, e))
      : Ou(t);
  }
  function Ou(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Qm(t, Il);
        return;
      }
      e = t.return;
      var l = r_(t.alternate, t, Cl);
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
      var l = f_(e.alternate, e);
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
  function Zm(e, t, l, n, u, c, f, p, x) {
    e.cancelPendingCommit = null;
    do Du();
    while (it !== 0);
    if ((we & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (
        ((c = t.lanes | t.childLanes),
        (c |= Fs),
        Fy(e, l, c, f, p, x),
        e === Ye && ((Se = Ye = null), (Ne = 0)),
        (ra = t),
        (Fl = e),
        (jl = l),
        (uo = c),
        (so = u),
        (Bm = n),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            E_(Bi, function () {
              return (Fm(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (n = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || n)
      ) {
        ((n = L.T), (L.T = null), (u = K.p), (K.p = 2), (f = we), (we |= 4));
        try {
          d_(e, t, l);
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
      var e = Fl,
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
          var c = Eo,
            f = Df(e.containerInfo),
            p = c.focusedElem,
            x = c.selectionRange;
          if (f !== p && p && p.ownerDocument && Of(p.ownerDocument.documentElement, p)) {
            if (x !== null && Zs(p)) {
              var D = x.start,
                q = x.end;
              if ((q === void 0 && (q = D), 'selectionStart' in p))
                ((p.selectionStart = D), (p.selectionEnd = Math.min(q, p.value.length)));
              else {
                var X = p.ownerDocument || document,
                  z = (X && X.defaultView) || window;
                if (z.getSelection) {
                  var B = z.getSelection(),
                    ne = p.textContent.length,
                    re = Math.min(x.start, ne),
                    He = x.end === void 0 ? re : Math.min(x.end, ne);
                  !B.extend && re > He && ((f = He), (He = re), (re = f));
                  var M = wf(p, re),
                    T = wf(p, He);
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
            for (X = [], B = p; (B = B.parentNode); )
              B.nodeType === 1 && X.push({ element: B, left: B.scrollLeft, top: B.scrollTop });
            for (typeof p.focus == 'function' && p.focus(), p = 0; p < X.length; p++) {
              var $ = X[p];
              (($.element.scrollLeft = $.left), ($.element.scrollTop = $.top));
            }
          }
          ((Qu = !!xo), (Eo = xo = null));
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
      var e = Fl,
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
      ((it = 0), $y());
      var e = Fl,
        t = ra,
        l = jl,
        n = Bm;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (it = 5)
        : ((it = 0), (ra = Fl = null), Wm(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (
        (u === 0 && (Wl = null),
        Cs(l),
        (t = t.stateNode),
        Ct && typeof Ct.onCommitFiberRoot == 'function')
      )
        try {
          Ct.onCommitFiberRoot(Ma, t, void 0, (t.current.flags & 128) === 128);
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
      ((jl & 3) !== 0 && Du(),
        ol(e),
        (u = e.pendingLanes),
        (l & 261930) !== 0 && (u & 42) !== 0 ? (e === co ? fi++ : ((fi = 0), (co = e))) : (fi = 0),
        di(0));
    }
  }
  function Wm(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), Qa(t)));
  }
  function Du() {
    return (Km(), Im(), Jm(), Fm());
  }
  function Fm() {
    if (it !== 5) return !1;
    var e = Fl,
      t = uo;
    uo = 0;
    var l = Cs(jl),
      n = L.T,
      u = K.p;
    try {
      ((K.p = 32 > l ? 32 : l), (L.T = null), (l = so), (so = null));
      var c = Fl,
        f = jl;
      if (((it = 0), (ra = Fl = null), (jl = 0), (we & 6) !== 0)) throw Error(s(331));
      var p = we;
      if (
        ((we |= 4),
        Om(c.current),
        Mm(c, c.current, f, l),
        (we = p),
        di(0, !1),
        Ct && typeof Ct.onPostCommitFiberRoot == 'function')
      )
        try {
          Ct.onPostCommitFiberRoot(Ma, c);
        } catch {}
      return !0;
    } finally {
      ((K.p = u), (L.T = n), Wm(e, t));
    }
  }
  function Pm(e, t, l) {
    ((t = Gt(l, t)),
      (t = Hc(e.stateNode, t, 2)),
      (e = Vl(e, t, 2)),
      e !== null && (wa(e, 2), ol(e)));
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
            (typeof n.componentDidCatch == 'function' && (Wl === null || !Wl.has(n)))
          ) {
            ((e = Gt(l, e)),
              (l = em(2)),
              (n = Vl(t, l, 2)),
              n !== null && (tm(l, n, t, e), wa(n, 2), ol(n)));
            break;
          }
        }
        t = t.return;
      }
  }
  function fo(e, t, l) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new p_();
      var u = new Set();
      n.set(t, u);
    } else ((u = n.get(t)), u === void 0 && ((u = new Set()), n.set(t, u)));
    u.has(l) || ((no = !0), u.add(l), (e = b_.bind(null, e, t, l)), t.then(e, e));
  }
  function b_(e, t, l) {
    var n = e.pingCache;
    (n !== null && n.delete(t),
      (e.pingedLanes |= e.suspendedLanes & l),
      (e.warmLanes &= ~l),
      Ye === e &&
        (Ne & l) === l &&
        (Je === 4 || (Je === 3 && (Ne & 62914560) === Ne && 300 > At() - Cu)
          ? (we & 2) === 0 && fa(e, 0)
          : (ao |= l),
        oa === Ne && (oa = 0)),
      ol(e));
  }
  function eh(e, t) {
    (t === 0 && (t = Zr()), (e = _n(e, t)), e !== null && (wa(e, t), ol(e)));
  }
  function S_(e) {
    var t = e.memoizedState,
      l = 0;
    (t !== null && (l = t.retryLane), eh(e, l));
  }
  function x_(e, t) {
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
  function E_(e, t) {
    return Ts(e, t);
  }
  var zu = null,
    ma = null,
    mo = !1,
    Bu = !1,
    ho = !1,
    en = 0;
  function ol(e) {
    (e !== ma && e.next === null && (ma === null ? (zu = ma = e) : (ma = ma.next = e)),
      (Bu = !0),
      mo || ((mo = !0), N_()));
  }
  function di(e, t) {
    if (!ho && Bu) {
      ho = !0;
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
              (c & 3) === 0 || Ra(n, c) || ((l = !0), ah(n, c)));
          n = n.next;
        }
      while (l);
      ho = !1;
    }
  }
  function T_() {
    th();
  }
  function th() {
    Bu = mo = !1;
    var e = 0;
    en !== 0 && z_() && (e = en);
    for (var t = At(), l = null, n = zu; n !== null; ) {
      var u = n.next,
        c = lh(n, t);
      (c === 0
        ? ((n.next = null), l === null ? (zu = u) : (l.next = u), u === null && (ma = l))
        : ((l = n), (e !== 0 || (c & 3) !== 0) && (Bu = !0)),
        (n = u));
    }
    ((it !== 0 && it !== 5) || di(e), en !== 0 && (en = 0));
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
        x = u[f];
      (x === -1
        ? ((p & l) === 0 || (p & n) !== 0) && (u[f] = Wy(p, t))
        : x <= t && (e.expiredLanes |= p),
        (c &= ~p));
    }
    if (
      ((t = Ye),
      (l = Ne),
      (l = Hi(e, e === t ? l : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (n = e.callbackNode),
      l === 0 || (e === t && (ze === 2 || ze === 9)) || e.cancelPendingCommit !== null)
    )
      return (n !== null && n !== null && Ns(n), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((l & 3) === 0 || Ra(e, l)) {
      if (((t = l & -l), t === e.callbackPriority)) return t;
      switch ((n !== null && Ns(n), Cs(l))) {
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
        (l = Ts(l, n)),
        (e.callbackPriority = t),
        (e.callbackNode = l),
        t
      );
    }
    return (
      n !== null && n !== null && Ns(n),
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
  function N_() {
    L_(function () {
      (we & 6) !== 0 ? Ts(Xr, T_) : th();
    });
  }
  function po() {
    if (en === 0) {
      var e = Fn;
      (e === 0 && ((e = Li), (Li <<= 1), (Li & 261888) === 0 && (Li = 256)), (en = e));
    }
    return en;
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
  function k_(e, t, l, n, u) {
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
                if (en !== 0) {
                  var x = f ? uh(u, f) : new FormData(u);
                  Dc(l, { pending: !0, data: x, method: u.method, action: c }, null, x);
                }
              } else
                typeof c == 'function' &&
                  (p.preventDefault(),
                  (x = f ? uh(u, f) : new FormData(u)),
                  Dc(l, { pending: !0, data: x, method: u.method, action: c }, c, x));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var yo = 0; yo < Ws.length; yo++) {
    var go = Ws[yo],
      A_ = go.toLowerCase(),
      C_ = go[0].toUpperCase() + go.slice(1);
    Ft(A_, 'on' + C_);
  }
  (Ft(Lf, 'onAnimationEnd'),
    Ft(Uf, 'onAnimationIteration'),
    Ft(qf, 'onAnimationStart'),
    Ft('dblclick', 'onDoubleClick'),
    Ft('focusin', 'onFocus'),
    Ft('focusout', 'onBlur'),
    Ft(Xg, 'onTransitionRun'),
    Ft(Vg, 'onTransitionStart'),
    Ft(Qg, 'onTransitionCancel'),
    Ft(Hf, 'onTransitionEnd'),
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
  var mi =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    j_ = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(mi)
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
              x = p.instance,
              D = p.currentTarget;
            if (((p = p.listener), x !== c && u.isPropagationStopped())) break e;
            ((c = p), (u.currentTarget = D));
            try {
              c(u);
            } catch (q) {
              Wi(q);
            }
            ((u.currentTarget = null), (c = x));
          }
        else
          for (f = 0; f < n.length; f++) {
            if (
              ((p = n[f]),
              (x = p.instance),
              (D = p.currentTarget),
              (p = p.listener),
              x !== c && u.isPropagationStopped())
            )
              break e;
            ((c = p), (u.currentTarget = D));
            try {
              c(u);
            } catch (q) {
              Wi(q);
            }
            ((u.currentTarget = null), (c = x));
          }
      }
    }
  }
  function xe(e, t) {
    var l = t[js];
    l === void 0 && (l = t[js] = new Set());
    var n = e + '__bubble';
    l.has(n) || (ch(t, e, 2, !1), l.add(n));
  }
  function _o(e, t, l) {
    var n = 0;
    (t && (n |= 4), ch(l, e, n, t));
  }
  var Lu = '_reactListening' + Math.random().toString(36).slice(2);
  function vo(e) {
    if (!e[Lu]) {
      ((e[Lu] = !0),
        ef.forEach(function (l) {
          l !== 'selectionchange' && (j_.has(l) || _o(l, !1, e), _o(l, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Lu] || ((t[Lu] = !0), _o('selectionchange', !1, t));
    }
  }
  function ch(e, t, l, n) {
    switch (Lh(t)) {
      case 2:
        var u = n0;
        break;
      case 8:
        u = a0;
        break;
      default:
        u = Do;
    }
    ((l = u.bind(null, t, l, e)),
      (u = void 0),
      !Us || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (u = !0),
      n
        ? u !== void 0
          ? e.addEventListener(t, l, { capture: !0, passive: u })
          : e.addEventListener(t, l, !0)
        : u !== void 0
          ? e.addEventListener(t, l, { passive: u })
          : e.addEventListener(t, l, !1));
  }
  function bo(e, t, l, n, u) {
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
              var x = f.tag;
              if ((x === 3 || x === 4) && f.stateNode.containerInfo === u) return;
              f = f.return;
            }
          for (; p !== null; ) {
            if (((f = zn(p)), f === null)) return;
            if (((x = f.tag), x === 5 || x === 6 || x === 26 || x === 27)) {
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
        q = Bs(l),
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
              B = xg;
              break;
            case 'focusin':
              ((ne = 'focus'), (B = Ys));
              break;
            case 'focusout':
              ((ne = 'blur'), (B = Ys));
              break;
            case 'beforeblur':
            case 'afterblur':
              B = Ys;
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
              B = rg;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              B = Ng;
              break;
            case Lf:
            case Uf:
            case qf:
              B = mg;
              break;
            case Hf:
              B = Ag;
              break;
            case 'scroll':
            case 'scrollend':
              B = cg;
              break;
            case 'wheel':
              B = jg;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              B = pg;
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
              B = Rg;
          }
          var re = (t & 4) !== 0,
            He = !re && (e === 'scroll' || e === 'scrollend'),
            M = re ? (z !== null ? z + 'Capture' : null) : z;
          re = [];
          for (var T = D, O; T !== null; ) {
            var $ = T;
            if (
              ((O = $.stateNode),
              ($ = $.tag),
              ($ !== 5 && $ !== 26 && $ !== 27) ||
                O === null ||
                M === null ||
                (($ = za(T, M)), $ != null && re.push(hi(T, $, O))),
              He)
            )
              break;
            T = T.return;
          }
          0 < re.length && ((z = new B(z, ne, null, l, q)), X.push({ event: z, listeners: re }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((z = e === 'mouseover' || e === 'pointerover'),
            (B = e === 'mouseout' || e === 'pointerout'),
            z && l !== zs && (ne = l.relatedTarget || l.fromElement) && (zn(ne) || ne[Dn]))
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
              (T = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((re = _f), ($ = 'onPointerLeave'), (M = 'onPointerEnter'), (T = 'pointer')),
              (He = B == null ? z : Da(B)),
              (O = ne == null ? z : Da(ne)),
              (z = new re($, T + 'leave', B, l, q)),
              (z.target = He),
              (z.relatedTarget = O),
              ($ = null),
              zn(q) === D &&
                ((re = new re(M, T + 'enter', ne, l, q)),
                (re.target = O),
                (re.relatedTarget = He),
                ($ = re)),
              (He = $),
              B && ne)
            )
              t: {
                for (re = M_, M = B, T = ne, O = 0, $ = M; $; $ = re($)) O++;
                $ = 0;
                for (var se = T; se; se = re(se)) $++;
                for (; 0 < O - $; ) ((M = re(M)), O--);
                for (; 0 < $ - O; ) ((T = re(T)), $--);
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
            (B !== null && oh(X, z, B, re, !1),
              ne !== null && He !== null && oh(X, He, ne, re, !0));
          }
        }
        e: {
          if (
            ((z = D ? Da(D) : window),
            (B = z.nodeName && z.nodeName.toLowerCase()),
            B === 'select' || (B === 'input' && z.type === 'file'))
          )
            var je = kf;
          else if (Tf(z))
            if (Af) je = Gg;
            else {
              je = qg;
              var ie = Ug;
            }
          else
            ((B = z.nodeName),
              !B || B.toLowerCase() !== 'input' || (z.type !== 'checkbox' && z.type !== 'radio')
                ? D && Ds(D.elementType) && (je = kf)
                : (je = Hg));
          if (je && (je = je(e, D))) {
            Nf(X, je, l, q);
            break e;
          }
          (ie && ie(e, z, D),
            e === 'focusout' &&
              D &&
              z.type === 'number' &&
              D.memoizedProps.value != null &&
              Os(z, 'number', z.value));
        }
        switch (((ie = D ? Da(D) : window), e)) {
          case 'focusin':
            (Tf(ie) || ie.contentEditable === 'true') && ((Xn = ie), (Ks = D), ($a = null));
            break;
          case 'focusout':
            $a = Ks = Xn = null;
            break;
          case 'mousedown':
            Is = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((Is = !1), zf(X, l, q));
            break;
          case 'selectionchange':
            if ($g) break;
          case 'keydown':
          case 'keyup':
            zf(X, l, q);
        }
        var ve;
        if (Xs)
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
              : ((Ul = q), (qs = 'value' in Ul ? Ul.value : Ul.textContent), ($n = !0))),
          (ie = Uu(D, ke)),
          0 < ie.length &&
            ((ke = new gf(ke, e, null, l, q)),
            X.push({ event: ke, listeners: ie }),
            ve ? (ke.data = ve) : ((ve = Ef(l)), ve !== null && (ke.data = ve)))),
          (ve = Og ? Dg(e, l) : zg(e, l)) &&
            ((ke = Uu(D, 'onBeforeInput')),
            0 < ke.length &&
              ((ie = new gf('onBeforeInput', 'beforeinput', null, l, q)),
              X.push({ event: ie, listeners: ke }),
              (ie.data = ve))),
          k_(X, e, D, l, q));
      }
      sh(X, t);
    });
  }
  function hi(e, t, l) {
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
          ((u = za(e, l)),
          u != null && n.unshift(hi(e, u, c)),
          (u = za(e, t)),
          u != null && n.push(hi(e, u, c))),
        e.tag === 3)
      )
        return n;
      e = e.return;
    }
    return [];
  }
  function M_(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function oh(e, t, l, n, u) {
    for (var c = t._reactName, f = []; l !== null && l !== n; ) {
      var p = l,
        x = p.alternate,
        D = p.stateNode;
      if (((p = p.tag), x !== null && x === n)) break;
      ((p !== 5 && p !== 26 && p !== 27) ||
        D === null ||
        ((x = D),
        u
          ? ((D = za(l, c)), D != null && f.unshift(hi(l, D, x)))
          : u || ((D = za(l, c)), D != null && f.push(hi(l, D, x)))),
        (l = l.return));
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var R_ = /\r\n?/g,
    w_ = /\u0000|\uFFFD/g;
  function rh(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        R_,
        `
`
      )
      .replace(w_, '');
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
        n != null && (e.onclick = hl);
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
        ml(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', n);
        break;
      case 'xlinkArcrole':
        ml(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', n);
        break;
      case 'xlinkRole':
        ml(e, 'http://www.w3.org/1999/xlink', 'xlink:role', n);
        break;
      case 'xlinkShow':
        ml(e, 'http://www.w3.org/1999/xlink', 'xlink:show', n);
        break;
      case 'xlinkTitle':
        ml(e, 'http://www.w3.org/1999/xlink', 'xlink:title', n);
        break;
      case 'xlinkType':
        ml(e, 'http://www.w3.org/1999/xlink', 'xlink:type', n);
        break;
      case 'xmlBase':
        ml(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', n);
        break;
      case 'xmlLang':
        ml(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', n);
        break;
      case 'xmlSpace':
        ml(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', n);
        break;
      case 'is':
        Gi(e, 'is', n);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < l.length) || (l[0] !== 'o' && l[0] !== 'O') || (l[1] !== 'n' && l[1] !== 'N')) &&
          ((l = ug.get(l) || l), Gi(e, l, n));
    }
  }
  function So(e, t, l, n, u, c) {
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
        n != null && (e.onclick = hl);
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
          x = null,
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
                  x = q;
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
        sf(e, c, p, x, D, f, u, !1);
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
        for (x in l)
          if (l.hasOwnProperty(x) && ((n = l[x]), n != null))
            switch (x) {
              case 'selected':
                e.selected = n && typeof n != 'function' && typeof n != 'symbol';
                break;
              default:
                qe(e, t, x, n, l, null);
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
        for (n = 0; n < mi.length; n++) xe(mi[n], e);
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
        if (Ds(t)) {
          for (q in l)
            l.hasOwnProperty(q) && ((n = l[q]), n !== void 0 && So(e, t, q, n, l, void 0));
          return;
        }
    }
    for (p in l) l.hasOwnProperty(p) && ((n = l[p]), n != null && qe(e, t, p, n, l, null));
  }
  function O_(e, t, l, n) {
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
          x = null,
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
                x = X;
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
        ws(e, f, p, x, D, q, c, u);
        return;
      case 'select':
        B = f = p = z = null;
        for (c in l)
          if (((x = l[c]), l.hasOwnProperty(c) && x != null))
            switch (c) {
              case 'value':
                break;
              case 'multiple':
                B = x;
              default:
                n.hasOwnProperty(c) || qe(e, t, c, null, n, x);
            }
        for (u in n)
          if (((c = n[u]), (x = l[u]), n.hasOwnProperty(u) && (c != null || x != null)))
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
                c !== x && qe(e, t, u, c, n, x);
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
        for (x in n)
          if (((z = n[x]), (B = l[x]), n.hasOwnProperty(x) && z !== B && (z != null || B != null)))
            switch (x) {
              case 'selected':
                e.selected = z && typeof z != 'function' && typeof z != 'symbol';
                break;
              default:
                qe(e, t, x, z, n, B);
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
        if (Ds(t)) {
          for (var He in l)
            ((z = l[He]),
              l.hasOwnProperty(He) &&
                z !== void 0 &&
                !n.hasOwnProperty(He) &&
                So(e, t, He, void 0, n, z));
          for (q in n)
            ((z = n[q]),
              (B = l[q]),
              !n.hasOwnProperty(q) ||
                z === B ||
                (z === void 0 && B === void 0) ||
                So(e, t, q, z, n, B));
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
  function D_() {
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
            var x = l[n],
              D = x.startTime;
            if (D > p) break;
            var q = x.transferSize,
              X = x.initiatorType;
            q && dh(X) && ((x = x.responseEnd), (f += q * (x < p ? 1 : (p - D) / (x - D))));
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
  var xo = null,
    Eo = null;
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
  function To(e, t) {
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
  var No = null;
  function z_() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === No ? !1 : ((No = e), !0)) : ((No = null), !1);
  }
  var ph = typeof setTimeout == 'function' ? setTimeout : void 0,
    B_ = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    yh = typeof Promise == 'function' ? Promise : void 0,
    L_ =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof yh < 'u'
          ? function (e) {
              return yh.resolve(null).then(e).catch(U_);
            }
          : ph;
  function U_(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function tn(e) {
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
        else if (l === 'html') pi(e.ownerDocument.documentElement);
        else if (l === 'head') {
          ((l = e.ownerDocument.head), pi(l));
          for (var c = l.firstChild; c; ) {
            var f = c.nextSibling,
              p = c.nodeName;
            (c[Oa] ||
              p === 'SCRIPT' ||
              p === 'STYLE' ||
              (p === 'LINK' && c.rel.toLowerCase() === 'stylesheet') ||
              l.removeChild(c),
              (c = f));
          }
        } else l === 'body' && pi(e.ownerDocument.body);
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
  function ko(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (((t = t.nextSibling), l.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (ko(l), Ms(l));
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
  function q_(e, t, l, n) {
    for (; e.nodeType === 1; ) {
      var u = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!n && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (n) {
        if (!e[Oa])
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
      if (((e = Qt(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function H_(e, t, l) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !l) ||
        ((e = Qt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function vh(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = Qt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Ao(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function Co(e) {
    return e.data === '$!' || (e.data === '$?' && e.ownerDocument.readyState !== 'loading');
  }
  function G_(e, t) {
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
  function Qt(e) {
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
  var jo = null;
  function bh(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === '/$' || l === '/&') {
          if (t === 0) return Qt(e.nextSibling);
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
  function pi(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    Ms(e);
  }
  var Zt = new Map(),
    Eh = new Set();
  function Hu(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var Ml = K.d;
  K.d = { f: Y_, r: $_, D: X_, C: V_, L: Q_, m: Z_, X: I_, S: K_, M: J_ };
  function Y_() {
    var e = Ml.f(),
      t = Ru();
    return e || t;
  }
  function $_(e) {
    var t = Bn(e);
    t !== null && t.tag === 5 && t.type === 'form' ? Hd(t) : Ml.r(e);
  }
  var ha = typeof document > 'u' ? null : document;
  function Th(e, t, l) {
    var n = ha;
    if (n && typeof t == 'string' && t) {
      var u = qt(t);
      ((u = 'link[rel="' + e + '"][href="' + u + '"]'),
        typeof l == 'string' && (u += '[crossorigin="' + l + '"]'),
        Eh.has(u) ||
          (Eh.add(u),
          (e = { rel: e, crossOrigin: l, href: t }),
          n.querySelector(u) === null &&
            ((t = n.createElement('link')), mt(t, 'link', e), st(t), n.head.appendChild(t))));
    }
  }
  function X_(e) {
    (Ml.D(e), Th('dns-prefetch', e, null));
  }
  function V_(e, t) {
    (Ml.C(e, t), Th('preconnect', e, t));
  }
  function Q_(e, t, l) {
    Ml.L(e, t, l);
    var n = ha;
    if (n && e && t) {
      var u = 'link[rel="preload"][as="' + qt(t) + '"]';
      t === 'image' && l && l.imageSrcSet
        ? ((u += '[imagesrcset="' + qt(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == 'string' && (u += '[imagesizes="' + qt(l.imageSizes) + '"]'))
        : (u += '[href="' + qt(e) + '"]');
      var c = u;
      switch (t) {
        case 'style':
          c = pa(e);
          break;
        case 'script':
          c = ya(e);
      }
      Zt.has(c) ||
        ((e = b(
          { rel: 'preload', href: t === 'image' && l && l.imageSrcSet ? void 0 : e, as: t },
          l
        )),
        Zt.set(c, e),
        n.querySelector(u) !== null ||
          (t === 'style' && n.querySelector(yi(c))) ||
          (t === 'script' && n.querySelector(gi(c))) ||
          ((t = n.createElement('link')), mt(t, 'link', e), st(t), n.head.appendChild(t)));
    }
  }
  function Z_(e, t) {
    Ml.m(e, t);
    var l = ha;
    if (l && e) {
      var n = t && typeof t.as == 'string' ? t.as : 'script',
        u = 'link[rel="modulepreload"][as="' + qt(n) + '"][href="' + qt(e) + '"]',
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
        !Zt.has(c) &&
        ((e = b({ rel: 'modulepreload', href: e }, t)), Zt.set(c, e), l.querySelector(u) === null)
      ) {
        switch (n) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (l.querySelector(gi(c))) return;
        }
        ((n = l.createElement('link')), mt(n, 'link', e), st(n), l.head.appendChild(n));
      }
    }
  }
  function K_(e, t, l) {
    Ml.S(e, t, l);
    var n = ha;
    if (n && e) {
      var u = Ln(n).hoistableStyles,
        c = pa(e);
      t = t || 'default';
      var f = u.get(c);
      if (!f) {
        var p = { loading: 0, preload: null };
        if ((f = n.querySelector(yi(c)))) p.loading = 5;
        else {
          ((e = b({ rel: 'stylesheet', href: e, 'data-precedence': t }, l)),
            (l = Zt.get(c)) && Mo(e, l));
          var x = (f = n.createElement('link'));
          (st(x),
            mt(x, 'link', e),
            (x._p = new Promise(function (D, q) {
              ((x.onload = D), (x.onerror = q));
            })),
            x.addEventListener('load', function () {
              p.loading |= 1;
            }),
            x.addEventListener('error', function () {
              p.loading |= 2;
            }),
            (p.loading |= 4),
            Gu(f, t, n));
        }
        ((f = { type: 'stylesheet', instance: f, count: 1, state: p }), u.set(c, f));
      }
    }
  }
  function I_(e, t) {
    Ml.X(e, t);
    var l = ha;
    if (l && e) {
      var n = Ln(l).hoistableScripts,
        u = ya(e),
        c = n.get(u);
      c ||
        ((c = l.querySelector(gi(u))),
        c ||
          ((e = b({ src: e, async: !0 }, t)),
          (t = Zt.get(u)) && Ro(e, t),
          (c = l.createElement('script')),
          st(c),
          mt(c, 'link', e),
          l.head.appendChild(c)),
        (c = { type: 'script', instance: c, count: 1, state: null }),
        n.set(u, c));
    }
  }
  function J_(e, t) {
    Ml.M(e, t);
    var l = ha;
    if (l && e) {
      var n = Ln(l).hoistableScripts,
        u = ya(e),
        c = n.get(u);
      c ||
        ((c = l.querySelector(gi(u))),
        c ||
          ((e = b({ src: e, async: !0, type: 'module' }, t)),
          (t = Zt.get(u)) && Ro(e, t),
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
              (c = u.querySelector(yi(e))) && !c._p && ((f.instance = c), (f.state.loading = 5)),
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
                c || W_(u, e, l, f.state))),
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
    return 'href="' + qt(e) + '"';
  }
  function yi(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function kh(e) {
    return b({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function W_(e, t, l, n) {
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
    return '[src="' + qt(e) + '"]';
  }
  function gi(e) {
    return 'script[async]' + e;
  }
  function Ah(e, t, l) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var n = e.querySelector('style[data-href~="' + qt(l.href) + '"]');
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
          var c = e.querySelector(yi(u));
          if (c) return ((t.state.loading |= 4), (t.instance = c), st(c), c);
          ((n = kh(l)),
            (u = Zt.get(u)) && Mo(n, u),
            (c = (e.ownerDocument || e).createElement('link')),
            st(c));
          var f = c;
          return (
            (f._p = new Promise(function (p, x) {
              ((f.onload = p), (f.onerror = x));
            })),
            mt(c, 'link', n),
            (t.state.loading |= 4),
            Gu(c, l.precedence, e),
            (t.instance = c)
          );
        case 'script':
          return (
            (c = ya(l.src)),
            (u = e.querySelector(gi(c)))
              ? ((t.instance = u), st(u), u)
              : ((n = l),
                (u = Zt.get(c)) && ((n = b({}, l)), Ro(n, u)),
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
  function Mo(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function Ro(e, t) {
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
        !(c[Oa] || c[ot] || (e === 'link' && c.getAttribute('rel') === 'stylesheet')) &&
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
  function F_(e, t, l) {
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
  function P_(e, t, l, n) {
    if (
      l.type === 'stylesheet' &&
      (typeof n.media != 'string' || matchMedia(n.media).matches !== !1) &&
      (l.state.loading & 4) === 0
    ) {
      if (l.instance === null) {
        var u = pa(n.href),
          c = t.querySelector(yi(u));
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
          (u = Zt.get(u)) && Mo(n, u),
          (c = c.createElement('link')),
          st(c));
        var f = c;
        ((f._p = new Promise(function (p, x) {
          ((f.onload = p), (f.onerror = x));
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
  var wo = 0;
  function e0(e, t) {
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
            0 < e.imgBytes && wo === 0 && (wo = 62500 * D_());
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
              (e.imgBytes > wo ? 50 : 800) + t
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
        (e.count++, (Xu = new Map()), t.forEach(t0, e), (Xu = null), $u.call(e)));
  }
  function t0(e, t) {
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
  var _i = {
    $$typeof: V,
    Provider: null,
    Consumer: null,
    _currentValue: te,
    _currentValue2: te,
    _threadCount: 0,
  };
  function l0(e, t, l, n, u, c, f, p, x) {
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
      (this.expirationTimes = ks(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = ks(0)),
      (this.hiddenUpdates = ks(null)),
      (this.identifierPrefix = n),
      (this.onUncaughtError = u),
      (this.onCaughtError = c),
      (this.onRecoverableError = f),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = x),
      (this.incompleteTransitions = new Map()));
  }
  function Rh(e, t, l, n, u, c, f, p, x, D, q, X) {
    return (
      (e = new l0(e, t, l, f, x, D, q, X, p)),
      (t = 1),
      c === !0 && (t |= 24),
      (c = Rt(3, null, null, t)),
      (e.current = c),
      (c.stateNode = e),
      (t = rc()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (c.memoizedState = { element: n, isDehydrated: l, cache: t }),
      hc(c),
      e
    );
  }
  function wh(e) {
    return e ? ((e = Zn), e) : Zn;
  }
  function Oh(e, t, l, n, u, c) {
    ((u = wh(u)),
      n.context === null ? (n.context = u) : (n.pendingContext = u),
      (n = Xl(t)),
      (n.payload = { element: l }),
      (c = c === void 0 ? null : c),
      c !== null && (n.callback = c),
      (l = Vl(e, n, t)),
      l !== null && (kt(l, e, t), Ja(l, e, t)));
  }
  function Dh(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function Oo(e, t) {
    (Dh(e, t), (e = e.alternate) && Dh(e, t));
  }
  function zh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = _n(e, 67108864);
      (t !== null && kt(t, e, 67108864), Oo(e, 67108864));
    }
  }
  function Bh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Bt();
      t = As(t);
      var l = _n(e, t);
      (l !== null && kt(l, e, t), Oo(e, t));
    }
  }
  var Qu = !0;
  function n0(e, t, l, n) {
    var u = L.T;
    L.T = null;
    var c = K.p;
    try {
      ((K.p = 2), Do(e, t, l, n));
    } finally {
      ((K.p = c), (L.T = u));
    }
  }
  function a0(e, t, l, n) {
    var u = L.T;
    L.T = null;
    var c = K.p;
    try {
      ((K.p = 8), Do(e, t, l, n));
    } finally {
      ((K.p = c), (L.T = u));
    }
  }
  function Do(e, t, l, n) {
    if (Qu) {
      var u = zo(n);
      if (u === null) (bo(e, t, n, Zu, l), Uh(e, n));
      else if (u0(u, e, t, l, n)) n.stopPropagation();
      else if ((Uh(e, n), t & 4 && -1 < i0.indexOf(e))) {
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
                      var x = 1 << (31 - jt(f));
                      ((p.entanglements[1] |= x), (f &= ~x));
                    }
                    (ol(c), (we & 6) === 0 && ((ju = At() + 500), di(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((p = _n(c, 2)), p !== null && kt(p, c, 2), Ru(), Oo(c, 2));
            }
          if (((c = zo(n)), c === null && bo(e, t, n, Zu, l), c === u)) break;
          u = c;
        }
        u !== null && n.stopPropagation();
      } else bo(e, t, n, null, l);
    }
  }
  function zo(e) {
    return ((e = Bs(e)), Bo(e));
  }
  var Zu = null;
  function Bo(e) {
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
        switch (Xy()) {
          case Xr:
            return 2;
          case Vr:
            return 8;
          case Bi:
          case Vy:
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
  var Lo = !1,
    ln = null,
    nn = null,
    an = null,
    vi = new Map(),
    bi = new Map(),
    un = [],
    i0 =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function Uh(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        ln = null;
        break;
      case 'dragenter':
      case 'dragleave':
        nn = null;
        break;
      case 'mouseover':
      case 'mouseout':
        an = null;
        break;
      case 'pointerover':
      case 'pointerout':
        vi.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        bi.delete(t.pointerId);
    }
  }
  function Si(e, t, l, n, u, c) {
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
  function u0(e, t, l, n, u) {
    switch (t) {
      case 'focusin':
        return ((ln = Si(ln, e, t, l, n, u)), !0);
      case 'dragenter':
        return ((nn = Si(nn, e, t, l, n, u)), !0);
      case 'mouseover':
        return ((an = Si(an, e, t, l, n, u)), !0);
      case 'pointerover':
        var c = u.pointerId;
        return (vi.set(c, Si(vi.get(c) || null, e, t, l, n, u)), !0);
      case 'gotpointercapture':
        return ((c = u.pointerId), bi.set(c, Si(bi.get(c) || null, e, t, l, n, u)), !0);
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
      var l = zo(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var n = new l.constructor(l.type, l);
        ((zs = n), l.target.dispatchEvent(n), (zs = null));
      } else return ((t = Bn(l)), t !== null && zh(t), (e.blockedOn = l), !1);
      t.shift();
    }
    return !0;
  }
  function Hh(e, t, l) {
    Ku(e) && l.delete(t);
  }
  function s0() {
    ((Lo = !1),
      ln !== null && Ku(ln) && (ln = null),
      nn !== null && Ku(nn) && (nn = null),
      an !== null && Ku(an) && (an = null),
      vi.forEach(Hh),
      bi.forEach(Hh));
  }
  function Iu(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Lo || ((Lo = !0), a.unstable_scheduleCallback(a.unstable_NormalPriority, s0)));
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
            if (Bo(n || l) === null) continue;
            break;
          }
          var c = Bn(l);
          c !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Dc(c, { pending: !0, data: u, method: l.method, action: n }, n, u));
        }
      }));
  }
  function ga(e) {
    function t(x) {
      return Iu(x, e);
    }
    (ln !== null && Iu(ln, e),
      nn !== null && Iu(nn, e),
      an !== null && Iu(an, e),
      vi.forEach(t),
      bi.forEach(t));
    for (var l = 0; l < un.length; l++) {
      var n = un[l];
      n.blockedOn === e && (n.blockedOn = null);
    }
    for (; 0 < un.length && ((l = un[0]), l.blockedOn === null); )
      (qh(l), l.blockedOn === null && un.shift());
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
            else if (Bo(u) !== null) continue;
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
  function Uo(e) {
    this._internalRoot = e;
  }
  ((Wu.prototype.render = Uo.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(s(409));
      var l = t.current,
        n = Bt();
      Oh(l, n, e, t, null, null);
    }),
    (Wu.prototype.unmount = Uo.prototype.unmount =
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
      for (var l = 0; l < un.length && t !== 0 && t < un[l].priority; l++);
      (un.splice(l, 0, e), l === 0 && qh(e));
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
  var c0 = {
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
        ((Ma = Fu.inject(c0)), (Ct = Fu));
      } catch {}
  }
  return (
    (Ei.createRoot = function (e, t) {
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
        vo(e),
        new Uo(t)
      );
    }),
    (Ei.hydrateRoot = function (e, t, l) {
      if (!r(e)) throw Error(s(299));
      var n = !1,
        u = '',
        c = Jd,
        f = Wd,
        p = Fd,
        x = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (n = !0),
          l.identifierPrefix !== void 0 && (u = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (c = l.onUncaughtError),
          l.onCaughtError !== void 0 && (f = l.onCaughtError),
          l.onRecoverableError !== void 0 && (p = l.onRecoverableError),
          l.formState !== void 0 && (x = l.formState)),
        (t = Rh(e, 1, !0, t, l ?? null, n, u, x, c, f, p, Yh)),
        (t.context = wh(null)),
        (l = t.current),
        (n = Bt()),
        (n = As(n)),
        (u = Xl(n)),
        (u.callback = null),
        Vl(l, u, n),
        (l = n),
        (t.current.lanes = l),
        wa(t, l),
        ol(t),
        (e[Dn] = t.current),
        vo(e),
        new Wu(t)
      );
    }),
    (Ei.version = '19.2.5'),
    Ei
  );
}
var Ph;
function b0() {
  if (Ph) return Go.exports;
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
  return (a(), (Go.exports = v0()), Go.exports);
}
var S0 = b0(),
  N = vr();
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
function x0(a = {}) {
  function i(s, r) {
    var y;
    let d = (y = r.state) == null ? void 0 : y.masked,
      { pathname: h, search: v, hash: g } = d || s.location;
    return ur(
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
  return T0(i, o, null, a);
}
function Ze(a, i) {
  if (a === !1 || a === null || typeof a > 'u') throw new Error(i);
}
function ll(a, i) {
  if (!a) {
    typeof console < 'u' && console.warn(i);
    try {
      throw new Error(i);
    } catch {}
  }
}
function E0() {
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
function ur(a, i, o = null, s, r) {
  return {
    pathname: typeof a == 'string' ? a : a.pathname,
    search: '',
    hash: '',
    ...(typeof i == 'string' ? Na(i) : i),
    state: o,
    key: (i && i.key) || s || E0(),
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
function Na(a) {
  let i = {};
  if (a) {
    let o = a.indexOf('#');
    o >= 0 && ((i.hash = a.substring(o)), (a = a.substring(0, o)));
    let s = a.indexOf('?');
    (s >= 0 && ((i.search = a.substring(s)), (a = a.substring(0, s))), a && (i.pathname = a));
  }
  return i;
}
function T0(a, i, o, s = {}) {
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
  function E(j, A) {
    v = 'PUSH';
    let k = tp(j) ? j : ur(w.location, j, A);
    y = _() + 1;
    let V = lp(k, y),
      P = w.createHref(k.unstable_mask || k);
    try {
      h.pushState(V, '', P);
    } catch (ee) {
      if (ee instanceof DOMException && ee.name === 'DataCloneError') throw ee;
      r.location.assign(P);
    }
    d && g && g({ action: v, location: w.location, delta: 1 });
  }
  function R(j, A) {
    v = 'REPLACE';
    let k = tp(j) ? j : ur(w.location, j, A);
    y = _();
    let V = lp(k, y),
      P = w.createHref(k.unstable_mask || k);
    (h.replaceState(V, '', P), d && g && g({ action: v, location: w.location, delta: 0 }));
  }
  function S(j) {
    return N0(j);
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
    push: E,
    replace: R,
    go(j) {
      return h.go(j);
    },
  };
  return w;
}
function N0(a, i = !1) {
  let o = 'http://localhost';
  (typeof window < 'u' &&
    (o = window.location.origin !== 'null' ? window.location.origin : window.location.href),
    Ze(o, 'No window.location.(origin|href) available to create URL'));
  let s = typeof a == 'string' ? a : Mi(a);
  return ((s = s.replace(/ $/, '%20')), !i && s.startsWith('//') && (s = o + s), new URL(s, o));
}
function jp(a, i, o = '/') {
  return k0(a, i, o, !1);
}
function k0(a, i, o, s) {
  let r = typeof i == 'string' ? Na(i) : i,
    d = Dl(r.pathname || '/', o);
  if (d == null) return null;
  let h = Mp(a);
  A0(h);
  let v = null;
  for (let g = 0; v == null && g < h.length; ++g) {
    let y = U0(d);
    v = B0(h[g], y, s);
  }
  return v;
}
function Mp(a, i = [], o = [], s = '', r = !1) {
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
    let b = tl([s, _.relativePath]),
      E = o.concat(_);
    (h.children &&
      h.children.length > 0 &&
      (Ze(
        h.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${b}".`
      ),
      Mp(h.children, i, E, b, g)),
      !(h.path == null && !h.index) && i.push({ path: b, score: D0(b, h.index), routesMeta: E }));
  };
  return (
    a.forEach((h, v) => {
      var g;
      if (h.path === '' || !((g = h.path) != null && g.includes('?'))) d(h, v);
      else for (let y of Rp(h.path)) d(h, v, !0, y);
    }),
    i
  );
}
function Rp(a) {
  let i = a.split('/');
  if (i.length === 0) return [];
  let [o, ...s] = i,
    r = o.endsWith('?'),
    d = o.replace(/\?$/, '');
  if (s.length === 0) return r ? [d, ''] : [d];
  let h = Rp(s.join('/')),
    v = [];
  return (
    v.push(...h.map((g) => (g === '' ? d : [d, g].join('/')))),
    r && v.push(...h),
    v.map((g) => (a.startsWith('/') && g === '' ? '/' : g))
  );
}
function A0(a) {
  a.sort((i, o) =>
    i.score !== o.score
      ? o.score - i.score
      : z0(
          i.routesMeta.map((s) => s.childrenIndex),
          o.routesMeta.map((s) => s.childrenIndex)
        )
  );
}
var C0 = /^:[\w-]+$/,
  j0 = 3,
  M0 = 2,
  R0 = 1,
  w0 = 10,
  O0 = -2,
  np = (a) => a === '*';
function D0(a, i) {
  let o = a.split('/'),
    s = o.length;
  return (
    o.some(np) && (s += O0),
    i && (s += M0),
    o.filter((r) => !np(r)).reduce((r, d) => r + (C0.test(d) ? j0 : d === '' ? R0 : w0), s)
  );
}
function z0(a, i) {
  return a.length === i.length && a.slice(0, -1).every((s, r) => s === i[r])
    ? a[a.length - 1] - i[i.length - 1]
    : 0;
}
function B0(a, i, o = !1) {
  let { routesMeta: s } = a,
    r = {},
    d = '/',
    h = [];
  for (let v = 0; v < s.length; ++v) {
    let g = s[v],
      y = v === s.length - 1,
      _ = d === '/' ? i : i.slice(d.length) || '/',
      b = ss({ path: g.relativePath, caseSensitive: g.caseSensitive, end: y }, _),
      E = g.route;
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
        pathname: tl([d, b.pathname]),
        pathnameBase: Y0(tl([d, b.pathnameBase])),
        route: E,
      }),
      b.pathnameBase !== '/' && (d = tl([d, b.pathnameBase])));
  }
  return h;
}
function ss(a, i) {
  typeof a == 'string' && (a = { path: a, caseSensitive: !1, end: !0 });
  let [o, s] = L0(a.path, a.caseSensitive, a.end),
    r = i.match(o);
  if (!r) return null;
  let d = r[0],
    h = d.replace(/(.)\/+$/, '$1'),
    v = r.slice(1);
  return {
    params: s.reduce((y, { paramName: _, isOptional: b }, E) => {
      if (_ === '*') {
        let S = v[E] || '';
        h = d.slice(0, d.length - S.length).replace(/(.)\/+$/, '$1');
      }
      const R = v[E];
      return (b && !R ? (y[_] = void 0) : (y[_] = (R || '').replace(/%2F/g, '/')), y);
    }, {}),
    pathname: d,
    pathnameBase: h,
    pattern: a,
  };
}
function L0(a, i = !1, o = !0) {
  ll(
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
function U0(a) {
  try {
    return a
      .split('/')
      .map((i) => decodeURIComponent(i).replace(/\//g, '%2F'))
      .join('/');
  } catch (i) {
    return (
      ll(
        !1,
        `The URL path "${a}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${i}).`
      ),
      a
    );
  }
}
function Dl(a, i) {
  if (i === '/') return a;
  if (!a.toLowerCase().startsWith(i.toLowerCase())) return null;
  let o = i.endsWith('/') ? i.length - 1 : i.length,
    s = a.charAt(o);
  return s && s !== '/' ? null : a.slice(o) || '/';
}
var q0 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function H0(a, i = '/') {
  let { pathname: o, search: s = '', hash: r = '' } = typeof a == 'string' ? Na(a) : a,
    d;
  return (
    o ? ((o = wp(o)), o.startsWith('/') ? (d = ap(o.substring(1), '/')) : (d = ap(o, i))) : (d = i),
    { pathname: d, search: $0(s), hash: X0(r) }
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
function Qo(a, i, o, s) {
  return `Cannot include a '${a}' character in a manually specified \`to.${i}\` field [${JSON.stringify(s)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function G0(a) {
  return a.filter((i, o) => o === 0 || (i.route.path && i.route.path.length > 0));
}
function br(a) {
  let i = G0(a);
  return i.map((o, s) => (s === i.length - 1 ? o.pathname : o.pathnameBase));
}
function hs(a, i, o, s = !1) {
  let r;
  typeof a == 'string'
    ? (r = Na(a))
    : ((r = { ...a }),
      Ze(!r.pathname || !r.pathname.includes('?'), Qo('?', 'pathname', 'search', r)),
      Ze(!r.pathname || !r.pathname.includes('#'), Qo('#', 'pathname', 'hash', r)),
      Ze(!r.search || !r.search.includes('#'), Qo('#', 'search', 'hash', r)));
  let d = a === '' || r.pathname === '',
    h = d ? '/' : r.pathname,
    v;
  if (h == null) v = o;
  else {
    let b = i.length - 1;
    if (!s && h.startsWith('..')) {
      let E = h.split('/');
      for (; E[0] === '..'; ) (E.shift(), (b -= 1));
      r.pathname = E.join('/');
    }
    v = b >= 0 ? i[b] : '/';
  }
  let g = H0(r, v),
    y = h && h !== '/' && h.endsWith('/'),
    _ = (d || h === '.') && o.endsWith('/');
  return (!g.pathname.endsWith('/') && (y || _) && (g.pathname += '/'), g);
}
var wp = (a) => a.replace(/\/\/+/g, '/'),
  tl = (a) => wp(a.join('/')),
  cs = (a) => a.replace(/\/+$/, ''),
  Y0 = (a) => cs(a).replace(/^\/*/, '/'),
  $0 = (a) => (!a || a === '?' ? '' : a.startsWith('?') ? a : '?' + a),
  X0 = (a) => (!a || a === '#' ? '' : a.startsWith('#') ? a : '#' + a),
  V0 = class {
    constructor(a, i, o, s = !1) {
      ((this.status = a),
        (this.statusText = i || ''),
        (this.internal = s),
        o instanceof Error ? ((this.data = o.toString()), (this.error = o)) : (this.data = o));
    }
  };
function Q0(a) {
  return (
    a != null &&
    typeof a.status == 'number' &&
    typeof a.statusText == 'string' &&
    typeof a.internal == 'boolean' &&
    'data' in a
  );
}
function Z0(a) {
  let i = a.map((o) => o.route.path).filter(Boolean);
  return tl(i) || '/';
}
var Op =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
function Dp(a, i) {
  let o = a;
  if (typeof o != 'string' || !q0.test(o)) return { absoluteURL: void 0, isExternal: !1, to: o };
  let s = o,
    r = !1;
  if (Op)
    try {
      let d = new URL(window.location.href),
        h = o.startsWith('//') ? new URL(d.protocol + o) : new URL(o),
        v = Dl(h.pathname, i);
      h.origin === d.origin && v != null ? (o = v + h.search + h.hash) : (r = !0);
    } catch {
      ll(
        !1,
        `<Link to="${o}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: s, isExternal: r, to: o };
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
var zp = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(zp);
var K0 = ['GET', ...zp];
new Set(K0);
var ka = N.createContext(null);
ka.displayName = 'DataRouter';
var ps = N.createContext(null);
ps.displayName = 'DataRouterState';
var Bp = N.createContext(!1);
function I0() {
  return N.useContext(Bp);
}
var Lp = N.createContext({ isTransitioning: !1 });
Lp.displayName = 'ViewTransition';
var J0 = N.createContext(new Map());
J0.displayName = 'Fetchers';
var W0 = N.createContext(null);
W0.displayName = 'Await';
var Lt = N.createContext(null);
Lt.displayName = 'Navigation';
var Oi = N.createContext(null);
Oi.displayName = 'Location';
var al = N.createContext({ outlet: null, matches: [], isDataRoute: !1 });
al.displayName = 'Route';
var Sr = N.createContext(null);
Sr.displayName = 'RouteError';
var Up = 'REACT_ROUTER_ERROR',
  F0 = 'REDIRECT',
  P0 = 'ROUTE_ERROR_RESPONSE';
function ev(a) {
  if (a.startsWith(`${Up}:${F0}:{`))
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
function tv(a) {
  if (a.startsWith(`${Up}:${P0}:{`))
    try {
      let i = JSON.parse(a.slice(40));
      if (
        typeof i == 'object' &&
        i &&
        typeof i.status == 'number' &&
        typeof i.statusText == 'string'
      )
        return new V0(i.status, i.statusText, i.data);
    } catch {}
}
function lv(a, { relative: i } = {}) {
  Ze(Aa(), 'useHref() may be used only in the context of a <Router> component.');
  let { basename: o, navigator: s } = N.useContext(Lt),
    { hash: r, pathname: d, search: h } = Di(a, { relative: i }),
    v = d;
  return (
    o !== '/' && (v = d === '/' ? o : tl([o, d])),
    s.createHref({ pathname: v, search: h, hash: r })
  );
}
function Aa() {
  return N.useContext(Oi) != null;
}
function dl() {
  return (
    Ze(Aa(), 'useLocation() may be used only in the context of a <Router> component.'),
    N.useContext(Oi).location
  );
}
var qp =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function Hp(a) {
  N.useContext(Lt).static || N.useLayoutEffect(a);
}
function il() {
  let { isDataRoute: a } = N.useContext(al);
  return a ? yv() : nv();
}
function nv() {
  Ze(Aa(), 'useNavigate() may be used only in the context of a <Router> component.');
  let a = N.useContext(ka),
    { basename: i, navigator: o } = N.useContext(Lt),
    { matches: s } = N.useContext(al),
    { pathname: r } = dl(),
    d = JSON.stringify(br(s)),
    h = N.useRef(!1);
  return (
    Hp(() => {
      h.current = !0;
    }),
    N.useCallback(
      (g, y = {}) => {
        if ((ll(h.current, qp), !h.current)) return;
        if (typeof g == 'number') {
          o.go(g);
          return;
        }
        let _ = hs(g, JSON.parse(d), r, y.relative === 'path');
        (a == null && i !== '/' && (_.pathname = _.pathname === '/' ? i : tl([i, _.pathname])),
          (y.replace ? o.replace : o.push)(_, y.state, y));
      },
      [i, o, d, r, a]
    )
  );
}
N.createContext(null);
function av() {
  let { matches: a } = N.useContext(al),
    i = a[a.length - 1];
  return (i == null ? void 0 : i.params) ?? {};
}
function Di(a, { relative: i } = {}) {
  let { matches: o } = N.useContext(al),
    { pathname: s } = dl(),
    r = JSON.stringify(br(o));
  return N.useMemo(() => hs(a, JSON.parse(r), s, i === 'path'), [a, r, s, i]);
}
function iv(a, i) {
  return Gp(a, i);
}
function Gp(a, i, o) {
  var j;
  Ze(Aa(), 'useRoutes() may be used only in the context of a <Router> component.');
  let { navigator: s } = N.useContext(Lt),
    { matches: r } = N.useContext(al),
    d = r[r.length - 1],
    h = d ? d.params : {},
    v = d ? d.pathname : '/',
    g = d ? d.pathnameBase : '/',
    y = d && d.route;
  {
    let A = (y && y.path) || '';
    $p(
      v,
      !y || A.endsWith('*') || A.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${v}" (under <Route path="${A}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${A}"> to <Route path="${A === '/' ? '*' : `${A}/*`}">.`
    );
  }
  let _ = dl(),
    b;
  if (i) {
    let A = typeof i == 'string' ? Na(i) : i;
    (Ze(
      g === '/' || ((j = A.pathname) == null ? void 0 : j.startsWith(g)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${g}" but pathname "${A.pathname}" was given in the \`location\` prop.`
    ),
      (b = A));
  } else b = _;
  let E = b.pathname || '/',
    R = E;
  if (g !== '/') {
    let A = g.replace(/^\//, '').split('/');
    R = '/' + E.replace(/^\//, '').split('/').slice(A.length).join('/');
  }
  let S = jp(a, { pathname: R });
  (ll(y || S != null, `No routes matched location "${b.pathname}${b.search}${b.hash}" `),
    ll(
      S == null ||
        S[S.length - 1].route.element !== void 0 ||
        S[S.length - 1].route.Component !== void 0 ||
        S[S.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${b.pathname}${b.search}${b.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let w = rv(
    S &&
      S.map((A) =>
        Object.assign({}, A, {
          params: Object.assign({}, h, A.params),
          pathname: tl([
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
              : tl([
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
    ? N.createElement(
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
function uv() {
  let a = pv(),
    i = Q0(a) ? `${a.status} ${a.statusText}` : a instanceof Error ? a.message : JSON.stringify(a),
    o = a instanceof Error ? a.stack : null,
    s = 'rgba(200,200,200, 0.5)',
    r = { padding: '0.5rem', backgroundColor: s },
    d = { padding: '2px 4px', backgroundColor: s },
    h = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', a),
    (h = N.createElement(
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
      N.createElement('h3', { style: { fontStyle: 'italic' } }, i),
      o ? N.createElement('pre', { style: r }, o) : null,
      h
    )
  );
}
var sv = N.createElement(uv, null),
  Yp = class extends N.Component {
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
        const o = tv(a.digest);
        o && (a = o);
      }
      let i =
        a !== void 0
          ? N.createElement(
              al.Provider,
              { value: this.props.routeContext },
              N.createElement(Sr.Provider, { value: a, children: this.props.component })
            )
          : this.props.children;
      return this.context ? N.createElement(cv, { error: a }, i) : i;
    }
  };
Yp.contextType = Bp;
var Zo = new WeakMap();
function cv({ children: a, error: i }) {
  let { basename: o } = N.useContext(Lt);
  if (typeof i == 'object' && i && 'digest' in i && typeof i.digest == 'string') {
    let s = ev(i.digest);
    if (s) {
      let r = Zo.get(i);
      if (r) throw r;
      let d = Dp(s.location, o);
      if (Op && !Zo.get(i))
        if (d.isExternal || s.reloadDocument) window.location.href = d.absoluteURL || d.to;
        else {
          const h = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(d.to, { replace: s.replace })
          );
          throw (Zo.set(i, h), h);
        }
      return N.createElement('meta', {
        httpEquiv: 'refresh',
        content: `0;url=${d.absoluteURL || d.to}`,
      });
    }
  }
  return a;
}
function ov({ routeContext: a, match: i, children: o }) {
  let s = N.useContext(ka);
  return (
    s &&
      s.static &&
      s.staticContext &&
      (i.route.errorElement || i.route.ErrorBoundary) &&
      (s.staticContext._deepestRenderedBoundaryId = i.route.id),
    N.createElement(al.Provider, { value: a }, o)
  );
}
function rv(a, i = [], o) {
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
        let { loaderData: E, errors: R } = s,
          S = b.route.loader && !E.hasOwnProperty(b.route.id) && (!R || R[b.route.id] === void 0);
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
            var E, R;
            g(_, {
              location: s.location,
              params:
                ((R = (E = s.matches) == null ? void 0 : E[0]) == null ? void 0 : R.params) ?? {},
              unstable_pattern: Z0(s.matches),
              errorInfo: b,
            });
          }
        : void 0;
  return r.reduceRight((_, b, E) => {
    let R,
      S = !1,
      w = null,
      j = null;
    s &&
      ((R = d && b.route.id ? d[b.route.id] : void 0),
      (w = b.route.errorElement || sv),
      h &&
        (v < 0 && E === 0
          ? ($p(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration'
            ),
            (S = !0),
            (j = null))
          : v === E && ((S = !0), (j = b.route.hydrateFallbackElement || null))));
    let A = i.concat(r.slice(0, E + 1)),
      k = () => {
        let V;
        return (
          R
            ? (V = w)
            : S
              ? (V = j)
              : b.route.Component
                ? (V = N.createElement(b.route.Component, null))
                : b.route.element
                  ? (V = b.route.element)
                  : (V = _),
          N.createElement(ov, {
            match: b,
            routeContext: { outlet: _, matches: A, isDataRoute: s != null },
            children: V,
          })
        );
      };
    return s && (b.route.ErrorBoundary || b.route.errorElement || E === 0)
      ? N.createElement(Yp, {
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
function fv(a) {
  let i = N.useContext(ka);
  return (Ze(i, xr(a)), i);
}
function dv(a) {
  let i = N.useContext(ps);
  return (Ze(i, xr(a)), i);
}
function mv(a) {
  let i = N.useContext(al);
  return (Ze(i, xr(a)), i);
}
function Er(a) {
  let i = mv(a),
    o = i.matches[i.matches.length - 1];
  return (Ze(o.route.id, `${a} can only be used on routes that contain a unique "id"`), o.route.id);
}
function hv() {
  return Er('useRouteId');
}
function pv() {
  var s;
  let a = N.useContext(Sr),
    i = dv('useRouteError'),
    o = Er('useRouteError');
  return a !== void 0 ? a : (s = i.errors) == null ? void 0 : s[o];
}
function yv() {
  let { router: a } = fv('useNavigate'),
    i = Er('useNavigate'),
    o = N.useRef(!1);
  return (
    Hp(() => {
      o.current = !0;
    }),
    N.useCallback(
      async (r, d = {}) => {
        (ll(o.current, qp),
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
function $p(a, i, o) {
  !i && !ip[a] && ((ip[a] = !0), ll(!1, o));
}
N.memo(gv);
function gv({ routes: a, future: i, state: o, isStatic: s, onError: r }) {
  return Gp(a, void 0, { state: o, isStatic: s, onError: r });
}
function nl({ to: a, replace: i, state: o, relative: s }) {
  Ze(Aa(), '<Navigate> may be used only in the context of a <Router> component.');
  let { static: r } = N.useContext(Lt);
  ll(
    !r,
    '<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.'
  );
  let { matches: d } = N.useContext(al),
    { pathname: h } = dl(),
    v = il(),
    g = hs(a, br(d), h, s === 'path'),
    y = JSON.stringify(g);
  return (
    N.useEffect(() => {
      v(JSON.parse(y), { replace: i, state: o, relative: s });
    }, [v, y, s, i, o]),
    null
  );
}
function It(a) {
  Ze(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  );
}
function _v({
  basename: a = '/',
  children: i = null,
  location: o,
  navigationType: s = 'POP',
  navigator: r,
  static: d = !1,
  unstable_useTransitions: h,
}) {
  Ze(
    !Aa(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  let v = a.replace(/^\/*/, '/'),
    g = N.useMemo(
      () => ({ basename: v, navigator: r, static: d, unstable_useTransitions: h, future: {} }),
      [v, r, d, h]
    );
  typeof o == 'string' && (o = Na(o));
  let {
      pathname: y = '/',
      search: _ = '',
      hash: b = '',
      state: E = null,
      key: R = 'default',
      unstable_mask: S,
    } = o,
    w = N.useMemo(() => {
      let j = Dl(y, v);
      return j == null
        ? null
        : {
            location: { pathname: j, search: _, hash: b, state: E, key: R, unstable_mask: S },
            navigationType: s,
          };
    }, [v, y, _, b, E, R, s, S]);
  return (
    ll(
      w != null,
      `<Router basename="${v}"> is not able to match the URL "${y}${_}${b}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    w == null
      ? null
      : N.createElement(
          Lt.Provider,
          { value: g },
          N.createElement(Oi.Provider, { children: i, value: w })
        )
  );
}
function vv({ children: a, location: i }) {
  return iv(sr(a), i);
}
function sr(a, i = []) {
  let o = [];
  return (
    N.Children.forEach(a, (s, r) => {
      if (!N.isValidElement(s)) return;
      let d = [...i, r];
      if (s.type === N.Fragment) {
        o.push.apply(o, sr(s.props.children, d));
        return;
      }
      (Ze(
        s.type === It,
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
      (s.props.children && (h.children = sr(s.props.children, d)), o.push(h));
    }),
    o
  );
}
var as = 'get',
  is = 'application/x-www-form-urlencoded';
function ys(a) {
  return typeof HTMLElement < 'u' && a instanceof HTMLElement;
}
function bv(a) {
  return ys(a) && a.tagName.toLowerCase() === 'button';
}
function Sv(a) {
  return ys(a) && a.tagName.toLowerCase() === 'form';
}
function xv(a) {
  return ys(a) && a.tagName.toLowerCase() === 'input';
}
function Ev(a) {
  return !!(a.metaKey || a.altKey || a.ctrlKey || a.shiftKey);
}
function Tv(a, i) {
  return a.button === 0 && (!i || i === '_self') && !Ev(a);
}
var Pu = null;
function Nv() {
  if (Pu === null)
    try {
      (new FormData(document.createElement('form'), 0), (Pu = !1));
    } catch {
      Pu = !0;
    }
  return Pu;
}
var kv = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
function Ko(a) {
  return a != null && !kv.has(a)
    ? (ll(
        !1,
        `"${a}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${is}"`
      ),
      null)
    : a;
}
function Av(a, i) {
  let o, s, r, d, h;
  if (Sv(a)) {
    let v = a.getAttribute('action');
    ((s = v ? Dl(v, i) : null),
      (o = a.getAttribute('method') || as),
      (r = Ko(a.getAttribute('enctype')) || is),
      (d = new FormData(a)));
  } else if (bv(a) || (xv(a) && (a.type === 'submit' || a.type === 'image'))) {
    let v = a.form;
    if (v == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let g = a.getAttribute('formaction') || v.getAttribute('action');
    if (
      ((s = g ? Dl(g, i) : null),
      (o = a.getAttribute('formmethod') || v.getAttribute('method') || as),
      (r = Ko(a.getAttribute('formenctype')) || Ko(v.getAttribute('enctype')) || is),
      (d = new FormData(v, a)),
      !Nv())
    ) {
      let { name: y, type: _, value: b } = a;
      if (_ === 'image') {
        let E = y ? `${y}.` : '';
        (d.append(`${E}x`, '0'), d.append(`${E}y`, '0'));
      } else y && d.append(y, b);
    }
  } else {
    if (ys(a))
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
function Xp(a, i, o, s) {
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
        : i && Dl(r.pathname, i) === '/'
          ? (r.pathname = `${cs(i)}/_root.${s}`)
          : (r.pathname = `${cs(r.pathname)}.${s}`),
    r
  );
}
async function Cv(a, i) {
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
function jv(a) {
  return a == null
    ? !1
    : a.href == null
      ? a.rel === 'preload' && typeof a.imageSrcSet == 'string' && typeof a.imageSizes == 'string'
      : typeof a.rel == 'string' && typeof a.href == 'string';
}
async function Mv(a, i, o) {
  let s = await Promise.all(
    a.map(async (r) => {
      let d = i.routes[r.route.id];
      if (d) {
        let h = await Cv(d, o);
        return h.links ? h.links() : [];
      }
      return [];
    })
  );
  return Dv(
    s
      .flat(1)
      .filter(jv)
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
            let E = g.route.shouldRevalidate({
              currentUrl: new URL(r.pathname + r.search + r.hash, window.origin),
              currentParams: ((b = o[0]) == null ? void 0 : b.params) || {},
              nextUrl: new URL(a, window.origin),
              nextParams: g.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof E == 'boolean') return E;
          }
          return !0;
        })
      : [];
}
function Rv(a, i, { includeHydrateFallback: o } = {}) {
  return wv(
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
function wv(a) {
  return [...new Set(a)];
}
function Ov(a) {
  let i = {},
    o = Object.keys(a).sort();
  for (let s of o) i[s] = a[s];
  return i;
}
function Dv(a, i) {
  let o = new Set();
  return (
    new Set(i),
    a.reduce((s, r) => {
      let d = JSON.stringify(Ov(r));
      return (o.has(d) || (o.add(d), s.push({ key: d, link: r })), s);
    }, [])
  );
}
function Nr() {
  let a = N.useContext(ka);
  return (Tr(a, 'You must render this element inside a <DataRouterContext.Provider> element'), a);
}
function zv() {
  let a = N.useContext(ps);
  return (
    Tr(a, 'You must render this element inside a <DataRouterStateContext.Provider> element'),
    a
  );
}
var kr = N.createContext(void 0);
kr.displayName = 'FrameworkContext';
function Ar() {
  let a = N.useContext(kr);
  return (Tr(a, 'You must render this element inside a <HydratedRouter> element'), a);
}
function Bv(a, i) {
  let o = N.useContext(kr),
    [s, r] = N.useState(!1),
    [d, h] = N.useState(!1),
    { onFocus: v, onBlur: g, onMouseEnter: y, onMouseLeave: _, onTouchStart: b } = i,
    E = N.useRef(null);
  (N.useEffect(() => {
    if ((a === 'render' && h(!0), a === 'viewport')) {
      let w = (A) => {
          A.forEach((k) => {
            h(k.isIntersecting);
          });
        },
        j = new IntersectionObserver(w, { threshold: 0.5 });
      return (
        E.current && j.observe(E.current),
        () => {
          j.disconnect();
        }
      );
    }
  }, [a]),
    N.useEffect(() => {
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
      ? [d, E, {}]
      : [
          d,
          E,
          {
            onFocus: Ti(v, R),
            onBlur: Ti(g, S),
            onMouseEnter: Ti(y, R),
            onMouseLeave: Ti(_, S),
            onTouchStart: Ti(b, R),
          },
        ]
    : [!1, E, {}];
}
function Ti(a, i) {
  return (o) => {
    (a && a(o), o.defaultPrevented || i(o));
  };
}
function Lv({ page: a, ...i }) {
  let o = I0(),
    { router: s } = Nr(),
    r = N.useMemo(() => jp(s.routes, a, s.basename), [s.routes, a, s.basename]);
  return r
    ? o
      ? N.createElement(qv, { page: a, matches: r, ...i })
      : N.createElement(Hv, { page: a, matches: r, ...i })
    : null;
}
function Uv(a) {
  let { manifest: i, routeModules: o } = Ar(),
    [s, r] = N.useState([]);
  return (
    N.useEffect(() => {
      let d = !1;
      return (
        Mv(a, i, o).then((h) => {
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
function qv({ page: a, matches: i, ...o }) {
  let s = dl(),
    { future: r } = Ar(),
    { basename: d } = Nr(),
    h = N.useMemo(() => {
      if (a === s.pathname + s.search + s.hash) return [];
      let v = Xp(a, d, r.unstable_trailingSlashAwareDataRequests, 'rsc'),
        g = !1,
        y = [];
      for (let _ of i)
        typeof _.route.shouldRevalidate == 'function' ? (g = !0) : y.push(_.route.id);
      return (
        g && y.length > 0 && v.searchParams.set('_routes', y.join(',')),
        [v.pathname + v.search]
      );
    }, [d, r.unstable_trailingSlashAwareDataRequests, a, s, i]);
  return N.createElement(
    N.Fragment,
    null,
    h.map((v) => N.createElement('link', { key: v, rel: 'prefetch', as: 'fetch', href: v, ...o }))
  );
}
function Hv({ page: a, matches: i, ...o }) {
  let s = dl(),
    { future: r, manifest: d, routeModules: h } = Ar(),
    { basename: v } = Nr(),
    { loaderData: g, matches: y } = zv(),
    _ = N.useMemo(() => up(a, i, y, d, s, 'data'), [a, i, y, d, s]),
    b = N.useMemo(() => up(a, i, y, d, s, 'assets'), [a, i, y, d, s]),
    E = N.useMemo(() => {
      if (a === s.pathname + s.search + s.hash) return [];
      let w = new Set(),
        j = !1;
      if (
        (i.forEach((k) => {
          var P;
          let V = d.routes[k.route.id];
          !V ||
            !V.hasLoader ||
            ((!_.some((ee) => ee.route.id === k.route.id) &&
              k.route.id in g &&
              (P = h[k.route.id]) != null &&
              P.shouldRevalidate) ||
            V.hasClientLoader
              ? (j = !0)
              : w.add(k.route.id));
        }),
        w.size === 0)
      )
        return [];
      let A = Xp(a, v, r.unstable_trailingSlashAwareDataRequests, 'data');
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
    R = N.useMemo(() => Rv(b, d), [b, d]),
    S = Uv(b);
  return N.createElement(
    N.Fragment,
    null,
    E.map((w) => N.createElement('link', { key: w, rel: 'prefetch', as: 'fetch', href: w, ...o })),
    R.map((w) => N.createElement('link', { key: w, rel: 'modulepreload', href: w, ...o })),
    S.map(({ key: w, link: j }) =>
      N.createElement('link', {
        key: w,
        nonce: o.nonce,
        ...j,
        crossOrigin: j.crossOrigin ?? o.crossOrigin,
      })
    )
  );
}
function Gv(...a) {
  return (i) => {
    a.forEach((o) => {
      typeof o == 'function' ? o(i) : o != null && (o.current = i);
    });
  };
}
var Yv =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
try {
  Yv && (window.__reactRouterVersion = '7.14.2');
} catch {}
function $v({ basename: a, children: i, unstable_useTransitions: o, window: s }) {
  let r = N.useRef();
  r.current == null && (r.current = x0({ window: s, v5Compat: !0 }));
  let d = r.current,
    [h, v] = N.useState({ action: d.action, location: d.location }),
    g = N.useCallback(
      (y) => {
        o === !1 ? v(y) : N.startTransition(() => v(y));
      },
      [o]
    );
  return (
    N.useLayoutEffect(() => d.listen(g), [d, g]),
    N.createElement(_v, {
      basename: a,
      children: i,
      location: h.location,
      navigationType: h.action,
      navigator: d,
      unstable_useTransitions: o,
    })
  );
}
var Vp = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Qp = N.forwardRef(function (
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
      viewTransition: E,
      unstable_defaultShouldRevalidate: R,
      ...S
    },
    w
  ) {
    let { basename: j, navigator: A, unstable_useTransitions: k } = N.useContext(Lt),
      V = typeof _ == 'string' && Vp.test(_),
      P = Dp(_, j);
    _ = P.to;
    let ee = lv(_, { relative: r }),
      Q = dl(),
      Y = null;
    if (v) {
      let he = hs(v, [], Q.unstable_mask ? Q.unstable_mask.pathname : '/', !0);
      (j !== '/' && (he.pathname = he.pathname === '/' ? j : tl([j, he.pathname])),
        (Y = A.createHref(he)));
    }
    let [U, Z, ae] = Bv(s, S),
      ue = Zv(_, {
        replace: h,
        unstable_mask: v,
        state: g,
        target: y,
        preventScrollReset: b,
        relative: r,
        viewTransition: E,
        unstable_defaultShouldRevalidate: R,
        unstable_useTransitions: k,
      });
    function ce(he) {
      (i && i(he), he.defaultPrevented || ue(he));
    }
    let I = !(P.isExternal || d),
      J = N.createElement('a', {
        ...S,
        ...ae,
        href: (I ? Y : void 0) || P.absoluteURL || ee,
        onClick: I ? ce : i,
        ref: Gv(w, Z),
        target: y,
        'data-discover': !V && o === 'render' ? 'true' : void 0,
      });
    return U && !V ? N.createElement(N.Fragment, null, J, N.createElement(Lv, { page: ee })) : J;
  });
Qp.displayName = 'Link';
var Xv = N.forwardRef(function (
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
    E = dl(),
    R = N.useContext(ps),
    { navigator: S, basename: w } = N.useContext(Lt),
    j = R != null && Fv(b) && v === !0,
    A = S.encodeLocation ? S.encodeLocation(b).pathname : b.pathname,
    k = E.pathname,
    V = R && R.navigation && R.navigation.location ? R.navigation.location.pathname : null;
  (o || ((k = k.toLowerCase()), (V = V ? V.toLowerCase() : null), (A = A.toLowerCase())),
    V && w && (V = Dl(V, w) || V));
  const P = A !== '/' && A.endsWith('/') ? A.length - 1 : A.length;
  let ee = k === A || (!r && k.startsWith(A) && k.charAt(P) === '/'),
    Q = V != null && (V === A || (!r && V.startsWith(A) && V.charAt(A.length) === '/')),
    Y = { isActive: ee, isPending: Q, isTransitioning: j },
    U = ee ? i : void 0,
    Z;
  typeof s == 'function'
    ? (Z = s(Y))
    : (Z = [s, ee ? 'active' : null, Q ? 'pending' : null, j ? 'transitioning' : null]
        .filter(Boolean)
        .join(' '));
  let ae = typeof d == 'function' ? d(Y) : d;
  return N.createElement(
    Qp,
    { ...y, 'aria-current': U, className: Z, ref: _, style: ae, to: h, viewTransition: v },
    typeof g == 'function' ? g(Y) : g
  );
});
Xv.displayName = 'NavLink';
var Vv = N.forwardRef(
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
      unstable_defaultShouldRevalidate: E,
      ...R
    },
    S
  ) => {
    let { unstable_useTransitions: w } = N.useContext(Lt),
      j = Jv(),
      A = Wv(v, { relative: y }),
      k = h.toLowerCase() === 'get' ? 'get' : 'post',
      V = typeof v == 'string' && Vp.test(v),
      P = (ee) => {
        if ((g && g(ee), ee.defaultPrevented)) return;
        ee.preventDefault();
        let Q = ee.nativeEvent.submitter,
          Y = (Q == null ? void 0 : Q.getAttribute('formmethod')) || h,
          U = () =>
            j(Q || ee.currentTarget, {
              fetcherKey: i,
              method: Y,
              navigate: o,
              replace: r,
              state: d,
              relative: y,
              preventScrollReset: _,
              viewTransition: b,
              unstable_defaultShouldRevalidate: E,
            });
        w && o !== !1 ? N.startTransition(() => U()) : U();
      };
    return N.createElement('form', {
      ref: S,
      method: k,
      action: A,
      onSubmit: s ? g : P,
      ...R,
      'data-discover': !V && a === 'render' ? 'true' : void 0,
    });
  }
);
Vv.displayName = 'Form';
function Qv(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Zp(a) {
  let i = N.useContext(ka);
  return (Ze(i, Qv(a)), i);
}
function Zv(
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
  let _ = il(),
    b = dl(),
    E = Di(a, { relative: h });
  return N.useCallback(
    (R) => {
      if (Tv(R, i)) {
        R.preventDefault();
        let S = o !== void 0 ? o : Mi(b) === Mi(E),
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
        y ? N.startTransition(() => w()) : w();
      }
    },
    [b, _, E, o, s, r, i, a, d, h, v, g, y]
  );
}
var Kv = 0,
  Iv = () => `__${String(++Kv)}__`;
function Jv() {
  let { router: a } = Zp('useSubmit'),
    { basename: i } = N.useContext(Lt),
    o = hv(),
    s = a.fetch,
    r = a.navigate;
  return N.useCallback(
    async (d, h = {}) => {
      let { action: v, method: g, encType: y, formData: _, body: b } = Av(d, i);
      if (h.navigate === !1) {
        let E = h.fetcherKey || Iv();
        await s(E, o, h.action || v, {
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
function Wv(a, { relative: i } = {}) {
  let { basename: o } = N.useContext(Lt),
    s = N.useContext(al);
  Ze(s, 'useFormAction must be used inside a RouteContext');
  let [r] = s.matches.slice(-1),
    d = { ...Di(a || '.', { relative: i }) },
    h = dl();
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
    o !== '/' && (d.pathname = d.pathname === '/' ? o : tl([o, d.pathname])),
    Mi(d)
  );
}
function Fv(a, { relative: i } = {}) {
  let o = N.useContext(Lp);
  Ze(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = Zp('useViewTransitionState'),
    r = Di(a, { relative: i });
  if (!o.isTransitioning) return !1;
  let d = Dl(o.currentLocation.pathname, s) || o.currentLocation.pathname,
    h = Dl(o.nextLocation.pathname, s) || o.nextLocation.pathname;
  return ss(r.pathname, h) != null || ss(r.pathname, d) != null;
}
const Pv = '_layout_mn6ug_1',
  eb = '_enemies_mn6ug_12',
  tb = '_enemy_mn6ug_20',
  lb = '_targeted_mn6ug_35',
  nb = '_enemyName_mn6ug_39',
  ab = '_down_mn6ug_44',
  ib = '_log_mn6ug_48',
  ub = '_logLine_mn6ug_60',
  sb = '_party_mn6ug_64',
  cb = '_rowTag_mn6ug_71',
  ob = '_cardRow_mn6ug_77',
  rb = '_card_mn6ug_77',
  fb = '_cardActive_mn6ug_99',
  db = '_cardDecided_mn6ug_104',
  mb = '_cardName_mn6ug_108',
  hb = '_uni_mn6ug_116',
  pb = '_summons_mn6ug_120',
  yb = '_summon_mn6ug_120',
  gb = '_summonName_mn6ug_138',
  _b = '_summonHp_mn6ug_147',
  vb = '_cardNums_mn6ug_153',
  bb = '_cardCmd_mn6ug_159',
  Sb = '_empty_mn6ug_165',
  xb = '_command_mn6ug_170',
  Eb = '_skillList_mn6ug_176',
  Tb = '_skillBtn_mn6ug_182',
  Nb = '_skillTop_mn6ug_194',
  kb = '_skillName_mn6ug_201',
  Ab = '_skillDesc_mn6ug_206',
  Cb = '_target_mn6ug_35',
  jb = '_unionBanner_mn6ug_217',
  Mb = '_unionCancel_mn6ug_231',
  Rb = '_unionHint_mn6ug_240',
  wb = '_unionBtn_mn6ug_246',
  Ob = '_cmdHead_mn6ug_252',
  Db = '_menu_mn6ug_257',
  zb = '_menuBtn_mn6ug_263',
  Bb = '_tp_mn6ug_280',
  Lb = '_menuBack_mn6ug_286',
  Ub = '_execRow_mn6ug_296',
  qb = '_redo_mn6ug_301',
  Hb = '_primary_mn6ug_311',
  Gb = '_result_mn6ug_326',
  Yb = '_resultTitle_mn6ug_337',
  $b = '_resultBody_mn6ug_342',
  F = {
    layout: Pv,
    enemies: eb,
    enemy: tb,
    targeted: lb,
    enemyName: nb,
    down: ab,
    log: ib,
    logLine: ub,
    party: sb,
    rowTag: cb,
    cardRow: ob,
    card: rb,
    cardActive: fb,
    cardDecided: db,
    cardName: mb,
    uni: hb,
    summons: pb,
    summon: yb,
    summonName: gb,
    summonHp: _b,
    cardNums: vb,
    cardCmd: bb,
    empty: Sb,
    command: xb,
    skillList: Eb,
    skillBtn: Tb,
    skillTop: Nb,
    skillName: kb,
    skillDesc: Ab,
    target: Cb,
    unionBanner: jb,
    unionCancel: Mb,
    unionHint: Rb,
    unionBtn: wb,
    cmdHead: Ob,
    menu: Db,
    menuBtn: zb,
    tp: Bb,
    menuBack: Lb,
    execRow: Ub,
    redo: qb,
    primary: Hb,
    result: Gb,
    resultTitle: Yb,
    resultBody: $b,
  },
  Xb = '_row_1t6j7_1',
  Vb = '_label_1t6j7_8',
  Qb = '_track_1t6j7_16',
  Zb = '_fill_1t6j7_24',
  Kb = '_value_1t6j7_30',
  Ni = { row: Xb, label: Vb, track: Qb, fill: Zb, value: Kb },
  es = ({ value: a, max: i, color: o = '#4caf50', label: s, showValue: r = !0 }) => {
    const d = i > 0 ? Math.max(0, Math.min(100, (a / i) * 100)) : 0;
    return m.jsxs('div', {
      className: Ni.row,
      children: [
        s ? m.jsx('span', { className: Ni.label, children: s }) : null,
        m.jsx('div', {
          className: Ni.track,
          children: m.jsx('div', {
            className: Ni.fill,
            style: { width: `${d}%`, backgroundColor: o },
          }),
        }),
        r
          ? m.jsxs('span', {
              className: Ni.value,
              children: [Math.max(0, Math.round(a)), '/', Math.round(i)],
            })
          : null,
      ],
    });
  },
  fn = {
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
function Ib(a) {
  return a.category === 'food' ? 0 : a.category === 'material' ? 8 : Math.floor(a.buyPrice / 2);
}
function Jb(a) {
  var i;
  return ((i = et[a]) == null ? void 0 : i.category) === 'food';
}
const Wt = {
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
  Sa = {
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
  Wb = 500,
  cr = 30,
  gs = 3,
  _s = 2,
  Fb = gs + _s,
  Ai = { TITLE_DEPTH: 20, REBIRTH_MIN_LEVEL: 30 },
  Kp = 5,
  Pb = 5,
  fl = {
    MAX_LEVEL: 5,
    STAT_PER_LEVEL: 2,
    INGOT_INC: { copper: 1, silver: 3, gold: 5 },
    FRAGMENTS_PER_INGOT: 10,
    RECYCLE_FRAGMENTS: 3,
  },
  Ci = (a) => a > 0 && a % Le.BOSS_INTERVAL === 0,
  sp = (a) => Math.round(Le.EXP_CURVE_BASE * Math.pow(a, Le.EXP_CURVE_POW)),
  Io = (a) => a < Le.LEVEL_CAP,
  jr = (a, i) => 1 + Le.ENEMY_SCALE_K * (a - i),
  dn = {
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
  Ca = {
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
  e1 = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'],
  t1 = ['slash', 'pierce', 'bash'],
  os = (a, i, o) => Math.max(i, Math.min(o, a));
function Ip(a, i) {
  const o = {};
  for (const s of e1) o[s] = Math.round(a[s] * i);
  return o;
}
function l1(a, i) {
  return Ip(a.baseStats, jr(i, a.refDepth));
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
const n1 = (a) => a.ailments.some((i) => i.type === 'blind'),
  a1 = (a) => a.ailments.some((i) => i.type === 'legBind');
function Jp(a, i, o, s) {
  const r = o.statBase === 'str',
    d = cp(a.stats, a.equip, a.buffs),
    h = cp(i.stats, i.equip, i.buffs),
    v = r ? d.patk : d.matk,
    g = r ? h.pdef : h.mdef;
  let y = !0;
  if (r) {
    const Y = n1(a) ? Le.BLIND_ACC_PENALTY : 0,
      U = a1(i) ? 0 : h.eva,
      Z = os(Le.BASE_HIT + (d.acc - U) * Le.HIT_AGI_K - Y, Le.HIT_MIN, 1);
    y = s.next() < Z;
  }
  if (!y) return { damage: 0, hit: !1, critical: !1 };
  const b = (v * o.power * Le.DAMAGE_DEF_K) / (Le.DAMAGE_DEF_K + Math.max(0, g)),
    E = r && t1.includes(o.element),
    R = E && a.row === 'back' ? Le.BACK_ROW_MELEE_MULT : 1,
    S = E && i.row === 'back' ? Le.BACK_ROW_MELEE_MULT : 1,
    w = R * S,
    [j, A] = Le.DMG_VARIANCE,
    k = j + s.next() * (A - j);
  let V = b * o.elementMultiplier * w * k;
  const P = os(
      Le.CRIT_BASE + (a.stats.luc - i.stats.luc) * Le.CRIT_LUC_K,
      Le.CRIT_MIN,
      Le.CRIT_MAX
    ),
    ee = s.next() < P;
  return (
    ee && (V *= Le.CRIT_MULT),
    { damage: o.elementMultiplier === 0 ? 0 : Math.max(1, Math.floor(V)), hit: !0, critical: ee }
  );
}
function i1(a, i) {
  const o = ht[a];
  if (!o || i <= 0) return {};
  const s = i * fl.STAT_PER_LEVEL;
  return o.slot === 'weapon' ? { atk: s, mat: s } : o.slot === 'armor' ? { def: s, mdf: s } : {};
}
const Wp = ['weapon', 'armor', 'accessory'];
function u1(a, i, o) {
  const s = a.guild.equipment.map((d) => (d.id === i ? o(d) : d)),
    r = a.guild.members.map((d) => {
      let h = !1;
      const v = { ...d.equipment };
      for (const g of Wp) {
        const y = v[g];
        y && y.id === i && ((v[g] = o(y)), (h = !0));
      }
      return h ? { ...d, equipment: v } : d;
    });
  return { ...a, guild: { ...a.guild, equipment: s, members: r } };
}
function s1(a, i, o) {
  let s = a.guild.equipment.find((h) => h.id === i);
  if (!s)
    for (const h of a.guild.members)
      for (const v of Wp) {
        const g = h.equipment[v];
        (g == null ? void 0 : g.id) === i && (s = g);
      }
  if (!s) return { ok: !1, save: a, reason: 'notFound' };
  if (s.forgeLevel >= fl.MAX_LEVEL) return { ok: !1, save: a, reason: 'maxLevel' };
  if ((a.forgeInventory.ingots[o] ?? 0) <= 0) return { ok: !1, save: a, reason: 'noIngot' };
  const r = Math.min(fl.MAX_LEVEL, s.forgeLevel + fl.INGOT_INC[o]);
  let d = {
    ...a,
    forgeInventory: {
      ...a.forgeInventory,
      ingots: { ...a.forgeInventory.ingots, [o]: a.forgeInventory.ingots[o] - 1 },
    },
  };
  return ((d = u1(d, i, (h) => ({ ...h, forgeLevel: r }))), { ok: !0, save: d });
}
function c1(a, i) {
  if (!a.guild.equipment.find((h) => h.id === i)) return { ok: !1, save: a, reason: 'notFound' };
  const s = a.guild.equipment.filter((h) => h.id !== i),
    r = { ...a.forgeInventory.fragments };
  r.common = (r.common ?? 0) + fl.RECYCLE_FRAGMENTS;
  let d = a.forgeInventory.ingots.copper;
  for (; r.common >= fl.FRAGMENTS_PER_INGOT; ) ((r.common -= fl.FRAGMENTS_PER_INGOT), (d += 1));
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
function Fp(a, i) {
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
const Pp = 60,
  vs = (a) => a.guild.foodStorage ?? [];
function ey(a) {
  return vs(a).reduce((i, o) => i + o.qty, 0);
}
function wr(a, i) {
  var o;
  return ((o = vs(a).find((s) => s.itemId === i)) == null ? void 0 : o.qty) ?? 0;
}
function ty(a, i, o = 1) {
  if (o <= 0) return a;
  const s = Pp - ey(a),
    r = Math.min(o, Math.max(0, s));
  if (r <= 0) return a;
  const d = [...vs(a)],
    h = d.findIndex((v) => v.itemId === i);
  return (
    h >= 0 ? (d[h] = { ...d[h], qty: d[h].qty + r }) : d.push({ itemId: i, qty: r }),
    { ...a, guild: { ...a.guild, foodStorage: d } }
  );
}
function ly(a, i, o = 1) {
  if (o <= 0) return a;
  const s = [...vs(a)],
    r = s.findIndex((h) => h.itemId === i);
  if (r < 0 || s[r].qty < o) return a;
  const d = s[r].qty - o;
  return (
    d <= 0 ? s.splice(r, 1) : (s[r] = { ...s[r], qty: d }),
    { ...a, guild: { ...a.guild, foodStorage: s } }
  );
}
function ny(a, i, o) {
  return {
    ...a,
    guild: { ...a.guild, members: a.guild.members.map((s) => (s.id === i ? o(s) : s)) },
  };
}
function o1() {
  return `eq_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function r1(a, i, o = 0) {
  if (!ht[i]) return a;
  const s = { id: o1(), masterId: i, forgeLevel: o };
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
function f1(a, i, o) {
  const s = a.guild.equipment.find((y) => y.id === o),
    r = a.guild.members.find((y) => y.id === i);
  if (!s || !r || !Or(r, s.masterId)) return a;
  const d = ht[s.masterId];
  let h = a.guild.equipment.filter((y) => y.id !== o);
  const v = r.equipment[d.slot];
  v && (h = [...h, v]);
  const g = { ...a, guild: { ...a.guild, equipment: h } };
  return ny(g, i, (y) => ({ ...y, equipment: { ...y.equipment, [d.slot]: s } }));
}
function Dr(a, i, o) {
  const s = a.guild.members.find((h) => h.id === i);
  if (!s) return a;
  const r = s.equipment[o];
  if (!r) return a;
  const d = { ...a, guild: { ...a.guild, equipment: [...a.guild.equipment, r] } };
  return ny(d, i, (h) => ({ ...h, equipment: { ...h.equipment, [o]: null } }));
}
const cn = (a) => ({ hp: 0, tp: 0, str: 0, vit: 0, agi: 0, int: 0, mnd: 0, luc: 0, ...a }),
  Ea = {
    title_berserker: {
      id: 'title_berserker',
      name: '狂戦士',
      parentClassId: 'class_warrior',
      skillTree: { skills: [] },
      growthModifier: cn({ str: 1 }),
    },
    title_sentinel: {
      id: 'title_sentinel',
      name: '哨戒兵',
      parentClassId: 'class_warrior',
      skillTree: { skills: [] },
      growthModifier: cn({ vit: 1 }),
    },
    title_bulwark: {
      id: 'title_bulwark',
      name: '城壁',
      parentClassId: 'class_guardian',
      skillTree: { skills: [] },
      growthModifier: cn({ vit: 1, hp: 2 }),
    },
    title_vanguard: {
      id: 'title_vanguard',
      name: '先鋒',
      parentClassId: 'class_guardian',
      skillTree: { skills: [] },
      growthModifier: cn({ str: 1 }),
    },
    title_pyromancer: {
      id: 'title_pyromancer',
      name: '紅蓮術士',
      parentClassId: 'class_mage',
      skillTree: { skills: [] },
      growthModifier: cn({ int: 1 }),
    },
    title_sage: {
      id: 'title_sage',
      name: '賢者',
      parentClassId: 'class_mage',
      skillTree: { skills: [] },
      growthModifier: cn({ tp: 2, mnd: 1 }),
    },
    title_sniper: {
      id: 'title_sniper',
      name: '狙撃手',
      parentClassId: 'class_ranger',
      skillTree: { skills: [] },
      growthModifier: cn({ agi: 1, luc: 1 }),
    },
    title_tracker: {
      id: 'title_tracker',
      name: '追跡者',
      parentClassId: 'class_ranger',
      skillTree: { skills: [] },
      growthModifier: cn({ agi: 1 }),
    },
  },
  d1 = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];
function zi(a) {
  var v, g;
  const i = Wt[a.raceId];
  if (!i) throw new Error(`computeBaseStats: 未定義の種族 "${a.raceId}"`);
  const s = Math.max(1, Math.min(a.level, Le.LEVEL_CAP)) - 1,
    r = a.titleId ? ((v = Ea[a.titleId]) == null ? void 0 : v.growthModifier) : void 0,
    d = ((g = a.rebirthBonus) == null ? void 0 : g.allStats) ?? 0,
    h = {};
  for (const y of d1) {
    const _ = i.statGrowth[y] + ((r == null ? void 0 : r[y]) ?? 0);
    h[y] = i.baseStatsAtLv1[y] + _ * s + d;
  }
  return h;
}
const m1 = 3,
  Ol = (a, i, o) => Math.max(i, Math.min(o, a)),
  h1 = {
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
function p1(a) {
  const i = { atk: 0, mat: 0, def: 0, mdf: 0 };
  for (const o of Object.values(a.equipment)) {
    if (!o) continue;
    const s = ht[o.masterId];
    if (!s) continue;
    const r = i1(o.masterId, o.forgeLevel);
    ((i.atk += (s.bonuses.atk ?? 0) + (r.atk ?? 0)),
      (i.mat += (s.bonuses.mat ?? 0) + (r.mat ?? 0)),
      (i.def += (s.bonuses.def ?? 0) + (r.def ?? 0)),
      (i.mdf += (s.bonuses.mdf ?? 0) + (r.mdf ?? 0)));
  }
  return i;
}
function y1(a, i) {
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
    equip: p1(o),
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
function g1(a, i, o) {
  const s = dn[a],
    r = l1(s, o);
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
function ay(a, i, o, s, r) {
  const d = Ca[a],
    h = Ip(d.baseStats, jr(i, d.refDepth)),
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
      .map((_) => y1(a, _))
      .filter((_) => _ !== null),
    h = i.map((_, b) => g1(_, b, s)),
    v = (((y = a.diveState) == null ? void 0 : y.persistentSummons) ?? [])
      .map((_, b) => ay(_.summonKind, s, _.ownerId, `summon_persist_${b}`, _.hp))
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
function wl(a, i) {
  return (
    a.allies.find((o) => o.id === i) ??
    a.enemies.find((o) => o.id === i) ??
    a.summons.find((o) => o.id === i)
  );
}
const iy = (a) => {
    var i;
    return (
      !!a.isSummon && !!a.summonKind && ((i = Ca[a.summonKind]) == null ? void 0 : i.buffImmune)
    );
  },
  uy = (a, i) => {
    var o;
    return ((o = a.resist) == null ? void 0 : o[i]) ?? 1;
  };
function Br(a, i, o) {
  ((a.hp = Ol(a.hp - i, 0, a.maxHp)),
    a.hp === 0 &&
      !a.isDown &&
      ((a.isDown = !0),
      (a.unionGauge = Math.floor(a.unionGauge / 2)),
      o.push({ text: `${a.name} は倒れた！` })));
}
function fs(a, i) {
  a.isDown || (a.unionGauge = Ol(a.unionGauge + i, 0, 100));
}
function or(a, i) {
  iy(a) ||
    ((a.buffs = a.buffs.filter((o) => !(o.stat === i.stat && o.stackGroup === i.stackGroup))),
    a.buffs.push(i));
}
function _1(a, i) {
  if (iy(a)) return;
  const o = a.ailments.find((s) => s.type === i.type);
  if (o) {
    o.remainingTurns = Math.max(o.remainingTurns, i.remainingTurns);
    return;
  }
  a.ailments.push(i);
}
function v1(a, i, o) {
  return Ol(a * (1 + (i.stats.luc - o.stats.luc) * Le.AILMENT_LUC_K), 0, Le.AILMENT_MAX);
}
function sy(a, i, o, s) {
  const r = i.side === 'ally' ? 'enemy' : 'ally';
  switch (o) {
    case 'self':
      return [i];
    case 'allyAll':
      return i.side === 'ally' ? [...yt(a, 'ally'), ...zr(a)] : yt(a, 'enemy');
    case 'allyOne': {
      const d = wl(a, s);
      return d && d.side === i.side ? [d] : [i];
    }
    case 'enemyAll':
      return yt(a, r);
    case 'enemyRow':
    case 'enemyOne':
    default: {
      const d = wl(a, s);
      return d && d.side === r && !d.isDown ? [d] : yt(a, r).slice(0, 1);
    }
  }
}
function b1(a, i, o, s) {
  return sy(a, i, o.target, s);
}
function cy(a, i, o, s, r, d, h) {
  switch (o.kind) {
    case 'damage': {
      const v = o.hits ?? 1;
      for (const g of d)
        if (!g.isDown)
          for (let y = 0; y < v; y++) {
            const _ = Jp(
              i,
              g,
              { statBase: o.statBase, power: o.power(r), element: s, elementMultiplier: uy(g, s) },
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
      for (const g of d) g.isDown || (g.hp = Ol(g.hp + v, 0, g.maxHp));
      a.log.push({ text: `${i.name} は回復魔法を使った（+${v}）` });
      break;
    }
    case 'buff': {
      for (const v of d)
        or(v, {
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
        const g = v1(o.chance(r), i, v);
        h.next() < g &&
          (_1(v, { type: o.ailment, remainingTurns: o.turns, magnitude: o.magnitude }),
          a.log.push({ text: `${v.name} は${h1[o.ailment]}になった` }));
      }
      break;
    }
    case 'summon': {
      if (i.side !== 'ally') break;
      if (zr(a).length >= m1) {
        a.log.push({ text: 'これ以上は召喚できない' });
        break;
      }
      const v = `summon_${a.turn}_${a.summons.length}`,
        g = ay(o.summonKind, a.depth, i.id, v);
      (a.summons.push(g), a.log.push({ text: `${i.name} は ${g.name} を召喚した！` }));
      break;
    }
  }
}
function Jo(a, i, o, s) {
  var h;
  if (o.isDown) return;
  const r = i.enemyId
      ? (dn[i.enemyId].attackElement ?? 'bash')
      : i.isSummon && i.summonKind
        ? (((h = Ca[i.summonKind]) == null ? void 0 : h.attackElement) ?? 'bash')
        : 'bash',
    d = Jp(i, o, { statBase: 'str', power: 1, element: r, elementMultiplier: uy(o, r) }, s);
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
  S1 = (a) => a.ailments.some((i) => i.type === 'paralysis'),
  Lr = (a, i) => a.ailments.some((o) => o.type === i),
  Wo = (a) => Lr(a, 'armBind'),
  x1 = (a) => Lr(a, 'headBind'),
  E1 = (a) => Lr(a, 'legBind');
function fp(a) {
  return a.effects.some((i) => i.kind === 'damage' && i.statBase === 'str');
}
function T1(a, i, o) {
  const s = Sa[i.unionSkillId];
  if (!s) return;
  const r = wl(a, i.actorId);
  if (!r || r.isDown || r.side !== 'ally') return;
  if (r.unionGauge < 100) {
    a.log.push({ text: `${r.name} はユニオンゲージが足りない` });
    return;
  }
  const d = new Set(i.participantIds);
  d.add(r.id);
  const h = [...d].map((_) => wl(a, _)).filter((_) => !!_ && !_.isDown && _.side === 'ally');
  if (h.length < s.requiredParticipants) {
    a.log.push({ text: `${r.name} の${s.name}は参加人数が足りない` });
    return;
  }
  const v = [r, ...h.filter((_) => _.id !== r.id)].slice(0, s.requiredParticipants);
  for (const _ of v) _.unionGauge = Ol(_.unionGauge - s.gaugeCostPerParticipant, 0, 100);
  a.log.push({ text: `ユニオン！ ${r.name} の${s.name}！` });
  const g = 1,
    y = sy(a, r, s.target, i.targetId);
  for (const _ of s.effects) cy(a, r, _, s.element, g, y, o);
}
function Fo(a, i, o) {
  var b, E, R;
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
    for (const S of i) S.kind === 'union' && T1(s, S, o);
  const g = i.find((S) => S.kind === 'flee');
  if (!v && g && s.outcome === 'ongoing') {
    const S = wl(s, g.actorId);
    if (S && E1(S)) s.log.push({ text: `${S.name} は脚を封じられて逃げられない` });
    else {
      const w = Ol(0.5 + (rp(yt(s, 'ally')) - rp(yt(s, 'enemy'))) * 0.02, 0.1, 0.95);
      if (o.next() < w)
        return (s.log.push({ text: 'うまく逃げ切れた！' }), (s.outcome = 'fled'), s);
      s.log.push({ text: '逃げられなかった！' });
    }
  }
  if (!v)
    for (const S of i) {
      if (S.kind !== 'guard') continue;
      const w = wl(s, S.actorId);
      !w ||
        w.isDown ||
        (or(w, { stat: 'pdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }),
        or(w, { stat: 'mdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }));
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
      if (S1(S) && o.next() < Le.PARALYSIS_SKIP) {
        s.log.push({ text: `${S.name} は麻痺で動けない` });
        continue;
      }
      if (S.isSummon) {
        const w = S.summonKind ? Ca[S.summonKind] : void 0;
        if (w != null && w.actsOnTurn) {
          const j = yt(s, 'enemy');
          j.length > 0 && Jo(s, S, o.pick(j), o);
        }
        if (yt(s, 'enemy').length === 0) break;
        continue;
      }
      if (S.side === 'enemy') {
        if (Wo(S)) {
          s.log.push({ text: `${S.name} は腕を封じられて攻撃できない` });
          continue;
        }
        const w = y.get(S.id),
          j = w ? wl(s, w) : void 0,
          A = j && !j.isDown ? j : yt(s, 'ally')[0];
        A && Jo(s, S, A, o);
      } else {
        const w = r.get(S.id);
        if (!w || w.kind === 'guard' || w.kind === 'flee') continue;
        if (w.kind === 'attack') {
          if (Wo(S)) {
            s.log.push({ text: `${S.name} は腕を封じられて攻撃できない` });
            continue;
          }
          const j = wl(s, w.targetId),
            A = j && !j.isDown ? j : yt(s, 'enemy')[0];
          A && Jo(s, S, A, o);
        } else if (w.kind === 'skill') {
          const j = fn[w.skillId];
          if (!j) continue;
          if (fp(j) && Wo(S)) {
            s.log.push({ text: `${S.name} は腕を封じられてスキルを使えない` });
            continue;
          }
          if (!fp(j) && x1(S)) {
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
          const V = b1(s, S, j, w.targetId);
          for (const P of j.effects) cy(s, S, P, j.element, A, V, o);
        } else if (w.kind === 'item') {
          const j = et[w.itemId];
          if (!j || !((b = j.useContext) != null && b.includes('battle'))) continue;
          const A = wl(s, w.targetId) ?? S;
          for (const k of j.effects ?? [])
            k.kind === 'heal'
              ? (A.hp = Ol(A.hp + k.amount(1), 0, A.maxHp))
              : k.kind === 'restoreTp' && (A.tp = Ol(A.tp + k.amount(1), 0, A.maxTp));
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
        (((E = a.enemies.find((j) => j.id === S.id)) == null ? void 0 : E.isDown) ?? !1)
      )
    )
      for (const j of dn[S.enemyId].drops ?? [])
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
function oy(a) {
  let i = 0,
    o = 0;
  for (const s of a.enemies) {
    if (!s.enemyId) continue;
    const r = dn[s.enemyId],
      d = jr(a.depth, r.refDepth);
    ((i += Math.round(r.exp * d)), (o += Math.round(r.gold * d)));
  }
  return { exp: i, gold: o };
}
function N1(a, i) {
  let o = a.level,
    s = a.exp + (Io(o) ? i : 0),
    r = a.skillPoints.total;
  for (; Io(o) && s >= sp(o); ) ((s -= sp(o)), (o += 1), (r += Le.SP_PER_LEVEL));
  return {
    ...a,
    level: o,
    exp: Io(a.level) ? s : a.exp,
    skillPoints: { ...a.skillPoints, total: r },
  };
}
function dp(a, i) {
  if (!a.diveState) return a;
  const o = i.outcome === 'win',
    s = i.outcome === 'win' || i.outcome === 'fled',
    r = new Map(i.allies.map((E) => [E.id, E])),
    d = a.diveState.party.map((E) => {
      const R = r.get(E.charId);
      if (!R) return E;
      let S = R.unionGauge;
      return (
        s && !R.isDown && (S = Ol(S + Le.UNION_GAIN_ON_WIN, 0, 100)),
        { ...E, hp: R.hp, tp: R.tp, unionGauge: S, ailments: R.ailments }
      );
    });
  let h = a.guild.members,
    v = a.guild.gold;
  const g = { ...a.bestiary.monsters };
  for (const E of i.enemies) {
    if (!E.enemyId) continue;
    const R = g[E.enemyId] ?? { seen: !1, defeated: !1, dropsFound: [] };
    g[E.enemyId] = { ...R, seen: !0, defeated: R.defeated || E.isDown };
  }
  if (o)
    for (const E of i.drops) {
      const R = g[E.enemyId];
      R &&
        !R.dropsFound.includes(E.itemId) &&
        (g[E.enemyId] = { ...R, dropsFound: [...R.dropsFound, E.itemId] });
    }
  const y = { ...a.bestiary, monsters: g };
  if (o) {
    const { exp: E, gold: R } = oy(i);
    v += R;
    const S = new Set(d.map((j) => j.charId)),
      w = S.size > 0 ? Math.floor(E / S.size) : 0;
    h = h.map((j) => (S.has(j.id) ? N1(j, w) : j));
  }
  const _ = i.summons
    .filter((E) => {
      var R;
      return (
        !E.isDown &&
        E.summonKind &&
        ((R = Ca[E.summonKind]) == null ? void 0 : R.persistsAfterBattle)
      );
    })
    .map((E) => ({ summonKind: E.summonKind, ownerId: E.ownerId ?? '', hp: E.hp }));
  let b = {
    ...a,
    guild: { ...a.guild, members: h, gold: v, bestiary: y },
    bestiary: y,
    diveState: { ...a.diveState, party: d, persistentSummons: _ },
  };
  for (const E of i.consumedItems) b = Rr(b, E, 1);
  if (o) for (const E of i.drops) b = Mr(b, E.itemId, 1);
  return b;
}
const k1 = 8,
  rr = 16,
  ji = 5;
function Ur(a) {
  return a.range(k1, rr);
}
function A1(a, i) {
  const o = a - 1;
  return o <= 0
    ? { stepsUntilEncounter: Ur(i), triggered: !0 }
    : { stepsUntilEncounter: o, triggered: !1 };
}
function C1(a) {
  const i = Math.max(0, rr - a),
    o = Math.round((i / rr) * ji);
  return Math.min(ji, Math.max(0, o));
}
const Jt = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  Ta = ['N', 'E', 'S', 'W'];
function ry(a) {
  return Ta[(Ta.indexOf(a) + 1) % 4];
}
function fy(a) {
  return Ta[(Ta.indexOf(a) + 3) % 4];
}
function j1(a) {
  return Ta[(Ta.indexOf(a) + 2) % 4];
}
const M1 = (a, i, o) => a >= 0 && i >= 0 && a < o.width && i < o.height;
function xa(a, i, o, s) {
  if (a.cells[o][i].walls[s]) return !1;
  const r = i + Jt[s].dx,
    d = o + Jt[s].dy;
  return M1(r, d, a) ? a.cells[d][r].passable : !1;
}
function R1(a, i, o) {
  return xa(a, i.x, i.y, o) ? { x: i.x + Jt[o].dx, y: i.y + Jt[o].dy } : null;
}
function qr(a, i, o) {
  return ['N', 'E', 'S', 'W'].filter((s) => !a.cells[o][i].walls[s]);
}
const mp = ['N', 'E', 'S', 'W'],
  Po = (a, i) => Math.abs(a.x - i.x) + Math.abs(a.y - i.y);
function w1(a, i, o, s, r) {
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
    !_.alerted && Po(_.cell, o) <= b.sightRange && (_.alerted = !0);
    const E = (R) => {
      if (!xa(a, _.cell.x, _.cell.y, R)) return 'blocked';
      const S = _.cell.x + Jt[R].dx,
        w = _.cell.y + Jt[R].dy;
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
          w = Po(_.cell, o),
          j = !1;
        for (const k of mp) {
          const V = _.cell.x + Jt[k].dx,
            P = _.cell.y + Jt[k].dy;
          if (V === o.x && P === o.y && xa(a, _.cell.x, _.cell.y, k)) {
            ((S = k), (j = !0));
            break;
          }
          if (!xa(a, _.cell.x, _.cell.y, k) || v.has(`${V},${P}`)) continue;
          const ee = Po({ x: V, y: P }, o);
          ee < w && ((w = ee), (S = k));
        }
        if (!S) break;
        const A = E(S);
        if (A === 'contact' || A === 'blocked' || j) break;
      }
    else {
      const R = b.patrol;
      if (R.kind === 'wander') {
        const S = mp.filter(
          (w) =>
            xa(a, _.cell.x, _.cell.y, w) && !v.has(`${_.cell.x + Jt[w].dx},${_.cell.y + Jt[w].dy}`)
        );
        S.length > 0 && E(r.pick(S));
      } else R.kind === 'charge' && E(R.dir);
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
  O1 = Object.keys(Rn);
function D1(a) {
  return Object.values(dn)
    .filter((i) => i.tierBand === a && !i.id.startsWith('enemy_boss'))
    .map((i) => i.id);
}
const Rl = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  z1 = { N: 'S', E: 'W', S: 'N', W: 'E' };
function B1(a) {
  return Math.min(25, 15 + Math.floor(a / 5));
}
function L1() {
  return { walls: { N: !0, E: !0, S: !0, W: !0 }, floorType: 'normal', passable: !0 };
}
const fr = (a, i, o, s) => a >= 0 && i >= 0 && a < o && i < s;
function hp(a, i, o, s) {
  const { dx: r, dy: d } = Rl[s];
  ((a[o][i].walls[s] = !1), (a[o + d][i + r].walls[z1[s]] = !1));
}
function U1(a, i, o) {
  const s = a.length,
    r = a[0].length,
    d = Array.from({ length: s }, () => Array(r).fill(-1)),
    h = [{ x: i, y: o }];
  d[o][i] = 0;
  for (let v = 0; v < h.length; v++) {
    const { x: g, y } = h[v];
    for (const _ of ['N', 'E', 'S', 'W']) {
      if (a[y][g].walls[_]) continue;
      const b = g + Rl[_].dx,
        E = y + Rl[_].dy;
      !fr(b, E, r, s) || d[E][b] !== -1 || ((d[E][b] = d[y][g] + 1), h.push({ x: b, y: E }));
    }
  }
  return d;
}
function q1(a, i) {
  const o = B1(a),
    s = o,
    r = o,
    d = Array.from({ length: r }, () => Array.from({ length: s }, () => L1())),
    h = Array.from({ length: r }, () => Array(s).fill(!1)),
    v = i.int(s),
    g = i.int(r),
    y = [{ x: v, y: g }];
  for (h[g][v] = !0; y.length > 0; ) {
    const Q = y[y.length - 1],
      Y = [];
    for (const ue of ['N', 'E', 'S', 'W']) {
      const ce = Q.x + Rl[ue].dx,
        I = Q.y + Rl[ue].dy;
      fr(ce, I, s, r) && !h[I][ce] && Y.push(ue);
    }
    if (Y.length === 0) {
      y.pop();
      continue;
    }
    const U = i.pick(Y);
    hp(d, Q.x, Q.y, U);
    const Z = Q.x + Rl[U].dx,
      ae = Q.y + Rl[U].dy;
    ((h[ae][Z] = !0), y.push({ x: Z, y: ae }));
  }
  const _ = Math.floor((s * r) / 25);
  for (let Q = 0; Q < _; Q++) {
    const Y = i.int(s),
      U = i.int(r),
      Z = i.pick(['N', 'E', 'S', 'W']),
      ae = Y + Rl[Z].dx,
      ue = U + Rl[Z].dy;
    fr(ae, ue, s, r) && d[U][Y].walls[Z] && hp(d, Y, U, Z);
  }
  const b = i.int(s),
    E = i.int(r),
    R = U1(d, b, E);
  let S = b,
    w = E,
    j = -1;
  for (let Q = 0; Q < r; Q++)
    for (let Y = 0; Y < s; Y++) R[Q][Y] > j && ((j = R[Q][Y]), (S = Y), (w = Q));
  ((d[E][b].event = { kind: 'stairsDown' }), (d[w][S].event = { kind: 'stairsUp' }));
  const A = Math.floor((a - 1) / 10),
    k = [];
  if (!Ci(a)) {
    const Q = D1(A),
      Y = 1 + Math.floor(a / 8);
    for (let U = 0; U < Y && Q.length > 0; U++) {
      let Z = i.int(s),
        ae = i.int(r);
      for (let ue = 0; ue < 20; ue++) {
        ((Z = i.int(s)), (ae = i.int(r)));
        const ce = d[ae][Z].event,
          I = Math.abs(Z - b) + Math.abs(ae - E) >= 3;
        if (!ce && I) break;
      }
      k.push({
        id: `foe_${U}`,
        enemyId: i.pick(Q),
        startCell: { x: Z, y: ae },
        patrol: { kind: 'wander' },
        moveSpeed: 1,
        sightRange: 3,
        respawn: !1,
      });
    }
  }
  const V = [],
    P = () => {
      for (let Q = 0; Q < 25; Q++) {
        const Y = i.int(s),
          U = i.int(r),
          Z = Math.abs(Y - b) + Math.abs(U - E) >= 2;
        if (!d[U][Y].event && Z) return { x: Y, y: U };
      }
      return null;
    },
    ee = 2 + Math.floor(a / 10);
  for (let Q = 0; Q < ee; Q++) {
    const Y = P();
    if (!Y) break;
    const U = i.pick(O1),
      Z = `gather_${Q}`;
    ((d[Y.y][Y.x].event = { kind: 'gather', gatherId: Z }), V.push({ id: Z, cell: Y, type: U }));
  }
  if (!Ci(a)) {
    const Q = P();
    Q && (d[Q.y][Q.x].event = { kind: 'cookingSpot', spotId: 'cook_0' });
  }
  return {
    depth: a,
    width: s,
    height: r,
    cells: d,
    encounterTable: `band_${A}`,
    foeSpawns: k,
    gatheringPoints: V,
    bgmId: Ci(a) ? 'bgm_boss' : 'bgm_dungeon',
  };
}
function dy(a, i) {
  var o;
  for (let s = 0; s < a.height; s++)
    for (let r = 0; r < a.width; r++)
      if (((o = a.cells[s][r].event) == null ? void 0 : o.kind) === i) return { x: r, y: s };
  return null;
}
const H1 = 4294967296;
function G1(a, i) {
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
    qo(this, 'baseSeed');
    qo(this, '_state');
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
      ((i ^ (i >>> 14)) >>> 0) / H1
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
    const o = G1(this.baseSeed, i);
    return new Hr(o, o);
  }
}
function On(a) {
  return new Hr(a, a);
}
function Y1() {
  return Math.floor(Math.random() * 4294967296) >>> 0;
}
const ds = (a, i) => `${a},${i}`;
function $1(a, i) {
  return On(a).fork(`floor:${i}`);
}
function my(a, i) {
  const o = a.towerState.floors[i];
  if (o) return { save: a, floor: o };
  const s = q1(i, $1(a.masterSeed, i)),
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
function X1(a) {
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
function ms(a, i, o, s) {
  const r = a.towerState.floors[i].generated,
    d = new Set(a.exploredCells[i] ?? []);
  d.add(ds(o, s));
  for (const h of qr(r, o, s)) {
    const v = o + (h === 'E' ? 1 : h === 'W' ? -1 : 0),
      g = s + (h === 'S' ? 1 : h === 'N' ? -1 : 0);
    d.add(ds(v, g));
  }
  return { ...a, exploredCells: { ...a.exploredCells, [i]: [...d] } };
}
function hy(a, i, o) {
  var g, y;
  const s = my(a, i);
  let r = s.save;
  const d = s.floor.generated,
    h = dy(d, 'stairsDown') ?? { x: 0, y: 0 },
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
        party: ((g = r.diveState) == null ? void 0 : g.party) ?? X1(r),
        persistentSummons: ((y = r.diveState) == null ? void 0 : y.persistentSummons) ?? [],
        encounter: { stepsUntilEncounter: Ur(o) },
        pendingFoeBattle: null,
      },
    }),
    ms(r, i, h.x, h.y)
  );
}
function V1(a, i = 1) {
  const o = On(a.masterSeed).fork(`dive:${a.towerState.record.totalDives}`),
    s = {
      ...a,
      diveState: null,
      towerState: {
        ...a.towerState,
        record: { ...a.towerState.record, totalDives: a.towerState.record.totalDives + 1 },
      },
    };
  return hy(s, i, o);
}
function py(a, i) {
  return a.diveState ? { ...a, diveState: { ...a.diveState, dir: i } } : a;
}
function yy(a, i, o) {
  const s = a.towerState.floors[i];
  return {
    ...a,
    towerState: {
      ...a.towerState,
      floors: { ...a.towerState.floors, [i]: { ...s, foeRuntime: o } },
    },
  };
}
function Q1(a, i, o) {
  const s = a.diveState;
  if (!s) return { save: a, moved: !1, triggered: !1 };
  const r = a.towerState.floors[s.depth],
    d = r.generated,
    h = R1(d, s.pos, i);
  if (!h) return { save: py(a, i), moved: !1, triggered: !1 };
  const v = r.foeRuntime.find((b) => !b.defeated && b.cell.x === h.x && b.cell.y === h.y);
  if (v) {
    const b = d.foeSpawns.find((S) => S.id === v.spawnId),
      E = b ? { spawnId: v.spawnId, enemyId: b.enemyId, firstStrike: 'preemptive' } : null;
    let R = { ...a, diveState: { ...s, pos: h, dir: i, pendingFoeBattle: E } };
    return ((R = ms(R, s.depth, h.x, h.y)), { save: R, moved: !0, triggered: E !== null });
  }
  const g = A1(s.encounter.stepsUntilEncounter, o);
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
  y = ms(y, s.depth, h.x, h.y);
  const _ = w1(d, r.foeRuntime, h, i, o);
  return (
    (y = yy(y, s.depth, _.foes)),
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
function Z1(a, i) {
  const o = a.diveState;
  if (!o) return a;
  const s = o.pendingFoeBattle;
  let r = { ...a, diveState: { ...o, pendingFoeBattle: null } };
  if (s && i) {
    const h = r.towerState.floors[o.depth].foeRuntime.map((v) =>
      v.spawnId === s.spawnId ? { ...v, defeated: !0 } : v
    );
    r = yy(r, o.depth, h);
  }
  return r;
}
function pp(a) {
  const i = a.diveState;
  if (!i) return null;
  const o = a.towerState.floors[i.depth].generated.cells[i.pos.y][i.pos.x].event;
  return (o == null ? void 0 : o.kind) === 'stairsUp' ||
    (o == null ? void 0 : o.kind) === 'stairsDown'
    ? o.kind
    : null;
}
function K1(a) {
  if (!a.diveState) return a;
  const i = a.diveState.depth + 1,
    o = On(a.masterSeed).fork(`enc:${i}:${a.towerState.record.totalDives}`);
  return hy(a, i, o);
}
function I1(a) {
  if (!a.diveState) return a;
  const i = a.diveState.depth;
  if (i <= 1) return Ri(a);
  const o = i - 1,
    s = my(a, o),
    r = dy(s.floor.generated, 'stairsUp') ?? { x: 0, y: 0 },
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
    ms(h, o, r.x, r.y)
  );
}
function Ri(a) {
  return { ...a, diveState: null };
}
const J1 = { 10: 'enemy_boss_gatekeeper' };
function W1(a) {
  const i = Math.floor((a - 1) / 10);
  return Object.values(dn)
    .filter((o) => o.tierBand === i && !o.id.startsWith('enemy_boss'))
    .map((o) => o.id);
}
function F1(a, i) {
  if (Ci(a)) {
    const r = J1[a];
    if (r) return [r];
  }
  const o = W1(a);
  if (o.length === 0) return [];
  const s = i.range(1, 3);
  return Array.from({ length: s }, () => i.pick(o));
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
function P1() {
  return Object.values(ja)
    .filter((a) => a.unlockedByDefault)
    .map((a) => a.id);
}
const us = 2,
  eS = { autoMap: 'on', bgmVolume: 0.6, seVolume: 0.6 };
function yp() {
  return { monsters: {}, items: {} };
}
function tS() {
  return { deepestReached: 0, highestBossDefeated: 0, totalDives: 0, bossDefeatLog: [] };
}
const lS = () => ({ weapon: null, armor: null, accessory: null });
function nS() {
  return `char_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function gy(a) {
  var v;
  const { raceId: i, classId: o, name: s, id: r } = a;
  if (!Wt[i]) throw new Error(`createCharacter: 未定義の種族 "${i}"`);
  if (!gt[o]) throw new Error(`createCharacter: 未定義の職業 "${o}"`);
  const d = (v = gt[o].skillTree.skills[0]) == null ? void 0 : v.skillId,
    h = d ? { [d]: 1 } : {};
  return {
    id: r ?? nS(),
    name: s,
    raceId: i,
    classId: o,
    titleId: null,
    level: 1,
    exp: 0,
    skillPoints: { total: 0, spent: 0 },
    learnedSkills: h,
    equipment: lS(),
  };
}
function aS() {
  return { front: Array(gs).fill(null), back: Array(_s).fill(null) };
}
function iS(a, i) {
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
function uS(a, i) {
  return a.guild.members.length >= cr
    ? a
    : {
        ...a,
        guild: { ...a.guild, members: [...a.guild.members, i], party: iS(a.guild.party, i.id) },
      };
}
function sS(a) {
  return {
    schemaVersion: us,
    savedAt: 0,
    masterSeed: Y1(),
    settings: { ...eS },
    guild: {
      name: a,
      gold: Wb,
      members: [],
      party: aS(),
      storage: [],
      equipment: [],
      foodStorage: [],
      bestiary: yp(),
    },
    towerState: { floors: {}, bossGates: {}, warp: { unlockedCheckpoints: [] }, record: tS() },
    diveState: null,
    bestiary: yp(),
    playerMaps: {},
    exploredCells: {},
    forgeInventory: { fragments: {}, ingots: { copper: 0, silver: 0, gold: 0 } },
    shopStock: { unlockedTier: 0, unlockedItemIds: [] },
    unlockedRecipeIds: P1(),
    flags: {},
  };
}
const dr = (a, i) => i.some((o) => a instanceof o);
let gp, _p;
function cS() {
  return gp || (gp = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function oS() {
  return (
    _p ||
    (_p = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const mr = new WeakMap(),
  er = new WeakMap(),
  bs = new WeakMap();
function rS(a) {
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
  return (bs.set(i, a), i);
}
function fS(a) {
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
function _y(a) {
  hr = a(hr);
}
function dS(a) {
  return oS().includes(a)
    ? function (...i) {
        return (a.apply(pr(this), i), wn(this.request));
      }
    : function (...i) {
        return wn(a.apply(pr(this), i));
      };
}
function mS(a) {
  return typeof a == 'function'
    ? dS(a)
    : (a instanceof IDBTransaction && fS(a), dr(a, cS()) ? new Proxy(a, hr) : a);
}
function wn(a) {
  if (a instanceof IDBRequest) return rS(a);
  if (er.has(a)) return er.get(a);
  const i = mS(a);
  return (i !== a && (er.set(a, i), bs.set(i, a)), i);
}
const pr = (a) => bs.get(a);
function hS(a, i, { blocked: o, upgrade: s, blocking: r, terminated: d } = {}) {
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
const pS = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  yS = ['put', 'add', 'delete', 'clear'],
  tr = new Map();
function vp(a, i) {
  if (!(a instanceof IDBDatabase && !(i in a) && typeof i == 'string')) return;
  if (tr.get(i)) return tr.get(i);
  const o = i.replace(/FromIndex$/, ''),
    s = i !== o,
    r = yS.includes(o);
  if (!(o in (s ? IDBIndex : IDBObjectStore).prototype) || !(r || pS.includes(o))) return;
  const d = async function (h, ...v) {
    const g = this.transaction(h, r ? 'readwrite' : 'readonly');
    let y = g.store;
    return (s && (y = y.index(v.shift())), (await Promise.all([y[o](...v), r && g.done]))[0]);
  };
  return (tr.set(i, d), d);
}
_y((a) => ({
  ...a,
  get: (i, o, s) => vp(i, o) || a.get(i, o, s),
  has: (i, o) => !!vp(i, o) || a.has(i, o),
}));
const gS = ['continue', 'continuePrimaryKey', 'advance'],
  bp = {},
  yr = new WeakMap(),
  vy = new WeakMap(),
  _S = {
    get(a, i) {
      if (!gS.includes(i)) return a[i];
      let o = bp[i];
      return (
        o ||
          (o = bp[i] =
            function (...s) {
              yr.set(this, vy.get(this)[i](...s));
            }),
        o
      );
    },
  };
async function* vS(...a) {
  let i = this;
  if ((i instanceof IDBCursor || (i = await i.openCursor(...a)), !i)) return;
  i = i;
  const o = new Proxy(i, _S);
  for (vy.set(o, i), bs.set(o, pr(i)); i; )
    (yield o, (i = await (yr.get(o) || i.continue())), yr.delete(o));
}
function Sp(a, i) {
  return (
    (i === Symbol.asyncIterator && dr(a, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (i === 'iterate' && dr(a, [IDBIndex, IDBObjectStore]))
  );
}
_y((a) => ({
  ...a,
  get(i, o, s) {
    return Sp(i, o) ? vS : a.get(i, o, s);
  },
  has(i, o) {
    return Sp(i, o) || a.has(i, o);
  },
}));
const bS = { 1: (a) => SS(a) },
  lr = (a) => typeof a == 'object' && a !== null && !Array.isArray(a);
function SS(a) {
  const i = { ...a, schemaVersion: 2 };
  let o = 0;
  const s = (d) => ({ id: `eq_mig_${Date.now().toString(36)}_${o++}`, masterId: d, forgeLevel: 0 }),
    r = lr(i.guild) ? { ...i.guild } : {};
  return (
    Array.isArray(r.equipment) || (r.equipment = []),
    Array.isArray(r.foodStorage) || (r.foodStorage = []),
    Array.isArray(r.members) &&
      (r.members = r.members.map((d) => {
        if (!lr(d)) return d;
        const h = lr(d.equipment) ? { ...d.equipment } : {};
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
function xS(a) {
  return structuredClone(a);
}
function ba(a) {
  return typeof a == 'object' && a !== null && !Array.isArray(a);
}
function ES(a) {
  if (
    !ba(a) ||
    typeof a.schemaVersion != 'number' ||
    typeof a.masterSeed != 'number' ||
    !ba(a.guild)
  )
    return !1;
  const i = a.guild;
  return !(
    typeof i.name != 'string' ||
    !Array.isArray(i.members) ||
    !Array.isArray(i.equipment) ||
    !ba(a.forgeInventory) ||
    !ba(a.towerState) ||
    !ba(a.towerState.record) ||
    typeof a.towerState.record.deepestReached != 'number'
  );
}
function by(a) {
  if (!ba(a) || typeof a.schemaVersion != 'number')
    return { ok: !1, reason: 'セーブデータの構造が不正です' };
  let i = a.schemaVersion;
  if (i > us) return { ok: !1, reason: `未知のバージョン (${i} > ${us}) のセーブデータです` };
  let o = { ...a };
  for (; i < us; ) {
    const s = bS[i];
    if (!s) return { ok: !1, reason: `バージョン ${i} の migration が未定義です` };
    ((o = s(o)), (i = typeof o.schemaVersion == 'number' ? o.schemaVersion : i + 1));
  }
  return ES(o)
    ? { ok: !0, data: o }
    : { ok: !1, reason: 'migration 後のデータが SaveData の形をしていません' };
}
function TS(a) {
  return {
    guildName: a.guild.name,
    deepestReached: a.towerState.record.deepestReached,
    memberCount: a.guild.members.length,
    savedAt: a.savedAt,
  };
}
function xp() {
  return {
    guildName: '(破損データ)',
    deepestReached: 0,
    memberCount: 0,
    savedAt: 0,
    corrupted: !0,
  };
}
const NS = 'sekaiju-like-game',
  kS = 1,
  wi = 'saves',
  Gr = 'main';
let nr = null;
function Yr() {
  return (
    nr ||
      (nr = hS(NS, kS, {
        upgrade(a) {
          a.objectStoreNames.contains(wi) || a.createObjectStore(wi);
        },
      })),
    nr
  );
}
async function ar(a) {
  const i = { ...a, savedAt: Date.now() };
  return (await (await Yr()).put(wi, xS(i), Gr), i);
}
async function AS() {
  const i = await (await Yr()).get(wi, Gr);
  return i === void 0 ? { ok: !1, reason: 'empty' } : by(i);
}
async function CS() {
  const i = await (await Yr()).get(wi, Gr);
  if (i === void 0) return null;
  const o = by(i);
  if (!o.ok) return xp();
  try {
    return TS(o.data);
  } catch {
    return xp();
  }
}
const Sy = { save: null, saving: !1 };
function jS(a, i) {
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
      return { ...Sy };
  }
}
const xy = N.createContext(null);
function MS(a) {
  const i = N.useRef(a);
  return ((i.current = a), i);
}
function RS({ children: a }) {
  const [i, o] = N.useReducer(jS, Sy),
    s = MS(i),
    r = N.useCallback(async (b) => {
      const E = sS(b),
        R = await ar(E);
      o({ type: 'load', save: R });
    }, []),
    d = N.useCallback(async () => {
      const b = await AS();
      return b.ok ? (o({ type: 'load', save: b.data }), { ok: !0 }) : { ok: !1, reason: b.reason };
    }, []),
    h = N.useCallback((b) => {
      o({ type: 'updateSave', updater: b });
    }, []),
    v = N.useCallback(
      async (b) => {
        const E = s.current.save;
        if (!E) return;
        const R = b(E);
        (o({ type: 'setSave', save: R }), o({ type: 'saving', saving: !0 }));
        try {
          const S = await ar(R);
          o({ type: 'setSave', save: S });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      },
      [s]
    ),
    g = N.useCallback(async () => {
      const { save: b } = s.current;
      if (b) {
        o({ type: 'saving', saving: !0 });
        try {
          const E = await ar(b);
          o({ type: 'setSave', save: E });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      }
    }, [s]),
    y = N.useCallback(() => {
      o({ type: 'clear' });
    }, []),
    _ = N.useMemo(
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
  return m.jsx(xy.Provider, { value: _, children: a });
}
function zl() {
  const a = N.useContext(xy);
  if (!a) throw new Error('useGameState は GameStateProvider の内側で使ってください');
  return a;
}
const wS = () => {
    var ut, Ve;
    const a = il(),
      { save: i, applyAndPersist: o } = zl(),
      s = N.useRef(null),
      [r, d] = N.useState(null),
      [h, v] = N.useState({}),
      [g, y] = N.useState(null),
      [_, b] = N.useState(!1),
      [E, R] = N.useState(!1),
      [S, w] = N.useState(null),
      [j, A] = N.useState(!1),
      [k, V] = N.useState(null),
      [P, ee] = N.useState(null);
    N.useEffect(() => {
      if (r || !(i != null && i.diveState)) return;
      const G = i.diveState.depth,
        oe = (i.masterSeed ^ (G * 2654435761) ^ (i.towerState.record.totalDives * 40503)) >>> 0;
      s.current = On(oe);
      const de = i.diveState.pendingFoeBattle;
      d(de ? op(i, [de.enemyId], de.firstStrike) : op(i, F1(G, s.current)));
    }, [i, r]);
    const Q = N.useRef(!1);
    N.useEffect(() => {
      !r ||
        !s.current ||
        Q.current ||
        (r.turn === 1 &&
          r.firstStrike === 'ambush' &&
          r.outcome === 'ongoing' &&
          ((Q.current = !0), d(Fo(r, [], s.current))));
    }, [r]);
    const Y = N.useMemo(() => (r == null ? void 0 : r.enemies.filter((G) => !G.isDown)) ?? [], [r]),
      U = N.useMemo(() => (r == null ? void 0 : r.allies.filter((G) => !G.isDown)) ?? [], [r]);
    (N.useEffect(() => {
      Y.length > 0 && !Y.some((G) => G.id === S) && w(Y[0].id);
    }, [Y, S]),
      N.useEffect(() => {
        if ((r == null ? void 0 : r.outcome) !== 'ongoing' || (g && U.some((oe) => oe.id === g)))
          return;
        const G = U.find((oe) => !h[oe.id]) ?? null;
        y(G ? G.id : null);
      }, [r, U, g, h]));
    const Z = U.length > 0 && U.every((G) => h[G.id] !== void 0),
      ae = N.useCallback(
        (G, oe) => {
          const de = { ...h, [G]: oe };
          (v(de), b(!1), R(!1));
          const Re = U.find((Te) => Te.id !== G && !de[Te.id]);
          y(Re ? Re.id : null);
        },
        [h, U]
      ),
      ue = N.useCallback(
        async (G) => {
          A(!0);
          const oe = G.outcome === 'win';
          G.outcome === 'lose'
            ? (await o((de) => Ri(dp(de, G))), a('/town'))
            : (await o((de) => Z1(dp(de, G), oe)), a('/dungeon'));
        },
        [o, a]
      ),
      ce = N.useCallback(() => {
        var G;
        (v({}), b(!1), R(!1), V(null), ee(null), y(((G = U[0]) == null ? void 0 : G.id) ?? null));
      }, [U]),
      I = N.useCallback(() => {
        var Re;
        if (!r || !s.current || r.outcome !== 'ongoing') return;
        const G = S ?? ((Re = Y[0]) == null ? void 0 : Re.id) ?? '',
          oe = U.map((Te) => {
            const vt = h[Te.id] ?? { kind: 'attack' };
            return vt.kind === 'guard'
              ? { kind: 'guard', actorId: Te.id }
              : vt.kind === 'skill'
                ? { kind: 'skill', actorId: Te.id, skillId: vt.skillId, targetId: G }
                : vt.kind === 'item'
                  ? { kind: 'item', actorId: Te.id, itemId: vt.itemId, targetId: Te.id }
                  : { kind: 'attack', actorId: Te.id, targetId: G };
          });
        if (k) {
          const Te = Sa[k.unionSkillId],
            vt =
              (Te == null ? void 0 : Te.target) === 'enemyOne' ||
              (Te == null ? void 0 : Te.target) === 'enemyRow' ||
              (Te == null ? void 0 : Te.target) === 'enemyAll';
          oe.unshift({ kind: 'union', ...k, targetId: vt ? G : k.targetId });
        }
        const de = Fo(r, oe, s.current);
        (d(de), v({}), b(!1), R(!1), V(null), ee(null), y(null));
      }, [r, h, S, U, Y, k]),
      J = N.useCallback(() => {
        if (!r || !s.current || r.outcome !== 'ongoing') return;
        const G = U[0];
        G && (d(Fo(r, [{ kind: 'flee', actorId: G.id }], s.current)), v({}), y(null));
      }, [r, U]);
    if (!i || !i.diveState) return m.jsx(nl, { to: '/town', replace: !0 });
    if (!r) return m.jsx('div', { className: F.layout, children: '戦闘準備中...' });
    const he = (G) => {
        const oe = i.guild.members.find((de) => de.id === G.id);
        return oe
          ? Object.keys(oe.learnedSkills).filter((de) => de in fn && G.tp >= fn[de].tpCost(1))
          : [];
      },
      L = () => {
        const G = (de) =>
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
            remaining: Fp(i, de.itemId) - oe(de.itemId) - G(de.itemId),
          }))
          .filter((de) => de.remaining > 0);
      },
      K = (G) => {
        var de, Re;
        const oe = h[G.id];
        return oe
          ? oe.kind === 'attack'
            ? '攻撃'
            : oe.kind === 'guard'
              ? '防御'
              : oe.kind === 'item'
                ? (((de = et[oe.itemId]) == null ? void 0 : de.name) ?? 'どうぐ')
                : (((Re = fn[oe.skillId]) == null ? void 0 : Re.name) ?? 'スキル')
          : '';
      },
      te = (G) => {
        const oe = (Re) => Re === 'headBind' || Re === 'armBind' || Re === 'legBind';
        let de = '';
        return (
          G.ailments.some((Re) => oe(Re.type)) && (de += ' 🔒'),
          G.ailments.some((Re) => !oe(Re.type)) && (de += ' 🌀'),
          de
        );
      },
      ge = (G) => {
        var Re;
        const oe = i.guild.members.find((Te) => Te.id === G.id);
        if (!oe) return null;
        const de =
          (Re = Wt[oe.raceId]) == null
            ? void 0
            : Re.raceSkillTree.skills.find((Te) => Te.skillId in Sa);
        return !de || !(de.skillId in oe.learnedSkills) ? null : (Sa[de.skillId] ?? null);
      },
      Ee = (G, oe, de) => {
        var vt;
        const Te =
          oe.target === 'enemyOne' || oe.target === 'enemyRow' || oe.target === 'enemyAll'
            ? (S ?? ((vt = Y[0]) == null ? void 0 : vt.id) ?? '')
            : G;
        (V({ actorId: G, unionSkillId: oe.id, participantIds: de, targetId: Te }), ee(null));
      },
      C = (G, oe) => {
        oe.requiredParticipants <= 1 ? Ee(G.id, oe, [G.id]) : ee({ actorId: G.id, def: oe });
      },
      H = g ? U.find((G) => G.id === g) : void 0,
      W = ((ut = r.enemies.find((G) => G.id === S)) == null ? void 0 : ut.name) ?? '-',
      le = oy(r),
      pe = (G) =>
        m.jsxs(
          'button',
          {
            type: 'button',
            className: [
              F.card,
              G.isDown ? F.down : '',
              g === G.id ? F.cardActive : '',
              h[G.id] ? F.cardDecided : '',
            ].join(' '),
            disabled: G.isDown || r.outcome !== 'ongoing',
            onClick: () => {
              (y(G.id), b(!1), R(!1));
            },
            children: [
              m.jsxs('div', {
                className: F.cardName,
                children: [
                  G.name,
                  G.unionGauge >= 100 ? m.jsx('span', { className: F.uni, children: '★' }) : null,
                  te(G),
                ],
              }),
              m.jsx(es, { value: G.hp, max: G.maxHp, color: '#4caf50', showValue: !1 }),
              m.jsx(es, { value: G.tp, max: G.maxTp, color: '#2196f3', showValue: !1 }),
              m.jsxs('div', {
                className: F.cardNums,
                children: ['HP ', Math.max(0, G.hp), ' · TP ', G.tp],
              }),
              h[G.id] ? m.jsxs('div', { className: F.cardCmd, children: ['▶ ', K(G)] }) : null,
            ],
          },
          G.id
        ),
      be = r.allies.filter((G) => G.row === 'front'),
      Ce = r.allies.filter((G) => G.row === 'back');
    return m.jsxs('div', {
      className: F.layout,
      children: [
        m.jsx('div', {
          className: F.enemies,
          children: r.enemies.map((G) =>
            m.jsxs(
              'button',
              {
                type: 'button',
                className: `${F.enemy} ${G.isDown ? F.down : ''} ${S === G.id ? F.targeted : ''}`,
                disabled: G.isDown,
                onClick: () => w(G.id),
                children: [
                  m.jsxs('span', { className: F.enemyName, children: [G.name, te(G)] }),
                  m.jsx(es, { value: G.hp, max: G.maxHp, color: '#e57373', showValue: !1 }),
                ],
              },
              G.id
            )
          ),
        }),
        r.summons.length > 0
          ? m.jsx('div', {
              className: F.summons,
              children: r.summons.map((G) =>
                m.jsxs(
                  'div',
                  {
                    className: `${F.summon} ${G.isDown ? F.down : ''}`,
                    children: [
                      m.jsxs('span', { className: F.summonName, children: ['🐾 ', G.name] }),
                      m.jsx(es, { value: G.hp, max: G.maxHp, color: '#8d6e63', showValue: !1 }),
                      m.jsxs('span', {
                        className: F.summonHp,
                        children: ['HP ', Math.max(0, G.hp)],
                      }),
                    ],
                  },
                  G.id
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
                        (Ve = Sa[k.unionSkillId]) == null ? void 0 : Ve.name,
                        m.jsx('button', {
                          type: 'button',
                          className: F.unionCancel,
                          onClick: () => V(null),
                          children: '取消',
                        }),
                      ],
                    })
                  : null,
                H
                  ? m.jsxs(m.Fragment, {
                      children: [
                        m.jsxs('div', { className: F.cmdHead, children: [H.name, ' のコマンド'] }),
                        _
                          ? m.jsxs('div', {
                              className: F.skillList,
                              children: [
                                he(H).map((G) => {
                                  var oe;
                                  return m.jsxs(
                                    'button',
                                    {
                                      type: 'button',
                                      className: F.skillBtn,
                                      onClick: () => ae(H.id, { kind: 'skill', skillId: G }),
                                      children: [
                                        m.jsxs('span', {
                                          className: F.skillTop,
                                          children: [
                                            m.jsx('span', {
                                              className: F.skillName,
                                              children: fn[G].name,
                                            }),
                                            m.jsxs('span', {
                                              className: F.tp,
                                              children: ['TP ', fn[G].tpCost(1)],
                                            }),
                                          ],
                                        }),
                                        m.jsx('span', {
                                          className: F.skillDesc,
                                          children:
                                            ((oe = Cr[G]) == null ? void 0 : oe.description) ?? '',
                                        }),
                                      ],
                                    },
                                    G
                                  );
                                }),
                                he(H).length === 0
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
                          : E
                            ? m.jsxs('div', {
                                className: F.skillList,
                                children: [
                                  L().map(({ id: G, remaining: oe }) =>
                                    m.jsxs(
                                      'button',
                                      {
                                        type: 'button',
                                        className: F.skillBtn,
                                        onClick: () => ae(H.id, { kind: 'item', itemId: G }),
                                        children: [
                                          m.jsx('span', {
                                            className: F.skillTop,
                                            children: m.jsxs('span', {
                                              className: F.skillName,
                                              children: [et[G].name, ' ×', oe],
                                            }),
                                          }),
                                          m.jsx('span', {
                                            className: F.skillDesc,
                                            children: et[G].description,
                                          }),
                                        ],
                                      },
                                      G
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
                                    U.filter((G) => G.id !== P.actorId).map((G) =>
                                      m.jsx(
                                        'button',
                                        {
                                          type: 'button',
                                          className: F.skillBtn,
                                          onClick: () => Ee(P.actorId, P.def, [P.actorId, G.id]),
                                          children: m.jsxs('span', {
                                            className: F.skillTop,
                                            children: [
                                              m.jsx('span', {
                                                className: F.skillName,
                                                children: G.name,
                                              }),
                                              m.jsxs('span', {
                                                className: F.tp,
                                                children: ['ゲージ ', G.unionGauge],
                                              }),
                                            ],
                                          }),
                                        },
                                        G.id
                                      )
                                    ),
                                    U.filter((G) => G.id !== P.actorId).length === 0
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
                                      onClick: () => ae(H.id, { kind: 'attack' }),
                                      children: '攻撃',
                                    }),
                                    m.jsx('button', {
                                      type: 'button',
                                      className: F.menuBtn,
                                      onClick: () => ae(H.id, { kind: 'guard' }),
                                      children: '防御',
                                    }),
                                    m.jsx('button', {
                                      type: 'button',
                                      className: F.menuBtn,
                                      disabled: he(H).length === 0,
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
                                      const G = ge(H);
                                      return !G || H.unionGauge < 100 || k
                                        ? null
                                        : m.jsx('button', {
                                            type: 'button',
                                            className: `${F.menuBtn} ${F.unionBtn}`,
                                            onClick: () => C(H, G),
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
              : r.log.map((G, oe) => m.jsx('div', { className: F.logLine, children: G.text }, oe)),
        }),
      ],
    });
  },
  OS = '_layout_iunlg_1',
  DS = '_head_iunlg_11',
  zS = '_title_iunlg_15',
  BS = '_tabs_iunlg_21',
  LS = '_tab_iunlg_21',
  US = '_tabActive_iunlg_38',
  qS = '_records_iunlg_43',
  HS = '_statBig_iunlg_48',
  GS = '_statNum_iunlg_60',
  YS = '_statLabel_iunlg_67',
  $S = '_statList_iunlg_72',
  XS = '_statRow_iunlg_76',
  VS = '_h2_iunlg_91',
  QS = '_bossLog_iunlg_97',
  ZS = '_bossRow_iunlg_106',
  KS = '_codex_iunlg_114',
  IS = '_codexSummary_iunlg_121',
  JS = '_list_iunlg_127',
  WS = '_row_iunlg_133',
  FS = '_unseen_iunlg_140',
  PS = '_info_iunlg_144',
  e2 = '_name_iunlg_150',
  t2 = '_badge_iunlg_158',
  l2 = '_sub_iunlg_167',
  n2 = '_empty_iunlg_172',
  a2 = '_foot_iunlg_177',
  i2 = '_back_iunlg_181',
  Oe = {
    layout: OS,
    head: DS,
    title: zS,
    tabs: BS,
    tab: LS,
    tabActive: US,
    records: qS,
    statBig: HS,
    statNum: GS,
    statLabel: YS,
    statList: $S,
    statRow: XS,
    h2: VS,
    bossLog: QS,
    bossRow: ZS,
    codex: KS,
    codexSummary: IS,
    list: JS,
    row: WS,
    unseen: FS,
    info: PS,
    name: e2,
    badge: t2,
    sub: l2,
    empty: n2,
    foot: a2,
    back: i2,
  };
function Ey(a) {
  const i = a.bestiary.monsters;
  return Object.values(dn)
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
function u2(a) {
  const i = Ey(a),
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
const s2 = () => {
    const a = il(),
      { save: i } = zl(),
      [o, s] = N.useState('record');
    if (!i) return m.jsx(nl, { to: '/title', replace: !0 });
    const r = i.towerState.record,
      d = u2(i),
      h = Ey(i);
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
  c2 = '_layout_1395s_1',
  o2 = '_head_1395s_13',
  r2 = '_depth_1395s_22',
  f2 = '_theme_1395s_28',
  d2 = '_fpvWrap_1395s_45',
  m2 = '_mapWrap_1395s_51',
  h2 = '_palette_1395s_58',
  p2 = '_tool_1395s_68',
  y2 = '_toolActive_1395s_79',
  g2 = '_paletteHint_1395s_85',
  _2 = '_stairs_1395s_94',
  v2 = '_action_1395s_108',
  b2 = '_notice_1395s_125',
  S2 = '_controls_1395s_133',
  x2 = '_row_1395s_143',
  E2 = '_forward_1395s_149',
  T2 = '_turn_1395s_164',
  N2 = '_back_1395s_178',
  k2 = '_itemOverlay_1395s_189',
  A2 = '_itemPanel_1395s_199',
  C2 = '_itemTitle_1395s_212',
  j2 = '_itemEmpty_1395s_217',
  M2 = '_itemRow_1395s_223',
  R2 = '_itemName_1395s_231',
  w2 = '_itemDesc_1395s_239',
  O2 = '_itemTargets_1395s_245',
  D2 = '_itemTarget_1395s_245',
  z2 = '_itemHp_1395s_265',
  B2 = '_itemUse_1395s_271',
  L2 = '_itemClose_1395s_288',
  me = {
    layout: c2,
    head: o2,
    depth: r2,
    theme: f2,
    return: '_return_1395s_34',
    fpvWrap: d2,
    mapWrap: m2,
    palette: h2,
    tool: p2,
    toolActive: y2,
    paletteHint: g2,
    stairs: _2,
    action: v2,
    notice: b2,
    controls: S2,
    row: x2,
    forward: E2,
    turn: T2,
    back: N2,
    itemOverlay: k2,
    itemPanel: A2,
    itemTitle: C2,
    itemEmpty: j2,
    itemRow: M2,
    itemName: R2,
    itemDesc: w2,
    itemTargets: O2,
    itemTarget: D2,
    itemHp: z2,
    itemUse: B2,
    itemClose: L2,
  },
  U2 = '_canvas_1keax_1',
  q2 = { canvas: U2 },
  Ty = [
    { id: 'icon_chest', symbol: '📦', label: '宝箱' },
    { id: 'icon_foe', symbol: '👹', label: '強敵(FOE)' },
    { id: 'icon_warning', symbol: '⚠️', label: '注意' },
    { id: 'icon_door', symbol: '🚪', label: '扉/近道' },
    { id: 'icon_gather', symbol: '⛏️', label: '採集' },
    { id: 'icon_event', symbol: '❗', label: 'イベント' },
    { id: 'icon_note', symbol: '📝', label: 'メモ' },
    { id: 'icon_star', symbol: '⭐', label: '任意' },
  ],
  H2 = new Map(Ty.map((a) => [a.id, a]));
function G2(a) {
  var i;
  return ((i = H2.get(a)) == null ? void 0 : i.symbol) ?? '•';
}
const Kt = {
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
  Y2 = ({
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
    const y = N.useRef(null),
      _ = Math.max(10, Math.min(v, Math.floor(360 / a.width))),
      b = a.width * _,
      E = a.height * _;
    N.useEffect(() => {
      const S = y.current;
      if (!S) return;
      const w = new Set(i),
        j = new Set(h),
        A = window.devicePixelRatio || 1;
      ((S.width = b * A), (S.height = E * A));
      const k = S.getContext('2d');
      if (!k) return;
      (k.scale(A, A), k.clearRect(0, 0, b, E));
      for (let Z = 0; Z < a.height; Z++)
        for (let ae = 0; ae < a.width; ae++) {
          const ue = w.has(`${ae},${Z}`);
          ((k.fillStyle = ue ? Kt.floor : Kt.fog),
            k.fillRect(ae * _, Z * _, _, _),
            ue &&
              ((k.strokeStyle = Kt.grid),
              (k.lineWidth = 1),
              k.strokeRect(ae * _ + 0.5, Z * _ + 0.5, _ - 1, _ - 1)));
        }
      ((k.strokeStyle = Kt.wall), (k.lineWidth = 2), (k.lineCap = 'round'));
      const V = (Z, ae, ue, ce) => {
        (k.beginPath(), k.moveTo(Z, ae), k.lineTo(ue, ce), k.stroke());
      };
      for (let Z = 0; Z < a.height; Z++)
        for (let ae = 0; ae < a.width; ae++) {
          if (!w.has(`${ae},${Z}`)) continue;
          const ue = a.cells[Z][ae],
            ce = ae * _,
            I = Z * _;
          (ue.walls.N && V(ce, I, ce + _, I),
            ue.walls.S && V(ce, I + _, ce + _, I + _),
            ue.walls.W && V(ce, I, ce, I + _),
            ue.walls.E && V(ce + _, I, ce + _, I + _));
          const J = ue.event;
          if (
            (J == null ? void 0 : J.kind) === 'stairsUp' ||
            (J == null ? void 0 : J.kind) === 'stairsDown'
          )
            ((k.fillStyle = J.kind === 'stairsUp' ? Kt.stairsUp : Kt.stairsDown),
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
            ((k.fillStyle = he ? Kt.gatherDone : Kt.gather),
              k.beginPath(),
              k.arc(ce + _ / 2, I + _ / 2, _ * 0.24, 0, Math.PI * 2),
              k.fill());
          } else
            (J == null ? void 0 : J.kind) === 'cookingSpot' &&
              ((k.fillStyle = Kt.cooking),
              k.fillRect(ce + _ * 0.28, I + _ * 0.28, _ * 0.44, _ * 0.44));
        }
      ((k.font = `${Math.floor(_ * 0.66)}px sans-serif`),
        (k.textAlign = 'center'),
        (k.textBaseline = 'middle'));
      for (const Z of r)
        w.has(`${Z.x},${Z.y}`) && k.fillText(G2(Z.iconId), Z.x * _ + _ / 2, Z.y * _ + _ / 2 + 1);
      for (const Z of d) {
        if (!w.has(`${Z.x},${Z.y}`)) continue;
        const ae = Z.x * _ + _ / 2,
          ue = Z.y * _ + _ / 2;
        ((k.fillStyle = Z.alerted ? Kt.foeAlert : Kt.foe),
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
        Q = _ * 0.34,
        U = { N: -Math.PI / 2, E: 0, S: Math.PI / 2, W: Math.PI }[s];
      ((k.fillStyle = Kt.player),
        k.beginPath(),
        k.moveTo(P + Math.cos(U) * Q, ee + Math.sin(U) * Q),
        k.lineTo(P + Math.cos(U + 2.5) * Q, ee + Math.sin(U + 2.5) * Q),
        k.lineTo(P + Math.cos(U - 2.5) * Q, ee + Math.sin(U - 2.5) * Q),
        k.closePath(),
        k.fill());
    }, [a, i, o, s, r, d, h, _, b, E]);
    const R = (S) => {
      if (!g) return;
      const w = S.currentTarget.getBoundingClientRect(),
        j = Math.floor(((S.clientX - w.left) / w.width) * a.width),
        A = Math.floor(((S.clientY - w.top) / w.height) * a.height);
      j >= 0 && A >= 0 && j < a.width && A < a.height && g(j, A);
    };
    return m.jsx('canvas', {
      ref: y,
      className: q2.canvas,
      style: { width: b, height: E },
      onClick: R,
    });
  },
  $2 = '_gauge_1o2hx_1',
  X2 = '_icon_1o2hx_11',
  V2 = '_segments_1o2hx_16',
  Q2 = '_seg_1o2hx_16',
  Z2 = '_filled_1o2hx_28',
  K2 = '_danger_1o2hx_32',
  va = { gauge: $2, icon: X2, segments: V2, seg: Q2, filled: Z2, danger: K2 },
  I2 = ({ level: a }) => {
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
  J2 = '_view_tw2v9_1',
  W2 = { view: J2 },
  Ep = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } };
function F2(a, i, o, s = 4) {
  const r = fy(o),
    d = ry(o),
    h = [];
  let { x: v, y: g } = i;
  for (let y = 0; y < s; y++) {
    const _ = xa(a, v, g, o);
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
    ((v += Ep[o].dx), (g += Ep[o].dy));
  }
  return h;
}
const P2 = {
    sky: '#26301c',
    ceiling: '#3a4a2c',
    floor: '#5d6b46',
    wall: '#8b9a6b',
    frontWall: '#7a8a5c',
    outline: '#2c3720',
  },
  ex = 0.56,
  tx = ({
    floor: a,
    pos: i,
    dir: o,
    foes: s = [],
    theme: r,
    maxDepth: d = 4,
    width: h = 358,
    height: v = 200,
  }) => {
    const g = N.useRef(null);
    return (
      N.useEffect(() => {
        const y = { ...P2, ...(r ?? {}) },
          _ = g.current;
        if (!_) return;
        const b = window.devicePixelRatio || 1;
        ((_.width = h * b), (_.height = v * b));
        const E = _.getContext('2d');
        if (!E) return;
        E.scale(b, b);
        const R = h,
          S = v,
          w = R / 2,
          j = S / 2,
          A = F2(a, i, o, d),
          k = (ee) => {
            const Q = Math.pow(ex, ee);
            return {
              l: w - (R / 2) * Q,
              r: w + (R / 2) * Q,
              t: j - (S / 2) * Q,
              b: j + (S / 2) * Q,
            };
          },
          V = (ee, Q, Y = !1) => {
            (E.beginPath(), E.moveTo(ee[0][0], ee[0][1]));
            for (let U = 1; U < ee.length; U++) E.lineTo(ee[U][0], ee[U][1]);
            (E.closePath(),
              (E.fillStyle = Q),
              E.fill(),
              Y && ((E.strokeStyle = y.outline), (E.lineWidth = 1), E.stroke()));
          },
          P = (ee) => `rgba(0,0,0,${Math.min(0.5, ee * 0.13)})`;
        ((E.fillStyle = y.sky), E.fillRect(0, 0, R, S));
        for (let ee = A.length - 1; ee >= 0; ee--) {
          const Q = k(ee),
            Y = k(ee + 1),
            U = A[ee];
          (V(
            [
              [Q.l, Q.t],
              [Q.r, Q.t],
              [Y.r, Y.t],
              [Y.l, Y.t],
            ],
            y.ceiling
          ),
            V(
              [
                [Q.l, Q.b],
                [Q.r, Q.b],
                [Y.r, Y.b],
                [Y.l, Y.b],
              ],
              y.floor
            ),
            V(
              [
                [Q.l, Q.t],
                [Y.l, Y.t],
                [Y.l, Y.b],
                [Q.l, Q.b],
              ],
              U.leftOpen ? y.sky : y.wall,
              !0
            ),
            V(
              [
                [Q.r, Q.t],
                [Y.r, Y.t],
                [Y.r, Y.b],
                [Q.r, Q.b],
              ],
              U.rightOpen ? y.sky : y.wall,
              !0
            ),
            U.frontOpen ||
              V(
                [
                  [Y.l, Y.t],
                  [Y.r, Y.t],
                  [Y.r, Y.b],
                  [Y.l, Y.b],
                ],
                y.frontWall,
                !0
              ),
            (E.fillStyle = P(ee)),
            E.fillRect(Y.l, Y.t, Y.r - Y.l, Y.b - Y.t));
          const Z = U.event;
          if (
            (Z == null ? void 0 : Z.kind) === 'stairsUp' ||
            (Z == null ? void 0 : Z.kind) === 'stairsDown'
          ) {
            const ae = w,
              ue = (Q.b + Y.b) / 2 - (Q.b - Y.b) * 0.15,
              ce = Math.max(12, (Q.b - Q.t) * 0.18);
            ((E.fillStyle = Z.kind === 'stairsUp' ? '#e8923a' : '#7aa2d6'),
              E.beginPath(),
              E.arc(ae, ue, ce, 0, Math.PI * 2),
              E.fill(),
              (E.fillStyle = '#fff'),
              (E.font = `bold ${Math.floor(ce * 1.2)}px sans-serif`),
              (E.textAlign = 'center'),
              (E.textBaseline = 'middle'),
              E.fillText(Z.kind === 'stairsUp' ? '▲' : '▼', ae, ue + 1));
          }
          if (ee > 0 && s.some((ae) => ae.x === U.x && ae.y === U.y)) {
            const ae = s.some((J) => J.x === U.x && J.y === U.y && J.alerted),
              ue = w,
              ce = (Q.b + Y.b) / 2 - (Q.b - Y.b) * 0.1,
              I = Math.max(14, (Q.b - Q.t) * 0.22);
            ((E.fillStyle = ae ? '#d32f2f' : '#b0533a'),
              E.beginPath(),
              E.arc(ue, ce, I, 0, Math.PI * 2),
              E.fill(),
              (E.fillStyle = '#fff'),
              (E.font = `bold ${Math.floor(I * 1.3)}px sans-serif`),
              (E.textAlign = 'center'),
              (E.textBaseline = 'middle'),
              E.fillText('!', ue, ce + 1));
          }
        }
      }, [a, i, o, s, r, d, h, v]),
      m.jsx('canvas', { ref: g, className: W2.view, style: { width: h, height: v } })
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
function Tp(a) {
  const i = Math.floor((a - 1) / 10);
  return ts[((i % ts.length) + ts.length) % ts.length];
}
function lx(a) {
  var s, r, d;
  const i = a.diveState;
  if (!i) return !1;
  const o =
    (r = (s = a.towerState.floors[i.depth]) == null ? void 0 : s.generated.cells[i.pos.y]) == null
      ? void 0
      : r[i.pos.x];
  return ((d = o == null ? void 0 : o.event) == null ? void 0 : d.kind) === 'cookingSpot';
}
function nx(a) {
  const i = new Set(a.unlockedRecipeIds ?? []);
  return Object.values(ja).filter((o) => i.has(o.id));
}
function Ny(a, i) {
  const o = ja[i];
  return !o || !(a.unlockedRecipeIds ?? []).includes(i)
    ? !1
    : o.ingredients.every((s) => wr(a, s.itemId) >= s.qty);
}
function ax(a, i) {
  if (!Ny(a, i)) return { ok: !1, save: a };
  const o = ja[i];
  let s = a;
  for (const r of o.ingredients) s = ly(s, r.itemId, r.qty);
  return ((s = ty(s, o.result.itemId, o.result.count)), { ok: !0, save: s });
}
function ky(a, i) {
  const o = new Set([...a.guild.party.front, ...a.guild.party.back].filter((s) => s !== null));
  return a.guild.members.some((s) => o.has(s.id) && (s.learnedSkills[i] ?? 0) > 0);
}
function Ay(a) {
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
        ds(i.cell.x, i.cell.y)
      )
    : !0;
}
function Np(a, i) {
  return ky(a, Rn[i.type].requiredSkillId);
}
function ix(a, i) {
  const o = a.reduce((r, d) => r + d.weight, 0);
  let s = i.next() * o;
  for (const r of a) if (((s -= r.weight), s < 0)) return r.itemId;
  return a[a.length - 1].itemId;
}
function ux(a, i) {
  const o = a.diveState;
  if (!o) return { ok: !1, save: a, reason: 'noDive' };
  const s = Ay(a);
  if (!s) return { ok: !1, save: a, reason: 'noPoint' };
  if (gr(a, s)) return { ok: !1, save: a, reason: 'depleted' };
  const r = Rn[s.type];
  if (!ky(a, r.requiredSkillId)) return { ok: !1, save: a, reason: 'noSkill' };
  if (r.food && ey(a) >= Pp) return { ok: !1, save: a, reason: 'foodFull' };
  const d = ix(r.drops, i);
  let h = r.food ? ty(a, d, 1) : Mr(a, d, 1);
  const v = ds(s.cell.x, s.cell.y),
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
function sx(a, i, o) {
  var w;
  const s = et[i];
  if (!s) return { save: a, ok: !1, message: 'そのアイテムは無い' };
  if (!((w = s.useContext) != null && w.includes('field')))
    return { save: a, ok: !1, message: 'ここでは使えない' };
  const r = Jb(i);
  if ((r ? wr(a, i) : Fp(a, i)) <= 0) return { save: a, ok: !1, message: '所持していない' };
  const h = (j) => (r ? ly(j, i, 1) : Rr(j, i, 1));
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
    E = !1;
  for (const j of s.effects ?? [])
    j.kind === 'heal'
      ? ((_ = Math.min(y.hp, _ + j.amount(1))), (E = !0))
      : j.kind === 'restoreTp' && ((b = Math.min(y.tp, b + j.amount(1))), (E = !0));
  if (!E) return { save: a, ok: !1, message: 'いま使う効果がない' };
  const R = a.diveState.party.map((j) => (j.charId === o ? { ...j, hp: _, tp: b } : j));
  return {
    save: h({ ...a, diveState: { ...a.diveState, party: R } }),
    ok: !0,
    message: `${g.name} に ${s.name} を使った`,
  };
}
function cx(a) {
  return { depth: a, floorPaint: [], wallDraw: [], icons: [], notes: [], autopilotRoutes: [] };
}
function ox(a, i) {
  return a.playerMaps[i] ?? cx(i);
}
function Cy(a, i, o) {
  return { ...a, playerMaps: { ...a.playerMaps, [i]: o } };
}
function rx(a, i, o, s, r) {
  const d = ox(a, i),
    h = d.icons.find((y) => y.x === o && y.y === s),
    v = d.icons.filter((y) => !(y.x === o && y.y === s)),
    g = (h == null ? void 0 : h.iconId) === r ? v : [...v, { x: o, y: s, iconId: r }];
  return Cy(a, i, { ...d, icons: g });
}
function fx(a, i, o, s) {
  const r = a.playerMaps[i];
  return r ? Cy(a, i, { ...r, icons: r.icons.filter((d) => !(d.x === o && d.y === s)) }) : a;
}
const dx = () => {
    var ce;
    const a = il(),
      { save: i, applySave: o, applyAndPersist: s } = zl(),
      r = N.useRef(null),
      [d, h] = N.useState(null),
      [v, g] = N.useState(!1),
      [y, _] = N.useState(!1),
      [b, E] = N.useState(null),
      R = (i == null ? void 0 : i.diveState) ?? null,
      S = N.useMemo(() => {
        var I;
        return i && R ? ((I = i.towerState.floors[R.depth]) == null ? void 0 : I.generated) : null;
      }, [i, R]),
      w = N.useMemo(() => {
        var I;
        return i && R
          ? (((I = i.towerState.floors[R.depth]) == null ? void 0 : I.foeRuntime) ?? [])
              .filter((J) => !J.defeated)
              .map((J) => ({ x: J.cell.x, y: J.cell.y, alerted: J.alerted }))
          : [];
      }, [i, R]),
      j = N.useMemo(() => (i ? Ay(i) : null), [i]),
      A = N.useMemo(() => (i ? lx(i) : !1), [i]),
      k = N.useMemo(() => {
        var I;
        return i && R
          ? (((I = i.towerState.floors[R.depth]) == null ? void 0 : I.depletedGathers) ?? [])
          : [];
      }, [i, R]),
      V = N.useCallback(() => {
        var J;
        if (!i) return;
        r.current || (r.current = On((i.masterSeed ^ 2654435769) >>> 0));
        const I = ux(i, r.current);
        if (!I.ok) {
          E(
            I.reason === 'noSkill'
              ? '対応する採集スキルを持つ仲間がいない'
              : I.reason === 'foodFull'
                ? '食料がいっぱいで採れない'
                : '採集できない'
          );
          return;
        }
        (s(() => I.save),
          E(
            `${I.itemId ? (((J = et[I.itemId]) == null ? void 0 : J.name) ?? '素材') : '素材'} を手に入れた`
          ));
      }, [i, s]),
      P = N.useCallback(
        (I) => {
          var he;
          if (!i) return;
          const J = ax(i, I);
          J.ok &&
            (s(() => J.save), E(`${((he = ja[I]) == null ? void 0 : he.name) ?? '料理'} を作った`));
        },
        [i, s]
      ),
      ee = N.useCallback(
        (I) => {
          if (!i) return;
          (E(null), r.current || (r.current = On((i.masterSeed ^ 2654435769) >>> 0)));
          const J = Q1(i, I, r.current);
          (s(() => J.save), J.triggered && a('/battle'));
        },
        [i, s, a]
      ),
      Q = N.useCallback(
        (I) => {
          o((J) => py(J, I));
        },
        [o]
      ),
      Y = N.useCallback(async () => {
        if (!i) return;
        const I = pp(i);
        I === 'stairsUp'
          ? await s((J) => K1(J))
          : I === 'stairsDown' &&
            (i.diveState.depth <= 1 ? (await s((J) => Ri(J)), a('/town')) : await s((J) => I1(J)));
      }, [i, s, a]),
      U = N.useCallback(async () => {
        (await s((I) => Ri(I)), a('/town'));
      }, [s, a]),
      Z = N.useCallback(
        (I, J) => {
          if (!i) return;
          const he = sx(i, I, J);
          he.ok && (s(() => he.save), he.save.diveState || (g(!1), a('/town')));
        },
        [i, s, a]
      ),
      ae = N.useCallback(
        (I, J) => {
          if (!R) return;
          const he = R.depth;
          if (d !== null) {
            if (!((i == null ? void 0 : i.exploredCells[he]) ?? []).includes(`${I},${J}`)) return;
            s(d === 'erase' ? (Ee) => fx(Ee, he, I, J) : (Ee) => rx(Ee, he, I, J, d));
            return;
          }
          const L = I - R.pos.x,
            K = J - R.pos.y,
            te = ['N', 'E', 'S', 'W'].find((ge) => Jt[ge].dx === L && Jt[ge].dy === K);
          te && ee(te);
        },
        [R, ee, d, i, s]
      );
    if (!i) return m.jsx(nl, { to: '/title', replace: !0 });
    if (!R || !S) return m.jsx(nl, { to: '/town', replace: !0 });
    const ue = pp(i);
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
                m.jsx('span', { className: me.theme, children: Tp(R.depth).name }),
              ],
            }),
            m.jsx(I2, { level: C1(R.encounter.stepsUntilEncounter) }),
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
          children: m.jsx(tx, { floor: S, pos: R.pos, dir: R.dir, foes: w, theme: Tp(R.depth) }),
        }),
        m.jsx('div', {
          className: me.mapWrap,
          children: m.jsx(Y2, {
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
            Ty.map((I) =>
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
            onClick: () => void Y(),
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
            disabled: gr(i, j) || !Np(i, j),
            onClick: V,
            children: gr(i, j)
              ? `🌿 ${Rn[j.type].name}（採集済み）`
              : Np(i, j)
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
                  onClick: () => Q(fy(R.dir)),
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
                  onClick: () => Q(ry(R.dir)),
                  'aria-label': '右を向く',
                  children: '↱',
                }),
              ],
            }),
            m.jsx('button', {
              type: 'button',
              className: me.back,
              onClick: () => Q(j1(R.dir)),
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
                    const I = nx(i);
                    return I.length === 0
                      ? m.jsx('p', {
                          className: me.itemEmpty,
                          children: '作れるレシピがありません。',
                        })
                      : I.map((J) => {
                          var K;
                          const he = Ny(i, J.id),
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
  mx = '_layout_34t9v_1',
  hx = '_head_34t9v_11',
  px = '_title_34t9v_18',
  yx = '_stock_34t9v_24',
  gx = '_tabs_34t9v_29',
  _x = '_tab_34t9v_29',
  vx = '_tabActive_34t9v_46',
  bx = '_hint_34t9v_51',
  Sx = '_list_34t9v_57',
  xx = '_row_34t9v_65',
  Ex = '_info_34t9v_76',
  Tx = '_name_34t9v_82',
  Nx = '_note_34t9v_87',
  kx = '_actions_34t9v_92',
  Ax = '_ingot_34t9v_97',
  Cx = '_recycle_34t9v_114',
  jx = '_maxed_34t9v_126',
  Mx = '_empty_34t9v_132',
  Rx = '_foot_34t9v_137',
  wx = '_back_34t9v_141',
  We = {
    layout: mx,
    head: hx,
    title: px,
    stock: yx,
    tabs: gx,
    tab: _x,
    tabActive: vx,
    hint: bx,
    list: Sx,
    row: xx,
    info: Ex,
    name: Tx,
    note: Nx,
    actions: kx,
    ingot: Ax,
    recycle: Cx,
    maxed: jx,
    empty: Mx,
    foot: Rx,
    back: wx,
  },
  Ox = () => {
    const a = il(),
      { save: i, applyAndPersist: o } = zl(),
      [s, r] = N.useState('forge');
    if (!i) return m.jsx(nl, { to: '/title', replace: !0 });
    const { copper: d, silver: h, gold: v } = i.forgeInventory.ingots,
      g = i.forgeInventory.fragments.common ?? 0,
      y = i.guild.equipment,
      _ = (b, E, R, S) =>
        m.jsxs('button', {
          type: 'button',
          className: We.ingot,
          disabled: S <= 0,
          onClick: () => void o((w) => s1(w, b, E).save),
          children: [R, '+', fl.INGOT_INC[E], '（', S, '）'],
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
                  const E = ht[b.masterId],
                    R = b.forgeLevel >= fl.MAX_LEVEL;
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
                              children: E == null ? void 0 : E.slot,
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
                              onClick: () => void o((S) => c1(S, b.id).save),
                              children: ['分解（断片+', fl.RECYCLE_FRAGMENTS, '）'],
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
  Dx = '_layout_16au8_2',
  zx = '_head_16au8_13',
  Bx = '_title_16au8_20',
  Lx = '_count_16au8_26',
  Ux = '_create_16au8_31',
  qx = '_sectionTitle_16au8_42',
  Hx = '_field_16au8_48',
  Gx = '_primary_16au8_64',
  Yx = '_list_16au8_79',
  $x = '_empty_16au8_83',
  Xx = '_members_16au8_88',
  Vx = '_member_16au8_88',
  Qx = '_memberMain_16au8_107',
  Zx = '_memberName_16au8_119',
  Kx = '_pos_16au8_127',
  Ix = '_memberSub_16au8_144',
  Jx = '_posBtns_16au8_149',
  Wx = '_posBtn_16au8_149',
  Fx = '_posBtnActive_16au8_164',
  Px = '_foot_16au8_170',
  eE = '_sub_16au8_174',
  De = {
    layout: Dx,
    head: zx,
    title: Bx,
    count: Lx,
    create: Ux,
    sectionTitle: qx,
    field: Hx,
    primary: Gx,
    list: Yx,
    empty: $x,
    members: Xx,
    member: Vx,
    memberMain: Qx,
    memberName: Zx,
    pos: Kx,
    pos_前衛: '_pos_前衛_16au8_136',
    pos_後衛: '_pos_後衛_16au8_140',
    memberSub: Ix,
    posBtns: Jx,
    posBtn: Wx,
    posBtnActive: Fx,
    foot: Px,
    sub: eE,
  };
function tE(a) {
  return [...a.guild.party.front, ...a.guild.party.back].filter((i) => i !== null).length;
}
const jy = (a) => (a === 'front' ? gs : _s);
function lE(a, i, o, s) {
  if (o < 0 || o >= jy(i) || (s !== null && !a.guild.members.some((h) => h.id === s))) return a;
  const r = a.guild.party.front.map((h) => (h === s ? null : h)),
    d = a.guild.party.back.map((h) => (h === s ? null : h));
  for (; r.length < gs; ) r.push(null);
  for (; d.length < _s; ) d.push(null);
  return (
    i === 'front' ? (r[o] = s) : (d[o] = s),
    { ...a, guild: { ...a.guild, party: { front: r, back: d } } }
  );
}
function My(a, i) {
  const o = a.guild.party.front.map((r) => (r === i ? null : r)),
    s = a.guild.party.back.map((r) => (r === i ? null : r));
  return { ...a, guild: { ...a.guild, party: { front: o, back: s } } };
}
function kp(a, i, o) {
  if (
    !a.guild.members.some((v) => v.id === i) ||
    (o === 'front' ? a.guild.party.front : a.guild.party.back).includes(i)
  )
    return a;
  const r = My(a, i),
    d = o === 'front' ? r.guild.party.front : r.guild.party.back;
  let h = d.indexOf(null);
  if (h < 0)
    if (d.length < jy(o)) h = d.length;
    else return a;
  return lE(r, o, h, i);
}
function nE(a, i) {
  return a.guild.party.front.includes(i)
    ? '前衛'
    : a.guild.party.back.includes(i)
      ? '後衛'
      : '控え';
}
const aE = () => {
    const a = il(),
      { save: i, applyAndPersist: o } = zl(),
      s = Object.keys(Wt),
      r = Object.keys(gt),
      [d, h] = N.useState(''),
      [v, g] = N.useState(s[0]),
      [y, _] = N.useState(r[0]),
      [b, E] = N.useState(!1),
      R = N.useCallback(async () => {
        const j = d.trim() || '名もなき冒険者',
          A = gy({ raceId: v, classId: y, name: j });
        (E(!0), await o((k) => uS(k, A)), h(''), E(!1));
      }, [d, v, y, o]);
    if (!i) return m.jsx(nl, { to: '/title', replace: !0 });
    const { members: S } = i.guild,
      w = S.length >= cr;
    return m.jsxs('div', {
      className: De.layout,
      children: [
        m.jsxs('header', {
          className: De.head,
          children: [
            m.jsx('h1', { className: De.title, children: 'ギルド管理' }),
            m.jsxs('span', { className: De.count, children: ['団員 ', S.length, ' / ', cr] }),
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
                  children: s.map((j) => m.jsx('option', { value: j, children: Wt[j].name }, j)),
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
                  children: ['（出撃 ', tE(i), ' / ', Fb, '）'],
                }),
              ],
            }),
            S.length === 0
              ? m.jsx('p', { className: De.empty, children: 'まだ冒険者がいません。' })
              : m.jsx('ul', {
                  className: De.members,
                  children: S.map((j) => {
                    var k, V;
                    const A = nE(i, j.id);
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
                                  (k = Wt[j.raceId]) == null ? void 0 : k.name,
                                  ' / ',
                                  (V = gt[j.classId]) == null ? void 0 : V.name,
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
                                onClick: () => void o((P) => kp(P, j.id, 'front')),
                                children: '前',
                              }),
                              m.jsx('button', {
                                type: 'button',
                                className: `${De.posBtn} ${A === '後衛' ? De.posBtnActive : ''}`,
                                onClick: () => void o((P) => kp(P, j.id, 'back')),
                                children: '後',
                              }),
                              m.jsx('button', {
                                type: 'button',
                                className: `${De.posBtn} ${A === '控え' ? De.posBtnActive : ''}`,
                                onClick: () => void o((P) => My(P, j.id)),
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
  iE = '_layout_tw23z_1',
  uE = '_head_tw23z_12',
  sE = '_title_tw23z_16',
  cE = '_sub_tw23z_22',
  oE = '_card_tw23z_27',
  rE = '_h2_tw23z_35',
  fE = '_sp_tw23z_44',
  dE = '_stats_tw23z_50',
  mE = '_equipSlot_tw23z_74',
  hE = '_equipHead_tw23z_82',
  pE = '_slotLabel_tw23z_88',
  yE = '_equipName_tw23z_95',
  gE = '_smallBtn_tw23z_100',
  _E = '_equipPick_tw23z_110',
  vE = '_pickBtn_tw23z_118',
  bE = '_skills_tw23z_128',
  SE = '_skill_tw23z_128',
  xE = '_skillInfo_tw23z_143',
  EE = '_skillName_tw23z_150',
  TE = '_skillLv_tw23z_158',
  NE = '_skillDesc_tw23z_164',
  kE = '_learnBtn_tw23z_169',
  AE = '_jobRow_tw23z_185',
  CE = '_select_tw23z_192',
  jE = '_input_tw23z_193',
  ME = '_actBtn_tw23z_203',
  RE = '_warn_tw23z_220',
  wE = '_titleHave_tw23z_227',
  OE = '_titleOpts_tw23z_233',
  DE = '_titleBtn_tw23z_240',
  zE = '_rbForm_tw23z_252',
  BE = '_danger_tw23z_258',
  LE = '_foot_tw23z_270',
  UE = '_back_tw23z_274',
  fe = {
    layout: iE,
    head: uE,
    title: sE,
    sub: cE,
    card: oE,
    h2: rE,
    sp: fE,
    stats: dE,
    equipSlot: mE,
    equipHead: hE,
    slotLabel: pE,
    equipName: yE,
    smallBtn: gE,
    equipPick: _E,
    pickBtn: vE,
    skills: bE,
    skill: SE,
    skillInfo: xE,
    skillName: EE,
    skillLv: TE,
    skillDesc: NE,
    learnBtn: kE,
    jobRow: AE,
    select: CE,
    input: jE,
    actBtn: ME,
    warn: RE,
    titleHave: wE,
    titleOpts: OE,
    titleBtn: DE,
    rbForm: zE,
    danger: BE,
    foot: LE,
    back: UE,
  },
  Ry = ['weapon', 'armor', 'accessory'];
function wy(a, i, o) {
  return { ...a, guild: { ...a.guild, members: a.guild.members.map((s) => (s.id === i ? o : s)) } };
}
function qE(a) {
  var i, o;
  return (o = (i = gt[a]) == null ? void 0 : i.skillTree.skills[0]) == null ? void 0 : o.skillId;
}
function HE(a) {
  var i;
  return new Set(
    (((i = Wt[a]) == null ? void 0 : i.raceSkillTree.skills) ?? []).map((o) => o.skillId)
  );
}
const GE = (a) => Object.values(a).reduce((i, o) => i + o, 0);
function YE(a, i) {
  if (!gt[i]) return a;
  const o = HE(a.raceId);
  let s = {};
  for (const [g, y] of Object.entries(a.learnedSkills)) o.has(g) && (s[g] = y);
  const r = qE(i);
  r && !s[r] && (s[r] = 1);
  const d = Math.max(1, a.level - Kp),
    h = Le.SP_PER_LEVEL * Math.max(0, d - 1);
  let v = GE(s) - (r && s[r] ? 1 : 0);
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
function $E(a, i, o) {
  const s = a.guild.members.find((h) => h.id === i);
  if (!s) return a;
  let r = wy(a, i, YE(s, o));
  const d = r.guild.members.find((h) => h.id === i);
  for (const h of Ry) {
    const v = d.equipment[h];
    v && !Or(d, v.masterId) && (r = Dr(r, i, h));
  }
  return r;
}
const XE = [
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
function VE(a) {
  const i = XE.find((o) => a >= o.min && a <= o.max);
  return i ? { allStats: i.allStats, bonusSp: i.bonusSp } : null;
}
function Oy(a) {
  return a.level >= Ai.REBIRTH_MIN_LEVEL;
}
function QE(a, i) {
  const o = VE(a.level);
  if (!o) return a;
  const s = Math.min(30, Math.floor(a.level / 2)),
    r = gy({ ...i, id: a.id }),
    d = Le.SP_PER_LEVEL * Math.max(0, s - 1) + o.bonusSp;
  return {
    ...r,
    level: Math.max(1, s),
    exp: 0,
    rebirthBonus: o,
    skillPoints: { total: d, spent: r.skillPoints.spent },
  };
}
function ZE(a, i, o) {
  const s = a.guild.members.find((h) => h.id === i);
  if (!s || !Oy(s)) return a;
  let r = a;
  for (const h of Ry) s.equipment[h] && (r = Dr(r, i, h));
  const d = r.guild.members.find((h) => h.id === i);
  return wy(r, i, QE(d, o));
}
function Dy(a, i, o) {
  var r;
  return o < Ai.TITLE_DEPTH || a.titleId
    ? !1
    : (((r = gt[a.classId]) == null ? void 0 : r.titleOptions) ?? []).includes(i);
}
function KE(a, i, o) {
  return Dy(a, i, o)
    ? { ...a, titleId: i, skillPoints: { ...a.skillPoints, total: a.skillPoints.total + Pb } }
    : a;
}
function zy(a) {
  var o, s;
  const i = [
    ...(((o = gt[a.classId]) == null ? void 0 : o.skillTree.skills) ?? []),
    ...(((s = Wt[a.raceId]) == null ? void 0 : s.raceSkillTree.skills) ?? []),
  ];
  return (a.titleId && Ea[a.titleId] && i.push(...Ea[a.titleId].skillTree.skills), i);
}
function Ss(a, i) {
  return a.learnedSkills[i] ?? 0;
}
function By(a) {
  return a.skillPoints.total - a.skillPoints.spent;
}
function IE(a, i) {
  return (i.requires ?? []).every((o) => Ss(a, o.skillId) >= o.level);
}
function Ly(a, i) {
  const o = zy(a).find((s) => s.skillId === i);
  return !o || Ss(a, i) >= o.maxLevel || By(a) <= 0 ? !1 : IE(a, o);
}
function JE(a, i) {
  return Ly(a, i)
    ? {
        ...a,
        learnedSkills: { ...a.learnedSkills, [i]: Ss(a, i) + 1 },
        skillPoints: { ...a.skillPoints, spent: a.skillPoints.spent + 1 },
      }
    : a;
}
const Ap = Object.keys(Wt),
  ls = Object.keys(gt),
  WE = ['weapon', 'armor', 'accessory'],
  FE = { weapon: '武器', armor: '防具', accessory: '装飾' },
  PE = [
    { key: 'hp', label: 'HP' },
    { key: 'tp', label: 'TP' },
    { key: 'str', label: 'STR' },
    { key: 'vit', label: 'VIT' },
    { key: 'agi', label: 'AGI' },
    { key: 'int', label: 'INT' },
    { key: 'mnd', label: 'MND' },
    { key: 'luc', label: 'LUC' },
  ],
  e3 = () => {
    var P, ee, Q, Y;
    const a = il(),
      { id: i } = av(),
      { save: o, applyAndPersist: s } = zl(),
      [r, d] = N.useState(ls[0]),
      [h, v] = N.useState(''),
      [g, y] = N.useState(Ap[0]),
      [_, b] = N.useState(ls[0]),
      [E, R] = N.useState(!1);
    if (!o) return m.jsx(nl, { to: '/title', replace: !0 });
    const S = o.guild.members.find((U) => U.id === i);
    if (!S || !i) return m.jsx(nl, { to: '/guild', replace: !0 });
    const w = zi(S),
      j = By(S),
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
                (P = Wt[S.raceId]) == null ? void 0 : P.name,
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
              children: PE.map((U) =>
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
            WE.map((U) => {
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
                        m.jsx('span', { className: fe.slotLabel, children: FE[U] }),
                        m.jsx('span', {
                          className: fe.equipName,
                          children: Z ? rs(Z) : '（なし）',
                        }),
                        Z
                          ? m.jsx('button', {
                              type: 'button',
                              className: fe.smallBtn,
                              onClick: () => void V(U),
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
                                onClick: () => void s((ce) => f1(ce, i, ue.id)),
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
              children: zy(S).map((U) => {
                const Z = Ss(S, U.skillId),
                  ae = Ly(S, U.skillId),
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
                        onClick: () => void k((ce) => JE(ce, U.skillId)),
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
                  onClick: () => void s((U) => $E(U, i, r)),
                  children: '転職する',
                }),
              ],
            }),
            m.jsxs('p', {
              className: fe.warn,
              children: [
                '※ レベルが ',
                Kp,
                ' ',
                '下がり、職業/称号スキルは振り直しになります（種族スキルは保持）。',
              ],
            }),
            m.jsx('h2', { className: fe.h2, children: '称号' }),
            S.titleId
              ? m.jsxs('p', {
                  className: fe.titleHave,
                  children: ['習得済み: ', (Q = Ea[S.titleId]) == null ? void 0 : Q.name],
                })
              : A < Ai.TITLE_DEPTH
                ? m.jsxs('p', {
                    className: fe.warn,
                    children: ['第 ', Ai.TITLE_DEPTH, ' 階到達で習得できます（現在 ', A, 'F）。'],
                  })
                : m.jsx('div', {
                    className: fe.titleOpts,
                    children: (((Y = gt[S.classId]) == null ? void 0 : Y.titleOptions) ?? []).map(
                      (U) => {
                        var Z;
                        return m.jsxs(
                          'button',
                          {
                            type: 'button',
                            className: fe.titleBtn,
                            disabled: !Dy(S, U, A),
                            onClick: () => void k((ae) => KE(ae, U, A)),
                            children: [(Z = Ea[U]) == null ? void 0 : Z.name, '（SP+5）'],
                          },
                          U
                        );
                      }
                    ),
                  }),
            m.jsx('h2', { className: fe.h2, children: '転生' }),
            Oy(S)
              ? E
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
                            children: Ap.map((U) =>
                              m.jsx('option', { value: U, children: Wt[U].name }, U)
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
                                ZE(U, i, { raceId: g, classId: _, name: h.trim() || S.name })
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
    function V(U) {
      return s((Z) => Dr(Z, i, U));
    }
  },
  t3 = () => m.jsx('div', { children: m.jsx('h1', { children: 'Not Found' }) }),
  l3 = '_layout_1u0ua_1',
  n3 = '_head_1u0ua_11',
  a3 = '_title_1u0ua_18',
  i3 = '_gold_1u0ua_24',
  u3 = '_tabs_1u0ua_29',
  s3 = '_tab_1u0ua_29',
  c3 = '_tabActive_1u0ua_46',
  o3 = '_list_1u0ua_51',
  r3 = '_row_1u0ua_59',
  f3 = '_info_1u0ua_70',
  d3 = '_name_1u0ua_76',
  m3 = '_note_1u0ua_81',
  h3 = '_action_1u0ua_86',
  p3 = '_empty_1u0ua_103',
  y3 = '_foot_1u0ua_108',
  g3 = '_back_1u0ua_112',
  Ge = {
    layout: l3,
    head: n3,
    title: a3,
    gold: i3,
    tabs: u3,
    tab: s3,
    tabActive: c3,
    list: o3,
    row: r3,
    info: f3,
    name: d3,
    note: m3,
    action: h3,
    empty: p3,
    foot: y3,
    back: g3,
  };
function _3(a) {
  return Math.max(0, Math.floor(a.towerState.record.deepestReached / 10));
}
const Uy = {
    item_slime_jelly: ['equip_slime_shield'],
    item_rat_tail: ['equip_rat_dagger'],
    item_bat_wing: ['equip_bat_cloak'],
    item_golem_core: ['equip_golem_blade'],
  },
  v3 = (a) => {
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
function b3(a) {
  const i = _3(a),
    o = new Set(a.shopStock.unlockedItemIds),
    s = Object.values(et)
      .filter((d) => d.buyPrice > 0)
      .map((d) => ({ id: d.id, name: d.name, price: d.buyPrice, kind: 'item' }));
  return [
    ...Object.values(ht)
      .filter((d) => d.tier <= i || o.has(d.id))
      .map((d) => ({ id: d.id, name: d.name, price: d.buyPrice, kind: 'equip', note: v3(d.id) })),
    ...s,
  ];
}
function S3(a) {
  return Uy[a] ?? [];
}
function x3(a) {
  var i, o;
  return (
    ((i = et[a]) == null ? void 0 : i.buyPrice) ??
    ((o = ht[a]) == null ? void 0 : o.buyPrice) ??
    null
  );
}
function _r(a) {
  return et[a] ? Ib(et[a]) : ht[a] ? Math.floor(ht[a].buyPrice / 2) : 0;
}
function E3(a, i) {
  const o = x3(i);
  if (o === null || o <= 0 || a.guild.gold < o) return a;
  const s = ht[i] ? r1(a, i) : Mr(a, i, 1);
  return { ...s, guild: { ...s.guild, gold: s.guild.gold - o } };
}
function qy(a) {
  var o;
  return (
    Math.floor((((o = ht[a.masterId]) == null ? void 0 : o.buyPrice) ?? 0) / 2) + a.forgeLevel * 10
  );
}
function T3(a, i) {
  const o = a.guild.equipment.find((d) => d.id === i);
  if (!o) return a;
  const s = qy(o),
    r = a.guild.equipment.filter((d) => d.id !== i);
  return { ...a, guild: { ...a.guild, equipment: r, gold: a.guild.gold + s } };
}
function N3(a, i, o = 1) {
  var g;
  if ((((g = a.guild.storage.find((y) => y.itemId === i)) == null ? void 0 : g.qty) ?? 0) < o)
    return a;
  const r = _r(i) * o,
    d = Rr(a, i, o),
    h = S3(i).filter((y) => !d.shopStock.unlockedItemIds.includes(y)),
    v = [...d.shopStock.unlockedItemIds, ...h];
  return {
    ...d,
    guild: { ...d.guild, gold: d.guild.gold + r },
    shopStock: { ...d.shopStock, unlockedItemIds: v },
  };
}
const k3 = () => {
    const a = il(),
      { save: i, applyAndPersist: o } = zl(),
      [s, r] = N.useState('buy');
    if (!i) return m.jsx(nl, { to: '/title', replace: !0 });
    const d = i.guild.gold,
      h = b3(i),
      v = i.guild.storage.filter((b) => _r(b.itemId) > 0),
      g = i.guild.equipment,
      y = v.length === 0 && g.length === 0,
      _ = (b) => {
        var E, R;
        return (
          ((E = et[b]) == null ? void 0 : E.name) ?? ((R = ht[b]) == null ? void 0 : R.name) ?? b
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
                          onClick: () => void o((E) => E3(E, b.id)),
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
                                onClick: () => void o((E) => T3(E, b.id)),
                                children: ['売却 ', qy(b), ' G'],
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
                                onClick: () => void o((E) => N3(E, b.itemId, 1)),
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
  A3 = '_layout_1xkiw_1',
  C3 = '_head_1xkiw_12',
  j3 = '_title_1xkiw_17',
  M3 = '_subtitle_1xkiw_24',
  R3 = '_body_1xkiw_30',
  w3 = '_menu_1xkiw_34',
  O3 = '_loading_1xkiw_40',
  D3 = '_warn_1xkiw_45',
  z3 = '_danger_1xkiw_52',
  B3 = '_dialog_1xkiw_67',
  L3 = '_dialogTitle_1xkiw_77',
  U3 = '_field_1xkiw_82',
  q3 = '_note_1xkiw_96',
  H3 = '_dialogActions_1xkiw_102',
  G3 = '_primary_1xkiw_107',
  Y3 = '_sub_1xkiw_24',
  $3 = '_foot_1xkiw_132',
  Ke = {
    layout: A3,
    head: C3,
    title: j3,
    subtitle: M3,
    body: R3,
    menu: w3,
    loading: O3,
    warn: D3,
    danger: z3,
    dialog: B3,
    dialogTitle: L3,
    field: U3,
    note: q3,
    dialogActions: H3,
    primary: G3,
    sub: Y3,
    foot: $3,
  },
  X3 = '_card_3vsn6_1',
  V3 = '_corrupted_3vsn6_14',
  Q3 = '_corruptedText_3vsn6_19',
  Z3 = '_corruptedNote_3vsn6_25',
  K3 = '_guildName_3vsn6_31',
  I3 = '_meta_3vsn6_36',
  on = {
    card: X3,
    corrupted: V3,
    corruptedText: Q3,
    corruptedNote: Z3,
    guildName: K3,
    meta: I3,
    continue: '_continue_3vsn6_56',
  },
  J3 = (a) => {
    if (!a) return '-';
    const i = new Date(a),
      o = (s) => String(s).padStart(2, '0');
    return `${i.getFullYear()}/${o(i.getMonth() + 1)}/${o(i.getDate())} ${o(i.getHours())}:${o(i.getMinutes())}`;
  },
  W3 = ({ meta: a, onContinue: i }) =>
    a.corrupted
      ? m.jsxs('div', {
          className: `${on.card} ${on.corrupted}`,
          children: [
            m.jsx('div', { className: on.corruptedText, children: 'セーブデータが破損しています' }),
            m.jsx('p', {
              className: on.corruptedNote,
              children: '「最初から」で新しく始められます。',
            }),
          ],
        })
      : m.jsxs('div', {
          className: on.card,
          children: [
            m.jsx('div', { className: on.guildName, children: a.guildName }),
            m.jsxs('dl', {
              className: on.meta,
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
                    m.jsx('dd', { children: J3(a.savedAt) }),
                  ],
                }),
              ],
            }),
            m.jsx('button', {
              type: 'button',
              className: on.continue,
              onClick: i,
              children: 'つづきから',
            }),
          ],
        }),
  F3 = () => {
    const a = il(),
      { startNewGame: i, continueGame: o } = zl(),
      [s, r] = N.useState(null),
      [d, h] = N.useState(!0),
      [v, g] = N.useState('menu'),
      [y, _] = N.useState(''),
      [b, E] = N.useState(!1);
    N.useEffect(() => {
      (async () => (r(await CS()), h(!1)))();
    }, []);
    const R = s !== null && !s.corrupted,
      S = N.useCallback(async () => {
        E(!0);
        const A = await o();
        (E(!1), A.ok && a('/town'));
      }, [o, a]),
      w = N.useCallback(() => {
        (_(''), g(R ? 'confirm' : 'guildName'));
      }, [R]),
      j = N.useCallback(async () => {
        const A = y.trim() || 'ななしのギルド';
        (E(!0), await i(A), E(!1), a('/town'));
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
                      s !== null && m.jsx(W3, { meta: s, onContinue: () => void S() }),
                      m.jsx('button', {
                        type: 'button',
                        className: R ? Ke.sub : Ke.primary,
                        onClick: w,
                        children: '最初から',
                      }),
                    ],
                  }),
        }),
        m.jsxs('footer', { className: Ke.foot, children: ['v', '0.1.21'] }),
      ],
    });
  },
  P3 = '_layout_1wdo2_1',
  eT = '_head_1wdo2_12',
  tT = '_guildName_1wdo2_16',
  lT = '_stats_1wdo2_21',
  nT = '_hint_1wdo2_40',
  aT = '_menu_1wdo2_50',
  iT = '_foot_1wdo2_57',
  uT = '_exit_1wdo2_61',
  rn = { layout: P3, head: eT, guildName: tT, stats: lT, hint: nT, menu: aT, foot: iT, exit: uT },
  sT = '_button_1tp4a_1',
  cT = '_primary_1tp4a_26',
  oT = '_label_1tp4a_32',
  rT = '_description_1tp4a_37',
  ns = { button: sT, primary: cT, label: oT, description: rT },
  ki = ({ label: a, description: i, variant: o = 'default', disabled: s = !1, onClick: r }) =>
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
  fT = () => {
    const a = il(),
      { save: i, exitToTitle: o, applyAndPersist: s } = zl();
    if (!i) return m.jsx(nl, { to: '/title', replace: !0 });
    const { guild: r, towerState: d, diveState: h } = i,
      v = r.members.length > 0,
      g = () => {
        (o(), a('/title'));
      },
      y = async () => {
        (h || (await s((_) => V1(_, 1))), a('/dungeon'));
      };
    return m.jsxs('div', {
      className: rn.layout,
      children: [
        m.jsxs('header', {
          className: rn.head,
          children: [
            m.jsx('div', { className: rn.guildName, children: r.name }),
            m.jsxs('dl', {
              className: rn.stats,
              children: [
                m.jsxs('div', {
                  children: [
                    m.jsx('dt', { children: '所持金' }),
                    m.jsxs('dd', { children: [r.gold, ' G'] }),
                  ],
                }),
                m.jsxs('div', {
                  children: [
                    m.jsx('dt', { children: '最高到達' }),
                    m.jsx('dd', {
                      children: d.record.deepestReached > 0 ? `${d.record.deepestReached}F` : '-',
                    }),
                  ],
                }),
                m.jsxs('div', {
                  children: [
                    m.jsx('dt', { children: '団員' }),
                    m.jsxs('dd', { children: [r.members.length, '人'] }),
                  ],
                }),
              ],
            }),
          ],
        }),
        !v &&
          m.jsx('p', {
            className: rn.hint,
            children:
              'まずは「ギルド管理」で冒険者を作成してください。団員がいないとダイブできません。',
          }),
        m.jsxs('main', {
          className: rn.menu,
          children: [
            m.jsx(ki, {
              label: h ? '潜行を再開' : 'ダイブ開始',
              description: v
                ? h
                  ? `${h.depth}F から再開`
                  : '第1階からタワーへ潜る'
                : '団員が必要です',
              variant: 'primary',
              disabled: !v,
              onClick: () => void y(),
            }),
            m.jsx(ki, {
              label: 'ギルド管理',
              description: '編成・キャラ作成',
              onClick: () => a('/guild'),
            }),
            m.jsx(ki, {
              label: 'ショップ',
              description: '装備・アイテム売買',
              onClick: () => a('/shop'),
            }),
            m.jsx(ki, {
              label: '鍛冶屋',
              description: '装備の強化・リサイクル',
              onClick: () => a('/forge'),
            }),
            m.jsx(ki, {
              label: '図鑑 / 記録',
              description: '到達記録・モンスター図鑑',
              onClick: () => a('/codex'),
            }),
          ],
        }),
        m.jsx('footer', {
          className: rn.foot,
          children: m.jsx('button', {
            type: 'button',
            className: rn.exit,
            onClick: g,
            children: 'タイトルへ戻る',
          }),
        }),
      ],
    });
  };
function dT() {
  return m.jsxs(vv, {
    children: [
      m.jsx(It, { path: '/', element: m.jsx(nl, { to: '/title', replace: !0 }) }),
      m.jsx(It, { path: '/title', element: m.jsx(F3, {}) }),
      m.jsx(It, { path: '/town', element: m.jsx(fT, {}) }),
      m.jsx(It, { path: '/guild', element: m.jsx(aE, {}) }),
      m.jsx(It, { path: '/guild/char/:id', element: m.jsx(e3, {}) }),
      m.jsx(It, { path: '/shop', element: m.jsx(k3, {}) }),
      m.jsx(It, { path: '/forge', element: m.jsx(Ox, {}) }),
      m.jsx(It, { path: '/codex', element: m.jsx(s2, {}) }),
      m.jsx(It, { path: '/dungeon', element: m.jsx(dx, {}) }),
      m.jsx(It, { path: '/battle', element: m.jsx(wS, {}) }),
      m.jsx(It, { path: '*', element: m.jsx(t3, {}) }),
    ],
  });
}
const mT = {
    races: Wt,
    classes: gt,
    titles: Ea,
    skills: Cr,
    unionSkills: Sa,
    summons: Ca,
    gatherTypes: Rn,
    recipes: ja,
    enemies: dn,
    items: et,
    equipment: ht,
  },
  hT = /^[a-z]+_[a-z0-9_]+$/;
function rl(a, i, o) {
  for (const s of i)
    hT.test(s) || o.push(`[${a}] ID 命名規約違反: "${s}"（期待: <domain>_<name>）`);
}
function ir(a, i, o, s) {
  const r = new Set(i.skills.map((d) => d.skillId));
  for (const d of i.skills) {
    o.has(d.skillId) || s.push(`[${a}] 未定義スキルを参照: "${d.skillId}"`);
    for (const h of d.requires ?? [])
      r.has(h.skillId) ||
        s.push(`[${a}] スキル "${d.skillId}" の前提 "${h.skillId}" が同ツリーに存在しない`);
  }
}
function pT() {
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
    } = mT;
  (rl('races', Object.keys(i), a),
    rl('classes', Object.keys(o), a),
    rl('titles', Object.keys(s), a),
    rl('skills', Object.keys(r), a),
    rl('enemies', Object.keys(y), a),
    rl('items', Object.keys(_), a),
    rl('equipment', Object.keys(b), a));
  const E = (A, k) => {
    for (const [V, P] of Object.entries(k))
      V !== P.id && a.push(`[${A}] キー "${V}" と id "${P.id}" が不一致`);
  };
  (E('races', i),
    E('classes', o),
    E('titles', s),
    E('skills', r),
    E('enemies', y),
    E('items', _),
    E('equipment', b));
  const R = new Set(Object.keys(r)),
    S = new Set(Object.keys(o)),
    w = new Set(Object.keys(s));
  for (const A of Object.values(i)) {
    (S.has(A.defaultClassId) ||
      a.push(`[races] "${A.id}" の defaultClassId "${A.defaultClassId}" が未定義`),
      ir(`races/${A.id}`, A.raceSkillTree, R, a));
    for (const k of A.raceSkillTree.skills) {
      const V = d[k.skillId];
      V &&
        V.raceId !== A.id &&
        a.push(`[races/${A.id}] ユニオンスキル "${k.skillId}" の raceId "${V.raceId}" が不一致`);
    }
  }
  for (const A of Object.values(d)) {
    const k = (j = i[A.raceId]) == null ? void 0 : j.raceSkillTree;
    (!k || !k.skills.some((V) => V.skillId === A.id)) &&
      a.push(`[unionSkills] "${A.id}" が種族 "${A.raceId}" のスキルツリーに無い`);
  }
  rl('unionSkills', Object.keys(d), a);
  for (const [A, k] of Object.entries(d))
    (A !== k.id && a.push(`[unionSkills] キー "${A}" と id "${k.id}" が不一致`),
      k.id in r || a.push(`[unionSkills] "${k.id}" が skills に未定義`),
      k.requiredParticipants < 1 &&
        a.push(`[unionSkills] "${k.id}" の requiredParticipants が 1 未満`),
      (k.gaugeCostPerParticipant < 0 || k.gaugeCostPerParticipant > 100) &&
        a.push(`[unionSkills] "${k.id}" の gaugeCostPerParticipant が 0..100 外`),
      k.id in fn &&
        a.push(
          `[unionSkills] "${k.id}" が BATTLE_SKILLS にも存在（通常スキルとして撃ててしまう）`
        ));
  rl('summons', Object.keys(h), a);
  for (const [A, k] of Object.entries(h))
    A !== k.id && a.push(`[summons] キー "${A}" と id "${k.id}" が不一致`);
  for (const A of Object.values(fn))
    for (const k of A.effects)
      k.kind === 'summon' &&
        !(k.summonKind in h) &&
        a.push(`[battleSkills] "${A.id}" の召喚 "${k.summonKind}" が未定義`);
  for (const [A, k] of Object.entries(v)) {
    (A !== k.type && a.push(`[gatherTypes] キー "${A}" と type "${k.type}" が不一致`),
      R.has(k.requiredSkillId) ||
        a.push(`[gatherTypes] "${k.type}" の requiredSkillId "${k.requiredSkillId}" が未定義`));
    for (const V of k.drops) {
      if (!(V.itemId in _))
        a.push(`[gatherTypes] "${k.type}" のドロップ "${V.itemId}" が未定義アイテム`);
      else {
        const P = _[V.itemId].category === 'food';
        (k.food &&
          !P &&
          a.push(`[gatherTypes] 食材系統 "${k.type}" のドロップ "${V.itemId}" が food でない`),
          !k.food &&
            P &&
            a.push(`[gatherTypes] 素材系統 "${k.type}" のドロップ "${V.itemId}" が food`));
      }
      V.weight <= 0 && a.push(`[gatherTypes] "${k.type}" のドロップ重みが正でない`);
    }
  }
  rl('recipes', Object.keys(g), a);
  for (const [A, k] of Object.entries(g)) {
    A !== k.id && a.push(`[recipes] キー "${A}" と id "${k.id}" が不一致`);
    for (const V of k.ingredients)
      V.itemId in _
        ? _[V.itemId].category !== 'food' &&
          a.push(`[recipes] "${k.id}" の材料 "${V.itemId}" が food カテゴリでない`)
        : a.push(`[recipes] "${k.id}" の材料 "${V.itemId}" が未定義`);
    k.result.itemId in _
      ? _[k.result.itemId].category !== 'food' &&
        a.push(`[recipes] "${k.id}" の結果 "${k.result.itemId}" が food カテゴリでない`)
      : a.push(`[recipes] "${k.id}" の結果 "${k.result.itemId}" が未定義`);
  }
  for (const A of Object.values(o)) {
    ir(`classes/${A.id}`, A.skillTree, R, a);
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
      ir(`titles/${A.id}`, A.skillTree, R, a));
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
  for (const [A, k] of Object.entries(Uy)) {
    A in _ || a.push(`[SELL_UNLOCKS] キー素材 "${A}" が未定義`);
    for (const V of k) V in b || a.push(`[SELL_UNLOCKS] 解放先装備 "${V}" が未定義`);
  }
  return { ok: a.length === 0, errors: a };
}
const Cp = pT();
Cp.ok || console.error('マスターデータ検証エラー:', Cp.errors);
const Hy = document.getElementById('root');
if (!Hy) throw new Error('Failed to find #root element');
S0.createRoot(Hy).render(
  m.jsx($v, { basename: '/sekaiju-like-game', children: m.jsx(RS, { children: m.jsx(dT, {}) }) })
);
