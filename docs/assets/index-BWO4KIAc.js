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
  ki = {};
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
  if (Xh) return ki;
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
  return ((ki.Fragment = i), (ki.jsx = o), (ki.jsxs = o), ki);
}
var Vh;
function p0() {
  return (Vh || ((Vh = 1), (Go.exports = h0())), Go.exports);
}
var m = p0(),
  Yo = { exports: {} },
  Ei = {},
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
 */ var Ih;
function y0() {
  return (
    Ih ||
      ((Ih = 1),
      (function (a) {
        function i(L, Z) {
          var te = L.length;
          L.push(Z);
          e: for (; 0 < te; ) {
            var ge = (te - 1) >>> 1,
              ke = L[ge];
            if (0 < r(ke, Z)) ((L[ge] = Z), (L[te] = ke), (te = ge));
            else break e;
          }
        }
        function o(L) {
          return L.length === 0 ? null : L[0];
        }
        function s(L) {
          if (L.length === 0) return null;
          var Z = L[0],
            te = L.pop();
          if (te !== Z) {
            L[0] = te;
            e: for (var ge = 0, ke = L.length, A = ke >>> 1; ge < A; ) {
              var G = 2 * (ge + 1) - 1,
                W = L[G],
                le = G + 1,
                pe = L[le];
              if (0 > r(W, te))
                le < ke && 0 > r(pe, W)
                  ? ((L[ge] = pe), (L[le] = te), (ge = le))
                  : ((L[ge] = W), (L[G] = te), (ge = G));
              else if (le < ke && 0 > r(pe, te)) ((L[ge] = pe), (L[le] = te), (ge = le));
              else break e;
            }
          }
          return Z;
        }
        function r(L, Z) {
          var te = L.sortIndex - Z.sortIndex;
          return te !== 0 ? te : L.id - Z.id;
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
          w = !1,
          S = !1,
          R = !1,
          j = !1,
          C = typeof setTimeout == 'function' ? setTimeout : null,
          N = typeof clearTimeout == 'function' ? clearTimeout : null,
          I = typeof setImmediate < 'u' ? setImmediate : null;
        function P(L) {
          for (var Z = o(y); Z !== null; ) {
            if (Z.callback === null) s(y);
            else if (Z.startTime <= L) (s(y), (Z.sortIndex = Z.expirationTime), i(g, Z));
            else break;
            Z = o(y);
          }
        }
        function ee(L) {
          if (((R = !1), P(L), !S))
            if (o(g) !== null) ((S = !0), V || ((V = !0), ce()));
            else {
              var Z = o(y);
              Z !== null && he(ee, Z.startTime - L);
            }
        }
        var V = !1,
          H = -1,
          q = 5,
          Q = -1;
        function ae() {
          return j ? !0 : !(a.unstable_now() - Q < q);
        }
        function ue() {
          if (((j = !1), V)) {
            var L = a.unstable_now();
            Q = L;
            var Z = !0;
            try {
              e: {
                ((S = !1), R && ((R = !1), N(H), (H = -1)), (w = !0));
                var te = x;
                try {
                  t: {
                    for (P(L), b = o(g); b !== null && !(b.expirationTime > L && ae()); ) {
                      var ge = b.callback;
                      if (typeof ge == 'function') {
                        ((b.callback = null), (x = b.priorityLevel));
                        var ke = ge(b.expirationTime <= L);
                        if (((L = a.unstable_now()), typeof ke == 'function')) {
                          ((b.callback = ke), P(L), (Z = !0));
                          break t;
                        }
                        (b === o(g) && s(g), P(L));
                      } else s(g);
                      b = o(g);
                    }
                    if (b !== null) Z = !0;
                    else {
                      var A = o(y);
                      (A !== null && he(ee, A.startTime - L), (Z = !1));
                    }
                  }
                  break e;
                } finally {
                  ((b = null), (x = te), (w = !1));
                }
                Z = void 0;
              }
            } finally {
              Z ? ce() : (V = !1);
            }
          }
        }
        var ce;
        if (typeof I == 'function')
          ce = function () {
            I(ue);
          };
        else if (typeof MessageChannel < 'u') {
          var K = new MessageChannel(),
            J = K.port2;
          ((K.port1.onmessage = ue),
            (ce = function () {
              J.postMessage(null);
            }));
        } else
          ce = function () {
            C(ue, 0);
          };
        function he(L, Z) {
          H = C(function () {
            L(a.unstable_now());
          }, Z);
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
              : (q = 0 < L ? Math.floor(1e3 / L) : 5);
          }),
          (a.unstable_getCurrentPriorityLevel = function () {
            return x;
          }),
          (a.unstable_next = function (L) {
            switch (x) {
              case 1:
              case 2:
              case 3:
                var Z = 3;
                break;
              default:
                Z = x;
            }
            var te = x;
            x = Z;
            try {
              return L();
            } finally {
              x = te;
            }
          }),
          (a.unstable_requestPaint = function () {
            j = !0;
          }),
          (a.unstable_runWithPriority = function (L, Z) {
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
              return Z();
            } finally {
              x = te;
            }
          }),
          (a.unstable_scheduleCallback = function (L, Z, te) {
            var ge = a.unstable_now();
            switch (
              (typeof te == 'object' && te !== null
                ? ((te = te.delay), (te = typeof te == 'number' && 0 < te ? ge + te : ge))
                : (te = ge),
              L)
            ) {
              case 1:
                var ke = -1;
                break;
              case 2:
                ke = 250;
                break;
              case 5:
                ke = 1073741823;
                break;
              case 4:
                ke = 1e4;
                break;
              default:
                ke = 5e3;
            }
            return (
              (ke = te + ke),
              (L = {
                id: _++,
                callback: Z,
                priorityLevel: L,
                startTime: te,
                expirationTime: ke,
                sortIndex: -1,
              }),
              te > ge
                ? ((L.sortIndex = te),
                  i(y, L),
                  o(g) === null && L === o(y) && (R ? (N(H), (H = -1)) : (R = !0), he(ee, te - ge)))
                : ((L.sortIndex = ke), i(g, L), S || w || ((S = !0), V || ((V = !0), ce()))),
              L
            );
          }),
          (a.unstable_shouldYield = ae),
          (a.unstable_wrapCallback = function (L) {
            var Z = x;
            return function () {
              var te = x;
              x = Z;
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
var Qh;
function g0() {
  return (Qh || ((Qh = 1), ($o.exports = y0())), $o.exports);
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
 */ var Zh;
function _0() {
  if (Zh) return ye;
  Zh = 1;
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
  function w(A) {
    return A === null || typeof A != 'object'
      ? null
      : ((A = (x && A[x]) || A['@@iterator']), typeof A == 'function' ? A : null);
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
    j = {};
  function C(A, G, W) {
    ((this.props = A), (this.context = G), (this.refs = j), (this.updater = W || S));
  }
  ((C.prototype.isReactComponent = {}),
    (C.prototype.setState = function (A, G) {
      if (typeof A != 'object' && typeof A != 'function' && A != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, A, G, 'setState');
    }),
    (C.prototype.forceUpdate = function (A) {
      this.updater.enqueueForceUpdate(this, A, 'forceUpdate');
    }));
  function N() {}
  N.prototype = C.prototype;
  function I(A, G, W) {
    ((this.props = A), (this.context = G), (this.refs = j), (this.updater = W || S));
  }
  var P = (I.prototype = new N());
  ((P.constructor = I), R(P, C.prototype), (P.isPureReactComponent = !0));
  var ee = Array.isArray;
  function V() {}
  var H = { H: null, A: null, T: null, S: null },
    q = Object.prototype.hasOwnProperty;
  function Q(A, G, W) {
    var le = W.ref;
    return { $$typeof: a, type: A, key: G, ref: le !== void 0 ? le : null, props: W };
  }
  function ae(A, G) {
    return Q(A.type, G, A.props);
  }
  function ue(A) {
    return typeof A == 'object' && A !== null && A.$$typeof === a;
  }
  function ce(A) {
    var G = { '=': '=0', ':': '=2' };
    return (
      '$' +
      A.replace(/[=:]/g, function (W) {
        return G[W];
      })
    );
  }
  var K = /\/+/g;
  function J(A, G) {
    return typeof A == 'object' && A !== null && A.key != null ? ce('' + A.key) : G.toString(36);
  }
  function he(A) {
    switch (A.status) {
      case 'fulfilled':
        return A.value;
      case 'rejected':
        throw A.reason;
      default:
        switch (
          (typeof A.status == 'string'
            ? A.then(V, V)
            : ((A.status = 'pending'),
              A.then(
                function (G) {
                  A.status === 'pending' && ((A.status = 'fulfilled'), (A.value = G));
                },
                function (G) {
                  A.status === 'pending' && ((A.status = 'rejected'), (A.reason = G));
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
  function L(A, G, W, le, pe) {
    var be = typeof A;
    (be === 'undefined' || be === 'boolean') && (A = null);
    var Ae = !1;
    if (A === null) Ae = !0;
    else
      switch (be) {
        case 'bigint':
        case 'string':
        case 'number':
          Ae = !0;
          break;
        case 'object':
          switch (A.$$typeof) {
            case a:
            case i:
              Ae = !0;
              break;
            case _:
              return ((Ae = A._init), L(Ae(A._payload), G, W, le, pe));
          }
      }
    if (Ae)
      return (
        (pe = pe(A)),
        (Ae = le === '' ? '.' + J(A, 0) : le),
        ee(pe)
          ? ((W = ''),
            Ae != null && (W = Ae.replace(K, '$&/') + '/'),
            L(pe, G, W, '', function (Y) {
              return Y;
            }))
          : pe != null &&
            (ue(pe) &&
              (pe = ae(
                pe,
                W +
                  (pe.key == null || (A && A.key === pe.key)
                    ? ''
                    : ('' + pe.key).replace(K, '$&/') + '/') +
                  Ae
              )),
            G.push(pe)),
        1
      );
    Ae = 0;
    var ut = le === '' ? '.' : le + ':';
    if (ee(A))
      for (var Ve = 0; Ve < A.length; Ve++)
        ((le = A[Ve]), (be = ut + J(le, Ve)), (Ae += L(le, G, W, be, pe)));
    else if (((Ve = w(A)), typeof Ve == 'function'))
      for (A = Ve.call(A), Ve = 0; !(le = A.next()).done; )
        ((le = le.value), (be = ut + J(le, Ve++)), (Ae += L(le, G, W, be, pe)));
    else if (be === 'object') {
      if (typeof A.then == 'function') return L(he(A), G, W, le, pe);
      throw (
        (G = String(A)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (G === '[object Object]' ? 'object with keys {' + Object.keys(A).join(', ') + '}' : G) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return Ae;
  }
  function Z(A, G, W) {
    if (A == null) return A;
    var le = [],
      pe = 0;
    return (
      L(A, le, '', '', function (be) {
        return G.call(W, be, pe++);
      }),
      le
    );
  }
  function te(A) {
    if (A._status === -1) {
      var G = A._result;
      ((G = G()),
        G.then(
          function (W) {
            (A._status === 0 || A._status === -1) && ((A._status = 1), (A._result = W));
          },
          function (W) {
            (A._status === 0 || A._status === -1) && ((A._status = 2), (A._result = W));
          }
        ),
        A._status === -1 && ((A._status = 0), (A._result = G)));
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var ge =
      typeof reportError == 'function'
        ? reportError
        : function (A) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var G = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof A == 'object' && A !== null && typeof A.message == 'string'
                    ? String(A.message)
                    : String(A),
                error: A,
              });
              if (!window.dispatchEvent(G)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', A);
              return;
            }
            console.error(A);
          },
    ke = {
      map: Z,
      forEach: function (A, G, W) {
        Z(
          A,
          function () {
            G.apply(this, arguments);
          },
          W
        );
      },
      count: function (A) {
        var G = 0;
        return (
          Z(A, function () {
            G++;
          }),
          G
        );
      },
      toArray: function (A) {
        return (
          Z(A, function (G) {
            return G;
          }) || []
        );
      },
      only: function (A) {
        if (!ue(A))
          throw Error('React.Children.only expected to receive a single React element child.');
        return A;
      },
    };
  return (
    (ye.Activity = b),
    (ye.Children = ke),
    (ye.Component = C),
    (ye.Fragment = o),
    (ye.Profiler = r),
    (ye.PureComponent = I),
    (ye.StrictMode = s),
    (ye.Suspense = g),
    (ye.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = H),
    (ye.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (A) {
        return H.H.useMemoCache(A);
      },
    }),
    (ye.cache = function (A) {
      return function () {
        return A.apply(null, arguments);
      };
    }),
    (ye.cacheSignal = function () {
      return null;
    }),
    (ye.cloneElement = function (A, G, W) {
      if (A == null) throw Error('The argument must be a React element, but you passed ' + A + '.');
      var le = R({}, A.props),
        pe = A.key;
      if (G != null)
        for (be in (G.key !== void 0 && (pe = '' + G.key), G))
          !q.call(G, be) ||
            be === 'key' ||
            be === '__self' ||
            be === '__source' ||
            (be === 'ref' && G.ref === void 0) ||
            (le[be] = G[be]);
      var be = arguments.length - 2;
      if (be === 1) le.children = W;
      else if (1 < be) {
        for (var Ae = Array(be), ut = 0; ut < be; ut++) Ae[ut] = arguments[ut + 2];
        le.children = Ae;
      }
      return Q(A.type, pe, le);
    }),
    (ye.createContext = function (A) {
      return (
        (A = {
          $$typeof: h,
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
    (ye.createElement = function (A, G, W) {
      var le,
        pe = {},
        be = null;
      if (G != null)
        for (le in (G.key !== void 0 && (be = '' + G.key), G))
          q.call(G, le) && le !== 'key' && le !== '__self' && le !== '__source' && (pe[le] = G[le]);
      var Ae = arguments.length - 2;
      if (Ae === 1) pe.children = W;
      else if (1 < Ae) {
        for (var ut = Array(Ae), Ve = 0; Ve < Ae; Ve++) ut[Ve] = arguments[Ve + 2];
        pe.children = ut;
      }
      if (A && A.defaultProps)
        for (le in ((Ae = A.defaultProps), Ae)) pe[le] === void 0 && (pe[le] = Ae[le]);
      return Q(A, be, pe);
    }),
    (ye.createRef = function () {
      return { current: null };
    }),
    (ye.forwardRef = function (A) {
      return { $$typeof: v, render: A };
    }),
    (ye.isValidElement = ue),
    (ye.lazy = function (A) {
      return { $$typeof: _, _payload: { _status: -1, _result: A }, _init: te };
    }),
    (ye.memo = function (A, G) {
      return { $$typeof: y, type: A, compare: G === void 0 ? null : G };
    }),
    (ye.startTransition = function (A) {
      var G = H.T,
        W = {};
      H.T = W;
      try {
        var le = A(),
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
    (ye.use = function (A) {
      return H.H.use(A);
    }),
    (ye.useActionState = function (A, G, W) {
      return H.H.useActionState(A, G, W);
    }),
    (ye.useCallback = function (A, G) {
      return H.H.useCallback(A, G);
    }),
    (ye.useContext = function (A) {
      return H.H.useContext(A);
    }),
    (ye.useDebugValue = function () {}),
    (ye.useDeferredValue = function (A, G) {
      return H.H.useDeferredValue(A, G);
    }),
    (ye.useEffect = function (A, G) {
      return H.H.useEffect(A, G);
    }),
    (ye.useEffectEvent = function (A) {
      return H.H.useEffectEvent(A);
    }),
    (ye.useId = function () {
      return H.H.useId();
    }),
    (ye.useImperativeHandle = function (A, G, W) {
      return H.H.useImperativeHandle(A, G, W);
    }),
    (ye.useInsertionEffect = function (A, G) {
      return H.H.useInsertionEffect(A, G);
    }),
    (ye.useLayoutEffect = function (A, G) {
      return H.H.useLayoutEffect(A, G);
    }),
    (ye.useMemo = function (A, G) {
      return H.H.useMemo(A, G);
    }),
    (ye.useOptimistic = function (A, G) {
      return H.H.useOptimistic(A, G);
    }),
    (ye.useReducer = function (A, G, W) {
      return H.H.useReducer(A, G, W);
    }),
    (ye.useRef = function (A) {
      return H.H.useRef(A);
    }),
    (ye.useState = function (A) {
      return H.H.useState(A);
    }),
    (ye.useSyncExternalStore = function (A, G, W) {
      return H.H.useSyncExternalStore(A, G, W);
    }),
    (ye.useTransition = function () {
      return H.H.useTransition();
    }),
    (ye.version = '19.2.5'),
    ye
  );
}
var Kh;
function vr() {
  return (Kh || ((Kh = 1), (Vo.exports = _0())), Vo.exports);
}
var Io = { exports: {} },
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
          w = typeof y.fetchPriority == 'string' ? y.fetchPriority : void 0;
        _ === 'style'
          ? s.d.S(g, typeof y.precedence == 'string' ? y.precedence : void 0, {
              crossOrigin: b,
              integrity: x,
              fetchPriority: w,
            })
          : _ === 'script' &&
            s.d.X(g, {
              crossOrigin: b,
              integrity: x,
              fetchPriority: w,
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
  if (Wh) return Io.exports;
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
  return (a(), (Io.exports = v0()), Io.exports);
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
  if (Fh) return Ei;
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
    w = Symbol.for('react.transitional.element'),
    S = Symbol.for('react.portal'),
    R = Symbol.for('react.fragment'),
    j = Symbol.for('react.strict_mode'),
    C = Symbol.for('react.profiler'),
    N = Symbol.for('react.consumer'),
    I = Symbol.for('react.context'),
    P = Symbol.for('react.forward_ref'),
    ee = Symbol.for('react.suspense'),
    V = Symbol.for('react.suspense_list'),
    H = Symbol.for('react.memo'),
    q = Symbol.for('react.lazy'),
    Q = Symbol.for('react.activity'),
    ae = Symbol.for('react.memo_cache_sentinel'),
    ue = Symbol.iterator;
  function ce(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (ue && e[ue]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var K = Symbol.for('react.client.reference');
  function J(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === K ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case R:
        return 'Fragment';
      case C:
        return 'Profiler';
      case j:
        return 'StrictMode';
      case ee:
        return 'Suspense';
      case V:
        return 'SuspenseList';
      case Q:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case S:
          return 'Portal';
        case I:
          return e.displayName || 'Context';
        case N:
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
  var he = Array.isArray,
    L = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Z = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    te = { pending: !1, data: null, method: null, action: null },
    ge = [],
    ke = -1;
  function A(e) {
    return { current: e };
  }
  function G(e) {
    0 > ke || ((e.current = ge[ke]), (ge[ke] = null), ke--);
  }
  function W(e, t) {
    (ke++, (ge[ke] = e.current), (e.current = t));
  }
  var le = A(null),
    pe = A(null),
    be = A(null),
    Ae = A(null);
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
    e.memoizedState !== null && W(Ae, e);
    var t = le.current,
      l = hh(t, e.type);
    t !== l && (W(pe, e), W(le, l));
  }
  function oe(e) {
    (pe.current === e && (G(le), G(pe)), Ae.current === e && (G(Ae), (vi._currentValue = te)));
  }
  var de, we;
  function Ee(e) {
    if (de === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        ((de = (t && t[1]) || ''),
          (we =
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
      we
    );
  }
  var bt = !1;
  function ks(e, t) {
    if (!e || bt) return '';
    bt = !0;
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
        var k = f.split(`
`),
          D = p.split(`
`);
        for (u = n = 0; n < k.length && !k[n].includes('DetermineComponentFrameRoot'); ) n++;
        for (; u < D.length && !D[u].includes('DetermineComponentFrameRoot'); ) u++;
        if (n === k.length || u === D.length)
          for (n = k.length - 1, u = D.length - 1; 1 <= n && 0 <= u && k[n] !== D[u]; ) u--;
        for (; 1 <= n && 0 <= u; n--, u--)
          if (k[n] !== D[u]) {
            if (n !== 1 || u !== 1)
              do
                if ((n--, u--, 0 > u || k[n] !== D[u])) {
                  var U =
                    `
` + k[n].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      U.includes('<anonymous>') &&
                      (U = U.replace('<anonymous>', e.displayName)),
                    U
                  );
                }
              while (1 <= n && 0 <= u);
            break;
          }
      }
    } finally {
      ((bt = !1), (Error.prepareStackTrace = l));
    }
    return (l = e ? e.displayName || e.name : '') ? Ee(l) : '';
  }
  function $y(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ee(e.type);
      case 16:
        return Ee('Lazy');
      case 13:
        return e.child !== t && t !== null ? Ee('Suspense Fallback') : Ee('Suspense');
      case 19:
        return Ee('SuspenseList');
      case 0:
      case 15:
        return ks(e.type, !1);
      case 11:
        return ks(e.type.render, !1);
      case 1:
        return ks(e.type, !0);
      case 31:
        return Ee('Activity');
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
  var Es = Object.prototype.hasOwnProperty,
    Ts = a.unstable_scheduleCallback,
    Ns = a.unstable_cancelCallback,
    Xy = a.unstable_shouldYield,
    Vy = a.unstable_requestPaint,
    At = a.unstable_now,
    Iy = a.unstable_getCurrentPriorityLevel,
    Xr = a.unstable_ImmediatePriority,
    Vr = a.unstable_UserBlockingPriority,
    Bi = a.unstable_NormalPriority,
    Qy = a.unstable_LowPriority,
    Ir = a.unstable_IdlePriority,
    Zy = a.log,
    Ky = a.unstable_setDisableYieldValue,
    wa = null,
    jt = null;
  function Ul(e) {
    if ((typeof Zy == 'function' && Ky(e), jt && typeof jt.setStrictMode == 'function'))
      try {
        jt.setStrictMode(wa, e);
      } catch {}
  }
  var Mt = Math.clz32 ? Math.clz32 : Fy,
    Jy = Math.log,
    Wy = Math.LN2;
  function Fy(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Jy(e) / Wy) | 0)) | 0);
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
  function Qr() {
    var e = Ui;
    return ((Ui <<= 1), (Ui & 62914560) === 0 && (Ui = 4194304), e);
  }
  function Cs(e) {
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
      k = e.expirationTimes,
      D = e.hiddenUpdates;
    for (l = f & ~l; 0 < l; ) {
      var U = 31 - Mt(l),
        X = 1 << U;
      ((p[U] = 0), (k[U] = -1));
      var z = D[U];
      if (z !== null)
        for (D[U] = null, U = 0; U < z.length; U++) {
          var B = z[U];
          B !== null && (B.lane &= -536870913);
        }
      l &= ~X;
    }
    (n !== 0 && Zr(e, n, 0),
      c !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(f & ~t)));
  }
  function Zr(e, t, l) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var n = 31 - Mt(t);
    ((e.entangledLanes |= t),
      (e.entanglements[n] = e.entanglements[n] | 1073741824 | (l & 261930)));
  }
  function Kr(e, t) {
    var l = (e.entangledLanes |= t);
    for (e = e.entanglements; l; ) {
      var n = 31 - Mt(l),
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
  function js(e) {
    return ((e &= -e), 2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function Wr() {
    var e = Z.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Lh(e.type));
  }
  function Fr(e, t) {
    var l = Z.p;
    try {
      return ((Z.p = e), t());
    } finally {
      Z.p = l;
    }
  }
  var Hl = Math.random().toString(36).slice(2),
    ot = '__reactFiber$' + Hl,
    St = '__reactProps$' + Hl,
    Dn = '__reactContainer$' + Hl,
    Ms = '__reactEvents$' + Hl,
    tg = '__reactListeners$' + Hl,
    lg = '__reactHandles$' + Hl,
    Pr = '__reactResources$' + Hl,
    Da = '__reactMarker$' + Hl;
  function ws(e) {
    (delete e[ot], delete e[St], delete e[Ms], delete e[tg], delete e[lg]);
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
    (qn(e, t), qn(e + 'Capture', t));
  }
  function qn(e, t) {
    for (tf[e] = t, e = 0; e < t.length; e++) ef.add(t[e]);
  }
  var ng = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    lf = {},
    nf = {};
  function ag(e) {
    return Es.call(nf, e)
      ? !0
      : Es.call(lf, e)
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
  function yl(e, t, l, n) {
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
  function Rs(e) {
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
  function Gt(e) {
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
          ? ((t === 0 && e.value === '') || e.value != t) && (e.value = '' + Ht(t))
          : e.value !== '' + Ht(t) && (e.value = '' + Ht(t))
        : (f !== 'submit' && f !== 'reset') || e.removeAttribute('value'),
      t != null
        ? Ds(e, f, Ht(t))
        : l != null
          ? Ds(e, f, Ht(l))
          : n != null && e.removeAttribute('value'),
      u == null && c != null && (e.defaultChecked = !!c),
      u != null && (e.checked = u && typeof u != 'function' && typeof u != 'symbol'),
      p != null && typeof p != 'function' && typeof p != 'symbol' && typeof p != 'boolean'
        ? (e.name = '' + Ht(p))
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
      ((l = l != null ? '' + Ht(l) : ''),
        (t = t != null ? '' + Ht(t) : l),
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
  function Ds(e, t, l) {
    (t === 'number' && $i(e.ownerDocument) === e) ||
      e.defaultValue === '' + l ||
      (e.defaultValue = '' + l);
  }
  function Un(e, t, l, n) {
    if (((e = e.options), t)) {
      t = {};
      for (var u = 0; u < l.length; u++) t['$' + l[u]] = !0;
      for (l = 0; l < e.length; l++)
        ((u = t.hasOwnProperty('$' + e[l].value)),
          e[l].selected !== u && (e[l].selected = u),
          u && n && (e[l].defaultSelected = !0));
    } else {
      for (l = '' + Ht(l), t = null, u = 0; u < e.length; u++) {
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
    if (t != null && ((t = '' + Ht(t)), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? '' + Ht(l) : '';
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
    ((l = Ht(t)),
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
  function gl() {}
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
      var l = e[St] || null;
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
              l = l.querySelectorAll('input[name="' + Gt('' + t) + '"][type="radio"]'), t = 0;
              t < l.length;
              t++
            ) {
              var n = l[t];
              if (n !== e && n.form === e.form) {
                var u = n[St] || null;
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
          ((t = l.value), t != null && Un(e, !!l.multiple, t, !1));
      }
    }
  }
  var qs = !1;
  function mf(e, t, l) {
    if (qs) return e(t, l);
    qs = !0;
    try {
      var n = e(t);
      return n;
    } finally {
      if (
        ((qs = !1),
        (Gn !== null || Yn !== null) &&
          (wu(), Gn && ((t = Gn), (e = Yn), (Yn = Gn = null), df(t), e)))
      )
        for (t = 0; t < e.length; t++) df(e[t]);
    }
  }
  function Ba(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var n = l[St] || null;
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
  var _l = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Us = !1;
  if (_l)
    try {
      var La = {};
      (Object.defineProperty(La, 'passive', {
        get: function () {
          Us = !0;
        },
      }),
        window.addEventListener('test', La, La),
        window.removeEventListener('test', La, La));
    } catch {
      Us = !1;
    }
  var Gl = null,
    Hs = null,
    Vi = null;
  function hf() {
    if (Vi) return Vi;
    var e,
      t = Hs,
      l = t.length,
      n,
      u = 'value' in Gl ? Gl.value : Gl.textContent,
      c = u.length;
    for (e = 0; e < l && t[e] === u[e]; e++);
    var f = l - e;
    for (n = 1; n <= f && t[l - n] === u[c - n]; n++);
    return (Vi = u.slice(e, 1 < n ? 1 - n : void 0));
  }
  function Ii(e) {
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
  function pf() {
    return !1;
  }
  function xt(e) {
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
          ? Qi
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
    Zi = xt(pn),
    qa = b({}, pn, { view: 0, detail: 0 }),
    rg = xt(qa),
    Gs,
    Ys,
    Ua,
    Ki = b({}, qa, {
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
          : (e !== Ua &&
              (Ua && e.type === 'mousemove'
                ? ((Gs = e.screenX - Ua.screenX), (Ys = e.screenY - Ua.screenY))
                : (Ys = Gs = 0),
              (Ua = e)),
            Gs);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : Ys;
      },
    }),
    yf = xt(Ki),
    fg = b({}, Ki, { dataTransfer: 0 }),
    dg = xt(fg),
    mg = b({}, qa, { relatedTarget: 0 }),
    $s = xt(mg),
    hg = b({}, pn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    pg = xt(hg),
    yg = b({}, pn, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    gg = xt(yg),
    _g = b({}, pn, { data: 0 }),
    gf = xt(_g),
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
  var kg = b({}, qa, {
      key: function (e) {
        if (e.key) {
          var t = vg[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = Ii(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
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
        return e.type === 'keypress' ? Ii(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? Ii(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    Eg = xt(kg),
    Tg = b({}, Ki, {
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
    _f = xt(Tg),
    Ng = b({}, qa, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Xs,
    }),
    Cg = xt(Ng),
    Ag = b({}, pn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    jg = xt(Ag),
    Mg = b({}, Ki, {
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
    wg = xt(Mg),
    Rg = b({}, pn, { newState: 0, oldState: 0 }),
    Og = xt(Rg),
    Dg = [9, 13, 27, 32],
    Vs = _l && 'CompositionEvent' in window,
    Ha = null;
  _l && 'documentMode' in document && (Ha = document.documentMode);
  var zg = _l && 'TextEvent' in window && !Ha,
    vf = _l && (!Vs || (Ha && 8 < Ha && 11 >= Ha)),
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
  function kf(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var $n = !1;
  function Bg(e, t) {
    switch (e) {
      case 'compositionend':
        return kf(t);
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
        ? ((e = hf()), (Vi = Hs = Gl = null), ($n = !1), e)
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
  var qg = {
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
  function Ef(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!qg[e.type] : t === 'textarea';
  }
  function Tf(e, t, l, n) {
    (Gn ? (Yn ? Yn.push(n) : (Yn = [n])) : (Gn = n),
      (t = qu(t, 'onChange')),
      0 < t.length &&
        ((l = new Zi('onChange', 'change', null, l, n)), e.push({ event: l, listeners: t })));
  }
  var Ga = null,
    Ya = null;
  function Ug(e) {
    sh(e, 0);
  }
  function Ji(e) {
    var t = za(e);
    if (uf(t)) return e;
  }
  function Nf(e, t) {
    if (e === 'change') return t;
  }
  var Cf = !1;
  if (_l) {
    var Is;
    if (_l) {
      var Qs = 'oninput' in document;
      if (!Qs) {
        var Af = document.createElement('div');
        (Af.setAttribute('oninput', 'return;'), (Qs = typeof Af.oninput == 'function'));
      }
      Is = Qs;
    } else Is = !1;
    Cf = Is && (!document.documentMode || 9 < document.documentMode);
  }
  function jf() {
    Ga && (Ga.detachEvent('onpropertychange', Mf), (Ya = Ga = null));
  }
  function Mf(e) {
    if (e.propertyName === 'value' && Ji(Ya)) {
      var t = [];
      (Tf(t, Ya, e, Ls(e)), mf(Ug, t));
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
  var wt = typeof Object.is == 'function' ? Object.is : Xg;
  function $a(e, t) {
    if (wt(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var l = Object.keys(e),
      n = Object.keys(t);
    if (l.length !== n.length) return !1;
    for (n = 0; n < l.length; n++) {
      var u = l[n];
      if (!Es.call(t, u) || !wt(e[u], t[u])) return !1;
    }
    return !0;
  }
  function wf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Rf(e, t) {
    var l = wf(e);
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
      l = wf(l);
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
  var Vg = _l && 'documentMode' in document && 11 >= document.documentMode,
    Xn = null,
    Ks = null,
    Xa = null,
    Js = !1;
  function zf(e, t, l) {
    var n = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Js ||
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
      (Xa && $a(Xa, n)) ||
        ((Xa = n),
        (n = qu(Ks, 'onSelect')),
        0 < n.length &&
          ((t = new Zi('onSelect', 'select', null, t, l)),
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
  _l &&
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
    qf = gn('animationiteration'),
    Uf = gn('animationstart'),
    Ig = gn('transitionrun'),
    Qg = gn('transitionstart'),
    Zg = gn('transitioncancel'),
    Hf = gn('transitionend'),
    Gf = new Map(),
    Fs =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  Fs.push('scrollEnd');
  function el(e, t) {
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
    Yt = [],
    In = 0,
    Ps = 0;
  function Fi() {
    for (var e = In, t = (Ps = In = 0); t < e; ) {
      var l = Yt[t];
      Yt[t++] = null;
      var n = Yt[t];
      Yt[t++] = null;
      var u = Yt[t];
      Yt[t++] = null;
      var c = Yt[t];
      if (((Yt[t++] = null), n !== null && u !== null)) {
        var f = n.pending;
        (f === null ? (u.next = u) : ((u.next = f.next), (f.next = u)), (n.pending = u));
      }
      c !== 0 && Yf(l, u, c);
    }
  }
  function Pi(e, t, l, n) {
    ((Yt[In++] = e),
      (Yt[In++] = t),
      (Yt[In++] = l),
      (Yt[In++] = n),
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
          ((u = 31 - Mt(l)),
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
  var Qn = {};
  function Kg(e, t, l, n) {
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
    return new Kg(e, t, l, n);
  }
  function tc(e) {
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
        case Q:
          return ((e = Rt(31, l, t, u)), (e.elementType = Q), (e.lanes = c), e);
        case R:
          return vn(l.children, u, c, t);
        case j:
          ((f = 8), (u |= 24));
          break;
        case C:
          return ((e = Rt(12, l, t, u | 2)), (e.elementType = C), (e.lanes = c), e);
        case ee:
          return ((e = Rt(13, l, t, u)), (e.elementType = ee), (e.lanes = c), e);
        case V:
          return ((e = Rt(19, l, t, u)), (e.elementType = V), (e.lanes = c), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case I:
                f = 10;
                break e;
              case N:
                f = 9;
                break e;
              case P:
                f = 11;
                break e;
              case H:
                f = 14;
                break e;
              case q:
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
  function $t(e, t) {
    if (typeof e == 'object' && e !== null) {
      var l = Vf.get(e);
      return l !== void 0 ? l : ((t = { value: e, source: t, stack: $r(t) }), Vf.set(e, t), t);
    }
    return { value: e, source: t, stack: $r(t) };
  }
  var Zn = [],
    Kn = 0,
    lu = null,
    Va = 0,
    Xt = [],
    Vt = 0,
    Yl = null,
    ol = 1,
    rl = '';
  function bl(e, t) {
    ((Zn[Kn++] = Va), (Zn[Kn++] = lu), (lu = e), (Va = t));
  }
  function If(e, t, l) {
    ((Xt[Vt++] = ol), (Xt[Vt++] = rl), (Xt[Vt++] = Yl), (Yl = e));
    var n = ol;
    e = rl;
    var u = 32 - Mt(n) - 1;
    ((n &= ~(1 << u)), (l += 1));
    var c = 32 - Mt(t) + u;
    if (30 < c) {
      var f = u - (u % 5);
      ((c = (n & ((1 << f) - 1)).toString(32)),
        (n >>= f),
        (u -= f),
        (ol = (1 << (32 - Mt(t) + u)) | (l << u) | n),
        (rl = c + e));
    } else ((ol = (1 << c) | (l << u) | n), (rl = e));
  }
  function ac(e) {
    e.return !== null && (bl(e, 1), If(e, 1, 0));
  }
  function ic(e) {
    for (; e === lu; ) ((lu = Zn[--Kn]), (Zn[Kn] = null), (Va = Zn[--Kn]), (Zn[Kn] = null));
    for (; e === Yl; )
      ((Yl = Xt[--Vt]),
        (Xt[Vt] = null),
        (rl = Xt[--Vt]),
        (Xt[Vt] = null),
        (ol = Xt[--Vt]),
        (Xt[Vt] = null));
  }
  function Qf(e, t) {
    ((Xt[Vt++] = ol), (Xt[Vt++] = rl), (Xt[Vt++] = Yl), (ol = t.id), (rl = t.overflow), (Yl = e));
  }
  var rt = null,
    $e = null,
    Ce = !1,
    $l = null,
    It = !1,
    uc = Error(s(519));
  function Xl(e) {
    var t = Error(
      s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (Ia($t(t, e)), uc);
  }
  function Zf(e) {
    var t = e.stateNode,
      l = e.type,
      n = e.memoizedProps;
    switch (((t[ot] = e), (t[St] = n), l)) {
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
          n.onClick != null && (t.onclick = gl),
          (t = !0))
        : (t = !1),
      t || Xl(e, !0));
  }
  function Kf(e) {
    for (rt = e.return; rt; )
      switch (rt.tag) {
        case 5:
        case 31:
        case 13:
          It = !1;
          return;
        case 27:
        case 3:
          It = !0;
          return;
        default:
          rt = rt.return;
      }
  }
  function Jn(e) {
    if (e !== rt) return !1;
    if (!Ce) return (Kf(e), (Ce = !0), !1);
    var t = e.tag,
      l;
    if (
      ((l = t !== 3 && t !== 27) &&
        ((l = t === 5) &&
          ((l = e.type), (l = !(l !== 'form' && l !== 'button') || To(e.type, e.memoizedProps))),
        (l = !l)),
      l && $e && Xl(e),
      Kf(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(s(317));
      $e = bh(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(s(317));
      $e = bh(e);
    } else
      t === 27
        ? ((t = $e), an(e.type) ? ((e = Mo), (Mo = null), ($e = e)) : ($e = t))
        : ($e = rt ? Zt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function bn() {
    (($e = rt = null), (Ce = !1));
  }
  function sc() {
    var e = $l;
    return (e !== null && (Nt === null ? (Nt = e) : Nt.push.apply(Nt, e), ($l = null)), e);
  }
  function Ia(e) {
    $l === null ? ($l = [e]) : $l.push(e);
  }
  var cc = A(null),
    Sn = null,
    Sl = null;
  function Vl(e, t, l) {
    (W(cc, t._currentValue), (t._currentValue = l));
  }
  function xl(e) {
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
          for (var k = 0; k < t.length; k++)
            if (p.context === t[k]) {
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
          wt(u.pendingProps.value, f.value) || (e !== null ? e.push(p) : (e = [p]));
        }
      } else if (u === Ae.current) {
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
      if (!wt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function xn(e) {
    ((Sn = e), (Sl = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function ft(e) {
    return Jf(Sn, e);
  }
  function au(e, t) {
    return (Sn === null && xn(e), Jf(e, t));
  }
  function Jf(e, t) {
    var l = t._currentValue;
    if (((t = { context: t, memoizedValue: l, next: null }), Sl === null)) {
      if (e === null) throw Error(s(308));
      ((Sl = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else Sl = Sl.next = t;
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
      $$typeof: I,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function fc() {
    return { controller: new Jg(), data: new Map(), refCount: 0 };
  }
  function Qa(e) {
    (e.refCount--,
      e.refCount === 0 &&
        Wg(Fg, function () {
          e.controller.abort();
        }));
  }
  var Za = null,
    dc = 0,
    Fn = 0,
    Pn = null;
  function Pg(e, t) {
    if (Za === null) {
      var l = (Za = []);
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
    if (--dc === 0 && Za !== null) {
      Pn !== null && (Pn.status = 'fulfilled');
      var e = Za;
      ((Za = null), (Fn = 0), (Pn = null));
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
  var kn = A(null);
  function mc() {
    var e = kn.current;
    return e !== null ? e : Ye.pooledCache;
  }
  function iu(e, t) {
    t === null ? W(kn, kn.current) : W(kn, t.pool);
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
      ((l = e[l]), l === void 0 ? e.push(t) : l !== t && (t.then(gl, gl), (t = l)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), nd(e), e);
      default:
        if (typeof t.status == 'string') t.then(gl, gl);
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
        throw ((Tn = t), ea);
    }
  }
  function En(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == 'object' && typeof l.then == 'function' ? ((Tn = l), ea) : l;
    }
  }
  var Tn = null;
  function ld() {
    if (Tn === null) throw Error(s(459));
    var e = Tn;
    return ((Tn = null), e);
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
      return ((M = vl(M, T)), (M.index = 0), (M.sibling = null), M);
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
        ? ((T = lc(O, M.mode, $)), (T.return = M), T)
        : ((T = u(T, O)), (T.return = M), T);
    }
    function k(M, T, O, $) {
      var se = O.type;
      return se === R
        ? U(M, T, O.props.children, $, O.key)
        : T !== null &&
            (T.elementType === se ||
              (typeof se == 'object' && se !== null && se.$$typeof === q && En(se) === T.type))
          ? ((T = u(T, O.props)), Ja(T, O), (T.return = M), T)
          : ((T = tu(O.type, O.key, O.props, null, M.mode, $)), Ja(T, O), (T.return = M), T);
    }
    function D(M, T, O, $) {
      return T === null ||
        T.tag !== 4 ||
        T.stateNode.containerInfo !== O.containerInfo ||
        T.stateNode.implementation !== O.implementation
        ? ((T = nc(O, M.mode, $)), (T.return = M), T)
        : ((T = u(T, O.children || [])), (T.return = M), T);
    }
    function U(M, T, O, $, se) {
      return T === null || T.tag !== 7
        ? ((T = vn(O, M.mode, $, se)), (T.return = M), T)
        : ((T = u(T, O)), (T.return = M), T);
    }
    function X(M, T, O) {
      if ((typeof T == 'string' && T !== '') || typeof T == 'number' || typeof T == 'bigint')
        return ((T = lc('' + T, M.mode, O)), (T.return = M), T);
      if (typeof T == 'object' && T !== null) {
        switch (T.$$typeof) {
          case w:
            return ((O = tu(T.type, T.key, T.props, null, M.mode, O)), Ja(O, T), (O.return = M), O);
          case S:
            return ((T = nc(T, M.mode, O)), (T.return = M), T);
          case q:
            return ((T = En(T)), X(M, T, O));
        }
        if (he(T) || ce(T)) return ((T = vn(T, M.mode, O, null)), (T.return = M), T);
        if (typeof T.then == 'function') return X(M, cu(T), O);
        if (T.$$typeof === I) return X(M, au(M, T), O);
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
          case w:
            return O.key === se ? k(M, T, O, $) : null;
          case S:
            return O.key === se ? D(M, T, O, $) : null;
          case q:
            return ((O = En(O)), z(M, T, O, $));
        }
        if (he(O) || ce(O)) return se !== null ? null : U(M, T, O, $, null);
        if (typeof O.then == 'function') return z(M, T, cu(O), $);
        if (O.$$typeof === I) return z(M, T, au(M, O), $);
        ou(M, O);
      }
      return null;
    }
    function B(M, T, O, $, se) {
      if ((typeof $ == 'string' && $ !== '') || typeof $ == 'number' || typeof $ == 'bigint')
        return ((M = M.get(O) || null), p(T, M, '' + $, se));
      if (typeof $ == 'object' && $ !== null) {
        switch ($.$$typeof) {
          case w:
            return ((M = M.get($.key === null ? O : $.key) || null), k(T, M, $, se));
          case S:
            return ((M = M.get($.key === null ? O : $.key) || null), D(T, M, $, se));
          case q:
            return (($ = En($)), B(M, T, O, $, se));
        }
        if (he($) || ce($)) return ((M = M.get(O) || null), U(T, M, $, se, null));
        if (typeof $.then == 'function') return B(M, T, O, cu($), se);
        if ($.$$typeof === I) return B(M, T, O, au(T, $), se);
        ou(T, $);
      }
      return null;
    }
    function ne(M, T, O, $) {
      for (
        var se = null, je = null, ie = T, ve = (T = 0), Ne = null;
        ie !== null && ve < O.length;
        ve++
      ) {
        ie.index > ve ? ((Ne = ie), (ie = null)) : (Ne = ie.sibling);
        var Me = z(M, ie, O[ve], $);
        if (Me === null) {
          ie === null && (ie = Ne);
          break;
        }
        (e && ie && Me.alternate === null && t(M, ie),
          (T = c(Me, T, ve)),
          je === null ? (se = Me) : (je.sibling = Me),
          (je = Me),
          (ie = Ne));
      }
      if (ve === O.length) return (l(M, ie), Ce && bl(M, ve), se);
      if (ie === null) {
        for (; ve < O.length; ve++)
          ((ie = X(M, O[ve], $)),
            ie !== null &&
              ((T = c(ie, T, ve)), je === null ? (se = ie) : (je.sibling = ie), (je = ie)));
        return (Ce && bl(M, ve), se);
      }
      for (ie = n(ie); ve < O.length; ve++)
        ((Ne = B(ie, M, ve, O[ve], $)),
          Ne !== null &&
            (e && Ne.alternate !== null && ie.delete(Ne.key === null ? ve : Ne.key),
            (T = c(Ne, T, ve)),
            je === null ? (se = Ne) : (je.sibling = Ne),
            (je = Ne)));
      return (
        e &&
          ie.forEach(function (rn) {
            return t(M, rn);
          }),
        Ce && bl(M, ve),
        se
      );
    }
    function re(M, T, O, $) {
      if (O == null) throw Error(s(151));
      for (
        var se = null, je = null, ie = T, ve = (T = 0), Ne = null, Me = O.next();
        ie !== null && !Me.done;
        ve++, Me = O.next()
      ) {
        ie.index > ve ? ((Ne = ie), (ie = null)) : (Ne = ie.sibling);
        var rn = z(M, ie, Me.value, $);
        if (rn === null) {
          ie === null && (ie = Ne);
          break;
        }
        (e && ie && rn.alternate === null && t(M, ie),
          (T = c(rn, T, ve)),
          je === null ? (se = rn) : (je.sibling = rn),
          (je = rn),
          (ie = Ne));
      }
      if (Me.done) return (l(M, ie), Ce && bl(M, ve), se);
      if (ie === null) {
        for (; !Me.done; ve++, Me = O.next())
          ((Me = X(M, Me.value, $)),
            Me !== null &&
              ((T = c(Me, T, ve)), je === null ? (se = Me) : (je.sibling = Me), (je = Me)));
        return (Ce && bl(M, ve), se);
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
          ie.forEach(function (f0) {
            return t(M, f0);
          }),
        Ce && bl(M, ve),
        se
      );
    }
    function He(M, T, O, $) {
      if (
        (typeof O == 'object' &&
          O !== null &&
          O.type === R &&
          O.key === null &&
          (O = O.props.children),
        typeof O == 'object' && O !== null)
      ) {
        switch (O.$$typeof) {
          case w:
            e: {
              for (var se = O.key; T !== null; ) {
                if (T.key === se) {
                  if (((se = O.type), se === R)) {
                    if (T.tag === 7) {
                      (l(M, T.sibling), ($ = u(T, O.props.children)), ($.return = M), (M = $));
                      break e;
                    }
                  } else if (
                    T.elementType === se ||
                    (typeof se == 'object' && se !== null && se.$$typeof === q && En(se) === T.type)
                  ) {
                    (l(M, T.sibling), ($ = u(T, O.props)), Ja($, O), ($.return = M), (M = $));
                    break e;
                  }
                  l(M, T);
                  break;
                } else t(M, T);
                T = T.sibling;
              }
              O.type === R
                ? (($ = vn(O.props.children, M.mode, $, O.key)), ($.return = M), (M = $))
                : (($ = tu(O.type, O.key, O.props, null, M.mode, $)),
                  Ja($, O),
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
              (($ = nc(O, M.mode, $)), ($.return = M), (M = $));
            }
            return f(M);
          case q:
            return ((O = En(O)), He(M, T, O, $));
        }
        if (he(O)) return ne(M, T, O, $);
        if (ce(O)) {
          if (((se = ce(O)), typeof se != 'function')) throw Error(s(150));
          return ((O = se.call(O)), re(M, T, O, $));
        }
        if (typeof O.then == 'function') return He(M, T, cu(O), $);
        if (O.$$typeof === I) return He(M, T, au(M, O), $);
        ou(M, O);
      }
      return (typeof O == 'string' && O !== '') || typeof O == 'number' || typeof O == 'bigint'
        ? ((O = '' + O),
          T !== null && T.tag === 6
            ? (l(M, T.sibling), ($ = u(T, O)), ($.return = M), (M = $))
            : (l(M, T), ($ = lc(O, M.mode, $)), ($.return = M), (M = $)),
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
  var Nn = ad(!0),
    id = ad(!1),
    Il = !1;
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
    if (((n = n.shared), (Re & 2) !== 0)) {
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
      ((n &= e.pendingLanes), (l |= n), (t.lanes = l), Kr(e, l));
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
    Il = !1;
    var c = u.firstBaseUpdate,
      f = u.lastBaseUpdate,
      p = u.shared.pending;
    if (p !== null) {
      u.shared.pending = null;
      var k = p,
        D = k.next;
      ((k.next = null), f === null ? (c = D) : (f.next = D), (f = k));
      var U = e.alternate;
      U !== null &&
        ((U = U.updateQueue),
        (p = U.lastBaseUpdate),
        p !== f && (p === null ? (U.firstBaseUpdate = D) : (p.next = D), (U.lastBaseUpdate = k)));
    }
    if (c !== null) {
      var X = u.baseState;
      ((f = 0), (U = D = k = null), (p = c));
      do {
        var z = p.lane & -536870913,
          B = z !== p.lane;
        if (B ? (Te & z) === z : (n & z) === z) {
          (z !== 0 && z === Fn && (_c = !0),
            U !== null &&
              (U = U.next =
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
                Il = !0;
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
            U === null ? ((D = U = B), (k = X)) : (U = U.next = B),
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
      (U === null && (k = X),
        (u.baseState = k),
        (u.firstBaseUpdate = D),
        (u.lastBaseUpdate = U),
        c === null && (u.shared.lanes = 0),
        (Pl |= f),
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
  var la = A(null),
    ru = A(0);
  function cd(e, t) {
    ((e = wl), W(ru, e), W(la, t), (wl = e | t.baseLanes));
  }
  function vc() {
    (W(ru, wl), W(la, la.current));
  }
  function bc() {
    ((wl = ru.current), G(la), G(ru));
  }
  var Ot = A(null),
    Qt = null;
  function Kl(e) {
    var t = e.alternate;
    (W(Fe, Fe.current & 1),
      W(Ot, e),
      Qt === null && (t === null || la.current !== null || t.memoizedState !== null) && (Qt = e));
  }
  function Sc(e) {
    (W(Fe, Fe.current), W(Ot, e), Qt === null && (Qt = e));
  }
  function od(e) {
    e.tag === 22 ? (W(Fe, Fe.current), W(Ot, e), Qt === null && (Qt = e)) : Jl();
  }
  function Jl() {
    (W(Fe, Fe.current), W(Ot, Ot.current));
  }
  function Dt(e) {
    (G(Ot), Qt === e && (Qt = null), G(Fe));
  }
  var Fe = A(0);
  function fu(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && ((l = l.dehydrated), l === null || Ao(l) || jo(l))) return t;
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
  var kl = 0,
    _e = null,
    qe = null,
    lt = null,
    du = !1,
    na = !1,
    Cn = !1,
    mu = 0,
    ei = 0,
    aa = null,
    t_ = 0;
  function Ke() {
    throw Error(s(321));
  }
  function xc(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++) if (!wt(e[l], t[l])) return !1;
    return !0;
  }
  function kc(e, t, l, n, u, c) {
    return (
      (kl = c),
      (_e = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (L.H = e === null || e.memoizedState === null ? Id : qc),
      (Cn = !1),
      (c = l(n, u)),
      (Cn = !1),
      na && (c = fd(t, l, n, u)),
      rd(e),
      c
    );
  }
  function rd(e) {
    L.H = ni;
    var t = qe !== null && qe.next !== null;
    if (((kl = 0), (lt = qe = _e = null), (du = !1), (ei = 0), (aa = null), t)) throw Error(s(300));
    e === null || nt || ((e = e.dependencies), e !== null && nu(e) && (nt = !0));
  }
  function fd(e, t, l, n) {
    _e = e;
    var u = 0;
    do {
      if ((na && (aa = null), (ei = 0), (na = !1), 25 <= u)) throw Error(s(301));
      if (((u += 1), (lt = qe = null), e.updateQueue != null)) {
        var c = e.updateQueue;
        ((c.lastEffect = null),
          (c.events = null),
          (c.stores = null),
          c.memoCache != null && (c.memoCache.index = 0));
      }
      ((L.H = Qd), (c = t(l, n)));
    } while (na);
    return c;
  }
  function l_() {
    var e = L.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? ti(t) : t),
      (e = e.useState()[0]),
      (qe !== null ? qe.memoizedState : null) !== e && (_e.flags |= 1024),
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
    ((kl = 0), (lt = qe = _e = null), (na = !1), (ei = mu = 0), (aa = null));
  }
  function vt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (lt === null ? (_e.memoizedState = lt = e) : (lt = lt.next = e), lt);
  }
  function Pe() {
    if (qe === null) {
      var e = _e.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = qe.next;
    var t = lt === null ? _e.memoizedState : lt.next;
    if (t !== null) ((lt = t), (qe = e));
    else {
      if (e === null) throw _e.alternate === null ? Error(s(467)) : Error(s(310));
      ((qe = e),
        (e = {
          memoizedState: qe.memoizedState,
          baseState: qe.baseState,
          baseQueue: qe.baseQueue,
          queue: qe.queue,
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
        ((t = t.alternate), (L.H = t === null || t.memoizedState === null ? Id : qc)),
      e
    );
  }
  function pu(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return ti(e);
      if (e.$$typeof === I) return ft(e);
    }
    throw Error(s(438, String(e)));
  }
  function Cc(e) {
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
    return Ac(t, qe, e);
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
        k = null,
        D = t,
        U = !1;
      do {
        var X = D.lane & -536870913;
        if (X !== D.lane ? (Te & X) === X : (kl & X) === X) {
          var z = D.revertLane;
          if (z === 0)
            (k !== null &&
              (k = k.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: D.action,
                  hasEagerState: D.hasEagerState,
                  eagerState: D.eagerState,
                  next: null,
                }),
              X === Fn && (U = !0));
          else if ((kl & z) === z) {
            ((D = D.next), z === Fn && (U = !0));
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
              k === null ? ((p = k = X), (f = c)) : (k = k.next = X),
              (_e.lanes |= z),
              (Pl |= z));
          ((X = D.action), Cn && l(c, X), (c = D.hasEagerState ? D.eagerState : l(c, X)));
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
            k === null ? ((p = k = z), (f = c)) : (k = k.next = z),
            (_e.lanes |= X),
            (Pl |= X));
        D = D.next;
      } while (D !== null && D !== t);
      if (
        (k === null ? (f = c) : (k.next = p),
        !wt(c, e.memoizedState) && ((nt = !0), U && ((l = Pn), l !== null)))
      )
        throw l;
      ((e.memoizedState = c), (e.baseState = f), (e.baseQueue = k), (n.lastRenderedState = c));
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
      (wt(c, t.memoizedState) || (nt = !0),
        (t.memoizedState = c),
        t.baseQueue === null && (t.baseState = c),
        (l.lastRenderedState = c));
    }
    return [c, n];
  }
  function dd(e, t, l) {
    var n = _e,
      u = Pe(),
      c = Ce;
    if (c) {
      if (l === void 0) throw Error(s(407));
      l = l();
    } else l = t();
    var f = !wt((qe || u).memoizedState, l);
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
      c || (kl & 127) !== 0 || md(n, t, l);
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
      return !wt(e, l);
    } catch {
      return !0;
    }
  }
  function gd(e) {
    var t = _n(e, 2);
    t !== null && Ct(t, e, 2);
  }
  function Mc(e) {
    var t = vt();
    if (typeof e == 'function') {
      var l = e;
      if (((e = l()), Cn)) {
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
    return ((e.baseState = l), Ac(e, qe, typeof n == 'function' ? n : El));
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
          k = L.S;
        (k !== null && k(f, p), bd(e, t, p));
      } catch (D) {
        wc(e, t, D);
      } finally {
        (c !== null && f.types !== null && (c.types = f.types), (L.T = c));
      }
    } else
      try {
        ((c = l(u, n)), bd(e, t, c));
      } catch (D) {
        wc(e, t, D);
      }
  }
  function bd(e, t, l) {
    l !== null && typeof l == 'object' && typeof l.then == 'function'
      ? l.then(
          function (n) {
            Sd(e, t, n);
          },
          function (n) {
            return wc(e, t, n);
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
  function wc(e, t, l) {
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
  function kd(e, t) {
    return t;
  }
  function Ed(e, t) {
    if (Ce) {
      var l = Ye.formState;
      if (l !== null) {
        e: {
          var n = _e;
          if (Ce) {
            if ($e) {
              t: {
                for (var u = $e, c = It; u.nodeType !== 8; ) {
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
            Xl(n);
          }
          n = !1;
        }
        n && (t = l[0]);
      }
    }
    return (
      (l = vt()),
      (l.memoizedState = l.baseState = t),
      (n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: kd,
        lastRenderedState: t,
      }),
      (l.queue = n),
      (l = $d.bind(null, _e, n)),
      (n.dispatch = l),
      (n = Mc(!1)),
      (c = Lc.bind(null, _e, !1, n.queue)),
      (n = vt()),
      (u = { state: t, dispatch: null, action: e, pending: null }),
      (n.queue = u),
      (l = n_.bind(null, _e, u, c, l)),
      (u.dispatch = l),
      (n.memoizedState = e),
      [t, l, !1]
    );
  }
  function Td(e) {
    var t = Pe();
    return Nd(t, qe, e);
  }
  function Nd(e, t, l) {
    if (
      ((t = Ac(e, t, kd)[0]),
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
  function Cd(e) {
    var t = Pe(),
      l = qe;
    if (l !== null) return Nd(t, l, e);
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
  function Ad() {
    return Pe().memoizedState;
  }
  function gu(e, t, l, n) {
    var u = vt();
    ((_e.flags |= e),
      (u.memoizedState = ia(1 | t, { destroy: void 0 }, l, n === void 0 ? null : n)));
  }
  function _u(e, t, l, n) {
    var u = Pe();
    n = n === void 0 ? null : n;
    var c = u.memoizedState.inst;
    qe !== null && n !== null && xc(n, qe.memoizedState.deps)
      ? (u.memoizedState = ia(t, c, l, n))
      : ((_e.flags |= e), (u.memoizedState = ia(1 | t, c, l, n)));
  }
  function jd(e, t) {
    gu(8390656, 8, e, t);
  }
  function Rc(e, t) {
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
        if ((Re & 2) !== 0) throw Error(s(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function wd(e, t) {
    return _u(4, 2, e, t);
  }
  function Rd(e, t) {
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
    if (((n = e()), Cn)) {
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
    return l === void 0 || ((kl & 1073741824) !== 0 && (Te & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = l), (e = Lm()), (_e.lanes |= e), (Pl |= e), l);
  }
  function Ld(e, t, l, n) {
    return wt(l, t)
      ? l
      : la.current !== null
        ? ((e = Dc(e, l, n)), wt(e, t) || (nt = !0), e)
        : (kl & 42) === 0 || ((kl & 1073741824) !== 0 && (Te & 261930) === 0)
          ? ((nt = !0), (e.memoizedState = l))
          : ((e = Lm()), (_e.lanes |= e), (Pl |= e), t);
  }
  function qd(e, t, l, n, u) {
    var c = Z.p;
    Z.p = c !== 0 && 8 > c ? c : 8;
    var f = L.T,
      p = {};
    ((L.T = p), Lc(e, !1, t, l));
    try {
      var k = u(),
        D = L.S;
      if (
        (D !== null && D(p, k), k !== null && typeof k == 'object' && typeof k.then == 'function')
      ) {
        var U = e_(k, n);
        li(e, t, U, Lt(e));
      } else li(e, t, n, Lt(e));
    } catch (X) {
      li(e, t, { then: function () {}, status: 'rejected', reason: X }, Lt());
    } finally {
      ((Z.p = c), f !== null && p.types !== null && (f.types = p.types), (L.T = f));
    }
  }
  function u_() {}
  function zc(e, t, l, n) {
    if (e.tag !== 5) throw Error(s(476));
    var u = Ud(e).queue;
    qd(
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
  function Ud(e) {
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
    var t = Ud(e);
    (t.next === null && (t = e.alternate.memoizedState), li(e, t.next.queue, {}, Lt()));
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
          var l = Lt();
          e = Ql(l);
          var n = Zl(t, e, l);
          (n !== null && (Ct(n, t, l), Wa(n, t, l)), (t = { cache: fc() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function c_(e, t, l) {
    var n = Lt();
    ((l = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      vu(e) ? Xd(t, l) : ((l = ec(e, t, l, n)), l !== null && (Ct(l, e, n), Vd(l, t, n))));
  }
  function $d(e, t, l) {
    var n = Lt();
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
          if (((u.hasEagerState = !0), (u.eagerState = p), wt(p, f)))
            return (Pi(e, t, u, 0), Ye === null && Fi(), !1);
        } catch {
        } finally {
        }
      if (((l = ec(e, t, u, n)), l !== null)) return (Ct(l, e, n), Vd(l, t, n), !0);
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
    } else ((t = ec(e, l, n, 2)), t !== null && Ct(t, e, 2));
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
      ((n &= e.pendingLanes), (l |= n), (t.lanes = l), Kr(e, l));
    }
  }
  var ni = {
    readContext: ft,
    use: pu,
    useCallback: Ke,
    useContext: Ke,
    useEffect: Ke,
    useImperativeHandle: Ke,
    useLayoutEffect: Ke,
    useInsertionEffect: Ke,
    useMemo: Ke,
    useReducer: Ke,
    useRef: Ke,
    useState: Ke,
    useDebugValue: Ke,
    useDeferredValue: Ke,
    useTransition: Ke,
    useSyncExternalStore: Ke,
    useId: Ke,
    useHostTransitionStatus: Ke,
    useFormState: Ke,
    useActionState: Ke,
    useOptimistic: Ke,
    useMemoCache: Ke,
    useCacheRefresh: Ke,
  };
  ni.useEffectEvent = Ke;
  var Id = {
      readContext: ft,
      use: pu,
      useCallback: function (e, t) {
        return ((vt().memoizedState = [e, t === void 0 ? null : t]), e);
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
        var l = vt();
        t = t === void 0 ? null : t;
        var n = e();
        if (Cn) {
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
        var n = vt();
        if (l !== void 0) {
          var u = l(t);
          if (Cn) {
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
        var t = vt();
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
        var l = vt();
        return Dc(l, e, t);
      },
      useTransition: function () {
        var e = Mc(!1);
        return ((e = qd.bind(null, _e, e.queue, !0, !1)), (vt().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, l) {
        var n = _e,
          u = vt();
        if (Ce) {
          if (l === void 0) throw Error(s(407));
          l = l();
        } else {
          if (((l = t()), Ye === null)) throw Error(s(349));
          (Te & 127) !== 0 || md(n, t, l);
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
        var e = vt(),
          t = Ye.identifierPrefix;
        if (Ce) {
          var l = rl,
            n = ol;
          ((l = (n & ~(1 << (32 - Mt(n) - 1))).toString(32) + l),
            (t = '_' + t + 'R_' + l),
            (l = mu++),
            0 < l && (t += 'H' + l.toString(32)),
            (t += '_'));
        } else ((l = t_++), (t = '_' + t + 'r_' + l.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: Bc,
      useFormState: Ed,
      useActionState: Ed,
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
        return ((t.queue = l), (t = Lc.bind(null, _e, !0, l)), (l.dispatch = t), [e, t]);
      },
      useMemoCache: Cc,
      useCacheRefresh: function () {
        return (vt().memoizedState = s_.bind(null, _e));
      },
      useEffectEvent: function (e) {
        var t = vt(),
          l = { impl: e };
        return (
          (t.memoizedState = l),
          function () {
            if ((Re & 2) !== 0) throw Error(s(440));
            return l.impl.apply(void 0, arguments);
          }
        );
      },
    },
    qc = {
      readContext: ft,
      use: pu,
      useCallback: zd,
      useContext: ft,
      useEffect: Rc,
      useImperativeHandle: Dd,
      useInsertionEffect: wd,
      useLayoutEffect: Rd,
      useMemo: Bd,
      useReducer: yu,
      useRef: Ad,
      useState: function () {
        return yu(El);
      },
      useDebugValue: Oc,
      useDeferredValue: function (e, t) {
        var l = Pe();
        return Ld(l, qe.memoizedState, e, t);
      },
      useTransition: function () {
        var e = yu(El)[0],
          t = Pe().memoizedState;
        return [typeof e == 'boolean' ? e : ti(e), t];
      },
      useSyncExternalStore: dd,
      useId: Gd,
      useHostTransitionStatus: Bc,
      useFormState: Td,
      useActionState: Td,
      useOptimistic: function (e, t) {
        var l = Pe();
        return _d(l, qe, e, t);
      },
      useMemoCache: Cc,
      useCacheRefresh: Yd,
    };
  qc.useEffectEvent = Md;
  var Qd = {
    readContext: ft,
    use: pu,
    useCallback: zd,
    useContext: ft,
    useEffect: Rc,
    useImperativeHandle: Dd,
    useInsertionEffect: wd,
    useLayoutEffect: Rd,
    useMemo: Bd,
    useReducer: jc,
    useRef: Ad,
    useState: function () {
      return jc(El);
    },
    useDebugValue: Oc,
    useDeferredValue: function (e, t) {
      var l = Pe();
      return qe === null ? Dc(l, e, t) : Ld(l, qe.memoizedState, e, t);
    },
    useTransition: function () {
      var e = jc(El)[0],
        t = Pe().memoizedState;
      return [typeof e == 'boolean' ? e : ti(e), t];
    },
    useSyncExternalStore: dd,
    useId: Gd,
    useHostTransitionStatus: Bc,
    useFormState: Cd,
    useActionState: Cd,
    useOptimistic: function (e, t) {
      var l = Pe();
      return qe !== null ? _d(l, qe, e, t) : ((l.baseState = e), [e, l.queue.dispatch]);
    },
    useMemoCache: Cc,
    useCacheRefresh: Yd,
  };
  Qd.useEffectEvent = Md;
  function Uc(e, t, l, n) {
    ((t = e.memoizedState),
      (l = l(n, t)),
      (l = l == null ? t : b({}, t, l)),
      (e.memoizedState = l),
      e.lanes === 0 && (e.updateQueue.baseState = l));
  }
  var Hc = {
    enqueueSetState: function (e, t, l) {
      e = e._reactInternals;
      var n = Lt(),
        u = Ql(n);
      ((u.payload = t),
        l != null && (u.callback = l),
        (t = Zl(e, u, n)),
        t !== null && (Ct(t, e, n), Wa(t, e, n)));
    },
    enqueueReplaceState: function (e, t, l) {
      e = e._reactInternals;
      var n = Lt(),
        u = Ql(n);
      ((u.tag = 1),
        (u.payload = t),
        l != null && (u.callback = l),
        (t = Zl(e, u, n)),
        t !== null && (Ct(t, e, n), Wa(t, e, n)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var l = Lt(),
        n = Ql(l);
      ((n.tag = 2),
        t != null && (n.callback = t),
        (t = Zl(e, n, l)),
        t !== null && (Ct(t, e, l), Wa(t, e, l)));
    },
  };
  function Zd(e, t, l, n, u, c, f) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(n, c, f)
        : t.prototype && t.prototype.isPureReactComponent
          ? !$a(l, n) || !$a(u, c)
          : !0
    );
  }
  function Kd(e, t, l, n) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(l, n),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(l, n),
      t.state !== e && Hc.enqueueReplaceState(t, t.state, null));
  }
  function An(e, t) {
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
          typeof u != 'function' && (en === null ? (en = new Set([this])) : en.add(this)));
        var p = n.stack;
        this.componentDidCatch(n.value, { componentStack: p !== null ? p : '' });
      });
  }
  function o_(e, t, l, n, u) {
    if (((l.flags |= 32768), n !== null && typeof n == 'object' && typeof n.then == 'function')) {
      if (((t = l.alternate), t !== null && Wn(t, l, u, !0), (l = Ot.current), l !== null)) {
        switch (l.tag) {
          case 31:
          case 13:
            return (
              Qt === null ? Ru() : l.alternate === null && Je === 0 && (Je = 3),
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
      return (mo(e, n, u), Ru(), !1);
    }
    if (Ce)
      return (
        (t = Ot.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = u),
            n !== uc && ((e = Error(s(422), { cause: n })), Ia($t(e, l))))
          : (n !== uc && ((t = Error(s(423), { cause: n })), Ia($t(t, l))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (u &= -u),
            (e.lanes |= u),
            (n = $t(n, l)),
            (u = Gc(e.stateNode, n, u)),
            gc(e, u),
            Je !== 4 && (Je = 2)),
        !1
      );
    var c = Error(s(520), { cause: n });
    if (((c = $t(c, l)), fi === null ? (fi = [c]) : fi.push(c), Je !== 4 && (Je = 2), t === null))
      return !0;
    ((n = $t(n, l)), (l = t));
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
                  (en === null || !en.has(c)))))
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
    t.child = e === null ? id(t, null, l, n) : Nn(t, e.child, l, n);
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
      (n = kc(e, t, l, f, c, u)),
      (p = Ec()),
      e !== null && !nt
        ? (Tc(e, t, u), Tl(e, t, u))
        : (Ce && p && ac(t), (t.flags |= 1), dt(e, t, n, u), t.child)
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
    return ((t.flags |= 1), (e = vl(c, n)), (e.ref = t.ref), (e.return = t), (t.child = e));
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
        ? (iu(t, c.cachePool), cd(t, c), Jl(), (t.memoizedState = null))
        : (e !== null && iu(t, null), vc(), Jl());
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
      (t = ku({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function sm(e, t, l) {
    return (
      Nn(t, e.child, null, l),
      (e = Su(t, t.pendingProps)),
      (e.flags |= 2),
      Dt(t),
      (t.memoizedState = null),
      e
    );
  }
  function r_(e, t, l) {
    var n = t.pendingProps,
      u = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (Ce) {
        if (n.mode === 'hidden') return ((e = Su(t, n)), (t.lanes = 536870912), ai(null, e));
        if (
          (Sc(t),
          (e = $e)
            ? ((e = vh(e, It)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Yl !== null ? { id: ol, overflow: rl } : null,
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
          throw Xl(t);
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
          throw ((c.retryLane = f), _n(e, f), Ct(n, e, f), Yc);
        (Ru(), (t = sm(e, t, l)));
      } else
        ((e = c.treeContext),
          ($e = Zt(f.nextSibling)),
          (rt = t),
          (Ce = !0),
          ($l = null),
          (It = !1),
          e !== null && Qf(t, e),
          (t = Su(t, n)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = vl(e.child, { mode: n.mode, children: n.children })),
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
      (l = kc(e, t, l, n, void 0, u)),
      (n = Ec()),
      e !== null && !nt
        ? (Tc(e, t, u), Tl(e, t, u))
        : (Ce && n && ac(t), (t.flags |= 1), dt(e, t, l, u), t.child)
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
        ? (Tc(e, t, c), Tl(e, t, c))
        : (Ce && n && ac(t), (t.flags |= 1), dt(e, t, l, c), t.child)
    );
  }
  function om(e, t, l, n, u) {
    if ((xn(t), t.stateNode === null)) {
      var c = Qn,
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
        (c.context = typeof f == 'object' && f !== null ? ft(f) : Qn),
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
          f !== c.state && Hc.enqueueReplaceState(c, c.state, null),
          Pa(t, n, c, u),
          Fa(),
          (c.state = t.memoizedState)),
        typeof c.componentDidMount == 'function' && (t.flags |= 4194308),
        (n = !0));
    } else if (e === null) {
      c = t.stateNode;
      var p = t.memoizedProps,
        k = An(l, p);
      c.props = k;
      var D = c.context,
        U = l.contextType;
      ((f = Qn), typeof U == 'object' && U !== null && (f = ft(U)));
      var X = l.getDerivedStateFromProps;
      ((U = typeof X == 'function' || typeof c.getSnapshotBeforeUpdate == 'function'),
        (p = t.pendingProps !== p),
        U ||
          (typeof c.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof c.componentWillReceiveProps != 'function') ||
          ((p || D !== f) && Kd(t, c, n, f)),
        (Il = !1));
      var z = t.memoizedState;
      ((c.state = z),
        Pa(t, n, c, u),
        Fa(),
        (D = t.memoizedState),
        p || z !== D || Il
          ? (typeof X == 'function' && (Uc(t, l, X, n), (D = t.memoizedState)),
            (k = Il || Zd(t, l, k, n, z, D, f))
              ? (U ||
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
            (n = k))
          : (typeof c.componentDidMount == 'function' && (t.flags |= 4194308), (n = !1)));
    } else {
      ((c = t.stateNode),
        yc(e, t),
        (f = t.memoizedProps),
        (U = An(l, f)),
        (c.props = U),
        (X = t.pendingProps),
        (z = c.context),
        (D = l.contextType),
        (k = Qn),
        typeof D == 'object' && D !== null && (k = ft(D)),
        (p = l.getDerivedStateFromProps),
        (D = typeof p == 'function' || typeof c.getSnapshotBeforeUpdate == 'function') ||
          (typeof c.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof c.componentWillReceiveProps != 'function') ||
          ((f !== X || z !== k) && Kd(t, c, n, k)),
        (Il = !1),
        (z = t.memoizedState),
        (c.state = z),
        Pa(t, n, c, u),
        Fa());
      var B = t.memoizedState;
      f !== X || z !== B || Il || (e !== null && e.dependencies !== null && nu(e.dependencies))
        ? (typeof p == 'function' && (Uc(t, l, p, n), (B = t.memoizedState)),
          (U =
            Il ||
            Zd(t, l, U, n, z, B, k) ||
            (e !== null && e.dependencies !== null && nu(e.dependencies)))
            ? (D ||
                (typeof c.UNSAFE_componentWillUpdate != 'function' &&
                  typeof c.componentWillUpdate != 'function') ||
                (typeof c.componentWillUpdate == 'function' && c.componentWillUpdate(n, B, k),
                typeof c.UNSAFE_componentWillUpdate == 'function' &&
                  c.UNSAFE_componentWillUpdate(n, B, k)),
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
          (c.context = k),
          (n = U))
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
            ? ((t.child = Nn(t, e.child, null, u)), (t.child = Nn(t, null, l, u)))
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
  function Ic(e, t, l) {
    return ((e = e !== null ? e.childLanes & ~l : 0), t && (e |= Bt), e);
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
      if (Ce) {
        if (
          (u ? Kl(t) : Jl(),
          (e = $e)
            ? ((e = vh(e, It)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Yl !== null ? { id: ol, overflow: rl } : null,
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
          throw Xl(t);
        return (jo(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var p = n.children;
      return (
        (n = n.fallback),
        u
          ? (Jl(),
            (u = t.mode),
            (p = ku({ mode: 'hidden', children: p }, u)),
            (n = vn(n, u, l, null)),
            (p.return = t),
            (n.return = t),
            (p.sibling = n),
            (t.child = p),
            (n = t.child),
            (n.memoizedState = Vc(l)),
            (n.childLanes = Ic(e, f, l)),
            (t.memoizedState = Xc),
            ai(null, n))
          : (Kl(t), Qc(t, p))
      );
    }
    var k = e.memoizedState;
    if (k !== null && ((p = k.dehydrated), p !== null)) {
      if (c)
        t.flags & 256
          ? (Kl(t), (t.flags &= -257), (t = Zc(e, t, l)))
          : t.memoizedState !== null
            ? (Jl(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (Jl(),
              (p = n.fallback),
              (u = t.mode),
              (n = ku({ mode: 'visible', children: n.children }, u)),
              (p = vn(p, u, l, null)),
              (p.flags |= 2),
              (n.return = t),
              (p.return = t),
              (n.sibling = p),
              (t.child = n),
              Nn(t, e.child, null, l),
              (n = t.child),
              (n.memoizedState = Vc(l)),
              (n.childLanes = Ic(e, f, l)),
              (t.memoizedState = Xc),
              (t = ai(null, n)));
      else if ((Kl(t), jo(p))) {
        if (((f = p.nextSibling && p.nextSibling.dataset), f)) var D = f.dgst;
        ((f = D),
          (n = Error(s(419))),
          (n.stack = ''),
          (n.digest = f),
          Ia({ value: n, source: null, stack: null }),
          (t = Zc(e, t, l)));
      } else if ((nt || Wn(e, t, l, !1), (f = (l & e.childLanes) !== 0), nt || f)) {
        if (((f = Ye), f !== null && ((n = Jr(f, l)), n !== 0 && n !== k.retryLane)))
          throw ((k.retryLane = n), _n(e, n), Ct(f, e, n), Yc);
        (Ao(p) || Ru(), (t = Zc(e, t, l)));
      } else
        Ao(p)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = k.treeContext),
            ($e = Zt(p.nextSibling)),
            (rt = t),
            (Ce = !0),
            ($l = null),
            (It = !1),
            e !== null && Qf(t, e),
            (t = Qc(t, n.children)),
            (t.flags |= 4096));
      return t;
    }
    return u
      ? (Jl(),
        (p = n.fallback),
        (u = t.mode),
        (k = e.child),
        (D = k.sibling),
        (n = vl(k, { mode: 'hidden', children: n.children })),
        (n.subtreeFlags = k.subtreeFlags & 65011712),
        D !== null ? (p = vl(D, p)) : ((p = vn(p, u, l, null)), (p.flags |= 2)),
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
              ? ((k = tt._currentValue), (u = u.parent !== k ? { parent: k, pool: k } : u))
              : (u = Pf()),
            (p = { baseLanes: p.baseLanes | l, cachePool: u })),
        (n.memoizedState = p),
        (n.childLanes = Ic(e, f, l)),
        (t.memoizedState = Xc),
        ai(e.child, n))
      : (Kl(t),
        (l = e.child),
        (e = l.sibling),
        (l = vl(l, { mode: 'visible', children: n.children })),
        (l.return = t),
        (l.sibling = null),
        e !== null &&
          ((f = t.deletions), f === null ? ((t.deletions = [e]), (t.flags |= 16)) : f.push(e)),
        (t.child = l),
        (t.memoizedState = null),
        l);
  }
  function Qc(e, t) {
    return ((t = ku({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function ku(e, t) {
    return ((e = Rt(22, e, null, t)), (e.lanes = 0), e);
  }
  function Zc(e, t, l) {
    return (
      Nn(t, e.child, null, l),
      (e = Qc(t, t.pendingProps.children)),
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
      (n = Ce ? Va : 0),
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
  function Tl(e, t, l) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (Pl |= t.lanes), (l & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((Wn(e, t, l, !1), (l & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(s(153));
    if (t.child !== null) {
      for (e = t.child, l = vl(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        ((e = e.sibling), (l = l.sibling = vl(e, e.pendingProps)), (l.return = t));
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
        (ut(t, t.stateNode.containerInfo), Vl(t, tt, e.memoizedState.cache), bn());
        break;
      case 27:
      case 5:
        Y(t);
        break;
      case 4:
        ut(t, t.stateNode.containerInfo);
        break;
      case 10:
        Vl(t, t.type, t.memoizedProps.value);
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
        Vl(t, tt, e.memoizedState.cache);
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
    else ((nt = !1), Ce && (t.flags & 1048576) !== 0 && If(t, Va, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var n = t.pendingProps;
          if (((e = En(t.elementType)), (t.type = e), typeof e == 'function'))
            tc(e)
              ? ((n = An(e, n)), (t.tag = 1), (t = om(null, t, e, n, l)))
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
        return ((n = t.type), (u = An(n, t.pendingProps)), om(e, t, n, u, l));
      case 3:
        e: {
          if ((ut(t, t.stateNode.containerInfo), e === null)) throw Error(s(387));
          n = t.pendingProps;
          var c = t.memoizedState;
          ((u = c.element), yc(e, t), Pa(t, n, null, l));
          var f = t.memoizedState;
          if (
            ((n = f.cache),
            Vl(t, tt, n),
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
              ((u = $t(Error(s(424)), t)), Ia(u), (t = rm(e, t, n, l)));
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
                  Ce = !0,
                  $l = null,
                  It = !0,
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
            ? (l = Th(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = l)
              : Ce ||
                ((l = t.type),
                (e = t.pendingProps),
                (n = Uu(be.current).createElement(l)),
                (n[ot] = t),
                (n[St] = e),
                mt(n, l, e),
                st(n),
                (t.stateNode = n))
            : (t.memoizedState = Th(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          Y(t),
          e === null &&
            Ce &&
            ((n = t.stateNode = xh(t.type, t.pendingProps, be.current)),
            (rt = t),
            (It = !0),
            (u = $e),
            an(t.type) ? ((Mo = u), ($e = Zt(n.firstChild))) : ($e = u)),
          dt(e, t, t.pendingProps.children, l),
          xu(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            Ce &&
            ((u = n = $e) &&
              ((n = G_(n, t.type, t.pendingProps, It)),
              n !== null
                ? ((t.stateNode = n), (rt = t), ($e = Zt(n.firstChild)), (It = !1), (u = !0))
                : (u = !1)),
            u || Xl(t)),
          Y(t),
          (u = t.type),
          (c = t.pendingProps),
          (f = e !== null ? e.memoizedProps : null),
          (n = c.children),
          To(u, c) ? (n = null) : f !== null && To(u, f) && (t.flags |= 32),
          t.memoizedState !== null && ((u = kc(e, t, l_, null, null, l)), (vi._currentValue = u)),
          xu(e, t),
          dt(e, t, n, l),
          t.child
        );
      case 6:
        return (
          e === null &&
            Ce &&
            ((e = l = $e) &&
              ((l = Y_(l, t.pendingProps, It)),
              l !== null ? ((t.stateNode = l), (rt = t), ($e = null), (e = !0)) : (e = !1)),
            e || Xl(t)),
          null
        );
      case 13:
        return fm(e, t, l);
      case 4:
        return (
          ut(t, t.stateNode.containerInfo),
          (n = t.pendingProps),
          e === null ? (t.child = Nn(t, null, n, l)) : dt(e, t, n, l),
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
        return ((n = t.pendingProps), Vl(t, t.type, n.value), dt(e, t, n.children, l), t.child);
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
              Vl(t, tt, u))
            : ((e.lanes & l) !== 0 && (yc(e, t), Pa(t, null, null, l), Fa()),
              (u = e.memoizedState),
              (c = t.memoizedState),
              u.parent !== n
                ? ((u = { parent: n, cache: n }),
                  (t.memoizedState = u),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u),
                  Vl(t, tt, n))
                : ((n = c.cache), Vl(t, tt, n), n !== u.cache && rc(t, [tt], l, !0))),
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
        else throw ((Tn = su), hc);
    } else e.flags &= -16777217;
  }
  function pm(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !Mh(t)))
      if (Gm()) e.flags |= 8192;
      else throw ((Tn = su), hc);
  }
  function Eu(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? Qr() : 536870912), (e.lanes |= t), (oa |= t)));
  }
  function ii(e, t) {
    if (!Ce)
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
          xl(tt),
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
          ((e = le.current), Jn(t) ? Zf(t) : ((e = xh(u, n, l)), (t.stateNode = e), Nl(t)));
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
          if (((c = le.current), Jn(t))) Zf(t);
          else {
            var f = Uu(be.current);
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
            ((c[ot] = t), (c[St] = n));
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
              e || Xl(t, !0));
          } else ((e = Uu(e).createTextNode(n)), (e[ot] = t), (t.stateNode = e));
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
          if (!e) return t.flags & 256 ? (Dt(t), t) : (Dt(t), null);
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
          if (!u) return t.flags & 256 ? (Dt(t), t) : (Dt(t), null);
        }
        return (
          Dt(t),
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
              Eu(t, t.updateQueue),
              Xe(t),
              null)
        );
      case 4:
        return (Ve(), e === null && bo(t.stateNode.containerInfo), Xe(t), null);
      case 10:
        return (xl(t.type), Xe(t), null);
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
                      Eu(t, e),
                      t.subtreeFlags = 0,
                      e = l,
                      l = t.child;
                    l !== null;
                  )
                    ($f(l, e), (l = l.sibling));
                  return (W(Fe, (Fe.current & 1) | 2), Ce && bl(t, n.treeForkCount), t.child);
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
                Eu(t, e),
                ii(n, !0),
                n.tail === null && n.tailMode === 'hidden' && !c.alternate && !Ce)
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
            Ce && bl(t, n.treeForkCount),
            e)
          : (Xe(t), null);
      case 22:
      case 23:
        return (
          Dt(t),
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
          e !== null && G(kn),
          null
        );
      case 24:
        return (
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          t.memoizedState.cache !== l && (t.flags |= 2048),
          xl(tt),
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
          xl(tt),
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
          if ((Dt(t), t.alternate === null)) throw Error(s(340));
          bn();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((Dt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(s(340));
          bn();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (G(Fe), null);
      case 4:
        return (Ve(), null);
      case 10:
        return (xl(t.type), null);
      case 22:
      case 23:
        return (
          Dt(t),
          bc(),
          e !== null && G(kn),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (xl(tt), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function ym(e, t) {
    switch ((ic(t), t.tag)) {
      case 3:
        (xl(tt), Ve());
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
        t.memoizedState !== null && Dt(t);
        break;
      case 13:
        Dt(t);
        break;
      case 19:
        G(Fe);
        break;
      case 10:
        xl(t.type);
        break;
      case 22:
      case 23:
        (Dt(t), bc(), e !== null && G(kn));
        break;
      case 24:
        xl(tt);
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
  function Wl(e, t, l) {
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
              var k = l,
                D = p;
              try {
                D();
              } catch (U) {
                Be(u, k, U);
              }
            }
          }
          n = n.next;
        } while (n !== c);
      }
    } catch (U) {
      Be(t, t.return, U);
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
    ((l.props = An(e.type, e.memoizedProps)), (l.state = e.memoizedState));
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
  function fl(e, t) {
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
      (z_(n, e.type, l, t), (n[St] = t));
    } catch (u) {
      Be(e, e.return, u);
    }
  }
  function bm(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && an(e.type)) || e.tag === 4
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
        if ((e.tag === 27 && an(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
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
            l != null || t.onclick !== null || (t.onclick = gl)));
    else if (
      n !== 4 &&
      (n === 27 && an(e.type) && ((l = e.stateNode), (t = null)), (e = e.child), e !== null)
    )
      for (eo(e, t, l), e = e.sibling; e !== null; ) (eo(e, t, l), (e = e.sibling));
  }
  function Tu(e, t, l) {
    var n = e.tag;
    if (n === 5 || n === 6) ((e = e.stateNode), t ? l.insertBefore(e, t) : l.appendChild(e));
    else if (n !== 4 && (n === 27 && an(e.type) && (l = e.stateNode), (e = e.child), e !== null))
      for (Tu(e, t, l), e = e.sibling; e !== null; ) (Tu(e, t, l), (e = e.sibling));
  }
  function Sm(e) {
    var t = e.stateNode,
      l = e.memoizedProps;
    try {
      for (var n = e.type, u = t.attributes; u.length; ) t.removeAttributeNode(u[0]);
      (mt(t, n, l), (t[ot] = e), (t[St] = l));
    } catch (c) {
      Be(e, e.return, c);
    }
  }
  var Cl = !1,
    at = !1,
    to = !1,
    xm = typeof WeakSet == 'function' ? WeakSet : Set,
    ct = null;
  function h_(e, t) {
    if (((e = e.containerInfo), (ko = Iu), (e = Df(e)), Zs(e))) {
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
              k = -1,
              D = 0,
              U = 0,
              X = e,
              z = null;
            t: for (;;) {
              for (
                var B;
                X !== l || (u !== 0 && X.nodeType !== 3) || (p = f + u),
                  X !== c || (n !== 0 && X.nodeType !== 3) || (k = f + n),
                  X.nodeType === 3 && (f += X.nodeValue.length),
                  (B = X.firstChild) !== null;
              )
                ((z = X), (X = B));
              for (;;) {
                if (X === e) break t;
                if (
                  (z === l && ++D === u && (p = f),
                  z === c && ++U === n && (k = f),
                  (B = X.nextSibling) !== null)
                )
                  break;
                ((X = z), (z = X.parentNode));
              }
              X = B;
            }
            l = p === -1 || k === -1 ? null : { start: p, end: k };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Eo = { focusedElem: e, selectionRange: l }, Iu = !1, ct = t; ct !== null; )
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
                  var ne = An(l.type, u);
                  ((e = n.getSnapshotBeforeUpdate(ne, c)),
                    (n.__reactInternalSnapshotBeforeUpdate = e));
                } catch (re) {
                  Be(l, l.return, re);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (((e = t.stateNode.containerInfo), (l = e.nodeType), l === 9)) Co(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      Co(e);
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
  function km(e, t, l) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (jl(e, l), n & 4 && ui(5, l));
        break;
      case 1:
        if ((jl(e, l), n & 4))
          if (((e = l.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (f) {
              Be(l, l.return, f);
            }
          else {
            var u = An(l.type, t.memoizedProps);
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
        if ((jl(e, l), n & 64 && ((e = l.updateQueue), e !== null))) {
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
        (jl(e, l), t === null && n & 4 && vm(l), n & 512 && si(l, l.return));
        break;
      case 12:
        jl(e, l);
        break;
      case 31:
        (jl(e, l), n & 4 && Nm(e, l));
        break;
      case 13:
        (jl(e, l),
          n & 4 && Cm(e, l),
          n & 64 &&
            ((e = l.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((l = k_.bind(null, l)), $_(e, l)))));
        break;
      case 22:
        if (((n = l.memoizedState !== null || Cl), !n)) {
          ((t = (t !== null && t.memoizedState !== null) || at), (u = Cl));
          var c = at;
          ((Cl = n),
            (at = t) && !c ? Ml(e, l, (l.subtreeFlags & 8772) !== 0) : jl(e, l),
            (Cl = u),
            (at = c));
        }
        break;
      case 30:
        break;
      default:
        jl(e, l);
    }
  }
  function Em(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), Em(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && ws(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var Ie = null,
    kt = !1;
  function Al(e, t, l) {
    for (l = l.child; l !== null; ) (Tm(e, t, l), (l = l.sibling));
  }
  function Tm(e, t, l) {
    if (jt && typeof jt.onCommitFiberUnmount == 'function')
      try {
        jt.onCommitFiberUnmount(wa, l);
      } catch {}
    switch (l.tag) {
      case 26:
        (at || fl(l, t),
          Al(e, t, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
        break;
      case 27:
        at || fl(l, t);
        var n = Ie,
          u = kt;
        (an(l.type) && ((Ie = l.stateNode), (kt = !1)),
          Al(e, t, l),
          yi(l.stateNode),
          (Ie = n),
          (kt = u));
        break;
      case 5:
        at || fl(l, t);
      case 6:
        if (((n = Ie), (u = kt), (Ie = null), Al(e, t, l), (Ie = n), (kt = u), Ie !== null))
          if (kt)
            try {
              (Ie.nodeType === 9
                ? Ie.body
                : Ie.nodeName === 'HTML'
                  ? Ie.ownerDocument.body
                  : Ie
              ).removeChild(l.stateNode);
            } catch (c) {
              Be(l, t, c);
            }
          else
            try {
              Ie.removeChild(l.stateNode);
            } catch (c) {
              Be(l, t, c);
            }
        break;
      case 18:
        Ie !== null &&
          (kt
            ? ((e = Ie),
              gh(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                l.stateNode
              ),
              ga(e))
            : gh(Ie, l.stateNode));
        break;
      case 4:
        ((n = Ie),
          (u = kt),
          (Ie = l.stateNode.containerInfo),
          (kt = !0),
          Al(e, t, l),
          (Ie = n),
          (kt = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Wl(2, l, t), at || Wl(4, l, t), Al(e, t, l));
        break;
      case 1:
        (at ||
          (fl(l, t), (n = l.stateNode), typeof n.componentWillUnmount == 'function' && _m(l, t, n)),
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
  function Nm(e, t) {
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
  function Cm(e, t) {
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
  function Nu(e, t) {
    var l = p_(e);
    t.forEach(function (n) {
      if (!l.has(n)) {
        l.add(n);
        var u = E_.bind(null, e, n);
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
              if (an(p.type)) {
                ((Ie = p.stateNode), (kt = !1));
                break e;
              }
              break;
            case 5:
              ((Ie = p.stateNode), (kt = !1));
              break e;
            case 3:
            case 4:
              ((Ie = p.stateNode.containerInfo), (kt = !0));
              break e;
          }
          p = p.return;
        }
        if (Ie === null) throw Error(s(160));
        (Tm(c, f, u),
          (Ie = null),
          (kt = !1),
          (c = u.alternate),
          c !== null && (c.return = null),
          (u.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (Am(t, e), (t = t.sibling));
  }
  var tl = null;
  function Am(e, t) {
    var l = e.alternate,
      n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Et(t, e), Tt(e), n & 4 && (Wl(3, e, e.return), ui(3, e), Wl(5, e, e.return)));
        break;
      case 1:
        (Et(t, e),
          Tt(e),
          n & 512 && (at || l === null || fl(l, l.return)),
          n & 64 &&
            Cl &&
            ((e = e.updateQueue),
            e !== null &&
              ((n = e.callbacks),
              n !== null &&
                ((l = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = l === null ? n : l.concat(n))))));
        break;
      case 26:
        var u = tl;
        if ((Et(t, e), Tt(e), n & 512 && (at || l === null || fl(l, l.return)), n & 4)) {
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
                      var f = Ah('link', 'href', u).get(n + (l.href || ''));
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
                      if ((f = Ah('meta', 'content', u).get(n + (l.content || '')))) {
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
            else e.stateNode = Ch(u, n, e.memoizedProps);
          else
            c !== n
              ? (c === null
                  ? l.stateNode !== null && ((l = l.stateNode), l.parentNode.removeChild(l))
                  : c.count--,
                n === null ? jh(u, e.type, e.stateNode) : Ch(u, n, e.memoizedProps))
              : n === null && e.stateNode !== null && Fc(e, e.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        (Et(t, e),
          Tt(e),
          n & 512 && (at || l === null || fl(l, l.return)),
          l !== null && n & 4 && Fc(e, e.memoizedProps, l.memoizedProps));
        break;
      case 5:
        if ((Et(t, e), Tt(e), n & 512 && (at || l === null || fl(l, l.return)), e.flags & 32)) {
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
          (u = tl),
          (tl = Hu(t.containerInfo)),
          Et(t, e),
          (tl = u),
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
        ((n = tl), (tl = Hu(e.stateNode.containerInfo)), Et(t, e), Tt(e), (tl = n));
        break;
      case 12:
        (Et(t, e), Tt(e));
        break;
      case 31:
        (Et(t, e),
          Tt(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Nu(e, n))));
        break;
      case 13:
        (Et(t, e),
          Tt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (l !== null && l.memoizedState !== null) &&
            (Au = At()),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Nu(e, n))));
        break;
      case 22:
        u = e.memoizedState !== null;
        var k = l !== null && l.memoizedState !== null,
          D = Cl,
          U = at;
        if (((Cl = D || u), (at = U || k), Et(t, e), (at = U), (Cl = D), Tt(e), n & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = u ? t._visibility & -2 : t._visibility | 1,
              u && (l === null || k || Cl || at || jn(e)),
              l = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                k = l = t;
                try {
                  if (((c = k.stateNode), u))
                    ((f = c.style),
                      typeof f.setProperty == 'function'
                        ? f.setProperty('display', 'none', 'important')
                        : (f.display = 'none'));
                  else {
                    p = k.stateNode;
                    var X = k.memoizedProps.style,
                      z = X != null && X.hasOwnProperty('display') ? X.display : null;
                    p.style.display = z == null || typeof z == 'boolean' ? '' : ('' + z).trim();
                  }
                } catch (ne) {
                  Be(k, k.return, ne);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                k = t;
                try {
                  k.stateNode.nodeValue = u ? '' : k.memoizedProps;
                } catch (ne) {
                  Be(k, k.return, ne);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                k = t;
                try {
                  var B = k.stateNode;
                  u ? _h(B, !0) : _h(k.stateNode, !1);
                } catch (ne) {
                  Be(k, k.return, ne);
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
        (Et(t, e),
          Tt(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Nu(e, n))));
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
            Tu(e, c, u);
            break;
          case 5:
            var f = l.stateNode;
            l.flags & 32 && (Hn(f, ''), (l.flags &= -33));
            var p = Pc(e);
            Tu(e, p, f);
            break;
          case 3:
          case 4:
            var k = l.stateNode.containerInfo,
              D = Pc(e);
            eo(e, D, k);
            break;
          default:
            throw Error(s(161));
        }
      } catch (U) {
        Be(e, e.return, U);
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
  function jl(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (km(e, t.alternate, t), (t = t.sibling));
  }
  function jn(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Wl(4, t, t.return), jn(t));
          break;
        case 1:
          fl(t, t.return);
          var l = t.stateNode;
          (typeof l.componentWillUnmount == 'function' && _m(t, t.return, l), jn(t));
          break;
        case 27:
          yi(t.stateNode);
        case 26:
        case 5:
          (fl(t, t.return), jn(t));
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
  function Ml(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var n = t.alternate,
        u = e,
        c = t,
        f = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          (Ml(u, c, l), ui(4, c));
          break;
        case 1:
          if ((Ml(u, c, l), (n = c), (u = n.stateNode), typeof u.componentDidMount == 'function'))
            try {
              u.componentDidMount();
            } catch (D) {
              Be(n, n.return, D);
            }
          if (((n = c), (u = n.updateQueue), u !== null)) {
            var p = n.stateNode;
            try {
              var k = u.shared.hiddenCallbacks;
              if (k !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < k.length; u++) ud(k[u], p);
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
          (Ml(u, c, l), l && n === null && f & 4 && vm(c), si(c, c.return));
          break;
        case 12:
          Ml(u, c, l);
          break;
        case 31:
          (Ml(u, c, l), l && f & 4 && Nm(u, c));
          break;
        case 13:
          (Ml(u, c, l), l && f & 4 && Cm(u, c));
          break;
        case 22:
          (c.memoizedState === null && Ml(u, c, l), si(c, c.return));
          break;
        case 30:
          break;
        default:
          Ml(u, c, l);
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
      e !== l && (e != null && e.refCount++, l != null && Qa(l)));
  }
  function no(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && Qa(e)));
  }
  function ll(e, t, l, n) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (Mm(e, t, l, n), (t = t.sibling));
  }
  function Mm(e, t, l, n) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (ll(e, t, l, n), u & 2048 && ui(9, t));
        break;
      case 1:
        ll(e, t, l, n);
        break;
      case 3:
        (ll(e, t, l, n),
          u & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && Qa(e))));
        break;
      case 12:
        if (u & 2048) {
          (ll(e, t, l, n), (e = t.stateNode));
          try {
            var c = t.memoizedProps,
              f = c.id,
              p = c.onPostCommit;
            typeof p == 'function' &&
              p(f, t.alternate === null ? 'mount' : 'update', e.passiveEffectDuration, -0);
          } catch (k) {
            Be(t, t.return, k);
          }
        } else ll(e, t, l, n);
        break;
      case 31:
        ll(e, t, l, n);
        break;
      case 13:
        ll(e, t, l, n);
        break;
      case 23:
        break;
      case 22:
        ((c = t.stateNode),
          (f = t.alternate),
          t.memoizedState !== null
            ? c._visibility & 2
              ? ll(e, t, l, n)
              : ci(e, t)
            : c._visibility & 2
              ? ll(e, t, l, n)
              : ((c._visibility |= 2), ua(e, t, l, n, (t.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && lo(f, t));
        break;
      case 24:
        (ll(e, t, l, n), u & 2048 && no(t.alternate, t));
        break;
      default:
        ll(e, t, l, n);
    }
  }
  function ua(e, t, l, n, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var c = e,
        f = t,
        p = l,
        k = n,
        D = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          (ua(c, f, p, k, u), ui(8, f));
          break;
        case 23:
          break;
        case 22:
          var U = f.stateNode;
          (f.memoizedState !== null
            ? U._visibility & 2
              ? ua(c, f, p, k, u)
              : ci(c, f)
            : ((U._visibility |= 2), ua(c, f, p, k, u)),
            u && D & 2048 && lo(f.alternate, f));
          break;
        case 24:
          (ua(c, f, p, k, u), u && D & 2048 && no(f.alternate, f));
          break;
        default:
          ua(c, f, p, k, u);
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
    if (e.subtreeFlags & oi) for (e = e.child; e !== null; ) (wm(e, t, l), (e = e.sibling));
  }
  function wm(e, t, l) {
    switch (e.tag) {
      case 26:
        (sa(e, t, l),
          e.flags & oi && e.memoizedState !== null && t0(l, tl, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        sa(e, t, l);
        break;
      case 3:
      case 4:
        var n = tl;
        ((tl = Hu(e.stateNode.containerInfo)), sa(e, t, l), (tl = n));
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
  function Rm(e) {
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
      Rm(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (Om(e), (e = e.sibling));
  }
  function Om(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (ri(e), e.flags & 2048 && Wl(9, e, e.return));
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
          ? ((t._visibility &= -3), Cu(e))
          : ri(e);
        break;
      default:
        ri(e);
    }
  }
  function Cu(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var n = t[l];
          ((ct = n), Dm(n, e));
        }
      Rm(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (Wl(8, t, t.return), Cu(t));
          break;
        case 22:
          ((l = t.stateNode), l._visibility & 2 && ((l._visibility &= -3), Cu(t)));
          break;
        default:
          Cu(t);
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
          Wl(8, l, t);
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
          if ((Em(n), n === l)) {
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
    Re = 0,
    Ye = null,
    Se = null,
    Te = 0,
    ze = 0,
    zt = null,
    Fl = !1,
    ca = !1,
    ao = !1,
    wl = 0,
    Je = 0,
    Pl = 0,
    Mn = 0,
    io = 0,
    Bt = 0,
    oa = 0,
    fi = null,
    Nt = null,
    uo = !1,
    Au = 0,
    zm = 0,
    ju = 1 / 0,
    Mu = null,
    en = null,
    it = 0,
    tn = null,
    ra = null,
    Rl = 0,
    so = 0,
    co = null,
    Bm = null,
    di = 0,
    oo = null;
  function Lt() {
    return (Re & 2) !== 0 && Te !== 0 ? Te & -Te : L.T !== null ? yo() : Wr();
  }
  function Lm() {
    if (Bt === 0)
      if ((Te & 536870912) === 0 || Ce) {
        var e = qi;
        ((qi <<= 1), (qi & 3932160) === 0 && (qi = 262144), (Bt = e));
      } else Bt = 536870912;
    return ((e = Ot.current), e !== null && (e.flags |= 32), Bt);
  }
  function Ct(e, t, l) {
    (((e === Ye && (ze === 2 || ze === 9)) || e.cancelPendingCommit !== null) &&
      (fa(e, 0), ln(e, Te, Bt, !1)),
      Oa(e, l),
      ((Re & 2) === 0 || e !== Ye) &&
        (e === Ye && ((Re & 2) === 0 && (Mn |= l), Je === 4 && ln(e, Te, Bt, !1)), dl(e)));
  }
  function qm(e, t, l) {
    if ((Re & 6) !== 0) throw Error(s(327));
    var n = (!l && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Ra(e, t),
      u = n ? b_(e, t) : fo(e, t, !0),
      c = n;
    do {
      if (u === 0) {
        ca && !n && ln(e, t, 0, !1);
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
              var k = p.current.memoizedState.isDehydrated;
              if ((k && (fa(p, f).flags |= 256), (f = fo(p, f, !1)), f !== 2)) {
                if (ao && !k) {
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
          (fa(e, 0), ln(e, t, 0, !0));
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
              ln(n, t, Bt, !Fl);
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
          if ((t & 62914560) === t && ((u = Au + 300 - At()), 10 < u)) {
            if ((ln(n, t, Bt, !Fl), Hi(n, 0, !0) !== 0)) break e;
            ((Rl = t),
              (n.timeoutHandle = ph(
                Um.bind(null, n, l, Nt, Mu, uo, t, Bt, Mn, oa, Fl, c, 'Throttled', -0, 0),
                u
              )));
            break e;
          }
          Um(n, l, Nt, Mu, uo, t, Bt, Mn, oa, Fl, c, null, -0, 0);
        }
      }
      break;
    } while (!0);
    dl(e);
  }
  function Um(e, t, l, n, u, c, f, p, k, D, U, X, z, B) {
    if (((e.timeoutHandle = -1), (X = t.subtreeFlags), X & 8192 || (X & 16785408) === 16785408)) {
      ((X = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: gl,
      }),
        wm(t, c, X));
      var ne = (c & 62914560) === c ? Au - At() : (c & 4194048) === c ? zm - At() : 0;
      if (((ne = l0(X, ne)), ne !== null)) {
        ((Rl = c),
          (e.cancelPendingCommit = ne(Qm.bind(null, e, t, c, l, n, u, f, p, k, U, X, null, z, B))),
          ln(e, c, f, !D));
        return;
      }
    }
    Qm(e, t, c, l, n, u, f, p, k);
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
            if (!wt(c(), u)) return !1;
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
  function ln(e, t, l, n) {
    ((t &= ~io),
      (t &= ~Mn),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      n && (e.warmLanes |= t),
      (n = e.expirationTimes));
    for (var u = t; 0 < u; ) {
      var c = 31 - Mt(u),
        f = 1 << c;
      ((n[c] = -1), (u &= ~f));
    }
    l !== 0 && Zr(e, l, t);
  }
  function wu() {
    return (Re & 6) === 0 ? (mi(0), !1) : !0;
  }
  function ro() {
    if (Se !== null) {
      if (ze === 0) var e = Se.return;
      else ((e = Se), (Sl = Sn = null), Nc(e), (ta = null), (Ka = 0), (e = Se));
      for (; e !== null; ) (ym(e.alternate, e), (e = e.return));
      Se = null;
    }
  }
  function fa(e, t) {
    var l = e.timeoutHandle;
    (l !== -1 && ((e.timeoutHandle = -1), q_(l)),
      (l = e.cancelPendingCommit),
      l !== null && ((e.cancelPendingCommit = null), l()),
      (Rl = 0),
      ro(),
      (Ye = e),
      (Se = l = vl(e.current, null)),
      (Te = t),
      (ze = 0),
      (zt = null),
      (Fl = !1),
      (ca = Ra(e, t)),
      (ao = !1),
      (oa = Bt = io = Mn = Pl = Je = 0),
      (Nt = fi = null),
      (uo = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var u = 31 - Mt(n),
          c = 1 << u;
        ((t |= e[u]), (n &= ~c));
      }
    return ((wl = t), Fi(), l);
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
      (zt = t),
      Se === null && ((Je = 1), bu(e, $t(t, e.current))));
  }
  function Gm() {
    var e = Ot.current;
    return e === null
      ? !0
      : (Te & 4194048) === Te
        ? Qt === null
        : (Te & 62914560) === Te || (Te & 536870912) !== 0
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
  function Ru() {
    ((Je = 4),
      Fl || ((Te & 4194048) !== Te && Ot.current !== null) || (ca = !0),
      ((Pl & 134217727) === 0 && (Mn & 134217727) === 0) || Ye === null || ln(Ye, Te, Bt, !1));
  }
  function fo(e, t, l) {
    var n = Re;
    Re |= 2;
    var u = Ym(),
      c = $m();
    ((Ye !== e || Te !== t) && ((Mu = null), fa(e, t)), (t = !1));
    var f = Je;
    e: do
      try {
        if (ze !== 0 && Se !== null) {
          var p = Se,
            k = zt;
          switch (ze) {
            case 8:
              (ro(), (f = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Ot.current === null && (t = !0);
              var D = ze;
              if (((ze = 0), (zt = null), da(e, p, k, D), l && ca)) {
                f = 0;
                break e;
              }
              break;
            default:
              ((D = ze), (ze = 0), (zt = null), da(e, p, k, D));
          }
        }
        (v_(), (f = Je));
        break;
      } catch (U) {
        Hm(e, U);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (Sl = Sn = null),
      (Re = n),
      (L.H = u),
      (L.A = c),
      Se === null && ((Ye = null), (Te = 0), Fi()),
      f
    );
  }
  function v_() {
    for (; Se !== null; ) Xm(Se);
  }
  function b_(e, t) {
    var l = Re;
    Re |= 2;
    var n = Ym(),
      u = $m();
    Ye !== e || Te !== t ? ((Mu = null), (ju = At() + 500), fa(e, t)) : (ca = Ra(e, t));
    e: do
      try {
        if (ze !== 0 && Se !== null) {
          t = Se;
          var c = zt;
          t: switch (ze) {
            case 1:
              ((ze = 0), (zt = null), da(e, t, c, 1));
              break;
            case 2:
            case 9:
              if (ed(c)) {
                ((ze = 0), (zt = null), Vm(t));
                break;
              }
              ((t = function () {
                ((ze !== 2 && ze !== 9) || Ye !== e || (ze = 7), dl(e));
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
              ed(c) ? ((ze = 0), (zt = null), Vm(t)) : ((ze = 0), (zt = null), da(e, t, c, 7));
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
                    ((ze = 0), (zt = null));
                    var k = p.sibling;
                    if (k !== null) Se = k;
                    else {
                      var D = p.return;
                      D !== null ? ((Se = D), Ou(D)) : (Se = null);
                    }
                    break t;
                  }
              }
              ((ze = 0), (zt = null), da(e, t, c, 5));
              break;
            case 6:
              ((ze = 0), (zt = null), da(e, t, c, 6));
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
      } catch (U) {
        Hm(e, U);
      }
    while (!0);
    return (
      (Sl = Sn = null),
      (L.H = n),
      (L.A = u),
      (Re = l),
      Se !== null ? 0 : ((Ye = null), (Te = 0), Fi(), Je)
    );
  }
  function S_() {
    for (; Se !== null && !Xy(); ) Xm(Se);
  }
  function Xm(e) {
    var t = hm(e.alternate, e, wl);
    ((e.memoizedProps = e.pendingProps), t === null ? Ou(e) : (Se = t));
  }
  function Vm(e) {
    var t = e,
      l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = cm(l, t, t.pendingProps, t.type, void 0, Te);
        break;
      case 11:
        t = cm(l, t, t.pendingProps, t.type.render, t.ref, Te);
        break;
      case 5:
        Nc(t);
      default:
        (ym(l, t), (t = Se = $f(t, wl)), (t = hm(l, t, wl)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? Ou(e) : (Se = t));
  }
  function da(e, t, l, n) {
    ((Sl = Sn = null), Nc(t), (ta = null), (Ka = 0));
    var u = t.return;
    try {
      if (o_(e, u, t, l, Te)) {
        ((Je = 1), bu(e, $t(l, e.current)), (Se = null));
        return;
      }
    } catch (c) {
      if (u !== null) throw ((Se = u), c);
      ((Je = 1), bu(e, $t(l, e.current)), (Se = null));
      return;
    }
    t.flags & 32768
      ? (Ce || n === 1
          ? (e = !0)
          : ca || (Te & 536870912) !== 0
            ? (e = !1)
            : ((Fl = e = !0),
              (n === 2 || n === 9 || n === 3 || n === 6) &&
                ((n = Ot.current), n !== null && n.tag === 13 && (n.flags |= 16384))),
        Im(t, e))
      : Ou(t);
  }
  function Ou(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Im(t, Fl);
        return;
      }
      e = t.return;
      var l = d_(t.alternate, t, wl);
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
  function Im(e, t) {
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
  function Qm(e, t, l, n, u, c, f, p, k) {
    e.cancelPendingCommit = null;
    do Du();
    while (it !== 0);
    if ((Re & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (
        ((c = t.lanes | t.childLanes),
        (c |= Ps),
        eg(e, l, c, f, p, k),
        e === Ye && ((Se = Ye = null), (Te = 0)),
        (ra = t),
        (tn = e),
        (Rl = l),
        (so = c),
        (co = u),
        (Bm = n),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            T_(Bi, function () {
              return (Fm(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (n = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || n)
      ) {
        ((n = L.T), (L.T = null), (u = Z.p), (Z.p = 2), (f = Re), (Re |= 4));
        try {
          h_(e, t, l);
        } finally {
          ((Re = f), (Z.p = u), (L.T = n));
        }
      }
      ((it = 1), Zm(), Km(), Jm());
    }
  }
  function Zm() {
    if (it === 1) {
      it = 0;
      var e = tn,
        t = ra,
        l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        ((l = L.T), (L.T = null));
        var n = Z.p;
        Z.p = 2;
        var u = Re;
        Re |= 4;
        try {
          Am(t, e);
          var c = Eo,
            f = Df(e.containerInfo),
            p = c.focusedElem,
            k = c.selectionRange;
          if (f !== p && p && p.ownerDocument && Of(p.ownerDocument.documentElement, p)) {
            if (k !== null && Zs(p)) {
              var D = k.start,
                U = k.end;
              if ((U === void 0 && (U = D), 'selectionStart' in p))
                ((p.selectionStart = D), (p.selectionEnd = Math.min(U, p.value.length)));
              else {
                var X = p.ownerDocument || document,
                  z = (X && X.defaultView) || window;
                if (z.getSelection) {
                  var B = z.getSelection(),
                    ne = p.textContent.length,
                    re = Math.min(k.start, ne),
                    He = k.end === void 0 ? re : Math.min(k.end, ne);
                  !B.extend && re > He && ((f = He), (He = re), (re = f));
                  var M = Rf(p, re),
                    T = Rf(p, He);
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
          ((Iu = !!ko), (Eo = ko = null));
        } finally {
          ((Re = u), (Z.p = n), (L.T = l));
        }
      }
      ((e.current = t), (it = 2));
    }
  }
  function Km() {
    if (it === 2) {
      it = 0;
      var e = tn,
        t = ra,
        l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        ((l = L.T), (L.T = null));
        var n = Z.p;
        Z.p = 2;
        var u = Re;
        Re |= 4;
        try {
          km(e, t.alternate, t);
        } finally {
          ((Re = u), (Z.p = n), (L.T = l));
        }
      }
      it = 3;
    }
  }
  function Jm() {
    if (it === 4 || it === 3) {
      ((it = 0), Vy());
      var e = tn,
        t = ra,
        l = Rl,
        n = Bm;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (it = 5)
        : ((it = 0), (ra = tn = null), Wm(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (
        (u === 0 && (en = null),
        js(l),
        (t = t.stateNode),
        jt && typeof jt.onCommitFiberRoot == 'function')
      )
        try {
          jt.onCommitFiberRoot(wa, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        ((t = L.T), (u = Z.p), (Z.p = 2), (L.T = null));
        try {
          for (var c = e.onRecoverableError, f = 0; f < n.length; f++) {
            var p = n[f];
            c(p.value, { componentStack: p.stack });
          }
        } finally {
          ((L.T = t), (Z.p = u));
        }
      }
      ((Rl & 3) !== 0 && Du(),
        dl(e),
        (u = e.pendingLanes),
        (l & 261930) !== 0 && (u & 42) !== 0 ? (e === oo ? di++ : ((di = 0), (oo = e))) : (di = 0),
        mi(0));
    }
  }
  function Wm(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), Qa(t)));
  }
  function Du() {
    return (Zm(), Km(), Jm(), Fm());
  }
  function Fm() {
    if (it !== 5) return !1;
    var e = tn,
      t = so;
    so = 0;
    var l = js(Rl),
      n = L.T,
      u = Z.p;
    try {
      ((Z.p = 32 > l ? 32 : l), (L.T = null), (l = co), (co = null));
      var c = tn,
        f = Rl;
      if (((it = 0), (ra = tn = null), (Rl = 0), (Re & 6) !== 0)) throw Error(s(331));
      var p = Re;
      if (
        ((Re |= 4),
        Om(c.current),
        Mm(c, c.current, f, l),
        (Re = p),
        mi(0, !1),
        jt && typeof jt.onPostCommitFiberRoot == 'function')
      )
        try {
          jt.onPostCommitFiberRoot(wa, c);
        } catch {}
      return !0;
    } finally {
      ((Z.p = u), (L.T = n), Wm(e, t));
    }
  }
  function Pm(e, t, l) {
    ((t = $t(l, t)),
      (t = Gc(e.stateNode, t, 2)),
      (e = Zl(e, t, 2)),
      e !== null && (Oa(e, 2), dl(e)));
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
            (typeof n.componentDidCatch == 'function' && (en === null || !en.has(n)))
          ) {
            ((e = $t(l, e)),
              (l = em(2)),
              (n = Zl(t, l, 2)),
              n !== null && (tm(l, n, t, e), Oa(n, 2), dl(n)));
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
        (Te & l) === l &&
        (Je === 4 || (Je === 3 && (Te & 62914560) === Te && 300 > At() - Au)
          ? (Re & 2) === 0 && fa(e, 0)
          : (io |= l),
        oa === Te && (oa = 0)),
      dl(e));
  }
  function eh(e, t) {
    (t === 0 && (t = Qr()), (e = _n(e, t)), e !== null && (Oa(e, t), dl(e)));
  }
  function k_(e) {
    var t = e.memoizedState,
      l = 0;
    (t !== null && (l = t.retryLane), eh(e, l));
  }
  function E_(e, t) {
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
  function T_(e, t) {
    return Ts(e, t);
  }
  var zu = null,
    ma = null,
    ho = !1,
    Bu = !1,
    po = !1,
    nn = 0;
  function dl(e) {
    (e !== ma && e.next === null && (ma === null ? (zu = ma = e) : (ma = ma.next = e)),
      (Bu = !0),
      ho || ((ho = !0), C_()));
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
              ((c = (1 << (31 - Mt(42 | e) + 1)) - 1),
                (c &= u & ~(f & ~p)),
                (c = c & 201326741 ? (c & 201326741) | 1 : c ? c | 2 : 0));
            }
            c !== 0 && ((l = !0), ah(n, c));
          } else
            ((c = Te),
              (c = Hi(
                n,
                n === Ye ? c : 0,
                n.cancelPendingCommit !== null || n.timeoutHandle !== -1
              )),
              (c & 3) === 0 || Ra(n, c) || ((l = !0), ah(n, c)));
          n = n.next;
        }
      while (l);
      po = !1;
    }
  }
  function N_() {
    th();
  }
  function th() {
    Bu = ho = !1;
    var e = 0;
    nn !== 0 && L_() && (e = nn);
    for (var t = At(), l = null, n = zu; n !== null; ) {
      var u = n.next,
        c = lh(n, t);
      (c === 0
        ? ((n.next = null), l === null ? (zu = u) : (l.next = u), u === null && (ma = l))
        : ((l = n), (e !== 0 || (c & 3) !== 0) && (Bu = !0)),
        (n = u));
    }
    ((it !== 0 && it !== 5) || mi(e), nn !== 0 && (nn = 0));
  }
  function lh(e, t) {
    for (
      var l = e.suspendedLanes,
        n = e.pingedLanes,
        u = e.expirationTimes,
        c = e.pendingLanes & -62914561;
      0 < c;
    ) {
      var f = 31 - Mt(c),
        p = 1 << f,
        k = u[f];
      (k === -1
        ? ((p & l) === 0 || (p & n) !== 0) && (u[f] = Py(p, t))
        : k <= t && (e.expiredLanes |= p),
        (c &= ~p));
    }
    if (
      ((t = Ye),
      (l = Te),
      (l = Hi(e, e === t ? l : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (n = e.callbackNode),
      l === 0 || (e === t && (ze === 2 || ze === 9)) || e.cancelPendingCommit !== null)
    )
      return (n !== null && n !== null && Ns(n), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((l & 3) === 0 || Ra(e, l)) {
      if (((t = l & -l), t === e.callbackPriority)) return t;
      switch ((n !== null && Ns(n), js(l))) {
        case 2:
        case 8:
          l = Vr;
          break;
        case 32:
          l = Bi;
          break;
        case 268435456:
          l = Ir;
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
    var n = Te;
    return (
      (n = Hi(e, e === Ye ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      n === 0
        ? null
        : (qm(e, n, t),
          lh(e, At()),
          e.callbackNode != null && e.callbackNode === l ? nh.bind(null, e) : null)
    );
  }
  function ah(e, t) {
    if (Du()) return null;
    qm(e, t, !0);
  }
  function C_() {
    U_(function () {
      (Re & 6) !== 0 ? Ts(Xr, N_) : th();
    });
  }
  function yo() {
    if (nn === 0) {
      var e = Fn;
      (e === 0 && ((e = Li), (Li <<= 1), (Li & 261888) === 0 && (Li = 256)), (nn = e));
    }
    return nn;
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
  function A_(e, t, l, n, u) {
    if (t === 'submit' && l && l.stateNode === u) {
      var c = ih((u[St] || null).action),
        f = n.submitter;
      f &&
        ((t = (t = f[St] || null) ? ih(t.formAction) : f.getAttribute('formAction')),
        t !== null && ((c = t), (f = null)));
      var p = new Zi('action', 'action', null, n, u);
      e.push({
        event: p,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (n.defaultPrevented) {
                if (nn !== 0) {
                  var k = f ? uh(u, f) : new FormData(u);
                  zc(l, { pending: !0, data: k, method: u.method, action: c }, null, k);
                }
              } else
                typeof c == 'function' &&
                  (p.preventDefault(),
                  (k = f ? uh(u, f) : new FormData(u)),
                  zc(l, { pending: !0, data: k, method: u.method, action: c }, c, k));
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
    el(j_, 'on' + M_);
  }
  (el(Lf, 'onAnimationEnd'),
    el(qf, 'onAnimationIteration'),
    el(Uf, 'onAnimationStart'),
    el('dblclick', 'onDoubleClick'),
    el('focusin', 'onFocus'),
    el('focusout', 'onBlur'),
    el(Ig, 'onTransitionRun'),
    el(Qg, 'onTransitionStart'),
    el(Zg, 'onTransitionCancel'),
    el(Hf, 'onTransitionEnd'),
    qn('onMouseEnter', ['mouseout', 'mouseover']),
    qn('onMouseLeave', ['mouseout', 'mouseover']),
    qn('onPointerEnter', ['pointerout', 'pointerover']),
    qn('onPointerLeave', ['pointerout', 'pointerover']),
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
    w_ = new Set(
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
              k = p.instance,
              D = p.currentTarget;
            if (((p = p.listener), k !== c && u.isPropagationStopped())) break e;
            ((c = p), (u.currentTarget = D));
            try {
              c(u);
            } catch (U) {
              Wi(U);
            }
            ((u.currentTarget = null), (c = k));
          }
        else
          for (f = 0; f < n.length; f++) {
            if (
              ((p = n[f]),
              (k = p.instance),
              (D = p.currentTarget),
              (p = p.listener),
              k !== c && u.isPropagationStopped())
            )
              break e;
            ((c = p), (u.currentTarget = D));
            try {
              c(u);
            } catch (U) {
              Wi(U);
            }
            ((u.currentTarget = null), (c = k));
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
          l !== 'selectionchange' && (w_.has(l) || vo(l, !1, e), vo(l, !0, e));
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
      !Us || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (u = !0),
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
              var k = f.tag;
              if ((k === 3 || k === 4) && f.stateNode.containerInfo === u) return;
              f = f.return;
            }
          for (; p !== null; ) {
            if (((f = zn(p)), f === null)) return;
            if (((k = f.tag), k === 5 || k === 6 || k === 26 || k === 27)) {
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
        U = Ls(l),
        X = [];
      e: {
        var z = Gf.get(e);
        if (z !== void 0) {
          var B = Zi,
            ne = e;
          switch (e) {
            case 'keypress':
              if (Ii(l) === 0) break e;
            case 'keydown':
            case 'keyup':
              B = Eg;
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
              B = Cg;
              break;
            case Lf:
            case qf:
            case Uf:
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
              B = wg;
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
          for (var T = D, O; T !== null; ) {
            var $ = T;
            if (
              ((O = $.stateNode),
              ($ = $.tag),
              ($ !== 5 && $ !== 26 && $ !== 27) ||
                O === null ||
                M === null ||
                (($ = Ba(T, M)), $ != null && re.push(pi(T, $, O))),
              He)
            )
              break;
            T = T.return;
          }
          0 < re.length && ((z = new B(z, ne, null, l, U)), X.push({ event: z, listeners: re }));
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
              U.window === U
                ? U
                : (z = U.ownerDocument)
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
              (He = B == null ? z : za(B)),
              (O = ne == null ? z : za(ne)),
              (z = new re($, T + 'leave', B, l, U)),
              (z.target = He),
              (z.relatedTarget = O),
              ($ = null),
              zn(U) === D &&
                ((re = new re(M, T + 'enter', ne, l, U)),
                (re.target = O),
                (re.relatedTarget = He),
                ($ = re)),
              (He = $),
              B && ne)
            )
              t: {
                for (re = R_, M = B, T = ne, O = 0, $ = M; $; $ = re($)) O++;
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
            ((z = D ? za(D) : window),
            (B = z.nodeName && z.nodeName.toLowerCase()),
            B === 'select' || (B === 'input' && z.type === 'file'))
          )
            var je = Nf;
          else if (Ef(z))
            if (Cf) je = $g;
            else {
              je = Gg;
              var ie = Hg;
            }
          else
            ((B = z.nodeName),
              !B || B.toLowerCase() !== 'input' || (z.type !== 'checkbox' && z.type !== 'radio')
                ? D && zs(D.elementType) && (je = Nf)
                : (je = Yg));
          if (je && (je = je(e, D))) {
            Tf(X, je, l, U);
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
            (Ef(ie) || ie.contentEditable === 'true') && ((Xn = ie), (Ks = D), (Xa = null));
            break;
          case 'focusout':
            Xa = Ks = Xn = null;
            break;
          case 'mousedown':
            Js = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((Js = !1), zf(X, l, U));
            break;
          case 'selectionchange':
            if (Vg) break;
          case 'keydown':
          case 'keyup':
            zf(X, l, U);
        }
        var ve;
        if (Vs)
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
            ? xf(e, l) && (Ne = 'onCompositionEnd')
            : e === 'keydown' && l.keyCode === 229 && (Ne = 'onCompositionStart');
        (Ne &&
          (vf &&
            l.locale !== 'ko' &&
            ($n || Ne !== 'onCompositionStart'
              ? Ne === 'onCompositionEnd' && $n && (ve = hf())
              : ((Gl = U), (Hs = 'value' in Gl ? Gl.value : Gl.textContent), ($n = !0))),
          (ie = qu(D, Ne)),
          0 < ie.length &&
            ((Ne = new gf(Ne, e, null, l, U)),
            X.push({ event: Ne, listeners: ie }),
            ve ? (Ne.data = ve) : ((ve = kf(l)), ve !== null && (Ne.data = ve)))),
          (ve = zg ? Bg(e, l) : Lg(e, l)) &&
            ((Ne = qu(D, 'onBeforeInput')),
            0 < Ne.length &&
              ((ie = new gf('onBeforeInput', 'beforeinput', null, l, U)),
              X.push({ event: ie, listeners: Ne }),
              (ie.data = ve))),
          A_(X, e, D, l, U));
      }
      sh(X, t);
    });
  }
  function pi(e, t, l) {
    return { instance: e, listener: t, currentTarget: l };
  }
  function qu(e, t) {
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
  function R_(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function oh(e, t, l, n, u) {
    for (var c = t._reactName, f = []; l !== null && l !== n; ) {
      var p = l,
        k = p.alternate,
        D = p.stateNode;
      if (((p = p.tag), k !== null && k === n)) break;
      ((p !== 5 && p !== 26 && p !== 27) ||
        D === null ||
        ((k = D),
        u
          ? ((D = Ba(l, c)), D != null && f.unshift(pi(l, D, k)))
          : u || ((D = Ba(l, c)), D != null && f.push(pi(l, D, k)))),
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
  function Ue(e, t, l, n, u, c) {
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
              ? (t !== 'input' && Ue(e, t, 'name', u.name, u, null),
                Ue(e, t, 'formEncType', u.formEncType, u, null),
                Ue(e, t, 'formMethod', u.formMethod, u, null),
                Ue(e, t, 'formTarget', u.formTarget, u, null))
              : (Ue(e, t, 'encType', u.encType, u, null),
                Ue(e, t, 'method', u.method, u, null),
                Ue(e, t, 'target', u.target, u, null)));
        if (n == null || typeof n == 'symbol' || typeof n == 'boolean') {
          e.removeAttribute(l);
          break;
        }
        ((n = Xi('' + n)), e.setAttribute(l, n));
        break;
      case 'onClick':
        n != null && (e.onclick = gl);
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
        yl(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', n);
        break;
      case 'xlinkArcrole':
        yl(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', n);
        break;
      case 'xlinkRole':
        yl(e, 'http://www.w3.org/1999/xlink', 'xlink:role', n);
        break;
      case 'xlinkShow':
        yl(e, 'http://www.w3.org/1999/xlink', 'xlink:show', n);
        break;
      case 'xlinkTitle':
        yl(e, 'http://www.w3.org/1999/xlink', 'xlink:title', n);
        break;
      case 'xlinkType':
        yl(e, 'http://www.w3.org/1999/xlink', 'xlink:type', n);
        break;
      case 'xmlBase':
        yl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', n);
        break;
      case 'xmlLang':
        yl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', n);
        break;
      case 'xmlSpace':
        yl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', n);
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
        n != null && (e.onclick = gl);
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
              (c = e[St] || null),
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
                  Ue(e, t, c, f, l, null);
              }
          }
        (u && Ue(e, t, 'srcSet', l.srcSet, l, null), n && Ue(e, t, 'src', l.src, l, null));
        return;
      case 'input':
        xe('invalid', e);
        var p = (c = f = u = null),
          k = null,
          D = null;
        for (n in l)
          if (l.hasOwnProperty(n)) {
            var U = l[n];
            if (U != null)
              switch (n) {
                case 'name':
                  u = U;
                  break;
                case 'type':
                  f = U;
                  break;
                case 'checked':
                  k = U;
                  break;
                case 'defaultChecked':
                  D = U;
                  break;
                case 'value':
                  c = U;
                  break;
                case 'defaultValue':
                  p = U;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (U != null) throw Error(s(137, t));
                  break;
                default:
                  Ue(e, t, n, U, l, null);
              }
          }
        sf(e, c, p, k, D, f, u, !1);
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
                Ue(e, t, u, p, l, null);
            }
        ((t = c),
          (l = f),
          (e.multiple = !!n),
          t != null ? Un(e, !!n, t, !1) : l != null && Un(e, !!n, l, !0));
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
                Ue(e, t, f, p, l, null);
            }
        of(e, n, u, c);
        return;
      case 'option':
        for (k in l)
          if (l.hasOwnProperty(k) && ((n = l[k]), n != null))
            switch (k) {
              case 'selected':
                e.selected = n && typeof n != 'function' && typeof n != 'symbol';
                break;
              default:
                Ue(e, t, k, n, l, null);
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
                Ue(e, t, D, n, l, null);
            }
        return;
      default:
        if (zs(t)) {
          for (U in l)
            l.hasOwnProperty(U) && ((n = l[U]), n !== void 0 && xo(e, t, U, n, l, void 0));
          return;
        }
    }
    for (p in l) l.hasOwnProperty(p) && ((n = l[p]), n != null && Ue(e, t, p, n, l, null));
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
          k = null,
          D = null,
          U = null;
        for (B in l) {
          var X = l[B];
          if (l.hasOwnProperty(B) && X != null)
            switch (B) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                k = X;
              default:
                n.hasOwnProperty(B) || Ue(e, t, B, null, n, X);
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
                U = B;
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
                B !== X && Ue(e, t, z, B, n, X);
            }
        }
        Os(e, f, p, k, D, U, c, u);
        return;
      case 'select':
        B = f = p = z = null;
        for (c in l)
          if (((k = l[c]), l.hasOwnProperty(c) && k != null))
            switch (c) {
              case 'value':
                break;
              case 'multiple':
                B = k;
              default:
                n.hasOwnProperty(c) || Ue(e, t, c, null, n, k);
            }
        for (u in n)
          if (((c = n[u]), (k = l[u]), n.hasOwnProperty(u) && (c != null || k != null)))
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
                c !== k && Ue(e, t, u, c, n, k);
            }
        ((t = p),
          (l = f),
          (n = B),
          z != null
            ? Un(e, !!l, z, !1)
            : !!n != !!l && (t != null ? Un(e, !!l, t, !0) : Un(e, !!l, l ? [] : '', !1)));
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
                Ue(e, t, p, null, n, u);
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
                u !== c && Ue(e, t, f, u, n, c);
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
                Ue(e, t, ne, null, n, z);
            }
        for (k in n)
          if (((z = n[k]), (B = l[k]), n.hasOwnProperty(k) && z !== B && (z != null || B != null)))
            switch (k) {
              case 'selected':
                e.selected = z && typeof z != 'function' && typeof z != 'symbol';
                break;
              default:
                Ue(e, t, k, z, n, B);
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
            l.hasOwnProperty(re) && z != null && !n.hasOwnProperty(re) && Ue(e, t, re, null, n, z));
        for (D in n)
          if (((z = n[D]), (B = l[D]), n.hasOwnProperty(D) && z !== B && (z != null || B != null)))
            switch (D) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (z != null) throw Error(s(137, t));
                break;
              default:
                Ue(e, t, D, z, n, B);
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
          for (U in n)
            ((z = n[U]),
              (B = l[U]),
              !n.hasOwnProperty(U) ||
                z === B ||
                (z === void 0 && B === void 0) ||
                xo(e, t, U, z, n, B));
          return;
        }
    }
    for (var M in l)
      ((z = l[M]),
        l.hasOwnProperty(M) && z != null && !n.hasOwnProperty(M) && Ue(e, t, M, null, n, z));
    for (X in n)
      ((z = n[X]),
        (B = l[X]),
        !n.hasOwnProperty(X) || z === B || (z == null && B == null) || Ue(e, t, X, z, n, B));
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
            var k = l[n],
              D = k.startTime;
            if (D > p) break;
            var U = k.transferSize,
              X = k.initiatorType;
            U && dh(X) && ((k = k.responseEnd), (f += U * (k < p ? 1 : (p - D) / (k - D))));
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
  var ko = null,
    Eo = null;
  function Uu(e) {
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
  function L_() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === No ? !1 : ((No = e), !0)) : ((No = null), !1);
  }
  var ph = typeof setTimeout == 'function' ? setTimeout : void 0,
    q_ = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    yh = typeof Promise == 'function' ? Promise : void 0,
    U_ =
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
  function an(e) {
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
  function Co(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (((t = t.nextSibling), l.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (Co(l), ws(l));
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
  function Ao(e) {
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
    switch (((t = Uu(l)), e)) {
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
    ws(e);
  }
  var Kt = new Map(),
    kh = new Set();
  function Hu(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var Ol = Z.d;
  Z.d = { f: X_, r: V_, D: I_, C: Q_, L: Z_, m: K_, X: W_, S: J_, M: F_ };
  function X_() {
    var e = Ol.f(),
      t = wu();
    return e || t;
  }
  function V_(e) {
    var t = Bn(e);
    t !== null && t.tag === 5 && t.type === 'form' ? Hd(t) : Ol.r(e);
  }
  var ha = typeof document > 'u' ? null : document;
  function Eh(e, t, l) {
    var n = ha;
    if (n && typeof t == 'string' && t) {
      var u = Gt(t);
      ((u = 'link[rel="' + e + '"][href="' + u + '"]'),
        typeof l == 'string' && (u += '[crossorigin="' + l + '"]'),
        kh.has(u) ||
          (kh.add(u),
          (e = { rel: e, crossOrigin: l, href: t }),
          n.querySelector(u) === null &&
            ((t = n.createElement('link')), mt(t, 'link', e), st(t), n.head.appendChild(t))));
    }
  }
  function I_(e) {
    (Ol.D(e), Eh('dns-prefetch', e, null));
  }
  function Q_(e, t) {
    (Ol.C(e, t), Eh('preconnect', e, t));
  }
  function Z_(e, t, l) {
    Ol.L(e, t, l);
    var n = ha;
    if (n && e && t) {
      var u = 'link[rel="preload"][as="' + Gt(t) + '"]';
      t === 'image' && l && l.imageSrcSet
        ? ((u += '[imagesrcset="' + Gt(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == 'string' && (u += '[imagesizes="' + Gt(l.imageSizes) + '"]'))
        : (u += '[href="' + Gt(e) + '"]');
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
  function K_(e, t) {
    Ol.m(e, t);
    var l = ha;
    if (l && e) {
      var n = t && typeof t.as == 'string' ? t.as : 'script',
        u = 'link[rel="modulepreload"][as="' + Gt(n) + '"][href="' + Gt(e) + '"]',
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
    Ol.S(e, t, l);
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
            (l = Kt.get(c)) && wo(e, l));
          var k = (f = n.createElement('link'));
          (st(k),
            mt(k, 'link', e),
            (k._p = new Promise(function (D, U) {
              ((k.onload = D), (k.onerror = U));
            })),
            k.addEventListener('load', function () {
              p.loading |= 1;
            }),
            k.addEventListener('error', function () {
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
    Ol.X(e, t);
    var l = ha;
    if (l && e) {
      var n = Ln(l).hoistableScripts,
        u = ya(e),
        c = n.get(u);
      c ||
        ((c = l.querySelector(_i(u))),
        c ||
          ((e = b({ src: e, async: !0 }, t)),
          (t = Kt.get(u)) && Ro(e, t),
          (c = l.createElement('script')),
          st(c),
          mt(c, 'link', e),
          l.head.appendChild(c)),
        (c = { type: 'script', instance: c, count: 1, state: null }),
        n.set(u, c));
    }
  }
  function F_(e, t) {
    Ol.M(e, t);
    var l = ha;
    if (l && e) {
      var n = Ln(l).hoistableScripts,
        u = ya(e),
        c = n.get(u);
      c ||
        ((c = l.querySelector(_i(u))),
        c ||
          ((e = b({ src: e, async: !0, type: 'module' }, t)),
          (t = Kt.get(u)) && Ro(e, t),
          (c = l.createElement('script')),
          st(c),
          mt(c, 'link', e),
          l.head.appendChild(c)),
        (c = { type: 'script', instance: c, count: 1, state: null }),
        n.set(u, c));
    }
  }
  function Th(e, t, l, n) {
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
    return 'href="' + Gt(e) + '"';
  }
  function gi(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function Nh(e) {
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
    return '[src="' + Gt(e) + '"]';
  }
  function _i(e) {
    return 'script[async]' + e;
  }
  function Ch(e, t, l) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var n = e.querySelector('style[data-href~="' + Gt(l.href) + '"]');
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
          ((n = Nh(l)),
            (u = Kt.get(u)) && wo(n, u),
            (c = (e.ownerDocument || e).createElement('link')),
            st(c));
          var f = c;
          return (
            (f._p = new Promise(function (p, k) {
              ((f.onload = p), (f.onerror = k));
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
                (u = Kt.get(c)) && ((n = b({}, l)), Ro(n, u)),
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
  function wo(e, t) {
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
  function Ah(e, t, l) {
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
          (n = Nh(n)),
          (u = Kt.get(u)) && wo(n, u),
          (c = c.createElement('link')),
          st(c));
        var f = c;
        ((f._p = new Promise(function (p, k) {
          ((f.onload = p), (f.onerror = k));
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
    $$typeof: I,
    Provider: null,
    Consumer: null,
    _currentValue: te,
    _currentValue2: te,
    _threadCount: 0,
  };
  function a0(e, t, l, n, u, c, f, p, k) {
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
      (this.expirationTimes = Cs(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Cs(0)),
      (this.hiddenUpdates = Cs(null)),
      (this.identifierPrefix = n),
      (this.onUncaughtError = u),
      (this.onCaughtError = c),
      (this.onRecoverableError = f),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = k),
      (this.incompleteTransitions = new Map()));
  }
  function wh(e, t, l, n, u, c, f, p, k, D, U, X) {
    return (
      (e = new a0(e, t, l, f, k, D, U, X, p)),
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
  function Rh(e) {
    return e ? ((e = Qn), e) : Qn;
  }
  function Oh(e, t, l, n, u, c) {
    ((u = Rh(u)),
      n.context === null ? (n.context = u) : (n.pendingContext = u),
      (n = Ql(t)),
      (n.payload = { element: l }),
      (c = c === void 0 ? null : c),
      c !== null && (n.callback = c),
      (l = Zl(e, n, t)),
      l !== null && (Ct(l, e, t), Wa(l, e, t)));
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
      (t !== null && Ct(t, e, 67108864), Do(e, 67108864));
    }
  }
  function Bh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Lt();
      t = As(t);
      var l = _n(e, t);
      (l !== null && Ct(l, e, t), Do(e, t));
    }
  }
  var Iu = !0;
  function i0(e, t, l, n) {
    var u = L.T;
    L.T = null;
    var c = Z.p;
    try {
      ((Z.p = 2), zo(e, t, l, n));
    } finally {
      ((Z.p = c), (L.T = u));
    }
  }
  function u0(e, t, l, n) {
    var u = L.T;
    L.T = null;
    var c = Z.p;
    try {
      ((Z.p = 8), zo(e, t, l, n));
    } finally {
      ((Z.p = c), (L.T = u));
    }
  }
  function zo(e, t, l, n) {
    if (Iu) {
      var u = Bo(n);
      if (u === null) (So(e, t, n, Qu, l), qh(e, n));
      else if (c0(u, e, t, l, n)) n.stopPropagation();
      else if ((qh(e, n), t & 4 && -1 < s0.indexOf(e))) {
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
                      var k = 1 << (31 - Mt(f));
                      ((p.entanglements[1] |= k), (f &= ~k));
                    }
                    (dl(c), (Re & 6) === 0 && ((ju = At() + 500), mi(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((p = _n(c, 2)), p !== null && Ct(p, c, 2), wu(), Do(c, 2));
            }
          if (((c = Bo(n)), c === null && So(e, t, n, Qu, l), c === u)) break;
          u = c;
        }
        u !== null && n.stopPropagation();
      } else So(e, t, n, null, l);
    }
  }
  function Bo(e) {
    return ((e = Ls(e)), Lo(e));
  }
  var Qu = null;
  function Lo(e) {
    if (((Qu = null), (e = zn(e)), e !== null)) {
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
    return ((Qu = e), null);
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
        switch (Iy()) {
          case Xr:
            return 2;
          case Vr:
            return 8;
          case Bi:
          case Qy:
            return 32;
          case Ir:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var qo = !1,
    un = null,
    sn = null,
    cn = null,
    bi = new Map(),
    Si = new Map(),
    on = [],
    s0 =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function qh(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        un = null;
        break;
      case 'dragenter':
      case 'dragleave':
        sn = null;
        break;
      case 'mouseover':
      case 'mouseout':
        cn = null;
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
        return ((un = xi(un, e, t, l, n, u)), !0);
      case 'dragenter':
        return ((sn = xi(sn, e, t, l, n, u)), !0);
      case 'mouseover':
        return ((cn = xi(cn, e, t, l, n, u)), !0);
      case 'pointerover':
        var c = u.pointerId;
        return (bi.set(c, xi(bi.get(c) || null, e, t, l, n, u)), !0);
      case 'gotpointercapture':
        return ((c = u.pointerId), Si.set(c, xi(Si.get(c) || null, e, t, l, n, u)), !0);
    }
    return !1;
  }
  function Uh(e) {
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
  function Zu(e) {
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
    Zu(e) && l.delete(t);
  }
  function o0() {
    ((qo = !1),
      un !== null && Zu(un) && (un = null),
      sn !== null && Zu(sn) && (sn = null),
      cn !== null && Zu(cn) && (cn = null),
      bi.forEach(Hh),
      Si.forEach(Hh));
  }
  function Ku(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      qo || ((qo = !0), a.unstable_scheduleCallback(a.unstable_NormalPriority, o0)));
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
    function t(k) {
      return Ku(k, e);
    }
    (un !== null && Ku(un, e),
      sn !== null && Ku(sn, e),
      cn !== null && Ku(cn, e),
      bi.forEach(t),
      Si.forEach(t));
    for (var l = 0; l < on.length; l++) {
      var n = on[l];
      n.blockedOn === e && (n.blockedOn = null);
    }
    for (; 0 < on.length && ((l = on[0]), l.blockedOn === null); )
      (Uh(l), l.blockedOn === null && on.shift());
    if (((l = (e.ownerDocument || e).$$reactFormReplay), l != null))
      for (n = 0; n < l.length; n += 3) {
        var u = l[n],
          c = l[n + 1],
          f = u[St] || null;
        if (typeof c == 'function') f || Gh(l);
        else if (f) {
          var p = null;
          if (c && c.hasAttribute('formAction')) {
            if (((u = c), (f = c[St] || null))) p = f.formAction;
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
  function Uo(e) {
    this._internalRoot = e;
  }
  ((Wu.prototype.render = Uo.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(s(409));
      var l = t.current,
        n = Lt();
      Oh(l, n, e, t, null, null);
    }),
    (Wu.prototype.unmount = Uo.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (Oh(e.current, 2, null, e, null, null), wu(), (t[Dn] = null));
        }
      }));
  function Wu(e) {
    this._internalRoot = e;
  }
  Wu.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Wr();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < on.length && t !== 0 && t < on[l].priority; l++);
      (on.splice(l, 0, e), l === 0 && Uh(e));
    }
  };
  var $h = i.version;
  if ($h !== '19.2.5') throw Error(s(527, $h, '19.2.5'));
  Z.findDOMNode = function (e) {
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
        ((wa = Fu.inject(r0)), (jt = Fu));
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
        (t = wh(e, 1, !1, null, null, l, n, null, u, c, f, Yh)),
        (e[Dn] = t.current),
        bo(e),
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
        k = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (n = !0),
          l.identifierPrefix !== void 0 && (u = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (c = l.onUncaughtError),
          l.onCaughtError !== void 0 && (f = l.onCaughtError),
          l.onRecoverableError !== void 0 && (p = l.onRecoverableError),
          l.formState !== void 0 && (k = l.formState)),
        (t = wh(e, 1, !0, t, l ?? null, n, u, k, c, f, p, Yh)),
        (t.context = Rh(null)),
        (l = t.current),
        (n = Lt()),
        (n = As(n)),
        (u = Ql(n)),
        (u.callback = null),
        Zl(l, u, n),
        (l = n),
        (t.current.lanes = l),
        Oa(t, l),
        dl(t),
        (e[Dn] = t.current),
        bo(e),
        new Wu(t)
      );
    }),
    (Ei.version = '19.2.5'),
    Ei
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
var k0 = x0(),
  E = vr();
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
function E0(a = {}) {
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
  return N0(i, o, null, a);
}
function Qe(a, i) {
  if (a === !1 || a === null || typeof a > 'u') throw new Error(i);
}
function il(a, i) {
  if (!a) {
    typeof console < 'u' && console.warn(i);
    try {
      throw new Error(i);
    } catch {}
  }
}
function T0() {
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
    ...(typeof i == 'string' ? Na(i) : i),
    state: o,
    key: (i && i.key) || s || T0(),
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
function N0(a, i, o, s = {}) {
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
      C = j == null ? null : j - y;
    ((y = j), g && g({ action: v, location: R.location, delta: C }));
  }
  function x(j, C) {
    v = 'PUSH';
    let N = tp(j) ? j : sr(R.location, j, C);
    y = _() + 1;
    let I = lp(N, y),
      P = R.createHref(N.unstable_mask || N);
    try {
      h.pushState(I, '', P);
    } catch (ee) {
      if (ee instanceof DOMException && ee.name === 'DataCloneError') throw ee;
      r.location.assign(P);
    }
    d && g && g({ action: v, location: R.location, delta: 1 });
  }
  function w(j, C) {
    v = 'REPLACE';
    let N = tp(j) ? j : sr(R.location, j, C);
    y = _();
    let I = lp(N, y),
      P = R.createHref(N.unstable_mask || N);
    (h.replaceState(I, '', P), d && g && g({ action: v, location: R.location, delta: 0 }));
  }
  function S(j) {
    return C0(j);
  }
  let R = {
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
      let C = S(j);
      return { pathname: C.pathname, search: C.search, hash: C.hash };
    },
    push: x,
    replace: w,
    go(j) {
      return h.go(j);
    },
  };
  return R;
}
function C0(a, i = !1) {
  let o = 'http://localhost';
  (typeof window < 'u' &&
    (o = window.location.origin !== 'null' ? window.location.origin : window.location.href),
    Qe(o, 'No window.location.(origin|href) available to create URL'));
  let s = typeof a == 'string' ? a : Mi(a);
  return ((s = s.replace(/ $/, '%20')), !i && s.startsWith('//') && (s = o + s), new URL(s, o));
}
function Mp(a, i, o = '/') {
  return A0(a, i, o, !1);
}
function A0(a, i, o, s) {
  let r = typeof i == 'string' ? Na(i) : i,
    d = Bl(r.pathname || '/', o);
  if (d == null) return null;
  let h = wp(a);
  j0(h);
  let v = null;
  for (let g = 0; v == null && g < h.length; ++g) {
    let y = H0(d);
    v = q0(h[g], y, s);
  }
  return v;
}
function wp(a, i = [], o = [], s = '', r = !1) {
  let d = (h, v, g = r, y) => {
    let _ = {
      relativePath: y === void 0 ? h.path || '' : y,
      caseSensitive: h.caseSensitive === !0,
      childrenIndex: v,
      route: h,
    };
    if (_.relativePath.startsWith('/')) {
      if (!_.relativePath.startsWith(s) && g) return;
      (Qe(
        _.relativePath.startsWith(s),
        `Absolute route path "${_.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (_.relativePath = _.relativePath.slice(s.length)));
    }
    let b = al([s, _.relativePath]),
      x = o.concat(_);
    (h.children &&
      h.children.length > 0 &&
      (Qe(
        h.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${b}".`
      ),
      wp(h.children, i, x, b, g)),
      !(h.path == null && !h.index) && i.push({ path: b, score: B0(b, h.index), routesMeta: x }));
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
  w0 = 3,
  R0 = 2,
  O0 = 1,
  D0 = 10,
  z0 = -2,
  np = (a) => a === '*';
function B0(a, i) {
  let o = a.split('/'),
    s = o.length;
  return (
    o.some(np) && (s += z0),
    i && (s += R0),
    o.filter((r) => !np(r)).reduce((r, d) => r + (M0.test(d) ? w0 : d === '' ? O0 : D0), s)
  );
}
function L0(a, i) {
  return a.length === i.length && a.slice(0, -1).every((s, r) => s === i[r])
    ? a[a.length - 1] - i[i.length - 1]
    : 0;
}
function q0(a, i, o = !1) {
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
        pathname: al([d, b.pathname]),
        pathnameBase: X0(al([d, b.pathnameBase])),
        route: x,
      }),
      b.pathnameBase !== '/' && (d = al([d, b.pathnameBase])));
  }
  return h;
}
function ss(a, i) {
  typeof a == 'string' && (a = { path: a, caseSensitive: !1, end: !0 });
  let [o, s] = U0(a.path, a.caseSensitive, a.end),
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
      const w = v[x];
      return (b && !w ? (y[_] = void 0) : (y[_] = (w || '').replace(/%2F/g, '/')), y);
    }, {}),
    pathname: d,
    pathnameBase: h,
    pattern: a,
  };
}
function U0(a, i = !1, o = !0) {
  il(
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
      il(
        !1,
        `The URL path "${a}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${i}).`
      ),
      a
    );
  }
}
function Bl(a, i) {
  if (i === '/') return a;
  if (!a.toLowerCase().startsWith(i.toLowerCase())) return null;
  let o = i.endsWith('/') ? i.length - 1 : i.length,
    s = a.charAt(o);
  return s && s !== '/' ? null : a.slice(o) || '/';
}
var G0 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function Y0(a, i = '/') {
  let { pathname: o, search: s = '', hash: r = '' } = typeof a == 'string' ? Na(a) : a,
    d;
  return (
    o ? ((o = Op(o)), o.startsWith('/') ? (d = ap(o.substring(1), '/')) : (d = ap(o, i))) : (d = i),
    { pathname: d, search: V0(s), hash: I0(r) }
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
    ? (r = Na(a))
    : ((r = { ...a }),
      Qe(!r.pathname || !r.pathname.includes('?'), Qo('?', 'pathname', 'search', r)),
      Qe(!r.pathname || !r.pathname.includes('#'), Qo('#', 'pathname', 'hash', r)),
      Qe(!r.search || !r.search.includes('#'), Qo('#', 'search', 'hash', r)));
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
  al = (a) => Op(a.join('/')),
  cs = (a) => a.replace(/\/+$/, ''),
  X0 = (a) => cs(a).replace(/^\/*/, '/'),
  V0 = (a) => (!a || a === '?' ? '' : a.startsWith('?') ? a : '?' + a),
  I0 = (a) => (!a || a === '#' ? '' : a.startsWith('#') ? a : '#' + a),
  Q0 = class {
    constructor(a, i, o, s = !1) {
      ((this.status = a),
        (this.statusText = i || ''),
        (this.internal = s),
        o instanceof Error ? ((this.data = o.toString()), (this.error = o)) : (this.data = o));
    }
  };
function Z0(a) {
  return (
    a != null &&
    typeof a.status == 'number' &&
    typeof a.statusText == 'string' &&
    typeof a.internal == 'boolean' &&
    'data' in a
  );
}
function K0(a) {
  let i = a.map((o) => o.route.path).filter(Boolean);
  return al(i) || '/';
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
        v = Bl(h.pathname, i);
      h.origin === d.origin && v != null ? (o = v + h.search + h.hash) : (r = !0);
    } catch {
      il(
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
var Ca = E.createContext(null);
Ca.displayName = 'DataRouter';
var ys = E.createContext(null);
ys.displayName = 'DataRouterState';
var Lp = E.createContext(!1);
function W0() {
  return E.useContext(Lp);
}
var qp = E.createContext({ isTransitioning: !1 });
qp.displayName = 'ViewTransition';
var F0 = E.createContext(new Map());
F0.displayName = 'Fetchers';
var P0 = E.createContext(null);
P0.displayName = 'Await';
var Ut = E.createContext(null);
Ut.displayName = 'Navigation';
var Oi = E.createContext(null);
Oi.displayName = 'Location';
var sl = E.createContext({ outlet: null, matches: [], isDataRoute: !1 });
sl.displayName = 'Route';
var Sr = E.createContext(null);
Sr.displayName = 'RouteError';
var Up = 'REACT_ROUTER_ERROR',
  ev = 'REDIRECT',
  tv = 'ROUTE_ERROR_RESPONSE';
function lv(a) {
  if (a.startsWith(`${Up}:${ev}:{`))
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
  if (a.startsWith(`${Up}:${tv}:{`))
    try {
      let i = JSON.parse(a.slice(40));
      if (
        typeof i == 'object' &&
        i &&
        typeof i.status == 'number' &&
        typeof i.statusText == 'string'
      )
        return new Q0(i.status, i.statusText, i.data);
    } catch {}
}
function av(a, { relative: i } = {}) {
  Qe(Aa(), 'useHref() may be used only in the context of a <Router> component.');
  let { basename: o, navigator: s } = E.useContext(Ut),
    { hash: r, pathname: d, search: h } = Di(a, { relative: i }),
    v = d;
  return (
    o !== '/' && (v = d === '/' ? o : al([o, d])),
    s.createHref({ pathname: v, search: h, hash: r })
  );
}
function Aa() {
  return E.useContext(Oi) != null;
}
function pl() {
  return (
    Qe(Aa(), 'useLocation() may be used only in the context of a <Router> component.'),
    E.useContext(Oi).location
  );
}
var Hp =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function Gp(a) {
  E.useContext(Ut).static || E.useLayoutEffect(a);
}
function cl() {
  let { isDataRoute: a } = E.useContext(sl);
  return a ? _v() : iv();
}
function iv() {
  Qe(Aa(), 'useNavigate() may be used only in the context of a <Router> component.');
  let a = E.useContext(Ca),
    { basename: i, navigator: o } = E.useContext(Ut),
    { matches: s } = E.useContext(sl),
    { pathname: r } = pl(),
    d = JSON.stringify(br(s)),
    h = E.useRef(!1);
  return (
    Gp(() => {
      h.current = !0;
    }),
    E.useCallback(
      (g, y = {}) => {
        if ((il(h.current, Hp), !h.current)) return;
        if (typeof g == 'number') {
          o.go(g);
          return;
        }
        let _ = ps(g, JSON.parse(d), r, y.relative === 'path');
        (a == null && i !== '/' && (_.pathname = _.pathname === '/' ? i : al([i, _.pathname])),
          (y.replace ? o.replace : o.push)(_, y.state, y));
      },
      [i, o, d, r, a]
    )
  );
}
E.createContext(null);
function uv() {
  let { matches: a } = E.useContext(sl),
    i = a[a.length - 1];
  return (i == null ? void 0 : i.params) ?? {};
}
function Di(a, { relative: i } = {}) {
  let { matches: o } = E.useContext(sl),
    { pathname: s } = pl(),
    r = JSON.stringify(br(o));
  return E.useMemo(() => ps(a, JSON.parse(r), s, i === 'path'), [a, r, s, i]);
}
function sv(a, i) {
  return Yp(a, i);
}
function Yp(a, i, o) {
  var j;
  Qe(Aa(), 'useRoutes() may be used only in the context of a <Router> component.');
  let { navigator: s } = E.useContext(Ut),
    { matches: r } = E.useContext(sl),
    d = r[r.length - 1],
    h = d ? d.params : {},
    v = d ? d.pathname : '/',
    g = d ? d.pathnameBase : '/',
    y = d && d.route;
  {
    let C = (y && y.path) || '';
    Xp(
      v,
      !y || C.endsWith('*') || C.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${v}" (under <Route path="${C}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${C}"> to <Route path="${C === '/' ? '*' : `${C}/*`}">.`
    );
  }
  let _ = pl(),
    b;
  if (i) {
    let C = typeof i == 'string' ? Na(i) : i;
    (Qe(
      g === '/' || ((j = C.pathname) == null ? void 0 : j.startsWith(g)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${g}" but pathname "${C.pathname}" was given in the \`location\` prop.`
    ),
      (b = C));
  } else b = _;
  let x = b.pathname || '/',
    w = x;
  if (g !== '/') {
    let C = g.replace(/^\//, '').split('/');
    w = '/' + x.replace(/^\//, '').split('/').slice(C.length).join('/');
  }
  let S = Mp(a, { pathname: w });
  (il(y || S != null, `No routes matched location "${b.pathname}${b.search}${b.hash}" `),
    il(
      S == null ||
        S[S.length - 1].route.element !== void 0 ||
        S[S.length - 1].route.Component !== void 0 ||
        S[S.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${b.pathname}${b.search}${b.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let R = dv(
    S &&
      S.map((C) =>
        Object.assign({}, C, {
          params: Object.assign({}, h, C.params),
          pathname: al([
            g,
            s.encodeLocation
              ? s.encodeLocation(
                  C.pathname.replace(/%/g, '%25').replace(/\?/g, '%3F').replace(/#/g, '%23')
                ).pathname
              : C.pathname,
          ]),
          pathnameBase:
            C.pathnameBase === '/'
              ? g
              : al([
                  g,
                  s.encodeLocation
                    ? s.encodeLocation(
                        C.pathnameBase
                          .replace(/%/g, '%25')
                          .replace(/\?/g, '%3F')
                          .replace(/#/g, '%23')
                      ).pathname
                    : C.pathnameBase,
                ]),
        })
      ),
    r,
    o
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
function cv() {
  let a = gv(),
    i = Z0(a) ? `${a.status} ${a.statusText}` : a instanceof Error ? a.message : JSON.stringify(a),
    o = a instanceof Error ? a.stack : null,
    s = 'rgba(200,200,200, 0.5)',
    r = { padding: '0.5rem', backgroundColor: s },
    d = { padding: '2px 4px', backgroundColor: s },
    h = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', a),
    (h = E.createElement(
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
      o ? E.createElement('pre', { style: r }, o) : null,
      h
    )
  );
}
var ov = E.createElement(cv, null),
  $p = class extends E.Component {
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
          ? E.createElement(
              sl.Provider,
              { value: this.props.routeContext },
              E.createElement(Sr.Provider, { value: a, children: this.props.component })
            )
          : this.props.children;
      return this.context ? E.createElement(rv, { error: a }, i) : i;
    }
  };
$p.contextType = Lp;
var Zo = new WeakMap();
function rv({ children: a, error: i }) {
  let { basename: o } = E.useContext(Ut);
  if (typeof i == 'object' && i && 'digest' in i && typeof i.digest == 'string') {
    let s = lv(i.digest);
    if (s) {
      let r = Zo.get(i);
      if (r) throw r;
      let d = zp(s.location, o);
      if (Dp && !Zo.get(i))
        if (d.isExternal || s.reloadDocument) window.location.href = d.absoluteURL || d.to;
        else {
          const h = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(d.to, { replace: s.replace })
          );
          throw (Zo.set(i, h), h);
        }
      return E.createElement('meta', {
        httpEquiv: 'refresh',
        content: `0;url=${d.absoluteURL || d.to}`,
      });
    }
  }
  return a;
}
function fv({ routeContext: a, match: i, children: o }) {
  let s = E.useContext(Ca);
  return (
    s &&
      s.static &&
      s.staticContext &&
      (i.route.errorElement || i.route.ErrorBoundary) &&
      (s.staticContext._deepestRenderedBoundaryId = i.route.id),
    E.createElement(sl.Provider, { value: a }, o)
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
    (Qe(
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
        let { loaderData: x, errors: w } = s,
          S = b.route.loader && !x.hasOwnProperty(b.route.id) && (!w || w[b.route.id] === void 0);
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
            var x, w;
            g(_, {
              location: s.location,
              params:
                ((w = (x = s.matches) == null ? void 0 : x[0]) == null ? void 0 : w.params) ?? {},
              unstable_pattern: K0(s.matches),
              errorInfo: b,
            });
          }
        : void 0;
  return r.reduceRight((_, b, x) => {
    let w,
      S = !1,
      R = null,
      j = null;
    s &&
      ((w = d && b.route.id ? d[b.route.id] : void 0),
      (R = b.route.errorElement || ov),
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
    let C = i.concat(r.slice(0, x + 1)),
      N = () => {
        let I;
        return (
          w
            ? (I = R)
            : S
              ? (I = j)
              : b.route.Component
                ? (I = E.createElement(b.route.Component, null))
                : b.route.element
                  ? (I = b.route.element)
                  : (I = _),
          E.createElement(fv, {
            match: b,
            routeContext: { outlet: _, matches: C, isDataRoute: s != null },
            children: I,
          })
        );
      };
    return s && (b.route.ErrorBoundary || b.route.errorElement || x === 0)
      ? E.createElement($p, {
          location: s.location,
          revalidation: s.revalidation,
          component: R,
          error: w,
          children: N(),
          routeContext: { outlet: null, matches: C, isDataRoute: !0 },
          onError: y,
        })
      : N();
  }, null);
}
function xr(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function mv(a) {
  let i = E.useContext(Ca);
  return (Qe(i, xr(a)), i);
}
function hv(a) {
  let i = E.useContext(ys);
  return (Qe(i, xr(a)), i);
}
function pv(a) {
  let i = E.useContext(sl);
  return (Qe(i, xr(a)), i);
}
function kr(a) {
  let i = pv(a),
    o = i.matches[i.matches.length - 1];
  return (Qe(o.route.id, `${a} can only be used on routes that contain a unique "id"`), o.route.id);
}
function yv() {
  return kr('useRouteId');
}
function gv() {
  var s;
  let a = E.useContext(Sr),
    i = hv('useRouteError'),
    o = kr('useRouteError');
  return a !== void 0 ? a : (s = i.errors) == null ? void 0 : s[o];
}
function _v() {
  let { router: a } = mv('useNavigate'),
    i = kr('useNavigate'),
    o = E.useRef(!1);
  return (
    Gp(() => {
      o.current = !0;
    }),
    E.useCallback(
      async (r, d = {}) => {
        (il(o.current, Hp),
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
  !i && !ip[a] && ((ip[a] = !0), il(!1, o));
}
E.memo(vv);
function vv({ routes: a, future: i, state: o, isStatic: s, onError: r }) {
  return Yp(a, void 0, { state: o, isStatic: s, onError: r });
}
function ul({ to: a, replace: i, state: o, relative: s }) {
  Qe(Aa(), '<Navigate> may be used only in the context of a <Router> component.');
  let { static: r } = E.useContext(Ut);
  il(
    !r,
    '<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.'
  );
  let { matches: d } = E.useContext(sl),
    { pathname: h } = pl(),
    v = cl(),
    g = ps(a, br(d), h, s === 'path'),
    y = JSON.stringify(g);
  return (
    E.useEffect(() => {
      v(JSON.parse(y), { replace: i, state: o, relative: s });
    }, [v, y, s, i, o]),
    null
  );
}
function Wt(a) {
  Qe(
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
  Qe(
    !Aa(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  let v = a.replace(/^\/*/, '/'),
    g = E.useMemo(
      () => ({ basename: v, navigator: r, static: d, unstable_useTransitions: h, future: {} }),
      [v, r, d, h]
    );
  typeof o == 'string' && (o = Na(o));
  let {
      pathname: y = '/',
      search: _ = '',
      hash: b = '',
      state: x = null,
      key: w = 'default',
      unstable_mask: S,
    } = o,
    R = E.useMemo(() => {
      let j = Bl(y, v);
      return j == null
        ? null
        : {
            location: { pathname: j, search: _, hash: b, state: x, key: w, unstable_mask: S },
            navigationType: s,
          };
    }, [v, y, _, b, x, w, s, S]);
  return (
    il(
      R != null,
      `<Router basename="${v}"> is not able to match the URL "${y}${_}${b}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    R == null
      ? null
      : E.createElement(
          Ut.Provider,
          { value: g },
          E.createElement(Oi.Provider, { children: i, value: R })
        )
  );
}
function Sv({ children: a, location: i }) {
  return sv(cr(a), i);
}
function cr(a, i = []) {
  let o = [];
  return (
    E.Children.forEach(a, (s, r) => {
      if (!E.isValidElement(s)) return;
      let d = [...i, r];
      if (s.type === E.Fragment) {
        o.push.apply(o, cr(s.props.children, d));
        return;
      }
      (Qe(
        s.type === Wt,
        `[${typeof s.type == 'string' ? s.type : s.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Qe(!s.props.index || !s.props.children, 'An index route cannot have child routes.'));
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
function kv(a) {
  return gs(a) && a.tagName.toLowerCase() === 'form';
}
function Ev(a) {
  return gs(a) && a.tagName.toLowerCase() === 'input';
}
function Tv(a) {
  return !!(a.metaKey || a.altKey || a.ctrlKey || a.shiftKey);
}
function Nv(a, i) {
  return a.button === 0 && (!i || i === '_self') && !Tv(a);
}
var Pu = null;
function Cv() {
  if (Pu === null)
    try {
      (new FormData(document.createElement('form'), 0), (Pu = !1));
    } catch {
      Pu = !0;
    }
  return Pu;
}
var Av = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
function Ko(a) {
  return a != null && !Av.has(a)
    ? (il(
        !1,
        `"${a}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${is}"`
      ),
      null)
    : a;
}
function jv(a, i) {
  let o, s, r, d, h;
  if (kv(a)) {
    let v = a.getAttribute('action');
    ((s = v ? Bl(v, i) : null),
      (o = a.getAttribute('method') || as),
      (r = Ko(a.getAttribute('enctype')) || is),
      (d = new FormData(a)));
  } else if (xv(a) || (Ev(a) && (a.type === 'submit' || a.type === 'image'))) {
    let v = a.form;
    if (v == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let g = a.getAttribute('formaction') || v.getAttribute('action');
    if (
      ((s = g ? Bl(g, i) : null),
      (o = a.getAttribute('formmethod') || v.getAttribute('method') || as),
      (r = Ko(a.getAttribute('formenctype')) || Ko(v.getAttribute('enctype')) || is),
      (d = new FormData(v, a)),
      !Cv())
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
function Er(a, i) {
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
        : i && Bl(r.pathname, i) === '/'
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
function wv(a) {
  return a == null
    ? !1
    : a.href == null
      ? a.rel === 'preload' && typeof a.imageSrcSet == 'string' && typeof a.imageSizes == 'string'
      : typeof a.rel == 'string' && typeof a.href == 'string';
}
async function Rv(a, i, o) {
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
      .filter(wv)
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
function Tr() {
  let a = E.useContext(Ca);
  return (Er(a, 'You must render this element inside a <DataRouterContext.Provider> element'), a);
}
function Lv() {
  let a = E.useContext(ys);
  return (
    Er(a, 'You must render this element inside a <DataRouterStateContext.Provider> element'),
    a
  );
}
var Nr = E.createContext(void 0);
Nr.displayName = 'FrameworkContext';
function Cr() {
  let a = E.useContext(Nr);
  return (Er(a, 'You must render this element inside a <HydratedRouter> element'), a);
}
function qv(a, i) {
  let o = E.useContext(Nr),
    [s, r] = E.useState(!1),
    [d, h] = E.useState(!1),
    { onFocus: v, onBlur: g, onMouseEnter: y, onMouseLeave: _, onTouchStart: b } = i,
    x = E.useRef(null);
  (E.useEffect(() => {
    if ((a === 'render' && h(!0), a === 'viewport')) {
      let R = (C) => {
          C.forEach((N) => {
            h(N.isIntersecting);
          });
        },
        j = new IntersectionObserver(R, { threshold: 0.5 });
      return (
        x.current && j.observe(x.current),
        () => {
          j.disconnect();
        }
      );
    }
  }, [a]),
    E.useEffect(() => {
      if (s) {
        let R = setTimeout(() => {
          h(!0);
        }, 100);
        return () => {
          clearTimeout(R);
        };
      }
    }, [s]));
  let w = () => {
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
            onFocus: Ti(v, w),
            onBlur: Ti(g, S),
            onMouseEnter: Ti(y, w),
            onMouseLeave: Ti(_, S),
            onTouchStart: Ti(b, w),
          },
        ]
    : [!1, x, {}];
}
function Ti(a, i) {
  return (o) => {
    (a && a(o), o.defaultPrevented || i(o));
  };
}
function Uv({ page: a, ...i }) {
  let o = W0(),
    { router: s } = Tr(),
    r = E.useMemo(() => Mp(s.routes, a, s.basename), [s.routes, a, s.basename]);
  return r
    ? o
      ? E.createElement(Gv, { page: a, matches: r, ...i })
      : E.createElement(Yv, { page: a, matches: r, ...i })
    : null;
}
function Hv(a) {
  let { manifest: i, routeModules: o } = Cr(),
    [s, r] = E.useState([]);
  return (
    E.useEffect(() => {
      let d = !1;
      return (
        Rv(a, i, o).then((h) => {
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
  let s = pl(),
    { future: r } = Cr(),
    { basename: d } = Tr(),
    h = E.useMemo(() => {
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
  return E.createElement(
    E.Fragment,
    null,
    h.map((v) => E.createElement('link', { key: v, rel: 'prefetch', as: 'fetch', href: v, ...o }))
  );
}
function Yv({ page: a, matches: i, ...o }) {
  let s = pl(),
    { future: r, manifest: d, routeModules: h } = Cr(),
    { basename: v } = Tr(),
    { loaderData: g, matches: y } = Lv(),
    _ = E.useMemo(() => up(a, i, y, d, s, 'data'), [a, i, y, d, s]),
    b = E.useMemo(() => up(a, i, y, d, s, 'assets'), [a, i, y, d, s]),
    x = E.useMemo(() => {
      if (a === s.pathname + s.search + s.hash) return [];
      let R = new Set(),
        j = !1;
      if (
        (i.forEach((N) => {
          var P;
          let I = d.routes[N.route.id];
          !I ||
            !I.hasLoader ||
            ((!_.some((ee) => ee.route.id === N.route.id) &&
              N.route.id in g &&
              (P = h[N.route.id]) != null &&
              P.shouldRevalidate) ||
            I.hasClientLoader
              ? (j = !0)
              : R.add(N.route.id));
        }),
        R.size === 0)
      )
        return [];
      let C = Vp(a, v, r.unstable_trailingSlashAwareDataRequests, 'data');
      return (
        j &&
          R.size > 0 &&
          C.searchParams.set(
            '_routes',
            i
              .filter((N) => R.has(N.route.id))
              .map((N) => N.route.id)
              .join(',')
          ),
        [C.pathname + C.search]
      );
    }, [v, r.unstable_trailingSlashAwareDataRequests, g, s, d, _, i, a, h]),
    w = E.useMemo(() => Ov(b, d), [b, d]),
    S = Hv(b);
  return E.createElement(
    E.Fragment,
    null,
    x.map((R) => E.createElement('link', { key: R, rel: 'prefetch', as: 'fetch', href: R, ...o })),
    w.map((R) => E.createElement('link', { key: R, rel: 'modulepreload', href: R, ...o })),
    S.map(({ key: R, link: j }) =>
      E.createElement('link', {
        key: R,
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
  let r = E.useRef();
  r.current == null && (r.current = E0({ window: s, v5Compat: !0 }));
  let d = r.current,
    [h, v] = E.useState({ action: d.action, location: d.location }),
    g = E.useCallback(
      (y) => {
        o === !1 ? v(y) : E.startTransition(() => v(y));
      },
      [o]
    );
  return (
    E.useLayoutEffect(() => d.listen(g), [d, g]),
    E.createElement(bv, {
      basename: a,
      children: i,
      location: h.location,
      navigationType: h.action,
      navigator: d,
      unstable_useTransitions: o,
    })
  );
}
var Ip = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Qp = E.forwardRef(function (
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
      unstable_defaultShouldRevalidate: w,
      ...S
    },
    R
  ) {
    let { basename: j, navigator: C, unstable_useTransitions: N } = E.useContext(Ut),
      I = typeof _ == 'string' && Ip.test(_),
      P = zp(_, j);
    _ = P.to;
    let ee = av(_, { relative: r }),
      V = pl(),
      H = null;
    if (v) {
      let he = ps(v, [], V.unstable_mask ? V.unstable_mask.pathname : '/', !0);
      (j !== '/' && (he.pathname = he.pathname === '/' ? j : al([j, he.pathname])),
        (H = C.createHref(he)));
    }
    let [q, Q, ae] = qv(s, S),
      ue = Kv(_, {
        replace: h,
        unstable_mask: v,
        state: g,
        target: y,
        preventScrollReset: b,
        relative: r,
        viewTransition: x,
        unstable_defaultShouldRevalidate: w,
        unstable_useTransitions: N,
      });
    function ce(he) {
      (i && i(he), he.defaultPrevented || ue(he));
    }
    let K = !(P.isExternal || d),
      J = E.createElement('a', {
        ...S,
        ...ae,
        href: (K ? H : void 0) || P.absoluteURL || ee,
        onClick: K ? ce : i,
        ref: $v(R, Q),
        target: y,
        'data-discover': !I && o === 'render' ? 'true' : void 0,
      });
    return q && !I ? E.createElement(E.Fragment, null, J, E.createElement(Uv, { page: ee })) : J;
  });
Qp.displayName = 'Link';
var Iv = E.forwardRef(function (
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
    x = pl(),
    w = E.useContext(ys),
    { navigator: S, basename: R } = E.useContext(Ut),
    j = w != null && eb(b) && v === !0,
    C = S.encodeLocation ? S.encodeLocation(b).pathname : b.pathname,
    N = x.pathname,
    I = w && w.navigation && w.navigation.location ? w.navigation.location.pathname : null;
  (o || ((N = N.toLowerCase()), (I = I ? I.toLowerCase() : null), (C = C.toLowerCase())),
    I && R && (I = Bl(I, R) || I));
  const P = C !== '/' && C.endsWith('/') ? C.length - 1 : C.length;
  let ee = N === C || (!r && N.startsWith(C) && N.charAt(P) === '/'),
    V = I != null && (I === C || (!r && I.startsWith(C) && I.charAt(C.length) === '/')),
    H = { isActive: ee, isPending: V, isTransitioning: j },
    q = ee ? i : void 0,
    Q;
  typeof s == 'function'
    ? (Q = s(H))
    : (Q = [s, ee ? 'active' : null, V ? 'pending' : null, j ? 'transitioning' : null]
        .filter(Boolean)
        .join(' '));
  let ae = typeof d == 'function' ? d(H) : d;
  return E.createElement(
    Qp,
    { ...y, 'aria-current': q, className: Q, ref: _, style: ae, to: h, viewTransition: v },
    typeof g == 'function' ? g(H) : g
  );
});
Iv.displayName = 'NavLink';
var Qv = E.forwardRef(
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
      ...w
    },
    S
  ) => {
    let { unstable_useTransitions: R } = E.useContext(Ut),
      j = Fv(),
      C = Pv(v, { relative: y }),
      N = h.toLowerCase() === 'get' ? 'get' : 'post',
      I = typeof v == 'string' && Ip.test(v),
      P = (ee) => {
        if ((g && g(ee), ee.defaultPrevented)) return;
        ee.preventDefault();
        let V = ee.nativeEvent.submitter,
          H = (V == null ? void 0 : V.getAttribute('formmethod')) || h,
          q = () =>
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
        R && o !== !1 ? E.startTransition(() => q()) : q();
      };
    return E.createElement('form', {
      ref: S,
      method: N,
      action: C,
      onSubmit: s ? g : P,
      ...w,
      'data-discover': !I && a === 'render' ? 'true' : void 0,
    });
  }
);
Qv.displayName = 'Form';
function Zv(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Zp(a) {
  let i = E.useContext(Ca);
  return (Qe(i, Zv(a)), i);
}
function Kv(
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
  let _ = cl(),
    b = pl(),
    x = Di(a, { relative: h });
  return E.useCallback(
    (w) => {
      if (Nv(w, i)) {
        w.preventDefault();
        let S = o !== void 0 ? o : Mi(b) === Mi(x),
          R = () =>
            _(a, {
              replace: S,
              unstable_mask: s,
              state: r,
              preventScrollReset: d,
              relative: h,
              viewTransition: v,
              unstable_defaultShouldRevalidate: g,
            });
        y ? E.startTransition(() => R()) : R();
      }
    },
    [b, _, x, o, s, r, i, a, d, h, v, g, y]
  );
}
var Jv = 0,
  Wv = () => `__${String(++Jv)}__`;
function Fv() {
  let { router: a } = Zp('useSubmit'),
    { basename: i } = E.useContext(Ut),
    o = yv(),
    s = a.fetch,
    r = a.navigate;
  return E.useCallback(
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
  let { basename: o } = E.useContext(Ut),
    s = E.useContext(sl);
  Qe(s, 'useFormAction must be used inside a RouteContext');
  let [r] = s.matches.slice(-1),
    d = { ...Di(a || '.', { relative: i }) },
    h = pl();
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
    o !== '/' && (d.pathname = d.pathname === '/' ? o : al([o, d.pathname])),
    Mi(d)
  );
}
function eb(a, { relative: i } = {}) {
  let o = E.useContext(qp);
  Qe(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = Zp('useViewTransitionState'),
    r = Di(a, { relative: i });
  if (!o.isTransitioning) return !1;
  let d = Bl(o.currentLocation.pathname, s) || o.currentLocation.pathname,
    h = Bl(o.nextLocation.pathname, s) || o.nextLocation.pathname;
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
  kb = '_empty_mn6ug_165',
  Eb = '_command_mn6ug_170',
  Tb = '_skillList_mn6ug_176',
  Nb = '_skillBtn_mn6ug_182',
  Cb = '_skillTop_mn6ug_194',
  Ab = '_skillName_mn6ug_201',
  jb = '_skillDesc_mn6ug_206',
  Mb = '_target_mn6ug_35',
  wb = '_unionBanner_mn6ug_217',
  Rb = '_unionCancel_mn6ug_231',
  Ob = '_unionHint_mn6ug_240',
  Db = '_unionBtn_mn6ug_246',
  zb = '_cmdHead_mn6ug_252',
  Bb = '_menu_mn6ug_257',
  Lb = '_menuBtn_mn6ug_263',
  qb = '_tp_mn6ug_280',
  Ub = '_menuBack_mn6ug_286',
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
    empty: kb,
    command: Eb,
    skillList: Tb,
    skillBtn: Nb,
    skillTop: Cb,
    skillName: Ab,
    skillDesc: jb,
    target: Mb,
    unionBanner: wb,
    unionCancel: Rb,
    unionHint: Ob,
    unionBtn: Db,
    cmdHead: zb,
    menu: Bb,
    menuBtn: Lb,
    tp: qb,
    menuBack: Ub,
    execRow: Hb,
    redo: Gb,
    primary: Yb,
    result: $b,
    resultTitle: Xb,
    resultBody: Vb,
  },
  Ib = '_row_1t6j7_1',
  Qb = '_label_1t6j7_8',
  Zb = '_track_1t6j7_16',
  Kb = '_fill_1t6j7_24',
  Jb = '_value_1t6j7_30',
  Ni = { row: Ib, label: Qb, track: Zb, fill: Kb, value: Jb },
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
    skill_cleave: {
      id: 'skill_cleave',
      name: 'なぎ払い',
      tree: 'master',
      tpCost: (a) => 5 + a,
      element: 'slash',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (a) => 0.7 + 0.12 * a }],
    },
    skill_volt_bolt: {
      id: 'skill_volt_bolt',
      name: 'ボルトショック',
      tree: 'master',
      tpCost: (a) => 4 + a,
      element: 'volt',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (a) => 1.5 + 0.25 * a }],
    },
    skill_heal: {
      id: 'skill_heal',
      name: 'ヒール',
      tree: 'base',
      tpCost: (a) => 4 + a,
      element: 'almighty',
      target: 'allyOne',
      effects: [{ kind: 'heal', amount: (a) => 40 + 20 * a }],
    },
    skill_mass_heal: {
      id: 'skill_mass_heal',
      name: 'マスヒール',
      tree: 'base',
      tpCost: (a) => 8 + a,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'heal', amount: (a) => 25 + 15 * a }],
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
          modifier: (a) => 1.2 + 0.05 * a,
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
          modifier: (a) => 1.2 + 0.05 * a,
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
          modifier: (a) => 1.2 + 0.05 * a,
          turns: 3,
          stackGroup: 'evaBuff',
        },
      ],
    },
    skill_weaken_song: {
      id: 'skill_weaken_song',
      name: '弱体の歌',
      tree: 'base',
      tpCost: (a) => 6 + a,
      element: 'almighty',
      target: 'enemyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'patk',
          modifier: (a) => 0.85 - 0.03 * a,
          turns: 3,
          stackGroup: 'atkDebuff',
        },
      ],
    },
    skill_triple_strike: {
      id: 'skill_triple_strike',
      name: '三段突き',
      tree: 'base',
      tpCost: (a) => 4 + a,
      element: 'bash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (a) => 0.7 + 0.1 * a, hits: 3 }],
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
          modifier: (a) => 1.3 + 0.05 * a,
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
          modifier: (a) => 1.4 + 0.05 * a,
          turns: 3,
          stackGroup: 'defBuff',
        },
      ],
    },
    skill_venom_hex: {
      id: 'skill_venom_hex',
      name: '毒の呪',
      tree: 'base',
      tpCost: (a) => 5 + a,
      element: 'almighty',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'int', power: (a) => 0.8 + 0.1 * a },
        { kind: 'ailment', ailment: 'poison', chance: (a) => 0.5 + 0.05 * a, turns: 3 },
      ],
    },
    skill_sleep_hex: {
      id: 'skill_sleep_hex',
      name: '眠りの呪',
      tree: 'base',
      tpCost: (a) => 7 + a,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'ailment', ailment: 'sleep', chance: (a) => 0.35 + 0.03 * a, turns: 2 }],
    },
    skill_weaken_hex: {
      id: 'skill_weaken_hex',
      name: '魔弱の呪',
      tree: 'base',
      tpCost: (a) => 5 + a,
      element: 'almighty',
      target: 'enemyOne',
      effects: [
        {
          kind: 'buff',
          stat: 'matk',
          modifier: (a) => 0.8 - 0.03 * a,
          turns: 3,
          stackGroup: 'matkDebuff',
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
function Wb(a) {
  return a.category === 'food' ? 0 : a.category === 'material' ? 8 : Math.floor(a.buyPrice / 2);
}
function Fb(a) {
  var i;
  return ((i = et[a]) == null ? void 0 : i.category) === 'food';
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
    race_lunar: {
      id: 'race_lunar',
      name: 'ルーナ',
      baseStatsAtLv1: { hp: 30, tp: 28, str: 5, vit: 6, agi: 8, int: 10, mnd: 12, luc: 10 },
      statGrowth: { hp: 5, tp: 6, str: 1, vit: 1, agi: 2, int: 3, mnd: 3, luc: 3 },
      raceSkillTree: {
        skills: [
          { skillId: 'skill_union_moonlight', maxLevel: 3 },
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
          { skillId: 'skill_mining', maxLevel: 1 },
          { skillId: 'skill_logging', maxLevel: 1 },
        ],
      },
      defaultClassId: 'class_monk',
    },
  },
  Ar = {
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
        { kind: 'heal', amount: (a) => 55 + 22 * a },
        {
          kind: 'buff',
          stat: 'mdef',
          modifier: (a) => 1.2 + 0.05 * a,
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
      effects: [{ kind: 'damage', statBase: 'str', power: (a) => 2.3 + 0.4 * a }],
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
  Ci = { TITLE_DEPTH: 20, REBIRTH_MIN_LEVEL: 30 },
  Kp = 5,
  t1 = 5,
  hl = {
    MAX_LEVEL: 5,
    STAT_PER_LEVEL: 2,
    INGOT_INC: { copper: 1, silver: 3, gold: 5 },
    FRAGMENTS_PER_INGOT: 10,
    RECYCLE_FRAGMENTS: 3,
  },
  Ai = (a) => a > 0 && a % Le.BOSS_INTERVAL === 0,
  sp = (a) => Math.round(Le.EXP_CURVE_BASE * Math.pow(a, Le.EXP_CURVE_POW)),
  Jo = (a) => a < Le.LEVEL_CAP,
  jr = (a, i) => 1 + Le.ENEMY_SCALE_K * (a - i),
  Ll = {
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
      q = u1(i) ? 0 : h.eva,
      Q = os(Le.BASE_HIT + (d.acc - q) * Le.HIT_AGI_K - H, Le.HIT_MIN, 1);
    y = s.next() < Q;
  }
  if (!y) return { damage: 0, hit: !1, critical: !1 };
  const b = (v * o.power * Le.DAMAGE_DEF_K) / (Le.DAMAGE_DEF_K + Math.max(0, g)),
    x = r && n1.includes(o.element),
    w = x && a.row === 'back' ? Le.BACK_ROW_MELEE_MULT : 1,
    S = x && i.row === 'back' ? Le.BACK_ROW_MELEE_MULT : 1,
    R = w * S,
    [j, C] = Le.DMG_VARIANCE,
    N = j + s.next() * (C - j);
  let I = b * o.elementMultiplier * R * N;
  const P = os(
      Le.CRIT_BASE + (a.stats.luc - i.stats.luc) * Le.CRIT_LUC_K,
      Le.CRIT_MIN,
      Le.CRIT_MAX
    ),
    ee = s.next() < P;
  return (
    ee && (I *= Le.CRIT_MULT),
    { damage: o.elementMultiplier === 0 ? 0 : Math.max(1, Math.floor(I)), hit: !0, critical: ee }
  );
}
function s1(a, i) {
  const o = ht[a];
  if (!o || i <= 0) return {};
  const s = i * hl.STAT_PER_LEVEL;
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
  if (s.forgeLevel >= hl.MAX_LEVEL) return { ok: !1, save: a, reason: 'maxLevel' };
  if ((a.forgeInventory.ingots[o] ?? 0) <= 0) return { ok: !1, save: a, reason: 'noIngot' };
  const r = Math.min(hl.MAX_LEVEL, s.forgeLevel + hl.INGOT_INC[o]);
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
  r.common = (r.common ?? 0) + hl.RECYCLE_FRAGMENTS;
  let d = a.forgeInventory.ingots.copper;
  for (; r.common >= hl.FRAGMENTS_PER_INGOT; ) ((r.common -= hl.FRAGMENTS_PER_INGOT), (d += 1));
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
const _t = {
  class_warrior: {
    id: 'class_warrior',
    name: '戦士',
    skillTree: {
      skills: [
        { skillId: 'skill_power_slash', maxLevel: 5 },
        { skillId: 'skill_guard_stance', maxLevel: 3 },
        {
          skillId: 'skill_cleave',
          maxLevel: 5,
          requires: [{ skillId: 'skill_power_slash', level: 2 }],
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
        {
          skillId: 'skill_volt_bolt',
          maxLevel: 5,
          requires: [{ skillId: 'skill_ice_bolt', level: 1 }],
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
        { skillId: 'skill_focus_ki', maxLevel: 3 },
        { skillId: 'skill_iron_body', maxLevel: 3 },
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
      ],
    },
    equipableWeaponTypes: ['staff'],
    equipableArmorTypes: ['clothes'],
    titleOptions: ['title_plague', 'title_warlock'],
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
function wr(a, i, o = 1) {
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
function Rr(a, i) {
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
  const s = _t[a.classId];
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
const yt = (a) => ({ hp: 0, tp: 0, str: 0, vit: 0, agi: 0, int: 0, mnd: 0, luc: 0, ...a }),
  Ea = {
    title_berserker: {
      id: 'title_berserker',
      name: '狂戦士',
      parentClassId: 'class_warrior',
      skillTree: { skills: [] },
      growthModifier: yt({ str: 1 }),
    },
    title_sentinel: {
      id: 'title_sentinel',
      name: '哨戒兵',
      parentClassId: 'class_warrior',
      skillTree: { skills: [] },
      growthModifier: yt({ vit: 1 }),
    },
    title_bulwark: {
      id: 'title_bulwark',
      name: '城壁',
      parentClassId: 'class_guardian',
      skillTree: { skills: [] },
      growthModifier: yt({ vit: 1, hp: 2 }),
    },
    title_vanguard: {
      id: 'title_vanguard',
      name: '先鋒',
      parentClassId: 'class_guardian',
      skillTree: { skills: [] },
      growthModifier: yt({ str: 1 }),
    },
    title_pyromancer: {
      id: 'title_pyromancer',
      name: '紅蓮術士',
      parentClassId: 'class_mage',
      skillTree: { skills: [] },
      growthModifier: yt({ int: 1 }),
    },
    title_sage: {
      id: 'title_sage',
      name: '賢者',
      parentClassId: 'class_mage',
      skillTree: { skills: [] },
      growthModifier: yt({ tp: 2, mnd: 1 }),
    },
    title_sniper: {
      id: 'title_sniper',
      name: '狙撃手',
      parentClassId: 'class_ranger',
      skillTree: { skills: [] },
      growthModifier: yt({ agi: 1, luc: 1 }),
    },
    title_tracker: {
      id: 'title_tracker',
      name: '追跡者',
      parentClassId: 'class_ranger',
      skillTree: { skills: [] },
      growthModifier: yt({ agi: 1 }),
    },
    title_saint: {
      id: 'title_saint',
      name: '聖者',
      parentClassId: 'class_medic',
      skillTree: { skills: [] },
      growthModifier: yt({ mnd: 1, tp: 2 }),
    },
    title_apothecary: {
      id: 'title_apothecary',
      name: '調薬師',
      parentClassId: 'class_medic',
      skillTree: { skills: [] },
      growthModifier: yt({ luc: 1, tp: 1 }),
    },
    title_blade_dancer: {
      id: 'title_blade_dancer',
      name: '剣の舞手',
      parentClassId: 'class_dancer',
      skillTree: { skills: [] },
      growthModifier: yt({ agi: 1, str: 1 }),
    },
    title_muse: {
      id: 'title_muse',
      name: '舞姫',
      parentClassId: 'class_dancer',
      skillTree: { skills: [] },
      growthModifier: yt({ mnd: 1, tp: 1 }),
    },
    title_grappler: {
      id: 'title_grappler',
      name: '組手家',
      parentClassId: 'class_monk',
      skillTree: { skills: [] },
      growthModifier: yt({ str: 1, agi: 1 }),
    },
    title_zen: {
      id: 'title_zen',
      name: '禅僧',
      parentClassId: 'class_monk',
      skillTree: { skills: [] },
      growthModifier: yt({ vit: 1, tp: 1 }),
    },
    title_plague: {
      id: 'title_plague',
      name: '疫病使い',
      parentClassId: 'class_hexer',
      skillTree: { skills: [] },
      growthModifier: yt({ int: 1 }),
    },
    title_warlock: {
      id: 'title_warlock',
      name: '魔道師',
      parentClassId: 'class_hexer',
      skillTree: { skills: [] },
      growthModifier: yt({ int: 1, luc: 1 }),
    },
  },
  h1 = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];
function zi(a) {
  var v, g;
  const i = Pt[a.raceId];
  if (!i) throw new Error(`computeBaseStats: 未定義の種族 "${a.raceId}"`);
  const s = Math.max(1, Math.min(a.level, Le.LEVEL_CAP)) - 1,
    r = a.titleId ? ((v = Ea[a.titleId]) == null ? void 0 : v.growthModifier) : void 0,
    d = ((g = a.rebirthBonus) == null ? void 0 : g.allStats) ?? 0,
    h = {};
  for (const y of h1) {
    const _ = i.statGrowth[y] + ((r == null ? void 0 : r[y]) ?? 0);
    h[y] = i.baseStatsAtLv1[y] + _ * s + d;
  }
  return h;
}
const p1 = 3,
  zl = (a, i, o) => Math.max(i, Math.min(o, a)),
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
  const s = Ll[a],
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
const gt = (a, i) => (i === 'ally' ? a.allies : a.enemies).filter((o) => !o.isDown),
  zr = (a) => a.summons.filter((i) => !i.isDown);
function Dl(a, i) {
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
  ((a.hp = zl(a.hp - i, 0, a.maxHp)),
    i > 0 &&
      a.ailments.some((s) => s.type === 'sleep') &&
      ((a.ailments = a.ailments.filter((s) => s.type !== 'sleep')),
      o.push({ text: `${a.name} は目を覚ました` })),
    a.hp === 0 &&
      !a.isDown &&
      ((a.isDown = !0),
      (a.unionGauge = Math.floor(a.unionGauge / 2)),
      o.push({ text: `${a.name} は倒れた！` })));
}
function fs(a, i) {
  a.isDown || (a.unionGauge = zl(a.unionGauge + i, 0, 100));
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
  return zl(a * (1 + (i.stats.luc - o.stats.luc) * Le.AILMENT_LUC_K), 0, Le.AILMENT_MAX);
}
function cy(a, i, o, s) {
  const r = i.side === 'ally' ? 'enemy' : 'ally';
  switch (o) {
    case 'self':
      return [i];
    case 'allyAll':
      return i.side === 'ally' ? [...gt(a, 'ally'), ...zr(a)] : gt(a, 'enemy');
    case 'allyOne': {
      const d = Dl(a, s);
      return d && d.side === i.side ? [d] : [i];
    }
    case 'enemyAll':
      return gt(a, r);
    case 'enemyRow':
    case 'enemyOne':
    default: {
      const d = Dl(a, s);
      return d && d.side === r && !d.isDown ? [d] : gt(a, r).slice(0, 1);
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
      for (const g of d) g.isDown || (g.hp = zl(g.hp + v, 0, g.maxHp));
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
      ? (Ll[i.enemyId].attackElement ?? 'bash')
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
  k1 = (a) => a.ailments.some((i) => i.type === 'paralysis'),
  E1 = (a) => a.ailments.some((i) => i.type === 'sleep'),
  Lr = (a, i) => a.ailments.some((o) => o.type === i),
  Fo = (a) => Lr(a, 'armBind'),
  T1 = (a) => Lr(a, 'headBind'),
  N1 = (a) => Lr(a, 'legBind');
function fp(a) {
  return a.effects.some((i) => i.kind === 'damage' && i.statBase === 'str');
}
function C1(a, i, o) {
  const s = xa[i.unionSkillId];
  if (!s) return;
  const r = Dl(a, i.actorId);
  if (!r || r.isDown || r.side !== 'ally') return;
  if (r.unionGauge < 100) {
    a.log.push({ text: `${r.name} はユニオンゲージが足りない` });
    return;
  }
  const d = new Set(i.participantIds);
  d.add(r.id);
  const h = [...d].map((_) => Dl(a, _)).filter((_) => !!_ && !_.isDown && _.side === 'ally');
  if (h.length < s.requiredParticipants) {
    a.log.push({ text: `${r.name} の${s.name}は参加人数が足りない` });
    return;
  }
  const v = [r, ...h.filter((_) => _.id !== r.id)].slice(0, s.requiredParticipants);
  for (const _ of v) _.unionGauge = zl(_.unionGauge - s.gaugeCostPerParticipant, 0, 100);
  a.log.push({ text: `ユニオン！ ${r.name} の${s.name}！` });
  const g = 1,
    y = cy(a, r, s.target, i.targetId);
  for (const _ of s.effects) oy(a, r, _, s.element, g, y, o);
}
function Po(a, i, o) {
  var b, x, w;
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
    for (const S of i) S.kind === 'union' && C1(s, S, o);
  const g = i.find((S) => S.kind === 'flee');
  if (!v && g && s.outcome === 'ongoing') {
    const S = Dl(s, g.actorId);
    if (S && N1(S)) s.log.push({ text: `${S.name} は脚を封じられて逃げられない` });
    else {
      const R = zl(0.5 + (rp(gt(s, 'ally')) - rp(gt(s, 'enemy'))) * 0.02, 0.1, 0.95);
      if (o.next() < R)
        return (s.log.push({ text: 'うまく逃げ切れた！' }), (s.outcome = 'fled'), s);
      s.log.push({ text: '逃げられなかった！' });
    }
  }
  if (!v)
    for (const S of i) {
      if (S.kind !== 'guard') continue;
      const R = Dl(s, S.actorId);
      !R ||
        R.isDown ||
        (rr(R, { stat: 'pdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }),
        rr(R, { stat: 'mdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }));
    }
  const y = new Map();
  if (!h)
    for (const S of gt(s, 'enemy')) {
      const R = [...zr(s), ...gt(s, 'ally')];
      R.length > 0 && y.set(S.id, o.pick(R).id);
    }
  const _ = [...s.allies, ...s.enemies, ...s.summons]
    .filter((S) => !S.isDown)
    .filter((S) => !(h && S.side === 'enemy') && !(v && S.side === 'ally'))
    .map((S) => ({ c: S, agi: S.stats.agi, tie: o.next() }))
    .sort((S, R) => R.agi - S.agi || R.tie - S.tie)
    .map((S) => S.c);
  for (const S of _)
    if (!S.isDown) {
      if (s.outcome !== 'ongoing') break;
      if (E1(S)) {
        s.log.push({ text: `${S.name} は眠っている` });
        continue;
      }
      if (k1(S) && o.next() < Le.PARALYSIS_SKIP) {
        s.log.push({ text: `${S.name} は麻痺で動けない` });
        continue;
      }
      if (S.isSummon) {
        const R = S.summonKind ? ja[S.summonKind] : void 0;
        if (R != null && R.actsOnTurn) {
          const j = gt(s, 'enemy');
          j.length > 0 && Wo(s, S, o.pick(j), o);
        }
        if (gt(s, 'enemy').length === 0) break;
        continue;
      }
      if (S.side === 'enemy') {
        if (Fo(S)) {
          s.log.push({ text: `${S.name} は腕を封じられて攻撃できない` });
          continue;
        }
        const R = y.get(S.id),
          j = R ? Dl(s, R) : void 0,
          C = j && !j.isDown ? j : gt(s, 'ally')[0];
        C && Wo(s, S, C, o);
      } else {
        const R = r.get(S.id);
        if (!R || R.kind === 'guard' || R.kind === 'flee') continue;
        if (R.kind === 'attack') {
          if (Fo(S)) {
            s.log.push({ text: `${S.name} は腕を封じられて攻撃できない` });
            continue;
          }
          const j = Dl(s, R.targetId),
            C = j && !j.isDown ? j : gt(s, 'enemy')[0];
          C && Wo(s, S, C, o);
        } else if (R.kind === 'skill') {
          const j = dn[R.skillId];
          if (!j) continue;
          if (fp(j) && Fo(S)) {
            s.log.push({ text: `${S.name} は腕を封じられてスキルを使えない` });
            continue;
          }
          if (!fp(j) && T1(S)) {
            s.log.push({ text: `${S.name} は頭を封じられてスキルを使えない` });
            continue;
          }
          const C = 1,
            N = j.tpCost(C);
          if (S.tp < N) {
            s.log.push({ text: `${S.name} は TP が足りない` });
            continue;
          }
          ((S.tp -= N), fs(S, 10));
          const I = x1(s, S, j, R.targetId);
          for (const P of j.effects) oy(s, S, P, j.element, C, I, o);
        } else if (R.kind === 'item') {
          const j = et[R.itemId];
          if (!j || !((b = j.useContext) != null && b.includes('battle'))) continue;
          const C = Dl(s, R.targetId) ?? S;
          for (const N of j.effects ?? [])
            N.kind === 'heal'
              ? (C.hp = zl(C.hp + N.amount(1), 0, C.maxHp))
              : N.kind === 'restoreTp' && (C.tp = zl(C.tp + N.amount(1), 0, C.maxTp));
          (s.consumedItems.push(R.itemId), s.log.push({ text: `${S.name} は ${j.name} を使った` }));
        }
      }
      if (gt(s, 'enemy').length === 0 || gt(s, 'ally').length === 0) break;
    }
  for (const S of [...s.allies, ...s.enemies, ...s.summons]) {
    if (S.isDown) continue;
    const R = S.ailments.find((j) => j.type === 'poison');
    if (R) {
      const j = R.magnitude ?? Math.max(1, Math.floor(S.maxHp * Le.POISON_HP_RATIO));
      (Br(S, j, s.log), s.log.push({ text: `${S.name} は毒で ${j} のダメージ` }));
    }
  }
  for (const S of [...s.allies, ...s.enemies, ...s.summons])
    (!S.isDown &&
      S.maxTp > 0 &&
      (S.tp = Math.min(S.maxTp, S.tp + Math.ceil(S.maxTp * Le.TP_REGEN_RATIO))),
      (S.buffs = S.buffs
        .map((R) => ({ ...R, remainingTurns: R.remainingTurns - 1 }))
        .filter((R) => R.remainingTurns > 0)),
      (S.ailments = S.ailments
        .map((R) => ({ ...R, remainingTurns: R.remainingTurns - 1 }))
        .filter((R) => R.remainingTurns > 0)));
  for (const S of s.enemies)
    if (
      !(
        !S.isDown ||
        !S.enemyId ||
        (((x = a.enemies.find((j) => j.id === S.id)) == null ? void 0 : x.isDown) ?? !1)
      )
    )
      for (const j of Ll[S.enemyId].drops ?? [])
        o.next() < j.rate &&
          (s.drops.push({ enemyId: S.enemyId, itemId: j.itemId }),
          s.log.push({
            text: `${S.name} は ${((w = et[j.itemId]) == null ? void 0 : w.name) ?? j.itemId} を落とした`,
          }));
  return (
    (s.summons = s.summons.filter((S) => !S.isDown)),
    (s.turn += 1),
    gt(s, 'enemy').length === 0
      ? (s.outcome = 'win')
      : gt(s, 'ally').length === 0 && (s.outcome = 'lose'),
    s
  );
}
function ry(a) {
  let i = 0,
    o = 0;
  for (const s of a.enemies) {
    if (!s.enemyId) continue;
    const r = Ll[s.enemyId],
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
      const w = r.get(x.charId);
      if (!w) return x;
      let S = w.unionGauge;
      return (
        s && !w.isDown && (S = zl(S + Le.UNION_GAIN_ON_WIN, 0, 100)),
        { ...x, hp: w.hp, tp: w.tp, unionGauge: S, ailments: w.ailments }
      );
    });
  let h = a.guild.members,
    v = a.guild.gold;
  const g = { ...a.bestiary.monsters };
  for (const x of i.enemies) {
    if (!x.enemyId) continue;
    const w = g[x.enemyId] ?? { seen: !1, defeated: !1, dropsFound: [] };
    g[x.enemyId] = { ...w, seen: !0, defeated: w.defeated || x.isDown };
  }
  if (o)
    for (const x of i.drops) {
      const w = g[x.enemyId];
      w &&
        !w.dropsFound.includes(x.itemId) &&
        (g[x.enemyId] = { ...w, dropsFound: [...w.dropsFound, x.itemId] });
    }
  const y = { ...a.bestiary, monsters: g };
  if (o) {
    const { exp: x, gold: w } = ry(i);
    v += w;
    const S = new Set(d.map((j) => j.charId)),
      R = S.size > 0 ? Math.floor(x / S.size) : 0;
    h = h.map((j) => (S.has(j.id) ? A1(j, R) : j));
  }
  const _ = i.summons
    .filter((x) => {
      var w;
      return (
        !x.isDown &&
        x.summonKind &&
        ((w = ja[x.summonKind]) == null ? void 0 : w.persistsAfterBattle)
      );
    })
    .map((x) => ({ summonKind: x.summonKind, ownerId: x.ownerId ?? '', hp: x.hp }));
  let b = {
    ...a,
    guild: { ...a.guild, members: h, gold: v, bestiary: y },
    bestiary: y,
    diveState: { ...a.diveState, party: d, persistentSummons: _ },
  };
  for (const x of i.consumedItems) b = wr(b, x, 1);
  if (o) for (const x of i.drops) b = Mr(b, x.itemId, 1);
  return b;
}
const j1 = 8,
  fr = 16,
  ji = 5;
function qr(a) {
  return a.range(j1, fr);
}
function M1(a, i) {
  const o = a - 1;
  return o <= 0
    ? { stepsUntilEncounter: qr(i), triggered: !0 }
    : { stepsUntilEncounter: o, triggered: !1 };
}
function w1(a) {
  const i = Math.max(0, fr - a),
    o = Math.round((i / fr) * ji);
  return Math.min(ji, Math.max(0, o));
}
const Ft = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  Ta = ['N', 'E', 'S', 'W'];
function fy(a) {
  return Ta[(Ta.indexOf(a) + 1) % 4];
}
function dy(a) {
  return Ta[(Ta.indexOf(a) + 3) % 4];
}
function R1(a) {
  return Ta[(Ta.indexOf(a) + 2) % 4];
}
const O1 = (a, i, o) => a >= 0 && i >= 0 && a < o.width && i < o.height;
function ka(a, i, o, s) {
  if (a.cells[o][i].walls[s]) return !1;
  const r = i + Ft[s].dx,
    d = o + Ft[s].dy;
  return O1(r, d, a) ? a.cells[d][r].passable : !1;
}
function D1(a, i, o) {
  return ka(a, i.x, i.y, o) ? { x: i.x + Ft[o].dx, y: i.y + Ft[o].dy } : null;
}
function Ur(a, i, o) {
  return ['N', 'E', 'S', 'W'].filter((s) => !a.cells[o][i].walls[s]);
}
const mp = ['N', 'E', 'S', 'W'],
  er = (a, i) => Math.abs(a.x - i.x) + Math.abs(a.y - i.y);
function z1(a, i, o, s, r) {
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
    const x = (w) => {
      if (!ka(a, _.cell.x, _.cell.y, w)) return 'blocked';
      const S = _.cell.x + Ft[w].dx,
        R = _.cell.y + Ft[w].dy;
      if (S === o.x && R === o.y) {
        const j = w === s;
        return (
          (g = { spawnId: _.spawnId, enemyId: b.enemyId, firstStrike: j ? 'ambush' : 'none' }),
          'contact'
        );
      }
      return v.has(`${S},${R}`)
        ? 'blocked'
        : (v.delete(`${_.cell.x},${_.cell.y}`),
          (_.cell = { x: S, y: R }),
          v.add(`${S},${R}`),
          'moved');
    };
    if (_.alerted)
      for (let w = 0; w < b.moveSpeed; w++) {
        let S = null,
          R = er(_.cell, o),
          j = !1;
        for (const N of mp) {
          const I = _.cell.x + Ft[N].dx,
            P = _.cell.y + Ft[N].dy;
          if (I === o.x && P === o.y && ka(a, _.cell.x, _.cell.y, N)) {
            ((S = N), (j = !0));
            break;
          }
          if (!ka(a, _.cell.x, _.cell.y, N) || v.has(`${I},${P}`)) continue;
          const ee = er({ x: I, y: P }, o);
          ee < R && ((R = ee), (S = N));
        }
        if (!S) break;
        const C = x(S);
        if (C === 'contact' || C === 'blocked' || j) break;
      }
    else {
      const w = b.patrol;
      if (w.kind === 'wander') {
        const S = mp.filter(
          (R) =>
            ka(a, _.cell.x, _.cell.y, R) && !v.has(`${_.cell.x + Ft[R].dx},${_.cell.y + Ft[R].dy}`)
        );
        S.length > 0 && x(r.pick(S));
      } else w.kind === 'charge' && x(w.dir);
    }
  }
  return { foes: d, contact: g };
}
const wn = {
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
  B1 = Object.keys(wn);
function L1(a) {
  return Object.values(Ll)
    .filter((i) => i.tierBand === a && !i.isBoss)
    .map((i) => i.id);
}
function q1(a) {
  const i = Object.values(Ll).filter((s) => s.isBoss);
  if (i.length === 0) return null;
  const o = i.filter((s) => s.tierBand === a);
  return o.length > 0 ? o[0].id : i.sort((s, r) => r.tierBand - s.tierBand)[0].id;
}
function U1(a, i, o, s, r) {
  for (const d of ['N', 'E', 'S', 'W']) {
    if (a[o][i].walls[d]) continue;
    const h = i + nl[d].dx,
      v = o + nl[d].dy;
    if (ds(h, v, s, r) && !a[v][h].event) return { x: h, y: v };
  }
  return null;
}
const nl = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  H1 = { N: 'S', E: 'W', S: 'N', W: 'E' };
function G1(a) {
  return Math.min(25, 15 + Math.floor(a / 5));
}
function Y1() {
  return { walls: { N: !0, E: !0, S: !0, W: !0 }, floorType: 'normal', passable: !0 };
}
const ds = (a, i, o, s) => a >= 0 && i >= 0 && a < o && i < s;
function hp(a, i, o, s) {
  const { dx: r, dy: d } = nl[s];
  ((a[o][i].walls[s] = !1), (a[o + d][i + r].walls[H1[s]] = !1));
}
function $1(a, i, o) {
  const s = a.length,
    r = a[0].length,
    d = Array.from({ length: s }, () => Array(r).fill(-1)),
    h = [{ x: i, y: o }];
  d[o][i] = 0;
  for (let v = 0; v < h.length; v++) {
    const { x: g, y } = h[v];
    for (const _ of ['N', 'E', 'S', 'W']) {
      if (a[y][g].walls[_]) continue;
      const b = g + nl[_].dx,
        x = y + nl[_].dy;
      !ds(b, x, r, s) || d[x][b] !== -1 || ((d[x][b] = d[y][g] + 1), h.push({ x: b, y: x }));
    }
  }
  return d;
}
function X1(a, i) {
  const o = G1(a),
    s = o,
    r = o,
    d = Array.from({ length: r }, () => Array.from({ length: s }, () => Y1())),
    h = Array.from({ length: r }, () => Array(s).fill(!1)),
    v = i.int(s),
    g = i.int(r),
    y = [{ x: v, y: g }];
  for (h[g][v] = !0; y.length > 0; ) {
    const V = y[y.length - 1],
      H = [];
    for (const ue of ['N', 'E', 'S', 'W']) {
      const ce = V.x + nl[ue].dx,
        K = V.y + nl[ue].dy;
      ds(ce, K, s, r) && !h[K][ce] && H.push(ue);
    }
    if (H.length === 0) {
      y.pop();
      continue;
    }
    const q = i.pick(H);
    hp(d, V.x, V.y, q);
    const Q = V.x + nl[q].dx,
      ae = V.y + nl[q].dy;
    ((h[ae][Q] = !0), y.push({ x: Q, y: ae }));
  }
  const _ = Math.floor((s * r) / 25);
  for (let V = 0; V < _; V++) {
    const H = i.int(s),
      q = i.int(r),
      Q = i.pick(['N', 'E', 'S', 'W']),
      ae = H + nl[Q].dx,
      ue = q + nl[Q].dy;
    ds(ae, ue, s, r) && d[q][H].walls[Q] && hp(d, H, q, Q);
  }
  const b = i.int(s),
    x = i.int(r),
    w = $1(d, b, x);
  let S = b,
    R = x,
    j = -1;
  for (let V = 0; V < r; V++)
    for (let H = 0; H < s; H++) w[V][H] > j && ((j = w[V][H]), (S = H), (R = V));
  ((d[x][b].event = { kind: 'stairsDown' }), (d[R][S].event = { kind: 'stairsUp' }));
  const C = Math.floor((a - 1) / 10),
    N = [];
  if (Ai(a)) {
    const V = q1(C);
    if (V) {
      const H = U1(d, S, R, s, r) ?? { x: S, y: R };
      N.push({
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
    const V = L1(C),
      H = 1 + Math.floor(a / 8);
    for (let q = 0; q < H && V.length > 0; q++) {
      let Q = i.int(s),
        ae = i.int(r);
      for (let ue = 0; ue < 20; ue++) {
        ((Q = i.int(s)), (ae = i.int(r)));
        const ce = d[ae][Q].event,
          K = Math.abs(Q - b) + Math.abs(ae - x) >= 3;
        if (!ce && K) break;
      }
      N.push({
        id: `foe_${q}`,
        enemyId: i.pick(V),
        startCell: { x: Q, y: ae },
        patrol: { kind: 'wander' },
        moveSpeed: 1,
        sightRange: 3,
        respawn: !1,
      });
    }
  }
  const I = [],
    P = () => {
      for (let V = 0; V < 25; V++) {
        const H = i.int(s),
          q = i.int(r),
          Q = Math.abs(H - b) + Math.abs(q - x) >= 2;
        if (!d[q][H].event && Q) return { x: H, y: q };
      }
      return null;
    },
    ee = 2 + Math.floor(a / 10);
  for (let V = 0; V < ee; V++) {
    const H = P();
    if (!H) break;
    const q = i.pick(B1),
      Q = `gather_${V}`;
    ((d[H.y][H.x].event = { kind: 'gather', gatherId: Q }), I.push({ id: Q, cell: H, type: q }));
  }
  if (!Ai(a)) {
    const V = P();
    V && (d[V.y][V.x].event = { kind: 'cookingSpot', spotId: 'cook_0' });
  }
  return {
    depth: a,
    width: s,
    height: r,
    cells: d,
    encounterTable: `band_${C}`,
    foeSpawns: N,
    gatheringPoints: I,
    bgmId: Ai(a) ? 'bgm_boss' : 'bgm_dungeon',
  };
}
function my(a, i) {
  var o;
  for (let s = 0; s < a.height; s++)
    for (let r = 0; r < a.width; r++)
      if (((o = a.cells[s][r].event) == null ? void 0 : o.kind) === i) return { x: r, y: s };
  return null;
}
const V1 = 4294967296;
function I1(a, i) {
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
      ((i ^ (i >>> 14)) >>> 0) / V1
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
    const o = I1(this.baseSeed, i);
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
  const s = X1(i, Z1(a.masterSeed, i)),
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
      isBossFloor: Ai(i),
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
  for (const h of Ur(r, o, s)) {
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
    v = Ur(d, h.x, h.y)[0] ?? 'N';
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
        encounter: { stepsUntilEncounter: qr(o) },
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
function J1(a, i, o) {
  const s = a.diveState;
  if (!s) return { save: a, moved: !1, triggered: !1 };
  const r = a.towerState.floors[s.depth],
    d = r.generated,
    h = D1(d, s.pos, i);
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
    let w = { ...a, diveState: { ...s, pos: h, dir: i, pendingFoeBattle: x } };
    return ((w = hs(w, s.depth, h.x, h.y)), { save: w, moved: !0, triggered: x !== null });
  }
  const g = M1(s.encounter.stepsUntilEncounter, o);
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
  const _ = z1(d, r.foeRuntime, h, i, o);
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
function W1(a, i) {
  const o = a.diveState;
  if (!o) return a;
  const s = o.pendingFoeBattle;
  let r = { ...a, diveState: { ...o, pendingFoeBattle: null } };
  if (s && i) {
    const h = r.towerState.floors[o.depth].foeRuntime.map((v) =>
      v.spawnId === s.spawnId ? { ...v, defeated: !0 } : v
    );
    ((r = gy(r, o.depth, h)), s.isBoss && (r = F1(r, o.depth)));
  }
  return r;
}
function F1(a, i, o = Date.now()) {
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
  return Ai(i) ? ((o = a.towerState.bossGates[i]) == null ? void 0 : o.defeated) === !0 : !0;
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
function P1(a) {
  if (!a.diveState || !_y(a, a.diveState.depth)) return a;
  const i = a.diveState.depth + 1,
    o = On(a.masterSeed).fork(`enc:${i}:${a.towerState.record.totalDives}`);
  return py(a, i, o);
}
function eS(a) {
  if (!a.diveState) return a;
  const i = a.diveState.depth;
  if (i <= 1) return wi(a);
  const o = i - 1,
    s = hy(a, o),
    r = my(s.floor.generated, 'stairsUp') ?? { x: 0, y: 0 },
    d = On(a.masterSeed).fork(`enc:${o}:${a.towerState.record.totalDives}`);
  let h = s.save;
  const v = s.floor.generated,
    g = Ur(v, r.x, r.y)[0] ?? 'N';
  return (
    (h = {
      ...h,
      diveState: {
        ...h.diveState,
        depth: o,
        pos: { x: r.x, y: r.y },
        dir: g,
        encounter: { stepsUntilEncounter: qr(d) },
        pendingFoeBattle: null,
      },
    }),
    hs(h, o, r.x, r.y)
  );
}
function wi(a) {
  return { ...a, diveState: null };
}
function tS(a) {
  const i = Math.floor((a - 1) / 10);
  return Object.values(Ll)
    .filter((o) => o.tierBand === i && !o.isBoss)
    .map((o) => o.id);
}
function lS(a, i) {
  const o = tS(a);
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
function nS() {
  return Object.values(Ma)
    .filter((a) => a.unlockedByDefault)
    .map((a) => a.id);
}
const us = 2,
  aS = { autoMap: 'on', bgmVolume: 0.6, seVolume: 0.6 };
function gp() {
  return { monsters: {}, items: {} };
}
function iS() {
  return { deepestReached: 0, highestBossDefeated: 0, totalDives: 0, bossDefeatLog: [] };
}
const uS = () => ({ weapon: null, armor: null, accessory: null });
function sS() {
  return `char_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function vy(a) {
  var v;
  const { raceId: i, classId: o, name: s, id: r } = a;
  if (!Pt[i]) throw new Error(`createCharacter: 未定義の種族 "${i}"`);
  if (!_t[o]) throw new Error(`createCharacter: 未定義の職業 "${o}"`);
  const d = (v = _t[o].skillTree.skills[0]) == null ? void 0 : v.skillId,
    h = d ? { [d]: 1 } : {};
  return {
    id: r ?? sS(),
    name: s,
    raceId: i,
    classId: o,
    titleId: null,
    level: 1,
    exp: 0,
    skillPoints: { total: 0, spent: 0 },
    learnedSkills: h,
    equipment: uS(),
  };
}
function cS() {
  return { front: Array(_s).fill(null), back: Array(vs).fill(null) };
}
function oS(a, i) {
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
function rS(a, i) {
  return a.guild.members.length >= or
    ? a
    : {
        ...a,
        guild: { ...a.guild, members: [...a.guild.members, i], party: oS(a.guild.party, i.id) },
      };
}
function fS(a) {
  return {
    schemaVersion: us,
    savedAt: 0,
    masterSeed: Q1(),
    settings: { ...aS },
    guild: {
      name: a,
      gold: Pb,
      members: [],
      party: cS(),
      storage: [],
      equipment: [],
      foodStorage: [],
      bestiary: gp(),
    },
    towerState: { floors: {}, bossGates: {}, warp: { unlockedCheckpoints: [] }, record: iS() },
    diveState: null,
    bestiary: gp(),
    playerMaps: {},
    exploredCells: {},
    forgeInventory: { fragments: {}, ingots: { copper: 0, silver: 0, gold: 0 } },
    shopStock: { unlockedTier: 0, unlockedItemIds: [] },
    unlockedRecipeIds: nS(),
    flags: {},
  };
}
const dr = (a, i) => i.some((o) => a instanceof o);
let _p, vp;
function dS() {
  return _p || (_p = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function mS() {
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
function hS(a) {
  const i = new Promise((o, s) => {
    const r = () => {
        (a.removeEventListener('success', d), a.removeEventListener('error', h));
      },
      d = () => {
        (o(Rn(a.result)), r());
      },
      h = () => {
        (s(a.error), r());
      };
    (a.addEventListener('success', d), a.addEventListener('error', h));
  });
  return (Ss.set(i, a), i);
}
function pS(a) {
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
    return Rn(a[i]);
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
function yS(a) {
  return mS().includes(a)
    ? function (...i) {
        return (a.apply(pr(this), i), Rn(this.request));
      }
    : function (...i) {
        return Rn(a.apply(pr(this), i));
      };
}
function gS(a) {
  return typeof a == 'function'
    ? yS(a)
    : (a instanceof IDBTransaction && pS(a), dr(a, dS()) ? new Proxy(a, hr) : a);
}
function Rn(a) {
  if (a instanceof IDBRequest) return hS(a);
  if (tr.has(a)) return tr.get(a);
  const i = gS(a);
  return (i !== a && (tr.set(a, i), Ss.set(i, a)), i);
}
const pr = (a) => Ss.get(a);
function _S(a, i, { blocked: o, upgrade: s, blocking: r, terminated: d } = {}) {
  const h = indexedDB.open(a, i),
    v = Rn(h);
  return (
    s &&
      h.addEventListener('upgradeneeded', (g) => {
        s(Rn(h.result), g.oldVersion, g.newVersion, Rn(h.transaction), g);
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
const vS = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  bS = ['put', 'add', 'delete', 'clear'],
  lr = new Map();
function bp(a, i) {
  if (!(a instanceof IDBDatabase && !(i in a) && typeof i == 'string')) return;
  if (lr.get(i)) return lr.get(i);
  const o = i.replace(/FromIndex$/, ''),
    s = i !== o,
    r = bS.includes(o);
  if (!(o in (s ? IDBIndex : IDBObjectStore).prototype) || !(r || vS.includes(o))) return;
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
const SS = ['continue', 'continuePrimaryKey', 'advance'],
  Sp = {},
  yr = new WeakMap(),
  Sy = new WeakMap(),
  xS = {
    get(a, i) {
      if (!SS.includes(i)) return a[i];
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
async function* kS(...a) {
  let i = this;
  if ((i instanceof IDBCursor || (i = await i.openCursor(...a)), !i)) return;
  i = i;
  const o = new Proxy(i, xS);
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
    return xp(i, o) ? kS : a.get(i, o, s);
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
function CS(a) {
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
  return CS(o)
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
function kp() {
  return {
    guildName: '(破損データ)',
    deepestReached: 0,
    memberCount: 0,
    savedAt: 0,
    corrupted: !0,
  };
}
const jS = 'sekaiju-like-game',
  MS = 1,
  Ri = 'saves',
  Gr = 'main';
let ar = null;
function Yr() {
  return (
    ar ||
      (ar = _S(jS, MS, {
        upgrade(a) {
          a.objectStoreNames.contains(Ri) || a.createObjectStore(Ri);
        },
      })),
    ar
  );
}
async function ir(a) {
  const i = { ...a, savedAt: Date.now() };
  return (await (await Yr()).put(Ri, NS(i), Gr), i);
}
async function wS() {
  const i = await (await Yr()).get(Ri, Gr);
  return i === void 0 ? { ok: !1, reason: 'empty' } : xy(i);
}
async function RS() {
  const i = await (await Yr()).get(Ri, Gr);
  if (i === void 0) return null;
  const o = xy(i);
  if (!o.ok) return kp();
  try {
    return AS(o.data);
  } catch {
    return kp();
  }
}
const ky = { save: null, saving: !1 };
function OS(a, i) {
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
      return { ...ky };
  }
}
const Ey = E.createContext(null);
function DS(a) {
  const i = E.useRef(a);
  return ((i.current = a), i);
}
function zS({ children: a }) {
  const [i, o] = E.useReducer(OS, ky),
    s = DS(i),
    r = E.useCallback(async (b) => {
      const x = fS(b),
        w = await ir(x);
      o({ type: 'load', save: w });
    }, []),
    d = E.useCallback(async () => {
      const b = await wS();
      return b.ok ? (o({ type: 'load', save: b.data }), { ok: !0 }) : { ok: !1, reason: b.reason };
    }, []),
    h = E.useCallback((b) => {
      o({ type: 'updateSave', updater: b });
    }, []),
    v = E.useCallback(
      async (b) => {
        const x = s.current.save;
        if (!x) return;
        const w = b(x);
        (o({ type: 'setSave', save: w }), o({ type: 'saving', saving: !0 }));
        try {
          const S = await ir(w);
          o({ type: 'setSave', save: S });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      },
      [s]
    ),
    g = E.useCallback(async () => {
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
    y = E.useCallback(() => {
      o({ type: 'clear' });
    }, []),
    _ = E.useMemo(
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
  return m.jsx(Ey.Provider, { value: _, children: a });
}
function ql() {
  const a = E.useContext(Ey);
  if (!a) throw new Error('useGameState は GameStateProvider の内側で使ってください');
  return a;
}
const BS = () => {
    var ut, Ve;
    const a = cl(),
      { save: i, applyAndPersist: o } = ql(),
      s = E.useRef(null),
      [r, d] = E.useState(null),
      [h, v] = E.useState({}),
      [g, y] = E.useState(null),
      [_, b] = E.useState(!1),
      [x, w] = E.useState(!1),
      [S, R] = E.useState(null),
      [j, C] = E.useState(!1),
      [N, I] = E.useState(null),
      [P, ee] = E.useState(null);
    E.useEffect(() => {
      if (r || !(i != null && i.diveState)) return;
      const Y = i.diveState.depth,
        oe = (i.masterSeed ^ (Y * 2654435761) ^ (i.towerState.record.totalDives * 40503)) >>> 0;
      s.current = On(oe);
      const de = i.diveState.pendingFoeBattle;
      d(de ? op(i, [de.enemyId], de.firstStrike) : op(i, lS(Y, s.current)));
    }, [i, r]);
    const V = E.useRef(!1);
    E.useEffect(() => {
      !r ||
        !s.current ||
        V.current ||
        (r.turn === 1 &&
          r.firstStrike === 'ambush' &&
          r.outcome === 'ongoing' &&
          ((V.current = !0), d(Po(r, [], s.current))));
    }, [r]);
    const H = E.useMemo(() => (r == null ? void 0 : r.enemies.filter((Y) => !Y.isDown)) ?? [], [r]),
      q = E.useMemo(() => (r == null ? void 0 : r.allies.filter((Y) => !Y.isDown)) ?? [], [r]);
    (E.useEffect(() => {
      H.length > 0 && !H.some((Y) => Y.id === S) && R(H[0].id);
    }, [H, S]),
      E.useEffect(() => {
        if ((r == null ? void 0 : r.outcome) !== 'ongoing' || (g && q.some((oe) => oe.id === g)))
          return;
        const Y = q.find((oe) => !h[oe.id]) ?? null;
        y(Y ? Y.id : null);
      }, [r, q, g, h]));
    const Q = q.length > 0 && q.every((Y) => h[Y.id] !== void 0),
      ae = E.useCallback(
        (Y, oe) => {
          const de = { ...h, [Y]: oe };
          (v(de), b(!1), w(!1));
          const we = q.find((Ee) => Ee.id !== Y && !de[Ee.id]);
          y(we ? we.id : null);
        },
        [h, q]
      ),
      ue = E.useCallback(
        async (Y) => {
          C(!0);
          const oe = Y.outcome === 'win';
          Y.outcome === 'lose'
            ? (await o((de) => wi(dp(de, Y))), a('/town'))
            : (await o((de) => W1(dp(de, Y), oe)), a('/dungeon'));
        },
        [o, a]
      ),
      ce = E.useCallback(() => {
        var Y;
        (v({}), b(!1), w(!1), I(null), ee(null), y(((Y = q[0]) == null ? void 0 : Y.id) ?? null));
      }, [q]),
      K = E.useCallback(() => {
        var we;
        if (!r || !s.current || r.outcome !== 'ongoing') return;
        const Y = S ?? ((we = H[0]) == null ? void 0 : we.id) ?? '',
          oe = q.map((Ee) => {
            const bt = h[Ee.id] ?? { kind: 'attack' };
            return bt.kind === 'guard'
              ? { kind: 'guard', actorId: Ee.id }
              : bt.kind === 'skill'
                ? { kind: 'skill', actorId: Ee.id, skillId: bt.skillId, targetId: Y }
                : bt.kind === 'item'
                  ? { kind: 'item', actorId: Ee.id, itemId: bt.itemId, targetId: Ee.id }
                  : { kind: 'attack', actorId: Ee.id, targetId: Y };
          });
        if (N) {
          const Ee = xa[N.unionSkillId],
            bt =
              (Ee == null ? void 0 : Ee.target) === 'enemyOne' ||
              (Ee == null ? void 0 : Ee.target) === 'enemyRow' ||
              (Ee == null ? void 0 : Ee.target) === 'enemyAll';
          oe.unshift({ kind: 'union', ...N, targetId: bt ? Y : N.targetId });
        }
        const de = Po(r, oe, s.current);
        (d(de), v({}), b(!1), w(!1), I(null), ee(null), y(null));
      }, [r, h, S, q, H, N]),
      J = E.useCallback(() => {
        if (!r || !s.current || r.outcome !== 'ongoing') return;
        const Y = q[0];
        Y && (d(Po(r, [{ kind: 'flee', actorId: Y.id }], s.current)), v({}), y(null));
      }, [r, q]);
    if (!i || !i.diveState) return m.jsx(ul, { to: '/town', replace: !0 });
    if (!r) return m.jsx('div', { className: F.layout, children: '戦闘準備中...' });
    const he = (Y) => {
        const oe = i.guild.members.find((de) => de.id === Y.id);
        return oe
          ? Object.keys(oe.learnedSkills).filter((de) => de in dn && Y.tp >= dn[de].tpCost(1))
          : [];
      },
      L = () => {
        const Y = (de) =>
            Object.values(h).filter((we) => we.kind === 'item' && we.itemId === de).length,
          oe = (de) => r.consumedItems.filter((we) => we === de).length;
        return i.guild.storage
          .filter((de) => {
            var we, Ee;
            return (Ee = (we = et[de.itemId]) == null ? void 0 : we.useContext) == null
              ? void 0
              : Ee.includes('battle');
          })
          .map((de) => ({
            id: de.itemId,
            remaining: Pp(i, de.itemId) - oe(de.itemId) - Y(de.itemId),
          }))
          .filter((de) => de.remaining > 0);
      },
      Z = (Y) => {
        var de, we;
        const oe = h[Y.id];
        return oe
          ? oe.kind === 'attack'
            ? '攻撃'
            : oe.kind === 'guard'
              ? '防御'
              : oe.kind === 'item'
                ? (((de = et[oe.itemId]) == null ? void 0 : de.name) ?? 'どうぐ')
                : (((we = dn[oe.skillId]) == null ? void 0 : we.name) ?? 'スキル')
          : '';
      },
      te = (Y) => {
        const oe = (we) => we === 'headBind' || we === 'armBind' || we === 'legBind';
        let de = '';
        return (
          Y.ailments.some((we) => oe(we.type)) && (de += ' 🔒'),
          Y.ailments.some((we) => !oe(we.type)) && (de += ' 🌀'),
          de
        );
      },
      ge = (Y) => {
        var we;
        const oe = i.guild.members.find((Ee) => Ee.id === Y.id);
        if (!oe) return null;
        const de =
          (we = Pt[oe.raceId]) == null
            ? void 0
            : we.raceSkillTree.skills.find((Ee) => Ee.skillId in xa);
        return !de || !(de.skillId in oe.learnedSkills) ? null : (xa[de.skillId] ?? null);
      },
      ke = (Y, oe, de) => {
        var bt;
        const Ee =
          oe.target === 'enemyOne' || oe.target === 'enemyRow' || oe.target === 'enemyAll'
            ? (S ?? ((bt = H[0]) == null ? void 0 : bt.id) ?? '')
            : Y;
        (I({ actorId: Y, unionSkillId: oe.id, participantIds: de, targetId: Ee }), ee(null));
      },
      A = (Y, oe) => {
        oe.requiredParticipants <= 1 ? ke(Y.id, oe, [Y.id]) : ee({ actorId: Y.id, def: oe });
      },
      G = g ? q.find((Y) => Y.id === g) : void 0,
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
              (y(Y.id), b(!1), w(!1));
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
              h[Y.id] ? m.jsxs('div', { className: F.cardCmd, children: ['▶ ', Z(Y)] }) : null,
            ],
          },
          Y.id
        ),
      be = r.allies.filter((Y) => Y.row === 'front'),
      Ae = r.allies.filter((Y) => Y.row === 'back');
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
                onClick: () => R(Y.id),
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
                Ae.length > 0
                  ? Ae.map(pe)
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
                N
                  ? m.jsxs('div', {
                      className: F.unionBanner,
                      children: [
                        '⚡ ユニオン予約: ',
                        (Ve = xa[N.unionSkillId]) == null ? void 0 : Ve.name,
                        m.jsx('button', {
                          type: 'button',
                          className: F.unionCancel,
                          onClick: () => I(null),
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
                                            ((oe = Ar[Y]) == null ? void 0 : oe.description) ?? '',
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
                                    onClick: () => w(!1),
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
                                    q
                                      .filter((Y) => Y.id !== P.actorId)
                                      .map((Y) =>
                                        m.jsx(
                                          'button',
                                          {
                                            type: 'button',
                                            className: F.skillBtn,
                                            onClick: () => ke(P.actorId, P.def, [P.actorId, Y.id]),
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
                                    q.filter((Y) => Y.id !== P.actorId).length === 0
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
                                      onClick: () => w(!0),
                                      children: 'どうぐ',
                                    }),
                                    (() => {
                                      const Y = ge(G);
                                      return !Y || G.unionGauge < 100 || N
                                        ? null
                                        : m.jsx('button', {
                                            type: 'button',
                                            className: `${F.menuBtn} ${F.unionBtn}`,
                                            onClick: () => A(G, Y),
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
                          disabled: !Q,
                          onClick: K,
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
  LS = '_layout_iunlg_1',
  qS = '_head_iunlg_11',
  US = '_title_iunlg_15',
  HS = '_tabs_iunlg_21',
  GS = '_tab_iunlg_21',
  YS = '_tabActive_iunlg_38',
  $S = '_records_iunlg_43',
  XS = '_statBig_iunlg_48',
  VS = '_statNum_iunlg_60',
  IS = '_statLabel_iunlg_67',
  QS = '_statList_iunlg_72',
  ZS = '_statRow_iunlg_76',
  KS = '_h2_iunlg_91',
  JS = '_bossLog_iunlg_97',
  WS = '_bossRow_iunlg_106',
  FS = '_codex_iunlg_114',
  PS = '_codexSummary_iunlg_121',
  ex = '_list_iunlg_127',
  tx = '_row_iunlg_133',
  lx = '_unseen_iunlg_140',
  nx = '_info_iunlg_144',
  ax = '_name_iunlg_150',
  ix = '_badge_iunlg_158',
  ux = '_sub_iunlg_167',
  sx = '_empty_iunlg_172',
  cx = '_foot_iunlg_177',
  ox = '_back_iunlg_181',
  Oe = {
    layout: LS,
    head: qS,
    title: US,
    tabs: HS,
    tab: GS,
    tabActive: YS,
    records: $S,
    statBig: XS,
    statNum: VS,
    statLabel: IS,
    statList: QS,
    statRow: ZS,
    h2: KS,
    bossLog: JS,
    bossRow: WS,
    codex: FS,
    codexSummary: PS,
    list: ex,
    row: tx,
    unseen: lx,
    info: nx,
    name: ax,
    badge: ix,
    sub: ux,
    empty: sx,
    foot: cx,
    back: ox,
  };
function Ty(a) {
  const i = a.bestiary.monsters;
  return Object.values(Ll)
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
function rx(a) {
  const i = Ty(a),
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
const fx = () => {
    const a = cl(),
      { save: i } = ql(),
      [o, s] = E.useState('record');
    if (!i) return m.jsx(ul, { to: '/title', replace: !0 });
    const r = i.towerState.record,
      d = rx(i),
      h = Ty(i);
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
  dx = '_layout_1395s_1',
  mx = '_head_1395s_13',
  hx = '_depth_1395s_22',
  px = '_theme_1395s_28',
  yx = '_fpvWrap_1395s_45',
  gx = '_mapWrap_1395s_51',
  _x = '_palette_1395s_58',
  vx = '_tool_1395s_68',
  bx = '_toolActive_1395s_79',
  Sx = '_paletteHint_1395s_85',
  xx = '_stairs_1395s_94',
  kx = '_action_1395s_108',
  Ex = '_notice_1395s_125',
  Tx = '_controls_1395s_133',
  Nx = '_row_1395s_143',
  Cx = '_forward_1395s_149',
  Ax = '_turn_1395s_164',
  jx = '_back_1395s_178',
  Mx = '_itemOverlay_1395s_189',
  wx = '_itemPanel_1395s_199',
  Rx = '_itemTitle_1395s_212',
  Ox = '_itemEmpty_1395s_217',
  Dx = '_itemRow_1395s_223',
  zx = '_itemName_1395s_231',
  Bx = '_itemDesc_1395s_239',
  Lx = '_itemTargets_1395s_245',
  qx = '_itemTarget_1395s_245',
  Ux = '_itemHp_1395s_265',
  Hx = '_itemUse_1395s_271',
  Gx = '_itemClose_1395s_288',
  me = {
    layout: dx,
    head: mx,
    depth: hx,
    theme: px,
    return: '_return_1395s_34',
    fpvWrap: yx,
    mapWrap: gx,
    palette: _x,
    tool: vx,
    toolActive: bx,
    paletteHint: Sx,
    stairs: xx,
    action: kx,
    notice: Ex,
    controls: Tx,
    row: Nx,
    forward: Cx,
    turn: Ax,
    back: jx,
    itemOverlay: Mx,
    itemPanel: wx,
    itemTitle: Rx,
    itemEmpty: Ox,
    itemRow: Dx,
    itemName: zx,
    itemDesc: Bx,
    itemTargets: Lx,
    itemTarget: qx,
    itemHp: Ux,
    itemUse: Hx,
    itemClose: Gx,
  },
  Yx = '_canvas_1keax_1',
  $x = { canvas: Yx },
  Ny = [
    { id: 'icon_chest', symbol: '📦', label: '宝箱' },
    { id: 'icon_foe', symbol: '👹', label: '強敵(FOE)' },
    { id: 'icon_warning', symbol: '⚠️', label: '注意' },
    { id: 'icon_door', symbol: '🚪', label: '扉/近道' },
    { id: 'icon_gather', symbol: '⛏️', label: '採集' },
    { id: 'icon_event', symbol: '❗', label: 'イベント' },
    { id: 'icon_note', symbol: '📝', label: 'メモ' },
    { id: 'icon_star', symbol: '⭐', label: '任意' },
  ],
  Xx = new Map(Ny.map((a) => [a.id, a]));
function Vx(a) {
  var i;
  return ((i = Xx.get(a)) == null ? void 0 : i.symbol) ?? '•';
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
  Ix = ({
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
    const y = E.useRef(null),
      _ = Math.max(10, Math.min(v, Math.floor(360 / a.width))),
      b = a.width * _,
      x = a.height * _;
    E.useEffect(() => {
      const S = y.current;
      if (!S) return;
      const R = new Set(i),
        j = new Set(h),
        C = window.devicePixelRatio || 1;
      ((S.width = b * C), (S.height = x * C));
      const N = S.getContext('2d');
      if (!N) return;
      (N.scale(C, C), N.clearRect(0, 0, b, x));
      for (let Q = 0; Q < a.height; Q++)
        for (let ae = 0; ae < a.width; ae++) {
          const ue = R.has(`${ae},${Q}`);
          ((N.fillStyle = ue ? Jt.floor : Jt.fog),
            N.fillRect(ae * _, Q * _, _, _),
            ue &&
              ((N.strokeStyle = Jt.grid),
              (N.lineWidth = 1),
              N.strokeRect(ae * _ + 0.5, Q * _ + 0.5, _ - 1, _ - 1)));
        }
      ((N.strokeStyle = Jt.wall), (N.lineWidth = 2), (N.lineCap = 'round'));
      const I = (Q, ae, ue, ce) => {
        (N.beginPath(), N.moveTo(Q, ae), N.lineTo(ue, ce), N.stroke());
      };
      for (let Q = 0; Q < a.height; Q++)
        for (let ae = 0; ae < a.width; ae++) {
          if (!R.has(`${ae},${Q}`)) continue;
          const ue = a.cells[Q][ae],
            ce = ae * _,
            K = Q * _;
          (ue.walls.N && I(ce, K, ce + _, K),
            ue.walls.S && I(ce, K + _, ce + _, K + _),
            ue.walls.W && I(ce, K, ce, K + _),
            ue.walls.E && I(ce + _, K, ce + _, K + _));
          const J = ue.event;
          if (
            (J == null ? void 0 : J.kind) === 'stairsUp' ||
            (J == null ? void 0 : J.kind) === 'stairsDown'
          )
            ((N.fillStyle = J.kind === 'stairsUp' ? Jt.stairsUp : Jt.stairsDown),
              N.beginPath(),
              N.arc(ce + _ / 2, K + _ / 2, _ * 0.28, 0, Math.PI * 2),
              N.fill(),
              (N.fillStyle = '#ffffff'),
              (N.font = `bold ${Math.floor(_ * 0.5)}px sans-serif`),
              (N.textAlign = 'center'),
              (N.textBaseline = 'middle'),
              N.fillText(J.kind === 'stairsUp' ? '▲' : '▼', ce + _ / 2, K + _ / 2 + 1));
          else if ((J == null ? void 0 : J.kind) === 'gather') {
            const he = j.has(`${ae},${Q}`);
            ((N.fillStyle = he ? Jt.gatherDone : Jt.gather),
              N.beginPath(),
              N.arc(ce + _ / 2, K + _ / 2, _ * 0.24, 0, Math.PI * 2),
              N.fill());
          } else
            (J == null ? void 0 : J.kind) === 'cookingSpot' &&
              ((N.fillStyle = Jt.cooking),
              N.fillRect(ce + _ * 0.28, K + _ * 0.28, _ * 0.44, _ * 0.44));
        }
      ((N.font = `${Math.floor(_ * 0.66)}px sans-serif`),
        (N.textAlign = 'center'),
        (N.textBaseline = 'middle'));
      for (const Q of r)
        R.has(`${Q.x},${Q.y}`) && N.fillText(Vx(Q.iconId), Q.x * _ + _ / 2, Q.y * _ + _ / 2 + 1);
      for (const Q of d) {
        if (!R.has(`${Q.x},${Q.y}`)) continue;
        const ae = Q.x * _ + _ / 2,
          ue = Q.y * _ + _ / 2;
        ((N.fillStyle = Q.alerted ? Jt.foeAlert : Jt.foe),
          N.beginPath(),
          N.arc(ae, ue, _ * 0.3, 0, Math.PI * 2),
          N.fill(),
          (N.fillStyle = '#ffffff'),
          (N.font = `bold ${Math.floor(_ * 0.5)}px sans-serif`),
          (N.textAlign = 'center'),
          (N.textBaseline = 'middle'),
          N.fillText('!', ae, ue + 1));
      }
      const P = o.x * _ + _ / 2,
        ee = o.y * _ + _ / 2,
        V = _ * 0.34,
        q = { N: -Math.PI / 2, E: 0, S: Math.PI / 2, W: Math.PI }[s];
      ((N.fillStyle = Jt.player),
        N.beginPath(),
        N.moveTo(P + Math.cos(q) * V, ee + Math.sin(q) * V),
        N.lineTo(P + Math.cos(q + 2.5) * V, ee + Math.sin(q + 2.5) * V),
        N.lineTo(P + Math.cos(q - 2.5) * V, ee + Math.sin(q - 2.5) * V),
        N.closePath(),
        N.fill());
    }, [a, i, o, s, r, d, h, _, b, x]);
    const w = (S) => {
      if (!g) return;
      const R = S.currentTarget.getBoundingClientRect(),
        j = Math.floor(((S.clientX - R.left) / R.width) * a.width),
        C = Math.floor(((S.clientY - R.top) / R.height) * a.height);
      j >= 0 && C >= 0 && j < a.width && C < a.height && g(j, C);
    };
    return m.jsx('canvas', {
      ref: y,
      className: $x.canvas,
      style: { width: b, height: x },
      onClick: w,
    });
  },
  Qx = '_gauge_1o2hx_1',
  Zx = '_icon_1o2hx_11',
  Kx = '_segments_1o2hx_16',
  Jx = '_seg_1o2hx_16',
  Wx = '_filled_1o2hx_28',
  Fx = '_danger_1o2hx_32',
  va = { gauge: Qx, icon: Zx, segments: Kx, seg: Jx, filled: Wx, danger: Fx },
  Px = ({ level: a }) => {
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
  e2 = '_view_tw2v9_1',
  t2 = { view: e2 },
  Ep = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } };
function l2(a, i, o, s = 4) {
  const r = dy(o),
    d = fy(o),
    h = [];
  let { x: v, y: g } = i;
  for (let y = 0; y < s; y++) {
    const _ = ka(a, v, g, o);
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
const n2 = {
    sky: '#26301c',
    ceiling: '#3a4a2c',
    floor: '#5d6b46',
    wall: '#8b9a6b',
    frontWall: '#7a8a5c',
    outline: '#2c3720',
  },
  a2 = 0.56,
  i2 = ({
    floor: a,
    pos: i,
    dir: o,
    foes: s = [],
    theme: r,
    maxDepth: d = 4,
    width: h = 358,
    height: v = 200,
  }) => {
    const g = E.useRef(null);
    return (
      E.useEffect(() => {
        const y = { ...n2, ...(r ?? {}) },
          _ = g.current;
        if (!_) return;
        const b = window.devicePixelRatio || 1;
        ((_.width = h * b), (_.height = v * b));
        const x = _.getContext('2d');
        if (!x) return;
        x.scale(b, b);
        const w = h,
          S = v,
          R = w / 2,
          j = S / 2,
          C = l2(a, i, o, d),
          N = (ee) => {
            const V = Math.pow(a2, ee);
            return {
              l: R - (w / 2) * V,
              r: R + (w / 2) * V,
              t: j - (S / 2) * V,
              b: j + (S / 2) * V,
            };
          },
          I = (ee, V, H = !1) => {
            (x.beginPath(), x.moveTo(ee[0][0], ee[0][1]));
            for (let q = 1; q < ee.length; q++) x.lineTo(ee[q][0], ee[q][1]);
            (x.closePath(),
              (x.fillStyle = V),
              x.fill(),
              H && ((x.strokeStyle = y.outline), (x.lineWidth = 1), x.stroke()));
          },
          P = (ee) => `rgba(0,0,0,${Math.min(0.5, ee * 0.13)})`;
        ((x.fillStyle = y.sky), x.fillRect(0, 0, w, S));
        for (let ee = C.length - 1; ee >= 0; ee--) {
          const V = N(ee),
            H = N(ee + 1),
            q = C[ee];
          (I(
            [
              [V.l, V.t],
              [V.r, V.t],
              [H.r, H.t],
              [H.l, H.t],
            ],
            y.ceiling
          ),
            I(
              [
                [V.l, V.b],
                [V.r, V.b],
                [H.r, H.b],
                [H.l, H.b],
              ],
              y.floor
            ),
            I(
              [
                [V.l, V.t],
                [H.l, H.t],
                [H.l, H.b],
                [V.l, V.b],
              ],
              q.leftOpen ? y.sky : y.wall,
              !0
            ),
            I(
              [
                [V.r, V.t],
                [H.r, H.t],
                [H.r, H.b],
                [V.r, V.b],
              ],
              q.rightOpen ? y.sky : y.wall,
              !0
            ),
            q.frontOpen ||
              I(
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
          const Q = q.event;
          if (
            (Q == null ? void 0 : Q.kind) === 'stairsUp' ||
            (Q == null ? void 0 : Q.kind) === 'stairsDown'
          ) {
            const ae = R,
              ue = (V.b + H.b) / 2 - (V.b - H.b) * 0.15,
              ce = Math.max(12, (V.b - V.t) * 0.18);
            ((x.fillStyle = Q.kind === 'stairsUp' ? '#e8923a' : '#7aa2d6'),
              x.beginPath(),
              x.arc(ae, ue, ce, 0, Math.PI * 2),
              x.fill(),
              (x.fillStyle = '#fff'),
              (x.font = `bold ${Math.floor(ce * 1.2)}px sans-serif`),
              (x.textAlign = 'center'),
              (x.textBaseline = 'middle'),
              x.fillText(Q.kind === 'stairsUp' ? '▲' : '▼', ae, ue + 1));
          }
          if (ee > 0 && s.some((ae) => ae.x === q.x && ae.y === q.y)) {
            const ae = s.some((J) => J.x === q.x && J.y === q.y && J.alerted),
              ue = R,
              ce = (V.b + H.b) / 2 - (V.b - H.b) * 0.1,
              K = Math.max(14, (V.b - V.t) * 0.22);
            ((x.fillStyle = ae ? '#d32f2f' : '#b0533a'),
              x.beginPath(),
              x.arc(ue, ce, K, 0, Math.PI * 2),
              x.fill(),
              (x.fillStyle = '#fff'),
              (x.font = `bold ${Math.floor(K * 1.3)}px sans-serif`),
              (x.textAlign = 'center'),
              (x.textBaseline = 'middle'),
              x.fillText('!', ue, ce + 1));
          }
        }
      }, [a, i, o, s, r, d, h, v]),
      m.jsx('canvas', { ref: g, className: t2.view, style: { width: h, height: v } })
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
function u2(a) {
  var s, r, d;
  const i = a.diveState;
  if (!i) return !1;
  const o =
    (r = (s = a.towerState.floors[i.depth]) == null ? void 0 : s.generated.cells[i.pos.y]) == null
      ? void 0
      : r[i.pos.x];
  return ((d = o == null ? void 0 : o.event) == null ? void 0 : d.kind) === 'cookingSpot';
}
function s2(a) {
  const i = new Set(a.unlockedRecipeIds ?? []);
  return Object.values(Ma).filter((o) => i.has(o.id));
}
function Cy(a, i) {
  const o = Ma[i];
  return !o || !(a.unlockedRecipeIds ?? []).includes(i)
    ? !1
    : o.ingredients.every((s) => Rr(a, s.itemId) >= s.qty);
}
function c2(a, i) {
  if (!Cy(a, i)) return { ok: !1, save: a };
  const o = Ma[i];
  let s = a;
  for (const r of o.ingredients) s = ny(s, r.itemId, r.qty);
  return ((s = ly(s, o.result.itemId, o.result.count)), { ok: !0, save: s });
}
function Ay(a, i) {
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
function Np(a, i) {
  return Ay(a, wn[i.type].requiredSkillId);
}
function o2(a, i) {
  const o = a.reduce((r, d) => r + d.weight, 0);
  let s = i.next() * o;
  for (const r of a) if (((s -= r.weight), s < 0)) return r.itemId;
  return a[a.length - 1].itemId;
}
function r2(a, i) {
  const o = a.diveState;
  if (!o) return { ok: !1, save: a, reason: 'noDive' };
  const s = jy(a);
  if (!s) return { ok: !1, save: a, reason: 'noPoint' };
  if (gr(a, s)) return { ok: !1, save: a, reason: 'depleted' };
  const r = wn[s.type];
  if (!Ay(a, r.requiredSkillId)) return { ok: !1, save: a, reason: 'noSkill' };
  if (r.food && ty(a) >= ey) return { ok: !1, save: a, reason: 'foodFull' };
  const d = o2(r.drops, i);
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
function f2(a, i, o) {
  var R;
  const s = et[i];
  if (!s) return { save: a, ok: !1, message: 'そのアイテムは無い' };
  if (!((R = s.useContext) != null && R.includes('field')))
    return { save: a, ok: !1, message: 'ここでは使えない' };
  const r = Fb(i);
  if ((r ? Rr(a, i) : Pp(a, i)) <= 0) return { save: a, ok: !1, message: '所持していない' };
  const h = (j) => (r ? ny(j, i, 1) : wr(j, i, 1));
  if (i === 'item_return_thread')
    return a.diveState
      ? { save: wi(h(a)), ok: !0, message: '拠点へ帰還した' }
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
  const w = a.diveState.party.map((j) => (j.charId === o ? { ...j, hp: _, tp: b } : j));
  return {
    save: h({ ...a, diveState: { ...a.diveState, party: w } }),
    ok: !0,
    message: `${g.name} に ${s.name} を使った`,
  };
}
function d2(a) {
  return { depth: a, floorPaint: [], wallDraw: [], icons: [], notes: [], autopilotRoutes: [] };
}
function m2(a, i) {
  return a.playerMaps[i] ?? d2(i);
}
function My(a, i, o) {
  return { ...a, playerMaps: { ...a.playerMaps, [i]: o } };
}
function h2(a, i, o, s, r) {
  const d = m2(a, i),
    h = d.icons.find((y) => y.x === o && y.y === s),
    v = d.icons.filter((y) => !(y.x === o && y.y === s)),
    g = (h == null ? void 0 : h.iconId) === r ? v : [...v, { x: o, y: s, iconId: r }];
  return My(a, i, { ...d, icons: g });
}
function p2(a, i, o, s) {
  const r = a.playerMaps[i];
  return r ? My(a, i, { ...r, icons: r.icons.filter((d) => !(d.x === o && d.y === s)) }) : a;
}
const y2 = () => {
    var ce;
    const a = cl(),
      { save: i, applySave: o, applyAndPersist: s } = ql(),
      r = E.useRef(null),
      [d, h] = E.useState(null),
      [v, g] = E.useState(!1),
      [y, _] = E.useState(!1),
      [b, x] = E.useState(null),
      w = (i == null ? void 0 : i.diveState) ?? null,
      S = E.useMemo(() => {
        var K;
        return i && w ? ((K = i.towerState.floors[w.depth]) == null ? void 0 : K.generated) : null;
      }, [i, w]),
      R = E.useMemo(() => {
        var K;
        return i && w
          ? (((K = i.towerState.floors[w.depth]) == null ? void 0 : K.foeRuntime) ?? [])
              .filter((J) => !J.defeated)
              .map((J) => ({ x: J.cell.x, y: J.cell.y, alerted: J.alerted }))
          : [];
      }, [i, w]),
      j = E.useMemo(() => (i ? jy(i) : null), [i]),
      C = E.useMemo(() => (i ? u2(i) : !1), [i]),
      N = E.useMemo(() => {
        var K;
        return i && w
          ? (((K = i.towerState.floors[w.depth]) == null ? void 0 : K.depletedGathers) ?? [])
          : [];
      }, [i, w]),
      I = E.useCallback(() => {
        var J;
        if (!i) return;
        r.current || (r.current = On((i.masterSeed ^ 2654435769) >>> 0));
        const K = r2(i, r.current);
        if (!K.ok) {
          x(
            K.reason === 'noSkill'
              ? '対応する採集スキルを持つ仲間がいない'
              : K.reason === 'foodFull'
                ? '食料がいっぱいで採れない'
                : '採集できない'
          );
          return;
        }
        (s(() => K.save),
          x(
            `${K.itemId ? (((J = et[K.itemId]) == null ? void 0 : J.name) ?? '素材') : '素材'} を手に入れた`
          ));
      }, [i, s]),
      P = E.useCallback(
        (K) => {
          var he;
          if (!i) return;
          const J = c2(i, K);
          J.ok &&
            (s(() => J.save), x(`${((he = Ma[K]) == null ? void 0 : he.name) ?? '料理'} を作った`));
        },
        [i, s]
      ),
      ee = E.useCallback(
        (K) => {
          if (!i) return;
          (x(null), r.current || (r.current = On((i.masterSeed ^ 2654435769) >>> 0)));
          const J = J1(i, K, r.current);
          (s(() => J.save), J.triggered && a('/battle'));
        },
        [i, s, a]
      ),
      V = E.useCallback(
        (K) => {
          o((J) => yy(J, K));
        },
        [o]
      ),
      H = E.useCallback(async () => {
        if (!i) return;
        const K = yp(i);
        if (K === 'stairsUp') {
          if (!_y(i, i.diveState.depth)) {
            x('強大な力に阻まれている。階層ボスを倒さねば先へ進めない。');
            return;
          }
          await s((J) => P1(J));
        } else
          K === 'stairsDown' &&
            (i.diveState.depth <= 1 ? (await s((J) => wi(J)), a('/town')) : await s((J) => eS(J)));
      }, [i, s, a]),
      q = E.useCallback(async () => {
        (await s((K) => wi(K)), a('/town'));
      }, [s, a]),
      Q = E.useCallback(
        (K, J) => {
          if (!i) return;
          const he = f2(i, K, J);
          he.ok && (s(() => he.save), he.save.diveState || (g(!1), a('/town')));
        },
        [i, s, a]
      ),
      ae = E.useCallback(
        (K, J) => {
          if (!w) return;
          const he = w.depth;
          if (d !== null) {
            if (!((i == null ? void 0 : i.exploredCells[he]) ?? []).includes(`${K},${J}`)) return;
            s(d === 'erase' ? (ke) => p2(ke, he, K, J) : (ke) => h2(ke, he, K, J, d));
            return;
          }
          const L = K - w.pos.x,
            Z = J - w.pos.y,
            te = ['N', 'E', 'S', 'W'].find((ge) => Ft[ge].dx === L && Ft[ge].dy === Z);
          te && ee(te);
        },
        [w, ee, d, i, s]
      );
    if (!i) return m.jsx(ul, { to: '/title', replace: !0 });
    if (!w || !S) return m.jsx(ul, { to: '/town', replace: !0 });
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
                w.depth,
                'F ',
                m.jsx('span', { className: me.theme, children: Tp(w.depth).name }),
              ],
            }),
            m.jsx(Px, { level: w1(w.encounter.stepsUntilEncounter) }),
            m.jsx('button', {
              type: 'button',
              className: me.return,
              onClick: () => g(!0),
              children: '道具',
            }),
            m.jsx('button', {
              type: 'button',
              className: me.return,
              onClick: () => void q(),
              children: '帰還',
            }),
          ],
        }),
        m.jsx('div', {
          className: me.fpvWrap,
          children: m.jsx(i2, { floor: S, pos: w.pos, dir: w.dir, foes: R, theme: Tp(w.depth) }),
        }),
        m.jsx('div', {
          className: me.mapWrap,
          children: m.jsx(Ix, {
            floor: S,
            explored: i.exploredCells[w.depth] ?? [],
            pos: w.pos,
            dir: w.dir,
            icons: ((ce = i.playerMaps[w.depth]) == null ? void 0 : ce.icons) ?? [],
            foes: R,
            depletedGathers: N,
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
            Ny.map((K) =>
              m.jsx(
                'button',
                {
                  type: 'button',
                  className: `${me.tool} ${d === K.id ? me.toolActive : ''}`,
                  onClick: () => h(K.id),
                  'aria-label': K.label,
                  children: K.symbol,
                },
                K.id
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
                : w.depth <= 1
                  ? '▼ 拠点へ戻る'
                  : '▼ 前の階へ戻る',
          }),
        j &&
          m.jsx('button', {
            type: 'button',
            className: me.action,
            disabled: gr(i, j) || !Np(i, j),
            onClick: I,
            children: gr(i, j)
              ? `🌿 ${wn[j.type].name}（採集済み）`
              : Np(i, j)
                ? `🌿 ${wn[j.type].name}する`
                : `🌿 ${wn[j.type].name}（スキル要）`,
          }),
        C &&
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
                  onClick: () => V(dy(w.dir)),
                  'aria-label': '左を向く',
                  children: '↰',
                }),
                m.jsx('button', {
                  type: 'button',
                  className: me.forward,
                  onClick: () => ee(w.dir),
                  children: '前進',
                }),
                m.jsx('button', {
                  type: 'button',
                  className: me.turn,
                  onClick: () => V(fy(w.dir)),
                  'aria-label': '右を向く',
                  children: '↱',
                }),
              ],
            }),
            m.jsx('button', {
              type: 'button',
              className: me.back,
              onClick: () => V(R1(w.dir)),
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
                onClick: (K) => K.stopPropagation(),
                children: [
                  m.jsx('div', { className: me.itemTitle, children: 'どうぐ・食料' }),
                  (() => {
                    const K = [...i.guild.storage, ...(i.guild.foodStorage ?? [])].filter((J) => {
                      var he, L;
                      return (
                        ((L = (he = et[J.itemId]) == null ? void 0 : he.useContext) == null
                          ? void 0
                          : L.includes('field')) && J.qty > 0
                      );
                    });
                    return K.length === 0
                      ? m.jsx('p', {
                          className: me.itemEmpty,
                          children: '使える道具がありません。',
                        })
                      : K.map((J) => {
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
                                      onClick: () => Q(J.itemId),
                                      children: '使う',
                                    })
                                  : m.jsx('div', {
                                      className: me.itemTargets,
                                      children: w.party.map((Z) => {
                                        const te = i.guild.members.find((ke) => ke.id === Z.charId);
                                        if (!te) return null;
                                        const ge = zi(te);
                                        return m.jsxs(
                                          'button',
                                          {
                                            type: 'button',
                                            className: me.itemTarget,
                                            onClick: () => Q(J.itemId, Z.charId),
                                            children: [
                                              te.name,
                                              m.jsxs('span', {
                                                className: me.itemHp,
                                                children: [
                                                  'HP ',
                                                  Z.hp,
                                                  '/',
                                                  ge.hp,
                                                  '・TP ',
                                                  Z.tp,
                                                  '/',
                                                  ge.tp,
                                                ],
                                              }),
                                            ],
                                          },
                                          Z.charId
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
                onClick: (K) => K.stopPropagation(),
                children: [
                  m.jsx('div', { className: me.itemTitle, children: '調理' }),
                  (() => {
                    const K = s2(i);
                    return K.length === 0
                      ? m.jsx('p', {
                          className: me.itemEmpty,
                          children: '作れるレシピがありません。',
                        })
                      : K.map((J) => {
                          var Z;
                          const he = Cy(i, J.id),
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
                                        ((Z = et[J.result.itemId]) == null ? void 0 : Z.name) ??
                                          J.result.itemId,
                                        '（所持',
                                        J.ingredients
                                          .map((te) => {
                                            var ge;
                                            return `${((ge = et[te.itemId]) == null ? void 0 : ge.name) ?? ''}${Rr(i, te.itemId)}`;
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
  g2 = '_layout_34t9v_1',
  _2 = '_head_34t9v_11',
  v2 = '_title_34t9v_18',
  b2 = '_stock_34t9v_24',
  S2 = '_tabs_34t9v_29',
  x2 = '_tab_34t9v_29',
  k2 = '_tabActive_34t9v_46',
  E2 = '_hint_34t9v_51',
  T2 = '_list_34t9v_57',
  N2 = '_row_34t9v_65',
  C2 = '_info_34t9v_76',
  A2 = '_name_34t9v_82',
  j2 = '_note_34t9v_87',
  M2 = '_actions_34t9v_92',
  w2 = '_ingot_34t9v_97',
  R2 = '_recycle_34t9v_114',
  O2 = '_maxed_34t9v_126',
  D2 = '_empty_34t9v_132',
  z2 = '_foot_34t9v_137',
  B2 = '_back_34t9v_141',
  We = {
    layout: g2,
    head: _2,
    title: v2,
    stock: b2,
    tabs: S2,
    tab: x2,
    tabActive: k2,
    hint: E2,
    list: T2,
    row: N2,
    info: C2,
    name: A2,
    note: j2,
    actions: M2,
    ingot: w2,
    recycle: R2,
    maxed: O2,
    empty: D2,
    foot: z2,
    back: B2,
  },
  L2 = () => {
    const a = cl(),
      { save: i, applyAndPersist: o } = ql(),
      [s, r] = E.useState('forge');
    if (!i) return m.jsx(ul, { to: '/title', replace: !0 });
    const { copper: d, silver: h, gold: v } = i.forgeInventory.ingots,
      g = i.forgeInventory.fragments.common ?? 0,
      y = i.guild.equipment,
      _ = (b, x, w, S) =>
        m.jsxs('button', {
          type: 'button',
          className: We.ingot,
          disabled: S <= 0,
          onClick: () => void o((R) => o1(R, b, x).save),
          children: [w, '+', hl.INGOT_INC[x], '（', S, '）'],
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
                    w = b.forgeLevel >= hl.MAX_LEVEL;
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
                              children: w
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
                              children: ['分解（断片+', hl.RECYCLE_FRAGMENTS, '）'],
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
  q2 = '_layout_16au8_2',
  U2 = '_head_16au8_13',
  H2 = '_title_16au8_20',
  G2 = '_count_16au8_26',
  Y2 = '_create_16au8_31',
  $2 = '_sectionTitle_16au8_42',
  X2 = '_field_16au8_48',
  V2 = '_primary_16au8_64',
  I2 = '_list_16au8_79',
  Q2 = '_empty_16au8_83',
  Z2 = '_members_16au8_88',
  K2 = '_member_16au8_88',
  J2 = '_memberMain_16au8_107',
  W2 = '_memberName_16au8_119',
  F2 = '_pos_16au8_127',
  P2 = '_memberSub_16au8_144',
  ek = '_posBtns_16au8_149',
  tk = '_posBtn_16au8_149',
  lk = '_posBtnActive_16au8_164',
  nk = '_foot_16au8_170',
  ak = '_sub_16au8_174',
  De = {
    layout: q2,
    head: U2,
    title: H2,
    count: G2,
    create: Y2,
    sectionTitle: $2,
    field: X2,
    primary: V2,
    list: I2,
    empty: Q2,
    members: Z2,
    member: K2,
    memberMain: J2,
    memberName: W2,
    pos: F2,
    pos_前衛: '_pos_前衛_16au8_136',
    pos_後衛: '_pos_後衛_16au8_140',
    memberSub: P2,
    posBtns: ek,
    posBtn: tk,
    posBtnActive: lk,
    foot: nk,
    sub: ak,
  };
function ik(a) {
  return [...a.guild.party.front, ...a.guild.party.back].filter((i) => i !== null).length;
}
const wy = (a) => (a === 'front' ? _s : vs);
function uk(a, i, o, s) {
  if (o < 0 || o >= wy(i) || (s !== null && !a.guild.members.some((h) => h.id === s))) return a;
  const r = a.guild.party.front.map((h) => (h === s ? null : h)),
    d = a.guild.party.back.map((h) => (h === s ? null : h));
  for (; r.length < _s; ) r.push(null);
  for (; d.length < vs; ) d.push(null);
  return (
    i === 'front' ? (r[o] = s) : (d[o] = s),
    { ...a, guild: { ...a.guild, party: { front: r, back: d } } }
  );
}
function Ry(a, i) {
  const o = a.guild.party.front.map((r) => (r === i ? null : r)),
    s = a.guild.party.back.map((r) => (r === i ? null : r));
  return { ...a, guild: { ...a.guild, party: { front: o, back: s } } };
}
function Cp(a, i, o) {
  if (
    !a.guild.members.some((v) => v.id === i) ||
    (o === 'front' ? a.guild.party.front : a.guild.party.back).includes(i)
  )
    return a;
  const r = Ry(a, i),
    d = o === 'front' ? r.guild.party.front : r.guild.party.back;
  let h = d.indexOf(null);
  if (h < 0)
    if (d.length < wy(o)) h = d.length;
    else return a;
  return uk(r, o, h, i);
}
function sk(a, i) {
  return a.guild.party.front.includes(i)
    ? '前衛'
    : a.guild.party.back.includes(i)
      ? '後衛'
      : '控え';
}
const ck = () => {
    const a = cl(),
      { save: i, applyAndPersist: o } = ql(),
      s = Object.keys(Pt),
      r = Object.keys(_t),
      [d, h] = E.useState(''),
      [v, g] = E.useState(s[0]),
      [y, _] = E.useState(r[0]),
      [b, x] = E.useState(!1),
      w = E.useCallback(async () => {
        const j = d.trim() || '名もなき冒険者',
          C = vy({ raceId: v, classId: y, name: j });
        (x(!0), await o((N) => rS(N, C)), h(''), x(!1));
      }, [d, v, y, o]);
    if (!i) return m.jsx(ul, { to: '/title', replace: !0 });
    const { members: S } = i.guild,
      R = S.length >= or;
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
                  children: s.map((j) => m.jsx('option', { value: j, children: Pt[j].name }, j)),
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
                  children: r.map((j) => m.jsx('option', { value: j, children: _t[j].name }, j)),
                }),
              ],
            }),
            m.jsx('button', {
              type: 'button',
              className: De.primary,
              disabled: b || R,
              onClick: () => void w(),
              children: R ? '団員が上限です' : '作成する',
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
                  children: ['（出撃 ', ik(i), ' / ', e1, '）'],
                }),
              ],
            }),
            S.length === 0
              ? m.jsx('p', { className: De.empty, children: 'まだ冒険者がいません。' })
              : m.jsx('ul', {
                  className: De.members,
                  children: S.map((j) => {
                    var N, I;
                    const C = sk(i, j.id);
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
                                    className: `${De.pos} ${De[`pos_${C}`] ?? ''}`,
                                    children: C,
                                  }),
                                ],
                              }),
                              m.jsxs('span', {
                                className: De.memberSub,
                                children: [
                                  (N = Pt[j.raceId]) == null ? void 0 : N.name,
                                  ' / ',
                                  (I = _t[j.classId]) == null ? void 0 : I.name,
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
                                className: `${De.posBtn} ${C === '前衛' ? De.posBtnActive : ''}`,
                                onClick: () => void o((P) => Cp(P, j.id, 'front')),
                                children: '前',
                              }),
                              m.jsx('button', {
                                type: 'button',
                                className: `${De.posBtn} ${C === '後衛' ? De.posBtnActive : ''}`,
                                onClick: () => void o((P) => Cp(P, j.id, 'back')),
                                children: '後',
                              }),
                              m.jsx('button', {
                                type: 'button',
                                className: `${De.posBtn} ${C === '控え' ? De.posBtnActive : ''}`,
                                onClick: () => void o((P) => Ry(P, j.id)),
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
  ok = '_layout_tw23z_1',
  rk = '_head_tw23z_12',
  fk = '_title_tw23z_16',
  dk = '_sub_tw23z_22',
  mk = '_card_tw23z_27',
  hk = '_h2_tw23z_35',
  pk = '_sp_tw23z_44',
  yk = '_stats_tw23z_50',
  gk = '_equipSlot_tw23z_74',
  _k = '_equipHead_tw23z_82',
  vk = '_slotLabel_tw23z_88',
  bk = '_equipName_tw23z_95',
  Sk = '_smallBtn_tw23z_100',
  xk = '_equipPick_tw23z_110',
  kk = '_pickBtn_tw23z_118',
  Ek = '_skills_tw23z_128',
  Tk = '_skill_tw23z_128',
  Nk = '_skillInfo_tw23z_143',
  Ck = '_skillName_tw23z_150',
  Ak = '_skillLv_tw23z_158',
  jk = '_skillDesc_tw23z_164',
  Mk = '_learnBtn_tw23z_169',
  wk = '_jobRow_tw23z_185',
  Rk = '_select_tw23z_192',
  Ok = '_input_tw23z_193',
  Dk = '_actBtn_tw23z_203',
  zk = '_warn_tw23z_220',
  Bk = '_titleHave_tw23z_227',
  Lk = '_titleOpts_tw23z_233',
  qk = '_titleBtn_tw23z_240',
  Uk = '_rbForm_tw23z_252',
  Hk = '_danger_tw23z_258',
  Gk = '_foot_tw23z_270',
  Yk = '_back_tw23z_274',
  fe = {
    layout: ok,
    head: rk,
    title: fk,
    sub: dk,
    card: mk,
    h2: hk,
    sp: pk,
    stats: yk,
    equipSlot: gk,
    equipHead: _k,
    slotLabel: vk,
    equipName: bk,
    smallBtn: Sk,
    equipPick: xk,
    pickBtn: kk,
    skills: Ek,
    skill: Tk,
    skillInfo: Nk,
    skillName: Ck,
    skillLv: Ak,
    skillDesc: jk,
    learnBtn: Mk,
    jobRow: wk,
    select: Rk,
    input: Ok,
    actBtn: Dk,
    warn: zk,
    titleHave: Bk,
    titleOpts: Lk,
    titleBtn: qk,
    rbForm: Uk,
    danger: Hk,
    foot: Gk,
    back: Yk,
  },
  Oy = ['weapon', 'armor', 'accessory'];
function Dy(a, i, o) {
  return { ...a, guild: { ...a.guild, members: a.guild.members.map((s) => (s.id === i ? o : s)) } };
}
function $k(a) {
  var i, o;
  return (o = (i = _t[a]) == null ? void 0 : i.skillTree.skills[0]) == null ? void 0 : o.skillId;
}
function Xk(a) {
  var i;
  return new Set(
    (((i = Pt[a]) == null ? void 0 : i.raceSkillTree.skills) ?? []).map((o) => o.skillId)
  );
}
const Vk = (a) => Object.values(a).reduce((i, o) => i + o, 0);
function Ik(a, i) {
  if (!_t[i]) return a;
  const o = Xk(a.raceId);
  let s = {};
  for (const [g, y] of Object.entries(a.learnedSkills)) o.has(g) && (s[g] = y);
  const r = $k(i);
  r && !s[r] && (s[r] = 1);
  const d = Math.max(1, a.level - Kp),
    h = Le.SP_PER_LEVEL * Math.max(0, d - 1);
  let v = Vk(s) - (r && s[r] ? 1 : 0);
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
function Qk(a, i, o) {
  const s = a.guild.members.find((h) => h.id === i);
  if (!s) return a;
  let r = Dy(a, i, Ik(s, o));
  const d = r.guild.members.find((h) => h.id === i);
  for (const h of Oy) {
    const v = d.equipment[h];
    v && !Or(d, v.masterId) && (r = Dr(r, i, h));
  }
  return r;
}
const Zk = [
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
function Kk(a) {
  const i = Zk.find((o) => a >= o.min && a <= o.max);
  return i ? { allStats: i.allStats, bonusSp: i.bonusSp } : null;
}
function zy(a) {
  return a.level >= Ci.REBIRTH_MIN_LEVEL;
}
function Jk(a, i) {
  const o = Kk(a.level);
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
function Wk(a, i, o) {
  const s = a.guild.members.find((h) => h.id === i);
  if (!s || !zy(s)) return a;
  let r = a;
  for (const h of Oy) s.equipment[h] && (r = Dr(r, i, h));
  const d = r.guild.members.find((h) => h.id === i);
  return Dy(r, i, Jk(d, o));
}
function By(a, i, o) {
  var r;
  return o < Ci.TITLE_DEPTH || a.titleId
    ? !1
    : (((r = _t[a.classId]) == null ? void 0 : r.titleOptions) ?? []).includes(i);
}
function Fk(a, i, o) {
  return By(a, i, o)
    ? { ...a, titleId: i, skillPoints: { ...a.skillPoints, total: a.skillPoints.total + t1 } }
    : a;
}
function Ly(a) {
  var o, s;
  const i = [
    ...(((o = _t[a.classId]) == null ? void 0 : o.skillTree.skills) ?? []),
    ...(((s = Pt[a.raceId]) == null ? void 0 : s.raceSkillTree.skills) ?? []),
  ];
  return (a.titleId && Ea[a.titleId] && i.push(...Ea[a.titleId].skillTree.skills), i);
}
function xs(a, i) {
  return a.learnedSkills[i] ?? 0;
}
function qy(a) {
  return a.skillPoints.total - a.skillPoints.spent;
}
function Pk(a, i) {
  return (i.requires ?? []).every((o) => xs(a, o.skillId) >= o.level);
}
function Uy(a, i) {
  const o = Ly(a).find((s) => s.skillId === i);
  return !o || xs(a, i) >= o.maxLevel || qy(a) <= 0 ? !1 : Pk(a, o);
}
function e3(a, i) {
  return Uy(a, i)
    ? {
        ...a,
        learnedSkills: { ...a.learnedSkills, [i]: xs(a, i) + 1 },
        skillPoints: { ...a.skillPoints, spent: a.skillPoints.spent + 1 },
      }
    : a;
}
const Ap = Object.keys(Pt),
  ls = Object.keys(_t),
  t3 = ['weapon', 'armor', 'accessory'],
  l3 = { weapon: '武器', armor: '防具', accessory: '装飾' },
  n3 = [
    { key: 'hp', label: 'HP' },
    { key: 'tp', label: 'TP' },
    { key: 'str', label: 'STR' },
    { key: 'vit', label: 'VIT' },
    { key: 'agi', label: 'AGI' },
    { key: 'int', label: 'INT' },
    { key: 'mnd', label: 'MND' },
    { key: 'luc', label: 'LUC' },
  ],
  a3 = () => {
    var P, ee, V, H;
    const a = cl(),
      { id: i } = uv(),
      { save: o, applyAndPersist: s } = ql(),
      [r, d] = E.useState(ls[0]),
      [h, v] = E.useState(''),
      [g, y] = E.useState(Ap[0]),
      [_, b] = E.useState(ls[0]),
      [x, w] = E.useState(!1);
    if (!o) return m.jsx(ul, { to: '/title', replace: !0 });
    const S = o.guild.members.find((q) => q.id === i);
    if (!S || !i) return m.jsx(ul, { to: '/guild', replace: !0 });
    const R = zi(S),
      j = qy(S),
      C = o.towerState.record.deepestReached,
      N = (q) =>
        s((Q) => ({
          ...Q,
          guild: { ...Q.guild, members: Q.guild.members.map((ae) => (ae.id === i ? q(ae) : ae)) },
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
                (P = Pt[S.raceId]) == null ? void 0 : P.name,
                ' / ',
                (ee = _t[S.classId]) == null ? void 0 : ee.name,
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
              children: n3.map((q) =>
                m.jsxs(
                  'div',
                  {
                    children: [
                      m.jsx('dt', { children: q.label }),
                      m.jsx('dd', { children: R[q.key] }),
                    ],
                  },
                  q.key
                )
              ),
            }),
          ],
        }),
        m.jsxs('section', {
          className: fe.card,
          children: [
            m.jsx('h2', { className: fe.h2, children: '装備' }),
            t3.map((q) => {
              const Q = S.equipment[q],
                ae = o.guild.equipment.filter((ue) => {
                  var ce;
                  return (
                    ((ce = ht[ue.masterId]) == null ? void 0 : ce.slot) === q && Or(S, ue.masterId)
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
                        m.jsx('span', { className: fe.slotLabel, children: l3[q] }),
                        m.jsx('span', {
                          className: fe.equipName,
                          children: Q ? rs(Q) : '（なし）',
                        }),
                        Q
                          ? m.jsx('button', {
                              type: 'button',
                              className: fe.smallBtn,
                              onClick: () => void I(q),
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
                q
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
              children: Ly(S).map((q) => {
                const Q = xs(S, q.skillId),
                  ae = Uy(S, q.skillId),
                  ue = Ar[q.skillId];
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
                              (ue == null ? void 0 : ue.name) ?? q.skillId,
                              m.jsxs('span', {
                                className: fe.skillLv,
                                children: ['Lv ', Q, '/', q.maxLevel],
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
                        onClick: () => void N((ce) => e3(ce, q.skillId)),
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
                  onChange: (q) => d(q.target.value),
                  children: ls.map((q) => m.jsx('option', { value: q, children: _t[q].name }, q)),
                }),
                m.jsx('button', {
                  type: 'button',
                  className: fe.actBtn,
                  disabled: r === S.classId,
                  onClick: () => void s((q) => Qk(q, i, r)),
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
                  children: ['習得済み: ', (V = Ea[S.titleId]) == null ? void 0 : V.name],
                })
              : C < Ci.TITLE_DEPTH
                ? m.jsxs('p', {
                    className: fe.warn,
                    children: ['第 ', Ci.TITLE_DEPTH, ' 階到達で習得できます（現在 ', C, 'F）。'],
                  })
                : m.jsx('div', {
                    className: fe.titleOpts,
                    children: (((H = _t[S.classId]) == null ? void 0 : H.titleOptions) ?? []).map(
                      (q) => {
                        var Q;
                        return m.jsxs(
                          'button',
                          {
                            type: 'button',
                            className: fe.titleBtn,
                            disabled: !By(S, q, C),
                            onClick: () => void N((ae) => Fk(ae, q, C)),
                            children: [(Q = Ea[q]) == null ? void 0 : Q.name, '（SP+5）'],
                          },
                          q
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
                        onChange: (q) => v(q.target.value),
                      }),
                      m.jsxs('div', {
                        className: fe.jobRow,
                        children: [
                          m.jsx('select', {
                            className: fe.select,
                            value: g,
                            onChange: (q) => y(q.target.value),
                            children: Ap.map((q) =>
                              m.jsx('option', { value: q, children: Pt[q].name }, q)
                            ),
                          }),
                          m.jsx('select', {
                            className: fe.select,
                            value: _,
                            onChange: (q) => b(q.target.value),
                            children: ls.map((q) =>
                              m.jsx('option', { value: q, children: _t[q].name }, q)
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
                              (s((q) =>
                                Wk(q, i, { raceId: g, classId: _, name: h.trim() || S.name })
                              ),
                                w(!1));
                            },
                            children: '転生を実行',
                          }),
                          m.jsx('button', {
                            type: 'button',
                            className: fe.actBtn,
                            onClick: () => w(!1),
                            children: 'やめる',
                          }),
                        ],
                      }),
                    ],
                  })
                : m.jsx('button', {
                    type: 'button',
                    className: fe.actBtn,
                    onClick: () => w(!0),
                    children: '転生する…',
                  })
              : m.jsxs('p', {
                  className: fe.warn,
                  children: [
                    'Lv',
                    Ci.REBIRTH_MIN_LEVEL,
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
    function I(q) {
      return s((Q) => Dr(Q, i, q));
    }
  },
  i3 = () => m.jsx('div', { children: m.jsx('h1', { children: 'Not Found' }) }),
  u3 = '_layout_1u0ua_1',
  s3 = '_head_1u0ua_11',
  c3 = '_title_1u0ua_18',
  o3 = '_gold_1u0ua_24',
  r3 = '_tabs_1u0ua_29',
  f3 = '_tab_1u0ua_29',
  d3 = '_tabActive_1u0ua_46',
  m3 = '_list_1u0ua_51',
  h3 = '_row_1u0ua_59',
  p3 = '_info_1u0ua_70',
  y3 = '_name_1u0ua_76',
  g3 = '_note_1u0ua_81',
  _3 = '_action_1u0ua_86',
  v3 = '_empty_1u0ua_103',
  b3 = '_foot_1u0ua_108',
  S3 = '_back_1u0ua_112',
  Ge = {
    layout: u3,
    head: s3,
    title: c3,
    gold: o3,
    tabs: r3,
    tab: f3,
    tabActive: d3,
    list: m3,
    row: h3,
    info: p3,
    name: y3,
    note: g3,
    action: _3,
    empty: v3,
    foot: b3,
    back: S3,
  };
function x3(a) {
  return Math.max(0, Math.floor(a.towerState.record.deepestReached / 10));
}
const Hy = {
    item_slime_jelly: ['equip_slime_shield'],
    item_rat_tail: ['equip_rat_dagger'],
    item_bat_wing: ['equip_bat_cloak'],
    item_golem_core: ['equip_golem_blade'],
  },
  k3 = (a) => {
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
  const i = x3(a),
    o = new Set(a.shopStock.unlockedItemIds),
    s = Object.values(et)
      .filter((d) => d.buyPrice > 0)
      .map((d) => ({ id: d.id, name: d.name, price: d.buyPrice, kind: 'item' }));
  return [
    ...Object.values(ht)
      .filter((d) => d.tier <= i || o.has(d.id))
      .map((d) => ({ id: d.id, name: d.name, price: d.buyPrice, kind: 'equip', note: k3(d.id) })),
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
function C3(a, i) {
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
function j3(a, i, o = 1) {
  var g;
  if ((((g = a.guild.storage.find((y) => y.itemId === i)) == null ? void 0 : g.qty) ?? 0) < o)
    return a;
  const r = _r(i) * o,
    d = wr(a, i, o),
    h = T3(i).filter((y) => !d.shopStock.unlockedItemIds.includes(y)),
    v = [...d.shopStock.unlockedItemIds, ...h];
  return {
    ...d,
    guild: { ...d.guild, gold: d.guild.gold + r },
    shopStock: { ...d.shopStock, unlockedItemIds: v },
  };
}
const M3 = () => {
    const a = cl(),
      { save: i, applyAndPersist: o } = ql(),
      [s, r] = E.useState('buy');
    if (!i) return m.jsx(ul, { to: '/title', replace: !0 });
    const d = i.guild.gold,
      h = E3(i),
      v = i.guild.storage.filter((b) => _r(b.itemId) > 0),
      g = i.guild.equipment,
      y = v.length === 0 && g.length === 0,
      _ = (b) => {
        var x, w;
        return (
          ((x = et[b]) == null ? void 0 : x.name) ?? ((w = ht[b]) == null ? void 0 : w.name) ?? b
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
                          onClick: () => void o((x) => C3(x, b.id)),
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
                                onClick: () => void o((x) => j3(x, b.itemId, 1)),
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
  w3 = '_layout_1xkiw_1',
  R3 = '_head_1xkiw_12',
  O3 = '_title_1xkiw_17',
  D3 = '_subtitle_1xkiw_24',
  z3 = '_body_1xkiw_30',
  B3 = '_menu_1xkiw_34',
  L3 = '_loading_1xkiw_40',
  q3 = '_warn_1xkiw_45',
  U3 = '_danger_1xkiw_52',
  H3 = '_dialog_1xkiw_67',
  G3 = '_dialogTitle_1xkiw_77',
  Y3 = '_field_1xkiw_82',
  $3 = '_note_1xkiw_96',
  X3 = '_dialogActions_1xkiw_102',
  V3 = '_primary_1xkiw_107',
  I3 = '_sub_1xkiw_24',
  Q3 = '_foot_1xkiw_132',
  Ze = {
    layout: w3,
    head: R3,
    title: O3,
    subtitle: D3,
    body: z3,
    menu: B3,
    loading: L3,
    warn: q3,
    danger: U3,
    dialog: H3,
    dialogTitle: G3,
    field: Y3,
    note: $3,
    dialogActions: X3,
    primary: V3,
    sub: I3,
    foot: Q3,
  },
  Z3 = '_card_3vsn6_1',
  K3 = '_corrupted_3vsn6_14',
  J3 = '_corruptedText_3vsn6_19',
  W3 = '_corruptedNote_3vsn6_25',
  F3 = '_guildName_3vsn6_31',
  P3 = '_meta_3vsn6_36',
  fn = {
    card: Z3,
    corrupted: K3,
    corruptedText: J3,
    corruptedNote: W3,
    guildName: F3,
    meta: P3,
    continue: '_continue_3vsn6_56',
  },
  eE = (a) => {
    if (!a) return '-';
    const i = new Date(a),
      o = (s) => String(s).padStart(2, '0');
    return `${i.getFullYear()}/${o(i.getMonth() + 1)}/${o(i.getDate())} ${o(i.getHours())}:${o(i.getMinutes())}`;
  },
  tE = ({ meta: a, onContinue: i }) =>
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
                    m.jsx('dd', { children: eE(a.savedAt) }),
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
  lE = () => {
    const a = cl(),
      { startNewGame: i, continueGame: o } = ql(),
      [s, r] = E.useState(null),
      [d, h] = E.useState(!0),
      [v, g] = E.useState('menu'),
      [y, _] = E.useState(''),
      [b, x] = E.useState(!1);
    E.useEffect(() => {
      (async () => (r(await RS()), h(!1)))();
    }, []);
    const w = s !== null && !s.corrupted,
      S = E.useCallback(async () => {
        x(!0);
        const C = await o();
        (x(!1), C.ok && a('/town'));
      }, [o, a]),
      R = E.useCallback(() => {
        (_(''), g(w ? 'confirm' : 'guildName'));
      }, [w]),
      j = E.useCallback(async () => {
        const C = y.trim() || 'ななしのギルド';
        (x(!0), await i(C), x(!1), a('/town'));
      }, [y, i, a]);
    return m.jsxs('div', {
      className: Ze.layout,
      children: [
        m.jsxs('header', {
          className: Ze.head,
          children: [
            m.jsx('h1', { className: Ze.title, children: '世界樹ライク' }),
            m.jsx('p', { className: Ze.subtitle, children: '無限タワー探索 RPG' }),
          ],
        }),
        m.jsx('main', {
          className: Ze.body,
          children: d
            ? m.jsx('p', { className: Ze.loading, children: '読み込み中...' })
            : v === 'guildName'
              ? m.jsxs('div', {
                  className: Ze.dialog,
                  children: [
                    m.jsx('h2', { className: Ze.dialogTitle, children: '新しいギルド' }),
                    m.jsxs('label', {
                      className: Ze.field,
                      children: [
                        m.jsx('span', { children: 'ギルド名' }),
                        m.jsx('input', {
                          type: 'text',
                          value: y,
                          maxLength: 16,
                          placeholder: 'ななしのギルド',
                          onChange: (C) => _(C.target.value),
                          autoFocus: !0,
                        }),
                      ],
                    }),
                    m.jsx('p', {
                      className: Ze.note,
                      children:
                        '冒険者はまだいません。開始後、ギルドメニューで仲間を作成してください。',
                    }),
                    m.jsxs('div', {
                      className: Ze.dialogActions,
                      children: [
                        m.jsx('button', {
                          type: 'button',
                          className: Ze.primary,
                          disabled: b,
                          onClick: j,
                          children: 'はじめる',
                        }),
                        m.jsx('button', {
                          type: 'button',
                          className: Ze.sub,
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
                    className: Ze.dialog,
                    children: [
                      m.jsx('h2', { className: Ze.dialogTitle, children: '最初から始めますか？' }),
                      m.jsxs('p', {
                        className: Ze.warn,
                        children: [
                          '現在のセーブデータ「',
                          s == null ? void 0 : s.guildName,
                          '」は上書きされ、元に戻せません。',
                        ],
                      }),
                      m.jsxs('div', {
                        className: Ze.dialogActions,
                        children: [
                          m.jsx('button', {
                            type: 'button',
                            className: Ze.danger,
                            disabled: b,
                            onClick: () => g('guildName'),
                            children: 'データを消して始める',
                          }),
                          m.jsx('button', {
                            type: 'button',
                            className: Ze.sub,
                            disabled: b,
                            onClick: () => g('menu'),
                            children: 'もどる',
                          }),
                        ],
                      }),
                    ],
                  })
                : m.jsxs('div', {
                    className: Ze.menu,
                    children: [
                      s !== null && m.jsx(tE, { meta: s, onContinue: () => void S() }),
                      m.jsx('button', {
                        type: 'button',
                        className: w ? Ze.sub : Ze.primary,
                        onClick: R,
                        children: '最初から',
                      }),
                    ],
                  }),
        }),
        m.jsxs('footer', { className: Ze.foot, children: ['v', '0.1.25'] }),
      ],
    });
  },
  nE = '_layout_uxqv8_1',
  aE = '_head_uxqv8_12',
  iE = '_guildName_uxqv8_16',
  uE = '_stats_uxqv8_21',
  sE = '_hint_uxqv8_40',
  cE = '_menu_uxqv8_50',
  oE = '_foot_uxqv8_57',
  rE = '_exit_uxqv8_61',
  fE = '_warpOverlay_uxqv8_72',
  dE = '_warpPanel_uxqv8_83',
  mE = '_warpTitle_uxqv8_94',
  hE = '_warpBtn_uxqv8_99',
  pE = '_warpClose_uxqv8_110',
  qt = {
    layout: nE,
    head: aE,
    guildName: iE,
    stats: uE,
    hint: sE,
    menu: cE,
    foot: oE,
    exit: rE,
    warpOverlay: fE,
    warpPanel: dE,
    warpTitle: mE,
    warpBtn: hE,
    warpClose: pE,
  },
  yE = '_button_1tp4a_1',
  gE = '_primary_1tp4a_26',
  _E = '_label_1tp4a_32',
  vE = '_description_1tp4a_37',
  ns = { button: yE, primary: gE, label: _E, description: vE },
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
  bE = () => {
    const a = cl(),
      { save: i, exitToTitle: o, applyAndPersist: s } = ql(),
      [r, d] = E.useState(!1);
    if (!i) return m.jsx(ul, { to: '/title', replace: !0 });
    const { guild: h, towerState: v, diveState: g } = i,
      y = h.members.length > 0,
      _ = () => {
        (o(), a('/title'));
      },
      b = async () => {
        (g || (await s((S) => pp(S, 1))), a('/dungeon'));
      },
      x = v.warp.unlockedCheckpoints,
      w = async (S) => {
        (d(!1), await s((R) => pp(R, S)), a('/dungeon'));
      };
    return m.jsxs('div', {
      className: qt.layout,
      children: [
        m.jsxs('header', {
          className: qt.head,
          children: [
            m.jsx('div', { className: qt.guildName, children: h.name }),
            m.jsxs('dl', {
              className: qt.stats,
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
            className: qt.hint,
            children:
              'まずは「ギルド管理」で冒険者を作成してください。団員がいないとダイブできません。',
          }),
        m.jsxs('main', {
          className: qt.menu,
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
          className: qt.foot,
          children: m.jsx('button', {
            type: 'button',
            className: qt.exit,
            onClick: _,
            children: 'タイトルへ戻る',
          }),
        }),
        r
          ? m.jsx('div', {
              className: qt.warpOverlay,
              onClick: () => d(!1),
              children: m.jsxs('div', {
                className: qt.warpPanel,
                onClick: (S) => S.stopPropagation(),
                children: [
                  m.jsx('div', { className: qt.warpTitle, children: 'ワープ先を選択' }),
                  x.map((S) =>
                    m.jsxs(
                      'button',
                      {
                        type: 'button',
                        className: qt.warpBtn,
                        onClick: () => void w(S),
                        children: ['第 ', S, ' 階へ'],
                      },
                      S
                    )
                  ),
                  m.jsx('button', {
                    type: 'button',
                    className: qt.warpClose,
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
function SE() {
  return m.jsxs(Sv, {
    children: [
      m.jsx(Wt, { path: '/', element: m.jsx(ul, { to: '/title', replace: !0 }) }),
      m.jsx(Wt, { path: '/title', element: m.jsx(lE, {}) }),
      m.jsx(Wt, { path: '/town', element: m.jsx(bE, {}) }),
      m.jsx(Wt, { path: '/guild', element: m.jsx(ck, {}) }),
      m.jsx(Wt, { path: '/guild/char/:id', element: m.jsx(a3, {}) }),
      m.jsx(Wt, { path: '/shop', element: m.jsx(M3, {}) }),
      m.jsx(Wt, { path: '/forge', element: m.jsx(L2, {}) }),
      m.jsx(Wt, { path: '/codex', element: m.jsx(fx, {}) }),
      m.jsx(Wt, { path: '/dungeon', element: m.jsx(y2, {}) }),
      m.jsx(Wt, { path: '/battle', element: m.jsx(BS, {}) }),
      m.jsx(Wt, { path: '*', element: m.jsx(i3, {}) }),
    ],
  });
}
const xE = {
    races: Pt,
    classes: _t,
    titles: Ea,
    skills: Ar,
    unionSkills: xa,
    summons: ja,
    gatherTypes: wn,
    recipes: Ma,
    enemies: Ll,
    items: et,
    equipment: ht,
  },
  kE = /^[a-z]+_[a-z0-9_]+$/;
function ml(a, i, o) {
  for (const s of i)
    kE.test(s) || o.push(`[${a}] ID 命名規約違反: "${s}"（期待: <domain>_<name>）`);
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
function EE() {
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
    } = xE;
  (ml('races', Object.keys(i), a),
    ml('classes', Object.keys(o), a),
    ml('titles', Object.keys(s), a),
    ml('skills', Object.keys(r), a),
    ml('enemies', Object.keys(y), a),
    ml('items', Object.keys(_), a),
    ml('equipment', Object.keys(b), a));
  const x = (C, N) => {
    for (const [I, P] of Object.entries(N))
      I !== P.id && a.push(`[${C}] キー "${I}" と id "${P.id}" が不一致`);
  };
  (x('races', i),
    x('classes', o),
    x('titles', s),
    x('skills', r),
    x('enemies', y),
    x('items', _),
    x('equipment', b));
  const w = new Set(Object.keys(r)),
    S = new Set(Object.keys(o)),
    R = new Set(Object.keys(s));
  for (const C of Object.values(i)) {
    (S.has(C.defaultClassId) ||
      a.push(`[races] "${C.id}" の defaultClassId "${C.defaultClassId}" が未定義`),
      ur(`races/${C.id}`, C.raceSkillTree, w, a));
    for (const N of C.raceSkillTree.skills) {
      const I = d[N.skillId];
      I &&
        I.raceId !== C.id &&
        a.push(`[races/${C.id}] ユニオンスキル "${N.skillId}" の raceId "${I.raceId}" が不一致`);
    }
  }
  for (const C of Object.values(d)) {
    const N = (j = i[C.raceId]) == null ? void 0 : j.raceSkillTree;
    (!N || !N.skills.some((I) => I.skillId === C.id)) &&
      a.push(`[unionSkills] "${C.id}" が種族 "${C.raceId}" のスキルツリーに無い`);
  }
  ml('unionSkills', Object.keys(d), a);
  for (const [C, N] of Object.entries(d))
    (C !== N.id && a.push(`[unionSkills] キー "${C}" と id "${N.id}" が不一致`),
      N.id in r || a.push(`[unionSkills] "${N.id}" が skills に未定義`),
      N.requiredParticipants < 1 &&
        a.push(`[unionSkills] "${N.id}" の requiredParticipants が 1 未満`),
      (N.gaugeCostPerParticipant < 0 || N.gaugeCostPerParticipant > 100) &&
        a.push(`[unionSkills] "${N.id}" の gaugeCostPerParticipant が 0..100 外`),
      N.id in dn &&
        a.push(
          `[unionSkills] "${N.id}" が BATTLE_SKILLS にも存在（通常スキルとして撃ててしまう）`
        ));
  ml('summons', Object.keys(h), a);
  for (const [C, N] of Object.entries(h))
    C !== N.id && a.push(`[summons] キー "${C}" と id "${N.id}" が不一致`);
  for (const C of Object.values(dn))
    for (const N of C.effects)
      N.kind === 'summon' &&
        !(N.summonKind in h) &&
        a.push(`[battleSkills] "${C.id}" の召喚 "${N.summonKind}" が未定義`);
  for (const [C, N] of Object.entries(v)) {
    (C !== N.type && a.push(`[gatherTypes] キー "${C}" と type "${N.type}" が不一致`),
      w.has(N.requiredSkillId) ||
        a.push(`[gatherTypes] "${N.type}" の requiredSkillId "${N.requiredSkillId}" が未定義`));
    for (const I of N.drops) {
      if (!(I.itemId in _))
        a.push(`[gatherTypes] "${N.type}" のドロップ "${I.itemId}" が未定義アイテム`);
      else {
        const P = _[I.itemId].category === 'food';
        (N.food &&
          !P &&
          a.push(`[gatherTypes] 食材系統 "${N.type}" のドロップ "${I.itemId}" が food でない`),
          !N.food &&
            P &&
            a.push(`[gatherTypes] 素材系統 "${N.type}" のドロップ "${I.itemId}" が food`));
      }
      I.weight <= 0 && a.push(`[gatherTypes] "${N.type}" のドロップ重みが正でない`);
    }
  }
  ml('recipes', Object.keys(g), a);
  for (const [C, N] of Object.entries(g)) {
    C !== N.id && a.push(`[recipes] キー "${C}" と id "${N.id}" が不一致`);
    for (const I of N.ingredients)
      I.itemId in _
        ? _[I.itemId].category !== 'food' &&
          a.push(`[recipes] "${N.id}" の材料 "${I.itemId}" が food カテゴリでない`)
        : a.push(`[recipes] "${N.id}" の材料 "${I.itemId}" が未定義`);
    N.result.itemId in _
      ? _[N.result.itemId].category !== 'food' &&
        a.push(`[recipes] "${N.id}" の結果 "${N.result.itemId}" が food カテゴリでない`)
      : a.push(`[recipes] "${N.id}" の結果 "${N.result.itemId}" が未定義`);
  }
  for (const C of Object.values(o)) {
    ur(`classes/${C.id}`, C.skillTree, w, a);
    for (const N of C.titleOptions) {
      if (!R.has(N)) {
        a.push(`[classes] "${C.id}" の称号 "${N}" が未定義`);
        continue;
      }
      s[N].parentClassId !== C.id &&
        a.push(`[classes] 称号 "${N}" の parentClassId が "${C.id}" と不一致`);
    }
  }
  for (const C of Object.values(s))
    (S.has(C.parentClassId) ||
      a.push(`[titles] "${C.id}" の parentClassId "${C.parentClassId}" が未定義`),
      ur(`titles/${C.id}`, C.skillTree, w, a));
  for (const C of Object.values(b))
    (C.slot === 'weapon' &&
      !C.weaponType &&
      a.push(`[equipment] "${C.id}" は weapon だが weaponType が未設定`),
      C.slot === 'armor' &&
        !C.armorType &&
        a.push(`[equipment] "${C.id}" は armor だが armorType が未設定`),
      (C.buyPrice < 0 || C.tier < 0) && a.push(`[equipment] "${C.id}" の buyPrice/tier が負`));
  for (const C of Object.values(_))
    (C.buyPrice < 0 && a.push(`[items] "${C.id}" の buyPrice が負`),
      C.category === 'consumable' &&
        !C.useContext &&
        !C.effects &&
        a.push(`[items] 消費アイテム "${C.id}" に useContext も effects も無い（使用不能）`));
  for (const C of Object.values(y))
    for (const N of C.drops ?? [])
      (N.itemId in _ || a.push(`[enemies] "${C.id}" のドロップ "${N.itemId}" が未定義アイテム`),
        (N.rate < 0 || N.rate > 1) &&
          a.push(`[enemies] "${C.id}" のドロップ "${N.itemId}" の rate が 0..1 外`));
  for (const [C, N] of Object.entries(Hy)) {
    C in _ || a.push(`[SELL_UNLOCKS] キー素材 "${C}" が未定義`);
    for (const I of N) I in b || a.push(`[SELL_UNLOCKS] 解放先装備 "${I}" が未定義`);
  }
  return { ok: a.length === 0, errors: a };
}
const jp = EE();
jp.ok || console.error('マスターデータ検証エラー:', jp.errors);
const Yy = document.getElementById('root');
if (!Yy) throw new Error('Failed to find #root element');
k0.createRoot(Yy).render(
  m.jsx(Vv, { basename: '/sekaiju-like-game', children: m.jsx(zS, { children: m.jsx(SE, {}) }) })
);
